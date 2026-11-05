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
 * Usage:
 *   node tools/tts.mjs --manifest narration/segments.json --voice <voice_id> [--model sonic-3.6]
 *
 * The API key is read from CARTESIA_API_KEY in the environment, or from the
 * .secrets.env file at the repo root (never committed).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const EP = resolve(HERE, "..");
const REPO = resolve(EP, "..", "..");

function apiKey() {
  if (process.env.CARTESIA_API_KEY) return process.env.CARTESIA_API_KEY;
  const f = join(REPO, ".secrets.env");
  if (existsSync(f)) {
    const line = readFileSync(f, "utf8")
      .split(/\r?\n/)
      .find((l) => l.startsWith("CARTESIA_API_KEY="));
    if (line) return line.slice("CARTESIA_API_KEY=".length).trim();
  }
  throw new Error("CARTESIA_API_KEY not found (env or .secrets.env)");
}

const args = process.argv.slice(2);
const arg = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : dflt;
};

const MANIFEST = resolve(arg("manifest", join(EP, "narration/segments.json")));
const VOICE = arg("voice", null);
const MODEL = arg("model", "sonic-3.6");
const SAMPLE_RATE = 48000;
const VERSION = "2025-06-30";

if (!VOICE) throw new Error("--voice <voice_id> is required");

const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
const segments = manifest.segments;

// ---------------------------------------------------------------- audio utils
function wavHeader(dataLength) {
  const buf = Buffer.alloc(44);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + dataLength, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20); // PCM
  buf.writeUInt16LE(1, 22); // mono
  buf.writeUInt32LE(SAMPLE_RATE, 24);
  buf.writeUInt32LE(SAMPLE_RATE * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(dataLength, 40);
  return buf;
}

function toWav(pcm) {
  return Buffer.concat([wavHeader(pcm.length), pcm]);
}

const SILENCE_MS = 220; // gap between segments in the master
const silence = () => Buffer.alloc(Math.round((SAMPLE_RATE * SILENCE_MS) / 1000) * 2);

// ------------------------------------------------------------- cartesia call
async function synth(text) {
  const res = await fetch("https://api.cartesia.ai/tts/sse", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "Cartesia-Version": VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transcript: text,
      model_id: MODEL,
      language: manifest.language || "en",
      voice: { mode: "id", id: VOICE },
      output_format: {
        container: "raw",
        encoding: "pcm_s16le",
        sample_rate: SAMPLE_RATE,
      },
      speed: manifest.speed ?? 1.0,
      add_timestamps: true,
    }),
  });

  if (!res.ok) {
    throw new Error(`Cartesia ${res.status}: ${(await res.text()).slice(0, 400)}`);
  }

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
        for (let i = 0; i < w.length; i++) {
          words.push({ w: w[i], s: start[i], e: end[i] });
        }
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
  const { pcm, words } = await synth(seg.text);
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
  clock.push({ w: "∂gap", raw: "", s: +(cursor + dur).toFixed(3), e: +(cursor + dur + SILENCE_MS / 1000).toFixed(3), seg: seg.id, gap: true });
  pieces.push(silence());
  cursor += dur + SILENCE_MS / 1000;

  console.log(`${seg.id}  ${dur.toFixed(1)}s  ${words.length} words  ${seg.text.length} chars`);
}

writeFileSync(join(outDir, "master.wav"), toWav(Buffer.concat(pieces)));
writeFileSync(
  join(clockDir, "words.json"),
  JSON.stringify({ fps: 30, sample_rate: SAMPLE_RATE, duration_s: +cursor.toFixed(3), words: clock }, null, 0),
);
writeFileSync(
  join(outDir, "manifest.out.json"),
  JSON.stringify({ voice: VOICE, model: MODEL, chars_billed_estimate: chars, duration_s: +cursor.toFixed(3) }, null, 2),
);

console.log(`\nmaster.wav  ${cursor.toFixed(1)}s  (${(cursor / 60).toFixed(2)} min)`);
console.log(`words.json  ${clock.length} entries`);
console.log(`characters sent: ${chars}  (Cartesia bills ~1 credit/char)`);
