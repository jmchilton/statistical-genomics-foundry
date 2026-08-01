import { resolveWikiLink as resolve, slugify } from '@galaxy-foundry/wiki-links';

import { noteIds } from './content-files';
import { COLLECTION_NAMES } from './frontmatter-schema';

// The MAP is ours — the routed collections plus the design-doc registry. The grammar and the
// lookup rule are not: they ship in @galaxy-foundry/wiki-links, shared with the parent
// Foundry, so this resolver and its remark twin cannot drift apart.

export interface WikiLinkTarget {
  /** Site-relative path under base, e.g. `patterns/double-dipping`. */
  path: string;
}

/**
 * Build the wiki-link map across every routed collection plus the design-doc registry.
 * Reads the filesystem (not astro:content) so it also runs inside the remark plugin at
 * markdown-compile time. Pass DESIGN_DOCS for the `design/<slug>` targets.
 *
 * Driven by COLLECTIONS rather than by a list of its own, so routed notes and wiki-link targets
 * cannot drift into separate inventories.
 *
 * The collection KEY is the route, which is why there is no route column to keep in step.
 * collection-routes.test.ts pins that against src/pages.
 */
export function buildWikiLinkMap(designDocs: { slug: string }[] = []): Map<string, WikiLinkTarget> {
  const map = new Map<string, WikiLinkTarget>();
  for (const name of COLLECTION_NAMES) {
    for (const id of noteIds(name)) {
      map.set(slugify(id.replace(/\//g, '-')), { path: `${name}/${id}` });
    }
  }
  for (const doc of designDocs) {
    map.set(slugify(doc.slug), { path: `design/${doc.slug}` });
  }
  return map;
}

/** Resolve a `[[...]]` wiki link to an entry href. Unresolved links return href: null. */
export function resolveWikiLink(
  wikiLink: string,
  linkMap: Map<string, WikiLinkTarget>,
  base: string,
): { href: string | null; label: string } {
  const label = wikiLink.replace(/^\[\[/, '').replace(/\]\]$/, '');
  const hashIdx = label.indexOf('#');
  const anchor = hashIdx >= 0 ? label.slice(hashIdx) : '';
  const target = resolve(wikiLink, linkMap);
  if (target) return { href: `${base}/${target.path}/${anchor}`, label };
  return { href: null, label };
}
