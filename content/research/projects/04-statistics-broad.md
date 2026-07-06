# SOTA / Prior-Art Survey — Lens: Statistics Broadly (the "referee" at full generality)

> Research lens 4 of 4. Source: research subagent web survey, 2026-06-26.
> Evidence tags: [verified] = fetched primary source; [secondary] = mentioned but not verified at source; [inference]; [speculative].

## 1. Lens & scope
Domain-general statistical-validity tooling, methodology, and movements — automated error/reporting checkers, calibration/validation methodology, process standards, power/assumption tooling — with heavy weight on LLM/agent efforts that *do* or *referee* statistics. Most directly relevant lens for the Family B "referee" bet.

## 2. Landscape inventory

| Name | URL | What it does | Family | Form | Maturity | Relevance |
|---|---|---|---|---|---|---|
| **statcheck** | statcheck.io / mbnuijten.com/statcheck | Regex-extracts NHST results, recomputes p from test stat + df, flags inconsistencies. 96–99% accuracy; deployed at 2 psych journals. | B | automated-checker | Mature, deployed | **High.** Canonical "recompute, don't trust the prose" check. Narrow (APA NHST) and recently critiqued as "flawed by design" (arXiv 2408.07948). [verified] |
| **GRIM** | Brown & Heathers 2017 | Tests whether reported means of integer/Likert data are arithmetically possible given N + item count. | B | automated-checker | Mature | High. Tiny deterministic invariant — model of an inspectable rail. [verified] |
| **GRIMMER** | scrutiny R pkg | GRIM for variances/SDs/SEs. | B | automated-checker | Mature | High. Same pattern, second moment. [verified] |
| **SPRITE** | Heathers et al. 2018 | Reconstructs candidate raw datasets from mean/SD/N/range to expose impossible summaries. | B | automated-checker | Mature | High. "Reconstruct under constraints to falsify the summary." [verified] |
| **scrutiny** (R) | lhdjung.github.io/scrutiny | Unifies GRIM/GRIMMER/DEBIT, map-over-rows. | B | automated-checker | Active | Medium. Packaging many micro-checks into one toolkit. [verified] |
| **p-checker** | shiny.psy.lmu.de/felix/p-checker | One app: p-curve, R-Index, TIVA, p-reporting check. | B | automated-checker/methodology | Mature | High. Bundle of evidential-value diagnostics. [verified] |
| **p-curve** | p-curve.com | Distribution of significant p's diagnoses evidential value vs p-hacking. | B | methodology | Mature | High. Detects p-hacking signatures at aggregate level. [verified] |
| **R-Index / TIVA** | replicationindex.com | R-Index estimates replicability; TIVA = left-tailed chi-sq on variance of z-scores flags QRP. | B | methodology | Mature | Medium-High. Clean statistical test *for* QRP signatures. [verified] |
| **Simulation-Based Calibration (SBC)** | arxiv 1804.06788; hyunjimoon.github.io/SBC | Sample params from prior → simulate → refit → rank stats must be uniform; non-uniformity = miscalibration. | B | methodology/framework | Mature (R pkg) | **High.** Gold-standard "simulate-under-known-truth, check calibration" loop — core empirical check Family B should build. [verified] |
| **Posterior Predictive Checks** | std Bayesian workflow | Compare observed data to data simulated from fitted posterior; discrepancy = misfit. | B | methodology | Mature | High. Canonical model-adequacy referee; pairs with negative-control/toy-model. [verified] |
| **Specification Curve Analysis** | specr (Masur); Simonsohn 2020 | Run all defensible specs; plot estimate distribution + test across them. | A+B | methodology/framework | Mature (R: specr) | High. Direct antidote to researcher-degrees-of-freedom. [verified] |
| **Multiverse Analysis** | multiverse R pkg; Steegen/Gelman 2016 | Enumerate all reasonable processing forks; report across the multiverse. | A+B | methodology/framework | Mature | High. Forking-paths made explicit. [verified] |
| **Garden of Forking Paths / False-Positive Psych** | Gelman & Loken 2013; Simmons et al 2011 | Foundational papers naming researcher-degrees-of-freedom. | B | methodology (conceptual) | Foundational | High. The theory the rails encode. [secondary] |
| **EQUATOR Network** | equator-network.org | Registry of 400+ reporting guidelines (CONSORT, STROBE, PRISMA…), searchable by study type. | B | reporting-standard | Mature, authoritative | High. Ready-made KB of "what the field requires reported." [verified] |
| **ASA Statement on p-values** (2016) | amstat.org | Six principles constraining p-value (mis)interpretation. | B | reporting-standard | Authoritative | Medium-High. Norms a referee should encode. [inference — full text not fetched] |
| **TRIPOD / PROBAST (+ -AI)** | probast.org; tripod-statement.org | TRIPOD reporting guideline; PROBAST = 20 signalling questions / 4 domains for risk-of-bias in prediction models. AI extensions exist. | B | reporting-standard/checker | Mature; -AI emerging | High. Machine-checkable signalling questions; PROBAST-AI targets ML models directly. [verified] |
| **SciScore** | sciscore.com | Scans methods vs MDAR/ARRIVE/CONSORT for rigor details actually stated. | B | automated-checker | Deployed (commercial) | High. Automated rigor-criteria checker in editorial pipelines. [secondary] |
| **StatReviewer** | editorial-manager integration | Thousands of automated statistical/reporting integrity tests on manuscripts. | B | automated-checker | Deployed (commercial) | High. Closest *commercial* "automated statistical referee" for papers. [secondary] |
| **G\*Power** | Faul et al. | Power/sample-size: a priori, post hoc, sensitivity, criterion across t/F/χ²/z/exact. | A+B | power-tool | Mature, ubiquitous | High. Reference for power/effect-size — a rail A must hit and B must audit. [verified] |
| **pwr (R) / statsmodels power** | cran pwr | Programmatic power analysis. | A+B | power-tool | Mature | Medium. Scriptable equivalent an agent could call. [inference] |
| **JASP / jamovi** | jasp-stats.org; jamovi.org | GUI stats with built-in assumption checks (normality, homogeneity) + Bayesian. | A+B | methodology/tool | Mature | Medium. Assumption-checking as a first-class step. [secondary] |

