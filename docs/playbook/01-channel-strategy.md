# 01. Channel Strategy (one page)

## 1. The channel in one line

**Real software failures, rebuilt as animated investigations, and reproducible on your laptop.**

Three layers, and each one carries part of the job:

| Layer | Job | Example from E01 |
|---|---|---|
| **Story** | Gets the click and keeps people watching | "27 minutes. 80% of Cloudflare's traffic, gone. From one regex." |
| **Animation** | Explains the mechanism visibly, timed to the voice | Backtracking tree, step counter 23 → 5,353 |
| **Demo-lab** | Proves it, and earns repo stars, trust and sponsors | `python demo-lab/redos.py` breaks on your machine |

The demo-lab is the moat. Most explainer channels stop at the animation.

## 2. Who it is for

- **Primary:** English-speaking backend, cloud and SRE engineers with 1 to 10 years of experience, mostly in the US, EU and AU (they are the viewers who pay; see `03`).
- **Secondary:** CS students and interview-prep viewers.
- **Your edge:** .NET, Azure and SQL Server production experience. Few channels tell those stories with animation.

## 3. Story shape (every long video)

Settled from `10`, ATC `05`/`14` and the reference channel's public chapter lists:

| Share | Beat | Rule |
|---|---|---|
| ~5% | **Cold open inside the failure** | A number, a symptom, a clock. No intro, no logo, no "welcome back" |
| ~10% | **Stakes + the one big question** | Who was hurt, how fast, how big. Don't answer the question yet |
| ~45% | **Just-in-time teaching** | Teach only the concept the next clue needs. Each section ends by opening the next question |
| ~10% | **Midpoint twist** | The wrong theory, or "the obvious fix also breaks" |
| ~15% | **Root cause + proof** | Show it happen (demo-lab), not just say it |
| ~15% | **Fix, rule, repo** | One rule to remember. Link the repo. Hook the next episode |

Check before recording: hook in 10 s, a specific big question, a twist near the middle, and an earned payoff (not a summary).

## 4. Length and cadence

- **Long-form:** 12 to 18 minutes, set by the story. Mid-rolls need 8+ minutes; place them at natural pauses.
- **Shorts:** 45 to 60 seconds, 9:16, with a new hook. Cut from the long video's best moment, never as a raw slice.
- **Cadence:** **1 long video a month + 2 Shorts.** This fits around a job (about 7 to 11 h/week, `21` §6). Speed up only once a video takes under 30 hours.

## 5. Title and thumbnail

**Title rules (from `13`/`18`, adjusted):**
- Put an *event* in the title, not a syllabus: "The Regex That Took Down Cloudflare", not "Regex Backtracking Explained".
- Front-load the concrete noun, aim for under 60 characters, and use a number or time anchor when the story has one.
- **Banned:** "N Concepts You Should Know", "Ultimate Guide", "Learn X in Y Minutes", "Explained Simply", "Roadmap".
- **Do not reuse "(A True Story)".** That is @tajpouria's brand token. Pick your own and keep it constant. Options:
  - `… | Postmortem` (for example "The Regex That Took Down Cloudflare | Postmortem")
  - `Root Cause: …` as a named series
  - `Incident #01: …`, numbered like case files (series numbering also builds binge viewing)
- Only use "true" or "real" wording when there is a public postmortem behind the story.

**Thumbnail rules:**
- 2 to 4 words of stakes in bold condensed caps: red for the threat, white for the system.
- **One** hero number or symbol (`27 MIN`, `5,353`, `0 ROWS`).
- One real code or terminal fragment (`.*(?:.*=.*)`) when it reads at phone size.
- Your own mark in the same corner every time.
- **No** icon grids (they read as listicles). **No** downloaded meme characters (rights; see `04`). Draw your own character or skip it.
- Make 3 variants per video and use YouTube's Test & Compare once it is available to you.

## 6. Topic filter (all four must pass)

1. You have debugged it, or can reproduce it on a laptop this week.
2. It has one visible failure artifact (a log line, a counter, a diff, a lock graph).
3. A public postmortem or official doc anchors the facts.
4. You can write an event-style title you would click yourself.

## 7. Next six episodes (suggested order)

| # | Working title | Mechanism | Repro |
|---|---|---|---|
| E01 | The Regex That Took Down Cloudflare | Catastrophic backtracking (Cloudflare, 2 Jul 2019) | ✅ built |
| E02 | Two Customers Bought the Last Item | Lost update / check-then-act race, atomic `UPDATE … WHERE Stock > 0` | Yes, SQL Server in Docker |
| E03 | Why the Retry Made the Outage Worse | Retry amplification (3×3×3 = 27), backoff, jitter, idempotency | Yes, .NET + Polly |
| E04 | The Message That Was Delivered Twice | At-least-once delivery, idempotent consumer | Yes, Service Bus emulator or RabbitMQ |
| E05 | One Query, Two Plans | SQL Server parameter sniffing | Yes |
| E06 | The Backup Nobody Tested | Restore drills, RPO/RTO, `VERIFYONLY` is not enough | Yes |

Mix in famous public postmortems that suit your lane (for example the AWS us-east-1 DynamoDB DNS outage of Oct 2025, CrowdStrike Jul 2024, GitLab's 2017 database deletion, Azure Front Door incidents). These bring search traffic that fictional stories never get. More topics: `18-topic-bank-and-title-formula.md` (35 topics) and ATC `22` (16 premises).

## 8. How to judge progress (gates, not dates)

| Phase | Videos | Judge by | Move on when |
|---|---|---|---|
| Learn the machine | 1–3 | Did it ship? Hours per video | The pipeline survives without heroics |
| Find the shape | 4–8 | Retention (aim 40%+), CTR vs your own median | Median views rising |
| Earn attention | 9–16 | Subs, total watch hours | ~1,000 subs |
| Earn money | 17+ | YPP, sponsors, GitHub Sponsors | See `03` |

**Kill rule, written down now:** after 6 videos with median views under 1,000 *and* retention under 40%, change the *format* (topic lane, length, packaging, hook), not the effort level. After 12, consider monetizing the same expertise by writing, training or consulting instead.

**Realistic year one:** 12 videos, 800 to 3,000 subs, one video at 5 to 20 times your median, probably not monetized yet. That counts as a good year (`21` §7).
