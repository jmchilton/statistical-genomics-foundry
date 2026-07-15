---
title: "MUMmer4: A fast and versatile genome alignment system"
type: paper
source_id: marcais-2018-mummer4
source_url: https://doi.org/10.1371/journal.pcbi.1005944
doi: 10.1371/journal.pcbi.1005944
access_date: "2026-07-03"
license: CC0-1.0
license_file: LICENSES/CC0-1.0.LICENSE
attribution: "Marçais G, Delcher AL, Phillippy AM, Coston R, Salzberg SL, Zimin A. MUMmer4: A fast and versatile genome alignment system. PLOS Computational Biology 14(1):e1005944, 2018. DOI 10.1371/journal.pcbi.1005944. Article page states CC0 public domain dedication."
derived: license-aware-summary
---

# MUMmer4: A fast and versatile genome alignment system

## 1. Citation
Marçais G, Delcher AL, Phillippy AM, Coston R, Salzberg SL, Zimin A. 2018. "MUMmer4: A fast
and versatile genome alignment system." *PLoS Computational Biology* 14(1):e1005944.
doi:10.1371/journal.pcbi.1005944. Open access: https://doi.org/10.1371/journal.pcbi.1005944
Published 2018-01-26. Access date: 2026-07-03 (article HTML via journals.plos.org).

License: **CC0 public domain dedication** (the article page states it is "free of all
copyright" and "made available under the Creative Commons CC0 public domain dedication").
This is *more* permissive than the CC BY assumed in guidance; short verbatim load-bearing
quotes are allowed without restriction.

## 2. Access note
Read the full article HTML (abstract, Design and Implementation, Results). Extraction was
done via automated fetch of the article page; the quotes below were re-pulled and
cross-checked across multiple fetches for stability. I did not read the supplementary files
or the software manual/README (only the paper). Where a claim depends on exact option-name
wording, I flag what the paper does vs. does not literally state.

## 3. Thesis (1 sentence)
MUMmer4 is a rewrite of the widely-used MUMmer/nucmer genome aligner that removes the old
genome-size limit and adds speed via a 48-bit suffix array and parallelism, while keeping the
same anchor→cluster→extend alignment pipeline and output formats.

## 4. Problem & context
The MUMmer system and its nucmer aligner are among the most widely used genome alignment
packages, but MUMmer3 used a 32-bit suffix tree that capped the reference size (~few Gb) and
was single-threaded. MUMmer4 replaces that index with a 48-bit suffix array, lifting the
size limit to sequences up to 2^48 bp and enabling multi-threaded (parallel) search.

## 5. Method / approach — the nucmer pipeline
nucmer is driven by a `nucmer` Perl program that runs a 4-stage pipeline. Verbatim (Design
and Implementation):

> "The NUCmer pipeline consists of 4 main programs driven by the nucmer Perl program:
> (1) preprocessing of the input sequences (the prenuc program), (2) finding exact seed
> matches (the mummer program), (3) clustering of matches (the mgaps program), and (4)
> extending and joining matches (the postnuc program)."

Stage detail (per the paper's descriptions):
- **prenuc** — preprocesses / transforms the input reference multi-FASTA into the valid
  internal format.
- **mummer** — finds exact seed matches between query and reference that are maximal in
  length (the anchors).
- **mgaps** — clusters the exact matches by proximity (groups nearby anchors that can belong
  to one alignment).
- **postnuc** — extends and joins consecutive exact matches; uses a banded Smith-Waterman
  alignment to fill the gaps between clustered anchors into full alignments.

So the ordering the guidance asked about is: **maximal-exact-match anchoring (mummer) →
clustering (mgaps) → gapped extension via banded Smith-Waterman (postnuc)**, after a prenuc
preprocessing step.

**Anchor / match-uniqueness modes.** Verbatim (Design and Implementation):

> "By default, mummer finds all matches between a query sequence and a reference sequence
> that are unique in the reference, called Maximal Unique Matches (MUMs). A command-line
> option allows mummer to instead find all matches that are unique in both the query and the
> reference, or to find all Maximal Exact Matches (MEMs) regardless of uniqueness."

And, verbatim: > "This behavior can be modified with the `--maxmatch` switch at the expense
of run time."

Mapping to the three flag names the guidance asked about (`--mum`, `--mumreference`,
`--maxmatch`):
- Only `--maxmatch` appears **literally** in the paper text; it switches to "all Maximal
  Exact Matches (MEMs) regardless of uniqueness," at the expense of run time (more output,
  slower).
- The default behavior the paper describes — matches "unique in the reference," called MUMs —
  is what the tool's `--mum`/`--mumreference` family controls, but the paper does **not**
  print those two flag names or map them one-to-one. The paper describes three behaviors
  (unique-in-reference = default/MUMs; unique-in-both-query-and-reference; all-MEMs) without
  attaching the literal `--mum` / `--mumreference` identifiers to the first two.
- Note a definitional wrinkle: the paper's wording defines the default MUM as unique **in the
  reference** and the alternative as unique **in both**. (The classical MUM definition is
  "unique in both"; do not silently "correct" the paper — this note records the paper's own
  wording. [summarizer-inferred] flag on the mismatch only.)

**Output format.** Verbatim: > "The original output format of nucmer, the delta format,
contains only the minimum information necessary to quickly recreate the alignment." The
**delta** file "can be used by other MUMmer utilities to produce alignments, SNP reports, and
plots." (MUMmer4 also adds SAM output as a new option, per the paper's framing of new
features.)