## 3. Closest prior art (top 3)

1. **POPPER (snap-stanford, ICML 2025)** — [verified, repo fetched]. Agentic free-form-hypothesis validation via Popperian falsification: an experiment-design agent proposes falsification experiments, a self-critique + LLM-as-judge relevance gate filters them, a ReAct execution agent obtains a **p-value per experiment**, and a **novel sequential testing framework with e-value aggregation gives strict Type-I error control** across accumulating evidence. ~275★, ICML'25, Candès + Leskovec. **Single closest match to the project's structural bet** — "doing never self-certifies; hands off to a referee gate using empirical checks with real error control." Difference: POPPER validates *hypotheses against data*; the project wants to validate *the analysis method itself* (assumptions, double-dipping, invented methods). Template for the handoff-with-error-control mechanism, not a drop-in. https://github.com/snap-stanford/POPPER · https://arxiv.org/abs/2502.09858

2. **Analyst-Inspector Framework (arXiv 2502.16395)** — [verified, fetched]. Two-agent design: an Analyst produces a workflow + code; an **independent Inspector agent** tries to reproduce the conclusion from the *workflow alone* (regenerating code), passing only if results are functionally equivalent. Finds reproducibility correlates with accuracy (p<0.001); a reflection strategy (RReflexion) lifts reproducibility +12pp, beating the human baseline (71.6% vs 66.5%). **Almost exactly the Family-A-hands-off-to-Family-B referee architecture**, but instantiated for *reproducibility* — its gap is the project's point: a reproducibly-wrong method passes.

3. **SBC + Posterior Predictive Checks** — [verified]. Not agentic, but the canonical *empirical* validity checks the project names as Family B's job. SBC's "simulate from prior, refit, ranks must be uniform" and PPC's "simulate from posterior, compare to data" are the gold-standard external checks an LLM referee should *construct and run* rather than reason about. White space: wrapping these as agent-callable, inspectable skills.

## 4. White space / gaps

- **No one is building a general statistical referee *for LLM agents* specifically.** POPPER referees hypotheses; Analyst-Inspector referees reproducibility; statcheck/GRIM/SciScore/StatReviewer referee human-written manuscripts. The project's exact target — a portable skill library catching an *agent* inventing-a-method / double-dipping / violating-assumptions and gating on empirical checks — appears **unoccupied**. [inference, strong]
- **Method-applicability/assumption checking is the documented LLM weak spot, and nothing guards it.** StatQA's headline: LLMs make *applicability errors* (wrong method for context) far more than humans, who instead make task-confusion errors. The project aims squarely at LLMs' empirically-worst statistical failure mode. [verified]
- **"Invented method with convincing derivation" — the sharpest case — has no dedicated detector.** statcheck/GRIM check *consistency* of stated stats; p-curve/TIVA check *literature-level* signatures; none audit whether a named/derived procedure is a *real, valid* method. [inference]
- **The empirical checks exist but aren't agent-packaged.** SBC, PPC, permutation/negative-control, specification-curve, power analysis are mature R/Python tooling but live as methodology, not as inspectable agent skills with a forced doing→refereeing handoff. Packaging them *is* the contribution. [inference]
- **Existing automated checkers are narrow/brittle.** statcheck = APA NHST regex only (contested); GRIM = integer means only; SciScore/StatReviewer = manuscript reporting, commercial/closed. None generalize to arbitrary agent analyses. [verified/secondary]

## 5. Agentic / LLM-specific efforts (full weight)

