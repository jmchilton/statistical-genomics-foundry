# SyRI (Goel et al. 2019) — source note

## 1. Citation
Goel M, Sun H, Jiao W-B, Schneeberger K. 2019. "SyRI: finding genomic
rearrangements and local sequence differences from whole-genome assemblies."
*Genome Biology* 20:277. doi:10.1186/s13059-019-1911-0.
- PMID 31842948; **PMCID PMC6913012** (open access).
- License: Genome Biology is CC BY 4.0 → short verbatim load-bearing quotes permitted.

> **PMC-ID correction:** the invocation gave `PMC6912966`; that ID resolves to an
> unrelated cardiomyopathy review (van Waning et al., *JAHA*), not SyRI. The correct
> SyRI PMCID (via Europe PMC DOI lookup) is **PMC6913012**. This note summarizes
> PMC6913012.

## 2. Access note
Read the full-text XML via Europe PMC REST (`.../PMC6913012/fullTextXML`), including
figure legends for Figs 1–3. Supplementary files (Additional file 2, e.g. Table S3 with
exact aligner command lines) were NOT retrieved — those specifics are marked ABSENT/
"in supplement" below. No paywall on the main article.

## 3. Thesis (1 sentence)
SyRI is a pairwise whole-genome-comparison tool for chromosome-level assemblies that
first identifies structural rearrangements (inversions, translocations, transpositions,
duplications) and then the local sequence differences within them, distinguishing
whether each difference resides in a syntenic vs a rearranged region — a distinction that
matters because rearranged regions are inherited differently.

## 4. Problem & context
Existing methods annotate SNP-to-large-indel differences accurately but "do not unravel
the full complexity of structural rearrangements, including inversions, translocations,
and duplications, where highly similar sequence changes in location, orientation, or copy
number" (Abstract). SyRI's premise: with two chromosome-level assemblies available, one
can identify ALL differences (structural + sequence) and their breakpoints, rather than
inferring SVs indirectly from reads.

## 5. Method / approach
**Input:** "SyRI expects whole-genome alignments (WGA) as input." A WGA = a set of local
alignments, each connecting a region in one genome to a region in the other.
- Aligner used: **MUMmer3 toolbox** (nucmer). "Nucmer was run with `--maxmatch` to get
  all alignments between two genomes and also included `-c`, `-b`, and `-l` parameters"
  (values chosen to balance resolution/runtime; **full commands in Additional file 2:
  Table S3 — not retrieved here**). nucmer output is post-processed with delta-filter and
  show-coords into tab-delimited coords.
- "other alignment tools like minimap2 [18] can be used as well." Paper does not, in the
  retrieved main text, document direct SAM/BAM ingestion or a `-F`/format flag → see §9/§12.

**Three-step algorithm (Fig 2):**
- **Step 1 — syntenic path.** "SyRI identifies the highest scoring syntenic path between
  the corresponding genomes." "The syntenic path represents the longest set of
  non-rearranged regions between two genomes." Implemented via dynamic programming from
  nodes at one chromosome end to nodes at the other end. "Since all non-syntenic regions
  are rearranged by definition, identifying syntenic regions identifies rearranged regions
  at the same time."
- **Step 2 — classify rearrangements.** Remaining (off-path) alignments split into
  structural rearrangements vs redundant alignments. "Structural rearrangements (green
  alignments) are classified into inversions, transpositions, and duplications, and finally
  inter-chromosomal rearrangements." "Low scoring candidates and those that are
  overlapping with syntenic or inverted regions are filtered out."
- **Step 3 — local variations.** "Local differences in the sequences are identified in all
  syntenic and rearranged regions. SNPs and small indels are parsed directly from the local
  alignments, whereas more complex sequence variations (e.g., like large indels and CNVs)
  are identified in the overlaps and gaps between consecutive local alignments." "all
  non-aligned regions in between syntenic and rearranged regions are reported for
  completeness."

**Terminology:** "For simplicity, unless specified otherwise, we refer to transpositions
and translocations together as 'translocations'." (Transposition = intra-chromosomal,
translocation = inter-chromosomal is the conventional reading and consistent with Fig 2's
separate "inter-chromosomal rearrangements" step, but the paper does not spell out that
intra/inter distinction in the retrieved text — `[summarizer-inferred]`.)

