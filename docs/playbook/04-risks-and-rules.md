# 04. Risks and Hard Rules

Condensed from `07`, `15`, `19`, ATC `24`/`25`/`26`, and what E01 surfaced.

## Hard rules (never break)

| # | Rule | Why |
|---|---|---|
| 1 | **Never publish narration made on a free TTS tier.** Cartesia Free and ElevenLabs Free both forbid monetized use | E01's audio is `BLOCKED_NEEDS_PAID_PLAN` until it is regenerated on Pro |
| 2 | **Verify the date and numbers against the primary postmortem before writing** | E01's premise said "June 2022". The regex outage was **2 July 2019**; June 2022 was a BGP incident. Two popular "facts" were not in the source |
| 3 | **Don't narrate someone else's postmortem.** Retell it with your own analysis, diagrams and repro | YouTube's reused-content rule: "readings of other materials you did not create" are not monetizable, even with permission |
| 4 | **Never copy the reference creator:** script, scenes, character art, thumbnail grammar, title token, or voice | Copyright, impersonation, and looking like a clone |
| 5 | **No real secrets, hostnames, customer or employer data on screen.** Use demo subscriptions and fake data | This one ends careers, not just channels |
| 6 | **Label fiction as fiction.** Never call a composite story "true" | Trust is the product |
| 7 | **No API keys in git.** `.secrets.env` stays gitignored | The Cartesia key was pasted into chat as a screenshot. **Rotate it** |
| 8 | **Log every asset you didn't make** in `rights.csv` the day you download it | False Content ID claims come mostly from generic whoosh and riser packs |

## Risk register (short)

| Risk | Likelihood | What to do |
|---|---|---|
| Burnout from slow production (60–90 h first video) | **High** | 1 video/month. Freeze the component kit after E02. Ship "clear and correct", not perfect |
| Planning instead of making | **High**, already happened (64 docs, 1 render) | This playbook is the last planning pass. Next artifact: E01 long-form MP4 |
| Wrong mechanism in Act 2 → correction thread | Medium | Reproduce before you assert. Pin corrections; don't delete them |
| Inauthentic-content demonetization | Low **if** each video is original and researched | Vary story shape. Show authorship (your repo, your process). Don't batch clones |
| Employer conflict | Medium | Read the moonlighting and IP clauses in your contract. Never film work systems. Consider a quick employer review for the first 3 videos |
| Content ID false claim | Medium | No music. CC0 SFX with receipts. Dispute with proof |
| Remotion license | Low | Free while you are an individual or a company of ≤3 people. Re-check if you incorporate and hire |
| Slow growth | Certain | Expect a 1–3 year arc. Judge retention and hours-per-video first, views later |

## Anonymity decision (make it on purpose)

Posting under your own name links every video to your employability. That is good for consulting and
job inbound, and risky if a video goes wrong. Choose one now, and don't half-do it with a logo that is
obviously you.

## Disclosure, in one line

Stylized animation plus a licensed TTS voice does **not** need YouTube's "altered or synthetic"
label. Tick it only if something *realistic* depicts a real person, place or event. Saying in the
description how the video was made ("narration: AI voice, animation: code") is optional, but in this
niche it builds trust.
