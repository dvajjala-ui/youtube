# 15. Voice, Audio And Rights

Voice and music are where a $0 channel quietly breaks its own rules. This file has the verified
commercial-use terms, the audio chain that works on Windows, and the rights checklist your existing
docs do not contain — including the one that can end a career rather than a channel: leaking real
customer data in a terminal capture.

---

## 1. Voice decision, restated with the policy facts

Your plan already says "record your own voice" (`docs/00-README.md` §4, `docs/05`, `docs/10`). That is
still right, and now it is defensible rather than merely cautious:

- Cloning **your own** voice for voiceover is explicitly listed by YouTube as **not requiring** an
  altered/synthetic disclosure.
- AI-voiced content is monetizable when the work is original; the July 2025 "inauthentic content"
  policy targets template sameness and unverifiable authorship, not AI use.
- Cloning **anyone else's** voice is a separate problem: ElevenLabs requires you to hold the rights or
  consent of the voice owner, and impersonating a real person saying something they did not say is
  both a disclosure trigger and an impersonation risk. Never clone the reference creator.

So the ladder, cheapest-risk first: your own voice → your own cloned voice (later, for pickups) →
licensed AI voice you pay for → never someone else's voice.

---

## 2. TTS pricing and commercial rights (verified 2026-11-03)

| Provider | Price | Commercial rights | Trap |
|---|---|---|---|
| **ElevenLabs** | Free $0 (10K credits) · **Starter $6/month** (30K) · Creator $22 (121K, $11 first month) · Pro $99 · Scale $299 · Business $990 | Commercial license starts at **Starter** | The **free tier is non-commercial and requires attribution**, so it cannot legally carry a monetized video. `docs/08` still quotes the old $5 Starter price |
| **Cartesia Sonic** | Free · **Pro $5/month** · Startup $49 · Scale $299. Roughly 1 credit per character, about 750 to 800 credits per minute of audio | Commercial from Pro | Indian-English quality is unverified; audition with your own script before paying |
| **OpenAI TTS** | API only: `tts-1` $15/1M characters, `tts-1-hd` $30, `gpt-4o-mini-tts` $0.60/1M text in plus $12/1M audio out | Output is yours | A 20-minute narration is about **$1.40**, which is cheaper than a subscription if you publish twice a month |
| **Kokoro-82M** | $0 | **Apache-2.0**, free commercial | Quality varies by voice; use for timing drafts |
| **Piper** | $0 | MIT | Robotic; scratch only |
| **Coqui XTTS v2** | $0 | **Non-commercial license** | Do not use in a monetized video. This is the trap your docs do not mention |
| **Meta Enunciate** | $0 | CC-BY-NC | Same trap |

**Practical answer:** record your own voice and spend $0. If you later want AI narration, $6/month
ElevenLabs Starter or $5/month Cartesia Pro are the smallest compliant commitments, and OpenAI TTS
pay-as-you-go is the cheapest per-video if you publish slowly.

---

## 3. Recording and cleanup chain on Windows

| Stage | Tool | Cost | Note |
|---|---|---|---|
| Microphone | Any dynamic USB mic in a closet-or-blanket setup | one-time | A dynamic mic in an untreated room beats a condenser in a bad room |
| Noise removal and enhancement | **Adobe Podcast Enhance** free tier | $0 | About 500 MB / 30 minutes per file and roughly 1 hour per day. The standalone Premium product was **discontinued 2026-08-30** and folded into Firefly Pro at $19.99/month |
| Editing and mixing | **Audacity** (GPL-3.0) or **DaVinci Resolve Fairlight** | $0 | Resolve Free includes Fairlight. Resolve **auto-captions are Studio-only** |
| Optional DAW | **Reaper** | 60-day evaluation, then **$60** discounted license (personal use or under $20K revenue from use), $225 commercial | DRM-free, and the discounted tier genuinely applies to you |
| Final assembly audio | Premiere Pro | already paid | Parametric EQ plus compression, as `docs/05` describes |

**Loudness target: about −14 LUFS integrated with a true peak at or below −1 dBTP.** YouTube
normalizes loud uploads downward, so a hotter master buys you nothing and costs you dynamics. Note
that YouTube's own help page on LUFS currently 404s, so this number comes from Youlean's guidance and
the AES R128 convention rather than a live official page — treat it as a working standard, not a
quoted rule.

---

## 4. Music, sound effects and image rights

### Music and SFX

