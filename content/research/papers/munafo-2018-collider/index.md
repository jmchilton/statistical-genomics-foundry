---
title: "Collider scope: when selection bias can substantially influence observed associations"
type: paper
source_id: munafo-2018-collider
source_url: https://academic.oup.com/ije/article/47/1/226/4259077
oa_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC5837306/
doi: 10.1093/ije/dyx206
pmcid: PMC5837306
pmid: 29040562
access_date: "2026-07-13"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Munafò MR, Tilling K, Taylor AE, Evans DM, Davey Smith G. Collider scope: when selection bias can substantially influence observed associations. International Journal of Epidemiology 47(1):226–235, 2018. https://doi.org/10.1093/ije/dyx206 — open access under CC BY 4.0. Read from the PMC deposit (PMC5837306); Figures 1–3 are images (captions only) and Supplementary Data not retrieved."
derived: license-aware-summary
---

# Collider scope: when selection bias can substantially influence observed associations

## 1. Citation

Munafò MR, Tilling K, Taylor AE, Evans DM, Davey Smith G. "Collider scope: when selection bias can
substantially influence observed associations." *International Journal of Epidemiology*
2018;47(1):226–235. DOI [10.1093/ije/dyx206](https://doi.org/10.1093/ije/dyx206).
PMID 29040562; PMCID PMC5837306. Published online 2017 Sep 27; issue date 2018 Feb.

Open access via PMC: <https://pmc.ncbi.nlm.nih.gov/articles/PMC5837306/>. Accessed 2026-07-13.

**License / quoting posture.** The article carries an explicit statement: "© The Author 2017.
Published by Oxford University Press on behalf of the International Epidemiological Association…
This is an Open Access article distributed under the terms of the Creative Commons Attribution
License (http://creativecommons.org/licenses/by/4.0/), which permits unrestricted reuse,
distribution, and reproduction in any medium, provided the original work is properly cited."
CC-BY-4.0 → **license-aware mode**: short verbatim load-bearing quotes are reproduced below, each
marked and located, with attribution to the citation above.

## 2. Access note

Full text of the article body read from the PMC deposit (title, abstract, Introduction, Boxes 1–3,
"Collider bias", "Simulations", Tables 1–3, "Conclusions", figure captions, references). No paywall
boundary.

**Boundaries of what was read:**

- **Figures 1, 2 and 3 are images.** I read only their captions. The *arrow directions* in the DAGs
  of Figure 2 and of Figure 3 panels A–F are drawn in the images and are **not** recoverable from
  the text; where I state a structure below it is reconstructed from the prose + caption, and I say
  so. Figure 3's six panels in particular cannot be redrawn from what I could read (see §11).
- The **Supplementary Material** (Supplementary Data, .docx, 86.2 KB) was not retrieved. It is cited
  for the composition of the smoking genetic risk score used in Table 3.

## 3. Thesis (1 sentence)

Selection into (or attrition from) a study is a form of conditioning on a collider, and therefore —
contrary to the common assumption that unrepresentativeness harms only prevalence estimates and not
associations — even modest selection effects can produce substantially biased and misleading
estimates of phenotypic and genotypic associations.

## 4. Problem & context

- Large cross-sectional and cohort studies (UK Biobank, ALSPAC) are the workhorses of genetic
  epidemiology because small common-variant effects need very large samples.
- Participants who volunteer may not represent the "intended study population"; cohorts also lose
  representativeness through non-random attrition; and sub-sets selected for extra work (e.g.
  genotyping) are selected again.
- There is direct empirical evidence of selection in such studies: higher schizophrenia genetic risk
  scores are "consistently associated with non-completion of questionnaires by study mothers and
  children, as well as non-attendance at data collection clinics" in ALSPAC (Introduction, citing
  ref. 3).
- A literature (refs 5–9) argues **representativeness is not necessary**; refs 8 in particular is
  cited for the assumption the paper attacks. The paper's own authors had *previously* argued the
  impact of selection bias on **genetic** associations would be modest, because conventional
  confounding is low for single genetic variants (refs 10, 12). The paper explicitly **revisits and
  revises** that prior position, motivated by (a) growth of highly selected samples like UK Biobank
  and (b) the shift from single variants to **polygenic/allele scores**.

The framing is stated in the abstract: the representativeness of these samples may be limited
"either through selection into studies, or by attrition from studies over time," and the paper
explores this "from the perspective that this amounts to conditioning on a collider (i.e. a form of
collider bias)."

## 5. Method / approach

Three strands:

**(a) Conceptual/graphical.** State collider bias (Figure 1: the coin-and-bell illustration; Figure
2: the simulation DAG; Figure 3: six selection scenarios A–F).

**(b) Simulation.** Data simulated on an **allele score**, a **phenotype (P)**, and an **outcome
(O)**, where *both* P and O influence **selection into the study**, and there is **no association
between allele score and outcome** in the intended study population.

Exact parameters as stated:

