# 02. Production Pipeline (as built in E01)

This is the pipeline that actually produced `episodes/E01-regex-outage/composition/out/e01-short.mp4`.
Older docs described several other pipelines. Ignore them; this one has been proven.

## 1. The one rule

> **The voice is the clock.** Lock the script, generate or record narration, get word timestamps,
> and key every visual reveal to a spoken word. Never to elapsed seconds.

E01 found why this matters: a stopwatch-timed counter turned red 0.7 s before the narrator said the
number. The fix was `spoken("five", …)` (`22` §5b).

## 2. Tool stack (decided)

| Job | Tool | Cost | Note |
|---|---|---|---|
| Research + fact log | Postmortems and official docs, `sources.csv` | $0 | Every number on screen has a claim ID |
| Script help | Claude / ChatGPT (editing only) | already paid | You own the facts and the story. AI tightens the wording |
| Narration | **Cartesia `sonic-3.6`, voice "Clive"**, or your own mic | **$5/mo Pro needed to monetize** | Free-tier output is not monetizable |
| Word timestamps | Cartesia `/tts/sse` + `add_timestamps: true` | included | Own voice: Cartesia STT `ink-whisper`, or faster-whisper |
| Animation + render | **Remotion 4 (React + TypeScript)** | $0 (individuals / ≤3-person companies) | One component kit, reused across episodes |
| Code / animation writing | Codex / Claude Code | already paid | One component or one scene per prompt |
| Terminal scenes | Remotion `Terminal` component; VHS `.tape` for real typing; asciinema for real sessions | $0 | Real output, or labeled as dramatized |
| Demo-lab | Python / .NET / Docker Compose | $0 | Must reproduce the failure in ≤3 commands |
| Finish (optional) | Premiere Pro | already paid | Only if a scene needs hand work |
| Thumbnail | Photoshop (or Figma) | already paid | 3 variants per video |
| Music | **None** under narration | $0 | No Content ID risk |
| SFX (optional) | CC0 / Pixabay, each logged in `rights.csv` | $0 | Only on state changes |

**Do not buy:** Grok, AI video generators, Screen Studio (macOS only), Eraser paid, extra NLEs, a
second TTS. The one justified purchase is Cartesia Pro at $5 (or a mic, if you go with your own voice).

## 3. Episode folder (copy E01's layout)

```
episodes/E0N-slug/
  script.md            # beat map + narration + upload pack
  sources.csv          # claim_id, claim, source_url, evidence, status (OK / AVOID_ON_CAMERA)
  rights.csv           # every asset: provider, license URL, commercial_use_verified
  narration/           # segments.json -> s1..sN.wav + master.wav   (wav gitignored)
  transcript/words.json# word clock
  audition/            # voice tests + scorecard.json
  composition/         # Remotion project (src/kit.tsx, scenes.tsx, lib/clock.ts)
  demo-lab/            # repro script + README ("reproduce in one command")
  tools/               # tts.mjs, audition.mjs, build.mjs
```

> Suggestion: after E02, move `kit.tsx`, `clock.ts` and `tools/` into a shared `studio/` package so
> episodes stop copying code (see `06-suggestions` §4).

## 4. The steps

| # | Step | Output | Gate |
|---|---|---|---|
| 1 | Pick topic (filter in `01` §6), write title + thumbnail **first** | title, rough thumb | You would click it |
| 2 | Verify the incident: date, numbers, timeline from the **primary** postmortem | `sources.csv` | Every on-screen number has a claim ID. Rejected claims marked `AVOID_ON_CAMERA` |
| 3 | Build the demo-lab | `demo-lab/` | Breaks on a clean machine in ≤3 commands |
| 4 | Beat map → script (~140–160 wpm; 16 min ≈ 2,200–2,500 words) | `script.md` | Read aloud once. Big question, twist, payoff present |
| 5 | Narration + word clock | `master.wav`, `words.json` | Listen to all of it once. Fix the 3 worst lines and regenerate only those |
| 6 | Scenes in Remotion, every reveal via `spoken(word)` | `scenes.tsx` | `clock.ts` throws if a trigger word is missing |
| 7 | Debug loop: `remotion still` at key frames, 60 s slice renders | PNG stills | Check text at phone size |
| 8 | Full render | `out/*.mp4` | E01: 1,482 frames in ~100 s. Rendering is cheap |
| 9 | QA gate (§7) | checklist | All 12 pass |
| 10 | Upload pack: title, thumbnail ×3, description with sources and disclaimer, chapters, `.srt`, repo link | — | Upload as unlisted and watch it on a phone first |
| 11 | Shorts: 2 cuts with a new hook, burned captions, 1080×1920 | 2 MP4s | Each makes one complete point |
| 12 | Review at 48 h / 7 d / 28 d: CTR, retention dips, comments asking "why?" | `experiment_log.md` | Change one variable next episode |

