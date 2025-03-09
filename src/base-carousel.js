import 'scrollyfills';
import hostStyles from './host.css?inline';
import globalStyles from './style.css?inline';
import htmlTemplate from './template.html?raw';

// -----------------------------------------------------------------------------
// Base Carousel Class
// -----------------------------------------------------------------------------

export class BaseCarousel extends HTMLElement {
  // Private fields
  #preventUiUpdate = false;
  #preventNextEvent = false;
  #className = 'snap-carousel';
  #initialStyle = '';

  // State management
  #state = {
    index: 0,
    itemsCount: 0,
    pageCount: 0,
    isVisible: false,
    autoplayInterval: null,
    breakpoint: undefined,
    ready: false,
    isMoving: false,
    pause: false,
    computedPadding: 0
  };

  // DOM Elements
  #elements = {
    scroller: null,
    items: null,
    sync: null
  };

  // Configuration
  #settings = {
    default: {},
    origin: {},
    current: {}
  };

  // Public getters for feature access
  get elements() { return this.#elements; }
  get settings() { return this.#settings; }
  get state() { return this.#state; }
  get preventUiUpdate() { return this.#preventUiUpdate; }

  // Protected methods for features
  getSlotElements(slotName, options = { fallback: false }) {
    return this.#getSlotElements(slotName, options);
  }

  isDocumentLtr() {
    return this.#isDocumentLtr();
  }

  // Feature lifecycle hooks
  #featureHooks = {
    init: [],
    updateState: []
  };

  // Register feature hooks
  registerHook(type, callback) {
    if (this.#featureHooks[type]) {
      this.#featureHooks[type].push(callback);
    }
  }

  // Execute feature hooks
  #executeHooks(type, ...args) {
    if (this.#featureHooks[type]) {
      this.#featureHooks[type].forEach(callback => callback.apply(this, args));
    }
  }

  /**
   * Default configuration options
   */
  static get defaultConfig() {
    return {
      autoplay: 0,          // Autoplay interval in ms (0 = disabled)
      displayed: 1,         // Number of items visible at once
      perPage: 1,          // Number of items to scroll per page
      gap: 0,              // Gap between items
      padding: 0,          // Padding around the carousel
      controls: false,      // Show prev/next buttons
      nav: false,          // Show navigation dots
      pager: false,        // Show page numbers
      loop: false,         // Loop around when reaching the end
      behavior: 'smooth',  // Scroll behavior
      stop: false,         // Stop at each item
      usePause: true,      // Pause autoplay on hover
      vertical: false,     // Vertical orientation
      responsive: [],      // Breakpoint configurations
      sync: null           // Selector for other carousels to sync with
    };
  }

  /**
   * Observed attributes for the web component
   * Includes all config options and their data- prefixed versions
   */
  static get observedAttributes() {
    const keys = Object.keys(BaseCarousel.defaultConfig)
      .map(k => k.replace(/[A-Z]/g, m => "-" + m.toLowerCase()));
    return [...keys, ...keys.map(k => 'data-' + k)];
  }

  /**
   * Constructor: Initialize default settings
   */
  constructor() {
    super();
    this.#settings.default = BaseCarousel.defaultConfig;
    // Store initial style to avoid overriding it
    this.#initialStyle = this.getAttribute('style');
    this.setAttribute('snpc', '');
  }

  /**
   * Connected callback: Setup the carousel when added to DOM
   */
  connectedCallback() {
    if (!this.isConnected) return;

    // Create and attach shadow DOM
    const template = document.createElement('template');
    template.innerHTML = `<style>${hostStyles}</style>${htmlTemplate}`;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Setup mutation observer for dynamic content
    this.#elements.scroller = this.#getSlotElements('scroller', { fallback: true })[0];

    // If no scroller element is found, return
    if (!this.#elements.scroller) return;

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length || mutation.removedNodes.length) {
          this.#computeChildren();
          this.#init();
        }
      });
    });
    observer.observe(this.#elements.scroller, { childList: true });

    // Setup event listeners
    this.#elements.scroller.setAttribute('snpc-s', '');
    this.#elements.scroller.onscroll = this.#onscroll.bind(this);
    this.#elements.scroller.addEventListener('scrollend', this.#onscrollend.bind(this));
    window.addEventListener('resize', this.#resizeEvent.bind(this));

    // Setup accessibility
    this.ariaRoleDescription = 'carousel';
    Object.assign(this.#elements.scroller, {
      role: 'group',
      ariaLive: 'polite',
      ariaAtomic: false
    });

    // Initialize carousel
    this.#computeChildren();
    this.#addGlobalStyles();
    this.#identify();
    this.#setup();
    this.#observe();

    this.#state.ready = true;
  }

  /**
   * Attribute changed callback: Update settings when attributes change
   */
  attributeChangedCallback() {
    if (this.#state.ready) this.#setup();
  }

  /**
   * Navigate to a specific page
   * @param {number} page - Page index to navigate to
   */
  goTo(page) {
    this.#preventUiUpdate = false;
    const { scroller, items } = this.#elements;
    const { perPage, vertical } = this.#settings.current;

    // Calculate target page
    const index = page > this.#state.pageCount - 1
      ? 0
      : (page < 0 ? this.#state.pageCount - 1 : page);

    const target = items[index * perPage];

    this.#updateState(index);
    this.#state.ready = true;

    // Calculate scroll position
    let top = 0, left = 0;
    if (vertical) {
      top = target.offsetTop;
    } else {
      left = this.#isDocumentLtr()
        ? target.offsetLeft
        : (target.offsetLeft + target.offsetWidth) - scroller.offsetWidth;
    }

    // Perform scroll
    this.#preventUiUpdate = true;
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

  /**
   * Setup carousel configuration
   */
  #setup() {
    this.#state.breakpoint = undefined;
    this.#settings.origin = Object.assign({},
      this.#settings.default,
      this.#getNodeConfig()
    );

    // Sort responsive breakpoints
    this.#settings.origin.responsive = (this.#settings.origin.responsive || [])
      .sort((a, b) => a.breakpoint - b.breakpoint);

    this.#getCurrentConfig();
  }

  /**
   * Initialize carousel after setup
   */
  #init() {
    this.#waitForWidth(() => {
      this.#setPages();
      this.#createStyles();
      this.#computePadding();
      this.#updateState(0);
      this.#executeHooks('init');
    });
  }

  #computeChildren() {
    const items = Array.from(this.#elements.scroller.children).filter(i => !['absolute', 'fixed', 'sticky'].includes(getComputedStyle(i).position));
    const count = items.length;
    this.#elements.items = items;
    this.#state.itemsCount = count;

    // Store item index in a data attribute
    items.forEach((item, i) => {
      item.dataset.index = i;
      Object.assign(item, {
        ariaSetSize: count,
        ariaPosInSet: i + 1,
        ariaRoleDescription: 'slide',
        role: 'listitem'
      });
    });
  }

  /**
   * Add carousel base styles in the document head
   * @returns
   */
  #addGlobalStyles() {
    const classname = this.#className;
    const id = `${classname}-global-styles`;
    if (document.querySelector('#' + id)) {
      return;
    }
    const css = globalStyles;
    document.head.append(this.#createStyleElement(css, id));
  }

  /**
   * Adds unique ids and classes
   */
  #identify() {
    this.id = this.#state.id = this.#className + '-' + (Math.random() + 1).toString(36).substring(4);
  }

  /**
   * Wait for the scroller element to have a width before initializing
   * Uses requestAnimationFrame for efficient polling
   * @param {Function} callback - Function to call once width is available
   */
  #waitForWidth(callback) {
    if (this.#elements.scroller.clientWidth) {
      callback();
    } else {
      requestAnimationFrame(() => {
        this.#waitForWidth(callback);
      });
    }
  }

  /**
   * Get configuration from element attributes
   * Supports both regular and data- prefixed attributes
   * @returns {Object} Configuration object from attributes
   */
  #getNodeConfig() {
    const options = Object.keys(this.#settings.default);

    // Check for options attribute first
    if (this.attributes.options) {
      return this.#maybeParse(this.attributes.options.value);
    }

    // Process individual attributes
    return Array.from(this.attributes).reduce((config, attr) => {
      // Convert kebab-case to camelCase and remove data- prefix
      const name = attr.name.replace('data-', '')
        .replace(/-([a-z])/g, g => g[1].toUpperCase());

      // Only include valid options
      if (options.includes(name)) {
        config[name] = this.#maybeParse(attr.value);
      }
      return config;
    }, {});
  }

  /**
   * Safely parse a string value into a JavaScript value
   * @param {string} value - The string to parse
   * @returns {any} Parsed value or original string if parsing fails
   */
  #maybeParse(value) {
    if (value === '') return true;
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  /**
   * Get configuration for current breakpoint
   * Merges default config with responsive breakpoint settings
   */
  #getCurrentConfig() {
    const { origin } = this.#settings;

    // Find matching breakpoint
    const match = origin.responsive.reduce((match, config) =>
      config.breakpoint < window.innerWidth ? config : match,
      { breakpoint: null }
    );

    // Merge configurations
    const current = Object.assign({}, origin, match.settings || {});

    // Ensure perPage doesn't exceed displayed items
    current.perPage = Math.min(current.displayed, current.perPage);

    this.#settings.current = current;

    // Reinitialize if breakpoint changed
    if (this.#state.breakpoint !== match.breakpoint) {
      this.#state.breakpoint = match.breakpoint;
      this.#init();
    }
  }

  /**
   * Calculate and store the number of pages
   * Accounts for displayed items and items per page
   */
  #setPages() {
    const { current } = this.#settings;
    const { itemsCount } = this.#state;

    // Calculate unnecessary pages when displayed > perPage
    const unecessaryPagesCount = Math.floor(
      (current.displayed - current.perPage) / current.perPage
    );

    this.#state.pageCount = Math.ceil(itemsCount / current.perPage) - unecessaryPagesCount;
  }

  /**
   * Create and apply carousel styles
   * Generates CSS variables and scroll-snap rules
   */
  #createStyles() {
    const { displayed, gap, padding, perPage, stop, behavior } = this.#settings.current;
    const formatedGap = this.#formatCssValue(gap);
    const formatedPadding = this.#formatCssValue(padding);

    // Create selector for scroll-snap alignment
    const anchorClass = `sc-anchor${stop ? '-stop' : ''}`;

    this.style = `--perpage: ${displayed};--gap: ${formatedGap};--padding: ${formatedPadding};--behavior: ${behavior};${this.#initialStyle}`;

    this.elements.items.forEach((item, index) => {
      if (index % perPage === 0) {
        item.classList.add(anchorClass);
      } else {
        item.classList.remove(anchorClass);
      }
    });
  }

  /**
   * Calculate and store the computed padding
   * Used for scroll position calculations
   */
  #computePadding() {
    const { vertical } = this.#settings.current;
    const property = vertical ? 'padding-top' : 'padding-left';

    this.#state.computedPadding = parseInt(
      getComputedStyle(this.#elements.scroller)[property],
      10
    );
  }

  /**
   * Setup intersection and mutation observers
   * Handles visibility changes and content updates
   */
  #observe() {
    const { items, scroller } = this.#elements;

    // Intersection observer for carousel visibility
    const visibilityObserver = new IntersectionObserver(entries => {
      const entry = entries[0];
      this.#state.isVisible = entry.intersectionRatio > 0.1;
      this.#state.pause = !this.#state.isVisible;
      this.#setPlayPause();
    }, {
      threshold: [0.1, 0.9]
    });

    visibilityObserver.observe(this);

    // Setup pause on hover if enabled
    if (this.#settings.current.usePause) {
      this.addEventListener('mouseenter', () => {
        this.#state.pause = true;
        this.#setPlayPause();
      });

      this.addEventListener('mouseleave', () => {
        this.#state.pause = false;
        this.#setPlayPause();
      });
    }

    // Intersection observer for slide visibility
    const slideObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.toggleAttribute('visible', entry.isIntersecting);
        entry.target.toggleAttribute('inert', !entry.isIntersecting);
      });
    }, {
      scroller,
      threshold: 0.6
    });

    items.forEach(item => slideObserver.observe(item));
  }

  /**
   * Handle window resize events
   * Debounces updates to prevent excessive recalculation
   */
  #resizeEvent() {
    clearTimeout(this.resizeTm);
    this.resizeTm = setTimeout(() => {
      this.#computePadding();
      this.#getCurrentConfig();
    }, 100);
  }

  /**
   * Handle scroll events
   * Updates state and triggers events during scrolling
   */
  #onscroll() {
    if (this.#preventNextEvent) return;

    this.#onscrollstart();
    this.newIndex = this.#state.index;

    const current = this.#getCurrent();

    if (current !== this.#state.index) {
      this.newIndex = current;
      this.#updateState(current);
      this.#triggerEvent('scrollupdate');
    }
  }

  /**
   * Handle scroll start
   * Triggers scrollstart event when scrolling begins
   */
  #onscrollstart() {
    if (!this.#state.isMoving) {
      this.#triggerEvent('scrollstart');
    }
    this.#state.isMoving = true;
  }

  /**
   * Handle scroll end
   * Updates state and triggers events when scrolling ends
   */
  #onscrollend() {
    if (this.#preventNextEvent) return;

    this.#triggerEvent('scrollend');
    this.#preventUiUpdate = false;
    this.#state.isMoving = false;

    if (typeof this.newIndex === 'number') {
      this.#updateState(this.newIndex);
      this.newIndex = null;
    } else {
      this.#updateState(this.#state.index);
    }

    this.#setPlayPause();
  }

  /**
   * Dispatch a custom event
   * @param {string} name - Event name to trigger
   */
  #triggerEvent(name) {
    const { current } = this.#settings;

    this.dispatchEvent(
      new CustomEvent(name, {
        detail: this.#state
      })
    );

    // Call event handler if defined in settings
    if (current['on' + name]) {
      current['on' + name](this);
    }
  }

  /**
   * Update the dots/controls state
   * @param {Number} index
   */
  #updateState(index) {
    if (typeof index !== 'undefined') {
      this.#state.index = index;
    }

    this.#synchronize();

    if (this.#preventUiUpdate) return;

    this.#executeHooks('updateState', index);
  }

  /**
   * Compute the current slide index
   * @returns {Number} the current slide index
   */
  #getCurrent(node) {
    const { scroller, items } = this.#elements;
    const { perPage, vertical } = this.#settings.current;

    const isLtr = this.#isDocumentLtr();

    let refPoint = 0;

    if (vertical) {
      refPoint = scroller.scrollTop;
    } else {
      refPoint = isLtr ? scroller.scrollLeft : scroller.scrollLeft + scroller.clientWidth;
    }

    let closest = items.map(i => {
      let distance = 0;
      if (vertical) {
        distance = i.offsetTop - (this.#state.computedPadding || 0) - refPoint;
      } else {
        distance = (isLtr ? i.offsetLeft : i.offsetLeft + i.clientWidth) - (this.#state.computedPadding || 0) - refPoint;
      }
      return {
        index: parseInt(i.dataset.index, 10),
        distance: Math.abs(distance)
      };
    }).reduce((a, b) => !a || b.distance < a.distance ? b : a, null);

    if (node) return closest;

    return Math.ceil(closest.index / perPage);
  }

  /**
   * Synchronize other carousels with current index
   */
  #synchronize() {
    const { sync } = this.#settings.current;

    if (sync && this.#state.ready) {
      this.#elements.sync = this.#elements.sync || Array.from(document.querySelectorAll(sync));

      this.#elements.sync.forEach(carousel => {
        if (carousel instanceof BaseCarousel) {
          carousel.goTo(this.#state.index);
        }
      });
    }
  }

  /**
   * Retrieve elements assigned to a slot or default elements
   * @param {string} slotName - Name of the slot to query
   * @param {Object} options - Options object
   * @param {boolean} [options.fallback=false] - Whether to fallback to first child if slot is empty
   * @returns {Array<HTMLElement>} Array of elements
   */
  #getSlotElements(slotName, options = { fallback: false }) {
    const slot = this.shadowRoot.querySelector(`[name="${slotName}"]`);
    let assigned = slot.assignedElements();

    // Fallback to first child if slot is empty and fallback is enabled
    if (options.fallback && !assigned.length) {
      if (this.children[0].slot === '') {
        this.children[0].slot = 'scroller';
        assigned = slot.assignedElements();
      }
    }

    return Array.from(assigned.length ? assigned : slot.children);
  }

  /**
   * Create a style element with given CSS
   * @param {string} css - CSS content
   * @param {string} id - ID for the style element
   * @returns {HTMLStyleElement} Created style element
   */
  #createStyleElement(css, id) {
    const styles = document.createElement('style');
    styles.id = id;
    styles.append(document.createTextNode(css));
    return styles;
  }

  /**
   * Check if document is in LTR mode
   * @returns {boolean} True if document is LTR
   */
  #isDocumentLtr() {
    return document.firstElementChild.getAttribute('dir') !== 'rtl';
  }

  /**
   * Format a CSS value, adding 'px' if needed
   * @param {string|number} value - Value to format
   * @returns {string} Formatted CSS value
   */
  #formatCssValue(value) {
    return typeof value === 'string' ? value : value + 'px';
  }

  /**
   * Activate/deactivate the automatic goTo
   */
  #setPlayPause() {
    if (!this.#settings.current.autoplay) return;

    const { pause, isVisible } = this.#state;

    if (!pause && isVisible) {
      if (!this.#state.autoplayInterval) {
        this.#state.autoplayInterval = setTimeout(() => {
          this.#state.autoplayInterval = null;
          this.goTo(this.#state.index + 1);
        }, this.#settings.current.autoplay);
      }
    } else {
      clearTimeout(this.#state.autoplayInterval);
      this.#state.autoplayInterval = null;
    }
  }

  static setVisibility(element, condition) {
    condition ? element.removeAttribute('style') : element.setAttribute('style', 'display: none!important;');
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
}

/**
 * Compose carousel with selected features
 * @param {...Function} features - Feature mixins to apply
 * @returns {typeof BaseCarousel} Enhanced carousel class
 */
export function createCarousel(...features) {
  return features.reduce((CarouselClass, feature) => feature(CarouselClass), BaseCarousel);
}
