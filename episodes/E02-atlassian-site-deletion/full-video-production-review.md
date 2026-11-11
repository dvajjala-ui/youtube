# E02 · Full transcript and visual production review

Reviewed all eight beats of the 1,897-word draft at commit `ef8766c`, its 63-segment narration plan, the landscape prototypes, and the ten supplied screenshots. The estimated runtime for that draft was 13:26. The local master WAV is the 49.64-second Short. See the [revised cast transcript](full-transcript.md) and [production plan](production-plan.md) for the next version.

The draft reveals the wrong ID in Beats 1, 2 and 4. Let the first ticket raise the question. Show what an app and a site are in Beat 2, then make Beat 4 the first time the viewer sees what the second list actually selected. Bring characters in at decisions, so dialogue changes what happens next.

## What to take from the screenshots

- **1 and 7, calls.** Give the active speaker the big tile and keep listeners visible. Names, mute and camera controls, a speaker highlight, and a shared screen make the shot recognizable. Cut to the person who realizes what the evidence means, including when that person is silent.
- **2, 3, 5 and 10, people in places.** Use a wide shot to establish the room, then a close-up for a changed expression. Make gaze, posture and props do some of the acting. A hand stopping halfway through lifting a mug will read faster than another line of explanation.
- **4 and 8, app UI.** Recognizable browser chrome, sidebar, timestamps, one selected item, and cursor focus are enough. Keep the rest quiet. Give the key message room. Use a demo capture or rebuild the relevant portion with editable text and fictional data.
- **6, terminal.** Start over the shoulder so the character and screen share the shot. Cut to the input and result at a readable size. Use real type, a prompt and a caret. Reconstruct the output since the internal terminal transcript is unavailable.
- **9, recovery handoff.** Show who owns the work, what is happening, and what they do next. Atlassian documented a real Jira project called **SITE** for tracking restorations, so use that as E02's recovery workspace.

Use a fixed cast and room. Arjun trusts the first result, Maya tests the assumption, and a distinct customer or support representative makes the impact concrete. Give each an identifiable silhouette, voice, and view of the same situation. Label invented dialogue as dramatized and keep the characters separate from actual Atlassian employees. The screenshots show staging and readability. Use an acted take to evaluate pacing and performance.


## Landscape shot map for the full episode

Times are chapter starts from the draft. Retime to the approved takes.

| Beat | Character and camera | App, terminal or diagram | Edit to the transcript |
|---|---|---|---|
| **1 · 0:00 · The ticket** | Readable phone alert on frame one. Cut to Arjun stopping mid-sip. Maya looks from him to the monitor. | Reconstructed **07:46 UTC** support ticket. Show **Batch 1 completed**, then rewind to **07:38 UTC**. | Keep the missing site, scale and the contradiction. Save the precise wrong-ID mechanism. |
| **2 · 1:05 · The home and the app** | Quick customer POV, then Maya demonstrates a site with an app inside it. | Recognizable Jira issue or Confluence page. Match-cut to a site box with an Insight app tile. Pull out only the app. | Shorten the anatomy and show what a site contains. Leave the site intact here. |
| **3 · 2:54 · Three green checks** | Two-person desk shot or call. Arjun is reassured. Maya asks which inputs the checks actually covered. | Review thread, staging console, and the first production batch. Highlight one field per insert. | End on the unanswered question about the actual objects in the second list. Label the review “Earlier.” |
| **4 · 4:37 · The second list** | Shared screen → terminal close-up → reaction. Maya asks to resolve one ID. Hold after the site disappears. | Same console for both runs. App ID removes one tile. Site ID removes the whole container. An illustrative completion marker can stay green. | Deliver the full wrong-ID reveal once. Trim repeated terminal rows and spoken explanations. |
| **5 · 6:12 · First clues** | Incident call, then a separate customer POV. The customer tries the normal support form and stops at the URL field. | Timeline at **07:38 / 07:46 / 08:01 / 08:17 / 08:53 UTC**. Show the valid cloud URL requirement. | Keep the first successful report distinct from the later dramatized blocked customer. Hold on the form instead of repeating its irony. |
| **6 · 7:53 · Seventy steps** | Show the team assigning a site and waiting as dependencies pile up. Use a tired reaction and a small moment of relief. | Reconstructed Jira **SITE** board with **Queued → Restoring → Validating → Returned**. Match-cut into the new-ID diagram. Show old references left dangling. | Use **about 70 steps** and **first customers restored April 8**. Show a few dependencies clearly and summarize the rest. |
| **7 · 9:42 · Keep the identity** | A teammate proposes keeping the ID. Return to the same board. Let relief land after verification. | Rebuild identity, data and integrations in parallel. Reconnect links as the relevant records return. Show a customer opening a reconstructed issue or attachment. | Show why the old ID reduced remapping. Compare **about 70** with **over 30**, not an exact 34. Show overlapping routes and the April 18 overall milestone. |
| **8 · 11:17 · The check** | Replay the decision at the original desk. This time the job stops. End on the operator setting the mug down. | **Proposed design** preview: expected **App**, resolved **Site**, **Blocked before execution**. | Give the type check a clear visual payoff. Mention soft delete and recovery practice briefly, and cut the second recap. |


