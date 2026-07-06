---
title: "Assessment of false discovery rate control in tandem mass spectrometry analysis using entrapment (Wen et al. 2025)"
type: paper
source_id: wen-2025
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC12240826/
doi: 10.1038/s41592-025-02719-x
access_date: "2026-07-01"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Wen B, Freestone J, Riffle M, MacCoss MJ, Noble WS, Keich U. Nature Methods 22(7):1454-1463, 2025."
derived: faithful-summary-with-quotes
---

# Wen et al. 2025 — Entrapment assessment of FDR control in MS/MS

*Faithful clean-context summary of one source; read the CC-BY open-access PMC full text plus this note's guidance. Project framing lives in the flagged footer. License mode: CC-BY 4.0 — short verbatim load-bearing quotes reproduced.*

## 1. Citation

Wen B, Freestone J, Riffle M, MacCoss MJ, Noble WS, Keich U. "Assessment of false discovery rate control in tandem mass spectrometry analysis using entrapment." *Nature Methods* 22(7):1454-1463, 2025. DOI 10.1038/s41592-025-02719-x. PMID 40524023. Software: FDRBench, https://github.com/Noble-Lab/FDRBench (Java, Apache license).

## 2. Access note

Read the CC-BY 4.0 open-access full text at PMC (PMC12240826) via WebFetch in three passes: (a) abstract/intro/results, (b) methods/discussion, (c) license + DDA-validation. License confirmed verbatim: "Open Access This article is licensed under a Creative Commons Attribution 4.0 International License, which permits use, sharing, adaptation, distribution and reproduction in any medium or format..." — so short verbatim load-bearing quotes are reproduced below under CC-BY.

**Not read:** figure pixel content (Figures 1-4 discussed only via their captions/text references), Supplementary tables (e.g. Supplementary Table 1 dataset listing referenced but not directly inspected), exact software version strings beyond those quoted in text. Equation renderings below are transcribed from the fast-model conversion of the PMC HTML; the four core formulas were consistent across two independent fetches, but subscript/notation details for the paired method (Eq. 4) should be re-checked against the PDF before being encoded [summarizer-inferred: minor notation risk].

## 3. Thesis

No DIA search tool consistently controls FDR when audited by entrapment; the failure is worse at the protein level than the precursor/peptide level, and worst on single-cell DIA. Verbatim: "none of these search tools consistently controls the FDR at the peptide level across all the datasets we investigated. Furthermore, this problem becomes much worse when these DIA tools are evaluated at the protein level." Abstract-level: "no DIA search tool consistently controls the FDR, with particularly poor performance on single-cell datasets."

## 4. Problem & context

FDR is normally self-reported by the analysis pipeline via target-decoy competition (TDC). But pipelines "implement variants of the procedure that potentially fail to control the FDR." Two named internal hazards: "PSM-level control using TDC is inherently problematic," and "most pipelines involve training a semisupervised classification algorithm, such as Percolator or PeptideProphet, to rerank PSMs, which in practice can compromise FDR control." A pipeline's own FDR estimate cannot audit itself — so an **external** audit is needed. Entrapment supplies it: known-absent sequences are added to the search database; if the tool reports them as discoveries above its claimed FDR, control has failed. Stakes: "if the pipeline claims that the FDR is controlled, say, at 1%, but the actual average of the FDP is 5%—then the scientific conclusions drawn from those experiments may be invalid."

## 5. Method / approach

**Entrapment framework.** Expand the search database with verifiably-false ("entrapment") sequences unknown to the studied organism; the search tool is blind to which sequences are original-target vs. entrapment. After the tool reports discoveries at its claimed FDR threshold, an external evaluator counts how many discoveries are entrapment and estimates the true false discovery proportion (FDP).

- **r** = ratio of entrapment database size to original-target database size. r=1 means one entrapment peptide per original target.
- **N_T** = number of original-target discoveries the tool reports; **N_E** = number of entrapment discoveries.
- **Entrapment generation, two styles:** (i) *shuffled* — shuffle target peptides (keeping the C-terminal residue fixed) to create foreign sequences; (ii) *foreign species* — add peptides from evolutionarily distant organisms (e.g. *Arabidopsis*, castor bean).
- **Core assumption:** entrapment peptides are genuinely absent from the sample, and an incorrect discovery is at least as likely to hit an entrapment sequence as a target — analogous to the TDC decoy assumption "P(L_i = −1) ≥ 1/2 independently of everything else (including of the score W_i)."

