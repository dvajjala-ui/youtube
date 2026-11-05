# E01 — The Regex That Took Down Cloudflare

Incident: **Cloudflare WAF outage, Tuesday 2 July 2019**. Facts are logged claim-by-claim in
[`sources.csv`](./sources.csv); two widely repeated numbers were checked and **rejected** (C017, C018).

Voice: **Cartesia `sonic-3.6`, voice `Clive — Measured Expert`** (`b24f41fd-00a3-4cd8-992a-a0c9f13f3ef1`).
Seven candidates were auditioned in [`audition/`](./audition/) — all seven transcribed back at 100%
technical-keyword coverage, so the choice is taste plus pace, not clarity. Clive ran at 160 wpm.

---

## 1. The Shorts cut (as rendered — 49.4 s, 1,482 frames)

Narration verbatim. Each line is one segment in [`narration/segments.json`](./narration/segments.json).

| # | Narration | On screen |
|---|---|---|
| s1 | Twenty seven minutes. Eighty percent of Cloudflare's traffic, gone. From one regular expression. | `27 MINUTES` / `80% OF TRAFFIC GONE` / `1 REGULAR EXPRESSION` |
| s2 | July second, twenty nineteen. At thirteen forty two U T C, an engineer deployed one small change to the firewall rules. | Terminal: `git diff rules/xss.re`, `.* = .*` → `.* (?: .* = .* )`, `deploy --all-cities`, "3,868 rules · pushed worldwide" |
| s3 | The rule ran in simulate mode. Real traffic passed through it, but nothing was blocked. Simulate mode still runs the expression. | Traffic squares flowing into a `rule runs / blocks: 0` box that turns red |
| s4 | And this part of the pattern makes the engine branch instead of finishing. Twenty three steps. Then five thousand, three hundred and fifty three. | `.*(?:.*=.*)` over an exponentially branching backtracking tree; step counter `23 → 5,353` |
| s5 | C P U hit one hundred percent on every core. Traffic dropped by eighty percent, in more than one hundred and eighty cities. | CPU line climbing to 100% while the traffic line falls to 20%; counters `180 cities`, `502` |
| s6 | Twenty seven minutes. The fix was a rollback. And in Cloudflare's own words, the test suite never tested for runaway C P U. A regex is code. Test it for time. | Terminal `waf terminate --global` → `✓ 14:07 · traffic recovering`, `✓ 14:09 · cpu normal`; "A REGEX IS CODE / AND IT WAS NEVER / TESTED FOR TIME" |

Mid-roll: none (under 8 minutes, and Shorts are exempt).

---

## 2. The long-form cut (16 min target, ~2,200 words at 140 wpm)

The docs are honest about why 10 minutes is the floor and 15–25 is what performs
(`docs/13` §2, `docs/20` §1). Beat map, each beat a chapter with a story-shaped title:

| # | Beat | Approx | What is on screen | Anchor |
|---|---|---|---|---|
| 1 | Cold open: a green build breaks the internet | 0:00–0:50 | CI checks all passing, then the CPU graph going vertical | C001, C002 |
| 2 | Why one rule touches everything | 0:50–2:10 | 3,868 rules, one ruleset, every request, 180+ cities | C007, C008 |
| 3 | 13:31 → 13:42 | 2:10–3:40 | The PR diff, TeamCity green, the global push | C002 |
| 4 | Simulate mode is not "off" | 3:40–5:20 | Traffic flowing through a rule that blocks nothing but still executes | C009 |
| 5 | What backtracking actually does | 5:20–8:00 | Branching tree, step counter 23 → 33 → 45 → 555 → 5,353 | C010, C011, C012 |
| 6 | **Mid-roll 1** | — | natural pause | — |
| 7 | The page that should not have been needed | 8:00–9:40 | 502s, CPU at 100% on every core, 80% of traffic gone | C006, C014 |
| 8 | Why the rollback took two builds | 9:40–11:40 | 14:00 → 14:07 → 14:09 → 14:52, and the SOP that allowed a global push | C004, C005 |
| 9 | The test that was missing | 11:40–13:00 | Test suite green the whole time; "no increase in test suite run time was observed" | C013 |
| 10 | Reproduce it on your laptop | 13:00–15:00 | Live terminal: `((["']|\s)+)+=` on 24 chars = 0.95 s, on 30 chars = 60 s; then the atomic-group fix = instant | C020, `demo-lab/` |
| 11 | **Mid-roll 2** | — | natural pause | — |
| 12 | What changed, and the rule for you | 15:00–16:30 | RE2-inspired DFA engine, wirefilter, "test for time, not just for matches" | C015, C016 |

Do **not** say "a fifth of the internet" or "less than 1% of requests" on camera — see C017/C018.

---

## 3. Upload pack

**Title (recommended):** `The Regex That Took Down Cloudflare (A True Story)` — 51 chars.
Stricter alternative if you want zero risk of overclaiming: `One Regex, 27 Minutes, 80% of Cloudflare Gone (A True Story)`.

**Thumbnail grammar** (per `docs/18` §4): `1 REGEX` in red, `27 MIN` in white on a digital clock,
the backtracking tree behind it, one terminal block with `.*(?:.*=.*)`. No icon-medallion grid.

**Description opening line:** On 2 July 2019 at 13:42 UTC a single WAF rule, deployed in simulate
mode, drove Cloudflare's edge CPUs to 100% and cost 80% of its traffic for 27 minutes. Sources below.

**Citations to include:** the postmortem, "Making the WAF 40% faster", and the wirefilter repo (all in
`sources.csv`).

**Disclaimer:** the backtracking tree and the step counter are drawn from Cloudflare's own published
appendix; the terminal commands are a dramatised reconstruction, not Cloudflare's real tooling.

---

## 4. Reproduce the pipeline

```bash
cd episodes/E01-regex-outage
node tools/audition.mjs      # score candidate voices (TTS -> STT -> keyword coverage)
node tools/tts.mjs --voice <voice_id>   # narration + word clock
node tools/build.mjs --slice 60         # fast visual check
node tools/build.mjs                    # full render -> composition/out/e01-short.mp4
```

`CARTESIA_API_KEY` is read from the repo-root `.secrets.env`, which is gitignored.
