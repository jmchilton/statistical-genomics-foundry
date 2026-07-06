---
title: "Estimating Gene Gain and Loss Rates in the Presence of Error in Genome Assembly and Annotation Using CAFE 3"
type: paper
source_id: han-2013-cafe3
source_url: https://academic.oup.com/mbe/article/30/8/1987/1017616
doi: 10.1093/molbev/mst100
access_date: "2026-07-03"
license: LicenseRef-all-rights-reserved
attribution: "Han MV, Thomas GWC, Lugo-Martinez J, Hahn MW. Estimating Gene Gain and Loss Rates in the Presence of Error in Genome Assembly and Annotation Using CAFE 3. Molecular Biology and Evolution 30(8):1987-1997, 2013. DOI 10.1093/molbev/mst100. Abstract verified via PubMed; body text retrieved from Oxford page with access boundary; summarized in own words."
derived: own-words-summary
---

# Han et al. 2013 — Estimating gene gain/loss rates in the presence of error using CAFE 3

## 1. Citation
Han MV, Thomas GWC, Lugo-Martinez J, Hahn MW. 2013. "Estimating Gene Gain and Loss
Rates in the Presence of Error in Genome Assembly and Annotation Using CAFE 3."
*Molecular Biology and Evolution* 30(8):1987–1997. DOI 10.1093/molbev/mst100. PubMed 23709260.
Article page: https://academic.oup.com/mbe/article/30/8/1987/1017616
Access date: 2026-07-03.

## 2. Access note (READ — boundary is load-bearing)
- **Not open access.** Europe PMC / EBI reports `isOpenAccess: "N"`, no PMCID, `hasPDF: "N"`,
  and the only full-text link is DOI with `availability: "Subscription required"`. No CC license.
- **Abstract — independently verified verbatim** via the open PubMed record (PMID 23709260).
  Everything in §3 traces to that.
- **Body text (§5, §6, §9, most of §12) — retrieved only through WebFetch's automated HTML→markdown
  conversion of the OUP article page, read by a small summarizing model; the raw article text was
  NOT directly inspected.** No independent full-text host was reachable to cross-check (Europe PMC
  rendered only navigation; no PMC copy exists). Consequences: (a) quote wording is not preserved —
  §7 is own-words regardless; (b) the numerics below (λ, ε values, corrected/uncorrected estimates,
  per-clade error rates) carry **residual retrieval uncertainty** — they are internally consistent
  across repeated fetches of the same URL, but repeated fetches of one cached page are not independent
  corroboration. Treat body-text numbers as "reported by the retrieval, not raw-verified." Re-check
  against the PDF if this note becomes load-bearing for a threshold.

## 3. Thesis (from the verified abstract)
Fragmented/incomplete genome assemblies produce annotation errors — especially in gene counts —
that mislead gene-family duplication/loss inference and cause rates of gene-family evolution to be
**consistently overestimated**; CAFE 3 models that error explicitly so gain/loss rates can be
inferred accurately even from low-quality assemblies/annotations.

## 4. Problem & context
- Sequencing yields large data but assemblies are "often fragmented and incomplete" (abstract).
- Incomplete/error-filled assemblies → many annotation errors, notably in **number of genes** present.
- Methods estimating gene duplication/loss are misled by such errors → gene-family evolution rates
  "consistently overestimated" (abstract). CAFE lineage: birth–death gene-family size modeling; this
  version (CAFE 3) adds the measurement-error layer.

## 5. Method / approach
*(body-text — see §2 boundary)*
- **Measurement-error layer at the tree leaves.** The observed gene-family size (W) at a tip is
  treated as a noisy readout of the unobserved true size (X). The likelihood marginalizes over the
  true count X at each leaf instead of taking the observed count as truth.
- **Error matrix Θ.** The measurement-error model is the set of probabilities P(W = w | X = x),
  arranged as a matrix Θ whose (i, j) entry is the probability of *observing* i when the *true*
  family size is j.
- **Simplifying assumption on Θ.** Error probability depends only on the **difference** between
  observed and true count (w − x), not on the absolute/true size — reducing the number of parameters.
  A maximum offset (±D from truth) further caps parameters.
- **Error parameter ε.** ε is the fraction of gene families (per species) whose observed size is
  miscounted. Retrieval-reported gloss: ε = 0.1 means ~90% of families observed = true, ~10% observed
  too large or too small, with the miscount being ±1 to ±3 genes per family per species. Error
  distributions may be **symmetric** (over- and under-counts equally likely) or **asymmetric**.
- **Global vs per-species.** Both supported: one error distribution shared across all species, OR
  different (heterogeneous) error distributions specified per species.
