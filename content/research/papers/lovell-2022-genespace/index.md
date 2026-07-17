---
title: "GENESPACE tracks regions of interest and gene copy number variation across multiple genomes"
type: paper
source_id: lovell-2022-genespace
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC9462846/
doi: 10.7554/eLife.78526
version: "GENESPACE v0.9.3"
access_date: "2026-07-04"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Lovell JT, Sreedasyam A, Schranz ME, Wilson M, Carlson JW, Harkess A, Emms D, Goodstein DM, Schmutz J. GENESPACE tracks regions of interest and gene copy number variation across multiple genomes. eLife 11:e78526, 2022. DOI 10.7554/eLife.78526. Read via eLife and PMC full text under eLife CC-BY posture."
derived: license-aware-summary
tags:
  - domain/synteny
  - domain/comparative-genomics
---

# Lovell et al. 2022 — GENESPACE

## 1. Citation
Lovell JT, Sreedasyam A, Schranz ME, Wilson M, Carlson JW, Harkess A, Emms D,
Goodstein DM, Schmutz J. 2022. "GENESPACE tracks regions of interest and gene copy
number variation across multiple genomes." *eLife* 11:e78526. Published 2022 Sep 9.
doi:10.7554/eLife.78526.
Software version described in the paper: **GENESPACE v0.9.3**.

## 2. Access note
Full text read via eLife HTML (https://elifesciences.org/articles/78526) and PMC
(**PMC9462846**), fetched 2026-07-04. NOTE: the PMC id given in the invocation
(PMC9648965) is WRONG — it resolves to an unrelated eukaryogenesis review; the correct
PMC id for this paper is **PMC9462846**. Text was extracted through a summarizing fetch
tool; the load-bearing quotes below were cross-confirmed across two independent fetches
of Materials-and-methods passages, but I could not byte-verify every character against a
raw PDF. Where a fact was not found, I record it ABSENT rather than infer.

## 3. Thesis (1 sentence)
GENESPACE integrates conserved gene order (synteny) with orthology to define the
expected physical position of every gene across multiple genomes, yielding a
synteny-constrained pan-genome annotation and a "riparian" cross-genome visualization.

## 4. Problem & context
"Leveraging information across multiple genomes remains a significant challenge in nearly
all eukaryotic systems." Existing gene-family / synteny tools handle either orthology or
collinearity but not their intersection; GENESPACE targets that intersection, aimed
"especially [at] polyploid, outbred, and other complex genomes."

## 5. Method / approach (pipeline)
Ordered pipeline (Materials and methods):
1. **Inputs:** "GENESPACE operates on gff3-formatted annotation files and accompanying
   peptide fasta files." (one gff3 + one peptide FASTA per genome.)
2. **Homology:** "GENESPACE calculates BLAST-like hits from DIAMOND2 and runs OrthoFinder
   to infer orthogroups and orthologues." DIAMOND **v2.0.8.146**, OrthoFinder **v2.5.4**.
3. **Array collapse + rank order:** genes are collapsed to "array representative" genes;
   "Gene rank order along the genome is recalculated on these 'array representative'
   genes." Physical position for synteny = condensed gene rank-order position (not bp).
4. **Anchors / synteny:** collinear hits found via MCScanX_h then buffered; "MCScanX_h
   (-s = blkSize, -m = nGaps) is called from R using condensed gene rank-order positions
   as the physical location, and those hits within collinear blocks are flagged as
   initial anchors." "GENESPACE then extracts syntenic regions from the hits using a
   combination of graph- and cluster-based approaches, producing syntenic orthogroups for
   each unique (not reciprocal) pair of genomes."
5. **Pan-genome annotation:** the `pangenome` function decodes pairwise syntenic
   orthologs into a multi-genome pan-annotation against a chosen reference.
6. **Visualization:** the `plot_riparian` function draws the riparian (braid) plot.

### Exact default parameters (synteny function)
Verbatim: "the minimum number of unique hits within a syntenic block ('blkSize',
default = 5), the maximum number of gaps within a block alignment ('nGaps', default = 5),
and the radius around a syntenic anchor for a hit to be considered syntenic ('synBuff',
default = 100)."
- `blkSize` = **5** (minimum number of *unique hits* within a syntenic block)
- `nGaps` = **5** (maximum gaps within a block alignment; passed to MCScanX_h `-m`)
- `synBuff` = **100** (radius around a syntenic anchor for a hit to count as syntenic)
No other `synteny` parameters with defaults are listed in Materials and methods.

