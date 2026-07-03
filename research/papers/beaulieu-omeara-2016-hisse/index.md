# Beaulieu & O'Meara 2016 — HiSSE (Hidden State Speciation and Extinction)

## 1. Citation
Beaulieu JM, O'Meara BC. 2016. "Detecting Hidden Diversification Shifts in Models of
Trait-Dependent Speciation and Extinction." *Systematic Biology* 65(4):583–601.
DOI: 10.1093/sysbio/syw022. Published version: https://academic.oup.com/sysbio/article/65/4/583/1753616
(All Rights Reserved, © The Author(s) 2016, Oxford University Press).
Preprint: bioRxiv 10.1101/016386 (4 versions, 2015-03-14 → 2015-12-09), license **CC-BY-NC-ND**,
category Evolutionary Biology, later published as syw022.
Access date: 2026-07-03.

## 2. Access note — READ THIS FIRST (dominant paywall boundary)
**I could reliably read ONLY the abstract.** Every full-text route was blocked or paywalled on
the access date:
- OUP article HTML and OUP `article-pdf` (`syw022.pdf`) → HTTP 403 / paywall (ARR).
- bioRxiv full HTML and full PDF (all 4 versions) → Cloudflare interstitial ("Just a moment…").
- Jina reader proxy → 401 (auth required); Europe PMC → "Subscription required"; ResearchGate →
  "Request PDF"; Semantic Scholar confirms an OA GREEN PDF exists (CC-BY-NC-ND) but it is the same
  Cloudflare-blocked bioRxiv URL.
- The full abstract WAS recoverable verbatim from Europe PMC core (matches the published abstract).

Consequence: **the entire body — Methods, model equations, the observed/hidden state parameterization,
the specific character-independent-diversification (CID) model variants, simulation Type-I/false-positive
rates, any ancestral-state-reconstruction discussion, and the R software/function names — is NOT in the
text I read.** Statements below are drawn from the abstract only. A separate WebFetch "extraction" of the
OUP page returned model-structure specifics (e.g., a "0A/0B/1A/1B" scheme, "CID-2"/"CID-4" labels); those
were NOT verifiable from readable text and appear model-confabulated, so they are **deliberately excluded**
from this note rather than passed through as paper facts. To recover the body, obtain the OUP PDF or an
un-blocked preprint copy.

## 3. Thesis (1 sentence)
State-dependent speciation/extinction (SSE) models can mistake complex, unmeasured, co-distributed drivers
of diversification for an effect of the observed trait; HiSSE fixes this by adding, to each observed state,
a linked **hidden state** with its own diversification and transition dynamics, and can also be configured as
a **character-independent diversification** model for use as a null.

## 4. Problem & context
SSE models are used to test whether evolving a novel trait raised speciation and/or lowered extinction rates.
Per the abstract, it remains unclear whether such models identify real diversification drivers "or whether they
are simply pointing to more complex patterns involving many unmeasured and co-distributed factors." HiSSE is
framed as answering "at least one major criticism of BiSSE (Binary State Speciation and Extinction) methods":
that unmeasured factors, not the scored character, may drive the rate differences BiSSE attributes to the trait.
*(The full statement of this false-association critique lives in the inaccessible body.)*

## 5. Method / approach — (abstract-level only; body inaccessible)
- **HiSSE model.** Extends SSE models by assuming that, "related to each observed state in the model are
  'hidden' states that exhibit potentially distinct diversification dynamics and transition rates than the
  observed states in isolation." So each observed character state carries an associated unobserved (hidden)
  state that can have its own speciation/extinction and transition rates. *(Exact rate parameterization and
  the state/transition matrix are in the inaccessible body.)*
- **Character-independent diversification (CID) use.** The abstract states the model "can be used as
  character-independent diversification models that allow for a complex diversification process that is
  independent of the evolution of a character" — i.e., rate heterogeneity driven by the hidden state alone,
  decoupled from the observed trait. *(Specific CID variants/parameter counts are in the inaccessible body.)*
- **Validation.** Assessed via "rigorous simulation tests" and application to empirical data. *(Simulation
  design, sample sizes, and quantitative error rates are in the inaccessible body.)*
- **Software.** Not named in the abstract. *(The R package/function names are in the inaccessible body /
  package docs; per project convention any package-doc value should be tagged `[tool-doc]`, not attributed
  to this paper.)*

## 6. Key claims / findings (all abstract-sourced)
- HiSSE "specifically accounts for the presence of unmeasured factors that could impact diversification rates
  estimated for the states of any observed trait," addressing a major BiSSE criticism.
