---
type: mold
name: audit-synteny-claim
tags:
  - family/b
  - role/critique
  - domain/synteny
  - domain/structural-variation
references:
  - kind: research
    ref: "[[wang-2012-mcscanx]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim rests on MCScanX collinear blocks, its gene classifier, or tandem handling"
    mode: condense
    evidence: corpus-observed
    purpose: "MCScanX defaults (match 50 / gap -1 / gaps <25 / block score >250 = >=5 pairs / E 1e-5), tandem-collapse-within-5-genes, and WGD/tandem/proximal/dispersed classifier — grounds the block-count, tandem-inflation, and TE-anchor gates. Note quantifies NO TE inflation fold."
  - kind: research
    ref: "[[tang-2008-jcvi]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim rests on MCScan (2008) blocks, depth/multiplicity, or a cscore stringency argument"
    mode: condense
    evidence: corpus-observed
    purpose: "Original MCScan cutoffs (score >300, E<1e-10, tandem <50 kb, BLASTP best-5 E<=1e-5) and depth-read-against-per-lineage-history. Anchors the WGD-depth and stringency gates; establishes cscore is ABSENT from the paper (JCVI-software only)."
  - kind: research
    ref: "[[lovell-2022-genespace]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim rests on GENESPACE riparian/pan-gene synteny or an orthogroup-constrained block set"
    mode: verbatim
    evidence: corpus-observed
    purpose: "GENESPACE defaults (blkSize=5 UNIQUE HITS not orthogroups, nGaps=5, synBuff=100), pinned OrthoFinder v2.5.4, optional onlyOgAnchors — grounds stringency-divergence and micro/macro gates and the 'blkSize unit' anti-invention check."
  - kind: research
    ref: "[[goel-2019-syri]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim is an SV inventory (INV/TRANS/DUP) or a 'rearrangement' call from SyRI"
    mode: verbatim
    evidence: corpus-observed
    purpose: "SyRI requires chromosome-level input, degrades at N50>500kb, states NO minimum inversion/SV calling size. Anchors the fragmented-assembly and small-INV gates; the SV-abbrev set + CLI flags are software-doc not paper."
  - kind: research
    ref: "[[fitch-1976-synteny]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim leans on a synteny-vs-collinearity definitional citation"
    mode: condense
    evidence: corpus-observed
    purpose: "The cited 'Fitch 1976 J Mol Evol 7:271' does NOT resolve (=Zuckerkandl); no clean in-corpus primary for the synteny/collinearity distinction. Grounds the terminology/citation-precision anti-invention gate."
  - kind: research
    ref: "[[song-2022-anchorwave]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim involves WGD/polyploidy, alignment depth, or an AnchorWave --ploidy citation"
    mode: condense
    evidence: corpus-observed
    purpose: "AnchorWave controls WGD depth via -R/-Q (there is NO --ploidy flag in the paper); anchors=reference CDS. Grounds the WGD 1:many gate and the --ploidy confabulation flag."
  - kind: research
    ref: "[[li-2018-minimap2]]"
    used_at: runtime
    load: on-demand
    trigger: "when the underlying WGA used minimap2 and the claim is a 'synteny/alignment absent' conclusion"
    mode: condense
    evidence: corpus-observed
    purpose: "asm5/asm10/asm20 preset divergence ceilings (asm5 won't extend past 5% divergence); NO ~70% identity floor. Grounds 'false absence from aligner sensitivity below threshold' in the fragmentation/loss gate."
  - kind: research
    ref: "[[marcais-2018-mummer4]]"
    used_at: runtime
    load: on-demand
    trigger: "when the underlying WGA used nucmer/MUMmer (incl. SyRI's aligner)"
    mode: condense
    evidence: corpus-observed
    purpose: "nucmer --maxmatch recovers repeat/non-unique anchors (default seeds unique-in-reference miss them); NO >=70% identity floor in the paper. Grounds aligner-sensitivity and repeat-mode checks."
  - kind: research
    ref: "[[kent-2003-chain-net]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim rests on chained/netted alignments or a directional 'synteny' subset"
    mode: condense
    evidence: corpus-observed
    purpose: "Masking BEFORE alignment (RepeatMasker transposons + Tandem Repeat Finder period <=12); net asymmetry (human-net != mouse-net, target-net != query-net). Grounds the masking and reference-directional-bias gates; NO 5000-bp chain cutoff (UCSC convention)."
  - kind: research
    ref: "[[armstrong-2020-cactus]]"
    used_at: runtime
    load: on-demand
    trigger: "when the sequence-level synteny substrate is a reference-free WGA (Cactus/HAL)"
    mode: condense
    evidence: corpus-observed
    purpose: "Soft-masking is a stated precondition (unmasked repeats blow up and degrade quality; self-align coverage>50 mitigation); reference-free substrate. Grounds the masking-precondition gate; tolerates poor assemblies but states NO fragmentation-to-false-loss threshold."
