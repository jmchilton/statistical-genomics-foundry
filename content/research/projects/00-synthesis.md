# Synthesis — Prior-Art Landscape for "Statistical Rails for LLM-Driven Statistical Genomics"

> Cross-cut of four lens surveys (Bioconductor/R · statistical-genomics-non-R · genomics-broad · statistics-broad), 2026-06-26.
> See `01`–`04` for per-lens detail and evidence tags. This file is the conclusions layer.

## The one-paragraph result

All four lenses converged, independently, on the same conclusion: **the white space is the referee, not the doer.** "Doing" statistical-genomics analysis with an LLM is already crowded (Biomni, GenoAgent/GenoTEX, BioMANIA, awesome-genomic-skills, From-Prompt-to-Pipeline). Refereeing *statistical validity* — catching an agent that invents a method, double-dips, violates assumptions, or fails to control error rates — is essentially **unoccupied**. The few "referee" systems that exist check the *wrong thing* (reproducibility, software quality, manuscript reporting) or self-certify via LLM reasoning (the exact anti-pattern). The boss's failure mode is real, documented in the literature, and unguarded by tooling.

## Finding 1 — the failure mode is literature-confirmed, not just anecdotal

- **StatQA** (NeurIPS 2024, "Are LLMs Good Statisticians?"): 11,623-example benchmark; best model ~65%; LLMs **systematically fail method-applicability / assumption assessment** — i.e. they pick the wrong method for the context far more than humans do. This is precisely the boss's scar. `[verified]`
- **"Prompt-Hacking: The New p-Hacking?"** (2504.14571): names the threat — run many prompts/analyses until significant. `[secondary]`
- **"When Stability Fails"** (2603.15840): self-consistent ≠ correct; agents reliably pick wrong tests. `[verified excerpt]`
- Takeaway: the premise needs no defending. There's a citable evidence base that LLMs are worst exactly where we aim.

## Finding 2 — every "referee" in the field checks the wrong thing (the gap, precisely)

| Existing referee | What it actually gates | Why it's not ours |
|---|---|---|
| Bioconductor package review | software quality (build/docs/tests) | explicitly **not** method validity `[verified]` |
| Analyst-Inspector (2502.16395) | **reproducibility** (can a 2nd agent re-derive it?) | a reproducibly-wrong method passes `[verified]` |
| statcheck / GRIM / SciScore / StatReviewer | **manuscript reporting** consistency | human papers, narrow (NHST regex / integer means) `[verified]` |
| AI Scientist reviewer module | validity **via LLM reasoning** | self-certifies by fluent rationale = the anti-pattern `[secondary]` |
| GA4GH / GIAB / hap.py | variant-call accuracy vs **external truth set** | domain-specific, offline, per-method — not in the agent loop `[verified]` |

**The unoccupied cell:** an empirical-check-gated *validity* referee operating *inside* an LLM agent's loop, for arbitrary analyses. That's the project.

## Finding 3 — the Family-B "construct the empirical check" idea has strong, reusable prior art (just unpackaged)

Our design bet from the design conversation — *drop schemas, keep verification, change its form from "parse" to "calibrate," make the gate a Mold* — is directly supported. The field already trusts empirical gates; nobody has packaged them as inspectable agent skills with a forced doing→referee handoff:

- **POPPER** (snap-stanford, ICML 2025) — agentic Popperian falsification with a **sequential testing framework giving provable Type-I error control** over accumulating evidence. The closest structural analog to our bet; the reusable *mechanism* for "handoff with real error control." Validates hypotheses, not method choices — so it's a template, not a drop-in. `[verified]`
- **SBC / Posterior Predictive Checks** — gold-standard "simulate-under-known-truth, check calibration is uniform" loop. The canonical Family-B empirical check. `[verified]`
- **countsplit / data-thinning** (Witten lab) — the archetype: a *named invalidity* (double-dipping) + a *concrete empirical remedy*. Family B wants a library of these. `[verified]`
- **DHARMa** — assumption-audit via simulation-based residuals; generalize across model families. `[verified]`
- **GIAB + hap.py**, **LDSC intercept**, **λGC / QQ plots** — genomics-native external/empirical calibration referees. `[verified]`
- **specification-curve / multiverse** — the forking-paths / researcher-degrees-of-freedom antidote. `[verified]`

## Finding 4 — ready-made corpus to ground Molds (corpus-first, the foundry way)

- **Family A (do-it-right content):** OSCA, Bioconductor workflow vignettes, GWASTutorial, Marees/Anderson GWAS-QC protocols.
- **Family B (referee content):** countsplit, DHARMa, simr/G*Power/pwr, SBC/PPC, GIAB+hap.py, LDSC/λGC/QQ, spec-curve/multiverse.
- **Referee checklists already written** (cast straight into audit Molds): EQUATOR (400+ reporting guidelines), PRS-RS/ClinGen (33-item PRS standard), MIQE, ENCODE standards, **PROBAST-AI** (20 signalling questions, risk-of-bias for ML/prediction models — the most machine-checkable).
- **Ready eval harness:** **StatQA** (11,623 examples testing applicability/assumption judgment) — a near-drop-in for our `eval.md` infrastructure to score referee Molds.

## Finding 5 — closest *form* match, and the positioning question

**awesome-genomic-skills** (GoekeLab) is structurally our deliverable: a portable, inspectable library of genomics *agent skills* + MCP servers + benchmarks across Claude Code/Copilot/Codex. But by its own framing it does **not** mandate statistical rigor. So: same shape, opposite emphasis. Decision needed — investigate/align/contribute upstream, or stay separate and cite as related work.

## Strategic implications (for the design)

1. **Identity shift, mild but real:** the defensible, novel core is "**a statistical referee / conscience for LLM agents doing genomics**," not "a do-it-all genomics foundry." Doing is crowded; refereeing is empty.
2. **"Do both" still works** — but Family A should lean on *orchestrating existing doers* (Biomni, nf-core, Bioconductor) + the `map-to-established-method` guardrail, rather than reinventing analysis agents. Invest the pattern's teeth in Family B.
3. **The do→check loop is validated** — POPPER and Analyst-Inspector both instantiate "doing hands off to an external gate." Ours differs by refereeing *validity* (assumptions/double-dipping/invented-method) rather than hypotheses or reproducibility. Reuse POPPER's sequential-error-control mechanism as the loop's gate math.
4. **The anti-pattern has a name now:** AI-Scientist-style "reviewer that self-certifies via reasoning." Our whole point is to *not* be that — the referee runs empirical checks, it doesn't opine.
5. **Schemas-vs-verification split confirmed:** the genomics/stats gate is empirical (truth sets, calibration, permutation, simulation), not schematic. Supports demoting JSON-schema IO contracts and elevating empirical-gate Molds.

## Open questions surfaced by the research

- Position relative to **awesome-genomic-skills** — contribute, align, or stay separate?
- Build the gate math on **POPPER's** sequential-testing framework, or independent?
- Adopt **StatQA** as the referee-Mold eval harness?
- Is Family A in-scope as real "doing," or mostly orchestration-over-existing-doers + the establish-method guardrail?
