# Guidance — Leek 2011, Asymptotic conditional SVD (Biometrics)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> Why this note: `num.sv()` offers two estimators — `"be"` (the documented default) and `"leek"` (what
> every worked example actually passes) — and the sva man page **points to a Details section that does
> not exist**. This paper is the primary for the `"leek"` method. We need what each estimator IS.
> **We do NOT need a verdict on which is better** — see the provenance warning below.

> **License posture: own-words.** PMC3165001 is an **NIH-public-access author manuscript with no
> Creative Commons grant** → all-rights-reserved → `own-words-summary`. **No verbatim prose.** Equations,
> estimator steps, parameter names, and numbers are FACTS and stay verbatim.

## Must capture (what the estimators are)
- The **proposed method** ("leek"): the asymptotic conditional SVD procedure, step by step, in enough
  detail to re-implement. What is being estimated, under what asymptotics, and what is the rank
  criterion?
- The **comparator** ("be" — Buja & Eyuboglu 1992 permutation / parallel analysis): how does this paper
  DESCRIBE it? (Buja & Eyuboglu itself is paywalled with no OA route, so this description is our only
  reachable account of that method — capture it carefully, and label it as *this paper's description of
  someone else's method*, not as the original.)
- Any stated assumptions each method requires, and the regimes (n, p, signal strength) where each is
  claimed to hold.

## Must capture (the comparison — with its provenance attached)
- The simulation comparing the two estimators: setup, dimensions, signal, number of replicates, and the
  reported accuracy of each. Capture the numbers.
- **PROVENANCE WARNING — attach it to every comparative claim.** This is *the author of the `leek`
  method evaluating his own estimator against the alternative, on his own simulations.* Whatever it
  concludes, record it as **the paper's claim about its own method**, never as a neutral benchmark, and
  never as a decision rule. If the paper reports that the comparator underestimates or overestimates the
  rank, state exactly that and attribute it.

## Must capture (the silence we most need)
- **Does the paper give any rule for WHEN to prefer one estimator over the other in practice?** We
  expect not. **If it does not, record that as an explicit confident silence** — because the practical
  question ("`be` or `leek`?") currently has no source at all, and a skill answering it is inventing.

## Silences to record explicitly
- Does the paper address count / RNA-seq data (expect microarray-era only)? Name the data types used.
- Does it name a significance level, permutation count, or threshold for its own procedure? (The sva
  *implementation* uses `B = 20` and a `p ≤ 0.10` cutoff documented nowhere — check whether the paper
  states any such number, or whether that is purely an implementation choice.)

## Pin
- Biometrics 67(2):344–352; DOI 10.1111/j.1541-0420.2010.01455.x; PMC3165001; access date.
