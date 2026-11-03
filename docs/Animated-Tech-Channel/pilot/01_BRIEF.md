# Pilot E001 — Two Customers Bought the Last Item
## Audience promise
A relatable, animated checkout disaster reveals why checking stock in application code isn't enough when simultaneous requests race. Demonstrate an atomic SQL Server update and the remaining problem of duplicate payment retries.

## Classification
**Fictional educational scenario.** The company, customers, incident, numbers and dialogue are illustrative, not a claim about a real outage.

## Core idea
- Two app users both see `stock = 1`.
- Both ask to purchase; flawed service reads stock, checks positive, and later writes an order independently.
- Two orders appear for one item.
- Fix: atomic conditional update inside a DB transaction paired with an order insert; handle payment/webhook idempotency separately and coordinate external side effects safely.

## Educational goals
1. Distinguish UI availability from authoritative stock allocation.
2. Explain race condition with a precise interleaving timeline.
3. Demonstrate a correct stock-decrement guard on SQL Server.
4. Avoid presenting `SELECT` then `if (stock > 0)` as a concurrency guarantee.
5. Explain idempotency for retried requests, plus transaction/outbox considerations for payment workflows.

## Target
- English, ~7–9 minutes (timing to be finalized after voice recording; the provided initial script may read shorter/longer depending on delivery).
- 1920x1080 30fps; dark 2D schematic motion graphics; original narrator.
- Clip proof: first 45–60 seconds with stock counter, two buyers, request collision.
- Candidate title: **Two Customers Bought the Last Item — Here's Why**.
- Thumbnail: one product card `1 LEFT`, two competing arrows, small `2 ORDERS?` overlay.

## Accuracy / caution
- Actual database isolation, schema, inventory model and payment choreography matter; the SQL example is a small teaching model, not a complete production checkout architecture.
- A conditional UPDATE permits **one** decrement from an initial stock of 1, but whole-order consistency requires a DB transaction and a carefully designed payment/reservation process.
- No public company's name should be associated with this fictional scenario.

## References to verify while writing
- SQL Server UPDATE: https://learn.microsoft.com/en-us/sql/t-sql/queries/update-transact-sql
- SQL Server @@ROWCOUNT: https://learn.microsoft.com/en-us/sql/t-sql/functions/rowcount-transact-sql
- SQL Server transactions: https://learn.microsoft.com/en-us/sql/t-sql/language-elements/transactions-transact-sql
- Microsoft guidance on transaction isolation levels, rowcount and concurrency.
- Stripe/other payment processor documentation on idempotency (only if payment details are shown).
