import{j as r}from"./jsx-runtime-EKYJJIwR.js";import{C as Y}from"./checkbox-BWMSy2qh.js";import{r as x}from"./index-BxXVWNx3.js";import{c as d}from"./cn-DCADjnpI.js";import{R as Z}from"./radio-IjJIeTi1.js";import{C as M}from"./check-8xR-Yow7.js";import{C as ee}from"./close-BARKxc22.js";import"./x-0FJdkYUO.js";import"./icon-wrapper-D5BXwZrf.js";import"./_commonjsHelpers-CqkleIqs.js";const Q=x.createContext({orientation:"vertical"}),v="flex items-center gap-2 px-3 py-2.5 text-sm text-gray-500 dark:text-gray-400",t=x.forwardRef(({as:a="ul",orientation:e="vertical",className:s,children:f,...n},k)=>{const l=a;return r.jsx(Q.Provider,{value:{orientation:e},children:r.jsx(l,{ref:k,className:d("flex flex-col",a==="ol"&&"list-decimal",e==="horizontal"&&"md:flex-row",s),...n,children:f})})});t.displayName="List";const o=x.forwardRef(({marker:a="dot",icon:e,asButton:s,disabled:f,className:n,children:k,...l},L)=>{const{orientation:X}=x.useContext(Q),I=d("border-b border-gray-200 last:border-b-0 dark:border-gray-800",X==="horizontal"&&"md:border-r md:border-b-0"),j=r.jsxs(r.Fragment,{children:[e!==void 0&&r.jsx("span",{className:"text-brand-500 dark:text-brand-400 shrink-0",children:e}),e===void 0&&a==="dot"&&r.jsx("span",{"aria-hidden":"true",className:"ml-2 block h-[3px] w-[3px] shrink-0 rounded-full bg-gray-500 dark:bg-gray-400"}),k]});return s?r.jsx("li",{ref:L,className:d(I,n),...l,children:r.jsx("button",{type:"button",disabled:f,className:d(v,"hover:bg-brand-50 hover:text-brand-500 dark:hover:bg-brand-500/[0.12] dark:hover:text-brand-400 w-full font-medium transition-colors disabled:opacity-50 dark:text-gray-400"),children:j})}):r.jsx("li",{ref:L,className:d(v,I,n),...l,children:j})});o.displayName="ListItem";t.__docgenInfo={description:`List container (ul/ol) with vertical or horizontal orientation.
@public`,methods:[],displayName:"List",props:{as:{required:!1,tsType:{name:"union",raw:"'ul' | 'ol'",elements:[{name:"literal",value:"'ul'"},{name:"literal",value:"'ol'"}]},description:"",defaultValue:{value:"'ul'",computed:!1}},orientation:{required:!1,tsType:{name:"union",raw:"'vertical' | 'horizontal'",elements:[{name:"literal",value:"'vertical'"},{name:"literal",value:"'horizontal'"}]},description:"",defaultValue:{value:"'vertical'",computed:!1}}}};o.__docgenInfo={description:`List item with dot/icon marker, optional button behavior, and disabled state.
@public`,methods:[],displayName:"ListItem",props:{marker:{required:!1,tsType:{name:"union",raw:"'dot' | 'none'",elements:[{name:"literal",value:"'dot'"},{name:"literal",value:"'none'"}]},description:"",defaultValue:{value:"'dot'",computed:!1}},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},asButton:{required:!1,tsType:{name:"boolean"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""}}};const ce={title:"Primitives/List",component:t,tags:["autodocs"],argTypes:{as:{description:"List tag.",control:{type:"select"},options:["ul","ol"],table:{defaultValue:{summary:"ul"}}},orientation:{description:"Layout direction.",control:{type:"select"},options:["vertical","horizontal"],table:{defaultValue:{summary:"vertical"}}}}},i=["Lorem ipsum dolor sit amet","It is a long established fact reader","Lorem ipsum dolor sit amet","Lorem ipsum dolor sit amet","Lorem ipsum dolor sit amet"],m={render:a=>r.jsx(t,{...a,className:"w-fit rounded-lg border border-gray-200 dark:border-gray-800",children:i.map(e=>r.jsx(o,{children:e},e))})},c={render:a=>r.jsx(t,{...a,as:"ol",className:"w-fit rounded-lg border border-gray-200 dark:border-gray-800",children:i.map(e=>r.jsx(o,{marker:"none",children:e},e))})},p={render:a=>r.jsx(t,{...a,className:"w-[228px] overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800",children:["Inbox","Sent","Drafts","Trash","Spam"].map((e,s)=>r.jsx(o,{asButton:!0,disabled:s===4,children:e},e))})},u={render:a=>r.jsx(t,{...a,className:"w-fit rounded-lg border border-gray-200 dark:border-gray-800",children:i.map(e=>r.jsx(o,{icon:r.jsx(M,{size:16}),children:e},e))})},b={render:a=>r.jsx(t,{...a,orientation:"horizontal",className:"w-fit rounded-lg border border-gray-200 dark:border-gray-800",children:i.slice(0,4).map(e=>r.jsx(o,{icon:r.jsx(M,{size:16}),children:e},e))})},g={render:a=>r.jsx(t,{...a,className:"w-fit rounded-lg border border-gray-200 dark:border-gray-800",children:i.map((e,s)=>r.jsx(o,{marker:"none",children:r.jsx(Y,{label:e,id:`checkbox-${s}`})},e))})},h={render:a=>r.jsx(t,{...a,className:"w-fit rounded-lg border border-gray-200 dark:border-gray-800",children:i.map((e,s)=>r.jsx(o,{marker:"none",children:r.jsx(Z,{label:e,name:"list-radio",id:`radio-${s}`})},e))})},y={render:a=>r.jsx(t,{...a,className:"w-fit rounded-lg border border-gray-200 dark:border-gray-800",children:i.map(e=>r.jsx(o,{icon:r.jsx(ee,{size:16}),children:e},e))})};var w,N,C;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: args => <List {...args} className="w-fit rounded-lg border border-gray-200 dark:border-gray-800">
      {items.map(item => <ListItem key={item}>{item}</ListItem>)}
    </List>
}`,...(C=(N=m.parameters)==null?void 0:N.docs)==null?void 0:C.source}}};var z,R,S;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: args => <List {...args} as="ol" className="w-fit rounded-lg border border-gray-200 dark:border-gray-800">
      {items.map(item => <ListItem key={item} marker="none">
          {item}
        </ListItem>)}
    </List>
}`,...(S=(R=c.parameters)==null?void 0:R.docs)==null?void 0:S.source}}};var T,W,q;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: args => <List {...args} className="w-[228px] overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
      {(['Inbox', 'Sent', 'Drafts', 'Trash', 'Spam'] as const).map((label, i) => <ListItem key={label} asButton disabled={i === 4}>
          {label}
        </ListItem>)}
    </List>
}`,...(q=(W=p.parameters)==null?void 0:W.docs)==null?void 0:q.source}}};var B,_,V;u.parameters={...u.parameters,docs:{...(B=u.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: args => <List {...args} className="w-fit rounded-lg border border-gray-200 dark:border-gray-800">
      {items.map(item => <ListItem key={item} icon={<CheckIcon size={16} />}>
          {item}
        </ListItem>)}
    </List>
}`,...(V=(_=u.parameters)==null?void 0:_.docs)==null?void 0:V.source}}};var $,E,O;b.parameters={...b.parameters,docs:{...($=b.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: args => <List {...args} orientation="horizontal" className="w-fit rounded-lg border border-gray-200 dark:border-gray-800">
      {items.slice(0, 4).map(item => <ListItem key={item} icon={<CheckIcon size={16} />}>
          {item}
        </ListItem>)}
    </List>
}`,...(O=(E=b.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var D,H,P;g.parameters={...g.parameters,docs:{...(D=g.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <List {...args} className="w-fit rounded-lg border border-gray-200 dark:border-gray-800">
      {items.map((item, i) => <ListItem key={item} marker="none">
          <Checkbox label={item} id={\`checkbox-\${i}\`} />
        </ListItem>)}
    </List>
}`,...(P=(H=g.parameters)==null?void 0:H.docs)==null?void 0:P.source}}};var U,F,A;h.parameters={...h.parameters,docs:{...(U=h.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: args => <List {...args} className="w-fit rounded-lg border border-gray-200 dark:border-gray-800">
      {items.map((item, i) => <ListItem key={item} marker="none">
          <Radio label={item} name="list-radio" id={\`radio-\${i}\`} />
        </ListItem>)}
    </List>
}`,...(A=(F=h.parameters)==null?void 0:F.docs)==null?void 0:A.source}}};var G,J,K;y.parameters={...y.parameters,docs:{...(G=y.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: args => <List {...args} className="w-fit rounded-lg border border-gray-200 dark:border-gray-800">
      {items.map(item => <ListItem key={item} icon={<CloseIcon size={16} />}>
          {item}
        </ListItem>)}
    </List>
}`,...(K=(J=y.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};const pe=["Unordered","Ordered","WithButton","WithIcon","Horizontal","WithCheckbox","WithRadio","WithCloseIcon"];export{b as Horizontal,c as Ordered,m as Unordered,p as WithButton,g as WithCheckbox,y as WithCloseIcon,u as WithIcon,h as WithRadio,pe as __namedExportsOrder,ce as default};
