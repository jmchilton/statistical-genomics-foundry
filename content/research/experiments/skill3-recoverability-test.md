# Recoverability test: can skill 3 (batch correction) be authored from its source notes alone?

> Falsifiable version of "are the notes specific enough?" — instead of asserting, blind-author the
> skill from notes-only and diff. 2026-06-27.

## Method
A clean-context agent was given ONLY the faithful summaries of [[nygaard-2016]], [[leek-2010]],
[[deseq2-vignette]] (footers withheld — they contain our gap analysis), the skill's six-item scope
(from `docs/MOLDS.md` skill 3), and one rule: **mark `[GAP: …]` wherever the notes don't supply what's
needed, never fill from memory.** No web, no other files, no parametric backfill.

## Verdict
1. **No confabulation.** Every substantive claim in the draft traces to the three notes (checked against
   the pasted summaries). The author *refused* to invent RUV rather than smooth it over. Contrast issue #2's
   blind-regen, where the model confabulated freely — the difference is the `[GAP]` instruction. **Finding:
   a flag-gaps instruction converts a confabulation-prone task into an honest one.**
2. **Not yet recoverable end-to-end.** 10 self-flagged gaps + 1 silent gap. The referee teeth
   (correct-then-test + model-in-design remedy) recovered in full detail, incl. Nygaard's 2011-vs-11 /
   1003-vs-377 numbers. The doer half (choose a correction tool, flag aliasing operationally) did not.

## Gap taxonomy → next actions
Gaps are not all "write a new note." Three kinds:

