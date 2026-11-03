# 16. Getting The "Live" Feel (Real Animation, Real Terminal, Real Timing)

This is the file you actually asked for: how to make videos that look like the reference channel —
diagrams that appear as you speak, real terminals, calm narration, constant gentle camera movement —
and how to do it on Windows with code-based animation instead of guessing.

---

## 1. What "live" really means

"Live" is not a streaming setup and it is not one-take screen recording. It is a **sync property**:
every visual element appears on the exact word that names it. Once you understand that, the whole
production problem collapses into one sentence — *drive the animation clock from the recorded audio,
not from a guessed storyboard timeline.*

Your existing `pilot/timecoded_scene_plan.json` is the opposite of this: it is approximate scene timing
written before the voice exists, and `Animated-Tech-Channel/23_NARRATION_TO_VISUAL_PRODUCTION_STANDARD.md`
says the same thing you are about to do — audio leads. The missing piece in both docs is the mechanism.
Here it is.

---

## 2. The audio-driven pipeline (the core technique)

```
1. Lock script
2. Record narration (your voice, one clean WAV per scene block)
3. Run whisper.cpp / faster-whisper with word-level timestamps  ->  words.json + .srt
4. Feed words.json into the Remotion composition
5. Each scene element gets a trigger: when the word "replica" is spoken, the replica box animates in
6. Render, then watch once with the sound off  ->  anything that moves without being named gets cut
```

In Remotion that means a helper like `whenSpoken("quorum")` that looks the word up in the transcript
array and returns its start time, then `interpolate(frame, [t, t+12], [0, 1])` for the reveal. You get
frame-accurate sync for free, retakes cost one re-render instead of a re-edit, and the same
`words.json` becomes your `.srt` captions. This is the single highest-leverage thing in this document,
and it is in none of your current files.

---

## 3. Three ways to get drawings that appear as you talk

| Method | How | Feel | Cost of a retake |
|---|---|---|---|
| **A. Truly live drawing** | Draw in Excalidraw dark mode while the narration plays in your headphones; capture the canvas in OBS | Most organic, most "engineer at a whiteboard" | Redraw the whole scene. Retakes hurt |
| **B. SVG stroke animation (recommended)** | Export the finished Excalidraw scene as SVG, then animate `stroke-dasharray` / `stroke-dashoffset` per path in Remotion so lines and arrows literally draw themselves on the spoken word | Clean, controllable, still reads as "live" | Change one number, re-render |
| **C. Keyframed sketch tool** | Excalimate (MIT) animates Excalidraw-style sketches and exports MP4/WebM | Fast | Medium |

Method B is the one to build your library around, because a drawn-on-demand arrow is a React component
you reuse for 50 videos. Use Method A for the hero shot of one scene per video, where the messiness is
the point.

For arrows and boxes: animate in this order — box, then label, then arrow, then the value inside the
arrow. That is what makes a diagram read as an explanation instead of a wall.

---

## 4. Real terminals, real logs, real tool usage

This is the "as we speak" part you specifically wanted, and it is the credibility layer the reference
channel gets from showing actual SQL and actual log lines.

- **VHS (charmbracelet, MIT, still shipping)** — write a `.tape` file that types commands with
  `Type "az sql server show ..."`, `Sleep`, and clears, then outputs an MP4 with a chosen font and
  theme. Deterministic: re-run it when the narration changes, no re-recording.
- **asciinema 3.0 (GPLv3 tool)** — record a genuine session. Use this when the claim is "I actually ran
  this and this is the real output", which is exactly the claim that separates you from AI-slop
  channels.
- Compose the resulting MP4 into the Remotion scene, or drop it into Premiere as a picture-in-picture
  over the diagram.
- **Snippet cards**: VS Code + CodeSnap, or a self-hosted Carbon (MIT) for no attribution question.
- **Log close-ups**: real log lines, syntax-highlighted, scrolled slowly, with the failing line held
  on screen while you say why it failed.

**The demo-lab loop.** Because your stack is .NET, Azure and SQL Server, the most distinctive thing you
can do — and the thing `docs/001.md` called your moat — is to make the incident actually happen on
camera in a reproducible folder:

```
episodes/NN-slug/
  demo-lab/
    docker-compose.yml        # sql server + app + a load generator
    break.ps1                 # makes the failure happen
    fix.ps1                   # applies the fix
    README.md                 # how to reproduce in 3 commands
  script.md
  narration/
  scenes/
```

You record the terminal running `break.ps1`, animate the diagram explaining what just happened, then
run `fix.ps1` on camera at the end. The viewer can clone the repo and reproduce the outage on their own
machine. Nobody has to trust your narration, and the repo is the reason they subscribe.