- All variables **Normally distributed, SD = 1**.
- Intended study population **N = 9 000 000**; baseline risk of selection controlled to yield a
  selected sample of **approximately 500 000** (i.e. loosely modelled on UK Biobank's ~5% response).
- P and O assumed to have **independent effects (no interaction on the additive scale)** on the odds
  of selection; effects **set equal to each other** for convenience.
- Selection effect sizes examined: **OR = 1.2** (weak), **OR = 1.5**, **OR = 1.8** — odds of
  missingness per 1 SD increase in phenotype/outcome. These correspond to a difference in mean
  phenotype/outcome of **0.2 SD, 0.4 SD and 0.6 SD** respectively between participants and
  non-participants. The paper anchors 1.2–1.8 as "similar to estimates of the likelihood of
  participation in UK Biobank for individuals with any educational or vocational qualifications and
  for non-smokers" (see Box 2: OR 1.63 for qualifications, OR 1.90 for non-smoking).
- Allele score ↔ phenotype correlation varied: **r = 0.05, 0.10, 0.15, 0.20, 0.30**, i.e. genetic
  instruments explaining **0.25%, 1.00%, 2.25%, 4.00%, 9.00%** of phenotypic variance. Anchored to
  reality: rs16969968 ≈ **1%** of variance in cigarette consumption (ref 17); polygenic score for
  height ≈ **9%** (ref 18).
- **Analysis = unadjusted regression of outcome on allele score (NOT adjusting for the phenotype).**
- **100 simulations per scenario.**
- Two settings: **no causal effect of P on O** (Table 1) and **a causal effect of P on O with
  regression coefficient 0.1** (Table 2).
- Note on why imputation is not the remedy here: selection *into* the study means all data on
  non-selected individuals are missing, and imputation "requires some data on which to base the
  imputation" (ref 16).

**(c) Real-data example.** ALSPAC (birth cohort, 14 541 pregnancies, ~75% of eligible women,
expected delivery 1 Apr 1991 – 31 Dec 1992) vs **ARIES**, a sub-study of ALSPAC in which 1018
mother–offspring pairs were selected **on availability of DNA at two time points for the mother and
three for the offspring** (ref 2). Compare the association between a **smoking genetic risk score**
(variants at P < 0.05 in the Tobacco and Genetics Consortium GWAS) and **maternal education**
(degree vs no degree) in the full cohort vs the selected sub-study (Table 3).

## 6. Key claims / findings

### Mechanism

- **Collider bias defined by common effect.** Collider bias occurs when two variables X and Y
  *independently cause* a third variable Z. Z is then a collider, and **statistical adjustment for Z
  biases the estimated causal association of X (exposure) on Y (outcome)** (Figure 2).
- **Adjustment ≡ selection.** "Statistical adjustment of the XY association for a variable Z is
  equivalent to observing this association in a sub-population where all individuals share the same
  value of Z" (refs 1, 13). This is the identity that lets the paper move from *adjustment* language
  to *selection* language: if both X and Y cause participation Z, analysing the selected sample
  (Z = 1) **is** conditioning on Z.
- **Bias has no fixed direction.** "This bias can be towards or away from any true association, and
  can distort a true association or a true lack of association." So collider bias can (i) create a
  spurious association where none exists, (ii) inflate, (iii) attenuate, or (iv) flip a real one.
- **The bias propagates to genetic ancestors of the selecting phenotypes.** If Gx → X and Gy → Y and
  both X and Y influence participation, then in the selected sample **Gx will appear associated with
  Y — "unless X is also controlled for."** This is the paper's stated route by which selection on
  *phenotypes* contaminates *genotype–outcome* associations.
- **Indirect selection also suffices.** Collider bias can arise even when the outcome Y does not
  directly cause selection, if Y is "a downstream consequence of something else that is causing
  selection into the study."
- **Polygenic scores are the highest-risk case.** Because a polygenic score aggregates many variants
  associated with a phenotype, and the phenotype is associated with participation, the *score* is
  more strongly related to participation than any single variant is — so studies using polygenic
  scores, genome-wide allelic scores (ref 20), and whole-genome genetic correlations (refs 21, 22)
  are "most at risk of producing biased and potentially misleading results" when the sample is
  unrepresentative and the selection mechanism is unknown.
- **Case-control secondary phenotypes are the same bug.** Case-control studies condition on
  case/control status; if both genotype and a *secondary* phenotype associate with case-control
  status, the genotype–secondary-phenotype association is collider-biased (refs 29, 30).

### Magnitude — simulation, null true association (Table 1)

Association of interest: allele score → outcome; **true value = 0**. Each row = 100 simulations.
"Number of 95% CIs containing zero" out of 100 is the coverage; 95 would be nominal.

| Selection OR (P and O → missingness) | r(allele score, phenotype) | variance explained | mean regression coefficient (SD) | mean z (SD) | # of 95% CIs containing zero |
|---|---|---|---|---|---|
| 1.8 | 0.05 | 0.25% | −0.001 (0.001) | −1.04 (1.00) | 83 |
| 1.8 | 0.10 | 1.00% | −0.003 (0.001) | −2.06 (0.98) | 45 |
| 1.8 | 0.15 | 2.25% | −0.004 (0.001) | −3.07 (0.98) | 9 |
| 1.8 | 0.20 | 4.00% | −0.006 (0.001) | −4.10 (0.98) | 0 |
| 1.8 | 0.30 | 9.00% | −0.008 (0.001) | −6.18 (1.06) | 0 |
| 1.5 | 0.05 | 0.25% | −0.001 (0.001) | −0.42 (0.95) | 94 |
| 1.5 | 0.10 | 1.00% | −0.001 (0.001) | −0.80 (0.96) | 89 |
| 1.5 | 0.15 | 2.25% | −0.001 (0.001) | −1.22 (0.96) | 77 |
| 1.5 | 0.20 | 4.00% | −0.002 (0.001) | −1.64 (0.97) | 61 |
| 1.5 | 0.30 | 9.00% | −0.003 (0.001) | −2.44 (0.94) | 35 |
| 1.2 | 0.05 | 0.25% | −0.0002 (0.001) | −0.16 (0.92) | 97 |
| 1.2 | 0.10 | 1.00% | −0.0003 (0.001) | −0.25 (0.94) | 97 |
| 1.2 | 0.15 | 2.25% | −0.0005 (0.001) | −0.38 (0.95) | 93 |
| 1.2 | 0.20 | 4.00% | −0.0006 (0.001) | −0.47 (0.95) | 91 |
| 1.2 | 0.30 | 9.00% | −0.0009 (0.001) | −0.66 (0.96) | 89 |

Paper's own reading of this table:

- Bias is **strongest for stronger independent selection effects** *and* where the **allele score is
  more strongly associated with the phenotype**. (Both parameters matter; the induced association is
  monotone increasing in each.)
- Headline sentence: "even for moderate associations between missingness and both phenotype and
  outcome (OR = 1.5 for both phenotype and outcome) and between allele score and phenotype (r = 0.1,
  1% variance explained by allele score) the confidence intervals contain zero only **89%** of the
  time" — i.e. **11% false-positive rate at a nominal 5%**, in a scenario the paper considers
  ordinary.
- At OR = 1.8 with r ≥ 0.20 the induced null association is detected as "significant" in **100 out
  of 100** simulations (0 CIs contain zero); mean z reaches **−6.18** at r = 0.30.
- The bias is **directionally negative** in this parameterization (spurious *inverse* association),
  and the induced coefficients are small in absolute terms (−0.0002 to −0.008) — but at
  N ≈ 500 000 the standard error is small enough that small biases become highly significant. That
  is why the paper reports **z-scores and CI coverage** rather than only effect sizes.

### Magnitude — simulation, non-null true association (Table 2)

Same design plus a causal effect of P on O (regression coefficient 0.1). Column "true regression
coefficient" is the true allele-score→outcome effect (= 0.1 × r, i.e. transmitted through P).

| Selection OR | r | variance | mean coefficient (SD) | true coefficient | # of 95% CIs containing the true value |
|---|---|---|---|---|---|
| 1.8 | 0.05 | 0.25% | 0.003 (0.001) | 0.005 | 78 |
| 1.8 | 0.10 | 1.00% | 0.006 (0.001) | 0.01 | 23 |
| 1.8 | 0.15 | 2.25% | 0.010 (0.001) | 0.015 | 2 |
| 1.8 | 0.20 | 4.00% | 0.013 (0.001) | 0.02 | 0 |
| 1.8 | 0.30 | 9.00% | 0.020 (0.001) | 0.03 | 0 |
| 1.5 | 0.05 | 0.25% | 0.004 (0.001) | 0.005 | 94 |
| 1.5 | 0.10 | 1.00% | 0.009 (0.001) | 0.01 | 86 |
| 1.5 | 0.15 | 2.25% | 0.013 (0.001) | 0.015 | 69 |
| 1.5 | 0.20 | 4.00% | 0.017 (0.001) | 0.02 | 53 |
| 1.5 | 0.30 | 9.00% | 0.026 (0.001) | 0.03 | 19 |
| 1.2 | 0.05 | 0.25% | 0.005 (0.001) | 0.005 | 98 |
| 1.2 | 0.10 | 1.00% | 0.01 (0.001) | 0.01 | 96 |
| 1.2 | 0.15 | 2.25% | 0.014 (0.001) | 0.015 | 94 |
| 1.2 | 0.20 | 4.00% | 0.019 (0.001) | 0.02 | 92 |
| 1.2 | 0.30 | 9.00% | 0.029 (0.001) | 0.03 | 95 |

Paper's own reading: "Where there is a causal effect of P on O, the results are broadly similar,
except that on the whole the confidence intervals had **lower coverage** than for the equivalent
situation with no causal association." (Note in the table the estimates are **attenuated toward
zero** relative to the true value under strong selection — e.g. OR = 1.8, r = 0.30: estimated 0.020
vs true 0.030, with **0/100** CIs covering the truth. So here collider bias *attenuates* a real
effect rather than manufacturing one.)

