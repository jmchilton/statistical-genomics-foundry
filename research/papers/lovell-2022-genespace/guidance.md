# Guidance — Lovell 2022 (GENESPACE)

1. Does the paper state the MINIMUM syntenic block size (in orthogroups or genes)? Is the default
   5? Name the parameter (blkSize / nGenes / synBuff) and quote its default value. If not stated,
   record ABSENT (→ the skill's "Lovell 2022 default: 5" would be over-claimed).
2. Describe the pipeline: OrthoFinder → synteny (MCScanX-style) → orthogroup-CONSTRAINED anchors →
   riparian. How is a "syntenic hit" / syntelog / anchor defined? Quote the anchor definition.
3. Which OrthoFinder VERSION does GENESPACE bundle or require? Does the paper pin one (e.g. 2.5.x)?
   Quote it — this backs the version-mismatch failure mode.
4. What INPUT format? (GFF3 gene features + peptide FASTA; bed conversion.) Quote.
5. What does the riparian plot show and how is it reference-anchored? What are the pan-gene /
   pangenes outputs (`syntenicHits.txt`, `pangenes.txt`)?
6. Does the paper state plant-specific ASSUMPTIONS or limits (scaling >30 genomes, non-plant clades)?
   Quote any stated boundary.
7. R function names and their key args: `init_genespace`, `run_genespace`, `plot_riparian`.

Must-extract functional strings: min-block orthogroup count + parameter name; pinned OrthoFinder
version; output filenames; the three R function names.

Version pin: skill pins GENESPACE 1.4.0+, R 4.4+. License: eLife CC BY — verbatim quotes permitted.
