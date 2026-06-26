# POPPER — Verification Report

> Source: verification subagent, 2026-06-26. Brief: verify/refute hypothesized distinctions vs PRIMARY sources; POPPER is our nearest neighbor on the referee axis, so credit genuine similarity and refute overclaims.
> Evidence tags: [verified] / [secondary] / [inference] / [refuted].
> Primary sources read: `snap-stanford/POPPER` repo + README; arXiv:2502.09858 (full 65pp PDF, quoted); ICML 2025 poster page; MarkTechPost [secondary].

## 1. Fair summary (POPPER's framing)
POPPER (Huang, Jin, R. Li, M. Li, Candès, Leskovec; ICML 2025; arXiv:2502.09858) is "an agentic framework for rigorous automated validation of **free-form hypotheses**." Guided by Popper's falsification principle, it takes a natural-language hypothesis + dataset(s) and uses LLM agents to (a) decompose into measurable **sub-hypotheses** with explicit null/alternative, (b) design + execute falsification experiments (stats, simulations, real procedures), each yielding a **p-value**, (c) convert p-values to **e-values** and aggregate in a **sequential testing framework** with provable **Type-I error control** — rejecting once aggregated e-value > 1/α, else gathering more evidence or terminating. Python library/agent (`pip install popper_agent`; `Popper(llm=...).validate(hypothesis=...)`), optional Gradio UI. Six domains (biology incl. gene-perturbation, economics, sociology, DiscoveryBench); matches human scientists on complex biological hypotheses at ~10× speed.

## 2. Claim-by-claim verdict

| # | Claim | Verdict | Tag | Basis |
|---|-------|---------|-----|-------|
| 1 | Referees *hypotheses against data*, NOT the *statistical validity of an analysis method* | **Confirmed** | [verified] | "validates a hypothesis using LLM agents that design and execute falsification experiments." Each "ultimately produces a p-value." The p-value is trusted: "The only restriction is that it produces a **valid p-value** suitable for e-value computation under the specified null sub-hypothesis." Does not audit whether method assumptions hold or whether the p-value itself is valid. |
| 2 | Referee is empirical + non-self-certifying; per-experiment p/e-values aggregated via sequential test w/ provable Type-I control | **Confirmed** | [verified] | p→e calibrator (Vovk & Wang 2021), adaptive combination; "If the aggregated e-value exceeds 1/α, we declare sufficient evidence to reject." Uses chi-squared, Fisher's, hypergeometric, permutation tests **and negative controls**. A genuine SIMILARITY to us — credit it. |
| 3 | Foregrounds a human-readable, navigable KNOWLEDGE BASE to learn from? | **Refuted** | [verified] | README code-only; no curated/navigable knowledge content. An agentic framework you invoke; outputs are validation results, not a KB a human reads. |
| 4 | Builds reusable, portable skill artifacts? | **Refuted (does not)** | [verified] | A run is `agent.validate(...)` returning an **in-process results object** (genes, p-values, binary answer). No frozen/portable/cross-runtime skill artifact; intermediate files are scratch. |
| 5 | Inspectable KB, or code + LLM prompts? | **Confirmed: code + prompts** | [verified] | Logic in agent code + prompts (Experiment Design Agent, ReAct execution agent, LLM-as-judge Relevance Checker), not foregrounded inspectable content. |
| 6 | Domain-general or biology-specific? stat-genomics use? | **Partly** | [verified] | Domain-general by design; flagship demos are biological gene-perturbation (IL2/IFNG TargetVal). Genomics-adjacent (GTEx co-expression, GWAS-catalog permutation) but a hypothesis-validation testbed, NOT a stat-genomics methods toolkit. |

