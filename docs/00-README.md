# Animated Tech Explainer Channel: Master Plan

Style reference: the @tajpouria YouTube channel (first-principles system explainers with visualization).
Read this file first. Then follow the files in order.

---

## 1. Goal

- Build a YouTube channel of animated, first-principles tech explainers
- Output: 1 solid video every 2 weeks, 8 to 12 minutes each
- Everything original: your scripts, your voice, your animations (made with code)
- Long-term: ad revenue, sponsors, consulting and job leads

---

## 2. What I verified and what I could not

| Item | Status |
|---|---|
| Channel About text (SRE, distributed systems, first principles, visualization) | Verified from the channel page |
| 21K subs, 10 videos, 2.63M views | From your screenshot |
| His video titles and per-video views | NOT verified. YouTube blocked automated access to the video list and the feed |
| Tools he uses to animate and edit | NOT verified. No public source found |
| His GitHub shows a Go repo "tiny-mapreduce" linked to a YouTube video, and a "codecrafters-shell-go" repo | Seen in search results. Suggests a "build it yourself, then visualize it" habit |
| I cannot watch videos | I can only read text (pages, transcripts) |

What this means:
- The style blueprint in file 01 is built from his stated goal + common conventions of this genre
- File 01 has a worksheet. Fill it from 3 of his videos and send it to me. I will tighten the blueprint
- Faster option: paste the transcripts of 2 or 3 of his videos (YouTube > "...more" > "Show transcript"). I can analyze structure and pacing from text

---

## 3. Ground rules

- COPY: the format (structure, pacing, visual language, calm tone)
- DO NOT COPY: his scripts, his exact visuals or layouts, his branding, his voice
- DO NOT clone his voice or anyone else's voice
- Why: YouTube "inauthentic content" rules, copyright, and impersonation risk
- Style is fair game. Content and identity are not

---

## 4. Decisions made

| Question | Decision | Why |
|---|---|---|
| Animation tool | Remotion (React + JSX) | You already know React. Codex writes React well. Free for individuals (read its license page before you monetize) |
| Final edit | Adobe Premiere Pro | Audio cleanup, captions, cuts, export |
| Filmora | Backup only (Shorts, quick cuts) | Two main editors = two workflows. Avoid |
| Voice | Your own voice, recorded | Safest for policy, builds trust, voice is the main retention driver |
| Draft voice | Kokoro (free, open-source TTS) | Only to test script length and pacing |
| AI help | Codex for animation code. ChatGPT chat for script editing | Same subscription. Usage is capped, so plan batches |
| Topic angle | Your own stack: .NET, Azure, SQL Server internals | Real experience = original content. Less crowded than generic distributed systems |

---

## 5. File index

| File | What is inside |
|---|---|
| 00-README.md | This file |
| 01-style-blueprint.md | The look, structure, pacing and the teardown worksheet |
| 02-tool-stack.md | Every tool, its job, cost, setup checklist |
| 03-production-workflow.md | Step-by-step pipeline for one video, with time estimates |
| 04-codex-prompts.md | Ready prompts and project rules for Codex |
| 05-voice-and-audio.md | Script for the ear, recording, Premiere audio chain, AI voice rules |
| 06-30-day-plan.md | Day-by-day plan, first 5 topic ideas, success checks |
| 07-monetization-and-risks.md | Earnings path, thresholds, risks, do-not-do list |
| 08-voice-tools-and-subscriptions.md | Cartesia, ElevenLabs, Grok verdicts, what to spend on (answer: $0 now) |
| 09-reference-video-analysis-kit.md | How to analyze his latest 3 videos (NotebookLM, transcripts, prompt pack) |
| 10-natural-voice-and-story-planning.md | Natural narration techniques, story structure, worked example, script template |
| 11-live-feel-and-shorts.md | Making the animation feel live, Shorts plan, Codex prompts |

---

## 6. Sources

- AIR Media-Tech RPM data (2026): https://www.overseeros.com/blog/youtube-rpm-by-niche
- YPP requirements: https://air.io/youtube-glossary/what-is-the-youtube-partner-program-ypp-requirements-benefits
- YPP change on Feb 1, 2027: https://www.shacknews.com/article/150324/youtube-partner-program-minimum-qualified-public-watch-hours-shorts-views
- Remotion vs Motion Canvas vs Manim: https://beginnersinai.org/remotion-vs-motion-canvas-vs-manim/
- Remotion vs Motion Canvas (Remotion docs): https://www.remotion.dev/docs/compare/motion-canvas
- Codex limits on Plus: https://9to5mac.com/?p=1065866
- YouTube inauthentic content policy: https://www.creatorhandbook.net/youtube-updates-monetization-policy-for-inauthentic-content/
- AI voice and monetization: https://www.resemble.ai/ai-voice-youtube-videos-monetize/
- Sponsorship estimates: https://sponsorradar.com/channels/programmingknowledge2
