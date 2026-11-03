# 25 — GitHub Repository Workflow and Codex Handoff

## Recommended repository layout
```text
animated-tech-channel/
  README.md
  AGENTS.md
  01_REFERENCE_ANALYSIS.md ... 25_GITHUB_REPOSITORY_PLAYBOOK.md
  pilot/                     # original scripts, storyboards, timing data
  episodes/E01/              # each episode has brief, evidence, script, visuals, QA
  templates/                 # reuse these across episodes
  automation/                # automation backlog
  source/                    # optional Remotion codebase added by Codex
  public/                    # ONLY owned/licensed production assets
  .gitignore                 # exclude keys, local audio and heavyweight renders
```
**Avoid GitHub bloat:** store final videos in release assets or cloud storage; do not commit multi-GB renders. If genuinely necessary, configure Git LFS for approved large source assets, not secrets.

## How to use the repo each week
1. Select one idea from `22_DISTINCTIVE_CHANNEL_STRATEGY_AND_IDEA_BANK.md`.
2. Create one GitHub issue: `E01: research + script` with acceptance checklist.
3. Fill a source log and honest reference audit; mark anything not directly inspected as `unknown`.
4. Open a `production/E01` branch; have Codex generate components and unit/visual tests.
5. Export a 15–20 sec preview; upload the render to review storage (do not commit generated binaries).
6. Review voice, diagram accuracy and originality before approving next scene.
7. Merge code/configs and final text assets only after QA; release and log performance.

## Issue labels
- `research`, `script`, `voice`, `visual`, `remotion`, `sound`, `thumbnail`, `qa`, `publish`, `blocked`, `copyright-review`, `idea`

## Codex command brief (paste after checking out the repo)
> Read `AGENTS.md`, `20_CREATOR_REFERENCE_LIBRARY.md`, `23_NARRATION_TO_VISUAL_PRODUCTION_STANDARD.md`, `24_COMPETITOR_CONTENT_QUALITY_GATES.md`, and the pilot files. Do not scrape or reuse third-party video frames or transcripts. Build a deterministic Remotion prototype whose SVG/React scene objects accurately represent the inventory race condition. Generate a 15-second scene using placeholder locally owned assets and a swappable voice WAV. Produce a small manual QA checklist and frame screenshots at the opening, the two simultaneous reads and the conflicting outcomes. Use no paid APIs or keys without explicit confirmation; put credentials only in `.env` ignored by git. Make no claims of having listened to reference videos you cannot access.

## Security / confidentiality checklist
- Never commit `.env`, API tokens, voice-provider keys, Adobe credentials or paid-account cookies.
- Never publish client-specific architecture, production incidents, internal logs, AWS account details, or proprietary code without explicit permission.
- Fictionalize incidents when necessary; label reconstructions as hypothetical.
- Use original vector assets; license-check music and voice. Keep rights register under `templates/rights_manifest.csv`.

## Next five GitHub issues
1. `E01 / Research`: fact-check safe SQL Server inventory decrement and transaction.
2. `E01 / Voice`: generate three commercial-safe narration auditions; compare blind.
3. `E01 / Animation`: build two customers → two stock reads → one DB write.
4. `E01 / Edit`: complete 60-second clean rough cut; sound pass.
5. `Release / Strategy`: original thumbnail, title, channel identity and upload metadata.

## Decision log
Create `DECISIONS.md` when the repo starts: date, decision, considered options, reason, evidence, review date. Example: **Use Remotion over generative-video subscription for core system diagrams** because correctness and editability outrank photorealism.
