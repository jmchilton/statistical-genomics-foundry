# Guidance — munafo-2018-collider (paper)

> Targeted questions for `/summarize-source`. Attention-directing, not leading. Maintained by us.
> Why this note: the skill's causal-graph layer (confounder vs mediator vs collider; "adjust for
> everything measured" is wrong; conditioning on a collider induces spurious association) has NO
> backing anywhere in our corpus — MSMB ch13 covers confounding but never colliders. This is the
> cheapest fully-OA primary that states the collider mechanism explicitly. Cross-skill: it also
> serves mendelian-randomization and subgroup-analysis.

> **License posture: license-aware (CC-BY-4.0 → verbatim-ok, license_file required).** Short
> load-bearing verbatim quotes permitted, marked.

## Must capture (the mechanism — this is the whole point)
- The **definition of a collider** and the exact statement of what happens when you condition on /
  adjust for / select on one. Quote it. We need the sentence that says adjustment **induces** an
  association that is not causally there.
- The **contrast with a confounder**: a confounder is a common cause (adjust for it); a collider is
  a common effect (do NOT adjust for it). Quote whatever sentence draws that line.
- Does the paper also address **mediators** (variables on the causal path) and the consequence of
  adjusting for them? Capture it if present; record a silence if not — do not import the mediator
  case from elsewhere.
- The DAG/graphical presentation: capture the structures (the arrow directions) for confounder,
  collider, and any mediator case, described precisely enough to redraw.
- Does the paper explicitly criticize an **"adjust for everything measured" / kitchen-sink covariate**
  strategy? Quote any such statement.

## Must capture (magnitude — the referee needs to know if this matters)
- Any **quantitative** demonstration: simulated or real examples of how large a spurious association
  collider bias can induce, and under what conditions. Capture the numbers and the parameters they
  depend on.
- The paper's stated conditions under which collider bias is **negligible** vs **substantial**.

## Must-quote
- The collider definition.
- The "conditioning on a collider induces bias" sentence.
- Any explicit guidance on which variables to adjust for.

## Silences to record explicitly
- Is this framed for **selection bias / sample selection** specifically rather than covariate
  adjustment generally? If so, say so precisely — we must not overclaim its reach to
  "adjusting for a measured collider covariate" if the paper is about selection into a study.
  (If it IS narrower than we need, flag it: the deeper primary is Greenland, Pearl & Robins 1999
  *Epidemiology* 10:37–48 [paywalled], which would then need its own note.)
- Does it mention batch effects / genomics batch design at all? Almost certainly not — record that
  the transfer to batch-covariate selection is OUR design inference, not the source's claim.

## Pin
- DOI 10.1093/ije/dyx206; IJE 47(1):226–235; access date.
