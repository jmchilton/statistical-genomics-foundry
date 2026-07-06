---
title: "CESAR 2.0 substantially improves speed and accuracy of comparative gene annotation"
type: paper
source_id: sharma-hiller-2017-cesar2
source_url: https://academic.oup.com/bioinformatics/article/33/24/3985/4095639
doi: 10.1093/bioinformatics/btx527
access_date: "2026-07-03"
license: LicenseRef-all-rights-reserved
attribution: "Sharma V, Schwede P, Hiller M. CESAR 2.0 substantially improves speed and accuracy of comparative gene annotation. Bioinformatics 33(24):3985-3987, 2017. DOI 10.1093/bioinformatics/btx527. Oxford University Press article page; summarized in own words."
derived: own-words-summary
---

# CESAR 2.0 substantially improves speed and accuracy of comparative gene annotation

## 1. Citation
Sharma V, Schwede P, Hiller M. 2017. "CESAR 2.0 substantially improves speed and accuracy of
comparative gene annotation." *Bioinformatics* 33(24):3985–3987.
doi:10.1093/bioinformatics/btx527. PMID 28961744.
Source code: https://github.com/hillerlab/CESAR2.0
Access date: 2026-07-03.

## 2. Access note
Read the article HTML at academic.oup.com (article/33/24/3985/4095639). This is a 3-page
Applications Note; figures were available as captions in the fetched text. I could read the
Abstract, Introduction, Methods description, and Results. I did NOT open the GitHub repository —
per contract I worked only from the paper. Consequences: CLI invocation form and exact parameter
names are NOT in the paper (paper only points to the repo), so those are unrecoverable from this
note (see §7, §10).

## 3. Thesis (1 sentence)
CESAR 2.0 is a re-engineered Hidden-Markov-Model exon realigner that projects coding-gene
annotation from a reference genome to aligned query genomes ~77× faster and with ~31× less memory
than the previous version, while also improving splice-site and exon-boundary accuracy.

## 4. Problem & context
Comparative gene annotation transfers the annotation of a reference genome to other genomes using
whole-genome alignments. CESAR ("Coding Exon-Structure Aware Realigner") realigns exon sequences
using an HMM that captures the exon's reading frame and splice-site annotation, so that projected
exons preserve reading frame across insertions/deletions and place splice sites correctly. The
prior CESAR version had two limitations the paper targets: (1) it realigns only individual exons
(one exon at a time), and (2) it is slow and memory-hungry, and it mis-aligns splice sites that
have shifted a larger distance into the intron or exon.

## 5. Method / approach
- **Model.** CESAR 2.0 is a Hidden Markov Model that captures the reading frame and splice-site
  annotation of the reference exon; it uses the Viterbi algorithm to realign the exon sequence
  against the query genomic locus.
- **Gene mode (new).** 2.0 implements a "gene mode" that aligns ALL exons of a coding gene to the
  query genomic locus jointly, rather than realigning individual exons one at a time (the only
  capability of the previous version).
- **Splice-site handling (new).** The model assigns higher probability to frame-preserving
  insertions and deletions immediately downstream of the acceptor splice-site state and immediately
  upstream of the donor splice-site state; this is what lets it recover splice sites that have been
  shifted a larger distance.
- **Speed/memory re-engineering.** The implementation was re-engineered to reduce runtime and
  memory (the paper reports the resulting factors; it does not enumerate low-level parameter
  values / gap penalties / probability weights in the text).
- **Benchmarks used.**
  - Speed: measured across 5,977 exons; separately reported for exons >500 bp.
  - Real-scale run: mapped all 19,919 human genes (196,259 exons) to the mouse genome on a single
    desktop core.
  - Splice-site accuracy: in-silico evolution shifting one splice site into the intron or into the
    exon; sampled 10 different evolutionary distances at 0.1–1 substitutions per site (Fig. 1C).
  - Exon-boundary accuracy: counted exons where both boundaries were correctly detected.
- **Deliverable.** Source code freely available at the GitHub URL above; the authors provide a
  workflow so users can apply CESAR 2.0.

## 6. Key claims / findings (atomic)
- Average speedup of CESAR 2.0 over the previous version is **77×** across 5,977 exons.
- Memory requirement is **31 times less** than the previous version.
- For exons **longer than 500 bp**, the average speedup is **178×**.
- Mapping all 19,919 human genes (196,259 exons) to mouse took **7 h on a single core** on a
  desktop computer, **126× faster** than the previous implementation.
- The previous version correctly aligned shifted splice sites in **91%** of cases.
- CESAR 2.0 gives **~33% higher accuracy** on the dataset where splice sites were shifted over a
  large average distance of **36 bp**.
- CESAR 2.0 correctly detected both boundaries of **1,396 additional exons**, raising precision of
  correctly annotated exons from **95.9% to 96.3%**.
- Example (Fig. 1D): for a **30 bp acceptor shift in cow** in the *MAMSTR* gene, only CESAR 2.0
  (not the previous version) identifies the shifted splice site and thus the correct exon start.
- The gene mode aligns all exons of a gene jointly to the query locus; the previous version could
  realign only individual exons.

