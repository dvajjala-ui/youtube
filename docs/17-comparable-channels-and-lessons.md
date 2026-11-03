# 17. Comparable Channels, And What The Numbers Really Say

All channel figures below were read directly off channel pages on **2026-11-03**, not from memory or
from a blog post about them. This is the expectation-setting file your plan is missing:
`Animated-Tech-Channel/20_CREATOR_REFERENCE_LIBRARY.md` covers nine creators but without current
subscriber, video-count and views-per-video data, and `docs/07` has no comparison at all.

---

## 1. The comparison table

| Channel | Subs | Videos | Total views | Avg per video | Typical length | Cadence | Tools evidence | Money model |
|---|---|---|---|---|---|---|---|---|
| **@tajpouria** (your reference) | 21,000 | 10 | 2,629,999 | 263,000 | 14:57 to 24:57 | about 1 per 2 weeks | **Nothing documented** | **None visible.** No sponsor read, no membership, no course. Links are GitHub, LinkedIn, email |
| **Fireship** | 4,320,000 | 859 | 796,000,000 | 927,000 | now 5.4 to 6.0 min | 2 to 3 per week | About page says a "tiny, remote team of developers, writers, editors, and designers". No NLE disclosed. Has said he has never used AI for voiceovers or visuals (secondary) | Sponsors in every description with a trackable code, plus owned products: bytes.dev newsletter, fireship.dev courses, merged with ui.dev Jan 2026 |
| **ByteByteGo** | 1,440,000 | 172 | 68,270,000 | 397,000 | 5.3 to 9.0 min | slowed to about 2 per month | Not disclosed; a reader asked and never got an answer | **Zero third-party sponsors.** Descriptions funnel to newsletter.bytebytego.com and Amazon book links |
| **Reducible** | 338,000 | 23 | 13,030,000 | 566,000 | 16.3 to 32.0 min | effectively dormant for 2 years | **Fully disclosed**: Manim Community v0.18.1 (older videos used 3b1b manim), animations credited to two named people, and **all animation source is public** on GitHub (674 stars, 91 forks) | Brilliant sponsorship plus Patreon with named patron credits. Early videos were **Patreon-funded before sponsors came** |
| **Branch Education** | 2,770,000 | 69 | 125,200,000 | 1,810,000 | 30.3 to 36.4 min | 4 to 6 per year | **Fully disclosed in About**: Blender 4.2.3 LTS, Eevee and Cycles, Adobe Premiere, Reaper. Hires outside 3D artists | Brilliant read in every description; Patreon with **511 paid members**, $2.50 to $50 tiers, stated goal "15 videos/year". One chapter is titled "Entirely Created By Human Hands – No AI" |
| **CodeAesthetic** | 438,000 | **8** | 12,460,000 | 1,560,000 | 12.7 to 16.8 min | dormant 2 to 3 years | Not disclosed, anonymous creator | Patreon and own site. **No sponsor reads** |
| **Keerti Purswani** | 400,000 | 525 | 17,960,000 | 34,200 | 15 to 25 min | about weekly | Not disclosed | Paid courses (Edocosys, "8000+ participants"), interview framing. Monetizes teaching, not AdSense |
| **ludwig explains** | **326** | 188 | — | 8 to 60 views | 2 to 4 min | very high | — | none. This is the realistic floor: 188 animated uploads produced no traction |

---

## 2. Five lessons that are actually transferable

**1. Open-sourcing your animation code is a distribution channel, not a giveaway.** Reducible published
every scene as Python and it still gets credited in every teardown of the genre. Your reference
creator does the same thing at a smaller scale: `github.com/tajpouria/tiny-mapreduce` has the video URL
as its repo description. This is the cheapest authority signal available to an engineer, and it is the
mechanism behind the demo-lab idea in `docs/001.md`.

**2. Disclose your toolchain and it becomes a differentiator.** Branch Education lists Blender,
Premiere and Reaper in its About text and titles a chapter "Entirely Created By Human Hands – No AI".
In a post-2025 environment where template channels are being demonetized, visible authorship is a
monetization asset, not a footnote.

**3. The two most profitable channels in this niche do not run third-party sponsors.** ByteByteGo has
none and funnels to its own newsletter and books. Fireship puts the sponsor line above the fold with a
UTM and a code, but his real business is owned products. Ads are the weakest form of income here.

**4. Cadence is not a strategy; volume without shape is invisible.** CodeAesthetic: 8 videos, 438K
subs. ludwig explains: 188 videos, 326 subs. Reducible: 23 videos, 338K subs. The difference is
per-video depth, not upload count — which matters because your instinct may be to speed up.

**5. Nobody has cloned this format successfully yet.** Searches for recent imitators of the
"incident crash course (a true story)" style turn up only trivial attempts — one "AI Agent Observability
Crash Course (A 2 AM Incident)" sits at 237 views. **The niche is currently open.** That is the single
most encouraging verified fact in this file, and it has a shelf life.

