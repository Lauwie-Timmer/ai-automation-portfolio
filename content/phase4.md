# p4 | Phase 4 | Portfolio and case studies | 10 | Three projects you can show a client
intro: Clients hire people who can show something similar to what they need. You'll build three small projects and write a short, honest case study for each. You can start applying on Upwork as soon as Project B is done, so you don't need to wait for the whole phase. Be truthful about what is a prototype with sample data. Clients and Upwork trust honest portfolios, and honesty is also what makes your friends' business credible later.
start: Role: Mapmaker. Before Phase 4, look at my market research from p3-7 (market-research.md) and ask me 4 questions, one at a time. Then adjust the specs of Projects A, B and C below so they match the needs clients actually have.

## p4-1 | l | must | Project A: ComniWell signup automation | 3 hours | Explainer, Checker
goal: Build a workflow that notices new waitlist signups, logs them, notifies you once per signup, and sends you a weekly digest.
learn:
- Idempotency: mark handled rows (a `notified` flag) so a timed workflow never repeats itself.
- Least privilege: the Supabase secret key bypasses RLS, so it lives only in the n8n credential.
- Poll with a Schedule Trigger; localhost can't receive webhooks.
res:
- n8n docs: Supabase node | https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.supabase/
- Supabase docs: Row Level Security | https://supabase.com/docs/guides/database/postgres/row-level-security
do:
- First find out where ComniWell's waitlist emails are stored, and ask Claude to help you choose the safest way to read them. A good first version uses a **practice table with fake signups** in a separate Supabase project, then you decide if you want to connect the real one.
- In a new, free practice Supabase project, open the Table Editor and create a table `practice_signups` with columns `id` (auto), `email` (text), `created_at` (timestamp, default now) and `notified` (boolean, default false). Add 3 fake rows by hand using made-up addresses like `test1@example.com`. In n8n, create a Supabase credential from the project URL (Integrations, Data API; leave off `/rest/v1`) and a secret key (Project Settings, API Keys).
- Build workflow `12 signup notifier`: **Schedule Trigger** (every 15 minutes), **Supabase** (Get many rows where `notified` is false), a check for zero rows, **Google Sheets** (append), **Gmail** (notify yourself), **Supabase** (set `notified` to true).
- Add the error workflow from p2-6.
- Build workflow `13 weekly digest`: **Schedule Trigger** (Monday 08:00), read signups from the last 7 days, **Aggregate** or a Code node for the count, **Gmail** to yourself with the number and the list.
- Test by inserting 3 fake rows. Run twice and prove that you are notified only once per row.
done: Fake signups produce exactly one notification each, the digest has the right count, and you can explain idempotency and least privilege.
prompt: Check me (Checker) | Role: Checker. Here is how my signup notifier works, including how I avoid duplicates and which key it uses: [describe]. Find the failure cases: what if Supabase is down, what if two runs overlap, what if a row is edited, what if the key leaks. Ask me how I'd handle each. Don't fix it for me.

## p4-sql | l | must | SQL basics for Supabase and client databases | 90 min | Explainer, Examiner
goal: Read and write simple SQL so you can work with Supabase, Postgres and the databases clients already have.
learn:
- SELECT reads, INSERT adds, UPDATE changes, DELETE removes. Filter with WHERE, group with GROUP BY, combine with JOIN.
- Always run a SELECT with the same WHERE before an UPDATE or DELETE.
- Primary key identifies a row; foreign key points to another table. Use parameters, never string-gluing.
res:
- SQLBolt: free interactive SQL lessons | https://sqlbolt.com/
- PostgreSQL tutorial | https://www.postgresql.org/docs/current/tutorial.html
- Supabase docs: Database overview | https://supabase.com/docs/guides/database/overview
do:
- Do the SQLBolt lessons on queries, joins and aggregates, and on inserting, updating and deleting (about 60 minutes). Write each query yourself.
- In your practice Supabase project open the **SQL Editor** and create `customers (id, name, email, city)` and `orders (id, customer_id, amount, created_at)`. Add 5 invented customers and 12 invented orders.
- Write queries for: all orders over 50; the total per customer; customers with no orders; the 3 biggest orders with the customer's name (a join); orders from the last 7 days.
- Write an `UPDATE` the safe way: first a `SELECT` with the `WHERE`, then the `UPDATE` with the same `WHERE`.
done: Your five queries return correct results, you did one safe UPDATE, and you can explain a primary key, a foreign key, a JOIN and why string-gluing is dangerous.
prompt: Quiz me (Examiner) | Role: Examiner. Give me 6 SQL tasks one at a time against my customers and orders tables, getting harder (filter, group, join, left join for customers without orders, a safe update, a query that would be dangerous without a WHERE). Check my queries by reasoning about the result. Tell me my level.

