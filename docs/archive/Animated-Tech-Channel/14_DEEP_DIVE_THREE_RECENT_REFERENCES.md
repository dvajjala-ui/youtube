# 14 — Three Recent Pouria Episodes: Story Structure and Production Lessons

**Checked:** 2026-11-03. **Evidence class:** publicly accessible descriptions/chapter timestamps; not a direct audiovisual or subtitle analysis. These are the three most recent reference episodes we could substantiate; the live YouTube uploads feed could not be exhaustively verified, so do not claim they are definitely the exact three latest uploads.

## Verified reference A — Kubernetes Crash Course (A True Story)
- **Published:** 30 Oct 2026; **runtime:** approximately 24:56.
- **Watch:** https://www.youtube.com/watch?v=J3VavGnt5Yg
- **Published structure:** 0:00 Reddit outage → 1:17 scale → 2:06 why Kubernetes exists → 3:47 cluster architecture → 6:32 upgrades → 8:17 Pi Day incident → 9:41 why rollback was difficult → 10:24 clues → 11:48 networking/CNI → 13:59 Calico → 14:48 restore → 17:36 investigation → 18:46 BGP and route reflectors → 20:50 hidden config → 21:34 root cause → 23:59 lessons.
- **What the structure demonstrates:** Spend time establishing a concrete failure before introducing system concepts. Delay the BGP/root-cause detail until viewers understand why networking matters. Alternate story beats with mental-model beats.
- **Our proposed visual treatment (NOT an observed shot list):** black screen plus incident graph; a 5-node cluster; moving request packets; router connections; highlighted missing config; side-by-side expected vs actual route. Use diagrams to establish causality, not arbitrary stock footage.
- **Original episode angle:** 'The Deployment That Broke Only One Region' using fictionalized services and demonstrably correct reasoning.
- **Sources:** https://zolotube.com/watch?v=J3VavGnt5Yg ; https://www.reddit.com/r/RedditEng/comments/11xx5o0/you_broke_reddit_the_piday_outage/

## Verified reference B — Friday Night Database Recovery Crash Course (A True Story)
- **Published:** 18 Sep 2026.
- **Watch:** https://www.youtube.com/watch?v=LoZ2kpFnqB8
- **Published structure:** 0:00 emergency → 0:44 Friday afternoon → 1:28 CEO request and `log_statement` → 3:08 disk alert → 3:38 self-hosted Postgres → 4:35 log deletion → 5:54 destructive shell command → 7:04 incident response → 8:29 lost day → 8:53 WAL/PITR → 9:37 no restore process → 10:13 restore drills/RPO/RTO → 11:16 12-day backup gap → 12:39 CEO call → 13:41 restore → 16:04 aftermath.
- **Story lesson:** People and decisions supply tension; logs and database mechanics supply the explanation; the resolution connects to operational practices.
- **Our proposed visuals:** 3-person war room, dashboard disk rising, command terminal, backups timeline with missing days, WAL as transaction cards, restore snapshot. Keep command text technically accurate; never fictionalize an actual company's behavior without labeling it.
- **Original episode angle:** 'The Backup Was Green. The Restore Still Failed.'
- **Source:** https://zolotube.com/watch?v=LoZ2kpFnqB8

## Verified reference C — 3AM Observability Crash Course (A True Story)
- **Published:** 31 Aug 2026.
- **Watch:** https://www.youtube.com/watch?v=AmHYfEW7CCg
- **Published structure:** 0:00 3 AM incident → 1:28 wolf fencing analogy → 2:16 PagerDuty/p99 → 4:01 Grafana/Prometheus → 5:19 order dashboard → 6:52 P50/P95/P99 → 8:13 logs/Elasticsearch → 10:20 trace IDs → 11:27 reading a trace → 13:26 problem → 13:57 fix.
- **Story lesson:** Start with the *symptom* and progressively reveal the right tool to identify the root cause: metric → log → trace. Each concept solves a question created by the previous story beat.
- **Our proposed visuals:** pager alert; p99 line climbing; service cards; log line pinned to trace ID; request hopping through three services; slow query highlighted; corrected trace.
- **Original episode angle:** 'A Checkout API Was Fast—Until the 99th Percentile.'
- **Source:** https://zolotube.com/watch?v=AmHYfEW7CCg

## Reusable story grammar extracted from the published structures
1. **Consequence first:** customers see a symptom; *not* a dictionary definition.
2. **Human choice:** someone deploys, deletes, configures, or investigates something.
3. **Just-in-time teaching:** introduce the minimal technical concept needed to interpret the next clue.
4. **Investigation:** narrow competing hypotheses using specific evidence.
5. **Counterintuitive reveal:** show exactly which assumption failed.
6. **Proof and lesson:** animate the corrected system, not merely say 'it was fixed.'

## What we have NOT verified
- Exact narrator voice, whether the narrator is human or generated, speed, accent or TTS vendor.
- Exact frame composition, asset provenance, editor used, animation technique, SFX, music, and cut frequency.
- Word-for-word transcripts or a full audiovisual listen-through. Do not describe assumptions as observations.

## Manual five-minute reference audit per episode
Open the linked video and sample 0:00–0:45, the first architecture explanation, the incident escalation, and the root-cause reveal. Fill `templates/reference_audit.md`: type of object on screen, change per spoken phrase, camera motion, text density, sound, voice tempo, pauses, and whether information was *constructed progressively*. This is the missing direct observation before matching finer visual and voice qualities.
