# Scenarios — audit-ancestral-reconstruction-validity

Concrete cases. Each `expect:` is the verdict the eval oracle applies.

## Case: unique-MP-reconstruction-called-certain
fixture: A study reports a single most-parsimonious ancestral residue at a site and builds an
  argument on it, stating no posterior probability. (Analogue: Yang's site 2, unique MP recon
  VVIV, true posterior only 0.563; site 117, 0.185.)
expect: flag — uncertainty not reported; uniqueness is not reliability. Demand per-node posteriors
  (PAML `verbose=1`). Cite [[yang-1995-ancestral]], [[hochberg-thornton-2017-resurrection]].

## Case: deep-node-site-homogeneous-model (planted-invalid)
fixture: Ancestral states / a deep topology inferred under `LG+F+G4` (site-homogeneous) across
  long terminal branches (Microsporidia/Nematoda/Platyhelminthes-type alignment), no compositional
  check, results asserted as confident.
expect: fail — long-branch-attraction risk (site-homogeneous fails at p>=0.8). Require Keff-binned
  dlogL compositional constraint analysis or CAT-PMSF. Cite [[szantho-2023-compositional-lba]].

## Case: BiSSE-significant-neutral-trait (planted-invalid)
fixture: A binary trait is reconstructed and BiSSE reports p=0.02 for trait-dependent speciation on
  an 87-tip tree; no neutral-trait simulation null; authors conclude the trait drives speciation.
expect: fail — significance without an adequate null. Neutral traits give >77% false positives on
  such trees vs 5% pure-birth; require a tree-specific neutral-trait simulation and recalibration.
  Cite [[rabosky-goldberg-2015-bisse]]. (HiSSE null candidate flagged UNVERIFIED,
  [[beaulieu-omeara-2016-hisse]].)

## Case: negative-BAMM-used-as-all-clear
fixture: BAMM finds no strong rate variation, and the authors treat that as licence to trust the
  BiSSE trait-diversification result.
expect: flag — a negative BAMM/MEDUSA result does not clear the dataset (25-55% error persisted).
  Cite [[rabosky-goldberg-2015-bisse]].

## Case: reconstructed-seqs-reused-as-data (planted-invalid)
fixture: A codeml `RateAncestor=1` run's `rst` ancestral sequences are taken as fixed observed
  data and fed into a second selection/rate analysis; reconstruction uncertainty not propagated.
expect: fail — named misuse; prefer full-likelihood methods that integrate over ancestral states.
  Cite [[paml-manual]].

## Case: indel-ancestor-linearized-as-unique
fixture: An ancestral protein with a gapped region is reported as one definitive sequence; the
  indel history was ambiguous (competing equally-parsimonious edges) but only the single call is
  shown; edge support not reported.
expect: flag — ambiguous indel history collapsed to a false-unique ancestor; report edge support
  and alternative POG paths. Cite [[foley-2022-grasp]].

## Case: invented-0.95-cutoff-attributed-to-Yang (planted-invalid, threshold)
fixture: A methods section says "sites with posterior >= 0.95 were considered reliable (Yang et al.
  1995)."
expect: flag — misattribution. Yang prescribes NO 0.95 cutoff; 0.05-0.95 is a table-display band.
  The cutoff may be used as convention but must not be cited to Yang. Cite [[yang-1995-ancestral]].

## Case: MAP-ancestor-single-construct-functional-claim
fixture: A resurrection study synthesizes only the single MAP ancestor and draws a strong
  quantitative functional conclusion, testing no alternate reconstructions.
expect: flag — ASR is an ensemble; characterize plausible alternates to test robustness
  (qualitative function may be robust, quantitative values often not). Cite
  [[hochberg-thornton-2017-resurrection]].

## Case: irreversibility-hypothesis-on-selected-character
fixture: Point ancestral reconstructions of a selection-driven life-history character are used to
  claim irreversible loss (Dollo's law), with no homoplasy accounting.
expect: flag — selection-driven characters make homoplasy worse for ASR than for phylogeny;
  irreversibility is the hardest case. Cite [[cunningham-1999-asr-limitations]].
  [GAP: paper's concrete detector/decision-rule is paywalled — cannot bind a specific expected
  numeric check here.]

## Case: well-reported-marginal-reconstruction (negative control / should pass)
fixture: A marginal reconstruction reports per-node posteriors, notes long-branch nodes as least
  reliable, uses a compositional-heterogeneity-aware model at depth, and restricts strong claims to
  high-posterior nodes.
expect: pass — uncertainty reported, deep-node caveat present, model adequate. Cite
  [[yang-1995-ancestral]], [[szantho-2023-compositional-lba]].