---

# audit-synteny-claim

Referee a synteny / rearrangement conclusion. Input: a synteny result (collinear
blocks, syntelogs, an SV inventory INV/TRANS/DUP, a "synteny lost between X and Y"
claim, a riparian/dotplot conclusion) plus the biology drawn from it. Output: a
verdict — is the conclusion a **synteny/rearrangement artifact rather than biology**?

Cardinal sin: **an artifact read as synteny biology.** Every gate below screens one
sub-form. A conclusion that survives an unmasked/fragmented/circular pipeline, or that
flips with tool stringency, is not certified — it is flagged.

## Gate 0 — provenance + claim restatement
Do not evaluate biology until the pipeline is on the table. Capture, or mark UNKNOWN:
1. **Tool + version** that produced the result (MCScanX / MCScan-2008 / GENESPACE /
   SyRI / AnchorWave / chain-net / Cactus / other).
2. **Anchor level** — gene-order (BLASTP/DIAMOND anchors + GFF) vs sequence-level WGA.
3. **Masking status** of both inputs — were transposons + simple/tandem repeats masked
   BEFORE anchoring/alignment? (RepeatMasker + Tandem Repeat Finder period <=12; Cactus
   soft-mask precondition.) UNKNOWN = treat as unmasked until shown otherwise.
4. **Assembly contiguity** of both genomes — chromosome-level? contig N50? scaffolded,
   and if so, **against what reference?**
