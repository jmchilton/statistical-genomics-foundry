# Minigraph-Cactus pangenome graph construction (Hickey et al. 2024)

## 1. Citation
Hickey G, Monlong J, Ebler J, Novak AM, Eizenga JM, Gao Y, Human Pangenome Reference
Consortium, Marschall T, Li H, Paten B. 2024. "Pangenome graph construction from genome
alignments with Minigraph-Cactus." *Nature Biotechnology* 42(4):663–673.
DOI 10.1038/s41587-023-01793-w. Published in final edited form 2023 May 10.
Access copy: PMC10638906 (NIHPA author manuscript, available in PMC 2024 Apr 17),
https://pmc.ncbi.nlm.nih.gov/articles/PMC10638906/ . Accessed 2026-07-05.

## 2. Access note
Read the **full PMC NIHPA author-manuscript** text (main text + Methods) via the PMC HTML.
Supplementary figures/tables (Supplementary Figs. 1–20, Supplementary Tables 1–5) are
referenced but NOT included in this copy — any claim resting on them is marked below.
The PMC copy is the accepted author manuscript, not the typeset Nature version.

## License mode used: OWN-WORDS + functional strings verbatim (RESTRICTIVE)
The PMC record is an **NIHPA author manuscript** ("Nat Biotechnol. Author manuscript; available
in PMC: 2024 Apr 17"), carrying "Reprints and permissions information is available at
www.nature.com/reprints" and a PMC copyright notice — i.e. **all-rights-reserved, NOT Creative
Commons**. Per the summarize-source contract, §7 and all load-bearing statements are rendered in
own words. Exempt (reproduced verbatim as facts): tool/command/format names, numeric
thresholds/defaults, versions, URLs, commit hashes, and short functional phrases.

## 3. Thesis
Minigraph-Cactus builds base-level pangenome graphs directly from whole-genome assembly
alignments (not from variant calls), representing all variant scales in one model, and scales
to 90 human haplotypes from the HPRC.

## 4. Problem & context
Reference coordinate systems introduce bias (unmappable reads in diverse samples; variant calls
skewed toward the reference allele). Prior pangenome-graph construction faced a tradeoff: graphs
built from reference-based variant calls (vg) could not represent nested variation and still
carried some reference bias; graphs built by minigraph alone captured only SVs (≥50 bp) and were
not usable for short-read mapping with then-current tools. Building directly from high-quality
phased assemblies is equivalent to whole-genome multiple alignment — computationally very hard,
so heuristics are required.

## 5. Method / approach
A five-step pipeline (steps runnable individually or as one workflow) that takes assemblies in
**FASTA** and outputs a pangenome graph, a genome alignment, a **VCF**, and indexes for mapping
with **vg Giraffe**. Steps:
1. **Minigraph SV graph construction** — initial SV-only graph via `minigraph`; a "reference"
   assembly is chosen as an initial backbone and augmented with variation from the remaining
   assemblies in turn (POA-like iterative procedure). By default only variants affecting **≥50 bp**
   are included. Minigraph does not collapse duplications (keeps gene copies separate → larger
   graph, fewer cycles).
2. **Minigraph contig mapping** — each assembly (including the reference) mapped back to the SV
   graph with minigraph (generalized minimap2 seeding/chaining), producing base-level
   contig-to-graph alignments.
3. **Mapping filters / chromosome decomposition** — filter spurious mappings; any mapping that
   would introduce a deletion edge of **≥10 Mb** relative to the reference path is removed
   (tunable). Chromosome-assignment minimum thresholds: **75%** for contigs ≤100 kb, **50%** for
   100 kb–1 Mb, **25%** for >1 Mb; unmapped contigs labeled 'unassigned' and omitted.
4. **Base alignment with Cactus** — minigraph mappings combined into a base-resolution graph using
   a modified Cactus base aligner (progressive multiple-alignment "pinch"/Cactus-graph machinery);
   the graph-collapsing step that scaled poorly with genome count was replaced with a **POA**
   approach that scales linearly (abPOA; max alignment length 10 kb).
5. **Indexing & clipping** — combine chromosome graphs, reassign globally unique node IDs, collapse
   redundant nodes (`gaffix`), orient reference paths forward-only, then convert HAL→vg (`hal2vg`)
   and export VCF (`vg deconstruct`).

Three graphs may be produced during indexing:
- **Full graph** — complete sequence, supports liftover; hard to index/map (unaligned centromeres);
  usually only an intermediate.
- **Default / clipped graph** — clip out all stretches **≥10 kb** that do not align to the
  minigraph SV graph. Rationale: large SVs absent from minigraph are treated as under-alignments,
  not true variants; **the 10-kb threshold is arbitrary but empirically worked well** and was
  sufficient to remove all centromeres (identified with `dna-brnn`) and matches abPOA's max
  alignment length. Used for all results unless stated.
- **Allele frequency-filtered graph** — remove all nodes present in fewer than **N** haplotypes
  (optional AF filter); improves short-read mapping and variant-calling accuracy; used for vg
  Giraffe mapping. Graph (3) ⊆ graph (2) ⊆ graph (1), node-ID compatible.

Outputs/formats (functional strings, verbatim):
- Graphs output in **GFA (version 1.1)**.
- vg-native indexes: **xg**, **snarls**, and **GBWT**.
- **VCF** via `vg deconstruct` (one site per snarl; uses the GBWT haplotype index to enumerate
  traversing haplotypes and compute phased genotypes).
- Cactus natively emits **HAL** (hierarchical alignment); converted to vg via `hal2vg`. HAL feeds
  UCSC assembly hubs / cross-genome annotation but is not directly used for graph applications.

Tools/versions (verbatim): `minigraph` (base-level alignment since **version 0.17**);
`vg giraffe` (**version 1.37.0** in evaluation); BWA-MEM **0.7.17**; hap.py **0.3.12**
(docker `jmcdani20/hap.py:v0.3.12`); rtg vcf eval **v3.91**; Truvari **version 3.5.0**
(`truvari collapse -r 500 -p 0.95 -P 0.95 -s 50 -S 100000`); Picard **2.27.4** (LiftoverVcf,
`RECOVER_SWAPPED_REF_ALT`); `dna-brnn`, `gaffix`, `hal2vg`. HPRC v1.0 graphs were built with an
**older** version of the pipeline (satellite removed first via dna-brnn); exact HPRC-build commands
pinned to **Cactus commit 91bdd83728c8cdef8c34243f0a52b28d85711bcf**. Code/binaries/Docker/manuals:
https://github.com/ComparativeGenomicsToolkit/cactus .

## 6. Key claims / findings
- Builds base-level pangenome graphs at the scale of "dozens to hundreds of vertebrate
  haplotypes"; demonstrated on **90 human haploid genomes** from HPRC.
- HPRC construction: from 47 HPRC diploid assemblies, held out **HG002, HG005, NA19240**; used the
  remaining **44 samples (88 haplotypes)** plus **two reference genomes GRCh38 and CHM13
  (version 1.1)** = **90 haploid genomes** total. Ran the pipeline **twice** independently, once
  with GRCh38 as reference and once with CHM13.
- The CHM13-based graph includes difficult/highly variant regions (e.g. acrocentric short arm of
  chr21) **not represented in the GRCh38-based graph**; slightly larger in sequence and in
  nodes/edges (Supplementary Table 1). In virtually all genome-wide mapping/variant-calling/
  genotyping measures the CHM13-based graph was superior; with Giraffe/DeepVariant it improved on
  the GRCh38-based graph's state-of-the-art accuracy.
- Final pangenomes have roughly **200× more nodes and edges** than the SV-only minigraph graph.
- *Drosophila melanogaster* pangenome: **16 assemblies** including reference **dm6 (ISO1)**, 14
  diverse strains + strain B7; sizes 132–144 Mb; demonstrates non-human applicability. Construction
  ~5 h for pangenomes (vs ~19 h for Progressive Cactus all-vs-all alignments); five D. mel graphs
  produced. DGRP short reads (205 inbred genomes, unrelated) used to evaluate mapping.
- VCF export: bubbles/snarls decomposed to canonical SVs; each deconstructed-VCF allele specifies
  its path in the pangenome; variant frequency = number of assemblies traversing the path.

## 7. Load-bearing statements (OWN-WORDS paraphrase; functional strings verbatim)
- The initial SV graph is reference-anchored: a "reference" assembly is **chosen as an initial
  backbone** and then augmented with variation from the other assemblies in turn (Methods,
  Minigraph SV graph construction).
- Minigraph-Cactus **requires at least one chromosome-level input assembly to be used as a
  reference backbone**; graph quality/usefulness rises with the quality/completeness of all inputs
  (Discussion). [functional phrase "reference backbone" verbatim]
- The reference coordinate system "can also be a source of bias" — bias appearing as unmappable
  reads in diverse samples, or, more subtly, variant calls being **skewed toward the reference
  allele**; pangenome graphs have been shown to reduce reference bias, but prior construction faced
  tradeoffs (Introduction/Discussion).
- The choice of which included assembly serves as the **reference backbone influences the topology
  and completeness of the graph**; construction is dependent on the reference chosen (Discussion;
  HPRC results).
- When an unaligned centromere is clipped, that region retains **only the reference allele**; other
  alleles are broken into two subpaths but are otherwise unaffected outside the clipped region
  (Fig. 1f caption).

## 8. Stated scope, assumptions, limitations (the source's own caveats)
- Requires at least one chromosome-level assembly as reference backbone (method assumption).
- Results depend on the reference chosen; the two reference choices (GRCh38 vs CHM13) yield
  different graphs, and reference quality/completeness materially affects downstream performance.
- The **10-kb** clipping threshold is described as **arbitrary** (empirically effective, tied to
  abPOA max alignment length and centromere removal).
- Minigraph includes only variants **≥50 bp** by default in the SV graph; excluding small variation
  at that stage would prevent lossless path embedding — hence the Cactus base-alignment step.
- Regions/sequence that cannot be confidently mapped ('unassigned', 'minigraph-gap' >100 kb,
  'clipped' >10 kb) are removed; predominantly centromeric, acrocentric-short-arm, or
  segmental-duplication sequence enriched for putative assembly errors.
- Closing note: "True graph-based genotyping formats and tools are needed" (Discussion) — VCF is a
  reference-relative interchange stopgap, not a native graph genotyping format.

## 9. Failure modes / invalidity patterns (referee-relevant)
- **Reference-anchoring is intrinsic**: the graph is built on and clipped against a chosen
  reference backbone. In clipped (centromeric/unalignable) regions the graph keeps **only the
  reference allele** — non-reference sequence in those regions is not represented in the default
  graph. This is the paper's own statement, not an external assertion of bias.
- **Reference-choice sensitivity**: swapping the reference (GRCh38↔CHM13) changes graph topology,
  completeness, and which regions exist at all (e.g. chr21 acrocentric arm present only in CHM13).
  A single-reference build can therefore omit regions a better/other reference would include.
- **VCF export is reference-relative**: `vg deconstruct` produces reference-anchored sites; the
  authors flag that VCF cannot represent nested variation and that true graph-native genotyping
  formats are still needed. Variant calls remain "skewed toward the reference allele" absent a
  graph-native representation.
- **Sequence dropped by filters**: contigs below chromosome-assignment thresholds (75%/50%/25% by
  length) and stretches ≥10 kb unaligned to minigraph are omitted/clipped — sequence loss is a
  designed behavior, not an error; the amount removed is quantified only in supplementary figures
  (Suppl. Figs. 4, 17) not in this copy.
- **Large-deletion guard**: mappings implying a deletion edge ≥10 Mb relative to the reference path
  are removed to avoid spurious nesting (all variants on a spanned arm being treated as nested in
  one large deletion) — a symptom the pipeline actively suppresses.

## 10. What the source does NOT address
- **No comparison to PGGB / seqwish / smoothxg.** PGGB is not mentioned anywhere; the only
  head-to-head is against **Progressive Cactus** (star vs progressive alignment on Drosophila).
- **No `cactus-pangenome` command or CLI flag names.** The paper describes the pipeline in prose
  ("five steps"); it does **not** give flag names such as `--reference`, `--outDir`, `--outName`,
  `--vcf`, `--gfa`, or `--gbz`. (Exact commands are deferred to the GitHub repo / `doc/pangenome.md`
  and the pinned Cactus commit.)
- **GBZ format is not mentioned.** Indexes named are xg, snarls, and GBWT; GFA v1.1 is the graph
  output. (GBZ was introduced/became standard in the vg ecosystem around this time but this
  manuscript does not name it.)
- No blanket claim that "non-reference haplotypes are systematically under-represented" — the paper
  frames Minigraph-Cactus as *reducing* reference bias while acknowledging residual
  reference-relative effects (clipping, VCF, reference choice).

## 11. Open questions / ambiguities
- The exact CLI (`cactus-*` subcommands, argument names) is not in the paper — must be recovered
  from the repo at the pinned commit to author any runnable skill.
- Whether the "current" pipeline (vs the older HPRC-v1.0 build) changes clipping/AF defaults is
  only partially addressed; the HPRC graphs used an older version with an extra dna-brnn satellite
  pre-removal step.
- Quantitative sequence-loss figures live only in supplementary material not in this copy.

## 12. Guidance answers
1. **Reference-anchored or reference-free?** — **Reference-anchored.** Own-words: the SV graph
   starts from a chosen "reference" assembly used as an initial **backbone**, augmented with the
   other assemblies; Discussion states the method requires at least one chromosome-level assembly
   as a reference backbone. (Functional phrase "reference backbone" verbatim.) "Reference-free" is
   never claimed.
2. **Variants relative to reference / reference-bias caveat?** — Paths/variants are exported
   reference-relative (VCF via `vg deconstruct`; each allele specifies its pangenome path compared
   to the reference path). The paper's OWN bias language: the reference coordinate system "can also
   be a source of bias," manifest as variant calls being **skewed toward the reference allele**; it
   positions pangenome graphs as *reducing* reference bias while noting residual tradeoffs. The
   concrete under-representation the paper states: clipping unaligned/centromeric regions leaves
   **only the reference allele** there, and the **choice of reference backbone influences graph
   topology and completeness** (regions present under CHM13 absent under GRCh38). The paper does
   NOT assert a general "non-reference haplotypes are under-represented" caveat beyond these
   specific, reference-relative statements. (Rendered own-words; source is all-rights-reserved.)
3. **Output files + flags?** — Formats confirmed: **GFA (v1.1)**, **VCF**, **HAL**, plus vg indexes
   **xg / snarls / GBWT**. **GBZ is NOT mentioned.** Exact `cactus-pangenome` output-type flags
   (`--vcf`, `--gfa`, `--gbz`, `--reference`, `--outDir`, `--outName`) are **NOT in the paper** —
   it describes prose steps, deferring commands to the repo. GAP for flag names.
4. **Is `--reference` required?** — The paper states a reference **is required** (at least one
   chromosome-level assembly as backbone), but the exact `--reference` **flag name is not given**.
5. **Scale demonstrated?** — **90 human haploid genomes** (44 HPRC samples = 88 haplotypes + GRCh38
   + CHM13); also **16** *D. melanogaster* assemblies.
6. **PGGB comparison / when to prefer each?** — **NOT addressed.** No PGGB mention; only Progressive
   Cactus is compared (Drosophila). GAP.

Version pin recorded: `minigraph` ≥ 0.17; HPRC v1.0 graphs at **Cactus commit
91bdd83728c8cdef8c34243f0a52b28d85711bcf**; pipeline source at
github.com/ComparativeGenomicsToolkit/cactus. No single "Minigraph-Cactus version" number is
stated in the paper.
