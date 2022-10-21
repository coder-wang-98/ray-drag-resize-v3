(function(o,p){typeof exports=="object"&&typeof module<"u"?module.exports=p(require("vue")):typeof define=="function"&&define.amd?define(["vue"],p):(o=typeof globalThis<"u"?globalThis:o||self,o["drag-resize-v3"]=p(o.Vue))})(this,function(o){"use strict";var p,V=new Uint8Array(16);function X(){if(!p&&(p=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto<"u"&&typeof msCrypto.getRandomValues=="function"&&msCrypto.getRandomValues.bind(msCrypto),!p))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return p(V)}const Y=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function b(e){return typeof e=="string"&&Y.test(e)}for(var s=[],y=0;y<256;++y)s.push((y+256).toString(16).substr(1));function H(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r=(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase();if(!b(r))throw TypeError("Stringified UUID is invalid");return r}function W(e,t,r){e=e||{};var u=e.random||(e.rng||X)();if(u[6]=u[6]&15|64,u[8]=u[8]&63|128,t){r=r||0;for(var d=0;d<16;++d)t[r+d]=u[d];return t}return H(u)}const L=["onMousedown"],S=o.defineComponent({name:"dragResize"}),T=o.defineComponent({...S,props:{activeColor:{type:String,default:"rgba(119, 221, 178, 0.3)"},nodeKey:{type:[Number,String],default:W()},minh:{type:Number,default:100},minw:{type:Number,default:100},init:{type:Object,default:()=>({width:100,height:100,top:0,left:0})}},emits:["onDragResize"],setup(e,{emit:t}){const r=e;o.useCssVars(l=>({"3e08d3ce":o.unref(u)}));const{activeColor:u,nodeKey:d,minh:C,minw:D,init:v}=o.toRefs(r),n=o.ref(),$=l=>{const i=n.value.parentElement;let m=i.style.position;i.style.position="relative";let{left:h,top:w}=_(),x=l.clientX-parseFloat(h)||n.value.offsetLeft,g=l.clientY-parseFloat(w)||n.value.offsetTop;l.preventDefault(),document.onmousemove=function(f){let a=f.clientX-x,c=f.clientY-g;a<0?a=0:a>i.clientWidth-n.value.clientWidth&&(a=i.clientWidth-n.value.clientWidth),c<0?c=0:c>i.clientHeight-n.value.clientHeight&&(c=i.clientHeight-n.value.clientHeight),n.value.style.transform=`translate3d(${a}px, ${c}px,0)`},document.onmouseup=function(){document.onmousemove=null,document.onmouseup=null,i.style.position=m;let{left:f,top:a}=_();t("onDragResize",{left:f,top:a,height:n.value.style.height,width:n.value.style.width,nodeKey:d.value})}},M=()=>{const l=n.value.parentElement,i=window.event;i==null||i.stopPropagation(),i==null||i.preventDefault();const m=n.value.clientHeight,h=n.value.clientWidth,w=i.clientX,x=i.clientY,g=a=>{const c=a.clientX,R=a.clientY-x,z=c-w,N=m+R>C.value?m+R>l.clientHeight?l.clientHeight:m+R:C.value,k=h+z>D.value?h+z>l.clientWidth?l.clientWidth:h+z:D.value;n.value.style.width=k+"px",n.value.style.height=N+"px"},f=()=>{document.removeEventListener("mousemove",g),document.removeEventListener("mouseup",f),console.log(n.value.style.transform);let{left:a,top:c}=_();t("onDragResize",{left:a,top:c,height:n.value.style.height,width:n.value.style.width,nodeKey:d.value})};document.addEventListener("mousemove",g),document.addEventListener("mouseup",f)},_=()=>{let l=/(\d+px, \d+px)/;return{left:n.value.style.transform.match(l)[0].split(",")[0],top:n.value.style.transform.match(l)[0].split(",")[1]}};return o.onMounted(()=>{n.value.parentElement.style.position="relative",n.value.style.height=v.value.height+"px",n.value.style.width=v.value.width+"px",n.value.style.transform=`translate3d(${v.value.left}px, ${v.value.top}px,0)`}),(l,i)=>(o.openBlock(),o.createElementBlock("div",{ref_key:"dragResize",ref:n,class:"drag-resize-container",onMousedown:$},[o.renderSlot(l.$slots,"default",{},void 0,!0),o.createElementVNode("div",{ref:"resizeNode",class:"resize-node",onMousedown:o.withModifiers(M,["stop"])},null,40,L)],544))}}),K="",E=((e,t)=>{const r=e.__vccOpts||e;for(const[u,d]of t)r[u]=d;return r})(T,[["__scopeId","data-v-47670c79"]]);return e=>{e.component(E.name,E)}});
