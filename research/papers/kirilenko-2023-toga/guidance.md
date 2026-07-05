# Guidance — Kirilenko et al. 2023, TOGA (Science 380:eabn3107)

Source: "Integrating gene annotation with orthology inference at scale." Science
380(6643):eabn3107. doi:10.1126/science.abn3107. OA via PMC10193443. Check supplementary
materials for thresholds. Version-pin: this is the method paper; separately note the
hillerlab/TOGA README may state operational limits the paper does not.

## Direct the summarizer's attention to:
- The intactness classification. Does the paper define the per-transcript status
  categories? Capture the FULL set and the EXACT letter codes/labels as the paper writes
  them (the skill claims I / PI / UL / L / M / PM = intact / partial-intact / uncertain-loss
  / lost / missing(assembly gap) / partial-missing). Quote the paper's own definition of
  each, especially the distinction between "lost" and "missing/assembly gap".
- The orthology classification. Capture the exact relationship categories (skill claims
  one2one / one2many / many2one / many2many, plus a paralogous-projection / no-orthologous-
  chain code "PG"). Quote how each is defined.
- The classifier. What algorithm classifies genes (skill/README say XGBoost gradient
  boosting trained on human–mouse Ensembl Compara orthologs)? What FEATURES does it use
  (intronic/intergenic conservation, synteny, coding similarity)? Is there a probability/
  posterior cutoff for calling a projection an ortholog or "intact"? If the paper states a
  numeric threshold (skill claims posterior > 0.9), QUOTE it verbatim with its context; if
  no such number appears, say so explicitly — do not supply one.
- Maximum divergence for reliable projection. Does the paper state a divergence limit in
  Myr or a clade scope (skill claims ~300 Myr, vertebrate)? Quote the exact number and the
  sentence around it, or record that the paper gives no such figure.
- False-loss / artifact handling. Does the paper discuss how assembly gaps, fragmented
  assemblies, or alignment failures can cause spurious "lost" calls, and any safeguards?
  Quote the relevant passage — this is the validity axis.
- Intactness vs pseudogenization. Does the paper state what TOGA does and does NOT detect
  (coding capacity vs expression loss)? Quote any explicit scope limitation.
- Input requirements. What alignment input does TOGA consume (chain files from Cactus HAL
  via halSynteny, or LASTZ chains)? Capture the pipeline ordering and required file formats.
- Scale claims: capture the exact genome counts (488 mammals, 501 birds — verify) and what
  reference/query setup produced them.

## Must-capture verbatim (functional strings / facts):
- The output file names TOGA produces (loss_summ_data.tsv, orthology_classification.tsv,
  query_annotation.bed/gff) if named in the paper or supp.
- Any numeric thresholds, the classifier name, and the feature list.
