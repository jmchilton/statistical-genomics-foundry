---
title: "Detecting positive selection within genomes: the problem of biased gene conversion"
type: paper
source_id: ratnakumar-2010-gbgc
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC2935097/
doi: 10.1098/rstb.2010.0007
access_date: "2026-07-06"
license: LicenseRef-all-rights-reserved
attribution: "Ratnakumar A, Mousset S, Glemin S, Berglund J, Galtier N, Duret L, Webster MT. Philosophical Transactions of the Royal Society B 365(1552):2571-2580, 2010. DOI 10.1098/rstb.2010.0007. PMID 20643747; PMCID PMC2935097. Full text read via PMC; (c) 2010 The Royal Society, free-to-read, no CC license - all rights reserved."
derived: own-words-summary
tags:
  - domain/gc-biased-gene-conversion
  - domain/dnds
  - domain/molecular-evolution
---

# Ratnakumar et al. 2010 — Detecting positive selection within genomes: the problem of biased gene conversion

> Quoting mode: **own-words** (source is © 2010 The Royal Society, free-to-read on PMC, no CC
> license). §7 is paraphrase, not verbatim prose. Functional strings kept verbatim: the W → S /
> S → W substitution-class labels, W = A/T (weak), S = G/C (strong), and all numeric values.
> Full text read via PMC; figures/tables read from caption + text, not from plotted points.

## 1. Citation
Ratnakumar A, Mousset S, Glémin S, Berglund J, Galtier N, Duret L, Webster MT. 2010. "Detecting
positive selection within genomes: the problem of biased gene conversion." *Philosophical
Transactions of the Royal Society B: Biological Sciences* 365(1552):2571–2580.
DOI 10.1098/rstb.2010.0007. PMID 20643747, PMCID PMC2935097.
Open access: free-to-read at https://pmc.ncbi.nlm.nih.gov/articles/PMC2935097/ .

## 2. Access note
Full text read (Abstract, Introduction, Material and Methods, Results, Discussion) via PMC.
No paywall boundary. Table/figure numeric values were read from caption + surrounding text
(the source's own reported numbers), cross-checked across multiple reads; per-branch Table 3
values (§6) are the source's numbers as recovered from the table body and are flagged where
confidence is lower.

## 3. Thesis (1 sentence)
GC-biased gene conversion (gBGC) can accelerate coding-sequence evolution and inflate dN/dS in a
way that mimics positive selection, and the authors' re-analysis of a primate positive-selection
scan estimates that more than 20 per cent of significantly elevated dN/dS cases could actually be
driven by gBGC rather than adaptation.

## 4. Problem & context
A common approach to detecting positive selection is genome-wide scanning of alignments to find
regions evolving at accelerated rates on a particular branch of a phylogeny (elevated dN/dS =
non-synonymous to synonymous substitution rate ratio). But positive selection is not the only
process that accelerates evolution. gBGC is a recombination-associated process that biases
fixation toward G and C nucleotides; it can generate bursts of substitutions within meiotic
recombination hotspots. Such accelerated evolution of non-neutral sequence is typically read as
evidence for positive selection in the literature — a very different interpretation. The paper
asks how much of a primate positive-selection signal is actually gBGC.

## 5. Method / approach
- **Dataset**: a scan for positive selection on genes across the primate phylogeny (branch tests
  of dN/dS); PSG = positive-selection-gene candidates identified on particular branches.
- **Substitution-class analysis**: substitutions are classified as W → S (weak→strong, A/T→G/C),
  S → W (strong→weak, G/C→A/T), or GC-conservative. W = A and T (weak); S = G and C (strong).
- **Equilibrium GC content (GC\*)**: inferred from observed W → S and S → W substitution rates;
  an elevated GC\* is the genomic signature of gBGC.
- **Genomic correlates tested**: association of accelerated genes with GC\*, with distance to the
  nearest recombination hotspot, and with male vs female recombination rate.
- **Maximum-likelihood (ML) model**: genes are modelled as belonging to two classes with
  different GC\* — class 1 (not subject to gBGC) with GC\* = *g*1, and class 2 (subject to gBGC)
  with GC\* = *g*2 > *g*1. Model parameters are estimated, then individual genes are assigned to
  class 1 or class 2 via Bayes' formula, giving the estimated fraction of PSG candidates that fall
  in the gBGC-affected class.
- **Case study**: the gene ADCYAP1, a previously reported human positive-selection candidate, is
  examined directly against a gBGC-only explanation.

## 6. Key claims / findings
- Genes identified as positive-selection targets have a significant tendency to show the genomic
  signature of gBGC (elevated GC\*).
- **Headline estimate**: more than 20 per cent of cases of significantly elevated dN/dS —
  particularly on shorter branches — could be due to gBGC.
- **Human lineage**: more than 20 per cent of PSG candidates identified on the human lineage may
  be due to gBGC.
- **Per-branch ML breakdown (Table 3, excess of genes assigned to the high-GC\*/gBGC class *g*2
  among PSG candidates)** — the source's numbers: Human 28% (1.9 excess); Chimpanzee 19% (1.9
  excess); all hominids combined 22% (5.0 excess); all branches together 14% (12.3 excess). The
  gBGC excess is stronger among PSGs on short phylogenetic branches (22% in all hominids). [The
  per-branch integer/percentage pairings are recovered from the Table 3 body; the headline
  ">20 per cent" figures in the prose are the higher-confidence values.]
