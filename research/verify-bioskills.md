# bioSkills (GPTomics/bioSkills) — Verification Report

> Source: verification subagent, 2026-06-26. Brief: verify/refute the user's read; bioSkills is our nearest neighbor on the "repository of skills" axis, so concede genuine similarity and locate real distinctions precisely.
> Evidence tags: [verified] / [secondary] / [inference] / [refuted].
> **Headline: three of the user's four hypothesized limitations were refuted or narrowed.** bioSkills is more formidable than a quick read suggests.

## 1. Fair summary
**bioSkills** (github.com/GPTomics/bioSkills) — "a set of SKILLS.md for doing bioinformatics with agents like claude code," by **GPTomics** (an independent "AI neolab for Biology" that also ships `bioTaskBench` and `biojepa`). ~952★, 167 forks, ~198 commits, "Version 3.0" (Feb 14 2026) — young, fast-moving, actively maintained, genuinely popular. **547 skills across 63 categories** per the repo page (secondary listings cite 385 / "400+" — count is moving; hundreds either way), spanning sequence-io, alignment, variant-calling, scRNA-seq, ChIP/ATAC, Hi-C, phylogenetics, pop-gen, metagenomics, proteomics, plus a `workflows` category (~41 end-to-end pipelines). Serious, broad, well-engineered; CLI-rigor discipline is real.

## 2. Claim-by-claim verdict

| # | Claim (user's read) | Verdict | Tag | Basis / quote |
|---|---|---|---|---|
| 1 | Broad repo, many skills/domains | **VERIFIED** | [verified] | "547 skills across 63 bioinformatics categories." |
| 2 | Genuine rigor in CLI/tooling integration | **VERIFIED (strongly)** | [verified] | `skill_writing_reference.md`: mandatory verbatim `## Version Compatibility` block, `primary_tool`, "Per-Tool Failure Modes" template (Trigger/Mechanism/Symptom/Fix), 19-point validation suite. Selection-stats skill documents a real `standardize()` vs `standardize_by_allele_count()` version trap. |
| 3 | Skills NOT for human consumption (agent-facing) | **REFUTED** | [refuted] | Skill files read as human-practitioner prose ("Never open a BED in Excel"; narrative causal chains). Dual-use but plainly written for a human reader; mandated third-person voice is a doc convention, not agent-only framing. |
| 4 | Tied to Claude-style skills / one runtime | **REFUTED** | [refuted] | Installers for **Claude, Codex, Antigravity (Gemini), OpenCode, OpenClaw** + documented conversion ("convert to the Agent Skills standard: `examples/`→`scripts/`, `usage-guide.md`→`references/`"). Multi-target. |
| 5 | Related skills not captured formally | **PARTIALLY REFUTED** | [verified-mixed] | There IS a mandatory `## Related Skills` section ("qualified paths only"), a Decision Tree, and workflow skills carry `workflow: true`, `depends_on: [...]`, `qc_checkpoints: {...}`. BUT links are plain-text paths, format-validated for presence — **not machine-resolved**; no cross-file referential-integrity resolver confirmed. |
| 6 | Source→cast separation + provenance? | **REFUTED (none)** | [verified] | SKILL.md files **are** the source of truth. No abstract upstream "mold," no casting pipeline, no per-artifact provenance lineage. "Provenance" = citations + a tool-version header. CONTRIBUTING: hand-authored, "you are responsible for every line." |
| 7 | Statistical-validity refereeing? | **NUANCED — no automated referee; strong embedded stats content** | [verified] | No empirical/automated validity referee. BUT skills embed serious statistical-correctness content (selection-stats: "'Tajima's D < -2 means a sweep' is wrong by construction"; "\|iHS\|>2 is an empirical convention, NOT a calibrated p-value"). Validation = 19-point lint + separate `bioTaskBench` end-task benchmark. |

## 3. Genuine strengths (credit honestly)
- **CLI-integration rigor is their signature, and it's real.** Concrete mechanism: mandatory verbatim `## Version Compatibility` (pinned versions + introspection commands `pip show`/`packageVersion()`/`--version`→`--help`); instruction to *adapt to the installed API on ImportError/AttributeError rather than retry*; example scripts tagged `# Reference: <pkg> <ver>+ | Verify API if version differs`; "Per-Tool Failure Modes" template. More disciplined than typical skill repos about the agent-tooling-version-mismatch problem.
- **Embedded statistical wisdom** in domain skills (failure-mode tables, "thresholds are conventions not laws," confound callouts w/ citations). High-quality *content* — distinct from a *referee*.
- **Genuinely multi-runtime** with a documented format-conversion step.
- **A 19-point automated lint** + a **separate task benchmark (`bioTaskBench`)**.
- **Structured relationship fields** (`depends_on`, `qc_checkpoints`, `Related Skills`) — more formal than prose-only.

## 4. Axis map vs. us

