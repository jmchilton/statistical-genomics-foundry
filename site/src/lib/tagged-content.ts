import { getCollection } from 'astro:content';
import { TYPE_INFO } from './frontmatter-schema';

// One normalized view over every routable artifact, so tag → artifacts (the inverse
// links) and the tag index route + parse content the same way. Collections differ in
// their title field (molds/patterns/experiments use `name`) and route segment; normalize
// both here. `kind` is the navigational category (the collection), NOT the frontmatter
// `type`: experiment artifacts carry `type: mold` (they are structurally Molds) but live
// in their own catalog, so they group and badge as `experiment`.

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export interface Artifact {
  kind: string;
  id: string;
  title: string;
  url: string;
  tags: string[];
}

// kind → route segment + help text. The five schema types reuse the schema's own gloss
// (TYPE_INFO, the authority); `experiment` is nav-only (not a schema `type`) so its gloss
// lives here.
export const KIND_INFO: Record<string, { segment: string; gloss: string }> = {
  paper: { segment: 'papers', gloss: TYPE_INFO.paper },
  tutorial: { segment: 'tutorials', gloss: TYPE_INFO.tutorial },
  book: { segment: 'books', gloss: TYPE_INFO.book },
  mold: { segment: 'molds', gloss: TYPE_INFO.mold },
  pattern: { segment: 'patterns', gloss: TYPE_INFO.pattern },
  experiment: {
    segment: 'experiments',
    gloss: 'Blind-assembly probe: a doer/referee Mold pair built from ingested notes alone, then diffed against the source skill to test recoverability.',
  },
};

export function kindIndexUrl(kind: string): string | null {
  const info = KIND_INFO[kind];
  return info ? `${base}/${info.segment}/` : null;
}

export function kindGloss(kind: string): string | undefined {
  return KIND_INFO[kind]?.gloss;
}

export async function allArtifacts(): Promise<Artifact[]> {
  const [papers, tutorials, books, molds, patterns, experiments] = await Promise.all([
    getCollection('papers'),
    getCollection('tutorials'),
    getCollection('books'),
    getCollection('molds'),
    getCollection('patterns'),
    getCollection('experiments'),
  ]);
  const out: Artifact[] = [];
  const push = (kind: string, seg: string, id: string, title: string, tags: string[] | undefined) =>
    out.push({ kind, id, title, url: `${base}/${seg}/${id}/`, tags: tags ?? [] });
  for (const e of papers) push('paper', 'papers', e.id, e.data.title, e.data.tags);
  for (const e of tutorials) push('tutorial', 'tutorials', e.id, e.data.title, e.data.tags);
  for (const e of books) push('book', 'books', e.id, e.data.title, e.data.tags);
  for (const e of molds) push('mold', 'molds', e.id, e.data.name, e.data.tags);
  for (const e of patterns) push('pattern', 'patterns', e.id, e.data.name, e.data.tags);
  for (const e of experiments) push('experiment', 'experiments', e.id, e.data.name, e.data.tags);
  return out;
}
