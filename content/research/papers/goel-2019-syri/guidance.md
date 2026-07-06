# Guidance — Goel 2019 (SyRI)

1. What INPUT does SyRI consume — whole-genome alignment coords from which aligner(s)? Does it
   require nucmer `--maxmatch` or a minimap2 BAM? Quote the input requirement and the `-c/-r/-q/-F`
   flags (confirm `-F B` = BAM input).
2. List the STRUCTURAL-VARIANT categories SyRI annotates, with exact abbreviations verbatim
   (e.g. SYN, INV, TRANS, INVTR, DUP, INVDP, INS, DEL, HDR, CPG/CPL, NOTAL). Reproduce the full set.
3. Describe the "syntenic path" algorithm: how does SyRI pick the longest syntenic path and then
   classify everything off-path as rearrangement? Quote the key steps.
4. Does the paper state ANY MINIMUM SIZE for calling an inversion / translocation / duplication
   (>=5 kb? >=1 kb?)? Quote it if present; if absent, record ABSENT (→ the skill's >=5kb is convention).
5. Does SyRI require chromosome-level assemblies, equal chromosome counts, matching IDs? What
   happens on fragmented / contig-level input? Quote the stated requirement + any contig mode.
6. Does the paper discuss FALSE-POSITIVE inversions from strand/assembly artifacts or small-scale
   local variation? Quote any caveat on inversion over-calling.
7. What are the output files and formats (`syri.out`, `syri.vcf`, summary)? Column semantics?

Must-extract functional strings: full SV-type abbreviation set; required aligner + `--maxmatch`;
`-c -r -q -F --prefix -k` flags; any numeric size thresholds; output filenames.

Version pin: skill pins SyRI 1.7.1+. License: Genome Biology CC BY — verbatim quotes permitted.
