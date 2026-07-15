---
title: "Detecting macroevolutionary genotype-phenotype associations using error-corrected rates of protein convergence"
type: paper
source_id: fukushima-pollock-2023-csubst
source_url: https://github.com/kfuku52/csubst
access_date: "2026-07-06"
license: MIT
license_file: LICENSES/MIT.LICENSE
attribution: "Fukushima K, Pollock DD. Nature Ecology & Evolution 7:155-170, 2023. DOI 10.1038/s41559-022-01932-7. Paywalled primary NOT read; summarized from OPEN surrogates only - the author-written CSUBST repository/wiki (github.com/kfuku52/csubst, MIT License, (c) Kenji Fukushima; primary provenance) and the Barua et al. 2026 application (MBE 43(1):msag015, CC-BY 4.0, via PMC12849823). Mixed posture: dominant source is MIT-licensed docs, one CC-BY surrogate."
derived: license-aware-summary
---

# CSUBST / ω_C (Fukushima & Pollock 2023) — faithful source note

> Summarized from OPEN surrogates only; the primary paper body is paywalled and was NOT read.
> Each fact is labeled by provenance: **[MIT-docs]** = author-written CSUBST repo/wiki
> (github.com/kfuku52/csubst, MIT, © Kenji Fukushima); **[CC-BY-app]** = the Barua et al. 2026
> application (MBE, CC-BY 4.0). Do not read either surrogate as a citation of the paywalled primary.

## 1. Citation

- **Primary method (paywalled — NOT read):** Fukushima K, Pollock DD. 2023. "Detecting
  macroevolutionary genotype–phenotype associations using error-corrected rates of protein
  convergence." *Nature Ecology & Evolution* 7:155–170. DOI 10.1038/s41559-022-01932-7.
  (Exact title confirmed from the MIT repo README + wiki citation blocks — it is *not* the
  "non-parametric phylogenetic regression" title tentatively given in guidance.)
