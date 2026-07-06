# Scenarios — audit-pangenome-claim (concrete cases)

Richest as planted-invalid fixtures. Each binds a fixture to the expected referee verdict; the
eval.md oracle ("the planted sin must be caught, never passed") applies to each.

## Case: accessory inflates with sample size, no error correction
- fixture: "We ran Roary on 900 draft *M. tuberculosis* assemblies (many fragmented, some
  contaminated) and report an accessory genome of ~3,400 genes; adding more isolates keeps raising
  the accessory count."
- expect: flagged: annotation-heterogeneity / fragmentation artifact (Gate B1) — accessory
  inflation that grows with N over fragmented+contaminated assemblies with no population-wide
  correction; remedy: graph-context correction (e.g. Panaroo). Not accepted as biological.

## Case: identical-assemblies, two tools, tenfold-different accessory
- fixture: "Panaroo reports ~380 accessory genes and Roary reports ~3,400 on the very same 413
  *M. tuberculosis* assemblies; we quote the larger number as the species accessory genome."
- expect: flagged: annotation-inflation / inter-tool gap (Gate B1) — a near-tenfold tool-to-tool
  gap on identical input signals annotation-error inflation, not biology.

## Case: pan-genome total stated as a fixed species number
- fixture: "From 8 *S. agalactiae* genomes we conclude the species has 2,700 genes total."
- expect: flagged: sampling dependence (Gate B2) — for an open pan-genome the total keeps growing;
  8 genomes were declared insufficient. Report as a lower bound at current sampling, with
  open/closed status.

## Case: cross-threshold core comparison
- fixture: "Study A's core (Tettelin, 100% presence) is 1,806 genes; Study B's core (Roary, >=99%)
  is larger, so the species core grew."
- expect: flagged: threshold mismatch (Gate B3) — 100% vs >=99% are different definitions; not a
  like-for-like comparison.

## Case: shell/cloud bands attributed to Roary
- fixture: "Following Roary's definitions, soft-core = 95–99%, shell = 15–95%, cloud = <15%."
- expect: flagged: mis-attribution (Gate B3) — Roary defines only core = >=99%; it defines no
  soft-core/shell/cloud %-bands. (Tettelin 2005 defines only core vs dispensable.)

## Case: open verdict from few genomes with an invented inequality
- fixture: "With 6 genomes and a power-law fit we declare the pan-genome closed because the
  exponent is below 1."
- expect: flagged: openness under-powered/untested (Gate B4); AND the referee must NOT endorse the
  specific "exponent < 1" boundary — the exact open/closed inequality and minimum-genome count are
  an unrecovered GAP (paywalled Tettelin 2008), so the rule cannot be certified from the notes.

## Case: PPanGGOLiN called an HMM with fixed bands
- fixture: "PPanGGOLiN uses a hidden Markov model to bin genes into shell = 5–95% of genomes."
- expect: flagged: method mischaracterized (Gate B5) — PPanGGOLiN is a Bernoulli Mixture Model fit
  by EM coupled to a hidden Markov Random Field over the pangenome graph, K chosen by ICL; it does
  NOT use fixed %-bands.

## Case: environmental core equated with pangenome core
- fixture: "Gene X is pangenome-accessory, so it is a non-core, low-fitness gene environmentally."
- expect: flagged: ECG/EAG vs pangenome core/accessory conflated (Gate B5) — the two label systems
  are independent and can invert; a pangenome-accessory gene can be environmental-core.

## Case: isolate pangenome tool run on metagenomes
- fixture: "We built a Panaroo pangenome directly from 200 metagenomic samples."
- expect: flagged: out-of-scope input (Gate B6) — Panaroo is explicitly not recommended for
  metagenomic datasets; the count is not a same-species isolate pangenome.

## Case: Minigraph-Cactus graph called reference-free
- fixture: "Our Minigraph-Cactus human pangenome graph is reference-free, so its VCF calls carry
  no reference bias."
- expect: flagged: reference bias unacknowledged (Gate E1) — MC requires a reference backbone,
  clips unaligned regions to the reference allele, and exports reference-relative VCF; it reduces
  but does not eliminate reference bias. (Progressive Cactus, by contrast, is reference-free.)

## Case: high-confidence SV genotype inside a segmental duplication
- fixture: "From the graph we call this VNTR/segmental-duplication SV genotype at 99.6% precision,
  same as genome-wide."
- expect: flagged: over-claim outside the reliable region (Gate E2) — variant calling is lower in
  the ~3.87% highly repetitive autosome and lower for SVs; genome-wide accuracy applies to the easy
  ~75% unique regions, not here.

## Case: builder-dependent topology stated as fact
- fixture: "This segmental duplication is a single-copy locus in the pangenome graph."
- expect: flagged: builder-dependent topology (Gate E3) — PGGB collapses such loci into a
  single-copy loop while Minigraph/MC keep copies separate; the claim needs the builder named.

## Case: absence inferred in a clipped region
- fixture: "This 40 kb sequence is absent from sample S because it is missing from the default
  Minigraph-Cactus graph."
- expect: flagged: clipping-not-biology (Gate E4) — the default graph clips >=10 kb stretches that
  don't align to the minigraph SV graph (threshold stated as arbitrary) and drops sub-threshold
  contigs; absence there may be a designed clip.

## Case: deep cross-clade alignment treated as fully accurate
- fixture: "Our mammal-wide Cactus alignment is as accurate as a primate-only one, so ancestral
  gene presence is reliable across all branches."
- expect: flagged: accuracy overstated for divergence (Gate E6) — simulated F1 falls from 0.989
  (primate) to 0.795 (mammal); ancestral coding-base coverage is incomplete.

## Case: threshold and reference both unstated (control for incompleteness)
- fixture: "Species Y has a core of 2,000 genes and an open pangenome." (No presence threshold,
  no genome count, no tool/reference given.)
- expect: incomplete: provenance missing (Gate 0) — the referee cannot judge without the core
  threshold and genome count; it must not invent them.

## Case: valid, well-scoped claim (negative control — should pass)
- fixture: "On 328 same-species *K. pneumoniae* isolates, Panaroo (sensitive mode) reports a
  99%-presence core of 3,376 genes; we report it as a lower-bound core at this sampling, threshold
  and tool stated, over-splitting corrected via graph context."
- expect: pass — definitions, scope, threshold, and correction are all stated and consistent; no
  gate trips.
