# 03 — Software Stack, Budget, License Gates
**Prices checked:** 3 Nov 2026; confirm checkout currency, taxes and terms before paying.

## Recommended **existing-subscription-first** stack
| Step | Tool | What you already have / typical cost | Decision |
|---|---|---|---|
| Research, prompts, coding | ChatGPT + Codex | Existing ~$20/mo subscription; **usage-limited, not API credits** | Keep |
| Programmatic motion graphics | [Remotion](https://www.remotion.dev/docs/) | Free commercial license for qualifying individual/small teams (read terms) | **Primary** |
| Optional graphics specialty | [Motion Canvas](https://motioncanvas.io/docs/) | Free and open source; strong for voice-synced vector animation | Backup/alternative, not both in pilot |
| Final edit and audio mix | Adobe Premiere Pro | Existing subscription | **Primary** |
| Optional After Effects | Adobe After Effects | Only if **your specific Adobe plan includes it**; Premiere alone does not automatically grant it | Optional for hand-crafted special scenes |
| Alternate editor | Wondershare Filmora | Existing license; AI features may use separately metered credits | Keep as fallback, no double edit |
| Narration | Own voice + Premiere Enhance Speech | Already paid (assuming microphone/device) | Test against AI |
| Narration (AI, commercial rights) | [Cartesia Pro](https://www.cartesia.ai/pricing) | Advertised **$5/mo**, ~133 Sonic TTS minutes / month, commercial license | **First paid voice audition** |
| Alternate AI narration | [ElevenLabs Starter](https://elevenlabs.io/pricing) | Advertised **$1 first month, then $6/mo**; 30k credits and commercial license | Compare one 45-sec excerpt |
| Assembly/inspection | FFmpeg, Python | Free | Keep |
| Fonts, icons, music | Self-created / licensed sources | $0 or per-license | Log rights |

### Cost scenarios (excluding subscriptions you already pay, taxes, storage, hardware)
- **Test without uploading commercially:** $0 additional using your own narration and free motion tools.
- **First commercial pilot with paid voice:** about **$5–$6 additional per month** if the pricing/license applies to your account.
- **If you add stock, premium TTS, AI video or paid music:** variable; postpone until pilot quality/retention justifies it.
- Free **TTS** plans may lack commercial rights. Do not build a monetized video using a free-plan voice without verifying the license.

## Important technical constraints
- A $20 Codex/ChatGPT subscription **does not include unlimited external API calls**. Signing into Codex with the ChatGPT account consumes plan allowance; OpenAI API billing is separate.
- Remotion rendering needs local Node.js, Chromium/FFmpeg dependencies, and adequate RAM/CPU. Check Windows compatibility and GPU/memory on your own PC.
- Premiere's transcript-based tools edit real dialogue clips; they do not automatically invent or animate storyboards.
- Direct `.prproj` generation from AI is not the initial workflow. Export rendered clips plus WAV stems and optionally a validated XML/EDL for human-import, instead of relying on fragile proprietary project generation.

## Official confirmation URLs
- Codex subscription and usage: https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan
- Remotion legal/license: https://www.remotion.dev/docs/license/pricing
- Remotion quickstart: https://www.remotion.dev/docs/
- Motion Canvas description: https://motioncanvas.io/docs/
- Premiere transcript editing: https://helpx.adobe.com/premiere/desktop/edit-projects/edit-video-using-text-based-editing/overview-of-text-based-editing.html
- Premiere Enhance Speech: https://helpx.adobe.com/ae_en/premiere/desktop/add-audio-effects/adjust-volume-and-levels/enhance-speech.html
- Premiere/After Effects Dynamic Link: https://helpx.adobe.com/after-effects/desktop/work-with-other-applications/work-with-dynamic-link/dynamic-link-effects.html
- Cartesia pricing: https://www.cartesia.ai/pricing
- ElevenLabs pricing: https://elevenlabs.io/pricing

## Purchasing rule
Only upgrade after a same-script A/B voice test, with explicit check of (a) commercial rights (b) total narration regeneration cost (c) pronunciation (d) final mix quality. Avoid signing up for five overlapping tools.
