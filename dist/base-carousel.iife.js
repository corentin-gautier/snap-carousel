var D = (l) => {
  throw TypeError(l);
};
var M = (l, d, t) => d.has(l) || D("Cannot " + t);
var e = (l, d, t) => (M(l, d, "read from private field"), t ? t.call(l) : d.get(l)), m = (l, d, t) => d.has(l) ? D("Cannot add the same private member more than once") : d instanceof WeakSet ? d.add(l) : d.set(l, t), T = (l, d, t, i) => (M(l, d, "write to private field"), i ? i.call(l, t) : d.set(l, t), t), n = (l, d, t) => (M(l, d, "access private method"), t);
import "./node_modules/scrollyfills/dist/scrollyfills.modern.iife.js";
import st from "./src/host.css.iife.js";
import it from "./src/style.css.iife.js";
import nt from "./src/template.html.iife.js";
var f, I, w, r, u, h, y, s, A, H, O, j, q, B, F, N, J, W, z, Z, G, R, K, Q, X, Y, _, L, x, tt, et, P, U, S, V, k;
const E = class E extends HTMLElement {
  constructor() {
    super();
    m(this, s);
    m(this, f, !1);
    m(this, I, !1);
    m(this, w, "snp-c");
    m(this, r, { index: 0, itemsCount: 0, pageCount: 0, isVisible: !1, autoplayInterval: null, breakpoint: void 0, ready: !1, isMoving: !1, pause: !1, computedPadding: 0 });
    m(this, u, { scroller: null, items: null, sync: null });
    m(this, h, { default: {}, origin: {}, current: {} });
    m(this, y, { init: [], updateState: [] });
    e(this, h).default = E.defaultConfig;
  }
  get elements() {
    return e(this, u);
  }
  get settings() {
    return e(this, h);
  }
  get state() {
    return e(this, r);
  }
  get preventUiUpdate() {
    return e(this, f);
  }
  getSlotElements(t, i = { fallback: !1 }) {
    return n(this, s, P).call(this, t, i);
  }
  isDocumentLtr() {
    return n(this, s, S).call(this);
  }
  registerHook(t, i) {
    e(this, y)[t] && e(this, y)[t].push(i);
  }
  static get defaultConfig() {
    return { autoplay: 0, displayed: 1, perPage: 1, gap: 0, padding: 0, controls: !1, nav: !1, pager: !1, loop: !1, behavior: "smooth", stop: !1, usePause: !0, vertical: !1, responsive: [] };
  }
  static get observedAttributes() {
    const t = Object.keys(E.defaultConfig).map((i) => i.replace(/[A-Z]/g, (o) => "-" + o.toLowerCase()));
    return [...t, ...t.map((i) => "data-" + i)];
  }
  connectedCallback() {
    if (!this.isConnected) return;
    const t = document.createElement("template");
    t.innerHTML = `<style>${st}</style>${nt}`, this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(t.content.cloneNode(!0));
    const i = n(this, s, P).call(this, "scroller", { fallback: !0 })[0];
    new MutationObserver((o) => {
      o.forEach((a) => {
        (a.addedNodes.length || a.removedNodes.length) && (n(this, s, q).call(this), n(this, s, j).call(this));
      });
    }).observe(i, { childList: !0 }), n(this, s, H).call(this);
  }
  attributeChangedCallback() {
    e(this, r).ready && n(this, s, O).call(this);
  }
  goTo(t) {
    T(this, f, !1);
    const { scroller: i, items: o } = e(this, u), { perPage: a, vertical: c } = e(this, h).current, b = t > e(this, r).pageCount - 1 ? 0 : t < 0 ? e(this, r).pageCount - 1 : t, g = o[b * a];
    n(this, s, x).call(this, b), e(this, r).ready = !0;
    let v = 0, p = 0;
    c ? v = g.offsetTop : p = n(this, s, S).call(this) ? g.offsetLeft : g.offsetLeft + g.offsetWidth - i.offsetWidth, T(this, f, !0), requestIdleCallback(() => {
      i.scrollTo({ top: v, left: p });
    }, { timeout: 100 });
  }
  prev() {
    this.goTo(this.state.index - 1);
  }
  next() {
    this.goTo(this.state.index + 1);
  }
};
f = new WeakMap(), I = new WeakMap(), w = new WeakMap(), r = new WeakMap(), u = new WeakMap(), h = new WeakMap(), y = new WeakMap(), s = new WeakSet(), A = function(t, ...i) {
  e(this, y)[t] && e(this, y)[t].forEach((o) => o.apply(this, i));
}, H = function() {
  const t = n(this, s, P).call(this, "scroller", !0)[0];
  t && (t.onscroll = n(this, s, X).bind(this), t.addEventListener("scrollend", n(this, s, _).bind(this)), window.addEventListener("resize", n(this, s, Q).bind(this)), e(this, u).scroller = t, this.ariaRoleDescription = "carousel", Object.assign(t, { role: "group", ariaLive: "polite", ariaAtomic: !1 }), n(this, s, q).call(this), n(this, s, B).call(this), n(this, s, F).call(this), n(this, s, O).call(this), n(this, s, K).call(this), e(this, r).ready = !0);
}, O = function() {
  e(this, r).breakpoint = void 0, e(this, h).origin = Object.assign({}, e(this, h).default, n(this, s, J).call(this)), e(this, h).origin.responsive = (e(this, h).origin.responsive || []).sort((t, i) => t.breakpoint - i.breakpoint), n(this, s, z).call(this);
}, j = function() {
  n(this, s, N).call(this, () => {
    n(this, s, Z).call(this), n(this, s, G).call(this), n(this, s, R).call(this), n(this, s, x).call(this, 0), n(this, s, A).call(this, "init");
  });
}, q = function() {
  const t = Array.from(e(this, u).scroller.children).filter((o) => !["absolute", "fixed"].includes(getComputedStyle(o).position)), i = t.length;
  e(this, u).items = t, e(this, r).itemsCount = i, t.forEach((o, a) => {
    o.dataset.index = a, Object.assign(o, { ariaSetSize: i, ariaPosInSet: a + 1, ariaRoleDescription: "slide", role: "listitem" });
  });
}, B = function() {
  const t = `${e(this, w)}-global-styles`;
  if (document.querySelector("#" + t)) return;
  const i = it;
  document.head.append(n(this, s, U).call(this, i, t));
}, F = function() {
  this.id = e(this, r).id = e(this, w) + "-" + (Math.random() + 1).toString(36).substring(4);
}, N = function(t) {
  e(this, u).scroller.clientWidth ? t() : requestAnimationFrame(() => {
    n(this, s, N).call(this, t);
  });
}, J = function() {
  const t = Object.keys(e(this, h).default);
  return this.attributes.options ? n(this, s, W).call(this, this.attributes.options.value) : Array.from(this.attributes).reduce((i, o) => {
    const a = o.name.replace("data-", "").replace(/-([a-z])/g, (c) => c[1].toUpperCase());
    return t.includes(a) && (i[a] = n(this, s, W).call(this, o.value)), i;
  }, {});
}, W = function(t) {
  if (t === "") return !0;
  try {
    return JSON.parse(t);
  } catch {
    return t;
  }
}, z = function() {
  const { origin: t } = e(this, h), i = t.responsive.reduce((a, c) => c.breakpoint < window.innerWidth ? c : a, { breakpoint: null }), o = Object.assign({}, t, i.settings || {});
  o.perPage = Math.min(o.displayed, o.perPage), e(this, h).current = o, e(this, r).breakpoint !== i.breakpoint && (e(this, r).breakpoint = i.breakpoint, n(this, s, j).call(this));
}, Z = function() {
  const { current: t } = e(this, h), { itemsCount: i } = e(this, r), o = Math.floor((t.displayed - t.perPage) / t.perPage);
  e(this, r).pageCount = Math.ceil(i / t.perPage) - o;
}, G = function() {
  const t = document.querySelector("#" + e(this, r).id + "-styles");
  t && t.remove();
  const { displayed: i, gap: o, padding: a, perPage: c, stop: b, behavior: g } = e(this, h).current, v = c > 1 ? `*:nth-child(${c}n + 1)` : "*", p = `
      #${e(this, r).id} {
        --sc-perpage: ${i};
        --sc-gap: ${n(this, s, V).call(this, o)};
        --sc-padding: ${n(this, s, V).call(this, a)};
        --sc-behavior: ${g};
      }
      #${e(this, r).id} [slot="scroller"] > ${v} {
        scroll-snap-align: start;
        scroll-snap-stop: ${b ? "always" : "normal"}
      }
    `;
  this.styles = n(this, s, U).call(this, p, e(this, r).id + "-styles"), document.head.append(this.styles);
}, R = function() {
  const { vertical: t } = e(this, h).current, i = t ? "padding-top" : "padding-left";
  e(this, r).computedPadding = parseInt(getComputedStyle(e(this, u).scroller)[i], 10);
}, K = function() {
  const { items: t, scroller: i } = e(this, u);
  new IntersectionObserver((a) => {
    const c = a[0];
    e(this, r).isVisible = c.intersectionRatio > 0.1, e(this, r).pause = !e(this, r).isVisible, n(this, s, k).call(this);
  }, { threshold: [0.1, 0.9] }).observe(this), e(this, h).current.usePause && (this.addEventListener("mouseenter", () => {
    e(this, r).pause = !0, n(this, s, k).call(this);
  }), this.addEventListener("mouseleave", () => {
    e(this, r).pause = !1, n(this, s, k).call(this);
  }));
  const o = new IntersectionObserver((a) => {
    a.forEach((c) => {
      c.target.toggleAttribute("visible", c.isIntersecting), c.target.toggleAttribute("inert", !c.isIntersecting);
    });
  }, { scroller: i, threshold: 0.6 });
  t.forEach((a) => o.observe(a));
}, Q = function() {
  clearTimeout(this.resizeTm), this.resizeTm = setTimeout(() => {
    n(this, s, R).call(this), n(this, s, z).call(this);
  }, 100);
}, X = function() {
  if (e(this, I)) return;
  n(this, s, Y).call(this), this.newIndex = e(this, r).index;
  const t = n(this, s, tt).call(this);
  t !== e(this, r).index && (this.newIndex = t, n(this, s, x).call(this, t), n(this, s, L).call(this, "scrollupdate"));
}, Y = function() {
  e(this, r).isMoving || n(this, s, L).call(this, "scrollstart"), e(this, r).isMoving = !0;
}, _ = function() {
  e(this, I) || (n(this, s, L).call(this, "scrollend"), T(this, f, !1), e(this, r).isMoving = !1, typeof this.newIndex == "number" ? (n(this, s, x).call(this, this.newIndex), this.newIndex = null) : n(this, s, x).call(this, e(this, r).index), n(this, s, k).call(this));
}, L = function(t) {
  const { current: i } = e(this, h);
  this.dispatchEvent(new CustomEvent(t, { detail: e(this, r) })), i["on" + t] && i["on" + t](this);
}, x = function(t) {
  t !== void 0 && (e(this, r).index = t), n(this, s, et).call(this), e(this, f) || n(this, s, A).call(this, "updateState", t);
}, tt = function(t) {
  const { scroller: i, items: o } = e(this, u), { perPage: a, vertical: c } = e(this, h).current, b = n(this, s, S).call(this);
  let g = 0;
  g = c ? i.scrollTop : b ? i.scrollLeft : i.scrollLeft + i.clientWidth;
  let v = o.map((p) => {
    let C = 0;
    return C = c ? p.offsetTop - (e(this, r).computedPadding || 0) - g : (b ? p.offsetLeft : p.offsetLeft + p.clientWidth) - (e(this, r).computedPadding || 0) - g, { index: parseInt(p.dataset.index, 10), distance: Math.abs(C) };
  }).reduce((p, C) => !p || C.distance < p.distance ? C : p, null);
  return t ? v : Math.ceil(v.index / a);
}, et = function() {
  const { sync: t } = e(this, h).current;
  t && e(this, r).ready && (e(this, u).sync = e(this, u).sync || document.querySelectorAll(t) || [], e(this, u).sync.forEach((i) => {
    i instanceof E && i.goTo(e(this, r).index);
  }));
}, P = function(t, i = { fallback: !1 }) {
  const o = this.shadowRoot.querySelector(`[name="${t}"]`);
  let a = o.assignedElements();
  return i.fallback && !a.length && this.children[0].slot === "" && (this.children[0].slot = "scroller", a = o.assignedElements()), Array.from(a.length ? a : o.children);
}, U = function(t, i) {
  const o = document.createElement("style");
  return o.id = i, o.append(document.createTextNode(t)), o;
}, S = function() {
  return document.firstElementChild.getAttribute("dir") !== "rtl";
}, V = function(t) {
  return typeof t == "string" ? t : t + "px";
}, k = function() {
  if (!e(this, h).current.autoplay) return;
  const { pause: t, isVisible: i } = e(this, r);
  !t && i ? e(this, r).autoplayInterval || (e(this, r).autoplayInterval = setTimeout(() => {
    e(this, r).autoplayInterval = null, this.goTo(e(this, r).index + 1);
  }, e(this, h).current.autoplay)) : (clearTimeout(e(this, r).autoplayInterval), e(this, r).autoplayInterval = null);
};
let $ = E;
function ct(...l) {
  return l.reduce((d, t) => t(d), $);
}
export {
  $ as BaseCarousel,
  ct as createCarousel
};
