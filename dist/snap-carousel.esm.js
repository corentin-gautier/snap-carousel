var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _preventUiUpdate, _preventNextEvent, _className, _initialStyle, _state, _elements, _settings, _featureHooks, _BaseCarousel_instances, executeHooks_fn, setup_fn, init_fn, computeChildren_fn, addGlobalStyles_fn, identify_fn, waitForWidth_fn, getNodeConfig_fn, maybeParse_fn, getCurrentConfig_fn, setPages_fn, createStyles_fn, computePadding_fn, observe_fn, resizeEvent_fn, onscroll_fn, onscrollstart_fn, onscrollend_fn, triggerEvent_fn, updateState_fn, getCurrent_fn, synchronize_fn, getSlotElements_fn, createStyleElement_fn, isDocumentLtr_fn, formatCssValue_fn, setPlayPause_fn;
if ("undefined" != typeof window && !("onscrollend" in window)) {
  let e = function(e2, t2, n2) {
    let o = e2[t2];
    e2[t2] = function() {
      let e3 = Array.prototype.slice.apply(arguments, [0]);
      o.apply(this, e3), e3.unshift(o), n2.apply(this, e3);
    };
  }, t = function(e2, t2, n2, o) {
    if ("scroll" != t2 && "scrollend" != t2) return;
    let r = this, d = l.get(r);
    if (void 0 === d) {
      let t3 = 0;
      d = { scrollListener: (e3) => {
        clearTimeout(t3), t3 = setTimeout(() => {
          s.size ? setTimeout(d.scrollListener, 100) : (r && r.dispatchEvent(i), t3 = 0);
        }, 100);
      }, listeners: 0 }, e2.apply(r, ["scroll", d.scrollListener]), l.set(r, d);
    }
    d.listeners++;
  }, n = function(e2, t2, n2) {
    if ("scroll" != t2 && "scrollend" != t2) return;
    let o = this, i2 = l.get(o);
    void 0 !== i2 && (--i2.listeners > 0 || (e2.apply(o, ["scroll", i2.scrollListener]), l.delete(o)));
  };
  const i = new Event("scrollend"), s = /* @__PURE__ */ new Set();
  document.addEventListener("touchstart", (e2) => {
    for (let t2 of e2.changedTouches) s.add(t2.identifier);
  }, { passive: true }), document.addEventListener("touchend", (e2) => {
    for (let t2 of e2.changedTouches) s.delete(t2.identifier);
  }, { passive: true }), document.addEventListener("touchcancel", (e2) => {
    for (let t2 of e2.changedTouches) s.delete(t2.identifier);
  }, { passive: true });
  let l = /* @__PURE__ */ new WeakMap();
  e(Element.prototype, "addEventListener", t), e(window, "addEventListener", t), e(document, "addEventListener", t), e(Element.prototype, "removeEventListener", n), e(window, "removeEventListener", n), e(document, "removeEventListener", n);
}
const hostStyles = ':host {\n  display: block;\n  position: relative;\n  width: 100%;\n}\n\n:host(:not([scrollbar])) ::slotted([slot="scroller"]) {\n  scrollbar-width: none;\n}\n\n:host(:not([scrollbar])) ::slotted([slot="scroller"])::-webkit-scrollbar {\n  display: none;\n}\n\n::slotted([slot="scroller"]) {\n  position: relative;\n  margin: 0;\n  display: flex;\n  gap: var(--gap);\n  scroll-behavior: var(--behavior);\n}\n\n:host(:not([vertical])) ::slotted([slot="scroller"]) {\n  overflow-x: auto;\n  scroll-snap-type: x mandatory;\n  overscroll-behavior-x: contain;\n  scroll-padding-inline: var(--padding);\n  padding-inline: var(--padding) !important;\n}\n\n:host([vertical]) ::slotted([slot="scroller"]) {\n  flex-direction: column;\n  overflow-y: auto;\n  scroll-snap-type: y mandatory;\n  overscroll-behavior-y: contain;\n  padding-block: var(--padding) !important;\n  scroll-padding-block: var(--padding);\n}\n';
const globalStyles = 'snap-carousel {\n  --sc-item-size: calc(\n    (100% / var(--perpage, 1)) - var(--gap, 0) +\n      (var(--gap, 0) / var(--perpage, 1))\n  );\n}\n\nsnap-carousel:not([scrollbar]) [snpc-s]::-webkit-scrollbar {\n  display: none;\n}\n\n[snpc-s] {\n  display: flex;\n}\n\n[vertical] > [snpc-s] {\n  flex-direction: column;\n  height: 100%;\n}\n\n[snpc-s] > [data-index] {\n  display: block;\n  flex: 0 0 auto;\n  width: var(--sc-item-size);\n  max-width: 100%;\n}\n\n[vertical] > [snpc-s] > [data-index] {\n  width: initial;\n  max-width: initial;\n  height: var(--sc-item-size);\n  max-height: 100%;\n}\n\n[class*="sc-anchor"] {\n  scroll-snap-align: start;\n  scroll-snap-stop: normal;\n}\n\n.sc-anchor-stop {\n  scroll-snap-stop: always;\n}\n';
const htmlTemplate = '<slot name="scroller">\n  <ul></ul>\n</slot>\n\n<div part="controls">\n  <div part="buttons" style="display: none;">\n    <slot name="before-prev"></slot>\n    <slot name="prev-buttons">\n      <button style="display: none;" part="button control-button prev-button" type="button" direction="prev" aria-label="Previous">\n        <slot name="prev-icon"></slot>\n        <slot name="prev-label">Previous</slot>\n      </button>\n    </slot>\n    <slot name="next-buttons">\n      <button style="display: none;" part="button control-button next-button" type="button" direction="next" aria-label="Next">\n        <slot name="next-label">Next</slot>\n        <slot name="next-icon"></slot>\n      </button>\n    </slot>\n    <slot name="after-next"></slot>\n  </div>\n\n  <slot name="pagination">\n    <div part="nav" style="display: none;"></div>\n  </slot>\n\n  <div part="pager" style="display: none;">\n    <slot name="current">\n      <span part="current"></span>\n    </slot>\n    <slot name="sep">\n      <span part="page-sep">&nbsp;/&nbsp;</span>\n    </slot>\n    <slot name="total">\n      <span part="total"></span>\n    </slot>\n  </div>\n</div>\n';
const _BaseCarousel = class _BaseCarousel extends HTMLElement {
  /**
   * Constructor: Initialize default settings
   */
  constructor() {
    super();
    __privateAdd(this, _BaseCarousel_instances);
    // Private fields
    __privateAdd(this, _preventUiUpdate, false);
    __privateAdd(this, _preventNextEvent, false);
    __privateAdd(this, _className, "snap-carousel");
    __privateAdd(this, _initialStyle, "");
    // State management
    __privateAdd(this, _state, {
      index: 0,
      itemsCount: 0,
      pageCount: 0,
      pages: [],
      isVisible: false,
      autoplayInterval: null,
      breakpoint: void 0,
      ready: false,
      isMoving: false,
      pause: false,
      computedPadding: 0
    });
    // DOM Elements
    __privateAdd(this, _elements, {
      scroller: null,
      items: null,
      sync: null
    });
    // Configuration
    __privateAdd(this, _settings, {
      default: {},
      origin: {},
      current: {}
    });
    // Feature lifecycle hooks
    __privateAdd(this, _featureHooks, {
      init: [],
      updateState: []
    });
    __privateGet(this, _settings).default = _BaseCarousel.defaultConfig;
    __privateSet(this, _initialStyle, this.getAttribute("style"));
  }
  // Public getters for feature access
  get elements() {
    return __privateGet(this, _elements);
  }
  get settings() {
    return __privateGet(this, _settings);
  }
  get state() {
    return __privateGet(this, _state);
  }
  get preventUiUpdate() {
    return __privateGet(this, _preventUiUpdate);
  }
  // Protected methods for features
  getSlotElements(slotName, options = { fallback: false }) {
    return __privateMethod(this, _BaseCarousel_instances, getSlotElements_fn).call(this, slotName, options);
  }
  isDocumentLtr() {
    return __privateMethod(this, _BaseCarousel_instances, isDocumentLtr_fn).call(this);
  }
  // Register feature hooks
  registerHook(type, callback) {
    if (__privateGet(this, _featureHooks)[type]) {
      __privateGet(this, _featureHooks)[type].push(callback);
    }
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
      controls: false,
      // Show prev/next buttons
      nav: false,
      // Show navigation dots
      pager: false,
      // Show page numbers
      loop: false,
      // Loop around when reaching the end
      behavior: "smooth",
      // Scroll behavior
      stop: false,
      // Stop at each item
      usePause: true,
      // Pause autoplay on hover
      vertical: false,
      // Vertical orientation
      responsive: [],
      // Breakpoint configurations
      sync: null
      // Selector for other carousels to sync with
    };
  }
  /**
   * Observed attributes for the web component
   * Includes all config options and their data- prefixed versions
   */
  static get observedAttributes() {
    const keys = Object.keys(_BaseCarousel.defaultConfig).map((k) => k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()));
    return [...keys, ...keys.map((k) => "data-" + k)];
  }
  /**
   * Connected callback: Setup the carousel when added to DOM
   */
  connectedCallback() {
    if (!this.isConnected) return;
    const template = document.createElement("template");
    template.innerHTML = `<style>${hostStyles}</style>${htmlTemplate}`;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    __privateGet(this, _elements).scroller = __privateMethod(this, _BaseCarousel_instances, getSlotElements_fn).call(this, "scroller", { fallback: true })[0];
    if (!__privateGet(this, _elements).scroller) return;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length || mutation.removedNodes.length) {
          __privateMethod(this, _BaseCarousel_instances, computeChildren_fn).call(this);
          __privateMethod(this, _BaseCarousel_instances, init_fn).call(this);
        }
      });
    });
    observer.observe(__privateGet(this, _elements).scroller, { childList: true });
    __privateGet(this, _elements).scroller.setAttribute("snpc-s", "");
    __privateGet(this, _elements).scroller.onscroll = __privateMethod(this, _BaseCarousel_instances, onscroll_fn).bind(this);
    __privateGet(this, _elements).scroller.addEventListener("scrollend", __privateMethod(this, _BaseCarousel_instances, onscrollend_fn).bind(this));
    window.addEventListener("resize", __privateMethod(this, _BaseCarousel_instances, resizeEvent_fn).bind(this));
    this.ariaRoleDescription = "carousel";
    Object.assign(__privateGet(this, _elements).scroller, {
      role: "group",
      ariaLive: "polite",
      ariaAtomic: false
    });
    __privateMethod(this, _BaseCarousel_instances, identify_fn).call(this);
    __privateMethod(this, _BaseCarousel_instances, computeChildren_fn).call(this);
    __privateMethod(this, _BaseCarousel_instances, addGlobalStyles_fn).call(this);
    __privateMethod(this, _BaseCarousel_instances, setup_fn).call(this);
    __privateMethod(this, _BaseCarousel_instances, observe_fn).call(this);
    __privateGet(this, _state).ready = true;
  }
  /**
   * Attribute changed callback: Update settings when attributes change
   */
  attributeChangedCallback() {
    if (__privateGet(this, _state).ready) __privateMethod(this, _BaseCarousel_instances, setup_fn).call(this);
  }
  /**
   * Navigate to a specific page
   * @param {number} page - Page index to navigate to
   */
  goTo(page) {
    __privateSet(this, _preventUiUpdate, false);
    const { scroller, items } = __privateGet(this, _elements);
    const { perPage, vertical } = __privateGet(this, _settings).current;
    const index = page > __privateGet(this, _state).pageCount - 1 ? 0 : page < 0 ? __privateGet(this, _state).pageCount - 1 : page;
    const target = items[index * perPage];
    __privateMethod(this, _BaseCarousel_instances, updateState_fn).call(this, index);
    __privateGet(this, _state).ready = true;
    let top = 0, left = 0;
    if (vertical) {
      top = target.offsetTop;
    } else {
      left = __privateMethod(this, _BaseCarousel_instances, isDocumentLtr_fn).call(this) ? target.offsetLeft : target.offsetLeft + target.offsetWidth - scroller.offsetWidth;
    }
    __privateSet(this, _preventUiUpdate, true);
    requestIdleCallback(() => {
      scroller.scrollTo({ top, left });
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
  static setVisibility(element, condition) {
    condition ? element.removeAttribute("style") : element.setAttribute("style", "display: none!important;");
  }
  /**
   * Define a custom element
   * @param {string} name - Name of the custom element
   * @param {Function} constructor - Constructor function for the custom element
   */
  static registerElement(name, constructor) {
    if (window.customElements) {
      customElements.define(name, constructor);
    }
  }
};
_preventUiUpdate = new WeakMap();
_preventNextEvent = new WeakMap();
_className = new WeakMap();
_initialStyle = new WeakMap();
_state = new WeakMap();
_elements = new WeakMap();
_settings = new WeakMap();
_featureHooks = new WeakMap();
_BaseCarousel_instances = new WeakSet();
// Execute feature hooks
executeHooks_fn = function(type, ...args) {
  if (__privateGet(this, _featureHooks)[type]) {
    __privateGet(this, _featureHooks)[type].forEach((callback) => callback.apply(this, args));
  }
};
/**
 * Setup carousel configuration
 */
setup_fn = function() {
  __privateGet(this, _state).breakpoint = void 0;
  __privateGet(this, _settings).origin = Object.assign(
    {},
    __privateGet(this, _settings).default,
    __privateMethod(this, _BaseCarousel_instances, getNodeConfig_fn).call(this)
  );
  __privateGet(this, _settings).origin.responsive = (__privateGet(this, _settings).origin.responsive || []).sort((a, b) => a.breakpoint - b.breakpoint);
  __privateMethod(this, _BaseCarousel_instances, getCurrentConfig_fn).call(this);
};
/**
 * Initialize carousel after setup
 */
init_fn = function() {
  __privateMethod(this, _BaseCarousel_instances, waitForWidth_fn).call(this, () => {
    __privateMethod(this, _BaseCarousel_instances, setPages_fn).call(this);
    __privateMethod(this, _BaseCarousel_instances, createStyles_fn).call(this);
    __privateMethod(this, _BaseCarousel_instances, computePadding_fn).call(this);
    __privateMethod(this, _BaseCarousel_instances, updateState_fn).call(this, 0);
    __privateMethod(this, _BaseCarousel_instances, executeHooks_fn).call(this, "init");
  });
};
computeChildren_fn = function() {
  const items = Array.from(__privateGet(this, _elements).scroller.children).filter((i) => !["absolute", "fixed", "sticky"].includes(getComputedStyle(i).position));
  const count = items.length;
  __privateGet(this, _elements).items = items;
  __privateGet(this, _state).itemsCount = count;
  items.forEach((item, i) => {
    item.id = `${this.id}-slide-${i}`;
    item.dataset.index = i;
    Object.assign(item, {
      ariaSetSize: count,
      ariaPosInSet: i + 1,
      ariaRoleDescription: "slide",
      role: "listitem"
    });
  });
};
/**
 * Add carousel base styles in the document head
 * @returns
 */
addGlobalStyles_fn = function() {
  const classname = __privateGet(this, _className);
  const id = `${classname}-global-styles`;
  if (document.querySelector("#" + id)) {
    return;
  }
  const css = globalStyles;
  document.head.append(__privateMethod(this, _BaseCarousel_instances, createStyleElement_fn).call(this, css, id));
};
/**
 * Adds unique ids and classes
 */
identify_fn = function() {
  this.id = __privateGet(this, _state).id = __privateGet(this, _className) + "-" + (Math.random() + 1).toString(36).substring(4);
  __privateGet(this, _elements).scroller.id = this.id + "-scroller";
};
/**
 * Wait for the scroller element to have a width before initializing
 * Uses requestAnimationFrame for efficient polling
 * @param {Function} callback - Function to call once width is available
 */
waitForWidth_fn = function(callback) {
  if (__privateGet(this, _elements).scroller.clientWidth) {
    callback();
  } else {
    requestAnimationFrame(() => {
      __privateMethod(this, _BaseCarousel_instances, waitForWidth_fn).call(this, callback);
    });
  }
};
/**
 * Get configuration from element attributes
 * Supports both regular and data- prefixed attributes
 * @returns {Object} Configuration object from attributes
 */
getNodeConfig_fn = function() {
  const options = Object.keys(__privateGet(this, _settings).default);
  if (this.attributes.options) {
    return __privateMethod(this, _BaseCarousel_instances, maybeParse_fn).call(this, this.attributes.options.value);
  }
  return Array.from(this.attributes).reduce((config, attr) => {
    const name = attr.name.replace("data-", "").replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    if (options.includes(name)) {
      config[name] = __privateMethod(this, _BaseCarousel_instances, maybeParse_fn).call(this, attr.value);
    }
    return config;
  }, {});
};
/**
 * Safely parse a string value into a JavaScript value
 * @param {string} value - The string to parse
 * @returns {any} Parsed value or original string if parsing fails
 */
maybeParse_fn = function(value) {
  if (value === "") return true;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
/**
 * Get configuration for current breakpoint
 * Merges default config with responsive breakpoint settings
 */
getCurrentConfig_fn = function() {
  const { origin } = __privateGet(this, _settings);
  const match = origin.responsive.reduce(
    (match2, config) => config.breakpoint < window.innerWidth ? config : match2,
    { breakpoint: null }
  );
  const current = Object.assign({}, origin, match.settings || {});
  current.perPage = Math.min(current.displayed, current.perPage);
  __privateGet(this, _settings).current = current;
  if (__privateGet(this, _state).breakpoint !== match.breakpoint) {
    __privateGet(this, _state).breakpoint = match.breakpoint;
    __privateMethod(this, _BaseCarousel_instances, init_fn).call(this);
  }
};
/**
 * Calculate and store the number of pages
 * Accounts for displayed items and items per page
 */
setPages_fn = function() {
  const { current } = __privateGet(this, _settings);
  const { itemsCount } = __privateGet(this, _state);
  const unecessaryPagesCount = Math.floor(
    (current.displayed - current.perPage) / current.perPage
  );
  __privateGet(this, _state).pageCount = Math.ceil(itemsCount / current.perPage) - unecessaryPagesCount;
  __privateGet(this, _state).pages = Array.from({ length: __privateGet(this, _state).pageCount }, (_, pageIndex) => {
    const startIndex = pageIndex * current.perPage;
    const endIndex = Math.min(startIndex + current.perPage, itemsCount);
    return Array.from({ length: endIndex - startIndex }, (_2, i) => __privateGet(this, _elements).items[startIndex + i]);
  });
};
/**
 * Create and apply carousel styles
 * Generates CSS variables and scroll-snap rules
 */
createStyles_fn = function() {
  const { displayed, gap, padding, perPage, stop, behavior } = __privateGet(this, _settings).current;
  const formatedGap = __privateMethod(this, _BaseCarousel_instances, formatCssValue_fn).call(this, gap);
  const formatedPadding = __privateMethod(this, _BaseCarousel_instances, formatCssValue_fn).call(this, padding);
  const anchorClass = `sc-anchor${stop ? "-stop" : ""}`;
  this.style = `--perpage: ${displayed};--gap: ${formatedGap};--padding: ${formatedPadding};--behavior: ${behavior};${__privateGet(this, _initialStyle)}`;
  this.elements.items.forEach((item, index) => {
    if (index % perPage === 0) {
      item.classList.add(anchorClass);
    } else {
      item.classList.remove(anchorClass);
    }
  });
};
/**
 * Calculate and store the computed padding
 * Used for scroll position calculations
 */
computePadding_fn = function() {
  const { vertical } = __privateGet(this, _settings).current;
  const property = vertical ? "padding-top" : "padding-left";
  __privateGet(this, _state).computedPadding = parseInt(
    getComputedStyle(__privateGet(this, _elements).scroller)[property],
    10
  );
};
/**
 * Setup intersection and mutation observers
 * Handles visibility changes and content updates
 */
observe_fn = function() {
  const { items, scroller } = __privateGet(this, _elements);
  const visibilityObserver = new IntersectionObserver((entries) => {
    const entry = entries[0];
    __privateGet(this, _state).isVisible = entry.intersectionRatio > 0.1;
    __privateGet(this, _state).pause = !__privateGet(this, _state).isVisible;
    __privateMethod(this, _BaseCarousel_instances, setPlayPause_fn).call(this);
  }, {
    threshold: [0.1, 0.9]
  });
  visibilityObserver.observe(this);
  if (__privateGet(this, _settings).current.usePause) {
    this.addEventListener("mouseenter", () => {
      __privateGet(this, _state).pause = true;
      __privateMethod(this, _BaseCarousel_instances, setPlayPause_fn).call(this);
    });
    this.addEventListener("mouseleave", () => {
      __privateGet(this, _state).pause = false;
      __privateMethod(this, _BaseCarousel_instances, setPlayPause_fn).call(this);
    });
  }
  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.toggleAttribute("visible", entry.isIntersecting);
      entry.target.toggleAttribute("inert", !entry.isIntersecting);
    });
  }, {
    scroller,
    threshold: 0.6
  });
  items.forEach((item) => slideObserver.observe(item));
};
/**
 * Handle window resize events
 * Debounces updates to prevent excessive recalculation
 */
