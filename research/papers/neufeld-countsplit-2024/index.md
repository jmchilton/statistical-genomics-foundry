---
title: "Inference after latent variable estimation for single-cell RNA sequencing data"
type: paper
source_id: neufeld-countsplit-2024
source_url: https://arxiv.org/abs/2207.00554
doi: 10.1093/biostatistics/kxac047
access_date: "2026-06-30"
license: LicenseRef-arXiv-nonexclusive-distrib-1.0
attribution: "Neufeld A, Gao LL, Popp J, Battle A, Witten D. Biostatistics 25(1):270–287, 2024. Preprint arXiv:2207.00554v2 (18 Oct 2022)."
derived: "own-words paraphrase (license is non-CC); functional strings (formulas, parameter names, package/function names, numeric thresholds) kept verbatim as facts"
---

*Faithful clean-context note. License check: arXiv abstract page shows `nonexclusive-distrib/1.0/`, not a Creative Commons license, so this note is OWN-WORDS paraphrase. Only functional strings (equations, parameter names like ε, distribution forms, package/function names, recommended numeric values) are reproduced verbatim, as facts. Worked from arXiv full text (v2, Oct 2022); the published Biostatistics 2024 version was not separately consulted. Project framing lives in the flagged footer.*

## 1. Citation
Neufeld A, Gao LL, Popp J, Battle A, Witten D. "Inference after latent variable estimation for single-cell RNA sequencing data." *Biostatistics* 25(1):270–287, 2024. DOI 10.1093/biostatistics/kxac047. Open preprint arXiv:2207.00554v2 (18 Oct 2022).

## 2. Access note
Read from arXiv full-text PDF (v2). License is the arXiv non-exclusive distribution license, not CC, so own-words mode applies. Equations, distribution forms, the parameter ε, the ε=0.5 recommendation, and software names are functional strings and kept verbatim. Appendices (A–G, supplementary) were not read in detail; claims attributed to appendices are flagged where used.

## 3. Thesis
When a single-cell RNA-seq analysis estimates a latent variable (cell type/cluster, pseudotime/trajectory) from the count matrix and then tests each gene for association with that estimate **using the same data**, standard p-values fail to control Type 1 error ("double dipping"). The paper introduces **count splitting**: split each integer count into independent train/test parts via binomial (Poisson) thinning, estimate the latent variable on the train part, test on the test part. Under a Poisson assumption the two parts are independent, restoring valid inference for essentially any latent-variable estimator and any downstream test.

