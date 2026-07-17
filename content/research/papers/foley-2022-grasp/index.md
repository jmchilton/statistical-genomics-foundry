---
title: "Engineering indel and substitution variants of diverse and ancient enzymes using GRASP"
type: paper
source_id: foley-2022-grasp
source_url: https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1010633
doi: 10.1371/journal.pcbi.1010633
access_date: "2026-07-03"
license: CC-BY-4.0
license_file: LICENSES/CC-BY-4.0.LICENSE
attribution: "Foley G, Sützl L, D'Cunha SA, Gillam EMJ, Bodén M. Engineering indel and substitution variants of diverse and ancient enzymes using GRASP. PLOS Computational Biology 18(10):e1010633, 2022. DOI 10.1371/journal.pcbi.1010633. Open access under the Creative Commons Attribution License."
derived: license-aware-summary
tags:
  - domain/ancestral-reconstruction
  - domain/protein-engineering
---

# foley-2022-grasp — faithful source note

**License mode: CC BY (permissive)** — short verbatim load-bearing quotes allowed, each with
location + attribution. (Copyright statement on the article page: "© 2022 Foley et al. This is
an open access article distributed under the terms of the Creative Commons Attribution License,
which permits unrestricted use, distribution, and reproduction in any medium, provided the
original author and source are credited.")

## 1. Citation
Foley G, Sützl L, D'Cunha SA, Gillam EMJ, Bodén M. 2022. "Engineering indel and substitution
variants of diverse and ancient enzymes using GRASP." *PLoS Computational Biology* 18(10):e1010633.
DOI: 10.1371/journal.pcbi.1010633. Open access (CC BY):
https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1010633
Accessed 2026-07-03 via web fetch of the article HTML.

## 2. Access note
Read the full open-access article HTML (abstract, results, methods, data-availability, tool-
availability sections). Content was extracted via automated fetch/summarization of the page, so
some equation bodies and figure-panel minutiae are paraphrased structurally rather than transcribed
character-for-character; all load-bearing quotes in §7 were captured as verbatim strings from the
article text. No paywall boundary. Supplementary files / the separate GRASP user guide were NOT
read (referenced by the paper but hosted separately at the tool site / GitHub).

## 3. Thesis (1 sentence)
GRASP is a maximum-likelihood ancestral-sequence-reconstruction tool that scales to families of
>10,000 sequences and, uniquely, models insertions/deletions as a first-class inferred process
using partial-order graphs (POGs), enabling both substitution and indel variants to be designed
from the reconstruction.

## 4. Problem & context
Ancestral sequence reconstruction (ASR) is used in molecular evolution and protein engineering.
The paper states accurate reconstruction "requires the ability to handle appropriately large
numbers of sequences, as well as insertion and deletion (indel) events, but available approaches
exhibit limitations" (Abstract). Prior ML reconstruction methods do not treat indels as an inferred
evolutionary process on par with substitutions. GRASP targets both scale (>10,000 members) and
explicit indel inference.

## 5. Method / approach
- **Representation — partial-order graph (POG).** GRASP represents each ancestor as an "ancestor
  POG": a graph of nodes where "each node either identifies a character state, or defines a
  probability distribution over character states," connected by edges. POGs represent sequence
  content *including* insertions and deletions, rather than encoding gaps as an explicit missing
  state.
- **Two inference targets, run independently:**
  1. *Character states* at internal nodes — by **joint** or **marginal** reconstruction. Joint:
     ancestor POGs "contain character nodes that represent the most likely character states."
     Marginal: the nominated ancestor "will contain distribution nodes that represent the marginal
     distributions of character states."
  2. *Indel/edge history* — inferred separately from characters.
- **Three indel encodings × two inference algorithms = six options** (`PS-P, PS-ML, SIC-P, SIC-ML,
  BE-P, BE-ML`):
  - **Position-Specific (PS)** — treats each alignment position independently.
  - **Simple Indel Coding (SIC)** — "regards deletions as equivalent if they start and end at the
    same positions"; gaps as a binary present/absent state.
  - **Bi-directional Edge (BE)** — novel; "considers indels as edges in a POG" and can
    "differentiate between deletions that start at the same position but end at different positions
    (forward direction) as well as … deletions that end at the same position but start at different
    positions."
  - Each encoding pairs with **parsimony (P)** or **maximum likelihood (ML)** inference.
- **Default used in the paper's experiments:** BE encoding with **parsimony** inference — "we opted
  to use the BE encoding … we opted for parsimony inference, which seemed to perform comparably to
  maximum likelihood but was generally quicker."
- **Edge support** is quantified as "the proportion of extant sequences that contain a particular
  edge" (used as transition weights). **No minimum support percentage / posterior cutoff is
  specified.**
- **POG → linear sequence** (choosing a single most-supported ancestral sequence): two algorithms —
  a **Markov-chain** most-probable-path using edge weights as transition probabilities, and an **A***
  search that "jointly minimises the cost, travelling from the N- to the C-terminus." Both "impose
  a preference for bi-directional edges; a uni-directional edge is only chosen in the absence of
  bi-directional edges."
- **Evolutionary model:** LG rate model used for the marginal GDH-GOx reconstruction; indel-ML uses
  uniform (Jukes-Cantor-style) models.
- **Scale / runtime:** completed the largest reconstructions "within 7 hours for DHAD (9,112
  sequences, 1,381 positions in alignment) and within 6 hours for KARI (11,756 sequences, 667
  positions)."
