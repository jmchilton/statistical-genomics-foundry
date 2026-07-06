---
title: "Automated Phylogenetic Detection of Recombination Using a Genetic Algorithm"
type: paper
source_id: pond-2006-gard
source_url: https://academic.oup.com/mbe/article/23/10/1891/1096946
doi: 10.1093/molbev/msl051
access_date: "2026-07-05"
license: LicenseRef-CC-BY-NC-2.0-UK
attribution: "Kosakovsky Pond SL, Posada D, Gravenor MB, Woelk CH, Frost SDW. Molecular Biology and Evolution 23(10):1891-1901, 2006. DOI 10.1093/molbev/msl051. PMID 16818476. Read via OUP open-access full text; article footer states Open Access under the Creative Commons Attribution Non-Commercial License (CC BY-NC 2.0 UK), permitting short verbatim quotes."
derived: license-aware-summary
---

# Automated Phylogenetic Detection of Recombination Using a Genetic Algorithm (GARD)

## 1. Citation

Kosakovsky Pond SL, Posada D, Gravenor MB, Woelk CH, Frost SDW. 2006. "Automated
Phylogenetic Detection of Recombination Using a Genetic Algorithm." *Molecular Biology and
Evolution* 23(10):1891–1901. DOI 10.1093/molbev/msl051. PMID 16818476.
Open-access full text (OUP): https://academic.oup.com/mbe/article/23/10/1891/1096946
Access date: 2026-07-05.

**Title discrepancy flag** `[summarizer-inferred]`: the invocation supplied the title *"GARD: a
genetic algorithm for recombination detection"*, but that is a **separate, shorter Bioinformatics
software note** (Kosakovsky Pond et al. 2006, *Bioinformatics* 22(24):3096–3098, PMID 17110367) —
not this DOI. The DOI, venue, pages, and year in the invocation all match the **MBE methods
paper** summarized here, whose actual title is *"Automated Phylogenetic Detection of Recombination
Using a Genetic Algorithm."* This note summarizes the MBE paper (the one at the given DOI). The
method's name/acronym GARD (Genetic Algorithm Recombination Detection) is defined in the body.

## 2. Access note

Full text read in full (Abstract → Discussion, plus all in-text tables). **Boundary:** the paper's
figures (Fig. 1, Fig. 2, Fig. 3) and Supplementary Material (Table S1, Figs S1–S2) were **not**
retrieved. Notably, the **exact tabulated FEL false-positive error rates live inside Fig. 3**, which
was not accessed — the running text describes those results only qualitatively (see §6, §9). Tables
1–4 were captured from the article body.

## 3. Thesis (1 sentence)

A genetic-algorithm search combined with AICc model selection can rapidly and accurately locate
recombination break points in a multiple-sequence alignment, partition it into nonrecombinant
fragments with segment-specific phylogenies, and thereby serve as a prescreen that reduces
false positives in downstream selection analysis.

## 4. Problem & context

- Recombination (and gene conversion) means homologous sequences cannot be modeled by a single
  phylogeny — each nonrecombinant fragment has its own tree.
- Ignoring recombination misleads phylogeny estimation and downstream inference; specifically, the
  Nielsen & Yang (1998) likelihood methods for selection pressure on codon alignments "may suffer
  from high rates of false positives when the sequences being analyzed have undergone recombination
  (Anisimova et al. 2003; Shriner et al. 2003)."
- Existing recombination detectors (14+ compared by Posada & Crandall) give divergent results,
  often need a consensus approach, and many cannot localize break points, give statistical support,
  or emit the nonrecombinant partition needed for follow-on phylogenetic analysis.
- Goal: one pragmatic, fast, model-based tool that finds break points, quantifies support, and
  outputs segment-specific phylogenies.

## 5. Method / approach

**Setup.** Alignment of S sequences, N characters. Applied here to nucleotide data. Substitution
modeled by a time-reversible model up to the general reversible model, with site-to-site rate
variation via the β–Γ distribution. Break points are constrained to coincide with **variable
sites** (count V ∈ [2, N]); resolution is only to the nearest variable site because invariable
sites carry no phylogenetic signal.

