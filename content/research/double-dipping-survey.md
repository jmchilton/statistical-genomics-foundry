# Survey: the double-dipping / selective-inference review literature

> Landscape of **review/survey** articles on double-dipping (circular analysis / post-selection /
> selective inference), genomics emphasis. Prepared by a clean-context research subagent, 2026-06-30;
> written up here by the note author. This maps the *review* layer that sits above the primary-source
> notes in `content/research/papers/`; it backs the [[double-dipping]] pattern and the `audit-method-validity`
> leaf. Access/availability flags from the subagent are carried verbatim — do not launder them.
> Citations confirmed from abstracts/landing pages + open preprints; the two flagship stats reviews are
> paywalled (worked from publisher abstract + open preprint), boundaries marked below.

## Ingest shortlist (review layer)

### Tier 1 — seed now
- **[1] Kuchibhotla, Kolassa & Kuffner 2022 — "Post-Selection Inference."** *Annual Review of
  Statistics and Its Application* 9:505–527. DOI 10.1146/annurev-statistics-100421-044639.
  Paywalled (Annual Reviews); open author copies: NSF PAR `par.nsf.gov/servlets/purl/10298358`,
  SSRN 4065377. The statistician's taxonomy spine: three remedy families (sample splitting /
  simultaneous-PoSI / conditional selective inference). General-purpose, not genomics-specific.
- **[2] Enjalbert Courrech, Maugis-Rabusseau & Neuvial 2025 — "Review of Post-Clustering Inference
  Methods."** *International Statistical Review.* DOI 10.1111/insr.70017. Wiley paywalled; free author
  version HAL `hal-05053220` *(HAL fetch was access-denied to the subagent — access-pending, record is
  public)*. The cluster-then-test problem, i.e. the exact scRNA-seq case; organizes remedies into
  (a) information partitioning (data fission / thinning / count splitting) vs (b) conditional
  approaches. **Highest-value single ingest for the single-cell use case.**
- **[3] Forde, Hemani & Ferguson 2023 — "Review and further developments in statistical corrections
  for Winner's Curse in genetic association studies."** *PLOS Genetics* 19(9):e1010546.
  DOI 10.1371/journal.pgen.1010546. PMC10538662. **Fully open, CC-BY** (verbatim quoting permitted).
  GWAS selection-on-significance: conditional likelihood, empirical Bayes, FIQT, bootstrap; quantifies
  50–400% inflation near 5×10⁻⁸; names ranking-bias vs selection-bias. Hybrid: survey sections are
  review, the added bootstrap is primary.

### Tier 2 — second wave
- **[4] Kriegeskorte, Simmons, Bellgowan & Baker 2009** — Nat Neurosci 12(5):535–540. The ORIGIN of
  the "double dipping" term; open author copy `mrc-cbu.cam.ac.uk`, PMC2841687. *(We are already
  ingesting this as `content/research/papers/kriegeskorte-2009/` — for definitional grounding, not assay
  coverage; the subagent ranks it second-wave on genomics-coverage grounds.)*
- **[5] Hivert et al. 2024 — "Practical limitations for real-life application of data fission and data
  thinning in post-clustering differential analysis"** (earlier "Running in circles…"). arXiv:2405.13591.
  Open. Adversarial *evaluation*: data fission/thinning often FAIL in real scRNA-seq because they need
  the overdispersion / noise distribution known, which it isn't. The cautionary-corpus counterweight
  to [2]. Pair with [2], not standalone.

### Tier 3 — primary, not reviews (cite; already covered or separate sourcing)
Surface under review queries but are primary method papers: Neufeld countsplit (arXiv:2207.00554,
already ingesting), Gao clustering (arXiv:2012.02936, already ingesting) + Gao k-means (arXiv:2203.15267),
Neufeld data thinning (JMLR 25, 2024), region-selection SI (bioRxiv 082321; arXiv:2506.11564).