resizeEvent_fn = function() {
  clearTimeout(this.resizeTm);
  this.resizeTm = setTimeout(() => {
    __privateMethod(this, _BaseCarousel_instances, computePadding_fn).call(this);
    __privateMethod(this, _BaseCarousel_instances, getCurrentConfig_fn).call(this);
  }, 100);
};
/**
 * Handle scroll events
 * Updates state and triggers events during scrolling
 */
onscroll_fn = function() {
  if (__privateGet(this, _preventNextEvent)) return;
  __privateMethod(this, _BaseCarousel_instances, onscrollstart_fn).call(this);
  this.newIndex = __privateGet(this, _state).index;
  const current = __privateMethod(this, _BaseCarousel_instances, getCurrent_fn).call(this);
  if (current !== __privateGet(this, _state).index) {
    this.newIndex = current;
    __privateMethod(this, _BaseCarousel_instances, updateState_fn).call(this, current);
    __privateMethod(this, _BaseCarousel_instances, triggerEvent_fn).call(this, "scrollupdate");
  }
};
/**
 * Handle scroll start
 * Triggers scrollstart event when scrolling begins
 */
onscrollstart_fn = function() {
  if (!__privateGet(this, _state).isMoving) {
    __privateMethod(this, _BaseCarousel_instances, triggerEvent_fn).call(this, "scrollstart");
  }
  __privateGet(this, _state).isMoving = true;
};
/**
 * Handle scroll end
 * Updates state and triggers events when scrolling ends
 */
