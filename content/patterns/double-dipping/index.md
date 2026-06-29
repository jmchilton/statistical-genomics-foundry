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
- **search-then-quantify-same-data** — DIA proteomics: predicted-library search and quantification
  reuse the same spectra without global/two-pass FDR *[observed: bioSkills `proteomics/dia-analysis`]*
- **select-significant-then-estimate-effect** — winner's curse / effect-size inflation after
  selecting on significance *[design-inference; pin a genomics primary]*

## Primary sources to summarize (→ `research/papers/<id>/`)

Ordered by role in the note. Confidence flags are honest: `[verify]` = exists but pin
venue/volume/year before citing; unmarked = high confidence in author/year/venue.

**Origin / cross-domain framing**
- **Kriegeskorte, Simmons, Bellgowan & Baker 2009, _Nature Neuroscience_ 12:535–540** — coins
  "double dipping"; circular analysis in systems neuroscience. Grounds: the phenomenon + the
  general selection↔inference reuse signature. Recoverability target: the definition and the
  "selection influences the test statistic's null" mechanism.

**Theory — post-selection / selective inference (the why + the correction backbone)**
- **Berk, Brown, Buja, Zhang & Zhao 2013, _Annals of Statistics_ 41:802–837** — "Valid
  post-selection inference" (PoSI). Grounds: why naive post-selection CIs/p-values are invalid.
- **Lee, Sun, Sun & Taylor 2016, _Annals of Statistics_** — "Exact post-selection inference, with
  application to the lasso." Grounds: the conditional/selective-inference correction. `[verify]`
- **Fithian, Sun & Taylor 2014 (arXiv:1410.2597)** — "Optimal inference after model selection."
  Grounds: the selective-inference framework. `[verify]`

**Genomics remedies — the field-trusted concrete fixes (highest recoverability value)**
- **Gao, Bien & Witten 2024, _JASA_** — "Selective inference for hierarchical clustering": testing
  a difference in means *after* clustering. Grounds the cluster-then-test signature + its valid
  test. `[verify year/venue]`
- **Neufeld, Gao, Popp, Battle & Witten 2024, _Biostatistics_ 25:270–287** — count splitting:
  inference after latent-variable estimation for scRNA-seq. Grounds the single-cell remedy
  (the form bioSkills omits). `[verify volume/pages]`
- **Neufeld, Dharamshi, Gao & Witten 2024, _JMLR_** — "Data thinning for convolution-closed
  distributions." Grounds the general count-splitting/data-thinning remedy. `[verify venue]`
- **Korthauer, Chakraborty, Benjamini & Irizarry 2019, _Biostatistics_ 20:367–383** — dmrseq:
  permutation null that *re-runs the region selection* under the null. Grounds the
  select-extreme-then-test remedy. (Already cited inside bioSkills `dmr-detection`.)

**Cross-method instances — pin a primary during research (signatures, not yet sourced)**
- DIA proteomics two-pass / global-FDR control for directDIA reuse — likely **Demichev et al.
  2020, _Nature Methods_ (DIA-NN)** or the DIA-FDR/entrapment literature. `[verify which primary]`
- Winner's curse / effect-size inflation in GWAS after selecting significant hits — pin a genomics
  primary (selection bias in effect estimation). `[verify]`

## Adjacent (belongs to sibling leaves, cross-link — do not absorb here)
- Garden of forking paths / researcher degrees of freedom — Gelman & Loken 2014; Simmons, Nelson &
  Simonsohn 2011. → `[[garden-of-forking-paths]]`, not this note.

<!-- design-inference: the four-signature taxonomy and the "catalog-not-definition" stance are
     this project's synthesis from the bioSkills survey (2026-06); they are owned-and-flagged.
     Each signature becomes corpus-observed only when its primary above is read into a source note. -->
