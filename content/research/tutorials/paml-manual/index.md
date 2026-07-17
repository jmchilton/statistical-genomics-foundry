---
title: "PAML Manual — codeml ancestral reconstruction + codon positive selection"
type: tutorial
source_id: paml-manual
source_url: https://raw.githubusercontent.com/abacus-gene/paml/master/doc/pamlDOC.pdf
version: "4.10.8"
access_date: "2026-07-05"
license: GPL-3.0-only
attribution: "Yang Z. PAML Manual, version 4.10.8, November 2024. Manual bundled with the PAML software package and distributed under GNU GPL v3 per the source note. Package citation: Yang Z. PAML 4: Phylogenetic analysis by maximum likelihood. Molecular Biology and Evolution 24:1586-1591, 2007."
derived: own-words-summary
tags:
  - domain/molecular-evolution
  - domain/dnds
  - domain/ancestral-reconstruction
---

# PAML manual — codeml ancestral reconstruction + codon positive selection

## 1. Citation
- Yang, Ziheng. *PAML Manual — User Guide. PAML: Phylogenetic Analysis by Maximum Likelihood.*
  Version **4.10.8 (November 2024)** (title-page line: "Version 4.10.8 (November 2024)").
  © Copyright 1993–2023 by Ziheng Yang. Distributed under the GNU GPL v3.
- Bundled document: `doc/pamlDOC.pdf` in `github.com/abacus-gene/paml`.
- Suggested software citations given inside the manual: Yang 1997 (*CABIOS* 13:555-556); Yang 2007,
  "PAML 4: a program package for phylogenetic analysis by maximum likelihood," *MBE* 24:1586-1591.
- Access: raw PDF downloaded from `raw.githubusercontent.com/abacus-gene/paml/master/doc/pamlDOC.pdf`,
  access date 2026-07-05, converted with `pdftotext`.

## 2. Access note
Full text read (converted PDF, ~4,600 lines). Math notation degrades in conversion (Greek ω renders
as blank/"w", subscripts flatten), so ω/dN/dS symbols are transcribed here as `w` where the PDF lost
them; functional strings (control-file keywords, option values, numeric thresholds) were verified
against the raw text and are reproduced exactly. No paywall. This note covers only the **codeml /
baseml** portions relevant to ancestral-state reconstruction (ASR) and codon positive selection; the
mcmctree / evolver / yn00 / pamp portions were not summarized.

## 3. Thesis (1 sentence)
codeml fits codon and amino-acid substitution models by maximum likelihood to estimate the dN/dS
ratio (ω) — across branches, across sites, or both — and, as by-products, reconstructs ancestral
sequences and identifies positively selected sites, all driven by a plain-text control file
(`codeml.ctl`).

## 4. Problem & context
Under the codon model qij ∝ ω for nonsynonymous changes, ω = dN/dS measures selection on a protein:
ω < 1 purifying, ω = 1 neutral, ω > 1 positive. The manual states the ratio averaged over all sites
and lineages is "almost never > 1," so interest focuses on detecting selection affecting **some
lineages** (branch models), **some sites** (site models), or both (branch-site models). Ancestral
reconstruction is a separate empirical-Bayes by-product used to infer interior-node sequences.

## 5. Method / approach — control-file fields and defaults

### 5a. `codeml.ctl` fields (exact spellings / accepted values verbatim)
- `seqtype` — `1`:codons (program acts as codonml); `2`:amino acids (aaml); `3`:codons translated to
  AAs. Comment line: `* 1:codons; 2:AAs; 3:codons-->AAs`.
- `model` — codon branch models: `0`:one ω all branches; `1`:free-ratio (one ω per branch,
  "use is discouraged"); `2`:several ω via branch labels. (For AA seqs `model` selects the AA model:
  `0`poisson `1`proportional `2`empirical `3`empirical+F `5`FromCodon0 `6`FromCodon1 `8`REVaa_0
  `9`REVaa(nr=189).)
