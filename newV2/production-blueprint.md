# The production blueprint: creating videos at BugX / Pouria quality

Research-backed workflow • November 2026 • Designed for one creator, with paid tools, open-source software, AI assistance, and manual production

## My recommendation

Stop trying to generate the entire video with one AI model or one Codex/Remotion prompt. Build a small animation studio instead.

I recommend a hybrid 2D animation + programmatic software-screen + professional editing workflow. It is the most dependable way to pursue the level of consistency you want.

The crucial difference is that we will produce the characters, technical interfaces, narration, and camera movement separately, then combine them into one convincing story.

Original engineering incident story

Research, script, characters, dialogue and shot-by-shot storyboard

Character animation

Reusable 2D rigs, expressions, body movement, lip sync

Technical visuals

Real text, terminals, IDEs, alerts, charts and system diagrams

Audio production

Consistent voices, precise timestamps, music and effects

Film direction

Compositing, camera shots, transitions, timing and editing

Final 1920 × 1080 YouTube episode

One coherent animated engineering story, reviewed shot by shot

### Three approaches I evaluated

| Approach                    | Strength                                                            | Main limitation                                                                    | My assessment              |
| --------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------- |
| Pure AI video generation    | Rapid cinematic shots and expressions                               | Hard to maintain precise UI, typography, characters, and timing across long videos | Experimental               |
| 100% Remotion and AI coding | Sharp technical visuals and reproducible renders                    | Custom character acting requires a substantial animation system                    | Keep for technical screens |
| Hybrid animation studio     | Full control over characters, voices, terminals, scenes, and timing | Requires learning animation tools and manual editing                               | Best for your goal         |

This isn't only a theoretical distinction. Experienced motion designers describe creating character-animation shots separately, compositing them with graphics, and finishing the story in a nonlinear video editor rather than building one enormous composition.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://community.adobe.com\&sz=32)

Community+1



I also found a particularly useful new development in Chinese open-source AI: Wan2.2 Animate can transfer movement and expressions from a reference performance to a character image. It makes AI-assisted acting worth testing, but it doesn't replace the need for controlled character assets and readable software interfaces.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub+1



## 2. The exact tools I would use

I would use this as the main production stack. We don't need every AI platform on the market.

| Production layer             | Recommended tool                                    | Why                                                            |
| ---------------------------- | --------------------------------------------------- | -------------------------------------------------------------- |
| Research and script          | ChatGPT / Claude + original engineering postmortems | Research, storytelling, dialogue, technical review             |
| Art and backgrounds          | Figma or Inkscape                                   | Consistent layered artwork and reusable designs                |
| Character animation          | Moho Pro                                            | Reusable character rigs, poses, gestures, expressions          |
| Easier character alternative | Cartoon Animator 5                                  | Faster puppet animation and built-in lip sync                  |
| Narration and dialogue       | ElevenLabs                                          | Consistent voices and expressive delivery                      |
| Real technical interfaces    | React, Shiki, Playwright, asciinema                 | Accurate, readable screens and text                            |
| Automated screen animation   | Remotion                                            | Word-synchronized terminal, IDE, graph, and diagram animations |
| AI-assisted character motion | ComfyUI + Wan2.2 Animate                            | Optional motion transfer for difficult actions                 |
| Final edit and audio         | DaVinci Resolve                                     | Pacing, transitions, audio mix, final export                   |

Moho has professional rigging, inverse kinematics, layer deformation, and animation tools. Cartoon Animator has talking-head animation, lip sync, motion controls, and transparent export options. Both are much more appropriate for controlled recurring characters than repeatedly prompting a video generator.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://moho.lostmarble.com\&sz=32)

Professional 2D Animation+2



One important choice: start with Moho if you're willing to learn a proper character-animation tool. If you're on Windows and prefer speed over fine-grained control, trial Cartoon Animator 5 first. Don't purchase both.

## 3. The workflow, from reference videos to finished episode

