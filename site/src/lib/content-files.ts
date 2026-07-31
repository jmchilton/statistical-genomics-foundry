// Finding the notes in a collection — once, for every caller that needs to.
//
// This walk existed four times: `walkIndexFiles` in corpus-conformance.test.ts and again,
// character for character, in registry-drift.test.ts; `noteIds` in wiki-links.ts; and the
// loaders' glob in content.config.ts. Each carried its own copy of the rule that a note is an
// `index.md`, and the loaders' copy was the only one that could ever have said otherwise.
//
// Split from frontmatter-schema.ts rather than added to it: that module is the contract and
// reaches for no filesystem, which is worth keeping — content.config.ts imports it, and a
// `node:fs` in the import graph of an Astro config is a bad trade for one function.
//
// Paths here are CONTENT-RELATIVE, the frame COLLECTIONS is written in, so a path can be
// matched against the table without reframing it first. Callers that need to open a file put it
// back through `contentPath`.

import fs from 'node:fs';

import { matchesCollection } from '@galaxy-foundry/kind-schema/collections';

import { COLLECTIONS, contentPath, type CollectionName } from './frontmatter-schema';

/**
 * Every file under a content-relative directory, as content-relative paths.
 *
 * `''` is the content root, which is why `rel` is built conditionally rather than by
 * interpolation — the obvious `${dir}/${name}` would hand the root's children a leading slash.
 */
function walk(dir: string): string[] {
  const abs = contentPath(dir);
  if (!fs.existsSync(abs)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    const rel = dir ? `${dir}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(rel));
    else if (entry.isFile()) out.push(rel);
  }
  return out;
}

/**
 * Every markdown file under `content/`, as content-relative paths, sorted.
 *
 * Broader than `noteFiles`: notes, the companions their kinds declare, and the loose prose that
 * is neither. A caller that needs to know which of those a file IS asks the table; this answers
 * only "what markdown is there", which is the question a corpus-wide sweep starts from.
 */
export function markdownFiles(): string[] {
  return walk('')
    .filter((rel) => rel.endsWith('.md'))
    .sort();
}

/**
 * The notes in one collection, as content-relative paths, sorted.
 *
 * Selection is `matchesCollection` against that collection's own row, so the table decides what
 * counts as a note — not this function, and not four separate callers agreeing by luck.
 */
export function noteFiles(name: CollectionName): string[] {
  const row = COLLECTIONS[name];
  return walk(row.base)
    .filter((rel) => matchesCollection(rel, row))
    .sort();
}

/**
 * The note IDS in one collection: the path from its base to the note's directory.
 *
 * `research/books/msmb/chap1/index.md` in the `books` collection is the id `msmb/chap1`, which
 * is what the wiki-link map keys on and what Astro's `generateId` produces from the same file.
 */
export function noteIds(name: CollectionName): string[] {
  const prefix = `${COLLECTIONS[name].base}/`;
  return noteFiles(name).map((rel) => rel.slice(prefix.length).replace(/\/index\.md$/, ''));
}
