---
title: "A Macroevolutionary Research Program"
source: harmon-pcm
source_chapter: 1
source_url: https://lukejharmon.github.io/pcm/chapter1_introduction/
---

# Harmon PCM Chapter 1 — A Macroevolutionary Research Program (summary)
> Faithful summary generated in a clean context, license-aware (CC-BY 4.0 → short verbatim load-bearing quotes marked). Source-only; project framing lives elsewhere.

## 1. Citation
Harmon, Luke J. 2019. *Phylogenetic Comparative Methods: Learning from Trees* (subtitle rendered as "learning from trees"). Chapter 1: "A Macroevolutionary Research Program." Book text v1.0.0. License: CC-BY 4.0. Chapter URL: https://lukejharmon.github.io/pcm/chapter1_introduction/ ; book home: https://lukejharmon.github.io/pcm/. Accessed 2026-07-03.

## 2. Access note
Chapter read via web fetch through a summarizing intermediary, not raw source — so verbatim quotes below are as-relayed and should be treated as high-confidence but not byte-verified; I mark them "verbatim (relayed)." Section structure (1.1–1.5) was recovered cleanly. In-chapter citations (author-year) were relayed and are reported as given. I could not independently confirm the exact placement of every quote within a subsection.

## 3. Thesis (1 sentence)
Understanding microevolutionary process in fine detail does not by itself explain the large-scale shape of the tree of life, so a distinct model-based research program — phylogenetic comparative methods, combining biology, mathematics, and computer science — is needed to learn about macroevolution from phylogenetic trees and associated data.

## 4. Problem & context
- Evolution is directly observable and can be described in "exquisite detail" at the microevolutionary scale (gene-frequency change, development, biomechanics, real-time speciation).
- The gap the chapter opens: this fine-grained process knowledge "does not automatically give insight into why the tree of life is shaped the way that it is" (§1.2, verbatim relayed).
- Comparative methods sit at the intersection of population/quantitative genetics, paleobiology, and phylogenetics. Relayed lineage of ideas: Fisher (1930), Lande (1976) applying quantitative genetics to macroevolution; Raup and colleagues (1970s–80s) in paleobiology; Felsenstein (1985) independent contrasts as a pivotal phylogenetics contribution; Harvey and Pagel (1991) credited with advocating the *model-based* approach that drove the field's growth.
- The book's stance is a *research program*: fit explicit mathematical/statistical models to trees + trait/diversification data rather than merely review comparative biology.

## 5. Method / approach
This is an introductory/framing chapter — it sets up the program and previews methods rather than teaching a specific estimator.

- **Phylogenetic comparative methods (definition):** "Comparative methods combine biology, mathematics, and computer science to learn about a wide variety of topics in evolution using phylogenetic trees and other associated data" (§1.1, verbatim relayed). The three ingredients (biology, mathematics, computer science) are explicit.
- **Model-based / model-fitting philosophy:** the core is fitting mathematical models to data; Chapter 2 is previewed as covering model-fitting statistics "with a particular focus on maximum likelihood and Bayesian approaches."
- **Phylogenetic trees as data (§1.3):** a tree carries "detailed information about the patterns and timing of evolutionary branching events"; each branch informs common ancestry of a clade; start time, end time, and branch length encode timing of past speciation events. Note: this introductory section does *not* formally define standard tree vocabulary (tips, nodes, root, topology, monophyly); "ultrametric" is used (some methods "require an ultrametric phylogenetic tree") without a definition here — terminology is deferred to later chapters.
- **Complementarity with fossils:** phylogenies of living species and the fossil record have *different* limitations, so they complement each other; the chapter suggests the best approach may combine fossil and phylogenetic data directly (shared mathematical models make this possible).
- **Software:** the book uses the R statistical environment; sample code for all analyses is promised on a course website; other software (e.g., Arbor) noted as possible.
- **Book map (§1.5):** Ch. 2 = model-fitting/likelihood/Bayesian stats; Chs. 3–9 = models of character (trait) evolution and how to simulate/analyze it on trees; Chs. 10–12 = models of diversification (speciation/extinction through time); Ch. 13 = combined character-evolution + diversification analyses; Ch. 14 = synthesis and future directions.

