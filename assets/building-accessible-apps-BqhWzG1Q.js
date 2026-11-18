import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{useMDXComponents as o}from"./index-CTeScyef.js";import{M as r}from"./index-5_6oiXsh.js";import"./index-BxXVWNx3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CkpTEBEc.js";import"./index-DCvtqWl1.js";import"./index-DgH-xKnr.js";import"./index-Bhqu_tAV.js";function i(s){const n={code:"code",h1:"h1",h2:"h2",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Patterns/Building Accessible Apps with HO Design System"}),`
`,e.jsx(n.h1,{id:"building-accessible-apps-with-ho-design-system",children:"Building Accessible Apps with HO Design System"}),`
`,e.jsx(n.p,{children:"This guide explains how to use HO Design System components to build WCAG 2.2 AA compliant applications."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"what-ho-design-system-guarantees",children:"What HO Design System Guarantees"}),`
`,e.jsxs(n.p,{children:["When you use HO Design System components as designed, the following are guaranteed at the ",e.jsx(n.strong,{children:"component level"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keyboard accessibility"})," — every interactive component responds to Tab, Enter, Space, Escape, and Arrow keys"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ARIA attributes"})," — required ARIA is self-declared by each component"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus management"})," — focus traps, restoration, and error focus are handled automatically"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Dark mode"})," — all components pass axe-core contrast checks in both light and dark modes"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Reduced motion"})," — animations respect ",e.jsx(n.code,{children:"prefers-reduced-motion"})]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"what-you-must-guarantee",children:"What You Must Guarantee"}),`
`,e.jsx(n.p,{children:"Page-level accessibility is the consumer's responsibility:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Landmark structure"})," — use ",e.jsx(n.code,{children:"<header>"}),", ",e.jsx(n.code,{children:"<nav>"}),", ",e.jsx(n.code,{children:"<main>"}),", ",e.jsx(n.code,{children:"<aside>"}),", ",e.jsx(n.code,{children:"<footer>"})," at the page level"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Heading hierarchy"})," — ",e.jsx(n.code,{children:"<h1>"})," → ",e.jsx(n.code,{children:"<h2>"})," → ",e.jsx(n.code,{children:"<h3>"})," without skipping levels"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Page title"})," — every page has a unique ",e.jsx(n.code,{children:"<title>"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus order"})," — layout composition must follow a logical DOM order"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Skip links"}),' — provide "Skip to main content" for keyboard users']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Form validation"})," — use ",e.jsx(n.code,{children:"Field"})," + ",e.jsx(n.code,{children:"Submit"})," with proper error messaging"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"using-aria-with-ho-design-system-components",children:"Using ARIA with HO Design System Components"}),`
`,e.jsx(n.p,{children:"Components that extend native HTML attributes accept custom ARIA:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// Custom accessible label on a Checkbox
<Checkbox aria-label="Accept terms and conditions" />

// Custom description on a Button
<Button
  label="Delete"
  aria-describedby="delete-desc"
/>
<div id="delete-desc">This action cannot be undone</div>
`})}),`
`,e.jsx(n.p,{children:"Components that do NOT extend native HTML attributes have all required ARIA built in. You do not need to add ARIA to:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Dropdown (",e.jsx(n.code,{children:"aria-expanded"}),", ",e.jsx(n.code,{children:"aria-haspopup"}),", ",e.jsx(n.code,{children:'role="menu"'}),")"]}),`
`,e.jsxs(n.li,{children:["Breadcrumb (",e.jsx(n.code,{children:'aria-label="Breadcrumb"'}),", ",e.jsx(n.code,{children:'aria-current="page"'}),")"]}),`
`,e.jsxs(n.li,{children:["Sidebar (",e.jsx(n.code,{children:'aria-label="Main navigation"'}),", ",e.jsx(n.code,{children:"inert"}),")"]}),`
`,e.jsxs(n.li,{children:["ErrorMessage (",e.jsx(n.code,{children:'role="alert"'}),", ",e.jsx(n.code,{children:'aria-live="polite"'}),")"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"keyboard-interaction-reference",children:"Keyboard Interaction Reference"}),`
`,e.jsx(n.p,{children:`| Key          | What it does                     | Where                                 |
| ------------ | -------------------------------- | ------------------------------------- |
| Tab          | Move focus forward               | All components                        |
| Shift+Tab    | Move focus backward              | All components                        |
| Enter        | Activate, open menu, submit form | Button, Submit, Dropdown, MultiSelect |
| Space        | Activate, toggle checkbox/switch | Button, Checkbox, Switch, Dropdown    |
| Escape       | Close menu, dismiss              | Dropdown, MultiSelect                 |
| ArrowUp/Down | Navigate menu, change selection  | Dropdown, MultiSelect, Select, Radio  |
| Home/End     | First/last item                  | Dropdown, MultiSelect                 |`}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"focus-management",children:"Focus Management"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Dropdown menus"})," — focus is trapped within the open menu. Tab cycles through menu items. Escape closes and returns focus to the trigger."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Form errors"})," — when validation fails, focus moves to the first field with an error. Error messages are announced via ",e.jsx(n.code,{children:"aria-live"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Focus indicators"})," — HO Design System uses browser default ",e.jsx(n.code,{children:":focus-visible"}),". Customize via CSS:"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`/* Custom focus ring */
button:focus-visible {
  outline: 2px solid #5750f1;
  outline-offset: 2px;
}
`})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"reduced-motion",children:"Reduced Motion"}),`
`,e.jsxs(n.p,{children:["All HO Design System animations respect ",e.jsx(n.code,{children:"prefers-reduced-motion"}),". Users who set this preference in their operating system will not see animations. This applies to:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Skeleton pulse animation"}),`
`,e.jsx(n.li,{children:"Sidebar slide transitions"}),`
`,e.jsx(n.li,{children:"Dropdown open/close transitions"}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"color-and-contrast",children:"Color and Contrast"}),`
`,e.jsx(n.p,{children:"HO Design System design tokens pass WCAG AA contrast ratios:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Normal text (< 18px): minimum 4.5:1"}),`
`,e.jsx(n.li,{children:"Large text (>= 18px): minimum 3:1"}),`
`,e.jsx(n.li,{children:"UI components (borders, icons): minimum 3:1"}),`
`,e.jsx(n.li,{children:"Dark mode: all tokens verified"}),`
`]}),`
`,e.jsx(n.p,{children:"Color is never the sole differentiator — components use icons, text labels, and patterns alongside color."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"accessibility-testing",children:"Accessibility Testing"}),`
`,e.jsx(n.p,{children:"HO Design System's testing infrastructure includes:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"axe-core"})," — automated WCAG compliance checks in vitest (CI-blocking)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keyboard tests"})," — every interactive component has keyboard interaction tests (CI-blocking)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Dark mode tests"})," — every interactive component passes axe in dark mode (CI-blocking)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Storybook a11y addon"})," — visual inspection tool in Storybook (non-blocking)"]}),`
`]}),`
`,e.jsxs(n.p,{children:["When adding new components, follow the testing patterns documented in the ",e.jsx(n.strong,{children:"Accessibility Testing"})," pattern."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{id:"known-limitations",children:"Known Limitations"}),`
`,e.jsx(n.p,{children:"These M8-resolved issues are documented for consumer awareness:"}),`
`,e.jsxs(n.p,{children:[`| Issue                        | Component        | Workaround                                               |
| ---------------------------- | ---------------- | -------------------------------------------------------- |
| No focus trap on MultiSelect | MultiSelect      | Consumer can implement custom focus management if needed |
| No `,e.jsx(n.code,{children:"label"})," prop on Switch    | Switch           | Use the existing ",e.jsx(n.code,{children:"aria-label"})," (set from ",e.jsx(n.code,{children:"name"}),` prop)     |
| Icons naming convention      | Icons (36 icons) | Ensure `,e.jsx(n.code,{children:"title"}),` prop is passed for informative icons      |
| Button type default          | Button           | Pass `,e.jsx(n.code,{children:'type="submit"'})," explicitly when used inside a form  |"]}),`
`,e.jsxs(n.p,{children:["For the full resolution status, see ",e.jsx(n.code,{children:"docs/accessibility/p2-p3-resolution.md"}),"."]})]})}function p(s={}){const{wrapper:n}={...o(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{p as default};