onscrollend_fn = function() {
  if (__privateGet(this, _preventNextEvent)) return;
  __privateMethod(this, _BaseCarousel_instances, triggerEvent_fn).call(this, "scrollend");
  __privateSet(this, _preventUiUpdate, false);
  __privateGet(this, _state).isMoving = false;
  if (typeof this.newIndex === "number") {
    __privateMethod(this, _BaseCarousel_instances, updateState_fn).call(this, this.newIndex);
    this.newIndex = null;
  } else {
    __privateMethod(this, _BaseCarousel_instances, updateState_fn).call(this, __privateGet(this, _state).index);
  }
  __privateMethod(this, _BaseCarousel_instances, setPlayPause_fn).call(this);
};
/**
 * Dispatch a custom event
 * @param {string} name - Event name to trigger
 */
triggerEvent_fn = function(name) {
  const { current } = __privateGet(this, _settings);
  this.dispatchEvent(
    new CustomEvent(name, {
      detail: __privateGet(this, _state)
    })
  );
  if (current["on" + name]) {
    current["on" + name](this);
  }
};
/**
 * Update the dots/controls state
 * @param {Number} index
 */
updateState_fn = function(index) {
  if (typeof index !== "undefined") {
    __privateGet(this, _state).index = index;
  }
  __privateMethod(this, _BaseCarousel_instances, synchronize_fn).call(this);
  if (__privateGet(this, _preventUiUpdate)) return;
  __privateMethod(this, _BaseCarousel_instances, executeHooks_fn).call(this, "updateState", index);
};
/**
 * Compute the current slide index
 * @returns {Number} the current slide index
 */
