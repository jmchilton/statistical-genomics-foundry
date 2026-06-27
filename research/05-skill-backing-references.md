# Skill-backing references + recoverability assessment

> For each of the 10 cross-cutting bioSkills (see the relevance map / issue #2), the primary
> sources we could author a **traceable** comparable skill from, and an honest assessment of
> **how much of the skill recovers in a principled way** (every claim → a real source) vs. how
> much is irreducibly convention with no clean primary citation.
>
> **Why this note exists.** The blind-regeneration experiment (issue #2) showed a frontier model
> regenerates these skills' *content* — including citations *from memory, fuzzy ones included*.
> The point of the Foundry pattern is not the content; it's that every claim **traces**. This note
> is the trace: references verified to *exist* (not recalled), so a cast skill can cite by URL/DOI.
>
> **Method.** Candidate refs (recalled) were handed to verification agents with one rule: return
> nothing you can't confirm resolves. Tags: `[VF]` page fetched · `[VS]` search-confirmed
> (title/authors/venue/DOI corroborated). Confabulation found: **none** — but several recalled
> glosses were wrong (corrections inline). That asymmetry — refs real, *glosses* wrong — is itself
> the traceability argument: a skill written from memory looks right and mis-states specifics.

## Textbook / book-style anchors (the spines we reuse everywhere)

No single general-stats textbook was linked before; these four book-style open resources anchor
most skills and should be adopted as standing corpus:

- **Holmes & Huber, *Modern Statistics for Modern Biology* (MSMB)** — free, Bioconductor-aligned.
  `https://web.stanford.edu/class/bios221/book/` (EMBL mirror `https://www.huber.embl.de/msmb/`).
  Ch.6 Testing (multiple-testing), Ch.8 count data (DESeq2), Ch.12 supervised learning (CV/leakage).
  The Huber group also authored the independent-filtering + IHW papers → ties skill 4 to primaries.
- **OSCA — *Orchestrating Single-Cell Analysis with Bioconductor*** — `https://bioconductor.org/books/release/OSCA/`
  (split post-3.12 into `OSCA.basic` clustering/marker chapters, `OSCA.multisample` integration). CC BY.
- **GWASTutorial** (UTokyo, Kamatani lab) — `https://cloufield.github.io/GWASTutorial/`.
- **van Buuren, *Flexible Imputation of Missing Data* (FIMD), 2nd ed. 2018** — free full text
  `https://stefvanbuuren.name/fimd/` (corrected: 2018, not 2012).

> "The textbook we're sort of linking" = **OSCA** (the only book linked pre-this-note). MSMB is the
> better *general*-stats anchor and is newly recommended above.

## Recoverability scale

Each skill split into three layers, each graded High / Medium / Low recoverable-with-citation:
- **Procedure spine** — the canonical workflow/method ordering.
- **Validity axis** — the cardinal sin the Family-B referee exists to catch (the part bioSkills carries but can't trace).
- **Defaults / thresholds** — concrete numbers (params, cutoffs). Usually the *gap*: convention, no primary.

---

## 1 — machine-learning/model-validation (data leakage)

**Spine:** MSMB Ch.12 (free, inner/outer-loop nested CV) + scikit-learn "Common pitfalls" page.
**Validity axis (clean primary):** Kaufman et al. 2012 *ACM TKDD* 6(4):15 (leakage formulation) `[VS]`;
Cawley & Talbot 2010 *JMLR* 11:2079 (nested CV / selection bias) `[VS]`; Ambroise & McLachlan 2002
*PNAS* 99(10):6562 `[VS]`; Varma & Simon 2006 *BMC Bioinformatics* 7:91 `[VS]`.
**Calibration:** scikit-learn §1.16; Niculescu-Mizil & Caruana 2005 *ICML* `[VS]`.
**Tutorials/refs:** scikit-learn CV + Common-pitfalls + calibration guides `[VF]`.
**Wikipedia:** "Leakage (machine learning)", "Cross-validation (statistics)" `[VF]`.

**Recoverability:** spine **High**, validity **High**, thresholds **Low** — no citable numeric
calibration cutoff (ECE has no decision-grade threshold). Optimism-correction (.632+ bootstrap,
Efron & Tibshirani 1997) addable if wanted. **~90% recoverable; the 10% gap is "what ECE counts as bad."**

## 2 — single-cell/clustering (double-dipping / circular analysis)

**Spine:** OSCA Clustering + Marker-detection chapters (`OSCA.basic`) — *the marker chapter itself
states the double-dipping caveat*, uniting method + validity in one free source `[VS]`.
**Validity axis (clean primary, strong):** Neufeld et al. 2024 *Biostatistics* 25(1):270 (count-splitting)
`[VS]`; Gao, Bien, Witten 2024 *JASA* 119(545):332 (selective inference for clustering) `[VS]`;
Zhang, Kamath, Tse 2019 ***Cell Systems*** 9(4):383 (TN test — corrected: published, not a preprint) `[VS]`;
Lähnemann et al. 2020 *Genome Biology* 21:31 `[VS]`.
**Method primaries:** Traag et al. 2019 *Sci Rep* 9:5233 (Leiden) `[VS]`; McInnes et al. 2018 arXiv:1802.03426 (UMAP).
**Tutorials/refs:** Scanpy clustering tutorial + API; Seurat PBMC3k vignette `[VS]`.

**Recoverability:** spine **High**, validity **High**, **defaults Medium** — Scanpy `leiden`
default `resolution=1.0` confirmed, but `sc.pp.neighbors`/`pca` defaults and Seurat
`FindClusters` default (`0.8`, the tutorial *uses* 0.5) need live-API verification; Scanpy's
`flavor` default changed (`leidenalg`→`igraph`) across versions. **~85% recoverable; pin params to a tool version.**

## 3 — differential-expression/batch-correction (confounding, unfixable aliasing, correct-then-test)

**Spine / validity axis (the cardinal sin, clean primary):** Nygaard, Rødland, Hovig 2016
*Biostatistics* 17(1):29 — removing batch then testing inflates confidence, catastrophically under
unbalanced designs `[VS]`. Tool-level corroboration: **limma `removeBatchEffect` doc explicitly says
not to use it before linear modelling** (use it only for plots) `[VS]`; DESeq2 vignette: model batch
as `~ batch + condition`, don't correct-then-test `[VS]`.
**Methods:** Leek et al. 2010 *Nat Rev Genet* 11:733 (overview, paywalled) `[VS]`; Johnson et al. 2007
(ComBat) `[VS]`; Zhang et al. 2020 *NAR Genom Bioinform* (ComBat-seq, OA) `[VS]`; Leek & Storey 2007
*PLoS Genet* (SVA) `[VS]`; Risso et al. 2014 *Nat Biotechnol* (RUVSeq) `[VS]`.
**Tutorials/refs:** sva vignette; OSCA.multisample integration chapter. **Wikipedia:** "Batch effect" (exists) `[VS]`.

**Recoverability:** spine **High**, validity **High**, **the fully-*unfixable* aliasing claim Medium** —
stated qualitatively across Leek 2010 / Nygaard 2016 / OSCA but no single crisp citable "complete
confounding is uncorrectable" sentence; cite Nygaard + Leek jointly. **~85% recoverable.**

## 4 — experimental-design/multiple-testing (error control under dependence)

**Spine:** MSMB Ch.6 (FWER/BH/local-FDR/IHW with R) `[VF]` — *the* spine.
**Validity axis / methods (clean primaries):** Benjamini & Hochberg 1995 *JRSS-B* 57:289 `[VS]`;
Benjamini & Yekutieli 2001 *Ann Stat* 29:1165 (PRDS, OA) `[VS]`; Storey 2002 *JRSS-B* 64:479
("A direct approach to false discovery rates" — corrected: q-value is the method, not the title) `[VS]`;
Storey & Tibshirani 2003 *PNAS* 100:9440 `[VS]`; Bourgon, Gentleman, Huber 2010 *PNAS* 107:9546
(independent-filtering trap) `[VS]`; Ignatiadis et al. 2016 *Nat Methods* 13:577 (IHW) `[VS]`;
Holm 1979 / Hochberg 1988 / Hommel 1988 `[VS]`; Efron 2004 *JASA* + 2008 *Stat Sci* (empirical null) `[VS]`.
**Gotcha (confirmed from primary docs):** `statsmodels…multipletests` **default is `'hs'` (Holm–Sidak), not BH**
— must pass `fdr_bh` `[VF]`; `scipy.stats.false_discovery_control` default `'bh'` `[VF]`.
**GWAS 5e-8:** Pe'er et al. 2008 *Genet Epidemiol* 32(4):381 `[VF]` + Dudbridge & Gusnanto 2008 (~7.2e-8) `[VF]`.
**Wikipedia:** FDR, FWER, Multiple comparisons `[VS]`.

**Recoverability:** spine **High**, validity **High**, thresholds **High** (even the 5e-8 traces — to
Pe'er, **not** HapMap; HapMap supplies LD counts only). **~95% recoverable — the best-traceable of the ten.**

## 5 — population-genetics/association-testing (calibration-as-diagnostic + method selection)

**Spine:** Marees et al. 2018 *Int J Methods Psychiatr Res* 27(2):e1608 (OA, PMC6001694) + GWA_tutorial repo
— only peer-reviewed source integrating QC/λGC/QQ + stratification + association reproducibly `[VS]`.
**Validity axis / methods (clean primaries):** LDSC — Bulik-Sullivan et al. 2015 *Nat Genet* 47:291
(intercept separates confounding from polygenicity; OA PMC4495769) `[VF]`; Devlin & Roeder 1999
*Biometrics* (genomic control / λGC) `[VS]`; Price et al. 2006 *Nat Genet* 38:904 (PCA for stratification —
**added**) `[VF]`; SAIGE — Zhou et al. 2018 *Nat Genet* 50:1335 (corrected title; GLMM+SPA is the method) `[VF]`;
regenie — Mbatchou et al. 2021 *Nat Genet* 53:1097 (corrected: LOCO whole-genome regression headline;
Firth/SPA are binary-step options) `[VF]`; GCTA fastGWA — Jiang et al. 2019 `[VS]`; BOLT-LMM — Loh et al.
2015 *Nat Genet* 47:284 (note distinct 2018 biobank-scale paper) `[VF]`.
**CLI:** PLINK 1.07 (Purcell 2007, OA) + PLINK2 (Chang 2015, OA); LDSC repo+wiki.
**Wikipedia:** "Genome-wide association study"; **"Population structure (genetics)"** (corrected — "population stratification" redirects) `[VF]`.

**Recoverability:** spine **High**, validity **High**, thresholds **High**. Richest existing base (research/02).
**~95% recoverable.** Gap: SAIGE-GENE rare-variant (Zhao 2020) needs its own pass if in scope.

## 6 — causal-genomics/mendelian-randomization (untestable assumptions + sensitivity battery)

**Spine:** Sanderson et al. 2022 *Nat Rev Methods Primers* 2:6 (current consensus; IV assumptions +
estimator/sensitivity battery; paywalled) — OA fallback **Davey Smith & Hemani 2014** *Hum Mol Genet*
23(R1):R89 (PMC4170722) `[VF]`.
**Reporting standard (two papers, both 26 Oct 2021):** STROBE-MR Statement — Skrivankova et al.
*JAMA* 326(16):1614 `[VF]`; Explanation & Elaboration — *BMJ* 375:n2233 (OA PMC8546498) `[VF]`.
**Methods (clean primaries):** MR-Egger — Bowden et al. 2015 *IJE* 44:512 `[VF]`; weighted median —
Bowden, Davey Smith, **Haycock**, Burgess 2016 *Genet Epidemiol* 40:304 (OA; corrected author list) `[VF]`;
MR-PRESSO — Verbanck et al. 2018 *Nat Genet* 50:693 (OA) `[VS]`; IVW — Burgess et al. 2013; weighted mode —
Hartwig et al. 2017 *IJE* (OA); Steiger directionality — Hemani et al. 2017 *PLoS Genet* (OA) `[VF]`.
**Refs:** TwoSampleMR docs `https://mrcieu.github.io/TwoSampleMR/`. **Book:** Burgess & Thompson 2nd ed. 2021.
**Wikipedia:** "Mendelian randomization" `[VS]`.

**Recoverability:** spine **High**, validity/sensitivity battery **High**, **the "three IV assumptions"
single-origin Low** — concept is from IV econometrics (Angrist/Imbens/Rubin), no single genomics primary;
cite Lawlor et al. 2008 *Stat Med* as earliest clean MR-context statement, don't claim a single canonical
citation. **~90% recoverable.**

## 7 — clinical-biostatistics/missing-data-sensitivity (MCAR/MAR/MNAR + sensitivity/robustness)

**Spine:** van Buuren FIMD 2nd ed. 2018 (free full text) — taxonomy + MI theory/practice + mice + sensitivity `[VF]`.
**Validity axis / standards:** NRC 2010 *Prevention and Treatment of Missing Data in Clinical Trials*
(free, NCBI Bookshelf NBK209904; FDA-funded) `[VF]` + Little et al. 2012 *NEJM* 367:1355 summary (OA) `[VF]`;
**ICH E9(R1)** estimands+sensitivity addendum (2019/2020) — the regulatory umbrella (**added**) `[VF]`.
**Methods (primaries):** Rubin 1976 *Biometrika* 63:581 (defined MAR/ignorability — **MCAR *label* is Little &
Rubin 1987**, corrected attribution) `[VF]`; mice — van Buuren & Groothuis-Oudshoorn 2011 *JSS* 45(3) (OA) `[VF]`;
reference-based/pattern-mixture MI — Carpenter, Roger, Kenward 2013 *J Biopharm Stat* 23(6):1352 (corrected
singular "deviation") `[VF]`; Sterne et al. 2009 *BMJ* 338:b2393 `[VS]`; White, Royston, Wood 2011 *Stat Med* (MICE guidance).
**Wikipedia:** "Missing data", "Imputation (statistics)" `[VS]`.

**Recoverability:** spine **High**, taxonomy/MI **High**, **"tipping-point analysis" as a *named regulatory
method* Low** — the phrase is **not** in ICH E9(R1), NRC 2010, or Rubin 1976; cleanest primary is
Liublinska & Rubin 2014 *Stat Med* 33(24):4170 (OA), framed as "the missingness assumption needed to
overturn the conclusion," with ICH E9(R1) as umbrella. **~85% recoverable.**

## 8 — differential-expression/deseq2-basics (pick-established-not-invent + diagnostics)

**Spine:** DESeq2 Bioconductor vignette (Love, Anders, Huber) + MSMB Ch.8 (count-model concept) `[VS]`.
**Methods (clean primaries):** Love, Huber, Anders 2014 *Genome Biology* 15:550 (OA) `[VS]`; Robinson et al.
2010 *Bioinformatics* 26:139 (edgeR, OA; cite 2010) `[VF]`; Ritchie et al. 2015 *NAR* 43:e47 (limma, OA) `[VS]`;
Law et al. 2014 *Genome Biology* 15:R29 (voom, OA) `[VF]`; plus McCarthy et al. 2012 (edgeR GLM), Smyth 2004
(limma eBayes), Anders & Huber 2010 (orig DESeq) — **added** for canonical depth.
**Benchmark (corrected):** Soneson & **Delorenzi 2013** *BMC Bioinformatics* 14:91 for **bulk** DE; Soneson &
Robinson 2018 *Nat Methods* is **single-cell** DE — do not cite as a bulk benchmark `[VS]`.
**Tutorials:** RNAseq123 / Law et al. 2016 *F1000Res* 5:1408; Chen et al. 2016 edgeR-QL *F1000Res* 5:1438;
**Galaxy Training Network** "Reference-based RNA-Seq" tutorial `[VF]`.

**Recoverability:** spine **High**, method-selection **High**, **thresholds/conventions Low** — FDR≤0.05,
|log2FC|≥1, LRT-vs-Wald guidance, independent-filtering `alpha=0.1` are vignette/community convention with
**no defining primary**. **~85% recoverable; the conventional cutoffs must be flagged as convention, not cited.**

## 9 — experimental-design/power-analysis (prospective design; post-hoc power anti-pattern; Type-S/M)

**Spine (the unifying primary):** Gelman & Carlin 2014 *Perspect Psychol Sci* 9(6):641 (design analysis +
Type-S/Type-M/exaggeration; free preprint) `[VS]`.
**Validity axis (anti-pattern):** Hoenig & Heisey 2001 *Am Stat* 55:19 (post-hoc/observed power fallacy;
free author PDFs) `[VS]`; Button et al. 2013 *Nat Rev Neurosci* 14:365 (underpowering; OA via ORA) `[VS]`.
**Methods/conventions:** Cohen 1988 (book; origin of the **0.80** convention); winner's curse —
Ioannidis 2008 *Epidemiology* 19:640 (**suggested add**).
**Software:** pwr (Champely, CRAN); simr (Green & MacLeod 2016 *MEE*); G*Power (Faul et al. 2007 *BRM* 39:175) `[VS]`.
**Wikipedia (corrected):** **"Power (statistics)"** ("Power of a test" is a redirect) `[VF]`.

**Recoverability:** spine **High**, anti-pattern **High**, the **0.80 convention** traces (Cohen 1988).
**~90% recoverable.** Gap: `retrodesign()` Type-S/M tooling lives in the paper supplement, not a package vignette.

## 10 — clinical-biostatistics/subgroup-analysis (garden-of-forking-paths; pre-specification; interaction tests)

**Spine (decision-grade checklist):** Sun, Briel, Walter, Guyatt 2010 *BMJ* 340:c117 — itemized credibility
criteria (pre-specification, one-of-few-vs-many, interaction test, a-priori direction, consistency, plausibility) `[VS]`.
**Companions:** Wang et al. 2007 *NEJM* 357:2189 (accessible overview) `[VS]`; Brookes et al. 2001 *HTA*
5(33) (simulation: **interaction tests beat subgroup-specific tests**, false +/− rates; OA monograph) `[VS]`.
**Concept:** Gelman & Loken 2014 *Am Sci* "The Statistical Crisis in Science" (+ 2013 "garden of forking paths" working paper) `[VS]`.
**Reporting standard (corrected):** **no standalone CONSORT subgroup extension exists** — use CONSORT 2010
items **12b** (methods) + **18** (results, pre-specified vs exploratory) `[VS]`. **Wikipedia:** "Subgroup analysis" `[VS]`.

**Recoverability:** spine **High**, validity **High**, **headline numbers Medium** — the "~1-in-3 spurious"
style figures depend on Brookes' simulation parameters; cite the simulation, not a round number. **~90% recoverable.**

---

## Cross-cutting findings

1. **The validity axis is the most traceable layer — and it's exactly what bioSkills can't trace.**
   For all 10, the cardinal sin the Family-B referee guards has a *clean, citable, often open-access
   primary* (Neufeld count-splitting, Nygaard cardinal-sin, Bourgon independent-filtering, LDSC intercept,
   STROBE-MR, NRC missing-data, Hoenig–Heisey post-hoc power, Sun credibility). This is the asset:
   a cast skill cites the named-invalidity paper; a memory-written skill paraphrases it and may misattribute.

2. **The gap is always defaults/thresholds, never the method.** FDR≤0.05, |log2FC|≥1, 0.80 power,
   Scanpy/Seurat resolution defaults, ECE cutoffs, "tipping-point," GWAS 5e-8 (partial), "three IV
   assumptions" — these are convention or live in moving tool docs. **Principled authoring means labeling
   these as convention/version-pinned, not dressing them as cited fact.** (This is `MOLD_SPEC`'s
   evidence-flagging discipline made concrete; bioSkills states them flat with no such flag.)

3. **Recoverability is high (~85–95%) for every skill** *given* these sources — the content was never the
   moat. What recovers is the *trace*: each claim → a verified URL/DOI a human or agent can check. That
   is precisely the layer the blind-regeneration experiment showed a frontier model **cannot** supply
   (it reproduces citations from memory, fuzzy ones included, indistinguishable from real). The
   recoverability table below is the deliverable a skill-as-source format structurally can't produce.

4. **Open-access coverage is good.** Most validity-axis primaries are OA (PMC/arXiv/Project Euclid/F1000/
   eLife/BMJ). Paywalled where flagged: BH 1995, Efron 2004/2008, Leek 2010, SAIGE, Sanderson 2022,
   Little & Rubin book, Rubin 1976. Open spines (MSMB, OSCA, GWASTutorial, FIMD) cover those gaps pedagogically.

## Recoverability summary

| # | Skill | Spine | Validity axis | Defaults/thresholds | Overall |
|---|-------|:-----:|:-------------:|:-------------------:|:-------:|
| 1 | model-validation (leakage) | High | High | Low (no ECE cutoff) | ~90% |
| 2 | sc clustering (double-dip) | High | High | Med (version-pinned params) | ~85% |
| 3 | batch-correction | High | High | Med (unfixable-aliasing not single-source) | ~85% |
| 4 | multiple-testing | High | High | High (5e-8→Pe'er) | **~95%** |
| 5 | GWAS association | High | High | High | **~95%** |
| 6 | mendelian-randomization | High | High | Low (3 IV assumptions no single origin) | ~90% |
| 7 | missing-data-sensitivity | High | High | Low (tipping-point not a named standard) | ~85% |
| 8 | deseq2-basics | High | High | Low (FDR/LFC/filtering = convention) | ~85% |
| 9 | power-analysis | High | High | High (0.80→Cohen) | ~90% |
| 10 | subgroup-analysis | High | High | Med (headline numbers param-dependent) | ~90% |

> **Verification provenance.** Refs verified 2026-06-27 by four parallel agents under a no-confabulation
> rule; tags `[VF]`/`[VS]` per item above. Glosses corrected against primaries. Re-verify tool-doc
> defaults (skills 2, 8) against the live API at authoring time — those drift.