| Gap | Kind | Action |
|---|---|---|
| RUV absent; ComBat/SVA when-which + mechanics | new source note | ComBat (Johnson 2007), SVA (Leek & Storey 2007), RUVSeq (Risso 2014) |
| **ComBat-seq / microarray-vs-counts trap** (SILENT — author couldn't flag it) | new source note | ComBat-seq (Zhang 2020); plain ComBat is Gaussian/microarray, wrong on counts |
| Full-rank / non-identifiability rule for perfect aliasing | **re-summarize existing source** | DESeq2 vignette "Model matrix not full rank" section — [[deseq2-vignette]] dropped it |
| limma: correction is for visualization, block batch in the design | new source note (optional) | limma `removeBatchEffect` doc |
| numeric cutoff for "batch present" / "unbalanced enough" / min replicates/batch | **convention, not citable** | flag as judgment per `content/research/05` finding #2 — do not fabricate a primary |

**Headline:** the silent gap (ComBat-seq) is the one that matters most — a memory-written skill would sail
past recommending plain ComBat on counts, a real correctness error the notes never surface.

---

## The notes-only draft (byproduct — NOT a finished skill; 10 GAP markers retained)

# Skill: Handling Batch Effects & Confounding in Differential-Expression Analysis

A decision-grade reference for an analyst or agent running a differential-expression (DE) study who must
decide how to handle batch structure. Built strictly from three sources: Nygaard et al. 2016 (Nygaard),
Leek et al. 2010 (Leek), and the DESeq2 vignette v1.52.0 (DESeq2 vignette).

## 1. When to use / what problem this addresses
Use this skill whenever you are testing for differences in high-throughput molecular measurements between
biological groups and the samples were processed in more than one batch, on more than one date, or under
conditions that varied non-biologically.
- Batch effects are "sub-groups of measurements that have qualitatively different behaviour across conditions
  and are unrelated to the biological or scientific variables in a study" (Leek); tied to processing
  conditions, group, and time (Leek).
- Pervasive across platforms — arrays, mass spec, CNV, second-generation sequencing incl. 1000 Genomes (Leek)
  — and across microarray (Nygaard) and RNA-seq counts (DESeq2 vignette).
- NOT removed by normalization: "normalization does not remove batch effects, which affect specific subsets
  of genes and may affect different genes in different ways" (Leek). DESeq2's median-of-ratios size factors
  are normalization and likewise not a batch remedy (DESeq2 vignette).
- When batch is correlated with the outcome it confounds and can invalidate conclusions (Leek); batch can also
  *induce* spurious group differences (Nygaard).
- Bottom line: batch adjustment should be "a standard step … along with normalization, exploratory analysis
  and significance calculation" (Leek).

## 2. Detect & quantify batch structure and confounding
Record surrogates first: date and group are the usual *surrogates* for batch (Leek); record processing group,
time, personnel, reagent, storage, lab changes, and report them per sample (Leek). Date/group are "probably
only surrogates" and adjusting for them "might not be sufficient" (Leek).
Exploratory diagnostics (Leek Step 1): hierarchical clustering; MDS; feature-vs-variable plots; correlate PCs
with the batch surrogates. For RNA-seq counts, build the QC/PCA matrix with `vst()` (n≥30) / `rlog()` (n<30),
log2-scale, `blind=TRUE` — for visualization/QC, NOT testing (DESeq2 vignette).
Quantify (Leek): linear models for surrogate–outcome confounding; ANOVA for fraction of surrogate-associated
features; check whether surrogates sit among top PCs (they consistently did; biology often correlated more
weakly with leading PCs than the surrogate). Reference points: susceptible features ~32.1%–99.5%, confounding
~12.2%–100% (Leek Table 1, approximate); "32% of the features were associated with date but up to 73% were
associated with the second principal component" (Leek).
Balance (Nygaard): no inflation iff `n_iA:n_iB = n_A:n_B` for all batches; inflation depends on unevenness,
"essentially independent of sample size."
- [GAP: numeric threshold for when PC–surrogate correlation / fraction of surrogate-associated features is large enough to declare batch structure "present and must be handled" — Section 2]
- [GAP: quantitative cutoff for "balanced enough to ignore" vs "unbalanced enough to act" — Section 2]
- [GAP: formal test/decision rule for declaring batch confounded with outcome from the linear-model measure — Section 2]

## 3. Decide: block/model batch vs. apply a correction method
Route A — account for batch IN the analysis (preferred): Nygaard's "primary advice" is "to account for batch
in the statistical analysis"; limma "blocking" is the safe option (Nygaard). Leek Step 2: include processing
group + time as covariates. DESeq2 counts: `~ batch + condition`, variable of interest last, control level
first (DESeq2 vignette).
Route B — correction methods named: SVA "when true sources are unknown" (Leek); ComBat (empirical Bayes) named
(Leek), but preserve-group ComBat on unbalanced data can induce false discoveries (Nygaard, §4).
When which: default Route A when batch is known/recorded; SVA when sources unknown (Leek); preserve-group
adjustment only "with great caution," output "not … 'batch effect free'" (Nygaard). No method benchmarked
superior (Leek).
- [GAP: RUV not described in any source — when-to-use, mechanism, comparison — Section 3]
- [GAP: operational criteria for ComBat vs SVA vs others beyond "SVA when sources unknown," + step-by-step to run SVA/ComBat — Section 3]
- [GAP: integrating an estimated surrogate (SVA/RUV factor) into a DESeq2 design formula — Section 3]
- [GAP: recommended minimum biological replicates per batch — DESeq2 mandates none — Section 3]

## 4. The "correct-then-test" trap
What: running DE tests on a separately batch-adjusted matrix — especially preserve-group adjustment (two-way
ANOVA / ComBat with group as covariate) (Nygaard). Why wrong: under unbalance, real group differences induce
apparent batch differences; preserve-group adjustment then induces increased between-group differences →
over-confidence (Nygaard §2.2.2); random N(0,1) through it gives an inflated p-value distribution; inflation
"essentially independent of sample size" (Nygaard). Cost: 2011 vs 11 DE genes (Towfic/GSE40566); 1003 vs 377
probes (Johnson 2007) (Nygaard). Fix is structural; corrective test-stat patches "are not ideal" (Nygaard).
RNA-seq corollary: DESeq2 expects raw counts; "transformed or normalized values … should not be used as
input"; handle batch via the design formula (DESeq2 vignette). DESeq2 itself gives no correct-then-test
warning (DESeq2 vignette silence).
- [GAP: whether Nygaard's microarray preserve-group inflation transfers quantitatively to RNA-seq NB count models — Section 4]

## 5. Batches aliased (confounded) with the condition — the unfixable case
Recognize: condition cannot be separated from batch. Bladder-cancer example: CIS "strongly confounded with
processing date," controls "clustered perfectly by the processing date" (Leek). Detect via linear-model
confounding + clustering/PCA separating by surrogate not biology (Leek); severe marker: "several batches
having only one of the main treatments" (Nygaard). Why unpatchable: confounding → irreproducible/wrong
findings, normalization doesn't rescue (Leek); adjusted data "should not be trusted to be 'batch effect free'"
(Nygaard); no endorsed rescue (Nygaard). Do: preventive — balanced design (Nygaard, Leek); fallback "if …
possible" account for batch (Nygaard implies some configs leave no trustworthy option).
- [GAP: explicit identifiability statement that perfect aliasing makes the condition effect non-estimable / only remedy is redesign — Section 5]
- [GAP: threshold separating "unbalanced but analyzable by modeling batch" from "so aliased no analysis is valid" — Section 5]

## 6. Bottom line
1. Design for balance up front; record + report handling variables (Nygaard, Leek).
2. Treat batch adjustment as a standard analysis step (Leek).
3. Prefer modeling/blocking batch in the test over pre-correcting; DESeq2 on raw counts `~ batch + condition`,
   vst/rlog for QC only (Nygaard, Leek, DESeq2 vignette).
4. Avoid correct-then-test on preserve-group adjusted unbalanced data (2011 vs 11; 1003 vs 377) (Nygaard).
5. SVA when batch source unknown; ComBat available with the preserve-group caution (Leek, Nygaard).
6. Flag full aliasing as a stop condition — escalate to redesign rather than report (Leek, Nygaard).
