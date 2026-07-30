// The design INDEX — half collection, half hand-list, and the seam is deliberate.
//
// This module used to be the registry for everything on /design/: 30 hand-written rows naming
// each entry's title, summary, source filename and category in TypeScript. Eight of those rows
// described the foundation design records, and those are gone — the records are now notes of
// the `meta` kind under content/meta/, so their title and summary come from frontmatter a
// schema checks, and the collection answers which ones exist.
//
// The remaining 22 rows point at files under content/research/ that are in NO collection and
// carry no frontmatter at all. They cannot be collapsed the same way until they are typed, and
// typing them is a different job from finding the design records a home: it means authoring
// frontmatter for two dozen prose notes and deciding what kind the mold-eval rubrics even are.
// Until then this list is what keeps them rendered, and it is stated as a list rather than
// disguised as a collection so the gap is visible rather than discovered.

import fs from 'node:fs';
import path from 'node:path';
import { marked } from './marked';
import { resolveWikiLinks } from './render-vault-doc';
import type { WikiLinkTarget } from './wiki-links';

const RESEARCH_DIR = path.resolve('../content/research');

export type DesignDoc = {
  slug: string;
  title: string;
  /** Source markdown file, relative to content/research/. */
  source: string;
  summary: string;
  category: 'research' | 'related-projects';
};

export const DESIGN_DOCS: DesignDoc[] = [
  {
    slug: 'method-applicability-errors',
    title: 'Method-Applicability Errors',
    source: 'method-applicability-errors.md',
    summary: 'The reference leaf for the audit-method-validity referee: is the named method real, and appropriate to this data regime — the two flagged prongs.',
    category: 'research',
  },
  {
    slug: 'double-dipping-survey',
    title: 'Double-Dipping Survey',
    source: 'double-dipping-survey.md',
    summary: 'The review/survey layer above the primary-source notes — the double-dipping / selective-inference literature backing the double-dipping pattern.',
    category: 'research',
  },
  {
    slug: 'skill-backing-references',
    title: 'Skill-Backing References',
    source: '05-skill-backing-references.md',
    summary: 'For each cross-cutting bioSkill, the primary sources a traceable comparable skill recovers from — and how much is irreducibly convention.',
    category: 'research',
  },
  {
    slug: 'synthesis',
    title: 'Prior-Art Synthesis',
    source: 'projects/00-synthesis.md',
    summary: 'The cross-survey synthesis of the prior-art landscape for statistical rails over LLM-driven genomics.',
    category: 'research',
  },
  {
    slug: 'survey-bioconductor',
    title: 'Survey — Bioconductor / R',
    source: 'projects/01-bioconductor-r.md',
    summary: 'State of the art through the Bioconductor / R lens.',
    category: 'research',
  },
  {
    slug: 'survey-non-r',
    title: 'Survey — Beyond R',
    source: 'projects/02-statistical-genomics-non-r.md',
    summary: 'Statistical genomics prior art outside the R / Bioconductor world.',
    category: 'research',
  },
  {
    slug: 'survey-genomics',
    title: 'Survey — Genomics Broadly',
    source: 'projects/03-genomics-broad.md',
    summary: 'Reproducibility, QC, benchmarking, and truth sets across genomics broadly.',
    category: 'research',
  },
  {
    slug: 'survey-statistics',
    title: 'Survey — Statistics Broadly',
    source: 'projects/04-statistics-broad.md',
    summary: 'The referee at full generality — statistics broadly as prior art.',
    category: 'research',
  },
  {
    slug: 'project-ai-scientist',
    title: 'The AI Scientist',
    source: 'projects/ai-scientist.md',
    summary: 'Sakana\'s fully autonomous research loop whose reviewer self-certifies by reasoning — the referee anti-pattern; its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-analyst-inspector',
    title: 'Analyst-Inspector',
    source: 'projects/analyst-inspector.md',
    summary: 'The closest architectural analog — an independent referee agent that gates reproducibility, not validity; its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-awesome-genomic-skills',
    title: 'awesome-genomic-skills',
    source: 'projects/awesome-genomic-skills.md',
    summary: 'A discovery index above the genomics skill libraries (it catalogs them) — its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-bioinfomcp',
    title: 'BioinfoMCP',
    source: 'projects/bioinfomcp.md',
    summary: 'Auto CLI→MCP wrapper for bioinformatics tools — the wiring layer beneath the tool call; its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-biomania',
    title: 'BioMANIA',
    source: 'projects/biomania.md',
    summary: 'A natural-language → bioinformatics workflow agent that learns a Python tool\'s API and executes it — its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-biomni',
    title: 'Biomni',
    source: 'projects/biomni.md',
    summary: 'A general-purpose biomedical AI agent — its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-bioskills',
    title: 'bioSkills',
    source: 'projects/bioskills.md',
    summary: 'Our nearest neighbor on the repository-of-skills axis — its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-clawbio',
    title: 'ClawBio',
    source: 'projects/clawbio.md',
    summary: 'A reproducibility- and benchmark-forward bioinformatics skill library on OpenClaw — its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-genotex',
    title: 'GenoTEX / GenoAgent',
    source: 'projects/genotex.md',
    summary: 'An in-domain gene-expression benchmark + multi-agent system that self-certifies — its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-knowledgebase-mcp',
    title: 'knowledgebase-mcp',
    source: 'projects/knowledgebase-mcp.md',
    summary: 'Agent-facing knowledge-retrieval MCP servers — their framing, strengths, and where they sit on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-mcpmed',
    title: 'MCPmed',
    source: 'projects/mcpmed.md',
    summary: 'A call to MCP-wrap bioinformatics web services for agent discovery/invocation — tool exposure, not a validity gate; its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-popper',
    title: 'POPPER',
    source: 'projects/popper.md',
    summary: 'Our nearest neighbor on the referee axis — its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-statreviewer-sciscore',
    title: 'StatReviewer + SciScore',
    source: 'projects/statreviewer-sciscore.md',
    summary: 'Deployed commercial automated manuscript referees — post-hoc, closed, reporting-level; their framing, strengths, and where they sit on our values.',
    category: 'related-projects',
  },
  {
    slug: 'project-tusoai',
    title: 'TusoAI',
    source: 'projects/tusoai.md',
    summary: 'An agent that designs and optimizes scientific methods against a metric — the upstream a validity gate sits beneath; its framing, strengths, and where it sits on our values.',
    category: 'related-projects',
  },
];

/** The shelves still backed by the hand-list above. */
export const DESIGN_DOC_GROUPS = [
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
  const raw = fs.readFileSync(path.join(RESEARCH_DIR, doc.source), 'utf-8');
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
