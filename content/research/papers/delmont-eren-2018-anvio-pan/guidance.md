# Guidance — Delmont & Eren 2018 (anvi'o pangenomics / metapangenome)

Citation: Delmont TO, Eren AM. 2018. "Linking pangenomes and metagenomes: the *Prochlorococcus*
metapangenome." *PeerJ* 6:e4320. DOI 10.7717/peerj.4320. https://peerj.com/articles/4320/.

License posture: CC BY 4.0 → **verbatim load-bearing quotes permitted**.

Questions (direct attention, do not confirm conclusions):

1. What does the anvi'o pangenomics workflow compute (gene clusters, functional enrichment, ANI)?
   Capture the pipeline steps and the exact program names (e.g. `anvi-pan-genome`,
   `anvi-compute-genome-similarity`).
2. What clustering algorithm and default parameters does anvi'o use for gene clusters (MCL
   inflation, minbit)? Capture defaults verbatim + flag names.
3. Does the paper define "metapangenome"? Quote the definition.
4. Does it state how many genomes are used and any minimum for a meaningful pangenome? Capture if
   present.

Must-extract functional strings: `anvi-pan-genome` + related program names; MCL inflation / minbit
defaults + flag names; the "metapangenome" definition.

Note for ingest: a skill under probe mis-cites the anvi'o pangenomics method as "Eren 2021 Nat
Microbiol 6:3" (that is the anvi'o *platform* paper). Record that THIS PeerJ 2018 paper is the
pangenomics-workflow origin — but only from what the paper itself states; do not import the skill's framing.
