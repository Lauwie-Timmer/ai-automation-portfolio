# p1 | Phase 1 | The plumbing | 8 | HTTP, JSON, webhooks and Git
intro: Every automation talks to other systems through HTTP requests. After this phase you can call an API from Python and from n8n, receive data with a webhook, and keep your work in Git. This is the foundation under every Upwork job you'll take.
start: Role: Interviewer. Before Phase 1, ask me 5 questions, one at a time, about HTTP, JSON, APIs, webhooks and Git. Tell me which steps I can speed through and which to take slowly.

## p1-1 | p | must | Learn how HTTP works | 45 min | Explainer, Socratic
fast: yes
goal: Explain a request and a response, GET vs POST, status codes, headers and API keys in your own words.
learn:
- A request has a method, URL, headers and body. A response has a status code, headers and a body, usually JSON.
- GET reads, POST changes. HTTPS encrypts both. 2xx is success, 4xx is your mistake, 5xx is theirs.
res:
- MDN: An overview of HTTP | https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview
- MDN: HTTP response status codes | https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
- httpbin: a free service for testing requests | https://httpbin.org
do:
- Open https://httpbin.org/get in your browser and read the JSON. Find the headers your browser sent.
- Open https://httpbin.org/status/404 and https://httpbin.org/status/200. Notice what the page shows and what it hides.
- In PowerShell run `curl.exe -i https://httpbin.org/get`. Use `curl.exe`, because plain `curl` in PowerShell is a different command. Find the status line, the response headers and the body.
- Write down in your own words what happened in each of the three calls. Then run the Socratic prompt.
done: You can explain the request and response parts, GET vs POST including what HTTPS does and doesn't hide, five status codes, and what a webhook is.
prompt: Check me (Socratic) | Role: Socratic questioner. Ask me questions about HTTP one at a time until I find my own gaps. Start with GET vs POST, which I got partly wrong in the interview. Then status codes, headers and API keys, and webhook vs API call. Don't give me the answers.

## p1-py | l | must | Python refresher: find your level and fix the rust | 90 min | Interviewer, Examiner, Checker
fast: yes
goal: Find out what you still remember of Python and rebuild the eight skills every later step uses.
learn:
- Eight skills: types, functions, loops, f-strings, files, json, try/except, imports.
- Find the rusty ones first, then practise only those.
res:
- Python docs: The Python Tutorial | https://docs.python.org/3/tutorial/
- Python docs: json module | https://docs.python.org/3/library/json.html
do:
- Run the "Find my level" prompt first. Claude asks diagnostic questions and tells you which of the eight skills need work.
- Then write these six exercises in `C:\dev\automation-portfolio\00-python`, one file each, without AI-written code: (a) `word_count(text)` returns a dict of word to count. (b) Create a JSON file with a list of 5 people (name, age), read it and print the average age. (c) Write that list to a new file sorted by age. (d) A function that divides two numbers and handles division by zero and non-numeric input with try/except. (e) A list comprehension for the squares of the even numbers from 1 to 20. (f) An f-string table of names and ages with aligned columns.
- Struggle for 15 minutes on each before asking for help. Then run the "Check my exercises" prompt.
done: All six exercises work, you can explain every line, and Claude agrees the eight skills are solid or lists the ones to review.
prompt: Find my level (Interviewer then Examiner) | Role: Interviewer, then Examiner. I have used Python before (bots, APIs, and graph-colouring algorithms for my mathematics degree) but it was a while ago. Ask me diagnostic questions one at a time on: types, functions, loops and comprehensions, f-strings, files, json, try/except, imports and pip. Make them harder until I struggle, tell me my level, and list which of the eight skills need practice.
prompt: Check my exercises (Checker) | Role: Checker. Here are my six exercises: [paste]. Find bugs and edge cases, and tell me if any line is hard to read. Don't rewrite them. Ask me one question about a line I should be able to explain.

## p1-2 | l | must | Call an API from Python and read the JSON | 45 min | Explainer, Checker
fast: yes
goal: Write a script that calls a public API, reads the JSON and prints three values.
learn:
- `requests.get(url, params=..., timeout=10)`, then `raise_for_status()`, then `.json()`.
- Print the whole JSON first, then index into it step by step.
res:
- Requests: Quickstart | https://requests.readthedocs.io/en/latest/user/quickstart/
- Open-Meteo forecast API (free, no key) | https://open-meteo.com/en/docs
do:
- In `C:\dev\automation-portfolio` create a folder `01-http` and a file `get_weather.py`.
- **Spec, no code given:** call `https://api.open-meteo.com/v1/forecast` with parameters `latitude=52.37`, `longitude=4.89` and `current=temperature_2m,wind_speed_10m`. Check the status. Print the time, the temperature and the wind speed in one readable line.
- Run it with your venv active: `python 01-http\get_weather.py`.
- Struggle for 15 minutes first. If stuck, use the "I'm stuck" prompt.
- Then change the coordinates to another city without looking at the docs.
done: The script prints one clean line, fails loudly on a bad URL (try one), and you can explain every line.
prompt: Check me (Checker) | Role: Checker. Here is my script: [paste]. Find what is wrong or missing, and whether there is a simpler or safer way. Don't rewrite it for me. Then ask me one question about a line I probably copied without understanding.

