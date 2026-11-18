import{j as a}from"./jsx-runtime-EKYJJIwR.js";import{r as C}from"./index-BxXVWNx3.js";import{c as b}from"./cn-DCADjnpI.js";import{c as K}from"./index-Da1oAmHU.js";import"./_commonjsHelpers-CqkleIqs.js";const Q=K("rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]",{variants:{variant:{default:"",bordered:"shadow-theme-xs",ghost:"border-transparent bg-transparent"}},defaultVariants:{variant:"default"}}),r=C.forwardRef(({variant:e,className:t,...s},o)=>a.jsx("div",{ref:o,className:b(Q({variant:e}),t),...s}));r.displayName="Card";r.__docgenInfo={description:"",methods:[],displayName:"Card",composes:["HTMLAttributes","VariantProps"]};const d=C.forwardRef(({className:e,...t},s)=>a.jsx("div",{ref:s,className:b(e),...t}));d.displayName="CardContent";d.__docgenInfo={description:"",methods:[],displayName:"CardContent"};const i=C.forwardRef(({src:e,alt:t,orientation:s="top",className:o,...F},J)=>a.jsx("div",{className:b("overflow-hidden rounded-lg",s==="top"?"mb-5":"shrink-0",o),children:a.jsx("img",{ref:J,src:e,alt:t,className:"w-full overflow-hidden rounded-lg",...F})}));i.displayName="CardImage";i.__docgenInfo={description:"",methods:[],displayName:"CardImage",props:{src:{required:!0,tsType:{name:"string"},description:""},alt:{required:!0,tsType:{name:"string"},description:""},orientation:{required:!1,tsType:{name:"union",raw:"'top' | 'left'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'left'"}]},description:"",defaultValue:{value:"'top'",computed:!1}}}};const n=C.forwardRef(({as:e="h4",className:t,...s},o)=>a.jsx(e,{ref:o,className:b("mb-1 text-[20px] leading-[30px] font-medium text-gray-800 dark:text-white/90",t),...s}));n.displayName="CardTitle";n.__docgenInfo={description:"",methods:[],displayName:"CardTitle",props:{as:{required:!1,tsType:{name:"union",raw:"'h2' | 'h3' | 'h4'",elements:[{name:"literal",value:"'h2'"},{name:"literal",value:"'h3'"},{name:"literal",value:"'h4'"}]},description:"",defaultValue:{value:"'h4'",computed:!1}}}};const ra={title:"UI/Card",component:r,tags:["autodocs"],args:{children:"Card content goes here."},argTypes:{variant:{description:"Card visual variant.",control:{type:"select"},options:["default","bordered","ghost"],table:{defaultValue:{summary:"default"}}},children:{description:"Content inside the card.",control:!1},className:{description:"Additional CSS classes.",control:!1}}},l={args:{variant:"default",children:"This is a default card with border and background."}},c={args:{variant:"bordered",children:"This card has a visible border and subtle shadow."}},m={args:{variant:"ghost",children:"This card has no background or border (ghost variant)."}},h={render:e=>a.jsxs(r,{...e,children:[a.jsx(i,{src:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop",alt:"Portrait"}),a.jsx(n,{children:"Card with Image"}),a.jsx(d,{children:a.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"A card layout that includes an image at the top with the title and content below."})})]}),args:{variant:"default"}},p={render:e=>a.jsx(r,{...e,children:a.jsxs("div",{className:"flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6",children:[a.jsx(i,{orientation:"left",src:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop",alt:"Portrait"}),a.jsxs("div",{children:[a.jsx(n,{children:"Horizontal Card"}),a.jsx(d,{children:a.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"A horizontal card layout with the image on the left and content on the right."})})]})]})}),args:{variant:"default"}},u={render:e=>a.jsxs(r,{...e,children:[a.jsx(i,{src:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop",alt:"Portrait"}),a.jsx(n,{children:"Card with Link"}),a.jsxs(d,{children:[a.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"A card with a link action below the content."}),a.jsx("a",{href:"#",className:"text-brand-500 hover:text-brand-600 text-sm font-medium",children:"View details →"})]})]}),args:{variant:"default"}},g={render:e=>a.jsxs(r,{...e,children:[a.jsx("div",{className:"bg-brand-50 text-brand-500 dark:bg-brand-500/10 mb-5 flex h-12 w-12 items-center justify-center rounded-lg",children:a.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:a.jsx("path",{d:"M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z",fill:"currentColor"})})}),a.jsx(n,{children:"Card with Icon"}),a.jsx(d,{children:a.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"A card with an icon at the top, followed by the title and content."})})]}),args:{variant:"default"}},f={render:e=>a.jsxs(r,{...e,children:[a.jsx(n,{children:"Card Title"}),a.jsxs(d,{children:[a.jsx("p",{className:"mb-4 text-sm text-gray-500 dark:text-gray-400",children:"This card contains multiple children elements including a title, description, and action button."}),a.jsx("button",{className:"bg-primary rounded-md px-4 py-2 text-white",children:"Action"})]})]}),args:{variant:"default"}},x={render:e=>a.jsx("button",{type:"button",onClick:()=>alert("Card clicked"),className:"w-full text-left",children:a.jsx(r,{...e})}),args:{variant:"bordered",children:"Click this card to trigger an action."}};var v,w,y;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    children: 'This is a default card with border and background.'
  }
}`,...(y=(w=l.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var j,k,N;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    variant: 'bordered',
    children: 'This card has a visible border and subtle shadow.'
  }
}`,...(N=(k=c.parameters)==null?void 0:k.docs)==null?void 0:N.source}}};var T,L,I;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'This card has no background or border (ghost variant).'
  }
}`,...(I=(L=m.parameters)==null?void 0:L.docs)==null?void 0:I.source}}};var A,S,_;h.parameters={...h.parameters,docs:{...(A=h.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: args => <Card {...args}>
      <CardImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop" alt="Portrait" />
      <CardTitle>Card with Image</CardTitle>
      <CardContent>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          A card layout that includes an image at the top with the title and content below.
        </p>
      </CardContent>
    </Card>,
  args: {
    variant: 'default'
  }
}`,...(_=(S=h.parameters)==null?void 0:S.docs)==null?void 0:_.source}}};var V,W,P;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: args => <Card {...args}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
        <CardImage orientation="left" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop" alt="Portrait" />
        <div>
          <CardTitle>Horizontal Card</CardTitle>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A horizontal card layout with the image on the left and content on the right.
            </p>
          </CardContent>
        </div>
      </div>
    </Card>,
  args: {
    variant: 'default'
  }
}`,...(P=(W=p.parameters)==null?void 0:W.docs)==null?void 0:P.source}}};var z,H,R;u.parameters={...u.parameters,docs:{...(z=u.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: args => <Card {...args}>
      <CardImage src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop" alt="Portrait" />
      <CardTitle>Card with Link</CardTitle>
      <CardContent>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          A card with a link action below the content.
        </p>
        <a href="#" className="text-brand-500 hover:text-brand-600 text-sm font-medium">
          View details →
        </a>
      </CardContent>
    </Card>,
  args: {
    variant: 'default'
  }
}`,...(R=(H=u.parameters)==null?void 0:H.docs)==null?void 0:R.source}}};var q,B,E;g.parameters={...g.parameters,docs:{...(q=g.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: args => <Card {...args}>
      <div className="bg-brand-50 text-brand-500 dark:bg-brand-500/10 mb-5 flex h-12 w-12 items-center justify-center rounded-lg">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
        </svg>
      </div>
      <CardTitle>Card with Icon</CardTitle>
      <CardContent>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          A card with an icon at the top, followed by the title and content.
        </p>
      </CardContent>
    </Card>,
  args: {
    variant: 'default'
  }
}`,...(E=(B=g.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};var M,D,G;f.parameters={...f.parameters,docs:{...(M=f.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: args => <Card {...args}>
      <CardTitle>Card Title</CardTitle>
      <CardContent>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          This card contains multiple children elements including a title, description, and action
          button.
        </p>
        <button className="bg-primary rounded-md px-4 py-2 text-white">Action</button>
      </CardContent>
    </Card>,
  args: {
    variant: 'default'
  }
}`,...(G=(D=f.parameters)==null?void 0:D.docs)==null?void 0:G.source}}};var Z,O,U;x.parameters={...x.parameters,docs:{...(Z=x.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: args => <button type="button" onClick={() => alert('Card clicked')} className="w-full text-left">
      <Card {...args} />
    </button>,
  args: {
    variant: 'bordered',
    children: 'Click this card to trigger an action.'
  }
}`,...(U=(O=x.parameters)==null?void 0:O.docs)==null?void 0:U.source}}};const ta=["Default","Bordered","Ghost","CardWithImage","HorizontalCard","CardWithLink","CardWithIcon","WithChildren","Clickable"];export{c as Bordered,g as CardWithIcon,h as CardWithImage,u as CardWithLink,x as Clickable,l as Default,m as Ghost,p as HorizontalCard,f as WithChildren,ta as __namedExportsOrder,ra as default};
