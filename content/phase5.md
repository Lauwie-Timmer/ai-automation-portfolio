# p5 | Phase 5 | Selling | 6 | Discovery calls, proposals and pricing
intro: Building is half the job. This phase teaches you to find the right jobs, write short proposals that get answered, run a first call, and price a small project. You'll practise on me as a client first, so your first real call isn't your first call. Start the proposal step (p5-4) as soon as Project B is finished. You don't need to wait for the rest of Phase 4. Only you can send proposals and edit your Upwork account.
start: Role: Interviewer. Before Phase 5, ask me 5 questions, one at a time, about how I feel about selling, what went wrong in the door-to-door solar sales, and what I'm afraid will happen on a call. Use my answers to adjust the practice in this phase.

## p5-1 | p | must | Learn what a discovery call is and how to run one | 45 min | Explainer, Socratic
fast: yes
goal: Be able to run a 15-minute call where you ask good questions and the client does most of the talking.
learn:
- A discovery call is to understand the problem, not to pitch. Let the client do most of the talking.
- Seven parts: agenda, problem, impact, current process, constraints, success, next step.
- Never bluff, and don't quote a price on the call.
do:
- Write your own list of 8 discovery questions in `discovery-questions.md`, in your own words, from the structure above.
- Write a 3-sentence opening about who you are and what you do. Say it aloud twice.
- Run the Socratic prompt.
done: You can explain the 7 parts of a discovery call and why you don't pitch or quote first.
prompt: Check me (Socratic) | Role: Socratic questioner. Ask me one question at a time until I find my gaps about discovery calls: what is the goal of the call, why not quote a price first, what to do when I don't know the answer, how to handle a vague client, and how my solar sales experience is different from this. Don't give me the answers.

## p5-2 | l | must | Finish your Upwork profile | 60 min | Checker
fast: yes
goal: A profile that looks specific and honest, with the projects you have finished so far on it.
learn:
- Clients skim headline, first two lines, portfolio, skills and rate. Make them specific.
- Honesty rule: no fake reviews, invented clients or skills you can't show.
res:
- Upwork: how to get the Rising Talent badge | https://www.upwork.com/resources/how-to-get-rising-talent-badge
do:
- Take your headline and overview from p0-6. Update them with what you learned in market research and what you have built.
- Add the portfolio items you have finished (one or two is fine at the start, and three once Phase 4 is done), each with the 150-word case study, a screenshot and, if you made one, the video. Add more as you finish them. Remove anything with real personal data.
- Read Upwork's Rising Talent page and note which criteria you meet and which are missing.
- Add skills, choose your hourly rate (the goal is at least 20 euros an hour) and check that every claim is true.
- Ask Claude to review it as if it were a client. Only you edit the live profile.
done: Your profile has a specific headline, a clear overview, at least one honest portfolio item and a reasonable rate, and the reviewer finds no overclaims.
prompt: Check me (Checker) | Role: Checker playing a client searching for help. Here is my headline, overview, skills and three portfolio descriptions: [paste]. Tell me what a busy client would understand in 10 seconds, what is vague, what is an overclaim, and whether I look like someone to hire for the jobs in my market research. Don't rewrite it.

## p5-ai | b | must | Write your AI-use and client-data policy | 45 min | Explainer, Socratic
fast: yes
goal: Know exactly which AI tools see which client data, have the client's consent, and have it written down before any job starts.
learn:
- Using AI is fine; using it secretly or with the wrong data is not. List which tool sees which data.
- Client work needs a paid API account on the client's billing, never your free key.
- Get written consent and put a sentence in every scope of work.
res:
- Gemini API: Additional Terms of Service | https://ai.google.dev/gemini-api/terms
- Upwork: legal terms (read the sections on AI and data) | https://www.upwork.com/legal
do:
- Open your Upwork settings and find the **AI Preferences** or similar privacy settings. Read them and decide your own choices. Only you can change them.
- Write `ai-use-policy.md`, one page: the tools you use; for each, what data it can see; what you never send; how you mask personal data; which provider terms you checked; and one consent sentence for proposals and scopes of work, for example "I may use AI tools to help build and test this. I'll tell you which ones and what data they can see, and I won't send your customers' data to a tool without your written OK."
- Add the consent sentence to your scope-of-work template when you build it in p6-tpl.
done: Your one-page policy exists, you know your Upwork AI settings, and you can answer "do you use AI on my data?" honestly and specifically.
prompt: Check me (Socratic) | Role: Socratic questioner. Here is my AI-use policy: [paste]. Ask me one question at a time to find gaps: what if a client forbids AI, what exactly does my coding assistant see, what happens to a customer list I put in a prompt, why can't client work run on my free API key, and what would I say to a client who wants me to test with their real customer data. Don't give me the answers. Remind me that you aren't a lawyer.

