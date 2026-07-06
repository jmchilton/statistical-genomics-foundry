# ksrates: positioning whole-genome duplications relative to speciation events in Ks distributions

## 1. Citation

- Authors: Cecilia Sensalari, Steven Maere, Rolf Lohaus.
  (Third author confirmed as **Lohaus**, not Zwaenepoel.)
- Title: "ksrates: positioning whole-genome duplications relative to speciation events in Ks distributions."
- Venue: *Bioinformatics* 38(2):530–532, 2022. Applications Note.
- DOI: 10.1093/bioinformatics/btab602 — https://doi.org/10.1093/bioinformatics/btab602
- Article page: https://academic.oup.com/bioinformatics/article/38/2/530/6354354
- Dates: received 28 Apr 2021; accepted 17 Aug 2021; published (advance) 18 Aug 2021; correction 8 Oct 2021.
- Software supplement accessed: GitHub repo https://github.com/VIB-PSB/ksrates (README, license) and docs
  https://ksrates.readthedocs.io/en/latest/ (concept + configuration pages). Access date: 2026-07-05.
  Software version at access: **v2.1.0** (released 21 Jan 2026 per repo). Software license: **GPL-3.0**.

## 2. Access note

- Article: only the publicly visible **abstract + article metadata** could be read (OUP page; full PDF/HTML
  body is paywalled). Method-level detail below is drawn from the **ksrates documentation and repo README**,
  not the article body; the article-vs-docs boundary is flagged per statement.
- Article **license posture: all-rights-reserved.** Page carries "© The Author(s) 2021. Published by Oxford
  University Press. All rights reserved." — no Creative Commons license. **Therefore §7 is own-words
  paraphrase; no verbatim article prose is reproduced.** Functional strings (parameter names, numeric
  values, version) are reproduced verbatim under the functional-strings exception. The **docs/repo** are
  GPL-3.0 (reproduction-permissive), but for consistency this note keeps prose in own words and quotes only
  short functional/load-bearing strings.

## 3. Thesis (1 sentence)

ksrates is a command-line tool that positions ancient whole-genome duplication (WGD) events relative to
speciation events by comparing paralog and ortholog Ks distributions in one mixed plot, **after correcting
for synonymous-substitution-rate differences among the lineages involved** so the distributions share a
common scale.

## 4. Problem & context

- WGDs are dated from peaks in within-species paralog Ks distributions; speciation events are dated from
  between-species ortholog Ks distributions. Overlaying both in a "mixed plot" is the standard way to ask
  whether a WGD predates or postdates a given speciation.
- Problem the paper targets: synonymous substitution **rates differ among lineages**, so a Ks value for two
  events of the *same absolute age* differs depending on which lineages' branches it was measured on. A
  focal species' paralog Ks distribution is thus **not directly comparable** to ortholog Ks distributions
  involving other (differently-evolving) species, and naive superimposition in a mixed plot can mislead the
  phylogenetic interpretation. [article abstract + docs]
- Rate variation cited as real: e.g. woody vs. herbaceous growth habit, plant height correlate with
  substitution rate. [article]

## 5. Method / approach

Rate-adjustment via **branch decomposition using an outgroup**, in the style of a relative rate test (RRT):

- For a focal species, a diverged (target) species, and an **outgroup**, the total ortholog Ks between focal
  and diverged species is decomposed into **branch-specific contributions** proportional to each lineage's
  substitution rate. [docs: concept page; article]
- Rescaling rule: the diverged-species divergence is repositioned onto the **focal species' Ks scale** as
  **twice the focal branch's contribution**. Worked example from the docs (oil palm focal, rice diverged):
  palm–rice ortholog Ks `1.53` decomposes into palm branch `0.365` + rice branch `1.17` (palm has the lower
  rate); rate-adjusted divergence Ks = `2 * 0.365 = 0.73`. [docs, functional numbers verbatim]
- The adjustment shifts each speciation line in the mixed plot by an amount proportional to the estimated
  rate difference between the diverged lineage and the focal species. [article abstract]

Outgroups / consensus (from **docs**, not the article):
- If more than one outgroup is available for a species pair, **multiple rate-adjustments are performed and
  averaged**; consensus can be the "mean among outgroups" or a single adjustment.
