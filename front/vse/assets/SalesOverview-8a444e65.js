import{i as m}from"./index-80671391.js";import{d as i,r as h,o as f,y as v,c as a,e as r,m as w,g as n}from"./index-74898ef0.js";import{_ as l}from"./OverviewTitle-cf920aea.js";const c=i({__name:"LineChart",setup(o){let e=null;const t=h();function s(){e==null||e.resize()}return f(()=>{e=m(t.value),e.setOption({color:["#005af9","#985af9"],grid:[{top:100,left:32,right:12,bottom:20}],xAxis:[{name:"时间",nameTextStyle:{color:"rgba(0 , 0, 0, 0)"},type:"category",axisTick:{show:!1},axisLine:{show:!1},boundaryGap:0,splitLine:{show:!1}}],yAxis:[{name:"销售额",nameTextStyle:{color:"rgba(0 , 0, 0, 0)"},type:"value",axisTick:{show:!1},axisLine:{show:!1},splitLine:{lineStyle:{type:"dashed",width:2,color:"rgba(0, 0, 0, 0.15)"}}}],legend:{show:!0,right:"8",top:0,orient:"vertical"},tooltip:{show:!0,trigger:"axis"},series:[{name:"销售额",type:"line",smooth:!0,lineStyle:{width:3},data:[["一月",12],["二月",8],["三月",92],["四月",32],["五月",22],["六月",89],["七月",72]]},{name:"订单",type:"line",smooth:!0,width:4,lineStyle:{width:3},data:[["一月",12],["二月",8],["三月",24],["四月",32],["五月",56],["六月",56],["七月",56]]}]}),window.addEventListener("resize",s)}),v(()=>{window.removeEventListener("resize",s)}),(p,_)=>(a(),r("div",{style:{width:"100%",height:"400px"},class:"line-chart",ref_key:"container",ref:t},null,512))}}),y=i({components:{LineChart:c,OverviewTitle:l},name:"SalesOverview",setup(o,{attrs:e,slots:t,emit:s}){}});const g={class:"sales-overview card p-lg"};function x(o,e,t,s,p,_){const u=l,d=c;return a(),r("div",g,[n(u,{title:"销售概览",subtitle:"同比去年",change:"+20%",up:""}),n(d)])}const B=w(y,[["render",x],["__scopeId","data-v-78501621"]]);export{B as default};
//# sourceMappingURL=SalesOverview-8a444e65.js.map