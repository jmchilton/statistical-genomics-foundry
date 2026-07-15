---
type: book
title: "Data Visualization"
source: msmb
source_chapter: 3
source_url: https://www.huber.embl.de/msmb/03-chap.html
---

# Data Visualization — MSMB Chapter 3 (summary)

_Own-words summary of an external source (see frontmatter for license/attribution). Not a substitute for the original chapter._

## 1. Scope

This chapter equips a reader to choose and construct data visualizations for exploratory analysis and for publication, with emphasis on visual displays of distributions and relationships in biological measurement data. It covers a small set of canonical plot types for one and two variables, a compositional framework (the *grammar of graphics*) for reasoning about and assembling plots, techniques for showing more than two dimensions, principled use of color, axis/scale transformations, and displays organized along genomic coordinates. The recurring concern is honesty: which displays faithfully convey the structure of a sample (its modes, skew, tails, density) and which create artifacts or hide information, so that a reader picks an effective, non-misleading display rather than defaulting blindly.

## 2. Concepts & Methods

- **Two graphics paradigms.** *Procedural / canvas-based plotting* (base R `graphics`) draws specialized plots directly onto a canvas; simple for quick exploration but hard to compose or modify. *Grammar of graphics* (implemented in **ggplot2**, after Wilkinson) instead describes a plot as a declarative object built from modular pieces, which can be assembled, stored partially, and refined incrementally (via the `+` operator). The latter is the chapter's main tool.

- **Grammar-of-graphics components.** A plot is specified by: (1) one or more datasets (expected in a tidy dataframe/tibble, one row per observation); (2) **geometric objects** (*geoms* — points, lines, bars, rectangles, contours) that visually represent data; (3) **aesthetic** mappings from variables to visual properties (position on $x$/$y$, color, fill, shape, size, transparency $\alpha$), each with an associated **scale** (e.g. linear, logarithmic, rank); (4) a coordinate system (Cartesian by default; alternatives include polar); (5) **statistical** summarization rules (*stats* — identity, count/binning, mean, smoothing); (6) a **facet** specification; (7) layout/theme parameters. Items (1)–(3) are required; (4)–(7) default sensibly. Geoms carry default stats (a histogram geom bins; a smooth geom fits and draws a curve). The same component type may be used repeatedly as **layers**, overlaying e.g. points, a smoother, and a confidence band on the same data.

- **One-dimensional distribution displays**, ordered roughly from least to most informative:
  - *Barplot of a summary* (e.g. mean): reduces a whole sample to one number; loses shape information.
  - *Boxplot*: compact five-number-style summary (median, quartiles, whiskers, outliers); shows location, spread, and skew via the position of the median within the box.
  - *Dot plot / beeswarm plot*: shows individual points, perturbed to avoid overlap (dot plots bin one axis and stack; beeswarm shifts overlapping points sideways).
  - *Density plot*: a smoothed estimate of the underlying data-generating density.
  - *Violin plot*: a density estimate drawn as a symmetric shape, arranged like a boxplot for comparing several groups.
  - *Ridgeline plot*: stacked density curves, suited to comparing many ($\sim$dozens of) distributions.
  - *ECDF plot*: the **empirical cumulative distribution function**.

- **CDF and ECDF.** The cumulative distribution function of a one-dimensional random variable is $F(x)=P(X\le x)$; the density is its derivative where it exists. The finite-sample analogue is the ECDF, $F_n(x)=\frac{1}{n}\sum_{i=1}^{n}\mathbb{1}(x_i\le x)$, i.e. the fraction of observed values $\le x$, where $\mathbb{1}$ is the indicator function. Equivalently, plotting sorted values against their ranks traces the ECDF.

- **Two-dimensional displays (scatterplots and density).** A plain scatterplot maps two variables to the two screen axes. For large samples, dense regions **overplot**; remedies are point transparency ($\alpha$), a 2D kernel density estimate shown as **contours** or filled **polygons** (controlled by a smoothing **bandwidth** and binning), or **hexagonal binning** (counts of points per hexagonal cell, mapped to color) — the last avoids smoothing-induced loss of isolated points.

- **More than two dimensions.** Extra variables can map to additional aesthetics (color, shape, size, $\alpha$) — in principle up to several, but legibility collapses quickly. **Faceting** (a.k.a. trellis/lattice) instead splits the data by one or two variables into a grid of small multiples, each panel sharing a common construction, enabling 4–5 dimensions to be read by comparison. Continuous variables can be faceted after discretizing (equal-width bins via cutting, or equal-count bins via quantiles/ranks). Using a factor on an axis is a form of implicit faceting.

