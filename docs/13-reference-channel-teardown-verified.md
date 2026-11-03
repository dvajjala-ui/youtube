# 13. Reference Channel Teardown (Verified From The Channel Pages)

`docs/01-style-blueprint.md` and `Animated-Tech-Channel/01_REFERENCE_ANALYSIS.md` both say the same
thing: video titles, per-video views and tools were **not verifiable** because YouTube blocked
automated access. That gap is now closed. This file records what was read directly off the channel
on 2026-11-03 (your two screenshots plus a page-level scrape), so the plan is anchored on numbers
instead of guesses.

**Nothing here was watched.** Views, titles, durations, dates, subscriber counts, thumbnails and
description text are visible metadata. Audio, editing software and animation method remain unknown.

---

## 1. Channel-level facts

| Item | Value | Status |
|---|---|---|
| Handle / name | `@tajpouria` / "pouria" | Verified |
| Subscribers | 21,000 | Verified |
| Video count | 10 | Verified |
| Lifetime views | 2,629,999 | Verified |
| Views per subscriber | about 125 | Computed from the two rows above |
| About text | "i post about sre, infrastructure, security… and things of that nature" | Verified |
| Location | Netherlands | Verified |
| Account created | Jan 26, 2015 | Verified |
| Contact / links | hi@tajpouria.com, github.com/tajpouria, linkedin.com/in/tajpouria | Verified |
| Monetization status | Unknown. No sponsor read, no membership tab, no Patreon or course link found | Not verified |
| Production tools | Unknown. No interview, blog, AMA or stack post found. `tajpouria.com` and `.dev` do not resolve | Not verified |

The account is 11 years old with 10 videos. So "21K subs" is not a 4-month miracle; the recent
format is doing the work, and the aged account may carry trust history that a brand-new channel
will not have. Do not treat his curve as your curve.

---

## 2. The performance split that matters more than anything else

| Video | Length | Views | Age at check |
|---|---|---|---|
| 3AM Observability Crash Course (A True Story) | 15:33 | 1,061,159 | about 2 months |
| Friday Night Database Recovery Crash Course (A True Story) | 17:03 | 653,027 | about 1 month |
| Google File System | 15:39 | 483,186 | older |
| GPU vs TPU: How AI Chips Actually Work | 18:24 | 228,209 | about 2 months |
| Kubernetes Crash Course (A True Story) | 24:57 | 105,914 | about 3 days |
| He Hacked His Own Company… Then Led The Investigation | 14:57 | 91,646 | about 4 weeks |
| 6 Authentication Concepts EVERY SRE Should Know | 9:52 | 8,339 | about 2 months |
| Distributed MapReduce from Scratch (live-coding, about 2 hours) | long-form | 3,056 | older |

Read the split, not the totals:

- The six narrative uploads (everything except the listicle and the 2-hour live-coding) average
  **437,190 views**. The two conventional uploads average **5,698**. That is a **77x gap** inside one
  channel with one audience.
- Length is necessary but not sufficient: every video above 90K views runs 14:57 or longer, and the
  9:52 listicle is the second-worst performer. But the ~2-hour MapReduce video is the *worst*, so the
  rule is "15 to 25 minutes", not "longer is better". `docs/00-README.md` currently targets "8 to 12
  minutes" — the evidence in front of you says 15 to 20, because an incident needs room to breathe and
  because mid-rolls need 8+ minutes anyway.
- Cadence: 8 uploads between Jul 27 and Oct 30, 2026, so roughly one every two weeks. That is the
  real cost signal — one high-effort video per fortnight, not volume.
- Kubernetes at 105K in 3 days means the current velocity is still climbing; do not read 105K as a
  flop.

---

## 3. Title formula (observable, reusable as a pattern)

Three shapes, in descending evidence of performance:

1. **`<System> Crash Course (A True Story)`** — the flagship. The parenthetical is the brand. It
   promises a story, not a lesson, and it is used on the three biggest hits.
2. **`<Time-anchored crisis> + <system noun>`** — "3AM", "Friday Night". The clock is the hook; it
   selects for people who have been on call and fear being on call again.
3. **`How X Actually Work`** — "GPU vs TPU: How AI Chips Actually Work". Works for non-incident
   topics that still have a hidden-mechanism angle.

