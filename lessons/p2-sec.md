## topic: A webhook URL is an open door | open-door
Anyone who learns your webhook address can send data to it: from a screenshot, a log, a leaked repo, a browser history. They can trigger your workflow, fill your data with junk, or run up a bill. **A long random path is not security**: it only makes the address hard to guess, not hard to find.

The fix is **authentication**: the workflow rejects requests that don't prove who they are, **before** your workflow runs.

Locally, on your own machine, you are the only one who can reach `localhost`, so the risk is small. But the habit has to be built now, because the moment a client's workflow has a public URL, this is what protects it.
know: Explain why a secret path is not enough
Q: Why isn't a long random URL enough protection?
A: It only makes the address hard to guess. Once it leaks (screenshot, log, repo) anyone can call it.

## topic: Header Auth, Basic Auth and JWT | auth-types
The Webhook node's **Authentication** setting offers: **None**, **Basic Auth**, **Header Auth** and **JWT Auth**.

| Type | How the caller proves itself | Typical use |
|---|---|---|
| **Basic Auth** | username and password sent with the request | simple tools |
| **Header Auth** | a named header with a secret value | scripts and many services (the usual choice) |
| **JWT Auth** | a signed token that n8n verifies | services that issue tokens |

You store the secret in an n8n **credential** (you met credentials in p2-1), and the Webhook node picks that credential. A call without the right secret is rejected and your workflow does **not** run. The caller gets an authorization error status (usually `401` or `403`): note what you actually see when you test.

Some services (payment providers) don't use a header secret. They **sign** each request, and you verify the signature with a shared secret. n8n can do that with a little code. You'll learn that when a job needs it.
know: Name the Webhook authentication types and when each is used
Q: Which authentication type is the usual choice for your own scripts, and how does it work?
A: Header Auth: the caller sends a named header with a secret value.
Q: What happens to the workflow when a call has a wrong secret?
A: The call is rejected before the workflow runs.

## topic: Keeping the secret secret | secret-handling
The secret lives in **n8n credentials** and in your **`.env`**. It never appears in the workflow, the repo, or a screenshot.

Generate a long random one with Python:

```
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

`python -c "..."` runs the code in quotes (you used it in p0-4). `secrets.token_urlsafe(32)` makes a random text string that is hard to guess.

Steps:
1. Add `WEBHOOK_SECRET=<the secret>` to your `.env`, and `WEBHOOK_SECRET=` with no value to `.env.example`.
2. In n8n create a **Header Auth** credential: name `X-Webhook-Secret`, value your secret.
3. In `04 signup intake`, set the Webhook node's **Authentication** to **Header Auth** and choose that credential.
4. In your Python test script read the secret with python-dotenv (p0-5) and send it as a header:

```python
import os, requests
from dotenv import load_dotenv
load_dotenv()
headers = {"X-Webhook-Secret": os.getenv("WEBHOOK_SECRET")}
r = requests.post(url, json=payload, headers=headers, timeout=10)
```

Never `print` the secret.
cmd: `python -c "import secrets; print(secrets.token_urlsafe(32))"` | prints a long random secret
know: Generate a secret and store it in .env and an n8n credential
know: Send the secret as a header from Python without printing it
Q: Where may the webhook secret live, and where must it never appear?
A: In n8n credentials and `.env`. Never in the workflow, the repo or a screenshot.
Q: Why do you add `WEBHOOK_SECRET=` with no value to `.env.example`?
A: So others know the variable exists without seeing the real secret.

## topic: IP allowlist and what authentication does not do | allowlist
The Webhook node has an **IP(s) Allowlist** option (a comma-separated list of addresses). Requests from any other address are rejected with a **403** error. It helps when the caller has a **fixed** address. Many cloud services don't, so don't rely on it alone.

**Authentication is not encryption.** A secret header protects *who may call*, but without HTTPS the secret travels readable. Real deployments use HTTPS (you'll learn that in p6-4). On your own machine, for practice, it is fine.

Test it: add an allowlist with an address that isn't yours, send a request and see the **403**. Remove the allowlist afterwards.

Then test three calls with the secret: the right header, no header, a wrong one. Write down the status codes of the last two.

Done when the right header works, a missing or wrong one is rejected before the workflow runs, and you can explain why a secret path isn't enough and what authentication does and doesn't protect.
know: Test the right, missing and wrong header
know: Say what an IP allowlist does and returns
know: Say what authentication does not protect against
Q: What status does a request from a non-allowed IP get?
A: 403.
Q: What does authentication not protect against?
A: Reading the traffic: it isn't encryption. HTTPS is needed for that.
