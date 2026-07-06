# Guidance — Li 2018, minimap2 (Bioinformatics 34:3094; arXiv:1708.01492)

License: OUP published version all-rights-reserved → own-words paraphrase; keep functional
strings (preset names, -k/-w values, divergence %, identity %) verbatim as facts. If the arXiv
preprint (1708.01492) is used, note which version; prefer the published presets.

## Direct the summarizer's attention to:
- The asm5 / asm10 / asm20 presets: what sequence divergence does EACH preset target? Give the
  exact number the paper or the referenced manual states for asm5, asm10, asm20 (the skill
  claims 5% / 10% / 20% — quote or give the source's number, do not confirm the skill).
- Does the paper (or its cited man page) state an identity/divergence FLOOR below which minimizer
  seeding loses sensitivity? Quote any statement about accuracy/recall degrading at low identity.
  (The skill claims accuracy drops below ~70% identity — find the source's actual statement or
  record its absence.)
- The -k (k-mer) and -w (window/minimizer) default values for the asm presets; any -x preset
  parameter table. Capture verbatim.
- Any statement that presets are validated only up to a stated divergence ceiling.

## Must-capture verbatim:
- Preset → divergence mapping (asm5/10/20). Default -k / -w per preset. Any low-identity
  sensitivity/recall statement. Record which are from the paper vs. the man page.

## Version-pinning: note minimap2 version the preset table applies to (skill pins 2.28+).