getCurrent_fn = function(node) {
  const { scroller, items } = __privateGet(this, _elements);
  const { perPage, vertical } = __privateGet(this, _settings).current;
  const isLtr = __privateMethod(this, _BaseCarousel_instances, isDocumentLtr_fn).call(this);
  let refPoint = 0;
  if (vertical) {
    refPoint = scroller.scrollTop;
  } else {
    refPoint = isLtr ? scroller.scrollLeft : scroller.scrollLeft + scroller.clientWidth;
  }
  let closest = items.map((i) => {
    let distance = 0;
    if (vertical) {
      distance = i.offsetTop - (__privateGet(this, _state).computedPadding || 0) - refPoint;
    } else {
      distance = (isLtr ? i.offsetLeft : i.offsetLeft + i.clientWidth) - (__privateGet(this, _state).computedPadding || 0) - refPoint;
    }
    return {
      index: parseInt(i.dataset.index, 10),
      distance: Math.abs(distance)
    };
  }).reduce((a, b) => !a || b.distance < a.distance ? b : a, null);
  if (node) return closest;
  return Math.ceil(closest.index / perPage);
};
/**
 * Synchronize other carousels with current index
 */
synchronize_fn = function() {
  const { sync } = __privateGet(this, _settings).current;
  if (sync && __privateGet(this, _state).ready) {
    __privateGet(this, _elements).sync = __privateGet(this, _elements).sync || Array.from(document.querySelectorAll(sync));
    __privateGet(this, _elements).sync.forEach((carousel) => {
      if (carousel instanceof _BaseCarousel) {
        carousel.goTo(__privateGet(this, _state).index);
      }
    });
  }
};
/**
 * Retrieve elements assigned to a slot or default elements
 * @param {string} slotName - Name of the slot to query
 * @param {Object} options - Options object
 * @param {boolean} [options.fallback=false] - Whether to fallback to first child if slot is empty
 * @returns {Array<HTMLElement>} Array of elements
 */
