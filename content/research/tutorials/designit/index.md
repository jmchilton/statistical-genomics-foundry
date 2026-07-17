---
title: "designit: Blocking and Randomization for Experimental Design"
type: tutorial
source_id: designit
source_url: https://cran.r-project.org/package=designit
docs_url: https://bedapub.github.io/designit/
version: "0.5.0"
published: 2024-03-21
access_date: "2026-07-13"
license: MIT
license_file: LICENSES/MIT.LICENSE
attribution: "designit: Blocking and Randomization for Experimental Design, version 0.5.0 (published 2024-03-21). Davydov I, Siebourg-Polster J, Steiner G, Rudolph J, Zhang JD, Banfai B. © F. Hoffmann-La Roche, MIT licensed. https://cran.r-project.org/package=designit — read from the CRAN source tarball (DESCRIPTION, NAMESPACE, R/, vignettes, inst/doc)."
derived: license-aware-summary
tags:
  - domain/experimental-design
  - domain/batch-effects
---

# designit (R package) — v0.5.0

> **VERSION PIN — read this first.** Everything below is read off **designit 0.5.0**
> (`Version: 0.5.0`, `Date/Publication: 2024-03-21 14:30:05 UTC`, `Packaged: 2024-03-19 09:27:56 UTC`).
> The R6 class members and function defaults **have changed across releases** (see the NEWS excerpts
> in §8: `bc$n_available` was *removed* in 0.3.0; `optimize_design()` itself was *new* in 0.2.0;
> `$scoring_f` is *deprecated* and now errors). **Do not carry these signatures to another version
> without re-checking.** Accessed 2026-07-13.

## 1. Citation

- **Authors** (from `DESCRIPTION`, `Authors@R`): Iakov I. Davydov [aut, cre, cph]; Juliane
  Siebourg-Polster [aut, cph]; Guido Steiner [aut, cph]; Konrad Rudolph [ctb]; Jitao David Zhang
  [aut, cph]; Balazs Banfai [aut, cph]; F. Hoffman-La Roche [cph, fnd].
  (Note: `DESCRIPTION` spells the funder "F. Hoffman-La Roche", with one *n*.)
- **Maintainer:** Iakov I. Davydov <iakov.davydov@roche.com>
- **Title:** "Blocking and Randomization for Experimental Design"
- **Version summarized:** 0.5.0 · **Published:** 2024-03-21 · **Repository:** CRAN
- **URLs:** https://cran.r-project.org/package=designit · https://bedapub.github.io/designit/ ·
  https://github.com/BEDApub/designit/ · BugReports: https://github.com/BEDApub/designit/issues
- **License:** `MIT + file LICENSE`. The shipped `LICENSE` file is the CRAN two-line template, in full:
  ```
  YEAR: 2024
  COPYRIGHT HOLDER: designit authors
  ```
- **Depends:** `R (>= 4.1.0)`. **Imports:** `rlang (>= 0.4.0), dplyr (>= 1.0.0), purrr, ggplot2,
  scales, tibble, tidyr, assertthat, stringr, R6, data.table, stats`. `RoxygenNote: 7.3.1`.
- **There is no designit method paper.** The package has no associated publication. `DESCRIPTION`
  attributes only the OSAT score to a paper: it says the package provides "an implementation for OSAT
  score by Yan et al. (2012, <doi:10.1186/1471-2164-13-689>)". The package documentation is therefore
  the citable artifact for designit itself.
- **Access date:** 2026-07-13.

## 2. Access note

Read in full, from the CRAN source tarball `designit_0.5.0.tar.gz` (`https://cran.r-project.org/src/contrib/`),
which is the authoritative artifact behind both the CRAN page and the pkgdown site. Read: `DESCRIPTION`,
`LICENSE`, `NAMESPACE`, `NEWS.md`, `README.md`, all of `R/` (the roxygen blocks in `R/` are the source
of the reference manual), all of `vignettes/`, and the **rendered** vignettes in `inst/doc/`.

No paywall. **No boundary on the API surface** — signatures and defaults below are transcribed from
the R source, not from memory or from a prose rendering. Two vignettes are shipped **pre-rendered**
(`vignettes/plate_layouts.Rmd` and the plate-scoring examples are `child=` includes of
`vignettes/cached/_*.html`); I read the cached HTML, which is what the published vignette shows.
The "Reference manual" was not read as a separate PDF — its content is generated from the `R/`
roxygen blocks I read directly.

## 3. Thesis

