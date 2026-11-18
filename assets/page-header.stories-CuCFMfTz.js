import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{within as T,expect as p}from"./index-DH-M5T-F.js";import{c as R}from"./cn-DCADjnpI.js";const m=({title:t,breadcrumb:a,className:n,...r})=>{const i=a&&a.length>0?a:[{label:"Dashboard",href:"/"},{label:t}];return e.jsxs("div",{className:R("mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",n),...r,children:[e.jsx("h2",{className:"text-dark text-[26px] leading-[30px] font-bold dark:text-white",children:t}),e.jsx("nav",{"aria-label":"Breadcrumb",children:e.jsx("ol",{className:"flex items-center gap-2",children:i.map((s,D)=>{const u=D===i.length-1,H=s.href?e.jsxs("a",{className:"font-medium",href:s.href,children:[s.label,!u&&" /"]}):e.jsx("span",{className:"text-primary dark:text-blue-light-400 font-medium",children:s.label});return e.jsx("li",{"aria-current":u?"page":void 0,children:H},s.label)})})})]})};m.displayName="PageHeader";m.__docgenInfo={description:"",methods:[],displayName:"PageHeader",props:{title:{required:!0,tsType:{name:"string"},description:""},breadcrumb:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ label: string; href?: string }",signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"href",value:{name:"string",required:!1}}]}}],raw:"{ label: string; href?: string }[]"},description:""}},composes:["HTMLAttributes"]};const V={title:"UI/PageHeader",component:m,tags:["autodocs"],args:{title:"Default Page"},argTypes:{title:{description:"Page title rendered as the h2 heading.",control:{type:"text"}},breadcrumb:{description:'Optional breadcrumb trail items. Defaults to "Dashboard / {title}".',control:!1},className:{description:"Additional CSS classes.",control:!1}}},l={args:{title:"Dashboard"}},o={args:{title:"Profile",breadcrumb:[{label:"Dashboard",href:"/"},{label:"Settings",href:"/settings"},{label:"Profile"}]}},c={args:{title:"A very long page name that spans multiple lines in the page header layout"}},d={render:t=>e.jsx(m,{...t}),args:{title:"Analytics",breadcrumb:[{label:"Dashboard",href:"/"},{label:"Analytics"}]}},g={args:{title:"Interactive"},play:async({canvasElement:t,step:a})=>{const n=T(t);await a("PageHeader is visible with page name",async()=>{const r=n.getByRole("heading",{name:/interactive/i});await p(r).toBeVisible()}),await a("Navigation link is present",async()=>{const r=n.getByRole("link",{name:/dashboard/i});await p(r).toBeVisible()}),await a("Current page is marked with aria-current",async()=>{const i=n.getByRole("navigation",{name:/breadcrumb/i}).getByText("Interactive").closest("li");await p(i).toHaveAttribute("aria-current","page")})}};var h,b,y;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    title: 'Dashboard'
  }
}`,...(y=(b=l.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var f,v,x;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    title: 'Profile',
    breadcrumb: [{
      label: 'Dashboard',
      href: '/'
    }, {
      label: 'Settings',
      href: '/settings'
    }, {
      label: 'Profile'
    }]
  }
}`,...(x=(v=o.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var w,k,P;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    title: 'A very long page name that spans multiple lines in the page header layout'
  }
}`,...(P=(k=c.parameters)==null?void 0:k.docs)==null?void 0:P.source}}};var B,j,N;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: args => <PageHeader {...args} />,
  args: {
    title: 'Analytics',
    breadcrumb: [{
      label: 'Dashboard',
      href: '/'
    }, {
      label: 'Analytics'
    }]
  }
}`,...(N=(j=d.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};var A,I,S;g.parameters={...g.parameters,docs:{...(A=g.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    title: 'Interactive'
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('PageHeader is visible with page name', async () => {
      const heading = canvas.getByRole('heading', {
        name: /interactive/i
      });
      await expect(heading).toBeVisible();
    });
    await step('Navigation link is present', async () => {
      const link = canvas.getByRole('link', {
        name: /dashboard/i
      });
      await expect(link).toBeVisible();
    });
    await step('Current page is marked with aria-current', async () => {
      const current = canvas.getByRole('navigation', {
        name: /breadcrumb/i
      }).getByText('Interactive');
      const listItem = current.closest('li');
      await expect(listItem).toHaveAttribute('aria-current', 'page');
    });
  }
}`,...(S=(I=g.parameters)==null?void 0:I.docs)==null?void 0:S.source}}};const _=["SingleLevel","Nested","LongPaths","WithTrail","Interactive"];export{g as Interactive,c as LongPaths,o as Nested,l as SingleLevel,d as WithTrail,_ as __namedExportsOrder,V as default};
