---
title: "Linking pangenomes and metagenomes: the Prochlorococcus metapangenome"
type: paper
source_id: delmont-eren-2018-anvio-pan
source_url: https://peerj.com/articles/4320/
doi: 10.7717/peerj.4320
access_date: "2026-07-05"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Delmont TO, Eren AM. Linking pangenomes and metagenomes: the Prochlorococcus metapangenome. PeerJ 6:e4320, 2018. DOI 10.7717/peerj.4320. Summary derived from the open-access PeerJ/Europe PMC full text."
derived: license-aware-summary
tags:
  - domain/pangenomics
---

# Delmont & Eren 2018 — the *Prochlorococcus* metapangenome (anvi'o pangenomics)

## 1. Citation
Delmont TO, Eren AM. 2018. "Linking pangenomes and metagenomes: the *Prochlorococcus*
metapangenome." *PeerJ* 6:e4320. DOI 10.7717/peerj.4320.
Open access: https://peerj.com/articles/4320/ (PMC: PMC5804319).
License: **CC BY 4.0** (`https://creativecommons.org/licenses/by/4.0/`; ©2018 Delmont and Eren) —
verbatim load-bearing quotes permitted with attribution.

## 2. Access note
Full text read via Europe PMC JATS XML (`PMC5804319/fullTextXML`); PeerJ HTML and one PMC route
returned 403 / a mismatched cached article, so extraction is from the EBI full-text XML. All body
methods/results sections and the abstract were readable. Figures/tables were not parsed as images;
numeric results here come from the running text. This is the primary **pangenomics-workflow** paper
(the anvi'o pangenomic workflow "developed for this study"), distinct from the anvi'o platform paper.

## 3. Thesis (one sentence)
The authors present an integrated, reproducible anvi'o workflow to build pangenomes and analyze them
in conjunction with metagenomes — a **metapangenome** — and demonstrate it on a *Prochlorococcus*
pangenome placed against a large marine (TARA Oceans) metagenomic survey.

## 4. Problem & context
Pangenomes characterize core/accessory genes across closely related genomes by clustering genes on
sequence homology; metagenomes resolve relative distribution of genomes/genes across environments via
read recruitment. Combining them can reveal the functional basis of niche partitioning and fitness,
but "advanced software solutions are lacking." The paper supplies that integrated
analysis+visualization strategy and applies it to *Prochlorococcus*.

## 5. Method / approach (programs and exact parameters)

### Genomes & metagenomes
- **31 isolate genomes** and **74 SAGs** (single-amplified genomes, minimum length >1 Mbp) of
  *Prochlorococcus* from NCBI; **93 TARA Oceans metagenomes** from EBI.

### Read recruitment / metagenomic prep
- Quality filtering: `iu-filter-quality-minoche` from **illumina-utils v1.4.1**.
- FASTA header cleanup: anvi'o script `reformat-fasta`; concatenated 31 isolate FASTAs.
- Mapping: **Bowtie2**, default parameters plus `--no-unal`; SAM→sorted/indexed BAM via **samtools**.

### Pangenome workflow — three major steps (as stated)
1. `anvi-gen-genomes-storage` — generate an anvi'o genomes storage database (DNA + amino acid
   sequences + functional annotations per gene). Here built from the 31 isolate FASTAs using the
   `--internal-genomes` flag.
2. `anvi-pan-genome` — compute the pangenome by identifying **gene clusters**.
3. `anvi-display-pan` — display the pangenome; interactively bin gene clusters; inspect per-cluster
   gene alignments.

### `anvi-pan-genome` parameters used (verbatim flag values)
- `--use-ncbi-blast`
- `--minbit 0.5`
- `--mcl-inflation 10`

### What `anvi-pan-genome` does internally (6 sub-steps, as described)
1. all-vs-all amino-acid similarity via **blastp** (every AA sequence vs every other);
2. removes weak hits using the **minbit heuristic** (originally described in **ITEP**), filtering on
   the aligned fraction between the two sequences;
3. **MCL algorithm** identifies gene clusters from remaining blastp results;
4. computes gene-cluster occurrence across genomes and total gene counts;
5. hierarchical clustering of gene clusters (by distribution across genomes) and of genomes (by shared
   gene clusters) — **Euclidean distance and Ward clustering by default**;
6. generates an anvi'o **pan database** for downstream analysis / `anvi-display-pan`.

Definition of a gene cluster (in this study): sequences of one or more predicted ORFs grouped by
homology at the **translated DNA sequence level**; a cluster with >1 sequence may contain orthologs
and/or paralogs from one or more genomes.

### Metapangenome workflow
- `anvi-gen-samples-database` — with per-genome coverage estimates from the anvi'o profile-DB summary,
  to connect environmental distribution to the pangenome.
