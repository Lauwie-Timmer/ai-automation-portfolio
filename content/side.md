# tb | Track B | ComniWell | 0 | later, kept separate from the Upwork path
intro: Your app launches after store review and a day of your own testing. These three steps are small and wait until then. Marketing is a big subject, so we run it with the same method: map it, learn one piece, do it, test yourself.
start: Role: Interviewer. Ask me 5 questions about ComniWell: who it's for, what makes it different, my launch date and my budget. Then map the marketing topics I should learn, in order.

## tb-1 | b | must | Learn store listing basics (ASO) | 90 min | Explainer, Checker
goal: Write your store title, subtitle, keywords and description with a reason for each word.
learn:
- ASO is how people find your app. Title, subtitle and keywords are searched; screenshots and ratings decide installs.
- Choose keywords by what people search for, and test one change at a time.
do:
- After approval, list 20 candidate keywords, group them by intent, and pick the top 8 for the title, subtitle and keyword field.
- Ask Claude to review your listing as a store user.
done: A listing where every keyword has a reason, and screenshots that show the main benefit in the first two images.
prompt: Check me (Checker) | Role: Checker. Here is my draft store title, subtitle, keywords and description for ComniWell, and my 20 candidate keywords with reasons: [paste]. Challenge each choice. Which keywords are too competitive, too vague or don't match what people search for? Don't rewrite it for me.

## tb-2 | b | must | After launch: test one acquisition channel | 2 weeks | Interviewer, Checker
goal: Pick one channel, run a small test and measure the result.
learn:
- Don't try everything. Pick **one** channel (for example short videos, a fitness community, a small paid test) and measure installs per hour or euro spent.
- Write the hypothesis first: "I expect about X installs from Y". After two weeks, compare with the result and decide: continue, change or stop.
do:
- Write the hypothesis and the measure in `acquisition-test.md`. Run for 2 weeks. Write down the result.
done: A written result with a decision.
prompt: Check me (Checker) | Role: Interviewer, then Checker. Interview me about my target user and my time and money. Then check my hypothesis for the channel I picked: [paste]. Ask what I'd measure and what would make me stop.

## tb-3 | b | must | Set up launch basics | 2 hours | Explainer, Checker
goal: Have the basics ready so the first users aren't lost.
learn:
- The first week decides retention: a launch-day message, one retention number, and a rating prompt at a happy moment.
do:
- Write the launch-day email, decide your retention number and write down when the rating prompt appears.
done: The email is ready, the retention number is chosen and the rating moment is defined.
prompt: Check me (Checker) | Role: Checker. Here are my launch email, my retention measure and my rating prompt moment: [paste]. Find what would annoy a new user or tell me nothing useful. Don't rewrite them.

# rt | Retest | Gaps to retest | 0 | found in the interview
intro: These are the gaps found when we checked your level. They come back later in a quiz.
start: Role: Examiner. Test me on all the items in my retest list in one sitting, one question at a time, and tell me which I've fixed.

## rt-1 | p | must | GET vs POST | 10 min | Examiner
goal: Explain where parameters go, what each method means and what HTTPS protects.
learn:
- GET puts parameters in the URL and reads; POST puts data in the body and changes something.
- HTTPS encrypts both. POST alone doesn't hide data.
do:
- Explain it out loud without notes.
done: Claude agrees your explanation is correct.
prompt: Quiz me (Examiner) | Role: Examiner. Ask me 3 questions about GET vs POST, increasingly hard, and tell me whether I've fixed the gap.

## rt-2 | p | must | Workflow vs agent | 10 min | Examiner
goal: Explain the difference and when an agent is overkill.
learn:
- A workflow has fixed steps. An agent decides its steps at run time using tools. Use a workflow when you know the steps.
do:
- Explain it out loud to a non-technical person.
done: Claude agrees your explanation is correct and includes an example of each.
prompt: Quiz me (Examiner) | Role: Examiner. Ask me 3 questions about workflow vs agent, increasingly hard, and tell me whether I've fixed the gap.

## rt-3 | l | must | Git commands | 15 min | Examiner
goal: Use the core Git commands without looking them up.
learn:
- init, status, add, commit, branch or switch, merge, push, pull and log. Know which place each one affects.
do:
- Do a full cycle in a practice folder from memory.
done: Claude agrees you did it correctly and can explain each command.
prompt: Quiz me (Examiner) | Role: Examiner. Give me 4 Git scenarios, increasingly hard, and tell me whether I've fixed the gap.