## 4. Problem & context
- Two canonical scRNA-seq questions unified as latent-variable inference: (Q1) which genes vary along a continuous trajectory/pseudotime; (Q2) which genes differ between discrete cell types. The trajectory/types are unobserved and estimated from X.
- Natural two-step procedure: Step 1 estimate L̂(X); Step 2 test each gene Xⱼ for association with L̂(X). Reusing X for both is "double dipping."
- Why it fails (paper's intuition, own words): the same realization X builds both the predictor (the estimated latent variable) and the response (the gene counts); the standard Wald test does not account for the fact that the estimation step (e.g. clustering) is *designed to maximize* the separation it is later tested for. Concretely, in their notation the right side of the test inequality uses the observed data for both predictor and response while the left side does not, so the p-values do not follow Unif(0,1) under the null.
- This is established practice: Monocle3 and Seurat vignettes perform both steps on the same data (cited as Pliner et al. 2022; Hoffman et al. 2022), so those pipelines do not control Type 1 error (shown empirically in their Appendix A). Prior literature flagged the issue without a fix: Lähnemann et al. 2020 ("double use of data," a "grand challenge"); Deconinck et al. 2021 ("circularity" → "artificially low p-values").

## 5. Method / approach — count splitting (Algorithm 1)
Model (eq. 2.1): entries of X independent, E[Xᵢⱼ] = γᵢ Λᵢⱼ with log(Λᵢⱼ) = β₀ⱼ + β₁ⱼᵀ Lᵢ; γᵢ are cell-specific size factors (assumed known/accurately estimated); L (and Λ) treated as fixed. Main analyses assume (eq. 2.4) **Xᵢⱼ ∼ Poisson(γᵢ Λᵢⱼ)**, independent. Differential expression done by fitting a GLM with log link predicting Xⱼ from the estimated latent variable, with γᵢ as offsets (ideas extend to GAMs, etc.).

**Algorithm 1 (count splitting), verbatim mechanism.** For a constant ε with **0 < ε < 1**:
- **Step 0 (split):** draw `Xᵢⱼ^train | {Xᵢⱼ = Xᵢⱼ} ∼ Binomial(Xᵢⱼ, ε)`, and set `X^test = X − X^train`.
- **Step 1 (estimate):** compute L̂(X^train) — latent variable estimated **on the train fold only**.
- **Step 2 (test):** for each gene j, fit a GLM with log link predicting `Xⱼ^test` from L̂(X^train), γᵢ as offsets; report the Wald p-value for H₀: β₁(L̂(X^train), Xⱼ^test) = 0 (eq. 4.13). **Test fold is the response.**

**Proposition 1 (binomial thinning of Poisson; cites Durrett 2019 §3.7.2):** if Xᵢⱼ ∼ Poisson(γᵢ Λᵢⱼ), then X^train and X^test are **independent**, with `X^train_ij ∼ Poisson(ε γᵢ Λᵢⱼ)` and `X^test_ij ∼ Poisson((1−ε) γᵢ Λᵢⱼ)`. Independence makes predictor and response independent on both sides of the test, so the Wald p-value keeps standard GLM properties (Type 1 error control for large n; invertible to confidence intervals).
- **Key insight (Remark 4.1):** the guarantee comes from train/test independence under the Poisson assumption, *not* from using a GLM or Wald test — any association test can be substituted in Step 2.
- Count splitting is a special case of "data fission" (Leiner et al. 2022, concurrent preprint); related thinning ideas in Batson et al. 2019, Chen et al. 2021, Gerard 2020.

**Choosing ε (Section 4.3):** ε trades information for estimating L against information for inference.
- **Proposition 3:** Cor(Xᵢⱼ, X^train_ij) = √ε — smaller ε ⇒ L̂(X^train) less like L̂(X), poorer estimate.
- **Proposition 4:** Var(β̂₁(L, Xⱼ^test)) ≈ (1/(1−ε)) · Var(β̂₁(L, Xⱼ)) — larger ε inflates coefficient variance, lowering power.
- **Recommended default: ε = 0.5** (balances estimation vs. downstream inference).

## 6. Key claims / findings (atomic)
1. Double dipping (same data both steps) yields anti-conservative, non-uniform null p-values (Fig 2a); Seurat/Monocle3 vignette pipelines inherit this.
2. **Cell splitting fails** here (§3.3): you cannot get test-cell latent coordinates that depend only on the train cells; the projection step reuses X^test, reproducing the double-dip dependence; p-values anti-conservative.
3. **Gene splitting** (§3.4) gives valid p-values but is "fundamentally unsatisfactory" because it cannot produce a p-value for *every* gene against the *same* estimated latent variable.
4. Selective-inference-by-conditioning (§3.5), jackstraw (§3.6), and PseudotimeDE (§3.7) are each shown inadequate (normality needed / bespoke per estimator / mis-calibrated by gene).
5. Count splitting with ε=0.5 produces uniform null p-values for all genes in the Poisson motivating example (Fig 2a).
6. Simulation (n=2700, p=2000; γᵢ ∼ Gamma(10,10) treated as known; 90% null genes, 10% DE; both trajectory [first PC] and clustering [k-means, k=2] settings): count splitting **controls Type 1 error across a range of ε** (Fig 3a); power increases with the true effect and **decreases as ε increases** (Fig 3c); 95% Wald CIs achieve nominal coverage for the target parameter (Table 1).
7. Estimation quality of L degrades with smaller ε and with shallower/sparser ("low-intercept," β₀ⱼ=log(3)) sequencing — small ε with shallow data leaves many zeros in X^train (Fig 3b). Count splitting works best on **deeply sequenced** data.
8. Real data (Elorbany et al. 2022 cardiomyocyte differentiation; 7 time points over 15 days, 19 cell lines): on 10,000 cells with strong true IPSC→CM signal, count splitting (ε=0.5, Monocle3 `orderCells()`, p=2,500 high-variance genes) identifies largely the same DE genes as double dipping; full double dipping's smaller p-values trace to using twice the data, not artifacts (test-double-dipping control matches count splitting).
9. On 2,303 Day-0 (pre-differentiation, ~homogeneous) cells, count splitting gives uniform p-values (controls Type 1 error) while both double-dipping variants produce false positives — true signal cannot be assumed to outweigh double-dipping bias without assessment.

## 7. Load-bearing statements (own-words, per non-CC mode)
- **Validity property (paraphrase):** Because Poisson thinning makes the train and test counts independent, the Step-2 GLM uses an independently-estimated predictor and an independent response, so its Wald p-value retains ordinary large-n Type 1 error control and its inversion yields valid confidence intervals — despite train and test both deriving from the same original counts.
- **Poisson-assumption statement (paraphrase):** Train/test independence in Proposition 1 holds **if and only if** Xᵢⱼ is Poisson (citing Kimeldorf et al. 1981). Apply Algorithm 1 to non-Poisson data and predictor/response become dependent, so the null p-value is no longer uniform.
- Functional strings reproduced verbatim above: `Binomial(Xᵢⱼ, ε)`; `X^test = X − X^train`; `Poisson(ε γᵢ Λᵢⱼ)`, `Poisson((1−ε) γᵢ Λᵢⱼ)`; `Cor(Xᵢⱼ, X^train_ij) = √ε`; `Var ≈ (1/(1−ε))·Var`; recommended `ε = 0.5`.

## 8. Scope / assumptions / limitations
- **Central requirement: counts are Poisson** (after accounting for size factors γᵢ and per-gene/cell means). The guarantee is exactly as strong as this assumption (independence holds iff Poisson).
- γᵢ size factors assumed known or accurately estimated; L and Λ treated as fixed.
- Works for "virtually any" latent-variable estimator and inference method — the flexibility is the selling point.
- Practical caveat: less effective on **shallow/sparse** sequencing, especially with small ε (X^train becomes mostly zeros, degrading L estimation and power).
- Gene splitting valid but cannot give all-gene inference vs. a common latent variable; cell splitting invalid in this unsupervised setting.

## 9. Failure modes / invalidity patterns (referee-relevant)
- **The same-data-twice failure it fixes:** estimating a cluster/trajectory and testing genes against it on one dataset ⇒ anti-conservative, artificially small p-values; Type 1 error uncontrolled. This is the defining invalidity (Figs 1, 2a, and the Day-0 real-data panel).
- **What invalidates count splitting's own guarantee:**
  - Non-Poisson counts (overdispersion). Independence breaks; null p-values no longer uniform. Quantified for negative-binomial data via a Gamma expression model (eq. 4.14): X^train and X^test are NB and **correlated**, with `Cor(X^train, X^test) = √(ε(1−ε)) / √(ε(1−ε) + b_j²/Λᵢⱼ² + b_j/Λᵢⱼ)` (**Proposition 2**). The ratio Λ/b governs correlation: when Λ/b is small, p-values stay ~uniform (near Type 1 control); as Λ/b grows, count splitting degrades toward double dipping — and in the worst case is **no worse than** double dipping. (They report Appendix F finds most estimated Λᵢⱼ/bⱼ < 1 in their real data, justifying Poisson use.)
  - Reusing X^test inside the "training" pipeline — e.g. a projection/pre-processing step that touches the test fold reintroduces dependence (the exact reason cell splitting fails). The paper explicitly ensures no pre-processing for L̂(X^train) uses X^test.
  - Inaccurate size-factor estimation (γᵢ) is assumed away, not solved here.

## 10. What it does NOT address
- A method guaranteeing validity under overdispersion/NB — explicitly deferred: "In future work, we will consider splitting algorithms for overdispersed count distributions." Leiner et al. 2022's conditional-distribution (X^test | X^train) route is mentioned but judged not to "lend itself to inference on parameters of interest."
- Size-factor estimation (assumed known/accurate).
- Choosing the number of clusters/dimensions (named only as possible future use).
- Multiple-testing correction across genes is not the focus.
- Formal benchmarking of specific cell-type/trajectory tools beyond Monocle3/Seurat vignette behavior.

## 11. Open questions / ambiguities
- The paper does **not** name an explicit count-splitting R *function*; it cites "an R package with tutorials" at `anna-neufeld.github.io/countsplit` and reproduction code at `github.com/anna-neufeld/countsplit_paper`. The package name is `countsplit` (from the URL); specific function name not stated in this preprint version [summarizer-inferred from URL].
- This v2 preprint (Oct 2022) does **not** cite the later NB-splitting paper (arXiv:2307.12985, 2023) — it only promises future work on overdispersed splitting. Whether the published 2024 Biostatistics version adds that reference was not checked here.
- PseudotimeDE's exact intended null is described as "not entirely clear" by the authors.

## 12. Guidance answers
- **Exact problem & why Type 1 error fails:** Answered (§4, §6.1). Reusing X to build predictor L̂(X) and to test response Xⱼ; the Wald test ignores that estimation maximizes the very separation tested; RHS of the test uses data for both predictor and response, LHS does not ⇒ non-uniform null p-values. Term used: "double dipping."
- **Count-splitting procedure / Poisson thinning / parameter ε / default / independence:** Answered (§5). `Xᵢⱼ^train ∼ Binomial(Xᵢⱼ, ε)`, `X^test = X − X^train`, `0 < ε < 1`, **default ε = 0.5**. Independence of folds holds under the Poisson assumption (Proposition 1), with X^train ∼ Poisson(εγΛ), X^test ∼ Poisson((1−ε)γΛ).
- **Which fold for which step:** Answered. **Estimate L on X^train (Step 1); test genes on X^test (Step 2, response = X^test).**
- **Poisson assumption + overdispersion + NB extension:** Answered (§4.2, §10). Independence holds **iff** Poisson (Kimeldorf et al. 1981). Under NB/overdispersion folds are correlated (Prop 2; Λ/b controls severity); count splitting degrades toward but never worse than double dipping. The NB *method* is **not** developed here — flagged as future work; near-validity needs the overdispersion to be small (Λ/b small). The 2023 NB companion (arXiv:2307.12985) is **not** referenced in this preprint version. Per guidance, noted but not summarized.
- **Stated scope/limits:** Answered (§8, §9): Poisson required; known size factors; weaker on shallow/sparse data and small ε.
- **Software (R package + key functions):** Partially answered. Package: `countsplit` (`anna-neufeld.github.io/countsplit`); paper code `github.com/anna-neufeld/countsplit_paper`. The only named function in the text is Monocle3's `orderCells()` (used for trajectory estimation in the application), not a countsplit function. Countsplit's own function name is **not stated** in this version → [GAP: re-check published version / package docs for the splitting function name].
- **Must-quote items (validity property; Poisson-assumption statement):** Delivered as own-words paraphrases in §7 (non-CC license precludes verbatim prose); the load-bearing functional strings/formulas are verbatim.

## Relevance to this project  `[design-inference — author-added, not from source]`
- **Pole:** established-good (remedy). The **single-cell** operationalization of the [[double-dipping]] fix that bioSkills omits — count splitting for cluster-then-DE / trajectory-then-DE.
- **Grounds the `cluster-then-test` signature's remedy** in [[double-dipping]] and the `required_action` the [[audit-method-validity]] referee emits on that signature (`scenarios.md` case `double-dip-single-cell-cluster-then-de`): name count-splitting / selection-aware inference, default **ε = 0.5**, estimate latent variable on train fold, test on test fold.
- **Calibrate hook (Family B):** the validity guarantee is *conditional on Poisson*; the honest referee must check that condition, not just name the remedy. The NB degradation bound (Prop 2; Λ/b governs severity, worst case "no worse than double dipping") is exactly the kind of empirical check `[[derive-null-and-calibration]]` would run.
- **Pairs with the cautionary counterweight** [[double-dipping-survey]] → Hivert et al. 2024: data fission/thinning can *fail in practice* when overdispersion is unknown — i.e. the Poisson assumption this note flags is precisely where the remedy breaks. Established-good remedy + cautionary-bad practical limit = a bipolar-corpus pair on the same method.
- **Co-cite:** [[kriegeskorte-2009]] (the principle: non-independence under the null), [[gao-clusterpval-2024]] (the conditional-inference alternative to information-partitioning).
