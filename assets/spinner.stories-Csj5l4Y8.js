import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{B as n}from"./button-CTnCkG2H.js";import{r as w}from"./index-BxXVWNx3.js";import{c as C}from"./cn-DCADjnpI.js";import{c as j}from"./index-Da1oAmHU.js";import"./_commonjsHelpers-CqkleIqs.js";const z=j("animate-spin",{variants:{size:{xs:"h-5 w-5",sm:"h-7 w-7",md:"h-9 w-9",lg:"h-10 w-10",xl:"h-12 w-12"},color:{primary:"text-primary",white:"text-white",gray:"text-gray-400"}},defaultVariants:{size:"md",color:"primary"}}),a=w.forwardRef(({size:r,color:s,className:y,...f},v)=>e.jsx("div",{ref:v,role:"status","aria-label":"Loading",className:C(z({size:r,color:s}),y),...f,children:e.jsxs("svg",{viewBox:"0 0 20 20",fill:"none",className:"h-full w-full",children:[e.jsx("circle",{cx:"10",cy:"10",r:"8.5",stroke:"currentColor",strokeWidth:"3",opacity:"0.25",className:"text-gray-200 dark:text-gray-800"}),e.jsx("path",{d:"M18.5172 10C19.3361 10 20.0113 9.33252 19.8903 8.52257C19.6474 6.89692 19.0062 5.34812 18.014 4.01868C16.7246 2.29109 14.9114 1.02642 12.8448 0.413166C10.7781 -0.200084 8.5686 -0.129079 6.54558 0.615599C4.9888 1.18865 3.60659 2.13704 2.51635 3.36711C1.97316 3.97997 2.17495 4.90767 2.86134 5.35436C3.54773 5.80104 4.45707 5.59214 5.03749 5.01442C5.75143 4.3038 6.61392 3.7506 7.57003 3.39866C8.9931 2.87482 10.5473 2.82488 12.0011 3.25626C13.4549 3.68764 14.7303 4.57726 15.6373 5.79251C16.2467 6.609 16.6679 7.5431 16.8787 8.52811C17.05 9.32892 17.6983 10 18.5172 10Z",stroke:"currentColor",strokeWidth:"3",strokeLinecap:"round"})]})}));a.displayName="Spinner";a.__docgenInfo={description:`Circular arc spinner with size and color variants.
@public`,methods:[],displayName:"Spinner"};const V={title:"Primitives/Spinner",component:a,tags:["autodocs"],argTypes:{size:{description:"Spinner size.",control:{type:"select"},options:["xs","sm","md","lg","xl"],table:{defaultValue:{summary:"md"}}},color:{description:"Arc color.",control:{type:"select"},options:["primary","white","gray"],table:{defaultValue:{summary:"primary"}}}}},t={render:r=>e.jsx("div",{className:"flex items-center gap-4",children:["xs","sm","md","lg","xl"].map(s=>e.jsx(a,{...r,size:s},s))})},i={render:r=>e.jsx("div",{className:"flex items-center gap-4",children:["primary","white","gray"].map(s=>e.jsx("div",{className:s==="white"?"bg-primary rounded-lg p-4":"",children:e.jsx(a,{...r,color:s})},s))})},o={render:r=>e.jsxs("div",{className:"flex items-center gap-5",children:[e.jsxs(n,{children:[e.jsx(a,{...r,color:"white",size:"xs"}),"Loading..."]}),e.jsxs(n,{variant:"outline",children:[e.jsx(a,{...r,size:"xs"}),"Loading..."]})]})};var c,l,m;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: args => <div className="flex items-center gap-4">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => <Spinner key={size} {...args} size={size} />)}
    </div>
}`,...(m=(l=t.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var d,p,x;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: args => <div className="flex items-center gap-4">
      {(['primary', 'white', 'gray'] as const).map(color => <div key={color} className={color === 'white' ? 'bg-primary rounded-lg p-4' : ''}>
          <Spinner {...args} color={color} />
        </div>)}
    </div>
}`,...(x=(p=i.parameters)==null?void 0:p.docs)==null?void 0:x.source}}};var g,u,h;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <div className="flex items-center gap-5">
      <Button>
        <Spinner {...args} color="white" size="xs" />
        Loading...
      </Button>
      <Button variant="outline">
        <Spinner {...args} size="xs" />
        Loading...
      </Button>
    </div>
}`,...(h=(u=o.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};const W=["Sizes","Colors","WithButton"];export{i as Colors,t as Sizes,o as WithButton,W as __namedExportsOrder,V as default};
