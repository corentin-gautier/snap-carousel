var D=f=>{throw TypeError(f)};var O=(f,p,t)=>p.has(f)||D("Cannot "+t);var e=(f,p,t)=>(O(f,p,"read from private field"),t?t.call(f):p.get(f)),b=(f,p,t)=>p.has(f)?D("Cannot add the same private member more than once"):p instanceof WeakSet?p.add(f):p.set(f,t),T=(f,p,t,i)=>(O(f,p,"write to private field"),i?i.call(f,t):p.set(f,t),t),o=(f,p,t)=>(O(f,p,"access private method"),t);(function(){const p=document.createElement("link").relList;if(p&&p.supports&&p.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();if(typeof window<"u"&&!("onscrollend"in window)){let i=function(l,c,g){let v=l[c];l[c]=function(){let d=Array.prototype.slice.apply(arguments,[0]);v.apply(this,d),d.unshift(v),g.apply(this,d)}},n=function(l,c,g,v){if(c!="scroll"&&c!="scrollend")return;let d=this,m=t.get(d);if(m===void 0){let I=0;m={scrollListener:ut=>{clearTimeout(I),I=setTimeout(()=>{p.size?setTimeout(m.scrollListener,100):(d&&d.dispatchEvent(f),I=0)},100)},listeners:0},l.apply(d,["scroll",m.scrollListener]),t.set(d,m)}m.listeners++},r=function(l,c,g){if(c!="scroll"&&c!="scrollend")return;let v=this,d=t.get(v);d!==void 0&&(--d.listeners>0||(l.apply(v,["scroll",d.scrollListener]),t.delete(v)))};var ft=i,gt=n,vt=r;const f=new Event("scrollend"),p=new Set;document.addEventListener("touchstart",l=>{for(let c of l.changedTouches)p.add(c.identifier)},{passive:!0}),document.addEventListener("touchend",l=>{for(let c of l.changedTouches)p.delete(c.identifier)},{passive:!0}),document.addEventListener("touchcancel",l=>{for(let c of l.changedTouches)p.delete(c.identifier)},{passive:!0});let t=new WeakMap;i(Element.prototype,"addEventListener",n),i(window,"addEventListener",n),i(document,"addEventListener",n),i(Element.prototype,"removeEventListener",r),i(window,"removeEventListener",r),i(document,"removeEventListener",r)}const ct=':host{display:block;position:relative;width:100%}:host(:not([scrollbar])) ::slotted([slot="scroller"]){scrollbar-width:none}:host(:not([scrollbar])) ::slotted([slot="scroller"])::-webkit-scrollbar{display:none}::slotted([slot="scroller"]){position:relative;margin:0;display:flex;gap:var(--sc-gap);scroll-behavior:var(--sc-behavior)}:host(:not([vertical])) ::slotted([slot="scroller"]){overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;scroll-padding-inline:var(--sc-padding);padding-inline:var(--sc-padding)!important}:host([vertical]) ::slotted([slot="scroller"]){flex-direction:column;overflow-y:auto;scroll-snap-type:y mandatory;overscroll-behavior-y:contain;padding-block:var(--sc-padding)!important;scroll-padding-block:var(--sc-padding)}',dt="snap-carousel:not([scrollbar]) [slot=scroller]::-webkit-scrollbar{display:none}snap-carousel [slot=scroller]{display:flex}snap-carousel[vertical]{display:flex;flex-direction:column}snap-carousel[vertical] [slot=scroller]{flex-direction:column;height:100%}snap-carousel [slot=scroller]>*{display:block;flex:0 0 auto}snap-carousel:not([vertical]) [slot=scroller]>*{width:calc((100% / var(--sc-perpage, 1)) - var(--sc-gap, 0) + (var(--sc-gap, 0) / var(--sc-perpage, 1)));max-width:100%}snap-carousel[vertical] [slot=scroller]>*{max-height:100%;height:calc((100% / var(--sc-perpage, 1)) - var(--sc-gap, 0) + (var(--sc-gap, 0) / var(--sc-perpage, 1)))}",ht=`<slot name="scroller">
  <ul></ul>
</slot>

<div part="controls">
  <div part="buttons">
    <slot name="before-prev"></slot>
    <slot name="prev-buttons">
      <button part="button control-button prev-button" type="button" direction="prev" aria-label="Previous">
        <slot name="prev-icon"></slot>
        <slot name="prev-label">Previous</slot>
      </button>
    </slot>
    <slot name="next-buttons">
      <button part="button control-button next-button" type="button" direction="next" aria-label="Next">
        <slot name="next-label">Next</slot>
        <slot name="next-icon"></slot>
      </button>
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
`;var x,C,P,a,u,h,s,V,A,$,N,F,U,j,B,R,q,K,G,z,J,Z,Q,X,Y,_,S,w,tt,et,st,it,nt,rt,ot,lt,at,y,W,k,H,E;const L=class L extends HTMLElement{constructor(){super();b(this,s);b(this,x,!1);b(this,C,!1);b(this,P,"snp-c");b(this,a,{index:0,itemsCount:0,pageCount:0,isVisible:!1,autoplayInterval:null,breakpoint:void 0,ready:!1,isMoving:!1,pause:!1,computedPadding:0});b(this,u,{controls:{buttons:[]},pagination:{container:null,dots:[],active:null},pager:{container:null,current:null,sep:null,total:null},scroller:null,items:null,sync:null});b(this,h,{default:{},origin:{},current:{}});e(this,h).default=L.defaultConfig}static get defaultConfig(){return{autoplay:0,displayed:1,perPage:1,gap:0,padding:0,controls:!1,nav:!1,pager:!1,loop:!1,behavior:"smooth",stop:!1,usePause:!0,vertical:!1,responsive:[]}}static get observedAttributes(){const t=Object.keys(L.defaultConfig).map(i=>i.replace(/[A-Z]/g,n=>"-"+n.toLowerCase()));return[...t,...t.map(i=>"data-"+i)]}connectedCallback(){if(!this.isConnected)return;const t=document.createElement("template");t.innerHTML=`<style>${ct}</style>${ht}`,this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(t.content.cloneNode(!0));const i=o(this,s,y).call(this,"scroller",{fallback:!0})[0];new MutationObserver(r=>{r.forEach(l=>{(l.addedNodes.length||l.removedNodes.length)&&(o(this,s,N).call(this),o(this,s,$).call(this))})}).observe(i,{childList:!0}),o(this,s,V).call(this)}attributeChangedCallback(){e(this,a).ready&&o(this,s,A).call(this)}goTo(t){T(this,x,!1);const{scroller:i,items:n}=e(this,u),{perPage:r,vertical:l}=e(this,h).current,c=t>e(this,a).pageCount-1?0:t<0?e(this,a).pageCount-1:t,g=n[c*r];o(this,s,w).call(this,c),e(this,a).ready=!0;let v=0,d=0;l?v=g.offsetTop:d=o(this,s,k).call(this)?g.offsetLeft:g.offsetLeft+g.offsetWidth-i.offsetWidth,T(this,x,!0),requestIdleCallback(()=>{i.scrollTo({top:v,left:d})},{timeout:100})}prev(){this.goTo(this.state.index-1)}next(){this.goTo(this.state.index+1)}};x=new WeakMap,C=new WeakMap,P=new WeakMap,a=new WeakMap,u=new WeakMap,h=new WeakMap,s=new WeakSet,V=function(){const t=o(this,s,y).call(this,"scroller",!0)[0];t&&(t.onscroll=o(this,s,Q).bind(this),t.addEventListener("scrollend",o(this,s,Y).bind(this)),window.addEventListener("resize",o(this,s,Z).bind(this)),e(this,u).scroller=t,this.elements=e(this,u),this.settings=e(this,h),this.state=e(this,a),this.ariaRoleDescription="carousel",Object.assign(t,{role:"group",ariaLive:"polite",ariaAtomic:!1}),o(this,s,N).call(this),o(this,s,F).call(this),o(this,s,U).call(this),o(this,s,A).call(this),o(this,s,J).call(this),e(this,a).ready=!0)},A=function(){e(this,a).breakpoint=void 0,e(this,h).origin=Object.assign({},e(this,h).default,o(this,s,B).call(this)),e(this,h).origin.responsive=(e(this,h).origin.responsive||[]).sort((t,i)=>t.breakpoint-i.breakpoint),o(this,s,q).call(this)},$=function(){o(this,s,j).call(this,()=>{o(this,s,K).call(this),o(this,s,G).call(this),o(this,s,et).call(this),o(this,s,st).call(this),o(this,s,it).call(this),o(this,s,z).call(this),o(this,s,w).call(this,0)})},N=function(){const t=Array.from(e(this,u).scroller.children).filter(n=>!["absolute","fixed"].includes(getComputedStyle(n).position)),i=t.length;e(this,u).items=t,e(this,a).itemsCount=i,t.forEach((n,r)=>{n.dataset.index=r,Object.assign(n,{ariaSetSize:i,ariaPosInSet:r+1,ariaRoleDescription:"slide",role:"listitem"})})},F=function(){const i=`${e(this,P)}-global-styles`;if(document.querySelector("#"+i))return;const n=dt;document.head.append(o(this,s,W).call(this,n,i))},U=function(){this.id=e(this,a).id=e(this,P)+"-"+(Math.random()+1).toString(36).substring(4)},j=function(t){e(this,u).scroller.clientWidth?t():requestAnimationFrame(()=>{o(this,s,j).call(this,t)})},B=function(){const t=Object.keys(e(this,h).default);return this.attributes.options?o(this,s,R).call(this,this.attributes.options.value):Array.from(this.attributes).reduce((i,n)=>{const r=n.name.replace("data-","").replace(/-([a-z])/g,l=>l[1].toUpperCase());return t.includes(r)&&(i[r]=o(this,s,R).call(this,n.value)),i},{})},R=function(t){if(t==="")return!0;try{return JSON.parse(t)}catch{return t}},q=function(){const{origin:t}=e(this,h),i=t.responsive.reduce((r,l)=>l.breakpoint<window.innerWidth?l:r,{breakpoint:null}),n=Object.assign({},t,i.settings||{});n.perPage=Math.min(n.displayed,n.perPage),e(this,h).current=n,e(this,a).breakpoint!==i.breakpoint&&(e(this,a).breakpoint=i.breakpoint,o(this,s,$).call(this))},K=function(){const{current:t}=e(this,h),{itemsCount:i}=e(this,a),n=Math.floor((t.displayed-t.perPage)/t.perPage);e(this,a).pageCount=Math.ceil(i/t.perPage)-n},G=function(){const t=document.querySelector("#"+e(this,a).id+"-styles");t&&t.remove();const{displayed:i,gap:n,padding:r,perPage:l,stop:c,behavior:g}=e(this,h).current,v=l>1?`*:nth-child(${l}n + 1)`:"*",d=`
      #${e(this,a).id} {
        --sc-perpage: ${i};
        --sc-gap: ${o(this,s,H).call(this,n)};
        --sc-padding: ${o(this,s,H).call(this,r)};
        --sc-behavior: ${g};
      }
      #${e(this,a).id} [slot="scroller"] > ${v} {
        scroll-snap-align: start;
        scroll-snap-stop: ${c?"always":"normal"}
      }
    `;this.styles=o(this,s,W).call(this,d,e(this,a).id+"-styles"),document.head.append(this.styles)},z=function(){const{vertical:t}=e(this,h).current,i=t?"padding-top":"padding-left";e(this,a).computedPadding=parseInt(getComputedStyle(e(this,u).scroller)[i],10)},J=function(){const{items:t,scroller:i}=e(this,u);new IntersectionObserver(l=>{const c=l[0];e(this,a).isVisible=c.intersectionRatio>.1,e(this,a).pause=!e(this,a).isVisible,o(this,s,E).call(this)},{threshold:[.1,.9]}).observe(this),e(this,h).current.usePause&&(this.addEventListener("mouseenter",()=>{e(this,a).pause=!0,o(this,s,E).call(this)}),this.addEventListener("mouseleave",()=>{e(this,a).pause=!1,o(this,s,E).call(this)}));const r=new IntersectionObserver(l=>{l.forEach(c=>{c.target.toggleAttribute("visible",c.isIntersecting),c.target.toggleAttribute("inert",!c.isIntersecting)})},{scroller:i,threshold:.6});t.forEach(l=>r.observe(l))},Z=function(){clearTimeout(this.resizeTm),this.resizeTm=setTimeout(()=>{o(this,s,z).call(this),o(this,s,q).call(this)},100)},Q=function(){if(e(this,C))return;o(this,s,X).call(this),this.newIndex=e(this,a).index;const t=o(this,s,tt).call(this);t!==e(this,a).index&&(this.newIndex=t,o(this,s,w).call(this,t),o(this,s,S).call(this,"scrollupdate"))},X=function(){e(this,a).isMoving||o(this,s,S).call(this,"scrollstart"),e(this,a).isMoving=!0},Y=function(){console.log("scrollend"),!e(this,C)&&(o(this,s,S).call(this,"scrollend"),T(this,x,!1),e(this,a).isMoving=!1,typeof this.newIndex=="number"?(o(this,s,w).call(this,this.newIndex),this.newIndex=null):o(this,s,w).call(this,e(this,a).index),o(this,s,E).call(this))},_=function(t){const i=o(this,s,k).call(this),n=e(this,u).pagination.dots[e(this,a).index]||0;switch(t.key){case"ArrowRight":case"ArrowLeft":const r=t.key==="ArrowRight"?i?"next":"previous":i?"previous":"next",l=n[`${r}ElementSibling`];l&&(l.click(),l.focus());break}},S=function(t){const{current:i}=e(this,h);this.dispatchEvent(new CustomEvent(t,{detail:e(this,a)})),i["on"+t]&&i["on"+t](this)},w=function(t){typeof t<"u"&&(e(this,a).index=t),o(this,s,at).call(this),e(this,x)||(o(this,s,rt).call(this),o(this,s,ot).call(this)),o(this,s,lt).call(this)},tt=function(t){const{scroller:i,items:n}=e(this,u),{perPage:r,vertical:l}=e(this,h).current,c=o(this,s,k).call(this);let g=0;l?g=i.scrollTop:g=c?i.scrollLeft:i.scrollLeft+i.clientWidth;let v=n.map(d=>{let m=0;return l?m=d.offsetTop-(e(this,a).computedPadding||0)-g:m=(c?d.offsetLeft:d.offsetLeft+d.clientWidth)-(e(this,a).computedPadding||0)-g,{index:parseInt(d.dataset.index,10),distance:Math.abs(m)}}).reduce((d,m)=>!d||m.distance<d.distance?m:d,null);return t?v:Math.ceil(v.index/r)},et=function(){const{pagination:t}=e(this,u);let{container:i,dots:n}=t;const{current:r}=e(this,h);if(i?(i.innerHTML="",n.forEach(l=>l.remove()),e(this,u).pagination.dots=[]):(i=o(this,s,y).call(this,"pagination")[0],i.addEventListener("keydown",o(this,s,_).bind(this)),t.container=i),i.style.display=r.nav&&e(this,a).pageCount>1?"":"none",r.nav&&i)for(let l=0;l<e(this,a).pageCount;l++)o(this,s,nt).call(this,l)},st=function(){const{pager:t}=e(this,u),{current:i}=e(this,h);t.current||(["current","sep","total"].forEach(n=>{t[n]=o(this,s,y).call(this,n)[0]}),t.container=this.shadowRoot.querySelector('[part="pager"]')),t.container.style.display=i.pager&&e(this,a).pageCount>1?"":"none",t.current.innerHTML=1,t.total.innerHTML=e(this,a).pageCount},it=function(){const{controls:t}=e(this,u),{current:i}=e(this,h),n=!i.controls||e(this,a).pageCount<2;t.buttons=[...o(this,s,y).call(this,"prev-buttons"),...o(this,s,y).call(this,"next-buttons")],t.buttons.forEach(r=>{r.style=n?"display: none !important;":"",!r.hasListener&&(r.direction=r.getAttribute("direction")||"next",r.modifier=(r.direction==="next"?1:-1)*(parseInt(r.getAttribute("modifier"),10)||1),r.hasListener=!0,r.addEventListener("click",()=>{i.controls&&this.goTo(e(this,a).index+r.modifier)}),Object.assign(r,{ariaControls:e(this,u).scroller.id}))})},nt=function(t){const{pagination:i}=e(this,u),{container:n,dots:r}=i,l=document.createElement("button");l.innerHTML=t+1,l.addEventListener("click",()=>this.goTo(t)),Object.assign(l,{type:"button",part:"button nav-button",ariaControls:e(this,u).scroller.id,ariaSelected:!1}),n.append(l),r.push(l)},rt=function(){if(!e(this,h).current.nav)return;const{pagination:t}=e(this,u);let{dots:i,active:n}=t;const r=i[e(this,a).index];r&&(n&&(Object.assign(n,{tabIndex:0,ariaSelected:!1}),n.part="button nav-button"),r.part="button nav-button active",Object.assign(r,{tabIndex:-1,ariaSelected:!0}),t.active=r)},ot=function(){e(this,h).current.pager&&(e(this,u).pager.current.innerHTML=e(this,a).index+1)},lt=function(){const{loop:t}=e(this,h).current,{buttons:i}=e(this,u).controls,{index:n,pageCount:r}=e(this,a);let l=!1;if(i.forEach(c=>{const g=!t&&(c.direction==="next"?n>=r-c.modifier:n<Math.abs(c.modifier));c===this.shadowRoot.activeElement&&g&&(l=!0),c.disabled=g?"disabled":""}),l){const c=i.filter(g=>!g.disabled);c.length&&c[0].focus()}},at=function(){const{sync:t}=e(this,h).current;t&&e(this,a).ready&&(e(this,u).sync=e(this,u).sync||document.querySelectorAll(t)||[],e(this,u).sync.forEach(i=>{i instanceof L&&i.goTo(e(this,a).index)}))},y=function(t,i={fallback:!1}){const n=this.shadowRoot.querySelector(`[name="${t}"]`);let r=n.assignedElements();return i.fallback&&!r.length&&this.children[0].slot===""&&(this.children[0].slot="scroller",r=n.assignedElements()),Array.from(r.length?r:n.children)},W=function(t,i){const n=document.createElement("style");return n.id=i,n.append(document.createTextNode(t)),n},k=function(){return document.firstElementChild.getAttribute("dir")!=="rtl"},H=function(t){return typeof t=="string"?t:t+"px"},E=function(){if(!e(this,h).current.autoplay)return;const{pause:t,isVisible:i}=e(this,a);!t&&i?e(this,a).autoplayInterval||(e(this,a).autoplayInterval=setTimeout(()=>{e(this,a).autoplayInterval=null,this.goTo(e(this,a).index+1)},e(this,h).current.autoplay)):(clearTimeout(e(this,a).autoplayInterval),e(this,a).autoplayInterval=null)};let M=L;window.customElements&&customElements.define("snap-carousel",M);
