# 14. Animation And Capture Stack (Verified Licenses And Prices)

`docs/02-tool-stack.md` and `Animated-Tech-Channel/03_TOOLS_COSTS_AND_LICENSES.md` were written from
search summaries. This file is the checked version: official license pages and current prices, read
2026-11-03, plus the things neither doc covers — the Windows constraint, the terminal-capture tools,
and two licensing traps that would bite a monetized channel.

---

## 1. The constraint your docs ignore: you are on Windows

The reference look is often described with **Screen Studio**, which your pasted notes recommend for
automatic cursor smoothing and auto-zoom. Screen Studio is **macOS-only**, is now $29/month or
$108/year, its lifetime license was removed, and the free trial cannot export. On your machine it is
not an option at all. The Windows equivalent is **OBS Studio** (GPL-3.0, free) plus keyframed pans and
zooms in your editor, or OBS with a zoom/move plugin. This changes `docs/03-production-workflow.md`
step 6 for you: you will do the "live" camera moves by hand in Premiere, which is what Method B in
`docs/002.md` already describes.

---

## 2. Code-based animation engines

| Tool | Price and license | Commercial use in monetized videos | Verdict for you |
|---|---|---|---|
| **Remotion** | $0 for individuals and companies of **3 or fewer** people total. Company seats $25/person/month, Enterprise from $500/month | Yes. No watermark, no attribution required, and your finished videos remain usable even if you stop paying or the license changes | **Primary engine.** You know React, Codex writes React, and the free tier covers you as an individual |
| **Motion Canvas** | $0, MIT | Yes, MIT is clean | Good for declarative scene animation, but releases have stalled (3.17.2 Dec 2024, 3.18.0-alpha Feb 2025) and it has no real camera/pan primitives. Risky to build a multi-year pipeline on a project that is quiet |
| **Manim Community** | $0, MIT | Yes for your renders. MIT covers **code**, not 3Blue1Brown's footage, branding or bundled fonts | Best for mathematical precision, worst for "hand-drawn live" feel and iteration speed |
| **manimgl (3b1b)** | $0, © 3Blue1Brown LLC | Same caution as above | Only if you want 3b1B-style math rendering |
| **Excalimate** | $0, MIT. Exports MP4/WebM/GIF/SVG/PNG, no watermark | Yes | The closest thing to "Excalidraw but animated" without writing code. Keyframed, not truly live |

Neither of your docs mentions Excalimate or the Remotion headcount rule. The Remotion rule matters:
the moment you incorporate and hire a fourth person, the free tier stops applying.

---

## 3. Dark-canvas sketch tools

- **Excalidraw** — MIT, excalidraw.com is free including commercial use. Dark mode via view mode.
  Presentation mode has a built-in **laser pointer**, which is the cheapest way to get "engineer
  pointing at the diagram". Export PNG/SVG at 2x with transparent background. **There is no session
  recorder**, so the "live drawing" shot is a screen recording of you drawing, not an export.
  Excalidraw+ ($6/user/month) is only needed for cloud scenes, teams and PDF/PPTX export.
- **tldraw** — the app is free, but the **SDK license is a hobby license: non-commercial only, with a
  mandatory "made with tldraw" watermark**, and production use needs a paid license (reported around
  $6k/year, with trial keys that phone home). Licensing tightened after 4.0 in September 2025.
  Recording yourself sketching on tldraw.com is not "shipping the SDK", so it is fine, but
  **Excalidraw is the safe pick** and your docs currently recommend both without this distinction.
- **Eraser.io** — free tier is 3 files and 3 AI credits; watermark removal and 2x/3x export are
  **paid-only** (Business $45/member/month). If you need high-res dark exports, budget for it.
- **draw.io / diagrams.net** — source Apache-2.0, app and desktop free, commercial fine, dark theme,
  arbitrary-scale PNG/SVG. No animation; you animate it in the editor.

---

## 4. Terminal, logs and code snippets (the part your docs do not cover at all)

You asked for "tool usage as we speak" — real commands and real log output appearing as you talk. That
is a capture problem, not an animation problem, and these are the right tools:

| Tool | What it gives you | Status and license |
|---|---|---|
| **VHS (charmbracelet)** | A `.tape` script that types commands, sleeps, and outputs a **GIF/MP4/WebM/PNG** with a chosen theme and font. Deterministic, re-renderable, diff-able in git | MIT, **actively maintained** — v0.12.1 released 2026-09-24. Best fit for scripted log-scroll scenes |
| **asciinema** | Records a real terminal session to an asciicast; playback speed 0.25x to 2x, pausing. Version 3.0 shipped 2025-09-15 with a new format | GPLv3 (the tool, not your output). The honest "I actually ran this" artifact |
| **termsvg** | Converts `.cast` files into animated SVG you can drop into a web page or Remotion composition | MIT |
| **terminalizer** | Older GIF terminal recorder | Effectively unmaintained for years. Avoid |
| **taffy** | Not a video tool (Charm theme manager). Ignore the recommendation if you meet it |
| **VS Code + CodeSnap** | Syntax-highlighted snippet cards with padding and shadow, straight from the editor | Free, MIT extension. "Polar" is the paid rewrite |
| **Carbon** | The classic snippet-to-image renderer | Repo is MIT, so self-host it and there is no attribution question |
| **Ray.so** | Same idea, hosted | Free web tool, no open-source guarantee on the hosted service |

