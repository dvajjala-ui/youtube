# 02. Tool Stack

---

## 1. The stack at a glance

| Tool | Job | Cost | Notes |
|---|---|---|---|
| Codex (inside your $20 ChatGPT plan) | Writes the animation code (Remotion scenes and components) | Already paid | Usage is capped. Plus has 5-hour windows, and weekly limits can apply. Plan work in batches |
| ChatGPT chat (same plan) | Outline help, script editing, fact-check questions | Already paid | Keep facts verified by you |
| Remotion | Animation engine. Videos are React components | Free for individuals. Companies need a license | Read https://www.remotion.dev license page before monetizing |
| Kokoro | Free open-source TTS for scratch audio | Free | Draft voice only. Not the final voice |
| Adobe Premiere Pro | Final edit: cuts, audio cleanup, captions, export | Already have | Main editor |
| Filmora | Backup: Shorts, quick trims | Already have | Do not use for the main flow |
| Thumbnail tool | Thumbnails | Free | Figma free or Canva free. Use Photoshop only if your Adobe plan includes it |
| Mic | Voice recording | Low cost | Any USB mic works. A phone earphone mic in a quiet room is a fine start |

---

## 2. Why Remotion (and not the others)

| Option | Language | Verdict for you |
|---|---|---|
| Remotion | React / JSX | PICK. Matches your skills. Big React ecosystem. Easy for Codex to write |
| Manim | Python | Great for math visuals. Extra language and setup. Skip for now |
| Motion Canvas | TypeScript | Strong for hand-crafted explainers, but one source says the original project's site is offline and maintenance is unclear. Skip for now |

Remotion's own docs frame it as: use it when animating web UI and components. Our diagrams are exactly that (boxes, arrows, text).

---

## 3. Setup checklist (day 1)

- [ ] Install Node.js (LTS)
- [ ] Install VS Code
- [ ] Install Git, create a private GitHub repo "explainers"
- [ ] Create the project: `npx create-video@latest`
- [ ] Start preview: `npx remotion studio`
- [ ] Render test: `npx remotion render <CompositionId> out/test.mp4`
- [ ] Open the repo in Codex and add the rules file from 04-codex-prompts.md
- [ ] Test mic recording, check noise level
- [ ] Check Premiere Pro opens and exports a 1080p MP4

---

## 4. Folder structure

```
explainers/
  AGENTS.md                 (rules for Codex)
  src/
    components/             (reusable: Node, Link, Packet, Queue, Cluster, Timeline, Caption, Highlight)
    theme.js                (colors, fonts, easing, sizes)
    videos/
      001-topic-name/
        script.md
        storyboard.md
        cues.json           (timestamps from your voice recording)
        Scene01.jsx ...
        index.jsx
  public/
    audio/                  (voice WAV files)
  out/                      (rendered clips)
```

Rule: build the component library ONCE. After that each new video only needs new scenes. This is what saves Codex usage and your time.

---

## 5. Budget

| Item | Monthly |
|---|---|
| Codex / ChatGPT Plus | Already paid |
| Premiere Pro, Filmora | Already paid |
| Remotion, Kokoro, Figma/Canva | Free |
| Mic (one time) | Optional, low |

Start with zero new spending.

---

## 6. Free-tier first

- Fonts: Google Fonts (Inter, JetBrains Mono)
- Icons: free open-source icon sets
- Music and SFX: YouTube Audio Library or properly licensed free sources
- Always keep license notes in your repo for anything you did not make
