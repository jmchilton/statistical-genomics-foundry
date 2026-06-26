import fs from 'node:fs';
import path from 'node:path';
import { marked } from './marked';
import { resolveWikiLinks } from './render-vault-doc';
import type { WikiLinkTarget } from './wiki-links';

const DOCS_DIR = path.resolve('../docs');
const RESEARCH_DIR = path.resolve('../research');

export type DesignDoc = {
  slug: string;
  title: string;
  /** Source markdown file, relative to its dir. */
  source: string;
  dir: 'docs' | 'research';
  summary: string;
  category: 'foundation' | 'research';
};

export const DESIGN_DOCS: DesignDoc[] = [
  {
    slug: 'positioning',
    title: 'Positioning',
    source: 'POSITIONING.md',
    dir: 'docs',
    summary: 'Statistical rails for LLM-driven statistical genomics — what the Foundry is, what it refuses to be, and why.',
    category: 'foundation',
  },
  {
    slug: 'guiding-principles',
    title: 'Guiding Principles',
    source: 'GUIDING_PRINCIPLES.md',
    dir: 'docs',
    summary: 'The design pressure behind source authority, progressive disclosure, validation, and corpus grounding.',
    category: 'foundation',
  },
  {
    slug: 'referee-loop',
    title: 'The Referee Loop',
    source: 'REFEREE_LOOP.md',
    dir: 'docs',
    summary: 'How doing and refereeing compose — critique and calibration gating a result before it is trusted.',
    category: 'foundation',
  },
  {
    slug: 'architecture',
    title: 'Architecture',
    source: 'ARCHITECTURE.md',
    dir: 'docs',
    summary: 'Physical layout, content types, validation pipeline, generated artifacts, and site rendering.',
    category: 'foundation',
  },
  {
    slug: 'molds',
    title: 'Molds',
    source: 'MOLDS.md',
    dir: 'docs',
    summary: 'The initial Mold set — an in-progress outline of the operations the Foundry will encode.',
    category: 'foundation',
  },
  {
    slug: 'mold-spec',
    title: 'Mold Spec',
    source: 'MOLD_SPEC.md',
    dir: 'docs',
    summary: 'The Mold authoring contract — frontmatter, references, and the eval/usage/refinement shape.',
    category: 'foundation',
  },
  {
    slug: 'casting',
    title: 'Compilation Pipeline',
    source: 'COMPILATION_PIPELINE.md',
    dir: 'docs',
    summary: 'How typed Mold references become target-specific cast artifacts with provenance.',
    category: 'foundation',
  },
  {
    slug: 'corpus',
    title: 'Corpus',
    source: 'CORPUS.md',
    dir: 'docs',
    summary: 'How external sources are ingested as own-words summaries without becoming a content mirror.',
    category: 'foundation',
  },
  {
    slug: 'synthesis',
    title: 'Prior-Art Synthesis',
    source: '00-synthesis.md',
    dir: 'research',
    summary: 'The cross-survey synthesis of the prior-art landscape for statistical rails over LLM-driven genomics.',
    category: 'research',
  },
  {
    slug: 'survey-bioconductor',
    title: 'Survey — Bioconductor / R',
    source: '01-bioconductor-r.md',
    dir: 'research',
    summary: 'State of the art through the Bioconductor / R lens.',
    category: 'research',
  },
  {
    slug: 'survey-non-r',
    title: 'Survey — Beyond R',
    source: '02-statistical-genomics-non-r.md',
    dir: 'research',
    summary: 'Statistical genomics prior art outside the R / Bioconductor world.',
    category: 'research',
  },
  {
    slug: 'survey-genomics',
    title: 'Survey — Genomics Broadly',
    source: '03-genomics-broad.md',
    dir: 'research',
    summary: 'Reproducibility, QC, benchmarking, and truth sets across genomics broadly.',
    category: 'research',
  },
  {
    slug: 'survey-statistics',
    title: 'Survey — Statistics Broadly',
    source: '04-statistics-broad.md',
    dir: 'research',
    summary: 'The referee at full generality — statistics broadly as prior art.',
    category: 'research',
  },
  {
    slug: 'verify-biomni',
    title: 'Verify — Biomni',
    source: 'verify-biomni.md',
    dir: 'research',
    summary: 'Positioning verification report for Biomni.',
    category: 'research',
  },
  {
    slug: 'verify-bioskills',
    title: 'Verify — bioSkills',
    source: 'verify-bioskills.md',
    dir: 'research',
    summary: 'Verification report for GPTomics/bioSkills.',
    category: 'research',
  },
  {
    slug: 'verify-knowledgebase-mcp',
    title: 'Verify — knowledgebase-mcp',
    source: 'verify-knowledgebase-mcp.md',
    dir: 'research',
    summary: 'Review of the knowledgebase-mcp project.',
    category: 'research',
  },
  {
    slug: 'verify-popper',
    title: 'Verify — POPPER',
    source: 'verify-popper.md',
    dir: 'research',
    summary: 'Verification report for POPPER.',
    category: 'research',
  },
];

export const DESIGN_DOC_GROUPS = [
  {
    category: 'foundation',
    title: 'Foundry design records',
    summary: 'The core rationale: positioning, principles, the referee loop, architecture, Molds, casting, and corpus grounding.',
    action: 'READ THE RECORD',
  },
  {
    category: 'research',
    title: 'Prior-art research',
    summary: 'SOTA surveys and verification reports that map the landscape the Foundry is built against.',
    action: 'READ THE RESEARCH',
  },
] as const;

export function designDocsByCategory(category: DesignDoc['category']): DesignDoc[] {
  return DESIGN_DOCS.filter(doc => doc.category === category);
}

export function getDesignDoc(slug: string): DesignDoc | undefined {
  return DESIGN_DOCS.find(doc => doc.slug === slug);
}

export function renderDesignDoc(
  doc: DesignDoc,
  linkMap: Map<string, WikiLinkTarget>,
  base: string,
): string {
  const dir = doc.dir === 'research' ? RESEARCH_DIR : DOCS_DIR;
  const raw = fs.readFileSync(path.join(dir, doc.source), 'utf-8');
  const withoutTitle = raw.replace(/^# .+\n+/, '');
  const withLinks = resolveWikiLinks(withoutTitle, linkMap, base);
  const rewritten = rewriteDocLinks(withLinks, base);
  return marked.parse(rewritten, { async: false }) as string;
}

// Rewrite cross-doc relative `.md` links to their rendered routes.
function rewriteDocLinks(markdown: string, base: string): string {
  const bySource = new Map(DESIGN_DOCS.map(doc => [doc.source, doc.slug]));
  return markdown.replace(/\]\(([^)]+\.md)(#[^)]+)?\)/g, (match, target, hash = '') => {
    const filename = target.split('/').pop();
    if (filename === 'glossary.md') return `](${base}/glossary/${hash})`;
    const slug = filename ? bySource.get(filename) : undefined;
    if (!slug) return match;
    return `](${base}/design/${slug}/${hash})`;
  });
}
