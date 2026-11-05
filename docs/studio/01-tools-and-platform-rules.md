# Tools (unbiased sweep) and platform rules, as of 2026-11-05

Prices come from vendor pages where possible and from aggregators otherwise; aggregators disagree
often. Check the vendor page before paying. Sources at the end.

## 1. Verdicts first

| Need | Use | Don't |
|---|---|---|
| Animation engine | **Remotion** (free ≤3 people) | Switching engines. Prototype **HyperFrames** (Apache-2.0, HeyGen) only as a licence hedge |
| Coding agent for Remotion | **Claude Code / Codex** (already paid) | **Qoder**: no video features, no Claude, thin credits, telemetry concerns for client assets. Free tier is fine as a spare agent for your own code only |
| Narration | **Cartesia Pro $5/mo** (commercial, word timestamps) | Free tiers of any TTS. OpenAI TTS (shutting 6 Jan 2027). F5-TTS (non-commercial weights), VibeVoice (research) |
| Draft / cheap voice | **Kokoro** (Apache-2.0) or **Chatterbox** (MIT, watermarked) | Higgs, Orpheus until the licence is clear |
| Captions | Cartesia timestamps → `.srt`; WhisperX / faster-whisper for recorded voice | Paying for Submagic unless a client sends footage |
| Clipping client long-form | Opus Clip Starter $15 or Submagic ~$19, only when a client needs it | — |
| Generative B-roll (rare) | Veo 3.1 (AI Pro $19.99), Kling | Hunyuan for UK/EU clients (licence excludes those territories). Sora is gone (app closed Apr 2026, API Sep 2026) |
| Site | **Next.js on Vercel** (free) with `@remotion/player`, or Framer $10/mo | Webflow (overkill), Lovable beyond a first draft |
| Lead lists | Apollo Free/Basic ($49) | Instantly ($37) / Lemlist ($69–99) until a message converts |
| Getting paid | **Skydo** (flat $19–29, free FIRA) or **Wise** (~1.7%) | PayPal (4.4% + FX ≈ 8–9% total) |
| Mobile edits | CapCut **Pro** only | CapCut Free for client work (commercial restrictions) |

## 2. Programmatic video frameworks

| Tool | Licence | Commercial | State | Fit |
|---|---|---|---|---|
| **Remotion** | Source-available; free for individuals and for-profits ≤3 people; Creators $25/seat/mo, Automators $0.01/render ($100 min), Enterprise $500+ | Yes. Client only receives MP4 → only your headcount counts; client co-operating the project pools headcounts; contractors inside the project pool too | Most mature; Lambda renderer; v5 licence tweak coming | **Keep** |
| **HyperFrames** (HeyGen) | Apache-2.0 | Yes, any headcount | ~79k stars; HTML + GSAP/Lottie/Three, headless Chrome + FFmpeg, ships agent skills; open-sourced spring 2026 | Hedge if you grow past 3 |
| Revideo (Motion Canvas fork) | MIT | Yes | ~4.2k stars, headless API, active issues | OK, small ecosystem |
| Motion Canvas | MIT | Yes | Editor-centric; rendering through the UI | Math/code animations, poor for automation |
| Manim CE | MIT | Yes | Mature, Python | Math/algorithm visuals |
| MoviePy v2 / editly | MIT | Yes | Assembly only | Glue |
| Twick | Sustainable Use (conflicting reports) | Restricts resale as SDK | v0.15 | Only for a client-facing editor |
| Montage / Launchpad / Remocn | MIT templates on Remotion | Yes | Launch-video kits | Starting points for SaaS launch videos |

## 3. Open-weight AI video models (low relevance for explainers)

| Model | Licence | Note |
|---|---|---|
| Wan 2.1 / 2.2 | Apache-2.0 | Newest open weights; 2.5+ are API-only. ≥24 GB VRAM |
| HunyuanVideo 1.5 | Tencent Community: **excludes EU, UK, South Korea** | Not for UK/EU clients |
| LTX-2 | Free commercial under $10M revenue | Consumer-GPU friendly |
| Mochi | Apache-2.0 | 24 GB+ |

Use only for a 3–5 s mood shot without text. Remotion is more precise and cheaper for anything that explains.

## 4. Open-source TTS

| Model | Licence | Commercial |
|---|---|---|
| Kokoro-82M | Apache-2.0 | ✅ |
| Chatterbox (Resemble) | MIT, PerTh watermark in output, 23 languages | ✅ disclose AI voice |
| Dia | Apache-2.0 (per one guide) | likely ✅ |
| F5-TTS | code MIT, **weights CC-BY-NC** | ❌ |
| Higgs Audio v2/v3 | conflicting: non-commercial vs 100k-AAU cap | check first |
| Orpheus | conflicting (Llama / MIT / Apache) | check model card |
| VibeVoice | research only | ❌ |

