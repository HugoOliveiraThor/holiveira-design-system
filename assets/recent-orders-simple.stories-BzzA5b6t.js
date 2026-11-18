import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{C as c}from"./card-BQ58Ck17.js";import{C as i}from"./card-title-Dqpd9uV0.js";import{T as b,a as m,b as s,c as r,d as u,e as l}from"./table-DYyKo_tD.js";import"./index-BxXVWNx3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cn-DCADjnpI.js";import"./index-Da1oAmHU.js";const T=[{product:"TailGrids",category:"UI Kits",value:"$12,499"},{product:"GrayGrids",category:"Templates",value:"$5,498"},{product:"Uideck",category:"Templates",value:"$4,621"},{product:"FormBold",category:"SaaS",value:"$13,843"},{product:"NextAdmin",category:"Templates",value:"$7,523"}],w={title:"Patterns/Tables/Recent Orders Simple",tags:[]},t={render:()=>e.jsxs(c,{className:"w-full",children:[e.jsx("div",{className:"flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800",children:e.jsx(i,{children:"Recent Orders"})}),e.jsxs(b,{children:[e.jsx(m,{children:e.jsxs(s,{children:[e.jsx(r,{children:"Products"}),e.jsx(r,{children:"Category"}),e.jsx(r,{children:"Country"}),e.jsx(r,{children:"CR"}),e.jsx(r,{children:"Value"})]})}),e.jsx(u,{children:T.map(a=>e.jsxs(s,{children:[e.jsx(l,{className:"font-medium text-gray-800 dark:text-white/90",children:a.product}),e.jsx(l,{children:a.category}),e.jsx(l,{children:e.jsx("div",{className:"flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-500",children:a.product[0]})}),e.jsx(l,{children:"Dashboard"}),e.jsx(l,{className:"text-success-600",children:a.value})]},a.product))})]})]})};var d,n,o;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <Card className="w-full">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800">
        <CardTitle>Recent Orders</CardTitle>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Products</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>CR</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(row => <TableRow key={row.product}>
              <TableCell className="font-medium text-gray-800 dark:text-white/90">
                {row.product}
              </TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-500">
                  {row.product[0]}
                </div>
              </TableCell>
              <TableCell>Dashboard</TableCell>
              <TableCell className="text-success-600">{row.value}</TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </Card>
}`,...(o=(n=t.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};const H=["Default"];export{t as Default,H as __namedExportsOrder,w as default};
