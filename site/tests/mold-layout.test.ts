import { describe, it, expect } from 'vitest';
import {
  checkEvalBody,
  checkScenariosBody,
  checkCatchFlaw,
  collectMoldLayoutFindings,
} from '../src/lib/mold-layout';

// Rung 5 (issue #89): the MOLD_SPEC validator checklist. Unit fixtures pin each check;
// the corpus scan is the gate. Severities stay faithful to the parent (error vs warning);
// the corpus starts clean, so we gate at zero of BOTH to stop warnings accumulating.

const evalOk = `## Property: double-dipping-must-be-caught\n- check: llm-judged\n- assertion: the circular case must be flagged, never silently passed.\n`;

describe('checkEvalBody', () => {
  it('passes a well-formed eval body', () => {
    expect(checkEvalBody('eval.md', evalOk)).toEqual([]);
  });
  it('warns when no ## Property: section', () => {
    const f = checkEvalBody('eval.md', 'no properties here (deterministic)');
    expect(f.some((x) => /Property/.test(x.message) && x.severity === 'warning')).toBe(true);
  });
  it('warns when a ## Case: appears in eval.md', () => {
    const f = checkEvalBody('eval.md', `${evalOk}\n## Case: leaked\nfixture: x`);
    expect(f.some((x) => /Case:/.test(x.message))).toBe(true);
  });
  it('warns when no deterministic/llm-judged marker', () => {
    const f = checkEvalBody('eval.md', '## Property: x\n- assertion: must be flagged');
    expect(f.some((x) => /deterministic or llm-judged/.test(x.message))).toBe(true);
  });
});

describe('checkScenariosBody', () => {
  it('passes cases that bind a fixture', () => {
    expect(checkScenariosBody('scenarios.md', '## Case: a\nfixture: examples/a.json\nexpect: REVISE')).toEqual([]);
  });
  it('warns when no ## Case: section', () => {
    expect(checkScenariosBody('scenarios.md', 'prose only')[0].message).toMatch(/Case:/);
  });
  it('warns when cases bind no fixture', () => {
    expect(checkScenariosBody('scenarios.md', '## Case: a\nexpect: REVISE')[0].message).toMatch(/fixture/);
  });
});

describe('checkCatchFlaw (Family-B discipline)', () => {
  it('passes a Family-B eval with a catch-the-planted-flaw property', () => {
    expect(checkCatchFlaw('eval.md', evalOk, true)).toBeNull();
  });
  it('warns a Family-B eval whose properties never assert a catch', () => {
    const bland = '## Property: restates-procedure\n- check: llm-judged\n- assertion: the output lists the steps in order.';
    expect(checkCatchFlaw('eval.md', bland, true)?.severity).toBe('warning');
  });
  it('does not apply to Family-A molds', () => {
    const bland = '## Property: restates-procedure\n- assertion: lists steps.';
    expect(checkCatchFlaw('eval.md', bland, false)).toBeNull();
  });
});

describe('corpus mold-layout conformance', () => {
  it('every Mold directory passes the checklist (errors and warnings)', () => {
    const findings = collectMoldLayoutFindings();
    const lines = findings.map((f) => `${f.path} [${f.severity}] ${f.message}`);
    expect(findings, `\n${lines.join('\n')}`).toEqual([]);
  });
});
