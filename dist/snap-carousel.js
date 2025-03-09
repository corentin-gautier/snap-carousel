var J = (f) => {
  throw TypeError(f);
};
var A = (f, n, t) => n.has(f) || J("Cannot " + t);
var e = (f, n, t) => (A(f, n, "read from private field"), t ? t.call(f) : n.get(f)), b = (f, n, t) => n.has(f) ? J("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(f) : n.set(f, t), T = (f, n, t, i) => (A(f, n, "write to private field"), i ? i.call(f, t) : n.set(f, t), t), r = (f, n, t) => (A(f, n, "access private method"), t);
if (typeof window < "u" && !("onscrollend" in window)) {
  let i = function(u, d, v) {
    let l = u[d];
    u[d] = function() {
      let o = Array.prototype.slice.apply(arguments, [0]);
      l.apply(this, o), o.unshift(l), v.apply(this, o);
    };
  }, c = function(u, d, v, l) {
    if (d != "scroll" && d != "scrollend") return;
    let o = this, h = t.get(o);
    if (h === void 0) {
      let g = 0;
      h = { scrollListener: (x) => {
        clearTimeout(g), g = setTimeout(() => {
          n.size ? setTimeout(h.scrollListener, 100) : (o && o.dispatchEvent(f), g = 0);
        }, 100);
      }, listeners: 0 }, u.apply(o, ["scroll", h.scrollListener]), t.set(o, h);
    }
    h.listeners++;
  }, p = function(u, d, v) {
    if (d != "scroll" && d != "scrollend") return;
    let l = this, o = t.get(l);
    o !== void 0 && (--o.listeners > 0 || (u.apply(l, ["scroll", o.scrollListener]), t.delete(l)));
  };
  const f = new Event("scrollend"), n = /* @__PURE__ */ new Set();
  document.addEventListener("touchstart", (u) => {
    for (let d of u.changedTouches) n.add(d.identifier);
  }, { passive: !0 }), document.addEventListener("touchend", (u) => {
    for (let d of u.changedTouches) n.delete(d.identifier);
  }, { passive: !0 }), document.addEventListener("touchcancel", (u) => {
    for (let d of u.changedTouches) n.delete(d.identifier);
  }, { passive: !0 });
  let t = /* @__PURE__ */ new WeakMap();
  i(Element.prototype, "addEventListener", c), i(window, "addEventListener", c), i(document, "addEventListener", c), i(Element.prototype, "removeEventListener", p), i(window, "removeEventListener", p), i(document, "removeEventListener", p);
}
const pt = ':host{display:block;position:relative;width:100%}:host(:not([scrollbar])) ::slotted([slot="scroller"]){scrollbar-width:none}:host(:not([scrollbar])) ::slotted([slot="scroller"])::-webkit-scrollbar{display:none}::slotted([slot="scroller"]){position:relative;margin:0;display:flex;gap:var(--gap);scroll-behavior:var(--behavior)}:host(:not([vertical])) ::slotted([slot="scroller"]){overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;scroll-padding-inline:var(--padding);padding-inline:var(--padding)!important}:host([vertical]) ::slotted([slot="scroller"]){flex-direction:column;overflow-y:auto;scroll-snap-type:y mandatory;overscroll-behavior-y:contain;padding-block:var(--padding)!important;scroll-padding-block:var(--padding)}', ft = "snap-carousel:not([scrollbar]) [slot=scroller]::-webkit-scrollbar{display:none}snap-carousel [slot=scroller]{display:flex}snap-carousel[vertical]{display:flex;flex-direction:column}snap-carousel[vertical] [slot=scroller]{flex-direction:column;height:100%}snap-carousel [slot=scroller]>*{display:block;flex:0 0 auto}snap-carousel:not([vertical]) [slot=scroller]>*{width:calc((100% / var(--perpage, 1)) - var(--gap, 0) + (var(--gap, 0) / var(--perpage, 1)));max-width:100%}snap-carousel[vertical] [slot=scroller]>*{max-height:100%;height:calc((100% / var(--perpage, 1)) - var(--gap, 0) + (var(--gap, 0) / var(--perpage, 1)))}", gt = `<slot name="scroller">
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
`, vt = (f) => {
  var n, t, K, O, p;
  return p = class extends f {
    constructor() {
      super();
      b(this, t);
      // Feature-specific elements
      b(this, n, {
        buttons: []
      });
      this.elements.controls = e(this, n), this.registerHook("init", r(this, t, K).bind(this)), this.registerHook("updateState", r(this, t, O).bind(this));
    }
  }, n = new WeakMap(), t = new WeakSet(), /**
   * Create navigation controls
   */
  K = function() {
    const { current: d } = this.settings, v = !d.controls || this.state.pageCount < 2, l = this.getSlotElements("prev-buttons"), o = this.getSlotElements("next-buttons");
    !l.length && !o.length || (e(this, n).buttons = [...l, ...o], e(this, n).buttons.forEach((h) => {
      h.style = v ? "display: none !important;" : "", !h.hasListener && (h.direction = h.getAttribute("direction") || "next", h.modifier = (h.direction === "next" ? 1 : -1) * (parseInt(h.getAttribute("modifier"), 10) || 1), h.hasListener = !0, h.addEventListener("click", () => {
        d.controls && this.goTo(this.state.index + h.modifier);
      }), Object.assign(h, {
        ariaControls: this.elements.scroller.id
      }));
    }), r(this, t, O).call(this));
  }, /**
   * Update navigation button states
   */
  O = function() {
    if (!e(this, n).buttons.length) return;
    const { loop: d } = this.settings.current, { buttons: v } = e(this, n), { index: l, pageCount: o } = this.state;
    let h = !1;
    if (v.forEach((g) => {
      const x = !d && (g.direction === "next" ? l >= o - g.modifier : l < Math.abs(g.modifier));
      g === this.shadowRoot.activeElement && x && (h = !0), g.disabled = x, g.setAttribute("aria-disabled", x);
    }), h) {
      const g = v.filter((x) => !x.disabled);
      g.length && g[0].focus();
    }
  }, p;
}, mt = (f) => {
  var n, t, Z, Q, H, X, d;
  return d = class extends f {
    constructor() {
      super();
      b(this, t);
      // Feature-specific elements
      b(this, n, {
        container: null,
        dots: [],
        active: null
      });
      this.elements.pagination = e(this, n), this.registerHook("init", r(this, t, Z).bind(this)), this.registerHook("updateState", r(this, t, H).bind(this));
    }
  }, n = new WeakMap(), t = new WeakSet(), /**
   * Create pagination dots
   */
  Z = function() {
    let { container: l, dots: o } = e(this, n);
    const { current: h } = this.settings;
    if (l)
      l.innerHTML = "", o.forEach((g) => g.remove()), e(this, n).dots = [];
    else {
      if (l = this.getSlotElements("pagination")[0], !l) return;
      l.addEventListener("keydown", r(this, t, X).bind(this)), e(this, n).container = l;
    }
    if (l.style.display = h.nav && this.state.pageCount > 1 ? "" : "none", h.nav && l && this.state.pageCount > 1) {
      for (let g = 0; g < this.state.pageCount; g++)
        r(this, t, Q).call(this, g);
      e(this, n).dots.length && r(this, t, H).call(this);
    }
  }, /**
   * Create a pagination marker (dot)
   * @param {number} index - Page index for the marker
   */
  Q = function(l) {
    const { container: o, dots: h } = e(this, n);
    if (!o) return;
    const g = document.createElement("button");
    g.innerHTML = l + 1, g.addEventListener("click", () => this.goTo(l)), Object.assign(g, {
      type: "button",
      part: "button nav-button",
      ariaControls: this.elements.scroller.id,
      ariaSelected: !1
    }), o.append(g), h.push(g);
  }, /**
   * Update active pagination dot
   */
  H = function() {
    if (!this.settings.current.nav || !e(this, n).dots.length) return;
    let { dots: l, active: o } = e(this, n);
    const h = l[this.state.index];
    h && (o && (Object.assign(o, {
      tabIndex: 0,
      ariaSelected: !1
    }), o.part = "button nav-button"), h.part = "button nav-button active", Object.assign(h, {
      tabIndex: -1,
      ariaSelected: !0
    }), e(this, n).active = h);
  }, /**
   * Handle keyboard navigation in pagination
   * @param {KeyboardEvent} event - Keyboard event
   */
  X = function(l) {
    if (!e(this, n).dots.length) return;
    const o = this.isDocumentLtr(), h = e(this, n).dots[this.state.index] || 0;
    switch (l.key) {
      case "ArrowRight":
      case "ArrowLeft":
        const g = l.key === "ArrowRight" ? o ? "next" : "previous" : o ? "previous" : "next", x = h[`${g}ElementSibling`];
        x && (x.click(), x.focus());
        break;
    }
  }, d;
}, bt = (f) => {
  var n, t, Y, _, p;
  return p = class extends f {
    constructor() {
      super();
      b(this, t);
      // Feature-specific elements
      b(this, n, {
        container: null,
        current: null,
        sep: null,
        total: null
      });
      this.elements.pager = e(this, n), this.registerHook("init", r(this, t, Y).bind(this)), this.registerHook("updateState", r(this, t, _).bind(this));
    }
  }, n = new WeakMap(), t = new WeakSet(), /**
   * Create page number display
   */
  Y = function() {
    const { current: d } = this.settings;
    if (!e(this, n).container) {
      if (e(this, n).container = this.shadowRoot.querySelector('[part="pager"]'), !e(this, n).container) return;
      ["current", "sep", "total"].forEach((v) => {
        const l = this.getSlotElements(v)[0];
        l && (e(this, n)[v] = l);
      });
    }
    !e(this, n).current || !e(this, n).total || (e(this, n).container.style.display = d.pager && this.state.pageCount > 1 ? "" : "none", e(this, n).current.innerHTML = 1, e(this, n).total.innerHTML = this.state.pageCount);
  }, /**
   * Update current page number display
   */
  _ = function() {
    !this.settings.current.pager || !e(this, n).current || (e(this, n).current.innerHTML = this.state.index + 1);
  }, p;
};
var E, C, S, a, y, m, w, s, N, tt, j, R, z, et, st, D, it, W, q, nt, rt, F, ot, at, lt, ct, ht, P, L, dt, ut, I, U, M, V, k;
const G = class G extends HTMLElement {
  /**
   * Constructor: Initialize default settings
   */
  constructor() {
    super();
    b(this, s);
    // Private fields
    b(this, E, !1);
    b(this, C, !1);
    b(this, S, "snp-c");
    // State management
    b(this, a, {
      index: 0,
      itemsCount: 0,
      pageCount: 0,
      isVisible: !1,
      autoplayInterval: null,
      breakpoint: void 0,
      ready: !1,
      isMoving: !1,
      pause: !1,
      computedPadding: 0
    });
    // DOM Elements
    b(this, y, {
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
      items: null,
      sync: null
    });
    // Configuration
    b(this, m, {
      default: {},
      origin: {},
      current: {}
    });
    // Feature lifecycle hooks
    b(this, w, {
      init: [],
      updateState: []
    });
    e(this, m).default = B.defaultConfig;
  }
  // Public getters for feature access
  get elements() {
    return e(this, y);
  }
  get settings() {
    return e(this, m);
  }
  get state() {
    return e(this, a);
  }
  get preventUiUpdate() {
    return e(this, E);
  }
  // Protected methods for features
  getSlotElements(t, i = { fallback: !1 }) {
    return r(this, s, I).call(this, t, i);
  }
  isDocumentLtr() {
    return r(this, s, M).call(this);
  }
  // Register feature hooks
  registerHook(t, i) {
    e(this, w)[t] && e(this, w)[t].push(i);
  }
  /**
   * Default configuration options
   */
  static get defaultConfig() {
    return {
      autoplay: 0,
      // Autoplay interval in ms (0 = disabled)
      displayed: 1,
      // Number of items visible at once
      perPage: 1,
      // Number of items to scroll per page
      gap: 0,
      // Gap between items
      padding: 0,
      // Padding around the carousel
      controls: !1,
      // Show prev/next buttons
      nav: !1,
      // Show navigation dots
      pager: !1,
      // Show page numbers
      loop: !1,
      // Loop around when reaching the end
      behavior: "smooth",
      // Scroll behavior
      stop: !1,
      // Stop at each item
      usePause: !0,
      // Pause autoplay on hover
      vertical: !1,
      // Vertical orientation
      responsive: []
      // Breakpoint configurations
    };
  }
  /**
   * Observed attributes for the web component
   * Includes all config options and their data- prefixed versions
   */
  static get observedAttributes() {
    const t = Object.keys(B.defaultConfig).map((i) => i.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase()));
    return [...t, ...t.map((i) => "data-" + i)];
  }
  /**
   * Connected callback: Setup the carousel when added to DOM
   */
  connectedCallback() {
    if (!this.isConnected) return;
    const t = document.createElement("template");
    t.innerHTML = `<style>${pt}</style>${gt}`, this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(t.content.cloneNode(!0));
    const i = r(this, s, I).call(this, "scroller", { fallback: !0 })[0];
    new MutationObserver((p) => {
      p.forEach((u) => {
        (u.addedNodes.length || u.removedNodes.length) && (r(this, s, z).call(this), r(this, s, R).call(this));
      });
    }).observe(i, { childList: !0 }), r(this, s, tt).call(this);
  }
  /**
   * Attribute changed callback: Update settings when attributes change
   */
  attributeChangedCallback() {
    e(this, a).ready && r(this, s, j).call(this);
  }
  // -----------------------------------------------------------------------------
  // Public API
  // -----------------------------------------------------------------------------
  /**
   * Navigate to a specific page
   * @param {number} page - Page index to navigate to
   */
  goTo(t) {
    T(this, E, !1);
    const { scroller: i, items: c } = e(this, y), { perPage: p, vertical: u } = e(this, m).current, d = t > e(this, a).pageCount - 1 ? 0 : t < 0 ? e(this, a).pageCount - 1 : t, v = c[d * p];
    r(this, s, L).call(this, d), e(this, a).ready = !0;
    let l = 0, o = 0;
    u ? l = v.offsetTop : o = r(this, s, M).call(this) ? v.offsetLeft : v.offsetLeft + v.offsetWidth - i.offsetWidth, T(this, E, !0), requestIdleCallback(() => {
      i.scrollTo({ top: l, left: o });
    }, { timeout: 100 });
  }
  /**
   * Navigate to previous page
   */
  prev() {
    this.goTo(this.state.index - 1);
  }
  /**
   * Navigate to next page
   */
  next() {
    this.goTo(this.state.index + 1);
  }
};
E = new WeakMap(), C = new WeakMap(), S = new WeakMap(), a = new WeakMap(), y = new WeakMap(), m = new WeakMap(), w = new WeakMap(), s = new WeakSet(), // Execute feature hooks
N = function(t, ...i) {
  e(this, w)[t] && e(this, w)[t].forEach((c) => c.apply(this, i));
}, // -----------------------------------------------------------------------------
// Private Methods: Setup & Initialization
// -----------------------------------------------------------------------------
/**
 * Initial carousel preparation
 */
