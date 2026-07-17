---
type: book
title: "Multivariate Analysis"
source: msmb
source_chapter: 7
source_url: https://www.huber.embl.de/msmb/07-chap.html
tags:
  - domain/dimensionality-reduction
---

# Multivariate Analysis — MSMB Chapter 7 (summary)

_Own-words summary of an external source (see frontmatter for license/attribution). Not a substitute for the original chapter._

## 1. Scope

This chapter equips a reader to analyze a numeric data matrix — many variables measured on a common set of observational units (rows) — when the variables are correlated rather than independent, so that studying each column separately would miss the joint structure. It centers on **Principal Component Analysis (PCA)**, an unsupervised dimension-reduction method that replaces the original measured variables with a smaller number of new variables (principal components) that are linear combinations of the originals and capture most of the variability. The underlying linear-algebra engine, the **Singular Value Decomposition (SVD)**, is developed as the means of finding these components and of approximating a matrix by one of lower rank. The aim is exploratory: producing interpretable maps of both the observations and the variables, not testing hypotheses or predicting a designated outcome.

## 2. Concepts & Methods

- **Data matrix.** Observations in rows, variables in columns (the chapter notes the common transposed convention in some genomics matrices, e.g. RNA-Seq reporting genes in rows and samples in columns — a frequent source of error). When columns are mutually unrelated, univariate analysis of each column suffices; multivariate analysis earns its keep only when variables co-vary.

- **One- and two-dimensional summaries.** A single-number summary (mean, median) of one variable is already a trivial dimension reduction. For two variables $x$ and $y$, the **correlation coefficient** summarizes how they co-vary: $\hat{\rho}=\dfrac{\sum_{i=1}^n (x_i-\bar{x})(y_i-\bar{y})}{\sqrt{\sum_{i=1}^n (x_i-\bar{x})^2}\sqrt{\sum_{j=1}^n (y_j-\bar{y})^2}}$, where $\bar{x},\bar{y}$ are the means. Applied across a matrix it yields the symmetric correlation matrix (diagonal $=1$). The chapter frames $\hat\rho$ as the vector product of the centered-and-scaled variables — the conceptual link to PCA's preprocessing.

- **Centering and scaling (standardizing).** Centering subtracts each column's mean (placing the cloud's center of gravity at the origin); scaling divides by the standard deviation so each variable has standard deviation $1$. Needed because variables measured in different units/scales are not directly comparable. Distinct from **variance-stabilizing transforms** (log, asinh): those equalize variance across the dynamic range of one variable; standardizing equalizes scale across different variables.

- **Projection as summarization.** Reducing a 2D cloud to a 1D line loses information; the goal is to lose as little as possible. The chapter contrasts three lines through a scatterplot:
  - Two **regression lines** (each minimizing squared residuals in one direction only — a *supervised* idea, asymmetric in the two variables; the fitted line depends on which variable is treated as response).
  - The **principal component line**, which minimizes the sum of squared **orthogonal (perpendicular) projections** of points onto the line, treating both variables symmetrically.

- **Inertia decomposition (the key identity).** Via Pythagoras: the **total variance** (a.k.a. **inertia**) of a centered cloud — the sum of squared distances of points from the origin — splits into (variance along the line) + (sum of squared orthogonal distances to the line). For fixed total, minimizing the orthogonal distances is the *same* as maximizing the variance along the line. Hence the **first principal component** is equivalently the line of maximum projected variance and the line of minimum orthogonal residual.

