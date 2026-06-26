# Positioning — Statistical Rails for LLM-Driven Statistical Genomics

> The narrative. For the evidence behind every claim here — per-system verification with refutations — see `../positioning.md` and `../research/`. This doc is the story; that doc is the receipts.

## The problem

Point an LLM agent at a statistical-genomics analysis and it is genuinely strong at the mechanical, integrative work: wiring tools, scaling compute, reproducing published pipelines, running applications end to end. But it fails in one specific, dangerous, hard-to-detect way — it produces statistically **plausible-but-invalid** work and certifies it with fluent, authoritative rationale. The sharpest case: it will *invent a method*, give it a convincing derivation and a memorable name, and report results, when the method has no statistical validity — uncontrolled error rates, circular / double-dipped inference, unmet assumptions, a confounded design. Because the agent is the only judge in the loop, nothing catches it.

This isn't a hypothetical. It's a documented failure mode. The StatQA benchmark (NeurIPS 2024) shows LLMs *systematically* fail method-applicability and assumption judgment — they pick the wrong method for the context far more than humans do. "Prompt-Hacking: the new p-Hacking?" names the threat of running analyses until something turns significant. "When Stability Fails" shows that an agent being *self-consistent* is not the same as it being *correct*. The premise needs no defending.

## What we are building

A portable, inspectable **knowledge base** of agent skills that makes an LLM both **productive and statistically honest**, across two families of work:

- **Family A — do the analysis:** frame the question, review the experimental design, select an *established, appropriate* method (rather than inventing one), run it reproducibly.
- **Family B — referee the analysis:** audit a method for the classic invalidity patterns, and — critically — *construct the empirical checks the field actually trusts*: null / permutation calibration, negative controls, simulation under known truth, power, sensitivity.

The structural bet is one sentence: **doing never terminates in self-certification.** Every analysis hands off to a referee gate (analyze → referee → revise), and the referee leans on external, empirical checks rather than the agent's own reasoning.

We inherit this shape from the **Galaxy Workflow Foundry**, a working knowledge-base-plus-casting system for building Galaxy workflows. From it we take the Mold → Cast → provenance architecture, the human-navigable knowledge site with progressive disclosure, and the validator-as-cross-resolver. We adapt the domain (the grounding corpus becomes statistical-methods literature and cautionary negative examples; the deterministic gate becomes an empirical referee), and we *add* the one thing the parent never needed: a referee for statistical method validity.

## How we are distinct — three pillars

We surveyed and individually verified the prior art. Each strong system is closest to us on a *different* axis; verifying each one located a distinct, defensible pillar. The honest position is the union of three, not any single claim. **Every neighbor below is genuinely good at what it does — we link to it, credit it, and locate ourselves precisely. This is complementary positioning, not a takedown.**

### Pillar 1 — Source → cast → provenance *(the layer beneath the artifact)*
Our nearest neighbor on "a repository of skills" is **bioSkills** (GPTomics) — hundreds of well-engineered bioinformatics skills, multi-runtime, with genuinely impressive discipline about CLI-tool versions. It is the artifact layer done very well. The difference is architectural, not quality: bioSkills' skill files *are* the source of truth, hand-authored. Ours are **derived artifacts**, *cast* from an inspectable abstract source (a "Mold"), each carrying provenance recording exactly what produced it. We argue for the layer beneath the artifact. (Building skills, and shipping to multiple runtimes, are genuine *similarities* — not ours to claim.)

### Pillar 2 — Refereeing the method's validity *(the layer beneath the p-value)*
Our nearest neighbor on "an empirical referee" is **POPPER** (Stanford, ICML 2025) — a rigorous, non-self-certifying falsification agent that aggregates per-experiment evidence with provable Type-I error control. It genuinely referees, with real statistical machinery (it even uses permutation tests and negative controls). We credit that fully; the empirical-referee posture is a *similarity*. The difference is the **unit refereed**: POPPER controls error over the falsification *decision* while *assuming each experiment yields a valid p-value* (its Assumption 1). We referee the layer it trusts as input — *is the method producing that p-value itself valid?* (assumptions met, no double-dipping, is the named method even real and appropriate, is its error rate actually controlled). We sit beneath the p-value.

### Pillar 3 — Foregrounding knowledge for a human *(the surface above the artifact)*
This one is uncontested. Across every system we checked — Biomni, POPPER, bioSkills, the knowledgebase-mcp cluster, awesome-genomic-skills, GenoTEX, Analyst-Inspector, AI Scientist — **none foregrounds knowledge for a human to read and learn from.** They are agents, frameworks, libraries, skill-indexes, and retrieval servers. The sharpening that matters: several *store* knowledge inspectably (plain files on disk) — but operator-inspectable storage is not a reader's surface. The test isn't "can a human open the files," it's "is there a reading-and-learning destination with progressive disclosure." Everyone offers, at most, an operator/curator surface. Nobody offers a reader's surface. We do — knowledge authored to be read and learned by humans, not merely stored for an agent to retrieve. (We inherit this from the Foundry pattern; it is novel only relative to the statistical-genomics landscape.)

### The shape
Pillars 1 and 2 are both *the layer beneath* — beneath the artifact, beneath the p-value. Pillar 3 is the human surface *above*. We own the bottom and the top of the stack; the middle — the skill artifact itself, the act of running an empirical check — is shared with strong prior art, and we credit it.

## Conceded similarities (we never claim these as ours)
- Building reusable skills — **bioSkills**.
- Multi-runtime portability — **bioSkills**.
- Running empirical, non-self-certifying statistical checks — **POPPER**.
- Storing knowledge as inspectable files — the **knowledgebase-mcp** cluster.
- In-loop self-critique — **Biomni**.

## The complementary read
Several of these are not competitors at all. The knowledgebase-mcp servers could be a RAG *backend* we use. awesome-genomic-skills is a *discovery surface* our cast skills could be listed in. Biomni is a powerful *doer* whose correctness check we automate. POPPER's sequential-error-control math is a *mechanism* our referee loop could build on. Positioning here is about locating a layer, not claiming a territory.
