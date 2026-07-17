---
type: book
title: "Clustering"
source: msmb
source_chapter: 5
source_url: https://www.huber.embl.de/msmb/05-chap.html
tags:
  - domain/clustering
---

# Clustering — MSMB Chapter 5 (summary)

_Own-words summary of an external source (see frontmatter for license/attribution). Not a substitute for the original chapter._

## 1. Scope

This chapter covers **clustering**: unsupervised grouping of objects (each described by a feature vector) into discrete categories, extending the idea of finding sub-populations beyond the parametric mixture models fit by EM to settings where groups have no nice parametric shape. It equips a reader to choose a (dis)similarity measure, run nonparametric partitioning and hierarchical algorithms, and—critically—**validate** the resulting groups, since clustering algorithms always return clusters even when none exist. A secondary theme is clustering as **smoothing/denoising**: treating each noisy observation as a sample around a latent "true" value and averaging within groups to recover it.

## 2. Concepts & Methods

The pipeline is: rectangular observations-by-features table $X$ → choice of distance → distance matrix → cluster construction. Two algorithm families dominate: **partitioning** (split into $k$ subsets) and **hierarchical/agglomerative** (build a nested tree).

**Distances / dissimilarities** (the choice precedes and dominates the result):
- **Euclidean** — $d(A,B)=\sqrt{\sum_{i=1}^{p}(a_i-b_i)^2}$ over $p$ features; the default straight-line metric.
- **Weighted Euclidean** — give coordinate directions different weights. Special cases: the $\chi^2$ distance (weight = inverse of expected value, used to compare rows of contingency tables) and the **Mahalanobis distance**, whose weights come from the feature covariance matrix, accounting for differing dynamic ranges and inter-feature correlation (its equal-distance contours are ellipses).
- **Minkowski** — generalizes the exponent: $d(A,B)=\left(\sum_i|a_i-b_i|^m\right)^{1/m}$. $m=2$ is Euclidean; $m=1$ is the **Manhattan / $L_1$** distance (sum of absolute coordinate differences); $m\to\infty$ is the **maximum / $L_\infty$** distance, $\max_i|a_i-b_i|$.
- **Edit / Hamming** — counts differences between character strings (e.g. sequences); can be extended so substitutions carry different weights and insertions/deletions are allowed.
- **Binary** and **Jaccard** — for presence/absence (1/0) data. With $f_{11}$ co-occurrences, $f_{10},f_{01}$ one-sided occurrences, $f_{00}$ co-absences, the Jaccard index $J(A,B)=\frac{f_{11}}{f_{01}+f_{10}+f_{11}}$ and distance $d=1-J=\frac{f_{01}+f_{10}}{f_{01}+f_{10}+f_{11}}$; it **ignores co-absences** $f_{00}$, appropriate when shared presence is more informative than shared absence.
- **Correlation-based** — $d(A,B)=\sqrt{2(1-\text{cor}(A,B))}$: distance $0$ when perfectly correlated, $\sqrt 2$ when uncorrelated, $2$ when perfectly anticorrelated.
- Distances can be defined on non-vector objects too: graph shortest-paths between vertices, **cophenetic** distances between tree leaves, distances between whole trees, Gower's distance for mixed categorical+continuous data, geodesic distances on manifolds.

**Partitioning ($k$-methods):**
- **PAM (partitioning around medoids)** — fix $k$; pick $k$ observations as seeds; assign each remaining point to its nearest center; recompute each cluster's **medoid** (the member minimizing the summed within-group distances); iterate assignment/recompute until stable. The center is always an actual observation.
- **$k$-means** — same alternation but the center is the arithmetic **mean** (center of gravity), generally not an observation.
- Relation to EM: $k$-means makes **hard** assignments (each point contributes entirely to one center), whereas EM uses **soft**, probability-weighted membership so each point contributes to every group's mean.
- **Tight clusters / strong forms** — repeat clustering with different seeds or on resampled subsets; observations "almost always" grouped together form tight clusters; ensemble methods combine many clusterings, which also helps choose $k$.

**Density-based clustering (dbscan):** finds regions of high point density separated by sparser regions; can capture **non-convex** clusters. Built on **density-reachability**: $q$ is *directly* density-reachable from $p$ if it lies within radius $\epsilon$ of $p$ and $p$'s $\epsilon$-neighborhood holds enough points (≥ MinPts) to count as dense; density-reachability chains these links. A cluster is a maximal set of mutually density-connected points with at least MinPts members. Contrast with void-based methods (define clusters by "missing points" between them), which are vulnerable to spurious gaps in high dimension.

