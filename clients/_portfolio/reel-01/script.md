# Reel 01 — PostgreSQL 18: Asynchronous I/O

Portfolio piece A: a 30 s vertical feature reel (1080×1920, 30 fps) about one real, recent feature
of a popular open-source developer tool. **Unsolicited concept, not affiliated with PostgreSQL.**

Subject: the **asynchronous I/O (AIO) subsystem** shipped in PostgreSQL 18 on 25 September 2025.
Every number and claim on screen is logged in [`sources.csv`](./sources.csv) against the official
release announcement, the release notes and the runtime-configuration docs.

Voice: Cartesia `sonic-3.6`, voice "Clive" (`b24f41fd-00a3-4cd8-992a-a0c9f13f3ef1`).

---

## 1. Beat map

| Beat | Job | Seconds (target) |
|---|---|---|
| Hook | "one block at a time, and wait" — the serial read, drawn | 0–3 |
| Problem | the three operations that pay for it; the OS cannot see the access pattern | 3–9 |
| Feature as the fix | AIO: backends queue many reads; `io_method` = worker / io_uring / sync | 9–18 |
| Proof | `SHOW io_method;` → `worker`, `SHOW io_workers;` → `3`; up to 3× faster reads | 18–26 |
| Takeaway | upgrade, keep the default, measure | 26–30 |

## 2. Narration (verbatim, one row = one segment in `narration/segments.json`)

Numbers are written as they are spoken. 79 spoken words (letters counted), ~30 s at 160 wpm.

| # | Narration | On screen | Keyed reveals (`spoken(word)`) |
|---|---|---|---|
| s1 | Postgres used to read your table one block at a time, and wait. | wordmark `PostgreSQL 18`; a row of table blocks; one reader cursor stepping block by block; `WAIT` stall marker | table → blocks; one → cursor; time → serial stepping; wait → stall marker |
| s2 | Sequential scans, bitmap scans, vacuum. Each read waits for the last. The O S can't see what's coming. | three operation chips; a serial read timeline `READ · WAIT · READ · WAIT`; note "OS readahead cannot see the access pattern" | sequential / bitmap / vacuum → chips; waits → timeline; see → note |
| s3 | Postgres eighteen adds asynchronous I O. Backends queue many reads at once. I O method: worker, I O U ring, or sync. | `POSTGRES 18` → `ASYNC I/O`; a backend fanning out many reads in flight at once; `io_method =` with the three values | eighteen → head; asynchronous → ASYNC I/O; queue → fan-out; method → panel; worker / ring / sync → values |
| s4 | The default is worker. Three I O workers. Benchmarks show up to three times faster reads from storage. | terminal: `psql -c "SHOW io_method;"` → `worker`; `psql -c "SHOW io_workers;"` → `3`; hero `3×` "faster reads from storage · up to, in benchmarks" | default → typing; worker → output; three → second command; workers → output; times → hero number |
| s5 | Upgrade. Keep the default. Measure. Postgres eighteen, out now. | `UPGRADE` / `KEEP THE DEFAULT` / `MEASURE`; wordmark; end card "Unsolicited concept, not affiliated with PostgreSQL." + `studio.example` | upgrade / keep / measure → lines; eighteen → wordmark; now → end card |

## 3. Pronunciation list

`I/O` → "I O"; `io_uring` → "I O U ring"; `OS` → "O S"; `18` → "eighteen"; `3×` → "three times".

## 4. Honesty notes

- "Up to three times faster reads from storage" is the project's own wording ("up to 3× performance
  improvements when reading from storage", "in certain scenarios"). The on-screen label says
  "up to · in benchmarks" so the number is never shown as a guarantee.
- The terminal output is the documented default (`io_method` default `worker`, `io_workers` default
  `3`) printed in psql's standard `SHOW` layout. It was not captured from a live server (C008, C009).
- The serial-read and fan-out drawings are schematic, not a trace of real I/O.

## 5. What I'd change for a client

Swap `brand.json` for the client palette, replace the text wordmark with the licensed logo, and
re-record the proof scene from a real `psql` session on their reference hardware.

## 6. Reproduce

```bash
cd clients/_portfolio/reel-01
node tools/placeholder.mjs                 # silent audio + estimated clock (smoke test)
node tools/build.mjs --slice 60 --allow-silent
node tools/tts.mjs --voice b24f41fd-00a3-4cd8-992a-a0c9f13f3ef1
node tools/build.mjs                       # -> composition/out/reel-01.mp4
```
