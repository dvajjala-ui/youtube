#!/usr/bin/env node
/**
 * Build narration/segments.json for the full E02 episode from full-transcript.md.
 *
 * The transcript is the source of truth: verbatim VO lines become segments,
 * blockquote production notes and [TAG] lines are never spoken. Dramatized
 * CUSTOMER/SUPPORT lines become their own segments with the right voice.
 *
 * Run from the repo root:
 *   node episodes/E02-atlassian-site-deletion/tools/segments-from-transcript.mjs
 *
 * Then synthesize:
 *   node studio/tools/tts.mjs --episode episodes/E02-atlassian-site-deletion \
 *     --voice cc71692b-f326-499b-8f8f-90a415b4d3fb
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const EP = join(dirname(fileURLToPath(import.meta.url)), "..");
const ARJUN = "cc71692b-f326-499b-8f8f-90a415b4d3fb";
const MAYA = "a33f7a4c-100f-41cf-a1fd-5822e8fc253f";

const transcript = readFileSync(join(EP, "full-transcript.md"), "utf8");
const beats = transcript.split(/^## Beat /m).slice(1);

// Shot hints per beat, indexed by paragraph order (scene-building aids only).
const shots = {
  1: ["phone", "terminal", "counter", "chat", "title"],
  2: ["analogy", "analogy", "analogy", "analogy", "sitecard", "sitecard", "sitecard"],
  3: ["review", "review", "staging", "batch", "checks", "checks", "checks", "checks"],
  4: ["ids", "ids", "resolve", "resolve", "resolve", "resolve", "terminal", "terminal"],
  5: ["chat", "chat", "dashboard", "chat", "form", "form", "call", "call", "chat"],
  6: ["anatomy", "anatomy", "anatomy", "remap", "checklist", "checklist", "daycounter", "daycounter", "daycounter"],
  7: ["identity", "identity", "steps", "validation", "validation", "daycounter", "identity"],
  8: ["preview", "preview", "preview", "controls", "controls", "controls", "closer", "closer", "closer", "closer"],
};
// Marked silent holds / dialogue pacing (pauseMs after the segment).
const pauseOverrides = {
  "b1-05": 2000, // title card hold
  "b3-08": 1500, // amber question, 1.5 s silence
  "b5-06": 800, // form cursor blink before the call
  "b5-07": 400, // CUSTOMER -> SUPPORT
  "b5-08": 600, // call -> narration
  "b6-08": 2000, // day counter hold, beat of silence
  "b8-10": 2000, // final green OK frame
};
const expressionOverrides = {
  "b1-03": "shock",
  "b6-07": "smile",
  "b7-06": "smile",
};

const segments = [];
const perBeat = {};

beats.forEach((beatText, bi) => {
  const beat = bi + 1;
  const body = beatText.split(/^## /m)[0];
  // First line is the header remainder ("1 · Cold open …") — never spoken.
  const lines = body.split("\n").slice(1);
  let para = [];
  let n = 0;

  const flush = () => {
    if (!para.length) return;
    n += 1;
    const id = `b${beat}-${String(n).padStart(2, "0")}`;
    const text = para.join(" ");
    para = [];
    segments.push({
      id,
      speaker: "arjun",
      expression: expressionOverrides[id] ?? "neutral",
      gesture: "rest",
      shot: shots[beat][n - 1] ?? "desk",
      text,
      pauseMs: pauseOverrides[id] ?? 400,
    });
  };

  for (const raw of lines) {
    const l = raw.trim();
    if (!l || l.startsWith(">") || l.startsWith("[") || /^---+$/.test(l)) {
      flush();
      continue;
    }
    const dlg = l.match(/^(CUSTOMER|SUPPORT)\s*\((maya|arjun)\):\s*(.*)$/);
    if (dlg) {
      flush();
      n += 1;
      const id = `b${beat}-${String(n).padStart(2, "0")}`;
      const who = dlg[1];
      segments.push({
        id,
        speaker: dlg[2],
        expression: who === "CUSTOMER" ? "shock" : "neutral",
        gesture: "rest",
        shot: "call",
        dramatized: true,
        text: dlg[3],
        voice: who === "CUSTOMER" ? MAYA : ARJUN,
        pauseMs: pauseOverrides[id] ?? 400,
      });
      continue;
    }
    para.push(l);
  }
  flush();

  // Beat boundary: longer breath before the next beat (unless a hold overrides).
  const last = segments[segments.length - 1];
  if (!(last.id in pauseOverrides)) last.pauseMs = 800;
  perBeat[beat] = n;
});

// Verify: spoken word count must match the measured transcript total (1,897 —
// VO only; beat headers and rules are not spoken).
const words = segments.reduce(
  (acc, s) => acc + s.text.split(/\s+/).filter(Boolean).length,
  0
);
const chars = segments.reduce((acc, s) => acc + s.text.length, 0);

const manifest = {
  title: "E02 — The cleanup script that deleted 883 sites (full episode)",
  incident: "Atlassian cloud outage, 5 April 2022",
  format: "long_form",
  fps: 30,
  language: "en",
  speed: 0.92,
  segments,
};

mkdirSync(join(EP, "narration"), { recursive: true });
writeFileSync(
  join(EP, "narration", "segments.json"),
  JSON.stringify(manifest, null, 2) + "\n"
);

console.log(`segments: ${segments.length}  per beat: ${JSON.stringify(perBeat)}`);
console.log(`spoken words: ${words} (transcript target 1897)`);
console.log(`chars to synthesize: ${chars}`);
if (words !== 1897) {
  console.error("WORD COUNT MISMATCH — transcript changed; update the target.");
  process.exit(1);
}