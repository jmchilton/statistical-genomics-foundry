---
title: "Selective Inference for Hierarchical Clustering"
type: paper
source_id: gao-clusterpval-2024
source_url: https://arxiv.org/abs/2012.02936
doi: 10.1080/01621459.2022.2116331
access_date: "2026-06-30"
license: "arXiv.org perpetual non-exclusive license 1.0 (nonexclusive-distrib/1.0) — NOT Creative Commons; restrictive. Summary is own-words."
attribution: "Gao LL, Bien J, Witten D. \"Selective Inference for Hierarchical Clustering.\" Journal of the American Statistical Association 119(545):332–342, 2024. DOI 10.1080/01621459.2022.2116331. Read via arXiv:2012.02936v3 (31 Oct 2022, \"Final accepted version\"). Own-words summary; restrictive license."
derived: own-words-summary
---

*Faithful clean-context note: read only the arXiv PDF (2012.02936v3) and this source's `guidance.md`. arXiv license tag is the default non-exclusive distribution license (not CC), so the prose is own-words paraphrase; only functional strings (equation forms, the conditioning event, exact numbers, the R package name) are reproduced verbatim as facts. Project framing lives in the flagged footer.*

## 1. Citation
Gao LL, Bien J, Witten D. "Selective Inference for Hierarchical Clustering." *Journal of the American Statistical Association* 119(545):332–342, 2024. DOI 10.1080/01621459.2022.2116331. Preprint arXiv:2012.02936. Authors: U. British Columbia (Statistics), U. Southern California (Data Sciences & Operations), U. Washington (Statistics/Biostatistics).

