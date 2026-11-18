import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{within as F,userEvent as h,expect as I}from"./index-DH-M5T-F.js";import{r as H}from"./index-BxXVWNx3.js";import{T as t}from"./two-step-verification-form-CVsZuZfk.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cn-DCADjnpI.js";import"./button-DY2ysP3t.js";import"./index-Da1oAmHU.js";function R(c){const[m,r]=H.useState(!1);return e.jsx(t,{...c,submitting:m,onSubmit:()=>{r(!0),setTimeout(()=>r(!1),1200)}})}const q={title:"Layouts/TwoStepVerificationForm",component:t,tags:["autodocs"],argTypes:{onSubmit:{control:!1},error:{control:"text"},resendHref:{control:"text"}}},o={render:()=>e.jsx(t,{onSubmit:()=>{}})},n={render:()=>e.jsx(t,{onSubmit:()=>{},submitting:!0})},s={render:()=>e.jsx(t,{onSubmit:()=>{},error:"Invalid code"})},a={render:()=>e.jsx(t,{onSubmit:()=>{}}),play:async({canvasElement:c})=>{const r=F(c).getAllByRole("textbox");for(const[j,C]of["1","2","3","4","5","6"].entries())await h.type(r[j],C);await I(r[5]).toHaveValue("6")}},i={render:()=>e.jsx(R,{})};var p,u,d;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <TwoStepVerificationForm onSubmit={() => {}} />
}`,...(d=(u=o.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var l,S,f;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <TwoStepVerificationForm onSubmit={() => {}} submitting />
}`,...(f=(S=n.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var x,b,g;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <TwoStepVerificationForm onSubmit={() => {}} error="Invalid code" />
}`,...(g=(b=s.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var v,w,y;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <TwoStepVerificationForm onSubmit={() => {}} />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole('textbox');
    for (const [i, digit] of ['1', '2', '3', '4', '5', '6'].entries()) {
      await userEvent.type(inputs[i], digit);
    }
    await expect(inputs[5]).toHaveValue('6');
  }
}`,...(y=(w=a.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var E,V,T;i.parameters={...i.parameters,docs:{...(E=i.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <ControlledVerification />
}`,...(T=(V=i.parameters)==null?void 0:V.docs)==null?void 0:T.source}}};const z=["Default","Submitting","WithError","CompleteCode","Interactive"];export{a as CompleteCode,o as Default,i as Interactive,n as Submitting,s as WithError,z as __namedExportsOrder,q as default};
