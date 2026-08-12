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

// own-words note under a permissive license: no verbatim carry, so neither the notice nor a
// license_file is owed. Carries a facet tag so it satisfies the `tags` min(1) rule (issue #100)
// by default.
//
// The provenance half of this is @galaxy-foundry/source-note's field set, not ours: `source_id`
// and a flat `license` string are gone, and the questions they ran together are four fields
// apart — `source_ids` (identity), `source_license` (the grant, or a stated absence of one),
// `citation` (the bibliographic record) and `source_read` (how much of the work was read).
const validSourceNote = (overrides: Record<string, unknown> = {}) => ({
  title: 'A Note',
  type: 'paper',
  source_url: 'https://example.org/x',
  source_ids: { status: 'declared', doi: '10.1234/example.2020' },
  access_date: '2026-01-01',
  source_read: 'full-text',
  citation: 'X et al. An example of a paper. Journal of Examples. 2020;1(1):1-10.',
  source_license: { status: 'declared', id: 'MIT' },
  derived: 'own-words-summary',
  tags: ['domain/batch-effects'],
  ...overrides,
});

// A book chapter as `npm run books` leaves it: the book-level source-note fields are
// MATERIALIZED into the chapter's own frontmatter, not merged in at validation time, so a
// chapter validates standalone like every other note.
const validBookChapter = (overrides: Record<string, unknown> = {}) => ({
  type: 'book',
  title: 'Generative Models for Discrete Data',
  source: 'msmb',
  source_chapter: 1,
  source_url: 'https://example.org/msmb/01',
  // A web chapter has no identifier of its own, and says so rather than omitting the field.
  source_ids: { status: 'none', reason: 'web chapter of an online textbook' },
  access_date: '2026-01-01',
  source_read: 'full-text',
  citation: 'Holmes S, Huber W. Modern Statistics for Modern Biology. 2019. Chapter 1.',
  source_license: { status: 'declared', id: 'MIT' },
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
    delete (bad as Record<string, unknown>).source_license;
    expect(atPath(issuesOf(paperSchema, bad), 'source_license').length).toBeGreaterThan(0);
  });

  it('rejects an unknown license id', () => {
    const note = validSourceNote({ source_license: { status: 'declared', id: 'not-a-real-license' } });
    const issues = atPath(issuesOf(paperSchema, note), 'source_license.id');
    expect(issues.some((i) => /SPDX|license-policy/.test(i.message))).toBe(true);
  });

  it('flags a LicenseRef that resolves to the defect/default row', () => {
    const note = validSourceNote({
      source_license: { status: 'declared', id: 'LicenseRef-unregistered-xyz' },
    });
    const issues = atPath(issuesOf(paperSchema, note), 'source_license.id');
    expect(issues.some((i) => /default row|defect/.test(i.message))).toBe(true);
  });

  // A licence nobody found and a licence that grants nothing are different answers, and the
  // union keeps them apart. `missing` is the absence of a determination — it validates, and
  // denies carry, which is the only safe reading of "we do not know".
  it('accepts a source whose licence was never determined', () => {
    expect(issuesOf(paperSchema, validSourceNote({ source_license: { status: 'missing' } }))).toEqual([]);
  });

  it('refuses verbatim carry when no source licence was determined', () => {
    const note = validSourceNote({
      source_license: { status: 'missing' },
      derived: 'verbatim-quotes-summary',
      attribution: 'X et al. 2020, used under the source licence.',
    });
    expect(atPath(issuesOf(paperSchema, note), 'derived').length).toBeGreaterThan(0);
  });

  it('rejects verbatim carry under an own-words-only (NC) license', () => {
    const note = validSourceNote({
      source_license: { status: 'declared', id: 'CC-BY-NC-4.0' },
      derived: 'verbatim-quotes-summary',
    });
    const issues = atPath(issuesOf(paperSchema, note), 'derived');
    expect(issues.some((i) => /own-words-only/.test(i.message))).toBe(true);
  });

  it('requires a license_file when carrying verbatim under a verbatim-ok license', () => {
    const note = validSourceNote({
      source_license: { status: 'declared', id: 'CC-BY-4.0' },
      derived: 'verbatim-quotes-summary',
      attribution: 'X et al. 2020, used under CC-BY-4.0.',
    });
    const issues = atPath(issuesOf(paperSchema, note), 'license_file');
    expect(issues.some((i) => /license_file/.test(i.message))).toBe(true);
  });

  // The notice is a separate obligation from the licence text, and an own-words note owes
  // neither — so only the carrying posture can witness this.
  it('requires the attribution notice when carrying verbatim', () => {
    const note = validSourceNote({
      source_license: { status: 'declared', id: 'CC-BY-4.0' },
      derived: 'verbatim-quotes-summary',
      license_file: 'LICENSES/CC-BY-4.0.LICENSE',
    });
    const issues = atPath(issuesOf(paperSchema, note), 'attribution');
    expect(issues.some((i) => /attribution/.test(i.message))).toBe(true);
  });

  // `derived` used to be free prose, and the corpus wrote a posture that said both words:
  // own-words paraphrase, functional strings kept verbatim as facts. Deciding what that meant
  // took a regular expression over the sentence. The vocabulary is a closed enum now, so the
  // sentence is not a posture at all — this pins that the old spelling cannot come back.
  it('rejects a prose posture, now that the vocabulary is closed', () => {
    const issues = atPath(
      issuesOf(
        paperSchema,
        validSourceNote({
          source_license: { status: 'declared', id: 'LicenseRef-arXiv-nonexclusive-distrib-1.0' },
          derived:
            'own-words paraphrase (license is non-CC); functional strings (parameter names, numeric thresholds) kept verbatim as facts',
        }),
      ),
      'derived',
    );
    expect(issues.length).toBeGreaterThan(0);
  });

  // The note that motivated the enum still validates, under the posture it always meant.
  it('accepts an own-words summary of an arXiv preprint', () => {
    const note = validSourceNote({
      source_license: { status: 'declared', id: 'LicenseRef-arXiv-nonexclusive-distrib-1.0' },
      source_ids: { status: 'declared', arxiv: '2307.12985' },
      derived: 'own-words-summary',
    });
    expect(issuesOf(paperSchema, note)).toEqual([]);
  });

  // A work with no identifier is a claim someone can check, so it is stated rather than left
  // to an omission a reader cannot tell from an author who never looked.
  it('accepts a source that carries no identifier at all', () => {
    const note = validSourceNote({
      source_ids: { status: 'none', reason: 'unpublished working paper, no DOI assigned' },
    });
    expect(issuesOf(paperSchema, note)).toEqual([]);
  });

  // A location is not an identity: `source_url` carries the first, `source_ids` the second.
  // Unquoted in YAML a pmid is a number and an access_date is a Date, so both must be strict.
  it.each([
    ['source_ids', { source_ids: undefined }],
    ['source_ids', { source_ids: { status: 'declared' } }],
    ['source_ids.reason', { source_ids: { status: 'none' } }],
    ['source_ids.doi', { source_ids: { status: 'declared', doi: 'https://doi.org/10.1234/x' } }],
    ['source_ids.pmid', { source_ids: { status: 'declared', pmid: 32614390 } }],
    ['source_ids.pmcid', { source_ids: { status: 'declared', pmcid: '7498332' } }],
    ['source_ids.arxiv', { source_ids: { status: 'declared', arxiv: 'https://arxiv.org/abs/2307.12985' } }],
    ['source_read', { source_read: undefined }],
    ['source_read', { source_read: 'skimmed' }],
    ['citation', { citation: undefined }],
    ['source_url', { source_url: 'example.org/x' }],
  ])('rejects an invalid %s', (field, overrides) => {
    expect(atPath(issuesOf(paperSchema, validSourceNote(overrides)), field).length).toBeGreaterThan(0);
  });

  // `not-read` is a real answer, not a gap: two notes in this corpus check a work's published
  // record without reading the work. Folding them into `abstract-only` would assert a read
  // that never happened.
  it.each(['full-text', 'partial', 'abstract-only', 'not-read'])(
    'accepts source_read: %s',
    (level) => {
      expect(issuesOf(paperSchema, validSourceNote({ source_read: level }))).toEqual([]);
    },
  );

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

  // Every field `npm run books` materializes, except the two it may legitimately leave out
  // (`license_file`, `attribution` — see below). A chapter missing one is a stale generation.
  for (const field of ['source_ids', 'access_date', 'source_read', 'citation', 'source_license', 'derived']) {
    it(`rejects a chapter missing \`${field}\``, () => {
      const note = validBookChapter();
      delete (note as Record<string, unknown>)[field];
      expect(atPath(issuesOf(bookSchema, note), field).length).toBeGreaterThan(0);
    });
  }

  // license_file and attribution are genuinely optional — an own-words book redistributes no
  // protected text, so it vendors no upstream LICENSE and owes no notice. book.yml omits both
  // and the generator's OPTIONAL set lets it, which is what this pins.
  it('accepts a chapter with no license_file and no attribution', () => {
    expect(issuesOf(bookSchema, validBookChapter())).toEqual([]);
  });

  // The same coherence rule the other source kinds get, now reachable because the fields
  // are the note's own. NC/own-words licences may not carry verbatim.
  it('rejects verbatim carry under an own-words-only licence', () => {
    const note = validBookChapter({
      source_license: { status: 'declared', id: 'CC-BY-NC-SA-2.0' },
      derived: 'verbatim-quotes-summary',
    });
    expect(atPath(issuesOf(bookSchema, note), 'derived').length).toBeGreaterThan(0);
  });

  // harmon-pcm is the corpus's one carrying book: CC-BY-4.0, quotes retained, so it vendors
  // the licence and carries the notice. The shape `npm run books` writes for it must validate.
  it('accepts a carrying chapter that discharges both obligations', () => {
    const note = validBookChapter({
      source: 'harmon-pcm',
      source_license: { status: 'declared', id: 'CC-BY-4.0' },
      derived: 'verbatim-quotes-summary',
      attribution: 'Harmon LJ. Phylogenetic Comparative Methods. 2019. Used under CC-BY-4.0.',
      license_file: 'LICENSES/CC-BY-4.0.LICENSE',
    });
    expect(issuesOf(bookSchema, note)).toEqual([]);
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