Before any of that ships, run the data-leak scrub in `15-voice-audio-and-rights.md` §4.

---

## 5. Camera movement without a camera

Rule from your own notes: no frame stays static for more than about 4 seconds. Implement it as:

- A **virtual camera** in Remotion: one `<AbsoluteFill>` group with a `scale` and `translate` driven by
  `spring()` per beat. Slow push-in on the node being discussed, settle, then move.
- In Premiere, the **Transform effect** with keyframes on the exported diagram PNG layers (what
  `docs/02` Method B describes), with "Scale to Frame Size" off so pans do not blur.
- Movement direction should follow meaning: left-to-right for request flow, downward for a call stack,
  outward for a blast radius. Random drift reads as a screensaver.
- Add a **pointer or laser** (Excalidraw presentation mode has one built in) when you need "notice this
  replica right here".

---

## 6. Sound design cadence

| Event | Sound | Level habit |
|---|---|---|
| Element appears | short soft whoosh or pencil tick | well below the voice |
| Terminal types | keyboard clacks, spaced like real typing | quiet, mono-ish |
| Root cause revealed | riser into a hit, then silence | silence is the emphasis |
| Diagram idle | very low room tone or nothing | avoid wall-to-wall music |
| Scene change | subtle transition | do not stack two effects |

Master to about −14 LUFS integrated, true peak −1 dBTP (`15-voice-audio-and-rights.md` §3). Source SFX
from CC0 or non-claiming packs and log every asset in `templates/rights_manifest.csv`, because generic
whoosh packs are the most common cause of false Content ID claims on a channel like this.

---

## 7. Story shape, with verified evidence

`docs/10` gives 15% setup / 60% mechanism / 25% payoff. The reference channel's public chapter lists
confirm that shape: `0:00 A 3 AM incident` … `13:57 The fix` on a 15:33 video — crisis first, mechanism
in the middle, fix in the last tenth. Copy the **arc**, not the scripts:

1. Cold open inside the failure. No intro music, no "welcome back".
2. Name the stakes in one sentence, then the system in one diagram.
3. Walk the request path; each hop is a beat; each beat reveals exactly one element.
4. Reveal the mechanism that broke — this is the promise of the title.
5. Show the fix in real code or real config, then run it.
6. Close with the one architectural rule, and the repo link.

Durations: plan 15 to 20 minutes, not 8 to 12. Every video above 90K views on the reference channel is
14:57 or longer, and mid-rolls need 8+ minutes regardless (`13-reference-channel-teardown-verified.md` §2).

---

## 8. Fonts and colors

- Excalidraw's own **Virgil** is bundled with Excalidraw; for anything you ship as a video asset,
  prefer a SIL Open Font License handwriting face — **Caveat**, **Patrick Hand**, **Architects
  Daughter** — all free for commercial use, no attribution required beyond keeping the license file.
- Monospace: JetBrains Mono or Cascadia Code, both OFL.
- Keep the dark canvas (`#121212` per your notes) and a small, consistent semantic palette: one color
  for healthy flow, one for failure, one for the thing the viewer should look at right now. Three
  accents maximum, and never red-for-failure in one video and red-for-brand in the next.

---

## 9. Do not use AI video generation for this

Generated footage hallucinates labels and text, which is fatal in a channel whose product is precise
diagrams, and it is also the pattern YouTube's inauthentic-content enforcement targets. Use AI for
research, script editing, animation **code**, and thumbnail art — never for the diagram itself.

---

## 10. Sources

Cross-references in this repo: `docs/10`, `docs/11`, `docs/14`, `docs/15`, `docs/16` builds on
`Animated-Tech-Channel/16_HOW_LIVE_TECH_EXPLANATIONS_ARE_ANIMATED.md` and
`Animated-Tech-Channel/23_NARRATION_TO_VISUAL_PRODUCTION_STANDARD.md`.
External: [VHS](https://github.com/charmbracelet/vhs) · [asciinema 3.0](https://blog.asciinema.org/post/three-point-o/) ·
[Remotion](https://www.remotion.dev/docs/license/pricing) · [Excalimate](https://excalimate.com/) ·
[Excalidraw presentations and laser pointer](https://plus.excalidraw.com/use-cases/presentations) ·
[whisper.cpp](https://github.com/ggerganov/whisper.cpp) · [faster-whisper](https://github.com/SYSTRAN/faster-whisper) ·
[SIL Open Font License fonts on Google Fonts](https://fonts.google.com/) ·
[YouTube mid-roll rules](https://support.google.com/youtube/answer/6175006)