### Magnitude — real data (Table 3, ALSPAC vs ARIES)

Selection into ARIES is itself associated with the relevant variables:

- Smoking (ever vs never) → being in ARIES: N = 13 249, **OR 0.59 (0.52–0.68), P < 0.001** (smokers
  less likely to be in the sub-study).
- Smoking genetic risk score → being in ARIES: N = 7837, **OR 1.00 (0.93–1.07), P = 0.92** (the
  *score* does not predict selection directly).
- Maternal education (degree vs no degree) → being in ARIES: N = 12 493, **OR 1.86 (1.58–2.19),
  P < 0.001**.
- Sanity check that the score works: smoking genetic risk score → ever smoking in ALSPAC: N = 7291,
  **OR 1.07 (1.02–1.12), P = 0.003** (per SD of score).

The result:

| Association with maternal education | Sample | N | OR (95% CI) | P |
|---|---|---|---|---|
| Smoking (ever vs never) | ALSPAC | 12 118 | 0.45 (0.40–0.50) | <0.001 |
| Smoking genetic risk score | ALSPAC | 7046 | **1.01 (0.95–1.08)** | **0.74** |
| Smoking (ever vs never) | ARIES | 986 | 0.61 (0.44–0.84) | 0.003 |
| Smoking genetic risk score | ARIES | 791 | **1.20 (1.02–1.41)** | **0.03** |

