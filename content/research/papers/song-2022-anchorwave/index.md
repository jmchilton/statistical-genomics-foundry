---
title: "AnchorWave: Sensitive alignment of genomes with high sequence diversity, extensive structural polymorphism, and whole-genome duplication"
type: paper
source_id: song-2022-anchorwave
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC8740769/
doi: 10.1073/pnas.2113075119
version: "AnchorWave 1.0.0"
access_date: "2026-07-03"
license: CC-BY-NC-ND-4.0
attribution: "Song B, Marco-Sola S, Moreto M, Johnson L, Buckler ES, Stitzer MC. AnchorWave: Sensitive alignment of genomes with high sequence diversity, extensive structural polymorphism, and whole-genome duplication. PNAS 119(1):e2113075119, 2022. DOI 10.1073/pnas.2113075119. Read via PMC Open-Access BioC API; note records CC BY-NC-ND posture."
derived: own-words-summary
tags:
  - domain/genome-alignment
  - domain/comparative-genomics
  - domain/whole-genome-duplication
---

# Song et al. 2022 — AnchorWave (PNAS)

## 1. Citation
Song B, Marco-Sola S, Moreto M, Johnson L, Buckler ES, Stitzer MC. 2022. "AnchorWave:
Sensitive alignment of genomes with high sequence diversity, extensive structural polymorphism,
and whole-genome duplication." *PNAS* 119(1):e2113075119. doi:10.1073/pnas.2113075119.
Software version described in-paper: **AnchorWave version 1.0.0**.
Access date: 2026-07-03.

## 2. Access note
Publisher HTML (pnas.org) returned HTTP 403 to automated fetch. Full text read via the
PMC Open-Access BioC API (PMC8740769, unicode JSON). This includes the abstract, main text,
and the full Materials & Methods; it does **not** include the SI Appendix / Supporting Notes
1–11, figures S1–S10, or Tables S2–S5 (referenced but not retrieved). Statements attributed to
the SI here are only as summarized in the main text.

**License mode: OWN-WORDS.** PMC records the article license as **CC BY-NC-ND**, which
resolves to own-words-only in `license-policy.yml` (the NC condition would otherwise
propagate into casts). §7 is paraphrased; parameter names/numbers kept verbatim as facts.

## 3. Thesis
AnchorWave uses whole-genome-duplication–informed collinear anchors (derived from reference
coding sequences) to guide base-pair-resolution global alignment, giving more sensitive,
accurate whole-genome alignment for genomes with high sequence diversity, active transposons,
large size, inversions, and differing WGD histories than existing local-alignment tools.

## 4. Problem & context
Widely used local-alignment strategies often give limited or incongruous results on genomes with dispersed repeats, long indels, and highly diverse sequences. Many-to-many
or reciprocal-best-hit alignment conflicts with well-studied patterns between species that underwent different rounds of whole-genome duplication. Accurately aligning regulatory and transposon
sequence *outside* genes is stated as the remaining challenge. These complications are especially
common in plant genomes.

## 5. Method / approach
Pipeline (main-text Fig. 1 steps):
1. **Input:** reference genome (FASTA) + reference gene annotation (GFF3) + query genome (FASTA).
2. **Anchors = reference full-length CDS.** AnchorWave extracts the reference full-length coding
   sequence (CDS) to use as anchors.
3. **Liftover:** a splice-aware aligner (minimap2 used throughout the manuscript; GMAP also
   supported) lifts over the start/end positions of each reference full-length CDS to the query
   genome. minimap2 output is read from SAM.
4. **Collinear-anchor identification:** a longest-path dynamic-programming algorithm, chosen from
   **three user-specified options**:
   - (1) no inversions/rearrangements — end-to-end per homologous chromosome pair;
   - (2) inversions considered — end-to-end per homologous chromosome pair;
   - (3) **local** longest-path over anchors, identifying collinear blocks *without* requiring
     named homologous chromosome pairs — "the most flexible," recommended as the default when the
     user has limited background knowledge; may align fewer bp than (1)/(2). This third approach
     is the one that constrains alignment depth for WGD (see §6/§12).
