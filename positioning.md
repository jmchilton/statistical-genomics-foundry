# Positioning — how this project is distinct (and where it complements)

> Working doc. **Tone contract:** every system here is good at what it does. We link to it, credit its strengths honestly, and claim distinctness only on axes we can defend. The goal is to locate ourselves, not to diminish anyone. Where a "distinction" turns out false on verification, we strike it — positioning built on a strawman is worse than no positioning.

## Axes of distinction (the dimensions we claim)

These are the foundry-pattern properties. For each prior-art system we ask: which axes does it already occupy, and which does it leave open?

| # | Axis | What it means here |
|---|---|---|
| 1 | **Builds reusable skills (casts portable artifacts)** | Mold → Cast: condensed, frozen, self-contained skill artifacts — vs running as a monolithic in-session agent that leaves nothing reusable behind. |
| 2 | **Maintains an inspectable knowledge base** | A navigable source-of-truth (patterns, references, provenance) you can audit — vs opaque agent internals. |
| 3 | **Foregrounds knowledge for a human** | A site a person can read, browse, and learn from (progressive disclosure) — vs a black box that only emits results. |
| 4 | **Referees statistical validity via empirical gates** | The analyze → referee → revise loop; non-self-certifying; gate runs empirical checks (null/permutation/simulation/calibration) — vs productivity-first or self-certifying-by-reasoning. |
| 5 | **Corpus-grounded + provenance** | Abstractions traceable to real exemplars; derived artifacts record how they were produced. |
| 6 | **Portable across runtimes** | Cast targets (Claude skill, generic, baked-in) — vs bound to one agent framework. |

A system can be excellent and still leave most of these open — that's the point of the map, not a knock.

---

## Systems

### Biomni (Stanford) — https://biomni.stanford.edu/  ·  github.com/snap-stanford/Biomni
**Status: verified** (primary sources; full report `content/research/projects/biomni.md`). _Note: the `/about` URL 404s; live site is the root._

**What it is (its framing):** a general-purpose biomedical AI agent that autonomously executes research tasks across 25 domains, integrating LLM reasoning + retrieval-augmented planning + code execution over a unified machine-mined environment (Biomni-E1). Python package (`A1` agent, `agent.go(...)`) + free hosted no-code web app; Apache-2.0; community tool-contribution pipeline (toward Biomni-E2).

**Genuine strengths (credit these, link out):** real breadth and autonomy; a large unified environment mined from tens of thousands of publications; **wet-lab-validated** results (molecular cloning); strong zero-shot benchmark generalization; open + community-driven; accessible no-code GUI with traceable outputs.

**Axis map:**

| Axis | Biomni | Us |
|---|---|---|
| 1 Builds reusable/portable artifacts | Builds tools into *its own* agent registry; runs in-session (export = PDF of the conversation) | Casts frozen, self-contained skills portable across runtimes |
| 2 Inspectable KB | Tool/know-how descriptions are human-readable **at source** (repo), but machine-facing (a `ToolRetriever` substrate) — no rendered KB | Navigable human KB, source-of-truth + provenance |
| 3 Foregrounds knowledge for a human | **No** — site foregrounds *using the agent* | Yes — a site you read and learn from (progressive disclosure) |
| 4 Empirical-validity referee | Has **LLM self-critique** in-loop; leans on human oversight + wet-lab for correctness | Adds an *independent empirical* referee (null/permutation, simulation-under-truth, calibration) — automates a check Biomni delegates to humans |
| 6 Portable across runtimes | Framework-bound (own Python env, data lake) | Cast targets |

**Defensible one-liner (gracious):** *Biomni is a powerful agent for **doing** biomedical analysis; we are the inspectable human knowledge layer that **casts portable skills** and adds an **independent empirical referee** for statistical validity — automating a correctness check Biomni intentionally leaves to human oversight. Complementary, not competing.*