tt = function() {
  const t = r(this, s, I).call(this, "scroller", !0)[0];
  t && (t.onscroll = r(this, s, lt).bind(this), t.addEventListener("scrollend", r(this, s, ht).bind(this)), window.addEventListener("resize", r(this, s, at).bind(this)), e(this, y).scroller = t, this.ariaRoleDescription = "carousel", Object.assign(t, {
    role: "group",
    ariaLive: "polite",
    ariaAtomic: !1
  }), r(this, s, z).call(this), r(this, s, et).call(this), r(this, s, st).call(this), r(this, s, j).call(this), r(this, s, ot).call(this), e(this, a).ready = !0);
}, /**
 * Setup carousel configuration
 */
j = function() {
  e(this, a).breakpoint = void 0, e(this, m).origin = Object.assign(
    {},
    e(this, m).default,
    r(this, s, it).call(this)
  ), e(this, m).origin.responsive = (e(this, m).origin.responsive || []).sort((t, i) => t.breakpoint - i.breakpoint), r(this, s, q).call(this);
}, /**
 * Initialize carousel after setup
 */
R = function() {
  r(this, s, D).call(this, () => {
    r(this, s, nt).call(this), r(this, s, rt).call(this), r(this, s, F).call(this), r(this, s, L).call(this, 0), r(this, s, N).call(this, "init");
  });
}, z = function() {
  const t = Array.from(e(this, y).scroller.children).filter((c) => !["absolute", "fixed"].includes(getComputedStyle(c).position)), i = t.length;
  e(this, y).items = t, e(this, a).itemsCount = i, t.forEach((c, p) => {
    c.dataset.index = p, Object.assign(c, {
      ariaSetSize: i,
      ariaPosInSet: p + 1,
      ariaRoleDescription: "slide",
      role: "listitem"
    });
  });
}, /**
 * Add carousel base styles in the document head
 * @returns
 */