**Load-bearing detail (Claim 1).** POPPER's guarantee rests on *Assumption 1 (Implication): "If H0 is true, then the null sub-hypothesis h0_i is true for all i."* It **assumes each experiment's null is faithful and its p-value valid**, controlling error only at the *aggregate falsification decision*. Its relevance check is an LLM-as-judge verifying the sub-hypothesis *aligns with the main hypothesis*, plus causality/data-availability/redundancy self-critique. **None of this audits whether the analysis *method* is statistically sound** (assumptions, double-dipping, named method real/appropriate, method's own error rate). That is our unit, out of POPPER's scope.

## 3. POPPER's genuine strengths
- Real sequential-testing math with provable Type-I control under dependent, adaptively-generated LLM tests; e-value / p-to-e calibrator is principled, avoids alpha-spending blowup.
- Falsification framing cleanly operationalized: hypothesis → falsifiable sub-hypotheses w/ explicit null/alt → reject only on accumulated evidence.
- Autonomy + generality; existing data, simulations, or new procedures; permutation tests **with negative controls.**
- Relevance-check / self-refine loop measurably matters (ablation underperforms).
- Validated rigor + adoption: high power w/ controlled error vs baselines; expert study (Kendall's W=0.91); ICML 2025; open-source, pip-installable.

## 4. Defensible distinctions (gracious, axis-mapped)
- **Axis 4 (empirical referee) — SIMILARITY, credit generously.** Both run *empirical, non-self-certifying* checks with real statistical machinery; POPPER uses negative controls + permutation tests. Do NOT claim this axis as uniquely ours.
- **Axis 4 — real distinction is the UNIT REFEREED.** POPPER referees a **hypothesis/claim** and *assumes each experiment's p-value valid* (Assumption 1). We referee the **method/procedure itself** — assumptions met? double-dipping? named method real/appropriate? error rate actually controlled? — the layer POPPER takes as trusted input. Gracious phrasing: *"POPPER controls error over the falsification decision, trusting each experiment to yield a valid p-value; we target the prior question of whether the method producing that p-value is itself valid."*
- **Axis 1 (builds skills) — distinct.** In-process agent/library returning a results object vs. cast frozen/portable/self-contained skill artifacts.
- **Axis 2 (inspectable KB) — distinct.** Code + prompts vs. human-inspectable source-of-truth + provenance.
- **Axis 3 (foregrounds knowledge) — distinct.** No navigable KB vs. a KB with progressive disclosure a human reads.
- **Axis 6 (portable) — distinct.** In-process, tied to its Python stack vs. portable across agent runtimes.

## 5. Cautions / strongest counter-argument
**Strongest "POPPER already covers us":** "POPPER already runs empirical, statistically-rigorous, non-self-certifying checks — negative controls, permutation tests, provable Type-I control. Its relevance-checker screens bad experiments. Isn't your referee just POPPER?"

**Verdict: does not hold — but be precise.**
1. **Unit.** POPPER's relevance check screens *alignment of sub-hypothesis with main hypothesis* (LLM-as-judge) + causality/data/redundancy self-critique. It does NOT audit the method's statistical validity. The framework *explicitly assumes* per-experiment validity ("The only restriction is that it produces a **valid p-value**…"; Assumption 1). A double-dipping or assumption-violating analysis emitting a number called "p-value" is taken at face value — POPPER's guarantees are *conditional on* that validity, which is exactly what we check.
2. **Everything else.** Axes 1/2/3/6 are orthogonal — POPPER is a framework/library, not a foregrounded, inspectable, portable KB of cast skills.

Credit POPPER fully on referee/error-control (shared); locate our distinction at (a) the **unit refereed** (method validity, the layer POPPER trusts) and (b) **KB / portable-skills / foregrounding**. Avoid any phrasing implying POPPER's checks are weak or non-empirical — unfair and refuted.

## 6. Key sources
- `https://github.com/snap-stanford/POPPER` + README — usage API, loaders, code-only (no KB), in-process results object (axes 1–5).
- `https://arxiv.org/abs/2502.09858` (full PDF) — method, "valid p-value…under the specified null sub-hypothesis," e-value aggregation + Type-I control, **Assumption 1 (Implication)**, LLM-as-judge Relevance Checker, negative-control/permutation usage (claims 1,2,6).
- `https://icml.cc/virtual/2025/poster/44356` — ICML 2025 acceptance.
- MarkTechPost write-up — secondary corroboration [secondary].

**Bottom line:** every proposed distinction survives EXCEPT claiming the empirical-referee axis as uniquely ours — a genuine *similarity*, must be credited. Defensible position: POPPER is our nearest neighbor on rigorous empirical refereeing; we differ in the **unit refereed** (method/procedure validity vs hypothesis-vs-data) and in being a **foregrounded, inspectable KB that casts portable skill artifacts** rather than an in-process agentic library.