- **Color.** Color perception is three-dimensional. Two parameterizations appear: **RGB** (three channels in $[0,1]$, a point in a unit cube; hex triplets are this in base-256), and **HCL** (hue $H\in[0,360]$, chroma $C\ge 0$, luminance $L\in[0,100]$; polar coordinates in a perceptual CIE-LUV space, with the maximum $C$ depending on $H$ and $L$). Palettes (e.g. **RColorBrewer**) fall into three kinds matched to data type: **qualitative** (unordered categories), **sequential** (low→high), **diverging** (a meaningful midpoint with deviations both ways). Color-wheel constructions (complementary, triadic, tetradic, analogous, split-complementary, warm/cool) give harmonious sets.

- **Heatmaps.** Display a large matrix as a grid of colored cells; rows/columns are typically reordered by **hierarchical clustering**, with the resulting **dendrograms** drawn at the margins. Often shown on centered/relative values (each row minus its mean) with a diverging palette centered at zero.

- **Data transformations of scales.** The **logarithm** maps multiplicative change to additive distance ($\log(ax)=\log a+\log x$), spreading out data huddled near zero with a long tail. The **rank** transformation replaces values by their order statistics, equalizing density along an axis. Both can be applied to position aesthetics and to color scales.

- **Genomic / along-sequence displays.** Genomic data carry coordinates (sequence name, interval, strand), a natural integrating axis. Displays include ideograms, karyograms, and read pile-ups; the challenge is the range of scales from whole genome to nucleotide. Coordinate-associated data are held in interval/range structures (e.g. a `GRanges`-style object).

## 3. When It Applies

- **Exploration vs. presentation:** fast, low-ceremony plotting fits interactive exploration; the compositional grammar fits building refined, reproducible, publication figures and trying alternatives cheaply.
- **Choosing a 1D display by sample size and distribution shape:** boxplots suit unimodal samples and compact side-by-side comparison; when the distribution may be **multimodal, long-tailed, or skewed**, or has large outliers, prefer displays that show the data or full density (dot/beeswarm, density, violin, ridgeline, ECDF). Show individual points when the count is small enough; use beeswarm/violin/ridgeline as counts and number of groups grow.
- **ECDF** is the recommended choice when a faithful, assumption-light view of a distribution is wanted, especially comparing several samples or differing sample sizes.
- **2D dense data:** as point count rises, move from raw points → transparency → 2D density contours/fills → hexagonal binning; add back individual points to recover sparse-region outliers.
- **Encoding extra dimensions:** prefer one or two added aesthetics, or faceting, over piling on many aesthetics.
- **Color kind must match variable kind:** qualitative palette for unordered categories, sequential for ordered magnitudes, diverging for signed deviations about a midpoint (e.g. fold changes about zero).
- **Transform a scale** when points are huddled with sparse remaining space (sharp peak, long tail): log for multiplicative/positive data; rank when even log leaves the distribution very uneven or when a monotone but density-equalizing view is wanted.
- **Aspect ratio** matters: use equal data-to-space mapping when both axes share units (e.g. log-expression vs. log-expression, or PCA components after an orthonormal rotation); **banking** (setting the aspect so typical line slopes are near $\pm 1$) reveals fine line-shape structure that an unbanked plot hides.

## 4. Assumptions & Validity Conditions

- **Grammar-of-graphics input shape:** functions expect tidy dataframe input (one observation per row, variables in columns); other layouts (matrices, separate vectors) must be reshaped first.
- **Mean as a summary** (barplot of means, normal-theory error bars) presupposes the mean is an appropriate summary — i.e. roughly unimodal, not highly skewed, without large outliers.
- **Density estimation** depends on a chosen **smoothing window/bandwidth**; the estimate is only as trustworthy as that choice (see failure modes). A density curve also presumes enough data to support it, and silently does not encode how much.
- **2D density contours/fills** likewise rest on bandwidth and binning choices.
- **ECDF** assumes only that the ordering of values matters and their sequence/index does not; under that, it is essentially assumption-free and lossless.
- **Heatmap row/column order** by clustering assumes a chosen clustering method and distance; the ordering is not unique.
- **Log transform** requires strictly positive values (zeros/negatives break it).
- **Banking** presumes the data approximately follow a line whose slope is informative.

## 5. Failure Modes & Invalidity Patterns

