// Compatibility import for pages and tests. Map construction and resolution live in
// @galaxy-foundry/content-reader and are bound to this instance once in content-reader.ts.
export { buildWikiLinkMap, resolveWikiLink } from './content-reader';
export type { WikiLinkTarget } from './content-reader';
