# p2 | Phase 2 | n8n core | 12 | Triggers, data, credentials and error handling
intro: This is the skill clients pay for first: connecting two tools reliably. You'll build real workflows with validation, Google Sheets, email, a schedule, branching and error handling. Each step teaches the concept, then has you build it, then checks that you understand why it works.
start: Role: Interviewer. Before Phase 2, ask me 5 questions, one at a time, about what I understand of n8n so far: triggers, items, expressions, credentials. Tell me which steps I can speed through.

## p2-1 | p | must | Learn the n8n vocabulary | 45 min | Explainer, Clerk
fast: yes
goal: Know the eight words that every n8n tutorial and client conversation uses.
learn:
- Eight words: trigger, node, item, expression, credentials, execution, active/published, pinned data.
- A node runs once per item. Credentials live outside the workflow file.
res:
- n8n Academy: N8N101 "Essentials: Your First Workflows" (free registration) | https://learn.n8n.io/
- n8n docs: Expressions versus data nodes | https://docs.n8n.io/build/work-with-data/expressions-versus-data-nodes
- n8n docs: Understand n8n's data structure (items) | https://docs.n8n.io/build/work-with-data/understand-n8ns-data-structure
do:
- Work through the lessons of the N8N101 course on learn.n8n.io that cover triggers, nodes and how data flows, until you have seen items and expressions (about 30 to 45 minutes). Then read the data structure page above once.
- Write the eight words on paper with a one-line definition each, from memory.
- Open an old workflow of yours and point at the trigger, an item, and an expression.
done: You define all eight words in your own words and pass a short flashcard check from Claude.
prompt: Flashcards and check | Role: Clerk, then Examiner. Make 8 flashcards for the n8n vocabulary above and test me with them, one at a time, in random order. Then ask me two scenario questions, for example "a webhook receives a list of 10 orders, how many times does the next node run and why".

## p2-2 | l | must | Workflow 1a: validate incoming data and answer the sender | 60 min | Explainer, Checker
fast: yes
goal: Build a webhook that checks incoming data, rejects bad data with a proper status code, and answers the sender.
learn:
- Validate first with an IF node, then answer the sender with Respond to Webhook: 200 for good data, 400 for bad.
- Webhook data is under `body`.
res:
- n8n docs: IF node | https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.if/
- n8n docs: Respond to Webhook node | https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook/
do:
- New workflow `04 signup intake`. **Webhook** node (POST, path `signup`, Respond: Using 'Respond to Webhook' node).
- Add an **IF** node checking that `body.email` contains `@` and `body.name` is not empty.
- True branch: **Edit Fields** that keeps `name` and `email` and lowercases the email, then **Respond to Webhook** with code 200 and a JSON body `{"ok": true}`.
- False branch: **Respond to Webhook** with code 400 and `{"ok": false, "error": "invalid input"}`.
- From Python, send three test cases: valid, missing email, empty name. Print the status code and body each time.
done: All three test cases give the expected status code, and you can explain why validation goes first and why the status codes matter.
prompt: Check me (Checker) | Role: Checker. I built a validated signup webhook. Here are my IF conditions and my three test results: [paste]. Find what I missed, such as an email with spaces, a missing body, or null values. Don't fix it for me. Ask what happens for each one.

