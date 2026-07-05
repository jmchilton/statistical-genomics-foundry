# CAFE 5 — Mendes et al. 2020 (source note)

## 1. Citation
Mendes FK, Vanderpool D, Fulton B, Hahn MW. 2020. "CAFE 5 models variation in
evolutionary rates among gene families." *Bioinformatics* 36(22–23):5516–5518.
DOI: 10.1093/bioinformatics/btaa1022. PMID: 33325502.
URL: https://academic.oup.com/bioinformatics/article/36/22-23/5516/6039105
Software: CAFE 5, source/docs/manual at https://github.com/hahnlab/CAFE5/releases (paper's stated availability; no specific version number given in the note).
Access date: 2026-07-03.

## 2. Access note
Read via the Oxford Academic article page (abstract + body text as surfaced there).
The ResearchGate full-text PDF returned HTTP 403 and could not be read. This is a short
Applications Note; the captured content covers abstract, results, and the reported
per-dataset parameter values. **License mode: restrictive / all-rights-reserved →
OWN-WORDS paraphrase for prose; functional strings (parameter names, numeric values)
verbatim.** No CC license present (see §7). Boundary: some fine body detail (exact
supplementary figures, any full sentence-level nuance I could not surface) may be
incomplete; where a fact was not found it is marked "not stated in paper."

## 3. Thesis (1 sentence)
CAFE 5 is a rewritten gene-family gain/loss package whose central addition over prior
CAFE versions is explicitly modeling rate variation *among gene families* using
gamma-distributed rate categories, rather than assuming one shared rate for all families.

## 4. Problem & context
Genome sequencing shows frequent gene gains and losses between species. Earlier CAFE
versions estimated gene gain/loss parameters across a phylogeny but assumed **all gene
families evolve at the same rate**, despite evidence of large rate variation among
families. CAFE models rates of change with a birth-death process having a mean rate λ
(lambda) of gain and loss common to all families; the paper motivates relaxing that
single-rate assumption.

## 5. Method / approach
- Birth-death model of gene-family size change on a phylogeny; mean gain/loss rate λ
  estimated by maximum likelihood (own-words).
- **Rate variation among families** modeled with a **discrete approximation of the gamma
  (Γ) distribution**, the same approach used by DupliPHY. Number of discrete rate
  categories **K** is specified *a priori*; each category is assumed equi-probable (1/K).
  The Γ distribution is scaled so the mean rate across categories is 1, with shape
  parameter **α** (with α = β) estimated from the data.
- **Empirical Bayes** step: estimates the posterior probability that a given family
  belongs to each rate category, enabling downstream "slow" vs. "fast" family analyses.
- Interface: **strictly command-line**; the earlier script-based paradigm (accessory
  scripts) was discarded. Command-line arguments now "preclude the use of accessory
  scripts" (own-words).
- Output: reconfigured to minimize post-processing; trees written to a **Nexus** file for
  easy viewing.
- Multithreaded; the paper reports noticeable performance increases up to at least 64 cores
  (Supplementary Fig. S1).
- Exact default parameter values (e.g. default K) are **not stated in the paper.**

## 6. Key claims / findings (atomic)
- CAFE 5 is a complete rewrite with performance and user-interface enhancements over prior
  versions.
- New capability vs. prior CAFE: explicit modeling of rate variation among families via
  gamma-distributed rate categories (analogous to among-site rate models for nucleotides/
  amino acids).
- Number of rate categories K is user-specified a priori; categories equi-probable (1/K);
  Γ mean scaled to 1; shape α (=β) estimated from data.
- Empirical Bayes gives posterior probability of a family's rate category → identify slow/
  fast families.
- Per-dataset results reported (functional values, verbatim):
  - Primates: K = 4, λ = 0.00453, α = 0.62
  - Birds of paradise: K = 10, λ = 0.00226, α = 0.98
  - Hymenoptera: K = 6, λ = 0.00375, α = 0.373
- The most rapidly evolving families (in gain/loss) flagged include sex/reproduction-related
  and immunity families.
- Multithreading scales with noticeable gains up to at least 64 cores.
- Improved output: Nexus trees; reduced post-processing.

## 7. Load-bearing statements (OWN-WORDS paraphrase — restrictive license; functional strings verbatim)
- Copyright line, verbatim (functional/legal string): "© The Author(s) 2020. Published by
  Oxford University Press. All rights reserved." → confirms restrictive posture.
- Prior CAFE assumed a single gain/loss rate λ common to all families; CAFE 5's headline
  change is modeling among-family rate variation with gamma rate categories (own-words).
- K (number of discrete rate categories) is specified a priori and each category is
  equi-probable at 1/K; the Γ is scaled to mean rate 1 with shape α = β estimated from data
  (own-words; the symbols K, α, β, λ and "1/K" are functional strings).
- Reported parameter values per dataset are functional numeric strings, reproduced verbatim
  in §6.
