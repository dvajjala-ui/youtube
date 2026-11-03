# 19 — Codex Build Instructions: One Reliable 60-Second Scene Pipeline

## Start prompt for Codex (paste as one instruction in a local repo)
> You are a senior motion-graphics engineer working in Remotion with React/TypeScript. Read `AGENTS.md`, `16_HOW_LIVE_TECH_EXPLANATIONS_ARE_ANIMATED.md`, `18_60_SECOND_PILOT_LIVE_STORYBOARD.md`, and `pilot/timecoded_scene_plan.json`. Build a self-contained local 1920x1080 @30fps original animation of the "last item sold twice" hypothetical. No copyrighted reference art or reused dialogue. No paid API or secret use. First deliver the 0–20-second proof with two request packets, two API reads, and on-screen stock=1; verify frame rendering; then implement remaining scenes. Split visual units into reusable components, separate text/data from animation code, expose a single scene timing config, and create a `README_LOCAL_RENDER.md` with Windows commands. Do not claim you have reviewed the YouTube reference audio. Export separate quiet/no-voice scene MP4s plus a full rough cut; support importing `voice.wav` later. Keep source accurate and error states visible without relying only on color.

## Repo structure to produce
```
/src
  /components   # HumanFigure, Packet, ApiNode, DbRow, SqlStatement, StatusBadge, PathLine
  /scenes       # 01_Inventory.tsx ... 08_Resolution.tsx
  /data         # sceneData.ts, timeMap.ts, colors.ts
  Root.tsx
/public
  /audio        # voice.wav, music.wav, effects/*.wav (user-supplied or generated with rights)
  /assets       # originals only
/quality
  visual-qa.md
  narration-qa.md
/renders        # rendered preview assets (gitignored)
```

## Implementation constraints
- Prefer `useCurrentFrame`, `interpolate`, `spring`, `Sequence` and SVG/HTML layers, not prerecorded AI text-video.
- Use absolute seconds in scene data, then FPS-derived frames so timing remains clear.
- Don't wire paid service keys into browser JavaScript; voice generation belongs in a local/server tool with environment variables.
- Avoid API calls during the Remotion render. Rendering should be **deterministic and repeatable offline** after asset download.
- Use one canonical master narration WAV. Audio QA determines final timecodes; never force a draft 60-second runtime at the expense of natural delivery.
- Document exact Node, Remotion and FFmpeg versions after installation. Lock dependencies.

## QA gates
- Render frame 0, 180, 360, 600, 900, 1200, 1500 and final frame to contact sheet; check clipping, font legibility, artifacting, text timing.
- Run a simulated visual check at 30fps; diagram must reflect the intended race. Second attempt must fail after the atomic update.
- Verify no mismatches between `voice.wav` speech and visible statements.
- Confirm no copyrighted sample graphics, no unlicensed audio, no creator voice imitation.

## Sources / docs
- https://www.remotion.dev/docs/ ; https://www.remotion.dev/docs/media/audio
- https://www.remotion.dev/docs/captions ; https://www.remotion.dev/docs/api
- https://helpx.adobe.com/premiere/desktop/edit-projects/edit-video-using-text-based-editing/overview-of-text-based-editing.html
