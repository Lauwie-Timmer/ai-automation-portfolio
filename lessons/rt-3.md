## topic: The core Git commands and where each acts | git-core
Git has **three places**: your **working folder** (the files you edit), the **staging area** (what goes into the next commit) and the **local repository** (the saved commits); GitHub is the **remote** copy.

| Command | What it does | Place it affects |
|---|---|---|
| `git init` | makes the current folder a new repo | creates the local repo |
| `git status` | shows changed, staged and untracked files | nothing (just reads) |
| `git add .` | stages all changes | working folder to staging |
| `git commit -m "msg"` | saves the staged changes as a commit | staging to local repo |
| `git switch -c name` | makes a new branch and moves onto it | which branch you're on |
| `git switch main` | moves back to main | which branch you're on |
| `git merge name` | brings another branch's commits into the current branch | current branch |
| `git push` | uploads commits | local repo to GitHub |
| `git pull` | downloads and merges new commits | GitHub to local repo and folder |
| `git log --oneline` | lists commits, one line each | nothing (just reads) |

**A full cycle from memory:** `git init`, create a file, `git status`, `git add .`, `git commit -m "first"`, `git switch -c experiment`, edit and commit, `git switch main`, `git merge experiment`, `git log --oneline`. (`git push` and `git pull` need a GitHub remote.)
cmd: `git init` | turns the current folder into a new Git repo
cmd: `git status` | shows what changed, what is staged and what is untracked
cmd: `git add .` | stages all changes for the next commit
cmd: `git commit -m "msg"` | saves the staged changes as a commit
cmd: `git switch -c name` | creates a branch and moves onto it
cmd: `git merge name` | brings that branch's commits into the current branch
cmd: `git push` | uploads local commits to GitHub
cmd: `git pull` | downloads new commits from GitHub
cmd: `git log --oneline` | lists commits, one per line
know: Say which place each command affects
know: Run a full init, commit, branch, merge cycle from memory
Q: Which command moves changes from the working folder into staging, and which saves staging as a commit?
A: `git add .` stages them; `git commit -m "msg"` saves them as a commit.
Q: Which commands talk to GitHub?
A: `git push` uploads commits and `git pull` downloads them.
Q: Write the commands to make a branch, commit on it and merge it into main.
A: `git switch -c experiment`, edit, `git add .`, `git commit -m "msg"`, `git switch main`, `git merge experiment`.
Q: What does `git log --oneline` show?
A: The commits, one line each, newest first.
Q: What do `git init` and `git status` do?
A: `git init` makes the current folder a new repo; `git status` shows what changed, what is staged and what is untracked.
Q: What does `git merge experiment` do and where do you run it?
A: It brings the experiment branch's commits into the branch I am on, so I first run `git switch main`.
Q: What do the three places in Git hold?
A: The working folder holds the files I edit, the staging area what goes into the next commit, and the local repository the saved commits.
