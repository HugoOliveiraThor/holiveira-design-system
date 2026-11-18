import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{within as _,expect as d,userEvent as w}from"./index-DH-M5T-F.js";import{r as k}from"./index-BxXVWNx3.js";import{c as u}from"./cn-DCADjnpI.js";import{C as F}from"./check-8xR-Yow7.js";import{X as P}from"./x-0FJdkYUO.js";import"./_commonjsHelpers-CqkleIqs.js";import"./icon-wrapper-D5BXwZrf.js";const p=k.forwardRef(({checked:s,defaultChecked:t,onChange:n,background:a,withIcon:q,backgroundSize:h,label:m,name:g,className:z,...L},O)=>{const f=k.useId();return e.jsxs("label",{htmlFor:f,className:u("flex max-w-fit cursor-pointer items-center gap-2 select-none",z),children:[e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:"checkbox",role:"switch",ref:O,name:g,id:f,checked:s,defaultChecked:t,onChange:n,className:"peer sr-only","aria-label":m?void 0:g||"Toggle",...L}),e.jsx("div",{className:u("bg-gray-3 h-8 w-14 rounded-full dark:bg-[#5A616B]",{"h-5":h==="sm","dark:bg-primary bg-[#212B36]":a==="dark"})}),e.jsx("div",{className:u("shadow-switch-1 absolute top-1 left-1 flex size-6 items-center justify-center rounded-full bg-white transition peer-checked:right-1 peer-checked:translate-x-full peer-checked:[&_.check-icon]:block peer-checked:[&_.x-icon]:hidden",{"shadow-switch-2 -top-1 left-0 size-7":h==="sm","peer-checked:bg-primary peer-checked:dark:bg-white":a!=="dark"}),children:q&&e.jsxs(e.Fragment,{children:[e.jsx(F,{className:"check-icon dark:fill-dark hidden fill-white"}),e.jsx(P,{className:"x-icon"})]})})]}),m&&e.jsx("span",{className:"text-body-sm text-dark dark:text-white",children:m})]})});p.displayName="Switch";p.__docgenInfo={description:`Toggle switch with icon and background variants.
Supports controlled and uncontrolled usage.
@public`,methods:[],displayName:"Switch",props:{withIcon:{required:!1,tsType:{name:"boolean"},description:""},background:{required:!1,tsType:{name:"union",raw:"'dark' | 'light'",elements:[{name:"literal",value:"'dark'"},{name:"literal",value:"'light'"}]},description:""},backgroundSize:{required:!1,tsType:{name:"union",raw:"'sm' | 'default'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'default'"}]},description:""},label:{required:!1,tsType:{name:"string"},description:"Visible label rendered next to the switch."},className:{required:!1,tsType:{name:"string"},description:""}}};const Q={title:"Primitives/Switch",component:p,tags:["autodocs"],argTypes:{defaultChecked:{description:"Initial checked state (uncontrolled).",control:{type:"boolean"},table:{defaultValue:{summary:"false"}}},checked:{description:"Controlled checked state.",control:{type:"boolean"}},disabled:{description:"Prevents user interaction.",control:{type:"boolean"},table:{defaultValue:{summary:"false"}}},withIcon:{description:"Shows check/x icons inside the toggle.",control:{type:"boolean"},table:{defaultValue:{summary:"false"}}},background:{description:"Background color variant of the track.",control:{type:"select"},options:["dark","light"],table:{defaultValue:{summary:"dark"}}},backgroundSize:{description:"Size variant of the switch track.",control:{type:"select"},options:["sm","default"],table:{defaultValue:{summary:"default"}}},onChange:{description:"Callback fired when the switch is toggled. Receives `React.ChangeEvent<HTMLInputElement>`.",control:!1}}},c={args:{}},r={args:{defaultChecked:!0}},o={args:{disabled:!0},play:async({canvasElement:s,step:t})=>{const n=_(s);await t("Disabled switch cannot be toggled",async()=>{const a=n.getByRole("checkbox");await d(a).toBeDisabled()})}},i={render:()=>e.jsxs("label",{className:"flex items-center gap-3",children:[e.jsx(p,{}),e.jsx("span",{className:"text-body-sm font-medium",children:"Enable notifications"})]})},l={args:{defaultChecked:!1},play:async({canvasElement:s,step:t})=>{const a=_(s).getByRole("checkbox");await t("Switch starts off",async()=>{await d(a).not.toBeChecked()}),await t("Toggle on",async()=>{await w.click(a),await d(a).toBeChecked()}),await t("Toggle off",async()=>{await w.click(a),await d(a).not.toBeChecked()})}};var b,y,x;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {}
}`,...(x=(y=c.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var v,C,I;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    defaultChecked: true
  }
}`,...(I=(C=r.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var S,j,B;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('Disabled switch cannot be toggled', async () => {
      const toggle = canvas.getByRole('checkbox');
      await expect(toggle).toBeDisabled();
    });
  }
}`,...(B=(j=o.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};var E,N,T;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <label className="flex items-center gap-3">
      <Switch />
      <span className="text-body-sm font-medium">Enable notifications</span>
    </label>
}`,...(T=(N=i.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};var D,R,V;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    defaultChecked: false
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const switchInput = canvas.getByRole('checkbox');
    await step('Switch starts off', async () => {
      await expect(switchInput).not.toBeChecked();
    });
    await step('Toggle on', async () => {
      await userEvent.click(switchInput);
      await expect(switchInput).toBeChecked();
    });
    await step('Toggle off', async () => {
      await userEvent.click(switchInput);
      await expect(switchInput).not.toBeChecked();
    });
  }
}`,...(V=(R=l.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};const U=["Default","On","Disabled","WithLabel","Interactive"];export{c as Default,o as Disabled,l as Interactive,r as On,i as WithLabel,U as __namedExportsOrder,Q as default};
