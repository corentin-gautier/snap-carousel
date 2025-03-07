var H = (f) => {
  throw TypeError(f);
};
var I = (f, g, t) => g.has(f) || H("Cannot " + t);
var e = (f, g, t) => (I(f, g, "read from private field"), t ? t.call(f) : g.get(f)), m = (f, g, t) => g.has(f) ? H("Cannot add the same private member more than once") : g instanceof WeakSet ? g.add(f) : g.set(f, t), T = (f, g, t, i) => (I(f, g, "write to private field"), i ? i.call(f, t) : g.set(f, t), t), n = (f, g, t) => (I(f, g, "access private method"), t);
const lt = ':host{display:block;position:relative;width:100%}:host(:not([scrollbar])) ::slotted([slot="scroller"]){scrollbar-width:none}:host(:not([scrollbar])) ::slotted([slot="scroller"])::-webkit-scrollbar{display:none}::slotted([slot="scroller"]){position:relative;margin:0;display:flex;gap:var(--sc-gap);scroll-behavior:var(--sc-behavior)}:host(:not([vertical])) ::slotted([slot="scroller"]){overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;scroll-padding-inline:var(--sc-padding);padding-inline:var(--sc-padding)!important}:host([vertical]) ::slotted([slot="scroller"]){flex-direction:column;overflow-y:auto;scroll-snap-type:y mandatory;overscroll-behavior-y:contain;padding-block:var(--sc-padding)!important;scroll-padding-block:var(--sc-padding)}', ct = "snap-carousel:not([scrollbar]) [slot=scroller]::-webkit-scrollbar{display:none}snap-carousel [slot=scroller]{display:flex}snap-carousel[vertical]{display:flex;flex-direction:column}snap-carousel[vertical] [slot=scroller]{flex-direction:column;height:100%}snap-carousel [slot=scroller]>*{display:block;flex:0 0 auto}snap-carousel:not([vertical]) [slot=scroller]>*{width:calc((100% / var(--sc-perpage, 1)) - var(--sc-gap, 0) + (var(--sc-gap, 0) / var(--sc-perpage, 1)));max-width:100%}snap-carousel[vertical] [slot=scroller]>*{max-height:100%;height:calc((100% / var(--sc-perpage, 1)) - var(--sc-gap, 0) + (var(--sc-gap, 0) / var(--sc-perpage, 1)))}", ht = `<slot name="scroller">
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
`;
if (!("onscrollend" in window)) {
  let i = function(l, c, p) {
    let v = l[c];
    l[c] = function() {
      p.apply(this, [v, ...arguments]);
    };
  }, r = function(l, c, p) {
    if (c !== "scroll" && c !== "scrollend") return;
    const v = this, d = t.get(v) || { scrollListener: (b) => {
      clearTimeout(d.t), d.t = setTimeout(() => {
        g.size ? setTimeout(d.scrollListener, 100) : (v.dispatchEvent(f), d.t = 0);
      }, 100);
    }, t: 0, listeners: 0 };
    t.has(v) || (l.apply(v, ["scroll", d.scrollListener]), t.set(v, d)), d.listeners++;
  }, a = function(l, c, p) {
    if (c !== "scroll" && c !== "scrollend") return;
    const v = this, d = t.get(v);
    d && (d.listeners--, d.listeners <= 0 && (l.apply(v, ["scroll", d.scrollListener]), t.delete(v)));
  };
  var ut = i, pt = r, ft = a;
  const f = new Event("scrollend"), g = /* @__PURE__ */ new Set();
  document.addEventListener("touchstart", (l) => {
    for (let c of l.changedTouches) g.add(c.identifier);
  }, { passive: !0 }), document.addEventListener("touchend", (l) => {
    for (let c of l.changedTouches) g.delete(c.identifier);
  }, { passive: !0 });
  const t = /* @__PURE__ */ new WeakMap();
  i(Element.prototype, "addEventListener", r), i(window, "addEventListener", r), i(document, "addEventListener", r), i(Element.prototype, "removeEventListener", a), i(window, "removeEventListener", a), i(document, "removeEventListener", a);
}
var x, C, u, h, o, k, s, D, A, V, F, O, $, U, j, N, R, z, B, G, J, K, Z, P, Q, X, w, Y, _, tt, et, st, it, y, nt, rt, ot, at, W, S, q, E;
const L = class L extends HTMLElement {
  /**
   * Carousel constructor
   * @param {NodeElement} element
   * @param {object} config
   */
  constructor() {
    super();
    m(this, s);
    m(this, x);
    m(this, C);
    m(this, u, {
      controls: {
        buttons: []
      },
      pagination: {
        container: null,
        dots: [],
        active: null
      },
      pager: {
        container: null,
        current: null,
        sep: null,
        total: null
      },
      scroller: null,
      items: null
    });
    m(this, h, {
      default: {},
      origin: {},
      current: {}
    });
    m(this, o, {
      index: 0,
      itemsCount: 0,
      pageCount: 0,
      isVisible: !1,
      autoplayInterval: null,
      breakpoint: void 0
    });
    m(this, k, "snp-c");
    e(this, h).default = L.defaultConfig;
  }
  /**
   * Set observed attributes
   *
   * Will be every keys from defaultConfig + every keys from defaultConfig prefixed by "data-"
   */
  static get observedAttributes() {
    const t = Object.keys(L.defaultConfig).map((i) => i.replace(/[A-Z]/g, (r) => "-" + r.toLowerCase()));
    return [...t, ...t.map((i) => "data-" + i)];
  }
  /**
   * The default configuration
   */
  static get defaultConfig() {
    return {
      autoplay: 0,
      displayed: 1,
      perPage: 1,
      gap: 0,
      padding: 0,
      controls: !1,
      nav: !1,
      pager: !1,
      loop: !1,
      behavior: "smooth",
      stop: !1,
      usePause: !0,
      vertical: !1,
      responsive: []
    };
  }
  /**
   * Connected callback :
   */
  connectedCallback() {
    if (!this.isConnected) return;
    const t = document.createElement("template");
    t.innerHTML = `<style>${lt}</style>${ht}`, this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(t.content.cloneNode(!0));
    const i = n(this, s, y).call(this, "scroller", { fallback: !0 })[0];
    new MutationObserver((a) => {
      a.forEach((l) => {
        (l.addedNodes.length || l.removedNodes.length) && (n(this, s, A).call(this), n(this, s, R).call(this));
      });
    }).observe(i, { childList: !0 }), n(this, s, D).call(this);
  }
  attributeChangedCallback() {
    e(this, o).ready && n(this, s, O).call(this);
  }
  /**
   * Go to a given page number
   * @param {Number} page page index
   */
  goTo(t) {
    T(this, x, !1);
    const { scroller: i, items: r } = e(this, u), { perPage: a, vertical: l } = e(this, h).current, c = t > e(this, o).pageCount - 1 ? 0 : t < 0 ? e(this, o).pageCount - 1 : t, p = r[c * a];
    n(this, s, w).call(this, c), e(this, o).ready = !0;
    let v = 0, d = 0;
    l ? v = p.offsetTop : d = n(this, s, S).call(this) ? p.offsetLeft : p.offsetLeft + p.offsetWidth - i.offsetWidth, T(this, x, !0), requestIdleCallback(() => {
      i.scrollTo({ top: v, left: d });
    }, { timeout: 100 });
  }
  prev() {
    this.goTo(this.state.index - 1);
  }
  next() {
    this.goTo(this.state.index + 1);
  }
};
x = new WeakMap(), C = new WeakMap(), u = new WeakMap(), h = new WeakMap(), o = new WeakMap(), k = new WeakMap(), s = new WeakSet(), D = function() {
  const t = n(this, s, y).call(this, "scroller", !0)[0];
  t && (t.onscroll = n(this, s, Z).bind(this), t.addEventListener("scrollend", n(this, s, X).bind(this)), window.addEventListener("resize", n(this, s, K).bind(this)), e(this, u).scroller = t, this.elements = e(this, u), this.settings = e(this, h), this.state = e(this, o), this.ariaRoleDescription = "carousel", Object.assign(t, { role: "group", ariaLive: "polite", ariaAtomic: !1 }), n(this, s, A).call(this), n(this, s, V).call(this), n(this, s, F).call(this), n(this, s, O).call(this), n(this, s, J).call(this), e(this, o).ready = !0);
}, A = function() {
  const t = Array.from(e(this, u).scroller.children).filter((r) => !["absolute", "fixed"].includes(getComputedStyle(r).position)), i = t.length;
  e(this, u).items = t, e(this, o).itemsCount = i, t.forEach((r, a) => {
    r.dataset.index = a, Object.assign(r, {
      ariaSetSize: i,
      ariaPosInSet: a + 1,
      ariaRoleDescription: "slide",
      role: "listitem"
    });
  });
}, /**
 * Add carousel base styles in the document head
 * @returns
 */
