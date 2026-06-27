---
title: "Supervised Learning"
source: msmb
source_chapter: 12
source_url: https://www.huber.embl.de/msmb/12-chap.html
license: CC-BY-NC-SA-2.0
license_file: LICENSES/msmb.LICENSE
attribution: "Holmes S, Huber W. Modern Statistics for Modern Biology. Cambridge University Press; 2019. https://www.huber.embl.de/msmb/"
derived: own-words-summary
---

# Supervised Learning — MSMB Chapter 12 (summary)

_Own-words summary of an external source (see frontmatter for license/attribution). Not a substitute for the original chapter._

## 1. Scope

This chapter covers **supervised learning** (also called statistical learning): building a rule that predicts a chosen feature — the **response** or **objective** — from other features (**predictors**) by learning the rule from **training data** in which the response is known. The framework spans **classification** (categorical response) and **regression** (continuous response), and equips a reader to choose and tune a prediction method, measure its performance honestly, and — the chapter's central preoccupation — guard against **overfitting** so that the rule **generalizes** to new data rather than memorizing the training set. Emphasis is on the high-dimensional regime typical of genomics (many features $p$, few observations $n$), where controlling variance via regularization is the dominant concern.

## 2. Concepts & Methods

**Data layout.** Conceptually a dataframe: rows are objects, columns are features. One column is singled out as the response $Y$; the rest are predictors $X$. Two roles for observations: a **training (learning) set** $X_\ell, Y_\ell$ and a **test (validation) set** $X_v, Y_v$. The first question to ask is how $n$ (objects) compares to $p$ (predictors).

**Linear discriminant analysis (LDA).** A foundational classifier; many more elaborate methods are generalizations of it. It models each class as a Gaussian-like cloud with its own center (group mean) but a **single shared covariance matrix** common to all classes, then assigns a new point to the class whose membership probability is highest. Geometrically: equal-probability contours are ellipses of identical size and orientation for every class (only centers differ); boundaries between classes are linear. It also produces **linear discriminants** (LD1, LD2, …) — linear combinations of features that best separate the classes, usable as low-dimensional discriminating coordinates. LDA incorporates class **prior probabilities**: with empirical priors the boundary shifts toward the larger class; with a uniform prior the boundary sits more symmetrically between centers.

**Quadratic discriminant analysis (QDA).** Generalizes LDA by giving **each class its own covariance matrix**, yielding curved (quadratic) boundaries. More flexible but estimates far more parameters, so it needs more data per class and fails outright when any class is too small.

**Logistic regression (multinomial / binomial).** Models the posterior **log-odds** between classes as linear in the features: $\log\frac{P(Y=i\,|\,X=x)}{P(Y=k\,|\,X=x)} = \beta^0_i + \beta_i x$, with one class $k$ as reference ($i=1,\dots,k-1$). The $p$-vector $\beta_i$ sets how class-$i$-vs-$k$ odds depend on $x$; intercepts $\beta^0_i$ absorb prior probabilities. Fit by maximizing the log-likelihood $\ell(\beta,\beta^0;x)$. Presented as a more general, higher-dimension-friendly, regularization-amenable alternative to LDA, and as a member of the generalized-linear-model family.

**Penalization / regularization.** Replaces bare likelihood maximization with a penalized objective $\hat\beta = \arg\max_\beta\, \ell(\beta,\beta^0;x) + \lambda\,\operatorname{pen}(\beta)$, where $\lambda\ge 0$ tunes penalty strength and $\operatorname{pen}$ is convex. With $|\beta|^\nu=\sum_i\beta_i^\nu$ the $\ell_\nu$-norm: **ridge regression** uses $\operatorname{pen}(\beta)=|\beta|^2$ ($\ell_2$); **lasso** uses $\operatorname{pen}(\beta)=|\beta|^1$ ($\ell_1$); the **elastic net** blends them, $\operatorname{pen}(\beta)=(1-\alpha)|\beta|^1 + \alpha|\beta|^2$ with $\alpha\in[0,1]$. Lasso can drive coefficients exactly to zero (feature selection); ridge shrinks without zeroing. A practical solver (the **glmnet** package) fits the whole **regularization path** over all $\lambda$ at once. Penalization is the chapter's main tool for trading a little bias for a large reduction in variance.

