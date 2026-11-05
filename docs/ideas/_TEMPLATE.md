# Idea template (one block per idea; keep the headings exactly so the index can parse them)

Rules that apply to every idea:
- Title is an EVENT, not a syllabus. No "(A True Story)" — that is the reference channel's token. Use our placeholder token `| Postmortem` for real incidents and `| Lab` for reconstructed/composite stories. Never label a composite story as true.
- Reel script = full spoken transcript, 110–150 words (45–60 s at ~150 wpm), numbers written as words ("twenty seven minutes"), acronyms as letters ("U T C", "C P U"), one idea per sentence. It must be paste-ready into `narration/segments.json` (segments s1..s6).
- Every number in a reel script must appear in "Facts to verify" with a source URL. For real incidents the source must be the company's own postmortem/status post, not a news article.
- On-screen column: labels only; one color = one meaning (fail/ok/warn); max 5–7 objects.
- Long-form beat map: 10–12 beats for a 12–18 minute cut; each beat = time range, what is on screen, the trigger word that reveals it (the pipeline keys animation to spoken words).

---

## NN. <Event-style title> | Postmortem   (or `| Lab`)

- **Lane:** real-incident | dotnet-azure-sql-lab | how-it-works
- **Mechanism taught:** one line
- **Why it works as a story:** one line (stakes, surprise, relatability)
- **Primary sources:** URL (date) — URL (date)
- **Laptop repro:** yes/partial/no — one line on how (docker compose, script, SQL)
- **Difficulty:** easy | medium | hard
- **Hook (first 3 seconds):** one sentence
- **Title alternatives:** 2 variants
- **Thumbnail text:** 2–4 words, which word is red

### Reel script (45–60 s, full transcript)
| id | spoken | on screen |
|---|---|---|
| s1 | … | … |
| s2 | … | … |
| s3 | … | … |
| s4 | … | … |
| s5 | … | … |
| s6 | … | … |

### Long-form beat map (12–18 min)
| # | beat | time | on screen | trigger word |
|---|---|---|---|---|
| 1 | Cold open inside the failure | 0:00–0:45 | … | — |
| 2 | Stakes + the big question | 0:45–1:30 | … | … |
| … | … | … | … | … |
| 11 | Fix shown running (repro) | … | … | … |
| 12 | The rule + repo | … | … | … |

### Facts to verify before recording
| claim | source URL | note |
|---|---|---|
| … | … | … |

**Myths to avoid on camera:** common wrong numbers or wrong years circulating about this story (if any).
