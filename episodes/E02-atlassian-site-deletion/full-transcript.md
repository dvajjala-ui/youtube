# The Cleanup Script That Deleted 883 Sites

Full landscape episode script. The spoken lines below are verbatim for recording. Shot notes and holds are for the edit. The role labels and expressions are directions for casting and animation.

Arjun, Maya, Ellis, Vik, Sam, and Daniel are fictional characters in a dramatization. Their conversations are invented. Arjun's seniority is a casting choice. The official review does not identify the person who ran the script by seniority. The account lead represents customer outreach and support. Daniel represents the executive communication role. The actual April 12 update was published by Atlassian CTO Sri Viswanath. Screens use illustrative data, identifiers, and interface states. All incident times are UTC. [Atlassian post-incident review](https://www.atlassian.com/blog/how-we-build/post-incident-review-april-2022-outage)

## Beat 1 · The ticket

> **Shot `ticket`.** Frame one is a customer's cloud site failing to open. Match cut into a reconstructed support ticket with a new-ticket sound. Show April 5, 07:46 UTC. Keep the title card off the opening frame. Tag reconstructed screens and dramatized scenes when introduced.

NARRATION [concerned]: At seven forty-six on a Tuesday morning, a customer reported that they couldn't get into their Atlassian site. Eight minutes earlier, a maintenance job had started. It was supposed to remove an old app. The job was still running when the ticket came in.

> **Shot `desk`.** The mug stops halfway to Arjun's mouth. In the reverse shot, Sam's cursor pauses above the usual support instructions.

SAM [concerned]: Their whole team uses that address. What do I tell them to open instead?

> **Hold 700 ms.**

ARJUN [uneasy]: I can tell you what we were trying to remove. I need to check what we actually touched.

> **Shot `clock`.** Cut to the clock and three impact numbers, one at a time. Return to Arjun's desk before the title. Leave the input list hidden.

NARRATION [grave]: By eight oh one, the script had deleted eight hundred and eighty-three cloud sites. Seven hundred and seventy-five customers were affected. For some of them, getting back in took up to fourteen days. The first production batch had worked. To see what changed, we need to see what that first batch actually proved.

## Beat 2 · The job on paper

> **Shot `office`.** Establish Arjun in a wide shot. On the monitor, show the small maintenance task. Cut on his hand reaching for his coffee, then introduce Maya on the reverse.

ARJUN [dry]: My favorite kind of maintenance ticket is the one I can finish before my coffee gets cold. This one even had an existing script.

NARRATION [neutral]: Atlassian had brought the functionality of a standalone app called Insight into Jira Service Management. The old standalone installations still needed to be removed. If you're cleaning up one of those installations, you'd expect the rest of the customer's work to be there when you finish.

MAYA [focused]: Show me what we're removing. Start with what the customer sees.

> **Shot `site-map`.** Show a Jira-style demo site. Lift a small Insight tile out of its parent site card. Leave the cloud address, work items, and other product tiles visible. Focus the parent outline briefly.

NARRATION [neutral]: Picture the address your team opens to get to its work. That address takes you to a cloud site. You might get to Jira there, or Confluence, depending on what the team uses. Insight was an app installed for some of those customers. Take the old app away and the site should still open. In a change ticket, that sounds obvious. Once you're looking at a list of identifiers, you need a way to verify which object each identifier belongs to.

MAYA [dry]: I'll sign off on the little box. Leave my giant box where it is.

> **Hold 550 ms.**

NARRATION [neutral]: That was the job as everybody understood it. The interesting part is what the checks had actually looked at.


## Beat 3 · Thirty out of thirty

> **Shot `review`.** Show an illustrative code review focused on the call and how the script invokes it. Cut to staging. In the reconstructed checklist, distinguish `Call checked` from `Production targets checked`.

NARRATION [neutral]: The script went through peer review. The reviewers looked at the endpoint and how it was called. The script was also tested in staging. Staging didn't contain the production identifiers, so it couldn't tell the team which objects those identifiers would pick. It was still a sensible place to test the script. It left a separate question for somebody to answer before production.

> **Shot `first-batch`.** Show the first batch completing. The app tile disappears from each illustrative site card. Leave the parent cards intact. Arjun lifts the mug. Switch to a retrospective screen share when Maya asks about the next list. Hold Maya's expression after Arjun's answer.

ARJUN [relieved]: First batch. Thirty sites. The old app is gone and the sites are still there. I think I can finish this while the coffee's still technically a liquid.

MAYA [focused]: Where did the next list come from?

ARJUN [uneasy]: A handoff. The first list was collected earlier.

VIK [focused]: Then what have we checked about this list?

> **Hold 850 ms.**

NARRATION [neutral]: The thirty were real evidence. The process had removed the right app on those sites. The second batch was a separate set of production inputs. The review hadn't independently checked that each value in that set represented the thing the team intended to remove.

> **Shot `clock`.** Cut from the green first-batch summary to April 5, 07:38 UTC. Keep the second list out of focus until the screen share.

NARRATION [grave]: On April fifth, the next run began at seven thirty-eight. Let's look at what that list meant to the deletion service.

