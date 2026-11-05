# Pipeline-as-product: from E01 to a brief-in → videos-out studio

Everything below is derived from the code that already works in `episodes/E01-regex-outage/`.
Nothing here needs a new animation tool; it needs the E01 code pulled into a shared package and
driven by a brief file.

## 1. What E01 already gives us

| Piece | File | What it does |
|---|---|---|
| Narration manifest | `narration/segments.json` | Title, format, language, speed, list of `{id, text}` segments |
| TTS + word clock | `tools/tts.mjs --manifest … --voice … [--model sonic-3.6]` | One Cartesia call per segment, `add_timestamps: true`, writes `s1..sN.wav`, `master.wav`, `transcript/words.json` |
| Clock | `composition/src/lib/clock.ts` | `spoken(word, afterSec)` → frame; `segRange(id)`; `captionChunks(id, 4)`; throws if a trigger word is missing |
| Component kit | `composition/src/kit.tsx` | Palette, panels, terminal frame, counters |
| Scenes | `composition/src/scenes.tsx`, `Short.tsx` | One scene per segment, reveals keyed to words |
| Render | `tools/build.mjs [--slice N]` | Copies audio + clock into the project, refuses silent audio, renders via `remotion render` |
| Audition | `tools/audition.mjs` | TTS → STT → keyword coverage per voice |

Throughput today: full 1,482-frame vertical render in ~100 s on your laptop. TTS is seconds. The
human time is script + facts + scene code.

## 2. Target architecture

```
youtube/
  studio/                      # shared package (npm workspace)
    package.json
    src/
      kit/            # components: Panel, Terminal, Counter, Node, Link, Packet, Caption, LogStream, Chart
      clock.ts        # generalized: takes words.json path from props, not import
      themes/         # one JSON per client brand: colors, fonts, logo, safe areas
      layouts/        # 16:9, 9:16, 1:1 frames with safe-area helpers
      templates/      # scene families: Hook, Diagram, Terminal, Comparison, CTA, EndCard
    tools/
      tts.mjs         # as today, plus --provider (cartesia | elevenlabs | kokoro)
      build.mjs       # renders every format listed in the brief
      batch.mjs       # folder of briefs → folder of outputs + contact sheet
      review.mjs      # writes an unlisted review page (video + script + comment box)
  clients/
    <client>/
      brand.json
      <project>/
        brief.json
        script.md       # beat map + segments (generated draft, human-edited)
        sources.csv     # client-supplied facts with IDs
        narration/ transcript/ out/   # gitignored heavy files
  episodes/             # own channel, same pipeline, same package
```

## 3. The brief (`brief.json`)

```json
{
  "client": "acme-observability",
  "project": "launch-tracing-2026-11",
  "offer": "launch-explainer",
  "goal": "Explain why Acme's new tail-sampling cuts trace cost 80%",
  "audience": "SRE / platform engineers",
  "cta": "Start free at acme.dev/tracing",
  "facts": "sources.csv",
  "brand": "../brand.json",
  "voice": { "provider": "cartesia", "id": "b24f41fd-…", "model": "sonic-3.6" },
  "formats": [
    { "id": "yt",   "w": 1920, "h": 1080, "captions": "srt" },
    { "id": "reel", "w": 1080, "h": 1920, "captions": "burned" },
    { "id": "sq",   "w": 1080, "h": 1080, "captions": "burned" }
  ],
  "length_s": 75,
  "language": "en",
  "variants": [ { "language": "de" }, { "cta": "Book a demo" } ]
}
```

`formats` × `variants` is where volume comes from legitimately: one approved script and scene set,
rendered into every size, language and CTA the client needs.

## 4. Steps, and who does each

| # | Step | Human / AI / code | Output |
|---|---|---|---|
| 1 | Intake: client fills the site form (goal, audience, facts, assets) | client | `brief.json`, `sources.csv` |
| 2 | Script draft from brief + facts, in the offer's beat structure | AI, then **you edit** | `script.md` with segment IDs |
| 3 | Client approves script (review page) | client | approval log |
| 4 | TTS + word clock | code | `master.wav`, `words.json` |
| 5 | Scene assembly: pick a template per segment, fill props from the script, key reveals to words | AI agent with the kit; **you review stills** | `scenes.tsx` |
| 6 | Render all formats, contact sheet of 8 stills per format | code | `out/*.mp4`, `out/sheet.png` |
| 7 | QA gate (playbook `02` §7, trimmed for client work) | you | checklist |
| 8 | Client review page, 2 revision rounds (script-level changes re-run 4–6 automatically) | client + code | final |
| 9 | Deliver: MP4s, `.srt`, thumbnails, source bundle on request | code | delivery folder |

Because reveals are word-keyed, a script change costs one TTS run and one render, not a re-edit.
That is the real reason this pipeline can be sold on turnaround.

## 5. Anti-template rules (so client videos never look mass-produced)

- Brand theme per client: palette, fonts, logo lockup, motion feel (easing presets, pace).
- At least one bespoke diagram component per project (their architecture, their data flow).
- Template families define *structure*, props define *content*; two clients never share a visible layout and palette.
- Real artifacts from the client (their UI, their logs, their code) over stock visuals.

## 6. Capacity estimate (one person, after the package exists)

| Offer | Your hours | Machine time | Realistic per week |
|---|---|---|---|
| Launch explainer, 60–90 s | 4–6 h | ~10 min | 3–4 |
| Reel pack, 10 reels from existing material | 4–5 h | ~20 min | 2 packs |
| Deep-dive, 5–10 min | 15–25 h | ~1 h | 1 per 2 weeks |

So one person, part-time, can ship roughly **10–20 finished deliverables a week** once the package
exists. Full-time with one editor hired: 2–3×. "100 a day" is only reachable as variants (formats ×
languages × CTAs) of approved masters, which is exactly what §3 is designed for.

## 7. Build order

1. ✅ **Done 2026-11-05.** `studio/` extracted (kit, theme, clock, layouts, tools); E01 renders from it byte-identically (frame 825 compared). See `studio/README.md`.
2. `brand.json` + `layouts/` so one composition renders 16:9 / 9:16 / 1:1. **1 day**
3. `brief.json` schema + `batch.mjs` + contact sheet. **1 day**
4. Three sample projects for the portfolio (fake clients, real quality). **3–4 days**
5. `review.mjs` client page + delivery script. **1 day**
6. Provider switch in `tts.mjs` (ElevenLabs, Kokoro for drafts). **½ day**

Agent prompts: one component or one scene per prompt, always "render stills at frames X, Y, Z and
show me". That is how the E01 sync bug was found and fixed.