## p2-sec | l | must | Secure your webhook | 40 min | Explainer, Socratic
fast: yes
goal: Make sure only your own scripts and trusted services can start your workflow.
learn:
- A webhook URL is an open door. Header Auth makes n8n reject callers without the secret.
- The secret lives in credentials and `.env`, never in the workflow or repo.
res:
- n8n docs: Webhook node (see the Authentication and IP allowlist options) | https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/
do:
- Generate a secret with the Python one-liner. Add `WEBHOOK_SECRET=` and the secret to your `.env`, and `WEBHOOK_SECRET=` with no value to `.env.example`.
- In n8n create a **Header Auth** credential (header name `X-Webhook-Secret`, value your secret). In `04 signup intake` set the Webhook node's **Authentication** to Header Auth with that credential.
- Change your Python test script to read the secret from `.env` (python-dotenv from p0-5) and send it as the `X-Webhook-Secret` header.
- Test three calls: with the right header, with no header, and with a wrong one. Write down the status codes of the last two.
- In the Webhook node's options add an **IP allowlist** with an address that isn't yours, send a request, and see it rejected. Remove it afterwards.
done: The right header works, a missing or wrong one is rejected before the workflow runs, and you can explain why a secret path isn't enough and what authentication does and doesn't protect.
prompt: Check me (Socratic) | Role: Socratic questioner. I added Header Auth and tried an IP allowlist on my webhook. Ask me one question at a time: why isn't a long random URL enough, where should the secret live and where must it never appear, what status code did the bad calls get and why, why does a payment provider sign requests instead, and what does authentication not protect against. Don't give me the answers.

## p2-3 | l | must | Connect Google Sheets and Gmail with OAuth | 90 min | Explainer, Socratic
fast: yes
goal: Add a Google connection once and use it to write rows to a sheet and send an email.
learn:
- OAuth gives n8n limited access to Google without your password. You register the app yourself.
- The redirect URL must match n8n's exactly. Testing mode expires after about 7 days.
res:
- n8n docs: Google credentials | https://docs.n8n.io/integrations/builtin/credentials/google/
- n8n docs: Google Sheets node | https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/
- Google Cloud Console | https://console.cloud.google.com/
do:
- Follow the n8n docs page "Google credentials", OAuth section for self-hosted. Create a Google Cloud project, enable the **Google Sheets API** and the **Gmail API**, set up the OAuth consent screen (External, Testing), add your Gmail as a Test user, and create an OAuth client ID. Paste n8n's redirect URL into it.
- Create a Google Sheet `Signups` with the headers `name`, `email`, `received_at` in row 1.
- Note the OAuth credential screen in n8n shows the redirect URL and has fields for the Client ID and Client Secret. The Sheets and Gmail nodes can each use their own credential, but one Google Cloud project with both APIs enabled can serve both.
- In `04 signup intake`, on the true branch add a **Google Sheets** node (Append Row) and a **Gmail** node (Send) that emails the sender a short confirmation. For testing, use your own email as the recipient.
- Use the credentials dropdown in both nodes. Run the valid test case from Python (with the secret header from p2-sec) and check the row and the email.
- Don't paste Client IDs or Secrets into chat or into your repo.
done: A valid test case adds a row and sends an email, and you can explain OAuth, redirect URL and Testing mode in your own words.
prompt: Check me (Socratic) | Role: Socratic questioner. I connected Google to n8n with OAuth. Ask me one question at a time: why OAuth instead of my password, what the redirect URL is for, why the app is in Testing mode and what that means after a week, and where my secrets are stored. Don't give me the answers.

## p2-4 | l | must | Workflow 2: a scheduled report | 60 min | Explainer, Checker
goal: Build a workflow that runs on a schedule, fetches data, turns lists into items, filters, and emails a summary.
learn:
- Schedule Trigger fires only while the workflow is published and n8n is running.
- Split Out turns lists into items. Filter keeps some. Aggregate merges back to one item.
res:
- n8n docs: Schedule Trigger | https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/
- n8n docs: Split Out | https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.splitout/
do:
- New workflow `05 weekly weather digest`. **Schedule Trigger**: every day at 08:00 for now.
- **HTTP Request** to `https://api.open-meteo.com/v1/forecast?latitude=52.37&longitude=4.89&daily=temperature_2m_max,precipitation_sum&timezone=auto`. Look at the output: the daily data is three arrays.
- Add **Split Out** on `daily.time`, `daily.temperature_2m_max` and `daily.precipitation_sum`. You should get 7 items.
- Add a **Filter** that keeps days with precipitation above 1 mm. Add an **Aggregate** node to merge them. Add **Gmail** to send yourself a summary.
- Click Execute workflow to test it. Don't wait for 08:00. Then set it Active (or Publish it).
done: Your test run emails a summary of the rainy days, and you can explain parallel arrays, Split Out, and why Aggregate is needed before one email.
prompt: Check me (Checker) | Role: Checker. I built a scheduled digest with Split Out, Filter and Aggregate. Here is the node order and the output of each: [describe]. Ask me what would happen with 7 items going straight into the Gmail node without Aggregate, then check my answer by having me try it.

