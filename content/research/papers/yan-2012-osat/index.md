---
title: "OSAT: a tool for sample-to-batch allocations in genomics experiments"
type: paper
source_id: yan-2012-osat
source_url: https://bmcgenomics.biomedcentral.com/articles/10.1186/1471-2164-13-689
doi: 10.1186/1471-2164-13-689
access_date: "2026-07-13"
license: CC-BY-2.0
license_file: LICENSES/CC-BY-2.0.LICENSE
attribution: "Yan L, Ma C, Wang D, Hu Q, Qin M, Conroy JM, Sucheston LE, Ambrosone CB, Johnson CS, Wang J, Liu S. OSAT: a tool for sample-to-batch allocations in genomics experiments. BMC Genomics 13:689, 2012. https://doi.org/10.1186/1471-2164-13-689 — open access under CC BY 2.0. Read from the BMC HTML + PDF mirror (PMC was blocked); figures and Additional file 1 not read."
derived: license-aware-summary
---

# OSAT: a tool for sample-to-batch allocations in genomics experiments

## 1. Citation

Yan L, Ma C, Wang D, Hu Q, Qin M, Conroy JM, Sucheston LE, Ambrosone CB, Johnson CS, Wang J, Liu S.
"OSAT: a tool for sample-to-batch allocations in genomics experiments."
*BMC Genomics* 2012;13:689. Published 10 December 2012 (received 10 July 2012; accepted 4 December 2012).
DOI: [10.1186/1471-2164-13-689](https://doi.org/10.1186/1471-2164-13-689).
Open access: <https://bmcgenomics.biomedcentral.com/articles/10.1186/1471-2164-13-689> (also PMC3548766).

**Software as stated in "Availability and requirements":**
- Project name: OSAT
- Project home page: `http://bioconductor.org/packages/2.11/bioc/html/OSAT.html`
- Operating system(s): Windows, Unix-like (Linux, Mac OSX)
- Programming language: `R >= 2.15`
- License: `Artistic-2.0`
- Any restrictions to use by non-academics: None

**Accessed:** 2026-07-13.

## 2. Access note

Read in full: the BMC HTML full text (Background, Results, Conclusions, Methods, Implementation,
Availability, References) and the publisher PDF (23 pp), plus the standalone **Table 1** page. No
paywall. **Not read:** the three figures (Figures 1–3 are images only — their captions were read, not
their plotted values) and **Additional file 1** (Tables S1–S2, Figure S1; PDF supplement) — its caption
was read but its contents were not. Any claim below about the figures rests on caption + body text only.

**License posture:** the article's Rights and permissions states it is Open Access under the Creative
Commons Attribution License (CC-BY 2.0), permitting unrestricted use, distribution, and reproduction in
any medium provided the original work is properly cited. **Mode used for §7: license-aware — short
verbatim quotes, marked, with location.**

## 3. Thesis (1 sentence)

OSAT is a Bioconductor package that, given an already-collected (often unbalanced and incomplete) sample
set, allocates samples to batches via a block-randomization step followed by an optimization step that
minimizes a least-squares objective on the discrepancy between expected and actual per-batch, per-stratum
sample counts — thereby reducing the correlation between batches and the biological variables of interest.

## 4. Problem & context

- Batch effects are defined by the paper as "the systematic, non-biological differences between batches in
  genomics experiment" (Background). They are described as wide-spread, sometimes larger than the
  biological differences of interest (refs 1–5).
- The paper's design premise: "To minimize the impact of batch effects, a careful experiment design should
  ensure the even distribution of biological groups and confounding factors across batches." The ideal is a
  **Randomized Complete Block Design (RCBD)** in which groups of main interest *and* important confounding
  variables are balanced and replicated across batches (refs 6–8).
- The practical failure: collected samples often do **not** comply with an ideal RCBD, because genomics
  studies "are mostly observational or quasi-experimental since we usually do not have full control over
  sample availability." Samples may be rare, difficult/expensive to collect, irreplaceable, or fail QC
  before profiling. The result is unbalanced and incomplete sample availability.
- **Explicit scoping statement:** OSAT "is not aimed to be a software for experimental design carried out
  before sample collection" — it addresses the moment when the available samples ready to be profiled *are
  already collected*, and asks how to allocate them to batches at the genomic profiling stage.

## 5. Method / approach

### 5.1 Notation (the paper's own symbols)

- Combine the variables of interest into a **unified variable** whose levels are all possible combinations
  of the levels of the involved variables. These levels are called the **optimization strata**.
- `s` = total number of levels (strata) in the unified variable; `S_j` = number of samples in stratum `j`,
  `j = 1 … s`.
- `m` = number of batches; `B_i` = number of **wells available** in batch `i`, `i = 1 … m`.
- Ideal balanced RCBD: `S_1 = … = S_s = S` and `B_1 = … = B_m = B`, with equal numbers of samples from each
  stratum.
- `E_ij` = expected number of samples from stratum `j` in batch `i`.
- `n_ij` = actual number of samples in each optimization stratum under an actual assignment (the assignment
  is presented as the `m × s` matrix of `n_ij`, rows `B_1 … B_m`, columns `S_1 … S_s`).

### 5.2 Expected counts and their integer/fractional split

As typeset in the paper (both HTML MathML and PDF):

```
E_ij = ( B_i j ) / ( Σ_i B_i )  =  ⌊E_ij⌋ + δ_ij
```

where `⌊E_ij⌋` is the integer part of the expected number and `δ_ij` is the **fractal part** (the paper's
word — it uses "fractal part" throughout for what is the fractional part).

The paper then states: in the case of equal batch size it reduces to

```
E_ij = S_j / m
```

and "When we have RCBD, all δ_ij are zero."

> **Note on the printed numerator.** Both the publisher HTML (MathML) and the PDF render the numerator as
> `B_i j` — i.e. `B` subscript `i`, then a bare `j`. For the stated equal-batch-size reduction to
> `E_ij = S_j / m` to hold, the numerator must be `B_i · S_j` (with all `B_i = B`: `B·S_j / (m·B) = S_j/m`).
> The `S` appears to be dropped in the published typesetting. **The numerator is `B_i·S_j` is
> `[summarizer-inferred]`** from the paper's own reduction; the paper as printed shows `B_i j`.

### 5.3 The objective function (verbatim form)

The paper defines the optimal design as the assignment setup that minimizes an objective function "based on
principle of least square method" (ref 13):

```
V = Σ_ij ( n_ij − E_ij )²
```

Summation is over `ij` (all batch × stratum cells). `E_ij` and `n_ij` are as defined above. Note the
objective uses `E_ij` (the real-valued expectation), **not** `⌊E_ij⌋`.

Users can define their own objective function following the package vignette.

### 5.4 Step 1 — block randomization (common to both algorithms)

Creates the initial setup(s) of randomized sample assignment, based on strata combining the **blocking
variables considered**. Blocking variables = *all* variables of interest in the default algorithm; only a
*specified subset* in the alternative algorithm. Procedure as stated:

1. Sample `i` sets of samples from each stratum `S_j` with size `⌊E_ij⌋`, and `j` sets of wells from each
   `B_j` batch with size `⌊E_ij⌋`. The two selections are **linked together by the `ij` subgroup**, and
   randomized in each of them.
2. The remainder samples `r_j = S_j − Σ_i ⌊E_ij⌋` are assigned to the remaining available wells in each
   block, `w_i = B_i − Σ_j ⌊E_ij⌋`.
3. **The probability that a leftover sample in `r_j` (from stratum `S_j`) is assigned to a well from block
   `B_i` is proportional to the fractal part `δ_ij` of the expected sample size.**
4. For an RCBD, each batch ends up with an equal number of samples of the same characteristic and **there is
   no need for further optimization**. For unbalanced and/or incomplete collections, the optimization step
   is needed.

### 5.5 Step 2 — optimization, default algorithm (`optimal.shuffle`)

- Block **all** variables considered → a **single** initial assignment setup.
- Then: randomly select `k` samples from different batches and **shuffle them between batches** to create a
  new sample assignment. Compute `V` for the new setup and compare to the current one. **If the new value
  is smaller, the new assignment replaces the previous one.**
- **This continues until a pre-set number of attempts is reached — 5000 by default.**
- (Greedy hill-climb: only improving moves are accepted. The paper does not describe accepting worse moves,
  restarts, or any temperature/annealing schedule.)
- The paper does not state a default value for `k`.

### 5.6 Step 2 — optimization, alternative algorithm (`optimal.block` / printed as `optimal.blcok`)

- Block **only the specified** variable(s) (e.g. the variables of primary interest) → generate a **pool** of
  assignment setups, "typically thousands of or more".
- Select from that pool the single setup minimizing `V` computed on **all variables considered**, including
  the variables *not* used in the block-randomization step.
- Stated property: it "will guarantee the identification of a setup that is conformed to the blocking
  requirement for the list of specified blocking variables, while attempting to minimize the between-batches
  variations of the other variables considered."
- The paper does not state the exact default size of that pool ("typically thousands of or more").

> **Function-name discrepancy — recorded, not normalized.** The Methods and Implementation body text spells
> the alternative algorithm's function **`optimal.blcok`** (twice: "implemented in function optimal.blcok",
> "implemented in function optimal.blcok"). **Table 1's column header and the Additional file 1 caption both
> spell it `optimal.block`.** The `blcok` spelling is a transposition typo in the published body text.
> Which spelling the shipped R package actually exports is **not resolvable from the paper**.

