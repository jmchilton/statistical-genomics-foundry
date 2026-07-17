---
title: "Effect of Recombination on the Accuracy of the Likelihood Method for Detecting Positive Selection at Amino Acid Sites"
type: paper
source_id: anisimova-2003-recombination
source_url: https://europepmc.org/articles/PMC1462615?pdf=render
doi: 10.1093/genetics/164.3.1229
access_date: "2026-07-05"
license: LicenseRef-all-rights-reserved
attribution: "Anisimova M, Nielsen R, Yang Z. Genetics 164(3):1229-1236, 2003. DOI 10.1093/genetics/164.3.1229. PMID 12871927; PMCID PMC1462615. Full-text PDF read via the Europe PMC render endpoint. Bronze OA (free-to-read at publisher; Copyright 2003 Genetics Society of America, license None) - all rights reserved."
derived: own-words-summary
tags:
  - domain/dnds
  - domain/molecular-evolution
---

# Anisimova, Nielsen & Yang 2003 — Effect of recombination on the LRT for positive selection at amino acid sites

## 1. Citation
Anisimova M, Nielsen R, Yang Z. 2003. "Effect of Recombination on the Accuracy of the Likelihood
Method for Detecting Positive Selection at Amino Acid Sites." *Genetics* 164(3): 1229–1236 (July 2003).
DOI 10.1093/genetics/164.3.1229. PMID 12871927. PMC **PMC1462615**.
Manuscript received July 30, 2002; accepted March 31, 2003. Communicating editor: J. Hein.
Full-text PDF accessed 2026-07-05 via Europe PMC render endpoint (`europepmc.org/articles/PMC1462615?pdf=render`), 8 pages, all text/tables read.

## 2. Access note
Full text read in its entirety (abstract, Materials and Methods, all six tables, Results, Discussion,
Figure 1 caption, references). Copyright line: "Copyright 2003 by the Genetics Society of America."
Unpaywall reports this as **bronze OA** (free-to-read at publisher, `journal_is_oa: False`, `license: None`);
Europe PMC `isOpenAccess: N`. Publisher blocks machine XML download. **License posture: all-rights-reserved
/ free-to-read** → this note uses **restrictive-license mode**: own-words paraphrase of prose; functional
strings (model names, df, parameter values, error percentages, table counts) reproduced verbatim as facts.
Figure 1 is an image (Bayes-accuracy curves); values read only from its caption and the surrounding text,
not from the plotted points.

## 3. Thesis
Codon-based site-model LRTs for positive selection, which assume a single tree for all sites, become
unreliable in the presence of recombination — at high recombination rates they falsely detect positive
selection at rates up to ~90–100%, though the M7–M8 test and empirical-Bayes site identification are much
more robust than the M0–M3 and M1–M2 tests.

## 4. Problem & context
Maximum-likelihood codon models (Nielsen & Yang 1998; Yang et al. 2000a) detect positive selection by
comparing nested models of variable ω = dN/dS across sites; the null forbids ω > 1, the alternative allows
it. These methods are phylogeny-based and assume **one tree topology for the whole sequence**. With
recombination (common in viral and some population data) no single tree describes the sequence: sites
evolve along a set of correlated trees (an ancestral recombination graph; Hudson 1983). Recombination
produces apparent substitution-rate heterogeneity and star-like phylogenies, so the concern is that the
LRT mistakes recombination for positive selection. The authors say the problem "mainly concerns viral
genes, where sequence divergence is high and recombination may be frequent"; population samples from
animals/plants generally have too little divergence for these phylogeny-based methods.

## 5. Method / approach
- **Models (Table 1):** M0 (one ratio), M1 (neutral: p0 sites ω0=0, p1 sites ω1=1), M2 (selection: adds
  class ω2 to M1), M3 (discrete: K classes; here K=3), M7 (β: ω from Beta(p,q), bounded 0–1), M8 (β and ω:
  adds one discrete class with ω to M7).