- `NSsites` — site-model selector, `NSsites = m` corresponds to model Mm (see §5c). Multiple values
  allowed in one run, e.g. `NSsites = 0 1 2 3 7 8`. Verbatim comment block from `codeml.ctl`:
  `* 0:one w;1:neutral;2:selection; 3:discrete;4:freqs;` /
  `* 5:gamma;6:2gamma;7:beta;8:beta&w;` /
  `* 10:beta&gamma+1; 11:beta&normal>1; 12:0&2normal>1;` / `* 13:3normal>0`.
- `CodonFreq` — `0`:1/61 each (equal); `1`:F1X4 (avg nucleotide freq); `2`:F3X4 (avg nuc freq at the
  three codon positions); `3`:codon table (free params). #parameters = 0, 3, 9, 60 respectively (for
  the universal code). Default in the shipped `codeml.ctl` is `CodonFreq = 2`.
- `aaRatefile` — empirical AA rate matrix file (`wag.dat` default; also `dayhoff.dat`, `jones.dat`,
  `mtmam.dat`, `mtREV24.dat`). Used only for AA seqs with an empirical model.
- `cleandata` — `1` = remove sites with ambiguity characters (N, ?, W, R, Y, gaps) from all
  sequences (faster); `0` = default, keep them (treated as ambiguity; slower likelihood).
- `getSE` — `0`/`1`/`2`: standard errors of estimates via the curvature method (invert matrix of
  2nd derivatives). Manual calls these "crude" and says "The likelihood ratio test should always be
  preferred." Not available during tree search (use `getSE = 0`).
- `fix_omega` / `omega` — `fix_omega = 1` fixes ω (the last/foreground ω under `model=2`) at the
  `omega` value; `0` estimates it. Shipped default `omega = .4` (initial value).
- `fix_kappa` / `kappa` — fix or estimate transition/transversion ratio; default `kappa = 2` initial.
- `ncatG` — number of ω categories for the relevant NSsites models (default 3 for M3; the continuous
  distributions M5–M13 default to 10; clade models C/D fix `ncatG` at 3).
- `icode` — genetic code, `0`..`10` = GenBank transl_table 1..11 (`0` universal, `1` mammalian mt,
  `4` invertebrate mt, etc.); `11` = Yang's regularized code.
- `Mgene` — partition models (with option G in data): `0`/`1`(separate)/`2`/`3`/`4`.
- `Small_Diff` — step for difference-approximated derivatives; shipped `Small_Diff = .5e-6`; manual
  advises a value between `1e-8` and `1e-5` and checking insensitivity.
- `fix_blength` — `0`:ignore tree branch lengths / `-1`:random / `1`:initial / `2`:fixed (not
  estimated) / `3`:proportional (scale factor by ML).
- `method` — `0`:simultaneous update of all params; `1`:one branch at a time (not valid under clock).
- `verbose` — `0`:print only the best (highest-posterior) state per node per site; `1` (try `2`):
  print the full marginal posterior distribution. Shipped default `verbose = 0`.

### 5b. ASR machinery (`RateAncestor`)
- `RateAncestor = 0 or 1`. Shipped default `RateAncestor = 0`; manual: "Usually use 0." Control-file
  comment: `* (0,1,2): rates (alpha>0) or ancestral states (1 or 2)`.
- `RateAncestor = 1` forces **two** extra analyses: (i) under a variable-rates (gamma) model, per-site
  rates via empirical Bayes (Yang & Wang 1995), output in file `rates`; (ii) empirical-Bayesian
  reconstruction of **ancestral sequences** (Yang et al. 1995b; Pupko et al. 2000 for joint), output
  in file **`rst`**.
- Marginal reconstruction: works under both constant-rate and gamma models; picks the highest-
  posterior character at each single interior node. Joint reconstruction (Pupko et al. 2000): works
  under the one-rate-for-all-sites model only (and partition models). If homogeneous (`nhomo = 0, 1`)
  and one rate → both joint and marginal computed; under gamma → only marginal.
- `icode` (for baseml ancestral AA reconstruction of coding DNA) requires `RateAncestor = 1`.
- Results collected in `rst`. Under NSsites models, "the posterior probabilities for site classes as
  well as positively selected sites are listed in rst."

### 5c. Site models (Table 2) — NSsites codes, #free params, LRT pairs
Verbatim NOTE from the manual: "#p is the number of free parameters in the ω distribution. Parameters
in parentheses are not free … In both likelihood ratio tests comparing M1a against M2a and M7 against
M8, df = 2."