Batch effects can be avoided at the design stage by *assigning samples to batches/locations
intelligently* rather than randomly: define a `BatchContainer` (the experiment's dimensions) plus a
scoring function that reflects the contrasts of interest, and let a generic optimizer shuffle samples
to minimize that score.

## 4. Problem & context

From `DESCRIPTION` (verbatim, MIT):

> "Intelligently assign samples to batches in order to reduce batch effects. Batch effects can have a
> significant impact on data analysis, especially when the assignment of samples to batches coincides
> with the contrast groups being studied."

The `NCS22_talk` vignette ("designit: a flexible engine to generate experiment layouts") frames why
pure randomization is not enough (verbatim, MIT; vignette §"Go fully random?"):

> "* Could it be sufficient to randomly distribute samples across batches?
> * Not necessarily!
>     * Often sample sizes are too small to avoid grouping by change
>     * Experimental constraints might not allow for a fully random layout"

and quotes Box: "**Block** what you can and **randomize** what you cannot." (G. Box, 1978). The same
vignette demonstrates a seeded "gone wrong" case: `set.seed(17)` produces a *bad* random assignment of
31 grouped subjects into 3 batches (comment in source: `# gives 'bad' random assignment`).

## 5. Method / approach — recommended procedure and exact defaults

### 5.1 The two-object model

- **`BatchContainer`** — R6 class. Holds *locations* (the experiment's dimensions) and, once assigned,
  *samples* + the sample→location assignment. `cloneable = FALSE` (use `$copy()`).
- **`optimize_design()`** — a **standalone exported function**, not a method. It takes a container,
  returns a **new** container (it calls `batch_container$copy()` internally, so it does **not** modify
  its argument in place).

The `NCS22_talk` vignette states this division (verbatim, MIT):

> "* Data structure: `BatchContainer` class
>   * R6 object storing:
>       * Experiment dimensions (cages, plates…)
>       * Sample annotation
>       * Scoring functions for sample distribution
> * Main function: `optimize_design()`"

### 5.2 Method vs. standalone function — verified against `NAMESPACE`

The complete export list of 0.5.0 (`NAMESPACE`, verbatim) is:

```
BatchContainer, BatchContainerDimension, L1_norm, L2s_norm, accept_leftmost_improvement,
assign_from_table, assign_in_order, assign_random, batch_container_from_table,
compile_possible_subgroup_allocation, complete_random_shuffling, drop_order, first_score_only,
form_homogeneous_subgroups, generate_terms, get_order, mk_exponentially_weighted_acceptance_func,
mk_plate_scoring_functions, mk_simanneal_acceptance_func, mk_simanneal_temp_func,
mk_subgroup_shuffling_function, mk_swapping_function, optimize_design, optimize_multi_plate_design,
osat_score, osat_score_generator, plot_plate, shuffle_grouped_data, shuffle_with_constraints,
shuffle_with_subgroup_formation, sum_scores, worst_score
```

**`get_samples` is NOT in that list.** It is an R6 **method**: `bc$get_samples(...)`. There is no
standalone `get_samples()` function in 0.5.0. Likewise `$get_locations()`, `$move_samples()`,
`$score()`, `$copy()`, `$print()`, `$scores_table()`, `$plot_trace()` are **methods**; `$trace` is a
public **field**; and `$samples`, `$samples_attr`, `$assignment`, `$has_samples`, `$has_samples_attr`,
`$n_locations`, `$n_dimensions`, `$dimension_names`, `$scoring_f` are **active bindings**.
Conversely `assign_in_order()`, `assign_random()`, `assign_from_table()`, `optimize_design()`,
`osat_score()`, `osat_score_generator()`, `plot_plate()` are **standalone functions** taking the
container as first argument.

### 5.3 Exact signatures and defaults (verbatim functional strings)

```r
BatchContainer$new(locations_table, dimensions, exclude = NULL)
```
- `dimensions`: "A vector or list of dimensions. Every dimension should have a name. Could be an
  integer vector of dimensions or a named list. Every value of a list could be either dimension size
  or parameters for `BatchContainerDimension$new()`." Three accepted spellings, all seen in the docs:
  `dimensions = c("plate" = 3, "column" = 8, "row" = 6)` (sizes → values `1:size`);
  `dimensions = list("batch" = 3, "location" = 11)`;
  `dimensions = list(plate = 3, row = list(values = letters[1:3]), column = list(values = c(1, 3)))`.
- `exclude`: a `data.frame` of locations to drop, columns must match the dimension names. Used
  **only** together with `dimensions`; `locations_table` and `dimensions`/`exclude` are mutually
  exclusive (`msg = "dimensions and exclude cannot be used together with locations_table"`).
- **There is no batch-vs-position dimension declaration.** All dimensions are formally equal — a
  container is just the cartesian product of its dimensions (`expand.grid()`), minus `exclude`d rows.
  Which dimension is a "batch" and which is a "position" is decided *later and only by the scoring
  function*: `osat_score_generator(batch_vars = "plate", ...)` is what makes `plate` a batch;
  `mk_plate_scoring_functions(row = "row", column = "column", ...)` is what makes `row`/`column`
  positions. (Read off the code; the docs never state a batch/position distinction because none exists.)

```r
BatchContainerDimension$new(name, size = NULL, values = NULL)
```
- Requires `name` plus **either** `size` **or** `values`. `size` implies values `1:size`.
  Active bindings: `$size`, `$short_info` (e.g. `"mydim<size=10>"`), both read-only.

```r
bc$get_samples(assignment = TRUE, include_id = FALSE,
               remove_empty_locations = FALSE, as_tibble = TRUE)
bc$get_locations()
bc$move_samples(src, dst, location_assignment)   # either src&dst, or location_assignment, not both
bc$score(scoring)
bc$copy()
bc$scores_table(index = NULL, include_aggregated = FALSE)
bc$plot_trace(index = NULL, include_aggregated = FALSE, ...)
```
- `$move_samples()` **mutates in place** (returns `invisible(self)`). The Basic-example vignette flags
  this twice, verbatim: "**Warning**: This will change your BatchContainer in-place."
- `as_tibble = FALSE` returns a `data.table` (lower overhead); `include_id = TRUE` keeps `.sample_id`.

**Assignment initializers** (all return a *new* `BatchContainer`; all call `$copy()` first):
```r
assign_in_order(batch_container, samples = NULL)     # sample i -> location i, NA-pad the rest
assign_random(batch_container, samples = NULL)       # assign_in_order() then sample() the assignment
assign_from_table(batch_container, samples)          # samples table carries its own location columns
batch_container_from_table(tab, location_cols)       # build container AND assign, from one table
```
`optimize_design()` will call `assign_in_order()` **for you** if you pass `samples =` and the
container is empty — so an explicit initializer call is optional (see the end-to-end example below,
which passes `invivo_study_samples` straight to `optimize_design()`).

**The optimizer** — full signature, every default (from `R/optimize.R`):
```r
optimize_design(batch_container, samples = NULL,
                scoring = NULL,
                n_shuffle = NULL,
                shuffle_proposal_func = NULL,
                acceptance_func = accept_strict_improvement,
                aggregate_scores_func = identity,
                check_score_variance = TRUE,
                autoscale_scores = FALSE, autoscaling_permutations = 100, autoscale_useboxcox = TRUE,
                sample_attributes_fixed = FALSE,
                max_iter = 1e4, min_delta = NA, quiet = FALSE)
```
Behavioural defaults worth pinning:
- **`scoring` is mandatory in practice** despite defaulting to `NULL`:
  `msg = "Scoring should be provided when calling optimize_design()"`.
- **Default shuffle = ONE pairwise swap per iteration.** If both `n_shuffle` and
  `shuffle_proposal_func` are `NULL`, the optimizer builds `mk_swapping_function(n_swaps = 1)`
  (which returns the internal `pairwise_swapping`). `shuffle_proposal_func` **takes priority over**
  `n_shuffle` if both are given.
- **`n_shuffle` as a schedule:** if `length(n_shuffle) > 1` it is a per-iteration protocol and
  `max_iter` is silently reduced: `max_iter <- min(max_iter, length(n_shuffle), na.rm = T)`.
  Optimization also stops when the protocol is exhausted (the shuffle function returns `NULL`).
- **Default acceptance = strict improvement**, i.e. `accept_strict_improvement`:
  `all(current_score <= best_score) && any(current_score < best_score)`. (Note: `accept_strict_improvement`
  is `@keywords internal` and **not exported**; it is reachable only as the default value.)
- **Default aggregation = `identity`** (no aggregation; scores stay multi-dimensional).
- **Default annealing: none.** SA is opt-in via `acceptance_func = mk_simanneal_acceptance_func()`.
- `max_iter = 1e4`; `min_delta = NA` (off). `min_delta` stops when the euclidean distance between
  successive *best aggregated* score vectors drops below it.
- **`check_score_variance = TRUE` by default** — 100 random permutations, hard-fails on zero-variance
  subscores (see §9).
- Returns the optimized `BatchContainer`. **(Doc bug: the roxygen says `@return A trace object`, but
  the function returns `batch_container`; the trace is *inside* it, at `bc$trace`.)**
- `bc$trace` accumulates across successive `optimize_design()` calls on the same container (each gets
  an `optimization_index`), and stores `call`, `seed`, `rng_kind`, `scores`, `aggregated_scores`,
  `elapsed`, and the start/end assignment vectors. (`NEWS.md` 0.5.0: "BatchContainer trace saves the
  random seed as well as RNG kind".)

**OSAT scoring:**
```r
osat_score(bc, batch_vars, feature_vars, expected_dt = NULL, quiet = FALSE)
osat_score_generator(batch_vars, feature_vars, quiet = FALSE)
```
- `batch_vars` — "character vector with batch variable names to take into account for the score
  computation." `feature_vars` — "character vector with sample variable names to take into account for
  score computation." Both accept **vectors**: `osat_score_generator(batch_vars = "plate",
  feature_vars = c("treatment", "dose"))`.
- `osat_score()` takes a `BatchContainer` **or** a plain `data.frame`/`data.table` (one row per
  location) and returns a **list**: `list(score = ..., expected_dt = ...)`.
  `osat_score_generator()` is the wrapper you actually pass to `optimize_design(scoring = )`: it
  returns a closure `function(bc)` returning the bare numeric score, caching `expected_dt` across
  iterations ("to take full advantage of the speed gain without managing the buffered objects in the
  user code"). `expected_dt` "does not change during the optimization process. So it is a good idea to
  cache this value."
- **The exact score formula** (`R/osat.R`, verbatim): `score <- with(merged_df, sum((N - .n_expected)^2))`,
  where `.n_expected = .n_samples * .freq_batch` — i.e. **sum of squared deviations of observed from
  expected counts** over the (batch × feature-level) contingency table, with expectation = feature
  level count × batch frequency. Lower is better.

**Other scoring functions — the choice designit offers:**
```r
mk_plate_scoring_functions(batch_container, plate = NULL, row, column, group,
                           p = 2, penalize_lines = "soft")
```
- Returns a **list of scoring functions, one per plate** ("List of scoring functions, one per plate,
  that calculate a real valued measure for the quality of the group distribution (the lower the
  better)."). Named `"Plate"` for a single plate, else `paste("Plate", plate_names)`.
- This is the **distance-based / spatial** score: it builds a pairwise well-distance matrix
  (`mk_dist_matrix(plate_x, plate_y, dist = "minkowski", p = 2, penalize_lines = "soft")`) and scores
  so that "larger pairwise distances of samples of same group --> smaller overall score" (source
  comment). Exact per-group term (`R/score_plates.R`):
  `score <- score + ((group_freq[["lengths"]][i]^-2.6) * (group_trial %*% (distance_matrix %*% group_trial)))^-2`
  — note the **hard-coded exponents `-2.6` and `-2`**, which are not exposed as parameters and not
  explained anywhere in the docs.
- `p`: "p parameter for minkowski type of distance metrics. Special cases: p=1 - Manhattan distance;
  p=2 - Euclidean distance." Default `p = 2`.
- `penalize_lines`: "How to penalize samples of the same group in one row or column of the plate.
  Valid options are: 'none' - there is no penalty and the pure distance metric counts, 'soft' -
  penalty will depend on the well distance within the shared plate row or column, 'hard' - samples in
  the same row/column will score a zero distance." Default `"soft"`. `MAX_PLATE_DIM <- 200`.

**When to choose which score — what the docs actually say.** The docs give a **task-based** rule, not a
statistical one, and state it only in the plate-layout material (cached `_plate_layouts.html`, verbatim):

> "For optimization `optimize_multi_plate_design()` iteratively calls `optimize_design()` for
> different steps of the experiment. For across plate optimization osat scoring is used. For within
> plate optimization spatial scoreing is used. The order of the factors indicate their relative
> importance."

So: **OSAT score → balance a factor *across* batches/plates. Plate (distance) score → spread a factor
*within* a plate.** The `NCS22_talk` vignette demonstrates the same split as an explicit "2-step
optimization" (OSAT first with `osat_score_generator`, then within-plate with
`mk_plate_scoring_functions` + `shuffle_with_constraints(dst = plate == .src$plate)` to keep swaps
inside a plate). **The docs give no criterion beyond this across/within split** — no guidance on
choosing `p`, on `penalize_lines`, or on when a distance score would be preferable to OSAT for the
same purpose.

**Combining multiple scores** (all supported; `optimize_design(scoring = )` accepts a function *or a
named list of functions*, each returning a numeric vector):
- *No aggregation (default).* `aggregate_scores_func = identity` + `accept_strict_improvement`:
  a solution is accepted only if **every** subscore is ≤ and at least one is <.
- *Priority order.* `accept_leftmost_improvement(current_score, best_score, ..., tolerance = 0.0)` —
  compares left-to-right, first score is most important; `tolerance` lets "improvement in a less
  important score to exhibit some influence". Used throughout the vignettes as
  `acceptance_func = ~ accept_leftmost_improvement(..., tolerance = 0.01)` (purrr mapper syntax is
  supported for `acceptance_func`, `aggregate_scores_func`, `shuffle_proposal_func`).
- *Aggregators* (exported): `first_score_only(scores, ...)`, `worst_score(scores, na.rm = FALSE, ...)`
  (= max / infinity-norm), `sum_scores(scores, na.rm = FALSE, ...)`, `L2s_norm(scores, ...)` (squared
  L2), `L1_norm(scores, ...)`.
- *Exponential down-weighting:* `mk_exponentially_weighted_acceptance_func(kappa = 0.5,
  simulated_annealing = FALSE, temp_function = mk_simanneal_temp_func(T0 = 500, alpha = 0.8))`;
  "Weight for the first score's delta is 1, then the original delta multiplied with kappa^(p-1) for
  the p'th score". Asserts `0 < kappa < 1`.
- **Normalization** is the `autoscale_scores` route (default **`FALSE`**). Set `autoscale_scores = TRUE`
  to "perform a transformation on the fly to equally scale scores to a standard normal. This makes
  scores more directly comparable and easier to aggregate." Uses `autoscaling_permutations = 100`
  random permutations (**floored at 20 regardless**: `max(20, floor(autoscaling_permutations))`), and a
  boxcox transform if `autoscale_useboxcox = TRUE` **and** the `bestNormalize` package is installed,
  else a plain mean/sd standardization. Note autoscaling only kicks in when `score_dim > 1`.
  The optimizer-examples vignette warns (verbatim): "by 'normalizing' the distribution of the scores we
  obtain values centered around zero, thus that the optimized scores are likely to be negative. We may
  also want to decrease the delta_min parameter to match the new numerical range." And on L2: "we don't
  use the auto-scaling in this case as the L2-norm based optimization would force both normalized
  scores towards zero, not the minimal (negative) value that would be desired in that case."
- **No Pareto / multi-objective front** is offered. Aggregation is scalarization (or the
  strict/leftmost rules).

**Simulated annealing:**
```r
mk_simanneal_temp_func(T0, alpha, type = "Quadratic multiplicative")
mk_simanneal_acceptance_func(temp_function = mk_simanneal_temp_func(T0 = 500, alpha = 0.8))
simanneal_acceptance_prob(current_score, best_score, temp, eps = 0.1)   # internal, not exported
```
- `type` ∈ `"Exponential multiplicative"` (asserts `alpha` in `[0.8, 0.9]`),
  `"Logarithmic multiplicative"` (asserts `alpha > 1`), `"Quadratic multiplicative"` (default;
  `T0 / (1 + alpha * k * k)`; asserts `alpha > 0`), `"Linear multiplicative"` (`T0 / (1 + alpha * k)`;
  asserts `alpha > 0`). Default type chosen because it "seems to perform well".
- **SA requires a scalar score**: `msg = "Multi-dimensional scores have to be aggregated for simulated
  annealing to work.\nPlease specify a suitable aggregation function."`
- Doc advice (verbatim): "It is generally recommended for SA to make small changes at each step, like
  allowing just 1 sample swap per iteration."

**Shuffle-proposal functions:**
```r
mk_swapping_function(n_swaps = 1)
complete_random_shuffling(batch_container, ...)
shuffle_with_constraints(src = TRUE, dst = TRUE)
mk_subgroup_shuffling_function(subgroup_vars, restrain_on_subgroup_levels = c(), n_swaps = 1)
shuffle_grouped_data(batch_container, allocate_var, keep_together_vars = c(), keep_separate_vars = c(),
                     n_min = NA, n_max = NA, n_ideal = NA, subgroup_var_name = NULL,
                     report_grouping_as_attribute = FALSE, prefer_big_groups = FALSE, strict = TRUE,
                     fullTree = FALSE, maxCalls = 1e6)
form_homogeneous_subgroups(batch_container, allocate_var, keep_together_vars = c(),
                           n_min = NA, n_max = NA, n_ideal = NA, subgroup_var_name = NULL,
                           prefer_big_groups = TRUE, strict = TRUE)
compile_possible_subgroup_allocation(subgroup_object, fullTree = FALSE, maxCalls = 1e6)
shuffle_with_subgroup_formation(subgroup_object, subgroup_allocations, keep_separate_vars = c(),
                                report_grouping_as_attribute = FALSE)
```
- `shuffle_with_constraints(src, dst)` takes **expressions** evaluated against the samples/locations
  table; `dst` additionally sees `.src` (the selected source row). The canonical use is confining swaps
  to one plate: `shuffle_with_constraints(dst = plate == .src$plate)`.
- **Defaults inconsistency (read off the code, undocumented):** `prefer_big_groups` defaults to
  **`TRUE`** in `form_homogeneous_subgroups()` but to **`FALSE`** in the `shuffle_grouped_data()`
  wrapper that calls it. The two paths are not equivalent at their defaults.
- A shuffle function must return "either a numeric vector or a list" — an atomic location-assignment
  vector, **or** `list(src=, dst=)`, **or** `list(location_assignment=, samples_attr=)`. Returning
  `NULL` signals the end of the protocol and stops optimization.
- `optimize_design()` is documented as preferring `n_shuffle`: "It is recommended to use the
  `n_shuffle` parameter to steer the optimization protocol." And on fully random proposals: "Note that
  this is usually not a good strategy for converging to a solution."

**Multi-plate wrapper:**
```r
optimize_multi_plate_design(batch_container, across_plates_variables = NULL,
                            within_plate_variables = NULL,
                            plate = "plate", row = "row", column = "column",
                            n_shuffle = 1, max_iter = 1000, quiet = FALSE)
```
It internally runs OSAT across plates (with `acceptance_func = accept_leftmost_improvement`), then
loops plate-by-plate with `mk_plate_scoring_functions()` + `mk_subgroup_shuffling_function(subgroup_vars
= plate, restrain_on_subgroup_levels = curr_plate)`. **See §9 for a serious latent bug in this
function.** (Also: the `NCS22_talk` vignette calls it "the `multi_plate_layout()` function" in prose —
no such function exists; the exported name is `optimize_multi_plate_design`.)

**Plotting:**
```r
plot_plate(.tbl, plate = plate, row = row, column = column,
           .color, .alpha = NULL, .pattern = NULL,
           title = paste("Layout by", rlang::as_name(rlang::enquo(plate))),
           add_excluded = FALSE, rename_empty = FALSE)
```
`.tbl` may be a `BatchContainer` **or** a data.frame. `.color` is required (no default).

### 5.4 Complete, runnable end-to-end example (verbatim, MIT — from `R/optimize.R` `@examples`)

```r
data("invivo_study_samples")
bc <- BatchContainer$new(
  dimensions = c("plate" = 2, "column" = 5, "row" = 6)
)
bc <- optimize_design(bc, invivo_study_samples,
  scoring = osat_score_generator("plate", "Sex"),
  max_iter = 100
)
plot_plate(bc$get_samples(), .col = Sex)
```
(Note that this example passes `.col =` to `plot_plate`, which has no `.col` argument — it partially
matches `.color`. The vignettes consistently spell it `.color`.)

The fuller, idiomatic spine — samples data.frame → container → optimize → retrieve assignment
(verbatim, MIT; condensed from `vignettes/basic_examples.Rmd`):

```r
n_samp <- nrow(samples)
n_loc_per_plate <- 48 - 4
n_plates <- ceiling(n_samp / n_loc_per_plate)

exclude_wells <- expand.grid(plate = seq(n_plates), column = c(1, 8), row = c(1, 6))

bc <- BatchContainer$new(
  dimensions = c("plate" = n_plates, "column" = 8, "row" = 6),
  exclude = exclude_wells
)

bc <- assign_random(bc, samples)

bc <- optimize_design(bc,
  scoring = osat_score_generator(
    batch_vars = "plate",
    feature_vars = c("treatment", "dose")
  ),
  # shuffling schedule
  n_shuffle = c(rep(10, 200), rep(2, 400))
)

bc$plot_trace()
bc$get_samples(remove_empty_locations = TRUE)     # <- the final assignment
```
(The vignette's own prose describes this schedule as "swap 10 samples for 100 times, then swap 2
samples for 400 times", while the code says `rep(10, 200)` — the prose and the code disagree on 100
vs 200.)

## 6. Key claims / findings

- **designit's OSAT score is intended to reproduce Yan et al. (2012)'s, not approximate it.** The
  roxygen says the score "is intended to ensure even distribution of samples across batches and is
  closely related to the chi-square test contingency table (Yan et al. (2012))". The `osat` vignette
  goes further and asserts *numerical identity* with the original OSAT package — see §7 and §12.
- **The default optimizer is a hill-climber, not an annealer.** `accept_strict_improvement` + one
  pairwise swap per iteration + `max_iter = 1e4`.
- **Scores are minimized.** "the lower the better" (plate scoring); OSAT is a sum of squared
  deviations from expected counts, so 0 = perfectly balanced.
- **Multi-score optimization is first-class**, with three distinct combination strategies (strict
  dominance, leftmost priority with `tolerance`, or scalarizing aggregation), plus optional
  autoscaling to a standard normal for comparability.
- **The two-step plate procedure is the package's recommended plate recipe**: OSAT across plates, then
  distance-based spatial scoring within each plate, with swaps constrained to stay within a plate.
- **Constraint satisfaction is done in the *shuffle* function, not the score.** The
  `shuffling_with_constraints` vignette's key idea (verbatim): "every reshuffling produces a 'valid'
  sample permutation that is not violating those constraints, even if the suggested solution may be
  quite bad. During optimization, we pick the best design solution from the possible ones by
  appropriate scoring."
- **`keep_separate_vars` is explicitly a soft constraint**: "This is a soft constraint and will be
  relaxed in a stepwise way until solutions can be found."
- **Empirically demonstrated in the shipped vignette:** with `set.seed(17)`, random assignment of 31
  grouped subjects into 3 batches comes out unbalanced — the package's motivating counter-example to
  "just randomize".

## 7. Load-bearing statements — **license-aware mode (MIT → verbatim permitted, marked)**

License verified: `DESCRIPTION` says `License: MIT + file LICENSE`; `LICENSE` is the CRAN MIT template
(reproduced in §1). Short verbatim quotes are therefore permitted, each located below.

1. **[VERBATIM — `R/osat.R`, roxygen for `osat_score()`]**
   > "The OSAT score is intended to ensure even distribution of samples across batches and is closely
   > related to the chi-square test contingency table (Yan et al. (2012) \doi{10.1186/1471-2164-13-689})."

2. **[VERBATIM — `vignettes/osat.Rmd`, §"Using designit OSAT score implementation"]** — the code
   compares designit's score against the OSAT package's own optimum value, and the comment asserts:
   ```r
   bc$score(scoring_f)
   g_setup@metadata$optValue |> head(1)
   # should be identical
   ```

3. **[VERBATIM — `R/optimize.R`, `@param acceptance_func`]**
   > "Defaults to strict improvement rule, i.e. all elements of a score have to be smaller or equal in
   > order to accept the solution as better."

4. **[VERBATIM — `vignettes/NCS22_talk.Rmd`, §"Continuous confounding"]**
   > "Assays are often performed in well plates (24, 96, 384)
   > Observed effects
   > * Edge effects (bad plate sealing)
   > * Gradients (non-equal temperature distribution)
   > * Row / column effects (pipetting issues)
   > Since plate effects often cannot be avoided, we aim to distribute sample groups of interest evenly
   > across the plate and adjust for the effect computationally."

5. **[VERBATIM — `vignettes/NCS22_talk.Rmd`, §"Batch effects matter"]**
   > "Due to the plate effect, the control rows are affected differently. It is virtually impossible to
   > normalize readouts in a meaningful way."

## 8. Stated scope, assumptions, limitations (the source's own caveats)

- **Lifecycle: experimental.** README badge: `Lifecycle: experimental`.
- **The API has churned, by the maintainers' own record** (`NEWS.md`, verbatim excerpts):
  - 0.5.0: "remove several unexported functions"; "minimum R version 4.1.0"; "BatchContainer trace
    saves the random seed as well as RNG kind".
  - 0.3.0: "`bc$n_available` was removed (use `bc$n_locations` instead)"; "`BatchContainer` stores
    locations table (dimensions & excluded)".
  - 0.2.0: "new optimizer `optimize_design()`"; "various API improvements".
  - 0.1.0: "`BatchContainer` major API update"; "rename fields for consistency"; "hide cachind
    (`$samples_dt`) behind `$get_samples()`".
  - Live deprecation in 0.5.0: assigning `$scoring_f` raises
    `stop("scoring_f is deprecated, pass it to optimize_design() directly instead")`; assigning
    `$assignment` warns "this field might become read-only in the future, please use $move_samples()
    instead".
  **This is the source's own evidence that signatures drift between releases.**
- **SA needs scalar scores** (asserted, see §5.3).
- **Constraints cost balance.** The `shuffling_with_constraints` vignette's own closing comment
  (verbatim): "Obeying all constraints does not lead to a very balanced sample allocation".
- **Strict subgrouping may have no solution:** `strict` is documented as "if TRUE, subgroup size
  constraints have to be met strictly, **implying the possibility of finding no solution at all**"; and
  the vignette: "It is often necessary to release the `strict` criterion to find any solution at all
  that satisfies those size criteria."
- **Search-tree limits:** `maxCalls = 1e6` ("Maximum number of recursive calls in the search tree, to
  avoid long run times with very large trees"); `MAX_PERMUTATIONS <- 1e6` in
  `mk_subgroup_shuffling_function`.
- **Autoscaling is an estimate** from random permutations (min 20), so it is stochastic.

## 9. Failure modes / invalidity patterns — with the exact detector strings

designit fails **loudly, via `assertthat`**, and the messages are exact strings (functional strings,
reproduced verbatim). This is the referee-relevant surface.

**A. The optimizer refuses to run when a score cannot discriminate (the balance-not-achievable detector).**
`check_score_variance = TRUE` (default) draws **100 random permutations** (`random_perm = 100`,
hard-coded in the `optimize_design()` call to `random_score_variances()`, *not* the
`autoscaling_permutations` argument) and computes each subscore's variance. Then:
- zero-variance subscore ⇒ **hard abort**: `"Low variance scores detected! Check scores # <i>"`
  (threshold: `low_var_scores <- score_vars < 1e-10`).
- non-evaluable ⇒ message `"Caution! Non-evaluable scores detected! Check scores # <i>"`.
- On success it prints `"Checking variances of <n>-dim. score vector."` followed by the variances and
  `" - OK"` (or `" !!"`).
This is the closest thing to "the optimizer cannot balance this" — a score that cannot vary under
permutation (e.g. a feature perfectly nested in the batch dimension, or a batch variable with a single
level) stops the run rather than silently returning the input. **The docs never describe it in those
terms; the mechanism is read off `R/optimize.R`.**

**B. NAs are silently dropped from the OSAT score.** `warning("NAs in features / batch columns; they
will be excluded from scoring")` — and note `osat_score_generator()` sets `quiet = quiet || !first_call`,
so **the warning fires only on the first iteration**. Hard stop if a whole variable is NA:
`msg = "All elements of one of the features / batches are NAs"`. This warning is visibly emitted in the
shipped plate-layout vignette output, meaning designit's own worked example is scoring with NAs excluded.

**C. Capacity / shape violations** (all `assertthat` aborts):
- `"more samples than availble locations in the batch container"` (**note the typo `availble` — this is
  the literal string**).
- `"sample assignment length doesn't match the number of available locations"`;
  `"sample assignment does not match sample_ids (1..N_samples)"`;
  `"sample assignment should an integer vector without Infs"`.
- `"All locations in a container cannot be excluded"`; `"Columns of exclude should match dimensions"`;
  `"Some values are outside range in dimension '<dim_name>'"`.
- `"batch container already has samples"` — a container can be filled only once.
- `"some of the samples columns match batch container dimension names"` — sample column names must not
  collide with dimension names.
- `.sample_id` is reserved everywhere: `"Cannot use reserved name for a dimension (.sample_id)"`,
  `"samples data.frame has a column with reserved name .sample_id"`, etc.
- Sample-table hygiene, checked by `validate_samples()`: `"Samples should be a data.frame or tibble"`,
  `"Non-unique rows in samples"`, `"Samples should have at least one row"`, `"Samples contain all-NA rows"`.
  **Duplicate sample rows are rejected outright** — identical replicate rows must be made unique first.
- `stop("Samples lost or duplicated during exchange; check src and dst")` — integrity check after a move.

**D. Constraint-shuffling dead ends:**
- `warning("Cannot find destanation matching the constraints")` (**literal typo `destanation`**) —
  `shuffle_with_constraints` returns `list(src = NULL)` when `dst` matches nothing.
- `msg = "source conditions not satisfied"`.
- `msg = "Cannot form subgroups under strict setting with given constraints!"`.
- `warning("More group allocations requested than in available blocks. No solution returned.")` and
  `warning("Surplus block members. All available units are to be allocated. No solution returned.")`.
- `msg = "Subgroup shuffling is pointless for small containers (n<10)"`;
  `"Subgroup shuffling is pointless if there's only one subgroup involved"`;
  `"Subgroup shuffling requires all subgroups to have a minimum size of 2"`;
  `"Selected subgrouping variables should not contain any NA values"`.
- `msg = "Subgroup shuffling would lead to more than 1e+06 possible permutations. Consider a different solution."`

**E. Scoring-contract violations:** `"scoring function should return a numeric vector of positive
length"`; `"scoring cannot be a partially named list"`; `"score name cannot be 'step'"`;
`"No samples in the batch container, cannot compute score"`; and per-iteration
`"NA apprearing during scoring in iteration <n>"` (**literal typo `apprearing`**).

**F. Plate-scoring preconditions:** `"Row and column coordinates for plate <p> must be integer values"`
(coordinates must be `integer`, not `numeric`); `"...must not include NAs"`; `"...must be within range
1...200"`; `"Group variable for plate <p> must not be all NAs"`; `"Plate coordinates must be unique for
plate <p>"`; `"Non-unique row + column combination found. Please provide a plate variable."`

**G. Two latent bugs in 0.5.0 — read directly off the shipped code, NOT documented anywhere.** These
matter because they fail *silently*, not loudly:

1. **`optimize_multi_plate_design()` reads a free variable `bc` instead of its own `batch_container`
   argument.** In `R/score_plates.R` the function signature binds `batch_container`, but from line 232
   onward the body uses `bc`: `skip_osat <- ... dplyr::n_distinct(bc$get_locations()[[plate]]) < 2`,
   then `bc <- optimize_design(bc, ...)`, and it returns `bc`. `bc` is never assigned before first use,
   so R looks it up **in the caller's/global environment**. The vignettes all happen to name their
   container `bc`, which masks the bug. Consequence: calling
   `optimize_multi_plate_design(my_container, across_plates_variables = "Group", ...)` will either
   error with `object 'bc' not found`, or — worse — **silently optimize whatever global `bc` happens to
   exist**, ignoring the container you passed. (R's lazy evaluation means the `across_plates_variables
   = NULL` path short-circuits before touching `bc`, so the bug only bites when you actually request
   across-plate optimization.)

2. **`bc$exclude` does not exist; `plot_plate(add_excluded = TRUE)` therefore adds nothing.**
   `BatchContainer` in 0.5.0 stores only `locations_df` (already anti-joined against `exclude` at
   construction) — there is **no `exclude` field or active binding**. R6 returns `NULL` for an absent
   member, so `plot_plate()`'s `excluded <- .tbl$exclude` is `NULL` and the later
   `dplyr::bind_rows(.tbl, excluded)` is a no-op. **Confirmed empirically from the package's own
   rendered vignette** (`inst/doc/basic_examples.html`, verbatim output):
   ```
   bc$exclude
   #> NULL
   ```
   Yet the same vignette's prose instructs: "To properly distinguish between empty and excluded
   locations one can do the following. * Supply the BatchContainer directly * set `add_excluded = TRUE`
   …". The documented feature is inert in 0.5.0. (`plot_plate`'s `@param add_excluded` even says
   "flag to add excluded wells (in bc$exclude) to the plot".)

**H. Doc/code drift to be aware of:** `optimize_design()`'s `@return` says "A trace object" but it
returns the `BatchContainer` (§5.3); `NCS22_talk` names a nonexistent `multi_plate_layout()`; the basic
vignette's prose says "swap 10 samples for 100 times" where the code says `rep(10, 200)`.

## 10. What the source does NOT address (confident silences)

- **No statistical validity theory.** There is no power analysis, no Type-I-error argument, no claim
  about what the optimized layout does to downstream inference. The docs never say "and therefore your
  estimates are unbiased."
- **No stopping rule / convergence criterion beyond `max_iter` and `min_delta`.** Nothing tells you how
  many iterations are enough, and there is **no diagnostic that says "this design is now good enough"**
  or "the optimizer failed to balance". Absolute OSAT score values are never given an interpretation
  (no "score < X means balanced"); the trace plot is the only offered read-out.
- **No treatment of *already-confounded* designs.** The guidance question "what about designs that
  cannot be fixed by assignment (e.g. perfect confounding)?" is **not answered anywhere in the docs.**
  The closest artifacts are (a) the zero-variance abort (§9A), which is a mechanism, not a discussion,
  and (b) `formula_utils.R` (`generate_terms`, `drop_order`, `get_order`), which contains
  `stop("dataset contains fewer rows than the main effects model.")` and
  `stop("there are no interactions left in the model.")` — but `generate_terms` is exported and
  **undocumented in every vignette**; nothing explains its role. designit offers **no confounding
  detector** and no warning that assignment cannot rescue a design whose contrast is nested in a batch.
- **No run-order / temporal dimension.** See §12 — there is no time/run-order concept at all.
- **No power/replication guidance**, no sample-size advice, no cost model.
- **Randomization *for its own sake* is not defended** — designit optimizes; it never discusses the
  inferential price of a non-random (optimized) allocation, nor offers restricted randomization or a
  randomization test.
- **No reproducibility contract beyond the recorded seed.** The trace stores `seed` and `rng_kind`, but
  no vignette shows *restoring* from them.
- **The hard-coded plate-score exponents (`-2.6`, `-2`)** are never justified or referenced.

## 11. Open questions / ambiguities the source leaves unresolved

- Is the designit OSAT score **exactly** Yan et al.'s, or merely proportional/closely related? The
  roxygen hedges ("closely related to the chi-square test contingency table"), while the `osat`
  vignette asserts identity in a code comment ("should be identical") — and that vignette **only runs
  if the `OSAT` package is installed**, so a reader typically never sees the comparison execute. The
  numeric equality is claimed, not shown in the shipped output.
- What is the principled basis for the plate score's functional form (the `^-2.6` and `^-2`)? Unstated.
- When *should* one autoscale? The docs show how, and warn about sign/range consequences, but give no
  rule.
- What `p` / `penalize_lines` to pick? The wrapper defaults to `"soft"`; the plate-layout vignette's
  manual example uses `"hard"` with no stated reason for the difference.
- How many iterations are enough? No guidance beyond "play with T0 and alpha".

## 12. Guidance answers

**Q: `BatchContainer$new()` full argument list; what `dimensions` means; how batch/position dimensions
are declared.** → `BatchContainer$new(locations_table, dimensions, exclude = NULL)`. `dimensions` is a
named integer vector / named list / list of `BatchContainerDimension` objects; the container is the
cartesian product of dimension values minus `exclude`. **There is no batch/position declaration** — the
container does not know which dimension is a batch. That role is conferred *by the scoring function*
(`batch_vars=` in `osat_score_generator`, `row=`/`column=` in `mk_plate_scoring_functions`). See §5.3.

**Q: R6 — which operations are methods vs standalone functions; is `bc$get_samples()` a method and is
there no standalone `get_samples()`?** → **Verified against `NAMESPACE` (§5.2): the skill's assertion is
correct.** `get_samples` is not exported; it exists only as the R6 method `bc$get_samples(assignment =
TRUE, include_id = FALSE, remove_empty_locations = FALSE, as_tibble = TRUE)`. Full method/binding/
function split is in §5.2. Notable trap: `$move_samples()` mutates in place, while
`assign_*()`/`optimize_design()` all `$copy()` and return a new container.

**Q: `assign_in_order()` / other initializers, and `optimize_design()`: full signatures, every argument,
all defaults (iterations, acceptance/annealing schedule, shuffle schedule).** → §5.3, verbatim.
Headline defaults: `max_iter = 1e4`, `min_delta = NA`, `acceptance_func = accept_strict_improvement`
(**no annealing by default**), `aggregate_scores_func = identity`, shuffle = **1 pairwise swap/iteration**
when both `n_shuffle` and `shuffle_proposal_func` are `NULL`, `check_score_variance = TRUE`,
`autoscale_scores = FALSE`, `autoscaling_permutations = 100` (floored at 20),
`autoscale_useboxcox = TRUE`, `sample_attributes_fixed = FALSE`, `quiet = FALSE`.

**Q: `osat_score_generator()` full signature; what `batch_vars`/`feature_vars` mean; is it the same
score as Yan et al. 2012, an approximation, or a variant? Quote it.** →
`osat_score_generator(batch_vars, feature_vars, quiet = FALSE)`; both are character **vectors**;
`batch_vars` names the container/batch columns, `feature_vars` the sample-annotation columns to balance.
On the relationship to Yan et al., the docs give **two different strengths of claim**, quoted verbatim:
- Hedged (roxygen, `R/osat.R`): *"The OSAT score is intended to ensure even distribution of samples
  across batches and is **closely related to** the chi-square test contingency table (Yan et al. (2012)
  \doi{10.1186/1471-2164-13-689})."*
- Identity (code comment, `vignettes/osat.Rmd`): `bc$score(scoring_f)` vs
  `g_setup@metadata$optValue |> head(1)` → *"# should be identical"*.
- `DESCRIPTION`: *"we provide an implementation for OSAT score by Yan et al. (2012 …)"*.
The implemented formula is `sum((N - .n_expected)^2)` with `.n_expected = .n_samples * .freq_batch`.
**The docs never say "approximation" or "variant".** They claim an implementation of the same score.

**Q: The other scoring functions available, and what the docs say about when to choose which.** →
Only **two** score families ship: `osat_score`/`osat_score_generator` (categorical balance across
batches) and `mk_plate_scoring_functions` (distance-based spatial spread within a plate; also the
internal `mk_dist_matrix`). Everything else exported (`worst_score`, `sum_scores`, `L1_norm`,
`L2s_norm`, `first_score_only`) is an **aggregator**, not a score. **Choice rule as stated by the docs:
OSAT for *across*-plate/batch balance, spatial for *within*-plate distribution** (quoted in §5.3);
users are otherwise expected to write custom scoring functions (`optimize_design(scoring = )` accepts
any `function(bc)` returning a numeric vector). No deeper selection criterion is given.

**Q: How multiple scores are combined (weighting, normalization, Pareto/aggregation).** → Supported and
documented (§5.3): **strict dominance** (default), **leftmost priority with `tolerance`**
(`accept_leftmost_improvement`), **exponential weighting** (`mk_exponentially_weighted_acceptance_func`,
`kappa = 0.5`), and **scalarizing aggregators** (`first_score_only`, `worst_score`, `sum_scores`,
`L1_norm`, `L2s_norm`) applied via `aggregate_scores_func`. **Normalization** = `autoscale_scores = TRUE`
(off by default), boxcox-via-`bestNormalize` or mean/sd, estimated from `autoscaling_permutations = 100`
random permutations. **No Pareto front / multi-objective machinery.** Aggregation happens **after**
autoscaling and **before** the acceptance test (`@param aggregate_scores_func`: "AFTER (potential)
auto-scaling and BEFORE acceptance evaluation").

**Q: A complete, runnable end-to-end example, code verbatim.** → §5.4 (two: the minimal `@examples`
block from `optimize_design`, and the fuller plate spine from `basic_examples.Rmd`).

**Q: What happens when a balanced assignment is NOT achievable (batch capacity < number of conditions,
unequal group sizes)? Any diagnostic that the optimizer failed to balance?** → **Partially answered, and
the honest answer is mostly "no".**
- There **is** a pre-flight detector, but it detects *undiscriminating scores*, not *unachievable
  balance*: `check_score_variance = TRUE` aborts with `"Low variance scores detected! Check scores # …"`
  when a subscore has variance `< 1e-10` over 100 random permutations (§9A).
- There **is** a hard capacity assert: `"more samples than availble locations in the batch container"`
  (sic).
- There is **no** post-hoc diagnostic that the optimizer *failed to balance*. OSAT simply converges to
  the lowest reachable sum-of-squared-deviations, and **the docs give no threshold, no residual-imbalance
  test, and no warning** distinguishing "converged to a good design" from "converged to the least-bad
  impossible design". The only feedback is the printed score trace / `bc$plot_trace()`. Unequal group
  sizes are handled *implicitly* by the expected-count model (`.n_expected = .n_samples * .freq_batch`
  scales expectations by batch frequency), so unequal batches do not error — they just shift the target.
- The `shuffling_with_constraints` vignette does state the tradeoff outcome plainly (verbatim):
  "Obeying all constraints does not lead to a very balanced sample allocation".

**Q: Any statement about run-order / position-within-plate effects (edge effects) and how to constrain
for them?** → **Position-within-plate: yes, explicitly. Run-order: no — the concept is absent.**
- Edge/position effects are named and motivated (verbatim, §7 item 4): "Edge effects (bad plate
  sealing) / Gradients (non-equal temperature distribution) / Row / column effects (pipetting issues)",
  with the stated remedy: "we aim to distribute sample groups of interest evenly across the plate and
  adjust for the effect computationally." The `plate_effect_example` dataset + figure show a real plate
  effect where control rows are affected differently and "It is virtually impossible to normalize
  readouts in a meaningful way."
- The **mechanism** offered is the distance-based plate score (`mk_plate_scoring_functions`, spreading
  same-group samples apart) plus `penalize_lines = c("none","soft","hard")` for row/column effects, plus
  `exclude =` to physically drop wells (the basic vignette excludes the four **corner** wells:
  `exclude_wells <- expand.grid(plate = seq(n_plates), column = c(1, 8), row = c(1, 6))`), plus
  `shuffle_with_constraints(dst = plate == .src$plate)` to keep optimization within a plate.
- **Caveat:** `exclude` is how you avoid edge wells, but note the `bc$exclude` / `add_excluded` defect
  in §9G2 — you can exclude wells, you just cannot *plot* them as excluded in 0.5.0.
- **Run order / temporal position is never modelled.** There is no run-order dimension, no time
  covariate, no sequence-effect score. A "batch" may be a processing *day* (the optimizer-examples
  vignette: "8 samples can be processed per day (batch)"), but the *order within* or *across* days is
  never scored or constrained.

**Q: Any statement about designs that are already confounded / cannot be fixed by assignment?** →
**Not addressed.** See §10. The docs contain no discussion of perfect/structural confounding, no
detector for it, and no warning that assignment cannot repair it. The zero-variance abort (§9A) would
*incidentally* fire on some perfectly-confounded configurations (a score that cannot change under any
permutation), but the docs never present it that way, and it is not a general confounding check.

**Q: Must-quote — every signature and default above; the exact package version and release date.** →
Signatures/defaults are reproduced verbatim in §5.3. Version/date: **`Version: 0.5.0`**,
**`Date/Publication: 2024-03-21 14:30:05 UTC`** (CRAN "Published: 2024-03-21"),
`Packaged: 2024-03-19 09:27:56 UTC`. Guidance's expectation of 0.5.0 / 2024-03-21 is **confirmed**.
