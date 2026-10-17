# Automation roadmap

Started 2026-10-04. Target: first paid Upwork money around 2026-11-10. Rate goal: EUR 20+ per hour (the first one or two jobs may pay less to earn reviews).

**Time:** the core steps add up to about 91 hours, including 25% extra for a first pass (the step times plus the time you struggle). At 10 hours a week that is about 10 weeks, at 15 hours a week about 7 weeks. Bonus steps and the side tracks are not included. Tell Claude your real weekly hours and it will turn this into dates.

**Fast lane (33 steps, about 40 hours):** the shortest honest route to your first Upwork proposals. It is the steps tagged FAST LANE below. The exams, redo steps, Projects A and C and the bonuses wait for later. Do them at weekends so the learning still locks in. At 10 hours a week the fast lane takes about 4 weeks. Skipping the redo and exam steps makes the learning shallower, so don't skip them for good.

Fast lane order: p0-1, p0-t, p0-2, p0-3, p0-4, p0-5, p0-6, p1-1, p1-py, p1-2, p1-3, p1-4, p1-5, p1-6, p2-1, p2-2, p2-sec, p2-3, p2-6, p3-1, p3-2, p3-7, p4-2, p4-4, p5-1, p5-2, p5-ai, p5-3, p5-4, p5-5, p5-pkg, p5-6, p5-7.

**This file is generated** from the files in `content/` by `node build.mjs`. Edit those, not this file. Progress is tracked on the dashboard: https://claude.ai/artifact/DmXKL2aJSErjY9fwktBchT

**Flashcards and quiz:** every phase has a ready-made deck in `flashcards/phaseN.txt` (import into the free Anki app: File, Import, field separator Tab). The same cards are in the spaced-repetition quiz page: https://claude.ai/artifact/A2u7LVj8CwKeVWrCibvH2m. It makes you write an answer before it shows the real one, and it brings cards back sooner when you miss them. Your own mistakes become extra cards after each exam.

## How every step works

1. **Learn.** Read the short version and the full lesson (`lessons/<step-id>.md`, one dropdown per topic on the dashboard). Answer each *Check yourself* question in your own words before you reveal the answer. You will be tested on it.
2. **Do.** Build or practise it yourself. Struggle for about 15 minutes before asking for help.
3. **Must know.** Every lesson ends in a list of exactly what you must be able to do or explain. Claude teaches all of it and only asks about items on it.
4. **Stuck?** Use the *I'm stuck* prompt. Claude explains only the part you're stuck on, then you redo the step on your own.
5. **Check.** Paste the step's check prompt to Claude. Claude asks questions, reviews your work, or plays a client, so you find your own gaps.
6. **Done.** When the *Done when* condition and the Must know list are true, Claude tells you and checks the step off on the dashboard. Mistakes go in `mistakes.md`.
7. **Lock it in.** Each phase ends with *Redo without help*, an *Exam*, a *diagnosis* of repeated mistakes, and *flashcards* for your phone.

Roles Claude plays: Interviewer (finds your level), Mapmaker (builds the plan), Explainer (explains only what you're stuck on), Socratic questioner (asks until you find your own gaps), Examiner (quizzes, gets harder), Checker (reviews your work, never rewrites it), Listener (you explain aloud and Claude compares with the truth), Diagnostician (finds the root of repeated mistakes), Sparring partner (plays a client with a timer), Clerk (turns notes and mistakes into flashcards).

Step tags: (phone) can be done at work, (laptop) needs a computer. Core steps count toward progress, BONUS steps don't. Every prompt gets a header and rules added automatically on the dashboard (which step you're on, how Claude should teach, and how to check the step off).


---

## Phase 0: Setup and baseline (about 6 h)

*Four tools, one goal: n8n running on your own computer*

You will get the tools you'll use every day running, and learn what each one is for. Nothing here is hard, but five ideas (container, port, volume, virtual environment, API key) come back in every later phase, so we learn them properly now instead of copy-pasting commands.

**Start this phase with Claude:** Role: Interviewer. Before Phase 0, ask me 5 questions, one at a time, about what I already know of Docker, n8n, Python virtual environments, GitHub and API keys. Then tell me which steps in this phase I can go through quickly and which need the most time.

### p0-1. Check your tool versions [FAST LANE]

*laptop · 5 min · roles: Explainer*

**Goal:** Know that Python, Node, Git and Docker are installed.

**Learn this first**

- Four tools, one job each: Python runs scripts, Node runs your app, Git keeps history, Docker runs n8n.

**Do this**

1. Nothing left to do. Claude already ran `python --version`, `node --version`, `git --version` and `docker --version`, and all four are installed.
2. You will explain what each tool is for in the Phase 0 exam.

**Done when:** Already done. Claude checked it off.

**Full lesson:** `lessons/p0-1.md` (also on the dashboard). **Must know to finish this step:**

*The four tools and what each is for*

- Say in one sentence what Python, Node, Git and Docker are each for
- Explain why Node is installed even though n8n runs in Docker

*Checking versions*

- Use `python --version`: prints the installed Python version
- Use `node --version`: prints the installed Node version
- Use `git --version`: prints the installed Git version
- Use `docker --version`: prints the Docker version (works even if Docker Desktop is closed)


**Prompt: Check me (Listener)**

> Role: Listener. Here is my one-sentence explanation of what Python, Node, Git and Docker are each for, in my own words: [write them]. Tell me what is wrong or missing. Don't rewrite them for me.

### p0-t. Terminal basics: move around PowerShell [FAST LANE]

*laptop · 20 min · roles: Explainer, Examiner*

**Goal:** Move between folders, create files and run commands in PowerShell without getting lost.

**Learn this first**

- `pwd` shows where you are, `ls` shows what is there, `cd` moves. Paths are absolute (from the drive) or relative (from here).
- `mkdir` makes folders, `New-Item` makes files. Read red errors. Check before you delete.

**Do this**

1. Open PowerShell. Run `pwd` and `dir`.
2. Run `cd C:\dev`, `mkdir terminal-practice`, `cd terminal-practice`, `New-Item notes.txt`, `dir`, then `cd ..`.
3. Delete only the practice folder: `Remove-Item terminal-practice -Recurse`. Check first with `dir` that you are in `C:\dev`. This deletes the folder and everything in it, so never run it on a folder you care about.
4. Open the learning folder in VS Code with `code C:\dev\ai-automation-portfolio`. If `code` isn't recognised, use File, then Open Folder in VS Code.

**Done when:** You did all of this without looking at the list, and can explain absolute vs relative paths.

**Full lesson:** `lessons/p0-t.md` (also on the dashboard). **Must know to finish this step:**

*What the terminal is*

- Explain what the terminal and PowerShell are, in one sentence
- Say what the "current folder" is and where PowerShell shows it

*Looking around: pwd, ls, dir*

- Tell `pwd` and `ls` apart without looking
- Use `pwd`: shows the full path of the current folder (where am I)
- Use `ls`: lists the files and folders in the current folder (what is here)
- Use `dir`: the same as `ls`

*Moving: cd*

- Move down into a folder, up one level, and to a full path
- Use `cd C:\dev`: go to a folder using a full path
- Use `cd folder`: go into a folder inside the current folder
- Use `cd ..`: go up one level to the parent folder

*Paths: absolute vs relative*

- Explain absolute vs relative paths in your own words
- Work out where a relative path ends, step by step, from a given folder
- Put a path with a space in quotes

*Creating folders and files*

- Create a folder, then a file inside it
- Use `mkdir name`: creates a new folder in the current folder
- Use `New-Item notes.txt`: creates a new empty file in the current folder

*Deleting safely*

- Run the safety check (`pwd`, `ls`) before deleting a folder
- Say what `-Recurse` does and why it is dangerous
- Use `Remove-Item folder -Recurse`: deletes a folder and everything inside it, permanently

*Shortcuts, errors and VS Code*

- Use Tab to complete a name and Up arrow to repeat a command
- Stop a running program with Ctrl+C
- Read a red error message and say what it means
- Open a terminal inside VS Code and open a folder in VS Code
- Use `code .`: opens the current folder in VS Code
- Use `code C:\dev\ai-automation-portfolio`: opens that folder in VS Code


**Prompt: Quiz me (Examiner)**

> Role: Examiner. Give me 5 small terminal tasks one at a time, for example "you are in C:\dev, create a folder x, go into it, create y.txt and list it", and check the commands I type. Tell me my level.

### p0-2. Create a private GitHub repo and clone it [FAST LANE]

*laptop · 30 min · roles: Explainer, Checker*

**Goal:** Have a private repo called automation-portfolio on GitHub and a copy of it at C:\dev\automation-portfolio.

**Learn this first**

- Git records versions on your PC. GitHub keeps an online copy (the remote). Cloning downloads a repo with its history.
- `.gitignore` keeps secrets and clutter out of Git.

**Resources**

