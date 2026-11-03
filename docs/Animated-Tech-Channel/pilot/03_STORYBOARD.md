# Pilot E001 — Draft Storyboard / Shot Breakdown
**Provisional:** Timing must be conformed to the **approved recorded WAV**. These are creative beats, not measured cuts from Pouria.

| ID | Approx time | Narration concept | Animation / sound action | Asset / reusable component |
|---|---|---|---|---|
| S01 | 00:00–00:12 | Two buyers, one item | Two silhouettes approach same glowing item; faint ticking | Character, ItemCard |
| S02 | 00:12–00:25 | Two confirmations | Split screen, two green checks, inventory counter `1 → -1` in *flawed* simulation | SplitScreen, Counter |
| S03 | 00:25–00:50 | Why it seems impossible | Freeze frame, zoom on `STOCK = 1`; lower ambient sound | Camera, Highlight |
| S04 | 00:50–01:20 | Simplest checkout architecture | Client → API → DB nodes appear in sequence | ServiceNode, Packet |
| S05 | 01:20–01:48 | Normal single user | Correct path: read → reserve → order, labeled conceptual | Timeline, Database |
| S06 | 01:48–02:18 | Both view same stock | Two request lanes with identical DB read responses | SplitScreen, Timeline |
| S07 | 02:18–02:52 | Time difference matters | Simultaneous rows animate, highlight gap between read/check/write | Timeline, Callout |
| S08 | 02:52–03:30 | Flawed service logic | Code display `GetStock → if >0 → CreateOrder` as explicitly flawed pseudocode | Terminal |
| S09 | 03:30–04:10 | Database sees two order inserts | Illustrate valid individual requests but invalid business invariant | Database, Warning |
| S10 | 04:10–04:42 | How team investigates | Logs show same stock read and two request IDs; fictitious sample labels | Terminal, Callout |
| S11 | 04:42–05:15 | One atomic gate | Replace check/write with `UPDATE ... WHERE Stock > 0` | Database, SyntaxReveal |
| S12 | 05:15–05:55 | One succeeds, one fails | Two lanes converge on single stock row, one teal and one amber out-of-stock | Timeline, Packet |
| S13 | 05:55–06:26 | Order transaction boundary | Stock update and order insert inside same DB transaction | TransactionBox |
| S14 | 06:26–07:02 | Payments complicate | External payment network outside DB, retry/idempotency badge | ServiceNode, Packet |
| S15 | 07:02–07:35 | Outbox / stock reservation idea | Transaction commits; event dispatched after commit | ServiceNode, Queue |
| S16 | 07:35–08:05 | Three lessons | Big original labels: `Atomicity`, `Idempotency`, `Observability` | Callout, EndCard |

## Transition behavior
- Begin action without intro.
- Zoom to show critical state.
- Return to same split-screen when explaining fix to create cognitive comparison.
- Use one 0.5–1 sec silent beat before showing atomic update.
- Avoid placing SFX over SQL readout.

## Proof slice deliverables
- S01–S03 narration locked and voiced.
- 60 sec Remotion render with at least one character illustration and request-graphic visual.
- Premiere review with light SFX, music ducking and phone-readable labels.
- Two variants: more motion vs less motion, using same narration.