et = function() {
  const i = `${e(this, S)}-global-styles`;
  if (document.querySelector("#" + i))
    return;
  const c = ft;
  document.head.append(r(this, s, U).call(this, c, i));
}, /**
 * Adds unique ids and classes
 */
st = function() {
  this.id = e(this, a).id = e(this, S) + "-" + (Math.random() + 1).toString(36).substring(4);
}, /**
 * Wait for the scroller element to have a width before initializing
 * Uses requestAnimationFrame for efficient polling
 * @param {Function} callback - Function to call once width is available
 */
D = function(t) {
  e(this, y).scroller.clientWidth ? t() : requestAnimationFrame(() => {
    r(this, s, D).call(this, t);
  });
}, /**
 * Get configuration from element attributes
 * Supports both regular and data- prefixed attributes
 * @returns {Object} Configuration object from attributes
 */
it = function() {
  const t = Object.keys(e(this, m).default);
  return this.attributes.options ? r(this, s, W).call(this, this.attributes.options.value) : Array.from(this.attributes).reduce((i, c) => {
    const p = c.name.replace("data-", "").replace(/-([a-z])/g, (u) => u[1].toUpperCase());
    return t.includes(p) && (i[p] = r(this, s, W).call(this, c.value)), i;
  }, {});
}, /**
 * Safely parse a string value into a JavaScript value
 * @param {string} value - The string to parse
 * @returns {any} Parsed value or original string if parsing fails
 */
