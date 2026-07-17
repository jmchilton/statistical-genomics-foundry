---
title: "Frequent adaptation and the McDonald-Kreitman test"
type: paper
source_id: messer-petrov-2013
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC3666677/
doi: 10.1073/pnas.1220835110
access_date: "2026-07-05"
license: LicenseRef-all-rights-reserved
attribution: "Messer PW, Petrov DA. PNAS 110(21):8615-8620, 2013. DOI 10.1073/pnas.1220835110. PMID 23650353; PMCID PMC3666677. Main text read via PMC HTML (display equations transcribed from served images); freely available through the PNAS open-access option, but the exact license is not printed on the page [summarizer-inferred; unverified, treated as all-rights-reserved]; own-words summary, functional strings retained as facts."
derived: own-words-summary
tags:
  - domain/molecular-evolution
  - domain/population-genetics
---

# Messer & Petrov 2013 — Frequent adaptation and the McDonald–Kreitman test

## 1. Citation
Messer PW, Petrov DA. 2013. "Frequent adaptation and the McDonald–Kreitman test."
*PNAS* 110(21):8615–8620. DOI 10.1073/pnas.1220835110. PMID 23650353; PMCID PMC3666677.
Full text read via PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC3666677/ (access date 2026-07-05).

## 2. Access note
Full main text read (Abstract through Materials and Methods) from the PMC HTML rendering.
Equations and inline math are served as images in that rendering; the three display equations
([1],[2],[3]) and the load-bearing inline expressions (exponential fit form, cutoff values,
point estimates) were retrieved as image files and transcribed directly. The SI (SI Text /
SI Materials and Methods, Table S1, Fig. S1) was **not** read — statements citing "(SI Text)"
or "(SI Materials and Methods)" are referenced but their contents are outside this summary.

## 1.5 License mode
**Own-words.** The PMC record states the article is "Freely available online through the PNAS
open access option," but the specific license is not printed on the page [summarizer-inferred: the
exact CC variant is not verifiable; Europe PMC reports no license]. Unverified → treated as
restricted (`LicenseRef-all-rights-reserved`, own-words-only) under the default-deny rule. §7 is
paraphrased; equation forms and functional strings are reproduced verbatim as facts regardless.

## 3. Thesis
Linked selection (genetic draft + background selection) systematically biases the MK test and its
DFE/demography-correcting extensions — standard MK generally **underestimates** the adaptation rate
α, but a simple **asymptotic extension** of MK (extrapolating a frequency-resolved α(x) to x→1)
recovers accurate α in the authors' forward simulations.

## 4. Problem & context
The MK test contrasts polymorphism vs. divergence at neutral (synonymous) and functional
(nonsynonymous) sites to estimate α, the fraction of functional substitutions fixed by positive
selection. It is robust to mutation-rate and coalescent-history variation across the genome, but is
known to be confounded by (a) slightly deleterious mutations and (b) demography. Extensions correct
for these by inferring the DFE and/or demography — but all assume **site independence**. Recent
evidence that genetic draft (recurrent linked sweeps) and background selection pervasively violate
independence motivates testing whether MK-type methods survive realistic linkage.

## 5. Method / approach
- **Forward population-genetic simulations** of a 10-Mb chromosome with realistic gene structure
  (1 gene / 40 kb; each gene = 8 exons × 150 bp separated by 1.5-kb introns; 550-bp 5′ UTR,
  250-bp 3′ UTR; three of four sites in exons/UTRs functional, every fourth exon/UTR site synonymous).
  ~4% of chromosome functional (deliberately conservative vs. denser genomes like *Drosophila*).
- Mutations codominant, fitness effects additive across sites. Evolves under mutation, recombination,
  selection. Parameters chosen so products Nμ, Ns, and ratio s/r are what matter; tuned to human-like
  synonymous heterozygosity and to functional/synonymous substitution-rate ratio observed in humans.
