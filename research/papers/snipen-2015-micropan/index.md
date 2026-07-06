---
title: "micropan: an R-package for microbial pan-genomics"
type: paper
source_id: snipen-2015-micropan
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC4375852/
doi: 10.1186/s12859-015-0517-0
access_date: "2026-07-05"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Snipen L, Liland KH. micropan: an R-package for microbial pan-genomics. BMC Bioinformatics 16:79, 2015. DOI 10.1186/s12859-015-0517-0. Summary also uses the author-written CRAN heaps() documentation accessed 2026-07-05."
derived: license-aware-summary
---

# micropan: an R-package for microbial pan-genomics (Snipen & Liland 2015)

## 1. Citation
Snipen L, Liland KH. 2015. "micropan: an R-package for microbial pan-genomics."
*BMC Bioinformatics* 16:79. Published 2015 Mar 12. DOI: 10.1186/s12859-015-0517-0.
PMID: 25888166. Open-access: https://pmc.ncbi.nlm.nih.gov/articles/PMC4375852/

Companion source: author-written CRAN package documentation for the `heaps()` function,
https://search.r-project.org/CRAN/refmans/micropan/html/heaps.html (accessed 2026-07-05).
Treated as author package documentation; its rule wording is a functional string.

## 2. Access note
Full text of the BMC article read via PMC (open access). The CRAN `heaps()` man page read in
full (Arguments / Details / Value sections). No paywall boundary.

## 3. Thesis
micropan is an R package providing a complete toolkit for microbial pan-genome analysis, including
estimating whether a pan-genome is **open** or **closed** via a Heaps-law model of newly observed
gene clusters.

## 4. Problem & context
Pan-genome studies need to characterize how the gene repertoire grows as more genomes are added,
including whether new gene clusters keep appearing indefinitely (open) or the discovery rate is
saturating (closed). micropan bundles the relevant estimators; this note isolates the Heaps-law
openness estimator (`heaps()`) and its decision rule.

## 5. Method / approach (Heaps-law openness estimator)
- **What is fitted / against what:** The Heaps-law model is fitted to the **number of new gene
  clusters** observed as genomes are added, where the genomes are placed in a **random order**.
  Rarefaction curves (from repeated random orderings) are the data the model is fitted to.
- **Model parameters:** an **intercept** and a **decay parameter called `alpha`** (α). The function
  returns a vector of these two estimated parameters (`Intercept`, `alpha`).
- **Decay-parameter symbol:** `alpha` / α (NOT gamma). This is the exact symbol as written in both
  the paper and the man page.
- **Function signature (CRAN):** `heaps(pan.matrix, n.perm = 100)`.
  - `pan.matrix`: a pan-matrix (see `panMatrix`).
  - `n.perm`: the number of random permutations of genome ordering; **default = 100**.
- **Attribution:** the approach is attributed to Tettelin et al. 2008 (reference `[28]` in the
  paper) — see §7.
- **Related estimators in the package (context only):** a binomial mixture model is fitted via
  `binomixEstimate()` using BIC for component selection (the *E. faecalis* worked dataset selected
  14 components). Not the openness estimator; recorded to avoid conflating the two.

## 6. Key claims / findings
- The pan-genome open/closed status is decided from the estimated Heaps-law decay parameter α
  against a **boundary of 1.0**: α < 1.0 → open, α > 1.0 → closed.
- Worked example (*Enterococcus faecalis* dataset): **α was estimated to 0.82**, indicating an
  **open** pan-genome (0.82 < 1.0 threshold).
- The paper attributes the Heaps-law openness idea to Tettelin et al. 2008, not to micropan.
- On the man page, the default number of genome-ordering permutations (`n.perm`) is 100, and the
  authors state 100 is *certainly a minimum* — i.e. more permutations may be advisable. This is a
  statement about **permutation count, not about a minimum number of genomes.**

## 7. Load-bearing statements (verbatim — permissive license: CC BY for the paper; functional
strings for the man page)

Paper (PMC4375852), Methods/Results on pan-genome openness:
> "Pan-genome openness/closedness can be estimated as suggested by [28], using a Heaps law type of
> model. This model is fitted to rarefaction curves for the data."

Paper, worked example (attribution/interpretation load-bearing):
> "The Heaps law model parameter α was estimated to 0.82, indicating an open pan-genome, the
> threshold being 1.0"

Paper reference `[28]`:
> Tettelin H, Riley D, Cattuto C, Medini D. Comparative genomics: the bacterial pan-genome.
> *Curr Opinions Microbiol*. 2008.

Paper copyright line:
> "© Snipen and Liland; licensee BioMed Central. 2015 ... This is an Open Access article distributed
> under the terms of the Creative Commons Attribution License"

CRAN `heaps()` man page (functional strings — author package documentation):
> Details: "If 'alpha>1.0' the pan-genome is closed, if 'alpha<1.0' it is open."

