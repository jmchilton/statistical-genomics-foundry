import {
  createContentReader,
  resolveContentLink,
  type ExtraContentTarget,
  type ContentTarget,
} from '@galaxy-foundry/content-reader';

import { COLLECTIONS, contentPath } from './frontmatter-schema';

export type WikiLinkTarget = ContentTarget;

export const contentReader = createContentReader({
  collections: COLLECTIONS,
  contentPath,
  targetOf: (collection, id) => ({ path: `${collection}/${id}` }),
});

export const markdownFiles = contentReader.markdownFiles;
export const noteFiles = contentReader.noteFiles;
export const noteIds = contentReader.noteIds;

export const extraContentTargets = (
  designDocs: readonly { slug: string }[] = [],
): ExtraContentTarget[] =>
  designDocs.map((doc) => ({ key: doc.slug, target: { path: `design/${doc.slug}` } }));

export const buildWikiLinkMap = (designDocs: readonly { slug: string }[] = []) =>
  contentReader.wikiLinkMap(extraContentTargets(designDocs));

export const resolveWikiLink = (
  value: string,
  linkMap: ReadonlyMap<string, WikiLinkTarget>,
  base: string,
) => resolveContentLink(value, linkMap, base);
