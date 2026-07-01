---
type: pattern
name: double-dipping
pole: cautionary-bad
status: stub
---

# Double-dipping (circular / post-selection inference)

> **Stub.** Corpus-first: this page starts minimal and grows only when a real case demands it
> (`GUIDING_PRINCIPLES.md`). Below is the one-line phenomenon + the observed cross-method spread +
> the primary-source outline to summarize next. Do not pad with invented signature prose; each
> concrete signature is added only when its primary source is read into a `research/papers/<id>/`
> note. Frontmatter contract for patterns is deferred to repo standup (AGENTS.md).

**Phenomenon (one line):** using the *same data* to both **select** what to test and to **test it**
inflates significance and de-calibrates error rates — "double dipping" / circular analysis
(term: Kriegeskorte et al. 2009). No error is thrown; the p/q-values simply lie.

**Why a single definition is not enough.** The same invalidity wears different clothes per assay,
and (per the bioSkills survey, 2026-06) the defining treatments live *inside* method-specific
skills, not in one reusable note — and the canonical single-cell form is missing there entirely.
This pattern must therefore be a **catalog of concrete signatures**, each cited, not a definition.
Observed forms to cover (each becomes a signature once its primary is read):

- **cluster/latent-estimate-then-test** — single-cell: cluster cells, then test DE between clusters
  on the same counts. *[observed as a literature gap in bioSkills single-cell; design-inference
  that this is the canonical genomics case]*
- **select-extreme-then-test** — methylation: select extreme runs of CpGs to define regions, then
  test those regions on the same data *[observed: bioSkills `methylation-analysis/dmr-detection`]*
- **search-then-quantify-same-data** — DIA proteomics: the same spectra feed library search + a
  semisupervised rescorer (Percolator / PeptideProphet), and the pipeline **self-reports** FDR via
  target-decoy competition — which cannot audit itself. Entrapment shows DIA FDR is frequently
  underestimated (protein-level "frequently invalid"; up to 44.2% single-cell). *[observed: bioSkills
  `proteomics/dia-analysis`; ✓ sourced — [[wen-2025]]. Honesty flag: the FDR *underestimation* is
  empirically demonstrated; the same-spectra-reuse *mechanism* is named theoretically, not
  empirically isolated.]*
- **select-significant-then-estimate-effect** — winner's curse / effect-size inflation after
  selecting on significance *[design-inference; pin a genomics primary]*

## Primary sources to summarize (→ `research/papers/<id>/`)

Ordered by role in the note. Confidence flags are honest: `[verify]` = exists but pin
venue/volume/year before citing; unmarked = high confidence in author/year/venue.
**`✓ ingested`** = note exists at `research/papers/<slug>/` and wiki-links back here.

**Origin / cross-domain framing**
- **Kriegeskorte, Simmons, Bellgowan & Baker 2009, _Nature Neuroscience_ 12:535–540** — coins
  "double dipping"; circular analysis in systems neuroscience. Grounds: the phenomenon + the
  general selection↔inference reuse signature. Recoverability target: the definition and the
  "selection influences the test statistic's null" mechanism. → `✓ ingested` [[kriegeskorte-2009]]

**Theory — post-selection / selective inference (the why + the correction backbone)**
- **Berk, Brown, Buja, Zhang & Zhao 2013, _Annals of Statistics_ 41:802–837** — "Valid
  post-selection inference" (PoSI). Grounds: why naive post-selection CIs/p-values are invalid.
- **Lee, Sun, Sun & Taylor 2016, _Annals of Statistics_** — "Exact post-selection inference, with
  application to the lasso." Grounds: the conditional/selective-inference correction. `[verify]`
- **Fithian, Sun & Taylor 2014 (arXiv:1410.2597)** — "Optimal inference after model selection."
  Grounds: the selective-inference framework. `[verify]`

