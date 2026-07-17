---
title: "Beginner's Guide on the Use of PAML to Detect Positive Selection"
type: paper
source_id: alvarez-carretero-2023-paml-guide
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC10127084/
doi: 10.1093/molbev/msad041
version: "PAML 4.10.6"
access_date: "2026-07-05"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Alvarez-Carretero S, Kapli P, Yang Z. Molecular Biology and Evolution 40(4):msad041, 2023. DOI 10.1093/molbev/msad041. PMCID PMC10127084. Targets PAML v4.10.6 (CODEML). Full text read via Europe PMC JATS XML, Open Access under CC-BY 4.0, permitting short verbatim quotes."
derived: license-aware-summary
tags:
  - domain/dnds
  - domain/molecular-evolution
---

# Álvarez-Carretero, Kapli & Yang 2023 — Beginner's Guide on the Use of PAML to Detect Positive Selection

## 1. Citation
Álvarez-Carretero S, Kapli P, Yang Z. 2023. "Beginner's Guide on the Use of PAML to Detect
Positive Selection." *Molecular Biology and Evolution* 40(4):msad041.
DOI: 10.1093/molbev/msad041. Published 25 April 2023.
Open-access full text: PMC10127084 (Europe PMC / PubMed Central).
Software targeted: **PAML v4.10.6** (CODEML/CODONML, "paml version 4.10.6, November 2022"),
from https://github.com/abacus-gene/paml. Companion tutorial repo:
https://github.com/abacus-gene/paml-tutorial/tree/main/positive-selection.
Access date: 2026-07-05.

## 2. Access note
Full text read in full from the Europe PMC JATS XML (PMC10127084), including all body sections,
Tables 1–9, and figure captions (figures themselves not inspected; some worked-example console
output blocks are described in text but the raw output listings are figure/inline images not
present in the XML — noted where relevant). Supplementary material (`msad041_Supplementary_Data`,
containing sections "Alignment, sequence data file, and tree," "Rooted tree versus unrooted tree,"
"Gene tree versus species tree," "BEB Analysis") was NOT retrieved — only its section titles as
referenced in the body.

## 3. License / quoting mode
**CC BY 4.0** — permissions block: "Open Access article distributed under the terms of the
Creative Commons Attribution License (https://creativecommons.org/licenses/by/4.0/), which permits
unrestricted reuse, distribution, and reproduction in any medium, provided the original work is
properly cited." **Permissive mode**: short verbatim load-bearing quotes allowed (§7), functional
strings (control-file keywords, values, critical values) verbatim throughout.

## 4. Thesis (1 sentence)
A step-by-step beginner's protocol for using CODEML (PAML) to test for positive selection via the
nonsynonymous/synonymous rate ratio ω = dN/dS under four codon-substitution model families
(one-ratio M0, site models, branch models, branch-site model A), with the likelihood ratio test
(LRT) and Bayes empirical Bayes (BEB) site identification.

## 5. Problem & context
Under the neutral theory most substitutions are not selection-driven; adaptive (positive) selection
is detected as an excess of nonsynonymous over synonymous substitutions, i.e. ω = dN/dS > 1
(ω < 1 purifying, = 1 neutral, > 1 positive). The ω averaged over all sites and all branches "is
seldom greater than 1, and therefore, its use to detect positive selection has virtually no power";
the protocol instead targets selection affecting **specific branches** and/or **individual sites**.
Worked throughout on a 12-taxon (10 mammal, 2 bird) alignment of the myxovirus (Mx) gene from
Hou et al. (2007), 12 species × 1,989 bp (= 663 codons), chicken + duck as foreground.

## 6. Method / approach — recommended procedure + exact parameters

### 6.1 Setup
- Install PAML v4.10.6; add `codeml` to PATH; run via `codeml <control_file.ctl>`.
- **Data prep prerequisites (stated):** sequences must be properly aligned with introns, noncoding
  regions, and stop codons removed. Recommended strategy: "first align protein sequences and then
  construct the codon alignment accordingly." Remove alignment columns/regions that are
  predominantly gaps or hard to align, then use `cleandata = 0` to preserve information. Alignment
  in **PHYLIP** format; header = "<ntaxa> <length>" (e.g. `12 1989`). Tree in **Newick**; strip
  bootstrap values; branch lengths not required (may interfere with node labels); if >1 tree, a
  header is required (e.g. `12 1` for a 12-taxon single tree).

### 6.2 Baseline control-file settings (fig. 2, verbatim keywords/values)
`seqfile` / `treefile` / `outfile` (paths); `noisy`, `verbose` (screen/output detail);
`seqtype` (data type), `ndata` (number of alignments), `icode` (genetic code),
`cleandata = 0` (keep ambiguous/gap sites) or `1` (remove; **renumbers sites**).
Model block for the M0 baseline: `model = 0`, `NSsites = 0`; codon frequencies
`CodonFreq = 7` (FMutSel mutation-selection model) with `estFreq = 0` (use observed codon
frequencies), which the authors state "is preferable over the other models concerning codon usage
(Yang and Nielsen 2008)"; `fix_omega = 0`, initial `omega = 0.5`; `clock = 0` (no molecular clock
→ unrooted tree). Control file is read line-by-line; a repeated variable — the second overwrites
the first; blank lines ignored; text after `*` is a comment.