| Model | `NSsites` | #p | ω-distribution parameters |
|---|---|---|---|
| M0 (one ratio) | 0 | 1 | ω |
| M1a (neutral/NearlyNeutral) | 1 | 2 | p0 (p1=1−p0); 0<ω0<1, ω1=1 |
| M2a (selection/PositiveSelection) | 2 | 4 | p0, p1 (p2=1−p0−p1); 0<ω0<1, ω1=1, ω2>1 |
| M2a_rel | 22 | 5 | as M2a but ω2>0 (null for clade model C; Weadick & Chang 2012) |
| M3 (discrete) | 3 | 5 | p0, p1 (p2=1−p0−p1); ω0, ω1, ω2 |
| M7 (beta) | 7 | 2 | p, q |
| M8 (beta&ω) | 8 | 4 | p0 (p1=1−p0); p, q, ωs>1 |

- **Two recommended LRTs of positive selection**: M1a vs M2a (**df = 2**) and M7 vs M8 (**df = 2**).
  Manual: "The M1a-M2a comparison appears to be more stringent than the M7-M8 comparison."
- **Third test**: M8a vs M8. M8a is specified `NSsites = 8, fix_omega = 1, omega = 1` (ωs=1). Null
  distribution = the 50:50 mixture of point mass 0 and χ²₁ (Self & Liang 1987); critical values
  **2.71 at 5% and 5.41 at 1%** (vs 3.84/6.63 for χ²₁). Manual: obtain the p value from χ²₁ and halve
  it for the mixture; "You can also use χ²₁."
- **M0 vs M3**: the manual explicitly says this is a test of variable ω among sites, **not** a test of
  positive selection.
- M5–M13 (gamma / beta&gamma / normal variants) exist but are not part of the recommended selection
  tests; M8 has 11 site classes (10 beta + 1 positive class with ωs≥1).

### 5d. Branch and branch-site models
- Branch models (`model=2`): several ω via `#`/`$` branch labels in the tree; `fix_omega` fixes the
  last (foreground) ω to test whether it is > 1. `model=1` free-ratio discouraged.
- **Branch-site model A** (alternative): `model = 2, NSsites = 2, fix_omega = 0`. Four site classes
  (0, 1, 2a, 2b), np = 4 (Table 3); background has 0<ω0<1 & ω1=1, foreground class 2 has ω2≥1.
- **Null model A1**: `model = 2, NSsites = 2, fix_omega = 1, omega = 1` (ω2 fixed at 1).
- **Branch-site test of positive selection (Test 2, recommended)**: A vs A1, **df = 1**. Null
  distribution = 50:50 mixture of point mass 0 and χ²₁, critical values **2.71 at 5%, 5.41 at 1%**;
  compute p from χ²₁ and divide by 2 (example: statistic 2.71 → χ²₁ p = 0.10 → mixture p = 0.05).
  Manual **recommends using χ²₁ (critical 3.84 and 5.99) instead of the mixture** "to guard against
  violations of model assumptions."
- **Branch-site Test 1** (not recommended): alternative = model A, null = site model **M1a**, df = 2;
  can be significant under relaxed constraint OR positive selection.
- Old **model B** (not recommended): `model = 2, NSsites = 3`; null = discrete site model
  `model = 0, NSsites = 3, ncatG = 2`, use df = 2.
- **Clade model C**: `model = 3, NSsites = 2`; **Clade model D**: `model = 3, NSsites = 3`; both fix
  `ncatG = 3`. M2a_rel (`NSsites = 22`) is the null for clade model C.

### 5e. BEB / NEB output
- NEB (naïve empirical Bayes) and BEB (Bayes empirical Bayes, Yang et al. 2005) both compute posterior
  probabilities for site classes / positively selected sites. **BEB is implemented under M2a and M8
  only** (and under modified branch-site model A, not model B). Manual: "ignore the NEB output and use
  the BEB results only."