## p1-3 | l | must | Send a POST with JSON from Python | 30 min | Explainer, Checker
fast: yes
goal: Send JSON to a URL with POST and see it arrive.
learn:
- `requests.post(url, json={...})` sends JSON and sets the content type for you.
- webhook.site shows exactly what arrived. Its URL is public, so use fake data.
res:
- webhook.site | https://webhook.site
- Requests: Quickstart, section "More complicated POST requests" | https://requests.readthedocs.io/en/latest/user/quickstart/
do:
- Open https://webhook.site and copy your unique URL.
- In `01-http` create `post_webhook.py`. **Spec:** POST `{"name": "test", "message": "hello from python"}` to your URL, with a custom header `X-Source: python`. Print the status code.
- In webhook.site, find the method, the headers and the body of your request.
- Then change the body to include a list of two items, run again, and find it in webhook.site.
done: You can point at the method, headers and body of your request in webhook.site and explain which line of Python produced each.
prompt: Check me (Checker) | Role: Checker. Here is my POST script: [paste]. Check it against what webhook.site received: [describe or paste]. Find what's wrong or missing. Then ask me what would change if I used data= instead of json=. Don't rewrite my script.

## p1-4 | l | must | Your first n8n workflow with the HTTP Request node | 60 min | Explainer, Socratic
fast: yes
goal: Build a workflow that calls an API, reshapes the result and sends it on, entirely in n8n.
learn:
- A workflow is a chain of nodes. Each node gets items (JSON objects) and passes items on.
- The HTTP Request node is `requests`. Expressions like `{{ $json.field }}` read earlier data.
res:
- n8n docs: Build your first workflow (a NASA solar-flare example) | https://docs.n8n.io/build-your-first-workflow
- n8n docs: HTTP Request node | https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/
- n8n Academy: free beginner course N8N101 "Essentials: Your First Workflows" (free registration) | https://learn.n8n.io/
do:
- Open localhost:5678. Do **one** of these first: the docs tutorial "Build your first workflow", or the first lessons of the N8N101 course on learn.n8n.io (registration is free, and you never need to give payment details for it). Stop when you've seen the editor, a trigger, an HTTP node and the Output panel. Then do the build below.
- New workflow. Add a **Manual Trigger**, then an **HTTP Request** node: GET `https://api.open-meteo.com/v1/forecast` with the same three query parameters as before. Click Execute step and open the Output.
- Add an **Edit Fields** node that keeps only `time`, `temperature` and `wind`, using expressions that point at the HTTP node's output.
- Add a second **HTTP Request** node that POSTs those fields as JSON to your webhook.site URL. Check that they arrived.
- Name the workflow `01 weather to webhook`.
done: Running the workflow sends your three fields to webhook.site, and you can explain what an item is and what the expression does.
prompt: Check me (Socratic) | Role: Socratic questioner. I built a workflow with Manual Trigger, HTTP Request, Edit Fields and a second HTTP Request. Ask me one question at a time about what an item is, what an expression does, why the output of one node is the input of the next, and how n8n's HTTP Request relates to Python's requests.get and requests.post. Don't give me the answers.

## p1-5 | l | must | Receive data with an n8n Webhook node | 45 min | Explainer, Socratic
fast: yes
goal: Make n8n receive the POST that your Python script sends, using a webhook.
learn:
- The Webhook node has a Test URL (while listening) and a Production URL (once published).
- Your payload sits under `body`. `localhost` can't be called from the internet.
res:
- n8n docs: Webhook node | https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/
do:
- New workflow `02 receive webhook`. Add a **Webhook** node: method POST, path `portfolio-test`.
- Click **Listen for test event**. Copy the Test URL and change `post_webhook.py` to POST to it. Run the script and watch the data arrive in the node's output.
- Add an **Edit Fields** node after the webhook that keeps only `message` and adds a field `received_at` using the expression `{{ $now }}`.
- Save, switch the workflow to **Active** (or **Publish** it, depending on your n8n version), point the script at the **Production URL** and run again. Look at **Executions** in the left menu to see the run.
- Explain in your own words when each URL works.
done: Both URLs received your script's data and you can explain test vs production URL and why localhost isn't reachable from the internet.
prompt: Check me (Socratic) | Role: Socratic questioner. I made a Webhook workflow and sent data to its test and production URLs from Python. Ask me one question at a time: why are there two URLs, what makes the production URL work, why can't a service on the internet call my localhost URL, and how does my Python script reach a program inside Docker. Don't give me the answers.