## 6. Key claims / findings
- Microevolutionary process knowledge, however detailed, does not automatically explain macroevolutionary pattern (the tree's shape). [framing claim]
- Comparative methods can address *which macroevolutionary processes were common vs. rare* across clades, and *whether evolution proceeded differently in some lineages than others* (§, verbatim fragment relayed: "we can find out which processes must have been common, and which rare, across clades in the tree of life; whether evolution has proceeded differently in some lineages compared to others").
- Open substantive question the program targets: whether observed real-time evolutionary potential "is sufficient to explain the diversity of life on earth, or whether we might need additional processes … like adaptive radiation or species selection" (verbatim relayed).
- Living-species phylogenies have hard limits (see §8/§9): ancestral state reconstruction, distinguishing certain time-dependent tempo models, and detecting extinction are named as problems comparative data alone cannot (fully) solve.
- Fossils complement phylogenies precisely because their limitations differ.
- Empirical microevolution examples cited: mice and lizards evolving white coloration on pale sand (Rosenblum et al. 2010); Galápagos finch diet→bill-shape genetics/development/biomechanics (Abzhanov et al. 2004); observed splitting of one species into two (Rolshausen et al. 2009).

## 7. Load-bearing statements (verbatim — CC-BY permits)
All marked "(relayed)" per §2 access note.
1. Program-defining gap (§1.2): "Knowing the evolutionary processes that operate over the course of a few generations, even in great detail, does not automatically give insight into why the tree of life is shaped the way that it is." (verbatim, relayed)
2. Definition (§1.1): "Comparative methods combine biology, mathematics, and computer science to learn about a wide variety of topics in evolution using phylogenetic trees and other associated data." (verbatim, relayed)
3. Limitation caution (§1.4): "Phylogenetic trees provide a rich source of information about the past, but we should be mindful of their limitations." (verbatim, relayed)
4. Fossil complementarity (§1.4): "Phylogenetic approaches provide a useful complement to fossils because their limitations are very different from the limitations of the fossil record." (verbatim, relayed)
5. Author's three-fold goals (§1.5): "My goals in writing this book, then, are three-fold. First, to provide a general introduction to the mathematical models and statistical approaches that form the core of comparative methods; second, to give just enough detail on statistical machinery to help biologists understand how to tailor comparative methods to their particular questions of interest, and to help biologists get started in developing their own new methods; and finally, to suggest some ideas for how comparative methods might progress over the next few years." (verbatim, relayed)
6. Closing image: "I hope that the methods described in this book can serve as a Rosetta stone that will help us read the tree of life as it is being built." (verbatim, relayed)

## 8. Stated scope, assumptions, limitations
- Scope is the *comparative* program: using phylogenetic trees plus associated (trait/diversification) data; software focus is R.
- The chapter's own explicit caution: phylogenetic trees "do not provide all of the answers"; be "mindful of their limitations."
- Named limits of living-species-only data (checkable conditions — if your analysis rests on any of these from extant tips alone, treat as suspect):
  - Ancestral state reconstruction ("reconstructing traits of particular ancestors") is a problem "comparative data alone simply cannot address."
  - Cannot "distinguish between certain types of models where the tempo of evolution changes through time" (time-dependent rate models).
  - Extinction is "a tricky problem when one is limited to samples from a single time interval (the present day)"; some authors argue extinction cannot be detected from tree shape alone.
- Implicit assumption of the program: evolution can be usefully modeled with explicit mathematical/statistical models fit to trees (model-based framing after Harvey & Pagel 1991).

## 9. Failure modes / invalidity patterns
[referee-relevant]
- **Microevolution→macroevolution extrapolation error.** Warning sign: inferring tree-of-life-scale pattern directly from short-term process knowledge. Consequence: unsupported conclusions about why diversity/shape arose. Remedy (chapter's): use explicit macroevolutionary models on trees, don't assume process scales up.
- **Model unidentifiability from extant tips.** Warning sign: fitting/comparing models whose tempo changes through time using only present-day taxa. Consequence: models are not distinguishable — cannot tell which is true. Detector/remedy (stated): recognize the limit; bring in fossil data (different, complementary limitations).
- **Over-reading ancestral states.** Warning sign: treating reconstructed ancestral trait values as reliably knowable from comparative data alone. Consequence: unreliable ancestor reconstructions. Remedy: acknowledged as a problem comparative data "cannot address" — do not over-claim.
- **Extinction invisibility.** Warning sign: inferring extinction dynamics from the shape of a tree of only living species sampled at one time. Consequence: extinction may be undetectable/biased. Remedy: single-time-interval sampling is flagged as the core difficulty; complement with fossils.
- **Empirical check the chapter gestures at (not a formal test):** cross-validation against the fossil record — because fossils' limitations differ, agreement/combination of phylogenetic and paleontological inference is the proposed sanity check; the strongest form is joint fossil+phylogeny analysis under shared models. [summarizer-inferred that this functions as a robustness check; the chapter states the complementarity but frames no specific pass/fail criterion.]

## 10. What the chapter does NOT address
- No formal definitions of tree terminology (tips, nodes, root, edges, topology, monophyly, clade, ultrametric) — deferred to later chapters.
- No mathematics/derivations, no specific model equations (Brownian motion, OU, birth–death) developed here; they are named/previewed only.
- No worked estimation procedure, no likelihood/Bayesian mechanics (deferred to Ch. 2).
- No explicit bulleted "key questions" list — questions are stated in prose, not enumerated.
- No data/parameter thresholds, power calculations, or numeric defaults (this is a framing chapter).

## 11. Open questions / ambiguities left unresolved
- The book's central open scientific question is posed but not answered here: is observed real-time evolutionary potential sufficient to explain Earth's diversity, or are additional processes (adaptive radiation, species selection) required?
- How far living-species phylogenies can be pushed before fossils are strictly necessary is raised but left to later chapters.
- Exact within-subsection placement of several relayed quotes is unverified (see §2); byte-level fidelity of quotes should be re-checked against the raw HTML before use as authoritative verbatim.
- In-chapter citation years (Rosenblum 2010, Abzhanov 2004, Rolshausen 2009, Felsenstein 1985, Harvey & Pagel 1991, Fisher 1930, Lande 1976) are relayed, not source-verified.
