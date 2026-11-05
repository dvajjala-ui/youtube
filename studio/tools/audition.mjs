#!/usr/bin/env node
/**
 * Objective voice audition: synthesise the same technical excerpt with each
 * candidate voice, transcribe the result back with Cartesia's STT, and score
 * technical-keyword coverage + speaking rate.
 *
 * This cannot tell you which voice you *like*. It tells you which one a machine
 * can transcribe cleanly and how fast it talks — the two things that decide
 * whether technical narration is usable.
 *
 *   node ../../studio/tools/audition.mjs [--excerpt audition/excerpt.json]
 *
 * excerpt.json (optional): { "text": "...", "keywords": [["label", "regex"], ...], "voices": [["name","tag","id"], ...] }
 * Without it, the E01 regex-outage excerpt and the seven Cartesia voices below are used.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { EP, arg, cartesiaKey, CARTESIA_VERSION } from "./_episode.mjs";

const KEY = cartesiaKey();
const H = { Authorization: `Bearer ${KEY}`, "Cartesia-Version": CARTESIA_VERSION, "Content-Type": "application/json" };

const DEFAULTS = {
  // Deliberately loaded with the things TTS usually mangles.
  text:
    "July second, twenty nineteen. At thirteen forty two U T C, an engineer deployed one small change to the firewall rules. " +
    "The rule ran in simulate mode — traffic passed through it, but nothing was blocked. " +
    "Twenty three steps. Then five thousand, three hundred and fifty three. C P U hit one hundred percent on every core, and customers saw five hundred and two.",
  keywords: [
    ["july", "jul"],
    ["2019", "(2019|nineteen|twenty nineteen|two thousand)"],
    ["13:42 utc", "(13:42|13 42|utc|u\\.?t\\.?c|thirteen forty)"],
    ["firewall rules", "(firewall|rules)"],
    ["simulate mode", "simulat"],
    ["traffic", "traffic"],
    ["blocked", "block"],
    ["23 steps", "(23|twenty three)"],
    ["5,353 steps", "(5,?353|five thousand|three hundred and fifty)"],
    ["cpu 100%", "(cpu|c\\.?p\\.?u|100|one hundred)"],
    ["502", "(502|five hundred and two|5 hundred)"],
  ],
  voices: [
    ["Clive - Measured Expert", "GB male", "b24f41fd-00a3-4cd8-992a-a0c9f13f3ef1"],
    ["Quentin - Refined Narrator", "GB male", "5568a7df-e5ab-4442-9fae-2e9ba1b15ad8"],
    ["Rowan - Steady Guide", "GB male", "8c254787-4eb4-4577-bd3d-fb3c273baea2"],
    ["Akash - Structured Presenter", "IN male", "cc71692b-f326-499b-8f8f-90a415b4d3fb"],
    ["Ronald - Thinker", "US male", "5ee9feff-1265-424a-9d7f-8e4d431a12c7"],
    ["Lauren - Lively Narrator", "US female", "a33f7a4c-100f-41cf-a1fd-5822e8fc253f"],
    ["Samuel - Informative Facilitator", "CA male", "382109c0-5c85-4fd1-9d94-b3ec07a4486b"],
  ],
};

const excerptPath = arg("excerpt", null);
const cfg = excerptPath ? { ...DEFAULTS, ...JSON.parse(readFileSync(resolve(EP, excerptPath), "utf8")) } : DEFAULTS;
const EXCERPT = cfg.text;
const KEYWORDS = cfg.keywords.map(([k, rx]) => [k, new RegExp(rx)]);
const VOICES = cfg.voices;

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);

async function tts(id) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch("https://api.cartesia.ai/tts/bytes", {
        method: "POST",
        headers: H,
        body: JSON.stringify({
          transcript: EXCERPT,
          model_id: arg("model", "sonic-3.6"),
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
    headers: { Authorization: `Bearer ${KEY}`, "Cartesia-Version": CARTESIA_VERSION },
    body: fd,
  });
  if (!r.ok) throw new Error(`stt ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return r.json();
}

const dir = join(EP, "audition");
mkdirSync(dir, { recursive: true });
const rows = [];
for (const [name, tag, id] of VOICES) {
  if (!/[0-9a-f]{8}-[0-9a-f]{4}/.test(id)) { console.log(`skip ${name} (id placeholder)`); continue; }
  const file = join(dir, `A_${name.replace(/[^A-Za-z0-9]+/g, "_")}.wav`);
  try {
    // reuse an existing take so we do not burn credits re-saying the same line
    let wav;
    if (existsSync(file)) wav = readFileSync(file);
    else { wav = await tts(id); writeFileSync(file, wav); }
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
writeFileSync(join(dir, "scorecard.json"), JSON.stringify(rows, null, 2));
console.log(`\n${KEYWORDS.length} technical keywords checked. Ranked by how many a listener can hear:`);
for (const r of rows) console.log(`  ${r.coverage}%  ${r.name} (${r.tag}, ${r.wpm} wpm, ${r.secs}s)`);
