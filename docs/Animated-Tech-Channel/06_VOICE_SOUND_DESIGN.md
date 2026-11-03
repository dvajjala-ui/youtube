# 06 — Voice and Sound: The Main Attention System
## Narration target (original, not a voice copy)
- English, intelligible internationally, adult, grounded and warm. Neutral/mild accent, not a forced imitation.
- Low-mid pitch **if naturally available**, moderate pace (~140–160 wpm baseline; deliberate pauses on reveals).
- Avoid deep trailer announcer performance, constant excitement, brittle robotic cadence or whispering.
- Energy map: **opening urgency → calm explaining → investigative curiosity → quiet revelation → confident lesson**.
- No specific named creator voice-cloning or conversion; use your own voice or a legally licensed stock/synthetic voice.

## A/B audition (do this *before* entire script)
1. Use one original **45-second excerpt** from `pilot/02_COMPLETE_NARRATION_SCRIPT.md`.
2. Produce 3 takes: own voice cleaned in Premiere, Cartesia stock voice (paid commercial tier if production), ElevenLabs stock voice (paid commercial tier if production).
3. Loudness-match for comparison; don't let the louder track win.
4. Blind-score from 1–5: pronunciation; natural pauses; stress on key words; emotional range; speed clarity; listener fatigue; price/rights.
5. Reject any voice with mispronounced `SQL`, `atomic`, `rowcount`, `transaction` unless pronunciation can be controlled reliably.
6. Select **one** consistent narrator identity for first four videos.

## Recording / TTS batching
- Record in sections of 80–160 words, with 0.3–0.8 sec intentional head/tail silence; include unique IDs.
- Export WAV 48 kHz (mono for spoken voice if supported) rather than repeatedly transcoding MP3.
- Pronunciation dictionary: `SQL = sequel or S-Q-L` (choose once); `API = A P I`; `JWT = J W T`; `p99 = p ninety-nine`.
- For TTS, regenerate only bad sentences, not entire chapters; keep source text, model, voice ID, date, settings in `voice_manifest.json`.
- Don’t hard-code provider parameters until your chosen version of API documentation has been verified.

## Mix policy (practical targets, not universal platform requirements)
- Narration always prioritized. Music should be clearly underneath the spoken voice; duck during technical explanations.
- Begin from voice-only mix; add ambience and subtle SFX to justify attention, never to hide weak writing.
- Avoid hard pumping/overcompression. Use gentle EQ, noise cleanup, light compression and a limiter as needed.
- Confirm no clipping; check overall mix and integrated loudness using a metering tool. Many creators aim around -14 LUFS integrated / peak below -1 dBTP, but **this is a workflow target, not a YouTube acceptance rule**.
- Test on phone speakers and headphones at low volume; every technical word must remain clear.

## Sound palette and placements
| Beat | Sound idea | Mix note |
|---|---|---|
| Cold open | One muted alert/chime, subtle room tone | Never use a jarring constant alarm |
| UI request | Small click / airy movement | Should clarify interaction |
| Failure cascade | 2–3 layered gentle pulses | Support visual cause/effect |
| Pause before reveal | Drop music 0.5–1.0 sec | Silence is useful |
| Root cause | Low tonal resolve | Not a movie trailer explosion |
| Outro | Brief melodic resolution | Keep narration readable |

## Licensing and audit
- Store invoices/plan screenshots or rights URLs for chosen TTS voice/music/SFX.
- Avoid free TTS for monetized exports unless commercial permissions are explicit.
- Do not assume a music subscription covers all platforms and perpetual reuse; read exact license.
- Check YouTube's disclosure rules if using realistic synthetic reenactments or cloned voices; ordinary non-realistic animation generally differs from photorealistic altered content.
