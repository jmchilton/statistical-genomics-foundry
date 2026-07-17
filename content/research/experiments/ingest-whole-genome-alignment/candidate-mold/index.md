---
type: mold
name: audit-whole-genome-alignment
tags:
  - family/b
  - role/critique
references:
  - kind: research
    ref: "[[kent-2003-chain-net]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim rests on a reference-anchored chain/net (presence/absence, SV, synteny) that could flip with reference choice"
    mode: condense
    evidence: corpus-observed
    purpose: "Ground the reference-bias check: the net is asymmetric (human-net keeps only the single best mouse DNA per human position; mouse-net is built oppositely) so target-net != query-net."
  - kind: research
    ref: "[[li-2018-minimap2]]"
    used_at: runtime
    load: on-demand
    trigger: "when a pairwise alignment used a minimap2 asm preset and the claim is a false-absence / unaligned-region call"
    mode: condense
    evidence: corpus-observed
    purpose: "Preset divergence ceilings (asm5 won't extend past 5% divergence; asm10 ~1% avg; asm20 ~several % avg) so a below-ceiling run can't support absence-of-homology. Records that no numeric identity floor exists."
  - kind: research
    ref: "[[marcais-2018-mummer4]]"
    used_at: runtime
    load: on-demand
    trigger: "when a pairwise alignment used nucmer/MUMmer and the claim is false-absence or a repeat-region call"
    mode: condense
    evidence: corpus-observed
    purpose: "nucmer is less sensitive (long exact-match seeds + default reference-uniqueness -> 3-5% fewer reads than BWA/Bowtie2); --maxmatch recovers repeats at run-time cost. No minimum-identity floor is stated."
  - kind: research
    ref: "[[armstrong-2020-cactus]]"
    used_at: runtime
    load: on-demand
    trigger: "when the alignment is reference-free multiple (Progressive Cactus / HAL) and the claim is an ancestral sequence, region-absent, or synteny call"
    mode: condense
    evidence: corpus-observed
    purpose: "Soft-masking is a stated precondition (unmasked repeats blow up runtime + hurt quality); guide-tree drives progressive decomposition and ancestral reconstruction; accuracy degrades with divergence (F1 0.989 primate vs 0.795 mammal)."
  - kind: research
    ref: "[[hickey-2013-hal]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim was extracted from a HAL file via halLiftover/halBranchMutations or crosses a tool-version boundary"
    mode: condense
    evidence: corpus-observed
    purpose: "HAL extraction tooling (halLiftover BED->BED, halBranchMutations per-branch BED); the paper states NO format versioning / compatibility policy — the version-breakage axis has no in-source rule."
  - kind: research
    ref: "[[song-2022-anchorwave]]"
    used_at: runtime
    load: on-demand
    trigger: "when the genomes have WGD/ploidy differences and the claim is under- or over-matched homologous copies"
    mode: condense
    evidence: corpus-observed
    purpose: "WGD control is -R (reference max alignment depth) / -Q (query max alignment depth), e.g. maize<->sorghum -R 1 -Q 2; anchors = reference full-length CDS (needs GFF3). No --ploidy flag, no minimum anchor-identity threshold in the source."
  - kind: research
    ref: "[[kirilenko-2023-toga]]"
    used_at: runtime
    load: on-demand
    trigger: "when a gene-loss/orthology conclusion is drawn downstream and the pipeline fed a Cactus HAL to a chain-consuming tool"
    mode: condense
    evidence: corpus-observed
    purpose: "Linkage only: TOGA consumes pairwise chains (LASTZ->axtChain), NOT Cactus HAL / halSynteny — a HAL-fed-to-TOGA pipeline is a format mismatch, not biology."
---

# Audit a whole-genome-alignment claim

Referee a whole-genome-alignment (WGA) result plus the biology drawn from it (synteny,
SV, "region absent/unaligned", ancestral sequence, pangenome variant). The cardinal sin:
**an alignment artifact read as biology.** Walk the gates in order; a claim passes only if
every triggered sub-form check clears. If a check cannot be cleared from the evidence
supplied, the verdict is **flag** (possible artifact), never **pass**.

## Gate 0 — restate the claim and capture the alignment provenance
Extract and record:
- The **biological conclusion** and its logical form (presence/absence, SV, synteny,
  ancestral base, variant).