## p2-5 | l | must | Branch, code and merge: Switch, Code and Merge nodes | 60 min | Explainer, Checker
goal: Use a Switch, a Code node and a Merge node in one workflow and understand how items move through them.
learn:
- Switch is an IF with many outputs. Merge joins branches. Code returns `[{ json: {...} }]`.
- Use a standard node when one exists.
res:
- n8n docs: Using the Code node | https://docs.n8n.io/build/code-in-n8n/using-the-code-node
- n8n docs: Switch node | https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.switch/
- n8n docs: Merge node | https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.merge/
do:
- New workflow `06 order labels`. Manual Trigger, then a **Code** node that returns 6 sample orders (`id`, `customer`, `amount`) as items.
- **Switch** on `amount`: under 50 is small, 50 to 200 is medium, above 200 is large.
- On each branch add an **Edit Fields** node that adds `label` with the right word. Bring all three branches back with **Merge** (append mode).
- Check that you get 6 items out, each with its label. Then add a second Code node that adds up all amounts into one item.
done: You get 6 labelled items and one total, and you can explain what shape a Code node must return and why Merge is needed.
prompt: Check me (Checker) | Role: Checker. I built Code, Switch and Merge. Here is my Code node and its output: [paste]. Check the shape and edge cases (an amount of exactly 50, a missing amount). Don't fix it for me. Ask what I'd change.

## p2-6 | l | must | Add error handling | 45 min | Explainer, Socratic
fast: yes
goal: Make sure you hear about failures instead of discovering them from an angry client.
learn:
- An error workflow starts with an Error Trigger and only runs for automatic executions.
- Retry only what is safe to repeat. Never retry an email send.
res:
- n8n docs: Handle errors gracefully | https://docs.n8n.io/build/flow-logic/handle-errors-gracefully
do:
- New workflow `00 error alert`: **Error Trigger**, then **Gmail** sending you the workflow name, the failed node and the error message.
- In `05 weekly weather digest`, open Settings and choose `00 error alert` as the Error workflow.
- Break the HTTP node on purpose (wrong URL). A manual run does **not** fire an error workflow (the Error Trigger only runs for automatic executions), so set the Schedule Trigger to every minute, publish the workflow and wait for the next run. Confirm you get the email, then unpublish and restore the schedule and the URL.
- Turn on **Retry On Fail** (3 tries) on the HTTP node. Explain why not on the Gmail node.
done: A deliberate failure emails you, and you can explain when retry is safe and when it isn't.
prompt: Check me (Socratic) | Role: Socratic questioner. I added an error workflow and retries. Ask me one question at a time: what triggers the error workflow, what happens if the error workflow itself fails, why not retry a Gmail send, and what I would want an error alert to include for a client's workflow. Don't give me the answers.

## p2-7 | l | must | Export, import and protect your workflows | 30 min | Explainer, Checker
goal: Back up workflows as JSON, restore one, and know what the file contains.
learn:
- A workflow exports as JSON with node settings and credential names, not secrets.
- Check an export for keys and personal data before committing.
do:
- Download all workflows from p2-2 to p2-6 into `C:\dev\automation-portfolio\workflows`.
- Delete `06 order labels` in n8n, then import it again from the file and run it.
- Open one JSON file in VS Code. Find a node name, its type, its parameters and the credential reference. Search the file for `@` and `key` to check nothing sensitive is in it.
- Commit and push (`git add .`, `git commit`, `git push`).
done: You restored a deleted workflow from its file, and you can say what an export contains and what it doesn't.
prompt: Check me (Checker) | Role: Checker. Here is the structure of one of my exported workflow JSON files (remove any real emails first): [paste a short part]. Ask me where the credentials are, what would be unsafe to publish, and how I'd hand this workflow to a client.

