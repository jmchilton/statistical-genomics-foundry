# Guidance — beaulieu-omeara-2016-hisse (paper)

> Attention-directing, not leading. Grounds the skill's LOAD-BEARING cardinal sin: reconstructing/
> testing under a model that ignores hidden (unobserved) state–rate heterogeneity yields a
> confidently-wrong inference. Also the primary for "HiSSE is the required null, not BiSSE."

## Must capture
- The exact problem the paper states: what goes wrong when observed-state SSE models (e.g. BiSSE)
  attribute ALL diversification-rate heterogeneity to the focal observed character. Capture the
  paper's own framing of the false-association risk.
- What a "hidden state" is here and how HiSSE adds an unobserved character with its own
  diversification/transition dynamics. Capture the model structure precisely enough to state why it
  is a valid null for BiSSE.
- Any stated recommendation to use HiSSE (or a character-independent/hidden-state-only model) as the
  null model before claiming trait-dependent diversification. Quote the recommendation.
- Whether the paper makes claims about ANCESTRAL STATE / marginal reconstruction accuracy under
  hidden-rate vs single-rate models (the skill uses this cite for the up-front "silently wrong
  ancestor" claim). If it does, capture it; if it only addresses diversification (not ASR per se),
  say so explicitly — this matters for whether the skill's citation is on-point.
- Any simulation Type-I / false-positive rates reported, with the conditions.
- Software: R package name and the relevant function(s).

## Must-quote (apply license-aware rule; OUP Syst Biol = All Rights Reserved → own-words paraphrase;
   check bioRxiv/author PDF for a permissive posture; functional strings verbatim regardless)
- The statement of the false-association / model-inadequacy problem HiSSE addresses.
- The recommendation about the null model.

## Accessible surrogate carries most of this (body was paywalled on first pass)
The **hisse package vignette "Type I errors, Model rejection, & HiSSE vs. FiSSE"** (GPL; authored by
Beaulieu, so it faithfully mirrors the framework's own argument) carries, in citable form:
- the CID-as-null argument (1a); the **CID-2 / CID-4** parameterization (1b — CID-2: 4 diversification
  params tied to a hidden trait, BiSSE-equivalent complexity; CID-4: HiSSE-equivalent complexity,
  character-independent); false-positive numbers (1c — "BiSSE substantial support ~80%" → "1%" once
  CID-2 added); the API (1d — `hisse()`, `TransMatMakerHiSSE(..., make.null=TRUE)`, `marginReconHiSSE()`).
  Rendered: http://speciationextinction.info/articles/hisse-fisse-type1-vignette.html
- Prefer ingesting that vignette as `tutorials/hisse-type1-vignette` for the decision-rule + API; use
  THIS paper only for its own *original* simulated Type-I numbers (the vignette's are re-analyses).

## Do NOT source an ASR-accuracy claim to this paper (1e correction)
HiSSE 2016 is about **diversification-rate inference**, not ancestral-*state* reconstruction accuracy.
Any "the ancestor is silently wrong under a hidden-rate model" claim traces to **Beaulieu et al. 2013,
"Identifying hidden rate changes…" (corHMM)** — a different paper. Do not attribute a state-reconstruction
claim to HiSSE 2016; if the summary needs one, flag it as belonging to the 2013 corHMM paper.

## Access / version notes
- Syst Biol 65(4):583–601, 2016; DOI 10.1093/sysbio/syw022. Journal text ARR. Look for an OA author
  copy (jeremybeaulieu.org publications) or a bioRxiv preprint; record which you actually read and
  mark the paywall boundary. Package `hisse` on CRAN (current 2.1.x) — do not import package-doc
  numbers into the paper note; if you cite a package default, tag it [tool-doc], not the paper.
  Note: `MakeHiSSE`/`GetNullmodel`/`makeHiSSELikelihood` are NOT confirmed real function names; the
  confirmed null setup is `TransMatMakerHiSSE(..., make.null=TRUE)`.
