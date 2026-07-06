# Guidance — Armstrong et al. 2020, Progressive Cactus (Nature 587:246)

Source: "Progressive Cactus is a multiple-genome aligner for the thousand-genome era."
Nature 587(7833):246–251. doi:10.1038/s41586-020-2871-y. Nature paywalled; OA copy at
eScholarship (escholarship.umassmed.edu/faculty_pubs/1905) and UCSC Genomics Institute.

**This note now serves TWO skills.** PRESERVE all existing annotation-projection coverage
below AND add the whole-genome-alignment method internals in the second block. The result
should be a SUPERSET note — do not drop anything the first pass captured.

## Direct the summarizer's attention to (annotation-projection — keep):
- Reference-free multiple alignment: capture that Progressive Cactus aligns tens–thousands
  of large vertebrate genomes WITHOUT a single reference (relevant to the skill's
  "reference-choice bias" validity point — Cactus itself is reference-free).
- Output = HAL. Capture that the alignment is stored as HAL and that downstream tools
  (halSynteny, hal2maf) extract per-pair syntenic blocks / chains — the exact upstream
  step TOGA depends on. Capture the tool names in the HAL toolkit used for chain extraction.
- Scale figures: capture the largest alignment reported (600+ amniotes; 242 placental
  mammals + 363 birds — verify exact numbers) as evidence for clade-scale projection.
- Any statement on alignment quality vs assembly fragmentation (feeds the "fragmented
  assembly → false loss" validity chain).

## Additional attention (whole-genome-alignment skill re-summarize):
- The Cactus alignment PIPELINE internals: does the paper describe the LASTZ-pairwise → CAF
  (Cactus Alignment Filter) graph → BAR → ancestral-assembly-per-node ordering? Quote or
  name each stage as the paper names it. (Algorithm detail may point to Paten 2011 — if the
  paper defers CAF/BAR to a prior ref, record that it does and to which citation.)
- Scaling: does the paper state alignment cost is ~linear given a balanced guide tree and
  blows up without one? Give the exact wording / any complexity statement (O(N) vs O(N^2)).
- Masking: does the paper state input genomes must be repeat-masked before alignment, and why
  (TE-driven blocks / memory)? Quote the requirement. Does it give ANY numeric masking target
  (e.g. % of TE families)? If it gives no number, say so explicitly.
- Memory / compute: capture EXACT figures the paper reports (core-hours, instance-hours). Does
  it ever state per-genome RAM (e.g. 8–32 GB)? If that specific per-genome RAM range is NOT in
  the paper, state its ABSENCE explicitly (the skill attributes 8–32 GB to this paper).
- branchScale: does the word "branchScale" (or branch-length scaling for chaining params)
  appear? If per-clade numeric values (vertebrate 1.0 / plant / bacteria) are NOT given, say so.

## Must-capture verbatim:
- The HAL-toolkit command names for syntenic-block / chain extraction (halSynteny etc.).
- Exact genome counts.
- CAF / BAR stage names as printed; any complexity/scaling sentence; any masking-requirement
  sentence; exact compute figures. Record confirmed ABSENCES for per-genome RAM and branchScale
  numbers.
