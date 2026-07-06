# Biomni

> **biomni.stanford.edu · github.com/snap-stanford/Biomni** — "a general-purpose
> biomedical AI agent designed to autonomously execute a wide spectrum of research
> tasks across diverse biomedical subfields." Apache-2.0; a hosted no-code web app
> plus a Python package. Verified 2026-06-26 against the repo README/DETAILS and
> the preprint abstract.

## Its framing

Biomni integrates LLM reasoning, retrieval-augmented planning, and code execution
over a unified agentic environment (Biomni-E1) machine-mined from tens of
thousands of publications across 25 biomedical domains — tools, databases, and
protocols. It is distributed as a Python package: an agent class `A1(...)` driven
in natural language (`agent.go(...)`), with a public hosted GUI, a community
tool-contribution pipeline (toward Biomni-E2), and benchmark plus
wet-lab-validated results. The design goal is autonomy "without relying on
predefined templates or rigid task flows."

## Strengths relative to our approach

- **Breadth and autonomy** across 25 biomedical domains — dynamic multi-step
  composition with no predefined templates.
- **Scale of environment** — a unified agentic environment machine-mined from tens
  of thousands of publications.
- **Real wet-lab validation** (molecular cloning: colony growth + sequencing) —
  beyond in-silico benchmarks.
- **Zero-shot generalization** across heterogeneous tasks with no task-specific
  tuning.
- **Openness and community** — Apache-2.0, a structured contribution pipeline, a
  specialized reasoning model (Biomni-R0).
- **Accessibility** — a free hosted no-code GUI with traceable outputs.

## Where it sits on our values

| Value | Biomni |
|---|---|
| **Produces skills** | **No** — an in-session agent (`A1` / `agent.go`); the only export is "save the conversation as a PDF." Capabilities are integrated into the agent's environment for retrieval, not emitted as portable artifacts. |
| **Progressive disclosure** | **No (as we mean it)** — the substrate is a machine-retrieved tool/know-how library the agent pulls automatically (`ToolRetriever`); there is no layered human-facing disclosure surface beyond Jupyter tutorials. |
| **Traceability** | **Partial** — tool and know-how descriptions live in the repo and are human-readable, and the hosted GUI returns traceable outputs; but the substrate is optimized for the agent, not foregrounded, and carries no per-artifact provenance lineage. |
| **CLI instructions derived from CLI docs** | **N/A** — not a CLI-tool-wrapping project; the agent writes and runs code with full privileges (a sandbox is advised), rather than deriving invocations from pinned CLI documentation. |
| **Portability** | **No** — its own Python framework (`A1`, a conda env, an ~11 GB data lake, API keys). Model-flexible, but the agent and its outputs are bound to the Biomni runtime. |
| **Human scrutiny** | **Partial** — no skills are produced; substrate descriptions are readable in-repo and hosted outputs are traceable, but knowledge is not foregrounded as a navigable surface a human reads to learn. The product centers on *using the agent*. |
| **Knowledge-base backed** | **No** — backed by a machine-retrieval environment, not a foregrounded human knowledge base. |

## Where it diverges from the Foundry

Biomni runs tasks in-session and accumulates capability into its own agent
environment; the Foundry casts frozen, portable skill artifacts from a
foregrounded, human-readable source. On correctness, Biomni already runs LLM
self-critique in-loop and leans on human oversight and wet-lab confirmation — so
the Foundry's empirical referee *automates a check Biomni delegates to humans*,
rather than filling a void. Its breadth, autonomy, scale, and real wet-lab
validation are genuine strengths; the distinction is the unit of delivery (a
portable, provenance-stamped skill versus an in-session run) and an independent,
non-self-certifying validity gate.

## Sources

- https://biomni.stanford.edu/ — hosted GUI, agent-centered framing.
- https://github.com/snap-stanford/Biomni — README + DETAILS.md (`A1`/`agent.go`, the environment, the contribution pipeline).
- https://www.biorxiv.org/content/10.1101/2025.05.30.656746v1 · https://pubmed.ncbi.nlm.nih.gov/40501924/ — preprint (full text behind 403; abstract via PubMed).