**Hierarchical (agglomerative, bottom-up):** repeatedly merge the most similar observations/clusters into a **dendrogram**. Requires a rule for cluster-to-cluster distance once members are aggregated:
- **Single linkage** (nearest neighbor): $d_{12}=\min_{i\in C_1,j\in C_2}d_{ij}$ — tends to produce stringy, comb-like trees.
- **Complete linkage**: $d_{12}=\max_{i\in C_1,j\in C_2}d_{ij}$ — compact classes; one observation can shift groupings.
- **Average linkage**: $d_{12}=\frac{1}{|C_1||C_2|}\sum_{i\in C_1,j\in C_2}d_{ij}$ — intermediate; yields similar sizes/variances but is not robust.
- **Centroid** — distance between cluster centroids; robust to outliers, tends to fewer clusters.
- **Ward's method** — an ANOVA-style criterion minimizing within-cluster variance (equivalently maximizing between-group sum of squares); efficient but tends to make small clusters, especially under high variability.
- A top-down alternative (recursive partitioning / decision trees) splits heterogeneous groups into homogeneous subgroups; deferred to supervised learning.

## 3. When It Applies

- **$k$-means / $k$-medoids**: the common off-the-shelf choice; appropriate when clusters are roughly **comparable in size and convex (blob-shaped)**, and in high-dimensional settings where probability-density/EM modeling is impractical. Use **PAM/medoids** when you want centers that are real observations or when working from a distance matrix rather than coordinates.
- **Density-based (dbscan)**: appropriate for **lower-dimensional** data with **many points and few features** (e.g. cytometry) and when clusters may be **non-convex**; less suitable as dimension grows (must inflate $\epsilon$, see failure modes).
- **Hierarchical**: when you want a **graphical diagnostic** of grouping strength (inner-edge lengths) and to **defer the choice of $k$** until after seeing the tree. With prior knowledge that clusters are similarly sized, prefer **average linkage or Ward's**.
- **Distance choice** is itself problem-matching: pick one that is scientifically meaningful (presence/absence → Jaccard; correlated/differently-scaled features → Mahalanobis; correlation-of-profiles → correlation distance; sequences → edit/Hamming). The chapter stresses there is **no universal method**—the diversity of legitimate algorithms reflects the diversity and subjectivity of the problem.

## 4. Assumptions & Validity Conditions

- **Feature selection and scaling are upstream assumptions.** Which features are included, what transformations are applied (e.g. variance-stabilizing transforms like $\operatorname{asinh}(x)=\log(x+\sqrt{x^2+1})$, which is log-like for large $x$ and linear for small $x$), and whether each feature is divided by its scale (e.g. its standard deviation) all change the implied distance. Dividing by scale amounts to **assuming all features are equally important**.
- A metric only needs a **metric space**, not a vector space.
- **$k$-means/PAM** require $k$ specified in advance and implicitly assume comparable-size, convex clusters.
- **Mahalanobis** assumes cluster densities are well-approximated by multivariate normals (elliptical contours); may use a per-cluster covariance, a common shared one, or regularization to limit the number of estimated parameters.
- **dbscan** requires choosing $\epsilon$ and MinPts; it assumes meaningful density contrast exists at that scale.
- **Ward / average linkage** are best when clusters are about the same size.
- **Validation by simulation** assumes you can generate reference data with "similar structure but less/no clustering" (uniform, or matched-covariance).

## 5. Failure Modes & Invalidity Patterns

