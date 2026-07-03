# Guidance — foley-2022-grasp (paper)

> Attention-directing. The primary for indel-aware sequence ASR (partial-order-graph), the protein-
> resurrection construct-design workflow, and the GRASP indel-posterior ≥0.8 threshold. CC BY —
> short verbatim load-bearing quotes ARE allowed (with location + attribution).

## Must capture
- The partial-order-graph (POG) approach: how GRASP models indels/gaps PROBABILISTICALLY as a
  separate process, unlike ML codon/AA methods (e.g. PAML) that treat gaps as missing data. Capture
  the mechanism and why it matters for resurrection.
- Outputs: ancestral sequences at internal nodes, per-site/per-state posteriors, indel posteriors
  per gap-block. Capture exact output artifact names/format if stated (functional strings).
- Any recommended thresholds: does the paper state an indel-posterior cutoff (skill uses ≥0.8) or a
  substitution-posterior cutoff for building alternative constructs? Capture the paper's actual
  numbers; if a cutoff is the tool's convention not the paper's, flag it.
- The construct-design / library strategy: how ambiguous substitutions and indels become alternative
  constructs. Capture the operational protocol.
- Scale claim (families >10,000 members) and CLI invocation / arguments if given.

## Must-quote (PLoS Comput Biol = CC BY → short verbatim allowed, with figure/section location)
- The statement of what POG/indel-aware reconstruction does that missing-data ML methods cannot.
- Any stated indel-posterior threshold.

## Access / version notes
- PLoS Comput Biol 18(10):e1010633, 2022; DOI 10.1371/journal.pcbi.1010633. Fully OA. GRASP tool at
  github.com/bodenlab/GRASP; pin the tool version if you cite CLI flags (skill pins "GRASP 2024+").
