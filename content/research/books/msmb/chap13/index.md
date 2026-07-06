---
title: "Design of High-Throughput Experiments and their Analyses"
source: msmb
source_chapter: 13
source_url: https://www.huber.embl.de/msmb/13-chap.html
---

# Design of High-Throughput Experiments and their Analyses — MSMB Chapter 13 (summary)

_Own-words summary of an external source (see frontmatter for license/attribution). Not a substitute for the original chapter._

## 1. Scope

This chapter is a capstone on the design of high-throughput biological experiments and the analytical workflows around them. It equips a reader to decide, *before* data collection, how to structure an experiment so that the question of interest can actually be answered: classifying experiment types by how much control the researcher has, separating reducible from irreducible error, choosing replication and design tactics (blocking, pairing, randomization, balance) that protect against confounding and waste, sizing studies via power reasoning, stabilizing variance, and building reproducible, non-leaky computational pipelines. The emphasis is conceptual and prescriptive rather than algorithmic: matching a design and an analysis to the real sources of variability, and not throwing away information in the process.

## 2. Concepts & Methods

- **Taxonomy of experiment types (by degree of control).**
  - *Controlled experiment*: researcher controls system, environment, and readout; causal interpretation is most secure.
  - *Study* / *observational study*: important variables (study) or even the variable of interest (observational) are not controlled, usually for ethical/logistical reasons; many opportunities for confounding; "correlation is not causation" applies.
  - *Randomized controlled trial (RCT)*: nuisance factors remain uncontrolled, but the variable of interest (e.g., treatment assignment) is controlled and randomized, so with sufficient sample size nuisance effects average out and the effect can be causally attributed; usually *prospective* (outcome unknown at assignment; antonym *retrospective*).
  - *Meta-analysis*: an observational study over several prior studies, pooling to raise effective sample size and to average out study-level biases.

- **Error decomposition: noise vs. bias.** Statistical *error* is any deviation of a measured value from the truth — neutral, not "bad." It splits into *noise*, which averages out with replication, and *bias*, which persists and even becomes more apparent with more replication. Noise is easily seen in replicates; bias is hard even to detect and must be measured and adjusted for with a model.

- **Error models and ANOVA.** Variability can be apportioned by origin via sums of squares (the *ANOVA* idea), e.g. total $=$ within-group $+$ between-group, written $C_{\text{total}} = C_{\text{within}} + C_{\text{between}}$. The decomposition is not unique: an effect counted as within-group noise can become a between-group effect once finer subgroups are defined (better stratification converts noise into signal).

- **Determinism vs. chance / latent factors.** Whether to treat a process as deterministic (model it as bias) or stochastic (model it as noise) is a modeling choice, not an intrinsic property; probabilistic models quantify our ignorance. Known systematic causes (e.g. reagent batch) are *batch effects*; unrecorded ones are *latent factors*. In high-dimensional data, latent-factor noise tends to be *correlated*, which can mislead inference — but those same correlations let one estimate the latent factors from the data and remove them (named approach: *surrogate variable analysis* and related Bayesian factor methods).

- **Replicate hierarchy.** *Technical replicates* re-measure the same biological unit; *biological replicates* sample new units and so support generalization. The terms are coarse; better to name the explicit level of replication (lab, operator, machine, protocol variant, strain, individual, …).

- **Units vs. fold-changes.** Physical SI units are universally comparable; most biological readouts are not. Reporting as *fold changes / ratios* relative to a local reference makes the denominator a random variable, causing instability and unequal variances across experiments. Even seemingly absolute quantities (e.g. normalized expression units) carry experiment-specific sampling bias and often lack a stated precision.

- **Regular vs. catastrophic noise.** Regular noise is captured by simple models (normal, Poisson, gamma–Poisson, Laplace). Catastrophic events (sample swap, contamination, software bug, a whole plate going bad) are essentially unmodelable and correlated; the defense is QA, outlier detection, and documented removal.

