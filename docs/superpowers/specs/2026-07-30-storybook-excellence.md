# Storybook Excellence — Component States, Controls & Play Functions

**Status:** SPEC (Pending Implementation)
**Author:** Architecture governance process
**Date:** 2026-07-30
**Input:** Brainstorming session, community best practices (Storybook 10.x docs), Radix/shadcn/ui/Chakra benchmarks
**Predecessors:** ADS-006 (Storybook Excellence), ADS-005 (Component Review)

---

## Section 1 — Purpose

This specification defines the final polish pass for Storybook component coverage in the Holiveira Design System. After the M10 Release Architecture, the Storybook is structurally complete (38 stories, 4 addons, theme switching, viewports, MDX docs) but has three identified gaps against community gold-standard benchmarks:

1. **State coverage** — most components cover only Default + Primary variants; disabled, edge cases, and dark mode states are missing (~60% coverage)
2. **Controls descriptions** — `argTypes` with `description`, `control` type, and `defaultValue` are present on fewer than 30% of components
3. **Play functions** — only 7 components have interaction tests; 5 more interactive components need them

This spec closes those gaps. It does NOT cover new stories for non-visual packages (hooks, utils, i18n, providers), Storybook deployment, or MDX narrative documentation — those are already adequate or deferred.

---

## Section 2 — Scope

### 2.1 In Scope

- Adding state variants (default, all variants, disabled, loading/edge where applicable) to all 26 visual component stories
- Adding `argTypes` with `description`, `control`, and `table: { defaultValue }` to all 26 components
- Adding `play` functions with `userEvent` + `expect` + `step` to 12 interactive components
- Reviewing and standardizing existing play functions to match new patterns

### 2.2 Out of Scope

- New stories for non-visual packages: `hooks`, `utils`, `i18n`, `providers` — deferred to a future hooks/utils docs spec
- Storybook deployment to GitHub Pages (already exists: `storybook.yml`)
- New MDX documentation pages (Introduction, Getting Started, Patterns, Tokens all exist)
- Accessibility addon configuration (already configured via `@storybook/addon-a11y`)
- Theme switching (already configured via `@storybook/addon-themes`)
- Visual regression testing (Chromatic) — v1.1
- LineChart stories (covered separately — component may need review)

### 2.3 Component Coverage Target

All 26 visual components across 6 packages:

| Package | Components | Count |
|---------|-----------|:---:|
| `@holiveira/primitives` | Button, Alert, Skeleton, Checkbox, Radio, Switch, InputGroup, TextArea, Select, Table, Dropdown | 11 |
| `@holiveira/forms` | Form, Field, Submit, DatePicker, MultiSelect | 5 |
| `@holiveira/layouts` | Sidebar, Header, ApplicationShell | 3 |
| `@holiveira/charts` | AreaChart, BarChart, PieChart | 3 |
| `@holiveira/ui` | Breadcrumb, Card, ShowcaseSection | 3 |
| `@holiveira/icons` | IconGallery | 1 |

---

## Section 3 — State Coverage

### 3.1 Rule

Every component story file MUST include:

1. **Default** — the most neutral state with minimum required props
2. **Every variant** defined by the component's API (e.g., `Primary`, `Secondary`, `Outline`, `Ghost`)
3. **Disabled** — if the component supports it
4. **Loading** — only where the component has a loading state (Button, Form, Submit, Table)
5. **Edge cases** — only where meaningful (Empty for Table/Select, LongMessage for Alert, NoData for Charts)
6. **DarkMode** — only for Charts (visual data interpretation changes), not for every component (global theme decorator already handles dark/light toggling)

### 3.2 Primitives (11 components)

| Component | Obligatory States | Optional States |
|-----------|------------------|-----------------|
| **Button** | Default, Primary, Secondary, Outline, Ghost, Disabled, Small, Large, FullWidth | Loading, WithIcon |
| **Alert** | Info, Success, Warning, Error, WithTitle, WithoutTitle | LongMessage, WithAction |
| **Skeleton** | Default, Circle, Rectangle, Text | MultipleLines |
| **Checkbox** | Default, Checked, Disabled, Indeterminate | WithLabel, WithDescription |
| **Radio** | Default, Checked, Disabled | WithLabel, Group |
| **Switch** | Default, Checked, Disabled | WithLabel |
| **InputGroup** | Default, Disabled, WithPlaceholder, WithLabel | Error, WithIcon, Password |
| **TextArea** | Default, Disabled, WithPlaceholder, WithLabel | Error, Resize |
| **Select** | Default, Disabled, Open | MultiSelect, WithIcon, Error |
| **Table** | Default, Empty, WithSelection, Sorted | Paginated, Loading |
| **Dropdown** | Default, Open, Disabled, WithDivider | WithIcons, WithShortcuts |

