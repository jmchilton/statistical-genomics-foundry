---
title: "Integrating gene annotation with orthology inference at scale"
type: paper
source_id: kirilenko-2023-toga
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC10193443/
doi: 10.1126/science.abn3107
access_date: "2026-07-03"
license: LicenseRef-all-rights-reserved
attribution: "Kirilenko BM, Munegowda C, Osipova E, Jebb D, Sharma V, Blumer M, Morales AE, Ahmed A-W, Kontopoulos D-G, Hilgers L, Zoonomia Consortium, Hiller M. Integrating gene annotation with orthology inference at scale. Science 380(6643):eabn3107, 2023. DOI 10.1126/science.abn3107. Read via PMC author manuscript; summarized in own words under restrictive/unverified license posture."
derived: own-words-summary
---

# Kirilenko et al. 2023 — TOGA: Integrating gene annotation with orthology inference at scale

## 1. Citation
Kirilenko BM, Munegowda C, Osipova E, Jebb D, Sharma V, Blumer M, Morales AE, Ahmed A-W,
Kontopoulos D-G, Hilgers L, Zoonomia Consortium, Hiller M. 2023. "Integrating gene annotation
with orthology inference at scale." *Science* 380(6643):eabn3107. doi:10.1126/science.abn3107.
PMID 37104600; NIHMSID NIHMS1898035. Open access via PMC10193443
(https://pmc.ncbi.nlm.nih.gov/articles/PMC10193443/). Access date 2026-07-03.

## 2. Access note
Read via the PMC author-manuscript HTML (PMC10193443). Copyright/license posture:
**restrictive / not-verified** (PMC author manuscript under NLM access terms; no explicit open
license such as CC-BY stated in the excerpt) → §7 rendered as **own-words paraphrase**;
functional strings (thresholds, format names, tool/function names, category labels) reproduced
verbatim as facts. Extraction was from the main-text HTML via a summarization pass; I did not
separately page through the PDF supplementary materials, so a few supplement-only numeric
thresholds may not be captured — boundary noted where relevant.

## 3. Thesis
TOGA (Tool to infer Orthologs from Genome Alignments) jointly infers orthology and annotates
genes in a query genome by classifying, with a machine-learning model, which chains of pairwise
genome alignment represent orthologous (vs. paralogous) loci, then aligning reference coding
exons into those loci — scaling to hundreds of genomes.

## 4. Problem & context
Gene annotation and orthology inference are usually separate steps. TOGA integrates them using
the observation that orthologous genomic regions share conserved intronic and intergenic
alignment context (not just coding similarity), which distinguishes true orthologs from
paralogs and processed pseudogenes. Aimed at large-scale comparative genomics (Zoonomia and
bird datasets).

## 5. Method / approach
Pipeline ordering (as described):
1. Input: reference + query genomes (2bit), reference gene annotation (BED-12), and a **chain
   file** of co-linear local alignments. Optional U12 non-canonical splice-site info.
2. For each reference gene, find candidate overlapping alignment chains.
3. Compute ML features from chain–gene intersections.
4. **XGBoost** gradient-boosted classifier assigns each gene–chain pair an **orthology score**;
   pairs with orthology score **≥0.5** (user-adjustable) are treated as orthologous chains.
   Chains with alignment score <15,000 are not classified (user-adjustable).
5. **CESAR 2.0** (Hidden Markov model-based) aligns reference coding exons into the query
   locus, respecting reading frame and splice sites, to place exon boundaries.
6. Exon-level classification: **P** (present), **M** (missing — overlaps assembly gap),
   **D** (deleted/diverged).
7. Transcript-level classification into five categories (see §6).
8. Orthology-type inference (1:1, 1:many, many:1, many:many, 1:0) via a bipartite graph;
   weakly supported many:many edges pruned.
9. Optional gene-joining for fragments split across scaffolds in fragmented assemblies.

Recommended chain-generation protocol (TOGA authors): LASTZ with K=2400, L=3000, H=2000,
Y=9400 (default scoring matrix); axtChain with defaults except linearGap=loose; RepeatFiller
(defaults); chainCleaner with minBrokenChainScore=75000 and -doPairs.
[boundary: exact LASTZ params come from the methods/supplement region — treat as
best-effort transcription, re-check against supplement if load-bearing.]

Classifier training: two XGBoost models (multi-exon and single-exon). Trained on human–mouse
1:1 orthologs from **Ensembl Compara (Release 97)**: 20,220 positives (14,376 real + 5,844
artificially rearranged) and 20,220 negatives. 50 trees, max depth 3, learning rate 0.1.
Cross-validation accuracy: multi-exon 99.23% (±0.07%), single-exon 99.41% (±0.28%).

## 6. Key claims / findings
- **Five transcript classification categories** (the paper uses full descriptive labels, NOT
  single-letter codes): "intact", "partially intact", "missing", "uncertain loss", "lost".
  - **intact**: middle 80% of CDS present with no inactivating mutation; likely encodes a
    functional protein. (Middle 80% present; the paper elsewhere ties "intact" to no missing
    sequence in the middle 80%.)
  - **partially intact**: ≥50% of CDS present and middle 80% has no inactivating mutation; may
    encode a functional protein but weaker evidence.
  - **missing**: <50% of CDS present, middle 80% has no inactivating mutation; "undecided"
    because more than half the CDS is absent (e.g., assembly gaps).
  - **uncertain loss**: ≥1 inactivating mutation in the middle 80% of the CDS but not enough
    evidence to call full loss; may or may not encode a functional protein.
  - **lost**: unlikely to encode a functional protein — maximum percent intact reading frame
    **<60%** AND inactivating mutations in **≥2 coding exons** (for >10-exon genes: ≥20% of
    coding exons; single-exon genes: require two inactivating mutations; if one large exon is
    ≥40% of CDS, require ≥2 mutations in that exon).
- A rare additional annotation label, **"paralogous projection"**, is applied only when no
  orthologous chain is detected.
- **Middle-80% rule**: only inactivating mutations in the middle 80% of the CDS drive
  uncertain-loss/lost calls; mutations in the first/last 10% are disregarded because in
  conserved genes inactivating mutations mostly occur in the first or last 10%.
- **missing (M) vs deleted (D)**: for an absent exon, TOGA checks whether the expected query
  locus overlaps an **assembly gap (≥10 consecutive N characters)**; if so → **M (missing)**,
  otherwise → **D (deleted/diverged)**. This is the safeguard separating assembly-gap absence
  from genuine deletion.
- **Orthology relationship types**: 1:1, 1:many, many:1, many:many, and **1:0** (reference
  gene lost in query / no functional ortholog).
- **Orthology score threshold = ≥0.5** (user-adjustable). Term is "orthology score" — the paper
  does NOT call it a "posterior" or "probability." The value **0.9 does NOT appear as an
  orthology/intactness cutoff**; 0.9 appears only in graph-pruning ("Branches in set 2 with a
  score < Smin * 0.9 will be removed").
- **Feature set** (from chain–gene alignment): global CDS fraction (C/A, coding vs.
  intron+intergenic alignment), local CDS fraction (c/a, multi-exon only), local intron
  fraction (i/I, multi-exon only), flank fraction (f/20,000), synteny (log10 of overlapping
  co-linear genes), local CDS coverage (c/CDS, single-exon only). Reported importance: global
  CDS fraction most important; synteny least important.
- **Divergence scope stated as Ks, not Myr**: reliable within ~≤0.55 substitutions per neutral
  site (human→other placental mammals; chicken→other birds). Beyond ~0.6 Ks, intronic/
  intergenic alignments degrade. Marsupials/monotremes (~0.8–1.0 Ks to human) still annotate
  ~13,397 and ~10,238 orthologs respectively, mostly via conserved gene order; clade-specific
  references recommended for distant species.
- **Scale**: 488 placental-mammal assemblies (427 distinct species; human reference GENCODE
  v38, 19,464 genes; also run with mouse reference GENCODE M25, 22,257 genes) and 501 bird
  assemblies (476 distinct species; chicken reference galGal6, 18,039 RefSeq genes). Median
  orthologs: ~19,192 (apes) down to ~18,049 (distant mammals) for placental mammals with human
  reference; ~14,058 for birds.
- **Validation**: on 11,161 human genes with 1:1 Ensembl status, loss-detection specificity
  99.80–99.89% (≈21–22 false positives per species in mouse/rat/cow/dog).
- **Gene joining**: fragments split across scaffolds are recognized and joined; orthologous
  sperm-whale fragments showed 98.7% sequence identity vs. ~75% for paralogous — used to
  validate joins.

## 7. Load-bearing statements — OWN-WORDS PARAPHRASE (restrictive/unverified license)
(No verbatim prose reproduced; category labels, format names, and numeric thresholds are
functional strings kept verbatim.)
- TOGA sorts each annotated transcript into one of five states — "intact", "partially intact",
  "missing", "uncertain loss", "lost" — reflecting decreasing likelihood of encoding a
  functional protein, with "missing" set aside as undecided when >50% of the CDS is absent.
- A transcript is "lost" when its maximum percent intact reading frame is **<60%** and it
  carries inactivating mutations in at least two coding exons (scaled rules for many-exon,
  single-exon, and large-single-exon cases).
- An absent exon is called "missing (M)" rather than "deleted (D)" when its expected query
  locus overlaps an assembly gap of **≥10 consecutive N** characters.
- Only inactivating mutations located in the **middle 80%** of the CDS are allowed to trigger
  uncertain-loss/lost calls.
- TOGA treats a gene–chain pair as orthologous when the **orthology score ≥0.5** (a
  user-adjustable parameter); it ignores chains with alignment score **<15,000**.
- Evolutionary scope is expressed as neutral divergence: the method targets pairs within
  **~0.55 Ks** (human↔placental mammals; chicken↔birds).

## 8. Stated scope, assumptions, limitations
- Relies on conserved intronic/intergenic alignment context; degrades as neutral divergence
  rises (beyond ~0.6 Ks) — recommend clade-specific reference genomes for distant queries.
- Recommends annotating principal isoforms only; not a comprehensive alternative-splicing
  annotator.
- For non-mammalian/non-bird clades (turtles, fish, sea urchins, moths, plants) default
  parameters gave "encouraging" results but ML-model retraining is recommended.
- Requires a reference annotation — cannot annotate lineage-specific genes/exons absent from
  the reference.

## 9. Failure modes / invalidity patterns
- **Assembly gaps** (≥10 N) can hide exons → mitigated by the M-vs-D rule so gap-explained
  absence is "missing," not "lost."
- **Fragmented assemblies** split genes across scaffolds → mitigated by the gene-joining step;
  without it, split genes look like separate/incomplete projections.
- **Base-call errors** producing frameshifts/premature stops at exon boundaries are counted as
  inactivating mutations (TOGA does not attempt base-error correction) → can inflate loss
  calls; middle-80% rule and ≥2-exon requirement reduce single-artifact false losses.
- **High divergence** (large Ks) degrades intronic/intergenic signal, lowering orthology-call
  power and ortholog counts.
- **Processed-pseudogene compensation** and drastic exon-intron rearrangements are named
  sources of misclassification in the validation set.
- Detector/diagnostic values named: orthology score (<0.5 → not orthologous), alignment score
  (<15,000 → unclassified), percent intact reading frame (<60% → contributes to "lost"),
  assembly-gap definition (≥10 consecutive N).

## 10. What the source does NOT address
- TOGA detects **coding-capacity** loss (frame-disrupting mutations, exon/gene deletion), NOT
  **expression loss / pseudogenization without sequence inactivation**, nor regulatory/
  non-coding element loss, nor actual protein-function loss.
- Does not annotate genes absent from the reference (needs transcriptomics or ab initio
  prediction for lineage-specific loci).
- No single-letter transcript status code scheme is defined in the main text (only exon-level
  P/M/D).

## 11. Open questions / ambiguities
- Exact output **filenames** are not given in the main text; outputs are described generically
  (query annotation as BED-12; processed-pseudogene list as BED-9; orthology table; gene-status
  table; inactivating-mutations list; chain-overlap table; UCSC tracks; FASTA alignments).
  Whether files named `loss_summ_data.tsv`, `orthology_classification.tsv`,
  `query_annotation.bed/gff` exist is a property of the software/README, not stated here.
- Precise LASTZ/chain parameters and some cross-validation details sit in methods/supplement;
  transcription above is best-effort, re-check supplement if used as ground truth.

## 12. Guidance answers
- **Intactness classification / letter codes**: The paper defines FIVE transcript categories by
  full name — "intact", "partially intact", "missing", "uncertain loss", "lost" — NOT the
  letter set the skill assumes (I / PI / UL / L / M / PM). Single-letter codes appear only at
  the **exon** level: P (present), M (missing = assembly-gap-explained), D (deleted/diverged).
  "lost" vs "missing" distinction: "missing" = <50% CDS present / exon absence explained by an
  assembly gap (≥10 N), undecided; "lost" = inactivating mutations (<60% intact reading frame,
  ≥2 exons) indicating the gene is unlikely to be functional. So the skill's PM
  ("partial-missing") and its exact 6-code scheme are **not corroborated** by the paper text.
- **Orthology classification**: 1:1, 1:many, many:1, many:many, and **1:0** (loss). The skill's
  "one2one/one2many/many2one/many2many" map to these; the skill's separate "PG"
  (paralogous-projection / no-orthologous-chain) corresponds to the paper's **"paralogous
  projection"** annotation label used when no orthologous chain is found. The paper does not
  present "PG" as a formal code in the text I read.
- **Classifier**: **XGBoost** gradient boosting (two models: multi-exon, single-exon), trained
  on **human–mouse 1:1 Ensembl Compara (Release 97)** orthologs. Features: global CDS fraction,
  local CDS fraction, local intron fraction, flank fraction, synteny, local CDS coverage
  (single-exon). The decision value is an **"orthology score" with cutoff ≥0.5** (user
  adjustable). The paper does **NOT** use "posterior," and **0.9 is NOT** an orthology/intact
  cutoff (0.9 appears only in graph branch pruning: score < Smin*0.9 removed). The skill's
  "posterior > 0.9" claim is **not supported** by this source.
- **Maximum divergence**: stated as **≤0.55 Ks** (substitutions per neutral site), degrading
  beyond ~0.6 Ks. The paper gives **NO figure in Myr** — "~300 Myr" does not appear. Record the
  skill's "~300 Myr" as unsupported by this source.
- **False-loss / artifact handling**: yes — assembly gaps (M-vs-D, ≥10 N rule), fragmented
  assemblies (gene joining), middle-80% rule, ≥2-exon requirement, base-error caveat. Captured
  in §9.
- **Intactness vs pseudogenization**: yes — TOGA detects coding-capacity/frame loss, NOT
  expression loss or pseudogenization without sequence inactivation. Captured §10.
- **Input requirements**: reference+query 2bit, reference BED-12 annotation, and a **LASTZ
  chain file** (axtChain + RepeatFiller + chainCleaner recommended). **Cactus HAL / halSynteny
  is NOT used** — TOGA consumes pairwise chains. Optional U12 info. Pipeline ordering in §5.
- **Scale**: **488 mammal assemblies** (427 species) and **501 bird assemblies** (476 species)
  — both counts verified against the text. Human (GENCODE v38) / mouse (GENCODE M25) references
  for mammals; chicken (galGal6) reference for birds.
- **Output filenames (must-capture)**: NOT stated verbatim in the paper text; outputs described
  by content/format only (BED-12 query annotation, BED-9 pseudogene list, orthology table,
  gene-status table, inactivating-mutations TSV, chain-overlap table, FASTA alignments, UCSC
  tracks). The specific names `loss_summ_data.tsv`, `orthology_classification.tsv`,
  `query_annotation.bed/gff` are a README/software detail, out of scope for this paper note.
- **README operational-limits version-pin note (from guidance)**: not addressed — this note
  summarizes only the Science paper; hillerlab/TOGA README limits are a separate source.
