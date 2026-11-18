import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{c as j}from"./cn-DCADjnpI.js";function s({className:k,...y}){return e.jsx("div",{"aria-hidden":!0,className:j("dark:bg-dark-2 animate-pulse rounded-md bg-neutral-100",k),...y})}s.displayName="Skeleton";s.__docgenInfo={description:`Loading placeholder with pulse animation.
@public`,methods:[],displayName:"Skeleton"};const z={title:"Primitives/Skeleton",component:s,tags:["autodocs"],argTypes:{variant:{description:"Shape variant of the skeleton placeholder.",control:{type:"select"},options:["circle","rectangle","text"],table:{defaultValue:{summary:"text"}}},width:{description:"Custom width override (CSS value, e.g. `100px`, `50%`).",control:{type:"text"}},height:{description:"Custom height override (CSS value, e.g. `20px`).",control:{type:"text"}},className:{description:"Additional CSS classes.",control:!1},"aria-hidden":{description:"Hides the skeleton from assistive technology.",control:{type:"boolean"},table:{defaultValue:{summary:"true"}}}}},a={args:{className:"h-4 w-full"}},r={render:()=>e.jsx(s,{className:"size-12 rounded-full"})},t={args:{className:"h-32 w-full"}},l={render:()=>e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{className:"h-4 w-3/4"}),e.jsx(s,{className:"h-4 w-1/2"}),e.jsx(s,{className:"h-4 w-5/6"})]})},o={render:()=>e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(s,{className:"size-12 rounded-full"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx(s,{className:"h-4 w-48"}),e.jsx(s,{className:"h-3 w-32"})]})]})};var n,c,i;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    className: 'h-4 w-full'
  }
}`,...(i=(c=a.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var d,m,p;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <Skeleton className="size-12 rounded-full" />
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,h,N;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    className: 'h-32 w-full'
  }
}`,...(N=(h=t.parameters)==null?void 0:h.docs)==null?void 0:N.source}}};var g,x,S;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div className="space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
}`,...(S=(x=l.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var f,v,w;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
}`,...(w=(v=o.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};const _=["Default","Circle","Rectangle","Text","MultipleLines"];export{r as Circle,a as Default,o as MultipleLines,t as Rectangle,l as Text,_ as __namedExportsOrder,z as default};