### 5.7 Handling multiple variables at once

The paper's mechanism for "several variables at once" is the **unified variable / optimization strata**
construction (§5.1): all variables considered are crossed into one composite factor, and `V` is summed over
batch × composite-stratum cells. **There is no per-variable weighting scheme in the objective function** —
every stratum cell contributes `(n_ij − E_ij)²` with equal weight. Prioritization between variables is
expressed *only* through **which variables are put in the block-randomization step**:

- default (`optimal.shuffle`): block *all* variables → all get relatively uniform distribution;
- alternative (`optimal.block`): block only the primary variable → that variable is near-perfectly uniform,
  the others are optimized but less uniform.

The paper names this a **tradeoff** (see §6). Users may define their own objective function per the vignette
— which is the only route the paper offers to a weighting scheme.

### 5.8 The R API as the paper presents it (exact names, verbatim)

Three steps, in the paper's order:

1. **Data format** — encapsulate the sample variables:
   ```
   sample <− setup.sample(x, optimal, …)
   ```
   `x` is a data frame, one sample per row, category variables (primary interest + others) as columns. The
   parameter `optimal` "indicates the vector of variables to be considered."

2. **Batch layout** — capture number of plates, plate layout, and the level at which batch effect is
   considered:
   ```
   Container <− setup.container(plate, n, batch, …)
   ```
   - `plate` is an object representing the layout — "number and type of chip used, rows and columns of
     wells, the ordering of them, and etc." — of the plate used in the experiment.
   - Layouts of some commonly used plates/chips are **predefined** in the package, e.g. the
     **IlluminaBeadChip Plate**. Users can define their own layout using the package's classes and methods.
   - `batch` is optional with **default value `"plates"`** → batch effect considered at the plate level. The
     user can set `batch="chips"` to consider batch effect at the **chip** level.

