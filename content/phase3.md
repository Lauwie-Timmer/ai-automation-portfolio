# p3 | Phase 3 | AI in automations and agents | 12 | LLMs, classifiers, agents, RAG, cost and market research
intro: This is the part clients are asking about: put an AI model inside a workflow in a way that is reliable and affordable. You'll learn what an LLM actually does, build a classifier, build an agent, build a small question-answering system over documents, and learn what each run costs. You'll also research the Upwork market, so Phase 4 builds what clients ask for. Node names in n8n change a little between versions, so if one is missing, search the nodes panel for the idea.
start: Role: Interviewer. Before Phase 3, ask me 6 questions, one at a time, about what I know of LLMs, prompts, tokens, agents and RAG. Tell me which steps I can speed through.

## p3-1 | p | must | Learn how LLMs and agents work | 60 min | Explainer, Socratic, Listener
fast: yes
goal: Explain in your own words what an LLM, a token, a prompt, tool calling and an agent are, and when not to use an agent.
learn:
- An LLM predicts text, has no memory between calls and can hallucinate. You pay per token.
- An agent is an LLM in a loop with tools. Prefer a plain workflow when the steps are known.
res:
- Anthropic: Building effective agents | https://www.anthropic.com/engineering/building-effective-agents
- n8n docs: Build with AI in n8n | https://docs.n8n.io/build/integrate-ai
- Google: Gemini API docs | https://ai.google.dev/gemini-api/docs
do:
- Read the Anthropic article on building effective agents. Pay attention to "workflows vs agents".
- Open the n8n Advanced AI docs and read the introduction and the page about agents.
- Dictate a 2-minute explanation of "workflow vs agent" and of "what is a token and why does it matter for cost". Paste the transcript.
done: You can explain all of the terms above to a non-technical person and say when an agent is overkill.
prompt: Check me (Socratic then Listener) | Role: Socratic questioner, then Listener. Ask me one question at a time about LLMs, tokens, tool calling and workflow vs agent until I find my gaps. Then I'll paste my spoken explanation of workflow vs agent. Compare it with the source article and tell me what I missed.

## p3-2 | l | must | Build an AI classifier workflow | 90 min | Explainer, Checker
fast: yes
goal: Use an LLM to classify incoming messages and extract fields as JSON, then route them.
learn:
- A chat model plugs into a Text Classifier or Information Extractor. The category descriptions are the prompt.
- Test with hard inputs, not only easy ones.
res:
- n8n docs: Text Classifier node | https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.text-classifier/
- n8n docs: Information Extractor node | https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.information-extractor/
- Google AI Studio: API keys | https://aistudio.google.com/apikey
do:
- In n8n create a credential for Google Gemini using your API key (from p0-5). Don't paste it anywhere else. This free key is for **learning with fake messages only**. Google's terms require a paid account for anything you make available to users in the EU, so client work later runs on the client's own paid account.
- New workflow `08 message classifier`. **Webhook** (POST, path `classify`), then **Text Classifier** with categories `sales`, `support`, `spam`, `other`, each with a one-line description, then **Information Extractor** for `name` and `urgency` (low, medium, high).
- Route each category to a different **Edit Fields** that adds `route` such as `sales-team`.
- Write 12 test messages in a file `tests/classify.json`, including 4 hard ones. Send them with a Python loop, and record the results in a table: message, expected, got.
- Improve the category descriptions until at least 11 of 12 are correct. Note what you changed and why.
done: At least 11 of 12 test messages are routed correctly, and you can explain why the descriptions matter and why low temperature is used.
prompt: Check me (Checker) | Role: Checker. Here is my category setup and my results table of 12 messages: [paste]. Look at the wrong ones. Tell me what in my descriptions caused each mistake, without rewriting them for me. Then ask me what 3 more hard test cases I should add.

