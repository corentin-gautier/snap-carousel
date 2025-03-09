var U = (d) => {
  throw TypeError(d);
};
var M = (d, u, t) => u.has(d) || U("Cannot " + t);
var e = (d, u, t) => (M(d, u, "read from private field"), t ? t.call(d) : u.get(d)), f = (d, u, t) => u.has(d) ? U("Cannot add the same private member more than once") : u instanceof WeakSet ? u.add(d) : u.set(d, t), E = (d, u, t, i) => (M(d, u, "write to private field"), i ? i.call(d, t) : u.set(d, t), t), r = (d, u, t) => (M(d, u, "access private method"), t);
import "./node_modules/scrollyfills/dist/scrollyfills.modern.iife.js";
import it from "./src/host.css.iife.js";
import rt from "./src/style.css.iife.js";
import nt from "./src/template.html.iife.js";
var v, A, I, L, n, h, l, C, s, $, O, j, N, D, B, W, F, q, z, J, Z, R, G, K, Q, X, Y, P, x, _, tt, V, et, T, H, k;
const w = class w extends HTMLElement {
  constructor() {
    super();
    f(this, s);
    f(this, v, !1);
    f(this, A, !1);
    f(this, I, "snap-carousel");
    f(this, L, "");
    f(this, n, { index: 0, itemsCount: 0, pageCount: 0, pages: [], isVisible: !1, autoplayInterval: null, breakpoint: void 0, ready: !1, isMoving: !1, pause: !1, computedPadding: 0 });
    f(this, h, { scroller: null, items: null, sync: null });
    f(this, l, { default: {}, origin: {}, current: {} });
    f(this, C, { init: [], updateState: [] });
    e(this, l).default = w.defaultConfig, E(this, L, this.getAttribute("style")), this.setAttribute("snpc", "");
  }
  get elements() {
    return e(this, h);
  }
  get settings() {
    return e(this, l);
  }
  get state() {
    return e(this, n);
  }
  get preventUiUpdate() {
    return e(this, v);
  }
  getSlotElements(t, i = { fallback: !1 }) {
    return r(this, s, V).call(this, t, i);
  }
  isDocumentLtr() {
    return r(this, s, T).call(this);
  }
  registerHook(t, i) {
    e(this, C)[t] && e(this, C)[t].push(i);
  }
  static get defaultConfig() {
    return { autoplay: 0, displayed: 1, perPage: 1, gap: 0, padding: 0, controls: !1, nav: !1, pager: !1, loop: !1, behavior: "smooth", stop: !1, usePause: !0, vertical: !1, responsive: [], sync: null };
  }
  static get observedAttributes() {
    const t = Object.keys(w.defaultConfig).map((i) => i.replace(/[A-Z]/g, (o) => "-" + o.toLowerCase()));
    return [...t, ...t.map((i) => "data-" + i)];
  }
  connectedCallback() {
    if (!this.isConnected) return;
    const t = document.createElement("template");
    t.innerHTML = `<style>${it}</style>${nt}`, this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(t.content.cloneNode(!0)), e(this, h).scroller = r(this, s, V).call(this, "scroller", { fallback: !0 })[0], e(this, h).scroller && (new MutationObserver((i) => {
      i.forEach((o) => {
        (o.addedNodes.length || o.removedNodes.length) && (r(this, s, N).call(this), r(this, s, j).call(this));
      });
    }).observe(e(this, h).scroller, { childList: !0 }), e(this, h).scroller.setAttribute("snpc-s", ""), e(this, h).scroller.onscroll = r(this, s, Q).bind(this), e(this, h).scroller.addEventListener("scrollend", r(this, s, Y).bind(this)), window.addEventListener("resize", r(this, s, K).bind(this)), this.ariaRoleDescription = "carousel", Object.assign(e(this, h).scroller, { role: "group", ariaLive: "polite", ariaAtomic: !1 }), r(this, s, B).call(this), r(this, s, N).call(this), r(this, s, D).call(this), r(this, s, O).call(this), r(this, s, G).call(this), e(this, n).ready = !0);
  }
  attributeChangedCallback() {
    e(this, n).ready && r(this, s, O).call(this);
  }
  goTo(t) {
    E(this, v, !1);
    const { scroller: i, items: o } = e(this, h), { perPage: a, vertical: c } = e(this, l).current, m = t > e(this, n).pageCount - 1 ? 0 : t < 0 ? e(this, n).pageCount - 1 : t, g = o[m * a];
    r(this, s, x).call(this, m), e(this, n).ready = !0;
    let b = 0, p = 0;
    c ? b = g.offsetTop : p = r(this, s, T).call(this) ? g.offsetLeft : g.offsetLeft + g.offsetWidth - i.offsetWidth, E(this, v, !0), requestIdleCallback(() => {
      i.scrollTo({ top: b, left: p });
    }, { timeout: 100 });
  }
  prev() {
    this.goTo(this.state.index - 1);
  }
  next() {
    this.goTo(this.state.index + 1);
  }
  static setVisibility(t, i) {
    i ? t.removeAttribute("style") : t.setAttribute("style", "display: none!important;");
  }
  static registerElement(t, i) {
    window.customElements && customElements.define(t, i);
  }
};
v = new WeakMap(), A = new WeakMap(), I = new WeakMap(), L = new WeakMap(), n = new WeakMap(), h = new WeakMap(), l = new WeakMap(), C = new WeakMap(), s = new WeakSet(), $ = function(t, ...i) {
  e(this, C)[t] && e(this, C)[t].forEach((o) => o.apply(this, i));
}, O = function() {
  e(this, n).breakpoint = void 0, e(this, l).origin = Object.assign({}, e(this, l).default, r(this, s, F).call(this)), e(this, l).origin.responsive = (e(this, l).origin.responsive || []).sort((t, i) => t.breakpoint - i.breakpoint), r(this, s, z).call(this);
}, j = function() {
  r(this, s, W).call(this, () => {
    r(this, s, J).call(this), r(this, s, Z).call(this), r(this, s, R).call(this), r(this, s, x).call(this, 0), r(this, s, $).call(this, "init");
  });
}, N = function() {
  const t = Array.from(e(this, h).scroller.children).filter((o) => !["absolute", "fixed", "sticky"].includes(getComputedStyle(o).position)), i = t.length;
  e(this, h).items = t, e(this, n).itemsCount = i, t.forEach((o, a) => {
    o.id = `${this.id}-slide-${a}`, o.dataset.index = a, Object.assign(o, { ariaSetSize: i, ariaPosInSet: a + 1, ariaRoleDescription: "slide", role: "listitem" });
  });
}, D = function() {
  const t = `${e(this, I)}-global-styles`;
  if (document.querySelector("#" + t)) return;
  const i = rt;
  document.head.append(r(this, s, et).call(this, i, t));
}, B = function() {
  this.id = e(this, n).id = e(this, I) + "-" + (Math.random() + 1).toString(36).substring(4), e(this, h).scroller.id = this.id + "-scroller";
}, W = function(t) {
  e(this, h).scroller.clientWidth ? t() : requestAnimationFrame(() => {
    r(this, s, W).call(this, t);
  });
}, F = function() {
  const t = Object.keys(e(this, l).default);
  return this.attributes.options ? r(this, s, q).call(this, this.attributes.options.value) : Array.from(this.attributes).reduce((i, o) => {
    const a = o.name.replace("data-", "").replace(/-([a-z])/g, (c) => c[1].toUpperCase());
    return t.includes(a) && (i[a] = r(this, s, q).call(this, o.value)), i;
  }, {});
}, q = function(t) {
  if (t === "") return !0;
  try {
    return JSON.parse(t);
  } catch {
    return t;
  }
}, z = function() {
  const { origin: t } = e(this, l), i = t.responsive.reduce((a, c) => c.breakpoint < window.innerWidth ? c : a, { breakpoint: null }), o = Object.assign({}, t, i.settings || {});
  o.perPage = Math.min(o.displayed, o.perPage), e(this, l).current = o, e(this, n).breakpoint !== i.breakpoint && (e(this, n).breakpoint = i.breakpoint, r(this, s, j).call(this));
}, J = function() {
  const { current: t } = e(this, l), { itemsCount: i } = e(this, n), o = Math.floor((t.displayed - t.perPage) / t.perPage);
  e(this, n).pageCount = Math.ceil(i / t.perPage) - o, e(this, n).pages = Array.from({ length: e(this, n).pageCount }, (a, c) => {
    const m = c * t.perPage, g = Math.min(m + t.perPage, i);
    return Array.from({ length: g - m }, (b, p) => e(this, h).items[m + p]);
  });
}, Z = function() {
  const { displayed: t, gap: i, padding: o, perPage: a, stop: c, behavior: m } = e(this, l).current, g = r(this, s, H).call(this, i), b = r(this, s, H).call(this, o), p = "sc-anchor" + (c ? "-stop" : "");
  this.style = `--perpage: ${t};--gap: ${g};--padding: ${b};--behavior: ${m};${e(this, L)}`, this.elements.items.forEach((y, st) => {
    st % a == 0 ? y.classList.add(p) : y.classList.remove(p);
  });
}, R = function() {
  const { vertical: t } = e(this, l).current, i = t ? "padding-top" : "padding-left";
  e(this, n).computedPadding = parseInt(getComputedStyle(e(this, h).scroller)[i], 10);
}, G = function() {
  const { items: t, scroller: i } = e(this, h);
  new IntersectionObserver((a) => {
    const c = a[0];
    e(this, n).isVisible = c.intersectionRatio > 0.1, e(this, n).pause = !e(this, n).isVisible, r(this, s, k).call(this);
  }, { threshold: [0.1, 0.9] }).observe(this), e(this, l).current.usePause && (this.addEventListener("mouseenter", () => {
    e(this, n).pause = !0, r(this, s, k).call(this);
  }), this.addEventListener("mouseleave", () => {
    e(this, n).pause = !1, r(this, s, k).call(this);
  }));
  const o = new IntersectionObserver((a) => {
    a.forEach((c) => {
      c.target.toggleAttribute("visible", c.isIntersecting), c.target.toggleAttribute("inert", !c.isIntersecting);
    });
  }, { scroller: i, threshold: 0.6 });
  t.forEach((a) => o.observe(a));
}, K = function() {
  clearTimeout(this.resizeTm), this.resizeTm = setTimeout(() => {
    r(this, s, R).call(this), r(this, s, z).call(this);
  }, 100);
}, Q = function() {
  if (e(this, A)) return;
  r(this, s, X).call(this), this.newIndex = e(this, n).index;
  const t = r(this, s, _).call(this);
  t !== e(this, n).index && (this.newIndex = t, r(this, s, x).call(this, t), r(this, s, P).call(this, "scrollupdate"));
}, X = function() {
  e(this, n).isMoving || r(this, s, P).call(this, "scrollstart"), e(this, n).isMoving = !0;
}, Y = function() {
  e(this, A) || (r(this, s, P).call(this, "scrollend"), E(this, v, !1), e(this, n).isMoving = !1, typeof this.newIndex == "number" ? (r(this, s, x).call(this, this.newIndex), this.newIndex = null) : r(this, s, x).call(this, e(this, n).index), r(this, s, k).call(this));
}, P = function(t) {
  const { current: i } = e(this, l);
  this.dispatchEvent(new CustomEvent(t, { detail: e(this, n) })), i["on" + t] && i["on" + t](this);
}, x = function(t) {
  t !== void 0 && (e(this, n).index = t), r(this, s, tt).call(this), e(this, v) || r(this, s, $).call(this, "updateState", t);
}, _ = function(t) {
  const { scroller: i, items: o } = e(this, h), { perPage: a, vertical: c } = e(this, l).current, m = r(this, s, T).call(this);
  let g = 0;
  g = c ? i.scrollTop : m ? i.scrollLeft : i.scrollLeft + i.clientWidth;
  let b = o.map((p) => {
    let y = 0;
    return y = c ? p.offsetTop - (e(this, n).computedPadding || 0) - g : (m ? p.offsetLeft : p.offsetLeft + p.clientWidth) - (e(this, n).computedPadding || 0) - g, { index: parseInt(p.dataset.index, 10), distance: Math.abs(y) };
  }).reduce((p, y) => !p || y.distance < p.distance ? y : p, null);
  return t ? b : Math.ceil(b.index / a);
}, tt = function() {
  const { sync: t } = e(this, l).current;
  t && e(this, n).ready && (e(this, h).sync = e(this, h).sync || Array.from(document.querySelectorAll(t)), e(this, h).sync.forEach((i) => {
    i instanceof w && i.goTo(e(this, n).index);
  }));
}, V = function(t, i = { fallback: !1 }) {
  const o = this.shadowRoot.querySelector(`[name="${t}"]`);
  let a = o.assignedElements();
  return i.fallback && !a.length && this.children[0].slot === "" && (this.children[0].slot = "scroller", a = o.assignedElements()), Array.from(a.length ? a : o.children);
}, et = function(t, i) {
  const o = document.createElement("style");
  return o.id = i, o.append(document.createTextNode(t)), o;
}, T = function() {
  return document.firstElementChild.getAttribute("dir") !== "rtl";
}, H = function(t) {
  return typeof t == "string" ? t : t + "px";
}, k = function() {
  if (!e(this, l).current.autoplay) return;
  const { pause: t, isVisible: i } = e(this, n);
  !t && i ? e(this, n).autoplayInterval || (e(this, n).autoplayInterval = setTimeout(() => {
    e(this, n).autoplayInterval = null, this.goTo(e(this, n).index + 1);
  }, e(this, l).current.autoplay)) : (clearTimeout(e(this, n).autoplayInterval), e(this, n).autoplayInterval = null);
};
let S = w;
function dt(...d) {
  return d.reduce((u, t) => t(u), S);
}
export {
  S as BaseCarousel,
  dt as createCarousel
};
