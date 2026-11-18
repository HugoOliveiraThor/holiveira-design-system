import{j as t}from"./jsx-runtime-EKYJJIwR.js";import{within as G,userEvent as u,expect as d}from"./index-DH-M5T-F.js";import{r as D}from"./index-BxXVWNx3.js";import{S as r}from"./sign-in-form-DEFyrY3o.js";import{G as M}from"./google-C7nCSnBk.js";import"./_commonjsHelpers-CqkleIqs.js";import"./input-group-BUJmkq75.js";import"./cn-DCADjnpI.js";import"./eye-ibWDiNkp.js";import"./icon-wrapper-D5BXwZrf.js";import"./checkbox-DRoVVxxC.js";import"./check-8xR-Yow7.js";import"./x-0FJdkYUO.js";import"./button-DY2ysP3t.js";import"./index-Da1oAmHU.js";const C=[{provider:"google",label:"Sign in with Google",icon:t.jsx(M,{size:20})},{provider:"x",label:"Sign in with X"}];function V(a){const[e,o]=D.useState(!1);return t.jsx(r,{...a,submitting:e,onSubmit:()=>{o(!0),setTimeout(()=>o(!1),1200)}})}const te={title:"Layouts/SignInForm",component:r,tags:["autodocs"],argTypes:{onSubmit:{control:!1},error:{control:"text"},socialProviders:{control:!1},forgotHref:{control:"text"},signupHref:{control:"text"}}},s={render:()=>t.jsx(r,{onSubmit:()=>{}})},n={render:()=>t.jsx(r,{onSubmit:()=>{},socialProviders:C})},i={render:()=>t.jsx(r,{onSubmit:()=>{},submitting:!0})},c={render:()=>t.jsx(r,{onSubmit:()=>{},error:"Invalid email or password"})},m={render:()=>t.jsx(r,{onSubmit:()=>{}}),play:async({canvasElement:a})=>{const e=G(a),o=e.getByLabelText(/^password/i);await d(o.type).toBe("password"),await u.click(e.getByRole("button",{name:/show password/i})),await d(e.getByLabelText(/^password/i).type).toBe("text")}},p={render:()=>t.jsx(r,{onSubmit:()=>{}}),play:async({canvasElement:a})=>{const e=G(a);await u.type(e.getByLabelText(/^email/i),"a@b.com"),await u.type(e.getByLabelText(/^password/i),"secret"),await u.click(e.getByRole("button",{name:/sign in/i})),await d(e.getByLabelText(/^email/i)).toHaveValue("a@b.com")}},l={render:()=>t.jsx(V,{socialProviders:C})};var g,b,S;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <SignInForm onSubmit={() => {}} />
}`,...(S=(b=s.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var v,w,x;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <SignInForm onSubmit={() => {}} socialProviders={socialProviders} />
}`,...(x=(w=n.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};var y,B,E;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <SignInForm onSubmit={() => {}} submitting />
}`,...(E=(B=i.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};var I,f,T;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <SignInForm onSubmit={() => {}} error="Invalid email or password" />
}`,...(T=(f=c.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var L,h,j;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <SignInForm onSubmit={() => {}} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/^password/i) as HTMLInputElement;
    await expect(input.type).toBe('password');
    await userEvent.click(canvas.getByRole('button', {
      name: /show password/i
    }));
    await expect((canvas.getByLabelText(/^password/i) as HTMLInputElement).type).toBe('text');
  }
}`,...(j=(h=m.parameters)==null?void 0:h.docs)==null?void 0:j.source}}};var P,F,H;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <SignInForm onSubmit={() => {}} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/^email/i), 'a@b.com');
    await userEvent.type(canvas.getByLabelText(/^password/i), 'secret');
    await userEvent.click(canvas.getByRole('button', {
      name: /sign in/i
    }));
    await expect(canvas.getByLabelText(/^email/i)).toHaveValue('a@b.com');
  }
}`,...(H=(F=p.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var R,k,W;l.parameters={...l.parameters,docs:{...(R=l.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <ControlledSignIn socialProviders={socialProviders} />
}`,...(W=(k=l.parameters)==null?void 0:k.docs)==null?void 0:W.source}}};const re=["Default","WithSocialProviders","Submitting","WithError","TogglePassword","Submit","Interactive"];export{s as Default,l as Interactive,p as Submit,i as Submitting,m as TogglePassword,c as WithError,n as WithSocialProviders,re as __namedExportsOrder,te as default};
