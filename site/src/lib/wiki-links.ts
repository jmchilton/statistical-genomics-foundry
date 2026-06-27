import type { CollectionEntry } from 'astro:content';

export interface WikiLinkTarget {
  /** Site-relative path under base, e.g. `books/msmb/chap1`. */
  path: string;
}

/** Map from slugified note basename → target. Books is the only collection today.
 *  Ids are `<source>/<id>` (the `/index` is stripped in content.config.ts), so the
 *  basename is the per-note id (`chap1`) — unique per chapter, no collision. */
export function buildWikiLinkMap(entries: CollectionEntry<'books'>[]): Map<string, WikiLinkTarget> {
  const map = new Map<string, WikiLinkTarget>();
  for (const entry of entries) {
    const basename = entry.id.split('/').pop()!;
    map.set(basename, { path: `books/${entry.id}` });
  }
  return map;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+-\s+/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-');
}

function stripBrackets(wikiLink: string): string {
  return wikiLink.replace(/^\[\[/, '').replace(/\]\]$/, '');
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
  const slug = slugify(pageLabel);

  if (linkMap.has(slug)) {
    return { href: `${base}/${linkMap.get(slug)!.path}/${anchor}`, label };
  }
  for (const [basename, target] of linkMap) {
    if (basename.startsWith(slug)) {
      return { href: `${base}/${target.path}/${anchor}`, label };
    }
  }
  return { href: null, label };
}