- Functional mutations of four types (neutral, beneficial, deleterious, strongly deleterious), each a
  specific selection coefficient; 40% of functional mutations always strongly deleterious. Free
  parameters: strength of purifying selection, strength of positive selection (s_b), and rate of
  adaptation α. **α ranged 0 to 0.5; s_b from 0.001 to 0.05; deleterious Ns from −1 to −100** (Table S1).
- Divergence estimated from fixations during a run; polymorphism/SFS from **population samples of 100
  randomly drawn chromosomes** taken every N generations.
- Studied linkage effects on: (i) neutral heterozygosity, (ii) SFS at functional & synonymous sites,
  (iii) fixation probabilities of deleterious mutations, then (iv) resulting MK α estimates.
- Evaluated **DFE-alpha** (Eyre-Walker & Keightley) as representative DFE-based extension, under its two
  demographic models (constant size; single instantaneous size change), on simulated data whose
  nonadaptive DFE was drawn from a gamma distribution (shape β = 0.2, matching human estimates).
- Proposed and demonstrated **asymptotic MK** (see §6/§7), applying it to simulations and to real
  *D. melanogaster* and human nonsynonymous polymorphism/divergence data.

### MK α estimator — verbatim (eq. [1])
`α ≈ 1 − (d₀/d)(p/p₀)`
where p, p₀ are polymorphism at functional and neutral sites; d, d₀ divergence at functional and
neutral sites. (d₀ = neutral divergence, p₀ = neutral polymorphism.)

### Wright–Fisher fixation probability under free recombination — verbatim (eq. [2])
`π(s) = (1 − e^(−2s)) / (1 − e^(−4Ns))`

## 6. Key claims / findings
- **Standard MK underestimates α, even with frequency cutoffs.** Considering only polymorphisms with
  derived allele frequency `x ≥ 0.1` (Fig. 2 Left) or `x ≥ 0.5` (Fig. 2 Right), MK estimates still
  underestimate α, often substantially. Example: **true α = 0.4 → MK estimate −0.2** at cutoff
  `x ≥ 0.1`; raising the cutoff to `x ≥ 0.5` reduces but does not remove the discrepancy.
- **The bias is downward** (toward negative α) and is **worse for weakly deleterious than strongly
  deleterious** mutations: weakly deleterious variants contribute to polymorphism but have low fixation
  probability; strongly deleterious contribute to neither polymorphism nor divergence and don't bias α.
  Stronger positive selection mitigates the bias (weakly deleterious become effectively neutral).
- **No single effective population size (N_e) works.** Fixation probabilities of deleterious mutations
  under linkage map to *different* inferred N_e for different selection coefficients; no scalar N_e
  reproduces fixation across all four deleterious classes. Because N enters eq. [2] exponentially,
  small N differences yield large fixation-probability differences.
- **Draft distorts the SFS like a population expansion** — skews toward low-frequency variants — at
  **both** functional and synonymous sites, and these distortions do not fit any constant-N_e
  mutation–selection–drift model once adaptation is even moderate.
- **DFE-alpha (constant-size model)** systematically **overestimates α**, underestimates strength of
  purifying selection, and overestimates gamma shape β by up to ~2×.
- **DFE-alpha (step-change model)** gives more accurate α and β but overestimates mean deleterious
  selection strength, and **always infers a population expansion that never occurred** — even with
  **zero** adaptation it infers a ~5-fold expansion (background selection alone biases demographic
  inference); at α ≈ 0.1 it already infers ~10-fold expansion (a built-in DFE-alpha limit).
- **Asymptotic MK recovers α.** Proof-of-principle run (s_b = 0.01, s_d = −0.0002, true α = 0.42):
  standard MK at cutoff `x ≥ 0.1` gives **α = 0.08**; asymptotic MK gives **α = 0.38**. Across the
  gamma-DFE runs it is much more accurate than cutoff-MK and than DFE-alpha without demographic
  correction, and comparable to DFE-alpha *with* correction.
