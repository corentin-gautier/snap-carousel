var D = (g) => {
  throw TypeError(g);
};
var M = (g, u, t) => u.has(g) || D("Cannot " + t);
var e = (g, u, t) => (M(g, u, "read from private field"), t ? t.call(g) : u.get(g)), b = (g, u, t) => u.has(g) ? D("Cannot add the same private member more than once") : u instanceof WeakSet ? u.add(g) : u.set(g, t), T = (g, u, t, i) => (M(g, u, "write to private field"), i ? i.call(g, t) : u.set(g, t), t), n = (g, u, t) => (M(g, u, "access private method"), t);
if (typeof window < "u" && !("onscrollend" in window)) {
  let i = function(l, c, f) {
    let v = l[c];
    l[c] = function() {
      let d = Array.prototype.slice.apply(arguments, [0]);
      v.apply(this, d), d.unshift(v), f.apply(this, d);
    };
  }, r = function(l, c, f, v) {
    if (c != "scroll" && c != "scrollend") return;
    let d = this, m = t.get(d);
    if (m === void 0) {
      let I = 0;
      m = { scrollListener: (pt) => {
        clearTimeout(I), I = setTimeout(() => {
          u.size ? setTimeout(m.scrollListener, 100) : (d && d.dispatchEvent(g), I = 0);
        }, 100);
      }, listeners: 0 }, l.apply(d, ["scroll", m.scrollListener]), t.set(d, m);
    }
    m.listeners++;
  }, a = function(l, c, f) {
    if (c != "scroll" && c != "scrollend") return;
    let v = this, d = t.get(v);
    d !== void 0 && (--d.listeners > 0 || (l.apply(v, ["scroll", d.scrollListener]), t.delete(v)));
  };
  var ft = i, gt = r, vt = a;
  const g = new Event("scrollend"), u = /* @__PURE__ */ new Set();
  document.addEventListener("touchstart", (l) => {
    for (let c of l.changedTouches) u.add(c.identifier);
  }, { passive: !0 }), document.addEventListener("touchend", (l) => {
    for (let c of l.changedTouches) u.delete(c.identifier);
  }, { passive: !0 }), document.addEventListener("touchcancel", (l) => {
    for (let c of l.changedTouches) u.delete(c.identifier);
  }, { passive: !0 });
  let t = /* @__PURE__ */ new WeakMap();
  i(Element.prototype, "addEventListener", r), i(window, "addEventListener", r), i(document, "addEventListener", r), i(Element.prototype, "removeEventListener", a), i(window, "removeEventListener", a), i(document, "removeEventListener", a);
}
const ct = ':host{display:block;position:relative;width:100%}:host(:not([scrollbar])) ::slotted([slot="scroller"]){scrollbar-width:none}:host(:not([scrollbar])) ::slotted([slot="scroller"])::-webkit-scrollbar{display:none}::slotted([slot="scroller"]){position:relative;margin:0;display:flex;gap:var(--sc-gap);scroll-behavior:var(--sc-behavior)}:host(:not([vertical])) ::slotted([slot="scroller"]){overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;scroll-padding-inline:var(--sc-padding);padding-inline:var(--sc-padding)!important}:host([vertical]) ::slotted([slot="scroller"]){flex-direction:column;overflow-y:auto;scroll-snap-type:y mandatory;overscroll-behavior-y:contain;padding-block:var(--sc-padding)!important;scroll-padding-block:var(--sc-padding)}', dt = "snap-carousel:not([scrollbar]) [slot=scroller]::-webkit-scrollbar{display:none}snap-carousel [slot=scroller]{display:flex}snap-carousel[vertical]{display:flex;flex-direction:column}snap-carousel[vertical] [slot=scroller]{flex-direction:column;height:100%}snap-carousel [slot=scroller]>*{display:block;flex:0 0 auto}snap-carousel:not([vertical]) [slot=scroller]>*{width:calc((100% / var(--sc-perpage, 1)) - var(--sc-gap, 0) + (var(--sc-gap, 0) / var(--sc-perpage, 1)));max-width:100%}snap-carousel[vertical] [slot=scroller]>*{max-height:100%;height:calc((100% / var(--sc-perpage, 1)) - var(--sc-gap, 0) + (var(--sc-gap, 0) / var(--sc-perpage, 1)))}", ht = `<slot name="scroller">
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
var x, C, k, o, p, h, s, V, O, $, j, F, U, N, B, R, z, G, J, W, K, Z, Q, X, Y, _, P, w, tt, et, st, it, nt, rt, ot, at, lt, y, q, S, H, E;
const L = class L extends HTMLElement {
  /**
   * Constructor: Initialize default settings
   */
  constructor() {
    super();
    b(this, s);
    // Private fields
    b(this, x, !1);
    b(this, C, !1);
    b(this, k, "snp-c");
    // State management
    b(this, o, {
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
    b(this, p, {
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
    b(this, h, {
      default: {},
      origin: {},
      current: {}
    });
    e(this, h).default = L.defaultConfig;
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
    const t = Object.keys(L.defaultConfig).map((i) => i.replace(/[A-Z]/g, (r) => "-" + r.toLowerCase()));
    return [...t, ...t.map((i) => "data-" + i)];
  }
  /**
   * Connected callback: Setup the carousel when added to DOM
   */
  connectedCallback() {
    if (!this.isConnected) return;
    const t = document.createElement("template");
    t.innerHTML = `<style>${ct}</style>${ht}`, this.attachShadow({ mode: "open" }), this.shadowRoot.appendChild(t.content.cloneNode(!0));
    const i = n(this, s, y).call(this, "scroller", { fallback: !0 })[0];
    new MutationObserver((a) => {
      a.forEach((l) => {
        (l.addedNodes.length || l.removedNodes.length) && (n(this, s, j).call(this), n(this, s, $).call(this));
      });
    }).observe(i, { childList: !0 }), n(this, s, V).call(this);
  }
  /**
   * Attribute changed callback: Update settings when attributes change
   */
  attributeChangedCallback() {
    e(this, o).ready && n(this, s, O).call(this);
  }
  // -----------------------------------------------------------------------------
  // Public API
  // -----------------------------------------------------------------------------
  /**
   * Navigate to a specific page
   * @param {number} page - Page index to navigate to
   */
  goTo(t) {
    T(this, x, !1);
    const { scroller: i, items: r } = e(this, p), { perPage: a, vertical: l } = e(this, h).current, c = t > e(this, o).pageCount - 1 ? 0 : t < 0 ? e(this, o).pageCount - 1 : t, f = r[c * a];
    n(this, s, w).call(this, c), e(this, o).ready = !0;
    let v = 0, d = 0;
    l ? v = f.offsetTop : d = n(this, s, S).call(this) ? f.offsetLeft : f.offsetLeft + f.offsetWidth - i.offsetWidth, T(this, x, !0), requestIdleCallback(() => {
      i.scrollTo({ top: v, left: d });
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
x = new WeakMap(), C = new WeakMap(), k = new WeakMap(), o = new WeakMap(), p = new WeakMap(), h = new WeakMap(), s = new WeakSet(), // -----------------------------------------------------------------------------
// Private Methods: Setup & Initialization
// -----------------------------------------------------------------------------
/**
 * Initial carousel preparation
 */
V = function() {
  const t = n(this, s, y).call(this, "scroller", !0)[0];
  t && (t.onscroll = n(this, s, Q).bind(this), t.addEventListener("scrollend", n(this, s, Y).bind(this)), window.addEventListener("resize", n(this, s, Z).bind(this)), e(this, p).scroller = t, this.elements = e(this, p), this.settings = e(this, h), this.state = e(this, o), this.ariaRoleDescription = "carousel", Object.assign(t, {
    role: "group",
    ariaLive: "polite",
    ariaAtomic: !1
  }), n(this, s, j).call(this), n(this, s, F).call(this), n(this, s, U).call(this), n(this, s, O).call(this), n(this, s, K).call(this), e(this, o).ready = !0);
}, /**
 * Setup carousel configuration
 */
O = function() {
  e(this, o).breakpoint = void 0, e(this, h).origin = Object.assign(
    {},
    e(this, h).default,
    n(this, s, B).call(this)
  ), e(this, h).origin.responsive = (e(this, h).origin.responsive || []).sort((t, i) => t.breakpoint - i.breakpoint), n(this, s, z).call(this);
}, /**
 * Initialize carousel after setup
 */
$ = function() {
  n(this, s, N).call(this, () => {
    n(this, s, G).call(this), n(this, s, J).call(this), n(this, s, et).call(this), n(this, s, st).call(this), n(this, s, it).call(this), n(this, s, W).call(this), n(this, s, w).call(this, 0);
  });
}, j = function() {
  const t = Array.from(e(this, p).scroller.children).filter((r) => !["absolute", "fixed"].includes(getComputedStyle(r).position)), i = t.length;
  e(this, p).items = t, e(this, o).itemsCount = i, t.forEach((r, a) => {
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
F = function() {
  const i = `${e(this, k)}-global-styles`;
  if (document.querySelector("#" + i))
    return;
  const r = dt;
  document.head.append(n(this, s, q).call(this, r, i));
}, /**
 * Adds unique ids and classes
 */
U = function() {
  this.id = e(this, o).id = e(this, k) + "-" + (Math.random() + 1).toString(36).substring(4);
}, /**
 * Wait for the scroller element to have a width before initializing
 * Uses requestAnimationFrame for efficient polling
 * @param {Function} callback - Function to call once width is available
 */
N = function(t) {
  e(this, p).scroller.clientWidth ? t() : requestAnimationFrame(() => {
    n(this, s, N).call(this, t);
  });
}, /**
 * Get configuration from element attributes
 * Supports both regular and data- prefixed attributes
 * @returns {Object} Configuration object from attributes
 */
B = function() {
  const t = Object.keys(e(this, h).default);
  return this.attributes.options ? n(this, s, R).call(this, this.attributes.options.value) : Array.from(this.attributes).reduce((i, r) => {
    const a = r.name.replace("data-", "").replace(/-([a-z])/g, (l) => l[1].toUpperCase());
    return t.includes(a) && (i[a] = n(this, s, R).call(this, r.value)), i;
  }, {});
}, /**
 * Safely parse a string value into a JavaScript value
 * @param {string} value - The string to parse
 * @returns {any} Parsed value or original string if parsing fails
 */
R = function(t) {
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
z = function() {
  const { origin: t } = e(this, h), i = t.responsive.reduce(
    (a, l) => l.breakpoint < window.innerWidth ? l : a,
    { breakpoint: null }
  ), r = Object.assign({}, t, i.settings || {});
  r.perPage = Math.min(r.displayed, r.perPage), e(this, h).current = r, e(this, o).breakpoint !== i.breakpoint && (e(this, o).breakpoint = i.breakpoint, n(this, s, $).call(this));
}, /**
 * Calculate and store the number of pages
 * Accounts for displayed items and items per page
 */
G = function() {
  const { current: t } = e(this, h), { itemsCount: i } = e(this, o), r = Math.floor(
    (t.displayed - t.perPage) / t.perPage
  );
  e(this, o).pageCount = Math.ceil(i / t.perPage) - r;
}, /**
 * Create and apply carousel styles
 * Generates CSS variables and scroll-snap rules
 */
J = function() {
  const t = document.querySelector("#" + e(this, o).id + "-styles");
  t && t.remove();
  const { displayed: i, gap: r, padding: a, perPage: l, stop: c, behavior: f } = e(this, h).current, v = l > 1 ? `*:nth-child(${l}n + 1)` : "*", d = `
      #${e(this, o).id} {
        --sc-perpage: ${i};
        --sc-gap: ${n(this, s, H).call(this, r)};
        --sc-padding: ${n(this, s, H).call(this, a)};
        --sc-behavior: ${f};
      }
      #${e(this, o).id} [slot="scroller"] > ${v} {
        scroll-snap-align: start;
        scroll-snap-stop: ${c ? "always" : "normal"}
      }
    `;
  this.styles = n(this, s, q).call(this, d, e(this, o).id + "-styles"), document.head.append(this.styles);
}, /**
 * Calculate and store the computed padding
 * Used for scroll position calculations
 */
W = function() {
  const { vertical: t } = e(this, h).current, i = t ? "padding-top" : "padding-left";
  e(this, o).computedPadding = parseInt(
    getComputedStyle(e(this, p).scroller)[i],
    10
  );
}, // -----------------------------------------------------------------------------
// Private Methods: Event Handling & Observation
// -----------------------------------------------------------------------------
/**
 * Setup intersection and mutation observers
 * Handles visibility changes and content updates
 */
K = function() {
  const { items: t, scroller: i } = e(this, p);
  new IntersectionObserver((l) => {
    const c = l[0];
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
 * Handle window resize events
 * Debounces updates to prevent excessive recalculation
 */
Z = function() {
  clearTimeout(this.resizeTm), this.resizeTm = setTimeout(() => {
    n(this, s, W).call(this), n(this, s, z).call(this);
  }, 100);
}, /**
 * Handle scroll events
 * Updates state and triggers events during scrolling
 */
Q = function() {
  if (e(this, C)) return;
  n(this, s, X).call(this), this.newIndex = e(this, o).index;
  const t = n(this, s, tt).call(this);
  t !== e(this, o).index && (this.newIndex = t, n(this, s, w).call(this, t), n(this, s, P).call(this, "scrollupdate"));
}, /**
 * Handle scroll start
 * Triggers scrollstart event when scrolling begins
 */
X = function() {
  e(this, o).isMoving || n(this, s, P).call(this, "scrollstart"), e(this, o).isMoving = !0;
}, /**
 * Handle scroll end
 * Updates state and triggers events when scrolling ends
 */
Y = function() {
  console.log("scrollend"), !e(this, C) && (n(this, s, P).call(this, "scrollend"), T(this, x, !1), e(this, o).isMoving = !1, typeof this.newIndex == "number" ? (n(this, s, w).call(this, this.newIndex), this.newIndex = null) : n(this, s, w).call(this, e(this, o).index), n(this, s, E).call(this));
}, /**
 * Handle keyboard navigation in pagination
 * @param {KeyboardEvent} event - Keyboard event
 */
_ = function(t) {
  const i = n(this, s, S).call(this), r = e(this, p).pagination.dots[e(this, o).index] || 0;
  switch (t.key) {
    case "ArrowRight":
    case "ArrowLeft":
      const a = t.key === "ArrowRight" ? i ? "next" : "previous" : i ? "previous" : "next", l = r[`${a}ElementSibling`];
      l && (l.click(), l.focus());
      break;
  }
}, /**
 * Dispatch a custom event
 * @param {string} name - Event name to trigger
 */
P = function(t) {
  const { current: i } = e(this, h);
  this.dispatchEvent(
    new CustomEvent(t, {
      detail: e(this, o)
    })
  ), i["on" + t] && i["on" + t](this);
}, /**
 * Update the dots/controls state
 * @param {Number} index
 * @param {Boolean} force
 */
w = function(t) {
  typeof t < "u" && (e(this, o).index = t), n(this, s, lt).call(this), e(this, x) || (n(this, s, rt).call(this), n(this, s, ot).call(this)), n(this, s, at).call(this);
}, /**
 * Compute the current slide index
 * @returns {Number} the current slide index
 */
tt = function(t) {
  const { scroller: i, items: r } = e(this, p), { perPage: a, vertical: l } = e(this, h).current, c = n(this, s, S).call(this);
  let f = 0;
  l ? f = i.scrollTop : f = c ? i.scrollLeft : i.scrollLeft + i.clientWidth;
  let v = r.map((d) => {
    let m = 0;
    return l ? m = d.offsetTop - (e(this, o).computedPadding || 0) - f : m = (c ? d.offsetLeft : d.offsetLeft + d.clientWidth) - (e(this, o).computedPadding || 0) - f, {
      index: parseInt(d.dataset.index, 10),
      distance: Math.abs(m)
    };
  }).reduce((d, m) => !d || m.distance < d.distance ? m : d, null);
  return t ? v : Math.ceil(v.index / a);
}, /**
 * Create pagination dots
 * Handles creation and setup of navigation dots
 */
et = function() {
  const { pagination: t } = e(this, p);
  let { container: i, dots: r } = t;
  const { current: a } = e(this, h);
  if (i ? (i.innerHTML = "", r.forEach((l) => l.remove()), e(this, p).pagination.dots = []) : (i = n(this, s, y).call(this, "pagination")[0], i.addEventListener("keydown", n(this, s, _).bind(this)), t.container = i), i.style.display = a.nav && e(this, o).pageCount > 1 ? "" : "none", a.nav && i)
    for (let l = 0; l < e(this, o).pageCount; l++)
      n(this, s, nt).call(this, l);
}, /**
 * Create page number display
 * Shows current page number and total pages
 */
st = function() {
  const { pager: t } = e(this, p), { current: i } = e(this, h);
  t.current || (["current", "sep", "total"].forEach((r) => {
    t[r] = n(this, s, y).call(this, r)[0];
  }), t.container = this.shadowRoot.querySelector('[part="pager"]')), t.container.style.display = i.pager && e(this, o).pageCount > 1 ? "" : "none", t.current.innerHTML = 1, t.total.innerHTML = e(this, o).pageCount;
}, /**
 * Create navigation controls
 * Sets up previous and next buttons
 */
it = function() {
  const { controls: t } = e(this, p), { current: i } = e(this, h), r = !i.controls || e(this, o).pageCount < 2;
  t.buttons = [
    ...n(this, s, y).call(this, "prev-buttons"),
    ...n(this, s, y).call(this, "next-buttons")
  ], t.buttons.forEach((a) => {
    a.style = r ? "display: none !important;" : "", !a.hasListener && (a.direction = a.getAttribute("direction") || "next", a.modifier = (a.direction === "next" ? 1 : -1) * (parseInt(a.getAttribute("modifier"), 10) || 1), a.hasListener = !0, a.addEventListener("click", () => {
      i.controls && this.goTo(e(this, o).index + a.modifier);
    }), Object.assign(a, {
      ariaControls: e(this, p).scroller.id
    }));
  });
}, /**
 * Create a pagination marker (dot)
 * @param {number} index - Page index for the marker
 */
nt = function(t) {
  const { pagination: i } = e(this, p), { container: r, dots: a } = i, l = document.createElement("button");
  l.innerHTML = t + 1, l.addEventListener("click", () => this.goTo(t)), Object.assign(l, {
    type: "button",
    part: "button nav-button",
    ariaControls: e(this, p).scroller.id,
    ariaSelected: !1
  }), r.append(l), a.push(l);
}, /**
 * Update active pagination dot
 */
rt = function() {
  if (!e(this, h).current.nav) return;
  const { pagination: t } = e(this, p);
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
 * Update current page number display
 */
ot = function() {
  e(this, h).current.pager && (e(this, p).pager.current.innerHTML = e(this, o).index + 1);
}, /**
 * Update navigation button states
 */
at = function() {
  const { loop: t } = e(this, h).current, { buttons: i } = e(this, p).controls, { index: r, pageCount: a } = e(this, o);
  let l = !1;
  if (i.forEach((c) => {
    const f = !t && (c.direction === "next" ? r >= a - c.modifier : r < Math.abs(c.modifier));
    c === this.shadowRoot.activeElement && f && (l = !0), c.disabled = f ? "disabled" : "";
  }), l) {
    const c = i.filter((f) => !f.disabled);
    c.length && c[0].focus();
  }
}, /**
 * Synchronize other carousels with current index
 */
lt = function() {
  const { sync: t } = e(this, h).current;
  t && e(this, o).ready && (e(this, p).sync = e(this, p).sync || document.querySelectorAll(t) || [], e(this, p).sync.forEach((i) => {
    i instanceof L && i.goTo(e(this, o).index);
  }));
}, /**
 * Retrieve elements assigned to a slot or default elements
 * @param {string} slotName - Name of the slot to query
 * @param {Object} options - Options object
 * @param {boolean} [options.fallback=false] - Whether to fallback to first child if slot is empty
 * @returns {Array<HTMLElement>} Array of elements
 */
y = function(t, i = { fallback: !1 }) {
  const r = this.shadowRoot.querySelector(`[name="${t}"]`);
  let a = r.assignedElements();
  return i.fallback && !a.length && this.children[0].slot === "" && (this.children[0].slot = "scroller", a = r.assignedElements()), Array.from(a.length ? a : r.children);
}, /**
 * Create a style element with given CSS
 * @param {string} css - CSS content
 * @param {string} id - ID for the style element
 * @returns {HTMLStyleElement} Created style element
 */
q = function(t, i) {
  const r = document.createElement("style");
  return r.id = i, r.append(document.createTextNode(t)), r;
}, /**
 * Check if document is in LTR mode
 * @returns {boolean} True if document is LTR
 */
S = function() {
  return document.firstElementChild.getAttribute("dir") !== "rtl";
}, /**
 * Format a CSS value, adding 'px' if needed
 * @param {string|number} value - Value to format
 * @returns {string} Formatted CSS value
 */
H = function(t) {
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
let A = L;
window.customElements && customElements.define("snap-carousel", A);
