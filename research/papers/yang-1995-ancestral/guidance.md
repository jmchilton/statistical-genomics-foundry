# Guidance — yang-1995-ancestral (paper)

> Attention-directing. The founding primary for marginal (empirical-Bayes) ML ancestral sequence
> reconstruction — the procedure-spine anchor and the source the skill (mis)cites for the 0.95
> posterior cutoff. Determine whether Yang 1995 actually prescribes ANY posterior threshold.

## Must capture
- The method: how posterior probabilities of character states at interior nodes are computed given a
  substitution model, tree, and branch lengths (empirical-Bayes / marginal reconstruction). Capture
  the procedure precisely enough to rebuild the recommendation.
- Whether the paper prescribes a confidence/posterior CUTOFF for calling a site "reliable" (e.g.
  0.95). This is load-bearing: the skill attributes the ≥0.95 threshold to Yang 1995. Report exactly
  what, if any, cutoff the paper states. If it states none, say so explicitly — then 0.95 is
  convention, not citable to this paper.
- Marginal vs joint distinction as framed here (if addressed).
- Stated accuracy/limitations: dependence on the assumed model, effect of branch lengths, behavior
  when data are sparse or divergences deep.
- Software mentioned (PAML lineage).

## Must-quote (Genetics 1995 — OA via PMC, check the reuse posture; short verbatim load-bearing quotes
   allowed if the OA license permits; functional strings/equations verbatim regardless)
- The definition of the per-site posterior probability of an ancestral state.
- Any sentence stating (or NOT stating) a confidence threshold.

## Access / version notes
- Genetics 141(4):1641–1650, 1995. Free full text PMC1206894. Confirm the OA/reuse terms before
  verbatim quoting. Companion: Yang's PAML manual (separate tutorials/paml-manual note) covers the
  codeml RateAncestor=1 implementation — keep implementation defaults there, theory here.