### 3.3 Forms (5 components)

| Component | Obligatory States | Optional States |
|-----------|------------------|-----------------|
| **Form** | Default, WithValidation, WithErrors | Loading |
| **Field** | Default, WithLabel, WithDescription, WithError | Required |
| **Submit** | Default, Disabled | Loading |
| **DatePicker** | Default, Disabled, WithPlaceholder | Range, Error |
| **MultiSelect** | Default, WithSelection, Disabled | Searchable, Error |

### 3.4 Layouts (3 components)

| Component | Obligatory States | Optional States |
|-----------|------------------|-----------------|
| **Sidebar** | Expanded, Collapsed, MobileOpen, MobileClosed | CustomLogo |
| **Header** | Default, WithActions | WithBreadcrumb |
| **ApplicationShell** | Default | MobileView |

### 3.5 Charts (3 components)

| Component | Obligatory States | Optional States |
|-----------|------------------|-----------------|
| **AreaChart** | Default, DarkMode | Empty, SingleSeries |
| **BarChart** | Default, DarkMode | Horizontal, Stacked |
| **PieChart** | Default, DarkMode | SingleSlice, NoData |

### 3.6 UI (3 components)

| Component | Obligatory States | Optional States |
|-----------|------------------|-----------------|
| **Breadcrumb** | Default, SingleItem, Long | WithIcons |
| **Card** | Default, Bordered, Ghost | WithImage, WithAction |
| **ShowcaseSection** | Default | Empty |

### 3.7 Icons (1 component)

| Component | Obligatory States | Optional States |
|-----------|------------------|-----------------|
| **IconGallery** | Grid, List, SearchFiltered | CustomSize, CustomColor |

---

## Section 4 — Controls Descriptions

### 4.1 Rule

Every component story file MUST define `argTypes` on the `Meta` object with:

1. **`description`** — human-readable explanation of the prop's purpose
2. **`control`** — `{ type: 'select' | 'boolean' | 'text' | 'number' }` for user-editable props; `{ disable: true }` for internal or callback-only props
3. **`table: { defaultValue: { summary: '<value>' } }`** — the default value when the prop is omitted

Props that are callback handlers (`onClick`, `onChange`, `onSubmit`) receive `description` only with `control: false` (or `action: true` via `@storybook/addon-actions`).

### 4.2 Pattern

```tsx
const meta = {
  component: Button,
  argTypes: {
    variant: {
      description: 'Visual style of the button.',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      description: 'Predefined size of the button.',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: {
      description: 'Prevents user interaction. Sets `aria-disabled` and blocks events.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    onClick: {
      description: 'Callback fired when the button is clicked. Receives the click event.',
      control: false,
    },
  },
} satisfies Meta<typeof Button>;
```

### 4.3 Distribution

| Package | Components | Estimated argTypes |
|---------|:---:|:---:|
| Primitives | 11 | ~100 props |
| Forms | 5 | ~40 props |
| Layouts | 3 | ~20 props |
| Charts | 3 | ~20 props |
| UI | 3 | ~15 props |
| Icons | 1 | ~3 props |
| **Total** | **26** | **~200 props** |

---

## Section 5 — Play Functions

### 5.1 Rule

A `play` function MUST:

1. Use `async ({ canvasElement, step })` signature
2. Wrap each logical action+assertion pair in `await step('<description>', async () => { ... })`
3. Use `userEvent` from `@storybook/test` for interactions
4. Use `expect` from `@storybook/test` for assertions
5. Use `within(canvasElement)` to query the rendered story
6. Prefer `getByRole` over `getByTestId` (accessibility-first query)

### 5.2 Pattern

