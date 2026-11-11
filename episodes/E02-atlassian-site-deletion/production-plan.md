# E02 · Long-form production plan

[Full production transcript](full-transcript.md) · [Cartesia narration manifest](longform/narration/segments.json) · [Reference frame review](full-video-production-review.md)

Deliver a 1920 × 1080 episode at 30 fps. The script has 1,877 spoken words and 24.2 seconds of marked pauses. Budget roughly 13–14 minutes at an effective 140–150 words per minute. Set final scene lengths from the generated word timings.

## Cast and direction

| Character | Responsibility in the incident | Performance and visual identifiers | First Cartesia audition |
|---|---|---|---|
| Arjun · early-career software engineer and narrator | Runs the routine job in the reconstruction, helps interpret the input, and connects the viewer to the investigation. | Existing teal jacket and mug. Quick and lightly dry before the incident. Stops moving when he sees the site target. Narration is reflective and conversational. | Akash |
| Maya · tech lead | Separates the approved scope from the actual target. Compares the restore paths. | Reuse her existing art. Gives short instructions. A raised brow becomes a fixed look at the screen as the scope changes. | Lauren |
| Ellis · senior reliability engineer | Confirms impact evidence and tests recovery from an ordinary user's account. | Headset and dark overshirt. Looks from the result to the caller. Leaves room for the reader to see a failed check. | Ronald |
| Vik · engineering manager and incident lead | Assigns owners, sets the customer update cadence, and coordinates the two restore routes. | Worn cardigan and open notebook. Voice stays even under pressure. Stops typing to hear the customer-facing lead. | Samuel |
| Sam · customer account lead | Finds a reachable customer contact, passes through support evidence, and owns the next update. | Warm shirt and phone stand. Talks with urgency when a customer asks for a date. Drops his shoulders when they can sign in. | Quentin |
| Daniel · CTO | Asks what can be said publicly while recovery is still underway. | Plain jacket and a tight, neutral frame. Short, direct lines with time for Sam to answer. | Clive |

