## topic: What the Phase 1 exam covers | covers
The exam has two parts: questions, then one timed build. It covers only what Phase 1 taught:

- GET vs POST, and what HTTPS hides
- status codes (2xx, 4xx, 5xx, 401, 403, 404, 429)
- headers and API keys
- JSON
- what a webhook is
- test vs production URL
- items and expressions in n8n
- Git basics: the three places, add vs commit, branches, merge, a committed secret

The **timed build**: send JSON from Python to an n8n webhook and keep one field, in 20 minutes, no notes.

Pass mark: at least 80%, the timed build works, and you can explain a webhook vs an API call to a non-technical person.

Everything is in the lessons p1-1 to p1-6. Use each topic's Check yourself questions to find what's shaky before you start.
know: Know what the exam covers and the pass mark
Q: What is the timed build?
A: Send JSON from Python to an n8n webhook and keep one field, in 20 minutes, with no notes.

## topic: After the exam | after
Same loop as Phase 0: the **diagnostician** finds the one root misunderstanding behind your mistakes (from the exam and `mistakes.md`), and the **clerk** makes 8 flashcards. Review them the same day, the next day, after 3 days, a week and two weeks.

Practice explaining a webhook to a non-technical person: "It's like leaving your phone number with a shop: instead of you calling every day to ask if your order is ready, they call you when it is."
know: Explain a webhook to a non-technical person
Q: Explain a webhook to a non-technical person in one or two sentences.
A: Instead of me asking a service again and again, I give it my address and it sends me a message the moment something happens.