## 7. Load-bearing statements — OWN-WORDS MODE (source is All-Rights-Reserved)
License is "© The Author 2017. Published by Oxford University Press. All rights reserved."
(Standard Journals Publication Model) — NOT open-access / not Creative Commons. Therefore no
verbatim prose quotes; the statements below are paraphrases. Functional strings (numeric factors,
counts, thresholds, the repo URL) are reproduced verbatim as facts.
- CESAR is a coding-exon-structure-aware realigner; its HMM encodes the reference exon's reading
  frame and splice-site annotation and realigns via Viterbi. (own-words)
- The new gene mode aligns all exons of a coding gene to the query genomic locus jointly; the prior
  version realigned only individual exons. (own-words)
- Headline factors (verbatim as facts): **77×** faster, **31×** less memory, **178×** for exons
  >500 bp, **126×** faster on the 19,919-gene / 196,259-exon human→mouse run (**7 h, single
  core**), previous splice-site accuracy **91%**, **~33%** higher accuracy at **36 bp** average
  shift, precision **95.9% → 96.3%**, **1,396** additional exons with both boundaries correct,
  **30 bp** acceptor shift in the cow *MAMSTR* example, in-silico evolution **0.1–1 substitutions
  per site**, **10** evolutionary distances.
- Repo (verbatim): https://github.com/hillerlab/CESAR2.0

## 8. Stated scope, assumptions, limitations
- CESAR realigns exon sequences that are already located via a whole-genome alignment — it is a
  realignment/projection step operating on aligned loci, not a de-novo gene finder.
- Benchmarks are reference→query projections (human→mouse used for the real-scale timing) and
  in-silico-evolved sequences for the splice-site-shift accuracy test.
- The paper does not state an evolutionary-divergence limit (see §9, §12).

## 9. Failure modes / invalidity patterns
- **Splice-site shifts** relative to the reference are the named hard case: when a splice site has
  moved a larger distance into the intron or exon, the previous version fails to align it correctly
  (91% accuracy overall; worse at large shifts). CESAR 2.0's downstream-of-acceptor /
  upstream-of-donor indel-probability handling is the fix; the residual error is the un-recovered
  fraction (2.0 improves ~33% at 36 bp average shift but the paper does not claim 100%).
- **Exon boundaries**: even 2.0 correctly detects both boundaries at 96.3% precision — i.e. ~3.7%
  of exons still have at least one mis-detected boundary. [summarizer-inferred: complement of the
  stated precision; the paper reports precision, not the error rate directly.]
- The paper does NOT name a divergence threshold beyond which projection becomes invalid, nor an
  identity cutoff, nor an error message / diagnostic string.

## 10. What the source does NOT address (confident silences)
- No CLI invocation syntax, command form, flag names, or parameter/default values in the paper text
  (deferred to the GitHub repo).
- No explicit divergence range in Myr and no percent-identity reliability window.
- No mention of TOGA (the paper predates it / does not reference it).
- No specific HMM numeric parameters (transition probabilities, gap penalties, the exact "higher
  probability" values for the frame-preserving indels near splice sites).

## 11. Open questions / ambiguities
- Over what evolutionary distance does exon projection stay reliable? The in-silico test spans
  0.1–1 substitutions/site but the paper draws no reliability cutoff from it.
- What are the actual command-line and parameter defaults? Not in the paper — would require the
  repo / manual.

## 12. Guidance answers
- **What CESAR 2.0 is / does:** Confirmed — HMM-based, codon/reading-frame- and splice-site-aware
  realigner projecting reference exons onto aligned query genomes, preserving reading frame across
  indels and placing splice sites. (§3–§5)
- **Gene mode (joint vs one-at-a-time) — quote requested:** Under the restrictive license, own-words:
  2.0's gene mode aligns ALL exons of a coding gene jointly to the query locus; the previous version
  realigned only individual exons. (§5, §6)
- **Speed/accuracy vs CESAR 1.0 — exact numbers:** 77× faster, 31× less memory (headline); 178× for
  exons >500 bp; 126× faster on the human→mouse whole-proteome run (7 h, single core); previous
  splice-site accuracy 91%, +~33% at 36 bp average shift; exon-boundary precision 95.9%→96.3%
  (+1,396 exons). "Improved splice-site alignment over larger shifts" concretely = recovering splice
  sites shifted a larger distance (avg 36 bp) into intron/exon, e.g. the 30 bp cow *MAMSTR* acceptor
  shift that only 2.0 recovers. (§6)
- **Divergence calibration (~150 Myr claim):** The paper gives **NO** divergence figure in Myr and
  **NO** percent-identity reliability window. The only distance-like quantity is the in-silico range
  0.1–1 substitutions/site over 10 sampled distances, from which the paper draws no reliability
  boundary. So the skill's "~150 Myr (vertebrate)" number is **NOT supported by this paper** —
  treat it as convention / sourced elsewhere, not attributable here.
- **Relationship to TOGA:** **Not mentioned** in this paper. Any CESAR-inside-TOGA linkage is
  external to this source. [summarizer-inferred that it is external — the paper is silent.]
- **Must-capture verbatim (CLI form / parameters):** NOT present in the paper — no CLI syntax or
  parameter names given; only the repo URL https://github.com/hillerlab/CESAR2.0. Unrecoverable
  from this source.
- **Must-capture verbatim (numeric divergence/identity thresholds):** None stated in the paper (see
  divergence answer above).
