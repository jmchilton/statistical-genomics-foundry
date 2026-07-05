---
title: "Ancestral Reconstruction"
type: paper
source_id: joy-2016-ancestral-reconstruction
source_url: https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1004763
doi: 10.1371/journal.pcbi.1004763
access_date: "2026-07-03"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Joy JB, Liang RH, McCloskey RM, Nguyen T, Poon AFY. Ancestral Reconstruction. PLOS Computational Biology 12(7):e1004763, 2016. DOI 10.1371/journal.pcbi.1004763. Open access under Creative Commons BY."
derived: license-aware-summary
---

# Ancestral Reconstruction — Joy, Liang, McCloskey, Nguyen, Poon 2016

## 1. Citation
Joy JB, Liang RH, McCloskey RM, Nguyen T, Poon AFY. 2016. "Ancestral Reconstruction."
*PLoS Computational Biology* 12(7):e1004763. DOI 10.1371/journal.pcbi.1004763.
Open access (CC BY). URL:
https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1004763
Access date: 2026-07-03. License: **Creative Commons BY** → short verbatim load-bearing
quotes permitted with section location (quoting mode used in §7).

## 2. Access note
Fully open access; full text read via web fetch. This is a **review/tutorial** ("Education"
article), so it surveys method families rather than reporting new results. Verbatim quotes below
were confirmed identical across two independent extractions of the page; treat them as
high-confidence but section headings are as labeled on the article page (PLoS Education format).

## 3. Thesis (1 sentence)
Ancestral reconstruction — extrapolating back in time from measured characteristics of extant
individuals/populations to their common ancestors — can be performed by maximum parsimony,
maximum likelihood, or Bayesian methods, each trading off assumptions, speed, and how it
represents reconstruction uncertainty.

## 4. Problem & context
"Ancestral reconstruction is the extrapolation back in time from measured characteristics of
individuals (or populations) to their common ancestors." The reconstructed target may be a genetic
sequence (ancestral sequence reconstruction), an amino-acid/protein sequence, genome composition
(e.g., gene order), a measurable organismal characteristic (phenotype), or the geographic range of
an ancestral population/species. A governing constraint runs through the whole review: accuracy
degrades with time depth — "one's ability to accurately reconstruct an ancestor deteriorates with
increasing evolutionary time between that ancestor and its observed descendants."

## 5. Method / approach — the taxonomy
The review organizes reconstruction into three method families, plus the evolutionary models they
sit on top of.

### Maximum parsimony (Fitch algorithm)
- Goal: "find the distribution of ancestral states within a given tree that minimizes the total
  number of character state changes."
- Fitch's algorithm uses two tree traversals: a postorder (tips→root) pass assigning candidate state
  sets by set intersection/union, then a preorder (root→tips) pass propagating final assignments
  downward.
- Core assumption: all state changes are equally likely / equally costly (see §7 quote). Relaxable by
  assigning differential costs to specific changes → **weighted parsimony**.

### Maximum likelihood (ML)
- "ML methods of ancestral state reconstruction treat the character states at internal nodes of the
  tree as parameters and attempt to find the parameter values that maximize the probability of the
  data."
- **Marginal reconstruction**: work upward from descendants and progressively assign the most likely
  character state to each ancestor (node-by-node).
- **Joint reconstruction**: find the combination of ancestral states across the whole tree that
  jointly maximizes the likelihood. Slower than marginal but "less likely to be caught in the local
  optima."
- Produces a single point estimate (see §7 / §9 caveat).

### Bayesian inference
- **Empirical Bayes**: ML estimates of the evolutionary model and tree are used to define the prior
  distributions; ancestral states then expressed as a set of probabilities. "By expressing the
  reconstruction of ancestral states as a set of probabilities, one can directly quantify the
  uncertainty for assigning any particular state to an ancestor."
- **Hierarchical (full) Bayes**: infer the joint posterior over ancestral character states, model,
  and tree; the method "averages these probabilities over all possible trees and models of evolution,
  in proportion to how likely these trees and models are, given the data that has been observed."

