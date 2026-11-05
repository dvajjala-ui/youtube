# Studio Business Plan (2026-11-05)

> Channel-side truth lives in `docs/playbook/`. This folder is the studio side.
> Research sources and dates are in `01-tools-and-platform-rules.md` and `03-marketing-and-sales.md`.

## 1. The business in one paragraph

Sell **code-built product videos for developer tools and SaaS, delivered in 72 hours**, to clients in
the US, UK, AU and EU, using the Remotion + Cartesia pipeline that already produced E01. Keep one
original YouTube channel of tech-incident explainers as the portfolio and lead source. Ads on that
channel are a year-two bonus, not the plan.

Why this and not ad money: studios quote 4–7 weeks for an explainer and charge $3k–8k per minute;
freelancers take 2–4 weeks for $1.5k–5k. Your pipeline turns a script change into a 2-minute re-render.
No "Remotion agency" exists yet. Speed plus technical accuracy is an open position.

## 2. Two engines, one pipeline

| Engine | Customer | Pays how | First money |
|---|---|---|---|
| **Studio** | Devtool / SaaS founders, DevRel and marketing leads, agencies (white-label) | USD per project or monthly subscription | Weeks |
| **Channel** | Engineers worldwide | Inbound clients first; ads in year 2; sponsors later | Months |

The channel proves the pipeline in public. Every client video that the client allows becomes a
portfolio piece. Every episode is a cold-email attachment.

## 3. Volume: what it can and cannot mean

| Use of volume | OK? | Why |
|---|---|---|
| 100 client deliverables/day (variants: sizes × languages × hooks × CTAs; per-prospect personalized videos; automated changelog videos) | ✅ | Each goes to a client's own channel, site or inbox. Originality rules apply per client account |
| 100 uploads/day to **one** channel, or many faceless channels | ❌ | YouTube's inauthentic-content rule (Jul 2025, clarified 16 Jul 2026) names "template-based" content; Jan 2026: 16 channels, ~35M subs, terminated. Meta and TikTok penalize reposted/unoriginal volume too |
| Own channel at 2–5 genuinely different videos/week | ✅ | Judged on sameness, not count |

**Volume is a studio capability, sold to clients. The channel stays curated.** Build the variant
engine *after* 5–10 paying clients show which template they buy repeatedly.

## 4. Offers and prices (launch pricing, USD)

| Offer | Deliverable | Turnaround | Price |
|---|---|---|---|
| **Feature Reel** | 30 s vertical + square, licensed AI voice, burned captions, 2 revisions | 48–72 h | **$490** |
| **Launch Explainer** | 60–90 s, 16:9 + 9:16 + 1:1, `.srt`, thumbnail, 2 revisions | 72 h–5 days | **$1,200** |
| **Deep-Dive Explainer** | 5–10 min technical explainer from the client's docs/postmortem, sourced diagrams | 7–10 days | **$2,500–4,000** |
| **Changelog Subscription** | 4–8 reels/month from release notes and docs, one request at a time, 48-h turnaround | Rolling | **$1,500–2,500/mo** |
| Add-ons | Extra language −60% of base per language; extra format $90; rush 24 h +50% | | |

Positioning against the market: cheaper than studios ($5k–15k per 60 s), faster than freelancers
(2–4 weeks), and more accurate than both for technical content because you read their code.

Terms: 50% deposit on projects, subscriptions billed monthly in advance, client owns the final video,
you keep portfolio rights unless they opt out, 2 revision rounds included, script approval before
animation (script changes after approval are a new round).

## 5. Ideal customers, in order

1. **Seed–Series A devtools** (observability, databases, CI/CD, security, AI infra): technical founders who hate generic agencies; launches on Product Hunt, YC demo days, GitHub trending.
2. **SaaS marketing / DevRel teams** that ship features weekly and need changelog and launch content.
3. **Tech YouTubers and newsletter authors** who want animated segments or reels.
4. **Agencies** reselling video to their clients (white-label, volume pricing).

## 6. Money model

| Month | Studio target | Channel | Notes |
|---|---|---|---|
| 1 | Site + 3 portfolio pieces + 100 personalized contacts; 1–3 paid projects (~$1–3k) | E01 long-form published | Pricing may be discounted for the first 3 clients in exchange for testimonials |
| 2–3 | 4–6 projects/month or 2 subscriptions (~$4–7k/mo) | 2 videos/month | First retainer. Add a second voice/brand theme per client |
| 4–6 | 2–4 subscriptions + projects (~$6–12k/mo) | 1–2 videos/month, 1K subs target | Decide on first hire (editor) only if hours > 40/week |
| 7–12 | Variant/changelog automation for repeat clients | Sponsors, YPP application in 2027 | Headcount ≤ 3 keeps Remotion free |

Conversion math to plan outreach: 1–3% of personalized contacts become clients, so ~100 contacts
per 1–3 clients. Payment costs: Skydo ~$34 on a $3k invoice, Wise ~$61, PayPal ~$261 (avoid).

## 7. Legal and money plumbing (India)

- Invoice in USD; receive via **Skydo** (flat fee, free FIRA) or **Wise**; never PayPal.
- Export of services is zero-rated GST; register once turnover passes ₹20 lakh, then file an LUT yearly. Keep every FIRA.
- Income tax: likely business income on top of salary (44ADA presumptive may apply). One CA meeting before the first invoice.
- Employment contract: check moonlighting and IP clauses before the first client.
- Rights: licensed TTS only (Cartesia Pro), CC0 or licensed SFX logged per project, client assets used under their license, portfolio clause in every SOW.
- Remotion stays free while you are an individual or ≤3 people; a contractor working inside your Remotion project counts toward headcount.

## 8. What makes this defensible

1. **Word-keyed animation**: script changes re-render in minutes. Studios re-edit by hand.
2. **Engineer-made**: diagrams and terminal output are technically right, and you can read the client's repo.
3. **Per-client brand themes and bespoke diagrams**: no two clients share a visible template, which is also what keeps *their* channels safe.
4. **Public proof**: the channel shows the quality before any sales call.

## 9. Risks specific to the studio

| Risk | Mitigation |
|---|---|
| Hours: 4–6 h per reel, 15–25 h per deep-dive, on top of a job | Sell reels and launch explainers first; deep-dives only at $2.5k+ |
| Scope creep in revisions | Script approval gate; 2 rounds; changes after approval are billed |
| Client data in AI tools | Use Claude Code / Codex only; avoid tools with telemetry concerns (Qoder) for client code/assets |
| Looking templated across clients | Brand theme + one bespoke component per project, enforced in the QA gate |
| Late payment from abroad | 50% deposit; subscriptions prepaid; Skydo/Wise invoices with due dates |

## 10. Decisions that are made

- Stack: Remotion + Cartesia Pro + Claude Code/Codex. Prototype HyperFrames (Apache-2.0) only as a hedge if headcount might pass 3.
- No AI video generators for anything that explains; Veo/Kling/Runway only for optional B-roll.
- Site: Next.js on Vercel (free) with embedded `@remotion/player`, or Framer ($10/mo) if you want it live in a day.
- Outreach: manual, personalized, with a 10-second spec clip of the prospect's product. Apollo Free for lists. No Instantly/Lemlist until a message converts.
- Platforms for own content: one YouTube channel, LinkedIn for B2B, Instagram reels as cut-downs. TikTok Creator Rewards is not available from India.

Next docs: `01-tools-and-platform-rules.md`, `02-pipeline-design.md`, `03-marketing-and-sales.md`, `04-30-day-launch.md`.