3. **Block randomization and optimization**:
   ```
   create.optimized.setup(fun="optimal.shuffle", sample, container, …)
   ```
   The default algorithm is `optimal.shuffle`; the alternative is `optimal.blcok` [sic — see §5.6].

4. **Output** — bar plots of sample counts by batch for all variables considered (visual inspection);
   **chi-square tests to examine the dependence of sample variables on batches**; the final sample-to-batch
   assignment can be **output to CSV**.

> **There is no bare `osat()` function anywhere in the paper.** The functions the paper names are exactly:
> `setup.sample`, `setup.container`, `create.optimized.setup`, `optimal.shuffle`, `optimal.blcok`
> (= `optimal.block`). The entry point that *performs* the assignment is `create.optimized.setup(...)`, whose
> `fun=` argument selects `optimal.shuffle` (default) or the alternative. Strictly, `optimal.shuffle` is the
> **default value of the `fun` argument**, not itself the top-level call, in the paper's presentation.

### 5.9 Defaults collected

| Thing | Value as stated |
|---|---|
| Optimization attempts (`optimal.shuffle`) | **5000 by default** |
| Setups generated (`optimal.block`) | "typically thousands of or more" (no exact default given) |
| `batch` argument of `setup.container` | default `"plates"`; alternative `"chips"` |
| `fun` argument of `create.optimized.setup` | `"optimal.shuffle"` |
| Number of samples shuffled per attempt (`k`) | named `k`; **no default stated** |
| Tie-breaking (equal `V`) | **not stated** — the rule given is strictly "if the new value is smaller, replace", so an equal-`V` move is *not* accepted [summarizer-inferred that this implies ties keep the incumbent] |

