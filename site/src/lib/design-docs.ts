import fs from 'node:fs';
import path from 'node:path';
import { marked } from './marked';
import { resolveWikiLinks } from './render-vault-doc';
import type { WikiLinkTarget } from './wiki-links';

const DOCS_DIR = path.resolve('../docs');
const RESEARCH_DIR = path.resolve('../content/research');

export type DesignDoc = {
  slug: string;
  title: string;
  /** Source markdown file, relative to its dir. */
  source: string;
  dir: 'docs' | 'research';
  summary: string;
  category: 'foundation' | 'research' | 'related-projects';
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
    slug: 'method-applicability-errors',
    title: 'Method-Applicability Errors',
    source: 'method-applicability-errors.md',
    dir: 'research',
    summary: 'The reference leaf for the audit-method-validity referee: is the named method real, and appropriate to this data regime — the two flagged prongs.',
    category: 'research',
  },
  {
    slug: 'double-dipping-survey',
    title: 'Double-Dipping Survey',
    source: 'double-dipping-survey.md',
    dir: 'research',
    summary: 'The review/survey layer above the primary-source notes — the double-dipping / selective-inference literature backing the double-dipping pattern.',
    category: 'research',
  },
  {
    slug: 'skill-backing-references',
    title: 'Skill-Backing References',
    source: '05-skill-backing-references.md',
    dir: 'research',
    summary: 'For each cross-cutting bioSkill, the primary sources a traceable comparable skill recovers from — and how much is irreducibly convention.',
    category: 'research',
  },
  {
    slug: 'synthesis',
    title: 'Prior-Art Synthesis',
    source: 'projects/00-synthesis.md',
    dir: 'research',
    summary: 'The cross-survey synthesis of the prior-art landscape for statistical rails over LLM-driven genomics.',
    category: 'research',
  },
  {
    slug: 'survey-bioconductor',
    title: 'Survey — Bioconductor / R',
    source: 'projects/01-bioconductor-r.md',
    dir: 'research',
    summary: 'State of the art through the Bioconductor / R lens.',
    category: 'research',
  },
  {
    slug: 'survey-non-r',
    title: 'Survey — Beyond R',
    source: 'projects/02-statistical-genomics-non-r.md',
    dir: 'research',
    summary: 'Statistical genomics prior art outside the R / Bioconductor world.',
    category: 'research',
  },
  {
    slug: 'survey-genomics',
    title: 'Survey — Genomics Broadly',
    source: 'projects/03-genomics-broad.md',
    dir: 'research',
    summary: 'Reproducibility, QC, benchmarking, and truth sets across genomics broadly.',
    category: 'research',
  },
  {
    slug: 'survey-statistics',
    title: 'Survey — Statistics Broadly',
    source: 'projects/04-statistics-broad.md',
    dir: 'research',
    summary: 'The referee at full generality — statistics broadly as prior art.',
    category: 'research',
  },
  {
    slug: 'project-ai-scientist',
    title: 'The AI Scientist',
    source: 'projects/ai-scientist.md',
    dir: 'research',
    summary: 'Sakana\'s fully autonomous research loop whose reviewer self-certifies by reasoning — the referee anti-pattern; its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-analyst-inspector',
    title: 'Analyst-Inspector',
    source: 'projects/analyst-inspector.md',
    dir: 'research',
    summary: 'The closest architectural analog — an independent referee agent that gates reproducibility, not validity; its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-awesome-genomic-skills',
    title: 'awesome-genomic-skills',
    source: 'projects/awesome-genomic-skills.md',
    dir: 'research',
    summary: 'A discovery index above the genomics skill libraries (it catalogs them) — its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-bioinfomcp',
    title: 'BioinfoMCP',
    source: 'projects/bioinfomcp.md',
    dir: 'research',
    summary: 'Auto CLI→MCP wrapper for bioinformatics tools — the wiring layer beneath the tool call; its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-biomania',
    title: 'BioMANIA',
    source: 'projects/biomania.md',
    dir: 'research',
    summary: 'A natural-language → bioinformatics workflow agent that learns a Python tool\'s API and executes it — its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-biomni',
    title: 'Biomni',
    source: 'projects/biomni.md',
    dir: 'research',
    summary: 'A general-purpose biomedical AI agent — its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-bioskills',
    title: 'bioSkills',
    source: 'projects/bioskills.md',
    dir: 'research',
    summary: 'Our nearest neighbor on the repository-of-skills axis — its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-clawbio',
    title: 'ClawBio',
    source: 'projects/clawbio.md',
    dir: 'research',
    summary: 'A reproducibility- and benchmark-forward bioinformatics skill library on OpenClaw — its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-genotex',
    title: 'GenoTEX / GenoAgent',
    source: 'projects/genotex.md',
    dir: 'research',
    summary: 'An in-domain gene-expression benchmark + multi-agent system that self-certifies — its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-knowledgebase-mcp',
    title: 'knowledgebase-mcp',
    source: 'projects/knowledgebase-mcp.md',
    dir: 'research',
    summary: 'Agent-facing knowledge-retrieval MCP servers — their framing, strengths, and where they sit on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-mcpmed',
    title: 'MCPmed',
    source: 'projects/mcpmed.md',
    dir: 'research',
    summary: 'A call to MCP-wrap bioinformatics web services for agent discovery/invocation — tool exposure, not a validity gate; its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-popper',
    title: 'POPPER',
    source: 'projects/popper.md',
    dir: 'research',
    summary: 'Our nearest neighbor on the referee axis — its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-statreviewer-sciscore',
    title: 'StatReviewer + SciScore',
    source: 'projects/statreviewer-sciscore.md',
    dir: 'research',
    summary: 'Deployed commercial automated manuscript referees — post-hoc, closed, reporting-level; their framing, strengths, and where they sit on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-tusoai',
    title: 'TusoAI',
    source: 'projects/tusoai.md',
    dir: 'research',
    summary: 'An agent that designs and optimizes scientific methods against a metric — the upstream a validity gate sits beneath; its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
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
  {
    category: 'related-projects',
    title: 'Related projects',
    summary: 'Adjacent projects on their own terms — each one\'s framing and strengths, scored against the values the Foundry holds.',
    action: 'READ THE PROJECT',
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
  const bySource = new Map(DESIGN_DOCS.map(doc => [doc.source.split('/').pop()!, doc.slug]));
  return markdown.replace(/\]\(([^)]+\.md)(#[^)]+)?\)/g, (match, target, hash = '') => {
    const filename = target.split('/').pop();
    if (filename === 'glossary.md') return `](${base}/glossary/${hash})`;
    const slug = filename ? bySource.get(filename) : undefined;
    if (!slug) return match;
    return `](${base}/design/${slug}/${hash})`;
  });
}
