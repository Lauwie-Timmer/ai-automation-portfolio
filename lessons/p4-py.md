## topic: Pydantic: check data before you trust it | pydantic
**Pydantic** lets you describe the shape of data as a class. When you give it data, it **checks types and required fields** and raises a clear error if something is wrong. It is ideal for validating the JSON an AI model returns (p3-2) before you act on it.

```python
from typing import Literal
from pydantic import BaseModel, Field, ValidationError

class Ticket(BaseModel):
    category: Literal["billing", "bug", "other"]   # only these values
    urgency: int = Field(ge=1, le=5)               # 1 to 5
    name: str                                      # required

good = '{"category":"bug","urgency":3,"name":"Ana"}'
bad  = '{"category":"refund","urgency":9}'

print(Ticket.model_validate_json(good))
try:
    Ticket.model_validate_json(bad)
except ValidationError as e:
    print(e)          # lists all 3 problems
```

The broken answer fails three ways: `refund` isn't an allowed category, `9` is above 5, and `name` is missing. Install with `pip install pydantic`.

Pydantic checks **shape**, not **truth**: a model can return a valid category that is still the wrong one. Keep the evaluation set from p3-eval.
cmd: `pip install pydantic` | installs Pydantic
know: Define a Pydantic model with an allowed-values field and a range
know: Validate JSON and read a ValidationError
know: Say what Pydantic can't catch
Q: What does Pydantic do when data doesn't match the model?
A: It raises a ValidationError that lists each problem (wrong type, missing field, value out of range).
Q: How do you restrict a field to a list of allowed values?
A: Use `Literal["a", "b", "c"]` as its type.
Q: Give one thing Pydantic does not catch.
A: A valid-looking but wrong answer, for example the wrong category. It checks shape, not truth.

## topic: uv and ruff | uv-ruff
**uv** is a fast tool for Python projects and virtual environments: a quicker replacement for `venv` plus `pip`. Install it with `pip install uv` (or the official installer from its docs), and check with `uv --version`.

```
uv init my-project        make a new project (pyproject.toml, .python-version, ...)
cd my-project
uv add requests           add a dependency (and create .venv + uv.lock)
uv run main.py            run a script inside the project's environment
```

Depending on the uv version, `uv init` makes a `main.py` for you or a `src/` folder instead (October 2026: a `src/` folder). If there is no `main.py`, create one yourself in the project folder with `print("hello")` or an `import requests` line, then run it.

`pyproject.toml` lists your dependencies; `uv.lock` pins exact versions so someone else gets the same ones.

**ruff** is a fast **linter** (finds mistakes such as unused imports) and **formatter** (keeps the style tidy):

```
pip install ruff
ruff check               list problems
ruff check --fix         fix the ones it can fix automatically
ruff format              reformat the code
```

Run `ruff check` on your Project B script and read every message. If one confuses you, ask what rule it is.

All of these are optional. Use them when they save time, not to impress anyone.
cmd: `uv init` | creates a new uv project
cmd: `uv add requests` | adds a dependency to the project
cmd: `uv run main.py` | runs a script inside the project's environment
cmd: `ruff check` | lists style and bug problems in your code
cmd: `ruff format` | reformats code to a standard style
know: Create a uv project, add a package and run a script
know: Run ruff to check and format
Q: Which three uv commands create a project, add a package and run a script?
A: `uv init`, `uv add <package>`, `uv run <script>`.
Q: What is the difference between `ruff check` and `ruff format`?
A: `check` finds problems (linting). `format` reformats the code style.
Q: What do `uv add` and `uv run` do?
A: `uv add` adds a package to the project; `uv run` runs a script inside the project environment.
Q: Name two things ruff can find.
A: Unused imports and other common mistakes, which `ruff check --fix` can often fix automatically.

## topic: FastAPI: make your own endpoint | fastapi
**FastAPI** turns a Python function into a **web endpoint**. That lets n8n call your own code with an HTTP Request node when no standard node does the job.

Install: `pip install "fastapi[standard]"`. Save as `main.py`:

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Names(BaseModel):
    names: list[str]

@app.post("/clean")
def clean(body: Names):
    return {"names": [n.strip().title() for n in body.names]}
```

Run it with `fastapi dev`. It listens on port **8000**, and FastAPI builds interactive docs at `http://127.0.0.1:8000/docs` where you can try it. Test it with PowerShell's `curl.exe` or the docs page: POST `{"names": ["  aNA de vries ", "BOB"]}` gives `{"names": ["Ana De Vries", "Bob"]}`. Bad input (for example `"names": "x"`) is rejected automatically with status 422, because Pydantic checks the body.

`@app.post("/clean")` means: this function answers **POST** requests at the path `/clean`.
cmd: `pip install "fastapi[standard]"` | installs FastAPI with its server
cmd: `fastapi dev` | runs the app on port 8000 with auto-reload
know: Write a FastAPI POST endpoint that takes JSON and returns JSON
know: Run it and open the /docs page
Q: What does `@app.post("/clean")` mean?
A: The function below answers POST requests at the path `/clean`.
Q: How does FastAPI reject bad input?
A: The request body is checked against the Pydantic model; if it doesn't fit, FastAPI returns a 422 error automatically.

## topic: Calling it from n8n: host.docker.internal | docker-host
n8n runs **inside a Docker container** (p0-3). From inside a container, `localhost` means *the container itself*, not your Windows PC. Your own FastAPI server is on the PC, so n8n can't reach it at `http://localhost:8000`.

Docker Desktop gives containers the special name **`host.docker.internal`**, which points at your PC. In n8n's **HTTP Request** node use:

```
POST  http://host.docker.internal:8000/clean
Body: JSON  {"names": ["  aNA de vries ", "BOB"]}
```

If n8n gets "connection refused" although the server is running, it may be listening on `127.0.0.1` only. Starting it with `fastapi dev --host 0.0.0.0` makes it reachable from the container, but it is then reachable from your whole network too. Only do that on a network you trust, and never leave it like that.

**What the endpoint exposes:** anyone who can reach port 8000 can call it. On a public server you must add **authentication** (an API key header you check) and use HTTPS. Your own PC is fine for practice; a client deployment needs both.
know: Explain why localhost doesn't work from n8n and what to use instead
know: Say what the endpoint exposes if the port were public and what to add
Q: Why does `http://localhost:8000` not work from n8n in Docker?
A: Inside the container, localhost is the container itself, not my PC. Use `host.docker.internal`.
Q: What must a client deployment of your endpoint have that your practice one doesn't?
A: Authentication (such as an API key header) and HTTPS, because otherwise anyone who can reach the port can call it.

## topic: Putting the four tools to work | practice
1. **Pydantic:** define a model for your classifier's output (a category from an allowed list, urgency, name). Parse five model answers, one of them broken, and read the errors.
2. **uv:** install it, make a fresh project and run something in it.
3. **ruff:** run `ruff check` on your Project B script (p4-2) and read what it says.
4. **FastAPI:** write `POST /clean`, run it locally, call it from n8n at `http://host.docker.internal:8000/clean`, and be able to explain why `localhost` wouldn't work.

Done when the model rejects the broken answer, ruff ran on your script and n8n successfully called your endpoint.
know: Complete the four practice tasks
Q: What is the sequence of the four practice tasks?
A: Pydantic model with a broken answer, a fresh uv project, ruff on the Project B script, and a FastAPI `/clean` endpoint called from n8n.
