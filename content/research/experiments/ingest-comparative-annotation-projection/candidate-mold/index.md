---
type: mold
name: audit-gene-loss-call
tags:
  - family/b
  - role/critique
references:
  - kind: research
    ref: "[[turakhia-2020-gene-loss]]"
    used_at: runtime
    load: upfront
    mode: condense
    evidence: corpus-observed
    purpose: >
      The validity-axis anchor: the enumerated technical causes of spurious loss
      (assembly gaps, annotation-tracks-N50, paralog-as-ortholog, private mutations,
      reference bias) and the guard for each (gap masking, raw-assembly not annotation,
      >=20x ortholog/paralog separation, gene-in-synteny >=20, unique 1:1, first/last-2-AA
      exclusion, phylogenetic filter), plus the >30%-vs-<10% FPR ablation that proves
      absence-of-annotation alone is not loss.
  - kind: research
    ref: "[[kirilenko-2023-toga]]"
    used_at: runtime
    load: upfront
    mode: condense
    evidence: corpus-observed
    purpose: >
      The intactness/loss classification substrate: five transcript states
      (intact / partially intact / missing / uncertain loss / lost), the M-vs-D
      assembly-gap safeguard (>=10 N), the middle-80% rule, the >=2-exon / <60%-intact
      lost criterion, orthology-score >=0.5, and the coding-capacity-not-expression scope.
  - kind: research
    ref: "[[shumate-salzberg-2021-liftoff]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim rests on a Liftoff / minimap2 pairwise annotation-transfer run"
    mode: condense
    evidence: corpus-observed
    purpose: >
      The mis-use guard: Liftoff is a same/closely-related-species annotation-transfer
      tool, not a loss detector; absence in its output is a failed lift-over reported to
      the -u unmapped file, and success is limited by divergence. Defaults -a 0.5 / -s 0.5.
  - kind: research
    ref: "[[sharma-hiller-2017-cesar2]]"
    used_at: runtime
    load: on-demand
    trigger: "when an exon-projection or splice-site-shift artifact is at issue"
    mode: condense
    evidence: corpus-observed
    purpose: >
      Establishes exon projection as an HMM codon/frame- and splice-site-aware step whose
      known hard case is shifted splice sites; grounds 'exon-projection failure' as a
      distinct artifact class separate from true deletion.
  - kind: research
    ref: "[[fiddes-2018-cat]]"
    used_at: runtime
    load: on-demand
    trigger: "when the claim comes from a multi-method / consensus annotation set (CAT)"
    mode: condense
    evidence: corpus-observed
    purpose: >
      Multi-method integration substrate (TransMap + AUGUSTUS variants + homGeneMapping
      over a Cactus/HAL alignment); grounds that projection is coverage-filtered and that
      input-annotation errors propagate across a clade.
  - kind: research
    ref: "[[armstrong-2020-cactus]]"
    used_at: runtime
    load: on-demand
    trigger: "when reference-choice bias or the upstream whole-genome-alignment substrate is at issue"
    mode: condense
    evidence: corpus-observed
    purpose: >
      The reference-free WGA substrate (HAL); grounds the reference-choice-bias check and
      that alignment accuracy degrades with divergence (F1 0.989 primate vs 0.795 mammal).
---

# audit-gene-loss-call

Referee a claim that a gene is **lost / absent** in a query genome, or that an
annotation-projection result establishes loss. Decide whether the claim is an
**established loss** or a **technical artifact** (assembly gap, missing/absent
annotation, paralog-as-ortholog, exon-projection failure, out-of-range divergence,
single-species/private mutation, or intactness-vs-expression conflation).

Work the gates **in order**; each gate can down-grade the verdict, and any gate that
fails means the loss is **not established**. Do not certify a loss that no gate has
positively cleared — silence is not evidence.

## Gate 0 — What is being claimed, and by what tool?
Establish (a) the exact claim (this gene is lost / absent / non-functional?), and
(b) the producing tool/method. This routes every later gate.
- If the tool is a **loss detector** (TOGA transcript-status classification per
  [[kirilenko-2023-toga]]; aggregate-erosion + phylogenetic filter per
  [[turakhia-2020-gene-loss]]), continue.
- If the tool is an **annotation-transfer / lift-over** tool being read *as* a loss
  detector, go straight to Gate 1a and expect a flag.