V = function() {
  const i = `${e(this, k)}-global-styles`;
  if (document.querySelector("#" + i))
    return;
  const r = ct;
  document.head.append(n(this, s, W).call(this, r, i));
}, /**
 * Adds unique ids and classes
 */
F = function() {
  this.id = e(this, o).id = e(this, k) + "-" + (Math.random() + 1).toString(36).substring(4);
}, O = function() {
  e(this, o).breakpoint = void 0, e(this, h).origin = Object.assign({}, e(this, h).default, n(this, s, U).call(this)), e(this, h).origin.responsive = (e(this, h).origin.responsive || []).sort((t, i) => t.breakpoint - i.breakpoint), n(this, s, N).call(this);
}, /**
 * Wait for the scroller to have width
 */
$ = function(t) {
  e(this, u).scroller.clientWidth ? t() : requestAnimationFrame(() => {
    n(this, s, $).call(this, t);
  });
}, U = function() {
  const t = Object.keys(e(this, h).default);
  return this.attributes.options ? n(this, s, j).call(this, this.attributes.options.value) : Array.from(this.attributes).reduce((i, r) => {
    const a = r.name.replace("data-", "").replace(/-([a-z])/g, (l) => l[1].toUpperCase());
    return t.includes(a) && (i[a] = n(this, s, j).call(this, r.value)), i;
  }, {});
}, j = function(t) {
  if (t === "") return !0;
  try {
    return JSON.parse(t);
  } catch {
    return t;
  }
}, /**
 * Sets the config according to the current breakpoint match
 * then runs setup if the new breakpoint is different from the last one
 */
