import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{within as L,expect as U,userEvent as J}from"./index-DH-M5T-F.js";import{r as G}from"./index-BxXVWNx3.js";import{c as i}from"./cn-DCADjnpI.js";import"./_commonjsHelpers-CqkleIqs.js";const d=G.forwardRef(({className:a,...n},c)=>e.jsx("div",{ref:c,className:"relative w-full overflow-auto",children:e.jsx("table",{className:i("w-full",a),...n})}));d.displayName="Table";function o({className:a,...n}){return e.jsx("thead",{className:i("border-b border-gray-100 dark:border-white/[0.05]",a),...n})}o.displayName="TableHeader";function t({className:a,...n}){return e.jsx("tbody",{className:i("divide-y divide-gray-100 dark:divide-white/[0.05]",a),...n})}t.displayName="TableBody";function w({className:a,...n}){return e.jsx("tfoot",{className:i("border-t bg-neutral-100/50 font-medium dark:bg-neutral-800/50 [&>tr]:last:border-b-0",a),...n})}w.displayName="TableFooter";function s({className:a,...n}){return e.jsx("tr",{className:i("border-b border-gray-100 transition-colors hover:bg-gray-50 data-[state=selected]:bg-gray-50 dark:border-white/[0.05] dark:hover:bg-white/[0.03] dark:data-[state=selected]:bg-white/[0.03]",a),...n})}s.displayName="TableRow";function l({className:a,scope:n="col",...c}){return e.jsx("th",{scope:n,className:i("px-5 py-3 text-start align-middle text-xs font-medium text-gray-500 dark:text-gray-400 [&:has([role=checkbox])]:pr-0",a),...c})}l.displayName="TableHead";function r({className:a,...n}){return e.jsx("td",{className:i("px-5 py-4 align-middle text-sm text-gray-500 dark:text-gray-400 [&:has([role=checkbox])]:pr-0",a),...n})}r.displayName="TableCell";d.__docgenInfo={description:`Table wrapper with scroll container. Compound with TableHeader, TableBody,
TableFooter, TableRow, TableHead, and TableCell sub-components.
@public`,methods:[],displayName:"Table",props:{"aria-label":{required:!1,tsType:{name:"string"},description:""}}};o.__docgenInfo={description:"Table `<thead>` wrapper.\n@public",methods:[],displayName:"TableHeader"};t.__docgenInfo={description:"Table `<tbody>` wrapper.\n@public",methods:[],displayName:"TableBody"};w.__docgenInfo={description:"Table `<tfoot>` wrapper.\n@public",methods:[],displayName:"TableFooter"};s.__docgenInfo={description:"Table `<tr>` wrapper.\n@public",methods:[],displayName:"TableRow"};l.__docgenInfo={description:"Table `<th>` wrapper.\n@public",methods:[],displayName:"TableHead",props:{scope:{defaultValue:{value:"'col'",computed:!1},required:!1}}};r.__docgenInfo={description:"Table `<td>` wrapper.\n@public",methods:[],displayName:"TableCell"};const z={title:"Primitives/Table",component:d,tags:["autodocs"],argTypes:{"aria-label":{description:"Accessible label describing the table content.",control:{type:"text"}},children:{description:"Table content composed with TableHeader, TableBody, TableRow, TableHead, TableCell.",control:!1}}},u=[{id:1,name:"John Doe",email:"john@example.com",role:"Admin"},{id:2,name:"Jane Smith",email:"jane@example.com",role:"Editor"},{id:3,name:"Bob Johnson",email:"bob@example.com",role:"Viewer"}],b={render:()=>e.jsxs(d,{"aria-label":"Users table",children:[e.jsx(o,{children:e.jsxs(s,{children:[e.jsx(l,{children:"Name"}),e.jsx(l,{children:"Email"}),e.jsx(l,{children:"Role"})]})}),e.jsx(t,{children:u.map(a=>e.jsxs(s,{children:[e.jsx(r,{children:a.name}),e.jsx(r,{children:a.email}),e.jsx(r,{children:a.role})]},a.id))}),e.jsx(w,{children:e.jsx(s,{children:e.jsx(r,{colSpan:3,children:"3 users total"})})})]})},m={render:()=>e.jsxs(d,{"aria-label":"Empty table",children:[e.jsx(o,{children:e.jsxs(s,{children:[e.jsx(l,{children:"Name"}),e.jsx(l,{children:"Email"}),e.jsx(l,{children:"Role"})]})}),e.jsx(t,{children:e.jsx(s,{children:e.jsx(r,{colSpan:3,className:"text-center text-neutral-500",children:"No data available"})})})]})},T={render:()=>e.jsxs(d,{"aria-label":"Selectable table",children:[e.jsx(o,{children:e.jsxs(s,{children:[e.jsx(l,{children:e.jsx("input",{type:"checkbox","aria-label":"Select all"})}),e.jsx(l,{children:"Name"}),e.jsx(l,{children:"Email"}),e.jsx(l,{children:"Role"})]})}),e.jsx(t,{children:u.map(a=>e.jsxs(s,{children:[e.jsx(r,{children:e.jsx("input",{type:"checkbox","aria-label":`Select ${a.name}`})}),e.jsx(r,{children:a.name}),e.jsx(r,{children:a.email}),e.jsx(r,{children:a.role})]},a.id))})]})},p={render:()=>e.jsxs(d,{"aria-label":"Sorted table",children:[e.jsx(o,{children:e.jsxs(s,{children:[e.jsxs(l,{className:"cursor-pointer",children:["Name ",e.jsx("span",{className:"text-neutral-400",children:"▲"})]}),e.jsxs(l,{className:"cursor-pointer",children:["Email ",e.jsx("span",{className:"text-neutral-400",children:"▲"})]}),e.jsxs(l,{className:"cursor-pointer",children:["Role ",e.jsx("span",{className:"text-neutral-400",children:"▼"})]})]})}),e.jsx(t,{children:u.map(a=>e.jsxs(s,{children:[e.jsx(r,{children:a.name}),e.jsx(r,{children:a.email}),e.jsx(r,{children:a.role})]},a.id))})]})},h={render:()=>e.jsxs(d,{"aria-label":"Loading table","aria-busy":"true",children:[e.jsx(o,{children:e.jsxs(s,{children:[e.jsx(l,{children:"Name"}),e.jsx(l,{children:"Email"}),e.jsx(l,{children:"Role"})]})}),e.jsx(t,{children:[1,2,3].map(a=>e.jsxs(s,{children:[e.jsx(r,{children:e.jsx("div",{className:"dark:bg-dark-3 h-4 w-24 animate-pulse rounded bg-neutral-200"})}),e.jsx(r,{children:e.jsx("div",{className:"dark:bg-dark-3 h-4 w-36 animate-pulse rounded bg-neutral-200"})}),e.jsx(r,{children:e.jsx("div",{className:"dark:bg-dark-3 h-4 w-16 animate-pulse rounded bg-neutral-200"})})]},a))})]})},x={render:()=>e.jsxs(d,{"aria-label":"Users table",children:[e.jsx(o,{children:e.jsxs(s,{children:[e.jsx(l,{children:"Name"}),e.jsx(l,{children:"Email"}),e.jsx(l,{children:"Role"})]})}),e.jsx(t,{children:u.map(a=>e.jsxs(s,{children:[e.jsx(r,{children:a.name}),e.jsx(r,{children:a.email}),e.jsx(r,{children:a.role})]},a.id))})]}),play:async({canvasElement:a,step:n})=>{const c=L(a);await n("table renders data rows",async()=>{const j=c.queryAllByRole("row");await U(j.length).toBeGreaterThan(1)}),await n("click column header to sort",async()=>{const j=c.getByRole("columnheader",{name:/name/i});await J.click(j)})}};var y,H,N;b.parameters={...b.parameters,docs:{...(y=b.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <Table aria-label="Users table">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map(row => <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>)}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>3 users total</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
}`,...(N=(H=b.parameters)==null?void 0:H.docs)==null?void 0:N.source}}};var g,R,C;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <Table aria-label="Empty table">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="text-center text-neutral-500">
            No data available
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
}`,...(C=(R=m.parameters)==null?void 0:R.docs)==null?void 0:C.source}}};var k,f,v;T.parameters={...T.parameters,docs:{...(k=T.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <Table aria-label="Selectable table">
      <TableHeader>
        <TableRow>
          <TableHead>
            <input type="checkbox" aria-label="Select all" />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map(row => <TableRow key={row.id}>
            <TableCell>
              <input type="checkbox" aria-label={\`Select \${row.name}\`} />
            </TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>)}
      </TableBody>
    </Table>
}`,...(v=(f=T.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var E,S,B;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <Table aria-label="Sorted table">
      <TableHeader>
        <TableRow>
          <TableHead className="cursor-pointer">
            Name <span className="text-neutral-400">&#9650;</span>
          </TableHead>
          <TableHead className="cursor-pointer">
            Email <span className="text-neutral-400">&#9650;</span>
          </TableHead>
          <TableHead className="cursor-pointer">
            Role <span className="text-neutral-400">&#9660;</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map(row => <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>)}
      </TableBody>
    </Table>
}`,...(B=(S=p.parameters)==null?void 0:S.docs)==null?void 0:B.source}}};var _,I,F;h.parameters={...h.parameters,docs:{...(_=h.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <Table aria-label="Loading table" aria-busy="true">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3].map(i => <TableRow key={i}>
            <TableCell>
              <div className="dark:bg-dark-3 h-4 w-24 animate-pulse rounded bg-neutral-200" />
            </TableCell>
            <TableCell>
              <div className="dark:bg-dark-3 h-4 w-36 animate-pulse rounded bg-neutral-200" />
            </TableCell>
            <TableCell>
              <div className="dark:bg-dark-3 h-4 w-16 animate-pulse rounded bg-neutral-200" />
            </TableCell>
          </TableRow>)}
      </TableBody>
    </Table>
}`,...(F=(I=h.parameters)==null?void 0:I.docs)==null?void 0:F.source}}};var D,q,A;x.parameters={...x.parameters,docs:{...(D=x.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <Table aria-label="Users table">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map(row => <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>)}
      </TableBody>
    </Table>,
  play: async ({
    canvasElement,
    step
  }) => {
    const canvas = within(canvasElement);
    await step('table renders data rows', async () => {
      const rows = canvas.queryAllByRole('row');
      await expect(rows.length).toBeGreaterThan(1);
    });
    await step('click column header to sort', async () => {
      const header = canvas.getByRole('columnheader', {
        name: /name/i
      });
      await userEvent.click(header);
    });
  }
}`,...(A=(q=x.parameters)==null?void 0:q.docs)==null?void 0:A.source}}};const K=["FullComposition","EmptyState","WithSelection","Sorted","Loading","Interactive"];export{m as EmptyState,b as FullComposition,x as Interactive,h as Loading,p as Sorted,T as WithSelection,K as __namedExportsOrder,z as default};
