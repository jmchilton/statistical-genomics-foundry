---
title: "Liftoff: accurate mapping of gene annotations"
type: paper
source_id: shumate-salzberg-2021-liftoff
source_url: https://academic.oup.com/bioinformatics/article/37/12/1639/6035128
doi: 10.1093/bioinformatics/btaa1016
access_date: "2026-07-03"
license: LicenseRef-all-rights-reserved
attribution: "Shumate A, Salzberg SL. Liftoff: accurate mapping of gene annotations. Bioinformatics 37(12):1639-1643, 2021. DOI 10.1093/bioinformatics/btaa1016. Oxford University Press article page plus Liftoff GitHub README consulted for tool defaults; paper prose summarized in own words."
derived: own-words-summary
tags:
  - domain/genome-annotation
  - domain/comparative-genomics
---

# Liftoff: accurate mapping of gene annotations

## 1. Citation
Shumate A, Salzberg SL. 2021. "Liftoff: accurate mapping of gene annotations."
*Bioinformatics* 37(12):1639–1643. doi:10.1093/bioinformatics/btaa1016.
(Advance access online 2020; issue dated 2021 — both year forms appear in the wild.)
Publisher page: https://academic.oup.com/bioinformatics/article/37/12/1639/6035128

Tool documentation also consulted (clearly attributed below where used): Liftoff GitHub
README, https://github.com/agshumate/Liftoff (raw: master/README.md). Access date: 2026-07-03.

## 2. Access note
Read the publisher (OUP) article page text and the GitHub README. Paywall/OA boundary: the
publisher page carries a full-rights-reserved copyright line (see §7 mode note); I could read
the abstract/body text served on that page but did not access a separately-licensed PDF. The
guidance file asserted the paper is "OA"; the actual OUP page text states otherwise — see §7.
Exact numeric parameter DEFAULTS are attributed to the **GitHub README (tool docs)**, not the
paper, because the paper page did not enumerate the flag defaults; the paper states only the
coverage rule in prose (50%).

## 3. Thesis (1 sentence)
Liftoff accurately maps (lifts over) a reference genome's gene annotations onto a target
assembly of the same or a closely related species by aligning gene sequences (not coordinates)
with minimap2 and reconstructing each gene's exon–intron structure on the target.

## 4. Problem & context
When a new assembly of a species (or a closely related species) is produced, its genes need
annotation. Re-running full annotation pipelines is expensive; coordinate-based lift-over tools
(e.g. UCSC liftOver, CrossMap) rely on precomputed chain/alignment files between specific
assemblies, which are not always available and can fail across structural change. Liftoff
instead maps annotations directly using sequence alignment, needing only the two genome FASTAs
plus the reference annotation.

## 5. Method / approach
- Inputs: a reference genome FASTA, a target genome FASTA, and a reference annotation in GFF/GTF.
- Extracts the sequence of each gene's child features (exons/CDS) from the reference and aligns
  them to the target genome with **minimap2**.
- Builds the gene structure on the target from the alignments: alignment segments are treated as
  nodes in a graph and chained to reconstruct exon–intron structure; the tool selects the mapping
  that maximizes sequence identity while preserving structure.
- Distance constraint (docs): "alignment nodes separated by more than a factor of D in the target
  genome will not be connected in the graph" (default `-d 2.0`).
- Acceptance: a feature is designated mapped only if alignment **coverage ≥ A** and **sequence
  identity ≥ S** (defaults below). Paper states a gene is "successfully mapped if at least 50% of
  the reference gene maps to the target assembly."
- Overlap resolution / multi-mapping: Liftoff checks for pairs of reference genes that mapped to
  overlapping (or identical) target locations and attempts to remap so genes do not incorrectly
  collide; `-overlap` sets the maximum allowed overlap fraction (default 0.1).
- Unmapped genes: genes that cannot be lifted are written to a separate text file of unmapped
  gene IDs (`-u FILE`).
- Extra gene copies (`-copies`): after mapping the complete annotation once, Liftoff repeats the
  lift-over to search for additional copies. "An extra gene copy is annotated if another mapping
  is found that does not overlap any previously annotated genes, and that meets the user-defined
  minimum sequence identity threshold" (`-sc`, default 1.0; must exceed `-s`).
