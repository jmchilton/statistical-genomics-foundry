---
title: "Are Large Language Models Good Statisticians? (StatQA)"
type: paper
source_id: statqa-2024
source_url: https://statqa.github.io/
arxiv: https://arxiv.org/abs/2406.07815
access_date: "2026-07-01"
license: "Paper (arXiv PDF v2): arXiv.org perpetual non-exclusive license 1.0 (NOT Creative-Commons). Code + dataset (GitHub HKUSTDial/StatQA): GPL-3.0."
attribution: "Zhu Y, Du S, Li B, Luo Y, Tang N. Are Large Language Models Good Statisticians? NeurIPS 2024 Datasets & Benchmarks Track. arXiv:2406.07815. Summarized in own words — no source prose reproduced."
derived: own-words-summary
---

*Faithful clean-context summary of one source; the summarizer read the arXiv PDF v2 + the GitHub repo, seeing only the source and this note's guidance file. Project framing lives in the flagged footer. License mode: paper is arXiv-nonexclusive → own-words throughout; short functional strings — exact method names, error-type labels, field names, numeric scores, prompt strings — kept verbatim as facts. Repo is GPL-3.0 (quotable) but the load-bearing content is the paper's, so the note stays own-words.*

## 1. Citation
Zhu, Y., Du, S., Li, B., Luo, Y., & Tang, N. (2024). *Are Large Language Models Good Statisticians?* 38th Conference on Neural Information Processing Systems (NeurIPS 2024), Datasets and Benchmarks Track. arXiv:2406.07815v2 [cs.CL], 10 Oct 2024.

## 2. Access note
- **Read in full:** arXiv PDF v2 (text-extracted via pdftotext locally: main body Sections 1–6 + Appendices A–I incl. Table 3 task/method taxonomy, Table 9 domain-knowledge applicability mapping, Table 11 error-type examples, Table 2/10 result tables, Figures 2/4/7 item examples, Limitations Section G). GitHub repo README + file tree.
- **Could NOT fully read:** binary chart PDFs (Figures 3/5/6/8/9 read only as embedded text labels + numeric annotations, not rendered images — error-distribution proportions in Figures 6/9 are approximate label scrapes, [summarizer-inferred] where cited); raw CSV/JSON data rows (item schema reconstructed from Figures 2 & 7 + prompt tables, which show the JSON verbatim).
- **License mode per source:** Paper = arXiv nonexclusive → own-words, functional strings verbatim. Repo = GPL-3.0 → quotable, not primary source here.

## 3. Thesis
LLMs are strong at *computing* statistics but under-tested on the harder first stage: **selecting the appropriate method by assessing whether the data satisfy the method's prerequisites** (applicability). StatQA isolates and measures this. Best model (GPT-4o + domain-knowledge prompting) reaches only 64.83%. Headline: LLMs and humans fail *differently* — LLMs mostly make **applicability errors**, humans mostly make **statistical task confusion** errors — suggesting complementarity.

## 4. Problem & context
A statistical analysis task = given table D and question Q, (1) pick relevant columns C, (2) choose method(s) M, (3) compute results. Two stages: **Stage 1** (identify appropriate methods + parameters — the "core," requiring judgment of data type, distribution/normality, sample size) and **Stage 2** (computation — offloadable to tools like WolframAlpha). Prior LLM-math/stat benchmarks (MATH, GHOSTS, TheoremQA, SciBench, GSM8K, DAEval, QRData) target computational-result accuracy, not method-applicability judgment. StatQA targets Stage 1, focusing on **hypothesis testing** (called the most misunderstood area of quantitative analysis) plus descriptive statistics.

## 5. Method / approach (how the benchmark works + is built)

**Task given to solver:** provided *column information only* (not the full table) — column headers, number of rows, `data_type`, `is_normality` — must output relevant columns and *all* applicable methods, in strict JSON, choosing only from a fixed **classification list** (closed set of 27 named methods across 5 categories). Response cleaned/extracted, then compared to ground truth.

**Metric — Acc(C, M):** all-or-nothing exact match. Correct only if selected column set AND method set both fully equal ground truth, no omissions, no incorrect inclusions. Acc(C,M) = (1/N) Σ 1(Ĉ_i = C_i, M̂_i = M_i).

