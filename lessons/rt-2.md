## topic: Workflow versus agent | workflow-agent
A **workflow** has steps you **fixed in advance**: the same path every time (for example classify an email, then file it). An **agent** is a model in a **loop** with **tools**: it decides at run time which step to take next, looks at the result and repeats until it can answer.

**Use a workflow when you know the steps.** It is **cheaper, faster and predictable**. An agent adds latency, cost and errors that can compound across steps, so it is **overkill** when the path doesn't depend on the input. Use an agent when the path really depends on the input (a question that may need a search, then a calculation, then a lookup).

**Examples to say out loud to a non-technical person:**
- Workflow: "Every new signup is copied to a sheet and I get an email." Same steps each time.
- Agent: "A chat assistant that decides whether to look up an FAQ answer or save a lead, depending on what the visitor says."
know: Explain workflow versus agent with an example of each
know: Say when an agent is overkill
Q: What is the difference between a workflow and an agent?
A: A workflow has fixed steps; an agent decides its steps at run time using tools, in a loop.
Q: A client wants every email sorted into one of four folders. Workflow or agent?
A: A workflow: the steps are known, so it is cheaper, faster and predictable. An agent would be overkill.
Q: Give one example of each for a non-technical person.
A: Workflow: each new signup is logged and emailed, the same every time. Agent: a chat assistant that chooses between answering from the FAQ and saving a lead.
