# 18. Topic Bank, Title Formula And Thumbnail Rules

`Animated-Tech-Channel/22_DISTINCTIVE_CHANNEL_STRATEGY_AND_IDEA_BANK.md` has 16 premises and
`docs/06-30-day-plan.md` has 5 topics. This file adds the part neither has: topics written **in the
verified title formula** from `13-reference-channel-teardown-verified.md`, each with the mechanism it
teaches and whether it can be reproduced in a demo-lab on a laptop. If it cannot be reproduced, it is
not a video you should make first, because the reproducible repo is your differentiator.

---

## 1. The filter a topic must pass (all four)

1. **You debugged it, or you can reproduce it this week.** Engineers smell secondhand knowledge.
2. **There is one visible failure artifact** — a log line, a lock graph, a queue depth chart, a diff
   between two `SELECT` results. If the story has no artifact, the animation has nothing to reveal.
3. **A real postmortem or doc anchors it**, so Act 2 is fact rather than vibe.
4. **The title passes the formula test** in §3 below. If you can only write "Guide to X", it is a
   listicle and the reference channel's data says listicles are its worst performers.

---

## 2. Topic bank, grouped

### Azure and messaging (your strongest lane, and the least crowded)

| Title in the verified formula | Mechanism taught | Demo-lab repro |
|---|---|---|
| Friday Afternoon Queue Backlog Crash Course (A True Story) | Service Bus duplicate delivery, visibility timeout, the non-idempotent consumer | Yes — Service Bus emulator or RabbitMQ + a .NET consumer |
| The Message That Was Delivered Twice (A True Story) | At-least-once semantics, idempotency keys, dedupe table | Yes |
| 3AM Autoscale Crash Course (A True Story) | Azure App Service scale-out storm, cold start, connection pool exhaustion | Partial (local k8s HPA instead) |
| Our Azure SQL Failover Group Did Not Fail Over (A True Story) | Listener health, DNS vs redirect, connection resilience in `SqlClient` | Partial |
| The Storage Key That Rotated Itself (A True Story) | SAS expiry, clock skew, managed identity vs shared key | Yes |
| Why Every Request Retried At Once (A True Story) | Retry thundering herd, missing jitter, `Polly` retry policy | Yes |

### SQL Server and data correctness

| Title | Mechanism | Repro |
|---|---|---|
| The Delete That Had No WHERE Clause (A True Story) | Transaction log, point-in-time restore, backup chain | Yes — local SQL Server + a restored backup |
| Friday Night Blocking Crash Course (A True Story) | Lock escalation, blocking chain, `sp_whoisactive` reading | Yes |
| The Index That Made Queries Slower (A True Story) | Write amplification, covering index trade-off, seek vs scan | Yes |
| One Query, Two Plans (A True Story) | Parameter sniffing, plan cache, why the same query is 4ms then 4s | Yes |
| The Deadlock Nobody Could Reproduce (A True Story) | Lock order, deadlock graph, retry policy | Yes |
| Tempdb Ate The Server (A True Story) | PAGELATCH contention, GI, memory-optimized tempdb | Yes |
| The Backup Nobody Tested (A True Story) | Restore verification, `RESTORE VERIFYONLY` is not enough | Yes |
| Replica Lagged By Six Hours (A True Story) | Always On redo, log shipping, latency metrics | Partial |

### .NET runtime and services

