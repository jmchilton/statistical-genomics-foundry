# external-batch-design — mirror-feasibility scorecard

- **Subject:** bioSkills `experimental-design/batch-design`
- **Subject type:** external skill (Family-A doer, advisory)
- **Source:** `GPTomics/bioSkills` @ `2fe089d` — `experimental-design/batch-design/SKILL.md`
- **Assessed:** 2026-07-13, via `/assess-external-skill` (recon inline; four parallel axis passes)
- **Framing:** grade the **best Foundry mirror we could build**, not the artifact as-shipped.

## Vector

**Operability A− · Assessability A− · Traceability A− · Refereeability A−**

Not a composite. Four A−s that are low for four *different* reasons — the work-list below is the point.
Uniformly strong candidate: a sharp, deterministic cardinal sin (batch⊥condition non-identifiability)
that is at once the most fixturable, the most refereeable, and the best-cited part of the skill.

---

## Operability — A−  `[design-inference]` on grade; tool facts externally checked this run

Worst-case load-bearing tool rule. OSAT and sva are effectively clean A; **designit (the primary
tool) is the −½**.

| Tool | load-bearing | bioconda | biocontainer | license | cross-platform |
|---|---|---|---|---|---|
| designit (CRAN, R6) | yes (assignment) | **no (404)** | **no** | MIT (permissive) | yes |
| OSAT (BioC) | yes (assignment) | `bioconductor-osat` | yes (auto-build) | Artistic-2.0 | yes |
| sva (BioC) | yes (`num.sv`/`sva()`) | `bioconductor-sva` | yes (auto-build) | Artistic-2.0 | yes |
| ComBat_seq / RUVSeq / limma | **no** — execution deferred to differential-expression | — | — | — | — |

- **Deduction:** A → −½ for designit not being on bioconda/conda-forge → cannot ride the
  bioconda→biocontainer path → not containerizable for a Foundry cast without a hand-authored recipe
  or R-inside-container. No copyleft or closed-source hits (all licenses permissive/weak).
- **Open Q3 (pure-R/BioC "no container" penalty):** resolved in the skill's favor — did **not**
  stack a second −½ for lacking a Docker image, since `install.packages()` is the ecosystem-normative
  documented install. The single −½ is the substantive conda gap, not the missing container norm.
- **`[verify]`:** exact quay.io biocontainer tags (SPA didn't render — existence inferred from recipe
  + universal auto-build norm); OSAT/sva Artistic-2.0 read from bioconda recipe, not upstream LICENSE.
- **Work-list:** author `r-designit`/`bioconductor-designit` recipe, or install designit via R in the
  cast container. Documentation cluster is a clean A (install targets + pinned version floors +
  API-drift introspection guidance) — the letter is dragged only by designit's packaging.

## Assessability — A−  (feasibility ceiling; ships zero scenarios → as-shipped is F)

Grades whether a fixture-bound test could *drive* a mirror. The skill's headline insight reduces to a
**deterministic, data-free, checkable property**, which is why the ceiling is high.

| Surface branch | known ground truth? | planted-invalid + control? |
|---|---|---|
| Balanced assignment (sheet) | **exact** — design-matrix rank / batch~condition orthogonality | yes |
| Confounded-vs-balanced diagnosis | **exact** — aliased ⇒ rank-deficient vs full-rank | **yes — the BAD/GOOD pair IS this** |
| SVA hidden-batch detection | known-with-tolerance (`num.sv` stochastic) | yes (injected batch vs none) |
| Correction-method choice (table) | **no — judgment**; *Nygaard slice* has a published verdict | Nygaard slice only |
| Collider/mediator/confounder | stats fact deterministic; *in-context identification* is judgment | partial |

- ≈ **3.5 of 5 branches** reach a genuine known verdict; the method-choice table and in-context
  collider-ID are irreducibly judgment (demo, not test) → the −½ vs a clean A.
- Both rubric load-bearing dimensions (scenarios.md quality, non-model ground truth) hit top band for
  the skill's *core* — orthogonality needs no omics data and is exact.
- **`[verify]`:** `bladderbatch` (Artistic-2.0, 57×5, the canonical sva teaching set) as a realism
  fixture; Nygaard reproducible code at `ous-uio-bioinfo-core/batch-adjust-warning-figures` (confirmed
  exists; verify it still runs on current R/sva before pinning); `num.sv` seed-stability.
- **Work-list:** author `scenarios.md` (none exists). Cheapest high-value first: confounded vs
  balanced sample sheets, verdict = `model.matrix()` rank/aliasing (pure R, no BioC data). Then SVA
  (synthetic-injected as the deterministic test + bladderbatch as realism check); vendor the Nygaard
  sim as the one method-choice test with a published verdict; label the rest of the decision table
  and collider-ID explicitly as judgment-not-test.

## Traceability — A−  (clean A on traceability; the −½ is the open-access sub-axis)

Every load-bearing citation resolves, **both hero numbers trace to primaries that state them**, every
named API is real, **zero confabulation**.

