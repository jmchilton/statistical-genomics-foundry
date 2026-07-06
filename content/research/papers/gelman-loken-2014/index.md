---
title: "The garden of forking paths: Why multiple comparisons can be a problem, even when there is no 'fishing expedition' or 'p-hacking' and the research hypothesis was posited ahead of time"
type: paper
source_id: gelman-loken-2014
source_url: https://sites.stat.columbia.edu/gelman/content/research/unpublished/forking.pdf
access_date: "2026-07-01"
license: LicenseRef-all-rights-reserved
attribution: "Andrew Gelman (Dept. of Statistics, Columbia University) and Eric Loken (Dept. of Human Development and Family Studies, Penn State), dated 14 Nov 2013. Published version: American Scientist 102(6):460, 2014, 'The Statistical Crisis in Science.'"
derived: own-words-summary
---

*Faithful clean-context summary of one source; read source-only (the 17-page Columbia working paper) plus this note's guidance. Project framing lives in the flagged footer. License mode: own-words throughout; functional strings — the title, numeric study details, verbatim study phrasings — kept verbatim as facts.*

## 1. Citation

Gelman A, Loken E. "The garden of forking paths: Why multiple comparisons can be a problem, even when there is no 'fishing expedition' or 'p-hacking' and the research hypothesis was posited ahead of time." Unpublished Columbia Statistics working paper, dated 14 Nov 2013. A slightly edited version appeared in *American Scientist* 102(6):460 (2014) as "The Statistical Crisis in Science." Epigraph from Borges (1941), "El jardín de senderos que se bifurcan" ("The garden of forking paths"). Work supported in part by NSF; thanks to Ed Vul, Howard Wainer, Macartan Humphreys, E. J. Wagenmakers.

## 2. Access note

- **Read in full:** the 17-page working-paper PDF at sites.stat.columbia.edu (redirected from stat.columbia.edu). All body text, examples, discussion, and references read directly from the PDF. This is the fuller of the two sources, per the paper's own note that the American Scientist version is "slightly edited."
- **Not accessed:** the *American Scientist* article page (americanscientist.org / amsci.sigmaxi.org) entered a two-host redirect loop and could not be fetched. No content is drawn from it; where the working paper and article might differ, only the working paper is represented here. [access boundary]
- All facts below are from the working paper unless stated.

## 3. Thesis

Researcher degrees of freedom can create a multiple-comparisons problem **even when the researcher performs only a single analysis on their data**, and even when the research hypothesis was posited ahead of time. The problem is not that many tests were run and the best cherry-picked; it is that the *details* of data selection and analysis were **not pre-specified and so were contingent on the data actually seen**. Because a p-value's validity depends on averaging over all datasets that could have occurred, and because different data would have led (via reasonable, theory-consistent reasoning) to different analyses, the reported p-value cannot be taken at face value. The mistake is "thinking that, if the particular path that was chosen yields statistical significance, that this is strong evidence in favor of the hypothesis."

## 4. Problem & context

- Motivated by a wave of statistically significant but non-replicating claims in top psychology journals. The authors deliberately picked social-psychology examples (small-sample, minimal domain machinery) but expect the same problem in medical research, imaging, genetics, etc.
- They coin "garden of forking paths" to *replace* their own earlier "fishing expedition" language (Gelman 2013a), which they now "regret." "Fishing"/"p-hacking"/"researcher degrees of freedom" (Simmons, Nelson, Simonsohn 2011) wrongly imply the researcher **consciously tried many analyses**; that framing lets honest researchers believe they are immune. Their key correction: it suffices to have *potential* comparisons — analyses that would have been run under different data.
- Context that makes multiplicity bite: small effect sizes, small samples, large measurement error, high variation → low power → unreliable results even when significant (cites Button et al. 2013). Multiplicity would *not* be a big problem with large true differences, large samples, small measurement error, low variation (the "familiar Bayesian argument").

## 5. Method / approach (conceptual/expository)

The argument is structured as (a) a formal taxonomy of four testing procedures, (b) a hypothetical worked example, and (c) four re-analyses of published studies illustrating distinct fork types.

