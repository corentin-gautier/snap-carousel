import hostStyles from './host.css?inline';
import globalStyles from './style.css?inline';
import htmlTemplate from './template.html?raw';

// Shared by every instance, created on first use
let template, hostSheet;

const createSheet = css => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  return sheet;
};

const toPx = value => typeof value === 'string' ? value : value + 'px';

// -----------------------------------------------------------------------------
// Base Carousel Class
// -----------------------------------------------------------------------------

export class BaseCarousel extends HTMLElement {
  #preventUiUpdate = false;
  #internals;
  #observers = [];
  #slideObserver = null;
  #mediaListeners = null;

  // State management
  #state = {
    index: 0,
    itemsCount: 0,
    pageCount: 0,
    pages: [],
    isVisible: false,
    autoplayInterval: null,
    breakpoint: undefined,
    ready: false,
    isMoving: false,
    pause: false
  };

  // DOM Elements
  #elements = {
    scroller: null,
    items: [],
    sync: null
  };

  // Configuration
  #settings = {
    default: {},
    origin: {},
    current: {}
  };

  // Feature lifecycle hooks
  #featureHooks = {
    setup: [],
    init: [],
    updateState: []
  };

  // Public getters for feature access
  get elements() { return this.#elements; }
  get settings() { return this.#settings; }
  get state() { return this.#state; }
  get preventUiUpdate() { return this.#preventUiUpdate; }
  // Custom states, matched with :state() in CSS
  get states() { return this.#internals.states; }

  getSlotElements(slotName, options) {
    return this.#getSlotElements(slotName, options);
  }

  /**
   * Whether the carousel's own direction (inherited from any ancestor) is LTR
   */
  isLtr() {
    return getComputedStyle(this).direction !== 'rtl';
  }

  // Register feature hooks
  registerHook(type, callback) {
    this.#featureHooks[type]?.push(callback);
  }

  /**
   * Attach a feature after construction (used for lazy loaded features)
   * @param {(carousel: BaseCarousel) => void} feature
   */
  use(feature) {
    const count = this.#featureHooks.init.length;
    feature(this);
    if (this.#state.ready) {
      this.#featureHooks.init.slice(count).forEach(callback => callback.call(this));
    }
  }

  #executeHooks(type, ...args) {
    this.#featureHooks[type].forEach(callback => callback.apply(this, args));
  }

  /**
   * Default configuration options
   */
  static get defaultConfig() {
    return {
      autoplay: 0,          // Autoplay interval in ms (0 = disabled)
      displayed: 1,         // Number of items visible at once
      perPage: 1,           // Number of items to scroll per page
      gap: 0,               // Gap between items
      padding: 0,           // Padding around the carousel
      controls: false,      // Show prev/next buttons
      nav: false,           // Show navigation dots
      pager: false,         // Show page numbers
      prevLabel: 'Previous', // Text of the default previous button
      nextLabel: 'Next',    // Text of the default next button
      loop: false,          // Loop around when reaching the end
      behavior: 'smooth',   // Scroll behavior
      stop: false,          // Stop at each item
      usePause: true,       // Pause autoplay on hover and focus
      vertical: false,      // Vertical orientation
      responsive: [],       // Breakpoint configurations
      sync: null            // Selector for other carousels to sync with
    };
  }

  /**
   * Observed attributes for the web component
   * Includes all config options and their data- prefixed versions
   */
  static get observedAttributes() {
    const keys = Object.keys(BaseCarousel.defaultConfig)
      .map(k => k.replace(/[A-Z]/g, m => '-' + m.toLowerCase()));
    return ['options', ...keys, ...keys.map(k => 'data-' + k)];
  }

  constructor() {
    super();
    this.#settings.default = BaseCarousel.defaultConfig;

    if (!template) {
      template = document.createElement('template');
      template.innerHTML = htmlTemplate;
      hostSheet = createSheet(hostStyles);
      document.adoptedStyleSheets.push(createSheet(globalStyles));
    }

    this.attachShadow({ mode: 'open' }).append(template.content.cloneNode(true));
    this.shadowRoot.adoptedStyleSheets = [hostSheet];

    const internals = this.#internals = this.attachInternals();
    internals.role = 'region';
    internals.ariaRoleDescription = 'carousel';
  }

  connectedCallback() {
    const scroller = this.#elements.scroller ||= this.#getSlotElements('scroller', { fallback: true })[0];

    // If no scroller element is found, return
    if (!scroller) return;

    if (!this.#state.ready) {
      this.#identify();

      scroller.setAttribute('snpc-s', '');
      scroller.role = 'list';
      scroller.onscroll = () => this.#onscroll();

      // Only download the scrollend polyfill in browsers that need it
      ('onscrollend' in window ? Promise.resolve() : import('scrollyfills')).then(() => {
        scroller.addEventListener('scrollend', () => this.#onscrollend());
      });

      // Pause autoplay while the carousel is hovered or has focus.
      // Deferred so :focus-within reflects where focus lands after a focusout.
      const onInteraction = () => setTimeout(() => {
        this.#state.pause = this.#settings.current.usePause && this.matches(':hover, :focus-within');
        this.#setPlayPause();
      });
      ['mouseenter', 'mouseleave', 'focusin', 'focusout'].forEach(type => this.addEventListener(type, onInteraction));
    }

    this.#observe();
    this.#computeChildren();
    this.#setup();

    this.#state.ready = true;
  }

  disconnectedCallback() {
    this.#observers.forEach(observer => observer.disconnect());
    this.#mediaListeners?.abort();
    this.#setPlayPause();
  }

  attributeChangedCallback() {
    if (this.#state.ready && this.isConnected) this.#setup();
  }

  /**
   * Navigate to a specific page
   * @param {number} page - Page index to navigate to
   */
  goTo(page) {
    const { scroller, items } = this.#elements;
    const { perPage, vertical, loop } = this.#settings.current;
    const { pageCount } = this.#state;

    if (!pageCount) return;

    const index = loop
      ? (page % pageCount + pageCount) % pageCount
      : Math.max(0, Math.min(page, pageCount - 1));

    this.#preventUiUpdate = false;
    this.#updateState(index);
    this.#preventUiUpdate = true;

    // Align the target's inline-start (or top) with the scroller's snap area.
    // Working from rects keeps this independent of direction and scrollLeft sign.
    const target = items[index * perPage].getBoundingClientRect();
    const port = scroller.getBoundingClientRect();
    const style = getComputedStyle(scroller);

    if (vertical) {
      scroller.scrollTo({ top: scroller.scrollTop + target.top - port.top - (parseFloat(style.scrollPaddingTop) || 0) });
    } else {
      scroller.scrollTo({
        left: scroller.scrollLeft + (this.isLtr()
          ? target.left - port.left - (parseFloat(style.scrollPaddingLeft) || 0)
          : target.right - port.right + (parseFloat(style.scrollPaddingRight) || 0))
      });
    }
  }

  prev() {
    this.goTo(this.#state.index - 1);
  }

  next() {
    this.goTo(this.#state.index + 1);
  }

  /**
   * Read attributes and listen to responsive breakpoints
   */
  #setup() {
    const origin = this.#settings.origin = Object.assign({},
      this.#settings.default,
      this.#getNodeConfig()
    );

    this.#state.breakpoint = undefined;
    this.#mediaListeners?.abort();
    this.#mediaListeners = new AbortController();

    // Breakpoints apply above their width, like the former `breakpoint < innerWidth` check
    origin.responsive = (origin.responsive || [])
      .sort((a, b) => a.breakpoint - b.breakpoint)
      .map(config => {
        const query = matchMedia(`(width > ${+config.breakpoint}px)`);
        query.addEventListener('change', () => this.#getCurrentConfig(), { signal: this.#mediaListeners.signal });
        return { ...config, query };
      });

    this.#executeHooks('setup');
    this.#getCurrentConfig();
  }

  #init() {
    this.#setPages();
    this.#createStyles();
    this.#updateState(0);
    this.#executeHooks('init');
    this.#setPlayPause();
  }

  #computeChildren() {
    const items = Array.from(this.#elements.scroller.children)
      .filter(i => !['absolute', 'fixed', 'sticky'].includes(getComputedStyle(i).position));
    const count = items.length;

    this.#elements.items = items;
    this.#state.itemsCount = count;
    this.#slideObserver.disconnect();

    items.forEach((item, i) => {
      item.id ||= `${this.id}-slide-${i}`;
      item.dataset.index = i;
      Object.assign(item, {
        ariaSetSize: count,
        ariaPosInSet: i + 1,
        ariaRoleDescription: 'slide',
        role: 'listitem'
      });
      this.#slideObserver.observe(item);
    });
  }

  /**
   * Adds unique ids, keeping the ones set by the user
   */
  #identify() {
    this.id ||= 'snap-carousel-' + (Math.random() + 1).toString(36).substring(4);
    this.#elements.scroller.id ||= this.id + '-scroller';
  }

  /**
   * Get configuration from element attributes
   * Supports both regular and data- prefixed attributes
   */
  #getNodeConfig() {
    const options = Object.keys(this.#settings.default);

    if (this.attributes.options) {
      return this.#maybeParse(this.attributes.options.value);
    }

    return Array.from(this.attributes).reduce((config, attr) => {
      const name = attr.name.replace('data-', '')
        .replace(/-([a-z])/g, g => g[1].toUpperCase());

      if (options.includes(name)) {
        config[name] = this.#maybeParse(attr.value);
      }
      return config;
    }, {});
  }

  #maybeParse(value) {
    if (value === '') return true;
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  /**
   * Merge the settings of the widest matching breakpoint
   */
  #getCurrentConfig() {
    const { origin } = this.#settings;
    const match = origin.responsive.findLast(config => config.query.matches) || { breakpoint: null };
    const current = Object.assign({}, origin, match.settings);

    // Ensure perPage doesn't exceed displayed items
    current.perPage = Math.min(current.displayed, current.perPage);

    this.#settings.current = current;

    if (this.#state.breakpoint !== match.breakpoint) {
      this.#state.breakpoint = match.breakpoint;
      this.#init();
    }
  }

  #setPages() {
    const { displayed, perPage } = this.#settings.current;
    const { itemsCount } = this.#state;

    // Pages that can't be reached when displayed > perPage
    const unreachable = Math.floor((displayed - perPage) / perPage);

    this.#state.pageCount = Math.max(0, Math.ceil(itemsCount / perPage) - unreachable);
    this.#state.pages = Array.from({ length: this.#state.pageCount }, (_, page) =>
      this.#elements.items.slice(page * perPage, page * perPage + perPage)
    );
  }

  /**
   * Set sizing variables and scroll-snap anchors
   */
  #createStyles() {
    const { displayed, gap, padding, perPage, stop, behavior, prevLabel, nextLabel } = this.#settings.current;

    // Labels become CSS strings for the native buttons' content
    Object.entries({
      perpage: displayed,
      gap: toPx(gap),
      padding: toPx(padding),
      behavior,
      'prev-label': JSON.stringify(String(prevLabel)),
      'next-label': JSON.stringify(String(nextLabel))
    })
      .forEach(([name, value]) => this.style.setProperty('--' + name, value));

    // sc-page marks the first slide of each reachable page (native scroll markers)
    this.#elements.items.forEach((item, index) => {
      const anchor = index % perPage === 0;
      item.classList.toggle('sc-anchor', anchor);
      item.classList.toggle('sc-anchor-stop', anchor && !!stop);
      item.classList.toggle('sc-page', anchor && index / perPage < this.#state.pageCount);
    });
  }

  /**
   * Create the observers, re-created on every connection
   */
  #observe() {
    const { scroller } = this.#elements;

    const contentObserver = new MutationObserver(() => {
      this.#computeChildren();
      this.#init();
    });
    contentObserver.observe(scroller, { childList: true });

    // Autoplay only runs while the carousel is on screen
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      this.#state.isVisible = entry.intersectionRatio > 0.1;
      this.#setPlayPause();
    }, { threshold: [0.1, 0.9] });
    visibilityObserver.observe(this);

    // Slides scrolled out of the scroller are made inert
    this.#slideObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.toggleAttribute('visible', entry.isIntersecting);
        entry.target.toggleAttribute('inert', !entry.isIntersecting);
      });
    }, { root: scroller, threshold: 0.6 });

    this.#observers = [contentObserver, visibilityObserver, this.#slideObserver];
  }

  #onscroll() {
    if (!this.#state.isMoving) {
      this.#state.isMoving = true;
      this.#triggerEvent('scrollstart');
    }

    const current = this.#getCurrent();

    if (current !== this.#state.index) {
      this.#updateState(current);
      this.#triggerEvent('scrollupdate');
    }
  }

  #onscrollend() {
    this.#triggerEvent('scrollend');
    this.#preventUiUpdate = false;
    this.#state.isMoving = false;
    this.#updateState();
    this.#setPlayPause();
  }

  #triggerEvent(name) {
    this.dispatchEvent(new CustomEvent(name, { detail: this.#state }));
  }

  #updateState(index) {
    if (index !== undefined) {
      this.#state.index = index;
    }

    this.#synchronize();

    if (this.#preventUiUpdate) return;

    this.#executeHooks('updateState', index);
  }

  /**
   * Compute the current page from the slide closest to the snap area start
   */
  #getCurrent() {
    const { scroller, items } = this.#elements;
    const { perPage, vertical } = this.#settings.current;
    const port = scroller.getBoundingClientRect();
    const style = getComputedStyle(scroller);
    const ltr = this.isLtr();

    const offset = rect => vertical
      ? rect.top - port.top - (parseFloat(style.scrollPaddingTop) || 0)
      : ltr
        ? rect.left - port.left - (parseFloat(style.scrollPaddingLeft) || 0)
        : port.right - rect.right - (parseFloat(style.scrollPaddingRight) || 0);

    let closest = 0;
    let min = Infinity;

    items.forEach((item, index) => {
      const distance = Math.abs(offset(item.getBoundingClientRect()));
      if (distance < min) {
        min = distance;
        closest = index;
      }
    });

    return Math.ceil(closest / perPage);
  }

  /**
   * Synchronize other carousels with current index
   */
  #synchronize() {
    const { sync } = this.#settings.current;
    const { index, ready } = this.#state;

    if (!sync || !ready) return;

    this.#elements.sync ||= Array.from(document.querySelectorAll(sync));
    this.#elements.sync.forEach(carousel => {
      // Checking the index avoids an endless loop between carousels synced both ways
      if (carousel instanceof BaseCarousel && carousel.state.index !== index) {
        carousel.goTo(index);
      }
    });
  }

  /**
   * Retrieve elements assigned to a slot or its default content
   */
  #getSlotElements(slotName, options = { fallback: false }) {
    const slot = this.shadowRoot.querySelector(`[name="${slotName}"]`);
    let assigned = slot.assignedElements();

    // Use the first child as scroller if nothing is slotted
    if (options.fallback && !assigned.length) {
      const first = this.firstElementChild;
      if (first && !first.slot) {
        first.slot = slotName;
        assigned = slot.assignedElements();
      }
    }

    return Array.from(assigned.length ? assigned : slot.children);
  }

  /**
   * Start or stop the autoplay timer
   */
  #setPlayPause() {
    const { autoplay } = this.#settings.current;
    const { pause, isVisible, pageCount } = this.#state;
    const playing = autoplay > 0 && !pause && isVisible && this.isConnected;

    if (!playing) {
      clearTimeout(this.#state.autoplayInterval);
      this.#state.autoplayInterval = null;
    } else if (!this.#state.autoplayInterval) {
      this.#state.autoplayInterval = setTimeout(() => {
        this.#state.autoplayInterval = null;
        // Autoplay always rewinds, even without loop
        this.goTo(this.#state.index + 1 < pageCount ? this.#state.index + 1 : 0);
      }, autoplay);
    }

    // Don't announce every slide change while it rotates on its own
    if (this.#elements.scroller) {
      this.#elements.scroller.ariaLive = playing ? 'off' : 'polite';
    }
  }

  static setVisibility(element, condition) {
    condition ? element.removeAttribute('style') : element.setAttribute('style', 'display: none!important;');
  }

  /**
   * Define a custom element, unless the name is already taken
   */
  static registerElement(name, constructor) {
    if (window.customElements && !customElements.get(name)) {
      customElements.define(name, constructor);
    }
  }
}

/**
 * Compose carousel with selected features
 * @param {...Function} features - Feature mixins to apply
 * @returns {typeof BaseCarousel} Enhanced carousel class
 */
export function createCarousel(...features) {
  return features.reduce((CarouselClass, feature) => feature(CarouselClass), BaseCarousel);
}
