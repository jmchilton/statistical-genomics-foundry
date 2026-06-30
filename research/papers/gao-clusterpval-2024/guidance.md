# Guidance — gao-clusterpval-2024 (paper)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> Grounds the cluster-then-test signature of [[double-dipping]] and its VALID test. The single most
> important pull here is the counterintuitive load-bearing fact about independent datasets.

## Must capture
- The exact problem statement: a classical test for difference in means controls Type I error when
  groups are defined a priori, but inflates it when groups are defined by CLUSTERING the same data.
  Capture any stated magnitude of the inflation.
- THE load-bearing claim: does the source state that the problem persists *even if two separate,
  independent datasets* are used to define the clusters and to test for a difference in means?
  Capture this precisely — it is the fact that defeats the naive "just split the data" fix and is
  why a selective/conditional test is needed.
- The proposed valid test: the selective-inference p-value that CONDITIONS on the clustering event.
  What exactly is conditioned on (the realized clustering / the specific pair of clusters compared)?
  For which clustering algorithms and linkages is an exact/tractable test derived?
- The assumed data-generating model (e.g., spherical Gaussian, known vs. estimated variance) and
  any scope limits on dimensions/linkages.
- Software: the R package name and the key function(s).
- Whether the method targets a difference in MEANS specifically, and what null it tests.

## Must-quote (apply license-aware rule; check the arXiv license tag — default to own-words if unknown)
- The "independent datasets do not fix it" statement.
- The Type-I-inflation statement (with any quantitative figure).

## Access / version notes
- JASA 119(545):332–342, 2024; DOI 10.1080/01621459.2022.2116331. Open preprint: arXiv:2012.02936
  (https://arxiv.org/abs/2012.02936). Prefer the arXiv full text; check its license before quoting.
