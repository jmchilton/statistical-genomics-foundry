---
title: "Networks and Trees"
source: msmb
source_chapter: 10
source_url: https://www.huber.embl.de/msmb/10-chap.html
---

# Networks and Trees — MSMB Chapter 10 (summary)

_Own-words summary of an external source (see frontmatter for license/attribution). Not a substitute for the original chapter._

## 1. Scope

This chapter covers how to represent biological knowledge and observations as **graphs** (networks) and **trees**, and how to fold these structures into statistical analysis rather than treating them only as illustrations. It equips a reader to encode and manipulate graph-structured data, project experimental significance scores onto a known interaction network to find perturbed regions, infer **phylogenetic trees** from molecular sequences under explicit evolutionary models, exploit a hierarchical (tree) structure to gain power in multiple testing, and use a **minimum spanning tree** (or other neighbor graph) as the backbone of a nonparametric two-sample test for whether a categorical covariate is associated with the geometry of high-dimensional data.

## 2. Concepts & Methods

**Graph $(V,E)$.** A graph is a set of nodes/vertices $V$ and a set of edges $E$, where each edge is a pair of nodes. Equivalent encodings: an **edge list** ("from–to" table) and an **adjacency matrix** (an $n\times n$ matrix with a nonzero entry where an edge exists). A graph is a purely combinatorial object — its 2D drawing (**layout**) is non-unique and not part of the graph. **Directed/oriented** graphs use ordered pairs (asymmetric relations); **undirected** graphs use unordered pairs (symmetric relations, giving a symmetric adjacency matrix $M = M^\top$). A **network** here means a graph with edge lengths/weights; its adjacency matrix holds positive numbers. Distance between two nodes is the summed edge length along the shortest path.