- Optional `-polish`: re-aligns exons/CDS to restore proper coding sequence (prevent start/stop
  loss or in-frame stops); emits `{output}.gff` and `{output}.gff_polished`.

### Exact default parameters (verbatim flag names + numeric defaults — source: GitHub README tool docs)
- `-a` alignment coverage threshold — default **0.5** (map a feature only if coverage ≥ A)
- `-s` sequence identity threshold — default **0.5** (map a feature only if identity ≥ S)
- `-d` distance scaling factor — default **2.0**
- `-flank` flanking sequence (fraction of gene length) — default **0.0**
- `-sc` copy sequence identity threshold (with `-copies`) — default **1.0** (must be > `-s`)
- `-overlap` max overlap fraction between two features — default **0.1**
- `-mismatch` — default **2**; `-gap_open` — default **2**; `-gap_extend` — default **1**
- minimap2 options (`-mm2_options`) default string: `-a --end-bonus 5 --eqx -N 50 -p 0.5`

### CLI form and required inputs (verbatim — source: GitHub README tool docs)
```
liftoff target reference -g GFF
```
Positional required args: `target` (target FASTA, lift genes TO), `reference` (reference FASTA,
lift genes FROM). Annotation supplied via `-g GFF` (GFF/GTF), or a prebuilt database via `-db DB`.
Full synopsis: `liftoff [-h] (-g GFF | -db DB) [-o FILE] [-u FILE] [-exclude_partial] [-dir DIR]
[-mm2_options =STR] [-a A] [-s S] [-d D] [-flank F] [-V] [-p P] [-m PATH] [-f TYPES]
[-infer_genes] [-infer_transcripts] [-chroms TXT] [-unplaced TXT] [-copies] [-sc SC]
[-overlap O] [-mismatch M] [-gap_open GO] [-gap_extend GE] target reference`

## 6. Key claims / findings
- GRCh37 → GRCh38 lift-over: successfully mapped **99.87%** of 27,459 genes (27,422 genes).
- GRCh38 → chimpanzee (PTRv2) lift-over: successfully mapped **98.31%** of 19,878 genes
  (19,543 genes) — a cross-species case with a closely related species.
- Default acceptance rule (paper prose): gene counted as successfully mapped when **≥ 50%** of the
  reference gene maps to the target (i.e. coverage default 0.5).
- Liftoff aligns gene *sequences* with minimap2 rather than relying on precomputed coordinate
  chain files, so it does not require a preexisting assembly-to-assembly alignment.
- `-copies` mode can recover tandem/extra gene copies present in the target but not represented
  once-per-gene in the reference lift.

## 7. Load-bearing statements — MODE: RESTRICTIVE (own-words paraphrase; functional strings verbatim)
License posture: the OUP article page states **"© The Author(s) 2020. Published by Oxford
University Press. All rights reserved. For permissions, please e-mail: journals.permissions@oup.com"**
(copyright line is a functional/factual string, quoted). Treated as all-rights-reserved →
no verbatim reproduction of prose; paraphrased below. Numeric defaults, flag names, the CLI
synopsis, and the minimap2 option string (§5) are functional strings reproduced verbatim.

- Acceptance criterion (paraphrase of paper): a gene is treated as successfully mapped when at
  least 50% of the reference gene aligns to the target assembly.
- Extra-copy criterion (paraphrase of paper): an additional gene copy is annotated when a further
  mapping is found that does not overlap any already-annotated gene and that clears the
  user-defined minimum sequence-identity threshold.
- Divergence caveat (paraphrase of Discussion): the success of the lift-over is limited by the
  degree of divergence between the reference and target genomes.

## 8. Stated scope, assumptions, limitations
- Designed for lifting annotations between assemblies of the **same species or closely related
  species** (validated on human→human and human→chimp).
- Success is explicitly stated to be limited by divergence between reference and target genomes
  (Discussion). No specific numeric divergence/identity cutoff is given in the paper text read.