## Fix before locking narration

- **Beats 1 and 4.** The report supports 883 sites, 775 affected customers, a 23-minute deletion window, and **up to 14 days for some customers**. Internal monitoring did not detect the deletions because they followed a standard workflow. The exact alert, ticket wording, HTTP status, commands and per-row success text are reconstructions. Replace the asserted “every row returns OK” with: “Both kinds of ID were valid inputs. The tool gave the team no warning about which kind it was about to delete.”
- **Beats 2 and 3.** Remove the unsupported claim that some customers had no second copy, the spreadsheet handoff, and the 07:31 review time. The source describes a communication gap and a check that missed the resolved object type. Use the legacy standalone Insight app as the intended target.
- **Beats 5 and 6.** The report documents a valid cloud URL requirement and lost contact details. It also describes manual and automation workstreams. Remove “every workaround was manual” and the claim that the first three days were only to prove a route. Use the April 8 first-restored milestone.
- **Beats 7 and 8.** Keeping the old identifiers reduced remapping. Records still had to be restored and the sites validated. The proposed type-check UI is an editorial demonstration. The report separately describes blocking bulk site deletes, expanding soft-delete protections, and exercising recovery at scale.

Sources: [Atlassian April 2022 post-incident review](https://www.atlassian.com/blog/how-we-build/post-incident-review-april-2022-outage) for chronology, impact and the real Jira SITE project. [Atlassian Design components](https://atlassian.design/components/) for recognizable forms, tables, avatars and status labels. Use the current UI as a visual guide and label it as a reconstruction when representing the 2022 incident.

## Build order

1. Reuse the [existing character rig](../../studio/src/incident/Character.tsx). Keep the cast, eyes, clothes and room consistent across the wider office shot, desk close-ups, and call tiles. Use distinct pose and voice cues for each decision. Recast the transcript's customer line if it currently reuses Maya's voice and face.
2. Extract the **phone/ticket**, **call/chat**, **terminal**, and **Jira issue/board** as editable scenes. Add the shared **site/app dependency diagram** for both removal and recovery. Browser demo captures can supply realistic UI plates. Overlay the cursor, focus box and word-timed rows in Remotion.
3. Make a **20–25 second landscape proof** with the ticket legible at frame one, two distinct character reactions, and a terminal insert. Check readability at half the export size and watch with sound off to verify who noticed what.
4. Make one **30–45 second recovery proof** showing the Jira handoff and the old ID restoring references as records return. Let the viewer see the validation result. Then time the whole episode with the revised voice takes. The current script and generated narration manifest remain available for comparison.
