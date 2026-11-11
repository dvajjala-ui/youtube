#!/usr/bin/env node
/**
 * Local stand-in for studio/tools/build.mjs.
 *
 * Same steps (copy master.wav + words.json into composition/, refuse silent audio, render), but it
 * calls the Remotion CLI by path instead of `npx remotion`. `npx remotion` cannot resolve in this
 * folder until the repo-root `npm install` links this workspace into <root>/node_modules, which we
 * do not run from here. The CLI itself is reached through composition/node_modules/@remotion, a
 * junction to E01's installed copy (same 4.0.540 as the hoisted `remotion` package).
 *
 *   node tools/render.mjs --slice 60 --allow-silent
 *   node tools/render.mjs
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const EP = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const COMP = join(EP, "composition");
const args = process.argv.slice(2);
const arg = (n, d) => (args.indexOf(`--${n}`) >= 0 ? args[args.indexOf(`--${n}`) + 1] : d);
const has = (n) => args.includes(`--${n}`);
const meta = JSON.parse(readFileSync(join(COMP, "package.json"), "utf8")).studio || {};

mkdirSync(join(COMP, "public/narration"), { recursive: true });
mkdirSync(join(COMP, "src/data"), { recursive: true });
copyFileSync(join(EP, "narration/master.wav"), join(COMP, "public/narration/master.wav"));
copyFileSync(join(EP, "transcript/words.json"), join(COMP, "src/data/words.json"));

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
  console.error("REFUSING TO RENDER: master.wav is (near) silent. Run tools/tts.mjs first (or pass --allow-silent).");
  process.exit(1);
}

const cli = join(COMP, "node_modules/@remotion/cli/remotion-cli.js");
if (!existsSync(cli)) {
  console.error(`Remotion CLI not found at ${cli}`);
  process.exit(1);
}
const comp = arg("comp", meta.comp || "Main");
const out = arg("out", meta.out || "out/render.mp4");
const a = [cli, "render", "src/index.ts", comp, out, "--log=error"];
const slice = arg("slice", null);
if (slice) a.push(`--frames=0-${Number(slice) - 1}`);
const t0 = Date.now();
const r = spawnSync(process.execPath, a, { cwd: COMP, stdio: "inherit" });
console.log(`${comp} -> ${out}: exited ${r.status} in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
process.exit(r.status ?? 1);
