/**
 * SnapCarousel 🚀
 * A carousel using scroll-snap features
 *
 * Events:
 * Using addEeventListener on the element you can listen to the following events
 * - scrollstart
 * - scrollupdate
 * - scrollend
 *
 * Configuration:
 * the available options are
 * - displayed (number),
 * - perPage (number),
 * - gap (string|number),
 * - padding (string|number),
 * - controls (boolean),
 * - nav (boolean),
 * - loop (boolean),
 * - behaviour (string),
 * - stop (boolean)
 * - responsive (array)
 *   - breakpoint (number)
 *   - config : any of the previous options
 */

import hostStyles from './host.css?inline';
import globalStyles from './style.css?inline';
import htmlTemplate from './template.html?raw';

// Scrollend polyfill
if (!("onscrollend" in window)) {
  const s = new Event("scrollend"), i = new Set;
  document.addEventListener("touchstart", e => { for (let t of e.changedTouches) i.add(t.identifier) }, { passive: !0 });
  document.addEventListener("touchend", e => { for (let t of e.changedTouches) i.delete(t.identifier) }, { passive: !0 });
  const l = new WeakMap;
  function e(e, t, n) { let o = e[t]; e[t] = function() { n.apply(this, [o, ...arguments]) } }
  function t(e, t, n) {
    if (t !== "scroll" && t !== "scrollend") return;
    const r = this, d = l.get(r) || { scrollListener: e => { clearTimeout(d.t); d.t = setTimeout(() => { i.size ? setTimeout(d.scrollListener, 100) : (r.dispatchEvent(s), d.t = 0) }, 100) }, t: 0, listeners: 0 };
    if (!l.has(r)) { e.apply(r, ["scroll", d.scrollListener]); l.set(r, d) }
    d.listeners++;
  }
  function n(e, t, n) {
    if (t !== "scroll" && t !== "scrollend") return;
    const o = this, s = l.get(o);
    if (s) { s.listeners--; if (s.listeners <= 0) { e.apply(o, ["scroll", s.scrollListener]); l.delete(o) } }
  }
  e(Element.prototype, "addEventListener", t);
  e(window, "addEventListener", t);
  e(document, "addEventListener", t);
  e(Element.prototype, "removeEventListener", n);
  e(window, "removeEventListener", n);
  e(document, "removeEventListener", n);
}

// Main class
class SnapCarousel extends HTMLElement {

  #preventUiUpdate;

  #preventNextEvent;

  #elements = {
    controls: {
      buttons: [],
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
  };