| Source | Terms | What to watch |
|---|---|---|
| **YouTube Audio Library** | Usable in monetized videos; **CC-licensed tracks require attribution in the description** | YouTube states Audio Library tracks will not be Content-ID claimed (reported, not a guarantee) |
| **Pixabay** | Content License, commercial use, no attribution | **No indemnity** — if it is claimed, that is on you |
| **Freesound** | Mixed per-sound: CC0, CC-BY, and **CC-BY-NC** | Check each sound. NC sounds cannot be used in a monetized video |
| **Epidemic Sound** | Personal $9.99/month, Personal Pro $14.99, Commercial $49.99 | Clearance is tied to the **publish date while subscribed**. Videos published during your subscription stay cleared; downloaded-but-unpublished assets stop being usable after expiry. Renew or re-download before publishing |
| **Artlist** | Music and SFX from about $9.99/month, Max from $39.99 | Same publish-date logic |

**The whoosh problem.** Your format calls for a sound effect every 3 to 5 seconds — risers, whooshes,
keyboard clacks, UI clicks. Generic SFX packs get registered by aggregators and then trigger **false
Content ID claims**, which divert revenue on a video that took you 40 hours to make. Mitigation: use
CC0 or explicitly non-claiming packs, keep license receipts in the repo alongside each episode (the
`templates/rights_manifest.csv` you already have is exactly the right instrument), and dispute with
proof rather than muting your own video.

### Character art and logos

- The reference channel's thumbnails use the reddit-sysadmin **Wojak** idiom. Wojak itself is
  anonymous meme art in a gray zone, but **Pepe is copyrighted by Matt Furie**, and the "doomer /
  sysadmin character packs" circulating online are somebody's artwork, often sold without rights.
  Do not drop a purchased or downloaded pack PNG into a monetized thumbnail. Draw or generate your own
  bald-line-art persona in Photoshop or Firefly, and keep the source file in the repo as proof.
- **Brand logos** (Kubernetes helm, Google, AWS) in thumbnails and diagrams are generally nominative
  use, but do not imply endorsement, do not restyle a company's mark as your channel mark, and prefer
  official logo assets from the project's own press/brand page.
- **Adobe Firefly** is the low-risk generator for a monetized channel because Adobe provides
  indemnity-style commitments on its training data. Midjourney requires a paid plan for commercial
  use, and companies over $1M gross revenue need Pro or Mega.

### Reconstructed incidents: the accuracy and defamation layer

- YouTube's disclosure rule bites when a **realistic** depiction of a real event or place could
  mislead viewers into thinking it actually happened. Your animation is stylized, which is the
  non-required case — but if you name a real company and show a plausible outage, tick the disclosure
  and label the video a reconstruction anyway. It is cheap, it is honest, and it is what the
  reference creator does with "some details have been oversimplified".
- Keep a source log per episode (you already have `templates/source_log_example.csv`). Every factual
  claim about a named company should trace to a published postmortem, status page, or their own
  statement. Anything you inferred goes in the script as inference, not as fact.
- Safer default for your first videos: **fictional companies, real mechanisms**. You keep the stakes
  and lose the liability.

### The one that ends careers

Before any terminal, log or editor frame goes into a video, scrub it. Real captures leak:

- connection strings, service principals, tenant and subscription IDs, storage keys, SAS tokens
- internal hostnames, IPs, URLs, and CI job names
- customer or company names in ticket IDs, table rows, and support logs
- your own employer's internal tooling names and Slack screenshots

Checklist before render: rotate or fake every secret, replace customer names with `ACME`-style
placeholders, use a demo subscription and demo data rather than production, and re-inspect at 400%
zoom on the exported frames — the text that is unreadable in the timeline is readable on a 4K phone.
Employer review is worth doing for the first few videos even if nobody asks.

---

## 5. Sources

[ElevenLabs pricing](https://elevenlabs.io/pricing) · [ElevenLabs publishing rights](https://elevenlabs.io/docs/help-center/legal/can-i-publish-the-content-i-generate-on-the-platform) ·
[Cartesia pricing](https://www.cartesia.ai/pricing) · [open-source TTS licenses](https://www.cartesia.ai/learn/open-source-tts) ·
[OpenAI pricing](https://developers.openai.com/api/docs/pricing) · [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) ·
[Adobe Podcast plans](https://podcast.adobe.com/en/plans) · [REAPER purchase](https://www.reaper.fm/purchase.php) ·
[Youlean loudness guidance](https://youlean.co/how-to-edit-a-video-to-achieve-good-audio-loudness-on-youtube/) ·
[YouTube Audio Library terms](https://support.google.com/youtube/answer/3376882) · [Pixabay license](https://pixabay.com/service/license-summary/) ·
[Freesound licensing](https://freesound.org/help/faq/) · [Epidemic pricing](https://www.epidemicsound.com/pricing/) · [Artlist pricing](https://artlist.io/page/pricing/max) ·
[Wojak (Wikipedia)](https://en.wikipedia.org/wiki/Wojak) · [YouTube GenAI disclosure](https://support.google.com/youtube/answer/14328491) ·
[Canva licensing](https://www.canva.com/licensing-explained/) · [Midjourney plans](https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans)