- **Alignment type**: (a) pairwise reference-anchored (chain/net, minimap2, nucmer);
  (b) reference-free multiple (Progressive Cactus -> HAL); (c) WGD/ploidy-aware (AnchorWave).
- **Tool + version + preset/params**: minimap2 preset (asm5/asm10/asm20) and `-k/-w`;
  nucmer mode (default MUM vs `--maxmatch`); Cactus guide tree + masking state; AnchorWave
  `-R/-Q`; HAL toolkit versions.
- **Reference direction** (which genome is the axis) and whether the claim was tested under
  the opposite direction.
- **Masking state** of inputs.
If any of these is unstated, note it — an absent provenance field is itself a flag input.

## Gate 1 — route by alignment type
- Pairwise reference-anchored -> run Gate 2A (reference bias) + Gate 2B (sensitivity/false-absence) + Gate 2C (masking).
- Reference-free multiple (Cactus/HAL) -> run Gate 2C (masking) + Gate 2D (guide-tree) + Gate 2E (HAL version/tooling).
- WGD/ploidy-aware (AnchorWave) -> run Gate 2F (alignment-depth) + Gate 2B (sensitivity) + Gate 2C (masking).
- Any pipeline that extracts from HAL or hands alignment to a downstream consumer -> also run Gate 2E.

## Gate 2A — reference bias (directionality of chains/nets)
A reference-anchored net is **asymmetric**: it keeps only the single best-aligning target
DNA per position on the *reference* side; the opposite-direction net is built oppositely, so
**target-net != query-net** (Kent 2003). Therefore:
- A **presence/absence or SV** conclusion must be checked in **both reference directions**.
- If the conclusion **flips** (or is untested) between reference choices -> **flag as
  reference-bias**, do not report as biology.
- No numeric chain-length/score cutoff is defensible: the often-quoted **"5000 bp" minimum
  chain is UCSC convention, NOT in Kent 2003** — if the audit sees such a cutoff cited to the
  paper, flag it as convention-mislabeled-as-cited. `[GAP: no numeric minimum chain length/score
  in the notes; treat any such floor as convention.]`

## Gate 2B — sensitivity below threshold -> false absence
**Absence of alignment != absence of homology.** An "unaligned/absent/lost" call is only
valid if the aligner could reach the divergence of the region:
- **minimap2**: `asm5` "will not extend to regions with 5% or higher sequence divergence"
  (recommended when avg divergence ~0.1%); `asm10` for ~1% avg; `asm20` for ~several % avg.
  An absence call from a preset whose ceiling is below the expected divergence is a **possible
  false-absence -> flag**; remedy = move up the preset ladder before concluding absence.
- **nucmer**: seeds on long exact matches with default reference-uniqueness -> less sensitive
  (3-5% fewer reads than BWA/Bowtie2); divergent or repeat-heavy regions drop out. A nucmer
  absence call over a divergent/repetitive locus is a **possible false-absence -> flag**;
  remedy = `--maxmatch` (at run-time cost) and/or a more sensitive aligner.
- The minimap2 divergence estimate is "only approximate and can be biased" — do not treat a
  reported per-base divergence as a calibrated identity readout.
- **No numeric identity floor** exists in either source (the commonly cited **~70% identity**
  floor is NOT in minimap2 or nucmer notes). `[GAP: no minimum-identity threshold in the
  references; do not assert a numeric identity floor — label ~70% as convention if cited.]`

## Gate 2C — repeat masking sufficiency
Unmasked/poorly-masked repeats drive **spurious alignment** and, for Cactus, **runtime/memory
blowup** (alignments enumerated to/from every copy of a repeat).
- Progressive Cactus **requires soft-masked input** (stated precondition); its self-alignment
  preprocessing masks regions with coverage > 50 (configurable), sampling 20% of chunks.
- Chain/net pipelines mask **before** alignment (RepeatMasker for transposons; Tandem Repeat
  Finder for simple repeats, period <= 12); skipping masking inflates spurious chains.
- If inputs are unmasked (or masking state unstated) and the claim is a **duplication/SV/
  spurious-synteny** call in repeat-rich sequence -> **flag as possible masking artifact**.
- **No numeric percent-of-TE (or %-of-genome) masking target** is given in the notes.
  `[GAP: no %-masked target; cannot assert "≥X% masked" — the only in-source numbers are
  Cactus's internal coverage>50 / 20%-sampling preprocessing, not a user-facing masking %.]`

