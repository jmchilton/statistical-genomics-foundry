# Initial Mold set — TODO outline (NOT yet authored)

> **This is a planning list, not a Mold inventory.** No Molds exist yet. Do **not** treat any line here as authored. Each entry is a candidate: a name, what it does, the failure it guards, its rough role, and the research grounding it would draw on. Authoring happens later, corpus-first, one at a time.
>
> Naming convention (cheap/reversible, per `ARCHITECTURE.md` §5 — do NOT formalize as a schema enum yet): `review-*` / `audit-*` (critique), `derive-*` / `design-*` (calibrate), plain verbs (do).

## Family A — do the analysis
*Lean: orchestrate established doers + bias hard toward established methods. Don't reinvent Biomni/nf-core/Bioconductor.*

- [ ] **`frame-the-question`** *(construct)* — turn a vague ask into a precise statistical question + explicit hypotheses, estimand, and what would count as evidence. Guards: ill-posed analyses that can't be refereed because nothing was actually claimed.
- [ ] **`review-experimental-design`** *(critique; partly mechanical)* — confounders, pseudoreplication, replication adequacy, batch **aliased** with condition (the unfixable case). Guards: rubber-stamping a doomed design. Grounding: design-matrix aliasing is deterministically detectable; Anderson/Marees QC protocols, ENCODE replicate standards.
- [ ] **`map-question-to-established-method`** *(construct; the anti-invention guardrail)* — recommend a *validated, literature-grounded* method (DESeq2 vs limma-voom vs a mixed model; SAIGE/regenie for imbalance) **instead of inventing one**. The direct analog of the parent's `discover-shed-tool` → only author-new-if-nothing-fits. Guards: the boss's exact scar. Grounding: StatQA applicability-error finding; Bioconductor/OSCA, GWASTutorial.
- [ ] **`run-analysis-reproducibly`** *(do; thin/orchestration)* — execute the chosen established tooling with seeds, pinned versions, provenance. Leans on existing doers; our value is the provenance + handoff to the referee, not re-implementing analysis.

## Family B — referee the analysis
*The teeth. Non-self-certifying. Two sub-roles: **critique** (reason about validity) and **calibrate** (construct empirical evidence).*

### Critique
- [ ] **`audit-method-validity`** *(critique; the flagship)* — the boss-scar Mold. Screen for: double-dipping / circular analysis, data leakage between selection and inference, ignored dependence structure, wrong/implausible null, p-hacking surface, unmet distributional assumptions, and **"is this named method actually real and appropriate?"**. Guards: confident invention + classic invalidity. Grounding: countsplit (double-dipping), garden-of-forking-paths, StatQA.
- [ ] **`assess-batch-effects-and-confounding`** *(critique→calibrate; partly mechanical)* — detect/quantify batch structure; recommend block-in-design vs ComBat/RUV/SVA; flag confounded (aliased) batches as unfixable. Grounding: sva/RUVSeq, batch-effect literature.
- [ ] **`multiple-testing-strategy`** *(critique)* — given #tests + dependence, recommend correction (BH-FDR, Bonferroni, hierarchical, knockoffs) and flag when naive correction is wrong (dependence, post-selection). Grounding: well-established; statsmodels `multipletests`.
- [ ] **`check-assumptions`** *(critique→calibrate)* — distributional / independence / dispersion assumptions per model family, via empirical diagnostics. Grounding: DHARMa (simulation-based residuals), DE-tool p-value-histogram/dispersion diagnostics.
- [ ] **`interpret-results-skeptically`** *(critique)* — sensitivity analyses, robustness to defensible analytic choices, over-claim guard. Grounding: specification-curve / multiverse analysis.

### Calibrate (construct the empirical check — this is where the gate becomes a *deliverable*)
- [ ] **`derive-null-and-calibration`** *(calibrate; the keystone)* — for a statistic/method, construct its null: permutation scheme, negative-control features, calibration check (are p-values uniform under the null?). The empirical gate the field actually trusts, made into a skill. Grounding: LDSC intercept / λGC / QQ (genomic calibration), permutation frameworks; POPPER uses this family.
- [ ] **`design-simulation-study`** *(calibrate)* — simulate data under a *known* generative model; measure type-I error, FDR control, power, calibration. Does the method recover truth? Grounding: SBC (simulation-based calibration), splatter/polyester, posterior predictive checks.
- [ ] **`power-and-sample-size`** *(calibrate; mostly a calculation — CLI-backed)* — power / required N for the planned test under stated effect sizes. Grounding: pwr/simr/G*Power.

## The referee gate / loop (NOT a Mold — structural)
- [ ] **`analyze → referee → revise` loop** — the spine (see `ARCHITECTURE.md` §4). A Family-A protocol must hand off to a Family-B referee before certifying ("the gate obligation"). Encoded at the protocol/pipeline altitude, not as a Mold property. The referee node is a Family-B Mold; the novelty vs POPPER is that it referees *method validity*, not a hypothesis.
- [ ] **`method-validation protocol`** *(protocol/pipeline)* — the one place pipelines re-earn their keep: `map-to-established` → (if novel) → `derive-null` → `design-simulation-study` → `power` → `sensitivity`. Author only if the standalone Molds prove they chain.

## Sequencing recommendation (when authoring starts)
1. **`audit-method-validity`** first — closest to the boss's actual scar; forces us to confront what "method validity" means concretely.
2. **`derive-null-and-calibration`** second — proves the "gate as deliverable" thesis; pairs with #1 to demonstrate the full do→referee handoff on one real fixture.
3. Then **`review-experimental-design`** + **`map-question-to-established-method`** — the Family-A guardrails that feed the referee.

## Open questions
- Which Mold is the flagship prototype? (Recommendation: `audit-method-validity`.) Depends on whether the boss's invented-method failure was a **design**-time or **interpretation**-time flaw.
- Is Family A in-scope as real "doing," or mostly orchestration-over-existing-doers + `map-to-established`? (Positioning leans orchestration; confirm.)
- Do the calibrate-Molds *call* tooling (R/Python) or *emit a protocol* a harness runs? (Affects whether they're CLI-backed Molds.)
- Does the construct/critique/calibrate triad survive contact with ~6–10 real Molds, or collapse/expand? (Tag softly; don't formalize.)
