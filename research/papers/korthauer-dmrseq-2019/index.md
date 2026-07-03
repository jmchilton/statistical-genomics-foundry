---
title: "Detection and accurate false discovery rate control of differentially methylated regions from whole genome bisulfite sequencing"
type: paper
source_id: korthauer-dmrseq-2019
source_url: "https://web.archive.org/web/20240420211941/https://www.biorxiv.org/content/10.1101/183210v1.full"
doi: 10.1093/biostatistics/kxy007
access_date: "2026-06-30"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Korthauer K, Chakraborty S, Benjamini Y, Irizarry RA. bioRxiv 183210 (2017). Published: Biostatistics 20(3):367-383, 2019. The CC-BY-4.0 license and this note cover the bioRxiv PREPRINT (v1, 2017-08-31; license=cc_by per bioRxiv API), NOT the paywalled published Biostatistics 2019 version."
derived: "Verbatim load-bearing quotes permitted (CC-BY). Quotes in section 7 are exact from the preprint; equation/table/figure images were not machine-readable and are described, not transcribed."
---

*Faithful clean-context note: read ONLY the source (bioRxiv 183210 v1 full text, via Wayback snapshot) + its `guidance.md`. License mode = **CC-BY**, so short verbatim load-bearing quotes are reproduced. Boundary: this is the **2017 preprint**, not the 2019 published Biostatistics article; the published PMC record (PMC6587918) carries only the abstract under an Oxford "publisher-standard" (paywalled) license. Equations, tables, figures, and the Supplementary Materials were NOT readable — items deferred there are flagged as unanswered. Project framing lives in the flagged footer.*

## 1. Citation
Korthauer K, Chakraborty S, Benjamini Y, Irizarry RA. "Detection and accurate False Discovery Rate control of differentially methylated regions from Whole Genome Bisulfite Sequencing." bioRxiv 183210, posted 2017-08-31, v1, CC-BY; category genomics. Published as Biostatistics 20(3):367-383, 2019, DOI 10.1093/biostatistics/kxy007.

