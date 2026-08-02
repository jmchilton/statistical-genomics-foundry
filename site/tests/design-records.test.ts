import fs from 'node:fs';
import yaml from 'js-yaml';
import { describe, it, expect } from 'vitest';
import { noteFiles } from '../src/lib/content-files';
import { contentPath } from '../src/lib/frontmatter-schema';

// The architecture set is a split, and a split only holds while every piece stays reachable and
// distinct. Two ways it decays quietly: a focused record stops being linked from the map and
// nobody opens it again, or two records claim the same slot on a shelf and the reading order
// goes non-deterministic. Neither shows up in schema validation, so they are asserted here.

/** The focused records the map must route a reader to. `architecture.md` is the map itself. */
const FOCUSED = ['code-architecture', 'content-model', 'build-and-validation', 'repository-layout'];

const records = noteFiles('meta');

function frontmatter(file: string): Record<string, unknown> {
  const text = fs.readFileSync(contentPath(file), 'utf8');
  const m = /^---\n([\s\S]*?)\n---/.exec(text);
  if (!m) throw new Error(`${file} has no frontmatter block`);
  return yaml.load(m[1]!) as Record<string, unknown>;
}

describe('the architecture set', () => {
  it('has the map and every focused record', () => {
    const slugs = records.map((f) => f.split('/').pop()!.replace(/\.md$/, ''));
    expect(slugs).toEqual(expect.arrayContaining(['architecture', ...FOCUSED]));
  });

  it('the map links every focused record', () => {
    const map = fs.readFileSync(contentPath('meta/architecture.md'), 'utf8');
    const unlinked = FOCUSED.filter((slug) => !map.includes(`[[${slug}]]`));
    expect(unlinked, `\nfocused records the map does not link: ${unlinked.join(', ')}`).toEqual([]);
  });
});

describe('the design record', () => {
  // Guards against a path change turning the assertions below into a vacuous pass.
  it('finds design records at all', () => {
    expect(records.length).toBeGreaterThan(1);
  });

  it('no duplicate order within a shelf', () => {
    const seen = new Map<string, string[]>();
    for (const file of records) {
      const fm = frontmatter(file);
      const key = `${fm.record_kind}/${fm.order}`;
      seen.set(key, [...(seen.get(key) ?? []), file]);
    }
    const collisions = [...seen.entries()]
      .filter(([, files]) => files.length > 1)
      .map(([key, files]) => `${key}: ${files.join(', ')}`);
    expect(collisions, `\nrecords sharing a slot: ${collisions.join('; ')}`).toEqual([]);
  });

  it('the glossary shares the directory without being routed as a record', () => {
    expect(records.some((f) => f.endsWith('glossary.md'))).toBe(false);
    expect(fs.existsSync(contentPath('meta/glossary.md'))).toBe(true);
  });
});
