---
title: "Unraveling ancient hexaploidy through multiply-aligned angiosperm gene maps"
type: paper
source_id: tang-2008-jcvi
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC2593578/
doi: 10.1101/gr.080978.108
access_date: "2026-07-03"
license: LicenseRef-all-rights-reserved
attribution: "Tang H, Wang X, Bowers JE, Ming R, Alam M, Paterson AH. Unraveling ancient hexaploidy through multiply-aligned angiosperm gene maps. Genome Research 18(12):1944-1954, 2008. DOI 10.1101/gr.080978.108. Free full text read via PMC; summarized in own words."
derived: own-words-summary
tags:
  - domain/synteny
  - domain/whole-genome-duplication
---

# Tang et al. 2008 — Unraveling ancient hexaploidy through multiply-aligned angiosperm gene maps (original MCscan)

## 1. Citation
Tang H, Wang X, Bowers JE, Ming R, Alam M, Paterson AH. 2008. "Unraveling ancient
hexaploidy through multiply-aligned angiosperm gene maps." *Genome Research* 18(12):1944–1954.
doi:10.1101/gr.080978.108. Free full text: PMC2593578
(https://pmc.ncbi.nlm.nih.gov/articles/PMC2593578/).

This is the ORIGINAL MCscan paper (Genome Research 18:1944) — not the later Python JCVI port and
not the *Science* 320:486 synteny paper.

## 2. Access note
Full text read via WebFetch against the PMC HTML (accessed 2026-07). The article body and Methods
were reachable. **Fidelity caveat:** the text was relayed through an intermediary summarizing model,
so single-sentence strings quoted below are high-confidence but not guaranteed character-exact;
the numeric functional strings (E-values, kb distances, score cutoffs, scoring constants) were
cross-checked across two independent fetches and returned identical values. Figure equations (the
DP recurrence and the expected-occurrences formula) are rendered as images in the source and were
NOT transcribable — captured here only structurally. Treat exact equation forms as `[GAP: verify
against PDF]` if needed downstream.

## 3. Thesis
A γ (gamma) whole-genome triplication (paleo-hexaploidy) occurred in a common ancestor of the core
eudicots, and it is recoverable by aligning multiple angiosperm gene maps and reading off the
conserved syntenic multiplicity (depth) of aligned ancestral loci.

## 4. Problem & context
Ancient polyploidy events are obscured by gene loss and rearrangement, so pairwise synteny alone is
ambiguous about how many rounds of duplication a lineage carries. The paper builds a multiple
alignment of eudicot gene maps to bound the many-to-many syntenic depth of aligned loci and thereby
distinguish a triplication (γ) from later independent duplications, across four sequenced eudicots
(*Arabidopsis*, *Carica papaya*, *Populus trichocarpa*, *Vitis vinifera*) plus rice as an outgroup.

## 5. Method / approach (MCscan)
BLAST → pairwise collinear blocks (DP) → multiple alignment by progressive stacking → depth
counting.

- **Homology input.** Each genome compared against itself and others with **BLASTP**, retrieving
  the **best five hits** meeting an **E-value threshold of 1 × 10⁻⁵**.
- **Tandem collapse.** **Tandem matches <50 kb apart are collapsed**, keeping a representative pair
  with the smallest BLASTP E-value. (Source notes this did not purge every tandem; a few
  long-distance tandems remained. It frames the 50-kb value as a trade-off — raising it would remove
  some genuine intra-chromosomal WGD duplicates.)
- **Chaining into collinear blocks (pairwise).** Gene pairs are chained by **dynamic programming**.
  The **default (configurable) scoring scheme** is: **match score = min(log10 E, 50)** per gene pair,
  and a **−1 gap penalty for each 10-kb distance** between two consecutive gene pairs. (The explicit
  DP recurrence is a figure equation, not transcribed.)
- **Block reporting cutoff.** **All pairwise segments with scores above 300 are reported.**
- **Statistical significance.** An expected-number-of-occurrences model estimates how often a
  collinearity pattern arises by chance, as a function of the number of matching gene pairs (N), the
  number of collinear gene pairs (m), and the lengths (L1, L2) of the two regions; the expectation is
  **multiplied by 2** for the two possible relative orientations of two collinear segments. The
  reported pairwise alignments are **significant at E < 1 × 10⁻¹⁰**. (Full formula is a figure
  equation; not transcribed — `[GAP: exact formula]`.)
- **Multiple alignment ("multi-collinearity").** Pairwise blocks are combined by **fixing one gene
  order as reference and heuristically stacking the pairwise synteny tracks one after another**
  (threaded by the reference order, in the TBA / threaded-blockset-aligner framework). Because
  stacking order affects the result, a **refinement procedure iteratively realigns each segment**.
  Described as a top-down strategy needing only one deduction cycle (find pairwise synteny, then
  combine into a multi-way correspondence) rather than bottom-up sequential merging.
- **Downstream mapping.** For placing *Solanum* and *Musa* BAC/unigene sequences, additional
  thresholds appear: **BLASTN E < 1 × 10⁻⁶** and **BLASTX E < 1 × 10⁻⁵**.

## 6. Key claims / findings
- Syntenic **depth (multiplicity)** of an aligned locus indexes duplication history. Expected
  multiplicities under the stated event histories: ***Carica* = 3** (γ only), ***Vitis* = 3**
  (γ only), ***Populus* = 6** (γ × one additional duplication *p*), ***Arabidopsis* = 12**
  (γ, β, α — three events).
- Empirical support: **88 aligned loci in *Carica* have multiplicity 3** (only one aligned locus
  exceeded 3); **54 aligned loci in *Populus* have the expected multiplicity 6**.
- Cross-eudicot triplicated structure: aligned regions show a **1 *Carica* : 1 *Vitis* : 2 *Populus* :
  4 *Arabidopsis*** correspondence, consistent with γ predating eudicot divergence → **γ occurred in
  the common ancestor of the four species**.
- Fraction of genes returned to ancestral locations by synteny: **~61% *Arabidopsis*, 44% *Carica*,
  51% *Populus*, 46% *Vitis***; only **~14% of rice** genes placed in cross-species clusters.
- Estimated ancestral (angiosperm/eudicot) gene number varies by species from **10,149 (*Carica*)
  to 13,043 (*Populus*)**, consistent with a prior estimate of **12,000–14,000** ancestral genes.

## 7. Load-bearing statements — OWN-WORDS mode (restrictive: CSHL / Genome Research copyright)
License posture: *Genome Research* is freely readable but CSHL-copyrighted, not an open/CC license →
own-words paraphrase; only functional strings (numbers, parameter names, thresholds) reproduced
verbatim per the functional-strings exception.

- Pairwise collinear blocks are found by DP over BLASTP gene pairs; default scoring is the match
  term **min(log10 E, 50)** minus a **−1 per 10-kb** gap term, and segments scoring **>300** are
  reported.
- Homology comes from BLASTP keeping the **best five hits at E ≤ 1 × 10⁻⁵**; **tandems <50 kb** are
  collapsed to one representative (smallest E).
- Reported alignments are significant at **E < 1 × 10⁻¹⁰**; the chance model multiplies expected
  occurrences by **2** for the two segment orientations.
- Multiple alignment = fix one genome's gene order as reference, progressively stack pairwise tracks,
  then iteratively refine because stack order matters.

## 8. Stated scope, assumptions, limitations (source's own)
- The 50-kb tandem-collapse threshold is acknowledged as imperfect (residual long-distance tandems)
  and chosen as a trade-off against removing real WGD duplicates.
- Progressive-stacking result depends on the order of stacking; the refinement step is introduced
  specifically to mitigate this order dependence.
- Depth/multiplicity interpretation assumes the stated event histories per lineage (γ; γ×p for
  *Populus*; γ,β,α for *Arabidopsis*).
- Rice (monocot) recovers a much smaller synteny fraction (~14%) in the cross-species clusters,
  bounding cross-clade resolution.

## 9. Failure modes / invalidity patterns
- **Unpurged tandems inflate/distort multiplicity.** The source explicitly reports a few
  long-distance tandems survived the 50-kb collapse — a symptom is aligned loci with multiplicity
  above the expected level (e.g., the single *Carica* locus exceeding 3).
- **Stacking-order artifacts.** Multiple-alignment output can depend on progressive-stacking order;
  the refinement/iterative-realignment step is the named remedy — its absence is the failure mode.
- **Score/E-value cutoffs gate sensitivity.** Blocks below score 300, or hits above E 1 × 10⁻⁵, are
  not reported; weak/eroded ancient synteny can drop out (relevant for deep events).
- **Depth misreading.** Interpreting multiplicity without the correct per-lineage event history
  (γ vs γ×p vs γ,β,α) would misassign ploidy — the method reads depth *relative to* an assumed
  history.

## 10. What the source does NOT address (confident silences)
- **No "cscore" / "C-score" concept and no reciprocal-best-hit stringency parameter.** The strings
  "c-score", "cscore", "reciprocal", and "quota" do NOT appear anywhere in the paper (confirmed by
  targeted string search over the full text). MCscan-2008 controls stringency via the BLASTP E-value
  (1 × 10⁻⁵), the best-five-hits cap, the DP scoring scheme, and the score-300 / E<10⁻¹⁰ block
  cutoffs — NOT via a C-score.
- **No `--tandem_Nmax`-style gene-count parameter.** Tandem handling is a **distance** threshold
  (<50 kb), not a max-tandem-gene-count parameter. No `--tandem_Nmax` or equivalent named parameter
  appears.
- No command-line flag catalog, software-version pin, or config-file schema is given (this is the
  algorithm/biology paper, not a software manual).

## 11. Open questions / ambiguities
- Exact DP recurrence and exact expected-occurrences formula are figure equations not transcribable
  from the HTML relay — `[GAP: transcribe both from the PDF]`.
- Whether "best five hits" is itself configurable is not stated (scoring scheme is called
  "configurable"; the hit cap is stated as a fixed 5).

## 12. Guidance answers
1. **MCscan algorithm / chaining — yes.** BLASTP gene pairs chained by dynamic programming; default
   configurable scoring = **min(log10 E, 50)** match score per pair and **−1 gap penalty per 10-kb**
   between consecutive pairs; segments scoring **>300** reported; block significance via an
   expected-occurrences chance model (N matching pairs, m collinear pairs, region lengths L1/L2,
   ×2 for orientation), with reported alignments **significant at E < 1 × 10⁻¹⁰**. Homology from
   **BLASTP best-5 hits at E ≤ 1 × 10⁻⁵**. (Exact equation forms are figures — not transcribed.)
2. **cscore / C-score / reciprocal-best-hit stringency — ABSENT.** The strings "c-score", "cscore",
   and "reciprocal" do NOT appear anywhere in the paper. **This settles it: the skill's
   `--cscore 0.7/0.95/0.99` is JCVI-software-only, NOT Tang-2008-cited.** In 2008 MCscan, stringency
   is controlled by the E-value (1 × 10⁻⁵), best-five-hit cap, DP scoring scheme, and score-300 /
   E<10⁻¹⁰ cutoffs.
3. **Multiply-aligned gene maps / depth bounding — yes** (but the word "quota" is ABSENT — no
   "quota" algorithm here; that is later JCVI). Multiplicity/depth is read against per-lineage event
   histories: expected **3** (*Carica*, *Vitis*; γ), **6** (*Populus*; γ×p), **12** (*Arabidopsis*;
   γ,β,α); empirically **88 *Carica* loci at depth 3**, **54 *Populus* loci at depth 6**, and a
   **1:1:2:4** *Carica*:*Vitis*:*Populus*:*Arabidopsis* correspondence.
4. **Visualization — collinearity diagrams present (Fig. 2), plus phylogenetic trees (Fig. 5).** The
   paper shows gene-order collinearity glyphs (genes as glyphs with transcriptional direction; shaded
   synteny matches). It does NOT describe the karyotype/dotplot rendering tooling associated with the
   later JCVI Python port; that is `[summarizer-inferred]` as out-of-scope for THIS paper.
5. **Anchor / E-value defaults stated:** BLASTP **best-5 hits, E ≤ 1 × 10⁻⁵**; block score cutoff
   **>300**; block significance **E < 1 × 10⁻¹⁰**; tandem collapse **<50 kb**; downstream BLASTN
   **E < 1 × 10⁻⁶**, BLASTX **E < 1 × 10⁻⁵**. No minimum-anchor-COUNT (e.g. "≥5 gene pairs")
   threshold is stated — the block gate is the **score** (>300), not an anchor count.

**Functional-strings summary (verbatim facts):** cscore = **ABSENT**; `--tandem_Nmax`-like
gene-count param = **ABSENT** (tandem control is distance-based, **<50 kb**); scoring =
**min(log10 E, 50)** match, **−1 per 10-kb** gap; block cutoff **score >300**; homology
**BLASTP best-5, E ≤ 1 × 10⁻⁵**; significance **E < 1 × 10⁻¹⁰**.
