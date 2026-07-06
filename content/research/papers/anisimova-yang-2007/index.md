---
title: "Multiple hypothesis testing to detect lineages under positive selection that affects only a few sites"
type: paper
source_id: anisimova-yang-2007
source_url: https://europepmc.org/article/MED/17339634
doi: 10.1093/molbev/msm042
access_date: "2026-07-05"
license: LicenseRef-all-rights-reserved
attribution: "Anisimova M, Yang Z. Molecular Biology and Evolution 24(5):1219-1228, 2007. DOI 10.1093/molbev/msm042. PMID 17339634. Abstract read verbatim from Europe PMC; body/tables read via WebFetch against the OUP free-to-read HTML (direct access Cloudflare-blocked). BRONZE OA (free-to-read, license null) - all rights reserved."
derived: own-words-summary
---

# Anisimova & Yang 2007 — Multiple hypothesis testing for lineages under positive selection

## 1. Citation
Anisimova M, Yang Z. 2007. "Multiple hypothesis testing to detect lineages under positive
selection that affects only a few sites." *Molecular Biology and Evolution* 24(5):1219–1228.
DOI 10.1093/molbev/msm042. PMID 17339634.
Free-to-read (BRONZE open access) publisher HTML/PDF at academic.oup.com; no open license attached.

## 2. Access note
- **License mode: all-rights-reserved / restrictive (BRONZE OA — free-to-read, no CC/open license).**
  Unpaywall and Semantic Scholar both report `openAccessPdf` on OUP with `license: null`, `status:
  BRONZE`. Per contract §1.5 → **own-words paraphrase**; numbers, model names, df, and critical
  values kept **verbatim** as functional strings.
- **Full text vs abstract:** full text was read, but **access was mediated**. Direct `curl` to OUP is
  blocked by Cloudflare (403); the abstract came verbatim from Europe PMC; the body/tables were read
  via the `WebFetch` extractor against the OUP free-to-read HTML (small-model markdown conversion, two
  passes). The two passes were internally consistent and consistent with the abstract, and branch
  counts match unrooted-tree arithmetic — but **exact table cell values and fine scheme sub-definitions
  were not independently verified against raw PDF text.** Numbers below carry a `[via-WebFetch]` caveat
  where they originate only from the extractor, not the abstract.