## Taxonomy the reviews establish

**Statistician's carving [1]:**
1. **Sample splitting** — select on one half, test on the other. Simple; costs power; can't do
   per-observation tasks (can't carry cluster labels to held-out points).
2. **Simultaneous / PoSI** — protect against *all possible* selections at once; conservative,
   selection-rule-agnostic.
3. **Conditional selective inference** — condition on the specific selection event, derive the truncated
   null. Sharper but bespoke to the selection rule (fragile to algorithm + distributional model).

**Cluster-then-test refinement [2]** (genomics-facing):
- **(A) Information partitioning** — split information *within* each observation, not across
  observations: data fission, data thinning, count splitting (Poisson/NB scRNA-seq variants). Enables
  per-cell tasks sample splitting can't.
- **(B) Conditional approaches** — [1]'s family 3 instantiated for k-means/hierarchical clustering.

**GWAS branch [3]** (clustering reviews don't touch it): Winner's Curse / selection-on-significance;
remedy families = conditional likelihood, empirical Bayes, FIQT, bootstrap; ranking bias vs threshold/
selection bias.

Threads no single review unifies: **permutation / synthetic-null** (scRNA-seq synthetic-control,
bioRxiv 2023.07.21.550107; and dmrseq's pooled permutation null, `content/research/papers/korthauer-dmrseq-2019`)
and **entrapment / external validation** in proteomics.

## Genomics coverage map

| Assay / case | Review coverage |
|---|---|
| scRNA-seq cluster-then-test DE | **Well covered** — [2] built on it; [1] scaffolds; [5] counterweight |
| scRNA-seq pseudotime / trajectory | Thin — motivating case only, no review treats trajectory inflation in depth |
| GWAS winner's curse | **Well covered** — [3], open |
| Methylation region selection (DMRs) | **Barely** — no dedicated review; selection-bias framing only in primaries (`korthauer-dmrseq-2019`, region-detection SI) |
| Proteomics DIA FDR (search-then-quantify / target-decoy) | **Review-orphan for surveys** — no review frames it as selective inference; community treats it as FDR calibration / TDA-assumption violation + entrapment. **Primary now sourced:** [[wen-2025]] (entrapment audit, DIA FDR frequently invalid at protein level). |
| Bulk DE | Implicit in clustering reviews; no DE-specific SI review |

Net: reviews cluster on **scRNA-seq cluster-then-test** and **GWAS winner's curse**. Methylation,
pseudotime, and especially **proteomics FDR are review-orphans**. The `search-then-quantify-same-data`
signature in [[double-dipping]] confirmed this — and is now closed **at the primary level** by
[[wen-2025]] (entrapment audit of DIA FDR), sourced directly from the proteomics literature, not a
survey. It remains a *review*-orphan: no selective-inference review bridges the proteomics community
to the others.

## Surprises / tensions (good bipolar-corpus material)
- **A valid method can be practically invalid.** [2] presents data fission/thinning as clean; [5]
  (same community) shows they often fail in practice (need overdispersion known). Established-good vs
  cautionary-bad tension on the *same* remedy — exactly the contrast this project wants to capture.
- **Four communities, one bug, no shared vocabulary.** Statistics = post-selection/selective inference;
  neuroscience = circular analysis / double dipping; GWAS = winner's curse; proteomics = FDR
  mis-calibration. [1] and [3] barely cite each other.
- **Conditional SI is sharp but fragile** — most powerful per [1], but guarantees are tightly coupled
  to the exact clustering algorithm + distributional model (magnitude shows in primaries, not reviews).

<!-- design-synthesis (owned-and-flagged, NOT corpus-observed): the unifying "select-then-test on the
     same data" frame that ties these four communities together is THIS project's synthesis — no single
     review asserts it. The catalog-not-definition stance in [[double-dipping]] follows from this map:
     the reviews split cleanly by community/assay, so the leaf must carry per-context signatures. -->
