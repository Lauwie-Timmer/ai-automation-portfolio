## topic: One shared repo | repo
**One shared repo** (or a GitHub organisation with a few repos) holds the team's scripts, exported workflows, templates and case studies. Everyone has their **own copy on their computer** (a clone, p0-2) and syncs through GitHub.

Create the shared repo, **add your three friends as collaborators**, and add a **`CONTRIBUTING.md`** with the five rules in the last topic.
know: Say what lives in the shared repo
know: Say how teammates get access
Q: What does the shared repo hold?
A: The team's scripts, exported workflows, templates and case studies.
Q: How do teammates get access?
A: I add them as collaborators; each clones the repo to their own computer.

## topic: Branches and pull requests | pr
**Nobody commits straight to `main`.** The routine:

```
git switch main
git pull                          get the latest
git switch -c add-signup-check    make your own branch
(edit files)
git add .
git commit -m "add signup validation"
git push -u origin add-signup-check     upload the branch
```

Then on GitHub open a **pull request (PR)**: a proposal to merge your branch into `main`. A teammate **reads it and comments**, and then it is merged. This catches mistakes and spreads knowledge. **Review the change, not the person.**

A good review leaves **a question** (what happens if the table is empty?) and **a suggestion** (rename this variable).

**Protected branches** (a setting that blocks pushing to main and requires reviews) are available on public repos and on organisations using GitHub Team or Enterprise (per GitHub's docs, October 2026). On a private repo with a free plan they may not exist, so **agree the rule by convention** instead.
cmd: `git switch -c add-signup-check` | creates a branch and moves onto it (name it after the change)
cmd: `git push -u origin add-signup-check` | uploads the new branch to GitHub and links it
know: Describe the branch, commit, push, pull request routine
know: Say what a good PR review contains
Q: Why does nobody commit straight to `main`?
A: Changes go through a branch and a pull request so a teammate reviews them first; that catches mistakes.
Q: List the commands to start a change and upload it.
A: `git switch main`, `git pull`, `git switch -c <branch>`, edit, `git add .`, `git commit -m "..."`, `git push -u origin <branch>`, then open a PR.
Q: What do you leave in a review?
A: At least one question and one suggestion, about the change and not the person.

## topic: Merge conflicts | conflicts
A **merge conflict** happens when two people change **the same lines**. Git can't choose, so you pick. They look scary the first time, so **practise once on purpose.**

Git marks the file like this:

```
<<<<<<< HEAD
the line on your branch
=======
the line on the other branch
>>>>>>> add-signup-check
```

To resolve it:
1. `git status` shows which files are in conflict.
2. Open each file, **choose what the final text should be**, and **delete the three marker lines** (`<<<<<<<`, `=======`, `>>>>>>>`).
3. `git add .`
4. `git commit -m "resolve conflict"`
5. Push.

Practice exercise: each person makes a branch, changes **one line of the same file** on purpose and opens a PR. Merge the first; the second then conflicts: resolve it together.
know: Say when a merge conflict happens
know: Resolve one: read the markers, choose, add, commit
Q: When does a merge conflict happen?
A: When two branches change the same lines, so Git can't choose.
Q: What do the markers mean and how do you finish?
A: The part after `<<<<<<<` is one side, after `=======` the other. I choose the final text, delete the markers, `git add .` and `git commit`.

## topic: Secrets, passwords and roles | secrets
- **Never commit secrets** (keys, passwords, `.env`) and **never commit exported credentials.** If someone commits a key, **rotate it** (create a new one and disable the old), because it stays in the Git history even if you delete the file.
- A **shared password manager** (for example Bitwarden) is where team logins and API keys live. **Never share secrets in chat or in the repo.** Use each client's own accounts for their automations.
- **Roles:** agree who reviews what. Pair a builder with a reviewer, and swap.

**The five rules for `CONTRIBUTING.md`:**
1. Nobody commits straight to `main`; use a branch and a PR.
2. Keep PRs small.
3. Write clear commit messages ("add signup validation", not "fix").
4. Never commit secrets or exported credentials.
5. Every PR is reviewed by someone else before merging.
know: Say what to do when a key was committed
know: Recite the five CONTRIBUTING rules
Q: Someone committed an API key. What do you do?
A: Rotate the key straight away (new key, old disabled). Deleting the file isn't enough because it stays in the history.
Q: List the five rules.
A: No commits straight to main; small PRs; clear commit messages; never commit secrets or exported credentials; every PR reviewed by someone else.
Q: Where do team logins and API keys live?
A: In a shared password manager, never in chat or the repo.

## topic: Doing p6-git | do
1. Create the shared repo, add the collaborators and `CONTRIBUTING.md`.
2. Each person makes a branch, changes one line of the same file and opens a PR. **Merge the first, resolve the conflict in the second together.**
3. Each person **reviews one PR** and leaves two comments: one question, one suggestion.
4. Set up the shared password manager and move the team's shared logins into it.

Done when everyone has opened and reviewed a PR, a conflict was resolved on purpose, and no secrets are in the repo. You can explain branch, PR and conflict to someone new.
know: Complete the four tasks
Q: What happens after the two practice PRs are opened?
A: Merge the first, then resolve the conflict in the second together.