**Objective (risk / cost / loss) functions.** Quantify prediction quality; choice depends on whether the response is categorical or continuous.
- **Misclassification rate (MCR):** population $\text{MCR}=\mathbb{E}\!\left[\mathbb{1}_{\hat y\neq y}\right]$; sample $\widehat{\text{MCR}}=\frac1n\sum_{i=1}^n \mathbb{1}_{\hat y_i\neq y_i}$ (fraction of wrong predictions).
- **Confusion table:** the full cross-tabulation of truth vs. prediction; supports per-class and weighted (asymmetric-cost) error accounting.
- **Sensitivity / specificity:** for binary problems, $\text{TPR}=\text{TP}/\text{P}$ (true positive rate, recall) and $\text{SPC}=\text{TN}/\text{N}$ (true negative rate); trading one against the other by moving a threshold traces **ROC** or **precision–recall** curves.
- **Jaccard index:** $J(A,B)=\frac{|A\cap B|}{|A\cup B|}$, with $A$ the true-positive set and $B$ the predicted-positive set; ignores jointly-negative cases, so it suits rare-event detection.
- **Log loss** (probabilistic predictions $\hat p_i$): $-\frac1n\sum_{i=1}^n y_i\log(\hat p_i)+(1-y_i)\log(1-\hat p_i)$, with $y_i\in\{0,1\}$.
- **Mean squared error (MSE)** for regression: $\widehat{\text{MSE}}=\frac1n\sum_{i=1}^n(\hat Y_i - Y_i)^2$.

**Variance-bias decomposition.** For squared-error loss, $\text{MSE}=\underbrace{\text{Var}(\hat Y)}_{\text{variance}} + \underbrace{\mathbb{E}[\hat Y - Y]^2}_{\text{bias}}$. Bias measures how far the average estimate sits from the truth; variance measures scatter of individual estimates about their average. Choices often push one down while raising the other.

**$k$-nearest-neighbor (kNN) / kernel idea.** Classify a new object by the classes of its nearest training objects under a distance/dissimilarity measure — no coordinate embedding required, only pairwise distances. Framed as the archetype of **kernel-based** methods, the complement to discriminant analysis's "classification by partition." (A nearest-neighbor classifier is used to probe whether features carry separating signal.)

**Unified interfaces.** Hundreds of learners exist (support vector machines, tree methods, boosting, random forests, neural nets, …). Wrapper frameworks (**caret**, **mlr**) standardize the recurring machinery — resampling, parameter tuning, performance assessment — across heterogeneous method APIs.

## 3. When It Applies