Introduce each role with a lower third on their first active shot. Give each person an idle pose and two reactions relevant to their work. Draw the new cast from one proportion sheet. Reuse face and clothing layers across call tiles and close-ups. Keep eyes, brows, mouth and hands editable. Record each turn as its own take, and give the listener a reaction before cutting back to the speaker. The published episode should identify the dialogue and cast as dramatized. [Atlassian post-incident review](https://www.atlassian.com/blog/how-we-build/post-incident-review-april-2022-outage)

## Edit by chapter

| Beat | Approx. in | What the viewer sees and hears |
|---|---:|---|
| 1. The ticket | 0:00 | Open on the failed customer site. A ticket arrives, Sam asks what the customer should open, and Arjun freezes with the mug in his hand. Bring in the scale and the title after the exchange. |
| 2. The job on paper | 0:55 | Office wide, reverse on Maya, then a Jira-style site. Lift the Insight tile out while the rest of the site stays open. |
| 3. Thirty out of thirty | 2:18 | Staging and review screens, then green first-batch results. On the call, Maya asks about the new list. Arjun's hand comes down from the mug. |
| 4. The scope reveal | 3:35 | Screen share to over-the-shoulder terminal to full-width lookup. Hold on `Resolved target   CLOUD SITE`, cut to Arjun's face, and show the parent site disappear on the timeline. |
| 5. Customer outreach | 5:02 | Support form, then the call between Sam and Vik. Show Sam checking an older case and drafting a confirmed next update. |
| 6. The first restore | 7:06 | Jira SITE issue, then a single attachment's old reference. Ellis uses an ordinary account and checks whether the work opens. Show the first successful restores on April 8. |
| 7. The second route | 9:26 | Animate parallel restore lanes around the old ID. On SITE show the last verified step and next owner. Finish the chapter with the CTO update and April 18 milestone. |
| 8. The proposed guardrail | 12:07 | Return to the same terminal framing and site outline. Show the mismatch block, then cut to Arjun finally tasting the cold coffee. |

## Reusable visual kit

- **Character shots.** Start from the existing `HostOpening.tsx` and shared `studio/src/incident/Character.tsx`. Build one desk wide, a reverse angle, an over-the-shoulder view, and a call with a speaker tile and visible listeners. Reuse the same mug, lighting positions and character layers. Use an illustrated still from Krita or Inkscape for each new set or pose, then animate pose swaps, eye line and camera crops in Remotion.
- **App screens.** Use a demo Jira issue or official component references for navigation, tabs, issue headers, status lozenges and an assignee row. Build the SITE issue with editable fields for `Owner`, `Restore route`, `Last verified`, and `Next action`. For the support form, show the cloud URL field and its validation state. For the call, show participant names, camera and mute states and the active speaker. Keep each screen readable with one selected row, field or action in focus. Mark historical reconstructions and use demo data. [Atlassian Design components](https://atlassian.design/components/)
- **Evidence.** Keep the terminal prompt, caret, output, app/site diagram, and timeline as Remotion text and shapes. Use the same app tile, parent site silhouette and target lookup in Beats 2, 4 and 8. Use green with a label for a validated state, amber for an open check, and red with a stop label for a blocked or harmful state. Use a reconstructed lookup display.
- **Sound.** Record Arjun as one consistent voice in dialogue and narration. Use a distinct take for each cast turn. Add one ticket sound, subtle keyboard and call-room ambience, and a brief hold when the target resolves. Bring the room tone down at the reveal and make space for the silence after the customer question. Keep captions on a separate layer from the apps.

## Production sequence

1. **Opening proof, about 55 seconds.** Synthesize Beat 1 and make a landscape animatic using the failed site, support ticket, Arjun close-up, Sam reverse, impact and title. Show a cold viewer the first 20 seconds. Check that they can tell whose work is interrupted and what the maintenance job was meant to do. Lock acting and screen readability before building more sets.
2. **Recovery proof, about 35–40 seconds.** Use `b6-01`, `b6-02`, `b6-03` and `b6-05`. Build the SITE issue, the three-way call, and the attachment diagram. Check that a cold viewer can explain why the restored database is only one part of a working site. Compare the takes by ear for natural interruption, pronunciation and pacing before locking voices.
3. **Full episode.** Lock script and cast, render narration and word timings, and create a dedicated `E02Longform` composition. Give it separate audio and clock inputs from the Short. Place chapter markers from the measured timings. Build the root-cause scene next and reuse the proof assets in the other chapters. Export a review MP4 with captions. Watch at phone size and check the first ticket, target lookup, and SITE issue for legibility. Then export the 16:9 master and use the opening or restore sequence to cut a Short.

## Generate the audio

### Opening preview

The `E02LongformOpening` composition uses local Kokoro voices for Arjun and Sam, original character animation, and the reconstructed browser, terminal, and support queue. The local voice track measures about 58 seconds. Sentence boundaries drive the cuts and captions. Audio amplitude drives the dialogue mouth shapes. To regenerate the local takes and render the preview from the repository root:

```powershell
$openingTts = Join-Path $env:TEMP 'karelu-e02-kokoro'
New-Item -ItemType Directory -Force $openingTts | Out-Null
npm install --prefix $openingTts kokoro-js@1.2.1 --no-audit --no-fund
node episodes/E02-atlassian-site-deletion/tools/segments-from-transcript.mjs
node episodes/E02-atlassian-site-deletion/tools/synth-opening.mjs (Join-Path $openingTts 'node_modules/kokoro-js/dist/kokoro.js')
Push-Location episodes/E02-atlassian-site-deletion/composition
npx remotion render src/index.ts E02LongformOpening out/e02-longform-opening.mp4
Pop-Location
```

### Cartesia auditions and full master

The generator keeps dialogue labels, acting and shot cues as metadata and passes only the spoken text to Cartesia. The manifest uses six provisional stock voices. Use the existing Cartesia setup for a private audition. Check the commercial-use terms before paying for or using a public or client take. [Cartesia pricing](https://www.cartesia.ai/pricing)

From the repository root in PowerShell, create the opening audition in its own output folder:

```powershell
node episodes/E02-atlassian-site-deletion/tools/segments-from-transcript.mjs
$longform = 'episodes/E02-atlassian-site-deletion/longform'
$opening = "$longform/out/opening"
New-Item -ItemType Directory -Force "$opening/narration" | Out-Null
$manifest = Get-Content -Raw "$longform/narration/segments.json" | ConvertFrom-Json
$manifest.segments = @($manifest.segments | Where-Object { $_.id -like 'b1-*' })
$manifest | ConvertTo-Json -Depth 8 | Set-Content -Encoding utf8 "$opening/narration/segments.json"
node studio/tools/tts.mjs --episode $opening --voice cc71692b-f326-499b-8f8f-90a415b4d3fb
```

For the recovery audition, use a separate `out/recovery` directory and filter to the four recovery proof IDs. Once the auditions are locked, synthesize the full master with the long-form episode directory:

```powershell
node studio/tools/tts.mjs --episode episodes/E02-atlassian-site-deletion/longform --voice cc71692b-f326-499b-8f8f-90a415b4d3fb
```

The full command writes `longform/narration/master.wav` and `longform/transcript/words.json`. The existing Short, host opening, and cold-open prototypes have their own audio and timing files.
