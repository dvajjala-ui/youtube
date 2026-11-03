# 04. Codex Prompts and Project Rules

Codex usage on a Plus plan is capped (5-hour windows, and weekly limits can apply). So: small prompts, reuse components, never ask Codex to write your script.

---

## 1. AGENTS.md (paste into the repo root)

```
# Project rules

- This repo makes animated tech explainer videos with Remotion (React, JSX, plain JavaScript, no TypeScript).
- Video: 1920x1080, 30 fps.
- Theme lives in src/theme.js. Never hardcode colors, fonts or easing in scenes.
- Use only components from src/components. If a needed component is missing, add it there first.
- Max 7 visible objects per frame. One color = one meaning (see theme.js).
- Animate only what the narration says. Use interpolate() and spring() from remotion.
- Scene timing comes from cues.json in the video folder (seconds). Convert with fps from useVideoConfig().
- Keep files small. One scene per file. No external network calls.
- Do not render audio inside Remotion. Audio is mixed in Premiere.
- After changes, run the project's lint or build command and report errors.
```

---

## 2. Prompt A: scaffold the theme

```
Read AGENTS.md. Create src/theme.js with: dark background, 4 colors (neutral, healthy/blue, failure/red, message/yellow), font families (Inter for labels, JetBrains Mono for code), spacing scale, and 3 easing presets (gentle, snappy, bounce). Export everything as named constants. Do not touch other files.
```

---

## 3. Prompt B: build the component library (one component per prompt)

```
Read AGENTS.md and src/theme.js. Create src/components/Node.jsx: a rounded box with a label and optional status color (healthy, failure, neutral). Props: x, y, label, status, appearAtSec, scale. It fades and scales in at appearAtSec using spring(). Add a small preview composition so I can see it in Remotion Studio.
```

Repeat for these components, one prompt each:

| Component | Purpose |
|---|---|
| Node | Server, service, database box |
| Link | Arrow between two nodes, can draw itself |
| Packet | Small dot or card that travels along a Link |
| Queue | Row of slots that fill and empty |
| Cluster | Group of nodes inside a border |
| Timeline | Horizontal time axis with events |
| Caption | Short label text that fades in and out |
| Highlight | Dims everything else, outlines one object |
| CodeBlock | Short code snippet with line highlight |

---

## 4. Prompt C: build one scene from the storyboard

```
Read AGENTS.md, src/theme.js, and the components in src/components.
Build src/videos/001-topic/Scene03.jsx from this storyboard row:

Scene S03, duration from cues.json (S03 start to S04 start).
Narration: "<paste the line>"
Visual: Client node on the left, Server node on the right, a Link between them. A Packet travels left to right at the first sentence end. Server turns red at "fails".
Use only existing components. Start times must come from cues.json.
```

---

## 5. Prompt D: wire the cue sheet

```
Read src/videos/001-topic/cues.json and all Scene files. Create index.jsx that renders each scene in a Sequence at its cue time, and sets the total composition length from the last cue plus the last scene duration. Do not change scene internals.
```

---

## 6. Prompt E: review and fix

```
Review Scene05.jsx against AGENTS.md. List violations (hardcoded values, more than 7 objects, missing cue usage). Fix them with minimal changes. Do not refactor unrelated code.
```

---

## 7. Prompt F: small fixes (use these often, they are cheap)

- "In Scene04, make the Packet travel 20 percent slower."
- "In Scene06, dim all nodes except the Database node between 12s and 18s using Highlight."
- "Add a Caption 'Retry #2' above the Client node at 9.5s for 2s."

---

## 8. Usage-saving rules

- One component or one scene per prompt
- Paste only the files needed, not the whole repo
- Fix details with Prompt F style short prompts
- Do the script, ideas and facts yourself
- If you hit the 5-hour limit, do script or editing work until it resets
- Check your usage screen in Codex settings before big batches

---

## 9. Common problems

| Problem | Fix |
|---|---|
| Animation looks jumpy | Use spring() or an easing preset from theme.js |
| Too much on screen | Split into two scenes or use Highlight to dim |
| Timing off after re-recording | Update cues.json only. Scenes read from it |
| Render is slow | Lower preview quality in Studio. Render final only once |
