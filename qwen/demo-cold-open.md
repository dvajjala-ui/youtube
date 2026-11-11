# E02 cold-open demo (reference-style proof)

Status: built and frame-verified 2026-11-11. ~38s, 1920x1080@30, voice-over narration.
Render: `composition/out/e02-cold-open.mp4` (5.4 MB, 1144 frames).

Verification note: `remotion still` previews proved unreliable here (background
shells cannot launch the headless browser; one still run also returned stale
frames). Verify renders by extracting frames from the mp4 with the bundled
ffmpeg: `remotion ffmpeg -ss <t> -i out/e02-cold-open.mp4 -frames:v 1 out.png`.
All six scenes checked this way. Fixed en route: scene `ends` were computed
from `starts` of the next scene before it existed (single-pass forEach), which
collapsed every frame into the title scene; now two passes.

Polish items for the full build: soften the rectangular edge of the character
monitor-glow in the counter scene; wojak avatars could be tired-er; phone hand
is stylised abstract.

Purpose: prove the look of the BugX / pouria family on our own incident before
committing to a full 12–15 min episode. Consequence-first, not host-first.

## Scene map (grammar source in parentheses)

| # | Scene | Seconds | Reference grammar |
|---|-------|---------|-------------------|
| 1 | Phone in hand: support ticket "Our entire site is gone", red SITE UNREACHABLE pill | 0.0–6.1 | pouria 3am phone prop (`frames/pouria-3am-0012.jpg`) |
| 2 | Terminal: batch 01 green log, clock rewinds 07:46→07:38, batch 02 types in, "EARLIER · BATCH 01 ✓✓✓" recap | 6.1–12.9 | BugX terminal + clock spine |
| 3 | Same terminal: `delete SITE … → OK` rows, SCOPE flips APPS→SITES, chip "the tool returned OK." | 12.9–20.4 | ironic prop: misleading green OK; semantic red/green |
| 4 | 0→883 counter, 24 site cards collapse, arjun shock close-up in red monitor glow | 20.4–25.1 | BugX scale beat + character reaction |
| 5 | Dark Slack-style #incident chat, wojak avatars, 4 escalating messages, support-form paradox | 25.1–29.9 | BugX chat scene (`frames/bugx-restart-0003.jpg`) |
| 6 | Title card: character + "The cleanup script that deleted 883 sites", green ✓ chip flips to red ✗ (prop callback) | 29.9–38.1 | first-person-style title + thumbnail formula |

Global: film grain + vignette + monitor-glow radials, UTC clock chip top-right,
fade in/out, tick/alert SFX reused from `composition/public/narration/`.

## Files

- `episodes/E02-atlassian-site-deletion/coldopen/segments.json` — 6-segment VO manifest (speed 0.92, dramatic pauses)
- `episodes/E02-atlassian-site-deletion/coldopen/narration/` + `transcript/words.json` — Cartesia output (isolated from the full-episode narration)
- `episodes/E02-atlassian-site-deletion/composition/src/ColdOpen.tsx` — composition `E02ColdOpen`
- `episodes/E02-atlassian-site-deletion/composition/public/narration/cold-open.wav` — master VO

## Commands

```sh
# narration (from repo root; voice = arjun/Akash)
node studio/tools/tts.mjs --episode episodes/E02-atlassian-site-deletion/coldopen \
  --manifest segments.json --voice cc71692b-f326-499b-8f8f-90a415b4d3fb
cp episodes/E02-atlassian-site-deletion/coldopen/narration/master.wav \
   episodes/E02-atlassian-site-deletion/composition/public/narration/cold-open.wav

# render (cwd = E02 composition; Remotion CLI lives in E01's node_modules)
../../E01-regex-outage/composition/node_modules/.bin/remotion render src/index.ts E02ColdOpen out/e02-cold-open.mp4
```

Preview still frames: 135 (phone), 345 (rewind), 570 (scope flip), 714 (counter), 870 (chat), 1035 (title).

## Full-episode plan (12–15 min, pending demo approval)

Target ~2,000–2,100 spoken words. Existing `script.md` (10 chapters, ~1,660 words)
is the spine; expand with scene beats, not more exposition:

1. Cold open — this demo, extended to ~75s (add the 14-days consequence line).
2. Ch 1–2 · what was meant to go (~2 min): site-card/app-card line-art interlude (pouria analogy grammar).
3. Ch 3 · the three green checks (~2 min): product-faithful review + staging UI reconstructions; each check answers a narrower question.
4. Ch 4 · the second list (~2 min): side-by-side opaque ID columns; resolve-one-input animation, app vs site.
5. Ch 5 · first clues (~2 min): ticket/chat/call scenes; support form demands the missing URL (paradox beat).
6. Ch 6–7 · recovery route 1 (~2.5 min): 70-step checklist montage, day-counter clock, character fatigue.
7. Ch 8 · recovery route 2 (~2 min): keep-the-identifier comparison; steps cut in half, visualised.
8. Ch 9–10 · the check I would add (~2 min): preview-UI mock ("883 sites selected" → job stops), type-check rejection, soft delete; end on the green-✓ prop callback.

Thumbnail: character shock + red 883 + terminal prop, first-person title.