I.e. the smoking genetic risk score is **null against maternal education in the full ALSPAC cohort**
but **significantly associated in the selected ARIES sub-sample** — the induced association predicted
by the collider mechanism, in real data, at N < 1000.

### Empirical evidence of selection (Boxes 1 and 2 — the "is this real?" numbers)

Box 1 (ALSPAC):

- BMI vs retention, mothers: N = 11 319, **OR 0.85 (0.81–0.88)** per SD increase in pre-pregnancy
  BMI, for retention 2008–2011.
- BMI vs retention, offspring: N = 7954, **OR 0.91 (0.87–0.96)**, retention at age 18 using BMI at
  age 7.
- Smoking heaviness vs retention among smoking mothers: N = 3534, **OR 0.97 (0.96–0.98)** per
  additional cigarette/day just prior to pregnancy.
- Consequence stated: if low BMI *and* maternal non-smoking both drive continued participation, the
  BMI–smoking association in ALSPAC will be **negatively biased** relative to the intended study
  population.

Box 2 (UK Biobank):

- Recruited **>500 000** individuals aged 40–69, 2006–2010, from within 25 miles of 22 assessment
  centres, identified from NHS patient registers.
- **~9 000 000 invited; ~500 000 recruited → a 5% response rate** (personal communication, UK
  Biobank, 8 July 2016).
- Current smokers: **19% general population vs 11% UK Biobank → equivalent OR 1.90**.
- No qualifications: **25% vs 17% → equivalent OR 1.63**.
- 5-year mortality far lower in UK Biobank than the UK population (ref 40).
- Consequence stated: if non-smoking and having qualifications both cause participation, the
  smoking–qualifications association in UK Biobank will be **positively biased**.
- Extra hazard: the **first release** of UK Biobank genome-wide data used **two genotyping arrays**,
  one applied to a nested case-control study of smoking and lung function (**UK BiLEVE**, ref 41), so
  the first-release genetic data are **further selected relative to UK Biobank as a whole** (stated
  to be resolved with the full release).

### Real associations the paper says could plausibly be artefacts

The simulated bias magnitudes are "comparable to many reported associations derived from large but
selected samples", naming: personality ↔ cognitive function and a range of physical/mental health
outcomes (refs 23, 24); chronotype ("morningness") ↔ years of education (ref 25). Also offered as a
possible resolution of a paradox: schizophrenia polygenic scores that maximally capture liability
associate with **increased** psychotic experiences in ALSPAC, while more stringent variant-inclusion
thresholds associate with **reduced** psychotic experiences (ref 27) — consistent with differential
missingness rather than biology. Likewise, age-dependent differences in genetic correlations between
cognitive ability and psychiatric disorders (ref 26) may be "an artefact of different selection bias
pressures at different ages" rather than age-dependent pleiotropy.

## 7. Load-bearing statements — VERBATIM (license-aware mode; CC-BY-4.0)

All quotes verbatim from Munafò et al. 2018, IJE 47(1):226–235 (CC-BY-4.0), locations given.

1. **Collider definition + the adjustment-induces-bias statement** (section "Collider bias", ¶3):
   > "Collider bias occurs when two variables (X and Y) independently cause a third variable (Z). In
   > this situation Z is a collider, and statistical adjustment for Z will bias the estimated causal
   > association of X (exposure) on Y (outcome) (see Figure 2). Statistical adjustment of the XY
   > association for a variable Z is equivalent to observing this association in a sub-population
   > where all individuals share the same value of Z. Hence if both X and Y cause participation in a
   > study (Z), then investigating associations in the selected sample (i.e. with Z = 1, indicating
   > participation in the study) is equivalent to conditioning on Z, which in turn may induce
   > collider bias."

2. **The abstract's compact statement of the mechanism** (Abstract):
   > "We argue that because selection can induce collider bias (which occurs when two variables
   > independently influence a third variable, and that third variable is conditioned upon),
   > selection can lead to substantially biased estimates of associations."

3. **Direction of bias is unconstrained** (section "Collider bias", ¶1):
   > "This bias can be towards or away from any true association, and can distort a true association
   > or a true lack of association."

4. **Propagation to genetic proxies, and the one control statement the paper makes** (section
   "Collider bias", ¶4):
   > "Therefore if genes Gx and Gy cause X (exposure) and Y (outcome), respectively, and both X and Y
   > influence participation, then in the selected sample Gx will appear to be associated with Y
   > (unless X is also controlled for)."

5. **The paper's guidance on what to adjust for** (Abstract, final sentences):
   > "Our results highlight the value of knowing which population your study sample is representative
   > of. If the factors influencing selection and attrition are known, they can be adjusted for."

