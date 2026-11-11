# E02 · The Cleanup Script That Deleted 883 Atlassian Sites

**Incident:** Atlassian Cloud, April 2022. **First release:** 9:16 Short. **Second release:** 16:9 incident breakdown, approximately 10:05–11:05 before editing, based on 1,660 spoken words and 150–165 words per minute. **Audience:** developers who have shipped changes to production and viewers who want to understand why a routine job went wrong. **Tone:** calm investigation with a clear recovery and practical lesson.

**Story question:** Why did a reviewed script pass staging and its first production batch, then delete hundreds of sites? The first list contained app IDs. The second contained site IDs. The same deletion interface handled both, and the pipeline did not validate the target type for that batch.

The person who ran the job is not identified by seniority in Atlassian’s review. Use an unnamed, illustrated operator to represent the role. The scene is a reconstruction. Use the real April 5 UTC timeline and omit invented quotes, personal blame, and claims of a midnight page.

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

The [spoken segments](narration/segments.json) match the generated Cartesia take. The master is about 49.6 seconds. [Word timings](transcript/words.json) drive the cuts. Recheck times after replacing the voice.

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

[Full narration draft](script.md). These are chapter planning ranges. Time the final edit from the approved audio. Build the explanatory sequences in 16:9 with the same components as the Short, then adapt where wide layouts need a separate camera and typography setup.

| Approx. time | Story beat | Screen and motion |
|---|---|---|
| 0:00–0:55 | First batch succeeds, next batch deletes sites | Illustrated operator, green checks, then hard cut to the two counts and the incident date. Hold the question before the first diagram. |
| 0:55–1:55 | What was supposed to be deleted | Wide site card with products and data attached. Lift out only the Insight tile, leaving the surrounding site intact. |
| 1:55–3:00 | Review, staging, first 30 | Three checks appear one at a time. At each green check, annotate what it actually verified. |
| 3:00–4:05 | The second list points to sites | Duplicate the same two-column layout. Animate one identifier in each lane. Pull out the app in one lane and remove the whole site in the other. |
| 4:05–5:15 | Detection and support problem | Reveal timeline ticks at 07:38, 07:46, 08:01, 08:17 and 08:53 UTC. Show a simplified support form asking for the missing site URL. |
| 5:15–6:20 | What a site depends on | Fan out catalogue, identity, product data, media and integrations. Zoom only as a new dependency matters. |
| 6:20–7:25 | First restore route | Replace the original site with a new ID. Draw dependencies one by one and show remapping accumulating. Label the April 8 milestone. |
| 7:25–8:35 | Second restore route | Reuse the original ID. Animate multiple restore lanes in parallel. Reveal validation before a green return-to-customer state. |
| 8:35–9:45 | A check that catches wrong targets | Replay the second input list into an illustrative preview. Resolve target types, show mismatch, stop the batch. Add a soft-delete and recovery exercise card. |
| 9:45–end | Apply the lesson to the next maintenance job | Bring back the two input lists. End with a single readable on-screen question about what the job will touch. |

### Motion and production decisions

- Use an illustrated person to establish the operator’s point of view. Move to a dashboard, request path, timeline, or evidence panel whenever the narration describes what the system did. Draw characters, staging and icons in the production art style.
- Use teal for the expected outcome, amber for a decision or uncertain state, and coral for damage. Add words and symbols to show state on a grayscale display.
- Reveal one row at a time on the line that introduces it. Use restrained camera moves, cuts on changes in viewpoint, and a brief hold at the root cause. Use an options panel when the narration narrows a list. Keep the backdrop quiet.
- Use exact readable vector text for identifiers, dates, figures and labels. Show concrete state transitions in the architecture. Reserve atmospheric art for moments where it supports the story.
- Prepare a reusable set of operator, monitor, terminal, event timeline, nested site card, dependency diagram and decision checklist components. Capture stills around each reveal and review captions and contrasts at phone size.
- First export is a private prototype. Confirm the narrator sounds comfortable over a full 60–90 seconds, then build the first long-form chapter with sound design. Measure the time to make that chapter before committing to the remaining chapters.
- Check the title and captions against the ledger before release. Use an export with licensed narration, readable subtitle placement, original art and any licensed sound effects. Publish the Short first and use viewer feedback on the root-cause reveal to guide the longer edit.

## Narration and build

I auditioned Cartesia Sonic 3.6 with Clive (measured), Lauren (more expressive) and Quentin (refined). The [scorecard](audition/scorecard.json) records a machine pronunciation screen. Use the WAVs to judge natural delivery. Clive is the provisional voice for the preview. Keep one speaker throughout, read in a calm incident-review tone, and use short pauses around changes in scope.

Cartesia’s Free tier is for the private preview. Its [pricing](https://www.cartesia.ai/pricing) lists commercial use on Pro, and its [terms](https://www.cartesia.ai/legal/terms) restrict commercial use without a qualifying tier. Regenerate under commercial terms for client work or monetized use. Verify the tier at checkout. The repo reads the credential from its local ignored configuration or the process environment.

From the repository root after installing workspace dependencies:

```powershell
node studio/tools/audition.mjs --episode episodes/E02-atlassian-site-deletion --excerpt audition/excerpt.json
node studio/tools/tts.mjs --episode episodes/E02-atlassian-site-deletion --voice b24f41fd-00a3-4cd8-992a-a0c9f13f3ef1
node studio/tools/build.mjs --episode episodes/E02-atlassian-site-deletion
```

The audition utility reuses WAVs by voice name. Move earlier takes aside before auditioning a different excerpt. Update the on-screen triggers and recheck cuts whenever the approved wording changes. The Short’s narration is generated. The 10+ minute narration and render remain in preproduction.