> Value: "A vector of two estimated parameters: The 'Intercept' and the decay parameter 'alpha'.
> If 'alpha<1.0' the pan-genome is open, if 'alpha>1.0' it is closed."

> Details (fit target): fitted to "the number of new gene clusters observed when genomes are
> ordered in a random way"; the model includes "an intercept and a decay parameter called 'alpha'."

> Details (attribution): uses "a Heaps law approach suggested by Tettelin et al (2008)."

> Arguments/Details (`n.perm`): "The number of random permutations of genome ordering." /
> "The default value of 100 is certainly a minimum."

## 8. Stated scope, assumptions, limitations
- The estimator is a curve-fit to rarefaction curves generated by random genome orderings; the
  result depends on the sample of genomes and on the number of permutations used.
- The paper cautions against over-interpreting the worked-example openness result (α=0.82 is
  reported as merely *indicating* an open pan-genome).
- The default n.perm=100 is flagged by the authors as only a minimum, implying results at the
  default may be under-sampled.

## 9. Failure modes / invalidity patterns
- Reading α on the wrong convention: the **boundary is 1.0** and **α < 1.0 = open** here. Using a
  boundary of 0, or an "exponent > 0 = open" rule, would invert/mis-scale the verdict (that is a
  *different* surface form — see §12 known conflict).
- Too few permutations: with `n.perm` at the default 100 (a stated minimum), the fitted α may be
  unstable; the authors' caveat implies increasing n.perm for a trustworthy estimate.
- [summarizer-inferred] Very few genomes would make the rarefaction curve short and the α estimate
  unreliable, but the source states **no explicit minimum genome count** (see §10, §12).

## 10. What the source does NOT address
- **No closed-form Heaps equation is printed** in either the paper or the man page (no
  `new_genes ∝ N^(−α)` or `n = κ·N^α` block appears). The parameter α is named and its
  interpretation rule stated, but the equation itself is not written out.
- **No minimum number of genomes** required to estimate α reliably is stated anywhere in either
  source. The only "minimum" mentioned is on `n.perm` (permutations), not genomes.
- The relationship of this α to the gamma-exponent form used elsewhere is not discussed (see §12).

## 11. Open questions / ambiguities
- The exact functional form fitted (the Heaps equation) must be recovered from the code or from
  Tettelin 2008, not from these two sources.
- How large n.perm should be beyond "≥100" is not quantified.
- Whether α is fitted per-permutation and averaged, or across all permutations jointly, is not
  spelled out in the read text.

## 12. Guidance answers
1. **How micropan models openness / decay-parameter symbol:** Heaps-law model fitted to the number
   of new gene clusters observed as genomes are added in random order (rarefaction curves).
   Parameters: an intercept and a **decay parameter `alpha` (α)** — NOT gamma. (Paper + man page,
   §5, §7.)
2. **Closed-form equation printed?** **No** — neither source prints the Heaps equation. Only the
   parameter α and its threshold rule are given. Silence recorded explicitly. (§10.)
3. **Open-vs-closed decision rule (verbatim):** Man page: *"If 'alpha>1.0' the pan-genome is closed,
   if 'alpha<1.0' it is open."* Value section restates it: *"If 'alpha<1.0' the pan-genome is open,
   if 'alpha>1.0' it is closed."* Boundary = **1.0**; **open side is α < 1.0**. Paper confirms
   *"the threshold being 1.0."* Matches the expected wording.
4. **Worked-example exponent (verbatim):** *"The Heaps law model parameter α was estimated to 0.82,
   indicating an open pan-genome, the threshold being 1.0"* — α = **0.82**, verdict **open**.
5. **Attribution (verbatim, fixes provenance):** *"Pan-genome openness/closedness can be estimated
   as suggested by [28], using a Heaps law type of model."* Reference `[28]` = Tettelin H, Riley D,
   Cattuto C, Medini D. *Comparative genomics: the bacterial pan-genome.* Curr Opinions Microbiol.
   2008. Man page independently: "a Heaps law approach suggested by Tettelin et al (2008)." So
   micropan cites the *idea* to Tettelin 2008; micropan is the *implementation* (`heaps()`) and
   should be cited as itself.
6. **Minimum genomes / permutations:** **No minimum genome count is stated** (explicit silence).
   Genome-ordering permutations are the `n.perm` argument, **default 100**, and the man page says
   *"The default value of 100 is certainly a minimum"* — a floor on permutations, not on genomes.

### Known convention conflict (recorded, not smoothed)
micropan's convention: exponent **α**, boundary **1.0**, **open if α < 1.0 / closed if α > 1.0**.
Other open-access sources write Heaps' law on pan-genome **size** as `n = κ·N^γ` with exponent
**gamma**, **open if γ > 0 / closed if γ < 0** (boundary **0**). These are *different surface forms*
of related quantities (approximately α ≈ 1 − γ) — **do not merge them**. When citing micropan,
use α and the 1.0 boundary as written here.
