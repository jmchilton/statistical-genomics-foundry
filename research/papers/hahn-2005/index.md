# Hahn et al. 2005 — Estimating the tempo and mode of gene family evolution

## 1. Citation
Hahn MW, De Bie T, Stajich JE, Nguyen C, Cristianini N. 2005. "Estimating the tempo and mode
of gene family evolution from comparative genomic data." *Genome Research* 15(8):1153–1160.
DOI 10.1101/gr.3567505. Free full text: PMC1182228
(https://pmc.ncbi.nlm.nih.gov/articles/PMC1182228/).
Copyright © 2005 Cold Spring Harbor Laboratory Press (all-rights-reserved journal; freely
readable but not Creative Commons).

## 2. Access note
Read the free full text on PMC (PMC1182228). The CSHL journal HTML (genome.cshlp.org) redirects
to an authenticated login and was not accessible. **Access boundary:** the core mathematical
formulas — Equation (1) for the transition probability and the definition of α — are embedded
in the source as image files (`M1.gif` / inline graphic) and are **not text-extractable** from
the HTML. Their exact symbolic form is therefore not recoverable from this note; see §7 and §11.
This note works only from the source; anything not in the source is marked `[summarizer-inferred]`.

## 3. Thesis (1 sentence)
A stochastic birth-death (BD) process of gene gain and loss along a phylogeny, fit by maximum
likelihood to gene-family sizes across extant genomes, lets one estimate the genome-wide rate of
family-size change ("tempo") and identify individual families whose size change on particular
lineages is too large to be explained by that single rate ("mode").

## 4. Problem & context
Comparative genomics gives gene-family sizes (gene counts per family) across multiple complete
genomes. The authors want a probabilistic framework to (a) estimate how fast gene families gain
and lose members over evolutionary time, and (b) flag families whose evolution is unusual /
lineage-specific, as candidates for adaptive or otherwise non-random change. Prior approaches were
largely descriptive counts; this paper supplies an explicit stochastic model with a likelihood.

## 5. Method / approach
- **Data & clustering.** Five *Saccharomyces* genomes were used: *S. cerevisiae, S. paradoxus,
  S. mikatae, S. kudriavzevii, S. bayanus*. Genes were clustered into families with the
  **TRIBE-MCL** algorithm; the analysis used **3517 gene families** shared among the species.
- **Model.** Gene-family size X(t) evolves by a continuous-time birth-death process; each gene in
  a family independently has a rate of duplication (birth) and loss (death). The single rate
  parameter is **λ (lambda)**, the birth-and-death rate per gene per unit time, under the explicit
  assumption **birth rate = death rate (λ = μ)**.
- **Transition probability.** Equation (1) gives P(X(t) = c | X(0) = s), the probability that a
  family of size s at the start of a branch has size c at the end, as a function of λ and the
  branch length t, via a quantity **α**. (Exact symbolic form is an image in the source; not
  reproduced here — see §11.) Branch lengths t enter the likelihood directly as the time over
  which the process runs on each branch.
- **Likelihood over the tree.** The per-branch transition probabilities are combined over the
  phylogeny to give the likelihood of the observed family sizes at the tips.
- **Rate estimation.** λ is estimated by **maximum likelihood** — the value of λ that makes the
  whole data set maximally likely — using **Expectation-Maximization (EM)**. Estimated value for
  the yeast data: **λ = 0.002 per million years** (i.e. rate expressed per My).
- **Ancestral sizes.** Family sizes at internal nodes are inferred (reported as via a max-product
  computation over the tree).
- **Testing unusual families.** For each family a **conditional P-value** is computed, conditioned
  on the root (ancestral) family size: the probability that a random family with that fixed root
  size would have a smaller/less-likely conditional likelihood than observed. Because the true root
  size is unknown, a **supremum P-value** (the maximum over possible root sizes) is used as a
  composite test. To localize *where* the unusual change happened, two approaches are described:
  recomputing the P-value with each branch removed, and a likelihood-ratio comparison of a model
  with a branch-specific λ against the global-λ model.

## 6. Key claims / findings (atomic)
- Across five yeast species (~**32 million years** of divergence), **1254 of the 3517** shared gene
  families had **changed in size**.
- Genome-wide birth-death rate estimated at **λ = 0.002 per million years** for these yeasts.
- Of the **1254** families that differed in number between genomes, **58 had P-values < 0.01**,
  whereas **35 are expected** by chance at that threshold — an excess of unusually evolving families.
- The framework separates **tempo** (the rate λ of family-size change) from **mode** (direction —
  expansion vs. contraction — and lineage-specificity of change), and identifies specific families
  + branches responsible for non-random change.
- λ = μ (equal birth and death) is an explicit modeling assumption, not an estimated ratio.

## 7. Load-bearing statements (RESTRICTIVE license → own-words paraphrase; functional strings verbatim)
Mode: all-rights-reserved journal, so paraphrase; exact tokens (parameter symbols, numeric
values, algorithm names, the p-value counts) preserved verbatim as functional strings.
- The model is a birth-death process on gene-family size with a single rate **λ**, assuming
  **λ = μ** (birth rate equals death rate).
- λ is fit by maximum likelihood over the whole data set using **Expectation-Maximization**;
  for the yeast data the estimate is **λ = 0.002 per million years**.
- Unusual families are found by a **conditional P-value** computed conditional on the root
  family size, aggregated across possible root sizes as a **supremum P-value** composite test.
- Quantitative result, verbatim tokens: of **1254** size-changed families, **58** had **P-values
  < 0.01** while **35** were expected by chance.
- Branch lengths for the yeast tree were taken from prior work (Rokas et al. 2003; Kellis et al.
  2003) and are given as **time t in millions of years**.

## 8. Stated scope, assumptions, limitations (source's own caveats)
- **Single global rate.** A single λ is assumed to apply across all families; the authors note no
  relationship is modeled between family size and duplication/deletion rate. Large families may in
  reality gain/lose faster (e.g. via nonhomologous pairing / unequal crossing over), and small
  families of essential genes may have depressed loss rates — violating the single-rate assumption.
- **Independence of genes.** The BD model assumes each gene in a family duplicates/is lost
  independently; large-scale events (chromosomal duplication/deletion, polyploidy / whole-genome
  duplication) act on many members at once and violate this.
- **Transposable elements** violate the model (non-Mendelian multiplication, selection) and can
  appear as spurious outliers.
- **Prior/likelihood bias.** A uniform prior over root sizes was found to bias toward attributing
  larger likelihoods to smaller families; the authors use conditional likelihoods (conditioning on
  root size) rather than an explicit prior to avoid this.
- **Tree quality.** Reliable phylogenetic trees are called the potentially hardest part of future
  analyses (branch lengths matter, since t scales the process).

## 9. Failure modes / invalidity patterns (referee-relevant)
- **Whole-genome duplication / polyploidy** breaks the independence assumption → families changing
  together are mis-scored; flagged families may be artifacts of a single genomic event.
- **Transposable elements** produce spurious "rapidly evolving" outliers.
- **Very large families** may violate the constant-per-gene-rate assumption (rate may scale with
  size) → over- or under-calling of unusual evolution.
- **Wrong/miscalibrated branch lengths** distort the likelihood because branch length t directly
  scales expected change under λ.
- **Using a naive uniform prior on root size** biases likelihoods toward small families (why the
  method conditions on root size instead). Detector/symptom named by the source: smaller families
  systematically receiving larger likelihoods under the uniform prior.
- At threshold P < 0.01, ~35/1254 flags are expected by chance — i.e. a substantial false-positive
  baseline; only the *excess* (58 vs 35) is evidence of real non-random evolution.

## 10. What the source does NOT address (confident silences)
- Does **not** allow birth ≠ death (λ = μ is fixed); no separate gain vs. loss rate.
- Does **not** provide the exact α / Equation (1) symbolic form in text-extractable form (image only).
- Does **not** explicitly state an **ultrametricity requirement** or assume a **molecular clock**;
  it simply uses a tree with branch lengths given in millions of years (see §12).
- Does **not** give an explicit minimum number of species / families required for power (only that
  5 species and 3517 families were used).

## 11. Open questions / ambiguities
- Exact form of Equation (1) and the definition of α (image-only in the source; a standard
  equal-rate birth-death transition probability is `[summarizer-inferred]` to be of the form
  α = λt/(1+λt) with a summation over shared-ancestry terms, **but this was NOT verified against
  the source figure and must be re-checked from the PDF**).
- Whether the "max-product" ancestral-size reconstruction is exact or approximate is not fully
  detailed in the accessible text.

## 12. Guidance answers
- **Model formulation (own-words).** Gene-family size evolves by a continuous-time **birth-death
  process** along the phylogeny; a single per-gene rate **λ** governs both gain and loss under the
  explicit assumption **λ = μ** (equal birth and death). Branch lengths enter as the time t over
  which the process acts on each branch, via the transition probability P(X(t)=c | X(0)=s) of
  Equation (1) (which depends on λ and t through α). λ is estimated by **maximum likelihood** over
  the whole data set using **Expectation-Maximization**.
- **Estimates vs. tests.** ESTIMATES the single genome-wide gain/loss rate λ (= 0.002 per My for
  yeast). TESTS individual families for evolving faster than expected under that single global rate,
  via a **conditional P-value** (conditioned on root family size) aggregated as a **supremum
  P-value**; families below a P-value cutoff (0.01 used here) are flagged, and per-branch tests
  (branch removal; branch-specific-λ likelihood ratio) localize the responsible lineage. This is
  the origin of "lineage-specific rate shift" detection.
- **Tempo and mode framing / input data.** "Tempo" = the rate λ of family-size change; "mode" =
  direction (expansion/contraction) and lineage-specificity. Input data = **gene-family sizes
  (integer counts of genes per family) across extant species** from complete genomes (here, TRIBE-MCL
  clusters over 5 *Saccharomyces* genomes; 3517 families).
- **Tree / branch-length / ultrametricity requirement (the key guidance question).** The paper uses
  a phylogeny whose **branch lengths are given as time t in millions of years** (taken from Rokas
  et al. 2003 and Kellis et al. 2003). It does **NOT explicitly state a requirement that the tree be
  ultrametric, nor does it assume a molecular clock.** `[summarizer-inferred]`: because the tips are
  contemporaneous extant species and branch lengths are in absolute time (My), the working tree is in
  practice a time-scaled/ultrametric tree — but the source makes no explicit ultrametricity claim.
  Branch-length units: **millions of years**.
- **Limitations (own-words caveats).** Captured in §8: single global rate (no size↔rate coupling),
  gene-independence assumption broken by whole-genome duplication/polyploidy, transposable-element
  outliers, uniform-prior bias toward small families (handled by conditioning on root size), and the
  difficulty of obtaining reliable trees/branch lengths.
- **Must-capture functional strings.** Parameter symbol **λ** (lambda); assumption **λ = μ**;
  estimate **λ = 0.002 per million years**; threshold **P < 0.01** with **58** observed vs **35**
  expected of **1254**; algorithm **TRIBE-MCL**; optimizer **Expectation-Maximization (EM)**.