### R functions named in the paper
`synteny`, `pangenome`, `plot_riparian`. NOTE: the paper (v0.9.3) does NOT name
`init_genespace` or `run_genespace` — those are a later (v1.x) driver API and are ABSENT
from this source.

## 6. Key claims / findings
- `blkSize` default is 5, but its unit is "unique hits within a syntenic block," NOT
  "orthogroups." A skill claiming "5 orthogroups (Lovell 2022 default)" mis-states the
  unit; the number 5 is correct, the unit is unique syntenic hits.
- Anchor definition (verbatim): "potential anchor hits are defined as those where both
  the query and target are array representatives, the hit is not in maskTheseHits, the
  query scrRank ≤ nHits1, the target scrRank ≤ nHits2, and, optionally if onlyOgAnchors,
  both the query and target are in the same orthogroup." → orthogroup-constrained anchors
  are OPTIONAL (`onlyOgAnchors`), not unconditional.
- Software pins: OrthoFinder **v2.5.4**, DIAMOND **v2.0.8.146**, GENESPACE **v0.9.3**.
- Synteny uses gene RANK ORDER (condensed, array-representative), not base-pair coords.
- Syntenic orthogroups are built "for each unique (not reciprocal) pair of genomes."
- `pangenome` output: "a long-formatted text file, where each gene is given a reference
  genome syntenic position and chromosome, and flags"; plus "a wide-formatted data.table
  (R object) where each row is a pan-genome entry with positional information and each
  column is a list of genes by genome."
- Riparian anchoring: "Genomes are ordered vertically to minimize the number of
  translocations between each pairwise combination. Chromosomes are ordered horizontally
  to maximize synteny with the [reference] chromosomes." "Chromosome segment sizes are
  scaled by the total number of genes in syntenic networks and positions of the braids
  are the gene order along the chromosome sequence." Reference is user-chosen (in the sex-
  chromosome figure the reference is human, chromosomes [X, 1–22]).
- Demonstrated across a wide taxonomic range: seven main genome pairs, 15 vertebrate
  genomes (sex-chromosome analysis), eight grass genomes, and 26 maize cultivars.

## 7. Load-bearing statements (VERBATIM — license permits reproduction; eLife CC BY)
1. "the minimum number of unique hits within a syntenic block ('blkSize', default = 5),
   the maximum number of gaps within a block alignment ('nGaps', default = 5), and the
   radius around a syntenic anchor for a hit to be considered syntenic ('synBuff',
   default = 100)." — Materials and methods (synteny parameters).
2. "GENESPACE operates on gff3-formatted annotation files and accompanying peptide fasta
   files." — Materials and methods (inputs).
3. "potential anchor hits are defined as those where both the query and target are array
   representatives, the hit is not in maskTheseHits, the query scrRank ≤ nHits1, the
   target scrRank ≤ nHits2, and, optionally if onlyOgAnchors, both the query and target
   are in the same orthogroup." — Materials and methods (anchor definition).
4. "MCScanX_h (-s = blkSize, -m = nGaps) is called from R using condensed gene rank-order
   positions as the physical location, and those hits within collinear blocks are flagged
   as initial anchors." — Materials and methods (synteny).
5. "The output is a long-formatted text file, where each gene is given a reference genome
   syntenic position and chromosome ... pangenome also returns a wide-formatted data.table
   (R object) where each row is a pan-genome entry ... and each column is a list of genes
   by genome." — Materials and methods (pangenome).

## 8. Stated scope, assumptions, limitations
- Assumes a single gff3 annotation + matching peptide FASTA per genome.
- Core assumption on copy number: homologs should be effectively single copy within any
  syntenic region between a genome pair (array representatives collapse tandem arrays).
- Positioned "especially [for] polyploid, outbred, and other complex genomes."
- No explicit maximum genome count and no plant-only restriction is stated; the paper
  itself applies GENESPACE to vertebrates and grasses, so it is not plant-limited.