**Default parameters:** the paper does not enumerate a default-parameter table (e.g. minimum
cluster length, break length, minimum match length) in the article text I read; those live in
the manual, not this paper.

## 6. Key claims / findings (atomic)
- MUMmer4 replaces MUMmer3's 32-bit suffix tree with a 48-bit suffix array, removing the old
  genome-size limit and allowing sequences up to 2^48 bp.
- The suffix-array index enables multi-threaded / parallel exact-match search (a speed source
  over single-threaded MUMmer3).
- nucmer pipeline = prenuc → mummer (exact seeds) → mgaps (cluster) → postnuc (extend/join
  via banded Smith-Waterman).
- Default anchor mode finds matches unique in the reference (MUMs); options relax to
  unique-in-both or (with `--maxmatch`) all MEMs regardless of uniqueness, the latter at the
  expense of run time and output volume.
- Output = delta format (minimal info to recreate alignment); MUMmer4 additionally supports
  SAM output.
- **Human vs. chimpanzee demonstration:** ~2.782 Gb in mutual best alignments with **average
  identity 98.07%**; abstract states the two species are "98% identical across 96% of their
  length."
- **Read-mapping sensitivity:** "Nucmer4 is less sensitive, it aligns 3-5% fewer reads than
  BWA or Bowtie2," for two stated reasons — (1) it seeds with relatively long exact matches,
  and (2) by default the seeds must be unique in the reference.
- **No minimum sequence-identity threshold is stated anywhere in the paper.** (See §12.)

## 7. Load-bearing statements (VERBATIM — CC0, reproduction unrestricted)
1. (Abstract) "The MUMmer system and the genome sequence aligner nucmer included within it
   are among the most widely used alignment packages in genomics."
2. (Design and Implementation) "The NUCmer pipeline consists of 4 main programs driven by the
   nucmer Perl program: (1) preprocessing of the input sequences (the prenuc program),
   (2) finding exact seed matches (the mummer program), (3) clustering of matches (the mgaps
   program), and (4) extending and joining matches (the postnuc program)."
3. (Design and Implementation) "By default, mummer finds all matches between a query sequence
   and a reference sequence that are unique in the reference, called Maximal Unique Matches
   (MUMs). A command-line option allows mummer to instead find all matches that are unique in
   both the query and the reference, or to find all Maximal Exact Matches (MEMs) regardless
   of uniqueness."
4. (Results, read mapping) "Nucmer4 is less sensitive, it aligns 3-5% fewer reads than BWA or
   Bowtie2, likely due to two reasons. First, it uses relatively long exact matches to seed
   its alignments... Second, by default, the seeds must be unique in the reference sequence."
