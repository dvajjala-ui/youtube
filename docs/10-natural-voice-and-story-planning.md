# 10. Natural Voice and Story Planning

Items marked (source) come from pages I read. Items marked (mine) are my own practical guidance.

---

# Part A: Natural voice

## A1. Why narration sounds fake

- Flat pitch on key words is a main cause of robotic sound (source)
- Sentences written for the eye, not the ear (mine)
- Reading words instead of telling an idea (mine)
- Over-editing: every breath and pause removed (mine)

## A2. Before recording

1. Picture one real listener, for example a junior developer you know. Talk to that person (source: voice-acting advice)
2. Listen to how people explain at a whiteboard. Copy the rhythm, not the words (source)
3. Write in speech: contractions, "so", "now", short questions (mine)
4. Mark the script: **bold** = stress this word, `/` = short pause, `//` = long pause (mine)
5. Keep a pronunciation list: names, numbers, acronyms, tool names (mine)

## A3. During recording

1. Sit upright or stand. Speak to your imaginary listener (mine)
2. Say each section 2 to 3 times. The first take is usually stiff (mine)
3. Try one take where you ad-lib a few words around the scripted lines. It makes the lines feel like yours (source). Keep the best delivery
4. Read a sentence silently, look away, then say it. Do not read word by word (mine)
5. Vary pace: slower on the key idea, faster on the setup (mine)
6. Record the "aha" line several times with different tones and pick the best (source: experiment with delivery)
7. Ask one friend to listen to a 1-minute sample. It is hard to judge your own delivery (source)

## A4. Editing

1. Keep small breaths. Remove only loud ones (mine)
2. Pauses: about 0.3 to 0.5 s between sentences, about 1 s after a big reveal (mine, adjust by ear)
3. Do not cut every filler word. Natural speech has some (mine)
4. Let visuals land during pauses, not on top of fast speech (mine)

## A5. If you use an AI voice anyway (scratch or backup)

- Use punctuation as pause cues. Short sentences, commas where a person would pause (source)
- Use exact pause tags if the tool supports them. Example from ElevenLabs: a break tag of 500 ms. Other tools may differ (source)
- Vary pitch on key words. Do not overdo it, too much creates artifacts (source)
- Spell out acronyms. Check names and numbers (source)
- Use pronunciation controls for technical terms (source)
- Listen to the whole file. Rewrite the 3 worst sentences, then regenerate (mine)

---

# Part B: Story planning

## B1. The shape of a tech explainer

One system, one failure, a chain of fixes, one insight (mine).

## B2. Timing (three-act structure, source)

For 8 to 12 minute videos: about 15 percent setup, 60 percent middle, 25 percent payoff.

For a 10-minute video:

| Act | Time | Job |
|---|---|---|
| 1 Setup | 0:00 to 1:30 | Promise, stakes, the big question |
| 2 Middle | 1:30 to 7:30 | 3 to 5 sequences, each with its own mini question, rising tension, a midpoint twist |
| 3 Payoff | 7:30 to 10:00 | Answer the big question, show the insight, callback to the hook |

## B3. Techniques

| Technique | How | Source |
|---|---|---|
| Hook in 10 seconds | A specific situation plus a surprising contradiction and a concrete promise | Storytelling guide |
| One big question | Specific enough to guess at. Do not answer it in the first minute | Storytelling guide |
| Stakes | Who is affected, what is the goal, what is the risk, how fast | Storytelling guide |
| Head fake | Break the viewer's expectation, with a clue planted earlier so it feels fair | Storytelling guide |
| Rehook | Close one question and open the next in the same breath. Transitions are the risk points | Storytelling guide |
| Micro-endings | A small ending every 2 to 4 minutes | Three-act guide |
| Promise refresh | Restate the central promise every 2 to 3 minutes | Three-act guide |
| Something changes | Every 10 to 30 seconds in the middle section | Three-act guide |
| Earned payoff | One sharp reveal at the end. Do not announce the ending early | Storytelling guide |

## B4. Worked example (my original outline): "Why retries can make an outage worse"

| Time | Story job | Idea | Visual idea |
|---|---|---|---|
| 0:00 to 0:20 | Hook | A service is slow for one minute. Ten minutes later everything is down, and nothing was broken | One client, one server, a slow response, then red spreading |
| 0:20 to 1:30 | Setup and big question | Clients retry on failure. That looks safe. So why does it kill the system? | Normal request flow, then a failed request and a retry |
| 1:30 to 3:30 | Naive version | Retry 3 times, immediately. A weak server now gets 3x the load | Packets multiplying toward a struggling server |
| 3:30 to 5:00 | Midpoint twist | Three layers each retry 3 times. One user action can become 27 calls at the bottom | Three-layer chain, counter climbing to 27 |
| 5:00 to 6:30 | Fix 1 and head fake | Backoff spaces retries out. But all clients wake at the same moment | Timeline with synchronized spikes |
| 6:30 to 7:30 | Fix 2 | Jitter scatters the retries | Same timeline, spikes spread out |
| 7:30 to 8:30 | Fix 3 | Retry at one layer only, with a budget | Chain with only one layer retrying |
| 8:30 to 9:30 | New problem and rehook | Retries can duplicate work. A payment may happen twice. Idempotency keys | Two identical requests, one marked as duplicate |
| 9:30 to 10:00 | Payoff and callback | One diagram of the full defense. Back to the hook: now you know why it went down | Recap diagram |

## B5. Script template (copy this)

```
TITLE PROMISE:
HOOK (first 10 s):
BIG QUESTION:
STAKES (who, goal, risk, time):

SEQUENCE 1
  mini question:
  answer:
  twist or problem:
  rehook line:

SEQUENCE 2 ... (repeat for 3 to 5 sequences)

MIDPOINT TWIST (around 50 percent):
PAYOFF (the one sharp reveal):
CALLBACK TO HOOK:
NEXT VIDEO HOOK:
```

## B6. Read your retention graph after publishing (source)

| Where viewers drop | Likely cause | Fix next time |
|---|---|---|
| First 30 seconds | Weak hook or weak stakes | Start with a sharper situation |
| Right after a reveal | Missing rehook | Open the next question before closing the last |
| Middle | Not enough small loops | Add a mini question to each sequence |
| Near the end | Payoff too obvious or wrap-up started too soon | Save one reveal for the final minute |

## B7. Checklist

- [ ] Is there a hook in the first 10 seconds?
- [ ] Is the big question specific?
- [ ] Does every section end by opening the next question?
- [ ] Is there a midpoint twist?
- [ ] Does something change on screen every 10 to 30 seconds?
- [ ] Is the payoff earned, not a summary?

---

## Sources

- Natural read advice for voice work: https://www.spotlight.com/news-and-advice/the-essentials/how-to-deliver-a-natural-read/
- Making text-to-speech sound less robotic: https://elevenlabs.io/blog/how-to-make-text-to-speech-sound-less-robotic
- Three-act structure for YouTube: https://blog.autonolab.com/blog/2025-08-21-the-three-act-structure-for-youtube-storytelling-that-retains/
- Storytelling techniques for retention: https://www.overseeros.com/blog/addictive-storytelling-youtube
