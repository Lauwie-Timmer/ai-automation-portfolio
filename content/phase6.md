# p6 | Phase 6 | Deliver, repeat, bring the friends in | 0 | Ongoing, starts with your first job
intro: This phase has no exam. It's the real thing. Each step is a habit you repeat with every client, and each one feeds the shared business: finished jobs become case studies, and the lessons become the way you and your friends work together.
start: Role: Mapmaker. When my first job is accepted, ask me 5 questions about the client, the scope and the deadline, then make a plan for delivery with milestones and update messages.

## p6-tpl | l | must | Build your templates pack | 90 min | Explainer, Checker
goal: Have five reusable documents so every job starts and ends the same professional way.
learn:
- Five templates: kickoff questions, scope of work, change request, handover, update message.
- Adapt them for every client; never paste them unchanged.
do:
- Create a folder `C:\dev\automation-portfolio\templates` and write all five as short Markdown files from the structures above: `kickoff-questions.md`, `scope-of-work.md`, `change-request.md`, `handover.md`, `update-message.md`.
- Fill in the scope of work for Project B as if a client had hired you, with exclusions and a price. Then fill in a handover for it.
- Ask Claude to review them as a client who has been burned before.
done: Five templates exist, a worked scope and handover exist for Project B, and the reviewer finds nothing a client could read two ways.
prompt: Check me (Checker) | Role: Checker playing a client who was burned by a freelancer before. Here are my five templates and my worked scope and handover for Project B: [paste]. Find anything vague, anything that could be read two ways, and what I forgot to ask. Don't rewrite them. Ask me what I would do if the client changes their mind in the middle of a milestone.

## p6-1 | b | must | Deliver your first job well | ongoing | Explainer, Checker
goal: Finish the first job on time, with clear communication and a good review.
learn:
- Confirm scope in writing, update every 2 to 3 days, say early if you're late.
- Test with the client's data, hand over with a video, and ask for a review only after acceptance.
do:
- Make a delivery checklist in `delivery-checklist.md` from the points above. Use your templates from p6-tpl for the kickoff, update messages and handover.
- Send your first update at the time you promised.
done: The job is accepted and paid, and the client has left a review.
prompt: Check me (Checker) | Role: Checker. Here is my plan, scope message and delivery checklist for my job: [paste]. Find what could go wrong, what the client might misunderstand, and what I should clarify now. Don't rewrite it.

## p6-2 | b | must | Turn each finished job into a case study | 30 min | Clerk
goal: Reuse every job as portfolio material, safely.
learn:
- Ask permission, remove anything that identifies the client, then use the five-part case study.
do:
- Write the case study within a week of the job ending, while you remember the details.
done: A new case study is on your profile, with the client's agreement.
prompt: Check me (Clerk and Checker) | Role: Clerk and Checker. Here are my notes about a finished job: [paste, anonymised]. Turn my notes into the five-part structure without adding anything I didn't write, then mark anything that might identify the client or that I can't prove.

## p6-3 | l | must | Sort out business, tax and data basics | 2 hours | Explainer, Checker
goal: Know what you need so that earning money doesn't create problems later.
learn:
- Ask an accountant about tax and VAT. Claude isn't a tax adviser.
- You are usually the GDPR processor, so keep personal data out of prompts.
- n8n's licence allows building for clients, not hosting n8n as a service for them.
res:
- n8n Sustainable Use License (the licence text on GitHub) | https://github.com/n8n-io/n8n/blob/master/LICENSE.md
- EU AI Act, Article 50 transparency rules (a practical guide) | https://artificialintelligenceact.eu/transparency-rules-article-50/
do:
- Write a list of questions for your accountant or tax authority and book a short call. Cover at least: does freelancing on Upwork fit your current business registration; how to invoice Upwork and clients; VAT (BTW) on services to business clients in other EU countries (reverse charge) and outside the EU; if you are in the Netherlands, whether the small-business VAT scheme (KOR) applies to you; whether you must file EU sales listings; how Upwork's service fee is booked; how income tax and deductions work for you; and which records to keep.
- Read the n8n licence page and write 3 sentences on what it means for how you work with clients.
- Write a one-page `client-data-rules.md` for yourself: what data you accept, what you refuse, how you handle keys.
done: Your questions are sent or booked, and you can explain the licence and your data rules in your own words.
prompt: Check me (Socratic) | Role: Socratic questioner. Here are my questions for the accountant, my notes on the n8n licence and my data rules: [paste]. Ask me one question at a time to find gaps, such as what I do when a client sends customer lists, whose API key goes in the workflow and whether I may host n8n for a client. Remind me that you aren't a lawyer or tax adviser.

