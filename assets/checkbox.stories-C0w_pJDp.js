import{j as d}from"./jsx-runtime-EKYJJIwR.js";import{within as T,expect as i,userEvent as p}from"./index-DH-M5T-F.js";import{C as j}from"./checkbox-BWMSy2qh.js";import"./index-BxXVWNx3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./check-8xR-Yow7.js";import"./icon-wrapper-D5BXwZrf.js";import"./x-0FJdkYUO.js";import"./cn-DCADjnpI.js";const O={title:"Primitives/Checkbox",component:j,tags:["autodocs"],args:{label:"Checkbox label"},argTypes:{label:{description:"Text displayed next to the checkbox.",control:{type:"text"}},disabled:{description:"Prevents user interaction.",control:{type:"boolean"},table:{defaultValue:{summary:"false"}}},defaultChecked:{description:"Initial checked state (uncontrolled).",control:{type:"boolean"},table:{defaultValue:{summary:"false"}}},checked:{description:"Controlled checked state.",control:{type:"boolean"},table:{defaultValue:{summary:"undefined"}}},withIcon:{description:"Icon style to show when checked.",control:{type:"select"},options:["check","x"],table:{defaultValue:{summary:"undefined"}}},withBg:{description:"Toggles background fill style.",control:{type:"boolean"},table:{defaultValue:{summary:"false"}}},minimal:{description:"Compact minimal style.",control:{type:"boolean"},table:{defaultValue:{summary:"false"}}},radius:{description:"Border radius variant.",control:{type:"select"},options:["default","md"],table:{defaultValue:{summary:"default"}}},onChange:{description:"Callback fired when checked state changes. Receives `React.ChangeEvent<HTMLInputElement>`.",control:!1}}},c={args:{label:"Unchecked checkbox"}},s={args:{label:"Checked checkbox",defaultChecked:!0}},o={args:{label:"Indeterminate checkbox"}},n={args:{label:"Disabled checkbox",disabled:!0},play:async({canvasElement:a,step:t})=>{const m=T(a);await t("Disabled checkbox cannot be checked",async()=>{const e=m.getByRole("checkbox");await i(e).toBeDisabled()})}},r={render:a=>d.jsxs("div",{children:[d.jsx(j,{...a}),d.jsx("p",{className:"text-red text-body-xs mt-1",children:"You must accept the terms to continue."})]}),args:{label:"I accept the terms"}},l={args:{label:"Toggle me"},play:async({canvasElement:a,step:t})=>{const e=T(a).getByRole("checkbox");await t("Checkbox starts unchecked",async()=>{await i(e).not.toBeChecked()}),await t("Click to check",async()=>{await p.click(e),await i(e).toBeChecked()}),await t("Click to uncheck",async()=>{await p.click(e),await i(e).not.toBeChecked()})}};var h,b,u;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: 'Unchecked checkbox'
  }
}`,...(u=(b=c.parameters)==null?void 0:b.docs)==null?void 0:u.source}}};var k,x,y;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    label: 'Checked checkbox',
    defaultChecked: true
  }
}`,...(y=(x=s.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var g,C,w;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'Indeterminate checkbox'
  }
}`,...(w=(C=o.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var f,v,B;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: 'Disabled checkbox',
    disabled: true
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('Disabled checkbox cannot be checked', async () => {
      const checkbox = canvas.getByRole('checkbox');
      await expect(checkbox).toBeDisabled();
    });
  }
}`,...(B=(v=n.parameters)==null?void 0:v.docs)==null?void 0:B.source}}};var E,I,D;r.parameters={...r.parameters,docs:{...(E=r.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => <div>
      <Checkbox {...args} />
      <p className="text-red text-body-xs mt-1">You must accept the terms to continue.</p>
    </div>,
  args: {
    label: 'I accept the terms'
  }
}`,...(D=(I=r.parameters)==null?void 0:I.docs)==null?void 0:D.source}}};var R,V,S;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    label: 'Toggle me'
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    await step('Checkbox starts unchecked', async () => {
      await expect(checkbox).not.toBeChecked();
    });
    await step('Click to check', async () => {
      await userEvent.click(checkbox);
      await expect(checkbox).toBeChecked();
    });
    await step('Click to uncheck', async () => {
      await userEvent.click(checkbox);
      await expect(checkbox).not.toBeChecked();
    });
  }
}`,...(S=(V=l.parameters)==null?void 0:V.docs)==null?void 0:S.source}}};const q=["Default","Checked","Indeterminate","Disabled","WithError","Interactive"];export{s as Checked,c as Default,n as Disabled,o as Indeterminate,l as Interactive,r as WithError,q as __namedExportsOrder,O as default};