- **dN/dS magnitude**: gBGC can, in some cases, lead to very high dN/dS (more than 2).
- **ADCYAP1 case**: since divergence from chimpanzee, two exons accumulated 20 substitutions, all
  W → S, of which 17 non-synonymous and 3 synonymous; estimated dN/dS = 2.05 in the human lineage.
  gBGC alone is the most parsimonious hypothesis for this pattern; ADCYAP1's evolution can be
  explained by scenarios invoking only gBGC, without adaptive evolution.
- **GC\* signal (Table 1, human lineage)**: accelerated genes have GC\* 0.48 vs 0.41 for the full
  set (elevated equilibrium GC in accelerated genes).
- **Recombination proximity (human lineage)**: accelerated genes are closer to the nearest
  recombination hotspot, 44 kb vs 54 kb overall.
- **Sex-specificity**: elevated W → S substitution rates associate much more strongly with male
  than female recombination rate — a pattern selection would not predict (selection is not
  sex-specific).
- **Why dN/dS rises under gBGC**: non-synonymous codon positions generally have lower GC content
  than synonymous positions (notably in GC-rich genes), so there are more opportunities for W → S
  substitutions at non-synonymous than at synonymous sites; gBGC therefore increases dN relative
  to dS.

## 7. Load-bearing statements (own-words paraphrase; functional strings verbatim)
- The abstract's core: using an ML framework the authors estimate that **more than 20 per cent**
  of cases of significantly elevated dN/dS, particularly on shorter branches, could be due to
  gBGC; gBGC can in some cases produce dN/dS **more than 2**; gBGC significantly affects
  coding-sequence evolution in primates and often produces patterns that can be mistaken for
  positive selection. (Abstract, paraphrased.)
- Mechanism: gBGC is predicted to promote the fixation of slightly deleterious **W → S**
  substitutions that natural selection would otherwise discard, so episodes of gBGC can lead to
  bursts of neutral or deleterious substitutions at functional sites. (Discussion/Results,
  paraphrased; W → S kept verbatim.)
- Working hypothesis for the biology: in primates gBGC is thought to arise from a bias in the
  repair of mismatches in heteroduplex DNA formed during meiotic recombination, favouring
  incorporation of **S** nucleotides. (Introduction, paraphrased.)
- Three distinguishing features (see §9), paraphrased with labels verbatim: (i) gBGC produces
  **W → S** biased substitution whereas selection has a priori no general reason to favour
  **W → S** (functional regions are not generally GC-rich); (ii) selection acts only on functional
  sites but gBGC also affects flanking neutral sites; (iii) gBGC is associated with regions of
  high male recombination (e.g. subtelomeric regions).
- Problem framing: episodes of accelerated evolution of non-neutral sequence are typically taken
  in the literature as evidence for positive selection — a very different interpretation from
  gBGC. (Paraphrased.)

## 8. Stated scope, assumptions, limitations
- Scope is **primates** (the primate phylogeny; human/chimpanzee/hominid branches); the working
  mechanism ("bias in repair of mismatches in heteroduplex DNA during meiotic recombination") is
  stated as the current working hypothesis for primates, drawing on yeast gene-conversion evidence
  and mismatch-repair assays in primate cell lines.
- The 20-per-cent-class result is an ML **estimate** under a two-class GC\* model with Bayesian
  per-gene assignment — a statistical attribution, not a direct demonstration that any individual
  gene is non-adaptive.
- The gBGC signal is strongest on **short branches**; the effect on longer branches is weaker.
- The paper argues gBGC is *a* confound for these candidates; it does not claim all positive
  selection is gBGC.

## 9. Failure modes / invalidity patterns
The failure mode the paper documents: a dN/dS-based positive-selection scan can misclassify a
gBGC-driven acceleration as adaptation. Named symptoms / diagnostics that flag a gBGC-driven (vs
selection-driven) acceleration:
- **Directionality**: substitutions are biased W → S (not S → W, and not GC-conservative);
  selection has no general reason to favour W → S.