**Four estimators (the paper's classification of methods in use):**

- **Combined (Eq. 1) — valid upper bound:** `FDP = N_E(1 + 1/r) / (N_T + N_E)`. The (1+1/r) term accounts for expected false discoveries among the targets. "on average it overestimates the true FDP." Use to *establish* valid control.
- **Lower bound (Eq. 2) — lower bound only:** `FDP = N_E / (N_T + N_E)` (drops the 1/r term). "this method can only be used to indicate that a tool fails to control the FDR." Cannot establish control.
- **Sample estimation (Eq. 3) — invalid:** `FDP = (N_E/r) / N_T` (entrapment hits excluded from denominator). "cannot be used to provide empirical evidence that a tool controls the FDR nor that the tool fails to control the FDR" — it can both under- and, in unusual cases, over-estimate.
- **Paired (Eq. 4) — introduced here, tighter valid upper bound:** `FDP* = [N_E + N_{E≥s>T} + 2·N_{E>T≥s}] / (N_T + N_E)`, where s = discovery score cutoff, `N_{E≥s>T}` = discovered entrapment peptides whose paired target scored < s, `N_{E>T≥s}` = discovered entrapment peptides whose paired target was also discovered but scored lower. Requires each target paired 1:1 with a unique entrapment peptide (r=1), i.e. shuffling/reversal generation. "allows us to reduce the conservative bias of the combined method while still retaining its upper bound nature."

**Governing principle:** "An upper bound estimate such as the combined estimation can only be used to show valid FDR control, and the lower bound to highlight invalid FDR control."

**Method validation on DDA first.** Before applying to DIA, they validated the entrapment estimators on DDA (where TDC FDR control is well established) using DDA tools Tide, Sage, MS-GF+, MSFragger on two DDA datasets — ISB18 (controlled 18-protein mixture) and HEK293 (24 MS/MS analyses). The paired estimate tracks the truth: ISB18 — "the paired method yields an estimated FDR curve that weaves very closely about the line y = x, which is firmly within the 95% coverage band of this estimate"; HEK293 — "for all peptide-level analysis tools the paired method yields estimated FDPs that are quite close to the diagonal." This grounds the DIA findings: the estimator agrees with known-good control on DDA, so DIA deviations are real.

**DIA experiment.** Three DIA tools — **DIA-NN (v1.8.1)**, **Spectronaut (v18.7.240325.55695)**, **EncyclopeDIA (v2.12.30)** — across **10 DIA datasets** (human-astral, human-qe, human-tripletof, yeast-lumos, mouse-qe, human-timstof2, human-timstof1, 100cell-eclipse, 1cell-eclipse, human-lumos; EncyclopeDIA only on the 4 gas-phase-fractionation datasets). Evaluated at precursor/peptide and protein levels.

## 6. Key claims / findings (each pinned to tool + dataset + level)

- **DIA-NN, aggregate across the 10 datasets, at 1% claimed FDR:** estimated discovery inflation "up to 6.7% in the number of discoveries at the precursor level and up to 4.7% at the protein level."
- **DIA-NN, 1cell-eclipse (single-cell), at 1% claimed FDR:** "estimated inflation rate is up to 48.3% at the precursor level and 44.2% at the protein level." (Most severe case.)
- **DIA-NN, human-lumos:** protein-level estimated FDP 2.1-2.6% (vs 1% claimed); precursor level in the 1-2% estimated-FDP range.
- **1cell-eclipse, precursor-level FDP lower bounds:** DIA-NN above 2.3% (range 2.3-4.7%); Spectronaut above 3.8% (range 3.8-7.6%) — both above the 1% claim.
- **EncyclopeDIA, human-lumos, protein level:** "lower bound on EncyclopeDIA's FDP is above 6%" while its precursor level was acceptable — illustrating protein-level failure even when precursor passes.
- **General pattern:** "the precursor or peptide-level FDR control is frequently questionable, whereas protein-level FDR control is frequently invalid."
- **Survey of prior entrapment usage:** "Only three of the studies we summarized in the table correctly use entrapment estimation, and all three focused on DDA analysis" — i.e. most published entrapment analyses used invalid or lower-bound-only estimators.

## 7. Load-bearing statements (verbatim, CC-BY)

- Data-reuse mechanism (the target sentence): "Percolator's cross-validation scheme to improve the ranking of the PSMs can inadvertently misuse the target/decoy label when multiple spectra are generated from the same peptide species."
- Why entrapment still catches it: "Because in this case the compromised FDR control stems from indirectly peeking at the target/decoy label but not at the target/entrapment label, the problem can be identified even when both the entrapment sequences and the decoys are shuffled."
- Pipeline hazards: "PSM-level control using TDC is inherently problematic. Similarly, most pipelines involve training a semisupervised classification algorithm, such as Percolator or PeptideProphet, to rerank PSMs, which in practice can compromise FDR control."
- Estimator directionality: "An upper bound estimate such as the combined estimation can only be used to show valid FDR control, and the lower bound to highlight invalid FDR control."
- Lower-bound scope: "without the 1/r term...equation (2) represents a lower bound on the FDP. As such, this method can only be used to indicate that a tool fails to control the FDR."
- Sample method invalidity: "the sample estimation method cannot be used to provide empirical evidence that a tool controls the FDR nor that the tool fails to control the FDR."
- Stakes: "if the pipeline claims that the FDR is controlled, say, at 1%, but the actual average of the FDP is 5%—then the scientific conclusions drawn from those experiments may be invalid."
- Protein-level severity / call to research: "Given the importance of protein-level analysis to mass spectrometry experiments, we believe that this result should serve as a call to further research into this problem."

## 8. Stated scope / assumptions / limitations

- Entrapment validity rests on: (a) entrapment sequences genuinely absent from the sample (contamination or homology to real peptides would break it); (b) equal-chance assumption P(incorrect hit is entrapment) ≥ 1/2 independent of score.
- Shuffled sequences "cannot account for errors from homologs or 'neighbors'" (distinct peptides with similar spectra) — a limitation shared by the foreign-species approach.
- The paired method requires r=1 (1:1 pairing via shuffle/reversal). They caution against validating FDR control with r >> 1 (atypical database dominated by entrapment).
- FDP variance is reduced by larger datasets or averaging over multiple entrapment sets.
- They "generally caution against trying to control the FDR at the PSM level."
- Root cause of protein-level failure not determined — flagged as open ("call to further research").
- Shuffled-vs-foreign debate: they acknowledge the Madej & Lam circular-reasoning concern; argue validity depends on how entrapment differs from the tool's own decoys; an ISB18 mixed foreign/shuffled double-entrapment check showed "perfect agreement."

## 9. Failure modes / invalidity patterns (referee-relevant)

- **Self-certification is not an audit.** A pipeline's own reported FDR (TDC) cannot validate itself; requires an external entrapment audit. This is the load-bearing structural point: doing (the search) does not certify its own error rate.
- **Same-spectra reuse / double-dipping.** When the same spectra feed both the initial search and a semisupervised rescorer (Percolator/PeptideProphet cross-validation), and multiple spectra come from the same peptide species, the target/decoy label leaks across the CV folds -> reported FDR is anticonservative (underestimated) even though the tool "controls" it by its own count. Detectable by entrapment because entrapment labels are independent of the decoy labels the rescorer peeked at. NOTE: the paper argues this theoretically and states entrapment *can* detect it; it does not present a standalone empirical demonstration isolating this mechanism in this work.
- **Using the wrong estimator.** Reporting the lower-bound (Eq. 2) or sample (Eq. 3) estimate as evidence of *control* is itself an invalidity pattern — most prior literature did this. Only the combined/paired upper bounds can demonstrate control; the lower bound can only demonstrate failure.
- **Operational detector (null-style empirical check):** add known-absent sequences to the database, run the pipeline blind, count how many are reported as discoveries at the claimed FDR; if the entrapment-estimated FDP exceeds the claim, control has failed. This is the concrete audit primitive — a foreign-label null the pipeline cannot see.

## 10. What the source does NOT address

- Does not fully diagnose *why* protein-level DIA control fails (explicitly left open).
- Does not give an empirical, mechanism-isolated demonstration that spectra-reuse rescoring alone causes the observed inflation (theoretical link only).
- Does not resolve the proper evolutionary distance for foreign-species entrapment, nor fully settle shuffled-vs-foreign adequacy.
- Does not cover DDA tool failure (DDA used only as the positive control where FDR *is* controlled).
- Does not address non-Percolator/PeptideProphet rescorers specifically, nor quantify inflation attributable to each pipeline component.

## 11. Open questions / ambiguities

- Exact subscript notation of the paired formula (Eq. 4) — re-verify against PDF [summarizer-inferred: conversion risk].
- Whether the ~6.7%/4.7% DIA-NN aggregate figures are maxima across datasets or per a specific dataset — text says "up to," implying maxima across the 10 datasets [summarizer-inferred].
- Precise per-dataset, per-tool table (Table 2) values beyond the highlighted cases were not fully extracted.

## 12. Guidance answers

- **Headline + numbers:** DIA tools do NOT consistently control FDR. Precursor/peptide level "frequently questionable"; protein level "frequently invalid." DIA-NN aggregate: up to 6.7% precursor / 4.7% protein inflation at claimed 1% FDR across 10 datasets. Single-cell 1cell-eclipse DIA-NN: up to 48.3% precursor / 44.2% protein inflation — the paired numbers the guidance cited are confirmed and pinned above (§6). Tools: DIA-NN 1.8.1, Spectronaut 18.7, EncyclopeDIA 2.12.30. 10 DIA datasets (EncyclopeDIA on 4). Levels: precursor/peptide and protein.
- **Entrapment methodology / three-methods classification:** INVALID = sample estimation (Eq. 3, entrapment excluded from denominator). LOWER-BOUND-ONLY = Eq. 2 (drops 1/r; can only show failure). VALID upper bounds = combined (Eq. 1, conservative) and the newly introduced paired (Eq. 4, tighter, needs r=1). Combined FDP = N_E(1+1/r)/(N_T+N_E). Entrapment FDP estimated by adding known-absent sequences (shuffled with fixed C-term, or foreign species) at ratio r, blind to the tool, then counting reported entrapment discoveries N_E vs target discoveries N_T. Formulas in §5/§6.
- **Data-reuse / double-dipping:** verbatim mechanism sentence captured in §7 — Percolator CV "can inadvertently misuse the target/decoy label when multiple spectra are generated from the same peptide species," yielding anticonservative reported FDR; entrapment still detects it because entrapment labels are independent of the decoy labels the rescorer peeked at (§7, §9). Theoretical, not empirically isolated here.
- **Remedy:** entrapment as the external audit vs internal TDC self-report; use combined/paired upper bounds to establish control, lower bound only to flag failure; FDRBench (github.com/Noble-Lab/FDRBench, Java, builds entrapment DBs + computes all three estimators); validated on DDA against the y=x diagonal (§5). General caution against PSM-level control and against r>>1.
- **Operational detector:** §9 — add known-absent sequences, run blind, if entrapment-estimated FDP > claimed FDR, control failed. A foreign-label null the pipeline cannot see.

## Relevance to this project  `[design-inference — author-added, not from source]`
- **Pole:** cautionary-bad + remedy. Closes the `search-then-quantify-same-data` `[GAP]` in [[double-dipping]] — the DIA-proteomics signature, a confirmed review-orphan ([[double-dipping-survey]]). Empirically demonstrates DIA FDR underestimation (up to 6.7% / 4.7% aggregate at 1% claimed; **48.3% / 44.2% single-cell**) and names the same-spectra-reuse rescoring mechanism.
- **Grounds:** the [[double-dipping]] search-then-quantify signature + its remedy: **external entrapment audit** (not self-reported TDC); combined/paired upper-bound estimators to *establish* control, lower-bound only to *flag failure*.
- **The sharpest "Doing Never Self-Certifies" instance in the corpus:** "a pipeline's own reported FDR cannot audit itself" is exactly the project's Family-B external-referee bet, stated in a proteomics primary. The entrapment audit *is* the gate's empirical check.
- **The portable detector** (foreign-label null the pipeline can't see) has the same shape as [[kriegeskorte-2009]]'s run-on-noise detector and [[korthauer-dmrseq-2019]]'s null-comparison / re-detect-under-null — cross-link; entrapment is the proteomics instance of the same calibrate-style empirical check the gate can demand.
- **Honesty flag carried forward (do not overclaim):** the same-spectra-reuse / double-dipping *mechanism* is argued **theoretically**; Wen 2025 demonstrates the FDR *failure* empirically (the numbers) and shows entrapment *can* detect such a leak, but does **not** empirically isolate rescoring-reuse as the cause. So the DIA leaf's "circular inference" framing rests on: strong empirical FDR-underestimation + a theoretically-named (not isolated) reuse mechanism.
- **Framing boundary:** proteomics frames this as FDR-validity / target-decoy-assumption / entrapment, **not** "double-dipping / selective inference." The unifying "select-then-test on the same data" frame is this project's synthesis ([[double-dipping-survey]] confirms no review bridges the communities).
- **Second-wave (not ingested):** Freestone, Käll, Noble & Keich 2025 (JPR; Percolator-RESET) — the rescoring-double-dip *remedy mechanism* (cross-validation / separate-decoy training), DDA-framed; the mechanism leg behind §7's sentence.
