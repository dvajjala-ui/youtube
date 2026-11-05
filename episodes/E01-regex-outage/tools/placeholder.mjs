#!/usr/bin/env node
/**
 * Placeholder clock + silent master, so the Remotion pipeline can be smoke-tested
 * before narration is rendered. Timings are estimated at the measured Cartesia
 * rate (~15.4 characters/second for sonic-3.6 at speed 1.0).
 *
 * Replace by running tools/tts.mjs — it overwrites both files with real audio
 * and real word timestamps.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const EP = resolve(HERE, "..");
const CPS = 15.4;
const SR = 48000;
const GAP = 0.22;

const manifest = JSON.parse(readFileSync(join(EP, "narration/segments.json"), "utf8"));
const words = [];
let cursor = 0;

for (const seg of manifest.segments) {
  const toks = seg.text.split(/\s+/).filter(Boolean);
  let t = 0;
  for (const raw of toks) {
    const dur = (raw.length + 1) / CPS;
    words.push({
      w: raw.replace(/[.,!?;:"]+$/g, "").toLowerCase(),
      raw,
      s: +(cursor + t).toFixed(3),
      e: +(cursor + t + dur).toFixed(3),
      seg: seg.id,
    });
    t += dur;
  }
  cursor += t + GAP;
}

const total = +cursor.toFixed(3);
mkdirSync(join(EP, "composition/src/data"), { recursive: true });
writeFileSync(
  join(EP, "composition/src/data/words.json"),
  JSON.stringify({ fps: 30, sample_rate: SR, duration_s: total, words }),
);

// silent 16-bit mono WAV
const n = Math.round(total * SR);
const data = Buffer.alloc(n * 2);
const h = Buffer.alloc(44);
h.write("RIFF", 0);
h.writeUInt32LE(36 + data.length, 4);
h.write("WAVE", 8);
h.write("fmt ", 12);
h.writeUInt32LE(16, 16);
h.writeUInt16LE(1, 20);
h.writeUInt16LE(1, 22);
h.writeUInt32LE(SR, 24);
h.writeUInt32LE(SR * 2, 28);
h.writeUInt16LE(2, 32);
h.writeUInt16LE(16, 34);
h.write("data", 36);
h.writeUInt32LE(data.length, 40);
mkdirSync(join(EP, "composition/public/narration"), { recursive: true });
writeFileSync(join(EP, "composition/public/narration/master.wav"), Buffer.concat([h, data]));
writeFileSync(join(EP, "transcript/words.json"), JSON.stringify({ fps: 30, sample_rate: SR, duration_s: total, words }));

console.log(`placeholder clock: ${words.length} words, ${total}s (${(total / 60).toFixed(2)} min)`);
console.log("NOTE: silent audio — run tools/tts.mjs for the real narration.");
