# 03. Production Workflow (one video, start to finish)

Time numbers are my estimates. First video: about 30 to 40 hours. After the component library exists: about 15 to 20 hours.

---

## 1. Pipeline overview

| # | Step | Tool | Output | Est. time (steady state) |
|---|---|---|---|---|
| 1 | Pick topic and promise | You | One-sentence promise | 1 h |
| 2 | Research and verify facts | Docs, papers, your own tests | Notes with sources | 3 h |
| 3 | Outline | You + ChatGPT | 6 to 8 section outline | 1 h |
| 4 | Write script | You (ChatGPT for edits) | script.md, 1,200 to 1,800 words | 3 h |
| 5 | Read-aloud test | Kokoro or your voice | Final script, fixed length | 1 h |
| 6 | Storyboard | You | storyboard.md (one row per scene) | 2 h |
| 7 | Record voice | Mic + Premiere | Clean voice WAV | 2 h |
| 8 | Make cue sheet | Premiere transcript | cues.json (timestamps) | 1 h |
| 9 | Build scenes | Codex + Remotion | Scenes JSX | 4 to 6 h |
| 10 | Render clips | Remotion | MP4 clips | 1 h |
| 11 | Final edit | Premiere Pro | Video with voice, captions | 3 h |
| 12 | QA, title, thumbnail, publish | Studio, Figma/Canva | Live video | 2 h |

---

## 2. Step details

### Step 1: Topic and promise
- Write: "After this video, you will understand ______ and why ______"
- Pick topics you have debugged or built in real work
- Reject topics you cannot explain in one sentence

### Step 2: Research
- Use primary sources: official docs, papers, source code
- Run small experiments yourself and screenshot results
- Keep a sources list in script.md. Wrong facts kill trust

### Step 3: Outline
- Use the structure in file 01 (Hook, Problem, Naive, Better, Recap, Close)
- Each section must answer the question the last one raised

### Step 4: Script
- You write it. ChatGPT may help trim and fix grammar
- Spoken English: short sentences, plain words
- Mark each paragraph with a scene id, example: `[S03]`

### Step 5: Read-aloud test
- Read the whole script aloud or run it through Kokoro
- Check: length (8 to 12 min), awkward sentences, tongue twisters
- Fix, then LOCK the script. Changing it after recording costs a lot

### Step 6: Storyboard
One row per scene:

| Scene | Narration line | What appears | Motion | Duration |
|---|---|---|---|---|
| S01 | "Imagine two servers..." | Two boxes | Fade in | 6 s |

### Step 7: Record voice
- Details in file 05
- Record by section. Leave 1 second of silence between sections

### Step 8: Cue sheet
- Import voice into Premiere, transcribe, read the timestamp of each scene start
- Save as `cues.json`: `{ "S01": 0.0, "S02": 6.4, ... }` (seconds)

### Step 9: Build scenes
- Give Codex the storyboard + cues + component list (prompts in file 04)
- Scenes read their start time and length from cues.json
- Preview in `npx remotion studio`, fix by small prompts

### Step 10: Render
- Render one clip per section or one full silent video
- Keep the voice OUT of the Remotion render. Mix audio in Premiere

### Step 11: Final edit in Premiere
- Place rendered video + voice WAV
- Audio cleanup chain (file 05)
- Auto-captions, review them by eye
- Add chapter markers
- Export 1080p H.264 MP4

### Step 12: Publish
- Title: promise-based, 50 to 70 characters
- Description: summary, chapters, sources, repo link
- Thumbnail: one diagram, 3 to 5 words
- Check YouTube Studio settings for altered or synthetic content disclosure if anything looks realistic
- Upload as private, watch it fully once, then publish

---

## 3. Why record voice BEFORE animating

- Animation timing then matches real speech
- No re-timing work later
- Cost: lock the script first. Rewrites after recording mean re-recording
- Kokoro is used only before recording, to test script length and flow

---

## 4. Quality gates (do not skip)

| Gate | Check |
|---|---|
| After script | Read aloud passes. Facts have sources |
| After storyboard | Every sentence has a visual or a deliberate pause |
| After scenes | Max 7 objects per frame. No unexplained motion |
| After edit | Audio clean. Captions correct. No dead air over 2 seconds |
| Before publish | Watch whole video once on phone |

---

## 5. Batch tips

- Script + record in one session. Animate in another
- Reuse components every time. Never rebuild a box
- Keep a "mistakes" file after each video and update the rules
