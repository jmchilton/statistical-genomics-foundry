---
title: "Reconstructing Ancient Proteins to Understand the Causes of Structure and Function"
type: paper
source_id: hochberg-thornton-2017-resurrection
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC6141191/
doi: 10.1146/annurev-biophys-070816-033631
access_date: "2026-07-03"
license: LicenseRef-all-rights-reserved
attribution: "Hochberg GKA, Thornton JW. Reconstructing Ancient Proteins to Understand the Causes of Structure and Function. Annual Review of Biophysics 46:247-269, 2017. DOI 10.1146/annurev-biophys-070816-033631. Read via NIH Public Access author manuscript on PMC; summarized in own words."
derived: own-words-summary
tags:
  - domain/ancestral-reconstruction
  - domain/molecular-evolution
---

# Hochberg & Thornton 2017 — Reconstructing Ancient Proteins to Understand the Causes of Structure and Function

## 1. Citation
Hochberg GKA, Thornton JW. 2017. "Reconstructing Ancient Proteins to Understand the Causes of
Structure and Function." *Annual Review of Biophysics* 46:247–269.
DOI: 10.1146/annurev-biophys-070816-033631.
Open-access copy read: NIH Public Access **author manuscript** on PubMed Central,
PMC6141191 (https://pmc.ncbi.nlm.nih.gov/articles/PMC6141191/). Access date 2026-07-03.
Pinned to **vol 46 / 2017** (not the newer Annu Rev Biophys ASR/energy-landscapes review).

## 2. Access note
Full text was readable via the free NIHPA author manuscript on PMC (no paywall boundary
encountered for the main text). Reading was of the author-manuscript version; figure captions and
exact page-level typesetting of the published ARR version were not consulted. Underlying work is
Annual Reviews **all-rights-reserved** (an NIH author manuscript on PMC does not carry a Creative
Commons license), so §7 uses **own-words paraphrase** (see §7 heading).

## 3. Thesis (1 sentence)
Reconstructing ancestral proteins and characterizing them experimentally ("vertical" evolutionary
analysis) reveals the causes of modern proteins' structure and function more powerfully than
comparing present-day homologs ("horizontal" analysis), chiefly because it introduces sequence
changes into the historical background in which they actually occurred.

## 4. Problem & context
Structural biology wants to know which sequence features cause which structural/functional
properties. The naive approach — swapping residues or comparing states between extant homologs
(horizontal comparison) — frequently produces nonfunctional or misleading results because the
effect of a residue depends on the rest of the sequence (epistasis / context-dependence), and
because divergent extant homologs differ at very many sites, most of them irrelevant to the
function of interest. Ancestral sequence reconstruction (ASR) is offered as the corrective: infer
the sequences of extinct ancestors on a phylogeny, synthesize and characterize them, and study
change along specific branches.

## 5. Method / approach (what the review describes)
- **Vertical vs. horizontal analysis.** Horizontal analysis compares/swaps between contemporary
  homologs. Vertical analysis reconstructs successive ancestors along a family phylogeny and
  characterizes them, isolating a functional/structural shift to a specific branch and thereby
  shrinking the set of candidate function-changing substitutions.
- **ASR inference mechanics.** Inputs are a multiple sequence alignment, an evolutionary model,
  and a phylogeny; maximum-likelihood or Bayesian methods infer ancestral states. Each site is
  reconstructed individually. The best point estimate at a site is the **maximum a posteriori
  (MAP)** state; the string of MAP states across all sites is the MAP ancestor, colloquially the
  "maximum likelihood (ML) ancestor."
- **Handling uncertainty.** Some sites are reconstructed ambiguously (two or more states with
  non-negligible posterior probability). The review frames ASR output as an **ensemble of plausible
  ancestral sequences** with the MAP sequence as the single best estimate, and recommends
  experimentally characterizing **alternate reconstructions** that are less probable than the ML
  sequence but still statistically plausible, to test the robustness of functional conclusions.
- **Tool named:** automated web servers now exist; **PhyloBot** (Hanson-Smith & Johnson 2016) is
  the example given.

Note: the review is a synthesis, not a step-by-step protocol; it does **not** state exact default
parameters, a specific substitution model to use, or numeric cutoffs.

## 6. Key claims / findings (atomic)
- Horizontal comparison often yields nonfunctional proteins because of **epistasis** — the
  phenotypic effect of a mutation depends on the genetic state at other sites.
- A horizontal swap fails when a state from one homolog is incompatible with the receiving
  homolog's sequence background — either because **permissive** residues needed to tolerate the
  state are absent, or because **restrictive** residues that block it are present.
- Definitions: **permissive** mutations let a protein tolerate substitutions that would otherwise
  be nonfunctional; **restrictive** mutations make a protein unable to tolerate substitutions it
  otherwise would have tolerated.
- Vertical (ancestral) analysis **avoids** epistatic incompatibilities by introducing
  function-changing substitutions into the historical background in which they arose; it thereby
  both overcomes and reveals epistasis.
- Worked example (glucocorticoid/mineralocorticoid receptor family): restrictive substitutions
  sterically clash with the ancestral helix conformation, explaining why swaps between extant
  proteins failed.
- The MAP/ML ancestor is a **point estimate**; ASR is better treated as an ensemble of plausible
  sequences. Some sites are inferred ambiguously.
- **Robustness finding** (attributed to a study of several protein families): the **qualitative**
  functions of reconstructed proteins appear quite robust to sequence uncertainty, though the
  precise **quantitative** parameter values are not always robust. The stated reason: ambiguously
  reconstructed sites/states tend to be **weakly constrained by function**, whereas
  strongly-constrained states are reconstructed with confidence.
- **Critical-stance recommendation:** users should neither uncritically accept the ML
  reconstruction as true nor dismiss a surprising inference as mere statistical/phylogenetic bias;
  sensitivity to sources of uncertainty and bias should be examined experimentally where possible.
- Evolutionary/vertical analysis also explains structural features that are **not** functionally
  optimal (i.e., historical contingency, not optimization, can account for present structure).

## 7. Load-bearing statements — OWN-WORDS PARAPHRASE (restrictive license; functional strings excepted)
- Epistasis is defined as context-dependence: a mutation's phenotypic effect depends on the state
  at other sites. (Section: "Evolutionary Analysis Overcomes and Reveals Epistasis.")
- A horizontal swap produces a nonfunctional protein when a state (or set of states) is
  incompatible with the background it is placed into — because required **permissive** residues are
  absent or blocking **restrictive** residues are present. (Same section.)
- ASR should be understood as supplying an **ensemble of plausible ancestral sequences**, with the
  MAP sequence as the single best estimate — not a single definitive reconstruction. (Section: "The
  Future of Retracing the Past for Structural Biology.")
- Robustness of functional inferences to sequence uncertainty is a particularly important part of
  the process, done by experimentally characterizing alternate reconstructions that are less likely
  than the ML sequence but still statistically plausible. (Same section.)
- Across several protein families, qualitative functions of reconstructed proteins were quite
  robust to reconstruction uncertainty — but not always the precise quantitative parameter values —
  because ambiguous sites are weakly functionally constrained while strongly constrained states are
  reconstructed confidently. (Same section.)
- Functional strings preserved verbatim (facts, not protected expression): **MAP** (maximum a
  posteriori), **ML** (maximum likelihood), **permissive** / **restrictive** (substitution types),
  **PhyloBot** (tool name).

## 8. Stated scope, assumptions, limitations (the source's own caveats)
- ASR gives point estimates with uncertainty; the MAP sequence is one estimate among an ensemble,
  and some sites are genuinely ambiguous.
- Functional conclusions must be checked for robustness against that uncertainty; quantitative
  values in particular may not be robust.
- The authors caution against two opposite errors: over-trusting the ML reconstruction and
  reflexively dismissing surprising results as artifacts.
- The review is a conceptual synthesis of the field's strategy, not a bench protocol; it does not
  supply parameter defaults or decision thresholds.

## 9. Failure modes / invalidity patterns (referee-relevant)
- **Epistatic incompatibility in horizontal swaps** — transplanting a residue/state between extant
  homologs yields a nonfunctional protein when permissive residues are missing or restrictive
  residues are present in the recipient background. Symptom: loss of function after a swap that
  "should" have transferred function. The named remedy is vertical (ancestral) analysis.
- **Over-trusting the single ML/MAP ancestor** — treating the per-site MAP string as the definitive
  ancestor rather than one estimate from an ensemble. Detector/remedy the review names: characterize
  alternate, less-likely-but-plausible reconstructions and check whether the functional conclusion
  holds.
- **Mis-attributing surprises to statistical uncertainty** — dismissing an unexpected ancestral
  property as a reconstruction artifact without testing. Remedy: experimentally probe sensitivity to
  uncertainty/bias.
- **Quantitative fragility** — precise quantitative parameter values of reconstructed proteins may
  not be robust to sequence uncertainty even when qualitative function is; conclusions resting on
  exact numbers are the risky ones. `[summarizer-inferred]` that this is a distinct usage caution
  (the review states the robustness asymmetry but does not spell out the downstream caution).

## 10. What the source does NOT address (confident silences)
- **No numeric posterior-probability cutoff** defining an "ambiguous" site. The review describes
  ambiguity qualitatively ("two or more states with non-negligible posterior probabilities") but
  names no threshold (e.g., no 0.2 / 0.8 rule) and no fixed number of alternate constructs to build.
- **No claim of systematic stability/thermostability bias.** The review does not assert (or rebut)
  that reconstructed ancestors are systematically biased toward greater thermostability or toward
  most-probable/optimal states. It emphasizes robustness of qualitative function, not directional
  bias.
- **No systematic indel/gap reconstruction protocol.** Insertions/deletions come up only in passing
  (e.g., a malate dehydrogenase example); no indel-aware or gap-inference method is prescribed.
- **No explicit statement that the ML ancestor is a non-existent combined sequence.** See §12 Q1 —
  the review treats sites independently and flags per-site ambiguity, but does not spell out that
  independently combining per-site MAP states could produce a state combination that never coexisted.

## 11. Open questions / ambiguities the source leaves unresolved
- Exactly how many alternate reconstructions to test, and at which sites, to declare a conclusion
  "robust" — left to practitioner judgment.
- What posterior-probability level makes a site "ambiguous" — unspecified.
- Whether/when the per-site-independent MAP assembly is itself a hazard (vs. per-site ambiguity) —
  not addressed head-on.

## 12. Guidance answers
**Q1 — Epistasis problem for ASR: is the per-site-independent ML ancestral sequence possibly an
untested/never-existing combination of states, and does the review state this?**
The review supplies the pieces but does **not** make this exact claim. It states that sites are
reconstructed individually, that the ML/MAP ancestor is the string of per-site MAP states, and that
some sites are ambiguous — and it recommends testing alternate reconstructions. But it does **not**
explicitly say that independently combining the highest-probability state at each site can yield a
combined sequence that never coexisted or is untested due to epistasis. The review's epistasis
discussion is aimed at **horizontal swaps between extant homologs** (states incompatible with a
foreign background), not at the internal coherence of the ML ancestor. So: the "single ML sequence
can be a non-existent state combination" framing is **not directly stated by this source** — treat
that specific proposition as not-sourced-here (must be backed elsewhere or flagged as the skill's
own inference).

**Q2 — Operational strategy for reconstruction uncertainty (alternative constructs, testing, report
a range; thresholds; how many constructs; how "ambiguous" is defined):**
The review recommends treating ASR output as an ensemble of plausible sequences (MAP = best
estimate) and **experimentally characterizing alternate reconstructions that are less likely than
the ML sequence but still statistically plausible**, to test robustness of functional inferences.
It does **not** name a posterior-probability cutoff for "ambiguous," does **not** specify how many
alternate constructs to build, and does **not** prescribe reporting a numeric "functional range."
Ambiguity is defined only qualitatively (a site with two or more states at non-negligible posterior
probability). → **Any specific posterior cutoff for "ambiguous" is convention, not sourced here;
flag it.**

**Q3 — Are reconstructed ancestors systematically biased (e.g., toward stability / most-probable
states), and how robust are functional conclusions to statistical uncertainty?**
No systematic stability/thermostability bias is claimed or discussed. On robustness: across several
protein families, **qualitative functions were quite robust** to reconstruction uncertainty, but
**precise quantitative parameter values were not always robust**; the stated reason is that
ambiguous sites are weakly constrained by function while strongly constrained states are
reconstructed with confidence. The authors add a critical-use directive: don't uncritically accept
the ML reconstruction, and don't reflexively dismiss surprises as bias — test sensitivity
experimentally.

**Q4 — Named strategies/tools for epistasis-aware or indel-aware reconstruction the review
endorses:**
The endorsed **epistasis-handling strategy is vertical/ancestral analysis itself** — introducing
substitutions into the historical background in which they occurred, which sidesteps the
incompatibilities seen in horizontal swaps. The only **software tool named** is **PhyloBot**
(automated ASR web server, Hanson-Smith & Johnson 2016). No epistasis-aware model or indel-aware
reconstruction tool/method is specifically endorsed; indels are mentioned only illustratively with
no dedicated protocol. (Common tools such as PAML, FastML, GRASP were **not** found named in the
portion read.)
