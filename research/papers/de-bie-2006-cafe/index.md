# CAFE: a computational tool for the study of gene family evolution (De Bie et al. 2006)

## 1. Citation
De Bie T, Cristianini N, Demuth JP, Hahn MW. 2006. "CAFE: a computational tool for the
study of gene family evolution." *Bioinformatics* 22(10):1269–1271.
DOI 10.1093/bioinformatics/btl097.
URL: https://academic.oup.com/bioinformatics/article/22/10/1269/237347
No open-access CC license; page carries "© The Author 2006. Published by Oxford University
Press. All rights reserved." Access date: 2026-07-03.

## 2. Access note
Applications Note (short, ~3 pages). Abstract and main-text body text were readable via the
article web page; the typeset PDF is subscriber-only. Content below was reconstructed from the
readable web text and cross-checked against an independently hosted copy and the paper's own
downstream description; the three branch-attribution method names and their descriptions were
corroborated by a second source. No paywall boundary blocked the load-bearing content the
guidance targets. **License mode: restrictive/all-rights-reserved → §7 rendered as own-words
paraphrase; functional strings (term/method/parameter names, equation-role symbols) reproduced
verbatim.**

## 3. Thesis (1 sentence)
CAFE is a tool that fits a stochastic birth-and-death process to gene-family sizes over a given
phylogeny, and from that fit estimates rates, infers ancestral family sizes, flags families with
unusual (accelerated) rates of gain and loss via a p-value, and points to the branches
responsible for a family's significance.

## 4. Problem & context
Gene families change in size across a phylogeny through gene gain (duplication) and loss.
The paper's premise is that these size changes can be modeled statistically as a birth-and-death
process along a species tree, letting one ask which families evolve unusually fast and where on
the tree the unusual change occurred. CAFE packages this analysis for a specified tree plus a
matrix of observed family sizes in extant species.

## 5. Method / approach
Model: a stochastic birth-and-death process for gene-family size evolution over the phylogeny,
governed by a single global rate parameter **λ** — the per-gene probability of gain or loss per
unit time. The model assumes gene birth and gene death are equally probable (one shared λ, not
separate birth and death rates).

Given a tree and observed extant family sizes, CAFE performs:
1. **Rate estimation** — estimate the global birth-and-death rate λ by maximum likelihood, or the
   user may supply a fixed numerical λ.
2. **Ancestral reconstruction** — infer the most likely gene-family size at every internal
   (ancestral) node; described as the "Viterbi" (most-likely-state) assignment for each family.
3. **Per-family significance** — for each family, compute a **p-value** for the observed extant
   family sizes under the fitted model (see §5a).
4. **Branch attribution** — for significant families, identify which branches drive the small
   p-value, via three methods (see §5b).

### 5a. Per-family p-value (load-bearing)
For each family, CAFE computes a p-value for the observed extant-species family sizes *given the
fitted birth-and-death model* (the null = the single-global-λ birth-death process fitted to the
data). Small p-values indicate the observed configuration is unlikely under that model; families
with large variance in size — especially among closely related species — tend to get low
p-values. The paper states that computing these p-values exactly is not feasible, so **Monte
Carlo sampling** (simulation under the fitted model) is used to obtain them.

### 5b. Branch-specific attribution (load-bearing) — three methods
Each method asks, for a family already flagged, which branch(es) make its overall p-value small;
the reference/null in each case is the fitted single-global-λ model:
- **Viterbi** — using the Viterbi (most-likely) ancestral-size assignments, compute a p-value for
  the parent→child transition along each branch; branches with low p-values represent unusually
  large changes (expansions or contractions).
- **Branch cutting** — test whether the family's overall p-value *increases* when a given branch
  is "cut," i.e. the probabilistic coupling between that parent and child family size is removed;
  a large increase implicates that branch as responsible for the low overall p-value.
- **Likelihood ratio test** — re-maximize the family's likelihood allowing a *separate* λ on the
  branch under test, and compare (ratio) the two-parameter likelihood to the single-λ likelihood
  to assess whether an extra rate parameter is warranted on that branch.

### 5c. Inputs and assumptions
- **Tree**: a Newick description of a **rooted and bifurcating** phylogenetic tree, **including
  branch lengths in units of time**.
- **Data**: a family-size matrix giving gene-family sizes for the extant taxa; may hold one
  family up to thousands of families for the specified tree.
- **λ**: user-supplied single numeric value, or found by maximum likelihood.
- Assumes gene birth and death are equally probable. Computation scales linearly with the number
  of species.

## 6. Key claims / findings
- CAFE fits a birth-death model with a single global rate λ to family-size data over a fixed tree.
- It estimates λ (ML) or accepts a fixed λ.
- It infers most-likely ancestral family sizes at internal nodes (Viterbi assignment).
- It assigns each family a p-value for having an accelerated / unusual rate of gain–loss, computed
  under the fitted model via Monte Carlo sampling.
- For significant families it locates responsible branches by three methods: Viterbi per-branch
  transition p-values, branch cutting, and a per-branch likelihood ratio test.
- Required tree is rooted, bifurcating, with branch lengths in time units.
- Runtime scales linearly with number of species.
- The paper reports no multiple-testing / FDR correction across families (see §9, §10, §12).

