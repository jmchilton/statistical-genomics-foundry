import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import yaml from 'js-yaml';
import { paperSchema, tutorialSchema, bookSchema, moldSchema, patternSchema } from '../src/lib/frontmatter-schema';
import { tagRegistry } from '../src/lib/meta-tags';

// Negative-fixtures table: each deliberately-broken frontmatter asserts the SPECIFIC
// error it must raise, against the same schema the site builds with (issue #89 rung 3).
// Positive baselines guard against the fixtures failing for the wrong reason.

const issuesOf = (schema: { safeParse: (v: unknown) => any }, value: unknown) => {
  const r = schema.safeParse(value);
  return r.success ? [] : (r.error.issues as Array<{ path: (string | number)[]; message: string }>);
};
const atPath = (issues: ReturnType<typeof issuesOf>, p: string) =>
  issues.filter((i) => i.path.join('.') === p);

// own-words note under a permissive license: no verbatim carry, so no license_file needed.
// Carries a facet tag so it satisfies the `tags` min(1) rule (issue #100) by default.
const validSourceNote = (overrides: Record<string, unknown> = {}) => ({
  title: 'A Note',
  type: 'paper',
  source_id: 'x-2020',
  source_url: 'https://example.org/x',
  access_date: '2026-01-01',
  license: 'MIT',
  attribution: 'X et al. 2020',
  derived: 'own-words-summary',
  tags: ['domain/batch-effects'],
  ...overrides,
});

// A book chapter as `npm run books` leaves it: the four book-level licence fields are
// MATERIALIZED into the chapter's own frontmatter, not merged in at validation time, so a
// chapter validates standalone like every other note.
const validBookChapter = (overrides: Record<string, unknown> = {}) => ({
  type: 'book',
  title: 'Generative Models for Discrete Data',
  source: 'msmb',
  source_chapter: 1,
  source_url: 'https://example.org/msmb/01',
  license: 'MIT',
  attribution: 'Holmes S, Huber W. Chapter 1: Generative Models for Discrete Data.',
  derived: 'own-words-summary',
  tags: ['domain/statistical-inference'],
  ...overrides,
});

const validReference = (overrides: Record<string, unknown> = {}) => ({
  kind: 'research',
  ref: 'leek-2010',
  used_at: 'cast-time',
  load: 'upfront',
  mode: 'verbatim',
  evidence: 'corpus-observed',
  ...overrides,
});

const validMold = (overrides: Record<string, unknown> = {}) => ({
  type: 'mold',
  name: 'double-dip-referee',
  summary: 'Referees an analysis for circular inference and gates certification on the verdict.',
  tags: ['family/b', 'role/critique'],
  references: [validReference()],
  ...overrides,
});

