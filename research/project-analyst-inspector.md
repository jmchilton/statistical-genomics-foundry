# Analyst-Inspector

> **arXiv:2502.16395v1** — "a novel analyst-inspector framework to automatically
> evaluate and enforce the reproducibility of LLM-generated data science workflows."
> "An Analyst-Inspector Framework for Evaluating Reproducibility of LLMs in Data
> Science," Zeng, Jin, Wang, Zheng & Li (Penn State / CMU / IMF). An *implemented,
> quantified* two-agent reproducibility framework: an Analyst produces a workflow +
> code, an independent Inspector regenerates code from the workflow description
> alone, and a result counts as reproducible only on functional equivalence. Its
> RReflexion loop lifts reproducibility ~$+15$pp over the same model's
> chain-of-thought baseline. Verified 2026-06-27 against the full HTML paper.

## Its framing

The framework targets LLM-driven data science — $1{,}032$ statistical-analysis and
hypothesis-testing tasks across DiscoveryBench, QRData, and StatQA. An **Analyst**
agent $A$ emits a tuple $(W_A, C_A)$: a workflow $W_A$ (the reasoning and analysis
plan) and the code $C_A$ that implements it. An independent **Inspector** agent $I$,
"given only the workflow and minimal context (e.g., data filenames)," regenerates a
fresh implementation $C_I$ and the workflow is judged reproducible iff
$C_A \equiv C_I$ — *functional equivalence*, where the deterministic execution outcomes
$O_A = O_I$ agree "even if $C_A$ and $C_I$ differ texturally." The whole construct
is grounded in the classical statistical notions of sufficiency and completeness:
is the workflow a sufficient description to regenerate the result? On top of this,
**RReflexion** (Reproducibility-Reflexion, after Reflexion) feeds the Inspector's
reproducibility verdict back to the Analyst as an external signal to revise an
irreproducible workflow.

## Strengths relative to our approach

On the architecture the Foundry bets on, this framework is *ahead* — it is built,
run, and measured where the Foundry is design-stage:

- **The independent referee is implemented, not sketched.** Two separate agents,
  no shared code state, the Inspector working from the workflow text alone — a
  concrete instantiation of "separate is stronger." This is exactly the
  non-self-certification posture the Foundry's referee loop argues for, shipped and
  evaluated.
- **The revise loop is closed and quantified.** RReflexion turns the referee's
  verdict into analyst feedback (an analyze → referee → revise spine), and reports
  real gains: o3-mini rises from $55.23\%$ to $71.55\%$ reproducibility on
  DiscoveryBench ($+16.3$pp over its CoT baseline), GPT-4o $42.68\% \to 58.58\%$,
  and o3-mini on QRData $75.06\% \to 90.33\%$. With RReflexion the best
  configuration ($71.55\%$) edges the human-expert baseline ($66.53\%$).
- **Honest about its own ceiling.** The paper states plainly that "while
  reproducible analyses are more likely to be correct, it is possible that both the
  analyst and inspector agents are incorrect in consistent ways," and positions
  itself as human-in-the-loop: reproducibility confirmed by the Inspector, then
  correctness assessed by a human. It does not claim to referee validity.
- **Rigorous statistical framing** — sufficiency/completeness give the
  reproducibility criterion a principled definition rather than an ad-hoc diff.

## Where it sits on our values

| Value | Analyst-Inspector |
|---|---|
| **Produces skills** | **No** — a research evaluation framework, not a skill library. Its deliverables are the two-agent protocol, the RReflexion strategy, and benchmark results; it emits no portable, self-contained skill artifacts. |
| **Progressive disclosure** | **No** — a paper and a method. No layered disclosure surface; the workflow $W_A$ is an intermediate artifact for the Inspector, not a reader-facing progressive surface. |
| **Traceability** | **Strong on reproduction, not provenance** — its entire purpose is tracing a *conclusion* back to a workflow by regenerating code from it. That is reproduction-traceability (can the result be re-derived from the stated plan), not lineage to a governed source, and not a trace of *why the method is valid*. |
| **CLI instructions derived from CLI docs** | **N/A** — it generates Python data-analysis code from task prompts; it does not wrap or document command-line tools. |
| **Portability** | **No skills produced.** The method is model-agnostic (run across Llama-3.3, DeepSeek-R1, GPT-4o, Claude-3.5, o3-mini), but nothing portable is emitted to install or carry between runtimes. |
| **Human scrutiny** | **Yes, by design** — explicitly human-in-the-loop: the Inspector flags (ir)reproducibility and a human is told to "carefully review any LLM-generated solutions" and assess correctness separately. It surfaces a verdict for a human, though as a research artifact, not a navigable learning surface. |
| **Knowledge-base backed** | **No** — no inspectable knowledge base beneath the agents. The grounding is statistical *theory* (sufficiency/completeness), not a curated, human-readable KB the artifacts are cast from. |

## Where it diverges from the Foundry

The shared architecture is real and the Foundry credits it: an independent referee
agent that the doer hands off to, refereeing from the workflow alone so the verdict
is not self-certified — the Foundry's `REFEREE_LOOP` names this two-agent design
as the prior art for "separate is stronger." The distinction is the *unit
refereed*. The Inspector asks **can this conclusion be regenerated from the
workflow description?** — reproducibility, functional equivalence of execution.
The Foundry's referee asks the prior question — **is the method itself
statistically valid?** — assumptions met, no double-dipping, the named method real
and appropriate, error rate actually controlled. These come apart exactly where it
matters: a confounded, double-dipped, or assumption-violating analysis whose
workflow is fully specified reproduces perfectly and *passes the Inspector*. The
paper concedes this itself — analyst and inspector can be "incorrect in consistent
ways," so a human must still judge correctness. The crux: Analyst-Inspector
certifies that a result can be *re-derived*; the Foundry's gate certifies that the
result is *valid to derive at all* — a reproducibly-wrong method clears the first
gate and fails the second.

## Sources

- https://arxiv.org/html/2502.16395v1 — full paper: two-agent design, functional-equivalence ($C_A \equiv C_I$) reproducibility criterion, sufficiency/completeness grounding, RReflexion, per-model/per-benchmark numbers, the human-expert baseline, and the explicit reproducible-but-incorrect caveat.
