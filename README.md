# Statistical Genomics Foundry

> **Working name, provisional.** A design-and-research workspace deriving a new project from the Galaxy Workflow Foundry pattern, aimed at statistical genomics. The project itself is still design-stage — what's here is design docs, prior-art research, and positioning.
>
> **📖 Knowledge site: https://jmchilton.github.io/statistical-genomics-foundry/**

## The thesis

An LLM agent doing statistical genomics is productive but **not statistically honest**: it produces plausible-but-invalid work — at worst, *inventing a method* with a convincing name and no validity — and self-certifies it. We are building a portable, inspectable **knowledge base** of agent skills that keeps an LLM both productive *and* honest, across:

- **Family A — do the analysis** (frame, design-review, pick an *established* method, run reproducibly), and
- **Family B — referee the analysis** (audit validity; and *construct the empirical checks the field trusts* — null/permutation, simulation-under-truth, calibration, power).

**Structural bet:** doing never terminates in self-certification — it hands off to an empirical referee gate (analyze → referee → revise).

We inherit the Mold → Cast → provenance architecture, the human-navigable knowledge site, and the validator from the Galaxy Workflow Foundry; we adapt the domain and *add* a referee for statistical method validity.

## Three pillars (how we're distinct — see `docs/POSITIONING.md`)

1. **Source → cast → provenance** *(layer beneath the artifact)* — vs **bioSkills** (skills *are* their source; ours are cast, with provenance).
2. **Refereeing the method's validity** *(layer beneath the p-value)* — vs **POPPER** (referees a hypothesis, assuming the method valid; we check the method).
3. **Foregrounding knowledge for a human** *(surface above)* — vs everyone (none offers a reader's progressive-disclosure surface).

We own the bottom and top of the stack; the middle (the skill artifact, the empirical check) is shared, and we credit it. Positioning is gracious and complementary — every neighbor is good at what it does.

## Layout of this workspace

```
README.md                   ← this file
positioning.md              ← working evidence doc: per-system axis maps + verified distinctions
docs/                       ← design records (POSITIONING, ARCHITECTURE, GUIDING_PRINCIPLES,
                              REFEREE_LOOP, MOLD_SPEC, CORPUS, COMPILATION_PIPELINE, MOLDS, glossary)
content/                    ← the curated knowledge base
  molds/<slug>/             ← abstract action templates (Mold-primary core)
  patterns/<slug>/          ← statistical-method + invalidity-pattern reference pages
  research/                 ← source-reading notes (index.md = faithful summary, guidance.md = owned)
    papers/<id>/  tutorials/<id>/  books/<id>/  experiments/
    projects/               ← prior-art related-project notes + the 4 SOTA lens surveys +
                              00-synthesis (a dump — see issue to organize)
site/                       ← Astro renderer over content/ + docs/ → GitHub Pages
scripts/, corpus-import/    ← MSMB corpus sync (manifest + checksum pin; raw is gitignored)
LICENSES/, license-policy.yml  ← third-party license copies + redistribution policy
```

## Status & next steps
- ✅ Problem statement, 4-lens SOTA survey + synthesis, verified positioning vs 5 systems, three-pillar narrative.
- ✅ Architecture adaptation (diff from parent) + Mold TODO outline.
- ✅ Adapted GUIDING_PRINCIPLES + net-new REFEREE_LOOP.
- ✅ Adapted MOLD_SPEC + CORPUS + COMPILATION_PIPELINE + glossary. **Prose doc scaffold complete.**
- ✅ Repo published + knowledge site live (Astro → GitHub Pages).
- ⏭️ Machine-checkable contract: `meta_schema.yml` + `meta_tags.yml` (drop conversion axes, add Family A/B + role tags).
- ⏭️ Decide project name; prototype flagship Mold (recommendation: `audit-method-validity`).

## Provenance note
This is N=2 in the Foundry-pattern lineage (Galaxy = instance #1, this = instance #2). The pattern earns its abstraction at the *diff* between the two — which is exactly what `docs/ARCHITECTURE.md` records.
