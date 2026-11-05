# 05. Conflicts Resolved + Map of the Old Docs

The 64 docs in `docs/` were written by **four different sources** at different times. They disagree
with each other a lot. This file settles every disagreement once, and tells you which old file is
still worth opening.

## The four layers (why the docs contradict each other)

| Layer | Files | Written by | Core belief | Status now |
|---|---|---|---|---|
| **A. Pasted chat notes** | `001`–`005`, `sre-tech-channel-blueprint`, `content-differentiation-guide`, `git-repo-template`, `production-templates` | Gemini / ChatGPT chat answers, pasted in | ElevenLabs voice, Excalidraw + Premiere pan/zoom, Grok for research, big RPM numbers | **Mostly superseded.** Good ideas (demo-lab, 3-act arc) were carried forward |
| **B. First plan** | `00`–`11` | Claude, before the channel data was visible | Own voice, Remotion, 8–12 min, .NET/Azure topics, $0 spend | **Partly superseded.** Story & voice craft (`10`) still good |
| **C. ChatGPT kit** | `Animated-Tech-Channel/` (28 md + templates + pilot) | ChatGPT "production kit" | Cartesia/ElevenLabs TTS, 7–9 min, 70% fictional stories, human gates | **Partly superseded.** Templates, QA gates and prompts still useful |
| **D. Verified + built** | `12`–`22`, `episodes/E01-regex-outage/` | Claude, with direct checks and a real render | 15–20 min, real incidents with sources, word-timed animation, money math | **Current truth.** Wins every conflict below unless noted |

---

## Every contradiction, one decision each

| # | Topic | What the docs say | **Decision** | Why |
|---|---|---|---|---|
| 1 | Long-form length | 8–12 min (`00`), 7–9 min (ATC), 15–20 min (`13`, `20`, `21`) | **12–18 min, as long as the story needs. Never pad.** E01 long cut targets 16 | Reference channel's hits are all 15+ min, but that is one channel. Mid-rolls need 8+ min |
| 2 | Narrator | Own voice (`00`, `05`, `08`, `15`) vs Cartesia/ElevenLabs TTS (ATC, `22`) | **Open decision for you.** Default: Cartesia Pro ($5/mo) now, because E01 is built around its word timestamps. Test your own voice on video 2 | Both are allowed by YouTube. Free Cartesia output **cannot** be monetized (`22` §4) |
| 3 | How animation timing is found | Manual `cues.json` (`03`), Whisper word timings (`16`, `20`), Cartesia `add_timestamps` (`22`) | **Word timings from the TTS itself** (Cartesia `/tts/sse` + `add_timestamps`). If you record your own voice: Cartesia STT `ink-whisper` or faster-whisper | Built and proven in E01. Exact, free, no drift |
| 4 | Reveal timing rule | "Something changes every 20–40 s" (`01`), "no static frame > 4 s" (`002`, `sre`, `16`), "move only when something happens" (ATC `07`, `16`) | **Every reveal is keyed to a spoken word. Camera moves only toward meaning.** | E01 bug proved stopwatch timing drifts (`22` §5b) |
| 5 | Resolution / fps | 4K 60fps (`production-templates`) vs 1080p 30fps (everything else) | **1920×1080 @ 30 fps** long-form, **1080×1920 @ 30** Shorts | Render speed; nobody in this niche needs 4K60 |
| 6 | Audio inside Remotion? | "Never render audio in Remotion, mix in Premiere" (`04`) | **Remotion renders the full mix** (voice + SFX). Premiere is optional polish | E01 already does this; one command = one finished file |
| 7 | JavaScript vs TypeScript | Plain JS (`04`) vs TS (ATC `08`, E01) | **TypeScript** | E01 is TS; `create-video` default |
| 8 | Visual source | Excalidraw drawings + Premiere pan/zoom (`002`, `003`, `sre`) vs Remotion components (`04`, ATC, E01) | **Remotion components** for everything that explains. Excalidraw only for an optional hand-drawn hero shot | Reusable, re-timeable, exact text |
| 9 | Palette | `#121212` + cyan/mint/coral (`002`, `production-templates`), navy `#0C1424` (ATC `07`) | **E01 palette** (`kit.tsx`): bg `#0D0D0F`, ink `#F2F2F0`, red `#FF3B30`, green `#2ED573`, amber `#FFB020`. One color = one meaning | It is the one actually built. Change only on purpose |
| 10 | Captions | Burned word-by-word everywhere (`002`, `sre`) vs CC track for long-form (`14`, `20`) | **Shorts: burned captions. Long-form: uploaded `.srt` from `words.json`** | Big burned text over a 16-min diagram hurts readability |
| 11 | Music | None (`05`, `20`, E01) vs ducked bed (ATC `06`) | **No music under narration** for now. Sparse SFX only, logged in `rights.csv` | Zero Content ID risk |
| 12 | Editor | Premiere vs Filmora vs DaVinci | **Premiere** if you need an NLE at all. Filmora never for main cut | One timeline, one tool |
| 13 | First video | Retry storm (`06`), Two Customers (ATC, `20`), Regex outage (built) | **E01 = The Regex That Took Down Cloudflare** | It exists, it is sourced, it has a demo-lab |
| 14 | Real vs fictional stories | 70% fictional (ATC `02`) vs "fictional companies safer" (`15`) vs "(A True Story)" brand (`13`, `18`) | **Real, sourced postmortems for the flagship series. Fictional stories are allowed but must NOT carry a "true story" label** | A fictional story titled "(A True Story)" is deceptive. See `06-suggestions` §1 |
| 15 | Title token | Copy "(A True Story)" exactly (`18`) vs "don't copy his branding" (`00`, ATC `01`) | **Do not copy his token. Make your own** (ideas in `01-channel-strategy` §5) | It is his brand mark. Copying it also makes you look like a clone |
| 16 | Thumbnail | Copy his grammar: wojak-style character, clock, terminal (`13`, `18`) vs "don't recycle his thumbnail layout" (ATC `01`) | **Keep the ideas (stakes words, one terminal block, one number). Drop the clone-able parts (his character idiom, his clock, his red bar)** | Same reason as #15 |
| 17 | Ad RPM | $15–35 (`003`, `sre`), $2.33 (`07`), $8–15 planning band (`12`) | **Plan with $3 / $8 / $15** scenarios (`12` §4) | `003`/`sre` numbers have no source; `07` used the wrong niche |
| 18 | Grok | "Highly recommended" (`003`, `sre`) vs skip (`08`, `17`) | **Skip** | Generated video can't draw a correct regex tree |
| 19 | Cadence | 1 per 2 weeks (`00`) vs 1 per month (`21`) | **1 long video per month + 2 Shorts cut from it.** Speed up only if hours per video fall below 30 | `21` §6: hours, not algorithm, is the limit |
| 20 | Fake vs real logs | `LOG_GENERATOR_PROMPT` "synthesize authentic terminal logs" (`git-repo-template`) | **Real output, or clearly labeled dramatization** (E01 script §3 already does this) | Fake-but-"authentic" logs break the trust the channel sells |
| 21 | ElevenLabs settings | Stability 0.38, Similarity 0.80 (`002`, `production-templates`) | **Ignore.** Not using ElevenLabs; settings change per model | — |
| 22 | YPP threshold | 4,000 h (ATC `11`) vs 8,000 h from Feb 2027 (`07`, `12`, `21`) | **Plan against the Feb 2027 rule** (see `03-money-policy-india`) | Newer and cited to YouTube's own pages |

