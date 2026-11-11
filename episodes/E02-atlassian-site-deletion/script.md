# The Cleanup Script That Deleted 883 Atlassian Sites

Long-form narration draft. Chapter headings are production notes. The dialogue is original narration based on Atlassian's [April 2022 incident review](https://www.atlassian.com/blog/how-we-build/post-incident-review-april-2022-outage).

## 1. Two batches

The first batch went exactly as planned.

Thirty customer sites had an old Atlassian app removed. The sites themselves stayed up. The job had gone through review. It had been tested in staging. And now it had done the right thing in production.

Then the team ran the next batch.

At seven thirty-eight UTC on April fifth, twenty twenty-two, a maintenance job began working through a list. Twenty-three minutes later, eight hundred and eighty-three cloud sites had been deleted. Atlassian says seven hundred and seventy-five customers lost access. Some waited up to fourteen days.

What changed between those two runs?

To see it, look at what went into the script. Each run had a list of identifiers. Both lists looked plausible to the system. One list pointed to the old app. The other pointed to the places where customers kept their work.

And the tool knew how to delete either.

## 2. The thing the team meant to remove

Start with a cloud site. Think of it as the home for a customer's Atlassian products. People might open Jira there to track work or Confluence to read documents. There are users, permissions, files, settings, and services tied to that site.

Now picture one app inside it, called Insight. Atlassian was retiring an older version of the app. The intended task was to clean up that app, leaving the customer's site and everything else running.

On screen, imagine a site card with an app card inside it. Pull the app card out, and the rest of the site stays where it is. That was the operation the team wanted.

The maintenance script called a deletion interface. That interface accepted an identifier for the app, and it also accepted an identifier for the site itself. The second kind was a valid input for a much bigger operation.

The plan depended on the list pointing to the right kind of object.

## 3. What review and staging actually tested

This is the part that makes the incident worth studying. The script did go through peer review. The review focused on the endpoint and how the script called it. The reviewers did not check whether the production identifiers referred to apps or to entire sites.

The script also ran through staging. The identifiers in the production list did not exist there, so the staging environment could not tell the team what those particular values would resolve to in production.

Then came the first real run. It successfully removed Insight from thirty sites. Those inputs had been collected earlier, and they pointed to the apps as intended.

Imagine the three green checks an engineer might see. Review complete. Staging tested. First batch successful. Each check tells us something real. Each is also answering a narrower question than the team needed answered before proceeding.

The second list needed its own check. What would each of these exact production identifiers actually select?

## 4. The second list

According to Atlassian, a miscommunication led to site identifiers being supplied where app identifiers were intended.

Put both lists side by side. They are two columns of opaque values. Looking at a value by itself, a reviewer may have no obvious clue about the size of the thing it points to. The scope only becomes clear after resolving it against the system's records.

Now follow one input through the animation.

In the first run, the input resolves to the Insight app. The app disappears. The site remains.

In the second run, the input resolves to the customer site. The same interface acts on that larger object. The site disappears. And then the script moves on to the next row.

This is why a successful return from the interface can be misleading. It can mean the tool carried out the requested operation exactly as it understood it. A production check has to ask whether that result matches what the team actually intended.

## 5. The first clues

The run started at seven thirty-eight and completed at eight oh one, UTC. At seven forty-six, while it was still running, an affected customer opened a support ticket.

Atlassian says its internal monitoring missed the issue because the sites had been removed through a standard workflow. The platform had a normal path for taking a site away. On that morning, hundreds of sites went down that path for the wrong reason.

At eight seventeen the major incident process began. By eight fifty-three the team had connected the support report to the maintenance script.

There was another complication. The deleted records included some of the information used to contact the people affected. And the normal support form expected a valid cloud URL for the site. A customer whose site was gone could find that the front door to support expected the very thing they were trying to report missing.

The recovery team needed to restore sites and rebuild a way to reach their owners.

## 6. Why the backup was only the start

A site is represented in a surprising number of places. Start with a catalogue record that tells the platform the site exists. Add its identity settings, users and groups, product databases, and file attachments. Add the systems for billing and support. Then think about apps made by other companies that may also refer to the same site.

Many of those connections depend on stable identifiers. If a restored site gets a different identifier, all those references have to work again. A database can be back online while a customer still cannot see an attachment, use an integration, or sign in with the permissions they had before.

Think about what a customer actually needs on the other end. They need to visit their site, log in, see their projects, and keep working. A completed database restore is one step toward that result.

That is where the team hit the next hard question. They knew how to recover individual sites. How do you do that for hundreds of sites, each with its own combination of products and dependencies?

## 7. The first recovery route

The early approach started by making a new site for each deleted one. Then the teams restored product data and configuration into that new site.

Creating a fresh site also created a fresh identifier. Existing records elsewhere still pointed to the previous one. The team had to recover those records and remap their connections. A file attachment had to lead back to the right site. Access settings had to go with the right users. External apps made the job more complicated again.

Atlassian describes this route as roughly seventy individual steps. Some could be automated. Many depended on earlier steps finishing in the right order.

The team split the work. One group proved and carried out the restoration steps on a smaller set. Another turned those steps into automation so they could handle batches. The first customers were restored on April eighth.

That was real progress. It also exposed a limit. If every restoration had to move through that much remapping, the remaining work could stretch out for weeks.

## 8. The second recovery route

The team tried a different starting point. Could they rebuild the deleted records and keep the old identifiers?

On screen, bring back the original site card. Use the same identifier it had before. The records that refer to that identifier can now reconnect once the related services and data are restored. Compare that with the earlier approach, where every old reference had to be checked against a new address.

Atlassian says reusing the identifiers removed more than half the earlier steps. That approach still required serious engineering. The team had to reconstruct records across services, test the procedure, run long operations in parallel where it could, and check that each site actually worked before giving it back.

Automating the data restore also shifted some of the pressure to validation. Support engineers helped test recovered sites and handed them back to customers. All affected sites were progressively restored by April eighteenth.

The recovery turned on a design detail most customers never see. Keeping a site's identity meant less work to put the system back together.

## 9. A check that matches the danger

Put yourself back just before the second batch. Imagine the tool prints a preview. Every row shows the identifier, the type of object it resolves to, and the effect of applying the operation. The summary reads, “Eight hundred and eighty-three sites selected.” The operator expected apps. The job stops before it changes anything.

That is a proposed design, drawn from the incident. The platform could enforce the same rule in the interface itself. A job whose intent is to retire apps should have permission to retire apps. If its input resolves to a site, it should reject that row. A hard limit and small batches give the team a chance to notice an unexpected result before it spreads. A check between batches should verify that each site is still present and reachable.

Then add a way back. Atlassian committed to wider use of soft deletion, where records first move into a recoverable state. The company also called for practicing multi-site recovery at scale.

Each of those controls catches a different problem. Preview catches wrong intent. A type check catches wrong targets. Recovery practice tests what happens when a prevention control fails.

## 10. The check I would add

Think about the next maintenance job on your own team. Maybe it clears old storage, decommissions an integration, or removes a feature from a batch of accounts.

Before it runs, ask a specific question. If I show you the exact production objects this job will change, can you tell me whether that list matches the plan? The question applies every time the input changes, even when the code and the previous run looked fine.

Then ask a second question. If we have to undo the change across the whole batch, who can run that recovery, and when did we last prove it works?

The first Atlassian batch used the correct list. The second batch used a different one. In less than half an hour, a routine cleanup became a coordinated recovery across hundreds of sites. The clue was there before the run, in what the identifiers referred to. That is the check worth putting directly in the tool.