- **Design principles.**
  - *Confounding*: two variables vary together so their effects cannot be separated (e.g. disease vs. batch); can also be indirect (a marker of a lifestyle or inflammation rather than the disease).
  - *Effect size and replication*: effect size is the difference between group centers (located by median or mean). More replicates sharpen estimates of group centers and effect size, raising *power*; they do **not** improve a per-sample classifier/diagnostic, which depends on within-group spread and prevalences.
  - *Clever combinations (orthogonal designs)*: Hotelling's weighing scheme measures combinations of items at once using an orthogonal design (Hadamard-matrix coefficients $\pm1$). Because the design matrix $C$ satisfies $C^{t}C = \lambda\,\mathbb{1}$, estimates are recovered by the transpose, and for eight items the squared estimation error is ~8× smaller than weighing one at a time — same number of measurements, more accuracy. This superseded the ancient one-factor-at-a-time rule: vary factors in combination with carefully designed contrasts.
  - *Blocking*: group experimental units so that only the treatment differs within a block, removing block-to-block nuisance variation from the comparison. *Pairing* is the simplest block (twins, before/after).
  - *Matched designs*: build comparable pairs by matching covariates (age, sex, health) when natural pairing is unavailable.
  - *Balanced design*: every factor-combination has equal replication, making each factor's effect identifiable; balance nuisance factors against factors of interest.
  - *Randomization*: when nuisance factors are unknown or unplannable, randomize so their effects average out at large $n$; also guards against unconscious handling bias. "Block what you can, randomize what you cannot."

- **Power and sample size.** Four interlocking quantities: sample size, effect size, significance level (false-positive rate $\alpha$), and power (true-positive rate). Standard *power calculations* exist for many tests (two proportions, $\chi^2$, $F$-tests / general linear tests, and one-/two-sample/paired $t$-tests via the `pwr` package); fixing any three yields the fourth. *Power simulations* (simulate data under an assumed effect and variances, repeat, count rejections at $\alpha$) generalize this to arbitrary designs and let you compare designs (e.g. paired vs. unpaired).

- **Effective sample size.** Independent observations carry more information than the same number of dependent ones; positively correlated samples (e.g. neighbors with shared opinions) inflate the variance of an estimate, so the *effective* sample size is below the nominal count.

- **Mean–variance relationships and variance-stabilizing transformations (VST).** The trend of variance $v$ with mean $m$ often follows a prototypic form: constant $v(m)=c$; Poisson-like $v(m)=am$ (variance $\propto$ mean); or quadratic $v(m)=bm^{2}$ (sd $\propto$ mean). Combinations occur, e.g. background-plus-multiplicative noise gives $v(m)=bm^{2}+c$ (multiplicative term dominates at large $m$, background at small $m$). A VST reshapes the measurement scale so variance is roughly constant across the range, decoupling replicate variance from the mean.

- **Quality assessment (QA) vs. quality control (QC).** QA = measuring/monitoring data quality; QC = removing bad data. *Quality* is best defined as *fitness for purpose* rather than adherence to specifications; a *quality metric* is any quantity used to gauge it, enabling automation.

- **Longitudinal/time-course data.** Few time points → treat time as a discrete factor (pick the most informative point; others as quasi-replicates/validation). Many points → fit dynamical models for state $X(t)$, choosing along axes of continuous/discrete state, deterministic/stochastic dynamics, smooth/jumpy paths, and direct vs. noisy/reduced observation $Y=g(X)+\varepsilon$. Named model families: Markov models, ODE/PDE systems, master / Fokker–Planck equations, piece-wise deterministic stochastic processes; with indirect observation of a Markov process, *Hidden Markov Models*. Data-driven alternatives: nonparametric smoothing then clustering of shapes, change-point detection, autoregressive models, Fourier/wavelet decomposition. A screening question ("any effect at any time?") can use an $F$-test with the time-point dependencies accounted for in the null.

- **Data integration.** Resisting "unbiased" generic analysis where prior knowledge helps: filter or down-weight low-power hypotheses, use the prior null fraction $\pi_0$ to guide interpretation, structure penalties by feature groups (group/graph lasso), fold measurement uncertainty and frequencies into clustering, and confirm findings against external resources (e.g. gene-set / signature databases).

