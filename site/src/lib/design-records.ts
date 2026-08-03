// The design records — the collection-backed half of /design/.
//
// Separate from `design-docs.ts` for a mechanical reason worth stating, because it is not
// obvious and it fails confusingly: `astro.config.mjs` imports the wiki-link remark plugin,
// which imports `design-docs.ts`. Config is loaded OUTSIDE Astro's module graph, so anything
// reachable from it cannot import `astro:content` — the module does not exist yet at that
// point, and the error surfaces as "Unable to load your Astro config" rather than as anything
// about content collections.
//
// So the rule is: `design-docs.ts` stays importable by the config and holds no collection
// access; this module holds the collection access and is imported by pages only.

import { getCollection, type CollectionEntry } from 'astro:content';

export type DesignRecord = CollectionEntry<'meta'>;

/**
 * The two shelves, in the order they render.
 *
 * `record_kind` is a voice contract before it is a sort key — a foundation record argues, an
 * infrastructure record describes — so the shelves render as separate sections rather than as
 * one list with a boundary the reader has to infer. Collection-backed, so neither carries a
 * row list.
 */
export const RECORD_GROUPS = [
  {
    category: 'foundation',
    title: 'Foundry design records',
    summary: 'The core rationale: why the Foundry is shaped this way, and what each choice costs.',
    action: 'READ THE RECORD',
  },
  {
    category: 'infrastructure',
    title: 'Project infrastructure',
    summary: 'How it is built: the code, the content contract, what runs, and where files belong.',
    action: 'READ THE RECORD',
  },
] as const;

export type RecordCategory = (typeof RECORD_GROUPS)[number]['category'];

/**
 * One shelf's design records, in reading order.
 *
 * Sorted by the note's own `order`, which is what the retired array's POSITION carried and the
 * one thing about it frontmatter could not otherwise express: the sequence is pedagogical, so
 * neither `created` nor the title sorts it right. `order` is unique WITHIN a shelf, so the shelf
 * has to be selected before the sort — across both, the numbers collide.
 */
export async function getDesignRecords(category: RecordCategory): Promise<DesignRecord[]> {
  const records = await getCollection('meta');
  return records
    .filter((record) => record.data.record_kind === category)
    .sort((a, b) => a.data.order - b.data.order);
}

/** The route a design record renders at — the collection key, like every other note here. */
export function designRecordHref(record: DesignRecord, base: string): string {
  return `${base}/meta/${record.id}/`;
}
