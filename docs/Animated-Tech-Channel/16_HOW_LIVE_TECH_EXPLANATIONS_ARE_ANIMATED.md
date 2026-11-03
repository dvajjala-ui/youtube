# 16 — How to Build the 'Live Explanation' Effect

**Key distinction:** The references *appear* to teach in motion. This need not be a real-time AI rendering. In a reproducible production pipeline, diagrams are precomposed and synchronized to narration, so every narrated causal step becomes a visible state change.

## The core principle: animate a claim, not a wallpaper
For every statement, ask: **What changes because of this?** If the line says 'The request reaches both servers', show **one packet split into two paths**, with the previous path staying visible. If it says 'Only one unit remains', show the inventory counter `1`, *not* generic server footage.

## Six shot families for 80% of technical incidents
1. **Human stakes:** engineer at desk, phone/Slack alert, customers waiting. Few pieces, subtle parallax; avoid complex talking faces.
2. **Architecture:** reusable service/node cards, connectors, containers, arrows, packets. Reveal one node at a time.
3. **Live operation:** terminal, pseudo-logs, dashboards, SQL snippets, configuration diffs. Use real editable vector/text layers, not AI video text.
4. **Causal failure:** one action triggers a chain; animate the flow and highlight the exact failure boundary.
5. **Evidence:** pull a time stamp/log line/request ID into the center; dim irrelevant signals; zoom to root-cause detail.
6. **Resolution:** repeat the same original request after the fix and show a contrasting result. Before/after comprehension is the payoff.

## Reusable visual grammar
- **Base:** dark near-black/navy canvas; labels legible at mobile size; one highlighted focal point.
- **Status colors:** teal = successful; amber = uncertainty; coral/red = failure; gray = background. Color is never the sole status cue (add icons/text).
- **Motion:** 300–700ms controlled entrances, 0.5–2s moving packets, 1–2s holds on complex diagrams; adjust based on phrase timing, not a rigid global setting.
- **Camera:** mostly stable; use zoom only when targeting evidence, not constant movement.
- **Text:** one headline plus 1–3 important labels; render complex queries as cropped/zoomed evidence.
- **Rhythm:** do not force a cut every 2 seconds. Change visual state when speech introduces a change, contrast or conclusion.

## Audio-first scene composition
- Lock the **approved voice stem** before building detailed motion.
- Add `scene_start`, `scene_end`, `narration_text`, `visual_object`, `enter_trigger`, `action`, `highlight_trigger`, `hold` in `scene_spec.json`.
- Generate or align word timings, then establish beats at significant words (e.g. `two`, `one`, `both`, `database`, `zero`).
- At 30 FPS, compute `frame = round(seconds * 30)`. Keep timecodes in seconds in data; let Remotion convert.
- Codex builds reusable React components: `<InventoryCounter />`, `<ClientRequest />`, `<ApiService />`, `<SqlTable />`, `<LogTerminal />`, `<HighlightBox />`, `<StatusPill />`, `<RouteLine />`, `<MetricChart />`, `<HumanFigure />`.
- Export 1920×1080, 30 FPS. Render animated scenes as separate MP4s with clean tracks and assemble in Premiere/Filmora. For compositing flexibility, consider alpha-capable intermediary formats, but start with normal MP4.

## When to use Grok/Firefly-generated video
- Good: a 2–5-second stylized office establishing shot, rainy window, ominous datacenter exterior, cinematic cutaway **without fine text**.
- Poor: exact terminal output, server architecture, graph axes, database queries, network routes, consistent long-form characters.
- If generating short clips, use a single style reference that *you own*, mute their native audio, trim as B-roll, and use your authoritative Cartesia narrator and original sound design on top.

## Three acceptance checks
1. **Mute test:** Could a developer explain the core failure by watching the diagram alone?
2. **Audio-only test:** Does the story make sense without looking at the screen?
3. **Distraction test:** Is anything moving without information or mood purpose? Remove it.

## Reference format is inspiration, not source asset
Never import another channel's animations or audio into production; recreate mechanisms with original shapes, characters, timing and text.