5. **Novel anchors** are added inside long interanchor intervals via minimap2 `mm_map`
   (single-piece affine gap, local alignment), taking the primary alignment as a novel anchor;
   iterated until intervals are short enough, similarity drops below a threshold, or no matches remain.
6. **Base-pair alignment:** each anchor and interanchor interval is globally aligned with a
   **two-piece affine gap cost** strategy, implemented in the **WFA (Wavefront Algorithm)**
   library and used by default; falls back to minimap2 `ksw_extd2` (banded) or a sliding-window
   approximation when WFA memory would exceed the threshold set by `-w`.
7. **Output:** concatenated per-block alignment in **MAF (Multiple Alignment Format)**.

Commands: `genoAli` (with `-IV` for inversions between assemblies of the same species);
`proali` for cross-species / WGD-variant alignment.

**Named default parameters (verbatim):**
- `d` (chaining normalization) — default **3**; higher → more continuous chaining across gaps,
  may introduce false-positive chains.
- `D` (max anchor/gap span before a chain stops) — default **30**.
- `e` (number-of-mapping-hits threshold, tandem-dup filter) — default **1**.
- `y` (similarity-ratio threshold, tandem-dup filter) — default **0.6**.
- CDS exon records **< 20 bp** are ignored when extracting full-length CDS (user-settable), to
  avoid minimap2 small-exon misalignment.
- Novel-anchor similarity filter — default **0** (i.e., novel anchors are *not* filtered by
  similarity by default).
- `-w` (sliding-window size / min ksw_extd2 bandwidth) — set to **38,000** in this study.
- `-R`, `-Q` (reference/query max alignment depth) — see §6/§12. In the maize↔sorghum run,
  `proali ... -R 1 -Q 2`.
- `d`, `D`, `O`, `E` were set empirically, and default values were used throughout the manuscript.

## 6. Key claims / findings
- Aligning two maize genomes, AnchorWave recovered 87% of the previously reported TE
  PAVs (transposable-element presence/absence variants), where other tools showed low power.
- AnchorWave precisely aligns up to three times more of the genome as position matches or indels
  than the closest competing approach when comparing diverse genomes.
- Recalls transcription-factor–binding sites (TFBSs) at a rate 1.05- to 74.85-fold higher than
  other tools, with significantly lower false-positive alignments.
- Maize↔sorghum (WGD since divergence), run with `-R 1 -Q 2`: aligned position-match-or-indel
  proportion **3.4×** the second-highest (LAST many-to-many).
- Tomato→potato (tetraploid potato), letting each tomato anchor map to four potato anchors:
  AnchorWave aligned **63.5%** of tomato as position match/indel — ranked *third*, below LAST
  many-to-many (76.2%) and LAST many-to-one (66.5%).
- Zebrafish→goldfish (goldfish WGD ~14 Mya), letting each zebrafish anchor map to as many as two
  collinear blocks: aligned **~82.7%** of zebrafish, over twice the second-highest.
- Common bean→soybean (unshared allotetraploidy), letting each common bean anchor map to two
  soybean anchors: aligned **78.06%** of soybean — ranked highest.
- Collinearity detectable declines with divergence + WGD: maize↔rice 85.5% collinear; maize↔sorghum
  ~89% (3.5% higher than maize↔rice); Arabidopsis↔chocolate 61.8%, ↔grape 50.0%, ↔tomato only 36.3%
  (2 WGD + 1 triplication), maize↔banana only 11.6% (six rounds of WGD).
- Accessible-chromatin / regulatory regions aligned at higher match ratio than genome background
  (tomato 2.21×, soybean 1.82×).
- Resource cost: Arabidopsis↔Arabidopsis < 10 Gb RAM / minutes; maize↔sorghum required 85 Gb RAM
  and 130 h.

## 7. Load-bearing statements (own-words — CC BY-NC-ND is own-words-only per license-policy.yml; functional strings kept verbatim as facts)
1. **`-R`/`-Q` semantics (the WGD/ploidy control):** the alignment-depth thresholds are set by the
   parameters `-R` and `-Q`, which cap alignment depth for the reference and query genome
   respectively; they matter most when reference and query differ in WGD history. (Methods)