**CodonFreq options (verbatim):** `0` = Fequal (1/61 each), `1` = F1×4, `2` = F3×4, `3` = Fcodon;
`6` = FmutSel0 (19 amino-acid fitness params), `7` = FmutSel (60 codon fitness params).
`clock`: `0` none, `1` strict clock, `2` local clock (only `0` used here). `model`: `0` one ω
across branches, `2` foreground/background branches differ. Max 8 branch types.

### 6.3 The four analyses and their model/NSsites specs (Table 2)
| Analysis | CODEML spec |
|---|---|
| M0 (one ω, all sites & branches) | `model = 0`, `NSsites = 0` |
| Site models (batch) | `model = 0`, `NSsites = 1 2 7 8` (add `0` to include M0) |
| Branch model | `model = 2`, `NSsites = 0` |
| Branch-site model A | `model = 2`, `NSsites = 2` |
Individual site models: M1a `NSsites = 1`; M2a `NSsites = 2`; M7 `NSsites = 7`; M8 `NSsites = 8`
(always `model = 0` for site models).

### 6.4 Site models (Table 1)
- **M0** (one-ratio): 1 ω; not a positive-selection test — a reference null.
- **M1a** (NearlyNeutral): 2 free params (p0, ω0); classes ω0<1, ω1=1.
- **M2a** (PositiveSelection): 4 free params (p0, p1, ω0, ω2); adds class ω2>1.
- **M7** (beta): 2 params (p, q); beta-distributed ω in [0,1], 10 site classes.
- **M8** (beta&ω): 4 params (p0, p, q, ωs); M7 plus an extra class with ωs>1, 11 site classes.

### 6.5 LRT construction
LRT statistic 2Δℓ = 2(ℓ1 − ℓ0); compared to χ² with df = difference in number of free parameters.
Nested pairs:
- **M0 vs M1a** (df = 1): test of **among-site ω variability**, NOT positive selection.
- **M1a vs M2a** (df = 2): positive-selection test.
- **M7 vs M8** (df = 2): positive-selection test.
- **Branch model:** null = M0; alt = branch model (df = 1 for one extra ω; df = 2 in the rooted
  test where the two branches around the root take different ω, adding a branch length).
- **Branch-site model A vs A-null:** null = model A with ω2 fixed = 1 (`fix_omega = 1`, `omega = 1`);
  df = 1.

**Critical values (verbatim, Tables 3/5/7 notes):** χ²(1,5%) = 3.84, χ²(1,1%) = 6.63,
χ²(2,5%) = 5.99, χ²(2,1%) = 9.21. "The critical values can be calculated using the qchisq function
in R. For instance, qchisq(p = 0.95, df = 1) returns χ²(1,5%) = 3.84."

### 6.6 Branch models
Foreground branches tagged `#1` in the Newick tree (`#0` default = background, need not be written);
run with `model = 2`, `NSsites = 0`. Example tag placement: `...Duck_Mx, Chicken_Mx #1 );`.
Max 8 branch types. Tools to add tags: PhyloTree, EasyCodeML (check tag format matches CODEML).

### 6.7 Branch-site model A
`model = 2`, `NSsites = 2`. Four site classes: 0 (0<ω0<1, purifying both), 1 (ω1=1, neutral both),
2a (background 0<ω0<1, foreground ω2≥1), 2b (background ω1=1, foreground ω2≥1). Null = fix ω2 = 1
(`fix_omega = 1`, `omega = 1`); LRT df = 1. BEB identifies foreground positively-selected sites.

### 6.8 BEB vs NEB site identification
When M2a or M8 is favored, posterior probability that each site is from the ω>1 class is computed by
**BEB** (Bayes empirical Bayes, Yang et al. 2005), which accommodates MLE uncertainty, vs. **NEB**
(Naïve Empirical Bayes, uses point MLEs). CODEML prints both; **"the BEB should be used instead of
NEB."** BEB is computed only under the alternative models (M2a, M8), not the nulls (M1a, M7). Output
column `Pr(w>1)` gives the posterior probability of the positive-selection class; also reports
posterior mean ω and SD per site.

