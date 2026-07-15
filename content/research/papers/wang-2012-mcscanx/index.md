---
title: "MCScanX: a toolkit for detection and evolutionary analysis of gene synteny and collinearity"
type: paper
source_id: wang-2012-mcscanx
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC3326336/
doi: 10.1093/nar/gkr1293
access_date: "2026-07-04"
license: CC-BY-NC-3.0
attribution: "Wang Y, Tang H, DeBarry JD, Tan X, Li J, Wang X, Lee T-h, Jin H, Marler B, Guo H, Kissinger JC, Paterson AH. MCScanX: a toolkit for detection and evolutionary analysis of gene synteny and collinearity. Nucleic Acids Research 40(7):e49, 2012. DOI 10.1093/nar/gkr1293. Read via PMC open-access full text; note records CC BY-NC 3.0 posture."
derived: own-words-summary
---

# MCScanX — faithful source note

## 1. Citation
Wang Y, Tang H, DeBarry JD, Tan X, Li J, Wang X, Lee T-h, Jin H, Marler B, Guo H,
Kissinger JC, Paterson AH. 2012. "MCScanX: a toolkit for detection and evolutionary
analysis of gene synteny and collinearity." *Nucleic Acids Research* 40(7):e49.
doi:10.1093/nar/gkr1293. Open access: PMC3326336
(https://pmc.ncbi.nlm.nih.gov/articles/PMC3326336/). Access date: 2026-07-04.

Software described: `wyp1125/MCScanX` (repo). The paper does not print a version number
for the toolkit itself.

## 2. Access note
Full text read via PMC open-access HTML (no paywall boundary). Figures and the
supplementary application-note details were read as rendered text. No supplementary PDF
was separately retrieved; items the paper defers to the manual/README are flagged below as
not-in-paper rather than absent-from-tool.

## 3. Thesis (1 sentence)
MCScanX detects collinear (syntenic) gene blocks within and between genomes from only a
simplified GFF plus a BLASTP tabular file, and adds downstream programs to classify gene
duplication modes and analyze the evolutionary patterns of the resulting synteny.

## 4. Problem & context
Prior MCScan and related tools detected collinearity but offered limited support for
integrating collinearity with the broader analysis of gene duplication and evolutionary
pattern. The paper positions MCScanX as extending MCScan: same core collinearity idea, but
minimal inputs (simplified GFF + BLASTP tabular), multiple-genome alignment, and a suite of
downstream classification/visualization programs.

## 5. Method / approach
Pipeline shape: run all-vs-all BLASTP, produce a tabular BLASTP file and a simplified GFF,
then MCScanX detects tandem arrays and collinear blocks via dynamic programming; downstream
programs classify genes and visualize/analyze the blocks.

**Inputs (verbatim requirements).** MCScanX takes a simplified GFF file and a BLASTP tabular
file. The simplified GFF holds gene locations: chromosome, gene symbol, start and end. The
BLASTP input is one or more concatenated BLASTP outputs in tabular format — option `-m8` in
legacy BLAST, `-outfmt 6` in BLAST+. The BLASTP input may be replaced by a tab-delimited file
of pairwise homology from third-party software (this alternative-homology path corresponds to
the `MCScanX_h` program).

**BLASTP recommendation (as run in the paper).** For a protein sequence, the best five
non-self hits in each target genome meeting an E-value threshold of 10^-5 were reported.

**Tandem detection / collapse.** Tandem duplicates are paralogs adjacent on a chromosome
(difference of gene rank = 1). During execution, if consecutive BLASTP matches share a common
gene and their paired genes are separated by fewer than five genes, those matches are
collapsed to a single representative pair with the smallest BLASTP E-value.

**Collinearity by dynamic programming (defaults, verbatim values).** BLASTP matches are
chained by gene position; dynamic programming finds highest-scoring chains of collinear gene
pairs. By default `MatchScore(v) = 50` for one gene pair, `GapPenalty = -1`, and the maximum
number of intervening genes between successive pairs u and v — `NumberofGaps(u,v)` — must be
fewer than 25. Non-overlapping chains scoring over 250 (i.e. involving at least 5 collinear
gene pairs) are reported. An E-value cutoff of 10^-5 is applied to collinear blocks.

**Gene classification (`duplicate gene classifier`).** Each gene is assigned one class by
priority order `WGD/segmental > tandem > proximal > dispersed`. Categories:
- **Singletons** — no BLASTP hits.
- **Dispersed** — BLASTP hits but not in synteny / not proximal or tandem.
- **Proximal** — gene rank difference < 20 (near but not adjacent).
- **Tandem** — gene rank difference = 1.
- **WGD/segmental** — anchor genes located in collinear blocks.

**Programs shipped.** The package has two parts: three core programs and 12 downstream
analysis programs. Core: `MCScanX` (pairwise and multiple collinearity alignment),
`MCScanX_h` (takes precomputed homology instead of BLASTP), and the `duplicate gene
classifier`. Downstream programs named in the paper include visualization plotters (dual
synteny plotter, circle plotter, dot plotter, bar plotter) and analysis scripts (e.g. add
Ka/Ks to collinearity, group collinear genes, dissect multiple alignment, detect collinear
tandem arrays, origin enrichment analysis, detect collinearity within gene families, family
circle plotter, family tree plotter).

## 6. Key claims / findings (atomic)
- MCScanX needs only a simplified GFF (chromosome, gene symbol, start, end) plus a BLASTP
  tabular file (`-m8` / `-outfmt 6`) as input.
- Default collinearity scoring: match score 50 per gene pair, gap penalty -1, gap cap "fewer
  than 25" intervening genes.
- A reported collinear block must score > 250, i.e. contain at least 5 collinear gene pairs.
- Collinear blocks are filtered by an E-value cutoff of 10^-5.
- BLASTP was run to keep the best five non-self hits per target genome at E-value 10^-5.
- Tandem = adjacent paralogs (gene rank difference 1); proximal = gene rank difference < 20.
- Consecutive BLASTP matches sharing a gene whose partners are within five genes are collapsed
  to the smallest-E-value representative pair.
- Genes are uniquely classed by priority WGD/segmental > tandem > proximal > dispersed via the
  `duplicate gene classifier`.
- Distribution: 3 core programs + 12 downstream analysis programs.

## 7. Load-bearing statements (own-words — CC BY-NC 3.0 is own-words-only per license-policy.yml; functional strings kept verbatim as facts)
1. (Scoring defaults) by default `MatchScore`(v) = 50 per gene pair, `GapPenalty` = −1, and
   `NumberofGaps`(u,v) — the maximum number of intervening genes between u and v — must be fewer than 25.
2. (Block-size threshold) non-overlapping chains scoring over 250 (i.e. at least 5 collinear gene
   pairs) are reported.
3. (Inputs) MCScanX takes only a simplified GFF file and a BLASTP tabular file as inputs: the GFF gives
   gene locations (chromosome, gene symbol, start, end) for the genomes compared, and the BLASTP file
   is one or several combined BLASTP outputs in tabular format (`-m8` in BLAST, `-outfmt 6` in BLAST+).
4. (Tandem/consecutive collapse) consecutive BLASTP matches sharing a gene whose paired genes are
   separated by fewer than five genes are collapsed to a representative pair with the smallest BLASTP
   E-value.
5. (Classification priority) a gene appearing in multiple BLASTP hits is assigned one class by the
   priority order WGD/segmental > tandem > proximal > dispersed.

(Functional strings retained verbatim throughout: `-m8`, `-outfmt 6`, `MatchScore`,
`GapPenalty`, `NumberofGaps`, values 50 / −1 / 25 / 250 / 5 / <20 / 10^-5, category names,
`MCScanX_h`, `duplicate gene classifier`.)

## 8. Stated scope, assumptions, limitations
- Inputs assume protein-level BLASTP; nucleotide-only or non-coding synteny is out of scope of
  the described pipeline.
- Collinearity is gene-order based (needs gene positions in GFF and homology hits); it is not a
  base-level whole-genome aligner.
- The 250 / 5-pair minimum and gap-<25 defaults define what counts as a reported block; smaller
  or gappier collinear runs are not reported unless parameters are changed.

## 9. Failure modes / invalidity patterns
- **Under-collapsed tandem arrays / large gene families** inflate BLASTP hit density; the paper's
  explicit remedy is the collapse rule (consecutive shared-gene matches within five genes → one
  representative pair). Skipping/mis-setting this can produce spurious dense "collinearity."
  [The paper states the collapse mechanism but does NOT quantify its effect.]
- **Short or gappy chains** below score 250 (fewer than 5 pairs) or with a gap run of 25+ genes
  are not reported — a sensitivity floor, not an error.
- The paper gives no named error message or runtime diagnostic; validity is governed by the
  score/gap/E-value thresholds above rather than by an emitted warning.

## 10. What the source does NOT address (confident silences)
- **Does NOT quantify repeat/transposable-element-driven false collinearity.** There is no
  "~100x", fold-change, or numeric statement that unmasked repeats/TEs inflate false anchor
  pairs. The only repeat-like control described is the tandem/consecutive-match collapse rule.
  Guidance question 4: **ABSENT** in this paper.
- Does NOT print CLI flag names. The ALL-CAPS/`-flag` forms `-k`, `-s`, `-m`, `-e`, `-w`,
  `MATCH_SCORE`, `MATCH_SIZE`, `MAX_GAPS`, `E_VALUE`, `OVERLAP_WINDOW`, `GAP_PENALTY` do **NOT
  appear** in the paper. It states the conceptual defaults (match score 50, gap penalty −1,
  gap < 25, min score 250 / ≥5 pairs, E-value 10^-5) but not their command-line option letters.
  [Mapping paper-defaults → CLI flags is not made by the paper; do not infer it here.]
- Does NOT give a verbatim `.collinearity` output-block header string (e.g. an
  `## Alignment N: score= e_value= N=` line). The output is described in prose (anchor-gene
  symbols, duplication depth) but the exact header format is not printed in the article text read.
- Does NOT mention `MCScanX-transposed` (a later companion tool) — **NOT PRESENT** here.
- Does NOT print a version tag for the toolkit.
- Does NOT specify the `.gff` species-prefix-on-chromosome convention as a literal 4-column
  layout string; it lists the four fields (chromosome, gene symbol, start, end) in prose only.

## 11. Open questions / ambiguities
- Exact CLI option letters and their default values (deferred to the software manual/README, not
  in the paper).
- The literal `.collinearity` / `.tandem` / classifier output file formats and headers.
- Whether any repeat/TE masking is recommended upstream (paper is silent beyond tandem collapse).
- The default gene-distance window for tandem: paper gives tandem = rank-difference 1 and a
  collapse-within-5-genes rule, but no separate `-w`/overlap-window parameter is named.

## 12. Guidance answers
1. **Default collinearity parameters.** Given in the paper as concepts, not CLI flags: match
   score = 50/pair, gap penalty = −1, max intervening genes < 25, minimum block score 250
   (≥ 5 collinear pairs), block E-value cutoff 10^-5. The paper does **not** state `-k`, `-s`,
   `-m`, `-e`, `-w` flag letters or a MATCH_SIZE/MAX_GAPS/OVERLAP_WINDOW naming. (See §7 quote 1–2.)
2. **Required input.** Simplified GFF with fields chromosome, gene symbol, start, end; and a
   BLASTP tabular file (`-m8` legacy / `-outfmt 6` BLAST+), which may be one or several BLASTP
   outputs combined; homology may substitute via `MCScanX_h`. The paper describes all-vs-all
   BLASTP usage (best five non-self hits per genome) but does not print a literal 4-column
   tab-delimited spec line or a `species_chr` prefix rule. (See §7 quote 3.)
3. **DP scoring / block header.** Scoring recurrence with `MatchScore`, `GapPenalty`,
   `NumberofGaps` is given (quote 1); the exact `.collinearity` block header string is **not**
   printed in the article text read.
4. **Repeat/TE-driven false collinearity quantification.** **ABSENT** — no ~100x / fold /
   numeric statement. Only the tandem/consecutive-match collapse rule addresses dense hits.
5. **Tandem detection / window.** Tandem = adjacent paralogs, gene rank difference = 1; collapse
   rule folds consecutive shared-gene matches whose partners are within five genes into one
   representative pair (smallest E-value). No `-w`-named window in the paper. (See §7 quote 4.)
6. **Block size vs micro/macro-synteny.** The paper ties reporting to score > 250 = at least 5
   collinear gene pairs; it does not frame this explicitly as micro- vs macro-synteny. (Quote 2.)
7. **Gene classification.** Program: `duplicate gene classifier`. Categories: singletons,
   dispersed, proximal (rank diff < 20), tandem (rank diff = 1), WGD/segmental (anchors in
   collinear blocks). Priority WGD/segmental > tandem > proximal > dispersed. (See §7 quote 5.)
8. **Recommended BLASTP E-value.** 10^-5, best five non-self hits per target genome — stated
   as how the paper's own runs were done (in-paper), not framed as a mandatory user setting.
9. **Companion programs.** 3 core (`MCScanX`, `MCScanX_h`, `duplicate gene classifier`) + 12
   downstream (plotters: dual synteny / circle / dot / bar; scripts incl. add Ka/Ks to
   collinearity, group collinear genes, dissect multiple alignment, detect collinear tandem
   arrays, origin enrichment analysis, detect collinearity within gene families, family circle
   plotter, family tree plotter). `MCScanX-transposed` is **NOT** mentioned in this paper.
