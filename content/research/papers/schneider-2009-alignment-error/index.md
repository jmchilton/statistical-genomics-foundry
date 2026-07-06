---
title: "Estimates of positive Darwinian selection are inflated by errors in sequencing, annotation, and alignment"
type: paper
source_id: schneider-2009-alignment-error
source_url: https://europepmc.org/article/MED/20333182
doi: 10.1093/gbe/evp012
access_date: "2026-07-05"
license: LicenseRef-CC-BY-NC-2.5
attribution: "Schneider A, Souvorov A, Sabath N, Landan G, Gonnet GH, Graur D. Genome Biology and Evolution 1:114-118, 2009. DOI 10.1093/gbe/evp012. PMID 20333182; PMCID PMC2817407. Full text read via Europe PMC fullTextXML; open access under the Creative Commons Attribution Non-Commercial License (CC BY-NC 2.5), permitting short verbatim quotes."
derived: license-aware-summary
---

# Schneider et al. 2009 — Estimates of positive selection inflated by sequencing/annotation/alignment errors

## 1. Citation
Schneider A, Souvorov A, Sabath N, Landan G, Gonnet GH, Graur D. 2009. "Estimates of positive
Darwinian selection are inflated by errors in sequencing, annotation, and alignment." *Genome
Biology and Evolution* 1:114–118. DOI: 10.1093/gbe/evp012. PMID 20333182; PMCID PMC2817407.
Open access, Creative Commons Attribution Non-Commercial License (CC BY-NC 2.5).
Full text: https://europepmc.org/article/MED/20333182 (Europe PMC).
Access date: 2026-07-05.

## 2. Access note
Full text read (Europe PMC fullTextXML, PMC2817407): abstract, all body sections (Introduction,
Data and Methods, Results with Tables 1–4, Discussion), and reference list. Supplementary
alignments were not retrieved. No paywall boundary encountered.

## 3. Thesis
Errors in sequencing, annotation, and alignment inflate inferred rates of positive Darwinian
selection, so some published estimates of the prevalence of positively selected genes (PSGs)
may be too high and should be treated with caution.

## 4. Problem & context
Published estimates of the proportion of PSGs vary enormously — for human alone the source lists
0.02%, 0.07%, 1.1%, 1.5%, 5.2%, and 8.7% across six studies (a "435-fold range"), and cites a
claim of positive selection in 77% of vertebrate genes (Studer et al. 2008) and a claim that the
chimpanzee PSG fraction is nearly twice the human one (Bakewell et al. 2007). The dN/dS
(nonsynonymous/synonymous) excess is the standard positive-selection signal. The authors ask
quantitatively how much of this variation is an artifact of data-quality errors.

## 5. Method / approach
- **Data:** 7 eutherian mammals (human, chimpanzee, macaque, dog, cow, rat, mouse) from Ensembl,
  converted to Darwin database format. Assembly/build versions recorded per species (e.g. NCBI 36
  for human, PanTro2.1 chimp, Mmul 1.0 macaque, CanFam 2.0 dog, Btau 3.0 cow, RGSC 3.4 rat, NCBI
  m36 mouse). Species chosen because their phylogenetic position is unambiguous.
- **Orthologs:** from OMA (Orthologs Matrix project); 9,942 OMA groups initially. Exclusions:
  1,227 groups with a CDS < 200 codons; 5,089 groups where the longest sequence was > 5% longer
  than the shortest; 6 groups where a CDS had > 1% of bases missing/unknown. Proteins aligned with
  the Darwin multiple sequence alignment package; coding DNA mapped back onto aligned amino acids
  to build **codon-wise alignments** of the CDSs.
- **Selection inference:** CODEML from PAML v3.14b. Branch lengths and per-branch dN, dS estimated
  with codon frequencies from the F3×4 model, one dN/dS per branch fixed across sites (`model = 1`,
  `NSsites = 0`). 758 groups had at least one zero-length branch and were excluded → **final data
  set 2,980 orthologous trees.** PSGs identified with the improved **branch-site model** ("test 2"
  from Zhang et al. 2005, under "model A"): null allows sites with ω < 1 and ω = 1; alternative
  allows ω > 1 on an a priori foreground branch. Each of the 7 terminal branches run as foreground
  separately, all others background. Per PAML recommendation, CODEML run 3× for the null and 3× per
  alternative with initial branches randomized to 0.8–1.2× prior estimates; highest likelihood kept
  for the likelihood ratio test (LRT). Multiple-testing: **Rom (1990) correction, false discovery
  rate 5%**; other corrections said to give essentially the same results.
