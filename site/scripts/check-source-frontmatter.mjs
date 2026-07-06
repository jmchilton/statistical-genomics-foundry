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
  }
}

if (problems.length > 0) {
  console.error('Source notes with invalid required YAML frontmatter:');
  for (const problem of problems) console.error(`- ${problem}`);
  console.error(`Required fields: ${requiredFields.join(', ')}.`);
  process.exit(1);
}
