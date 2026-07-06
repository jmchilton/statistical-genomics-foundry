# Guidance — Chen, Zwaenepoel & Van de Peer 2024, Bioinformatics 40(5):btae272 (wgd v2)
# License: CC-BY 4.0 → verbatim load-bearing quotes + exact numbers permitted.
# Author-written; faithfully mirrors the method. Supplement with github.com/heche-psb/wgd
# manual for CLI flags (version-pin: note wgd v2 CLI evolves).

Direct ATTENTION to:
1. The exact pipeline ordering: paranome (wgd dmd) -> Ks (wgd ksd) -> synteny anchors
   (wgd syn) -> mixture (wgd mix) -> viz. Quote what each subcommand does.
2. COLLINEARITY ENGINE: does wgd v2 use i-ADHoRe or MCScanX for `wgd syn`? Quote it exactly
   (a downstream skill claims MCScanX — verify; this is a flagged discrepancy).
3. Ks-distribution construction: aligner (MAFFT --auto?), Ks estimator (codeml vs yn00?),
   tree method (FastTree/IQ-TREE), and node-weighting vs node-averaging for redundancy
   removal. Quote the default for each.
4. Mixture modelling: GMM (log-scale) and ELMM — what does it fit, how are components
   selected (BIC?), and what is the default/max number of components? Quote numbers.
5. Every default parameter with its value: bins + top-% per bin for bit-score normalization,
   MCL inflation, HMMER E-value, minimum segment length (kb), min CDS length, anchor-pair
   min block size. Capture each verbatim.
6. Any stated saturation caveat / recommended Ks cutoff for reliable inference.
7. Confirm citation + that v1 (arzwa/wgd) is the deprecated predecessor.
