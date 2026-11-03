# 21 — Reference Analysis and Competitive Research Playbook

## 1. A precise reference record (one video = one record)
- Source URL, channel, exact title, date checked, publication date, runtime.
- **Observed:** timestamps, speech tone, screen composition, diagram types, scene transitions, sound, title/thumbnail promise.
- **Inferred:** why a specific beat may retain attention. Clearly label inference.
- **Unknown:** production app, TTS provider, editing method, audience analytics, costs, revenue unless disclosed.
- **Original adaptation:** what *generic technique* we can apply without copying a visual or script.

## 2. The six passes
1. **Metadata pass:** title, chapters, description, sources, publishing context.
2. **Narrative pass:** identify the central viewer question, stakes, revelations, and answer.
3. **Voice-only pass:** listen without video; note conversational language, breath, hesitation, rhythm, dynamic emphasis and silence. Never claim acoustic detail from captions alone.
4. **Muted-visual pass:** assess whether the animation actually communicates technical causality without narration.
5. **Timeline pass:** sample at 0:00, 0:15, 0:30, first explanation, first twist, root cause and resolution. Measure movement/shot changes manually, not by assumption.
6. **Transfer pass:** record ONE reusable principle, ONE non-copying original alternative, and ONE production experiment.

## 3. Scene annotation rubric (score 1–5)
- Hook clarity: can a newcomer explain the question in one sentence?
- Screen comprehension: can the viewer see what changed?
- Information load: is visible text readable on a phone?
- Explanation correctness: do arrows, clocks and values mean what the voice claims?
- Voice naturalness: does it sound spoken, not like a generated essay read aloud?
- Editing purpose: does each transition move the explanation or emotional beat forward?
- Originality distance: could it be confused for a screenshot/shot from the source creator? (**Lower resemblance is better**.)

## 4. Script comparison must not become a plagiarism pipeline
- Do not store or reproduce full transcripts of other creators in this repository.
- Store short observations, timestamps, links and high-level narrative beats.
- Do not feed a copyrighted transcript to an LLM with instructions to paraphrase sentence-by-sentence; write from primary technical documentation and fresh outlines.
- Don't recreate an identifiable voice or character design. Use licensed narration and original designs.

## 5. Reference deliverable format
```yaml
video_url: "https://www.youtube.com/watch?v=..."
source_reviewed_at: "2026-11-03"
inspection_method: "metadata_only" # metadata_only | listened | watched | full_audit
confidence: "low"
main_question: ""
beats:
  - timestamp: "00:00"
    role: "hook"
    observed: "NOT OBSERVED"
    proposed_original_lesson: ""
unknowns:
  - "voice provider"
  - "animation software"
asset_use_permission: "none_assumed"
```

## 6. Acceptance criterion
A reference row is **READY** only when its source is accessible, observation method is logged and an independent original technique is identified. Otherwise status is **TO AUDIT**.