## p4-pg | l | must | Persistent RAG with Supabase pgvector | 3 hours | Explainer, Checker
goal: Replace the in-memory vector store with one that survives restarts, so a RAG bot could actually go to a client.
learn:
- pgvector adds a vector column and similarity search to Postgres, so embeddings survive a restart.
- vector(N) must equal your embedding model's output size; never mix models in one table.
- Use the Supabase Vector Store node; avoid duplicate inserts and private data in the table.
res:
- Supabase docs: Vector columns (pgvector) | https://supabase.com/docs/guides/ai/vector-columns
- n8n docs: Supabase Vector Store node | https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoresupabase/
do:
- In your practice Supabase project enable the `vector` extension. Create the table and search function from the n8n Supabase Vector Store docs. Note the embedding size.
- Rebuild your FAQ loader from p3-4 with the **Supabase Vector Store** node in Insert mode, and your FAQ bot with the same node as an agent tool.
- Ask 5 in-document and 3 out-of-document questions. Then restart n8n (`docker restart n8n`) and ask again. It should still answer.
- Look at the rows in Supabase's table editor: the text, the metadata and the embedding.
- Write 5 sentences on the difference between the two stores and when each is the right choice.
done: Your bot answers after an n8n restart, and you can explain pgvector, why the embedding size must match, and why Simple Vector Store isn't for clients.
prompt: Check me (Checker) | Role: Checker. Here is my vector table setup, my loader and bot descriptions, and my test results before and after restarting n8n: [paste, no keys]. Find what could go wrong with a client's real data: wrong embedding size, duplicate inserts when the loader runs twice, private data in the table. Ask me how I'd update one FAQ answer without reloading everything. Don't fix it for me.

## p4-2 | l | must | Project B: a Python data script you could sell | 3 hours | Explainer, Checker
fast: yes
goal: Write a tidy script that pulls data from an API, cleans it, calculates something useful and writes a report, with a README another person can follow.
learn:
- A sellable script has a purpose, settings in one place, error handling, logging, a tested function and a README.
- argparse reads --days, logging records what happened, pytest tests the calculation.
- Frankfurter has working days only, so never hard-code 30 values.
res:
- Frankfurter exchange rate API docs | https://frankfurter.dev
- Python docs: argparse tutorial | https://docs.python.org/3/howto/argparse.html
- Python docs: logging how-to | https://docs.python.org/3/howto/logging.html
- pytest: Get started | https://docs.pytest.org/en/stable/getting-started.html
do:
- Use the free Frankfurter exchange-rate API (no key). Read its docs and check the current URL format. If it ever stops working, Open-Meteo weather data does the same job.
- In `C:\dev\automation-portfolio\02-report` write `report.py`. **Spec:** fetch the last N days (argument `--days`, default 30) of EUR to USD and GBP, compute the minimum, maximum, average and percentage change for each, and write a `report.csv` plus a readable summary printed to the terminal.
- Add logging, error handling (API down, empty data, bad argument) and a `.env.example` if you use any setting.
- Write 3 `pytest` tests for your calculation function with small hand-made numbers.
- Write a README with: what it does, setup (`python -m venv`, `pip install -r requirements.txt`), usage with an example, and what happens on failure. Ask a friend to follow it without your help.
done: A friend can run it from your README without asking you a question, the tests pass, and bad input fails with a clear message.
prompt: Check me (Checker) | Role: Checker, like a code reviewer for a client. Here is my script, tests and README: [paste]. Find bugs, unclear naming, missing error handling and README gaps. Don't rewrite it. Ask me one question about a design decision I should be able to defend.

