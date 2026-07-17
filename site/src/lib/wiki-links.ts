import fs from 'node:fs';
import path from 'node:path';

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

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+-\s+/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-');
}

/** True when a string is a bare `[[...]]` wiki link (the reference-manifest ref form). */
export function isWikiLink(s: string): boolean {
  return /^\[\[.+\]\]$/.test(s.trim());
}

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

export function stripBrackets(wikiLink: string): string {
  return wikiLink.replace(/^\[\[/, '').replace(/\]\]$/, '');
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
  const label = stripBrackets(wikiLink);
  const hashIdx = label.indexOf('#');
  const pageLabel = hashIdx >= 0 ? label.slice(0, hashIdx) : label;
  const anchor = hashIdx >= 0 ? label.slice(hashIdx) : '';
  const target = linkMap.get(slugify(pageLabel));
  if (target) return { href: `${base}/${target.path}/${anchor}`, label };
  return { href: null, label };
}