## p3-eval | l | must | Measure your AI: accuracy, precision and recall | 60 min | Explainer, Checker
goal: Turn "it seems to work" into numbers you can show a client, and re-measure every time you change a prompt.
learn:
- Measure with a labelled test set: accuracy, precision, recall. Keep a set you never tune on.
- Re-run the same tests after every change.
res:
- scikit-learn: classification metrics (explains precision, recall and the confusion matrix) | https://scikit-learn.org/stable/modules/model_evaluation.html#classification-metrics
- DeepEval: open-source LLM evaluation (optional, for later) | https://deepeval.com/
do:
- Extend `tests/classify.json` to at least 40 messages, each with its correct label. Give every category at least 6 messages, make 8 of them hard, and put 10 aside as a set you never tune on.
- In `03-ai\eval_classifier.py` write a script that sends each message to your n8n webhook, collects the category, and prints accuracy, per-category precision and recall, and a confusion matrix. Use a request timeout and a short pause between calls.
- Run it twice. Record both results in `eval-log.md` with the date and the category descriptions you used.
- Change one category description, run again, and record whether the numbers got better or worse and which messages changed.
done: Your script prints accuracy, precision, recall and a confusion matrix, your log has at least two runs, and you can explain why you keep a set you never tune on.
prompt: Check me (Checker) | Role: Checker. Here is my eval script and my log of results: [paste]. Check my metric calculations by hand for two categories. Find ways my test set could mislead me (too easy, unbalanced, tuned on). Then ask me what I'd say to a client who asks "so is it 92% safe?". Don't rewrite my script.

## p3-3 | l | must | Build an agent with two tools | 90 min | Explainer, Socratic
goal: Build an agent that decides which tool to use, and read its logs to see how it decided.
learn:
- An agent can only do what its tools allow. It picks tools from their descriptions.
- Read the Logs to see how it decided. Give it the least power.
res:
- n8n docs: AI Agent node | https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/
- n8n docs: Tools | https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcalculator/
do:
- New workflow `09 helper agent`. Use the **Chat Trigger**, then an **AI Agent** with the Gemini chat model and Simple Memory.
- Add two tools: a **Calculator** and an **HTTP Request Tool** that calls the Open-Meteo weather API. Write each tool's description in one clear sentence.
- Ask these in the chat: "What is 18% of 240?", "What is the temperature in Amsterdam now?" (give coordinates in the tool description), and "What is 15% of the temperature in Amsterdam?". Open Logs after each and write down which tools were used in which order.
- Break a tool description on purpose (make it vague) and watch what the agent does.
done: You can describe, from the logs, how the agent chose its tools, and explain why descriptions matter and why you'd restrict tool power.
prompt: Check me (Socratic) | Role: Socratic questioner. I built an agent with a calculator and a weather tool. Ask me one question at a time: how did the agent decide which tool to call, what would happen if both descriptions were vague, why does memory matter, and what is risky about giving an agent a "send email" tool. Don't give me the answers.

## p3-4 | l | must | Build a question-answering bot over your own documents (RAG) | 90 min | Explainer, Checker
goal: Answer questions from a small document set, with the answer coming from the documents and not from the model's memory.
learn:
- RAG finds relevant chunks first and gives them to the model with the question.
- Simple Vector Store lives in memory: it is empty after every restart.
res:
- n8n docs: Simple Vector Store node | https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory
- n8n docs: Retrieve relevant context (RAG) | https://docs.n8n.io/build/integrate-ai/understand-ai-components/retrieve-relevant-context
do:
- Write the text of a FAQ about ComniWell: 12 short Q&As covering what it tracks, platforms, privacy, pricing status and what's planned. Use only true statements. Save it as `comniwell-faq.md` in your repo too.
- Build workflow `10 faq loader`: **Manual Trigger**, an **Edit Fields** node with one field `text` that holds the whole FAQ (paste it in), a **Default Data Loader** (type JSON, loading the `text` field), a **text splitter** (Recursive Character Text Splitter), a **Gemini Embeddings** node and a **Simple Vector Store** in **Insert Documents** mode with Memory Key `faq`.
- Build workflow `11 faq bot`: **Chat Trigger**, **AI Agent** with the Gemini chat model, and a **Simple Vector Store** node set to **Retrieve Documents (As Tool for AI Agent)** with the same Memory Key `faq` and the same embeddings model. Give the tool a clear description. System prompt: answer only from the retrieved text; if it isn't there, say you don't know.
- Run the loader, then ask 5 questions whose answers are in the document and 3 whose answers are not. Record the results.
- Restart n8n (`docker restart n8n`) and ask again. Notice that it forgot everything, then run the loader again.
done: The bot answers the 5 in-document questions correctly and says it doesn't know for the 3 out-of-document questions. You can explain chunking, embeddings and why the system prompt matters.
prompt: Check me (Checker) | Role: Checker. Here are my 8 questions, the bot's answers and my system prompt: [paste]. Find where it hallucinated or missed, and tell me whether the cause is the chunks, the retrieval or the prompt. Ask me how I'd find out. Don't fix it for me.