## 6. Key claims / findings

- **Example dataset:** 576 samples, one per row. Primary variable `SampleType` (case vs. control); two
  confounding variables `Race` and `AgeGrp`, described as "clinically important variables that may have
  impact on final outcome." **"none of the three variables are characterized by balanced distribution"**
  (Results/Datasets). Per-variable distributions are in Additional file 1 (Tables S1–S2), which I did not read.
- **Default algorithm result:** the final setup shows relatively uniform distribution of all three variables
  across batches; Pearson's χ² tests indicate all three variables are "highly uncorrelated with batches
  (p-value > 0.99, Table 1)".
- **Alternative algorithm result:** almost perfectly uniform `SampleType` (with "small variation only due to
  the inherent limitation of the starting data such as unbalanced sample collection"), while the uniformity
  of the two variables *not* in the block-randomization step **decreases**. χ² for `SampleType` decreases
  while those for `Race` and `AgeGrp` increase — "indicating the tradeoff in prioritizing variable of primary
  interest for block randomization."
- **Both algorithms** produce final setups with more homogeneous cross-batch strata distribution than their
  corresponding *starting* setups (Figures 1d, 2d).
- **Complete randomization comparison:** an undesired setup can be produced by complete randomization; the
  Pearson's χ² tests indicate **all three variables are statistically dependent on batches with p-values <
  0.05**.

**Table 1 (verbatim values).** "Comparison of sample assignment by two algorithms implemented in OSAT and an
undesired sample assignment through complete randomization":

| Variable | DF | Default (`optimal.shuffle`) χ² | P value | Alternative (`optimal.block`) χ² | P value | Undesired setup via complete randomization χ² | P value |
|---|---|---|---|---|---|---|---|
| SampleType | 5 | 0.2034518 | 0.9990763 | 0.03507789 | 0.9999879 | 13.25243 | 0.021124664 |
| Race | 5 | 0.2380335 | 0.9986490 | 3.68541503 | 0.5955359 | 14.22455 | 0.014244218 |
| Age_grp | 20 | 0.8138166 | 1.0000000 | 5.08147313 | 0.9996856 | 39.75020 | 0.005371387 |

(Table 1 spells the third variable `Age_grp`; the Results body text spells it `AgeGrp`. Note the table header
uses `optimal.block` — the correct spelling — against the body's `optimal.blcok`.)

- Observed in Table 1: the alternative algorithm gives the **lowest χ² for the primary variable**
  (0.035 vs. 0.203) but **higher χ² for both confounders** (Race 3.685 vs. 0.238; Age_grp 5.081 vs. 0.814)
  than the default. This is exactly the tradeoff the text names.
- **Randomization is not enough in general:** "When sample size is large enough, randomized design will be
  close to a balanced design. However, simple randomization could lead to undesirable imbalanced design where
  efficiency and confounding might be an issue after the data collection." The risk is stated as elevated
  "especially for unbalanced and/or incomplete sample sets."
- **Novelty claim:** "To our best knowledge, there is no other tool for this important utility within the
  framework of Bioconductor."
- **Positioning vs. existing design software:** the paper points to the CRAN ExperimentalDesign task view
  (`http://cran.r-project.org/web/views/ExperimentalDesign.html`) and notes many existing packages work for
  the *ideal* situation, i.e. **before sample collection**, where sample size is fixed and/or the model is
  specified — naming `AlgDesign` (optimal design, requiring model specification), `oa.design` (orthogonal
  arrays for main-effects experiments, constrained by sample size / number of factors), and `FrF2` (factorial
  2-level designs).

## 7. Load-bearing statements — VERBATIM (license-aware mode; CC-BY-2.0 permits reproduction)

1. **The goal / prescription of balance at design time** (Background, ¶2):
   > "To minimize the impact of batch effects, a careful experiment design should ensure the even
   > distribution of biological groups and confounding factors across batches. It would be problematic if one
   > batch run contains most samples of a particular biological group. In an ideal genomics design, the groups
   > of the main interest, as well as important confounding variables should be balanced and replicated across
   > the batches to form a Randomized Complete Block Design (RCBD)."

2. **The objective OSAT optimizes** (Conclusions, ¶1; also Background ¶4 nearly verbatim):
   > "With a block randomization step followed by an optimization step, it produces setup that optimizes the
   > even distribution of samples in groups of biological interest into different batches, reducing the
   > confounding or correlation between batches and the biological variables of interest. It can also optimize
   > the homogeneous distribution of confounding factors across batches."

3. **The optimization criterion** (Methods/Methodology):
   > "In this package, we define the optimal design as a sample assignment setup that minimizes our objective
   > function based on principle of least square method [13]."

4. **The shuffle procedure and its default budget** (Methods/Methodology):
   > "Specifically, after initial setup is created, we randomly select k samples from different batches and
   > shuffle them between batches to create a new sample assignment. Value of the objective function is
   > calculated for the new setup and compared to that of the original one. If the new value is smaller, the
   > new assignment will replace the previous one. This procedure will continue until we reach a pre-set
   > number of attempts (5000 by default)."

5. **The explicit limitation — design does not eliminate batch effects** (Conclusions, ¶3):
   > "It should be emphasized that although the impact of batch effect on genomics study might be minimized
   > through proper design and sample allocation, it may not be completely eliminated. Even with perfect design
   > and best effort in all stages of experiment including sample-to-batch assignment, it is impossible to
   > define or control all potential batch effects."

6. **Scope boundary — not a pre-collection design tool** (Background, ¶4):
   > "OSAT is not aimed to be a software for experimental design carried out before sample collection, rather,
   > it is developed to fulfill the needs arise from some practical limitations occurring in the genomics
   > experiments."

*Functional strings reproduced verbatim throughout (license-independent):* `setup.sample`, `setup.container`,
`create.optimized.setup`, `optimal.shuffle`, `optimal.blcok`, `optimal.block`, `fun="optimal.shuffle"`,
`batch="plates"`, `batch="chips"`, `optimal`, `plate`, `n`, `V = Σ_ij (n_ij − E_ij)²`, `5000`, `R >= 2.15`,
`Artistic-2.0`, and the Table 1 numerics.

## 8. Stated scope, assumptions, limitations (the source's own caveats)

- **Post-collection only.** OSAT is explicitly *not* a pre-collection experimental-design tool (quote 6,
  §7). It operates "in the profiling stage of a genomics study when the available experimental samples ready
  to be profiled in the genomics instruments are collected."
- **Batch effects cannot be fully eliminated by design** (quote 5, §7). The paper explicitly recommends that
  analytic batch-effect methods be used *as well*: "It would be helpful that analytic methods handling batch
  effects are employed in all stages of a genomics study, from experiment design to data analysis" (refs 1,
  9–12 are the analysis-stage methods it points to).
- **Residual imbalance is bounded by the starting data.** In the alternative-algorithm result the paper
  attributes the remaining variation to "the inherent limitation of the starting data such as unbalanced
  sample collection" — i.e. OSAT cannot manufacture balance the collection does not permit.
- **Tradeoff is inherent to variable prioritization** — blocking on the primary variable degrades uniformity
  of the non-blocked variables (Results; Table 1).
- **RCBD needs no optimization.** For a true RCBD, "each batch will have equal number of samples with same
  characteristic and there is no need for further optimization."
- **Environment:** `R >= 2.15`; Windows / Unix-like; `Artistic-2.0`; no restrictions for non-academics.

## 9. Failure modes / invalidity patterns

Stated by the source:

- **Complete randomization on unbalanced/incomplete sample sets.** This is the paper's headline failure
  mode. "In fact, there is substantial chance that variables will be statistically dependent on batches if a
  complete randomization is carried out, especially for incomplete and/or unbalanced sample collections."
  **Named detector:** Pearson's χ² test of variable-vs-batch association. **Named symptom / value range:**
  the undesired setup's p-values were **< 0.05** for all three variables (13.25/p=0.021, 14.22/p=0.014,
  39.75/p=0.005), versus **p > 0.99** for the default algorithm's setup. The package ships χ² tests and bar
  plots by batch precisely "to examine the dependence of sample variables on batches" — that is the
  paper's built-in diagnostic.
