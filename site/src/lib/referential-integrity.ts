import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { COLLECTIONS } from './frontmatter-schema';
import { walkIndexFiles, readFrontmatter } from './content-files';
import { resolveLicenseRow } from './license-policy';
import { slugify, stripBrackets, isWikiLink } from './wiki-links';

// Rung 4 (issue #89): cross-file referential integrity for the reference manifest.
//   1. every `[[...]]` ref must resolve to a real target note;
//   2. a ref's `mode` must be permitted by its target's license `allowed_modes`
//      (license-policy.yml) — the invariant the mirrored table exists to enforce.
// Both are hard errors everywhere (no allowlist): an unresolvable ref is fixed or its
// reference block dropped for a TODO comment; a forbidden mode is corrected.

// Collections a `[[ref]]` may point at (experiments/ are sources, never targets).
const TARGET_NAMES = ['books', 'papers', 'tutorials', 'molds', 'patterns'] as const;
// Collections whose `references[]` we check (Mold-shaped: production + experiment Molds).
const SOURCE_NAMES = ['molds', 'experiments'] as const;

export interface Target {
  collection: string;
  id: string;
  /** SPDX id / LicenseRef for licensed source notes; undefined for foundry-authored leaves. */
  license?: string;
}

export interface RefIssue {
  file: string;
  collection: string;
  ref: string;
  kind: string;
  mode?: string;
  problem: 'unresolved' | 'mode-forbidden';
  detail: string;
}

const relTo = (base: string, file: string) => path.relative(base, file).replace(/\/index\.md$/, '');
const repoRel = (file: string) => path.relative(path.resolve('..'), file);

// book.yml is a bare YAML file (no `---` fences), so readFrontmatter can't parse it; the
// book license lives there once per book rather than in each chapter's frontmatter.
function bookLicense(base: string, source: string): string | undefined {
  try {
    const meta = yaml.load(fs.readFileSync(path.join(base, source, 'book.yml'), 'utf-8')) as Record<string, unknown>;
    return meta.license as string | undefined;
  } catch {
    return undefined;
  }
}

// A target's license: papers/tutorials carry it in frontmatter; books in book.yml;
// molds/patterns are foundry-authored leaves, outside the license table's scope.
function targetLicense(name: string, base: string, data: Record<string, unknown>): string | undefined {
  if (name === 'papers' || name === 'tutorials') return data.license as string | undefined;
  if (name === 'books') return data.source ? bookLicense(base, String(data.source)) : undefined;
  return undefined;
}

/** slug → target, across every collection a ref may point at. */
export function buildTargetIndex(): Map<string, Target> {
  const index = new Map<string, Target>();
  for (const name of TARGET_NAMES) {
    const base = path.resolve(COLLECTIONS[name].base);
    for (const file of walkIndexFiles(base)) {
      const id = relTo(base, file);
      const slug = slugify(id.replace(/\//g, '-'));
      const { data } = readFrontmatter(file);
      index.set(slug, { collection: name, id, license: data ? targetLicense(name, base, data) : undefined });
    }
  }
  return index;
}

interface Reference {
  kind?: string;
  ref?: string;
  mode?: string;
}

/** Pure check of one reference against a target index. Returns an issue or null. */
export function checkReference(
  ref: Reference,
  index: Map<string, Target>,
  ctx: { file: string; collection: string },
): RefIssue | null {
  const raw = String(ref.ref ?? '');
  if (!isWikiLink(raw)) return null; // not a wiki-link target (e.g. a bare citation string)
  const slug = slugify(stripBrackets(raw).split('#')[0]);
  const base = { file: ctx.file, collection: ctx.collection, ref: raw, kind: String(ref.kind ?? ''), mode: ref.mode };
  const target = index.get(slug);
  if (!target)
    return { ...base, problem: 'unresolved', detail: `[[${slug}]] resolves to no note in any target collection` };
  if (target.license && ref.mode) {
    const row = resolveLicenseRow(target.license);
    if (!row.allowed_modes.includes(ref.mode as (typeof row.allowed_modes)[number]))
      return {
        ...base,
        problem: 'mode-forbidden',
        detail: `mode=${ref.mode} forbidden by ${target.collection}/${target.id} license ${target.license} (${row.policy}); allowed: ${row.allowed_modes.join(', ')}`,
      };
  }
  return null;
}

/** Scan every Mold-shaped file's references and collect all integrity issues. */
export function collectReferenceIssues(index = buildTargetIndex()): RefIssue[] {
  const issues: RefIssue[] = [];
  for (const name of SOURCE_NAMES) {
    const base = path.resolve(COLLECTIONS[name].base);
    for (const file of walkIndexFiles(base)) {
      const { data } = readFrontmatter(file);
      const refs = (data?.references as Reference[] | undefined) ?? [];
      for (const ref of refs) {
        const issue = checkReference(ref, index, { file: repoRel(file), collection: name });
        if (issue) issues.push(issue);
      }
    }
  }
  return issues;
}