getSlotElements_fn = function(slotName, options = { fallback: false }) {
  const slot = this.shadowRoot.querySelector(`[name="${slotName}"]`);
  let assigned = slot.assignedElements();
  if (options.fallback && !assigned.length) {
    if (this.children[0].slot === "") {
      this.children[0].slot = "scroller";
      assigned = slot.assignedElements();
    }
  }
  return Array.from(assigned.length ? assigned : slot.children);
};
/**
 * Create a style element with given CSS
 * @param {string} css - CSS content
 * @param {string} id - ID for the style element
 * @returns {HTMLStyleElement} Created style element
 */
createStyleElement_fn = function(css, id) {
  const styles = document.createElement("style");
  styles.id = id;
  styles.append(document.createTextNode(css));
  return styles;
};
/**
 * Check if document is in LTR mode
 * @returns {boolean} True if document is LTR
 */
isDocumentLtr_fn = function() {
  return document.firstElementChild.getAttribute("dir") !== "rtl";
};
/**
 * Format a CSS value, adding 'px' if needed
 * @param {string|number} value - Value to format
 * @returns {string} Formatted CSS value
 */
formatCssValue_fn = function(value) {
  return typeof value === "string" ? value : value + "px";
};
/**
 * Activate/deactivate the automatic goTo
 */
