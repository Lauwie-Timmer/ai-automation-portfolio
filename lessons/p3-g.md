## topic: The questions business owners ask | owner-questions
Business owners rarely ask how it works. They ask:
- **"Will it make mistakes?"** Yes, sometimes. I measure how often with a test set, uncertain cases go to a person, and everything is logged.
- **"What does it cost?"** Build fee once, AI usage on their own paid account (per token; a few euros a month for hundreds of requests a day for a classifier), and maintenance if I host it.
- **"Do I need an agent?"** Usually not. If the steps are known, a plain workflow is cheaper, faster and predictable. An agent is for when the path depends on the input.
- **"What happens if the AI is wrong?"** A review route, validation, logs, and no risky actions without approval.
- **"What do you do with my customers' data?"** Only what's needed; no secrets or personal data in prompts without agreement; paid provider terms (no training on the data) and, in the EU, a paid account.

The exam practises answering these in plain language, with honesty about limits.
know: Answer the five owner questions in plain language
Q: A business owner asks "do I need an AI agent?". How do you answer honestly?
A: Probably not: if the steps are known a plain workflow is cheaper, faster and predictable. An agent is only for cases where the path depends on the input.
Q: "What happens if the AI is wrong?"
A: Output is validated, uncertain cases go to a person, and every decision is logged, so mistakes are caught and fixable.

## topic: What the exam covers | covers
The exam has two halves: first the examiner plays a **sceptical small-business owner** and you answer in plain language; then the examiner **scores your technical answers out of 10**.

Technical coverage: what an LLM is, tokens and cost, workflow vs agent, tool calling, prompt injection, RAG (chunks, embeddings, vector store), evaluating a classifier (accuracy, precision, recall), and reliability (validation, review route, logging, retries, limits).

Pass mark: at least 80%, including an honest answer on when an agent is overkill. Then the usual diagnosis and flashcards.
know: Know what the exam covers and the pass mark
Q: What must your exam answers include besides correct facts?
A: An honest answer on when an agent is overkill.