- **Elevated equilibrium GC (GC\*)** in the accelerated gene (e.g. 0.48 vs 0.41, human lineage).
- **Effect on flanking neutral sites**: gBGC also elevates substitution at neighbouring neutral
  sites, whereas selection acts only on functional sites.
- **Recombination association**: proximity to recombination hotspots (44 kb vs 54 kb) and
  association with **high male recombination** regions (e.g. subtelomeric).
- **Sex-specificity**: association with male rather than female recombination rate — selection is
  not sex-specific.
- **Extreme dN/dS**: very high dN/dS (more than 2) driven by an all-W → S substitution pattern
  (as in ADCYAP1: 20 substitutions, all W → S, 17 non-synonymous / 3 synonymous, dN/dS = 2.05).

## 10. What the source does NOT address (confident silences)
- No numeric decision threshold is stated for calling a case gBGC — see §11. In particular there
  is **no stated W → S : S → W ratio cutoff** and **no stated recombination-rate cutoff**; the
  criteria are directional/associational and ML-model-based, not a fixed ratio rule.
- Scope is primates; the paper does not extend the 20% estimate to non-primate lineages.
- It does not provide a turnkey software tool/pipeline recommendation for routinely screening
  scans (it describes the ML two-class GC\* model and substitution-class analysis it used).

## 11. Open questions / ambiguities
- The headline attribution is "more than 20 per cent" — a lower bound, not a point estimate; the
  true fraction on any given branch is left as an estimate under the two-class model.
- Individual-gene assignment is probabilistic (Bayes), so any single PSG's status (gBGC vs
  selection) is not resolved with certainty except via case study (ADCYAP1).

## 12. Guidance answers
- **Mechanism (W → S fixation during meiotic recombination; elevated rate at functional sites
  without selection)**: Yes, stated. The working hypothesis is that primate gBGC results from a
  bias in the repair of mismatches in heteroduplex DNA formed during meiotic recombination, with
  mismatch repair biased toward incorporating S (G/C) nucleotides; this preferentially fixes
  W → S alleles. gBGC is predicted to promote the fixation of slightly deleterious W → S
  substitutions that selection would otherwise discard, so episodes of gBGC lead to bursts of
  neutral or deleterious substitutions at functional sites. dN/dS specifically rises because
  non-synonymous positions have lower GC content than synonymous positions, giving more W → S
  opportunities at non-synonymous sites, raising dN relative to dS. (Paraphrased; own-words mode.)
- **Operational criteria to distinguish gBGC from selection**: Yes — three main features,
  enumerated (labels verbatim): (i) gBGC generates W → S biased substitution patterns whereas
  selection has a priori no general reason to favour W → S (functional regions are not generally
  GC-rich); (ii) selection operates only on functional sites, but gBGC also affects flanking
  neutral sites; (iii) gBGC is associated with regions of high male recombination (such as
  subtelomeric regions). Supporting signals used: elevated equilibrium GC (GC\*), proximity to
  recombination hotspots, and the male-vs-female recombination-rate asymmetry (selection is not
  sex-specific).
- **Numeric threshold (W → S : S → W ratio or recombination cutoff)**: **No numeric threshold
  stated.** The paper does not give a W → S : S → W ratio cutoff or a recombination-rate cutoff;
  it distinguishes gBGC by directionality + associations + the ML two-class GC\* model, not a
  fixed ratio. (Confirms the guidance expectation that the "W → S ratio > 1.5" figure is a
  convention, not this paper's number.)
- **Magnitude attributed to gBGC (paper's own re-analysis)**: The paper's own re-analysis of the
  primate PSG scan estimates that **more than 20 per cent** of significantly elevated dN/dS cases
  could be due to gBGC, particularly on shorter branches; likewise more than 20 per cent of PSG
  candidates on the **human lineage** may be due to gBGC. Table 3 per-branch excess in the
  high-GC\*/gBGC class: Human 28%, Chimpanzee 19%, all hominids 22%, all branches 14%. gBGC can
  drive dN/dS more than 2 (ADCYAP1: dN/dS = 2.05, human lineage, 20 substitutions all W → S).
  These are **the paper's own re-analysis numbers**, not a general field statistic.
- **gBGC as an extended NULL to exclude before inferring adaptation**: The paper does **not** use
  the explicit words "null hypothesis to exclude." Its framing is that accelerated evolution of
  non-neutral sequence is typically read as evidence for positive selection, which is a very
  different interpretation from gBGC, and that for ADCYAP1 "gBGC alone remains the most
  parsimonious hypothesis" — i.e. gBGC can fully explain a signal without adaptive evolution. So
  the paper strongly implies gBGC must be ruled out before inferring adaptation, but does not
  state it in explicit null-hypothesis language. [summarizer-inferred: the "extended null"
  phrasing is not the paper's; the paper's own framing is parsimony + mistaken-interpretation.]