W = function(t) {
  if (t === "") return !0;
  try {
    return JSON.parse(t);
  } catch {
    return t;
  }
}, /**
 * Get configuration for current breakpoint
 * Merges default config with responsive breakpoint settings
 */
q = function() {
  const { origin: t } = e(this, m), i = t.responsive.reduce(
    (p, u) => u.breakpoint < window.innerWidth ? u : p,
    { breakpoint: null }
  ), c = Object.assign({}, t, i.settings || {});
  c.perPage = Math.min(c.displayed, c.perPage), e(this, m).current = c, e(this, a).breakpoint !== i.breakpoint && (e(this, a).breakpoint = i.breakpoint, r(this, s, R).call(this));
}, /**
 * Calculate and store the number of pages
 * Accounts for displayed items and items per page
 */
nt = function() {
  const { current: t } = e(this, m), { itemsCount: i } = e(this, a), c = Math.floor(
    (t.displayed - t.perPage) / t.perPage
  );
  e(this, a).pageCount = Math.ceil(i / t.perPage) - c;
}, /**
 * Create and apply carousel styles
 * Generates CSS variables and scroll-snap rules
 */
rt = function() {
  const t = document.querySelector("#" + e(this, a).id + "-styles");
  t && t.remove();
  const { displayed: i, gap: c, padding: p, perPage: u, stop: d, behavior: v } = e(this, m).current, l = u > 1 ? `*:nth-child(${u}n + 1)` : "*", o = `
      #${e(this, a).id} {
        --perpage: ${i};
        --gap: ${r(this, s, V).call(this, c)};
        --padding: ${r(this, s, V).call(this, p)};
        --behavior: ${v};
      }
      #${e(this, a).id} [slot="scroller"] > ${l} {
        scroll-snap-align: start;
        scroll-snap-stop: ${d ? "always" : "normal"}
      }
    `;
  this.styles = r(this, s, U).call(this, o, e(this, a).id + "-styles"), document.head.append(this.styles);
}, /**
 * Calculate and store the computed padding
 * Used for scroll position calculations
 */