**Single–break point screen (B = 1), 4 steps:**
1. Infer an NJ tree (TN93 distance) for the whole alignment; fit by maximum likelihood; record its
   AICc score `A0`. AICc (second-order small-sample AIC, Sugiura 1978):
   `AICc = −2 log L(θ̂ | data) + 2p(N / (N − p − 1))`, p = number of parameters. AICc advocated when
   samples are not much larger (≤40×) than parameters. Formal validity requirement:
   `N > 2(2S − 3) + bp`, where `2(2S − 3)` = branches in the two fitted trees and `bp` = rate +
   frequency parameters.
2. Hold base frequencies and substitution-bias parameters fixed at the whole-alignment estimates
   (assumed not strongly affected by recombination).
3. Consider all `V − 1` two-block partitions (each block ≥1 variable site; break at a variable site).
4. For a break at site i: infer an NJ tree per block, fit branch lengths per partition (other params
   held from step 1), compute AICc `Ai`. The single–break point model has `2S − 3` more estimable
   parameters than the single-partition model. Repeat for all `V − 1` positions.

**Break-point decision (the criterion — see §12):** "If Ai < A0 for at least one i, then we deduce
that some of the sequences in the alignment are recombinant." Relative support for a break at site i
is its **Akaike weight** `wi = exp(−Δi/2) / Σr exp(−Δr/2)`, where `Δi = AICc_i − min AICc`.

**Multiple break points (B > 1) via genetic algorithm.** Brute force is `~O(V^B)` combinations
(e.g. HIV-1 ~10 kb, quarter of sites variable → ~10^9 models for 3 break points), so a **CHC GA**
(Eshelman 1991) searches the discrete break-point-location space; numerical optimization fits branch
lengths. A candidate is an ordered vector `b = (v1,…,vB)` of variable-site coordinates (equal
coordinates collapse to fewer break points). **Fitness = AICc score.** Operators:
- **Mating with free recombination**: offspring inherits each bit from either parent with equal prob.
- **Hypermutation**: if sample diversity (range of AICc scores normalized by the best score) falls
  below a fixed threshold — **0.1% in this implementation** — all individuals except the fittest have
  **15% of randomly selected bits toggled**.
The CHC always retains the fittest individual. **Termination:** best AICc unchanged over **100
consecutive generations**. A master list of fitted models avoids re-evaluation (a typical run
considers `10^3–10^4` models). B is grown incrementally: start B = 0, increase by 1 until the best
AICc stops decreasing (noted as possibly underestimating the true B).

**Model-averaged break-point location.** `Pnj = Σ_{i∈Mnj} wi` = support that the j-th break point
rests on nucleotide position n; `Σn Pnj = 1` for each j. Used to form model-averaged 95% CIs.

**Optional topology verification (a posteriori, not the primary detector).** To check that adjacent
partitions have *significantly different topologies* (vs. only branch-length/heterotachy differences),
an incongruence test between adjacent-segment trees is applied: the **Shimodaira–Hasegawa (1999) test
(SH test)**, requiring at least one adjacent pair be significant at **P < 0.01, Bonferroni-corrected**
for multiple tests. This is described as possibly too restrictive (only "Type 3" recombination events,
per Wiuf et al. 2001, produce discordant topologies); using AICc improvement alone catches other
event types and handles 3-sequence alignments (single possible topology).

**Implementation.** HyPhy (Kosakovsky Pond et al. 2005) on an MPI cluster; master/slave dispatch.
CHC population size `2P − 2`; `P = 17` nodes used in this article. A single GA run took "several
minutes to several hours." Web interface at http://www.datamonkey.org/GARD/; data at
http://www.hyphy.org/pubs/GARD/.

**Evaluation data.** Simulated: Posada & Crandall (2001) sets (10 seq, 1000 bp); Scenario 1 (8
nonrecombinant + 1 recombinant, 2 break points, HKY85, ts/tv = 3); Scenario 2 (3 break points,
clade + single-sequence recombination); 800 coalescent sims (8 seq, 3000 nt, GTR+Γ α=0.5, ~5% "low"
and ~25% "high" diversity, 0/1/2/4/8 recombination events); a Neutral Scenario (32 codon sequences,
400 codons on one tree + 100 on another, neutral dN=dS=1 MG94×REV, modeling a recombination hot
spot). Biological: 24 sets from Posada (2002); 78 viral sets from Chare et al. (2003).