## 6. Key claims / findings
- "SyRI ... is the first tool to identify all structural and sequence differences between
  two chromosome-level genome assemblies."
- "SyRI annotates the coordinates of rearranged regions (i.e., breakpoints on both sides
  of a rearrangement in both genomes)."
- Experimental validation: "Out of 117 translocations, 108 (92.3%) could be confirmed by
  at least one test." (These 117 translocations were "larger than 1 kb" — see §12 Q4.)
- Runtime/memory: "For the two human genomes SyRI took ~ 10 min, while memory usage was
  less than 1 GB for each."
- Benchmark: compared on 100 simulated genomes against six tools — **AsmVar, Smartie-sv,
  Assemblytics, Sniffles, Picky, LUMPY** (Fig 3). Indel sensitivity/precision evaluated at
  two error limits, **5 bp and 100 bp**. "Not Applicable" = tool not designed for that
  difference type.
- Requirement (explicit): "SyRI requires whole-genome alignments from chromosome-level
  assemblies as input."
- Incomplete-assembly path: "If one or both of the assemblies is/are incomplete,
  pseudo-chromosomes can be generated using homology between the assemblies themselves or
  using homology to a chromosome-level reference sequence." And: prediction of genomic
  rearrangements "is nearly complete even if one of the genomes is not on chromosome-level,
  but has assembly contiguity of N50 > 500 kb."

## 7. Load-bearing statements — VERBATIM (CC BY, reproduction permitted)
1. "SyRI expects whole-genome alignments (WGA) as input" — Methods/Fig 2.
2. "The syntenic path represents the longest set of non-rearranged regions between two
   genomes." — Fig 2 legend.
3. "Since all non-syntenic regions are rearranged by definition, identifying syntenic
   regions identifies rearranged regions at the same time." — Results.
4. "SyRI requires whole-genome alignments from chromosome-level assemblies as input." —
   Discussion/limitations.
5. "SNPs and small indels are parsed directly from the local alignments, whereas more
   complex sequence variations (e.g., like large indels and CNVs) are identified in the
   overlaps and gaps between consecutive local alignments." — Fig 2 legend / Step 3.

## 8. Stated scope, assumptions, limitations (source's own)
- Pairwise only (two genomes at a time); designed for **chromosome-level** assemblies.
- Requires a WGA as input; the tool consumes alignment coordinates, not raw reads.
- For incomplete input, the user must first build pseudo-chromosomes (via mutual homology
  or homology to a chromosome-level reference); SyRI does not scaffold for you.
- Rearrangement calling degrades gracefully: "nearly complete" when one genome is only at
  N50 > 500 kb, i.e. below chromosome-level but still highly contiguous.

## 9. Failure modes / invalidity patterns
- **Non-chromosome-level input without pseudo-chromosomes.** SyRI's syntenic-path spine
  runs between the two ends of a chromosome; fragmented/contig input breaks this. The
  stated remedy is pseudo-chromosome construction. (Paper frames this as a requirement, not
  a warned-against silent failure.)
- **Filtering of ambiguous rearrangement candidates:** "Low scoring candidates and those
  that are overlapping with syntenic or inverted regions are filtered out." → real
  rearrangements overlapping syntenic/inverted blocks can be dropped; conversely this is
  the paper's stated guard against spurious calls.
- **Alignment-quality dependence** `[summarizer-inferred]`: because SyRI consumes a WGA,
  its output inherits the underlying aligner's errors; the paper does not, in the retrieved
  text, give an explicit caveat quantifying false-positive rates per rearrangement class.
- **No explicit false-positive-inversion / over-calling caveat** in the retrieved main text
  (see §12 Q6, ABSENT).

## 10. What the source does NOT address (in retrieved text)
- An enumerated table of output annotation abbreviations (SYN/TRANS/INVTR/DUP/INVDP/CPG/
  CPL/NOTAL/TDM, etc.) — NOT present in the paper prose or figure legends retrieved (§12 Q2).
- Output filenames `syri.out` / `syri.vcf` and their column schema — NOT named in the
  retrieved main text (§12 Q7); these are software-documentation artifacts.