## Gate 1a — Tool-appropriateness (invalid-tool-use)
A gene missing from an annotation-**transfer** output is a **failed transfer**, not an
established loss. Per [[shumate-salzberg-2021-liftoff]], Liftoff maps annotations for the
**same or a closely related species**, writes genes it cannot map to a separate
unmapped-IDs file (`-u`), and its success is explicitly limited by reference↔target
divergence; it makes **no loss claim**. Plain [[armstrong-2020-cactus]] `halLiftover`
projection and [[fiddes-2018-cat]] coverage-filtered TransMap are likewise transfer, not
loss detection.
- Verdict if the loss rests only on absence from a transfer output → **invalid-tool-use;
  not established.** Downgrade to "unmapped / needs a loss detector."

## Gate 1b — Assembly-gap / missing-data (not-established vs true absence)
Does the claimed-lost locus overlap an **assembly gap**? Both anchors treat this as the
first safeguard:
- [[kirilenko-2023-toga]] calls an absent exon **M (missing)** rather than **D
  (deleted/diverged)** when the expected query locus overlaps an assembly gap of
  **>=10 consecutive N**; at transcript level `<50%` CDS present → **missing** (undecided),
  not lost.
- [[turakhia-2020-gene-loss]] **masks** chain-alignment gaps that fall in query
  assembly-gap regions so they are not counted as deletions.
- Gene-count / annotation completeness tracks assembly contiguity (N50), so an absent
  gene in a fragmented assembly is expected without any true loss.
- Verdict if the locus is gap-explained → **not established (missing);** never "true loss."
[GAP: no note gives a *quantitative* fraction-of-gene-in-gap threshold that flips
missing→callable beyond TOGA's `<50% CDS present → missing` binary and the `>=10 N`
gap definition; a "% of exon bases in gap" cutoff would need another source.]

## Gate 2 — Absence-of-annotation is not loss
Is the loss inferred from the gene simply **not appearing in the query's own
annotation set**? Per [[turakhia-2020-gene-loss]], filtering on "lacks an annotation"
alone gives **FPR > 30%**, versus **< 10%** for the full chain-mapping + outlier +
phylogenetic pipeline. A valid loss call must work from the **raw assembly + alignment**,
not from a downstream annotation's absence.
- Verdict if loss = "not in the annotation" → **not established.**

## Gate 3 — Ortholog vs paralog / synteny soundness
Is the compared locus the true ortholog? A paralog (or processed pseudogene) mistaken for
the ortholog inflates apparent divergence/loss.
- [[kirilenko-2023-toga]]: gene–chain pair treated as orthologous only at **orthology
  score >= 0.5**; chains with alignment score `< 15,000` are unclassified; conserved
  intronic/intergenic context is what separates orthologs from paralogs/processed
  pseudogenes.
