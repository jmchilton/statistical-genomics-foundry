# Leek et al. 2010 — Tackling the widespread and critical impact of batch effects in high-throughput data

> Faithful summary generated in a clean context via `/summarize-source` (guided by `guidance.md`), 2026-06-27.
> Project framing is in the flagged footer only.

## 1. Citation
Leek JT, Scharpf RB, Corrada Bravo H, Simcha D, Langmead B, Johnson WE, Geman D, Baggerly K,
Irizarry RA (2010). "Tackling the widespread and critical impact of batch effects in
high-throughput data." *Nature Reviews Genetics* 11(10):733–739. DOI: 10.1038/nrg2825.
Open NIH author manuscript: https://pmc.ncbi.nlm.nih.gov/articles/PMC3880143/
(publisher version paywalled).

## 2. Access note
Read the open NIH author manuscript (PMC3880143) via automated full-text fetch/extraction, not
a manual read of the typeset PDF. Quotes below are reproduced as returned by that extraction and
are believed verbatim; where exact wording or a precise figure could not be cross-confirmed, it
is flagged. Per-dataset Table 1 values (individual confounding/susceptibility percentages) varied
slightly between extraction passes and are reported only as ranges, not pinned per dataset.

## 3. Thesis (1 sentence)
Batch effects — technical, non-biological variation tied to how/when samples were processed — are
widespread in high-throughput data and become a critical problem when correlated with the outcome
of interest, so they must be detected and adjusted for as a standard analysis step.

## 4. Problem & context
High-throughput assays (microarrays, sequencing, mass spec, methylation, copy-number) produce
measurements affected by "laboratory conditions, reagent lots and personnel differences."
Verbatim (Abstract): "This becomes a major problem when batch effects are correlated with an
outcome of interest and lead to incorrect conclusions." Consequences span a benign-to-severe
range — verbatim: "In the most benign cases, batch effects will lead to increased variability and
decreased power to detect a real biological signal. Of more concern are cases in which batch
effects are confounded with an outcome of interest and result in misleading biological or clinical
conclusions." The authors note undetected batch effects "can lead to substantial misallocation of
resources and lack of reproducibility," and cite a real proteomics/ovarian-cancer diagnostic case
where confounding contributed to a flawed assay. A key framing: normalization is necessary but
insufficient — it does not address batch effects on gene subsets.

## 5. Method / approach (what the paper actually does)
This is a Perspective/review, not a new method. It:
- Defines batch effects and illustrates them with a bladder cancer (sTCC) example.
- Argues processing **group and date are only surrogates** for the true (often unknown) technical
  sources.
- **Examines public data** across multiple platforms (gene expression, mass spectrometry, copy
  number, methylation, sequencing) and quantifies how many features associate with processing date.
- Lays out **downstream consequences**, then prescribes two classes of solutions:
  **experimental-design** (prevention) and **statistical** (detection + adjustment).

Detection recipe (its recommended exploratory procedure):
- Identify/quantify batch effects using principal components analysis or visualization such as
  hierarchical clustering dendrograms or multidimensional scaling (MDS). Verbatim: "The first step
  in the exploratory statistical analysis of batch effects is to identify and quantify batch
  effects using principal components analysis or visualization techniques, such as hierarchical
  clustering dendrograms or multidimensional scaling."
- Cluster samples labelled with BOTH biological group and known batch surrogate to see which
  dominates. Verbatim: "Hierarchical clustering of samples labelled both with biological groups
  and known batch surrogates reveals whether the major differences are due to biology or batch."
- Plot principal components against known batch variables (processing group/time) to test for
  correlation. Verbatim: "The principal components can also be plotted against known batch
  variables, such as processing group or time, to determine whether, on average, the
  high-dimensional feature data are correlated with batch." Across the studied datasets, a batch
  surrogate was "strongly correlated with one of the top principal components."

Adjustment menu and when each applies:
- **Known batch captured by simple surrogates** → put processing group/time directly into the
  linear model. Verbatim: "If exploratory analyses and prior knowledge suggest that simple
  surrogates, such as processing time, capture all of the batch effects, these surrogates can be
  directly incorporated into the models that are used to compare groups."