- **Surrogate A [MIT-docs]:** CSUBST software repository + wiki, github.com/kfuku52/csubst
  (README, Home, `csubst search`, `csubst scan`, Foreground-specification, FAQ, "How ω and ω_C
  are different", output-interpretation, spurious-convergence pages). MIT License; author Kenji
  Fukushima (confirmed). Version summarized: current wiki `master` (unversioned docs) as accessed
  **2026-07-06**. Paper-referenced legacy code version noted in FAQ as **v0.20.17** (commit
  `bbe7ef7`).
- **Surrogate B [CC-BY-app]:** Barua A, Srivastava M, Beinsteiner B, Laudet V, Robinson-Rechavi M.
  2026. "Estimates of molecular convergence reveal multiple genes with adaptive variation across
  teleost fish." *Molecular Biology and Evolution* 43(1):msag015. DOI 10.1093/molbev/msag015.
  Creative Commons Attribution License (CC-BY 4.0). Accessed 2026-07-06 via PMC12849823.

## 2. Access note

Primary *Nat Ecol Evol* article body is paywalled — **not read**; no claim here is sourced to its
main text. The two surrogates were read in full to the extent reachable: repo README (raw) + eleven
wiki pages (cloned wiki repo, read directly); the Barua paper via PMC HTML. Where a definition lives
only in the paywalled primary (e.g. the exact estimator equations for dN_C/dS_C and the null model
derivation), the surrogates give the framing but not the math — flagged below.

## 3. Thesis (one sentence)

CSUBST estimates **ω_C**, an "error-corrected rate of protein convergence" for *combinations of
branches*, distinct from the per-branch rate-of-evolution ω(dN/dS), to detect molecular convergence
beyond a neutral expectation. **[MIT-docs]**

## 4. Problem & context

**[MIT-docs]** CSUBST ("**C**ombinatorial **SUBST**itutions") analyzes codon sequences on a
phylogenetic tree to find recurrent substitutions at the *same* protein site across multiple
*independent* branches — candidate convergent amino-acid substitutions when they reach the same
amino acid. Standard ω(dN/dS) measures how *fast* a single branch evolves; it does not measure
whether separate lineages evolved in the *same direction*. CSUBST targets that second question.

## 5. Method / approach

**[MIT-docs]** — unit of analysis and estimator:
- ω is measured **per branch** and "yields a single value for a single branch"; **ω_C** is built
  "based on the per-branch ω framework" but "yields a single value for a **combination** of multiple
  branches." So the unit is a **branch combination** (arity K ≥ 2), not a site and not a single
  branch. (Site-resolved tables exist as optional outputs but the statistic is per-combination.)
- ω_C measures how much proteins of separate lineages "have evolved 'in similar directions' rather
  than how much they have evolved 'at similar rates'."
- Reported statistics: `omegaC`, `dNC`, `dSC` (functional strings, verbatim); the main convergence
  statistic is the `any2spe` variant — `omegaCany2spe` / `OCNany2spe` correspond to the main
  statistics of Fukushima & Pollock 2023. Observed vs expected combinatorial counts are
  `OCN*`/`OCS*` (observed nonsyn/syn convergence) and `ECN*`/`ECS*` (expected).
- **Null / neutral expectation:** ω_C is "error-corrected" with "null expectations based on empirical
  or mechanistic codon substitution models." Selected by `--expectation_method codon_model|urn`
  (`--omegaC_method` is a deprecated alias). The exact estimator equations and null-model derivation
  are in the paywalled primary — **not captured** here (only that O/E are formed against a
  codon-model expectation). `[GAP: exact dN_C, dS_C formulas]`
- **Substitution histories** (ancestral states) are estimated internally on the rooted tree — CSUBST
  "estimates substitution histories on a rooted tree" and depends on **IQ-TREE** (2.x/3.x) for the
  model fit / site rates. Ancestral states are therefore *computed by the tool*, not a required user
  input. Branch lengths are recalculated internally, so any topologically-correct tree with matching
  tip labels is usable.

**Required user inputs [MIT-docs]:**
1. Rooted tree, **Newick** (`--rooted_tree_file`);
2. In-frame **codon** alignment, FASTA / `.fa.gz` (`--alignment_file`);
3. A **foreground** lineage file (`--foreground`) — see §12 on whether it is mandatory.

**CLI (functional strings, verbatim) [MIT-docs]:**
Subcommands: `csubst dataset`, `csubst doctor`, `csubst search` (legacy alias `csubst analyze`),
`csubst scan`, `csubst inspect`, `csubst sites` (legacy alias `csubst site`), `csubst simulate`,
`csubst benchmark`, `csubst benchmark-plot`.

Minimal run:
```bash
csubst search \
  --alignment_file alignment.fa.gz \
  --rooted_tree_file tree.nwk \
  --foreground foreground.txt
```
Key `csubst search` options (verbatim): `--max_arity` (max branches per combination),
`--foreground`, `--fg_format` (1 or 2), `--fg_exclude_wg`, `--expectation_method codon_model|urn`,
`--asrv`, `--pseudocount_mode`, `--output_stat` (default `any2any,any2dif,any2spe`), `--cutoff_stat`
(higher-order thresholds), `--calibrate_longtail` (adds `*_nocalib` columns), `--b/--s/--bs/--cs/--cbs`
(output tables). Main output: `csubst_cb_K.tsv` (branch-combination table; `K` set by `--max_arity`),
plus `csubst_cb_stats.tsv` whose `mode` column is `foreground`, `exhaustive`, or `branch_and_bound`.

Related commands **[MIT-docs]:** `csubst scan` is a *separate* direct scan for recurrent
amino-acid/recoded-state substitutions shared by foreground clades (default `--scan_match any2spe`),
"separate from the `omegaC` branch-combination search used by `csubst search`" — it reports a Poisson
`p_rate_enrichment` foreground-vs-control test, not ω_C. `csubst simulate` generates alignments under
user-defined convergence scenarios (for benchmarking).

## 6. Key claims / findings (atomic)

1. **[MIT-docs]** ω and ω_C "measure totally different aspects of molecular evolution": ω = rate of
   protein *evolution* (per branch); ω_C = rate of protein *convergence* (per branch combination).
2. **[MIT-docs]** By simulation in Fukushima & Pollock (2023), ω "had almost no effect on ω_C in the
   range of 0.1 to 5," which the authors take as evidence the two indicators are distinct. (Stated as
   a summary of the paywalled paper's simulation; underlying data not in the surrogate.)
3. **[CC-BY-app]** Decision framing: ω_C(dN_C/dS_C) > 1 = "directional convergence beyond neutrality,"
   presented as analogous to ω(dN/dS) > 1 = positive selection (verbatim quote in §7).
4. **[CC-BY-app]** Applied thresholds (one worked example, not a universal rule): combinations with
   **ω_C ≥ 5 AND OCN ≥ 5** classified as convergence evidence, further requiring convergence in ≥3
   independent branch combinations. (These are that paper's chosen cutoffs, not CSUBST defaults.)
5. **[MIT-docs]** Recommended practice pairs an **ω_C cutoff with an OCN (O_C^N) cutoff**; a large ω_C
   alone is not sufficient (FAQ, see §9).
6. **[MIT-docs]** Higher-order (K>2) convergence is detected heuristically; `csubst_cb_10.tsv` is only
   produced when the ten branches are mutually independent (no sister pairs) and a 9-/10-way
   convergence meets `--cutoff_stat`.

## 7. Load-bearing statements — MODE: permissive (MIT + CC-BY 4.0) → short verbatim quotes allowed

- **[CC-BY-app]** (Barua et al. 2026, ω_C-vs-selection framing, verbatim):
  > "Similar to how a ω (dN/dS) > 1 indicates positive selection, the convergence ratio ωC (dNC/dSC)
  > > 1 represents directional convergence beyond neutrality."
- **[MIT-docs]** (wiki "How ω and ω_C are different", verbatim):
  > "ω yields a single value for a single branch, whereas ω_C yields a single value for a combination
  > of multiple branches. And ω_C measures how much the proteins of separate lineages have evolved
  > 'in similar directions' rather than how much they have evolved 'at similar rates'."
- **[MIT-docs]** (wiki, verbatim):
  > "The fact that ω had almost no effect on ω_C in the range of 0.1 to 5 indicates that they are
  > distinct indicators."
- **[MIT-docs]** (README, verbatim):
  > "CSUBST is a tool for analyzing Combinatorial SUBSTitutions in codon sequences on phylogenetic
  > trees."

## 8. Stated scope, assumptions, limitations (source's own caveats)

- **[MIT-docs]** ω_C = **Inf** / very large values are legitimate outputs, not bugs — they arise when
  member branches have few substitutions, giving near-zero observed convergence (O_C^N, O_C^S); such
  cases "should not be considered biologically significant" and are excluded via an OCN cutoff.
- **[MIT-docs]** Gene trees are recommended; a species tree is permissible only for single-copy genes
  with no lineage-specific-duplication focus, because gene-tree discordance "may adversely affect the
  outcomes" (CSUBST is "designed to mitigate such artifacts" but does not eliminate them).
- **[MIT-docs]** Sites unambiguous for fewer than 4 OTUs cannot be analyzed for convergence.
- **[MIT-docs]** Epistasis options and `--calc_omega_pvalue` (empirical ω p-value) are marked
  **Experimental** and off by default.
- **[MIT-docs]** ω_C's error-correction depends on the chosen codon-model expectation and on IQ-TREE
  outputs (needs IQ-TREE 2.x/3.x; for some IQ-TREE-3 codon runs without `pi(...)` entries CSUBST
  estimates empirical codon frequencies from the alignment).
- **[CC-BY-app]** Their pipeline added post-hoc filtering to remove spurious convergence from
  misaligned sequences — i.e. the tool's raw hits still needed alignment-quality screening.

## 9. Failure modes / invalidity patterns (referee-relevant)

- **[MIT-docs]** **Small-substitution-count branch combinations** → spuriously huge/Inf ω_C with near-zero
  real convergence. Symptom/detector: `O_C^N` (OCN) near 0 (e.g. 0.001 posterior); named remedy:
  apply an **OCN cutoff alongside the ω_C cutoff**. "Even if ω_C is very large, such convergence …
  should not be considered biologically significant."
- **[MIT-docs]** **Misaligned sequences / inconsistent splice variants** → unnaturally localized
  convergent substitutions. Named diagnostic: the `csubst sites` summary PDF — the *near-complete
  absence of synonymous convergence* (gray bars) is the tell; the authors state that in these cases
  "it [is] difficult for even ω_C to suppress the false signal completely" (ref: Supplementary Text 12
  of the paywalled primary — content not read).
- **[MIT-docs]** **Gene-tree/species-tree discordance** when a species tree substitutes for gene trees
  → possible artifacts.
- **[summarizer-inferred]** No family-wise multiple-testing correction over the (potentially huge)
  set of branch combinations is described in the surrogates; the ω_C/OCN cutoffs are the stated guard.
  Flagging as an inference — the surrogates neither assert nor deny an FWER/FDR step for `csubst search`
  (the *separate* `csubst scan` command does report BH-corrected Q values).

## 10. What the surrogates do NOT address (confident silences)

- **The central guidance confound is NOT stated in either open surrogate.** Neither the MIT docs nor
  the CC-BY application says that convergent/parallel substitutions across independent lineages can
  produce a **false branch-specific positive-selection or accelerated-dN/dS signal under standard
  branch-site models (codeml / HyPhy)**. codeml and HyPhy are not mentioned at all. (See §12.)
- Exact mathematical definitions/estimators of dN_C and dS_C and the null-expectation derivation
  (these are in the paywalled primary).
- Any calibration of ω_C to a formal significance test/p-value for `csubst search` (an empirical
  ω p-value option exists but is experimental).

## 11. Open questions / ambiguities

- Precise per-combination formula for dN_C, dS_C, and the O/E normalization (paywalled).
- Whether `--expectation_method urn` vs `codon_model` changes the ω_C>1 interpretation (docs name the
  switch but do not compare their statistical behavior).
- Whether a default `--cutoff_stat` value is applied and what it is (docs describe the parameter, not a
  numeric default).

## 12. Guidance answers

**Q1 — How is ω_C(dN_C/dS_C) defined/computed; over what unit; against what neutral expectation?**
**[MIT-docs]** Unit = **branch combination** (K≥2), built on the per-branch ω framework; ω_C =
dN_C/dS_C where dN_C/dS_C are the nonsynonymous/synonymous *combinatorial* rates over the combination
(`dNC`/`dSC` columns), formed from observed vs expected combinatorial counts (`OCN/OCS` vs `ECN/ECS`).
Neutral expectation = "null expectations based on empirical or mechanistic codon substitution models"
(`--expectation_method codon_model|urn`). Verbatim definitional quote in §7. The exact estimator math
is in the paywalled primary — not recoverable from these surrogates (`[GAP]`).

**Q2 — Decision rule separating genuine convergent adaptation from neutral/false convergence?**
**[CC-BY-app]** "ωC (dNC/dSC) > 1 represents directional convergence beyond neutrality" (verbatim, §7).
**[MIT-docs]** Practically, pair the **ω_C cutoff with an OCN cutoff** (large ω_C alone insufficient);
the Barua application used ω_C ≥ 5 & OCN ≥ 5 in ≥3 independent combinations (their choice, not a
CSUBST default).

**Q3 — Does the source state that convergent/parallel substitutions across INDEPENDENT lineages can
produce a FALSE branch-specific positive-selection / accelerated-dN/dS signal under standard
branch-site (codeml/HyPhy) models?**
**No — neither open surrogate states this.** This is a confident silence, reported faithfully. The
closest content: **[MIT-docs]** ω and ω_C "measure totally different aspects," and "ω had almost no
effect on ω_C in the range of 0.1 to 5" — i.e. the docs argue convergence (ω_C) is *decoupled from*
per-branch rate (ω), the near-inverse of the guidance's confound and not a statement about branch-site
positive-selection tests. **[CC-BY-app]** frames ω_C>1 as *analogous to* ω>1 positive selection but
measuring convergence; it does **not** discuss branch-site false positives. codeml/HyPhy are unmentioned.
Any claim that convergence spoofs a branch-site positive-selection test would have to come from the
paywalled primary or elsewhere — **not** supported by the sources read.

**Q4 — Required inputs; stated limitations / false-positive modes?**
**[MIT-docs]** Inputs: rooted Newick tree + in-frame codon FASTA alignment + foreground file; ancestral
states/substitution histories computed internally (IQ-TREE dependency), not user-supplied. Limitations
and false-positive modes: §8–§9 (Inf/large ω_C from sparse substitutions → OCN cutoff; misalignment →
low synonymous convergence diagnostic; gene-tree discordance; experimental p-value/epistasis).

**Q5 — Pre-specify foreground, or hypothesis-free across branch combinations? CLI verbatim.**
**Mixed / mode-dependent [MIT-docs].** The documented workflow *does* take a `--foreground` file, and
the Foreground-specification page states foreground lineages are user-specified (regex over leaf labels;
`--fg_format 1|2`, `0` = background in format 2). BUT `csubst_cb_stats.tsv` reports a `mode` column with
values `foreground`, **`exhaustive`**, or **`branch_and_bound`** — i.e. the search also supports an
exhaustive scan over branch combinations plus branch-and-bound pruning for higher orders, not strictly
foreground-only. So it is not purely one or the other: foreground-guided by default in the docs, with an
exhaustive/hypothesis-free mode available. `[GAP: exact flag toggling exhaustive vs foreground mode not
captured — likely governed by presence/absence of --foreground and --max_arity; not spelled out in the
surrogate pages read]`. Verbatim CLI captured in §5.
