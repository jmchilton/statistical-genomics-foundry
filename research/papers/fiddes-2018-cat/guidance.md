# Guidance — Fiddes et al. 2018, Comparative Annotation Toolkit (Genome Res 28(7):1029)

Source: "Comparative Annotation Toolkit (CAT)—simultaneous clade and personal genome
annotation." Genome Research 28(7):1029–1038. doi:10.1101/gr.233460.117. PMC6028123. OA.
THIS is the real CAT primary — the skill mis-cites CAT as "Smith LP et al 2024," which
does not exist (see reference audit). Lead author Ian T. Fiddes (UCSC).

## Direct the summarizer's attention to:
- What CAT integrates. Capture the exact set of methods CAT combines (the skill says
  AUGUSTUS + TransMap + LiftOff; verify against the paper — TransMap and AUGUSTUS variants
  incl. AugustusTMR/AugustusCGP are likely; LiftOff post-dates 2018 so is probably NOT part
  of the 2018 CAT — flag this discrepancy). Quote the actual component list.
- The input: does CAT consume a Cactus/HAL progressive alignment as its comparative
  substrate? Capture the workflow ordering and that it is Snakemake/Toil-driven.
- What CAT outputs (per-genome + clade annotations, orthology, novel isoform discovery).
  Capture the claimed use cases (rat, great apes, diverse mammals, personal diploid human).
- Any stated advantage over single-tool projection (multi-reference / consensus framing that
  the skill leans on for "reference-choice bias" mitigation). Quote.

## Must-capture verbatim:
- The exact list of integrated tools (to correct the skill's LiftOff-in-CAT claim).
- Repo/config invocation if shown.
