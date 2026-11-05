#!/usr/bin/env node
/**
 * Syncs rendered narration into the Remotion project, then renders.
 *
 *   node tools/build.mjs            # copy assets + render the full short
 *   node tools/build.mjs --slice 30 # copy assets + render 30 frames (fast check)
 */
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));
const EP = resolve(HERE, "..");
const COMP = join(EP, "composition");

mkdirSync(join(COMP, "public/narration"), { recursive: true });
mkdirSync(join(COMP, "src/data"), { recursive: true });
copyFileSync(join(EP, "narration/master.wav"), join(COMP, "public/narration/master.wav"));
copyFileSync(join(EP, "transcript/words.json"), join(COMP, "src/data/words.json"));

// loudness sanity: is there actually speech in there?
const wav = readFileSync(join(COMP, "public/narration/master.wav"));
let peak = 0, sum = 0, n = 0;
for (let i = 44; i + 1 < wav.length; i += 2) {
  const s = wav.readInt16LE(i) / 32768;
  peak = Math.max(peak, Math.abs(s));
  sum += s * s;
  n++;
}
console.log(`audio: ${(wav.length / 1048576).toFixed(1)} MB · peak ${peak.toFixed(3)} · rms ${Math.sqrt(sum / n).toFixed(3)}`);
if (peak < 0.05) {
  console.error("REFUSING TO RENDER: master.wav is (near) silent. Run tools/tts.mjs first.");
  process.exit(1);
}

const slice = process.argv.indexOf("--slice");
const args = ["remotion", "render", "src/index.ts", "E01Short", "out/e01-short.mp4", "--log=error"];
if (slice >= 0) args.push(`--frames=0-${Number(process.argv[slice + 1]) - 1}`);

const t0 = Date.now();
const r = spawnSync("npx", args, { cwd: COMP, stdio: "inherit", shell: true });
console.log(`render exited ${r.status} in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
process.exit(r.status ?? 0);