---

## Old file → keep, mine, or skip

**Keep open (still the best version of its topic):**

| File | Why |
|---|---|
| `22-pipeline-build-log.md` | What really happened. Cartesia API shapes, the sync bug, timings |
| `episodes/E01-regex-outage/script.md` + `sources.csv` | The live episode |
| `12-money-blueprint.md`, `21-cadence-odds-and-india-payouts.md` | Full money math (summarized in `03`) |
| `18-topic-bank-and-title-formula.md` | 35-topic bank (use the topics, not the title token) |
| `19-challenges-precautions-and-traps.md` | Full risk register (summarized in `04`) |
| `10-natural-voice-and-story-planning.md` | Best story-craft and voice-craft notes |
| `14-animation-and-capture-stack.md`, `15-voice-audio-and-rights.md` | Verified licenses and prices (as of 2026-11-03) |
| `Animated-Tech-Channel/templates/*` | Working CSV/MD templates (rights, sources, QA gate) |
| `Animated-Tech-Channel/13_PROMPT_LIBRARY.md` | Paste-ready prompts |

**Mine for one idea, then ignore:** `13` (reference data), `16` (live-feel), `17` (comparables),
`20` (build spec — mostly done now), ATC `05` (script scorecard), ATC `16` (six shot families),
ATC `22` (16 premises), ATC `24` (quality scorecard).

**Superseded, moved to `docs/archive/` on 2026-11-05:** `001`–`005`, `sre-tech-channel-blueprint`,
`production-templates`, `git-repo-template`, `content-differentiation-guide`, `00`–`09`, `11`, and
in `archive/Animated-Tech-Channel/`: ATC `README`, `AGENTS.md`, `01`–`04`, `06`–`12`, `14`, `15`,
`17`–`19`, `21`, `23`, `25`, `26`, `pilot/*`, `automation/*`. They are unchanged, and every useful rule
from them is in this playbook. (Some kept docs still link to their old paths; look in `archive/`.)
