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
docs/
  POSITIONING.md            ← the positioning narrative (the story)
  ARCHITECTURE.md           ← adapted from the foundry, as an explicit diff (inherit/adapt/demote/add)
  GUIDING_PRINCIPLES.md     ← adapted principles (+ net-new "Doing Never Self-Certifies")
  REFEREE_LOOP.md           ← net-new: the do→referee→revise spine + gate obligation
  MOLD_SPEC.md              ← adapted Mold authoring contract (axis dropped; referee-correctness evals)
  CORPUS.md                 ← adapted: the bipolar corpus (established-good + cautionary-bad)
  COMPILATION_PIPELINE.md   ← adapted casting + provenance (Pillar 1); empirical checks run at runtime
  glossary.md               ← adapted term set (relocates to content/ at repo standup)
  MOLDS.md                  ← initial Mold set — a TODO outline (nothing authored yet)
research/
  00-synthesis.md           ← cross-cut of the 4 SOTA lens surveys
  01-bioconductor-r.md  02-statistical-genomics-non-r.md
  03-genomics-broad.md  04-statistics-broad.md
  verify-biomni.md  verify-popper.md  verify-knowledgebase-mcp.md  verify-bioskills.md
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
