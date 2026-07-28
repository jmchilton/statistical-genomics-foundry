import remarkWikiLinks from '@galaxy-foundry/wiki-links/remark';
import { resolveWikiLink } from '@galaxy-foundry/wiki-links';

import { buildWikiLinkMap } from './wiki-links';
import { DESIGN_DOCS } from './design-docs';

// Rewrites `[[wiki links]]` in content-collection markdown (papers/tutorials/molds/
// books/patterns) that Astro renders via `<Content />`. The `marked`-based vault-doc path
// (glossary/design docs) handles its own resolution; this is the remark twin, so the two
// pipelines share one link map and one resolver.
//
// The walk and the grammar come from @galaxy-foundry/wiki-links. This file supplies the map
// and the href shape, and nothing else.
//
// Backtick-wrapped `[[x]]` no longer resolves. It used to — this plugin carried an
// `inlineCode` branch accommodating the citation-token style the corpus happened to be
// written in — and that left the mark meaningless, since a backtick is equally how the
// glossary names the syntax (`[[Target]]`) and how a note cites a Mold nobody has written
// yet. The corpus was normalized first (#114); the 16 still in backticks are all
// deliberately literal.

export default function remarkWikiLinksPlugin({ base = '' }: { base?: string } = {}) {
  const map = buildWikiLinkMap(DESIGN_DOCS);
  return remarkWikiLinks({
    resolve: (link) => {
      const target = resolveWikiLink(link.target, map);
      return target ? { href: `${base}/${target.path}/` } : null;
    },
  });
}
