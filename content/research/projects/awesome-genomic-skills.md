# awesome-genomic-skills

> **github.com/GoekeLab/awesome-genomic-skills** — "A curated list of skills and MCP servers for working with AI coding agents in genomics and bioinformatics."
> Maintained by GoekeLab; CC0-1.0. A curated markdown index — not a skill library — that catalogs ~50+ entries across five sections: genomics agent-skill collections (science-skills, openai life-science-research, anthropics/life-sciences, AWS Kiro, ClawBio, SciAgent-skills, bioSkills, operon), MCP servers (biomcp, gget-mcp, Seqera, knowledgebase-mcp, registries), benchmarks (BioAgent Bench, BiomniBench, BixBench, CompBioBench, SkillsBench), and general agent-skill lists, subdivided by runtime (Claude Code, Copilot, Codex, Cursor, Gemini CLI). Verified 2026-06-27 against the repo README.

## Its framing

awesome-genomic-skills is a discovery index for the genomics agent-skills ecosystem: a hand-curated, CC0 "awesome list" that points to where skills, MCP servers, and benchmarks live, with a short description and developer attribution per entry. It hosts no `SKILL.md` files of its own — every entry is a link out to an external project (it catalogs bioSkills, ClawBio, operon, science-skills, and others side by side). Its value is breadth and orientation: a single reading surface from which a practitioner can find and compare the libraries, servers, and evaluations now appearing across the field, organized by domain and by which coding agent they target.

## Strengths relative to our approach

It leads the Foundry cleanly on ecosystem coverage and on being a thing a human actually reads:

- **Ecosystem breadth no single library matches.** It is the map of the territory — skill libraries, MCP servers, and benchmarks from DeepMind, OpenAI, Anthropic, AWS, GPTomics, ClawBio, and academic labs in one place, cross-referenced by runtime. The Foundry is one library on this map; awesome-genomic-skills is the map.
- **A genuinely human-facing surface.** Unlike the file-directory neighbors (bioSkills, ClawBio), this is authored to be *read* — curated prose, grouped by domain and agent, with per-entry attribution. It is the closest of the surveyed projects to "a destination a human opens to orient," even if it orients rather than teaches.
- **Open, low-friction contribution.** CC0-1.0 and a flat markdown list make it trivially forkable, citable, and PR-extendable — and a natural place for cast skills to be *listed*.
- **Benchmark-aware.** It foregrounds the evaluation layer (SkillsBench's "+16.2 pts" pass-rate claim for curated skills, BiomniBench, BixBench, CompBioBench), tracking how the field measures agent competence — a layer most skill libraries omit entirely.

## Where it sits on our values

| Value | awesome-genomic-skills |
|---|---|
| **Produces skills** | **No (by design)** — purely curatorial; it links to others' skill libraries and authors none itself. Neutral, not a flaw: it is an index, a different kind of object than a skill producer. |
| **Progressive disclosure** | **No** — a flat curated list (category → entry → outbound link). There is a category/entry hierarchy, but no name→body→on-demand-reference disclosure of any skill, because it contains no skills. |
| **Traceability** | **Strong at the index level** — every entry is attributed to its developer and hyperlinked to its source, so a human can follow each pointer to origin. But the links are human-followable markdown, not machine-resolved cross-references, and traceability stops at the boundary: it vouches for *where* a skill lives, not for what any skill cites internally. |
| **CLI instructions derived from CLI docs** | **N/A** — wraps no CLI tools; it is a catalog, not an analysis or tool-invoking artifact. |
| **Portability** | **No skills produced** — it ships no artifacts to port. It does *index* skills across many runtimes (Claude Code, Copilot, Codex, Cursor, Gemini CLI), but cross-runtime breadth here is a property of the things it lists, not of itself. |
| **Human scrutiny** | **The list itself, yes** — readable CC0 markdown, PR-contributable. But it presents pointers and one-line descriptions, not skill internals: a reader scrutinizes the *catalog's* curation, not the data inside any skill. |
| **Knowledge-base backed** | **No** — the curated list *is* the artifact; there is no inspectable knowledge base beneath it, only outbound links to the projects it indexes. |

## Where it diverges from the Foundry

awesome-genomic-skills and the Foundry sit on different rungs of the same ladder: it is a discovery index *above* the skill libraries, while the Foundry is a skill *producer* with a knowledge base *beneath* its artifacts — and it catalogs neighbors like bioSkills and ClawBio that the Foundry positions against directly. The shared axis, credited as a similarity, is that both present a human-readable surface in a field of file-directories; but the index orients (here is where skills live) rather than teaches (here is how a method works and why it is valid), and it foregrounds links, not a progressive-disclosure learning surface with provenance. By its own framing it makes no claim on statistical rigor — it does not mandate null/permutation calibration, FDR control, negative controls, or a referee gate, because catalogs do not run analyses; that empirical-honesty layer is simply orthogonal to what an index does. The crux: it is the field's table of contents, the natural place a cast Foundry skill would be *listed* — not a competitor to what the Foundry *casts*.

## Sources

- https://github.com/GoekeLab/awesome-genomic-skills — README: self-description, CC0-1.0 license, GoekeLab maintainer, the five curated sections, ~50+ indexed entries, per-entry developer attribution, runtime subdivision, and the absence of any hosted skill artifacts.