## p5-3 | p | must | Learn to read a job post | 45 min | Explainer, Checker
fast: yes
goal: Decide quickly whether a job is worth a proposal, and what the client really wants.
learn:
- Read for the problem, the deliverable and the signals. Check the client's payment and history.
- Connects cost money, so apply only to jobs that score 4 or 5 out of 5.
- Learn the scam red flags: free tests, leaving the platform, fees, wallets, ID requests.
res:
- Upwork: how to identify and report scams | https://www.upwork.com/resources/upwork-scams
do:
- Take 5 job posts from your market research. For each write: the problem, the deliverable, the signals, red flags, and a fit score from 1 to 5.
- Run the Checker prompt with your scores.
done: Claude agrees with at least 4 of your 5 assessments, and you can name the red flags without looking.
prompt: Check me (Checker) | Role: Checker. Here are 5 job posts with my notes and scores: [paste the posts with client names removed]. Tell me where I misread the client's real need or missed a red flag, and which one or two I should apply to. Don't write the proposals for me.

## p5-4 | l | must | Write three proposals | 90 min | Checker, Clerk
fast: yes
goal: Write short proposals that show you understood the problem. Only you send them.
learn:
- Open with their problem, not "I'm an expert". About 120 words in five parts.
- Promise only what you can deliver, and never send the same text twice.
do:
- Pick your three best jobs from p5-3. Write each proposal in a file `proposals.md`.
- Run the Checker prompt on each, then fix every comment yourself.
- When Claude agrees each is ready, send them yourself on Upwork. Note the Connect cost.
done: Three proposals checked and sent, and you can explain why each one starts as it does.
prompt: Check me (Checker) | Role: Checker playing the client who posted this job: [paste job post]. Here is my proposal: [paste]. Tell me honestly what you noticed first, whether you'd reply, what felt generic, and what you'd want to ask. Don't rewrite it. Mark anything I couldn't deliver.

## p5-5 | p | must | Learn how to price and scope a small project | 45 min | Explainer, Examiner
fast: yes
goal: Quote a fixed price for a small automation job with a clear scope.
learn:
- Quote = tasks, hours, +50% buffer, times your rate, grossed up for the Upwork fee.
- Write what's included, what isn't, rounds of changes and milestones. Anything else is a new quote.
res:
- Upwork Help Center: fees and pricing | https://support.upwork.com/
do:
- Take Project B and pretend a client asked for it. List the tasks, estimate hours, add the buffer and write a 5-line scope with 2 exclusions.
- Run the Examiner prompt.
done: You can produce a quote with tasks, hours, buffer, price after fees and scope exclusions, and defend each part.
prompt: Quiz me (Examiner) | Role: Examiner. Give me 3 small client briefs, one at a time. For each, ask me to list tasks, hours, price and exclusions, and challenge my reasoning, for example "what if the client wants a change after you finish". Score me out of 10.

## p5-pkg | b | must | Design three fixed-price offers | 60 min | Mapmaker, Checker
fast: yes
goal: Turn what you can already deliver into three clear packages, each with a scope, a delivery time and a price.
learn:
- A package is a defined result at a known price: scope, exclusions, delivery time, assumptions.
- Start with three narrow offers you can prove with Projects A, B and C.
do:
- Write three packages in `offers.md`: name, who it is for, what's included, what isn't, delivery time, price, and what you need from the client.
- Check each against your real skills. If you haven't built it yet, write which project (A, B or C) will let you prove it.
- Ask Claude to review them as a small-business owner.
done: Three packages with honest scope, and a price that follows your own pricing method. Each package is backed by a project you've built or will build.
prompt: Check me (Checker) | Role: Checker playing a small-business owner. Here are my three packages: [paste]. Tell me which one I'd buy and why, what's unclear, what I'd expect that isn't listed, and where the price feels wrong. Don't rewrite them. Ask me which package I can actually deliver today.