- Requires both genome FASTAs and a reference annotation; quality of the output depends on the
  quality/completeness of the reference annotation.

## 9. Failure modes / invalidity patterns
- High divergence between reference and target degrades lift-over success (paper's own caveat).
  The paper does not name a specific nucleotide-identity floor at which it breaks down.
- Genes that fail the coverage/identity thresholds are not annotated on the target and are
  reported in the unmapped-genes file (`-u`) — this file is the built-in detector/symptom of
  failed lift-over.
- Overlapping/duplicate mismappings: multiple reference genes can map to the same target locus;
  Liftoff resolves via its overlap-remapping step, but residual collisions are governed by the
  `-overlap` fraction (default 0.1).
- `-copies`/`-sc` misuse: `-sc` must exceed `-s`; a too-low copy threshold would inflate spurious
  copies (docs constraint).

## 10. What the source does NOT address (confident silences)
- No explicit disclaimer in the read text that Liftoff is unsuitable for **gene-loss detection**
  or **deep cross-species (distant) divergence**; it frames itself for same/closely-related
  species but does not spell out an anti-use-case statement. [see §12]
- No stated numeric divergence/identity limit at which accuracy collapses.
- No stated tandem-duplication *distance window* (e.g. a kb value) governing copy calling; copy
  calling is governed by sequence identity (`-sc`) and non-overlap, not a documented bp window.

## 11. Open questions / ambiguities
- The paper prose gives the coverage rule (50%) but did not, in the page text read, enumerate a
  separate default sequence-identity value; the identity default (0.5) comes from the tool docs.
- Whether newer README/tool versions changed any defaults vs. the 2020/2021 paper is not
  verifiable from the paper alone (defaults recorded here are from the current master README).

## 12. Guidance answers
- **Method / minimap2 / multi-mapping / unmapped output:** Captured (§5). Liftoff aligns each
  transcript's exon/CDS sequences to the target with minimap2, chains alignment nodes into a
  graph to rebuild exon–intron structure, resolves overlapping mismappings by remapping, and
  writes unmappable gene IDs to `-u FILE`.
- **DEFAULT coverage & identity — LOAD-BEARING, SKILL MISMATCH FLAGGED:** The **real defaults are
  coverage `-a 0.5` and identity `-s 0.5`** (tool docs), i.e. **50% / 50%**. The paper prose
  confirms the 50% coverage rule. **The skill's claim of ">= 80% coverage" and ">= 70% identity"
  is WRONG — actual defaults are 0.5 / 0.5, matching the guidance's suspected 0.5/0.5.** Flag and
  correct downstream.
- **-copies / duplicated-gene handling & threshold:** `-copies` enables extra-copy search;
  the governing threshold is `-sc` (copy sequence identity, default **1.0**, must exceed `-s`),
  plus non-overlap with existing annotations. **No 50 kb tandem window is stated** in the paper or
  README read — the skill's claimed "50 kb tandem window" is NOT supported by these sources; only
  a sequence-identity threshold governs copies. (The `-d 2.0` distance scaling factor constrains
  graph-node chaining distance, not a copy window.) Flag the skill's 50 kb claim as unsourced.
- **Divergence limit (~80% nt identity):** The paper states only that success is limited by
  reference–target divergence; it gives **no numeric nucleotide-identity limit**. The skill's
  "~80% nucleotide identity empirical limit" is **not stated in this paper** — record as absent
  here (would need another source).
- **Explicit scope caveat (not for gene-loss / deep divergence):** **Not found** as an explicit
  statement in the read text. Liftoff is positioned for same/closely-related species and flags
  divergence as a limiter, but does not print an explicit "not for gene-loss detection / distant
  cross-species" disclaimer. Record as absent — do not attribute a TOGA-vs-Liftoff disclaimer to
  this paper.
- **Must-capture verbatim (defaults + CLI):** Provided in §5 (functional strings): `-a 0.5`,
  `-s 0.5`, `-d 2.0`, `-flank 0.0`, `-sc 1.0`, `-overlap 0.1`; CLI `liftoff target reference -g GFF`.