- **Statistical sufficiency and leaky pipelines.** A *sufficient statistic* retains all information in the data relevant to a parameter (e.g. number of successes for a Bernoulli $p$ at known $n$; transition counts for a Markov chain). High-throughput pipelines act as funnels that summarize and compress at each stage, losing information; if a step discards something a later step needs, the pipeline becomes *leaky* and suboptimal. Iterative, information-borrowing approaches (EM-style: an initial per-sample pass, then a joint pass that re-examines what looked like noise) can recover lost signal.

- **Reproducible-research and computing practices.** Use an IDE; literate programming (R Markdown / Jupyter); version control; functions over copy-paste; package up recurring code; centralize read-only raw data and automate (versioned) derivation of intermediate data; anticipate re-engineering; reuse existing tools; maintain an indexed analysis log.

- **Data representation.** *Wide* format (e.g. one row per feature, samples in columns) vs. *long*/*tidy* format (one row per observation, value column plus covariate columns). *Tidy data*: each variable a column, each observation a row, each unit type its own table — robust to adding rows/columns and uniform to subset. Trade-offs against tidiness: storage redundancy and integrity risk from repeated values, lack of type contracts/validation, no natural home for provenance/metadata, and awkwardness for matrix operations — addressed by object-oriented containers (e.g. R/S4 classes, Bioconductor's *SummarizedExperiment*).

- **Efficient computing.** Beware *premature optimization*; find the right method on a subset first, and weigh human time against CPU time. Performance levers: *vectorization*, *parallelization*, *out-of-memory chunking* and disk-backed stores (relational DB, HDF5), and *judicious lower-level code* (C/C++ via Rcpp) only for time-critical parts.

## 3. When It Applies

- **Choosing an experiment type:** controlled experiment when you can fix all relevant variables and want clean causal readout; RCT when the system can't be fully controlled but you can randomize the intervention and need a causal conclusion; observational study when even the variable of interest can't be assigned (accept that causation is not licensed); meta-analysis when individual studies are underpowered or possibly biased and can be pooled.
- **Treat a factor as bias vs. noise:** model it as bias (deterministically) when you can identify and quantify it (known batch, sequence-content effect) and it matters; treat it as noise when it's sample-specific, small, or expected to cancel in the contrast of interest (e.g. a per-gene effect identical across samples cancels in differential analysis).
- **Replication choice:** when the precision-limiting variability is biological/between-unit, spend replicates on new biological units, not on re-measuring one unit with a precise instrument; conversely, a single well-controlled experimental unit may need only 1–3 replicates.
- **Low-coverage-many-samples vs. high-coverage-few-samples:** for population-level questions (e.g. detecting common variants) spread effort across many units at low depth; for high-confidence per-unit calls, concentrate depth.
- **Blocking vs. randomization:** block known, recordable nuisance structure; randomize the unknown or unplannable. Pairing is the right special case when a natural pairing exists; matching substitutes for it when it doesn't.
- **Paired vs. unpaired test:** pairing helps most when between-block variability is large relative to within-block noise; if block effects are negligible, pairing gives little and costs degrees of freedom.
- **VST applicability:** apply when replicate variance depends strongly on the mean and downstream methods assume homoskedastic, identically distributed noise, or when visualization/ordination is dominated by a few high-signal features.
- **Time-as-factor vs. dynamical modeling:** few sparse time points → discrete factor; dense series → dynamical or signal-processing models.

## 4. Assumptions & Validity Conditions

- **Causal attribution in an RCT** rests on randomized assignment *and* a sample large enough for nuisance effects to average out; without randomization, causal claims are unsupported.
- **"Bias cancels in the contrast"** assumes the systematic effect acts identically across the samples being compared (e.g. a gene-specific GC effect equal across libraries); to the extent it is sample-specific, it does not cancel and re-enters as noise.
- **Noise-averaging-out** assumes the deviations are genuine noise (independent, mean-zero in the relevant sense); a persistent bias will not average out no matter how many replicates.
- **Generalization** requires that replicates actually vary over the level you wish to generalize to — inference extends only to the population represented by a representative, randomized sample.
- **Effect-size estimation precision** improves with replication; per-sample classification performance does not, as it is governed by within-group distributions and prevalences.
- **Balanced design** is what makes each factor's effect cleanly identifiable; imbalance (especially nuisance factors not balanced against factors of interest) leaves the analyst "on thin ice."
- **Independence / exchangeability**: correlated observations violate the independence that nominal sample sizes assume, shrinking the effective sample size; multiple-testing procedures that treat tests as exchangeable assume that exchangeability.
- **Power-calculation inputs** (assumed effect size, variances/standard deviations) must be supplied and are often uncertain — especially effect size in omics screens.
- **Sufficiency**: a summary step is safe only if the retained statistic is sufficient for the downstream task; "normalized" summaries may be insufficient for analyses that need the raw counts.
- **The Hadamard/orthogonal weighing design** requires the orthogonality $C^{t}C=\lambda\mathbb{1}$ and additive, equal-variance measurement errors for its efficiency gain to hold.
- **Tidy/long format** carries no built-in guarantee that columns contain valid, consistent values — there is no contract unless an OO class enforces one.

## 5. Failure Modes & Invalidity Patterns

- **Confounding.** Warning sign: the factor of interest is perfectly aligned with a nuisance factor (e.g. all disease samples in batch 1). Consequence: the effect is unattributable — impossible to tell disease from batch. Detection/avoidance: design so factors are not aligned (balance, randomize, block); if already confounded in collected data, no analysis can rescue it.
- **Mistaking bias for noise.** Bias is invisible in replicate scatter and *grows* more apparent with replication rather than shrinking; relying on replication to "average it away" leaves the estimate centered in the wrong place.
- **Correlated latent-factor noise.** In high-dimensional data, unmodeled latent factors induce correlated noise that produces faulty inference (false structure or inflated significance); detectable/correctable by estimating the latent factors from the correlations themselves.
- **Wasted replicates / wrong replicate level.** Many replicates on a single unit (technical replication of something already precise) cannot answer a generalization question; the design looks well-powered (large $n$) but addresses the wrong variance component.
- **Fold-change / ratio instability.** A random denominator yields high, unequal variances across experiments and non-universal "units," breaking cross-experiment comparability and obscuring precision.
- **Catastrophic outliers.** Sample swaps, contamination, plate failures violate the noise model and can hit many measurements at once; not fixable by modeling — only QA/QC and documented removal.
- **Underpowered "me-too" studies.** Too few replicates given the uncontrolled variability and effect size → low power; effect undetectable even if real. The hidden culprit is usually an unknown/optimistic effect size.
- **Per-sample diagnostic over-claim.** Concluding a biomarker is a good classifier because group centers differ; separation of individuals depends on within-group overlap and prevalences, which replication does not improve.
- **Leaky pipeline / insufficient summaries.** Compressing data at an early stage (e.g. keeping only normalized values, or gene-level when isoform-level is needed) discards information the downstream step requires, silently reducing power; risk is amplified when pipeline components come from independent developers with mismatched assumptions.
- **One-factor-at-a-time dogma.** Insisting on varying a single factor forgoes the efficiency available from cleverly contrasted combined designs.
- **Misplaced "objectivity."** Treating all features/hypotheses as exchangeable when you actually have informative prior knowledge (power, $\pi_0$, feature groups) wastes detection power; rigid adherence to a fixed $\alpha=0.05$ regardless of context is a related failure.
- **Untidy data hazards.** In wide format, code must implicitly "know" which columns are data vs. covariates; adding columns can silently invalidate existing code.
- **Tidy-format hazards.** Redundant repeated values can drift out of sync (integrity loss), and there is no contract guaranteeing column validity.
- **Premature optimization.** Building scalable infrastructure before the method is right risks a "fast and scalable solution to the wrong problem."
- **Unconscious handling bias.** Treating hard-to-obtain samples more carefully than others biases the comparison; randomization mitigates it.
- **Side/position confounding (a blocking pitfall).** Systematically placing one treatment on one side of a block can confound a position effect with the treatment effect; randomize position within blocks.

## 6. Empirical Checks & Calibration

- **Simulate under a known data-generating truth.** The chapter's core empirical tool: generate data from an assumed model (known effect, known variances), apply the candidate procedure many times, and inspect the result. Used to (a) compare designs — e.g. simulate paired vs. unpaired data and count rejections at $\alpha$ to estimate power for each; (b) verify a design's efficiency — repeat the Hotelling weighing many times and compare the sampling distributions of summed squared error between schemes; (c) demonstrate effective-sample-size loss — simulate independent vs. spatially correlated sampling and compare the spread of the resulting estimates around the known truth.
- **Power simulation / subsampling / bootstrapping.** When an analytical power formula isn't available or assumptions are uncertain, estimate power by simulation, or by subsampling/bootstrapping comparable existing data; pass: power reaches the target (e.g. 80%) at the planned $n$; fail: it does not.
- **Sensitivity analysis over design parameters.** Sweep effect size, sample size, and the relevant standard deviations to see which drives the result (e.g. find which variance component most controls the benefit of pairing, or what $n$ achieves 80% power) — a check on robustness and on where to invest effort.
- **Pass/fail of a design comparison.** Two designs with the *same* number of measurements can be compared purely on the variance/error of their estimates under simulation; the lower-variance design is preferred (the orthogonal scheme's ~8× smaller error is established this way, not assumed).
- **QA diagnostics.** Examine marginal distributions (histograms, ECDFs), joint distributions (scatter/pairs plots), replicate agreement vs. between-condition differences, and plausibility of effect magnitudes; use heatmaps and ordination plots (PCA and related) to reveal batch effects (categorical/stepwise or continuous/gradual) and to flag misbehaving samples (swaps, degradation) or poorly measured features. Pass: replicates agree more than conditions, no unexpected clustering by batch; fail: samples cluster by batch or replicates disagree as much as conditions.
- **Calibration target.** Validity is demonstrated empirically (does the procedure recover the known truth, does power meet target, is the null distribution correctly accounting for dependencies) rather than asserted from a method's name.

## 7. Interpretation, Guidance & Trade-offs

- **Design with the analysis in mind, up front.** Deciding how to analyze only after data are collected often reduces the statistician to diagnosing what the experiment "died of." Start analysis on the first data ("dailies") to catch problems early, and start writing up while analyzing to discover what support the conclusions actually need.
- **Replication is about variance components, not just count.** Put replicates where the limiting variability lives and at the level you want to generalize to; name that level explicitly rather than relying on the coarse technical/biological dichotomy.
- **What replication does and does not buy.** It sharpens group-center and effect-size estimates and raises power to detect a difference; it does *not* improve a per-individual classifier, whose performance is set by within-group spread and prevalences.
- **Power has four levers.** Trade among sample size, effect size, $\alpha$, and power; in omics, exact effect sizes are usually unknown ("the elephant in the room"), so use power calculations for order-of-magnitude sizing and qualitative design comparisons, not false precision.
- **Prefer designs that exploit structure.** Blocking/pairing and orthogonal contrasts can deliver more information for the same cost; "block what you can, randomize what you cannot," and keep designs balanced so effects stay identifiable.
- **Report and hold fixed what makes results trustworthy.** Be explicit about the level of replication, the variances assumed in power reasoning, the reference used for any ratio, and which steps were fixed before looking at the data. Be wary of fold changes/ratios and of pseudo-absolute units lacking stated precision.
- **Use prior knowledge honestly.** Down-weight or filter low-power hypotheses, let test power and the prior null fraction $\pi_0$ inform interpretation rather than a rigid $5\%$ cutoff, and integrate external datasets/annotations for confirmation and context — "unbiased" genericity is often just wasteful.
- **Variance-stabilize when appropriate.** Transforming to (roughly) constant variance improves visualization, ordination/clustering (so a few high-signal features don't dominate), and inference from methods assuming homoskedastic noise.
- **Quality = fitness for purpose.** Judge data by whether it can answer your question, not by spec compliance; encode quality metrics to automate QA/QC, and remove catastrophic data with documentation.
- **Guard sufficiency across the pipeline.** Keep enough information at each summarization step for the downstream task (raw counts where needed, finer-resolution summaries where required); prefer iterative, strength-borrowing methods to one-pass funnels when feasible.
- **Computing trade-offs.** Get the method right on a subset before scaling; weigh your time against CPU time; reach for vectorization, parallelism, chunking/disk-backed storage, and targeted C/C++ only where they pay off; favor reproducible, version-controlled, packaged workflows and OO containers when contracts, provenance, and matrix operations matter, accepting their upfront infrastructure cost.
- **Representation trade-off.** Tidy/long format is robust and uniform for plotting/subsetting but costs redundancy and lacks contracts/metadata homes; assemble long tables late from more normalized, validated containers rather than using them as primary storage.

## 8. Connections & Key Terms

**Builds on:** generative/probability models (normal, Poisson, gamma–Poisson, Laplace) for noise; mixture models for unmodeled heterogeneity; hypothesis testing and multiple testing (power, $\alpha$, $\pi_0$); generalized linear models with blocking factors; ordination (PCA/SVD) and clustering for QA; the EM algorithm as the template for iterative information-borrowing; sums-of-squares decomposition (ANOVA, LDA). **Sets up:** principled experimental design, batch-effect and latent-factor correction, power planning, variance stabilization, reproducible computational workflows, and dynamical/time-series and data-integration analyses — as a synthesis to carry into one's own studies.

**Key terms.**
- *Controlled experiment / study / observational study / RCT / meta-analysis* — experiment types ordered by decreasing researcher control and resulting strength of causal interpretation.
- *Prospective / retrospective* — outcome unknown vs. known at the time of assignment.
- *Error* — any deviation of a measurement from the truth (neutral term).
- *Noise* — error that averages out with replication.
- *Bias* — error that persists under replication and must be modeled out.
- *Batch effect* — a known, recorded systematic factor (e.g. reagent batch).
- *Latent factor* — an unrecorded systematic factor; its noise is often correlated in high dimensions.
- *Technical vs. biological replicate* — re-measuring the same unit vs. sampling new units (the latter enabling generalization).
- *Confounding* — two factors varying together so their effects cannot be separated.
- *Effect size* — the difference between group centers (median or mean).
- *Power* — probability of correctly rejecting the null (true-positive rate); depends on sample size, effect size, $\alpha$, and variability.
- *Effective sample size* — the information-equivalent count after accounting for dependence among observations.
- *Blocking* — grouping units so only the treatment varies within a block, removing nuisance variation.
- *Pairing / matched design* — the simplest block via natural pairs, or constructed comparable pairs.
- *Balanced design* — equal replication across factor combinations, keeping effects identifiable.
- *Randomization* — random assignment so unknown nuisance effects average out and handling bias is reduced.
- *Mean–variance relationship* — how variance trends with the mean ($v(m)$: constant, $\propto m$, $\propto m^{2}$, or combinations).
- *Variance-stabilizing transformation (VST)* — a re-scaling making variance roughly constant across the mean range.
- *Quality / fitness for purpose* — usefulness for the intended task, vs. spec compliance; a *quality metric* quantifies it.
- *QA vs. QC* — measuring/monitoring quality vs. removing bad data.
- *Longitudinal data* — data with time as a covariate (distinct from survival data, where time is the outcome).
- *Hidden Markov Model* — framework for a Markov process observed only through a noisy/reduced signal.
- *Sufficient statistic* — a summary retaining all information about a parameter (e.g. success count for Bernoulli $p$; transition counts for a Markov chain).
- *Leaky pipeline* — a workflow that discards information a later stage needs.
- *Tidy / wide / long format* — data layouts; tidy = one variable per column, one observation per row, one unit type per table.
- *Premature optimization* — scaling/optimizing before the method is known to be correct.