- **Principal components as linear combinations.** A PC is a new variable $Z = \sum_j v_{j} X_{\cdot j}$ formed by weighting the original columns; the weights $v_j$ are the **loadings** (the chapter's "recipe / juice mix" analogy). The transformation gives a new coordinate system. The first PC has the largest possible variance; each later component has the largest variance possible subject to being **orthogonal** to all earlier ones: $\max_{aX \perp bX}\operatorname{var}(\operatorname{Proj}_{aX}(X))$ with $bX$ the previous components.

- **Rank-one matrices and the generative view.** A matrix is **rank 1** if it equals an outer product $X = u\,v^{t}$ of one column vector and one row vector — every entry $x_{ij}=u_i v_j$. This is far more economical (storing $n+p$ numbers instead of $np$). Such a decomposition is not unique; uniqueness is imposed by requiring each vector to have **norm 1** (sum of squared elements $=1$), with the overall scale absorbed into a separate multiplier, the **singular value** $s_1$.

- **Singular Value Decomposition (SVD).** A general matrix decomposes as $\mathbf{X} = U S V^{t}$ with $V^{t}V=\mathbb{I}$, $U^{t}U=\mathbb{I}$, where $S$ is diagonal holding the singular values, and the columns of $U$ and $V$ (the **singular vectors**) are **orthonormal** (norm 1 and mutually orthogonal; the chapter stresses "orthonormal" has nothing to do with the normal distribution). Equivalently, $X$ is a sum of rank-one pieces $X_{ij}=\sum_{k} u_{ik}s_k v_{kj}$, ordered so $s_1\ge s_2\ge\cdots$. The number of nonzero singular values is the **rank**; small trailing singular values mean the matrix is well-approximated by a lower rank.

- **From SVD to PCA.** The columns of $V$ are the PC loadings; the **scores** (coordinates of observations on the new axes) are the columns of $C = US$ (equivalently $XV$, since $XV=USV^{t}V=US$). Each component's variance is the corresponding **eigenvalue** $\lambda_k = s_k^2$. The connection to the **eigendecomposition**: $X^{t}X = V S^{2} V^{t} = V\Lambda V^{t}$, so $V$ holds the eigenvectors of the symmetric matrix $X^{t}X$ and $\Lambda$ its eigenvalues. PCA is thus the eigendecomposition of the cross-product (covariance or correlation) matrix.

- **Number of components $k$.** $k$ is the **rank of the approximation**, always $k \le \min(n,p)$. Chosen by inspecting the **screeplot** (the ordered eigenvalues/variances) for a drop-off.

- **Maps and biplots.** PCA yields a map of observations (scores) and a map of variables. The **biplot** overlays both: observations as points, variables as arrows showing how the old axes project onto the new plane. The **correlation circle** displays variables as vectors whose pairwise angles approximate their correlations and whose lengths indicate how well each is captured in the first principal plane.

- **Weighted PCA.** Observations (or variables) can carry weights — e.g. reweighting samples by the inverse of their group size so unequally sized groups contribute comparably.

- **Relationships to neighbors.** PCA is *linear* and *unsupervised* (treats all variables on equal footing, predicts nothing), contrasting with supervised regression. It is the foundational case for the non-linear and heterogeneous-data methods deferred to later chapters, and admits **sparse PCA** extensions that penalize the number of nonzero loadings for better interpretability/stability.

## 3. When It Applies

- **Use multivariate/PCA when columns are correlated.** If variables are genuinely independent, analyze them one at a time; the matrix view adds nothing. PCA pays off precisely when many variables move together (positively or anti-correlated).
- **As an exploratory first pass on high-dimensional numeric matrices** — to find a small set of dominant directions of variation, to map samples and variables together, and to reveal grouping/structure before any modeling.
- **Numeric variables.** The chapter restricts to numeric matrices; multivariate *categorical* data and non-linear structure are explicitly deferred elsewhere.
- **Scale on common units when units are arbitrary or incommensurable** (work from the correlation matrix). **Leave variables unscaled** (work from the covariance matrix) when their original scales are genuinely meaningful and reflect true differences in importance — a deliberate choice in the workflow, not a default.
- **Regression vs. PCA line.** Choose regression when one variable is a designated response to be predicted/explained (asymmetric, supervised); choose the PC line when all variables have equal status and you want a symmetric summary direction.

## 4. Assumptions & Validity Conditions

- **Linearity.** PCA seeks only *linear* relationships and builds *linear* combinations; structure that is essentially non-linear will not be captured.
- **Centering is required** for the inertia interpretation: total variance equals the summed squared distances to the origin only when the origin is the cloud's center of gravity.
- **Scaling choice is consequential.** The fitted directions depend on the units; standardizing makes variables comparable but is a modeling decision (covariance vs. correlation matrix) that changes the result.
- **Orthonormality of singular vectors** ($U^{t}U=\mathbb{I}$, $V^{t}V=\mathbb{I}$) is the constraint that makes the decomposition unique (norm-1 plus mutual orthogonality).
- **Variance ordering** $s_1^2 \ge s_2^2 \ge \cdots$ holds by construction; components are interpretable individually only when their eigenvalues are well separated (see §5).
- **Independence of components requires normality.** Centered orthogonal components are always uncorrelated; they are **independent only when the data are (multivariate) normally distributed**. The chapter flags this as a genuine distinction, not an automatic property.
- **Distributional inference is *not* assumed here.** This chapter treats PCA descriptively/geometrically; it imposes no distributional model and offers no test for the number of components. (It notes such parametric inference exists in the classical literature under a multivariate-normal assumption, but does not develop or rely on it.)

## 5. Failure Modes & Invalidity Patterns

- **Close eigenvalues → unstable, uninterpretable components.** When two or more successive PCs have nearly equal variances, only the *subspace* they jointly span is well-defined; the individual axes are not. A tiny change in one observation can rotate them into an entirely different set of vectors with different loadings. *Warning sign:* a screeplot with adjacent, similar eigenvalues (no clear drop). *Consequence:* loadings of those individual PCs are meaningless and must not be interpreted one by one. *Avoidance:* never split axes within a group of similar eigenvalues; interpret the whole subspace together, possibly via interactive 3D/4D views.
- **Skipping the screeplot / preset variance cutoffs.** You cannot decide $k$ before seeing the eigenvalues. A hard rule like "keep 80% of variance" can slice through a cluster of similar eigenvalues and yield the unstable PCs above.
- **Forgetting to preprocess.** Failing to center breaks the inertia interpretation; failing to scale lets a variable with a large arbitrary unit (e.g. an order-of-magnitude larger standard deviation) dominate the components for non-substantive reasons.
- **Transpose/orientation confusion.** Differing row/column conventions across data types (samples-as-rows vs. genes-as-rows) silently produce wrong analyses; the chapter recommends explicit, self-describing data containers to fix conventions.
- **Sign and direction artifacts.** Singular-vector signs are arbitrary; the chapter shows that variables can appear anti-correlated merely because of measurement direction (e.g. lower time = better performance). Mechanically reading the correlation circle without accounting for variable direction can invert the substantive interpretation; flipping signs to put "good" outcomes in a common direction realigns the map. (Sign flips change loading signs but not the eigenvalues/screeplot.)
- **Misreading plot aspect ratio.** Because the first PC always has the larger variance ($\lambda_1=s_1^2 > \lambda_2=s_2^2$), the cloud is genuinely wider along PC1 than PC2. Forcing a square plot exaggerates the second axis and distorts apparent distances between points; a PC1-horizontal plot can never legitimately be taller than wide.
- **Confounding uncorrelated with independent.** Treating uncorrelated components as independent is unwarranted unless the data are normal.
- **Over-reading exact projections.** Arrow lengths in the correlation circle reflect *quality of projection* onto the first plane; a short arrow means the variable is poorly represented there, so its apparent relationships in that plane are unreliable.

## 6. Empirical Checks & Calibration

- **Always inspect simple summaries first.** Before any multivariate step, look at one-dimensional summaries/histograms and the full pairwise correlation matrix and pairwise scatterplots (and a correlation heatmap). These reveal the rough "true dimension" and natural groupings of variables and guard the later interpretation.
- **The screeplot as the central diagnostic.** Plot the ordered eigenvalues (= variances of the PCs). A clear elbow/drop indicates how many components carry signal; a flat run of similar eigenvalues warns of instability (§5). This is the empirical check on $k$, replacing any formula.
- **Rank check via singular values.** Compute the SVD and read off how many singular values are nonzero (above numerical tolerance): trailing values at machine-epsilon mean those dimensions carry no information, confirming the effective rank. The chapter demonstrates this on constructed rank-1 and rank-2 matrices where the surplus singular values come out $\approx 0$.
- **Successive rank-one approximation.** Adding singular-vector pairs one at a time and watching the approximation stop improving (the next $s_k$ negligible) empirically reveals the rank — useful because low-dimensional structure is hard to see by eye even in as few as four dimensions.
- **Cross-checking implementations.** Different PCA routines use different scalings/conventions/denominators (e.g. $1/(n-1)$ vs. $1/n$ in the variance, giving a factor like $n/(n-1)$); running more than one and reconciling their outputs (against the raw SVD) is recommended to avoid being misled by naming/scaling differences.
- **Annotate axes with variance explained**, and report the proportion of variance each retained PC captures, so readers can judge how much structure the map represents.
- **Project external metadata as a sanity check.** Overlaying known group labels or a held-out outcome onto the PCA map checks whether the dominant variation corresponds to meaningful structure (e.g. a strong correlation between PC1 and an external composite score, or known group separation) — and can expose data problems such as a mislabeled sample appearing in the wrong cluster.

## 7. Interpretation, Guidance & Trade-offs

- **What PCA licenses you to claim.** It is *exploratory and descriptive*: it produces maps and candidate dominant directions, not significance, prediction, or causal explanation. Components are summaries of correlation structure, not tested effects.
- **Reading the variable map (correlation circle).** Angles between variable vectors approximate their correlations (small angle = strongly correlated, right angle ≈ uncorrelated, opposite = anti-correlated). Arrow length signals how faithfully a variable is represented in the shown plane — interpret long arrows confidently, short ones cautiously.
- **Reading the observation map and biplot.** Observation coordinates are the scores $US$; the biplot lets you relate a sample's position to the variable arrows (a point lying toward a variable's arrow tends to have a high value of that variable). Mind the aspect ratio — distances along PC1 and PC2 are not on the same footing, and elongated plots are the norm.
- **Recommended workflow.** Compute means/variances and one-/two-dimensional summaries → decide covariance vs. correlation (i.e. whether to scale) → center and (usually) scale → SVD/eigendecomposition → screeplot → choose $k$ from the elbow, never inside a cluster of equal eigenvalues → project and build the maps → annotate with variance explained → enrich interpretation with sample/variable metadata.
- **Trade-offs.**
  - *Scale vs. don't scale:* scaling makes incommensurable variables comparable; not scaling preserves genuine differences in importance. Choose by whether the original units are meaningful.
  - *Few vs. many components:* fewer components = simpler, more stable map but more discarded variation; the screeplot mediates this.
  - *Stability vs. resolution:* separating closely spaced PCs gains apparent resolution but loses stability — prefer the joint subspace.
  - *Interpretability:* dense loadings spread weight over all variables; sparse-PCA penalties yield fewer nonzero loadings that are easier to read and more stable.