- **Three LRTs tested:** (i) **M0 vs M3**, df ν=4; (ii) **M1 vs M2**, df ν=2; (iii) **M7 vs M8**, df ν=2.
  M0–M3 is really a test of *variability* of selective pressure among sites; M1–M2 and M7–M8 are tests of
  *positive selection*. Statistic 2Δℓ compared to χ²_ν. Type-I error counted at α = 5% and 1%.
- **Simulation:** sequences generated under a **standard neutral coalescent model with recombination**
  (ancestral recombination graph), then evolved along each site's genealogy under a codon-substitution
  model (C program by R.N.). Recombination allowed between codons, not within (a "site" = a codon).
  Parameters θ = 2Nμ (measured as synonymous rate θS) and ρ = 2Nr (scaled recombination rate).
- **Analysis:** for each replicate a **neighbor-joining (NJ) tree** built with PAUP*, then codon likelihood
  via **codeml (PAML)**. The authors note the asymptotic χ² approximation does not strictly apply even
  without recombination, and using χ² makes the LRTs conservative (Anisimova et al. 2001).
- **Parameter values:** codon frequencies and ML estimates from 33 hepatitis D (HDV) small-antigen strains;
  κ = 3 fixed; sequence length 500 codons; 100 replicates per condition; 10 or 30 lineages. Two silent-site
  divergences: **θS = 0.011 and 0.11**. ω under M0 = 0.4, 0.6, 1. M7 β-parameters p = 0.23, q = 0.41.
  Recombination rates simulated: **ρ = 0, 0.0001, 0.0005, 0.001, 0.005, 0.01** (most work at ρ = 0 and 0.01).
- **Bayes site identification:** data simulated under M3 with ~13.5% sites positively selected (ω2 = 2.55;
  remaining 65.8% at ω0 = 0.08 and 20.6% at ω1 = 0.61), θS = 0.11, ρ ∈ {0, 0.01}; sites inferred by codeml
  compared to truly-selected sites. Bayes accuracy = proportion of predicted sites that were truly selected.
  A second run raised ω2 from 2.55 to 6.

## 6. Key claims / findings (with exact numbers)
- **No recombination → conservative.** Under ρ = 0 the M0–M3 LRT rejected M0 in **0 of 100** replicates
  across all ω and θS (Table 2); type-I error stayed below α. This reproduces the known conservativeness
  from using χ² (Anisimova et al. 2001).
- **M0–M3, 30 sequences, ρ = 0.01 (Table 2):** significant-and-ω̂>1 counts (out of 100) at 5%(1%):
  ω=1, θS=0.011 → **63 (61)**; ω=1, θS=0.11 → **98 (94)**; ω=0.6, θS=0.11 → **90 (89)**;
  ω=0.4, θS=0.11 → **88 (88)**. False-positive rate rises with larger θS and larger ω; **highest 98%**
  (ω=1, θS=0.11, α=5%). All ρ=0 rows were 0 (0).
- **M1–M2, 30 sequences (Table 3), significant at 5%(1%):** θS=0.011 ρ=0 → **2 (0)**; ρ=0.01 → **74 (61)**;
  θS=0.11 ρ=0 → **2 (2)**; ρ=0.01 → **80 (71)**. Recombination raises type-I error from ~2% to **74–80%**.
- **M0–M3, 10 sequences, ρ series (Table 4; ω=0.4, θS=0.11)** — avg # recombination events | falsely-
  detected-selection at 5%(1%):
  ρ=0 → 0.00 events | **0 (0)**; ρ=0.0001 → 0.23 | 0 (0); ρ=0.0005 → 1.27 | 0 (0); ρ=0.001 → 2.71 | **4 (2)**;
  ρ=0.005 → 15.50 | **23 (19)**; ρ=0.01 → 32.42 | **54 (46)**. (ω̂ under M0 was never >1.)