- `anvi-script-gen-environmental-core-summary` (default parameters) — quantify the ratio of ECGs vs
  EAGs within each gene cluster.
- `anvi-display-pan` visualizes the metapangenome; `anvi-summarize` summarizes gene clusters.

### Environmental core/accessory gene (ECG/EAG) classification
- `anvi-script-gen-distribution-of-genes-in-a-bin` with `--fraction-of-median-coverage 0.25`: sums
  per-gene coverage across all metagenomes where the population is "detected"; genes with **< 25% of
  the median coverage** of all genes in the genome are marked **EAGs** (else ECGs). Visualized with
  `anvi-interactive`.

### Phylogenomics (note: NOT ANI)
- **Phylosift v1.0.1** (default parameters): 37 marker gene families → concatenated alignment →
  **FastTree 2.1** tree; midpoint-rooted in **FigTree v1.4.3**.

### SAG analysis
- Combined 74 SAGs + 31 isolates through the same pangenome workflow; then 5 phylogenetically distant
  SAGs run through the metapangenome workflow (few-distant selection intended to minimize the dilution
  effect of competing read recruitment onto identical regions).

### Operational definitions used
- **"Population":** an agglomerate of naturally occurring cells whose genomes align to the same
  reference at high identity under the read-recruitment stringency.
- **"Detected":** a genome is detected in a metagenome only if **>50% of its nucleotide positions have
  at least 1X coverage** (to avoid false detection from non-specific recruitment).

## 6. Key claims / findings (atomic)
- Pangenome of the 31 isolates: **60,054 genes → 7,385 gene clusters**.
- Gene clusters binned into five groups: HL+LL core (n=766), HL core (n=492), LL core (n=144),
  **singletons** (single-genome clusters, n=2,215), other (n=3,768).
- Singletons = **30%** of all clusters; HL+LL core = **10.4%**. Small core is consistent with a
  *Prochlorococcus* "open pangenome."
- **49.1%** of all clusters had genes with COG functional annotation; annotation rate **90.5%** for
  HL+LL core clusters vs **37.2%** for singletons.
- Gene-cluster–based organization of genomes matched the six *Prochlorococcus* clades but grouped
  genomes primarily by **light-regime adaptation**, whereas 37-core-gene phylogenomics (and ITS-based
  trees) did NOT recapitulate the environmental-distribution patterns. Suggests whole gene-content is
  better than marker genes for inferring **ecological** (vs evolutionary) relationships.
- The metapangenome revealed very closely related isolates (same phylogenetic cluster, differing by
  few gene clusters) with markedly different environmental abundance / fitness.
- A small set of **core** gene clusters occurred mostly in hypervariable genomic islands and
  systematically lacked read recruitment from surface-ocean metagenomes; these were all linked to
  **sugar metabolism** — suggesting benefit from high sequence diversity of sugar-metabolism genes.

## 7. Load-bearing statements — VERBATIM (CC BY 4.0; short quotes, with location)
- Metapangenome definition (Methods, "Computing the metapangenome"): "Here we define 'metapangenome'
  as the outcome of the analysis of pangenomes in conjunction with the environment where the abundance
  and prevalence of gene clusters and genomes are recovered through shotgun metagenomes."
- Workflow (Methods, "Computing the pangenome…"): "The anvi'o pangenomic workflow developed for this
  study consists of three major steps: (1) generating an anvi'o genome database ('anvi-gen-genomes-
  storage')… (2) computing the pangenome ('anvi-pan-genome')… and (3) displaying the pangenome
  ('anvi-display-pan')…"
- Parameters (Methods): "we then used the program 'anvi-pan-genome' with the genomes storage database,
  the flag '--use-ncbi-blast', and parameters '--minbit 0.5', and '--mcl-inflation 10'."
- minbit (Methods): "removes weak hits using the 'minbit heuristic', which was originally described in
  ITEP …, to filter weak hits based on the aligned fraction between the two reads".
- Detection criterion (Methods, "Criterion for 'detection'"): "we assumed that a genome was 'detected'
  in a given metagenome only if more than 50% of its nucleotide positions had at least 1X coverage."

## 8. Stated scope, assumptions, limitations (source's own)
- Read recruitment can non-specifically map reads to regions conserved across populations (basis for
  the >50%-at-1X detection criterion); e.g. genomes recruited up to 0.01% of reads from Southern Ocean
  metagenomes where *Prochlorococcus* is virtually absent.
- The "population" concept is operational and reference-dependent: isolate genomes are assumed to give
  access to the environmental populations they belong to via read recruitment.
- SAG metapangenome deliberately used only 5 distant SAGs to avoid a "dilution effect" from competing
  recruitment onto identical regions among many similar genomes.
