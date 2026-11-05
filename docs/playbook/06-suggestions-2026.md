# 06. Suggestions (new, from web research on 5 Nov 2026)

These ideas are not in the old docs, or they correct them. Each one says where the evidence comes from.
Prices and policies change; check the official page before you pay or rely on one.

## 1. Fix the honesty gap in the format

- **Don't reuse "(A True Story)".** It is the reference creator's brand token, and the old docs (`13`, `18`) said to copy it exactly. Pick your own token (`01` §5).
- **Never put "true" on a fictional story.** ATC planned "70% fictional" stories, and `18` titled them all "(A True Story)". Those two plans can't be combined honestly.
- **Rule:** real postmortem → "real/true" wording is allowed. Composite or fictional story → label it "a reconstruction" in the title or the first 10 seconds.

## 2. Voice: the choice in one table

| Option | Monthly | Monetizable? | Notes |
|---|---|---|---|
| **Cartesia Pro** (current pipeline) | $5 | ✅ | About 100K chars, roughly 9 videos a month. E01 code already works with it |
| ElevenLabs Starter | $6 | ✅ | Stronger long-form reputation (reputation, not measured). Reportedly licensed only for audio made **while subscribed** |
| Your own voice + Samson Q2U or Fifine-class dynamic mic | one-time ~₹5–11k | ✅ | Strongest authorship signal. Clean it with Premiere Enhance Speech (already paid) |
| Own voice, cloned later (Cartesia Pro / ElevenLabs) | $5–22 | ✅ | YouTube says cloning **your own** voice needs no disclosure. Lets you fix flubs without re-recording |
| Kokoro-82M | $0 | ✅ Apache-2.0 | Fine for timing drafts. A step below the top commercial voices |
| ~~OpenAI TTS~~ | — | — | **Avoid.** All three TTS models are deprecated with a **6 Jan 2027 shutdown**, and its terms force an AI-voice disclosure |
| ~~Free tiers~~ (Cartesia, ElevenLabs, Hume, Fish) | $0 | ❌ | Non-commercial. Fish's pricing page and FAQ contradict each other, so treat it as non-commercial |

**Suggestion:** buy Cartesia Pro now and ship E01 with Clive. For E02, record your own voice once
and A/B it: compare 30-second retention on each video in Studio. Reddit has no data on accent versus
clarity, so your own numbers are the only real answer.

Add one line to every description: *"Narration: AI voice (Cartesia). Research, script, animation
and demo: me."* It isn't required for animation, but a generic AI narrator is a grey zone in
YouTube's disclosure page, and saying it costs nothing.

## 3. Long-form is the core; Shorts are a cheap side dish

- AIR's 18,000-channel study (Mar 2025–Mar 2026): mixing in Shorts helped growth in most niches, **but science/tech was the exception**, with long-form-only channels about 16% ahead. Shorts viewers rarely convert to long-form.
- Shorts views don't count toward the 8,000-hour gate.
- **So:** don't spend more than ~10% of a video's hours on Shorts. Cut 2 from the Remotion scenes you already have, then stop.

## 4. Turn E01's code into a reusable studio (before E02)

- Move `kit.tsx`, `lib/clock.ts` and `tools/*.mjs` into a shared `studio/` folder (an npm workspace). Each episode then holds only `script.md`, data, scenes and its demo-lab.
- Install Remotion's official **agent skills** for Claude Code or Codex (documented at remotion.dev/docs/ai/skills; the install command has changed across versions, so follow the docs). Writers report the same thing E01 showed: **one scene per prompt**, not "make the whole video."
- **Freeze the kit after E02.** New components only if they will be reused. This keeps hours falling, and visuals that vary per episode keep you clear of the "templated" monetization rule.

## 5. Packaging first (the Paddy Galloway rule)

1. Before scripting, write **5 titles and 3 thumbnail sketches**. If none excites you, the idea isn't ready.
2. Use **1of10's free outlier search** to see which incident or SRE videos beat their channel average by 10× or more. That shows what packaging works in this niche right now.
3. Once you have impressions, use YouTube **Test & Compare** (up to 3 thumbnails and titles, judged on watch-time share, about 2 weeks). It is useless under about 1K views per video, so don't wait on it early.
4. Benchmarks for sanity, not targets: impressions CTR for most channels is 2–10% (YouTube Help). 35–50% retention is strong for new educational channels (single vendor source).

## 6. Start an email list from video 1

