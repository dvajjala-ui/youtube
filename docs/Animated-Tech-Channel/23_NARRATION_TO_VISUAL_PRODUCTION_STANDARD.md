# 23 — Narration-to-Visual Production Standard

## The fundamental rule
**The audience should see the thing the voice is explaining happen, not watch related stock footage.** Animation is a form of proof.

## Scene pipeline
1. Write the original *spoken* sentence and underline its technical claim.
2. Label the visual action: `introduce`, `move`, `compare`, `reveal`, `fail`, `restore`, or `proof`.
3. Specify initial/ending states, object IDs, duration, screen labels, and assertion that must be true.
4. Record or generate one clean narration take, review naturalness and technical terms, then obtain actual word/pause times.
5. Build Remotion animatics: boxes/lines/text first, no polish. Synchronize changes to the actual voice.
6. Add camera framing, original character assets, subtle ambience and SFX only after the visual claim is correct.
7. Render review frames; listen with eyes closed, then watch muted; both must communicate clearly.

## Example: E01 — sold twice (hypothetical reconstruction)
| Approx time | Spoken intent (not a fixed final script) | Visible state change | Verification |
|---|---|---|---|
| 0–06s | One product remains, two customers check out | Inventory label `1` and two customer cards | One initial item |
| 06–13s | Both check stock before either changes it | Two read requests reach database concurrently; both responses `1` | Both see same snapshot |
| 13–22s | Both independently assume success | Two pending orders are created in a *deliberately flawed* example | Clearly label design as flawed |
| 22–31s | The problem is a non-atomic read/check/write | Highlight split operations; reveal interleaving | No claim that every DB behaves identically |
| 31–43s | Replace check-then-write with a conditional atomic update | SQL statement on screen, then one update succeeds | Statement and rowcount are accurate |
| 43–55s | Second update affects zero rows | Remaining request fails and user gets sold-out message | Final stock `0`, not `-1` |
| 55–65s | The lesson: enforce invariant at persistence boundary | Wide final diagram with single order and rejection | DB atomicity assumptions disclosed |

**Illustrative SQL Server approach** (exact production behavior depends on isolation, schema, surrounding transaction and order creation logic):
```sql
UPDATE dbo.Inventory
SET Quantity = Quantity - 1
WHERE ProductId = @ProductId AND Quantity >= 1;
-- Require @@ROWCOUNT = 1 in the same transaction as order creation.
```
A zero-row update means no inventory reserved. Do not overclaim that the update alone solves cross-service payment/orders, exactly-once delivery or all distributed consistency problems.

## Natural voice checklist
- One thought per sentence; write the sentence as someone would say it aloud.
- Mix short and longer clauses; use contractions selectively.
- Replace jargon piles with a concrete physical consequence and an immediate definition.
- Insert real breathing room *after* meaningful revelations, not arbitrary breaks on every punctuation mark.
- Audition three voices blindly using identical copy, compare with headphones, and listen at 1.0× and phone-speaker level.
- Mark difficult pronunciations (`SQL`, `C#`, `p99`, `Kubernetes`, `Redis`) and test; ElevenLabs pronunciation dictionaries are one option, and provider features differ.
- Do not clone another creator's identifiable voice or pursue identical vocal mannerisms. Aim for thoughtful, warm, technically confident **original** narration.

## Sound mix guidelines (starting points, not universal standards)
- Dialogue highest priority; reserve peaks/headroom for platform encoding.
- Background music noticeably below speech, especially when introducing a definition.
- SFX indicate important system state (`received`, `failed`, `confirmed`), not every minor object motion.
- Listen on phone speaker, earbuds, and normal desktop volume; if words disappear in any of these, remix.

## Production definitions
- **Animatic:** rough shapes plus voice. Must be technically coherent.
- **Rough cut:** most scenes represented with real animation, temporary sound.
- **Picture lock:** scene order/timing approved; only finishing changes afterward.
- **Master:** final 1080p, 16:9 long-form, clear audio, rights-checked and correct.
- **Short cutdown:** separate 9:16 composition, reframed labels and pacing; not a blind central crop.
