import{j as t}from"./jsx-runtime-EKYJJIwR.js";import{within as W,userEvent as r,expect as d}from"./index-DH-M5T-F.js";import{r as C}from"./index-BxXVWNx3.js";import{S as a}from"./sign-up-form-BivMI1bB.js";import{G as D}from"./google-C7nCSnBk.js";import"./_commonjsHelpers-CqkleIqs.js";import"./input-group-BUJmkq75.js";import"./cn-DCADjnpI.js";import"./eye-ibWDiNkp.js";import"./icon-wrapper-D5BXwZrf.js";import"./checkbox-DRoVVxxC.js";import"./check-8xR-Yow7.js";import"./x-0FJdkYUO.js";import"./button-DY2ysP3t.js";import"./index-Da1oAmHU.js";const G=[{provider:"google",label:"Sign up with Google",icon:t.jsx(D,{size:20})},{provider:"x",label:"Sign up with X"}];function J(o){const[e,s]=C.useState(!1);return t.jsx(a,{...o,submitting:e,onSubmit:()=>{s(!0),setTimeout(()=>s(!1),1200)}})}const te={title:"Layouts/SignUpForm",component:a,tags:["autodocs"],argTypes:{onSubmit:{control:!1},error:{control:"text"},socialProviders:{control:!1},termsHref:{control:"text"},privacyHref:{control:"text"},signinHref:{control:"text"}}},n={render:()=>t.jsx(a,{onSubmit:()=>{}})},i={render:()=>t.jsx(a,{onSubmit:()=>{},socialProviders:G})},c={render:()=>t.jsx(a,{onSubmit:()=>{},submitting:!0})},m={render:()=>t.jsx(a,{onSubmit:()=>{},error:"Email already exists"})},p={render:()=>t.jsx(a,{onSubmit:()=>{}}),play:async({canvasElement:o})=>{const e=W(o),s=e.getByLabelText(/^password/i);await d(s.type).toBe("password"),await r.click(e.getByRole("button",{name:/show password/i})),await d(e.getByLabelText(/^password/i).type).toBe("text")}},l={render:()=>t.jsx(a,{onSubmit:()=>{}}),play:async({canvasElement:o})=>{const e=W(o);await r.type(e.getByLabelText(/^first name/i),"Joao"),await r.type(e.getByLabelText(/^last name/i),"Silva"),await r.type(e.getByLabelText(/^email/i),"a@b.com"),await r.type(e.getByLabelText(/^password/i),"secret"),await r.click(e.getByRole("button",{name:/sign up/i})),await d(e.getByLabelText(/^email/i)).toHaveValue("a@b.com")}},u={render:()=>t.jsx(J,{socialProviders:G})};var g,b,S;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <SignUpForm onSubmit={() => {}} />
}`,...(S=(b=n.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var y,v,x;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <SignUpForm onSubmit={() => {}} socialProviders={socialProviders} />
}`,...(x=(v=i.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var w,B,E;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <SignUpForm onSubmit={() => {}} submitting />
}`,...(E=(B=c.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};var T,f,L;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <SignUpForm onSubmit={() => {}} error="Email already exists" />
}`,...(L=(f=m.parameters)==null?void 0:f.docs)==null?void 0:L.source}}};var h,j,P;p.parameters={...p.parameters,docs:{...(h=p.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <SignUpForm onSubmit={() => {}} />,
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
}`,...(P=(j=p.parameters)==null?void 0:j.docs)==null?void 0:P.source}}};var U,F,H;l.parameters={...l.parameters,docs:{...(U=l.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <SignUpForm onSubmit={() => {}} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/^first name/i), 'Joao');
    await userEvent.type(canvas.getByLabelText(/^last name/i), 'Silva');
    await userEvent.type(canvas.getByLabelText(/^email/i), 'a@b.com');
    await userEvent.type(canvas.getByLabelText(/^password/i), 'secret');
    await userEvent.click(canvas.getByRole('button', {
      name: /sign up/i
    }));
    await expect(canvas.getByLabelText(/^email/i)).toHaveValue('a@b.com');
  }
}`,...(H=(F=l.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var I,R,k;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <ControlledSignUp socialProviders={socialProviders} />
}`,...(k=(R=u.parameters)==null?void 0:R.docs)==null?void 0:k.source}}};const ae=["Default","WithSocialProviders","Submitting","WithError","TogglePassword","Submit","Interactive"];export{n as Default,u as Interactive,l as Submit,c as Submitting,p as TogglePassword,m as WithError,i as WithSocialProviders,ae as __namedExportsOrder,te as default};
