# Tonkin-Hill et al. 2020 — Panaroo (prokaryotic pangenome polishing)

## 1. Citation
Tonkin-Hill G, MacAlasdair N, Ruis C, Weimann A, Horesh G, Lees JA, Gladstone RA, Lo S,
Beaudoin C, Floto RA, Frost SDW, Corander J, Bentley SD, Parkhill J. 2020. "Producing polished
prokaryotic pangenomes with the Panaroo pipeline." *Genome Biology* 21:180.
DOI 10.1186/s13059-020-02090-4. OA (CC BY 4.0).
Access URL used: PMC mirror `https://pmc.ncbi.nlm.nih.gov/articles/PMC7376924/` (the BMC/Springer
URLs redirect to an auth wall; PMC served the full text). Access date 2026-07-03.

## 2. Access note
Full text read via the PubMed Central OA mirror (BMC/Springer landing pages redirected to a
Springer auth page and could not be read directly). Body text, abstract, results narrative,
methods narrative, and figure captions were accessible. I did NOT independently render the
figures/supplementary tables; numeric values below are those reported in the article text /
captions as returned. Exact single-source consolidated default-parameter table is not present in
the paper (the paper itself notes parameters are not all listed in one place).

## 3. Thesis (1 sentence)
Automated prokaryotic genome annotation is error-prone, and those errors accumulate across a
population to massively inflate the apparent accessory genome / gene-family counts; Panaroo builds
a population-wide pangenome graph that detects and corrects these annotation errors, producing a
"polished" pangenome.

## 4. Problem & context
Population-level comparison of prokaryotic genomes must account for real gene-content variation
from horizontal gene transfer, gene duplication, and gene loss. But automated annotation is
imperfect, and the errors — from **fragmented assemblies, mis-annotation, contamination, and
mis-assembly** — accumulate over a population. A key perverse property: error count scales with
sample size, so *more genomes → more errors → more spuriously "novel" accessory genes*. This
corrupts estimates of the number of gene families in a species and downstream modeling.

## 5. Method / approach (what Panaroo does)
- **Pangenome graph.** Panaroo builds a full graphical representation of the pangenome: nodes are
  clusters of orthologous genes (COGs); an edge connects two nodes if they are adjacent on a contig
  in any sample. The graph's population-wide context is what enables error correction (a single
  isolate lacks the evidence).
- **Five correction mechanisms** (using graph context, not per-isolate calls):
  1. **Contig-end correction** — recursively removes low-support degree-1 nodes at contig breaks
     (genes mis-called near contig ends).
  2. **Contamination removal** — removes disconnected, low-support graph components (strict/default
     modes).
  3. **Mistranslation / diverse-family correction** — collapses gene-sequence duplicates with high
     nucleotide-level matching (detects erroneous over-splitting from mistranslation).
  4. **Gene-family collapsing** — merges over-split diverse families using contextual (neighboring)
     information.
  5. **Missing-gene refinding** — searches flanking sequence to recover genes the annotator missed
     or that a contig break fragmented.
- **Three operating modes:** **strict** (aggressive contamination/erroneous-annotation removal;
  recommended when rare plasmids not expected, or when phylogenetic parameters such as gene
  gain/loss rates are wanted), **sensitive** (removes no gene clusters; for recovering rare plasmids
  hard to distinguish from contamination), **default/moderate** (balance).
- **Clustering thresholds (functional strings, verbatim from Methods narrative):** initial
  clustering with **CD-HIT at a high sequence identity threshold (98%)**; gene-family collapsing at
  a **lower pairwise sequence threshold (default 70%)** for clusters sharing common neighbors;
  mistranslation correction coverage/identity **typically 95% and 99% respectively**. (Paper notes
  it does not consolidate all default numeric parameters in one section.)
- **Datasets:** 413 *M. tuberculosis* genomes; 328 *K. pneumoniae* genomes (after removing 9
  outliers); 1054 *N. gonorrhoeae* isolates; simulated datasets built from an *E. coli* reference.
- **Compared tools:** Roary, PIRATE, PanX, PPanGGoLiN, COGsoft.

## 6. Key claims / findings (atomic)
- **Errors scale with sample size.** More genomes → more accumulated annotation errors → more
  spurious accessory genes (Background).
- **Named error sources:** fragmented assemblies, mis-annotation, contamination, mis-assembly;
  genes are often mis-annotated near contig breaks; the annotation algorithm optimizing each
  isolate individually produces inconsistent gene calls across isolates (Background).