**Graph descriptors.** *Degree* (number of incident edges; split into in-degree/out-degree when directed); summaries of the *degree distribution*; node/edge importance via *centrality* and *betweenness*; whether a directed graph is *cyclic* or *acyclic*. **Sparse** vs **dense**: sparse when edge count is of the same order as node count ($\#E \sim O(\#V)$), dense when it approaches the square ($\#E \sim O(\#V^2)$).

**Graphs from data.** Graphs often arise by transforming other data: thresholding a similarity/distance matrix (connect objects that are close), or **bipartite** structure (two node types, e.g. taxa vs sites, with edges only between types — a 0/1 rectangular incidence matrix). Markov chains are graphs (states = nodes, transition probabilities = weights on directed edges); an **absorbing state** is a node with no outgoing edges to other states.

**Gene-set enrichment (overrepresentation).** Tests whether a category (e.g. a **Gene Ontology** term — GO is organized as directed acyclic graphs from specific child terms to general parents) is enriched in a list of significant genes. Modeled as drawing balls from an urn: a universe of $N$ genes split into categories, $m$ declared significant; under the null the significant set is a random draw, so a category of size $k$ is expected to contribute $km/N$ members. Deviation is assessed by the **hypergeometric / Fisher's "exact" test** (called "exact" because it is nonparametric and based on exhaustive enumeration, not because the conclusion is certain).

**Significant subgraphs / high-scoring modules.** Instead of a flat gene list, project per-gene scores onto a **known skeleton network** (a curated interaction graph) and search for a connected **subgraph (module)** of jointly high score — a perturbation **hotspot**. Node scores derive from a t-statistic or p-value; because pathways mix up- and down-regulation, scores should use absolute statistics or p-value-based transforms (e.g. $-\log p$, so small p-values give large scores). One scoring scheme (BioNet/Beisser et al.) models the p-values as a **beta-uniform mixture (BUM)**: a fraction $\pi_0$ of nulls give uniform p-values and the alternatives follow a beta density $\propto a\,x^{a-1}$ ($0<a<1$), with mixture density $f(x\mid a,\pi_0)=\pi_0+(1-\pi_0)\,a\,x^{a-1}$. (The mixing weight is also written $\lambda$.) Finding the maximum-scoring subgraph is **NP-hard**, so heuristics are used: simulated annealing, seed-and-expand, or starting from a minimum spanning tree.

**Phylogenetic trees.** Trees are graphs with no **cycles**. Phylogenetic trees are typically **rooted binary** trees with labels only at the leaves (tips), which are **OTUs** (operational taxonomic units / contemporary taxa); internal nodes are inferred **ancestral** sequences. The statistical **parameter of interest** is the rooted binary tree (plus branch lengths, and sometimes rates). Rooting is usually done via an **outgroup**. Shared-descent characters are **homologous** (population genetics: identity by descent); groups sharing a common ancestor are **clades / monophyletic groups**.

**Markovian models of molecular evolution.** Substitutions are modeled as a **continuous-time Markov chain** on states {A,C,G,T} that is *time-homogeneous* (constant mutation rate over history). Properties: memorylessness; dependence only on elapsed time $h$ and the states; an approximately linear short-time transition rate
$$P_{ij}(h)=q_{ij}h+o(h)\ (j\neq i),\qquad P_{ii}(h)=1-q_i h+o(h),\ \ q_i=\sum_{j\neq i}q_{ij},$$
where $q_{ij}$ is the instantaneous transition rate and $o(h)$ denotes a term shrinking faster than $h$. The rate matrix $Q$ (the **generator**) defines the model. Named models of increasing flexibility: **Jukes-Cantor (JC69)** — one parameter, all changes equally likely; **Kimura (K80)** — separate rates for transitions (within purines or within pyrimidines) vs transversions; **Generalized Time Reversible (GTR)** — 6 free parameters.

**Tree estimation methods.**
- **Parsimony** (nonparametric): minimize the number of changes explaining the data; equivalent to a **Steiner-tree** problem (add internal "ancestor" points to shorten the spanning structure).
- **Maximum likelihood** (parametric): maximize the likelihood of the tree under an evolutionary model (tools: PhyML, RAxML, FastML).
- **Bayesian**: MCMC posterior distributions over trees (MrBayes, BEAST), yielding a collection of trees to summarize.
- **Distance-based / semi-parametric**: **Neighbor-Joining (NJ)** and **UPGMA** — like hierarchical clustering, but distances are corrected via the parametric evolutionary model (hence semi-parametric). NJ uses Steiner-point summaries, is fast, and is a good starting tree for ML.

For real data, sequences must first be **aligned** (to handle **indels** and substitutions); a marker locus such as **16S rRNA** can additionally be taxonomically classified (e.g. a naive Bayesian classifier against a reference training set).

**Combining a tree with sample data.** Specialized containers (phyloseq) bind together the feature (taxa-by-sample) table, sample metadata, taxonomy, and the phylogenetic tree so that filtering/transformation keeps all parts consistent.

**Hierarchical multiple testing.** When tested hypotheses are organized by a tree (taxonomy/phylogeny), test higher-level groups first and descend to finer levels only where the parent is significant (Benjamini–Yekutieli; Benjamini–Bogomolov). Pooling weak, shared signal across related taxa can raise power while still controlling (variants of) FDR. Counts are first normalized (e.g. DESeq2 size factors / variance-stabilizing transform) before per-node tests.

**Minimum spanning tree (MST).** Given vertices and pairwise distances, a **spanning tree** connects all points; the **MST** is the spanning tree of minimum total edge length, computable by greedy algorithms. Input is a distance matrix or a length-weighted graph.

**Graph-based two-sample testing (Friedman–Rafsky).** A multivariate generalization of the univariate **Wald–Wolfowitz runs test**. Build a skeleton graph (MST, k-nearest-neighbor graph, or distance-threshold graph) on all pooled points, color each node by its level of a categorical covariate, and use the count of **pure edges** $S_O$ (edges whose endpoints share a level) as the test statistic. Many pure edges (few "runs") indicates the groups occupy different regions, i.e. different distributions.

## 3. When It Applies

- **Adjacency matrix vs edge list:** the adjacency matrix is convenient for dense graphs but wasteful for sparse ones; prefer an edge list / sparse-matrix encoding when $\#E \sim O(\#V)$ (few edges relative to potential edges).
- **GO/gene-set enrichment** suits a fixed, pre-defined collection of categories when you want to summarize a flat significant-gene list into interpretable biology; **hypergeometric/Fisher** testing is the appropriate choice precisely when category sizes are very unequal, since it accounts for how many genes each category contributes by chance.
- **Network module search** is appropriate when a trustworthy interaction/skeleton network exists and you want to localize perturbation to a connected region rather than rank isolated genes; choose the heuristic by interpretability (seed-and-expand or MST-based starts yield more compact modules than simulated annealing).
- **Phylogenetic model choice:** use the simplest model the data support — JC69 when treating all substitutions alike, K80 when transition/transversion asymmetry matters, GTR for maximum flexibility. **NJ** when speed matters or as a starting tree; **ML/Bayesian** when you want model-based estimates and uncertainty.
- **Hierarchical testing** is the right tool when hypotheses have a known tree/taxonomic structure and signal is expected to be shared among nearby leaves; standard flat FDR is appropriate when hypotheses are unstructured.
- **MST / graph-based two-sample test** applies to high-dimensional or non-Euclidean data (any setting where a meaningful distance exists but coordinate-wise tests are awkward); for sparse presence/absence data such as microbiome counts, prefer **Jaccard** distance over correlation networks.

## 4. Assumptions & Validity Conditions

- **Hypergeometric enrichment:** the significant set behaves as a draw *without replacement* from a correctly specified gene **universe**; the chosen universe and category memberships are decisive inputs.
- **BUM scoring:** assumes null p-values are uniform and alternative p-values follow a beta with $0<a<1$; the fit must be checked (e.g. a QQ-plot against the beta) before trusting the resulting node scores.
- **Continuous-time Markov evolution:** memorylessness, **time-homogeneity** (constant rates across the whole history — the **molecular clock** assumption), exponentially distributed waiting times between substitutions, and site behavior governed by the chosen rate matrix. Time-homogeneity is **load-bearing**: without it the model is **non-identifiable** — different mutational histories cannot be distinguished from the data.
- **Distance-based tree estimation** relies on the evolutionary model being adequate to correct raw (Hamming) distances; correctness of the inferred tree degrades with sequence length and distance from the root.
- **Hierarchical FDR** guarantees hold for specific FDR variants and at levels tied to the procedure; the parent-before-child testing order and the tree encoding (edge list with the root first) are part of the contract.
- **Friedman–Rafsky / permutation tests** assume **exchangeability** of node labels under the null (the labels can be permuted because, under $H_0$, group identity is irrelevant to position in the graph). When covariates are nested, the permutation scheme must respect that structure (permute one factor while holding the grouping intact) or the null is wrong.

## 5. Failure Modes & Invalidity Patterns

- **Confusing a graph with its drawing.** Conclusions read off a particular layout (e.g. "these nodes look central/clustered") are not properties of the graph; layouts are non-unique and edges may overlap arbitrarily. Warning sign: claims that depend on visual position rather than on degree/centrality/connectivity.
- **A long significant-gene list mistaken for biological understanding.** A list of differentially expressed genes is a starting point, not an explanation; treating it as the result is the failure that enrichment/network methods address.
- **Ignoring unequal category sizes in enrichment.** Equal raw counts across categories do *not* mean equal enrichment; a category that is rare in the universe can be strongly enriched at the same count as a common one. Detect/avoid by using the hypergeometric model (or simulation) rather than comparing raw counts.
- **Maximum-scoring-subgraph artifacts.** Because the search is NP-hard and heuristic, methods can return large, hard-to-interpret modules (flagged for simulated annealing). The "best" module is heuristic, not guaranteed optimal.
- **Distance underestimation in sequences (saturation).** Counting only observed differences (Hamming distance) underestimates true evolutionary distance when multiple substitutions overwrite each other at the same site; the bias grows with evolutionary distance. Model-based distance correction mitigates it.
- **Mutation-rate sweet spot.** Too few mutations leave branches unresolved; too many cause changes to **overwrite themselves**, erasing the root signal and making the true tree harder (not easier) to recover. High mutation rate does not imply easier inference.
- **Non-identifiability without time-homogeneity.** Dropping the molecular-clock/homogeneity assumption makes distinct histories indistinguishable from the data — the parameter cannot be estimated.
- **Vocabulary collisions.** "Transition" means a Markov-chain state change in one context but a specific purine↔purine / pyrimidine↔pyrimidine substitution (vs transversion) in the evolutionary context; conflating them misreads a model.
- **Taxonomy ≠ phylogeny.** Taxonomic labels (named ranks) and phylogenetic (tree-distance) relationships are different kinds of information; using one as if it were the other is an error the chapter explicitly flags.
- **Ignoring hypothesis structure in multiple testing.** Flat per-taxon testing wastes power when signal is shared across related taxa; conversely, hierarchical guarantees apply only to particular FDR variants/levels, so reporting an unqualified "FDR" can overstate the control achieved.
- **Wrong permutation null for nested/structured data.** Permuting labels freely when there is a nested covariate (e.g. samples nested within subjects) breaks exchangeability and gives an invalid null; permutations must preserve the known structure. The "exact"-test name itself is a caution against assuming certainty.
- **Correlation networks on sparse data.** For sparse presence/absence data, building correlation-based co-occurrence networks is discouraged in favor of Jaccard-based graphs.

## 6. Empirical Checks & Calibration

- **Simulate under known truth.** Generate sequences down a *known* tree under a chosen model (e.g. JC69 with specified root base frequencies and rate), then attempt to recover the tree — this exposes how mutation rate, branch length, and sequence length affect identifiability and shows mutations concentrating on longer branches. The chapter uses this generate-then-estimate loop as its central calibration device.
- **Monte Carlo / permutation null for enrichment.** Rather than rely on a formula, repeatedly draw the significant set at random from the (unequal) universe and tabulate the category count; an observed count far outside the simulated distribution is the evidence for enrichment (e.g. thousands of simulations never approaching the observed value).
- **Permutation null for graph association.** For Friedman–Rafsky, permute node colors (respecting any nesting), recompute the pure-edge count each time to build the null distribution of $S$, and locate the observed statistic in it; the p-value is the permutation tail probability. A small p-value with the observed count in the extreme tail means the covariate tracks the graph geometry.
- **Model-fit diagnostics.** Check the beta-uniform p-value model with a QQ-plot of observed vs theoretical beta quantiles and a histogram of the fitted mixture components before using node scores.
- **Sensitivity to the skeleton graph.** Re-run the association test with different graph constructions (MST vs k-nearest-neighbor vs distance threshold); concordant conclusions across skeletons indicate robustness. Adjust the permutation scheme to account for known covariate structure.
- **Tree-estimate uncertainty.** Assess tree quality with parametric or nonparametric **bootstrap**, or with Bayesian MCMC posteriors, and compare sampling distributions of trees; recognize that quality depends on sequences per taxon and distance to the root.

## 7. Interpretation, Guidance & Trade-offs

- An enrichment or permutation **p-value** says the observed pattern is unlikely under a specific null (random draw / random labeling); it licenses "associated more than chance," not a mechanism. "Exact" tests are exact in their enumeration, not in their certainty.
- A discovered network **module** is a hypothesis about a perturbed region, conditioned on the trustworthiness of the skeleton network and on a heuristic search; report the network source, scoring (statistic vs p-value transform), and FDR threshold used.
- For evolutionary models, **prefer the least flexible model adequate for the data** (JC69 < K80 < GTR in parameters); extra parameters add flexibility but cost estimability. Use **NJ as a fast starting tree** and reserve ML/Bayesian for final, uncertainty-aware estimates.
- **Hierarchical testing trades** a more complex procedure (and FDR guarantees that hold only for certain variants/levels) for increased power when signal is shared across a taxonomy; it deliberately leaves some subtrees untested to **focus power** on promising ones. State which FDR variant and level you are controlling.
- For **microbiome / sparse data**, default to **Jaccard** distance and avoid correlation networks; report the distance and the graph-construction choice, since the test conclusion can depend on them.
- The same graph machinery serves two opposite roles: a graph as **prior knowledge** to be combined with data (interaction networks, GO, known phylogenies) versus a graph as the **estimated outcome** (inferred phylogenies, co-occurrence networks, MSTs). Be explicit about which role applies, because validity arguments differ.
- A nonparametric graph-based test is a low-assumption way to ask "is this covariate associated with the data geometry?" without parametric distributional commitments; the price is reliance on a sensible distance and on a valid (structure-respecting) permutation null.

## 8. Connections & Key Terms

**Builds on:** Markov chains and transition matrices; hierarchical clustering (mathematically the same object as a rooted binary tree, and the algorithmic ancestor of NJ/UPGMA); multiple hypothesis testing and FDR control; mixture models and p-value modeling (uniform null + beta alternative); multidimensional scaling (the layout problem for length-weighted graphs); count normalization for high-throughput data. **Sets up:** integrating structural prior knowledge into significance analysis; phylogeny-aware and structure-aware testing; and tree-based extensions of ordination (e.g. double principal coordinate analysis, which uses tree distances among taxa).

**Key terms.**
- **Graph / network:** a set of nodes and edges; "network" emphasizes weights/lengths and biological meaning.
- **Adjacency matrix / edge list:** matrix vs list encodings of the same graph; list is efficient when sparse.
- **Directed vs undirected:** ordered (asymmetric) vs unordered (symmetric) edges.
- **Degree, centrality, betweenness:** local and global measures of node importance/connectivity.
- **Sparse / dense:** edge count of order $\#V$ vs order $\#V^2$.
- **Bipartite graph:** two node types with edges only between types (an incidence matrix).
- **Enrichment / overrepresentation:** a category appearing in a significant set more than a random draw would give.
- **Hypergeometric / Fisher "exact" test:** enumeration-based test for a category's overrepresentation accounting for unequal category sizes.
- **Skeleton network:** a fixed, externally curated graph onto which scores are projected.
- **Module / hotspot:** a connected, high-scoring subgraph indicating localized perturbation.
- **Beta-uniform mixture (BUM):** model of p-values as uniform nulls plus beta-distributed alternatives.
- **OTU:** operational taxonomic unit; a tree tip.
- **Rooted binary tree:** tree with one root and exactly two children per internal node, labels on leaves.
- **Outgroup:** an external taxon used to place the root.
- **Clade / monophyletic group:** all descendants of a common ancestor.
- **Generator / rate matrix $Q$:** matrix of instantaneous substitution rates defining a continuous-time evolutionary model.
- **JC69, K80, GTR:** named nucleotide-substitution models of increasing parameter count.
- **Molecular clock / time-homogeneity:** constant substitution rate over history; required for identifiability.
- **Non-identifiability:** distinct parameter values yielding indistinguishable data.
- **Parsimony / Steiner tree:** tree minimizing total changes via added internal points.
- **Neighbor-Joining / UPGMA:** fast distance-based (semi-parametric) tree builders.
- **Hierarchical multiple testing:** testing tree-structured hypotheses parent-first to gain power under controlled FDR.
- **Minimum spanning tree (MST):** minimum-total-length tree spanning all points.
- **Friedman–Rafsky test / pure edges:** graph-based two-sample test using the count of same-label edges, calibrated by label permutation; a multivariate generalization of the **Wald–Wolfowitz runs test**.
- **Jaccard distance:** presence/absence dissimilarity, preferred for sparse co-occurrence data.