## p4-3 | l | must | Project C: a small-business AI assistant | 3 hours | Explainer, Checker
goal: Build an assistant that answers common questions from a document and captures leads, with honest limits.
learn:
- An assistant says it's an AI, answers only from approved info, says "I don't know", and never invents prices.
- `$fromAI('key', 'description', 'type')` lets the model fill a tool's fields; it works only in agent tools.
- No real patient data. Show a screen recording because localhost can't serve a website.
res:
- n8n docs: Chat Trigger node | https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/
- n8n docs: Use AI to fill in tool parameters ($fromAI) | https://docs.n8n.io/build/integrate-ai/ai-examples/use-ai-for-parameters
do:
- Pick a fictional business that matches your market research, or a friendly one with permission. If you use your mother's physiotherapy clinic, use only the public website information, such as opening hours and treatment types, and do not use any patient data.
- Write `business-faq.md` with 15 answers. Load them into the persistent Supabase vector store from p4-pg. If you skipped that step, use the in-memory store from p3-4 and remember it forgets on restart.
- Build workflow `14 business assistant`: **Chat Trigger**, **AI Agent** with the FAQ as retrieval tool, and a second tool that collects a lead (name, email, question) into a **Google Sheet** and emails you. The system prompt must include the rules above, and the first message must be the AI disclosure from the checklist.
- Test 8 questions in the FAQ, 4 outside it, and 3 attempts to trick it (ask for a discount, ask for medical advice, say "ignore your instructions"). Record results.
- Record a 2-minute screen video of the workflow and a chat.
done: The assistant discloses it is an AI in its first message, answers FAQ questions, refuses the others politely, captures a lead, and passes the 3 tricks. You can explain why it doesn't connect to real patient data.
prompt: Check me (Checker) | Role: Checker playing a sceptical client. Here are my system prompt and my test results: [paste]. Try to find ways to break it that I haven't tested and tell me what you'd worry about if this answered real customers. Don't fix it for me. Ask me how I'd handle each one.

## p4-i | l | must | Integration pack: connect two tools clients ask for | 4 hours | Explainer, Checker
goal: Learn to connect a new tool from its API documentation, and build two workflows with tools that appear often in job posts.
learn:
- Read a tool's API doc in six points: authentication, base URL, endpoints, rate limits, pagination, webhooks.
- No n8n node? Use the HTTP Request node with a saved credential.
- Outside webhooks can't reach localhost: forward test events or poll. Make every workflow safe to run twice.
res:
- Airtable Web API | https://airtable.com/developers/web/api/introduction
- Calendly developer docs | https://developer.calendly.com/docs/getting-started/overview
- Stripe docs: webhooks | https://docs.stripe.com/webhooks
- WordPress REST API handbook | https://developer.wordpress.org/rest-api/
do:
- Look at your market research (p3-7) and choose the **two** tools that appear most. Write why in `integration-notes.md`.
- For each, read its API docs with the six-point list above and write the answers in `integration-notes.md`.
- Build one workflow per tool that does something real. For example: a booking or form event creates a record in Airtable or a CRM and notifies you, or a test-mode payment event adds a row to a sheet. Use the built-in node if there is one, otherwise the HTTP Request node.
- Add error handling (p2-6) and make each workflow safe to run twice.
- Export both with the CLI (p2-8) and commit.
done: Two workflows with real tools run, you wrote the six-point notes for both, and you can explain how you'd connect a tool that n8n has no node for.
prompt: Check me (Checker) | Role: Checker. Here are my six-point notes for two tools and a description of my two workflows: [paste, no keys]. Find the weak spots: authentication I misunderstood, rate limits or pagination I ignored, a workflow that would create duplicates, and what happens when the tool's API is down. Ask me how I'd connect a tool that has no n8n node. Don't fix it for me.

