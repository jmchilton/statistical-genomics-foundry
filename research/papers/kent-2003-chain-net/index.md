# Kent et al. 2003 — Evolution's cauldron (chains & nets)

## 1. Citation
Kent WJ, Baertsch R, Hinrichs A, Miller W, Haussler D. 2003. "Evolution's cauldron:
Duplication, deletion, and rearrangement in the mouse and human genomes." *PNAS*
100(20):11484–11489. doi:10.1073/pnas.1932072100. Open-access mirror: PMC208784
(https://pmc.ncbi.nlm.nih.gov/articles/PMC208784/). Accessed 2026-07-03.

## 2. Access note
Full text read via the PMC open-access mirror. License posture: PNAS, freely readable but
all-rights-reserved → this note is written **own-words**; tool/format names and numeric
thresholds are kept verbatim as functional strings (Step 1.5 restrictive mode).

**Capitalization caveat:** the tool names were extracted through a page-to-markdown fetch that
appears to have lower-cased them (rendered as `blastz`, `axtchain`, `chainnet`, `netfilter`,
`netsynteny`, `netclass`, `lavtoaxt`). The UCSC canonical forms are camelCase
(`axtChain`, `chainNet`, `netFilter`, `lavToAxt`, `netSyntenic`, `netClass`); treat the exact
casing as `[re-check against the PDF]`. The concepts/names themselves are firm.

## 3. Thesis
By aligning the whole mouse and human genomes, the paper catalogs duplication, deletion, and
rearrangement across all scales — single base to whole chromosome — using chained/netted
alignments to organize the events. The two genomes are similar enough to align at the DNA level
yet diverged enough to expose substantial structural change.

## 4. Problem & context
Whole-genome pairwise alignment produces many local, gapless alignment blocks that, alone,
don't express large-scale structure (synteny, inversions, duplications, deletions). The paper
introduces a chaining step (assemble co-linear blocks) and a netting step (pick the single best
chain per region, hierarchically) to recover evolutionary events from raw alignments.

## 5. Method / approach (pipeline)
Ordered stages (tool names as printed; casing flagged above):
1. **Masking before alignment.** Transposon-derived repeats masked with `repeatmasker`; simple
   repeats (period ≤ 12) masked with `tandem repeat finder`, prior to alignment.
2. **Local alignment.** `blastz` produced gapless local alignments; `lavtoaxt` converted output.
   Initial `blastz` covered ~35.9% of the human genome.
3. **Chaining (`axtchain`).** Assembles the gapless blocks into **chains** using a variation of a
   k-dimensional tree (kd-tree)-based algorithm. Uses the **same nucleotide scoring matrix as
   `blastz`** but a **novel piecewise linear gap scoring scheme** to form maximally scoring
   chained alignments from the gapless subsections. Block order within a chain must be consistent
   with genomic order **in both species** (co-linearity). Scoring permits **simultaneous gaps in
   both species** (to model overlapping deletions). After chaining, ~34.6% of human bases align
   to mouse.
4. **Netting (`chainnet`).** Builds the **net** hierarchy (see §6 for algorithm).
5. **Post-net classification/filtering.** `netsynteny`, `netclass`, `netfilter` add synteny/class
   annotation and produce a filtered "syntenic subset."

## 6. Key claims / findings (atomic)
- **Chain definition.** A chain is an ordered sequence of pairwise nucleotide alignment "blocks"
  separated by larger gaps, some of which may be simultaneous gaps in both species.
- **Net algorithm.** All bases start "unused." Chains are sorted highest-score-first. Iterating:
  take the next chain, discard the parts intersecting already-covered bases, mark the remainder
  covered. A chain covering bases that fall in a **gap** of a previously taken chain is marked a
  **child** of that chain — forming a hierarchy of chains (parent/child levels).
- **Reference-directionality (asymmetry).** The net is **not symmetric between species**: the
  **human net** allows only the single best-aligning mouse DNA to align to any one place in the
  **human** genome; the **mouse net** is built the opposite way. → target-net vs query-net differ.
- **No numeric chain-length/score threshold is stated.** The number **5000** does not appear in
  the paper; there is no stated minimum chain length or minimum chain score cutoff. (Confirms the
  "5000 bp" figure is UCSC convention, not attributable to Kent 2003.)
- **Syntenic subset rule.** To be "syntenic," a chain must either have a very high score itself,
  or be embedded in a larger chain on the same chromosome from the same region. This subset
  filters out processed pseudogenes while keeping tandem duplications. (Qualitative "very high
  score" — no numeric cutoff given in the text.)
- **Synteny scale.** 344 large (>100-kb) blocks of conserved synteny; these 344 appear at the top
  level of the human net.
- **Chain length distribution.** 579 long chains span 100,000 to ~115,000,000 (≈115 Mb) bases;
  many thousands more short chains at the top level.
- **Per-megabase event rates (excluding transposon insertions).** Per Mb of genomic alignment, on
  average: **2 inversions**, **17 duplications** (5 tandem or nearly tandem), **7 transpositions**,
  and **200 deletions** of 100 bases or more.
- **Larger events within blocks (≥100 kb).** ~160 inversions ≥100 kb; ~75 duplications/
  transpositions ≥100 kb.
- **Nonsyntenic small events.** Nonsyntenic duplications ≈11.9/Mb (mostly processed pseudogenes);
  nonsyntenic transpositions ≈5.0/Mb.
- **Gene loss estimate.** ≈2% of genes present in the human/mouse common ancestor were deleted in
  the mouse lineage.
- **Coding coverage.** The complete net covers 96.7% of RefSeq coding regions; the syntenic subset
  covers 93.0%.
- **Gap-size distribution.** Gap sizes do not follow a geometric distribution; Alu insertions
  create a peak around ~300 bases.

## 7. Load-bearing statements (own-words paraphrase — restrictive license)
No verbatim prose reproduced; facts/terms/numbers preserved. Functional strings (tool names,
numbers) verbatim per Step 1.5.
- A chain = an ordered sequence of gapless alignment "blocks" separated by larger gaps, some of
  which may be simultaneous gaps in both species.
- `axtchain` reuses the `blastz` nucleotide scoring matrix but adds a **piecewise linear gap
  scoring scheme** to build maximally scoring chains; block order must be consistent with genomic
  order in both species.
- Net construction: bases begin unused; chains sorted highest-score-first; each chain is trimmed
  to the not-yet-covered bases, which are then marked covered; a chain landing in a prior chain's
  gap becomes that chain's child — yielding a chain hierarchy.
- The net is asymmetric: the human net keeps only the single best mouse DNA per human position;
  the mouse net is built oppositely.

## 8. Stated scope, assumptions, limitations
- Method is a **pairwise** human↔mouse comparison; the net is inherently **directional/
  reference-anchored** (one genome is the axis the "best chain per position" is chosen against).
- Event counts are derived from what aligns; the ~34.6% aligned fraction bounds the analysis
  (regions that don't align aren't classified).
- "Very high score" for the syntenic subset is a qualitative rule as stated; the paper's printed
  text (as read) gives no numeric score cutoff for it.

## 9. Failure modes / invalidity patterns
- **Reference-bias / asymmetry.** Because the net keeps only one best chain per position on the
  reference side, human-net and mouse-net results differ; conclusions about "the" alignment depend
  on which genome is the target. Using the wrong-direction net is a validity error the asymmetry
  statement warns against.
- **Repeat-driven spurious alignment.** Handled by masking transposons (`repeatmasker`) and simple
  repeats period ≤12 (`tandem repeat finder`) **before** alignment; skipping masking would inflate
  spurious chains. (Paper prescribes masking as the guard; it doesn't quantify the failure if
  omitted — `[summarizer-inferred]` that omission causes spurious chains.)
- **Processed pseudogenes masquerading as duplications.** The syntenic-subset filter
  (`netfilter` + score/embedding rule) is the named detector separating processed pseudogenes
  (nonsyntenic) from real tandem duplications (kept).

## 10. What the source does NOT address
- No fixed numeric minimum chain length or chain score (no 5000). 
- Not a multi-species/graph alignment method — strictly pairwise, one reference at a time.
- Exact `blastz` scoring-matrix values and the piecewise-linear gap penalty coefficients are named
  but not tabulated in the read text.

## 11. Open questions / ambiguities
- Precise numeric thresholds behind "very high score" and top-level vs child assignment are not
  given in the read text (may live in supplementary/UCSC docs, not this paper).
- Exact camelCase of the tool names (`axtChain`/`chainNet`/etc.) needs confirmation against the
  PDF; the fetched markdown lower-cased them.

## 12. Guidance answers
- **Chain/net algorithm ordering & definitions.** Captured (§5, §6, §7): local `blastz` blocks →
  `axtchain` assembles co-linear chains (order consistent in both species; simultaneous gaps
  allowed; piecewise linear gap scoring) → `chainnet` selects best chain per region, sorting by
  score and marking gap-filling chains as children (hierarchy).
- **Reference asymmetry / directionality.** Yes — explicitly stated and paraphrased (§6, §7):
  the net is not symmetric; the human net keeps only the single best mouse DNA per human position,
  the mouse net the opposite. Backs the reference-bias validity axis.
- **Minimum chain length / score threshold?** **Absent.** No such number; **5000 does not appear**.
  Keep "5000 bp" labeled UCSC convention, not cited to Kent 2003. (§6)
- **Repeat handling.** Yes — `repeatmasker` for transposons and `tandem repeat finder` for simple
  repeats (period ≤ 12) mask sequence **before** `blastz`; the syntenic subset further filters
  processed pseudogenes. (§5, §9)
