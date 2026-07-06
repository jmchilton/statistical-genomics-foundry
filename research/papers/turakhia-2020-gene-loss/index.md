---
title: "A fully-automated method discovers loss of mouse-lethal and human-monogenic disease genes in 58 mammals"
type: paper
source_id: turakhia-2020-gene-loss
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC7498332/
doi: 10.1093/nar/gkaa550
access_date: "2026-07-03"
license: LicenseRef-CC-BY-NC-4.0
attribution: "Turakhia Y, Chen HI, Marcovitz A, Bejerano G. A fully-automated method discovers loss of mouse-lethal and human-monogenic disease genes in 58 mammals. Nucleic Acids Research 48(16):e91, 2020. DOI 10.1093/nar/gkaa550. Read via Europe PMC/OUP open-access full text; note records CC BY-NC 4.0 posture."
derived: license-aware-summary
---

# Turakhia, Chen, Marcovitz & Bejerano 2020 — automated high-confidence gene-loss detection (NAR 48(16):e91)

> **Attribution corrected (was mis-cited upstream).** The Phase-1 research pass proposed this
> source as "Sharma & Hiller 2020, doi:10.1093/nar/gkaa562" — both wrong. The clean-context
> summarizer fetched the actual paper at NAR 48(16):e91 and found:
> - **Actual authors:** Yatish Turakhia, Heidi I. Chen, Amir Marcovitz, Gill Bejerano (Stanford).
> - **Actual DOI:** 10.1093/nar/gkaa550 (PMCID PMC7498332, PMID 32614390). The mis-cited
>   gkaa562 is a real but **unrelated** paper (Wilkinson et al., bacterial helicase, NAR 48(14):7991).
> - Directory has been renamed `turakhia-2020-gene-loss` to match. This misattribution — our own
>   Phase-1 memory-gloss, caught by the blind fetch — is itself a method-validation event; see the
>   experiment's `comparison.md`.
> - **Method note (not an error):** this paper deliberately uses *aggregate* erosion metrics
>   (Mahalanobis-distance outlier detection on fraction of AAs deleted/substituted) and explicitly
>   rejects *single-event* inactivating-mutation scoring, contrasting itself against "Sharma et al."
>   A Hiller-lab single-event method (e.g. the Sharma/TOGA-intactness lineage) would be a *separate*
>   source if the Mold needs single-event mutation scoring — it is not this paper. For the validity
>   axis (avoiding artifactual false-loss calls), this paper is a strong, faithful anchor.

## 1. Citation

Turakhia Y, Chen HI, Marcovitz A, Bejerano G. 2020. "A fully-automated method discovers loss
of mouse-lethal and human-monogenic disease genes in 58 mammals." *Nucleic Acids Research*
48(16):e91. doi:10.1093/nar/gkaa550. PMCID PMC7498332; PMID 32614390. Open Access.
Access date: 2026-07-03.

## 2. Access note

Full text read via Europe PMC full-text XML (`PMC7498332/fullTextXML`) plus the OUP landing
page. All quotes in §7 are transcribed from the Europe PMC XML body text (verbatim). Figures,
supplementary tables, and equation LaTeX were not reproducible as text; feature/threshold
values are captured from prose. No paywall boundary — full method + results readable.

