import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

// Shared content-file loading for the standalone validators (corpus conformance,
// referential integrity). One walk + one frontmatter reader, so the checks route and
// parse files the same way (issue #89 rungs 3-4).

/** Every `index.md` under `baseAbs` (recursive). Missing dir → []. */
export function walkIndexFiles(baseAbs: string): string[] {
  if (!fs.existsSync(baseAbs)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(baseAbs, { withFileTypes: true })) {
    const full = path.join(baseAbs, entry.name);
    if (entry.isDirectory()) out.push(...walkIndexFiles(full));
    else if (entry.isFile() && entry.name === 'index.md') out.push(full);
  }
  return out;
}

// yaml.load parses an unquoted `access_date: 2026-07-13` to a Date (as Astro's loader
// does), so the #87-class footgun surfaces in these checks exactly as it would at build.
export function readFrontmatter(file: string): { data?: Record<string, unknown>; error?: string } {
  const text = fs.readFileSync(file, 'utf8');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return { error: 'missing YAML frontmatter block' };
  try {
    const data = yaml.load(match[1]);
    if (!data || typeof data !== 'object' || Array.isArray(data)) return { error: 'frontmatter must be a mapping' };
    return { data: data as Record<string, unknown> };
  } catch (e) {
    return { error: `invalid YAML: ${(e as Error).message}` };
  }
}
