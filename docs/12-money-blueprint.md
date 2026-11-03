# 12. Money Blueprint

You asked for the money file. Here it is with the numbers recalculated against verified policy and
verified niche data, because `docs/07-monetization-and-risks.md` has one category error and one
missing rule that together change the whole plan. Research date 2026-11-03. Tax and payout items are
flagged as advice-territory, not instructions.

---

## 1. The honest headline

Ads will not pay you meaningfully in year one. For an engineer, this channel is a **compounding
career asset**: repo stars, inbound consulting, job offers, and eventually sponsor money. The order
of real earnings for a sub-50K developer channel is:

`career/consulting > sponsors > products (course, newsletter) > GitHub Sponsors > ads`

Ads are last, and they are the only stream that is fully outside your control. Plan for that order.

---

## 2. Two corrections to the existing plan

**Correction 1 — the RPM anchor is wrong for this format.** `docs/07` anchors on "tech and gadgets
median about $2.33". That figure comes from AIR Media-Tech's 2026 study (300 channels, 3,595
monetized channel-months, May 2025 to May 2026), and that niche's stated problem is that only 34% of
its views ever serve an ad — because the content is short unboxing and spec-check clips. A 15 to 25
minute animated engineering explainer sits structurally in **Education & Science: median RPM $10.22,
middle 50% from $2.31 to $19.50, Studio CPM $5.91, 77% of views served an ad, 1.84 ads per session**.
No source isolates "SRE/software engineering" RPM, so treat $8 to $15 as your planning band and
$2.31 to $19.50 as the true spread. Niche choice matters about 8x less than audience geography:
reported impression CPM is roughly **US $14.67, AU $13.30, CA $9.93, DE $9.79, India $0.74**. Same
video, same language, 10 to 20x difference depending on where the viewer is. English content aimed at
US/EU/AU engineers is the lever, and it works from India.

**Correction 2 — a rule your docs do not mention.** From **Feb 1, 2027**, staying in YPP has an
*activity* requirement, not just an entry requirement: 1,000 qualified watch hours per 365 days, or
1M qualified Shorts views per 90 days, or **2 long-form videos plus 5 Shorts per 90 days**, with a
90-day grace period if you miss it. Separately, monetization can be switched off after 6 months with
no upload or post. A "one video every two weeks" cadence clears this easily, but a hiatus does not.
Also: you must accept the updated Studio terms by **Jan 31, 2027** or earnings stop.

---

## 3. What you actually have to earn before the first ad dollar

| Gate | Requirement | What it means in views |
|---|---|---|
| Early tier (fan funding only, no ads) | 500 subs, 3 public uploads in 90 days, 3,000 qualified watch hours or 3M Shorts views | about 23K to 30K long-form views |
| Full YPP today | 1,000 subs + 4,000 qualified watch hours or 10M Shorts views in 90 days | about 31K to 40K long-form views |
| Full YPP if you apply after Feb 1, 2027 | 1,000 subs + **8,000 qualified watch hours** in 365 days or 20M Shorts views in 90 days | **about 63K to 81K long-form views** |

The view math: 8,000 hours is 480,000 watch-minutes. A 17-minute video at 45% average retention
gives 7.65 minutes per view, so 480,000 ÷ 7.65 ≈ **62,700 views**. At 35% retention it is about
80,700. Shorts-feed views **never** convert into watch hours, so Shorts are a discovery tool, not a
path to the threshold.

Since you are starting in November 2026 and realistically applying in 2027, **plan against 8,000
hours, not 4,000**. That is the single most important number in this file, and it means roughly
24 to 40 uploads before your first ad payout, not 8.

Review takes about a month. First rejection: reapply after 30 days. Repeat rejection: 90 days.

---

## 4. Ad-revenue scenarios (24 long-form videos in year one)

RPM band $3 / $8 / $15 across plausible audience mixes. Views are the variable that actually moves
the answer.

