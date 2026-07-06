# Recoverability probe: `comparative-genomics/ancestral-reconstruction`

> Phase-4 compare. Real bioSkills SKILL.md (fetched 2026-07-03) vs. blind-assembled candidate Mold
> `audit-ancestral-reconstruction-validity`, built from 8 ingested notes (of ~13 proposed; continuous-trait
> ASR + secondary doer spine deliberately deferred). Produced by `/ingest-bioskill`. Every number carries its artifact.

## 0. Known-context verification (against fetched SKILL.md text)

| Claim to verify | Verdict | Evidence |
|---|---|---|
| Compositional-LBA locus (Syst Biol 72:767) mis-attributed to **"Sun M et al 2023"** | **CONFIRMED** | SKILL.md body ("Sun M et al 2023 Syst Biol 72:767 document this extensively"), decision table ("Sun 2023"), and Key References all say Sun. Real byline = Szánthó, Lartillot, Szöllősi, Schrempf (szantho note §1, verified from source). No "Sun" author exists. **Bonus error:** SKILL labels the method "CAT-GTR"; the paper's method is **CAT-PMSF** (szantho §5). |
| **posterior ≥ 0.95** reliability cutoff; Yang prescribes none | **Yang-prescribes-none HOLDS; explicit attribution-to-Yang NOT confirmable from fetched text.** | SKILL Quantitative-Thresholds table lists "High-confidence ASR site \| Posterior ≥ 0.95" with **no inline (Yang) cite** in the fetched summary; Yang appears separately in Key References. Yang note §12: "the paper prescribes NO posterior threshold"; 0.05–0.95 is a Table-1 display band. So the *cutoff is invented* regardless; whether the skill pins it to Yang is not visible in the fetched (summarized) text — the candidate Mold's planted "attributed to Yang 1995" scenario is the *stress case*, not necessarily the skill's literal wording. |
| BiSSE **~40% Type-I**; real = >77% / 61.5%, 5% control | **HOLDS (skill understates)** | SKILL: "Rabosky & Goldberg 2015 … report ~40% Type-I error." Rabosky note §6/§12: cetacean **>77%** (p<0.05), **58%** (p<0.001); vertebrate subtrees pooled **61.5%**; pure-birth control **exactly 5%**; controlled rate-shift slow-trait **18–45%**. "~40%" matches only the low end; not the paper's headline. |
| **≥0.8** GRASP indel-posterior; **dS/branch <1.0** & **dS>3** saturation — no source | **CONFIRMED convention, not citable** | SKILL threshold table: "GRASP indel posterior (call present) ≥ 0.8"; "Tree depth saturation … dS/branch length < 1.0"; impl-errors: "if dS > 3, ASR unreliable." Foley note §10/§12: "NO numeric indel-posterior threshold … a ≥0.8 cutoff is NOT the paper's number." PAML note §12: "no such cutoffs … the 1.0/3.0 thresholds are convention/external, not the PAML manual." |
| PREQUAL cited to **two venues** (MBE 35:2624 vs Bioinformatics 34:3929) | **NOT present in fetched text** | SKILL gives PREQUAL **one** venue only: "Whelan et al 2018 Bioinformatics 34:3929" (both in body and Key References). No MBE 35:2624 appears. (Fetch is a summarizer pass, so a duplicate elsewhere can't be fully excluded — but as fetched, single venue. Real PREQUAL locus is not verified here; flagged rather than asserted.) |

---

## 1. Recoverability by layer

| Layer | Grade | One-line evidence |
|---|:---:|---|
| **Procedure spine** (the *audit* spine: frame claim → marginal/joint → uncertainty → depth → model → indel → reuse → SSE) | **High (as Family-B referee); Low (as skill's doer taxonomy)** | Mold §0–§8 recovers the audit walk from Yang (eqs 2/4 marginal/joint) + PAML note (RateAncestor=1→rst, verbose=1 full posterior, marginal/joint model-dependence). But the skill's 13-framework *doer* taxonomy (ape/corHMM/phytools/geiger/OUwie/RevBayes decision tables) is **out of scope** — deferred, see caveat. |
| **Validity axis** (the cardinal sins the referee catches) | **High** | Every axis note-traced: uncertainty-not-reported (Yang §12: 0.563/0.185 unique-but-low posteriors), compositional-LBA fail at p≥0.8 (Szánthó §7), SSE-without-tree-null (Rabosky §12), reuse-as-data circularity (PAML §6 "resist this irresistible temptation"), indel-ambiguity collapse (Foley §9), MAP-as-ensemble (Hochberg §7), selection-driven homoplasy (Cunningham p.665). Strongest layer — same finding as content/research/05 #1. |
| **Defaults / thresholds** | **Low — but recovered as *discipline*, not numbers** | Mold refuses all three invented cutoffs and labels them convention (index §1 Yang-0.95, §4 Foley-0.8, PAML dS); eval `no-invented-threshold` + `honest-numbers` encode the refusal. The *numbers themselves* remain unsourced (correctly). Mirrors content/research/05 #2. |

Recovered traceably: the entire **referee/validity spine** — a cast Mold flags exactly the failure modes the skill states, and each flag cites a verified note. Not recovered: the skill's **doer breadth** (continuous-trait ASR, stochastic mapping, gene-content, the full method-selection decision table) and the **actual threshold numbers** (correctly held as convention, not fabricated). We ingested **8 of ~13** proposed sources; continuous-trait ASR (BM/OU/EB, Pagel/Blomberg) and the secondary doer spine were **deliberately deferred** — a scoping caveat, not a silent miss.

---

## 2. GAP taxonomy → next actions

**Candidate Mold's own flagged gaps** (2 literal `[GAP]` markers + 3 convention-labels + 2 unverified-sidecars — the honest count, not the Phase-3 inventory's conflated "10"):

| Flag (artifact) | Bucket | Action |
|---|---|---|
| Cunningham detector/rate-asymmetry bias paywalled (index §7 `[GAP]`, scenarios irreversibility `[GAP]`) | **re-summarize existing** | Get cunningham-1999 full text pp.666–674 (parsimony-vs-ML asymmetric-rate bias, the two echinoderm results). Note captured only p.665. |
| HiSSE-as-null unverified (index §6, beaulieu ref `verification`) | **re-summarize existing** | Get beaulieu-omeara-2016 **body** (paywalled; abstract-only). Needed: CID model parameterization, Type-I rates, the explicit "use as null" sentence. |
| Yang-0.95 / Foley-0.8 / PAML-dS cutoffs (index §1/§4/§5 threshold-discipline) | **convention, not citable** | Keep labeled as workflow convention; do not cite. Matches content/research/05 finding #2. |
| ESS ≥200, bootstrap ≥70%, nsim ≥1000/5000, Pagel λ>0.7 (SKILL threshold table) | **convention, not citable** | Community thresholds, no defining primary — label, don't cite. |

**Highest-value SILENT gaps** — real-skill content no ingested note surfaced, so the blind Mold could not flag it at all (silent gap = the find that matters):

1. **Rooting / STRIDE–MAD cascade** (SKILL "Rooting Strategy": STRIDE Emms 2017 MBE 34:3267, MAD Tria 2017 Nat Eco Evo 1:0193; "marginal ASR posteriors depend critically on root position"). **No ingested note covers rooting** — Yang assumes a fixed unrooted tree; the Mold never mentions root placement. → **new source note** (Emms 2017 STRIDE; Tria 2017 MAD). A memory-written skill states this; the traceable Mold is silent.
2. **Alignment-error propagation / pre-filtering** (SKILL: PREQUAL, HmmCleaner Di Franco 2019 BMC Eco Evo 19:21; "segment-level filtering outperforms block-level"). Foley touches alignment only as *input*; no note covers error propagation into ASR. → **new source note** (PREQUAL — verify true locus; HmmCleaner).
3. **Continuous-trait BM/OU/EB adequacy** (SKILL: fitContinuous AIC, Pagel's λ, Blomberg's K, Cooper 2016, Boettiger 2012, threshBayes/Felsenstein 2012, OUwie/bayou Uyeda 2014). Deferred by scope — **new source notes** when continuous-trait ASR enters scope. Scoping caveat, not silent miss.
4. **Codon-model power / minimum design** (SKILL: "≥8 sequences, ~0.5 subs/site"; Pupko 2000 joint algorithm — *the joint algorithm* was recovered via PAML note, but the power/minimum-data guidance was not). → **convention** (the ≥8 number) + already-covered (Pupko).
5. **Stochastic mapping** (SKILL: Nielsen 2002 Syst Biol 51:729, make.simmap). No note. → **new source note** if discrete-trait mapping enters scope.

---

## 3. What the Foundry adds

The candidate Mold implies an **empirical referee/gate** the SKILL.md states as flat prose but cannot trace:

- **Per-axis pass/flag/fail verdict, each carrying its note** (Mold `## Verdict`; eval `verdict-carries-citation`). The skill's "Reviewer Expectations" section asserts the same rules ("BiSSE ban," "marginal exposes per-site uncertainty") as unsourced imperatives.
- **Catch-the-planted-flaw evals** (eval.md: `catch-site-homogeneous-deep-node-LBA`, `catch-SSE-significance-without-null`, `catch-reconstruction-reused-as-data`) with concrete planted fixtures (scenarios.md: `deep-node-site-homogeneous-model`, `BiSSE-significant-neutral-trait`, `reconstructed-seqs-reused-as-data`). The skill has no executable oracle.
- **Anti-invention threshold discipline** (eval `no-invented-threshold` + `honest-numbers`). **Concrete payoff:** this eval would have caught the skill's own two errors — the Yang-attributed ≥0.95 cutoff (Yang note §12: none prescribed) and, via `honest-numbers`, the "~40%" BiSSE figure (Rabosky note: >77%/61.5%). The `no-invented-threshold` assertion names Yang-0.95 and Foley-0.8 explicitly. A Foundry referee run against this SKILL.md flags it; the SKILL.md self-certifies.
- **Calibrate handoff / the gate** (Mold §8): alternate-reconstruction test (Hochberg), neutral-trait null simulation on the actual tree (Rabosky), compositional-constraint analysis (Szánthó). The gate obligation is structural (REFEREE_LOOP), flagged as design-inference in the Mold's footer — honest about synthesis vs. note-sourced.

---

## 4. Where bioSkills leads

Credit honestly (per projects/bioskills.md — shared strengths are *similarity, not our edge*):

- **CLI/version-compat rigor.** SKILL "Tools & Versions" pins PAML 4.10.7+, IQ-TREE 2.3.6+, GRASP 2024+, R 4.4+ (ape 5.8+, phytools 2.3+, …) plus a per-tool implementation-error table ("IQ-TREE `--ancestral` empty `.state`: specify outgroup with `-o`"; "codeml `rst` missing posteriors: set RateAncestor=1"). The Mold carries none of this operational layer — and foley note §12 explicitly *couldn't* corroborate the "GRASP 2024+" pin from the 2022 paper.
- **Breadth.** 13-framework taxonomy across sequence + discrete + continuous + gene-content, with reconciliation/decision-tree tables ("Decision Framework by Scenario," 11 rows). The Mold audits sequence + character ASR only.
- **Embedded stats the Mold lacks as content.** Marginal-vs-joint (Pupko 2000), Felsenstein parsimony bias, Pagel's λ / Blomberg's K interpretation bands — stated inline. Genuine practitioner content; the Foundry's distinction is the *automated referee*, not better prose.

Do not overclaim: on CLI discipline and breadth, bioSkills is ahead today.

---

## 5. Bottom line

Sharpest **recovered-traceably win:** the validity axis reconstructs in full and *self-defends* — the Mold's `no-invented-threshold`/`honest-numbers` evals would catch two of the real skill's own errors (Yang-attributed 0.95 cutoff that Yang never prescribes; "~40%" BiSSE Type-I where Rabosky reports >77%/61.5% vs 5% control), and the Szánthó↔"Sun M et al 2023" mis-attribution is exactly the memory-written-citation failure the trace exists to prevent. Sharpest **gap:** the **rooting/STRIDE–MAD** and **alignment-error-propagation** axes are *silent* — no ingested note surfaced them, so the blind Mold can't flag what a memory model states freely (the highest-value finds). Honest recoverability: of the skill's **referee-relevant** content, **~75–80%** recovers traceably from the 8 ingested notes (validity axis High, thresholds correctly held as convention); of the **whole** skill, closer to **~55%** — the doer breadth (continuous-trait, stochastic mapping, gene-content) was deliberately out of scope, a stated scoping caveat, not a silent failure. Consistent with content/research/05's thesis: the content was never the moat; the trace is.