F = function() {
  const { vertical: t } = e(this, m).current, i = t ? "padding-top" : "padding-left";
  e(this, a).computedPadding = parseInt(
    getComputedStyle(e(this, y).scroller)[i],
    10
  );
}, // -----------------------------------------------------------------------------
// Private Methods: Event Handling & Observation
// -----------------------------------------------------------------------------
/**
 * Setup intersection and mutation observers
 * Handles visibility changes and content updates
 */
ot = function() {
  const { items: t, scroller: i } = e(this, y);
  new IntersectionObserver((u) => {
    const d = u[0];
    e(this, a).isVisible = d.intersectionRatio > 0.1, e(this, a).pause = !e(this, a).isVisible, r(this, s, k).call(this);
  }, {
    threshold: [0.1, 0.9]
  }).observe(this), e(this, m).current.usePause && (this.addEventListener("mouseenter", () => {
    e(this, a).pause = !0, r(this, s, k).call(this);
  }), this.addEventListener("mouseleave", () => {
    e(this, a).pause = !1, r(this, s, k).call(this);
  }));
  const p = new IntersectionObserver((u) => {
    u.forEach((d) => {
      d.target.toggleAttribute("visible", d.isIntersecting), d.target.toggleAttribute("inert", !d.isIntersecting);
    });
  }, {
    scroller: i,
    threshold: 0.6
  });
  t.forEach((u) => p.observe(u));
}, /**
 * Handle window resize events
 * Debounces updates to prevent excessive recalculation
 */