## p1-6 | l | must | Git: commit, branch, merge and push | 60 min | Explainer, Examiner
fast: yes
goal: Use Git from the terminal to save your Phase 1 work and put it on GitHub.
learn:
- Git has three places: working folder, staging, history. `add` stages, `commit` saves, `push` uploads.
- Branches are for experiments. Never commit `.env`.
res:
- Pro Git book, chapters 1 to 3 (free) | https://git-scm.com/book/en/v2
- GitHub Skills: Introduction to GitHub | https://skills.github.com/
do:
- Tell Git who you are, once: `git config --global user.name "Your Name"` and `git config --global user.email "you@example.com"`.
- In n8n, open each of your workflows, use the **...** menu and **Download** it. Save the files in a `workflows` folder in your repo.
- Run `git status`. Read what it says. Then `git add .` and `git commit -m "Add Phase 1 scripts and workflows"`. Then `git push`. Look at your repo on GitHub.
- Practice: `git switch -c experiment`, change a script, commit it, `git switch main`, `git merge experiment`, then `git log --oneline`.
- On the first push a browser window may ask you to sign in to GitHub. That's normal.
done: Your commits are on GitHub, you can describe working folder, staging and history, and you passed the Git quiz.
prompt: Quiz me | Role: Examiner. Quiz me on Git with small scenarios, one at a time, getting harder: what git status shows, add vs commit, what a branch is for, what happens on a merge, what to do if I committed a secret, and how I'd undo a commit that isn't pushed yet. Tell me my level.

## p1-b | l | bonus | Bonus: pagination, rate limits and retries | 45 min | Explainer, Checker
goal: Make a script handle APIs that return data in pages and sometimes say "slow down".
learn:
- Loop through pages until one is empty. On 429, wait and retry with a growing delay.
do:
- Use the free JSONPlaceholder API (`https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10`) and loop through the pages until empty.
- Add a retry helper that tries 3 times with a 1, 2, then 4 second wait.
done: Your script gets all pages and survives one forced failure (use a wrong URL once).
prompt: Check me (Checker) | Role: Checker. Here is my pagination and retry code: [paste]. Find bugs and edge cases, such as an infinite loop or retrying a 404. Don't rewrite it.

## p1-r | l | redo | Redo without help: both sides of a webhook | 30 min | Listener
goal: Rebuild the sender and the receiver with no notes, to prove it stuck.
learn:
- Rebuild both sides of a webhook from a blank page, then explain it aloud.
do:
- Close all notes and old scripts. Create `post_again.py` and a new n8n workflow `03 receive again` from a blank canvas.
- Send `{"city": "Rotterdam", "temp": 14}` from Python, receive it in n8n, keep only `city`, and confirm it in Executions. Set a timer to see how long it takes.
- Dictate a 2-minute spoken explanation of the whole flow, as if to a client, and paste the transcript.
done: It works in under 20 minutes without help and your explanation covers request, webhook URL, items and status codes.
prompt: Check me (Listener) | Role: Listener. I rebuilt both sides of a webhook from memory in [N] minutes. Here is my spoken explanation: [paste transcript]. Compare it with how it really works and tell me exactly what I missed or got wrong. Be strict.

## p1-g | l | gate | Phase 1 exam | 30 min | Examiner, Diagnostician, Clerk
goal: Pass an exam that mixes concepts and building, then lock in the weak spots.
learn:
- Questions plus one timed build. Mistakes become flashcards.
do:
- Run the exam prompt. Answer in your own words.
- Do the timed build the examiner gives you. No notes.
- Make the flashcards and review them over the next two days.
done: At least 80% on the exam, the timed build works, and you have flashcards. You can explain webhook vs API call to a non-technical person.
prompt: Exam me | Role: Examiner. Exam me on Phase 1, one question at a time, easy to hard: GET vs POST, status codes, headers, JSON, what a webhook is, test vs production URL, items and expressions in n8n, Git basics. Then give me one timed build: send JSON from Python to an n8n webhook and keep one field, in 20 minutes. Score me out of 10.
prompt: Diagnose and flashcards | Role: Diagnostician, then Clerk. Look at my mistakes in this exam and in C:\dev\ai-automation-portfolio\mistakes.md. What one root misunderstanding is behind them? Then make 8 flashcards and save them in C:\dev\ai-automation-portfolio\flashcards\ as one tab-separated text file for this phase (question, tab, answer, one card per line) so I can import them into Anki.
