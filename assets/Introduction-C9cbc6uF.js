import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{useMDXComponents as o}from"./index-CTeScyef.js";import{M as t}from"./index-5_6oiXsh.js";import"./index-BxXVWNx3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CkpTEBEc.js";import"./index-DCvtqWl1.js";import"./index-DgH-xKnr.js";import"./index-Bhqu_tAV.js";function i(s){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...o(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Introduction"}),`
`,e.jsx(n.h1,{id:"ho-design-system",children:"HO Design System"}),`
`,e.jsx(n.p,{children:"HO Design System is an engineering-first design system for building consistent, accessible web applications. This Storybook is the official component documentation and development platform."}),`
`,e.jsx(n.h2,{id:"package-overview",children:"Package Overview"}),`
`,e.jsxs(n.p,{children:[`| Package              | Purpose                                                                |
| -------------------- | ---------------------------------------------------------------------- |
| `,e.jsx(n.code,{children:"@ho-dev/primitives"}),` | Base UI components — Button, Alert, Dropdown, Select, Table, and more  |
| `,e.jsx(n.code,{children:"@ho-dev/ui"}),`         | Composed UI elements — Breadcrumb, Card, ShowcaseSection               |
| `,e.jsx(n.code,{children:"@ho-dev/forms"}),`      | Form components — Form, Field, DatePicker, MultiSelect, and validation |
| `,e.jsx(n.code,{children:"@ho-dev/layouts"}),`    | Layout components — Header, Sidebar, and SidebarProvider               |
| `,e.jsx(n.code,{children:"@ho-dev/charts"}),`     | Chart components — Area, Bar, Line, Pie (powered by ApexCharts)        |
| `,e.jsx(n.code,{children:"@ho-dev/icons"}),`      | Icon library — SVG icon set with gallery view                          |
| `,e.jsx(n.code,{children:"@ho-dev/hooks"}),`      | Utility hooks — useClickOutside, useIsMobile                           |
| `,e.jsx(n.code,{children:"@ho-dev/theme"}),`      | Theme system — ThemeProvider, CSS tokens, dark mode                    |
| `,e.jsx(n.code,{children:"@ho-dev/tokens"}),`     | Design tokens — colors, typography, spacing, breakpoints               |
| `,e.jsx(n.code,{children:"@ho-dev/utils"}),"      | Utilities — cn(), cva(), helpers                                       |"]}),`
`,e.jsx(n.h2,{id:"sidebar-navigation",children:"Sidebar Navigation"}),`
`,e.jsx(n.p,{children:"The sidebar is organized by package. Expand a package to see its components:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Primitives"})," — Button, Alert, Skeleton, Checkbox, Radio, Switch, InputGroup, TextArea, Select, Table, Dropdown"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"UI"})," — Breadcrumb, Card, ShowcaseSection"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Forms"})," — Form, Field, DatePicker, MultiSelect"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Layouts"})," — Header, Sidebar"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Charts"})," — Area, Bar, Line, Pie"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Icons"})," — Icon Gallery"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Hooks"})," — useClickOutside, useIsMobile"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tokens"})," — Design token explorer"]}),`
`]}),`
`,e.jsxs(n.p,{children:["Use the ",e.jsx(n.strong,{children:"Docs"})," tab to see component API documentation, prop tables, and usage examples. Use the ",e.jsx(n.strong,{children:"Canvas"})," tab to interact with components and toggle variants via Controls."]}),`
`,e.jsx(n.h2,{id:"theme",children:"Theme"}),`
`,e.jsxs(n.p,{children:["Toggle light and dark mode using the theme button in the toolbar. The design system uses Tailwind CSS v4 with custom color tokens configured in ",e.jsx(n.code,{children:"@ho-dev/theme"}),"."]}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.p,{children:["Every component story includes an accessibility check via ",e.jsx(n.code,{children:"@storybook/addon-a11y"}),". Open the Accessibility panel to review violations and passes."]})]})}function j(s={}){const{wrapper:n}={...o(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{j as default};
