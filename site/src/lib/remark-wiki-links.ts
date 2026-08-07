import { DESIGN_DOCS } from './design-docs';
import { contentReader, extraContentTargets } from './content-reader';

// Rewrites `[[wiki links]]` in content-collection markdown (papers/tutorials/molds/
// books/patterns) that Astro renders via `<Content />`. The `marked`-based vault-doc path
// (glossary/design docs) handles its own resolution; this is the remark twin, so the two
// pipelines share one link map and one resolver.
//
// The walk and map binding come from @galaxy-foundry/content-reader; the grammar comes from
// @galaxy-foundry/wiki-links. This file supplies this site's extra targets and base.
//
// Backtick-wrapped `[[x]]` no longer resolves. It used to — this plugin carried an
// `inlineCode` branch accommodating the citation-token style the corpus happened to be
// written in — and that left the mark meaningless, since a backtick is equally how the
// glossary names the syntax (`[[Target]]`) and how a note cites a Mold nobody has written
// yet. The corpus was normalized first (#114); the 16 still in backticks are all
// deliberately literal.

export default function remarkWikiLinksPlugin({ base = '' }: { base?: string } = {}) {
  return contentReader.remarkWikiLinks({ base, extraTargets: extraContentTargets(DESIGN_DOCS) });
}
