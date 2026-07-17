---
title: "PPanGGOLiN: Depicting microbial diversity via a partitioned pangenome graph"
type: paper
source_id: gautreau-2020-ppanggolin
source_url: https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1007732
doi: 10.1371/journal.pcbi.1007732
version: "PPanGGOLiN 1.0"
access_date: "2026-07-05"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Gautreau G, Bazin A, Gachet M, Planel R, Burlot L, Dubois M, Perrin A, Medigue C, Calteau A, Cruveiller S, Matias C, Ambroise C, Rocha EPC, Vallenet D. PPanGGOLiN: Depicting microbial diversity via a partitioned pangenome graph. PLoS Computational Biology 16(3):e1007732, 2020. DOI 10.1371/journal.pcbi.1007732."
derived: license-aware-summary
tags:
  - domain/pangenomics
---

# Gautreau et al. 2020 — PPanGGOLiN

## 1. Citation
Gautreau G, Bazin A, Gachet M, Planel R, Burlot L, Dubois M, Perrin A, Médigue C, Calteau A,
Cruveiller S, Matias C, Ambroise C, Rocha EPC, Vallenet D. 2020. "PPanGGOLiN: Depicting microbial
diversity via a partitioned pangenome graph." *PLoS Computational Biology* 16(3):e1007732.
DOI: 10.1371/journal.pcbi.1007732. Published March 19, 2020.
Open access: https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1007732
Software: https://github.com/labgem/PPanGGOLiN (CeCILL license). Software version described: **1.0**.
License of paper: **CC BY 4.0** → verbatim load-bearing quotes permitted (see §7).

## 2. Access note
Full text read via web fetch of the open-access PLOS HTML article. No paywall boundary. Extraction
targeted the guidance questions (partition model, class definitions, %-band vs statistical
classification, clustering defaults, input format, scaling). Some fine-grained CLI/subcommand detail
was NOT sought exhaustively — see §10 and §12.

## 3. Thesis (1 sentence)
PPanGGOLiN partitions pangenome gene families into persistent / shell / cloud classes using a
multivariate Bernoulli Mixture Model coupled to a hidden Markov Random Field over a pangenome graph —
a multivariate statistical model that infers both the partitions and the optimal number of classes,
rather than applying a fixed frequency threshold.

## 4. Problem & context
Comparative-genomics classification of gene families "in terms of occurrence in a given species"
(abstract) usually "lack[s] multivariate statistical models to infer the partitions and the optimal
number of classes and don't account for genome organization" (abstract). Prior tools split the
pangenome by **frequency thresholds** — the persistent genome "is also called the soft core, the
extended core or the stabilome. These definitions advocate for the use of a threshold frequency of a
gene family within a species above which it is considered as de facto core gene" (Introduction). The
soft-core threshold "is very often used in pangenomic studies probably because it is the default
parameter in Roary which is to date the most cited software to build bacterial pangenomes" (Results).
Pangenome studies "now rel[y] on the comparison of hundreds to thousands of genomes of a single
species."

## 5. Method / approach
- **Pangenome graph**: "nodes correspond to gene families and the edges to genetic contiguity (i.e.
  genes that are direct neighbors in a genome). Two nodes are connected if the corresponding gene
  families contain at least one pair of genes that are adjacent in a genome" (Methods).
- **Gene clustering**: uses **MMseqs2 (version 8-fac81)** with parameters "coverage = 80% with
  cov-mode = 0, minimal amino acid sequence identity = 80%" and "cluster-mode = 0". (Presented as the
  parameters used in their analysis, not explicitly labeled a locked "default vs optional" flag set —
  see §12 Q4.)
- **Partitioning model**: the presence/absence (P/A) matrix "is modeled by a multivariate Bernoulli
  Mixture Model (BMM). Its parameters are estimated via an Expectation-Maximization (EM) algorithm
  taking into account the constraints imposed by the MRF." The MRF: "This is achieved by a hidden
  Markov Random Field (MRF) whose network is given by the pangenome graph." So classification jointly
  uses P/A patterns AND graph topology.
- **Choosing K (number of partitions)**: "the algorithm runs multiple partitionings with increasing
  values of K" and the **Integrated Completed Likelihood (ICL)** is computed for each K; "the best
  number of partitions is selected as K̂ where δICL is a sufficiently small margin to avoid choosing a
  too high K value."
- **Reduction to 3 named classes**: "even if the number of partitions (K) is estimated to be equal to
  3 (persistent, shell, cloud) in most cases … more partitions can be used if the pangenome matrix
  contains several contrasted patterns of P/A." Mapping: "Two of the partitions will correspond to the
  persistent and cloud genome and a number of K − 2 partitions will correspond to the shell genome."
