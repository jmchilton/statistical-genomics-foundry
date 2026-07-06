# Guidance — Hickey et al. 2013, HAL toolkit (Bioinformatics 29:1341)

License: OUP all-rights-reserved → own-words; keep format/version/tool names verbatim.

## Direct the summarizer's attention to:
- HAL format definition: what is Hierarchical Alignment Format; is it explicitly VERSIONED?
  Quote any statement about format versioning / forward-backward compatibility. (Backs the
  HAL-version-breakage validity axis.)
- halLiftover: capture what it does (project coordinates/annotations between genomes) and its
  I/O. halBranchMutations: what events (substitutions/indels per branch) does it report?
- halSynteny: is it defined in THIS paper? (Armstrong 2020 does NOT name it — resolve which
  source defines halSynteny.) If present, capture; if absent, record.
- Any storage/size or per-column efficiency claim.

## Must-capture verbatim:
- The versioning statement; halLiftover and halBranchMutations definitions; presence/absence of
  halSynteny. Tool names exactly as printed.

## Version-pinning: HAL toolkit 2.3+ (skill); note the format-version the paper describes.
