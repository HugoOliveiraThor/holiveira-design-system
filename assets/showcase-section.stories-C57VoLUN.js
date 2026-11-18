import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{c as f}from"./cn-DCADjnpI.js";const o=({title:r,children:x,className:N,...S})=>{const i=r.toLowerCase().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"");return e.jsx("section",{"aria-labelledby":i,children:e.jsxs("div",{className:f("shadow-1 dark:bg-gray-dark dark:shadow-card rounded-[10px] bg-white",N),...S,children:[e.jsx("h2",{id:i,className:"border-stroke text-dark dark:border-dark-3 border-b px-4 py-4 font-medium sm:px-6 xl:px-7.5 dark:text-white",children:r}),e.jsx("div",{className:"p-4 sm:p-6 xl:p-10",children:x})]})})};o.displayName="ShowcaseSection";o.__docgenInfo={description:"",methods:[],displayName:"ShowcaseSection",props:{title:{required:!0,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""}},composes:["HTMLAttributes"]};const b={title:"UI/ShowcaseSection",component:o,tags:["autodocs"],args:{title:"Section Title"},argTypes:{title:{description:"Section heading text.",control:{type:"text"}},children:{description:"Content inside the section."},className:{description:"Additional CSS classes.",control:!1}}},s={args:{title:"Features Overview",children:"Section content goes here."}},t={render:r=>e.jsx(o,{...r,children:e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"rounded-lg border p-4",children:[e.jsx("h3",{className:"font-medium",children:"Feature A"}),e.jsx("p",{className:"text-sm text-neutral-500",children:"Description of feature A."})]}),e.jsxs("div",{className:"rounded-lg border p-4",children:[e.jsx("h3",{className:"font-medium",children:"Feature B"}),e.jsx("p",{className:"text-sm text-neutral-500",children:"Description of feature B."})]})]})}),args:{title:"Features"}},a={args:{title:"No Content",children:null}};var c,n,d;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    title: 'Features Overview',
    children: 'Section content goes here.'
  }
}`,...(d=(n=s.parameters)==null?void 0:n.docs)==null?void 0:d.source}}};var l,p,m;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: args => <ShowcaseSection {...args}>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Feature A</h3>
          <p className="text-sm text-neutral-500">Description of feature A.</p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-medium">Feature B</h3>
          <p className="text-sm text-neutral-500">Description of feature B.</p>
        </div>
      </div>
    </ShowcaseSection>,
  args: {
    title: 'Features'
  }
}`,...(m=(p=t.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var u,h,g;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    title: 'No Content',
    children: null
  }
}`,...(g=(h=a.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};const w=["Default","WithChildren","Empty"];export{s as Default,a as Empty,t as WithChildren,w as __namedExportsOrder,b as default};