Recommended pattern for your format: **VHS for scripted deterministic typing** (repeatable, retake
without re-recording) and **asciinema for genuinely real sessions** (proof you ran it). Then composite
those MP4s over your Remotion scenes. This is also what makes the "true story" claim defensible: real
output, not stock B-roll.

---

## 5. Screen recording, editing and captions on Windows

- **OBS Studio** — GPL-3.0, free, Windows. For the auto-zoom feel, either keyframe transforms in
  Premiere or use a per-scene move/zoom plugin.
- **Adobe Premiere Pro** — already in your subscription. Transform effect for pans and zooms, and
  auto-transcription is included with CC.
- **DaVinci Resolve Free** — $0, includes Fairlight; commercial-grade. Note that **auto-captions are
  restricted to the Studio (paid) version**, so if you go this route use Whisper instead.
- **Captions** — whisper.cpp, faster-whisper (both MIT) run locally for free. For calm long-form
  narration, upload a transcript as closed captions instead of burning big bold words on screen; that
  style belongs to Shorts, not to a 20-minute explainer. CapCut paywalled some auto-caption features
  in 2026; Submagic starts around $19/month.
- **Camtasia** — TechSmith discontinued perpetual licenses in the 2025 move to annual subscriptions,
  with a legacy price increase on 2026-06-11. Starter $39, Essentials $179.88, Create $249 per year.
  If a guide recommends Camtasia, note it is now a subscription.

---

## 6. Thumbnails

Photoshop is already in your Adobe subscription and is the strongest zero-cost option; **Firefly**
gives commercially-safe generated art with Adobe-style indemnity, which matters for a monetized
channel more than any other generator. Figma's free tier is fine for layout. Canva's free tier charges
per-use for Pro elements and caps AI generation at roughly 20 uses per month. Midjourney requires a
paid plan, and companies over $1M gross revenue must be on Pro or Mega.

The character-art issue is covered in `15-voice-audio-and-rights.md` §4.

---

## 7. What changed in 2025 and 2026 (so your docs do not age silently)

- ElevenLabs Starter went **$5 to $6/month**.
- **Adobe Podcast Premium standalone was discontinued 2026-08-30**; it now sits inside Firefly Pro at
  $19.99/month. The free tier is about 500 MB / 30 minutes per file and roughly 1 hour per day.
- **Screen Studio** removed its lifetime license; subscription only, macOS only.
- **TechSmith** ended perpetual Camtasia licenses.
- **tldraw** tightened its SDK license (watermark on the hobby tier).
- **Motion Canvas** releases stalled; **VHS** kept shipping.
- **asciinema 3.0** changed the recording format — old guides and old `.cast` files may not match.

---

## 8. Decision for this project

Remotion (composition engine) + Excalidraw (sketch source, drawn live into OBS) + VHS and asciinema
(real terminal artifacts) + OBS (capture) + Premiere Pro (assembly, pans, audio, captions) + Photoshop
(thumbnails) + whisper.cpp (transcripts) + YouTube Audio Library or Pixabay (sound). **Total new cash:
$0.** Everything above is either free-licensed or already in your Adobe subscription.

---

## 9. Sources

[Remotion pricing](https://www.remotion.dev/docs/license/pricing) · [Remotion license FAQ](https://www.remotion.dev/docs/license/faq) ·
[Manim Community](https://docs.manim.community/en/stable/index.html) · [3b1b/manim](https://github.com/3b1b/manim) ·
[Motion Canvas](https://motioncanvas.io/) · [Excalimate](https://excalimate.com/) ·
[Excalidraw repo](https://github.com/excalidraw/excalidraw) · [Excalidraw+ presentations](https://plus.excalidraw.com/use-cases/presentations) ·
[tldraw license](https://github.com/tldraw/tldraw/blob/main/apps/docs/content/community/license.mdx) · [tldraw pricing](https://tldraw.dev/pricing) ·
[Eraser pricing](https://www.eraser.io/pricing) · [draw.io terms](https://www.drawio.com/trust/terms-of-use/) ·
[VHS](https://github.com/charmbracelet/vhs) · [asciinema 3.0](https://blog.asciinema.org/post/three-point-o/) · [termsvg](https://github.com/MrMarble/termsvg) ·
[CodeSnap](https://marketplace.visualstudio.com/items?itemName=adpyke.codesnap) · [Carbon repo](https://github.com/carbon-app/carbon) ·
[Screen Studio](https://screen.studio/) · [TechSmith subscription change](https://support.techsmith.com/hc/en-us/articles/27009223314701-TechSmith-Transition-to-Annual-Subscription-Pricing-Model-in-2025) ·
[faster-whisper](https://github.com/SYSTRAN/faster-whisper) · [Adobe Podcast plans](https://podcast.adobe.com/en/plans) · [Canva licensing](https://www.canva.com/licensing-explained/) ·
[Midjourney plans](https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans)
