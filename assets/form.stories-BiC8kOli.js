import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{within as L,expect as c,userEvent as C}from"./index-DH-M5T-F.js";import{F as T,u as N}from"./index.esm-DvzC0cRp.js";import{F as k}from"./field-UoxjF9Do.js";import{c as P}from"./cn-DCADjnpI.js";import{S as B}from"./submit-BsNRBXny.js";import"./index-BxXVWNx3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./label-Ce-X3b0j.js";import"./button-DY2ysP3t.js";import"./index-Da1oAmHU.js";const s=({className:r,onSubmit:a,...n})=>{const t=o=>{o.preventDefault(),a==null||a(o)};return e.jsx("form",{className:P("space-y-6",r),onSubmit:t,noValidate:!0,...n})};s.displayName="Form";s.__docgenInfo={description:"",methods:[],displayName:"Form",props:{onSubmit:{required:!1,tsType:{name:"signature",type:"function",raw:"(e: React.FormEvent<HTMLFormElement>) => void",signature:{arguments:[{type:{name:"ReactFormEvent",raw:"React.FormEvent<HTMLFormElement>",elements:[{name:"HTMLFormElement"}]},name:"e"}],return:{name:"void"}}},description:""}},composes:["FormHTMLAttributes"]};function H(r){return e.jsx(T,{children:e.jsx(r,{})})}function u({fieldName:r,fieldLabel:a,fieldPlaceholder:n,validation:t,submitLabel:o}){var p;const{register:V,handleSubmit:q,formState:{errors:R}}=N();return e.jsxs(s,{onSubmit:q(()=>{}),children:[e.jsx(k,{label:a,error:(p=R[r])==null?void 0:p.message,children:e.jsx("input",{...V(r,t),className:"border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none",placeholder:n})}),e.jsx(B,{children:o})]})}const K={title:"Forms/Form",component:s,tags:["autodocs"],decorators:[H],argTypes:{onSubmit:{description:"Callback fired when the form is submitted after validation.",control:!1},children:{description:"Content rendered inside the form element.",control:!1},className:{description:"Additional CSS classes.",control:!1}}},i={render:()=>e.jsx(u,{fieldName:"name",fieldLabel:"Name",fieldPlaceholder:"Your name",submitLabel:"Submit"})},l={render:()=>e.jsx(u,{fieldName:"email",fieldLabel:"Email",fieldPlaceholder:"john@example.com",validation:{required:"Email is required"},submitLabel:"Submit"})};function M(){const{register:r,handleSubmit:a}=N();return e.jsxs(s,{onSubmit:a(()=>{}),children:[e.jsx(k,{label:"Name",children:e.jsx("input",{...r("name"),className:"border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none",placeholder:"Your name"})}),e.jsx(B,{disabled:!0,children:e.jsxs("span",{className:"inline-flex items-center gap-2",children:[e.jsxs("svg",{className:"size-4 animate-spin",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"})]}),"Saving..."]})})]})}const m={render:()=>e.jsx(M,{}),play:async({canvasElement:r,step:a})=>{const n=L(r);await a("Submit button shows loading state",async()=>{const t=n.getByRole("button",{name:/saving/i});await c(t).toBeVisible(),await c(t).toBeDisabled()})}},d={render:()=>e.jsx(u,{fieldName:"username",fieldLabel:"Username",fieldPlaceholder:"your-username",validation:{required:"Username is required"},submitLabel:"Send"}),play:async({canvasElement:r,step:a})=>{const n=L(r);await a("Submit button is present",async()=>{const t=n.getByRole("button",{name:/send/i});await c(t).toBeVisible()}),await a("Click submit triggers validation",async()=>{const t=n.getByRole("button",{name:/send/i});await C.click(t)}),await a("Validation error is displayed",async()=>{const t=n.getByText(/username is required/i);await c(t).toBeVisible()})}};var b,f,y;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <FormStory fieldName="name" fieldLabel="Name" fieldPlaceholder="Your name" submitLabel="Submit" />
}`,...(y=(f=i.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var g,x,h;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <FormStory fieldName="email" fieldLabel="Email" fieldPlaceholder="john@example.com" validation={{
    required: 'Email is required'
  }} submitLabel="Submit" />
}`,...(h=(x=l.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var v,S,w;m.parameters={...m.parameters,docs:{...(v=m.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => <LoadingForm />,
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('Submit button shows loading state', async () => {
      const button = canvas.getByRole('button', {
        name: /saving/i
      });
      await expect(button).toBeVisible();
      await expect(button).toBeDisabled();
    });
  }
}`,...(w=(S=m.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var F,j,E;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <FormStory fieldName="username" fieldLabel="Username" fieldPlaceholder="your-username" validation={{
    required: 'Username is required'
  }} submitLabel="Send" />,
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('Submit button is present', async () => {
      const button = canvas.getByRole('button', {
        name: /send/i
      });
      await expect(button).toBeVisible();
    });
    await step('Click submit triggers validation', async () => {
      const button = canvas.getByRole('button', {
        name: /send/i
      });
      await userEvent.click(button);
    });
    await step('Validation error is displayed', async () => {
      const error = canvas.getByText(/username is required/i);
      await expect(error).toBeVisible();
    });
  }
}`,...(E=(j=d.parameters)==null?void 0:j.docs)==null?void 0:E.source}}};const Q=["FullIntegration","ValidationErrors","Loading","SubmitHandling"];export{i as FullIntegration,m as Loading,d as SubmitHandling,l as ValidationErrors,Q as __namedExportsOrder,K as default};
