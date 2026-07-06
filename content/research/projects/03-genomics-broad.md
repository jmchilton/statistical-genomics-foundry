# SOTA Survey — Genomics broadly: reproducibility, QC, benchmarking, truth sets

> Research lens 3 of 4. Source: research subagent web survey, 2026-06-26.
> Evidence tags: [verified] = fetched primary source; [secondary] = mentioned but not verified at source; [inference]; [speculative].

## 1. Lens & scope
Field-wide genomics infrastructure for *doing analysis reliably* (reproducible workflows + QC) and especially for *externally verifying* it — truth sets, benchmarks, and simulation-under-known-truth, which are the genomics-native analog of our Family B "referee gate."

## 2. Landscape inventory

| Name | URL | What it does | Family | Form | Maturity | Relevance |
|---|---|---|---|---|---|---|
| **nf-core** | nf-co.re | Curated Nextflow pipelines; every module ships pinned conda/container env + standardized QC, meta-maps, automated tests | A (+ light B via tests) | workflow-framework | Mature, large community | Module/QC conventions model portable inspectable "skill" units; tests = weak external gate `[verified]` |
| **MultiQC** | multiqc.info | Aggregates per-tool QC logs (FastQC, STAR, Picard, samtools, Qualimap…) into one cross-sample HTML report | B (audit surface) | QC-tool | Mature, ubiquitous | The de-facto "QC referee report" culture; agent could be required to read/emit one `[verified]` |
| **FastQC** | (via nf-core docs) | Per-sample raw-read QC metrics | B | QC-tool | Mature | Canonical first-pass QC gate `[secondary]` |
| **Genome in a Bottle (GIAB)** | nist.gov/.../genome-bottle; github.com/genome-in-a-bottle | NIST reference samples + benchmark variant call sets ("truth") for human genomes | B | benchmark/truth-set | Mature, authoritative | **Core Family-B analog**: externally curated ground truth `[verified]` |
| **GA4GH Benchmarking Team + hap.py / vcfeval** | github.com/genome-in-a-bottle/genome-stratifications | Standardized tools + best practices to compare calls vs GIAB truth, stratified by genomic context (TP/FP/FN) | B | benchmark/truth-set + tool | Mature | **Clearest existing "referee gate"**: method + tool + truth contract `[verified]` |
| **precisionFDA Truth Challenges** | (via NCBench paper) | FDA-run community variant-calling challenges vs held-out truth | B | benchmark | Established but *point-in-time* | Gate exists but is a snapshot — motivates *continuous* benchmarking `[verified]` |
| **NCBench** | f1000research.com/articles/12-1125 | Open, reproducible, *continuous* variant-calling benchmark (Snakemake, community-updatable) | B | benchmark | Active | Continuous "living gate" — closer to a standing referee `[verified]` |
| **OpenEBench** | openebench.readthedocs.io | ELIXIR continuous benchmarking platform; runs community workflows on dedicated infra, standardized reporting | B | benchmark | Active, institutional | Infrastructure for standing external evaluation `[verified]` |
| **Omnibenchmark** | arxiv.org/html/2409.17038v1 | Continuous, distributed benchmarking; a benchmark-formalization language compiled to reproducible workflows | B | benchmark | Alpha | *Formalizes* benchmarks as a spec → reproducible workflow (resonant with "inspectable KB") `[verified]` |
| **CAMI** | cami-challenge.org; Nat Methods 2017/2022 | Community benchmark for metagenome assembly/binning/profiling on simulated-from-known-genomes data + online portal | B | benchmark/truth-set | Mature (2 rounds + portal) | Domain external gate using *simulation-under-known-truth* `[verified]` |
| **DREAM Challenges** | (referenced) | Community wisdom-of-crowds predictive-modeling challenges incl. genomics (e.g. somatic calling) vs held-out truth | B | benchmark | Mature | Crowd-sourced external evaluation model `[secondary]` |
| **conquer + Soneson & Robinson DE benchmark** | github.com/csoneson/conquer_comparison; Nat Methods 2018 (nmeth.4612) | 36-method scRNA-seq DE comparison on real + synthetic data; conquer = consistently-processed datasets | B | benchmark | Mature, influential | Reference design-review for "pick an established DE method"; exposes bias/robustness dims `[verified]` |
| **Splatter / splatPop** | genomebiology s13059-021-02546-1 | R simulator producing scRNA-seq data with **known truth** (groups, DE, batch) for method eval | A→B | simulator | Mature | Simulation-under-known-truth = our "construct the empirical check" task `[verified]` |
| **Polyester** | (via isoform benchmark) | Simulates bulk RNA-seq reads w/ known DE for quantification benchmarking | A→B | simulator | Mature | Same for bulk RNA-seq `[secondary]` |
| **wgsim / dwgsim** | (referenced) | Whole-genome read simulators producing reads from known reference/variants | A→B | simulator | Mature, standard | Generates ground-truth reads to validate variant pipelines `[secondary]` |
| **Galaxy / IWC + gxformat2** | galaxyproject.org | Reproducible workflow platform; IWC curates community workflows; gxformat2 validatable/compact; live-instance tests w/ sample data | A (+ B via static validation + tests) | workflow-framework | Mature | Static validation + landing-request tests = *deterministic* pre-run gate agents can't bypass `[verified]` |
| **Snakemake** | (NCBench substrate) | Reproducible workflow framework; underpins NCBench | A | workflow-framework | Mature | Common substrate for reproducible + benchmarkable pipelines `[secondary]` |
| **WDL / Cromwell** | (lens) | Workflow language + engine (Broad ecosystem; clinical/germline pipelines) | A | workflow-framework | Mature | Reproducibility substrate; less explicit gate `[inference]` |
| **ENCODE data standards** | (lens) | Assay-specific data-quality standards (read depth, replicate concordance, IDR for peaks) | B/standard | standard/guideline | Mature | A *quantitative QC contract* per assay — model for encoding "what valid looks like" `[inference]` |
| **MIQE / MIQE 2.0** | academic.oup.com/clinchem/.../8119148 | Minimum-information reporting standard for qPCR: design, validation, analysis | B/standard | standard/guideline | Mature (2.0 in 2025) | Reporting-completeness checklist = *structured audit rubric* an agent could enforce `[verified]` |
| **FAIR + FAIR-for-workflows** | PMC10538699; arxiv 2505.15988 | Findable/Accessible/Interoperable/Reusable principles, extended to computational workflows | standard | standard/guideline | Mature, growing | Portability/inspectability principles for the KB itself `[verified]` |
| **awesome-genomic-skills** | github.com/GoekeLab/awesome-genomic-skills | Curated list of genomics **agent skills + MCP servers + benchmarks** for Claude Code/Copilot/etc. | both | LLM-agent | Nascent (55★, v2026.05) | **Closest structural prior art** — but explicitly does *not* mandate statistical rigor `[verified]` |
| **BioinfoMCP** | arxiv.org/html/2510.02139v1 | Auto-converts CLI bioinformatics tools into MCP servers via LLM (94.7% over 38 tools) | A | LLM-agent | Recent (2025) | Tool-wiring layer; no validity gate — wiring is what LLMs already do well `[verified]` |
| **"From Prompt to Pipeline"** | arxiv.org/html/2507.20122v1 | Evaluates LLMs generating Galaxy/Nextflow workflows; grades completeness/correctness/usability vs GTN + nf-core baselines | both | LLM-agent | Recent (2025) | Uses community-curated baselines as external truth set — partial Family-B model `[verified]` |
| **BioAgents** | nature.com s41598-025-25919-z (paywalled) | Multi-agent system for bioinformatics analysis; includes a "perturbation suite" for robustness | A/B | LLM-agent | Recent (2025) | Multi-agent decomposition; robustness testing hinted, couldn't verify true referee `[secondary]` |
| **MCPmed** | arxiv.org/html/2507.08055v1 | Call for MCP-enabling bioinformatics web services for LLM-driven discovery | A | LLM-agent | Position paper (2025) | Ecosystem direction, not a validity layer `[secondary]` |

