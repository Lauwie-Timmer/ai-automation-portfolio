## topic: Why you rebuild it | why-rebuild
Seeing a solution once teaches little. Building it again from a **blank page** is what makes it stay. This step has no new material: it tests whether Phase 1 stuck.

Rules:
- Close all notes and old scripts.
- Set a timer.
- If you're stuck for 10 minutes, note exactly what you're stuck on, then ask. That note is valuable.
know: Rebuild without notes and time yourself
Q: Why rebuild from a blank page instead of reading your old script?
A: Rebuilding from memory is what makes it stick; reading a finished solution teaches little.

## topic: The task | task
1. Create `post_again.py` and a new n8n workflow `03 receive again` from a blank canvas.
2. Send `{"city": "Rotterdam", "temp": 14}` from Python to the webhook.
3. In n8n receive it, keep only `city` (remember: your data is under `body`), and confirm it in **Executions**.
4. Note how long it took. Target: under 20 minutes without help.
5. Dictate a 2-minute spoken explanation of the whole flow, as if to a client, and paste the transcript to Claude (Win+H starts voice typing in Windows 11).

Your explanation must cover: the request, the webhook URL (test vs production), items, and status codes.
know: Rebuild both sides of a webhook in under 20 minutes
know: Explain the whole flow aloud
Q: Which expression reads `city` after the Webhook node?
A: `{{ $json.body.city }}`
Q: Which four things must your spoken explanation cover?
A: The request, the webhook URL (test vs production), items, and status codes.