- **Robustness threshold:** the LRT is conservative/accurate when **ρ < 0.001 or fewer than ~2.7–3
  recombination events in a sample of 10 sequences**. At ρ = 0.001 type-I error is only very slightly above α.
- **M7–M8, 10 sequences (Table 5), simulated under M7:** significant-and-ω̂>1 at 5%(1%):
  ρ=0 → **4 (1)**; ρ=0.001 → **3 (2)**; ρ=0.01 → **20 (11)**. At ρ=0 error is close to α; ρ=0.001 barely
  changes it; ρ=0.01 gives **20%** — high, but **much lower than the M0–M3 error (54%) at the same ρ**.
- **M7–M8 is the most robust of the three tests to recombination** (its null M7 lets ω vary 0–1, a more
  realistic null than M0 or M1).
- **Tree size matters:** at ρ=0.01, ω=0.4, θS=0.11, the M0–M3 LRT failed in **88%** of 30-lineage replicates
  vs **54%** of 10-lineage replicates (bigger trees → higher type-I error). Higher mutation rate (θS) also
  raises the false-positive rate.
- **Wrong-tree experiment:** forcing a **star topology** produced false positives *even with no
  recombination* — **96%** (M0–M3) and **86%** (M7–M8) at α=5% on nonrecombinant data. Random topologies
  gave similarly high error. ML estimates of ω under M0 stayed close to the true value regardless of tree.
- **M0(ω=1 fixed) vs M0(ω estimated), df=1 (Table 6), 10 seq, θS=0.11**, significant at 5%(1%):
  NJ tree ρ=0 → **6 (1)**, ρ=0.01 → **12 (4)**; Star tree ρ=0 → **21 (13)**, ρ=0.01 → **31 (20)**.
  Text gives the type-I error at α=5% as **2% (NJ, no recombination)**, **13% (star, no recombination)**,
  **8% (NJ, recombinant)** — evidence that wrong reconstructed trees are part of the mechanism.
- **Empirical-Bayes site identification is much less affected than the LRT.** Under recombination
  (ρ=0.01, ~46.7 recombination events in a sample of 30 sequences), Bayes accuracy at the 95%
  posterior cutoff: **M2 ~95%**, **M8 ~91%**, but **M3 only 75%** (vs ~100%, ~91%, 91% respectively at ρ=0).
  Increasing lineage count does **not** reduce Bayes accuracy; raising selection strength (ω2 2.55→6)
  increased both accuracy and power of Bayes prediction.

## 7. Load-bearing statements — RESTRICTIVE-LICENSE MODE (own-words paraphrase; functional strings verbatim)
- With no recombination the M0–M3 LRT never rejected the null across 100 replicates for any ω or θS; using
  the χ² distribution keeps these LRTs conservative. (Results, Table 2)
- At ρ = 0.01 the M0–M3 false-positive rate reached **98%** (ω=1, θS=0.11, α=5%), and was higher for larger
  θS and larger ω. (Results)
- The M1–M2 type-I error jumped from ~2% (ρ=0) to **74%** (θS=0.011) and **80%** (θS=0.11) at ρ=0.01, α=5%. (Results)
- When ρ < 0.001, i.e. fewer than ~2.7 recombination events in a sample of 10 sequences, the LRT stayed
  conservative; positive selection was falsely detected in **23%** (ρ=0.005) and **54%** (ρ=0.01) of
  replicates at α=5%. (Results, Table 4)
- For M7–M8 at ρ=0.01 the LRT falsely detected selection in **20%** of replicates at α=5% — high, but much
  lower than M0–M3 at the same rate. (Results, Table 5)
- Using a star topology caused false positives even on nonrecombinant data: **96%** (M0–M3) and **86%**
  (M7–M8) at α=5%. (Results)
