import { describe, it, expect } from 'vitest';
import { tagInfo, namespaceViews } from '../src/lib/meta-tags';
import { TYPES, TYPE_INFO } from '../src/lib/frontmatter-schema';

// Rung 6 UI: the registry glosses (meta_tags.yml) and type help text back the rich
// tag/type components. These guard that the "help message" the UI shows stays wired to
// the schema authority — a value without a gloss must not slip through silently.

describe('tagInfo', () => {
  it('resolves namespace, leaf, and gloss for a domain tag', () => {
    const info = tagInfo('domain/batch-effects');
    expect(info?.namespace).toBe('domain');
    expect(info?.leaf).toBe('batch-effects');
    expect(info?.gloss).toBeTruthy();
    expect(info?.namespaceLabel).toBe('Domain');
  });

  it('resolves a structural (family) tag', () => {
    const info = tagInfo('family/b');
    expect(info?.namespace).toBe('family');
    expect(info?.gloss).toBeTruthy();
  });

  it('returns null for an unregistered namespace', () => {
    expect(tagInfo('nope/x')).toBeNull();
  });

  it('returns null for a non-namespaced string', () => {
    expect(tagInfo('batch-effects')).toBeNull();
  });
});

describe('namespaceViews', () => {
  it('exposes family, role, and domain with glossed values', () => {
    const views = namespaceViews();
    const keys = views.map((v) => v.key);
    expect(keys).toContain('family');
    expect(keys).toContain('role');
    expect(keys).toContain('domain');
    const domain = views.find((v) => v.key === 'domain')!;
    expect(domain.values.length).toBeGreaterThan(30);
    expect(domain.values.every((v) => v.tag.startsWith('domain/') && v.gloss)).toBe(true);
  });
});

describe('TYPE_INFO', () => {
  it('carries a help message for every registered type', () => {
    for (const t of TYPES) expect(TYPE_INFO[t]?.length ?? 0).toBeGreaterThan(0);
    expect(Object.keys(TYPE_INFO).sort()).toEqual([...TYPES].sort());
  });
});
