## topic: What clients actually ask for | requests
Job posts rarely say "build a workflow". They say: "when someone books on Calendly, add them to my CRM and tell my team". The skill is **connecting a tool from its API documentation**, whether or not n8n has a ready-made node for it.

Tools that come up often (pick yours from the market research in p3-7):
- **CRM or database:** Airtable, HubSpot, Notion
- **Booking:** Calendly, Cal.com
- **WordPress** (its REST API, for content jobs)
- **Payments:** Stripe
- **Team chat:** Slack

Use **free plans and test or sandbox modes**. Never practise on a client's live data or a live payment account.

Some features need a paid plan: for example Calendly's API webhooks need a paid Calendly plan (checked October 2026), so a free account can't practise that part. Read a tool's plan limits before you promise a client an integration.
know: Name five tools that often appear in job posts
know: Say the rule for practising with payment or booking tools
Q: Name five types of tool that appear often in automation jobs.
A: A CRM or database (Airtable, HubSpot, Notion), booking (Calendly, Cal.com), WordPress, payments (Stripe) and team chat (Slack).
Q: What mode do you use to practise with Stripe-type tools?
A: Free plans and test or sandbox mode, never live data.

## topic: How to read an API doc quickly: the six points | six-points
Answer these six questions, in this order, and write them in `integration-notes.md`:

1. **Authentication:** how do I prove who I am? An **API key**, a **bearer token** (a long secret sent in a header) or **OAuth2** (you log in and approve access, as with Google in p2-3)?
2. **Base URL and one example request:** where do requests go and what does a working one look like?
3. **Endpoints:** which ones do I need (list, create, update)?
4. **Rate limits:** how many requests per second or day before I'm blocked?
5. **Pagination:** when there are many results, how do I ask for the next page?
6. **Webhooks:** can the tool call *me* when something happens?

Example answers for Airtable (check the live docs, they change): authentication by **personal access token** with scopes; a base URL of `https://api.airtable.com/v0/<baseId>/<table>`; endpoints to list and create records; a rate limit of a few requests per second per base; pagination by an `offset` value in each reply.

n8n's built-in node covers most of this for popular tools. When there's **no node**, use the **HTTP Request node** with a **saved credential**: the key goes in the credential (as a Header Auth, p2-sec), never typed into the node.
know: Recite the six points of an API doc
know: Say what to do when n8n has no node for a tool
Q: What are the six things you look for in an API doc?
A: Authentication, base URL with an example request, endpoints, rate limits, pagination, and webhooks.
Q: n8n has no node for a tool. What do you do?
A: Use the HTTP Request node with a saved credential holding the key, following the tool's API doc.
Q: What is the difference between an API key and OAuth2?
A: A key is one secret you send with each request. OAuth2 has you log in and approve specific access, and the tool issues tokens.

## topic: Webhooks from outside tools and localhost | webhooks
Many tools can **call a webhook** when something happens. But your n8n is on `localhost`, so outside tools can't reach it. Two ways to practise:

1. **A local forwarder.** Stripe's command-line tool forwards test events to your computer: `stripe listen --forward-to localhost:5678/webhook-test/<your-path>` (you must be logged in with `stripe login`, and the **Test URL** is only listening while the workflow waits for a test event, as in p1-5). `stripe trigger payment_intent.succeeded` sends a fake payment event.
2. **Polling.** Use a **Schedule Trigger** and ask the tool's API what's new, as in p4-1.

Real clients need a **public HTTPS URL** (p6-4).

**Verify the sender.** Anyone who finds a webhook URL can post to it. Stripe signs every event in a `Stripe-Signature` header with a secret that starts `whsec_`; your handler must check it. In n8n that means extra work (a Code node, or a verified tool-specific trigger node) and is one reason a real Stripe integration is bigger than a practice one.
know: Say why a localhost n8n can't receive outside webhooks and two ways to practise
know: Say why webhook senders should be verified
Q: Give two ways to practise outside-tool events with a localhost n8n.
A: A local forwarder such as Stripe's CLI `stripe listen --forward-to localhost:5678/...`, or polling the tool's API from a Schedule Trigger.
Q: Why must a webhook handler check who sent the request?
A: The URL can be found and posted to by anyone, so you check a signature or secret to be sure it came from the real tool.

## topic: Make it safe to run twice | twice
Webhooks can arrive **twice**: Stripe documents that the same event may be delivered more than once and says to **log the event IDs you've processed and skip repeats**. Booking tools can resend too. This is the idempotency idea from p4-1.

Patterns:
- **Dedupe by id:** keep the event or booking id in a sheet or table; if it's already there, stop.
- **Upsert:** use "create or update" by a unique key, so a second run updates the same record instead of adding a copy.
- **Order isn't guaranteed:** Stripe says events may arrive out of order, so don't rely on sequence; fetch the object if you need its latest state.

Also reply fast: Stripe wants a `2xx` response quickly before any slow logic, or it retries.

**When the tool's API is down:** the HTTP Request or app node fails, the error workflow (p2-6) tells you, and retry-on-fail (p2-6) handles short blips.
know: Explain why a webhook may arrive twice and one way to dedupe
know: Say what happens when the tool's API is down
Q: Why must a webhook workflow be safe to run twice?
A: The sender may deliver the same event more than once (and retries on failures), so a repeat must not create duplicates.
Q: Name two ways to avoid duplicates.
A: Store processed event ids and skip repeats, or upsert by a unique key.
Q: The tool's API is down. What does your workflow do?
A: The node fails, the error workflow alerts me, and retry-on-fail covers short outages.

## topic: Build and ship the two workflows | build
1. Look at your market research (p3-7) and pick the **two tools that appear most**. Write why in `integration-notes.md`.
2. For each, answer the **six points** from its API docs in the same file.
3. Build **one workflow per tool** that does something real. Examples: a booking or form event creates a record in Airtable or a CRM and notifies you; a test-mode payment event adds a row to a sheet. Use the built-in node if there is one, otherwise the HTTP Request node.
4. Add the **error workflow** (p2-6) and make each workflow safe to run twice.
5. **Export both** with the CLI (p2-8) and commit them (p1-6). Check the exports hold no credentials.

Done when two workflows with real tools run, you wrote the six-point notes for both, and you can explain how you'd connect a tool that n8n has no node for.
know: Complete the six-point notes and build two workflows
know: Export and commit the workflows without secrets
Q: What do you write in `integration-notes.md`?
A: Why I chose the two tools, and the answers to the six API-doc points for each.
Q: What must be true of each workflow before you commit it?
A: It has an error workflow, is safe to run twice, and the export contains no credentials.
