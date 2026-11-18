import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{r as L}from"./index-BxXVWNx3.js";import{c}from"./cn-DCADjnpI.js";import{c as M}from"./index-Da1oAmHU.js";import"./_commonjsHelpers-CqkleIqs.js";const _=M("relative w-full bg-gray-200 dark:bg-gray-800",{variants:{size:{sm:"h-2",md:"h-3",lg:"h-4",xl:"h-5"},shape:{default:"rounded-sm",rounded:"rounded-full"}},defaultVariants:{size:"md",shape:"rounded"}}),a=L.forwardRef(({value:s,size:r,shape:u,label:d="none",className:z,...S},V)=>{const l=Math.min(100,Math.max(0,s)),m=e.jsx("div",{ref:V,role:"progressbar","aria-valuenow":l,"aria-valuemin":0,"aria-valuemax":100,className:c(_({size:r,shape:u}),z),...S,children:e.jsx("div",{className:c("bg-primary absolute left-0 h-full",u==="rounded"?"rounded-full":"rounded-sm",d==="inside"&&"flex items-center justify-center"),style:{width:`${l}%`},children:d==="inside"&&e.jsxs("span",{className:"text-[10px] leading-tight font-medium text-white",children:[l,"%"]})})});return d==="outside"?e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-full sm:max-w-[281px]",children:m}),e.jsxs("span",{className:"text-sm font-medium text-gray-700 dark:text-gray-400",children:[l,"%"]})]}):m});a.displayName="Progress";a.__docgenInfo={description:`Horizontal progress bar with value, size, shape, and optional percentage label.
@public`,methods:[],displayName:"Progress",props:{value:{required:!0,tsType:{name:"number"},description:""},label:{required:!1,tsType:{name:"union",raw:"'none' | 'outside' | 'inside'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'outside'"},{name:"literal",value:"'inside'"}]},description:"",defaultValue:{value:"'none'",computed:!1}}}};const q={title:"Primitives/Progress",component:a,tags:["autodocs"],args:{value:55},argTypes:{value:{description:"Progress value 0-100.",control:{type:"number"}},size:{description:"Bar height.",control:{type:"select"},options:["sm","md","lg","xl"],table:{defaultValue:{summary:"md"}}},shape:{description:"Border shape.",control:{type:"select"},options:["default","rounded"],table:{defaultValue:{summary:"rounded"}}},label:{description:"Percentage label placement.",control:{type:"select"},options:["none","outside","inside"],table:{defaultValue:{summary:"none"}}}}},t={render:s=>e.jsxs("div",{className:"w-full max-w-[320px] space-y-5",children:[e.jsx(a,{...s,value:55}),e.jsx(a,{...s,value:85}),e.jsx(a,{...s,value:35})]})},i={render:s=>e.jsx("div",{className:"w-full max-w-[320px] space-y-4",children:["sm","md","lg","xl"].map(r=>e.jsx(a,{...s,size:r},r))})},n={render:s=>e.jsxs("div",{className:"w-full max-w-[320px] space-y-5",children:[e.jsx(a,{...s,value:40,label:"outside"}),e.jsx(a,{...s,value:70,label:"outside"}),e.jsx(a,{...s,value:30,label:"outside"})]})},o={render:s=>e.jsxs("div",{className:"w-full max-w-[320px] space-y-5",children:[e.jsx(a,{...s,value:40,label:"inside"}),e.jsx(a,{...s,value:70,label:"inside"}),e.jsx(a,{...s,value:30,label:"inside"})]})};var p,x,g;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => <div className="w-full max-w-[320px] space-y-5">
      <Progress {...args} value={55} />
      <Progress {...args} value={85} />
      <Progress {...args} value={35} />
    </div>
}`,...(g=(x=t.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var v,f,b;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => <div className="w-full max-w-[320px] space-y-4">
      {(['sm', 'md', 'lg', 'xl'] as const).map(size => <Progress key={size} {...args} size={size} />)}
    </div>
}`,...(b=(f=i.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var h,y,w;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: args => <div className="w-full max-w-[320px] space-y-5">
      <Progress {...args} value={40} label="outside" />
      <Progress {...args} value={70} label="outside" />
      <Progress {...args} value={30} label="outside" />
    </div>
}`,...(w=(y=n.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var j,P,N;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: args => <div className="w-full max-w-[320px] space-y-5">
      <Progress {...args} value={40} label="inside" />
      <Progress {...args} value={70} label="inside" />
      <Progress {...args} value={30} label="inside" />
    </div>
}`,...(N=(P=o.parameters)==null?void 0:P.docs)==null?void 0:N.source}}};const B=["Default","MultipleSizes","OutsideLabel","InsideLabel"];export{t as Default,o as InsideLabel,i as MultipleSizes,n as OutsideLabel,B as __namedExportsOrder,q as default};
