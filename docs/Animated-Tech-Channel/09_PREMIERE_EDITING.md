# 09 — Premiere Pro Final Editing Recipe
## Project setup
- Sequence: 1920×1080, 30 fps, Rec.709 SDR; 48kHz audio.
- Track layout: V1 animation chapters; V2 highlights/callouts; V3 occasional captions; A1 narration; A2 SFX; A3 ambience; A4 music.
- Keep chapter renders with 8–12 frame handles if practical for smooth edits.
- Organize `01_VOICE`, `02_RENDERS`, `03_SFX`, `04_MUSIC`, `05_CAPTIONS`, `06_EXPORTS` bins.

## Edit order
1. Lay down the **final narration** first, lock A1.
2. Place chapter MP4s to match voice cue boundaries.
3. Replace visually weak beats with bespoke Remotion render; don't distract with generic B-roll.
4. Trim pauses in a controlled way; preserve deliberate silence on discovery beats.
5. Add sound cues sparingly and adjust music ducking under all dialogue.
6. Use Premiere Enhance Speech on **recorded** voice if needed; it is a cleanup tool, not a substitute for good casting.
7. Generate final captions after timing is locked (Premiere text-based edit feature is separate from final captions workflow).
8. Add legally licensed background music and confirm usage rights.
9. Export H.264 MP4 at high-quality 1080p and verify final file on mobile.

## Quality control checklist
- [ ] First 10 seconds show a genuine story, not logos/intros.
- [ ] Narration intelligible over music even at 20% speaker volume.
- [ ] No sound clipping, unexpected silence or drastic loudness changes.
- [ ] Every onscreen sentence is spelled correctly and remains on screen long enough.
- [ ] Screen examples (SQL, architecture, timelines) are accurate.
- [ ] No artifacts, missing frames, misaligned subtitles, black frames or unfinished scenes.
- [ ] Caption file text verified, including technical acronyms.
- [ ] Title and thumbnail exactly match story content.
- [ ] Background music, voice and assets have saved commercial-use rights.
- [ ] Final human review and export backup complete.

## Filmora fallback
If Premiere's features feel excessive, use Filmora for final cut and music only. **Do not** edit the same timeline separately in both tools unless exporting and re-importing a known intermediate; it creates rework and versioning errors.

## After Effects
Use only for a few hero illustrations if your Adobe subscription includes it. [Dynamic Link](https://helpx.adobe.com/after-effects/desktop/work-with-other-applications/work-with-dynamic-link/dynamic-link-effects.html) is useful but adds complexity and system load. Remotion scenes should stay the primary reusable animation source.