- Docs **advise** using "at least 3 or better 4 outgroups" to buffer the weight of misleading outliers when
  taking the mean.
- Config parameter `max_number_outgroups` caps outgroups per pair; **default = 4** (without it, all possible
  outgroups are used).
- Input phylogeny is a Newick tree, leaf nodes only, must contain `focal_species`; short names, no spaces or
  underscores.

Downstream: mixture modeling of paralog Ks distributions (exponential-lognormal / lognormal), anchor-Ks
clustering, and a reciprocally-retained gene-family pipeline for plant WGMs are provided but are peripheral
to the rate-adjustment claim. [docs]

## 6. Key claims / findings

- Naive mixed plots can yield **wrong phylogenetic placement** of a WGD when lineages differ in rate;
  rate-adjustment fixes this. [article]
- Oil palm use case: the naive plot suggests the older τ WGD is a *second palm-specific* WGD; after
  adjustment, estimates of the same event cluster together and fall into the commonly accepted order,
  giving the correct positioning of the two oil-palm-lineage WGDs. [article]
- The adjustment magnitude for each speciation event is proportional to the estimated substitution-rate
  difference between that lineage and the focal species. [article abstract]

## 7. Load-bearing statements — OWN-WORDS (restrictive-license mode; functional strings verbatim)

- Rate-adjustment purpose (paraphrase of abstract): ksrates compares paralog and ortholog Ks distributions
  to position ancient WGDs relative to speciation events in a phylogeny **while adjusting for substitution-
  rate differences among the involved lineages**.
- Why single-lineage comparison fails (paraphrase): Ks estimates for events of equal absolute age differ
  with the lineages' synonymous substitution rates, so a focal species' paralog Ks distribution is not
  directly comparable to ortholog Ks distributions involving other species, and naive superimposition can
  mislead. [article]
- Decomposition method (paraphrase of docs): using a focal species, a diverged species, and an outgroup,
  the raw ortholog Ks is split into branch-specific contributions (relative-rate-test style), then the
  divergence is rescaled to the focal Ks scale as twice the focal branch contribution.
- Functional strings (verbatim): parameter `max_number_outgroups` (default `4`); parameter `focal_species`;
  worked values palm–rice Ks `1.53` = `0.365` (palm) + `1.17` (rice), adjusted `2 * 0.365 = 0.73`; docs
  wording "at least 3 or better 4 outgroups"; software `v2.1.0`; license `GPL-3.0`.

## 8. Stated scope, assumptions, limitations

- Scope: Ks-based (synonymous-divergence) dating of WGDs relative to speciations; genomic or transcriptomic
  coding sequences. [article]
- Rate-adjustment requires **at least one outgroup** per species pair to decompose branches (the RRT-style
  method is undefined without an outgroup). [docs — inherent to method]
- Averaging over outgroups is a robustness device against outlier adjustments; docs frame ≥3–4 outgroups as
  advisable, not mandatory. [docs]

## 9. Failure modes / invalidity patterns

- **Rate heterogeneity among lineages** is the core invalidity condition for naive mixed plots — it produces
  incorrect before/after-speciation placement of WGD peaks (the oil palm τ misassignment). ksrates is the
  correction, so the failure mode is precisely "comparing un-adjusted Ks across differently-evolving
  lineages." [article]
- Single-outgroup adjustments can be thrown off by outlier branch estimates; the docs' remedy is averaging
  over several outgroups (hence the ≥3–4 advice). [docs]
- [summarizer-inferred, not verified in source] Ks saturation at high divergence is a known general
  limitation of Ks methods; **neither the accessible article text nor the docs pages I read state an explicit
  Ks upper bound (e.g. Ks<1.5) for validity of the correction.** Do not attribute such a bound to this source.

## 10. What the source does NOT address (confident silences)

- No **hard minimum number of outgroups** is stated in the article; the article speaks of "an outgroup
  species" (i.e. ≥1). The **≥2** or **≥3–4** figures come from the *documentation's advice*, not a stated
  requirement, and not from the article. See §12 Q2.
- No explicit **Ks validity/saturation ceiling** for the correction in the material accessed. See §12 Q4.
- Full statistical detail of the decomposition and consensus (accessible only in the paywalled body /
  supplement) not captured here.