## 7. Load-bearing statements — OWN-WORDS (restrictive license; functional strings verbatim)
- Abstract's stated capabilities (paraphrased): for a specified tree and given extant family
  sizes, CAFE can estimate the global birth-and-death rate, infer the most likely family size at
  all internal nodes, identify families with accelerated rates of gain and loss quantified by a
  **p-value**, and identify which branches cause the p-value to be small for significant families.
- Per-family p-value (paraphrased): for each family CAFE computes a p-value for the extant-species
  family sizes given the model; obtaining these p-values requires **Monte Carlo sampling** for
  computational feasibility.
- Branch cutting (paraphrased): "cutting" a branch means removing the probabilistic coupling
  between the parent and child family sizes on that branch; if the family's overall p-value rises
  substantially after cutting, that branch is implicated as the cause of the low overall p-value.
- Verbatim functional strings: **λ**; **p-value**; method names **"Viterbi"**, **"branch
  cutting"**, **"likelihood ratio test"**; input format = **Newick**, tree **"rooted and
  bifurcating"** with **"branch lengths in units of time"**.

## 8. Stated scope, assumptions, limitations
- Single global rate λ; birth and death equally probable (one shared rate, no separate
  gain vs. loss rates in the base model).
- Requires a rooted, bifurcating tree with time-calibrated branch lengths supplied by the user.
- p-values are obtained by Monte Carlo, i.e. approximate/simulation-based, not closed-form.
- It is an Applications Note describing the tool; the underlying birth-death methodology is
  attributed to the associated primary methods work (Hahn et al.), not re-derived here.

## 9. Failure modes / invalidity patterns
- **Tree/branch-length dependence**: results are conditional on the user-supplied rooted,
  bifurcating tree and its branch lengths in time units; a wrong topology or miscalibrated branch
  lengths invalidates the fit (source states the input requirement; the invalidation consequence
  is [summarizer-inferred]).
- **Single-λ assumption**: the base null assumes one global rate with equal birth and death; a
  family or lineage that genuinely violates this is exactly what the p-value / branch tests are
  meant to surface, but the fitted global λ is itself the reference, so a poorly-fitting global
  rate biases every family's p-value [summarizer-inferred].
- **Monte Carlo approximation**: p-values are simulation-estimated, so precision depends on
  sampling; the paper notes Monte Carlo is used for feasibility but does not state a sample-count
  default or precision bound in the readable text.
- **High-variance families**: families with large size variance, especially among closely related
  species, tend toward low p-values — flagged by the source as the signal, i.e. the expected
  driver of significance.

## 10. What the source does NOT address (confident silences)
- **Multiple testing across families**: the readable text contains no mention of multiple-testing
  correction, false discovery rate (FDR), family-wise error, or any adjustment for testing
  thousands of families simultaneously. The paper presents the per-family p-value (and per-branch
  p-values) with no correction step and leaves any such adjustment unstated — i.e. to the user.
- No stated default for the Monte Carlo sample size or a p-value significance threshold in the
  readable text.
- No separate birth vs. death rate model (base model ties them).
- No treatment of unrooted or multifurcating trees, or of branch lengths not in time units.

## 11. Open questions / ambiguities
- How many Monte Carlo samples are used, and what precision that gives for very small p-values.
- What significance threshold, if any, the authors intend for the per-family or per-branch
  p-values.
- How the three branch-attribution methods should be reconciled when they disagree.
- Whether any of the per-branch p-values are themselves corrected for testing every branch.

## 12. Guidance answers
- **What CAFE (v1) computes on top of the birth-death model**: (1) estimates the global
  birth-death rate λ (ML or user-fixed); (2) infers most-likely ancestral family sizes at internal
  nodes (Viterbi assignment); (3) assigns each family a **p-value** for accelerated/unusual
  gain-loss, computed under the fitted single-global-λ birth-death model via **Monte Carlo
  sampling** (the null is that fitted model); (4) identifies responsible branches for significant
  families via three methods — **Viterbi** (per-branch parent→child transition p-value), **branch
  cutting** (does the overall p-value rise when the parent-child coupling on a branch is removed),
  and a per-branch **likelihood ratio test** (fit a separate λ on the branch and compare
  likelihoods). Null for the per-family and per-branch tests alike is the fitted global-λ model.
- **Multiple testing across families**: **Not addressed.** The readable text has no mention of
  FDR / multiple-comparison correction; CAFE reports raw per-family (and per-branch) p-values with
  no correction step. This is a confident silence — the paper neither performs nor prescribes any
  across-family correction, effectively leaving it to the user. Supports the "no CAFE primary for
  multiple-testing" hypothesis in the guidance: this paper does not provide that primary.
- **Input requirements / tree assumptions**: Newick, **rooted and bifurcating** tree with
  **branch lengths in units of time**; a family-size matrix for extant taxa (one to thousands of
  families); λ user-specified or ML-estimated. Assumes birth and death equally probable; runtime
  scales linearly with number of species.
- **Functional strings (verbatim, per guidance must-quote)**: per-family significance output =
  **"p-value"**; branch-attribution methods = **"Viterbi"**, **"branch cutting"**, **"likelihood
  ratio test"**; rate parameter = **λ**.