The 2027 YPP bar (8,000 h for new applicants, now confirmed on YouTube's help page) roughly doubles
the runway to ads. The cheapest hedge is an owned audience:
- A free newsletter (Buttondown or Substack) with a **written postmortem** for each episode: sources, the demo-lab and one diagram. It also gives search traffic and becomes a sponsor asset later.
- Link it next to the repo in every description.

## 7. A fact-check protocol that survives LLM hallucination

Research (FalseCite, arXiv 2026) shows LLMs invent plausible citations, and that precise-looking
numbers sound *more* credible. E01 caught two fake "facts" and a wrong year this way. Make it standard:
- Script **only** from the primary postmortem and official docs.
- When an AI helps, it must return a **quote plus URL** for each claim into `sources.csv`. You click every URL.
- Numbers that appear only in secondary sources are marked `AVOID_ON_CAMERA`.

## 8. India money: corrections to the old docs

- **Form 15CA/15CB is not needed** for AdSense receipts. Those forms are for *outward* remittances.
- Ask your bank for a **FIRA / e-FIRC** for each wire. Confirm the purpose code with the bank (creator blogs suggest P0802; unconfirmed).
- W-8BEN with the treaty claim gives 15% on US-viewer earnings only. No form means up to 24% on all earnings. Your PAN typically serves as the foreign tax ID.
- GST registration is needed above ₹20 lakh turnover. AdSense is zero-rated export (file an LUT). **Indian** sponsors are domestic supplies and attract 18% GST once you are registered.
- On top of a salary, YouTube income is likely business income (ITR-3 or ITR-4). Settle all of this in one CA meeting.
- Realistic early sponsor fees for 1K–10K-sub dev channels: about **$50–500 flat** (sources disagree widely). Ignore the $3,000–15,000 figures in `003` / `sre-tech-channel-blueprint`.

## 9. Topic ideas from big public postmortems in your lane

Real, well-documented, high search interest, and each one has a laptop-sized repro:
- **AWS us-east-1, Oct 2025:** DynamoDB DNS automation race → empty DNS record (race condition plus automation)
- **CrowdStrike, Jul 2024:** a content update read past the end of an array, then BSODs worldwide (bounds checks, staged rollout)
- **GitLab, Jan 2017:** `rm -rf` on the wrong database, and 5 backup methods that didn't work (restore drills)
- **Knight Capital, 2012:** a dead feature flag reused, $440M lost in 45 minutes (deploy hygiene)
- Azure / Microsoft 365 outages from Azure Front Door and Entra (your Azure edge). Use Microsoft's published Post Incident Reviews.

Check each one against its primary postmortem first, as E01 did.

## 10. Housekeeping

- **Rotate the Cartesia key** and keep `.secrets.env` out of git (it is ignored today).
- **Commit** `episodes/`, `.gitignore`, `docs/22` and `docs/playbook/`. WAVs and renders stay ignored; publish final MP4s as GitHub Releases, not commits.
- **Archive the superseded docs** into `docs/archive/` (list in `05`) so the next AI session doesn't re-read 64 files and re-litigate settled decisions.
- **Track real hours per step** in each `script.md`. `22` §5 proved rendering is cheap; find out what really eats your time.
- **Pin tool versions** (`package-lock.json` is committed) and tag the repo at every publish.

## Sources (accessed 2026-11-05 unless dated)

[Remotion license](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md) ·
[Remotion FAQ](https://www.remotion.dev/docs/license/faq) ·
[Remotion pricing](https://www.remotion.pro/license) ·
[Cartesia pricing](https://cartesia.ai/pricing) ·
[ElevenLabs pricing](https://elevenlabs.io/pricing) ·
[Fish Audio plans](https://fish.audio/plan/) ·
[Hume TTS FAQ](https://dev.hume.ai/docs/text-to-speech-tts/faq) ·
[OpenAI TTS guide (deprecation)](https://developers.openai.com/api/docs/guides/text-to-speech) ·
[Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) ·
[YouTube monetization policies](https://support.google.com/youtube/answer/1311392) ·
[YouTube AI disclosure](https://support.google.com/youtube/answer/14328491) ·
[YPP changes 2027](https://support.google.com/youtube/answer/12843009) ·
[YouTube CTR help](https://support.google.com/youtube/answer/7628154) ·
[AIR Shorts study](https://air.io/en/audience-growth/do-youtube-shorts-help-your-long-form-videos-grow-data-from-18000-channels) ·
[Test & Compare titles, Tubefilter Jul 2025](https://www.tubefilter.com/?p=187324) ·
[US tax info (Google)](https://support.google.com/youtube/answer/10391362) ·
[Form 15CA/CB scope (Skydo)](https://web.skydo.com/blog/understanding-form-15-ca-cb-comprehensive-guide) ·
[FalseCite (arXiv)](https://arxiv.org/html/2602.11167) ·
[Reducible source](https://github.com/nipunramk/Reducible) ·
[Sponsorship rates (outlierkit)](https://outlierkit.com/resources/youtube-sponsorship-rates/)