describe('sourceNote schema', () => {
  it('accepts a minimal own-words note', () => {
    expect(issuesOf(paperSchema, validSourceNote())).toEqual([]);
  });

  // The #87-class footgun: an unquoted `access_date: 2026-07-13` parses to a Date, not a
  // string, and used to survive until deploy. z.string() must reject it.
  it('rejects an unquoted date (YAML Date, not string) in a required field', () => {
    const issues = issuesOf(paperSchema, validSourceNote({ access_date: new Date('2026-07-13') }));
    expect(atPath(issues, 'access_date').length).toBeGreaterThan(0);
  });

  it('rejects a missing required field', () => {
    const bad = validSourceNote();
    delete (bad as Record<string, unknown>).license;
    expect(atPath(issuesOf(paperSchema, bad), 'license').length).toBeGreaterThan(0);
  });

  it('rejects an unknown license id', () => {
    const issues = atPath(issuesOf(paperSchema, validSourceNote({ license: 'not-a-real-license' })), 'license');
    expect(issues.some((i) => /SPDX|license-policy/.test(i.message))).toBe(true);
  });

  it('flags a LicenseRef that resolves to the defect/default row', () => {
    const issues = atPath(issuesOf(paperSchema, validSourceNote({ license: 'LicenseRef-unregistered-xyz' })), 'license');
    expect(issues.some((i) => /default row|defect/.test(i.message))).toBe(true);
  });

  it('rejects verbatim carry under an own-words-only (NC) license', () => {
    const issues = atPath(
      issuesOf(paperSchema, validSourceNote({ license: 'CC-BY-NC-4.0', derived: 'license-aware-summary' })),
      'derived',
    );
    expect(issues.some((i) => /own-words-only/.test(i.message))).toBe(true);
  });

  it('requires a license_file when carrying verbatim under a verbatim-ok license', () => {
    const issues = atPath(
      issuesOf(paperSchema, validSourceNote({ license: 'CC-BY-4.0', derived: 'license-aware-summary' })),
      'license_file',
    );
    expect(issues.some((i) => /license_file/.test(i.message))).toBe(true);
  });

  // `derived` is free prose, and one posture in the corpus says both words: own-words
  // paraphrase, functional strings kept verbatim as facts. own-words has to win, or
  // `neufeld-countsplit-2024` is rejected under arXiv's own-words-only row for keeping a
  // parameter name. The rule ships in @galaxy-foundry/license-policy now; this pins the
  // reading we depend on, since a substring match would decide the opposite way.
  it('reads own-words prose that mentions verbatim facts as own-words', () => {
    const issues = issuesOf(
      paperSchema,
      validSourceNote({
        license: 'LicenseRef-arXiv-nonexclusive-distrib-1.0',
        derived:
          'own-words paraphrase (license is non-CC); functional strings (parameter names, numeric thresholds) kept verbatim as facts',
      }),
    );
    expect(issues).toEqual([]);
  });

  it('accepts a registered tag', () => {
    expect(issuesOf(paperSchema, validSourceNote({ tags: ['domain/batch-effects'] }))).toEqual([]);
  });

  // issue #100: `tags` is min(1) — an empty array (or omitted tags) fails, so every
  // note carries ≥1 facet. The negative fixture the issue asks for.
  it('rejects an empty tags array (min 1)', () => {
    const issues = atPath(issuesOf(paperSchema, validSourceNote({ tags: [] })), 'tags');
    expect(issues.some((i) => /≥1 facet tag|meta_tags\.yml/.test(i.message))).toBe(true);
  });

  it('rejects a note with no tags field (min 1)', () => {
    const bad = validSourceNote();
    delete (bad as Record<string, unknown>).tags;
    expect(atPath(issuesOf(paperSchema, bad), 'tags').length).toBeGreaterThan(0);
  });

  it('rejects an unregistered tag on a source note', () => {
    const issues = atPath(issuesOf(paperSchema, validSourceNote({ tags: ['not/a-real-namespace'] })), 'tags.0');
    expect(issues.some((i) => /meta_tags\.yml/.test(i.message))).toBe(true);
  });

  // domain/* is a closed enum: a known prefix with an unregistered leaf is drift,
  // not a free-form slug. Guards the closed-registry posture.
  it('rejects an unregistered leaf under the closed domain namespace', () => {
    const issues = atPath(issuesOf(paperSchema, validSourceNote({ tags: ['domain/not-a-real-domain'] })), 'tags.0');
    expect(issues.some((i) => /meta_tags\.yml/.test(i.message))).toBe(true);
  });
});

const readRegistry = () =>
  yaml.load(fs.readFileSync(path.resolve('../meta_tags.yml'), 'utf-8')) as {
    facets: Record<string, { values?: Record<string, string>; [k: string]: unknown }>;
  };

// EVERY facet is closed, forever: every tag the corpus can carry must have a registry
// gloss to document and browse by.
//
// The gloss half of that is now enforced at load — @galaxy-foundry/tag-registry refuses a
// registry containing an undocumented tag, so a corpus-wide assertion here would be a
// second copy of a rule that already cannot be violated. What the package does NOT check
// is `open:`: it ignores unrecognized facet keys, exactly as both loaders always did. So a
// re-added `open: true` is still a SILENT no-op, and this is still the only thing standing
// between that footgun and a green build.
describe('closed-registry invariant', () => {
  it('declares no open facets in meta_tags.yml', () => {
    const open = Object.entries(readRegistry().facets)
      .filter(([, f]) => 'open' in f)
      .map(([key]) => key);
    expect(open).toEqual([]);
  });
});

// Membership is DECLARED, not parsed off the `/` prefix. The format's half of that —
// bare keys resolve, prefix-lookalikes do not — is proven against synthetic registries in
// @galaxy-foundry/tag-registry, because neither instance's vocabulary can witness it.
// What is ours to prove is that OUR registry actually resolves through it.
describe('declared membership (our vocabulary)', () => {
  it('attributes each real tag to the facet that declared it', () => {
    expect(tagRegistry().facetOf('domain/batch-effects')).toBe('domain');
    expect(tagRegistry().facetOf('family/b')).toBe('family');
    expect(tagRegistry().facetOf('domain/not-a-real-domain')).toBeUndefined();
  });

  // The /tags index groups by declaring facet, so every tag in use must resolve to one
  // — a tag that resolved to none would silently vanish from the browse surface.
  it('gives every registered tag a declaring facet', () => {
    const orphans = Object.values(readRegistry().facets)
      .flatMap(f => Object.keys(f.values ?? {}))
      .filter(tag => tagRegistry().facetOf(tag) === undefined);
    expect(orphans).toEqual([]);
  });
});

