---
title: "HAL: a hierarchical format for storing and analyzing multiple genome alignments"
type: paper
source_id: hickey-2013-hal
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC3654707/
doi: 10.1093/bioinformatics/btt128
access_date: "2026-07-03"
license: LicenseRef-CC-BY-3.0
attribution: "Hickey G, Paten B, Earl D, Zerbino D, Haussler D. HAL: a hierarchical format for storing and analyzing multiple genome alignments. Bioinformatics 29(10):1341-1342, 2013. DOI 10.1093/bioinformatics/btt128. Read via PMC open-access full text; note flags CC BY 3.0 license discrepancy."
derived: own-words-summary
---

# HAL: a hierarchical format for storing and analyzing multiple genome alignments

## 1. Citation
Hickey G, Paten B, Earl D, Zerbino D, Haussler D. 2013. "HAL: a hierarchical format for
storing and analyzing multiple genome alignments." *Bioinformatics* 29(10):1341–1342.
doi:10.1093/bioinformatics/btt128. Open-access via PMC: PMC3654707
(https://pmc.ncbi.nlm.nih.gov/articles/PMC3654707/). Accessed 2026-07-03.

## 2. Access note
Read the full main text (Applications Note, ~2 pages) plus Table 1 via PMC. Supplementary
Sections S1–S3 (referenced by the main text for compression and query-time benchmarks) were
NOT accessed — specific benchmark numbers live there and are recorded here only as the
paper's summary claims, not as figures. One inline equation giving the time bound to locate
a segment by position rendered as an image and its exact form was not legible (see §6).

**License discrepancy (must flag):** The invocation described this source as "OUP
all-rights-reserved." The PMC article page states the opposite: it is an **Open Access
article distributed under the Creative Commons Attribution License (CC BY 3.0)**
(http://creativecommons.org/licenses/by/3.0/), "© The Author 2013. Published by Oxford
University Press." CC BY permits verbatim reproduction with attribution. To honor the
invocation's own-words instruction while staying safe, §7 below is written in own-words
paraphrase; functional strings (tool names, format/backend names) are verbatim throughout.
If the project confirms CC BY, §7 could be upgraded to short verbatim quotes.

## 3. Thesis (1 sentence)
HAL is a compressed, graph-based hierarchical alignment format for storing multiple genome
alignments and ancestral reconstructions that is indexed on all genomes (not a single
reference) and organized phylogenetically.

## 4. Problem & context
Existing multiple-alignment formats (the paper names `XMFA` and `MAF`) are indexed or ordered
using a single reference genome, which makes querying with respect to non-reference species
difficult and causes information loss that grows with the number of species and their
phylogenetic distance. HAL is proposed to remove the single-reference constraint.

## 5. Method / approach (the data structure)
- **Phylogenetic decomposition.** The alignment is decomposed into pairwise relationships,
  one for each branch of a rooted phylogenetic tree; ancestral genomes/reconstructions are
  first-class and can be stored.
- **Per-genome arrays.** Each genome consists of up to three arrays: a **sequence array**
  (DNA characters); a **top segment array** (present if the genome has an ancestor); a
  **bottom segment array** (present if the genome has descendants).
- **Graph edges.** For each branch, edges connect **bottom segments** of the ancestral
  genome to **top segments** of the descendant genome.
- **Parse edges.** Each top (resp. bottom) segment *S* is given a parse edge to the bottom
  (resp. top) segment of the *same* genome that overlaps the first base of *S*.
- **Rearrangements / paralogy.** Paralogs are represented as sets of top segments sharing an
  ancestor; inversions are represented by flags on edges between segments; the format
  represents duplications, inversions and transpositions (breakpoint / cycle structure).
- **Column iterators.** Column iterators dynamically transpose the graph (or a desired
  subgraph) into a traditional matrix/block form to iterate across alignment columns —
  bridging the graph representation and the familiar column view.
- **Backend storage.** HAL files are presently stored in **HDF5** (Hierarchical Data
  Format), which supplies indexing, caching and compression.
- **Modular access.** The phylogenetic organization allows modular and parallel access to
  arbitrary subclades.

## 6. Key claims / findings
- HAL is indexed on **all** genomes and organized phylogenetically, unlike single-reference
  formats.
- With the graph held in memory, all segments and DNA bases can be looked up by their array
  index, and all edges traversed, in **O(1)** time.
- Locating the segment(s) containing a specific position takes time as a function of *m*, the
  number of segments (exact bound not legible — rendered as an inline image; plausibly
  logarithmic but NOT confirmed from the text); heuristics improve practical performance.
- The paper claims (citing Supplementary Sections S1 and S3, not accessed here) that HAL
  offers compression **similar to gzip** and **vastly reduced query times compared with MAF**.
  No numeric magnitudes appear in the main text.
- Supports ancestral reconstructions alongside extant genomes.

### HAL toolkit (Table 1 — tool names verbatim)
- `halStats` — print summary statistics of a HAL file.
- `halSummarizeMutations` — print a mutation summary for a given subgraph.
- `halBranchMutations` — generate BED file(s) of mutations for a branch.
- `halLiftover` — map BED coordinates between genomes.
- `hal2maf` / `maf2hal` — convert to and from `MAF`.
- `cactus2hal` — convert from `Cactus`.

## 7. Load-bearing statements (OWN-WORDS paraphrase; functional strings verbatim)
Mode: restrictive/own-words per invocation (see §2 license discrepancy — source is actually
CC BY 3.0). Tool/format/backend names kept verbatim as functional strings.

- HAL is a compressed, graph-based hierarchical alignment format for storing multiple genome
  alignments and ancestral reconstructions (definition).
- For each branch of the phylogenetic tree, HAL-graph edges connect bottom segments of the
  ancestral genome to top segments of the descendant genome.
- Each top (resp. bottom) segment *S* carries a parse edge to the bottom (resp. top) segment
  of the same genome overlapping the first base of *S*.
- In memory, segments and DNA bases are indexable by array position and all edges traversable
  in O(1) time.
- `halLiftover` maps coordinates in a BED file to an arbitrary target genome, letting any
  comparative-genomics annotation be projected into the coordinate system of any chosen
  reference genome.
- `halBranchMutations` produces, per branch, BED file(s) capturing rearrangements
  (duplications, inversions, transpositions) as well as substitutions, insertions and
  deletions.
- Files are presently stored in `HDF5`, which provides indexing, caching and compression.

## 8. Stated scope, assumptions, limitations
The paper is a short Applications Note framing HAL as a solution and does **not** state
explicit limitations, computational caveats, or representational constraints. It assumes a
**rooted phylogenetic tree** is available (the branch decomposition depends on it). The O(1)
lookup claim is explicitly conditioned on the graph being **in memory**.

## 9. Failure modes / invalidity patterns
The paper names no error messages, diagnostics, or explicit invalidity conditions.
Implicit boundary conditions it does spell out:
- The **in-memory** qualifier on O(1) lookup implies out-of-core / on-disk access does not
  carry that guarantee.
- The construction is defined **per branch of a rooted tree**, so it presumes a resolved
  phylogeny; the note does not describe behavior under an unrooted/unknown tree.
No statement about format versioning means downstream compatibility guarantees are
unaddressed (see §10, §12).

## 10. What the source does NOT address (confident silences)
- **No format versioning.** The main text contains no version number, no forward/backward
  compatibility statement, and no migration/deprecation policy for the format. (Directly
  relevant to the guidance's version-breakage question — see §12.)
- No named tool `halSynteny` anywhere in the paper (see §12).
- No numeric benchmark figures in the main text (deferred to Supplementary S1–S3).
- No explicit limitations section.

## 11. Open questions / ambiguities
- Exact time bound to locate a segment by genomic position (illegible inline equation; a
  function of segment count *m*).
- Concrete compression ratios and query-time speedups (in supplement, not accessed).
- How the HDF5-backed on-disk format handles evolution over time (no versioning discussed).

## 12. Guidance answers
- **Is the HAL format explicitly versioned? / any forward-backward compatibility statement?**
  No. The main text makes **no statement** about format versioning or forward/backward
  compatibility. The format-version the paper describes is unnamed/unnumbered here; it only
  states files are "presently stored in HDF5" ("presently" being the sole hint of possible
  change, with no version scheme). This is a recorded ABSENCE — the version-breakage validity
  axis is not backed by an in-paper versioning statement.
- **halLiftover — what it does and I/O.** Maps coordinates in a **BED** file to an arbitrary
  target genome (BED in → mapped BED coordinates in the target's system); projects any
  comparative-genomics information into the coordinate system of any reference genome.
- **halBranchMutations — what events per branch.** Generates **BED** file(s) of mutations for
  a branch, reporting rearrangements (duplications, inversions, transpositions) plus
  substitutions, insertions and deletions.
- **Is halSynteny defined in THIS paper?** No — `halSynteny` is **not mentioned** anywhere in
  this paper. It must be defined by a different source (not this 2013 note; resolve elsewhere).
- **Storage/size or per-column efficiency claim.** Main text claims (via Supplementary S1/S3,
  not accessed) compression "similar to gzip" and "vastly reduced query times" vs `MAF`; O(1)
  in-memory lookup of segments/bases/edges. No per-column numeric efficiency figure in the
  main text.
- **Tool names exactly as printed:** `halStats`, `halSummarizeMutations`, `halBranchMutations`,
  `halLiftover`, `hal2maf`, `maf2hal`, `cactus2hal`. Repository: http://github.com/glennhickey/hal.