## p5-6 | b | must | Practice three mock discovery calls | 90 min | Sparring partner, Listener
fast: yes
goal: Run three practice calls with different clients so the first real one isn't your first.
learn:
- Practise three calls with three personas, answering within 30 seconds, aloud.
- Each call is scored and gives you one thing to fix.
do:
- Run the sparring prompt for each persona, one per sitting, and answer within 30 seconds.
- After each call, ask for the scorecard, then write down the one thing to fix.
- Put your mistakes in `C:\dev\ai-automation-portfolio\mistakes.md`.
done: Three calls done, each scored, with at least one improvement visible between call 1 and call 3.
prompt: Start the call (Sparring) | Role: Sparring partner. Play a [café owner / e-commerce manager / technical founder] who posted this job: [paste job description]. Stay in character. I am the freelancer. Ask one thing at a time, push back when I'm vague, and don't make it easy. After 12 exchanges, stop and give me a scorecard out of 10 for: questions I asked, listening, honesty about what I can do, clarity, and whether I set a next step. Then tell me the one thing to fix.

## p5-7 | b | must | Reach out to your first clients directly | 2 hours | Mapmaker, Sparring partner
fast: yes
goal: Start real conversations with small businesses, using your case studies as proof, so you don't rely only on Upwork's few free Connects.
learn:
- Start warm, offer a problem you can solve, and send a short message with one small ask.
- Free work has no boundaries. Be wary of cold emails because EU rules are strict.
do:
- Write a list of 10 businesses or people: 5 warm, 5 local small businesses you can walk into or phone. For each, note a likely problem.
- Write three versions of the message (warm, local business, LinkedIn) and run them through the check prompt.
- Reach out to 5 of them yourself. Track in a sheet: who, when, reaction, next step.
- Book at least 2 conversations. After each, write down what you learned.
- If someone says yes, write the half-page scope and offer a small pilot.
done: Ten contacts listed, five reached, at least two conversations held and noted, and you can say what you would offer each one.
prompt: Start the call (Sparring) | Role: Mapmaker, then Sparring partner. First check my list of 10 contacts and my messages: [paste]. Then play a busy small-business owner I've just walked up to or phoned, who is polite but sceptical and has about 90 seconds. I'm the freelancer. Push back, don't make it easy, and after 8 exchanges score me out of 10 on opening, listening, honesty and asking for a next step.

## p5-r | b | redo | Redo without help: a call with a new client | 30 min | Sparring partner
goal: Show that you improved by repeating a call a week later with a different client.
learn:
- A week later, run a call with a new persona and no notes. Your score should be higher.
do:
- A week after p5-6, run a new sparring call with a persona you haven't met: the owner of a physiotherapy clinic who wants fewer no-shows and thinks "AI" sounds risky with patient data.
- Use the same 30-second timer and no notes.
done: Your score is higher than in call 1, and you handled the data-privacy concern honestly.
prompt: Start the call (Sparring) | Role: Sparring partner. Play the owner of a small physiotherapy clinic who wants fewer no-shows, is nervous about AI and patient data, and has a limited budget. I'm the freelancer. Stay in character, push back, and after 12 exchanges give me a scorecard out of 10 and compare it with my previous scores in C:\dev\ai-automation-portfolio\mistakes.md.

## p5-g | b | gate | Phase 5 exam | 45 min | Examiner, Diagnostician, Clerk
goal: Prove you can sell honestly, then fix the weak spots.
learn:
- The exam combines a proposal review, a short discovery call and a pricing question.
- You need 80% and your proposals sent.
do:
- Run the exam prompt. Use your real proposals.
- Make the flashcards and review them over the next two days.
done: At least 80% on the exam, and you can run a 15-minute call without freezing. Your proposals are sent.
prompt: Exam me | Role: Examiner. First review my best proposal [paste] against the job post [paste]. Then run a 5-minute discovery call as a client with a vague brief. Then give me a pricing question for a small automation job. Score me out of 10 on each of the three, and tell me my level.
prompt: Diagnose and flashcards | Role: Diagnostician, then Clerk. Look at my mistakes in this exam and in C:\dev\ai-automation-portfolio\mistakes.md. What one root misunderstanding is behind them? Then make 8 flashcards and save them in C:\dev\ai-automation-portfolio\flashcards\ as one tab-separated text file for this phase (question, tab, answer, one card per line) so I can import them into Anki.
