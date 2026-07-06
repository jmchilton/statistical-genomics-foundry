# knowledgebase-mcp

> A cluster of independently-maintained, similarly-named **agent-facing
> knowledge-retrieval MCP servers** — no single canonical repo. Reviewed:
> `jeanibarz/knowledge-base-mcp-server` (exact name; FAISS),
> `Geeksfino/kb-mcp-server` (most stars; txtai, portable `.tar.gz`),
> `olafgeibig/knowledge-mcp` (LightRAG). None is genomics-specific. Verified
> 2026-06-26 against the three repos.

## Its framing

Each is a knowledge-retrieval server: point it at a folder of documents (or a
`.tar.gz` archive), it chunks and embeds them into a vector store (FAISS / txtai /
LightRAG), and exposes MCP tool calls — `retrieve_knowledge`, `ask_knowledge`,
semantic or graph search — so an LLM client (Claude Desktop, Cursor, Cline)
queries the corpus mid-reasoning. The source files stay as readable text on disk;
some ship an operator CLI for build / search / curate. The product surface is a
retrieval API for an agent, not a destination a human reads.

## Strengths relative to our approach

- **Transparent, git-friendly storage** — source docs stay plain-readable,
  "nothing is obfuscated"; the index is derived.
- **Citation-grounded answers** — `ask_knowledge` returns answers with citations;
  chunk metadata carries source paths and line ranges.
- **Corpus portability** — entire knowledge bases save as compressed archives,
  shareable and loadable in one command (runnable via `uvx`, no install).
- **Hybrid vector + graph retrieval** (txtai, LightRAG) — beyond naive RAG.
- **Operator ergonomics** — diagnostics (`kb doctor`), retrieval testing
  (`kb eval`), guarded mutation paths.

## Where it sits on our values

| Value | knowledgebase-mcp |
|---|---|
| **Produces skills** | **No** — a server you run; the output is a queryable index. A `.tar.gz` is a portable *corpus*, not a self-contained skill. |
| **Progressive disclosure** | **No** — knowledge exists to feed an agent via retrieval; where a human surface exists at all it is an operator/curator CLI, not a reader's layered learning surface. |
| **Traceability** | **Yes, at the storage and citation layer** — source files stay plain text and git-friendly, and answers carry citations with source paths and line ranges. Strong here — but operator-facing, not a reader's foregrounded surface. |
| **CLI instructions derived from CLI docs** | **N/A** — the CLI is an operator console for the index, not derived CLI-tool invocation. |
| **Portability** | **Partial** — bound to MCP as the agent interface (many clients, one protocol); the corpus is portable (`.tar.gz`), but there is no runtime-agnostic skill artifact. |
| **Human scrutiny** | **Partial** — knowledge is stored inspectably as files (operator-inspectable), but not foregrounded for a human to read and learn; no skills are produced. |
| **Knowledge-base backed** | **Yes** — it *is* a knowledge base, but an agent-facing retrieval one, not a human-foregrounded reading surface. |

## Where it diverges from the Foundry

knowledgebase-mcp is the canonical instance of the pattern the Foundry keeps
observing: agent-facing retrieval with the human-reading surface absent. It is a
substrate an agent queries (a RAG / retrieval backend), not a destination a human
learns from; it builds no portable skill artifacts and does no validity
refereeing. The relationship is complement, not competition — one of these (most
plausibly the `.tar.gz`-portable Geeksfino server) could be a *backend component*
for exposing Foundry content to agents via retrieval, orthogonal to and downstream
of the Foundry's differentiator: a navigable human knowledge base cast into
portable, provenance-stamped skills.

## Sources

- https://github.com/jeanibarz/knowledge-base-mcp-server — exact name; FAISS; plain-text storage.
- https://github.com/Geeksfino/kb-mcp-server — most-prominent; txtai; `.tar.gz` portability; `uvx`.
- https://github.com/olafgeibig/knowledge-mcp — LightRAG; explicit "agent-facing, not for human learning."
