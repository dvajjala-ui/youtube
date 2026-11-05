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
import { join, resolve } from "node:path";
import { EP, arg, SAMPLE_RATE, toWav } from "./_episode.mjs";

const CPS = 15.4;
const GAP = 0.22;

const manifest = JSON.parse(readFileSync(resolve(EP, arg("manifest", "narration/segments.json")), "utf8"));
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
  words.push({ w: "∂gap", raw: "", s: +(cursor + t).toFixed(3), e: +(cursor + t + GAP).toFixed(3), seg: seg.id, gap: true });
  cursor += t + GAP;
}

const total = +cursor.toFixed(3);
const clock = JSON.stringify({ fps: 30, sample_rate: SAMPLE_RATE, duration_s: total, words });
mkdirSync(join(EP, "transcript"), { recursive: true });
mkdirSync(join(EP, "narration"), { recursive: true });
writeFileSync(join(EP, "transcript/words.json"), clock);
writeFileSync(join(EP, "narration/master.wav"), toWav(Buffer.alloc(Math.round(total * SAMPLE_RATE) * 2)));

console.log(`placeholder clock: ${words.length} words, ${total}s (${(total / 60).toFixed(2)} min)`);
console.log("NOTE: silent audio — run tools/tts.mjs for the real narration; build.mjs needs --allow-silent for this.");
