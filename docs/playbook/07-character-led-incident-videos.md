# Character-led incident videos

## Evidence from BugX and pouria

Eight uploads sampled on 11 November 2026. The findings come from muted playback at selected timestamps and visible chapters, plus earlier muted samples from the BugX backup episode. The displayed counts are rounded snapshots. The samples establish techniques. Comparing voice delivery, exact cut cadence and retention would take an audio and full timeline pass.

| Episode | Views | Observed scene or chapter | Production lesson |
|---|---:|---|---|
| [BugX, We Shut Down Staging](https://www.youtube.com/watch?v=uj_zaxk6DVQ&t=15s) | 33K | 00:15–00:17, a skeptical worker in a warehouse, then an in-scene teammate chat with avatar and time | Put the character in a place. Let a message change what they think. |
| [BugX, Our Backups Didn’t Work](https://www.youtube.com/watch?v=M5irmjTNhEo&t=45s) | 59K | 00:45–00:47, a panel adds a clue. 09:01, an operator in front of racks. 20:41, eliminated options are struck out. | Give a clue its own shot and leave an option board visible while its state changes. |
| [BugX, NEVER Restart This Server](https://www.youtube.com/watch?v=qsSSpg0KGsg&t=20s) | 600K | 00:20, a hostname and rule teaser. Then an operator at a desk with monitor and mug. Chapters reveal an undocumented service at 04:53 and answer the reboot rule at 12:35. | Give the viewer a concrete mystery early. Use later evidence to answer it. |
| [BugX, It’s 2 AM](https://www.youtube.com/watch?v=fqXa3mYbKX0&t=13s) | 92K | 00:13, a close-up of an exhausted operator in bed. The 07:33 chapter returns to bed. | Establish what the incident costs the character. Return to that situation after recovery. |
| [pouria, Kubernetes Crash Course](https://www.youtube.com/watch?v=J3VavGnt5Yg&t=22s) | 160K | Around 00:22–00:31, the rollout shows green test and production racks before the cluster turns red. | Animate a system changing state so the image answers a question the viewer has. |
| [pouria, He Hacked His Own Company](https://www.youtube.com/watch?v=FGz2yPTjrAY&t=18s) | 99K | 00:18, a weekly video call stages two faces, a schematic, a speaker highlight, pointer, and reaction. | Let characters share a screen, react to it, and hand off who explains. |
| [pouria, Friday Night Database Recovery](https://www.youtube.com/watch?v=LoZ2kpFnqB8&t=12s) | 709K | 00:12, a mock late-night call puts two avatars beside config. A message delivers a reversal. A tiny visual joke sits in the meeting URL. | Give the punch line a place in the scene. The on-screen message also advances the story. |
| [pouria, 3AM Observability](https://www.youtube.com/watch?v=AmHYfEW7CCg&t=10s) | 1M | 00:10, an exhausted operator with a phone in a textured bedroom. [01:39](https://www.youtube.com/watch?v=AmHYfEW7CCg&t=99s) switches to a wolf and forest map analogy. | Change the visual form when the idea changes. A quick analogy can earn the return to logs and traces. |

BugX’s [server restart description](https://www.youtube.com/watch?v=qsSSpg0KGsg) labels its stories as fictionalized. Treat the channel as a staging reference. Use a first-party incident review to decide what actually happened in our episode.

## Scene directions

Write an action for each shot before assigning a camera. In a wide room shot establish what the person is trying to finish. Use an insert when a phone, message, chart or ID gives them a clue. Hold on a reaction as they realize the consequence. Use a diagram only for the part that needs to be explained, then return to the person for the decision. At the end, pay off the opening prop, line or unfinished action.

Give each speaker a point of view. One can trust a green indicator, while the other asks what it actually measured. Choose a quiet look, change in eye line, raised brow, mug held halfway to the mouth, or interrupted hand movement before adding dialogue. Put jokes on automation and our own familiar engineering habits. Give customer impact and real people a straight treatment.

| Style | Use | Practical cost |
|---|---|---|
| Illustrated night shift | Main channel style. Warm lamp/monitor light, original cutout hosts, teal normal state and coral failure, contextual props. | Draw and reuse a desk, characters and reverse angle. Use an occasional close-up for a reaction. |
| Warm paper workbench | Explainer insert or lighter episode. Flat card shapes, ink lines, amber evidence marks. | Fast to build with diagrams. Needs a person or hands at key moments to keep the perspective. |
| Photo-textured documentary | Occasional original or licensed room plate with drawn figures and large clean overlays. | More time for art, asset provenance and lighting consistency. Test one shot before committing. |

The prototype includes the first two palettes and two original actors. Production target is 1920 × 1080, 30 fps. Keep camera moves tied to discoveries. Use a generous pause on an expression and a tighter cut for a sudden reversal. Give every technical object a distinct silhouette and a plain-language label. Hand draw or animate a few poses at a time for consistency.

Reusable art direction for an image or illustration tool:

> Original editorial illustration for an engineering incident documentary. Medium wide workplace composition with a natural seated pose, useful desk props, and a screen angled toward the character. Warm practical light and subtle cool fill. Layered flat shapes, legible eyes and brows, subtle texture, consistent outfit and proportions across angles. Leave space for editable text and technical graphics. Deliver a clean background plate and separate character and prop layers where possible. Use the supplied original character sheet and palette. Keep brand marks out of generated artwork so a verified asset can be added separately.

## Tools by job

| Job | Default or comparison | Practical test |
|---|---|---|
| Story structure | YouTube **Show transcript** or [NotebookLM](https://support.google.com/gemininotebook/answer/16215270) | For one public captioned URL, list hook, question, reveal, decision and callback. Keep notes and timestamps. A captions-only import carries no shot evidence. |
| Video reference | [Gemini video understanding](https://ai.google.dev/gemini-api/docs/video-understanding) and manual playback | Ask for what the character handles, what state changes, why the cut happens and whether sound was directly observed. Default visual sampling is 1 fps. Manually recheck fast gestures, cuts and holds. |
| Frame and cut audit | [PySceneDetect](https://www.scenedetect.com/docs/latest/cli.html) and [FFmpeg](https://ffmpeg.org/) | For local media you own or have permission to process, run the command below. Annotate state changes inside a shot by hand. A cut detector will not reliably find those. |
| Character acting | Editable cutout poses in Remotion, [Rhubarb](https://github.com/danielswolf/rhubarb-lip-sync) for mouth shapes, [Krita](https://docs.krita.org/en/user_manual/animation.html) for hand-drawn inserts | Run the same line through a mouth cue track and an actor performance. Keep eyes, brows, head, shoulders and hands on separate beats. For mesh posing, test [OpenToonz Plastic](https://opentoonz.readthedocs.io/en/latest/create_animations_using_plastic_tool.html). |
| Live manual performance | [Adobe Character Animator Starter](https://helpx.adobe.com/ca/adobe-character-animator/desktop/introduction/starter-mode.html), then [Pro recording tools](https://helpx.adobe.com/adobe-character-animator/desktop/recording-and-playback/record-and-playback.html) if already included | Record the same exchange with webcam/voice and a Starter puppet. If Pro is included, bring original layered art and capture a brows/head take, then adjust mouth and gestures. A second option is manual keyframes and voice recorded on a phone. |
| Puppet tooling | Remotion plus cutouts first. [Duik](https://github.com/RxLaboratory/Duik) if After Effects is already owned. [Rive](https://rive.app/pricing) for reusable browser rigs. | Duik is an open-source rigging tool with an After Effects host requirement. Rive’s free exports include a splash screen according to its pricing page. Compare only when a manual rig is taking too long. |
| Incident art and sound | [Lucide](https://lucide.dev/license) for generic icons, [Simple Icons](https://github.com/simple-icons/simple-icons/blob/develop/DISCLAIMER.md) for checking brand assets, [YouTube Audio Library](https://support.google.com/youtube/answer/3376882) for sound | Log source and usage terms per asset. Use actual product icons where a service matters to the explanation. Use original reactions and meme-like captions. The prototype uses original diagram icons and synthesized cue sounds. |
| Voice | Current cut uses Akash and Lauren. Next compare [Cartesia Indian English voices](https://www.cartesia.ai/voices/indian-accent), including Aarav and Priya, with a real take | Read the same dry joke, anxious clue and quiet recovery line. Compare the pauses and intent by ear. [Sonic 3.6](https://docs.cartesia.ai/build-with-cartesia/tts-models/latest.md) documents Romanized Hindi. Test a separately rewritten Hinglish script. [Indic Parler](https://huggingface.co/ai4bharat/indic-parler-tts) is another audition candidate with gated weights. |
| Motion and assembly | [Remotion Studio](https://www.remotion.dev/docs/props-resolution) for exact technical moves and variant previews, existing Premiere or another available editor for performance and sound | Keep selected voice takes, mouth cues, reaction takes, and incident timeline editable. Make the 16:9 episode first. Choose meaningful cutdowns after the full arc works. |

Local examples, for files that can be processed with permission:

```powershell
scenedetect -i "reference.mp4" detect-adaptive list-scenes save-images
rhubarb -f json -d dialogue.txt -o mouth.json take.wav
```

Record each reference as `video | in/out | narrator goal | object/character | visible state change | sound observed | original adaptation`. Prompt Gemini to leave unavailable fields blank. For full-quality production, do one selective pass for the opening, reveal and fix, then a normal-speed playback with headphones. Count changed visual states separately from hard cuts. Compare retention after publication in your own [YouTube retention report](https://support.google.com/youtube/answer/9314415).

## India episode direction

**The Login Warning That Jammed Zerodha** is a candidate for the next full episode. Zerodha’s December 4, 2023 RCA says a weekend geolocation data update led to an increase in unfamiliar-login alerts and that the resulting password reset activity may have strained login. Fresh resets were temporarily suspended and the login issue lasted 09:18–09:55 IST. The Marketwatch issue was separately reported. An operator sees a familiar device associated with a new map location, then watches a reset queue grow. These are possible illustrations. The company did not publish a recording of its response. [Zerodha bulletin](https://zerodha.com/marketintel/bulletin/365764/update-on-the-issue-with-login-and-marketwatch-on-kite-on-december-4-2023) · [RCA](https://zerodha.com/z-connect/wp-content/uploads/2023/12/Reporting-Format-4th-December-2023-RCA.pdf)

A second Indian candidate is Zerodha’s August 29, 2019 incident, when a single order for ten lakh shares was filled across more than one lakh trades and affected its order management system. The count and distinction between shares and trades would drive the visual reveal. [Zerodha postmortem](https://zerodha.com/z-connect/general/post-mortem-of-technical-issue-august-29-2019)

For a regional edition, use local incident sources, time, units, and a natural speaker. Localize the metaphor and room props when they support the event. A team's habit or a confusing button can be the joke. Pronunciation and identity stay part of the performance.
