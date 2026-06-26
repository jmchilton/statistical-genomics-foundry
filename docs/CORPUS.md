# Corpus (adapted from the Galaxy Workflow Foundry's CORPUS_INGESTION)

> Adapted from the parent's `docs/CORPUS_INGESTION.md`. The **URL-not-mirror principle is preserved verbatim** — we cite, we don't mirror. The corpus *content* changes completely (the parent's is IWC workflows; ours is methods literature + cautionary examples), and it gains a structural feature the parent never needed: it is **bipolar** — established-good *and* cautionary-bad — because a referee needs both "here is the valid method" and "here is the invalidity signature." Status: adaptation; no ingestion tooling planned.

## No ingestion pipeline, no mirror

Like the parent, this project has **no corpus ingestion pipeline, no mirror, and no fixtures runtime dependency**. It integrates its corpus through **citations** (by URL/DOI), survey/research notes, optional inline excerpts, and Molds that fetch live evidence at runtime. We point upstream, quote only what we must, and pin a citation to a DOI / commit / version when stability matters — author choice per citation, no enforced policy. (`GUIDING_PRINCIPLES.md` → "Source Authority Beats Local Copies.")

The parent's `workflow-fixtures/` + IWC clone + skeleton tiers are **Galaxy-specific and dropped**. We have no equivalent generated-corpus workspace yet; if survey work later wants one (e.g. a local cache of Bioconductor vignettes or simulation fixtures), it lives outside `content/`, gitignored, invisible to the validator and site — same containment rule as the parent's `workflow-fixtures/`.

## The corpus is bipolar (the key structural change)

The parent's corpus (IWC) is **all positive exemplars** — "here are good workflows, learn their structure." Ours can't be, because our job is refereeing. A referee grounded only in good examples can't recognize a bad one. So our corpus has two poles plus three supporting kinds:

1. **Established-good — methods & their validity conditions.** Grounds Family A's *"pick an established method, don't invent."* Examples: Bioconductor vignettes / OSCA, DE-method comparisons (Soneson & Robinson), GWAS QC protocols (Marees, Anderson), method papers with their stated assumptions. Cited by URL/DOI.
2. **Cautionary-bad — named invalidity patterns & their remedies.** Grounds Family B's *referee*. Examples: double-dipping / circular analysis (and its remedy, `countsplit`/data-thinning), batch effects confounded with condition, garden-of-forking-paths / researcher-degrees-of-freedom, naive multiple-testing under dependence. Each is a *failure with a signature* the referee must learn to recognize. **This pole has no parent analog** — IWC has no "anti-workflows."
3. **Reporting standards / checklists** — castable referee rubrics. EQUATOR guidelines, ClinGen/PRS-RS (33-item), MIQE, PROBAST-AI (signalling questions). These are pre-written referee structure; cite and cast, don't reinvent.
4. **Calibration / simulation methodology** — grounds the *calibrate* role. Simulation-based calibration (SBC), posterior predictive checks, permutation frameworks, negative-control design, power analysis.
5. **Benchmarks / truth-sets / eval harnesses** — ground evals and scenarios. StatQA (method-applicability cases), GIAB + hap.py (variant truth), splatter/polyester (simulation under known truth). These double as `scenarios.md` fixtures (planted-invalid or known-truth cases).

## How the corpus is referenced

Mirrors the parent's mechanisms, retargeted:

1. **Pattern and research notes cite by URL/DOI in the body.** A pattern's `## Exemplars` (established-good) or `## Failure cases` (cautionary-bad) section lists sources as free-form Markdown links with one-line commentary. Pin to DOI / commit / version when stability matters.
2. **Inline excerpts when they earn it.** A note author may paste a short excerpt (a method's assumption list, a checklist item, a code snippet showing the invalid move) directly into a body to illustrate. Committed verbatim; no build-time regeneration; rot is rot. **Corpus-first discipline applies hard here** (`GUIDING_PRINCIPLES.md`): write the excerpt only when a real case demands it — invented "representative" prose is exactly our failure mode.
3. **No category-aggregation layer.** Corpus grounding lives in note bodies and citations, not an index.
4. **Referee Molds may fetch live evidence at runtime.** A cast skill can carry instructions to fetch a standard/checklist or look up a method via `WebFetch` rather than embedding a mirror. The Mold's source describes the *procedure*, not a frozen corpus snapshot.

## What this gives up (same trade as the parent)
- No per-source inverse view, no per-category site browsing (no structural support; hand-write a note by exception).
- No build-time inlining of full sources into casts — casts get URLs/DOIs the agent fetches, or small hand-curated excerpts.
- No auto-detection of upstream drift — a cited method page or standard can change; mitigate by pinning to DOI/version where stability matters, and by review.

## Validation
No corpus-specific validator layer. Body citations are not link-checked (URLs are URLs; automated link-checking at scale costs more than the moderate cost of brokenness). The one discipline we *do* enforce in review: a `hypothesis`-evidence reference (per `MOLD_SPEC.md`) must be flagged, because un-grounded prose is our project's specific risk.

## Minimum exercise
1. Author 2–3 patterns end-to-end: at least one established-good (an established method + when it applies) and at least one cautionary-bad (a named invalidity + its signature + remedy), each citing sources by URL/DOI with one inline excerpt where useful.
2. Confirm a Family-B Mold can wiki-link the cautionary-bad pattern and that casting preserves the citations as live evidence pointers, not embedded mirrors.
3. Confirm a `scenarios.md` can bind a benchmark/truth-set case (e.g. a StatQA item or a splatter known-truth simulation) as a planted fixture.

If the loop holds, scale. No further ingestion tooling is planned.
