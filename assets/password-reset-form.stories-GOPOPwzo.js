import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{within as B,userEvent as u,expect as F}from"./index-DH-M5T-F.js";import{r as T}from"./index-BxXVWNx3.js";import{P as t}from"./password-reset-form-2WEw2tof.js";import"./_commonjsHelpers-CqkleIqs.js";import"./input-group-BUJmkq75.js";import"./cn-DCADjnpI.js";import"./button-DY2ysP3t.js";import"./index-Da1oAmHU.js";function L(m){const[r,c]=T.useState(!1);return e.jsx(t,{...m,submitting:r,onSubmit:()=>{c(!0),setTimeout(()=>c(!1),1200)}})}const O={title:"Layouts/PasswordResetForm",component:t,tags:["autodocs"],argTypes:{onSubmit:{control:!1},error:{control:"text"},signinHref:{control:"text"}}},a={render:()=>e.jsx(t,{onSubmit:()=>{}})},s={render:()=>e.jsx(t,{onSubmit:()=>{},submitting:!0})},o={render:()=>e.jsx(t,{onSubmit:()=>{},error:"Email not found"})},n={render:()=>e.jsx(t,{onSubmit:()=>{}}),play:async({canvasElement:m})=>{const r=B(m);await u.type(r.getByLabelText(/^email/i),"a@b.com"),await u.click(r.getByRole("button",{name:/send reset link/i})),await F(r.getByLabelText(/^email/i)).toHaveValue("a@b.com")}},i={render:()=>e.jsx(L,{})};var p,d,l;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <PasswordResetForm onSubmit={() => {}} />
}`,...(l=(d=a.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var b,S,g;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <PasswordResetForm onSubmit={() => {}} submitting />
}`,...(g=(S=s.parameters)==null?void 0:S.docs)==null?void 0:g.source}}};var x,v,f;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <PasswordResetForm onSubmit={() => {}} error="Email not found" />
}`,...(f=(v=o.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var w,y,E;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <PasswordResetForm onSubmit={() => {}} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/^email/i), 'a@b.com');
    await userEvent.click(canvas.getByRole('button', {
      name: /send reset link/i
    }));
    await expect(canvas.getByLabelText(/^email/i)).toHaveValue('a@b.com');
  }
}`,...(E=(y=n.parameters)==null?void 0:y.docs)==null?void 0:E.source}}};var R,j,P;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <ControlledReset />
}`,...(P=(j=i.parameters)==null?void 0:j.docs)==null?void 0:P.source}}};const q=["Default","Submitting","WithError","Submit","Interactive"];export{a as Default,i as Interactive,n as Submit,s as Submitting,o as WithError,q as __namedExportsOrder,O as default};