## Beat 4 · The other thing the service could delete

> **Shot `screen-share`.** Give Maya the large tile, with Arjun and Vik visible at the side. As Maya asks her question, shift to an over-the-shoulder view of the terminal. The review conversation is dramatized after the run. The terminal shows a simulated lookup, with no executable deletion command.

MAYA [focused]: Pull up one value from the second list. What does it resolve to?

ARJUN [uneasy]: One second.

> **Hold 650 ms.**

> **Shot `target-lookup`.** Fill the frame with `Resolved target   CLOUD SITE`. Hold before cutting to Arjun. Pull out to compare the nested app tile with its parent. Mark the simulated target lookup as a reconstruction.

ARJUN [shocked]: That's the whole site.

MAYA [focused]: And the same service knows how to delete that too?

ARJUN [grave]: Yes. An app identifier meant remove the app. A site identifier meant remove the site. Both were valid inputs to the same deletion interface. The second list came from a handoff between teams and contained the cloud site identifiers. There was no warning to make the caller confirm which kind of deletion it was asking for. The service did exactly what it had been asked to do.

> **Shot `clock`.** Replay 07:38, 07:46, 08:01, 08:17, and 08:53 as each event is spoken. Show the site outline dropping away on the first destructive operation. Use a quiet room tone when Arjun sees what it meant.

NARRATION [grave]: The script went through the list one site at a time. The support ticket came in at seven forty-six, while the job was still going. The run ended at eight oh one. Monitoring hadn't caught the deletion as an outage because it went through a standard workflow. Atlassian started its major incident process at eight seventeen. At eight fifty-three, responders confirmed the ticket and the script were connected.

ELLIS [focused]: I've got the timeline for the run. We can use that to check which sites we need to recover.

VIK [focused]: Get me the affected list. Sam, stay with the customers. Maya, find out what getting one site back actually takes.


## Beat 5 · The people waiting outside

> **Shot `support-form`.** Use a recognizable cloud support layout with one field in focus. On the fictional example, a missing site cannot pass the cloud URL check. Cut to Sam's face before returning to the form.

SAM [concerned]: The form wants a valid site address. That's the address they're calling us about. Can we get their case to someone without sending them back through this page?

VIK [focused]: Take the details you have. I need a way to track who's waiting and who owns the next update.

NARRATION [neutral]: Some affected customers couldn't create a new ticket through the usual route because it expected a valid cloud URL. Atlassian also reported losing access to some customer contact information. To the customer, both problems looked the same. Their work was gone, and they couldn't tell whether anyone knew their team was affected.

> **Shot `incident-call`.** Let the call breathe. Vik stops typing and looks at Sam before replying. Keep Maya's restore notes visible at the side.

SAM [strained]: I've got an account asking if they should tell their whole team to take the day off. What can I actually tell them?

VIK [steady]: Tell them we know the site's affected. Tell them when we'll check in again. I'll give you a recovery time when the team can stand behind one.

SAM [steady]: Okay. I can call with that.

> **Hold 650 ms.**

> **Shot `outreach`.** Show a reconstructed support case beside the account lead's draft. Sam removes a line from the email, then picks up the phone. Keep contact details out of frame.

SAM [focused]: I've got an older case for this company. I can check who they already talk to here. Once we verify the contact, I'll keep the updates together so they don't have to tell the story again on every call.

NARRATION [neutral]: Customer-facing teams rebuilt contact lists using records they could still access, including prior support tickets. They aimed to keep one incident-related ticket for each affected site. That gave the people doing outreach somewhere to follow the engineering progress and put the next update.

NARRATION [neutral]: Engineers, support, program managers, and communications staff worked across shifts. The core response team met every three hours. Atlassian also had to give affected customers a better way to raise issues and get updates. A restore queue and a customer contact list are different jobs. The team had to connect them while both were changing.

## Beat 6 · One site back

> **Shot `site-board`.** Reconstruct the documented Jira SITE project. Zoom to one illustrative issue. Show the assigned owner, the restore route, the next action, and the validation status. Vik leaves the item open when the database step turns green.

VIK [focused]: Maya, where are we on the first site?

MAYA [focused]: The product data's back in the new site. We're still checking who can get to it.

ELLIS [focused]: I'll try it as a regular user. My admin account can get through things their accounts can't.

NARRATION [neutral]: Atlassian's existing recovery process made a new site to replace the deleted one. That gave the site a new identifier. Other systems had stored the old identifier in records that pointed back to the site. So the job included restoring data and reconnecting it to the right place. That could mean users and permissions, attachments, service data, and third-party apps.

> **Shot `remap`.** Use the same site diagram from Beat 2. Show an attachment link still pointing at the old site identity. Move the reference only when Maya explains it. Build a dependency chain alongside the diagram one step at a time.

MAYA [focused]: Think of an attachment. You can have the file sitting in storage, and the issue sitting in Jira. If the reference still points at the old site, clicking it can fail. When I say the data's back, that's one box on the checklist.

