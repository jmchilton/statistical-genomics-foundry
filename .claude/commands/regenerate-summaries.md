---
description: Regenerate MSMB chapter summaries in content/corpus/msmb/ from raw chapters
argument-hint: "[chapter number, or empty for all 1-13]"
allowed-tools: Read, Write, Bash, Agent
---

Regenerate the MSMB corpus summaries from the synced raw chapters, applying the
canonical summary spec and wrapping each result in license frontmatter.

## Selection

`$ARGUMENTS` chooses which chapters to (re)build:

- **empty** → all default chapters: `1 2 3 4 5 6 7 8 9 10 11 12 13`
- **a number (or space-separated numbers)** → just those chapters
- **`14`** is valid but **excluded from the default run** (held out separately); build it only when explicitly named.

Reject any number outside 1–14 with a clear error.

## Chapter map (number → `slug | Title`)

```
1  generative-models-discrete-data      | Generative Models for Discrete Data
2  statistical-modeling                 | Statistical Modeling
3  data-visualization                   | Data Visualization
4  mixture-models                       | Mixture Models
5  clustering                           | Clustering
6  testing                              | Testing
7  multivariate-analysis                | Multivariate Analysis
8  high-throughput-count-data-glms      | High-Throughput Count Data and Generalized Linear Models
9  multivariate-heterogeneous-data      | Multivariate Methods for Heterogeneous Data
10 networks-and-trees                   | Networks and Trees
11 image-data                           | Image Data
12 supervised-learning                  | Supervised Learning
13 design-high-throughput-experiments   | Design of High-Throughput Experiments and their Analyses
14 statistical-concordance              | Statistical Concordance
```

`NN` is the zero-padded number (`01`…`14`). Raw input is `corpus-import/msmb/raw/NN-chap.html`; output is `content/corpus/msmb/chNN-<slug>.md`.

## Procedure

1. **Preflight.** Confirm `corpus-import/msmb/summary-prompt.md` exists and the raw chapter HTML for each selected chapter exists under `corpus-import/msmb/raw/`. If raw chapters are missing, stop and tell the user to run `scripts/sync-msmb.sh` first — do not invent content.

2. **Per chapter, fan out a subagent** (run the selected chapters' agents concurrently — one Agent call per chapter, all in one message). Give each agent:
   - the full contents of `corpus-import/msmb/summary-prompt.md` (the spec — do not paraphrase it),
   - the assigned chapter's Title and number,
   - the full raw HTML of that chapter,
   - an instruction to return **ONLY** the 8-section summary body — no preamble, no frontmatter, no H1.

   Subagent write permissions are unreliable here, so each subagent **returns** its summary body as its final message; it must not write files.

3. **You (the main session) write each file.** Wrap the returned body with this exact frontmatter + H1, then write `content/corpus/msmb/chNN-<slug>.md`:

   ```
   ---
   title: "<Title>"
   source: msmb
   source_chapter: <n>
   source_url: https://www.huber.embl.de/msmb/<NN>-chap.html
   license: CC-BY-NC-SA-2.0
   license_file: LICENSES/msmb.LICENSE
   attribution: "Holmes S, Huber W. Modern Statistics for Modern Biology. Cambridge University Press; 2019. https://www.huber.embl.de/msmb/"
   derived: own-words-summary
   ---

   # <Title> — MSMB Chapter <n> (summary)

   _Own-words summary of an external source (see frontmatter for license/attribution). Not a substitute for the original chapter._

   <body>
   ```

   Refuse to write if a subagent returned empty/whitespace output; report which chapter failed.

4. **Report.** List each chapter written (path), and note any skipped (e.g. ch14 when not requested) or failed.

## Notes

- This **overwrites** existing summaries — that is the point of "regenerate." Only the model-generation step is non-deterministic; everything else (selection, slugs, frontmatter) is fixed.
- Faithfully apply the spec's copyright/abstraction rules: own-words synthesis, preserve established method/distribution/tool names, strip incidental example/dataset/variable names, no transcribed code.
