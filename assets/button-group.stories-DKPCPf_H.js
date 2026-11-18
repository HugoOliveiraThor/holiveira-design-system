import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{r as n}from"./index-BxXVWNx3.js";import{c as s}from"./cn-DCADjnpI.js";import{B as t}from"./button-DY2ysP3t.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Da1oAmHU.js";const q={primary:{active:"bg-primary text-white ring-1 ring-inset ring-primary hover:bg-primary/90",inactive:"bg-transparent text-primary ring-1 ring-inset ring-primary hover:bg-primary hover:text-white"},outline:{active:"bg-transparent text-gray-800 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:bg-white/[0.03] dark:text-gray-200 dark:ring-gray-700 dark:hover:bg-white/[0.03]",inactive:"bg-transparent text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03]"}},L={sm:"px-4 py-3 text-sm",md:"px-5 py-3.5 text-sm"},a=({variant:r="primary",size:k="md",orientation:m="horizontal",className:S,children:d,...E})=>{const N=n.Children.count(d),O=s("shadow-theme-xs inline-flex items-center",m==="vertical"&&"flex-col items-stretch",S);return e.jsx("div",{role:"group",className:O,...E,children:n.Children.map(d,(c,g)=>{if(!n.isValidElement(c))return c;const o=g===0,x=g===N-1,I=o?"active":"inactive",P=q[r][I],_=m==="horizontal"?s("rounded-none",o&&"rounded-l-lg",!o&&"-ml-px",x&&"rounded-r-lg"):s("rounded-none",o&&"rounded-t-lg",!o&&"-mt-px",x&&"rounded-b-lg"),y=c;return n.cloneElement(y,{className:s("inline-flex items-center justify-center gap-2 font-medium transition disabled:cursor-not-allowed disabled:opacity-50",L[k],P,_,y.props.className)})})})};a.displayName="ButtonGroup";a.__docgenInfo={description:"",methods:[],displayName:"ButtonGroup",props:{variant:{required:!1,tsType:{name:"union",raw:"'primary' | 'outline'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'outline'"}]},description:"",defaultValue:{value:"'primary'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"keyof typeof sizeClasses",elements:[{name:"literal",value:"sm"},{name:"literal",value:"md"}]},description:"",defaultValue:{value:"'md'",computed:!1}},orientation:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:"",defaultValue:{value:"'horizontal'",computed:!1}}},composes:["HTMLAttributes"]};const U={title:"UI/ButtonGroup",component:a,tags:["autodocs"],argTypes:{variant:{description:"Visual style propagated to all child buttons.",control:{type:"select"},options:["primary","outline"],table:{defaultValue:{summary:"primary"}}},size:{description:"Size propagated to all child buttons.",control:{type:"select"},options:["sm","md"],table:{defaultValue:{summary:"md"}}},orientation:{description:"Group layout direction.",control:{type:"select"},options:["horizontal","vertical"],table:{defaultValue:{summary:"horizontal"}}}}},i={args:{variant:"primary","aria-label":"Primary group"},render:r=>e.jsxs(a,{...r,children:[e.jsx(t,{label:"Button Text"}),e.jsx(t,{label:"Button Text"}),e.jsx(t,{label:"Button Text"})]})},l={args:{variant:"outline","aria-label":"Outline group"},render:r=>e.jsxs(a,{...r,children:[e.jsx(t,{label:"Button Text"}),e.jsx(t,{label:"Button Text"}),e.jsx(t,{label:"Button Text"})]})},u={args:{orientation:"vertical","aria-label":"Vertical group"},render:r=>e.jsxs(a,{...r,children:[e.jsx(t,{label:"Button Text"}),e.jsx(t,{label:"Button Text"}),e.jsx(t,{label:"Button Text"})]})},p={args:{variant:"primary","aria-label":"Group with icons"},render:r=>e.jsxs(a,{...r,children:[e.jsx(t,{label:"Save",icon:e.jsx("span",{children:"✓"})}),e.jsx(t,{label:"Cancel",icon:e.jsx("span",{children:"✕"})})]})};var b,B,v;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    'aria-label': 'Primary group'
  },
  render: args => <ButtonGroup {...args}>
      <Button label="Button Text" />
      <Button label="Button Text" />
      <Button label="Button Text" />
    </ButtonGroup>
}`,...(v=(B=i.parameters)==null?void 0:B.docs)==null?void 0:v.source}}};var h,f,T;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    variant: 'outline',
    'aria-label': 'Outline group'
  },
  render: args => <ButtonGroup {...args}>
      <Button label="Button Text" />
      <Button label="Button Text" />
      <Button label="Button Text" />
    </ButtonGroup>
}`,...(T=(f=l.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var j,G,V;u.parameters={...u.parameters,docs:{...(j=u.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    orientation: 'vertical',
    'aria-label': 'Vertical group'
  },
  render: args => <ButtonGroup {...args}>
      <Button label="Button Text" />
      <Button label="Button Text" />
      <Button label="Button Text" />
    </ButtonGroup>
}`,...(V=(G=u.parameters)==null?void 0:G.docs)==null?void 0:V.source}}};var w,z,C;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    'aria-label': 'Group with icons'
  },
  render: args => <ButtonGroup {...args}>
      <Button label="Save" icon={<span>&#10003;</span>} />
      <Button label="Cancel" icon={<span>&#10005;</span>} />
    </ButtonGroup>
}`,...(C=(z=p.parameters)==null?void 0:z.docs)==null?void 0:C.source}}};const D=["Primary","Outline","Vertical","WithIcons"];export{l as Outline,i as Primary,u as Vertical,p as WithIcons,D as __namedExportsOrder,U as default};