> **Shot `restore-clock`.** Line up the main data stores on a shared restore point. Show an issue and its attachment returning together as an illustrative example. Keep the timestamp relative to deletion.

NARRATION [neutral]: There was a time problem as well as an identity problem. Different parts of a site had to be brought back to a consistent point. For most customers, Atlassian chose a point five minutes before the deletion for the main product databases. Other stores had to be brought in line with it or caught up using recorded events. If one piece is further ahead than another, you can end up with a page that remembers an attachment the file store hasn't recovered yet.

NARRATION [neutral]: The first approach was roughly seventy individual steps, many of them dependent on the step before. One group worked through the early restorations manually and checked the sequence. Another built automation to run more of that process safely. The first customers got their sites back on April eighth.

> **Shot `site-board`.** A fictional issue passes validation. Cut to Arjun relaxing his shoulders. Keep the rest of the board open in the background.

SAM [relieved]: They've signed in. I'm going to wait while they open the thing they actually came back to work on.

> **Hold 650 ms.**

NARRATION [grave]: Getting that first group back mattered. The same approach still meant spending a great deal of time rebuilding relationships around every new site. So the next question was whether the team could keep those relationships in place.


## Beat 7 · Give the site its old identity back

> **Shot `restore-paths`.** Put the old and new paths side by side. On the old path, leave the remapping nodes visible. On the accelerated path, reconnect the original identifier and let several lanes move in parallel. Keep validation as a separate final step.

MAYA [focused]: We keep having to teach every system the new name. What happens if the site comes back under the old one?

ARJUN [curious]: Then that attachment still knows which site it's supposed to belong to.

MAYA [steady]: Right. We still have to put the attachment and the rest of the data back. But we're removing a whole class of work.

NARRATION [neutral]: On April ninth, Atlassian proposed a second approach. Recreate the records for the site and reuse its original identifiers. That avoided much of the remapping and let more teams restore their pieces at the same time. The new process still had over thirty steps. And before it could handle larger batches, it had to be tested and validated in its own right.

> **Shot `site-board`.** Two labeled recovery routes on the same Jira SITE reconstruction. Vik points to the existing lane, then selects a small batch on the new one.

VIK [focused]: Keep the restores already in progress moving. Give me a small batch on the new route. I want to see what passes before we ask it to take more.

ELLIS [steady]: I'll run the same user and attachment checks on the new route. We'll know if it gets people back to the same place.

NARRATION [neutral]: Teams ran both approaches in parallel. They adapted automation, tested the second route, and checked that sites actually worked. A site that existed again still needed the right users, access, products, and data before the customer could return to it.

> **Shot `handoff`.** Hold on an issue with three readable fields: route, last verified step, and next owner. Match cut from the outgoing engineer's note to the incoming engineer opening the same issue.

VIK [steady]: Before you hand this over, put the route and the last check on the issue. The next person needs to know where to pick up and what they can trust.

NARRATION [neutral]: That's where the tracking mattered. With two processes running and people changing shifts, an update like “restore running” could mean very different things. The team needed to see which sites were still being worked on, which were being checked, and which had been returned to customers.

> **Shot `public-update`.** Dramatized cut to Daniel asking for the update while Sam checks customer communications. Then show the date and a source card for the documented April 12 public statement. Use original screen copy.

DANIEL [steady]: What do we know about the sites still waiting?

SAM [concerned]: Some are further along. I can't tell every customer they'll be back tomorrow.

DANIEL [grave]: Then say how far we've got and how long the remaining work could take. People are planning around this.

NARRATION [grave]: On April twelfth, Atlassian's CTO published an update explaining the incident and warning that recovery for some customers could take up to two weeks. By April eighteenth, all sites had been restored. For people who had been waiting since the start, that was almost two weeks of finding another way to work.

## Beat 8 · Ask the system what it is about to touch

> **Shot `preview`.** Replay the input into a clearly marked proposed safety preview. Show `Expected type: APP`, then `Resolved type: CLOUD SITE`. Let the cursor reach the action before it switches to `Blocked`. Use the same lookup layout and parent-site silhouette as Beat 4.

NARRATION [neutral]: Let's replay one row from the second batch with a different rule. Tell the job in advance that every target must be an app. Resolve the identifiers in production without changing anything. If even one points to a cloud site, stop the batch and show the mismatch before the job can send a delete.

MAYA [dry]: That's the preview I'd want on the review.

NARRATION [neutral]: That screen is an example of a guardrail. Atlassian reported blocking bulk site deletion and described plans for safer deletion and testing recovery across multiple sites. Those controls address two different moments. One puts a barrier in front of the mistake. The other gives the team a way back when something still goes wrong.

> **Shot `desk`.** Return to the original desk framing. Arjun sips the coffee, winces, and sets it down. End on the two resolved target types and the incident source.

ARJUN [dry]: The coffee's cold. Fair enough.

> **Hold 750 ms.**

NARRATION [steady]: If you own a job that can make a permanent change, ask to see one real target resolved before you approve the run. Then ask how the job proves the rest of the list is the same kind of target. That's a check a reviewer can actually run.
