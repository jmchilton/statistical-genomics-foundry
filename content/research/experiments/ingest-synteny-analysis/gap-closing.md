# Gap-closing pass: near-empty (one optional definitional primary)

> Follow-up to `comparison.md`. Phase 5 hunts **open-access surrogates** for gap facts that are
> **truly absent from the corpus AND blocked on a paywalled/inaccessible primary**. Applying that
> triage to this probe's gap residue: **nothing qualifies as a surrogate hunt.** No external
> surrogate subagent was spawned. This is the third consecutive comparative-genomics probe (after
> whole-genome-alignment and comparative-annotation-projection) to land near-empty here — itself a
> finding about where these tool-orchestration skills' un-traceable content lives.

## Why Phase 5 is (almost) empty here

All ten load-bearing notes (5 new + 5 reused from the WGA corpus) were accessible and ingested. The
thresholds that failed to trace do not exist in them to recover — convention, confabulation, or
absence a primary explicitly states:

| Failed-to-trace fact | Where it lives | Paywalled? | Surrogate hunt? |
|---|---|---|---|
| "Fitch 1976 J Mol Evol 7:271" synteny/collinearity definition | **nowhere** — citation does not resolve (page = Zuckerkandl) | no | **no** — confabulated citation, not a recoverable fact |
| AnchorWave `proali --ploidy` | **nowhere** — flag does not exist (real: `-R`/`-Q`) | no | **no** — confabulated flag (cross-skill repeat) |
| "~100x more false anchor pairs" (TE inflation) | no primary (Wang 2012 gives mechanism, no fold) | no | **no** — over-claim / invented magnitude |
| SyRI INV >=5 kb / TRANS >=1 kb | no primary (Goel 2019 states no minimum calling size) | no | **no** — convention |
| GENESPACE ">30 genomes / plant-only" | no primary (Lovell 2022 states neither) | no | **no** — over-claim |
| `--cscore` values | JCVI software (absent from Tang 2008) | no (JCVI docs accessible) | **no** — software convention, not a paywalled crux |
| ">=90% TE masking" / "N50 >=1 Mb" / "<70% identity routing" | community convention | no | **no** — label, don't cite |
| macrosynteny ~150 Myr half-life; microsynteny ~1 Gyr | Naruse 2004 / Murat 2010 / Slot & Rokas 2010 (not ingested) | likely | **only if** block-age dating becomes load-bearing (it isn't for this referee) |

A surrogate hunt recovers a *paywalled fact from an OA stand-in*. None of the above is a paywalled
fact the referee needs; each is convention, confabulation, or a decorative number outside the
referee's scope. Nothing to launder, so nothing to hunt.

## The gap residue, triaged (the work-list)

The 6 `[GAP]` markers in the candidate Mold + the silent gaps from `comparison.md` §2, routed:

- **Gate 4 N50 >=1 Mb / Gate 9 SyRI >=5 kb / Gate 6 decay-rate / verdict combined-confidence** —
  *convention, not citable.* No primary defines them; the label is the answer. (SyRI's own graceful-
  degradation point N50>500 kb IS captured, as a degradation note, not a validity floor.)
- **Gate 5 reference-guided-scaffold circularity criterion** — *convention / unsourced.* No ingested
  primary states the circularity check; the Mold encodes it but labels the criterion unsourced, not
  cited. The distinctive validity axis with no backing primary — nothing to hunt, the label is the answer.
- **Gate 10a synteny/collinearity definitional citation** — *the one genuine new-source target, and it
  is OPTIONAL.* The cited Fitch-1976 does not resolve; a resolvable primary would be **Renwick 1971**
  (Annu Rev Genet 5:81, the usual "synteny" origin) or **Fitch 1970** (Syst Zool 19:99, the real
  terminology paper — but that one is ortholog/paralog, not synteny). Both are likely paywalled, but
  **the referee only needs to FLAG an unresolvable citation, which Gate 10 already does** — it does not
  need to supply the correct one. So this is a *future-authoring nicety*, not a Phase-5 surrogate hunt
  or a blocker. Recorded so the gap isn't silently dropped.
- **Gate 10b `--ploidy` / cscore-Tang / >=70% / blkSize-orthogroups** — *confabulation + convention.*
  Kept as anti-invention flags. Nothing to source.
- **The doer layer** (i-ADHoRe/Proost 2012, SynNet/Zhao 2017, ntSynt, plotsr/Goel 2022, MashMap/Jain
  2018) — *out of a Family-B referee's scope by design.* New-source items for a future doer/tool-
  selection Mold, not gaps in this referee.
- **The decay-rate primaries** (Naruse 2004 / Murat 2010 / Slot & Rokas 2010) — *out of scope + likely
  paywalled.* Would back a future synteny-block-dating doer (cross-references `[[whole-genome-
  duplication]]`), not this referee. Not ingested.

## Attribution discipline (carried forward)

No surrogate was ingested, so no attribution question arises. The verifications this probe performed
beyond the notes: (1) the **Fitch-1976 citation non-resolution** — the summarizer enumerated J Mol Evol
vol 7 via CrossRef/PubMed and found page 271 belongs to Zuckerkandl, not Fitch (a method-validation
event: the pipeline caught a fabricated citation propping the skill's opening claim); (2) the
**cross-skill `--ploidy` propagation** — the same confabulated AnchorWave flag already refuted in the
whole-genome-alignment probe (verified against the current AnchorWave master README) recurs verbatim
here. Neither is a gap-closure; both are the trace catching an upstream defect.

## Probe integrity

Phase 3 was **not** re-run. No surrogates were ingested, so the original note set is unchanged and the
recoverability measurement stands as recorded in `comparison.md`.