## 3. Thesis
When branch-site likelihood ratio tests for positive selection are applied to *every* branch on a
phylogeny (no a priori foreground branch), a multiple-testing correction is required; across 6
correction procedures the tests keep an acceptable familywise error rate and useful power except under
extreme sequence divergence combined with serious model violation, and FWER-controlling corrections
(Rom's recommended) are preferred.

## 4. Problem & context
- Branch-site models of codon substitution let selective pressure vary both over branches and across
  sites, so they can detect short episodes of adaptation affecting only a few sites.
- The LRT requires the **foreground branch(es) to be specified a priori**. Absent a biological
  hypothesis, one may test many/all branches — creating a **multiple-testing** problem that inflates
  false positives if uncorrected.
- The paper evaluates, by simulation, how well standard multiple-test corrections restore error
  control and what power remains.

## 5. Method / approach
- **Test:** branch-site LRT. Alternative = **branch-site model A** (site classes 0, 1, 2a, 2b; a
  foreground/background partition; ω₂ ≥ 1 estimated on the foreground). Null = model A with **ω₂ = 1
  fixed**. `[via-WebFetch]`
- **Null distribution of 2Δℓ:** a **1:1 mixture of point mass 0 (χ²₀) and χ²₁** (df = 1); critical
  values **2.71 (5%)** and **5.41 (1%)**. A more conservative alternative uses **χ²₁** directly
  (df = 1), critical values **3.84 (5%)** and **5.99 (1%)**. `[via-WebFetch, standard values]`
- **6 correction procedures evaluated** (from abstract; names via WebFetch):
  - **FWER-controlling (4):** Bonferroni; Hochberg (1988); Hommel (1988); Rom (1990).
  - **FDR-controlling (2):** Benjamini & Hochberg (1995); Storey (2002).
- **Simulation design** `[via-WebFetch]`:
  - Trees: **4-taxa (5 branches)** and **8-taxa (13 branches)**, each branch tested individually as
    foreground. Sequence length **300 codons**. Replicates: **1000 (4-taxa)**, **200 (8-taxa)**.
  - **Null schemes (no positive selection):** NC1, NC2 = data generated under model A with ω₂ = 1
    (analysis model *correct*); NI = data generated under a more complex process so that model A is
    *incorrect* (no site keeps a constant ω across the whole tree), i.e. a **model-violation** null.
  - **Selection schemes:** SC = model A correct, ω₂ = 4 on one branch (B5); SI1/SI2/SI3 = model A
    *incorrect* with positive selection on one or several branches (SI2: ~20% of sites on B5 and ~10%
    on B1; SI3: selection on B1–B4, testing whether B5 is falsely flagged).
- **Real-data demonstration:** CD2 (cluster of differentiation 2) extracellular-domain gene sequences
  from **10 mammalian species**.

## 6. Key claims / findings
- All 6 corrections achieved acceptable FWER **except under extremely divergent sequences combined
  with serious model violation**, where the test can become **unreliable** (abstract).
- **Type-I error (FWER) under the correct model** stayed near or below the 5% nominal level `[via-WebFetch]`:
  e.g. 4-taxa ≈ 4.3–5.4% (mixture) / 2.3–2.7% (χ²₁); 8-taxa ≈ 4.5–5% (mixture) / ~3% (χ²₁).
- **Type-I error under model violation (scheme NI), 8-taxa, rises with divergence** `[via-WebFetch —
  exact cell values not raw-verified]`: ¼× ≈ 6%, ½× ≈ 3.5%, 1× ≈ 9%, 2× ≈ 11.5%, **5× ≈ 25%** (mixture);
  the conservative χ²₁ only lowers the 5× case to **≈ 23%** — still unacceptable. This 25% figure is the
  paper's own worst case; **it does NOT match any external "20–50%" gloss** (guidance flag: report
  actual number — the paper reports ~25% at 5× divergence under serious model violation).
- **Power is highest at intermediate divergence** (abstract). SC scheme power vs divergence
  `[via-WebFetch]`: ¼× ≈ 6.5%, ½× ≈ 27%, **1× ≈ 43% (peak)**, 2× ≈ 34.5%, 5× ≈ 4.5% — power collapses
  at both very low and very high divergence.
- Power rises with number of taxa: detecting selection on a single branch was ≈ 8–11% (4-taxa) vs
  ≈ 43–44% (8-taxa) under mixture null in scheme SC `[via-WebFetch]`.
- **The 4 FWER methods had similar power**; **Rom's** gave slightly higher power and is recommended;
  **Bonferroni** is described as usable as well (abstract).
- **The 2 FDR methods had slightly more power but also higher FWER** (abstract).
- **CD2 example** `[via-WebFetch — branch identities not raw-verified]`: tree had **16 branches** (one
  poorly supported branch collapsed); **3 branches detected under positive selection by all 6
  procedures** at 5% with the mixture distribution; under the conservative χ²₁, two of the three stayed
  significant across all methods and the third was recovered by the FDR (Benjamini-Hochberg, Storey)
  procedures.

## 7. Load-bearing statements (own-words — restrictive license; functional strings verbatim)
- The branch to be tested must be chosen **a priori**; when no biological hypothesis names a foreground
  branch, testing many branches makes a **multiple-testing correction necessary** (paraphrase of
  abstract).
- **4 of 6 procedures control the FWER; 2 control the FDR** (verbatim counts, abstract).
- All corrections gave **acceptable FWER except for extremely divergent sequences and serious model
  violations, when the test may become unreliable** (own-words paraphrase of abstract sentence).
- **Recommend Rom's procedure for its slightly higher power, but the simple Bonferroni correction is
  useable as well** (own-words paraphrase of abstract).
