import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{within as S,userEvent as l}from"./index-DH-M5T-F.js";import{u as T}from"./index.esm-DvzC0cRp.js";import{I as b}from"./input-group-BUJmkq75.js";import{r as g}from"./index-BxXVWNx3.js";import{c as y}from"./cn-DCADjnpI.js";import{B}from"./button-DY2ysP3t.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Da1oAmHU.js";const u=g.forwardRef(({label:r,placeholder:s,required:t,disabled:a,active:n,className:i,icon:o,error:m,...I},F)=>{const p=g.useId(),x=`${p}-error`;return e.jsxs("div",{className:y(i),children:[e.jsx("label",{htmlFor:p,className:"text-body-sm text-dark mb-3 block font-medium dark:text-white",children:r}),e.jsxs("div",{className:"relative mt-3 [&_svg]:pointer-events-none [&_svg]:absolute [&_svg]:top-5.5 [&_svg]:left-5.5",children:[e.jsx("textarea",{ref:F,id:p,rows:6,placeholder:s,"aria-describedby":m?x:void 0,className:y("border-stroke text-dark focus:border-primary disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary w-full rounded-lg border-[1.5px] bg-transparent px-5.5 py-3 transition outline-none disabled:cursor-default dark:text-white",o&&"py-5 pr-5 pl-13",m&&"border-red focus:border-red"),required:t,disabled:a,"data-active":n||void 0,...I}),o]}),m&&e.jsx("p",{id:x,className:"text-body-xs text-red mt-1",children:m})]})});u.displayName="TextArea";u.__docgenInfo={description:`Textarea with label, icon slot, and error state.
@public`,methods:[],displayName:"TextArea"};function E(){var a,n,i;const{register:r,handleSubmit:s,formState:{errors:t}}=T();return e.jsxs("form",{onSubmit:s(o=>console.log(o)),className:"mx-auto max-w-lg space-y-6",noValidate:!0,children:[e.jsx("h2",{className:"text-dark text-xl font-bold dark:text-white",children:"Contact Form"}),e.jsx(b,{type:"text",label:"Full name",placeholder:"John Doe",error:(a=t.name)==null?void 0:a.message,...r("name",{required:"Name is required"})}),e.jsx(b,{type:"email",label:"Email address",placeholder:"john@example.com",error:(n=t.email)==null?void 0:n.message,...r("email",{required:"Email is required",pattern:{value:/^\S+@\S+$/i,message:"Invalid email"}})}),e.jsx(u,{label:"Message",placeholder:"Write your message...",error:(i=t.message)==null?void 0:i.message,...r("message",{required:"Message is required",minLength:{value:10,message:"At least 10 characters"}})}),e.jsx(B,{variant:"primary",label:"Send Message",type:"submit"})]})}const $={title:"Patterns/Form + Validation",tags:[]},d={render:()=>e.jsx(E,{})},c={render:()=>e.jsx(E,{}),play:async({canvasElement:r,step:s})=>{const t=S(r);await s("Submit with empty fields shows validation",async()=>{const a=t.getByRole("button",{name:/send message/i});await l.click(a)}),await s("Fill in name",async()=>{const a=t.getByLabelText(/full name/i);await l.type(a,"Jane Smith")}),await s("Fill in email",async()=>{const a=t.getByLabelText(/email address/i);await l.type(a,"jane@example.com")}),await s("Fill in message",async()=>{const a=t.getByLabelText(/message/i);await l.type(a,"This is a test message for the form.")})}};var h,f,v;d.parameters={...d.parameters,docs:{...(h=d.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <FormExample />
}`,...(v=(f=d.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var w,j,k;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <FormExample />,
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('Submit with empty fields shows validation', async () => {
      const submit = canvas.getByRole('button', {
        name: /send message/i
      });
      await userEvent.click(submit);
    });
    await step('Fill in name', async () => {
      const nameInput = canvas.getByLabelText(/full name/i);
      await userEvent.type(nameInput, 'Jane Smith');
    });
    await step('Fill in email', async () => {
      const emailInput = canvas.getByLabelText(/email address/i);
      await userEvent.type(emailInput, 'jane@example.com');
    });
    await step('Fill in message', async () => {
      const messageInput = canvas.getByLabelText(/message/i);
      await userEvent.type(messageInput, 'This is a test message for the form.');
    });
  }
}`,...(k=(j=c.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};const C=["Example","Interactive"];export{d as Example,c as Interactive,C as __namedExportsOrder,$ as default};
