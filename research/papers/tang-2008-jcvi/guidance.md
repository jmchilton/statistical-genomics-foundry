# Guidance — Tang 2008 (MCScan / Genome Research 18:1944)

1. Does the paper describe the MCScan algorithm — chaining BLAST hits into synteny blocks? Quote
   the scoring / gap model and the block-significance criterion (E-value, min #anchors).
2. Does a "cscore" / C-score / reciprocal-best-hit stringency control appear ANYWHERE in the paper?
   If yes, quote its definition and any default value. If NO, record ABSENT explicitly — this
   settles whether the skill's `--cscore 0.7/0.95/0.99` is Tang-2008-cited or JCVI-software-only.
3. Does it describe the multiply-aligned-gene-maps / quota approach to ancient WGD (hexaploidy)?
   Quote how many-to-many syntenic depth is bounded.
4. Does it produce dotplots / karyotype-style visualization, or is that the later JCVI Python port?
5. What anchor / e-value defaults, if any, are stated?

Must-extract functional strings: cscore definition + default IF present (else "ABSENT"); MCScan
block criteria; any `--tandem_Nmax`-like parameter (likely software-only, record if absent).

NOTE for summarizer: this is the GR 18:1944 "ancient hexaploidy / multiply-aligned gene maps"
paper — the ORIGINAL MCScan, NOT the Science 320:486 synteny paper and NOT the later Python JCVI.
Do not import cscore/--tandem_Nmax from JCVI docs; report only what THIS paper states.

Version pin: original MCScan (2008). License: Genome Research — freely readable, CSHL copyright →
own-words note; functional strings (param names, numbers) verbatim.
