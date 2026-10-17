# Open problems (updated 2026-10-06 after the full check)

What is left after the full check. Severity: **High** = could mislead you or cost money, **Medium** = could waste time, **Low** = minor.

## Fixed in the full check (2026-10-06)

- Dashboard: on a phone-width screen, opening a lesson with a code block made the whole page scroll sideways. Fixed. Tested at 375 px with all 81 steps and 308 topics opened: no sideways scroll, no empty lessons, no broken placeholders. Dark mode colours are all theme tokens; the tick marks now have readable contrast in dark mode.
- Dashboard: the "Explain it three ways" and "Find resources" prompts showed a literal `{title}`. Fixed.
- n8n 2.x: the button is **Publish**, and **Save** only saves a draft (production runs the last published version). Added to p2-1 and p1-5. Importing with the CLI leaves workflows unpublished; p2-8 now says so and shows `n8n publish:workflow`.
- p0-3: n8n's own page calls plain `docker run` outdated (Docker Compose is recommended) and `N8N_RUNNERS_ENABLED` is deprecated since n8n 2.0. The lesson says so; a Compose link was added to the resources.
- p4-sql: the INSERT/UPDATE/DELETE example assumed a customer with id 3 and would fail with a foreign-key error; it now uses the email and explains the error.
- p4-py: current `uv init` creates a `src/` folder, not `main.py`; the lesson now says to create `main.py` yourself.
- n8n label names checked against the docs: Supabase node says "Get all rows" (the lesson now uses that), Supabase Vector Store modes and the Query Name default, Chat Trigger "Initial Message(s)", Retry On Fail / On Error labels. Added the warning that Continue ignores Max Tries.
- p5-3: Freelancer Plus Connects: sources disagree (60 vs 100); the lesson now tells you to read your own plan page.
- p6-4: Hetzner prices changed in 2026 and some plans were unavailable; the lesson now gives a 4 to 10 euro range and says to check live prices.
- p4-i: Calendly API webhooks need a paid Calendly plan; added.
- p0-4: tip about `pip freeze >` encoding in older Windows PowerShell.
- Executed for real and working: all Python code blocks (27 parse; Pydantic, FastAPI, Frankfurter v2, open-meteo run), the p4-sql statements (on PGlite/Postgres), `uv init/add/run` and `ruff check/--fix/format`.
- Link check: 81 of 89 OK. The other 8 are four Upwork pages (403 for bots, normal), two sign-in redirects, two moved or language-redirected pages that still work.

## 1. Facts I still could not verify

| Sev | Where | Problem |
|---|---|---|
| High | p5-2, p5-3, p5-5, p5-ai, p6-1 | **Upwork facts come from third-party sources** (Upwork blocks automated reading). Connect price ($0.15) and 10 free Connects agree across sources; Freelancer Plus Connects (60 vs 100), the service fee range, Rising Talent criteria and the AI-training opt-out claim do not or are single-source. Read Upwork's own pages and your account settings. |
| High | p4-3, p6-3 | **EU AI Act Article 50.** 2 August 2026 applies to chatbot disclosure. A Digital Omnibus delays Article 50(2) (marking of synthetic content) to 2 December 2026 for systems already on the market, and the Commission published guidelines on 20 July 2026. The lessons cover the chatbot disclosure only. Not legal advice; ask a professional before a real client. |
| High | p6-3 | n8n licence summary relies on the licence text and the Community licence FAQ. Hosting several clients on one instance you control is a grey area. Ask n8n for a real case. |
| Medium | p4-pg | Which dimension n8n's Gemini Embeddings node actually returns is not in n8n's docs (Google's model default is 3072). The lesson tells you to read the error and recreate the table if the size is wrong. |
| Medium | p4-py | `host.docker.internal:8000` from n8n in Docker was not run (Docker was not running here). Docker Desktop's documented behaviour supports it; the fallback `--host 0.0.0.0` is described with its risk. |
| Medium | p4-pg | The pgvector SQL (`match_documents`) follows Supabase's documented template but was not run (the test database had no pgvector). |
| Medium | n8n UI | I verified names in n8n's docs, but not by clicking through the interface. n8n releases weekly; if a label differs, trust the screen and tell Claude so the lesson gets fixed. |
| Medium | p4-v, p4-m | WhatsApp pricing structure, Make and Zapier free-plan numbers (1,000 credits, 100 tasks) are from secondary sources and are dated. |
| Low | p6-4 | UptimeRobot free plan: commercial-use terms not checked. |
| Low | p6-3 | Dutch tax items are only listed as questions for an accountant, not answered, on purpose. |

## 2. Things that will go out of date

- Prices and limits (Connects, fees, n8n Cloud, VPS, Gemini prices dated 2026-10-01 in p3-6). Re-check on the day you quote them.
- n8n releases a minor version most weeks (stable was 2.41 in October 2026). Run `node check-links.mjs` before each phase; docs paths move.
- Supabase is phasing out the `anon` and `service_role` key names; tutorials online may use the old names.
- uv, ruff and FastAPI change quickly; commands were tested on uv 0.12, ruff 0.16, FastAPI 0.141, Pydantic 2.13.

## 3. Time and volume

- Step times add up to about 91 hours for the 68 core steps (fast lane about 40 hours) plus an estimated 25% struggle time. The lessons are about 63,000 words, about 5 hours of reading in total, which is mostly inside the step times but was not re-measured. At 10 hours a week the core path is about 10 weeks and the fast lane about 4 weeks, so the Nov 10 target holds only for the fast lane, and only at 10 hours a week or more. Re-estimate after you finish Phase 0.
- 616 must-know items and 600+ questions is a lot. If a topic feels like padding, say so and it gets cut from the lesson and the list together.

## 4. Learning-design risks

- Model answers show one phrasing; the Examiner should judge meaning, not wording.
- Your p0-2 answer that Git stores versions "in periods of commits" is imprecise; the exam will cover it.
- Phases 1 to 6 have not been tested on a real learner yet; only Phase 0 has had a partial pilot.
- Some steps need things outside this folder: `C:\dev\automation-portfolio`, your Google, Supabase, Gmail and n8n accounts, ComniWell data.
- Real-world steps (sending proposals, calls, accountant, team meeting) cannot be graded by Claude; "done" means you did it and can explain it.

## 5. Tooling notes

- Dashboard checks were done in the browser pane through the page's own code (screenshots time out in this pane), so I verified structure and overflow, not how it looks. Look at it once yourself and say what is ugly.
- `audit.mjs` checks structure and forward references only, not whether facts are true.
- `ROADMAP.md`, `dashboard/dashboard.html`, `dashboard/quiz.html` and `flashcards/` are generated. Edit `content/` and `lessons/`, then run `node build.mjs`.
- The 12 remaining `CHECK` lines in the audit are reviewed and accepted pointers.
- `C:\dev\ai-automation-portfolio` is a git repository (remote `Lauwie-Timmer/ai-automation-portfolio`); the learning files moved in from `C:\dev\learning` on 2026-10-06 and are not committed yet. Check whether the repo is public before committing `mistakes.md` or other personal notes.
