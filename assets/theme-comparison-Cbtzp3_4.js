import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{useMDXComponents as d}from"./index-CTeScyef.js";import{M as n}from"./index-5_6oiXsh.js";import"./index-BxXVWNx3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CkpTEBEc.js";import"./index-DCvtqWl1.js";import"./index-DgH-xKnr.js";import"./index-Bhqu_tAV.js";function t(r){const s={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...d(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{title:"Design Tokens/Theme Comparison"}),`
`,e.jsx(s.h1,{id:"theme-comparison",children:"Theme Comparison"}),`
`,e.jsxs(s.p,{children:["The design system supports both light and dark modes. Use the toolbar theme switcher to toggle between them, or use ",e.jsx(s.code,{children:"ThemeProvider"})," in your application to handle automatic switching."]}),`
`,e.jsx(s.h2,{id:"side-by-side",children:"Side-by-Side"}),`
`,e.jsxs("div",{className:"grid grid-cols-2 gap-6",children:[e.jsxs("div",{className:"rounded-xl border border-neutral-300 bg-white p-6",children:[e.jsx("h3",{className:"mb-2 text-base font-semibold",children:"Light"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("div",{className:"bg-primary rounded-md px-4 py-2 text-sm text-white",children:"Primary button"}),e.jsx("div",{className:"rounded-md border border-neutral-300 px-4 py-2 text-sm",children:"Card surface"}),e.jsx("p",{className:"text-body-xs text-[#64748B]",children:"Secondary text on light background."})]})]}),e.jsxs("div",{className:"rounded-xl border border-gray-700 bg-[#1A222C] p-6",children:[e.jsx("h3",{className:"mb-2 text-base font-semibold text-white",children:"Dark"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("div",{className:"bg-primary rounded-md px-4 py-2 text-sm text-white",children:"Primary button"}),e.jsx("div",{className:"rounded-md border border-[#333A48] px-4 py-2 text-sm text-white",children:e.jsx(s.p,{children:"Card surface"})}),e.jsx("p",{className:"text-body-xs text-[#AEB7C0]",children:"Secondary text on dark background."})]})]})]}),`
`,e.jsx(s.h2,{id:"css-custom-properties",children:"CSS Custom Properties"}),`
`,e.jsxs(s.p,{children:["The theme system maps design tokens to Tailwind CSS classes. Toggle dark mode via the ",e.jsx(s.code,{children:"dark"})," class on the ",e.jsx(s.code,{children:"<html>"})," element:"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<html class="dark">
  <!-- dark mode styles apply -->
</html>
`})}),`
`,e.jsxs(s.p,{children:["Use the ",e.jsx(s.code,{children:"ThemeProvider"})," component from ",e.jsx(s.code,{children:"@ho-dev/theme"})," to manage theme state and persistence."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-tsx",children:`import { ThemeProvider } from '@ho-dev/theme';

function App({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
`})})]})}function j(r={}){const{wrapper:s}={...d(),...r.components};return s?e.jsx(s,{...r,children:e.jsx(t,{...r})}):t(r)}export{j as default};