- **Real-data application.** Human nonsynonymous: asymptotic **α = 0.13 (0.09, 0.19)**, consistent with
  α = 0.1–0.2 from ref. 22; note standard MK excluding all polymorphisms below 10% frequency gives a
  **negative** value, **α = −0.05**. *D. melanogaster*: asymptotic **α = 0.57 (0.54, 0.60)**, similar to
  (slightly higher than) prior estimates. CIs from 1,000 bootstrap replicates.

## 7. Load-bearing statements (own-words — all-rights-reserved; equations/functional strings kept verbatim as facts)
- Downward-bias headline (Abstract): when slightly deleterious mutations are present, standard MK
  estimates of α severely underestimate the true adaptation rate — even after excluding all
  polymorphisms below 50% population frequency.
- **Asymptotic α(x) definition — verbatim (eq. [3]):**
  `α(x) = 1 − (d₀/d)(p(x)/p₀(x))`
  where p(x), p₀(x) are levels of polymorphism at functional and synonymous sites for the specific
  derived allele frequency x.
- Why it cancels demography/draft (Discussion): because α(x) depends only on the ratio p(x)/p₀(x),
  any bias that shifts the SFS at functional and synonymous sites equally — whether from demography
  or genetic draft — cancels; extrapolating α(x) to x → 1 should then converge near the true α,
  provided adaptive mutations contribute little to polymorphism and purifying selection has been
  roughly stable over time.
- **Fitted functional form — verbatim:** an exponential of the form
  `α(x) = a + b·exp(−cx)`
  fitted for all `x ≥ 0.1` by nonlinear least-squares and extrapolated to `x → 1` (Fig. 3A). The
  authors motivate the exponential for the case of a single shared deleterious selection coefficient
  (functional polymorphism then decays roughly exponentially relative to neutral with increasing
  frequency), while noting the correct form is unclear when selection coefficients follow a broad
  distribution unless the DFE is known.
- Mechanism cutoffs don't fix it (Discussion): under recurrent sweeps a slightly deleterious mutation
  can hitchhike to substantial frequency, become unlinked in the late phase, and persist as a common
  polymorphism while slowly declining — at every stage its frequency overstates its fixation
  probability, and excluding low-frequency polymorphisms does not remove such mutations from the
  sample.

## 8. Stated scope, assumptions, limitations (the source's own caveats)
- Asymptotic MK **assumes** (i) adaptive mutations do not significantly contribute to polymorphism and
  (ii) purifying selection has been sufficiently stable over time.
- The exponential fit is justified for a **single deleterious selection coefficient**; the correct
  functional form for a broad DFE is **not known unless the DFE is known**. The authors show the
  exponential still "works reasonably well" empirically for gamma-distributed coefficients but flag it
  as unproven generally.
- future work must check whether the asymptotic approach also holds for a wider class of DFEs
  and complex demographic scenarios — and it is equally unclear whether DFE-alpha-with-correction would.
- Simulation scenario is one gene structure / recombination regime at ~4% functional density; presented
  as conservative, not exhaustive.
- Conclusions rest on forward simulations plus two real datasets; not a general analytic proof.

## 9. Failure modes / invalidity patterns
- **Standard MK (with or without a frequency cutoff): downward-biased / can go negative** whenever
  slightly deleterious mutations + linked selection are present. Symptom/detector named: a **negative
  α estimate** (human data yielded α = −0.05 at a 10% cutoff), and estimates that stay below the true
  value even after excluding sub-50% polymorphisms.
- **Frequency-cutoff remedy fails** because draft lets slightly deleterious variants persist as frequent
  polymorphisms whose frequency overstates fixation probability — they survive the cutoff.
- **DFE-based methods (e.g., DFE-alpha) on mutation–selection–drift assumptions**: misestimate DFE mean
  and shape → tend to **overestimate α** (constant-size model). Named symptom: gamma shape β overestimated
  up to ~2×.
