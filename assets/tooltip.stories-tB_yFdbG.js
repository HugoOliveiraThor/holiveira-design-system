import{j as t}from"./jsx-runtime-EKYJJIwR.js";import{B as a}from"./button-CTnCkG2H.js";import{r}from"./index-BxXVWNx3.js";import{c as I}from"./cn-DCADjnpI.js";import{c as S}from"./index-Da1oAmHU.js";import"./_commonjsHelpers-CqkleIqs.js";const P=S("absolute z-50 rounded-lg px-2.5 py-1.5 text-sm whitespace-nowrap transition-opacity",{variants:{variant:{default:"shadow-theme-lg bg-white text-gray-700",dark:"bg-gray-900 text-white"},placement:{top:"bottom-full left-1/2 mb-2 -translate-x-1/2",right:"top-1/2 left-full ml-2 -translate-y-1/2",bottom:"top-full left-1/2 mt-2 -translate-x-1/2",left:"top-1/2 right-full mr-2 -translate-y-1/2"}},defaultVariants:{variant:"default",placement:"top"}}),M=S("absolute h-2 w-2 rotate-45 border",{variants:{variant:{default:"border-gray-200 bg-white",dark:"border-gray-900 bg-gray-900"},placement:{top:"-bottom-1 left-1/2 -translate-x-1/2",right:"top-1/2 -left-1 -translate-y-1/2",bottom:"-top-1 left-1/2 -translate-x-1/2",left:"top-1/2 -right-1 -translate-y-1/2"}},defaultVariants:{variant:"default",placement:"top"}}),o=r.forwardRef(({content:e,placement:d="top",variant:u="default",arrow:E=!0,className:W,children:m,...q},H)=>{const[f,n]=r.useState(!1),h=r.useId(),_=r.isValidElement(m)?r.cloneElement(m,{"aria-describedby":f?h:void 0}):m;return t.jsxs("span",{className:"relative inline-flex",onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),onFocus:()=>n(!0),onBlur:()=>n(!1),children:[_,t.jsxs("span",{ref:H,role:"tooltip",id:h,className:I(P({variant:u,placement:d}),f?"opacity-100":"pointer-events-none invisible opacity-0",W),...q,children:[e,E&&t.jsx("span",{"aria-hidden":"true",className:M({variant:u,placement:d})})]})]})});o.displayName="Tooltip";o.__docgenInfo={description:`Self-managed tooltip shown on hover/focus, with placement, variant, and arrow.
@public`,methods:[],displayName:"Tooltip",props:{content:{required:!0,tsType:{name:"ReactNode"},description:""},arrow:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},children:{required:!0,tsType:{name:"ReactNode"},description:""},placement:{defaultValue:{value:"'top'",computed:!1},required:!1},variant:{defaultValue:{value:"'default'",computed:!1},required:!1}}};const K={title:"Primitives/Tooltip",component:o,tags:["autodocs"],argTypes:{content:{description:"Tooltip bubble content.",control:{type:"text"}},placement:{description:"Bubble position relative to the trigger.",control:{type:"select"},options:["top","right","bottom","left"],table:{defaultValue:{summary:"top"}}},variant:{description:"Bubble style.",control:{type:"select"},options:["default","dark"],table:{defaultValue:{summary:"default"}}},arrow:{description:"Show the pointer arrow.",control:{type:"boolean"},table:{defaultValue:{summary:"true"}}}}},L=({children:e})=>t.jsx("div",{className:"flex items-center justify-center py-10",children:e}),s={render:e=>t.jsx(L,{children:t.jsx(o,{...e,content:"This is a tooltip",children:t.jsx(a,{children:"Default Tooltip"})})})},l={render:e=>t.jsx(L,{children:t.jsx(o,{...e,content:"This is a tooltip",variant:"dark",children:t.jsx(a,{children:"Dark Tooltip"})})})},i={render:e=>t.jsxs("div",{className:"flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-16",children:[t.jsx(o,{...e,content:"This is a tooltip",placement:"top",children:t.jsx(a,{children:"Top"})}),t.jsx(o,{...e,content:"Dark variant tooltip",placement:"right",children:t.jsx(a,{children:"Right"})}),t.jsx(o,{...e,content:"Tooltip on bottom",placement:"bottom",children:t.jsx(a,{children:"Bottom"})}),t.jsx(o,{...e,content:"Tooltip on left side",placement:"left",children:t.jsx(a,{children:"Left"})})]})},p={render:e=>t.jsxs("div",{className:"flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-16",children:[t.jsx(o,{...e,content:"This is a tooltip",placement:"top",variant:"dark",arrow:!1,children:t.jsx(a,{children:"Top"})}),t.jsx(o,{...e,content:"This is a tooltip",placement:"right",variant:"dark",arrow:!1,children:t.jsx(a,{children:"Right"})}),t.jsx(o,{...e,content:"This is a tooltip",placement:"bottom",variant:"dark",arrow:!1,children:t.jsx(a,{children:"Bottom"})}),t.jsx(o,{...e,content:"This is a tooltip",placement:"left",variant:"dark",arrow:!1,children:t.jsx(a,{children:"Left"})})]})},c={render:e=>t.jsxs("div",{className:"flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-16",children:[t.jsx(o,{...e,content:"This is a tooltip",placement:"top",arrow:!1,children:t.jsx(a,{children:"Top"})}),t.jsx(o,{...e,content:"This is a tooltip",placement:"right",arrow:!1,children:t.jsx(a,{children:"Right"})}),t.jsx(o,{...e,content:"This is a tooltip",placement:"bottom",arrow:!1,children:t.jsx(a,{children:"Bottom"})}),t.jsx(o,{...e,content:"This is a tooltip",placement:"left",arrow:!1,children:t.jsx(a,{children:"Left"})})]})};var T,x,g;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: args => <HoverArea>
      <Tooltip {...args} content="This is a tooltip">
        <Button>Default Tooltip</Button>
      </Tooltip>
    </HoverArea>
}`,...(g=(x=s.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var v,j,w;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: args => <HoverArea>
      <Tooltip {...args} content="This is a tooltip" variant="dark">
        <Button>Dark Tooltip</Button>
      </Tooltip>
    </HoverArea>
}`,...(w=(j=l.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var b,B,y;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-16">
      <Tooltip {...args} content="This is a tooltip" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip {...args} content="Dark variant tooltip" placement="right">
        <Button>Right</Button>
      </Tooltip>
      <Tooltip {...args} content="Tooltip on bottom" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip {...args} content="Tooltip on left side" placement="left">
        <Button>Left</Button>
      </Tooltip>
    </div>
}`,...(y=(B=i.parameters)==null?void 0:B.docs)==null?void 0:y.source}}};var k,N,A;p.parameters={...p.parameters,docs:{...(k=p.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-16">
      <Tooltip {...args} content="This is a tooltip" placement="top" variant="dark" arrow={false}>
        <Button>Top</Button>
      </Tooltip>
      <Tooltip {...args} content="This is a tooltip" placement="right" variant="dark" arrow={false}>
        <Button>Right</Button>
      </Tooltip>
      <Tooltip {...args} content="This is a tooltip" placement="bottom" variant="dark" arrow={false}>
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip {...args} content="This is a tooltip" placement="left" variant="dark" arrow={false}>
        <Button>Left</Button>
      </Tooltip>
    </div>
}`,...(A=(N=p.parameters)==null?void 0:N.docs)==null?void 0:A.source}}};var D,R,V;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-16">
      <Tooltip {...args} content="This is a tooltip" placement="top" arrow={false}>
        <Button>Top</Button>
      </Tooltip>
      <Tooltip {...args} content="This is a tooltip" placement="right" arrow={false}>
        <Button>Right</Button>
      </Tooltip>
      <Tooltip {...args} content="This is a tooltip" placement="bottom" arrow={false}>
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip {...args} content="This is a tooltip" placement="left" arrow={false}>
        <Button>Left</Button>
      </Tooltip>
    </div>
}`,...(V=(R=c.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};const Q=["Default","Dark","Placements","WithoutArrow","WithoutArrowWhite"];export{l as Dark,s as Default,i as Placements,p as WithoutArrow,c as WithoutArrowWhite,Q as __namedExportsOrder,K as default};
