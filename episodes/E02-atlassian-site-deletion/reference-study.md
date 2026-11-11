# BugX and pouria reference study

Observed on 11 November 2026. The [BugX Videos tab](https://www.youtube.com/@bugx/videos) showed 10K subscribers and 193 videos. The first four uploads were:

| Public video | Runtime on the supplied screenshot | Views on the live listing | Story promise from the title |
|---|---:|---:|---|
| [We Shut Down Staging...And Production Went With It](https://www.youtube.com/watch?v=uj_zaxk6DVQ) | 19:51 | 32K | A routine environment change has an unexpected dependency. |
| [Our Backups Didn't Work When We Needed Them Most](https://www.youtube.com/watch?v=M5irmjTNhEo) | 24:20 | 59K | A safeguard fails at the moment it matters. |
| [We Had One Rule...NEVER Restart This Server](https://www.youtube.com/watch?v=qsSSpg0KGsg) | 17:42 | 593K | A team warning conceals a fragile system. |
| [It's 2 AM...Production is Down](https://www.youtube.com/watch?v=fqXa3mYbKX0) | 8:34 | 91K | An on-call alert opens an investigation. |

Views are a snapshot. The four titles share a failed assumption, a visible consequence and an implied investigation. The listing provides no retention or revenue figures. Shared genre conventions are observable. A production relationship or copying between creators is unverified.

The attached screenshot also contains a dark post-incident checklist. Direct playback sampling confirmed three distinct visual roles in the BugX backup episode:

| Timestamp | Observed | Technique to apply |
|---|---|---|
| 00:45–00:47 | Dark status panel adds a new row about database changes as the explanation progresses. | Build an evidence panel that grows one row per spoken clue. |
| 09:01 | Illustrated person in front of server racks during a recovery decision. | Use an original operator illustration between technical diagrams to give the decision a human viewpoint. |
| 20:41 | A numbered list shows possible recovery routes. Eliminated options are dimmed and struck through. | Keep the same list visible and animate its state as the narration rules options out. |

These are three short, muted samples from one video plus the screenshot. The voice, edit density and scene transitions across all four still require a full audit. The prior [pouria reference study](../../docs/13-reference-channel-teardown-verified.md) records public metadata and a separate set of references.

## Low-cost reference workflow

1. Pick the four public watch links above. Review the first minute, the first systems explanation, the root-cause reveal and the recovery. Write down time ranges and what moves. A five-minute selective pass per video is enough to start. Sample more around a cut or animation you want to understand.
2. Use [YouTube Show transcript](https://support.google.com/youtube/answer/15930243) for captions. Use [NotebookLM or Gemini Notebook source import](https://support.google.com/gemininotebook/answer/16215270) to map the narration and verify what it says. Its YouTube imports contain the transcript. A recent upload may take time before import works.
3. Use [Gemini video understanding](https://ai.google.dev/gemini-api/docs/video-understanding) with individual public YouTube URLs for a second pass on the audio and visuals. The URL feature is documented as a preview at no charge, subject to limits. Default visual sampling is one frame per second, so check short transitions in the player. A public URL suffices. For video you own or have permission to analyze as a file, FFmpeg can extract stills and PySceneDetect can flag cuts. The latter can miss object animation inside a continuous shot.
4. Rebuild the techniques as editable panels, diagrams, illustrations and camera moves in Remotion. Use your own layouts, type, palette, copy and voice. Keep study notes and timestamps for each technique.
5. For publication, create your own captions from the timed narration. Google’s reference transcript is only for studying structure.

### Prompt for Gemini video analysis

```text
Analyze the public YouTube video as a reference for an original software incident documentary. Start with 00:00–01:00, the first architecture explanation, the moment the root cause is named, and the section where the team tests or compares recovery options.

Return rows with start and end timestamps, story purpose, visible elements, change or camera move, narration function, sound cue if directly observable, and a one-sentence transferable technique. Label uncertain timings and claims. If you only have captions, mark visual and sound fields unavailable. Avoid quoting the script or guessing the software or voice provider.

Finally, suggest original shots for an Atlassian outage video about a cleanup script that received site IDs instead of app IDs. Use distinct characters, layouts, wording and branding.
```

For a local file you own or have permission to process, extract contact-sheet inputs at two-second intervals. The percent pattern is for an interactive PowerShell command.

```powershell
New-Item -ItemType Directory -Force -Path frames | Out-Null
ffmpeg -i reference.mp4 -vf "fps=1/2,scale=480:-1" frames/frame-%04d.png
```

Record timestamps in the format `video | time in/out | what changes visually | purpose | original adaptation`. Save the audit with the episode instead of relying on the generator to remember the reference.