## 2. Access note
Read the arXiv full text, version v3 (submitted 31 Oct 2022), labeled by the authors "Final accepted version." Fetched the PDF (https://arxiv.org/pdf/2012.02936) and extracted text locally; figures rendered as noise but all equations, tables, and prose sections were legible. arXiv license: `nonexclusive-distrib/1.0` — restrictive, so own-words mode used. JASA page numbers (332–342) come from the assignment, not the preprint.

## 3. Thesis (1 sentence)
When the two groups being compared are themselves defined by clustering the data, a classical (Wald) test for a difference in cluster means has a grossly inflated Type I error rate — and sample-splitting does not fix it — so the paper derives a selective-inference p-value that conditions on the clustering having produced those clusters, with exact finite-sample computation for agglomerative hierarchical clustering under several common linkages.

## 4. Problem & context
- Testing a difference in means between groups is routine, and classical tests control Type I error **when groups are fixed a priori**. Increasingly, groups are instead defined by a clustering algorithm and then tested on the **same** data ("double use of data"), which invalidates the inference.
- Motivating domain: single-cell RNA-sequencing (scRNA-seq), where cells are clustered into putative cell types and then tested for differential expression between types in that same dataset. The paper names the `FindMarkers` function in the R package **Seurat** as an instance of this problematic practice. Testing a difference in means between estimated clusters with Type I control is cited as one of eleven "grand challenges" in single-cell data science (Lähnemann et al. 2020). Analogous issues noted in neuroscience (Kriegeskorte et al. 2009).

## 5. Method/approach
**Data model (Eq. 1):** `X ~ MN_{n×q}(μ, I_n, σ² I_q)` — matrix-normal, n observations × q features, rows independent, mean matrix μ unknown, scalar variance **σ² > 0 known** (unknown-σ handled in §4.3; non-spherical known Σ in §4.2). Mean of a group G: `μ̄_G = (1/|G|) Σ_{i∈G} μ_i`; empirical mean `x̄_G` analogously (Eq. 2).

**Procedure:** apply clustering algorithm C to a realization x to get partition C(x); then for a pair of clusters Ĉ₁, Ĉ₂ ∈ C(x), test the **difference in mean vectors** (Eq. 3): `H0^{Ĉ₁,Ĉ₂}: μ̄_{Ĉ₁} = μ̄_{Ĉ₂}` vs. `μ̄_{Ĉ₁} ≠ μ̄_{Ĉ₂}`. This is a difference in MEANS (the full q-dimensional cluster mean vectors), not a per-feature test.

**The naive Wald test (Eq. 4):** p-value `P(‖X̄_{Ĉ₁} − X̄_{Ĉ₂}‖₂ ≥ ‖x̄_{Ĉ₁} − x̄_{Ĉ₂}‖₂)`, where under H0 `‖X̄_{Ĉ₁} − X̄_{Ĉ₂}‖₂ ~ σ·√(1/|Ĉ₁| + 1/|Ĉ₂|)·χ_q`. It is invalid because Ĉ₁, Ĉ₂ are functions of x, so the observed right-hand side is not a draw from that scaled-χ_q null.

**The selective fix — conditioning event.** The natural conditional p-value (Eq. 5) conditions on `{Ĉ₁, Ĉ₂ ∈ C(X)}`, which "asks: among all realizations of X that yield clusters Ĉ₁ and Ĉ₂, what fraction have a cluster-mean difference at least as large as observed, when μ̄_{Ĉ₁}=μ̄_{Ĉ₂}?" Rejecting when (5) < α controls the **selective Type I error rate** (Definition 1, after Fithian et al. 2014). But (5) is not computable: its null distribution depends on unknown nuisance parameters `π⊥_{ν(Ĉ₁,Ĉ₂)} μ`. So the paper conditions on **additional** events to make it tractable (Eq. 8), conditioning on:
- `π⊥_{ν(Ĉ₁,Ĉ₂)} X = π⊥_{ν(Ĉ₁,Ĉ₂)} x` (the component of X orthogonal to the difference-direction vector ν is held fixed), where `π⊥_ν = I_n − νν^T/‖ν‖²` and `[ν(Ĉ₁,Ĉ₂)]_i = 1{i∈Ĉ₁}/|Ĉ₁| − 1{i∈Ĉ₂}/|Ĉ₂|` (Eq. 7);
- `dir(X̄_{Ĉ₁} − X̄_{Ĉ₂}) = dir(x̄_{Ĉ₁} − x̄_{Ĉ₂})` (the direction is held fixed), where `dir(w) = (w/‖w‖₂)·1{w≠0}`.

This collapses the remaining randomness to a single scalar while preserving selective Type I control (extra conditioning may cost power — Lee et al. 2016; Jewell et al. 2019).

**The p-value (Theorem 1, Eq. 9):** `p = 1 − F(‖x̄_{G₁} − x̄_{G₂}‖₂ ; σ·√(1/|G₁| + 1/|G₂|), S(x;{G₁,G₂}))`, where `F(t; c, S)` is the CDF of a `c·χ_q` random variable **truncated to the set S**. Truncation set (Eq. 12): `Ŝ = {φ ≥ 0 : Ĉ₁, Ĉ₂ ∈ C(x'(φ))}` — the φ-values for which clustering the *perturbed* dataset still returns the same two clusters. Perturbation (Eq. 13): `x'(φ) = π⊥_{ν̂} x + (φ / √(1/|Ĉ₁| + 1/|Ĉ₂|))·ν̂·dir(x̄_{Ĉ₁} − x̄_{Ĉ₂})^T`. Interpretation (Eq. 14): x'(φ) "pulls apart" (φ large) or "pushes together" (φ small) the two clusters along the direction of their mean difference; Ŝ is the set of φ that preserve the clustering. Exact p-value computation reduces to characterizing this one-dimensional set Ŝ.

**Linkages / computing Ŝ (§3).** For squared Euclidean distance and any linkage with a **linear Lance–Williams update** (Eq. 20), pairwise dissimilarities `d(G,G';x'(φ))` are quadratic in φ (Proposition 1), so Ŝ is computed by solving O(n²) quadratic inequalities. Linkages satisfying (20): **average, weighted, Ward, centroid, median** (Table 1). Average/weighted/Ward additionally produce **no inversions**, giving Ŝ in O(n² log n). **Single linkage** does *not* satisfy (20) but admits an even simpler closed form (§3.4, Proposition 4, Eq. 21), also O(n² log n). **Complete linkage** does not satisfy (20) and Ŝ cannot be computed efficiently → handled by Monte Carlo (§4.1).

**Monte Carlo / importance sampling (§4.1, Eq. 22):** for methods where Ŝ is intractable (complete linkage; non-hierarchical clustering), the p-value is a ratio of expectations estimated by importance sampling — sampling `ω_i ~ N(‖x̄_{Ĉ₁}−x̄_{Ĉ₂}‖₂, σ²(1/|Ĉ₁|+1/|Ĉ₂|))` with weights `π_i = f₁(ω_i)/f₂(ω_i)` (f₁ the scaled-χ_q density, f₂ the normal density) — avoiding computing Ŝ.

## 6. Key claims/findings (atomic)
1. Classical/Wald test after clustering is "extremely anti-conservative" (Type I error grossly inflated) because clustering selected the hypothesis from the data (Fig. 1b).
2. **The inflation persists even with two separate, independent datasets** used to define groups vs. test (abstract; sample-splitting argument §1).
3. The selective p-value (Eq. 9) controls the **selective** Type I error rate at level α exactly in finite samples, assuming σ known (Theorem 1, Eq. 11).
4. Exact, efficient computation for hierarchical clustering with squared Euclidean distance: O(n² log n) for average, weighted, Ward, and single linkage; complete linkage requires Monte Carlo (§3–§4.1).
5. Under a global null (μ = 0), selective p-values are Uniform(0,1) across average/centroid/single/complete linkage; the naive Wald p-values are not (§5.1, Fig. 4).
6. Quantitative inflation evidence — scRNA-seq "no clusters" data (all memory T cells, no true clusters; Table 3): naive Wald p-values `< 10⁻³⁰⁷` for all three cluster pairs (catastrophic false positives), while the selective test gives 0.20, 0.27, 0.70 (correctly non-significant). In the "clusters" data (T cells, B cells, monocytes), both tests reject (selective p-values 4.60×10⁻²⁸, 3.20×10⁻⁸², 1.13×10⁻⁷³).
7. Penguins data (Table 2): when two clusters are the **same species** (clusters 1,2), Wald p = 0.00383 (falsely significant) but selective p = 0.591 (correct); when clusters span different species, selective test gives small p (e.g. 1.70×10⁻¹⁴ for 1,3).
8. Unknown σ (§4.3): plugging in an asymptotic **over-estimate** of σ yields asymptotic selective Type I control (Theorem 4) and finite-sample conservatism (p-values stochastically larger than Uniform).

## 7. Load-bearing statements (own-words mode; functional strings verbatim)
- Abstract (own-words): Classical difference-in-means tests control Type I error when groups are set a priori, but clustering-defined groups make the same test extremely anti-conservative; **notably this problem persists even if two separate and independent datasets are used to define the groups and to test their mean difference.** The proposed selective approach controls the selective Type I error rate by accounting for the fact that the null hypothesis was chosen from the data; exact p-values are computed for agglomerative hierarchical clustering with many common linkages.
- Why sample-splitting fails (own-words, §1): even if you cluster a training set and assign test-set points to those clusters (e.g. by a k-nearest-neighbors classifier), the act of assigning test observations to clusters *again uses the data to select the null* — `H0^{Ĉ₁,Ĉ₂}` becomes a function of the test observations — so the Wald test on the test set is again extremely anti-conservative (Fig. 2d). The paper's framework avoids splitting entirely, enabling inference on clusters from all the data. (Verbatim functional anchor: the conditioning event `{Ĉ₁, Ĉ₂ ∈ C(X)}`; the perturbation `x'(φ)` Eq. 13; the truncated-`χ_q` CDF `F(t; c, S)` Eq. 9.)
- Type-I inflation, verbatim numeric: naive Wald p-values `< 10⁻³⁰⁷` on a dataset with no true clusters (Table 3, "no clusters" columns).

## 8. Stated scope / assumptions / limitations
- Spherical matrix-normal model with **known σ²** (Eq. 1) is the core assumption; non-spherical extension (§4.2) assumes **known Σ**; both "are unlikely to hold in practice" (Discussion), so applications plug in estimates (σ̂; POET-estimated Σ).
- Consistent estimation of σ in model (1) is described as a major open challenge; §4.3 only guarantees *asymptotic* control via an over-estimate, and an analogue under the non-spherical model (Eq. 23) is left to future work.
- Exact computation requires **squared Euclidean distance**. Complete linkage and non-hierarchical methods are not exactly computable (Monte Carlo only).
- Extra conditioning (orthogonal projection + direction) can reduce power vs. the ideal conditional test; near the left boundary of Ŝ the test has low power (noted for some penguin cluster pairs).
- Tests a difference in the full mean vector between **two** clusters; multiplicity across many cluster pairs is not the focus (selective Type I is per-tested-pair; Propositions 5–6 give related demonstrable properties for K=2 and randomly-chosen pairs).

## 9. Failure modes / invalidity patterns (referee-relevant)
- **Naive test after clustering (Wald, Eq. 4):** invalid — Type I error grossly inflated; on a true null with no real clusters it returned p `< 10⁻³⁰⁷` (Table 3). The failure cause is hypothesis selection from data, not a modeling error.
- **Sample-splitting / "use independent data" fix:** *still invalid* — assigning held-out points to training clusters re-selects the null from the held-out data; the test-set Wald test is again anti-conservative (Fig. 2d). This is the load-bearing negative result: independence of the two datasets does not restore validity, because the selection event is re-incurred at assignment.
- **Plugging in an under-estimate of σ:** would break control; the safe direction is an *over*-estimate (asymptotic control, conservative finite-sample behavior, §4.3 / Appendix D.1).
- Magnitude framing: the paper documents inflation via QQ-plots ("extremely anti-conservative") and the `< 10⁻³⁰⁷` vs. 0.20–0.70 contrast under a known true null, rather than a single headline rejection-rate percentage at nominal 0.05.

## 10. What the source does NOT address
- No single summary statistic like "observed Type I rate = X% at nominal 5%" for the naive test; inflation is shown graphically and via the scRNA-seq false-positive p-values.
- No method for non-Euclidean distances with exact computation; k-means / other non-hierarchical clustering only via Monte Carlo.
- Does not solve consistent σ estimation; does not extend Theorem 4 (unknown-variance asymptotics) to the non-spherical model.
- Does not give explicit R function names in the main text (only the package name and URLs).
- Power is characterized empirically (conditional power, recovery probability) but no general power theory.

## 11. Open questions / ambiguities
- The source names the R package (`clusterpval`) but the main text does not state the exact exported **function names** for computing the exact vs. Monte Carlo p-values — `[summarizer-inferred]` that they live in the package at lucylgao.com/clusterpval; not verifiable from the paper alone.
- "Difference in means" here is the equality of full q-dimensional cluster **mean vectors** (multivariate), distinct from a per-feature differential-expression test; downstream skill use should not conflate the two (Zhang et al. 2019 do the single-feature, sample-split variant).

## 12. Guidance answers
- **Exact problem statement / inflation magnitude:** Captured. Classical test valid for a-priori groups; clustering-defined groups → "extremely inflated"/"extremely anti-conservative." Quantitative magnitude: Wald p `< 10⁻³⁰⁷` for all three pairs on a no-true-cluster dataset (Table 3); under global null the Wald QQ-plot departs grossly from Uniform (Fig. 1b). No single rejection-rate-at-0.05 figure is given for the naive test.
- **Load-bearing "independent datasets" claim:** Yes — stated in the abstract and argued in §1. Mechanism captured: assigning held-out observations to training clusters re-uses data to select the null, so `H0` becomes a function of the test observations and the Wald test is again anti-conservative (Fig. 2d). This defeats the "just split the data" fix; Zhang et al. (2019) recover validity only for a single-feature test in the held-out set, whereas this paper avoids splitting.
- **Valid test / what it conditions on:** Captured. Conditions on `{Ĉ₁, Ĉ₂ ∈ C(X)}` (the realized clusters appear in the clustering) **plus** the orthogonal projection `π⊥_{ν} X = π⊥_{ν} x` and the direction `dir(X̄_{Ĉ₁}−X̄_{Ĉ₂})`, reducing to a 1-D truncated-`χ_q` problem (Eq. 8–13). Exact/tractable for agglomerative hierarchical clustering with squared Euclidean distance: average, weighted, Ward, centroid, median (linear Lance–Williams, Eq. 20) and single linkage; complete linkage via Monte Carlo.
- **Data-generating model / scope:** Captured. `X ~ MN_{n×q}(μ, I_n, σ²I_q)`, σ² known (Eq. 1); §4.2 known non-spherical Σ; §4.3 plug-in σ̂ with over-estimate giving asymptotic control. Limited to squared Euclidean distance for exactness.
- **Software (R package + functions):** Package = `clusterpval` (http://lucylgao.com/clusterpval); experiments at github.com/lucylgao/clusterpval-experiments; hierarchical clustering uses the `fastcluster` package. Exact function names not given in the text → flagged in §10/§11.
- **Difference in MEANS / which null:** Yes — tests `H0: μ̄_{Ĉ₁} = μ̄_{Ĉ₂}`, equality of the two clusters' (multivariate) mean vectors (Eq. 3), against the two-sided alternative.

## Relevance to this project  `[design-inference — author-added, not from source]`
- **Pole:** established-good (remedy). The **conditional-selective-inference** branch of the [[double-dipping]] cluster-then-test remedy — the alternative to [[neufeld-countsplit-2024]]'s information-partitioning (per [[double-dipping-survey]]'s taxonomy).
- **Load-bearing referee fact:** *sample-splitting / "we used independent data" does NOT fix cluster-then-test* — the selection event is re-incurred when held-out points are assigned to clusters. This means the [[audit-method-validity]] referee must **not** accept "independent dataset" as a sufficient remedy for the cluster-then-test signature; only a selection-aware test (conditional SI) or count-splitting qualifies. Strengthens `scenarios.md` case `double-dip-single-cell-cluster-then-de`.
- **Calibrate hook (Family B):** the global-null check — under μ=0 the valid p-values are Uniform(0,1) while naive Wald is not (Fig. 4) — is the run-on-noise detector from [[kriegeskorte-2009]] instantiated for clustering; connects to `[[derive-null-and-calibration]]`.
- **Concrete signature for the leaf:** names `Seurat::FindMarkers` as a real-world instance of cluster-then-DE on the same data — a citable, recognizable example.
- **Co-cite:** [[kriegeskorte-2009]] (the principle), [[neufeld-countsplit-2024]] (the information-partitioning alternative), [[korthauer-dmrseq-2019]] (the same select-then-test logic in methylation).
