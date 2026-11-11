# E02 · The Cleanup Script That Deleted 883 Atlassian Sites

**Incident:** Atlassian Cloud, April 2022. **First release:** 9:16 Short. **Second release:** 16:9 character-led incident breakdown, approximately 13–14 minutes. **Audience:** developers who have shipped changes to production and viewers who want to understand why a routine job went wrong.

**Story question:** Why did a reviewed script pass staging and its first production batch, then delete hundreds of sites? The first list contained app IDs. The second contained site IDs. The same deletion interface handled both, and the pipeline did not validate the target type for that batch.

The Short uses an unnamed operator. The long-form script uses a fictional ensemble and original dialogue, with the dramatization identified on screen. Atlassian’s review does not identify the operator by seniority.

## Source ledger

All incident figures and reported actions come from the [Atlassian incident review](https://www.atlassian.com/blog/how-we-build/post-incident-review-april-2022-outage). Cite it in the description and on the source card.

| Claim | Location in the incident review | Editorial check |
|---|---|---|
| Older Insight app retirement. Deletion interface accepted both app and site IDs. | What happened | Keep app and cloud site distinct. Example identifiers and panels are reconstructed. |
| Peer review examined the call. Production IDs did not exist in staging. The initial 30-site production batch used previously collected, correct app IDs. | What happened | Two different batches. Same script and different target inputs. |
| April 5, 07:38–08:01 UTC. 883 sites deleted, 775 customers affected. First customer support ticket at 07:46. Incident process at 08:17. Link to script confirmed at 08:53. | What happened, How we coordinated | Counters mean sites versus customers. The first ticket arrived while the job ran. |
| The standard deletion workflow did not trigger internal detection. Lost site and contact information complicated support. | How we coordinated, Support experience | Show the constraint with a diagram and a reconstructed support form. |
| First restore approach made replacement sites and remapped references. Approximately 70 steps. Second approach reused original IDs and removed over half of the earlier steps. | Restoration 1 and Restoration 2 | Identity reuse still required data and service restores plus validation. |
| First set restored April 8. All sites progressively restored by April 18. A subset waited up to 14 days. | Executive summary and Timeline | Avoid saying every customer was down for two weeks or that all data was irrecoverable. |
| Atlassian called for broader soft delete and recovery exercises at scale. | How will we improve | The illustrated target preview, type check and batch cap are our design suggestions. |

## Short master

The [Short voiceover](short-voiceover.txt) and [word timings](transcript/words.json) correspond to the approximately 49.6-second master. The JSON at `narration/segments.json` is a prior long-form draft. Use the new manifest under `longform/narration/` for this production.

| Approx. time | What to animate | Edit and sound direction |
|---|---|---|
| 0:00–0:07 | Original engineer at a desk. Staging and batch one rows turn green. Batch two changes to red and the headline becomes 883 sites deleted. | Start on the first line of narration. Use one quiet notification at the change in scope if the final mix needs it. |
| 0:07–0:17 | Show an Insight app nested in a customer site. Bring in the second list with a SITE IDs label. | Hold the nesting long enough to read before revealing the list. |
| 0:17–0:25 | Reveal two outcomes from the same interface, app removed versus entire site removed. | Cue each outcome to its spoken phrase. |
| 0:25–0:35 | 775 affected customers. Contact record goes unavailable. Support form expects a site URL. | One focal point per row. |
| 0:35–0:42 | Original site ID returns and existing references can reconnect after restoration. Reveal up to 14 days for the longest outages. | Hold the recovery result for readability. |
| 0:42–0:50 | Illustrative dry run resolves 883 sites when apps were expected. The action is blocked. | Give the rejected action a hold. Mark the dry run as an illustration of a possible safeguard. |

Draft Short title **A Cleanup Script Deleted 883 Atlassian Sites**. Long-form title **The Cleanup Script That Deleted 883 Atlassian Sites**. For the long-form thumbnail, show a list card labelled APP IDS pointing to an entire site in red. Use **WRONG IDS** as the headline. Build with the original palette and graphics.

Two follow-on Shorts from the same research and assets could answer **Why did the canary pass?** (the first list was different) and **Why did keeping the old ID speed up recovery?** (fewer dependent records needed remapping). Each can stand alone.

## Long-form edit

[Full transcript](full-transcript.md) · [Production plan and audition commands](production-plan.md) · [Long-form narration manifest](longform/narration/segments.json)

The opening starts with a customer unable to access their site. The second list's target is revealed in Beat 4. The [58-second landscape opening](production-plan.md#opening-preview) is available as `E02LongformOpening` in Remotion Studio. The next production test is the separate recovery scene.

## Narration and build

The Short auditioned Cartesia Sonic 3.6 with Clive, Lauren and Quentin. The [scorecard](audition/scorecard.json) records a machine pronunciation screen. The generated Short uses Clive. The long-form plan has its own cast auditions.

Cartesia’s Free tier is for the private preview. Its [pricing](https://www.cartesia.ai/pricing) lists commercial use on Pro, and its [terms](https://www.cartesia.ai/legal/terms) restrict commercial use without a qualifying tier. Regenerate under commercial terms for client work or monetized use. Verify the tier at checkout. The repo reads the credential from its local ignored configuration or the process environment.

From the repository root after installing workspace dependencies:

```powershell
node studio/tools/audition.mjs --episode episodes/E02-atlassian-site-deletion --excerpt audition/excerpt.json
node studio/tools/build.mjs --episode episodes/E02-atlassian-site-deletion
```

The audition utility reuses WAVs by voice name. Move earlier takes aside before auditioning a different excerpt. The build command uses the existing Short master. The full episode's audio and video are pending.