## 9. Failure modes / invalidity patterns (referee-relevant)
- Version drift: the pipeline pins external tools (OrthoFinder v2.5.4, DIAMOND
  v2.0.8.146). GENESPACE parses OrthoFinder output; a mismatched OrthoFinder version can
  break parsing. (Paper states the pinned version; it does not itself narrate the failure
  message — [summarizer-inferred] that a version mismatch is the mechanism.)
- Input mismatch: gff3 and peptide FASTA gene IDs must correspond; mismatch breaks the
  annotation join. (Implied by the input contract; not spelled out as an error string.)
- Mis-set `blkSize`/`synBuff`/`nGaps` change what counts as syntenic — too strict drops
  real blocks, too loose merges non-collinear regions. (Design consequence of the
  parameter definitions; the paper states the params, not the tuning failure explicitly.)
- Treating `blkSize`'s unit as orthogroups rather than "unique hits" would mis-document
  the threshold.

## 10. What the source does NOT address (confident silences)
- Exact OUTPUT FILENAMES: `syntenicHits.txt`, `pangenes.txt`, `pangenome.txt` are NOT
  named in the paper — ABSENT. The paper describes output *content/format* (long text
  file + wide data.table), not on-disk filenames.
- The driver functions `init_genespace` / `run_genespace` are ABSENT (paper = v0.9.3,
  functions `synteny` / `pangenome` / `plot_riparian`).
- No stated hard upper bound on number of genomes; no ">30 genomes" claim.
- No R-version or GENESPACE ≥1.4.0 requirement (paper predates that; it is v0.9.3).

## 11. Open questions / ambiguities
- Whether orthogroup-constrained anchoring (`onlyOgAnchors`) is on by default is not
  clearly stated — the anchor definition marks it "optionally."
- Mapping between the paper's v0.9.3 API (`synteny`, `pangenome`) and the later
  `init_genespace` / `run_genespace` driver API is not covered by this source.

## 12. Guidance answers
1. **Minimum syntenic block size / is default 5?** YES — `blkSize` default = 5, but the
   unit is "the minimum number of unique HITS within a syntenic block," not orthogroups.
   The number backs "default = 5"; the "orthogroups" unit is over-claimed. (synBuff = 100,
   nGaps = 5 are the companion synteny params.)
2. **Pipeline / anchor definition.** OrthoFinder (+DIAMOND2) → array-representative rank
   order → MCScanX_h collinear anchors (`-s = blkSize, -m = nGaps`) → synBuff-buffered
   syntenic hits → syntenic orthogroups per unique genome pair → pangenome → riparian.
   Anchor definition quoted verbatim in §7 #3 (array representatives, not in maskTheseHits,
   scrRank ≤ nHits, optional onlyOgAnchors same-orthogroup).
3. **OrthoFinder version.** "OrthoFinder v2.5.4" (DIAMOND v2.0.8.146). Backs a
   version-mismatch failure mode.
4. **Input format.** "gff3-formatted annotation files and accompanying peptide fasta
   files" (§7 #2). No explicit ".bed" conversion is named in the paper text I read; genes
   are internally recast to condensed gene RANK-ORDER positions (array representatives).
5. **Riparian + pan-gene outputs.** Riparian: braids of syntenic gene order, genomes
   ordered vertically to minimize translocations, chromosomes horizontally to maximize
   synteny with a chosen reference (see §6). Pan-gene output: long-format text file (each
   gene → reference syntenic position/chromosome + flags) plus wide data.table (row =
   pan-genome entry, column = genes by genome). Filenames `syntenicHits.txt` /
   `pangenes.txt` are ABSENT from the paper.
6. **Plant-specific assumptions / scaling >30 genomes / non-plant clades.** No plant-only
   restriction and no ">30 genome" or hard genome-count limit is stated. The paper
   explicitly runs on vertebrates and grasses; it frames its advantage as "especially in
   polyploid, outbred, and other complex genomes." So the stated boundary is genome
   COMPLEXITY, not clade.
7. **R function names + key args.** Paper names `synteny` (args include `blkSize`,
   `nGaps`, `synBuff`, and flags `maskTheseHits`, `onlyOgAnchors`), `pangenome`, and
   `plot_riparian`. `init_genespace` and `run_genespace` are NOT in this source (they are
   a later-version API).
