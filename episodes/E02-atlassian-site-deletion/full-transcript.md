# The Cleanup Script That Deleted 883 Sites — full transcript

Production transcript for E02, target runtime **12–15 min** (estimate below: ~13:50).
Spoken text is verbatim VO. Blockquotes are production notes (scene, props, clock,
SFX) — never spoken. `[TAG]` lines are dramatized dialogue, labelled on screen.

- Voice: narrator = arjun/Akash (`cc71692b-f326-499b-8f8f-90a415b4d3fb`), speed 0.92,
  pauses 400–900 ms between beats; dramatized lines use maya/Lauren where tagged.
- Facts: Atlassian [April 2022 post-incident review](https://www.atlassian.com/blog/how-we-build/post-incident-review-april-2022-outage).
  Invented dialogue and the preview-UI design are labelled dramatized/proposed.
- Grammar: `qwen/reference-design-schema.md`. Clock spine (UTC chip), semantic
  green/amber/red, monitor glow, grain + vignette, product-faithful UI, line-art
  analogy interlude, prop callbacks: the green ✓, the green "OK", the site card.
- Cold open reuses `composition/src/ColdOpen.tsx` scenes, extended with the
  14-days consequence line (beat 1 below is the superset).

---

## Beat 1 · Cold open — consequence first (~1:08)

> Scene: phone-in-hand ticket prop (pouria grammar) → clock rewind 07:46→07:38 →
> terminal green log → SCOPE flip red, `delete SITE … → OK` → 0→883 counter over
> collapsing site cards, arjun shock in red glow → #incident chat → title card.
> SFX: tick on rewind, alert on counter, tick per chat message. Hold title 2 s.

At seven forty-six in the morning, a customer opened a support ticket. Their entire site was gone. Not one project. Not one board. The site. The place their company kept its work.

Eight minutes earlier, a maintenance script had started its second batch. The first batch went exactly as planned. Same script. Same green checks. But the second list did not point at apps. It pointed at the sites themselves.

Eight hundred and eighty-three sites. Deleted in twenty-three minutes. Seven hundred and seventy-five customers.

And the monitoring said nothing. Because deleting a site was a normal workflow. No alarm fired. No dashboard turned red. The system reported a routine job, running normally.

Some of those customers would wait fourteen days to get their work back. This is how a routine cleanup became a fourteen-day recovery. And the one check that would have stopped it.

> Title card: "The cleanup script that deleted 883 sites" · "23 minutes to delete ·
> 14 days to restore". Green "batch 01 ✓" chip flips to red "batch 02 ✗".

## Beat 2 · The home and the app (~1:51)

> Scene: line-art analogy interlude (pouria grammar): a box = customer site, a card
> inside = Insight app. Pull the card out; the box stays. Then product-faithful
> site card with Jira/Confluence/users/attachments chips. Warm paper palette for
> the interlude only; night palette returns for the interface reveal.

Start with what a cloud site is. Think of it as a home for a customer's Atlassian products. Jira lives there. Confluence lives there. Users, permissions, files, settings — all tied to that one address.

For the customer, that home is not abstract. It is every ticket their support team ever answered. Every decision their engineers wrote down. Every file somebody attached at two in the morning. It is the company's memory, at one URL. And for some of those customers, there was no second copy. The site was the archive.

Now picture one app inside that home. It was called Insight. Atlassian was retiring an older version of it. The job was simple to say: take the old app out, leave the home standing.

On screen: a box, and a card inside the box. Pull the card out. The box stays. That was the whole plan.

The maintenance script called a deletion interface to do it. And here is the detail the entire incident turns on. That interface accepted two kinds of identifier. Give it an app ID, it removes one app. Give it a site ID, it removes the home.

Both inputs were valid. Both returned success. The tool had no opinion about which one you meant. Same endpoint. Same call. Same green response. Only the identifier decided how much disappeared.

The plan depended on the list pointing at the right kind of object. Nothing in the tool enforced that. It was a promise made in a spreadsheet, kept by humans. And spreadsheets do not fail loudly.

> Prop planted: two ID chips, identical shape, one labelled APP, one SITE — labels
> fade out, leaving two opaque values. Callback in beat 4 and beat 8.

## Beat 3 · Three green checks (~1:45)

> Scene: product-faithful review thread (approve stamps), staging run console,
> batch-01 success panel. Three checks light green one at a time, word-synced.
> Clock chip: APR 5 · 07:31 UTC. Each check's "narrow question" appears as a
> mono caption under it; the dangerous question appears last, in amber, unanswered.

Now, the part that makes this worth studying. Because this script was not reckless. It was reviewed.

The peer review looked at the endpoint and how the script called it. The code was correct. The reviewers did not check what the production identifiers would resolve to. That question was not on the checklist. And honestly, reviews are built to catch wrong code, not wrong data. The code was the part everyone knew how to check.

Then staging. The script ran there and behaved. But the production identifiers did not exist in staging. So staging could not tell anyone what those exact values would select in production. It tested the tool. It could not test the list.

Then the first real batch. Thirty sites. The old app came out. Every site stayed up. That success is the most dangerous check of the three. It proves the last list was right. It says nothing about the next one.

Look at the three green checks an engineer sees that morning. Review complete. Staging tested. First batch successful.

Each check is real. Each one answers a narrower question than the team needed answered. Review asked: is the code right? Staging asked: does the tool work? Batch one asked: did the last list behave?

Nobody asked the question that mattered: what does each identifier in the next list actually select?

Three green checks. Zero answers to the dangerous question. And the second batch was already queued.

> SFX: soft tick per check. The amber question stays on screen 1.5 s in silence.

## Beat 4 · The second list (~1:38)

> Scene: two columns of opaque IDs side by side, no labels. Resolve-one-input
> animation twice: app path (card leaves box, green OK) then site path (whole box
> collapses, green OK). Terminal rows scroll; every row returns OK. Clock 07:38→07:44.
> The green OK is the ironic prop: keep it green while the scope turns red.

According to Atlassian, a miscommunication put site identifiers into the list where app identifiers were intended.

Put the two lists side by side. Two columns of opaque values. No label says "this one is a home." A reviewer staring at a single ID has no obvious clue about the size of the thing it points at. The scope only exists after you resolve it against the system's records. Watch the labels fade. This is what the operator actually sees: values, not objects.

So follow one input through.

First run: the input resolves to the Insight app. The app disappears. The site remains. Green OK.

Second run: the input resolves to the customer site. The same interface acts on the larger object. The site disappears. And the script moves to the next row. Green OK. Nothing in the log separates those two rows. Same status, same shape, same silence.

That is why a successful return can lie to you. "OK" means the tool did exactly what it understood. It does not mean the tool understood what you meant.

At seven thirty-eight the batch starts. Rows resolve. Rows delete. Every row returns OK. The console looks healthy while it eats eight hundred and eighty-three homes. Twenty-three minutes from first row to last.

A production check has to compare the result against the intent. Not against the return code.

## Beat 5 · First clues (~1:43)

> Scene: #incident chat (BugX grammar, wojak avatars) escalating 07:46→08:17;
> monitoring dashboard flat green beside it (the irony); support-form UI with
> required "Site URL *" field and a blinking cursor with nothing to type.
> Dramatized call: phone prop, two voice lines, on-screen label DRAMATIZED.

The first clue did not come from a dashboard. It came from a customer.

Seven forty-six. The job is still running. A ticket lands: our entire site is gone. Then another. Then the pattern nobody wants to see: it is not just one customer.

Atlassian's internal monitoring missed it, because the sites went away through a standard workflow. The platform had a normal path for removing a site. That morning, hundreds of sites walked down it for the wrong reason. Nothing looked abnormal. Everything was abnormal.

Eight seventeen: the major incident process begins. Eight fifty-three: the team connects the support report to the maintenance script. Eight minutes from batch start to first ticket. Thirty-nine minutes to a declared major incident.

And then a cruelty worth sitting with. The deleted records included some of the information used to contact the people affected. And the normal support form asked for a valid cloud URL for your site.

Read that again. The front door to support expected the very thing you were trying to report missing.

> On screen: form field "Site URL *" · cursor blinks · customer has nothing to type.

[DRAMATIZED SUPPORT CALL]
CUSTOMER (maya): I can't file the form. It wants our site URL. Our site is what's missing.
SUPPORT (arjun): I know. Stay on the line. We'll find you another way in.

Every workaround was manual. Every conversation cost time the recovery did not have. So the recovery team had two jobs at once. Bring the sites back. And rebuild a way to reach the people who owned them.

## Beat 6 · Seventy steps (~1:50)

> Scene: site anatomy exploded view (catalogue record, identity, users/groups,
> product DBs, attachments, billing/support, third-party apps) as connected cards;
> new-site route draws dangling references that must be remapped one by one.
> 70-step checklist montage, steps tick slowly; day-counter clock APR 5→APR 8;
> arjun fatigue holds (mug gesture, monitor glow dimming). Paper palette for the
> checklist only, like a runbook on a desk.

Here is what "restore a site" actually means.

A site is not one row. It is a catalogue record that says the site exists. Identity settings. Users and groups. Product databases. File attachments. Billing and support systems. And apps made by other companies that still point at the same site.

Many of those connections hang off a stable identifier. Change the identifier, and every reference has to be taught the new address.

The first recovery route did exactly that. Make a new site for each deleted one. Restore product data and configuration into it. Then chase every old reference and remap it. Attachments back to the right site. Permissions back to the right users. External apps, again, by hand. And every remap is a chance to introduce a new mistake. Point an attachment at the wrong site, and you have built a second incident inside the first one.

Atlassian describes this route as roughly seventy individual steps. Some automatable. Many dependent on earlier steps finishing in the right order.

The team split in two. One group proved the steps on a small set. The other turned proven steps into automation for batches. April fifth to April eighth: three days just to prove the route on a handful of sites.

April eighth: the first customers come back. Real progress. You can feel the relief in the room.

And then the math lands. If every site needs that much remapping, the remaining hundreds stretch into weeks. The route works. The route does not scale.

> Day counter holds on APR 8 with "sites remaining: hundreds" in amber. Beat of silence.

They needed a different starting point.

## Beat 7 · Keep the identity (~1:37)

> Scene: original site card returns with the SAME ID chip; dangling references
> reconnect on their own, one by one, green. Side-by-side step counter: 70 → 34
> ("more than half removed", source-labelled). Validation montage: support
> engineers log in, open projects, open attachments. Clock APR 8→APR 18.

The second route asked a quieter question. What if we rebuild the deleted records and keep the old identifiers?

Bring back the original site card. Same ID it had before. Now every record that points at that ID can reconnect on its own once the related services and data are restored. No chasing. No remapping. The references were never wrong. The site was just missing. The identifier was the thread holding the whole system together. Cut it, and you re-sew every connection by hand. Keep it, and the system remembers how to assemble itself.

Atlassian says reusing identifiers removed more than half of the seventy steps.

It was still serious engineering. Reconstruct records across services. Test the procedure. Run long operations in parallel where possible. Then check that each site actually works before handing it back — because a database being online is not the same as a customer being able to log in and see their projects.

Support engineers helped test recovered sites and hand them to customers. A site was not done when its database answered. It was done when a customer logged in and found their work waiting.

April eighteenth: all affected sites progressively restored.

The recovery turned on a design detail most customers never see. Keeping a site's identity meant less work putting the system back together. Identity was the recovery plan.

> Prop callback: the site card from beat 2 returns, unchanged, ID intact.

## Beat 8 · The check I would add (~2:13)

> Scene: proposed preview UI (labelled PROPOSED DESIGN): rows of ID · resolved
> type · effect; summary line "883 sites selected" in red; job halts before any
> change. Then type-check rejection row, small-batch gate, between-batch reach
> check, soft-delete tray. End on terminal: green "OK" chip alone on black.

Now put yourself back just before the second batch. And imagine one more screen.

A preview. Every row shows the identifier, the type of object it resolves to, and the effect of the operation. The summary line reads: eight hundred and eighty-three sites selected.

The operator expected apps. The job stops before it changes anything. One screen, thirty seconds, zero deleted homes. No heroics. No recovery. Just a question asked before the damage, instead of after.

That is a proposed design, drawn from the incident. The platform could enforce the same rule inside the interface. A job whose intent is to retire apps gets permission to retire apps. If a row resolves to a site, reject the row. Hard limits. Small batches. A check between batches that each site is still present and reachable.

Then add a way back. Atlassian committed to wider soft deletion — records first move into a recoverable state — and to practicing multi-site recovery at scale.

Each control catches a different failure. Preview catches wrong intent. Type checks catch wrong targets. Recovery practice tests what happens when prevention fails anyway.

So here is the check I would add to your next maintenance job. Before it runs: show me the exact production objects this job will change. Can you tell me whether that list matches the plan? Ask it every time the input changes — even when the code and the last run looked fine.

And ask the second question: if we have to undo this across the whole batch, who runs that recovery, and when did we last prove it works?

The first batch used the right list. The second batch used a different one. The clue was there before the run, in what the identifiers referred to.

The tool said OK. It always says OK. That was never the question.

> Final frame: green "OK" chip on black, 2 s, then cut. End card: source link +
> "the check worth putting in the tool" + subscribe prop (the ✓ chip, now amber).

---

## Runtime estimate

| Beat | Spoken words | Est. screen time |
|------|-------------|------------------|
| 1 cold open | 152 | 1:08 |
| 2 home & app | 267 | 1:51 |
| 3 green checks | 247 | 1:45 |
| 4 second list | 232 | 1:38 |
| 5 first clues | 242 | 1:43 |
| 6 seventy steps | 263 | 1:50 |
| 7 keep identity | 232 | 1:37 |
| 8 the check | 315 | 2:13 |
| **Total** | **1,950** | **~13:48** |

Speech at ~2.45 words/s (sonic-3.6, speed 0.92) plus 400–900 ms inter-beat pauses
and the marked silent holds (~32 s total). Word counts measured from the verbatim
VO above. Lands inside the 12–15 min target with room for slower delivery; if a
render runs long, trim beat 6's anatomy list first.

## YouTube chapters (approximate)

0:00 The ticket at 7:46 · 1:09 The home and the app · 3:00 Three green checks ·
4:46 The second list · 6:24 First clues · 8:07 Seventy steps · 9:58 Keep the
identity · 11:36 The check I would add

## Title / thumbnail

- Title: "The Cleanup Script That Deleted 883 Sites" (alt: "883 Sites Deleted in
  23 Minutes — The Green Checks Lied").
- Thumbnail: arjun shock close-up left, red 883 counter right, terminal prop with
  green "OK" between them; night palette, warm monitor glow, grain. Same family
  as `qwen/audit-2026-11-11/thumbs/`.

## Next production steps

1. Split beats into `narration/segments.json` (per-beat ids, speaker/shot/expression
   tags like `host/narration/segments.json`), synthesize with `studio/tools/tts.mjs`.
2. Build scenes per beat on the incident design system; reuse ColdOpen scenes for
   beat 1; new scene types: analogy interlude, review/staging UI, exploded site
   anatomy, checklist montage, preview UI.
3. Render, verify by mp4 frame extraction (not `remotion still`), captions via
   `toSrt(clock, …)`, chapters above.