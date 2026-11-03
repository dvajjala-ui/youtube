# Engineering Backlog — Turn the Docs Into a Local App
## Sprint 0 — Proof
- [ ] Verify local Node + FFmpeg + Remotion versions.
- [ ] `Root.tsx`: composition 1920x1080 @30fps.
- [ ] `ServiceNode`, `Packet`, `Database` components render correctly in 5 sec.
- [ ] Render a 5s MP4 and confirm no black frames.

## Sprint 1 — Narration sync
- [ ] Manual timing CSV import; scene frame calculations.
- [ ] WAV playback; compare expected and rendered duration.
- [ ] 60s first-scene rendering; text legibility at 480px preview.
- [ ] Automated schema validation and fail-fast missing assets.

## Sprint 2 — Chapter assembly
- [ ] 6 scene categories with reusable props.
- [ ] Export per-chapter MP4 and timeline manifest.
- [ ] Premiere import checklist, audio manifest and license ledger.
- [ ] Render validation script (duration, dimensions, FPS, audio channels).

## Sprint 3 — Productization later
- [ ] Local dashboard/CLI for script → cues → scene plan → render review.
- [ ] Idempotent render jobs, caching, error reporting.
- [ ] Asset/version tracking and safe user approval gates.

## Definition of done
A Windows developer can run a documented setup, render a **specific original scripted episode** with locked WAV and JSON scenes, and edit it in Premiere without API-key spending or manual reanimation of every diagram.