## 3. Closest prior art (top 3) & where the external gate already lives

1. **GA4GH Benchmarking Team + hap.py + GIAB truth sets** `[verified]` — Genomics' most mature *referee gate*: curated external truth (GIAB), a standardized comparison tool (hap.py/vcfeval), and *stratifications* reporting performance by genomic context. Exactly our Family B model — "doing never self-certifies; it hands off to an empirical check against external truth." Our system should treat "compare against GIAB via hap.py" as a first-class named referee skill, not reinvent it.

2. **awesome-genomic-skills** `[verified]` — Structurally identical to our deliverable: a portable, inspectable library of genomics *agent skills* + MCPs + benchmarks across Claude Code/Copilot/Codex. It has a *Benchmarks* category (BiomniBench rubrics, BioAgent Bench perturbation suite, SkillsBench deterministic verifiers) but, by its own framing, does **not** mandate statistical rigor (no required null/permutation, FDR, negative controls). It validates *that the agent did the task*, not *that the result is statistically valid*. That gap is our thesis.

3. **Continuous-benchmarking platforms (NCBench / OpenEBench / Omnibenchmark)** `[verified]` — Convert the one-off precisionFDA-style challenge into a *standing, reproducible* gate. Omnibenchmark especially resonant: it *formalizes a benchmark as a spec* compiling to a reproducible workflow — analogous to making the referee's empirical checks themselves a portable, inspectable artifact (our Family B "construct the checks the field trusts").