- **Simple (error-free) simulations:** PanX and Panaroo produced the fewest errors, then PIRATE,
  Roary, PPanGGoLiN, COGsoft (Results, Fig. 3a).
- **Realistic simulations (with contamination + fragmentation):** all methods *except Panaroo*
  produced nearly an order-of-magnitude higher error rates; Panaroo's sensitive mode kept error
  rates similar to those on the clean assemblies even with contamination (Results, Fig. 3b).
- **M. tuberculosis (413 genomes):** Panaroo reported the highest core genome and smallest
  accessory genome. Competing tools (PanX, PIRATE, PPanGGoLiN, COGsoft, Roary) reported inflated
  accessory genomes ranging **2584 to 3670 genes — a nearly tenfold increase** over Panaroo's.
  Of the discrepancy, **~59%** was driven by genes fragmented by the assembly and **~10%** by genes
  called inconsistently despite identical sequences (Results).
- **K. pneumoniae (328 genomes), core genome at 99%-presence threshold:** Panaroo default 3372,
  Panaroo sensitive 3376, PIRATE 3318, Roary 1800 genes. Panaroo (default and sensitive) had the
  lowest number of conflicting annotations per cluster (Results, Fig. 4b).
- **Downstream population genetics:** across 51 pneumococcal clades, estimated effective pangenome
  size correlated positively with a cluster's recombination rate (Spearman ρ = 0.53, p < 0.001) —
  offered as evidence that accurate clustering is a prerequisite for population-genetic modeling
  (Results).
- **Downstream applications enabled:** gene gain/loss rate comparison between lineages/species;
  more accurate pangenome-size inference (Discussion); pan-GWAS / sv-pan-GWAS on *N. gonorrhoeae*;
  outputs feed pyseer / Scoary for association analyses (Results).

## 7. Load-bearing statements — MODE: PERMISSIVE (CC BY 4.0 → short verbatim quotes allowed)
Each quote verbatim, with location.
- Abstract (framing the whole problem): "the automated annotation of prokaryotic genomes is
  imperfect, and errors due to fragmented assemblies, contamination, diverse gene families and
  mis-assemblies accumulate over the population, leading to profound consequences when analysing
  the set of all genes found in a species."
- Background (error → inflation, scaling with N): "Such errors can have profound implications for
  the resulting estimates of the number of gene families present, whereby a higher number [of]
  genomes leads to a higher number of errors."
- Background (downstream-modeling consequence): "Such errors can cause difficulties in any
  downstream modeling of the pangenome, such as the modeling of negative frequency-dependent
  selection (NFDS) acting through the loci in the accessory genome."
- Overview (what Panaroo does): "Panaroo corrects for errors introduced during annotation by
  collapsing diverse gene families, filtering contamination, merging fragmented gene segments and
  refinding missing genes."
- Discussion (annotation quality as prerequisite for evolutionary inference): "The higher accuracy
  obtained by Panaroo allows for the comparison of gene gain and loss rates between lineages and
  species as well as the more accurate inference of pangenome size."
- Background (the ONLY eukaryote mention — an analogy citation, NOT a Panaroo scope claim):
  "Denton et al. have shown that fragmented assemblies were the major cause of inflated gene
  numbers in draft eukaryotic genomes."

## 8. Stated scope, assumptions, limitations (source's own caveats)
- **Prokaryotes only.** Whole paper is scoped to prokaryotic/bacterial pangenomes.
- **Not for metagenomes:** "Panaroo is not recommended for metagenomic datasets."
- **Structural-variant scope:** Panaroo only calls large structural rearrangements relocating genes
  within the genome; finer-scale structural variants are better called by assembly-graph approaches
  such as Cortex.
- **Rare-plasmid trade-off:** aggressive contamination filtering can occasionally remove rare
  plasmids (hence the sensitive mode).

## 9. Failure modes / invalidity patterns (referee-relevant)
Conditions under which *uncorrected* pangenome analysis becomes misleading, and Panaroo's own risks:
- **Fragmented assemblies** → genes split across contig breaks are counted as multiple/novel genes;
  named as the largest single driver (~59% of the M. tuberculosis discrepancy). Symptom: inflated
  accessory-genome size that grows with number of genomes.
- **Inconsistent per-isolate gene calls** → identical sequences annotated differently across
  isolates create spurious accessory clusters (~10% of the M. tuberculosis discrepancy). Symptom:
  many "conflicting annotations" per COG cluster.
- **Contamination** → disconnected low-support graph components; if not removed, inflate gene count.
- **Mis-assembly / diverse gene families / mistranslation** → over-splitting of true families into
  many apparent families.