## Gate 2D — guide-tree topology (reference-free / ancestral claims)
Progressive Cactus is progressive **up a guide phylogenetic tree**; ancestral assemblies are
reconstructed at internal nodes by ordering blocks and taking a most-likely base per column.
A **wrong guide-tree topology corrupts ancestral-sequence inference**. Therefore:
- Any **ancestral-sequence** or node-level claim must state the guide tree used and that it is
  the correct/rooted topology (HAL likewise presumes a **rooted** tree).
- If the guide tree is wrong, unrooted, or unstated for an ancestral claim -> **flag**.
- Accuracy also **degrades with divergence** (F1 0.989 primate vs 0.795 mammal; ~86% human
  coding covered in the placental ancestor) — deep-node ancestral claims carry lower confidence.
- `[GAP: no guide-tree QUALITY criteria in the notes — no branch-length/support/rooting metric,
  no branchScale values (branchScale is explicitly ABSENT from Armstrong 2020). Cannot assert a
  numeric tree-quality bar; require the tree be stated and defensible, but flag the criterion as
  unsourced.]`

## Gate 2E — HAL version / downstream-tooling breakage
Extraction from HAL (halLiftover BED->BED; halBranchMutations per-branch BED; hal2maf) can be
silently or loudly wrong across tool-version boundaries.
- **Handle honestly**: Hickey 2013 states **no format versioning, no forward/backward
  compatibility policy** — so there is *no in-source rule* to cite for HAL version safety.
  The audit can require that HAL-toolkit versions be pinned and that extraction was regenerated
  with matching tooling, but must **not** invent a compatibility guarantee.
  `[GAP: HAL versioning/compatibility policy is ABSENT from the source; cannot cite a version
  rule — only require version disclosure and flag undisclosed version crossings.]`
- **Format-mismatch linkage**: a downstream orthology/gene-loss conclusion (e.g. TOGA) requires
  **pairwise chains**, not a Cactus HAL — TOGA consumes chains (LASTZ->axtChain), *not*
  HAL/halSynteny. A pipeline feeding HAL directly into a chain-consuming caller is a **tooling/
  format mismatch -> flag** (the "result" is a plumbing artifact, not biology).

## Gate 2F — WGD / alignment-depth setting (polyploid under/over-matching)
For genomes with differing whole-genome-duplication histories, AnchorWave controls matching via
**`-R` (reference max alignment depth)** and **`-Q` (query max alignment depth)**, e.g.
maize<->sorghum `-R 1 -Q 2` (maize depth 1, sorghum depth 2). Anchors are reference full-length
CDS (requires a GFF3 annotation).
- Check `-R/-Q` are set to the **known ploidy/WGD ratio** of the pair. A too-low depth leaves
  true homologous copies unmatched (**under-alignment**); a too-high depth admits extra paths
  (**over-alignment**). If a "copy absent" or "extra copy" claim rests on a depth setting that
  doesn't match the ploidy -> **flag**.
- Regions with too few CDS anchors get aligned as **indels**, and interanchor low-homology
  stretches get only approximate (banded/sliding-window) alignment — an SV/absence call there is
  a **possible artifact -> flag**.
- Watch for interface drift: the notes describe `-R/-Q` (v1.0.0); a **`--ploidy` flag does not
  appear** in the source. If a claim cites `proali --ploidy`, flag as version-unverified.
- `[GAP: the source states NO symptom/error/diagnostic for a wrong -R/-Q (under/over-matching is
  summarizer-inferred). No numeric anchor-identity threshold exists (the "80% default" is NOT in
  the source). Cannot assert a diagnostic value or identity floor.]`

## Gate 3 — verdict synthesis
For each triggered sub-form, record: **cleared** / **flag(artifact sub-form)** / **cannot-assess**.
- **Pass** only if every triggered check is *cleared*.
- If any check is **flag** or **cannot-assess**, the verdict is **artifact-suspected** (name the
  sub-form) or **insufficient-provenance** — never a silent pass. State the concrete remedy
  (opposite-direction net; higher preset / `--maxmatch`; re-mask; correct/rooted guide tree;
  version-pin + regenerate extraction; ploidy-matched `-R/-Q`).
- `[GAP: no combined-confidence rubric in the notes — there is no source-backed way to weight or
  aggregate multiple partial flags into a single numeric score. Report per-sub-form verdicts;
  do not manufacture an overall confidence number.]`
