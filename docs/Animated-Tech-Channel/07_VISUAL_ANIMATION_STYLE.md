# 07 — Original Visual Language and Animation Grammar
## Design tokens for first pilot (initial proposal)
| Role | Value | Usage |
|---|---|---|
| Canvas | 1920 × 1080, 30 fps | Master horizontal upload |
| Background | `#0C1424` | Primary night-tech canvas |
| Surface | `#162238` | Panels, services, callouts |
| Primary text | `#F1F5FB` | Titles and callouts |
| Secondary text | `#A9B7CB` | Labels and annotations |
| Healthy/flow | `#47C9BD` | Accepted packets, state changes |
| Warning | `#F0B45A` | Bottleneck, waiting |
| Error | `#E86B78` | Failed request, oversell |
| Strong highlight | `#7EA7FF` | Zoom focus |
| Fonts | e.g. Inter/Sora + JetBrains Mono; **verify font licenses** | Headlines + code |

## Art direction
- **Primary:** Custom geometric vector art and UI-like scenes; one distinctive recurring engineer silhouette with original proportions and clothing.
- **Secondary:** Animated flow diagrams, maps of services, query execution timeline, queues, logs, tracing waterfalls.
- **Accent:** Subtle grain/glow on *some* scenes, not every shot; avoid visual clutter.
- 16:9 composition with at least ~100px edge padding; verify mobile readability.
- No copied character, illustration, text layout, opening animation, color treatment or thumbnail from reference creator.

## Reusable motion components Codex should build
1. `ServiceNode`: title, icon, status, border, failure marker.
2. `Packet`: controllable start/end, easing, tail.
3. `Terminal`: reveal command / syntax highlight without fake code semantics.
4. `Database`: visual stock counter; locking and atomic update.
5. `Timeline`: event points and concurrent lanes.
6. `Character`: 3–5 reusable poses, limited 2D animation (not generated moving portraits).
7. `FocusCamera`: pan/zoom/hold for readable technical details.
8. `Callout`: annotation with leader line; accurate pointer location.
9. `SplitScreen`: two users acting concurrently.
10. `ChapterTransition`: short consistent motif, no flashy routine intro.

## Rules for movement
- Objects should move **because something happens**, not just to avoid a static frame.
- Usually 1 primary focus at a time; preserve orientation between scene cuts.
- Typical movements 0.3–0.8 sec, holds long enough to read. This is an initial heuristic for testing, not a measured reference property.
- Use highlights and zoom to guide eyes through diagrams; keep data flow direction consistent.
- During abstract explanation, show one component at a time, then assemble the system.
- Avoid auto-generated subtitles continuously covering visuals. Captions primarily on explicit accessibility track, with occasional emphasized on-screen terms.

## Graphics method
- Use SVG/React primitives, shapes, CSS and code-driven animation for easy iteration.
- Create a **small original asset library** of service icons, character poses, device shapes and background systems.
- Build no more than five high-quality reusable widgets before first pilot.

## Visual QA
- Can you read all labels on a phone-sized preview?
- Is database/server topology technically correct?
- Does a failed request ever incorrectly appear as successful?
- Is a sequence of events ordered consistently in space and time?
- Do there exist 4+ seconds of arbitrary movement with no educational purpose? Trim it.