- The script-based paradigm of earlier versions was discarded for a strictly command-line
  interface (own-words).

## 8. Stated scope, assumptions, limitations
- Model assumes a birth-death process of gene-family size change on a given phylogeny.
- K must be chosen a priori by the user (paper does not give a rule or default for choosing K).
- Rate categories assumed equi-probable (1/K) and the Γ scaled to mean 1 — modeling
  assumptions carried by the gamma-categories approach.
- The paper does not report the total number of gene families per dataset, nor any minimum.

## 9. Failure modes / invalidity patterns
- **Not spelled out in this paper.** The Applications Note names no explicit diagnostic,
  error message, invalidity condition, or value range at which the method breaks.
- [summarizer-inferred] The single free knob highlighted is K (chosen a priori) and α
  (estimated); the paper gives no guidance on mis-specifying K, so failure/robustness under
  wrong K is not characterized here.

## 10. What the source does NOT address (confident silences)
- **No claim of Type-I error control / false-positive control** anywhere in the paper.
- **No per-family p-value and no explicit null-hypothesis test** described; family-level
  inference here is the empirical-Bayes posterior rate-category probability, not a p-value.
- **No minimum number of gene families / orthogroups** stated (no "> 100", no "> 1000").
- **No error/annotation-uncertainty model documented as a CAFE 5 feature.** The paper's only
  contact with error modeling is a citation to the CAFE 3 work (its title contains
  "in the presence of error in genome assembly and annotation"); the note surfaces no
  statement that CAFE 5 itself implements an error model.
- **No specific CLI flag names** (e.g. `-i`, `-t`, `-p`, `-k`, `-e`, `-o`) appear in the
  surfaced text.
- **No specific output-file names** (e.g. Base_results.txt, Base_clade_results.txt,
  Base_asr.tre, Base_change.tab) appear; only "Nexus file" is named.
- No per-family or per-clade λ output is described; only global λ per dataset is reported.
- No total gene-family counts per dataset; no runtime seconds/speedup ratio vs CAFE 4 in
  main text (only the ≤64-core scaling note).

## 11. Open questions / ambiguities
- Default value of K and how to choose it: not given.
- Whether CAFE 5 carries the CAFE 3 error model, and via what option: unresolved from this
  paper (would need the CAFE5 manual — a separate source; do not import here).
- Exact CLI flags and output-file names: unresolved from this paper (manual-level).
- What downstream test, if any, converts posterior rate-category probabilities into a
  significance call: not described.

## 12. Guidance answers
**Q: What CAFE 5 adds over earlier versions (exact gamma mechanism).**
Discrete approximation of the gamma (Γ) distribution with K categories specified a priori,
each equi-probable (1/K), Γ scaled to mean 1, shape α (=β) estimated from data (ML);
empirical Bayes then gives each family's posterior probability of belonging to a rate
category, enabling slow/fast-family analysis. Same approach as DupliPHY. (Own-words;
symbols verbatim.)

**Q: Error-model feature / flags.** Not documented as a CAFE 5 feature in this paper. The
only error-modeling reference is a citation to CAFE 3 (Han et al.), whose title mentions
"error in genome assembly and annotation." No `-e`/error-model flag, and no flag-argument
concatenation syntax, appears in the paper. → Treat error-model flags as manual-level, not
paper-stated.

**Q: CLI functional strings (`-i`, `-t`, `-p`, `-k`, `-e`, `-o`); is K=4 a default?;
output artifact names.** None of these flags are stated in the paper. K=4 appears only as
the value *used for the primates dataset*, **not** as a documented default. Output file
names (Base_results.txt, Base_clade_results.txt, Base_asr.tre, Base_change.tab) are **not**
named in the paper — only a "Nexus file" for trees is mentioned. → All of these flags/
filenames are manual-only relative to this source.

**Q1: "explicit Type-I error control."** The paper makes **no such claim.** No mention of
Type-I error, false positives, or error-rate control anywhere. → Skill attribution to this
paper is unsupported by the source.

**Q2: "needs > 100 orthogroups (preferably > 1000)" / any minimum.** The paper states **no
minimum number of gene families/orthogroups.** → The >100/>1000 threshold is not grounded in
this paper; treat as convention/manual, not Mendes 2020.

**Q3: per-family p-value vs global-lambda-only; against what null.** The paper reports a
**global λ** (per dataset) and, for family-level inference, an **empirical-Bayes posterior
probability** of a family's rate category — **not** a per-family p-value and **not** an
explicit null-model significance test. Reported λ values are global per dataset; no
per-family or per-clade λ output is described.

**Q: What lambda is and reported outputs.** λ is the mean rate of gene gain and loss under
the birth-death model, common to all families (in the base model), estimated by ML. Reported
outputs surfaced: global λ per dataset (0.00453 / 0.00226 / 0.00375), shape α per dataset,
and Nexus trees. Per-family / per-clade λ outputs are not described in this paper.
