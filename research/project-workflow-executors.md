# Workflow Executors (BioMaster · AutoBA)

> **BioMaster** (github.com/ai4nucleome/BioMaster) and **AutoBA**
> (github.com/JoshuaChou2018/AutoBA) — agentic systems that turn a plain-language goal
> into a run multi-omic pipeline for non-experts. BioMaster: "a sophisticated,
> multi-agent framework that leverages LLMs and dynamic knowledge retrieval to
> automate … complex bioinformatics workflows" (MIT code / CC-BY-NC data + docs,
> bioRxiv 2025). AutoBA: "An AI Agent for Fully Automated Multi-omic Analyses" (MIT,
> *Advanced Science* 2024). Verified 2026-06-28 against both repos' READMEs and
> metadata (BioMaster's bioRxiv full text returns 403; AutoBA's paper via PMC).

## Its framing

These are democratize-bioinformatics systems: let a researcher with limited
computational background run real multi-omic pipelines from a plain-language goal.
AutoBA reduces interaction to three inputs (data path, description, objective), then
autonomously plans, generates code, executes, and self-heals via an Automated Code
Repair loop, with multi-backend LLMs (cloud or local) for privacy. BioMaster is the
more elaborate successor: a role-based multi-agent system (Plan, Task, Debug, Check)
wrapping a dual retrieval-augmented knowledge store, with memory management for long
interdependent pipelines and an extensibility story for adding custom tools. Its
benchmark spans 49 tasks, 18 omics modalities, and 102 tools, validated across
proprietary and open LLMs. Both center the plan → code → run → repair loop.

## Strengths relative to our approach

These lead the Foundry squarely on the wiring axis it deliberately leans out of:

- **End-to-end wiring of full pipelines.** Both chain preprocessing → alignment →
  calling → downstream across many tools — orchestration the Foundry does not attempt.
- **BioMaster's inspectable, human-editable knowledge base.** The standout. Its dual
  RAG is two hand-curated JSON files: workflow definitions (steps, required input,
  expected output) and per-tool usage examples with example commands and parameter
  explanations. Users extend it by writing entries that cite real sources (the worked
  example pulls a ChIP-seq workflow from nf-co.re). A genuine knowledge base beneath
  the agent — closer to our values than a machine-mined environment.
- **BioMaster's breadth.** RNA-seq, ChIP-seq, scRNA-seq, spatial, Hi-C, Nanopore,
  microRNA, Ribo-seq, Bisulfite, CAGE — with an explicit task/tool/modality benchmark.
- **AutoBA's minimal-input autonomy + ACR.** A three-input UX and an automated
  code-repair loop, a clean robustness mechanism for run-to-completion on
  heterogeneous data.
- **Model portability and privacy.** Both support local LLM backends, not locked to
  one vendor.

## Where it sits on our values

| Value | Workflow Executors |
|---|---|
| **Produces skills** | **No** — both generate-and-run code in-session. BioMaster's reusable unit is a knowledge-base entry, reusable *within* BioMaster but not a portable, runtime-independent skill; AutoBA persists nothing. |
| **Progressive disclosure** | **No** — both auto-retrieve and auto-plan for the agent. BioMaster's JSON KB is browsable but a flat store, not a governed disclosure hierarchy. |
| **Traceability** | **Partial/weak** — no per-artifact provenance lineage. BioMaster KB entries can carry source metadata and authors are encouraged to base workflows on real sources (nf-core), but citation is author discipline, not enforced or resolved. AutoBA: none observed. |
| **CLI instructions derived from CLI docs** | **Weak** — AutoBA generates invocations with no doc grounding; BioMaster grounds them in author-supplied usage examples (better than pure generation), but these are hand-written prose, not derived from authoritative `--help`/man pages, and carry no tool-version-pinning discipline. |
| **Portability** | **Partial** — model-portable (multi-LLM, local backends), but each is bound to its own Python framework/runtime and emits no portable artifacts. |
| **Human scrutiny** | **Partial** — BioMaster's KB JSON is human-readable, editable, and the intended extension point; AutoBA centers on running the agent (generated code is inspectable, but nothing is foregrounded for correction). Neither presents method-validity evidence for review. |
| **Knowledge-base backed** | **Split** — BioMaster **Yes** (a hand-curated dual-JSON KB of workflows + tool-usage examples); AutoBA **No** (pure prompt-driven generation). |

## Where it diverges from the Foundry

Statistical-method validity is out of scope for both: their Check / Debug / repair
machinery targets *execution* — did the step run, did expected outputs appear, repair
broken code — explicitly to stop errors propagating across steps. Neither audits
assumptions, multiple-testing, double-dipping, or error-rate control. AutoBA is
essentially the earlier, smaller-scope instance of the generic tool-selection → code →
run → repair loop already covered by the Biomni and ClawBio notes. BioMaster adds one
thing genuinely close to our values — a human-editable, inspectable knowledge base of
workflows and tool-usage examples beneath the agent — and it earns the credit. But
that KB is a *wiring* KB: it grounds which tool to call and how, as a flat retrieval
store of author-prose entries with no provenance lineage or version discipline;
nothing is cast into portable artifacts; and its Check agent validates that the
pipeline *ran*, not that the method was *valid* — self-certifying in exactly the way
the gate obligation forbids. The crux: these reproduce and run pipelines, and
BioMaster even curates a real knowledge base to do it — but it is a knowledge base for
*wiring*, not for *method validity*, and neither system has an independent referee.

## Sources

- https://github.com/ai4nucleome/BioMaster — README: multi-agent roles, the dual-RAG human-editable JSON KB, authoring workflow, supported modalities, license (MIT code / CC-BY-NC data + docs).
- https://www.biorxiv.org/content/10.1101/2025.01.23.634608v1 — BioMaster preprint (abstract; full text 403): the 49-task / 18-modality / 102-tool benchmark and the plan/execute/debug/check + error-recovery framing.
- https://github.com/JoshuaChou2018/AutoBA — README: three-input UX, the plan → code → execute → Automated-Code-Repair loop, MIT license, local-LLM backends, omics coverage.
- https://pmc.ncbi.nlm.nih.gov/articles/PMC11600294/ — AutoBA (*Advanced Science* 2024): "fully automated multi-omic analyses," self-designed processes, ACR.