**The four-procedure taxonomy (§1.2):**
1. Simple classical test, unique statistic *T*, yielding *T(y)*.
2. Classical test pre-chosen from a set: *T(y; φ)* with **preregistered φ** (φ = choices of control variables, transformations, coding/exclusion rules, which main effect or interaction to focus on).
3. **Researcher degrees of freedom without fishing:** a single test computed, "but in an environment where a different test would have been performed given different data"; *T(y; φ(y))*, where φ(·) is observed only in the realized case.
4. **"Fishing":** compute *T(y; φ_j)* for j = 1,…,J and report the best, *T(y; φ^best(y))*.

Central claim: criticized researchers are doing **#3**, but *believe* (and their defenders assert) they are doing **#2**; critics are wrongly heard as accusing them of **#4**. The paper focuses entirely on #3. Under frequentist reasoning, if you accept the p-value concept "you have to respect the legitimacy of modeling what would have been done under alternative data" — so criticizing a study for what it *would* have done under different data is legitimate, not unfair.

The hypothetical (§1.2): Democrats vs. Republicans on a short math test framed as health-care vs. military; hypothesis "context matters." Enumerated latent forks: effect among men not women (→ men more ideological), among women not men (→ women more context-sensitive), significant for neither but the difference/interaction significant, only among men questioned by female interviewers, difference-between-sexes in health-care but not military context, classification of a 7-point party scale into Dem/Rep, handling of independents/nonpartisans (exclude?), or reframing the split as partisan vs. nonpartisan. One "overarching research hypothesis … corresponds to many different possible choices of the decision variable φ."

## 6. Key claims / findings (atomic)

- A multiple-comparisons problem does **not** require the analyst to have run multiple tests; a single data-contingent test suffices.
- The relevant multiplicity is *potential* (counterfactual), not actual.
- "The researcher needs only perform one test, but that test is conditional on the data" — this is procedure #3, *T(y; φ(y))*.
- A single overarching *scientific* hypothesis maps one-to-many onto *statistical* hypotheses ("one-to-many mapping from scientific to statistical hypotheses").
- The defense "we picked only one analysis for the particular data we saw" is intuitive but "does not address the fundamental frequentist concern of multiple comparisons."
- Data-dependent analysis "will not necessarily look 'post hoc'" — it can look like a natural implication of theory, so its absence-of-fishing does not clear it.
- P-values rest on "averaging over all paths"; the garden metaphor: "whatever route you take seems predetermined, but that's because the choices are done implicitly." Explicit analogy drawn to Feynman path diagrams / indeterminacy in quantum physics.
- The published-p-value machinery becomes "a sort of machine for producing and publicizing random patterns."
- They are NOT claiming the scientific hypotheses are necessarily wrong — only that "the evidence in these research papers is not as strong as stated," and that neither the specific claims nor even their *direction* would likely survive preregistered replication.
- Once significance is abandoned, a Bayesian reading requires conditioning on **all** the data, not the single highlighted comparison; may require hierarchical modeling. Illustrated with Bem: 53.1% correct, t(99)=2.51, p=.01, d=0.25 → with a flat prior, posterior >99% that true prob >0.5, but a flat/locally-uniform prior is "not appropriate" given no track record.

## 7. Load-bearing statements (own-words; functional strings verbatim)