- **Barplots of means hide the distribution.** Warning sign: a bar (optionally with error bars) standing in for a whole sample. Consequence: skew, multimodality, outliers, and sample size are invisible; when the mean is not a fair summary the plot is *outright misleading*. Fix: show the data or the full distribution.
- **Density-plot bandwidth trap.** A window too small yields unstable, "wiggly" spurious peaks in sparse regions; too large smooths away real sharp peaks. Consequence: apparent modes that are artifacts of smoothing, or real features erased. The empirical density of a finite sample is, unsmoothed, a sum of Dirac spikes — far from any smooth truth — and smoothing's distortion is hard to control. Detection/mitigation: prefer the ECDF (converges to the true CDF as $n$ grows, with small finite-sample gap, and needs no bandwidth); vary the bandwidth and check stability.
- **Multimodality is not transformation-invariant.** Reading a histogram/density for bimodality as evidence of an underlying mechanism is fragile: the number and location of modes depend on the **scale** the data are plotted on. Under a nonlinear monotone transform $f$ the density transforms by the chain rule, $\tilde p(x)=p(f(x))\,f'(x)$, and a mode of one variable is generally **not** a mode of the transformed variable (the two coincide only when $f$ is affine, $f''\equiv 0$). Consequence: a "biological" bimodality may be an artifact of working in, say, raw vs. log units. Detection: check whether the modal structure survives plausible rescalings.
- **Overplotting hides density.** A dense scatter cloud reads as a featureless mass; outskirts are interpretable but interior structure is not. Even with transparency, dense regions saturate to black while isolated points fade. Density/contour/hex methods cure the interior but can **drop sparse-region outliers** — a complementary information loss. Remedy: combine (e.g. density fill plus added points).
- **Density-vs-coordinate visual artifact.** An apparent trend in $y$ versus $x$ — e.g. variance of one quantity seeming to depend on another — can be a pure consequence of **uneven point density** along $x$ (more points where $x$ is small), not a real dependence. Detection: re-plot against the **rank** of $x$ (which equalizes density); if the apparent trend vanishes, it was an artifact. (Density-/bin-based displays can also mitigate it.)
- **Dendrogram ordering is arbitrary.** Heatmap impressions depend heavily on row/column order, yet clustering order is one of many valid choices, and at every internal branch the two children can be flipped without changing the tree's topology. Consequence: "patterns" may be artifacts of arbitrary layout decisions rather than real structure. (Assessing whether clusters are real is deferred to later material.)
- **Regression/smoother lines can mislead.** Overlaying a fitted line/smoother on a scatterplot is not always meaningful (the chapter flags this as a question to consider), e.g. when the relationship or the line's assumptions don't fit the data.
- **Faceting with adaptive axes** trades detail for comparability: per-panel free scales reveal within-panel detail but make panels not directly comparable.
- **Default laziness and over-decoration.** Two opposite failures: using software defaults unthinkingly (e.g. legacy palettes, lexicographic category order, default aspect), and adding "visual candy" that clutters without conveying a message.

## 6. Empirical Checks & Calibration

- **Simulate under a known truth to expose artifacts.** The chapter's diagnostic for the density-vs-coordinate trap is to pair a real variable with a **simulated** response drawn independently (so the truth is "no dependence"); the raw scatter still *looks* dependent, and re-plotting against rank confirms the apparent trend was a density artifact. This is the central simulate-under-known-truth check: generate data with the property you want to test for absent, and verify the display does not invent it.
- **ECDF as a calibration-friendly reference.** Because $F_n$ converges to the true $F$ and stays close even at modest $n$, comparing an ECDF to a hypothesized CDF — or comparing several ECDFs — gives an assumption-light read on distributional differences; pass = curves track the reference / each other, fail = systematic separation.
- **Bandwidth sensitivity check.** Vary the smoothing bandwidth (and binning) of density/contour estimates; features that appear or vanish across reasonable settings are not trustworthy.
- **Scale-transform sensitivity check.** Re-examine modality and apparent relationships under log and under rank transforms; conclusions that flip are scale artifacts, not findings.
- **Aspect-ratio (banking) check.** Compute a target aspect (e.g. so the median absolute slope is $1$) and compare to the default; structure that only emerges at the banked aspect was being hidden.
- **Color palette suitability check.** Palette metadata flags which palettes are **colorblind-safe**; choosing by data kind (qualitative/sequential/diverging) and by colorblind-safety is a calibration of the display to its readers and its variable type.

## 7. Interpretation, Guidance & Trade-offs