- **Confounding introduced at allocation time:** "It would be problematic if one batch run contains most
  samples of a particular biological group."
- **Believing design alone suffices** — quote 5, §7: the impact "may not be completely eliminated"; unknown
  batch-effect sources cannot be defined or controlled.
- **Prioritized blocking degrades the non-blocked variables** — a designed-in failure mode of `optimal.block`,
  visible as increased χ² for the non-blocked variables (Table 1).
- **Greedy acceptance:** the stated rule accepts a shuffle only if `V` strictly decreases, over a fixed budget
  of 5000 attempts. The paper does **not** claim a global optimum, and does not discuss local minima.
  [summarizer-inferred that this is a limitation — the paper does not name it as one.]

**Not stated (see §10):** the paper gives no error message, no threshold on `V`, and no acceptance criterion
for "is this design good enough" beyond the χ² inspection it demonstrates.

## 10. What the source does NOT address (confident silences)

- **Batches too small to hold at least one sample of each condition.** The paper **never addresses** what
  happens when a batch cannot hold one of each level/stratum, nor does it state any minimum batch size
  relative to `s` (the number of optimization strata). The block-randomization step simply uses `⌊E_ij⌋`,
  which is **0** when `E_ij < 1` — so such strata fall entirely into the leftover pool `r_j` allocated with
  probability proportional to `δ_ij` — but **the paper does not discuss this case, warn about it, or bound
  it.** There is no quotable statement; this is a silence.
