# Scenarios — audit-whole-genome-alignment

Concrete fixtures bound to expected referee verdicts. One planted-invalid case per cardinal-sin
sub-form, plus a clean negative control that should pass. The eval.md oracle applies to each output.

## Case: false-absence from below-ceiling preset
- fixture: "Gene X is absent from species B." Evidence: a single minimap2 `asm5` pairwise
  alignment of A vs B; the A-B lineage divergence is well above 5%; the gene's locus is simply
  unaligned in the output.
- expect: FLAG — possible false-absence. asm5 will not extend past 5% divergence, so an unaligned
  region cannot support absence-of-homology. Remedy: rerun at asm10/asm20 (or a more sensitive
  aligner) before concluding absence. Must not pass. (Gate 2B)

## Case: reference-bias SV flip
- fixture: "A 40 kb deletion exists in the query." Evidence: a chain/net built with genome A as
  reference shows the region unaligned; the opposite-direction net (B as reference) was not built.
- expect: FLAG — reference-bias. The net is asymmetric (target-net != query-net); the SV must be
  confirmed in both directions. If it flips, it is an alignment artifact, not biology. (Gate 2A)

## Case: unmasked-repeat spurious duplication
- fixture: "Tandem duplication of locus Y in species C." Evidence: LASTZ/Cactus run on inputs that
  were NOT soft-masked; the 'duplication' sits in a TE-dense region; the run also hit a memory
  blowup that was worked around by chunking.
- expect: FLAG — possible masking artifact. Soft-masking is a precondition; unmasked repeats
  produce spurious alignment and runtime/memory blowup. Re-mask (RepeatMasker + TRF, or Cactus
  self-alignment preprocessing) and rerun before calling the duplication. (Gate 2C)

## Case: wrong guide-tree ancestral sequence
- fixture: "Reconstructed placental-ancestor sequence at node N is ACGT..." Evidence: Progressive
  Cactus HAL built from a guide tree with a mis-placed taxon (wrong topology); the ancestral base
  calls at internal nodes are taken as ground truth.
- expect: FLAG — wrong guide-tree topology corrupts ancestral inference (Cactus is progressive up
  the tree; ancestral assemblies are reconstructed per internal node). Ancestral claim cannot be
  certified until the topology is corrected/rooted. (Note lower confidence anyway at deep,
  divergent nodes.) (Gate 2D)

## Case: HAL-fed-to-TOGA format mismatch
- fixture: "TOGA reports gene Z lost in query." Evidence: the pipeline passed a Progressive Cactus
  HAL directly as TOGA input.
- expect: FLAG — tooling/format mismatch. TOGA consumes pairwise chains (LASTZ->axtChain), not a
  Cactus HAL / halSynteny; the "loss" is a plumbing artifact until proper chains are generated.
  Also require HAL-toolkit versions be disclosed (no versioning policy exists to lean on). (Gate 2E)

## Case: WGD alignment-depth mis-set
- fixture: "Sorghum locus has no maize homolog (single-copy loss)." Evidence: AnchorWave `proali`
  run with `-R 1 -Q 1` on a maize<->sorghum pair, where maize carries an extra WGD round relative to
  sorghum (correct setting would be `-R 1 -Q 2`).
- expect: FLAG — WGD depth mismatch -> under-matching. The depth cap doesn't match the ploidy ratio,
  so true homologous copies can be left unmatched. Rerun with ploidy-matched `-R/-Q` before calling
  loss. (Do not assert a diagnostic value/error — the source states none.) (Gate 2F)

## Case: convention-mislabeled-as-cited  (anti-invention)
- fixture: An audit draft states "the alignment passes because all chains exceed the 5000 bp
  minimum from Kent 2003 and identity is above the 70% minimap2 floor."
- expect: FLAG the reasoning itself — neither the "5000 bp minimum chain" (UCSC convention, not in
  Kent 2003) nor a "70% identity floor" (absent from minimap2/nucmer) is a cited threshold. Must be
  relabeled convention/[GAP], not asserted as from the papers. (anti-invention property)

## Case: clean negative control  (should PASS)
- fixture: "Region R is orthologous/syntenic between human and chimp." Evidence: pairwise alignment
  well within the aligner's divergence regime (human-chimp ~98% identity, far above any ceiling);
  inputs soft-masked; conclusion holds under BOTH reference directions (target-net and query-net
  agree); no WGD/ploidy difference; no ancestral or cross-tool-version extraction involved.
- expect: PASS — every triggered check clears: divergence well within sensitivity, symmetric under
  reference choice, masked inputs, no depth/guide-tree/HAL-version exposure. No artifact sub-form
  triggers. (Verdict synthesis) — present so the referee is not tuned to reject everything.
