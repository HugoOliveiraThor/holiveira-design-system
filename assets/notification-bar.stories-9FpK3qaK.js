import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{B as c}from"./button-CTnCkG2H.js";import{r as _}from"./index-BxXVWNx3.js";import{X as M}from"./x-0FJdkYUO.js";import{A as X,a as Z}from"./alert-warning-CiIlDSRa.js";import{C as O}from"./check-8xR-Yow7.js";import{c as u}from"./cn-DCADjnpI.js";import{C as P}from"./close-BARKxc22.js";import{c as V}from"./index-Da1oAmHU.js";import"./_commonjsHelpers-CqkleIqs.js";import"./icon-wrapper-D5BXwZrf.js";const F=V("shadow-theme-sm flex items-center justify-between gap-3 rounded-md border-b-4 bg-white p-3 dark:bg-[#1E2634]",{variants:{variant:{success:"border-success-500",info:"border-blue-light-500",warning:"border-warning-500",error:"border-error-500"}},defaultVariants:{variant:"success"}}),G=V("flex h-10 w-10 items-center justify-center rounded-lg",{variants:{variant:{success:"bg-success-50 text-success-600 dark:bg-success-500/[0.15] dark:text-success-500",info:"bg-blue-light-50 text-blue-light-500 dark:bg-blue-light-500/[0.15]",warning:"bg-warning-50 text-warning-600 dark:bg-warning-500/[0.15] dark:text-orange-400",error:"bg-error-50 text-error-600 dark:bg-error-500/[0.15] dark:text-error-500"}},defaultVariants:{variant:"success"}}),J={success:O,info:Z,warning:X,error:M},d=_.forwardRef(({variant:t="success",title:W,closable:T=!0,onClose:m,className:U,...z},D)=>{const H=J[t??"success"];return e.jsxs("div",{ref:D,role:"status",className:u(F({variant:t}),U),...z,children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:u(G({variant:t})),children:e.jsx(H,{size:24})}),e.jsx("h4",{className:"text-sm text-gray-800 sm:text-base dark:text-white/90",children:W})]}),T&&m&&e.jsx("button",{type:"button","aria-label":"Close notification",className:"text-gray-400 hover:text-gray-800 dark:hover:text-white/90",onClick:m,children:e.jsx(P,{size:24})})]})});d.displayName="NotificationBar";d.__docgenInfo={description:`Compact inline status notification with tinted icon box, title, and optional close.
@public`,methods:[],displayName:"NotificationBar",props:{title:{required:!0,tsType:{name:"string"},description:""},closable:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},variant:{defaultValue:{value:"'success'",computed:!1},required:!1}}};const ie={title:"Primitives/NotificationBar",component:d,tags:["autodocs"],args:{title:"Something happened"},argTypes:{variant:{description:"Status variant.",control:{type:"select"},options:["success","info","warning","error"],table:{defaultValue:{summary:"success"}}},title:{description:"Notification message.",control:{type:"text"}},closable:{description:"Show the close button.",control:{type:"boolean"},table:{defaultValue:{summary:"true"}}}}},r={args:{variant:"success",title:"Success! Action Completed"}},a={args:{variant:"info",title:"Heads Up! New Information"}},s={args:{variant:"warning",title:"Alert: Double Check Required"}},n={args:{variant:"error",title:"Something Went Wrong"}},o={args:{variant:"info",title:"Heads Up! New Information",closable:!1}},i={render:t=>e.jsxs("div",{className:"flex w-full max-w-[607px] items-start gap-3 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-[#1E2634]",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("h5",{className:"mb-1 text-base font-medium text-gray-800 dark:text-white/90",children:"New update! Available"}),e.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"Enjoy improved functionality and enhancements."})]}),e.jsxs("div",{className:"flex w-full items-center gap-3 sm:max-w-fit",children:[e.jsx(c,{variant:"outline",children:"Later"}),e.jsx(c,{children:"Update Now"})]})]})},l={render:t=>e.jsxs("div",{className:"relative w-full max-w-[577px] rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#1E2634]",children:[e.jsx("button",{type:"button","aria-label":"Close",className:"absolute top-3 right-3 text-gray-400 hover:text-gray-800 dark:hover:text-white/90",children:e.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",children:e.jsx("path",{fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd",d:"M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"})})}),e.jsx("p",{className:"mb-6 pr-4 text-sm text-gray-700 dark:text-gray-400",children:'By Clicking on "Accept", you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.'}),e.jsxs("div",{className:"flex flex-col justify-end gap-6 sm:flex-row sm:items-center sm:gap-4",children:[e.jsx("button",{type:"button",className:"text-left text-sm font-medium text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200",children:"Cookie Settings"}),e.jsxs("div",{className:"flex w-full items-center gap-3 sm:w-auto",children:[e.jsx(c,{variant:"outline",className:"w-full sm:w-auto",children:"Deny All"}),e.jsx(c,{className:"w-full sm:w-auto",children:"Accept All"})]})]})]})};var g,p,x;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    title: 'Success! Action Completed'
  }
}`,...(x=(p=r.parameters)==null?void 0:p.docs)==null?void 0:x.source}}};var f,b,h;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    title: 'Heads Up! New Information'
  }
}`,...(h=(b=a.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var v,y,w;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    variant: 'warning',
    title: 'Alert: Double Check Required'
  }
}`,...(w=(y=s.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var N,k,C;n.parameters={...n.parameters,docs:{...(N=n.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    variant: 'error',
    title: 'Something Went Wrong'
  }
}`,...(C=(k=n.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var j,B,A;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    title: 'Heads Up! New Information',
    closable: false
  }
}`,...(A=(B=o.parameters)==null?void 0:B.docs)==null?void 0:A.source}}};var L,S,I;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <div className="flex w-full max-w-[607px] items-start gap-3 rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-[#1E2634]">
      <div className="flex-1">
        <h5 className="mb-1 text-base font-medium text-gray-800 dark:text-white/90">
          New update! Available
        </h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enjoy improved functionality and enhancements.
        </p>
      </div>
      <div className="flex w-full items-center gap-3 sm:max-w-fit">
        <Button variant="outline">Later</Button>
        <Button>Update Now</Button>
      </div>
    </div>
}`,...(I=(S=i.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var E,q,R;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => <div className="relative w-full max-w-[577px] rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#1E2634]">
      <button type="button" aria-label="Close" className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 dark:hover:text-white/90">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z" />
        </svg>
      </button>
      <p className="mb-6 pr-4 text-sm text-gray-700 dark:text-gray-400">
        By Clicking on &quot;Accept&quot;, you agree to the storing of cookies on your device to
        enhance site navigation, analyze site usage, and assist in our marketing efforts.
      </p>
      <div className="flex flex-col justify-end gap-6 sm:flex-row sm:items-center sm:gap-4">
        <button type="button" className="text-left text-sm font-medium text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
          Cookie Settings
        </button>
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            Deny All
          </Button>
          <Button className="w-full sm:w-auto">Accept All</Button>
        </div>
      </div>
    </div>
}`,...(R=(q=l.parameters)==null?void 0:q.docs)==null?void 0:R.source}}};const le=["Success","Info","Warning","Error","NotClosable","AnnouncementBar","ToastNotification"];export{i as AnnouncementBar,n as Error,a as Info,o as NotClosable,r as Success,l as ToastNotification,s as Warning,le as __namedExportsOrder,ie as default};
