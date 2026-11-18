import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{useMDXComponents as r}from"./index-CTeScyef.js";import{M as i}from"./index-5_6oiXsh.js";import"./index-BxXVWNx3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CkpTEBEc.js";import"./index-DCvtqWl1.js";import"./index-DgH-xKnr.js";import"./index-Bhqu_tAV.js";function s(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Patterns/Accessibility Testing"}),`
`,e.jsx(n.h1,{id:"accessibility-testing-patterns",children:"Accessibility Testing Patterns"}),`
`,e.jsxs(n.p,{children:["HO Design System uses ",e.jsx(n.strong,{children:"vitest-axe"})," for automated accessibility testing and ",e.jsx(n.strong,{children:"userEvent"})," for keyboard interaction tests. This document covers the testing patterns used across the design system."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"axe-accessibility-tests",children:"Axe Accessibility Tests"}),`
`,e.jsxs(n.p,{children:["Every interactive component has two axe test variants: ",e.jsx(n.strong,{children:"default mode"})," and ",e.jsx(n.strong,{children:"dark mode"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { axe } from 'vitest-axe';

describe('Component — accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations in dark mode', async () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
    document.documentElement.classList.remove('dark');
  });
});
`})}),`
`,e.jsxs(n.p,{children:["Dark mode is activated by adding the ",e.jsx(n.code,{children:"dark"})," class to ",e.jsx(n.code,{children:"<html>"}),". The test must clean up after itself by removing the class."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"keyboard-interaction-tests",children:"Keyboard Interaction Tests"}),`
`,e.jsx(n.p,{children:"Keyboard tests verify that components respond correctly to keyboard input per WCAG 2.1.1."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { userEvent } from '@storybook/test';

describe('Component — keyboard', () => {
  it('activates on Enter', async () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Component onClick={onClick} />);
    const element = getByRole('button');
    element.focus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
`})}),`
`,e.jsx(n.h3,{id:"renderkeyboard-helper",children:"renderKeyboard Helper"}),`
`,e.jsxs(n.p,{children:["Components that require provider wrappers (layouts, forms) use the ",e.jsx(n.code,{children:"renderKeyboard"})," helper from their package's ",e.jsx(n.code,{children:"test-utils.ts"}),". This helper simplifies keyboard interaction tests by wrapping User-Agent setup:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// In test-utils.ts for a package
import { userEvent } from '@storybook/test';
import { render as baseRender } from '@testing-library/react';

export async function renderKeyboard(ui: React.ReactElement) {
  const screen = baseRender(ui);
  const user = userEvent.setup();
  return { ...screen, user };
}
`})}),`
`,e.jsx(n.p,{children:"Usage in a keyboard test:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`it('toggles on Enter', async () => {
  const { container, user } = await renderKeyboard(<LayoutComponent />);
  const toggle = container.querySelector('[data-toggle]');
  toggle?.focus();
  await user.keyboard('{Enter}');
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
});
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"pre-existing-disability-led-findings-registry",children:"Pre-existing Disability-Led Findings Registry"}),`
`,e.jsxs(n.p,{children:["Findings from the D6.9 accessibility audit that are not yet resolved are registered as ",e.jsx(n.code,{children:"it.skip()"})," entries. This serves as both a ",e.jsx(n.strong,{children:"documentation registry"})," and a ",e.jsx(n.strong,{children:"CI gate"}),": if a violation is fixed, the ",e.jsx(n.code,{children:"it.skip()"})," is removed and the test becomes active."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`describe('Component — pre-existing findings', () => {
  it.skip('P2-1: Component has known issue description (D6.9)', () => {
    const { container } = render(<Component />);
    // The assertion that validates the fix
    expect(container.querySelector('button')).toHaveAttribute('type', 'button');
  });
});
`})}),`
`,e.jsx(n.p,{children:"Each entry includes:"}),`
`,e.jsxs(n.p,{children:[`| Element             | Purpose                                   |
| ------------------- | ----------------------------------------- |
| `,e.jsx(n.code,{children:"it.skip"}),`           | Prevents the known issue from blocking CI |
| Finding ID (`,e.jsx(n.code,{children:"P2-1"}),`) | Links to the D6.9 audit report            |
| Component name      | Identifies the affected component         |
| Reference (`,e.jsx(n.code,{children:"D6.9"}),")  | Source document for the finding           |"]}),`
`,e.jsx(n.h3,{id:"when-a-finding-is-resolved",children:"When a finding is resolved"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["Remove the ",e.jsx(n.code,{children:"it.skip()"})," wrapper — the test becomes ",e.jsx(n.code,{children:"it(...)"}),"."]}),`
`,e.jsx(n.li,{children:"Run the full validation pipeline to confirm the test passes."}),`
`,e.jsx(n.li,{children:"The finding is no longer part of the registry."}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"expectfocustrap-helper",children:"expectFocusTrap Helper"}),`
`,e.jsxs(n.p,{children:["For components with focus trapping (dropdowns, modals, multi-select), use the ",e.jsx(n.code,{children:"expectFocusTrap"})," helper from ",e.jsx(n.code,{children:"@testing-helpers"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { expectFocusTrap } from '@testing-helpers/expect-focus-trap';
import { render } from './test-utils';

it('traps focus within the open menu', async () => {
  const { container } = render(<DropdownWithFocusTrap />);
  const content = container.querySelector('[role="menu"]')!;
  await expectFocusTrap(content);
});
`})}),`
`,e.jsxs(n.p,{children:["The helper simulates Tab key behavior and verifies that focus stays within the container. It supports both forward (",e.jsx(n.code,{children:"Tab"}),") and reverse (",e.jsx(n.code,{children:"Shift+Tab"}),") cycling."]})]})}function u(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{u as default};