| Scenario | Average views per video | Year-one views | At $3 | At $8 | At $15 |
|---|---|---|---|---|---|
| Floor (most channels) | 1,500 | 36,000 | $108 | $288 | $540 |
| Working format | 8,000 | 192,000 | $576 | $1,536 | $2,880 |
| Clicking | 25,000 | 600,000 | $1,800 | $4,800 | $9,000 |
| Reference-channel shape | 263,000 | 2.63M (10 videos) | $7,900 | $21,000 | $39,500 |

Two readings of that table. The floor row is the honest expectation for the first several videos —
public growth data says about 65% of all YouTube videos end up under 100 views, and the median
channel at 1 to 99 subscribers grows about 1.26% per month. The bottom row is an outlier achieved by
a person with 11 years of account history and real SRE depth. Mid-rolls need 8+ minutes, and
automatic slots stack on top of manual ones, so place manual breaks at natural pauses rather than
mid-sentence — YouTube stopped serving mid-rolls in interruptive slots by default in May 2025.

Long-form ad share is 55% to you (YouTube keeps 45%); Shorts share is 45%.

---

## 5. The streams that pay earlier than ads

| Stream | Realistic entry point | Numbers on record | Notes |
|---|---|---|---|
| **Devtools sponsorships** | Brands vet recent **median views**, comment quality and audience job titles, not subscriber count. A 20K-sub SRE channel with 60% US/EU traffic can out-price a 200K generic tech channel | Reported integration CPMs: tech $25 to $45, B2B devtools $40 to $80. Agency card for 10K to 50K subs in tech/finance: $750 to $5,000 per mid-roll. A dedicated video runs about 1.3 to 1.5x an integration; a 15 to 30s mention about 0.3 to 0.5x | At 25K median views, one integration is $1,000 to $2,000 — more than a month of ads. Paid-promotion disclosure (the "paid promotion" tick plus an in-video statement) is mandatory |
| **GitHub Sponsors** | Works from day one if your repo is genuinely useful; India is a supported region; GitHub takes 0% from individual maintainers | Reducible was Patreon-funded before sponsors; Branch Education runs 511 paid patrons at $2.50 to $50 | This is where the demo-lab idea from `docs/001.md` becomes cash: people sponsor the code that taught them |
| **Consulting and job inbound** | Immediately after the first video that shows real depth | Not published anywhere. Treat any figure as unverified | For a salaried engineer this is usually the largest year-one number |
| **Course or newsletter** | Needs an audience that already trusts you (roughly 10K+ engaged subs) | ByteByteGo takes **zero third-party sponsors** and uses the channel purely as a funnel to its newsletter and books. Fireship owns bytes.dev and fireship.dev | The two most profitable models in this niche both avoid ads |
| **Affiliate links** | Any time | Reported: Sentry 40% recurring (45-day cookie), Supabase 20%/60d, Hasura 25%/90d, GitKraken 30%/90d, DigitalOcean 10% of monthly spend for 12 months, Cloudways $30 plus 7% lifetime | Put these in the description of every incident video where the tool genuinely appears |

No reliable published revenue benchmark exists for sub-100K developer channels from courses or
consulting. Anyone quoting one is guessing, including me.

---

## 6. Cost side: cash and hours

**Cash.** Buy nothing new. The verified $0 stack is Remotion (free for individuals and companies of
3 or fewer people, no watermark, no attribution, and your finished videos stay usable even if the
license changes later) plus Excalidraw (MIT) plus VHS or asciinema for terminals plus OBS plus
Audacity or DaVinci Resolve Free plus YouTube Audio Library plus Kokoro (Apache-2.0) for scratch
voice. If you later want a licensed AI voice, the cheapest compliant option is **ElevenLabs Starter
at $6/month** — note the free tier is **non-commercial and requires attribution**, so it cannot be
used in a monetized video, and `docs/08` quotes the old $5 price. Cartesia Pro is $5/month with
commercial rights. OpenAI TTS is pay-as-you-go at roughly **$1.40 per 20-minute narration**. A
minimal paid stack (licensed voice plus a music subscription) lands around **$8 to $9 per video** at
two videos a month.

