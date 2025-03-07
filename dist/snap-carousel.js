var Z = (f) => {
  throw TypeError(f);
};
var z = (f, h, y) => h.has(f) || Z("Cannot " + y);
var t = (f, h, y) => (z(f, h, "read from private field"), y ? y.call(f) : h.get(f)), m = (f, h, y) => h.has(f) ? Z("Cannot add the same private member more than once") : h instanceof WeakSet ? h.add(f) : h.set(f, y), M = (f, h, y, b) => (z(f, h, "write to private field"), b ? b.call(f, y) : h.set(f, y), y), n = (f, h, y) => (z(f, h, "access private method"), y);
const yt = ':host{display:block;position:relative;width:100%}:host(:not([scrollbar])) ::slotted([slot="scroller"]){scrollbar-width:none}:host(:not([scrollbar])) ::slotted([slot="scroller"])::-webkit-scrollbar{display:none}::slotted([slot="scroller"]){position:relative;margin:0;display:flex;gap:var(--sc-gap);scroll-behavior:var(--sc-behavior)}:host(:not([vertical])) ::slotted([slot="scroller"]){overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;scroll-padding-inline:var(--sc-padding);padding-inline:var(--sc-padding)!important}:host([vertical]) ::slotted([slot="scroller"]){flex-direction:column;overflow-y:auto;scroll-snap-type:y mandatory;overscroll-behavior-y:contain;padding-block:var(--sc-padding)!important;scroll-padding-block:var(--sc-padding)}', bt = "snap-carousel:not([scrollbar]) [slot=scroller]::-webkit-scrollbar{display:none}snap-carousel [slot=scroller]{display:flex}snap-carousel[vertical]{display:flex;flex-direction:column}snap-carousel[vertical] [slot=scroller]{flex-direction:column;height:100%}snap-carousel [slot=scroller]>*{display:block;flex:0 0 auto}snap-carousel:not([vertical]) [slot=scroller]>*{width:calc((100% / var(--sc-perpage, 1)) - var(--sc-gap, 0) + (var(--sc-gap, 0) / var(--sc-perpage, 1)));max-width:100%}snap-carousel[vertical] [slot=scroller]>*{max-height:100%;height:calc((100% / var(--sc-perpage, 1)) - var(--sc-gap, 0) + (var(--sc-gap, 0) / var(--sc-perpage, 1)))}", mt = `<slot name="scroller">
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
`;
((f, h, y, b, J, K, N, I, gt) => {
  var x, k, u, d, o, P, s, Q, W, X, Y, q, H, _, D, V, F, U, O, j, tt, et, st, $, it, nt, C, rt, ot, at, lt, ct, ht, L, dt, pt, ut, ft, B, A, G, w;
  if (!("onscrollend" in f)) {
    let i = function(l, c, g) {
      let v = l[c];
      l[c] = function() {
        g.apply(this, [v, ...arguments]);
      };
    }, r = function(l, c, g) {
      if (c !== "scroll" && c !== "scrollend") return;
      const v = this, p = e.get(v) || { scrollListener: (E) => {
        N(p.t), p.t = I(() => {
          T.size ? I(p.scrollListener, 100) : (v.dispatchEvent(vt), p.t = 0);
        }, 100);
      }, t: 0, listeners: 0 };
      e.has(v) || (l.apply(v, ["scroll", p.scrollListener]), e.set(v, p)), p.listeners++;
    }, a = function(l, c, g) {
      if (c !== "scroll" && c !== "scrollend") return;
      const v = this, p = e.get(v);
      p && (p.listeners--, p.listeners <= 0 && (l.apply(v, ["scroll", p.scrollListener]), e.delete(v)));
    };
    var xt = i, Et = r, Lt = a;
    const vt = new Event("scrollend"), T = /* @__PURE__ */ new Set();
    h.addEventListener("touchstart", (l) => {
      for (let c of l.changedTouches) T.add(c.identifier);
    }, { passive: !0 }), h.addEventListener("touchend", (l) => {
      for (let c of l.changedTouches) T.delete(c.identifier);
    }, { passive: !0 });
    const e = /* @__PURE__ */ new WeakMap();
    i(J.prototype, "addEventListener", r), i(f, "addEventListener", r), i(h, "addEventListener", r), i(J.prototype, "removeEventListener", a), i(f, "removeEventListener", a), i(h, "removeEventListener", a);
  }
  const S = class S extends HTMLElement {
    /**
     * Carousel constructor
     * @param {NodeElement} element
     * @param {object} config
     */
    constructor() {
      super();
      m(this, s);
      m(this, x);
      m(this, k);
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
      m(this, d, {
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
      m(this, P, "snp-c");
      t(this, d).default = S.defaultConfig;
    }
    /**
     * Set observed attributes
     *
     * Will be every keys from defaultConfig + every keys from defaultConfig prefixed by "data-"
     */
    static get observedAttributes() {
      const e = b.keys(S.defaultConfig).map((i) => i.replace(/[A-Z]/g, (r) => "-" + r.toLowerCase()));
      return [...e, ...e.map((i) => "data-" + i)];
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
      const e = h.createElement("template");
      e.innerHTML = `<style>${yt}</style>${mt}`, this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(e.content.cloneNode(!0));
      const i = n(this, s, L).call(this, "scroller", { fallback: !0 })[0];
      new MutationObserver((a) => {
        a.forEach((l) => {
          (l.addedNodes.length || l.removedNodes.length) && (n(this, s, W).call(this), n(this, s, F).call(this));
        });
      }).observe(i, { childList: !0 }), n(this, s, Q).call(this);
    }
    attributeChangedCallback() {
      t(this, o).ready && n(this, s, q).call(this);
    }
    /**
     * Go to a given page number
     * @param {Number} page page index
     */
    goTo(e) {
      M(this, x, !1);
      const { scroller: i, items: r } = t(this, u), { perPage: a, vertical: l } = t(this, d).current, c = e > t(this, o).pageCount - 1 ? 0 : e < 0 ? t(this, o).pageCount - 1 : e, g = r[c * a];
      n(this, s, C).call(this, c), t(this, o).ready = !0;
      let v = 0, p = 0;
      l ? v = g.offsetTop : p = n(this, s, A).call(this) ? g.offsetLeft : g.offsetLeft + g.offsetWidth - i.offsetWidth, M(this, x, !0), gt(() => {
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
  x = new WeakMap(), k = new WeakMap(), u = new WeakMap(), d = new WeakMap(), o = new WeakMap(), P = new WeakMap(), s = new WeakSet(), Q = function() {
    const e = n(this, s, L).call(this, "scroller", !0)[0];
    e && (e.onscroll = n(this, s, st).bind(this), e.addEventListener("scrollend", n(this, s, nt).bind(this)), f.addEventListener("resize", n(this, s, et).bind(this)), t(this, u).scroller = e, this.elements = t(this, u), this.settings = t(this, d), this.state = t(this, o), this.ariaRoleDescription = "carousel", b.assign(e, { role: "group", ariaLive: "polite", ariaAtomic: !1 }), n(this, s, W).call(this), n(this, s, X).call(this), n(this, s, Y).call(this), n(this, s, q).call(this), n(this, s, tt).call(this), t(this, o).ready = !0);
  }, W = function() {
    const e = y.from(t(this, u).scroller.children).filter((r) => !["absolute", "fixed"].includes(getComputedStyle(r).position)), i = e.length;
    t(this, u).items = e, t(this, o).itemsCount = i, e.forEach((r, a) => {
      r.dataset.index = a, b.assign(r, {
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
  X = function() {
    const i = `${t(this, P)}-global-styles`;
    if (h.querySelector("#" + i))
      return;
    const r = bt;
    h.head.append(n(this, s, B).call(this, r, i));
  }, /**
   * Adds unique ids and classes
   */
  Y = function() {
    this.id = t(this, o).id = t(this, P) + "-" + (Math.random() + 1).toString(36).substring(4);
  }, q = function() {
    t(this, o).breakpoint = void 0, t(this, d).origin = b.assign({}, t(this, d).default, n(this, s, _).call(this)), t(this, d).origin.responsive = (t(this, d).origin.responsive || []).sort((e, i) => e.breakpoint - i.breakpoint), n(this, s, V).call(this);
  }, /**
   * Wait for the scroller to have width
   */
  H = function(e) {
    t(this, u).scroller.clientWidth ? e() : requestAnimationFrame(() => {
      n(this, s, H).call(this, e);
    });
  }, _ = function() {
    const e = b.keys(t(this, d).default);
    return this.attributes.options ? n(this, s, D).call(this, this.attributes.options.value) : y.from(this.attributes).reduce((i, r) => {
      const a = r.name.replace("data-", "").replace(/-([a-z])/g, (l) => l[1].toUpperCase());
      return e.includes(a) && (i[a] = n(this, s, D).call(this, r.value)), i;
    }, {});
  }, D = function(e) {
    if (e === "") return !0;
    try {
      return JSON.parse(e);
    } catch {
      return e;
    }
  }, /**
   * Sets the config according to the current breakpoint match
   * then runs setup if the new breakpoint is different from the last one
   */
  V = function() {
    const { origin: e } = t(this, d), i = e.responsive.reduce((a, l) => l.breakpoint < f.innerWidth ? l : a, { breakpoint: null }), r = b.assign({}, e, i.config || {});
    r.perPage = Math.min(r.displayed, r.perPage), t(this, d).current = r, t(this, o).breakpoint !== i.breakpoint && (t(this, o).breakpoint = i.breakpoint, n(this, s, F).call(this));
  }, /**
   * Setup everything
   */
  F = function() {
    n(this, s, H).call(this, () => {
      n(this, s, O).call(this), n(this, s, j).call(this), n(this, s, ot).call(this), n(this, s, at).call(this), n(this, s, ht).call(this), n(this, s, U).call(this), n(this, s, C).call(this, 0);
    });
  }, U = function() {
    const { vertical: e } = t(this, d).current, i = e ? "padding-top" : "padding-left";
    t(this, o).computedPadding = parseInt(getComputedStyle(t(this, u).scroller)[i], 10);
  }, /**
   * Calculate the number of pages
   */
  O = function() {
    const { current: e } = t(this, d), { itemsCount: i } = t(this, o), r = Math.floor((e.displayed - e.perPage) / e.perPage);
    t(this, o).pageCount = Math.ceil(i / e.perPage) - r;
  }, /**
   * Generates CSS given the config
   */
  j = function() {
    const e = h.querySelector("#" + t(this, o).id + "-styles");
    e && e.remove();
    const { displayed: i, gap: r, padding: a, perPage: l, stop: c, behavior: g } = t(this, d).current, v = l > 1 ? `*:nth-child(${l}n + 1)` : "*", p = `#${t(this, o).id} { --sc-perpage: ${i}; --sc-gap: ${n(this, s, G).call(this, r)}; --sc-padding: ${n(this, s, G).call(this, a)}; --sc-behavior: ${g}; } #${t(this, o).id} [slot="scroller"] > ${v} { scroll-snap-align: start; scroll-snap-stop: ${c ? "always" : "normal"} }`;
    this.styles = n(this, s, B).call(this, p, t(this, o).id + "-styles"), h.head.append(this.styles);
  }, tt = function() {
    const { items: e, scroller: i } = t(this, u);
    new K((l) => {
      let c = l[0];
      t(this, o).isVisible = c.intersectionRatio > 0.1, t(this, o).pause = !t(this, o).isVisible, n(this, s, w).call(this);
    }, {
      threshold: [0.1, 0.9]
    }).observe(this), t(this, d).current.usePause && (this.addEventListener("mouseenter", () => {
      t(this, o).pause = !0, n(this, s, w).call(this);
    }), this.addEventListener("mouseleave", () => {
      t(this, o).pause = !1, n(this, s, w).call(this);
    }));
    const a = new K((l) => {
      l.forEach((c) => {
        c.target.toggleAttribute("visible", c.isIntersecting), c.target.toggleAttribute("inert", !c.isIntersecting);
      });
    }, {
      scroller: i,
      threshold: 0.6
    });
    e.forEach((l) => a.observe(l));
  }, /**
   * On window resize : reinit the carousel
   */
  et = function() {
    N(this.resizeTm), this.resizeTm = I(() => {
      n(this, s, U).call(this), n(this, s, V).call(this);
    }, 100);
  }, /**
   * On scroll, dispatch events, calculate the current slide
   */
  st = function() {
    if (t(this, k)) return;
    n(this, s, it).call(this), this.newIndex = t(this, o).index;
    const e = n(this, s, rt).call(this);
    e != t(this, o).index && (this.newIndex = e, n(this, s, C).call(this, e), n(this, s, $).call(this, "scrollupdate"));
  }, /**
   * Dispatch a custom event
   * @param {String} name
   */
  $ = function(e) {
    const { current: i } = t(this, d);
    this.dispatchEvent(
      new CustomEvent(e, {
        detail: t(this, o)
      })
    ), i["on" + e] && i["on" + e](this);
  }, /**
   * On scroll start
   */
  it = function() {
    t(this, o).isMoving || n(this, s, $).call(this, "scrollstart"), t(this, o).isMoving = !0;
  }, /**
   * On scroll end
   */
  nt = function() {
    t(this, k) || (n(this, s, $).call(this, "scrollend"), M(this, x, !1), t(this, o).isMoving = !1, typeof this.newIndex == "number" ? (n(this, s, C).call(this, this.newIndex), this.newIndex = null) : n(this, s, C).call(this, t(this, o).index), n(this, s, w).call(this));
  }, /**
   * Update the dots/controls state
   * @param {Number} index
   * @param {Boolean} force
   */
  C = function(e) {
    typeof e < "u" && (t(this, o).index = e), n(this, s, ft).call(this), t(this, x) || (n(this, s, dt).call(this), n(this, s, pt).call(this)), n(this, s, ut).call(this);
  }, /**
   * Compute the current slide index
   * @returns {Number} the current slide index
   */
  rt = function(e) {
    const { scroller: i, items: r } = t(this, u), { perPage: a, vertical: l } = t(this, d).current, c = n(this, s, A).call(this);
    let g = 0;
    l ? g = i.scrollTop : g = c ? i.scrollLeft : i.scrollLeft + i.clientWidth;
    let v = r.map((p) => {
      let E = 0;
      return l ? E = p.offsetTop - (t(this, o).computedPadding || 0) - g : E = (c ? p.offsetLeft : p.offsetLeft + p.clientWidth) - (t(this, o).computedPadding || 0) - g, {
        index: parseInt(p.dataset.index, 10),
        distance: Math.abs(E)
      };
    }).reduce((p, E) => !p || E.distance < p.distance ? E : p, null);
    return e ? v : Math.ceil(v.index / a);
  }, /**
   * Create the dots nav (page numbers)
   */
  ot = function() {
    const { pagination: e } = t(this, u);
    let { container: i, dots: r } = e, { current: a } = t(this, d);
    if (i ? (i.innerHTML = null, r.forEach((l) => l.remove()), t(this, u).pagination.dots = []) : (i = n(this, s, L).call(this, "pagination")[0], i.addEventListener("keydown", n(this, s, ct).bind(this)), e.container = i), i.style.display = a.nav && t(this, o).pageCount > 1 ? "" : "none", a.nav && i)
      for (let l = 0; l < t(this, o).pageCount; l++)
        n(this, s, lt).call(this, l);
  }, at = function() {
    const { pager: e } = t(this, u), { current: i } = t(this, d);
    e.current || (["current", "sep", "total"].forEach((r) => {
      e[r] = n(this, s, L).call(this, r)[0];
    }), e.container = this.shadowRoot.querySelector('[part="pager"]')), e.container.style.display = i.pager && t(this, o).pageCount > 1 ? "" : "none", e.current.innerHTML = 1, e.total.innerHTML = t(this, o).pageCount;
  }, /**
   * Creates a button for page N
   * @param {Number} index
   */
  lt = function(e) {
    const { pagination: i } = t(this, u), { container: r, dots: a } = i, l = h.createElement("button");
    l.innerHTML = e + 1, l.addEventListener("click", () => this.goTo(e)), b.assign(l, {
      type: "button",
      part: "button nav-button",
      ariaControls: t(this, u).scroller.id,
      ariaSelected: !1
    }), r.append(l), a.push(l);
  }, /**
   * Handle prev/next arrows on pagination
   * @param {KeyboardEvent} event
   * @returns
   */
  ct = function(e) {
    const i = n(this, s, A).call(this), r = t(this, u).pagination.dots[t(this, o).index] || 0;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowLeft":
        let a = e.key === "ArrowRight" ? i ? "next" : "previous" : i ? "previous" : "next";
        const l = r[`${a}ElementSibling`];
        l && (l.click(), l.focus());
        break;
    }
  }, /**
   * Add prev next buttons event listener
   */
  ht = function() {
    const { controls: e } = t(this, u), { current: i } = t(this, d), r = !i.controls || t(this, o).pageCount < 2;
    e.buttons = [
      ...n(this, s, L).call(this, "prev-buttons"),
      ...n(this, s, L).call(this, "next-buttons")
    ], e.buttons.forEach((a) => {
      a.style = r ? "display: none !important;" : "", !a.hasListener && (a.direction = a.getAttribute("direction") || "next", a.modifier = (a.direction === "next" ? 1 : -1) * (parseInt(a.getAttribute("modifier"), 10) || 1), a.hasListener = !0, a.addEventListener("click", () => {
        i.controls && this.goTo(t(this, o).index + a.modifier);
      }), b.assign(a, {
        ariaControls: t(this, u).scroller.id
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
  L = function(e, i = { fallback: !1 }) {
    const r = this.shadowRoot.querySelector([`[name="${e}"]`]);
    let a = r.assignedElements();
    return i.fallback && !a.length && this.children[0].slot === "" && (this.children[0].slot = "scroller", a = r.assignedElements()), y.from(a.length ? a : r.children);
  }, /**
   * Set active state on the nav dots
   * @param {Number} index
   */
  dt = function() {
    if (!t(this, d).current.nav) return;
    const { pagination: e } = t(this, u);
    let { dots: i, active: r } = e;
    const a = i[t(this, o).index];
    a && (r && (b.assign(r, {
      tabIndex: 0,
      ariaSelected: !1
    }), r.part = "button nav-button"), a.part = "button nav-button active", b.assign(a, {
      tabIndex: -1,
      ariaSelected: !0
    }), e.active = a);
  }, /**
   * Set the current page number in the pager
   */
  pt = function() {
    t(this, d).current.pager && (t(this, u).pager.current.innerHTML = t(this, o).index + 1);
  }, /**
   * Set button disable attribute if needed
   * @returns
   */
  ut = function() {
    const { loop: e } = t(this, d).current, { buttons: i } = t(this, u).controls, { index: r, pageCount: a } = t(this, o);
    let l = !1;
    if (i.forEach((c) => {
      const g = !e && (c.direction === "next" ? r >= a - c.modifier : r < Math.abs(c.modifier));
      c === this.shadowRoot.activeElement && g && (l = !0), c.disabled = g ? "disabled" : "";
    }), l) {
      const c = i.filter((g) => !g.disabled);
      c.length && c[0].focus();
    }
  }, /**
   * Synchronize every other carousel with the current index
   */
  ft = function() {
    const { sync: e } = t(this, d).current;
    e && t(this, o).ready && (t(this, u).sync = t(this, u).sync || h.querySelectorAll(e) || [], t(this, u).sync.forEach((i) => {
      i instanceof S && i.goTo(t(this, o).index);
    }));
  }, /**
   * Create a style element
   *
   * @param {string} css
   * @param {string} id
   * @returns HTMLStyleElement
   */
  B = function(e, i) {
    const r = h.createElement("style");
    return r.id = i, r.append(h.createTextNode(e)), r;
  }, /**
   * Is the current document LTR
   * @returns {boolean}
   */
  A = function() {
    return h.firstElementChild.getAttribute("dir") !== "rtl";
  }, /**
   * Add 'px' to a value if it's not a string
   * @param {mixed} value
   * @returns string
   */
  G = function(e) {
    return typeof e == "string" ? e : e + "px";
  }, /**
   * Activate/deactivate the automatic goTo
   */
  w = function() {
    if (!t(this, d).current.autoplay) return;
    const { pause: e, isVisible: i } = t(this, o);
    !e && i ? t(this, o).autoplayInterval || (t(this, o).autoplayInterval = I(() => {
      t(this, o).autoplayInterval = null, this.goTo(t(this, o).index + 1);
    }, t(this, d).current.autoplay)) : (N(t(this, o).autoplayInterval), t(this, o).autoplayInterval = null);
  };
  let R = S;
  f.customElements && customElements.define("snap-carousel", R);
})(window, document, Array, Object, Element, IntersectionObserver, clearTimeout, setTimeout, requestIdleCallback);
