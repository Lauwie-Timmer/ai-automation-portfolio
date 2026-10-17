## topic: The agent loop | loop
Writing the loop yourself once makes n8n's AI Agent node, and any framework, much easier to understand. The loop is:

1. Send the **messages** and the **tool definitions** to the model.
2. If the model asks for a tool: **run it** in your code, **add the result** to the messages, and go back to step 1.
3. If it answers in plain text: **stop** and return the answer.

Add a **maximum number of loops** (for example 5). Without it a confused model can loop forever and run up cost.
know: Describe the three steps of the agent loop and why to cap it
Q: Why add a maximum number of loops?
A: A confused model could keep calling tools forever and cost money.

## topic: Build it with Gemini function calling | build
In `03-agents` write a script with **one tool**, `get_temperature(lat, lon)`, which calls Open-Meteo, and a loop that lets the model use it. Use the Gemini **function calling** docs (your free key from p0-5 works). Load the key from `.env` as in p0-5 and **never print it**. Fake or public data only.

Done when your script answers a weather question by calling your tool, and you can explain every step of the loop.
know: Write a tool-calling loop with a loop limit
Q: Where does the key come from in your script, and what must you never do with it?
A: From `.env` via python-dotenv. Never print it.
