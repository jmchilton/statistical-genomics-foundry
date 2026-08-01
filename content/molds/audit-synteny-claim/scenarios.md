# scenarios — audit-synteny-claim

Concrete fixtures → expected referee verdict. One planted-invalid per sub-form, plus one
clean negative control that must PASS. The eval.md oracle ("must catch the flaw") applies
to each output; each case binds the fixture-specific expected verdict.

## Case: unmasked-TE-false-anchors
- fixture: MCScanX collinear blocks between two plant genomes, BLASTP anchors computed on
  **unmasked** assemblies (no RepeatMasker/TRF step); authors claim a novel conserved
  block. Classifier shows the block's anchors are mostly `dispersed`.
- expect: FLAG (Gate 2) — possible repeat-driven false anchors; remedy = mask before
  anchoring. Direction "inflation" stated with **no numeric fold**.

## Case: tandem-array-block-inflation
- fixture: A "high-confidence" collinear block whose anchor count is dominated by a tandem
  gene array; tandem collapse was disabled (or the array spans >50 kb and survives the
  MCScan-2008 rule).
- expect: FLAG (Gate 3) — block count inflated by uncollapsed tandems; collapse-within-5-
  genes / <50 kb remedy named.

## Case: fragmented-assembly-false-loss
- fixture: SyRI (or MCScanX) run where one genome is a contig-level draft (N50 ~300 kb, not
  chromosome-level); authors conclude "synteny lost across region R in species Y."
- expect: FLAG (Gate 4) — fragmentation artifact; SyRI requires chromosome-level, degrades
  below N50>500 kb; build pseudo-chromosomes first. Hard >=1 Mb floor left as [GAP].

## Case: reference-scaffolded-circularity
- fixture: Query assembly was scaffolded (pseudo-chromosomes built) by homology to
  reference genome A; authors then report strong synteny **to A** as evidence of conserved
  genome structure.
- expect: FLAG (Gate 5) — circular; synteny partly re-derives the scaffolding input.
  Criterion labeled unsourced/convention.

## Case: micro-macro-conflation
- fixture: A chromosome-scale "macro-synteny conserved" claim supported by a single small
  block near the reporting threshold (~5 gene pairs / blkSize 5), with no statement of
  scale; OR "synteny lost" from a few sub-threshold micro-rearrangements.
- expect: FLAG (Gate 6) — scale conflated; claim must state micro vs macro. No decay/
  half-life number invented ([GAP]).

## Case: WGD-polyploid-collapse
- fixture: Maize<->sorghum-type pair (unequal WGD history) analyzed at depth 1:1; authors
  conclude many maize genes "lost synteny." Methods cite `proali --ploidy 2`.
- expect: FLAG (Gate 7) — many-to-one collapse artifact; correct control is -R/-Q depth
  (e.g. `-R 1 -Q 2`) read against per-lineage WGD history. `--ploidy` flagged as
  **confabulated**, corrected to -R/-Q.

## Case: stringency-dependent-block-set
- fixture: A "synteny present" claim from GENESPACE with `onlyOgAnchors` on; the block
  disappears under plain MCScanX defaults; no sensitivity check reported. Or a cscore-tuned
  JCVI run cited as "MCScan (Tang 2008)".
- expect: FLAG (Gate 8) — stringency-dependent, not robust; cscore is JCVI-software, ABSENT
  from Tang-2008. Require a cross-stringency sensitivity check.

## Case: small-INV-noise
- fixture: SyRI SV inventory with thousands of sub-kb inversion calls; authors interpret
  the inversion burden as biological rearrangement rate, no size/strand filter described.
- expect: FLAG (Gate 9) — possible small-INV/strand noise; SyRI sets no minimum calling
  size. A >=5 kb filter, if used, labeled convention ([GAP]), not cited.

## Case: definitional-citation-invention
- fixture: Manuscript distinguishes "synteny" from "collinearity" and attributes the
  distinction to "Fitch 1976, J Mol Evol 7:271."
- expect: FLAG (Gate 10) — citation does not resolve (that page is Zuckerkandl); no clean
  in-corpus primary. Do not assert a corrected citation as sourced; flag as unverified
  ([GAP]); note synteny commonly → Renwick 1971, Fitch's terminology paper is 1970.

## Case: clean-synteny-claim  (negative control — must PASS)
- fixture: AnchorWave/SyRI comparison of two **chromosome-level**, **soft-masked** assemblies
  (neither scaffolded against the other); WGD-aware depth set via `-R 1 -Q 2` for the known
  ploidy difference; a macro-synteny inversion call is >100 kb and survives across two
  stringency settings; scale explicitly stated as macro; no unsupported thresholds or
  citations invoked.
- expect: PASS — no gate fires. Confirms the referee is discriminating, not reflexively
  rejecting.