- **How error enters the birth–death likelihood.** CAFE 3 extends Felsenstein's pruning algorithm.
  At internal nodes the conditional likelihood is weighted by birth–death **transition probabilities**;
  at leaf nodes the weighting is instead supplied by the **error matrix Θ** — i.e. sum over plausible
  true counts X at the tip, each weighted by P(W|X) from Θ, then prune upward as usual. The error layer
  is a substitution of the leaf-node weighting, not a change to the internal birth–death machinery.
- **How the error rate is ESTIMATED — three routes:**
  1. **External/known-truth comparison.** Compare two versions of a genome (e.g. draft vs. reference);
     treat the better assembly as truth and compare the lesser to it → maximum-likelihood error matrix.
  2. **Two error-prone versions.** When no high-quality reference exists, compare two low-quality
     assemblies; reported as only slightly less accurate than comparison against a good reference.
  3. **Grid search from the data alone (no external data).** Fix an error model, find birth–death
     parameters maximizing the (pseudo)likelihood, repeat across a **grid of ε values**, and choose the
     error model that maximizes likelihood. Automated by the `caferror.py` script; the error model is
     applied in CAFE via the `errormodel` command/function with a specified error distribution.
- **Simulation/validation design.** Simulated on a 12-species *Drosophila* phylogeny (supp. Fig. S1);
  family sizes drawn from the distribution of ~11,434 real *Drosophila* families. True rate λ = μ =
  0.0012 (secondary runs at λ = 0.01 and 0.0001). Error levels ε ∈ {0.1, 0.4}, miscounts ±1 to ±3,
  symmetric and asymmetric variants. Number of replicates per condition: NOT SPECIFIED in retrieved text.

## 6. Key claims / findings
*(body-text — see §2 boundary; abstract-level items marked [abstract])*
- [abstract] Annotation errors "do lead to higher inferred rates of gene gain and loss," but CAFE 3
  "sufficiently accounts for these errors to provide accurate estimates."
- **Uncorrected error inflates λ; correct error model restores it.** With true λ = 0.0012:
  - ε = 0.1, no error model → λ̂ ≈ 0.00280; with the correct error model → λ̂ ≈ 0.00122.
  - ε = 0.4, no error model → λ̂ ≈ 0.00897; with the correct error model → λ̂ ≈ 0.00124.
  So uncorrected inflation grows with error level: ~2.3× at ε=0.1, ~7.5× at ε=0.4; correction returns
  estimates to within ~2% of truth.
- **Estimated real-data error rates.** ε = 0.0277 (fungi), 0.0732 (mammals), 0.041 (*Drosophila*)
  — i.e. ~2.8%, ~7.3%, ~4.1% of families miscounted; reported as correlating with genome features such
  as repetitive-element content.
- Two error-prone assemblies can estimate the error matrix "only very slightly less accurately" than a
  good-vs-poor comparison, so error estimation does not strictly require a high-quality reference.
- Robustness: using an *incorrect* error model was also tested to gauge sensitivity (see §9).

## 7. Load-bearing statements — OWN-WORDS mode (restrictive/unknown license)
License posture: "© The Author 2013. Published by Oxford University Press on behalf of the Society for
Molecular Biology and Evolution"; no Creative Commons or open license shown; EBI reports subscription
required. → **Restrictive.** No verbatim prose reproduced. Functional strings (symbols, commands,
numbers) are facts and kept verbatim.
- **Central claim (paraphrase of the abstract):** because incomplete assemblies cause gene-count
  annotation errors, gene-duplication/loss methods are misled and rates of gene-family evolution are
  *consistently overestimated*; CAFE 3's error model recovers accurate rates. (Operative term
  preserved: **"overestimated."**) Verified against the open PubMed abstract.
- **Error-model definition (paraphrase):** the measurement-error model specifies P(W = w | X = x), the
  probability of observing size w given true size x, arranged as matrix **Θ** with (i, j) = P(observe i
  | true is j); error depends on the difference w − x, not on x itself.
- **Likelihood integration (paraphrase):** the leaf-node summation differs from the internal-node
  summation only in that the leaf probabilities come from the error matrix rather than the birth–death
  transition probabilities.
- Functional strings (verbatim, license-exempt): symbols `W` (observed), `X` (true), `Θ` (error
  matrix), `ε` (error parameter/rate), `λ` (birth/gain rate), `μ` (death/loss rate); commands
  `errormodel`, script `caferror.py`; numbers λ=0.0012, λ̂ at ε=0.1 → 0.00280 / corrected 0.00122,
  λ̂ at ε=0.4 → 0.00897 / corrected 0.00124, ε = 0.0277 / 0.0732 / 0.041; miscount magnitude ±1 to ±3.