- BEB output format (verbatim example from the manual):
  header `Prob(w>1) mean w`; sample line `135 K 0.983* 4.615 +- 1.329`. Interpretation given: 4.615 is
  the approximate posterior mean of ω, 1.329 is the sqrt of the posterior variance. Marker rule
  verbatim: "The program prints out an `*` if the posterior probability is >95%, and `**` if the
  probability is > 99%."
  → The manual documents the `*` (>95%) / `**` (>99%) **markers** and the `Prob(w>1)` and `mean w`
  columns; it does not print separate literal `0.95`/`0.99` numeric-cutoff columns.

### 5f. `chi2` utility
- Separate program `chi2` calculates χ² critical values and p values for LRTs. Three invocation modes:
  `chi2` (prints critical values for various df — e.g. "the 5% critical value with d.f. = 1 is 3.84");
  `chi2 p` (one arg → interactive loop asking df and test statistic → p value); `chi2 1 3.84` (df and
  statistic as command-line args). The `chi2` tool itself computes plain χ² — the 50:50-mixture
  halving for branch-site / M8a tests is a manual instruction the user applies to the χ²₁ p value, not
  a `chi2` mode.

## 6. Key claims / findings (atomic)
- Recommended site-model LRTs: M1a↔M2a and M7↔M8, both **df = 2**; M1a↔M2a is the more stringent.
- M8a↔M8 test: null = 50:50 mixture of point mass 0 and χ²₁; crit **2.71** (5%) / **5.41** (1%).
- Branch-site Test 2 (model A vs A1) has **df = 1**; same 50:50 mixture null (2.71 / 5.41); manual
  recommends using plain χ²₁ (3.84 / 5.99) to be conservative.
- BEB restricted to M2a, M8, and branch-site model A; use BEB, ignore NEB.
- Positively selected sites flagged with `*` (posterior > 95%) / `**` (> 99%); numeric 0.95/0.99 are
  stated only as ">95%"/">99%" in the marker rule, not as separate output columns.
- Ancestral reconstruction requires `RateAncestor = 1`; output in `rst`, `rates` for per-site rates.
- Joint ASR (Pupko 2000) valid only under one-rate-for-all-sites; gamma yields marginal only.
- ω bounds (source-code `SetxBound` in codeml.c): `omegab[]=.001,99` → lower 0.001, **upper 99**.
- The manual states **no** numeric dS / branch-length saturation threshold anywhere (see §9, §10).

## 7. Load-bearing statements — license mode: **PERMISSIVE (GPL-3.0)**
GPL-3.0 is a free/open-source license covering the documentation, so short verbatim load-bearing
quotes are permitted. Following the re-summarization directive, expressive prose is kept in own-words
above; the strings below are short, load-bearing, and largely functional. Locations are by manual
section.

1. (verbatim, "Codon substitution models" §, site models) "In both likelihood ratio tests comparing
   M1a against M2a and M7 against M8, df = 2."
2. (verbatim, M8a description) "M8a is specified using NSsites = 8, fix_omega = 1, omega = 1. The null
   distribution is the 50:50 mixture of point mass 0 and [χ²₁] … The critical values are 2.71 at 5%
   and 5.41 at 1% (as opposed to 3.84 for 5% and 6.63 for 1% for [χ²₁])."
3. (verbatim, branch-site test) "The null distribution is the 50:50 mixture of point mass 0 and [χ²₁],
   with critical values 2.71 at 5% and 5.41 at 1%. … We recommend that you use [χ²₁] (with critical
   values 3.84 and 5.99) instead of the mixture to guide against violations of model assumptions."
4. (verbatim, Table 3 NOTE) "Branch-site model A is specified using model = 2 NSsites = 2. This is the
   alternative model in the branch-site test of positive selection. The null model fixes [ω2] = 1. The
   likelihood ratio test has df = 1."
5. (verbatim, BEB output) "The program prints out an * if the posterior probability is >95%, and ** if
   the probability is > 99%."
6. (verbatim, RateAncestor) "RateAncestor = 0 or 1. Usually use 0." and "Results of ancestral
   reconstructions (RateAncestor = 1) are collected in the file rst."
7. (verbatim, source-code bounds) `double alphab[]=0.005,99, rhob[]=0.01,0.99, omegab[]=.001,99;`