6. **When collider bias should be small** (Box 3, "Does representativeness matter?"):
   > "If the outcome of interest has not influenced selection into the intended study population, and
   > all of this population is included in the study (i.e., in what we have described as the 'actual
   > study population'), then selection bias, and therefore collider bias, should be small."

7. **"Common effect" — the collider named as such** (section "Collider bias", ¶5):
   > "If two traits influence participation (and therefore contribute to selection), selection bias
   > amounts to implicitly conditioning on their common effect (i.e. participation)."

   (This is the *only* place the paper uses common-cause/common-effect vocabulary. It supplies the
   **collider = common effect** half. The **confounder = common cause** half is never stated — see
   §10.)

8. **The intuition pump** (Figure 1 caption):
   > "In this example, a bell is sounded whenever either coin come up 'heads'. The result of one coin
   > toss is independent of the other. However, if we hear the bell ring (i.e. we condition on the
   > bell ringing), then if we see a tail on one coin we know there must be a head on the other–the
   > two coin results are no longer independent and a spurious inverse correlation has been induced."
   > (Figure 1 is reproduced by the authors from Gage SH, Davey Smith G, Ware JJ, Flint J, Munafò MR.
   > G = E: What GWAS can tell us about the environment. *PLoS Genet* 2016;12:e1005765.)

## 8. Stated scope, assumptions, limitations (the source's own caveats)

- **Simulation assumptions are explicit and restrictive**: all variables Normal with SD 1; P and O
  have **independent** (no additive-scale interaction) effects on odds of selection; those two
  effects are **set equal** "for convenience"; the analysis model is a plain unadjusted linear
  regression of outcome on allele score.
- **The parametric model matters — there are exceptions.** "There are exceptions to this, depending
  on the distribution of the outcome and the parametric analysis model used. For example, if the
  outcome (Y) is a binary phenotype, and logistic regression is used, then the odds ratio for the
  association between the single nucleotide polymorphism (SNP) and outcome may be unbiased even when
  the outcome causes selection (as is true of case-control studies)" (ref 15).
- **Not exhaustive.** "Other, more complex, situations can also lead to selection bias—we have not
  attempted to outline every possible case here." The paper points to published **algorithms for
  deciding whether a given causal analysis is biased by selection** (ref 16, Daniel et al., *Using
  causal diagrams to guide analysis in missing data problems*) as the general tool.
- **Remedies are conditional.** Multiple imputation or inverse probability weighting can recover
  unbiased estimates **only where some data are available on the missing individuals** (e.g.
  drop-out), and even then only "under some assumptions which are untestable given the observed
  data" (ref 28). Where there is *no* information on the missing (e.g. never-volunteers), these
  methods **cannot be used**; only external information (e.g. known population sex ratio) offers a
  route to bias-adjusted estimates.
- **For secondary-phenotype analysis in case-control studies**, proposed fixes (maximum likelihood,
  inverse probability weighting) require knowing case/control prevalence in the intended study
  population, or assuming the disease is rare (refs 29, 30).
- **The authors are revising their own prior position** (refs 10, 12), which had held that selection
  bias would be modest for genetic associations; they do not claim their earlier reasoning was
  worthless, only that polygenic scores and highly selected samples change the calculus.
- Framed as opinion where it is opinion: "In our opinion these important caveats should be borne in
  mind when interpreting the results of such studies."
- Box 3 concedes the biases in some cases "may be small in magnitude, but as we increasingly
  investigate small associations, their relative importance may be greater than is appreciated."

## 9. Failure modes / invalidity patterns (referee-relevant)

**When collider/selection bias occurs:**

- Two variables (exposure and outcome, or their causal ancestors) **independently cause** a third
  variable, and analysis is restricted to (or adjusted for) that third variable. Study participation
  / retention / sub-study inclusion is such a third variable.
- **Attrition** as well as **selection at inception** — either alone, or both. A cohort can start
  representative and become unrepresentative through non-random drop-out (including drop-out by
  death).
- **Sub-sampling within a study** (e.g. selecting the people with the most complete data, or with DNA
  at multiple time points, for genotyping) is a second, often invisible, selection step — the ARIES
  example.
- **Selection driven by only ONE of the two variables can still bias** (Figure 3B): if entry depends
  on the phenotype but not the outcome, and P does not cause O but P and O are correlated in
  unselected samples via shared factors U, then conditioning on selection induces an association
  between SNPs for P and the factors influencing O — "SNPs that cause the phenotype only (i.e. do not
  in truth cause the outcome) may now show spurious relationships with the outcome variable."
- **Survival / mortality selection** is the canonical instance of Figure 3B. Worked named example:
  smoking causes premature mortality; in a cohort followed for Alzheimer's disease, those who die
  early "will never have the chance to be diagnosed with Alzheimer's disease, and therefore **smoking
  will appear to be a protective factor**" (refs 32–35).
- **Case-control secondary phenotypes**: conditioning on case/control status when both genotype and
  the secondary phenotype relate to case status.
- **Highest-risk analyses named**: polygenic risk scores, genome-wide allelic scores (ref 20),
  whole-genome genetic correlations / LD-score-type genetic correlations (refs 21, 22) — because
  aggregation makes the score a stronger correlate of participation than any single variant.

**Symptoms / detectors the paper names:**