  #settings = {
    default: {},
    origin: {},
    current: {}
  };

  #state = {
    index: 0,
    itemsCount: 0,
    pageCount: 0,
    isVisible: false,
    autoplayInterval: null,
    breakpoint: undefined
  };

  #className = 'snp-c';

  /**
   * Set observed attributes
   *
   * Will be every keys from defaultConfig + every keys from defaultConfig prefixed by "data-"
   */
  static get observedAttributes() {
    const keys = Object.keys(SnapCarousel.defaultConfig).map(k => k.replace(/[A-Z]/g, m => "-" + m.toLowerCase()));
    return [...keys, ...keys.map(k => 'data-' + k)];
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
      controls: false,
      nav: false,
      pager: false,
      loop: false,
      behavior: 'smooth',
      stop: false,
      usePause: true,
      vertical: false,
      responsive: []
    }
  }

  /**
   * Carousel constructor
   * @param {NodeElement} element
   * @param {object} config
   */
  constructor() {
    super();
    this.#settings.default = SnapCarousel.defaultConfig;
  }

  /**
   * Connected callback :
   */
  connectedCallback() {
    if (!this.isConnected) return;
    const template = document.createElement('template');

    template.innerHTML = `<style>${hostStyles}</style>${htmlTemplate}`;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const scroller = this.#getSlotElements('scroller', { fallback: true })[0];

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if ((mutation.addedNodes.length || mutation.removedNodes.length)) {
          this.#computeChildren();
          this.#init();
        }
      });
    });

    observer.observe(scroller, { childList: true })

    this.#prepare();
  }

  attributeChangedCallback() {
    if (this.#state.ready) this.#setup();
  }

  /**
   * Go to a given page number
   * @param {Number} page page index
   */
  goTo(page) {
    this.#preventUiUpdate = false;
    const { scroller, items } = this.#elements;
    const { perPage, vertical } = this.#settings.current;

    const index = page > this.#state.pageCount - 1 ? 0 : (page < 0 ? this.#state.pageCount - 1 : page);
    const target = items[index * perPage];

    this.#updateState(index);
    this.#state.ready = true;

    let top = 0, left = 0;

    if (vertical) {
      top = target.offsetTop;
    } else {
      left = this.#isDocumentLtr() ? target.offsetLeft : (target.offsetLeft + target.offsetWidth) - scroller.offsetWidth;
    }

    this.#preventUiUpdate = true;
    requestIdleCallback(() => {
      scroller.scrollTo({ top, left });
    }, { timeout: 100 });
  }

  prev() {
    this.goTo(this.state.index - 1);
  }

  next() {
    this.goTo(this.state.index + 1);
  }

  #prepare() {
    const scroller = this.#getSlotElements('scroller', true)[0];

    if (!scroller) {
      return;
    }

    scroller.onscroll = this.#onscroll.bind(this);
    scroller.addEventListener('scrollend', this.#onscrollend.bind(this));
    window.addEventListener('resize', this.#resizeEvent.bind(this));

    this.#elements.scroller = scroller;

    this.elements = this.#elements;
    this.settings = this.#settings;
    this.state = this.#state;

    this.ariaRoleDescription = 'carousel';

    Object.assign(scroller, { role: 'group', ariaLive: 'polite', ariaAtomic: false });

    this.#computeChildren();
    this.#addGlobalStyles();
    this.#identify();
    this.#setup();

    this.#observe();
    this.#state.ready = true;
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

  #setup() {
    this.#state.breakpoint = undefined;
    this.#settings.origin = Object.assign({}, this.#settings.default, this.#getNodeConfig());
    this.#settings.origin.responsive = (this.#settings.origin.responsive || []).sort((a, b) => a.breakpoint - b.breakpoint);
    this.#getCurrentConfig();
  }

  /**
   * Wait for the scroller to have width
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

  #getNodeConfig() {
    const options = Object.keys(this.#settings.default);
    if (this.attributes.options) return this.#maybeParse(this.attributes.options.value);
    return Array.from(this.attributes).reduce((o, a) => {
      const n = a.name.replace('data-', '').replace(/-([a-z])/g, g => g[1].toUpperCase());
      if (options.includes(n)) o[n] = this.#maybeParse(a.value);
      return o;
    }, {});
  }

  #maybeParse(s) {
    if (s === '') return true;
    try { return JSON.parse(s) } catch { return s }
  }

  /**
   * Sets the config according to the current breakpoint match
   * then runs setup if the new breakpoint is different from the last one
   */
  #getCurrentConfig() {
    const { origin } = this.#settings;
    const match = origin.responsive.reduce((m, c) => c.breakpoint < window.innerWidth ? c : m, { breakpoint: null });
    const current = Object.assign({}, origin, match.settings || {});
    current.perPage = Math.min(current.displayed, current.perPage);
    this.#settings.current = current;
    if (this.#state.breakpoint !== match.breakpoint) {
      this.#state.breakpoint = match.breakpoint;
      this.#init();
    }
  }

  /**
   * Setup everything
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

  #computePadding() {
    const { vertical } = this.#settings.current;
    const property = vertical ? 'padding-top' : 'padding-left';
    // Store the computed padding of the scroller for later
    this.#state.computedPadding = parseInt(getComputedStyle(this.#elements.scroller)[property], 10);
  }

  /**
   * Calculate the number of pages
   */
  #setPages() {
    const { current } = this.#settings;
    const { itemsCount } = this.#state;
    const unecessaryPagesCount = Math.floor((current.displayed - current.perPage) / current.perPage);
    this.#state.pageCount = Math.ceil(itemsCount / current.perPage) - unecessaryPagesCount;
  }

  /**
   * Generates CSS given the config
   */
  #createStyles() {
    const previousStyles = document.querySelector('#' + this.#state.id + '-styles');

    if (previousStyles) {
      previousStyles.remove();
    }

    const { displayed, gap, padding, perPage, stop, behavior } = this.#settings.current;
    const selectRule = perPage > 1 ? `*:nth-child(${perPage}n + 1)` : '*';
    const css = `#${this.#state.id} { --sc-perpage: ${displayed}; --sc-gap: ${this.#formatCssValue(gap)}; --sc-padding: ${this.#formatCssValue(padding)}; --sc-behavior: ${behavior}; } #${this.#state.id} [slot="scroller"] > ${selectRule} { scroll-snap-align: start; scroll-snap-stop: ${stop ? 'always' : 'normal'} }`;

    this.styles = this.#createStyleElement(css, this.#state.id + '-styles');
    document.head.append(this.styles);
  }

  #observe() {
    const { items, scroller } = this.#elements;

    const mio = new IntersectionObserver(obs => {
      let entry = obs[0];
      this.#state.isVisible = entry.intersectionRatio > .1;
      this.#state.pause = !this.#state.isVisible;
      this.#setPlayPause();
    }, {
      threshold: [.1, .9]
    });

    mio.observe(this);

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

    const io = new IntersectionObserver(observations => {
      observations.forEach(obs => {
        obs.target.toggleAttribute('visible', obs.isIntersecting);
        obs.target.toggleAttribute('inert', !obs.isIntersecting);
      });
    }, {
      scroller,
      threshold: 0.6,
    });

    items.forEach(i => io.observe(i));
  }

  /**
   * On window resize : reinit the carousel
   */
  #resizeEvent() {
    clearTimeout(this.resizeTm);
    this.resizeTm = setTimeout(() => {
      this.#computePadding();
      this.#getCurrentConfig();
    }, 100);
  }

  /**
   * On scroll, dispatch events, calculate the current slide
   */
  #onscroll() {
    if (this.#preventNextEvent) return;

    this.#onscrollstart();

    this.newIndex = this.#state.index;

    const current = this.#getCurrent();

    if (current != this.#state.index) {
      this.newIndex = current;

      this.#updateState(current);
      this.#triggerEvent('scrollupdate');
    }
  }

  /**
   * Dispatch a custom event
   * @param {String} name
   */
  #triggerEvent(name) {
    const { current } = this.#settings;

    this.dispatchEvent(
      new CustomEvent(name, {
        detail: this.#state
      })
    );
    if (current['on' + name]) current['on' + name](this);
  }

  /**
   * On scroll start
   */
  #onscrollstart() {
    if (!this.#state.isMoving) {
      this.#triggerEvent('scrollstart');
    }
    this.#state.isMoving = true;
  }

  /**
   * On scroll end
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
   * Create the dots nav (page numbers)
   */
  #createPagination() {
    const { pagination } = this.#elements;
    let { container, dots } = pagination;
    let { current } = this.#settings;

    if (!container) {
      container = this.#getSlotElements('pagination')[0];
      container.addEventListener('keydown', this.#handleKeyDown.bind(this));
      pagination.container = container;
    } else {
      // Reset nav content
      container.innerHTML = null;
      dots.forEach(d => d.remove());
      this.#elements.pagination.dots = [];
    }

    container.style.display = current.nav && this.#state.pageCount > 1 ? '' : 'none';

    if (current.nav && container) {
      for (let index = 0; index < this.#state.pageCount; index++) {
        this.#createMarker(index);
      }
    }
  }

  #createPager() {
    const { pager } = this.#elements;
    const { current } = this.#settings;

    if (!pager.current) {
      ['current', 'sep', 'total'].forEach(key => {
        pager[key] = this.#getSlotElements(key)[0];
      });
      pager.container = this.shadowRoot.querySelector('[part="pager"]');
    }

    pager.container.style.display = current.pager && this.#state.pageCount > 1 ? '' : 'none';
    pager.current.innerHTML = 1;
    pager.total.innerHTML = this.#state.pageCount;
  }

  /**
   * Creates a button for page N
   * @param {Number} index
   */
  #createMarker(index) {
    const { pagination } = this.#elements;
    const { container, dots } = pagination;
    const dot = document.createElement('button');
    dot.innerHTML = index + 1;
    dot.addEventListener('click', () => this.goTo(index));

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
   * Handle prev/next arrows on pagination
   * @param {KeyboardEvent} event
   * @returns
   */
  #handleKeyDown(event) {
    const isLtr = this.#isDocumentLtr();

    const activeDot = this.#elements.pagination.dots[this.#state.index] || 0;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowLeft':
        let selector = event.key === 'ArrowRight' ? (isLtr ? 'next' : 'previous') : (isLtr ? 'previous' : 'next');
        const target = activeDot[`${selector}ElementSibling`];
        if (target) {
          target.click();
          target.focus();
        }
        break;
    }
  }

  /**
   * Add prev next buttons event listener
   */
  #createControls() {
    const { controls } = this.#elements;
    const { current } = this.#settings;

    const hideButtons = !current.controls || this.#state.pageCount < 2;

    controls.buttons = [
      ...this.#getSlotElements('prev-buttons'),
      ...this.#getSlotElements('next-buttons')
    ];

    controls.buttons.forEach(button => {
      button.style = hideButtons ? 'display: none !important;' : '';

      if (button.hasListener) return;

      button.direction = button.getAttribute('direction') || 'next';
      button.modifier = (button.direction === 'next' ? 1 : -1) * (parseInt(button.getAttribute('modifier'), 10) || 1);
      button.hasListener = true;

      button.addEventListener('click', () => {
        if (!current.controls) return;
        this.goTo(this.#state.index + button.modifier);
      });

      Object.assign(button, {
        ariaControls: this.#elements.scroller.id
      });
    });
  }

  /**
   * Retrieve the element assigned to a slot or the default one
   * When use with fallback: true, will return the first child if it exists and is
   * the only child
   * @param {String} slotName
   * @param {Object} options
   * @returns [HtmlElement]
   */
  #getSlotElements(slotName, options = { fallback: false }) {
    const slot = this.shadowRoot.querySelector([`[name="${slotName}"]`]);
    let assigned = slot.assignedElements();
    // Fallback on the first child if nothing slotted
    if (options.fallback && !assigned.length) {
      if (this.children[0].slot === '') {
        this.children[0].slot = 'scroller';
        assigned = slot.assignedElements();
      }
    }
    return Array.from(assigned.length ? assigned : slot.children);
  }

  /**
   * Set active state on the nav dots
   * @param {Number} index
   */
  #setActivePaginationItem() {
    if (!this.#settings.current.nav) return;

    const { pagination } = this.#elements;
    let { dots, active } = pagination;
    const next = dots[this.#state.index];

    if (next) {
      if (active) {
        Object.assign(active, {
          tabIndex: 0,
          ariaSelected: false
        });
        active.part = 'button nav-button';
      }

      next.part = 'button nav-button active';
      Object.assign(next, {
        tabIndex: -1,
        ariaSelected: true
      });
      pagination.active = next;
    }
  }

  /**
   * Set the current page number in the pager
   */
  #setCurrentPage() {
    if (!this.#settings.current.pager) return;
    this.#elements.pager.current.innerHTML = this.#state.index + 1;
  }

  /**
   * Set button disable attribute if needed
   * @returns
   */
  #setButtonsState() {
    const { loop } = this.#settings.current;
    const { buttons } = this.#elements.controls;
    const { index, pageCount } = this.#state;
    let shouldShiftFocus = false;

    buttons.forEach(button => {
      const isDisabled = !loop && (button.direction === 'next' ? index >= pageCount - button.modifier : index < Math.abs(button.modifier));
      if (button === this.shadowRoot.activeElement && isDisabled) {
        shouldShiftFocus = true;
      }
      button.disabled = isDisabled ? 'disabled' : '';
    });

    if (shouldShiftFocus) {
      const active = buttons.filter(b => !b.disabled);
      if (active.length) {
        active[0].focus();
      }
    }
  }

  /**
   * Synchronize every other carousel with the current index
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
   * Create a style element
   *
   * @param {string} css
   * @param {string} id
   * @returns HTMLStyleElement
   */
  #createStyleElement(css, id) {
    const styles = document.createElement('style');
    styles.id = id;
    styles.append(document.createTextNode(css));
    return styles;
  }

  /**
   * Is the current document LTR
   * @returns {boolean}
   */
  #isDocumentLtr() {
    return document.firstElementChild.getAttribute('dir') !== 'rtl';
  }

  /**
   * Add 'px' to a value if it's not a string
   * @param {mixed} value
   * @returns string
   */
  #formatCssValue(v) {
    return typeof v === 'string' ? v : v + 'px';
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