- Mechanism (Discussion): recombination introduces variation in **tree length** (sum of branch lengths over
  the genealogy) among sites, which appears as variation in both synonymous and nonsynonymous rates; the
  codon models allow variation only in nonsynonymous rate and treat the synonymous rate as constant
  (averaged over sites), so a site with long tree length can show an apparent nonsynonymous rate above the
  average synonymous rate and be misread as positively selected.

## 8. Stated scope, assumptions, limitations (authors' own caveats)
- The asymptotic χ² approximation "does not apply to those tests even without recombination"; using χ² makes
  the LRTs conservative (a stated simplification).
- Coalescent simulation uses a **standard neutral** model; selection's effect on the genealogy is **ignored**
  because no algorithm exists to simulate coalescent trees under both recombination and strong selection.
- Effect of recombination depends on **when** in the sample's history recombination occurred: early internal
  branches are more disruptive than recent tip-near events. Neutral coalescent gives long internal branches;
  more star-like genealogies (e.g. population expansion) would make recombination *less* damaging.
- Both strong purifying and strong diversifying selection operate in viral genomes; genealogies under strong
  selection may differ, but the authors expect the effect on the LRT (via tree shape) to be quantitative not
  qualitative, so conclusions "should remain valid." Weak-to-moderate purifying selection and background
  selection are cited as not seriously distorting genealogy shape.
- Recombination allowed only **between codons, not within** a codon.
- Reliable estimates of ρ = 2Nr are **unavailable for viral genes**; the range of viral recombination-rate
  estimates is very wide with no consensus. For human genes most studies suggest ρ < 10⁻³/bp, an amount with
  little effect on the LRT — but human population data typically lack the variation needed for the LRT to
  detect adaptation anyway.

## 9. Failure modes / invalidity patterns (referee-relevant)
- **Trigger:** running site-model LRTs on data with non-negligible recombination while forcing a single tree.
  Invalidity grows with recombination rate; becomes severe at ρ ≥ ~0.005 / more than a few recombination
  events per 10 sequences.
- **Symptom / detector named by the source:** the LRT (especially M0–M3 and M1–M2) rejects the null far
  above the nominal α, with the alternative model estimating ω̂ > 1 — recombination is mistaken for positive
  selection. False-positive rates run to 88–98% (30 seq) / 54% (10 seq) at ρ=0.01.
- **Two mechanisms the source names:** (1) recombination-induced **tree-length variation** across sites →
  apparent dN/dS heterogeneity misread as ω > 1 (worse when the null model is unrealistic, i.e. M0 or M1);
  (2) the single NJ tree is **wrong for many sites** and recombination pushes the reconstructed tree toward a
  **star shape with long terminal branches**, and a star/random tree by itself yields false positives even
  with zero recombination (96% M0–M3, 86% M7–M8).