setPlayPause_fn = function() {
  if (!__privateGet(this, _settings).current.autoplay) return;
  const { pause, isVisible } = __privateGet(this, _state);
  if (!pause && isVisible) {
    if (!__privateGet(this, _state).autoplayInterval) {
      __privateGet(this, _state).autoplayInterval = setTimeout(() => {
        __privateGet(this, _state).autoplayInterval = null;
        this.goTo(__privateGet(this, _state).index + 1);
      }, __privateGet(this, _settings).current.autoplay);
    }
  } else {
    clearTimeout(__privateGet(this, _state).autoplayInterval);
    __privateGet(this, _state).autoplayInterval = null;
  }
};
let BaseCarousel = _BaseCarousel;
function createCarousel(...features) {
  return features.reduce((CarouselClass, feature) => feature(CarouselClass), BaseCarousel);
}
const ControlsFeature = (Base) => {
  var _controls, _instances, createControls_fn, setButtonsState_fn, _a;
  return _a = class extends Base {
    constructor() {
      super();
      __privateAdd(this, _instances);
      // Feature-specific elements
      __privateAdd(this, _controls, {
        container: null,
        buttons: []
      });
      this.elements.controls = __privateGet(this, _controls);
      this.registerHook("init", __privateMethod(this, _instances, createControls_fn).bind(this));
      this.registerHook("updateState", __privateMethod(this, _instances, setButtonsState_fn).bind(this));
    }
  }, _controls = new WeakMap(), _instances = new WeakSet(), /**
   * Create navigation controls
   */
  createControls_fn = function() {
    const { current } = this.settings;
    const hideButtons = !current.controls || this.state.pageCount < 2;
    const prevButtons = this.getSlotElements("prev-buttons");
    const nextButtons = this.getSlotElements("next-buttons");
    __privateGet(this, _controls).container = this.shadowRoot.querySelector('[part="buttons"]');
    if (!__privateGet(this, _controls).container) return;
    const { container, buttons } = __privateGet(this, _controls);
    Base.setVisibility(container, !hideButtons);
    if (!prevButtons.length && !nextButtons.length) return;
    buttons.push(...prevButtons, ...nextButtons);
    buttons.forEach((button) => {
      if (button.hasListener) return;
      button.direction = button.getAttribute("direction") || "next";
      button.modifier = (button.direction === "next" ? 1 : -1) * (parseInt(button.getAttribute("modifier"), 10) || 1);
      button.hasListener = true;
      button.addEventListener("click", () => {
        if (!current.controls) return;
        this.goTo(this.state.index + button.modifier);
      });
    });
    __privateMethod(this, _instances, setButtonsState_fn).call(this);
  }, /**
   * Update navigation button states and their aria-controls
   */
  setButtonsState_fn = function() {
    if (!__privateGet(this, _controls).buttons.length) return;
    const { loop } = this.settings.current;
    const { index, pageCount } = this.state;
    let shouldShiftFocus = false;
    __privateGet(this, _controls).buttons.forEach((button) => {
      const isDisabled = !loop && (button.direction === "next" ? index >= pageCount - button.modifier : index < Math.abs(button.modifier));
      if (button === this.shadowRoot.activeElement && isDisabled) {
        shouldShiftFocus = true;
      }
      button.disabled = !!isDisabled;
      button.setAttribute("aria-disabled", !!isDisabled);
      if (!isDisabled) {
        let targetIndex = index + button.modifier;
        if (targetIndex < 0) {
          targetIndex = pageCount - 1;
        } else if (targetIndex >= pageCount) {
          targetIndex = 0;
        }
        const targetpages = this.state.pages[targetIndex];
        if (targetpages == null ? void 0 : targetpages.length) {
          const slideIds = targetpages.map((slideIndex) => {
            var _a2;
            return (_a2 = this.elements.items[slideIndex]) == null ? void 0 : _a2.id;
          }).filter(Boolean);
          if (slideIds.length) {
            button.setAttribute("aria-controls", slideIds.join(" "));
          }
        }
      } else {
        button.removeAttribute("aria-controls");
      }
    });
    if (shouldShiftFocus) {
      const active = __privateGet(this, _controls).buttons.filter((b) => !b.disabled);
      if (active.length) {
        active[0].focus();
      }
    }
  }, _a;
};
const NavFeature = (Base) => {
  var _pagination, _defaultPart, _instances, createPagination_fn, createMarker_fn, setActivePaginationItem_fn, handleKeyDown_fn, _a;
  return _a = class extends Base {
    constructor() {
      super();
      __privateAdd(this, _instances);
      // Feature-specific elements
      __privateAdd(this, _pagination, {
        container: null,
        dots: [],
        active: null
      });
      __privateAdd(this, _defaultPart, "button nav-button");
      this.elements.pagination = __privateGet(this, _pagination);
      this.registerHook("init", __privateMethod(this, _instances, createPagination_fn).bind(this));
      this.registerHook("updateState", __privateMethod(this, _instances, setActivePaginationItem_fn).bind(this));
    }
  }, _pagination = new WeakMap(), _defaultPart = new WeakMap(), _instances = new WeakSet(), /**
   * Create pagination dots
   */
  createPagination_fn = function() {
    let { container, dots } = __privateGet(this, _pagination);
    const { current } = this.settings;
    if (!container) {
      container = this.getSlotElements("pagination")[0];
      if (!container) return;
      container.addEventListener("keydown", __privateMethod(this, _instances, handleKeyDown_fn).bind(this));
      __privateGet(this, _pagination).container = container;
    } else {
      container.innerHTML = "";
      dots.forEach((dot) => dot.remove());
      __privateGet(this, _pagination).dots = [];
    }
    Base.setVisibility(container, current.nav && this.state.pageCount > 1);
    if (current.nav && container && this.state.pageCount > 1) {
      this.state.pages.forEach((page, index) => {
        __privateMethod(this, _instances, createMarker_fn).call(this, page, index);
      });
      if (__privateGet(this, _pagination).dots.length) {
        __privateMethod(this, _instances, setActivePaginationItem_fn).call(this);
      }
    }
  }, /**
   * Create a pagination marker (dot)
   * @param {number} index - Page index for the marker
   */
  createMarker_fn = function(page, index) {
    const { container, dots } = __privateGet(this, _pagination);
    if (!container) return;
    const dot = document.createElement("button");
    dot.type = "button";
    dot.part = __privateGet(this, _defaultPart);
    dot.setAttribute("aria-label", `Page ${index + 1}`);
    dot.setAttribute("aria-controls", page.map((item) => item.id).join(" "));
    dot.setAttribute("aria-current", false);
    dot.innerHTML = index + 1;
    dot.addEventListener("click", () => this.goTo(index));
    container.append(dot);
    dots.push(dot);
  }, /**
   * Update active pagination dot
   */
  setActivePaginationItem_fn = function() {
    if (!this.settings.current.nav || !__privateGet(this, _pagination).dots.length) return;
    let { dots, active } = __privateGet(this, _pagination);
    const next = dots[this.state.index];
    if (next) {
      if (active) {
        Object.assign(active, {
          tabIndex: 0,
          ariaCurrent: false
        });
        active.part = __privateGet(this, _defaultPart);
      }
      next.part = `${__privateGet(this, _defaultPart)} active`;
      Object.assign(next, {
        tabIndex: -1,
        ariaCurrent: true
      });
      __privateGet(this, _pagination).active = next;
    }
  }, /**
   * Handle keyboard navigation in pagination
   * @param {KeyboardEvent} event - Keyboard event
   */
  handleKeyDown_fn = function(event) {
    if (!__privateGet(this, _pagination).dots.length) return;
    const isLtr = this.isDocumentLtr();
    const activeDot = __privateGet(this, _pagination).dots[this.state.index] || 0;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowLeft":
        const direction = event.key === "ArrowRight" ? isLtr ? "next" : "previous" : isLtr ? "previous" : "next";
        const target = activeDot[`${direction}ElementSibling`];
        if (target) {
          target.click();
          target.focus();
        }
        break;
    }
  }, _a;
};
const PagerFeature = (Base) => {
  var _pager, _instances, createPager_fn, setCurrentPage_fn, _a;
  return _a = class extends Base {
    constructor() {
      super();
      __privateAdd(this, _instances);
      // Feature-specific elements
      __privateAdd(this, _pager, {
        container: null,
        current: null,
        sep: null,
        total: null
      });
      this.elements.pager = __privateGet(this, _pager);
      this.registerHook("init", __privateMethod(this, _instances, createPager_fn).bind(this));
      this.registerHook("updateState", __privateMethod(this, _instances, setCurrentPage_fn).bind(this));
    }
  }, _pager = new WeakMap(), _instances = new WeakSet(), /**
   * Create page number display
   */
  createPager_fn = function() {
    const { current: currentSettings } = this.settings;
    if (!__privateGet(this, _pager).container) {
      __privateGet(this, _pager).container = this.shadowRoot.querySelector('[part="pager"]');
      if (!__privateGet(this, _pager).container) return;
      ["current", "sep", "total"].forEach((key) => {
        const element = this.getSlotElements(key)[0];
        if (!element) return;
        __privateGet(this, _pager)[key] = element;
      });
    }
    if (!__privateGet(this, _pager).current || !__privateGet(this, _pager).total) return;
    const { container, current, total } = __privateGet(this, _pager);
    Base.setVisibility(container, currentSettings.pager && this.state.pageCount > 1);
    current.innerHTML = 1;
    total.innerHTML = this.state.pageCount;
  }, /**
   * Update current page number display
   */
  setCurrentPage_fn = function() {
    if (!this.settings.current.pager || !__privateGet(this, _pager).current) return;
    __privateGet(this, _pager).current.innerHTML = this.state.index + 1;
  }, _a;
};
const SnapCarousel = createCarousel(ControlsFeature, NavFeature, PagerFeature);
const SnapCarouselNav = createCarousel(NavFeature);
const SnapCarouselPager = createCarousel(PagerFeature);
const SnapCarouselControls = createCarousel(ControlsFeature);
const SnapCarouselNavControls = createCarousel(NavFeature, ControlsFeature);
const SnapCarouselNavPager = createCarousel(NavFeature, PagerFeature);
const SnapCarouselPagerControls = createCarousel(PagerFeature, ControlsFeature);
if ("customElements" in window && import.meta.url.endsWith("snap-carousel.js")) {
  BaseCarousel.registerElement("snap-carousel", SnapCarousel);
}
export {
  BaseCarousel,
  ControlsFeature,
  NavFeature,
  PagerFeature,
  SnapCarousel,
  SnapCarouselControls,
  SnapCarouselNav,
  SnapCarouselNavControls,
  SnapCarouselNavPager,
  SnapCarouselPager,
  SnapCarouselPagerControls,
  createCarousel,
  SnapCarousel as default
};