- **General diagnostic signal:** an accessory genome that inflates with sample size, or a large gap
  between tools' reported accessory sizes, indicates annotation-error inflation rather than true
  biological gene-content variation.
- **Panaroo's own failure risk:** strict-mode aggressive filtering can delete genuine rare plasmids
  (false removal) — use sensitive mode when rare mobile elements matter.

## 10. What the source does NOT address (confident silences)
- Does **not** claim its correction mechanism, or the annotation-error-inflation phenomenon as a
  driver of gene-family-size *differences*, applies to eukaryotes. The single eukaryote reference
  (Denton et al.) is cited only as prior analogous evidence that fragmented assemblies inflate gene
  counts in draft eukaryotic genomes; the paper does not extend Panaroo, or test its findings, on
  eukaryotic genomes.
- Does **not** discuss CAFE / CAFE5 or explicit gene-family birth-death models by name; "gene gain
  and loss rates" are mentioned as a downstream use, not modeled with a named birth-death tool here.
- Does not address metagenomic pangenomes (explicitly out of scope).
- Does not provide a single consolidated default-parameter reference table.

## 11. Open questions / ambiguities
- The exact numeric defaults for all modes are not consolidated in the paper text (points to the
  Panaroo docs/repo for a full parameter list).
- The paper reports downstream correlations (e.g., pangenome size vs. recombination rate) but does
  not fully quantify how residual annotation error propagates into gain/loss-rate estimates.

## 12. Guidance answers
- **Core mechanism (how annotation error inflates accessory genome):** Captured (§4, §6, §9). Named
  error sources enumerated by the paper: **fragmented assemblies, mis-annotation, contamination,
  mis-assembly** (plus diverse gene families / mistranslation causing over-splitting, and
  per-isolate inconsistent gene calls). The dominant driver of spurious size variation in their
  case study is **fragmentation** (~59%), then **inconsistent annotation of identical sequences**
  (~10%). Key property: error accumulates with the number of genomes.
- **Organism/data scope + eukaryote question (LOAD-BEARING):** The paper is scoped to
  **prokaryotic / bacterial pangenomes**. It does **NOT** claim or test that the same
  annotation-error inflation applies to eukaryotes, nor to CAFE-style birth-death models. The only
  eukaryote mention is a citation of Denton et al. as prior analogous evidence — quoted verbatim in
  §7. So the skill's assertion "same principle in eukaryotes / apply to CAFE5" is the **skill's
  inference, not this paper's claim**; this paper supports only that fragmented assemblies inflate
  gene counts (Denton et al. said so for eukaryotes; Tonkin-Hill et al. demonstrate it for
  bacteria).
- **Quantitative error-rate results / worst conditions:** Captured (§6). Realistic simulations
  (contamination + fragmentation) made all tools except Panaroo ~an order of magnitude worse;
  Panaroo sensitive mode stayed near clean-assembly error rates. M. tuberculosis: competing tools'
  accessory genomes 2584–3670 genes (~tenfold inflation vs Panaroo); 59% from fragmentation, 10%
  from inconsistent identical-sequence calls. K. pneumoniae core (99% threshold): Panaroo 3372/3376
  vs Roary 1800 vs PIRATE 3318. Worst inflation condition = fragmented + contaminated assemblies.
- **Annotation consistency as prerequisite for downstream inference:** Yes — supported. Verbatim
  Discussion quote (§7): higher Panaroo accuracy "allows for the comparison of gene gain and loss
  rates between lineages and species as well as the more accurate inference of pangenome size";
  Background: errors "can cause difficulties in any downstream modeling of the pangenome" (e.g.
  NFDS); the pangenome-size vs. recombination-rate correlation (ρ = 0.53, p < 0.001) is offered as
  validation that accurate clustering underpins population-genetic modeling.
- **Panaroo's remedy (conceptual):** Captured (§5). "Consistent annotation" operationally = using
  population-wide graph context (COG nodes + adjacency edges) so a gene's call is reconciled across
  all isolates rather than optimized per-isolate: fragments across contig breaks are merged,
  missing genes refound, contamination and mistranslation-split families collapsed — yielding a
  larger core / smaller accessory that reflects biology rather than annotation noise.
- **Must-quote items:** Both satisfied verbatim in §7 — (a) the abstract sentence stating annotation
  errors produce spurious pangenome inflation; (b) the scope boundary (prokaryotic-only framing +
  the sole eukaryote citation showing the paper does not itself generalize).
