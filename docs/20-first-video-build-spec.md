# 20. First Video Build Spec (Do This Next, Not More Planning)

Purpose: turn the ~70 planning files in this repo into one rendered video. `docs/004.md` ends with the
warning that applies to you — "use Codex to implement the first working animation rather than
continuing to accumulate planning documents". This file is the last plan file. After it, the next
artifact should be an MP4.

---

## 1. What video 1 is

**`Two Customers Bought The Last Item (A True Story)`**

Chosen deliberately: the narration script and storyboard already exist in
`Animated-Tech-Channel/pilot/02_COMPLETE_NARRATION_SCRIPT.md` and `pilot/03_STORYBOARD.md`, so you spend
your effort on the pipeline rather than on writing. It is fully reproducible on a laptop, it is a real
mechanism (lost update / non-atomic check-then-act), and it fits the verified title formula.

**One change you must make first.** The pilot is written for 7 to 9 minutes at about 1,230 spoken words.
The evidence in `13-reference-channel-teardown-verified.md` §2 says 15 to 25 minutes is the format that
performs, and mid-rolls need 8+ minutes regardless. At roughly 140 words per minute, 16 minutes needs
about **2,200 words**. Expand by adding a second act, not by padding: run the naive fix, show that it
also breaks under concurrency, then land the atomic `UPDATE` and the constraint. That is a real story
with two failures instead of one.

---

## 2. Repo scaffold

```
youtube/
  docs/                          # already here
  episodes/
    01-two-customers/
      script.md
      narration/                 # WAV per scene block + room tone
      transcript/words.json      # whisper word timings, the animation clock
      scenes/                    # .excalidraw sources + exported SVG
      terminal/                  # .tape files, .cast recordings, rendered MP4s
      composition/               # Remotion project
      demo-lab/
        docker-compose.yml       # sql server + api + load generator
        break.ps1                # makes the lost update happen
        fix.ps1                  # applies the atomic update
        README.md                # reproduce in 3 commands
      rights.csv                 # copy of templates/rights_manifest.csv, filled in
      sources.csv                # copy of templates/source_log_example.csv, filled in
```

```bash
mkdir -p episodes/01-two-customers/{narration,transcript,scenes,terminal,composition,demo-lab}
cd episodes/01-two-customers/composition
npx create-video@latest --blank   # Remotion scaffold (React + TypeScript)
npm i
npm run dev                       # Remotion Studio on localhost:3000
```

Remotion is free for individuals and companies of three or fewer, with no watermark and no attribution
requirement (`14-animation-and-capture-stack.md` §2).

---

## 3. The audio clock (build this before any scene)

Record narration per scene block, then extract word timings:

```python
# transcript/extract.py  (faster-whisper, MIT)
from faster_whisper import WhisperModel
import json, sys

model = WhisperModel("small", device="cpu", compute_type="int8")
segments, _ = model.transcribe(sys.argv[1], word_timestamps=True)
words = [{"w": w.word.strip().lower(), "s": w.start, "e": w.end}
         for s in segments for w in s.words]
json.dump(words, open("transcript/words.json", "w"))
```

Then in the composition, every reveal is keyed to a spoken word:

```tsx
// composition/spoken.ts
import words from "./transcript/words.json";
export const FPS = 30;
export function spoken(word: string): number {
  const hit = words.find((x) => x.w.includes(word.toLowerCase()));
  if (!hit) throw new Error(`word not spoken: ${word}`);   // fail loud, never silent
  return Math.round(hit.s * FPS);
}
```

```tsx
// composition/Scene3.tsx
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, Img } from "remotion";

export const Scene3: React.FC = () => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: "#121212" }}>
      <Sequence from={spoken("stock") - 6}>
        <Img src={staticFile("scenes/stock-box.svg")} style={{ opacity: o }} />
      </Sequence>
      <Sequence from={spoken("second")}>
        <Img src={staticFile("scenes/arrow-draw.svg")} />   {/* stroke-dashoffset animates */}
      </Sequence>
    </AbsoluteFill>
  );
};
```

The `throw` is the important part: if you rewrite a sentence, the render fails and tells you which
reveal is now orphaned, instead of quietly drifting.

---

## 4. Terminal scenes

Scripted and re-renderable, via VHS (MIT, maintained):

```
# terminal/lost-update.tape
Set Shell powershell.exe
Set FontSize 22
Set Width 1400
Set Height 700
Type "docker compose up -d --build"
Sleep 900ms
Enter
Sleep 400ms
Type ".\break.ps1"
Enter
Sleep 2s
Type "SELECT ItemId, Stock FROM Items;"
Enter
Sleep 1500ms
Output lost-update.mp4
```

