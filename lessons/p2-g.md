## topic: What the Phase 2 exam covers | covers
The exam has questions and one **debugging task**, because clients rarely ask you to build from nothing: they ask you to fix something that stopped working.

It covers only what Phase 2 taught:
- items and expressions
- credentials
- IF vs Switch
- Split Out and Aggregate (and Filter)
- the error workflow and retry risks
- what an export contains
- webhook authentication

For the debugging scenario you describe what you would check, in order. A good routine: open the failed execution, find the **last node that worked**, look at its **Output** (item count and shape), then at the failing node's **Input**, then at the expression or setting that uses it.

Pass mark: at least 80%, the broken workflow fixed, and two workflows with error handling that you could demo on a call.
know: Know what the exam covers and the pass mark
know: Describe a debugging routine for a failed execution
Q: A workflow stopped working. Which steps do you take to find the cause?
A: Open the failed execution, find the last node that worked, check its Output (items and shape), then the failing node's Input and the expression or setting using it.
Q: What is the pass mark and what else do you need?
A: At least 80% and the debugging scenario fixed, plus two workflows with error handling to demo.

## topic: After the exam | after
Same loop as before: the **diagnostician** finds the one root misunderstanding behind your mistakes, and the **clerk** makes 8 flashcards to review the same day, the next day, after 3 days, a week and two weeks.
know: Say what happens after the exam
Q: What do the diagnostician and the clerk do after the exam?
A: The diagnostician finds the root misunderstanding behind my mistakes; the clerk makes flashcards for spaced review.