## 8. Stated scope, assumptions, limitations (source's own caveats)
- The all-sites/all-lineages average ω is "almost never > 1," motivating site/branch/branch-site tests.
- Free-ratio branch model (`model=1`) is parameter-rich; "its use is discouraged."
- getSE errors are "crude," rely on a normal approximation; "The likelihood ratio test should always
  be preferred."
- The gamma-rates-for-codons model (`fix_alpha`/`alpha` with codons) is disliked by the author; use
  NSsites instead. The program aborts if both NSsites and alpha are specified.
- Old tests (branch-site model B; branch-site Test 1) are explicitly not recommended.
- On reusing reconstructed ancestral sequences as observed data: "You should resist this irresistible
  temptation and use full likelihood methods if they are available." (Points to systematic biases,
  Yang 2006 §4.4.4.)
- dN/dS from Nei & Gojobori (1986) are used only as **initial** branch-length estimates, "not MLEs
  themselves."

## 9. Failure modes / invalidity patterns (referee-relevant)
- **Wrong null for branch-site test**: using plain χ²₁ df=1 with the 50:50-mixture critical value, or
  vice versa, mis-sets significance. Manual states the mixture (2.71/5.41) as correct but recommends
  the conservative χ²₁ (3.84/5.99) against assumption violations.
- **BEB unavailable outside M2a/M8/branch-site A**: requesting positively-selected-site posteriors
  from other models silently falls back to NEB, which "do[es] not account for [MLE] sampling errors."
- **Joint ASR under gamma**: not computed — only marginal reconstruction available; the manual notes
  the joint algorithm "works under the model of one rate for all sites only."
- **Conflict between data and fixed branch lengths** (`fix_blength = 2`): "the data and tree will be
  in conflict and the program will abort."
- **Specifying both NSsites and alpha**: "The program should abort."
- **Parsimony branch lengths as initial values**: "very poor initial values" (they are counts, not
  per-site rates).
- **Borderline ASR sites**: marginal and joint reconstructions "may [conflict] in borderline cases
  where two or more reconstructions have similar posterior probabilities."
- **ω hitting its bound (99)**: the manual lists `omegab[]=.001,99` but does **not** state what
  reaching the bound means diagnostically [see §10]. `[summarizer-inferred]` a fitted ω pinned at 99
  would indicate an optimization boundary / near-infinite estimate, but the manual does not say so.

## 10. What the source does NOT address (confident silences)
- **No dS / branch-length saturation cutoff.** No occurrence of "saturation," "dS < 1.0," "dS < 1.5,"
  "dS < 3," "dS > 3," or any numeric reliability threshold on synonymous distance or branch length
  anywhere in the manual.
