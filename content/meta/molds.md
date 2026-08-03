---
type: meta
title: "Molds"
record_kind: foundation
order: 5
tags:
  - meta
status: reviewed
created: 2026-06-26
revised: 2026-08-02
revision: 2
summary: "The axes Molds bucket on, the boundary against Pattern pages, and where the Mold set is still headed."
---

A Mold is the Foundry's unit of action: an abstract, typed template that a cast turns into a skill an agent runs. [[mold-spec]] owns the authoring contract, [[casting]] owns what a cast does with it.

This record owns the shape of the Mold set rather than its membership — the axes a Mold buckets on, the boundary that decides whether a piece of knowledge becomes a Mold at all, and which Molds the Foundry still intends to build. It does not list the Molds that exist; `content/molds/` and the Mold browse answer that, and a list restated here would go stale the first time one was authored.

## The axes a Mold buckets on

Three axes, all carried as tags in `meta_tags.yml` rather than as typed frontmatter fields. [[content-model]] owns the registry contract; what each axis *means* is here.

- **Family** — which side of the analyze/referee split the Mold sits on. `family/a` does the analysis, `family/b` referees it. This is the axis the gate obligation runs on: a Family-A Mold may not certify its own output, and the record that turns that into structure is [[referee-loop]].
- **Role** — the posture within a family. `role/construct` frames, design-reviews, selects, and runs. `role/critique` reasons about validity against known invalidity patterns. `role/calibrate` constructs and runs the empirical check — a permutation null, a simulation against known truth, a negative control. Critique and calibrate are both Family B, and a Mold may carry both.
- **Domain** (with the finer `topic` beneath it) — the subject area the Mold applies to. This axis is the one that grew, because a referee cannot judge a synteny claim with the same knowledge it uses to judge a Ks distribution.

None of the three is a schema enum, and none should become one until the corpus argues for it. The parent Foundry's Mold record carries a required `axis` field describing a source→target conversion; that is not this Foundry's shape, and minting a replacement enum before roughly six to ten Molds have tested the distinction would freeze a guess. Promoting an axis to a typed field is a deliberate later edit, taken when the tag has stopped being ambiguous in practice.

The naming convention tracks role and stays deliberately cheap to revise: `audit-*` and `review-*` for critique, `derive-*` and `design-*` for calibrate, a plain verb for doing.

## Mold or Pattern

A Mold acts; a Pattern page explains. A named invalidity — double-dipping, batch aliased with condition, the garden of forking paths — is a Pattern: it describes a failure with a signature, and several Molds cite the same one. The Mold is the thing that goes looking for that signature in a specific analysis and returns a verdict.

The test is whether the content has a verdict in it. Knowledge a reader consults is reference; knowledge that terminates in pass, flag, or fail is a Mold. Getting this wrong in the reference direction is cheap — a Pattern that should have been a Mold just sits there. Getting it wrong the other way puts explanation inside a cast artifact, where nothing cites it and nothing keeps it current.

## Where the Mold set is going

The Mold set the corpus actually produced is not the one first planned, and the divergence is the useful part. Nearly every authored Mold is a Family-B critique auditor bound to one domain — a referee for a positive-selection claim, a whole-genome alignment, a pangenome openness claim — built out of source notes for that domain's literature. The generic, domain-free referee was written first and is now the broad-spectrum triage case rather than the model for the rest.

Three directions remain open, and none of them has an authored Mold yet:

- **The Family-A guardrails.** Framing a vague ask as a precise statistical question with an estimand; selecting a validated, literature-grounded method instead of inventing one; running the chosen tooling reproducibly with seeds, pinned versions, and provenance. The middle one is the anti-invention guardrail and the direct analog of the parent Foundry's discover-before-authoring rule — recommend an established method, and escalate rather than invent when nothing fits.
- **The calibrate role.** Deriving a null and its calibration check, designing a simulation study under known truth, computing power and required sample size. This is where the gate becomes a *deliverable* rather than infrastructure: no parser ships for "is this method valid," so constructing the right empirical check is itself the skill. Two authored auditors carry `role/calibrate` alongside critique, but no Mold yet has calibration as its whole job.
- **The cross-cutting critiques.** Multiple-testing strategy under dependence, assumption diagnostics per model family, sensitivity and robustness to defensible analytic choices. These sit beside the domain auditors rather than beneath them.

A methodology Protocol — map-to-established, then derive-null, simulation, power, sensitivity — is the one place composition would earn its keep. It gets authored only if the standalone Molds prove they chain; [[architecture]] holds the Mold-primary stance that makes that optional.

## Open questions

- Is Family A in scope as real doing, or mostly orchestration over existing doers plus the anti-invention guardrail? [[positioning]] leans orchestration.
- Do the calibrate Molds *call* tooling (R, Python) or *emit a protocol* a harness runs? This decides whether they need `cli-command` references.
- Does the construct/critique/calibrate triad survive the next ten Molds, or collapse into two roles?
- The domain axis is growing faster than the others. At what point does it need structure beneath it beyond `topic`?
