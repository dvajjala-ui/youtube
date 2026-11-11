#!/usr/bin/env node
/**
 * Build the long-form narration manifest from the production transcript.
 * Run from the repo root. See production-plan.md for synthesis commands.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const episode = join(dirname(fileURLToPath(import.meta.url)), "..");
const cast = {
  ARJUN: "cc71692b-f326-499b-8f8f-90a415b4d3fb",
  MAYA: "a33f7a4c-100f-41cf-a1fd-5822e8fc253f",
  ELLIS: "5ee9feff-1265-424a-9d7f-8e4d431a12c7",
  VIK: "382109c0-5c85-4fd1-9d94-b3ec07a4486b",
  SAM: "5568a7df-e5ab-4442-9fae-2e9ba1b15ad8",
  DANIEL: "b24f41fd-00a3-4cd8-992a-a0c9f13f3ef1",
};

const transcript = readFileSync(join(episode, "full-transcript.md"), "utf8");
const beats = transcript.split(/^## Beat /m).slice(1);
if (beats.length !== 8) throw new Error("Expected eight script beats");

const segments = beats.flatMap((body, index) => {
  const beat = index + 1;
  const [heading, ...lines] = body.split(/\r?\n/);
  if (!heading.startsWith(`${beat} · `)) {
    throw new Error(`Expected beat ${beat}, got ${heading}`);
  }

  let shot;
  const entries = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    const shotCue = line.match(/^> \*\*Shot `([\w-]+)`\.\*\* /);
    if (shotCue) {
      shot = shotCue[1];
      continue;
    }
    const hold = line.match(/^> \*\*Hold (\d+) ms\.\*\*$/);
    if (hold) {
      const last = entries.at(-1);
      const pauseMs = Number(hold[1]);
      if (!last || pauseMs > 3000) throw new Error(`Invalid hold in beat ${beat}`);
      last.pauseMs = pauseMs;
      continue;
    }

    const spoken = line.match(/^([A-Z]+) \[([a-z]+)\]: (.+)$/);
    if (!spoken || !shot) throw new Error(`Invalid cue in beat ${beat}: ${line}`);
    const [, role, expression, text] = spoken;
    const dramatized = role !== "NARRATION";
    const actor = dramatized ? role : "ARJUN";
    if (!Object.hasOwn(cast, actor)) throw new Error(`Unknown actor ${actor}`);
    entries.push({
      id: `b${beat}-${String(entries.length + 1).padStart(2, "0")}`,
      speaker: actor.toLowerCase(),
      voice: cast[actor],
      dramatized,
      expression,
      shot,
      text,
      pauseMs: 300,
    });
  }

  const last = entries.at(-1);
  if (!last) throw new Error(`No spoken lines in beat ${beat}`);
  last.pauseMs = Math.max(last.pauseMs, 700);
  return entries;
});

const manifest = {
  title: "E02 — The Cleanup Script That Deleted 883 Sites",
  incident: "Atlassian cloud outage, 5 April 2022",
  format: "long_form",
  fps: 30,
  language: "en",
  speed: 0.92,
  segments,
};
const directory = join(episode, "longform", "narration");
mkdirSync(directory, { recursive: true });
writeFileSync(join(directory, "segments.json"), JSON.stringify(manifest, null, 2) + "\n");

const words = segments.reduce((sum, segment) => sum + segment.text.split(/\s+/).length, 0);
const pauses = segments.reduce((sum, segment) => sum + segment.pauseMs, 0);
console.log(`${segments.length} segments, ${words} spoken words, ${pauses / 1000}s of marked pauses`);
