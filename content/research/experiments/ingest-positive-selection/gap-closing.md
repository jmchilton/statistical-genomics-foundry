# gap-closing — ingest-positive-selection (Phase 5)

> Phase-5 retrieval pass over `comparison.md`'s GAP taxonomy. Re-triaged each gap against the
> *current* corpus (Phase-2 notes present), then hunted OA surrogates **by fact-needed** (not by the
> skill's own citations — several were caught as confabulations). Two clean recommends (GAP-1,
> GAP-2), one reuse+still-open split (GAP-3), one reuse-existing (GAP-4), one convention-not-hunted
> (GAP-5). Provenance labeled per fact; the Phase-3 candidate Mold is **not** re-opened.

## Summary table

| Gap | Disposition | id (if any) | Access / license |
|---|---|---|---|
| GAP-1 gBGC mechanism + discrimination diagnostic | **recommend → ingest** | `papers/ratnakumar-2010-gbgc` | Free-to-read PMC2935097 (Royal Society, all-rights-reserved → own-words) |
| GAP-2 convergent substitution confound (SILENT) | **PARTIAL — statistic ingested, confound framing still-open** | `papers/fukushima-pollock-2023-csubst` (ω_C statistic only); *hold* = cautionary-tale preprint 10.1101/2021.10.26.465984 (the confound framing) | Primary paywalled (Nat Ecol Evol); OA via **MIT** repo docs (confirmed) + **CC-BY 4.0** app (Barua et al. 2026, MBE 43(1):msag015) |
| GAP-3 post-hoc foreground inflation magnitude | **reuse-existing (principle) + still-open (magnitude)** | `[[gelman-loken-2014]]` for the principle | Principle in corpus; codon-specific magnitude not located OA |
| GAP-4 recombination FP inflation factor | **reuse-existing** | `[[anisimova-2003-recombination]]` (absolute rates to 98%) | Already in corpus; GARD Fig. 3 optional low-value re-summarize |
| GAP-5 dS / branch-length saturation cutoff | **convention-not-hunted** | — | Confirmed absent from `[[paml-manual]]` + `[[alvarez-carretero-2023-paml-guide]]`; convention |