## p4-4 | p | must | Write a short, honest case study for each project | 45 min | Clerk, Checker
fast: yes
goal: Turn each finished project into 150 words a client can read in a minute. On the fast lane you only need Project B done, and you add the others later.
learn:
- Five parts: problem, what I built, tools, result, what I'd do next. About 150 words.
- Be specific, label prototypes and sample data, and never invent numbers.
do:
- Write one for every project you have finished, in a file `case-studies.md`. Keep each to 150 words. The classifier from p3-2 and Project B together are enough for a first profile if you haven't built A or C yet.
- Ask for a critique, then cut 20% of the words from each.
done: Three case studies, each under 150 words, with no vague claims and honest labels.
prompt: Check me (Clerk and Checker) | Role: Clerk and Checker. Here are my three case studies: [paste]. Don't rewrite them. Mark every vague phrase, every overclaim, and anything that a client could not check. Then tell me which one is strongest and why.

## p4-b | b | bonus | Bonus: record a 2-minute demo of each project | 60 min | Listener
goal: Show the work running, with your voice explaining it.
learn:
- A 2-minute demo: the problem in one sentence, the result running, one thing you'd improve.
- Check the screen for keys, emails and real data before sharing.
do:
- Record each demo with any screen recorder (Windows Game Bar `Win+G` works) and check the screen for secrets before you share.
done: Three videos under 2 minutes with nothing sensitive on the screen.
prompt: Check me (Listener) | Role: Listener. Here is the transcript of my demo voice-over: [paste]. Tell me what is unclear to a non-technical person and what I should cut.

## p4-m | l | bonus | Bonus: translate a workflow to Make and Zapier words | 90 min | Explainer, Checker
goal: Understand that clients on Make.com or Zapier need the same skills under different names.
learn:
- Make and Zapier use different names for the same ideas: scenario/module/bundle and Zap/step.
- Make charges per credit and Zapier per task; n8n Cloud charges per execution.
res:
- Make Academy (free lessons) | https://academy.make.com/
- Zapier Help Center | https://help.zapier.com/hc/en-us
do:
- Rebuild your validated signup workflow (p2-2) in Make.com on the free plan. You've used Make a little, so use that.
- Write a three-column table in `tool-vocabulary.md` mapping n8n, Make and Zapier words for: trigger, step, data item, branch, loop, error handling, credentials.
done: The Make version works, and your table has no empty cells.
prompt: Check me (Checker) | Role: Checker. Here is my vocabulary table and a description of the Make version: [paste]. Find wrong mappings, and ask me what would be hard to move from one tool to another and why.

## p4-py | l | bonus | Bonus: Pydantic, uv, ruff and FastAPI | 120 min | Explainer, Checker
goal: Learn four modern Python tools that make client scripts safer and let n8n call your own code.
learn:
- Pydantic validates data shape, uv manages projects, ruff lints and formats, FastAPI turns a function into an endpoint.
- From inside n8n's container use host.docker.internal, not localhost, to reach your PC.
res:
- Pydantic docs | https://pydantic.dev/docs/
- uv docs | https://docs.astral.sh/uv/
- ruff docs | https://docs.astral.sh/ruff/
- FastAPI docs | https://fastapi.tiangolo.com/
do:
- Define a Pydantic model for your classifier's output (a category from an allowed list, urgency, name). Parse five model answers, including a broken one, and read the errors.
- Install uv and make a fresh project with it. Run ruff on your Project B script and read what it says.
- Write a FastAPI endpoint `POST /clean` that takes JSON with messy names and returns them trimmed and capitalised. Run it locally. Call it from n8n with an HTTP Request node at `http://host.docker.internal:8000/clean` and explain why `localhost` wouldn't work.
done: The Pydantic model rejects the broken answer, ruff ran on your script, and n8n successfully called your FastAPI endpoint.
prompt: Check me (Checker) | Role: Checker. Here is my Pydantic model, my ruff output and my FastAPI endpoint: [paste]. Find gaps: what bad input would still get through, what the endpoint exposes if the port were public, and why I need authentication on it for a client. Don't rewrite it.