- Hidden states can have diversification and transition dynamics distinct from the observed states alone.
- The model can be run as a character-independent diversification model (complex diversification independent
  of the character's evolution).
- Under simulation and on empirical data, HiSSE "performs reasonably well, and can at least detect net
  diversification rate differences between observed and hidden states and detect when diversification rate
  differences do not correlate with the observed states."
- The authors position HiSSE as giving "a more nuanced understanding of trait-dependent diversification."
- **No quantitative thresholds, Type-I rates, or effect sizes appear in the abstract**; those were not readable.

## 7. Load-bearing statements — VERBATIM (license mode: permissive)
License decision: the bioRxiv preprint of this paper is **CC-BY-NC-ND**, a Creative Commons license that permits
short verbatim load-bearing quotation (the published OUP version is ARR, but the quoted sentences below are from
the openly displayed abstract, which is covered by the CC preprint and is not paywalled). Quotes are limited to
the abstract because the body was inaccessible.

- On the false-association problem (Abstract): "It is still unclear, however, whether these models are uncovering
  important drivers of diversification, or whether they are simply pointing to more complex patterns involving
  many unmeasured and co-distributed factors."
- On the fix / BiSSE criticism (Abstract): "an extension to the popular state-dependent speciation and extinction
  models that specifically accounts for the presence of unmeasured factors that could impact diversification rates
  estimated for the states of any observed trait, addressing at least one major criticism of BiSSE (Binary State
  Speciation and Extinction) methods."
- On the hidden state (Abstract): HiSSE "assumes that related to each observed state in the model are 'hidden'
  states that exhibit potentially distinct diversification dynamics and transition rates than the observed states
  in isolation."
- On character-independent use / null framing (Abstract): "how our model can be used as character-independent
  diversification models that allow for a complex diversification process that is independent of the evolution
  of a character."
- On performance (Abstract): HiSSE "performs reasonably well, and can at least detect net diversification rate
  differences between observed and hidden states and detect when diversification rate differences do not
  correlate with the observed states."

## 8. Stated scope, assumptions, limitations (as far as readable)
The abstract itself hedges performance ("performs reasonably well," "can *at least* detect…") and says the authors
"discuss the remaining issues with state-dependent speciation and extinction models in general" — signaling the
paper does not claim to fully resolve SSE-model problems. **The specific stated caveats live in the inaccessible
Discussion.**

## 9. Failure modes / invalidity patterns (referee-relevant)
From the abstract, the named failure mode HiSSE targets: an observed-state SSE model (e.g., BiSSE) will attribute
diversification-rate heterogeneity to the scored character even when the true driver is an unmeasured,
co-distributed factor — a false association / spurious trait-dependence. HiSSE's character-independent
configuration is offered as the check ("detect when diversification rate differences do not correlate with the
observed states"). **Concrete detectors, diagnostics, model-comparison criteria (e.g., AIC deltas), and any
quantified false-positive rates are in the inaccessible body — not captured here.** `[summarizer-inferred]` note:
the abstract implies the character-independent model is meant as a null for comparison against the trait-dependent
model, but the explicit "use it as the null before claiming trait-dependence" recommendation wording is in the
inaccessible body.

## 10. What the source does NOT address (within readable text)
- Any statement about **ancestral-state / marginal reconstruction accuracy** — see §12; the abstract addresses
  diversification-rate inference only.
- Quantitative Type-I error / false-positive rates and simulation conditions.
- Model equations, exact parameterization, CID variant definitions.
- Software package/function names.

## 11. Open questions / ambiguities (from limited access)
- Exact structure and parameter count of HiSSE and of each character-independent (null) variant.
- The precise recommended workflow and model-comparison criterion for declaring trait-dependent diversification.
- Whether/where the body discusses reconstruction of ancestral states as opposed to rates.
- Reported false-positive rates and the tree sizes / regimes where HiSSE is reliable vs. underpowered.

## 12. Guidance answers
Answering each guidance question against **readable text (abstract only)**; body was inaccessible (see §2).

1. **Exact problem when observed-state SSE (BiSSE) attributes all rate heterogeneity to the focal character —
   its own framing of false-association risk.** Partially answered. Abstract framing: models may be "simply
   pointing to more complex patterns involving many unmeasured and co-distributed factors" rather than true
   drivers; HiSSE "specifically accounts for the presence of unmeasured factors… addressing at least one major
   criticism of BiSSE." The detailed statement of the false-association mechanism is in the inaccessible body.

2. **What a hidden state is; HiSSE structure; why it's a valid BiSSE null.** Partially answered. A hidden state
   is an unobserved state linked to each observed state with "potentially distinct diversification dynamics and
   transition rates than the observed states in isolation." The precise structure (rate matrix, transitions)
   enabling it as a null is in the inaccessible body; the abstract only asserts the character-independent
   configuration exists.

3. **Explicit recommendation to use HiSSE / a character-independent (hidden-state-only) model as the null before
   claiming trait-dependent diversification — quote it.** NOT fully answerable from readable text. The abstract
   describes the character-independent capability ("how our model can be used as character-independent
   diversification models that allow for a complex diversification process that is independent of the evolution
   of a character") but the explicit "use it as the null model" recommendation sentence is in the inaccessible
   body and could not be quoted. **Flagged: the must-quote recommendation is behind the paywall.**

4. **Does the paper claim anything about ANCESTRAL STATE / marginal reconstruction accuracy (vs. diversification
   inference only)?** From readable text: **NO — the abstract makes no claim about ancestral-state or marginal
   reconstruction accuracy; it addresses diversification-rate inference only** (detecting net diversification
   differences and whether they correlate with observed states). Whether the body contains an ASR-accuracy claim
   is **unknown (inaccessible)**. **This is load-bearing for the skill: on the text I could verify, this citation
   supports the diversification-inference claim, NOT an "ancestral-state silently wrong" claim. The ASR angle is
   unconfirmed and must be checked against the body before relying on this cite for reconstruction accuracy.**

5. **Simulation Type-I / false-positive rates and conditions.** NOT in readable text. Abstract says only "rigorous
   simulation tests" and that HiSSE "performs reasonably well"; no numbers. Rates/conditions are in the
   inaccessible body.

6. **Software: R package and functions.** NOT in the abstract. (Known separately to be the `hisse` R package, but
   that is package-doc / external knowledge — tag `[tool-doc]`, do not attribute to this paper; not stated in the
   readable text.)