## 2. Access note
Publisher version (Oxford/Biostatistics) is paywalled; PMC6587918 exposes only the abstract under a "publisher-standard" license. The open version is the bioRxiv CC-BY preprint (v1). bioRxiv is Cloudflare-protected (direct fetch 403'd); full text obtained from a Wayback Machine snapshot (20240420211941) of `biorxiv.org/content/10.1101/183210v1.full`. Body text was fully readable. **Not readable:** all displayed equations (image-rendered), all Tables 1-5 (image-rendered), all Figures, and the Supplementary Materials (which hold most numeric defaults and the more-than-two-condition extension). Preprint-vs-published differences (e.g., parameter defaults, exact simulation numbers, the package becoming Bioconductor) are possible and unverified here.

## 3. Thesis
Detecting differentially methylated **regions** (DMRs) from WGBS by chaining significant single loci, or by scanning the genome and testing the same regions, does not give valid region-level inference and does not control region-level FDR. dmrseq is a two-stage method that (1) detects candidate regions de novo and (2) scores each with an approximately exchangeable region statistic whose null is built by a **permutation that re-runs detection**, pooling region statistics genome-wide -- yielding accurate FDR control with as few as two samples per condition.

## 4. Problem & context
- WGBS measures methylation at single-base resolution; ~30 million CpG loci in the human genome. Biologists care about regions, not single loci.
- Most WGBS methods test differentially methylated **loci** (DML) one at a time; constructing DMRs by chaining significant DMLs gives no proper region-level significance and does not control region FDR.
- Two structural constraints: (a) very high dimensionality with **low sample size** -- WGBS cost limits studies to ~2-3 biological replicates per condition (ENCODE murine embryos: 2 per tissue/timepoint; UCSD Human Reference Epigenome: 2-3 per tissue); (b) count data with coverage-dependent variance and spatial correlation between nearby loci, violating Gaussian/independence assumptions and large-sample approximations.
- Region-FDR != loci-FDR: many correct loci-level rejections inflate the FDR denominator and artificially lower apparent loci-FDR relative to region-FDR (analogy to ChIP-seq peak calling).
- Two challenges specific to region inference: defining data-driven region boundaries, and getting a known null distribution for a test statistic computed over regions of varying size.

## 5. Method/approach
**Two-stage procedure.**

**Stage 1 -- construct candidate regions (de novo).**
- Estimate per-condition mean methylation proportion at locus i by **pooling** reads across samples in the condition: sum of methylated reads / sum of coverage (gives more weight to high-coverage measurements). Compute the pooled proportion **difference** between conditions.
- **Smooth** the per-locus estimates with a local-likelihood smoother (Loader, 1999) -- same motivation as BSmooth (Hansen, Langmead & Irizarry, 2012) -- to combat low-coverage power loss. Smoothing weights w_i = median coverage at locus i, scaled by the average Median Absolute Deviation (MAD) within sample groups (emphasizes high-coverage, low-within-group-variability loci).
- **Segment** the genome into candidate regions: contiguous loci whose smoothed, scaled, pooled proportion difference is in the same direction and exceeds a threshold in absolute value. Maximum spacing between loci within a region is capped by a predetermined value; low-difference loci at region ends are trimmed. (Detailed segmentation/trimming/threshold defaults are in Supplementary 2.2-2.3 -- **not readable here**.) The threshold is chosen **liberally** (capture all true differences regardless of false positives), because significance is decided in Stage 2.

**Stage 2 -- region-level statistic.**
- Model counts as Binomial with a Beta-distributed probability per condition (Beta-Binomial) to capture biological variability.
- Transform proportions with an **arcsine link**: Z_ijr = arcsin(2*M_ijr/N_ijr - 1), proposed by Park & Wu (2016), to stabilize the variance's dependence on mean methylation; variance of Z then depends only on coverage N and Beta-Binomial dispersion -- making the statistic comparable (exchangeable) across regions with different mean methylation.
- Fit a **Generalized Least Squares (GLS)** regression of transformed proportions on the effect of interest, with **loci-specific intercepts** beta_0lr and a single effect coefficient beta_1r. Chosen over Beta-Binomial GLM/GLMM because GLS has stable approximate closed-form estimates and avoids boundary/separation instability; coverage information lost in transformation is reinjected via coverage-dependent **variance weights**.
- Covariance V_r: variance weighting for coverage dependence (variance approximated as identical across samples at a locus, using median_j(N_ijr), to keep the permutation test valid) + a **continuous autoregressive CAR(1)** correlation structure for nearby-loci correlation (correlation decays with inter-locus interval length tau via coefficient phi_r). For regions with **>40 loci**, the simpler discrete **AR(1)** (correlation parameter rho_r) is used for speed; AR(1) approximates CAR(1) as spacing approaches constant.
- **Region statistic = the t-statistic t_r from the Wald test of H0: beta_1r = 0.** Computed with the `gls` function in the `nlme` R package (Pinheiro et al., 2017).

**Permutation null + FDR.**
- Permute the values of the covariate of interest (biological group) and **repeat the previous steps** (i.e., re-detect candidate regions AND recompute region statistics under each permutation). Because the statistic is approximately exchangeable across the genome, the region statistics from genome-wide candidate regions detected across permutations are **pooled into one approximate null distribution** -- feasible with as few as two samples per condition.
- **Empirical p-value** = observed region t-statistic compared against the **entire pooled null set** of statistics from all permutations.
- **FDR control** = Benjamini-Hochberg (1995) adjustment of those empirical p-values.

**Software.** Open-source R package **dmrseq** (preprint: on GitHub, https://github.com/kdkorthauer/dmrseq; paper-analysis scripts at https://github.com/kdkorthauer/dmrseqPaper). Input: WGBS methylated/unmethylated counts per CpG, e.g. from **Bismark** (Krueger & Andrews, 2011); CpGs must be covered by >=1 read in **every** sample. Differential expression in case studies via **DESeq2 v1.14.1**.

## 6. Key claims/findings (atomic)
- Chaining significant DMLs into DMRs does not give proper region significance and does not control region FDR (Robinson et al., 2014). Loci-level FDR control != region-level FDR control.
- Existing genome-scanning region methods do not control FDR: Wen et al. (2016) simulation FDRs were "as high as 0.85" and varied widely; Juhling et al. (2016) (metilene) also fails to achieve accurate FDR control.
- In null simulations (no true DMRs): **dmrseq identified 0 DMRs at FDR 0.05 -- and still 0 even at FDR 0.5**, for both N2 (2/group) and N3 (3/group). By contrast metilene found "a small number," DSS "many hundreds," BSmooth "tens of thousands" (default settings).
- With simulated DMRs (D2, D3 = 3,000 added DMRs): dmrseq accurately controls region FDR (specified vs observed FDR track); metilene does not; BSmooth and DSS have no way to specify a region FDR level at all.
- BSmooth/DSS have many true positives but at the cost of uncontrolled FDR; metilene has few false positives but low power. At similar observed FDR, **dmrseq achieves higher power** than all alternatives.
- Power defined as proportion of simulated DMRs overlapped by >=1 identified DMR; FDR as proportion of identified DMRs overlapping no simulated DMR.
- In human tissue and murine leukemia data, dmrseq DMRs are enriched for inverse association with differential expression of nearby DE genes, with enrichment **stronger at lower FDR thresholds**; this ranking behavior is stronger/more consistent than alternatives (metilene's FDR ranking shows no consistent association with expression).
- dmrseq down-ranks high-variability regions that area-based or mean-difference statistics (BSmooth/DSS) rank highly -- its statistic accounts for between-sample and between-loci variability that those naive statistics ignore.
- Murine leukemia: dmrseq finds most DMRs in the AML-vs-control comparison, which also has the most DE genes; DSS/metilene find most DMRs in the comparison with the fewest DE genes.

## 7. Load-bearing statements (verbatim, CC-BY)
- Naive chaining / loci-vs-region FDR: *"While DML approaches may construct DMRs by chaining together neighboring significant loci, this type of approach will not yield a proper assessment of the statistical significance of the constructed regions, nor will the False Discovery Rate (FDR) be properly controlled"* ... *"controlling the FDR at the level of individual loci is not the same as controlling FDR of regions"*.
- Magnitude of failure: *"Those methods that scan the genome for DMRs and provide inference at the region level do not properly control FDR ... This is evidenced, for example, by the FDRs reported in the simulation studies of Wen et al. (2016), which were as high as 0.85 and widely varied across scenarios. Juhling et al. (2016) also do not achieve accurate FDR control in simulation studies".*
- Exchangeable statistic enabling pooling: *"Such an exchangeable statistic allows us to generate an approximate null distribution by pooling genomewide candidate regions detected from permutations."*
- The permutation mechanism (re-detection under the null + pooled null + BH): *"The values of the covariate of interest (e.g. biological group) are permuted and the previous steps repeated in order to generate a set of statistics under the null hypothesis. Since the statistics account for known sources of variation that would otherwise prevent to comparison of regions across the genome, we can pool them together to form an approximate null distribution with as few as two samples per population. The empirical p-value is calculated by comparing the observed test statistics to the entire null set of statistics from all permutations. Control of FDR is carried out by adjusting the p-values using the procedure of Benjamini and Hochberg (1995)."*
- Two-replicate claim: *"Significance of each region is assessed via a permutation procedure which uses a pooled null distribution that can be generated from as few as two biological replicates, and false discovery rate is controlled using the procedure of Benjamini and Hochberg (1995)."* and (Discussion) *"we are able to borrow strength across the genome to build a null distribution that permits inference with a sample size as small as 2."*
- Region statistic: *"we assess the strength of the effect of the covariate of interest on methylation level within region r using the t-statistic t_r from the Wald test of the null hypothesis that beta_1r = 0. Parameter estimates and their standard errors are obtained with the 'gls' function in the 'nlme' package".*

## 8. Scope / assumptions / limitations
- Applies to **WGBS** data: per-CpG methylated + unmethylated read counts.
- Requires CpGs **covered by >=1 read in every sample**; pre-filtering low-coverage sites is allowed but **may lose power** in low-coverage regions.
- Two biological conditions in the main exposition; >2 conditions handled in Supplementary 2.7 (not readable here).
- Region statistic relies on the arcsine transform making statistics approximately **exchangeable** across regions; validity of pooling and of the permutation null rests on this.
- Permutation validity requires the conditional variance to be invariant to permutation -- achieved by approximating coverage as identical across samples at a locus (median).
- CAR(1) is exact intent; **AR(1) is a speed approximation** for regions >40 loci (assumes equally spaced loci).
- GLS does not model counts directly (works on transformed proportions); coverage dependence handled only approximately via variance weights.
- Candidate-region threshold is a user choice (recommended liberal); segmentation/spacing/trim parameters and their defaults are in the Supplement.

## 9. Failure modes / invalidity patterns (referee-relevant)
- **Select-then-test on the same regions (the double-dip):** detecting candidate regions by genome scan and then testing those same regions inflates false discoveries because the selection (genome-wide scan) is not accounted for -- "the null statistics are calculated on an enriched set of regions" and the resulting null is unknown. dmrseq's fix: **re-run region detection inside each permutation** so the null carries the same selection/scanning step, then pool the resulting region statistics.
- **Chaining significant DMLs into DMRs:** does not control region FDR; loci-level FDR control silently fails to control region-level FDR (denominator inflation).
- **Naive region statistics (area statistic, mean-difference averaged across loci):** ignore between-sample biological variability and nearby-loci covariance, so high-variability regions get large statistics by chance -> inflated FDR and/or reduced power. dmrseq explicitly down-ranks such regions.
- **FWER permutation a la Jaffe et al. (2012):** infeasible with only a few samples per population -- motivates the pooled-null exchangeable-statistic approach instead.
- **Tools with no specifiable region FDR (BSmooth, DSS):** users must pick loci-level thresholds by default or trial-and-error; these do not map to a region-level FDR.
- **Empirical detector of the failure:** the **null comparison** (split samples from one biological condition into two pseudo-groups). A method that controls region FDR should find ~no DMRs; in this paper dmrseq found 0 (even at FDR 0.5) while BSmooth found tens of thousands and DSS hundreds -- the null comparison is the diagnostic that exposes select-then-test FDR miscontrol.

## 10. What it does NOT address
- Non-WGBS assays beyond passing mention (RRBS only as where fixed-window methods apply; methylation arrays only as contrast).
- Single-locus (DML) inference as a deliverable -- explicitly reframed away from.
- A closed-form/analytic null; the null is permutation-based and empirical.
- Choice of the candidate-region detection threshold is left to the user; no automatic selection rule given in the readable body.
- Exact numeric default parameters, the precise segmentation algorithm, the >2-condition extension, and per-dataset counts -- all deferred to Supplementary Materials (not readable here).
- Runtime/compute benchmarking is only qualitative ("efficient," ">40 loci use AR(1) for speed").

## 11. Open questions / ambiguities
- **dmrseq's main user-facing function name and its parameter names/defaults** (e.g., the candidate-region cutoff value) are NOT in the readable preprint body -- they live in the Supplement / package docs. The preprint names only the internal `gls`/`nlme` call. [GAP vs guidance]
- Preprint calls dmrseq an "R package ... available on GitHub"; whether it is a **Bioconductor** package is a published-version/post-2017 fact, not stated in this source. [unverified here]
- Exact number of permutations used, and how the pooled null size scales with sample size, not given in the readable body.
- Source text has incidental typos in the snapshot (e.g., "arcin" for arcsin; "metiline"/"metline" for metilene; "form each" for "from each"); method/tool names normalized above.

## 12. Guidance answers
- **Does the paper state naive region-detection-then-test fails to control FDR? Magnitude?** Yes. Chaining DMLs "will not yield a proper assessment ... nor will the FDR be properly controlled"; genome-scanning region methods "do not properly control FDR." Magnitudes: Wen et al. (2016) FDRs "as high as 0.85"; in this paper's null simulations, default BSmooth found tens of thousands and DSS hundreds of DMRs where the truth is zero, vs dmrseq's 0 (even at FDR 0.5). The mechanism: null statistics are computed on a selection-enriched set of regions whose null is unknown.
- **How is the null built (permutation, pooled)?** Permute the covariate of interest (biological group); **repeat the candidate-region detection and statistic computation** under each permutation; pool the resulting genome-wide region statistics into one approximate null distribution. Empirical p-value = observed statistic vs the entire pooled null set across all permutations. Re-detection under permutation is what accounts for the selection/scanning step. (Verbatim in section 7.)
- **What is pooled / how is the region p-value formed?** Pooled = the region-level t-statistics from candidate regions detected across all permutations (made comparable by the arcsine-transformed exchangeable statistic). Region p-value = empirical rank of the observed t_r within that pooled null set.
- **"As few as two biological replicates"?** Stated repeatedly: pooled null "can be generated from as few as two biological replicates"; "inference with a sample size as small as 2." Enabled by the exchangeable statistic letting the null be pooled genome-wide rather than per-region (so the few-sample permutation set need not be large per region).
- **Region-level test statistic?** The Wald t-statistic t_r for beta_1r = 0 from a GLS regression of arcsine-transformed methylation proportions on the effect of interest, with loci-specific intercepts, coverage-based variance weights, and a CAR(1) (or AR(1) for >40 loci) correlation structure. It summarizes the across-CpG effect while accounting for between-sample and between-loci variability.
- **How is FDR controlled?** Benjamini-Hochberg (1995) adjustment of the permutation-based empirical region p-values.
- **Scope/assumptions (WGBS, smoothing, replicates/coverage)?** WGBS counts; CpGs covered >=1 read in every sample; local-likelihood smoothing (Loader 1999) with coverage x (1/MAD) weights; designed for very small replicate counts (>=2/condition); coverage-dependent variance modeled via the arcsine transform + variance weights.
- **Software (Bioconductor package, key function, parameters)?** R package **dmrseq** (preprint: GitHub; "Bioconductor" not asserted in this source -- [GAP]). Internal fit via `gls` in the `nlme` package. Inputs from **Bismark**; DE via **DESeq2 v1.14.1**. The main dmrseq function name and parameter defaults are **not in the readable body** [GAP -- deferred to Supplement/package docs].
- **Must-quote items (naive miscontrol, re-run/pool null mechanism, two-replicate minimum):** all supplied verbatim in section 7 (license = CC-BY permits it).

## Relevance to this project  `[design-inference — author-added, not from source]`
- **Pole:** established-good (remedy). The **methylation** operationalization of the [[double-dipping]] `select-extreme-then-test` signature's fix, and already cited inside bioSkills `methylation-analysis/dmr-detection` — so ingesting it closes a loop the corpus survey flagged.
- **Grounds** the `required_action` the [[audit-method-validity]] referee emits for `scenarios.md` case `double-dip-region-selection-then-test`: a selection-aware permutation null that **re-runs region detection under permuted labels**, not a null over fixed regions.
- **The portable mechanism worth carrying into the leaf:** *re-detect the selected unit inside each permutation so the null carries the same selection step.* This is the general permutation-null remedy ([[kriegeskorte-2009]]'s "run it under the null" made operational for genome scans) and generalizes beyond methylation.
- **Calibrate hook (Family B):** the **null comparison** (split one condition into two pseudo-groups; a valid method finds ~0 DMRs) is a concrete empirical detector of select-then-test FDR miscontrol — a ready `[[derive-null-and-calibration]]` check, and exactly the kind of test the gate can demand.
- **Co-cite:** [[kriegeskorte-2009]] (the principle), [[gao-clusterpval-2024]] / [[neufeld-countsplit-2024]] (the same select-then-test logic in scRNA-seq, different remedies). Open `[GAP]`: dmrseq's user-facing function name + parameter defaults (Supplement/package docs) — fill via a `guidance.md` re-summarize or the package vignette.
