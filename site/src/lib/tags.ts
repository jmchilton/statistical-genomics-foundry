import { getCollection } from 'astro:content';

// The inverse of the per-page tag chips: which entries carry a given tag.
// Every content schema now has a `tags` field, and each collection's route path
// equals its name (the `url` builder relies on that), so all six are linkable.
// To add another: extend the union + `COLLECTION_LABEL`, and add a block in
// `getTaggedEntries` naming its display field (`name` vs `title`).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export type TaggedCollection =
  | 'molds'
  | 'experiments'
  | 'papers'
  | 'tutorials'
  | 'books'
  | 'patterns';

export const COLLECTION_LABEL: Record<TaggedCollection, string> = {
  molds: 'Molds',
  experiments: 'Experiments',
  papers: 'Papers',
  tutorials: 'Tutorials',
  books: 'Books',
  patterns: 'Patterns',
};

export interface TaggedEntry {
  collection: TaggedCollection;
  id: string;
  name: string;
  summary?: string;
  tags: string[];
  url: string;
}

const row = (
  collection: TaggedCollection,
  id: string,
  name: string,
  summary: string | undefined,
  tags: string[],
): TaggedEntry => ({ collection, id, name, summary, tags, url: `${base}/${collection}/${id}/` });

export async function getTaggedEntries(): Promise<TaggedEntry[]> {
  const rows: TaggedEntry[] = [];
  // Molds carry `name` + `summary`; source notes carry `title` and no summary.
  for (const e of await getCollection('molds')) rows.push(row('molds', e.id, e.data.name, e.data.summary, e.data.tags));
  for (const e of await getCollection('experiments')) rows.push(row('experiments', e.id, e.data.name, e.data.summary, e.data.tags));
  for (const e of await getCollection('papers')) rows.push(row('papers', e.id, e.data.title, undefined, e.data.tags));
  for (const e of await getCollection('tutorials')) rows.push(row('tutorials', e.id, e.data.title, undefined, e.data.tags));
  for (const e of await getCollection('books')) rows.push(row('books', e.id, e.data.title, undefined, e.data.tags));
  for (const e of await getCollection('patterns')) rows.push(row('patterns', e.id, e.data.name, undefined, e.data.tags));
  return rows;
}

/** tag → entries carrying it. The key is the full namespaced tag (`family/b`). */
export async function getEntriesByTag(): Promise<Map<string, TaggedEntry[]>> {
  const byTag = new Map<string, TaggedEntry[]>();
  for (const e of await getTaggedEntries())
    for (const t of e.tags) {
      const list = byTag.get(t);
      if (list) list.push(e);
      else byTag.set(t, [e]);
    }
  return byTag;
}

// The Family-A/B role + family a Mold's tags encode — shared by the index pages
// that group/label by them (the parent's `axis` grouping, adapted to namespaced tags).
export const roleOf = (tags: string[]) => tags.find(t => t.startsWith('role/'))?.split('/')[1] ?? null;
export const familyOf = (tags: string[]) => tags.find(t => t.startsWith('family/'))?.split('/')[1] ?? null;