- **Highest power observed at intermediate divergences** (own-words paraphrase of abstract).
- Test statistic 2Δℓ ~ **1:1 mixture of χ²₀ and χ²₁**, df = 1; critical values **2.71 (5%) / 5.41 (1%)**;
  conservative option **χ²₁**, **3.84 (5%) / 5.99 (1%)** (verbatim functional strings).

## 8. Stated scope, assumptions, limitations
- Method targets **positive selection affecting only a few sites on a few lineages** (episodic
  adaptation), via branch-site model A — not genome-wide constant selection.
- Conclusions rest on **simulation** under the specific tree sizes (4 and 8 taxa), 300-codon length,
  and the parameter/divergence schemes above; power numbers are scenario-specific.
- The authors argue one usually does **not know whether any lineage is under selection at all**, so
  **controlling FWER (not FDR) is the appropriate posture** for these scans `[via-WebFetch paraphrase]`.

## 9. Failure modes / invalidity patterns
- **Extreme divergence + serious model violation → unreliable test / inflated FWER.** Concrete symptom:
  under scheme NI at **5× branch lengths, FWER ≈ 25%** (mixture) — far above the 5% nominal; the
  conservative χ²₁ only trims it to ≈ 23%. Detector/symptom the source names: **highly divergent
  sequences** (long branch lengths) are the red flag; caution is advised applying the branch-site test
  to such data `[via-WebFetch]`.
- **Very low divergence → near-zero power** (¼× ≈ 6.5% power); the test cannot see selection when
  sequences are too similar. **Very high divergence → power also collapses** (5× ≈ 4.5% power) *and*
  false positives climb — the worst combination.
- **Uncorrected multiple testing** across many branches inflates the familywise false-positive rate;
  the whole paper's premise is that skipping the correction invalidates the branch-by-branch scan.
- FDR procedures (Benjamini-Hochberg, Storey) buy power at the cost of **higher FWER** — a hazard when
  the analyst wants strict control over any false claim of selection.

## 10. What the source does NOT address
- Does not give a single universal "Type-I inflation percentage" for skipping correction across all
  conditions — inflation is reported per scheme/divergence, and the flagged worst case is ~25% (not a
  20–50% range).
- Does not (in what was read) cover trees much larger than 8 taxa, alignment-error or recombination
  effects, or non-model-A codon frameworks.
- Does not address Bayesian/BEB site identification error rates here (this paper is about the
  branch-level LRT and multiple-testing correction, not per-site posterior accuracy).

## 11. Open questions / ambiguities
- Exact per-cell FWER/power table values and the precise definitions of SI2/SI3 and the CD2 branch
  identities rest on the WebFetch extractor and were not verified against raw PDF text.
- How the recommended correction scales to genome-wide scans (thousands of genes × many branches) is
  not quantified in the read portion.

## 12. Guidance answers
- **Type-I error inflation figure?** Yes, but **scenario-specific, not a single "20–50%" number.** The
  paper's worst reported case is **FWER ≈ 25%** (mixture; ≈ 23% with conservative χ²₁) at **5× branch
  lengths under scheme NI (serious model violation, no true selection)** on the 8-taxa tree; under the
  correct model FWER stays ≈ 4–5%. The external "20–50%" gloss is **not confirmed** — the paper reports
  ~25% at its extreme. `[worst-case value via-WebFetch extractor]`
- **Recommended multiple-testing procedure for many lineages/branches?** Control the **FWER**; among the
  4 FWER methods (Bonferroni, Hochberg, Hommel, Rom) use **Rom's** for slightly higher power, with
  **Bonferroni** an acceptable simple fallback. FDR methods (Benjamini-Hochberg, Storey) give a little
  more power but let FWER rise, so they are not the default for "is any lineage selected at all" scans.
- **Power vs false-positive tradeoffs / when unreliable?** Power peaks at **intermediate divergence
  (≈1× branch lengths, ~43%)** and collapses at both low (¼×) and high (5×) divergence; more taxa →
  more power. The test becomes **unreliable under extreme divergence combined with serious model
  violation** (FWER up to ~25%), which is the paper's explicit caution for the branch-site test on
  highly divergent data.