### Evolutionary models (what ML/Bayes sit on)
- Discrete-state Markov models, including an **Asymmetrical Markov k-state 2-parameter model** (ordered
  state space, transitions only between adjacent states) with two rate parameters `q_inc` and `q_dec`
  (rate of state increase vs. decrease).
- Continuous-trait **Brownian motion** model: transition likelihood is a Gaussian density with mean 0
  and variance σ²t; single parameter σ²; the model "assumes that the trait evolves freely without a
  bias toward increase or decrease, and that the rate of change is constant throughout the branches."

## 6. Key claims / findings (atomic)
- Parsimony minimizes total state changes on a fixed tree; Fitch = two-pass (post- then pre-order)
  algorithm.
- Parsimony's Fitch form assumes all state changes equally likely/costly; "often unrealistic"; e.g.,
  transitions occur more often than transversions in nucleic-acid evolution. Relaxable via weighted
  parsimony (differential costs).
- Parsimony does not account for variation in branch lengths, and is inappropriate when change is the
  norm (rapid evolution / long branches).
- ML treats internal-node states as parameters maximizing data probability; marginal (fast, per-node)
  vs. joint (slower, avoids local optima better).
- ML yields a single point estimate; inadequate when the likelihood surface is highly nonconvex /
  multi-peaked — a Bayesian approach may then be more suitable (see §7 quote B).
- ML accuracy "may be affected by the use of a grossly incorrect model (model misspecification)."
- Bayesian methods express reconstructions as probability sets → direct uncertainty quantification;
  empirical Bayes conditions on fixed ML model+tree, hierarchical Bayes marginalizes over trees and
  models.
- Brownian-motion continuous model: one parameter σ², no directional bias, constant rate along
  branches.
- Overarching limit: reconstruction accuracy deteriorates with increasing evolutionary time between
  ancestor and observed descendants.

## 7. Load-bearing statements (verbatim — CC BY, quoting mode = permissive)
1. Parsimony equal-rates assumption (section "Maximum Parsimony"):
   > "Fitch's method assumes that changes between all character states are equally likely to occur;
   > thus, any change incurs the same cost for a given tree. This assumption is often unrealistic..."
2. Single-point-estimate inadequacy (section "ML"):
   > "ML can only provide a single reconstruction of character states (what is often referred to as a
   > 'point estimate')—when the likelihood surface is highly nonconvex, comprising multiple peaks
   > (local optima), then a single point estimate cannot provide an adequate representation, and a
   > Bayesian approach may be more suitable."
3. Time-depth accuracy limit (section "Introduction"):
   > "one's ability to accurately reconstruct an ancestor deteriorates with increasing evolutionary
   > time between that ancestor and its observed descendants."
4. Brownian-motion assumption (section "Models"):
   > "the model assumes that the trait evolves freely without a bias toward increase or decrease, and
   > that the rate of change is constant throughout the branches."

## 8. Stated scope, assumptions, limitations (source's own caveats)
- Accuracy deteriorates with increasing evolutionary time to the ancestor (universal caveat).
- Parsimony (Fitch): equal-cost assumption "often unrealistic"; ignores branch-length variation;
  inappropriate where change is the norm.
- ML: single point estimate is inadequate under a multimodal likelihood surface; accuracy affected by
  gross model misspecification; marginal reconstruction more prone to local optima than joint.
- Brownian-motion model assumes no directional bias and constant rate along branches (a modeling
  assumption, not a claim about real traits).

## 9. Failure modes / invalidity patterns (referee-relevant)
- **Equal-rates misspecification (parsimony):** when true state changes are not equiprobable (e.g.,
  transition/transversion asymmetry), unweighted Fitch parsimony can be inaccurate. Detector/symptom:
  known rate heterogeneity in the character; remedy = weighted parsimony or a model-based method.
- **Multimodal likelihood surface (ML):** when the likelihood is "highly nonconvex, comprising
  multiple peaks (local optima)," a single ML point estimate "cannot provide an adequate
  representation." Symptom = multiple local optima; remedy = Bayesian posterior instead of a point
  estimate.
- **Local-optima trapping (marginal ML):** marginal reconstruction "is ... more likely to be caught
  in the local optima" than joint reconstruction.