- **POPPER** — falsification agent with sequential Type-I error control + e-values. *Closest structural analog.* [verified]
- **Analyst-Inspector (2502.16395)** — separate Inspector agent enforcing reproducibility via independent re-implementation. *Closest architectural analog (the referee gate).* [verified]
- **StatQA (NeurIPS 2024, "Are LLMs Good Statisticians?")** — 11,623-example benchmark; best model GPT-4o 64.83%; **LLMs systematically fail method-applicability/assumption assessment.** *Best evidence the failure mode is real + the project well-targeted; also a ready eval harness.* https://statqa.github.io/ [verified]
- **"Prompt-Hacking: The New p-Hacking?" (arXiv 2504.14571)** — argues LLM analysis enables a new p-hacking vector (run many prompts/analyses until significant); experiments across frontier coding agents. *Names the exact threat model.* [secondary — abstract verified, internals not fetched]
- **"LLM Hacking: Quantifying Hidden Risks" (2509.08825)** + **dual-validity framework (2506.16697)** — quantify how LLM analysis choices swing conclusions; researcher-degrees-of-freedom for LLMs. [secondary]
- **AI Scientist v1/v2 (Sakana, 2408.06292 / 2504.08066)** — full autonomous research loop *with an automated reviewer module* assessing validity/originality. *But the reviewer is LLM-reasoning-based, not empirical-check-gated* — i.e. it self-certifies via fluent rationale, the exact anti-pattern the project rejects. *Cautionary closest-but-wrong.* [secondary]
- **ReviewRL / ReviewEval / DeepReview / OpenReviewer / AgentReview / PRAIB / ReviewerGPT** — automated/AI peer-review systems & benchmarks; mostly holistic review quality, **not** dedicated statistical-validity referees with empirical checks. [secondary]
- **Surveys**: "LLM-Based Data Science Agents" (2510.04023), "Measuring Data Science Automation" (2506.08800), "Can LLM Reasoning Be Trusted?…Statistical Tasks" (2601.14479) — map DS-agent landscape, flag reproducibility/auditability as open; none deliver the validity referee. [secondary]

**Net:** agentic work clusters at two poles — *do-the-analysis* DS agents (Family A, weak on assumptions per StatQA) and *referee* prototypes that either check the wrong thing (reproducibility, not validity) or self-certify by reasoning (AI Scientist reviewer). The project's "empirical-check-gated validity referee for agents" sits in the gap between them, with POPPER's error-control mechanism and SBC/PPC/permutation methodology as the closest reusable building blocks.

## 6. Follow-up URLs
- POPPER: https://github.com/snap-stanford/POPPER · https://arxiv.org/abs/2502.09858
- Analyst-Inspector: https://arxiv.org/html/2502.16395v1
- StatQA: https://statqa.github.io/ · https://proceedings.neurips.cc/paper_files/paper/2024/file/729786203d330da046dd8091c2d92a66-Paper-Datasets_and_Benchmarks_Track.pdf
- Prompt-Hacking: https://arxiv.org/pdf/2504.14571 · LLM Hacking: https://arxiv.org/pdf/2509.08825 · dual-validity: https://arxiv.org/pdf/2506.16697
- statcheck: https://mbnuijten.com/statcheck/ · critique: https://arxiv.org/pdf/2408.07948
- GRIM/SPRITE: https://jamesheathers.medium.com/the-grim-test-a-method-for-evaluating-published-research-9a4e5f05e870 · scrutiny: https://lhdjung.github.io/scrutiny/
- p-checker/p-curve/TIVA: https://github.com/nicebread/p-checker · https://replicationindex.com/tag/test-of-insufficient-variance/
- SBC: https://arxiv.org/pdf/1804.06788 · https://hyunjimoon.github.io/SBC/ · test-quantity sensitivity: https://arxiv.org/pdf/2211.02383
- Specification curve / multiverse: https://philippmasur.de/2020/01/02/how-to-do-specification-curve-analyses-in-r-introducing-specr/ · https://onlinelibrary.wiley.com/doi/10.1002/ijop.13229
- EQUATOR: https://www.equator-network.org/reporting-guidelines/ · PROBAST: https://www.probast.org/ · TRIPOD-AI/PROBAST-AI: https://pmc.ncbi.nlm.nih.gov/articles/PMC8273461/
- G*Power: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8441096/
- AI Scientist v2: https://arxiv.org/pdf/2504.08066 · DS-agent survey: https://arxiv.org/html/2510.04023v1

**Evidence honesty note:** [secondary] items rest on search-snippet summaries — notably SciScore/StatReviewer (commercial, no docs fetched), the Prompt-Hacking internals, and the ASA statement text. The four most load-bearing claims (POPPER architecture + error control, Analyst-Inspector referee design, StatQA applicability-error finding, SBC mechanism) are [verified]. The central white-space claim — *no general empirical-check-gated statistical referee for LLM agents exists* — is a strong [inference] from absence across ~20 surveyed projects, not proof.
