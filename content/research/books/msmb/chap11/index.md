---
title: "Image Data"
source: msmb
source_chapter: 11
source_url: https://www.huber.embl.de/msmb/11-chap.html
license: CC-BY-NC-SA-2.0
license_file: LICENSES/msmb.LICENSE
attribution: "Holmes S, Huber W. Modern Statistics for Modern Biology. Cambridge University Press; 2019. https://www.huber.embl.de/msmb/"
derived: own-words-summary
---

# Image Data — MSMB Chapter 11 (summary)

_Own-words summary of an external source (see frontmatter for license/attribution). Not a substitute for the original chapter._

## 1. Scope

This chapter treats digital images as quantitative data and shows how to turn them into measurements suitable for statistical analysis. It covers the full path from a raw image to interpretable numbers: representing images as numeric arrays, cleaning and transforming them, partitioning them into discrete objects (segmentation), measuring per-object descriptors (feature extraction), and finally analyzing the spatial arrangement of objects as a point pattern. It equips a reader to ask whether identified objects are arranged randomly, cluster together, or repel one another, and at what spatial scale — distinguishing genuine spatial structure from what a memoryless random baseline would produce. The treatment is restricted to two-dimensional, mostly static images; 3D segmentation, registration, and temporal tracking are explicitly out of scope.

## 2. Concepts & Methods

**Images as numeric arrays.** An image is a rectangular array of pixel intensities (here scaled to $[0,1]$). Grayscale images are 2D (extra dimensions index separate frames: $z$-positions, time points, replicates); color images carry a channel dimension (e.g. red/green/blue, but any number of channels is allowed). Because images are arrays, ordinary arithmetic and matrix operations *are* the manipulation primitives.

**Intensity manipulations.** Pointwise operations adjust appearance/encoding: negation (invert), multiplication (contrast), exponentiation $f^{\gamma}$ (gamma correction), thresholding (produces a binary/logical image), and *normalization* (rescaling values to a target range). These are per-pixel and carry no spatial mixing.

**Spatial transformations.** Geometric operations on the pixel grid: cropping, transposition, rotation, translation (incoming pixels filled with zero, outgoing cropped), and reflection about a horizontal or vertical axis.

