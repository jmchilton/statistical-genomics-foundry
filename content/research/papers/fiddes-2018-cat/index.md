---
title: "Comparative Annotation Toolkit (CAT)-simultaneous clade and personal genome annotation"
type: paper
source_id: fiddes-2018-cat
source_url: https://pmc.ncbi.nlm.nih.gov/articles/PMC6028123/
doi: 10.1101/gr.233460.117
access_date: "2026-07-03"
license: LicenseRef-CC-BY-NC-4.0
attribution: "Fiddes IT, Armstrong J, Diekhans M, Nachtweide S, Kronenberg ZN, Underwood JG, Gordon D, Earl D, Keane T, Eichler EE, Haussler D, Stanke M, Paten B. Comparative Annotation Toolkit (CAT)-simultaneous clade and personal genome annotation. Genome Research 28(7):1029-1038, 2018. DOI 10.1101/gr.233460.117. Read via PMC open-access full text; note records CC BY-NC 4.0 posture."
derived: license-aware-summary
---

# Comparative Annotation Toolkit (CAT) — Fiddes et al. 2018

## 1. Citation
Fiddes IT, Armstrong J, Diekhans M, Nachtweide S, Kronenberg ZN, Underwood JG, Gordon D,
Earl D, Keane T, Eichler EE, Haussler D, Stanke M, Paten B. 2018. "Comparative Annotation
Toolkit (CAT)—simultaneous clade and personal genome annotation." *Genome Research*
28(7):1029–1038. doi:10.1101/gr.233460.117. PMC6028123.
OA URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC6028123/
Software repo (from Methods): https://github.com/ComparativeGenomicsToolkit/Comparative-Annotation-Toolkit

## 2. Access note
Full text read via PMC (open access). License: "© 2018 Fiddes et al.; Published by Cold
Spring Harbor Laboratory Press"; distributed exclusively by CSHL Press for the first six
months, then available under **Creative Commons Attribution-NonCommercial 4.0 International
(CC BY-NC 4.0)**. Published 2018 → well past the 6-month embargo, so CC BY-NC applies.
Quoting mode: **permissive** — short verbatim load-bearing quotes allowed with attribution
(§7). No paywall boundary.

## 3. Thesis (1 sentence)
CAT is a fully open-source toolkit that uses a reference-free progressive whole-genome
alignment to simultaneously annotate entire clades and identify orthology relationships,
including for personal diploid human genomes. (Abstract)

## 4. Problem & context
Genome annotation traditionally proceeds one genome at a time and is often reference-based.
CAT reframes annotation as a *comparative* problem driven by a Progressive Cactus alignment,
which — unlike most earlier alignment methods — is not reference based and includes
duplications, making it suitable for many-to-many orthology. Goal: annotate many genomes at
once, consistently, and transfer/discover gene models across a clade.

## 5. Method / approach
**Required inputs:** a HAL (hierarchical alignment format) multiple-genome alignment produced
by Progressive Cactus, plus a GFF3 annotation for the previously annotated genome(s).

**Component tools CAT integrates (the load-bearing list):**
- **TransMap** — projects existing annotations between genomes *using the Progressive Cactus
  alignment*; projections filtered by a user-tunable minimum-coverage flag, then the single
  highest-scoring alignment is chosen.
