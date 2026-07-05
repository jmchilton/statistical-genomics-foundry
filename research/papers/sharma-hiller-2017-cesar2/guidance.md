# Guidance — Sharma, Schwede & Hiller 2017, CESAR 2.0 (Bioinformatics 33(24):3985)

Source: "CESAR 2.0 substantially improves speed and accuracy of comparative gene
annotation." Bioinformatics 33(24):3985–3987. doi:10.1093/bioinformatics/btx527. PMID
28961744. NOTE ALL THREE AUTHORS (Sharma, Schwede, Hiller). Do NOT confuse with the same
authors' 2017 NAR 45(14):8369 alignment-sensitivity paper — different paper. (The bioSkills
skill mislabels the NAR 45:8369 coordinates as "CESAR 2.0"; the real CESAR 2.0 is THIS
Bioinformatics paper.)

## Direct the summarizer's attention to:
- What CESAR 2.0 is and does: capture that it is an HMM-based, codon-aware / coding-exon-
  structure-aware realigner that projects exons from a reference to aligned query genomes
  while preserving reading frame across indels and correctly placing splice sites.
- The "gene mode" — does 2.0 align all exons of a gene jointly vs one-at-a-time? Quote.
- Any stated accuracy/speed figures vs CESAR 1.0 (the abstract mentions ~77x faster, ~31x
  less memory — capture exact numbers). Capture what "improved splice-site alignment over
  larger shifts" means concretely.
- Divergence calibration. Does the paper state any divergence range (Myr or % identity)
  over which CESAR projection is reliable, or where exon boundaries start failing? The skill
  claims "~150 Myr (vertebrate)" and attributes it here — QUOTE the number if present, or
  state explicitly that the paper gives no such figure (likely: it does not — flag as
  convention if absent).
- Relationship to TOGA: note that CESAR is used internally by TOGA for the coding projection
  step (may not be in this paper; flag if inferred).

## Must-capture verbatim:
- CLI invocation form / key parameters if the paper shows them.
- Any explicit numeric divergence or identity thresholds.