- A minimum size threshold for calling inversions or duplications (§12 Q4).
- Direct SAM/BAM input handling / a `-F` format flag (§12 Q1) — the guidance's `-F B` = BAM
  is a software-CLI detail, not stated in the paper.
- Exact nucmer `-c/-b/-l` values (deferred to Additional file 2: Table S3, not retrieved).

## 11. Open questions / ambiguities
- Precise intra- vs inter-chromosomal definitions for "transposition" vs "translocation"
  (paper collapses them under "translocations" for simplicity).
- Whether the abbreviation set + `syri.out`/`syri.vcf` schema the guidance expects come
  from the SyRI software docs/README rather than this paper (they are not in the article).

## 12. Guidance answers
**Q1 — Input & aligners / flags.** Input = whole-genome alignments (WGA). Aligner: MUMmer3
**nucmer run with `--maxmatch`** plus `-c`, `-b`, `-l` (exact values in Additional file 2:
Table S3, not retrieved); coords produced via delta-filter/show-coords. minimap2 "can be
used as well." The paper's retrieved text does NOT document a BAM/SAM path or the
`-c/-r/-q/-F/--prefix/-k` CLI flags — those are **SyRI-software CLI details, not paper
content** (so `-F B` = BAM cannot be confirmed from this source; ABSENT here).

**Q2 — Structural-variant abbreviation set (must-extract).** **The paper does NOT enumerate
the abbreviation set.** Retrieved prose/figures use full words ("inversions,"
"transpositions," "translocations," "duplications," "syntenic," "highly divergent regions,"
"non-aligned regions") plus a few abbreviations: **INV, DUP, HDR, SNP, WGA, CNV**. The
guidance's expected set — **SYN, INV, TRANS, INVTR, DUP, INVDP, INS, DEL, HDR, CPG, CPL,
NOTAL, TDM** — is **ABSENT from this paper**; it is a SyRI-output/documentation convention
that must be sourced from the tool's docs/README, not from Goel 2019. (Faithful negative:
do not attribute that table to this paper.)

**Q3 — Syntenic-path algorithm.** SyRI finds "the highest scoring syntenic path" — "the
longest set of non-rearranged regions between two genomes" — by dynamic programming from
one chromosome end to the other; then, because "all non-syntenic regions are rearranged by
definition," everything off-path is a rearrangement, classified into inversions,
transpositions, duplications, and inter-chromosomal rearrangements (Step 2). See §5 quotes.

**Q4 — Minimum size for inversion/translocation/duplication.** **ABSENT.** The paper states
**no** minimum-size threshold for inversions or duplications. The only size figure is
descriptive of a validation set: "Out of 117 translocations" that "were larger than 1 kb"
— this is the size of the experimentally-tested translocations, NOT a calling threshold.
→ Any skill's "≥ 5 kb (biological significance)" inversion cutoff is **NOT supported by
this paper**; treat it as convention/software-default, not a Goel-2019 claim.

**Q5 — Chromosome-level requirement.** YES, stated: "SyRI requires whole-genome alignments
from chromosome-level assemblies as input." Fragmented/contig-level input: build
**pseudo-chromosomes** first (via mutual homology or homology to a chromosome-level
reference). Rearrangement prediction is "nearly complete even if one of the genomes is not
on chromosome-level, but has assembly contiguity of N50 > 500 kb." The retrieved text does
NOT explicitly require equal chromosome counts or identical chromosome IDs — ABSENT (not
stated either way).

**Q6 — False-positive / inversion over-calling caveat.** **No explicit caveat** on
inversion over-calling or strand/assembly artifacts in the retrieved main text (ABSENT).
The nearest stated control is the Step-2 filter: "Low scoring candidates and those that are
overlapping with syntenic or inverted regions are filtered out." Validation reports 92.3%
(108/117) translocations confirmed — evidence of low FP for translocations, but nothing
inversion-specific.

**Q7 — Output files & column semantics.** The retrieved paper text does NOT name
`syri.out` or `syri.vcf` nor describe their columns (ABSENT). It states only that SyRI
"annotates the coordinates of rearranged regions (i.e., breakpoints on both sides of a
rearrangement in both genomes)." Output-file/format specifics must come from the SyRI
software docs, not this article.

design-inference: none in this file (kept separate per convention).
