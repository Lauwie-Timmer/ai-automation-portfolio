## topic: Same ideas, different names | vocab
Many Upwork jobs ask for **Make** or **Zapier**, not n8n. The ideas are the same; only the names differ. A table you should be able to fill in yourself:

| Idea | n8n | Make | Zapier |
|---|---|---|---|
| The whole automation | workflow | scenario | Zap |
| What starts it | trigger node | trigger module | trigger |
| One step | node | module | step (an action) |
| One piece of data | item | bundle | a record (lists are "line items") |
| Choose a path | IF, Switch | router with filters | Paths, Filter |
| Repeat per element | Split Out, Loop Over Items | iterator (and an aggregator to join results) | Looping |
| Join the results | Aggregate, Merge | aggregator | (Formatter / code step) |
| Handle failures | Error Trigger workflow, node retry | error handler routes | built-in error notifications and replay |
| Saved logins | credentials | connections | connections |
| Reshape data | Edit Fields, Code | built-in functions, tools | Formatter |

(Names checked from memory and general sources; open each tool's docs to confirm when you fill in your own table.)

You have used Make a little, so this is translation, not learning from zero.
know: Map trigger, step, data item, branch and loop between n8n, Make and Zapier
know: Map error handling and credentials between the three tools
Q: What are an n8n workflow, node and item called in Make?
A: Scenario, module and bundle.
Q: What is an n8n IF/Switch called in Make and in Zapier?
A: A router with filters in Make; Paths (or Filter) in Zapier.
Q: What do the three tools call saved logins?
A: Credentials in n8n; connections in Make and Zapier.

## topic: Pricing differs | pricing
**Make** and **Zapier** charge by usage: Make by **credits** (what used to be called operations) and Zapier by **tasks** (successful actions). A busy workflow with many steps costs the client money every month. Third-party summaries (October 2026) list the free plans as about 1,000 credits a month for Make and 100 tasks a month for Zapier; check the live pricing pages.

**Self-hosted n8n** has no per-run fee, but the client pays for the server and its upkeep (p6-4), and the licence has rules (p6-3). **n8n Cloud** is priced by monthly executions (a **whole workflow run** counts as one execution, however many steps it has).

**Why it matters when you sell:** a client on Make or Zapier will want the work kept there. Being able to say "I can do that in your tool, and I can also build it in n8n" widens the jobs you can take.
know: Say how Make and Zapier charge and how that differs from n8n
know: Say what you offer a client who is on Make or Zapier
Q: How do Make and Zapier charge?
A: Make per credit (formerly operations) and Zapier per task, so more steps cost more every month.
Q: What do you say to a client who already uses Make?
A: That I can build it in their tool and can also build it in n8n if that suits them better.

## topic: Rebuild a workflow in Make | rebuild
1. Rebuild your **validated signup workflow from p2-2** in Make.com on the free plan. Match each n8n node to a Make module as you go.
2. Write a three-column table in `tool-vocabulary.md` mapping the n8n, Make and Zapier words for: **trigger, step, data item, branch, loop, error handling, credentials**. No empty cells.
3. Note what was hard to move: data mapping, expressions (n8n expressions versus Make's functions), error handling and testing differ most.

Done when the Make version works and your table has no empty cells.
know: Rebuild the signup workflow in Make
know: Write the seven-row vocabulary table
Q: Which seven rows must the vocabulary table have?
A: Trigger, step, data item, branch, loop, error handling and credentials.
Q: Which parts are hardest to move between tools?
A: Data mapping and expressions, error handling, and testing.
