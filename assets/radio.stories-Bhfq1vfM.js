import{j as a}from"./jsx-runtime-EKYJJIwR.js";import{within as j,expect as o,userEvent as p}from"./index-DH-M5T-F.js";import{R as t}from"./radio-IjJIeTi1.js";import"./index-BxXVWNx3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cn-DCADjnpI.js";const I={title:"Primitives/Radio",component:t,tags:["autodocs"],args:{label:"Radio option",name:"radio-group"},argTypes:{label:{description:"Text displayed next to the radio button.",control:{type:"text"},table:{defaultValue:{summary:"undefined"}}},value:{description:"Value submitted with the form data.",control:{type:"text"},table:{defaultValue:{summary:"undefined"}}},name:{description:"Group name that links radio buttons together.",control:{type:"text"},table:{defaultValue:{summary:"undefined"}}},variant:{description:"Visual style of the radio indicator.",control:{type:"select"},options:["dot","circle"],table:{defaultValue:{summary:"dot"}}},disabled:{description:"Prevents user interaction.",control:{type:"boolean"},table:{defaultValue:{summary:"false"}}},defaultChecked:{description:"Initial checked state (uncontrolled).",control:{type:"boolean"},table:{defaultValue:{summary:"false"}}},checked:{description:"Controlled checked state.",control:{type:"boolean"},table:{defaultValue:{summary:"undefined"}}},minimal:{description:"Compact minimal style.",control:{type:"boolean"},table:{defaultValue:{summary:"false"}}},onChange:{description:"Callback fired when the selected option changes. Receives `React.ChangeEvent<HTMLInputElement>`.",control:!1}}},s={args:{label:"Selected option",defaultChecked:!0}},i={args:{label:"Unselected option"}},r={args:{label:"Disabled option",disabled:!0},play:async({canvasElement:d,step:n})=>{const u=j(d);await n("Disabled radio cannot be selected",async()=>{const e=u.getByRole("radio");await o(e).toBeDisabled()})}},c={render:()=>a.jsxs("div",{className:"space-y-3",children:[a.jsx(t,{label:"Option A",name:"group",value:"a",defaultChecked:!0}),a.jsx(t,{label:"Option B",name:"group",value:"b"}),a.jsx(t,{label:"Option C",name:"group",value:"c"})]})},l={render:()=>a.jsxs("div",{className:"space-y-3",children:[a.jsx(t,{label:"First option",name:"interactive",value:"first"}),a.jsx(t,{label:"Second option",name:"interactive",value:"second"}),a.jsx(t,{label:"Third option",name:"interactive",value:"third"})]}),play:async({canvasElement:d,step:n})=>{const e=j(d).getAllByRole("radio");await n("First radio can be selected",async()=>{await p.click(e[0]),await o(e[0]).toBeChecked()}),await n("Select second radio, first becomes unchecked",async()=>{await p.click(e[1]),await o(e[1]).toBeChecked(),await o(e[0]).not.toBeChecked()}),await n("Select third radio, second becomes unchecked",async()=>{await p.click(e[2]),await o(e[2]).toBeChecked(),await o(e[1]).not.toBeChecked()})}};var m,b,v;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    label: 'Selected option',
    defaultChecked: true
  }
}`,...(v=(b=s.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var h,y,f;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: 'Unselected option'
  }
}`,...(f=(y=i.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var w,k,g;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    label: 'Disabled option',
    disabled: true
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('Disabled radio cannot be selected', async () => {
      const radio = canvas.getByRole('radio');
      await expect(radio).toBeDisabled();
    });
  }
}`,...(g=(k=r.parameters)==null?void 0:k.docs)==null?void 0:g.source}}};var x,C,R;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div className="space-y-3">
      <Radio label="Option A" name="group" value="a" defaultChecked />
      <Radio label="Option B" name="group" value="b" />
      <Radio label="Option C" name="group" value="c" />
    </div>
}`,...(R=(C=c.parameters)==null?void 0:C.docs)==null?void 0:R.source}}};var B,S,E;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div className="space-y-3">
      <Radio label="First option" name="interactive" value="first" />
      <Radio label="Second option" name="interactive" value="second" />
      <Radio label="Third option" name="interactive" value="third" />
    </div>,
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const radios = canvas.getAllByRole('radio');
    await step('First radio can be selected', async () => {
      await userEvent.click(radios[0]);
      await expect(radios[0]).toBeChecked();
    });
    await step('Select second radio, first becomes unchecked', async () => {
      await userEvent.click(radios[1]);
      await expect(radios[1]).toBeChecked();
      await expect(radios[0]).not.toBeChecked();
    });
    await step('Select third radio, second becomes unchecked', async () => {
      await userEvent.click(radios[2]);
      await expect(radios[2]).toBeChecked();
      await expect(radios[1]).not.toBeChecked();
    });
  }
}`,...(E=(S=l.parameters)==null?void 0:S.docs)==null?void 0:E.source}}};const N=["Selected","Default","Disabled","RadioGroup","Interactive"];export{i as Default,r as Disabled,l as Interactive,c as RadioGroup,s as Selected,N as __namedExportsOrder,I as default};
