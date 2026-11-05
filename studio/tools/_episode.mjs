/**
 * Shared helpers for the studio tools: which project folder we are working in,
 * where the repo root is, and the Cartesia key.
 *
 * Every tool accepts `--episode <dir>` (an episode or client project folder that holds
 * narration/, transcript/, composition/). Default: the current working directory.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

export const args = process.argv.slice(2);

export const arg = (name, dflt) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : dflt;
};

export const has = (name) => args.includes(`--${name}`);

export const EP = resolve(arg("episode", process.cwd()));

export function repoRoot(from = EP) {
  let d = from;
  for (let i = 0; i < 8; i++) {
    if (existsSync(join(d, ".git")) || existsSync(join(d, ".secrets.env"))) return d;
    const up = dirname(d);
    if (up === d) break;
    d = up;
  }
  return from;
}

export const REPO = repoRoot();

export function cartesiaKey() {
  if (process.env.CARTESIA_API_KEY) return process.env.CARTESIA_API_KEY;
  const f = join(REPO, ".secrets.env");
  if (existsSync(f)) {
    const line = readFileSync(f, "utf8")
      .split(/\r?\n/)
      .find((l) => l.startsWith("CARTESIA_API_KEY="));
    if (line) return line.slice("CARTESIA_API_KEY=".length).trim();
  }
  throw new Error("CARTESIA_API_KEY not found (env or <repo>/.secrets.env)");
}

export const CARTESIA_VERSION = "2025-06-30";
export const SAMPLE_RATE = 48000;

/** 16-bit mono PCM -> WAV buffer */
export function toWav(pcm, sampleRate = SAMPLE_RATE) {
  const h = Buffer.alloc(44);
  h.write("RIFF", 0);
  h.writeUInt32LE(36 + pcm.length, 4);
  h.write("WAVE", 8);
  h.write("fmt ", 12);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); // PCM
  h.writeUInt16LE(1, 22); // mono
  h.writeUInt32LE(sampleRate, 24);
  h.writeUInt32LE(sampleRate * 2, 28);
  h.writeUInt16LE(2, 32);
  h.writeUInt16LE(16, 34);
  h.write("data", 36);
  h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}

/** Reads `composition/package.json` "studio" block: { comp, out } defaults for build.mjs. */
export function compositionMeta() {
  const p = join(EP, "composition", "package.json");
  if (!existsSync(p)) return {};
  return JSON.parse(readFileSync(p, "utf8")).studio || {};
}
