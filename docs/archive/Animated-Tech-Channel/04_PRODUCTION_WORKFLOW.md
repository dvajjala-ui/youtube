# 04 — Production Standard Operating Procedure (SOP)
One lead creator, AI-assisted tools, **manual quality gates**.

| Stage | Action | Deliverable | Exit gate |
|---|---|---|---|
| 0 Idea | Select 1 candidate; define viewer question | `episode_brief.md` | One-sentence premise understandable |
| 1 Research | Find >=2 reliable primary sources for historical claims; verify diagrams | `source_log.csv`, research notes | No unsupported real-world claim |
| 2 Story | Hook → incident → architecture → investigation → root cause → fix → takeaways | `outline.md` | Viewer can follow without prior deep jargon |
| 3 Script | 900–1,300 original spoken words for ~7–9 min at ~140–160 wpm, adjusting for pauses | `script_v1.md` | Read aloud, verify all technical claims |
| 4 Voice casting | Read identical 45-sec excerpt in own voice and two AI voice candidates | `voice_tests/` | Clear identity, natural emphasis, correct terms, license confirmed |
| 5 Voice lock | Record/generate chapter-by-chapter WAV; normalize consistent levels; label takes | `audio/narration_*.wav` | No mispronunciations or robotic sentence contours |
| 6 Timing | Annotate utterance boundaries and pauses; cue events | `timing.csv` | Narration timing is source of truth |
| 7 Storyboard | For each 5–15-sec visual beat define concept, change, diagram, camera, overlays | `scene_plan.json` + storyboard | Every scene teaches/advances story |
| 8 Vertical slice | Animate 45–60 sec (one character + diagram + two transitions) | `preview_60s.mp4` | Visually coherent; readable at phone size |
| 9 Full animation | Codex generates reusable components and scenes; render in chapters | `renders/chapter_*.mp4` | No cut-off labels, wrong arrows, jank |
| 10 Edit | Assemble in Premiere; mix sound, captions, B-roll if licensed | `edit_v1.mp4`, project backup | Clean sound and consistent pace |
| 11 QA | Watch end-to-end on headphones + phone; check claims, audio, rights, captions | signed checklist | No known high-severity defects |
| 12 Publish | Title, thumbnail, description sources, chapters, disclosure as required | Published video | No unsupported claims/rights issues |
| 13 Measure | Analytics at 24h, 7d, 28d; record hypotheses | `experiment_log.md` | One improvement per next upload |

## Folder convention for each episode
```text
episodes/E001-last-item/
  brief.md  sources.csv  research.md  outline.md  script.md
  scene_plan.json  timing.csv
  audio/{voice_test,narration,music,sfx}/
  assets/{characters,icons,backgrounds}/
  renders/{draft,final}/
  edit/{premiere_project,export}/
  publish/{description,thumbnail,analytics}/
```

## Human-required approval gates
- **Gate A — factual/story approval:** Nothing is narrated as a true incident unless evidence supports it.
- **Gate B — narration approval:** Voice is pleasant, emotionally controlled and licensed; script locked.
- **Gate C — visual slice approval:** 60-second render makes sense without expensive tool upgrades.
- **Gate D — publication approval:** Final video, thumbnail and disclosure reviewed by the channel owner.

## Time budget per pilot (planning assumptions, not promises)
- Research/story 5–9 hours; script 4–7 hours; voice 2–5 hours; style system/POC 8–16 hours; full animation 15–35 hours; edit/QA 6–12 hours. **Total illustrative 40–84 hours** for a first 7–9-minute video with reusable motion assets; later videos can improve.
- Track actual hours to improve estimation; complex bespoke animation can take considerably longer.