## 11. Open questions / ambiguities

- Exact verbatim article wording of the plot-reading rule (WGD-before vs -after speciation) could not be
  read (paywall); the older/younger-Ks logic in §12 Q5 is the standard mixed-plot interpretation, not a
  verified verbatim quote.
- Whether "mean among outgroups" or "single adjustment" is preferred in which situations is only lightly
  described in the docs.

## 12. Guidance answers

**Q1 — What rate-adjustment corrects and HOW (branch decomposition / RRT).**
ANSWERED. It corrects **inter-lineage synonymous-substitution-rate differences** that make Ks distributions
sit on different scales. Method: relative-rate-test-style **branch decomposition** — for focal + diverged +
outgroup species, split the ortholog Ks into per-branch contributions, then rescale the divergence onto the
focal species' Ks scale as **twice the focal branch's contribution** (docs example: palm–rice `1.53` →
palm `0.365` + rice `1.17` → adjusted `2*0.365 = 0.73`). Article states the method decomposes raw Ks into
branch-specific contributions "with the help of an outgroup species, similar to relative rate testing."

**Q2 — MINIMUM OUTGROUPS: does the paper state a hard minimum? (skill asserts ">=2")**
**The article states NO hard minimum.** It refers to "an outgroup species" (singular) — i.e. the method
needs **at least one** outgroup, but no explicit floor of 2 (or any number) is asserted in the accessible
article text. The **documentation** *advises* "at least 3 or better 4 outgroups" to buffer outlier
adjustments when averaging, and sets `max_number_outgroups` **default = 4**. So the downstream skill's
"**>=2**" is **NOT sourced from this paper** (paper is silent on a numeric minimum) and does **not** match
the docs' advice either (which says 3–4). **ABSENT in the paper; docs say ≥3–4 advised, not mandatory.**

**Q3 — Failure attributed to single-lineage Ks when comparing WGDs across differently-rated lineages.**
ANSWERED. Ks estimates for equally-old events differ with each lineage's synonymous substitution rate, so a
focal species' paralog Ks distribution is **not directly comparable** to ortholog Ks distributions involving
other species; straightforward superimposition in a mixed plot **can be misleading** and can misplace a WGD
relative to a speciation (the oil palm τ event was wrongly read as palm-specific in the naive plot). This is
the statement backing the "rate-adjustment is mandatory when rates differ" claim. [article]

**Q4 — Ks validity range for correction (e.g. Ks<1.5)?**
**ABSENT.** No Ks upper bound for correction validity is stated in the accessible article text or the docs
pages read. The value `1.53` appears only as an *example* palm–rice ortholog Ks, **not** as a threshold. Do
not cite this source for a Ks<1.5 (or similar) cutoff.

**Q5 — Reading WGD-before vs -after speciation off the mixed plot.**
PARTIALLY ANSWERED (interpretation captured; exact verbatim rule not accessible). Principle: in the adjusted
mixed plot the paralog WGD peak(s) are compared against the **rate-adjusted ortholog speciation line(s)** on
a common Ks axis. Standard reading (Ks increases with age): a WGD peak at **older (higher) Ks than a
speciation line → WGD predates that speciation → shared** by both lineages; a WGD peak at **younger (lower)
Ks than the line → WGD postdates the speciation → lineage-specific**. In the oil palm case, adjustment moved
the τ event to its "commonly accepted order," correcting the naive misplacement. [Note: an automated
extraction of the docs stated a left/right rule in the opposite direction; that could not be verified and is
**not** trusted here — the older/younger-Ks logic above is the standard interpretation, not a verified
verbatim quote from the source.]

**Q6 — Citation, pages, DOI, license posture.**
ANSWERED. Sensalari, Maere & Lohaus, *Bioinformatics* 38(2):530–532 (2022), DOI 10.1093/bioinformatics/
btab602. **Third author = Rolf Lohaus (not Zwaenepoel) — confirmed.** License: **all-rights-reserved**
("© The Author(s) 2021. Published by Oxford University Press. All rights reserved."); **no CC-BY**. Software
(repo/docs) is GPL-3.0.

---
### design-inference footer
(none — no project framing added; all statements sourced to article abstract/metadata or ksrates docs/repo
as flagged.)