```bash
vhs terminal/lost-update.tape        # -> mp4, drop into Remotion with <OffthreadVideo>
asciinema rec terminal/real-run.cast # when you want the "I actually ran this" version
```

---

## 5. Scene list for a 16-minute cut

| # | Beat | Approx | What is on screen | Trigger word |
|---|---|---|---|---|
| 1 | Cold open: two orders, one item | 0:00 to 0:50 | Terminal with both requests landing, red "SOLD" on both | — |
| 2 | Stakes and the promise | 0:50 to 1:30 | Single node diagram, warehouse + API + DB | "inventory" |
| 3 | The read | 1:30 to 3:30 | Both requests read `Stock = 1`, arrows draw themselves | "read" |
| 4 | The check | 3:30 to 5:30 | `if (stock > 0)` highlighted in both threads | "check" |
| 5 | The act | 5:30 to 7:30 | Two `UPDATE`s both succeed; constraint violated | "write" |
| 6 | Why it is not a bug | 7:30 to 9:30 | Timeline showing the interleaving, isolation levels named | "isolation" |
| 7 | Naive fix and why it breaks | 9:30 to 11:30 | `try/catch` or app-level lock; show throughput collapse | "lock" |
| 8 | The real fix | 11:30 to 13:30 | `UPDATE ... WHERE Stock > 0` plus rowcount check, or a serializable transaction | "atomic" |
| 9 | Proof on camera | 13:30 to 15:00 | Run `fix.ps1`, second customer gets `409 Conflict` | "run it" |
| 10 | The rule and the repo | 15:00 to 16:00 | One-line takeaway, repo URL, next episode tease | — |

Manual mid-roll breaks after beats 5 and 8 — natural pauses, not mid-sentence.

---

## 6. Assets to produce

- 8 to 10 Excalidraw scenes on `#121212`, exported as SVG at 2x with transparent background, sources
  committed so you never redraw.
- One hand-drawn character for the cold open, drawn or Firefly-generated by you. No meme packs.
- Monospace: JetBrains Mono (OFL). Handwriting: Caveat or Patrick Hand (OFL).
- SFX: 6 to 10 CC0 or non-claiming sounds (soft whoosh, pencil tick, keyboard clacks, one riser, one
  hit). Log each in `rights.csv` the day you download it.
- No background music under narration. Silence is cheaper than a Content ID claim.

---

## 7. Render and master settings

| Setting | Value |
|---|---|
| Resolution and fps | 1920x1080, 30 fps |
| Codec | H.264, CRF about 18 or target bitrate about 12 Mbps |
| Audio | 48 kHz, about −14 LUFS integrated, true peak ≤ −1 dBTP |
| Captions | Upload `words.json` as an `.srt` rather than burning big text on a long-form video |
| Chapters | The 10 beats above, story-shaped (`0:00 Two orders, one item`) |
| Preview discipline | Render a 20-second slice per iteration; full render once |

---

## 8. Fourteen days, one hour a day plus weekends

| Day | Output |
|---|---|
| 1 to 2 | Demo-lab breaks and fixes on camera. Nothing else |
| 3 to 4 | Script to 2,200 words with citations in `sources.csv` |
| 5 | Record narration per block. Ask three engineer friends if it is listenable |
| 6 | `words.json` + the `spoken()` helper working against a placeholder scene |
| 7 to 9 | Draw the 10 scenes, export SVG, animate reveals on triggers |
| 10 | VHS terminal scenes rendered and composited |
| 11 | Camera moves, SFX, audio master |
| 12 | Thumbnail, title, description, chapters, disclaimer, repo README |
| 13 | Run the 12-check gate in `19-challenges-precautions-and-traps.md` §9. Fix, do not polish |
| 14 | Publish, then write down what took longer than expected |

Publish on a weekday evening in the US Eastern window if you want US engineers, not an Indian evening.

---

## 9. Shorts cut (do not build Shorts first)

One 45 to 60 second vertical cut from beat 5, the moment both writes succeed: 9:16, top 60% the
diagram, bottom 40% the terminal, new hook line instead of clipping the middle of the long video,
captions burned in here (this is the one place big bold captions belong). Two to four Shorts a week
only once long-form exists (`docs/11`).

---

## 10. Definition of done for video 1

Not "good". Done means: it exists on YouTube, 15+ minutes, your own voice, real reproducible code in
the repo, the demo-lab works from a clean clone, citations in the description, and you finished it in
under 90 hours. Video 2's goal is 60 hours. Video 4's goal is 40.

**Then stop planning and make video 2.** If you want the analysis of the reference channel's actual
pacing, that is a 20-minute task with `docs/09` and a transcript paste — and it should happen while
video 2 is being built, not instead of it.