**Reverse construction pipeline (answer-first synthesis)** — A→Q instead of D→Q→annotate A:
- **Data collection:** 78 real-world tables (Kaggle + Rdatasets), gathered by post-grad statistics students, 6 domains (education, medicine, science, engineering, economy, life). Metadata per column = header, data type, normality, description (data type & normality computed from data; missing metadata hand-annotated; existing metadata manually validated).
- **Step 1 – Set target answers:** pick target method(s) M, then pick columns C fitting M's parameter needs.
- **Step 2 – Prerequisite check + computation:** automated checks of prerequisites (sample size, data type, normality). If C satisfies M's prerequisites, compute R = {M1(C),…,Mn(C)}. *This rule-based prerequisite check is what defines "applicable."*
- **Step 3 – Question synthesis:** hand-crafted templates (10–20 per category, built/reviewed by two post-grad statistics students) with column placeholders → preliminary Q(C).
- **Step 4 – Difficulty labeling + split:** **"hard"** = applicable-methods set is a *proper subset* of candidate methods (some comparable methods ruled out because prerequisites unmet, so solver must eliminate inapplicable methods); **"easy"** = otherwise. Balance by expanding under-represented / sampling over-represented categories. Split by source table (no overlap): tables 1–36 → test (StatQA); 37–78 → training (D_train, for fine-tuning).
- **Step 5 – Question refinement:** GPT-3.5-Turbo paraphrases test questions (Q*(C)) for fluency/diversity without changing meaning (temp 0.7). Applied *only* to test set, not training. Quality: avg BLEU 0.126 (vocab changed) + BERTScore 0.920 (meaning preserved).
- **Quality control:** template review, refinement, and final manual review of *all* StatQA examples by two post-grad statistics students.

**mini-StatQA:** 1,163 examples via stratified sampling, mirroring task/difficulty distribution; used for the actual experiments.

## 6. Key claims / findings (numbers pinned)

**Dataset size (Table 1):** StatQA = **11,623**; mini-StatQA = **1,163**. Difficulty: **7,401 easy / 4,222 hard**. Avg rows 6,228; avg cols 14; question length avg 113 chars (max 346, min 21). 78 source tables (36 test / 42 train).

**Task-category counts (Figure 3):** Descriptive Statistics (DS) 2,690; Contingency Table Test (CTT) 2,491; Distribution Compliance Test (DCT) 2,400; Variance Test (VT) 2,330; Correlation Analysis (CA) 1,712.