at = function() {
  clearTimeout(this.resizeTm), this.resizeTm = setTimeout(() => {
    r(this, s, F).call(this), r(this, s, q).call(this);
  }, 100);
}, /**
 * Handle scroll events
 * Updates state and triggers events during scrolling
 */
lt = function() {
  if (e(this, C)) return;
  r(this, s, ct).call(this), this.newIndex = e(this, a).index;
  const t = r(this, s, dt).call(this);
  t !== e(this, a).index && (this.newIndex = t, r(this, s, L).call(this, t), r(this, s, P).call(this, "scrollupdate"));
}, /**
 * Handle scroll start
 * Triggers scrollstart event when scrolling begins
 */
ct = function() {
  e(this, a).isMoving || r(this, s, P).call(this, "scrollstart"), e(this, a).isMoving = !0;
}, /**
 * Handle scroll end
 * Updates state and triggers events when scrolling ends
 */
ht = function() {
  e(this, C) || (r(this, s, P).call(this, "scrollend"), T(this, E, !1), e(this, a).isMoving = !1, typeof this.newIndex == "number" ? (r(this, s, L).call(this, this.newIndex), this.newIndex = null) : r(this, s, L).call(this, e(this, a).index), r(this, s, k).call(this));
}, /**
 * Dispatch a custom event
 * @param {string} name - Event name to trigger
 */
