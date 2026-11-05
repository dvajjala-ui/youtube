# 18 — 60-Second Pilot: The Last Item Sold Twice

**Status:** Production-ready **concept/board**, not a rendered video. Fictional technical demonstration; not a reported incident. **Format:** 1920×1080, 30 FPS, original dark-ui vector style. **Audience:** developers and curious technologists. **Promise:** explain a race condition visually, in plain English.

## Original narration (~120–135 spoken words; re-time to the approved voice)
> At 9:41, the store showed one laptop left. Two customers clicked Buy at almost the same moment. Both requests reached the API, and both read the same thing: stock equals one. So each request thought it was safe to continue. Two confirmations went out. But there was only one laptop.
>
> Here's what went wrong. The check and the update happened separately. Between those two steps, another request slipped through. Looking up the stock again in application code wouldn't fix the race.
>
> Instead, the database needs one atomic decision: decrease the stock only if it's still above zero. One customer succeeds. The other sees that nothing changed and gets an out-of-stock response. Same traffic. Different outcome. The fix isn't faster code. It's making the decision indivisible.

**Terminology check:** `UPDATE Inventory SET Stock = Stock - 1 WHERE Id = @id AND Stock > 0;` with affected-row count check is a demonstration for one-item stock decrements; production ordering also needs transactions/idempotency and appropriately modeled reservations/payment flows.

## Shot map (candidate timings; revise after TTS)
| Time | Narration beat | Screen + motion | Audio |
|---|---|---|---|
| 00:00–00:06 | 'one laptop left' | Store page; inventory badge `1`; slow push-in | Quiet room tone |
| 00:06–00:12 | 'two customers clicked' | Two human silhouettes, synchronized Buy actions, two request packets | Two restrained clicks |
| 00:12–00:20 | 'both read stock equals one' | Packets enter API nodes; split to two SQL reads; show two `Stock = 1` snapshots | Light ticking pulse |
| 00:20–00:27 | 'two confirmations…one laptop' | Two green receipts; one product icon; warning counter and brief hold | Drop music; subtle alert |
| 00:27–00:37 | 'check and update happened separately' | Two-step flow; expose gap between READ and UPDATE; one packet slips through | No extra SFX during key terms |
| 00:37–00:44 | 'looking up again wouldn't fix the race' | Alternate query appears and fails; dim misleading fix | One quiet muted error accent |
| 00:44–00:53 | 'one atomic decision' | SQL condition assembles progressively; DB gate grants one update; affectedRows `1` vs `0` | More confident underscore |
| 00:53–01:00 | 'decision indivisible' | Repeat original two-person shot; one success + one out-of-stock; final question/lesson | Soft resolving tone |

**Important:** These intervals are not word-accurate. Use audio waveform, measured duration and approved narration word timestamps to retime. The fixed spoken text may exceed 60 seconds with pauses at a slow speaking rate; tighten lines or use an ~63–70 second cut if needed rather than speeding the voice unnaturally.

## Asset inventory (all original)
- 2 simplified character silhouettes, one laptop icon, 2 CTA buttons, 2 request packets.
- Reusable `<InventoryCounter>`, `<RequestPath>`, `<ApiServer>`, `<DatabaseCell>`, `<SqlStatement>`, `<Receipt>`, `<RootCauseHighlight>` components.
- `voice.wav` as master stem, separate music and SFX stems.
- One original title card for upload; no third-party creator assets.

## Execution order / acceptance criteria
1. Read and fact-check narration; label fictional demonstration.
2. Compare 3 voices with the 45-second audition prompt; choose 1.
3. Generate `voice.wav` with approved commercial voice; export exact dialogue timing.
4. Codex builds scene components; render a rough 60-second animation.
5. Verify diagram accuracy, readable mobile labels and synchronized packet movements.
6. Mix in Premiere; no automated publish without human review.
7. Show 3 people with no context; ask them 'Why were two orders accepted? What fixed it?' Target 2/3 correct answers.

## Suggested title and packaging
**Title:** 'How One Laptop Was Sold Twice (A Race Condition Story)'
**Thumbnail:** One laptop / two green confirmation receipts / `STOCK: 1` (all assets original).
**Description:** Fictionalized engineering explanation. Atomic inventory updates prevent two simultaneous requests from both successfully consuming a single stock unit.
