## topic: Why numbers beat "it seems to work" | why-numbers
"It seems to work" doesn't convince a client and doesn't protect you. A number does: "**92% correct on 50 labelled messages**, and here are the 4 it got wrong."

You need a **labelled test set**: messages with the right category written down **by you, in advance**. Build it **before** you tune the prompts, and include hard cases.

Keep a part (say 10 messages) you **never tune against**. If you keep adjusting the descriptions until the test set passes, you fit your own tests and the number no longer tells you how it behaves on new messages. (You know this idea from your mathematics: overfitting to the training data.)
know: Explain a labelled test set and the set you never tune on
Q: Why keep a set of messages you never tune on?
A: If I tune against all the tests, the score only shows I fit those tests, not how well it handles new messages.

## topic: Accuracy, precision, recall and the confusion matrix | metrics
Say `sales` is a category and look only at it.

- **Accuracy** = correct answers ÷ all answers. It hides problems when categories are uneven: if 95 of 100 messages are `support`, always answering `support` gets 95%.
- **Precision** for a category: of the messages the AI put there, the share that truly belong there. (Low precision: the sales team is flooded with junk.)
- **Recall** for a category: of the messages that truly belong there, the share the AI found. (Low recall: real sales leads get missed.)
- **Confusion matrix**: a table with true categories as rows and predicted categories as columns. It shows which categories get **mixed up**.

Worked example: for `sales` the AI said "sales" 10 times; 8 were really sales (precision 8/10 = 0.8). There were 16 real sales messages and it found 8 (recall 8/16 = 0.5).

Which one matters depends on the cost of the mistake. Missing a lead is a **recall** problem; flooding a team with junk is a **precision** problem.
know: Calculate accuracy, precision and recall from counts
know: Say which metric matters for which kind of mistake
know: Read a confusion matrix
Q: Precision for `sales` is 8/10 and recall is 8/16. In words, what does each tell a client?
A: Precision: 8 of every 10 messages sent to sales really are sales. Recall: it finds only half of the real sales messages.
Q: Why can high accuracy be misleading?
A: If categories are uneven, always guessing the biggest one still scores high.
Q: What does a confusion matrix show?
A: Which true categories get mixed up with which predicted ones.

## topic: Repeatability and regression testing | regression
**Models are not perfectly repeatable**, even at low temperature. Run the test set **twice** and look at both runs.

**Regression testing:** every time you change a description, prompt or model, run the **same test set again** and compare with the numbers in your log. A change that fixes one case can break two others.

Keep an `eval-log.md` with: date, the category descriptions used, the scores, and which messages changed.

**Cost:** a test run uses real tokens. 50 short messages is tiny, but still check. Use the learning key with fake messages only. Tools like DeepEval exist for this at scale; you don't need one yet, and writing your own 40-line script teaches you what they measure.
know: Run the test twice and log it
know: Re-run the same test set after every change
Q: Why run the test set after every change to a description?
A: A change can fix one case and break others. Comparing with earlier numbers shows what really improved.
Q: Why run the same test twice with no change?
A: Models aren't perfectly repeatable, so I need to see the variation.

## topic: Build the eval script | build-eval
Extend `tests/classify.json` to at least **40 messages**, each with its correct label: every category at least 6 messages, 8 of them hard, and 10 set aside that you never tune on.

In `03-ai\eval_classifier.py` write a script that:
1. sends each message to your n8n webhook (use a request timeout and a short pause between calls),
2. collects the category from the response,
3. prints accuracy, per-category precision and recall, and a confusion matrix.

Run it twice and record both results in `eval-log.md`. Change **one** category description, run again, and record whether the numbers got better or worse and which messages changed.

Done when your script prints accuracy, precision, recall and a confusion matrix, your log has at least two runs, and you can explain why you keep a set you never tune on.

Be ready for a client asking "so is it 92% safe?". An honest answer: it is 92% right on this test set; here are the kinds of messages it gets wrong; here is what happens to those (a review route); and we keep measuring.
know: Write eval_classifier.py that prints the four results
know: Answer a client who asks if 92% is safe
Q: What should an honest answer to "so is it 92% safe?" include?
A: It is 92% on my test set, which kinds of messages it gets wrong, a review route for uncertain ones, and that we keep measuring.
Q: What does the script send to the webhook and what does it collect?
A: Each test message; the category returned, which it compares with the label.
