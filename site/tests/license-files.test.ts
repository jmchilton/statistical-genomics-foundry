import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { describe, it, expect } from 'vitest';
import { auditLicenseFiles, loadLicenseFiles, type LicenseFileDeclaration } from '@galaxy-foundry/license-policy';
import { noteFiles } from '../src/lib/corpus-files';
import { COLLECTION_NAMES, contentPath } from '../src/lib/frontmatter-schema';
import { LICENSES_DIR } from '../src/lib/licenses';

// `license_file` is a string, so the schema can require it and cannot open it. The coherence rule
// in types/context.ts already refuses verbatim carry under a row that obliges a copy without one —
// what nothing checked until now is whether the copy named is a file that exists. A typo satisfies
// `.strict()`, satisfies coherence, and is not a wiki link, so no other layer resolves it.
//
// The audit itself ships in @galaxy-foundry/license-policy. What stays here is what an instance
// knows and a package cannot: which files declare a copy. Books are the reason that is not a crawl
// — the book-level licence record is authored in `book.yml` and COPIED into each chapter by
// `npm run books`, so both the source and its 40-odd copies are declarations, and auditing only one
// side would leave the other free to name a file that is not there.

const BOOKS_DIR = 'research/books';

function frontmatter(file: string): Record<string, unknown> | undefined {
  const match = fs.readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return undefined;
  const data = yaml.load(match[1]);
  return data && typeof data === 'object' && !Array.isArray(data) ? (data as Record<string, unknown>) : undefined;
}

function declarationOf(source: string, data: Record<string, unknown> | undefined): LicenseFileDeclaration {
  const declared = data?.license_file;
  return { source, ...(typeof declared === 'string' && declared ? { licenseFile: declared } : {}) };
}

/** Every note, plus every `book.yml` the chapters' copies are generated from. */
function declarations(): LicenseFileDeclaration[] {
  const notes = COLLECTION_NAMES.flatMap(name =>
    noteFiles(name).map(rel => declarationOf(rel, frontmatter(contentPath(rel)))),
  );

  const booksDir = contentPath(BOOKS_DIR);
  const books = fs
    .readdirSync(booksDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => path.join(BOOKS_DIR, entry.name, 'book.yml'))
    .filter(rel => fs.existsSync(contentPath(rel)))
    .map(rel => {
      const data = yaml.load(fs.readFileSync(contentPath(rel), 'utf8'));
      return declarationOf(rel, data && typeof data === 'object' && !Array.isArray(data) ? (data as Record<string, unknown>) : undefined);
    });

  return [...notes, ...books];
}

describe('vendored license texts', () => {
  it('agrees with what the corpus declares, in both directions', () => {
    const findings = auditLicenseFiles({ licenseDirectory: LICENSES_DIR, declarations: declarations() });
    expect(findings.map(f => `${f.code}: ${f.message}`), findings.map(f => f.message).join('\n')).toEqual([]);
  });

  it('sees the corpus, so a green audit is not an empty one', () => {
    // An audit finds nothing wrong with a repository holding nothing, which is the same answer it
    // gives for one holding everything correctly. Only one of those is this repo.
    const carrying = declarations().filter(d => d.licenseFile);
    expect(carrying.length).toBeGreaterThan(0);
    expect(loadLicenseFiles(LICENSES_DIR).length).toBeGreaterThan(0);
  });

  it('reads the book.yml records, not only the chapter copies', () => {
    // `npm run books` copies the licence record into every chapter and `check:books` holds them in
    // step, so auditing the copies alone would pass on a book.yml naming a file that is not there —
    // right up until someone regenerated.
    const books = declarations().filter(d => d.source.endsWith('book.yml'));
    expect(books.length).toBeGreaterThan(0);
    expect(books.some(d => d.licenseFile)).toBe(true);
  });

  it('catches a declaration naming a copy that is not vendored', () => {
    const findings = auditLicenseFiles({
      licenseDirectory: LICENSES_DIR,
      declarations: [...declarations(), { source: 'research/papers/invented/index.md', licenseFile: 'LICENSES/CC-BY-4.O.LICENSE' }],
    });
    expect(findings.map(f => f.code)).toEqual(['missing-copy']);
  });

  it('catches a copy that resolves by basename from outside LICENSES/', () => {
    // The one a hand-written existence check misses: `licenseFileIdFromPath` reads the stem, so a
    // singular `LICENSE/` typo finds the right text while sending a reader nowhere.
    const findings = auditLicenseFiles({
      licenseDirectory: LICENSES_DIR,
      declarations: [...declarations(), { source: 'research/papers/typo/index.md', licenseFile: 'LICENSE/MIT.LICENSE' }],
    });
    expect(findings.map(f => f.code)).toEqual(['unexpected-path']);
  });
});