5. (Design and Implementation) "The original output format of nucmer, the delta format,
   contains only the minimum information necessary to quickly recreate the alignment."

## 8. Stated scope, assumptions, limitations (source's own)
- nucmer's exact-match seeding + default uniqueness requirement make it **less sensitive** for
  short-read mapping than dedicated read mappers (BWA/Bowtie2), by the paper's own admission
  (3-5% fewer reads).
- The paper frames MUMmer/nucmer as a general-purpose whole-genome/large-sequence aligner;
  read mapping is presented as a demonstration, not its primary design target.
- Future-work items (protein aligner promer maintenance) imply protein-level/divergent
  alignment is out of nucmer's DNA scope and handled by a sibling tool.

## 9. Failure modes / invalidity patterns
- **Divergent / low-identity sequences:** nucmer seeds on *long exact matches*; when two
  sequences share few long exact substrings (high divergence), fewer/no anchors are found and
  alignments are missed. The paper states the sensitivity cost explicitly for reads (3-5%
  fewer) and attributes it to long-exact-match seeding + reference-uniqueness. [The paper does
  not name an identity value below which nucmer fails — see §12.]
- **Repetitive sequence under default (unique) mode:** default seeds must be unique in the
  reference, so repeats are not seeded; `--maxmatch` recovers them but "at the expense of run
  time" and "can produce very large amounts of output" [summarizer-inferred that large output
  is a practical failure/slowdown mode; the paper states the run-time cost].
- No error-message-level detector is quoted; the observable symptom is reduced aligned
  fraction / dropped alignments in divergent or repeat-heavy regions.

## 10. What the source does NOT address
- No stated **minimum sequence identity** or reliable-identity **range** for nucmer.
- No default-parameter table (min match/cluster length, break length) in the article text.
- No literal one-to-one listing mapping `--mum` and `--mumreference` flag names to their
  behaviors (only `--maxmatch` is named literally).
- Protein-level / translated alignment for divergent sequences is deferred to promer, not
  covered here.

## 11. Open questions / ambiguities
- The paper defines default MUMs as "unique in the reference," which reads differently from
  the classical MUM = "unique in both sequences." Which the shipping `--mum` flag actually
  enforces is not resolvable from the paper alone (manual needed).
- Exact default numeric parameters (seed length, cluster/gap thresholds) are not in the paper.

## 12. Guidance answers
- **">=70% identity floor for nucmer?"** — **No such floor appears in this paper.** The paper
  states no minimum sequence identity and no target identity range for nucmer. It reports
  identity *outcomes* of specific alignments (human-chimp average identity 98.07%; "98%
  identical across 96% of their length") but never sets an operational identity threshold. The
  external skill's attribution of ">=70% identity" to this paper is **not supported here** —
  treat it as an over-claim / a threshold sourced elsewhere (or convention), not from Marçais
  2018.
- **nucmer procedure / stage ordering & delta name** — captured in §5 and §7 (quotes 2 and 5):
  prenuc → mummer (maximal exact-match anchors) → mgaps (clustering by proximity) → postnuc
  (banded Smith-Waterman gapped extension); output format is the **delta** format.
- **--maxmatch vs --mum vs --mumreference** — §5 and §7 quote 3. Default = unique in reference
  (MUMs); an option relaxes to unique-in-both; `--maxmatch` = all MEMs regardless of
  uniqueness, "at the expense of run time." Only `--maxmatch` is named literally in the paper;
  the other two flag names are not printed in the article text.
- **Speed/identity (sensitivity) tradeoff** — §7 quote 4: nucmer is *less sensitive* (3-5%
  fewer reads than BWA/Bowtie2) because of long exact-match seeding and default reference
  uniqueness. This is the paper's clearest statement that the exact-seed strategy costs
  sensitivity where matches are short/non-unique (i.e., divergent or repetitive) — but it is
  framed in read-mapping terms, not as an identity floor.
- **Version pinning** — the paper describes "MUMmer4" (published 2018-01-26); it does not
  print a "4.0.0" point version string in the text I read. The skill's pin of "4.0.0+" is
  consistent with the paper being about the 4.x line but the exact "4.0.0" tag is not
  quotable from this article.
