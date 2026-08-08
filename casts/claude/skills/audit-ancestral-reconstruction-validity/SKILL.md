---
name: audit-ancestral-reconstruction-validity
description: "Judges whether an ancestral sequence or character-state reconstruction has earned its reliability claims, emitting a per-axis pass/flag/fail verdict."
---

# audit-ancestral-reconstruction-validity

Follow the procedure below. The reference sections are the evidence base it reasons from; read the upfront ones before you start.

## When To Use

- Judges whether an ancestral sequence or character-state reconstruction has earned its reliability claims, emitting a per-axis pass/flag/fail verdict.

## Load Upfront

- None declared.

## Load On Demand

- `references/notes/beaulieu-omeara-2016-hisse.md`: Research carried verbatim. Offer (unverified) the character-independent / hidden-state model as a candidate null for trait-dependent diversification claims. Use when: an SSE analysis needs a character-independent null and HiSSE/hidden-state is proposed as that null.
- `references/notes/cunningham-1999-asr-limitations.md`: Research carried verbatim. Ground the thesis-level caution: hypothesis-test characters are usually under selection, so homoplasy corrupts ancestral-state inference more than phylogeny inference; irreversibility hypotheses are the hardest case. Use when: reconstructed ancestral states are used to test an evolutionary hypothesis, especially irreversibility (Dollo's law).
- `references/notes/foley-2022-grasp.md`: Research carried verbatim. Ground: indels are a first-class inferred process (POG/BE), separate from character states; indel histories can be ambiguous; edge support = proportion of extant seqs; NO numeric indel- or substitution-posterior cutoff is given. Use when: the reconstruction involves indels/gaps, or claims indel/hybrid ancestral variants.
- `references/notes/hochberg-thornton-2017-resurrection.md`: Research carried verbatim. Ground: ASR output is an ensemble, MAP is one point estimate; characterize alternate plausible reconstructions to test robustness; qualitative function robust, quantitative values often not. Use when: a single ML/MAP ancestor is carried into a functional, structural, or experimental claim.
- `references/notes/paml-manual.md`: Research carried verbatim. Ground: RateAncestor=1 -> rst (empirical-Bayes ASR); verbose=1 gives full marginal posterior; marginal (eq.4, per-node) vs joint (eq.2, all-nodes); named misuse = reusing reconstructed ancestral sequences as observed data; NO saturation cutoff stated. Use when: the analysis used codeml/baseml (PAML) to reconstruct ancestral states.
- `references/notes/rabosky-goldberg-2015-bisse.md`: Research carried verbatim. Cautionary: BiSSE Type-I error grossly inflated on real trees (>77%, 61.5%; pure-birth control exactly 5%); required check = simulate neutral traits on THIS tree and recalibrate; a negative BAMM/MEDUSA result does not clear the dataset (25-55% error persists). Use when: a reconstructed trait/character state is claimed to affect diversification (BiSSE/SSE), or SSE significance is asserted without a tree-specific null.
- `references/notes/szantho-2023-compositional-lba.md`: Research carried verbatim. Invalidity pattern: site-homogeneous models underestimate convergent substitutions at low-Keff sites → long-branch attraction; simulation failure at p>=0.8; diagnostic = Keff-binned dlogL; remedy = CAT-PMSF. Use when: deep-node / long-branch reconstruction run under a site-homogeneous substitution model.
- `references/notes/yang-1995-ancestral.md`: Research carried verbatim. Ground: the per-site/per-node posterior IS the accuracy measure; a unique best reconstruction can still be low-posterior (0.563, 0.185); long-branch/deep nodes least reliable; NO 0.95 reliability cutoff is prescribed. Use when: the analysis reports reconstructed ancestral states and their reliability/posterior is in question, or treats a single best reconstruction as certain.

## Procedure

# Audit ancestral-reconstruction validity

A Family-B referee. Given an analysis that reconstructs ancestral sequences or ancestral
character states on a fixed tree, judge whether its reliability claims are earned. Non-self-
certifying: reasoning here (Critique) flags invalidity; where reasoning is not enough, hand off
to a Calibrate check. Emit a verdict per axis: `pass` / `flag` / `fail`, each with the note it
traces to. Never bless a reconstruction that trips a note-sourced failure mode.

### 0. Frame the claim
Establish, before auditing:
- **Target type:** ancestral *sequence* (per-site states) vs ancestral *character/trait* state.
- **Reconstruction type:** *marginal* (one interior node at a time, best = highest-posterior
  character; Yang eq.4) vs *joint* (all interior nodes simultaneously; Yang eq.2). In PAML this
  is model-dependent: one-rate models compute both; gamma models compute marginal only;
  nonhomogeneous models compute joint only. paml-manual
- **What downstream claim rests on it** (a functional/experimental conclusion, a diversification
  test, a hypothesis test). The stringency below scales with this.

### 1. Uncertainty must be reported, not assumed
A single best (even *unique* most-parsimonious) reconstruction is **not** evidence of certainty:
Yang shows unique best reconstructions with posterior only 0.563 (site 2) and 0.185 (site 117).
The posterior probability *is* the accuracy measure. yang-1995-ancestral
- **flag** any reconstruction reported as a definite sequence/state without per-site or per-node
  posterior probabilities. In PAML terms, `verbose=1` yields the full marginal posterior
  distribution; best-character-only is `verbose=0`. paml-manual
- Treat ASR output as an **ensemble** of plausible sequences with the MAP as one point estimate,
  not the answer. hochberg-thornton-2017-resurrection
- **Threshold discipline:** do NOT accept "posterior >= 0.95 = reliable" as a sourced rule. Yang
  prescribes NO posterior cutoff; the 0.05-0.95 band is a *table-display* filter, not a
  reliability threshold. Any such cutoff is downstream convention — label it, don't cite Yang.
  yang-1995-ancestral Likewise no cutoff defines an "ambiguous" site.
  hochberg-thornton-2017-resurrection

### 2. Deep / long-branch nodes are systematically less reliable
Nodes attached to extant taxa by long branches, or deep in the tree, carry the highest error
(Yang: node 10 up to 8.7% per-sequence error; cytochrome-b per-node accuracy floor 0.870).
- **flag** confident claims resting on deep/long-branch interior nodes. Joint accuracy of all
  nodes cannot exceed the marginal accuracy of the *least* reliable single node. yang-1995-ancestral

### 3. Model adequacy at depth — compositional LBA (planted-flaw axis)
If deep-node reconstruction runs under a **site-homogeneous** model (single equilibrium-frequency
vector across sites, e.g. `LG+F+G4`, WAG/JTT-style), it underestimates convergent substitutions
at compositionally constrained (low-Keff) sites and is prone to long-branch attraction —
simulation fails to recover the true topology at **p>=0.8**. szantho-2023-compositional-lba
- **fail** a deep-node reconstruction that asserts topology/ancestral states from a
  site-homogeneous model with no compositional-adequacy check.
- Diagnostic to demand: the *compositional constraint analysis* — bin sites by Keff (= 1/sum(pi_i^2))
  and sum per-site dlogL (log L_B - log L_A) across bins; conflicting signal across Keff bins
  signals model-driven LBA. Remedy: CAT-PMSF (IQ-TREE2 `LG+F+G4` guide -> PhyloBayes CAT posterior
  mean site frequencies -> IQ-TREE2 PMSF). szantho-2023-compositional-lba
- Posteriors themselves are unreliable if branch lengths (theta) or the model are wrong — check
  branch-length estimates and model fit. yang-1995-ancestral

### 4. Indel / gap handling
If the claim involves indels or gapped regions:
- Gaps excluded or coded as a single missing state discard the indel *process*. GRASP models
  indels as a first-class inferred history (POG / bi-directional-edge encoding), separate from
  character-state inference. foley-2022-grasp
- **flag** any single linearized ancestor presented as unique when indel histories are ambiguous
  (equally-parsimonious histories, or an edge preferred forward but not reverse); report edge
  support (proportion of extant sequences carrying the edge). foley-2022-grasp
- **Threshold discipline:** GRASP states NO numeric indel-posterior or substitution-posterior
  cutoff ("high Shannon entropy", "relatively high posterior" are qualitative). A ">=0.8
  indel-posterior" rule is tool/workflow convention, NOT Foley et al. — label, don't cite.
  foley-2022-grasp

### 5. Downstream reuse of reconstructed sequences (circularity)
Reusing reconstructed ancestral sequences **as if they were observed data** for a further analysis
is a named misuse with systematic-bias risk; prefer full-likelihood methods that integrate over
ancestral states. paml-manual
- **fail** analyses that plug point ancestral reconstructions back in as fixed data and then test
  a hypothesis on them without propagating reconstruction uncertainty.

### 6. Trait-dependent diversification claims (SSE / BiSSE)
If a reconstructed character state is claimed to drive speciation/extinction:
- **fail** a BiSSE/SSE significance claim that lacks a tree-specific null. Neutral characters
  produce grossly inflated false positives on real trees (>77% at p<0.05, 58% at p<0.001 on the
  cetacean tree; 61.5% pooled across 186 vertebrate subtrees), while a pure-birth control gives
  exactly 5%. The required check: simulate neutral traits on THIS phylogeny and recalibrate the
  significance threshold from that null. rabosky-goldberg-2015-bisse
- A negative BAMM/MEDUSA result does NOT clear the dataset (25-55% error persisted on
  no-detected-shift subtrees). rabosky-goldberg-2015-bisse
- A character-independent / hidden-state model (HiSSE) is a candidate null — but this is
  UNVERIFIED here (abstract-only; see the reference's `verification`). Do not present HiSSE as
  "the required null" on this evidence. beaulieu-omeara-2016-hisse

### 7. Hypothesis tests on selection-driven characters
When reconstructed states test an evolutionary hypothesis (especially irreversibility / Dollo's
law): the characters chosen are usually under selection, so homoplasy corrupts ancestral-state
inference more than it corrupts phylogeny inference — a thesis-level caution. cunningham-1999-asr-limitations
- **flag** irreversibility/directional-bias claims built on point ancestral reconstructions.
- [GAP: the specific detector, the parsimony-vs-ML rate-asymmetry bias direction, and the paper's
  recommendations are paywalled (pp.666-674) — cannot supply the concrete decision rule from notes.]

### 8. Calibrate handoff (the gate)
Critique above is model reasoning; it does not self-certify. Where a claim survives Critique but
rests on contested reliability, hand off to a Calibrate deliverable:
- alternate-reconstruction test: build the less-probable-but-plausible reconstructions and check
  the functional conclusion still holds. hochberg-thornton-2017-resurrection
- neutral-trait null simulation on the actual tree for any SSE claim. rabosky-goldberg-2015-bisse
- compositional constraint analysis for any deep-node topology/state claim. szantho-2023-compositional-lba

### Verdict
Emit per-axis `pass|flag|fail` with the citing note, plus one overall verdict. Any note-sourced
failure mode that applies but was not addressed by the analysis -> at least `flag`; §3, §5, §6
map to `fail` when their check is entirely absent. A reconstruction reported as certain (no
posteriors, or point states carried into a hard claim) must never be returned `pass`.

<!--
design-inference: the following are MY synthesis structure, not any single note:
- the axis ordering / the pass|flag|fail verdict schema and the "fail vs flag" cutoffs in §3/§5/§6;
- grouping SSE trait-diversification (Rabosky, Beaulieu) under an ancestral-*character* audit
  alongside sequence reconstruction (the notes never state they belong to one skill);
- treating "reuse reconstructed seqs as data" (PAML) as a double-dipping/leakage analog;
- the §8 Calibrate handoff as the gate obligation (structural, per REFEREE_LOOP, not note-sourced).
Each individual claim/number is note-cited; the composition across notes is the inference.
-->

## Runtime Notes

- Do not read Foundry source files at runtime; use only the files packaged in this bundle and what the user supplies.
- Do not run statistical tooling to reach a verdict this bundle can reach by reading. Where an empirical check is called for, the procedure says so.
- Carry an unresolved assumption into the output as an unresolved assumption. Inventing the missing evidence is the failure this referee exists to catch.