- [[turakhia-2020-gene-loss]]: require best chain's score **>=20x** the second-best
  (ortholog/paralog separation), **gene-in-synteny >= 20** (aligning-block bases >=20x the
  gene's own bases), and a **unique 1:1 mapping** (discard all overlapping mappings).
- Verdict if the ortholog assignment is unsupported → **not established (possible
  paralog).**

## Gate 4 — Divergence within calibrated range
Is the query within the producing tool's calibrated divergence?
- [[kirilenko-2023-toga]]: reliable within **~0.55 Ks** (substitutions/neutral site);
  intronic/intergenic signal degrades beyond ~0.6 Ks; clade-specific references
  recommended for distant queries.
- [[armstrong-2020-cactus]]: alignment accuracy itself falls with divergence
  (F1 0.989 primate → 0.795 mammal), so the upstream substrate is weaker at distance.
- A projection/loss call **beyond the calibrated range** must be marked **low-confidence**,
  not passed at face value.
[GAP: no note supplies a **divergence-in-Myr** limit for any tool — TOGA is stated in Ks,
CESAR and Liftoff give *no* numeric divergence or percent-identity floor. Any "~N Myr" or
"~X% identity" bound must be flagged as unsourced, not invented.]

## Gate 5 — Exon-projection / single-artifact robustness
Does the loss rest on a **single** frame-disrupting event, or one near an exon boundary?
- [[sharma-hiller-2017-cesar2]]: exon projection is codon/frame- and splice-site-aware;
  its named hard case is a **shifted splice site** — a projection failure that can mimic a
  disrupted exon rather than a true deletion.
- [[kirilenko-2023-toga]]: only inactivating mutations in the **middle 80%** of the CDS
  drive uncertain-loss/lost calls (first/last 10% disregarded); **"lost"** requires
  **max percent intact reading frame < 60% AND inactivating mutations in >=2 coding
  exons** (scaled rules for many-exon / single-exon / large-single-exon). Base-call errors
  producing frameshifts/stops are counted as inactivating and can inflate loss.
- [[turakhia-2020-gene-loss]]: excludes the **first and last two amino acids of each
  exon** (boundary-shift guard) and uses **aggregate** erosion (fraction AAs deleted +
  fraction substituted) rather than single events, explicitly to avoid spurious calls
  from e.g. a stop codon near a gene's end.
- Verdict if the loss is a single boundary-proximal or single-exon event without
  corroboration → **uncertain / not established.**

## Gate 6 — Phylogenetic support (fixed & ancestral, not private)
Is the loss confirmed across lineages, or seen in one individual/species?
- [[turakhia-2020-gene-loss]]: a high-confidence loss requires **>=2 species** in the
  group marked eroded (all transcripts MD > 15) AND **no** leaf in the group
  sequence-conserved (MD <= 5), **with an outgroup lineage retaining the intact
  ortholog.** This guards against private (individual-specific) mutations and
  reference-genome bias. The undetermined zone **5 < MD <= 15** is left **uncalled**, not
  forced.
- Verdict for a single-species loss with no outgroup control → **low-confidence / not
  established.**
[GAP: MD is Turakhia-specific (aggregate-erosion) and its per-species covariance fitting
(mu, S) is not recovered in the note; the notes give no *general* cross-tool rule for
minimum lineage support when the caller is TOGA-style single-event rather than
aggregate-erosion — treat ">=2 supporting species + intact outgroup" as the anchored
convention, flag if applied outside Turakhia's method.]

## Gate 7 — Intactness / coding-capacity vs function (scope overreach)
What is the claim actually licensed to say?
- Both [[kirilenko-2023-toga]] and [[turakhia-2020-gene-loss]] detect **coding-capacity /
  sequence** loss — frame-disrupting mutations, exon/gene deletion, aggregate erosion —
  **NOT expression loss or pseudogenization without sequence change**, and not
  regulatory/non-coding loss. Turakhia concedes it is "nearly impossible" to prove a locus
  emits no transcript.
- Therefore: an **"intact" call presented as evidence of retained protein function** must
  be flagged (intactness ≠ expression ≠ function). A **"lost"/eroded call presented as
  proven expression silencing** must be flagged (sequence erosion ≠ demonstrated
  expression loss).
- Verdict: downgrade any claim that steps from *sequence status* to *functional /
  expression status* → **coding-capacity-only; overreach flagged.**
[GAP: none of the six notes provides a *method* for establishing expression loss
(transcriptomic/proteomic evidence); a function-level claim needs a source outside this
set — do not invent an expression criterion.]

## Gate 8 — Reference-choice bias
Was a single, distant reference used where a clade-specific one is indicated?
- [[kirilenko-2023-toga]] recommends **clade-specific references** for distant queries;
  a lost call from a distant reference may reflect reference bias, not query loss.
- [[armstrong-2020-cactus]] is **reference-free** (reconstructs ancestors), so a
  Cactus/HAL substrate avoids single-reference bias — a point in favor when present.
- Verdict: flag single-distant-reference loss calls as **reference-choice-bias risk.**

## Verdict synthesis
- **Established loss** — cleared Gates 1a–8: a loss detector, not gap-/annotation-
  explained, ortholog-sound, in calibrated range, multi-exon/aggregate signal,
  phylogenetically supported, claimed only at coding-capacity level.
- **Not established (missing / artifact)** — failed Gate 1b, 2, or 3.
- **Invalid-tool-use** — failed Gate 1a.
- **Low-confidence** — failed Gate 4, 5, or 6.
- **Overreach flagged** — passed as a loss but the *claim* exceeds coding-capacity (Gate 7)
  or rests on a biased reference (Gate 8).
[GAP: the notes supply per-gate thresholds but **no integration rubric** for weighing gates
against each other into a single confidence score — the ordering above is a design
synthesis across sources, not a rule any one note states. Flag as convention pending a
source that defines combined-confidence scoring.]