**Hours.** This is the real cost and the reason most attempts stop. My estimate for a 15 to 20 minute
animated video, solo, code-based animation, marked as an estimate rather than a measurement:

| Stage | First video | After a component library exists |
|---|---|---|
| Research and sources | 8 to 12 h | 4 to 6 h |
| Script and fact-check | 8 to 10 h | 4 to 6 h |
| Voice record or generate and clean | 4 to 6 h | 1 to 2 h |
| Diagrams and animation code | 25 to 40 h | 12 to 20 h |
| Edit, sound design, captions | 8 to 12 h | 4 to 6 h |
| Thumbnail, description, chapters, repo | 4 to 6 h | 2 to 3 h |
| **Total** | **57 to 86 h** | **27 to 43 h** |

At one video per two weeks, the steady-state number is about 15 to 20 hours a week on top of a job.
Benchmark the other end: Branch Education says its detailed videos can take over 1,100 production
hours, and CodeAesthetic built 438K subscribers on **8 videos**. Slow is normal in this genre; the
failure mode is not "few videos", it is "many cheap videos".

---

## 7. Plan with gates instead of dates

| Phase | Videos | Goal | Gate to proceed |
|---|---|---|---|
| Learn the machine | 1 to 3 | Finish and ship. Ugly counts as shipped | Do not judge views. Judge: did the pipeline survive contact? |
| Find the shape | 4 to 8 | One format that earns above your channel median | Median views rising, average retention above 40% |
| Earn attention | 9 to 16 | Hit 1,000 subs and start the watch-hours climb | 30K to 40K cumulative long-form views |
| Earn money | 17 to 24 | Apply for YPP, open GitHub Sponsors, pitch 3 devtools brands | 8,000 qualified hours, or a product funnel instead |

**Kill criteria, written down now so you apply them sober.** After 6 videos, if median views are under
1,000 and retention is under 40%, change the format (topic, length, thumbnail grammar, hook), not the
effort level. After 12 videos with the same result, the honest read is that animated production is
too expensive for the return you are getting, and the same expertise monetizes faster through writing,
training or consulting.

---

## 8. Policy risk to your income, specifically

- **Inauthentic content** (renamed from "repetitious content" on July 15, 2025, restructured into
  *Generic or Repetitive*, *Unsatisfying or Off-putting*, and *AI Personas on Sensitive Topics* on
  July 13, 2026) is the live threat, and it is judged on the **whole channel**. In January 2026 there
  was a documented enforcement wave; the named case is CuentosFacinantes, about 6M subscribers,
  demonetized for template-based animated story videos. The failure pattern is template sameness and
  unverifiable human authorship — **not** use of AI.
- AI-assisted and AI-voiced work is explicitly **allowed** when original. YouTube's own "allowed"
  examples include "using AI to visualize a unique character and narrative you invented" and "using
  AI to edit your video scripts".
- The **altered/synthetic disclosure label is not required for your format**: it is mandatory for
  realistic synthetic media (making a real person say something they did not, altering real footage,
  generating a realistic scene that did not occur). YouTube's own non-required example is an
  AI-generated animation inside a fully animated video, and cloning **your own** voice for voiceover
  is also listed as not requiring disclosure. Their page states plainly that disclosing AI content
  alone will not limit reach or monetization eligibility. This refines `docs/07` §5's "do not hide AI
  use" — you are not hiding anything by not ticking a box that does not apply, though disclosing in
  the description voluntarily is a trust signal in this niche.
- The real policy line for a postmortem channel is **reused content**: YouTube disallows "content
  that exclusively features readings of other materials you did not originally create, like text from
  websites or news feeds". Narrating a company's published postmortem verbatim is exactly that. Your
  original analysis, your own diagrams, your own reconstructed scenario and your own lesson extraction
  are what make it yours. This is separate from copyright — permission does not save you from it.
- Template-heavy, high-cadence animated channels are the pattern being removed. Some of the channels
  in your own subscription list run that model at scale; do not confuse volume with safety.

---

## 9. India payout mechanics (verify with a CA before acting)

