import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{within as O,expect as C,userEvent as I,waitFor as de}from"./index-DH-M5T-F.js";import{r as u,R as ce}from"./index-BxXVWNx3.js";import{u as pe,a as ue}from"./use-focus-restore-D5TP6f6c.js";import{C as me}from"./chevron-down-BFBpl20S.js";import{c as R}from"./cn-DCADjnpI.js";import{u as be}from"./use-click-outside-DimfmOMC.js";import"./_commonjsHelpers-CqkleIqs.js";import"./icon-wrapper-D5BXwZrf.js";const ie=u.createContext(null);function A(){const t=u.useContext(ie);if(!t)throw new Error("useDropdownContext must be used within a Dropdown");return t}function b({children:t,isOpen:r,setIsOpen:n}){const a=u.useRef(r),{save:s,restore:o}=pe();u.useEffect(()=>{!r&&a.current&&o(),a.current=r},[r,o]);function c(){n(!1)}function p(){s(),n(!0)}function l(i){i.key==="Escape"&&c()}return e.jsxs(ie.Provider,{value:{isOpen:r,handleOpen:p,handleClose:c},children:[e.jsx("div",{className:"relative",onKeyDown:l,children:t}),r&&e.jsx("div",{className:"fixed inset-0 z-40",onClick:c,"aria-hidden":"true"})]})}b.displayName="Dropdown";function E({children:t,align:r="center",className:n}){const{isOpen:a,handleClose:s}=A(),o=be(()=>{a&&s()});ue(a,o);const c=u.useCallback(p=>{var T;if(!["ArrowDown","ArrowUp","Home","End"].includes(p.key))return;p.preventDefault();const l=o.current;if(!l)return;const i=l.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])');if(i.length===0)return;const g=Array.from(i).findIndex(le=>le===document.activeElement);let m;switch(p.key){case"ArrowDown":m=g+1<i.length?g+1:0;break;case"ArrowUp":m=g-1>=0?g-1:i.length-1;break;case"Home":m=0;break;case"End":m=i.length-1;break;default:return}(T=i[m])==null||T.focus()},[o]);return a?e.jsx("div",{ref:o,role:"menu","aria-orientation":"vertical",onKeyDown:c,className:R("fade-in-0 zoom-in-95 shadow-theme-lg pointer-events-auto absolute z-99 mt-2 min-w-[260px] origin-top-right rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-[#1E2635]",{"animate-in right-0":r==="end","left-0":r==="start","left-1/2 -translate-x-1/2":r==="center"},n),children:t}):null}E.displayName="DropdownContent";function S({children:t,className:r,chevron:n,...a}){const{handleOpen:s,isOpen:o}=A();return e.jsxs("button",{type:"button",className:R("inline-flex items-center gap-2",r),onClick:s,"aria-expanded":o,"aria-haspopup":"menu","data-state":o?"open":"closed",...a,children:[t,n&&e.jsx(me,{"aria-hidden":"true",className:R("h-5 w-5 transition-transform duration-200 ease-in-out",o&&"rotate-180")})]})}S.displayName="DropdownTrigger";function N({children:t}){const{handleClose:r}=A();return e.jsx("button",{type:"button",onClick:r,className:"w-full text-left",children:t})}N.displayName="DropdownClose";b.__docgenInfo={description:`Dropdown container with context-based state. Compound with
DropdownTrigger, DropdownContent, and DropdownClose sub-components.
Fully controlled — parent manages open state.
@public`,methods:[],displayName:"Dropdown",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},isOpen:{required:!0,tsType:{name:"boolean"},description:""},setIsOpen:{required:!0,tsType:{name:"SetStateActionType",elements:[{name:"boolean"}],raw:"SetStateActionType<boolean>"},description:""}}};E.__docgenInfo={description:'Dropdown menu panel. Visible only when parent Dropdown is open.\nRenders with `role="menu"` and click-outside dismiss via useClickOutside.\n@public',methods:[],displayName:"DropdownContent",props:{align:{required:!1,tsType:{name:"union",raw:"'start' | 'end' | 'center'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'end'"},{name:"literal",value:"'center'"}]},description:"",defaultValue:{value:"'center'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};S.__docgenInfo={description:`Button that toggles the dropdown open/closed.
Renders with aria-expanded and aria-haspopup attributes.
Optionally renders a trailing chevron that rotates 180° when open.
@public`,methods:[],displayName:"DropdownTrigger",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""},chevron:{required:!1,tsType:{name:"boolean"},description:""}}};N.__docgenInfo={description:`Element that closes the dropdown on click.
@public`,methods:[],displayName:"DropdownClose",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""}}};function d({triggerLabel:t,items:r,hint:n,disabled:a,dividerAfter:s,chevron:o}){const[c,p]=u.useState(!1);return e.jsxs(b,{isOpen:c,setIsOpen:p,children:[e.jsx(S,{className:"border-stroke dark:border-dark-3 dark:bg-dark-2 flex items-center gap-2 rounded-lg border px-4 py-2",disabled:a,chevron:o,children:t}),e.jsxs(E,{className:"min-w-[240px]",children:[n&&e.jsx("p",{className:"px-3 py-2 text-sm text-neutral-500",children:n}),r.map((l,i)=>e.jsxs(ce.Fragment,{children:[s!==void 0&&i===s&&e.jsx("hr",{className:"border-stroke dark:border-dark-3 my-1 border-t"}),e.jsx(N,{children:e.jsxs("button",{className:"dark:hover:bg-dark-3 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left hover:bg-neutral-100",children:[l.icon,e.jsx("span",{children:l.label})]})})]},l.label))]})]})}const je={title:"Primitives/Dropdown",component:b,tags:["autodocs"],argTypes:{isOpen:{description:"Controlled open state of the dropdown.",control:{type:"boolean"}},children:{description:"Content composed with DropdownTrigger and DropdownContent.",control:!1}}},w={render:()=>e.jsx(d,{triggerLabel:"Menu",items:[{label:"Profile"},{label:"Settings"},{label:"Logout"}],chevron:!0})},h={render:()=>{function t(){const[r,n]=u.useState(!0);return e.jsxs(b,{isOpen:r,setIsOpen:n,children:[e.jsx(S,{className:"border-stroke dark:border-dark-3 dark:bg-dark-2 flex items-center gap-2 rounded-lg border px-4 py-2",chevron:!0,children:"Menu"}),e.jsx(E,{children:[{label:"Profile"},{label:"Settings"},{label:"Logout"}].map(a=>e.jsx(N,{children:e.jsx("button",{className:"dark:hover:bg-dark-3 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left hover:bg-neutral-100",children:e.jsx("span",{children:a.label})})},a.label))})]})}return e.jsx(t,{})}},y={render:()=>e.jsx(d,{triggerLabel:"Menu",items:[{label:"Profile"},{label:"Settings"},{label:"Logout"}],disabled:!0}),play:async({canvasElement:t,step:r})=>{const n=O(t);await r("Disabled dropdown trigger cannot be clicked",async()=>{const a=n.getByRole("button",{name:/menu/i});await C(a).toBeDisabled()})}},x={render:()=>e.jsx(d,{triggerLabel:"Menu",items:[{label:"Edit"},{label:"Duplicate"},{label:"Delete"},{label:"Separated action"}],dividerAfter:2,chevron:!0})},D={render:()=>e.jsx(d,{triggerLabel:"Actions",items:[{label:"Edit",icon:e.jsx("span",{"aria-hidden":"true",children:"✏️"})},{label:"Duplicate",icon:e.jsx("span",{"aria-hidden":"true",children:"📋"})},{label:"Delete",icon:e.jsx("span",{"aria-hidden":"true",children:"🗑️"})}],chevron:!0})},f={render:()=>e.jsx(d,{triggerLabel:"Actions",items:[{label:"Edit",icon:e.jsx("span",{"aria-hidden":"true",children:"✏️"})},{label:"Duplicate",icon:e.jsx("span",{"aria-hidden":"true",children:"📋"})},{label:"Delete",icon:e.jsx("span",{"aria-hidden":"true",children:"🗑️"})},{label:"Separated action",icon:e.jsx("span",{"aria-hidden":"true",children:"↪️"})}],dividerAfter:2,chevron:!0})},v={render:()=>e.jsx(d,{triggerLabel:"Actions",items:[{label:"Edit"},{label:"Duplicate"},{label:"Delete"}],chevron:!0})},k={render:()=>e.jsx(d,{triggerLabel:"Open Menu",items:[{label:"Close"}],hint:"Press Escape to close"})},j={render:()=>e.jsx(d,{triggerLabel:"Open",items:[{label:"Item 1"},{label:"Item 2"},{label:"Item 3"}],chevron:!0}),play:async({canvasElement:t,step:r})=>{const n=O(t),a=n.getByRole("button",{name:/open/i});await r("Click trigger to open dropdown",async()=>{await I.click(a);const s=n.getByRole("menu");await C(s).toBeVisible()}),await r("Navigate with ArrowDown",async()=>{const s=n.getByRole("menu");await I.keyboard("{ArrowDown}");const o=O(s).getAllByRole("button");await C(o[0]).toHaveFocus()}),await r("Close with Escape",async()=>{await I.keyboard("{Escape}"),await de(()=>{C(n.queryByRole("menu")).not.toBeInTheDocument()})})}};var L,B,q;w.parameters={...w.parameters,docs:{...(L=w.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <DropdownStory triggerLabel="Menu" items={[{
    label: 'Profile'
  }, {
    label: 'Settings'
  }, {
    label: 'Logout'
  }]} chevron />
}`,...(q=(B=w.parameters)==null?void 0:B.docs)==null?void 0:q.source}}};var M,P,_;h.parameters={...h.parameters,docs:{...(M=h.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => {
    function OpenDropdown() {
      const [isOpen, setIsOpen] = useState(true);
      return <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
          <DropdownTrigger className="border-stroke dark:border-dark-3 dark:bg-dark-2 flex items-center gap-2 rounded-lg border px-4 py-2" chevron>
            Menu
          </DropdownTrigger>
          <DropdownContent>
            {[{
            label: 'Profile'
          }, {
            label: 'Settings'
          }, {
            label: 'Logout'
          }].map(item => <DropdownClose key={item.label}>
                <button className="dark:hover:bg-dark-3 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left hover:bg-neutral-100">
                  <span>{item.label}</span>
                </button>
              </DropdownClose>)}
          </DropdownContent>
        </Dropdown>;
    }
    return <OpenDropdown />;
  }
}`,...(_=(P=h.parameters)==null?void 0:P.docs)==null?void 0:_.source}}};var F,K,W;y.parameters={...y.parameters,docs:{...(F=y.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <DropdownStory triggerLabel="Menu" items={[{
    label: 'Profile'
  }, {
    label: 'Settings'
  }, {
    label: 'Logout'
  }]} disabled />,
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('Disabled dropdown trigger cannot be clicked', async () => {
      const trigger = canvas.getByRole('button', {
        name: /menu/i
      });
      await expect(trigger).toBeDisabled();
    });
  }
}`,...(W=(K=y.parameters)==null?void 0:K.docs)==null?void 0:W.source}}};var H,V,z;x.parameters={...x.parameters,docs:{...(H=x.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <DropdownStory triggerLabel="Menu" items={[{
    label: 'Edit'
  }, {
    label: 'Duplicate'
  }, {
    label: 'Delete'
  }, {
    label: 'Separated action'
  }]} dividerAfter={2} chevron />
}`,...(z=(V=x.parameters)==null?void 0:V.docs)==null?void 0:z.source}}};var U,G,J;D.parameters={...D.parameters,docs:{...(U=D.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => <DropdownStory triggerLabel="Actions" items={[{
    label: 'Edit',
    icon: <span aria-hidden="true">✏️</span>
  }, {
    label: 'Duplicate',
    icon: <span aria-hidden="true">📋</span>
  }, {
    label: 'Delete',
    icon: <span aria-hidden="true">🗑️</span>
  }]} chevron />
}`,...(J=(G=D.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var Q,X,Y;f.parameters={...f.parameters,docs:{...(Q=f.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <DropdownStory triggerLabel="Actions" items={[{
    label: 'Edit',
    icon: <span aria-hidden="true">✏️</span>
  }, {
    label: 'Duplicate',
    icon: <span aria-hidden="true">📋</span>
  }, {
    label: 'Delete',
    icon: <span aria-hidden="true">🗑️</span>
  }, {
    label: 'Separated action',
    icon: <span aria-hidden="true">↪️</span>
  }]} dividerAfter={2} chevron />
}`,...(Y=(X=f.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,$,ee;v.parameters={...v.parameters,docs:{...(Z=v.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => <DropdownStory triggerLabel="Actions" items={[{
    label: 'Edit'
  }, {
    label: 'Duplicate'
  }, {
    label: 'Delete'
  }]} chevron />
}`,...(ee=($=v.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var re,te,ne;k.parameters={...k.parameters,docs:{...(re=k.parameters)==null?void 0:re.docs,source:{originalSource:`{
  render: () => <DropdownStory triggerLabel="Open Menu" items={[{
    label: 'Close'
  }]} hint="Press Escape to close" />
}`,...(ne=(te=k.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var ae,oe,se;j.parameters={...j.parameters,docs:{...(ae=j.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: () => <DropdownStory triggerLabel="Open" items={[{
    label: 'Item 1'
  }, {
    label: 'Item 2'
  }, {
    label: 'Item 3'
  }]} chevron />,
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: /open/i
    });
    await step('Click trigger to open dropdown', async () => {
      await userEvent.click(trigger);
      const menu = canvas.getByRole('menu');
      await expect(menu).toBeVisible();
    });
    await step('Navigate with ArrowDown', async () => {
      const menu = canvas.getByRole('menu');
      await userEvent.keyboard('{ArrowDown}');
      const items = within(menu).getAllByRole('button');
      await expect(items[0]).toHaveFocus();
    });
    await step('Close with Escape', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(canvas.queryByRole('menu')).not.toBeInTheDocument();
      });
    });
  }
}`,...(se=(oe=j.parameters)==null?void 0:oe.docs)==null?void 0:se.source}}};const Ce=["Default","Open","Disabled","WithDivider","WithIcons","WithIconsDivider","KeyboardNavigation","CloseOnEscape","Interactive"];export{k as CloseOnEscape,w as Default,y as Disabled,j as Interactive,v as KeyboardNavigation,h as Open,x as WithDivider,D as WithIcons,f as WithIconsDivider,Ce as __namedExportsOrder,je as default};