```tsx
import { expect, userEvent, within } from '@storybook/test';

export const Interactive: Story = {
  args: { variant: 'primary', children: 'Click me' },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('button is enabled and clickable', async () => {
      const button = canvas.getByRole('button', { name: 'Click me' });
      await expect(button).toBeEnabled();
      await userEvent.click(button);
    });
  },
};
```

### 5.3 Components Requiring Play Functions (12)

#### Primitives (7)

| Component | Play Function | Test Coverage |
|-----------|:---:|--------------|
| **Button** | Click triggers `onClick`; disabled blocks click | `onClick` called; disabled state blocks event; button receives focus on tab. **Existing:** review and standardize. |
| **Checkbox** | Click toggles checked state | Unchecked → Checked → Unchecked; `onChange` receives `checked: boolean`; disabled blocks interaction. |
| **Radio** | Click selects single value | Clicking one radio selects it; clicking another deselects the first; `onChange` receives `value`; disabled blocks. |
| **Switch** | Click toggles on/off | Alternates between on/off; `aria-checked` reflects state; disabled blocks toggle. |
| **Select** | Open → choose option → closes | Opens on click/keypress; displays options; selecting closes menu; value updates; disabled blocks open. |
| **Dropdown** | Open → click item → closes | Menu opens; items visible; clicking item executes action; closes after; disabled blocks. |
| **Table** | Click header → sort | Column sorting ASC/DESC toggles; sort indicator visible; unsorted columns reset. |

#### Forms (3)

| Component | Play Function | Test Coverage |
|-----------|:---:|--------------|
| **Form** | Fill fields → submit | Validation blocks empty submit; submit with valid data succeeds; error messages render per field. **Existing:** review and standardize. |
| **DatePicker** | Open → navigate → select date | Calendar opens on input focus/click; month navigation works; clicking date fills input; escape closes. |
| **MultiSelect** | Open → select multiple → remove | Selects item 1 + item 2; chips show selected; clicking chip X removes; search filters; disabled blocks. |

#### Layouts (1)

| Component | Play Function | Test Coverage |
|-----------|:---:|--------------|
| **Sidebar** | Toggle expand/collapse | Toggle button switches state; icon/menu text reflects state; `aria-expanded` attribute updates. **Existing:** review and standardize. |

#### UI (1)

| Component | Play Function | Test Coverage |
|-----------|:---:|--------------|
| **Breadcrumb** | Verify semantics | Last item has `aria-current="page"`; links are functional; separator renders between items. **Existing:** review and standardize. |

### 5.4 Existing Play Functions (Review)

The following already have play functions and MUST be reviewed for consistency with this spec's patterns:

| Component | Story | Status |
|-----------|-------|:---:|
| Button | Interactive | Review — ensure `step()` wrappers, `getByRole` usage |
| Breadcrumb | Interactive | Review — ensure `step()` wrappers |
| Sidebar | Interactive | Review — ensure `step()` wrappers |
| Form | SubmitHandling | Review — ensure `step()` wrappers |
| Form + Validation (pattern) | — | Review — ensure `getByRole` over `getByTestId` |
| Table + Dropdown (pattern) | — | Review |

---

## Section 6 — Acceptance Criteria

| # | Criterion | Verification |
|---|-----------|-------------|
| SC-1 | All 26 component story files contain all obligatory states from §3 | File audit per component |
| SC-2 | All 26 component stories have `argTypes` with `description`, `control`, and `table: { defaultValue }` on every public prop | File audit per component |
| SC-3 | All 26 component stories have `tags: ['autodocs']` on the `Meta` object | File audit per component |
| SC-4 | All 12 interactive components have `play` functions with `step()` wrappers | File audit per component |
| SC-5 | All play functions pass in Storybook interactions panel (`No errors found`) | Storybook build + manual or automated interaction run |
| SC-6 | All states render without console errors in Storybook | Storybook build + manual verification |
| SC-7 | No regressions in existing Storybook build | `turbo run build:storybook` passes |
| SC-8 | All play functions use `getByRole` (not `getByTestId`) by default | Code review |

---

## Section 7 — Exclusions

These are explicitly NOT in scope for this spec:

| Item | Rationale |
|------|----------|
| Stories for `@holiveira/hooks` | Non-visual; needs dedicated hooks documentation approach |
| Stories for `@holiveira/utils` | Non-visual; needs API reference approach |
| Stories for `@holiveira/i18n` | Non-visual formatting functions |
| Stories for `@holiveira/providers` | Utility package; usage demonstrated via patterns |
| Stories for `@holiveira/theme` (standalone) | Already covered via global preview decorator |
| LineChart stories | Component may need review — separate task |
| Storybook deployment | `storybook.yml` exists; deploy is infrastructure concern |
| Visual regression tests | Chromatic — deferred to v1.1 |
| Accessibility audit via Storybook | Addon already configured; audit is a separate testing concern |
| New MDX pages | Current Introduction, Getting Started, Patterns, Tokens pages are adequate for v1 |

---

## Section 8 — Implementation Notes

### 8.1 Story File Location

Stories remain co-located with components:
- `packages/<pkg>/src/<component>.stories.tsx` for components
- `apps/storybook/stories/tokens/` for token showcase pages (existing — no changes)
- `apps/storybook/stories/patterns/` for pattern stories (existing — no changes)

### 8.2 Import Convention

Consistent with repository import order convention:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, userEvent, within } from '@storybook/test';

import { Button } from './button';
```

### 8.3 Existing Pattern Stories

Pattern stories currently have `tags: []` (no autodocs). This spec does NOT require changing those — patterns are compositions, not standalone components, and autodocs for patterns is not meaningful. Token showcase pages follow the same rule.

### 8.4 DarkMode State Scope

Only Charts require DarkMode state stories because chart colors are visually data-dependent. All other components rely on the global `@storybook/addon-themes` decorator for dark/light toggling. Adding DarkMode stories to every component duplicates the decorator's purpose.

---

## Section 9 — Component Coverage Matrix

| # | Component | Package | Stories | Obligatory States | Play | Controls |
|---|-----------|---------|:---:|:---:|:---:|:---:|
| 1 | Button | primitives | 11 existing → add Loading + WithIcon | ✅ | ✅ Review | ✅ |
| 2 | Alert | primitives | 4 existing → add all variants | ✅ | — | ✅ |
| 3 | Skeleton | primitives | 2 existing → add variants | ✅ | — | ✅ |
| 4 | Checkbox | primitives | 2 existing → add all states | ✅ | ✅ New | ✅ |
| 5 | Radio | primitives | 2 existing → add all states | ✅ | ✅ New | ✅ |
| 6 | Switch | primitives | 2 existing → add all states | ✅ | ✅ New | ✅ |
| 7 | InputGroup | primitives | 3 existing → add states | ✅ | — | ✅ |
| 8 | TextArea | primitives | 2 existing → add states | ✅ | — | ✅ |
| 9 | Select | primitives | 3 existing → add states | ✅ | ✅ New | ✅ |
| 10 | Table | primitives | 4 existing → add states | ✅ | ✅ New | ✅ |
| 11 | Dropdown | primitives | 4 existing → add states | ✅ | ✅ New | ✅ |
| 12 | Form | forms | 3 existing → add Loading | ✅ | ✅ Review | ✅ |
| 13 | Field | forms | 3 existing → add states | ✅ | — | ✅ |
| 14 | Submit | forms | 2 existing → add states | ✅ | — | ✅ |
| 15 | DatePicker | forms | 3 existing → add states | ✅ | ✅ New | ✅ |
| 16 | MultiSelect | forms | 2 existing → add states | ✅ | ✅ New | ✅ |
| 17 | Sidebar | layouts | 5 existing → review states | ✅ | ✅ Review | ✅ |
| 18 | Header | layouts | 3 existing → add states | ✅ | — | ✅ |
| 19 | ApplicationShell | layouts | 1 existing → add MobileView | ✅ | — | ✅ |
| 20 | AreaChart | charts | 4 existing → add states | ✅ | — | ✅ |
| 21 | BarChart | charts | 3 existing → add states | ✅ | — | ✅ |
| 22 | PieChart | charts | 3 existing → add states | ✅ | — | ✅ |
| 23 | Breadcrumb | ui | 5 existing → add states | ✅ | ✅ Review | ✅ |
| 24 | Card | ui | 3 existing → add states | ✅ | — | ✅ |
| 25 | ShowcaseSection | ui | 2 existing → add states | ✅ | — | ✅ |
| 26 | IconGallery | icons | 2 existing → add states | ✅ | — | ✅ |

---