| Item | Status |
|---|---|
| Tax information is mandatory. No form on file and Google may withhold **up to 24% of worldwide earnings** | Verified, official |
| India–US treaty rate on royalties is **15%** (Art. 12), applied to US-viewer-derived revenue; file **W-8BEN**, renew every 3 calendar years, claim treaty by **Dec 10** each year | Reported plus treaty text. Which article your income falls under is advice-territory |
| AdSense for YouTube in India is **wire transfer only** (no check, no EFT, no Hyperwallet). Minimum earnings $10, default payout threshold $100, payments issued on the 21st to 26th | Verified, official |
| **FEMA (Export and Import of Goods and Services) Regulations 2026**, in force **Oct 1, 2026**: service exporters must file an **Export Declaration Form** with their bank within 30 days of month-end, and "services" includes software | Verified, RBI. Not reflected in older creator guides. This is a real new obligation on your AdSense wire receipts |
| GST treatment of AdSense earnings (export of services / zero-rated with a Letter of Undertaking, registration above the service turnover threshold) versus the 18% reverse charge that applies to services Google sells *to you* | Advice-territory. The two directions get conflated in creator forums. Get a CA |
| TDS on Indian brand-deal payments (which section, at what rate, under the Income-tax Act, 2025 renumbering effective April 1, 2026) | Advice-territory, genuinely contested. Get a CA |

Practical note nobody mentions: a USD wire to an Indian bank carries an FX spread and intermediary
bank fees, so your realized INR per dollar is below the headline rate.

---

## 10. Sources

Official: [YPP eligibility](https://support.google.com/youtube/answer/72851) ·
[YPP changes](https://support.google.com/youtube/answer/12843009) ·
[monetization policies incl. July 15 2025 changelog](https://support.google.com/youtube/answer/1311392) ·
[GenAI disclosure](https://support.google.com/youtube/answer/14328491) ·
[mid-roll management](https://support.google.com/youtube/answer/6175006) ·
[US tax info for Google](https://support.google.com/youtube/answer/10390801) ·
[AdSense payment methods by country](https://support.google.com/youtube/answer/14728152) ·
[YPP 55/45 explained](https://blog.youtube/creator-and-artist-stories/youtube-partner-program-explained/) ·
[2027 YPP update announcement](https://blog.youtube/news-and-events/youtube-partner-program-updates-2027-new-opportunities-earn/) ·
[RBI FEMA 2026 notification](https://www.rbi.org.in/Scripts/BS_FemaNotifications.aspx?Id=13277) ·
[US-India treaty (IRS)](https://www.irs.gov/pub/irs-trty/india.pdf) ·
[GitHub Sponsors regions](https://docs.github.com/en/sponsors/getting-started-with-github-sponsors/about-github-sponsors)

Secondary: [AIR Media-Tech RPM by niche 2026](https://air.io/en/air-data-findings/which-youtube-niche-makes-the-most-money-in-2026-ranked-by-real-rpm-and-cpm) ·
[CPM by country](https://milx.app/en/trends/youtube-cpm-rpm-rates-2026-average-niches-countries-more) ·
[sponsorship rates 10K-50K](https://creatorsagency.co/blog/youtube-sponsorship-rates-10k-50k-subscribers) ·
[devtool affiliate programs](https://affilipilot.io/blog/best-developer-tools-affiliate-programs-in-2026) ·
[January 2026 enforcement wave](https://outlierkit.com/resources/youtube-ai-slop-crackdown-2026/) ·
[July 2026 policy clarification](https://www.tubefilter.com/2026-07-13/youtube-inauthentic-content-monetization-policy-update/) ·
[vidIQ subscriber growth statistics](https://vidiq.com/blog/post/youtube-subscriber-growth-statistics/) ·
[vidIQ videos-to-1000-subs study](https://vidiq.com/blog/post/how-many-videos-to-get-1000-subscribers/) ·
[views-to-10K-subscribers study](https://www.overseeros.com/blog/how-many-views-to-get-10000-youtube-subscribers/)
