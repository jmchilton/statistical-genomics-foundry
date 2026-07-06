# MCPmed

> **arXiv:2507.08055v1** — "MCPmed: A Call for MCP-Enabled Bioinformatics Web
> Services for LLM-Driven Discovery" (Flotho et al., Saarland University /
> Helmholtz HIPS, Jul 2025). A position/initiative paper proposing that
> bioinformatics web services adopt the Model Context Protocol so agents can
> discover, invoke, and "verify" them — backed by a GEOmcp prototype, a
> cookie-cutter template, and an opensource hub (`github.com/MCPmed`,
> `mcpmed.org`). Call-to-action stage, not a finished system. Verified
> 2026-06-27 against the arXiv HTML.

## Its framing

MCPmed argues that bioinformatics databases — GEO, STRING DB, the UCSC Cell
Browser, PLSDB — are built for human browsers and fragile scraping, and should
instead expose a "standardized semantic contract layered over existing API
specifications" so LLM agents can use them directly. In their progression, a
service moves up three layers — UI → API → MCP — where the MCP layer "explicitly
associates each API endpoint with scientific concepts, along with versioned
metadata, facilitating automated discovery, invocation, and verification of
webservices." They ship a prototype (GEOmcp, exposing `search_geo_series`,
`search_geo_profiles`, `search_geo_datasets`), a cookie-cutter template for new
MCP PyPI packages, and a call for "a rigorously curated MCP app store" of
"secure, pre-vetted MCP packages." It is explicitly "A Call for" adoption: an
enabling-infrastructure vision with seed implementations, not a built platform.

## Strengths relative to our approach

The enabling-infra vision is real and well-aimed, and the Foundry benefits from
exactly this layer existing:

- **A concrete, standards-based push to make services agent-actionable.** Rather
  than each agent re-deriving how to call GEO, MCPmed wraps the endpoint once with
  a typed contract — "standardized manifests surface details such as rate limits,
  authentication, and pagination clearly, eliminating ad-hoc code and fragile
  scraping routines." This is genuinely useful plumbing.
- **A working prototype, not just a manifesto.** GEOmcp demonstrates an agent
  contextually refining a query ("microglia depletion mouse" → "CSF1R inhibitor")
  and recovering real datasets — the wiring works.
- **Community scaffolding.** A cookie-cutter template, an opensource hub, and a
  proposed curated app store lower the cost for service maintainers to join.
- **Call-side provenance.** "Concept-level versioning and audit-ready parameter
  tracking" record which endpoint, which version, which parameters produced a
  result — useful reproducibility metadata at the service boundary.
- **MCP is itself a portability standard** — one wrapped service is reachable
  from any MCP-speaking client, not bound to a single agent.

## Where it sits on our values

| Value | MCPmed |
|---|---|
| **Produces skills** | **No** — it emits MCP server packages that expose web-service endpoints as agent-callable tools, not portable, self-contained skill artifacts. The deliverable is a live tool surface, not a `SKILL.md`. |
| **Progressive disclosure** | **No** — the semantic metadata and manifests exist for *machine* discovery and invocation; there is no layered surface authored for a human to read and learn from. |
| **Traceability** | **Partial, at the call boundary** — "explicit provenance," concept-level versioning, and audit-ready parameter tracking trace *what service call was made with which version/parameters*. That is provenance of the invocation, not lineage from an authoritative knowledge source to an artifact. |
| **CLI instructions derived from CLI docs** | **N/A** — MCPmed wraps web services / REST APIs, not command-line tools. (Its sibling BioinfoMCP is the CLI→MCP case.) |
| **Portability** | **No skills produced** — but worth a nuance: MCP is itself a portability standard, so a wrapped service is callable across MCP clients. There is no runtime-agnostic *skill* artifact, though; portability is of the tool endpoint, via the protocol. |
| **Human scrutiny** | **Minimal** — the human-facing layer lives at the underlying web service's own UI; the MCP output is agent-facing. Nothing here is authored for a human to read, correct, or contribute to as knowledge. |
| **Knowledge-base backed** | **No** — it exposes external databases as live, queryable tool endpoints; the knowledge stays remote and is fetched per-call. There is no inspectable knowledge base beneath the wrapper. |

## Where it diverges from the Foundry

MCPmed strengthens the *wiring* layer — making bioinformatics services
agent-actionable through a typed, discoverable contract — which is genuinely
valuable and is a layer the Foundry happily sits atop rather than competes with.
The precision that matters is the word "verification." In MCPmed it means
verification *of the webservice and the call*: the endpoint exists, advertises a
versioned contract tagged with scientific concepts, and records audit-ready
parameters so a run is reproducible — "verify results through explicit
provenance" is provenance of *what was invoked*, not of whether the analysis is
sound. That is contract/availability/provenance verification of a service call.
The Foundry's referee gate verifies the orthogonal thing one layer down: whether
the *statistical method* beneath the result is valid — assumptions met, no
double-dipping, the named method real and appropriate, error rate actually
controlled. MCPmed can faithfully record that a confounded or invented method was
run, with perfect call-provenance, and never flag it; method validity is outside
its scope by design. It is a vision paper for the tool-exposure layer LLMs already
use well — and the Foundry's edge is the validity gate *beneath* the tool call,
not the tool's exposure. Distinct, too, from `knowledgebase-mcp`: that cluster
exposes knowledge *retrieval* (RAG) to agents; MCPmed exposes web-service *tools*.
Crux: MCPmed verifies that the call was well-formed and well-recorded; the Foundry
referees whether what the call computed is statistically true.

## Sources

- https://arxiv.org/html/2507.08055v1 — the position paper: the MCP-wrapping proposal, the UI→API→MCP layering, the GEOmcp prototype and its three search tools, the cookie-cutter template / hub / app-store call, and every use of "verification"/"provenance" (grounds the contract-vs-method-validity distinction).
