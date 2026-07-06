# Guidance — snipen-2015-micropan

Citation: Snipen L, Liland KH. 2015. "micropan: an R-package for microbial pan-genomics."
*BMC Bioinformatics* 16:79. DOI 10.1186/s12859-015-0517-0. OA:
https://pmc.ncbi.nlm.nih.gov/articles/PMC4375852/ ; author-written package docs (CRAN):
https://search.r-project.org/CRAN/refmans/micropan/html/heaps.html

License posture: CC BY 2.0 (BMC Bioinformatics) → **verbatim load-bearing quotes permitted**. The
CRAN `heaps()` man page is author-written package documentation; quote its rule wording verbatim as
a functional string. Capture the exact copyright line.

This note exists to close ONE gap: the open-vs-closed pan-genome decision rule on a Heaps-law
exponent (the rule is otherwise locked in the paywalled Tettelin 2008).

Attention-directing questions (ask what the source states; do not pre-load conclusions):

1. How does micropan model pan-genome openness? Quote the exact description of the Heaps-law model
   — what quantity is fitted (new gene clusters? pan-genome size?), against what (number of genomes
   / ordered genomes), and the model's parameters. Name the decay-parameter symbol exactly as
   written (α? gamma?).
2. Does the source print the closed-form Heaps equation (e.g. `new_genes ∝ N^(−α)`)? If yes, quote
   it verbatim with the exact exponent symbol. If it only names the parameter without an equation,
   record that silence explicitly.
3. Quote verbatim the open-vs-closed decision rule as an inequality, with the exact boundary value
   and which side is open. (Expected: "If alpha>1.0 the pan-genome is closed, if alpha<1.0 it is
   open." — verify the wording and boundary.)
4. Quote the worked-example exponent value and what the authors say it indicated (expected α=0.82 →
   open, threshold 1.0). Capture the numeric estimate.
5. Does the source attribute the Heaps approach to another paper? Quote the exact attribution
   sentence and the reference (expected: "as suggested by [28]" = Tettelin et al. 2008). This is
   load-bearing: it fixes provenance so micropan is cited as ITSELF, never laundered into a
   Tettelin-2008 citation.
6. Does the source state any minimum number of genomes needed to estimate α reliably? Does it
   describe genome-ordering permutations (`n.perm`) and a recommended count? Quote exactly; if no
   minimum is stated, record that silence.

Known conflict to record (do NOT smooth): other OA sources write Heaps' law on pan-genome SIZE as
`n = κ·N^γ` (exponent gamma), open if γ > 0 / closed if γ < 0 (boundary 0) — a different symbol and
boundary from micropan's α>1/α<1 (boundary 1.0). Record micropan's convention faithfully and flag
that α and γ are different surface forms (α ≈ 1 − γ); do not merge them.

Must-extract functional strings: the decay-parameter symbol; the open/closed inequality + boundary
verbatim; the worked-example α value; the attribution sentence (`[28]` = Tettelin 2008);
`n.perm` default if stated.