- Method demonstrated on one taxon/biome; generalizes only "for any taxon and biome for which genomic
  and sufficiently deep metagenomic data are available."

## 9. Failure modes / invalidity patterns (referee-relevant)
- **False detection of low-abundance genomes** from non-specific short-read recruitment to conserved
  regions → mitigated by the **>50% of positions at ≥1X** detection gate; without it, absent
  populations appear present (Southern Ocean example).
- **Dilution effect**: including many near-identical genomes/SAGs splits read recruitment across
  identical regions, distorting per-genome coverage → they restricted to few phylogenetically distant
  SAGs.
- ECG/EAG designations are metagenome-relative and can invert pangenome core/accessory labels: a gene
  that is pangenome-accessory can be environmental-core and vice versa — the paper flags this as a
  source of confusion and names the two class systems distinctly (ECG/EAG vs pangenome core/accessory).
- Marker-gene / concatenated-single-copy-core-gene phylogenies did NOT recover the
  environmental-distribution structure that gene-cluster content did — using phylogeny as a proxy for
  ecological relationship is a stated pitfall here.

## 10. What the source does NOT address (confident silences)
- **No ANI / average nucleotide identity computation.** The strings "average nucleotide identity",
  "ANI", `anvi-compute-genome-similarity`, and PyANI do **not** appear; genome-to-genome relatedness is
  assessed via Phylosift/FastTree phylogenomics and via shared gene-cluster content, not ANI.
- No `anvi-meta-pan-genome` command (that string does not appear; the metapangenome is assembled from
  `anvi-gen-samples-database` + `anvi-script-gen-environmental-core-summary` + `anvi-display-pan`).
- No general statement of a **minimum number of genomes** required for a "meaningful pangenome" — only
  the concrete counts used (31 isolates; 74 SAGs; +5-distant-SAG subset) are given.
- No sensitivity analysis of the chosen `--minbit 0.5` / `--mcl-inflation 10` values (values are
  stated, not justified or swept).

## 11. Open questions / ambiguities
- Rationale for `--mcl-inflation 10` (high vs the anvi'o default) and `--minbit 0.5` is not given in
  the readable text; treat as the values used, not recommended defaults, unless corroborated elsewhere.
- "translated DNA sequence level" homology + blastp implies protein-level clustering, but the exact
  gene-calling step for isolates (Prodigal via anvi'o) is not spelled out in the extracted methods.

## 12. Guidance answers
1. **What the anvi'o pangenomics workflow computes / pipeline + program names.** Three steps:
   `anvi-gen-genomes-storage` (genomes storage DB) → `anvi-pan-genome` (gene clusters) →
   `anvi-display-pan` (visualize/bin). Internally `anvi-pan-genome` does blastp all-vs-all → minbit
   filter → MCL clustering → occurrence/counts → hierarchical clustering (Euclidean + Ward) → pan DB.
   Related programs used: `anvi-gen-samples-database`, `anvi-script-gen-environmental-core-summary`,
   `anvi-summarize`, `anvi-interactive`, `anvi-script-gen-distribution-of-genes-in-a-bin`, and the
   `reformat-fasta` anvi'o script. **Functional enrichment:** the paper reports COG functional
   annotation of clusters (49.1% annotated) but does not name a dedicated enrichment command here.
   **ANI:** NOT computed — no `anvi-compute-genome-similarity`/ANI in this paper (see §10).
2. **Clustering algorithm + defaults.** Algorithm = **MCL** on blastp hits after minbit filtering.
   Values used (verbatim flags): `--minbit 0.5`, `--mcl-inflation 10`, with `--use-ncbi-blast`
   (blastp). minbit = ITEP heuristic filtering weak hits by aligned fraction between the two sequences.
   Note these are the values *used in the study*; the paper does not label them as tool defaults, and
   the hierarchical-clustering defaults it does call "default" are Euclidean distance + Ward.
3. **"Metapangenome" definition — quoted** (§7): "the outcome of the analysis of pangenomes in
   conjunction with the environment where the abundance and prevalence of gene clusters and genomes are
   recovered through shotgun metagenomes."
4. **Number of genomes / minimum for a meaningful pangenome.** 31 *Prochlorococcus* isolate genomes
   (plus 74 SAGs; a 5-distant-SAG subset for the SAG metapangenome), and 93 TARA Oceans metagenomes.
   **No minimum genome count for a "meaningful pangenome" is stated.**

Ingest note (per guidance): this PeerJ 2018 paper is the origin of the anvi'o pangenomic *workflow*
("developed for this study"); confirmed from the source's own wording. The paper does not cite itself
as "Eren 2021 Nat Microbiol"; no such claim appears here.