N = function() {
  const { origin: t } = e(this, h), i = t.responsive.reduce((a, l) => l.breakpoint < window.innerWidth ? l : a, { breakpoint: null }), r = Object.assign({}, t, i.settings || {});
  r.perPage = Math.min(r.displayed, r.perPage), e(this, h).current = r, e(this, o).breakpoint !== i.breakpoint && (e(this, o).breakpoint = i.breakpoint, n(this, s, R).call(this));
}, /**
 * Setup everything
 */
R = function() {
  n(this, s, $).call(this, () => {
    n(this, s, B).call(this), n(this, s, G).call(this), n(this, s, _).call(this), n(this, s, tt).call(this), n(this, s, it).call(this), n(this, s, z).call(this), n(this, s, w).call(this, 0);
  });
}, z = function() {
  const { vertical: t } = e(this, h).current, i = t ? "padding-top" : "padding-left";
  e(this, o).computedPadding = parseInt(getComputedStyle(e(this, u).scroller)[i], 10);
}, /**
 * Calculate the number of pages
 */
B = function() {
  const { current: t } = e(this, h), { itemsCount: i } = e(this, o), r = Math.floor((t.displayed - t.perPage) / t.perPage);
  e(this, o).pageCount = Math.ceil(i / t.perPage) - r;
}, /**
 * Generates CSS given the config
 */
G = function() {
  const t = document.querySelector("#" + e(this, o).id + "-styles");
  t && t.remove();
  const { displayed: i, gap: r, padding: a, perPage: l, stop: c, behavior: p } = e(this, h).current, v = l > 1 ? `*:nth-child(${l}n + 1)` : "*", d = `#${e(this, o).id} { --sc-perpage: ${i}; --sc-gap: ${n(this, s, q).call(this, r)}; --sc-padding: ${n(this, s, q).call(this, a)}; --sc-behavior: ${p}; } #${e(this, o).id} [slot="scroller"] > ${v} { scroll-snap-align: start; scroll-snap-stop: ${c ? "always" : "normal"} }`;
  this.styles = n(this, s, W).call(this, d, e(this, o).id + "-styles"), document.head.append(this.styles);
}, J = function() {
  const { items: t, scroller: i } = e(this, u);
  new IntersectionObserver((l) => {
    let c = l[0];
    e(this, o).isVisible = c.intersectionRatio > 0.1, e(this, o).pause = !e(this, o).isVisible, n(this, s, E).call(this);
  }, {
    threshold: [0.1, 0.9]
  }).observe(this), e(this, h).current.usePause && (this.addEventListener("mouseenter", () => {
    e(this, o).pause = !0, n(this, s, E).call(this);
  }), this.addEventListener("mouseleave", () => {
    e(this, o).pause = !1, n(this, s, E).call(this);
  }));
  const a = new IntersectionObserver((l) => {
    l.forEach((c) => {
      c.target.toggleAttribute("visible", c.isIntersecting), c.target.toggleAttribute("inert", !c.isIntersecting);
    });
  }, {
    scroller: i,
    threshold: 0.6
  });
  t.forEach((l) => a.observe(l));
}, /**
 * On window resize : reinit the carousel
 */