- **AUGUSTUS**, run in up to four parameterizations:
  - **AugustusTM / AugustusTMR** — the two transMap-projection-based modes. AugustusTMR adds
    RNA-seq hints ("RNA-seq helps fill in missing information in the alignment and resolve
    evolutionary changes").
  - **AugustusCGP** — comparative (Comparative Gene Prediction); "performs simultaneous
    comparative prediction on all aligned genomes"; ab initio; RNA-seq "additionally helps
    prevent false positives inherent in ab initio gene finding."
  - **AugustusPB** — "uses long-read RNA-seq to discover novel isoforms" (PacBio Iso-Seq).
  (Paper: "CAT will run AUGUSTUS in up to four distinct parameterizations, two of which rely
  on transMap projections (AugustusTMR) and two that perform ab initio predictions
  (AugustusCGP and AugustusPB).")
- **homGeneMapping** — "uses the Cactus alignments to project features such as annotations and
  RNA-seq support between the input genomes."
- **Consensus-finding algorithm** (CAT's own) — "combines all sources of transcript evidence
  into an annotation set," evaluating transMap transcripts against user-tunable RNA-seq /
  annotation-support flags, then considering ab initio transcripts by locus assignment and
  their contribution of novel splice junctions supported by RNA-seq or Iso-Seq.

**Orchestration:** CAT is constructed using the **Luigi** workflow manager
(https://github.com/spotify/luigi), with **Toil** used for computationally intensive steps
best submitted to a compute cluster. (NOT Snakemake — see §12.)

**Outputs:** diagnostic plots, an annotation set for each target genome, orthology mappings,
and a **UCSC comparative assembly hub** ready to load in the UCSC Genome Browser.

## 6. Key claims / findings
- CAT can improve rat annotation, annotate the great apes, annotate a diverse set of mammals,
  and annotate personal diploid human genomes. (Abstract)
- **Rat:** consensus gene set represents an increase of 14,675 genes and 74,308 transcripts
  over Ensembl V90; 5104 genes and 32,157 transcripts over RefSeq; 14,541 genes and 81,022
  transcripts over MAKER2.
- **Great apes:** an average of 1677 novel isoforms and 64 novel loci were found across the
  assemblies with at least one Iso-Seq read supporting the prediction.
- Progressive Cactus alignments are reference-free and include duplications → suitable for
  many-to-many orthology (contrast with reference-based aligners).
- Annotating multiple genomes simultaneously and consistently solves a key scalability issue
  and yields orthology mappings as a byproduct. (Discussion)

## 7. Load-bearing statements (VERBATIM — permissive CC BY-NC license)
1. (Abstract, thesis) "We describe the fully open source Comparative Annotation Toolkit (CAT),
   which provides a flexible way to simultaneously annotate entire clades and identify
   orthology relationships."
2. (Results, inputs) "The only required inputs are a hierarchical alignment format (HAL)
   multiple genome alignment as produced by Progressive Cactus and a GFF3 format annotation
   file for the previously annotated genome(s)."
3. (Results, components) "Based on input parameters, CAT will run AUGUSTUS in up to four
   distinct parameterizations, two of which rely on transMap projections (AugustusTMR) and two
   that perform ab initio predictions (AugustusCGP and AugustusPB)."
4. (Methods, orchestration) "CAT is constructed using the Luigi workflow manager, with Toil
   used for computationally intensive steps that work best when submitted to a compute
   cluster."
5. (Introduction, advantage) "Progressive Cactus alignments are not reference based, include
   duplications, and are thus suitable for the annotation of many-to-many orthology
   relationships."

## 8. Stated scope, assumptions, limitations
- Requires a Progressive Cactus / HAL alignment and at least one existing GFF3 annotation as
  substrate — CAT does not build the alignment itself.
- Novel-isoform / novel-locus discovery depends on RNA-seq and long-read (Iso-Seq) evidence
  being available; novel calls are supported by ≥1 Iso-Seq read.
- Ab initio prediction (AugustusCGP) carries false-positive risk that RNA-seq hints mitigate
  but do not eliminate.

## 9. Failure modes / invalidity patterns
- transMap projections are filtered by a user-tunable minimum-coverage flag; low coverage →
  projection dropped, so poor/incomplete alignments propagate to missing annotations.
- Consensus inclusion is gated on user-tunable RNA-seq / annotation-support flags; without
  RNA-seq or Iso-Seq evidence, ab initio novel splice junctions are not admitted.
- [summarizer-inferred] Because CAT annotates *relative to* provided reference annotation(s),
  errors or biases in the input GFF3 can propagate across the clade via projection.

## 10. What the source does NOT address
- Does not describe LiftOff (LiftOff post-dates 2018; absent from the paper — see §12).
- Does not use Snakemake.

## 11. Open questions / ambiguities
- Paper collectively parenthesizes the two transMap-based modes as "(AugustusTMR)" while the
  tooling distinguishes AugustusTM (no RNA-seq) vs AugustusTMR (with RNA-seq); the main-text
  sentence names only the RNA-seq variant explicitly.

## 12. Guidance answers
- **What CAT integrates (exact set):** TransMap (projection over the Cactus alignment) +
  AUGUSTUS in up to four modes (AugustusTM / AugustusTMR = transMap-based; AugustusCGP,
  AugustusPB = ab initio) + homGeneMapping + CAT's own consensus-finding algorithm.
  Orchestrated by Luigi + Toil.
- **LiftOff discrepancy (load-bearing):** LiftOff is **NOT** part of 2018 CAT — the word
  "LiftOff" appears nowhere in the paper. CAT's projection engine is **TransMap**, not LiftOff.
  (LiftOff, Shumate & Salzberg, was published in 2020, post-dating this paper — that dating is
  general knowledge, not from this source.) Any claim that CAT = "AUGUSTUS + TransMap +
  LiftOff" is wrong on the LiftOff element.
- **Cactus/HAL substrate:** Yes — the only required inputs are a HAL alignment produced by
  Progressive Cactus plus a GFF3 for the annotated genome(s). Verbatim in §7 #2.
- **Workflow engine:** Luigi (Spotify) + Toil — **not Snakemake.** The guidance's
  "Snakemake/Toil-driven" is half wrong: Toil yes, Snakemake no; the top-level manager is
  Luigi. Verbatim in §7 #4.
- **Outputs / use cases:** per-genome annotation sets, orthology mappings, diagnostic plots,
  UCSC comparative assembly hub; novel isoform/locus discovery. Use cases: rat, great apes,
  diverse mammals, personal diploid human. (§5, §6)
- **Advantage over single-tool / single-reference projection:** the reference-free,
  duplication-aware Cactus alignment supports many-to-many orthology and simultaneous
  consistent multi-genome annotation, with a consensus step merging all evidence sources —
  vs. a single reference-based projection. Verbatim in §7 #5.
- **Repo/config invocation:** repo URL captured (§1); no explicit CLI invocation command shown
  in the main text.