1. Build a reference-analysis library

   Before writing the first new episode, obtain locally saved copies or short excerpts of the reference videos where permitted. You offered to supply them, and I think that is worth doing.

   The first batch should contain the three most representative videos from each channel—not necessarily all ten.

   Use FFmpeg and [PySceneDetect](https://github.com/Breakthrough/PySceneDetect?utm_source=chatgpt.com) to extract shot changes and reference frames. Use WhisperX or another speech aligner to study spoken timing. PySceneDetect explicitly supports scene detection, scene lists, and image extraction.&#x20;

   [image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

   GitHub+1

   For example, after saving a reference locally:

   ```
   pip install scenedetect
   scenedetect -i reference.mp4 detect-adaptive list-scenes save-images
   ```

   Then manually classify samples by character appearance, environment, UI style, animation, camera movement, narration, music, and transitions.

   Deliverable: `style-bible.md`, annotated shot references, and a list of reusable scene types.

2. Design the reusable characters and environments

   This is the biggest upfront investment.

   Instead of generating new characters in every episode, create a small original cast of engineers, colleagues, managers, and incident responders. Give each character consistent clothing, proportions, facial features, and recognizable expressions.

   Start with two characters, two camera angles, several expressions, a mouth-shape set, and actions such as typing, standing, pointing, looking concerned, talking, and checking a phone.

   Draw them in layers in Figma, Inkscape, or another vector editor. Rig them in Moho, then save reusable animations. Design the office, desk, meeting room, server rack, and night-time incident environment as reusable layered sets.

   AI image generation can help create concept art and background ideas, but the final reusable artwork should be consistent and editable.

   Deliverable: one approved character pack, animation presets, and reusable backgrounds.

3. Write the engineering story before generating visuals

   Select a real postmortem or clearly label the story as fictional. Build an original screenplay with technical stakes.

   A useful 12-minute structure is a 30–45-second cold open, the system background, initial investigation, misleading clues, escalating incident, root-cause discovery, recovery, and a short engineering lesson.

   AI should draft and challenge the script. A human should verify the infrastructure claims, commands, logs, and sequence of events. For a true incident, link the original postmortem and documentation in the video description.

   Every paragraph should become one or more planned shots. That prevents an AI agent from inventing unrelated graphics just to fill screen time.

   Deliverable: approved narration, character dialogue, technical facts, and shot list.

4. Generate the final voice before detailed animation

   This reverses a common mistake in automated video pipelines: rendering the scene and then forcing the narration to fit.

   Use one approved narrator voice for the entire channel. ElevenLabs v4 is worth testing because it supports delivery and emotion controls, as well as dialogue generation. Its forced-alignment API can provide word timings for an audio file and transcript.&#x20;

   [image](https://www.google.com/s2/favicons?domain=https://elevenlabs.io\&sz=32)

   ElevenLabs Documentation+1

   Generate narration in short sections. Listen and redo the sentences that sound unnatural. Check pronunciation of words like `kubectl`, `etcd`, PostgreSQL, Kubernetes, and product names.

   Once the audio is approved, align it to the transcript. Character dialogue can additionally feed Moho's lip-sync tools or [Rhubarb Lip Sync](https://github.com/danielswolf/rhubarb-lip-sync?utm_source=chatgpt.com), which outputs mouth-shape timing data.&#x20;

   [image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

   GitHub

   Remember that narration alignment and lip sync are different: narration controls visual events and cuts; visible dialogue controls mouth movement.

   Deliverable: locked audio, corrected transcript, word timestamps, and mouth cues where needed.

5. Construct technical screens separately

   This is where your old Remotion work remains valuable.

   Render terminal commands, source files, browser consoles, incident dashboards, and diagrams as actual text and graphics—not images generated by a diffusion model.

   For genuine terminal demonstrations, record commands with [asciinema](https://github.com/asciinema/asciinema?utm_source=chatgpt.com). For web dashboards, use Playwright to capture controlled screenshots. For cinematic close-ups and zooms, rebuild selected screens as React components with readable fonts.&#x20;

   [image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

   GitHub+1

   Every terminal command should have meaningful output. Every dashboard spike should match the incident being narrated. A screenshot should be cropped or enlarged until the relevant information is actually readable on a phone and desktop.

   Deliverable: reusable terminal, IDE, browser, dashboard, alert and diagram components.

6. Animate and composite individual shots

   Animate the character actions in Moho and export transparent footage or image sequences. Use Remotion to control screen overlays, highlights, diagrams, and precisely timed graphics.

   Combine them with backgrounds and camera movement. A typical shot could contain a character in the foreground, a monitor with an animated terminal, and a subtle camera push toward a line of failed output.

   You can use AI-generated motion for individual difficult shots, but review the face, hands, clothing, and background between frames. The UI should remain a separate sharp layer.

   Remotion can export transparent video for external compositing, including ProRes 4444 when the workflow supports it.&#x20;

   [image](https://www.google.com/s2/favicons?domain=https://www.remotion.dev\&sz=32)

   Remotion

   Deliverable: short finished shots with approved visuals and timing.

7. Finish the video in DaVinci Resolve

   Assemble the shots, trim pauses, add sound design, mix the dialogue and music, correct transitions, and render the final master.

   Run a final review for flickering characters, unreadable terminals, broken cuts, mispronounced terms, inaccurate technical claims, unexpected silent sections, and badly synchronized actions.

   Use 1920 × 1080 at 30 fps as the initial master specification. Upgrade to a higher-resolution workflow if your computer and assets support it and it improves the result.

   Deliverable: mastered MP4, captions, thumbnail, source project, and review notes.

## 4. The open-source projects worth testing

I found several relevant repositories. I would not combine them blindly; each solves a particular production problem.

[Wan2.2 Animate ComfyUI Workflow | ComfyUI Wiki](https://images.openai.com/static-rsc-4/63_jIPtovzHMxd2jSC_GlKojb5WJTAUm0ylpzHSyT7X4E142WlFlHQwRbVNhCf7wfSPmEr27YNkbhjf751aVHZecL4bPdlLLpqNOckwQc5YDgFKcchGqu2KTBXd_WsuWLwwDSacs4qTh84m02wmdoSx2ObYQvTkQTfVXp8TymXw?purpose=inline)

[Wan2.2 + Wan2.2 Animate](https://github.com/Wan-Video/Wan2.2?utm_source=chatgpt.com)

Alibaba's open video models, including character animation and motion-transfer options. Good for experiments with acting, gestures, and cinematic cutaways; more difficult for precision-sensitive screens. Wan2.2 provides publicly available code and model weights under Apache 2.0.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub



[【日本語 口パク対応】1枚の画像と音声だけで"喋る全身演技付きリップシンク動画"が作れる！LTX-2 SI2V 神ワークフロー配布｜ComfyUI｜ハカセ アイ (Ai-Hakase)🐱YouTube × 記事でトレンドAIを解説する為のnote🐾](https://images.openai.com/static-rsc-4/SsvOmW8S74CEgxMXj6n42xmEl5EvKd-dNPBvU9Sh5CvnFE3aa7PoOLe4vraxRyI7n9VCBuQ4krRboA77Lz0uYToCRTH23NFTP84EN7ZwJV6SxED2pwi2uMe3axzP1DciwAFQFz2MHmaEj9JU-rVpBp-xiVu5r6bYYttJACzHjX4?purpose=inline)

[ComfyUI](https://github.com/Comfy-Org/ComfyUI?utm_source=chatgpt.com)

Visual workflow orchestration for image and video models. Its Wan2.2 Animate template supports character replacement and motion transferred from an input performance. Useful when testing yourself acting out an engineering scene and transferring the motion to a character.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub



[Qwen3-TTS をローカルPCにインストールする | iPentec](https://images.openai.com/static-rsc-4/IcZFRR7hU_Yu4yVMhvDz90tNyxGX9uMTAVbM5OQdVm1lrHXIuMiCi2k1NcQ1OvDLSyRtJj-p6Lmr0zXpW9GjhwKsUAYTIw39CGR8sNCXw1T55yVJF2pXHzv1wXw9R2BzPr19_Ex-iBkKDNWRcX9LOujxOCjrK_yxQTrVyavwFg8?purpose=inline)

[Qwen3-TTS](https://github.com/QwenLM/Qwen3-TTS?utm_source=chatgpt.com) and [CosyVoice 3](https://github.com/QwenAudio/CosyVoice?utm_source=chatgpt.com)

Chinese-developed, open-source speech generation alternatives worth testing against ElevenLabs. Qwen3-TTS supports voice design and instructions for style and expression; CosyVoice 3 also offers speech-style controls. Both still need listening tests for natural English engineering narration.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://qwen.ai\&sz=32)

qwen.ai+1



[RemotionのレンダリングをReact視点で理解する](https://images.openai.com/static-rsc-4/qnoh9-iYYeOucr-peCsgSRBoE-mQeaPnH_xj1pP7KeQltpTLoZsZZ0Y9gFhGjNOVUbwHheAjns1qWVmaQDCDlFKbzieT7PlE2d-raZFxMmtbIG_u4fS_7hzVRRyNtrtXATahM7mhr8BTDoRLv4k2dQFiOGlRiII4Kz9bO1621Ns?purpose=inline)

[claude-youtube-editor](https://github.com/hassancs91/claude-youtube-editor?utm_source=chatgpt.com)

Particularly relevant to your existing work. Its approach constructs simulated screencasts as Remotion TSX components and synchronizes visual reveals to word timestamps. Borrow the design ideas for software screens, not its entire talking-head editing workflow.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub



[Estudiando Blender: Rhubarb lipsync (sincronización labial)](https://images.openai.com/static-rsc-4/gLxFAz29bwEr7aDsXagWMeiB7LlWFYLwMLJWURgYi_ED19Ymf2rbAFCgnR98uQBwieOB17Lm21tqhszRLnYOT7r-UI39wzGve2LBlfkLCnsNJvpMParpCYVVENMPxapd7_Ko62J-cBVtMje425ZXuUuY33WA2almOgKm6MKSwyU?purpose=inline)

[Rhubarb Lip Sync](https://github.com/danielswolf/rhubarb-lip-sync?utm_source=chatgpt.com) and [story-animator](https://github.com/deenukhan/story-animator?utm_source=chatgpt.com)

Rhubarb provides timed mouth poses; story-animator is a useful lightweight example of coordinating a Remotion-based narrated animation with a visual QA process. Neither replaces a complete professionally designed cast.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub+1



I would initially test only Wan2.2 Animate, Qwen3-TTS, and the screencast techniques from claude-youtube-editor. The remaining tools are fallback options. More dependencies won't automatically mean better videos.

## 5. The new repository should be an animation production system

Your new repository should organize assets by their role and scenes by their timing, rather than simply contain one large Remotion composition.

```
engineering-video-studio/
├── references/
│   ├── style-bible.md
│   └── shot-analysis/
├── design-system/
│   ├── colors.json
│   ├── typography.json
│   ├── character-rules.md
│   └── animation-rules.md
├── assets/
│   ├── characters/
│   ├── environments/
│   ├── props/
│   ├── icons/
│   └── sound/
├── src/
│   ├── remotion/
│   ├── screens/
│   │   ├── Terminal.tsx
│   │   ├── CodeEditor.tsx
│   │   ├── Dashboard.tsx
│   │   └── IncidentAlert.tsx
│   ├── animations/
│   └── timeline/
├── episodes/
│   └── ep001/
│       ├── research.md
│       ├── script.md
│       ├── storyboard.md
│       ├── shots.json
│       ├── audio/
│       ├── scenes/
│       └── output/
├── tools/
│   ├── extract-reference-frames/
│   ├── align-audio/
│   └── quality-check/
└── README.md
```

Keep downloaded reference videos out of the public repository. Keep your original licensed assets and render projects under version control or a separate asset store, using Git LFS where appropriate.

### Make the shot timeline the source of truth

Instead of asking Codex to invent the animation while rendering, feed it a reviewed scene specification.

For example:

```
{
  "shot_id": "S014",
  "scene_type": "terminal",
  "start_seconds": 82.5,
  "duration_seconds": 7.2,
  "audio_file": "narration_014.wav",
  "technical_asset": "postgres-error-log",
  "camera": "slow_push_in",
  "events": [
    {
      "at_seconds": 1.2,
      "action": "highlight_line",
      "target": "disk_full_error"
    },
    {
      "at_seconds": 4.1,
      "action": "show_incident_alert"
    }
  ]
}
```

This is the critical architectural improvement.

AI writes and helps implement individual components. You approve the story, assets, shots, and timings. The renderer executes that approved plan.

That should be far more predictable than producing the entire episode from a single high-level prompt.

## 6. The first experiment I would actually run

Do not begin with a 20-minute video.

Produce a polished 90-second incident sequence with an original fictional story, such as a deployment that appears successful but is followed by authentication failures.

Pilot sequence

Shot 1 — The alert

0:00–0:15

A recurring engineer character receives an overnight production alert. Show a readable alert message, a believable reaction, and a controlled camera move.

Shot 2 — The investigation

0:15–0:40

Transition to an accurate terminal and error dashboard. Highlight the exact evidence being explained by the narrator.

Shot 3 — The discovery

0:40–1:10

Return to the engineer, include a short line of dialogue with matching mouth movement, then transition to a diagram explaining the failure.

Shot 4 — Recovery

1:10–1:30

Show the corrective action and dashboard recovery, followed by a short narrative payoff.

This pilot deliberately tests all the difficult components together: character consistency, voice, lip sync, terminal clarity, engineering accuracy, camera movement, and visual transitions.

If it doesn't look good, improve the relevant asset or system rather than render another 15 minutes.

### How we decide whether the pilot succeeds

The pilot should pass four practical tests.

- The same character looks recognizably identical across angles, expressions, and actions.
- Every important technical line can be read at normal playback speed on a 1080p video.
- Character dialogue and major on-screen events follow the approved audio timing, with no visibly distracting delay.
- The story makes sense without reading subtitles, and the visuals make the technical cause easier to understand.

Only when those pass should the production expand to a complete episode.

## 7. Budget and production time

Indicative software budget

| Moho Pro                              | $399.99 one-time         |
| ------------------------------------- | ------------------------ |
| Cartoon Animator 5, alternative       | $149 listed full license |
| ElevenLabs Creator                    | $22/month regular price  |
| Remotion, individual eligible license | Free                     |
| DaVinci Resolve                       | Free version available   |

Listed prices are from current vendor pages, before applicable taxes and usage-based costs. They may change.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://moho.lostmarble.com\&sz=32)

moho.lostmarble.com+4

Additional costs may include fonts, sound libraries, licensed music, an illustrator to make the original character pack, and cloud GPU time for open-source video generation.

For scheduling, I would treat the first character and scene library as an upfront project of roughly two to four weeks for a beginner working seriously. Once the library is usable, a carefully scoped 8–12-minute episode may fit into one full working week. A custom, highly animated 20–25-minute episode could still take multiple weeks.

The biggest variable is not AI inference speed. It is how many new character actions, sets, technical visualizations, and scene changes each story requires.

## 8. A small but important boundary around replication

You can closely study and reproduce the production techniques: incident-driven story structure, shot composition, readable engineering interfaces, camera rhythm, visual density, and the qualities of narration.

For a sustainable channel, the characters, artwork, branding, spoken performance, and story should be your own or properly licensed. In particular, I would choose or design a narrator with similar general delivery qualities rather than clone either creator's identifiable voice without permission.

YouTube's current policies address unauthorized creator impersonation and expect monetized channels to provide original, substantive content rather than minimally changed copies.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://support.google.com\&sz=32)

YouTube Help+1



This doesn't prevent achieving the experience you are seeking. It means using their production grammar to establish your own repeatable identity.

## 9. What remains before this becomes a pixel-specific implementation

One limitation remains from my research: I could verify the channel videos and their content, examine available repository source, and investigate the production tools, but I could not directly play their full YouTube videos frame by frame in this environment. So I cannot yet claim to have identified the exact character proportions, line thickness, shading treatment, scene composition, or voice pacing of those reference videos.

That is why your offer to provide the locally saved videos is especially useful.

The next concrete input should be two to four reference clips, preferably at 1080p, including character scenes, technical screens, dialogue, and transitions. From those, we can establish the actual visual style bible, a character asset specification, reusable shot templates, and a measurable quality target.

Until then, I would commit to this architecture:

Moho for reusable character animation + ElevenLabs for approved narration + Remotion for crisp technical screens + DaVinci Resolve for the finished film, with ComfyUI and Wan2.2 Animate available only when a particular shot benefits from generative motion.

That is the production route I would choose for your new repository, rather than another attempt to make Codex or Qwen generate the entire video unaided.