- **Mitigations the source states/implies:** prefer the **M7–M8** test (more realistic null → more robust);
  rely on **empirical-Bayes site identification**, which is less sensitive to tree topology; and **identify
  and remove sequences involved in major recombination events** ("If major recombination events can be
  identified in the sequence data, removing sequences involved in such events should increase the performance
  of the LRT"). Incorporating recombination into a coalescent codon model is deemed desirable but currently
  "computationally intractable."
- The homoplasy index (Maynard Smith 1998) and informative-sites index (Worobey 2001) correlate with
  recombination rate but their exact relationships are unknown; coalescent-based ρ estimators tend to mistake
  recurrent substitutions in divergent/viral data for recombination.

## 10. What the source does NOT address
- Does **not** provide LRT *power* curves under recombination when true positive selection is present — the
  type-I-error tables all simulate under null (M0/M1/M7) with no true ω > 1; true-selection simulations are
  used only to assess **Bayes site-prediction accuracy**, not LRT power.
- Does not simulate recombination *within* a codon.
- Does not simulate genealogies under strong selection combined with recombination (no algorithm available).
- Does not test branch or branch-site models — only the site models M0–M3, M1–M2, M7–M8.
- Does not prescribe a specific recombination-detection tool or pre-screen threshold; only notes existing
  ρ-estimators are unreliable for viral data.
- Does not evaluate real datasets — simulation only (HDV parameters used to set simulation values).

## 11. Open questions / ambiguities the source leaves unresolved
- Authors explicitly state they "do not have a good understanding of possible reasons for the failure of the
  LRT" beyond the two proposed mechanisms.
- Whether an excess of nonsynonymous substitutions inflates recombination-rate estimates, and whether
  recombination detectors are robust to among-site rate variation, are stated as unknown.
- The exact relationship between homoplasy / informative-sites indices and the recombination rate is unknown.
- A coalescent codon-based model incorporating recombination is desirable but computationally intractable at
  time of writing.

## 12. Guidance answers
- **Mechanism (in the paper's own terms):** Ignoring recombination forces one NJ tree on sites whose true
  genealogies differ. Two effects follow. (a) Recombination varies the **tree length** (summed branch
  lengths) across sites; because codon models let only the *nonsynonymous* rate vary and hold the synonymous
  rate constant (averaged over sites), a long-tree-length site shows an apparent nonsynonymous rate exceeding
  the average synonymous rate and is misread as ω > 1. This is worst when the null model is unrealistic — M0
  and M1 — so M0–M3 and M1–M2 misinterpret the heterogeneity as variable/positive selection, while M7's
  Beta null (ω free in 0–1) absorbs it. (b) The single reconstructed tree is **wrong for many sites** and
  recombination makes it **star-like with long terminal branches**; a star/random tree alone produces false
  positives even without recombination (96% M0–M3, 86% M7–M8), confirming wrong-tree as a contributor.
- **Quantitative false-positive rate (report real numbers; do NOT confirm any "5–50×" gloss):** the paper
  does **not** state a fold-inflation multiplier. It reports **absolute type-I error rates**. Under ρ=0 the
  tests are conservative (0–2% observed). Under ρ=0.01 the false-positive rate at α=5% is:
  **M0–M3** 63–98% (30 seq, Table 2), 54% (10 seq, Table 4); **M1–M2** 74–80% (30 seq, Table 3);
  **M7–M8** 20% (10 seq, Table 5). The abstract summarizes "type I error rate can be as high as 90%" and the
  Discussion says "sometimes as high as 100%." Fold-change is therefore large but conditions-dependent; a
  fixed "5–50×" figure is not supported by, and is narrower than, the paper's own numbers (which reach
  ~40–50× at α=1% for M1–M2 and effectively unbounded where the ρ=0 baseline is 0). Rate conditions: error
  rises with recombination rate ρ, with silent divergence θS, with selection strength ω, and with number of
  lineages (30 > 10).
- **Which tests most affected / power:** Most affected = **M0–M3** (up to 98%) and **M1–M2** (up to 80%);
  least affected = **M7–M8** (up to 20%). Empirical-**Bayes** site identification is the least affected of
  all (M2 ~95%, M8 ~91% accuracy retained at ρ=0.01; M3 drops to 75%). On **power to detect true selection**:
  the paper does **not** directly report LRT power under recombination (type-I tables use null simulations);
  the only power statement is that **Bayes** site-prediction power *increased* with stronger selection
  (ω2 2.55→6) and was unaffected by adding lineages — so LRT power-vs-recombination is a confident silence here.
- **Must-quote / license:** *Genetics* 2003 is **bronze OA, all-rights-reserved** ("Copyright 2003 by the
  Genetics Society of America"; Unpaywall `license: None`). No CC/open-license statement present, so
  **own-words mode** applies; numbers, model names (M0–M8), degrees of freedom (ν=4, ν=2, ν=1), parameter
  values (κ=3, θS, ρ, p=0.23, q=0.41, ω2=2.55/6), and error percentages are reproduced verbatim as facts.
  PMC ID recorded: **PMC1462615**. Access date 2026-07-05.