License: **CC BY-NC 4.0** — verbatim: "Open Access article distributed under the terms of the
Creative Commons Attribution Non-Commercial License (http://creativecommons.org/licenses/by-nc/4.0/)."
Permissive → short verbatim load-bearing quotes used in §7 (permissive mode).

## 3. Thesis (1 sentence)

Extreme coding-sequence erosion (aggregate amino-acid deletion + substitution) in a gene's
ortholog, confirmed across at least two sister species with an outgroup retaining the intact
gene, is an automatable, high-confidence signature of true gene loss that distinguishes real
losses from missing-annotation / assembly artifacts.

## 4. Problem & context

Existing genome annotation tools annotate intact genes and "do not attempt to distinguish
nonfunctional genes from genes missing annotation due to sequencing and assembly artifacts"
(Abstract). Gene-count per genome is artifactually driven by assembly contiguity: it correlates
with assembly N50, e.g. absence of PAX6 in the dog annotation is "likely due to a sequencing
gap," and TP53 + neighbors absent from alpaca despite a region of high similarity to human TP53
(implying a missed prediction). Prior loss-annotation required heavy manual curation → doesn't
scale. Goal: fully-automated, scalable, high-confidence loss detection from a single reference
annotation + raw assemblies + phylogeny.

## 5. Method / approach

Pipeline output = **hcoErosion** = "high-confidence ortholog erosion" events. Reference: human
GRCh38/hg38, Ensembl (biomart release 86). Alignments: Jim Kent BLASTZ-based whole-genome
**pairwise** chained alignments (only pairwise used for computation; MSA views are display only).
Scope: 59 aligned mammalian species → 58 query species vs. human.

Reference gene set construction (filters, in order):
- Start 22,072 unique human protein-coding genes (Ensembl).
- Exclude un-placed / un-localized scaffold genes → 19,729.
- Exclude genes with ≥10% overlap with any segmental duplication (segdup = genomic fragment
  >1 kb with >90% identity to another fragment, from UCSC).
- Restrict to genes with a 'complete' Ensembl transcript.
- Final reference set = **17,860** unique human protein-coding genes.

Synteny-aware ortholog mapping (chain-picking), per gene per query species:
- Best chain C_b (highest alignment score / synteny) = candidate ortholog; second-best chain
  C_sb (after removing C_b) = likely paralog.
- Require C_sb alignment score **≥20× lower** than C_b (ortholog/paralog separation).
- Require **gene-in-synteny ≥ 20**, where gene-in-synteny = (length of C_b) / (length of gene)
  = aligning-block bases ≥20× the gene's own bases (synteny conservation).
- Require **unique 1-to-1 mapping**: if ≥2 reference genes map to same query locus, all
  overlapping mappings discarded.

Ortholog amino-acid sequence + artifact guards:
- Derive orthologous AA sequence per transcript from the chain alignment.
- **Exclude the first and last two amino-acid positions in each exon** (exon-boundary shift /
  alignment artifact guard).
- **Mask out** chain-alignment gaps that fall in assembly-gap regions of the query (so they are
  not mistaken for true deletions).

Erosion feature vector x = (x1, x2):
- **x1 = fraction of transcript amino acids deleted** in query vs. human ortholog.
- **x2 = fraction of non-synonymous amino-acid substitutions** in the remaining transcript vs.
  human ortholog.
- Deliberately **aggregate** features, NOT single-event features (contrast with Sharma et al.,
  who used in-frame stop codons + frameshift indels).

Outlier detection (per query species, normalizes for baseline divergence to human):
- **Mahalanobis distance (MD)** of each ortholog's (x1,x2) vs. that species' distribution
  (per-species mean vector μ and covariance S — a separate distribution per query species so
  more-distant species are normalized).
- **MD > 15** (ALL transcripts) → mark outlier / likely eroded & nonfunctional (✗).
- **MD ≤ 5** (ALL transcripts) → sequence-conserved & functional (✓).
- **5 < MD ≤ 15** → undetermined (?).

Phylogenetic filter (final, most stringent):
- A group is called hcoErosion iff **≥2 species** in it have the gene marked likely eroded (all
  transcripts MD > 15) AND **no leaf-node species** in the group has it marked sequence-conserved
  (MD ≤ 5).
- Requires an **outgroup lineage retaining the intact ortholog** (sequence-conserved) — e.g. for
  the artiodactyl PKD1L1 loss, horse/elephant retain high homology.
- Purpose: minimize confounders due to assembly artifacts, private (individual-specific)
  mutations, reference-genome biases; rejects single-species / unfixed losses.

## 6. Key claims / findings (atomic)

- Method output: **412 unique human ortholog** erosion events (hcoErosions) across **58 mammals**
  ("over 400", "affecting over 50 mammals"); 2192 unique gene-species and 539 gene-clade pairs
  [gene-species/clade counts via OUP-page extraction; see §11].
- hcoErosion gene set is **depleted** (not enriched) for:
  - mouse-lethal genes: P < 2.2e-16, fold = 8.43;
  - HGMD disease-causing genes: P < 1.3e-11, fold = 3.17;
  - RVIS-intolerant genes: P < 4.1e-24, fold = 19.94;
  - pLI-intolerant genes: P < 2.7e-35.
- Despite depletion: **10 hcoErosions** hit genes whose mouse knockouts die by early development;
  **27 hcoErosions** hit HGMD genes of severe human congenital disorders; 3 are pLI-predicted
  deleterious.
- **False-positive rate (validation vs. UniProt proteomic/transcriptomic evidence):**
  mouse **6/68 (8.82%)**, rat **2/68 (2.94%)** predictions conflicted; conservatively re-scaled
  for missing UniProt entries the FPR estimate stays **<10%** in both species.
- **Ablation:** applying the same phylogenetic filter directly to orthologs merely *lacking an
  Ensembl annotation* (instead of erosion-detected genes) gives **FPR >30%** in both species —
  quantifying the value of the chain-mapping + outlier-detection steps.
- Reference sets used: HGMD professional 16.2 (165,939 mutation entries; 4014 monogenic 'DM'
  disease genes, 3711 in reference set); 3617 mouse-lethal genes (50 MP 'lethal' phenotype terms);
  RVIS + pLI intolerance scores.

## 7. Load-bearing statements (permissive license — verbatim, CC BY-NC; location noted)

1. Artifact-cause framing (Introduction): "the annotation completeness is artifactually dependent
   on the level of assembly contiguity … absence of the critical chordate development gene PAX6 in
   the dog annotation set is likely due to a sequencing gap in the genome assembly."

2. Confounders the phylogenetic filter guards against (Results, hcoErosion overview): "requiring
   that all final candidate erosions were supported by observations from at least two closely
   related species and affected ancestral genes—in order to minimize confounders due to assembly
   artifacts, private (individual-specific) mutations, or reference genome biases."

3. Paralog exclusion + synteny thresholds (Methods, chain-picking): "we required the second-best
   chain to have an alignment score at least 20 times lower than that of the best chain. To also
   ensure high conservation of synteny, we required the number of bases in the aligning blocks of
   the best chain be at least 20 times greater than the number of bases in the gene itself—i.e.
   gene-in-synteny ≥ 20, where gene-in-synteny = length of Cb/length of gene. We also required
   unique mapping of coordinates … all overlapping mappings were discarded."

4. Exon-boundary + assembly-gap masking (Methods): "we excluded the first and last two amino acid
   positions in each exon for all downstream analyses. Gaps in chain alignments found in regions
   containing an assembly gap in the query species were masked out to avoid confusing them with
   true deletions in the query genome."

5. Aggregate vs. single-event features (Results): "Unlike Sharma et al., who used single-event
   features, such as in-frame stop codons and frameshift indels, we considered two different
   aggregate features of sequence erosion—i.e. the fraction of amino acids affected by
   substitutions and the fraction of exonic amino acids out-right deleted with respect to the
   sequence of the human ortholog. This way, we avoided making spurious outlier calls caused by
   some mutations, such as stop codons near [the end of a gene]…"

Functional strings (facts, verbatim): MD > 15 (outlier), MD ≤ 5 (conserved), 5 < MD ≤ 15
(undetermined); ≥10% segmental-duplication overlap excluded; gene-in-synteny ≥ 20; second-best
chain ≥20× lower score; first/last 2 AA per exon excluded; 17,860 reference genes; 412 hcoErosions;
FPR 8.82% / 2.94% / <10% / >30%.

## 8. Stated scope, assumptions, limitations (source's own)

- Loss = loss/dramatic alteration of *coding potential*; the paper concedes "it is nearly
  impossible to be certain that a gene locus no longer emits any kind of coding or non-coding
  transcript" — i.e. it detects coding-sequence erosion, not transcription absence. Even with an
  intact promoter / residual transcript, "the erosion of gene sequence implies that the gene does
  not maintain its original function."
- Explicitly "very conservative" / "stringent" — trades sensitivity for precision; single-species
  and non-fixed losses are dropped by design.
- Relies on aggregate erosion, so genes lost via a *single* clean early stop / small indel without
  broad downstream erosion may be missed (design tradeoff — see §5, §9).
- Requires an outgroup with a conserved ortholog and ≥2 supporting sister species → cannot call
  losses lacking such phylogenetic support.

## 9. Failure modes / invalidity patterns (referee-relevant)

Spurious-loss causes the method is explicitly built to defeat, and the guard for each:
- **Sequencing/assembly gaps** in the query → apparent deletion. Guard: mask chain-gaps that fall
  in assembly-gap regions; don't count them as deletions.
- **Missing annotation ≠ loss** (annotation completeness tracks assembly N50). Guard: work from raw
  assemblies + chain alignment, not from the query's annotation; the >30%-vs-<10% FPR ablation shows
  filtering on "no annotation" alone is unreliable.
- **Paralog mistaken for ortholog.** Guard: require best chain ≥20× the second-best score AND unique
  1-to-1 mapping.
- **Broken synteny / spurious alignment.** Guard: gene-in-synteny ≥ 20.
- **Exon-boundary shift / alignment artifact at exon ends.** Guard: drop first/last 2 AA per exon.
- **Private (individual-specific) mutations** in the one sequenced individual, and reference-genome
  bias. Guard: phylogenetic filter requires ≥2 sister species eroded + an outgroup conserved (loss
  must be fixed and ancestral).
- **Single-event false signals** — a stop codon near a gene's end, or multiple frameshift indels
  that restore frame — which single-mutation callers would flag. Guard: use aggregate erosion
  (fraction deleted + fraction substituted) via MD outlier detection rather than single events.
- Detector/symptom of a good call: ALL transcripts MD > 15 in ≥2 species, none MD ≤ 5 in the group,
  outgroup conserved. Undetermined zone (5 < MD ≤ 15) is left uncalled rather than forced.

## 10. What the source does NOT address (confident silences)

- Does not detect *non-coding* gene loss or loss-via-expression-silencing with intact coding
  sequence; scope is coding-sequence erosion only.
- Does not classify or count individual inactivating-mutation types (frameshift / premature stop /
  splice-site) as evidence — it deliberately avoids that representation, so provides no per-mutation
  taxonomy.
- Non-mammalian applicability asserted as future ("readily applicable … birds, vertebrates,
  insects") but not demonstrated here.
- No runtime/compute-cost figures given for "fully-automated" beyond the automation claim.

## 11. Open questions / ambiguities

- Two "20×" thresholds are genuinely distinct in the source (score ratio ≥20×; gene-in-synteny ≥20);
  both verbatim-confirmed, not a conflation.
- Exact per-species Mahalanobis covariance estimation (μ, S) detail was in LaTeX-heavy prose /
  equations not fully transcribable as text; the (x1,x2) feature definition and the 15/5 cutoffs are
  captured, the covariance-fitting detail is not fully recovered here.
- Gene-species (2192) and gene-clade (539) pair counts come from the OUP landing-page extraction and
  the "412 orthologs" figure from XML; the pair counts were not re-confirmed verbatim in the XML body
  grep — treat as approximate pending re-check against Results/Table.
- UniProt FPR denominators are 68 for both mouse and rat (6/68, 2/68); how the 68 predictions per
  species were selected (all vs. subset) was not fully traced.

## 12. Guidance answers

Guidance treats this as the "cardinal-sin / validity-axis anchor" for not calling a gene lost when
the signal is a technical artifact. Answers, faithful to the paper actually at e91 (Turakhia et al.):

- **Technical causes of spurious loss enumerated?** Yes. Named: sequencing/assembly gaps
  (PAX6/dog example), annotation incompleteness tracking assembly N50, assembly artifacts, private
  (individual-specific) mutations, reference-genome bias, and paralogs mis-taken for orthologs. See
  §7 quotes 1, 2, 5 and §9.
- **Exclusion filters to guard against artifacts?** Captured concretely in §5/§9 with thresholds:
  segdup ≥10% exclusion; complete-transcript requirement; ≥20× ortholog/paralog score separation;
  gene-in-synteny ≥20; unique mapping; first/last-2-AA-per-exon exclusion; assembly-gap masking;
  MD>15 (all transcripts) outlier / MD≤5 conserved; phylogenetic filter (≥2 sister species eroded +
  outgroup conserved). See §7 quotes 3, 4.
- **What counts as genuine loss / classes of inactivating mutations scored?** IMPORTANT DIVERGENCE
  from the guidance's premise: this method does NOT score discrete inactivating-mutation classes
  (frameshift / premature stop / splice-site / deletion) individually. It uses two **aggregate**
  erosion features — fraction of AAs deleted (x1) and fraction non-synonymously substituted (x2) —
  and explicitly rejects the single-event approach of "Sharma et al." (§7 quote 5). "Genuine loss"
  = extreme aggregate erosion (MD>15, all transcripts) with sister-species + outgroup phylogenetic
  support. If the project needs the single-event / inactivating-mutation taxonomy, THIS PAPER IS THE
  WRONG SOURCE — likely a genuine Sharma & Hiller method paper is intended (see header flag).
- **Validation vs. independent evidence + precision figures?** Yes, quoted: UniProt-conflict FPR
  6/68 (8.82%) mouse, 2/68 (2.94%) rat, re-scaled <10% both; ablation FPR >30% when filtering on
  missing annotation instead. §6, §7 functional strings.
- **Relationship to intactness classification / "coding capacity lost" vs other signals?** The paper
  frames loss as erosion of *coding potential* and concedes it cannot rule out residual transcription
  (§8). It predates TOGA; it is a Bejerano-lab erosion/outlier method, NOT the Hiller-lineage
  intactness-scoring method the guidance's TOGA framing implies — another reason to suspect a
  wrong-paper selection.
- **Must-capture verbatim (artifact list + exclusion filters + numeric thresholds):** delivered in
  §7 (CC BY-NC verbatim) and the functional-strings block.
