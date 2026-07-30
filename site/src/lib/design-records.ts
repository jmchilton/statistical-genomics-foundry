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

/** The shelf the design records render under. Collection-backed, so it carries no row list. */
export const RECORD_GROUP = {
  category: 'foundation',
  title: 'Foundry design records',
  summary:
    'The core rationale: positioning, principles, the referee loop, architecture, Molds, casting, and corpus grounding.',
  action: 'READ THE RECORD',
} as const;

/**
 * The design records, in reading order.
 *
 * Sorted by the note's own `order`, which is what the retired array's POSITION carried and the
 * one thing about it frontmatter could not otherwise express: the sequence is pedagogical, so
 * neither `created` nor the title sorts it right.
 */
export async function getDesignRecords(): Promise<DesignRecord[]> {
  const records = await getCollection('meta');
  return records.sort((a, b) => a.data.order - b.data.order);
}

/** The route a design record renders at — the collection key, like every other note here. */
export function designRecordHref(record: DesignRecord, base: string): string {
  return `${base}/meta/${record.id}/`;
}
