---
title: "False-Positive Psychology: Undisclosed Flexibility in Data Collection and Analysis Allows Presenting Anything as Significant"
type: paper
source_id: simmons-2011
source_url: https://journals.sagepub.com/doi/10.1177/0956797611417632
doi: 10.1177/0956797611417632
access_date: "2026-07-01"
license: LicenseRef-all-rights-reserved
attribution: "Simmons JP, Nelson LD, Simonsohn U. Psychological Science 22(11):1359–1366, 2011 (SAGE / Association for Psychological Science). Version of record read via a UBC-hosted PDF copy."
derived: own-words-summary
---

*Faithful clean-context summary of one source; read source-only (the version-of-record PDF via a UBC-hosted copy) plus this note's guidance. Project framing lives in the flagged footer. License mode: own-words paraphrase; numeric results and the disclosure checklist kept verbatim as functional strings / a reproducible checklist.*

## 1. Citation

Simmons, J. P., Nelson, L. D., & Simonsohn, U. (2011). False-Positive Psychology: Undisclosed Flexibility in Data Collection and Analysis Allows Presenting Anything as Significant. *Psychological Science, 22*(11), 1359–1366. DOI: 10.1177/0956797611417632. Received 3/17/11; revision accepted 5/23/11; published online 17 Oct 2011; version of record 7 Nov 2011.

## 2. Access note

Read the **full version-of-record PDF** (journal pages 1359–1365, incl. Tables 1–3 and Figures 1–2), obtained from a UBC-hosted copy (`www2.psych.ubc.ca/~schaller/528Readings/SimmonsNelsonSimonsohn2011.pdf`) after the SAGE and SSRN pages returned HTTP 403. The published PDF is the same text as the paywalled SAGE version of record. I did not read the reference list (p. 1366); all substantive content, tables, and both studies are captured. License is all-rights-reserved — this note is own-words paraphrase, with numeric results and the disclosure checklist kept verbatim as functional strings / a reproducible checklist.

**Boundary flag:** The famous literal "21-word solution" sentence is **NOT present in this 2011 article** — see §7 and §11.

## 3. Thesis

Under current (2011) standards for disclosing data collection and analysis, it is "unacceptably easy" to obtain *p* ≤ .05 evidence for essentially any hypothesis, because researchers exploit undisclosed flexibility ("researcher degrees of freedom"). This is driven not by fraud but by self-serving interpretation of genuine analytic ambiguity. The paper (a) quantifies via simulation how much this flexibility inflates false positives and (b) proposes a low-cost disclosure remedy: six requirements for authors + four guidelines for reviewers.

## 4. Problem & context

- The most costly error in science is the false positive (incorrect rejection of a true null): false positives are persistent (null results rarely conclusive; prestigious journals disfavor null findings and replications, so they go uncorrected), waste resources, and cost a field its credibility.
- It is rare/impractical to make all analytic decisions beforehand; common (and accepted) practice is to explore analytic alternatives, search for a combination yielding "statistical significance," and report only what "worked." The chance that at least one of many analyses yields *p* < .05 is necessarily greater than 5%.
- Cause is two factors: **(a) ambiguity** in how best to make analytic decisions, and **(b) the researcher's desire** to find a significant result. A large literature shows people are self-serving in interpreting ambiguous information; facing ambiguous analytic choices, researchers tend to conclude (with self-justification) that the choices yielding *p* ≤ .05 are the appropriate ones.
- Example of pervasive ambiguity: how to treat outliers in reaction-time data. In a survey of ~30 *Psychological Science* articles, exclusion rules varied enormously (e.g., excluding responses faster than the fastest 2.5%, or faster than 2 SD, or faster than 100/150/200/300 ms; slowest 2.5% or 10%, or 2/2.5/3 SD, or 1.5 SD, or slower than 1,000/1,200/1,500/2,000/3,000/5,000 ms). None necessarily wrong — which makes any of them justifiable and thus "fodder for self-serving justifications."

## 5. Method / approach

