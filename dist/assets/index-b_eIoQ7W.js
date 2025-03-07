var Z=f=>{throw TypeError(f)};var W=(f,h,y)=>h.has(f)||Z("Cannot "+y);var t=(f,h,y)=>(W(f,h,"read from private field"),y?y.call(f):h.get(f)),L=(f,h,y)=>h.has(f)?Z("Cannot add the same private member more than once"):h instanceof WeakSet?h.add(f):h.set(f,y),N=(f,h,y,b)=>(W(f,h,"write to private field"),b?b.call(f,y):h.set(f,y),y),n=(f,h,y)=>(W(f,h,"access private method"),y);(function(){const h=document.createElement("link").relList;if(h&&h.supports&&h.supports("modulepreload"))return;for(const m of document.querySelectorAll('link[rel="modulepreload"]'))b(m);new MutationObserver(m=>{for(const x of m)if(x.type==="childList")for(const E of x.addedNodes)E.tagName==="LINK"&&E.rel==="modulepreload"&&b(E)}).observe(document,{childList:!0,subtree:!0});function y(m){const x={};return m.integrity&&(x.integrity=m.integrity),m.referrerPolicy&&(x.referrerPolicy=m.referrerPolicy),m.crossOrigin==="use-credentials"?x.credentials="include":m.crossOrigin==="anonymous"?x.credentials="omit":x.credentials="same-origin",x}function b(m){if(m.ep)return;m.ep=!0;const x=y(m);fetch(m.href,x)}})();const yt=':host{display:block;position:relative;width:100%}:host(:not([scrollbar])) ::slotted([slot="scroller"]){scrollbar-width:none}:host(:not([scrollbar])) ::slotted([slot="scroller"])::-webkit-scrollbar{display:none}::slotted([slot="scroller"]){position:relative;margin:0;display:flex;gap:var(--sc-gap);scroll-behavior:var(--sc-behavior)}:host(:not([vertical])) ::slotted([slot="scroller"]){overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;scroll-padding-inline:var(--sc-padding);padding-inline:var(--sc-padding)!important}:host([vertical]) ::slotted([slot="scroller"]){flex-direction:column;overflow-y:auto;scroll-snap-type:y mandatory;overscroll-behavior-y:contain;padding-block:var(--sc-padding)!important;scroll-padding-block:var(--sc-padding)}',mt="snap-carousel:not([scrollbar]) [slot=scroller]::-webkit-scrollbar{display:none}snap-carousel [slot=scroller]{display:flex}snap-carousel[vertical]{display:flex;flex-direction:column}snap-carousel[vertical] [slot=scroller]{flex-direction:column;height:100%}snap-carousel [slot=scroller]>*{display:block;flex:0 0 auto}snap-carousel:not([vertical]) [slot=scroller]>*{width:calc((100% / var(--sc-perpage, 1)) - var(--sc-gap, 0) + (var(--sc-gap, 0) / var(--sc-perpage, 1)));max-width:100%}snap-carousel[vertical] [slot=scroller]>*{max-height:100%;height:calc((100% / var(--sc-perpage, 1)) - var(--sc-gap, 0) + (var(--sc-gap, 0) / var(--sc-perpage, 1)))}",bt=`<slot name="scroller">
  <ul></ul>
</slot>

<div part="controls">
  <div part="buttons">
    <slot name="before-prev"></slot>
    <slot name="prev-buttons">
      <button part="button control-button prev-button" type="button" direction="prev"
        aria-label="Previous">Previous</button>
    </slot>
    <slot name="next-buttons">
      <button part="button control-button next-button" type="button" direction="next" aria-label="Next">Next</button>
    </slot>
    <slot name="after-next"></slot>
  </div>

  <slot name="pagination">
    <div part="nav"></div>
  </slot>

  <div part="pager">
    <slot name="current">
      <span part="current"></span>
    </slot>
    <slot name="sep">
      <span part="page-sep">&nbsp;/&nbsp;</span>
    </slot>
    <slot name="total">
      <span part="total"></span>
    </slot>
  </div>
</div>
`;((f,h,y,b,m,x,E,A,gt)=>{var C,w,u,d,o,I,s,O,H,Q,X,D,V,Y,F,U,B,K,_,j,tt,et,st,R,it,nt,k,rt,ot,at,lt,ct,ht,S,dt,pt,ut,ft,G,q,J,T;if(!("onscrollend"in f)){let i=function(l,c,g){let v=l[c];l[c]=function(){g.apply(this,[v,...arguments])}},r=function(l,c,g){if(c!=="scroll"&&c!=="scrollend")return;const v=this,p=e.get(v)||{scrollListener:P=>{E(p.t),p.t=A(()=>{$.size?A(p.scrollListener,100):(v.dispatchEvent(vt),p.t=0)},100)},t:0,listeners:0};e.has(v)||(l.apply(v,["scroll",p.scrollListener]),e.set(v,p)),p.listeners++},a=function(l,c,g){if(c!=="scroll"&&c!=="scrollend")return;const v=this,p=e.get(v);p&&(p.listeners--,p.listeners<=0&&(l.apply(v,["scroll",p.scrollListener]),e.delete(v)))};var xt=i,Lt=r,Et=a;const vt=new Event("scrollend"),$=new Set;h.addEventListener("touchstart",l=>{for(let c of l.changedTouches)$.add(c.identifier)},{passive:!0}),h.addEventListener("touchend",l=>{for(let c of l.changedTouches)$.delete(c.identifier)},{passive:!0});const e=new WeakMap;i(m.prototype,"addEventListener",r),i(f,"addEventListener",r),i(h,"addEventListener",r),i(m.prototype,"removeEventListener",a),i(f,"removeEventListener",a),i(h,"removeEventListener",a)}const M=class M extends HTMLElement{constructor(){super();L(this,s);L(this,C);L(this,w);L(this,u,{controls:{buttons:[]},pagination:{container:null,dots:[],active:null},pager:{container:null,current:null,sep:null,total:null},scroller:null,items:null});L(this,d,{default:{},origin:{},current:{}});L(this,o,{index:0,itemsCount:0,pageCount:0,isVisible:!1,autoplayInterval:null,breakpoint:void 0});L(this,I,"snp-c");t(this,d).default=M.defaultConfig}static get observedAttributes(){const e=b.keys(M.defaultConfig).map(i=>i.replace(/[A-Z]/g,r=>"-"+r.toLowerCase()));return[...e,...e.map(i=>"data-"+i)]}static get defaultConfig(){return{autoplay:0,displayed:1,perPage:1,gap:0,padding:0,controls:!1,nav:!1,pager:!1,loop:!1,behavior:"smooth",stop:!1,usePause:!0,vertical:!1,responsive:[]}}connectedCallback(){if(!this.isConnected)return;const e=h.createElement("template");e.innerHTML=`<style>${yt}</style>${bt}`,this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(e.content.cloneNode(!0));const i=n(this,s,S).call(this,"scroller",{fallback:!0})[0];new MutationObserver(a=>{a.forEach(l=>{(l.addedNodes.length||l.removedNodes.length)&&(n(this,s,H).call(this),n(this,s,B).call(this))})}).observe(i,{childList:!0}),n(this,s,O).call(this)}attributeChangedCallback(){t(this,o).ready&&n(this,s,D).call(this)}goTo(e){N(this,C,!1);const{scroller:i,items:r}=t(this,u),{perPage:a,vertical:l}=t(this,d).current,c=e>t(this,o).pageCount-1?0:e<0?t(this,o).pageCount-1:e,g=r[c*a];n(this,s,k).call(this,c),t(this,o).ready=!0;let v=0,p=0;l?v=g.offsetTop:p=n(this,s,q).call(this)?g.offsetLeft:g.offsetLeft+g.offsetWidth-i.offsetWidth,N(this,C,!0),gt(()=>{i.scrollTo({top:v,left:p})},{timeout:100})}prev(){this.goTo(this.state.index-1)}next(){this.goTo(this.state.index+1)}};C=new WeakMap,w=new WeakMap,u=new WeakMap,d=new WeakMap,o=new WeakMap,I=new WeakMap,s=new WeakSet,O=function(){const e=n(this,s,S).call(this,"scroller",!0)[0];e&&(e.onscroll=n(this,s,st).bind(this),e.addEventListener("scrollend",n(this,s,nt).bind(this)),f.addEventListener("resize",n(this,s,et).bind(this)),t(this,u).scroller=e,this.elements=t(this,u),this.settings=t(this,d),this.state=t(this,o),this.ariaRoleDescription="carousel",b.assign(e,{role:"group",ariaLive:"polite",ariaAtomic:!1}),n(this,s,H).call(this),n(this,s,Q).call(this),n(this,s,X).call(this),n(this,s,D).call(this),n(this,s,tt).call(this),t(this,o).ready=!0)},H=function(){const e=y.from(t(this,u).scroller.children).filter(r=>!["absolute","fixed"].includes(getComputedStyle(r).position)),i=e.length;t(this,u).items=e,t(this,o).itemsCount=i,e.forEach((r,a)=>{r.dataset.index=a,b.assign(r,{ariaSetSize:i,ariaPosInSet:a+1,ariaRoleDescription:"slide",role:"listitem"})})},Q=function(){const i=`${t(this,I)}-global-styles`;if(h.querySelector("#"+i))return;const r=mt;h.head.append(n(this,s,G).call(this,r,i))},X=function(){this.id=t(this,o).id=t(this,I)+"-"+(Math.random()+1).toString(36).substring(4)},D=function(){t(this,o).breakpoint=void 0,t(this,d).origin=b.assign({},t(this,d).default,n(this,s,Y).call(this)),t(this,d).origin.responsive=(t(this,d).origin.responsive||[]).sort((e,i)=>e.breakpoint-i.breakpoint),n(this,s,U).call(this)},V=function(e){t(this,u).scroller.clientWidth?e():requestAnimationFrame(()=>{n(this,s,V).call(this,e)})},Y=function(){const e=b.keys(t(this,d).default);return this.attributes.options?n(this,s,F).call(this,this.attributes.options.value):y.from(this.attributes).reduce((i,r)=>{const a=r.name.replace("data-","").replace(/-([a-z])/g,l=>l[1].toUpperCase());return e.includes(a)&&(i[a]=n(this,s,F).call(this,r.value)),i},{})},F=function(e){if(e==="")return!0;try{return JSON.parse(e)}catch{return e}},U=function(){const{origin:e}=t(this,d),i=e.responsive.reduce((a,l)=>l.breakpoint<f.innerWidth?l:a,{breakpoint:null}),r=b.assign({},e,i.config||{});r.perPage=Math.min(r.displayed,r.perPage),t(this,d).current=r,t(this,o).breakpoint!==i.breakpoint&&(t(this,o).breakpoint=i.breakpoint,n(this,s,B).call(this))},B=function(){n(this,s,V).call(this,()=>{n(this,s,_).call(this),n(this,s,j).call(this),n(this,s,ot).call(this),n(this,s,at).call(this),n(this,s,ht).call(this),n(this,s,K).call(this),n(this,s,k).call(this,0)})},K=function(){const{vertical:e}=t(this,d).current,i=e?"padding-top":"padding-left";t(this,o).computedPadding=parseInt(getComputedStyle(t(this,u).scroller)[i],10)},_=function(){const{current:e}=t(this,d),{itemsCount:i}=t(this,o),r=Math.floor((e.displayed-e.perPage)/e.perPage);t(this,o).pageCount=Math.ceil(i/e.perPage)-r},j=function(){const e=h.querySelector("#"+t(this,o).id+"-styles");e&&e.remove();const{displayed:i,gap:r,padding:a,perPage:l,stop:c,behavior:g}=t(this,d).current,v=l>1?`*:nth-child(${l}n + 1)`:"*",p=`#${t(this,o).id} { --sc-perpage: ${i}; --sc-gap: ${n(this,s,J).call(this,r)}; --sc-padding: ${n(this,s,J).call(this,a)}; --sc-behavior: ${g}; } #${t(this,o).id} [slot="scroller"] > ${v} { scroll-snap-align: start; scroll-snap-stop: ${c?"always":"normal"} }`;this.styles=n(this,s,G).call(this,p,t(this,o).id+"-styles"),h.head.append(this.styles)},tt=function(){const{items:e,scroller:i}=t(this,u);new x(l=>{let c=l[0];t(this,o).isVisible=c.intersectionRatio>.1,t(this,o).pause=!t(this,o).isVisible,n(this,s,T).call(this)},{threshold:[.1,.9]}).observe(this),t(this,d).current.usePause&&(this.addEventListener("mouseenter",()=>{t(this,o).pause=!0,n(this,s,T).call(this)}),this.addEventListener("mouseleave",()=>{t(this,o).pause=!1,n(this,s,T).call(this)}));const a=new x(l=>{l.forEach(c=>{c.target.toggleAttribute("visible",c.isIntersecting),c.target.toggleAttribute("inert",!c.isIntersecting)})},{scroller:i,threshold:.6});e.forEach(l=>a.observe(l))},et=function(){E(this.resizeTm),this.resizeTm=A(()=>{n(this,s,K).call(this),n(this,s,U).call(this)},100)},st=function(){if(t(this,w))return;n(this,s,it).call(this),this.newIndex=t(this,o).index;const e=n(this,s,rt).call(this);e!=t(this,o).index&&(this.newIndex=e,n(this,s,k).call(this,e),n(this,s,R).call(this,"scrollupdate"))},R=function(e){const{current:i}=t(this,d);this.dispatchEvent(new CustomEvent(e,{detail:t(this,o)})),i["on"+e]&&i["on"+e](this)},it=function(){t(this,o).isMoving||n(this,s,R).call(this,"scrollstart"),t(this,o).isMoving=!0},nt=function(){t(this,w)||(n(this,s,R).call(this,"scrollend"),N(this,C,!1),t(this,o).isMoving=!1,typeof this.newIndex=="number"?(n(this,s,k).call(this,this.newIndex),this.newIndex=null):n(this,s,k).call(this,t(this,o).index),n(this,s,T).call(this))},k=function(e){typeof e<"u"&&(t(this,o).index=e),n(this,s,ft).call(this),t(this,C)||(n(this,s,dt).call(this),n(this,s,pt).call(this)),n(this,s,ut).call(this)},rt=function(e){const{scroller:i,items:r}=t(this,u),{perPage:a,vertical:l}=t(this,d).current,c=n(this,s,q).call(this);let g=0;l?g=i.scrollTop:g=c?i.scrollLeft:i.scrollLeft+i.clientWidth;let v=r.map(p=>{let P=0;return l?P=p.offsetTop-(t(this,o).computedPadding||0)-g:P=(c?p.offsetLeft:p.offsetLeft+p.clientWidth)-(t(this,o).computedPadding||0)-g,{index:parseInt(p.dataset.index,10),distance:Math.abs(P)}}).reduce((p,P)=>!p||P.distance<p.distance?P:p,null);return e?v:Math.ceil(v.index/a)},ot=function(){const{pagination:e}=t(this,u);let{container:i,dots:r}=e,{current:a}=t(this,d);if(i?(i.innerHTML=null,r.forEach(l=>l.remove()),t(this,u).pagination.dots=[]):(i=n(this,s,S).call(this,"pagination")[0],i.addEventListener("keydown",n(this,s,ct).bind(this)),e.container=i),i.style.display=a.nav&&t(this,o).pageCount>1?"":"none",a.nav&&i)for(let l=0;l<t(this,o).pageCount;l++)n(this,s,lt).call(this,l)},at=function(){const{pager:e}=t(this,u),{current:i}=t(this,d);e.current||(["current","sep","total"].forEach(r=>{e[r]=n(this,s,S).call(this,r)[0]}),e.container=this.shadowRoot.querySelector('[part="pager"]')),e.container.style.display=i.pager&&t(this,o).pageCount>1?"":"none",e.current.innerHTML=1,e.total.innerHTML=t(this,o).pageCount},lt=function(e){const{pagination:i}=t(this,u),{container:r,dots:a}=i,l=h.createElement("button");l.innerHTML=e+1,l.addEventListener("click",()=>this.goTo(e)),b.assign(l,{type:"button",part:"button nav-button",ariaControls:t(this,u).scroller.id,ariaSelected:!1}),r.append(l),a.push(l)},ct=function(e){const i=n(this,s,q).call(this),r=t(this,u).pagination.dots[t(this,o).index]||0;switch(e.key){case"ArrowRight":case"ArrowLeft":let a=e.key==="ArrowRight"?i?"next":"previous":i?"previous":"next";const l=r[`${a}ElementSibling`];l&&(l.click(),l.focus());break}},ht=function(){const{controls:e}=t(this,u),{current:i}=t(this,d),r=!i.controls||t(this,o).pageCount<2;e.buttons=[...n(this,s,S).call(this,"prev-buttons"),...n(this,s,S).call(this,"next-buttons")],e.buttons.forEach(a=>{a.style=r?"display: none !important;":"",!a.hasListener&&(a.direction=a.getAttribute("direction")||"next",a.modifier=(a.direction==="next"?1:-1)*(parseInt(a.getAttribute("modifier"),10)||1),a.hasListener=!0,a.addEventListener("click",()=>{i.controls&&this.goTo(t(this,o).index+a.modifier)}),b.assign(a,{ariaControls:t(this,u).scroller.id}))})},S=function(e,i={fallback:!1}){const r=this.shadowRoot.querySelector([`[name="${e}"]`]);let a=r.assignedElements();return i.fallback&&!a.length&&this.children[0].slot===""&&(this.children[0].slot="scroller",a=r.assignedElements()),y.from(a.length?a:r.children)},dt=function(){if(!t(this,d).current.nav)return;const{pagination:e}=t(this,u);let{dots:i,active:r}=e;const a=i[t(this,o).index];a&&(r&&(b.assign(r,{tabIndex:0,ariaSelected:!1}),r.part="button nav-button"),a.part="button nav-button active",b.assign(a,{tabIndex:-1,ariaSelected:!0}),e.active=a)},pt=function(){t(this,d).current.pager&&(t(this,u).pager.current.innerHTML=t(this,o).index+1)},ut=function(){const{loop:e}=t(this,d).current,{buttons:i}=t(this,u).controls,{index:r,pageCount:a}=t(this,o);let l=!1;if(i.forEach(c=>{const g=!e&&(c.direction==="next"?r>=a-c.modifier:r<Math.abs(c.modifier));c===this.shadowRoot.activeElement&&g&&(l=!0),c.disabled=g?"disabled":""}),l){const c=i.filter(g=>!g.disabled);c.length&&c[0].focus()}},ft=function(){const{sync:e}=t(this,d).current;e&&t(this,o).ready&&(t(this,u).sync=t(this,u).sync||h.querySelectorAll(e)||[],t(this,u).sync.forEach(i=>{i instanceof M&&i.goTo(t(this,o).index)}))},G=function(e,i){const r=h.createElement("style");return r.id=i,r.append(h.createTextNode(e)),r},q=function(){return h.firstElementChild.getAttribute("dir")!=="rtl"},J=function(e){return typeof e=="string"?e:e+"px"},T=function(){if(!t(this,d).current.autoplay)return;const{pause:e,isVisible:i}=t(this,o);!e&&i?t(this,o).autoplayInterval||(t(this,o).autoplayInterval=A(()=>{t(this,o).autoplayInterval=null,this.goTo(t(this,o).index+1)},t(this,d).current.autoplay)):(E(t(this,o).autoplayInterval),t(this,o).autoplayInterval=null)};let z=M;f.customElements&&customElements.define("snap-carousel",z)})(window,document,Array,Object,Element,IntersectionObserver,clearTimeout,setTimeout,requestIdleCallback);
