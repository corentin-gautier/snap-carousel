var V = (c) => {
  throw TypeError(c);
};
var S = (c, u, t) => u.has(c) || V("Cannot " + t);
var e = (c, u, t) => (S(c, u, "read from private field"), t ? t.call(c) : u.get(c)), m = (c, u, t) => u.has(c) ? V("Cannot add the same private member more than once") : u instanceof WeakSet ? u.add(c) : u.set(c, t), k = (c, u, t, i) => (S(c, u, "write to private field"), i ? i.call(c, t) : u.set(c, t), t), r = (c, u, t) => (S(c, u, "access private method"), t);
import "./node_modules/scrollyfills/dist/scrollyfills.modern.iife.js";
import it from "./src/host.css.iife.js";
import rt from "./src/style.css.iife.js";
import nt from "./src/template.html.iife.js";
var b, L, T, w, n, l, h, x, s, O, $, j, N, D, B, W, F, q, z, J, Z, R, G, K, Q, X, Y, P, C, _, tt, H, et, A, U, E;
const I = class I extends HTMLElement {
  constructor() {
    super();
    m(this, s);
    m(this, b, !1);
    m(this, L, !1);
    m(this, T, "snap-carousel");
    m(this, w, "");
    m(this, n, { index: 0, itemsCount: 0, pageCount: 0, isVisible: !1, autoplayInterval: null, breakpoint: void 0, ready: !1, isMoving: !1, pause: !1, computedPadding: 0 });
    m(this, l, { scroller: null, items: null, sync: null });
    m(this, h, { default: {}, origin: {}, current: {} });
    m(this, x, { init: [], updateState: [] });
    e(this, h).default = I.defaultConfig, k(this, w, this.getAttribute("style")), this.setAttribute("snpc", "");
  }
  get elements() {
    return e(this, l);
  }
  get settings() {
    return e(this, h);
  }
  get state() {
    return e(this, n);
  }
  get preventUiUpdate() {
    return e(this, b);
  }
  getSlotElements(t, i = { fallback: !1 }) {
    return r(this, s, H).call(this, t, i);
  }
  isDocumentLtr() {
    return r(this, s, A).call(this);
  }
  registerHook(t, i) {
    e(this, x)[t] && e(this, x)[t].push(i);
  }
  static get defaultConfig() {
    return { autoplay: 0, displayed: 1, perPage: 1, gap: 0, padding: 0, controls: !1, nav: !1, pager: !1, loop: !1, behavior: "smooth", stop: !1, usePause: !0, vertical: !1, responsive: [], sync: null };
  }
  static get observedAttributes() {
    const t = Object.keys(I.defaultConfig).map((i) => i.replace(/[A-Z]/g, (o) => "-" + o.toLowerCase()));
    return [...t, ...t.map((i) => "data-" + i)];
  }
  connectedCallback() {
    if (!this.isConnected) return;
    const t = document.createElement("template");
    t.innerHTML = `<style>${it}</style>${nt}`, this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(t.content.cloneNode(!0)), e(this, l).scroller = r(this, s, H).call(this, "scroller", { fallback: !0 })[0], e(this, l).scroller && (new MutationObserver((i) => {
      i.forEach((o) => {
        (o.addedNodes.length || o.removedNodes.length) && (r(this, s, N).call(this), r(this, s, j).call(this));
      });
    }).observe(e(this, l).scroller, { childList: !0 }), e(this, l).scroller.setAttribute("snpc-s", ""), e(this, l).scroller.onscroll = r(this, s, Q).bind(this), e(this, l).scroller.addEventListener("scrollend", r(this, s, Y).bind(this)), window.addEventListener("resize", r(this, s, K).bind(this)), this.ariaRoleDescription = "carousel", Object.assign(e(this, l).scroller, { role: "group", ariaLive: "polite", ariaAtomic: !1 }), r(this, s, N).call(this), r(this, s, D).call(this), r(this, s, B).call(this), r(this, s, $).call(this), r(this, s, G).call(this), e(this, n).ready = !0);
  }
  attributeChangedCallback() {
    e(this, n).ready && r(this, s, $).call(this);
  }
  goTo(t) {
    k(this, b, !1);
    const { scroller: i, items: o } = e(this, l), { perPage: a, vertical: d } = e(this, h).current, v = t > e(this, n).pageCount - 1 ? 0 : t < 0 ? e(this, n).pageCount - 1 : t, g = o[v * a];
    r(this, s, C).call(this, v), e(this, n).ready = !0;
    let y = 0, p = 0;
    d ? y = g.offsetTop : p = r(this, s, A).call(this) ? g.offsetLeft : g.offsetLeft + g.offsetWidth - i.offsetWidth, k(this, b, !0), requestIdleCallback(() => {
      i.scrollTo({ top: y, left: p });
    }, { timeout: 100 });
  }
  prev() {
    this.goTo(this.state.index - 1);
  }
  next() {
    this.goTo(this.state.index + 1);
  }
};
b = new WeakMap(), L = new WeakMap(), T = new WeakMap(), w = new WeakMap(), n = new WeakMap(), l = new WeakMap(), h = new WeakMap(), x = new WeakMap(), s = new WeakSet(), O = function(t, ...i) {
  e(this, x)[t] && e(this, x)[t].forEach((o) => o.apply(this, i));
}, $ = function() {
  e(this, n).breakpoint = void 0, e(this, h).origin = Object.assign({}, e(this, h).default, r(this, s, F).call(this)), e(this, h).origin.responsive = (e(this, h).origin.responsive || []).sort((t, i) => t.breakpoint - i.breakpoint), r(this, s, z).call(this);
}, j = function() {
  r(this, s, W).call(this, () => {
    r(this, s, J).call(this), r(this, s, Z).call(this), r(this, s, R).call(this), r(this, s, C).call(this, 0), r(this, s, O).call(this, "init");
  });
}, N = function() {
  const t = Array.from(e(this, l).scroller.children).filter((o) => !["absolute", "fixed", "sticky"].includes(getComputedStyle(o).position)), i = t.length;
  e(this, l).items = t, e(this, n).itemsCount = i, t.forEach((o, a) => {
    o.dataset.index = a, Object.assign(o, { ariaSetSize: i, ariaPosInSet: a + 1, ariaRoleDescription: "slide", role: "listitem" });
  });
}, D = function() {
  const t = `${e(this, T)}-global-styles`;
  if (document.querySelector("#" + t)) return;
  const i = rt;
  document.head.append(r(this, s, et).call(this, i, t));
}, B = function() {
  this.id = e(this, n).id = e(this, T) + "-" + (Math.random() + 1).toString(36).substring(4);
}, W = function(t) {
  e(this, l).scroller.clientWidth ? t() : requestAnimationFrame(() => {
    r(this, s, W).call(this, t);
  });
}, F = function() {
  const t = Object.keys(e(this, h).default);
  return this.attributes.options ? r(this, s, q).call(this, this.attributes.options.value) : Array.from(this.attributes).reduce((i, o) => {
    const a = o.name.replace("data-", "").replace(/-([a-z])/g, (d) => d[1].toUpperCase());
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
  const { origin: t } = e(this, h), i = t.responsive.reduce((a, d) => d.breakpoint < window.innerWidth ? d : a, { breakpoint: null }), o = Object.assign({}, t, i.settings || {});
  o.perPage = Math.min(o.displayed, o.perPage), e(this, h).current = o, e(this, n).breakpoint !== i.breakpoint && (e(this, n).breakpoint = i.breakpoint, r(this, s, j).call(this));
}, J = function() {
  const { current: t } = e(this, h), { itemsCount: i } = e(this, n), o = Math.floor((t.displayed - t.perPage) / t.perPage);
  e(this, n).pageCount = Math.ceil(i / t.perPage) - o;
}, Z = function() {
  const { displayed: t, gap: i, padding: o, perPage: a, stop: d, behavior: v } = e(this, h).current, g = r(this, s, U).call(this, i), y = r(this, s, U).call(this, o), p = "sc-anchor" + (d ? "-stop" : "");
  this.style = `--perpage: ${t};--gap: ${g};--padding: ${y};--behavior: ${v};${e(this, w)}`, this.elements.items.forEach((f, st) => {
    st % a == 0 ? f.classList.add(p) : f.classList.remove(p);
  });
}, R = function() {
  const { vertical: t } = e(this, h).current, i = t ? "padding-top" : "padding-left";
  e(this, n).computedPadding = parseInt(getComputedStyle(e(this, l).scroller)[i], 10);
}, G = function() {
  const { items: t, scroller: i } = e(this, l);
  new IntersectionObserver((a) => {
    const d = a[0];
    e(this, n).isVisible = d.intersectionRatio > 0.1, e(this, n).pause = !e(this, n).isVisible, r(this, s, E).call(this);
  }, { threshold: [0.1, 0.9] }).observe(this), e(this, h).current.usePause && (this.addEventListener("mouseenter", () => {
    e(this, n).pause = !0, r(this, s, E).call(this);
  }), this.addEventListener("mouseleave", () => {
    e(this, n).pause = !1, r(this, s, E).call(this);
  }));
  const o = new IntersectionObserver((a) => {
    a.forEach((d) => {
      d.target.toggleAttribute("visible", d.isIntersecting), d.target.toggleAttribute("inert", !d.isIntersecting);
    });
  }, { scroller: i, threshold: 0.6 });
  t.forEach((a) => o.observe(a));
}, K = function() {
  clearTimeout(this.resizeTm), this.resizeTm = setTimeout(() => {
    r(this, s, R).call(this), r(this, s, z).call(this);
  }, 100);
}, Q = function() {
  if (e(this, L)) return;
  r(this, s, X).call(this), this.newIndex = e(this, n).index;
  const t = r(this, s, _).call(this);
  t !== e(this, n).index && (this.newIndex = t, r(this, s, C).call(this, t), r(this, s, P).call(this, "scrollupdate"));
}, X = function() {
  e(this, n).isMoving || r(this, s, P).call(this, "scrollstart"), e(this, n).isMoving = !0;
}, Y = function() {
  e(this, L) || (r(this, s, P).call(this, "scrollend"), k(this, b, !1), e(this, n).isMoving = !1, typeof this.newIndex == "number" ? (r(this, s, C).call(this, this.newIndex), this.newIndex = null) : r(this, s, C).call(this, e(this, n).index), r(this, s, E).call(this));
}, P = function(t) {
  const { current: i } = e(this, h);
  this.dispatchEvent(new CustomEvent(t, { detail: e(this, n) })), i["on" + t] && i["on" + t](this);
}, C = function(t) {
  t !== void 0 && (e(this, n).index = t), r(this, s, tt).call(this), e(this, b) || r(this, s, O).call(this, "updateState", t);
}, _ = function(t) {
  const { scroller: i, items: o } = e(this, l), { perPage: a, vertical: d } = e(this, h).current, v = r(this, s, A).call(this);
  let g = 0;
  g = d ? i.scrollTop : v ? i.scrollLeft : i.scrollLeft + i.clientWidth;
  let y = o.map((p) => {
    let f = 0;
    return f = d ? p.offsetTop - (e(this, n).computedPadding || 0) - g : (v ? p.offsetLeft : p.offsetLeft + p.clientWidth) - (e(this, n).computedPadding || 0) - g, { index: parseInt(p.dataset.index, 10), distance: Math.abs(f) };
  }).reduce((p, f) => !p || f.distance < p.distance ? f : p, null);
  return t ? y : Math.ceil(y.index / a);
}, tt = function() {
  const { sync: t } = e(this, h).current;
  t && e(this, n).ready && (e(this, l).sync = e(this, l).sync || Array.from(document.querySelectorAll(t)), e(this, l).sync.forEach((i) => {
    i instanceof I && i.goTo(e(this, n).index);
  }));
}, H = function(t, i = { fallback: !1 }) {
  const o = this.shadowRoot.querySelector(`[name="${t}"]`);
  let a = o.assignedElements();
  return i.fallback && !a.length && this.children[0].slot === "" && (this.children[0].slot = "scroller", a = o.assignedElements()), Array.from(a.length ? a : o.children);
}, et = function(t, i) {
  const o = document.createElement("style");
  return o.id = i, o.append(document.createTextNode(t)), o;
}, A = function() {
  return document.firstElementChild.getAttribute("dir") !== "rtl";
}, U = function(t) {
  return typeof t == "string" ? t : t + "px";
}, E = function() {
  if (!e(this, h).current.autoplay) return;
  const { pause: t, isVisible: i } = e(this, n);
  !t && i ? e(this, n).autoplayInterval || (e(this, n).autoplayInterval = setTimeout(() => {
    e(this, n).autoplayInterval = null, this.goTo(e(this, n).index + 1);
  }, e(this, h).current.autoplay)) : (clearTimeout(e(this, n).autoplayInterval), e(this, n).autoplayInterval = null);
};
let M = I;
function dt(...c) {
  return c.reduce((u, t) => t(u), M);
}
export {
  M as BaseCarousel,
  dt as createCarousel
};
