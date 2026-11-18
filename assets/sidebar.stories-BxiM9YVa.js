import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{within as I,expect as p,userEvent as R}from"./index-DH-M5T-F.js";import{S as A}from"./sidebar-BUEZsCwb.js";import{S as d,u as B}from"./sidebar-context-xYqzaUnI.js";import"./cn-DCADjnpI.js";import"./index-BxXVWNx3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./use-is-mobile-B66gSL3S.js";function H(a){return e.jsx(d,{children:e.jsx("div",{className:"flex min-h-[400px]",children:e.jsx(a,{})})})}const P=[{label:"Dashboard",icon:"&#9679;"},{label:"Analytics",icon:"&#9679;"},{label:"Settings",icon:"&#9679;"}];function T(){return e.jsx("nav",{className:"space-y-1",children:P.map(a=>e.jsxs("a",{href:"#",className:"flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800",onClick:t=>t.preventDefault(),children:[e.jsx("span",{dangerouslySetInnerHTML:{__html:a.icon}}),a.label]},a.label))})}const F={title:"Layouts/Sidebar",component:A,tags:["autodocs"],decorators:[H],args:{logo:e.jsx("div",{className:"text-lg font-bold",children:"HO Design System"}),children:e.jsx(T,{})},argTypes:{logo:{description:"Logo or branding element rendered at the top of the sidebar.",control:!1},children:{description:"Navigation items and content within the sidebar.",control:!1},className:{description:"Additional CSS classes for the sidebar container.",control:"text",table:{defaultValue:{summary:"undefined"}}}}},s={},o={decorators:[a=>e.jsx(d,{defaultCollapsed:!0,children:e.jsx("div",{className:"flex min-h-[400px]",children:e.jsx(a,{})})})]},n={parameters:{viewport:{defaultViewport:"xsm"}}},i={};function D({children:a}){const{collapsed:t,setCollapsed:r}=B();return e.jsxs("div",{className:"relative flex min-h-[400px]",children:[a,e.jsx("button",{type:"button",onClick:()=>r(!t),className:"absolute top-2 right-2 z-50 rounded-md border px-2 py-1 text-sm",children:t?"Expand":"Collapse"})]})}const l={decorators:[a=>e.jsx(d,{defaultCollapsed:!0,children:e.jsx("div",{className:"flex min-h-[400px]",children:e.jsx(D,{children:e.jsx(a,{})})})})],play:async({canvasElement:a,step:t})=>{const r=I(a);await t("Sidebar starts collapsed",async()=>{const c=r.getByRole("complementary");await p(c).toHaveAttribute("aria-hidden","true")}),await t("Click expand button",async()=>{const c=r.getByRole("button",{name:/expand|collapse/i});await R.click(c);const k=r.getByRole("complementary");await p(k).toHaveAttribute("aria-hidden","false")})}};var m,u,x;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(x=(u=s.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var b,v,g;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  decorators: [Story => <SidebarProvider defaultCollapsed={true}>
        <div className="flex min-h-[400px]">
          <Story />
        </div>
      </SidebarProvider>]
}`,...(g=(v=o.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var h,y,f;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  parameters: {
    viewport: {
      defaultViewport: 'xsm'
    }
  }
}`,...(f=(y=n.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var S,j,w;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:"{}",...(w=(j=i.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var N,C,E;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
  decorators: [Story => <SidebarProvider defaultCollapsed={true}>
        <div className="flex min-h-[400px]">
          <ToggleStory>
            <Story />
          </ToggleStory>
        </div>
      </SidebarProvider>],
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('Sidebar starts collapsed', async () => {
      const sidebar = canvas.getByRole('complementary');
      await expect(sidebar).toHaveAttribute('aria-hidden', 'true');
    });
    await step('Click expand button', async () => {
      const toggle = canvas.getByRole('button', {
        name: /expand|collapse/i
      });
      await userEvent.click(toggle);
      const sidebar = canvas.getByRole('complementary');
      await expect(sidebar).toHaveAttribute('aria-hidden', 'false');
    });
  }
}`,...(E=(C=l.parameters)==null?void 0:C.docs)==null?void 0:E.source}}};const G=["Expanded","Collapsed","MobileOverlay","WithNavigationItems","Interactive"];export{o as Collapsed,s as Expanded,l as Interactive,n as MobileOverlay,i as WithNavigationItems,G as __namedExportsOrder,F as default};
