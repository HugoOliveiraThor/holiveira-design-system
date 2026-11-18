import{j as _}from"./jsx-runtime-EKYJJIwR.js";import{within as z,expect as d,userEvent as A}from"./index-DH-M5T-F.js";import{I as K}from"./input-group-DRQLzJ2K.js";import"./index-BxXVWNx3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cn-DCADjnpI.js";const ae={title:"Primitives/InputGroup",component:K,tags:["autodocs"],args:{label:"Input",placeholder:"Enter value..."},argTypes:{type:{description:"HTML input type attribute.",control:{type:"select"},options:["text","email","password","number","tel","url","file"],table:{defaultValue:{summary:"text"}}},label:{description:"Text label displayed above the input.",control:{type:"text"}},placeholder:{description:"Placeholder text inside the input.",control:{type:"text"}},disabled:{description:"Prevents user interaction.",control:{type:"boolean"},table:{defaultValue:{summary:"false"}}},required:{description:"Marks the input as required.",control:{type:"boolean"},table:{defaultValue:{summary:"false"}}},error:{description:"Error message displayed below the input.",control:{type:"text"}},icon:{description:"Optional icon rendered inside the input.",control:!1},iconPosition:{description:"Position of the icon relative to the input.",control:{type:"select"},options:["left","right"],table:{defaultValue:{summary:"left"}}},height:{description:"Height variant of the input.",control:{type:"select"},options:["sm","default"],table:{defaultValue:{summary:"default"}}},onChange:{description:"Callback fired when the input value changes. Receives `React.ChangeEvent<HTMLInputElement>`.",control:!1}}},a={args:{type:"text",label:"Full name",placeholder:"John Doe",disabled:!0}},t={args:{type:"text",label:"Full name",placeholder:"John Doe"}},r={args:{type:"email",label:"Email address",placeholder:"john@example.com"}},o={args:{type:"password",label:"Password",placeholder:"********"}},s={args:{type:"text",label:"Search",placeholder:"Search...",icon:_.jsx("span",{children:"🔍"}),iconPosition:"left"}},n={args:{type:"text",label:"Username",placeholder:"your-username"}},l={args:{type:"text",label:"Email",placeholder:"john@example.com",error:"Please enter a valid email address"}},i={args:{type:"file",label:"Upload file",fileStyleVariant:"style1"}},p={args:{type:"file",label:"Upload file",fileStyleVariant:"style2"}},c={args:{type:"text",label:"Type something",placeholder:"Start typing..."},play:async({canvasElement:O,step:m})=>{const e=z(O).getByRole("textbox");await m("Input is visible and empty",async()=>{await d(e).toBeVisible(),await d(e).toHaveValue("")}),await m("Type into input",async()=>{await A.type(e,"Hello, Storybook!"),await d(e).toHaveValue("Hello, Storybook!")})}};var u,y,h;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    type: 'text',
    label: 'Full name',
    placeholder: 'John Doe',
    disabled: true
  }
}`,...(h=(y=a.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var b,g,x;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    type: 'text',
    label: 'Full name',
    placeholder: 'John Doe'
  }
}`,...(x=(g=t.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var f,v,S;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    type: 'email',
    label: 'Email address',
    placeholder: 'john@example.com'
  }
}`,...(S=(v=r.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var w,E,V;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    type: 'password',
    label: 'Password',
    placeholder: '********'
  }
}`,...(V=(E=o.parameters)==null?void 0:E.docs)==null?void 0:V.source}}};var P,H,I;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    type: 'text',
    label: 'Search',
    placeholder: 'Search...',
    icon: <span>&#128269;</span>,
    iconPosition: 'left'
  }
}`,...(I=(H=s.parameters)==null?void 0:H.docs)==null?void 0:I.source}}};var T,D,F;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    type: 'text',
    label: 'Username',
    placeholder: 'your-username'
  }
}`,...(F=(D=n.parameters)==null?void 0:D.docs)==null?void 0:F.source}}};var j,k,U;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    type: 'text',
    label: 'Email',
    placeholder: 'john@example.com',
    error: 'Please enter a valid email address'
  }
}`,...(U=(k=l.parameters)==null?void 0:k.docs)==null?void 0:U.source}}};var W,R,B;i.parameters={...i.parameters,docs:{...(W=i.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    type: 'file',
    label: 'Upload file',
    fileStyleVariant: 'style1'
  }
}`,...(B=(R=i.parameters)==null?void 0:R.docs)==null?void 0:B.source}}};var J,C,M;p.parameters={...p.parameters,docs:{...(J=p.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    type: 'file',
    label: 'Upload file',
    fileStyleVariant: 'style2'
  }
}`,...(M=(C=p.parameters)==null?void 0:C.docs)==null?void 0:M.source}}};var q,G,L;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    type: 'text',
    label: 'Type something',
    placeholder: 'Start typing...'
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await step('Input is visible and empty', async () => {
      await expect(input).toBeVisible();
      await expect(input).toHaveValue('');
    });
    await step('Type into input', async () => {
      await userEvent.type(input, 'Hello, Storybook!');
      await expect(input).toHaveValue('Hello, Storybook!');
    });
  }
}`,...(L=(G=c.parameters)==null?void 0:G.docs)==null?void 0:L.source}}};const te=["Disabled","Text","Email","Password","WithIcon","WithDescription","WithError","FileStyle1","FileStyle2","Interactive"];export{a as Disabled,r as Email,i as FileStyle1,p as FileStyle2,c as Interactive,o as Password,t as Text,n as WithDescription,l as WithError,s as WithIcon,te as __namedExportsOrder,ae as default};
