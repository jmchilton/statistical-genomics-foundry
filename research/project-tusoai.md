# TusoAI

> **arXiv 2509.23986** — "TusoAI: Agentic Optimization for Scientific Methods" (Turcan, Huang, Li, Zhang).
> An agentic system that "takes a scientific task description with an evaluation function and autonomously develops and optimizes computational methods for the application." It builds a literature-derived *knowledge tree*, iteratively optimizes and diagnoses a pool of candidate solutions, and emits executable Python — benchmarked on 11 tasks (6 single-cell, 5 scientific deep-learning) against expert-designed methods and agent baselines (AIDE, Biomni, ChatGPT-Agent), and applied to genetics case studies. Code at github.com/Alistair-Turcan/TusoAI. Verified 2026-06-27 against the abstract page, the PDF, and the arXiv HTML.

## Its framing

TusoAI attacks the cost of *building* computational methods, not running them. Given a task description and an evaluation function $h(\cdot)$ — "any evaluation metric, such as AUC, average of several metrics, or domain-specific measures (e.g., enrichment of inferred disease genes against an expert-curated set)" — it autonomously develops and optimizes a method to maximize that metric. It first retrieves up to ten papers from Semantic Scholar, distills each into a 15-point technical summary, and organizes the result into a hierarchical *knowledge tree* of optimization strategies (general, like regularization; domain-specific, like single-cell noise modeling). It then runs iterative, domain-specific optimization with model diagnosis over a pool of candidate solutions, tuning on validation data and assessing on held-out test data. The output is executable Python implementing the optimized method — sometimes a genuinely new design (e.g., an NMF approach modeling dropout and Poisson noise with iterative refinement). It is a built, evaluated system, and it reports real findings: 9 new autoimmune-disease/T-cell-subtype associations and 7 previously unreported disease variant–gene links.

## Strengths relative to our approach

TusoAI is a serious, well-evaluated method-development engine, ahead of the Foundry on axes the Foundry has not built:

- **It actually designs methods, and benchmarks them honestly.** Eleven tasks, expert-designed application-specific baselines, and competing agents (AIDE, Biomni, ChatGPT-Agent), with average rank 1.2 on single-cell and 2.8 on deep-learning tasks. This is empirical comparison against strong baselines, not self-report.
- **An internal, literature-grounded knowledge base.** The knowledge tree is an LLM-constructed KB built from retrieved papers and 15-point summaries — more structure beneath the artifact than most skill libraries carry, and the mechanism by which domain knowledge enters optimization.
- **Train/validate/test discipline.** Optimization on validation data, final assessment on separate test data — a held-out evaluation posture, not fitting-and-declaring on one split.
- **Inherited validity where the metric encodes it.** In the scDRS case study the optimized method showed "40% higher power in causal simulations while retaining calibration in null settings" — a real null-calibration result, because the task's evaluation design demanded it.
- **Model diagnosis in the loop.** A predefined diagnostic category logs and diagnoses candidate behavior, steering optimization rather than blind search.

## Where it sits on our values

| Value | TusoAI |
|---|---|
| **Produces skills** | **No** — it emits task-specific executable Python implementing one optimized method, not portable, reusable skill artifacts with frontmatter/disclosure. The unit is a method for a given task + metric, not a packaged skill. |
| **Progressive disclosure** | **No** — no layered artifact a human or agent reads at increasing depth; the deliverable is optimized code plus benchmark numbers. |
| **Traceability** | **Partial** — the knowledge tree cites the papers it distilled and the diagnostic log records optimization choices, so *why* a method evolved is partly recoverable. But the emitted method is a hill-climbing product against $h(\cdot)$; it carries no per-artifact provenance back to a governed source of truth. |
| **CLI instructions derived from CLI docs** | **N/A** — it generates method code; it does not wrap or document CLI tools. |
| **Portability** | **No skills produced** — output is task-bound Python for one application + metric; there is no multi-runtime skill package to port. |
| **Human scrutiny** | **Partial** — the generated code, the knowledge-tree summaries, and the diagnostics are human-readable, and the human supplies the evaluation function. But nothing is authored as a reading-and-learning surface; it is an optimization artifact a human can inspect, not a destination built to be read. |
| **Knowledge-base backed** | **Partial** — uniquely among our neighbors there *is* a KB beneath the doing: the literature-derived knowledge tree. But it is an internal, LLM-built optimization scaffold, not a curated, human-inspectable knowledge base or a reader's surface. |

## Where it diverges from the Foundry

TusoAI is a method-**generating** doer — precisely the upstream the Foundry's referee is built to sit beneath. Family A in the Foundry *deliberately does not invent methods*; TusoAI's whole value is that it does, hill-climbing new designs against a user-supplied evaluation function $h(\cdot)$. That makes the relationship complementary, not competitive: a system that designs methods is exactly the kind of doer that must hand off to a downstream empirical validity gate. Credit where due — TusoAI's evaluation function *is* a validity check when the user supplies a rigorous one: the scDRS case retained null calibration because that task's metric demanded power *and* calibration. But that safety is borrowed from the metric, not provided by TusoAI; the paper makes no formal statistical-validity guarantees and optimizes whatever objective it is handed. Two precise distinctions follow. First, the **unit checked**: TusoAI validates against a metric on *known benchmark tasks* with held-out test data — output-versus-truth on a curated problem — whereas the Foundry's referee asks the prior question, in-loop, on an *arbitrary* analysis with no ground-truth benchmark and no user-supplied $h(\cdot)$: is the method itself statistically valid — assumptions met, no double-dipping, the named method real and appropriate, error actually controlled? Second, the **failure it guards**: if the supplied metric rewards inflated signal, a method-optimizer will hill-climb straight into a plausible-but-invalid method with a convincing derivation — the exact failure the referee exists to catch. The crux: TusoAI optimizes a method to a metric; the Foundry referees whether the method is valid beneath the metric.

## Sources

- https://arxiv.org/abs/2509.23986 — title, authors, abstract; the knowledge-tree + iterative-optimization framing and the genetics case-study findings.
- https://arxiv.org/pdf/2509.23986 — full paper; domains (single-cell, satellite, genetics), code availability, NMF example.
- https://arxiv.org/html/2509.23986 — evaluation mechanism: user-supplied $h(\cdot)$, validation/test split, knowledge-tree construction from Semantic Scholar, baselines (AIDE/Biomni/ChatGPT-Agent), 11-task benchmark and ranks, "no formal statistical-validity guarantees," scDRS power/calibration result.
- https://github.com/Alistair-Turcan/TusoAI — public code repository.