**Scores — Acc(C,M) % on mini-StatQA (Table 2), overall:**
- **Best overall in whole benchmark:** fine-tuned (SFT) **LLaMA-3-8B, 0-shot = 77.13%**. Other SFT: LLaMA-3-8B-Instruct 75.92%; LLaMA-2-7B 66.72%.
- **Best non-fine-tuned:** **GPT-4o, 1-shot+DK = 64.83%** (the paper's headline "best performance of only 64.83%").
- GPT-4 best = 53.22% (1-shot+DK); GPT-3.5-Turbo best = 49.36% (1-shot+DK).
- LLaMA-3-8B best = 36.11% (1-shot+DK); LLaMA-3-8B-Instruct best = 28.29%; LLaMA-2-13B best = 20.29%; LLaMA-2-7B best = 16.08%. GPT-3.5 0-shot = 37.40%.
- **Human baseline (117-example subset; Table 2):** Statistics-background group — closed-book 23.28%, **open-book 53.45%**; Non-Statistics group — closed-book 18.10%, open-book 34.48%.
- **Additional open models (Table 10):** Qwen2-72B-Instruct 1-shot 47.12% (best open non-FT, ~GPT-level); LLaMA-3-70B 34.14%; Yi-34B-Chat 33.96%; Qwen2-1.5B 20.38%; Qwen2-0.5B 2.41%.

**Per-category weak spots:** humans and most LLMs strongest on DS and (among hypothesis tests) CA and DCT; weakest on **CTT and VT**. Domain-knowledge prompting helps big proprietary models most (GPT-4o VT → 46.31%, CTT → 65.23% at 1-shot+DK), little for small open models.

**Findings (6):**
1. Few-shot + domain knowledge help; CoT slightly *degrades* smaller models.
2. Prompt-based LLMs stay behind statistics-background humans, but fine-tuning or DK on a strong LLM closes/surpasses the gap.
3. All adept at DS, struggle with CTT/VT; DK boosts large proprietary LLMs (esp. GPT-4o), limited effect on small open models.
4. LLaMA-3 & GPT understand the task (GPT selects columns accurately); LLaMA-2 struggles with both.
5. **LLMs good at distinguishing task type & selecting associated methods, but poor at using domain knowledge to assess applicability; humans excel at applicability but prone to task confusion.**
6. Humans and LLMs have complementary strengths.

**CoT effect (Table 12):** 0-shot-CoT reduces small-model accuracy (e.g. LLaMA-2-7B overall −1.72, DS −5.79); negligible on GPT/large models.

## 7. Load-bearing statements (own-words; functional strings verbatim)
- Metric requires *exact set match* of both columns and methods — no partial credit.
- "Applicable" is defined operationally by **rule-based prerequisite checks** (Step 2) over metadata (sample size, data type, normality), not per-item expert adjudication (though experts reviewed everything).
- Ground truth is a *set of all applicable methods*; an inapplicable method is represented simply by its **absence** from that set. No explicit per-method "not applicable" label.
- Solver picks only from a fixed classification list; **method selection constrained to the provided list** (prompt: "Ensure your methods selection is only limited to the classification list provided"). → closed-set selection among real, named methods.
- Column info fed per column: `column_header`, `data_type` (quantitative/categorical), `num_of_rows`, `is_normality` (True/False).

## 8. Stated scope / assumptions / limitations (Section G)
- **Coverage:** only **hypothesis testing + descriptive statistics**. Explicitly *excluded / future work*: **regression analysis**, more advanced hypothesis tests, and **causal inference from observational data**. Extension to finance/operations research anticipated.
- **Evaluation:** single accuracy metric; no step-wise scoring of reasoning (acknowledged gap; GPT-4-as-judge step scoring noted as inspiring but unreliable).
- **Experiments:** limited model set; only 6 human participants (3 stats, 3 non-stats); human subset only 117 examples.
- **Column info, not full tables** given to solvers (token limit) — tests reasoning over *provided metadata* (incl. a normality flag), not the model's own assumption *testing* from raw data.

## 9. Failure modes / applicability-error taxonomy (referee-relevant)

### 9a. Error taxonomy (Section 3.3, exact labels + definitions)
Four types + mixed:
1. **Invalid Answer** — meaningless response or wrong format (mostly smaller models, e.g. LLaMA-2-7B).
2. **Column Selection Error (CSE)** — irrelevant/incorrect column selection.
3. **Statistical Task Confusion (STC)** — confusion about the *category* of statistical task, leading to methods from the wrong family (e.g. answering a categorical-independence question with correlation-coefficient methods).
4. **Applicability Error (AE)** — *no* task-category confusion, but failure to discern usage scenarios/prerequisites → selecting **inapplicable** methods (e.g. including methods whose assumptions the data violate).
5. **Mixed Errors** — a valid answer containing multiple of the above (CSE+STC, CSE+AE, STC+AE, CSE+STC+AE).

**Headline contrast (Finding 5, Figure 6 — proportions [summarizer-inferred] from chart labels):** for LLMs except LLaMA-2, the *dominant* error is **Applicability Error** (large share even for strong GPT/fine-tuned models, ~0.37–0.50 of errors, persists even when domain knowledge is supplied → called an "inherent limitation"). For **humans**, applicability errors are a *small* share and **Statistical Task Confusion** is the largest. Exact per-bar decimals are [summarizer-inferred] (binary-chart scrape); the *direction* (LLM→AE-dominant, human→STC-dominant) is stated in prose and solid.

### 9b. The data-condition → applicable-method mapping (load-bearing artifact)

**Taxonomy: 5 categories, 27 methods (Table 3).** Applicability conditions from the paper's own domain-knowledge (DK) block (Table 9). Conditions in play: **variable type** (quantitative vs categorical), **sample size** (small vs large), **normality** (required or not), **presence of a control/strata variable**.

| Category | Method | Applicable condition (per Table 9 DK) |
|---|---|---|
| **Correlation Analysis (CA)** | Pearson Correlation Coefficient | two quantitative variables |
| | Spearman Correlation Coefficient | two quantitative variables |
| | Kendall Correlation Coefficient | two quantitative variables, **suitable for small samples** |
| | Partial Correlation Coefficient | when a **controlling variable** is involved |
| **Contingency Table Test (CTT)** | Chi-square Independence Test | categorical variables, **large sample** |
| | Fisher Exact Test | categorical variables, **small sample** |
| | Mantel-Haenszel Test | when **strata** data are to be controlled |
| **Distribution Compliance Test (DCT)** | Anderson-Darling Test | test for normality |
| | Kolmogorov-Smirnov Test for Normality | test for normality |
| | Shapiro-Wilk Test of Normality | test for normality, **small samples** |
| | Lilliefors Test | test for normality, **large samples** |
| | Kolmogorov-Smirnov Test (Distributions Comparison) | comparison of distribution between **two independent samples** |
| | KS Test for Uniform distribution | test for the Uniform distribution |
| | KS Test for Gamma distribution | test for the Gamma distribution |
| | KS Test for Exponential distribution | test for the Exponential distribution |
| **Variance Test (VT)** | Mood Variance Test | whether a significant difference exists (no normality requirement) |
| | Levene Test | whether a significant difference exists (no normality requirement) |
| | Bartlett Test | difference in variance **between normally distributed variables** |
| | F-Test for Variance | difference in variance **between normally distributed variables** |
| **Descriptive Statistics (DS)** | Mean, Median, Mode, Range, Quartile, Standard Deviation, Skewness, Kurtosis | summarize/describe data (no prerequisites) |

**Canonical applicability-error example (Table 11):** question asks whether variances of two non-normal columns (`Height_m`, `Weight_kg`) differ. Ground truth = {Mood Variance Test, Levene Test}. Model wrongly *adds* Bartlett Test + F-Test for Variance — inapplicable because those require normality, which the column info shows is violated. Load-bearing rule: **normality-dependent variance tests (Bartlett, F-Test) drop out when data are non-normal; distribution-free ones (Mood, Levene) remain.** Same pattern: small-vs-large sample switches Fisher↔Chi-square and Shapiro-Wilk↔Lilliefors; a control variable triggers Partial Correlation / Mantel-Haenszel.

## 10. What the source does NOT address (confident silences)
- **Invented-method boundary — stated plainly:** StatQA tests **selection among a fixed set of KNOWN, real methods only** (closed 27-method classification list; solver instructed to restrict to it). It does **not** test or measure whether an LLM *fabricates a non-existent method*. "Hallucination" appears only in a qualitative example (Table 19) about hallucinated *reasoning/column facts within a correct answer*, not method invention. So StatQA does not probe made-up-method failure at all.
- Does **not** cover regression, causal inference, or advanced/other hypothesis tests (Section G).
- Does **not** score Stage-2 computation correctness (deliberately — deemed tool-solvable); only method/column *selection* is graded.
- Does **not** give the model raw data to *run* its own normality/assumption tests — normality is handed to it as a precomputed `is_normality` flag.

## 11. Open questions / ambiguities
- Are the two sub-skills (choosing the right *family* vs. checking *assumptions within* a family) scored **separately**? → No dedicated metric. Separated only *diagnostically* via the error taxonomy (STC = wrong family; AE = right family, wrong applicability) and *structurally* via the easy/hard label (hard = prerequisites eliminate some candidates). Reported per-category scores (CA/CTT/DCT/VT/DS) are the only "sub-ability" breakdown; there is no "assumption-checking accuracy" number.
- Exact per-experiment error-type proportions (Figures 6/9) are not in machine-readable text; my decimals there are [summarizer-inferred].
- Ground-truth "applicability" rests on the authors' Step-2 prerequisite rules + Table 9 scenarios; the paper does not publish the full numeric thresholds (e.g. exact n cutoff for "small" vs "large" sample, or the normality-test alpha) the automated checker used — only qualitative small/large, normal/non-normal distinctions. [GAP: exact sample-size and normality thresholds not in the read bytes — would need the repo's `Construction/*.py` prerequisite code.]

