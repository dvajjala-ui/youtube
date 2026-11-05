# START HERE: the whole project on one page

> This `playbook/` folder replaces the 64 older docs with 7 short files (simplified 2026-11-05).
> Superseded docs were moved, unchanged, to `docs/archive/`. Still-useful reference docs stay in
> `docs/` and `docs/Animated-Tech-Channel/`. `05` maps every one of them.

> **Nov 5 update:** the project now has a second engine, a client video studio. Its plan is in
> `docs/studio/00-business-plan.md`. This playbook stays the truth for the own channel.

## What this is

A YouTube channel of **animated software-incident investigations** ("the regex that took down
Cloudflare"), made by one engineer in Ahmedabad around a day job. Animation is written as code
(Remotion), narration comes from Cartesia TTS or your own voice, and every episode ships with a
**demo-lab** that reproduces the failure on the viewer's laptop.

Reference: @tajpouria (21K subs, 10 videos, 2.63M views). Copy the *format* (incident-first
storytelling with explanatory animation), never the *expression* (scripts, art, title token, voice).

## Where things stand (5 Nov 2026)

| Done ✅ | Not done ❌ |
|---|---|
| Research and planning (way more than enough) | Voice license: free Cartesia audio **can't be monetized** |
| E01 facts verified (`sources.csv`, 2019 not 2022) | E01 long-form (16 min) cut |
| Working pipeline: script → TTS + word clock → Remotion → MP4 | Thumbnail, channel setup, upload |
| 49 s Short rendered, sync bug fixed | Shared component kit (code is still inside E01) |
| Demo-lab `redos.py` works; E01 code committed | Cartesia API key rotation |

## The 5 decisions that are settled

1. **Format:** real postmortems retold as investigations, 12–18 min, plus 2 Shorts each. One long video a month.
2. **Pipeline:** voice is the clock. Every reveal is keyed to a spoken word (`02`).
3. **Stack:** Remotion + TypeScript, Cartesia sonic-3.6, no music, Premiere optional. **Buy nothing except a voice license.**
4. **Truth:** every on-screen number traces to `sources.csv`. Fiction is labeled.
5. **Money:** expect ads in year 2. Career inbound and GitHub Sponsors come first (`03`).

## The 2 decisions only you can make

1. **Voice:** pay Cartesia Pro ($5/mo) and keep "Clive", **or** record your own voice. Listen to `episodes/E01-regex-outage/audition/*.wav` first.
2. **Brand token and name:** don't reuse "(A True Story)". Pick yours (`01` §5) and decide whether your real name goes on the channel (`04`).

## Next 5 actions, in order

1. Rotate the Cartesia API key (it was shared as a screenshot).
2. Make the voice decision. If Cartesia, buy Pro and re-run `node tools/tts.mjs`.
3. Listen to the audition WAVs (kept locally; WAVs are gitignored).
4. Build the E01 long-form from the 12-beat map in `episodes/E01-regex-outage/script.md` §2.
5. Thumbnail ×3, upload pack, publish. Then start E02. **No new planning docs.**

## The 7 files

| File | Read it when |
|---|---|
| `00-START-HERE.md` | Always first |
| `01-channel-strategy.md` | Choosing topics, titles, thumbnails, cadence |
| `02-production-pipeline.md` | Making an episode (steps, tools, QA gate) |
| `03-money-policy-india.md` | Thinking about money, YPP rules or payouts |
| `04-risks-and-rules.md` | Before publishing anything |
| `05-conflicts-resolved-and-doc-map.md` | Old docs say something different |
| `06-suggestions-2026.md` | New ideas from web research, Nov 2026 |
