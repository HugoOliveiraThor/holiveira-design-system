import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{r as T}from"./index-BxXVWNx3.js";import{I as M}from"./icon-wrapper-D5BXwZrf.js";import{c as v}from"./cn-DCADjnpI.js";import{H as O}from"./home-DKGjWU8P.js";import"./_commonjsHelpers-CqkleIqs.js";const f=T.forwardRef(({size:s,title:a,...m},h)=>e.jsx(M,{ref:h,viewBox:"0 0 17 16",size:s,title:a,...m,children:e.jsx("path",{fill:"none",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round",strokeLinejoin:"round",d:"M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"})}));f.displayName="ChevronRightIcon";f.__docgenInfo={description:"Chevron pointing right @public",methods:[],displayName:"ChevronRightIcon"};const P="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary",F="flex items-center gap-1.5 text-sm text-gray-800 dark:text-white/90",b="text-gray-500 dark:text-gray-400",g=T.forwardRef(({items:s,divider:a="slash",className:m,...h},W)=>{const V=a==="dot"?"gap-2":"gap-1.5";return e.jsx("nav",{ref:W,"aria-label":"Breadcrumb",className:m,...h,children:e.jsx("ol",{className:v("flex flex-wrap items-center",V),children:s.map((r,p)=>{const u=p===s.length-1,$=a==="slash"?e.jsx("span",{className:b,children:"/"}):a==="chevron"?e.jsx(f,{size:16,className:b}):e.jsx("span",{"aria-hidden":"true",className:v(b,"block h-1 w-1 rounded-full bg-gray-400")});return e.jsxs("li",{className:"flex items-center",children:[p>0&&$,r.href&&!u?e.jsxs("a",{href:r.href,className:P,children:[r.icon&&e.jsx("span",{className:"shrink-0",children:r.icon}),r.label]}):e.jsxs("span",{"aria-current":u?"page":void 0,className:F,children:[r.icon&&!u&&e.jsx("span",{className:"shrink-0",children:r.icon}),r.label]})]},`${r.label}-${p}`)})})})});g.displayName="Breadcrumb";g.__docgenInfo={description:"Content breadcrumb trail (nav > ol > li) with slash/chevron/dot dividers\nand optional per-item icons. The last item without `href` is the current page.\n@public",methods:[],displayName:"Breadcrumb",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  label: string;
  href?: string;
  icon?: React.ReactNode;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"href",value:{name:"string",required:!1}},{key:"icon",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1}}]}}],raw:"BreadcrumbItem[]"},description:""},divider:{required:!1,tsType:{name:"union",raw:"'slash' | 'chevron' | 'dot'",elements:[{name:"literal",value:"'slash'"},{name:"literal",value:"'chevron'"},{name:"literal",value:"'dot'"}]},description:"",defaultValue:{value:"'slash'",computed:!1}}}};const ee={title:"Primitives/Breadcrumb",component:g,tags:["autodocs"],args:{items:[{label:"Home",href:"#"},{label:"Ui Kits",href:"#"},{label:"Avatar"}]},argTypes:{divider:{description:"Divider style between items.",control:{type:"select"},options:["slash","chevron","dot"],table:{defaultValue:{summary:"slash"}}}}},t={args:{items:[{label:"Home",href:"#"},{label:"Ui Kits"}]}},n={args:{items:[{label:"Home",href:"#"},{label:"Ui Kits",href:"#"},{label:"Avatar"}]}},o={args:{items:[{label:"Home",href:"#",icon:e.jsx(O,{size:16})},{label:"Ui Kits"}]}},i={args:{divider:"chevron",items:[{label:"Home",href:"#"},{label:"Ui Kits"}]}},l={args:{divider:"chevron",items:[{label:"Home",href:"#"},{label:"Ui Kits",href:"#"},{label:"Button"}]}},c={args:{divider:"dot",items:[{label:"Home",href:"#"},{label:"Ui Kits"}]}},d={args:{divider:"dot",items:[{label:"Home",href:"#"},{label:"Ui Kits",href:"#"},{label:"Button"}]}};var x,y,N;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Home',
      href: '#'
    }, {
      label: 'Ui Kits'
    }]
  }
}`,...(N=(y=t.parameters)==null?void 0:y.docs)==null?void 0:N.source}}};var H,j,k;n.parameters={...n.parameters,docs:{...(H=n.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Home',
      href: '#'
    }, {
      label: 'Ui Kits',
      href: '#'
    }, {
      label: 'Avatar'
    }]
  }
}`,...(k=(j=n.parameters)==null?void 0:j.docs)==null?void 0:k.source}}};var K,U,C;o.parameters={...o.parameters,docs:{...(K=o.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Home',
      href: '#',
      icon: <HomeIcon size={16} />
    }, {
      label: 'Ui Kits'
    }]
  }
}`,...(C=(U=o.parameters)==null?void 0:U.docs)==null?void 0:C.source}}};var w,I,R;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    divider: 'chevron',
    items: [{
      label: 'Home',
      href: '#'
    }, {
      label: 'Ui Kits'
    }]
  }
}`,...(R=(I=i.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};var B,D,S;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    divider: 'chevron',
    items: [{
      label: 'Home',
      href: '#'
    }, {
      label: 'Ui Kits',
      href: '#'
    }, {
      label: 'Button'
    }]
  }
}`,...(S=(D=l.parameters)==null?void 0:D.docs)==null?void 0:S.source}}};var _,q,L;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    divider: 'dot',
    items: [{
      label: 'Home',
      href: '#'
    }, {
      label: 'Ui Kits'
    }]
  }
}`,...(L=(q=c.parameters)==null?void 0:q.docs)==null?void 0:L.source}}};var z,A,E;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    divider: 'dot',
    items: [{
      label: 'Home',
      href: '#'
    }, {
      label: 'Ui Kits',
      href: '#'
    }, {
      label: 'Button'
    }]
  }
}`,...(E=(A=d.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};const re=["Default","Nested","WithIcons","ChevronDivider","ChevronNested","DotDivider","DotNested"];export{i as ChevronDivider,l as ChevronNested,t as Default,c as DotDivider,d as DotNested,n as Nested,o as WithIcons,re as __namedExportsOrder,ee as default};
