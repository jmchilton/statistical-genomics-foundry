# Guidance — Brenes et al. 2019, Multibatch TMT (Mol Cell Proteomics)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> Why this note: the corpus has **ZERO** support for the reference/bridge-channel design (0 hits for
> "reference sample", "TMT", "bridge"). We need to know whether this is an authored, evidenced design
> rule or community habit — and this source is the candidate primary. **Report what it says either way.**

> **License posture: license-aware (CC-BY → verbatim-ok).** Channel names (126C, 127N), CV values,
> missing-value percentages and fold-changes are functional strings and stay verbatim.

## Must capture (the design rule)
- Does the source recommend including a common reference / internal-standard sample in every batch?
  **Quote the recommendation verbatim**, including any statement about WHICH channel it should occupy
  and WHY that channel.
- **What word does the source actually use for this sample?** Record its exact terminology — do **not**
  substitute a synonym such as "bridge" if the source does not use it. (We suspect "bridge" is
  community shorthand, not this paper's word. If so, that is a finding: the design is citable, the term
  is not.)
- What is the reference sample FOR — what operation does it enable across batches? Quote.
- Any recommendation about how the biological conditions themselves should be laid out across the
  channels of a batch? Quote.

## Must capture (the evidence — numbers, not adjectives)
- The actual experiment: how many batches, what plex, what samples, what instrument.
- Missing values: the reported percentage at protein AND peptide level, for 1 batch vs 2 vs more.
  Give every number stated.
- Precision: within-batch CV vs across-batch CV for technical replicates, and the CV **after**
  reference-channel normalization. All three numbers.
- The false-positive demonstration: what internal ground truth did they exploit, and what fraction came
  out wrong? **This is a candidate known-truth fixture — capture it precisely enough to reimplement.**
- Reporter-ion interference: what it is, primary vs secondary, and the quantified effect of each.

## Must capture (limits / silences)
- Does the source claim the reference-channel approach **fixes** the problem, or only **reduces** it?
  Quote the exact hedge.
- Is there a stated failure mode of the reference-channel design itself (reference not representative,
  a channel lost, drift across many batches)? Quote or record the silence.
- Does the source say anything about analyzing the normalized data downstream — e.g. whether
  reference-normalized values may be fed into a hypothesis test **without further batch modelling**?
  **This is the anti-subtraction question in proteomics dress.** Quote whatever is there, in either
  direction, or record the silence explicitly.
- Does anything here generalize beyond TMT/isobaric labeling? Record what the source **claims**, not
  what seems plausible.

## Pin
- Journal, volume, pages, DOI, publication date, license statement verbatim, PRIDE accession, access date.
