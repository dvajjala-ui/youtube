# 02 — Channel Positioning and Idea System
## One-line concept
**"The engineering failures behind everyday technology — explained as animated investigations."**

## Audience
- Primary: developers with 1–7 years' experience, aspiring backend/cloud engineers, technical enthusiasts.
- Secondary: interview preparation and general tech education audiences.
- Language: English. Explain acronyms on first use; captions in English; avoid India-only assumptions if targeting global tech audiences.

## Format mix
- 70% **fictional/composite engineering incidents**, clearly labeled as hypothetical (simplest licensing and research burden).
- 20% **verified real-world incidents**, citing public postmortems.
- 10% **system deep dives**, framed around a practical question.
- Main videos: 7–12 minutes at launch; short excerpt: 30–60 seconds with standalone value, not a deceptive cliffhanger.

## Content pillars and candidate titles
| Priority | Working title | Hook | Technical lesson | Research status |
|---|---|---|---|---|
| P1 | Two Customers Bought the Last Item | Two successful checkouts; one product | Atomic update, transactions, idempotency | Fictional educational pilot |
| P1 | The Message That Got Processed Twice | One payment, two confirmation emails | At-least-once delivery, idempotency | Research required |
| P1 | 5 Minutes of Downtime From a Single Config Key | One secret setting breaks live APIs | Configuration management, validation | Fictional |
| P1 | The Queue That Never Emptied | Jobs grow faster than workers | Backpressure, retries, dead-letter queues | Fictional |
| P1 | The Deployment That Broke Every Login | Refresh tokens stop validating | Auth, key rotation, rollout safety | Fictional |
| P2 | The Database Index That Made Things Slower | Fast query turns disastrous | Selectivity, plans, lock contention | Fictional |
| P2 | The Cache That Served Yesterday's Prices | Customers see stale values | Cache invalidation, TTL, consistency | Fictional |
| P2 | A Timeout Turned One Order into Three | Retries create duplicate work | Retry budgets and idempotency | Fictional |
| P2 | Why a Perfectly Healthy API Had 10-Second Latency | p99 spikes | Resource saturation, dependencies | Fictional |
| P2 | The Alert Nobody Believed | Endless low-value pages | Alert fatigue and SLOs | Fictional |
| P3 | What Happens When Your JWT Signing Key Rotates? | Login accepted in one region only | Token verification and rotation | Research required |
| P3 | A Single Bad Migration Locked the Database | Friday deployment fails | Schema migrations and safe rollouts | Fictional |

## Originality differentiator
- Each episode includes one **concrete implementation lesson**: a SQL transaction, an Azure architecture choice, or a reproducible minimal demo.
- End on a clear, actionable takeaway rather than generic motivational advice.
- Publish source notes and simplified diagrams in the description or linked GitHub repo.

## Title & thumbnail test
Before production, produce three titles and thumbnails. Ask: 1) Is there a specific conflict? 2) Is the technical reward obvious? 3) Does image communicate the problem without more than four words? No promises of incidents that did not happen.

## Selection rubric (score 1–5)
- Stakes / curiosity (30%)
- Educational value (25%)
- Visual clarity / ease of illustration (20%)
- Credible source support (15%)
- Differentiation (10%)
Pick candidates scoring >= 3.8/5; rejected ideas stay in backlog.