| Title | Mechanism | Repro |
|---|---|---|
| The Memory Leak In A Console App (A True Story) | Gen 0 survival, event handler retention, `dotnet-counters` | Yes |
| Thread Pool Starvation Crash Course (A True Story) | Sync-over-async, thread injection, min threads | Yes |
| Why Our API Took 30 Seconds Then Was Fine (A True Story) | JIT warmup, DNS in `HttpClient`, connection handler exhaustion | Yes |
| The Singleton That Held A DbContext (A True Story) | DI lifetimes, captured dependencies | Yes |
| Two Customers Bought The Last Item (A True Story) | Race condition, `UPDATE ... WHERE Stock = 1`, atomicity | Yes (already the bundle's pilot) |
| The Async Method That Never Returned (A True Story) | Deadlock on sync context, `ConfigureAwait` | Yes |
| Serialization Took Down The Gateway (A True Story) | Payload size, `System.Text.Json` vs `Newtonsoft` behavior, truncation | Yes |

### Distributed systems (the genre's home turf — enter only with a fresh angle)

| Title | Mechanism | Repro |
|---|---|---|
| Split-Brain Crash Course (A True Story) | Quorum, etcd, witness node | Yes (minikube) |
| The Clock That Went Backwards (A True Story) | NTP step vs slew, monotonic clocks, log ordering | Partial |
| Cache Stampede At Midnight (A True Story) | TTL expiry herd, single-flight, jittered expiry | Yes |
| When DNS Was The Database (A True Story) | Service discovery, TTL, stale records after failover | Yes |
| The Idempotency Key That Was Not (A True Story) | Exactly-once illusion, key scope, replay window | Yes |
| Nine Nines And One Bad Deploy (A True Story) | Error budget, blast radius, progressive rollout | Partial |
| Why The Retry Made The Outage Worse (A True Story) | Retry amplification across tiers, circuit breaker | Yes |

### Security and identity (high RPM, higher accuracy bar)

| Title | Mechanism | Repro |
|---|---|---|
| He Hacked His Own Staging Environment (A True Story) | Lateral movement, secret sprawl, least privilege | Yes (local) |
| The JWT That Never Expired (A True Story) | Token lifetime, revocation, refresh rotation | Yes |
| Certificate Rotation Sunday Night (A True Story) | TLS chain, expiry monitoring, mTLS | Yes |
| The Service Account With Domain Admin (A True Story) | Over-privileged identity, Azure AD app roles | Partial |
| Secrets In The Connection String (A True Story) | Config leakage, Key Vault, log redaction | Yes |

---

## 3. Title formula (from the verified data, not from taste)

Use one of these three shapes:

1. **`<System or event> Crash Course (A True Story)`** — the flagship pattern.
2. **`<Time anchor> + <system noun> Crash Course (A True Story)`** — "3AM", "Friday Night", "Midnight".
3. **`How <X> Actually Works`** — for non-incident explainers with a hidden mechanism.

Rules that follow from the data:

- Put the **stakes** in the title, not the syllabus. "The Delete That Had No WHERE Clause" beats
  "Understanding SQL Transactions".
- Keep "(A True Story)" exactly consistent. It is a brand token, and brand tokens are why his fourth
  video still gets clicked.
- Front-load the concrete noun. Under 60 characters where you can.
- **Banned patterns, all of which under-perform on the reference channel:** "N Concepts You Should
  Know", "Ultimate Guide", "Learn X in Y Minutes", "X Explained Simply", "Roadmap", and any title
  whose promise is coverage rather than an event.

---

## 4. Thumbnail rules (observed grammar, with the rights fix)

- 3 to 5 words of stakes in condensed bold caps. Red for threat, white for system nouns.
- One clock element when the story has a time ("3:00 AM", "FRIDAY 6:01 P.M." in digital display).
- One character with an emotion, drawn or generated **by you** — never a downloaded Wojak or Pepe
  pack (`15-voice-audio-and-rights.md` §4).
- One real terminal block, syntax-colored, with the actual failing statement.
- Your channel mark in a consistent corner, and a consistent accent bar. Consistency is allowed by
  policy; YouTube's own guidance says a shared intro or outro is fine as long as the bulk of content
  differs.
- **Do not** use the icon-medallion grid style. It is the only thumbnail on the reference channel that
  broke the grammar, and it sits on the second-worst video.

---

## 5. How to validate before you spend 40 hours

1. Write the title and the thumbnail **first**. If you cannot make yourself click it, the topic is not
   a story yet.
2. Search the exact mechanism on YouTube. Zero good results is opportunity; five polished results is a
   reason to change the angle, not the topic.
3. Check a real postmortem exists for the shape of failure, so Act 2 has citations.
4. Reproduce the failure locally in under 30 minutes. If it will not break on a laptop, it will not
   break on camera.
5. YouTube lets eligible creators test **up to three thumbnail and title variations** and compare on
   watch-time share. Use that instead of guessing, once you are eligible.
6. Log the prediction ("this will do 2x my median because...") before publishing, then check it after.
   This is the only way to build real instincts instead of vibes.

---

## 6. Sequencing suggestion for the first six

Open with something in your lane that is fully reproducible and has no strong incumbent:

1. `Two Customers Bought The Last Item (A True Story)` — shortest path to a finished video; the pilot
   script and storyboard already exist in `Animated-Tech-Channel/pilot/`.
2. `The Retry Storm Nobody Planned (A True Story)` — Polly jitter missing; pure .NET, high relatability.
3. `One Query, Two Plans (A True Story)` — parameter sniffing; SQL Server depth, few good visual
   explainers of it.
4. `The Message That Was Delivered Twice (A True Story)` — Service Bus idempotency; your Azure edge.
5. `The Backup Nobody Tested (A True Story)` — restore verification; universal fear.
6. `Thread Pool Starvation Crash Course (A True Story)` — sync-over-async; every .NET engineer has
   lived it.

That order front-loads learning speed (1 and 2 are small), then spends the credibility you earn on
bigger mechanisms.