Cartesia stays the production voice because word timestamps drive the animation.

## 5. Commercial AI video / reel tools (entry prices, USD)

| Tool | Price | Good for |
|---|---|---|
| Opus Clip | Free w/ watermark; Starter $15; Pro $29 | Long → clips |
| Submagic | ~$19 / $39 / $69 per member | Captions, reel polish |
| HeyGen | Creator ~$29 | Avatars, translation |
| Synthesia | ~$18–29 | Training-style avatars |
| InVideo AI | ~$20–25 | Stock-footage text-to-video |
| Pictory | ~$25–29 | Blog → video |
| Veed | ~$20–25 | Browser editor |
| Descript | ~$16–24 | Podcast / talking head |
| Runway | $12–15 for 625 credits; Unlimited plan ended Jun 2026 | Generative B-roll |
| Kling | up to $159.99 Ultra | Realistic clips |
| Veo 3.1 / Flow | AI Pro $19.99 / 1,000 credits | Best generative clips with audio |
| Higgsfield | $9–129 (changes often) | Ad-style generative |
| CapCut | Pro $7.99–19.99 | Mobile edits; **free plan not for commercial work** |

None of these make precise, branded devtool explainers. That gap is the studio's product.

## 6. Platform rules that cap volume

**YouTube**
- 15 Jul 2025: "repetitious content" → "inauthentic content". Names "AI-generated content made with generic templates" and content "made with a template with little to no variation across videos".
- Jan 2026: 16 channels (~35M subs, 4.7B views) terminated, e.g. Screen Culture, KH Studio. A 588k-sub Bible-story channel demonetized for "mass-produced content".
- 16 Jul 2026 clarification: non-monetizable = (1) generic/repetitive/template-based, (2) distressing or manipulative, (3) AI personas of real people on finance/legal/health. No published threshold; judged per channel.
- Upload API default quota ≈ 100 uploads/day/project.
- **Reading:** faceless is fine; sameness is not. 2–5 genuinely different videos a week is safe; 1–2 a day is the practical ceiling.

**TikTok**
- Creator Rewards: ~10k followers, 100k views/30 days, 18+, eligible region, videos > 60 s. **India is not eligible.** RPM ~$0.40–1.00.
- AI content needs the AIGC label; ads with AI creative need a disclosure since 21 Jul 2026.

**Meta (Instagram / Facebook)**
- Jul 2025: ~10M impersonator profiles removed, ~500k accounts actioned; repeat reposters lose reach and monetization.
- 30 Apr 2026: originality ranking extended to photos and carousels; aggregator accounts removed from recommendations.
- Your own renders are original; what gets punished is reposting.

**LinkedIn**: no view payouts; it is the B2B lead channel.

## 7. Agent skills worth installing

- Remotion's official agent skills (remotion.dev/docs/ai/skills) for Claude Code / Codex: component patterns, timing, rendering commands.
- HyperFrames ships its own skills if you prototype it.
- Rule from E01: one scene per prompt, and always ask the agent to render stills and look at them.

## Sources

Qoder: docs.qoder.com (pricing, Credits, lite-launch), Geekflare Aug 2025, CnTechPost 2026-05-15, Tom's Hardware (Anthropic bars Chinese-controlled firms, Sep 2025), makerstack review.
Remotion: remotion.dev/docs/license/faq, github LICENSE.md. HyperFrames: github.com/heygen-com/hyperframes. Revideo: github.com/midrender/revideo.
Video models: howaiworks.ai (Wan weights, 2026-09-06), ltx.io/model/license, chatforest (Hunyuan licence).
TTS: huggingface Chatterbox README, dograh TTS comparison, bosonai HF discussion, localaimaster.
Commercial tools: castmagic (Opus), costbench (Submagic Oct 2026), creatify (HeyGen/Synthesia, Runway, Kling), layer3labs, flowith (Veed, CapCut), affmaven (Descript), diyai (Veo), imagine.art (Higgsfield), CBS + Neowin (Sora shutdown).
Platforms: support.google.com/youtube/answer/1311392, TechCrunch 2026-07-20, flocker.tv (Jan 2026 terminations via Tubefilter 2026-01-29), outlierkit, activepieces + phyllo (API quota), argil + socialchamp (TikTok Rewards), stellarsearch (TikTok ad labels), gigazine (Meta Jul 2025), Tubefilter 2026-04-30 (Instagram).
