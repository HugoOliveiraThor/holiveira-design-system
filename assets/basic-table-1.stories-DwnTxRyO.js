import{j as e}from"./jsx-runtime-EKYJJIwR.js";import{C as k}from"./card-BQ58Ck17.js";import{T as N,a as H,b,c as t,d as B,e as l}from"./table-DYyKo_tD.js";import{A as h}from"./avatar-Dud72ywL.js";import{r as n}from"./index-BxXVWNx3.js";import{c as g}from"./cn-DCADjnpI.js";import{B as G}from"./badge-XDFdrAMp.js";import"./index-Da1oAmHU.js";import"./_commonjsHelpers-CqkleIqs.js";const S={xs:"-space-x-1.5",sm:"-space-x-2",md:"-space-x-2.5",lg:"-space-x-3",xl:"-space-x-3.5","2xl":"-space-x-4"},M={xs:"h-6 w-6 text-[10px]",sm:"h-8 w-8 text-xs",md:"h-10 w-10 text-sm",lg:"h-12 w-12 text-sm",xl:"h-14 w-14 text-sm","2xl":"h-16 w-16 text-sm"},i=n.forwardRef(({children:a,size:r="md",max:s=4,className:v,...w},y)=>{const m=n.Children.toArray(a).filter(n.isValidElement),o=m.slice(0,s),u=m.length-o.length,x=r??"md",A=n.useMemo(()=>o.map(p=>{var c;const C=(c=p.props.size)!==null&&c!==void 0?c:r;return n.cloneElement(p,{size:C})}),[o,r]);return e.jsxs("div",{ref:y,className:g("flex items-center",S[x],v),...w,children:[A,u>0&&e.jsxs("div",{className:g("flex items-center justify-center rounded-full bg-gray-200 font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300",M[x]),children:["+",u]})]})});i.displayName="AvatarGroup";i.__docgenInfo={description:"Stacked avatars with overlap. Accepts Avatar children; `size` applies to\nchildren lacking an explicit size. Renders a `+N` overflow chip when the\nchild count exceeds `max` (default 4).\n@public",methods:[],displayName:"AvatarGroup",props:{size:{defaultValue:{value:"'md'",computed:!1},required:!1},max:{defaultValue:{value:"4",computed:!1},required:!1}}};const R=[{user:"Lindsey Curtis",role:"Web Designer",project:"Agency Website",team:3,status:"Active",budget:"3.9K"},{user:"Kaiya George",role:"Project Manager",project:"Technology",team:2,status:"Pending",budget:"24.9K"},{user:"Zain Geidt",role:"Content Writing",project:"Blog Writing",team:1,status:"Active",budget:"12.7K"},{user:"Abram Schleifer",role:"Digital Marketer",project:"Social Media",team:3,status:"Cancel",budget:"2.8K"}];function _({status:a}){const r=a==="Active"?"success":a==="Pending"?"warning":"error";return e.jsx(G,{variant:r,children:a})}const O={title:"Patterns/Tables/Basic Table 1",tags:[]},d={render:()=>e.jsx(k,{className:"w-full",children:e.jsxs(N,{children:[e.jsx(H,{children:e.jsxs(b,{children:[e.jsx(t,{children:"User"}),e.jsx(t,{children:"Project Name"}),e.jsx(t,{children:"Team"}),e.jsx(t,{children:"Status"}),e.jsx(t,{children:"Budget"})]})}),e.jsx(B,{children:R.map(a=>e.jsxs(b,{children:[e.jsx(l,{children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(h,{name:a.user,alt:a.user}),e.jsxs("div",{children:[e.jsx("span",{className:"block font-medium text-gray-800 dark:text-white/90",children:a.user}),e.jsx("span",{className:"block text-gray-500 dark:text-gray-400",children:a.role})]})]})}),e.jsx(l,{children:a.project}),e.jsx(l,{children:e.jsx(i,{max:3,children:Array.from({length:a.team},(r,s)=>e.jsx(h,{name:`M${s+1}`,alt:`M${s+1}`},s))})}),e.jsx(l,{children:e.jsx(_,{status:a.status})}),e.jsx(l,{children:a.budget})]},a.user))})]})})};var T,f,j;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <Card className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Budget</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(row => <TableRow key={row.user}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar name={row.user} alt={row.user} />
                  <div>
                    <span className="block font-medium text-gray-800 dark:text-white/90">
                      {row.user}
                    </span>
                    <span className="block text-gray-500 dark:text-gray-400">{row.role}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{row.project}</TableCell>
              <TableCell>
                <AvatarGroup max={3}>
                  {Array.from({
                length: row.team
              }, (_, i) => <Avatar key={i} name={\`M\${i + 1}\`} alt={\`M\${i + 1}\`} />)}
                </AvatarGroup>
              </TableCell>
              <TableCell>
                <BadgeFor status={row.status} />
              </TableCell>
              <TableCell>{row.budget}</TableCell>
            </TableRow>)}
        </TableBody>
      </Table>
    </Card>
}`,...(j=(f=d.parameters)==null?void 0:f.docs)==null?void 0:j.source}}};const U=["Default"];export{d as Default,U as __namedExportsOrder,O as default};