- **Definition (verbatim, working-paper title):** "The garden of forking paths: Why multiple comparisons can be a problem, even when there is no 'fishing expedition' or 'p-hacking' and the research hypothesis was posited ahead of time."
- **Abstract (own-words):** researcher degrees of freedom can cause a multiple-comparisons problem even where researchers perform only a single analysis; there can be a large number of *potential* comparisons when analysis details are highly contingent on data, with no conscious fishing or examining of multiple p-values.
- **The core distinction from p-hacking (own-words of §4.1):** saying an analysis is subject to multiple comparisons does NOT require that the analysts actively tried different tests; they can do an analysis that at each step is contingent on the data. "The researcher degrees of freedom do not *feel* like degrees of freedom because, conditional on the data, each choice appears to be deterministic. But if we average over all possible data that could have occurred, we need to look at the entire garden of forking paths and recognize how each path can lead to statistical significance in its own way."
- **Verbatim closing formulation:** "even if only a single analysis is performed on a dataset, this does not mean that p-values can be taken literally. A multiple comparisons problem does not have to come from 'fishing' but can arise more generally from reasonable processing and analysis decisions that are contingent on data."
- **On the p-value collapse under contingency (own-words of §4.2, response 3):** once analysis is recognized as contingent on data, the p-value argument disappears — one can no longer argue that, if nothing were going on, something as extreme as observed would occur less than 5% of the time.
- **Functional numeric strings (verbatim facts):** Beall & Tracy — women at peak fertility "three times more likely to wear red or pink shirts"; peak fertility defined as days 6–14; second sample 9 of 24 women didn't meet the >5-days-from-menses criterion but were included; 22% of first sample also didn't meet it; first sample supposed to be <40 but ages ranged up to 47; 31% excluded for insufficient precision. Durante et al. — compared days 7–14 to days 17–25, excluding 1–6, 15–16, 26–28; claimed ~20-percentage-point vote-intention difference across cycle phases. Nosek/Spies/Motyl replication: original significant, replication had >99% power yet failed, p = .59.

## 8. Stated scope / assumptions / limitations

- **Frequentist framing throughout:** "we consider the statistical properties of hypothesis tests under hypothetical replications of the data." The critique is *internal* to frequentist logic.
- Examples are deliberately small-sample social psychology; authors explicitly expect but do not demonstrate the same in medicine/imaging/genetics.
- Preregistration is acknowledged as often impossible in their own applied work and in observational fields (elections, economy) where data have been studied many times.
- General methods to analyze all potential comparisons are "an area for future research"; multilevel modeling helps but "practical difficulties … are not trivial" and can be "sensitive to model assumptions" when the number of comparisons is small or the structure is not highly regular.
- Authors self-implicate: their own applied work reports uncertainty intervals "without concern for selection bias or multiple comparisons."

## 9. Failure modes / invalidity patterns (referee-relevant)

