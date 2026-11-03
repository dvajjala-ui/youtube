# 05 — Research and Original Script System
## Repeatable story architecture (7–9 minutes)
| Time (approx.) | Narrative purpose | Rules |
|---|---|---|
| 0:00–0:25 | Cold open | Specific failure, consequence, one unresolved question; no channel intro |
| 0:25–1:00 | Setup | Who/what/why audience should care; label fictional reconstructions |
| 1:00–2:30 | System as it *should* work | One diagram with a user request traveling across components |
| 2:30–4:10 | Failure in slow motion | Show actual sequence, timestamps and decisive state transitions |
| 4:10–5:35 | Investigation | Wrong guesses then evidence, without faking real quotes |
| 5:35–7:15 | Root cause and fix | Explain precise failure mechanism; show corrected behavior |
| 7:15–8:15 | What survives the fix | Caveats, alternative approaches, lesson, one strong ending |

## Writing principles
- Sentences 8–22 words on average; purposeful variation. Write for speech, not as a blog article.
- Every 20–45 seconds ask/answer a narrative question, add evidence, reverse a mistaken theory or visualize a meaningful event.
- Define each acronym once. Give only facts needed for the current puzzle.
- Make the narrator sound curious, measured, precise; avoid all-caps, fake hype and filler.
- Use dialogue sparingly; mark invented characters and scenes as dramatizations.
- Mark pause cues such as `[pause 0.7s]`, `[slower]`, `[emphasis: the last item]` in the *recording direction* file; strip bracketed directions before TTS API if not supported.
- Keep SFX descriptions **out** of the spoken script.

## Research protocol
1. Define every claim about an actual brand, date, outage, incident length or root cause.
2. Link to original postmortem / product docs / a peer-reviewed or official primary source.
3. Keep a claim row: `claim_id`, `text`, `source_url`, `quote_or_figure`, `confidence`, `script_location`.
4. If sources disagree, rewrite the claim precisely or flag it as unresolved.
5. Tech reviewer checks race conditions, transaction scope, timeout semantics, network diagrams and alternative scenarios.
6. Do **not** copy third-party YouTube transcripts; treat them only as format/coverage references.

## Script review scorecard (0–5 each)
- Hook's unanswered question
- Causal clarity of failure
- Explanations are accurate for target experience level
- Changes in pace, tension and concrete imagery
- Voice naturalness when read aloud
- Unique insights and non-derivative writing
- Resolution really answers the hook
**Minimum:** no item <3; total >=29/35 before voice lock.

## Three promptable passes
- **Pass 1:** Source-grounded outline, technical correctness.
- **Pass 2:** Cinematic but factual original script. Add curiosity and causal progression.
- **Pass 3:** Voice read-through; remove tongue twisters, repetitive phrasing, unsupported dramatisms.

## Practical naming
`script_v01.md → script_v02_factchecked.md → script_LOCKED.md`. Never synchronize 40 animated scenes to a changing narration draft.