describe('reference manifest (via mold schema)', () => {
  it('accepts a minimal mold with a valid reference', () => {
    expect(issuesOf(moldSchema, validMold())).toEqual([]);
  });

  // The 22%-drift class: `eager`/`always` were invented synonyms for `upfront`.
  it('rejects an out-of-vocabulary load value', () => {
    const issues = issuesOf(moldSchema, validMold({ references: [validReference({ load: 'eager' })] }));
    expect(issues.some((i) => i.path.join('.').startsWith('references.0.load'))).toBe(true);
  });

  // `sidecar` is capacity we have not built: it needs a renderer, and a caster to run it in.
  // The narrow is what makes that refusal happen here, at authoring time, instead of waiting
  // for a caster that could refuse it. This is the only mode the substrate offers and we
  // decline, so it is the only one that proves the narrow is wired at all.
  it('rejects `sidecar`, which this Foundry does not implement', () => {
    const issues = issuesOf(moldSchema, validMold({ references: [validReference({ mode: 'sidecar' })] }));
    expect(issues.some((i) => i.path.join('.').startsWith('references.0.mode'))).toBe(true);
  });

  it('requires a trigger for an on-demand reference', () => {
    const issues = issuesOf(moldSchema, validMold({ references: [validReference({ load: 'on-demand' })] }));
    expect(issues.some((i) => /requires a trigger/.test(i.message))).toBe(true);
  });

  it('requires a verification for a hypothesis-evidence reference', () => {
    const issues = issuesOf(moldSchema, validMold({ references: [validReference({ evidence: 'hypothesis' })] }));
    expect(issues.some((i) => /requires a verification/.test(i.message))).toBe(true);
  });

  it('rejects an unknown key on a reference (strict manifest)', () => {
    const issues = issuesOf(moldSchema, validMold({ references: [validReference({ loade: 'upfront' })] }));
    expect(issues.some((i) => i.message.toLowerCase().includes('unrecognized'))).toBe(true);
  });

  it('rejects a tag not registered in meta_tags.yml', () => {
    const issues = issuesOf(moldSchema, validMold({ tags: ['not/a-real-namespace'] }));
    expect(issues.some((i) => /meta_tags\.yml/.test(i.message))).toBe(true);
  });

  it('rejects a mold missing its name', () => {
    const bad = validMold();
    delete (bad as Record<string, unknown>).name;
    expect(atPath(issuesOf(moldSchema, bad), 'name').length).toBeGreaterThan(0);
  });
});

describe('pattern schema', () => {
  it('accepts a minimal pattern', () => {
    expect(issuesOf(patternSchema, { type: 'pattern', name: 'double-dipping', status: 'draft', tags: ['domain/statistical-inference'] })).toEqual([]);
  });

  // issue #100: patterns are min(1) too — a tagless pattern fails.
  it('rejects a pattern with no tags (min 1)', () => {
    expect(atPath(issuesOf(patternSchema, { type: 'pattern', name: 'x' }), 'tags').length).toBeGreaterThan(0);
  });

  it('rejects a non-corpus pole value', () => {
    const issues = atPath(issuesOf(patternSchema, { type: 'pattern', name: 'x', pole: 'neither', tags: ['domain/batch-effects'] }), 'pole');
    expect(issues.length).toBeGreaterThan(0);
  });

  it('rejects an unregistered tag on a pattern', () => {
    const issues = atPath(issuesOf(patternSchema, { type: 'pattern', name: 'x', tags: ['not/a-real-namespace'] }), 'tags.0');
    expect(issues.some((i) => /meta_tags\.yml/.test(i.message))).toBe(true);
  });
});

