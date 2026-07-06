# scenarios — audit-positive-selection-claim

Concrete cases exercised by the `eval.md` oracle. Most are **planted-invalid fixtures**: a claim with a
deliberately planted invalidity bound to the verdict a correct referee must reach. One valid control is
included. Fixtures are described, not shipped; drawn from failure modes the notes actually document.

## Case: recombinant-viral-no-screen
- fixture: A claim of positive selection in a viral gene (33 divergent strains, high θS), inferred with
  PAML M1a-vs-M2a on a single NJ tree; no recombination screening reported.
- flaw: Unmodeled recombination — the exact regime `[[anisimova-2003-recombination]]` shows inflates
  site-model type-I error up to 90–100%.
- expect: FLAG (→ effectively REJECT until fixed). Referee names unmodeled recombination, requires a
  GARD breakpoint screen (AICc, not p<0.05) and per-fragment re-analysis, and/or the more robust M7–M8
  test; does not accept the M1a–M2a result as-is.

## Case: gard-called-a-pvalue
- fixture: An analysis states "GARD found a breakpoint at p < 0.05."
- flaw: Misstatement of GARD's criterion — GARD accepts breakpoints by AICc improvement, not a p-value
  `[[pond-2006-gard]]`.
- expect: FLAG the mischaracterization; the referee restates the criterion as AICc model selection.

## Case: ambiguous-alignment-branch-site
- fixture: Mammalian ortholog set, branch-site Test 2 significant on one terminal branch; alignment
  produced by a single aligner, no quality check; genes are "novel"/inferred with <3× coverage.
- flaw: Alignment/data-quality inflation — the all-bad regime `[[schneider-2009-alignment-error]]`
  raises the positively-selected fraction up to ~7×.
- expect: FLAG. Referee requires a HoT (head/tail) alignment-reliability check, removal of
  hard-to-align regions, and restriction to well-covered/known/unambiguous genes before trusting the
  call.

## Case: short-branch-triple-substitution
- fixture: +S (SRV, no MH) detects episodic diversifying selection; most of the signal traces to a
  single triple-nucleotide change on one short terminal branch at one codon; +S+MH (comparable AICc)
  detects nothing.
- flaw: Multi-nucleotide-substitution artifact `[[lucaci-2023-busted-mh]]` — +S "absorbs" the MH into
  inflated ω (FPR up to 100% in simulation), worst on short branches.
- expect: REJECT the +S call as an MH artifact; referee cites the +S-vs-+S+MH discordance and the
  single-site dependence, and requires the model-averaged BUSTED+MH result. Does not read raw δ/ψ or an
  "ω_DH" as the signal.

## Case: gc-rich-har-claim
- fixture: An accelerated / elevated-ω region in a GC-rich, high-recombination part of the genome
  claimed as positive selection; no gBGC exclusion.
- flaw: gBGC can produce the acceleration signal without selection; it is an extended null to exclude
  `[[galtier-duret-2007-gbgc]]`.
- expect: FLAG "gBGC not excluded." Referee notes the confound qualitatively and marks that the
  operational discrimination criteria are not available from the current sources
  (`[GAP: gBGC criteria unrecoverable — abstract-only source]`); it must NOT invent a W→S threshold and
  cite it.

## Case: post-hoc-foreground-no-correction
- fixture: Analyst runs branch-site tests on every branch, picks the one branch with a significant
  result, and reports it as "the lineage under selection" with no multiple-testing correction; foreground
  was not specified a priori.
- flaw: Post-hoc foreground + uncorrected multiple testing `[[anisimova-yang-2007]]`
  `[[alvarez-carretero-2023-paml-guide]]`.
- expect: REJECT/FLAG. Referee requires an a-priori hypothesis or a FWER correction (Rom's preferred,
  Bonferroni acceptable) across all tested branches, and cautions on extreme-divergence unreliability.
  It flags that the *a-posteriori* inflation magnitude itself is not sourced
  (`[GAP: post-hoc foreground inflation not quantified]`).

## Case: test1-as-selection-test
- fixture: A branch-site claim of positive selection based on comparing model A against the site model
  M1a (Test 1), significant.
- flaw: Test 1 conflates relaxed constraint with positive selection; rejection reaches ~40–100% under
  mere relaxation `[[zhang-2005-branch-site]]`.
- expect: REJECT as an invalid test of positive selection; referee requires Test 2 (A vs A1, ω2=1 fixed,
  df=1).

## Case: variability-test-as-selection
- fixture: "Positive selection detected: M0-vs-M1a 2Δℓ = 559 ≫ 3.84."
- flaw: M0-vs-M1a is a test of among-site ω variability, not positive selection
  `[[alvarez-carretero-2023-paml-guide]]` `[[paml-manual]]`.
- expect: REJECT the inference; referee requires a genuine positive-selection pair (M1a–M2a or M7–M8).

## Case: meme-sites-to-genewide
- fixture: A gene declared "under positive selection" because MEME flagged several sites (site p-values
  combined under FDR into a gene-wide conclusion).
- flaw: Wrong level — a site method used for a gene-wide claim, and site results combined into an
  alignment-wide test, both cautioned against `[[murrell-2015-busted]]` `[[murrell-2012-meme]]`.
- expect: REJECT/FLAG; referee requires a gene-wide test (BUSTED) for the gene-wide question.

## Case: neb-site-identification
- fixture: Positively selected sites reported from NEB posterior probabilities.
- flaw: NEB ignores MLE sampling error and is "unusable" under relaxed constraint; BEB is required
  `[[zhang-2005-branch-site]]` `[[paml-manual]]`.
- expect: FLAG; referee requires BEB posteriors (markers `*` >95%, `**` >99%).

## Case: negative-alpha-mk
- fixture: A McDonald–Kreitman analysis reports α = −0.05 (10% frequency cutoff) and concludes "no
  adaptation."
- flaw: Standard MK is downward-biased under linked selection / slightly deleterious mutations and can
  go negative even after cutoffs `[[messer-petrov-2013]]`.
- expect: FLAG; referee requires asymptotic MK (frequency-resolved α(x), exponential fit, extrapolate
  x→1) before drawing an adaptation conclusion; treats a negative α as the confound's signature, not as
  evidence of no adaptation. Any "≥50 sites/bin" requirement is labeled convention.

## Case: valid-control (must PASS)
- fixture: A gene-wide episodic-selection claim with an a-priori foreground hypothesis; alignment
  protein-guided with HoT = 100%; GARD screen clean (no breakpoint) or analysis run per nonrecombinant
  fragment; BUSTED run with model averaging over the multi-hit-aware models (MH shown negligible); a
  Rom / FWER correction applied across tested branches; site calls (if any) from BEB; the branch-site
  LRT judged against the correct df/null with the conservative χ²₁ cutoff; p≤0.05 explicitly labeled a
  nominal convention.
- flaw: none.
- expect: PASS — every applicable cardinal sin was screened and excluded with evidence, the test
  matches the claim level, and the null/critical values are correct. (A PASS requires this evidence;
  silence on any confound would downgrade to FLAG.)
