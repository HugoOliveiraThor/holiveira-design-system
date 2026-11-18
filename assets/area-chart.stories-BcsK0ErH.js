const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./react-apexcharts.esm-BcIW_Upx.js","./index-BxXVWNx3.js","./_commonjsHelpers-CqkleIqs.js"])))=>i.map(i=>d[i]);
import{_ as R}from"./iframe-CkpTEBEc.js";import{j as m}from"./jsx-runtime-EKYJJIwR.js";import{u as B,t as L,d as z}from"./chart-defaults-_AITzgSk.js";import{u as H}from"./use-is-mobile-B66gSL3S.js";import{c as K}from"./cn-DCADjnpI.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-BxXVWNx3.js";import"./index-C3nQT0D1.js";const Q=z(()=>R(()=>import("./react-apexcharts.esm-BcIW_Upx.js"),__vite__mapDeps([0,1,2]),import.meta.url),{ssr:!1});function d({series:O,height:c=310,className:V,apexOptions:e,label:P,description:u}){const p=B(),I=H(),y=L(p),G={...y,...e,colors:[p.primary,p.secondary],chart:{...y.chart,...e==null?void 0:e.chart,height:c,type:"area"},fill:{gradient:{opacityFrom:.55,opacityTo:0}},stroke:{curve:"smooth",width:I?2:3},xaxis:{axisBorder:{show:!1},axisTicks:{show:!1}},legend:{show:!1},tooltip:{marker:{show:!0}},responsive:[{breakpoint:1024,options:{chart:{height:300}}},{breakpoint:1366,options:{chart:{height:320}}}]};return m.jsxs("div",{className:K("-mr-5 -ml-4",V),style:{height:c},role:"img","aria-label":P,children:[u&&m.jsx("span",{className:"sr-only",children:u}),m.jsx(Q,{options:G,series:O,type:"area",height:c})]})}d.displayName="AreaChart";d.__docgenInfo={description:"",methods:[],displayName:"AreaChart",props:{series:{required:!0,tsType:{name:"Array",elements:[{name:"ChartSeries"}],raw:"ChartSeries[]"},description:""},height:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"310",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},apexOptions:{required:!1,tsType:{name:"Partial",elements:[{name:"ApexOptions"}],raw:"Partial<ApexOptions>"},description:""},label:{required:!0,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""}}};const l=[{name:"Visitors",data:[{x:"Jan",y:200},{x:"Feb",y:400},{x:"Mar",y:350},{x:"Apr",y:500},{x:"May",y:480},{x:"Jun",y:600}]}],U=[{name:"Desktop",data:[{x:"Jan",y:200},{x:"Feb",y:150},{x:"Mar",y:300}]},{name:"Mobile",data:[{x:"Jan",y:100},{x:"Feb",y:250},{x:"Mar",y:200}]}],ae={title:"Charts/AreaChart",component:d,tags:["autodocs"],argTypes:{series:{description:"Array of data series. Each series has a `name` and `data` array of `{ x, y }` points.",control:!1},apexOptions:{description:"Overrides for ApexCharts options object. Merged with defaults.",control:!1},height:{description:"Chart height in pixels.",control:{type:"number"},table:{defaultValue:{summary:"310"}}},className:{description:"Additional CSS classes.",control:!1},label:{description:"Accessible label for the chart (aria-label).",control:{type:"text"}},description:{description:"Additional accessible description (sr-only span).",control:{type:"text"}}}},r={args:{series:l}},s={args:{series:U,apexOptions:{chart:{stacked:!0}}}},a={args:{series:l}},t={args:{series:l},parameters:{themes:{themeOverride:"dark"}}},o={args:{series:[]}},n={args:{series:[{name:"Visitors",data:[{x:"Jan",y:200},{x:"Feb",y:400}]}]}},i={args:{series:[{name:"Empty",data:[]}]}};var h,g,x;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    series: singleSeries
  }
}`,...(x=(g=r.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var f,S,b;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    series: stackedSeries,
    apexOptions: {
      chart: {
        stacked: true
      }
    }
  }
}`,...(b=(S=s.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var A,k,C;a.parameters={...a.parameters,docs:{...(A=a.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    series: singleSeries
  }
}`,...(C=(k=a.parameters)==null?void 0:k.docs)==null?void 0:C.source}}};var T,_,M;t.parameters={...t.parameters,docs:{...(T=t.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    series: singleSeries
  },
  parameters: {
    themes: {
      themeOverride: 'dark'
    }
  }
}`,...(M=(_=t.parameters)==null?void 0:_.docs)==null?void 0:M.source}}};var v,E,w;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    series: []
  }
}`,...(w=(E=o.parameters)==null?void 0:E.docs)==null?void 0:w.source}}};var F,N,D;n.parameters={...n.parameters,docs:{...(F=n.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    series: [{
      name: 'Visitors',
      data: [{
        x: 'Jan',
        y: 200
      }, {
        x: 'Feb',
        y: 400
      }]
    }]
  }
}`,...(D=(N=n.parameters)==null?void 0:N.docs)==null?void 0:D.source}}};var j,q,J;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    series: [{
      name: 'Empty',
      data: []
    }]
  }
}`,...(J=(q=i.parameters)==null?void 0:q.docs)==null?void 0:J.source}}};const te=["SingleArea","Stacked","GradientFill","DarkMode","Empty","SingleSeries","NoData"];export{t as DarkMode,o as Empty,a as GradientFill,i as NoData,r as SingleArea,n as SingleSeries,s as Stacked,te as __namedExportsOrder,ae as default};
