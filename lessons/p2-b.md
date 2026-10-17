## topic: Sub-workflows | sub-workflows
The **Execute Workflow** node calls another workflow like a **function**. The called workflow starts with an **Execute Workflow Trigger**. Use this when the same steps appear in several workflows (for example formatting an email), so a fix in **one place** fixes all of them.

Practice: move the email-formatting steps of one workflow into a sub-workflow and call it from two workflows.
know: Call a sub-workflow from two workflows
Q: What is the benefit of a sub-workflow?
A: Shared logic lives in one place, so fixing it once fixes every workflow that uses it.

## topic: Loop Over Items | loop
**Loop Over Items** (also called Split in Batches) processes items in **groups**, which matters for rate-limited APIs (remember 429 from p1-b). Pair it with a **Wait** node to pause between batches.

Practice: process 25 sample items in batches of 5 with a 1-second wait between batches.

Done when two workflows share one sub-workflow and the batch loop runs correctly.
know: Process 25 items in batches of 5 with a wait
Q: Why process items in batches?
A: To stay within an API's rate limit by sending a few at a time with a pause.