**Do NOT claim (verified-false / unfair):**
- ❌ "Biomni has no self-checking" — it has self-critique workflows. Say *self-grading reasoning vs independent empirical referee*.
- ❌ "Biomni's substrate is uninspectable" — it's human-readable in-repo. Say *not foregrounded as a navigable human KB*.
- ❌ "Biomni doesn't build reusable capability" — it builds tools into its own registry. Say *not portable, cross-runtime, frozen artifacts*.
- ❌ Framing our referee as filling a void — frame as *automating* a check Biomni delegates to humans.

### POPPER (Stanford, ICML 2025) — github.com/snap-stanford/POPPER · arxiv.org/abs/2502.09858
**Status: verified** (repo + full paper; report `content/research/projects/popper.md`). **Our nearest neighbor on the referee axis — handle with care.**

**What it is:** an agentic framework for rigorous automated validation of *free-form hypotheses* via Popperian falsification. Decomposes a hypothesis into falsifiable sub-hypotheses, designs+runs experiments (each yielding a p-value), aggregates p→e-values in a sequential test with **provable Type-I error control**. Python library (`Popper(llm=...).validate(...)`).

**Genuine strengths (credit fully):** principled sequential-testing math (e-values, Vovk–Wang) with real error control under adaptive LLM-generated tests; clean falsification framing; domain-general; uses permutation tests **and negative controls**; expert-validated; ICML 2025; open-source.

**Axis map:**

| Axis | POPPER | Us |
|---|---|---|
| 4 Empirical-validity referee | **SHARED** — genuinely empirical, non-self-certifying, error-controlled. *Not ours to claim.* | Same posture — but different **unit** (below) |
| 4′ **Unit refereed** | A **hypothesis vs data**; *assumes* each experiment yields a **valid p-value** (Assumption 1) | The **method/procedure itself** — assumptions met? double-dipping? named method real? error rate truly controlled? = the layer POPPER trusts as input |
| 1 Builds reusable/portable artifacts | In-process library call → results object | Casts frozen, portable, cross-runtime skills |
| 2 Inspectable KB | Code + LLM prompts | Human-inspectable source-of-truth + provenance |
| 3 Foregrounds knowledge for a human | **No** — code-only, no navigable KB | Yes — KB with progressive disclosure |
| 6 Portable across runtimes | Tied to its Python stack | Cast targets |

**Defensible one-liner (gracious):** *POPPER is the closest work to ours and a genuine empirical referee — we credit its error-control fully. The difference is the **unit**: POPPER controls error over the falsification *decision*, trusting each experiment to produce a valid p-value; we referee the prior question — **is the method producing that p-value itself valid?** And we deliver it as a foregrounded, inspectable knowledge base that casts portable skills, not an in-process library.*

**Do NOT claim:**
- ❌ that the empirical-referee axis is uniquely ours — it is **shared**; POPPER uses negative controls + permutation tests with provable Type-I control.
- ❌ that POPPER's checks are weak or non-empirical — refuted, unfair.

---

## Running observation — axis 3 is the most durable differentiator
Across **every** system verified (Biomni, POPPER, the knowledgebase-mcp cluster) and surveyed (GenoTEX, awesome-genomic-skills, Analyst-Inspector, AI Scientist), **axis 3 — foregrounding knowledge for a human to read and learn from — is refuted for all of them.** They are agents, frameworks, libraries, skill-indexes, or retrieval servers; none is a navigable knowledge base with progressive disclosure. Axis 4 (empirical referee) is partly shared with POPPER; axes 1/2/6 vary. "A human-foregrounded, inspectable KB" appears to be **uncontested white space** — lead positioning with it, alongside the *unit-refereed* distinction.

**Sharpening (from the knowledgebase-mcp review):** axis 2 and axis 3 are distinct, and the gap between them is the point. Several systems store knowledge *inspectably* (plain files, git-friendly) — they pass axis 2 at the storage layer. But inspectable-by-an-operator ≠ **foregrounded-for-a-learner.** The test isn't "can a human open the files," it's "is there a reading/learning destination with progressive disclosure." Everyone surveyed offers, at most, an **operator/curator surface** (a CLI, a repo of files an agent retrieves from). Nobody offers a **reader's surface.** Our differentiator is precise: *knowledge authored to be read and learned by humans, not merely stored for an agent to retrieve.*

## Where we are distinct — three pillars (each our nearest-neighbor's blind spot)

