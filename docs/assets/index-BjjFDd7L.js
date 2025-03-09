var Z=p=>{throw TypeError(p)};var $=(p,n,t)=>n.has(p)||Z("Cannot "+t);var e=(p,n,t)=>($(p,n,"read from private field"),t?t.call(p):n.get(p)),E=(p,n,t)=>n.has(p)?Z("Cannot add the same private member more than once"):n instanceof WeakSet?n.add(p):n.set(p,t),P=(p,n,t,s)=>($(p,n,"write to private field"),s?s.call(p,t):n.set(p,t),t),o=(p,n,t)=>($(p,n,"access private method"),t);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function t(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(r){if(r.ep)return;r.ep=!0;const l=t(r);fetch(r.href,l)}})();if(typeof window<"u"&&!("onscrollend"in window)){let s=function(u,d,g){let m=u[d];u[d]=function(){let a=Array.prototype.slice.apply(arguments,[0]);m.apply(this,a),a.unshift(m),g.apply(this,a)}},r=function(u,d,g,m){if(d!="scroll"&&d!="scrollend")return;let a=this,c=t.get(a);if(c===void 0){let f=0;c={scrollListener:v=>{clearTimeout(f),f=setTimeout(()=>{n.size?setTimeout(c.scrollListener,100):(a&&a.dispatchEvent(p),f=0)},100)},listeners:0},u.apply(a,["scroll",c.scrollListener]),t.set(a,c)}c.listeners++},l=function(u,d,g){if(d!="scroll"&&d!="scrollend")return;let m=this,a=t.get(m);a!==void 0&&(--a.listeners>0||(u.apply(m,["scroll",a.scrollListener]),t.delete(m)))};var Ct=s,Pt=r,kt=l;const p=new Event("scrollend"),n=new Set;document.addEventListener("touchstart",u=>{for(let d of u.changedTouches)n.add(d.identifier)},{passive:!0}),document.addEventListener("touchend",u=>{for(let d of u.changedTouches)n.delete(d.identifier)},{passive:!0}),document.addEventListener("touchcancel",u=>{for(let d of u.changedTouches)n.delete(d.identifier)},{passive:!0});let t=new WeakMap;s(Element.prototype,"addEventListener",r),s(window,"addEventListener",r),s(document,"addEventListener",r),s(Element.prototype,"removeEventListener",l),s(window,"removeEventListener",l),s(document,"removeEventListener",l)}const mt=':host{display:block;position:relative;width:100%}:host(:not([scrollbar])) ::slotted([slot="scroller"]){scrollbar-width:none}:host(:not([scrollbar])) ::slotted([slot="scroller"])::-webkit-scrollbar{display:none}::slotted([slot="scroller"]){position:relative;margin:0;display:flex;gap:var(--gap);scroll-behavior:var(--behavior)}:host(:not([vertical])) ::slotted([slot="scroller"]){overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;scroll-padding-inline:var(--padding);padding-inline:var(--padding)!important}:host([vertical]) ::slotted([slot="scroller"]){flex-direction:column;overflow-y:auto;scroll-snap-type:y mandatory;overscroll-behavior-y:contain;padding-block:var(--padding)!important;scroll-padding-block:var(--padding)}',vt="[snpc]{--sc-item-size: calc( (100% / var(--perpage, 1)) - var(--gap, 0) + (var(--gap, 0) / var(--perpage, 1)) )}[snpc]:not([scrollbar]) [snpc-s]::-webkit-scrollbar{display:none}[snpc-s]{display:flex}[vertical]>[snpc-s]{flex-direction:column;height:100%}[snpc-s]>[data-index]{display:block;flex:0 0 auto;width:var(--sc-item-size);max-width:100%}[vertical]>[snpc-s]>[data-index]{width:initial;max-width:initial;height:var(--sc-item-size);max-height:100%}[class*=sc-anchor]{scroll-snap-align:start;scroll-snap-stop:normal}.sc-anchor-stop{scroll-snap-stop:always}",bt=`<slot name="scroller">
  <ul></ul>
</slot>

<div part="controls">
  <div part="buttons" style="display: none;">
    <slot name="before-prev"></slot>
    <slot name="prev-buttons">
      <button style="display: none;" part="button control-button prev-button" type="button" direction="prev" aria-label="Previous">
        <slot name="prev-icon"></slot>
        <slot name="prev-label">Previous</slot>
      </button>
    </slot>
    <slot name="next-buttons">
      <button style="display: none;" part="button control-button next-button" type="button" direction="next" aria-label="Next">
        <slot name="next-label">Next</slot>
        <slot name="next-icon"></slot>
      </button>
    </slot>
    <slot name="after-next"></slot>
  </div>

  <slot name="pagination">
    <div part="nav" style="display: none;"></div>
  </slot>

  <div part="pager" style="display: none;">
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
`;var w,A,T,I,h,b,y,L,i,z,j,R,V,Q,X,q,Y,D,W,_,tt,F,et,st,it,nt,rt,O,C,ot,at,U,lt,H,G,k;const S=class S extends HTMLElement{constructor(){super();E(this,i);E(this,w,!1);E(this,A,!1);E(this,T,"snap-carousel");E(this,I,"");E(this,h,{index:0,itemsCount:0,pageCount:0,pages:[],isVisible:!1,autoplayInterval:null,breakpoint:void 0,ready:!1,isMoving:!1,pause:!1,computedPadding:0});E(this,b,{scroller:null,items:null,sync:null});E(this,y,{default:{},origin:{},current:{}});E(this,L,{init:[],updateState:[]});e(this,y).default=S.defaultConfig,P(this,I,this.getAttribute("style")),this.setAttribute("snpc","")}get elements(){return e(this,b)}get settings(){return e(this,y)}get state(){return e(this,h)}get preventUiUpdate(){return e(this,w)}getSlotElements(t,s={fallback:!1}){return o(this,i,U).call(this,t,s)}isDocumentLtr(){return o(this,i,H).call(this)}registerHook(t,s){e(this,L)[t]&&e(this,L)[t].push(s)}static get defaultConfig(){return{autoplay:0,displayed:1,perPage:1,gap:0,padding:0,controls:!1,nav:!1,pager:!1,loop:!1,behavior:"smooth",stop:!1,usePause:!0,vertical:!1,responsive:[],sync:null}}static get observedAttributes(){const t=Object.keys(S.defaultConfig).map(s=>s.replace(/[A-Z]/g,r=>"-"+r.toLowerCase()));return[...t,...t.map(s=>"data-"+s)]}connectedCallback(){if(!this.isConnected)return;const t=document.createElement("template");if(t.innerHTML=`<style>${mt}</style>${bt}`,this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(t.content.cloneNode(!0)),e(this,b).scroller=o(this,i,U).call(this,"scroller",{fallback:!0})[0],!e(this,b).scroller)return;new MutationObserver(r=>{r.forEach(l=>{(l.addedNodes.length||l.removedNodes.length)&&(o(this,i,V).call(this),o(this,i,R).call(this))})}).observe(e(this,b).scroller,{childList:!0}),e(this,b).scroller.setAttribute("snpc-s",""),e(this,b).scroller.onscroll=o(this,i,it).bind(this),e(this,b).scroller.addEventListener("scrollend",o(this,i,rt).bind(this)),window.addEventListener("resize",o(this,i,st).bind(this)),this.ariaRoleDescription="carousel",Object.assign(e(this,b).scroller,{role:"group",ariaLive:"polite",ariaAtomic:!1}),o(this,i,X).call(this),o(this,i,V).call(this),o(this,i,Q).call(this),o(this,i,j).call(this),o(this,i,et).call(this),e(this,h).ready=!0}attributeChangedCallback(){e(this,h).ready&&o(this,i,j).call(this)}goTo(t){P(this,w,!1);const{scroller:s,items:r}=e(this,b),{perPage:l,vertical:u}=e(this,y).current,d=t>e(this,h).pageCount-1?0:t<0?e(this,h).pageCount-1:t,g=r[d*l];o(this,i,C).call(this,d),e(this,h).ready=!0;let m=0,a=0;u?m=g.offsetTop:a=o(this,i,H).call(this)?g.offsetLeft:g.offsetLeft+g.offsetWidth-s.offsetWidth,P(this,w,!0),requestIdleCallback(()=>{s.scrollTo({top:m,left:a})},{timeout:100})}prev(){this.goTo(this.state.index-1)}next(){this.goTo(this.state.index+1)}static setVisibility(t,s){s?t.removeAttribute("style"):t.setAttribute("style","display: none!important;")}static registerElement(t,s){window.customElements&&customElements.define(t,s)}};w=new WeakMap,A=new WeakMap,T=new WeakMap,I=new WeakMap,h=new WeakMap,b=new WeakMap,y=new WeakMap,L=new WeakMap,i=new WeakSet,z=function(t,...s){e(this,L)[t]&&e(this,L)[t].forEach(r=>r.apply(this,s))},j=function(){e(this,h).breakpoint=void 0,e(this,y).origin=Object.assign({},e(this,y).default,o(this,i,Y).call(this)),e(this,y).origin.responsive=(e(this,y).origin.responsive||[]).sort((t,s)=>t.breakpoint-s.breakpoint),o(this,i,W).call(this)},R=function(){o(this,i,q).call(this,()=>{o(this,i,_).call(this),o(this,i,tt).call(this),o(this,i,F).call(this),o(this,i,C).call(this,0),o(this,i,z).call(this,"init")})},V=function(){const t=Array.from(e(this,b).scroller.children).filter(r=>!["absolute","fixed","sticky"].includes(getComputedStyle(r).position)),s=t.length;e(this,b).items=t,e(this,h).itemsCount=s,t.forEach((r,l)=>{r.id=`${this.id}-slide-${l}`,r.dataset.index=l,Object.assign(r,{ariaSetSize:s,ariaPosInSet:l+1,ariaRoleDescription:"slide",role:"listitem"})})},Q=function(){const s=`${e(this,T)}-global-styles`;if(document.querySelector("#"+s))return;const r=vt;document.head.append(o(this,i,lt).call(this,r,s))},X=function(){this.id=e(this,h).id=e(this,T)+"-"+(Math.random()+1).toString(36).substring(4),e(this,b).scroller.id=this.id+"-scroller"},q=function(t){e(this,b).scroller.clientWidth?t():requestAnimationFrame(()=>{o(this,i,q).call(this,t)})},Y=function(){const t=Object.keys(e(this,y).default);return this.attributes.options?o(this,i,D).call(this,this.attributes.options.value):Array.from(this.attributes).reduce((s,r)=>{const l=r.name.replace("data-","").replace(/-([a-z])/g,u=>u[1].toUpperCase());return t.includes(l)&&(s[l]=o(this,i,D).call(this,r.value)),s},{})},D=function(t){if(t==="")return!0;try{return JSON.parse(t)}catch{return t}},W=function(){const{origin:t}=e(this,y),s=t.responsive.reduce((l,u)=>u.breakpoint<window.innerWidth?u:l,{breakpoint:null}),r=Object.assign({},t,s.settings||{});r.perPage=Math.min(r.displayed,r.perPage),e(this,y).current=r,e(this,h).breakpoint!==s.breakpoint&&(e(this,h).breakpoint=s.breakpoint,o(this,i,R).call(this))},_=function(){const{current:t}=e(this,y),{itemsCount:s}=e(this,h),r=Math.floor((t.displayed-t.perPage)/t.perPage);e(this,h).pageCount=Math.ceil(s/t.perPage)-r,e(this,h).pages=Array.from({length:e(this,h).pageCount},(l,u)=>{const d=u*t.perPage,g=Math.min(d+t.perPage,s);return Array.from({length:g-d},(m,a)=>e(this,b).items[d+a])})},tt=function(){const{displayed:t,gap:s,padding:r,perPage:l,stop:u,behavior:d}=e(this,y).current,g=o(this,i,G).call(this,s),m=o(this,i,G).call(this,r),a=`sc-anchor${u?"-stop":""}`;this.style=`--perpage: ${t};--gap: ${g};--padding: ${m};--behavior: ${d};${e(this,I)}`,this.elements.items.forEach((c,f)=>{f%l===0?c.classList.add(a):c.classList.remove(a)})},F=function(){const{vertical:t}=e(this,y).current,s=t?"padding-top":"padding-left";e(this,h).computedPadding=parseInt(getComputedStyle(e(this,b).scroller)[s],10)},et=function(){const{items:t,scroller:s}=e(this,b);new IntersectionObserver(u=>{const d=u[0];e(this,h).isVisible=d.intersectionRatio>.1,e(this,h).pause=!e(this,h).isVisible,o(this,i,k).call(this)},{threshold:[.1,.9]}).observe(this),e(this,y).current.usePause&&(this.addEventListener("mouseenter",()=>{e(this,h).pause=!0,o(this,i,k).call(this)}),this.addEventListener("mouseleave",()=>{e(this,h).pause=!1,o(this,i,k).call(this)}));const l=new IntersectionObserver(u=>{u.forEach(d=>{d.target.toggleAttribute("visible",d.isIntersecting),d.target.toggleAttribute("inert",!d.isIntersecting)})},{scroller:s,threshold:.6});t.forEach(u=>l.observe(u))},st=function(){clearTimeout(this.resizeTm),this.resizeTm=setTimeout(()=>{o(this,i,F).call(this),o(this,i,W).call(this)},100)},it=function(){if(e(this,A))return;o(this,i,nt).call(this),this.newIndex=e(this,h).index;const t=o(this,i,ot).call(this);t!==e(this,h).index&&(this.newIndex=t,o(this,i,C).call(this,t),o(this,i,O).call(this,"scrollupdate"))},nt=function(){e(this,h).isMoving||o(this,i,O).call(this,"scrollstart"),e(this,h).isMoving=!0},rt=function(){e(this,A)||(o(this,i,O).call(this,"scrollend"),P(this,w,!1),e(this,h).isMoving=!1,typeof this.newIndex=="number"?(o(this,i,C).call(this,this.newIndex),this.newIndex=null):o(this,i,C).call(this,e(this,h).index),o(this,i,k).call(this))},O=function(t){const{current:s}=e(this,y);this.dispatchEvent(new CustomEvent(t,{detail:e(this,h)})),s["on"+t]&&s["on"+t](this)},C=function(t){typeof t<"u"&&(e(this,h).index=t),o(this,i,at).call(this),!e(this,w)&&o(this,i,z).call(this,"updateState",t)},ot=function(t){const{scroller:s,items:r}=e(this,b),{perPage:l,vertical:u}=e(this,y).current,d=o(this,i,H).call(this);let g=0;u?g=s.scrollTop:g=d?s.scrollLeft:s.scrollLeft+s.clientWidth;let m=r.map(a=>{let c=0;return u?c=a.offsetTop-(e(this,h).computedPadding||0)-g:c=(d?a.offsetLeft:a.offsetLeft+a.clientWidth)-(e(this,h).computedPadding||0)-g,{index:parseInt(a.dataset.index,10),distance:Math.abs(c)}}).reduce((a,c)=>!a||c.distance<a.distance?c:a,null);return t?m:Math.ceil(m.index/l)},at=function(){const{sync:t}=e(this,y).current;t&&e(this,h).ready&&(e(this,b).sync=e(this,b).sync||Array.from(document.querySelectorAll(t)),e(this,b).sync.forEach(s=>{s instanceof S&&s.goTo(e(this,h).index)}))},U=function(t,s={fallback:!1}){const r=this.shadowRoot.querySelector(`[name="${t}"]`);let l=r.assignedElements();return s.fallback&&!l.length&&this.children[0].slot===""&&(this.children[0].slot="scroller",l=r.assignedElements()),Array.from(l.length?l:r.children)},lt=function(t,s){const r=document.createElement("style");return r.id=s,r.append(document.createTextNode(t)),r},H=function(){return document.firstElementChild.getAttribute("dir")!=="rtl"},G=function(t){return typeof t=="string"?t:t+"px"},k=function(){if(!e(this,y).current.autoplay)return;const{pause:t,isVisible:s}=e(this,h);!t&&s?e(this,h).autoplayInterval||(e(this,h).autoplayInterval=setTimeout(()=>{e(this,h).autoplayInterval=null,this.goTo(e(this,h).index+1)},e(this,y).current.autoplay)):(clearTimeout(e(this,h).autoplayInterval),e(this,h).autoplayInterval=null)};let N=S;function yt(...p){return p.reduce((n,t)=>t(n),N)}const xt=p=>{var n,t,ct,K,l;return l=class extends p{constructor(){super();E(this,t);E(this,n,{container:null,buttons:[]});this.elements.controls=e(this,n),this.registerHook("init",o(this,t,ct).bind(this)),this.registerHook("updateState",o(this,t,K).bind(this))}},n=new WeakMap,t=new WeakSet,ct=function(){const{current:d}=this.settings,g=!d.controls||this.state.pageCount<2,m=this.getSlotElements("prev-buttons"),a=this.getSlotElements("next-buttons");if(e(this,n).container=this.shadowRoot.querySelector('[part="buttons"]'),!e(this,n).container)return;const{container:c,buttons:f}=e(this,n);p.setVisibility(c,!g),!(!m.length&&!a.length)&&(f.push(...m,...a),f.forEach(v=>{v.hasListener||(v.direction=v.getAttribute("direction")||"next",v.modifier=(v.direction==="next"?1:-1)*(parseInt(v.getAttribute("modifier"),10)||1),v.hasListener=!0,v.addEventListener("click",()=>{d.controls&&this.goTo(this.state.index+v.modifier)}))}),o(this,t,K).call(this))},K=function(){if(!e(this,n).buttons.length)return;const{loop:d}=this.settings.current,{index:g,pageCount:m}=this.state;let a=!1;if(e(this,n).buttons.forEach(c=>{const f=!d&&(c.direction==="next"?g>=m-c.modifier:g<Math.abs(c.modifier));if(c===this.shadowRoot.activeElement&&f&&(a=!0),c.disabled=!!f,c.setAttribute("aria-disabled",!!f),f)c.removeAttribute("aria-controls");else{let v=g+c.modifier;v<0?v=m-1:v>=m&&(v=0);const x=this.state.pages[v];if(x!=null&&x.length){const M=x.map(gt=>{var J;return(J=this.elements.items[gt])==null?void 0:J.id}).filter(Boolean);M.length&&c.setAttribute("aria-controls",M.join(" "))}}}),a){const c=e(this,n).buttons.filter(f=>!f.disabled);c.length&&c[0].focus()}},l},Et=p=>{var n,t,s,ht,dt,B,ut,g;return g=class extends p{constructor(){super();E(this,s);E(this,n,{container:null,dots:[],active:null});E(this,t,"button nav-button");this.elements.pagination=e(this,n),this.registerHook("init",o(this,s,ht).bind(this)),this.registerHook("updateState",o(this,s,B).bind(this))}},n=new WeakMap,t=new WeakMap,s=new WeakSet,ht=function(){let{container:a,dots:c}=e(this,n);const{current:f}=this.settings;if(a)a.innerHTML="",c.forEach(v=>v.remove()),e(this,n).dots=[];else{if(a=this.getSlotElements("pagination")[0],!a)return;a.addEventListener("keydown",o(this,s,ut).bind(this)),e(this,n).container=a}p.setVisibility(a,f.nav&&this.state.pageCount>1),f.nav&&a&&this.state.pageCount>1&&(this.state.pages.forEach((v,x)=>{o(this,s,dt).call(this,v,x)}),e(this,n).dots.length&&o(this,s,B).call(this))},dt=function(a,c){const{container:f,dots:v}=e(this,n);if(!f)return;const x=document.createElement("button");x.type="button",x.part=e(this,t),x.setAttribute("aria-label",`Page ${c+1}`),x.setAttribute("aria-controls",a.map(M=>M.id).join(" ")),x.setAttribute("aria-current",!1),x.innerHTML=c+1,x.addEventListener("click",()=>this.goTo(c)),f.append(x),v.push(x)},B=function(){if(!this.settings.current.nav||!e(this,n).dots.length)return;let{dots:a,active:c}=e(this,n);const f=a[this.state.index];f&&(c&&(Object.assign(c,{tabIndex:0,ariaCurrent:!1}),c.part=e(this,t)),f.part=`${e(this,t)} active`,Object.assign(f,{tabIndex:-1,ariaCurrent:!0}),e(this,n).active=f)},ut=function(a){if(!e(this,n).dots.length)return;const c=this.isDocumentLtr(),f=e(this,n).dots[this.state.index]||0;switch(a.key){case"ArrowRight":case"ArrowLeft":const v=a.key==="ArrowRight"?c?"next":"previous":c?"previous":"next",x=f[`${v}ElementSibling`];x&&(x.click(),x.focus());break}},g},wt=p=>{var n,t,pt,ft,l;return l=class extends p{constructor(){super();E(this,t);E(this,n,{container:null,current:null,sep:null,total:null});this.elements.pager=e(this,n),this.registerHook("init",o(this,t,pt).bind(this)),this.registerHook("updateState",o(this,t,ft).bind(this))}},n=new WeakMap,t=new WeakSet,pt=function(){const{current:d}=this.settings;if(!e(this,n).container){if(e(this,n).container=this.shadowRoot.querySelector('[part="pager"]'),!e(this,n).container)return;["current","sep","total"].forEach(c=>{const f=this.getSlotElements(c)[0];f&&(e(this,n)[c]=f)})}if(!e(this,n).current||!e(this,n).total)return;const{container:g,current:m,total:a}=e(this,n);p.setVisibility(g,d.pager&&this.state.pageCount>1),m.innerHTML=1,a.innerHTML=this.state.pageCount},ft=function(){!this.settings.current.pager||!e(this,n).current||(e(this,n).current.innerHTML=this.state.index+1)},l};customElements.define("snap-carousel",yt(xt,Et,wt));
