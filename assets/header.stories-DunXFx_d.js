import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{within as j,expect as y}from"./index-DH-M5T-F.js";import{H as r,a as n,b as h}from"./header-DUYrzxPo.js";import{S as T}from"./sidebar-context-xYqzaUnI.js";import"./cn-DCADjnpI.js";import"./index-BxXVWNx3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./use-is-mobile-B66gSL3S.js";function A(o){return e.jsx(T,{children:e.jsx(o,{})})}const R={title:"Layouts/Header",component:r,tags:["autodocs"],decorators:[A],argTypes:{children:{description:"Content rendered inside the header. Compose with HeaderToggle and HeaderActions.",control:!1},className:{description:"Additional CSS classes for the header element.",control:"text",table:{defaultValue:{summary:"undefined"}}}}},t={render:()=>e.jsx(r,{children:e.jsx(n,{})})},a={render:()=>e.jsxs(r,{children:[e.jsx(n,{}),e.jsx(h,{children:e.jsx("span",{className:"text-sm text-neutral-500",children:"John Doe"})})]})},s={render:()=>e.jsxs(r,{children:[e.jsx(n,{}),e.jsx(h,{children:e.jsx("span",{className:"text-sm text-neutral-500",children:"Notifications"})})]}),play:async({canvasElement:o,step:H})=>{const b=j(o);await H("Toggle button is visible on mobile",async()=>{const f=b.getByRole("button",{name:/toggle sidebar/i});await y(f).toBeVisible()})}};var i,c,d;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => <Header>
      <HeaderToggle />
    </Header>
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var l,m,p;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <Header>
      <HeaderToggle />
      <HeaderActions>
        <span className="text-sm text-neutral-500">John Doe</span>
      </HeaderActions>
    </Header>
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var g,u,x;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <Header>
      <HeaderToggle />
      <HeaderActions>
        <span className="text-sm text-neutral-500">Notifications</span>
      </HeaderActions>
    </Header>,
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('Toggle button is visible on mobile', async () => {
      const toggle = canvas.getByRole('button', {
        name: /toggle sidebar/i
      });
      await expect(toggle).toBeVisible();
    });
  }
}`,...(x=(u=s.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};const V=["Default","WithActions","ToggleInteraction"];export{t as Default,s as ToggleInteraction,a as WithActions,V as __namedExportsOrder,R as default};