5. **Aligner + preset** (for WGA substrates) — minimap2 asm5/asm10/asm20, nucmer mode.
6. **WGD/ploidy history** of the pair, and the depth setting used (AnchorWave -R/-Q).
7. **Stringency knobs** actually set (block-size, cscore, onlyOgAnchors, E-value).
8. **Restate the claim** as one testable proposition ("synteny between X and Y is lost
   in region R" / "R is an inversion in Y relative to X" / "this block is collinear").
   If nothing was actually claimed, STOP — nothing to referee.

If tool, masking, contiguity, or (for WGA) preset is UNKNOWN and load-bearing for the
claim → the conclusion is **not certifiable**; report the missing provenance as the
blocker.

## Gate 1 — route by synteny method
- **Gene-order anchor tools** (MCScanX, MCScan-2008, GENESPACE) → Gates 2, 3, 7, 8, 9.
- **Sequence-level / rearrangement callers** (SyRI, chain-net, minimap2/nucmer/LASTZ/
  Cactus substrates) → Gates 2, 4, 5, 6, 9.
- **WGD/polyploid comparisons** (any tool, pair with unequal WGD history) → Gate 7 always.
- Terminology/citation gate (10) applies to every route.

## Gate 2 — TE / repeat-driven false anchors
Unmasked dispersed repeats/TEs produce many spurious homology hits that chain into
**spurious collinear blocks** (gene-order tools) or spurious chains (WGA). Guard =
**masking before anchoring**.
- If Gate 0.3 shows inputs were **not** masked (or UNKNOWN) and the claim asserts a
  *present* block/synteny → FLAG as possible repeat-driven false anchor. The remedy is
  RepeatMasker (transposons) + Tandem Repeat Finder (simple repeats, period <=12) before
  alignment (chain-net); Cactus makes soft-masking a hard precondition.
- MCScanX's `duplicate gene classifier` separates **dispersed** vs **tandem** vs
  **WGD/segmental** anchors — a block built mostly from dispersed-repeat anchors is
  suspect.
- **Do NOT assert a numeric inflation fold.** The notes describe the mechanism and the
  masking remedy but quantify NO TE false-anchor fold-change. Any "~Nx inflation" figure
  is unsupported → state the direction (inflation) without a number.

## Gate 3 — tandem-duplicate block inflation
Tandem arrays inflate anchor counts and inflate block "confidence."
- MCScanX collapses consecutive shared-gene matches whose partners are **within 5 genes**
  to one representative pair (smallest E-value); tandem = gene-rank-difference 1, proximal
  = rank-difference <20. MCScan-2008 collapses **tandems <50 kb apart**. GENESPACE
  collapses tandem arrays to array-representative genes before rank-ordering.
- If a block's apparent strength comes from a tandem array that was **not** collapsed
  (collapse disabled, or a long-distance tandem that survives the 50-kb rule — Tang notes
  residual long-distance tandems) → FLAG; the block count is inflated, not biology.

## Gate 4 — fragmented-assembly false "synteny loss"
Short contigs truncate blocks and manufacture artifactual "loss."
- SyRI **requires chromosome-level** assemblies; its syntenic-path spine runs end-to-end
  along a chromosome and breaks on contig input. It stays "nearly complete" only down to
  **N50 > 500 kb**; below that, calling degrades. Remedy: build pseudo-chromosomes first.
- If a "synteny lost" claim is drawn from fragmented / sub-chromosomal input → FLAG as
  possible fragmentation artifact, never pass.
- **Aligner false-absence check:** for WGA substrates, verify the aligner/preset could
  have detected the sequence at all. minimap2 asm5 "will not extend to regions with 5% or
  higher sequence divergence" (asm10 ~1%, asm20 ~several %); nucmer seeds on long exact
  matches and by default only unique-in-reference, so divergent/repetitive regions yield
  few anchors. A "loss" that is really *sensitivity below threshold* is false absence.
  There is **NO ~70% identity floor** in the minimap2 or MUMmer4 notes — do not invoke one.
- [GAP: no ingested primary states a hard chromosome-level N50 cutoff (e.g. >=1 Mb). SyRI
  gives N50>500 kb as a graceful-degradation point, not a validity floor. Do not assert a
  >=1 Mb threshold as cited.]

## Gate 5 — reference-guided-scaffold circular reasoning
If the query assembly was **ordered/scaffolded using reference X** (or pseudo-chromosomes
were built by homology to X), then computing "synteny to X" re-derives the scaffolding
input — circular, not independent evidence.
- Check Gate 0.4: was the query scaffolded against, or pseudo-chromosome-built from, the
  same genome the synteny is measured against? (SyRI explicitly allows pseudo-chromosome
  construction "using homology to a chromosome-level reference" — that reference must not
  then be the synteny partner the conclusion leans on.)
- If yes → FLAG as circular; the synteny signal is partly an artifact of assembly
  construction.
- [GAP: no ingested primary states this circularity criterion. It is a real validity
  axis; encode the check but label the criterion **unsourced / convention**, not cited.]

## Gate 6 — micro/macro-synteny conflation
A "synteny loss" (or "synteny conserved") claim that ignores scale.
- Block reporting is gated by size: MCScanX reports chains scoring >250 = **>=5 collinear
  gene pairs**; GENESPACE blkSize default = **5 unique hits** within a block; MCScan-2008
  gates on **block score >300** (a score, not an anchor count). Micro-synteny (local gene
  order) and macro-synteny (chromosome-scale collinearity) are separated by these
  thresholds — a conclusion must state which scale it is about.
- If the claim conflates scales (e.g. "synteny lost" from a handful of below-threshold
  micro-rearrangements, or "synteny conserved" macro-claim from a single small block) →
  FLAG.
- [GAP: no in-corpus primary supplies a synteny decay rate / half-life. Do not assert a
  decay/half-life number to argue expected micro-synteny erosion.]

## Gate 7 — WGD / polyploid 1:many collapse
Polyploid paralogs collapse many-to-one into blocks, faking loss or faking simple 1:1
orthology.
- Correct control is **alignment depth**: AnchorWave sets max depth per genome via **-R
  (reference) / -Q (query)** — e.g. maize<->sorghum `-R 1 -Q 2`. MCScan-2008 reads
  **depth/multiplicity against the pair's per-lineage WGD history** (expected depth 3 for
  gamma-only Carica/Vitis, 6 for Populus, 12 for Arabidopsis).