## 6. Key claims / findings (atomic)

- **Break-point criterion is AICc model selection, not a p-value.** A break point is inferred when
  splitting improves (lowers) the AICc: `Ai < A0`. Position support = Akaike weights. (§12)
- **Single–break point scan beats all 14 methods** in Posada & Crandall (2001), plus the McVean et
  al. (2002) composite-likelihood permutation test, in both false positives and power — except at
  low sequence divergence, where it is comparable to the best. Holds even though the single-break
  assumption is usually violated in those sims.
- **Detects recombination >95%** of the time even at low divergence when recombination rate is high
  (ρ = 64, >180 recombination events/alignment on average).
- **Low false-positive rate** on nonrecombinant data simulated with gamma rate variation, because
  site-to-site rate variation is modeled explicitly.
- **Speed:** 100 alignments (10 seq, 1000 bp) screened in ~5 min on 24 cluster nodes.
- **Biological (Posada 2002):** high agreement with the 50%-consensus of 14 methods; GARD found
  1–9 break points; recombination events often complex/multi-sequence (low shared-split proportion).
- **Biological (Chare et al. 2003):** reconfirmed all 5 recombinant genes; found 11 *additional*
  genes with putative recombination (AICc + SH), and 13 more by AICc alone (possible Type 1/2 events
  or model inadequacy); more sensitive than the Chare manual method.
- **Simulated power (Scenarios 1/2):** recombination detected 95/100 and 100/100; correct break-point
  *count* in 69/100 and 82/100; slight tendency to **overcount** (26× Scenario 1, 11× Scenario 2).
- **Coalescent sims:** power rises with divergence and number of events (near-perfect at 8 events);
  but for small (8-seq) alignments recombination signal saturates and B is often **underestimated** —
  a limit of tree inference from short fragments, not of the GA. At 8 events, not a single replicate
  had enough information for AICc/SH to statistically support discordant phylogenies at the *correct*
  break points (Table 2, "detectable" columns → SH = 0).
- **Break-point localization (Table 3):** exact hit (nearest variable site to a true break) ~20% of
  the time; the model-averaged 95% CI contains a true break point ~60% of the time; overall 60–70%
  of inferred break points have a true break point in the 95% CI. Median distance to nearest true
  break decreases with more break points and higher divergence; always significantly smaller than
  random placement (all P < 0.001).
- **Selection-inference correction (the prescreen payoff):** in the Neutral Scenario, uncorrected
  single-partition FEL had Type I error "far in excess of the nominal P value" on the last-100-codon
  segment (wrong tree), while the first-400-codon segment error ≈ the P value. Splitting via the
  single–break point scan and running FEL per fragment "restored good statistical properties of FEL."
  **Exact error-rate magnitudes are in Fig. 3, not accessed — see §9.**
- **Selection lists change materially (Table 4):** for 14 recombinant biological data sets, the set
  of positively selected codons (FEL, P < 0.1) differs substantially between uncorrected and
  corrected analyses — sites appear, disappear, and shift (e.g. Cache Valley G: 4 sites → none;
  Mumps HN: 399 → none; Puumala NP: 79 → none).

## 7. Load-bearing statements (LICENSE MODE: PERMISSIVE — CC BY-NC 2.0 UK; short verbatim quotes)