- **What to report for trustworthiness:** the preprocessing choices (centering, scaling, covariance vs. correlation), the screeplot, the chosen $k$ and its justification, and the variance explained per retained axis — plus any sign conventions applied to variables.

## 8. Connections & Key Terms

**Builds on:** univariate and bivariate summaries (mean, standard deviation, correlation), scatterplots and histograms, variance-stabilizing transforms, and basic linear algebra (vectors, matrix products, projection, Pythagoras). **Sets up:** lower-rank matrix approximation as a general tool; eigen/SVD machinery reused by non-linear and heterogeneous-data multivariate methods, by supervised multivariate analysis, and by penalized/sparse extensions; and the idea of equipping data with explicit, convention-fixing containers for metadata.

**Key terms (own-words definitions):**
- **Multivariate analysis** — study of several variables measured on the same units, exploiting their joint structure rather than analyzing columns separately.
- **Dimension reduction** — replacing many correlated variables with fewer new ones that retain most of the variation.
- **Centering / scaling (standardizing)** — subtracting the mean / dividing by the standard deviation, per variable.
- **Inertia (total variance)** — summed squared distances of centered points from the origin; the quantity PCA decomposes.
- **Principal component (PC)** — a new variable that is a linear combination of the originals, chosen for maximal variance subject to orthogonality with earlier PCs.
- **Loadings** — the coefficients ($v_j$) defining a PC in terms of the original variables.
- **Scores** — coordinates of the observations on the principal axes ($US$, equivalently $XV$).
- **Rank** — the number of independent rank-one pieces (nonzero singular values) needed to reconstruct a matrix.
- **Singular Value Decomposition (SVD)** — factorization $X=USV^{t}$ with orthonormal $U,V$ and diagonal singular values $S$; the engine of PCA.
- **Singular value / eigenvalue** — $s_k$ / $\lambda_k=s_k^2$; the latter equals the variance carried by the $k$-th PC.
- **Singular vectors / eigenvectors** — orthonormal direction vectors ($U$, $V$) defining the new coordinate systems for observations and variables.
- **Orthonormal** — vectors of norm 1 that are mutually orthogonal (unrelated to the normal distribution).
- **Screeplot** — plot of ordered eigenvalues used to choose how many components to keep.
- **Biplot** — joint plot of observation points and variable arrows on the principal plane.
- **Correlation circle** — variable-space plot where vector angles approximate correlations and lengths show projection quality.
- **Unsupervised** — analysis that treats all variables equally, predicting or explaining none in particular.
- **Sparse PCA** — penalized PCA that drives many loadings to zero for interpretability and stability.