- **Supervised vs. unsupervised:** use supervised learning when a labeled response exists and the goal is prediction (or dissecting the rule for biological insight); the objective and success criteria are then well-defined, unlike clustering/ordination.
- **Classification vs. regression:** categorical response → classification; continuous response → regression. The distinction is not cosmetic — it dictates the loss function and hence the algorithm.
- **LDA:** appropriate when classes are roughly Gaussian with a **shared covariance** and linear boundaries suffice; a sound default and baseline.
- **QDA:** when class spreads/orientations genuinely differ (curved boundaries needed) **and** each class has enough observations to estimate its own covariance.
- **Logistic regression with elastic net:** the workhorse when $p$ is large (e.g. genomics with thousands of features), when feature selection is wanted (lasso/elastic net), or when LDA's distributional assumptions are unattractive.
- **Ridge vs. lasso:** lasso/elastic net when a sparse, interpretable subset of features is desired; ridge when many small correlated effects should be shrunk but retained.
- **kNN / kernel methods:** when a meaningful similarity between objects is easier to define than informative numerical features (e.g. text), so no coordinate representation is needed. (Kernel methods themselves are noted as beyond the chapter's scope.)
- **Choosing $p$ (number of features):** more features help only up to a point; past the point where added features are irrelevant, they hurt (Section 4/5).

## 4. Assumptions & Validity Conditions

- **Training response must be known and the prediction rule fixed before evaluation.** Performance must be judged on data not used to fit the rule.
- **Sufficient $n$ relative to $p$.** Much of supervised learning is coping with too few observations. LDA becomes degenerate when $p$ exceeds the number of replicates (features become linearly dependent / collinear, only fitted "with a warning"); QDA cannot be fit at all when a class is too small.
- **LDA:** assumes a common covariance across classes and (implicitly) approximately Gaussian, equal-spread class clouds; boundaries are constrained to be linear. Class priors are part of the model and change the boundary — choosing them is a modeling decision, not a detail.
- **QDA:** relaxes the equal-covariance assumption but demands enough data per class to estimate each covariance; without that it is unidentifiable (and has no built-in regularization to rescue it).
- **Logistic regression:** assumes log-odds linear in the predictors. As $p$ grows at fixed $n$, the likelihood surface near its maximum flattens, the MLE becomes highly variable, and eventually the maximum is a submanifold rather than a point — the unpenalized estimate is **unidentifiable**. Penalization restores a stable, identifiable estimate.
- **Penalized regression is scale-dependent.** Rescaling a feature changes its penalty contribution (unpenalized regression is scale-invariant); features should be sensibly scaled before penalization, and this must be remembered when interpreting fits.
- **Many implementations require complete data** (no missing values), though some methods tolerate missingness.
- **Reliable generalization estimates assume the evaluation procedure itself was fixed in advance** and not chosen after inspecting results.

## 5. Failure Modes & Invalidity Patterns

- **Overfitting / rote learning.** A model with enough free parameters can drive training error to ~0 by memorizing — even fitting **pure random labels** perfectly once $p$ approaches $n$ (LDA on random data reaches near-zero misclassification as $p\to n$). *Warning sign:* near-perfect training accuracy, especially with $p$ comparable to $n$. *Consequence:* the rule captures noise and fails on new data. *Avoid:* evaluate on held-out data; penalize/regularize.
- **Evaluating on the training data.** Training-set performance is **positively biased** (optimistic). *Consequence:* apparently excellent classifiers that don't generalize. *Correct:* cross-validation or a truly independent test set.
- **Curse of dimensionality.** Adding features past those that actually separate the classes raises misclassification again: with more features, the chance that some irrelevant feature *looks* discriminating in the training data (purely by chance) grows, misleading the classifier on test data. High-dimensional space cannot be sampled densely (covering a $p$-cube to spacing 0.1 needs $10^p$ points), a "local" neighborhood of a fixed number of points spans almost the whole feature range, almost all volume lies in the thin boundary shell (so prediction becomes extrapolation), and pairwise distances concentrate (coefficient of variation $\to 0$ — everyone is equidistant), eroding distance-based intuition.
- **Extrapolation beyond the data.** Predictions far from all class centers / training points are unreliable; the fitted model may not hold and no nearby training data support it. *Detect:* distance to nearest center as a crude confidence proxy (resampling/CV is more reliable).
- **Tuning on the same loop you report from.** Selecting $\lambda$ (or any tuning parameter) by cross-validated performance and then reporting that same performance **exaggerates** accuracy — you have optimized over choices. *Correct:* an **outer** cross-validation loop (nested CV) around the inner tuning loop, or a truly independent dataset.
- **Method hacking** (analogue of $p$-value hacking). Trying many preprocessing pipelines, algorithms, and tunings until the result looks good yields an over-optimistic, non-generalizing accuracy. *Mitigate:* formalize all choices inside an outer CV loop — but this only partly fixes it, since not every choice can be formalized. *Gold standard:* validation on genuinely unseen data.
- **`lambda.min` too small.** The $\lambda$ minimizing the estimated CV curve tends to under-penalize because it sits at the minimum of a noisy curve.
- **Mistaking exploratory performance for deployment readiness.** Accuracy measured where cases and controls are roughly balanced does not transfer to a screening setting where the condition is rare; high apparent accuracy can mask inadequate specificity. *Consequence:* an assay that looks diagnostic but isn't fit for real-world use.
- **"Too easy" data masking the need for regularization.** When classes are strongly separated on many features, even unpenalized full-feature models (and a 1-NN classifier) classify nearly perfectly, so CV shows no benefit from regularization — but limitations may only surface on truly new data, which CV cannot reveal.
- **Confident-but-wrong probabilistic predictions** make log loss infinite ($\hat p_i$ exactly 0 or 1 yet wrong).

## 6. Empirical Checks & Calibration

- **Cross-validation** is the central empirical tool for estimating out-of-sample performance and tuning complexity:
  - **Leave-one-out (LOOCV):** train on $n-1$, test on the held-out one, repeat for all and average. Maximizes training data per fold (good when $n$ is limiting) but training sets are nearly identical (may underrepresent realistic sampling variation) and is costly for large $n$.
  - **$k$-fold:** repeatedly train on ~$n(k-1)/k$, test on ~$n/k$. No universally best choice; trade-offs between the two.
  - A single train/test split is **needlessly variable** (sensitive to how the split falls) and **needlessly inefficient** (half the data trains a worse model); repeated splitting and averaging is better.
- **Simulate under known truth.** Generating data with **no real signal** (random features and random labels) exposes overfitting: training MCR collapses toward 0 as $p$ grows, while cross-validated test MCR hovers at the chance level (~0.5 for two balanced classes) regardless of $p$ — demonstrating that the apparent training success was illusory. Planting a **known** class separation in the first few features (with the rest noise) shows test error first falling then rising as irrelevant features are added, empirically locating the variance–bias sweet spot. Averaging such curves over many simulated datasets stabilizes the estimate.
- **Replication / averaging** over repeated simulated datasets turns a noisy single-run performance curve into a stable estimate (possible precisely because the data are simulated).
- **CV diagnostic plots** (performance, e.g. deviance or misclassification, vs. $\lambda$) reveal whether penalization helps: a U-shaped or clearly minimized curve indicates a useful regularization regime; a curve that simply worsens as $\lambda$ grows (best at $\lambda\to 0$) signals data where penalization brings no benefit. The textbook expectation is a clear optimum at intermediate $\lambda$.
- **`lambda.1se` heuristic.** Rather than `lambda.min`, choose the **largest** $\lambda$ whose CV performance is within **one standard error** of the best — a more conservative, more generalizable amount of penalization.
- **Cross-checking signal another way.** A histogram of per-feature $t$-test p-values (an enrichment of small p-values) or a nearest-neighbor classifier corroborates whether many features genuinely carry class-separating information, explaining why regularization may or may not help.
- **Exploratory data inspection** before modeling: visualize univariate/pairwise distributions, scan feature histograms (e.g. skewed, zero-inflated abundances), confirm feature identities — these catch issues a single fit would hide.
- **Outer/nested cross-validation** empirically de-biases the performance estimate when tuning and preprocessing choices were data-driven.

## 7. Interpretation, Guidance & Trade-offs

- **Training accuracy is not generalization.** Report cross-validated or independent-test performance; a number computed on the training data licenses no claim about future data.
- **Cross-validation tunes but is not a panacea.** It estimates generalization under the available data distribution; it cannot reveal failures that only appear on genuinely new data (e.g. the "too easy" case). Caveats always apply.
- **Generalization estimates after selection are optimistic.** Anything chosen by looking at performance (features, $\lambda$, algorithm, preprocessing) must be wrapped in an outer validation loop, and even then the only trustworthy guarantee is **truly unseen data**.
- **Bias for variance is usually a good trade.** Accepting a little bias (via shrinkage/penalization) to cut variance often lowers overall MSE; "reliably almost on target" beats "right on average but far off today," because in practice you get one shot. For **classification** the deal is even better: the discreteness of the response absorbs certain biases, so the cost of added bias can be near zero while variance still improves — there is generally no clean bias–variance MSE decomposition in the categorical case.
- **Asymmetric error costs matter.** When one error type is worse (medical screening), don't report a single threshold — characterize the sensitivity/specificity trade-off across thresholds (ROC / precision–recall), and recognize that good balanced-data accuracy can still mean inadequate specificity for a low-prevalence deployment.
- **Penalty choice and scaling.** Lasso/elastic net yields sparse, more interpretable models; ridge shrinks all coefficients. Because penalized fits are scale-dependent, feature scaling is a substantive choice — interpret coefficient magnitudes accordingly. Prefer the `lambda.1se` (more-penalized) choice over the bare CV minimum.
- **Prediction vs. understanding.** Machine learning emphasizes predicting the outcome; regression emphasizes the role and effect of covariates. They overlap heavily; choose framing by whether you want the prediction or also want to understand which features drive it and how. Interpretable (non-black-box) models that connect to domain knowledge are a plus.
- **Reproducibility as honesty.** Don't report only summary statistics (e.g. misclassification rate); lay open the full computational workflow — preprocessing, model selection, tuning — so robustness and the influence of each choice can be checked.

## 8. Connections & Key Terms

**Builds on:** generalized linear models and shrinkage estimation (logistic regression is a GLM; penalization extends shrinkage); multiple testing and p-value hacking (method hacking is the direct analogue); distance/similarity and clustering ideas (kNN, Jaccard index); feature extraction from complex data such as images. **Sets up:** the broader landscape of learners (SVMs, trees, random forests, boosting, neural nets) and unified tooling for tuning and evaluation; nested cross-validation and rigorous validation as the bridge to deployable, trustworthy prediction; the recurring high-dimensional theme of controlling variance.

**Key terms (own-words definitions):**
- **Supervised / statistical learning:** learning a rule to predict a known response from predictors using labeled training data.
- **Predictors / response (objective):** input features vs. the single feature being predicted.
- **Classification vs. regression:** prediction of a categorical vs. continuous response.
- **Overfitting:** fitting noise so that training accuracy is high but new-data accuracy is poor.
- **Generalizability:** how well a learned rule performs on unseen data.
- **LDA / QDA:** discriminant classifiers with linear (shared-covariance) vs. quadratic (per-class-covariance) boundaries.
- **Linear discriminants:** feature combinations that maximally separate classes.
- **Prior probabilities:** assumed class base rates that shift decision boundaries.
- **Logistic regression:** model of class log-odds linear in the predictors.
- **Regularization / penalization:** adding a penalty $\lambda\,\operatorname{pen}(\beta)$ to stabilize estimates and trade bias for variance.
- **Ridge ($\ell_2$) / lasso ($\ell_1$) / elastic net:** penalty types; lasso/elastic net induce sparsity.
- **$\lambda$:** penalty-strength tuning parameter; **regularization path:** the family of fits over all $\lambda$.
- **Variance–bias trade-off:** $\text{MSE}=\text{variance}+\text{bias}^2$; lowering one often raises the other.
- **Curse of dimensionality:** the degradation of sampling, distance, and prediction as feature dimension grows.
- **Loss / risk / cost / objective function:** a quantified measure of prediction error (MCR, MSE, log loss, Jaccard, …).
- **Confusion table; sensitivity (TPR/recall); specificity (TNR); ROC / precision–recall curves:** classification-performance summaries and threshold trade-off curves.
- **Cross-validation (LOOCV, $k$-fold; nested/outer):** resampling schemes to estimate out-of-sample performance and tune parameters honestly.
- **`lambda.min` / `lambda.1se`:** the CV-optimal $\lambda$ vs. the conservative within-one-standard-error choice.
- **Method hacking:** over-optimistic results from exploring many pipelines/algorithms/tunings on one dataset.
- **$k$-nearest neighbors / kernel methods:** distance-based classification needing only pairwise similarities, not a coordinate embedding.
