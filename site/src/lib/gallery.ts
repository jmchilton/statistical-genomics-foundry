import { contractKeys } from '@galaxy-foundry/reference-contract';
import type { ReferenceContractProps } from '@galaxy-foundry/site-kit';
import {
  SPECIMENS,
  type Specimen,
  type SpecimenGroup,
} from '@galaxy-foundry/site-kit/specimens';

import { referenceContract as loadReferenceContract } from './reference-contract';

const referenceContract = loadReferenceContract();

const kindSpecimen = (kind: string): Specimen<ReferenceContractProps> => {
  const term = referenceContract.kinds[kind];
  return {
    id: kind,
    name: term?.label ?? kind,
    why:
      term?.description ??
      `The ${kind} reference kind under this Foundry's palette and evidence styling.`,
    props: {
      contract: referenceContract,
      references: [
        {
          kind,
          ref: `[[gallery-${kind}]]`,
          used_at: 'runtime',
          load: 'upfront',
          mode: 'verbatim',
          evidence: 'corpus-observed',
        },
      ],
    },
  };
};

export const SGF_KIND_SPECIMENS: SpecimenGroup<ReferenceContractProps> = {
  id: 'sgf-reference-kinds',
  component: 'ReferenceContract',
  importPath: '@galaxy-foundry/site-kit/ReferenceContract.astro',
  summary:
    'Every reference kind this Foundry declares, derived from its contract so vocabulary changes become visible here automatically.',
  surface: 'inline',
  specimens: contractKeys(referenceContract, 'kinds').map(kindSpecimen),
};

interface SourceMetaSpecimenProps {
  source?: string;
  sourceUrl: string;
  sourceIds:
    | { status: 'declared'; doi?: string; pmid?: string; pmcid?: string; arxiv?: string }
    | { status: 'none'; reason: string };
  sourceLicense: { status: 'declared'; id: string } | { status: 'missing' };
  citation: string;
  attribution?: string;
  derived: string;
  sourceRead: 'full-text' | 'partial' | 'abstract-only' | 'not-read';
  accessDate: string;
}

export const SOURCE_META_SPECIMENS: SpecimenGroup<SourceMetaSpecimenProps> = {
  id: 'sgf-source-meta',
  component: 'SourceMeta',
  importPath: '../components/SourceMeta.astro',
  summary:
    'Corpus provenance, redistribution posture, and source recovery kept together at the reading boundary.',
  surface: 'inline',
  specimens: [
    {
      id: 'own-words-paper',
      name: 'Own-words paper note',
      why:
        'A real corpus record shows how restrictive source terms, citation, DOI, and derivation posture remain legible together.',
      props: {
        sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3880143/',
        sourceIds: { status: 'declared', doi: '10.1038/nrg2825', pmcid: 'PMC3880143' },
        sourceLicense: { status: 'declared', id: 'LicenseRef-all-rights-reserved' },
        citation:
          'Leek JT, Scharpf RB, Corrada Bravo H, Simcha D, Langmead B, Johnson WE, Geman D, Baggerly K, Irizarry RA. Tackling the widespread and critical impact of batch effects in high-throughput data. Nature Reviews Genetics 11(10):733–739, 2010. DOI 10.1038/nrg2825.',
        derived: 'own-words-summary',
        sourceRead: 'full-text',
        accessDate: '2026-06-27',
      },
    },
    {
      // The two states the flat fields could not express: an identifier that does not exist, and
      // a read that did not happen. Both are claims here, so both have to be legible as claims.
      id: 'unread-source',
      name: 'Source note for an unread source',
      why:
        'Read coverage bounds what a summary can support, so anything short of a full read is a chip rather than a footnote — and a work with no identifier says so instead of showing an empty field.',
      props: {
        sourceUrl: 'https://example.org/working-paper',
        sourceIds: { status: 'none', reason: 'unpublished working paper, no DOI assigned' },
        sourceLicense: { status: 'missing' },
        citation:
          'Author A, Author B. A working paper whose published record was checked without reading the paper. 2025.',
        derived: 'own-words-summary',
        sourceRead: 'not-read',
        accessDate: '2026-08-08',
      },
    },
  ],
};

interface RefereeLoopSpecimenProps {
  subject: string;
  verdict: 'pass' | 'revise';
}

export const REFEREE_LOOP_SPECIMENS: SpecimenGroup<RefereeLoopSpecimenProps> = {
  id: 'sgf-referee-loop',
  component: 'RefereeLoop',
  importPath: '../components/RefereeLoop.astro',
  summary:
    'The Foundry thesis made spatial: Family A analyzes, Family B checks independently, and the gate either certifies or returns findings.',
  surface: 'inline',
  specimens: [
    {
      id: 'gate-passes',
      name: 'Gate passes',
      why: 'A successful independent check ends in a clearly labelled certification state.',
      props: { subject: 'Null-calibration check', verdict: 'pass' },
    },
    {
      id: 'revision-required',
      name: 'Revision required',
      why: 'A failed check makes the return path to analysis explicit instead of hiding it in prose.',
      props: { subject: 'Batch-confounding audit', verdict: 'revise' },
    },
  ],
};

export const SGF_SPECIMENS: readonly SpecimenGroup[] = [
  SGF_KIND_SPECIMENS,
  SOURCE_META_SPECIMENS,
  REFEREE_LOOP_SPECIMENS,
];

export const ALL_SPECIMENS: readonly SpecimenGroup[] = [...SPECIMENS, ...SGF_SPECIMENS];

const groupIds = ALL_SPECIMENS.map((group) => group.id);
if (new Set(groupIds).size !== groupIds.length) {
  throw new Error('gallery specimen group ids must be unique across shared and SGF groups');
}

export const specimenOrigin = (group: SpecimenGroup): 'shared' | 'sgf' =>
  SGF_SPECIMENS.some((candidate) => candidate.id === group.id) ? 'sgf' : 'shared';