## 12. Guidance answers
- **Statistical-method taxonomy + condition→method mapping:** Section 9b, from Table 3 (5 categories / 27 methods) + Table 9 (DK applicability scenarios) + Table 11 applicability-error example. Categories: Correlation Analysis, Contingency Table Test, Distribution Compliance Test, Variance Test, Descriptive Statistics. Mapping concrete: sample size (Kendall/Fisher/Shapiro-Wilk = small; Chi-square/Lilliefors = large), normality (Bartlett & F-Test require normal; Mood & Levene do not), variable type (quantitative→correlation; categorical→contingency), control/strata variable (→ Partial Correlation / Mantel-Haenszel).
- **Error-type definitions + human-vs-LLM contrast:** Section 9a. Definitions anchored to Section 3.3. Contrast: LLMs → applicability-error-dominant (persists with DK, called inherent limitation); humans → statistical-task-confusion-dominant, applicability errors small (Finding 5). Exact proportions [summarizer-inferred] from Figure 6; direction prose-solid.
- **Benchmark construction / one item's format / "not applicable":** Sections 5 + 7. 11,623 examples via answer-first reverse synthesis from 78 real tables (Kaggle/Rdatasets); ground-truth applicable methods set by **rule-based prerequisite checks** on metadata (Step 2), with full expert review. Item fields (Figure 2/7): Dataset, Question Q*(C) (GPT-3.5-refined), Task (category), Difficulty (easy/hard), Relevant Columns `[{column_header, is_strata, is_control}]`, Results `[{method, result, conclusion}]`, Ground Truth `{columns:[...], methods:[...]}`. "Not applicable" = **omission** from the ground-truth `methods` set; "hard" = applicable set is a proper subset of candidate methods.
- **Sub-abilities (select method vs check assumptions):** Section 11. Not separately scored; separated only via error taxonomy (STC vs AE) and easy/hard labeling. Only per-task-category (CA/CTT/DCT/VT/DS) sub-scores exist.
- **Scores:** Section 6. Best non-FT GPT-4o 1-shot+DK 64.83%; best overall SFT-LLaMA-3-8B 77.13%; human stats open-book 53.45%; full per-category/per-strategy table transcribed.
- **Invented-method boundary:** Section 10. **Selection among known real methods only** — closed classification list, no fabrication probe. Stated plainly, not papered over.

