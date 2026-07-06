# Guidance — Hickey 2024 (Minigraph-Cactus)

Citation: Hickey G et al. 2024. "Pangenome graph construction from genome alignments with
Minigraph-Cactus." *Nat Biotechnol* 42(4):663–673. DOI 10.1038/s41587-023-01793-w. Check PMC for
OA full text before summarizing (PMC likely available).

License posture: **verify on the page** — if the PMC/journal copy is CC BY, verbatim quotes
allowed; otherwise own-words + functional strings. State which mode you used.

Questions (direct attention, do not confirm conclusions):

1. Is Minigraph-Cactus REFERENCE-anchored or reference-free? Quote the sentence describing the role
   of the chosen reference in the graph.
2. Does the paper state that variants/paths are represented relative to the reference, and does it
   acknowledge any REFERENCE BIAS or under-representation of non-reference haplotypes? Quote any
   such caveat verbatim. (This is the referee's cardinal sin for eukaryotic graphs — capture the
   paper's OWN words; do not assert bias exists.)
3. What output files does `cactus-pangenome` produce (GFA, VCF, GBZ, HAL)? Capture the exact
   output-type names and the exact flag names that request them (e.g. `--vcf`, `--gfa`, `--gbz`,
   `--reference`, `--outDir`, `--outName`).
4. Is a `--reference` argument required? Quote the requirement.
5. What scale (how many haplotypes/genomes) does the paper demonstrate? Capture numbers (e.g.
   HPRC 90-haplotype).
6. Does it compare against PGGB and state when to prefer each? Capture any head-to-head statement.

Must-extract functional strings: reference-anchored vs reference-free statement; the reference-bias
caveat verbatim (or own-words if restrictive); `cactus-pangenome` output types + flag names;
whether `--reference` is required; demonstrated haplotype count.

Version pin: skill pins the Minigraph-Cactus/cactus version — record the version the paper describes.
