# Guidance — Liao 2023 (draft human pangenome / HPRC)

Citation: Liao W-W et al. 2023. "A draft human pangenome reference." *Nature* 617(7960):312–324.
DOI 10.1038/s41586-023-05896-x. PMC10172123 (OA).

License posture: **verify on PMC** — HPRC paper is open access, likely CC BY 4.0 → verbatim
load-bearing quotes permitted. Confirm the license line and state which mode you used.

Questions (direct attention, do not confirm conclusions):

1. How many haplotypes/samples does the draft pangenome contain, and how many variants does it
   resolve? Capture the exact counts verbatim (a claim under test says "90 haplotypes, ~6.4M
   variants" — capture the paper's ACTUAL numbers, whatever they are).
2. Does the paper document a LIMITATION of graph-based genotyping (e.g. PanGenie) in repetitive
   regions (centromeres, segmental duplications)? Quote any such limitation verbatim.
   (Referee-relevant: repeat-region genotyping false positives.)
3. Which graph builders does it use (Minigraph-Cactus, PGGB, others) and does it state they can
   DISAGREE on topology? Capture any statement about builder disagreement.
4. Does it quantify reduction in reference bias from using a pangenome graph vs a linear reference?
   Capture numbers if present.
5. What reference genome(s) anchor the graph (GRCh38, CHM13/T2T)? Capture verbatim.

Must-extract functional strings: haplotype/sample count + variant count; the graph-genotyping
repeat-region limitation verbatim; named graph builders + any disagreement statement; anchoring
reference(s).