## p6-4 | b | must | Learn where a client's n8n will run | 60 min | Explainer, Socratic
goal: Answer "where will this run, and who looks after it?" before a client asks.
learn:
- Options: n8n Cloud, a client-owned VPS, your own shared host (licence risk), or their existing tool.
- Watch spending, execution clean-up and uptime. Back up the encryption key.
- Docker Compose rebuilds a server with one command. Small clients don't need Kubernetes.
res:
- n8n pricing (check the Cloud plans) | https://n8n.io/pricing/
- n8n docs: Hosting | https://docs.n8n.io/deploy/host-n8n/
- Docker docs: Docker Compose overview | https://docs.docker.com/compose/
do:
- Write a one-page `hosting-options.md` with the four options, their rough monthly cost (check the live prices today), and who does what for each.
- Write a 4-sentence answer you'd give a client who asks "where will it run and what if it breaks?".
- Write down the three monitoring checks you'd set up for a client (spending limit, clean-up, uptime ping) and where each one is configured.
- Write 3 sentences explaining Docker Compose and Kubernetes to a client, and why their project probably doesn't need Kubernetes.
done: Your page has real prices and your answer is honest about backups, updates and who is responsible.
prompt: Check me (Socratic) | Role: Socratic questioner. Here is my hosting options page and my client answer: [paste]. Ask me one question at a time: what happens to the saved logins if the server disk dies, why can't a webhook from Stripe reach my laptop, who pays when the server is down at 2am, what must I not promise, and why does a small client not need Kubernetes. Don't give me the answers.

## p6-5 | b | must | Hold a team meeting with your friends | 90 min | Interviewer, Mapmaker
goal: Agree how the four of you work, share work and split money before the first shared client.
learn:
- Agree roles, money split and what happens if someone leaves before any money exists.
- Write one page and keep secrets in a shared password manager, never in chat.
do:
- Send the team the roadmap and dashboard so each person can follow it.
- Run the meeting with a 5-point agenda: skills, roles, money split, first target client type, how to review each other's work. Write the decisions in `team-agreement.md`.
done: A written one-page agreement that everyone has read.
prompt: Prepare me (Interviewer and Mapmaker) | Role: Interviewer, then Mapmaker. Ask me 6 questions about my three friends, their skills and the time they have. Then draft a 5-point agenda and a list of decisions we need to make about roles and money, with a short explanation of each option. Don't decide for us.

## p6-git | l | must | Set up the team's shared repo and review habit | 90 min | Explainer, Examiner
goal: Work in one repository with three friends without overwriting each other's work or leaking secrets.
learn:
- Nobody commits to main: branch, pull request, a teammate's review, then merge.
- Practise one merge conflict on purpose. Never commit secrets.
res:
- GitHub docs: About pull requests | https://docs.github.com/en/pull-requests/reference/pull-requests
- GitHub docs: Resolving a merge conflict | https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/resolving-a-merge-conflict-using-the-command-line
- Bitwarden: password manager (one option) | https://bitwarden.com/
do:
- Create the shared repo, add your three friends as collaborators, and add a `CONTRIBUTING.md` with the five rules above.
- Each person makes a branch, changes one line of the same file on purpose, and opens a PR. Merge the first one, then resolve the conflict in the second together.
- Each person reviews one PR and leaves two comments: one question and one suggestion.
- Set up the shared password manager and move the team's shared logins into it.
done: Everyone has opened and reviewed a PR, a merge conflict was resolved on purpose, and no secrets are in the repo. You can explain branch, PR and conflict to someone new.
prompt: Quiz me (Examiner) | Role: Examiner. Give me 5 team-Git scenarios one at a time, getting harder: someone committed an API key, two people edited the same file, a PR is too big to review, someone pushed to main by accident, a friend leaves the team. Ask what I'd do and why, and tell me my level.

## p6-6 | b | must | Pick one niche and write your one-sentence offer | 60 min | Mapmaker, Checker
goal: Be known for one thing, based on what actually sold or got answered.
learn:
- I help [who] [get result] by [method]. Choose from evidence: replies, natural calls, projects you enjoyed.
do:
- Write 3 candidate offers from your evidence, one sentence each. Pick one to try for a month.
- Update your headline and team pitch to match.
done: One sentence offer that matches evidence and that a stranger could repeat.
prompt: Check me (Mapmaker and Checker) | Role: Mapmaker, then Checker. Here is my evidence (replies, calls, jobs) and my 3 candidate offers: [paste]. Tell me which one the evidence supports best and why, and where I'm making a leap without evidence. Don't pick for me without asking me why first.
