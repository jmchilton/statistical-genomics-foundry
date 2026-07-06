# Gap-closing pass: no paywalled crux to hunt

> Follow-up to `comparison.md`. Phase 5 hunts **open-access surrogates** for gap facts that are
> **truly absent from the corpus AND blocked on a paywalled/inaccessible primary**. Applying that
> triage to this probe's gap residue: **nothing qualifies.** No external surrogate subagent was
> spawned — there is no paywalled fact to recover. This near-empty result is itself a finding, and it
> contrasts sharply with the ancestral-reconstruction probe (where the Cunningham 1999 crux *was*
> paywalled and drove a real OA-surrogate hunt).

## Why Phase 5 is (almost) empty here

Unlike a statistics skill — where load-bearing thresholds hide behind paywalled primaries — this
skill's un-traceable numbers are **absent from every primary, paywalled or not**. All six load-bearing
primaries (TOGA, CESAR 2.0, LiftOff, Turakhia, CAT, Cactus) were **accessible and ingested** in Phase 2.
The thresholds that failed to trace do not exist in them to recover:

| Failed-to-trace fact | Where it lives | Paywalled? | Surrogate hunt? |
|---|---|---|---|
| TOGA "~300 Myr" divergence limit | no primary (TOGA states ≤0.55 Ks, no Myr) | no | **no** — convention |
| TOGA "posterior > 0.9" | no primary (real: orthology score ≥0.5) | no | **no** — invented number |
| TOGA `I/PI/UL/L/M/PM` code set | TOGA repo `loss_summ_data.tsv` output (skill cites "TOGA repo"); *paper* uses word labels; `PM` uncorroborated even in the note | no | **no** — tool-doc convention, not an invention or an error |
| LiftOff "≥80% cov / ≥70% id / 50 kb window / ~80% id floor" | no primary (real: `-a`/`-s` 0.5; no window; no floor) | no | **no** — invented numbers |
| CESAR "~150 Myr" | no primary (CESAR paper gives no Myr figure) | no | **no** — convention |
| BUSCO ≥95%/≥90%, N50 ≥1 Mb, multi-ref ≥2, runtimes, "2024-Q4" | community convention | no | **no** — label, don't cite |

A surrogate hunt recovers a *paywalled fact from an OA stand-in*. None of the above is a paywalled fact;
each is either a convention (no primary exists) or an outright invention. There is nothing to launder,
so nothing to hunt.

## The gap residue, triaged (the work-list)

The 5 `[GAP]` markers in the candidate Mold + the deferred Phase-1 items, routed:

- **Gate 1b fraction-in-gap cutoff** — *convention, not citable.* No primary defines a "% of exon bases
  in assembly gap" threshold beyond TOGA's `<50% CDS → missing` binary and `≥10 N` gap definition.
  Label as workflow convention.
- **Gate 4 Myr / %-identity divergence floor** — *convention / absent-from-primary.* Keep divergence in
  Ks (the only unit any primary states). Do **not** attach a Myr number; flag any as unsourced.
- **Gate 6 minimum-lineage-support rule + Turakhia's μ,S covariance fitting** — *optional re-summarize
  of an OA note we already own* (`turakhia-2020-gene-loss`, CC BY-NC). The covariance detail sat in
  LaTeX-heavy equations the summarizer could not render as text; a re-summarize with sharpened guidance
  could recover it. **Low value** — the rule is method-specific (aggregate-erosion), so "≥2 eroded
  sister species + intact outgroup" stays an anchored convention regardless. Not blocking; not a
  surrogate hunt.
- **Gate 7 expression-loss method** — *genuine new-source, OA-accessible, but OUT OF THIS REFEREE'S
  SCOPE.* Establishing expression loss (vs. coding-capacity loss) needs an expression-analysis method:
  PseudoPipe (Zhang et al. 2006, *Genome Res* 16:1041, OA), RetroFinder (Baertsch et al. 2008, *Genome
  Res* 18:1675, OA), or an RNA-/Ribo-seq evidence primary. **Deliberately NOT ingested here:** the
  `audit-gene-loss-call` referee's job is to *flag* the intactness-vs-expression gap (which it does,
  cited to TOGA §10 and Turakhia §8's own scope statements), not to *perform* expression analysis.
  Those OA sources would back a **different, future Mold** (a pseudogene/expression-evidence doer), not
  this referee. Recorded here so the gap isn't silently dropped; it is a new-source item for a future
  ingest, not a Phase-5 surrogate.
- **Verdict-integration rubric** — *convention, not citable.* The gate ordering is a cross-source design
  synthesis; no single note defines a combined-confidence score. Flag pending a source that does.

## Attribution discipline (carried forward)

Had any surrogate been ingested, its facts would be cited as **itself**, never laundered into the
paywalled primary it substitutes for. No surrogate was ingested, so no attribution question arises. The
one attribution correction this probe *did* make is the reverse case — the probe's own Phase-1 mis-cite
of the gene-loss source as "Sharma & Hiller 2020 / gkaa562," corrected by the blind fetch to **Turakhia
et al. 2020 / gkaa550** (see `comparison.md` §0 and §3, and the `turakhia-2020-gene-loss` note header).
That is a method-validation event, not a gap-closure.

## Probe integrity

Phase 3 was **not** re-run. No surrogates were ingested, so the original note set is unchanged and the
recoverability measurement stands as recorded in `comparison.md`.
