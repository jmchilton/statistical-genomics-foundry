# Guidance — designit (CRAN package documentation, tutorial)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> Why this note: designit is the skill's `primary_tool`, and **it has no method paper** (verified —
> CRAN cites Yan et al. 2012 for the OSAT score it implements, and there is no designit-specific
> publication). So the package documentation IS the citable artifact, and the method underneath it
> traces to [[yan-2012-osat]]. The skill warns its R6 signatures "drift between releases" — so this
> note is only useful if version-pinned hard.

> **License posture: license-aware (MIT → verbatim-ok, license_file required).** Copy the MIT license
> text. Signatures/arguments are functional strings.

## Scope — read these vignettes
- "Basic example"
- "OSAT and scoring functions"
- "designit: a flexible engine to generate experiment layouts"
- "Plate layouts" and "Shuffling with constraints" (only for the run-order / position-effect question below)

## Must capture (procedure spine — exact API, verbatim)
- `BatchContainer$new()`: full argument list, what `dimensions` means, how batch/position dimensions
  are declared. It is R6 — capture which operations are **methods on the object** vs standalone
  functions (the skill asserts `bc$get_samples()` is a method and there is no standalone
  `get_samples()` — verify against the docs, do not assume).
- `assign_in_order()` / any other assignment initializers, and `optimize_design()`: full signatures,
  every argument, **all defaults** (iterations, acceptance/annealing schedule, shuffle schedule).
- `osat_score_generator()`: full signature; what `batch_vars` and `feature_vars` mean; how it relates
  to the OSAT score of Yan et al. 2012 — does the vignette state it is the same score, an
  approximation, or a variant? Quote it.
- The **other scoring functions** available (e.g. any multi-variate / distance-based / custom score),
  and what the docs say about **when to choose which**. This is a doer decision the skill flattens.
- How **multiple scores** are combined (weighting, normalization, Pareto/aggregation) if supported.
- A complete, runnable end-to-end example: samples data.frame → container → optimize → retrieve
  assignment. Keep the code verbatim.

## Must capture (limits / failure modes)
- What do the docs say happens when a **balanced assignment is not achievable** (batch capacity <
  number of conditions, unequal group sizes)? Any diagnostic that the optimizer failed to balance?
- Any statement about **run-order / position-within-plate** effects (edge effects) and how to
  constrain for them.
- Any statement about designs that are already confounded / cannot be fixed by assignment.

## Must-quote (functional strings only)
- Every signature and default above.
- The exact package version and release date from the CRAN page.

## Pin
- designit version (0.5.0, published 2024-03-21 at time of proposal), CRAN URL, and access date.
  **Record the version prominently** — the skill itself warns signatures drift; a note that does not
  pin the version is not recoverable.
