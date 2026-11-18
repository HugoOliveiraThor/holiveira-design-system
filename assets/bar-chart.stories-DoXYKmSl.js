const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./react-apexcharts.esm-BcIW_Upx.js","./index-BxXVWNx3.js","./_commonjsHelpers-CqkleIqs.js"])))=>i.map(i=>d[i]);
import{_ as E}from"./iframe-CkpTEBEc.js";import{j as c}from"./jsx-runtime-EKYJJIwR.js";import{u as V,t as W,d as F}from"./chart-defaults-_AITzgSk.js";import{c as J}from"./cn-DCADjnpI.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-BxXVWNx3.js";import"./index-C3nQT0D1.js";const H=F(()=>E(()=>import("./react-apexcharts.esm-BcIW_Upx.js"),__vite__mapDeps([0,1,2]),import.meta.url),{ssr:!1});function l({series:B,height:D=370,stacked:N=!1,className:O,apexOptions:e,label:P,description:m}){const n=V(),u=W(n),w={...u,...e,colors:[n.primary,n.secondary],chart:{...u.chart,...e==null?void 0:e.chart,type:"bar",stacked:N},plotOptions:{bar:{horizontal:!1,borderRadius:3,columnWidth:"25%",borderRadiusApplication:"end",borderRadiusWhenStacked:"last"}},xaxis:{axisBorder:{show:!1},axisTicks:{show:!1}},legend:{position:"top",horizontalAlign:"left",fontFamily:"inherit",fontWeight:500,fontSize:"14px",markers:{size:9,shape:"circle"}},fill:{opacity:1},responsive:[{breakpoint:1536,options:{plotOptions:{bar:{borderRadius:3,columnWidth:"25%"}}}}]};return c.jsxs("div",{className:J("mt-3 -ml-3.5",O),role:"img","aria-label":P,children:[m&&c.jsx("span",{className:"sr-only",children:m}),c.jsx(H,{options:w,series:B,type:"bar",height:D})]})}l.displayName="BarChart";l.__docgenInfo={description:"",methods:[],displayName:"BarChart",props:{series:{required:!0,tsType:{name:"Array",elements:[{name:"ChartSeries"}],raw:"ChartSeries[]"},description:""},height:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"370",computed:!1}},stacked:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},apexOptions:{required:!1,tsType:{name:"Partial",elements:[{name:"ApexOptions"}],raw:"Partial<ApexOptions>"},description:""},label:{required:!0,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""}}};const d=[{name:"Revenue",data:[{x:"Jan",y:400},{x:"Feb",y:300},{x:"Mar",y:600},{x:"Apr",y:350},{x:"May",y:500}]}],p=[{name:"Product A",data:[{x:"Jan",y:400},{x:"Feb",y:300},{x:"Mar",y:600}]},{name:"Product B",data:[{x:"Jan",y:200},{x:"Feb",y:100},{x:"Mar",y:400}]}],Y={title:"Charts/BarChart",component:l,tags:["autodocs"],argTypes:{series:{description:"Array of data series. Each series has a `name` and `data` array of `{ x, y }` points.",control:!1},apexOptions:{description:"Overrides for ApexCharts options object. Merged with defaults.",control:!1},height:{description:"Chart height in pixels.",control:{type:"number"},table:{defaultValue:{summary:"370"}}},stacked:{description:"Whether to stack bars.",control:{type:"boolean"},table:{defaultValue:{summary:"false"}}},className:{description:"Additional CSS classes.",control:!1},label:{description:"Accessible label for the chart (aria-label).",control:{type:"text"}},description:{description:"Additional accessible description (sr-only span).",control:{type:"text"}}}},r={args:{series:d}},s={args:{series:d}},a={args:{series:p}},t={args:{series:p,stacked:!0}},o={args:{series:d}},i={args:{series:p},parameters:{themes:{themeOverride:"dark"}}};var h,f,y;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    series: singleSeries
  }
}`,...(y=(f=r.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var g,x,S;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    series: singleSeries
  }
}`,...(S=(x=s.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var b,k,A;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    series: multiSeries
  }
}`,...(A=(k=a.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};var C,T,_;t.parameters={...t.parameters,docs:{...(C=t.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    series: multiSeries,
    stacked: true
  }
}`,...(_=(T=t.parameters)==null?void 0:T.docs)==null?void 0:_.source}}};var v,M,q;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    series: singleSeries
  }
}`,...(q=(M=o.parameters)==null?void 0:M.docs)==null?void 0:q.source}}};var R,j,z;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    series: multiSeries
  },
  parameters: {
    themes: {
      themeOverride: 'dark'
    }
  }
}`,...(z=(j=i.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};const Z=["Default","SingleSeries","MultiSeries","Stacked","Horizontal","DarkMode"];export{i as DarkMode,r as Default,o as Horizontal,a as MultiSeries,s as SingleSeries,t as Stacked,Z as __namedExportsOrder,Y as default};