- **Clustering always returns clusters.** The central caution: algorithms are built to find clusters and will partition pure noise (illustrated by the WWII London bombings, which were random yet looked patterned). Reporting clusters without validation is the core failure mode; reaching a "result" is not evidence that real groups exist.
- **WSS minimized trivially.** Within-cluster sum of squares $\text{WSS}_k=\sum_{\ell=1}^k\sum_{x_i\in C_\ell}d^2(x_i,\bar x_\ell)$ always decreases with $k$ and is minimized (=0) by making every point its own cluster—so raw WSS cannot, by itself, choose $k$.
- **Wrong-shape clusters.** $k$-means breaks up clusters of **very unequal size** (large ones get split) and mishandles **non-spherical/non-elliptic** shapes (e.g. spirals); single linkage produces stringy comb-trees; complete linkage and average linkage are sensitive to individual observations / not robust.
- **Curse of dimensionality.** As feature count grows, density-based methods need ever-larger $\epsilon$ to find clusters at all, and void/gap-based methods invent **spurious "voids."** High dimension undermines density estimation generally.
- **Distance = "garbage in, garbage out."** A poorly chosen or unscaled distance silently determines the answer.
- **Ignoring baseline frequencies.** Assigning a new object purely by **distance to the nearest cluster center** (equivalent to using equal-radius balls around each center) is biased when groups have very different prevalences—a large, frequent group accumulates more error/spread simply by having more samples. The chapter ties this to the **representativeness heuristic** (Tversky & Kahneman): judging membership by similarity to a representative, while ignoring base rates. This makes naive distance-based **OTU** clustering of sequences sub-optimal when true classes occur at very unequal frequencies.
- **Dendrogram over-reading.** Horizontal distances and within-sibling ordering carry **no information** (the tree swings freely like a mobile, giving many valid leaf orderings); only vertical (merge-height) distances are meaningful. Apparent neighbors in the plot may be **non-monophyletic** (not in the same clade). Ordering heatmap rows/columns by a clustering tree can make clusters **look stronger than the tree implies**.
- **Resampling is not a panacea.** Cluster stability has its own limitations; high stability does not guarantee a "true" clustering.
- **No ground truth.** In general there is nothing to compare a clustering against; "all models are wrong, some useful"—a good clustering is one that proves *useful*, not one proven *correct*.

## 6. Empirical Checks & Calibration

- **Simulate under known truth.** Generate data with a known number of groups (e.g. four well-separated Gaussian blobs) to see how validation indices behave when the answer is known, then transfer that intuition to real data. Equally, simulate **uniform/unstructured** data of the same range and dimension to see what an index returns when there are *no* clusters—a baseline for "this is just noise."
- **Elbow on WSS.** Plot $\text{WSS}_k$ vs $k$; a sharp drop that then flattens (an "elbow") suggests a candidate $k$. Note $\text{WSS}_k$ has two equivalent readings—distance of points to their center, and average pairwise within-cluster distance: $\text{WSS}_k=\sum_\ell\frac{1}{2n_\ell}\sum_{x_i,x_j\in C_\ell}d^2(x_i,x_j)$.
- **Calinski–Harabasz index.** $\text{CH}(k)=\frac{\text{BSS}_k}{\text{WSS}_k}\cdot\frac{N-k}{N-1}$, with between-group sum of squares $\text{BSS}_k=\sum_\ell n_\ell(\bar x_\ell-\bar x)^2$; an $F$-statistic-inspired ratio of between- to within-group variation. Higher is better.
- **Gap statistic** (Tibshirani et al.) — a Monte Carlo calibration. Compare $\log(\text{WSS}_k)$ on the data to its average over $B$ reference datasets drawn from a homogeneous (uniform or matched-covariance) distribution: $\text{gap}(k)=\bar l_k-\log\text{WSS}_k$ with $\bar l_k=\frac1B\sum_b\log W^*_{kb}$. Good clustering ⇒ data WSS below the reference ⇒ gap positive; **seek the largest gap**. Use the simulation spread $\text{sd}_k$ and pick, e.g., the smallest $k$ with $\text{gap}(k)\ge\text{gap}(k+1)-s'_{k+1}$, $s'_{k+1}=\text{sd}_{k+1}\sqrt{1+1/B}$. Different selection rules (first-local-max-minus-SE vs. the Tibshirani rule) can yield different $k$ on the same data.
- **Silhouette index.** For point $x_i$, with $A(i)$ its average dissimilarity to its own cluster and $B(i)$ the lowest average dissimilarity to any other cluster, $S(i)=\frac{B(i)-A(i)}{\max(A(i),B(i))}$; near $1$ = well-placed, near $0$/negative = ambiguous/misassigned. Sweep $k$ for the best silhouette; check on unclustered uniform data to see it fail to find structure.
- **Bootstrap / subsample stability + consensus.** Real sampling variability is unavailable, so emulate it: repeatedly draw subsamples (e.g. 67% without replacement) using the empirical distribution $\hat F_n$ as a stand-in for $F$, cluster each, predict held-out memberships, then form a **consensus clustering** and measure each run's **agreement** with it ($1$ = perfect). **High, concentrated agreement ⇒ stable, reproducible $k$-cluster structure; diffuse/low agreement ⇒ no stable partition** (e.g. consensus membership probabilities are bimodal/decisive when two real groups exist, diffuse when they don't).
- **Re-run to expose instability.** Because random seeds change $k$-means/PAM output, running several times and comparing reveals solution variability.
- **Diagnostic fit checks (denoising).** Inspect whether modeled error rates match observed rates (e.g. fitted-vs-observed substitution-error curves), and verify a derived count distribution against theory by Monte Carlo (e.g. the number of errors per length-200 read ≈ Poisson with the per-base rate summed over positions).