- **Unbalanceable factors.** No statement about a factor that *cannot* be balanced given the collection, other
  than the general remark attributing residual variation to "the inherent limitation of the starting data."
- **Already-confounded / already-run designs.** The paper makes **no claim** about repairing a design that is
  already confounded. Its only gesture toward post-hoc work is the acknowledgement that many statistical
  methods exist to "estimate and reduce the impact of batch effect at the data analysis stage (i.e., after
  the experiment part is done) [1, 9–12]" and the recommendation that such methods be used across all stages.
  It **does not** endorse, evaluate, or describe any correction method. **Confident silence on post-hoc
  correction as a substitute for design.**
- **Sequencing / RNA-seq.** The paper's own technology framing is **microarray**: "A sizable genomics study
  such as microarray often involves the use of multiple batches." The only concrete platform it names is the
  **Illumina BeadChip Plate** (a predefined layout), plus generic "plates" and "chips". Reference 5's *title*
  mentions high-throughput sequencing, but the **paper itself never discusses sequencing, RNA-seq, library
  prep, or flow cells.** Methylation and GWAS appear only in reference titles. **The method is
  platform-agnostic in principle** (users can define their own layout) **but the paper demonstrates and names
  only array/chip-plate platforms.**
- **Run order / position within batch.** The container captures plate layout including "rows and columns of
  wells, the ordering of them" and samples are assigned to *wells*, and batch can be set at **plate** or
  **chip** level — so a chip is a finer batch unit than a plate. But the **objective function is defined only
  over batch × stratum counts (`n_ij` vs `E_ij`)**; there is **no term for run order, processing date,
  position/row/column within a plate, or edge effects**. The paper does not optimize or discuss
  within-batch position. (Additional file 1's Figure S1 caption mentions "Paired specimens are placed on the
  same chip" using `optimal.block` — a co-location constraint — but the body text does not explain how that
  constraint is expressed, and I did not read the supplement.)
- **Sample size guidance / power.** No power calculation, no minimum-`n` recommendation, no guidance on how
  many batches to use.