### 6.9 Genome-scale (ndata)
`ndata = N` runs N alignments concatenated in one seqfile. Options: `ndata = 3` (one shared tree,
all species present); `ndata = 3 separate_trees` (own tree block per alignment; datasets/trees
separated by "Dataset 1" / "TREE #1" headings); `ndata = 3 maintree 1` (one main tree pruned per
gene by removing missing species, then ML run); `ndata = 3 maintree 0` (dry run — writes gene trees
to `genetrees.trees`, no ML; useful for checking seqfile errors). Examples in `examples/ndata/`.

## 7. Load-bearing statements (permissive mode — verbatim, CC BY)
1. On the branch-site null distribution (Detection section): "Positive selection or the presence of
   sites with ω2>1 is tested by comparing this model with a null model in which ω2 = 1 is fixed,
   using a **50:50 mixture of 0 and χ²(1) as the null distribution** (Yang et al. 2000;
   Zhang et al. 2005)."
2. On BEB: "While CODEML reports results from both methods, **the BEB should be used instead of
   NEB.**"
3. On the M0 / averaged-ω power: the ω "averaged over all sites of a gene and across all lineages
   (branches) on the phylogeny is seldom greater than 1, and therefore, its use to detect positive
   selection has virtually no power."
4. On the conflicting site tests: "When the evidence for positive selection exists but is not very
   strong, the M1a-M2a test is noted to be more stringent, as sites under weak positive selection
   tend to be lumped into the site class with ω1 = 1 (Zhang et al. 2005)."
5. On a priori foreground: "foreground branches should be specified a priori. If multiple branches
   on the tree are tested for positive selection when using the same dataset without a priori
   biological hypothesis, a correction for multiple testing may be required (Anisimova and
   Yang 2007)."

## 8. Stated scope, assumptions, limitations (authors' own caveats)
- Scope: "the simplest models of codon substitution"; aimed at beginners; NOT comprehensive.
  Explicitly does **not** cover population-genetics methods for detecting selective sweeps (those
  suit within-species multi-individual data).
- All ω models here ignore chemical differences between amino acids (same ω regardless of
  source/target amino acid).
- Models discussed are time-reversible and assume no molecular clock → **unrooted tree** should be
  used (exception: when the two branches around the root are modeled differently, e.g. one
  foreground one background — then the root is identifiable and a **rooted tree** is required, as in
  branch test 4 / bird-clade).
- Foreground branches must be chosen a priori from a biological hypothesis; testing every branch
  in turn requires multiple-testing correction (Bonferroni "may be too conservative"; **Rom's
  procedure (Rom 1990) preferred**, slightly higher power; or FDR control, Benjamini–Hochberg).
- "if sequences are extremely divergent or there are serious model violations, multiple testing
  correction may be unreliable."

## 9. Failure modes / invalidity patterns (referee-relevant)
- **M0 / genome-wide average ω has no power** to detect positive selection (§5, quote 3); use site
  or branch-site models instead.
- **M0 vs M1a is NOT a positive-selection test** — it only tests among-site ω variability. In the
  worked example 2Δℓ = 559.26 (>3.84) is significant for variability, but the actual positive-
  selection tests (M1a vs M2a: 2Δℓ = 0, nonsignificant; M7 vs M8: 2Δℓ = 12.54, significant only at
  5%) gave equivocal/conflicting results — a caution against reading M0-vs-M1a significance as
  evidence of selection.
- **ω = 999** is the program's upper limit meaning ω = ∞; arises from a lack of synonymous
  substitutions along the branch. "in such cases, the LRT is still valid even though it is hard to
  estimate the precise value of ω1."
- **Multiple testing without an a priori hypothesis** → need correction; unreliable if sequences
  extremely divergent or models seriously violated (§8).
- **Alignment errors → false positives** for site-model tests (Fletcher and Yang 2010): some
  aligners "lump nonhomologous sites into one column, creating apparent nonsynonymous substitutions";
  remove hard-to-align regions first. (Joint alignment+model via BAli-Phy is an alternative but may
  be computationally infeasible for large data.)
- **Complex / multinucleotide substitutions** (models assume one nucleotide changes at a time) →
  excessive false positives (Kosiol et al. 2007; Jones et al. 2018; Venkat et al. 2018).
- **Recombination:** site tests robust to *low* levels (Anisimova et al. 2003), but "the false
  positive rate can be very high at high recombination rate."
