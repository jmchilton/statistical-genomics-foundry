import fs from 'node:fs';
import path from 'node:path';

import { resolveWikiLink as resolve, slugify } from '@galaxy-foundry/wiki-links';

// The MAP is ours — the routed collections plus the design-doc registry. The grammar and the
// lookup rule are not: they ship in @galaxy-foundry/wiki-links, shared with the parent
// Foundry, so this resolver and its remark twin cannot drift apart.

export interface WikiLinkTarget {
  /** Site-relative path under base, e.g. `patterns/double-dipping`. */
  path: string;
}

// Content root, relative to the site cwd (matches design-docs.ts convention).
const CONTENT_DIR = path.resolve('../content');

// Note-per-directory collections: each `<dir>/<id>/index.md` renders at `<route>/<id>`.
// `[[<id>]]` links resolve to that route; books use `<book>-<chap>` (id `/` → `-`).
const NOTE_COLLECTIONS: { dir: string; route: string }[] = [
  { dir: 'research/books', route: 'books' },
  { dir: 'research/papers', route: 'papers' },
  { dir: 'research/tutorials', route: 'tutorials' },
  { dir: 'molds', route: 'molds' },
  { dir: 'patterns', route: 'patterns' },
];

// Note ids (dir holding an index.md), relative to `base`, with `/index` implied.
function noteIds(base: string): string[] {
  const out: string[] = [];
  const walk = (rel: string) => {
    const abs = path.join(base, rel);
    if (!fs.existsSync(abs)) return;
    for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
      const childRel = rel ? `${rel}/${e.name}` : e.name;
      if (e.isDirectory()) walk(childRel);
      else if (e.name === 'index.md' && rel) out.push(rel);
    }
  };
  walk('');
  return out;
}

/**
 * Build the wiki-link map across every routed collection plus the design-doc registry.
 * Reads the filesystem (not astro:content) so it also runs inside the remark plugin at
 * markdown-compile time. Pass DESIGN_DOCS for the `design/<slug>` targets.
 */
export function buildWikiLinkMap(designDocs: { slug: string }[] = []): Map<string, WikiLinkTarget> {
  const map = new Map<string, WikiLinkTarget>();
  for (const { dir, route } of NOTE_COLLECTIONS) {
    for (const id of noteIds(path.join(CONTENT_DIR, dir))) {
      map.set(slugify(id.replace(/\//g, '-')), { path: `${route}/${id}` });
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
