# SOTA / Prior-Art Survey: Statistical Genomics OUTSIDE the R/Bioconductor World

> Research lens 2 of 4 for the "statistical rails for LLM-driven statistical genomics" project.
> Source: research subagent web survey, 2026-06-26. Evidence tags: [verified] = fetched primary source; [secondary] = mentioned but not verified at source; [inference] = subagent reasoning; [speculative].

## 1. Lens & scope
Validity/QC/calibration machinery and any LLM-agent efforts in non-R statistical genomics — GWAS/PRS CLI tools, Python statistical-genetics stacks, genomics-scale calibration conventions, and reporting/protocol standards — read against our goal of "do vs. referee" statistical rails for an LLM.

## 2. Landscape inventory

| # | Name · URL | What it does | Family | Form | Maturity | Relevance to "LLM rails" |
|---|---|---|---|---|---|---|
| 1 | **PLINK / PLINK2** (https://www.cog-genomics.org/plink/) | Core GWAS engine: assoc tests, `--maf/--hwe/--mind/--geno`, `--king-cutoff` relatedness, `--indep-pairwise` LD pruning, PCA | A (+B inputs) | CLI-tool | Mature, dominant | The QC/calibration *verbs* an LLM must call correctly; flags encode validity gates. [secondary] |
| 2 | **regenie** (https://rgcgithub.github.io/regenie/) | Whole-genome regression (step-1 ridge / step-2 LMM); Firth + SPA for case-control imbalance; burden/SKAT/ACAT | A | CLI-tool | Mature (RGC) | Calibration baked into method (Firth/SPA → λ≈1); a "correct method choice" target. [verified] |
| 3 | **SAIGE / SAIGE-GENE+** (https://github.com/saigegit/SAIGE) | GLMM + SPA for binary traits, controls case-control imbalance & relatedness | A | CLI-tool | Mature | Canonical example of a method *chosen because* naive logistic mis-calibrates rare/imbalanced data. [verified — Zhou 2018 PMC30104761] |
| 4 | **GCTA (GREML / fastGWA / fastGWA-GLMM)** (https://yanglab.westlake.edu.cn/software/gcta/) | Heritability (GREML); fastGWA MLM with sparse GRM + PCs for stratification/relatedness | A/B | CLI-tool | Mature | Sparse-GRM thresholding is an explicit calibration knob (genomic inflation vs power tradeoff). [verified — Nat Genet 2019] |
| 5 | **BOLT-LMM** (https://alkesgroup.broadinstitute.org/BOLT-LMM/) | Bayesian mixed-model assoc at biobank scale | A | CLI-tool | Mature | The high-memory reference fastGWA benchmarks against; mixed-model = stratification control. [secondary] |
| 6 | **Hail** (https://hail.is/) | Scala/Python distributed genomics; `sample_qc()`, `variant_qc()`, GWAS, λGC | A/B | python-lib (dist.) | Mature (Broad; gnomAD, UKB, GTEx) | QC as first-class library methods → an LLM can call structured QC rather than free-write it. [verified] |
| 7 | **LDSC (ldsc)** (https://github.com/bulik/ldsc) | LD-score regression; **intercept distinguishes confounding from polygenicity**; h², rg | **B** | python-lib/CLI (py2) | Mature, canonical | *The* calibration referee: intercept≈1 ⇒ inflation is real signal not confounding; ratio=(int−1)/(mean χ²−1). Exactly our "external check, not model reasoning." [verified — repo + Nat Genet ng.3211] |
| 8 | **PGS Catalog** (https://www.pgscatalog.org/) | Open DB of published PRS (variants/alleles/weights) + curated metadata for reproducibility | A/B | reporting-standard / DB | Mature (EBI) | Machine-readable scoring files + provenance an agent can reuse instead of re-deriving. [verified — PMC11165303] |
| 9 | **PRS-RS / ClinGen Complex-Disease reporting standards** (https://clinicalgenome.org/docs/clingen-complex-disease-prs-reporting-standards/ ; Wand et al. Nature 2021) | 33-item checklist across PRS derivation/testing/validation incl. generalizability | **B** | reporting-standard | Mature | A literal referee checklist — directly castable into audit "skills." [verified — clinicalgenome PDF + Nature s41586-021-03243-6] |
| 10 | **GWASTutorial** (https://cloufield.github.io/GWASTutorial/) | End-to-end CLI+Python curriculum: QC, PLINK/regenie/LDSC/GCTA/SuSIE, Manhattan/QQ/λ | A+B | protocol/tutorial | Active (UTokyo) | Closest to a structured "do-it-right" knowledge graph in non-R world; sequences method + diagnostic. [verified — fetched site] |
| 11 | **Marees et al. 2018 GWAS tutorial** (https://github.com/MareesAT/GWA_tutorial) | 4-part PLINK/PRSice QC→stratification→assoc→PRS scripts | A+B | protocol/tutorial | Widely cited | Codifies QC ordering + thresholds; a "correct workflow" exemplar. [verified — repo + PMC6001694] |
| 12 | **Anderson et al. 2010 Nature Protocols** (https://www.nature.com/articles/nprot.2010.116) | Case-control data-QC protocol; PLINK + SMARTPCA ancestral-outlier removal | B | protocol | Foundational | The canonical QC-checklist literature an audit skill would cite. [verified — PubMed 21085122] |
| 13 | **gwaslab** (https://github.com/Cloufield/gwaslab) | Python sumstats QC: harmonization, allele/chr standardization, **λGC**, Manhattan/QQ/Miami | A/B | python-lib | Active | Post-hoc calibration diagnostics as a Python object — agent-friendly referee toolkit. [verified — repo/docs] |
| 14 | **qmplot** (https://github.com/ShujiaHuang/qmplot) | Python Manhattan + Q-Q plots from GWAS results | B | python-lib | Modest | Narrow: the QQ/calibration *visual* check in Python. [secondary] |
| 15 | **scikit-allel** (https://scikit-allel.readthedocs.io/) | Pop-gen variation analysis (allele freq, diversity, PCA, selection scans) | A/B | python-lib | **Maintenance-only** (→ sgkit) | Diagnostics building blocks; flag the deprecation. [verified — docs note maintenance mode] |
| 16 | **sgkit** (https://github.com/sgkit-dev/sgkit) | Xarray/Dask/Zarr statistical-genetics toolkit; scikit-allel successor | A/B | python-lib | Active, maturing | Structured stat-genetics methods over typed arrays — the modern Python substrate. [verified — repo + NumFOCUS] |
| 17 | **GenoTools** (https://github.com/dvitale199/GenoTools ; biorxiv 2024.03.26.586362) | Python package wrapping genotype QC + ancestry pipeline (GP2) | A | python-lib/CLI | Active | Packages the QC checklist as callable Python — close to "QC-as-skill." [secondary — biorxiv] |
| 18 | **nf-gwas / nf-core-style pipelines** (PMC10849172) | Nextflow regenie GWAS w/ pre/post-processing, reproducible | A | pipeline | Active | Reproducibility rail (not statistical-validity referee) — the "wiring" LLMs already do well. [secondary] |
| 19 | **statsmodels** (https://www.statsmodels.org/) | General Python stats: GLM, multiple-testing (FDR/BH), diagnostics | A/B | python-lib | Mature | Generic inference engine + `multipletests` — the error-rate-control primitive under genomics code. [inference] |
| 20 | **scanpy / scverse** (https://scanpy.readthedocs.io/) | Single-cell Python: clustering, DE testing | A | python-lib | Mature | Where "double-dipping" (cluster then test on same data) invalidity classically appears — a referee target. [inference] |

### Agent/LLM systems (detailed in §5)
| # | Name · URL | What | Family | Maturity |
|---|---|---|---|---|
| 21 | **GenoTEX / GenoAgent** (https://arxiv.org/abs/2406.15341) | Benchmark + multi-agent system for gene-expression → gene-trait analysis | A (weak B) | Research benchmark |
| 22 | **BixBench** (https://www.researchgate.net/publication/389548449) | Benchmark: LLM agents *interpret* bioinformatics analytical results in research context | A/B | Research benchmark |
| 23 | **BioAgent Bench / BioMaster / AutoBA** (https://arxiv.org/pdf/2601.21800 ; https://arxiv.org/pdf/2512.09964) | Agentic bioinformatics workflow execution / NGS downstream for non-experts | A | Research/early |
| 24 | **TusoAI** (https://arxiv.org/pdf/2509.23986) | Agentic optimization *of* scientific methods | neither/A | Research |

## 3. Closest prior art (top 3)

1. **GWASTutorial (#10)** — the strongest non-R analog to what we're building: a structured, tool-spanning body of "do-it-right" knowledge that pairs each *method* with its *diagnostic* (QC → assoc → λ/QQ → LDSC intercept → fine-mapping). It's a knowledge base, not an agent or a gate, but it's the corpus a Family-A/B skill set would be distilled from. [verified]
2. **LDSC intercept (#7)** — the cleanest existing instance of our structural bet: an *external, empirical* check (regress χ² on LD score) that adjudicates whether an inflated result is real or confounded, independent of the analyst's narrative. This is exactly "doing hands off to a referee using empirical checks, not the model's own reasoning." [verified]
3. **PRS-RS / ClinGen (#9) + PGS Catalog (#8)** — a 33-item referee checklist plus a machine-readable provenance DB. Directly castable into Family-B audit skills and Family-A reuse (pull an established score instead of inventing one). [verified]

## 4. White space / gaps
- **No referee gate exists as software.** All "validity" lives in human-readable checklists (PRS-RS, Anderson, Marees) or scattered diagnostics (λGC, QQ, LDSC intercept). Nothing *forces* a doing pipeline to hand off to an external check before certifying — the core thing we'd add. [inference]
- **"Invented method with a cool name" is unguarded.** Existing tooling assumes you *picked* an established method; nothing detects an agent confabulating a novel, statistically-invalid procedure, or maps "proposed method → invalidity pattern (uncontrolled error rate / circular inference / unmet assumption)." [inference]
- **Calibration is per-tool, not portable.** λGC, intercept, permutation, negative controls each live in a different tool/lang; no inspectable cross-tool "calibration skill" library. [inference]
- **Negative-control / permutation / simulation-under-known-truth scaffolding is DIY.** Field trusts these but provides no reusable harness — exactly the Family-B "construct the empirical checks" deliverable. [inference]
- **Double-dipping in single-cell (scanpy) is widely committed and unguarded** by the tooling itself. [speculative]
- **Agent benchmarks measure productivity/interpretation, not statistical honesty.** None gate on calibration/error-rate control. [verified for fetched sources]

## 5. Agentic / LLM-specific efforts (called out)
- **GenoTEX / GenoAgent** — multi-agent gene-expression analysis (dataset selection → preprocess → stat analysis) with "flexible self-correction." Validation = **expert bioinformatician annotations baked into the benchmark**, plus self-correction. *No separate statistical-validity/referee layer distinct from the analysis agent* — self-certification, the failure mode we're targeting. [verified — fetched abstract]
- **BixBench** — evaluates whether agents can *interpret analytical results in the context of a research question*. Closest to a "referee" framing but it's a benchmark of judgment, not an enforced empirical gate. [secondary]
- **BioMaster / AutoBA / BioAgent Bench / NGS-downstream agent** — workflow *execution* automation (tool selection → code → run), RAG over domain docs. Squarely the "wiring/reproducing" strength; statistical validity out of scope. [secondary]
- **TusoAI** — agentic *method optimization*; adjacent (could even *generate* the invented-method risk). [secondary]
- **Honest read:** the agent space is thin on exactly our axis. Everything either measures productivity or interpretation quality; none implements "doing never self-certifies; it hands to an empirical referee gate." That's our white space. [inference]

## 6. Follow-up URLs
- regenie docs — https://rgcgithub.github.io/regenie/
- SAIGE — https://github.com/saigegit/SAIGE
- GCTA / fastGWA — https://yanglab.westlake.edu.cn/software/gcta/
- LDSC + intercept wiki — https://github.com/bulik/ldsc , https://github.com/bulik/ldsc/wiki/Heritability-and-Genetic-Correlation
- LDSC paper — https://www.nature.com/articles/ng.3211 (PMC4495769)
- PGS Catalog — https://www.pgscatalog.org/ (PMC11165303)
- PRS-RS / ClinGen — https://clinicalgenome.org/docs/clingen-complex-disease-prs-reporting-standards/ ; https://www.nature.com/articles/s41586-021-03243-6
- GWASTutorial — https://cloufield.github.io/GWASTutorial/ (incl. /08_LDSC/)
- Marees tutorial — https://github.com/MareesAT/GWA_tutorial (PMC6001694)
- Anderson 2010 protocol — https://www.nature.com/articles/nprot.2010.116
- Hail — https://hail.is/
- gwaslab — https://github.com/Cloufield/gwaslab ; qmplot — https://github.com/ShujiaHuang/qmplot
- scikit-allel — https://scikit-allel.readthedocs.io/ ; sgkit — https://github.com/sgkit-dev/sgkit
- GenoTools — biorxiv 2024.03.26.586362
- GenoTEX — https://arxiv.org/abs/2406.15341 ; BioAgent Bench — https://arxiv.org/pdf/2601.21800

**Evidence caveats:** exact PLINK QC thresholds (#1) and Hail/GenoTools/BixBench/BioMaster details are **[secondary]** (search snippets, source not fully fetched). regenie, LDSC, GWASTutorial, gwaslab, sgkit, GenoTEX abstract, PRS-RS/PGS are **[verified]** (docs/repo/paper fetched or read). Family-A/B mappings for statsmodels, scanpy, and the gap analysis are **[inference]**. The single-cell double-dipping prevalence claim is **[speculative]**.
