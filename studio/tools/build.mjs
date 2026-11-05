#!/usr/bin/env node
/**
 * Syncs rendered narration into the Remotion project, then renders.
 *
 *   node ../../studio/tools/build.mjs                  # copy assets + render the default composition
 *   node ../../studio/tools/build.mjs --slice 30       # render only the first 30 frames (fast check)
 *   node ../../studio/tools/build.mjs --comp E01Short --out out/e01-short.mp4
 *   node ../../studio/tools/build.mjs --all            # render every composition listed in package.json "studio.comps"
 *
 * Defaults come from composition/package.json:
 *   "studio": { "comp": "E01Short", "out": "out/e01-short.mp4", "comps": { "E01Short": "out/e01-short.mp4" } }
 */
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { EP, arg, has, compositionMeta } from "./_episode.mjs";

const COMP = join(EP, "composition");
const meta = compositionMeta();

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
if (peak < 0.05 && !has("allow-silent")) {
  console.error("REFUSING TO RENDER: master.wav is (near) silent. Run tools/tts.mjs first (or pass --allow-silent for a placeholder smoke test).");
  process.exit(1);
}

const slice = arg("slice", null);
const jobs = has("all") && meta.comps
  ? Object.entries(meta.comps)
  : [[arg("comp", meta.comp || "Main"), arg("out", meta.out || "out/render.mp4")]];

let status = 0;
for (const [comp, out] of jobs) {
  const a = ["remotion", "render", "src/index.ts", comp, out, "--log=error"];
  if (slice) a.push(`--frames=0-${Number(slice) - 1}`);
  const t0 = Date.now();
  const r = spawnSync("npx", a, { cwd: COMP, stdio: "inherit", shell: true });
  console.log(`${comp} -> ${out}: exited ${r.status} in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  status ||= r.status ?? 0;
}
process.exit(status);