**Genomics remedies — the field-trusted concrete fixes (highest recoverability value)** *(citations verified 2026-06-30)*
- **Gao, Bien & Witten 2024, _JASA_ 119(545):332–342** (arXiv:2012.02936) — "Selective Inference for
  Hierarchical Clustering": testing a difference in means *after* clustering, with the load-bearing
  result that *independent datasets do not fix it*. Grounds the cluster-then-test signature + its valid
  test. → `✓ ingested` [[gao-clusterpval-2024]]
- **Neufeld, Gao, Popp, Battle & Witten 2024, _Biostatistics_ 25(1):270–287** (arXiv:2207.00554) —
  count splitting: inference after latent-variable estimation for scRNA-seq. Grounds the single-cell
  remedy (the form bioSkills omits). → `✓ ingested` [[neufeld-countsplit-2024]]
- **Neufeld, Dharamshi, Gao & Witten 2024, _JMLR_ 25(57):1–35** (arXiv:2301.07276) — "Data thinning
  for convolution-closed distributions." Generalizes count-splitting beyond Poisson; second-wave (not ingested).
- **Korthauer, Chakraborty, Benjamini & Irizarry 2019, _Biostatistics_ 20(3):367–383**
  (DOI 10.1093/biostatistics/kxy007; bioRxiv 183210) — dmrseq: a pooled permutation null that
  *re-runs the region selection* under the null. Grounds the select-extreme-then-test remedy.
  (Already cited inside bioSkills `dmr-detection`.) → `✓ ingested` [[korthauer-dmrseq-2019]]

**Cross-method instances**
- DIA proteomics search-then-quantify FDR reuse — **Wen, Freestone, Riffle, MacCoss, Noble & Keich
  2025, _Nature Methods_ 22(7):1454–1463** (DOI 10.1038/s41592-025-02719-x; open CC-BY). Entrapment
  audit: no DIA tool consistently controls FDR (protein-level frequently invalid); remedy = external
  entrapment validation, not self-reported TDC. Still a review-orphan (a *primary*, not a review; no
  selective-inference review bridges it — `[[double-dipping-survey]]`). (DIA-NN / Demichev et al.
  2020 dropped — the tool paper, not a treatment of the flaw.) → `✓ ingested` [[wen-2025]]
- Winner's curse / effect-size inflation in GWAS after selecting significant hits — **Forde, Hemani &
  Ferguson 2023, _PLOS Genetics_ 19(9):e1010546** (open CC-BY); review of conditional-likelihood /
  empirical-Bayes / FIQT corrections; 50–400% inflation near 5×10⁻⁸; ranking-bias vs selection-bias.

**Review / survey layer** *(landscape mapped 2026-06-30 → `[[double-dipping-survey]]`)*
- **Kuchibhotla, Kolassa & Kuffner 2022, _Annu. Rev. Stat. Appl._ 9:505–527** — the taxonomy spine:
  sample splitting / simultaneous-PoSI / conditional selective inference. (Open author copy: NSF PAR.)
- **Enjalbert Courrech, Maugis-Rabusseau & Neuvial 2025, _Int. Stat. Rev._** (DOI 10.1111/insr.70017) —
  post-clustering inference review; information-partitioning vs conditional. Closest genomics-facing survey.
- **Hivert et al. 2024** (arXiv:2405.13591) — cautionary counterweight: data fission/thinning fail in
  real scRNA-seq when overdispersion is unknown. A valid method that is *practically* invalid.

## Adjacent (belongs to sibling leaves, cross-link — do not absorb here)
- Garden of forking paths / researcher degrees of freedom — Gelman & Loken 2014; Simmons, Nelson &
  Simonsohn 2011. → `[[garden-of-forking-paths]]`, not this note.

<!-- design-inference: the four-signature taxonomy and the "catalog-not-definition" stance are
     this project's synthesis from the bioSkills survey (2026-06); they are owned-and-flagged.
     Each signature becomes corpus-observed only when its primary above is read into a source note. -->
