import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{H as m,a as x}from"./header-DUYrzxPo.js";import{S as p}from"./sidebar-BUEZsCwb.js";import{S as f}from"./sidebar-context-xYqzaUnI.js";import"./cn-DCADjnpI.js";import"./index-BxXVWNx3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./use-is-mobile-B66gSL3S.js";function h(a){return e.jsx(f,{children:e.jsx("div",{className:"flex h-[600px]",children:e.jsx(a,{})})})}const u=[{label:"Dashboard",icon:"&#9679;"},{label:"Analytics",icon:"&#9679;"},{label:"Settings",icon:"&#9679;"}],D={title:"Layouts/Application Shell",tags:["autodocs"],decorators:[h],argTypes:{children:{description:"Content rendered inside the header section of the shell.",control:!1},className:{description:"Additional CSS classes for the header element.",control:"text",table:{defaultValue:{summary:"undefined"}}}}},r={render:()=>e.jsxs(e.Fragment,{children:[e.jsx(p,{logo:e.jsx("div",{className:"text-lg font-bold",children:"HO Design System"}),children:e.jsx("nav",{className:"space-y-1",children:u.map(a=>e.jsxs("a",{href:"#",className:"flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800",onClick:l=>l.preventDefault(),children:[e.jsx("span",{dangerouslySetInnerHTML:{__html:a.icon}}),a.label]},a.label))})}),e.jsxs("div",{className:"flex flex-1 flex-col",children:[e.jsx(m,{children:e.jsx(x,{})}),e.jsx("main",{className:"flex-1 p-6",children:e.jsx("div",{className:"rounded-lg border-2 border-dashed border-neutral-300 p-12 text-center text-neutral-500",children:"Main content area"})})]})]})},n={render:()=>e.jsxs(e.Fragment,{children:[e.jsx(p,{logo:e.jsx("div",{className:"text-lg font-bold",children:"HO Design System"}),children:e.jsx("nav",{className:"space-y-1",children:u.map(a=>e.jsxs("a",{href:"#",className:"flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800",onClick:l=>l.preventDefault(),children:[e.jsx("span",{dangerouslySetInnerHTML:{__html:a.icon}}),a.label]},a.label))})}),e.jsxs("div",{className:"flex flex-1 flex-col",children:[e.jsx(m,{children:e.jsx(x,{})}),e.jsx("main",{className:"flex-1 p-6",children:e.jsx("div",{className:"rounded-lg border-2 border-dashed border-neutral-300 p-12 text-center text-neutral-500",children:"Main content area"})})]})]}),parameters:{viewport:{defaultViewport:"xsm"}}};var s,t,d;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <>
      <Sidebar logo={<div className="text-lg font-bold">HO Design System</div>}>
        <nav className="space-y-1">
          {navItems.map(item => <a key={item.label} href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800" onClick={e => e.preventDefault()}>
              <span dangerouslySetInnerHTML={{
            __html: item.icon
          }} />
              {item.label}
            </a>)}
        </nav>
      </Sidebar>

      <div className="flex flex-1 flex-col">
        <Header>
          <HeaderToggle />
        </Header>

        <main className="flex-1 p-6">
          <div className="rounded-lg border-2 border-dashed border-neutral-300 p-12 text-center text-neutral-500">
            Main content area
          </div>
        </main>
      </div>
    </>
}`,...(d=(t=r.parameters)==null?void 0:t.docs)==null?void 0:d.source}}};var o,i,c;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => <>
      <Sidebar logo={<div className="text-lg font-bold">HO Design System</div>}>
        <nav className="space-y-1">
          {navItems.map(item => <a key={item.label} href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800" onClick={e => e.preventDefault()}>
              <span dangerouslySetInnerHTML={{
            __html: item.icon
          }} />
              {item.label}
            </a>)}
        </nav>
      </Sidebar>

      <div className="flex flex-1 flex-col">
        <Header>
          <HeaderToggle />
        </Header>

        <main className="flex-1 p-6">
          <div className="rounded-lg border-2 border-dashed border-neutral-300 p-12 text-center text-neutral-500">
            Main content area
          </div>
        </main>
      </div>
    </>,
  parameters: {
    viewport: {
      defaultViewport: 'xsm'
    }
  }
}`,...(c=(i=n.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};const k=["Default","MobileView"];export{r as Default,n as MobileView,k as __namedExportsOrder,D as default};
