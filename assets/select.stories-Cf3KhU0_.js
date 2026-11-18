import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{within as _,expect as h,userEvent as K}from"./index-DH-M5T-F.js";import{r as v}from"./index-BxXVWNx3.js";import{c as f}from"./cn-DCADjnpI.js";import{I as M}from"./icon-wrapper-D5BXwZrf.js";import"./_commonjsHelpers-CqkleIqs.js";const y=v.forwardRef(({size:n,title:t,...r},a)=>e.jsx(M,{ref:a,viewBox:"0 0 22 22",size:n,title:t,...r,children:e.jsx("path",{fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd",d:"M10.551 7.728a.687.687 0 01.895 0l6.417 5.5a.687.687 0 11-.895 1.044l-5.97-5.117-5.969 5.117a.687.687 0 01-.894-1.044l6.416-5.5z"})}));y.displayName="ChevronUpIcon";y.__docgenInfo={description:"Chevron pointing up @public",methods:[],displayName:"ChevronUpIcon"};const g=v.forwardRef(({items:n,label:t,defaultValue:r,placeholder:a,prefixIcon:u,error:s,className:z,...A},H)=>{const m=v.useId(),x=`${m}-error`;return e.jsxs("div",{className:f("space-y-3",z),children:[e.jsx("label",{htmlFor:m,className:"text-body-sm text-dark block font-medium dark:text-white",children:t}),e.jsxs("div",{className:"relative",children:[u&&e.jsx("div",{className:"absolute top-1/2 left-4 -translate-y-1/2",children:u}),e.jsxs("select",{ref:H,id:m,defaultValue:r??"","aria-describedby":s?x:void 0,className:f("border-stroke focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary [&>option]:text-dark-5 dark:[&>option]:text-dark-6 w-full appearance-none rounded-lg border bg-transparent px-5.5 py-3 transition outline-none","has-[option:checked]:text-dark dark:has-[option:checked]:text-white",u&&"pl-11.5",s&&"border-red focus:border-red"),...A,children:[a&&e.jsx("option",{value:"",disabled:!0,hidden:!0,children:a}),n.map(b=>e.jsx("option",{value:b.value,children:b.label},b.value))]}),e.jsx(y,{className:"pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 rotate-180"}),s&&e.jsx("p",{id:x,className:"text-body-xs text-red mt-1",children:s})]})]})});g.displayName="Select";g.__docgenInfo={description:`Native select with typed items, placeholder, prefix icon, and error state.
@public`,methods:[],displayName:"Select",props:{label:{required:!0,tsType:{name:"string"},description:""},items:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  value: string;
  label: string;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0}},{key:"label",value:{name:"string",required:!0}}]}}],raw:"SelectItem[]"},description:""},prefixIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},error:{required:!1,tsType:{name:"string"},description:""}}};const F=[{value:"option-1",label:"Option 1"},{value:"option-2",label:"Option 2"},{value:"option-3",label:"Option 3"}],Y={title:"Primitives/Select",component:g,tags:["autodocs"],args:{label:"Select an option",items:F},argTypes:{label:{description:"Text label displayed above the select.",control:{type:"text"},table:{defaultValue:{summary:"undefined"}}},items:{description:"Array of options with `value` and `label` properties.",control:!1},placeholder:{description:"Placeholder text shown when no option is selected.",control:{type:"text"},table:{defaultValue:{summary:"undefined"}}},prefixIcon:{description:"Optional icon rendered before the select.",control:!1},disabled:{description:"Prevents user interaction.",control:{type:"boolean"},table:{defaultValue:{summary:"false"}}},error:{description:"Error message displayed below the select.",control:{type:"text"},table:{defaultValue:{summary:"undefined"}}},onChange:{description:"Callback fired when the selected option changes. Receives `React.ChangeEvent<HTMLSelectElement>`.",control:!1}}},o={args:{}},l={args:{placeholder:"Choose one...",disabled:!0},play:async({canvasElement:n,step:t})=>{const r=_(n);await t("Disabled select cannot be interacted with",async()=>{const a=r.getByRole("combobox");await h(a).toBeDisabled()})}},c={args:{placeholder:"Choose one..."}},i={args:{label:"Country",items:[{value:"br",label:"Brazil"},{value:"us",label:"United States"},{value:"uk",label:"United Kingdom"}],prefixIcon:e.jsx("span",{children:"🌎"})}},d={args:{label:"Category",placeholder:"Select category",error:"Please select a category"}},p={args:{label:"Choose",items:[{value:"a",label:"Option A"},{value:"b",label:"Option B"},{value:"c",label:"Option C"}]},play:async({canvasElement:n,step:t})=>{const r=_(n);await t("Select is visible",async()=>{const a=r.getByRole("combobox");await h(a).toBeVisible()}),await t("Select an option",async()=>{const a=r.getByRole("combobox");await K.selectOptions(a,"a"),await h(a).toHaveValue("a")})}};var w,k,S;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {}
}`,...(S=(k=o.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};var C,R,I;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    placeholder: 'Choose one...',
    disabled: true
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('Disabled select cannot be interacted with', async () => {
      const select = canvas.getByRole('combobox');
      await expect(select).toBeDisabled();
    });
  }
}`,...(I=(R=l.parameters)==null?void 0:R.docs)==null?void 0:I.source}}};var j,B,E;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    placeholder: 'Choose one...'
  }
}`,...(E=(B=c.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};var N,O,P;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    label: 'Country',
    items: [{
      value: 'br',
      label: 'Brazil'
    }, {
      value: 'us',
      label: 'United States'
    }, {
      value: 'uk',
      label: 'United Kingdom'
    }],
    prefixIcon: <span>&#127758;</span>
  }
}`,...(P=(O=i.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var V,D,T;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    label: 'Category',
    placeholder: 'Select category',
    error: 'Please select a category'
  }
}`,...(T=(D=d.parameters)==null?void 0:D.docs)==null?void 0:T.source}}};var q,U,W;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    label: 'Choose',
    items: [{
      value: 'a',
      label: 'Option A'
    }, {
      value: 'b',
      label: 'Option B'
    }, {
      value: 'c',
      label: 'Option C'
    }]
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('Select is visible', async () => {
      const select = canvas.getByRole('combobox');
      await expect(select).toBeVisible();
    });
    await step('Select an option', async () => {
      const select = canvas.getByRole('combobox');
      await userEvent.selectOptions(select, 'a');
      await expect(select).toHaveValue('a');
    });
  }
}`,...(W=(U=p.parameters)==null?void 0:U.docs)==null?void 0:W.source}}};const Z=["Default","Disabled","WithPlaceholder","WithPrefixIcon","WithError","Interactive"];export{o as Default,l as Disabled,p as Interactive,d as WithError,c as WithPlaceholder,i as WithPrefixIcon,Z as __namedExportsOrder,Y as default};
