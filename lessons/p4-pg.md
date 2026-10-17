## topic: Why Simple Vector Store isn't enough | why
The **Simple Vector Store** you used in p3-4 keeps its chunks **in memory**. When n8n restarts, everything is gone, and n8n describes it as meant for development. A bot that forgets its knowledge every restart can't go to a client.

A real project keeps its embeddings in a **database**. That way the knowledge survives restarts, can be updated one entry at a time, and can be looked at (and deleted) with ordinary tools.

| | Simple Vector Store | Supabase vector store |
|---|---|---|
| Where it lives | n8n's memory | a Postgres table |
| After `docker restart n8n` | gone | still there |
| Good for | quick experiments | anything a client keeps using |
cmd: `docker restart n8n` | restarts the n8n container (your memory store is wiped, the database one survives)
know: Say why the Simple Vector Store isn't for clients
know: Say what survives a restart and what doesn't
Q: Why isn't the Simple Vector Store fit for a client?
A: It keeps data in memory, so it is lost on every restart and is meant for development only.
Q: After `docker restart n8n`, which store still has its data?
A: The Supabase (Postgres) one. The in-memory store is empty.

## topic: pgvector, tables and the search function | pgvector
**pgvector** is a Postgres extension that adds a `vector` column type and similarity search. Supabase has it. You store each chunk's **text**, **metadata** and **embedding** in one row, and ask the database for the rows whose embedding is **nearest** to the embedding of the question.

Setup in the Supabase **SQL Editor** (this is Supabase's LangChain quickstart, which n8n's node expects; it is on Supabase's docs under "LangChain"):

```sql
create extension vector with schema extensions;

create table documents (
  id bigserial primary key,
  content text,
  metadata jsonb,
  embedding extensions.vector(1536)
);

create function match_documents (
  query_embedding extensions.vector(1536),
  match_count int default null,
  filter jsonb default '{}'
) returns table (id bigint, content text, metadata jsonb, similarity float)
language plpgsql as $$
#variable_conflict use_column
begin
  return query
  select id, content, metadata,
         1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where metadata @> filter
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;
```

Read it so you know what you made:
- a **documents table**: text (`content`), `metadata` as JSON, and the `embedding` column;
- a **function** `match_documents` that takes a question's embedding and returns the closest rows; `<=>` is the *cosine distance* operator, and `1 - distance` is a similarity score;
- n8n's **Supabase Vector Store** node has a **Table Name** setting (you type `documents`) and a **Query Name** setting whose default is `match_documents`, so these names fit with almost no extra settings.

> Note: you don't need an index while the table is small (a few hundred rows). Add one later if it grows.
know: Say what pgvector adds to Postgres
know: Say what the documents table and the match function are for
know: Enable the extension and create the table and function in the SQL Editor
Q: What does pgvector add?
A: A `vector` column type and similarity search inside Postgres.
Q: What are the table and the function for?
A: The table stores each chunk's text, metadata and embedding. The `match_documents` function returns the rows nearest to a question's embedding.
Q: What does `<=>` do in the function?
A: It is the cosine distance between two embeddings; smaller means more similar.

## topic: Embedding size must match | dimension
The number in `vector(N)` is the **dimension**: how many numbers each embedding has. It has to equal what your **embedding model** outputs. If it doesn't, inserts fail with an error like "expected 1536 dimensions, not 3072", or search breaks. And you must never mix embeddings from two different models in one table: their numbers mean different things.

The example SQL uses 1536 (OpenAI's size). **Gemini embedding models** use 3072 by default, and Google recommends 768, 1536 or 3072 (checked October 2026). So:

1. Check which model your n8n Gemini embeddings node uses and what size it outputs.
2. Create the table and function with that same number (change all three places: the table and the function's parameter).
3. If an insert complains, read the numbers in the error, drop the table and function, and recreate them with the right size.
4. Write the model name and size in your notes.

To check what is stored later: `select vector_dims(embedding) from documents limit 1;`

> Note: Postgres can only build a fast index for vectors up to about 2,000 dimensions. That is another reason to prefer 768 or 1536 for a real project. For a small FAQ you need no index.
know: Say what the number in vector(N) means and what it must equal
know: Say what to do when an insert reports the wrong dimension
Q: What does `vector(1536)` mean and what must it match?
A: Each embedding has 1536 numbers; that must equal the output size of the embedding model.
Q: Your insert fails with a dimension error. What do you do?
A: Read the sizes in the error, recreate the table and function with the model's size, and keep using the same model.
Q: Why must you not mix two embedding models in one table?
A: Their numbers mean different things, so similarity between them is meaningless.

## topic: Rebuild the loader and the bot | build
**Credentials:** the n8n Supabase credential from p4-1 (project URL as Host, secret key).

**Loader (rebuild `10 faq loader`):** Manual Trigger, Edit Fields (the FAQ text), then the **Supabase Vector Store** node in **Insert Documents** mode, table `documents`, with a **Default Data Loader**, a **Recursive Character Text Splitter** and your **Gemini Embeddings** node attached. Set **Table Name** to `documents`.

**Bot (rebuild `11 faq bot`):** Chat Trigger, AI Agent with the Gemini chat model, and the **Supabase Vector Store** node in **Retrieve Documents (As Tool for AI Agent)** mode, with a clear tool description, the same table, query name and the **same embeddings model**.

**Test:** ask 5 questions that are in the document and 3 that aren't (the bot must say it doesn't know). Then run `docker restart n8n`, wait for n8n to come back, and ask again. It should still answer.

Look in the Supabase Table Editor: you will see the text in `content`, the JSON in `metadata`, and the long list of numbers in `embedding`.

**Two things that go wrong with real data:**
- **Duplicates:** if you run the loader twice, every chunk is inserted twice. Clear the table first (`delete from documents;` in the SQL Editor, with care) or load only new text.
- **Private data:** the table holds whatever you embed. Don't embed secrets or real client data in a practice project, and keep RLS on.

**Updating one answer:** the node has an **Update Documents** mode that changes an entry by its **ID**, so you can fix one FAQ without reloading everything.
know: Build the loader with Insert Documents and the bot with the agent-tool mode
know: Show that the bot still answers after docker restart n8n
know: Say how to avoid duplicate rows and how to update one answer
Q: Which node mode inserts the FAQ and which lets the agent use it as a tool?
A: Insert Documents for the loader; Retrieve Documents (As Tool for AI Agent) for the bot.
Q: What happens if you run the loader twice and how do you avoid it?
A: Every chunk is inserted twice. Clear the table first or only load new text.
Q: How would you change one FAQ answer without reloading everything?
A: Use the node's Update Documents mode with that row's ID.

## topic: Quality levers and when to use which store | quality
Retrieval quality depends on a few things you control:
- **Chunk size and overlap** (p3-4): too small loses context, too big dilutes the match.
- **Metadata filters:** store fields such as `source` or `topic` in `metadata`, and filter on them so the bot only searches the right part.
- **"I don't know" instruction:** tell the agent to say it doesn't know when retrieval returns nothing relevant, instead of inventing an answer.

**Which store when:** use the Simple Vector Store to experiment quickly. Use Supabase pgvector as soon as something must keep working or be updated, which means anything a client uses.
know: Name three levers that improve retrieval
know: Say when to choose each store
Q: Name three things you can adjust to improve a RAG bot.
A: Chunk size and overlap, metadata filters, and an "I don't know when unsure" instruction.
Q: In your own words: when is each of the two stores the right choice?
A: Simple Vector Store for quick experiments. Supabase pgvector for anything that must survive restarts or be updated, like a client project.
