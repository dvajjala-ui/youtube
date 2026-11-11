# Atlassian incident · character-led opening

**Format:** 1920 × 1080 at 30 fps. The two hosts are original characters. Their exchange is dramatized editorial framing. The incident timeline, the distinction between app and site IDs, and the impact figures follow [Atlassian’s April 2022 review](https://www.atlassian.com/blog/how-we-build/post-incident-review-april-2022-outage).

**Open in Remotion Studio:** [Night desk](http://localhost:3012/E02HostOpening) or [Paper workbench](http://localhost:3012/E02HostPaper). Both use the same shots and timing. The right-hand Props panel exposes the palette, character designs, reaction insert, captions, and sound effects. The character swap previews the artwork. Speaker and voice assignments stay in the narration manifest. The existing portrait composition is still available as E02Short.

**Play the opening:** [Rendered landscape MP4](../composition/out/e02-host-opening.mp4). This is the first scene of the long episode, about 39 seconds. The prototype uses an amplitude-driven mouth cue, manual pose and eye cues, close-ups, editable icons, and original cue sounds. Fine phoneme timing, a recorded actor performance, detailed hand animation, and full-episode animation are future production work.

## The first scene

| Beat | Performance and cut | What it establishes |
|---|---|---|
| Relief | Arjun, played by Cartesia Akash, looks at a green console and lifts the mug. The first batch really worked. | A person believes he’s done. |
| Banter | Reverse shot. Maya, played by Cartesia Lauren, raises an eyebrow. Arjun says he was about to close his laptop. | The stakes start as an ordinary team moment. |
| Reversal | Cut to the second batch. Back to a close shot with a scope alert and 883 sites. The narration pauses before Maya asks whether they were removing an app. | The mistake is legible before the explanation. |
| Demonstration | A workbench insert puts an app ID through the tool. One card leaves and the site remains. On the same diagram, a site ID makes the surrounding site disappear. | A visible consequence connects the changed input to the outage. |
| Next question | Back to Arjun, then the first customer ticket at 07:46 UTC. | The next chapter starts with why a customer noticed before the job finished. |

The jokes are reactions to the familiar engineering assumption that a successful batch means the next one is safe. The voiceover and charts are original. The rig handles smiles, skepticism, shock, thinking, neutral expressions, and blinking. The [reference and production guide](../../../docs/playbook/07-character-led-incident-videos.md) has the eight episode samples, tool comparisons, asset sources, and a real India episode candidate.

## Plan the full landscape episode

Use the [existing sourced script](../script.md) for the factual spine. Rewrite its scene openings and transitions for the characters as below. The new opening ends on the first ticket. Use a rewind to examine the input lists and return to the ticket when the chronology reaches it. The timings here are editorial targets.

| Approx. time | Audience question | Scene to make |
|---|---|---|
| 00:00–00:40 | How did a green check turn into 883 deleted sites? | Use the rendered opening. |
| 00:40–01:50 | What exactly had they planned to remove? | Rewind at the desk. Show the original app tile nested inside the customer site. Give each of the two ID lists its own shape. |
| 01:50–03:00 | Why did the checks give the team confidence? | Maya marks off peer review, staging, and 30 sites. Turn over each card to reveal what it actually checked. End on the second list coming from a different source. |
| 03:00–04:15 | Who saw the outage first? | Replay 07:38 job starts, 07:46 customer ticket, 08:01 job ends, 08:17 response begins, and 08:53 link confirmed. Draw a short timeline. Leave space for a quiet customer reaction. |
| 04:15–05:25 | Why was reporting the incident hard? | A reconstructed support form asks for a cloud URL. Show the missing site record and the separate problem of finding its contacts. Give the customer impact a straight tone. |
| 05:25–06:50 | Why couldn't the team just restore the database? | Arjun lays out site identity, products, permissions, attachments, and third-party references. Give the replacement site a new ID. Let the old links hang disconnected. |
| 06:50–08:25 | What made the second restore faster? | Reuse the original identifier. Reconnect the links once the corresponding records are restored. Show restore lanes in parallel and keep a validation gate visible. |
| 08:25–09:15 | What happened to the customers? | Show the April 8 and April 18 milestones, distinguish 775 customers from 883 sites, and note that a subset waited up to 14 days. |
| 09:15–10:20 | What would stop this next time? | Replay the input through a clearly marked illustrative dry run that resolves the target type and stops the batch. Return to the laptop and mug after a recovery check. |

## Reproduce locally

From the repository root after installing workspace dependencies:

```powershell
node studio/tools/tts.mjs --episode episodes/E02-atlassian-site-deletion/host --voice cc71692b-f326-499b-8f8f-90a415b4d3fb
python episodes/E02-atlassian-site-deletion/host/prepare.py
npm run dev -w e02-composition -- --port=3012
npm run render:host -w e02-composition
```

The TTS command makes new Cartesia calls. Use the current WAV and run only the prepare and render steps when preserving a take. The [shot and voice manifest](narration/segments.json) holds the named beats, script, speaker, expression, gesture, and silence after each take. The generated voice and effect WAVs are local ignored artifacts. For selling or monetizing the finished episode, use a voice take with commercial rights. [Cartesia pricing](https://www.cartesia.ai/pricing) · [Cartesia terms](https://www.cartesia.ai/legal/terms)

For the next acting pass, record the opening at a desk with a real mug. Capture relief, the interrupted movement, and the pause before the technical question. Use the audio and the gesture timing with the rig. Compare this directly against the stock-voice version before producing ten minutes of animation.