## 4. White space / gaps
- **No agent-facing statistical-validity referee.** Truth sets/benchmarks exist for the *field* (offline, per-method), but nothing inserts an empirical gate *into an LLM agent's analysis loop* demanding null/permutation calibration, negative controls, or simulation-under-known-truth *for the specific analysis just produced*. `[inference]`
- **"Invented method" failure is unaddressed.** Existing benchmarks evaluate *known* methods vs truth; none defend against an agent *fabricating a novel method with a fluent derivation*. The referee-gate-on-arbitrary-method-claims is genuinely open. `[inference]`
- **QC reports are read by humans, not enforced on agents.** MultiQC/FastQC/ENCODE standards produce inspectable reports, but no machinery makes an agent *consume the QC verdict and refuse to proceed on failure*. `[inference]`
- **Simulators are field tools, not agent skills.** Splatter/polyester/wgsim generate known-truth data, but "spin up a known-truth simulation to validate the pipeline you just built" isn't packaged as an agent skill. `[inference]`
- **Reporting checklists (MIQE/ENCODE) aren't machine-audited.** Prose rubrics; encoding them as agent-enforced audit checks is white space. `[inference]`

## 5. Agentic/LLM-specific efforts (called out)
- **awesome-genomic-skills** `[verified]` — closest form-match; nascent (55★); no statistical-rigor mandate. Tracks bioSkills, science-skills, operon, and benchmarks (BiomniBench, BioAgent Bench, SkillsBench).
- **From Prompt to Pipeline** (2507.20122) `[verified]` — LLMs → Galaxy/Nextflow workflows graded vs GTN/nf-core baselines via actual execution. Demonstrates *community-baseline-as-truth-set* pattern, but evaluation is manual and correctness-focused, not statistical-validity-focused.
- **BioinfoMCP** (2510.02139) `[verified]` & **MCPmed** (2507.08055) `[secondary]` — tool-wiring/MCP-exposure layers. They strengthen exactly the part LLMs are *already* good at (wiring), underscoring our bet that value is in the referee gate, not wiring.
- **BioAgents** (s41598-025-25919-z) `[secondary]`, **Galaxy router/multi-agent** `[secondary]` — multi-agent decomposition (tool rec, error analysis, orchestration). A perturbation/robustness suite is hinted (BioAgents) but couldn't verify an empirical statistical-validity referee. The Galaxy framing — *"reproducibility infrastructure is the feedback loop that makes agent-assisted science trustworthy by design"* (2507.20122 snippet) — is the closest published articulation of our structural bet.

## 6. Follow-up URLs
- GA4GH best-practices: https://www.nature.com/articles/s41587-019-0054-x
- GIAB stratifications: https://github.com/genome-in-a-bottle/genome-stratifications · GIAB: https://www.nist.gov/programs-projects/genome-bottle
- NCBench: https://f1000research.com/articles/12-1125 · OpenEBench: https://openebench.readthedocs.io · Omnibenchmark: https://arxiv.org/html/2409.17038v1
- CAMI: https://cami-challenge.org/ · Nat Methods: https://www.nature.com/articles/s41592-022-01431-4
- conquer/Soneson-Robinson DE: https://github.com/csoneson/conquer_comparison · https://www.nature.com/articles/nmeth.4612
- Splatter/splatPop: https://genomebiology.biomedcentral.com/articles/10.1186/s13059-021-02546-1
- MIQE 2.0: https://academic.oup.com/clinchem/article/71/6/634/8119148 · FAIR workflows: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10538699/
- awesome-genomic-skills: https://github.com/GoekeLab/awesome-genomic-skills
- From Prompt to Pipeline: https://arxiv.org/html/2507.20122v1 · BioinfoMCP: https://arxiv.org/html/2510.02139v1 · MCPmed: https://arxiv.org/html/2507.08055v1
- nf-core MultiQC: https://nf-co.re/modules/multiqc/

**Evidence-quality note:** GIAB/GA4GH/hap.py, awesome-genomic-skills, From Prompt to Pipeline, NCBench, Omnibenchmark, CAMI, conquer/Soneson-Robinson, Splatter, MIQE 2.0, FAIR-workflows = **[verified]**. BioAgents detail = **[secondary]** (paywalled). wgsim/dwgsim, DREAM, WDL/Cromwell, ENCODE specifics = **[secondary]/[inference]**. All gap claims = **[inference]** synthesized from the verified landscape.
