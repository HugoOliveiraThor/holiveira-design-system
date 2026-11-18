import{j as r}from"./jsx-runtime-EKYJJIwR.js";import{F as a}from"./field-UoxjF9Do.js";import"./index-BxXVWNx3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cn-DCADjnpI.js";import"./label-Ce-X3b0j.js";const D={title:"Forms/Field",component:a,tags:["autodocs"],argTypes:{label:{description:"Label text displayed above the field.",control:"text",table:{defaultValue:{summary:"undefined"}}},description:{description:"Descriptive text displayed below the field.",control:"text",table:{defaultValue:{summary:"undefined"}}},error:{description:"Error message displayed when validation fails.",control:"text",table:{defaultValue:{summary:"undefined"}}},children:{description:"Content rendered inside the field container.",control:!1},className:{description:"Additional CSS classes.",control:!1}}},d={render:e=>r.jsx(a,{...e,children:r.jsx("input",{className:"border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none",placeholder:"Enter value..."})})},o={render:e=>r.jsx(a,{...e,children:r.jsx("input",{className:"border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none",placeholder:"Enter value..."})}),args:{label:"Full Name"}},l={render:e=>r.jsx(a,{...e,children:r.jsx("input",{className:"border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none",placeholder:"Enter value..."})}),args:{label:"Full Name",description:"Enter your first and last name."}},s={render:e=>r.jsx(a,{...e,children:r.jsx("input",{className:"border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none",defaultValue:"invalid"})}),args:{label:"Email",description:"Must be a valid email address.",error:"Please enter a valid email."}},t={render:e=>r.jsx(a,{...e,children:r.jsx("input",{className:"border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none",placeholder:"Enter value...",required:!0})}),args:{label:"Name *"}};var n,i,u;d.parameters={...d.parameters,docs:{...(n=d.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: args => <Field {...args}>
      <input className="border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none" placeholder="Enter value..." />
    </Field>
}`,...(u=(i=d.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};var p,c,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => <Field {...args}>
      <input className="border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none" placeholder="Enter value..." />
    </Field>,
  args: {
    label: 'Full Name'
  }
}`,...(m=(c=o.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var b,k,g;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: args => <Field {...args}>
      <input className="border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none" placeholder="Enter value..." />
    </Field>,
  args: {
    label: 'Full Name',
    description: 'Enter your first and last name.'
  }
}`,...(g=(k=l.parameters)==null?void 0:k.docs)==null?void 0:g.source}}};var f,x,y;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => <Field {...args}>
      <input className="border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none" defaultValue="invalid" />
    </Field>,
  args: {
    label: 'Email',
    description: 'Must be a valid email address.',
    error: 'Please enter a valid email.'
  }
}`,...(y=(x=s.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var h,F,v;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: args => <Field {...args}>
      <input className="border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none" placeholder="Enter value..." required />
    </Field>,
  args: {
    label: 'Name *'
  }
}`,...(v=(F=t.parameters)==null?void 0:F.docs)==null?void 0:v.source}}};const V=["Default","WithLabel","WithDescription","WithError","Required"];export{d as Default,t as Required,l as WithDescription,s as WithError,o as WithLabel,V as __namedExportsOrder,D as default};
