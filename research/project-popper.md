# POPPER

> **github.com/snap-stanford/POPPER** (Huang et al., ICML 2025; arXiv:2502.09858)
> — "an agentic framework for rigorous automated validation of free-form
> hypotheses." `pip install popper_agent`. Our nearest neighbor on the referee
> axis. Verified 2026-06-26 against the repo, the full preprint, and the ICML
> poster.

## Its framing

Guided by Popper's falsification principle, POPPER takes a natural-language
hypothesis plus dataset(s) and uses LLM agents to (a) decompose it into measurable
sub-hypotheses with explicit null and alternative, (b) design and execute
falsification experiments — statistics, simulations, real procedures — each
yielding a $p$-value, and (c) convert those to $e$-values and aggregate them in a
sequential testing framework with provable Type-I error control, rejecting once
the aggregated $e$-value exceeds $1/\alpha$. It is a Python library
(`Popper(llm=...).validate(hypothesis=...)`) with an optional Gradio UI, evaluated
across six domains including biological gene-perturbation.

## Strengths relative to our approach

POPPER is the closest external system to the Foundry's referee:

- **Real sequential-testing math** with provable Type-I error control under
  dependent, adaptively-generated tests; the $p$-to-$e$ calibrator is principled
  and avoids alpha-spending blowup.
- **Falsification cleanly operationalized** — hypothesis → falsifiable
  sub-hypotheses with explicit null/alternative → reject only on accumulated
  evidence.
- **Empirical and non-self-certifying** — permutation tests with negative
  controls, real statistical machinery, not LLM self-assessment.
- **A relevance-check / self-refine loop that measurably matters** (ablations
  underperform).
- **Validated and adopted** — high power with controlled error versus baselines,
  an expert study (Kendall's $W = 0.91$), ICML 2025, open-source.

## Where it sits on our values

| Value | POPPER |
|---|---|
| **Produces skills** | **No** — `agent.validate(...)` returns an in-process results object (genes, $p$-values, a binary answer); intermediate files are scratch, not frozen portable artifacts. |
| **Progressive disclosure** | **No** — logic lives in agent code and prompts; there is no layered human-facing disclosure surface. |
| **Traceability** | **Partial** — runs produce validation results with their statistical reasoning, but the machinery is code + prompts rather than foregrounded inspectable content, and carries no per-artifact provenance. |
| **CLI instructions derived from CLI docs** | **N/A** — not a CLI-tool-wrapping project. |
| **Portability** | **No** — an in-process Python library, bound to its own stack. |
| **Human scrutiny** | **No (as skills)** — produces no skills; the reasoning is in code and prompts, not a foregrounded human reading surface. |
| **Knowledge-base backed** | **No.** |

## Where it diverges from the Foundry

The empirical-referee axis is a genuine *similarity*, not a Foundry exclusive —
POPPER runs real, non-self-certifying statistical checks with provable error
control. The distinction is the **unit refereed**. POPPER referees a *hypothesis
against data* and trusts each experiment to yield a valid $p$-value — its
guarantee is explicitly conditional on that, controlling error over the
*falsification decision*. The Foundry referees the prior question: is the *method*
producing that $p$-value itself valid — are its assumptions met, is it
double-dipping, is the named method real and appropriate, is the error rate
actually controlled. That is the layer POPPER takes as trusted input. Beyond the
referee, POPPER is an in-process library, where the Foundry is a foregrounded,
inspectable knowledge base that casts portable skill artifacts.

## Sources

- https://github.com/snap-stanford/POPPER — usage API, code-only, in-process results object.
- https://arxiv.org/abs/2502.09858 — method, "valid $p$-value … under the specified null sub-hypothesis," $e$-value aggregation, Type-I control, Assumption 1 (Implication), the LLM-as-judge relevance checker.
- https://icml.cc/virtual/2025/poster/44356 — ICML 2025 acceptance.