## 8. Stated scope, assumptions, limitations
*(body-text — see §2 boundary)*
- Gene-family sizes in a genome assumed **independent and identically distributed** across families.
- Error rate assumed to depend only on the difference (w − x), **not** on the true count x.
- Error distribution assumed **stationary** — same across families and across phylogenetic time.
- Errors modeled as symmetric or asymmetric offsets, capped at ±D from truth to limit parameters.
- The error matrix is unknown a priori and must be **estimated** as extra parameters.

## 9. Failure modes / invalidity patterns
- **Ignoring error → systematic overestimation of gain/loss rates** (the paper's core warning); the
  inflation scales with the true error level (~2.3× at ε=0.1, ~7.5× at ε=0.4 in simulation).
- **Too many free error parameters → non-convergence.** Estimating the error matrix from external data
  with **more than four parameters** was reported to fail to converge — a practical detector/limit on
  error-model complexity.
- **Wrong error model** (mis-specified ε/distribution) was tested; using an incorrect error model when
  inferring rates degrades accuracy relative to the correct model (magnitude of degradation: NOT
  captured precisely in retrieved text).
- Assumption violations that would invalidate correction: error that depends on true family size,
  non-stationary error across lineages/time, or correlated (non-i.i.d.) family sizes — all excluded by
  the stated assumptions, so real data breaking them is an unmodeled-error risk. [summarizer-inferred
  that these are the invalidation triggers; the paper states the assumptions but the retrieved text
  does not enumerate them as failure conditions.]

## 10. What the source does NOT address (from what was retrievable)
- The abstract cites "several other novel features" of CAFE 3 but the **retrieved text did not enumerate
  them**; whether separate λ/μ, per-family p-values / significance, Viterbi reconstruction, or special
  handling of large/fast families are framed as new here is NOT established from what was read. (Do not
  backfill from CAFE5/CAFE manuals.)
- Number of simulation replicates per condition not stated in retrieved text.
- No explicit numeric threshold "ε above which correction is mandatory" was found (see §12).

## 11. Open questions / ambiguities
- Exact minimum ε at which uncorrected inflation becomes practically material — the paper shows
  inflation at ε=0.1 and 0.4 but (in retrieved text) sets no cutoff.
- Precise accuracy penalty of a mis-specified error model (only qualitatively established).
- Whether "several other novel features" materially change outputs vs. the parent CAFE (De Bie 2006).

## 12. Guidance answers
- **Central overestimation claim + magnitude:** YES. Abstract (verified): errors "do lead to higher
  inferred rates of gene gain and loss," rates "consistently overestimated." Magnitude (body,
  retrieval-dependent): true λ=0.0012 inflates to ~0.00280 at ε=0.1 and ~0.00897 at ε=0.4 without
  correction (~2.3× and ~7.5×); correction restores ~0.00122 / ~0.00124.
- **Error model — what ε represents:** ε = fraction of gene families per species whose observed size is
  miscounted (miscount ±1 to ±3 genes); formally the model is the matrix Θ of P(observe w | true x),
  depending only on w − x. Symbol: **ε** (rate) / **Θ** (matrix).
- **Global vs per-species:** BOTH — a single shared error distribution, or heterogeneous per-species
  distributions.
- **How ε is estimated:** three routes — (1) compare draft vs. reference genome (better = truth),
  ML-estimate the matrix; (2) compare two low-quality assemblies (only slightly less accurate);
  (3) no external data → grid search over ε maximizing the (pseudo)likelihood, automated by
  `caferror.py`, applied via the `errormodel` command.
- **How error enters the likelihood:** Felsenstein pruning with leaf-node weighting replaced by the
  error matrix Θ — marginalize over true count X at each tip, weighting by P(W|X), then prune upward;
  internal nodes still use birth–death transition probabilities.
- **What CAFE 3 adds beyond the error model:** abstract says "several other novel features" but the
  retrieved text did **not enumerate** them; separate λ/μ mentioned as possible but not clearly flagged
  as new-in-v3 in what was read. NOT fully answered — access boundary (§2).
- **Validation design/numbers:** 12-species *Drosophila* tree; families from ~11,434 real families;
  true λ=μ=0.0012 (also 0.01, 0.0001); ε∈{0.1,0.4}, ±1–3, symmetric/asymmetric; corrected estimates
  recover truth (see §6). Replicate count NOT specified.
- **Threshold for when correction is needed:** the paper gives NO explicit ε cutoff in retrieved text;
  it demonstrates material inflation already at ε=0.1. Report as: no stated threshold.
- **Own caveats/limitations:** i.i.d. families; error depends on w−x not x; stationary error; matrix
  must be estimated; >4 external-data parameters did not converge (§8, §9).
- **Must-quote items:** under restrictive license, rendered as own-words paraphrases in §7 (the
  overestimation sentence and the error-model definition), with the operative term "overestimated" and
  functional symbols preserved verbatim.
