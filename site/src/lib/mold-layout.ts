import fs from 'node:fs';
import path from 'node:path';
import { COLLECTIONS } from './frontmatter-schema';
import { walkIndexFiles, readFrontmatter } from './content-files';

// Rung 5 (issue #89): the MOLD_SPEC "Validator Checklist", as written. Structural + eval
// discipline over a Mold's directory (index.md + eval.md + scenarios.md siblings), plus
// our net-new referee discipline. Severities mirror the parent: index.md presence and
// "only index.md carries frontmatter" are errors; the eval/scenario shape checks and the
// catch-the-planted-flaw check are warnings (per MOLD_SPEC).

// Allowlisted top-level entries in a Mold dir (adapted from the parent; cast-only files
// like casting.md are omitted until casting stands up — an unexpected file just warns).
const MOLD_TOP_FILES = new Set(['index.md', 'eval.md', 'scenarios.md', 'usage.md', 'refinement.md', 'README.md']);
const MOLD_TOP_DIRS = new Set(['examples', 'refinements']);

// A Family-B eval must carry ≥1 catch-the-planted-flaw property: the invalid case is
// caught/flagged, never silently passed. Matched per `## Property:` block (name + body) —
// intro boilerplate alone does not count.
const CATCH_FLAW_RE =
  /must[-\s](be[-\s])?(caught|flagged|fail)|never[-\s]silently|must[-\s]not[-\s]silently|caught[-\s]or[-\s]flagged|not[-\s]rationalized|self[-\s]?certif|must[-\s](never|not)\b[^\n]*\b(pass|passed|trust|certif|rationaliz|endorse|bless|proceed)/i;

export interface LayoutFinding {
  path: string;
  severity: 'error' | 'warning';
  message: string;
}

const repoRel = (file: string) => path.relative(path.resolve('..'), file);
const fileHasFrontmatter = (file: string) => /^---\r?\n/.test(fs.readFileSync(file, 'utf8'));

/** `## Property:` … blocks (each heading through the text before the next `##` heading). */
function propertyBlocks(evalBody: string): string[] {
  return evalBody.split(/^(?=##\s)/m).filter((section) => /^##\s+Property:/.test(section));
}

/** eval.md shape: ≥1 Property, no Case, a deterministic/llm-judged marker (all warnings). */
export function checkEvalBody(evalRel: string, body: string): LayoutFinding[] {
  const out: LayoutFinding[] = [];
  if (!/^##\s+Property:/m.test(body))
    out.push({ path: evalRel, severity: 'warning', message: "eval.md should declare at least one '## Property:' section" });
  if (/^##\s+Case:/m.test(body))
    out.push({ path: evalRel, severity: 'warning', message: "eval.md should not use '## Case:' sections — concrete cases belong in scenarios.md" });
  if (!/\b(deterministic|llm-judged)\b/.test(body))
    out.push({ path: evalRel, severity: 'warning', message: 'eval.md should identify deterministic or llm-judged checks' });
  return out;
}

/** scenarios.md shape: ≥1 Case, cases bind a fixture (all warnings). */
export function checkScenariosBody(scenariosRel: string, body: string): LayoutFinding[] {
  if (!/^##\s+Case:/m.test(body))
    return [{ path: scenariosRel, severity: 'warning', message: "scenarios.md should declare at least one '## Case:' section" }];
  if (!/\bfixture\b/i.test(body))
    return [{ path: scenariosRel, severity: 'warning', message: 'scenarios.md cases should bind a fixture' }];
  return [];
}

/** Our discipline: a Family-B eval must carry ≥1 catch-the-planted-flaw property (warning). */
export function checkCatchFlaw(evalRel: string, body: string, isFamilyB: boolean): LayoutFinding | null {
  if (!isFamilyB) return null;
  const hasCatch = propertyBlocks(body).some((b) => CATCH_FLAW_RE.test(b));
  if (hasCatch) return null;
  return {
    path: evalRel,
    severity: 'warning',
    message: "Family-B (referee) eval.md should carry at least one catch-the-planted-flaw '## Property:' (the invalid case must be caught/flagged, never silently passed)",
  };
}

/** Every source directory holding a `type: mold` index.md, across molds/ + experiments/. */
export function moldDirs(): string[] {
  const dirs: string[] = [];
  for (const name of ['molds', 'experiments'] as const) {
    for (const file of walkIndexFiles(path.resolve(COLLECTIONS[name].base))) {
      const { data } = readFrontmatter(file);
      if (data?.type === 'mold') dirs.push(path.dirname(file));
    }
  }
  return dirs;
}

/** Run the full checklist over every Mold directory. */
export function collectMoldLayoutFindings(dirs = moldDirs()): LayoutFinding[] {
  const findings: LayoutFinding[] = [];
  for (const dir of dirs) {
    const idx = path.join(dir, 'index.md');
    if (!fs.existsSync(idx)) {
      findings.push({ path: repoRel(dir), severity: 'error', message: 'mold source directory must contain index.md' });
      continue;
    }
    const { data } = readFrontmatter(idx);
    const tags = Array.isArray(data?.tags) ? (data!.tags as string[]) : [];
    const isFamilyB = tags.includes('family/b');

    // Allowlist + "only index.md carries frontmatter" (error).
    for (const child of fs.readdirSync(dir).sort()) {
      const childPath = path.join(dir, child);
      const isDir = fs.statSync(childPath).isDirectory();
      if (isDir) {
        if (!MOLD_TOP_DIRS.has(child)) findings.push({ path: repoRel(childPath), severity: 'warning', message: `unexpected directory in mold source: ${child}` });
      } else if (!MOLD_TOP_FILES.has(child)) {
        findings.push({ path: repoRel(childPath), severity: 'warning', message: `unexpected file in mold source: ${child}` });
      } else if (child !== 'index.md' && child.endsWith('.md') && fileHasFrontmatter(childPath)) {
        findings.push({ path: repoRel(childPath), severity: 'error', message: 'only mold index.md may have frontmatter' });
      }
    }

    const scenarios = path.join(dir, 'scenarios.md');
    if (fs.existsSync(scenarios)) findings.push(...checkScenariosBody(repoRel(scenarios), fs.readFileSync(scenarios, 'utf8')));

    const evalPath = path.join(dir, 'eval.md');
    if (!fs.existsSync(evalPath)) {
      findings.push({ path: repoRel(dir), severity: 'warning', message: 'mold source directory should contain eval.md' });
      continue;
    }
    const evalBody = fs.readFileSync(evalPath, 'utf8');
    findings.push(...checkEvalBody(repoRel(evalPath), evalBody));
    const catchFlaw = checkCatchFlaw(repoRel(evalPath), evalBody, isFamilyB);
    if (catchFlaw) findings.push(catchFlaw);
  }
  return findings;
}