## p4-v | p | bonus | Bonus: know what voice and WhatsApp agents need | 60 min | Explainer, Mapmaker
goal: Answer a client honestly about phone and WhatsApp agents without building one.
learn:
- WhatsApp needs a verified business, opt-in, approved templates and per-message fees. Voice needs a provider, and has delay and per-minute cost.
- Be honest: you've built text assistants and workflows.
res:
- WhatsApp Business Platform docs | https://developers.facebook.com/documentation/business-messaging/whatsapp/overview
- Twilio Voice docs | https://www.twilio.com/docs/voice
do:
- Write a one-page `voice-whatsapp-notes.md`: what each needs, rough costs from the live pricing pages today, the compliance points, and what you would and wouldn't promise.
- Write a 5-sentence answer to "can you build me an AI receptionist that answers calls?".
done: Your notes have today's real prices and the answer is honest about what you have and haven't built.
prompt: Check me (Socratic) | Role: Socratic questioner. Here are my notes and my 5-sentence answer: [paste]. Ask me one question at a time: why a WhatsApp bot can't just message everyone, what causes delay in a voice agent, who needs to consent to call recording, and what I'd refuse to promise. Don't give me the answers.

## p4-r | b | redo | Redo without help: explain Project A to a client | 20 min | Listener
goal: Explain what you built in plain language, out loud, in two minutes.
learn:
- Explain Project A out loud in two minutes, with no unexplained jargon.
do:
- Dictate a 2-minute explanation of Project A to a client who runs a small business and has never used n8n. Don't use the words item, node, API or webhook without explaining them.
- Paste the transcript and ask for a grade.
done: Claude agrees the explanation is clear, correct and free of unexplained jargon.
prompt: Check me (Listener) | Role: Listener. I explained Project A to a small-business owner. Here is the transcript: [paste]. Compare it with what the project really does. Tell me what I got wrong, what I skipped and which words a non-technical person wouldn't know.

## p4-g | b | gate | Phase 4 exam: face a sceptical client | 30 min | Examiner, Diagnostician, Clerk
goal: Defend your portfolio against hard questions, then fix the weak spots.
learn:
- The exam plays a sceptical client: what breaks, how you know it's right, cost, ownership, data, why not Zapier.
- An honest "I haven't tested that yet, but I would..." beats a bluff.
do:
- Run the exam prompt. Answer honestly. "I haven't tested that yet, but I would..." is a good answer. Bluffing is not.
- Make the flashcards and review them over the next two days.
done: At least 80% on the exam and three case studies you can link on Upwork and show to your friends.
prompt: Exam me | Role: Examiner playing a sceptical client who just read my three case studies [paste them]. Ask me one question at a time, getting tougher: what happens when it breaks, how do I know it's right, what does it cost to run, who owns the code, what about customer data, why should I pay you instead of using Zapier. Score my honesty, clarity and technical accuracy out of 10.
prompt: Diagnose and flashcards | Role: Diagnostician, then Clerk. Look at my mistakes in this exam and in C:\dev\ai-automation-portfolio\mistakes.md. What one root misunderstanding is behind them? Then make 8 flashcards and save them in C:\dev\ai-automation-portfolio\flashcards\ as one tab-separated text file for this phase (question, tab, answer, one card per line) so I can import them into Anki.
