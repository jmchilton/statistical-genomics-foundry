# Guidance — Qiao, Li, Yin, ... 2019, Genome Biology 20:38 (10.1186/s13059-019-1650-2)
# DupGen_finder. License: CC-BY 4.0 (Genome Biology OA) -> verbatim permitted.
# Supplement with github.com/qiao-xin/DupGen_finder README for exact CLI defaults.

Direct ATTENTION to (a flagged-discrepancy source — capture the TRUTH, not any downstream claim):
1. List the EXACT set of duplication-mode classes DupGen_finder assigns. Confirm whether the
   fifth class is "transposed" and whether "segmental" is or is NOT one of its labels. Quote.
   (A downstream skill says "segmental"; the tool README indicates the classes are WGD/tandem/
   proximal/transposed/dispersed — verify against the paper.)
2. The exact default window/distance parameters: what is `-d` (max distance to call
   proximal, default value?), and is there any separate tandem-gene-count or intervening-gene
   window? Quote each default number. (A downstream skill claims tandem=5, proximal 5-25 —
   verify; the README indicates a single `-d` default of 10.)
3. How does DupGen_finder separate WGD-derived from small-scale (tandem/proximal/transposed/
   dispersed) duplicates using MCScanX collinearity + intervening-gene context? Quote method.
4. Any required inputs (MCScanX collinearity file, gene_count/GFF) and their format.
5. Confirm citation, authors, article number, DOI, CC-BY license.