**Simulations.** Monte Carlo of experimental data: random samples with each observation independently drawn from a normal distribution; ran sets of analyses on each sample; counted how often at least one resulting *p* fell below a significance level. 15,000 simulations per scenario. Baseline: two-condition design, 20 observations per cell. Four common degrees of freedom assessed: (a) choosing among dependent variables, (b) choosing sample size, (c) using covariates, (d) reporting subsets of experimental conditions; plus combinations.

**Two experiments** (real Penn undergraduate participants, legitimate statistical analyses, reported "truthfully" — designed to "demonstrate something false: that certain songs can change listeners' age"):

- **Study 1 (musical contrast and subjective age):** 30 U. Penn undergrads, paid, wore headphones, randomly assigned to listen to a control song ("Kalimba," an instrumental by Mr. Scruff bundled with Windows 7) or a children's song ("Hot Potato" by The Wiggles). DV: "How old do you feel right now?" (very young / young / neither young nor old / old / very old). Also reported father's age → used as covariate for baseline age. ANCOVA: felt **older** after "Hot Potato" (adjusted *M* = 2.54 years) than control (adjusted *M* = 2.06 years), *F*(1, 27) = 5.06, *p* = .033.
- **Study 2 (musical contrast and chronological rejuvenation):** 20 U. Penn undergrads listen to "When I'm Sixty-Four" (The Beatles) or "Kalimba." In an ostensibly unrelated task, indicated their **birth date (mm/dd/yyyy)** and their father's age (covariate). ANCOVA: per their birth dates, people were nearly **a year-and-a-half younger** after "When I'm Sixty-Four" (adjusted *M* = 20.1 years) than after "Kalimba" (adjusted *M* = 21.5 years), *F*(1, 17) = 4.92, *p* = .040. The absurd/impossible result: listening to a song literally made participants *younger* (changed their birth-date-derived chronological age).