- **Match the display to the message and to the data's shape.** The plot type (geom), the proportions/aspect ratio, and the colors are the main levers; choose them deliberately rather than by default.
- **Prefer showing data or full distributions over single-number summaries** when space allows; a boxplot is strictly more informative than a bar-of-means in the same footprint, and point/density/ECDF displays more still.
- **Read distribution displays honestly:** a median's position in a box indicates skew direction; a density curve does not tell you how much data backs it (so curves from very different sample sizes are not equally reliable); an ECDF is lossless up to ordering and is the safest default for comparison.
- **Treat modes, trends, and clusters as hypotheses, not conclusions** until checked against scale transforms (modes/trends), density/rank re-plots (trends), and clustering validity (heatmap blocks).
- **Transform trade-offs:** the log scale has a clean interpretation (equal steps = equal multiplicative change) but fails on non-positive data; rank equalizes density and removes density artifacts but discards the magnitude metric.
- **Aspect ratio:** keep equal data-to-space mapping when axes share units; for line-like data consider banking; PCA plots are usually wider than tall because later components carry no more variance than earlier ones.
- **Color guidance:** use dark, high-contrast colors (low luminance) for lines/points against a light background, and lighter, low-to-moderate-chroma pastels for area fills; holding chroma and luminance fixed while varying hue yields balanced palettes and avoids irradiation illusions where light areas look larger; favor colorblind-safe palettes.
- **Vector vs. raster output:** prefer vector formats (e.g. PDF) for plots — they rescale without pixelation and can always be rasterized later, whereas the reverse is hard.
- **Interactivity trade-off:** browser-/server-backed interactive plots add expressivity but some require a live computing session behind them, whereas a static or self-contained file needs none — a portability cost to weigh.
- **Report/hold fixed for trustworthiness:** the smoothing bandwidth, binning, scale transformation, aspect ratio, and clustering/ordering choices all materially shape what a reader sees and should be deliberate (and, implicitly, disclosed).

## 8. Connections & Key Terms

**Builds on:** the notion of a random variable and its distribution (CDF, density), summary statistics (mean, median, quartiles), and the idea of estimating a population quantity from a finite sample. **Sets up:** clustering and assessment of cluster significance (foreshadowed by dendrogram caveats); dimension reduction such as principal component analysis (aspect-ratio discussion); count-data and fold-change analyses (log scales, MA-style displays); and downstream work on data representation/tidying and on genomic-coordinate data structures. The deeper through-line is that visualization is an inferential act whose choices must be checked empirically, not trusted by default.

**Key terms:**
- *Grammar of graphics* — a compositional framework that describes a plot as data + geoms + aesthetic-to-scale mappings (+ coordinates, stats, facets, theme), enabling modular construction.
- *Geom (geometric object)* — the visual mark representing data (point, line, bar, contour, polygon, …).
- *Aesthetic* — a mapping from a data variable to a visual property (position, color, shape, size, transparency).
- *Scale* — the rule converting data values to an aesthetic's units (linear, logarithmic, rank).
- *Stat (statistic)* — any function of the data computed for display (identity, count/bin, mean, smooth).
- *Layer* — one geom+stat combination; multiple layers overlay on shared data.
- *Facet (trellis/lattice)* — small multiples obtained by splitting data on one or more variables.
- *CDF* — $F(x)=P(X\le x)$, the probability of being at most $x$.
- *ECDF* — $F_n(x)$, the sample fraction of values $\le x$; converges to $F$ and is lossless up to ordering.
- *Density estimate* — a smoothed approximation of the data-generating density; depends on a bandwidth.
- *Bandwidth / smoothing window* — the tuning parameter controlling how much a density (or 2D contour) is smoothed.
- *Overplotting* — loss of visible structure when many marks coincide in dense regions.
- *Hexagonal binning* — counting points in hexagonal cells and color-mapping the counts, an unsmoothed density display.
- *Boxplot / violin / ridgeline / beeswarm* — distribution displays trading off compactness against how directly they show data and shape.
- *Banking* — choosing the aspect ratio so typical line slopes are near $\pm 1$, revealing line-shape detail.
- *RGB / HCL color models* — coordinate systems for the three-dimensional space of color (channel intensities vs. hue–chroma–luminance).
- *Qualitative / sequential / diverging palette* — palette families matched to unordered, ordered, and signed-about-a-midpoint variables.
- *Dendrogram* — the tree from hierarchical clustering used to order heatmap rows/columns; its branch flips and method choice make the order non-unique.
- *Rank transformation* — replacing values by their order positions, equalizing density along an axis and exposing density-driven artifacts.
- *Genomic coordinates / range object* — sequence-name + interval + strand annotation that serves as the organizing axis for along-genome displays.