- **Input**: "Users can also provide their own annotations (GFF3 or GBFF format) and gene families";
  otherwise PPanGGOLiN annotates with Prodigal, Aragorn, and Infernal.
- **Minimum genomes**: recommends a minimum (15 genomes in context) — "This is the minimal number of
  genomes we recommend to ensure a relevant partitioning."
- **Scale of validation**: applied to "439 species pangenomes" (GenBank, "136 287 genomes") plus
  metagenome-derived data ("583 species … 698 SGBs and 71 766 MAGs").

## 6. Key claims / findings
- Classification is NOT frequency-threshold based: "Unlike these three methods, PPanGGOLiN is not
  based on frequencies but combines both the patterns of occurrence of gene families and the pangenome
  graph topology to perform the classification."
- The three classes: "(1) persistent genome, for the gene families present in almost all genomes;
  (2) shell genome, for gene families present at intermediate frequencies in the species; (3) cloud
  genome, for gene families present at low frequency in the species."
- K is inferred (via ICL), usually 3 but can be >3; extra partitions fold into the shell.
- Persistent genome captured by PPanGGOLiN is larger than the soft-core: "the number of persistent
  gene families is greater than or equal to the soft core with an average of 11% (SD = 9%) of
  additional families."
- Soft-core threshold is unstable for many species: "32 species have a γ-tendency above 0.025,
  suggesting that the size of the persistent genome is not stabilized and tends to be underestimated."
- Rationale against pure-frequency partitioning: "even if it was possible to determine the best
  threshold for each species it would still not take into account that some persistent gene families
  may have atypically low frequency."
- Shell interpretation: "the shell genome is a key element to understand genome dynamics, presumably
  because it reflects how genes present at intermediate frequencies drive adaptation of species."
- Clustering tool + params: MMseqs2 8-fac81, 80% identity, 80% coverage, cov-mode 0, cluster-mode 0.

## 7. Load-bearing statements (VERBATIM — CC BY 4.0 permits reproduction; each with location)
1. (Abstract) "Our method, named PPanGGOLiN, partitions nodes using an Expectation-Maximization
   algorithm based on multivariate Bernoulli Mixture Model coupled with a Markov Random Field. This
   approach takes into account the topology of the graph and the presence/absence of genes in
   pangenomes to classify gene families into persistent, cloud, and one or several shell partitions."
2. (Overview) "This is achieved by a hidden Markov Random Field (MRF) whose network is given by the
   pangenome graph."
3. (Introduction, class defs) "the pangenome can be split into 3 classes: (1) persistent genome, for
   the gene families present in almost all genomes; (2) shell genome, for gene families present at
   intermediate frequencies in the species; (3) cloud genome, for gene families present at low
   frequency in the species."
4. (Overview/Results) "Unlike these three methods, PPanGGOLiN is not based on frequencies but combines
   both the patterns of occurrence of gene families and the pangenome graph topology to perform the
   classification."
5. (Results) "even if the number of partitions (K) is estimated to be equal to 3 (persistent, shell,
   cloud) in most cases … more partitions can be used if the pangenome matrix contains several
   contrasted patterns of P/A."

Functional strings (verbatim, any license): `coverage = 80% with cov-mode = 0`, `minimal amino acid
sequence identity = 80%`, `cluster-mode = 0`, MMseqs2 `version 8-fac81`, input formats `GFF3 or GBFF`.

## 8. Stated scope, assumptions, limitations (source's own caveats)
- Recommends a minimum number of genomes (15 in context) "to ensure a relevant partitioning" — i.e.
  the statistical partition is not reliable on very few genomes.
- K is chosen by ICL with a δICL margin to avoid over-selecting K.
- Method assumes a meaningful pangenome graph (genetic-contiguity edges) exists; partitioning uses
  graph topology, so contiguity information matters.
- Described version is 1.0.

## 9. Failure modes / invalidity patterns
- **Too few genomes** → unreliable partition; below the recommended minimum (15 in context) the
  partitioning may not be "relevant."
- **Frequency-threshold framing (the thing PPanGGOLiN avoids)** underestimates the persistent genome:
  soft core is often not stabilized (γ-tendency > 0.025 for 32 species) and misses persistent families
  with "atypically low frequency." [This is the source's critique of the %-band approach, not a
  PPanGGOLiN failure mode.]
- **Contrasted P/A patterns** can drive K > 3; treating output as strictly 3 classes when K̂ > 3 would
  collapse distinct shell sub-partitions.

