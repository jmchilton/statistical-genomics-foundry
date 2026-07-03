# Guidance — hisse-type1-vignette (tutorial / package vignette)

> Attention-directing. This vignette is authored by HiSSE's own author (Beaulieu), so it faithfully
> carries the framework's argument — we ingest it as the accessible/GPL surrogate for the paywalled
> Beaulieu & O'Meara 2016 body. It grounds the "don't test a trait-diversification model against a
> trivial null" decision rule. Capture the argument + the CID model definitions + the API precisely
> enough to rebuild the recommendation and run it.

## Must capture
- The **null-model argument**: why comparing BiSSE against a constant-rate (Yule/birth-death) null is
  unfair, and what a *character-independent* null must instead hold constant (same diversification
  complexity / parameter count, but independent of the focal observed character). Quote the vignette's
  own statement.
- **CID-2 and CID-4** — exact parameterization: how many hidden states, how speciation/extinction and
  transition parameters are tied so diversification depends only on the hidden state, and which is
  BiSSE-equivalent vs HiSSE-equivalent in complexity. Capture the code that builds each (functional
  strings verbatim): the `turnover` / `extinction.fraction` vectors and the
  `TransMatMakerHiSSE(hidden.traits=, make.null=TRUE)` call.
- The **false-positive / Type-I numbers the vignette reports**, with their conditions — and note
  explicitly that these are the vignette's *re-analyses* (referencing Rabosky & Goldberg 2015), NOT
  the 2016 paper's own original simulation numbers. Capture verbatim (e.g. "~80%" BiSSE support that
  drops once CID models enter the set; the per-scenario figures).
- The **API**: confirmed function names and their key arguments — `hisse()`
  (`turnover`, `eps`/`extinction.fraction`, `hidden.states`, `trans.rate`), `TransMatMakerHiSSE(...,
  make.null=TRUE)`, `marginReconHiSSE()`, `GetModelAveNodeRates()`, plotting. Reproduce names/args
  verbatim (functional strings). Flag any function name you cannot confirm from the vignette text.
- Whether the vignette makes any claim about **ancestral-STATE reconstruction accuracy** (marginal
  reconstruction under hidden vs single rate). Expected: it provides `marginReconHiSSE` machinery but
  makes NO state-reconstruction-accuracy claim — confirm and state that silence explicitly. (Do NOT
  import an accuracy claim; that belongs to Beaulieu et al. 2013 corHMM, a different source.)

## Must-quote (hisse is GPL → short verbatim load-bearing quotes allowed, with location; functional
   strings — function names, argument names, the turnover/trans.rate code — verbatim regardless)
- The null-model argument sentence.
- The CID-2 / CID-4 definitions.

## Access / version notes
- hisse R package vignette "Type I errors, Model rejection, & HiSSE vs. FiSSE." Rendered:
  http://speciationextinction.info/articles/hisse-fisse-type1-vignette.html ; raw Rmd:
  https://rdrr.io/cran/hisse/f/vignettes/hisse-fisse-type1-vignette.Rmd . For the API/code, the
  companion "hisse-new-vignette" (https://rdrr.io/cran/hisse/f/vignettes/hisse-new-vignette.Rmd) has
  the current-interface CID-2/CID-4 setup. Pin the hisse package version summarized + access date.
  This is a *surrogate* for Beaulieu & O'Meara 2016 — attribute facts to THE VIGNETTE, do not launder
  them into a citation of the paywalled paper.
