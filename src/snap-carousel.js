/**
 * SnapCarousel 🚀
 * A lightweight vanilla JavaScript carousel library using modern web technologies
 *
 * Features:
 * - Smooth scrolling with snap points
 * - Responsive breakpoints
 * - Touch and keyboard navigation
 * - Autoplay with pause on hover
 * - RTL support
 * - Vertical mode
 *
 * Events:
 * - scrollstart: Fired when scrolling begins
 * - scrollupdate: Fired during scroll with updated state
 * - scrollend: Fired when scrolling ends
 *
 * @example
 * <snap-carousel displayed="3" gap="20" controls nav>
 *   <div slot="scroller">
 *     <div>Slide 1</div>
 *     <div>Slide 2</div>
 *     <div>Slide 3</div>
 *   </div>
 * </snap-carousel>
 */

import 'scrollyfills';
import hostStyles from './host.css?inline';
import globalStyles from './style.css?inline';
import htmlTemplate from './template.html?raw';

// -----------------------------------------------------------------------------
// Main Carousel Class
// -----------------------------------------------------------------------------

class SnapCarousel extends HTMLElement {
  // Private fields
  #preventUiUpdate = false;
  #preventNextEvent = false;
  #className = 'snp-c';

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
  };

  // Configuration
  #settings = {
    default: {},
    origin: {},
    current: {}
  };

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
      stop: false,        // Stop at each item
      usePause: true,     // Pause autoplay on hover
      vertical: false,    // Vertical orientation
      responsive: []      // Breakpoint configurations
    };
  }

  /**
   * Observed attributes for the web component
   * Includes all config options and their data- prefixed versions
   */
  static get observedAttributes() {
    const keys = Object.keys(SnapCarousel.defaultConfig)
      .map(k => k.replace(/[A-Z]/g, m => "-" + m.toLowerCase()));
    return [...keys, ...keys.map(k => 'data-' + k)];
  }

  /**
   * Constructor: Initialize default settings
   */
  constructor() {
    super();
    this.#settings.default = SnapCarousel.defaultConfig;
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
    const scroller = this.#getSlotElements('scroller', { fallback: true })[0];
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length || mutation.removedNodes.length) {
          this.#computeChildren();
          this.#init();
        }
      });
    });
    observer.observe(scroller, { childList: true });

    // Initial setup
    this.#prepare();
  }

  /**
   * Attribute changed callback: Update settings when attributes change
   */
  attributeChangedCallback() {
    if (this.#state.ready) this.#setup();
  }

  // -----------------------------------------------------------------------------
  // Public API
  // -----------------------------------------------------------------------------

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

  // -----------------------------------------------------------------------------
  // Private Methods: Setup & Initialization
  // -----------------------------------------------------------------------------

  /**
   * Initial carousel preparation
   */
  #prepare() {
    const scroller = this.#getSlotElements('scroller', true)[0];
    if (!scroller) return;

    // Setup event listeners
    scroller.onscroll = this.#onscroll.bind(this);
    scroller.addEventListener('scrollend', this.#onscrollend.bind(this));
    window.addEventListener('resize', this.#resizeEvent.bind(this));

    this.#elements.scroller = scroller;

    // Expose elements and settings
    this.elements = this.#elements;
    this.settings = this.#settings;
    this.state = this.#state;

    // Setup accessibility
    this.ariaRoleDescription = 'carousel';
    Object.assign(scroller, {
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
      this.#createPagination();
      this.#createPager();
      this.#createControls();
      this.#computePadding();
      this.#updateState(0);
    });
  }

  #computeChildren() {
    const items = Array.from(this.#elements.scroller.children).filter(i => !['absolute', 'fixed'].includes(getComputedStyle(i).position));
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
    // Remove previous styles if they exist
    const previousStyles = document.querySelector('#' + this.#state.id + '-styles');
    if (previousStyles) {
      previousStyles.remove();
    }

    const { displayed, gap, padding, perPage, stop, behavior } = this.#settings.current;

    // Create selector for scroll-snap alignment
    const selectRule = perPage > 1 ? `*:nth-child(${perPage}n + 1)` : '*';

    // Generate CSS
    const css = `
      #${this.#state.id} {
        --sc-perpage: ${displayed};
        --sc-gap: ${this.#formatCssValue(gap)};
        --sc-padding: ${this.#formatCssValue(padding)};
        --sc-behavior: ${behavior};
      }
      #${this.#state.id} [slot="scroller"] > ${selectRule} {
        scroll-snap-align: start;
        scroll-snap-stop: ${stop ? 'always' : 'normal'}
      }
    `;

    // Create and append style element
    this.styles = this.#createStyleElement(css, this.#state.id + '-styles');
    document.head.append(this.styles);
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

  // -----------------------------------------------------------------------------
  // Private Methods: Event Handling & Observation
  // -----------------------------------------------------------------------------

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
   * Handle keyboard navigation in pagination
   * @param {KeyboardEvent} event - Keyboard event
   */
  #handleKeyDown(event) {
    const isLtr = this.#isDocumentLtr();
    const activeDot = this.#elements.pagination.dots[this.#state.index] || 0;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowLeft':
        const direction = event.key === 'ArrowRight'
          ? (isLtr ? 'next' : 'previous')
          : (isLtr ? 'previous' : 'next');

        const target = activeDot[`${direction}ElementSibling`];
        if (target) {
          target.click();
          target.focus();
        }
        break;
    }
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
   * @param {Boolean} force
   */
  #updateState(index) {
    if (typeof index !== 'undefined') {
      this.#state.index = index;
    }
    this.#synchronize();
    if (!this.#preventUiUpdate) {
      this.#setActivePaginationItem();
      this.#setCurrentPage();
    }
    this.#setButtonsState();
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
   * Create pagination dots
   * Handles creation and setup of navigation dots
   */
  #createPagination() {
    const { pagination } = this.#elements;
    let { container, dots } = pagination;
    const { current } = this.#settings;

    // Initialize container if not exists
    if (!container) {
      container = this.#getSlotElements('pagination')[0];
      container.addEventListener('keydown', this.#handleKeyDown.bind(this));
      pagination.container = container;
    } else {
      // Reset existing pagination
      container.innerHTML = '';
      dots.forEach(dot => dot.remove());
      this.#elements.pagination.dots = [];
    }

    // Show/hide container based on settings
    container.style.display = current.nav && this.#state.pageCount > 1 ? '' : 'none';

    // Create dots for each page
    if (current.nav && container) {
      for (let index = 0; index < this.#state.pageCount; index++) {
        this.#createMarker(index);
      }
    }
  }

  /**
   * Create page number display
   * Shows current page number and total pages
   */
  #createPager() {
    const { pager } = this.#elements;
    const { current } = this.#settings;

    // Initialize pager elements if not exists
    if (!pager.current) {
      ['current', 'sep', 'total'].forEach(key => {
        pager[key] = this.#getSlotElements(key)[0];
      });
      pager.container = this.shadowRoot.querySelector('[part="pager"]');
    }

    // Show/hide pager based on settings
    pager.container.style.display = current.pager && this.#state.pageCount > 1 ? '' : 'none';
    pager.current.innerHTML = 1;
    pager.total.innerHTML = this.#state.pageCount;
  }

  /**
   * Create navigation controls
   * Sets up previous and next buttons
   */
  #createControls() {
    const { controls } = this.#elements;
    const { current } = this.#settings;

    const hideButtons = !current.controls || this.#state.pageCount < 2;

    // Get all control buttons
    controls.buttons = [
      ...this.#getSlotElements('prev-buttons'),
      ...this.#getSlotElements('next-buttons')
    ];

    controls.buttons.forEach(button => {
      // Show/hide buttons based on settings
      button.style = hideButtons ? 'display: none !important;' : '';

      if (button.hasListener) return;

      // Setup button properties
      button.direction = button.getAttribute('direction') || 'next';
      button.modifier = (button.direction === 'next' ? 1 : -1) *
        (parseInt(button.getAttribute('modifier'), 10) || 1);
      button.hasListener = true;

      // Add click handler
      button.addEventListener('click', () => {
        if (!current.controls) return;
        this.goTo(this.#state.index + button.modifier);
      });

      // Setup accessibility
      Object.assign(button, {
        ariaControls: this.#elements.scroller.id
      });
    });
  }

  /**
   * Create a pagination marker (dot)
   * @param {number} index - Page index for the marker
   */
  #createMarker(index) {
    const { pagination } = this.#elements;
    const { container, dots } = pagination;

    // Create button element
    const dot = document.createElement('button');
    dot.innerHTML = index + 1;
    dot.addEventListener('click', () => this.goTo(index));

    // Setup accessibility attributes
    Object.assign(dot, {
      type: 'button',
      part: 'button nav-button',
      ariaControls: this.#elements.scroller.id,
      ariaSelected: false
    });

    container.append(dot);
    dots.push(dot);
  }

  /**
   * Update active pagination dot
   */
  #setActivePaginationItem() {
    if (!this.#settings.current.nav) return;

    const { pagination } = this.#elements;
    let { dots, active } = pagination;
    const next = dots[this.#state.index];

    if (next) {
      // Update previous active dot
      if (active) {
        Object.assign(active, {
          tabIndex: 0,
          ariaSelected: false
        });
        active.part = 'button nav-button';
      }

      // Update new active dot
      next.part = 'button nav-button active';
      Object.assign(next, {
        tabIndex: -1,
        ariaSelected: true
      });
      pagination.active = next;
    }
  }

  /**
   * Update current page number display
   */
  #setCurrentPage() {
    if (!this.#settings.current.pager) return;
    this.#elements.pager.current.innerHTML = this.#state.index + 1;
  }

  /**
   * Update navigation button states
   */
  #setButtonsState() {
    const { loop } = this.#settings.current;
    const { buttons } = this.#elements.controls;
    const { index, pageCount } = this.#state;
    let shouldShiftFocus = false;

    buttons.forEach(button => {
      // Determine if button should be disabled
      const isDisabled = !loop && (
        button.direction === 'next'
          ? index >= pageCount - button.modifier
          : index < Math.abs(button.modifier)
      );

      // Track if focus needs to be moved
      if (button === this.shadowRoot.activeElement && isDisabled) {
        shouldShiftFocus = true;
      }

      button.disabled = isDisabled ? 'disabled' : '';
    });

    // Move focus if needed
    if (shouldShiftFocus) {
      const active = buttons.filter(b => !b.disabled);
      if (active.length) {
        active[0].focus();
      }
    }
  }

  /**
   * Synchronize other carousels with current index
   */
  #synchronize() {
    const { sync } = this.#settings.current;

    if (sync && this.#state.ready) {
      this.#elements.sync = this.#elements.sync || document.querySelectorAll(sync) || [];

      this.#elements.sync.forEach(carousel => {
        if (carousel instanceof SnapCarousel) {
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
}

if (window.customElements) {
  customElements.define('snap-carousel', SnapCarousel);
}