## p2-8 | l | must | Version your workflows with the n8n CLI | 45 min | Explainer, Checker
goal: Save every workflow as a readable file in Git, and restore a workflow from that history.
learn:
- Export with `docker exec ... n8n export:workflow`, copy out with `docker cp`, restore with `import:workflow`.
- Never export credentials into Git.
res:
- n8n docs: Source control and environments (the paid feature) | https://docs.n8n.io/administer/use-source-control-and-environments
do:
- Run the export, copy the files into `workflows\` in your repo, open one file, and commit with a clear message.
- Change a workflow in n8n, export again, and use `git diff` to see exactly what changed.
- Delete a workflow in n8n, restore it from the file with the import command, and check it works and is active.
- Add `git tag v0.1`. Write the three commands you'll use (export, copy, import) in `workflows\README.md`.
done: Your repo holds one readable file per workflow, you restored a deleted workflow from Git, and you can explain why credentials never go in the repo.
prompt: Check me (Checker) | Role: Checker. Here are my export, copy and import commands, a `git diff` of one change, and my README: [paste]. Find what could go wrong: leaking secrets, importing over a newer version, forgetting to reactivate. Ask me how I'd roll back a client's workflow in under 10 minutes. Don't rewrite my commands.

## p2-b | l | bonus | Bonus: sub-workflows and loops | 60 min | Explainer, Checker
goal: Reuse a piece of logic from several workflows and process items in batches.
learn:
- Sub-workflows share logic. Loop Over Items sends batches.
do:
- Move the email-formatting steps of one workflow into a sub-workflow and call it from two workflows.
- Process 25 sample items in batches of 5 with a 1-second wait between batches.
done: Two workflows share one sub-workflow, and the batch loop runs correctly.
prompt: Check me (Checker) | Role: Checker. Here is how I built my sub-workflow and my loop: [describe]. Find mistakes and ask me about edge cases.

## p2-r | l | redo | Redo without help: Workflow 1 from a blank canvas | 45 min | Listener
goal: Rebuild the validated signup workflow with no notes.
learn:
- Rebuild the validated signup workflow from a blank canvas, then explain it aloud.
do:
- Create a new workflow `07 intake again`. Build it from memory, including the 400 branch. Time yourself.
- Test with three cases from Python.
- Dictate a 2-minute explanation of the flow as if to a client, and paste the transcript.
done: It works in under 30 minutes, and your explanation covers why validation comes first, what an item is and how the sender knows it worked.
prompt: Check me (Listener) | Role: Listener. I rebuilt the signup workflow from memory in [N] minutes. Here is my spoken explanation: [paste]. Compare it with what the workflow really does and tell me what I missed. Be strict.

## p2-g | l | gate | Phase 2 exam | 30 min | Examiner, Diagnostician, Clerk
goal: Show you can explain, build and debug in n8n, then lock in the gaps.
learn:
- Questions plus a debugging task. Mistakes become flashcards.
do:
- Run the exam prompt and answer from memory.
- Fix the broken workflow the examiner describes. No notes.
- Make the flashcards and review them over the next two days.
done: At least 80% on the exam, the broken workflow fixed, and two workflows with error handling that you could demo on a call.
prompt: Exam me | Role: Examiner. Exam me on Phase 2, one question at a time, easy to hard: items, expressions, credentials, IF vs Switch, Split Out and Aggregate, error workflow, retry risks, export contents. Then give me one broken-workflow scenario to debug by describing what I'd check. Score me out of 10.
prompt: Diagnose and flashcards | Role: Diagnostician, then Clerk. Look at my mistakes in this exam and in C:\dev\ai-automation-portfolio\mistakes.md. What one root misunderstanding is behind them? Then make 8 flashcards and save them in C:\dev\ai-automation-portfolio\flashcards\ as one tab-separated text file for this phase (question, tab, answer, one card per line) so I can import them into Anki.
