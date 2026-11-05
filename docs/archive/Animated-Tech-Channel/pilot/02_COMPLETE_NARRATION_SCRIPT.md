# Pilot E001 — Original Narration Draft
**Working title:** Two Customers Bought the Last Item — Here's Why  
**Nature:** Fictional educational reconstruction, not a documented real incident  
**Version:** 1.0 draft; technical and performance review required before audio lock

> Production notes: Speaker directions appear in brackets. They are not spoken. Voice casting should be based on a 45-second test before making this recording. This is new material, not a paraphrase of the reference channel's transcript.

## Scene 1 — Two winners

There is one laptop left in stock. Just one.

At 9:00 in the morning, Maya opens the product page. Across town, Arjun opens the same page. Both see the words: **Only one left.**

Maya clicks Buy. Arjun clicks Buy almost at the same time.

A second later, both receive a confirmation.

Two successful orders. One available laptop.

[short pause]

That should have been impossible. The store's developers had checked the inventory before creating either order. The code even had an `if` statement to prevent buying something that was sold out.

So how did the system sell the same final item twice?

## Scene 2 — The checkout everyone understands

Imagine an online shop with three parts. First, the website where a customer clicks Buy. Second, a backend API that handles the request. And third, a database storing products, stock counts, and orders.

For a single customer, the logic sounds reasonable. The API asks the database how many laptops remain. The database replies: one. The API checks that the number is greater than zero. Then it creates an order, and updates the inventory.

One customer. One request. One item sold. The stock reaches zero.

In a quiet testing environment, this works every time. You click the button. The order appears. The product becomes unavailable.

The problem starts when the world refuses to take turns.

There is another subtle detail. The website is not the authority here. The words **Only one left** might be a perfectly accurate picture of the database a moment ago. But thousands of people can view the same page while the actual purchase decision happens later, on the server. Updating the front end faster would make the page feel more current. It would not, by itself, make two concurrent checkout requests safe.

## Scene 3 — The gap between two lines

Let's put two requests on a timeline.

Maya's request arrives first, and the API reads a stock count of one.

Before it finishes, Arjun's request arrives. His API worker also reads a stock count of one.

Notice what has not happened yet. Neither worker has reserved the laptop. Both are looking at the same earlier database state.

Maya's code asks, "Is stock greater than zero?" Yes.

Arjun's code asks exactly the same question. Also yes.

Both workers move forward, confident that the check has passed. If the application then creates an order without a correctly enforced stock-allocation rule, both orders may be accepted.

The two requests did not need to arrive on the exact same nanosecond. They only needed to overlap in the small window between checking and changing shared state.

That is the race condition.

Think of two people looking through the same window into a room with one chair. Each sees the empty chair. Each decides to sit down. Looking was not the same as claiming it.

In software, the window is the database read. The decision is the application check. And claiming the chair is the operation that must finally enforce the rule. If there is no shared mechanism between those steps, even well-written code can make the wrong business decision.

[brief pause]

The `if` statement wasn't lying. Each request evaluated the value it had received. But that value was not a promise that the item would still be available when the request acted on it.

## Scene 4 — How an engineer catches it

Now imagine the support team sees two paid orders but only one product on the shelf.

The first guess is often a front-end bug. Maybe someone double-clicked. Perhaps the browser resent a request.

Those are possible problems, but they do not explain this evidence: two different customers, two request IDs, and two backend workers that both logged the same stock count.

In our fictional incident, the logs show the sequence clearly.

At 09:00:00.101, worker A reads stock equals one.

At 09:00:00.108, worker B reads stock equals one.

A moment later, each worker proceeds to create an order.

The critical mistake is not that there were two requests. The system was built to handle thousands of them.

The mistake is that checking and allocating the final item were separate operations without a shared rule the database could enforce atomically.

## Scene 5 — One gate that cannot be passed twice

Instead of asking the database whether stock is available, and then trusting that answer for later, make the change itself conditional.

On SQL Server, one simple teaching example is an update that says: reduce stock by one, **but only if stock is still greater than zero**.

Then check how many rows the statement changed.

If the update changed one row, this request reserved the available unit. If it changed zero rows, there was nothing left to allocate.

Why does that matter?

Because the condition and the change happen as one database statement. Two competing requests cannot both decrement the same row from one to zero using that guarded update. Only one can obtain the last unit; the other must fail the guard or wait and then see that it can no longer succeed.

The stock allocation, however, is only part of checkout. Creating the order must be consistent with that allocation. When both records are in the same database, place the stock update and order insert within an appropriate database transaction. If something fails before commit, roll the work back.

This protects the invariant: do not commit a successful order unless its inventory allocation has also been committed.

## Scene 6 — The problem after the problem

You might think we are finished.

But consider a different failure. The customer presses Buy, the server successfully allocates the item, and the network drops before the browser receives the result.

The browser retries.

If the backend treats every retry as a completely new purchase, we have a different kind of duplicate order.

That is where an **idempotency key** helps. The client sends a stable identifier for one purchase attempt. The server stores and checks that identifier so a repeated request can return the prior result instead of repeating the business action.

And when payments or email notifications are involved, one database transaction cannot magically include the entire external world. A payment provider and a SQL database are separate systems. Production designs may use reservation states, idempotent payment calls, transactional outbox patterns, and compensation or expiry processes to keep the workflow consistent.

These design details depend on the product. The important point is that a database lock is not a complete checkout architecture.

There is one more case to think about. If a buyer starts checkout, reserves stock, and then disappears without paying, the store needs a way to release that reservation. Otherwise the product is not oversold; it is simply trapped. A proper reservation usually has a state, an expiration policy, and a recovery process. Engineering is not just about stopping one race. It is about making the whole lifecycle behave correctly, even when people close tabs and networks fail.

## Scene 7 — The real lesson

Let's return to the two customers.

Maya clicks Buy. Arjun clicks Buy.

They can both see one item on the screen. That's fine. A product page is information, not a guarantee of ownership.

But at checkout, they meet the same atomic stock-allocation rule. One order can reserve the final laptop. The other receives an honest out-of-stock response.

A good system isn't a system where requests never overlap.

It's a system where overlapping requests still obey the rules.

[brief silence]

The next time you see **Only one left**, remember: that number is easy to display. Making sure it can be purchased only once is the engineering.

---
## Technical annotation — illustrative SQL, not voiceover
```sql
BEGIN TRANSACTION;

UPDATE dbo.Inventory
SET Stock = Stock - 1
WHERE ProductId = @ProductId AND Stock > 0;

IF @@ROWCOUNT = 0
BEGIN
    ROLLBACK TRANSACTION;
    -- Return out of stock; do not create order.
    RETURN;
END;

INSERT INTO dbo.Orders (OrderId, ProductId, CustomerId, Status)
VALUES (@OrderId, @ProductId, @CustomerId, 'Reserved');

COMMIT TRANSACTION;
```
**Caveats:** This demonstrates a guarded single-row inventory decrement and transaction boundary. Real systems must handle errors/deadlocks, uniqueness constraints, idempotency keys, order cancellation/expiry, inventory units/warehouses, payments and external side effects. Avoid a blanket claim that `@@ROWCOUNT` alone solves checkout.