- **Availability:** web server at http://grasp.scmb.uq.edu.au; a separate command-line version;
  GNU GPL v3.0. Tool repo: github.com/bodenlab/GRASP; datasets at github.com/bodenlab/GRASP-resources.
  **No explicit CLI flags/arguments are listed in the article body** (deferred to the user guide).

## 6. Key claims / findings
- GRASP scales ML ASR to families ">10,000 members" (Abstract); "greater than 10,000 … necessary
  to capture the true diversity of the sequence space."
- Using more sequences reduces variance in inferred ancestral sequences (section title + result).
- POGs let GRASP (1) infer & visualize indel events across ancestors and (2) represent candidate
  ancestors as **alternative paths** through an ancestor POG.
- **Indel variation is an orthogonal design axis to substitution**: modular indel blocks can be
  included/excluded to create hybrid ancestral variants. Concrete example (CYP2U, Fig 3): removed
  insertion `LSEE` from N5 at position 153 (`N5_153dLSEE`) and `LLSPP` from N51 at position 27
  (`N51_27dLLSPP`), then separately inserted them into N2.
- **Substitution variants** are found by marginal reconstruction: selecting alternative residues
  "at sites with high Shannon entropy" that "show a relatively high posterior probability in a
  marginal reconstruction." Example: GDH-GOx variant `N320_Y244E` "was altered based on posterior
  probabilities from the marginal distribution that resulted in increased thermal stability" (exact
  probability not given).
- **Experimental validation — resurrected ancestors were functional:**
  - **CYP2U/CYP2R/CYP2D** P450s: "All ancestral proteins … heterologously expressed in *Escherichia
    coli* … All were catalytically active towards at least one substrate" (three P450-Glo luminogenic
    substrates). N5 and N51 active toward luciferins CEE and ME-EGE; N2 active only toward ME-EGE.
  - **DHAD**: "All DHAD ancestors displayed enzymatic activity to D-gluconate"; thermal-shift
    profiles of the smallest- and largest-dataset ancestors were comparable.
  - **GDH-GOx**: N/C-terminal sequences swapped with *A. niger* GOx equivalents; expressed in
    *K. phaffii*.
  - **KARI**: large family (11,756 seqs) inferred but not experimentally resurrected in this study.

