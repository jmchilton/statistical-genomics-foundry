# Guidance — de-bie-2006-cafe (paper)

> Attention-directing. The CAFE software origin and — load-bearing — the source of the PER-FAMILY
> p-value + branch-specific significance test that the whole skill's FDR / multiple-testing workflow
> operates on. Oxford Bioinformatics — restrictive/unknown → own-words; functional strings verbatim.

## Must capture
- What CAFE (v1) computes on top of Hahn-2005's birth-death model: (1) estimate the global birth-death
  rate; (2) infer most-likely ancestral family sizes at internal nodes; (3) assign each family a
  p-value for having an ACCELERATED / unusual rate of gain-loss; (4) identify WHICH BRANCHES make a
  significant family's p-value small. Capture how the per-family p-value and the branch attribution
  are computed (the null model each is tested against). This is the object the skill FDR-corrects.
- Whether the paper addresses MULTIPLE TESTING across many families at all, or leaves it to the user.
  (The skill's "multiple-testing across families" cardinal sin may trace to NO CAFE primary — capture
  the paper's silence or statement precisely; this is a candidate silent gap.)
- Input requirements (tree, family-size matrix) and any stated tree/branch-length assumption.

## Must-capture (functional strings verbatim)
- The exact terms for the per-family significance output and branch-attribution output.

## Access / version notes
- Bioinformatics 22(10):1269-1271, May 2006; DOI 10.1093/bioinformatics/btl097.
- Restrictive/unknown license → own-words; functional strings verbatim.
- Lower priority than the CAFE5 note: ingest if the per-family-significance / multiple-testing axis
  needs a clean primary; otherwise Mendes-2020 + MSMB-chap6 may suffice and this can be deferred.