- **Model misspecification (ML/Bayes):** "a grossly incorrect model" degrades accuracy.
- **Deep-time degradation:** reconstruction accuracy falls off with increasing evolutionary time
  regardless of how good the model is.
- **Ignoring branch lengths (parsimony):** parsimony does not use branch-length variation; fails when
  change is frequent.

## 10. What the source does NOT address (confident silences)
- It does **not** state a general/systematic DIRECTION of reconstruction bias arising from asymmetric
  transition rates (see §12-D — this is the guidance's critical question). It presents the
  Asymmetrical Mk2 model (`q_inc`/`q_dec`) as a model form, and separately gives one empirical example
  (bacteriophage T7 plaque size evolving large→small) in a calibration context — but does not
  generalize either into a claim that asymmetric rates favor reconstructing a particular ancestral
  state.
- No head-to-head accuracy benchmark ranking parsimony vs. ML vs. Bayes across conditions (it is a
  survey, not a comparison study).

## 11. Open questions / ambiguities left unresolved
- Which method to prefer in a given empirical setting is framed by trade-offs (speed, local optima,
  uncertainty representation) rather than a decision rule.
- The magnitude/threshold of "highly nonconvex" that should trigger switching from ML to Bayes is not
  quantified.

## 12. Guidance answers
**A. Method taxonomy.** Captured in §5: maximum parsimony (Fitch, two-pass, minimize total changes,
equal-cost assumption relaxable to weighted parsimony); maximum likelihood (internal-node states as
parameters maximizing data probability; marginal per-node vs. joint whole-tree, joint slower but less
prone to local optima); Bayesian (empirical Bayes on fixed ML model+tree → probability sets;
hierarchical Bayes marginalizing over trees and models).

**B. Parsimony's equal-rates assumption — QUOTED (§7 #1).** "Fitch's method assumes that changes
between all character states are equally likely to occur; thus, any change incurs the same cost for a
given tree. This assumption is often unrealistic..." Example given: transitions occur more often than
transversions in nucleic-acid evolution; remedy is weighted parsimony.

**C. Single-point-estimate inadequacy under multimodal likelihood — QUOTED (§7 #2).** "ML can only
provide a single reconstruction of character states ... when the likelihood surface is highly
nonconvex, comprising multiple peaks (local optima), then a single point estimate cannot provide an
adequate representation, and a Bayesian approach may be more suitable."

**D. Asymmetric transition rates — DIRECTION OF BIAS.** The review does **NOT** state a general
direction for a reconstruction bias caused by asymmetric transition rates. It only (i) defines an
Asymmetrical Mk 2-parameter model with separate `q_inc`/`q_dec` rates over an ordered state space, and
(ii) cites one specific empirical case — bacteriophage T7 plaque size showing "a directional bias in
the evolution of plaque size (from large to small plaque diameters)" that required 'fossilized'
samples to address. That large→small direction is a property of that dataset used to motivate
calibration, **not** a general claim that asymmetric rates systematically favor reconstructing one
state at ancestral nodes. Per guidance: the review supplies no general direction, and none is
supplied here.

**E. Reporting/handling uncertainty.** Bayesian methods "express ... ancestral states as a set of
probabilities," letting one "directly quantify the uncertainty for assigning any particular state to
an ancestor." Hierarchical Bayes averages over all trees and models weighted by their posterior
support. ML by contrast gives a single point estimate; when the surface is multimodal, that is
inadequate and Bayes is preferred (§7 #2). No further explicit "don't over-interpret one
reconstruction" prescription beyond these statements is captured.

**F. Named software/tools.** PAML (codeml — ML ancestral reconstruction); HyPhy (joint ML; batch
language); Mesquite (parsimony + ML, discrete/continuous, visualization); MEGA (parsimony, ML,
empirical Bayes); MrBayes (hierarchical Bayes); BEAST (Bayesian, phylogeography); BayesTraits
(discrete/continuous Bayesian); FastML (web server, ML ancestral sequence reconstruction); Lagrange
(geographic range evolution); Diversitree (Mk2 and BiSSE models). [Tool-name list as reported by the
review's software section; individual capability attributions are as summarized, not each verbatim.]
