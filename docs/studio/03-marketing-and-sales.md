# Marketing and sales: how clients find you, and how you find them

## 1. The one rule

**Proof of work beats pitch.** Generic cold DMs are filtered and dead in 2026. What converts is a
personalized sample: a 10-second clip of *their* product made with your pipeline, attached to a short
message. Expect 1–3% of personalized contacts to become clients, so plan ~100 contacts per 1–3 clients.

## 2. Portfolio before outreach (week 1)

Three pieces, each a different offer, each about a real public product (open-source or a devtool
with public docs), each with a one-line "what I'd change for you" note:

| Piece | Offer it demonstrates | Subject idea |
|---|---|---|
| 30 s vertical feature reel | Feature Reel | A recent release of a popular OSS devtool (e.g., a new `uv`, Bun or Grafana feature) |
| 60–90 s launch explainer | Launch Explainer | A YC-style devtool's core "how it works" |
| E01 long-form (16 min) | Deep-Dive Explainer | Already in production |

Rules: mark them "unsolicited concept, not affiliated"; use only the product's public logo under
nominative use; keep brand colors distinct per piece so they don't look templated.

## 3. The site (one page)

Stack: Next.js on Vercel (free) with `@remotion/player` so the hero *is* a live Remotion render, or
Framer ($10/mo) if you want it live in a day.

Sections, top to bottom:
1. Hero: "Product videos for developer tools, built in code, delivered in 72 hours." Live player.
2. Three samples with the offer name and price under each.
3. How it works: brief → script approval → video in 72 h → 2 revisions. Script changes re-render in minutes.
4. Pricing table (from `00` §4) with "Book a 15-min call" (Cal.com free) and "Send a brief" (form → `brief.json` fields).
5. About: working .NET/Azure engineer, Ahmedabad, link to the channel and GitHub.
6. FAQ: rights, voice licensing, revisions, payment (Skydo/Wise, USD), turnaround.

Domain: a short `.studio`/`.video`/`.dev` name, same handle on YouTube, LinkedIn, X, GitHub.

## 4. Where the clients are

| Source | How | Cost |
|---|---|---|
| **Product Hunt upcoming launches** | Email the maker 7–10 days before launch with a 10 s spec clip | $0 |
| **YC company list, GitHub trending, Hacker News "Launch HN"** | Same: founder or DevRel, spec clip of their README feature | $0 |
| **LinkedIn** | 3 posts/week showing the pipeline (before/after, a timing bug fixed, a render contact sheet); DM DevRel and marketing leads at seed–Series A devtools | $0 |
| **Contra** | Profile + the 3 samples; 0% fee | $0 |
| **Upwork** | Profile; bid only on explainer/SaaS video jobs with a sample; 0–15% fee; Connects $0.15 | small |
| **Your channel + GitHub** | "Made with this pipeline, hire me" in every description and README | $0 |
| **Agencies** | Offer white-label reels at volume pricing to 10 marketing agencies serving SaaS | $0 |
| **Reddit** (r/SaaS, r/devtools, r/startups) | Value posts only (how we make a launch video in 72 h), never pitches | $0 |

Lead lists: Apollo Free (then Basic $49) for emails and titles. Upgrade to Instantly ($37) or Lemlist
($69–99) only after one message converts twice.

## 5. The message (template, personalize every line)

> Subject: 10-second video of {feature} for {product}
>
> Hi {name}, I built a 10-second animated clip of {product}'s {feature} from your docs: {link}.
> I make launch and changelog videos for devtools in code (Remotion), so a script change re-renders
> in minutes, and delivery is 72 hours. A 30 s reel is $490, a 60–90 s launch explainer $1,200.
> If {launch / release} is coming up, want the full version? Happy to do the first one at {discount} for a testimonial.
> {your name}, {site}

Follow up once after 4 days with a second clip or a relevant tip. Then stop.

## 6. Weekly cadence (about 10 hours)

| Day | Task |
|---|---|
| Mon | 20 prospects researched, 20 spec clips queued (batch render) |
| Tue–Thu | 20 personalized emails/DMs, 1 LinkedIn post, client work |
| Fri | Follow-ups, 1 LinkedIn post, update the portfolio with any permitted client piece |
| Weekend | Channel episode work (the portfolio engine) |

## 7. Pricing psychology and terms

- Lead with the subscription on the call; projects are the fallback.
- First 3 clients: up to 30% off in exchange for a testimonial and portfolio rights.
- Always: 50% deposit, script approval gate, 2 revisions, Skydo/Wise invoice, due in 7 days.
- Raise prices 10–20% after every 5 clients until close rate falls below ~20% of calls.

## 8. Metrics to track (a sheet is enough)

Contacts sent, replies, calls, closes, revenue, hours per deliverable, revision rounds per project,
and which source each client came from. Review every Friday; cut sources with zero replies after 60
contacts.

## Sources

Fiverr gig pages; Flowjam launch-video cost 2026; breadnbeyond.com/pricing; vidico explainer cost;
videohusky.com/pricing; becreatives.co; moonb (Superside); golance (Upwork fees 2026, Contra);
reddit snapshot 2026-03-05 (conversion math); fueler.io (first client 2026); siter.io (Framer, 2026-09-03);
nocode.tech (Webflow May 2026); costbench (Apollo vs Lemlist); aitoolsatlas (Instantly);
skydo.com (fees, biased), winvesta (Payoneer alternatives); razorpay (LUT), taxguru (GST for freelancers).
