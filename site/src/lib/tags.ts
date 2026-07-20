import { getCollection, type CollectionEntry } from 'astro:content';

// The inverse of the per-page tag chips: which entries carry a given tag.
// Only `moldSchema` collections have a `tags` field, and only routed ones can be
// linked — today that's `molds` + `experiments` (the other collections have no
// tags). To add another: extend the union + `LABELS` below, and add a `toRows`
// spread in `getTaggedEntries` (the url assumes the route path equals the name).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export type TaggedCollection = 'molds' | 'experiments';

export const COLLECTION_LABEL: Record<TaggedCollection, string> = {
  molds: 'Molds',
  experiments: 'Experiments',
};

export interface TaggedEntry {
  collection: TaggedCollection;
  id: string;
  name: string;
  summary?: string;
  tags: string[];
  url: string;
}

// Both collections share `moldSchema`, so a single mold entry type covers either.
type Moldish = CollectionEntry<'molds'> | CollectionEntry<'experiments'>;

function toRows(collection: TaggedCollection, entries: Moldish[]): TaggedEntry[] {
  return entries.map(e => ({
    collection,
    id: e.id,
    name: e.data.name,
    summary: e.data.summary,
    tags: e.data.tags ?? [],
    url: `${base}/${collection}/${e.id}/`,
  }));
}

export async function getTaggedEntries(): Promise<TaggedEntry[]> {
  return [
    ...toRows('molds', await getCollection('molds')),
    ...toRows('experiments', await getCollection('experiments')),
  ];
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
