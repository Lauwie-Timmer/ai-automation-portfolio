## topic: Why clients care about your AI use | why
You use AI tools constantly: a coding assistant, chat models, and model calls inside workflows. Clients, and Upwork, now care about this. **Using AI is normal. Using it secretly, or with the wrong data, is the problem.**

You need a written answer to "do you use AI on my data?" before any job starts. The answer must be **honest and specific**: which tools, what they see, and what you never send.
know: Say what is acceptable about AI use and what is the problem
Q: What is the real problem with using AI on client work?
A: Using it secretly or sending the wrong data, not using it at all.

## topic: What data goes where | data
List it **tool by tool**:
- Your **coding assistant** sees your code and files.
- A **model inside a client's workflow** sees whatever the workflow sends it.
- The **provider's terms** decide whether it keeps or trains on that data. **API terms usually differ from consumer chat terms**, so read each provider's terms.

**Free tiers:** the Gemini API's additional terms say you may use only **paid services** when you make an API client available to users in the **EEA, Switzerland or the UK**. So **client work needs a paid account on the client's own billing, never your free learning key.** (Checked on ai.google.dev/gemini-api/terms; re-read it, it can change.)

**Upwork's own AI use:** the source for this roadmap (a law blog) says that since **5 January 2026** Upwork's terms allow it to use content created on the platform (messages, deliverables, files) to train its AI models, and that you are opted in unless you change your **AI Preferences** in your settings. That is second-hand: **read Upwork's current User Agreement and your settings yourself.** Only you can change them.
know: Explain why client work can't run on a free API key
know: Say who decides whether a provider trains on data
know: Say what to check in your Upwork settings
Q: Why can't client work run on your free Gemini key?
A: The terms say API clients available to users in the EEA, Switzerland or the UK may use only paid services, so client work needs a paid account on the client's billing.
Q: What decides whether a provider keeps or trains on your data?
A: The provider's terms; API terms usually differ from consumer chat terms, so read each one.
Q: What do you check in Upwork's settings?
A: The AI Preferences (or similar privacy settings), and I decide my own choices.

## topic: Consent and practical rules | rules
**Client consent:** some clients write "no AI" or "no third-party tools" into contracts. Even when they don't, tell them which AI tools you use on their work and which data those tools see, and get **written consent**. Put a sentence in your scope of work, for example:

> "I may use AI tools to help build and test this. I'll tell you which ones and what data they can see, and I won't send your customers' data to a tool without your written OK."

**Practical rules:**
1. Use **fake or masked data** for building and testing.
2. **Remove names, emails and IDs** from text before sending it to a model when you can.
3. **Never paste secrets** into an AI tool.
4. Keep **client data out of your own prompts and your own repo.**
5. If a client forbids AI, don't use it on their work, and say how that changes the price and timing.

For the scope-of-work template, add this sentence when you build it in p6-tpl.
know: Write the consent sentence for a scope of work
know: List the practical data rules
Q: A client wants you to test with their real customer list. What do you say?
A: I'd ask to test with fake or masked data first. Real data only with written consent, and I won't paste it into a tool that isn't approved.
Q: Name four practical rules for AI and client data.
A: Use fake or masked data; remove names, emails and IDs; never paste secrets; keep client data out of my own prompts and repo.

## topic: Writing ai-use-policy.md | write
One page with:
1. **The tools you use** (coding assistant, chat model, models in workflows).
2. **For each, what data it can see.**
3. **What you never send.**
4. **How you mask personal data.**
5. **Which provider terms you checked** (and the date).
6. **One consent sentence** for proposals and scopes of work.

Done when the policy exists, you know your Upwork AI settings, and you can answer "do you use AI on my data?" honestly and specifically. Claude isn't a lawyer; for a specific client contract, ask a professional.
know: List the six parts of the AI-use policy
Q: What six things does ai-use-policy.md contain?
A: The tools I use; what data each sees; what I never send; how I mask personal data; which provider terms I checked and when; and the consent sentence.