Each strong prior-art system is closest on a *different* axis; verifying each one located a distinct pillar. The honest positioning is the union of three, not any single claim:

1. **Source → cast → provenance** *(vs. bioSkills, nearest on "builds skills").* Their skill files **are** the source, hand-authored. Ours are **derived artifacts** cast from an inspectable abstract source-of-truth, each carrying provenance. — *the layer beneath the artifact.* (Cleanest, fully verified, no hedge.)
2. **Refereeing the method's validity** *(vs. POPPER, nearest on "empirical referee").* POPPER controls error over the falsification *decision* while **assuming each experiment yields a valid p-value**. We referee the layer it trusts: is the method producing that p-value itself valid? — *the layer beneath the p-value.*
3. **Foregrounding knowledge for a human** *(vs. everyone).* Refuted for every system checked. The precise line (from the knowledgebase-mcp review): operator-inspectable storage ≠ a reader's progressive-disclosure surface. — *the human surface above the artifact.*

Rhetorical shape: pillars 1 & 2 are both "the layer **beneath**" (the artifact; the p-value); pillar 3 is the human surface **above**. We own the bottom and the top of the stack; the middle (the skill artifact, the empirical check) is shared and we credit it.

**Conceded similarities (never claim as ours):** building skills (bioSkills), multi-runtime portability (bioSkills), running empirical non-self-certifying checks (POPPER), inspectable file storage (knowledgebase-mcp), self-critique (Biomni).

### awesome-genomic-skills — github.com/GoekeLab/awesome-genomic-skills
**Feature it — a genuinely useful index, complementary to us.** A curated "awesome-list" of genomics agent skills + MCP servers + benchmarks across Claude Code / Copilot / Codex. (External project; not affiliated.)

**Strengths (credit, link out):** a real discovery surface for the agent-skills ecosystem; tracks skills, MCP servers, and benchmarks in one place; low-friction, community-curated.

**Axis map / relationship:** it is an **index that points outward** to skills others authored; we **author + referee** skills and **foreground the knowledge**. It is human-readable (a markdown list) but a *catalog*, not a navigable knowledge base with progressive disclosure (axis 3), and by its own framing it does not mandate statistical rigor (axis 4). **Complementary, not overlapping:** our cast skills could be *listed there*; it is a distribution/discovery layer, we are the authoring + knowledge + referee layer.

### bioSkills (GPTomics) — github.com/GPTomics/bioSkills  ·  see `content/research/projects/bioskills.md`
**Status: verified. Our nearest neighbor on the "repository of skills" axis — and more formidable than a quick read suggests. Three hypothesized limitations were refuted.**

**What it is:** ~547 SKILL.md files across 63 bioinformatics categories (+ ~41 workflow skills), ~952★, v3.0 (Feb 2026), by GPTomics (also ships `bioTaskBench`). Serious, broad, actively maintained.

**Genuine strengths (credit fully):** **CLI-version rigor is their signature** — mandatory `## Version Compatibility` blocks, introspection commands, "adapt to the installed API rather than retry," Per-Tool Failure-Mode templates, a 19-point lint. **Multi-runtime** (Claude, Codex, Gemini/Antigravity, OpenCode, OpenClaw + conversion). **Excellent embedded statistical wisdom** ("thresholds are conventions not laws", confound callouts w/ citations). Structured relationship fields (`depends_on`, `qc_checkpoints`, `Related Skills`).

