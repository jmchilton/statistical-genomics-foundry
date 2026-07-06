---
description: Summarize one source (paper/tutorial) into a faithful research note, optionally guided by its guidance.md
argument-hint: <collection>/<id>  (e.g. papers/nygaard-2016 or tutorials/deseq2) — then give the citation + URL
---

You are summarizing ONE source into a faithful, reusable research note. The note's home is
`content/research/$1/` — its built summary goes in `content/research/$1/index.md`.

Run this in a CLEAN CONTEXT: read only the source, the guidance file, and this prompt. Do not read
the project's other docs/notes, do not let our thesis bend the summary.

## Step 0 — read the guidance file if it exists
If `content/research/$1/guidance.md` exists, READ IT FIRST. It lists the specific questions this project
needs pulled from this source, plus must-quote items and version-pinning notes. Its questions become
REQUIRED extra content — but obey the one rule that keeps the summary faithful: **guidance directs
ATTENTION, not CONCLUSIONS.** Answer its questions from the source; never bend the source toward a
desired answer. If the source doesn't answer a guidance question, say so explicitly.

## Step 1 — read the source
Fetch the source (citation + URL are given in the invocation). Fetch full text. If access is
limited/paywalled, say so explicitly and summarize ONLY what you could actually read, marking the
boundary. Work ONLY from the source — do NOT add facts from your own knowledge. If you must state
something not in the source, mark it `[summarizer-inferred]`. Preserve the source's OWN numbers,
terms, and framing — do not generalize, round, or "improve" them.

## Step 1.5 — license-aware quoting (decide BEFORE writing §7)
Determine the source's license/copyright posture (look for an explicit license / Creative Commons /
copyright statement on the page or in the package metadata; record it). Then quote accordingly:
- **License permits reproduction** — public domain; Creative Commons (BY / BY-SA / BY-NC*); or a
  free/open-source license (MIT, Apache, (L)GPL, Artistic) covering the documentation: short verbatim
  load-bearing quotes are allowed (§7), each with location + attribution.
- **All-rights-reserved, restrictive, or license UNKNOWN / unverified**: do NOT reproduce verbatim
  prose. Render §7 as **own-words paraphrase** of the load-bearing statements, preserving facts,
  numbers, named methods, and procedure. When in doubt, treat as restrictive.
- **Functional-strings exception (any license)**: short non-expressive strings that are facts, not
  creative expression — exact error messages, function/parameter/argument names, code identifiers,
  numeric thresholds/defaults, equation forms — may be reproduced verbatim regardless of license;
  they are load-bearing for recoverability.
State which mode you used, and apply it to §7 and to any guidance "must-quote" items (under a
restrictive license a "must-quote" becomes a faithful own-words paraphrase).

## Step 2 — produce the structured note (write to `content/research/$1/index.md`)
1. Citation — authors, year, full title, venue, DOI, open-access URL if any; for software
   docs/tutorials also the exact version summarized and your access date.
2. Access note — what you could actually read, and any paywall boundary.
3. Thesis (1 sentence) — the source's central claim, in its own terms.
4. Problem & context.
5. Method / approach — what was actually done. For tutorials/vignettes: recommended procedure AND
   exact default parameters.
6. Key claims / findings — discrete, atomic, independently-citable bullets, with exact quantitative
   results, thresholds, and the conditions under which each holds.
7. Load-bearing statements — under a permissive license: 1–5 SHORT verbatim quotes with location,
   marked verbatim. Under a restrictive/unknown license: own-words paraphrases of the same load-bearing
   statements (no verbatim prose; functional strings excepted). Make the mode explicit in the heading.
8. Stated scope, assumptions, limitations — the source's OWN caveats.
9. Failure modes / invalidity patterns — conditions under which the method becomes invalid or
   misleading, and any detector or symptom the source names (an error message, a diagnostic, a
   violated assumption, a value range). Faithful to the source; mark `[summarizer-inferred]` only
   if you must state one the source implies but doesn't spell out. (This is the referee-relevant
   content — capture it precisely; it is often what a skill needs and what a model would confabulate.)
10. What the source does NOT address — confident silences.
11. Open questions / ambiguities the source leaves unresolved.
12. Guidance answers — if a guidance file existed, a section answering each of its targeted questions
    (with quotes where it asked for must-quotes); note any it doesn't answer.

Be faithful over comprehensive; do not editorialize; do not relate the source to any external
framework. Do NOT add project framing to `index.md` — that lives in a separate flagged footer the
note author maintains, not here.
