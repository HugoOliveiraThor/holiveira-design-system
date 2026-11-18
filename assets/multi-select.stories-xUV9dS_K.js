import{j as a}from"./jsx-runtime-EKYJJIwR.js";import{within as ie,expect as I,userEvent as N,waitFor as ge}from"./index-DH-M5T-F.js";import{r as s,R as de}from"./index-BxXVWNx3.js";import{L as we,E as he}from"./label-Ce-X3b0j.js";import{u as ke}from"./use-click-outside-DimfmOMC.js";import{c as w}from"./cn-DCADjnpI.js";import"./_commonjsHelpers-CqkleIqs.js";const x=s.forwardRef(({label:o,options:r,defaultValue:c=[],value:l,onChange:p,placeholder:ue="Select options",error:f,disabled:u,className:me},pe)=>{const v=s.useId(),L=`${v}-listbox`,M=`${v}-error`,E=l!==void 0,[be,xe]=s.useState(c),i=E?l:be,[d,b]=s.useState(!1),[m,y]=s.useState(-1),fe=ke(()=>b(!1)),q=s.useRef(null),T=s.useRef(null),g=s.useCallback(e=>{E||xe(e),p==null||p(e)},[E,p]),V=s.useCallback(e=>{if(u)return;const t=i.includes(e)?i.filter(n=>n!==e):[...i,e];g(t)},[u,i,g]),ve=s.useCallback(e=>{u||g(i.filter(t=>t!==e))},[u,i,g]),ye=s.useCallback(e=>{var t;if(!d){(e.key==="ArrowDown"||e.key==="Enter"||e.key===" ")&&(e.preventDefault(),b(!0),y(0));return}switch(e.key){case"ArrowDown":e.preventDefault(),y(n=>n<r.length-1?n+1:0);break;case"ArrowUp":e.preventDefault(),y(n=>n>0?n-1:r.length-1);break;case"Enter":case" ":e.preventDefault(),m>=0&&V(r[m].value);break;case"Escape":e.preventDefault(),b(!1),(t=q.current)==null||t.focus();break;case"Tab":b(!1);break}},[d,r,m,V]);s.useEffect(()=>{var e;if(d&&m>=0&&T.current){const t=T.current.children[m];t==null||t.focus(),(e=t==null?void 0:t.scrollIntoView)==null||e.call(t,{block:"nearest"})}},[d,m]);const O=r.filter(e=>i.includes(e.value));return a.jsxs("div",{className:w("relative",me),ref:pe,children:[o&&a.jsx(we,{htmlFor:v,children:o}),a.jsxs("div",{ref:fe,className:"relative",onKeyDown:ye,children:[a.jsxs("div",{ref:q,id:v,role:"combobox","aria-expanded":d,"aria-haspopup":"listbox","aria-controls":L,"aria-describedby":f?M:void 0,"aria-label":o||"Multi-select","aria-disabled":u,tabIndex:0,onClick:()=>!u&&b(!d),className:w("border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 flex min-h-[42px] w-full cursor-pointer items-center rounded-[7px] border-[1.5px] bg-transparent px-3 py-2 transition-colors",f&&"border-red-500 focus:border-red-500 dark:border-red-500",u&&"cursor-not-allowed opacity-50"),children:[a.jsxs("div",{className:"flex flex-auto flex-wrap gap-1.5",children:[O.map(e=>a.jsxs("span",{className:"border-stroke bg-gray-2 dark:border-dark-3 dark:bg-dark inline-flex items-center gap-1 rounded-[5px] border-[.5px] px-2 py-0.5 text-sm font-medium",children:[e.label,a.jsx("button",{type:"button",onClick:t=>{t.stopPropagation(),ve(e.value)},className:"ml-0.5 cursor-pointer text-gray-400 hover:text-red-500","aria-label":`Remove ${e.label}`,tabIndex:-1,children:a.jsx("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"currentColor",children:a.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M9.354 3.354a.5.5 0 0 0-.708-.708L6 5.293 3.354 2.646a.5.5 0 1 0-.708.708L5.293 6l-2.647 2.646a.5.5 0 0 0 .708.708L6 6.707l2.646 2.647a.5.5 0 0 0 .708-.708L6.707 6l2.647-2.646Z"})})})]},e.value)),O.length===0&&a.jsx("span",{className:"text-dark-5 dark:text-dark-6 px-1 text-sm",children:ue})]}),a.jsx("button",{type:"button",tabIndex:-1,"aria-label":"Toggle options",className:"text-dark-4 dark:text-dark-6 ml-2 shrink-0",children:a.jsx("svg",{className:w("size-5 transition-transform",d&&"rotate-180"),viewBox:"0 0 20 20",fill:"currentColor",children:a.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M3.691 7.093a.75.75 0 0 1 1.06-.218L9.999 11.677l5.247-4.802a.75.75 0 1 1 .976 1.14l-5.813 5.317a.75.75 0 0 1-.976 0L3.62 8.015a.75.75 0 0 1 .07-1.06Z"})})})]}),d&&a.jsx("ul",{ref:T,id:L,role:"listbox","aria-multiselectable":"true",className:"dark:bg-dark-2 dark:shadow-card absolute top-full left-0 z-40 mt-1 max-h-64 w-full overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black/5",children:r.map((e,t)=>{const n=i.includes(e.value);return a.jsx("li",{role:"option",tabIndex:-1,"aria-selected":n,className:w("border-stroke dark:border-dark-3 cursor-pointer border-b px-4 py-2.5 text-sm transition-colors last:border-b-0",t===m&&"bg-primary/10 text-primary dark:bg-primary/20",n&&"border-l-primary text-primary border-l-2 pl-3.5"),onClick:()=>V(e.value),onMouseEnter:()=>y(t),children:e.label},e.value)})})]}),f&&a.jsx(he,{error:f,id:M})]})});x.displayName="MultiSelect";x.__docgenInfo={description:"",methods:[],displayName:"MultiSelect",props:{label:{required:!1,tsType:{name:"string"},description:""},options:{required:!0,tsType:{name:"Array",elements:[{name:"MultiSelectOption"}],raw:"MultiSelectOption[]"},description:""},defaultValue:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"",defaultValue:{value:"[]",computed:!1}},value:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"string"}],raw:"string[]"},name:"value"}],return:{name:"void"}}},description:""},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Select options'",computed:!1}},error:{required:!1,tsType:{name:"string"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const A=[{value:"react",label:"React"},{value:"vue",label:"Vue"},{value:"angular",label:"Angular"},{value:"svelte",label:"Svelte"},{value:"solid",label:"Solid"}],Ve={title:"Forms/MultiSelect",component:x,tags:["autodocs"],args:{label:"Frameworks",options:A,placeholder:"Select frameworks..."},argTypes:{options:{description:"Array of selectable options.",control:"object",table:{defaultValue:{summary:"[]"}}},value:{description:"Controlled selected values.",control:"object",table:{defaultValue:{summary:"undefined"}}},onChange:{description:"Callback fired when selection changes.",control:!1},placeholder:{description:"Placeholder text when no options are selected.",control:"text",table:{defaultValue:{summary:"Select options"}}},disabled:{description:"Disables the multi-select.",control:"boolean",table:{defaultValue:{summary:"false"}}},searchable:{description:"Enables search/filter within the dropdown.",control:{type:"boolean"},table:{defaultValue:{summary:"false"}}},label:{description:"Label text displayed above the multi-select.",control:"text",table:{defaultValue:{summary:"undefined"}}},error:{description:"Error message displayed below the multi-select.",control:"text",table:{defaultValue:{summary:"undefined"}}},className:{description:"Additional CSS classes.",control:!1}}},h={},k={args:{value:["react","vue"]}},S={args:{disabled:!0},play:async({canvasElement:o,step:r})=>{const c=ie(o);await r("Disabled multi-select cannot be interacted with",async()=>{const l=c.getByRole("combobox");await I(l).toBeDisabled()})}},R={args:{defaultValue:["react"]}},j={args:{value:["react","vue"]}};function Se(){const[o,r]=de.useState(["react","vue","angular"]);return a.jsxs("div",{className:"space-y-3",children:[a.jsx(x,{label:"Select your frameworks",options:A,value:o,onChange:r}),a.jsx("button",{type:"button",onClick:()=>r([]),className:"bg-red/10 text-red rounded-md px-3 py-1 text-sm",children:"Clear all"})]})}const B={render:()=>a.jsx(Se,{})},C={args:{value:["react","svelte","solid"],placeholder:"Select frameworks..."}};function Re(){const[o,r]=de.useState([]);return a.jsx(x,{label:"Choose",options:A.slice(0,3),value:o,onChange:r})}const D={render:()=>a.jsx(Re,{}),play:async({canvasElement:o,step:r})=>{const c=ie(o);await r("Open dropdown",async()=>{const l=c.getByRole("combobox");await N.click(l);const p=c.getByRole("listbox");await I(p).toBeVisible()}),await r("Select an option",async()=>{const l=c.getByRole("option",{name:"React"});await N.click(l),await I(l).toHaveAttribute("aria-selected","true")}),await r("Remove selected option",async()=>{const l=c.getByLabelText(/remove react/i);await N.click(l),await ge(()=>{I(c.queryByLabelText(/remove react/i)).not.toBeInTheDocument()})})}};var F,_,U;h.parameters={...h.parameters,docs:{...(F=h.parameters)==null?void 0:F.docs,source:{originalSource:"{}",...(U=(_=h.parameters)==null?void 0:_.docs)==null?void 0:U.source}}};var $,z,H;k.parameters={...k.parameters,docs:{...($=k.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    value: ['react', 'vue']
  }
}`,...(H=(z=k.parameters)==null?void 0:z.docs)==null?void 0:H.source}}};var K,P,W;S.parameters={...S.parameters,docs:{...(K=S.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('Disabled multi-select cannot be interacted with', async () => {
      const combobox = canvas.getByRole('combobox');
      await expect(combobox).toBeDisabled();
    });
  }
}`,...(W=(P=S.parameters)==null?void 0:P.docs)==null?void 0:W.source}}};var Z,G,J;R.parameters={...R.parameters,docs:{...(Z=R.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    defaultValue: ['react']
  }
}`,...(J=(G=R.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var Q,X,Y;j.parameters={...j.parameters,docs:{...(Q=j.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    value: ['react', 'vue']
  }
}`,...(Y=(X=j.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var ee,ae,te;B.parameters={...B.parameters,docs:{...(ee=B.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => <ClearAllStory />
}`,...(te=(ae=B.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};var re,se,oe;C.parameters={...C.parameters,docs:{...(re=C.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    value: ['react', 'svelte', 'solid'],
    placeholder: 'Select frameworks...'
  }
}`,...(oe=(se=C.parameters)==null?void 0:se.docs)==null?void 0:oe.source}}};var le,ne,ce;D.parameters={...D.parameters,docs:{...(le=D.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: () => <InteractiveMultiSelect />,
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('Open dropdown', async () => {
      const combobox = canvas.getByRole('combobox');
      await userEvent.click(combobox);
      const listbox = canvas.getByRole('listbox');
      await expect(listbox).toBeVisible();
    });
    await step('Select an option', async () => {
      const option = canvas.getByRole('option', {
        name: 'React'
      });
      await userEvent.click(option);
      await expect(option).toHaveAttribute('aria-selected', 'true');
    });
    await step('Remove selected option', async () => {
      const removeButton = canvas.getByLabelText(/remove react/i);
      await userEvent.click(removeButton);
      await waitFor(() => {
        expect(canvas.queryByLabelText(/remove react/i)).not.toBeInTheDocument();
      });
    });
  }
}`,...(ce=(ne=D.parameters)==null?void 0:ne.docs)==null?void 0:ce.source}}};const Ne=["Default","WithSelection","Disabled","Uncontrolled","Controlled","ClearAll","SelectedItemsDisplay","Interactive"];export{B as ClearAll,j as Controlled,h as Default,S as Disabled,D as Interactive,C as SelectedItemsDisplay,R as Uncontrolled,k as WithSelection,Ne as __namedExportsOrder,Ve as default};
