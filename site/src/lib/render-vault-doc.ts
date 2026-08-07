import fs from 'node:fs';

import { resolveContentMarkdown } from '@galaxy-foundry/content-reader';
import { addBoldTermAnchors } from '@galaxy-foundry/wiki-links';

import { marked } from './marked';
import { type WikiLinkTarget } from './wiki-links';

// Loose markdown — the glossary, the design docs — renders OUTSIDE the remark pipeline, from
// files no collection owns, so links are resolved on the STRING before `marked` parses it.
//
// Neither half of that is ours. The grammar and the anchor minting both ship in
// @galaxy-foundry/wiki-links, so this path and its remark twin cannot answer differently. What
// used to be here was a local `/\[\[([^\[\]]+)\]\]/g` plus a local copy of the anchor helpers;
// the regex rewrote inside code spans, where a backtick means the syntax, and it rendered the
// glossary's own definition of `[[Target]]` as `**Target**`. Nothing reported it — the validator
// strips code spans before scanning too, so both surfaces went blind on the same text.

/** Replace `[[wiki links]]` with resolved markdown links (bold fallback when unresolved). */
export function resolveWikiLinks(
  raw: string,
  linkMap: Map<string, WikiLinkTarget>,
  base: string,
): string {
  return resolveContentMarkdown(raw, linkMap, base);
}

/**
 * Load a loose markdown vault doc (e.g. glossary), resolve [[wiki links]], render to HTML,
 * and inject anchor ids on **Term** paragraphs so #term links resolve.
 */
export function renderVaultDoc(
  absPath: string,
  linkMap: Map<string, WikiLinkTarget>,
  base: string,
): string {
  const raw = fs.readFileSync(absPath, 'utf-8');
  const withLinks = resolveWikiLinks(raw, linkMap, base);
  const html = marked.parse(withLinks, { async: false }) as string;
  return addBoldTermAnchors(html);
}