**Linear filters (convolution).** Smoothing replaces each pixel by a weighted average of its neighborhood. With weight function $w$, the filtered image is the convolution $(w*f)(x,y)=\sum_{s}\sum_{t} w(s,t)\,f(x+s,y+t)$. A flat $w$ gives a moving average over a $(2a+1)\times(2a+1)$ window ($N=(2a+1)^2$ pixels); a Gaussian brush weights the center most heavily and falls off with a bandwidth $\sigma$. Convolution is *linear*: $w*(c_1 f_1 + c_2 f_2) = c_1\,(w*f_1) + c_2\,(w*f_2)$. It can be computed efficiently via the Fast Fourier Transform rather than direct summation. (Implemented in **EBImage**'s `filter2`/`makeBrush`.)

**Adaptive (local) thresholding.** Instead of one global cutoff, compare each pixel to a *locally* estimated background (a linear filter with bandwidth larger than the target objects but smaller than the illumination scale), and call foreground where the pixel exceeds local background by an offset. This adapts to spatially varying background (uneven illumination, stray light from nearby bright objects). The local summary need not be a mean; a local median or low quantile is often preferable though costlier (**EBImage** `medianFilter`).

**Global thresholding via a mixture model.** Alternatively, model the intensity histogram (often on a log scale) as a mixture of a background component (e.g. log-Normal) and a flatter foreground component, with most pixels being background. Robust location/width estimates of the background component (e.g. half-range mode for location; root-mean-square of values left of the mode for width) yield a threshold set some multiple of the width above the background location. This is a classification-of-pixels view of segmentation.

**Morphological operations (binary images).** Using a binary mask ("structuring element"): *erode* shrinks foreground (drop foreground pixels whose mask overlaps any background), *dilate* grows it (the dual), *opening* = erode then dilate (removes small specks and smooths ragged boundaries), and hole-filling fills background regions enclosed by foreground. These are nonlinear neighborhood filters specific to binary images.

**Connected-component labeling.** Given a binary foreground mask, label maximal connected pixel sets as distinct objects, each receiving an integer index (background = 0). Object areas (pixel counts) follow immediately and can screen objects that are implausibly large or small.

**Voronoi tessellation / seeded propagation.** Given seed regions, partition surrounding space by assigning each location to its nearest seed. The chapter generalizes "nearest" beyond flat Euclidean distance to a metric on a manifold with an *elevation* $z$ (e.g. a fluorescence intensity), where the squared distance between neighboring points is $\text{d}s^2 = \frac{2}{\lambda+1}\big[\lambda(\text{d}x^2+\text{d}y^2)+\text{d}z^2\big]$, with $\lambda\ge0$. Limiting cases: $\lambda=1$ gives the isotropic Euclidean metric ($\text{d}s^2=\text{d}x^2+\text{d}y^2+\text{d}z^2$); $\lambda\to\infty$ ignores elevation, so only lateral movement counts (pure spatial Voronoi); $\lambda=0$ counts only elevation. $\lambda$ thus trades off compact object shape against following an intensity signal. (Implemented in **EBImage** `propagate`; a `mask` argument confines the partitioned space.) This is used to grow object regions (e.g. cell bodies) outward from seeds (e.g. nuclei) inside a foreground mask, guaranteeing one region per seed.

**Feature extraction.** Per object, summarize the underlying intensities and geometry: mean intensities per channel/mask, area, shape descriptors (e.g. major-axis length, eccentricity, orientation), texture, and derived quantities (area ratios, entropy, mutual information, channel correlation). These features become a standard multivariate data matrix (objects × features) feeding clustering, classification, and between-condition comparison.

**Spatial point processes.** When the data of interest are object *locations*, the realization is a set of isolated points in a bounded space, optionally *marked* with attributes (a categorical label, time, or quantitative value) — a *marked point process*. The analyst must define the observation window (rectangle, convex hull of the points, an external mask, or a density-thresholded region), since estimates depend on it. (Handled by the **spatstat** package; the point-pattern object is `ppp`.)

**First-order property — intensity.** The local intensity is $\lambda(p)=\lim_{a\to0}\frac{E[N(p,a)]}{a}$, where $N(p,a)$ counts points in a small region of area $a$ around location $p$. A *stationary* (homogeneous) process has $\lambda(p)=\text{const}$, so the expected count in a region of area $A$ is $\lambda A$. The intensity is estimated by kernel smoothing of the points, $\hat\lambda(p)=\sum_i e(p_i)\,K(p-p_i)$, with kernel bandwidth $\sigma$ and an edge-correction factor $e(\cdot)$. Distinct from intensity estimation is estimating the *conditional probability* that a point belongs to a given mark class at a location (spatially varying relative risk; **spatstat** `relrisk`).

**The homogeneous Poisson process (null model).** The simplest spatial process: stationary with constant intensity $\lambda$, and *complete spatial randomness* — counts in non-overlapping regions are independent, and the count in a region of area $A$ is Poisson-distributed with mean $\lambda A$. It is the reference against which clustering or repulsion is judged.

**Second-order properties — spatial dependence.** Several summary functions detect departures from the Poisson null:
- **Nearest-neighbor distance distribution $G$.** For the distance $W$ from a random point to its nearest neighbor, under a homogeneous Poisson process $G(w)=P(W\le w)=1-e^{-\lambda\pi w^2}$. Comparing the empirical $G$ to this curve reveals inhibition (fewer short distances) or clustering (**spatstat** `Gest`).
- **Ripley's $K$ function** (reduced second-moment function): $\lambda K(r)$ is the expected number of *additional* points within distance $r$ of a typical point. For an inhomogeneous process it is generalized by weighting point pairs within $r$ by an edge factor over the product of local intensities, $K_{\text{inhom}}(r)=\sum_{i,j}\mathbb{1}_{d(p_i,p_j)\le r}\,\frac{e(p_i,p_j,r)}{\lambda(x_i)\lambda(x_j)}$. (**spatstat** `Kest`/`Kinhom`.)
- **The $L$ transform**, $L(r)=\sqrt{K(r)/\pi}$, which stabilizes the estimator's variance; under a homogeneous Poisson process $L(r)=r$, giving a straight-line reference.
- **Pair correlation function** $g(r)=\frac{1}{2\pi r}\frac{dK}{dr}(r)$, a physics-style description of how point density varies with distance from a reference point. For a stationary Poisson process $g(r)\equiv1$; $g(r)<1$ indicates inhibition/repulsion at scale $r$, $g(r)>1$ indicates clustering (**spatstat** `pcf`).

Spatial *covariance* $\gamma(p_1,p_2)$ (the covariance of local counts at two locations) is the underlying second-order object; for a stationary process it depends only on the displacement between points, and if only on the distance (not direction) the process is *second-order isotropic*.

## 3. When It Applies

- **Linear (Gaussian) smoothing:** when noise is local/high-frequency and you can afford some blurring; bandwidth $\sigma$ should be smaller than the features you want to preserve.
- **Adaptive thresholding:** when background varies across the image (uneven illumination, stray signal) *and* target objects are sparse, so a local neighborhood is dominated by background. Choose the local-background bandwidth larger than the objects but smaller than the background's length scale.
- **Mixture-model global thresholding:** when a single cutoff suffices but you want it placed objectively from the intensity distribution rather than guessed; appropriate when background and foreground intensities are largely non-overlapping and background dominates.
- **Morphological opening / hole-filling:** as cleanup when binary masks have single-pixel speckle, ragged borders, or interior holes.
- **Connected-component labeling:** when foreground objects are physically separated in the mask; if they touch, it merges them.
- **Seeded Voronoi propagation:** when you already have reliable seeds (one per intended object) and need to extend them to full object regions, especially to *split touching objects* and to follow an intensity signal while keeping shapes compact; tune $\lambda$ to weight shape-compactness vs. signal-following.
- **Kernel intensity estimation:** to map first-order spatial variation in point density; pick $\sigma$ small enough to resolve real variation but large enough for adequate counts per window.
- **Poisson process as null:** as the baseline of "no spatial interaction" against which to test clustering/repulsion.
- **Choosing among $G$, $K$/$L$, $g$:** $G$ summarizes only nearest-neighbor scale; $K$/$L$ accumulate all neighbors out to distance $r$ (cumulative); $g$ is the non-cumulative density at distance $r$, best for reading off the *scale* at which clustering vs. inhibition occurs. Use the inhomogeneous versions ($K_{\text{inhom}}$, etc.) when intensity itself varies across space. Use marks to ask the question per object type or about interaction between types.

## 4. Assumptions & Validity Conditions

- **Adaptive thresholding assumes object sparsity:** the local neighborhood must be background-dominated, so the local average/quantile estimates background and not signal. If objects are dense, this fails and a different assumption is needed.
- **Mixture-model thresholding assumes** a recognizable background component (here log-Normal), that background pixels are the majority, and that foreground and background distributions are mostly non-overlapping; the multiple-of-width offset (e.g. six widths) is acknowledged as *ad hoc*.
- **Seeded propagation assumes** exactly one seed per intended object; it guarantees one region per seed, so missing or spurious seeds propagate directly into segmentation errors.
- **Stationarity (homogeneity):** $\lambda(p)$ constant. The homogeneous-Poisson summary functions ($G$ as written, $K$, $L$, $g$ baselines) assume it; when intensity varies, the *inhomogeneous* generalizations (with local-intensity weighting) are required instead.
- **Complete spatial randomness for the Poisson null:** independence of counts in non-overlapping regions and Poisson-distributed counts. Real objects of finite size *cannot* satisfy this at short range (they can't overlap), so a hard-core repulsion at small $r$ is expected even under attraction at larger scales.
- **Correct observation window:** point-pattern estimates depend on the assumed space. A rectangle that is larger than the true sampled region (e.g. tissue outline) mis-specifies density and biases the analysis; the convex hull, an external mask, or a density-based region may be more faithful.
- **Edge effects are a load-bearing concern, not a nuisance to ignore:** kernel intensity estimates and all second-order functions are biased near the window boundary because neighborhoods extend outside the observed space; edge-correction factors $e(\cdot)$ are part of the method, not optional polish.
- **Spatial calibration:** distances and areas are meaningful only with a known pixel-to-metric conversion; intensity is often *not* calibrated to physical units in practice, limiting cross-image intensity comparisons.

## 5. Failure Modes & Invalidity Patterns

- **Uneven background defeats global thresholding.** Warning sign: foreground recovered well in bright regions, lost in dim ones (or vice versa). Consequence: systematic over/under-detection across the image. Fix: adaptive (local) thresholding, but only if objects are sparse enough that the local window is background-dominated.
- **Touching objects merged by connected-component labeling.** A single label spans what should be several objects. Consequence: undercounting and corrupted per-object features. Mitigations conflict: raising the threshold/offset reduces merging but creates more interior holes (and shrinks objects); lowering it does the reverse — a genuine trade-off, not a free fix. Seeded propagation between objects is the structural remedy.
- **Seed errors propagate.** Because propagation yields one region per seed, a missed object (no seed) is never recovered and an over-split nucleus yields spurious objects. The segmentation is only as good as the seeds.
- **Treating the Poisson null as literally plausible at all scales.** Finite-size objects guarantee near-zero density at very short distances; reading this hard-core exclusion as evidence of biological "repulsion" confuses geometry with interaction. Conversely, scale matters: the same pattern can show short-range inhibition and longer-range clustering, so a single global "clustered vs. dispersed" verdict is misleading.
- **Ignoring inhomogeneity.** Applying homogeneous-Poisson summary functions to a pattern whose intensity actually varies across space can manufacture apparent clustering (points are simply denser where intensity is higher). Use intensity-corrected ($K_{\text{inhom}}$, $L_{\text{inhom}}$) versions.
- **Omitting edge correction.** Without it, kernel intensity estimates fall off artificially toward the boundary and second-order functions are biased, mimicking real spatial structure. The chapter shows the uncorrected intensity estimate visibly sagging at the window edge.
- **Mis-specified observation window.** Forcing the pattern into a rectangle larger than the true sampling region inflates the apparent empty space and distorts density and dependence estimates.
- **Reading raw stored pixel values as the true dynamic range.** Scanners may use only the lower bits of a nominal integer range, so values can sit far below the encoding maximum; analyzing without rescaling the actual dynamic range can mislead (rescaling by powers of two changes values but not the underlying precision).
- **Lossy compression of scientific images.** JPEG-style compression discards detail a human wouldn't notice but that may matter quantitatively; for scientific images prefer lossless formats.
- **Confusing intensity with class probability.** Estimating where points are dense (intensity) is a different question from estimating the probability that a point at a location belongs to a given class (relative risk); answering one when you need the other is a conclusion that doesn't follow from what was computed.
- **No universal segmentation method and no easy ground truth.** Best approach is data- and question-dependent; "ground truth" often rests on manual annotation of a few images, so quantitative segmentation accuracy claims should be made cautiously.

## 6. Empirical Checks & Calibration

- **Compare an empirical summary function against the Poisson-null curve.** This is the chapter's central calibration device: plot empirical $\hat G(w)$ against $1-e^{-\lambda\pi w^2}$; plot $\hat L(r)$ against the straight line $L(r)=r$; plot $\hat g(r)$ against the constant $g\equiv1$. Where the empirical curve lies *below* the null (fewer close neighbors than expected) → inhibition/repulsion at that scale; *above* → clustering. The crossing point locates the scale separating short-range exclusion from longer-range attraction.
- **Resolve clustering vs. inhibition by scale, not a single number.** The pair correlation $g(r)$ reads out, at each distance $r$, whether density is enriched ($>1$) or depleted ($<1$); inspecting it across $r$ is the diagnostic, and its sampling resolution can be increased by specifying a finer grid of $r$ values when computing $K_{\text{inhom}}$.
- **Use multiple edge-correction estimators as a robustness check.** Several corrections (e.g. Hanisch, border-corrected, Kaplan-Meier for $G$; border / modified-border for $L$) can be plotted together; when they essentially coincide, the conclusion is robust to the correction choice; when they diverge, edge bias is influential.
- **Toggle edge correction on/off** to *see* the boundary bias directly (the intensity estimate visibly drops near the window edge without correction) — a diagnostic for how much the boundary is distorting estimates.
- **Inspect the intensity histogram** (often log-scaled, zoomed to the bulk) to judge whether a mixture-model background assumption is reasonable and to place the threshold; overlay the chosen location and threshold to check placement.
- **Vary tuning parameters and watch the output.** Sweep the propagation weight $\lambda$, the smoothing bandwidth $\sigma$, the threshold offset, and structuring-element size, and observe the effect on segmentation/estimates — a sensitivity check substituting for an unavailable closed-form guarantee.
- **Screen objects by plausibility.** Use per-object area (and other features) to flag and remove objects that are implausibly large or small, and inspect feature scatterplots to confirm features carry distinct (not perfectly redundant) information.
- **Replicate the comparison across conditions.** Computing the same second-order function across biological conditions (e.g. healthy vs. diseased) and comparing the curves is how a spatial-structure difference is established, rather than asserting it from one pattern.

## 7. Interpretation, Guidance & Trade-offs

- **What a second-order function does and doesn't license:** an empirical $G$, $K$/$L$, or $g$ departing from the Poisson baseline establishes *statistical* departure from complete spatial randomness at given scales — it does not by itself identify the *mechanism* (attraction, environmental gradient, finite size). Short-range depletion is often just geometry (objects can't overlap), not interaction.
- **Read the scale.** Always interpret clustering/repulsion *as a function of distance*; report the scales at which each occurs rather than a single label. The same data can be inhibited at short range and clustered farther out.
- **Honor inhomogeneity and edges.** For trustworthy spatial conclusions, hold fixed and report the observation window, whether intensity correction was used (homogeneous vs. inhomogeneous estimator), and which edge correction was applied; prefer $L$ over $K$ for analysis/simulation because of its variance-stabilizing square root.
- **Segmentation: start simple, refine.** For high-throughput work a fast, low-parameter, "good enough" segmentation is often preferable to an optimal but fragile one; accuracy gains come mainly from injecting prior knowledge about expected object shapes, sizes, and relations. Accept that there is no universally best method and that thresholds/offsets are tuned, not derived.
- **Thresholding choices are trade-offs:** local mean (fast, linear) vs. local median/low-quantile (more robust, costlier); global mixture threshold (objective, simple) vs. full per-pixel classification (more powerful, more complex). The offset above background is a tunable, somewhat arbitrary knob.
- **Storage:** prefer lossless formats for scientific images; reserve lossy compression for images where imperceptible detail loss is acceptable. Be aware images are typically stored in wasteful 64-bit floats for compatibility, which is rarely limiting on modern hardware.
- **High-throughput imaging is like other high-throughput genomics data:** once features are extracted, summarize with means/variances, test between conditions, do ANOVA, dimension reduction, clustering, and classification — and guard against batch effects (staining efficiency, illumination) through experimental design, exactly as elsewhere.
- **Calibrate space, not necessarily intensity.** Spatial calibration (pixel↔metric) is cheap and valuable; physical-unit intensity calibration is often skipped and may be unnecessary, but its absence limits quantitative cross-image intensity comparison.

## 8. Connections & Key Terms

**Builds on:** treating data as arrays and applying ordinary algebra; mixture models (used for global thresholding); kernel density estimation (reused for spatial intensity); the Poisson distribution (as the count model for complete spatial randomness); robust location/scale estimation (for background parameters).

**Sets up:** a features-by-objects matrix that feeds downstream multivariate analysis — clustering (finding subpopulations), classification (assigning cell types/phenotypes), dimension reduction, hypothesis testing and ANOVA across conditions; and a marked point pattern that feeds spatial-dependence analysis and between-condition spatial comparisons. It connects images to genetics by treating them as complex, multivariate quantitative phenotypes.

**Key terms:**
- **Segmentation** — partitioning an image into objects vs. background, then into individual objects.
- **Convolution / linear filter** — replacing each pixel by a weighted sum of its neighborhood; the basis of smoothing.
- **Bandwidth ($\sigma$)** — the spatial scale of a smoothing kernel; larger means more averaging.
- **Adaptive thresholding** — foreground/background separation using a locally estimated, spatially varying threshold.
- **Morphological operations** — nonlinear neighborhood operations on binary images (erode, dilate, opening, hole-filling) defined via a structuring element.
- **Connected-component labeling** — assigning a distinct integer to each maximal connected foreground region.
- **Voronoi tessellation** — assigning each location to its nearest seed; here generalized to a metric weighting lateral vs. elevation movement via $\lambda$.
- **Seeded propagation** — growing one object region per seed within a mask using such a metric.
- **Feature extraction** — computing per-object descriptors (intensity, shape, texture).
- **(Marked) point process** — a random set of isolated locations in a space, optionally tagged with attributes.
- **Observation window** — the bounded space the pattern is defined on; estimates depend on it.
- **Intensity ($\lambda$)** — first-order property: expected number of points per unit area (constant if stationary).
- **Stationary / homogeneous** — spatial properties invariant across the region ($\lambda$ constant).
- **Second-order isotropic** — second-order dependence depends only on inter-point distance, not direction.
- **Homogeneous Poisson process** — the complete-spatial-randomness null: constant intensity, independent counts in disjoint regions, Poisson counts with mean $\lambda A$.
- **Complete spatial randomness** — absence of spatial interaction; the Poisson-process condition.
- **Edge correction** — adjustment removing bias from neighborhoods that extend beyond the observation window.
- **Relative risk** — spatially varying conditional probability that a point belongs to a given mark class.
- **$G$ function** — distribution of nearest-neighbor distances; Poisson form $1-e^{-\lambda\pi w^2}$.
- **Ripley's $K$ function** — expected count of additional points within distance $r$ of a typical point, scaled by $\lambda$; a second-order moment summary.
- **$L$ function** — variance-stabilizing transform $\sqrt{K(r)/\pi}$; equals $r$ under the Poisson null.
- **Pair correlation function ($g$)** — non-cumulative density-vs-distance summary; $1$ under Poisson, $<1$ inhibition, $>1$ clustering.
- **Inhomogeneous estimators** — $K_{\text{inhom}}$, $L_{\text{inhom}}$ etc. that correct for spatially varying intensity.
- **Lossless vs. lossy compression** — exact reconstruction vs. discarding imperceptible detail; prefer lossless for scientific images.
