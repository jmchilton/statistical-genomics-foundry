# Guidance — Song et al. 2022, AnchorWave (PNAS 119:e2113075119)

License: PNAS — VERIFY the article's license line (some PNAS 2022 are CC BY; if CC BY, short
quotes ok; else own-words). Keep parameter names / numbers verbatim as functional strings.

## Direct the summarizer's attention to:
- WGD/ploidy handling: how does proali use the --ploidy parameter? Quote the statement that each
  query CDS/anchor is matched to ploidy-many reference regions. (This is the UNIQUE validity axis
  — WGD mis-set → under/over-matching; no other WGA source covers it.)
- Anchor identity: does the paper state a minimum anchor identity (skill claims 80% default)?
  Give the source's number or record absence.
- CDS/exon-anchor method: capture that anchors come from coding sequence and the wavefront
  (WFA) extension; note the stated limitation on intergenic resolution.
- Failure mode: what does wrong ploidy produce? Quote if stated.

## Must-capture verbatim:
- The --ploidy semantics statement; any anchor-identity default; the CDS-anchored limitation.

## Version-pinning: AnchorWave 1.2.5+ (skill).