What is absent from the winners: no "Learn X in Y minutes", no "Ultimate Guide", no "Should Know"
phrasing. "6 Authentication Concepts EVERY SRE Should Know" is the standard YouTube listicle title,
and it is the second-worst video on the channel.

---

## 4. Thumbnail formula (read from your screenshots)

Every high-performing thumbnail shares the same grammar:

- **3 to 5 words of stakes, in condensed bold caps.** Red for the threat ("INCIDENT", "NO BACKUP!",
  "THREAT IS INSIDE."), white for the system nouns ("LOGS METRICS TRACES").
- **One clock.** "3:00 AM" or "FRIDAY 6:01 P.M." rendered as a red or green digital display.
- **One emotional character**, drawn in the reddit-sysadmin Wojak idiom: bald or hooded figure,
  angry or hollow-eyed, at a laptop. Recognizable to system administrators specifically.
- **One real terminal block**, dark background, syntax-colored, with actual SQL or log text —
  `DELETE FROM users; WHERE id = 1;` in green with a red arrow pointing at `ENTER`.
- **Channel mark bottom-left**: the green low-poly wireframe blob, consistent across all of them.
- **A red accent bar** along the bottom edge.

The one thumbnail that breaks the pattern is the worst performer: "6 Authentication Concepts" uses
six circular icon medallions (HMAC, KEYPAIR, CERTS, JWT, MTLS, FEDERATION). No character, no clock,
no stakes, no terminal. Correlation is not proof, but on a 10-video channel it is the clearest
signal available, and it says: *a diagram-grid thumbnail is a listicle thumbnail, and listicles
under-perform here.*

Legal note before you copy the character style: Wojak is anonymous meme art and Pepe is copyrighted
by Matt Furie; "doomer/sysadmin pack" PNGs sold or shared online are someone's artwork. Draw or
generate your own bald-line-art persona. See `15-voice-audio-and-rights.md`.

---

## 5. Description and structure conventions

- **Chaptered timeline in every description**, formatted as a story beat sheet rather than a topic
  list: `0:00 A 3 AM incident` … `13:57 The fix`. Chapters are public metadata, so you can mine his
  act structure from any video without watching it.
- **An honesty disclaimer**: "This video is built for learning! To keep things clear, some details
  have been oversimplified." Cheap trust with an engineer audience, and it is also the correct legal
  and reputational posture for reconstructed incidents.
- **A companion repo, linked by video URL.** `github.com/tajpouria/tiny-mapreduce` is a Go repo whose
  description is literally `https://youtu.be/svtj0nNxKGE` and whose README is the video's blueprint.
  This is the mechanism behind the "interactive demo lab" idea in `docs/001.md`: the video and the
  repo are one product, and the repo is what gets starred, cloned and remembered.
- 180 public repos on that GitHub account, 161 followers — the person already had a code identity
  before the channel had an audience.

---

## 6. What this changes in your existing plan

| Existing claim | Where | What the verified data says |
|---|---|---|
| "8 to 12 minutes" target | `docs/00-README.md` §1 | Every winner is 15 to 25 min. Re-plan around 15 to 20. |
| "His video titles and per-video views NOT verified" | `docs/00-README.md` §2 | Now verified above. |
| "Tools he uses NOT verified" | `docs/00-README.md` §2 | Still not verified. Do not assume After Effects. |
| "Style blueprint not checked against his actual videos" | `docs/00-README.md` §2 | Titles, lengths, thumbnails, chapters and repo linkage are now checked. Pacing and audio still are not — `docs/09` (transcript route) is still the right next step. |
| Tech RPM median $2.33 | `docs/07-monetization-and-risks.md` §2 | Category error for this format. See `12-money-blueprint.md`. |

---

## 7. Sources

- Your channel screenshots (About panel and Videos grid), 2026-11-03.
- Direct page reads on 2026-11-03: `youtube.com/@tajpouria` (About, Videos), individual video pages
  for the eight titles above.
- `github.com/tajpouria/tiny-mapreduce` (repo description and README).
- Research agent report on comparable channels, 2026-11-03 (see `17-comparable-channels-and-lessons.md`).
