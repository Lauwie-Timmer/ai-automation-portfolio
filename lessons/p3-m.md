## topic: What MCP is | mcp
**MCP (Model Context Protocol)** is an open standard for connecting AI applications to tools and data. Think of it as a common plug.

- An **MCP server** offers tools ("get weather", "search tickets").
- An **MCP client** (Claude, an agent, an n8n node) **discovers** those tools and **calls** them.

The problem it solves: without a standard, every AI app needs a one-off integration with every tool. With MCP, one server works with many clients.
know: Explain MCP, server and client
Q: What is an MCP server and what is an MCP client?
A: A server offers tools. A client (Claude, an agent, an n8n node) discovers and calls them.
Q: What problem does MCP solve?
A: It replaces one-off integrations with a common standard, so one tool server works with many AI apps.

## topic: The two directions in n8n | n8n-directions
n8n works both ways:

| Node | Direction | What it does |
|---|---|---|
| **MCP Client Tool** | n8n agent **uses** a server | lets an agent call tools from an MCP server. You give it the **SSE Endpoint** URL, choose authentication, and choose **Tools to Include** (All, Selected, All Except) |
| **MCP Server Trigger** | n8n **is** a server | lets a workflow act as an MCP server, so tools you build in n8n can be used by Claude or other clients. It only connects to **tool nodes**; it isn't a normal trigger |

The Server Trigger has a **Test URL** and a **Production URL** (like the webhook), **authentication** options (None, Bearer, Header), and a random **path** by default. Use authentication.
know: Tell the MCP Client Tool from the MCP Server Trigger
Q: Which node lets an agent call tools of another MCP server, and which exposes your tools?
A: MCP Client Tool calls tools of a server. MCP Server Trigger exposes my n8n tools as a server.
Q: What can you attach to an MCP Server Trigger?
A: Only tool nodes, such as an HTTP Request Tool.

## topic: Security and authoring with AI | mcp-security
An MCP server gives a model the **power to act**. So:
- expose the **smallest set of tools** you can
- use **authentication**
- never expose a tool that **deletes data or sends messages** without a human approval step
- a malicious or poisoned **tool description** is a form of **prompt injection** (p3-1)

**Authoring with AI:** a community package, `n8n-mcp`, lets an AI assistant such as Claude Code look up n8n's nodes and help write and edit workflows through n8n's API. It can speed you up, but **learn n8n yourself first**, because that is what lets you review its work. Rules if you use it:
1. use a **development** n8n, never a client's
2. never give it **production keys**
3. **review and test** every workflow it writes
4. tell the client you use AI tools (you'll write your AI-use policy in Phase 5)
know: Name two MCP risks and the rules for AI-assisted authoring
Q: Name two risks of MCP.
A: A tool that can act (delete, send) misused or tricked, and a poisoned tool description acting as prompt injection.
Q: Name three rules for letting an AI assistant write workflows.
A: Use a development n8n, never give it production keys, review and test everything, and tell the client.

## topic: Build it | build
1. Read the MCP introduction and the two n8n node pages.
2. New workflow `15 weather tool server`: an **MCP Server Trigger** with one tool (an HTTP Request Tool that returns the weather). Use authentication. Note the URL it shows.
3. Add the **MCP Client Tool** to the agent from p3-3, point it at that URL, ask a weather question, and find the tool call in **Logs**.
4. Optional: connect the same server to Claude Code on your computer (Claude Code's docs show the `claude mcp add` command) and call your tool from there. Disconnect it afterwards.
5. Write 5 sentences: what MCP is, the two n8n directions, and two risks.

Done when an agent of yours calls a tool through an MCP server you built, and you can explain MCP, both n8n directions and two risks.
know: Call your own MCP tool from an agent and find it in the Logs
Q: How do you prove the agent used the MCP tool?
A: Open the agent's Logs and find the tool call to the MCP Client Tool.