| Axis | bioSkills | Us | Holds? |
|---|---|---|---|
| 1 Builds reusable skills | YES (hundreds) | YES | **SIMILARITY — concede.** Not a differentiator. |
| 2 Inspectable KB | Skill files + README table; no navigable human KB/site/MOC | Navigable site, progressive disclosure, MOC | Holds — reader-facing KB vs directory of files. |
| 3 Foregrounds knowledge for a HUMAN | Human-readable prose, but no progressive-disclosure learning surface | A site a human reads/learns from | **Holds but NARROW.** Claim "no navigable progressive-disclosure KB," NOT "not for humans." |
| 4 Empirical validity referee | None (lint + benchmark; strong embedded stats content) | Non-self-certifying validity referee | Holds — but credit their embedded stats; distinction is *referee* not "they ignore stats." |
| 6 Portable across runtimes | YES — 5 runtimes + conversion | YES (multi-target cast) | **SIMILARITY — concede.** Not our differentiator vs bioSkills. |
| + Formal inter-skill relationships | `depends_on`/`qc_checkpoints`/`Related Skills` paths, format-validated, NOT cross-file resolved | Wiki-links + Pipelines + schema refs, **machine-checked cross-file resolution** | Holds, narrower than assumed — edge is *resolution* + ordered Pipelines as composed journeys, not "they have nothing." |
| + Source→artifact + provenance | **None** — skills are the source | Abstract Molds → deterministic+LLM cast → per-artifact provenance | **Holds strongly — cleanest, most defensible distinction.** |

## 5. Strongest counter-argument + verdict
**"Isn't bioSkills already the skills repository you want?"** — Strongest form: hundreds of skills, multi-runtime, real CLI-version rigor, structured `depends_on`/`Related Skills`, a benchmark, ~1k stars. On *coverage and tooling discipline* it is ahead of us today.

**Verdict: the counter-argument fails on architecture, not output.** bioSkills' skill files **are** the source of truth — hand-authored, no abstract source, no casting boundary, no per-artifact provenance; relationships format-validated but not cross-file resolved. Our thesis is the opposite stack: inspectable abstract source-of-truth (Molds) → deterministic+LLM **cast** as integration boundary → portable artifacts carrying **provenance**, with **machine-checked** wiki-link/schema/pipeline relationships, fronted by a **human progressive-disclosure KB**, plus a non-self-certifying validity **referee**. *bioSkills is the artifact layer done well; we argue for the layer beneath it.*

## 6. Cautions — what NOT to claim
- ❌ "Tied to one runtime / Claude-only" — **false**, 5 runtimes + conversion.
- ❌ Their skills are "not for human consumption" — conversational human prose. Honest: "no navigable progressive-disclosure KB."
- ❌ "No formal inter-skill relationships" — they have `depends_on`/`qc_checkpoints`/`Related Skills` + 19-pt lint. Edge = machine-checked *resolution* + Pipelines as composed journeys. **Verify our resolver truly resolves these (not just format-lints) before leaning hard.**
- ❌ Don't conflate CLI-version rigor with statistical-validity refereeing — distinct; they clearly have the former.
- ❌ Don't imply they ignore statistics — embedded guidance is excellent; our distinction is an *empirical referee*.
- Hedge the skill count (547 vs 385/400+); eval accuracy numbers NOT retrieved — don't cite a bioSkills accuracy figure.
- **Single safest, fully-verified distinction: source→cast separation + per-artifact provenance.** Lead with it; no qualification needed.

## 7. Key sources
- https://github.com/GPTomics/bioSkills — scale (547/63), stars, v3.0 date, multi-runtime installers.
- https://raw.githubusercontent.com/GPTomics/bioSkills/main/skill_writing_reference.md — authoring contract: `Version Compatibility`, `Related Skills`/`depends_on`/`qc_checkpoints`, 19-pt validation.
- https://raw.githubusercontent.com/GPTomics/bioSkills/main/population-genetics/selection-statistics/SKILL.md — human prose, CLI rigor, embedded stats content, related-skills links.
- https://raw.githubusercontent.com/GPTomics/bioSkills/main/genome-intervals/bed-file-basics/SKILL.md — conversational prose, Goal/Approach, Related Skills.
- https://raw.githubusercontent.com/GPTomics/bioSkills/main/CONTRIBUTING.md — hand-authored, no casting/provenance.
- https://github.com/GPTomics/bioTaskBench — separate task benchmark.

**Bottom line:** Concede axes 1 (builds skills) and 6 (multi-runtime) as genuine similarities, plus CLI-version rigor and structured relationship fields. Real verified distinctions: (a) **source→cast separation + per-artifact provenance** (cleanest, no hedge), (b) machine-checked relationship *resolution* + ordered Pipelines (verify our resolver first), (c) human progressive-disclosure KB (not "they're agent-only"), (d) non-self-certifying empirical validity referee (not "they ignore stats").