2. **Worked WGD example:** because maize carries one extra round of WGD relative to sorghum, the maize
   (reference) depth is set to 1 and the sorghum (query) depth to 2 — i.e. `-R 1 -Q 2` to align sorghum
   against maize. (Methods)
3. **Depth counting during chaining:** every reference and query anchor falling within a chain's range
   is counted (a reference anchor with multiple hits in that range counts once); anchor matches whose
   chain ranges exceed the settable alignment-depth threshold are marked and dropped from the next
   iteration. (Methods)
4. **Anchors = reference CDS:** AnchorWave takes the reference genome sequence plus gene annotation and
   extracts full-length coding sequences (CDS) to serve as anchors. (Results)
5. **Small-exon / CDS limitation:** when extracting full-length CDSs, AnchorWave ignores CDS exon
   records shorter than 20 bp (a user-settable limit) because minimap2 misaligns small exons; all
   exons can be retained when a more accurate splice-aware aligner (e.g. GMAP) is used for lift-over.
   (Methods)

## 8. Stated scope, assumptions, limitations
- **Assumes** the paired sequences in each anchor/interanchor region descend from a common
  ancestor (basis for global alignment).
- Requires a **reference gene annotation (GFF3)** — anchors come only from annotated CDS.
- **Identical full-length CDS across genes are dropped** (ambiguous mapping), so highly duplicated
  gene families lose anchors.
- Approaches (1) and (2) require chromosome-level assemblies with identically named homologous
  chromosomes; approach (3) does not but may produce alignments covering fewer base pairs.
- Interanchor regions lacking sufficient homology are only **approximately** aligned (banded /
  sliding window), not exactly.
- Execution time can be high for some experiments.
- `d`, `D`, `O`, `E` were tuned empirically by eyeballing dot plots for the manuscript genomes;
  defaults were used throughout but their optimality on other genomes is not established.

## 9. Failure modes / invalidity patterns
- **Insufficient anchors → structural variants aligned as indels.** local duplications or
  translocations that lack enough anchors to be recognized as a collinear block are expected to be
  aligned as indels. Sparse-annotation or highly diverged regions therefore under-resolve.
- **Regions with no anchor (e.g. gene-poor / intergenic-only stretches)** rely on interanchor
  alignment; long, low-homology interanchor intervals get approximate (banded/sliding-window)
  alignment rather than exact WFA. (Intergenic resolution is the stated challenge the method targets
  but it is anchor-dependent — no gene nearby ⇒ weaker resolution. [summarizer-inferred] that this
  is the practical failure surface; the source states the anchor dependence and the approximate
  fallback but does not frame "intergenic-only region" as a labeled failure mode.)
- **Inversions at block ends drop sequence:** when the first collinear anchor is on the negative
  strand, the sequence upstream of that first anchor is left unaligned; when the last collinear anchor
  is on the negative strand, the sequence downstream of that last anchor is left unaligned.
- **Sequences between two anchors on opposite strands are skipped** at the base-pair step.
- **Identical CDS families are silently ignored** → their genomic copies lose anchor coverage.
- **Wrong `-R`/`-Q` (ploidy) setting:** the paper does **not** state an explicit symptom or error
  for a mis-set alignment depth. Mechanistically it describes depth as a *cap*: `-R`/`-Q` bound how
  many collinear paths each anchor may define, and anchor matches exceeding the depth threshold are
  flagged and dropped from the next round of iteration. [summarizer-inferred] a too-low
  depth would leave true homologous copies unmatched (under-alignment) and a too-high depth would
  admit extra paths (over-alignment); the source does not spell this out or name a diagnostic.
- **No hard "insufficient memory" guard in AnchorWave itself is described**, but the WFA→ksw_extd2→
  sliding-window fallback exists precisely because WFA memory can blow up on long low-homology
  intervals. (The reported `insufficient memory` error at 2 TB was minimap2 `asm20`, not AnchorWave.)

## 10. What the source does NOT address
- **No `--ploidy` parameter.** The WGD/ploidy control is exposed strictly as `-R` (reference max
  alignment depth) and `-Q` (query max alignment depth). No long-option `--ploidy` name appears in
  the main text or Methods (SI not read).
