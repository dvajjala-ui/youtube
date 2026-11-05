# 15 — Natural Narration Lab: Cartesia, ElevenLabs, and Your Own Voice

**Goal:** An internationally understandable, believable story narrator—not a clone of another creator's specific voice.

## First purchase choice
- **Cartesia Sonic 3.6:** free plan offers about 27 minutes/month for experimentation; paid Pro is advertised at **$5/month** for about 133 minutes/month, with a **commercial-use license** and instant cloning rights for voices you have authorization to clone. https://www.cartesia.ai/pricing
- **ElevenLabs Starter:** advertised **$1 first month, then $6/month** at time of check; ~30 minutes of TTS in its pricing table, with commercial license. The minute estimate can depend on the model. https://elevenlabs.io/pricing
- Compare both with the **same script, same loudness, same music level (preferably none during A/B)**. Do not subscribe to both before testing with allowed/free credits.
- **Voice cloning:** do not clone Pouria or any other recognizable person's voice without explicit rights. Prefer platform stock voices or your own licensed clone.

## Audition setup (3 × 35-second samples)
Select 3 candidate voices: one warm/grounded, one curious/conversational, one clear documentary. Each reads the identical original script in `templates/tts_audition_01.txt`.
1. Export every take as high-quality WAV when available; preserve original file.
2. Match perceived loudness before comparison so volume does not bias selection.
3. Blind-rate on a 1–5 scale: **human naturalness (30%)**, technical pronunciation (20%), emotional restraint (15%), long-form listenability (15%), editability/consistency (10%), cost/commercial rights (10%).
4. Listen on desktop speakers, headphones and phone at low volume.
5. One winning voice for 4 initial episodes; review only if the score is poor.

## Suggested speech-direction map (our settings, to be tested)
| Segment | Emotion/delivery | Script technique | Audio choice |
|---|---|---|---|
| 0–10 sec | Concern without shouting | One concrete anomaly + short pause | Low room tone, no music or very low music |
| 10–30 sec | Genuine curiosity | Question followed by one specific fact | Neutral speech speed |
| 30–90 sec | Patient teacher | Contrast 'normally' vs 'this time' | Simplified one-idea sentences |
| Investigation | Increasing certainty | Short hypotheses; emphasize evidence | Narrow tension bed, no fake drama |
| Reveal | Understated 'aha' | 'The request wasn't lost; it was delayed here' | 0.4–0.7s music dip before reveal |
| Lesson | Calm authority | One mechanism and one prevention | Subtle resolution |

## Producing a natural TTS take
- Write **for speech**, not an essay: contractions, variable-length sentences, limited abbreviations, clear subject/action, no uninterrupted jargon chains.
- Use specific behavior: 'The payment succeeded. The inventory update didn't.' rather than 'A critical inventory concurrency scenario occurred.'
- Use paragraphs at thought boundaries; create separate TTS chunks **80–160 words**, with consistent voice/model settings. Don't split into one-sentence fragments unless the provider needs it.
- Keep punctuation natural; don't insert dozens of ellipses/emotion tags. Make tests with and without explicit emotion controls.
- Choose pronunciation for `API`, `SQL`, `p99`, `etcd`, `Kubernetes`, `WAL`, `CNI`; test the whole sentence in context.
- Test **normal speed** first, then a slightly slower variant (if supported) on dense explanations. Do not artificially slow all audio after rendering.
- Manually replace lines where the performance loses emotion, pitch abruptly changes, or a technical term sounds wrong.

## Integration shape (no credentials in client/frontend)
`script.md` → `voice_segments.json` → backend TTS adapter → `raw_wav/*.wav` → manual QA → `approved_voice/*.wav` → aligner → `word_timings.json` → scene-specific animation timeline → Premiere mix.

**Cartesia current model generation controls:** Sonic-series speed, emotion and volume exist, but API-version formats differ. Use exact model-specific official docs; avoid hardcoding old Sonic 2 `__experimental_controls` into Sonic 3.6. https://www.cartesia.ai/product/speech-synthesis

## Editorial rule
The voice is the emotional spine. Never ask an image-to-video model to regenerate your *main narrator* in random clips: speech character, ambience and mouth sounds can change from shot to shot. Make one authoritative narration audio stem first, then fit animation to it.