**Refuted hypotheses (don't claim these):**
- ❌ "Claude-only / one runtime" — **false**, multi-runtime + conversion.
- ❌ "skills not for human consumption" — they're conversational human prose.
- ❌ "no formal related-skills" — they have `depends_on`/`qc_checkpoints`/`Related Skills` (format-validated).

**Axis map:**

| Axis | bioSkills | Us | Verdict |
|---|---|---|---|
| 1 Builds skills | YES (hundreds) | YES | **SIMILARITY — concede** |
| 6 Multi-runtime | YES (5 + conversion) | YES (cast targets) | **SIMILARITY — concede** |
| + Formal relationships | structured fields, **format-validated, not cross-file resolved** | wiki-links + Pipelines + schema refs, **machine-checked resolution** | Holds, narrow — edge is *resolution* + ordered Pipelines |
| 2/3 Human-foregrounded KB | readable prose files; no navigable site/MOC/progressive disclosure | navigable reader's KB | Holds — *no reader's surface*, NOT "agent-only" |
| 4 Empirical validity referee | none (lint + benchmark; strong embedded stats *content*) | independent empirical referee | Holds — credit their stats content |
| **+ Source→cast + provenance** | **none — skill files ARE the source** | abstract Molds → deterministic+LLM **cast** → per-artifact **provenance** | **Holds strongly — cleanest distinction** |

**Defensible one-liner (gracious):** *bioSkills is the artifact layer done very well — broad, multi-runtime, disciplined about CLI versions. We argue for the **layer beneath it**: an inspectable abstract source-of-truth that **casts** skills (with provenance), a **machine-checked** relationship/pipeline graph, a **human reader's** knowledge surface, and an **empirical validity referee**. A different layer of the stack, not a better skills list.*

> Self-check resolved: the existing Galaxy Foundry `AGENTS.md` confirms `npm run validate` does schema + **cross-file resolution**, and the Mold-inventory invariant is machine-checked (every pipeline phase resolves to a real Mold note). So the "machine-checked resolution" edge over bioSkills' format-validated paths is real.

### "knowledgebase-mcp" (a name-cluster, not one project) — see `content/research/projects/knowledgebase-mcp.md`
**Status: verified.** ⚠️ **Disambiguation:** there is no single canonical `knowledgebase-mcp`. The name resolves to a cluster of agent-facing retrieval MCP servers — `jeanibarz/knowledge-base-mcp-server` (exact-name match, ~48★), `Geeksfino/kb-mcp-server` (most stars ~70★, tar.gz-portable), `olafgeibig/knowledge-mcp` (LightRAG). None science-specific. _If you meant a specific repo, confirm the owner — but the finding holds across all of them._

**What they are:** point at a folder of docs → chunk + embed into a vector store → expose MCP tools (`retrieve_knowledge`, `ask_knowledge`) so an LLM client queries the corpus mid-reasoning. Plus (some) an operator CLI to build/search/curate.

**Strengths (credit):** transparent git-friendly storage (source docs stay plain-readable); citation-grounded retrieval with source paths/line ranges; corpus portability (tar.gz, `uvx`); hybrid vector+graph retrieval.

**Axis map:**

| Axis | knowledgebase-mcp | Us |
|---|---|---|
| 1 Builds portable artifacts | A server you run → a queryable index (tar.gz = portable *corpus*, not a skill) | Cast frozen, portable *skill* artifacts |
| 2 Inspectable KB | **Yes — but operator-inspectable** (files on disk; transparent) | Inspectable *and authored as a reader's KB* |
| 3 Foregrounds knowledge for a human | **No** — agent-retrieval + (at most) an **operator/curator CLI**; no reading/learning surface | Yes — a navigable site, progressive disclosure |
| 4 Empirical-validity referee | None (retrieval-quality eval ≠ validity) | Independent empirical referee |
| 6 Portable across runtimes | Bound to MCP protocol/stack (multi-client but a running server) | Cast targets |

**Relationship — complement / potential backend, not competitor:** it's the canonical example of *agent-facing retrieval with the human-reading surface absent*. It sits in the layer *beneath* our question. One (e.g. Geeksfino) could even be a **RAG backend we use** to expose our authored content to agents — orthogonal to, and downstream of, our differentiator. Gracious line: *it solves "let an agent search my docs" well; it isn't trying to solve "let a human read and learn."*

**Do NOT claim:** ❌ "its knowledge is opaque" (files are plain-readable). ❌ "no human interface" (there are operator CLIs). The precise line is **operator-inspectable storage ≠ knowledge foregrounded for a human learner.**

### (later) GenoTEX/GenoAgent · Analyst-Inspector · AI Scientist · nf-core · OSCA/Bioconductor
Each gets a row once verified. Analyst-Inspector is next-closest on axis 4 (referees *reproducibility*, not validity).