**Net paywalled-and-absent facts needing a hunt: two.** GAP-1 fully closed (Ratnakumar). GAP-2 **partially** closed — ω_C statistic ingested (CSUBST), but the convergence-as-branch-site-confound framing stayed a confident silence in the open surrogates and is still-open (needs the hold preprint / paywalled primary). Residual still-open: GAP-2 confound framing + GAP-3 post-hoc magnitude — for both, back the principle/statistic and mark the missing piece unavailable rather than fabricate it (the skill's "~5×" stays unsourced).

---

## GAP-1 — gBGC discrimination → RECOMMEND `ratnakumar-2010-gbgc`

Re-triage: genuinely absent. `galtier-duret-2007-gbgc` is abstract-only (mechanism/criteria in the paywalled body); `alvarez-carretero-2023-paml-guide` names gBGC as a false-positive driver but carries no mechanism/diagnostic.

Surrogate: Ratnakumar et al. 2010, "Detecting positive selection within genomes: the problem of biased gene conversion," *Phil Trans R Soc B* 365(1552):2571–2580, DOI 10.1098/rstb.2010.0007, **PMC2935097** — free-to-read, no CC → own-words. (This is the exact review `alvarez-carretero` points to for gBGC.)

Facts it carries (provenance):
- **Mechanism** (review's restatement of established gBGC theory): gBGC = biased mismatch repair in meiotic-recombination heteroduplex DNA, preferentially fixing G/C (Strong) over A/T (Weak); "can lead to bursts of neutral or deleterious substitutions at functional sites" → accelerated evolution without adaptation.
- **Three operational discrimination criteria** (review's own synthesis): (i) gBGC generates W→S-biased substitution, whereas selection has no a-priori W→S preference; (ii) selection acts only on functional sites, gBGC also on flanking neutral sites; (iii) gBGC associates with high male-recombination regions. Fig. 2 = directional W→S/S→W diagnostic.
- **Quantification** (paper's **own re-analysis**): >20% of significantly elevated dN/dS on shorter branches attributable to gBGC; ~22% excess in hominid lineages.
- **No numeric W→S ratio threshold** — reinforces the convention label on "W→S > 1.5". No contradiction with the gap.

Guidance written: `research/papers/ratnakumar-2010-gbgc/guidance.md`.

## GAP-2 — convergent substitution as a confound (SILENT) → RECOMMEND `fukushima-pollock-2023-csubst`

Re-triage: no corpus note touches molecular convergence as a confound. Genuinely external. The Mold could not even flag it — highest-value find.

Surrogate: CSUBST (Fukushima & Pollock 2023, *Nat Ecol Evol* 7:155–170) — the convergence statistic **ω_C = dN_C/dS_C** over branch combinations. Primary paywalled; OA routing = **author-written CSUBST repo/docs github.com/kfuku52/csubst (MIT, © Kenji Fukushima — license confirmed by orchestrator)** for the ω_C definition/method, anchored to the **CC-BY 4.0** teleost application PMC12849823, which states verbatim: "Similar to how a ω (dN/dS) > 1 indicates positive selection, the convergence ratio ω_C (dNC/dSC) > 1 represents directional convergence beyond neutrality," applied "on combinations of separate phylogenetic branches."

Provenance: ω_C definition + branch-combination search are the **method authors' own** (mirrored in the MIT repo docs, restated in the CC-BY app); the "convergence-beyond-neutrality, analogous to but distinct from ω>1 selection" framing is the CC-BY **application's restatement**.

**POST-INGEST NUANCE (faithful, do not smooth):** the note recovered the ω_C **statistic** but NOT the confound framing. The summarizer reported a **confident silence** — neither open surrogate states that convergent/parallel substitutions produce a *false branch-specific positive-selection / accelerated-dN/dS signal under standard branch-site (codeml/HyPhy) models*; codeml/HyPhy are unmentioned, and the docs argue the opposite direction (ω_C is *decoupled* from per-branch ω: "ω had almost no effect on ω_C in the range 0.1–5"). It did **not** confabulate the confound. So GAP-2 splits: **statistic half CLOSED** (CSUBST/ω_C), **confound half STILL-OPEN** — it needs the **hold** cautionary-tale preprint (10.1101/2021.10.26.465984, which states branch-site models misread shared/convergent selection as foreground-specific) or the paywalled CSUBST primary. Do not treat the silent gap as fully closed.

**Citation corrections from ingest** (same title-fix discipline as the GARD/lucaci guidance fixes): (a) primary title is "Detecting macroevolutionary genotype–phenotype associations using **error-corrected rates of protein convergence**," NOT the tentative "…non-parametric phylogenetic regression" in the draft guidance (DOI 10.1038/s41559-022-01932-7 unchanged); (b) the CC-BY application is **Barua et al. 2026, MBE 43(1):msag015** (verified from PMC), superseding the tentative "PMC12849823 teleost" pointer. Both fixed in the guidance.

Contradiction surfaced: the CSUBST docs' "ω_C decoupled from ω" runs *counter* to a naive reading that high ω_C implies high ω — method-validation, recorded not smoothed.

Guidance written + corrected: `research/papers/fukushima-pollock-2023-csubst/guidance.md`.

**HOLD (reported, not ingested):**
- bioRxiv **10.1101/2021.10.26.465984** — "A cautionary tale on proper use of branch-site models to detect convergent positive selection." Thesis (from search snippet): branch-site models alone cannot detect selection *unique to* foreground branches → shared/convergent positive selection is misread as branch-specific. The single most on-point statement of the confound, but bioRxiv 403'd on fetch (authors + preprint license unverified). If it verifies as CC, it is arguably a *better* GAP-2 recommend for the confound half, with CSUBST supplying the statistic half. **Confirm license before routing.**
- PCOC (Rey et al. 2018, bioRxiv 10.1101/247296 + MBE) — a per-site convergence test, alternative statistic. Not needed if CSUBST is taken.

## GAP-3 — post-hoc (a-posteriori) foreground inflation → REUSE (principle) + STILL-OPEN (magnitude)

Re-triage confirms the gap: `zhang-2005-branch-site` explicitly assumes correct a-priori foreground, gives no number; `anisimova-yang-2007` quantifies **many-branch FWER** (worst ~25%), i.e. pre-specified branches with correction — NOT data-dredged foreground. The skill's "~5×" is unsourced (comparison.md §3.5).

- **Reuse-existing for the PRINCIPLE:** `[[gelman-loken-2014]]` ("garden of forking paths") is in the corpus and directly fits — choosing the foreground after seeing which branch has high dN/dS is its procedure #3 (`T(y; φ(y))`, a single data-contingent test) that invalidates the p-value "even when there is no fishing expedition." The Mold can cite this for *why* post-hoc foreground inflates Type-I, honestly, without a fabricated multiplier.
- **Still-open for the MAGNITUDE:** no OA source located that simulates a-posteriori foreground choice under a codon branch-site model and reports an inflation factor. (Yang & dos Reis 2011 "Statistical Properties of the Branch-Site Test," MBE 28(3):1217 studies FPR/power under a *pre-specified* foreground — adjacent, not post-hoc; not fetched to full confirm.) **Do not backfill "~5×"; back the confound with the principle and mark the quantified magnitude unavailable.**

## GAP-4 — recombination downstream FP inflation factor → REUSE-EXISTING

`[[anisimova-2003-recombination]]` already carries the answer as **absolute type-I rates** (ρ=0.01: M0–M3 to 98% / M1–M2 74–80% / M7–M8 20%; ρ=0 baseline 0–2%), and records that the paper states **no fold-multiplier** — the "5–50×" gloss is narrower than and unsupported by the paper's own numbers. This is the honest recoverable form. `pond-2006-gard` Fig. 3 (per-method FEL rates) is image-bound, uncaptured; pulling it would be a low-value optional re-summarize, not required. **No external hunt.**

## GAP-5 — dS / branch-length saturation cutoff → CONVENTION-NOT-HUNTED

Both governing sources confirm absence: `paml-manual` (v4.10.8) has no "dS<1.5/3" or "saturation"; `alvarez-carretero-2023-paml-guide` prescribes no saturation diagnostic. No primary defines a "dS<X" codon-model reliability threshold — it is a **convention with no defining primary**; the label is the answer. (A real but *different* diagnostic exists — Xia's entropy-based index of substitution saturation, Iss vs Iss.c, in DAMBE — an alignment-level saturation test, not the "dS<X codon reliability" figure the skill mis-cited. Hunting it would substitute a real-but-unrelated primary for a convention. Not hunted; nameable as convention-adjacent methodology only, never as the source of "dS<X".)

## Sources
- Ratnakumar et al. 2010 — biased gene conversion problem (PMC2935097)
- Teleost CSUBST/ω_C application (PMC12849823, CC-BY 4.0)
- CSUBST repo github.com/kfuku52/csubst (MIT, © Kenji Fukushima)
- Cautionary tale on branch-site models for convergent selection (bioRxiv 2021.10.26.465984) — hold
- PCOC convergent-evolution detection (bioRxiv 247296) — alternative, not taken
- Yang & dos Reis 2011 — Statistical Properties of the Branch-Site Test (MBE 28(3):1217)
