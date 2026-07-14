import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import yaml from 'js-yaml';

const siteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.resolve(siteDir, '..');
const sourceRoots = ['content/research/papers', 'content/research/tutorials'];
const requiredFields = [
  'title',
  'type',
  'source_id',
  'source_url',
  'access_date',
  'license',
  'attribution',
  'derived',
];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    if (entry.isFile() && entry.name === 'index.md') files.push(fullPath);
  }

  return files;
}

function readFrontmatter(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return { error: 'missing YAML frontmatter block' };

  try {
    const data = yaml.load(match[1]);
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return { error: 'frontmatter must be a mapping' };
    }
    return { data };
  } catch (error) {
    return { error: `invalid YAML: ${error.message}` };
  }
}

const problems = [];

for (const sourceRoot of sourceRoots) {
  const rootDir = path.join(repoRoot, sourceRoot);
  if (!fs.existsSync(rootDir)) continue;

  for (const filePath of walk(rootDir)) {
    const relativePath = path.relative(repoRoot, filePath);
    const { data, error } = readFrontmatter(filePath);
    if (error) {
      problems.push(`${relativePath}: ${error}`);
      continue;
    }

    const missing = requiredFields.filter((field) => data[field] === undefined);
    if (missing.length > 0) {
      problems.push(`${relativePath}: missing ${missing.join(', ')}`);
    }

    // Every required field is z.string() in content.config.ts. Catch the type here
    // rather than letting `astro build` fail: an unquoted `access_date: 2026-07-13`
    // is a YAML timestamp, not a string, and the note only fails at deploy time.
    for (const field of requiredFields) {
      const value = data[field];
      if (value === undefined || typeof value === 'string') continue;
      const hint =
        value instanceof Date
          ? ' (YAML parsed it as a date — quote it: "YYYY-MM-DD")'
          : ` (got ${Array.isArray(value) ? 'array' : typeof value})`;
      problems.push(`${relativePath}: ${field} must be a string${hint}`);
    }
  }
}

if (problems.length > 0) {
  console.error('Source notes with invalid required YAML frontmatter:');
  for (const problem of problems) console.error(`- ${problem}`);
  console.error(`Required fields (all strings): ${requiredFields.join(', ')}.`);
  process.exit(1);
}