**Table 3 confession (the actual degrees of freedom behind Study 2):** the truthful/compliant report reveals what the original redacted report hid — sample was actually **34** participants (not 20), a **third song ("Hot Potato")** was also used, they collected **many other measures** besides the ones reported (how old felt, how much they'd enjoy eating at a diner, the square root of 100, agreement with "computers are complicated machines," mother's age, whether they'd take an early-bird special, political orientation, which of four Canadian quarterbacks won an award, how often they refer to the past as "the good old days," and gender), analyses were run **after every ~10 participants** with no ex ante termination rule, and father's age was chosen post hoc as the control. **Without** controlling for father's age, the effect vanished: *Ms* = 20.3 and 21.2, *F*(1, 18) = 1.01, *p* = .33.

## 6. Key claims / findings (atomic — every number pinned)

**Table 1 — Likelihood of a false-positive result** (% of 15,000 simulated samples with ≥1 significant analysis; baseline two-condition design, 20 obs/cell). Columns are significance thresholds *p* < .1 / *p* < .05 / *p* < .01:

- **Situation A** — two dependent variables (r = .50): **17.8% / 9.5% / 2.2%**. (≈ doubles the false-positive rate at *p*<.05 vs nominal 5%.)
- **Situation B** — addition of 10 more observations per cell (collect 20, test; if nonsignificant add 10 more, test again): **14.5% / 7.7% / 1.6%**. (This "seemingly small" degree of freedom raises the *p*<.05 rate by ≈50%.)
- **Situation C** — controlling for gender or gender × treatment interaction: **21.6% / 11.7% / 2.7%**.
- **Situation D** — dropping (or not dropping) one of three conditions (report any of the three pairwise *t* tests or the OLS linear trend across three conditions coded low=−1/medium=0/high=1): **23.2% / 12.6% / 2.8%**.
- **Combine A and B:** **26.0% / 14.4% / 3.3%**.
- **Combine A, B, C:** **50.9% / 30.9% / 8.4%**.
- **Combine A, B, C, D:** **81.5% / 60.7% / 21.5%**.

Headline figure: using all four common degrees of freedom together yields a **"stunning 61%" false-positive rate** at *p* < .05 (Table 1 value 60.7%) — a researcher is then **more likely than not** to obtain a false positive. Authors note these estimates "may actually be conservative" (they omitted still other common flexibilities: >2 dependent variables and their combinations, >1 covariate and combinations, excluding subsets of participants/trials, calling early data a pilot vs. proper, etc.).

**Figure 1 — flexible-stopping (optional stopping) rates**, when data collection stops upon *p* ≤ .05 (or when *n* per cell reaches 50), for two minimum sample sizes, as a function of how often significance is tested:

- Minimum **n ≥ 10**, then test after every additional 1 / 5 / 10 / 20 per-condition observation(s): **22.1% / 17.0% / 14.3% / 12.7%**. (Text: starting with 10, testing after every new observation → significant 22% of the time.)
- Minimum **n ≥ 20**: **16.3% / 13.3% / 11.5% / 10.4%**.
- Larger minimum sample sizes lessen (but do not eliminate) the inflation.

**Figure 2** — illustrative single run: *p* value from a *t* test recomputed after each added observation pair (from *n*=11 up to ~70 per condition) wanders below .05 and back above, contradicting the intuition that if an effect is significant at small *n* it must remain significant at larger *n*.

**Survey fact:** a recent survey (John, Loewenstein, & Prelec, 2011) found ~**70%** of behavioral scientists admitted to deciding when to stop data collection based on interim results.

## 7. Load-bearing statements (own-words; functional strings / checklist verbatim)

Term coined (own words): the paper labels the set of collection/analysis decisions **"researcher degrees of freedom"** — decisions such as: should more data be collected? should some observations be excluded? which conditions should be combined and which compared? which control variables considered? should specific measures be combined or transformed? Researchers commonly explore these alternatives, keep the combination that "worked," and report only that.

Framing vs. fraud (own words): the exploratory behavior is "not the by-product of malicious intent"; the authors "assume that the vast majority of researchers strive for honesty," and the disclosure solution "will not help in the unusual case of willful deception." The remedy turns "inconsequential sins of omission (leaving out inconvenient facts) into consequential, potentially career-ending sins of commission (writing demonstrably false statements)."

**Table 2 — the disclosure remedy (verbatim as a reproducible checklist / functional strings):**

*Requirements for authors:*
1. "Authors must decide the rule for terminating data collection before data collection begins and report this rule in the article."
2. "Authors must collect at least 20 observations per cell or else provide a compelling cost-of-data-collection justification."
3. "Authors must list all variables collected in a study."
4. "Authors must report all experimental conditions, including failed manipulations."
5. "If observations are eliminated, authors must also report what the statistical results are if those observations are included."
6. "If an analysis includes a covariate, authors must report the statistical results of the analysis without the covariate."

*Guidelines for reviewers:*
1. "Reviewers should ensure that authors follow the requirements."
2. "Reviewers should be more tolerant of imperfections in results."
3. "Reviewers should require authors to demonstrate that their results do not hinge on arbitrary analytic decisions."
4. "If justifications of data collection or analysis are not compelling, reviewers should require the authors to conduct an exact replication."

Elaboration notes attached to the requirements: R1 — the rule itself is secondary but must be set ex ante and reported (may mean reporting power calculations or an arbitrary-but-disclosed rule). R2 — samples under 20/cell are usually underpowered; larger minimums also blunt R1's stopping problem. R3 — authors encouraged to begin the list with "only" (e.g., "participants reported only their age and gender") to signal exhaustiveness; adds only a few words per variable. R4 — encourage the word "only" for conditions too. R5 — draws attention to results hinging on ex post exclusion decisions. R6 — makes covariate reliance transparent. Reviewer guideline elaborations: sample reviewer questions include "Do the results also hold if the baseline measure is instead used as a covariate?" and "Do the results hold for Study 3 if gender is entered as a covariate, as was done in Study 2?"; exact replication is "a costly solution … used selectively; however, 'never' is too selective."

**Concluding framing (own words):** The problem afflicts even the authors themselves; it "is not driven by a willingness to deceive but by the self-serving interpretation of ambiguity." Disclosure won't rid researchers of publication pressures but will "limit what authors are able to justify as acceptable to others and to themselves."

## 8. Stated scope / assumptions / limitations

- Simulations assume normally distributed data, a specific two-condition/20-per-cell baseline, and specific parameter choices (e.g., dependent variables correlated r=.50; gender assigned 50% probability). Note 3: lower correlation between two DVs → higher false-positive rate from testing both.
- Note 2: simulations used instead of closed-form derivations because combinations of degrees of freedom yield complex derivations without added insight.
- Note 1: the studies deliberately avoid implicating any particular research field; concerns apply to all experimental psychology and other sciences.
- The remedy assumes most researchers are honest; explicitly does not address willful deception.

## 9. Failure modes / invalidity patterns (referee-relevant)

- **Optional stopping / flexible sample size:** collecting data, testing, and adding more if nonsignificant — inflates false positives (Situation B; Figures 1–2). ~70% of behavioral scientists admit doing it. Intuition that "significant at small n ⇒ significant at large n" is false.
- **Multiple dependent variables / outcome cherry-picking:** measuring several outcomes (or their composites) and reporting the significant one (Situation A).
- **Covariate flexibility:** adding/omitting covariates (e.g., gender) or gender-interaction terms until significance appears (Situation C).
- **Condition dropping / selective reporting of conditions:** running 3+ conditions and reporting the favorable pairwise comparison or trend (Situation D); not reporting failed manipulations.
- **Post hoc exclusion rules:** arbitrary outlier/exclusion criteria chosen to yield significance.
- **Undisclosed combination:** stacking all of the above → majority-of-the-time false positives (60.7%).
- **Redaction as concealment:** an original report can fully satisfy conventional standards yet be "deceptively persuasive" precisely because it redacts the extra measures, conditions, and the true stopping behavior (Table 3 contrast).

**Rejected non-solutions (and why):** (1) *Correcting alpha levels* (Bonferroni-style) — the set of degrees of freedom is too broad/ambiguous to know which apply; explicit adjustment rules would add new degrees of freedom, possibly worsening things. (2) *Bayesian statistics* — increases researcher degrees of freedom (new families of analyses; prior choice on a case-by-case basis). (3) *Conceptual replications* — don't bind researchers to the same analytic decisions across studies, so they are "unfortunately misleading" as a fix (exactly what the two studies here exploited). (4) *Posting materials/data* — supported in principle but unlikely to work in real time: imposes too high a cost on reviewers/readers, and if condition-redaction is allowed in the report it presumably could also be redacted from raw materials, making transparency futile. Similarly, a public study registry/repository ("not far enough") can't address the file-drawer problem alone and faces enforcement/interpretation challenges — an ambitious extension, not a substitute.

## 10. What the source does NOT address

- Willful fabrication/fraud (explicitly out of scope).
- The file-drawer / publication-bias problem for whole studies that "didn't work" (acknowledged as not solved by the six requirements).
- Non-experimental / observational or purely correlational designs beyond the experimental framing (though claimed to generalize).
- Effect-size or power estimation methodology beyond the ≥20/cell rule of thumb.
- Formal detection statistics for existing published literature (no p-curve / test for excess significance here — those are later work).

## 11. Open questions / ambiguities

- **The "21-word solution" is not in this paper.** The requested verbatim sentence ("We report how we determined our sample size, all data exclusions (if any), all manipulations, and all measures in the study.") does not appear anywhere in this 2011 article. This article gives the *six author requirements* (Table 2) that the later 21-word disclosure statement operationalizes; the compact 21-word sentence itself was introduced by the same authors in **later** commentary/writing (post-2011), not here. [summarizer-inferred that the sentence originates outside this source — do not attribute the exact 21-word text to this paper.]
- Table 1 gives one specific parameterization; how sensitive the exact percentages are to other reasonable parameter choices is not exhaustively mapped (only directional notes given).

## 12. Guidance answers

- **Definition/coining of "researcher degrees of freedom":** §5, §7. Coined as the many collection/analysis decisions researchers face — whether to collect more data (stopping rule), whether to exclude observations, which conditions to combine/compare (reporting subsets), which covariates to include, whether to combine/transform outcome measures. Exploiting these undisclosed and keeping only what "worked" is the mechanism. Yes — it explicitly covers stopping rules, choice of conditions/covariates, exclusions, outcome measures, and reporting subsets.
- **Quantified inflation above nominal .05:** §6, Table 1. At *p*<.05: Situation A 9.5%, B 7.7%, C 11.7%, D 12.6% (each roughly ~1.5×–2.5× the nominal 5%). Combined A+B 14.4%; A+B+C 30.9%; **all four (A+B+C+D) = 60.7%**, which the authors round to the headline **"stunning 61%"** — meaning more likely than not to get a false positive. Optional-stopping alone (Fig 1): up to 22.1% (min n≥10, testing every observation).
- **The two experiments:** §5. Study 1 — "Hot Potato" (Wiggles) makes people *feel* older than control "Kalimba," *F*(1,27)=5.06, *p*=.033. Study 2 — "When I'm Sixty-Four" (Beatles) makes people chronologically ~1.5 years *younger* by birth date than "Kalimba," *F*(1,17)=4.92, *p*=.040 — a logically impossible result, achieved via undisclosed flexibility (revealed in Table 3: n actually 34, extra song, ~10 hidden measures, optional stopping, post-hoc covariate father's age; effect gone without the covariate, *p*=.33).
- **The remedy / disclosure requirements:** §7 (Table 2 verbatim). Six requirements for authors + four guidelines for reviewers captured verbatim as a checklist. **The literal "21-word solution" sentence is not in this article** — flagged in §2 and §11.
- **Framing vs. deliberate fraud:** §4, §7. Undisclosed flexibility driven by ambiguity + self-serving desire for significance, "not the by-product of malicious intent"; authors assume most researchers are honest and state the solution won't stop "willful deception." The disclosure requirements convert "sins of omission" into "sins of commission."

## Relevance to this project  `[design-inference — author-added, not from source]`
- **Pole:** cautionary-bad / companion. Coins "**researcher degrees of freedom**" and **quantifies** the false-positive inflation that [[gelman-loken-2014]] leaves as future work: Table 1 gives 9.5% / 7.7% / 11.7% / 12.6% for single flexibilities and **60.7% ("61%")** for all four combined.
- **Grounds:** [[garden-of-forking-paths]]'s vocabulary + numbers + a concrete df catalog (stopping rule, DV cherry-picking, covariate flexibility, condition dropping, exclusions). The Study 2 "impossible-younger" demo is a ready cautionary-corpus exemplar.
- **The runnable remedy the gate can demand:** the **six author requirements** (Table 2) are a referee checklist — pre-set + reported stopping rule; ≥20/cell (or justify); list all variables; report all conditions incl. failed; report results with excluded observations *included*; report results *without* the covariate. R5/R6 are sensitivity-analysis demands (does the result survive dropping the arbitrary choice?).
- **Attribution boundary carried forward (do not launder):** the famous **"21-word solution" sentence is NOT in this 2011 paper** — it has the six requirements; the compact sentence is later work. Cite Simmons 2011 for the requirements, not for the 21-word text.
- **Boundary vs [[double-dipping]] / relation to siblings:** Simmons' remedy (report results without the post-hoc covariate / with excluded obs included) is a *sensitivity-across-forks* fix for latent multiplicity — distinct from double-dipping's split-data remedy and from [[batch-aliased-with-condition]]'s model-the-batch remedy. The "reject Bonferroni / Bayesian / conceptual-replication as fixes" section is a useful catalog of *non*-remedies for the referee.
