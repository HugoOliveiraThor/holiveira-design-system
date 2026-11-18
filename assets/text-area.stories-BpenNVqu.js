import{within as $,expect as u,userEvent as z}from"./index-DH-M5T-F.js";import{j as a}from"./jsx-runtime-EKYJJIwR.js";import{r as g}from"./index-BxXVWNx3.js";import{c as v}from"./cn-DCADjnpI.js";import"./_commonjsHelpers-CqkleIqs.js";const b=g.forwardRef(({label:p,placeholder:r,required:x,disabled:e,active:F,className:M,icon:h,error:t,...O},Y)=>{const m=g.useId(),y=`${m}-error`;return a.jsxs("div",{className:v(M),children:[a.jsx("label",{htmlFor:m,className:"text-body-sm text-dark mb-3 block font-medium dark:text-white",children:p}),a.jsxs("div",{className:"relative mt-3 [&_svg]:pointer-events-none [&_svg]:absolute [&_svg]:top-5.5 [&_svg]:left-5.5",children:[a.jsx("textarea",{ref:Y,id:m,rows:6,placeholder:r,"aria-describedby":t?y:void 0,className:v("border-stroke text-dark focus:border-primary disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary w-full rounded-lg border-[1.5px] bg-transparent px-5.5 py-3 transition outline-none disabled:cursor-default dark:text-white",h&&"py-5 pr-5 pl-13",t&&"border-red focus:border-red"),required:x,disabled:e,"data-active":F||void 0,...O}),h]}),t&&a.jsx("p",{id:y,className:"text-body-xs text-red mt-1",children:t})]})});b.displayName="TextArea";b.__docgenInfo={description:`Textarea with label, icon slot, and error state.
@public`,methods:[],displayName:"TextArea",props:{label:{required:!0,tsType:{name:"string"},description:""},active:{required:!1,tsType:{name:"boolean"},description:""},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},error:{required:!1,tsType:{name:"string"},description:""},value:{required:!1,tsType:{name:"string"},description:""},defaultValue:{required:!1,tsType:{name:"string"},description:""}}};const X={title:"Primitives/TextArea",component:b,tags:["autodocs"],args:{label:"Message",placeholder:"Write your message here..."},argTypes:{label:{description:"Text label displayed above the textarea.",control:{type:"text"}},placeholder:{description:"Placeholder text inside the textarea.",control:{type:"text"}},disabled:{description:"Prevents user interaction.",control:{type:"boolean"},table:{defaultValue:{summary:"false"}}},rows:{description:"Number of visible text rows.",control:{type:"number"},table:{defaultValue:{summary:"4"}}},maxLength:{description:"Maximum character count allowed.",control:{type:"number"}},error:{description:"Error message displayed below the textarea.",control:{type:"text"}},icon:{description:"Optional icon rendered inside the textarea.",control:!1},onChange:{description:"Callback fired when the textarea value changes. Receives `React.ChangeEvent<HTMLTextAreaElement>`.",control:!1}}},s={args:{}},o={args:{label:"Feedback",placeholder:"Write your message here...",disabled:!0}},n={args:{label:"Comment",placeholder:"Type your comment here..."}},l={args:{label:"Your feedback",placeholder:"Tell us what you think..."}},i={args:{label:"Comment",placeholder:"Write a comment...",error:"Comment must be at least 10 characters"}},c={args:{label:"Bio",placeholder:"Tell us about yourself...",rows:3}},d={args:{label:"Write something",placeholder:"Start typing..."},play:async({canvasElement:p,step:r})=>{const e=$(p).getByRole("textbox");await r("Textarea is visible and empty",async()=>{await u(e).toBeVisible(),await u(e).toHaveValue("")}),await r("Type into textarea",async()=>{await z.type(e,"This is a sample text."),await u(e).toHaveValue("This is a sample text.")})}};var f,w,T;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {}
}`,...(T=(w=s.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};var k,E,W;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    label: 'Feedback',
    placeholder: 'Write your message here...',
    disabled: true
  }
}`,...(W=(E=o.parameters)==null?void 0:E.docs)==null?void 0:W.source}}};var R,C,N;n.parameters={...n.parameters,docs:{...(R=n.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    label: 'Comment',
    placeholder: 'Type your comment here...'
  }
}`,...(N=(C=n.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};var S,V,_;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: 'Your feedback',
    placeholder: 'Tell us what you think...'
  }
}`,...(_=(V=l.parameters)==null?void 0:V.docs)==null?void 0:_.source}}};var j,q,B;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    label: 'Comment',
    placeholder: 'Write a comment...',
    error: 'Comment must be at least 10 characters'
  }
}`,...(B=(q=i.parameters)==null?void 0:q.docs)==null?void 0:B.source}}};var A,H,I;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    rows: 3
  }
}`,...(I=(H=c.parameters)==null?void 0:H.docs)==null?void 0:I.source}}};var P,D,L;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    label: 'Write something',
    placeholder: 'Start typing...'
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    await step('Textarea is visible and empty', async () => {
      await expect(textarea).toBeVisible();
      await expect(textarea).toHaveValue('');
    });
    await step('Type into textarea', async () => {
      await userEvent.type(textarea, 'This is a sample text.');
      await expect(textarea).toHaveValue('This is a sample text.');
    });
  }
}`,...(L=(D=d.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};const Z=["Default","Disabled","WithPlaceholder","WithLabel","WithError","CustomRows","Interactive"];export{c as CustomRows,s as Default,o as Disabled,d as Interactive,i as WithError,l as WithLabel,n as WithPlaceholder,Z as __namedExportsOrder,X as default};
