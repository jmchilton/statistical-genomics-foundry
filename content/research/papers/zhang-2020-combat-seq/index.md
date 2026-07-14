---
title: "ComBat-seq: batch effect adjustment for RNA-seq count data"
type: paper
source_id: zhang-2020-combat-seq
source_url: https://academic.oup.com/nargab/article/2/3/lqaa078/5909519
oa_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC7518324/
doi: 10.1093/nargab/lqaa078
pmid: 33015620
pmcid: PMC7518324
access_date: "2026-07-13"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Zhang Y, Parmigiani G, Johnson WE. ComBat-seq: batch effect adjustment for RNA-seq count data. NAR Genomics and Bioinformatics 2(3):lqaa078, 2020. https://doi.org/10.1093/nargab/lqaa078 — open access under CC BY 4.0. Read from PMC efetch JATS XML (full body, 17 refs); Supplementary Material S1–S5 not read."
derived: license-aware-summary
---

# ComBat-seq: batch effect adjustment for RNA-seq count data

## 1. Citation

Zhang Y, Parmigiani G, Johnson WE. "ComBat-seq: batch effect adjustment for RNA-seq count data."
*NAR Genomics and Bioinformatics* 2020;2(3):lqaa078. DOI [10.1093/nargab/lqaa078](https://doi.org/10.1093/nargab/lqaa078).
PMID 33015620. PMC **PMC7518324**.
Open access: https://academic.oup.com/nargab/article/2/3/lqaa078/5909519

License (from the article's `<permissions>` block): "© The Author(s) 2019. Published by Oxford
University Press on behalf of NAR Genomics and Bioinformatics." — Creative Commons Attribution
License (CC-BY 4.0), "which permits unrestricted reuse, distribution, and reproduction in any medium,
provided the original work is properly cited."

> **Correction to the invoking prompt:** the prompt gave **PMC7531839**. That is a *different
> article* (title: "Dialects of Madagascar"). The correct PMCID, resolved via PubMed→PMC elink from
> the DOI, is **PMC7518324**. A term-search run against the wrong PMCID returns zero hits for every
> guidance keyword and would have produced a false "confident silence." Flagging so the wrong ID does
> not propagate.

## 2. Access note

Full text read: abstract + complete body (INTRODUCTION, MATERIALS AND METHODS, RESULTS, DISCUSSION,
REPRODUCIBILITY) and the full 17-item reference list, from the PMC JATS XML. No paywall boundary.

**Not read:** the Supplementary Material (Supplementary Figures S1–S5, Supplementary Table S1,
Supplementary Data S1–S4). Several claims below are stated in the body but *evidenced* in the
supplement — notably the empirical-Bayes-shrinkage evaluation ("shown in Supplementary Material") and
the per-method win-rate summary (Supplementary Figure S3). Those are marked below as
**[supplement, not read]**.

## 3. Thesis

Existing batch-adjustment methods assume Gaussian data, which is wrong for skewed, over-dispersed
RNA-seq counts; ComBat-seq instead fits a gene-wise negative binomial regression and adjusts by
quantile-mapping to a "batch-free" NB distribution, so the adjusted data **stay integer counts** and
can be fed straight into DE software that requires them.

## 4. Problem & context

- Batch effects cause distributional discrepancies across batches and blunt the power gained by
  integrating data (ref 1, Leek et al.).
- Normalization (CPM/TPM/RPKM/FPKM, TMM, RLE) can fix overall per-sample distribution differences but
  **cannot** fix batch effects in *composition* — per-gene batch-level bias after scaling by coverage.
- Gaps the paper claims in existing methods:
  1. Gaussian-based methods (incl. original ComBat) do not preserve integers and **may produce
     negative values** in the adjusted count matrix, which is biologically uninterpretable.
  2. Gaussian models ignore the well-established mean–variance dependence of counts (ref 9).
  3. Simply including batch as a covariate in edgeR/DESeq2 ("the 'one-step' approach") may handle
     batch effects **in the mean**, but because both assume a *single dispersion parameter for all
     samples*, "variance batch effects is restricted, and completely determined by mean batch
     effects" — a strong assumption that may not hold.
  4. SVA-seq and the one-step approach **do not output adjusted data** at all.
- Positioning: ComBat-seq is for batch effects **from known sources** (like ComBat); SVA-seq/RUV-seq
  target unknown sources.

## 5. Method / approach

### 5.1 The model (gene-wise)

For gene *g*, sample *j*, batch *i*, count `y_gij ~ NB(μ_gij, ϕ_gi)`:

```
log μ_gij = α_g + X_j β_g + γ_gi + log N_j
var(y_gij) = μ_gij + ϕ_gi · μ_gij²
```

- `α_g` — log of expected counts for "negative" samples (baseline).
- `X_j β_g` — change in log expected counts due to **biological condition**; `X_j` may be an indicator
  of the biological condition **or a continuous clinical covariate**. This term is **preserved in the
  data after adjustment**.
- `γ_gi` — **mean** batch effect parameter (batch *i*, gene *g*).
- `ϕ_gi` — **dispersion** batch effect parameter — note it is indexed by batch, i.e. a
  **separate dispersion per batch**, which is the key flexibility vs. edgeR/DESeq2's single dispersion.
- `log N_j` — library size offset (total counts across all genes in sample *j*).

Estimation: parameters estimated following edgeR's established methods (refs 7, 10–11).
`γ_gi` by **Fisher scoring iteration**; `ϕ_gi` **gene-wise within each batch** by maximizing the
**Cox–Reid adjusted profile likelihood (APL)** (ref 11), which yields non-negative dispersion
estimates. Mean estimates are not constrained non-negative because they are on the log scale.

### 5.2 The adjustment (quantile mapping)

Given estimates `γ̂_gi`, `ϕ̂_gi`, and fitted `μ̂_gij`, compute "batch-free" NB parameters:

```
log μ*_gj = log μ̂_gij − γ̂_gi
ϕ*_g     = (1 / N_batch) · Σ_i ϕ̂_gi        # mean of per-batch dispersion estimates
```

Then map each observed value to the batch-free distribution by matching quantiles: find `y*_gj` such
that `F*(y*_gj) = P(y* ≤ y*_gj)` is **closest in absolute value** to `F(y_gij) = P(y ≤ y_gij)`, where
the empirical distribution is estimated as `NB(μ̂_gij, ϕ̂_gi)`. **Zero counts are mapped to zeros.**
Applied to every value in the matrix. Because the batch-free distribution is also NB, output stays
integer.

The paper explicitly contrasts this with ComBat's adjustment: ComBat standardizes (subtract mean
batch effect, scale by variance), which is equivalent to quantile-matching for Gaussian data, but
standardization does not work for NB — hence the explicit quantile mapping.

### 5.3 Empirical Bayes

ComBat's hierarchical EB shrinkage pools information across genes for robustness at small sample
sizes. ComBat-seq "provide[s] a similar option to share information across genes" **in the software**,
but the paper concludes EB is **not necessary** here (see §6). **[supplement, not read]** — the
evaluation lives in Supplementary Material / Supplementary Figure S1.

### 5.4 Simulation setup

- Simulator: **polyester** R package (ref 12); its human genome reference example supplies **918 genes**.
- Design: **2 biological conditions** ("negative (0)" / "positive (1)", e.g. control/tumor) × **2 batches**.
- The 918 genes are split into two groups to create a **composition** batch effect (not removable by
  normalization): group 1 higher in batch 2 / lower in batch 1; group 2 the reverse.
- Both up- and down-regulated true DE genes simulated in both gene groups; remaining genes affected
  by batch only, not by condition.
- Biological signal fixed at **2-fold**.
- **Mean** batch effect swept: batch-2 mean = **1.5×, 2×, or 3×** batch 1 (plus a no-mean-effect case).
- **Dispersion** batch effect swept: batch-2 dispersion = **2×, 3×, or 4×** batch 1 (plus a
  no-dispersion-difference case).
- **300 repeated simulations** per parameter setting; results averaged.
- Realism check (Supplementary Table S1 **[supplement, not read]**): observed real-data condition fold
  changes **1.65–3.98**; real mean batch effects **1.62–1.88×**; real variance differences
  **1.26–7.09×** — the swept parameters sit in this range.
- Design diagram: Supplementary Figure S2 **[supplement, not read]**.

**Comparators:** ComBat-seq; the "one-step" approach (batch as covariate in the DE linear model);
SVA-seq (**1 surrogate variable**); RUV-seq (**RUVg**, negative controls = **10 randomly sampled**
genes simulated not to respond to condition; **1 latent variable**); original ComBat applied to
**logCPM**-transformed data. Plus two reference arms: DE on data with **no simulated batch effect**,
and DE on batch-affected data with **no adjustment**.

**Metrics:** statistical power (**TPR**, true positive rate) and control of type-I errors
(**FPR**, false positive rate).

### 5.5 Real data (GFRN)

Growth factor receptor network (GFRN) pathway perturbation RNA-seq in primary breast tissue
(refs 13, 14). Three batches; in each, one GFRN oncogene induced by transfection; GFP-vector controls
present in **all** batches:

| Batch | Treated | Controls | GEO |
|---|---|---|---|
| 1 | 5 × HER2 | 12 × GFP | GSE83083 |
| 2 | 6 × EGFR | 6 × controls | GSE59765 |
| 3 | 9 × wild-type KRAS | 9 × GFP | GSE83083 |

For the real data, RUV-seq used **RUVs** (more robust to negative-control choice than RUVg, ref 3),
with negative controls = least-DE genes within each batch for the 3 pathways (**FDR > 0.95**),
intersected across pathways. Only RUV-seq, ComBat-on-logCPM, and ComBat-seq produce adjusted data, so
only those enter the PCA; the one-step approach and SVA-seq do not output adjusted data.

## 6. Key claims / findings

**Gaussian-on-counts failure (Figure 2).** Simulated **balanced** case-control design, 2 batches. For
a gene expressed at low levels in most samples, one large case count (>30) in batch 2 inflates the
batch-2 mean estimate. Gaussian adjustment equalizes the means, driving batch-2 **control** samples to
**negative values** and raising batch-1 counts — manufacturing an artificial significant difference
between the two batches' control samples, **P = 0.0033**. ComBat-seq (NB) produces no negative values
and no such false significant result.

**Baseline / effect of unadjusted batch.**
- No batch effect at all: **FPR 0.048, TPR 0.96**.
- Batch effects *reduce both* TPR and FPR vs. no-batch data:
  - mean batch effect 1.5×, no dispersion difference → **FPR 0.028, TPR 0.94**.
  - 2-fold dispersion batch effect, no mean batch effect → **FPR 0.046, TPR 0.88**.

**FPR control — ComBat-seq's one adverse regime.** ComBat-seq keeps FPR under 0.05 **when dispersion
differences exist**. But in the (per the authors "unrealistic") case of **no dispersion difference
across batches**, both ComBat-seq and ComBat-on-logCPM have **FPR in the 0.059–0.067 range**, while
all other methods hold FPR under 0.05. The paper's own reading: when the batch effect is mean-only,
including batch as a covariate may suffice, and ComBat-seq's separate-dispersion model "may be
redundant and lead to higher false positives."

**FPR — conservative under dispersion differences.** No mean batch effect, **3-fold** dispersion
difference:

| Method | FPR |
|---|---|
| **ComBat-seq** | **0.039** (most conservative) |
| batch as covariate | 0.043 |
| RUV-seq | 0.044 |
| original ComBat on logCPM | 0.046 |
| SVA-seq | 0.049 |

At **4-fold** dispersion difference ComBat-seq's FPR falls further to **0.031** (vs. 0.039 at 3-fold).

**TPR — power.** Realistic regime (**1.5× mean, 2× dispersion**):

| Method | TPR |
|---|---|
| **ComBat-seq** | **0.89** |
| batch as covariate | 0.87 |
| SVA-seq | 0.87 |
| original ComBat on logCPM | 0.85 |
| RUV-seq | 0.83 |

Extreme regime (**3× mean, 4× dispersion**): ComBat-seq **TPR 0.73**, "at least 6% higher" than the
others — covariate 0.67, ComBat-logCPM 0.66, SVA-seq 0.66, RUV-seq 0.61.

**Win rates.** As batch effect increases, ComBat-seq has a much better chance than other methods of
achieving high power while controlling FPR (Supplementary Figure S3) **[supplement, not read]**.

**Empirical Bayes not needed.** EB shrinkage "is not necessary for ComBat-seq because the approach is
already sufficiently robust due to the distributional assumption" — NB is a more flexible family that
better handles outliers and skew; estimates come directly from NB regression via Fisher scoring
**[evidence in supplement, not read]**.

**Real data (GFRN).** ComBat-seq's PCA recovers the expected structure (controls from all 3 batches
cluster; treated samples from the 3 conditions scatter separately); RUV-seq does **not** fully remove
the batch effect even at K = 2 latent factors. Variance explained by batch is greatly reduced after
ComBat-seq. **EGFR** (which must be overexpressed by construction) is **not** detected DE at FDR ≤ 0.05
in unadjusted data, nor after RUV-seq or SVA-seq (any number of factors); it **is** detected after the
one-step approach, ComBat, and ComBat-seq — percentile ranks: one-step 94.3% (FDR = 0.043),
ComBat 26.6% (FDR = 0.0003), ComBat-seq 42.3% (FDR = 0.0016). RAS-pathway enrichment in top-1000 genes
(222 RAS genes, Fisher's exact): one-step 25 (P = 0.002), ComBat-seq 24 (P = 0.004), SVA-seq 21
(P = 0.029), ComBat 20 (P = 0.043), RUVSeq 19 (P = 0.080), unadjusted 16 (P = 0.306).
The authors concede ComBat-seq does **not** clearly beat ComBat-on-logCPM *in this real example*, and
fall back on the simulation power argument. ComBat and ComBat-seq have large overlap in DE genes, "which
is expected because they use the same underlying linear model specification."

## 7. Load-bearing statements — **verbatim mode** (CC-BY-4.0 → verbatim-ok)

Short verbatim quotes, each with location. Attribution: Zhang, Parmigiani & Johnson 2020, NAR Genom.
Bioinform. 2(3):lqaa078, CC-BY-4.0.

1. **What the data must be / what it returns** (Abstract):
   > "We developed a batch correction method, ComBat-seq, using a negative binomial regression model
   > that retains the integer nature of count data in RNA-seq studies, making the batch adjusted data
   > compatible with common differential expression software packages that require integer counts."

2. **Adjusted counts may be fed directly to a standard DE pipeline** (Discussion) — the
   correct-then-test sentence:
   > "This method ensures that the adjusted data remain integer counts, and thus are compatible as
   > input for downstream differential expression software like edgeR and DESeq2."

3. **The confounded-design limitation** (Discussion, final limitation) — the *only* place the paper
   speaks to confounding:
   > "Our ComBat-seq method is based on a gene-wise negative binomial regression model, which, similar
   > to other (generalized) linear models, may not work well on data with severely or even completely
   > confounded study designs. However, batch correction in confounded designs is challenging for most
   > if not all the state-of-the-art batch adjustment methods, and careful experimental design has been
   > widely advised to mitigate the unfavorable impact of batch effects."

4. **When NOT to use it / adjust only when needed** (Discussion):
   > "In simulations, we observed that when there is no true difference in dispersion across batch,
   > applying ComBat-seq, which specifies different dispersion parameters for batches, results in
   > increased false positive rates compared to the other methods without further increasing the
   > detection power. […] Therefore, batch effects should only be adjusted when they are present and
   > result in unfavorable impact on downstream analysis. Such observations emphasize the importance
   > for careful diagnosis of batch effect before applying any transformation to the data".

5. **The real-data design is partially nested** (Materials and Methods, Real data application):
   > "Note that this is a challenging study design for batch effect adjustment: the control samples are
   > balanced across batches, while each of the 3 kinds of treated cells, with different levels of
   > biological signals, is completely nested within a single batch."

## 8. Stated scope, assumptions, limitations (the source's OWN caveats)

All from the Discussion's explicit "Our study has several limitations" paragraph plus the model section:

- **Known-source batch only.** ComBat-seq adjusts "batch effects from known sources"; unknown sources
  are SVA-seq/RUV-seq territory.
- **Idealistic simulation model.** Biological signal and batch effects characterized as fold changes in
  the average value across batch; the authors call this "a valid and convenient assumption" that is
  easy to implement with polyester, while acknowledging other count models exist.
- **Only DE was evaluated.** Impact on other tasks (e.g. building predictive models on genomic data)
  "requires further evaluation, but is beyond the scope of this paper."
- **Severely/completely confounded designs**: the GLM "may not work well" (quote 3, §7).
- **NB assumption**: data assumed negative binomial; per-batch dispersion `ϕ_gi` assumed estimable
  within each batch (i.e. batches must have enough samples to estimate a gene-wise dispersion).
- **Adjustment is a transformation and carries risk**: "modifying the data in any way comes with a risk
  of jeopardizing biological signals in the data."

## 9. Failure modes / invalidity patterns (referee-relevant)

Faithful to the source:

| Failure mode | Condition | Symptom / detector the paper names |
|---|---|---|
| **Over-correction FPR inflation** | Batch effect is **mean-only** — no true dispersion difference across batches | **FPR rises to 0.059–0.067** (above nominal 0.05) for ComBat-seq *and* ComBat-on-logCPM, with **no** gain in TPR. Paper's prescription: use the simpler one-step (batch-as-covariate) approach instead; ComBat-seq's separate-dispersion model is "redundant" here. |
| **Applying batch correction when no batch effect is present** | No real batch effect / batch effect has no unfavorable downstream impact | Paper: adjust **only** when batch effects "are present and result in unfavorable impact on downstream analysis"; requires "careful diagnosis of batch effect before applying any transformation." Cites BatchQC (ref 16) as the prior work on diagnosis. |
| **Gaussian model on counts** (the anti-pattern ComBat-seq exists to fix) | Low-count genes with outlying large values; using ComBat/logCPM | **Negative values** in the adjusted matrix; artificially induced significant differences between control samples across batches (worked example: **P = 0.0033**, Figure 2). |
| **Severely / completely confounded design** | Batch severely or completely confounded with the biological condition | Paper states the NB GLM "may not work well" — but names **no detector, no diagnostic, no numeric threshold, and reports no simulation** for this regime. It offers only the mitigation "careful experimental design." **This is the extent of the paper's treatment.** |
| **Unknown-source heterogeneity** | Batch variable not known/recorded | Out of scope — ComBat-seq requires a known batch variable. |

## 10. What the source does NOT address — confident silences

These are verified by exhaustive case-insensitive term counts over the **full JATS XML** (body +
abstract + all 17 references):

| Term | Occurrences |
|---|---|
| `unbalanc*` | **0** |
| `imbalanc*` | **0** |
| `"not balanced"` | **0** |
| `balanc*` | 3 (all describing a *balanced* design — 2 in the Figure 2 balanced case-control simulation, 1 describing the GFRN controls being balanced across batches) |
| `confound*` | **2** (both inside the single Discussion limitation sentence, quote 3) |
| `"type I"` | **0**; `type-I` | 1 (Methods: "control of type-I errors (false positive rate, FPR)" — a metric definition) |
| `false positive` | 15 (all about FPR in the dispersion-difference simulations; **none** about design imbalance) |
| `nested` | 1 (the GFRN real-data design) |
| `Nygaard` | **0** |
| `ComBat_seq` (literal) | **0** |

Therefore the paper does **not** address:

- **Unbalanced batch–group designs.** The words never appear. No simulation varies the balance of the
  batch × condition design; every simulation is the same 2-condition × 2-batch layout, and the one
  design explicitly described as *balanced* is Figure 2's.
- **Type-I error inflation caused by design imbalance.** The FPR inflation the paper *does* report
  (0.059–0.067) has an entirely different cause: **applying a per-batch-dispersion model when no true
  dispersion difference exists**. It is a model-misspecification/over-parameterization effect, not a
  design-imbalance effect.
- **Nygaard et al. 2016** — not cited, not quoted, not responded to, not in the 17-item reference list.
- **Any simulation of the confounded regime.** Confounding is named once, in a limitation sentence,
  with no supporting experiment or numbers.
- **The R function's signature and argument names.** The paper never prints `ComBat_seq(...)`, never
  names a `group` / `covar_mod` / `full_mod` argument, and gives no code. Covariates enter only
  abstractly as `X_j` in the model equation. Software is located only as: "The ComBat-seq software is
  available in the sva package in the Bioconductor project (17)," with code at
  https://github.com/zhangyuqing/ComBat-seq.
- **A pinned sva version.** No version number is given anywhere; ref 17 is the 2012 *Bioinformatics*
  sva package paper (Leek, Johnson, Parker, Jaffe, Storey; 28:882–883).
- Batch effects' impact on **prediction / classifier training** (explicitly out of scope).
- Any **>2-batch simulation** (the real data has 3 batches, but simulations are 2).

## 11. Open questions / ambiguities the source leaves unresolved

- Where exactly is the boundary between "severely confounded" (method may fail) and the partially
  nested GFRN design (where the method is claimed to succeed)? The paper applies ComBat-seq to a design
  in which each treatment is *completely nested* within one batch and reports success — yet the
  Discussion warns GLMs "may not work well" on "severely or even completely confounded" designs. The
  reconciling factor appears to be that GFP **controls are present in all three batches**, which is
  what makes `γ_gi` estimable, but the paper never states this as the criterion.
- No guidance on **how much** dispersion difference is enough to justify ComBat-seq over the one-step
  approach — the paper says "when there is a sufficient level of dispersion differences" but sets no
  threshold; the practical decision is left to a "careful diagnosis" (BatchQC) with no cutoff.
- The EB-shrinkage option exists in the software but the paper says it is unnecessary; when (if ever) a
  user should turn it on is unresolved (evidence is in the unread supplement).
- Whether `ϕ*_g` being the **unweighted mean** of per-batch dispersions is appropriate when batch sizes
  differ markedly is not discussed.

## 12. Guidance answers

**Q. The model — what NB model, how does it differ from ComBat's Gaussian EB model? Equations and
estimated parameters.** → §5.1/5.2. Gene-wise NB regression
`log μ_gij = α_g + X_j β_g + γ_gi + log N_j`, `var = μ + ϕ_gi μ²`; estimated parameters `α_g`, `β_g`,
`γ_gi` (mean batch effect, Fisher scoring) and `ϕ_gi` (**per-batch** dispersion, Cox–Reid APL).
Differences from ComBat: (a) NB not Gaussian — robust to outliers/skew, respects mean–variance
dependence; (b) **no EB shrinkage needed** (ComBat needs it; ComBat-seq's distributional assumption
already confers robustness); (c) adjustment is **quantile mapping** to a batch-free NB, not
standardization (subtract-mean/scale-by-variance), because standardizing NB data does not work.

**Q. Inputs and outputs — raw integer counts? adjusted counts? function signature, `group` argument.**
→ Inputs: a raw gene-by-sample **integer count matrix** (library size `N_j` = total counts per sample
is used as an offset, so the model handles depth internally rather than requiring pre-normalized
input); a known **batch** variable; optionally a biological condition/covariate `X_j` (indicator **or**
continuous clinical covariate), whose effect is preserved through adjustment. Output: an **adjusted
integer count matrix**. **The paper never gives the function signature or argument names** — no literal
`ComBat_seq(`, no `group=` — so the guidance's request to "capture the function signature and the
`group` argument and its stated purpose" **cannot be answered from this source**. It must come from the
sva package docs/vignette, not here. Quote for the integer-count point: §7 quote 1.

**Q. Does the paper say adjusted counts may be fed directly into a standard DE pipeline? Quote the
exact sentence.** → **Yes.** §7 quote 2: "This method ensures that the adjusted data remain integer
counts, and thus are compatible as input for downstream differential expression software like edgeR
and DESeq2." Note what this sentence does and does not claim: it asserts **format compatibility**
(integers are valid input), not that the subsequent inference is calibrated. The paper's own FPR
results (§6, §9) show the downstream test can be **anti-conservative** (FPR 0.059–0.067) when
ComBat-seq is applied with no true dispersion difference.

**Q. Does the paper discuss unbalanced batch–group designs at all?** → **NO. Confident silence, and
this is a null result reported plainly.** `unbalanc*` = 0 occurrences, `imbalanc*` = 0, `"type I"` = 0
(only one `type-I`, defining the FPR metric). The three `balanc*` hits all describe *balanced* designs.
No simulation varies design balance. **The paper says nothing about unbalanced designs inflating false
positives.** The FPR inflation it *does* report is caused by fitting per-batch dispersions when none
truly differ — a different mechanism entirely, and one that would be a category error to cite as
support for a "Nygaard caveat if unbalanced."

**Q. Does the paper cite or respond to Nygaard et al. 2016?** → **NO. It does not cite Nygaard.**
"Nygaard" appears **zero** times in the full XML. The reference list is 17 items: Leek(1), Robinson(2),
Risso(3), Johnson(4), Leek(5), Zhang(6), Robinson/edgeR(7), Love/DESeq2(8), Law/voom(9), McCarthy(10),
Chen(11), Frazee/polyester(12), Rahman(13), McQuerry(14), National Cancer Institute(15),
Manimaran/BatchQC(16), Leek/sva(17). No Nygaard, no Rødland, no Hovig. There is **no response to
quote.** → **This settles the guidance's motivating question: ComBat-seq's own paper provides NO
support for attaching a "Nygaard caveat if unbalanced" to ComBat-seq. Neither this paper nor
(per the guidance) `nygaard-2016` itself supplies that link.**

**Q. Performance when batch is confounded with biological condition — any simulation? Setup and
numbers?** → **No simulation.** Confounding is addressed in exactly **one sentence**, a Discussion
limitation (§7 quote 3): the gene-wise NB GLM "may not work well on data with severely or even
completely confounded study designs," with the deflection that this is hard "for most if not all the
state-of-the-art batch adjustment methods," and the mitigation "careful experimental design." **No
setup, no numbers, no detector, no threshold.** The closest empirical touch is the **real** GFRN
dataset, where each treated condition is **completely nested within a single batch** (§7 quote 5) —
partial confounding — but GFP controls are shared across all three batches; the paper reports success
there (PCA structure recovered, EGFR recovered as DE at FDR ≤ 0.05, ranked 42.3%, FDR = 0.0016) without
framing it as a confounding experiment or reporting error rates for it.

**Q. Benchmarking setup + reported type-I/FDR/sensitivity numbers with conditions.** → §5.4 (setup:
polyester, 918 genes, 2 conditions × 2 batches, 2-fold biological signal, mean batch 1.5/2/3×,
dispersion batch 2/3/4×, 300 reps/setting) and §6 (all FPR/TPR numbers with their conditions).

**Q. Stated assumptions and limitations (small batches, EB behavior, when NOT to use).** → §8 and §9.
Notably **when NOT to use it**: when there is **no true dispersion difference across batches** — then
ComBat-seq inflates FPR (0.059–0.067) with no power gain, and batch-as-covariate is sufficient. And
more generally: only adjust when batch effects are present and demonstrably harmful; diagnose first
(§7 quote 4).

**Pin.** DOI 10.1093/nargab/lqaa078 ✅. **sva version providing `ComBat_seq()`: NOT PINNABLE from this
paper** — no version number appears; the paper cites only the 2012 sva package paper (ref 17) and the
repo https://github.com/zhangyuqing/ComBat-seq. If a version pin is needed it must be sourced from
Bioconductor, not from here.

**Must-quote checklist.** (a) What the data is for (integer counts) → §7 quote 1 ✅.
(b) Any statement about unbalanced or confounded designs **or the confirmed absence of one** →
unbalanced: **confirmed absent** (§10 term table); confounded: §7 quote 3 ✅.
(c) Any stated limitation → §7 quotes 3 and 4, §8 ✅.

**license_file.** The guidance notes CC-BY-4.0 requires a `license_file`. Not created by this command
(it writes `index.md` only) — flagging as an open item for the note author. License text:
https://creativecommons.org/licenses/by/4.0/legalcode