## 7. Interpretation, Guidance & Trade-offs

- **Choose the distance first and deliberately**; always compare outputs across several scientifically defensible distances. The *same* data may warrant *different* distances for different scientific questions.
- **$k$ is a reported choice, not a fact.** No consensus method exists for the absence of external biological information. Use multiple validation tools together—elbow, CH, gap, silhouette, stability—rather than any single number; corroborate with **visualization** and with **biological/external knowledge**, which the chapter calls the best validation.
- **Partitioning vs. hierarchical trade-off:** partitioning commits to $k$ up front and scales better; hierarchical defers $k$ and exposes grouping strength via inner-branch lengths, but is costlier.
- **Account for base rates and local density**, not just similarity, when assigning objects—especially for very unequal group sizes (denoising sequence reads into true taxa/strains). Building a **noise model from the data** lets denoising and cluster assignment happen jointly: e.g. iterative EM-style algorithms (**DADA / DADA2**) estimate position-independent base-substitution probabilities from the data themselves (because error rates vary by run/protocol), classify reads as exact vs. noisy, and emit cluster centers as denoised **Amplicon Sequence Variants (ASVs)**, a higher-resolution replacement for OTU tables. Pooled inference across samples detects rare variants better but costs more compute/memory than independent-by-sample inference (which is linear in samples, constant memory).
- **Report what makes results trustworthy:** the distance and any feature selection/scaling/transformation, the chosen $k$ and the rule that picked it, and stability evidence.

## 8. Connections & Key Terms

**Builds on:** parametric mixture models and the EM algorithm (clustering generalizes them to nonparametric, hard-assignment settings; soft vs. hard membership is the key contrast); variance-stabilizing transformations; the bootstrap (resampling the empirical distribution to emulate sampling variability); ANOVA's between/within sum-of-squares decomposition. **Sets up:** denoising→count tables feeding network/graph analysis of communities; ordination/dimension-reduction (PCA) as preprocessing and as an alternative to tree-based ordering; the curse of dimensionality (relevant to supervised learning); Bayesian nonparametric mixtures as a probabilistic generalization.

**Computational note:** all-vs-all distances on $n$ objects are $O(n^2)$ in time and memory; classic agglomerative hierarchical clustering is $O(n^3)$ in time—impractical at large $n$. $k$-means is $O(n)$ (it tracks only point-to-center distances, whose count is fixed), and optimized implementations exist for hierarchical and density methods.

**Key terms:**
- **Clustering** — assigning each object a categorical group label from its feature vector, unsupervised.
- **Feature / object** — the measured variables and the units they describe.
- **Distance / dissimilarity / metric** — quantified (un)likeness between objects; the load-bearing modeling choice.
- **Medoid** — a cluster's most central *actual member* (vs. a mean center).
- **$k$-means / $k$-medoids (PAM)** — partitioning by alternating center estimation and hard reassignment.
- **Density-reachability** — chain of within-$\epsilon$, sufficiently-dense links underlying dbscan.
- **Linkage** (single/complete/average/centroid/Ward) — rules for cluster-to-cluster distance in agglomerative clustering.
- **Dendrogram** — the hierarchical-clustering tree; only merge heights are meaningful, leaf order is not.
- **WSS / BSS** — within- / between-group sums of squared distances.
- **Gap statistic** — Monte Carlo comparison of $\log\text{WSS}_k$ to unstructured reference data to choose $k$.
- **Silhouette** — per-point fit score balancing own-cluster vs. nearest-other-cluster dissimilarity.
- **Consensus / tight clusters / strong forms** — groupings reproducible across resamples or restarts; basis for stability validation.
- **ASV / OTU** — sequence-variant clusters; ASVs are denoised exact variants, OTUs are coarser distance-threshold groups.
- **Curse of dimensionality** — degradation of distance/density methods as feature count grows.
