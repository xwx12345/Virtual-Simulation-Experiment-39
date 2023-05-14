import{g as t,a5 as w,ao as fe,r as B,F as re,bM as ve,c2 as pe,c3 as me,a8 as y,aa as A,d as q,a7 as ye,c4 as be,bN as te,a9 as se,y as _e,an as Se,aE as ne,s as xe,c5 as le,ah as Ce,aB as he,bI as ge,v as we,c as U,k as oe,w as k,A as O,c6 as Ie,f as ce,e as Pe,h as $e,j as je,t as ke,c7 as Oe,c8 as Ee,c9 as Ne,c0 as De,p as Le,i as Be,m as Ae}from"./index-74898ef0.js";import{C as Fe}from"./index-0434ad9b.js";import{E as Me}from"./EditableCell-a8da30c3.js";function L(l){return l!=null}var Re=function(e){var n=e.itemPrefixCls,o=e.component,r=e.span,a=e.labelStyle,i=e.contentStyle,f=e.bordered,c=e.label,s=e.content,u=e.colon,_=o;if(f){var v;return t(_,{class:[(v={},w(v,"".concat(n,"-item-label"),L(c)),w(v,"".concat(n,"-item-content"),L(s)),v)],colSpan:r},{default:function(){return[L(c)&&t("span",{style:a},[c]),L(s)&&t("span",{style:i},[s])]}})}return t(_,{class:["".concat(n,"-item")],colSpan:r},{default:function(){return[t("div",{class:"".concat(n,"-item-container")},[c&&t("span",{class:["".concat(n,"-item-label"),w({},"".concat(n,"-item-no-colon"),!u)],style:a},[c]),s&&t("span",{class:"".concat(n,"-item-content"),style:i},[s])])]}})};const V=Re;var ze=function(e){var n=function(v,d,b){var I=d.colon,E=d.prefixCls,S=d.bordered,x=b.component,N=b.type,F=b.showLabel,D=b.showContent,C=b.labelStyle,P=b.contentStyle;return v.map(function(p,$){var h,j,m=p.props||{},H=m.prefixCls,M=H===void 0?E:H,Z=m.span,G=Z===void 0?1:Z,J=m.labelStyle,K=J===void 0?m["label-style"]:J,Q=m.contentStyle,W=Q===void 0?m["content-style"]:Q,X=m.label,Y=X===void 0?(h=p.children)===null||h===void 0||(j=h.label)===null||j===void 0?void 0:j.call(h):X,ee=ve(p),R=pe(p),z=me(p),T=p.key;return typeof x=="string"?t(V,{key:"".concat(N,"-").concat(String(T)||$),class:R,style:z,labelStyle:y(y({},C),K),contentStyle:y(y({},P),W),span:G,colon:I,component:x,itemPrefixCls:M,bordered:S,label:F?Y:null,content:D?ee:null},null):[t(V,{key:"label-".concat(String(T)||$),class:R,style:y(y(y({},C),z),K),span:1,colon:I,component:x[0],itemPrefixCls:M,bordered:S,label:Y},null),t(V,{key:"content-".concat(String(T)||$),class:R,style:y(y(y({},P),z),W),span:G*2-1,component:x[1],itemPrefixCls:M,bordered:S,content:ee},null)]})},o=e.prefixCls,r=e.vertical,a=e.row,i=e.index,f=e.bordered,c=fe(de,{labelStyle:B({}),contentStyle:B({})}),s=c.labelStyle,u=c.contentStyle;return r?t(re,null,[t("tr",{key:"label-".concat(i),class:"".concat(o,"-row")},[n(a,e,{component:"th",type:"label",showLabel:!0,labelStyle:s.value,contentStyle:u.value})]),t("tr",{key:"content-".concat(i),class:"".concat(o,"-row")},[n(a,e,{component:"td",type:"content",showContent:!0,labelStyle:s.value,contentStyle:u.value})])]):t("tr",{key:i,class:"".concat(o,"-row")},[n(a,e,{component:f?["th","td"]:"td",type:"item",showLabel:!0,showContent:!0,labelStyle:s.value,contentStyle:u.value})])};const Te=ze;A.any;var Ue=function(){return{prefixCls:String,label:A.any,labelStyle:{type:Object,default:void 0},contentStyle:{type:Object,default:void 0},span:{type:Number,default:1}}},ie=q({compatConfig:{MODE:3},name:"ADescriptionsItem",props:Ue(),slots:["label"],setup:function(e,n){var o=n.slots;return function(){var r;return(r=o.default)===null||r===void 0?void 0:r.call(o)}}}),ue={xxxl:3,xxl:3,xl:3,lg:3,md:3,sm:2,xs:1};function Ve(l,e){if(typeof l=="number")return l;if(se(l)==="object")for(var n=0;n<le.length;n++){var o=le[n];if(e[o]&&l[o]!==void 0)return l[o]||ue[o]}return 3}function ae(l,e,n){var o=l;return(e===void 0||e>n)&&(o=he(l,{span:n}),ge(e===void 0,"Descriptions","Sum of column `span` in a line not match `column` of Descriptions.")),o}function qe(l,e){var n=Ce(l),o=[],r=[],a=e;return n.forEach(function(i,f){var c,s=(c=i.props)===null||c===void 0?void 0:c.span,u=s||1;if(f===n.length-1){r.push(ae(i,s,a)),o.push(r);return}u<a?(a-=u,r.push(i)):(r.push(ae(i,u,a)),o.push(r),a=e,r=[])}),o}var He=function(){return{prefixCls:String,bordered:{type:Boolean,default:void 0},size:{type:String,default:"default"},title:A.any,extra:A.any,column:{type:[Number,Object],default:function(){return ue}},layout:String,colon:{type:Boolean,default:void 0},labelStyle:{type:Object,default:void 0},contentStyle:{type:Object,default:void 0}}},de=Symbol("descriptionsContext"),g=q({compatConfig:{MODE:3},name:"ADescriptions",props:He(),slots:["title","extra"],Item:ie,setup:function(e,n){var o=n.slots,r=ye("descriptions",e),a=r.prefixCls,i=r.direction,f,c=B({});be(function(){f=te.subscribe(function(u){se(e.column)==="object"&&(c.value=u)})}),_e(function(){te.unsubscribe(f)}),Se(de,{labelStyle:ne(e,"labelStyle"),contentStyle:ne(e,"contentStyle")});var s=xe(function(){return Ve(e.column,c.value)});return function(){var u,_,v,d,b=e.size,I=e.bordered,E=I===void 0?!1:I,S=e.layout,x=S===void 0?"horizontal":S,N=e.colon,F=N===void 0?!0:N,D=e.title,C=D===void 0?(u=o.title)===null||u===void 0?void 0:u.call(o):D,P=e.extra,p=P===void 0?(_=o.extra)===null||_===void 0?void 0:_.call(o):P,$=(v=o.default)===null||v===void 0?void 0:v.call(o),h=qe($,s.value);return t("div",{class:[a.value,(d={},w(d,"".concat(a.value,"-").concat(b),b!=="default"),w(d,"".concat(a.value,"-bordered"),!!E),w(d,"".concat(a.value,"-rtl"),i.value==="rtl"),d)]},[(C||p)&&t("div",{class:"".concat(a.value,"-header")},[C&&t("div",{class:"".concat(a.value,"-title")},[C]),p&&t("div",{class:"".concat(a.value,"-extra")},[p])]),t("div",{class:"".concat(a.value,"-view")},[t("table",null,[t("tbody",null,[h.map(function(j,m){return t(Te,{key:m,index:m,colon:F,prefixCls:a.value,vertical:x==="vertical",bordered:E,row:j},null)})])])])])}}});g.install=function(l){return l.component(g.name,g),l.component(g.Item.name,g.Item),l};const Ze=g;const Ge=l=>(Le("data-v-19e499c1"),l=l(),Be(),l),Je={class:"description"},Ke=Ge(()=>ce("div",{class:"text-title font-medium"},"Oliver Liam",-1)),Qe=q({__name:"ProfileInfo",setup(l){const e=we([{label:"Full Name",content:"Li Zhi"},{label:"Mobile",content:"13678988900"},{label:"Email",content:"lizhi@firfox.com"},{label:"Location",content:"shenzheng.CN"}]),n=B(!1);return(o,r)=>{const a=De,i=ie,f=Ze,c=Fe;return U(),oe(c,{title:"Profile Information",class:"profile-info rounded-xl shadow-lg",bordered:!1},{extra:k(()=>[t(O(Ie),{onClick:r[0]||(r[0]=s=>n.value=!0),class:"text-subtext hover:text-primary cursor-pointer"})]),default:k(()=>[ce("div",Je,[t(O(Me),{options:{rows:4},edit:n.value,"onUpdate:edit":r[1]||(r[1]=s=>n.value=s),type:"textarea",value:`Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no.\r
      If two equally difficult paths, choose the one more painful in the short\r
      term (pain avoidance is creating an illusion of equality).`},null,8,["edit"])]),t(a),Ke,t(f,{class:"profile-list mt-3 font-medium",column:1},{default:k(()=>[(U(!0),Pe(re,null,$e(e,s=>(U(),oe(i,{label:s.label},{default:k(()=>[je(ke(s.content),1)]),_:2},1032,["label"]))),256)),t(i,{label:"Contact"},{default:k(()=>[t(O(Oe),{class:"text-blue-400"}),t(O(Ee),{class:"text-blue-800"}),t(O(Ne),{class:"text-red-500"})]),_:1})]),_:1})]),_:1})}}});const et=Ae(Qe,[["__scopeId","data-v-19e499c1"]]);export{et as default};
//# sourceMappingURL=ProfileInfo-edb06837.js.map