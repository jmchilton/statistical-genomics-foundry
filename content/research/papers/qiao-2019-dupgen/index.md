---
title: "Gene duplication and evolution in recurring polyploidization-diploidization cycles in plants"
type: paper
source_id: qiao-2019-dupgen
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC6383267/
doi: 10.1186/s13059-019-1650-2
access_date: "2026-07-05"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Qiao X, Li Q, Yin H, Qi K, Li L, Wang R, Zhang S, Paterson AH. Gene duplication and evolution in recurring polyploidization-diploidization cycles in plants. Genome Biology 20:38, 2019. DOI 10.1186/s13059-019-1650-2. Summary also uses DupGen_finder README facts accessed 2026-07-05."
derived: license-aware-summary
tags:
  - domain/gene-family-evolution
---

# Qiao et al. 2019 — DupGen_finder (modes of gene duplication in plants)

## 1. Citation
Qiao X, Li Q, Yin H, Qi K, Li L, Wang R, Zhang S, Paterson AH. "Gene duplication and
evolution in recurring polyploidization–diploidization cycles in plants." *Genome Biology*
20:38 (2019). DOI: 10.1186/s13059-019-1650-2. PMID 30791939, PMCID PMC6383267.
Article license: **Creative Commons Attribution 4.0 International (CC-BY 4.0)** → verbatim
reproduction permitted.