- **Test whether measured variables predict participation/retention.** The paper's operational
  detector is exactly this: regress participation (or retention, or sub-study membership) on the
  phenotype, the outcome, and — critically — on a **polygenic score** (Box 1's BMI/smoking→retention
  ORs; Table 3's "association with being in the ARIES sub-study" panel). Non-null → selection is
  operating on that variable.
- **Compare sample composition to the source population** (UK Biobank Box 2: 11% vs 19% smokers, 17%
  vs 25% with no qualifications).
- **Compare an association in the full cohort vs the selected sub-sample** (Table 3: null in ALSPAC,
  significant in ARIES).
- **Apparently paradoxical / direction-flipping / age- or threshold-dependent results** are flagged as
  a *signature* worth suspecting: the schizophrenia-PRS threshold reversal (ref 27), the
  age-dependent genetic correlations (ref 26), protective-looking smoking effects.
- The **algorithms of Daniel et al. (ref 16)** are named as the formal check for whether a given
  causal analysis is biased by selection.

**Where the bias does NOT bite / is small (the paper's own negligibility conditions):**

- **Box 3 condition**: if the **outcome of interest has not influenced selection** into the intended
  study population, and the whole intended study population is actually in the study, then selection
  bias — and therefore collider bias — should be small. (This is the paper's *only* general
  negligibility statement.)
- **Binary outcome + logistic regression**: the SNP–outcome odds ratio "may be unbiased even when the
  outcome causes selection (as is true of case-control studies)" (ref 15).
- **Figure 3 panel F**: a structure where selection biases the **P–O** association but the **SNP–O**
  association remains **unbiased** in the selected sample.
- **Empirically, from Table 1**: at selection OR = 1.2 (a 0.2 SD shift between participants and
  non-participants) coverage stays near nominal (89–97 of 100 CIs contain zero) across all r; the
  damage becomes severe at OR = 1.8 and/or r ≥ 0.15.
- **Adjustment is a remedy here, not the disease**: "unless X is also controlled for" — controlling
  for the selecting *phenotype* blocks the induced Gx–Y association; and "If the factors influencing
  selection and attrition are known, they can be adjusted for."

## 10. What the source does NOT address (confident silences)

Read carefully for each of these; each is a genuine silence, not an oversight in my reading.

- **It never defines a confounder, and never draws an explicit confounder-vs-collider contrast.** The
  word "confounding" appears in exactly two places, both in the same sense — "conventional confounding
  is [typically] low [for single genetic variants]" (Introduction, and again in the paragraph before
  Simulations) — used to explain why the authors had *previously* judged selection bias unimportant
  for genetic associations. It is never defined and never contrasted with a collider.
  The paper **does** supply the **collider = common effect** half of the contrast, in one sentence:
  selection bias "amounts to implicitly conditioning on their common effect (i.e. participation)"
  (§7 quote 7). But there is **no sentence saying "a confounder is a common cause — adjust for it;
  a collider is a common effect — do not adjust for it."** The common-cause half is simply absent.
  **Cite this paper for the collider/common-effect half only; do not cite it for the confounder side
  of that contrast, or for the adjust/don't-adjust rule.**
- **It never discusses mediators as such**, and never states the consequence of adjusting for a
  variable on the causal path. Causal chains do appear (Figure 3 C–E involve SNPs that "cause the
  outcome directly via the phenotype"; "unless X is also controlled for" is, structurally, adjusting
  for an intermediate), but the paper does **not** name mediation, does not warn against
  over-adjustment for mediators, and in fact only ever invokes controlling for X as a *fix*. Do not
  import the mediator case from this source.
- **It never criticizes a "kitchen sink" / "adjust for everything measured" covariate strategy.** No
  such statement exists. Its only adjustment guidance points the other way: adjust for the factors
  influencing selection, if you know them. (See §12 for the precise scope answer.)
- **It gives no worked example, simulation, or empirical demonstration of adjusting for a measured
  collider *covariate* in a regression.** Every simulation and every real-data example is about
  *selection into a sample*. The covariate-adjustment case is asserted in one sentence (§7 quote 1)
  and then immediately converted into the selection case.
- **Batch effects, batch design, technical/laboratory covariates, and genomics assay batches are not
  mentioned at all.** No occurrence of "batch" anywhere in the paper (except "UK BiLEVE" array
  selection, which is about *which people were genotyped on which array*, i.e. selection — not about
  batch as a technical confounder). Any transfer of this paper's argument to batch-covariate
  selection or batch adjustment would be an **external inference, not the source's claim.**
- **No formal derivation.** The bias is not derived algebraically; there is no closed-form expression
  for the magnitude of the induced association as a function of the selection ORs and r. The
  magnitude claims rest entirely on the 100-replicate simulations of Tables 1–2.
- **No d-separation / back-door-criterion machinery.** DAGs are used illustratively; the paper defers
  the formal decision procedure to ref 16 rather than presenting one.
- **No treatment of population stratification, Mendelian randomization instrument validity, or
  linkage disequilibrium** as such (allele scores are used purely as exposures/proxies here).
- **No software, code, or package** is provided or named for the simulations.

## 11. Open questions / ambiguities the source leaves unresolved

- **Figure 3's six panels (A–F) cannot be redrawn from the text.** The prose describes A and B (SNP
  not causally associated with outcome; selection induces an association), C and D (SNP causally
  associated; selection could inflate or attenuate), E (SNP causally associated; selection biases the
  association either way), and F (P–O biased but SNP–O unbiased), and the caption names the node set
  **P (phenotype), O (outcome), S (selection), U (other variables)** — but the *arrow directions* that
  distinguish A from B, or C from D, live in the image. To reconstruct them the figure image must be
  consulted. The one structure the prose does pin down is **panel B**: selection depends on P but not
  on O; P does not cause O; P and O are correlated via shared genetic/environmental factors U.
