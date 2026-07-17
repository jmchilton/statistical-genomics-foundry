---
title: "Minimap2: pairwise alignment for nucleotide sequences"
type: paper
source_id: li-2018-minimap2
source_url: https://arxiv.org/abs/1708.01492
doi: 10.1093/bioinformatics/bty191
version: "arXiv:1708.01492v5; minimap2 manual 2.28"
access_date: "2026-07-03"
license: LicenseRef-arXiv-nonexclusive-distrib-1.0
attribution: "Li H. Minimap2: pairwise alignment for nucleotide sequences. Bioinformatics 34(18):3094-3100, 2018. DOI 10.1093/bioinformatics/bty191. Read from arXiv:1708.01492v5 via ar5iv plus minimap2 manual v2.28 for preset table; summarized in own words."
derived: own-words-summary
tags:
  - domain/genome-alignment
---

# Li 2018 — Minimap2: pairwise alignment for nucleotide sequences

## 1. Citation
Li H. 2018. "Minimap2: pairwise alignment for nucleotide sequences." *Bioinformatics*
34(18):3094–3100. doi:10.1093/bioinformatics/bty191. Preprint: arXiv:1708.01492 (v5, last
revised 16 Mar 2018). Software man page consulted for the preset table: minimap2 manual at
https://lh3.github.io/minimap2/minimap2.html, documenting version **minimap2-2.28-dirty (r1237)**
(access date 2026-07-03).

## 2. Access note
The OUP published version is paywalled (all-rights-reserved). Content below is drawn from the
**arXiv preprint (1708.01492 v5)** via the ar5iv HTML rendering plus the **authoritative online man
page** (minimap2-2.28). The preprint body was read through ar5iv, which may drop equations/tables
imperfectly — some formula terms marked accordingly. The preset→divergence numbers and per-preset
`-k`/`-w` values come from the **man page (v2.28)**, NOT the 2018 paper text; the paper text does not
enumerate the asm5/asm10/asm20 presets (see §12). Mode: **own-words paraphrase** (restrictive
posture); functional strings (preset names, flag values, %) kept verbatim as facts.

## 3. Thesis
Minimap2 is a single general-purpose alignment program that maps DNA or long mRNA against a large
reference across regimes — accurate short reads, noisy long reads, spliced cDNA/Direct-RNA, and
whole assembly contigs — while being several-fold to tens-of-fold faster than tools specialized in
any one of those regimes at comparable or better accuracy.

## 4. Problem & context
New sequencing produces ultra-long reads (~100 kb average), full-length mRNA/cDNA reads, and
assembly contigs over 100 Mb. Existing aligners were unable or too slow to process such data at
scale. The paper positions minimap2 as the replacement for that gap and as a unifier across read
types that previously each needed a specialized aligner.

## 5. Method / approach
- **Minimizer seeding.** Seeds are **minimizers** — fixed-length k-mers chosen by a rolling hash as
  the smallest k-mer within each window. Reference minimizers are stored in a hash table keyed by
  the minimizer hash, value = list of reference locations. (Default seeding, no preset: **-k 15**,
  **-w 10**, i.e. 15 bp minimizers, window 10.)
- **Chaining.** Colinear anchors (seed matches) are grouped into **chains** by dynamic programming,
  scoring matched bases and penalizing gaps with a **concave gap cost**. A chaining heuristic keeps
  up to h = 50 predecessor iterations.
- **Base-level (DP) alignment.** Dynamic programming extends from chain ends and fills gaps between
  adjacent anchors, with a **2-piece affine (concave) gap cost** that recovers long INDELs; default
  banding width ~500 bp.
- **Spurious-alignment heuristics.** (a) **Z-drop** — break an alignment where the score drops too
  fast; (b) drop anchors that would imply a long insertion and long deletion (>~10 bp each) at the
  same position; (c) the 2-piece gap cost to recover longer INDELs.
- **Homopolymer-compressed (HPC) k-mers** (optional, for noisy reads): collapse homopolymer runs
  before taking minimizers; used with **-k 19** (map-pb uses `-Hk19`).
- **Divergence estimate.** Approximates per-base error/divergence from seed statistics; ar5iv
  rendered the estimator as roughly ε̂ = (1/k)·log(n/m) [ar5iv-rendered form; verify against PDF].
  The paper flags this estimate as "only approximate and can be biased," with assumptions violated
  "especially when we take minimizers as seeds."

## 6. Key claims / findings
- Works across regimes: accurate short reads **≥100 bp**; genomic reads **≥1 kb** at error rate
  **~15%**; full-length noisy Direct-RNA/cDNA; assembly contigs / near-complete chromosomes of
  hundreds of Mb.
- Speed: **3–4×** as fast as mainstream short-read mappers (Bowtie2, BWA-MEM) at comparable
  accuracy; **≥30×** faster at higher accuracy for genomic and mRNA long reads.
- Long-read (simulated human): **>30×** faster than BLASR/GraphMap/NGMLR; real ONT ~100 kb reads
  **>70×** faster than some aligners; ~200 CPU seconds on the simulated dataset.
- Spliced (mouse cDNA): **>40×** faster than GMAP and SpAln; **94.0%** of introns exactly correct.
- Assembly (SMRT assembly vs GRCh38): **~20×** faster than nucmer.
- HPC k-mers raised SMRT overlap sensitivity from **90.9%** to **97.4%**.