Companion software: `DupGen_finder`, GitHub `qiao-xin/DupGen_finder`
(https://github.com/qiao-xin/DupGen_finder), a Perl pipeline. README accessed from the
`master` branch on 2026-07-05. Repository code license reported as **GPL-3.0**. The README
does not print an explicit version string; a specific commit hash was not captured
[access flag: version/commit not pinned].

## 2. Access note
Full text read via the open-access PMC copy (PMC6383267); the publisher (Springer/BMC)
canonical URL redirected to an auth gate, so PMC was the read surface. CLI defaults and
output file naming taken from the raw `master` README. Paper prose in §7 was extracted
through a fetch/summarization tool; the CLI/usage strings in §5–§7 are copied from the raw
README file and are trustworthy verbatim functional strings. Paper-prose quotes are
close-verbatim but should be re-checked against the PDF before being treated as
character-exact.

## 3. Thesis (1 sentence)
Across 141 sequenced plant genomes, genes arising from five distinct **modes of duplication**
— whole-genome, tandem, proximal, transposed, dispersed — differ systematically in abundance,
selection pressure, expression divergence, and gene-conversion rate, and DupGen_finder is the
pipeline built to classify genes into these five modes.

## 4. Problem & context
Plant genomes are shaped by recurring polyploidization–diploidization cycles; duplicate genes
originate by several mechanisms with different downstream fates. The paper needed a uniform,
automated way to assign every duplicated gene in a genome to exactly one origin mode so that
the evolutionary consequences of each mode could be compared across many genomes.

## 5. Method / approach (what the pipeline actually does)

**Five duplication-mode classes** (this is the exact set; there is no "segmental" class):
`WGD`, `tandem`, `proximal`, `transposed`, `dispersed`. Per-species output files are named
`<sp>.wgd.pairs`, `<sp>.tandem.pairs`, `<sp>.proximal.pairs`, `<sp>.transposed.pairs`,
`<sp>.dispersed.pairs` (verbatim functional strings from README).

**Classification pipeline / priority order** (a gene pair is assigned to the first class it
matches; later classes are computed on the remainder):
1. all-vs-all local BLASTP within the target genome → candidate homologous pairs.
2. run MCScanX intra-genome → collinear (anchored) pairs = **WGD**-derived pairs.
3. remove WGD pairs; among the remaining homologous pairs on the same chromosome:
   - **tandem** = the two BLAST-hit genes are directly adjacent on the same chromosome.
   - **proximal** = non-tandem same-chromosome pair separated by **≤ `-d` genes** (default 10).
4. remove WGD + tandem + proximal; identify **transposed** pairs using ancestral-vs-non-
   ancestral locus context, requiring an **outgroup**: one copy sits in an ancestral locus
   (parent copy), the other in a non-ancestral locus (transposed copy). Inter-species
   collinearity is computed by running MCScanX on target↔outgroup BLASTP to establish which
   loci are ancestral.
5. everything left after removing WGD + tandem + proximal + transposed = **dispersed**.

**Exact CLI usage and defaults (verbatim from README `master`):**
```
Usage: DupGen_finder.pl -i data_directory -t target_species -c outgroup_species -o output_directory
#####################
Optional:
-a 1 or 0(are segmental duplicates ancestral loci or not? default: 1, yes)
-d number_of_genes(maximum distance to call proximal, default: 10)
#####################
The following are optional MCScanX parameters:
-k match_score(cutoff score of collinear blocks for MCScanX, default: 50)
-g gap_penalty(gap penalty for MCScanX, default: -1)
-s match_size(number of genes required to call a collinear block for MCScanX, default: 5)
-e e_value(alignment significance for MCScanX, default: 1e-05)
-m max_gaps(maximum gaps allowed for MCScanX, default: 25)
-w overlap_window(maximum distance in terms of gene number, to collapse BLAST matches for MCScanX, default: 5)
```

**Required inputs** (tab-delimited; all four in one directory):
- `<target>.gff` — gene positions; columns: `sp_chr <tab> gene_id <tab> start <tab> end`.
- `<target>.blast` — self-genome BLASTP, `-outfmt 6` (m8) tabular.
- `<target>_<outgroup>.gff` — combined GFF for target + outgroup.
- `<target>_<outgroup>.blast` — cross-genome (target vs outgroup) BLASTP, `-outfmt 6`.
Paper: all-vs-all BLASTP run with `E < 1e-10`, top 5 matches, m8 output; for each gene only
the transcript with the longest CDS was kept.

## 6. Key claims / findings (atomic)
- DupGen_finder classifies every duplicated gene into exactly one of **five** modes: WGD,
  tandem, proximal, transposed, dispersed. "segmental" is NOT one of the five output classes.
- **tandem** = the two homologous genes are directly adjacent on the same chromosome
  (0 intervening genes); there is no separate tunable "tandem count" parameter — adjacency is
  the definition.
- **proximal** = non-tandem, same-chromosome pair separated by `≤ 10` genes by default; the
  cutoff is the `-d` option, `default: 10`. There is a single distance parameter, not a
  tandem/proximal pair of windows.
- **WGD** pairs are exactly the intra-genome MCScanX collinear (anchored/syntenic) pairs;
  small-scale modes are computed only after WGD pairs are removed from the homolog set.
- **transposed** classification needs an **outgroup** to define ancestral vs non-ancestral loci
  (via inter-species MCScanX synteny); one copy in ancestral locus (parent), one in a
  non-ancestral locus (transposed copy).
- **dispersed** = the residual class: homologous pairs neither collinear, adjacent, proximal,
  nor transposed.
- The `-a` option (`default: 1`) asks "are segmental duplicates ancestral loci or not?" — this
  is the only place the word "segmental" appears, and it is a transposed-duplication ancestry
  assumption toggle, not a class label.

## 7. Load-bearing statements (CC-BY 4.0 → verbatim allowed)

Functional strings (README `master`, verbatim, high confidence):
- `-d number_of_genes(maximum distance to call proximal, default: 10)`
- `-a 1 or 0(are segmental duplicates ancestral loci or not? default: 1, yes)`
- `-w overlap_window(maximum distance in terms of gene number, to collapse BLAST matches for MCScanX, default: 5)`
- Output classes / file suffixes: `.wgd.pairs`, `.tandem.pairs`, `.proximal.pairs`,
  `.transposed.pairs`, `.dispersed.pairs`.

Paper prose (Methods / Abstract, close-verbatim — extracted via fetch tool, re-verify against
PDF for character-exactness):
- Abstract, category list: "Genes derived from whole-genome, tandem, proximal, transposed, or
  dispersed duplication differ in abundance, selection pressure, expression divergence, and
  gene conversion rate among genomes."
- Tandem definition: "If the two genes in a BLASTP hit that are adjacent to each other on the
  same chromosome, they were defined as tandem gene pair."
- Proximal definition: "Proximal gene pairs were defined as non-tandem pairs separated by 10 or
  fewer genes on the same chromosome."
- Transposed definition: "one gene existed in its ancestral locus (named the parent copy) and
  the other was located in a non-ancestral locus (transposed copy)."
- Dispersed definition: "After removing WGD, tandem, proximal, and transposed duplications from
  the whole set of homologous gene pairs, the remaining gene pairs were classified as dispersed
  duplications."

## 8. Stated scope, assumptions, limitations
- Designed for and validated on **plant** genomes (141 sequenced plants).
- Requires a suitable **outgroup** genome to resolve transposed duplications and ancestral loci;
  transposed/dispersed separation depends on that outgroup choice.
- Depends on **MCScanX** for both intra- and inter-species collinearity; WGD calls inherit
  MCScanX's collinear-block parameters (`-k`, `-g`, `-s`, `-e`, `-m`, `-w` defaults above).
- Uses only the longest-CDS transcript per gene; alternative isoforms are dropped upstream.

## 9. Failure modes / invalidity patterns
- **Wrong or missing outgroup** → transposed duplications cannot be correctly identified, so
  genes that are truly transposed fall through into the dispersed residual (over-counting
  dispersed).
- **`-d` mis-set** shifts the tandem/proximal boundary: raising it reclassifies dispersed/
  distant pairs as proximal; there is no separate tandem window, so tandem is fixed at adjacency.
- **MCScanX collinearity params too strict/loose** directly change what counts as WGD (the
  anchored set), which cascades: everything not called WGD is pushed into the small-scale modes.
- Priority-order dependence: because classes are assigned by subtraction in a fixed order
  (WGD → tandem → proximal → transposed → dispersed), a pair is counted once in its highest-
  priority matching class; a gene can appear in multiple pairs of different modes.
- Symptom of the common downstream error: a skill claiming a class called "segmental" or
  claiming "tandem = 5 genes, proximal = 5–25 genes" is inconsistent with this tool — the class
  is "transposed" not "segmental," tandem = adjacency, and proximal is a single `-d`-genes
  window (default 10).

## 10. What the source does NOT address (confident silences)
- README gives no explicit prose algorithm for how tandem/proximal/transposed/dispersed are
  computationally separated (that detail is in the paper Methods, not the README).
- README carries no explicit version string or changelog captured here.
- Behavior for non-plant genomes is not characterized.

## 11. Open questions / ambiguities
- Whether "adjacent" for tandem strictly means 0 intervening genes vs a small settable gap —
  the definition read implies directly adjacent (0), and no CLI knob exposes a tandem window.
- Exact tie-breaking when a gene participates in pairs of several modes (the pipeline is pair-
  based; per-gene mode assignment across conflicting pairs is not spelled out in what was read).
- The precise role/effect of `-a` (segmental duplicates ancestral or not, default 1) on
  transposed-duplication ancestry inference is stated only tersely in the README.

## 12. Guidance answers
1. **Exact class set / "transposed" vs "segmental":** The five classes are `WGD`, `tandem`,
   `proximal`, `transposed`, `dispersed`. The fifth is **transposed** (confirmed). **"segmental"
   is NOT a class label** — it appears only in the `-a` option text ("are segmental duplicates
   ancestral loci or not? default: 1, yes"). The downstream "segmental" claim is wrong.
2. **Default window/distance:** `-d number_of_genes(maximum distance to call proximal,
   default: 10)`. A **single** `-d` default of **10**. Tandem is defined by **adjacency**, not a
   count parameter; there is **no separate tandem-count or separate proximal 5–25 window**. The
   downstream "tandem=5, proximal 5–25" claim is wrong. (Note: `-w overlap_window ... default: 5`
   is an MCScanX BLAST-collapse window, unrelated to tandem/proximal calling.)
3. **WGD vs small-scale separation:** MCScanX intra-genome collinearity yields the anchored
   WGD-derived pairs; these are removed first, then tandem/proximal are called from same-
   chromosome distance, transposed from ancestral-vs-non-ancestral loci resolved by inter-genome
   MCScanX synteny against the outgroup, and dispersed is the residual. Verbatim: "The MCScanX
   algorithm was utilized to identify the WGD-derived gene pairs"; "After removing WGD, tandem,
   proximal, and transposed duplications from the whole set of homologous gene pairs, the
   remaining gene pairs were classified as dispersed duplications."
4. **Required inputs/formats:** `<target>.gff` (sp_chr, gene_id, start, end; tab-delimited),
   `<target>.blast` (self BLASTP `-outfmt 6`), `<target>_<outgroup>.gff` (combined), and
   `<target>_<outgroup>.blast` (cross-genome BLASTP `-outfmt 6`). MCScanX is the collinearity
   engine. Paper BLASTP settings: `E < 1e-10`, top 5 matches, m8; longest-CDS transcript per gene.
5. **Citation/license:** Qiao X, Li Q, Yin H, Qi K, Li L, Wang R, Zhang S, Paterson AH, *Genome
   Biology* 20:**38** (2019), DOI 10.1186/s13059-019-1650-2, article **CC-BY 4.0**. Confirmed.
   (Tool repo code license reported GPL-3.0.)