- **Numbers trace:** Nygaard's ">1000 spurious DE vs 11 honest" (GSE61901) and Kang's "~50 SNPs/cell
  → 97% singlet assignment" both confirmed against the primaries — the strongest traceability signal.
- **CLI real:** designit R6 API (`BatchContainer$new`/`optimize_design`/`osat_score_generator(batch_vars,feature_vars)`),
  `OSAT::optimal.shuffle()` (skill's "no bare `osat()`" warning is correct), `sva` counts-vs-log
  (`ComBat_seq` vs `ComBat`) — all verified; no invented flags.
- **The −½ (open Q3 in the flesh):** 5 of 8 citations are paywalled-but-real, **including the two most
  load-bearing** (Leek 2010, Nygaard 2016). The central non-identifiability claim has **no OA primary
  cited**. If Q3 resolves toward "paywalled-but-real scores with OA," this is a clean **A**.
- **`[verify]` / escalate:** a full `/ingest-bioskill` should pull Nygaard's exact simulation setup +
  table/figure (confirm the "mean-centering injects group differences" mechanism framing, not just the
  count) and confirm Kang's "~50 SNPs" isn't over-generalized from its simulation regime.
- **Work-list:** find an OA anchor for the non-identifiability claim (or convention-label the
  linear-algebra aliasing argument — it's textbook). OA surrogates already present: Leek & Storey 2007
  (SVA), Zhang 2020 (ComBat-seq), Yan 2012 (OSAT).

## Refereeability — A−  (cardinal sin sharp; strong Calibrate constructable; construction risk = −½)

The shipped skill has **no gate/referee** (advisory) — this grades the mirror's feasibility.

- **Cardinal sin (right one):** batch aliased with condition → `model.matrix(~ condition + batch)`
  rank-deficient → non-identifiable; "correction rescued it" is provably false. The skill itself ranks
  this first.
- **Calibrate is constructable (clears the bar above Critique-only)** — unusually clean because the
  cautionary source *is itself a simulation*: reproduce Nygaard — simulate counts under known truth,
  impose a confounded/unbalanced layout, run ComBat, measure realized FDR vs nominal; expected
  signature = large spurious DE list where batch-in-model finds few. Plus a deterministic structural
  pre-gate (design-matrix rank) and SVA calibration (known injected batch; SV-subtracted matrix →
  show p-value inflation).
- **Non-circular:** referee checks matrix rank + realized FDR under referee-planted truth — not the
  doer's own narrative. Near-ideal.
- **Open Q3 stance (per-path, weighted to the cardinal sin — *not* worst-case):** the headline
  deliverable (salvageability verdict) is fully Calibrate-gateable; the resistant paths are advisory
  and refereed downstream (method-choice → differential-expression) or a causal-classification
  judgment whose *mechanism* is still simulable. So Q3 pushes the grade **up**, unlike Operability's
  worst-case rule — Refereeability is about self-certification of the *load-bearing* claim.
- **The −½:** (1) residual mixed-doer surface — method-choice and collider-*classification* can't share
  the one empirical oracle, so a blanket-gate claim would over-reach; (2) the entire referee is
  **constructed, not observed** — every A-criterion is feasibility the mirror must build.
- **Work-list (biggest feasible→built gap):** **no Nygaard 2016 source note exists yet.** Ingest it
  (own-words vs license-aware per license) capturing the exact simulation setup + >1000-vs-11 figures
  + realized-FDR method, so the Calibrate check is note-recoverable, not model-memory. Then run the
  blind-author-from-notes test to confirm the simulation regenerates from notes alone. Define an SVA
  tolerance band (±1 SV over N seeds — likely a convention to label). Scope the gate to
  identifiability + realized-FDR; route collider-structure judgments to Critique + domain input.

---

## Work-list (the point of the card)

Ranked by leverage for standing up a mirror:

1. **Refereeability — ingest Nygaard 2016 as a source note** (the single biggest feasible→built gap;
   unlocks the Calibrate check as note-recoverable). Run blind-author-from-notes on the simulation.
2. **Assessability — author `scenarios.md`**, cheapest-first: confounded vs balanced sample sheets
   (pure-R rank verdict), then SVA (synthetic + bladderbatch), then vendor the Nygaard sim.
3. **Operability — resolve designit packaging** (author a conda recipe or install-in-container) so a
   cast is reproducible; this is the only sub-A-quality tool fact.
4. **Traceability — OA-anchor (or convention-label) the non-identifiability claim**; escalate a full
   `/ingest-bioskill` only if the Nygaard mechanism framing needs firming beyond the number.

## Unresolved questions (rubric-calibration, surfaced by this run)

- Operability Q3 and Traceability Q3 both **materially moved this card** (each worth the half-step).
  Two A−s hinge on unsettled cutoffs — worth settling before grading more R/BioC skills.
- Refereeability Q3: this run took a **per-path, cardinal-sin-weighted** stance (not worst-case). If
  that becomes the rule, note it in the rubric — it diverges from Operability's worst-case rule by
  design.