- **Three quality axes (each binarized):**
  - *Sequencing coverage:* each CDS BLASTed against its species trace archive (Trace Archive),
    only hits ≥ 95% identity counted; coverage = number of trace hits overlapping each position.
    Split into "all sequence covered ≥ 3×" vs. "parts covered < 3×." **Human trace data were not
    kept, so human is excluded from the coverage analysis.**
  - *Alignment quality:* Heads-or-Tails (HoT) algorithm (Landan & Graur 2007) — realign the
    sequences in reversed residue order; agreement between head and tail alignments measures
    reliability. Split into unambiguous (**100% head/tail agreement**) vs. ambiguous (< 100%).
  - *Annotation certainty:* Ensembl "known" genes (from manually curated UniProt/Swiss-Prot,
    RefSeq, TrEMBL) vs. "novel"/"inferred" genes (evidence from related species).
- **"All good" vs. "all bad":** genes high on all three axes (high coverage, known, 100% HoT) vs.
  genes deficient on all three, compared directly (Table 4).

## 6. Key claims / findings (pooled figures unless noted)
- **Coverage (Table 1):** PSG fraction in poorly covered (< 3×) sequences is **3.3× higher** than
  in well-covered (≥ 3×) — pooled 17.5% (1,546/8,852) vs. 5.3% (477/9,028); P(χ²) = 2.3 × 10⁻¹⁶⁶.
  Effect significant in every species tested.
- **Annotation (Table 2):** PSG fraction in "inferred"/novel genes **1.9× higher** than in "known"
  genes — pooled 14.6% (969/6,649) vs. 7.6% (1,080/14,148); P = 1.4 × 10⁻⁶¹. One exception:
  chimp went in the opposite direction (known 5.3% > inferred 2.5%, P = 0.0031).
- **Alignment / HoT (Table 3):** PSG fraction in ambiguously aligned (HoT < 100%) genes **1.6×
  higher** than perfectly aligned — pooled 15.6% (191/1,225) vs. 9.5% (1,858/19,635);
  P = 8.2 × 10⁻¹³. (HoT scores the whole MSA, so ambiguous/unambiguous counts are identical across
  species: 175 ambiguous, 2,805 unambiguous per species.)
- **Combined (Table 4):** PSG fraction in "all bad" genes **7.3× higher** than "all good"
  (Discussion; abstract states **7.2×**) — pooled all-bad 27.5% (88/320) vs. all-good 3.8%
  (348/9,186); P = 2.4 × 10⁻⁹⁰. Mouse had no "all bad" genes.
- **Raw inferred PSG range across all genes:** 0.9% (human) through 17.5% (macaque) to 23.3% (dog)
  (abstract). Filtering to good-quality genes collapses this: macaque drops from **17.5% to 2.0%**
  (Discussion; ~an order of magnitude).
- **Branch-length correlation:** strong positive correlation between inferred PSG fraction and
  branch length — r = 0.67 (P = 0.098) using all genes; r = 0.79 (P = 0.053) using only good
  genes. Read as evidence of residual dS (synonymous-rate) underestimation from saturation. Example
  dog–cow pairwise: 7.3% of genes had dS > 0.7, 13.7% had dS > 0.6, 26.0% had dS > 0.5.

## 7. Load-bearing statements (verbatim — permissive license, CC BY-NC 2.5)
1. (Mechanism, Introduction) "Because errors in sequencing, annotation, and alignment are
   unaffected by codon position and subsequent effect on the amino acid sequence, they are equally
   likely to affect synonymous as nonsynonymous sites."
2. (Mechanism, Introduction) "errors that equally affect synonymous and nonsynonymous sites add a
   noise component to dN/dS = 1. Although low levels of such 'neutral' noise will not generally
   raise the overall ratio above 1, estimation models that allow for several categories of sites
   may detect the noise component as a separate category. Consequently, such models will inflate
   the fraction of inferred PSGs within a genome."
3. (Combined effect, Abstract) "The inferred fraction of PSGs in sequences that are deficient in
   all three criteria of coverage, annotation, and alignment is 7.2 times higher than that in
   genes with high trace sequencing coverage, 'known' annotation status, and perfect alignment
   scores."
4. (HoT definition, Methods) "this methodology is based upon the a priori expectation that
   sequence alignment results should be independent of the orientation of the input sequences.
   Thus, for totally unambiguous cases, reversing residue order prior to alignment should yield an
   exact reversed alignment of that obtained by using the unreversed sequences."
5. (Conclusion) "We conclude that estimates on the prevalence of positive Darwinian selection may
   be inflated and should be treated with caution."

## 8. Stated scope, assumptions, limitations (authors' own)
- The three factors are **not independent** — "their effects are not cumulative" — but all push in
  the same direction (inflation).
- Authors name additional inflation sources they did not fully control: "purifying selection on
  synonymous sites or failure to identify orthology correctly."
- Residual dS underestimation from saturation persists "despite the use of sophisticated methods
  to compensate for saturation," implying their good-gene estimates may still be somewhat inflated.
