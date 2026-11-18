import{j as f}from"./jsx-runtime-EKYJJIwR.js";import{within as da,expect as S,userEvent as ua}from"./index-DH-M5T-F.js";import{B as ba}from"./button-CTnCkG2H.js";import"./index-BxXVWNx3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cn-DCADjnpI.js";import"./index-Da1oAmHU.js";const wa={title:"Primitives/Button",component:ba,tags:["autodocs"],args:{label:"Button"},argTypes:{variant:{description:"Visual style of the button.",control:{type:"select"},options:["primary","green","dark","outlinePrimary","outlineGreen","outline"],table:{defaultValue:{summary:"primary"}}},size:{description:"Predefined size of the button.",control:{type:"select"},options:["sm","md"],table:{defaultValue:{summary:"md"}}},shape:{description:"Shape modifier for the button corners.",control:{type:"select"},options:["default","rounded"],table:{defaultValue:{summary:"default"}}},disabled:{description:"Prevents user interaction. Sets `aria-disabled`.",control:{type:"boolean"},table:{defaultValue:{summary:"false"}}},label:{description:"Text content displayed inside the button.",control:{type:"text"},table:{defaultValue:{summary:"undefined"}}},icon:{description:"Optional icon element rendered before the label.",control:!1},onClick:{description:"Callback fired when the button is clicked.",control:!1}}},r={args:{variant:"primary",label:"Primary"}},n={args:{variant:"green",label:"Green"}},t={args:{variant:"dark",label:"Dark"}},s={args:{variant:"outlinePrimary",label:"Outline Primary"}},i={args:{variant:"outlineGreen",label:"Outline Green"}},o={args:{variant:"outline",label:"Outline"}},l={args:{variant:"primary",shape:"rounded",label:"Pill"}},c={args:{variant:"primary",size:"md",label:"Medium"}},m={args:{variant:"primary",size:"sm",label:"Small"}},p={args:{variant:"primary",size:"md",label:"Button Text"}},d={args:{variant:"primary",label:"Settings",icon:f.jsx("span",{children:"⚙"})}},u={args:{variant:"primary",label:"",icon:f.jsx("span",{children:"⚙"})}},b={args:{variant:"primary",label:"Loading",disabled:!0,icon:f.jsx("span",{className:"animate-spin",children:"◠"})}},y={args:{variant:"primary",label:"Disabled",disabled:!0},play:async({canvasElement:v,step:e})=>{const k=da(v);await e("Disabled button cannot be clicked",async()=>{const a=k.getByRole("button",{name:/disabled/i});await S(a).toBeDisabled()})}},g={args:{variant:"primary",label:"Click me"},play:async({canvasElement:v,step:e})=>{const a=da(v).getByRole("button",{name:/click me/i});await e("Button is visible and enabled",async()=>{await S(a).toBeVisible(),await S(a).not.toBeDisabled()}),await e("Click button",async()=>{await ua.click(a)})}};var h,w,B;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    label: 'Primary'
  }
}`,...(B=(w=r.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};var P,x,O;n.parameters={...n.parameters,docs:{...(P=n.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    variant: 'green',
    label: 'Green'
  }
}`,...(O=(x=n.parameters)==null?void 0:x.docs)==null?void 0:O.source}}};var D,G,E;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    variant: 'dark',
    label: 'Dark'
  }
}`,...(E=(G=t.parameters)==null?void 0:G.docs)==null?void 0:E.source}}};var z,V,C;s.parameters={...s.parameters,docs:{...(z=s.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    variant: 'outlinePrimary',
    label: 'Outline Primary'
  }
}`,...(C=(V=s.parameters)==null?void 0:V.docs)==null?void 0:C.source}}};var I,T,j;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    variant: 'outlineGreen',
    label: 'Outline Green'
  }
}`,...(j=(T=i.parameters)==null?void 0:T.docs)==null?void 0:j.source}}};var R,L,M;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    variant: 'outline',
    label: 'Outline'
  }
}`,...(M=(L=o.parameters)==null?void 0:L.docs)==null?void 0:M.source}}};var A,N,W;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    shape: 'rounded',
    label: 'Pill'
  }
}`,...(W=(N=l.parameters)==null?void 0:N.docs)==null?void 0:W.source}}};var _,q,F;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Medium'
  }
}`,...(F=(q=c.parameters)==null?void 0:q.docs)==null?void 0:F.source}}};var H,J,K;m.parameters={...m.parameters,docs:{...(H=m.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'sm',
    label: 'Small'
  }
}`,...(K=(J=m.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,U,X;p.parameters={...p.parameters,docs:{...(Q=p.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Button Text'
  }
}`,...(X=(U=p.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var Y,Z,$;d.parameters={...d.parameters,docs:{...(Y=d.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    label: 'Settings',
    icon: <span>&#9881;</span>
  }
}`,...($=(Z=d.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var aa,ea,ra;u.parameters={...u.parameters,docs:{...(aa=u.parameters)==null?void 0:aa.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    label: '',
    icon: <span>&#9881;</span>
  }
}`,...(ra=(ea=u.parameters)==null?void 0:ea.docs)==null?void 0:ra.source}}};var na,ta,sa;b.parameters={...b.parameters,docs:{...(na=b.parameters)==null?void 0:na.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    label: 'Loading',
    disabled: true,
    icon: <span className="animate-spin">&#9696;</span>
  }
}`,...(sa=(ta=b.parameters)==null?void 0:ta.docs)==null?void 0:sa.source}}};var ia,oa,la;y.parameters={...y.parameters,docs:{...(ia=y.parameters)==null?void 0:ia.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    label: 'Disabled',
    disabled: true
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('Disabled button cannot be clicked', async () => {
      const button = canvas.getByRole('button', {
        name: /disabled/i
      });
      await expect(button).toBeDisabled();
    });
  }
}`,...(la=(oa=y.parameters)==null?void 0:oa.docs)==null?void 0:la.source}}};var ca,ma,pa;g.parameters={...g.parameters,docs:{...(ca=g.parameters)==null?void 0:ca.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    label: 'Click me'
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: /click me/i
    });
    await step('Button is visible and enabled', async () => {
      await expect(button).toBeVisible();
      await expect(button).not.toBeDisabled();
    });
    await step('Click button', async () => {
      await userEvent.click(button);
    });
  }
}`,...(pa=(ma=g.parameters)==null?void 0:ma.docs)==null?void 0:pa.source}}};const Ba=["Primary","Green","Dark","OutlinePrimary","OutlineGreen","Outline","Pill","Md","Sm","TailAdminStyle","WithIcon","IconOnly","Loading","Disabled","Interactive"];export{t as Dark,y as Disabled,n as Green,u as IconOnly,g as Interactive,b as Loading,c as Md,o as Outline,i as OutlineGreen,s as OutlinePrimary,l as Pill,r as Primary,m as Sm,p as TailAdminStyle,d as WithIcon,Ba as __namedExportsOrder,wa as default};