- **No stated minimum anchor sequence-identity threshold** (no 80%, and no other %). See §12.
- No explicit statement of what a *wrong* ploidy/depth setting produces (no named error, no
  diagnostic metric).
- No guidance for genomes *lacking* a gene annotation.
- Does not cover haplotype/heterozygosity resolution beyond the polyploid liftover examples.

## 11. Open questions / ambiguities
- How to *choose* `-R`/`-Q` when the WGD history is unknown a priori (paper sets them from known
  lineage history in every example).
- What the tandem-dup similarity-ratio `y` (0.6) and hits `e` (1) defaults do to sensitivity on
  gene-family-rich genomes.
- Whether any minimum on `matchScore` (CDS liftover similarity) gates anchor acceptance — only the
  tandem-dup *ratio* filter and novel-anchor filter (default 0) are described.

## 12. Guidance answers
**Q: How does proali use `--ploidy` to handle WGD; quote that each query CDS/anchor is matched to
ploidy-many reference regions.**
There is **no `--ploidy` parameter** in this source. The equivalent control is the pair `-R`
(reference max alignment depth) and `-Q` (query max alignment depth) — see §7 quotes 1–3. The
"each anchor matched to N regions" idea is expressed operationally via depth and the worked
examples, e.g. maize↔sorghum "`-R 1 -Q 2`" (maize depth 1, sorghum depth 2), tomato→potato
letting each tomato anchor map to four potato anchors, zebrafish→goldfish up to two
collinear blocks, common bean→soybean two soybean anchors. Formal statement: `-R` sets the
maximum alignment depth for the reference genome, and `-Q` sets the maximum alignment depth for the
query genome. **Flag for the skill:** the skill's `proali --ploidy` phrasing does not match this
paper's interface (`-R`/`-Q`); verify against the current AnchorWave CLI/version — a `--ploidy`
option, if it exists, is a later addition not documented here (v1.0.0).

**Q: Does the paper state a minimum anchor identity (skill claims 80% default)?**
**No.** No 80% and no minimum anchor-identity threshold is stated. The identity-adjacent
parameters actually present are: the tandem-duplication **similarity-ratio threshold `y` = 0.6 by
default** (ratio of the e+1-th hit similarity to the top-hit similarity — a *relative* filter, not
an absolute identity floor); the **mapping-hits threshold `e` = 1**; the **novel-anchor similarity
filter defaulting to 0** (by default, novel anchors are not filtered by similarity); and the
**< 20 bp exon** exclusion. `matchScore` is defined as CDS liftover sequence similarity but no
absolute minimum on it is stated as an anchor-acceptance cutoff. **Record the 80% claim as
unsupported by this source.**

**Q: CDS/exon-anchor method + WFA extension + intergenic-resolution limitation.**
Anchors are reference **full-length CDS**, lifted over by splice-aware minimap2/GMAP (§7 quote 4);
base-pair alignment uses the **two-piece affine gap cost in the WFA library by default**, with
ksw_extd2/sliding-window fallback. Stated CDS-side limitation: exons < 20 bp ignored to dodge
minimap2 small-exon misalignment (§7 quote 5). Intergenic/nongenic accuracy is the *goal* but is
**anchor-dependent** — regions without enough anchors are aligned as indels, and long low-homology
interanchor intervals get only approximate alignment (§9). The source does not give a numeric
intergenic-resolution limit.

**Q: What does wrong ploidy produce? Quote if stated.**
**Not stated.** No verbatim symptom, error, or diagnostic for a mis-set `-R`/`-Q` appears in the
read text. Only the depth-as-cap mechanics are given (§7 quote 3, §9). Any under-/over-matching
consequence is [summarizer-inferred], not quoted.

**Version-pinning note:** paper describes **v1.0.0**; guidance/skill target **1.2.5+**. Interface
differences (e.g. a possible `--ploidy` alias, changed defaults) between v1.0.0 and 1.2.5+ are
**not covered by this source** and must be re-checked against the pinned release.