- **No literal `rst` section-header strings.** The manual describes `rst` contents (per-site posterior
  distributions, best states, positively selected sites) but does **not** print the literal parser
  header strings a downstream regex might key on (e.g. "Prob distribution at node", "List of extant
  and reconstructed sequences" do not appear in the manual text). These live in the actual `rst`
  output file, not in this documentation.
- **No `--version` flag** documented for codeml; programs are run by typing their name (optionally with
  a control-file argument), no version-query flag described.
- **No explicit 4.9→4.10 output-format-stability statement.** The manual notes "From version 4.10, I
  have added a maintree option" but makes no claim about `rst`/`mlc` format stability across versions.
- **Meaning of ω at its upper bound (99)** is not explained.

## 11. Open questions / ambiguities
- The manual gives ω upper bound as `99` (source-code `omegab`), not 999; whether 999 was used in an
  earlier PAML version is not addressed here (999 in this manual is `rateb`, the branch/site
  substitution-rate bound, unrelated to ω).
- Whether BEB posterior cutoffs other than the printed `*`(>95%)/`**`(>99%) are configurable is not
  stated.
- Exact `rst` section headers must be recovered from a real run, not this document.

## 12. Guidance answers

**ASR layer:**
- `RateAncestor=1` behavior — verbatim: `RateAncestor = 0 or 1. Usually use 0.` `=1` triggers per-site
  rate estimation (file `rates`, gamma models) and empirical-Bayesian ancestral-sequence
  reconstruction (file `rst`). Shipped default `RateAncestor = 0`. (§5b)
- codeml ASR fields / defaults — captured verbatim in §5a: `seqtype` (1 codon / 2 aa / 3 codons→aa),
  `model`, `NSsites`, `CodonFreq` (0/1/2/3 → 0/3/9/60 params), `aaRatefile` (default `wag.dat`),
  `cleandata` (default 0), `getSE` (0/1/2). Additional ASR-relevant: `verbose`, `icode`, `method`,
  `fix_blength`, `Small_Diff`.
- `rst` section-header strings — **NOT provided by the manual.** The manual describes `rst` content but
  does not print literal parser headers ("Prob distribution at node", "List of extant and
  reconstructed sequences" are absent from the manual text). Flag: recover from a live run. (§10)
- SATURATION / reliability limits — **NOT in the manual.** No "dS < 1.0", "dS < 3", "dS > 3
  unreliable", or "saturation" anywhere. The skill's "dS/branch length < 1.0" and "dS > 3 unreliable"
  are **convention, not from this manual** → flag as convention / mis-cited to "Yang 2007 PAML manual."
- Version notes — manual is v4.10.8 (Nov 2024). No `--version` flag documented; no explicit
  4.9→4.10 output-format-stability statement (only mentions a new `maintree` option from v4.10). (§10)

**SELECTION layer:**
- NSsites↔M-model mapping + df — full Table 2 in §5c. Verbatim NSsites comment line:
  `* 0:one w;1:neutral;2:selection; 3:discrete;4:freqs;` (continuing `5:gamma;6:2gamma;7:beta;8:beta&w;`
  `10:beta&gamma+1; 11:beta&normal>1; 12:0&2normal>1; 13:3normal>0`). Codes: M0=0, M1a=1, M2a=2,
  M2a_rel=22, M3=3, M7=7, M8=8. Free params: M0 #p=1, M1a #p=2, M2a #p=4, M2a_rel #p=5, M3 #p=5,
  M7 #p=2, M8 #p=4. Nested LRT pairs: **M1a vs M2a (df=2)**, **M7 vs M8 (df=2)**, **M8a vs M8** (M8a =
  `NSsites=8, fix_omega=1, omega=1`; 50:50 mixture null, 2.71/5.41). M0 vs M3 is a test of ω-variation,
  NOT positive selection.
- Branch-site A vs A1 — A: `model = 2, NSsites = 2, fix_omega = 0` (verbatim). A1 (null):
  `model = 2, NSsites = 2, fix_omega = 1, omega = 1` (verbatim). Test 2, df=1. Confirmed. (§5d)
- `chi2` utility + branch-site null distribution — YES, the manual states it. Verbatim: null is "the
  50:50 mixture of point mass 0 and [χ²₁], with critical values **2.71** at 5% and **5.41** at 1%,"
  with the explicit recommendation to use plain χ²₁ (3.84/5.99) to guard against assumption violations.
  The `chi2` program computes plain χ² critical values/p-values (three CLI modes, §5f); the mixture
  halving is a manual-prescribed hand step on the χ²₁ p value, not a `chi2` feature.
- BEB posterior columns/cutoffs — columns `Prob(w>1)` and `mean w`; markers `*` (posterior **>95%**)
  and `**` (**>99%**). The manual states the 95%/99% thresholds **only** via the `*`/`**` marker rule
  in prose (">95%", "> 99%"), not as separate literal `0.95`/`0.99` output columns. BEB implemented
  for M2a, M8, and branch-site model A only. (§5e)
- ω upper bound — the manual gives `omegab[]=.001,99` (lower 0.001, **upper 99**) in codeml.c
  `SetxBound`, changeable only by recompiling. It does **not** state the value `999` for ω (999 here is
  `rateb`, the substitution-rate bound), and does **not** explain what hitting the ω bound means. So
  the guidance's "often 999" does not match this manual's ω bound. (§9, §11)
- dS-saturation re-confirmation — **CONFIRMED ABSENT.** No numeric dS/branch-length saturation cutoff
  (no dS<1.5, dS<3, or "saturation") appears in the manual. The "dS<1.5 / dS<3, Yang 2007 PAML manual"
  citation is **not supported by this manual → convention, mis-cited.** (§10)