- If the pair has unequal WGD history and the analysis used **depth 1:1** (or ignored
  ploidy), a "1:1 synteny" or "synteny lost" read is suspect → FLAG.
- **Confabulation flag:** any citation of `proali --ploidy` (or any `--ploidy` flag) is
  wrong — the AnchorWave note documents **only -R / -Q**; `--ploidy` is not in the source.
  Flag it as confabulated and correct to -R/-Q.

## Gate 8 — method / stringency divergence
The same input yields different block sets under different tools/stringency.
- MCScanX (E-value + score/gap thresholds) vs JCVI-MCScan **cscore** (a
  reciprocal-best-hit-ratio control) vs GENESPACE **orthogroup-constrained** anchors
  (`onlyOgAnchors`) are different stringency regimes. **cscore is a JCVI-software feature —
  ABSENT from the Tang-2008 paper;** MCScan-2008 controls stringency via E-value (1e-5),
  best-5-hits, DP scoring, and the score-300 / E<1e-10 cutoffs.
- If the conclusion would **flip** under a defensible alternative tool/stringency (or the
  authors tuned to the setting that produces their claim), → FLAG as stringency-dependent,
  not robust. A single-setting synteny claim with no sensitivity check is not certified.

## Gate 9 — SyRI small-INV / strand-artifact noise
SV callers emit many tiny "inversions" that are strand/alignment noise, not biology.
- Goel/SyRI states **NO minimum inversion or SV calling size**; local variants overlapping
  syntenic/inverted regions are filtered, but small calls are otherwise reported. WGA
  strand artifacts also arise at block ends (AnchorWave: opposite-strand anchors at block
  ends drop/skip sequence).
- If a biological claim rests on many small INV calls with no size/strand filtering
  described → FLAG as possible small-INV noise.
- [GAP: the common **>=5 kb inversion filter is convention, not cited** — Goel states no
  minimum size. Do not assert a >=5 kb (or any) INV floor as sourced; label it convention.]

## Gate 10 — terminology / citation precision (anti-invention)
- If the claim leans on a **synteny-vs-collinearity definitional citation**, do not accept
  an unverified one. [GAP: there is **no clean in-corpus primary** for the distinction; the
  commonly-cited "Fitch 1976, J Mol Evol 7:271" does **not resolve** (that page is
  Zuckerkandl, not Fitch). Synteny is commonly credited to Renwick 1971; Fitch's actual
  terminology paper is 1970 (Syst Zool 19:99, ortholog/paralog).] Flag any specific
  definitional citation as unverified unless the author supplies a resolvable primary.
- More generally: any threshold or version invoked "per <tool>" that the references do not
  support (a >=5 kb INV floor, a >=70% identity floor, a >=1 Mb N50 floor, a `--ploidy` flag,
  a cscore attributed to Tang-2008, blkSize as "orthogroups") must be labeled
  **convention / unsourced / [GAP]**, never asserted as cited.

## Verdict synthesis
Collect the flags. For each fired gate, state: the sub-form, the evidence (or missing
provenance), and whether it is **artifact-suspected** or **unsourced-claim**.
- **FLAGGED — likely artifact:** >=1 gate fires on a mechanism (unmasked repeats, tandem
  inflation, fragmentation, circular scaffold, WGD collapse, stringency flip, small-INV
  noise) that would produce the observed result absent the claimed biology. Do not certify;
  name the remedy (mask, use chromosome-level input, set -R/-Q, run a stringency sensitivity
  check, filter small INVs).
- **FLAGGED — unsourced claim:** a threshold/citation is asserted without support (Gate 10).
  Require it be labeled convention or replaced with a resolvable primary.
- **PASS:** no gate fires — inputs masked, chromosome-level, non-circular, ploidy-aware,
  robust across stringency, scale stated, citations resolvable.
- [GAP: no ingested source supplies a rubric for **combining** multiple partial flags into a
  single confidence score. Report each flag explicitly; do not invent a weighted
  combined-confidence number.]