K = function() {
  clearTimeout(this.resizeTm), this.resizeTm = setTimeout(() => {
    n(this, s, z).call(this), n(this, s, N).call(this);
  }, 100);
}, /**
 * On scroll, dispatch events, calculate the current slide
 */
Z = function() {
  if (e(this, C)) return;
  n(this, s, Q).call(this), this.newIndex = e(this, o).index;
  const t = n(this, s, Y).call(this);
  t != e(this, o).index && (this.newIndex = t, n(this, s, w).call(this, t), n(this, s, P).call(this, "scrollupdate"));
}, /**
 * Dispatch a custom event
 * @param {String} name
 */
P = function(t) {
  const { current: i } = e(this, h);
  this.dispatchEvent(
    new CustomEvent(t, {
      detail: e(this, o)
    })
  ), i["on" + t] && i["on" + t](this);
}, /**
 * On scroll start
 */
Q = function() {
  e(this, o).isMoving || n(this, s, P).call(this, "scrollstart"), e(this, o).isMoving = !0;
}, /**
 * On scroll end
 */
X = function() {
  e(this, C) || (n(this, s, P).call(this, "scrollend"), T(this, x, !1), e(this, o).isMoving = !1, typeof this.newIndex == "number" ? (n(this, s, w).call(this, this.newIndex), this.newIndex = null) : n(this, s, w).call(this, e(this, o).index), n(this, s, E).call(this));
}, /**
 * Update the dots/controls state
 * @param {Number} index
 * @param {Boolean} force
 */
w = function(t) {
  typeof t < "u" && (e(this, o).index = t), n(this, s, at).call(this), e(this, x) || (n(this, s, nt).call(this), n(this, s, rt).call(this)), n(this, s, ot).call(this);
}, /**
 * Compute the current slide index
 * @returns {Number} the current slide index
 */
Y = function(t) {
  const { scroller: i, items: r } = e(this, u), { perPage: a, vertical: l } = e(this, h).current, c = n(this, s, S).call(this);
  let p = 0;
  l ? p = i.scrollTop : p = c ? i.scrollLeft : i.scrollLeft + i.clientWidth;
  let v = r.map((d) => {
    let b = 0;
    return l ? b = d.offsetTop - (e(this, o).computedPadding || 0) - p : b = (c ? d.offsetLeft : d.offsetLeft + d.clientWidth) - (e(this, o).computedPadding || 0) - p, {
      index: parseInt(d.dataset.index, 10),
      distance: Math.abs(b)
    };
  }).reduce((d, b) => !d || b.distance < d.distance ? b : d, null);
  return t ? v : Math.ceil(v.index / a);
}, /**
 * Create the dots nav (page numbers)
 */
_ = function() {
  const { pagination: t } = e(this, u);
  let { container: i, dots: r } = t, { current: a } = e(this, h);
  if (i ? (i.innerHTML = null, r.forEach((l) => l.remove()), e(this, u).pagination.dots = []) : (i = n(this, s, y).call(this, "pagination")[0], i.addEventListener("keydown", n(this, s, st).bind(this)), t.container = i), i.style.display = a.nav && e(this, o).pageCount > 1 ? "" : "none", a.nav && i)
    for (let l = 0; l < e(this, o).pageCount; l++)
      n(this, s, et).call(this, l);
}, tt = function() {
  const { pager: t } = e(this, u), { current: i } = e(this, h);
  t.current || (["current", "sep", "total"].forEach((r) => {
    t[r] = n(this, s, y).call(this, r)[0];
  }), t.container = this.shadowRoot.querySelector('[part="pager"]')), t.container.style.display = i.pager && e(this, o).pageCount > 1 ? "" : "none", t.current.innerHTML = 1, t.total.innerHTML = e(this, o).pageCount;
}, /**
 * Creates a button for page N
 * @param {Number} index
 */
et = function(t) {
  const { pagination: i } = e(this, u), { container: r, dots: a } = i, l = document.createElement("button");
  l.innerHTML = t + 1, l.addEventListener("click", () => this.goTo(t)), Object.assign(l, {
    type: "button",
    part: "button nav-button",
    ariaControls: e(this, u).scroller.id,
    ariaSelected: !1
  }), r.append(l), a.push(l);
}, /**
 * Handle prev/next arrows on pagination
 * @param {KeyboardEvent} event
 * @returns
 */
