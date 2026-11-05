# 22. Pipeline Build Log — first rendered video (2026-11-03)

This is the first file in the repo that describes a **rendered artifact** rather than a plan.
`docs/20` said the next artifact after the plan files should be an MP4. It exists now:
`episodes/E01-regex-outage/composition/out/e01-short.mp4` (49.4 s, 1080x1920, 30 fps, H.264 + AAC 48 kHz).

Read `episodes/E01-regex-outage/script.md` for the episode itself. This file records only what the
build taught us, because those are the things that would otherwise be re-discovered next episode.

## 1. Topic change: the regex outage is 2019, not 2022

The premise carried in the earlier planning files pointed at a "June 2022 WAF regex incident".
That is wrong, and the error is common: **Cloudflare's 21 June 2022 outage was a BGP prefix
withdrawal** ([postmortem](https://blog.cloudflare.com/cloudflare-outage-on-june-21-2022/)).
The regex / catastrophic-backtracking / 100%-CPU incident is **2 July 2019**
([postmortem](https://blog.cloudflare.com/details-of-the-cloudflare-outage-on-july-2-2019/)).

Two numbers that circulate in summaries of the 2019 incident are **not in the primary source** and
are now banned from the script: "the rule was expected to affect less than 1% of requests", and
"Cloudflare serves 20% of the internet" (that figure is a 2021 third-party estimate). What the
postmortem actually says: **27 minutes**, **80% of Cloudflare's traffic lost**, **more than 180
cities**, **3,868 rules**, and step counts 23 / 33 / 45 / 555 rising to 90 / 5,353.

Lesson for every future episode: the incident's *date and numbers* get verified against the
postmortem before the script is written, not after. `sources.csv` now carries an explicit
`AVOID_ON_CAMERA` status for rejected claims.

## 2. Cartesia: the working API shape (docs are behind the API)

Everything below was found by probing, because the public docs page now requires a login.

| Thing | Working value |
|---|---|
| Auth | `Authorization: Bearer <key>` + `Cartesia-Version: 2025-06-30` |
| Voice | `voice: { mode: "id", id: "<uuid>" }` — **not** `speaker_id`, **not** `voice_id` |
| Model | `sonic-3.6` (also `sonic-3.5`, `sonic-3`, `sonic-preview`) via `GET /models` |
| File output | `POST /tts/bytes`, `output_format: { container: "wav", encoding: "pcm_s16le", sample_rate: 48000 }` |
| **Word timings** | `POST /tts/sse` with `container: "raw"` **and** `add_timestamps: true` |
| Speech-to-text | `POST /stt`, multipart, field `model=ink-whisper` (not `model_id`) |

`word_timestamps: true`, `timestamps: true` and `emit: [...]` are all silently ignored. Only
`add_timestamps` returns them.

**This replaces the Whisper step in `docs/20` §3.** Cartesia hands back per-word start/end times for
the audio it just made, which is exact and free. `tools/tts.mjs` writes `transcript/words.json`
directly, and `composition/src/lib/clock.ts` animates against it. No faster-whisper, no model
download, no drift.

## 3. Voice audition: the obvious metric was useless

Ranking voices by word-error-rate against a Whisper transcription scored 44.4% for **every** voice,
because Whisper writes "2019" where the script says "twenty nineteen". It was measuring the
transcriber, not the voice.

What works: synthesise a deliberately awkward technical excerpt, transcribe it back, and check
**keyword coverage** — did the listener hear "UTC", "simulate", "5,353", "CPU", "502" at all.
Seven voices (Clive, Quentin, Rowan, Akash, Ronald, Lauren, Samuel) all scored **100%**. So on
`sonic-3.6` intelligibility is not a differentiator; speaking rate (147–169 wpm) and taste are.
`tools/audition.mjs` does this and writes `audition/scorecard.json`.

Chosen: **Clive — Measured Expert**, GB male, 160 wpm. Swap with one command:
`node tools/tts.mjs --voice <id> && node tools/build.mjs`.

## 4. The blocker: Cartesia's free plan forbids monetised output

Terms §5.3(b) on the free tier: *"You represent and warrant that you will not monetize... any of
Your Outputs."*

So the audio rendered today is a **pipeline proof, not publishable narration**. Before uploading
anything with this voice, either buy Cartesia Pro (advertised $5/month) and re-run `tools/tts.mjs`,
or use a licence that permits commercial use. `rights.csv` row A001 is marked
`BLOCKED_NEEDS_PAID_PLAN` so this cannot be forgotten at upload time. This is the exact scenario
`docs/15` warned about, now confirmed from the terms rather than assumed.

Also: the API key was pasted into chat as a screenshot. It lives in `.secrets.env` at the repo root,
which `.gitignore` excludes, but treat that key as exposed and rotate it when convenient.

## 5. What actually took time (for the 60-hour target on video 2)

| Step | Real cost | Note |
|---|---|---|
| Cartesia schema discovery | ~20 min | one-off; now documented above and in code |
| Fact verification | ~13 min | one background research pass; caught the 2019/2022 error |
| First render (90 frames) | 55 s | includes bundling + browser start |
| Full 1,482-frame render | **100 s** | far cheaper than feared; iterating on the whole short is viable |
| Re-render after one scene edit | **149 s** | final verified cut, 5.42 MB |
| Frame checks | ~15 s per still | `remotion still` is the right debugging loop |

Rendering is not the bottleneck. Script accuracy and voice rights are.

## 5b. The debug loop that fixed the last defect

The final visual bug was a **caption/animation desync**: the S4 step counter jumped to `5,353` on a
stopwatch threshold (`secs > 3.6`), so the number turned red ~0.7 s before the narrator said
"five thousand, three hundred and fifty three". Fixed by making the reveal word-triggered, exactly
like everything else in the episode:

```tsx
const stepWord = spoken("twenty", segRange("s4").start);  // 26.81 s
const bigWord  = spoken("five",  segRange("s4").start);   // 28.62 s
const hot      = frame >= bigWord;
const shown    = frame >= stepWord ? (hot ? 5353 : 23) : 0;
```

Verified by rendering stills at frame 735 (24.5 s: tree building, no count), 825 (27.5 s: grey tree,
`steps → 23`, caption "TWENTY THREE STEPS") and 885 (29.5 s: red tree, `steps → 5,353`, caption
"THEN FIVE THOUSAND, THREE"). Rule for future episodes: **never key a reveal to elapsed scene time —
key it to a spoken word**, and let `clock.ts` throw if the word is missing.

## 6. Next actions, in order

1. Listen to `audition/*.wav` and confirm or change the voice (this is the one decision a machine
   cannot make).
2. Decide the voice plan: Cartesia Pro, or regenerate under a commercially-licensed route.
3. Build the long-form cut from the 12-beat map in `episodes/E01-regex-outage/script.md` §2.
4. Only then: thumbnail, title, description, upload.