- **ComBat / empirical Bayes** is cited (Johnson, Li & Rabinovic) as a named approach for adjusting
  batch effects in this same family of model-based correction; the main text gives it limited
  detail beyond the citation/resource pointer. [extraction gave only the citation wording, not a
  verbatim ComBat description]
- **Unknown / unrecorded sources** → surrogate variable analysis (SVA). Verbatim: "When the true
  sources of batch effects are unknown or cannot be adequately modelled with processing group or
  date, it may be more appropriate to use methods such as surrogate variable analysis (SVA)." SVA
  estimates the batch sources from the data so downstream significance tests can be corrected, with
  the advantage that "surrogate variables are estimated instead of pre-specified, which means that
  the important potential batch variables do not have to be known in advance."

Experimental-design solution (prevention): distribute batches across biological groups. Verbatim:
"High-throughput experiments should be designed to distribute batches and other potential sources
of experimental variation across biological groups." And: record metadata — "Information about
changes in personnel, reagents, storage and laboratories should be recorded and passed onto data
analysts."

## 6. Key claims / findings (atomic)
- Batch effects are sub-groups of measurements with qualitatively different behaviour across
  conditions, unrelated to the study's biological variables.
- Normalization does NOT remove batch effects; they hit specific gene subsets and act differently
  on different genes.
- Across the examined public datasets, **32.1–99.5%** of measured features showed statistically
  significant association with processing date, "irrespective of biological phenotype."
- Processing group/date are only **surrogates** for the true technical sources; even when used,
  they may not capture all artefacts (motivating SVA).
- Batch surrogates were strongly correlated with one of the top principal components in every
  studied dataset.
- In the bladder cancer (sTCC) study, clustering separated samples by CIS status, but CIS status
  was strongly confounded with processing date — and control samples clustered by date — making
  biology vs. artefact undecidable.
- Confounding between the batch surrogate and the biological outcome (Table 1) ranged widely, up to
  a fully confounded (100%) dataset; statistical adjustment is reliable only when confounding is
  NOT high/complete.
- Consequences scale from reduced power (benign) to false/misleading conclusions and
  irreproducibility (severe), with real-world clinical fallout cited.
- Recommendation: make batch-effect adjustment a standard analysis step alongside normalization,
  exploratory analysis, and significance calculation.

## 7. Verbatim quotes for load-bearing claims
- Definition: "Batch effects are sub-groups of measurements that have qualitatively different
  behaviour across conditions and are unrelated to the biological or scientific variables in a
  study." (An illustration of batch effects)
- Normalization: "Normalization does not remove batch effects, which affect specific subsets of
  genes and may affect different genes in different ways." (Introduction)
- Standard step: "There is a need to incorporate adjustment for batch effects as a standard step in
  the analysis of high-throughput data analysis along with normalization, exploratory analysis and
  significance calculation." (Conclusion)
- SVA-when-unknown: "When the true sources of batch effects are unknown or cannot be adequately
  modelled with processing group or date, it may be more appropriate to use methods such as
  surrogate variable analysis (SVA)." (Statistical solutions)
- Feature-association range: "We found batch effects for all of these data sets, and substantial
  percentages (32.1–99.5%) of measured features showed statistically significant associations with
  processing date, irrespective of biological phenotype." (Examination of public data)

## 8. Stated scope, assumptions, limitations (the source's own caveats)
- Statistical correction works best when confounding is incomplete. Verbatim: "These approaches are
  most effective when batch effects are not highly confounded, or correlated, with the biological
  variables of interest."
- Aliased/perfectly confounded designs are not recoverable by adjustment. Verbatim: "If the
  biological variables are highly correlated with processing group or time, it is difficult to
  determine whether observed differences across biological groups are due to biology or artefacts."
- Group/date are surrogates, not the true sources, so surrogate-based modelling can be incomplete —
  the paper's own rationale for SVA.
- Prevention (balanced design) is positioned as primary; statistics is remedial.

## 9. What the source does NOT address (confident silences)
- No head-to-head benchmarking establishing one adjustment method (SVA vs ComBat vs linear
  covariate) as superior; it presents a menu keyed to what is known about batch sources.