## Relevance to this project  `[design-inference — author-added, not from source]`
- **Pole:** referee-grounding / cautionary-evidence. The benchmark that *documents* the LLM applicability-error failure mode **and** supplies a reusable data-condition→method taxonomy. Grounds [[method-applicability-errors]] **prong 1 (appropriateness)**.
- **The load-bearing artifact:** the 5-category / 27-method table + Table 9's condition→method mapping (normality → Bartlett/F-Test vs Mood/Levene; sample size → Fisher/Chi-square, Shapiro-Wilk/Lilliefors; control var → Partial Correlation / Mantel-Haenszel) is exactly what the [[audit-method-validity]] referee checks a *named method* against in §3. The **AE-vs-STC** split = the referee's "right family, wrong applicability" vs "wrong family" distinction.
- **Boundary carried forward (do not overclaim):** StatQA is **closed-set selection among real methods** — it does **NOT** cover the invented / non-existent-method case. That confirms [[method-applicability-errors]] **prong 2 (existence)** stays a **white-space** with no benchmark; StatQA cannot be cited for it.
- **Strongest evidence for the Family-B bet:** applicability error stays the dominant LLM error *even when domain knowledge is supplied* (authors call it an "inherent limitation") — more prompting/reasoning does not fix applicability judgment. Direct support for "Doing Never Self-Certifies" (`GUIDING_PRINCIPLES.md`) and the external-referee design.
- **Ready eval/scenario source:** an 11,623-item applicability benchmark is a near-drop-in for `scenarios.md` planted fixtures + the `eval.md` oracle (cf. `docs/MOLD_SPEC.md`, `docs/CORPUS.md`). Note the licensing split before vendoring: paper arXiv-nonexclusive, data/code **GPL-3.0**.
- **`[GAP]` carried forward:** exact prerequisite thresholds (sample-size cutoff, normality α) live in the repo `Construction/*.py`, not the paper — pin from code if a StatQA item is bound as a fixture.