## p3-m | l | must | MCP: connect agents to tools the standard way | 90 min | Explainer, Socratic
goal: Understand what MCP is, use an MCP tool inside an n8n agent, and expose one of your own n8n workflows as an MCP tool.
learn:
- MCP is a standard plug between AI apps and tools. n8n has a Client Tool and a Server Trigger.
- A server gives a model power to act: authenticate and keep tools minimal.
res:
- Model Context Protocol: introduction | https://modelcontextprotocol.io/
- n8n docs: MCP Client Tool node | https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolmcp/
- n8n docs: MCP Server Trigger node | https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.mcptrigger/
do:
- Read the MCP introduction and the two n8n node pages.
- New workflow `15 weather tool server` with an **MCP Server Trigger** and one tool (an HTTP Request Tool that returns the weather). Use authentication if the node offers it. Note the URL it shows.
- Add the **MCP Client Tool** to your agent from p3-3, point it at that URL, and ask a weather question. Open Logs and find the tool call.
- Optional: connect the same server to Claude Code on your computer (Claude Code's documentation shows the `claude mcp add` command) and call your tool from there. Disconnect it afterwards.
- Write 5 sentences: what MCP is, the two n8n directions, and two risks.
done: An agent of yours calls a tool through an MCP server you built, and you can explain MCP, both n8n directions and two risks.
prompt: Check me (Socratic) | Role: Socratic questioner. I built an MCP server trigger workflow and used it from an agent. Ask me one question at a time: what MCP is and what problem it solves, the difference between the server trigger and the client tool, what could go wrong if a tool can send emails, and what I should do before letting an AI assistant write workflows for a client. Don't give me the answers.

## p3-5 | l | must | Make AI workflows reliable: guardrails, fallbacks, logging | 60 min | Explainer, Checker
goal: Make the classifier from p3-2 safe to hand to a client.
learn:
- Models fail three ways: API errors, broken format, confidently wrong answers.
- Validate, route doubts to review, log every call, set a cost limit.
do:
- In workflow `08 message classifier` add a check after the classifier: if the category is missing or the extracted urgency isn't low, medium or high, send to a `needs review` branch.
- Add a **Google Sheets** node that logs time, message, category, urgency and route.
- Turn on **Retry On Fail** on the model call. Send 3 messages with a wrong API key to see what happens, then fix the key.
- Write 5 bullet points in `README.md` for the project: what it does, its inputs and outputs, what happens on failure, what it costs (next step) and what a human must check.
done: A broken output goes to review instead of being guessed, every call is logged, and you can explain the three failure types.
prompt: Check me (Checker) | Role: Checker. Here is my reliability setup for the classifier: [describe]. Find what could still go wrong in production, for example an empty message, a prompt-injection message ("ignore your instructions"), or an expired key. Ask me how I'd handle each. Don't fix it for me.

## p3-6 | p | must | Learn what AI costs and how to quote it | 45 min | Explainer, Examiner
goal: Estimate the running cost of an AI workflow and explain it to a client.
learn:
- Cost = (input tokens x input price + output tokens x output price) / 1,000,000.
- Quote build fee, AI usage (client's own account) and hosting separately.
res:
- Google: Gemini API pricing | https://ai.google.dev/gemini-api/docs/pricing
- Anthropic: Pricing | https://platform.claude.com/docs/en/about-claude/pricing
do:
- Open both pricing pages and write down the price per million input and output tokens for one cheap and one stronger model.
- Calculate: a classifier that gets 500 messages a day, each about 120 tokens in and 40 tokens out. What does it cost per day and per month on the cheap model, and on the stronger model?
- Write 3 sentences you could say to a client to explain these costs without jargon.
done: Your calculation is correct and your 3 sentences are clear to a non-technical person.
prompt: Quiz me (Examiner) | Role: Examiner. Give me 4 cost questions, one at a time, with different numbers (messages per day, tokens, a different model), and check my arithmetic and reasoning. Then ask me to explain the cost to a client in 3 sentences and critique it.

## p3-7 | b | must | Research the Upwork market | 60 min | Interviewer, Mapmaker
fast: yes
goal: Find out what clients actually ask for, so your portfolio matches the market.
learn:
- Read real job posts for repeated needs and the clients' own words.
- Know the red flags before you apply.
res:
- Upwork Help Center (may block automated link checkers but opens in a browser) | https://support.upwork.com/
do:
- Browse Upwork for jobs matching `n8n`, `automation`, `Make.com`, `Python API`, `chatbot`, `AI agent` and `Zapier`. Open 15 job posts.
- Make a file `market-research.md` with a table: title, what the client wants, tools named, budget, client history, could I do it after Phase 4 (yes, no, partly).
- Find the 3 most repeated needs. Write one sentence for each in the client's own words.
done: A table of 15 jobs and three repeated needs, with a plan for which one Project C should serve.
prompt: Map the market (Interviewer then Mapmaker) | Role: Interviewer, then Mapmaker. Here is my market research table and three repeated needs: [paste]. First ask me 5 questions about what I'd enjoy and be good at. Then tell me which of the three needs I should build my portfolio around, which of my Phase 4 projects should cover it, and what I'd still need to learn. Challenge my reasoning.

## p3-b | l | bonus | Bonus: build the same agent in Python | 120 min | Explainer, Checker
goal: Understand what n8n's AI Agent node hides, by writing a small tool-calling loop yourself.
learn:
- An agent loop: send messages and tools, run requested tools, repeat until a plain answer. Cap the loops.
res:
- Gemini API: Function calling (works with your free key) | https://ai.google.dev/gemini-api/docs/function-calling
- Anthropic: Tool use overview (needs a paid API account) | https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
do:
- In `03-agents` write a script with one tool (`get_temperature(lat, lon)` using Open-Meteo) and a loop that lets the model use it. Use the Gemini function-calling docs, because your free key from p0-5 works with them. Load the key from `.env` as you did in p0-5, and never print it.
done: Your script answers a weather question by calling your tool, and you can explain every step of the loop.
prompt: Check me (Checker) | Role: Checker. Here is my agent loop: [paste, without keys]. Find bugs and missing safety limits such as a maximum number of loops. Don't rewrite it for me.

## p3-r | l | redo | Redo without help: the classifier from scratch | 60 min | Listener
goal: Rebuild the classifier with a different use case and no notes.
learn:
- Rebuild the classifier for a new use case, tests first, then explain it to a nervous client.
do:
- Pick a new use case: sort customer emails of a gym into `membership`, `booking`, `complaint`, `other` and extract `member_name`.
- Build it from a blank canvas, including the review route and the logging. Write 8 test messages first.
- Dictate a 2-minute explanation as if to a client who is afraid the AI will make mistakes.
done: It works with at least 7 of 8 test messages correct, and your explanation covers testing, review routes and logging.
prompt: Check me (Listener) | Role: Listener. I rebuilt a classifier for a gym's emails from memory. Here are my test results and my spoken explanation for a nervous client: [paste]. Grade my explanation for honesty and clarity, and tell me what I missed.

## p3-g | p | gate | Phase 3 exam | 40 min | Examiner, Diagnostician, Clerk
goal: Show that you can explain and judge AI automation honestly, then lock in the gaps.
learn:
- Answer like to a sceptical business owner: mistakes, cost, agent or not. Then technical scoring.
do:
- Run the exam prompt. Answer as if the examiner is a business owner who knows nothing about AI.
- Make the flashcards and review them over the next two days.
done: At least 80% on the exam, including an honest answer on when an agent is overkill.
prompt: Exam me | Role: Examiner playing a sceptical small-business owner. Ask me one question at a time, easy to hard: what an LLM is, will it make mistakes and how I handle that, what it costs per month for 500 requests a day, workflow vs agent for their case, what happens if the AI is wrong, and what you do with their customers' data. Then switch to examiner and score my technical answers out of 10.
prompt: Diagnose and flashcards | Role: Diagnostician, then Clerk. Look at my mistakes in this exam and in C:\dev\ai-automation-portfolio\mistakes.md. What one root misunderstanding is behind them? Then make 8 flashcards and save them in C:\dev\ai-automation-portfolio\flashcards\ as one tab-separated text file for this phase (question, tab, answer, one card per line) so I can import them into Anki.