- No detailed algorithmic/mathematical specification of ComBat or SVA in the main text (these are
  delegated to cited primary papers).
- No prescriptive numeric threshold for "how much confounding is too much" to attempt correction —
  it is framed qualitatively (not highly/perfectly confounded).
- No guidance specific to single-cell or other post-2010 modalities (out of era).

## 10. Open questions / ambiguities left unresolved
- Exact boundary at which confounding becomes "too high" to adjust is not numerically defined.
- How to choose among adjustment methods when batch is only partially captured by surrogates.
- Whether/when SVA-estimated surrogates can themselves absorb genuine biological signal (risk
  acknowledged only implicitly via the not-highly-confounded caveat).

## 11. Guidance answers
**Detection recipe (clustering / MDS / correlate PCs with batch surrogates):** Fully addressed.
The recommended first step is PCA or visualization via hierarchical clustering dendrograms or
multidimensional scaling; cluster samples labelled with both biological group and batch surrogate
to see which dominates; and plot/correlate top principal components against known batch variables
(processing group/time). See §5 and the verbatim quotes there.

**Normalization does NOT remove batch effects (quote):** "Normalization does not remove batch
effects, which affect specific subsets of genes and may affect different genes in different ways."

**Adjustment menu and WHEN each applies (covariates for known batch; SVA when sources unknown;
ComBat named) — with the SVA-when-sources-unknown quote:** Addressed. Known batch captured by
simple surrogates → include processing group/time directly in the linear model. ComBat (Johnson,
Li & Rabinovic, empirical Bayes) is named as an adjustment approach but described only briefly in
the main text. Unknown/unrecorded sources → SVA. Required quote: "When the true sources of batch
effects are unknown or cannot be adequately modelled with processing group or date, it may be more
appropriate to use methods such as surrogate variable analysis (SVA)."

**Unfixable-confounding example (bladder cancer / CIS confounded with processing date; controls
cluster by date) — quote:** Addressed. "Hierarchical cluster analysis separated the sTCC samples
according to the presence or absence of CIS. However, the presence or absence of CIS was strongly
confounded with processing date." On the controls clustering by date: "the control samples in the
sTCC study clustered perfectly by the processing date, and the processing date was confounded with
the presence/absence status." This anchors the "aliased = unfixable" case: the paper states that
when biological variables are highly correlated with processing group/time, "it is difficult to
determine whether observed differences across biological groups are due to biology or artefacts."

**Ranges for susceptible features / surrogate–outcome confounding (approximate):** Addressed but
report with care. Headline, consistently extracted: **32.1–99.5%** of measured features showed
significant association with processing date across the examined datasets. Table 1 additionally
reports per-dataset surrogate–outcome **confounding** (ranging up to a fully confounded 100%
dataset) and per-dataset **susceptible-feature** percentages (extraction returned values around
the ~50–74% range). These per-dataset Table 1 numbers are approximate here — they varied slightly
between extraction passes and were not independently verified against the typeset table — so treat
the 32.1–99.5% feature–date association range as the reliably-quoted figure and the per-dataset
confounding/susceptibility values as approximate.

**Must-quote checklist:** (a) definition — captured (§7); (b) "normalization does not remove batch
effects" — captured (§7); (c) "standard step in the analysis" recommendation — captured (§7,
Conclusion).

## Relevance to this project  `[design-inference — author-added, not from source]`
- **Pole:** established-good / framing. The authoritative "batch effects are pervasive, normalization
  doesn't fix them, diagnose-and-adjust as a standard step" overview, plus the diagnostic recipe and the
  adjustment menu (covariate / **SVA** for unknown sources / **ComBat**).
- **Grounds:** [[assess-batch-effects-and-confounding]] (detection + the SVA/ComBat menu);
  [[review-experimental-design]] (balance batches across groups; the confounded-with-date = unfixable case).
- **Co-cite with [[nygaard-2016]]** for the unfixable-aliasing case (the bladder/CIS example is the
  qualitative anchor; the operational detector is the DESeq2 full-rank section in [[deseq2]]).
- ComBat/SVA are named but not specified here — dedicated source notes are needed (issues #3–#6).
