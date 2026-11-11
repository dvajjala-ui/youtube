#!/usr/bin/env node
/**
 * Cartesia narration renderer.
 *
 * Reads a segment manifest (JSON), synthesises each segment with word-level
 * timestamps, writes one WAV per segment plus a single concatenated master WAV
 * and a words.json clock that the Remotion composition animates against.
 *
 * Word timings come straight from Cartesia (`add_timestamps: true` on the SSE
 * endpoint), so no Whisper pass is needed.
 *
 * Usage (from the episode folder, or with --episode <dir>):
 *   node ../../studio/tools/tts.mjs --voice <voice_id> [--manifest narration/segments.json] [--model sonic-3.6]
 *
 * The API key is read from CARTESIA_API_KEY in the environment, or from the
 * .secrets.env file at the repo root (never committed).
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { EP, arg, cartesiaKey, CARTESIA_VERSION, SAMPLE_RATE, toWav } from "./_episode.mjs";

const MANIFEST = resolve(EP, arg("manifest", "narration/segments.json"));
const VOICE = arg("voice", null);
const MODEL = arg("model", "sonic-3.6");

if (!VOICE) throw new Error("--voice <voice_id> is required");

const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
const segments = manifest.segments;

const DEFAULT_PAUSE_MS = 220;
const silence = (pauseMs) => Buffer.alloc(Math.round((SAMPLE_RATE * pauseMs) / 1000) * 2);

// ------------------------------------------------------------- cartesia call
async function synth(text, voice) {
  const res = await fetch("https://api.cartesia.ai/tts/sse", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cartesiaKey()}`,
      "Cartesia-Version": CARTESIA_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transcript: text,
      model_id: MODEL,
      language: manifest.language || "en",
      voice: { mode: "id", id: voice },
      output_format: { container: "raw", encoding: "pcm_s16le", sample_rate: SAMPLE_RATE },
      speed: manifest.speed ?? 1.0,
      add_timestamps: true,
    }),
  });

  if (!res.ok) throw new Error(`Cartesia ${res.status}: ${(await res.text()).slice(0, 400)}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  const pcm = [];
  const words = [];
  let stream = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    stream += decoder.decode(value, { stream: true });
    const parts = stream.split("\n\n");
    stream = parts.pop();
    for (const part of parts) {
      const dataLine = part.split("\n").find((l) => l.startsWith("data:"));
      if (!dataLine) continue;
      const evt = JSON.parse(dataLine.slice(5).trim());
      if (evt.type === "chunk" && evt.data) pcm.push(Buffer.from(evt.data, "base64"));
      if (evt.type === "timestamps" && evt.word_timestamps) {
        const { words: w, start, end } = evt.word_timestamps;
        for (let i = 0; i < w.length; i++) words.push({ w: w[i], s: start[i], e: end[i] });
      }
    }
  }

  return { pcm: Buffer.concat(pcm), words };
}

// --------------------------------------------------------------------- main
const outDir = join(EP, "narration");
const clockDir = join(EP, "transcript");
mkdirSync(outDir, { recursive: true });
mkdirSync(clockDir, { recursive: true });

const pieces = [];
const clock = [];
let cursor = 0; // seconds into the master
let chars = 0;

for (const seg of segments) {
  const pauseMs = seg.pauseMs ?? DEFAULT_PAUSE_MS;
  if (!Number.isInteger(pauseMs) || pauseMs < 0 || pauseMs > 3000) {
    throw new Error("Invalid pauseMs for segment " + seg.id + " (expected 0–3000)");
  }
  const { pcm, words } = await synth(seg.text, seg.voice ?? VOICE);
  if (!pcm.length || !words.length) throw new Error("Missing audio or timestamps for segment " + seg.id);
  chars += seg.text.length;
  writeFileSync(join(outDir, `${seg.id}.wav`), toWav(pcm));
  const dur = pcm.length / (SAMPLE_RATE * 2);
  pieces.push(pcm);

  for (const w of words) {
    clock.push({
      w: w.w.replace(/[.,!?;:"]+$/g, "").toLowerCase(),
      raw: w.w.trim(),
      s: +(cursor + w.s).toFixed(3),
      e: +(cursor + Math.min(w.e, dur)).toFixed(3),
      seg: seg.id,
    });
  }
  clock.push({
    w: "∂gap",
    raw: "",
    s: +(cursor + dur).toFixed(3),
    e: +(cursor + dur + pauseMs / 1000).toFixed(3),
    seg: seg.id,
    gap: true,
  });
  pieces.push(silence(pauseMs));
  cursor += dur + pauseMs / 1000;

  console.log(`${seg.id}  ${dur.toFixed(1)}s  ${words.length} words  ${seg.text.length} chars`);
}

writeFileSync(join(outDir, "master.wav"), toWav(Buffer.concat(pieces)));
writeFileSync(
  join(clockDir, "words.json"),
  JSON.stringify({ fps: 30, sample_rate: SAMPLE_RATE, duration_s: +cursor.toFixed(3), words: clock }, null, 0),
);
writeFileSync(
  join(outDir, "manifest.out.json"),
  JSON.stringify({ voice: VOICE, ...(segments.some((seg) => seg.voice) ? { segment_voices: Object.fromEntries(segments.map((seg) => [seg.id, seg.voice ?? VOICE])) } : {}), model: MODEL, chars_billed_estimate: chars, duration_s: +cursor.toFixed(3) }, null, 2),
);

console.log(`\nmaster.wav  ${cursor.toFixed(1)}s  (${(cursor / 60).toFixed(2)} min)`);
console.log(`words.json  ${clock.length} entries`);
console.log(`characters sent: ${chars}  (Cartesia bills ~1 credit/char)`);
