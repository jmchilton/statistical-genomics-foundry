---
title: "Progressive Cactus is a multiple-genome aligner for the thousand-genome era"
type: paper
source_id: armstrong-2020-cactus
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC7673649/
doi: 10.1038/s41586-020-2871-y
access_date: "2026-07-03"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Armstrong J, Hickey G, Diekhans M, Fiddes IT, Novak AM, Deran A, Fang Q, Xie D, Feng S, Stiller J, et al. Progressive Cactus is a multiple-genome aligner for the thousand-genome era. Nature 587(7833):246-251, 2020. DOI 10.1038/s41586-020-2871-y. Read via PMC open-access full text under CC-BY 4.0."
derived: license-aware-summary
tags:
  - domain/genome-alignment
  - domain/phylogenetics
---

# Progressive Cactus (Armstrong et al. 2020) — faithful source note

## 1. Citation
Armstrong J, Hickey G, Diekhans M, Fiddes IT, Novak AM, Deran A, Fang Q, Xie D, Feng S,
Stiller J, et al. 2020. "Progressive Cactus is a multiple-genome aligner for the
thousand-genome era." Nature 587(7833):246–251. doi:10.1038/s41586-020-2871-y.
Open-access copy read: PMC7673649 (https://pmc.ncbi.nlm.nih.gov/articles/PMC7673649/).
Access date: 2026-07-03.

## 2. Access note
Nature is paywalled; the PMC open-access full text (PMC7673649) was readable and used for
this note. License: **Creative Commons Attribution 4.0 International (CC BY 4.0)** — verbatim
reproduction is permitted. Full text was read via a fetch/summarization step, so most prose
below is own-words paraphrase to avoid transcription drift; only functional strings (tool/command
names, file names, numeric results) are treated as verbatim facts. Where a phrase is shown in
quotes it is a short load-bearing quote from the OA full text (§7).

This note serves TWO skills: annotation-projection (§ scoped baseline) and whole-genome-alignment
method internals (CAF/BAR pipeline, scaling, masking, compute). Both are captured below.

## 3. Thesis (1 sentence)
Progressive Cactus enables reference-free multiple alignment of tens to thousands of large
vertebrate genomes while maintaining high alignment quality, making genome alignment feasible
at the scale of the "thousand-genome era."

## 4. Problem & context
Prior whole-genome aligners either required a single designated reference (biasing the alignment
toward reference-present sequence and losing reference-absent sequence) or did not scale to
hundreds/thousands of large vertebrate genomes. The original (non-progressive) Cactus removed the
reference restriction but "scaled quadratically with the total number of bases in the alignment
problem, making alignment of more than about ten vertebrate genomes completely impractical."
Progressive Cactus targets reference-free, clade-scale alignment that scales linearly with genome
count.

## 5. Method / approach

### 5a. Whole-genome-alignment pipeline internals (WGA skill)
- **Progressive decomposition via a guide tree.** A guide (phylogenetic) tree "is used to
  recursively split a large alignment problem (comparing every genome to every other genome) into
  many small subproblems." Each subproblem aligns a small set of genomes (a node and its children);
  reconstructed ancestral assemblies at internal nodes are the mechanism for combining
  sub-alignments upward.
- **Per-subproblem alignment pipeline (ordered stages, verbatim stage names):**
  1. **LASTZ pairwise local alignment** — "The subproblem procedure begins with a set of pairwise
     local alignments generated via the sensitive pairwise local-alignment program LASTZ."
  2. **CAF (Cactus Alignment Filter)** — "These pairwise alignments are then filtered and combined
     into a cactus graph representing an initial multiple alignment using the previously described
     CAF algorithm."
  3. **BAR (Base-level Alignment Refinement)** — "The initial alignment is refined using the
     previously described BAR algorithm to create a more complete alignment."
  4. **Ancestral assembly reconstruction** — "The ancestral assembly is then created by ordering
     the blocks in this final alignment and establishing a most-likely base call for each column in
     each block."
- **CAF/BAR algorithm detail is DEFERRED to the original Cactus publication** — the paper calls
  CAF and BAR "previously described" and points to the original Cactus program (reference **[6]**;
  the original Cactus paper is Paten et al. 2011, Genome Research — `[summarizer-inferred]`
  identification of ref [6]; the fetched text confirms only "reference 6 / the original Cactus
  publication"). This paper does not re-derive CAF/BAR internals.
- **Masking is a PRECONDITION.** "Progressive Cactus requires input genomes to be soft-masked, but
  often repetitive sequence goes unmasked due to poor masking or incomplete repeat libraries."
  Rationale given: unmasked repeats hurt runtime because "alignments need to be enumerated to and
  from all copies of a repetitive sequence" and can impact quality. To compensate, a preprocessing
  step self-aligns chunks: "For each chunk, we align it to itself and a configurable amount of other
  randomly sampled chunks (currently 20% of the total pool)" and then soft-masks "any region covered
  by more than a configurable number of these alignments (currently set to 50)." No overall
  percent-of-TE-families masking target is stated (see §10).

### 5b. Annotation-projection method (annotation skill — scoped baseline)
- **Reference-free.** The aligner does not designate a single reference genome; it aligns
  all input genomes and reconstructs ancestral assemblies at internal nodes of a guide tree.
- **Progressive strategy.** Uses a guide (phylogenetic) tree to recursively decompose a large
  alignment into small subproblems, aligning each and reconstructing ancestral assemblies used to
  combine sub-alignments upward.
- **Output = HAL.** The alignment is stored in HAL (Hierarchical ALignment) format — a single
  multiple-alignment file spanning all genomes and reconstructed ancestors.
- **HAL toolkit tools** (functional string names, verbatim) used to extract/convert/query the
  alignment for downstream use:
  - `hal2maf` — convert HAL to MAF (used "with the --onlyOrthologs option").
  - `halLiftover` — project/lift annotations (coordinates) between genomes via the HAL alignment;
    can emit pairwise alignments (e.g. `--outPSL`) chainable for annotation transfer.
  - `halSynteny` — **NOT described or named in this paper** (see §9/§10/§12). The guidance asked for
    it; this source does not cover it.
  - Other named toolkit utilities: `halAppendSubtree`, `halReplaceGenome`, `halAddToBranch`
    (add genomes/subtrees to an existing alignment incrementally), `halCoverage`,
    `halBranchMutations` (indel/substitution events on a branch), `halStats --tree`.
- **Pairwise chains for annotation transfer.** For transcript/annotation mapping the paper's
  pipeline extracts pairwise alignments from the HAL (via `halLiftover`, e.g.
  `halLiftover --outPSL --noDupes 600way.hal <srcOrg> <src.bed> <destOrg> <out.psl>`), then uses
  a chains-and-nets style workflow to build syntenic mapping chains, with a paralogy/duplication
  filter (best-hit filtering) to suppress spurious multi-mappings.
- **Comparative annotation.** The Comparative Annotation Toolkit (CAT) is run downstream on the
  alignment (e.g. GENCODE V30 projected across human/chimp/gorilla) to transfer/annotate genes.

## 6. Key claims / findings (atomic)
- Reference-free alignment of **tens to thousands** of large vertebrate genomes at high quality.
- Largest alignment reported: **605 amniote genomes**, totaling **1.07 trillion** aligned bases —
  described as the largest multiple vertebrate genome alignment created so far.
- Component/constituent alignments include **242 placental mammals** (Zoonomia) and
  **363 avians / birds** (Bird 10K / B10K). (242 + 363 = 605; the two large clades composing the
  605-genome amniote alignment.)
- **Scaling (WGA):** original Cactus scaled **quadratically** with total bases (≈>10 vertebrate
  genomes impractical); the progressive strategy "changes the runtime of the alignment to scale
  linearly with the number of genomes." Empirically, vs a star-tree: "15% reduction in runtime for
  10 species and 48% for 20 species," the speed advantage growing with species count.
- Simulated-data accuracy (F₁): primate clade **0.989**; mammal clade **0.795**.
- Ancestral-coverage in the 600-way/605-amniote alignment: ~**86%** of human coding bases covered
  in the placental-mammal ancestor; ~**95%** of chicken coding bases in the avian ancestor.
- Human→chicken transcript mapping: **~74%** of **84,001** transcripts mapped; multi-mapping only
  **~2–3%**, versus **16–51%** for translated-protein mapping methods.
- Improved best-hit / duplication filtering reduced multi-mapping across genes from **9.8%** to **6.5%**.
- Tolerance to assembly quality: induced pairwise (e.g. human–dog) alignments from high-quality vs
  lower-quality assemblies had **0.855** Jaccard similarity — higher than the similarity seen
  between different alignment strategies, i.e. assembly quality differences perturb the alignment
  less than the choice of alignment method does.
- **Compute for the 605-genome alignment (Table 1 breakdown):**
  - Zoonomia (242 genomes): **68,166** instance-hours / **1.9 million** core-hours.
  - B10K (363 genomes): **5,302** instance-hours / **0.2 million** core-hours.
  - Combined (605 genomes): **73,692** instance-hours / **2.1 million** core-hours.
  - Run on AWS "over the course of 3 weeks for the avians and 2 months for the mammals, using a
    maximum of 240 c3.8xlarge instances and 20 r3.8xlarge instances." No dollar cost is stated.

## 7. Load-bearing statements (license: CC BY 4.0 — verbatim permitted; short quotes)
Functional strings (verbatim, license-independent facts):
- File name in the annotation-transfer example: `600way.hal`.
- Command form: `halLiftover --outPSL --noDupes 600way.hal <srcOrganism> <srcChroms.bed> <destOrganism> <src-dest.psl>`.
- Toolkit command names: `hal2maf` (`--onlyOrthologs`), `halLiftover` (`--outPSL --noDupes`),
  `halAppendSubtree`, `halReplaceGenome`, `halAddToBranch`, `halCoverage`, `halBranchMutations`,
  `halStats --tree`.
- Pipeline stage names: `LASTZ`, `CAF`, `BAR` (ancestral-assembly reconstruction).
- Scale/compute numbers: `605` amniote genomes; `1.07 trillion` bases; `242` placental mammals;
  `363` avians; F₁ `0.989` / `0.795`; `84,001` transcripts; `0.855` Jaccard;
  `73,692` / `68,166` / `5,302` instance-hours; `2.1M` / `1.9M` / `0.2M` core-hours;
  `240 c3.8xlarge` + `20 r3.8xlarge` instances.

Short load-bearing prose quotes (CC BY 4.0), with location:
- Pipeline: "The subproblem procedure begins with a set of pairwise local alignments generated via
  the sensitive pairwise local-alignment program LASTZ." (Methods, pipeline description)
- Pipeline: "These pairwise alignments are then filtered and combined into a cactus graph
  representing an initial multiple alignment using the previously described CAF algorithm."
- Pipeline: "The initial alignment is refined using the previously described BAR algorithm to
  create a more complete alignment."
- Pipeline: "The ancestral assembly is then created by ordering the blocks in this final alignment
  and establishing a most-likely base call for each column in each block."
- Scaling: original Cactus "scaled quadratically with the total number of bases in the alignment
  problem, making alignment of more than about ten vertebrate genomes completely impractical"; the
  progressive change "changes the runtime of the alignment to scale linearly with the number of
  genomes."
- Masking (precondition): "Progressive Cactus requires input genomes to be soft-masked, but often
  repetitive sequence goes unmasked due to poor masking or incomplete repeat libraries."
- Masking preprocessing: soft-mask "any region covered by more than a configurable number of these
  alignments (currently set to 50)," sampling "(currently 20% of the total pool)."
- Assembly robustness: "the progressive alignment strategy can tolerate poor assemblies."
- Reference-free framing (abstract): alignment of "tens to thousands of large vertebrate genomes
  while maintaining high alignment quality."

## 8. Stated scope, assumptions, limitations
- Requires a **guide phylogenetic tree** to drive the progressive decomposition.
- Requires input genomes to be **soft-masked** (a stated precondition; unmasked repeats hurt runtime
  and quality).
- Aimed at large **vertebrate** genomes; accuracy demonstrated on primate/mammal/amniote clades.
- Accuracy degrades with evolutionary distance (F₁ 0.989 primate vs 0.795 mammal) — deeper/more
  divergent clades align less accurately.

## 9. Failure modes / invalidity patterns
- **Unmasked / poorly-masked repeats** — degrade runtime (alignments enumerated to/from every copy
  of a repetitive sequence) and quality; the paper names soft-masking as required and adds a
  self-alignment coverage preprocessing step (coverage > 50 → mask) as a mitigation. This is a named
  precondition + named symptom.
- **Too many genomes without a balanced progressive decomposition** — the original quadratic-scaling
  approach was "completely impractical" beyond ~10 vertebrate genomes; the guide-tree decomposition
  (linear scaling) is what makes clade-scale feasible.
- **Deeper divergence lowers accuracy** — mammal-clade F₁ (0.795) well below primate (0.989);
  ancestral/coding-base coverage is incomplete (~86% human coding in placental ancestor).
- **Paralogy / duplication → multi-mapping** — without the best-hit/duplication filter, transcript
  mapping suffers spurious multi-mappings; filtering reduces multi-mapping (9.8% → 6.5%; and
  Cactus-based mapping's 2–3% vs 16–51% for translated methods) — a named symptom (multi-mapping
  rate) and a named mitigation (best-hit filtering, `--noDupes`).
- **Assembly quality has bounded impact** — the paper frames poor/fragmented assemblies as
  tolerated (0.855 Jaccard between high- vs low-quality-assembly-induced alignments); it does NOT
  present fragmentation as producing large alignment failure within its tested range, nor a
  fragmentation threshold at which alignment (or downstream projection) breaks.

## 10. What the source does NOT address (confident silences)
- **Per-genome RAM / memory figure — ABSENT.** The paper does NOT state any per-genome RAM or memory
  requirement (no 8 GB / 16 GB / 32 GB per-genome figure, no per-genome memory number of any kind).
  It reports instance-hours, core-hours, instance types (c3.8xlarge, r3.8xlarge), and wall-clock
  duration only. A downstream probe attributing an "8–32 GB per genome" range to THIS paper would be
  wrong — the number is not here.
- **branchScale — ABSENT.** The word "branchScale" does not appear, and no per-clade branch-length
  scaling numeric parameters (e.g. vertebrate 1.0, plant, bacteria) are given. Any such per-clade
  branchScale values attributed to this paper are not present.
- **Numeric masking target — ABSENT.** No overall percent-of-TE-families (or %-of-genome) masking
  target is stated; only the configurable self-alignment coverage threshold (currently 50) and
  sampling fraction (currently 20%).
- **Dollar cost — ABSENT.** Compute is reported in instance-/core-hours and instance counts; no USD
  cost figure.
- **`halSynteny`** — not named or described in this paper (the synteny-block extractor exists in the
  HAL toolkit but is documented elsewhere, not here).
- **TOGA** — not mentioned in this paper.
- No stated threshold linking a specific assembly-fragmentation level to false gene loss in
  downstream annotation projection.

## 11. Open questions / ambiguities
- CAF/BAR internals are deferred to the original Cactus publication (ref [6]); this note captures
  the stage names and ordering but not the algorithm detail, which lives outside this paper.
- The exact "600way" vs "605 amniote" naming: the annotation example uses a file named `600way.hal`
  while the headline alignment is stated as 605 genomes; the note preserves both as the source
  presented them without reconciling the off-by-count.
- How chains/nets are produced downstream (UCSC chains-and-nets referenced) is only sketched; the
  detailed chain-extraction step lives outside this paper.

## 12. Guidance answers

Annotation-projection block (preserved):
- **Reference-free multiple alignment (tens–thousands, no single reference):** Confirmed — the
  method is reference-free and reconstructs ancestral assemblies rather than mapping to one
  reference; aligns "tens to thousands of large vertebrate genomes."
- **Output = HAL; downstream extraction tools:** Confirmed HAL output. For pairwise/annotation
  extraction the paper uses `halLiftover` (e.g. `halLiftover --outPSL --noDupes 600way.hal ...`)
  plus `hal2maf --onlyOrthologs`, feeding a chains-and-nets + best-hit-filter pipeline and CAT.
  **`halSynteny` is NOT mentioned in this paper** — unanswerable from this source; only
  `halLiftover`/`hal2maf` (and management utilities `halAppendSubtree`, `halReplaceGenome`,
  `halAddToBranch`, `halCoverage`, `halBranchMutations`, `halStats`) are named here.
- **Scale figures (exact counts):** 605 amniote genomes, 1.07 trillion bases; 242 placental
  mammals (Zoonomia) + 363 avians (Bird 10K/B10K) = 605.
- **Alignment quality vs assembly fragmentation:** Paper states the progressive strategy "can
  tolerate poor assemblies"; 0.855 Jaccard between high- vs low-quality-assembly-induced pairwise
  alignments (higher than between alignment strategies). It does NOT give a fragmentation threshold
  for false gene loss — argues tolerance, not a breaking point.

Whole-genome-alignment block (new):
- **Pipeline internals (LASTZ → CAF → BAR → ancestral-assembly-per-node):** Confirmed and named in
  order. LASTZ generates pairwise local alignments → CAF filters/combines into a cactus graph
  (initial multiple alignment) → BAR refines → ancestral assembly created by ordering blocks and
  most-likely base call per column. CAF and BAR are labeled "previously described"; algorithm detail
  is DEFERRED to the original Cactus publication (ref [6]). This paper does not re-derive them.
- **Scaling (linear vs quadratic):** Confirmed. Original Cactus scaled quadratically with total
  bases (>~10 vertebrate genomes impractical); the guide-tree progressive decomposition "changes the
  runtime of the alignment to scale linearly with the number of genomes." Empirical: 15% (10 sp) /
  48% (20 sp) runtime reduction vs star-tree. The guide tree "recursively split[s] a large alignment
  problem ... into many small subproblems" — the mechanism for linear scaling.
- **Masking requirement:** Confirmed as a stated precondition — "Progressive Cactus requires input
  genomes to be soft-masked," rationale being unmasked repeats blow up runtime (enumeration to/from
  all copies) and hurt quality. Preprocessing self-alignment step masks regions with coverage >50
  (configurable), sampling 20% of chunks (configurable). **No numeric percent-of-TE masking target.**
- **Compute figures (EXACT):** Combined 73,692 instance-hours / 2.1M core-hours; Zoonomia 68,166 /
  1.9M; B10K 5,302 / 0.2M. AWS, 3 weeks (avians) + 2 months (mammals), ≤240 c3.8xlarge + 20
  r3.8xlarge. No USD cost.
- **Per-genome RAM (e.g. 8–32 GB):** **ABSENT — not stated anywhere in the paper.** Do not attribute
  a per-genome RAM range to this source (see §10).
- **branchScale (and per-clade values):** **ABSENT — the word does not appear; no per-clade
  branch-length scaling numbers (vertebrate/plant/bacteria) are given** (see §10).
