import{j as r}from"./jsx-runtime-EKYJJIwR.js";import{r as V}from"./index-BxXVWNx3.js";import{c as d}from"./cn-DCADjnpI.js";import{c as A}from"./index-Da1oAmHU.js";import"./_commonjsHelpers-CqkleIqs.js";const O=A("text-sm font-normal transition-colors",{variants:{variant:{default:"text-gray-500 dark:text-gray-400",primary:"text-primary",success:"text-success-500",error:"text-error-500",warning:"text-warning-500",info:"text-blue-light-500",light:"text-gray-400",dark:"text-gray-800 dark:text-white/90"},underline:{true:"underline"}},defaultVariants:{variant:"default"}}),S={default:{light:"text-gray-500",dark:"text-gray-400"},primary:{light:"text-primary"},success:{light:"text-success-500"},error:{light:"text-error-500"},warning:{light:"text-warning-500"},info:{light:"text-blue-light-500"},light:{light:"text-gray-400"},dark:{light:"text-gray-800",dark:"text-white/90"}},t=V.forwardRef(({className:a,variant:e="default",underline:N,opacity:o=100,children:j,...C},b)=>{const c=S[e??"default"],U=o<100?d(`${c.light}/${o}`,c.dark&&`dark:${c.dark}/${o}`):"";return r.jsx("a",{ref:b,className:d(O({variant:e,underline:N}),U,a),...C,children:j})});t.displayName="Link";t.__docgenInfo={description:`Link with 8 color variants, optional underline, and opacity levels.
@public`,methods:[],displayName:"Link",props:{opacity:{required:!1,tsType:{name:"union",raw:"10 | 25 | 50 | 75 | 100",elements:[{name:"literal",value:"10"},{name:"literal",value:"25"},{name:"literal",value:"50"},{name:"literal",value:"75"},{name:"literal",value:"100"}]},description:"",defaultValue:{value:"100",computed:!1}},variant:{defaultValue:{value:"'default'",computed:!1},required:!1}}};const H={title:"Primitives/Link",component:t,tags:["autodocs"],args:{href:"#",children:"Link text"},argTypes:{variant:{description:"Color variant.",control:{type:"select"},options:["default","primary","success","error","warning","info","light","dark"],table:{defaultValue:{summary:"default"}}},underline:{description:"Adds an underline to the link text.",control:{type:"boolean"}},opacity:{description:"Text opacity level.",control:{type:"select"},options:[10,25,50,75,100],table:{defaultValue:{summary:"100"}}}}},i={render:a=>r.jsx("div",{className:"flex flex-col gap-3",children:["default","primary","success","error","warning","info","light","dark"].map(e=>r.jsxs(t,{...a,variant:e,children:[e.charAt(0).toUpperCase()+e.slice(1)," link"]},e))})},s={render:a=>r.jsx("div",{className:"flex flex-col gap-3",children:["default","primary","success","error","warning","info","light","dark"].map(e=>r.jsxs(t,{...a,variant:e,underline:!0,children:[e.charAt(0).toUpperCase()+e.slice(1)," link"]},e))})},n={render:a=>r.jsx("div",{className:"flex flex-col gap-3",children:[10,25,50,75,100].map(e=>r.jsxs(t,{...a,opacity:e,children:["Link opacity ",e]},e))})},l={render:a=>r.jsx("div",{className:"flex flex-col gap-3",children:[10,25,50,75,100].map(e=>r.jsxs(t,{...a,className:"hover:text-gray-500 dark:hover:text-gray-400",opacity:e,children:["Link opacity ",e]},e))})};var p,m,u;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-3">
      {(['default', 'primary', 'success', 'error', 'warning', 'info', 'light', 'dark'] as const).map(variant => <Link key={variant} {...args} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)} link
        </Link>)}
    </div>
}`,...(u=(m=i.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var g,x,f;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-3">
      {(['default', 'primary', 'success', 'error', 'warning', 'info', 'light', 'dark'] as const).map(variant => <Link key={variant} {...args} variant={variant} underline>
          {variant.charAt(0).toUpperCase() + variant.slice(1)} link
        </Link>)}
    </div>
}`,...(f=(x=s.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var y,k,h;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-3">
      {([10, 25, 50, 75, 100] as const).map(opacity => <Link key={opacity} {...args} opacity={opacity}>
          Link opacity {opacity}
        </Link>)}
    </div>
}`,...(h=(k=n.parameters)==null?void 0:k.docs)==null?void 0:h.source}}};var v,L,w;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col gap-3">
      {([10, 25, 50, 75, 100] as const).map(opacity => <Link key={opacity} {...args} className="hover:text-gray-500 dark:hover:text-gray-400" opacity={opacity}>
          Link opacity {opacity}
        </Link>)}
    </div>
}`,...(w=(L=l.parameters)==null?void 0:L.docs)==null?void 0:w.source}}};const R=["ColoredLinks","WithUnderline","Opacity","OpacityHover"];export{i as ColoredLinks,n as Opacity,l as OpacityHover,s as WithUnderline,R as __namedExportsOrder,H as default};