- **Biased gene conversion** → false positives (Galtier and Duret 2007; Ratnakumar et al. 2010).
- **Low power / false negatives:** episodic positive selection may not raise the nonsynonymous rate
  enough to detect; "When a test under the site or the branch-site model returns a nonsignificant
  result, the lack of power of the test could always explain such results."
- **`cleandata = 1` renumbers sites** after removing gap columns — "may affect the output under the
  site or branch-site models" (site indices in BEB output shift).
- **ndata with missing species (branch / branch-site):** pruning missing species can merge branches;
  if merged branches carry the same tag CODEML keeps it, but if the tags **differ** "CODEML will
  abort with an error message." (Named detector: program abort/error message.)

## 10. What the source does NOT address (confident silences)
- **No saturation pre-check taught.** The word "saturation" does not appear; no substitution-
  saturation diagnostic is prescribed as a prerequisite (prerequisites covered are alignment
  quality, removing stop/noncoding, reading frame).
- **M8 vs M8a is not worked.** M8a is listed as a model available in CODEML (Table 9: "SM: M0, M1a,
  M2a, M7, M8, M8a"; and BSM "A, A-null"), but the protocol runs only M7 vs M8 for the site test;
  no M8 vs M8a comparison, control-file spec, or df is given.
- No coverage of within-species/selective-sweep population-genetics methods (explicitly excluded).
- Comprehensive theory, derivations, and model-adequacy testing are deferred to reviews and the
  PAML manual.
- The 2.71 critical value (5% point of the 50:50 mixture) is never stated — see §12.

## 11. Open questions / ambiguities the source leaves unresolved
- The BEB posterior-probability cutoffs (50% / 95% / 99%) are used but never justified or labeled;
  no formal recommendation of which threshold to report.
- In the worked branch-site example, the theoretically-stated null (50:50 mixture) and the
  critical values actually applied (conservative χ²(1): 3.84 / 6.63) differ; the guide does not
  explicitly reconcile which to use in practice (see §12).

## 12. Guidance answers

**Q1 — step-by-step codeml workflow + control settings + nested LRT pairs.** Fully answered; see
§6.2–6.8. Nested LRT pairs stated by the guide: **M1a vs M2a** (df 2) and **M7 vs M8** (df 2) for
site-based positive selection; **M0 vs M1a** (df 1) as a variability test only; **branch model vs
M0** (df 1, or 2 rooted); **branch-site model A vs A-null (ω2 fixed = 1)** (df 1). Control keywords
captured verbatim (§6.2–6.3, 6.6–6.7). Note: the guidance also listed **M8 vs M8a** as a candidate
pair — the guide does **not** perform or specify this comparison (M8a only appears in the Table 9
tool-comparison list); flagged in §10.

**Q2 — branch-site LRT null distribution & critical value (cross-check of the Zhang 2005 gloss).**
Precise finding:
- The guide **states** the theoretically-correct null is a **"50:50 mixture of 0 and χ²(1)"**
  (verbatim, §7 quote 1; citing Yang et al. 2000; Zhang et al. 2005).
- The guide **never mentions 2.71** (the 5% critical value of that 50:50 mixture) — 0 occurrences
  in the text.
- In the **worked branch-site LRT (Table 7 note)** it applies the **conservative χ²(1) critical
  values 3.84 (5%) and 6.63 (1%)** — i.e., it treats the statistic against a full χ²(1) rather than
  the mixture. So: **states 50:50 mixture theoretically, applies conservative χ²(1) in practice,
  does not cite 2.71.** (Using χ²(1)=3.84 instead of the mixture's 2.71 is the conservative choice.)

**Q3 — BEB posterior-probability thresholds; labeled convention?** BEB thresholds used:
- Site models: reports sites with **probability > 50%** for the ω>1 class (worked example: 14 such
  sites; e.g. site 10, Pr = 0.564, posterior mean ω = 1.468, SD 0.634 — characterized as "only weak
  evidence").
- Branch-site model A (Table 8): sites with **Pr(ω>1) > 95%** and **> 99%**.
- These are **not explicitly labeled "convention"** nor justified; the guide states BEB (not NEB)
  should be used but does not defend a specific cutoff.

**Q4 — prerequisite warnings before running codon tests.** Explicitly taught prerequisites:
proper alignment with introns/noncoding/stop codons removed; align proteins first then build codon
alignment to preserve reading frame; remove predominantly-gap or hard-to-align regions then use
`cleandata = 0`. **Alignment errors, complex/multinucleotide substitutions, recombination (high
rate), and biased gene conversion** are named as false-positive drivers (§9) — but treated as
limitations/caveats rather than as a mandatory pre-run checklist. **Saturation is NOT mentioned**
as a prerequisite check (§10).