st = function(t) {
  const i = n(this, s, S).call(this), r = e(this, u).pagination.dots[e(this, o).index] || 0;
  switch (t.key) {
    case "ArrowRight":
    case "ArrowLeft":
      let a = t.key === "ArrowRight" ? i ? "next" : "previous" : i ? "previous" : "next";
      const l = r[`${a}ElementSibling`];
      l && (l.click(), l.focus());
      break;
  }
}, /**
 * Add prev next buttons event listener
 */
it = function() {
  const { controls: t } = e(this, u), { current: i } = e(this, h), r = !i.controls || e(this, o).pageCount < 2;
  t.buttons = [
    ...n(this, s, y).call(this, "prev-buttons"),
    ...n(this, s, y).call(this, "next-buttons")
  ], t.buttons.forEach((a) => {
    a.style = r ? "display: none !important;" : "", !a.hasListener && (a.direction = a.getAttribute("direction") || "next", a.modifier = (a.direction === "next" ? 1 : -1) * (parseInt(a.getAttribute("modifier"), 10) || 1), a.hasListener = !0, a.addEventListener("click", () => {
      i.controls && this.goTo(e(this, o).index + a.modifier);
    }), Object.assign(a, {
      ariaControls: e(this, u).scroller.id
    }));
  });
}, /**
 * Retrieve the element assigned to a slot or the default one
 * When use with fallback: true, will return the first child if it exists and is
 * the only child
 * @param {String} slotName
 * @param {Object} options
 * @returns [HtmlElement]
 */
y = function(t, i = { fallback: !1 }) {
  const r = this.shadowRoot.querySelector([`[name="${t}"]`]);
  let a = r.assignedElements();
  return i.fallback && !a.length && this.children[0].slot === "" && (this.children[0].slot = "scroller", a = r.assignedElements()), Array.from(a.length ? a : r.children);
}, /**
 * Set active state on the nav dots
 * @param {Number} index
 */
nt = function() {
  if (!e(this, h).current.nav) return;
  const { pagination: t } = e(this, u);
  let { dots: i, active: r } = t;
  const a = i[e(this, o).index];
  a && (r && (Object.assign(r, {
    tabIndex: 0,
    ariaSelected: !1
  }), r.part = "button nav-button"), a.part = "button nav-button active", Object.assign(a, {
    tabIndex: -1,
    ariaSelected: !0
  }), t.active = a);
}, /**
 * Set the current page number in the pager
 */
rt = function() {
  e(this, h).current.pager && (e(this, u).pager.current.innerHTML = e(this, o).index + 1);
}, /**
 * Set button disable attribute if needed
 * @returns
 */
ot = function() {
  const { loop: t } = e(this, h).current, { buttons: i } = e(this, u).controls, { index: r, pageCount: a } = e(this, o);
  let l = !1;
  if (i.forEach((c) => {
    const p = !t && (c.direction === "next" ? r >= a - c.modifier : r < Math.abs(c.modifier));
    c === this.shadowRoot.activeElement && p && (l = !0), c.disabled = p ? "disabled" : "";
  }), l) {
    const c = i.filter((p) => !p.disabled);
    c.length && c[0].focus();
  }
}, /**
 * Synchronize every other carousel with the current index
 */
at = function() {
  const { sync: t } = e(this, h).current;
  t && e(this, o).ready && (e(this, u).sync = e(this, u).sync || document.querySelectorAll(t) || [], e(this, u).sync.forEach((i) => {
    i instanceof L && i.goTo(e(this, o).index);
  }));
}, /**
 * Create a style element
 *
 * @param {string} css
 * @param {string} id
 * @returns HTMLStyleElement
 */
W = function(t, i) {
  const r = document.createElement("style");
  return r.id = i, r.append(document.createTextNode(t)), r;
}, /**
 * Is the current document LTR
 * @returns {boolean}
 */
S = function() {
  return document.firstElementChild.getAttribute("dir") !== "rtl";
}, /**
 * Add 'px' to a value if it's not a string
 * @param {mixed} value
 * @returns string
 */
q = function(t) {
  return typeof t == "string" ? t : t + "px";
}, /**
 * Activate/deactivate the automatic goTo
 */
E = function() {
  if (!e(this, h).current.autoplay) return;
  const { pause: t, isVisible: i } = e(this, o);
  !t && i ? e(this, o).autoplayInterval || (e(this, o).autoplayInterval = setTimeout(() => {
    e(this, o).autoplayInterval = null, this.goTo(e(this, o).index + 1);
  }, e(this, h).current.autoplay)) : (clearTimeout(e(this, o).autoplayInterval), e(this, o).autoplayInterval = null);
};
let M = L;
window.customElements && customElements.define("snap-carousel", M);
