# 11. Live Feel and Shorts

My reading of "live": the explanation should feel like someone is explaining in real time, with things appearing as they speak. If you meant live streaming, tell me and I will add a separate file.

---

# Part A: Live feel (animation techniques)

These are my own practical techniques, not from a source.

| # | Technique | What the viewer feels |
|---|---|---|
| 1 | Progressive build: nothing is on screen before the narration mentions it. Items appear ON the word | Someone is building it now |
| 2 | Draw-on: arrows and borders draw themselves | Someone is sketching |
| 3 | A small pointer dot moves to what is being discussed | Someone is pointing |
| 4 | Visible state changes: color shifts, counters, queues filling, a clock ticking | The system is running |
| 5 | Real output: run actual code, capture real logs, animate them line by line | It really happens, not a cartoon |
| 6 | Predict, then reveal: pause, show a wrong guess, then the real result | Shared thinking |
| 7 | Small stagger: offset related items by 3 to 6 frames, use easing, not linear motion | Natural motion |
| 8 | Gentle zoom to the focus area, reset at each new section | Attention is guided |
| 9 | Cue sheet (file 03): every appearance lands on a spoken word | Voice and picture feel locked |

Rule: if an element appears before the word, it feels pre-made. If it appears on the word, it feels live.

## Codex prompts for live feel (one prompt each)

```
Read AGENTS.md and src/theme.js. Update src/components/Link.jsx so the arrow draws itself from start to end between appearAtSec and appearAtSec + drawSec using a stroke-dashoffset animation. Keep existing props working.
```

```
Read AGENTS.md and src/theme.js. Create src/components/Pointer.jsx: a small dot with a soft glow that moves between a list of {x, y, atSec} waypoints using spring(). Props: waypoints. Add a preview composition.
```

```
Read AGENTS.md and src/theme.js. Create src/components/LogStream.jsx: a monospace panel that reveals an array of log lines one by one, each at its own atSec, with the newest line highlighted. Props: lines, x, y, width.
```

---

# Part B: Shorts

## B1. Rules from a Shorts repurposing guide (source)

- Keep a Short to 60 seconds or less. Trim hard
- Open with a strong hook in the first seconds
- Make a separate, punchy hook rather than reusing the long video's intro
- Export 9:16 vertical
- Prefer a standalone segment from the long video that makes one complete point, then add a new hook if needed
- Plan the Shorts while outlining the long video
- A workable rhythm: 2 to 4 Shorts per week from existing content

## B2. My additions for your channel

- One idea, one diagram, one twist per Short
- Burn in subtitles. Many people watch muted
- End with a pointer to the full video
- In Remotion, make a second composition at 1080x1920. Components should take layout props so they work in both formats
- Do not post raw slices of the long video with no new hook

## B3. Short ideas from the retry topic

| Short | One-line idea |
|---|---|
| 1 | 3 layers x 3 retries = 27 calls |
| 2 | Why jitter exists |
| 3 | An idempotency key in 30 seconds |

## B4. 45-second Short storyboard

| Time | Job | Example |
|---|---|---|
| 0:00 to 0:03 | Hook | "One click became 27 calls." |
| 0:03 to 0:15 | Problem | Show the 3-layer chain, one request in |
| 0:15 to 0:35 | Mechanism | Counter climbs layer by layer |
| 0:35 to 0:45 | Twist and pointer | "One layer should retry, not three. Full video on the channel." |

## B5. Shorts and monetization (from earlier research)

- Shorts can help you reach 1,000 subscribers
- Shorts views do not count toward the 4,000 long-form watch hours. Shorts have a separate path of 10 million views (20 million from Feb 1, 2027)
- So: long videos earn your watch hours. Shorts feed discovery

## B6. Workflow

1. Publish the long video first
2. Spend about one extra day (my estimate) building 3 Shorts from the same components
3. Post 1 Short every 2 to 3 days after the long video
4. Check which Short brings viewers to the long video, make more like it

---

## Source

- Repurposing long videos into Shorts: https://subscribr.ai/youtube-strategy/repurpose-long-videos-into-shorts
