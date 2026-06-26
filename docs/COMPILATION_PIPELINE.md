# Compilation Pipeline / Casting (adapted from the Galaxy Workflow Foundry)

> Adapted from the parent's `docs/COMPILATION_PIPELINE.md`. This doc is **mostly portable** — the casting mechanism (deterministic assembly + per-kind dispatch + LLM condensation only where needed) and the **provenance schema** are domain-neutral, and the provenance contract *is* Pillar 1 (source→cast→provenance). The adaptations are narrow: the `schema` kind is demoted, the tool ecosystem changes, and one nuance matters — **the referee's empirical checks run at the generated skill's runtime, not at cast time.** Status: adaptation; same "lock the contract, not the implementation" stance as the parent.

## What casting is (inherited)

Casting takes a Mold (typed reference manifest + procedural body) and its declared references, and produces a target-specific, **isolated** cast artifact — no links back, no runtime dependency on the source. The generated skill body is a **deterministic** render of the Mold body + artifacts + resolved references; individual `mode: condense` references may be LLM-produced and recorded in provenance. If a cast looks under-instructed, improve the Mold body or referenced notes and re-cast — never hand-edit generated `SKILL.md`.

Casting is **per-kind dispatch**, not one resolve-and-inline pass:

| Reference kind | Casting transformation | Lands at | Notes for us |
|---|---|---|---|
| `pattern` | verbatim or LLM-condense per `mode` | `references/patterns/<slug>.md` | statistical-method + invalidity patterns; heavy use |
| `research` | verbatim or condense per `mode` | `references/notes/<basename>` | corpus notes (methods + cautionary examples); **our heaviest kind** |
| `cli-command` | deterministic JSON sidecar | `references/cli/<slug>.json` | our tool ecosystem (R/Bioconductor, PLINK, …); author lazily |
| `schema` | verbatim copy of the serialized export | `references/schemas/<slug>.schema.json` | **demoted** — rare (prose-shaped outputs); reserved for genuinely structured artifacts |
| `prompt` | raw sidecar copied verbatim | `references/prompts/<slug>.md` | unchanged |
| `example` | verbatim copy | `references/examples/` | planted-invalid / known-truth fixtures (see `MOLD_SPEC.md`) |
| `eval` | **never packaged** | — | Foundry-only |
| `mold` (smell) | discouraged | — | factor shared content into other kinds |

Verbatim paths are deterministic; LLM condensation is reserved for `pattern`/`research`. `mode: condense` is a two-phase contract: the deterministic caster writes a `pending_llm: true` placeholder; the `/cast` LLM phase fills it; the verifier rejects committed provenance with any unfilled entry.

## Cast from structure, not rendered prose (inherited principle, our examples)

When an upstream source ships *both* a structured form (YAML, JSON Schema, signalling-question table) *and* a rendered human form (prose, HTML), **cast from the structured source** — denser per token, schema-regular, preserves identifiers. Our canonical cases:
- **Reporting standards / checklists** — PROBAST-AI signalling questions, ClinGen/PRS-RS items, MIQE. Where a machine-readable form exists, cast it; the prose is a site-rendering concern.
- **Method/assumption specs** — where a method ships a structured assumption/parameter description, prefer it over the narrative vignette.

## ⚠️ Empirical checks run at runtime, not cast time (our nuance)

The parent notes "casting does not invoke gxwf/Planemo — those run at the generated skill's runtime." **Our analog is sharper and load-bearing:** casting does **not** run permutation tests, simulations, or calibration. The *calibrate* Molds (`derive-null-and-calibration`, `design-simulation-study`) package a **procedure** for constructing and running the empirical check; the check itself executes when the cast skill runs, against real data. Casting packages the referee; it does not referee. (This keeps casting deterministic and read-only, exactly as in the parent.)

## Provenance (inherited essentially verbatim — this is Pillar 1)

Every cast writes a required `_provenance.json`: the Mold object (name, path, revision, content hash, commit), `cast_at`, `cast_history[]`, `refs[]` (each with kind, mode, src/dst, `used_at`, `load`, `evidence`, `src_hash`, `dst_hash`, `source: deterministic|llm`, and for LLM refs the prompt + model identity), and the runtime `artifacts` handoff contract. `refs[]` sorted `(kind, src)` for stable diffs. This is the cleanest distinction from prior art (vs bioSkills, whose skill files *are* the source with no derivation lineage) — so it carries over unchanged. Do not lighten provenance.

## When casting runs / drift / versioning / reproducibility (inherited)
- **Triggers:** manual (`cast <mold> --target=<target>`), CI on Mold change (re-cast + surface diff), watch-on-change.
- **Drift:** a cast is stale when the Mold hash, any ref src/dst hash, the deterministic `SKILL.md` render, the target adapter, or the casting model changes. A `--check`/verifier enumerates stale casts.
- **Versioning:** no semver on Molds or casts; identity = content hash + commit SHA; re-casting is the migration path.
- **Reproducibility:** deterministic assembly is byte-stable aside from timestamps; LLM-condensed refs are traceable via recorded prompt+model identity.

## What casting does NOT do (inherited, adapted)
- Does not write to the source KB (read-only against `content/`; all writes go to `casts/`).
- **Does not run statistical tools or empirical checks** (R/Bioconductor/PLINK/simulators) — that's the cast skill's runtime job (see the nuance above).
- Does not update Molds — migrate weak instructions into the Mold body and re-cast.
- Does not touch `eval.md` / `scenarios.md` — Foundry-only.

## Minimum exercise (adapted)
- One target: **Claude**. One pinned casting model.
- Cast 3–4 diverse Molds end-to-end once authored: a **critique** referee (`audit-method-validity` — exercises `pattern` + `research` from the cautionary-bad corpus), a **calibrate** referee (`derive-null-and-calibration` — exercises the runtime-empirical-check packaging + maybe a `cli-command`), a **Family A** guardrail (`map-question-to-established-method` — exercises established-good corpus refs), and one with a planted-invalid `example`/`scenario`. Diversity exercises the per-kind dispatch.
- Commit casts; review the actual `SKILL.md` + `_provenance.json` outputs. If they look reasonable and provenance holds, scale.
