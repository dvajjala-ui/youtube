# 09. Reference Video Analysis Kit

Why this file exists: I cannot reach his videos. YouTube blocked my automated access to his video list and feed, and I cannot watch video. I will not work around that block. These methods give you (and me) the same insight legitimately.

---

## 1. What I could and could not do

| Task | Result |
|---|---|
| Read his channel About text | Done |
| See his video list and view counts | Blocked |
| Watch or listen to a video | Not possible for me |
| Analyze a transcript you paste | Yes |
| Analyze structure from NotebookLM output you paste | Yes |

---

## 2. Method A: NotebookLM (free, fastest)

Per Google's announcement, NotebookLM accepts public YouTube URLs as sources, summarizes them, and links citations to the transcript.

Steps:
1. Open NotebookLM and create a new notebook
2. Add source, choose YouTube, paste his latest video URL
3. Repeat for the next 2 videos (3 total)
4. If a video fails to import, use Method B for that one
5. Ask the prompts in section 5, one at a time
6. Copy the answers into a text file and send them to me

---

## 3. Method B: copy the transcript by hand

1. Open the video on YouTube
2. Click "...more" in the description, then "Show transcript"
3. Turn timestamps on, select all, copy
4. Paste into a text file named `video1-transcript.txt` (repeat for videos 2 and 3)
5. Paste into chat or attach the files

---

## 4. Method C: watch with a stopwatch (about 30 min per video)

- Use the worksheet in file 01
- Measure: seconds to first visual change, number of scene changes per minute, number of sections
- Note: how does the voice sound in the first 20 seconds, and in the middle?

---

## 5. Prompt pack (for NotebookLM, or for me with transcripts)

Add this line to every prompt: "I want patterns only. Do not give me his exact sentences to reuse."

| # | Prompt |
|---|---|
| 1 | Split this video into sections with start timestamps. For each section give: the question it answers, what is likely on screen, and how it connects to the next section |
| 2 | Describe the first 30 seconds: the situation shown, the question raised, and the promise made |
| 3 | List every open loop (question raised) and the timestamp where each one closes |
| 4 | Estimate words per minute for each section from the timestamps. Where does the speaker slow down or speed up, and why? |
| 5 | Describe the language style: typical sentence length, how technical terms are introduced, how transitions are done, use of "you" and "we" |
| 6 | Which sentences imply a visual change? Give a table: timestamp, narration idea, likely visual |
| 7 | Map the video to a three-act shape (about 15 percent setup, 60 percent middle, 25 percent payoff). Where is the midpoint twist? |
| 8 | Across all 3 videos: what stays the same and what varies? |
| 9 | Where could a viewer get bored, and what keeps them watching there? |

---

## 6. What to bring back to me

- Outputs of prompts 1, 2, 4 and 6 for all 3 videos, OR the 3 transcripts
- Your own notes: what you liked, what felt slow

What I will build from it:
1. A rewritten style blueprint (file 01) with real numbers
2. A pacing table for your voice
3. A storyboard template matched to the pattern
4. A script outline for your first video

---

## 7. Ground rules

- Study patterns, not sentences
- Do not reuse his wording, his exact scene order, or his visuals
- Your topics, your examples, your words

---

## 8. Source

- NotebookLM YouTube support: https://blog.google/technology/ai/notebooklm-audio-video-sources/