License basis: article footer states it is "an Open Access article distributed under the terms of
the Creative Commons Attribution Non-Commercial License (http://creativecommons.org/licenses/by-nc/2.0/uk/)".
CC BY-NC permits reproduction with attribution, so short load-bearing verbatim quotes are used.

1. Break-point criterion (Materials & Methods, single–break point step 4): "If Ai < A0 for at least
   one i, then we deduce that some of the sequences in the alignment are recombinant."
2. Fitness function (Searching for Multiple Break Points Using a GA): "The fitness of every model is
   measured by its AICc score."
3. Optional incongruence verification (Result Verification): "We used the Shimodaira and Hasegawa
   (1999) test (SH test) and required that at least 1 pair of the adjacent segments show a
   statistically significant (P < 0.01, when corrected for multiple tests) difference in tree
   topologies."
4. Downstream-selection motivation (Introduction): the Nielsen & Yang (1998) likelihood methods
   "may suffer from high rates of false positives when the sequences being analyzed have undergone
   recombination (Anisimova et al. 2003; Shriner et al. 2003)."
5. Prescreen result (Results, Effect of Recombination): splitting each alignment into two fragments
   identified by the single–break point scan and analyzing each with FEL "restored good statistical
   properties of FEL."

**Functional strings (verbatim, license-independent):** `AICc = −2 log L(θ̂|data) + 2p(N/(N−p−1))`;
Akaike weight `wi = exp(−Δi/2) / Σr exp(−Δr/2)`, `Δi = AICc_i − min AICc`; validity requirement
`N > 2(2S − 3) + bp`; hypermutation diversity threshold `0.1%`; bit-toggle fraction `15%`;
termination `100 consecutive generations`; CHC population `2P − 2`; `P = 17`; SH threshold `P < 0.01`
(Bonferroni); FEL classification threshold `P < 0.1`; typical run `10^3–10^4` models; distance metric
`TN93`; tree method `NJ`; tools/URLs `HyPhy`, `datamonkey.org/GARD/`, `hyphy.org/pubs/GARD/`.

## 8. Stated scope, assumptions, limitations (source's own)

- Applied to nucleotide data here (framework allows nucleotides, amino acids, codons, other
  alphabets).
- Break points resolved only to the nearest variable site; cannot pinpoint between variable sites.
- Point-substitution parameters (base freqs, substitution bias) estimated once on the whole alignment
  and **held fixed** across the GA run (assumed robust to recombination).
- NJ trees used for expediency; "if additional accuracy is desired, a more computationally demanding
  method can be invoked."
- Incremental growth of B "may underestimate the correct number of break points"; a fixed range
  (e.g. B = 1…20) would be more careful but costlier. Making B a free run-time parameter is called
  challenging (dimension changes at run time).
- SH-based requirement "may be too restrictive" (only Type 3 events give discordant topologies).
- Discordant signal can arise from causes other than recombination — spatially localized selection,
  substitution-rate variation, heterotachy, or hypermutation (e.g. A→I in SSPE measles) — not just
  recombination. Authors "stress the importance" of manually inspecting per-segment trees.

## 9. Failure modes / invalidity patterns

- **No genetic diversity → undetectable.** "Like all methods, ours cannot detect recombination in
  regions where there is no genetic diversity." Break points only sit on variable sites.
- **AICc invalid if too few columns.** Requires `N > 2(2S − 3) + bp` (more alignment columns than
  estimated parameters); AICc use "sensibly requires that there be more observations (alignment
  columns) than the number of estimated model parameters."
- **Short fragments / few sequences → underpowered.** Recombination signal saturates for small
  (8-seq) alignments; B underestimated; at high event counts, correctly-placed break points still
  cannot be statistically supported (Table 2). Symptom: SH-detectable count → 0 despite many true
  events. Called "a fundamental limitation of all tests based on phylogenetic discordance."
- **False break points from non-recombination processes.** Localized selection, rate variation,
  heterotachy, or hypermutation can produce AICc-improving splits or topological discordance without
  recombination (measles M gene example). Diagnostic offered: the optional SH test distinguishes
  true topological incongruence from mere branch-length differences, but AICc-only calls can flag
  Type 1/2 events or "the inadequacy of the model for character substitution."
- **Overcounting break points** observed in Scenarios 1 & 2.
- **Numerical saturation** can drive a branch length to numeric infinity (Table 1 note b,
  Mammalian PGK), voiding AICc for that data set.
- **Downstream (why the prescreen exists):** ignoring recombination inflates FEL Type I error for
  selection above the nominal P value on mis-modeled segments; running codon-selection methods on a
  single tree over a recombinant alignment yields excess false-positive selected sites. Poisson
  random field selection inference (Sawyer & Hartl 1992) conversely "may be misleading in the absence
  of recombination."

## 10. What the source does NOT address (confident silences)

- No single scalar "fold inflation" of downstream false positives is stated in the body text; the
  quantitative FEL error rates are only in Fig. 3 (not accessed). The magnitude is shown to be
  segment-dependent and qualitatively "far in excess," not summarized as one number.
