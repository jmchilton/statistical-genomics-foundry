# Guidance — neufeld-countsplit-2024 (paper)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> Grounds the SINGLE-CELL remedy that bioSkills omits: count splitting for inference after latent-
> variable estimation. Capture the procedure precisely enough to rebuild the recommendation.

## Must capture
- The exact problem: estimating a latent variable (cell type, cluster, pseudotime/trajectory) and
  then testing each gene for association with that estimate ON THE SAME DATA fails to control
  Type I error. Capture the source's own statement of why.
- The count splitting procedure: how a count is split into independent "train"/"test" folds via
  Poisson thinning. Capture the exact mechanism, the splitting/thinning parameter (often ε), any
  recommended/default value, and the property that makes the folds usable (independence under the
  Poisson assumption).
- The Poisson ASSUMPTION and what it buys; what happens under overdispersion. Does the paper
  point to a negative-binomial extension (and is that this paper or a companion 2023 paper)? Capture
  when NB count splitting is needed and what parameter it requires.
- The workflow: which step uses which fold (estimate latent variable on one fold, test on the other).
- Stated scope/limits: distributional requirements, what invalidates the guarantee.
- Software: the R package name and key function(s).

## Must-quote (apply license-aware rule; check the arXiv license tag — default to own-words if unknown)
- The validity / Type-I-control property of count splitting.
- The Poisson-assumption statement.

## Access / version notes
- Biostatistics 25(1):270–287, 2024; DOI 10.1093/biostatistics/kxac047. Open preprint:
  arXiv:2207.00554 (https://arxiv.org/abs/2207.00554). Prefer arXiv full text; check license before
  quoting. The NB extension is arXiv:2307.12985 (Neufeld et al. 2023) — note it, don't summarize it here.
