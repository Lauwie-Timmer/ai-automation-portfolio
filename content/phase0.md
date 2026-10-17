# p0 | Phase 0 | Setup and baseline | 3 | Four tools, one goal: n8n running on your own computer
intro: You will get the tools you'll use every day running, and learn what each one is for. Nothing here is hard, but five ideas (container, port, volume, virtual environment, API key) come back in every later phase, so we learn them properly now instead of copy-pasting commands.
start: Role: Interviewer. Before Phase 0, ask me 5 questions, one at a time, about what I already know of Docker, n8n, Python virtual environments, GitHub and API keys. Then tell me which steps in this phase I can go through quickly and which need the most time.

## p0-1 | l | must | Check your tool versions | 5 min | Explainer
fast: yes
goal: Know that Python, Node, Git and Docker are installed.
learn:
- Four tools, one job each: Python runs scripts, Node runs your app, Git keeps history, Docker runs n8n.
do:
- Nothing left to do. Claude already ran `python --version`, `node --version`, `git --version` and `docker --version`, and all four are installed.
- You will explain what each tool is for in the Phase 0 exam.
done: Already done. Claude checked it off.
prompt: Check me (Listener) | Role: Listener. Here is my one-sentence explanation of what Python, Node, Git and Docker are each for, in my own words: [write them]. Tell me what is wrong or missing. Don't rewrite them for me.

## p0-t | l | must | Terminal basics: move around PowerShell | 20 min | Explainer, Examiner
fast: yes
goal: Move between folders, create files and run commands in PowerShell without getting lost.
learn:
- `pwd` shows where you are, `ls` shows what is there, `cd` moves. Paths are absolute (from the drive) or relative (from here).
- `mkdir` makes folders, `New-Item` makes files. Read red errors. Check before you delete.
do:
- Open PowerShell. Run `pwd` and `dir`.
- Run `cd C:\dev`, `mkdir terminal-practice`, `cd terminal-practice`, `New-Item notes.txt`, `dir`, then `cd ..`.
- Delete only the practice folder: `Remove-Item terminal-practice -Recurse`. Check first with `dir` that you are in `C:\dev`. This deletes the folder and everything in it, so never run it on a folder you care about.
- Open the learning folder in VS Code with `code C:\dev\ai-automation-portfolio`. If `code` isn't recognised, use File, then Open Folder in VS Code.
done: You did all of this without looking at the list, and can explain absolute vs relative paths.
prompt: Quiz me (Examiner) | Role: Examiner. Give me 5 small terminal tasks one at a time, for example "you are in C:\dev, create a folder x, go into it, create y.txt and list it", and check the commands I type. Tell me my level.