- Analysis restricted to 7 eutherian mammals with unambiguous phylogeny; adding taxa deemed
  "phylogenetically contentious." Human excluded from coverage axis (no trace data kept).
- Quality axes binarized (≥3× vs <3×; 100% vs <100% HoT; known vs inferred); 95% BLAST-identity
  threshold — authors say alternative thresholds did not change conclusions ("data not shown").

## 9. Failure modes / invalidity patterns
- **Data-quality errors masquerade as positive selection.** Low sequencing coverage (< 3× trace),
  novel/inferred (vs. known) annotation, and ambiguous alignment each independently and jointly
  raise the inferred PSG fraction; combined they inflate it ~7×. The failure is specific to
  **site/branch-site models with multiple ω categories**, which pick up quality-error noise sitting
  at dN/dS ≈ 1 as a spurious positive-selection category.
- **Named diagnostics (detectors) the source uses:**
  - Alignment: **HoT score < 100%** (head/tail disagreement) flags ambiguous alignment.
  - Sequencing: trace coverage **< 3×** (BLAST identity ≥ 95%) flags poor sequence quality.
  - Annotation: Ensembl **"novel"/"inferred"** status (vs. "known") flags lower-confidence genes.
  - dS saturation symptom: high PSG–branch-length correlation and inflated pairwise dS (e.g. dS >
    0.5–0.7 in a nontrivial fraction of dog–cow genes) signal underestimated synonymous rates and
    hence inflated dN/dS.
- **Zero-length branches** make a tree unusable for ratio calculation (758 groups excluded on this
  basis) — a mechanical invalidity condition for per-branch dN/dS.

## 10. What the source does NOT address (confident silences)
- **No aligner comparison.** A single aligner (the Darwin MSA package) is used; alignment quality
  is assessed post hoc via HoT. The paper does not benchmark aligners against each other and does
  not name a "worst" aligner — it partitions genes by HoT ambiguity, not by which program produced
  the alignment.
- Does not prescribe a specific corrective tool/pipeline; it demonstrates that quality-filtering
  reduces spurious PSGs rather than recommending one named fix.
- Does not analyze non-mammalian taxa, does not vary the substitution/codon model, and does not
  quantify the individual contribution of sequencing-error mechanisms at the base level.
- No treatment of alignment-error effects on methods other than dN/dS codon models.

## 11. Open questions / ambiguities the source leaves unresolved
- Because the three factors are non-independent and "not cumulative," the marginal contribution of
  each (esp. alignment alone) to the combined 7× inflation is not decomposed.
- The good-gene estimates may still be inflated by unaddressed dS saturation; the true PSG fraction
  is bounded but not pinned.
- Whether the same inflation magnitudes hold for other selection tests, other clades, or other
  aligners is left open.

## 12. Guidance answers
- **Mechanism (in the paper's terms):** Sequencing/annotation/alignment errors are independent of
  codon position, so they hit synonymous and nonsynonymous sites equally, adding "noise" centered
  at dN/dS = 1. This noise does not by itself push the overall ratio above 1, but multi-category
  site models (branch-site / site models) can classify the noise as a separate site category with
  ω > 1, thereby inflating the inferred PSG fraction. (Verbatim: §7 quotes 1–2.)
- **Quantified false-positive rate attributable to alignment error, and worst
  aligners/conditions:** For alignment specifically (HoT axis, Table 3), ambiguously aligned genes
  show a PSG fraction **1.6× higher** than perfectly aligned genes (pooled 15.6% vs. 9.5%,
  P = 8.2 × 10⁻¹³). Combined with poor coverage and inferred annotation, the "all bad" vs. "all
  good" inflation is **7.2× (abstract) / 7.3× (Discussion)**, pooled 27.5% vs. 3.8%. The paper does
  **not** compare aligners or name a worst aligner — it uses one aligner (Darwin MSA) and flags
  ambiguity via HoT, so "which aligner was worst" is unanswered by this source (confident silence,
  §10).
- **Recommended fix (quote):** The paper does not endorse a single tool. Its remedy is
  quality-filtering before/around codon-model inference — restricting to well-covered, "known"-
  annotated, unambiguously aligned genes (HoT = 100%) — plus interpretive caution. Closing
  recommendation, verbatim: "We conclude that estimates on the prevalence of positive Darwinian
  selection may be inflated and should be treated with caution." (§7 quote 5.) It uses HoT as the
  alignment-reliability check and codon-wise (codon-aware) alignment in its own pipeline, but does
  not prescribe codon-aware alignment as *the* named fix.
- **License / must-quote:** Confirmed CC BY-NC 2.5 (open access) from the article permissions
  statement — permissive mode; short verbatim load-bearing quotes used in §7 with locations.