- **The value of `k`** (samples shuffled per attempt) and the exact pool size for the alternative algorithm.
- **Tie-breaking** when two setups give equal `V`.
- **Runtime / convergence behavior**, and whether 5000 attempts suffices for a given problem size.
- **Comparison to any non-Bioconductor / non-R batch-allocation tool**, or to a manual/expert assignment. The
  only comparison arm is **complete randomization** plus the two OSAT algorithms against each other.
- **A package version number.** The paper names the Bioconductor **release** URL (`packages/2.11/…`) — i.e.
  Bioconductor 2.11 — but **no OSAT package version string is given anywhere in the paper.**

## 11. Open questions / ambiguities the source leaves unresolved

- **Is the exported function `optimal.block` or `optimal.blcok`?** The paper uses both (body: `optimal.blcok`;
  Table 1 header + supplement caption: `optimal.block`). Unresolvable from the paper — requires the package.
- **The `E_ij` numerator as printed (`B_i j`)** is inconsistent with the stated equal-batch reduction
  (`S_j/m`); the intended `B_i·S_j` is an inference (§5.2), not a printed statement.
- **How is `k` chosen**, and does it adapt? Not stated.
- **What counts as "good enough"?** The paper demonstrates χ² p-values > 0.99 but sets **no acceptance
  threshold** on χ², p, or `V`.
- **How are constraints like "paired specimens on the same chip" (Figure S1) expressed** in the API? Not in the
  main text.
- **Does the objective handle strata with `E_ij < 1`** in a principled way? Silence (see §10).

## 12. Guidance answers