## 7. Load-bearing statements (VERBATIM — CC BY permits reproduction)
1. **What POG/indel-aware reconstruction adds** (Results, "GRASP infers partially ordered ancestor
   graphs…"): "Unlike other reconstruction methods, GRASP uses POGs to represent sequence content,
   including insertions and deletions, to allow for (1) inference and visualisation of indel events
   across ancestors, and (2) representation of candidate ancestors as alternative paths through an
   ancestor POG."
2. **POGs separate conflicted indels** (Results, indel-history subsection): "POGs do not explicitly
   represent gaps, allowing predicted, conflicted indels to be separated. The conversion to a linear
   sequence involves choices that benefit from considering the evolutionary context."
3. **Indel variation as a design axis** (Results, "Indel variation can be used to create hybrid
   ancestors"): "GRASP utilises the history of indel events to predict modular blocks of sequence
   content that could be included or excluded in identified ancestors as a novel approach to
   creating ancestral variants, orthogonal to substitution."
4. **Substitution-variant selection rule** (Methods, "Inferring the character state of ancestor
   nodes"): "GRASP facilitates an approach of exploring plausible alternative amino acids at sites
   with high Shannon entropy, by selecting residues that show a relatively high posterior probability
   in a marginal reconstruction."
5. **Scale claim** (Abstract): "we developed Graphical Representation of Ancestral Sequence
   Predictions (GRASP), which efficiently implements maximum likelihood methods to enable the
   inference of ancestors of families with more than 10,000 members."

## 8. Stated scope, assumptions, limitations
- Indel inference can be **ambiguous**: "multiple indel histories are equally parsimonious or the
  preferred edge in one direction is not preferred in the other." GRASP represents this ambiguity
  in the POG rather than forcing a single call.
- The paper opts for **parsimony** indel inference in its experiments on grounds of speed, stating
  it "seemed to perform comparably to maximum likelihood" — i.e., an empirical, not proven,
  equivalence.
- Requires a good input multiple-sequence alignment and phylogenetic tree (FASTA + tree are the
  documented inputs).
- KARI was inferred but not experimentally resurrected — validation coverage is uneven across the
  four families.

## 9. Failure modes / invalidity patterns
- **Ambiguous indel history**: when multiple histories are equally parsimonious, or a preferred edge
  disagrees forward vs. reverse — the single linearized ancestor is then a choice among alternatives,
  not a unique answer. Symptom: competing edges of comparable support in the ancestor POG.
- **Low edge support**: edge weight = proportion of extant sequences containing that edge; low
  proportions indicate weakly-supported indel content. (No numeric floor is given by the paper —
  see §5.)
- **Low-confidence character states**: high Shannon entropy at a site signals uncertainty; the paper
  treats these as candidates for alternative-residue variants rather than confident single calls.
- **Insufficient sequences**: fewer sequences → higher variance in inferred ancestors (the paper's
  "using more sequences reduces variance" result implies small families give less reliable ancestors).

## 10. What the source does NOT address (confident silences)
- **No numeric posterior-probability threshold** — neither for indels/edges nor for substitution
  variants. Selection criteria are stated qualitatively ("relatively high posterior probability,"
  "high Shannon entropy"); no cutoff such as 0.8 appears anywhere in the article text.
- **No explicit CLI argument/flag list** in the article body (deferred to the external user guide).
- **No named output file formats** for posteriors (e.g., no `.asr`/`.posterior` filenames);
  documented artifacts are FASTA sequences and labelled phylogenetic trees (Data Availability).
- Does not explicitly frame competing ML methods (e.g. PAML) as "treating gaps as missing data" —
  the paper contrasts POG/BE against PS and SIC encodings, not against a named external tool's
  missing-data handling.

## 11. Open questions / ambiguities the source leaves unresolved
- What posterior / support value should gate accepting an indel block or a variant residue in
  practice — the paper gives worked examples but no defensible cutoff.
- How to choose among equally-parsimonious indel histories when linearizing (beyond the BE
  preference rule).
- Relative reliability of parsimony vs. ML indel inference beyond "comparable, but parsimony faster."

## 12. Guidance answers
- **POG models indels probabilistically as a separate process vs. ML-as-missing-data:** Confirmed
  for the POG mechanism (§7 quotes 1–2, §5). GRASP infers indel/edge history *separately* from
  character states, using BE/SIC/PS encodings under parsimony or ML, and represents indels as edges
  in the graph rather than as gap columns. **Caveat:** the paper contrasts POG against the PS and SIC
  *encodings*, and does not itself use the phrase "treat gaps as missing data" or name PAML/ML-codon
  methods as the foil — that framing is not in this source.
- **Outputs (ancestral seqs, per-site/per-state posteriors, indel posteriors per gap-block, exact
  artifact names):** Ancestral sequences at internal nodes (joint) and marginal per-state
  distributions at nodes (marginal) are produced; edge/indel support is the per-edge proportion of
  extant sequences. **Exact output file names/formats are NOT stated** in the article; documented
  data artifacts are FASTA files and labelled trees.
- **Recommended thresholds (skill uses indel-posterior ≥0.8):** **The paper states NO numeric
  indel-posterior threshold and NO substitution-posterior threshold.** Both variant-selection
  criteria are qualitative ("high Shannon entropy," "relatively high posterior probability in a
  marginal reconstruction"). Therefore a **≥0.8 indel-posterior cutoff is NOT the paper's number —
  it must be tool convention / downstream-workflow convention, not sourced to Foley et al. 2022.**
  Flag accordingly.
- **Construct-design / library strategy:** Two orthogonal axes. (a) *Substitution*: marginal
  reconstruction → pick alternative residues at high-entropy, relatively-high-posterior sites (e.g.
  GDH-GOx `N320_Y244E`, raised thermal stability). (b) *Indel*: treat inferred indel blocks as
  modular include/exclude units to build hybrid ancestors (CYP2U example: delete `LSEE` from N5@153,
  `LLSPP` from N51@27, insert into N2). Naming convention in the paper encodes the edit, e.g.
  `N5_153dLSEE` (d = delete of block LSEE at position 153).
- **Scale claim & CLI:** ">10,000 members" confirmed (Abstract; §7 quote 5). Runtimes: DHAD 9,112
  seqs/1,381 positions in ~7 h; KARI 11,756 seqs/667 positions in ~6 h. Web server + GPLv3 CLI
  version exist, repo github.com/bodenlab/GRASP; **no CLI flags enumerated in the article** (the
  guidance's "GRASP 2024+" version pin cannot be corroborated from this 2022 paper — do not attribute
  a version to this source).
