# Learning skills

These skills live in `C:\Users\lauwi\.claude\skills\`, so they work in every project and every Claude Code session, not only this folder. They apply the method from the video (produce, don't consume; hint before answer; check honestly; space the reviews) to **any** topic.

## Start here

Type `/lesson-manager`, or just say what you want:

- "Teach me X" or "let's do the next step"
- "I'm stuck on X" or "I'm done, check it"
- "Weekly check-in"
- "Help me prepare for my <course> exam"

The manager looks at what you have (plan, mistakes, time available), picks the right skills below and chains them.

## The skills

| Skill | Role from the video | Say something like |
|---|---|---|
| `lesson-manager` | Conductor | "next step", "let's study" |
| `learn-interview` | Interviewer | "interview me", "assess my level" |
| `learn-map` | Mapmaker | "make me a plan" |
| `learn-resources` | Librarian | "find me a resource for X" |
| `learn-teach` | Explainer | "explain X", "I'm stuck" |
| `learn-practice` | Task designer | "give me an exercise" |
| `learn-socratic` | Socratic questioner | "ask me questions about X" |
| `learn-check` | Checker | "I'm done, check my work" |
| `learn-listen` | Listener | "let me explain it to you" |
| `learn-exam` | Examiner | "test me", "mock exam" |
| `learn-spar` | Sparring partner | "play a skeptical client", "oral exam" |
| `learn-diagnose` | Diagnostician | "weekly check-in", "why do I keep failing X" |
| `learn-clerk` | Clerk | "log that", "make flashcards", "check it off" |
| `learn-improve` | Skill improver | "improve the skills", "that didn't work" |

## One step, start to finish

Teach (short) → you build something → Socratic questions → Checker verifies "Done when" → you explain it back → redo if I had to explain → Clerk logs mistakes, adds cards, checks off.

## Where things are written

- **This roadmap:** steps in `content\*.md`, full lessons and the Must know lists in `lessons\<step-id>.md`, progress on the dashboard, mistakes in `mistakes.md`, cards in `cards\phaseN.txt`. The skills know these conventions: they teach every Must know item and examine only from that list.
- **Any other subject or course:** a `.learning/` folder (or one you choose) with `profile.md`, `plan.md`, `mistakes.md`, `cards.txt`, `log.md`. The clerk creates it when you ask.

## For university courses

Say "new course" and give the course name and exam dates. The manager interviews you, maps the plan backwards from the exam, then runs a weekly rhythm: summarise the lecture from memory, cards, problems with hints, explain-it-back on hard topics, a mock exam a week before, and an oral-exam spar. It teaches and checks your work but does not write answers you will submit for grades. Check your university's AI policy.

## How the skills improve themselves

While you learn, the clerk notes anything about the teaching itself: you say "too long", something works well, a time estimate is far off. At the end of each session, after each exam and in each weekly check-in, `learn-improve` reads those notes and edits the skills.

- **Small fixes** (wording, an example, a new question type) are applied and reported in a line or two.
- **Significant changes** (ground rules, pass marks, the hint ladder, adding or removing a skill) need your yes first, with before and after shown.
- **Safety and honesty rules can't be weakened**: no real secrets, no writing graded answers, no legal or tax advice, honest "not yet".
- Subject-specific fixes go into the plan or project files, so the skills stay general.
- Every edit has a backup in `~\.claude\skills\lesson-manager\history\` and a line in `CHANGELOG.md` next to it. Say "revert" to undo one.
- An edit applies from the next time a skill is invoked, not inside the current conversation.

You can also ask directly: "make the examiner stricter" or "add a rule to the clerk".
