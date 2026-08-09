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
  source: string;
  sourceUrl: string;
  license: string;
  attribution: string;
  derived: string;
  doi: string;
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
        source: 'leek-2010',
        sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3880143/',
        license: 'LicenseRef-all-rights-reserved',
        attribution:
          'Leek JT, Scharpf RB, Corrada Bravo H, Simcha D, Langmead B, Johnson WE, Geman D, Baggerly K, Irizarry RA. Tackling the widespread and critical impact of batch effects in high-throughput data. Nature Reviews Genetics 11(10):733–739, 2010. https://doi.org/10.1038/nrg2825 (© Macmillan Publishers Limited; open NIH author manuscript PMC3880143). Summarized in own words — no source text reproduced.',
        derived: 'own-words-summary',
        doi: '10.1038/nrg2825',
        accessDate: '2026-06-27',
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
