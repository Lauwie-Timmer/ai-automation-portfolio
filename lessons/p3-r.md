## topic: A new use case from a blank canvas | redo
Changing the use case proves you understood the **idea**, not the exact example.

New use case: sort customer emails of a **gym** into `membership`, `booking`, `complaint` and `other`, and extract `member_name`.

1. **Write 8 test messages first** (with the expected category), including hard ones.
2. Build it from a **blank canvas**: webhook → classifier → extractor → routes, plus the **review route** and the **logging** from p3-5.
3. Measure it on your 8 messages. Target: at least **7 of 8** correct.
4. **Dictate a 2-minute explanation** as if to a client who is afraid the AI will make mistakes. It must cover **testing**, **review routes** and **logging**, honestly: what it gets wrong, what happens to those, and how you'd know.
know: Rebuild the classifier for a new use case with tests first
know: Explain testing, review routes and logging to a nervous client
Q: What do you do before building, and why?
A: Write the test messages first, so I know what "correct" means and can't tune the tests to fit.
Q: What do you tell a client afraid of AI mistakes?
A: It will sometimes be wrong: I measure how often with a test set, uncertain cases go to a person for review, and every decision is logged so we can see and fix mistakes.