**Q: The objective function OSAT optimizes — write it out, define every symbol.**
`V = Σ_ij (n_ij − E_ij)²` — **minimized**. `i` indexes batches (`1…m`), `j` indexes **optimization strata**
(`1…s`, the levels of the unified variable formed by crossing all variables considered). `n_ij` = actual
number of samples from stratum `j` assigned to batch `i`. `E_ij` = expected number = `B_i·S_j / Σ_i B_i`
(printed as `B_i j / Σ_i B_i`; see §5.2), where `B_i` = wells available in batch `i` and `S_j` = samples in
stratum `j`. Under equal batch size, `E_ij = S_j/m`. `E_ij = ⌊E_ij⌋ + δ_ij`; under RCBD all `δ_ij = 0`. So yes
— it is a **sum of squared expected-vs-observed count discrepancies across batch × stratum cells**, a
least-squares criterion (paper's own words: "based on principle of least square method").

**Q: The algorithm — how does OSAT search the assignment space?**
**Block randomization then optimization** (both algorithms have both steps). Default (`optimal.shuffle`):
block *all* variables → **one** initial setup → then iteratively pick `k` random samples from different
batches, swap them between batches, recompute `V`, **keep the new setup only if `V` is smaller**, repeat for a
pre-set number of attempts, **5000 by default**. This is a greedy hill-climb over swaps. Alternative
(`optimal.block`): block only the specified variable(s) → generate a **pool** of setups ("typically thousands
of or more") by re-running block randomization → **pick the pool member with the smallest `V` evaluated on all
variables**. This is best-of-N selection, not iterative improvement. Full re-implementable detail is in §5.4–5.6.

**Q: How are multiple variables handled at once? Any variable weighting?**
Via the **unified variable / optimization strata** (crossing all variables into one composite factor); `V` is
summed over the resulting batch × stratum cells with **equal weight per cell — the paper defines no
variable-weighting scheme**. The only prioritization lever is *which* variables enter the block-randomization
step, and the paper explicitly calls the consequence a tradeoff: blocking only `SampleType` drove its χ² down
(0.035) while `Race` and `Age_grp` χ² rose (3.685, 5.081) relative to blocking all three (0.203/0.238/0.814).
The paper does note "it provides the flexibility for users to … [define the] optimization objective function
for their specific needs" via the vignette — the only route to weighting. See §5.7.

**Q: The R API as the paper presents it — exact function and argument names.**
`sample <− setup.sample(x, optimal, …)`; `Container <− setup.container(plate, n, batch, …)` with `batch`
defaulting to `"plates"` and `batch="chips"` available; `create.optimized.setup(fun="optimal.shuffle", sample,
container, …)`. **On the downstream claim to confirm: the paper contains NO bare `osat()` function** — it
does not appear anywhere in the text. The functions named are exactly `setup.sample`, `setup.container`,
`create.optimized.setup`, `optimal.shuffle`, and `optimal.blcok`/`optimal.block`. **Caveat on "the entry point
is `optimal.shuffle`":** as the paper presents it, `optimal.shuffle` is the **default value of the `fun=`
argument** to `create.optimized.setup(...)` — the call the user makes is `create.optimized.setup`, which
*dispatches to* `optimal.shuffle`. Whether `optimal.shuffle` is *also* directly callable is not stated. See §5.8.

**Q: Defaults — iteration counts, sample/batch-size assumptions, tie-breaking.**
5000 attempts (shuffle); pool "typically thousands of or more" (no number); `batch="plates"` default;
`fun="optimal.shuffle"` default; `k` undefined; **tie-breaking not stated** (the strict-improvement rule
implies ties keep the incumbent — `[summarizer-inferred]`). Sample/batch-size assumption: only the RCBD ideal
(`S_1=…=S_s=S`, `B_1=…=B_m=B`) is defined as the balanced reference; **no minimum batch size is stated**. See §5.9.

**Q: Batches that cannot hold at least one of each condition; a factor that cannot be balanced.**
**The paper does not address either.** No statement to quote. This is a **confident silence** (§10). The
closest it comes is attributing residual non-uniformity to "the inherent limitation of the starting data such
as unbalanced sample collection."

**Q: Claims about already-confounded designs or post-hoc correction?**
**No claim.** The paper is explicitly a design/allocation tool and says batch effects "may not be completely
eliminated" even with perfect design, then points to analysis-stage methods (refs 1, 9–12) with the
recommendation: "It would be helpful that analytic methods handling batch effects are employed in all stages
of a genomics study, from experiment design to data analysis." It **does not** describe, endorse, or evaluate
any post-hoc correction, and **does not** claim OSAT can rescue an already-confounded design. Confident
silence on repair.

**Q: What does it validate against? Exact comparison and numbers.**
**One exemplary dataset** (576 samples; `SampleType` case/control, `Race`, `AgeGrp`; none balanced) — **not a
simulation study, not a real batch-effect measurement.** Three arms compared: default algorithm, alternative
algorithm, and **complete randomization** (the negative control). Metric: **Pearson's χ² test of
variable-vs-batch dependence**. Numbers are the Table 1 grid in §6: default p > 0.99 for all three variables;
alternative p = 0.99999 for `SampleType` but 0.596 for `Race`; complete randomization p < 0.05 for all three
(0.021, 0.014, 0.005). **No comparison to manual/expert assignment, and no downstream measurement of actual
batch effects on real profiling data.**

**Q: Silence — sequencing/RNA-seq vs. array/genotyping platforms?**
The paper names **microarray** as its motivating study type and the **Illumina BeadChip Plate** as its
predefined layout example, and speaks generically of plates, chips, and wells. It **never discusses
sequencing, RNA-seq, or library prep** (sequencing appears only in a reference title). Genotyping/GWAS appear
only in reference titles. Layouts are user-definable, so the method is not formally platform-bound, but the
paper's demonstrated scope is array/chip plates.

**Q: Silence — run order / position within batch?**
**Batch membership only.** Samples are placed in *wells*, and the container knows plate rows/columns/ordering,
and `batch` can be `"plates"` or `"chips"` — but **the objective function contains no term for position, run
order, or processing time**; `V` depends only on batch × stratum counts. The paper does not optimize or
discuss within-plate position or edge effects. (Additional file 1 Figure S1 does mention keeping paired
specimens on the same chip — a co-location constraint — but the main text never explains it.)

**Q: Pin — Bioconductor OSAT package version named in the paper?**
**No package version is given.** The paper names only the project home page
`http://bioconductor.org/packages/2.11/bioc/html/OSAT.html` → **Bioconductor release 2.11**, with
`R >= 2.15` and license `Artistic-2.0`. Accessed 2026-07-13.