## 10. What the source does NOT address (confident silences)
- Does NOT describe a modern `ppanggolin all` / `ppanggolin workflow` subcommand CLI with an
  annotation-TSV-vs-FASTA-list input contract (that CLI/subcommand structure postdates version 1.0).
  The v1.0 paper describes inputs as annotated genomes (GFF3/GBFF) + optionally user gene families, or
  built-in annotation via Prodigal/Aragorn/Infernal.
- Does NOT report `--identity` / `--coverage` CLI flag names; it reports the MMseqs2 parameter values
  used (80% / 80%), not PPanGGOLiN command-line flag spellings.
- Does NOT give an explicit head-to-head runtime/memory scaling benchmark vs Roary or Panaroo with
  numbers; Roary is cited as the most-used tool and as the source of the common soft-core default, and
  the validation scale (136,287 genomes across 439 species) is reported, but no "faster/handles more
  than Roary" quantitative comparison is made. Panaroo not mentioned. (Panaroo, Tonkin-Hill 2020,
  postdates or is contemporaneous.)

## 11. Open questions / ambiguities
- Exact numeric minimum-genome recommendation: text says "This is the minimal number of genomes we
  recommend"; 15 appears as the value in context but the isolated method sentence does not restate the
  integer — treat "15" as the paper's value, confirm exact figure if load-bearing. [summarizer-inferred
  that the referenced number is 15 based on surrounding context.]
- Whether the 80%/80% MMseqs2 settings are hard defaults of the tool or study-specific choices is not
  explicitly framed as "default" in the text (see §12 Q4).

## 12. Guidance answers
**Q1 — partition model / "HMM partition" claim under test.** NOT a hidden Markov *model*. It is a
**multivariate Bernoulli Mixture Model (BMM)** fit by **Expectation-Maximization (EM)**, coupled with
a **hidden Markov Random Field (MRF)** whose network is the pangenome graph. Verbatim (Abstract):
"partitions nodes using an Expectation-Maximization algorithm based on multivariate Bernoulli Mixture
Model coupled with a Markov Random Field." And (Overview): "This is achieved by a hidden Markov Random
Field (MRF) whose network is given by the pangenome graph." → An "HMM partition" characterization is
**wrong**; the correct terms are BMM + EM + Markov Random Field (MRF).

**Q2 — class names / definitions.** persistent / shell / cloud. Verbatim: "(1) persistent genome, for
the gene families present in almost all genomes; (2) shell genome, for gene families present at
intermediate frequencies in the species; (3) cloud genome, for gene families present at low frequency
in the species" (Introduction).

**Q3 — CRITICAL: fixed %-band vs statistical.** PPanGGOLiN does **NOT** use a fixed percent-of-genomes
band. Verbatim: "Unlike these three methods, PPanGGOLiN is not based on frequencies but combines both
the patterns of occurrence of gene families and the pangenome graph topology to perform the
classification." The paper explicitly critiques threshold approaches (soft core / Roary default). A
claim that PPanGGOLiN uses "shell 5–95%" or similar fixed bands is a **mis-attribution** of a
Tettelin/Roary-style frequency rule; PPanGGOLiN infers membership statistically (BMM+MRF via EM), with
K selected by ICL.

**Q4 — clustering defaults (identity/coverage) + flag names.** Values used: "minimal amino acid
sequence identity = 80%", "coverage = 80% with cov-mode = 0", "cluster-mode = 0", via MMseqs2 version
8-fac81. The paper reports these as parameter *values*; it does NOT give PPanGGOLiN CLI flag spellings
(e.g. `--identity` / `--coverage`) — those are not in the v1.0 paper.

**Q5 — subcommand input format (`ppanggolin all`/`workflow`).** NOT answered at the subcommand/CLI
level. The paper predates that CLI vocabulary (v1.0). Input described as: user-provided annotations in
"GFF3 or GBFF format" (plus optionally user gene families), or built-in annotation (Prodigal, Aragorn,
Infernal). No annotation-TSV-vs-FASTA-list contract stated.

**Q6 — scaling vs Roary/Panaroo.** Not answered as a quantitative benchmark. Roary is cited only as
"the most cited software to build bacterial pangenomes" and source of the common soft-core default. No
speed/memory/genome-count superiority claim vs Roary is quoted; Panaroo is not mentioned. Validation
scale reported: "439 species pangenomes" / "136 287 genomes" (GenBank) and "583 species … 698 SGBs and
71 766 MAGs" (metagenomes).

**Version pin note.** Paper describes PPanGGOLiN **version 1.0** (March 2020). The skill pins 2.2.0+;
CLI subcommands (`all`, `workflow`) and flag names for that version are NOT covered by this source and
must be sourced from PPanGGOLiN docs, not this paper.
