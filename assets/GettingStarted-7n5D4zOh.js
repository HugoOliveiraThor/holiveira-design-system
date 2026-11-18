import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{useMDXComponents as o}from"./index-CTeScyef.js";import{M as i}from"./index-5_6oiXsh.js";import"./index-BxXVWNx3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CkpTEBEc.js";import"./index-DCvtqWl1.js";import"./index-DgH-xKnr.js";import"./index-Bhqu_tAV.js";function s(r){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Getting Started"}),`
`,e.jsx(n.h1,{id:"getting-started",children:"Getting Started"}),`
`,e.jsxs(n.p,{children:["HO Design System is a set of independently versioned packages under the ",e.jsx(n.code,{children:"@ho-dev/*"}),` namespace. Until
the first release, the packages are consumed from this repository and demonstrated by the
playground.`]}),`
`,e.jsx(n.h2,{id:"live",children:"Live"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Storybook"})," — ",e.jsx(n.a,{href:"https://hugooliveirathor.github.io/holiveira-design-system/",rel:"nofollow",children:"component documentation"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Playground"})," — ",e.jsx(n.a,{href:"https://hugooliveirathor.github.io/holiveira-design-system/playground/",rel:"nofollow",children:"full product screens"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Docs"})," — ",e.jsx(n.a,{href:"https://hugooliveirathor.github.io/holiveira-design-system/docs/",rel:"nofollow",children:"guides, package reference and component API"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Repository"})," — ",e.jsx(n.a,{href:"https://github.com/HugoOliveiraThor/holiveira-design-system",rel:"nofollow",children:"HugoOliveiraThor/holiveira-design-system"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Issues"})," — ",e.jsx(n.a,{href:"https://github.com/HugoOliveiraThor/holiveira-design-system/issues",rel:"nofollow",children:"report a bug"})]}),`
`]}),`
`,e.jsx(n.h2,{id:"status",children:"Status"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Pre-release."})," The current version is ",e.jsx(n.code,{children:"0.2.0"}),`, not yet published to npm. Use the repository
today; the `,e.jsx(n.code,{children:"pnpm add"})," instructions below apply after the first release."]}),`
`]}),`
`,e.jsx(n.h2,{id:"run-from-the-repository",children:"Run from the repository"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`git clone https://github.com/HugoOliveiraThor/holiveira-design-system.git
cd holiveira-design-system
pnpm install
cp .env.example .env
pnpm run db:generate
pnpm run dev
`})}),`
`,e.jsxs(n.p,{children:["Open ",e.jsx(n.a,{href:"http://localhost:3000",rel:"nofollow",children:"localhost:3000"}),` for the playground and
`,e.jsx(n.a,{href:"http://localhost:6006",rel:"nofollow",children:"localhost:6006"})," for Storybook."]}),`
`,e.jsx(n.h2,{id:"install-from-npm-after-the-first-release",children:"Install from npm (after the first release)"}),`
`,e.jsxs(n.p,{children:["Each ",e.jsx(n.code,{children:"@ho-dev/*"})," package is published independently. Install only what your application needs:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`# Primitives (base components)
pnpm add @ho-dev/primitives

# Theme (provider, CSS tokens, dark mode)
pnpm add @ho-dev/theme

# UI components
pnpm add @ho-dev/ui

# Forms
pnpm add @ho-dev/forms

# Layout components
pnpm add @ho-dev/layouts

# Charts
pnpm add @ho-dev/charts

# Icons
pnpm add @ho-dev/icons

# Hooks
pnpm add @ho-dev/hooks

# Utilities
pnpm add @ho-dev/utils
`})}),`
`,e.jsx(n.h2,{id:"quick-start",children:"Quick Start"}),`
`,e.jsxs(n.p,{children:["Wrap your application with ",e.jsx(n.code,{children:"ThemeProvider"}),` to enable the design system's theme context, dark mode,
and CSS tokens:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ThemeProvider } from '@ho-dev/theme';

function App({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
`})}),`
`,e.jsx(n.p,{children:"Import the theme CSS for Tailwind v4 tokens and base styles:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import '@ho-dev/theme/theme.css';
`})}),`
`,e.jsx(n.p,{children:"Now you can use any HO Design System component:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { Button } from '@ho-dev/primitives';
import { cn } from '@ho-dev/utils';

export function SubmitForm() {
  return (
    <div className={cn('flex gap-4')}>
      <Button variant="primary">Save Changes</Button>
      <Button variant="outline">Cancel</Button>
    </div>
  );
}
`})}),`
`,e.jsx(n.h2,{id:"prerequisites",children:"Prerequisites"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"React"})," 19+"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tailwind CSS"})," v4"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Next.js"}),` 16 (optional — HO Design System works with any React framework; the playground is
built on Next.js 16)`]}),`
`]}),`
`,e.jsx(n.h2,{id:"learn-more",children:"Learn More"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Browse components in the sidebar for API documentation, variants, and interactive examples"}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://hugooliveirathor.github.io/holiveira-design-system/playground/",rel:"nofollow",children:"Playground"}),` — full
product screens composed from the packages`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://github.com/HugoOliveiraThor/holiveira-design-system#readme",rel:"nofollow",children:"README"}),` — project overview
and setup guide`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://github.com/HugoOliveiraThor/holiveira-design-system/blob/main/CHANGELOG.md",rel:"nofollow",children:"Changelog"}),` —
release history`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://github.com/HugoOliveiraThor/holiveira-design-system/tree/main/docs/architecture",rel:"nofollow",children:"Architecture"}),` —
specifications, ADRs, and package contracts`]}),`
`]})]})}function g(r={}){const{wrapper:n}={...o(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{g as default};