---

## 3. Expectation calibration (so year one does not feel like failure)

| Question | Answer on record | Source |
|---|---|---|
| What share of channels ever reach 1,000 subs? | vidIQ, 61.2M channels, July 2026: **40.6%** reach 1,000; 7.9% reach 10,000; 1.30% reach 100K; 0.13% reach 1M. A conflicting widely-cited figure says 8.86% exceed 1K — samples differ (vidIQ counts public subs) | vidIQ |
| How many videos before 1,000 subs? | 68% of channels that got there had more than 40 uploads; 31% needed 150+; under 10% got there in fewer than 10 uploads. Among 32.9M small channels, 30.77% of those adding 52+ videos reached 1,000 subs versus 0.20% of those not adding videos | vidIQ |
| Typical growth rate at the start | Median 90-day growth at 1 to 99 subs is about **1.26% per month** (roughly half a subscriber a month). At 1,000 to 9,999 subs it is 0.51% per month (about 13 subs a month) | vidIQ |
| How views actually distribute | About **65% of all videos have under 100 views**; 3.7% of videos exceed 10,000 views and those capture about **94% of all views** ("Dialing for Videos", McGrady et al. 2023) | academic |
| Views needed to reach 10K subs | Median **1.75M lifetime views** across 52 channels sampled at 8 to 12K subs (187 views per subscriber; range 401K to 10.79M) | Overseer, Oct 2026 |
| Healthy first-48-hours views for a sub-5K channel | 100 to 500 views | humbleandbrag |
| When sponsors show up | Agency rate card for 10K to 50K subs in tech/finance: $750 to $5,000 per mid-roll. No documented case found of the exact subscriber count when Reducible, Branch Education or Fireship signed their first deal | creatorsagency |

Now read your reference channel against that table. He is at **125 views per subscriber** versus the
187-per-subscriber median path to 10K subs, and his story videos average about 405K views while his two
conventional videos average under 6K. That gap is the format working, not the audience being large.
Also note the account was created in **January 2015** and has 180 public GitHub repos — this is depth
built over a decade, presented as a young channel.

**Realistic year-one target for you:** 20 to 24 videos, 1,000 to 3,000 subscribers, one video that
outperforms your median by 10x, and 30K to 60K cumulative long-form views. That is roughly the range
that puts you on the map without pretending you will repeat a 1M-view hit. Judge yourself on retention
and on whether the pipeline got faster, not on views, for the first eight uploads.

---

## 4. What could not be verified

- Any production tool, workflow or time-per-video statement from Pouria Tajdivand. No interview, AMA,
  blog or stack post exists; `tajpouria.com` and `tajpouria.dev` do not resolve; his GitHub bio is null.
  Any claim in your docs that he uses Excalidraw, tldraw or After Effects is **inference, not evidence**.
- Whether he is monetized at all.
- Branch Education's hours-per-video figure (the "1,100+ hours" number appears in secondary sources;
  only the toolchain, 511 patrons and the 15-videos/year goal are on their own pages).
- Fireship's editor and time per video (his Medium interview returns 403; workflow claims are secondary).
- Hyperpolyglot: the channel page returns no content, and it is a language-learning channel anyway, so
  it does not belong in your reference set despite appearing in `Animated-Tech-Channel/20`.
- CodeAesthetic's identity.

---

## 5. Sources

Channel pages read 2026-11-03: [youtube.com/@tajpouria](https://www.youtube.com/@tajpouria) ·
[fireship](https://www.youtube.com/@Fireship) · [ByteByteGo](https://www.youtube.com/@ByteByteGo) ·
[Reducible](https://www.youtube.com/@Reducibleofficial) · [Branch Education](https://www.youtube.com/@BranchEducation) ·
[CodeAesthetic](https://www.youtube.com/@CodeAesthetic) · [github.com/nipunramk/Reducible](https://github.com/nipunramk/Reducible) ·
[github.com/tajpouria/tiny-mapreduce](https://github.com/tajpouria/tiny-mapreduce)

Studies and rate cards: [vidIQ subscriber growth statistics](https://vidiq.com/blog/post/youtube-subscriber-growth-statistics/) ·
[vidIQ how many videos to get 1000 subscribers](https://vidiq.com/blog/post/how-many-videos-to-get-1000-subscribers/) ·
["Dialing for Videos" summary](https://www.intotheminds.com/blog/en/research-youtube-stats/) ·
[Overseer views-to-10K-subscribers](https://www.overseeros.com/blog/how-many-views-to-get-10000-youtube-subscribers/) ·
[humbleandbrag new channel benchmarks](https://humbleandbrag.com/blog/new-youtube-channel-average-views) ·
[creatorsagency sponsorship rates](https://creatorsagency.co/blog/youtube-sponsorship-rates-10k-50k-subscribers)