- **The latent-multiplicity detector — the gap between scientific and statistical hypotheses:** whenever one stated scientific hypothesis could be confirmed by *several distinct statistical results*, latent multiplicity is present even if only one test was run. Concrete tell (§4.2 response 2): an analysis on two groups/conditions where a significant *overall* effect, or a significant effect *in one group only*, or a significant *interaction*, would each "seem fully consistent with a research hypothesis" but "represent different analyses, different paths that can be taken." (Bem's non-erotic images could serve as control OR as a separate confirmatory study — either reading available post hoc.)
- **Boundary vs. p-hacking (the key discriminator):** p-hacking/fishing = actual, conscious running of many tests and reporting the best (procedure #4). Forking paths = a *single* test whose specification φ(y) was contingent on the observed data (procedure #3). The referee test is NOT "did they run many tests?" but "were the exclusion/coding/comparison/subgroup/interaction choices fixed *before seeing the data*?" If not pre-specified, latent multiplicity exists regardless of the analyst's honesty or intent. Absence of fishing does not clear a study; only pre-specification (or replication) does.
- **Why "we chose one analysis for the data we saw" fails:** it concedes exactly the point — the choice was data-contingent, so the reference set over which the p-value is computed is undefined/undeclared.
- **Why "not post hoc / hypothesis posited ahead of time" fails:** the *overarching* hypothesis being pre-stated does not fix φ; the specific comparison remains data-selected, and a data-dependent choice can look like a natural theoretical implication rather than post-hoc mining.
- **Amplifiers:** small samples, large measurement error, high variation, low power, nonrepresentative samples, substantively implausible effect sizes (the ~20-point menstrual vote swing is called implausible given campaign-polling evidence).

## 10. What the source does NOT address

- No formal derivation of how much Type-I error inflates in procedure #3 (no general quantitative correction is offered — explicitly deferred to future research). No simulations in this working paper.
- No worked genomics/medical example (only asserted transferable).
- Does not resolve how to *analyze* all potential comparisons in general; multilevel modeling gestured at, not developed here (points to Gelman, Hill, Yajima 2012).
- Does not endorse universal preregistration; treats it as one tool among several and often infeasible.
- The term "multiverse analysis" (Steegen et al.) is **not** used; the closest is "analyze all relevant comparisons, not just … whatever happens to be statistically significant" and the reference to decision variables φ with generality in mind.

## 11. Open questions / ambiguities

- The authors concede that in a highly structured or small-comparison setting, model-based multiplicity adjustment "can be sensitive to model assumptions" — leaving the practical remedy unsettled.
- Tension between "refining hypotheses in light of data is completely reasonable for good scientists" (endorsed, citing Tukey EDA, Box) and the claim that such refinement voids the p-value; resolved only by relabeling such work as *exploratory* requiring confirmatory follow-up, not by a within-study fix.
- Whether the four examples' *directions* (not just magnitudes) would fail replication is stated as the authors' belief/guess, not demonstrated.

## 12. Guidance answers (each bullet, cited)

**(a) Exact definition + authors' framing.** The title itself is the definition (verbatim, §title/§7): a garden of forking paths is the situation where many *potential* analyses branch from one dataset, so that multiple comparisons are a problem even absent fishing/p-hacking and even when the hypothesis was posited ahead of time. Framing via Borges's labyrinth and Feynman path integrals (epigraph; §4.1): every route "seems predetermined, but that's because the choices are done implicitly."

**(b) LOAD-BEARING — problem arises even with (i) a single analysis and (ii) pre-posited hypothesis; error from paths not taken.** Yes, explicitly and repeatedly. Abstract: multiple comparisons "even in settings where researchers perform only a single analysis on their data." Procedure #3 (§1.2): one test computed "in an environment where a different test would have been performed given different data," *T(y; φ(y))*. §4.1: error comes from averaging over "all possible data that could have occurred" — "the entire garden of forking paths" — not from tests actually performed; conditional on the realized data each choice "appears to be deterministic," which is precisely why the degrees of freedom "do not *feel* like degrees of freedom." §4.4/close: "even if only a single analysis is performed on a dataset, this does not mean that p-values can be taken literally." The pre-posited-hypothesis condition is handled by the one-scientific-to-many-statistical mapping (§2.2, §7): the overarching hypothesis being fixed ahead of time does not fix the specific comparison.

**(c) Concrete fork examples (worked).**
- **Hypothetical Dem/Rep math test (§1.2):** forks over which sex the effect appears in, main-effect vs. interaction, interviewer sex, which context, 7-point→binary party coding, inclusion/exclusion of independents, partisan-vs-nonpartisan reframing.
- **"Fat arms and political attitudes" — Petersen et al. 2013 (§2.1):** arm circumference used as proxy for "upper-body strength"; significant *interaction* reported with **no** significant main effect (either-direction main effect would also have been storyable); coefficient vanishes when age is added (arm circ. as proxy for age); could have looked at other interactions (e.g., presence/absence of older siblings). Measurement forks (from supplement): dropping two "unreliable" redistribution items 5 and 6 (inter-item r .11–.30) to lift the interaction to significance (α after removal = .72); building an Argentina subscale from items 1 and 4 (α = .65). "These decisions may make perfect sense but they are clearly contingent on data."
- **ESP / Bem 2011 (§2.2):** nine experiments; erotic-picture result significant, nonerotic not — but nonerotic-significant, or erotic-significantly-*worse* (interference), or better-in-second-half (learning) or first-half (fatigue), or a sex difference, would each have been storyable; "There were no significant sex differences in the present experiment" (a fork not taken). Analogy to Bennett et al. 2009 dead-salmon fMRI.
- **Menstrual cycle & vote intention — Durante et al. 2013 (§2.3):** chose an *interaction* (single vs. married women, opposite directions) as central result; opposite pattern would also fit theory; classification of "single" vs. "In a Committed Relationship" flexible; many political outcomes (attitudes and vote intention), demographic splits (age, ethnicity, parenthood), choice of which cycle days = high fertility (7–14 vs. 17–25) — "a combinatorial explosion of possible data analyses."
- **Red/pink clothing — Beall & Tracy 2013 (§3):** combining red+pink (red-only or pink-only would also fit); peak-fertility window days 6–14 vs. alternatives (womenshealth.gov days 10–17; different from Durante's 7–14); inconsistent inclusion/exclusion (see §7 numbers); option to pool the two samples (adults + college students) or treat singly, or contrast them.

**(d) Why a data-contingent p-value is uninterpretable.** Because the reference set / null distribution is defined by averaging over the datasets that could have occurred *together with the analysis that would have been chosen for each* — and when the analysis is data-contingent that family is undeclared/undefined, so "the p-value argument disappears — one can no longer argue that, if nothing were going on, something as extreme as what was observed would occur less than 5% of the time" (§4.2). "Averaging over all paths is the fundamental principle underlying p-values and statistical significance" (§4.1).

**(e) Remedies.** (1) **Preregistration** — "defining the entire data-collection and data-analysis protocol ahead of time" (Humphreys/Sanchez/Windt 2013; Monogan 2013); acknowledged often infeasible. (2) **Pre-publication / two-part replication** — exploratory-but-theory-based first study paired with a purely confirmatory preregistered replication (Nosek, Spies, Motyl 2013 as the model; "perhaps researchers can perform half as many original experiments in each paper and just pair each new experiment with a preregistered replication"). (3) **Analyze all the data / all relevant comparisons** rather than one highlighted comparison — for observational fields where replication is hard; multilevel/hierarchical modeling to handle multiplicity (Gelman, Hill, Yajima 2012), with caveats. (4) **Sharpen the exploratory-vs-confirmatory distinction** (de Groot 1956; Tukey 1977, 1980). *Note:* the term "multiverse" is not used; "specification reporting" is present only implicitly as "analyze all relevant comparisons" and "recognize the actual open-ended aspect" of the decision-variable space φ. [summarizer-inferred that this prefigures multiverse/specification-curve methods; the paper does not name them.]

**(f) Distinguished from classic multiple-comparisons correction?** Yes, implicitly and importantly. Classic correction (Bonferroni-style) adjusts for the *tests you actually ran*; forking paths concerns *latent/potential* comparisons never run, so counting-and-correcting realized tests does not capture the inflation. The paper frames the fix not as a per-study α correction (it offers none, calling general methods future research) but as pre-specification, replication, or a full Bayesian/hierarchical analysis conditioning on all the data. The whole point of introducing procedure #3 vs. #4 is that standard multiplicity intuition (built around #4, "how many tests did you run") misses #3 entirely.

## Relevance to this project  `[design-inference — author-added, not from source]`
- **Pole:** cautionary-bad / origin. The source that names [[garden-of-forking-paths]] and gives the **latent-multiplicity** mechanism (procedure #3, *T(y; φ(y))*).
- **Grounds:** the leaf's one-line definition + the load-bearing "even with a *single* test, an *a-priori* hypothesis, and *no* fishing" claim. The **#3-vs-#4 taxonomy is the boundary vs p-hacking** the [[audit-method-validity]] referee needs; backs its `undeclared-forking-paths` row.
- **The portable detector (provenance, not test-count):** the one-scientific-to-many-statistical mapping — ask "were the comparison / subgroup / covariate / exclusion / coding choices fixed *before* seeing the data?" Not "how many tests did you run?" A clean single test with data-contingent specification still fails.
- **Boundary vs [[double-dipping]]:** forking-paths is the *residual* latent-multiplicity case (procedure #3, any data-contingent choice); double-dipping is a *specific structural* select-then-test circularity. Co-cite with [[simmons-2011]] (which coins "researcher degrees of freedom" and quantifies the inflation this paper leaves as future work).
- **Remedy the gate can demand:** pre-registration / declare the analysis family; exploratory-vs-confirmatory split + preregistered replication; report across forks (multiverse / specification-curve — flagged [summarizer-inferred] as prefiguration; the paper does not name them).
- **Carried-forward boundaries:** the *American Scientist* version was not read (redirect loop) — working paper is the fuller source; and this paper offers **no quantitative Type-I inflation figure** (deferred to future work) — that quantification is [[simmons-2011]]'s contribution.
