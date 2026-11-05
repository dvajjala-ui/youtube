#!/usr/bin/env node
/**
 * Objective voice audition: synthesise the same technical excerpt with each
 * candidate voice, transcribe the result back with Cartesia's STT, and score
 * intelligibility (word error rate) + speaking rate.
 *
 * This cannot tell you which voice you *like*. It tells you which one a machine
 * can transcribe cleanly and how fast it talks — the two things that decide
 * whether technical narration is usable.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const EP = resolve(HERE, "..");
const KEY = process.env.CARTESIA_API_KEY ||
  readFileSync(resolve(EP, "..", "..", ".secrets.env"), "utf8").match(/CARTESIA_API_KEY=(.+)/)[1].trim();
const H = { Authorization: `Bearer ${KEY}`, "Cartesia-Version": "2025-06-30", "Content-Type": "application/json" };

// Deliberately loaded with the things TTS usually mangles.
const EXCERPT =
  "July second, twenty nineteen. At thirteen forty two U T C, an engineer deployed one small change to the firewall rules. " +
  "The rule ran in simulate mode — traffic passed through it, but nothing was blocked. " +
  "Twenty three steps. Then five thousand, three hundred and fifty three. C P U hit one hundred percent on every core, and customers saw five hundred and two.";

const VOICES = [
  ["Clive - Measured Expert", "GB male", "b24f41fd-00a3-4cd8-992a-a0c9f13f3ef1"],
  ["Quentin - Refined Narrator", "GB male", "5568a7df-e5ab-4442-9fae-2e9ba1b15ad8"],
  ["Rowan - Steady Guide", "GB male", "8c254787-4eb4-4577-bd3d-fb3c273baea2"],
  ["Akash - Structured Presenter", "IN male", "cc71692b-f326-499b-8f8f-90a415b4d3fb"],
  ["Ronald - Thinker", "US male", "5ee9feff-1265-424a-9d7f-8e4d431a12c7"],
  ["Lauren - Lively Narrator", "US female", "a33f7a4c-100f-41cf-a1fd-5822e8fc253f"],
  ["Samuel - Informative Facilitator", "CA male", "382109c0-5c85-4fd1-9d94-b3ec07a4486b"],
  ["Ayala - Expert Narrator", "IL female", "ebc02c0d-0000-0000-0000-000000000000"],
];

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);

// Whisper writes digits where the script spells words, so raw WER measures the
// transcripter, not the voice. Keyword coverage does: did the listener hear the
// technical terms at all?
const KEYWORDS = [
  ["july", /jul/],
  ["2019", /(2019|nineteen|twenty nineteen|two thousand)/],
  ["13:42 utc", /(13:42|13 42|utc|u\.?t\.?c|thirteen forty)/],
  ["firewall rules", /(firewall|rules)/],
  ["simulate mode", /simulat/],
  ["traffic", /traffic/],
  ["blocked", /block/],
  ["23 steps", /(23|twenty three)/],
  ["5,353 steps", /(5,?353|five thousand|three hundred and fifty)/],
  ["cpu 100%", /(cpu|c\.?p\.?u|100|one hundred)/],
  ["502", /(502|five hundred and two|5 hundred)/],
];

function wer(ref, hyp) {
  const r = norm(ref), h = norm(hyp);
  const d = Array.from({ length: r.length + 1 }, () => new Array(h.length + 1).fill(0));
  for (let i = 0; i <= r.length; i++) d[i][0] = i;
  for (let j = 0; j <= h.length; j++) d[0][j] = j;
  for (let i = 1; i <= r.length; i++)
    for (let j = 1; j <= h.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (r[i - 1] === h[j - 1] ? 0 : 1));
  return { rate: d[r.length][h.length] / r.length, ref: r.length, hyp: h.length };
}

async function tts(id) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch("https://api.cartesia.ai/tts/bytes", {
        method: "POST",
        headers: H,
        body: JSON.stringify({
          transcript: EXCERPT,
          model_id: "sonic-3.6",
          language: "en",
          voice: { mode: "id", id },
          output_format: { container: "wav", encoding: "pcm_s16le", sample_rate: 48000 },
        }),
      });
      if (!res.ok) throw new Error(`tts ${res.status}: ${(await res.text()).slice(0, 200)}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (e) {
      if (attempt === 2) throw e;
      await new Promise((r) => setTimeout(r, 1500));
    }
  }
}

async function stt(wav) {
  const fd = new FormData();
  fd.append("file", new Blob([wav], { type: "audio/wav" }), "a.wav");
  fd.append("model", "ink-whisper");
  fd.append("language", "en");
  const r = await fetch("https://api.cartesia.ai/stt", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Cartesia-Version": "2025-06-30" },
    body: fd,
  });
  if (!r.ok) throw new Error(`stt ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return r.json();
}

mkdirSync(join(EP, "audition"), { recursive: true });
const rows = [];
for (const [name, tag, id] of VOICES) {
  if (!/[0-9a-f]{8}-[0-9a-f]{4}/.test(id)) { console.log(`skip ${name} (id placeholder)`); continue; }
  const file = join(EP, "audition", `A_${name.replace(/[^A-Za-z0-9]+/g, "_")}.wav`);
  try {
    // reuse an existing take so we do not burn credits re-saying the same line
    let wav;
    try { wav = readFileSync(file); } catch { wav = await tts(id); writeFileSync(file, wav); }
    const t = await stt(wav);
    const heard = t.text.toLowerCase();
    const miss = KEYWORDS.filter(([, rx]) => !rx.test(heard)).map(([k]) => k);
    const cov = +(((KEYWORDS.length - miss.length) / KEYWORDS.length) * 100).toFixed(0);
    const secs = t.duration || (wav.length - 44) / (48000 * 2);
    const wpm = Math.round((norm(EXCERPT).length / secs) * 60);
    rows.push({ name, tag, id, coverage: cov, missed: miss, secs: +secs.toFixed(1), wpm, file });
    console.log(`${name.padEnd(32)} keywords ${String(cov).padStart(3)}%  ${secs.toFixed(1)}s  ${wpm} wpm  ${miss.length ? "MISSED: " + miss.join(", ") : "all heard"}`);
  } catch (e) {
    console.log(`${name.padEnd(32)} FAILED ${String(e.message).slice(0, 140)}`);
  }
}
rows.sort((a, b) => b.coverage - a.coverage || a.wpm - b.wpm);
writeFileSync(join(EP, "audition", "scorecard.json"), JSON.stringify(rows, null, 2));
console.log(`\n${KEYWORDS.length} technical keywords checked. Ranked by how many a listener can hear:`);
for (const r of rows) console.log(`  ${r.coverage}%  ${r.name} (${r.tag}, ${r.wpm} wpm, ${r.secs}s)`);