## 7. Load-bearing statements (own-words paraphrase; functional strings verbatim)
- On low identity, the paper states in effect that long exact seeds are rarely present anyway —
  paraphrase of "At low sequence identity, it is rare to see long seeds anyway." (No numeric
  identity floor is given; see §9/§12.)
- The divergence estimator is only approximate and can be biased, with its assumptions violated
  especially when minimizers are used as seeds (paraphrase).
- Man page (v2.28), verbatim functional strings for the assembly presets:
  - **asm5**: "Typically, the alignment will not extend to regions with 5% or higher sequence
    divergence. Use this preset if the average divergence is not much higher than 0.1%."
    Expansion: `-k19 -w19 -U50,500 --rmq -r1k,100k -g10k -A1 -B19 -O39,81 -E3,1 -s200 -z200 -N50`
  - **asm10**: "Use this if the average divergence is around 1%."
    Expansion: `-k19 -w19 -U50,500 --rmq -r1k,100k -g10k -A1 -B9 -O16,41 -E2,1 -s200 -z200 -N50`
  - **asm20**: "Use this if the average divergence is around several percent."
    Expansion: `-k19 -w10 -U50,500 --rmq -r1k,100k -g10k -A1 -B4 -O6,26 -E2,1 -s200 -z200 -N50`

## 8. Stated scope, assumptions, limitations
- Targeted at DNA and long mRNA mapping against a large reference; long-read regime assumes error
  rate ~15% (genomic) / ~10% (map-ont default mode, per man page).
- The divergence/error estimate is explicitly approximate and biased; not a calibrated identity
  measurement.
- Preset guidance is expressed as *average divergence* recommendations, not hard validity bounds.

## 9. Failure modes / invalidity patterns
- **Low sequence identity → seed scarcity.** As identity falls, long exact (or HPC) minimizer seeds
  become rare, so seeding sensitivity degrades. The paper names the mechanism qualitatively ("it is
  rare to see long seeds anyway") but gives **no numeric identity/divergence floor**.
- **Preset/divergence mismatch (man page, v2.28).** asm5 alignment "will not extend to regions with
  5% or higher sequence divergence" — using asm5 on more-divergent input will truncate/miss
  divergent regions. Remedy is to move up the preset ladder (asm10 ~1%, asm20 ~several %) as average
  divergence rises.
- **Biased divergence estimate.** The reported per-base divergence can be biased, particularly
  because minimizers (not all k-mers) are the seeds — do not treat it as an exact identity readout.
- **Z-drop / long-INDEL filters** exist precisely because naive extension produces spurious
  alignments across INDELs; they are the named detectors for that failure.

## 10. What the source does NOT address
- No stated numeric **identity floor** (e.g. the "~70% identity" figure some downstream skills cite)
  — neither the paper nor the man page gives such a threshold. Recorded as **absent**.
- The 2018 paper text does not enumerate the named `-x` presets (asm5/asm10/asm20, map-ont, map-pb,
  map-hifi) — those live in the man page / software, not the paper body.
- No treatment of protein alignment or short-read pair/insert-size modeling in depth here.

## 11. Open questions / ambiguities
- The asm5/10/20 **names**: the man page only spells out the "5% or higher" extension ceiling for
  **asm5**; it does not verbatim state 10%/20% ceilings for asm10/asm20. The 10/20 in the names is
  a natural reading of an extension ceiling but is **not stated verbatim** — asm10/asm20 are
  described by *average* divergence (~1%, ~several %) instead. [summarizer-inferred that the numeric
  suffix tracks an extension ceiling; source does not confirm for asm10/asm20.]
- Exact divergence estimator form uncertain from ar5iv rendering; confirm against the published PDF.

## 12. Guidance answers
- **What divergence does each asm preset target?** From the **man page (v2.28)**: asm5 — align does
  not extend past **5%** divergence, recommended when average divergence is "not much higher than
  **0.1%**"; asm10 — average divergence "around **1%**"; asm20 — average divergence "around
  **several percent**." These are man-page numbers, **not** paper-body numbers. Note the nuance: the
  named number (5/10/20) is an *extension ceiling* (explicit only for asm5), while the usage
  recommendation is a much lower *average* divergence — so "asm5 = 5% data" would misread the
  source; asm5 is recommended for ~0.1%-average data whose alignments won't extend past 5%.
- **Identity/divergence floor below which seeding loses sensitivity?** The paper states the
  mechanism ("At low sequence identity, it is rare to see long seeds anyway") but gives **no numeric
  floor**. The often-cited **~70% identity** cutoff is **NOT present** in the paper or the man page.
  Recorded as absent, not confirmed.
- **-k / -w defaults.** No preset (map-ont default mode): **-k 15**, **-w 10** (man page). Assembly
  presets (man page v2.28): asm5 **-k19 -w19**; asm10 **-k19 -w19**; asm20 **-k19 -w10**. map-pb
  expands to **-Hk19** (HPC, k=19). Full preset expansion strings captured verbatim in §7.
- **Presets validated only up to a stated divergence ceiling?** The only explicit ceiling statement
  is asm5's "will not extend to regions with 5% or higher sequence divergence." No general
  "validated up to X" claim is made for the others.
- **Version pinning.** The preset table/divergence wording above is from **minimap2-2.28-dirty
  (r1237)**. The 2018 paper (arXiv v5) predates and does not carry this table. A skill pinning
  "2.28+" is consistent with the man-page source used here.