- Does not treat protein/codon-level break-point detection empirically (framework-only for
  non-nucleotide alphabets).
- No default GARD parameter table for end users (this is a methods paper; the companion Bioinformatics
  note / Datamonkey server would cover UI defaults). Named defaults here: hypermutation 0.1%/15%,
  termination 100 generations, CHC population 2P−2.
- Does not specify an automatic way to choose B (left as incremental/manual range).

## 11. Open questions / ambiguities the source leaves unresolved

- How to automatically determine B without incremental underestimation (acknowledged unsolved).
- How to disentangle recombination from rate heterogeneity / heterotachy in general (only partial,
  via optional SH test).
- Exact FEL false-positive magnitude as a single figure (lives in Fig. 3, not in text).
- Robustness of the fixed 0.1% / 15% / 100-generation GA settings across data sizes (stated as "in
  our implementation," not tuned/justified per data set).

## 12. Guidance answers

**Q: What GARD does + the model-selection criterion used to accept a break point (AICc? KH test?
both?).** GARD searches for segment-specific phylogenies via a CHC genetic algorithm and accepts
break points by **small-sample corrected AIC (AICc) model selection**: a break point is inferred
when adding it lowers the AICc (`Ai < A0`); relative positional support is the **Akaike weight**.
The genetic algorithm's fitness function is the AICc score. There is an **optional, secondary**
a-posteriori topology check — the **Shimodaira–Hasegawa (SH) test**, at **P < 0.01 Bonferroni** —
used to verify that adjacent partitions have *significantly different topologies*; it is **not** the
primary detector and is described as possibly too restrictive. So: **AICc is the acceptance criterion;
the SH test is an optional add-on. It is NOT a Kishino–Hasegawa (KH) test** — the paper uses SH, not
KH.

**Q: Does GARD call break points via a p-value threshold (a skill claims "p<0.05") or via
model-selection?** **Via model selection (AICc improvement), not a p-value.** The paper states no
"p<0.05" break-point rule anywhere. The *only* p-value thresholds in the paper are: `P < 0.01`
(Bonferroni) for the **optional SH incongruence test**, and `P < 0.1` for classifying FEL selected
sites (a downstream, unrelated step). The "p<0.05" gloss is **not supported by the source** — it
appears to be a mis-gloss of the AICc-based criterion. Do not encode "p<0.05" as GARD's break-point
rule.

**Q: Magnitude by which unmodeled recombination inflates false positives in downstream selection
inference — exact numbers.** The paper demonstrates the effect but **does not give the exact
magnitude in the body text** — the tabulated FEL Type I error rates are inside **Fig. 3** (not
accessed; see §2). Body-text statements: on the Neutral Scenario, uncorrected single-partition FEL
Type I error on the last-100-codon segment was "far in excess of the nominal P value," while the
first-400-codon segment error was "effectively the same as the P value"; per-fragment analysis
"restored good statistical properties of FEL." Table 4 gives concrete *qualitative* impact — the set
of positively selected codons (FEL, P < 0.1) changes substantially in 14 recombinant biological data
sets (sites added, dropped, shifted). **The exact numeric inflation factor is not recoverable from
the accessed text; it requires Fig. 3.** `[boundary flag]`

**Q: Stated runtime/scaling caveat.** Yes. Brute force over B break points is `~O(V^B)` and
"rapidly becomes impractical" (HIV-1 ~10 kb, ¼ variable → ~10^9 models for 3 break points), hence the
GA. A single GA run takes "several minutes to several hours" depending on alignment size and number
of break points; 100 small alignments screened in ~5 min on 24 nodes; runs use P = 17 nodes, CHC
population 2P−2, ~10^3–10^4 models per run. Scaling caveat on *inference quality* (not just compute):
recombination signal saturates and B is underestimated for small alignments (8 sequences) / short
fragments, independent of the GA search.

**Guidance license note reconciliation** `[summarizer-inferred]`: guidance said "OUP MBE →
all-rights-reserved → own-words prose." The actual article is **Open Access under CC BY-NC 2.0 UK**,
which permits reproduction. This note therefore used **permissive mode** (short verbatim quotes in
§7) rather than own-words-only. Functional strings are verbatim as guidance directed.
