# Guidance — OSAT (Bioconductor vignette + reference manual, tutorial)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> Why this note: the PAPER ([[yan-2012-osat]]) has the objective function but names no package version,
> gives no defaults, and prints the optimizer's name two different ways. This note captures the API a
> doer actually types, version-pinned. Read the docs; do not recall them.

> **License posture: license-aware (Artistic-2.0 → verbatim-ok).** Signatures, argument names, defaults
> and iteration counts are functional strings and stay verbatim regardless.

## Must capture (settle the spelling — do not "fix" anything silently)
- What is the **exported** optimization function actually called? Check the man-page topic name, the
  `See Also`, the package index, and the string passed to `create.optimized.setup(fun=...)`.
- Then search the vignette PROSE for the same name. **Do the prose and the code agree?** If any spelling
  appears in one place and not the other, report BOTH spellings verbatim, with the section each appears
  in. **Do not normalize them — the discrepancy is the finding.**

## Must capture (API + defaults)
- Full signatures with every default: `create.optimized.setup`, `create.experiment.setup`,
  `optimal.shuffle`, `optimal.block`, `setup.sample`, `setup.container`, `QC`, `multi.chisq.test`,
  `get.experiment.setup`.
- **What is the default iteration/attempt count for each optimizer?** State it exactly, per function.
  **Does any optimizer lack a default?**
- Separately: does the prose or any code comment state what iteration count is *normally used in
  practice*? Quote it. **If that number differs from the coded default, report both and say which is
  which.** (A default far below the docs' own recommended value is a live footgun and we need it recorded.)
- The minimal end-to-end call sequence the vignette demonstrates (phenotype data.frame → written-out
  assignment). Capture it as runnable code.

## Must capture (choosing between the two optimizers)
- Does the source state how the two algorithms differ and what each trades off (speed, global optimum,
  which variables get blocked vs merely optimized)? Quote it.
- Does it report a comparison of their results on the example data (chi-squared p-values, figures)?
  Capture the numbers.

## Must capture (silences — record them explicitly)
- Is there any concept of **run order, processing date, or position-within-plate** in the objective
  function? Quote or record the silence.
- Is there any warning about designs where the variable of interest is **confounded** with batch?
- Any reference/control/bridge sample support (a well reserved for a control in every batch)?
- **Is any acceptance threshold given** — a χ², p-value, or objective-function value above/below which
  an allocation is declared good enough? Record the silence explicitly if none.

## Pin
- OSAT version, Bioconductor release, `git_last_commit_date`, vignette date, access date.
