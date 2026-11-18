import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{r as c}from"./index-BxXVWNx3.js";import{C as m}from"./card-BQ58Ck17.js";import{C as u}from"./card-title-Dqpd9uV0.js";import{T as x,a as p,b as l,c as t,d as b,e as n}from"./table-DYyKo_tD.js";import{A as g}from"./avatar-Dud72ywL.js";import{D as f,a as y,M as j,b as h}from"./dropdown-B9KRFXUn.js";import{B as T}from"./badge-XDFdrAMp.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cn-DCADjnpI.js";import"./index-Da1oAmHU.js";import"./icon-wrapper-D5BXwZrf.js";import"./use-focus-restore-D5TP6f6c.js";import"./chevron-down-BFBpl20S.js";import"./use-click-outside-DimfmOMC.js";const w=[{user:"Wilson Gouse",campaign:"Grow your brand by...",sub:"Ads campaign",status:"Success"},{user:"Wilson Gouse",campaign:"Make Better Ideas...",sub:"Ads campaign",status:"Pending"},{user:"Wilson Gouse",campaign:"Increase your website tra...",sub:"Ads campaign",status:"Success"}];function v({status:a}){const s=a==="Success"?"success":"warning";return e.jsx(T,{variant:s,children:a})}function C(){const[a,s]=c.useState(!1);return e.jsxs(f,{isOpen:a,setIsOpen:s,children:[e.jsx(y,{"aria-label":"Campaign actions",children:e.jsx(j,{size:24,className:"text-gray-400"})}),e.jsxs(h,{className:"w-40",children:[e.jsx("button",{type:"button",className:"w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5",children:"View More"}),e.jsx("button",{type:"button",className:"w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5",children:"Delete"})]})]})}const W={title:"Patterns/Tables/Featured Campaigns",tags:[]},r={render:()=>e.jsxs(m,{className:"w-full",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800",children:[e.jsx(u,{children:"Featured Campaigns"}),e.jsx(C,{})]}),e.jsxs(x,{children:[e.jsx(p,{children:e.jsxs(l,{children:[e.jsx(t,{children:"Products"}),e.jsx(t,{children:"Campaign"}),e.jsx(t,{children:"Status"})]})}),e.jsx(b,{children:w.map((a,s)=>e.jsxs(l,{children:[e.jsx(n,{children:e.jsxs("div",{className:"flex items-center gap-[18px]",children:[e.jsx(g,{name:a.user,alt:a.user}),e.jsx("span",{children:a.user})]})}),e.jsx(n,{children:e.jsxs("div",{className:"flex items-center gap-5",children:[e.jsx("div",{className:"flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-500",children:a.sub[0]}),e.jsxs("div",{className:"truncate",children:[e.jsx("p",{className:"truncate font-medium text-gray-700 dark:text-gray-400",children:a.campaign}),e.jsx("span",{className:"text-gray-500 dark:text-gray-400",children:a.sub})]})]})}),e.jsx(n,{children:e.jsx(v,{status:a.status})})]},s))})]})]})};var d,i,o;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <Card className="w-full">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800">
        <CardTitle>Featured Campaigns</CardTitle>
        <HeaderMenu />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Products</TableHead>
            <TableHead>Campaign</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => <TableRow key={i}>
              <TableCell>
                <div className="flex items-center gap-[18px]">
                  <Avatar name={row.user} alt={row.user} />
                  <span>{row.user}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-500">
                    {row.sub[0]}
                  </div>
                  <div className="truncate">
                    <p className="truncate font-medium text-gray-700 dark:text-gray-400">
                      {row.campaign}
                    </p>
                    <span className="text-gray-500 dark:text-gray-400">{row.sub}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <BadgeFor status={row.status} />
              </TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </Card>
}`,...(o=(i=r.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};const _=["Default"];export{r as Default,_ as __namedExportsOrder,W as default};
