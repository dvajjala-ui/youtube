# 08 — Codex + Remotion Engineering Blueprint
**Goal:** Build a maintainable **local production tool**, not a one-button viral video generator.

## Setup on Windows
1. Install a current supported **Node.js LTS**, Git, VS Code, and FFmpeg; verify versions.
2. Open a new clean folder, `animated-tech-studio/`, in VS Code.
3. Use **Codex IDE or CLI** signed in with ChatGPT (subscription limits apply; API use is separate).
4. Follow the current [Remotion create-project instructions](https://www.remotion.dev/docs/). The docs currently show:
   ```bash
   npx create-video@latest --yes --blank my-video
   cd my-video
   npx remotion skills add
   npm run dev
   ```
5. Commit a working blank project **before** adding scenes. Render a 5-second test MP4.
6. Copy this kit's `AGENTS.md` to repository root and open `13_PROMPT_LIBRARY.md`.

## Minimum application folders
```text
src/
  Root.tsx                      # Register video compositions
  components/{ServiceNode,Packet,Terminal,Database,Timeline,Callout}.tsx
  scenes/{ColdOpen,Diagram,Failure,Investigation,Fix,EndCard}.tsx
  themes/designTokens.ts
  data/{episodeSchema.ts,exampleEpisode.ts}
  audio/{voiceCueMap.ts}
public/
  audio/  images/  fonts/      # Licensed/source-controlled media only
scripts/
  validateEpisode.ts
  renderChapters.ts
  generateShotlist.ts
```

## Data contract
Every scene receives: `id, type, startFrame, durationFrames, narrationCueIds[], visualText[], props, sourceClaimIds[]`. Never guess duration from text alone; derive frames from locked audio timings.

## MVP acceptance tests
- `npm run dev` opens a preview; at least 3 scene types exist.
- `render` creates 1920×1080/30fps sample with **narration synchronized**, not placeholder TTS.
- All scenes are deterministic; no unexplained animations or offscreen text.
- A 60-second vertical slice includes cold open, diagram, incident transition, captions.
- Invalid `scene_plan.json` or missing audio triggers a readable error **before** rendering.
- Repeat render with same assets produces the same intended result.
- No trademark artwork or copied source video is baked into assets.

## Task order for Codex (small, verifiable batches)
1. Scaffold and single 5-second render.
2. Build core theme and typography.
3. Build `ServiceNode`, `Packet`, `Database` with unit/example scenes.
4. Read the pilot JSON; implement runtime validation.
5. Import timed WAV; create beat synchronization.
6. Render 60-second proof with no external paid API.
7. Review human feedback; improve components and render speed.
8. Add remaining scenes in 60–90 sec chapter groups, not all at once.
9. Export chapter MP4s and a human-readable cut sheet for Premiere.

## Do NOT ask Codex to
- Auto-copy/analyze restricted video frames or lift somebody's visual assets.
- Invent sources, real incidents, license claims or production-quality audio automatically.
- Commit API keys or `.env` values to Git.
- Call paid APIs before you approve a budget and provider/license.
- Open YouTube Studio and publish on its own.

## Resource considerations
- Local FFmpeg renders can be CPU/RAM intensive. Begin at 1080p/30fps and short chapters; scale after measuring your machine.
- Prefer pre-rendering complex blur/glow or caching sequences when build times become high.
- Editing remains in Premiere even if Codex produces a full render; do not make a single rendering pipeline the only copy.
