# Gap-closing pass: no paywalled crux to hunt (one optional accessible new-source)

> Follow-up to `comparison.md`. Phase 5 hunts **open-access surrogates** for gap facts that are
> **truly absent from the corpus AND blocked on a paywalled/inaccessible primary**. Applying that
> triage to this probe's gap residue: **nothing qualifies as a surrogate hunt.** No external
> surrogate subagent was spawned. Like the sibling annotation-projection probe, the near-empty
> result is itself a finding.

## Why Phase 5 is (almost) empty here

All six load-bearing primaries (Cactus, minimap2, chain/net, MUMmer4, HAL, AnchorWave) were
**accessible and ingested** in Phase 2, plus the reused TOGA note. The thresholds that failed to
trace do not exist in them to recover — they are convention or confabulation, not paywalled facts:

| Failed-to-trace fact | Where it lives | Paywalled? | Surrogate hunt? |
|---|---|---|---|
| AnchorWave `proali --ploidy` flag | **nowhere** — flag does not exist (real: `-R`/`-Q`, verified vs current master README) | no | **no** — confabulated flag, not a recoverable fact |
| AnchorWave "80% anchor identity" default | no primary (Song 2022 gives `y`=0.6 ratio, no 80%) | no | **no** — absent-from-primary / convention |
| Cactus memory "8-32 GB/genome" | no primary (Armstrong gives only instance/core-hours) | no | **no** — over-claim; convention |
| Per-clade branchScale 1.0/0.5-0.7/0.3-0.5 | no primary ("branchScale" absent from Armstrong) | no | **no** — docs/convention |
| nucmer "≥70% identity" | no primary (Marçais states no min identity) | no | **no** — over-claim; convention |
| minimap2 "~70% identity floor" | no primary (absent from paper AND man page) | no | **no** — absent; keep qualitative |
| LASTZ chain "5000 bp minimum" | no primary (not in Kent 2003; skill self-labels UCSC convention) | no | **no** — convention (correctly labeled) |
| Soft-masking "≥90% TE" | community QC convention | no | **no** — label, don't cite |
| HAL "version mismatch breaks downstream" | no primary (Hickey 2013 states no versioning policy) | no | **no** — operationally real; traces nowhere |
| halSynteny definition | HAL-toolkit repo (defined in neither Hickey 2013 nor Armstrong 2020) | no (repo docs accessible) | **no** — tool-doc convention, not a paywalled crux |

A surrogate hunt recovers a *paywalled fact from an OA stand-in*. None of the above is a paywalled
fact; each is convention (no primary exists), confabulation (`--ploidy` — no fact to recover), or an
absence a primary explicitly states. Nothing to launder, so nothing to hunt.

## The gap residue, triaged (the work-list)

The 6 `[GAP]` markers in the candidate Mold + the silent gaps from `comparison.md` §2, routed:

- **Gate 2A 5000-bp chain / Gate 2B ~70% identity / Gate 2C %-masked / Gate 3 combined-confidence
  rubric** — *convention, not citable.* No primary defines these; the label is the answer.
- **Gate 2D guide-tree-quality / branchScale bar** — *convention + absent-from-primary.* branchScale
  is explicitly absent from Armstrong; require the tree be stated/rooted but flag any numeric bar as
  unsourced. Not blocking.
- **Gate 2F `-R/-Q` mis-set diagnostic + 80% anchor-identity** — *convention / summarizer-inferred.*
  Song is OA (CC BY-NC-ND) and already ingested own-words; it **states no such diagnostic or number**,
  so a re-summarize buys nothing. Under/over-matching stays summarizer-inferred.
- **LASTZ primary/docs note (Schwartz 2003 / LASTZ manual)** — *genuine new-source, ACCESSIBLE, but
  OPTIONAL and OUT OF THIS PROBE'S SURROGATE SCOPE.* The LASTZ-specific validity content (HoxD55
  matrix for distant genomes; softmask-honored-at-seeding; 6-bp seeds; the 60-99% / 50% identity
  regimes) has no ingested primary. Because LASTZ is **accessible, not paywalled**, this is a
  **new-source item for a future ingest**, not a Phase-5 surrogate hunt. It would deepen the masking
  (2C) and sensitivity (2B) gates for reference-anchored distant-genome work. **Not ingested here:**
  the current note set already backs the referee's core gates via Kent + minimap2 + Armstrong; the
  LASTZ note is a refinement, not a blocker. Recorded so the gap isn't silently dropped.
- **The doer layer** (Minigraph-Cactus/Hickey 2024, Multiz, SibeliaZ, progressiveMauve, Winnowmap2)
  — *out of a Family-B referee's scope by design.* These back a future doer/tool-selection Mold, not
  this validity referee. New-source items for a different ingest, not gaps in this one.

## Attribution discipline (carried forward)

No surrogate was ingested, so no attribution question arises. The one verification this probe *did*
perform beyond the notes is the AnchorWave CLI check: the summarizer read v1.0.0 and flagged the
`--ploidy` question for re-check; the orchestrator confirmed against the **current AnchorWave master
README** that `--ploidy` does not exist even in the latest release (real control `-R`/`-Q`). That
elevates the finding from "absent in the v1.0.0 paper" to "confabulated flag" — a method-validation
event, not a gap-closure.

## Probe integrity

Phase 3 was **not** re-run. No surrogates were ingested, so the original note set is unchanged and the
recoverability measurement stands as recorded in `comparison.md`.
