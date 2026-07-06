# Guidance — leek-2010 (paper)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.

## Must capture
- The detection recipe (hierarchical clustering / MDS / correlate principal components with batch surrogates).
- The claim that normalization does NOT remove batch effects (quote).
- The adjustment menu and WHEN each applies: covariates for known batch; SVA when the batch sources are
  unknown/unrecorded; ComBat named. Quote the "SVA when sources unknown" guidance specifically.
- The unfixable-confounding example (bladder cancer: CIS confounded with processing date; controls cluster
  by date) — quote, since it anchors skill-3's "aliased = unfixable" case.
- The ranges for susceptible features / surrogate–outcome confounding (note these are approximate).

## Must-quote
- The definition of batch effects.
- The "normalization does not remove batch effects" sentence.
- The "standard step in the analysis" recommendation.