- **Demography-correcting methods**: recover α but **infer spurious demography** — DFE-alpha's step-change
  model always infers a population-size expansion even though none occurred. Named detector:
  an inferred large past expansion (≥5-fold even at α = 0, ~10-fold by α ≈ 0.1) from synonymous-site SFS
  is a red flag that draft/background selection, not demography, is being fit. General warning:
  estimating demography from neutral sites that lie close to functional ones (such as synonymous sites)
  will in general produce erroneous inferences of population expansions.
- **No scalar N_e** can simultaneously reproduce fixation probabilities across selection-coefficient
  classes — so plugging a single effective N into diffusion formulas is invalid under moderate draft.

## 10. What the source does NOT address
- No closed-form/analytic theory correcting MK for linkage (authors call for "new analytics").
- No general derivation of the correct α(x) functional form for arbitrary DFEs.
- No treatment of complex/realistic demographies combined with draft for the asymptotic method (flagged
  as future work).
- No explicit minimum-data prescription (see §12) — sample size in sims is 100 chromosomes, but no stated
  per-bin site-count threshold for the asymptotic fit.
- SI-resident details (exact simulation code, background-selection/draft analytic approximations, Table S1
  full parameter grid) not covered here (SI not read).

## 11. Open questions / ambiguities left unresolved
- Which functional form to fit α(x) when selection coefficients come from a broad DFE.
- Whether asymptotic MK holds under complex demography + high draft.
- Whether any current method (asymptotic MK or DFE-alpha-with-correction) is reliable across the full
  realistic parameter space.
- How to obtain trustworthy demographic inference when synonymous sites are draft-distorted.

## 12. Guidance answers
- **Mechanism of slightly-deleterious downward bias, and why toward negative α:** Answered (§6, §7,
  §9). Slightly deleterious variants contribute to *polymorphism* (p up) but have low *fixation*
  probability (little contribution to divergence d), so eq. [1] `α ≈ 1 − (d₀/d)(p/p₀)` inflates the
  subtracted term `(d₀/d)(p/p₀)` and drives α **down, even negative**. Frequency cutoffs don't rescue it
  because under recurrent sweeps a slightly deleterious mutation hitchhikes to high frequency, unlinks
  late in the sweep, and lingers as a frequent (yet ultimately non-fixing) polymorphism — at every
  stage the mutation's frequency overstates its fixation probability. Bias is worse for
  *weakly* than *strongly* deleterious mutations.
- **Asymptotic-MK procedure + functional form + estimator equation verbatim:** Answered (§7). Compute
  frequency-resolved `α(x) = 1 − (d₀/d)(p(x)/p₀(x))` [eq. 3] across derived-allele-frequency bins, fit
  `α(x) = a + b·exp(−cx)` (exponential) for `x ≥ 0.1` by nonlinear least-squares, and extrapolate to
  `x → 1`; that limit ≈ true α. CIs via 1,000 bootstrap resamples of the observed α(x) values.
- **Data requirements (min sites/bin, SFS density, sample size):** The paper states **no explicit
  minimum sites-per-frequency-bin** and **no "≥50 sites/bin" threshold**. What it does state: simulation
  population samples of **100 chromosomes**; the exponential fit is over derived-allele-frequency bins for
  `x ≥ 0.1`; goodness-of-fit and CIs come from 1,000 bootstrap replicates. A skill claiming "≥50 sites/bin"
  is **not supported by this source** — report as convention, not from this paper.
- **Robustness to demography (and limits):** Answered (§7, §8). By construction α(x) depends only on the
  ratio p(x)/p₀(x), so any biases that shift the SFS at functional and synonymous sites in the same way,
  whether from demography or genetic draft, effectively cancel out — i.e., robust to
  demography *to the extent it perturbs functional and synonymous SFS equally*. Limits: assumes adaptive
  mutations don't contribute much to polymorphism and purifying selection is stable over time; the
  exponential form is only justified for a single deleterious coefficient; authors explicitly flag that
  robustness under complex demographic scenarios and broad DFEs is unverified.