- **How large is the bias relative to a real effect, in general?** The paper only shows two settings
  (true effect 0 and true P→O effect 0.1) with equal selection ORs for P and O. Unequal selection
  effects, interactions on the additive scale, non-Normal variables, and binary exposures are all
  left unexplored.
- **What to do when selection factors are unknown** is left largely open: the abstract's proposal is
  to genotype everyone at recruitment so that polygenic prediction of *subsequent participation* can
  be estimated and used in sensitivity analyses — a suggestion, not a demonstrated method. No
  sensitivity-analysis procedure is specified or evaluated in this paper.
- **Whether the reported real-world associations it names (personality↔cognition, chronotype↔
  education) actually ARE collider artefacts is not settled** — the claim is only that they "could
  therefore plausibly be generated by selection bias."
- The paper says the outcome distribution and analysis model determine whether bias arises (the
  logistic/binary exception) but does not map out which model–distribution combinations are safe.

## 12. Guidance answers

### The scope question (asked explicitly, answered precisely)

**Q: Is this paper framed around selection bias / selection into a sample, or around covariate
adjustment generally?**

**A: It is framed around SELECTION BIAS — selection into, and attrition from, a study sample. Not
around covariate adjustment generally.** This is not a close call:

- The **title**, **abstract**, and **keywords** ("Collider bias, selection bias, representativeness,
  cohort studies, UK Biobank, ALSPAC") are all about selection.
- The stated research question is "what is the impact of selection bias on the results obtained from
  these studies?", and the paper's contribution is the *perspective* that selection bias "amounts to
  conditioning on a collider."
- **Every** simulation and **every** empirical example conditions on *participation* (UK Biobank
  response, ALSPAC retention, ARIES sub-study membership, case-control status), never on a measured
  covariate in a regression.
- The paper's closing framing is about representativeness of cohorts and knowing the selection
  mechanism.

**However — and this is the load-bearing nuance — the paper DOES state the general
covariate-adjustment mechanism, in one sentence, and uses it as the bridge to selection:**
"statistical adjustment for Z will bias the estimated causal association of X (exposure) on Y
(outcome)", justified by "Statistical adjustment of the XY association for a variable Z is equivalent
to observing this association in a sub-population where all individuals share the same value of Z"
(§7 quote 1). So the paper *asserts* that adjusting for a collider covariate biases the X–Y
association — and treats selection as a special case of that, not the other way round.

**But it never develops, demonstrates, quantifies, or exemplifies the covariate-adjustment case.**
There is **no** worked example, **no** simulation, and **no** empirical result in this paper in which
a researcher adjusts a regression for a measured collider covariate. The whole apparatus — Tables
1–3, Figures 2 and 3, Boxes 1–3 — is selection.

**Practical bound for citing it:** this paper is a **sound primary citation for** (a) the definition
of a collider as a common effect, (b) the claim that conditioning on / adjusting for a collider
induces a spurious association, (c) the equivalence of adjustment and sub-population restriction, and
(d) the *magnitude* of collider bias **in the selection setting**, with real parameters. It is **not**
a citation for how bad it is to throw a measured collider into a regression's covariate list (the
quantitative claims are all selection-parameterized), and it is **not** a citation for the
confounder-vs-collider adjust/don't-adjust rule, which it never states. The guidance file's suggested
deeper primary (Greenland, Pearl & Robins 1999, *Epidemiology* 10:37–48) is indeed not superseded by
this paper; a nearer, open-access alternative the paper itself cites for the general adjustment case
is **Elwert & Winship 2014, "Endogenous selection bias: the problem of conditioning on a collider
variable," *Annu Rev Sociol* 40:31–53 (ref 31)** and **Hernán, Hernández-Díaz & Robins, "A structural
approach to selection bias," *Epidemiology* 2004;15:615–25 (ref 13)**.

### Point-by-point against the guidance file

**Must capture — the mechanism**

