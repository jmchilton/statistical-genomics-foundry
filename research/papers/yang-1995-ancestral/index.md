# Yang, Kumar & Nei 1995 — A New Method of Inference of Ancestral Nucleotide and Amino Acid Sequences

## 1. Citation
Yang Z, Kumar S, Nei M. 1995. "A New Method of Inference of Ancestral Nucleotide and Amino
Acid Sequences." *Genetics* 141(4):1641–1650 (December 1995). DOI: 10.1093/genetics/141.4.1641.
Open-access full text via PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC1206894/ .
Manuscript received May 8, 1995; accepted September 14, 1995. Communicating editor: B. Golding.
Accessed 2026-07-03 (full-text PDF via Europe PMC render of PMC1206894).

## 2. Access note
Full text read (10-page scanned PDF, all sections: Abstract, Theory, Analysis of an Example Data
Set, Discussion, Literature Cited). No paywall boundary. Text was OCR-extracted; equations were
scanned and are partly garbled — equation *forms* below are reconstructed from the surrounding
prose descriptions of each numbered equation (marked where reconstruction was required).

## 3. Thesis (1 sentence)
Ancestral nucleotide/amino-acid states can be inferred by an (empirical-)Bayesian likelihood
procedure that, given a tree and a substitution model with ML-estimated branch lengths, computes
the posterior probability of each candidate reconstruction and picks the most probable — yielding
both a best reconstruction *and* a per-site/per-node probability that it is correct, which
parsimony cannot supply.

## 4. Problem & context
Ancestral-sequence reconstruction (for gene resurrection, tracing substitution pathways, detecting
convergence/positive selection) had been done almost exclusively by maximum parsimony (Fitch 1971;
Hartigan 1973), which minimizes the number of state changes on the tree. Parsimony's stated
weaknesses: (a) its reconstruction accuracy is usually unknown (only the heuristic that closely
related sequences are reliable); (b) it ignores biased/unequal substitution rates among
nucleotides/amino acids and unequal branch lengths; (c) it often yields many equally-parsimonious
reconstructions at a site with no natural way to choose among them. In stochastic ML phylogenetics,
ancestral states are random variables that do not appear in the likelihood function and are normally
not estimated; the perceived obstacle was that there are so many possible reconstructions per site
that any single choice seems unlikely to be correct (worked example: an unrooted tree of 10 amino-
acid sequences has 8 interior nodes → 20⁸ = 2.56 × 10¹⁰ assignments per site; random assignment
would be correct with probability 0.39 × 10⁻¹⁰). The paper proposes the model-based likelihood
alternative and quantifies its accuracy on real data.

## 5. Method / approach

### Setup and model
- Data: aligned sequences of extant species, all gaps excluded. Tree topology assumed **known**.
  Example tree (Figure 1): unrooted 6-taxon tree (langur, baboon, human, rat, cow, horse), external
  nodes 1–6 = extant, interior nodes 7–10 = extinct ancestors.
- No molecular clock assumed → unrooted trees. Branch length = average number of substitutions per
  site. Substitution rate assumed **the same for all sites**.
- Substitution model: the empirical amino-acid model of Jones, Taylor & Thornton 1992 (an update to
  Dayhoff et al. 1978), which has **no free parameters**. Therefore the only parameters θ are the
  branch lengths (θ = {t₁, …, t₉} for Figure 1). πᵢ = equilibrium frequency of amino acid i; Pᵢⱼ(t)
  = transition probability i→j over time t.
- Data at a site: x = (x₁,…,x₆), xᵢ = amino acid in extant sequence i. A reconstruction/assignment
  y = (y₇,y₈,y₉,y₁₀) = amino acids assigned to interior nodes.

### Likelihood of the data (Eq. 1)
With the root fixed arbitrarily at interior node 7, the probability of observing site data x is a
sum over all interior-node assignments y (Felsenstein 1981 pruning algorithm):

    f(x;θ) = Σ_y [ f(y) · f(x | y; θ) ]                                     (1)