- [GitHub Skills: Introduction to GitHub (free interactive course)](https://skills.github.com/)
- [GitHub docs: Hello World](https://docs.github.com/en/get-started/using-github/hello-world)

**Do this**

1. Go to github.com and sign up or log in. Do this yourself, and don't share your password with anyone, including Claude.
2. Click New repository. Name it `automation-portfolio`, choose **Private**, tick **Add a README**, and choose the **Python** .gitignore template.
3. In GitHub Desktop choose File, then Clone repository, pick `automation-portfolio`, and set the local path to `C:\dev\automation-portfolio`.
4. Open that folder in VS Code (File, Open Folder). Open the terminal inside VS Code (Ctrl+`) and run `git status`. It should say your branch is up to date and there is nothing to commit.

**Done when:** The folder C:\dev\automation-portfolio exists with a README, and you can explain Git vs GitHub and local vs remote without help. Claude can check the folder exists.

**Full lesson:** `lessons/p0-2.md` (also on the dashboard). **Must know to finish this step:**

*Git vs GitHub*

- Explain Git vs GitHub in your own words
- Explain local vs remote and what a commit is

*Repository, private and README*

- Say what a repository is
- Explain what private means and why the repo is private
- Say what a README is

*Cloning*

- Explain what cloning does and how it differs from downloading a ZIP
- Clone a repo to a chosen folder with GitHub Desktop

*.gitignore*

- Say what .gitignore is for and name two things that belong in it
- Explain why a secret must be in .gitignore before it is committed

*git status*

- Run git status in the repo folder and say what a clean result means
- Use `git status`: shows changed, new and ignored files and whether you match the remote

*Doing the setup*

- Create the private automation-portfolio repo with README and Python .gitignore
- Have the clone at C:\dev\automation-portfolio and prove it with ls


**Prompt: Check me (Socratic)**

> Role: Socratic questioner. I created a private repo called automation-portfolio and cloned it to C:\dev\automation-portfolio. Check that the folder exists. Then ask me one question at a time: what is the difference between Git and GitHub, what is a remote, what does cloning do, and why is the repo private. Don't give me the answers.

### p0-3. Run n8n in Docker and open it in your browser [FAST LANE]

*laptop · 60-90 min · roles: Explainer, Socratic*

**Goal:** Run n8n on your own computer inside a Docker container, open it at http://localhost:5678, and understand every part of the command you typed.

**Learn this first**

- Image = recipe, container = running copy, volume = the data that survives. `-p 5678:5678` opens a door to the container.
- Docker Desktop must be running before any `docker` command works.

**Resources**

- [Docker: Get started](https://docs.docker.com/get-started/)
- [n8n docs: Install with Docker](https://docs.n8n.io/deploy/host-n8n/install-options/install-with-docker)
- [n8n docs: Install using Docker Compose (the recommended way now; read it after n8n runs)](https://docs.n8n.io/deploy/host-n8n/install-options/install-using-docker-compose)
- [n8n docs: Build your first workflow (do this after n8n runs)](https://docs.n8n.io/build-your-first-workflow)

**Do this**

1. Open **Docker Desktop**. Wait until it says **Engine running** (bottom left). The first start can take a minute and may ask to enable WSL 2. Accept.
2. In PowerShell run `docker run hello-world`. It downloads a tiny image and prints a message. That proves Docker works.
3. Create the volume: `docker volume create n8n_data`
4. Start n8n in the foreground (replace the timezone if you're not in the Netherlands): `docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n -e GENERIC_TIMEZONE=Europe/Amsterdam -e TZ=Europe/Amsterdam -e N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true -e N8N_RUNNERS_ENABLED=true n8nio/n8n`
5. The first run downloads the image (a few hundred MB). Wait for a line saying the editor is accessible at http://localhost:5678, then open it in your browser and create the owner account. It stays on your computer.
6. Open a second PowerShell window and run `docker ps`. Find `n8n` in the list. Go back to the first window and press **Ctrl+C**. Run `docker ps` again and note that it's gone. That is `--rm`. Your account is still in the volume.
7. Run it again for daily use, in the background and restarting with Docker: `docker run -d --restart unless-stopped --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n -e GENERIC_TIMEZONE=Europe/Amsterdam -e TZ=Europe/Amsterdam -e N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true -e N8N_RUNNERS_ENABLED=true n8nio/n8n` and open localhost:5678 to confirm your account still works.
8. If Docker Desktop says virtualization is disabled, it has to be switched on in your computer's BIOS settings. Ask Claude to walk you through it, because the steps depend on your PC.
9. If you see "container name already in use", run `docker rm n8n` and try again. If you see "port is already allocated", something else uses 5678, so run `docker ps` to find it. Try for 15 minutes on your own before asking for help.

**Done when:** n8n opens at localhost:5678 and you can explain image vs container, the port mapping, and what the volume protects, in your own words.

**Full lesson:** `lessons/p0-3.md` (also on the dashboard). **Must know to finish this step:**

*What Docker and n8n are*

- Say what n8n is and what Docker is for
- Explain the difference between Docker Desktop (engine) and the docker command
- Fix the "failed to connect to the docker API" error

*Image vs container*

- Explain image vs container with an example
- Say why you can delete a container and start another from the same image
- Use `docker run hello-world`: downloads a tiny test image and runs it once, proving Docker works
- Use `docker images`: lists the images downloaded on your PC

*Ports: -p 5678:5678*

- Explain -p HOST:CONTAINER and which number is which
- Say what changes with -p 5679:5678 and what does not
- Say what localhost means
- Explain the "port is already allocated" error

*Volumes: -v n8n_data:/home/node/.n8n*

- Explain what a volume protects and what happens when you delete the container vs the volume
- Read -v name:/folder as "keep this folder in that volume"
- Use `docker volume create n8n_data`: creates the volume that will hold n8n's data
- Use `docker volume ls`: lists your volumes
- Use `docker volume rm name`: permanently deletes a volume and everything in it

*The other flags and the full command*

- Say what -it, -d, --rm, --name and -e each do
- Explain why the image name comes last
- Fix the "container name already in use" error
- Use `docker ps`: lists running containers
- Use `docker ps -a`: lists all containers, including stopped ones
- Use `docker logs n8n`: shows what the n8n container printed
- Use `docker stop n8n`: stops the container
- Use `docker start n8n`: starts a stopped container
- Use `docker rm n8n`: deletes the container (not the volume)

*Doing it: steps and what to look for*

- Start n8n in Docker and open it at localhost:5678
- Show that stopping the container keeps your account because of the volume


**Prompt: Check me (Socratic)**

> Role: Socratic questioner. n8n is running at localhost:5678 in Docker. Ask me questions one at a time until I find my own gaps about: image vs container, what -p 5678:5678 does and what changes if I use -p 5679:5678, what the volume protects and what happens to my workflows if I delete the container vs the volume, and what --rm and -d do. Don't give me the answers. If I answer wrong, ask a follow-up question that helps me find it.

### p0-4. Make a Python virtual environment and install requests [FAST LANE]

*laptop · 20 min · roles: Explainer, Checker*

**Goal:** Have a .venv in your repo with the requests library installed, and know why it exists.

**Learn this first**

- A venv gives one project its own packages. Activate it (`(.venv)` in the prompt) before `pip install`.
- `requirements.txt` lists the packages so you can rebuild.

**Resources**

- [Python docs: Virtual environments and packages](https://docs.python.org/3/tutorial/venv.html)
- [Requests: Quickstart](https://requests.readthedocs.io/en/latest/user/quickstart/)

**Do this**

1. In PowerShell: `cd C:\dev\automation-portfolio`
2. Create it: `python -m venv .venv`
3. Activate it: `.\.venv\Scripts\Activate.ps1`. If Windows blocks the script, run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` once and try again.
4. Install: `python -m pip install requests`
5. Test: `python -c "import requests; print(requests.__version__)"`
6. Save the list: `pip freeze > requirements.txt`
7. Check `.gitignore` contains `.venv` (the Python template does). In VS Code press Ctrl+Shift+P, choose **Python: Select Interpreter**, and pick the one in `.venv`.

**Done when:** `(.venv)` shows in your prompt, requests imports, requirements.txt exists, and you can say why a venv exists and what happens if you forget to activate it. Claude can check the files exist.

**Full lesson:** `lessons/p0-4.md` (also on the dashboard). **Must know to finish this step:**

*Why a virtual environment*

- Explain why a project gets its own virtual environment
- Say why .venv is in .gitignore

*pip, requests and PyPI*

- Say what pip is and what requests is for
- Use `python -m pip install requests`: installs the requests package into the active Python

*Creating and activating*

- Create a venv and activate it, and recognise it by the (.venv) prompt
- Say what happens if you forget to activate
- Fix the "running scripts is disabled" error
- Use `python -m venv .venv`: creates the virtual environment folder
- Use `.\.venv\Scripts\Activate.ps1`: activates it, so the prompt starts with (.venv)
- Use `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`: allows your user to run local PowerShell scripts, once
- Use `deactivate`: leaves the virtual environment

*Testing and requirements.txt*

- Test an install with import and read the result
- Say what requirements.txt is for and how to create it
- Use `python -c "import requests; print(requests.__version__)"`: tests that requests can be imported
- Use `pip freeze > requirements.txt`: saves the installed packages into requirements.txt
- Use `python -m pip install -r requirements.txt`: installs everything listed in requirements.txt

*Checking your work*

- Verify the five checks above
- Use `git status`: should not list .venv, because it is ignored


**Prompt: Check me (Socratic)**

> Role: Socratic questioner. I made a venv in C:\dev\automation-portfolio and installed requests. Check that .venv and requirements.txt exist. Then ask me one question at a time: why do we use a venv, what does activating do, what is pip, what is requirements.txt for, and why is .venv in .gitignore. Don't give me the answers.

### p0-5. Get a free LLM API key and keep it safe [FAST LANE]

*laptop · 20 min · roles: Explainer, Checker*

**Goal:** Have a free Gemini API key stored in a .env file that Git will never upload.

**Learn this first**

- An API key is a password. Keep it in `.env`, never in Git or in a chat.
- `.env.example` shows the names without the values.

**Resources**

- [Google AI Studio: API keys](https://aistudio.google.com/apikey)
- [Gemini API docs](https://ai.google.dev/gemini-api/docs)
- [Gemini API: Additional Terms of Service (read the section on the EEA, Switzerland and the UK)](https://ai.google.dev/gemini-api/terms)

**Do this**

1. Open aistudio.google.com/apikey, sign in, and create an API key.
2. In `C:\dev\automation-portfolio` create a file named `.env` with one line: `GEMINI_API_KEY=` followed by your key. No quotes, no spaces.
3. Run `git status`. `.env` must **not** appear in the list. If it does, add a line `.env` to `.gitignore`.
4. Create `.env.example` containing `GEMINI_API_KEY=` with no value, so you commit the template but not the secret.
5. With your venv active, install python-dotenv, run `python -c "from dotenv import load_dotenv; import os; load_dotenv(); print(bool(os.getenv('GEMINI_API_KEY')))"` and check it prints `True`. Then run `pip freeze > requirements.txt` again.
6. Optional: skim the Gemini docs quickstart to see what a request looks like. You'll use the key for real in Phase 3.

**Done when:** `.env` is ignored by Git, `.env.example` exists, and you can explain what could go wrong if the key were committed and how you would fix it.

**Full lesson:** `lessons/p0-5.md` (also on the dashboard). **Must know to finish this step:**

*API keys and why they are secret*

- Say what an API key is and why it must stay secret
- Say what to do if a key leaks

*.env and .gitignore*

- Write a .env file with the right format
- Explain what .env.example is for and why it is committed
- Check with git status that .env is ignored
- Use `git status`: .env must not be listed; if it is, add .env to .gitignore

*Reading .env in Python*

- Install python-dotenv and load a variable from .env
- Test with print(bool(...)) and never print the key
- Use `python -m pip install python-dotenv`: installs the package that reads .env
- Use `pip freeze > requirements.txt`: saves the package list again

*The free key and client data*

- Say what the free Gemini key may and may not be used for

*Doing it*

- Complete the six steps and get True from the test


**Prompt: Check me (Checker)**

> Role: Checker and Socratic questioner. I stored my API key in .env and .gitignore ignores it. Do not ask me to paste the key. Check that .env.example exists and that .gitignore lists .env. Then ask me: what could go wrong if I committed the key, what do I do if I did, and why is there a .env.example. One question at a time.

### p0-6. Write your Upwork headline and overview [FAST LANE]

*phone or laptop · 45 min · roles: Interviewer, Checker*

**Goal:** Have one clear headline and a three-sentence overview you could put on your profile.

**Learn this first**

- Clients search for problems. Say who you help, what you do and with which tools.
- Only claim what you can show.

**Do this**

1. Look at your profile in the browser but don't change anything yet. Check whether Upwork shows any pending step such as identity verification, profile review or a payment method. These can take days, so start them now. Only you can do them. Keep to one account, because Upwork doesn't allow duplicates.
2. Create `C:\dev\automation-portfolio\upwork-profile.md`. Write 3 different headline options and a 3-sentence overview.
3. Ask Claude to interview you first, so your wording comes from your real experience.
4. Pick the headline you like best.

**Done when:** One headline you would put on the profile, and an overview where Claude can't find vague claims or overclaims.

**Full lesson:** `lessons/p0-6.md` (also on the dashboard). **Must know to finish this step:**

*How clients find you*

- Say what clients search for and what a good headline contains

*Only claim what you can show*

- Tell an honest claim from an overclaim and from a vague claim

*The three-part overview*

- Write an overview with problem, how and proof

*Doing it*

- Create upwork-profile.md with 3 headlines and a 3-sentence overview
- Say why you start verification steps early


**Prompt: Interview then check me**

> Role: Interviewer, then Checker. First ask me 6 questions, one at a time, about my past bots, APIs, Python, mathematics degree and the ComniWell app, so you can find my real strengths. Then I'll paste my headline options and overview from upwork-profile.md. Critique them: what is vague, what is an overclaim, what would a client not understand. Don't rewrite them for me.

### p0-r. Redo without help: start a second n8n from memory [REDO WITHOUT HELP]

*laptop · 20 min · roles: Listener*

**Goal:** Prove you understand the Docker command by building a variation of it with no notes.

**Learn this first**

- Changing a command proves you understand it: new name, new volume, new left port.
- Explaining aloud shows gaps that typing hides.

**Do this**

1. Close this page. From memory, start a second n8n called `n8n-test` on **host port 5679** with a new volume `n8n_test`. Remember `-p HOST:CONTAINER`, and that n8n always listens on 5678 inside. The timezone and the two other `-e` settings are optional for a throwaway test.
2. Open localhost:5679 and see a brand-new n8n asking you to create an account. Your real one at 5678 is untouched.
3. Clean up **only the test**: `docker stop n8n-test`, `docker rm n8n-test`, `docker volume rm n8n_test`. Never run a volume remove on `n8n_data`.
4. Dictate (voice) a 1-minute explanation of what each part of your command did, then paste the transcript to Claude.

**Done when:** The second n8n ran on 5679 and your spoken explanation matches what each flag does.

**Full lesson:** `lessons/p0-r.md` (also on the dashboard). **Must know to finish this step:**

*Rebuilding is the proof*

- Say which three parts of the n8n command change for a second copy and why
- Say which part stays 5678 and why

*Doing it and cleaning up*

- Start n8n-test on 5679 from memory and open it
- Clean up only the test container and volume
- Use `docker stop n8n-test`: stops the test container
- Use `docker rm n8n-test`: deletes the test container
- Use `docker volume rm n8n_test`: deletes the test volume only

*Explaining aloud with dictation*

- Dictate a one-minute explanation and paste it to Claude


**Prompt: Check me (Listener)**

> Role: Listener. I rebuilt a second n8n from memory on port 5679. Here is the command I typed: [paste]. Here is my spoken explanation of each part: [paste transcript]. Compare it to what the command really does and tell me exactly what I missed or got wrong.

### p0-g. Phase 0 exam [EXAM]

*laptop · 20 min · roles: Examiner, Diagnostician, Clerk*

**Goal:** Show you can explain the setup, not just run it, and turn your mistakes into flashcards.

**Learn this first**

- The exam gets harder until you guess. That shows your real level.
- Your mistakes become flashcards, reviewed on a schedule.

**Do this**

1. Run the exam prompt below. Answer from memory, in your own words.
2. Ask for 8 flashcards from your mistakes and review them at work in the next two days.

**Done when:** You score at least 80% on the exam, and you have the flashcards.

**Full lesson:** `lessons/p0-g.md` (also on the dashboard). **Must know to finish this step:**

*How the exam works*

- Say what the exam covers and what score you need

*Diagnosis and flashcards*

- Say what the diagnostician and the clerk each do
- Explain spaced repetition and the review schedule


**Prompt: Exam me**

> Role: Examiner. Exam me on Phase 0, one question at a time, easy to hard. Stop when I start guessing and tell me my level. Cover: what Python, Node, Git and Docker are each for; Git vs GitHub; image vs container; what -p 5679:5678 means; what a volume protects; why a venv; why .env is in .gitignore. Score me out of 10.

**Prompt: Diagnose and flashcards**

> Role: Diagnostician, then Clerk. Look at my mistakes in the exam and in C:\dev\ai-automation-portfolio\mistakes.md. What one root misunderstanding is behind them? Then make 8 flashcards and save them in C:\dev\ai-automation-portfolio\flashcards\ as one tab-separated text file for this phase (question, tab, answer, one card per line) so I can import them into Anki.

---

## Phase 1: The plumbing (about 9 h)

*HTTP, JSON, webhooks and Git*

Every automation talks to other systems through HTTP requests. After this phase you can call an API from Python and from n8n, receive data with a webhook, and keep your work in Git. This is the foundation under every Upwork job you'll take.

**Start this phase with Claude:** Role: Interviewer. Before Phase 1, ask me 5 questions, one at a time, about HTTP, JSON, APIs, webhooks and Git. Tell me which steps I can speed through and which to take slowly.

### p1-1. Learn how HTTP works [FAST LANE]

*phone · 45 min · roles: Explainer, Socratic*

**Goal:** Explain a request and a response, GET vs POST, status codes, headers and API keys in your own words.

**Learn this first**

- A request has a method, URL, headers and body. A response has a status code, headers and a body, usually JSON.
- GET reads, POST changes. HTTPS encrypts both. 2xx is success, 4xx is your mistake, 5xx is theirs.

**Resources**

- [MDN: An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview)
- [MDN: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
- [httpbin: a free service for testing requests](https://httpbin.org)

**Do this**

1. Open https://httpbin.org/get in your browser and read the JSON. Find the headers your browser sent.
2. Open https://httpbin.org/status/404 and https://httpbin.org/status/200. Notice what the page shows and what it hides.
3. In PowerShell run `curl.exe -i https://httpbin.org/get`. Use `curl.exe`, because plain `curl` in PowerShell is a different command. Find the status line, the response headers and the body.
4. Write down in your own words what happened in each of the three calls. Then run the Socratic prompt.

**Done when:** You can explain the request and response parts, GET vs POST including what HTTPS does and doesn't hide, five status codes, and what a webhook is.

**Full lesson:** `lessons/p1-1.md` (also on the dashboard). **Must know to finish this step:**

*Request and response*

- Name the parts of a request and a response
- Name the parts of a URL

*Methods and GET vs POST*

- Name the five methods and what each means
- Explain GET vs POST, including what HTTPS does and does not hide

*Status codes*

- Say what 2xx, 4xx and 5xx mean
- Explain 200, 201, 400, 401, 403, 404 and 429

*Headers and API keys*

- Say what Content-Type and Authorization headers do
- Say where an API key goes in a request

*JSON*

- Read nested JSON and name the data types

*Webhooks*

- Explain a webhook versus an API call

*Trying it: httpbin and curl.exe*

- Find the status line, headers and body in curl.exe output
- Use `curl.exe -i URL`: sends a GET and prints the status line, headers and body


**Prompt: Check me (Socratic)**

> Role: Socratic questioner. Ask me questions about HTTP one at a time until I find my own gaps. Start with GET vs POST, which I got partly wrong in the interview. Then status codes, headers and API keys, and webhook vs API call. Don't give me the answers.

### p1-py. Python refresher: find your level and fix the rust [FAST LANE]

*laptop · 90 min · roles: Interviewer, Examiner, Checker*

**Goal:** Find out what you still remember of Python and rebuild the eight skills every later step uses.

**Learn this first**

- Eight skills: types, functions, loops, f-strings, files, json, try/except, imports.
- Find the rusty ones first, then practise only those.

**Resources**

- [Python docs: The Python Tutorial](https://docs.python.org/3/tutorial/)
- [Python docs: json module](https://docs.python.org/3/library/json.html)

**Do this**

1. Run the "Find my level" prompt first. Claude asks diagnostic questions and tells you which of the eight skills need work.
2. Then write these six exercises in `C:\dev\automation-portfolio\00-python`, one file each, without AI-written code: (a) `word_count(text)` returns a dict of word to count. (b) Create a JSON file with a list of 5 people (name, age), read it and print the average age. (c) Write that list to a new file sorted by age. (d) A function that divides two numbers and handles division by zero and non-numeric input with try/except. (e) A list comprehension for the squares of the even numbers from 1 to 20. (f) An f-string table of names and ages with aligned columns.
3. Struggle for 15 minutes on each before asking for help. Then run the "Check my exercises" prompt.

**Done when:** All six exercises work, you can explain every line, and Claude agrees the eight skills are solid or lists the ones to review.

**Full lesson:** `lessons/p1-py.md` (also on the dashboard). **Must know to finish this step:**

*How this step works*

- Name the eight skills

*Variables and types*

- Use str, int, float, bool, list, dict and tuple
- Index lists from 0 and read dict values safely

*Functions*

- Write a function with parameters and a return value
- Say the difference between print and return

*Loops, conditions and comprehensions*

- Write for and while loops and if/elif/else
- Write a list comprehension with a condition

*f-strings*

- Use f-strings with decimals and aligned columns

*Files and the json module*

- Read and write a JSON file with with open
- Tell json.load from json.loads

*Exceptions and reading errors*

- Handle errors with try/except for specific exceptions
- Read a traceback from the bottom

*Imports, pip and modules*

- Import a standard module and an installed package

*The six exercises*

- Write all six exercises and explain every line


**Prompt: Find my level (Interviewer then Examiner)**

> Role: Interviewer, then Examiner. I have used Python before (bots, APIs, and graph-colouring algorithms for my mathematics degree) but it was a while ago. Ask me diagnostic questions one at a time on: types, functions, loops and comprehensions, f-strings, files, json, try/except, imports and pip. Make them harder until I struggle, tell me my level, and list which of the eight skills need practice.

**Prompt: Check my exercises (Checker)**

> Role: Checker. Here are my six exercises: [paste]. Find bugs and edge cases, and tell me if any line is hard to read. Don't rewrite them. Ask me one question about a line I should be able to explain.

### p1-2. Call an API from Python and read the JSON [FAST LANE]

*laptop · 45 min · roles: Explainer, Checker*

**Goal:** Write a script that calls a public API, reads the JSON and prints three values.

**Learn this first**

- `requests.get(url, params=..., timeout=10)`, then `raise_for_status()`, then `.json()`.
- Print the whole JSON first, then index into it step by step.

**Resources**

- [Requests: Quickstart](https://requests.readthedocs.io/en/latest/user/quickstart/)
- [Open-Meteo forecast API (free, no key)](https://open-meteo.com/en/docs)

**Do this**

1. In `C:\dev\automation-portfolio` create a folder `01-http` and a file `get_weather.py`.
2. **Spec, no code given:** call `https://api.open-meteo.com/v1/forecast` with parameters `latitude=52.37`, `longitude=4.89` and `current=temperature_2m,wind_speed_10m`. Check the status. Print the time, the temperature and the wind speed in one readable line.
3. Run it with your venv active: `python 01-http\get_weather.py`.
4. Struggle for 15 minutes first. If stuck, use the "I'm stuck" prompt.
5. Then change the coordinates to another city without looking at the docs.

**Done when:** The script prints one clean line, fails loudly on a bad URL (try one), and you can explain every line.

**Full lesson:** `lessons/p1-2.md` (also on the dashboard). **Must know to finish this step:**

*Calling an API with requests*

- Send a GET with params and a timeout
- Use `requests.get(url, params={...}, timeout=10)`: sends a GET request and returns a Response object

*Reading the response and checking status*

- Check the status before using the body
- Name what raise_for_status does and why
- Use `response.raise_for_status()`: raises an error on 4xx/5xx status codes
- Use `response.json()`: turns the JSON body into Python dicts and lists

*Reading nested JSON*

- Print the full JSON to see its shape before indexing
- Read a value from nested dicts and lists

*The script and what failing loudly means*

- Write get_weather.py from the spec and run it
- Show that a bad URL fails loudly
- Use `python 01-http\get_weather.py`: runs the script from the repo folder


**Prompt: Check me (Checker)**

> Role: Checker. Here is my script: [paste]. Find what is wrong or missing, and whether there is a simpler or safer way. Don't rewrite it for me. Then ask me one question about a line I probably copied without understanding.

### p1-3. Send a POST with JSON from Python [FAST LANE]

*laptop · 30 min · roles: Explainer, Checker*

**Goal:** Send JSON to a URL with POST and see it arrive.

**Learn this first**

- `requests.post(url, json={...})` sends JSON and sets the content type for you.
- webhook.site shows exactly what arrived. Its URL is public, so use fake data.

**Resources**

- [webhook.site](https://webhook.site)
- [Requests: Quickstart, section "More complicated POST requests"](https://requests.readthedocs.io/en/latest/user/quickstart/)

**Do this**

1. Open https://webhook.site and copy your unique URL.
2. In `01-http` create `post_webhook.py`. **Spec:** POST `{"name": "test", "message": "hello from python"}` to your URL, with a custom header `X-Source: python`. Print the status code.
3. In webhook.site, find the method, the headers and the body of your request.
4. Then change the body to include a list of two items, run again, and find it in webhook.site.

**Done when:** You can point at the method, headers and body of your request in webhook.site and explain which line of Python produced each.

**Full lesson:** `lessons/p1-3.md` (also on the dashboard). **Must know to finish this step:**

*POST with json=*

- Send a POST with json= and a custom header
- Explain json= versus data=
- Use `requests.post(url, json={...}, headers={...}, timeout=10)`: sends a POST with a JSON body

*Seeing what you sent: webhook.site*

- Find the method, headers and body of your request on webhook.site
- Say why only fake data goes to webhook.site

*The script*

- Write post_webhook.py from the spec
- Match each part of the received request to a line of code


**Prompt: Check me (Checker)**

> Role: Checker. Here is my POST script: [paste]. Check it against what webhook.site received: [describe or paste]. Find what's wrong or missing. Then ask me what would change if I used data= instead of json=. Don't rewrite my script.

### p1-4. Your first n8n workflow with the HTTP Request node [FAST LANE]

*laptop · 60 min · roles: Explainer, Socratic*

**Goal:** Build a workflow that calls an API, reshapes the result and sends it on, entirely in n8n.

**Learn this first**

- A workflow is a chain of nodes. Each node gets items (JSON objects) and passes items on.
- The HTTP Request node is `requests`. Expressions like `{{ $json.field }}` read earlier data.

**Resources**

- [n8n docs: Build your first workflow (a NASA solar-flare example)](https://docs.n8n.io/build-your-first-workflow)
- [n8n docs: HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/)
- [n8n Academy: free beginner course N8N101 "Essentials: Your First Workflows" (free registration)](https://learn.n8n.io/)

**Do this**

1. Open localhost:5678. Do **one** of these first: the docs tutorial "Build your first workflow", or the first lessons of the N8N101 course on learn.n8n.io (registration is free, and you never need to give payment details for it). Stop when you've seen the editor, a trigger, an HTTP node and the Output panel. Then do the build below.
2. New workflow. Add a **Manual Trigger**, then an **HTTP Request** node: GET `https://api.open-meteo.com/v1/forecast` with the same three query parameters as before. Click Execute step and open the Output.
3. Add an **Edit Fields** node that keeps only `time`, `temperature` and `wind`, using expressions that point at the HTTP node's output.
4. Add a second **HTTP Request** node that POSTs those fields as JSON to your webhook.site URL. Check that they arrived.
5. Name the workflow `01 weather to webhook`.

**Done when:** Running the workflow sends your three fields to webhook.site, and you can explain what an item is and what the expression does.

**Full lesson:** `lessons/p1-4.md` (also on the dashboard). **Must know to finish this step:**

*Workflows, nodes and triggers*

- Say what a workflow, a node and a trigger are
- Find the Input, parameters and Output of a node

*Items*

- Explain what an item is and that nodes work once per item
- Use Execute step and read the Output views

*The HTTP Request node*

- Map Python requests calls to HTTP Request node settings
- Say what the node returns by default

*Expressions and Edit Fields*

- Write an expression that reads a field with $json
- Use Edit Fields to keep only chosen fields

*Sending data on, and saving your work*

- Build the weather to webhook workflow end to end


**Prompt: Check me (Socratic)**

> Role: Socratic questioner. I built a workflow with Manual Trigger, HTTP Request, Edit Fields and a second HTTP Request. Ask me one question at a time about what an item is, what an expression does, why the output of one node is the input of the next, and how n8n's HTTP Request relates to Python's requests.get and requests.post. Don't give me the answers.

### p1-5. Receive data with an n8n Webhook node [FAST LANE]

*laptop · 45 min · roles: Explainer, Socratic*

**Goal:** Make n8n receive the POST that your Python script sends, using a webhook.

**Learn this first**

- The Webhook node has a Test URL (while listening) and a Production URL (once published).
- Your payload sits under `body`. `localhost` can't be called from the internet.

**Resources**

- [n8n docs: Webhook node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)

**Do this**

1. New workflow `02 receive webhook`. Add a **Webhook** node: method POST, path `portfolio-test`.
2. Click **Listen for test event**. Copy the Test URL and change `post_webhook.py` to POST to it. Run the script and watch the data arrive in the node's output.
3. Add an **Edit Fields** node after the webhook that keeps only `message` and adds a field `received_at` using the expression `{{ $now }}`.
4. Save, switch the workflow to **Active** (or **Publish** it, depending on your n8n version), point the script at the **Production URL** and run again. Look at **Executions** in the left menu to see the run.
5. Explain in your own words when each URL works.

**Done when:** Both URLs received your script's data and you can explain test vs production URL and why localhost isn't reachable from the internet.

**Full lesson:** `lessons/p1-5.md` (also on the dashboard). **Must know to finish this step:**

*The Webhook node and its two URLs*

- Say which URL works when and why there are two
- Fix a 404 on the test or production URL

*Reaching n8n from Python*

- Explain how your Python script reaches n8n in Docker
- Explain why a localhost webhook can't be called from the internet

*What arrives in the webhook*

- Read a field from a webhook payload under body
- Add a received_at field with $now

*Doing it step by step*

- Build the receive-webhook workflow and run both URLs
- Find a production run in Executions


**Prompt: Check me (Socratic)**

> Role: Socratic questioner. I made a Webhook workflow and sent data to its test and production URLs from Python. Ask me one question at a time: why are there two URLs, what makes the production URL work, why can't a service on the internet call my localhost URL, and how does my Python script reach a program inside Docker. Don't give me the answers.

### p1-6. Git: commit, branch, merge and push [FAST LANE]

*laptop · 60 min · roles: Explainer, Examiner*

**Goal:** Use Git from the terminal to save your Phase 1 work and put it on GitHub.

**Learn this first**

- Git has three places: working folder, staging, history. `add` stages, `commit` saves, `push` uploads.
- Branches are for experiments. Never commit `.env`.

**Resources**

- [Pro Git book, chapters 1 to 3 (free)](https://git-scm.com/book/en/v2)
- [GitHub Skills: Introduction to GitHub](https://skills.github.com/)

**Do this**

1. Tell Git who you are, once: `git config --global user.name "Your Name"` and `git config --global user.email "you@example.com"`.
2. In n8n, open each of your workflows, use the **...** menu and **Download** it. Save the files in a `workflows` folder in your repo.
3. Run `git status`. Read what it says. Then `git add .` and `git commit -m "Add Phase 1 scripts and workflows"`. Then `git push`. Look at your repo on GitHub.
4. Practice: `git switch -c experiment`, change a script, commit it, `git switch main`, `git merge experiment`, then `git log --oneline`.
5. On the first push a browser window may ask you to sign in to GitHub. That's normal.

**Done when:** Your commits are on GitHub, you can describe working folder, staging and history, and you passed the Git quiz.

**Full lesson:** `lessons/p1-6.md` (also on the dashboard). **Must know to finish this step:**

*The three places in Git*

- Describe working folder, staging area and history
- Stage and commit changes with a message
- Use `git status`: shows changed, staged and untracked files
- Use `git add .`: stages all changes in the current folder for the next commit
- Use `git commit -m "message"`: saves the staged changes as a commit

*First-time setup and pushing*

- Set your name and email once
- Push commits and see them on GitHub
- Use `git config --global user.name "Your Name"`: sets your name for all commits, once
- Use `git config --global user.email "you@example.com"`: sets your email for all commits, once
- Use `git push`: uploads your commits to GitHub
- Use `git pull`: downloads new commits from GitHub

*Branches and merging*

- Create a branch, commit on it, switch back and merge
- Say what a branch and a merge are for
- Use `git switch -c experiment`: creates a branch and moves onto it
- Use `git switch main`: moves back to the main branch
- Use `git merge experiment`: brings the experiment branch's commits into the branch you are on
- Use `git log --oneline`: lists commits, one line each, newest first

*Secrets and mistakes*

- Say what to do after committing a secret
- Undo the last unpushed commit
- Use `git reset --soft HEAD~1`: undoes the last local commit but keeps the changes staged

*Doing it: saving Phase 1*

- Commit the Phase 1 work and push it to GitHub


**Prompt: Quiz me**

> Role: Examiner. Quiz me on Git with small scenarios, one at a time, getting harder: what git status shows, add vs commit, what a branch is for, what happens on a merge, what to do if I committed a secret, and how I'd undo a commit that isn't pushed yet. Tell me my level.

### p1-b. Bonus: pagination, rate limits and retries [BONUS]

*laptop · 45 min · roles: Explainer, Checker*

**Goal:** Make a script handle APIs that return data in pages and sometimes say "slow down".

**Learn this first**

- Loop through pages until one is empty. On 429, wait and retry with a growing delay.

**Do this**

1. Use the free JSONPlaceholder API (`https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10`) and loop through the pages until empty.
2. Add a retry helper that tries 3 times with a 1, 2, then 4 second wait.

**Done when:** Your script gets all pages and survives one forced failure (use a wrong URL once).

**Full lesson:** `lessons/p1-b.md` (also on the dashboard). **Must know to finish this step:**

*Pagination*

- Loop through pages until an empty page

*Rate limits and retries*

- Retry with a growing wait and only for errors that can recover

*Doing it*

- Write the pagination loop and the retry helper


**Prompt: Check me (Checker)**

> Role: Checker. Here is my pagination and retry code: [paste]. Find bugs and edge cases, such as an infinite loop or retrying a 404. Don't rewrite it.

### p1-r. Redo without help: both sides of a webhook [REDO WITHOUT HELP]

*laptop · 30 min · roles: Listener*

**Goal:** Rebuild the sender and the receiver with no notes, to prove it stuck.

**Learn this first**

- Rebuild both sides of a webhook from a blank page, then explain it aloud.

**Do this**

1. Close all notes and old scripts. Create `post_again.py` and a new n8n workflow `03 receive again` from a blank canvas.
2. Send `{"city": "Rotterdam", "temp": 14}` from Python, receive it in n8n, keep only `city`, and confirm it in Executions. Set a timer to see how long it takes.
3. Dictate a 2-minute spoken explanation of the whole flow, as if to a client, and paste the transcript.

**Done when:** It works in under 20 minutes without help and your explanation covers request, webhook URL, items and status codes.

**Full lesson:** `lessons/p1-r.md` (also on the dashboard). **Must know to finish this step:**

*Why you rebuild it*

- Rebuild without notes and time yourself

*The task*

- Rebuild both sides of a webhook in under 20 minutes
- Explain the whole flow aloud


**Prompt: Check me (Listener)**

> Role: Listener. I rebuilt both sides of a webhook from memory in [N] minutes. Here is my spoken explanation: [paste transcript]. Compare it with how it really works and tell me exactly what I missed or got wrong. Be strict.

### p1-g. Phase 1 exam [EXAM]

*laptop · 30 min · roles: Examiner, Diagnostician, Clerk*

**Goal:** Pass an exam that mixes concepts and building, then lock in the weak spots.

**Learn this first**

- Questions plus one timed build. Mistakes become flashcards.

**Do this**

1. Run the exam prompt. Answer in your own words.
2. Do the timed build the examiner gives you. No notes.
3. Make the flashcards and review them over the next two days.

**Done when:** At least 80% on the exam, the timed build works, and you have flashcards. You can explain webhook vs API call to a non-technical person.

**Full lesson:** `lessons/p1-g.md` (also on the dashboard). **Must know to finish this step:**

*What the Phase 1 exam covers*

- Know what the exam covers and the pass mark

*After the exam*

- Explain a webhook to a non-technical person


**Prompt: Exam me**

> Role: Examiner. Exam me on Phase 1, one question at a time, easy to hard: GET vs POST, status codes, headers, JSON, what a webhook is, test vs production URL, items and expressions in n8n, Git basics. Then give me one timed build: send JSON from Python to an n8n webhook and keep one field, in 20 minutes. Score me out of 10.

**Prompt: Diagnose and flashcards**

> Role: Diagnostician, then Clerk. Look at my mistakes in this exam and in C:\dev\ai-automation-portfolio\mistakes.md. What one root misunderstanding is behind them? Then make 8 flashcards and save them in C:\dev\ai-automation-portfolio\flashcards\ as one tab-separated text file for this phase (question, tab, answer, one card per line) so I can import them into Anki.

---

## Phase 2: n8n core (about 11 h)

*Triggers, data, credentials and error handling*

This is the skill clients pay for first: connecting two tools reliably. You'll build real workflows with validation, Google Sheets, email, a schedule, branching and error handling. Each step teaches the concept, then has you build it, then checks that you understand why it works.

**Start this phase with Claude:** Role: Interviewer. Before Phase 2, ask me 5 questions, one at a time, about what I understand of n8n so far: triggers, items, expressions, credentials. Tell me which steps I can speed through.

### p2-1. Learn the n8n vocabulary [FAST LANE]

*phone · 45 min · roles: Explainer, Clerk*

**Goal:** Know the eight words that every n8n tutorial and client conversation uses.

**Learn this first**

- Eight words: trigger, node, item, expression, credentials, execution, active/published, pinned data.
- A node runs once per item. Credentials live outside the workflow file.

**Resources**

- [n8n Academy: N8N101 "Essentials: Your First Workflows" (free registration)](https://learn.n8n.io/)
- [n8n docs: Expressions versus data nodes](https://docs.n8n.io/build/work-with-data/expressions-versus-data-nodes)
- [n8n docs: Understand n8n's data structure (items)](https://docs.n8n.io/build/work-with-data/understand-n8ns-data-structure)

**Do this**

1. Work through the lessons of the N8N101 course on learn.n8n.io that cover triggers, nodes and how data flows, until you have seen items and expressions (about 30 to 45 minutes). Then read the data structure page above once.
2. Write the eight words on paper with a one-line definition each, from memory.
3. Open an old workflow of yours and point at the trigger, an item, and an expression.

**Done when:** You define all eight words in your own words and pass a short flashcard check from Claude.

**Full lesson:** `lessons/p2-1.md` (also on the dashboard). **Must know to finish this step:**

*Trigger, node and workflow*

- Define workflow, trigger and node

*Items*

- Explain that a node runs once per item

*Expressions*

- Read a field with $json and $('Node name')
- Say when to use an expression and when a data node

*Credentials*

- Say what credentials are and that they are not in the workflow file

*Execution, active and pinned data*

- Say what an execution is and where to find past runs
- Explain active/published versus manual runs
- Say what Save does and what Publish does
- Pin and unpin data and say when pinning applies

*The eight words, from memory*

- Define all eight words in your own words


**Prompt: Flashcards and check**

> Role: Clerk, then Examiner. Make 8 flashcards for the n8n vocabulary above and test me with them, one at a time, in random order. Then ask me two scenario questions, for example "a webhook receives a list of 10 orders, how many times does the next node run and why".

### p2-2. Workflow 1a: validate incoming data and answer the sender [FAST LANE]

*laptop · 60 min · roles: Explainer, Checker*

**Goal:** Build a webhook that checks incoming data, rejects bad data with a proper status code, and answers the sender.

**Learn this first**

- Validate first with an IF node, then answer the sender with Respond to Webhook: 200 for good data, 400 for bad.
- Webhook data is under `body`.

**Resources**

- [n8n docs: IF node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.if/)
- [n8n docs: Respond to Webhook node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook/)

**Do this**

1. New workflow `04 signup intake`. **Webhook** node (POST, path `signup`, Respond: Using 'Respond to Webhook' node).
2. Add an **IF** node checking that `body.email` contains `@` and `body.name` is not empty.
3. True branch: **Edit Fields** that keeps `name` and `email` and lowercases the email, then **Respond to Webhook** with code 200 and a JSON body `{"ok": true}`.
4. False branch: **Respond to Webhook** with code 400 and `{"ok": false, "error": "invalid input"}`.
5. From Python, send three test cases: valid, missing email, empty name. Print the status code and body each time.

**Done when:** All three test cases give the expected status code, and you can explain why validation goes first and why the status codes matter.

**Full lesson:** `lessons/p2-2.md` (also on the dashboard). **Must know to finish this step:**

*Why validate first*

- Say why validation comes first
- Say which status codes the workflow returns and why

*The IF node*

- Build an IF node with two conditions combined with AND
- Name the true and false outputs and the parts of a condition

*Expressions that run JavaScript*

- Use toLowerCase, trim, includes and + in an expression
- Find webhook data under body

*Respond to Webhook*

- Set the Webhook Respond option and add Respond to Webhook with a code

*Build it and test three cases*

- Build 04 signup intake and test valid, missing email and empty name


**Prompt: Check me (Checker)**

> Role: Checker. I built a validated signup webhook. Here are my IF conditions and my three test results: [paste]. Find what I missed, such as an email with spaces, a missing body, or null values. Don't fix it for me. Ask what happens for each one.

### p2-sec. Secure your webhook [FAST LANE]

*laptop · 40 min · roles: Explainer, Socratic*

**Goal:** Make sure only your own scripts and trusted services can start your workflow.

**Learn this first**

- A webhook URL is an open door. Header Auth makes n8n reject callers without the secret.
- The secret lives in credentials and `.env`, never in the workflow or repo.

**Resources**

- [n8n docs: Webhook node (see the Authentication and IP allowlist options)](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)

**Do this**

1. Generate a secret with the Python one-liner. Add `WEBHOOK_SECRET=` and the secret to your `.env`, and `WEBHOOK_SECRET=` with no value to `.env.example`.
2. In n8n create a **Header Auth** credential (header name `X-Webhook-Secret`, value your secret). In `04 signup intake` set the Webhook node's **Authentication** to Header Auth with that credential.
3. Change your Python test script to read the secret from `.env` (python-dotenv from p0-5) and send it as the `X-Webhook-Secret` header.
4. Test three calls: with the right header, with no header, and with a wrong one. Write down the status codes of the last two.
5. In the Webhook node's options add an **IP allowlist** with an address that isn't yours, send a request, and see it rejected. Remove it afterwards.

**Done when:** The right header works, a missing or wrong one is rejected before the workflow runs, and you can explain why a secret path isn't enough and what authentication does and doesn't protect.

**Full lesson:** `lessons/p2-sec.md` (also on the dashboard). **Must know to finish this step:**

*A webhook URL is an open door*

- Explain why a secret path is not enough

*Header Auth, Basic Auth and JWT*

- Name the Webhook authentication types and when each is used

*Keeping the secret secret*

- Generate a secret and store it in .env and an n8n credential
- Send the secret as a header from Python without printing it
- Use `python -c "import secrets; print(secrets.token_urlsafe(32))"`: prints a long random secret

*IP allowlist and what authentication does not do*

- Test the right, missing and wrong header
- Say what an IP allowlist does and returns
- Say what authentication does not protect against


**Prompt: Check me (Socratic)**

> Role: Socratic questioner. I added Header Auth and tried an IP allowlist on my webhook. Ask me one question at a time: why isn't a long random URL enough, where should the secret live and where must it never appear, what status code did the bad calls get and why, why does a payment provider sign requests instead, and what does authentication not protect against. Don't give me the answers.

### p2-3. Connect Google Sheets and Gmail with OAuth [FAST LANE]

*laptop · 90 min · roles: Explainer, Socratic*

**Goal:** Add a Google connection once and use it to write rows to a sheet and send an email.

**Learn this first**

- OAuth gives n8n limited access to Google without your password. You register the app yourself.
- The redirect URL must match n8n's exactly. Testing mode expires after about 7 days.

**Resources**

- [n8n docs: Google credentials](https://docs.n8n.io/integrations/builtin/credentials/google/)
- [n8n docs: Google Sheets node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/)
- [Google Cloud Console](https://console.cloud.google.com/)

**Do this**

1. Follow the n8n docs page "Google credentials", OAuth section for self-hosted. Create a Google Cloud project, enable the **Google Sheets API** and the **Gmail API**, set up the OAuth consent screen (External, Testing), add your Gmail as a Test user, and create an OAuth client ID. Paste n8n's redirect URL into it.
2. Create a Google Sheet `Signups` with the headers `name`, `email`, `received_at` in row 1.
3. Note the OAuth credential screen in n8n shows the redirect URL and has fields for the Client ID and Client Secret. The Sheets and Gmail nodes can each use their own credential, but one Google Cloud project with both APIs enabled can serve both.
4. In `04 signup intake`, on the true branch add a **Google Sheets** node (Append Row) and a **Gmail** node (Send) that emails the sender a short confirmation. For testing, use your own email as the recipient.
5. Use the credentials dropdown in both nodes. Run the valid test case from Python (with the secret header from p2-sec) and check the row and the email.
6. Don't paste Client IDs or Secrets into chat or into your repo.

**Done when:** A valid test case adds a row and sends an email, and you can explain OAuth, redirect URL and Testing mode in your own words.

**Full lesson:** `lessons/p2-3.md` (also on the dashboard). **Must know to finish this step:**

*What OAuth is and why*

- Explain OAuth in your own words and why not use a password
- Name the Client ID, Client Secret and token

*Setting up the Google Cloud app*

- Follow the six setup steps in order
- Say what the redirect URL is for and what a mismatch causes
- Say what Testing mode means after a week

*The sheet and the nodes*

- Append a row to Google Sheets and send a Gmail message from the workflow
- Test with your own address only


**Prompt: Check me (Socratic)**

> Role: Socratic questioner. I connected Google to n8n with OAuth. Ask me one question at a time: why OAuth instead of my password, what the redirect URL is for, why the app is in Testing mode and what that means after a week, and where my secrets are stored. Don't give me the answers.

### p2-4. Workflow 2: a scheduled report

*laptop · 60 min · roles: Explainer, Checker*

**Goal:** Build a workflow that runs on a schedule, fetches data, turns lists into items, filters, and emails a summary.

**Learn this first**

- Schedule Trigger fires only while the workflow is published and n8n is running.
- Split Out turns lists into items. Filter keeps some. Aggregate merges back to one item.

**Resources**

- [n8n docs: Schedule Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/)
- [n8n docs: Split Out](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.splitout/)

**Do this**

1. New workflow `05 weekly weather digest`. **Schedule Trigger**: every day at 08:00 for now.
2. **HTTP Request** to `https://api.open-meteo.com/v1/forecast?latitude=52.37&longitude=4.89&daily=temperature_2m_max,precipitation_sum&timezone=auto`. Look at the output: the daily data is three arrays.
3. Add **Split Out** on `daily.time`, `daily.temperature_2m_max` and `daily.precipitation_sum`. You should get 7 items.
4. Add a **Filter** that keeps days with precipitation above 1 mm. Add an **Aggregate** node to merge them. Add **Gmail** to send yourself a summary.
5. Click Execute workflow to test it. Don't wait for 08:00. Then set it Active (or Publish it).

**Done when:** Your test run emails a summary of the rainy days, and you can explain parallel arrays, Split Out, and why Aggregate is needed before one email.

**Full lesson:** `lessons/p2-4.md` (also on the dashboard). **Must know to finish this step:**

*The Schedule Trigger*

- Set a daily schedule and say what it needs to fire

*Parallel arrays and Split Out*

- Say what parallel arrays are and why Split Out is needed
- Configure Split Out on several fields

*Filter and Aggregate*

- Filter items by a condition
- Aggregate items into one before a single email

*Building the weekly digest*

- Build 05 weekly weather digest end to end


**Prompt: Check me (Checker)**

> Role: Checker. I built a scheduled digest with Split Out, Filter and Aggregate. Here is the node order and the output of each: [describe]. Ask me what would happen with 7 items going straight into the Gmail node without Aggregate, then check my answer by having me try it.

### p2-5. Branch, code and merge: Switch, Code and Merge nodes

*laptop · 60 min · roles: Explainer, Checker*

**Goal:** Use a Switch, a Code node and a Merge node in one workflow and understand how items move through them.

**Learn this first**

- Switch is an IF with many outputs. Merge joins branches. Code returns `[{ json: {...} }]`.
- Use a standard node when one exists.

**Resources**

- [n8n docs: Using the Code node](https://docs.n8n.io/build/code-in-n8n/using-the-code-node)
- [n8n docs: Switch node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.switch/)
- [n8n docs: Merge node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.merge/)

**Do this**

1. New workflow `06 order labels`. Manual Trigger, then a **Code** node that returns 6 sample orders (`id`, `customer`, `amount`) as items.
2. **Switch** on `amount`: under 50 is small, 50 to 200 is medium, above 200 is large.
3. On each branch add an **Edit Fields** node that adds `label` with the right word. Bring all three branches back with **Merge** (append mode).
4. Check that you get 6 items out, each with its label. Then add a second Code node that adds up all amounts into one item.

**Done when:** You get 6 labelled items and one total, and you can explain what shape a Code node must return and why Merge is needed.

**Full lesson:** `lessons/p2-5.md` (also on the dashboard). **Must know to finish this step:**

*The Code node*

- Return correctly shaped items from a Code node
- Read all incoming items and add up a field

*The Switch node*

- Build a Switch with three rules
- Say what the Fallback Output does and why it matters

*The Merge node*

- Choose between Append and Combine

*Building order labels*

- Build 06 order labels with Code, Switch, Edit Fields and Merge


**Prompt: Check me (Checker)**

> Role: Checker. I built Code, Switch and Merge. Here is my Code node and its output: [paste]. Check the shape and edge cases (an amount of exactly 50, a missing amount). Don't fix it for me. Ask what I'd change.

### p2-6. Add error handling [FAST LANE]

*laptop · 45 min · roles: Explainer, Socratic*

**Goal:** Make sure you hear about failures instead of discovering them from an angry client.

**Learn this first**

- An error workflow starts with an Error Trigger and only runs for automatic executions.
- Retry only what is safe to repeat. Never retry an email send.

**Resources**

- [n8n docs: Handle errors gracefully](https://docs.n8n.io/build/flow-logic/handle-errors-gracefully)

**Do this**

1. New workflow `00 error alert`: **Error Trigger**, then **Gmail** sending you the workflow name, the failed node and the error message.
2. In `05 weekly weather digest`, open Settings and choose `00 error alert` as the Error workflow.
3. Break the HTTP node on purpose (wrong URL). A manual run does **not** fire an error workflow (the Error Trigger only runs for automatic executions), so set the Schedule Trigger to every minute, publish the workflow and wait for the next run. Confirm you get the email, then unpublish and restore the schedule and the URL.
4. Turn on **Retry On Fail** (3 tries) on the HTTP node. Explain why not on the Gmail node.

**Done when:** A deliberate failure emails you, and you can explain when retry is safe and when it isn't.

**Full lesson:** `lessons/p2-6.md` (also on the dashboard). **Must know to finish this step:**

*Why workflows fail, and hearing about it*

- Say why you need to hear about failures

*The Error Trigger and error workflow*

- Build an error workflow with Error Trigger and an alert email
- Attach an error workflow in Settings

*Retry On Fail and On Error*

- Turn on Retry On Fail and say what Max Tries and Wait do
- Explain when a retry is unsafe

*Doing it*

- Trigger a deliberate failure and receive the alert
- Say why a manual run doesn't test an error workflow


**Prompt: Check me (Socratic)**

> Role: Socratic questioner. I added an error workflow and retries. Ask me one question at a time: what triggers the error workflow, what happens if the error workflow itself fails, why not retry a Gmail send, and what I would want an error alert to include for a client's workflow. Don't give me the answers.

### p2-7. Export, import and protect your workflows

*laptop · 30 min · roles: Explainer, Checker*

**Goal:** Back up workflows as JSON, restore one, and know what the file contains.

**Learn this first**

- A workflow exports as JSON with node settings and credential names, not secrets.
- Check an export for keys and personal data before committing.

**Do this**

1. Download all workflows from p2-2 to p2-6 into `C:\dev\automation-portfolio\workflows`.
2. Delete `06 order labels` in n8n, then import it again from the file and run it.
3. Open one JSON file in VS Code. Find a node name, its type, its parameters and the credential reference. Search the file for `@` and `key` to check nothing sensitive is in it.
4. Commit and push (`git add .`, `git commit`, `git push`).

**Done when:** You restored a deleted workflow from its file, and you can say what an export contains and what it doesn't.

**Full lesson:** `lessons/p2-7.md` (also on the dashboard). **Must know to finish this step:**

*A workflow is a JSON file*

- Find the name, nodes, parameters and credential reference in the file

*What an export contains, and what it doesn't*

- Say what an export contains and what it doesn't
- Check an export for sensitive content before committing

*Doing it*

- Restore a deleted workflow from its file
- Commit and push the exported files


**Prompt: Check me (Checker)**

> Role: Checker. Here is the structure of one of my exported workflow JSON files (remove any real emails first): [paste a short part]. Ask me where the credentials are, what would be unsafe to publish, and how I'd hand this workflow to a client.

### p2-8. Version your workflows with the n8n CLI

*laptop · 45 min · roles: Explainer, Checker*

**Goal:** Save every workflow as a readable file in Git, and restore a workflow from that history.

**Learn this first**

- Export with `docker exec ... n8n export:workflow`, copy out with `docker cp`, restore with `import:workflow`.
- Never export credentials into Git.

**Resources**

- [n8n docs: Source control and environments (the paid feature)](https://docs.n8n.io/administer/use-source-control-and-environments)

**Do this**

1. Run the export, copy the files into `workflows\` in your repo, open one file, and commit with a clear message.
2. Change a workflow in n8n, export again, and use `git diff` to see exactly what changed.
3. Delete a workflow in n8n, restore it from the file with the import command, and check it works and is active.
4. Add `git tag v0.1`. Write the three commands you'll use (export, copy, import) in `workflows\README.md`.

**Done when:** Your repo holds one readable file per workflow, you restored a deleted workflow from Git, and you can explain why credentials never go in the repo.

**Full lesson:** `lessons/p2-8.md` (also on the dashboard). **Must know to finish this step:**

*Why the CLI*

- Say why you version workflows with the CLI and Git

*Exporting: docker exec and docker cp*

- Run the export and copy the files into the repo
- Explain --separate and --pretty
- Say why credentials are never exported into Git
- Use `docker exec n8n n8n export:workflow --all --separate --pretty --output=/tmp/wf`: exports every workflow as its own readable file inside the container
- Use `docker cp n8n:/tmp/wf/. .\workflows`: copies the exported files from the container to the workflows folder

*Seeing changes and committing: git diff*

- Use git diff to see a change in a workflow file
- Tag a delivered version
- Use `git diff`: shows what changed since the last commit
- Use `git tag v1.0`: puts a version label on the current commit

*Restoring: import:workflow*

- Restore a deleted workflow from its file and check it is active
- Explain why dev and prod credentials are named and kept apart
- Use `docker exec n8n n8n import:workflow --input=/tmp/restore.json`: imports a workflow file from inside the container

*Doing it*

- Write the export, copy and import commands in workflows\README.md


**Prompt: Check me (Checker)**

> Role: Checker. Here are my export, copy and import commands, a `git diff` of one change, and my README: [paste]. Find what could go wrong: leaking secrets, importing over a newer version, forgetting to reactivate. Ask me how I'd roll back a client's workflow in under 10 minutes. Don't rewrite my commands.

### p2-b. Bonus: sub-workflows and loops [BONUS]

*laptop · 60 min · roles: Explainer, Checker*

**Goal:** Reuse a piece of logic from several workflows and process items in batches.

**Learn this first**

- Sub-workflows share logic. Loop Over Items sends batches.

**Do this**

1. Move the email-formatting steps of one workflow into a sub-workflow and call it from two workflows.
2. Process 25 sample items in batches of 5 with a 1-second wait between batches.

**Done when:** Two workflows share one sub-workflow, and the batch loop runs correctly.

**Full lesson:** `lessons/p2-b.md` (also on the dashboard). **Must know to finish this step:**

*Sub-workflows*

- Call a sub-workflow from two workflows

*Loop Over Items*

- Process 25 items in batches of 5 with a wait


**Prompt: Check me (Checker)**

> Role: Checker. Here is how I built my sub-workflow and my loop: [describe]. Find mistakes and ask me about edge cases.

### p2-r. Redo without help: Workflow 1 from a blank canvas [REDO WITHOUT HELP]

*laptop · 45 min · roles: Listener*

**Goal:** Rebuild the validated signup workflow with no notes.

**Learn this first**

- Rebuild the validated signup workflow from a blank canvas, then explain it aloud.

**Do this**

1. Create a new workflow `07 intake again`. Build it from memory, including the 400 branch. Time yourself.
2. Test with three cases from Python.
3. Dictate a 2-minute explanation of the flow as if to a client, and paste the transcript.

**Done when:** It works in under 30 minutes, and your explanation covers why validation comes first, what an item is and how the sender knows it worked.

**Full lesson:** `lessons/p2-r.md` (also on the dashboard). **Must know to finish this step:**

*The redo*

- Rebuild the validated signup workflow from memory in under 30 minutes
- Explain why validation comes first, what an item is, and how the sender knows


**Prompt: Check me (Listener)**

> Role: Listener. I rebuilt the signup workflow from memory in [N] minutes. Here is my spoken explanation: [paste]. Compare it with what the workflow really does and tell me what I missed. Be strict.

### p2-g. Phase 2 exam [EXAM]

*laptop · 30 min · roles: Examiner, Diagnostician, Clerk*

**Goal:** Show you can explain, build and debug in n8n, then lock in the gaps.

**Learn this first**

- Questions plus a debugging task. Mistakes become flashcards.

**Do this**

1. Run the exam prompt and answer from memory.
2. Fix the broken workflow the examiner describes. No notes.
3. Make the flashcards and review them over the next two days.

**Done when:** At least 80% on the exam, the broken workflow fixed, and two workflows with error handling that you could demo on a call.

**Full lesson:** `lessons/p2-g.md` (also on the dashboard). **Must know to finish this step:**

*What the Phase 2 exam covers*

- Know what the exam covers and the pass mark
- Describe a debugging routine for a failed execution

*After the exam*

- Say what happens after the exam


**Prompt: Exam me**

> Role: Examiner. Exam me on Phase 2, one question at a time, easy to hard: items, expressions, credentials, IF vs Switch, Split Out and Aggregate, error workflow, retry risks, export contents. Then give me one broken-workflow scenario to debug by describing what I'd check. Score me out of 10.

**Prompt: Diagnose and flashcards**

> Role: Diagnostician, then Clerk. Look at my mistakes in this exam and in C:\dev\ai-automation-portfolio\mistakes.md. What one root misunderstanding is behind them? Then make 8 flashcards and save them in C:\dev\ai-automation-portfolio\flashcards\ as one tab-separated text file for this phase (question, tab, answer, one card per line) so I can import them into Anki.

---

## Phase 3: AI in automations and agents (about 16 h)

*LLMs, classifiers, agents, RAG, cost and market research*

This is the part clients are asking about: put an AI model inside a workflow in a way that is reliable and affordable. You'll learn what an LLM actually does, build a classifier, build an agent, build a small question-answering system over documents, and learn what each run costs. You'll also research the Upwork market, so Phase 4 builds what clients ask for. Node names in n8n change a little between versions, so if one is missing, search the nodes panel for the idea.

**Start this phase with Claude:** Role: Interviewer. Before Phase 3, ask me 6 questions, one at a time, about what I know of LLMs, prompts, tokens, agents and RAG. Tell me which steps I can speed through.

### p3-1. Learn how LLMs and agents work [FAST LANE]

*phone · 60 min · roles: Explainer, Socratic, Listener*

**Goal:** Explain in your own words what an LLM, a token, a prompt, tool calling and an agent are, and when not to use an agent.

**Learn this first**

- An LLM predicts text, has no memory between calls and can hallucinate. You pay per token.
- An agent is an LLM in a loop with tools. Prefer a plain workflow when the steps are known.

**Resources**

- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [n8n docs: Build with AI in n8n](https://docs.n8n.io/build/integrate-ai)
- [Google: Gemini API docs](https://ai.google.dev/gemini-api/docs)

**Do this**

1. Read the Anthropic article on building effective agents. Pay attention to "workflows vs agents".
2. Open the n8n Advanced AI docs and read the introduction and the page about agents.
3. Dictate a 2-minute explanation of "workflow vs agent" and of "what is a token and why does it matter for cost". Paste the transcript.

**Done when:** You can explain all of the terms above to a non-technical person and say when an agent is overkill.

**Full lesson:** `lessons/p3-1.md` (also on the dashboard). **Must know to finish this step:**

*What an LLM is and what it is not*

- Explain what an LLM does and that it has no memory
- Say what a hallucination is

*Tokens, context window and temperature*

- Define token and say how cost is counted
- Explain the context window and temperature

*Prompts and structured output*

- Say what a system prompt and a user prompt are
- Explain structured output and why it must be validated

*Tool calling and agents*

- Explain tool calling and who runs the tool
- Explain workflow vs agent and when an agent is overkill

*Prompt injection*

- Explain prompt injection and name three defences

*Reading and explaining it*

- Explain the terms to a non-technical person


**Prompt: Check me (Socratic then Listener)**

> Role: Socratic questioner, then Listener. Ask me one question at a time about LLMs, tokens, tool calling and workflow vs agent until I find my gaps. Then I'll paste my spoken explanation of workflow vs agent. Compare it with the source article and tell me what I missed.

### p3-2. Build an AI classifier workflow [FAST LANE]

*laptop · 90 min · roles: Explainer, Checker*

**Goal:** Use an LLM to classify incoming messages and extract fields as JSON, then route them.

**Learn this first**

- A chat model plugs into a Text Classifier or Information Extractor. The category descriptions are the prompt.
- Test with hard inputs, not only easy ones.

**Resources**

- [n8n docs: Text Classifier node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.text-classifier/)
- [n8n docs: Information Extractor node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.information-extractor/)
- [Google AI Studio: API keys](https://aistudio.google.com/apikey)

**Do this**

1. In n8n create a credential for Google Gemini using your API key (from p0-5). Don't paste it anywhere else. This free key is for **learning with fake messages only**. Google's terms require a paid account for anything you make available to users in the EU, so client work later runs on the client's own paid account.
2. New workflow `08 message classifier`. **Webhook** (POST, path `classify`), then **Text Classifier** with categories `sales`, `support`, `spam`, `other`, each with a one-line description, then **Information Extractor** for `name` and `urgency` (low, medium, high).
3. Route each category to a different **Edit Fields** that adds `route` such as `sales-team`.
4. Write 12 test messages in a file `tests/classify.json`, including 4 hard ones. Send them with a Python loop, and record the results in a table: message, expected, got.
5. Improve the category descriptions until at least 11 of 12 are correct. Note what you changed and why.

**Done when:** At least 11 of 12 test messages are routed correctly, and you can explain why the descriptions matter and why low temperature is used.

**Full lesson:** `lessons/p3-2.md` (also on the dashboard). **Must know to finish this step:**

*The AI nodes in n8n*

- Attach a chat model to a root AI node
- Say what the free key may and may not be used for

*Text Classifier*

- Build a Text Classifier with described categories
- Say what When No Clear Match does

*Information Extractor*

- Define attributes for the Information Extractor

*Testing with hard inputs*

- Write a test list with hard cases and record expected vs got
- Improve category descriptions from the wrong results


**Prompt: Check me (Checker)**

> Role: Checker. Here is my category setup and my results table of 12 messages: [paste]. Look at the wrong ones. Tell me what in my descriptions caused each mistake, without rewriting them for me. Then ask me what 3 more hard test cases I should add.

### p3-eval. Measure your AI: accuracy, precision and recall

*laptop · 60 min · roles: Explainer, Checker*

**Goal:** Turn "it seems to work" into numbers you can show a client, and re-measure every time you change a prompt.

**Learn this first**

- Measure with a labelled test set: accuracy, precision, recall. Keep a set you never tune on.
- Re-run the same tests after every change.

**Resources**

- [scikit-learn: classification metrics (explains precision, recall and the confusion matrix)](https://scikit-learn.org/stable/modules/model_evaluation.html#classification-metrics)
- [DeepEval: open-source LLM evaluation (optional, for later)](https://deepeval.com/)

**Do this**

1. Extend `tests/classify.json` to at least 40 messages, each with its correct label. Give every category at least 6 messages, make 8 of them hard, and put 10 aside as a set you never tune on.
2. In `03-ai\eval_classifier.py` write a script that sends each message to your n8n webhook, collects the category, and prints accuracy, per-category precision and recall, and a confusion matrix. Use a request timeout and a short pause between calls.
3. Run it twice. Record both results in `eval-log.md` with the date and the category descriptions you used.
4. Change one category description, run again, and record whether the numbers got better or worse and which messages changed.

**Done when:** Your script prints accuracy, precision, recall and a confusion matrix, your log has at least two runs, and you can explain why you keep a set you never tune on.

**Full lesson:** `lessons/p3-eval.md` (also on the dashboard). **Must know to finish this step:**

*Why numbers beat "it seems to work"*

- Explain a labelled test set and the set you never tune on

*Accuracy, precision, recall and the confusion matrix*

- Calculate accuracy, precision and recall from counts
- Say which metric matters for which kind of mistake
- Read a confusion matrix

*Repeatability and regression testing*

- Run the test twice and log it
- Re-run the same test set after every change

*Build the eval script*

- Write eval_classifier.py that prints the four results
- Answer a client who asks if 92% is safe


**Prompt: Check me (Checker)**

> Role: Checker. Here is my eval script and my log of results: [paste]. Check my metric calculations by hand for two categories. Find ways my test set could mislead me (too easy, unbalanced, tuned on). Then ask me what I'd say to a client who asks "so is it 92% safe?". Don't rewrite my script.

### p3-3. Build an agent with two tools

*laptop · 90 min · roles: Explainer, Socratic*

**Goal:** Build an agent that decides which tool to use, and read its logs to see how it decided.

**Learn this first**

- An agent can only do what its tools allow. It picks tools from their descriptions.
- Read the Logs to see how it decided. Give it the least power.

**Resources**

- [n8n docs: AI Agent node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/)
- [n8n docs: Tools](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcalculator/)

**Do this**

1. New workflow `09 helper agent`. Use the **Chat Trigger**, then an **AI Agent** with the Gemini chat model and Simple Memory.
2. Add two tools: a **Calculator** and an **HTTP Request Tool** that calls the Open-Meteo weather API. Write each tool's description in one clear sentence.
3. Ask these in the chat: "What is 18% of 240?", "What is the temperature in Amsterdam now?" (give coordinates in the tool description), and "What is 15% of the temperature in Amsterdam?". Open Logs after each and write down which tools were used in which order.
4. Break a tool description on purpose (make it vague) and watch what the agent does.

**Done when:** You can describe, from the logs, how the agent chose its tools, and explain why descriptions matter and why you'd restrict tool power.

**Full lesson:** `lessons/p3-3.md` (also on the dashboard). **Must know to finish this step:**

*The AI Agent node and its parts*

- Name the parts of an AI Agent setup
- Explain what memory is for

*Tools and their descriptions*

- Write clear tool descriptions

*Reading the Logs*

- Read the Logs to see tool calls in order

*Least power and approvals*

- Explain why tools get the least power and when approval is needed

*Build it*

- Build 09 helper agent and explain its tool choices from the logs


**Prompt: Check me (Socratic)**

> Role: Socratic questioner. I built an agent with a calculator and a weather tool. Ask me one question at a time: how did the agent decide which tool to call, what would happen if both descriptions were vague, why does memory matter, and what is risky about giving an agent a "send email" tool. Don't give me the answers.

### p3-4. Build a question-answering bot over your own documents (RAG)

*laptop · 90 min · roles: Explainer, Checker*

**Goal:** Answer questions from a small document set, with the answer coming from the documents and not from the model's memory.

**Learn this first**

- RAG finds relevant chunks first and gives them to the model with the question.
- Simple Vector Store lives in memory: it is empty after every restart.

**Resources**

- [n8n docs: Simple Vector Store node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory)
- [n8n docs: Retrieve relevant context (RAG)](https://docs.n8n.io/build/integrate-ai/understand-ai-components/retrieve-relevant-context)

**Do this**

1. Write the text of a FAQ about ComniWell: 12 short Q&As covering what it tracks, platforms, privacy, pricing status and what's planned. Use only true statements. Save it as `comniwell-faq.md` in your repo too.
2. Build workflow `10 faq loader`: **Manual Trigger**, an **Edit Fields** node with one field `text` that holds the whole FAQ (paste it in), a **Default Data Loader** (type JSON, loading the `text` field), a **text splitter** (Recursive Character Text Splitter), a **Gemini Embeddings** node and a **Simple Vector Store** in **Insert Documents** mode with Memory Key `faq`.
3. Build workflow `11 faq bot`: **Chat Trigger**, **AI Agent** with the Gemini chat model, and a **Simple Vector Store** node set to **Retrieve Documents (As Tool for AI Agent)** with the same Memory Key `faq` and the same embeddings model. Give the tool a clear description. System prompt: answer only from the retrieved text; if it isn't there, say you don't know.
4. Run the loader, then ask 5 questions whose answers are in the document and 3 whose answers are not. Record the results.
5. Restart n8n (`docker restart n8n`) and ask again. Notice that it forgot everything, then run the loader again.

**Done when:** The bot answers the 5 in-document questions correctly and says it doesn't know for the 3 out-of-document questions. You can explain chunking, embeddings and why the system prompt matters.

**Full lesson:** `lessons/p3-4.md` (also on the dashboard). **Must know to finish this step:**

*What RAG is and why*

- Explain RAG in one sentence and what problem it reduces

*Chunks, embeddings and the vector store*

- Explain chunking, embeddings and a vector store

*Simple Vector Store and its limits*

- Say what the Memory Key is for
- Say what happens to the data on restart

*Build the loader and the bot*

- Build the loader and the bot with the same Memory Key
- Test with questions inside and outside the document
- Use `docker restart n8n`: restarts the n8n container, which empties the in-memory vector store

*Finding why an answer is wrong*

- Tell chunk, retrieval and prompt problems apart


**Prompt: Check me (Checker)**

> Role: Checker. Here are my 8 questions, the bot's answers and my system prompt: [paste]. Find where it hallucinated or missed, and tell me whether the cause is the chunks, the retrieval or the prompt. Ask me how I'd find out. Don't fix it for me.

### p3-m. MCP: connect agents to tools the standard way

*laptop · 90 min · roles: Explainer, Socratic*

**Goal:** Understand what MCP is, use an MCP tool inside an n8n agent, and expose one of your own n8n workflows as an MCP tool.

**Learn this first**

- MCP is a standard plug between AI apps and tools. n8n has a Client Tool and a Server Trigger.
- A server gives a model power to act: authenticate and keep tools minimal.

**Resources**

- [Model Context Protocol: introduction](https://modelcontextprotocol.io/)
- [n8n docs: MCP Client Tool node](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolmcp/)
- [n8n docs: MCP Server Trigger node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.mcptrigger/)

**Do this**

1. Read the MCP introduction and the two n8n node pages.
2. New workflow `15 weather tool server` with an **MCP Server Trigger** and one tool (an HTTP Request Tool that returns the weather). Use authentication if the node offers it. Note the URL it shows.
3. Add the **MCP Client Tool** to your agent from p3-3, point it at that URL, and ask a weather question. Open Logs and find the tool call.
4. Optional: connect the same server to Claude Code on your computer (Claude Code's documentation shows the `claude mcp add` command) and call your tool from there. Disconnect it afterwards.
5. Write 5 sentences: what MCP is, the two n8n directions, and two risks.

**Done when:** An agent of yours calls a tool through an MCP server you built, and you can explain MCP, both n8n directions and two risks.

**Full lesson:** `lessons/p3-m.md` (also on the dashboard). **Must know to finish this step:**

*What MCP is*

- Explain MCP, server and client

*The two directions in n8n*

- Tell the MCP Client Tool from the MCP Server Trigger

*Security and authoring with AI*

- Name two MCP risks and the rules for AI-assisted authoring

*Build it*

- Call your own MCP tool from an agent and find it in the Logs


**Prompt: Check me (Socratic)**

> Role: Socratic questioner. I built an MCP server trigger workflow and used it from an agent. Ask me one question at a time: what MCP is and what problem it solves, the difference between the server trigger and the client tool, what could go wrong if a tool can send emails, and what I should do before letting an AI assistant write workflows for a client. Don't give me the answers.

### p3-5. Make AI workflows reliable: guardrails, fallbacks, logging

*laptop · 60 min · roles: Explainer, Checker*

**Goal:** Make the classifier from p3-2 safe to hand to a client.

**Learn this first**

- Models fail three ways: API errors, broken format, confidently wrong answers.
- Validate, route doubts to review, log every call, set a cost limit.

**Do this**

1. In workflow `08 message classifier` add a check after the classifier: if the category is missing or the extracted urgency isn't low, medium or high, send to a `needs review` branch.
2. Add a **Google Sheets** node that logs time, message, category, urgency and route.
3. Turn on **Retry On Fail** on the model call. Send 3 messages with a wrong API key to see what happens, then fix the key.
4. Write 5 bullet points in `README.md` for the project: what it does, its inputs and outputs, what happens on failure, what it costs (next step) and what a human must check.

**Done when:** A broken output goes to review instead of being guessed, every call is logged, and you can explain the three failure types.

**Full lesson:** `lessons/p3-5.md` (also on the dashboard). **Must know to finish this step:**

*Three ways models fail*

- Name the three failure types

*Validate and route to review*

- Add a validation step with a needs review branch

*Logging and retries and limits*

- Log calls to a Google Sheet and turn on Retry On Fail
- Say why a cost limit is set in the provider console

*Doing it and the README*

- Write the README with five bullet points


**Prompt: Check me (Checker)**

> Role: Checker. Here is my reliability setup for the classifier: [describe]. Find what could still go wrong in production, for example an empty message, a prompt-injection message ("ignore your instructions"), or an expired key. Ask me how I'd handle each. Don't fix it for me.

### p3-6. Learn what AI costs and how to quote it

*phone · 45 min · roles: Explainer, Examiner*

**Goal:** Estimate the running cost of an AI workflow and explain it to a client.

**Learn this first**

- Cost = (input tokens x input price + output tokens x output price) / 1,000,000.
- Quote build fee, AI usage (client's own account) and hosting separately.

**Resources**

- [Google: Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing)
- [Anthropic: Pricing](https://platform.claude.com/docs/en/about-claude/pricing)

**Do this**

1. Open both pricing pages and write down the price per million input and output tokens for one cheap and one stronger model.
2. Calculate: a classifier that gets 500 messages a day, each about 120 tokens in and 40 tokens out. What does it cost per day and per month on the cheap model, and on the stronger model?
3. Write 3 sentences you could say to a client to explain these costs without jargon.

**Done when:** Your calculation is correct and your 3 sentences are clear to a non-technical person.

**Full lesson:** `lessons/p3-6.md` (also on the dashboard). **Must know to finish this step:**

*The cost formula*

- Calculate the cost of one call and scale it to a month
- Say that output tokens usually cost more

*Models, prices and where the lever is*

- Say which model class to use for classification
- Say why the pricing page must be checked on the day of the quote

*Quoting the three costs*

- Separate build fee, AI usage and hosting in a quote
- Explain AI cost to a client without jargon

*The calculation task*

- Compute the daily and monthly cost for 500 messages a day on two models


**Prompt: Quiz me (Examiner)**

> Role: Examiner. Give me 4 cost questions, one at a time, with different numbers (messages per day, tokens, a different model), and check my arithmetic and reasoning. Then ask me to explain the cost to a client in 3 sentences and critique it.

### p3-7. Research the Upwork market [FAST LANE]

*phone or laptop · 60 min · roles: Interviewer, Mapmaker*

**Goal:** Find out what clients actually ask for, so your portfolio matches the market.

**Learn this first**

- Read real job posts for repeated needs and the clients' own words.
- Know the red flags before you apply.

**Resources**

- [Upwork Help Center (may block automated link checkers but opens in a browser)](https://support.upwork.com/)

**Do this**

1. Browse Upwork for jobs matching `n8n`, `automation`, `Make.com`, `Python API`, `chatbot`, `AI agent` and `Zapier`. Open 15 job posts.
2. Make a file `market-research.md` with a table: title, what the client wants, tools named, budget, client history, could I do it after Phase 4 (yes, no, partly).
3. Find the 3 most repeated needs. Write one sentence for each in the client's own words.

**Done when:** A table of 15 jobs and three repeated needs, with a plan for which one Project C should serve.

**Full lesson:** `lessons/p3-7.md` (also on the dashboard). **Must know to finish this step:**

*Read the market, don't guess*

- Say what makes a good first job

*Red flags and scams*

- Name six red flags in a job post

*Doing the research*

- Make the 15-job table and find the 3 repeated needs


**Prompt: Map the market (Interviewer then Mapmaker)**

> Role: Interviewer, then Mapmaker. Here is my market research table and three repeated needs: [paste]. First ask me 5 questions about what I'd enjoy and be good at. Then tell me which of the three needs I should build my portfolio around, which of my Phase 4 projects should cover it, and what I'd still need to learn. Challenge my reasoning.

### p3-b. Bonus: build the same agent in Python [BONUS]

*laptop · 120 min · roles: Explainer, Checker*

**Goal:** Understand what n8n's AI Agent node hides, by writing a small tool-calling loop yourself.

**Learn this first**

- An agent loop: send messages and tools, run requested tools, repeat until a plain answer. Cap the loops.

**Resources**

- [Gemini API: Function calling (works with your free key)](https://ai.google.dev/gemini-api/docs/function-calling)
- [Anthropic: Tool use overview (needs a paid API account)](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)

**Do this**

1. In `03-agents` write a script with one tool (`get_temperature(lat, lon)` using Open-Meteo) and a loop that lets the model use it. Use the Gemini function-calling docs, because your free key from p0-5 works with them. Load the key from `.env` as you did in p0-5, and never print it.

**Done when:** Your script answers a weather question by calling your tool, and you can explain every step of the loop.

**Full lesson:** `lessons/p3-b.md` (also on the dashboard). **Must know to finish this step:**

*The agent loop*

- Describe the three steps of the agent loop and why to cap it

*Build it with Gemini function calling*

- Write a tool-calling loop with a loop limit


**Prompt: Check me (Checker)**

> Role: Checker. Here is my agent loop: [paste, without keys]. Find bugs and missing safety limits such as a maximum number of loops. Don't rewrite it for me.

### p3-r. Redo without help: the classifier from scratch [REDO WITHOUT HELP]

*laptop · 60 min · roles: Listener*

**Goal:** Rebuild the classifier with a different use case and no notes.

**Learn this first**

- Rebuild the classifier for a new use case, tests first, then explain it to a nervous client.

**Do this**

1. Pick a new use case: sort customer emails of a gym into `membership`, `booking`, `complaint`, `other` and extract `member_name`.
2. Build it from a blank canvas, including the review route and the logging. Write 8 test messages first.
3. Dictate a 2-minute explanation as if to a client who is afraid the AI will make mistakes.

**Done when:** It works with at least 7 of 8 test messages correct, and your explanation covers testing, review routes and logging.

**Full lesson:** `lessons/p3-r.md` (also on the dashboard). **Must know to finish this step:**

*A new use case from a blank canvas*

- Rebuild the classifier for a new use case with tests first
- Explain testing, review routes and logging to a nervous client


**Prompt: Check me (Listener)**

> Role: Listener. I rebuilt a classifier for a gym's emails from memory. Here are my test results and my spoken explanation for a nervous client: [paste]. Grade my explanation for honesty and clarity, and tell me what I missed.

### p3-g. Phase 3 exam [EXAM]

*phone · 40 min · roles: Examiner, Diagnostician, Clerk*

**Goal:** Show that you can explain and judge AI automation honestly, then lock in the gaps.

**Learn this first**

- Answer like to a sceptical business owner: mistakes, cost, agent or not. Then technical scoring.

**Do this**

1. Run the exam prompt. Answer as if the examiner is a business owner who knows nothing about AI.
2. Make the flashcards and review them over the next two days.

**Done when:** At least 80% on the exam, including an honest answer on when an agent is overkill.

**Full lesson:** `lessons/p3-g.md` (also on the dashboard). **Must know to finish this step:**

*The questions business owners ask*

- Answer the five owner questions in plain language

*What the exam covers*

- Know what the exam covers and the pass mark


**Prompt: Exam me**

> Role: Examiner playing a sceptical small-business owner. Ask me one question at a time, easy to hard: what an LLM is, will it make mistakes and how I handle that, what it costs per month for 500 requests a day, workflow vs agent for their case, what happens if the AI is wrong, and what you do with their customers' data. Then switch to examiner and score my technical answers out of 10.

**Prompt: Diagnose and flashcards**

> Role: Diagnostician, then Clerk. Look at my mistakes in this exam and in C:\dev\ai-automation-portfolio\mistakes.md. What one root misunderstanding is behind them? Then make 8 flashcards and save them in C:\dev\ai-automation-portfolio\flashcards\ as one tab-separated text file for this phase (question, tab, answer, one card per line) so I can import them into Anki.

---

## Phase 4: Portfolio and case studies (about 24 h)

*Three projects you can show a client*

Clients hire people who can show something similar to what they need. You'll build three small projects and write a short, honest case study for each. You can start applying on Upwork as soon as Project B is done, so you don't need to wait for the whole phase. Be truthful about what is a prototype with sample data. Clients and Upwork trust honest portfolios, and honesty is also what makes your friends' business credible later.

**Start this phase with Claude:** Role: Mapmaker. Before Phase 4, look at my market research from p3-7 (market-research.md) and ask me 4 questions, one at a time. Then adjust the specs of Projects A, B and C below so they match the needs clients actually have.

### p4-1. Project A: ComniWell signup automation

*laptop · 3 hours · roles: Explainer, Checker*

**Goal:** Build a workflow that notices new waitlist signups, logs them, notifies you once per signup, and sends you a weekly digest.

**Learn this first**

- Idempotency: mark handled rows (a `notified` flag) so a timed workflow never repeats itself.
- Least privilege: the Supabase secret key bypasses RLS, so it lives only in the n8n credential.
- Poll with a Schedule Trigger; localhost can't receive webhooks.

**Resources**

- [n8n docs: Supabase node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.supabase/)
- [Supabase docs: Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)

**Do this**

1. First find out where ComniWell's waitlist emails are stored, and ask Claude to help you choose the safest way to read them. A good first version uses a **practice table with fake signups** in a separate Supabase project, then you decide if you want to connect the real one.
2. In a new, free practice Supabase project, open the Table Editor and create a table `practice_signups` with columns `id` (auto), `email` (text), `created_at` (timestamp, default now) and `notified` (boolean, default false). Add 3 fake rows by hand using made-up addresses like `test1@example.com`. In n8n, create a Supabase credential from the project URL (Integrations, Data API; leave off `/rest/v1`) and a secret key (Project Settings, API Keys).
3. Build workflow `12 signup notifier`: **Schedule Trigger** (every 15 minutes), **Supabase** (Get many rows where `notified` is false), a check for zero rows, **Google Sheets** (append), **Gmail** (notify yourself), **Supabase** (set `notified` to true).
4. Add the error workflow from p2-6.
5. Build workflow `13 weekly digest`: **Schedule Trigger** (Monday 08:00), read signups from the last 7 days, **Aggregate** or a Code node for the count, **Gmail** to yourself with the number and the list.
6. Test by inserting 3 fake rows. Run twice and prove that you are notified only once per row.

**Done when:** Fake signups produce exactly one notification each, the digest has the right count, and you can explain idempotency and least privilege.

**Full lesson:** `lessons/p4-1.md` (also on the dashboard). **Must know to finish this step:**

*Idempotency: don't do the same thing twice*

- Explain idempotency and why a timed workflow needs it
- Describe the marker pattern (find unmarked rows, act, then mark)
- Say why you mark after the action succeeds and what the trade-off is

*Least privilege and Supabase keys*

- Explain least privilege and why it matters for keys
- Tell the publishable key and the secret key (service_role) apart
- Say where the Supabase secret key may live and where it must never go

*Supabase basics you need*

- Create a table with the right columns in the Supabase Table Editor
- Say what the two things n8n's Supabase credential needs and where each is found

*Polling, webhooks and consent*

- Say why this project polls instead of using a webhook
- Say when you may email the people who signed up

*Build the notifier and the weekly digest*

- Build the notifier in the right order, with the marker update last
- Prove idempotency by running the workflow twice
- Build a weekly digest that counts the last 7 days

*What can go wrong*

- Describe what happens when Supabase is down
- Explain the overlap problem and one way to reduce it
- Say what to do if a key leaks


**Prompt: Check me (Checker)**

> Role: Checker. Here is how my signup notifier works, including how I avoid duplicates and which key it uses: [describe]. Find the failure cases: what if Supabase is down, what if two runs overlap, what if a row is edited, what if the key leaks. Ask me how I'd handle each. Don't fix it for me.

### p4-sql. SQL basics for Supabase and client databases

*laptop · 90 min · roles: Explainer, Examiner*

**Goal:** Read and write simple SQL so you can work with Supabase, Postgres and the databases clients already have.

**Learn this first**

- SELECT reads, INSERT adds, UPDATE changes, DELETE removes. Filter with WHERE, group with GROUP BY, combine with JOIN.
- Always run a SELECT with the same WHERE before an UPDATE or DELETE.
- Primary key identifies a row; foreign key points to another table. Use parameters, never string-gluing.

**Resources**

- [SQLBolt: free interactive SQL lessons](https://sqlbolt.com/)
- [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html)
- [Supabase docs: Database overview](https://supabase.com/docs/guides/database/overview)

**Do this**

1. Do the SQLBolt lessons on queries, joins and aggregates, and on inserting, updating and deleting (about 60 minutes). Write each query yourself.
2. In your practice Supabase project open the **SQL Editor** and create `customers (id, name, email, city)` and `orders (id, customer_id, amount, created_at)`. Add 5 invented customers and 12 invented orders.
3. Write queries for: all orders over 50; the total per customer; customers with no orders; the 3 biggest orders with the customer's name (a join); orders from the last 7 days.
4. Write an `UPDATE` the safe way: first a `SELECT` with the `WHERE`, then the `UPDATE` with the same `WHERE`.

**Done when:** Your five queries return correct results, you did one safe UPDATE, and you can explain a primary key, a foreign key, a JOIN and why string-gluing is dangerous.

**Full lesson:** `lessons/p4-sql.md` (also on the dashboard). **Must know to finish this step:**

*Tables, keys and types*

- Explain a table, a row and a column
- Explain a primary key and a foreign key
- Name five Postgres column types and what each holds
- Use `CREATE TABLE`: makes a new table with its columns and types

*Reading data: SELECT, WHERE, ORDER BY, LIMIT*

- Write a query with a filter, a sort and a limit
- Write a query for the last 7 days
- Use `SELECT`: reads rows from a table
- Use `WHERE`: filters rows by a condition
- Use `ORDER BY`: sorts the result (add `desc` for biggest first)
- Use `LIMIT`: keeps only the first N rows

*Counting and totals: aggregates and GROUP BY*

- Write the total per customer
- Explain WHERE versus HAVING
- Use `COUNT`: counts rows
- Use `SUM`: adds up a numeric column
- Use `GROUP BY`: makes one result row per group, for use with aggregates

*Joining tables*

- Write a join that follows the foreign key
- Find rows with no match using LEFT JOIN and IS NULL
- Use `JOIN ... ON`: combines two tables where the key columns match
- Use `LEFT JOIN`: keeps every row from the left table, with nulls where nothing matches

*Changing data safely*

- Run the select-first routine before an UPDATE or DELETE
- Say what happens to an UPDATE with no WHERE
- Use `INSERT`: adds a new row
- Use `UPDATE`: changes values in existing rows (always with WHERE)
- Use `DELETE`: removes rows (always with WHERE)

*RLS and SQL injection*

- Explain what RLS does and which key skips it
- Explain SQL injection and the defence


**Prompt: Quiz me (Examiner)**

> Role: Examiner. Give me 6 SQL tasks one at a time against my customers and orders tables, getting harder (filter, group, join, left join for customers without orders, a safe update, a query that would be dangerous without a WHERE). Check my queries by reasoning about the result. Tell me my level.

### p4-pg. Persistent RAG with Supabase pgvector

*laptop · 3 hours · roles: Explainer, Checker*

**Goal:** Replace the in-memory vector store with one that survives restarts, so a RAG bot could actually go to a client.

**Learn this first**

- pgvector adds a vector column and similarity search to Postgres, so embeddings survive a restart.
- vector(N) must equal your embedding model's output size; never mix models in one table.
- Use the Supabase Vector Store node; avoid duplicate inserts and private data in the table.

**Resources**

- [Supabase docs: Vector columns (pgvector)](https://supabase.com/docs/guides/ai/vector-columns)
- [n8n docs: Supabase Vector Store node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoresupabase/)

**Do this**

1. In your practice Supabase project enable the `vector` extension. Create the table and search function from the n8n Supabase Vector Store docs. Note the embedding size.
2. Rebuild your FAQ loader from p3-4 with the **Supabase Vector Store** node in Insert mode, and your FAQ bot with the same node as an agent tool.
3. Ask 5 in-document and 3 out-of-document questions. Then restart n8n (`docker restart n8n`) and ask again. It should still answer.
4. Look at the rows in Supabase's table editor: the text, the metadata and the embedding.
5. Write 5 sentences on the difference between the two stores and when each is the right choice.

**Done when:** Your bot answers after an n8n restart, and you can explain pgvector, why the embedding size must match, and why Simple Vector Store isn't for clients.

**Full lesson:** `lessons/p4-pg.md` (also on the dashboard). **Must know to finish this step:**

*Why Simple Vector Store isn't enough*

- Say why the Simple Vector Store isn't for clients
- Say what survives a restart and what doesn't
- Use `docker restart n8n`: restarts the n8n container (your memory store is wiped, the database one survives)

*pgvector, tables and the search function*

- Say what pgvector adds to Postgres
- Say what the documents table and the match function are for
- Enable the extension and create the table and function in the SQL Editor

*Embedding size must match*

- Say what the number in vector(N) means and what it must equal
- Say what to do when an insert reports the wrong dimension

*Rebuild the loader and the bot*

- Build the loader with Insert Documents and the bot with the agent-tool mode
- Show that the bot still answers after docker restart n8n
- Say how to avoid duplicate rows and how to update one answer

*Quality levers and when to use which store*

- Name three levers that improve retrieval
- Say when to choose each store


**Prompt: Check me (Checker)**

> Role: Checker. Here is my vector table setup, my loader and bot descriptions, and my test results before and after restarting n8n: [paste, no keys]. Find what could go wrong with a client's real data: wrong embedding size, duplicate inserts when the loader runs twice, private data in the table. Ask me how I'd update one FAQ answer without reloading everything. Don't fix it for me.

### p4-2. Project B: a Python data script you could sell [FAST LANE]

*laptop · 3 hours · roles: Explainer, Checker*

**Goal:** Write a tidy script that pulls data from an API, cleans it, calculates something useful and writes a report, with a README another person can follow.

**Learn this first**

- A sellable script has a purpose, settings in one place, error handling, logging, a tested function and a README.
- argparse reads --days, logging records what happened, pytest tests the calculation.
- Frankfurter has working days only, so never hard-code 30 values.

**Resources**

- [Frankfurter exchange rate API docs](https://frankfurter.dev)
- [Python docs: argparse tutorial](https://docs.python.org/3/howto/argparse.html)
- [Python docs: logging how-to](https://docs.python.org/3/howto/logging.html)
- [pytest: Get started](https://docs.pytest.org/en/stable/getting-started.html)

**Do this**

1. Use the free Frankfurter exchange-rate API (no key). Read its docs and check the current URL format. If it ever stops working, Open-Meteo weather data does the same job.
2. In `C:\dev\automation-portfolio\02-report` write `report.py`. **Spec:** fetch the last N days (argument `--days`, default 30) of EUR to USD and GBP, compute the minimum, maximum, average and percentage change for each, and write a `report.csv` plus a readable summary printed to the terminal.
3. Add logging, error handling (API down, empty data, bad argument) and a `.env.example` if you use any setting.
4. Write 3 `pytest` tests for your calculation function with small hand-made numbers.
5. Write a README with: what it does, setup (`python -m venv`, `pip install -r requirements.txt`), usage with an example, and what happens on failure. Ask a friend to follow it without your help.

**Done when:** A friend can run it from your README without asking you a question, the tests pass, and bad input fails with a clear message.

**Full lesson:** `lessons/p4-2.md` (also on the dashboard). **Must know to finish this step:**

*What makes a script sellable*

- List the six parts of a sellable script
- State the spec of Project B

*Getting data from the API*

- Build the date range and request URL for the last N days
- Say why a 30-day request returns fewer than 30 values

*argparse: settings from the command line*

- Write a command-line argument with argparse
- Say what argparse does with a bad value

*logging and error handling*

- Set up logging with timestamps and levels
- Handle API down, empty data and a bad argument with clear messages

*The calculation, CSV and pytest*

- Keep the calculation in a testable function
- Write a CSV with DictWriter and newline=""
- Write and run three pytest tests with hand-made numbers
- Use `python -m pip install pytest`: installs pytest into the active environment
- Use `pytest`: runs every test_ function in test_*.py files

*Layout, venv and the README*

- List what goes in the project folder
- Write the setup commands a README must contain
- List the five parts of the README
- Use `python -m venv .venv`: creates the virtual environment folder
- Use `pip install -r requirements.txt`: installs every package listed in requirements.txt


**Prompt: Check me (Checker)**

> Role: Checker, like a code reviewer for a client. Here is my script, tests and README: [paste]. Find bugs, unclear naming, missing error handling and README gaps. Don't rewrite it. Ask me one question about a design decision I should be able to defend.

### p4-3. Project C: a small-business AI assistant

*laptop · 3 hours · roles: Explainer, Checker*

**Goal:** Build an assistant that answers common questions from a document and captures leads, with honest limits.

**Learn this first**

- An assistant says it's an AI, answers only from approved info, says "I don't know", and never invents prices.
- `$fromAI('key', 'description', 'type')` lets the model fill a tool's fields; it works only in agent tools.
- No real patient data. Show a screen recording because localhost can't serve a website.

**Resources**

- [n8n docs: Chat Trigger node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/)
- [n8n docs: Use AI to fill in tool parameters ($fromAI)](https://docs.n8n.io/build/integrate-ai/ai-examples/use-ai-for-parameters)

**Do this**

1. Pick a fictional business that matches your market research, or a friendly one with permission. If you use your mother's physiotherapy clinic, use only the public website information, such as opening hours and treatment types, and do not use any patient data.
2. Write `business-faq.md` with 15 answers. Load them into the persistent Supabase vector store from p4-pg. If you skipped that step, use the in-memory store from p3-4 and remember it forgets on restart.
3. Build workflow `14 business assistant`: **Chat Trigger**, **AI Agent** with the FAQ as retrieval tool, and a second tool that collects a lead (name, email, question) into a **Google Sheet** and emails you. The system prompt must include the rules above, and the first message must be the AI disclosure from the checklist.
4. Test 8 questions in the FAQ, 4 outside it, and 3 attempts to trick it (ask for a discount, ask for medical advice, say "ignore your instructions"). Record results.
5. Record a 2-minute screen video of the workflow and a chat.

**Done when:** The assistant discloses it is an AI in its first message, answers FAQ questions, refuses the others politely, captures a lead, and passes the 3 tricks. You can explain why it doesn't connect to real patient data.

**Full lesson:** `lessons/p4-3.md` (also on the dashboard). **Must know to finish this step:**

*The most common small-business request*

- Name the two tools Project C's agent needs
- Say which business data is allowed in the first version

*What a good assistant does*

- List the five behaviours of a good assistant
- Write system prompt rules for an FAQ assistant

*Telling people it's an AI (disclosure)*

- State when Article 50 applies and what it asks of a chatbot
- Recite the six-point disclosure checklist

*A tool that saves a lead: $fromAI*

- Write a $fromAI expression with its three arguments
- Say where $fromAI works and what its arguments mean
- Say when the lead tool may be called

*Health data and where it can run*

- Explain why the assistant doesn't touch real patient data
- Explain why a localhost n8n can't serve a real website and what to do for the portfolio

*Build and test*

- Build workflow 14 with the correct parts
- Run the 8 / 4 / 3 test set and record results


**Prompt: Check me (Checker)**

> Role: Checker playing a sceptical client. Here are my system prompt and my test results: [paste]. Try to find ways to break it that I haven't tested and tell me what you'd worry about if this answered real customers. Don't fix it for me. Ask me how I'd handle each one.

### p4-i. Integration pack: connect two tools clients ask for

*laptop · 4 hours · roles: Explainer, Checker*

**Goal:** Learn to connect a new tool from its API documentation, and build two workflows with tools that appear often in job posts.

**Learn this first**

- Read a tool's API doc in six points: authentication, base URL, endpoints, rate limits, pagination, webhooks.
- No n8n node? Use the HTTP Request node with a saved credential.
- Outside webhooks can't reach localhost: forward test events or poll. Make every workflow safe to run twice.

**Resources**

- [Airtable Web API](https://airtable.com/developers/web/api/introduction)
- [Calendly developer docs](https://developer.calendly.com/docs/getting-started/overview)
- [Stripe docs: webhooks](https://docs.stripe.com/webhooks)
- [WordPress REST API handbook](https://developer.wordpress.org/rest-api/)

**Do this**

1. Look at your market research (p3-7) and choose the **two** tools that appear most. Write why in `integration-notes.md`.
2. For each, read its API docs with the six-point list above and write the answers in `integration-notes.md`.
3. Build one workflow per tool that does something real. For example: a booking or form event creates a record in Airtable or a CRM and notifies you, or a test-mode payment event adds a row to a sheet. Use the built-in node if there is one, otherwise the HTTP Request node.
4. Add error handling (p2-6) and make each workflow safe to run twice.
5. Export both with the CLI (p2-8) and commit.

**Done when:** Two workflows with real tools run, you wrote the six-point notes for both, and you can explain how you'd connect a tool that n8n has no node for.

**Full lesson:** `lessons/p4-i.md` (also on the dashboard). **Must know to finish this step:**

*What clients actually ask for*

- Name five tools that often appear in job posts
- Say the rule for practising with payment or booking tools

*How to read an API doc quickly: the six points*

- Recite the six points of an API doc
- Say what to do when n8n has no node for a tool

*Webhooks from outside tools and localhost*

- Say why a localhost n8n can't receive outside webhooks and two ways to practise
- Say why webhook senders should be verified

*Make it safe to run twice*

- Explain why a webhook may arrive twice and one way to dedupe
- Say what happens when the tool's API is down

*Build and ship the two workflows*

- Complete the six-point notes and build two workflows
- Export and commit the workflows without secrets


**Prompt: Check me (Checker)**

> Role: Checker. Here are my six-point notes for two tools and a description of my two workflows: [paste, no keys]. Find the weak spots: authentication I misunderstood, rate limits or pagination I ignored, a workflow that would create duplicates, and what happens when the tool's API is down. Ask me how I'd connect a tool that has no n8n node. Don't fix it for me.

### p4-4. Write a short, honest case study for each project [FAST LANE]

*phone · 45 min · roles: Clerk, Checker*

**Goal:** Turn each finished project into 150 words a client can read in a minute. On the fast lane you only need Project B done, and you add the others later.

**Learn this first**

- Five parts: problem, what I built, tools, result, what I'd do next. About 150 words.
- Be specific, label prototypes and sample data, and never invent numbers.

**Do this**

1. Write one for every project you have finished, in a file `case-studies.md`. Keep each to 150 words. The classifier from p3-2 and Project B together are enough for a first profile if you haven't built A or C yet.
2. Ask for a critique, then cut 20% of the words from each.

**Done when:** Three case studies, each under 150 words, with no vague claims and honest labels.

**Full lesson:** `lessons/p4-4.md` (also on the dashboard). **Must know to finish this step:**

*The five parts of a case study*

- List the five parts of a case study
- Say how long a case study should be

*Specific beats impressive, and never invent*

- Rewrite a vague claim into a specific one
- Say what to do when you have no real result number yet

*Doing p4-4*

- Complete the writing, critique and cut steps in order


**Prompt: Check me (Clerk and Checker)**

> Role: Clerk and Checker. Here are my three case studies: [paste]. Don't rewrite them. Mark every vague phrase, every overclaim, and anything that a client could not check. Then tell me which one is strongest and why.

### p4-b. Bonus: record a 2-minute demo of each project [BONUS]

*phone or laptop · 60 min · roles: Listener*

**Goal:** Show the work running, with your voice explaining it.

**Learn this first**

- A 2-minute demo: the problem in one sentence, the result running, one thing you'd improve.
- Check the screen for keys, emails and real data before sharing.

**Do this**

1. Record each demo with any screen recorder (Windows Game Bar `Win+G` works) and check the screen for secrets before you share.

**Done when:** Three videos under 2 minutes with nothing sensitive on the screen.

**Full lesson:** `lessons/p4-b.md` (also on the dashboard). **Must know to finish this step:**

*Why a demo video*

- Name the three parts of a demo

*Recording and removing secrets*

- Start a recording with Game Bar
- List what to check for before sharing a video


**Prompt: Check me (Listener)**

> Role: Listener. Here is the transcript of my demo voice-over: [paste]. Tell me what is unclear to a non-technical person and what I should cut.

### p4-m. Bonus: translate a workflow to Make and Zapier words [BONUS]

*laptop · 90 min · roles: Explainer, Checker*

**Goal:** Understand that clients on Make.com or Zapier need the same skills under different names.

**Learn this first**

- Make and Zapier use different names for the same ideas: scenario/module/bundle and Zap/step.
- Make charges per credit and Zapier per task; n8n Cloud charges per execution.

**Resources**

- [Make Academy (free lessons)](https://academy.make.com/)
- [Zapier Help Center](https://help.zapier.com/hc/en-us)

**Do this**

1. Rebuild your validated signup workflow (p2-2) in Make.com on the free plan. You've used Make a little, so use that.
2. Write a three-column table in `tool-vocabulary.md` mapping n8n, Make and Zapier words for: trigger, step, data item, branch, loop, error handling, credentials.

**Done when:** The Make version works, and your table has no empty cells.

**Full lesson:** `lessons/p4-m.md` (also on the dashboard). **Must know to finish this step:**

*Same ideas, different names*

- Map trigger, step, data item, branch and loop between n8n, Make and Zapier
- Map error handling and credentials between the three tools

*Pricing differs*

- Say how Make and Zapier charge and how that differs from n8n
- Say what you offer a client who is on Make or Zapier

*Rebuild a workflow in Make*

- Rebuild the signup workflow in Make
- Write the seven-row vocabulary table


**Prompt: Check me (Checker)**

> Role: Checker. Here is my vocabulary table and a description of the Make version: [paste]. Find wrong mappings, and ask me what would be hard to move from one tool to another and why.

### p4-py. Bonus: Pydantic, uv, ruff and FastAPI [BONUS]

*laptop · 120 min · roles: Explainer, Checker*

**Goal:** Learn four modern Python tools that make client scripts safer and let n8n call your own code.

**Learn this first**

- Pydantic validates data shape, uv manages projects, ruff lints and formats, FastAPI turns a function into an endpoint.
- From inside n8n's container use host.docker.internal, not localhost, to reach your PC.

**Resources**

- [Pydantic docs](https://pydantic.dev/docs/)
- [uv docs](https://docs.astral.sh/uv/)
- [ruff docs](https://docs.astral.sh/ruff/)
- [FastAPI docs](https://fastapi.tiangolo.com/)

**Do this**

1. Define a Pydantic model for your classifier's output (a category from an allowed list, urgency, name). Parse five model answers, including a broken one, and read the errors.
2. Install uv and make a fresh project with it. Run ruff on your Project B script and read what it says.
3. Write a FastAPI endpoint `POST /clean` that takes JSON with messy names and returns them trimmed and capitalised. Run it locally. Call it from n8n with an HTTP Request node at `http://host.docker.internal:8000/clean` and explain why `localhost` wouldn't work.

**Done when:** The Pydantic model rejects the broken answer, ruff ran on your script, and n8n successfully called your FastAPI endpoint.

**Full lesson:** `lessons/p4-py.md` (also on the dashboard). **Must know to finish this step:**

*Pydantic: check data before you trust it*

- Define a Pydantic model with an allowed-values field and a range
- Validate JSON and read a ValidationError
- Say what Pydantic can't catch
- Use `pip install pydantic`: installs Pydantic

*uv and ruff*

- Create a uv project, add a package and run a script
- Run ruff to check and format
- Use `uv init`: creates a new uv project
- Use `uv add requests`: adds a dependency to the project
- Use `uv run main.py`: runs a script inside the project's environment
- Use `ruff check`: lists style and bug problems in your code
- Use `ruff format`: reformats code to a standard style

*FastAPI: make your own endpoint*

- Write a FastAPI POST endpoint that takes JSON and returns JSON
- Run it and open the /docs page
- Use `pip install "fastapi[standard]"`: installs FastAPI with its server
- Use `fastapi dev`: runs the app on port 8000 with auto-reload

*Calling it from n8n: host.docker.internal*

- Explain why localhost doesn't work from n8n and what to use instead
- Say what the endpoint exposes if the port were public and what to add

*Putting the four tools to work*

- Complete the four practice tasks


**Prompt: Check me (Checker)**

> Role: Checker. Here is my Pydantic model, my ruff output and my FastAPI endpoint: [paste]. Find gaps: what bad input would still get through, what the endpoint exposes if the port were public, and why I need authentication on it for a client. Don't rewrite it.

### p4-v. Bonus: know what voice and WhatsApp agents need [BONUS]

*phone · 60 min · roles: Explainer, Mapmaker*

**Goal:** Answer a client honestly about phone and WhatsApp agents without building one.

**Learn this first**

- WhatsApp needs a verified business, opt-in, approved templates and per-message fees. Voice needs a provider, and has delay and per-minute cost.
- Be honest: you've built text assistants and workflows.

**Resources**

- [WhatsApp Business Platform docs](https://developers.facebook.com/documentation/business-messaging/whatsapp/overview)
- [Twilio Voice docs](https://www.twilio.com/docs/voice)

**Do this**

1. Write a one-page `voice-whatsapp-notes.md`: what each needs, rough costs from the live pricing pages today, the compliance points, and what you would and wouldn't promise.
2. Write a 5-sentence answer to "can you build me an AI receptionist that answers calls?".

**Done when:** Your notes have today's real prices and the answer is honest about what you have and haven't built.

**Full lesson:** `lessons/p4-v.md` (also on the dashboard). **Must know to finish this step:**

*What clients mean and why it's more than a workflow*

- Say why voice and WhatsApp are bigger than a workflow

*WhatsApp agents*

- List what a WhatsApp bot needs before it can message customers
- Explain what a template is and when the 24-hour window applies
- Say how WhatsApp pricing works

*Voice agents*

- Name the three stages of a voice agent
- Say what causes delay and what costs money in a voice agent
- Say what recording calls requires

*Your honest answer*

- Write a five-sentence honest answer about an AI receptionist
- Say what you would refuse to promise


**Prompt: Check me (Socratic)**

> Role: Socratic questioner. Here are my notes and my 5-sentence answer: [paste]. Ask me one question at a time: why a WhatsApp bot can't just message everyone, what causes delay in a voice agent, who needs to consent to call recording, and what I'd refuse to promise. Don't give me the answers.

### p4-r. Redo without help: explain Project A to a client [REDO WITHOUT HELP]

*phone or laptop · 20 min · roles: Listener*

**Goal:** Explain what you built in plain language, out loud, in two minutes.

**Learn this first**

- Explain Project A out loud in two minutes, with no unexplained jargon.

**Do this**

1. Dictate a 2-minute explanation of Project A to a client who runs a small business and has never used n8n. Don't use the words item, node, API or webhook without explaining them.
2. Paste the transcript and ask for a grade.

**Done when:** Claude agrees the explanation is clear, correct and free of unexplained jargon.

**Full lesson:** `lessons/p4-r.md` (also on the dashboard). **Must know to finish this step:**

*Explaining it out loud*

- Explain Project A in plain words in two minutes with no unexplained jargon

*What the grader looks for*

- Say the three things the Listener checks


**Prompt: Check me (Listener)**

> Role: Listener. I explained Project A to a small-business owner. Here is the transcript: [paste]. Compare it with what the project really does. Tell me what I got wrong, what I skipped and which words a non-technical person wouldn't know.

### p4-g. Phase 4 exam: face a sceptical client [EXAM]

*phone or laptop · 30 min · roles: Examiner, Diagnostician, Clerk*

**Goal:** Defend your portfolio against hard questions, then fix the weak spots.

**Learn this first**

- The exam plays a sceptical client: what breaks, how you know it's right, cost, ownership, data, why not Zapier.
- An honest "I haven't tested that yet, but I would..." beats a bluff.

**Do this**

1. Run the exam prompt. Answer honestly. "I haven't tested that yet, but I would..." is a good answer. Bluffing is not.
2. Make the flashcards and review them over the next two days.

**Done when:** At least 80% on the exam and three case studies you can link on Upwork and show to your friends.

**Full lesson:** `lessons/p4-g.md` (also on the dashboard). **Must know to finish this step:**

*How this exam works*

- List the six questions a sceptical client asks
- Say what makes an answer good in this exam

*Preparing your answers*

- Prepare a short honest answer for each of the six questions

*After the exam*

- Say the pass mark and the follow-up steps


**Prompt: Exam me**

> Role: Examiner playing a sceptical client who just read my three case studies [paste them]. Ask me one question at a time, getting tougher: what happens when it breaks, how do I know it's right, what does it cost to run, who owns the code, what about customer data, why should I pay you instead of using Zapier. Score my honesty, clarity and technical accuracy out of 10.

**Prompt: Diagnose and flashcards**

> Role: Diagnostician, then Clerk. Look at my mistakes in this exam and in C:\dev\ai-automation-portfolio\mistakes.md. What one root misunderstanding is behind them? Then make 8 flashcards and save them in C:\dev\ai-automation-portfolio\flashcards\ as one tab-separated text file for this phase (question, tab, answer, one card per line) so I can import them into Anki.

---

## Phase 5: Selling (about 14 h)

*Discovery calls, proposals and pricing*

Building is half the job. This phase teaches you to find the right jobs, write short proposals that get answered, run a first call, and price a small project. You'll practise on me as a client first, so your first real call isn't your first call. Start the proposal step (p5-4) as soon as Project B is finished. You don't need to wait for the rest of Phase 4. Only you can send proposals and edit your Upwork account.

**Start this phase with Claude:** Role: Interviewer. Before Phase 5, ask me 5 questions, one at a time, about how I feel about selling, what went wrong in the door-to-door solar sales, and what I'm afraid will happen on a call. Use my answers to adjust the practice in this phase.

### p5-1. Learn what a discovery call is and how to run one [FAST LANE]

*phone · 45 min · roles: Explainer, Socratic*

**Goal:** Be able to run a 15-minute call where you ask good questions and the client does most of the talking.

**Learn this first**

- A discovery call is to understand the problem, not to pitch. Let the client do most of the talking.
- Seven parts: agenda, problem, impact, current process, constraints, success, next step.
- Never bluff, and don't quote a price on the call.

**Do this**

1. Write your own list of 8 discovery questions in `discovery-questions.md`, in your own words, from the structure above.
2. Write a 3-sentence opening about who you are and what you do. Say it aloud twice.
3. Run the Socratic prompt.

**Done when:** You can explain the 7 parts of a discovery call and why you don't pitch or quote first.

**Full lesson:** `lessons/p5-1.md` (also on the dashboard). **Must know to finish this step:**

*What a discovery call is*

- Say what a discovery call is for and what it isn't
- Explain how it differs from door-to-door sales

*The seven parts of a call*

- Recite the seven parts of a discovery call in order
- Write eight discovery questions in your own words

*Listening and not bluffing*

- Name two ways to keep a client talking
- Say what to say when you haven't done exactly what they ask
- Say why you don't quote a price on the call


**Prompt: Check me (Socratic)**

> Role: Socratic questioner. Ask me one question at a time until I find my gaps about discovery calls: what is the goal of the call, why not quote a price first, what to do when I don't know the answer, how to handle a vague client, and how my solar sales experience is different from this. Don't give me the answers.

### p5-2. Finish your Upwork profile [FAST LANE]

*laptop · 60 min · roles: Checker*

**Goal:** A profile that looks specific and honest, with the projects you have finished so far on it.

**Learn this first**

- Clients skim headline, first two lines, portfolio, skills and rate. Make them specific.
- Honesty rule: no fake reviews, invented clients or skills you can't show.

**Resources**

- [Upwork: how to get the Rising Talent badge](https://www.upwork.com/resources/how-to-get-rising-talent-badge)

**Do this**

1. Take your headline and overview from p0-6. Update them with what you learned in market research and what you have built.
2. Add the portfolio items you have finished (one or two is fine at the start, and three once Phase 4 is done), each with the 150-word case study, a screenshot and, if you made one, the video. Add more as you finish them. Remove anything with real personal data.
3. Read Upwork's Rising Talent page and note which criteria you meet and which are missing.
4. Add skills, choose your hourly rate (the goal is at least 20 euros an hour) and check that every claim is true.
5. Ask Claude to review it as if it were a client. Only you edit the live profile.

**Done when:** Your profile has a specific headline, a clear overview, at least one honest portfolio item and a reasonable rate, and the reviewer finds no overclaims.

**Full lesson:** `lessons/p5-2.md` (also on the dashboard). **Must know to finish this step:**

*What clients see in ten seconds*

- List what a client looks at first on a profile
- Say what makes a headline strong

*The honesty rule*

- State the honesty rule for a profile

*Rate, packages and the Rising Talent badge*

- Say the rate goal and what fixed-price offers are for
- Say what the Rising Talent badge does and where to check its criteria

*Doing p5-2*

- Run the five steps and keep the live edits to yourself


**Prompt: Check me (Checker)**

> Role: Checker playing a client searching for help. Here is my headline, overview, skills and three portfolio descriptions: [paste]. Tell me what a busy client would understand in 10 seconds, what is vague, what is an overclaim, and whether I look like someone to hire for the jobs in my market research. Don't rewrite it.

### p5-ai. Write your AI-use and client-data policy [FAST LANE]

*phone or laptop · 45 min · roles: Explainer, Socratic*

**Goal:** Know exactly which AI tools see which client data, have the client's consent, and have it written down before any job starts.

**Learn this first**

- Using AI is fine; using it secretly or with the wrong data is not. List which tool sees which data.
- Client work needs a paid API account on the client's billing, never your free key.
- Get written consent and put a sentence in every scope of work.

**Resources**

- [Gemini API: Additional Terms of Service](https://ai.google.dev/gemini-api/terms)
- [Upwork: legal terms (read the sections on AI and data)](https://www.upwork.com/legal)

**Do this**

1. Open your Upwork settings and find the **AI Preferences** or similar privacy settings. Read them and decide your own choices. Only you can change them.
2. Write `ai-use-policy.md`, one page: the tools you use; for each, what data it can see; what you never send; how you mask personal data; which provider terms you checked; and one consent sentence for proposals and scopes of work, for example "I may use AI tools to help build and test this. I'll tell you which ones and what data they can see, and I won't send your customers' data to a tool without your written OK."
3. Add the consent sentence to your scope-of-work template when you build it in p6-tpl.

**Done when:** Your one-page policy exists, you know your Upwork AI settings, and you can answer "do you use AI on my data?" honestly and specifically.

**Full lesson:** `lessons/p5-ai.md` (also on the dashboard). **Must know to finish this step:**

*Why clients care about your AI use*

- Say what is acceptable about AI use and what is the problem

*What data goes where*

- Explain why client work can't run on a free API key
- Say who decides whether a provider trains on data
- Say what to check in your Upwork settings

*Consent and practical rules*

- Write the consent sentence for a scope of work
- List the practical data rules

*Writing ai-use-policy.md*

- List the six parts of the AI-use policy


**Prompt: Check me (Socratic)**

> Role: Socratic questioner. Here is my AI-use policy: [paste]. Ask me one question at a time to find gaps: what if a client forbids AI, what exactly does my coding assistant see, what happens to a customer list I put in a prompt, why can't client work run on my free API key, and what would I say to a client who wants me to test with their real customer data. Don't give me the answers. Remind me that you aren't a lawyer.

### p5-3. Learn to read a job post [FAST LANE]

*phone · 45 min · roles: Explainer, Checker*

**Goal:** Decide quickly whether a job is worth a proposal, and what the client really wants.

**Learn this first**

- Read for the problem, the deliverable and the signals. Check the client's payment and history.
- Connects cost money, so apply only to jobs that score 4 or 5 out of 5.
- Learn the scam red flags: free tests, leaving the platform, fees, wallets, ID requests.

**Resources**

- [Upwork: how to identify and report scams](https://www.upwork.com/resources/upwork-scams)

**Do this**

1. Take 5 job posts from your market research. For each write: the problem, the deliverable, the signals, red flags, and a fit score from 1 to 5.
2. Run the Checker prompt with your scores.

**Done when:** Claude agrees with at least 4 of your 5 assessments, and you can name the red flags without looking.

**Full lesson:** `lessons/p5-3.md` (also on the dashboard). **Must know to finish this step:**

*Reading a post: problem, deliverable, signals*

- Name the three things to read for in a job post

*Checking the client*

- List what to check on a client's profile

*Connects and cost*

- Say what a Connect costs and how many you get free
- Say why you apply only to strong matches

*Red flags and scams*

- Recite at least six red flags
- Say the four never-rules

*Scoring and the exercise*

- Say the apply threshold and what fit means


**Prompt: Check me (Checker)**

> Role: Checker. Here are 5 job posts with my notes and scores: [paste the posts with client names removed]. Tell me where I misread the client's real need or missed a red flag, and which one or two I should apply to. Don't write the proposals for me.

### p5-4. Write three proposals [FAST LANE]

*laptop · 90 min · roles: Checker, Clerk*

**Goal:** Write short proposals that show you understood the problem. Only you send them.

**Learn this first**

- Open with their problem, not "I'm an expert". About 120 words in five parts.
- Promise only what you can deliver, and never send the same text twice.

**Do this**

1. Pick your three best jobs from p5-3. Write each proposal in a file `proposals.md`.
2. Run the Checker prompt on each, then fix every comment yourself.
3. When Claude agrees each is ready, send them yourself on Upwork. Note the Connect cost.

**Done when:** Three proposals checked and sent, and you can explain why each one starts as it does.

**Full lesson:** `lessons/p5-4.md` (also on the dashboard). **Must know to finish this step:**

*Open with their problem*

- Explain why the first two lines matter
- Rewrite a generic opening into one about the client's problem

*The five-part structure (about 120 words)*

- Recite the five parts of a proposal
- Write a proposal of about 120 words from the structure

*Promises you can keep*

- Say what makes a promise safe to make
- Say who sends proposals

*The three-proposal exercise*

- Run the write, check, fix, send routine


**Prompt: Check me (Checker)**

> Role: Checker playing the client who posted this job: [paste job post]. Here is my proposal: [paste]. Tell me honestly what you noticed first, whether you'd reply, what felt generic, and what you'd want to ask. Don't rewrite it. Mark anything I couldn't deliver.

### p5-5. Learn how to price and scope a small project [FAST LANE]

*phone · 45 min · roles: Explainer, Examiner*

**Goal:** Quote a fixed price for a small automation job with a clear scope.

**Learn this first**

- Quote = tasks, hours, +50% buffer, times your rate, grossed up for the Upwork fee.
- Write what's included, what isn't, rounds of changes and milestones. Anything else is a new quote.

**Resources**

- [Upwork Help Center: fees and pricing](https://support.upwork.com/)

**Do this**

1. Take Project B and pretend a client asked for it. List the tasks, estimate hours, add the buffer and write a 5-line scope with 2 exclusions.
2. Run the Examiner prompt.

**Done when:** You can produce a quote with tasks, hours, buffer, price after fees and scope exclusions, and defend each part.

**Full lesson:** `lessons/p5-5.md` (also on the dashboard). **Must know to finish this step:**

*Hourly versus fixed price*

- Say which pricing type suits unclear work and which suits small defined work
- Explain escrow and the hourly protection rule

*The estimate formula*

- Calculate a quote from tasks, hours, buffer and rate
- Use `hours × 1.5 × rate`: the quote before platform fees

*The Upwork fee*

- Say what the Upwork fee is like and where you see it
- Gross up a price so the fee doesn't eat your pay

*Scope, exclusions and milestones*

- List what a scope contains
- Say why milestones help and when you start work on one

*Tax, invoicing and the exercise*

- Say who to ask about tax and VAT
- Answer "what if the client wants a change after you finish?"


**Prompt: Quiz me (Examiner)**

> Role: Examiner. Give me 3 small client briefs, one at a time. For each, ask me to list tasks, hours, price and exclusions, and challenge my reasoning, for example "what if the client wants a change after you finish". Score me out of 10.

### p5-pkg. Design three fixed-price offers [FAST LANE]

*phone or laptop · 60 min · roles: Mapmaker, Checker*

**Goal:** Turn what you can already deliver into three clear packages, each with a scope, a delivery time and a price.

**Learn this first**

- A package is a defined result at a known price: scope, exclusions, delivery time, assumptions.
- Start with three narrow offers you can prove with Projects A, B and C.

**Do this**

1. Write three packages in `offers.md`: name, who it is for, what's included, what isn't, delivery time, price, and what you need from the client.
2. Check each against your real skills. If you haven't built it yet, write which project (A, B or C) will let you prove it.
3. Ask Claude to review them as a small-business owner.

**Done when:** Three packages with honest scope, and a price that follows your own pricing method. Each package is backed by a project you've built or will build.

**Full lesson:** `lessons/p5-pkg.md` (also on the dashboard). **Must know to finish this step:**

*What a package is*

- List what a package states

*Three good first packages*

- Name the three starter packages and the project behind each

*Pricing, assumptions and exclusions*

- Price a package with the p5-5 method
- List what each package entry in offers.md contains


**Prompt: Check me (Checker)**

> Role: Checker playing a small-business owner. Here are my three packages: [paste]. Tell me which one I'd buy and why, what's unclear, what I'd expect that isn't listed, and where the price feels wrong. Don't rewrite them. Ask me which package I can actually deliver today.

### p5-6. Practice three mock discovery calls [FAST LANE]

*phone or laptop · 90 min · roles: Sparring partner, Listener*

**Goal:** Run three practice calls with different clients so the first real one isn't your first.

**Learn this first**

- Practise three calls with three personas, answering within 30 seconds, aloud.
- Each call is scored and gives you one thing to fix.

**Do this**

1. Run the sparring prompt for each persona, one per sitting, and answer within 30 seconds.
2. After each call, ask for the scorecard, then write down the one thing to fix.
3. Put your mistakes in `C:\dev\ai-automation-portfolio\mistakes.md`.

**Done when:** Three calls done, each scored, with at least one improvement visible between call 1 and call 3.

**Full lesson:** `lessons/p5-6.md` (also on the dashboard). **Must know to finish this step:**

*Why practise calls*

- Say the two practice rules for the calls

*The three personas*

- Name the three personas and what each practises

*Scoring and improving*

- List the five scoring criteria
- Say what you do after each call


**Prompt: Start the call (Sparring)**

> Role: Sparring partner. Play a [café owner / e-commerce manager / technical founder] who posted this job: [paste job description]. Stay in character. I am the freelancer. Ask one thing at a time, push back when I'm vague, and don't make it easy. After 12 exchanges, stop and give me a scorecard out of 10 for: questions I asked, listening, honesty about what I can do, clarity, and whether I set a next step. Then tell me the one thing to fix.

### p5-7. Reach out to your first clients directly [FAST LANE]

*phone or laptop · 2 hours · roles: Mapmaker, Sparring partner*

**Goal:** Start real conversations with small businesses, using your case studies as proof, so you don't rely only on Upwork's few free Connects.

**Learn this first**

- Start warm, offer a problem you can solve, and send a short message with one small ask.
- Free work has no boundaries. Be wary of cold emails because EU rules are strict.

**Do this**

1. Write a list of 10 businesses or people: 5 warm, 5 local small businesses you can walk into or phone. For each, note a likely problem.
2. Write three versions of the message (warm, local business, LinkedIn) and run them through the check prompt.
3. Reach out to 5 of them yourself. Track in a sheet: who, when, reaction, next step.
4. Book at least 2 conversations. After each, write down what you learned.
5. If someone says yes, write the half-page scope and offer a small pilot.

**Done when:** Ten contacts listed, five reached, at least two conversations held and noted, and you can say what you would offer each one.

**Full lesson:** `lessons/p5-7.md` (also on the dashboard). **Must know to finish this step:**

*Why reach out directly*

- Say why direct outreach complements Upwork and what you need first

*Who to contact and what to offer*

- Name the order to approach contacts: warm first
- Say what you can offer a clinic and what is off limits

*The message*

- Recite the four parts of an outreach message
- Say which channels are safer than cold email

*The first paid pilot*

- List what goes in the half-page pilot scope
- Say why you don't work free


**Prompt: Start the call (Sparring)**

> Role: Mapmaker, then Sparring partner. First check my list of 10 contacts and my messages: [paste]. Then play a busy small-business owner I've just walked up to or phoned, who is polite but sceptical and has about 90 seconds. I'm the freelancer. Push back, don't make it easy, and after 8 exchanges score me out of 10 on opening, listening, honesty and asking for a next step.

### p5-r. Redo without help: a call with a new client [REDO WITHOUT HELP]

*phone or laptop · 30 min · roles: Sparring partner*

**Goal:** Show that you improved by repeating a call a week later with a different client.

**Learn this first**

- A week later, run a call with a new persona and no notes. Your score should be higher.

**Do this**

1. A week after p5-6, run a new sparring call with a persona you haven't met: the owner of a physiotherapy clinic who wants fewer no-shows and thinks "AI" sounds risky with patient data.
2. Use the same 30-second timer and no notes.

**Done when:** Your score is higher than in call 1, and you handled the data-privacy concern honestly.

**Full lesson:** `lessons/p5-r.md` (also on the dashboard). **Must know to finish this step:**

*The redo call*

- Describe the persona and the rules of the redo call

*Handling the data-privacy concern*

- Give an honest answer to a clinic owner worried about patient data


**Prompt: Start the call (Sparring)**

> Role: Sparring partner. Play the owner of a small physiotherapy clinic who wants fewer no-shows, is nervous about AI and patient data, and has a limited budget. I'm the freelancer. Stay in character, push back, and after 12 exchanges give me a scorecard out of 10 and compare it with my previous scores in C:\dev\ai-automation-portfolio\mistakes.md.

### p5-g. Phase 5 exam [EXAM]

*phone or laptop · 45 min · roles: Examiner, Diagnostician, Clerk*

**Goal:** Prove you can sell honestly, then fix the weak spots.

**Learn this first**

- The exam combines a proposal review, a short discovery call and a pricing question.
- You need 80% and your proposals sent.

**Do this**

1. Run the exam prompt. Use your real proposals.
2. Make the flashcards and review them over the next two days.

**Done when:** At least 80% on the exam, and you can run a 15-minute call without freezing. Your proposals are sent.

**Full lesson:** `lessons/p5-g.md` (also on the dashboard). **Must know to finish this step:**

*What the exam combines*

- List the three parts of the Phase 5 exam

*How to prepare*

- Say the pass mark and the preparation points

*After the exam*

- Say what the diagnose step produces


**Prompt: Exam me**

> Role: Examiner. First review my best proposal [paste] against the job post [paste]. Then run a 5-minute discovery call as a client with a vague brief. Then give me a pricing question for a small automation job. Score me out of 10 on each of the three, and tell me my level.

**Prompt: Diagnose and flashcards**

> Role: Diagnostician, then Clerk. Look at my mistakes in this exam and in C:\dev\ai-automation-portfolio\mistakes.md. What one root misunderstanding is behind them? Then make 8 flashcards and save them in C:\dev\ai-automation-portfolio\flashcards\ as one tab-separated text file for this phase (question, tab, answer, one card per line) so I can import them into Anki.

---

## Phase 6: Deliver, repeat, bring the friends in (about 11 h)

*Ongoing, starts with your first job*

This phase has no exam. It's the real thing. Each step is a habit you repeat with every client, and each one feeds the shared business: finished jobs become case studies, and the lessons become the way you and your friends work together.

**Start this phase with Claude:** Role: Mapmaker. When my first job is accepted, ask me 5 questions about the client, the scope and the deadline, then make a plan for delivery with milestones and update messages.

### p6-tpl. Build your templates pack

*laptop · 90 min · roles: Explainer, Checker*

**Goal:** Have five reusable documents so every job starts and ends the same professional way.

**Learn this first**

- Five templates: kickoff questions, scope of work, change request, handover, update message.
- Adapt them for every client; never paste them unchanged.

**Do this**

1. Create a folder `C:\dev\automation-portfolio\templates` and write all five as short Markdown files from the structures above: `kickoff-questions.md`, `scope-of-work.md`, `change-request.md`, `handover.md`, `update-message.md`.
2. Fill in the scope of work for Project B as if a client had hired you, with exclusions and a price. Then fill in a handover for it.
3. Ask Claude to review them as a client who has been burned before.

**Done when:** Five templates exist, a worked scope and handover exist for Project B, and the reviewer finds nothing a client could read two ways.

**Full lesson:** `lessons/p6-tpl.md` (also on the dashboard). **Must know to finish this step:**

*Why templates*

- Name the five templates and their file names
- Say how templates are used with a client

*Kickoff questions and scope of work*

- List the six kickoff questions
- List the parts of a scope of work

*Change request, handover and update message*

- Say what a change request contains and why it exists
- List what the handover includes and what it must never include
- Write the four lines of an update message

*The worked example and review*

- Complete a worked scope and handover for Project B


**Prompt: Check me (Checker)**

> Role: Checker playing a client who was burned by a freelancer before. Here are my five templates and my worked scope and handover for Project B: [paste]. Find anything vague, anything that could be read two ways, and what I forgot to ask. Don't rewrite them. Ask me what I would do if the client changes their mind in the middle of a milestone.

### p6-1. Deliver your first job well

*phone or laptop · ongoing · roles: Explainer, Checker*

**Goal:** Finish the first job on time, with clear communication and a good review.

**Learn this first**

- Confirm scope in writing, update every 2 to 3 days, say early if you're late.
- Test with the client's data, hand over with a video, and ask for a review only after acceptance.

**Do this**

1. Make a delivery checklist in `delivery-checklist.md` from the points above. Use your templates from p6-tpl for the kickoff, update messages and handover.
2. Send your first update at the time you promised.

**Done when:** The job is accepted and paid, and the client has left a review.

**Full lesson:** `lessons/p6-1.md` (also on the dashboard). **Must know to finish this step:**

*Most trouble is communication*

- List what you confirm before starting
- Say how often to send updates

*Delivering and the review*

- List the three pre-delivery steps
- Say when and how to ask for a review

*The delivery checklist*

- Build a delivery checklist from these points


**Prompt: Check me (Checker)**

> Role: Checker. Here is my plan, scope message and delivery checklist for my job: [paste]. Find what could go wrong, what the client might misunderstand, and what I should clarify now. Don't rewrite it.

### p6-2. Turn each finished job into a case study

*phone or laptop · 30 min · roles: Clerk*

**Goal:** Reuse every job as portfolio material, safely.

**Learn this first**

- Ask permission, remove anything that identifies the client, then use the five-part case study.

**Do this**

1. Write the case study within a week of the job ending, while you remember the details.

**Done when:** A new case study is on your profile, with the client's agreement.

**Full lesson:** `lessons/p6-2.md` (also on the dashboard). **Must know to finish this step:**

*Reusing a job safely*

- Say what to do before describing a client's project
- List what to remove from an anonymised case study
- Say when to write it

*Checking the draft*

- Say what the Clerk and Checker mark in the draft


**Prompt: Check me (Clerk and Checker)**

> Role: Clerk and Checker. Here are my notes about a finished job: [paste, anonymised]. Turn my notes into the five-part structure without adding anything I didn't write, then mark anything that might identify the client or that I can't prove.

### p6-3. Sort out business, tax and data basics

*laptop · 2 hours · roles: Explainer, Checker*

**Goal:** Know what you need so that earning money doesn't create problems later.

**Learn this first**

- Ask an accountant about tax and VAT. Claude isn't a tax adviser.
- You are usually the GDPR processor, so keep personal data out of prompts.
- n8n's licence allows building for clients, not hosting n8n as a service for them.

**Resources**

- [n8n Sustainable Use License (the licence text on GitHub)](https://github.com/n8n-io/n8n/blob/master/LICENSE.md)
- [EU AI Act, Article 50 transparency rules (a practical guide)](https://artificialintelligenceact.eu/transparency-rules-article-50/)

**Do this**

1. Write a list of questions for your accountant or tax authority and book a short call. Cover at least: does freelancing on Upwork fit your current business registration; how to invoice Upwork and clients; VAT (BTW) on services to business clients in other EU countries (reverse charge) and outside the EU; if you are in the Netherlands, whether the small-business VAT scheme (KOR) applies to you; whether you must file EU sales listings; how Upwork's service fee is booked; how income tax and deductions work for you; and which records to keep.
2. Read the n8n licence page and write 3 sentences on what it means for how you work with clients.
3. Write a one-page `client-data-rules.md` for yourself: what data you accept, what you refuse, how you handle keys.

**Done when:** Your questions are sent or booked, and you can explain the licence and your data rules in your own words.

**Full lesson:** `lessons/p6-3.md` (also on the dashboard). **Must know to finish this step:**

*Business and tax: questions, not answers*

- Say who answers tax questions and what Claude can do
- List at least six questions for the accountant

*GDPR: you are usually a processor*

- Say who is controller and who is processor
- List the practical data-handling rules

*The n8n licence*

- Say what the licence allows and what it doesn't
- Say the key question that decides it

*AI Act transparency and your credentials*

- State what Article 50 asks of a chatbot and from when
- Say whose accounts and keys a client automation uses

*Doing p6-3*

- Complete the three tasks


**Prompt: Check me (Socratic)**

> Role: Socratic questioner. Here are my questions for the accountant, my notes on the n8n licence and my data rules: [paste]. Ask me one question at a time to find gaps, such as what I do when a client sends customer lists, whose API key goes in the workflow and whether I may host n8n for a client. Remind me that you aren't a lawyer or tax adviser.

### p6-4. Learn where a client's n8n will run

*phone or laptop · 60 min · roles: Explainer, Socratic*

**Goal:** Answer "where will this run, and who looks after it?" before a client asks.

**Learn this first**

- Options: n8n Cloud, a client-owned VPS, your own shared host (licence risk), or their existing tool.
- Watch spending, execution clean-up and uptime. Back up the encryption key.
- Docker Compose rebuilds a server with one command. Small clients don't need Kubernetes.

**Resources**

- [n8n pricing (check the Cloud plans)](https://n8n.io/pricing/)
- [n8n docs: Hosting](https://docs.n8n.io/deploy/host-n8n/)
- [Docker docs: Docker Compose overview](https://docs.docker.com/compose/)

**Do this**

1. Write a one-page `hosting-options.md` with the four options, their rough monthly cost (check the live prices today), and who does what for each.
2. Write a 4-sentence answer you'd give a client who asks "where will it run and what if it breaks?".
3. Write down the three monitoring checks you'd set up for a client (spending limit, clean-up, uptime ping) and where each one is configured.
4. Write 3 sentences explaining Docker Compose and Kubernetes to a client, and why their project probably doesn't need Kubernetes.

**Done when:** Your page has real prices and your answer is honest about backups, updates and who is responsible.

**Full lesson:** `lessons/p6-4.md` (also on the dashboard). **Must know to finish this step:**

*Your laptop versus a client's automation*

- Say why a laptop can't run a client's automation
- Say what outside webhooks need

*The four options and who does what*

- Name the four hosting options
- Say which option the licence rules out and why
- Give the rough monthly cost of Cloud and of a small VPS

*Docker Compose and Kubernetes*

- Explain Docker Compose in a sentence
- Explain Kubernetes in a sentence and say why a small client doesn't need it
- Use `docker compose up -d`: starts every container in compose.yaml in the background
- Use `docker compose ps`: lists the containers of the compose project
- Use `docker compose down`: stops and removes the containers (volumes stay)

*Watching it and keeping it safe*

- Name the three monitoring checks and where each is configured
- Say the default n8n execution clean-up settings
- Say what /healthz and /healthz/readiness check

*Backups and the encryption key*

- Explain what the encryption key does and what happens if it's lost
- List what to back up and what CLI exports miss

*Your answer and the client page*

- Write the four deliverables of p6-4


**Prompt: Check me (Socratic)**

> Role: Socratic questioner. Here is my hosting options page and my client answer: [paste]. Ask me one question at a time: what happens to the saved logins if the server disk dies, why can't a webhook from Stripe reach my laptop, who pays when the server is down at 2am, what must I not promise, and why does a small client not need Kubernetes. Don't give me the answers.

### p6-5. Hold a team meeting with your friends

*phone or laptop · 90 min · roles: Interviewer, Mapmaker*

**Goal:** Agree how the four of you work, share work and split money before the first shared client.

**Learn this first**

- Agree roles, money split and what happens if someone leaves before any money exists.
- Write one page and keep secrets in a shared password manager, never in chat.

**Do this**

1. Send the team the roadmap and dashboard so each person can follow it.
2. Run the meeting with a 5-point agenda: skills, roles, money split, first target client type, how to review each other's work. Write the decisions in `team-agreement.md`.

**Done when:** A written one-page agreement that everyone has read.

**Full lesson:** `lessons/p6-5.md` (also on the dashboard). **Must know to finish this step:**

*Why agree rules early*

- Say why to agree the rules before any money exists

*What to decide*

- List the decisions the agreement must make
- Say how team access and secrets are shared

*The meeting*

- Recite the five agenda points


**Prompt: Prepare me (Interviewer and Mapmaker)**

> Role: Interviewer, then Mapmaker. Ask me 6 questions about my three friends, their skills and the time they have. Then draft a 5-point agenda and a list of decisions we need to make about roles and money, with a short explanation of each option. Don't decide for us.

### p6-git. Set up the team's shared repo and review habit

*laptop · 90 min · roles: Explainer, Examiner*

**Goal:** Work in one repository with three friends without overwriting each other's work or leaking secrets.

**Learn this first**

- Nobody commits to main: branch, pull request, a teammate's review, then merge.
- Practise one merge conflict on purpose. Never commit secrets.

**Resources**

- [GitHub docs: About pull requests](https://docs.github.com/en/pull-requests/reference/pull-requests)
- [GitHub docs: Resolving a merge conflict](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/resolving-a-merge-conflict-using-the-command-line)
- [Bitwarden: password manager (one option)](https://bitwarden.com/)

**Do this**

1. Create the shared repo, add your three friends as collaborators, and add a `CONTRIBUTING.md` with the five rules above.
2. Each person makes a branch, changes one line of the same file on purpose, and opens a PR. Merge the first one, then resolve the conflict in the second together.
3. Each person reviews one PR and leaves two comments: one question and one suggestion.
4. Set up the shared password manager and move the team's shared logins into it.

**Done when:** Everyone has opened and reviewed a PR, a merge conflict was resolved on purpose, and no secrets are in the repo. You can explain branch, PR and conflict to someone new.

**Full lesson:** `lessons/p6-git.md` (also on the dashboard). **Must know to finish this step:**

*One shared repo*

- Say what lives in the shared repo
- Say how teammates get access

*Branches and pull requests*

- Describe the branch, commit, push, pull request routine
- Say what a good PR review contains
- Use `git switch -c add-signup-check`: creates a branch and moves onto it (name it after the change)
- Use `git push -u origin add-signup-check`: uploads the new branch to GitHub and links it

*Merge conflicts*

- Say when a merge conflict happens
- Resolve one: read the markers, choose, add, commit

*Secrets, passwords and roles*

- Say what to do when a key was committed
- Recite the five CONTRIBUTING rules

*Doing p6-git*

- Complete the four tasks


**Prompt: Quiz me (Examiner)**

> Role: Examiner. Give me 5 team-Git scenarios one at a time, getting harder: someone committed an API key, two people edited the same file, a PR is too big to review, someone pushed to main by accident, a friend leaves the team. Ask what I'd do and why, and tell me my level.

### p6-6. Pick one niche and write your one-sentence offer

*phone or laptop · 60 min · roles: Mapmaker, Checker*

**Goal:** Be known for one thing, based on what actually sold or got answered.

**Learn this first**

- I help [who] [get result] by [method]. Choose from evidence: replies, natural calls, projects you enjoyed.

**Do this**

1. Write 3 candidate offers from your evidence, one sentence each. Pick one to try for a month.
2. Update your headline and team pitch to match.

**Done when:** One sentence offer that matches evidence and that a stranger could repeat.

**Full lesson:** `lessons/p6-6.md` (also on the dashboard). **Must know to finish this step:**

*What a niche is*

- Say what a niche is and isn't
- Write the one-sentence offer formula

*Use evidence*

- List the evidence to use for choosing a niche

*Choose and try it*

- Complete the three steps


**Prompt: Check me (Mapmaker and Checker)**

> Role: Mapmaker, then Checker. Here is my evidence (replies, calls, jobs) and my 3 candidate offers: [paste]. Tell me which one the evidence supports best and why, and where I'm making a leap without evidence. Don't pick for me without asking me why first.

---

# Side tracks

---

## Track B: ComniWell

*later, kept separate from the Upwork path*

Your app launches after store review and a day of your own testing. These three steps are small and wait until then. Marketing is a big subject, so we run it with the same method: map it, learn one piece, do it, test yourself.

**Start this phase with Claude:** Role: Interviewer. Ask me 5 questions about ComniWell: who it's for, what makes it different, my launch date and my budget. Then map the marketing topics I should learn, in order.

### tb-1. Learn store listing basics (ASO)

*phone or laptop · 90 min · roles: Explainer, Checker*

**Goal:** Write your store title, subtitle, keywords and description with a reason for each word.

**Learn this first**

- ASO is how people find your app. Title, subtitle and keywords are searched; screenshots and ratings decide installs.
- Choose keywords by what people search for, and test one change at a time.

**Do this**

1. After approval, list 20 candidate keywords, group them by intent, and pick the top 8 for the title, subtitle and keyword field.
2. Ask Claude to review your listing as a store user.

**Done when:** A listing where every keyword has a reason, and screenshots that show the main benefit in the first two images.

**Full lesson:** `lessons/tb-1.md` (also on the dashboard). **Must know to finish this step:**

*What ASO is*

- Say what ASO is and which fields are searched
- Say what decides whether people install

*Choosing keywords*

- Choose keywords by search intent and write a reason for each
- Say how to test listing changes

*Doing tb-1*

- Complete the keyword list and the listing review


**Prompt: Check me (Checker)**

> Role: Checker. Here is my draft store title, subtitle, keywords and description for ComniWell, and my 20 candidate keywords with reasons: [paste]. Challenge each choice. Which keywords are too competitive, too vague or don't match what people search for? Don't rewrite it for me.

### tb-2. After launch: test one acquisition channel

*phone or laptop · 2 weeks · roles: Interviewer, Checker*

**Goal:** Pick one channel, run a small test and measure the result.

**Learn this first**

- Don't try everything. Pick **one** channel (for example short videos, a fitness community, a small paid test) and measure installs per hour or euro spent.
- Write the hypothesis first: "I expect about X installs from Y". After two weeks, compare with the result and decide: continue, change or stop.

**Do this**

1. Write the hypothesis and the measure in `acquisition-test.md`. Run for 2 weeks. Write down the result.

**Done when:** A written result with a decision.

**Full lesson:** `lessons/tb-2.md` (also on the dashboard). **Must know to finish this step:**

*One channel, one hypothesis*

- Say why to pick one channel
- Write a hypothesis in the right form

*Run it and decide*

- Run the test for two weeks and make a written decision


**Prompt: Check me (Checker)**

> Role: Interviewer, then Checker. Interview me about my target user and my time and money. Then check my hypothesis for the channel I picked: [paste]. Ask what I'd measure and what would make me stop.

### tb-3. Set up launch basics

*phone or laptop · 2 hours · roles: Explainer, Checker*

**Goal:** Have the basics ready so the first users aren't lost.

**Learn this first**

- The first week decides retention: a launch-day message, one retention number, and a rating prompt at a happy moment.

**Do this**

1. Write the launch-day email, decide your retention number and write down when the rating prompt appears.

**Done when:** The email is ready, the retention number is chosen and the rating moment is defined.

**Full lesson:** `lessons/tb-3.md` (also on the dashboard). **Must know to finish this step:**

*Why the first week matters*

- List the three launch preparations
- Say when to ask for a rating

*Doing tb-3*

- Produce the three launch items


**Prompt: Check me (Checker)**

> Role: Checker. Here are my launch email, my retention measure and my rating prompt moment: [paste]. Find what would annoy a new user or tell me nothing useful. Don't rewrite them.

---

## Retest: Gaps to retest

*found in the interview*

These are the gaps found when we checked your level. They come back later in a quiz.

**Start this phase with Claude:** Role: Examiner. Test me on all the items in my retest list in one sitting, one question at a time, and tell me which I've fixed.

### rt-1. GET vs POST

*phone · 10 min · roles: Examiner*

**Goal:** Explain where parameters go, what each method means and what HTTPS protects.

**Learn this first**

- GET puts parameters in the URL and reads; POST puts data in the body and changes something.
- HTTPS encrypts both. POST alone doesn't hide data.

**Do this**

1. Explain it out loud without notes.

**Done when:** Claude agrees your explanation is correct.

**Full lesson:** `lessons/rt-1.md` (also on the dashboard). **Must know to finish this step:**

*GET versus POST and what HTTPS protects*

- Say where GET and POST put their parameters and what each means
- Say what HTTPS encrypts and what a POST body is not hidden from


**Prompt: Quiz me (Examiner)**

> Role: Examiner. Ask me 3 questions about GET vs POST, increasingly hard, and tell me whether I've fixed the gap.

### rt-2. Workflow vs agent

*phone · 10 min · roles: Examiner*

**Goal:** Explain the difference and when an agent is overkill.

**Learn this first**

- A workflow has fixed steps. An agent decides its steps at run time using tools. Use a workflow when you know the steps.

**Do this**

1. Explain it out loud to a non-technical person.

**Done when:** Claude agrees your explanation is correct and includes an example of each.

**Full lesson:** `lessons/rt-2.md` (also on the dashboard). **Must know to finish this step:**

*Workflow versus agent*

- Explain workflow versus agent with an example of each
- Say when an agent is overkill


**Prompt: Quiz me (Examiner)**

> Role: Examiner. Ask me 3 questions about workflow vs agent, increasingly hard, and tell me whether I've fixed the gap.

### rt-3. Git commands

*laptop · 15 min · roles: Examiner*

**Goal:** Use the core Git commands without looking them up.

**Learn this first**

- init, status, add, commit, branch or switch, merge, push, pull and log. Know which place each one affects.

**Do this**

1. Do a full cycle in a practice folder from memory.

**Done when:** Claude agrees you did it correctly and can explain each command.

**Full lesson:** `lessons/rt-3.md` (also on the dashboard). **Must know to finish this step:**

*The core Git commands and where each acts*

- Say which place each command affects
- Run a full init, commit, branch, merge cycle from memory
- Use `git init`: turns the current folder into a new Git repo
- Use `git status`: shows what changed, what is staged and what is untracked
- Use `git add .`: stages all changes for the next commit
- Use `git commit -m "msg"`: saves the staged changes as a commit
- Use `git switch -c name`: creates a branch and moves onto it
- Use `git merge name`: brings that branch's commits into the current branch
- Use `git push`: uploads local commits to GitHub
- Use `git pull`: downloads new commits from GitHub
- Use `git log --oneline`: lists commits, one per line


**Prompt: Quiz me (Examiner)**

> Role: Examiner. Give me 4 Git scenarios, increasingly hard, and tell me whether I've fixed the gap.