// The licence record a chapter shares with its book is MATERIALIZED into the chapter by
// `npm run books` rather than merged in while validating, so the schema's job is to insist
// the fields are there. Keeping book.yml and the copies in step is `npm run check:books`.
//
// These replace an assertion that a chapter carrying `license` is REJECTED — true while the
// merge was one-way, and exactly the contract this change inverts.
describe('book chapter licence record', () => {
  it('accepts a chapter carrying the materialized book-level fields', () => {
    expect(issuesOf(bookSchema, validBookChapter())).toEqual([]);
  });

  for (const field of ['license', 'attribution', 'derived']) {
    it(`rejects a chapter missing \`${field}\``, () => {
      const note = validBookChapter();
      delete (note as Record<string, unknown>)[field];
      expect(atPath(issuesOf(bookSchema, note), field).length).toBeGreaterThan(0);
    });
  }

  // license_file is genuinely optional — an own-words book redistributes no protected text
  // and vendors no upstream LICENSE, so book.yml omits it and the chapters carry none.
  it('accepts a chapter with no license_file', () => {
    expect(issuesOf(bookSchema, validBookChapter())).toEqual([]);
  });

  // The same coherence rule the other source kinds get, now reachable because the fields
  // are the note's own. NC/own-words licences may not carry verbatim.
  it('rejects verbatim carry under an own-words-only licence', () => {
    const note = validBookChapter({ license: 'CC-BY-NC-SA-2.0', derived: 'license-aware-summary' });
    expect(issuesOf(bookSchema, note).length).toBeGreaterThan(0);
  });
});

// Every kind is `.strict()`: an undeclared frontmatter key is rejected, not silently
// accepted, so the corpus can't grow a private vocabulary of unvalidated fields. A typo'd
// key is the same defect wearing a worse disguise, so assert it per kind.
describe('strict frontmatter (undeclared keys are rejected)', () => {
  const unknownKey = (issues: ReturnType<typeof issuesOf>) =>
    issues.some((i) => /[Uu]nrecognized key/.test(i.message));

  it('rejects an undeclared key on a paper', () => {
    expect(unknownKey(issuesOf(paperSchema, validSourceNote({ impct_factor: 12 })))).toBe(true);
  });

  it('rejects an undeclared key on a tutorial', () => {
    const note = validSourceNote({ type: 'tutorial', biocondutor_release: '3.23' });
    expect(unknownKey(issuesOf(tutorialSchema, note))).toBe(true);
  });

  it('rejects an undeclared key on a mold', () => {
    expect(unknownKey(issuesOf(moldSchema, validMold({ axis: 'source-specific' })))).toBe(true);
  });

  it('rejects an undeclared key on a pattern', () => {
    const note = { type: 'pattern', name: 'x', tags: ['domain/batch-effects'], polarity: 'bad' };
    expect(unknownKey(issuesOf(patternSchema, note))).toBe(true);
  });

  it('rejects an undeclared key on a book chapter', () => {
    expect(unknownKey(issuesOf(bookSchema, validBookChapter({ isbn: '978-1' })))).toBe(true);
  });

  // `published: 2024-03-21` unquoted is a Date to YAML, not a string — the same footgun
  // the access_date guard covers, on a new date-shaped field.
  it('rejects a Date for published (must be a quoted string)', () => {
    const note = validSourceNote({ type: 'tutorial', published: new Date('2024-03-21') });
    expect(atPath(issuesOf(tutorialSchema, note), 'published').length).toBeGreaterThan(0);
  });
});

// The note-envelope fields adopted so far (summary, status). The rest —
// created/revised/revision/ai_generated — stays unported; see content/meta/architecture.md §9.
describe('note envelope (adopted subset)', () => {
  it('requires a summary on a mold', () => {
    const { summary, ...noSummary } = validMold();
    expect(atPath(issuesOf(moldSchema, noSummary), 'summary').length).toBeGreaterThan(0);
  });

  // A summary too short to say anything, or too long to sit in a browse row, is as useless
  // as none. The site prints it in every tag-browse row.
  it('rejects a summary shorter than 20 chars', () => {
    expect(atPath(issuesOf(moldSchema, validMold({ summary: 'too short' })), 'summary').length).toBeGreaterThan(0);
  });

  it('rejects a summary longer than 160 chars', () => {
    expect(atPath(issuesOf(moldSchema, validMold({ summary: 'x'.repeat(161) })), 'summary').length).toBeGreaterThan(0);
  });

  // Free text would let a pattern carry a status the browse/report views can't enumerate
  // (e.g. `stub`); the closed enum is the guard.
  it('rejects a status outside the lifecycle enum', () => {
    const note = { type: 'pattern', name: 'x', status: 'stub', tags: ['domain/batch-effects'] };
    expect(atPath(issuesOf(patternSchema, note), 'status').length).toBeGreaterThan(0);
  });

  it('requires a status on a pattern', () => {
    const note = { type: 'pattern', name: 'x', tags: ['domain/batch-effects'] };
    expect(atPath(issuesOf(patternSchema, note), 'status').length).toBeGreaterThan(0);
  });
});
