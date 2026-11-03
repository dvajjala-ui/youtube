# 24 — Quality Gates and Definition of Done

## Pipeline statuses
`IDEA → RESEARCHED → SCRIPTED → NARRATED → ANIMATIC → ROUGH_CUT → FACT_QA → FINAL_EDIT → PUBLISH_READY → PUBLISHED → REVIEWED`

| Gate | Must be true before moving on | Reviewer | Blocker example |
|---|---|---|---|
| Research | Sources linked; factual vs fictional identified; 1-sentence hook | Creator | Unsupported incident claim |
| Script | Spoken naturally; one question; escalation; credible payoff | Creator | Sounds like generic AI essay |
| Narration | Selected by blind comparison; names/terms pronounced; audio owned/licensed | Creator | Wrong technical pronunciation |
| Animatic | Every claim has a matching state change; no fake demonstration | Creator + optional technical reviewer | Request arrow moves wrong direction |
| Technical QA | Database/queue/service semantics accurate; assumptions labeled | Technical reviewer | One atomic update portrayed as magically fixing payments |
| Creative QA | Original script, diagrams, characters, tone, title, thumbnail | Creator | Too visually similar to reference creator |
| Legal/right use | Asset rights manifest complete; commercial terms of TTS/music verified | Creator | Unlicensed stock footage/music or borrowed voice |
| Export | 16:9 master, checked captions, mobile legibility, intentional opening | Creator | Tiny code text on phone |
| Publish | Honest title/thumbnail; links and sources; relevant AI disclosures | Creator | Photorealistic reconstruction presented as real video |

## Practical scorecard (1–5 each)
1. Hook and stakes (20%)
2. Narration authenticity and intelligibility (20%)
3. Animated technical causality (25%)
4. Technical accuracy and source traceability (20%)
5. Sound/edit polish (10%)
6. Originality and ethical production (5%)

**Release rule (suggested):** all gate blockers resolved, weighted average at least 4.0/5, no area below 3/5. This is an internal target, not a YouTube requirement.

## Sound-first final review
- Watch the first 30 seconds on mobile without skipping; can you state the open question?
- Listen to the complete episode without visuals; does it tell a coherent story?
- Watch the explanation muted; do you see the data/control flow change?
- Compare voice and visual transition timestamps to actual rendered audio.
- Have another technical person describe the fix back to you.

## Rights manifest columns
`asset_id, filepath, creator_or_provider, source_url, license_or_terms_url, commercial_use_verified, attribution_required, attribution_text, evidence_date, approved_by`

## Source integrity
Keep short citations and your own explanatory notes, not copied full transcripts, ripped creator footage, or screenshots used as final assets without rights.