## p0-2 | l | must | Create a private GitHub repo and clone it | 30 min | Explainer, Checker
fast: yes
goal: Have a private repo called automation-portfolio on GitHub and a copy of it at C:\dev\automation-portfolio.
learn:
- Git records versions on your PC. GitHub keeps an online copy (the remote). Cloning downloads a repo with its history.
- `.gitignore` keeps secrets and clutter out of Git.
res:
- GitHub Skills: Introduction to GitHub (free interactive course) | https://skills.github.com/
- GitHub docs: Hello World | https://docs.github.com/en/get-started/using-github/hello-world
do:
- Go to github.com and sign up or log in. Do this yourself, and don't share your password with anyone, including Claude.
- Click New repository. Name it `automation-portfolio`, choose **Private**, tick **Add a README**, and choose the **Python** .gitignore template.
- In GitHub Desktop choose File, then Clone repository, pick `automation-portfolio`, and set the local path to `C:\dev\automation-portfolio`.
- Open that folder in VS Code (File, Open Folder). Open the terminal inside VS Code (Ctrl+`) and run `git status`. It should say your branch is up to date and there is nothing to commit.
done: The folder C:\dev\automation-portfolio exists with a README, and you can explain Git vs GitHub and local vs remote without help. Claude can check the folder exists.
prompt: Check me (Socratic) | Role: Socratic questioner. I created a private repo called automation-portfolio and cloned it to C:\dev\automation-portfolio. Check that the folder exists. Then ask me one question at a time: what is the difference between Git and GitHub, what is a remote, what does cloning do, and why is the repo private. Don't give me the answers.

## p0-3 | l | must | Run n8n in Docker and open it in your browser | 60-90 min | Explainer, Socratic
fast: yes
goal: Run n8n on your own computer inside a Docker container, open it at http://localhost:5678, and understand every part of the command you typed.
learn:
- Image = recipe, container = running copy, volume = the data that survives. `-p 5678:5678` opens a door to the container.
- Docker Desktop must be running before any `docker` command works.
res:
- Docker: Get started | https://docs.docker.com/get-started/
- n8n docs: Install with Docker | https://docs.n8n.io/deploy/host-n8n/install-options/install-with-docker
- n8n docs: Install using Docker Compose (the recommended way now; read it after n8n runs) | https://docs.n8n.io/deploy/host-n8n/install-options/install-using-docker-compose
- n8n docs: Build your first workflow (do this after n8n runs) | https://docs.n8n.io/build-your-first-workflow
do:
- Open **Docker Desktop**. Wait until it says **Engine running** (bottom left). The first start can take a minute and may ask to enable WSL 2. Accept.
- In PowerShell run `docker run hello-world`. It downloads a tiny image and prints a message. That proves Docker works.
- Create the volume: `docker volume create n8n_data`
- Start n8n in the foreground (replace the timezone if you're not in the Netherlands): `docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n -e GENERIC_TIMEZONE=Europe/Amsterdam -e TZ=Europe/Amsterdam -e N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true -e N8N_RUNNERS_ENABLED=true n8nio/n8n`
- The first run downloads the image (a few hundred MB). Wait for a line saying the editor is accessible at http://localhost:5678, then open it in your browser and create the owner account. It stays on your computer.
- Open a second PowerShell window and run `docker ps`. Find `n8n` in the list. Go back to the first window and press **Ctrl+C**. Run `docker ps` again and note that it's gone. That is `--rm`. Your account is still in the volume.
- Run it again for daily use, in the background and restarting with Docker: `docker run -d --restart unless-stopped --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n -e GENERIC_TIMEZONE=Europe/Amsterdam -e TZ=Europe/Amsterdam -e N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true -e N8N_RUNNERS_ENABLED=true n8nio/n8n` and open localhost:5678 to confirm your account still works.
- If Docker Desktop says virtualization is disabled, it has to be switched on in your computer's BIOS settings. Ask Claude to walk you through it, because the steps depend on your PC.
- If you see "container name already in use", run `docker rm n8n` and try again. If you see "port is already allocated", something else uses 5678, so run `docker ps` to find it. Try for 15 minutes on your own before asking for help.
done: n8n opens at localhost:5678 and you can explain image vs container, the port mapping, and what the volume protects, in your own words.
prompt: Check me (Socratic) | Role: Socratic questioner. n8n is running at localhost:5678 in Docker. Ask me questions one at a time until I find my own gaps about: image vs container, what -p 5678:5678 does and what changes if I use -p 5679:5678, what the volume protects and what happens to my workflows if I delete the container vs the volume, and what --rm and -d do. Don't give me the answers. If I answer wrong, ask a follow-up question that helps me find it.

## p0-4 | l | must | Make a Python virtual environment and install requests | 20 min | Explainer, Checker
fast: yes
goal: Have a .venv in your repo with the requests library installed, and know why it exists.
learn:
- A venv gives one project its own packages. Activate it (`(.venv)` in the prompt) before `pip install`.
- `requirements.txt` lists the packages so you can rebuild.
res:
- Python docs: Virtual environments and packages | https://docs.python.org/3/tutorial/venv.html
- Requests: Quickstart | https://requests.readthedocs.io/en/latest/user/quickstart/
do:
- In PowerShell: `cd C:\dev\automation-portfolio`
- Create it: `python -m venv .venv`
- Activate it: `.\.venv\Scripts\Activate.ps1`. If Windows blocks the script, run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` once and try again.
- Install: `python -m pip install requests`
- Test: `python -c "import requests; print(requests.__version__)"`
- Save the list: `pip freeze > requirements.txt`
- Check `.gitignore` contains `.venv` (the Python template does). In VS Code press Ctrl+Shift+P, choose **Python: Select Interpreter**, and pick the one in `.venv`.
done: `(.venv)` shows in your prompt, requests imports, requirements.txt exists, and you can say why a venv exists and what happens if you forget to activate it. Claude can check the files exist.
prompt: Check me (Socratic) | Role: Socratic questioner. I made a venv in C:\dev\automation-portfolio and installed requests. Check that .venv and requirements.txt exist. Then ask me one question at a time: why do we use a venv, what does activating do, what is pip, what is requirements.txt for, and why is .venv in .gitignore. Don't give me the answers.

## p0-5 | l | must | Get a free LLM API key and keep it safe | 20 min | Explainer, Checker
fast: yes
goal: Have a free Gemini API key stored in a .env file that Git will never upload.
learn:
- An API key is a password. Keep it in `.env`, never in Git or in a chat.
- `.env.example` shows the names without the values.
res:
- Google AI Studio: API keys | https://aistudio.google.com/apikey
- Gemini API docs | https://ai.google.dev/gemini-api/docs
- Gemini API: Additional Terms of Service (read the section on the EEA, Switzerland and the UK) | https://ai.google.dev/gemini-api/terms
do:
- Open aistudio.google.com/apikey, sign in, and create an API key.
- In `C:\dev\automation-portfolio` create a file named `.env` with one line: `GEMINI_API_KEY=` followed by your key. No quotes, no spaces.
- Run `git status`. `.env` must **not** appear in the list. If it does, add a line `.env` to `.gitignore`.
- Create `.env.example` containing `GEMINI_API_KEY=` with no value, so you commit the template but not the secret.
- With your venv active, install python-dotenv, run `python -c "from dotenv import load_dotenv; import os; load_dotenv(); print(bool(os.getenv('GEMINI_API_KEY')))"` and check it prints `True`. Then run `pip freeze > requirements.txt` again.
- Optional: skim the Gemini docs quickstart to see what a request looks like. You'll use the key for real in Phase 3.
done: `.env` is ignored by Git, `.env.example` exists, and you can explain what could go wrong if the key were committed and how you would fix it.
prompt: Check me (Checker) | Role: Checker and Socratic questioner. I stored my API key in .env and .gitignore ignores it. Do not ask me to paste the key. Check that .env.example exists and that .gitignore lists .env. Then ask me: what could go wrong if I committed the key, what do I do if I did, and why is there a .env.example. One question at a time.

## p0-6 | b | must | Write your Upwork headline and overview | 45 min | Interviewer, Checker
fast: yes
goal: Have one clear headline and a three-sentence overview you could put on your profile.
learn:
- Clients search for problems. Say who you help, what you do and with which tools.
- Only claim what you can show.
do:
- Look at your profile in the browser but don't change anything yet. Check whether Upwork shows any pending step such as identity verification, profile review or a payment method. These can take days, so start them now. Only you can do them. Keep to one account, because Upwork doesn't allow duplicates.
- Create `C:\dev\automation-portfolio\upwork-profile.md`. Write 3 different headline options and a 3-sentence overview.
- Ask Claude to interview you first, so your wording comes from your real experience.
- Pick the headline you like best.
done: One headline you would put on the profile, and an overview where Claude can't find vague claims or overclaims.
prompt: Interview then check me | Role: Interviewer, then Checker. First ask me 6 questions, one at a time, about my past bots, APIs, Python, mathematics degree and the ComniWell app, so you can find my real strengths. Then I'll paste my headline options and overview from upwork-profile.md. Critique them: what is vague, what is an overclaim, what would a client not understand. Don't rewrite them for me.

## p0-r | l | redo | Redo without help: start a second n8n from memory | 20 min | Listener
goal: Prove you understand the Docker command by building a variation of it with no notes.
learn:
- Changing a command proves you understand it: new name, new volume, new left port.
- Explaining aloud shows gaps that typing hides.
do:
- Close this page. From memory, start a second n8n called `n8n-test` on **host port 5679** with a new volume `n8n_test`. Remember `-p HOST:CONTAINER`, and that n8n always listens on 5678 inside. The timezone and the two other `-e` settings are optional for a throwaway test.
- Open localhost:5679 and see a brand-new n8n asking you to create an account. Your real one at 5678 is untouched.
- Clean up **only the test**: `docker stop n8n-test`, `docker rm n8n-test`, `docker volume rm n8n_test`. Never run a volume remove on `n8n_data`.
- Dictate (voice) a 1-minute explanation of what each part of your command did, then paste the transcript to Claude.
done: The second n8n ran on 5679 and your spoken explanation matches what each flag does.
prompt: Check me (Listener) | Role: Listener. I rebuilt a second n8n from memory on port 5679. Here is the command I typed: [paste]. Here is my spoken explanation of each part: [paste transcript]. Compare it to what the command really does and tell me exactly what I missed or got wrong.

## p0-g | l | gate | Phase 0 exam | 20 min | Examiner, Diagnostician, Clerk
goal: Show you can explain the setup, not just run it, and turn your mistakes into flashcards.
learn:
- The exam gets harder until you guess. That shows your real level.
- Your mistakes become flashcards, reviewed on a schedule.
do:
- Run the exam prompt below. Answer from memory, in your own words.
- Ask for 8 flashcards from your mistakes and review them at work in the next two days.
done: You score at least 80% on the exam, and you have the flashcards.
prompt: Exam me | Role: Examiner. Exam me on Phase 0, one question at a time, easy to hard. Stop when I start guessing and tell me my level. Cover: what Python, Node, Git and Docker are each for; Git vs GitHub; image vs container; what -p 5679:5678 means; what a volume protects; why a venv; why .env is in .gitignore. Score me out of 10.
prompt: Diagnose and flashcards | Role: Diagnostician, then Clerk. Look at my mistakes in the exam and in C:\dev\ai-automation-portfolio\mistakes.md. What one root misunderstanding is behind them? Then make 8 flashcards and save them in C:\dev\ai-automation-portfolio\flashcards\ as one tab-separated text file for this phase (question, tab, answer, one card per line) so I can import them into Anki.
