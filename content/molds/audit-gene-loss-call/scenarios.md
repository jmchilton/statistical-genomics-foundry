# scenarios — audit-gene-loss-call

Concrete cases. Each binds a fixture to the expected referee verdict.

## Case: loss-call-in-assembly-gap
- fixture: A gene reported "lost" in a query mammal; the expected ortholog locus overlaps a
  run of 40 N (assembly gap), and <50% of the reference CDS is present.
- expect: **not-established / missing.** Cite the M-vs-D >=10 N safeguard (TOGA) and the
  gap-masking guard (Turakhia). Must not pass as true loss. (Gate 1b)

## Case: liftoff-absence-read-as-loss
- fixture: Liftoff (`liftoff target reference -g GFF`, defaults -a 0.5 / -s 0.5) run
  cross-species; a gene appears in the `-u` unmapped-IDs file, and the claim is "the gene is
  lost in the target."
- expect: **invalid-tool-use; not established.** Liftoff is a same/closely-related-species
  transfer tool, not a loss detector; unmapped = failed lift-over (divergence-limited).
  Downgrade to "unmapped; needs a loss detector." (Gate 1a)

## Case: absence-in-annotation-only
- fixture: Gene declared lost because it is absent from the query species' released
  annotation set (no chain/alignment evidence examined).
- expect: **not-established.** Absence-of-annotation alone gives >30% FPR (Turakhia
  ablation); must reason from raw assembly + alignment. (Gate 2)

## Case: paralog-mistaken-for-ortholog
- fixture: "Eroded/lost" signal computed against a locus whose best alignment chain scores
  only ~5x the second-best chain, gene-in-synteny ~4, and two reference genes map to the
  same query locus.
- expect: **not-established (possible paralog).** Fails >=20x separation, gene-in-synteny
  >=20, and unique-mapping guards (Turakhia); below orthology-score/synteny support (TOGA).
  (Gate 3)

## Case: projection-beyond-calibrated-divergence
- fixture: TOGA-style projection/loss call from a placental-mammal reference onto a query at
  ~0.9 Ks neutral divergence (marsupial-range), reported as a confident loss.
- expect: **low-confidence / flagged.** Beyond the ~0.55 Ks reliable range; intronic/
  intergenic signal degraded; clade-specific reference indicated. Do not assert at face
  value. (Gate 4) [Do not attach a Myr number — sources give none.]

## Case: single-splice-shift-called-as-deletion
- fixture: An exon reported deleted where the only evidence is one splice site shifted ~30 bp
  into the intron (CESAR-style projection), single exon affected, event within the first 10%
  of the CDS.
- expect: **uncertain / not-established.** Consistent with a splice-site-shift projection
  artifact (CESAR hard case); fails middle-80% and >=2-exon robustness (TOGA);
  boundary-proximal (first/last-2-AA guard, Turakhia). (Gate 5)

## Case: single-species-private-mutation
- fixture: Gene called lost from one sequenced individual of one species; sister species
  intact, no outgroup analysis performed.
- expect: **low-confidence / not established.** No phylogenetic support (needs >=2 eroded
  sister species + intact outgroup); risk of private mutation / reference bias. (Gate 6)

## Case: intact-call-as-retained-function  (planted flaw)
- fixture: TOGA returns "intact" for a gene; the claim states this proves the gene is
  functionally expressed in the query species.
- expect: **overreach flagged (coding-capacity-only).** Intactness = coding capacity, not
  expression or function; TOGA/Turakhia detect sequence status, not transcription. Must be
  flagged, not passed. (Gate 7)

## Case: eroded-call-as-expression-silencing  (planted flaw)
- fixture: A high-confidence erosion (hcoErosion, MD > 15 across sister species) is presented
  as proof the gene is transcriptionally silenced.
- expect: **overreach flagged.** Sequence erosion establishes lost coding potential, not
  demonstrated expression loss (Turakhia's own concession). Certify the coding-capacity loss;
  flag the expression claim as unsupported by the method. (Gate 7)

## Case: clean-established-loss  (negative control — should pass)
- fixture: Loss called by an aggregate-erosion + phylogenetic pipeline: ortholog sound
  (best chain >>20x second, gene-in-synteny >>20, unique mapping), locus not in an assembly
  gap, MD > 15 across >=2 sister species with an intact-ortholog outgroup, query within
  calibrated divergence, claim limited to coding-capacity loss.
- expect: **established loss.** All gates cleared; certify at coding-capacity level. (Verdict
  synthesis) — present so the referee is not tuned to reject everything.
