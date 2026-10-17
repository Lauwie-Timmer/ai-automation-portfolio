## topic: How this exam works | exam
The real test of a portfolio is a **client's question**. This exam plays a sceptical client who has read your three case studies. It asks one question at a time, getting tougher, and scores your **honesty, clarity and technical accuracy** out of 10.

**Honest answers win.** "I haven't tested that yet, but here is how I would" is a good answer. Bluffing is not. A client who catches one bluff stops trusting the rest.

The questions come from this list. Have an answer ready for each:
- What happens when it breaks, and how do I find out?
- How do I know it's right (what did you test)?
- What does it cost to run each month?
- Who owns the code and the accounts?
- What about my customers' data?
- Why should I pay you instead of using Zapier?
know: List the six questions a sceptical client asks
know: Say what makes an answer good in this exam
Q: What are the six questions a sceptical client asks?
A: What happens when it breaks; how do I know it's right; what does it cost to run; who owns the code; what about customer data; why pay you instead of Zapier.
Q: What is a good answer when you haven't tested something?
A: Say so honestly and describe how you would test it. Never bluff.

## topic: Preparing your answers | prepare
Use the facts from Phase 4:
- **Breaks:** the error workflow (p2-6) emails you; retries cover short outages; the marker pattern means nothing is lost or repeated (p4-1).
- **Right:** your tests, the 8/4/3 test set in Project C, pytest in Project B, a labelled test set (p3-eval).
- **Cost:** n8n hosting (p6-4 later), model calls by token (p3-6), tool plans. Say "I'd calculate it from your volume" and show how.
- **Ownership:** the client owns their accounts and keys; you hand over exports, README and a video.
- **Customer data:** minimise it, keep it out of prompts, no health data in a first version, consent and GDPR (p4-3).
- **Versus Zapier:** I can build it in Zapier too; where logic is complex, AI is involved or per-task cost grows, n8n or Python can be cheaper and more flexible (p4-m).
know: Prepare a short honest answer for each of the six questions
Q: How do you answer "what does it cost to run?"
A: Break it down (hosting, model calls by token, tool plans), say I'd calculate it from their volume, and show the method.
Q: How do you answer "who owns it?"
A: The client owns their accounts and keys; I hand over exports, a README and a walkthrough video.

## topic: After the exam | after
1. Pass mark: **80%** and three case studies you can link on Upwork and show your friends.
2. Run the **Diagnose and flashcards** prompt: it looks for the one root misunderstanding behind your mistakes, then makes 8 flashcards in `C:\dev\ai-automation-portfolio\flashcards\`.
3. Review the cards over the next **two days**.
4. Add anything you got wrong to `mistakes.md`.
know: Say the pass mark and the follow-up steps
Q: What is the pass mark for Phase 4 and what comes after the exam?
A: 80% plus three linkable case studies. Then diagnose the root misunderstanding, make 8 flashcards and review them for two days.