| Guidance item | Status |
|---|---|
| Definition of a collider + what happens when you condition/adjust/select on one; the sentence saying adjustment **induces** an association not causally there | **Captured, verbatim** — §7 quote 1 ("two variables (X and Y) independently cause a third variable (Z)… statistical adjustment for Z will bias the estimated causal association"). The word the paper uses for the creation of a non-causal association is **"induce"**: §7 quote 2 ("selection can induce collider bias"), Figure 2 caption ("Selection into the study… **induces** an association between allele score and outcome (collider bias)"), and Figure 1 caption ("a spurious inverse correlation has been **induced**"). |
| Contrast with a confounder (common cause → adjust; common effect → don't) | **HALF PRESENT, HALF ABSENT.** The **collider = common effect** half IS stated verbatim: selection bias "amounts to implicitly conditioning on their common effect (i.e. participation)" (§7 quote 7). The **confounder = common cause → adjust for it** half is **NOT IN THE SOURCE** — the paper never defines a confounder ("confounding" occurs twice, both meaning only "conventional confounding is low for single genetic variants") and never draws the adjust/don't-adjust line. **Do not attribute the full contrast to Munafò 2018 — only the collider half.** |
| Mediators — variables on the causal path — and consequence of adjusting for them | **NOT IN THE SOURCE.** No mention of mediation or over-adjustment. Silence recorded; not imported. |
| DAG structures precise enough to redraw | **Partial.** The *collider* structure is fully recoverable from prose: X → Z ← Y, condition on Z. Figure 2's simulation structure is recoverable from the Simulations section: allele score → phenotype (correlation r); phenotype → selection; outcome → selection; **no** allele score → outcome edge (true null); optionally phenotype → outcome (coefficient 0.1) in the Table 2 setting; selection S is the collider. **Figure 3 A–F is NOT redrawable from text** — arrow directions are in the image (see §11). No confounder DAG and no mediator DAG exist in the paper to capture. |
| Explicit criticism of "adjust for everything measured" / kitchen-sink covariates | **NOT IN THE SOURCE.** No such statement. Its only adjustment guidance is the *pro*-adjustment one: adjust for known selection factors (§7 quote 5), and control for the selecting phenotype X to remove the induced Gx–Y association (§7 quote 4). **Recorded as a silence.** |

**Must capture — magnitude**

| Guidance item | Status |
|---|---|
| Quantitative demonstration of how large a spurious association collider bias can induce, and under what conditions; numbers + the parameters they depend on | **Fully captured** — §6, Tables 1–3 reproduced. **The two parameters the magnitude depends on are (i) the strength of the effect of phenotype and outcome on selection (OR 1.2 / 1.5 / 1.8 per SD, ≡ 0.2 / 0.4 / 0.6 SD mean shift between participants and non-participants) and (ii) the allele-score–phenotype correlation r (0.05–0.30, ≡ 0.25%–9% of variance explained).** Plus sample size, which enters through the standard error: N ≈ 500 000 selected from 9 000 000. Bias increases monotonically in both parameters. Worst case reported: OR = 1.8, r = 0.30 → mean coefficient −0.008, mean z = **−6.18**, **0/100** CIs cover the true null. Named "moderate" case: OR = 1.5, r = 0.10 → CIs cover zero only **89%** of the time. Real-data: smoking GRS ↔ maternal education, **OR 1.01 (P = 0.74) in ALSPAC vs OR 1.20 (P = 0.03) in ARIES**. |
| Stated conditions under which collider bias is **negligible** vs **substantial** | **Captured** — see §9 "Where the bias does NOT bite". Negligible: outcome does not influence selection AND the whole intended population is in the study (Box 3); binary outcome analysed by logistic regression (OR may be unbiased even when the outcome causes selection); Figure 3F structure (SNP–O unbiased though P–O biased); empirically, selection OR ≈ 1.2. Substantial: strong selection effects (OR 1.5–1.8) combined with strongly phenotype-correlated allele scores (r ≥ 0.15), very large N, and especially **polygenic scores**, genome-wide allelic scores, and whole-genome genetic correlations. |

**Must-quote items**

| Requested quote | Status |
|---|---|
| The collider definition | **§7 quote 1**, verbatim. |
| The "conditioning on a collider induces bias" sentence | **§7 quotes 1, 2 and 7**, verbatim; plus the Figure 1 and Figure 2 captions, which use "induced"/"induces" explicitly. |
| Any explicit guidance on which variables to adjust for | **§7 quotes 4 and 5**, verbatim — and note both are *pro*-adjustment (control for the selecting phenotype; adjust for known selection/attrition factors). **The paper offers no "do not adjust for X" list.** |

**Silences to record explicitly**

| Guidance item | Status |
|---|---|
| Is it framed for selection bias / sample selection specifically, rather than covariate adjustment generally? | **YES — it is framed for selection/attrition.** Answered in full above. The covariate-adjustment mechanism is *asserted* in one sentence but never demonstrated, quantified, or exemplified. **Do not overclaim its reach to "adjusting for a measured collider covariate in a regression."** The deeper primary (Greenland, Pearl & Robins 1999) is **not** superseded; Elwert & Winship 2014 (ref 31, *Annu Rev Sociol*) and Hernán et al. 2004 (ref 13, *Epidemiology*) are this paper's own citations for the general conditioning-on-a-collider problem. |
| Does it mention batch effects / genomics batch design? | **NO — no mention of batch effects, batch design, or technical batch covariates anywhere in the paper.** (The closest thing is the UK BiLEVE two-array note in Box 2, which is about *which participants were genotyped*, i.e. another selection step — not batch as a technical confounder.) **Any transfer of this paper's argument to batch-covariate selection is an external design inference, not this source's claim.** |

**Pin**

DOI 10.1093/ije/dyx206; *Int J Epidemiol* 47(1):226–235 (2018); PMID 29040562; PMCID PMC5837306.
Read from the PMC full-text deposit; **accessed 2026-07-13**. License CC-BY-4.0 (explicit statement
on the article; see §1) → license-aware summary, verbatim quotes permitted and marked.
