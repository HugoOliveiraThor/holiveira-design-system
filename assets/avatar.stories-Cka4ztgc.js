import{j as a}from"./jsx-runtime-EKYJJIwR.js";import{r as t}from"./index-BxXVWNx3.js";import{c as z}from"./cn-DCADjnpI.js";import{c as oa}from"./index-Da1oAmHU.js";import"./_commonjsHelpers-CqkleIqs.js";const la=oa("relative shrink-0 rounded-full",{variants:{size:{xs:"h-6 w-6",sm:"h-8 w-8",md:"h-10 w-10",lg:"h-12 w-12",xl:"h-14 w-14","2xl":"h-16 w-16"}},defaultVariants:{size:"md"}}),ia=oa("absolute right-0 bottom-0 rounded-full border-[1.5px] border-white dark:border-gray-900",{variants:{size:{xs:"h-1.5 w-1.5",sm:"h-2 w-2",md:"h-2.5 w-2.5",lg:"h-3 w-3",xl:"h-3.5 w-3.5","2xl":"h-4 w-4"},status:{online:"bg-success-500",offline:"bg-error-500",busy:"bg-warning-500"}},defaultVariants:{size:"md"}}),r=t.forwardRef(({src:s,alt:n,name:o,size:i,status:c,className:E,...m},l)=>{const[d,u]=t.useState(!1),S=s!==void 0&&!d,p=t.useMemo(()=>o?o.trim().split(/\s+/).slice(0,2).map(I=>{var v;return((v=I[0])==null?void 0:v.toUpperCase())??""}).join(""):"?",[o]);return a.jsxs("div",{ref:l,className:z(la({size:i}),E),...m,children:[S?a.jsx("img",{src:s,alt:n,onError:()=>u(!0),className:"h-full w-full rounded-full object-cover"}):a.jsx("div",{className:"flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300",children:p}),c&&a.jsx("span",{"aria-hidden":"true",className:ia({size:i,status:c})})]})});r.displayName="Avatar";r.__docgenInfo={description:`Circular avatar with optional status indicator and initials fallback.
@public`,methods:[],displayName:"Avatar",props:{src:{required:!1,tsType:{name:"string"},description:""},alt:{required:!0,tsType:{name:"string"},description:""},name:{required:!1,tsType:{name:"string"},description:""},status:{required:!1,tsType:{name:"union",raw:"'online' | 'offline' | 'busy'",elements:[{name:"literal",value:"'online'"},{name:"literal",value:"'offline'"},{name:"literal",value:"'busy'"}]},description:""}}};const ca={xs:"-space-x-1.5",sm:"-space-x-2",md:"-space-x-2.5",lg:"-space-x-3",xl:"-space-x-3.5","2xl":"-space-x-4"},ma={xs:"h-6 w-6 text-[10px]",sm:"h-8 w-8 text-xs",md:"h-10 w-10 text-sm",lg:"h-12 w-12 text-sm",xl:"h-14 w-14 text-sm","2xl":"h-16 w-16 text-sm"},j=t.forwardRef(({children:s,size:n="md",max:o=4,className:i,...c},E)=>{const m=t.Children.toArray(s).filter(t.isValidElement),l=m.slice(0,o),d=m.length-l.length,u=n??"md",S=t.useMemo(()=>l.map(p=>{const v=p.props.size??n;return t.cloneElement(p,{size:v})}),[l,n]);return a.jsxs("div",{ref:E,className:z("flex items-center",ca[u],i),...c,children:[S,d>0&&a.jsxs("div",{className:z("flex items-center justify-center rounded-full bg-gray-200 font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300",ma[u]),children:["+",d]})]})});j.displayName="AvatarGroup";j.__docgenInfo={description:"Stacked avatars with overlap. Accepts Avatar children; `size` applies to\nchildren lacking an explicit size. Renders a `+N` overflow chip when the\nchild count exceeds `max` (default 4).\n@public",methods:[],displayName:"AvatarGroup",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},size:{required:!1,tsType:{name:"intersection['size']",raw:"AvatarProps['size']"},description:"",defaultValue:{value:"'md'",computed:!1}},max:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"4",computed:!1}}}};const ga={title:"Primitives/Avatar",component:r,tags:["autodocs"],argTypes:{src:{description:"Image URL. When absent or failing to load, initials from `name` are shown.",control:{type:"text"}},alt:{description:"Alternative text (a11y).",control:{type:"text"}},name:{description:'Name used to derive fallback initials (e.g. "Hugo Oliveira" → "HO").',control:{type:"text"}},size:{description:"Avatar size tier (24–64px).",control:{type:"select"},options:["xs","sm","md","lg","xl","2xl"],table:{defaultValue:{summary:"md"}}},status:{description:"Status indicator color.",control:{type:"select"},options:["online","offline","busy",void 0]}}},e="https://i.pravatar.cc/128?img=12",x={args:{src:e,alt:"User avatar",name:"Hugo Oliveira"}},g={args:{name:"Hugo Oliveira",alt:"User avatar"}},f={args:{alt:"User avatar"}},h={args:{src:e,alt:"User avatar",status:"online"}},A={args:{src:e,alt:"User avatar",status:"busy"}},y={args:{src:e,alt:"User avatar",status:"offline"}},U={render:()=>a.jsx("div",{className:"flex items-end gap-4",children:["xs","sm","md","lg","xl","2xl"].map(s=>a.jsx(r,{src:e,alt:"User avatar",name:"Hugo Oliveira",size:s},s))})},w={render:()=>a.jsx("div",{className:"flex items-end gap-4",children:["xs","sm","md","lg","xl","2xl"].map(s=>a.jsx(r,{src:e,alt:"User avatar",name:"Hugo Oliveira",size:s,status:"online"},s))})},b={render:()=>a.jsxs(j,{size:"md",children:[a.jsx(r,{src:e,alt:"User 1",name:"Alice"}),a.jsx(r,{src:e,alt:"User 2",name:"Bob"}),a.jsx(r,{src:e,alt:"User 3",name:"Carol"}),a.jsx(r,{src:e,alt:"User 4",name:"Dave"}),a.jsx(r,{src:e,alt:"User 5",name:"Eve"}),a.jsx(r,{src:e,alt:"User 6",name:"Frank"})]})},G={render:()=>a.jsxs(j,{size:"lg",max:3,children:[a.jsx(r,{src:e,alt:"User 1",name:"Alice"}),a.jsx(r,{src:e,alt:"User 2",name:"Bob"}),a.jsx(r,{src:e,alt:"User 3",name:"Carol"}),a.jsx(r,{src:e,alt:"User 4",name:"Dave"}),a.jsx(r,{src:e,alt:"User 5",name:"Eve"})]})};var M,k,N;x.parameters={...x.parameters,docs:{...(M=x.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    src: IMAGE,
    alt: 'User avatar',
    name: 'Hugo Oliveira'
  }
}`,...(N=(k=x.parameters)==null?void 0:k.docs)==null?void 0:N.source}}};var O,H,D;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    name: 'Hugo Oliveira',
    alt: 'User avatar'
  }
}`,...(D=(H=g.parameters)==null?void 0:H.docs)==null?void 0:D.source}}};var T,V,q;f.parameters={...f.parameters,docs:{...(T=f.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    alt: 'User avatar'
  }
}`,...(q=(V=f.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};var C,B,F;h.parameters={...h.parameters,docs:{...(C=h.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    src: IMAGE,
    alt: 'User avatar',
    status: 'online'
  }
}`,...(F=(B=h.parameters)==null?void 0:B.docs)==null?void 0:F.source}}};var R,_,W;A.parameters={...A.parameters,docs:{...(R=A.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    src: IMAGE,
    alt: 'User avatar',
    status: 'busy'
  }
}`,...(W=(_=A.parameters)==null?void 0:_.docs)==null?void 0:W.source}}};var P,L,J;y.parameters={...y.parameters,docs:{...(P=y.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    src: IMAGE,
    alt: 'User avatar',
    status: 'offline'
  }
}`,...(J=(L=y.parameters)==null?void 0:L.docs)==null?void 0:J.source}}};var K,Q,X;U.parameters={...U.parameters,docs:{...(K=U.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <div className="flex items-end gap-4">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map(size => <Avatar key={size} src={IMAGE} alt="User avatar" name="Hugo Oliveira" size={size} />)}
    </div>
}`,...(X=(Q=U.parameters)==null?void 0:Q.docs)==null?void 0:X.source}}};var Y,Z,$;w.parameters={...w.parameters,docs:{...(Y=w.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <div className="flex items-end gap-4">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map(size => <Avatar key={size} src={IMAGE} alt="User avatar" name="Hugo Oliveira" size={size} status="online" />)}
    </div>
}`,...($=(Z=w.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var aa,ea,ra;b.parameters={...b.parameters,docs:{...(aa=b.parameters)==null?void 0:aa.docs,source:{originalSource:`{
  render: () => <AvatarGroup size="md">
      <Avatar src={IMAGE} alt="User 1" name="Alice" />
      <Avatar src={IMAGE} alt="User 2" name="Bob" />
      <Avatar src={IMAGE} alt="User 3" name="Carol" />
      <Avatar src={IMAGE} alt="User 4" name="Dave" />
      <Avatar src={IMAGE} alt="User 5" name="Eve" />
      <Avatar src={IMAGE} alt="User 6" name="Frank" />
    </AvatarGroup>
}`,...(ra=(ea=b.parameters)==null?void 0:ea.docs)==null?void 0:ra.source}}};var sa,ta,na;G.parameters={...G.parameters,docs:{...(sa=G.parameters)==null?void 0:sa.docs,source:{originalSource:`{
  render: () => <AvatarGroup size="lg" max={3}>
      <Avatar src={IMAGE} alt="User 1" name="Alice" />
      <Avatar src={IMAGE} alt="User 2" name="Bob" />
      <Avatar src={IMAGE} alt="User 3" name="Carol" />
      <Avatar src={IMAGE} alt="User 4" name="Dave" />
      <Avatar src={IMAGE} alt="User 5" name="Eve" />
    </AvatarGroup>
}`,...(na=(ta=G.parameters)==null?void 0:ta.docs)==null?void 0:na.source}}};const fa=["Default","FallbackInitials","FallbackUnknown","StatusOnline","StatusBusy","StatusOffline","Sizes","SizesWithStatus","AvatarGroupDemo","AvatarGroupWithMax"];export{b as AvatarGroupDemo,G as AvatarGroupWithMax,x as Default,g as FallbackInitials,f as FallbackUnknown,U as Sizes,w as SizesWithStatus,A as StatusBusy,y as StatusOffline,h as StatusOnline,fa as __namedExportsOrder,ga as default};