P = function(t) {
  const { current: i } = e(this, m);
  this.dispatchEvent(
    new CustomEvent(t, {
      detail: e(this, a)
    })
  ), i["on" + t] && i["on" + t](this);
}, /**
 * Update the dots/controls state
 * @param {Number} index
 */
L = function(t) {
  typeof t < "u" && (e(this, a).index = t), r(this, s, ut).call(this), e(this, E) || r(this, s, N).call(this, "updateState", t);
}, /**
 * Compute the current slide index
 * @returns {Number} the current slide index
 */
dt = function(t) {
  const { scroller: i, items: c } = e(this, y), { perPage: p, vertical: u } = e(this, m).current, d = r(this, s, M).call(this);
  let v = 0;
  u ? v = i.scrollTop : v = d ? i.scrollLeft : i.scrollLeft + i.clientWidth;
  let l = c.map((o) => {
    let h = 0;
    return u ? h = o.offsetTop - (e(this, a).computedPadding || 0) - v : h = (d ? o.offsetLeft : o.offsetLeft + o.clientWidth) - (e(this, a).computedPadding || 0) - v, {
      index: parseInt(o.dataset.index, 10),
      distance: Math.abs(h)
    };
  }).reduce((o, h) => !o || h.distance < o.distance ? h : o, null);
  return t ? l : Math.ceil(l.index / p);
}, /**
 * Synchronize other carousels with current index
 */
ut = function() {
  const { sync: t } = e(this, m).current;
  t && e(this, a).ready && (e(this, y).sync = e(this, y).sync || document.querySelectorAll(t) || [], e(this, y).sync.forEach((i) => {
    i instanceof G && i.goTo(e(this, a).index);
  }));
}, /**
 * Retrieve elements assigned to a slot or default elements
 * @param {string} slotName - Name of the slot to query
 * @param {Object} options - Options object
 * @param {boolean} [options.fallback=false] - Whether to fallback to first child if slot is empty
 * @returns {Array<HTMLElement>} Array of elements
 */
I = function(t, i = { fallback: !1 }) {
  const c = this.shadowRoot.querySelector(`[name="${t}"]`);
  let p = c.assignedElements();
  return i.fallback && !p.length && this.children[0].slot === "" && (this.children[0].slot = "scroller", p = c.assignedElements()), Array.from(p.length ? p : c.children);
}, /**
 * Create a style element with given CSS
 * @param {string} css - CSS content
 * @param {string} id - ID for the style element
 * @returns {HTMLStyleElement} Created style element
 */
U = function(t, i) {
  const c = document.createElement("style");
  return c.id = i, c.append(document.createTextNode(t)), c;
}, /**
 * Check if document is in LTR mode
 * @returns {boolean} True if document is LTR
 */
M = function() {
  return document.firstElementChild.getAttribute("dir") !== "rtl";
}, /**
 * Format a CSS value, adding 'px' if needed
 * @param {string|number} value - Value to format
 * @returns {string} Formatted CSS value
 */
V = function(t) {
  return typeof t == "string" ? t : t + "px";
}, /**
 * Activate/deactivate the automatic goTo
 */
k = function() {
  if (!e(this, m).current.autoplay) return;
  const { pause: t, isVisible: i } = e(this, a);
  !t && i ? e(this, a).autoplayInterval || (e(this, a).autoplayInterval = setTimeout(() => {
    e(this, a).autoplayInterval = null, this.goTo(e(this, a).index + 1);
  }, e(this, m).current.autoplay)) : (clearTimeout(e(this, a).autoplayInterval), e(this, a).autoplayInterval = null);
};
let $ = G;
function yt(...f) {
  return f.reduce((n, t) => t(n), $);
}
const B = yt(
  mt,
  bt,
  vt
);
window.customElements && customElements.define("snap-carousel", B);
export {
    $ as BaseCarousel,
    yt as createCarousel,
    B as default
};