where f(y) is the prior probability of y and f(x|y;θ) the conditional probability of x given y. The
bracketed contribution of a specific assignment y₇y₈y₉y₁₀ equals the equilibrium frequency of the
root state, π_{y₇}, times the transition probabilities along the nine branches. Under site
independence, the whole-sequence likelihood (for estimating θ) is the product of f(x;θ) over sites.

### Reconstruction as a conditional (posterior) distribution
To estimate y, study the conditional probability of y given x (Eq. 2):

    f(y | x; θ) = f(y) · f(x | y; θ) / f(x; θ)                              (2)

Because y is discrete, estimate ŷ = argmax_y f(y|x;θ) — the **best reconstruction at the site** is
the assignment making the greatest contribution to f(x;θ). θ is replaced by its **maximum-likelihood
estimates**; this gives the method its **empirical-Bayesian** interpretation (Maritz & Lwin 1989).
Computation uses the pruning algorithm; the full 20⁴ = 160,000 assignments per site need not be
enumerated because most have vanishingly small probability (restrict to amino acids actually
observed at the site; use parsimony's equivocal-state sets to prune).

### Per-node (marginal) posterior — Eq. 4
The posterior probability for a *single* interior node's state is obtained by summing the
contributions of all reconstructions that assign that state to the node, divided by f(x;θ). Example
for node 10 = Val:

    f(y₁₀ = Val | x; θ) = [ Σ_{y : y₁₀=Val} f(y) · f(x | y; θ) ] / f(x; θ)  (4)

Best assignment at a node = state of highest posterior probability. The best single-node assignment
by (4) can differ from that node's state in the best joint reconstruction by (2), but such cases are
rare; the paper uses (2) to reconstruct the sequence and (4) as an additional accuracy measure.

### Accuracy measure — Eq. 3
Overall accuracy = expected posterior probability of the best reconstruction, averaged over site
patterns:

    Prob(ŷ is correct) = Σ_x f(x) · f(ŷ | x; θ)                             (3)

Interpreted via simulation: it equals the probability that reconstructed ancestral states at a site
match the true (simulated) states. Rather than enumerate all x, the paper uses **observed site-
pattern frequencies** (expected reliable if a realistic model is used). Accuracy is also reported
restricted to variable (polymorphic) sites and to parsimony-informative sites.

### Extinct lineage with no extant descendants — Eq. 5
If an extant sequence (e.g. human at node 3) is unavailable, branch lengths t to that node are
supplied from external sources (fossil branching dates). The node-3 state posterior is propagated
from the neighbouring interior node:

    f(y₃ | x; θ) = Σ_{y₈} f(y₈ | x; θ) · p_{y₈ y₃}(t₃)                       (5)

Its reconstruction is less accurate than the adjacent interior node's.

### Relation noted by the authors
Reconstruction by (2) is described as closely related to Yang & Wang (1995) / Yang (1995a) for
predicting realized values of random variables (there, continuous per-site rates estimated by
conditional mean; here, discrete ancestral states estimated by maximizing the posterior).

### Parsimony (comparison method)
Fitch (1971) / Hartigan (1973) algorithms enumerate all minimum-change reconstructions. When ≥2
equally-best parsimony reconstructions exist, the site's parsimony accuracy is the average over them
(equivalent to counting the method as 1/k correct when k equally-best reconstructions and one is
correct).

## 6. Key claims / findings (atomic)

- **Likelihood beats parsimony on reconstruction accuracy.** Lysozyme c (6 mammals, 128 sites after
  removing sites 70 & 103): likelihood accuracy = **0.908** (all sites), **0.856** (variable),
  **0.733** (parsimony-informative). Parsimony = **0.843 / 0.755 / 0.512** respectively.
- **Per-node likelihood accuracy, lysozyme**: nodes 7, 8, 9, 10 = **0.974, 0.982, 0.987, 0.913**
  → per-sequence error rate 1.3–8.7%. Node 10 (attached by long branches) is the least reliable.
- **Second data set — mitochondrial cytochrome b, 16 animals** (14 interior nodes; 375 sites, 169
  invariant; total tree length 2.726 subs/site by ML vs 1.891 changes/site, 709 total, by parsimony).
  Likelihood accuracy = **0.851 / 0.728 / 0.633** (all / variable / parsimony-informative); parsimony
  = **0.795 / 0.627 / 0.495**. Per-node likelihood-reconstructed amino acid correct in range
  **0.870–0.928** across the 14 nodes. At 20 sites parsimony gave >10 equally-best reconstructions;
  at 3 sites >90.
- **A single most-parsimonious reconstruction can be unreliable.** Site 2 (data IIVTW): the unique
  MP reconstruction VVIV has posterior probability only **0.563**; site 117's single MP
  reconstruction has only **18.5%** chance of being correct.
- **Posterior probabilities discriminate among equally-parsimonious reconstructions.** Site 14: three
  MP reconstructions (each 3 changes) have posteriors 0.721 (RRRR), 0.249 (RRRK), 0.005 (RRRA) — a
  ~150× spread — driven by which changes fall on long vs short branches and by model exchangeabilities.
- **Rate biases matter.** Site 2's IIII reconstruction (4 changes) carries a surprisingly high
  posterior (0.179) because Ile↔Val and Ile↔Thr are frequent under the Jones et al. model and
  branches 10–5, 10–6 are long.
- **Robust to the substitution model.** Dayhoff et al. (1978) gave reconstructions identical to Jones
  et al. at all but 3 lysozyme sites (50, 83, 107). The Poisson (equal-rates) model differed at 6
  sites (23, 50, 83, 86, 107, 117), though posteriors often differed; even the simple Poisson model
  beats parsimony because it still uses branch-length differences.
- **Accuracy does not improve much with sequence length** (longer sequences improve branch-length
  estimates, not per-site reconstruction accuracy).
- **Ancestral states cannot be more reliable jointly than at any single node**: the joint accuracy of
  (y₇y₈y₉y₁₀) by (3) cannot exceed the marginal accuracy of any one node by (4).

## 7. Load-bearing statements — OWN-WORDS PARAPHRASE mode (source is © Genetics Society of America / Oxford University Press, all rights reserved; no Creative Commons license). Equation forms and functional strings quoted verbatim as facts.

- **Definition of the per-node posterior (Eq. 4):** the posterior probability that a given interior
  node carries a particular state is the summed contribution to f(x;θ) of every reconstruction that
  assigns that state to the node, divided by f(x;θ); the best assignment at the node is the state of
  highest posterior probability. (Verbatim functional form: `f(y₁₀ = Val | x;θ) = Σ_{y:y₁₀=Val}
  f(y)f(x|y;θ) / f(x;θ)`, Eq. 4, p. 1644.)
- **Best reconstruction (Eq. 2):** given site data x, compare the conditional probability
  `f(y|x;θ) = f(y)f(x|y;θ)/f(x;θ)` across assignments y and take the maximizer ŷ; with θ set to its
  ML estimates the estimator has an "empirical Bayesian interpretation" (Maritz & Lwin 1989), p. 1643.
- **Accuracy of a reconstruction (paraphrase, p. 1643):** the posterior probability f(ŷ|x;θ) is
  itself the measure of how accurate the reconstruction at a site is; averaging it over sites (Eq. 3)
  gives the overall probability that reconstructed states are correct.
- **On thresholds (paraphrase, p. 1645 and Table 1 note):** the authors describe reconstructions
  qualitatively as "reliable," "not very reliable," "quite reliable" by their posterior values, and
  they *display* in Table 1 only reconstructions with posterior probability in the range **0.05–0.95**
  (sites whose single reconstruction sat outside that band — very high or very low — are omitted), and
  note omitted invariant/near-invariant sites had a "very high probability (>0.95) of being correct."
  These are display/description choices, **not** a prescribed reliability cutoff (see §12).

## 8. Stated scope, assumptions, limitations (the source's own caveats)
- Tree topology is assumed **known** (given); the method reconstructs states on a fixed tree.
- Substitution model assumed **the same across the whole tree** — the authors call this "questionable"
  for lysozyme c because adaptive/convergent evolution appears to have occurred in the langur and cow
  lineages; branch-specific rate matrices would be needed but may involve too many parameters
  (Barry & Hartigan 1987; Yang & Roberts 1995) and practical such models are "yet to be developed."
- Substitution rate assumed **constant across sites**; the authors argue reconstruction is expected
  to be insensitive to this because a fast site behaves like proportionally elongated branches, and
  relative contributions of reconstructions depend mainly on number of changes, branch lengths, and
  change likelihoods (not on a uniform branch-length scaling).
- More parameters than data points (one site ≈ one data point): "it is almost certain that some of
  the reconstructions are wrong, although they are the best we can obtain from the data."
- Accuracy depends on: closeness/similarity of the extant sequences, how variable the site is, and
  how close interior nodes are to sampled extant species. Deep/long-branch nodes (e.g. node 10) are
  least reliable.
- Only empirical amino-acid models (Dayhoff 1978; Jones et al. 1992) available; these are averages
  over many proteins and branch lengths and "may not reflect the characteristics of the protein being
  analyzed"; more realistic amino-acid models are needed.

## 9. Failure modes / invalidity patterns (referee-relevant)
- **Unreliable posteriors when inputs are wrong:** "The calculated posterior probabilities may not be
  reliable if estimates of parameters (θ in Equation 2) are unreliable or if the assumed substitution
  model is incorrect" (p. 1648). Symptom/guard: check branch-length estimates and model fit.
- **Single MP (or single best) reconstruction ≠ reliable:** a unique reconstruction can still have low
  posterior (0.563 at site 2; 0.185 at site 117). Detector: read the posterior, not the uniqueness.
- **Deep / long-branch interior nodes** are systematically less accurate (node 10: highest error 8.7%;
  cytochrome b per-node accuracy floor 0.870). Symptom: node attached to extant taxa by long branches.
- **Model misspecification with lineage-specific selection:** same-model-across-tree assumption breaks
  where positive/convergent selection differs among lineages (lysozyme langur/cow); may bias which
  shared changes are inferred.
- **Rare-but-high-posterior traps:** a many-change reconstruction can outrank a fewer-change one when
  the frequent-substitution pairs and long branches favour it (site 2 IIII at 0.179) — parsimony's
  change-count is not the reliability ordering.
- **Underestimated per-node posteriors:** restricting the enumeration in (4) to observed amino acids
  slightly *underestimates* node posteriors, but the authors state the comparison among assignments is
  not seriously affected.

## 10. What the source does NOT address (confident silences)
- No prescribed numeric posterior cutoff for declaring a reconstruction "reliable" (see §12).
- Does not co-estimate tree topology — topology is an input (and the ML/MP topology for the example is
  noted to be *incorrect*; the "biological" tree is used instead).
- No treatment of alignment uncertainty (gaps simply excluded) or of indel reconstruction.
- Does not use or name the modern terms "marginal reconstruction" vs "joint reconstruction" (the
  distinction is present operationally via Eqs. 4 vs 2; the labels are not).
- Rate-variation-across-sites (gamma) implementation is deferred, "not pursued in this paper."

## 11. Open questions / ambiguities left unresolved
- Statistical tests for whether convergent substitutions occur more often than the model predicts
  (Goldman 1993 cited as "a good start").
- Practical branch-heterogeneous substitution models (different rate matrices per branch) remain to
  be developed.
- Extending the method to discrete-gamma variable-rate models (Yang 1994b) is left for future work.

## 12. Guidance answers

**Q: The method for computing per-site/per-node posterior probabilities (empirical-Bayes / marginal
reconstruction).** Answered — see §5 and Eqs. (1)–(5). Core: fit branch lengths θ by ML under a
fixed model+tree (empirical amino-acid model of Jones et al. 1992, no free parameters); the pruning
algorithm gives f(x;θ) = Σ_y f(y)f(x|y;θ) with the root state weighted by its equilibrium frequency
π and each branch by Pᵢⱼ(t). Best joint reconstruction ŷ = argmax_y f(y|x;θ) via Eq. (2). Marginal
per-node posterior via Eq. (4): sum contributions of all reconstructions sharing that node state,
divide by f(x;θ); pick the highest. Because θ is plugged in at its ML estimate, the procedure is
*empirical Bayes* (their own framing, citing Maritz & Lwin 1989).

**Q (LOAD-BEARING): Does the paper prescribe a confidence/posterior CUTOFF (e.g. 0.95) for calling a
site "reliable"?** **No — the paper prescribes NO posterior threshold.** The only appearances of 0.95
and 0.05 are (a) a **table-display filter**: Table 1 shows "only reconstructions that have posterior
probabilities in the range 0.05–0.95," i.e. it hides sites whose best reconstruction is either very
confident or hopeless — a presentation choice, not a reliability rule; and (b) a descriptive remark
that the omitted invariant/near-invariant sites "had a very high probability (>0.95) of being
correct." Reliability is otherwise discussed purely qualitatively ("reliable," "not very reliable,"
"quite reliable") tied directly to the numeric posterior, with no stated cutoff for acceptance.
**Therefore a ≥0.95 posterior threshold is a downstream convention and is NOT citable to Yang et al.
1995.** (The related 5% figure is that Table 1 column-4 "additional parsimony reconstructions have
posterior probabilities lower than 5%" — again descriptive, not prescriptive.)

**Q: Marginal vs joint distinction as framed here.** Addressed conceptually but **not with those
terms**. "Joint" = the best reconstruction of *all* interior nodes simultaneously, y₇y₈y₉y₁₀, via
Eq. (2) — used to build the reconstructed sequence. "Marginal" = the assignment at a *single* node
via Eq. (4). The authors state the two can disagree (rarely), and that the joint reconstruction of
all nodes "cannot be more reliable than the assignment at any of the interior nodes." They use (2)
for the sequence and (4) as a supplementary per-node accuracy/diagnostic measure. The words
"marginal" and "joint" do not appear.

**Q: Stated accuracy / limitations — model dependence, branch lengths, sparse data, deep divergence.**
Answered — see §6, §8, §9. Key: robust to substitution-model choice (Dayhoff≈Jones; Poisson differs
at few sites but still beats parsimony); posteriors unreliable if θ or the model is wrong; accuracy
governed by sequence similarity, site variability, and proximity of interior nodes to sampled taxa;
long-branch/deep nodes least reliable (node 10 up to 8.7% error; cytochrome b nodes 0.870–0.928);
adding sequence length improves branch-length estimates but not per-site accuracy much; more
parameters than data points guarantees some wrong reconstructions.

**Q: Software mentioned (PAML lineage).** Answered. The method is implemented in the **baseml**
(nucleotide) and **aaml** (amino acid) programs of the **PAML** package, distributed by Ziheng Yang,
obtainable by anonymous ftp at `ftp.bio.indiana.edu` under directory `molbio/evolve` (p. 1649).
[Contemporary implementation: codeml `RateAncestor=1` — not in this 1995 paper; see the PAML-manual
note.] Also cited/compared: MacClade (Maddison & Maddison 1992), PAUP (Swofford 1993), Fitch (1971)
and Hartigan (1973) parsimony algorithms.

**Must-quote items (rendered own-words under restrictive license; equation forms verbatim):** the
per-site posterior definition is captured in §5 Eq. (2)/(4) and §7; the sentence bearing on a
threshold is captured verbatim-as-functional-fact in §7/§12 — the "0.05–0.95" range is a Table-1
display band, and ">0.95 of being correct" is a description of omitted invariant sites, neither being
a prescribed reliability cutoff.