Commands (E01):
```bash
node tools/audition.mjs                 # TTS -> STT -> keyword coverage per voice
node tools/tts.mjs --voice <id>         # narration + transcript/words.json
node tools/build.mjs --slice 60         # quick check
node tools/build.mjs                    # full render
```

## 5. Voice

- **Pick by ear, not by metric.** At sonic-3.6 every voice scored 100% keyword coverage. Speaking rate (147–169 wpm) and taste are the real differences (`22` §3).
- Write for the ear: one idea per sentence, contractions, and numbers as they are said ("twenty seven minutes").
- Keep a **pronunciation list** per episode: `UTC` → "U T C", `CPU` → "C P U", `502` → "five oh two", `SQL` → pick "sequel" or "S Q L" once and keep it.
- Chunk TTS at 80 to 160 words per segment. Regenerate bad sentences, not whole chapters.
- **Own-voice route:** dynamic USB mic, small soft room, 10 s of room tone, per-section takes, then Premiere Enhance Speech or Adobe Podcast Enhance (free tier). Loudness about −14 LUFS integrated, true peak ≤ −1 dBTP.
- Never clone anyone else's voice.

## 6. Visual rules

- One color = one meaning (E01 kit: red = failure, green = healthy, amber = attention, dim gray = background).
- At most 5 to 7 objects on screen. Dim everything that is not being talked about.
- Order of reveal: **box → label → arrow → value in the arrow.**
- Motion happens because something in the story happens. Request flow moves left to right, call stacks go down, blast radius grows outward.
- Text: labels only, readable on a phone. Code is cropped to the line that matters.
- **Mute test:** a developer can follow the failure with the sound off. **Audio test:** the story makes sense with eyes closed.
- No AI-generated video for anything that explains. Generated footage gets text and arrows wrong.

## 7. Pre-publish gate (12 checks, every video)

1. Every technical claim traces to `sources.csv`, or is labeled as your inference.
2. No numbers marked `AVOID_ON_CAMERA` appear in voice or on screen.
3. `rights.csv` has no `BLOCKED` rows. The voice license allows monetization.
4. Secrets, hostnames, customer and employer names removed. Frames checked at 400% zoom.
5. Every reveal is word-keyed. Nothing moves before it is named.
6. Mid-roll breaks only at natural pauses.
7. Title has an event and is not a listicle. Thumbnail does not copy the reference channel.
8. The description has sources, a "simplified / dramatized" note, story-shaped chapters and the repo link.
9. The demo-lab runs from a clean clone, and its README links the video.
10. Captions `.srt` uploaded and technical terms spelled correctly.
11. Altered/synthetic disclosure ticked **only** if something realistic depicts a real event or person (stylized animation does not need it).
12. Watched once on a phone, start to finish.

## 8. Using AI tools well (Codex / Claude Code)

- Give the agent the repo rules (the E01 code plus a short `AGENTS.md`). One component or one scene per prompt.
- Have it **render stills and look at them**. That is how the E01 sync bug was caught.
- Never let it invent sources or incidents. Ask it to fill `sources.csv` with a URL and the quoted evidence, then check those yourself.
- AI writes code and tightens wording. You own the story, the facts and the voice choice.
