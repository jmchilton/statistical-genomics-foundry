# Denton et al. 2014 — Extensive Error in the Number of Genes Inferred from Draft Genome Assemblies

## 1. Citation
Denton JF, Lugo-Martinez J, Tucker AE, Schrider DR, Warren WC, Hahn MW. 2014. "Extensive Error
in the Number of Genes Inferred from Draft Genome Assemblies." *PLoS Computational Biology*
10(12): e1003998. DOI: 10.1371/journal.pcbi.1003998. PMC4256071.
Open access: https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1003998
License: CC BY (permissive). Access date: 2026-07-03 via PMC mirror (https://pmc.ncbi.nlm.nih.gov/articles/PMC4256071/).

## 2. Access note
Full text read via the PMC HTML mirror (abstract, results, discussion). The simulation, fosmid, and
RNA-Seq figures were verified verbatim against the PMC source (17,941 contigs → 32,025 predictions;
~20,000 extracted vs ~36,000 predictions; Table 3: 11,931 collapsed). Tables/figures were read only
as reported in prose; supplementary files not read. No paywall boundary (fully OA).

## 3. Thesis (1 sentence)
Draft genome assemblies produce extensive, systematic error in the inferred number of genes — both
adding and subtracting genes — with over 40% of gene families assigned the wrong size relative to a
higher-quality version of the same genome.

## 4. Problem & context
Sequencing produces large data volumes but assemblies built from them are often incomplete and
error-filled; those errors propagate into annotation, especially into the *count* of genes (total
gene number and copies per gene family). The paper's motivating framing: gene-number variation
between genomes is used to infer biology, yet some of that variation is an artifact of assembly, not
real evolution. Historical cautionary examples cited: the initial draft human genome contained 223
bacterial genes attributed to horizontal gene transfer that were later shown to be contaminants; and
the estimated human gene count fell steadily (from an early 30,000–40,000 range) as assemblies and
annotation improved.

## 5. Method / approach
Core design: **compare multiple draft assemblies against a higher-quality version of the SAME genome**,
so the discrepancy in gene count is a measurable error rather than a cross-species inference.

- **Chicken (main empirical system):** five assemblies compared against reference v4.0 (Galgal4),
  spanning traditional and next-generation technologies. As reported:
  - 2X fosmid-based — 281,711 contigs — 14.1% full-length CEGMA
  - 12X 454-based — 45,554 contigs — 68.2% CEGMA
  - 6.6X Ref 2.1 (Galgal3) — 71,609 contigs — 66.5% CEGMA
  - 82X Illumina-based — 27,093 contigs — 74.6% CEGMA
  - 12X Ref 4.0 reference — 25,017 contigs — 80.7% CEGMA
  Sequencing technologies used across these: Sanger (fosmid, BAC-end), 454 (fragment + 3 kb and
  20 kb mate-pair inserts), Illumina (100 bp paired-end, 2 kb inserts).
- **Chimpanzee:** published draft Pan_troglodytes-1.0 vs. the updated Pan_troglodytes-2.1.
- **Simulation (mechanism test):** simulated fragmented assemblies to isolate the cause of gene-number
  *inflation*. Genomes were broken into contigs whose lengths were drawn from the length distribution
  of a real fragmented genome (*Daphnia pulex*), then genes were predicted (GENSCAN). (Abstract frames
  this as "simulated genome assemblies of *Drosophila melanogaster*.")
- **Correction test:** RNA-Seq (paired-end) used to reconnect gene fragments split across contigs.
- Completeness quantified with **CEGMA** (Core Eukaryotic Genes Mapping Approach) — % of core
  eukaryotic genes recovered full-length. (Paper predates BUSCO; CEGMA is the completeness metric it uses.)

## 6. Key claims / findings (atomic)
- **Headline:** across the assemblies, no more than ~60% of gene families matched the reference family
  size, so **40% or more of gene families were inferred to have the wrong size** in draft assemblies.
- **Errors go BOTH directions:** incorrect assemblies both **add** and **subtract** genes (stated in
  the abstract). This bidirectionality is the load-bearing point for referee use.
- **Over-counting mechanism (dominant driver of gene-number inflation): gene FRAGMENTATION** — one real
  gene split onto multiple contigs is predicted as multiple separate genes. The simulations confirm
  fragmentation as "the major cause of increased gene numbers."
  - Simulation magnitude: at 17,941 contigs the simulated assembly yielded **32,025** GENSCAN-predicted
    genes with start+stop codons — "a handful more than are present in the published *Daphnia pulex*
    genome" — i.e. fragmentation raised the GENSCAN count from the ~20,000 predicted on the uncut
    *D. melanogaster* reference up to roughly the *Daphnia pulex* gene number.
  - Predicted gene number rose monotonically as the simulated genomes became more fragmented.
  - Chimpanzee: of gene families with incorrect counts (1,693 genes examined), **1,279 were cleaved
    genes and 414 were split alleles** — both are over-counting mechanisms (cleaved = one gene split
    across contigs; split alleles = the two haplotype alleles assembled as separate genes).
- **Under-counting mechanism: missing / incomplete genes** in the most fragmented assemblies — genes
  absent or too fragmented to be recovered, producing apparent loss.
  - The **2X fosmid assembly was a clear outlier, with more than half of all gene families missing gene
    copies relative to the reference**; only ~20,000 complete genes could be extracted from it vs.
    ~36,000 predictions in the other assemblies.
- **Chimpanzee scale:** the earlier chimp assembly predicted almost 1,800 more genes than the updated
  version; 74% of families had the same gene count in the two annotations, 26% differed.
- **Assembly-quality dependence (qualitative):** error tracks with assembly quality/completeness — the
  least contiguous / lowest-CEGMA assembly (fosmid, 14.1% CEGMA) is the extreme outlier for missing
  genes, while high fragmentation drives inflation. Average gene length in the chicken annotation is
  27.8 kb, so genes commonly exceed contig lengths and get truncated/fragmented. **The paper reports
  these relationships descriptively/categorically; it gives NO correlation or regression statistic
  tying an assembly-contiguity metric (N50, contig count, coverage) to gene-number error.** It uses
  N50 (e.g. citing *Daphnia pulex* N50 scaffold size < 400 kb) but does not define it.
- **Correction:** RNA-Seq effectively improves draft annotations, largely by connecting genes
  fragmented across contigs; almost 12,000 predicted genes were removed by combining them with other
  genes when requiring only a single RNA-Seq read as evidence (Table 3: 11,931).

## 7. Load-bearing statements — VERBATIM (CC BY permits reproduction; each with location)
1. Abstract: "We find that upwards of 40% of all gene families are inferred to have the wrong number
   of genes in draft assemblies, and that these incorrect assemblies both add and subtract genes."
2. Abstract: "Using simulated genome assemblies of *Drosophila melanogaster*, we find that the major
   cause of increased gene numbers in draft genomes is the fragmentation of genes onto multiple
   individual contigs."
3. Results: "For each assembly no more than 60% of all gene families were the same size as in the
   reference assembly, meaning that the remaining 40% or more of families were inferred to have the
   wrong size."
4. Results: "The fosmid assembly was a clear outlier, with more than half of all gene families missing
   gene copies relative to the reference."
5. Chimpanzee result: "Of these, 1,279 were cleaved genes and 414 were split alleles."
6. Discussion (the downstream-inference payoff): "The cascading effects of these errors may affect
   many downstream conclusions, from inferences about the evolutionary histories of genes to the
   ability to map genes involved in disease."
7. Discussion: "However, it is often the case that a great deal of research will be based upon the
   draft assembly before it has reached a finished state, and erroneous conclusions may result."

(Also captured, gene-family-evolution framing — verbatim: "The observed variation in gene numbers may
represent genetic diversity resulting from the evolution of gene families, but may also have been
incorrectly inferred from sequencing and assembly artifacts." And: "Variation in the number of genes
may have important consequences for understanding differences between species, especially for key
morphological, physiological, and behavioral traits.")

## 8. Stated scope, assumptions, limitations
- Scope is eukaryotic / vertebrate-anchored: empirical systems are chicken and chimpanzee, with an
  invertebrate simulation (*Drosophila*/*Daphnia*-derived fragmentation). Do not generalize beyond
  eukaryotes.
- The "error" is defined relative to a higher-quality assembly of the same genome, which is itself a
  draft (chicken v4.0), not a truly finished genome — the reference is a proxy for truth.
- Gene prediction is GENSCAN-based for simulations; annotation-pipeline differences between assembly
  versions contribute to some of the observed count differences.

## 9. Failure modes / invalidity patterns (referee-relevant)
- **Fragmented assembly → inflated gene count:** a single gene split across contig boundaries is
  predicted as ≥2 partial genes → false apparent DUPLICATION / gene-family EXPANSION. Symptom/detector:
  many short/partial gene models; families larger than in related well-assembled genomes; low
  contiguity (large gene length relative to contig/N50 length; chicken mean gene 27.8 kb).
- **Incomplete / low-coverage assembly → missing genes:** genes absent or unrecoverable → false
  apparent LOSS / gene-family CONTRACTION. Symptom/detector: low CEGMA/core-gene completeness (fosmid
  outlier at 14.1% full-length CEGMA; "more than half of all gene families missing gene copies").
- **Heterozygosity / haplotype split ("split alleles"):** the two alleles of a locus assembled as two
  separate genes → false duplication. (414 of 1,693 incorrect chimp genes.)
- **Contamination misassembled into the genome** (e.g. the 223 "horizontally transferred" bacterial
  genes in the draft human genome that were contaminants) → false gene gains.
- **General detector the paper endorses:** low assembly completeness (CEGMA) and low contiguity are
  the warning signs; RNA-Seq evidence that collapses fragments is both a corrector and a diagnostic of
  fragmentation.

## 10. What the source does NOT address (confident silences)
- No named birth-death / CAFE gene-family-size-evolution model is invoked or tested. The paper connects
  error to "the evolutionary histories of genes" and "the evolution of gene families" in general terms
  but does not run or reference a specific gene-gain/loss rate estimator (e.g. CAFE) — see §12.
- No quantitative correlation/regression between a contiguity statistic (N50/coverage/contig count)
  and gene-number error; relationships are categorical.
- No prokaryote/bacterial pangenome analysis (eukaryote-scoped).
- No explicit BUSCO threshold (predates BUSCO); uses CEGMA without prescribing a numeric completeness
  cutoff for downstream use.

## 11. Open questions / ambiguities left unresolved
- The exact split of error attributable to assembly vs. to annotation-pipeline differences across
  chicken assembly versions is not fully partitioned.
- How much the reference-as-proxy-for-truth assumption understates total error (since the reference is
  itself imperfect) is not quantified.
- No stated numeric threshold (completeness or contiguity) above which gene-count inference becomes
  "safe."

## 12. Guidance answers
- **Study design / species / references:** Confirmed. Draft assemblies compared against higher-quality
  versions of the SAME genome. Chicken: five assemblies (2X fosmid/Sanger, 12X 454, 6.6X Ref2.1/Galgal3,
  82X Illumina, 12X Ref4.0) vs. reference **v4.0 (Galgal4)**. Chimpanzee: **Pan_troglodytes-1.0 vs.
  2.1**. Technologies: Sanger (fosmid/BAC-end), 454, Illumina. "High-quality reference" = the most
  complete same-genome assembly (chicken v4.0 / chimp 2.1), itself a draft used as truth proxy.
- **Headline fraction:** **>40% of gene families have the wrong number of genes** (no more than ~60%
  match reference size). Chimp: 26% of families differ (74% match). See §7 quotes 1 and 3.
- **Both error directions:** Confirmed and load-bearing. **Over-count = gene fragmentation** (major
  driver of inflation; simulations: 17,941 contigs → **32,025** predicted genes; chimp: **1,279 cleaved
  genes**). **Under-count = missing/incomplete genes** (fosmid outlier, **>half of families missing gene
  copies**). Additional over-count mechanism: **414 split alleles** (haplotype duplication). Direction
  that dominates: for gene-number *inflation*, fragmentation dominates; the most fragmented/incomplete
  assembly (fosmid) is dominated by *missing* genes — so the direction flips with assembly regime.
- **Assembly-quality dependence + completeness metric:** Error scales with completeness/contiguity
  qualitatively; completeness metric = **CEGMA** (fosmid 14.1% → Ref4.0 80.7% full-length core genes).
  No BUSCO (predates it); **no correlation/regression statistic** provided.
- **Downstream-inference warning (the payoff):** The paper **DOES explicitly connect the error to
  evolutionary inference in general terms** — see §7 quote 6 ("cascading effects... from inferences
  about the evolutionary histories of genes...") and the gene-family framing ("...variation in gene
  numbers may represent genetic diversity resulting from the evolution of gene families, but may also
  have been incorrectly inferred from sequencing and assembly artifacts"). **BUT it does NOT name
  gene-gain/loss RATE estimation, birth-death models, or CAFE specifically.** So: the link to
  gene-family-size evolution is stated; the link to a specific birth-death/CAFE analysis is NOT. Do not
  infer the CAFE connection for the paper.
- **Recommendations:** (1) use RNA-Seq to reconnect fragmented gene models before trusting counts;
  (2) use high-quality genomes from closely related species to improve assembly/gene models;
  (3) avoid strong evolutionary conclusions from draft assemblies, which can contain large numbers of
  both added and missing genes, until the assembly is improved. No numeric completeness threshold is
  prescribed.
