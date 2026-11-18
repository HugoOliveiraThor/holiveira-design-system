import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{within as k,expect as l,userEvent as w}from"./index-DH-M5T-F.js";import{S as C}from"./submit-BsNRBXny.js";import"./index-BxXVWNx3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./button-DY2ysP3t.js";import"./cn-DCADjnpI.js";import"./index-Da1oAmHU.js";const I={title:"Forms/Submit",component:C,tags:["autodocs"],args:{children:"Submit"},argTypes:{children:{description:"Button label or content.",control:"text",table:{defaultValue:{summary:"undefined"}}},disabled:{description:"Disables the submit button.",control:"boolean",table:{defaultValue:{summary:"false"}}},className:{description:"Additional CSS classes.",control:!1}}},a={args:{children:"Save Changes"}},n={args:{children:"Cannot Proceed",disabled:!0}},s={render:o=>e.jsx(C,{...o,children:e.jsxs("span",{className:"inline-flex items-center gap-2",children:[e.jsxs("svg",{className:"size-4 animate-spin",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"})]}),"Saving..."]})})},i={args:{children:"Click to Submit"},play:async({canvasElement:o,step:r})=>{const c=k(o);await r("Submit button is visible and enabled",async()=>{const t=c.getByRole("button",{name:/click to submit/i});await l(t).toBeVisible(),await l(t).not.toBeDisabled()}),await r("Click submit button",async()=>{const t=c.getByRole("button",{name:/click to submit/i});await w.click(t)})}};var m,u,d;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    children: 'Save Changes'
  }
}`,...(d=(u=a.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var p,b,g;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    children: 'Cannot Proceed',
    disabled: true
  }
}`,...(g=(b=n.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var h,v,y;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: args => <Submit {...args}>
      <span className="inline-flex items-center gap-2">
        <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Saving...
      </span>
    </Submit>
}`,...(y=(v=s.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var x,S,f;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    children: 'Click to Submit'
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('Submit button is visible and enabled', async () => {
      const button = canvas.getByRole('button', {
        name: /click to submit/i
      });
      await expect(button).toBeVisible();
      await expect(button).not.toBeDisabled();
    });
    await step('Click submit button', async () => {
      const button = canvas.getByRole('button', {
        name: /click to submit/i
      });
      await userEvent.click(button);
    });
  }
}`,...(f=(S=i.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};const L=["Default","Disabled","Loading","Interactive"];export{a as Default,n as Disabled,i as Interactive,s as Loading,L as __namedExportsOrder,I as default};
