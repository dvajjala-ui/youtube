import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { toWav } from "../../../studio/tools/_episode.mjs";

const episode = join(dirname(fileURLToPath(import.meta.url)), "..");
const packagePath = process.argv[2];
if (!packagePath) throw new Error("Pass the installed kokoro-js/dist/kokoro.js path");
const { KokoroTTS } = await import(pathToFileURL(resolve(packagePath)).href);
const manifest = JSON.parse(readFileSync(join(episode, "longform/narration/segments.json"), "utf8"));
const segments = manifest.segments.filter(segment => segment.id.startsWith("b1-"));
const fps = manifest.fps;
const rate = 24000;
const voices = { arjun: "am_michael", sam: "bm_george" };
const sentenceCounts = [4, 2, 2, 5];
const segmenter = new Intl.Segmenter("en", { granularity: "sentence" });
const takes = segments.flatMap((segment, index) => {
  const sentences = [...segmenter.segment(segment.text)];
  if (sentences.length !== sentenceCounts[index]) {
    throw new Error(`Update the opening cut for the revised script at ${segment.id}`);
  }
  return sentences.map(({ segment: sentence }, i) => ({
    id: `${segment.id}.${i + 1}`,
    speaker: segment.speaker,
    text: sentence.trim(),
    pause: i < sentences.length - 1 ? 0.14 : segment.id === "b1-01" ? 0.82 : segment.pauseMs / 1000,
  }));
});

console.log("Loading local Kokoro voice model");
const tts = await KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-v1.0-ONNX", {
  dtype: "q8",
  device: "cpu",
});
const pieces = [];
const cues = [];
const envelope = [];
let cursor = 0;

for (const take of takes) {
  const audio = await tts.generate(take.text, {
    voice: voices[take.speaker],
    speed: take.speaker === "sam" ? 1.02 : 1.06,
  });
  if (audio.sampling_rate !== rate) throw new Error(`Unexpected sample rate ${audio.sampling_rate}`);
  const samples = audio.audio;
  const peak = samples.reduce((value, sample) => Math.max(value, Math.abs(sample)), 0);
  const gain = Math.min(1.2, 0.84 / peak);
  const pcm = Buffer.alloc(samples.length * 2);
  for (let i = 0; i < samples.length; i++) pcm.writeInt16LE(Math.round(samples[i] * gain * 32767), i * 2);
  pieces.push(pcm, Buffer.alloc(Math.round(take.pause * rate) * 2));
  const start = Math.round(cursor * fps / rate);
  const end = Math.round((cursor + samples.length) * fps / rate);
  for (let frame = start; frame < end; frame++) {
    const from = Math.max(0, Math.round(frame * rate / fps - cursor));
    const to = Math.min(samples.length, from + Math.round(rate / fps));
    let energy = 0;
    for (let i = from; i < to; i++) energy += samples[i] ** 2;
    envelope[frame] = to > from ? Number(Math.sqrt(energy / (to - from)).toFixed(3)) : 0;
  }
  cues.push({ id: take.id, speaker: take.speaker, text: take.text, start, end });
  cursor += samples.length + Math.round(take.pause * rate);
  console.log(`${take.id} ${((end - start) / fps).toFixed(2)}s`);
}

const titleHold = Math.round(2.8 * rate);
pieces.push(Buffer.alloc(titleHold * 2));
cursor += titleHold;
const comp = join(episode, "composition");
const assets = join(comp, "public", "narration");
mkdirSync(assets, { recursive: true });
writeFileSync(join(assets, "e02-longform-opening.wav"), toWav(Buffer.concat(pieces), rate));
const notification = Buffer.alloc(Math.round(rate * .38) * 2);
for (let i = 0; i < notification.length / 2; i++) {
  const time = i / rate;
  const fade = Math.min(1, time * 360) * Math.exp(-13 * time);
  const chime = (Math.sin(2 * Math.PI * 783.99 * time) + .3 * Math.sin(2 * Math.PI * 1174.66 * time)) * fade;
  notification.writeInt16LE(Math.round(chime * 5700), i * 2);
}
writeFileSync(join(assets, "e02-opening-ticket.wav"), toWav(notification, rate));
writeFileSync(join(comp, "src/data/longform-opening.json"), JSON.stringify({
  fps,
  frames: Math.ceil(cursor / rate * fps),
  cues,
  mouth: Array.from(envelope, sample => sample ?? 0),
}, null, 2) + "\n");
console.log(`Opening audio and timing saved, ${(cursor / rate).toFixed(2)}s`);
