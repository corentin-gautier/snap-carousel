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
 * - clone (boolean),
 * - behaviour (string),
 * - debug (boolean),
 * - stop (boolean)
 * - responsive (array)
 *   - breakpoint (number)
 *   - config : any of the previous options
 */

import htmlTemplate from './template.html';
import globalStyles from './style.css';
import hostStyles from './host.css';

const _document = document;

if (!('onscrollend' in window)) { const s = new Event('scrollend'), i = new Set; _document.addEventListener('touchstart', e => { for (let t of e.changedTouches) i.add(t.identifier) }, { passive: !0 }), _document.addEventListener('touchend', e => { for (let t of e.changedTouches) i.delete(t.identifier) }, { passive: !0 }); let l = new WeakMap; function e(e, t, n) { let o = e[t]; e[t] = function () { let e = Array.prototype.slice.apply(arguments, [0]); o.apply(this, e), e.unshift(o), n.apply(this, e) } } function t(e, t, n, o) { if ('scroll' != t && 'scrollend' != t) return; let r = this, d = l.get(r); if (void 0 === d) { let t = 0; d = { scrollListener: e => { clearTimeout(t), t = setTimeout(() => { i.size ? setTimeout(d.scrollListener, 100) : (r.dispatchEvent(s), t = 0) }, 100) }, listeners: 0 }, e.apply(r, ['scroll', d.scrollListener]), l.set(r, d) } d.listeners++ } function n(e, t, n) { if ('scroll' != t && 'scrollend' != t) return; let o = this, s = l.get(o); void 0 !== s && (s[t]--, --s.listeners > 0 || (e.apply(o, ['scroll', s.scrollListener]), l.delete(o))) } e(Element.prototype, 'addEventListener', t), e(window, 'addEventListener', t), e(document, 'addEventListener', t), e(Element.prototype, 'removeEventListener', n), e(window, 'removeEventListener', n), e(document, 'removeEventListener', n) } var o = { __proto__: null };

class SnapCarousel extends HTMLElement {

  static get className() {
    return 'snp-c';
  }

  static get _template() {
    return htmlTemplate
  }

  static get _defaultConfig() {
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
      clone: false,
      debug: false,
      behavior: 'smooth',
      stop: false,
      usePause: true,
      responsive: []
    };
  }

  static get _defaultConfigKeys() {
    return Object.keys(SnapCarousel._defaultConfig);
  }

  /**
   * Carousel constructor
   * @param {NodeElement} element
   * @param {object} config
   */
  constructor() {
    super();
  }

  connectedCallback() {
    const template = _document.createElement('template');

    template.innerHTML = `<style>${hostStyles}</style>` + SnapCarousel._template;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const scroller = this._getSlotElements('scroller')[0];

    if (!scroller) {
      return;
    }
    const items = Array.from(scroller.children);

    scroller.onscroll = this._onscroll.bind(this);
    scroller.addEventListener('scrollend', this._onscrollend.bind(this));
    addEventListener('resize', this._resizeEvent.bind(this));

    this._elements = {
      scroller,
      items,
      controls: {
        container: null,
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
      }
    };

    this._configs = {
      origin: {},
      current: {}
    };

    this._state = {
      index: 0,
      itemsCount: items.length,
      pageCount: 0,
      isVisible: false,
      autoplayInterval: null,
      breakpoint: undefined
    };

    // this.setAttribute('tabindex', -1);
    this.setAttribute('aria-roledescription', 'carousel');

    scroller.setAttribute('role', 'group');
    scroller.setAttribute('aria-live', 'polite');
    scroller.setAttribute('aria-atomic', 'false');

    // Store item index in a data attribute
    items.forEach((item, i) => {
      item.dataset.index = i;
      item.setAttribute('aria-setsize', items.length);
      item.setAttribute('aria-posinset', (i + 1));
      item.setAttribute('aria-roledescription', 'slide');
      item.setAttribute('role', 'listitem');
    });

    this._addGlobalStyles();
    this._identify();
    this._setup();

    this._observe();
  }

  /**
   * Add carousel base styles in the document head
   * @returns
   */
  _addGlobalStyles() {
    const classname = SnapCarousel.className;
    const id = `${classname}-global-styles`;
    if (_document.querySelector('#' + id)) {
      return;
    }
    const css = globalStyles;
    _document.head.append(this._createStyleElement(css, id));
  }

  /**
   * Adds unique ids and classes
   */
  _identify() {
    const { scroller } = this._elements;
    this._state.id = SnapCarousel.className + '-' + (Math.random() + 1).toString(36).substring(4);
    this.id = this._state.id;
    scroller.id = this._state.id + '__scroller';
    scroller.classList.add(this._getClass('scroller', false));
  }

  _setup() {
    this._state.breakpoint = undefined;
    this._configs.origin = Object.assign({}, SnapCarousel._defaultConfig, this._getNodeConfig());
    this._configs.origin.responsive = (this._configs.origin.responsive || []).sort((a, b) => a.breakpoint - b.breakpoint);
    this._getCurrentConfig();
  }

  /**
   * Wait for the scroller to have width
   */
  _waitForWidth(callback) {
    if (this._elements.scroller.clientWidth) {
      callback();
    } else {
      requestAnimationFrame(() => {
        this._waitForWidth();
      });
    }
  }

  _getNodeConfig() {
    const options = SnapCarousel._defaultConfigKeys;
    if (this.attributes.options) {
      return this._maybeParse(this.attributes.options.value);
    }
    return Array.from(this.attributes).reduce((object, next) => {
      const name = next.name.replace('data-', '').replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      if (options.includes(name)) {
        object[name] = this._maybeParse(next.value);
      }
      return object;
    }, {});
  }

  _maybeParse(string) {
    let result;
    if (string === '') return true;
    try {
      result = JSON.parse(string);
    } catch (error) {
      return string;
    }
    return result;
  }

  /**
   * Sets the config according to the current breakpoint match
   * then runs setup if the new breakpoint is different from the last one
   */
  _getCurrentConfig() {
    let match = { breakpoint: null };
    const { items } = this._elements;
    let { origin, current } = this._configs;

    origin.responsive.forEach(conf => {
      if (conf.breakpoint < window.innerWidth) match = conf;
    });

    current = Object.assign({}, origin, (match.config || {}));

    let { displayed, perPage, loop } = current;

    perPage = loop ? displayed : Math.min(displayed, perPage);

    // Control the config object
    current = Object.assign(current, {
      perPage: perPage,
      loop: loop ? items.length % perPage === 0 && items.length >= 3 * displayed : false
    });

    this._configs.current = current;

    if (this._state.breakpoint !== match.breakpoint) {
      this._state.breakpoint = match.breakpoint;
      this._init();
    }
  }

  /**
   * Setup everything
   */
  _init() {
    this._waitForWidth(() => {
      this._setPages();
      this._createStyles();
      this._createPagination();
      this._createPager();
      this._createControls();
      this._computePadding();
      this._updateState(0);
      this._loop();
    });
  }

  _computePadding() {
    // Store the computed padding of the scroller for later
    this._state.computedPadding = parseInt(getComputedStyle(this._elements.scroller)['padding-left'], 10);
  }

  /**
   * Calculate the number of pages
   */
  _setPages() {
    const { current } = this._configs;
    const { itemsCount } = this._state;
    const unecessaryPagesCount = Math.floor((current.displayed - current.perPage) / current.perPage);
    this._state.pageCount = Math.ceil(itemsCount / current.perPage) - unecessaryPagesCount;
  }

  /**
   * Generates CSS given the config
   */
  _createStyles() {
    const previousStyles = _document.querySelector('#' + this._state.id + '-styles');

    if (previousStyles) {
      previousStyles.remove();
    }

    const { displayed, gap, padding, perPage, stop, behavior } = this._configs.current;
    const selectRule = perPage > 1 ? `*:nth-child(${perPage}n + 1)` : '*';
    const css = `#${this._state.id} { --sc-perpage: ${displayed}; --sc-gap: ${this._formatCssValue(gap)}; --sc-padding: ${this._formatCssValue(padding)}; --sc-behavior: ${behavior}; } #${this._state.id}__scroller > ${selectRule} { scroll-snap-align: start; scroll-snap-stop: ${stop ? 'always' : 'normal'} }`;

    this.styles = this._createStyleElement(css, this._state.id + '-styles');
    _document.body.append(this.styles);
  }

  _observe() {
    const { items, scroller } = this._elements;

    const mio = new IntersectionObserver(obs => {
      let entry = obs[0];
      this._state.isVisible = entry.intersectionRatio > .1;
      this._state.pause = !this._state.isVisible;
      this._setPlayPause();
    }, {
      threshold: [.1, .9]
    });

    mio.observe(this);

    if (this._configs.current.usePause) {
      this.addEventListener('mouseenter', () => {
        this._state.pause = true;
        this._setPlayPause();
      });

      this.addEventListener('mouseleave', () => {
        this._state.pause = false;
        this._setPlayPause();
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

    const mo = new MutationObserver(list => {
      list.forEach(record => {
        if (record.type === 'attributes') {
          if (SnapCarousel._defaultConfigKeys.includes(record.attributeName.replace('data-', ''))) {
            this._setup();
          }
        }
        if (record.type === 'childList') {
          console.log(record);
        }
      })
    });

    mo.observe(this, {
      attributes: true,
      childList: true
    });
  }

  /**
   * On window resize : reinit the carousel
   */
  _resizeEvent() {
    clearTimeout(this.resizeTm);
    this.resizeTm = setTimeout(() => {
      this._computePadding();
      this._getCurrentConfig();
    }, 100);
  }

  /**
   * On scroll, dispatch events, calculate the current slide
   */
  _onscroll() {
    if (this._state.preventNextEvent) return;

    this._beforeSlide();

    this.newIndex = this._state.index;

    if (this._state.preventScrollEvents) return;

    const current = this._getCurrent();

    if (current != this._state.index) {
      this.newIndex = current;

      this._updateState(current);
      this._triggerEvent('scrollupdate');
    }
  }

  _triggerEvent(name, bg = 'cornflowerblue', color = '#FFF') {
    const { current } = this._configs;
    const css = 'font-weight: bold;padding: 3px 8px';
    const defCss = 'background: aliceblue; color: cornflowerblue;';
    if (current.debug) console.log(`%cEvent%c${name}%c#${this.id}]`, defCss + css, `background: ${bg}; color: ${color};` + css, defCss + css);

    this.dispatchEvent(
      new CustomEvent(name, {
        detail: this._state
      })
    );
    if (current['on' + name]) current['on' + name](this);
  }

  _beforeSlide() {
    if (!this._state.isMoving) {
      this._triggerEvent('scrollstart');
    }
    this._state.isMoving = true;
  }

  /**
   * Things to do after a slide occurred
   */
  _onscrollend() {
    if (this._state.preventNextEvent) return;
    this._triggerEvent('scrollend');
    this._state.preventScrollEvents = false;
    this._state.isMoving = false;

    if (typeof this.newIndex === 'number') {
      this._updateState(this.newIndex);
      this.newIndex = null;
    } else {
      this._updateState(this._state.index);
    }

    this._loop();
    this._setPlayPause();
  }

  /**
   * Update the dots/controls state
   * @param {Number} index
   * @param {Boolean} force
   */
  _updateState(index) {
    this._state.index = index;
    this._synchronize();
    this._setActivePaginationItem();
    this._setCurrentPage();
    this._setButtonsState();
  }

  /**
   * Calculate the current slide index
   * @returns {Number} the current slide index
   */
  _getCurrent(node) {
    const { scroller, items } = this._elements;
    const { perPage } = this._configs.current;

    const isLtr = this._isDocumentLtr();

    const refPoint = isLtr ? scroller.scrollLeft : scroller.scrollLeft + scroller.clientWidth;
    let closest = items.map(i => {
      return {
        index: parseInt(i.dataset.index, 10),
        distance: Math.abs((isLtr ? i.offsetLeft : i.offsetLeft + i.clientWidth) - (this._state.computedPadding || 0) - refPoint)
      };
    }).reduce((a, b) => !a || b.distance < a.distance ? b : a, null);

    if (node) return closest;

    return Math.ceil(closest.index / perPage);
  }

  /**
   * Go to a given page number
   * @param {Number} page page index
   */
  goTo(page) {
    const { scroller, items } = this._elements;
    const { perPage } = this._configs.current;

    const index = page > this._state.pageCount - 1 ? 0 : (page < 0 ? this._state.pageCount - 1 : page);
    const target = items[index * perPage];

    this._updateState(index);
    this._state.ready = true;

    const left = this._isDocumentLtr() ? target.offsetLeft : (target.offsetLeft + target.offsetWidth) - scroller.offsetWidth;

    this._state.preventScrollEvents = true;
    requestIdleCallback(() => {
      scroller.scrollTo({ left });
    }, { timeout: 100 });
  }

  _loop() {
    /**
     * After every slide : make sure half the pages are before and half are after given the current index
     */
    const { perPage, clone } = this._configs.current;
    const currentIndex = this._state.index;
    const count = this._state.itemsCount - 1;

    if (!clone) return;

    const { scroller, items } = this._elements;

    const closest = this._getCurrent(true);

    // Wait before the carousel is completly stopped
    if (closest.distance > 1) return;

    this._state.preventNextEvent = true;
    const position = currentIndex * perPage;
    let targetMin = items[position];
    let targetMax = items[position + perPage - 1];

    // Make sure half the pages are before, half after
    const half = Math.floor(this._state.pageCount / 2);

    for (let page = 0; page < half; page++) {
      for (let index = 0; index < perPage; index++) {
        if (!targetMin.previousElementSibling) {
          this._triggerEvent('clonebefore', 'bisque', 'chocolate');
          scroller.prepend(scroller.children[count]);
          targetMin = scroller.children[0];
        }
        if (!targetMax.nextElementSibling) {
          this._triggerEvent('cloneafter', 'bisque', 'chocolate');
          scroller.append(scroller.children[0]);
          targetMax = scroller.children[count];
        }
      }
    }

    setTimeout(() => {
      requestIdleCallback(() => {
        this._state.preventNextEvent = false;
      }, { timeout: 200 });
    }, 200);
  }

  /**
   * Create the dots nav (page numbers)
   */
  _createPagination() {
    const { pagination } = this._elements;
    let { container, dots } = pagination;
    let { current } = this._configs;

    if (!container) {
      container = this._getSlotElements('pagination')[0];
      container.addEventListener('keydown', this._handleKeyDown.bind(this));
      pagination.container = container;
    } else {
      // Reset nav content
      container.innerHTML = null;
      dots.forEach(d => d.remove());
      this._elements.pagination.dots = [];
    }

    container.style.display = current.nav && this._state.pageCount > 1 ? '' : 'none';
    container.setAttribute('role', 'tablist');

    if (current.nav && container) {
      for (let index = 0; index < this._state.pageCount; index++) {
        this._createMarker(index);
      }
    }
  }

  _createPager() {
    const { pager } = this._elements;
    const { current } = this._configs;

    if (!pager.container) {
      pager.container = this._getSlotElements('pager')[0];

      ['current', 'sep', 'total'].forEach(key => {
        pager[key] = this._getSlotElements(key)[0];
      });
    }

    if (current.pager) {
      console.log(pager);
    }

    pager.container.style.display = current.pager && this._state.pageCount > 1 ? '' : 'none';
    pager.current.innerHTML = 1;
    pager.total.innerHTML = this._state.pageCount;
  }

  /**
   * Creates a button for page N
   * @param {Number} index
   */
  _createMarker(index) {
    const { pagination } = this._elements;
    const { container, dots } = pagination;
    const dot = _document.createElement('button');
    dot.innerHTML = index + 1;
    dot.addEventListener('click', () => this.goTo(index));
    dot.type = 'button';
    dot.part = 'button nav-button';
    dot.role = 'tab';
    dot.setAttribute('aria-controls', this._elements.scroller.id);
    dot.setAttribute('aria-selected', false);
    container.append(dot);
    dots.push(dot);
  }

  /**
   * Handle prev/next arrows on pagination
   * @param {KeyboardEvent} event
   * @returns
   */
  _handleKeyDown(event) {
    const isLtr = this._isDocumentLtr();

    const activeDot = this._elements.pagination.dots[this._state.index] || 0;

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
  _createControls() {
    const { controls } = this._elements;

    const hideButtons = !this._configs.current.controls || this._state.pageCount < 2;

    controls.container = this._getSlotElements('controls')[0];
    controls.buttons = [...this._getSlotElements('prev-buttons'), ...this._getSlotElements('next-buttons')];

    controls.buttons.forEach(button => {
      button.style = hideButtons ? 'display: none !important;' : '';

      if (button.hasListener) return;

      button.direction = button.getAttribute('direction') || 'next';
      button.modifier = (button.direction === 'next' ? 1 : -1) * (parseInt(button.getAttribute('modifier'), 10) || 1);
      button.hasListener = true;

      button.addEventListener('click', () => {
        if (!this._configs.current.controls) return;
        this.goTo(this._state.index + button.modifier);
      });
      button.setAttribute('aria-controls', this._elements.scroller.id);
    });
  }

  _getSlotElements(slotName) {
    const slot = this.shadowRoot.querySelector([`[name="${slotName}"]`]), assigned = slot.assignedElements();
    return Array.from(assigned.length ? assigned : slot.children);
  }

  /**
   * Set active state on the nav dots
   * @param {Number} index
   */
  _setActivePaginationItem() {
    if (!this._configs.current.nav) return;

    const { pagination } = this._elements;
    let { dots, active } = pagination;
    const next = dots[this._state.index];

    if (next) {
      if (active) {
        active.setAttribute('tabindex', 0);
        active.setAttribute('aria-selected', false);
        active.part = 'button nav-button';
      }

      next.part = 'button nav-button active';
      next.setAttribute('tabindex', -1);
      next.setAttribute('aria-selected', true);
      pagination.active = next;
    }
  }

  _setCurrentPage() {
    if (!this._configs.current.pager) return;
    const { pager } = this._elements;
    pager.current.innerHTML = this._state.index + 1;
  }

  /**
   * Set button disable attribute if needed
   * @returns
   */
  _setButtonsState() {
    const { loop } = this._configs.current;
    const { buttons } = this._elements.controls;
    const { index, pageCount } = this._state;
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

  _synchronize() {
    const { sync } = this._configs.current;

    if (sync && this._state.ready) {
      this._elements.sync = this._elements.sync || _document.querySelectorAll(sync) || [];

      this._elements.sync.forEach(carousel => {
        if (carousel instanceof SnapCarousel) {
          carousel.goTo(this._state.index);
        }
      });
    }
  }

  /**
   * Create a style element
   *
   * @param {string} css
   * @param {string} id
   * @returns
   */
  _createStyleElement(css, id) {
    const styles = _document.createElement('style');
    styles.id = id;
    styles.type = 'text/css';
    styles.append(_document.createTextNode(css));
    return styles;
  }

  /**
   * Generates a classname
   * @param {String} string
   * @param {Boolean} withDot
   * @returns
   */
  _getClass(string, withDot = true) {
    return (withDot ? '.' : '') + SnapCarousel.className + '__' + string;
  }

  /**
   * Is the current document LTR
   * @returns {boolean}
   */
  _isDocumentLtr() {
    return _document.firstElementChild.getAttribute('dir') !== 'rtl';
  }

  /**
   * Add 'px' to a value if it's not a string
   * @param {mixed} value
   * @returns string
   */
  _formatCssValue(value) {
    return typeof value === 'string' ? value : value + 'px';
  }

  _setPlayPause() {
    if (!this._configs.current.autoplay) return;

    if (!this._state.pause && this._state.isVisible) {
      if (!this._state.autoplayInterval) {
        this._state.autoplayInterval = setTimeout(() => {
          this._state.autoplayInterval = null;
          this.goTo(this._state.index + 1);
        }, this._configs.current.autoplay);
      }
    } else {
      clearTimeout(this._state.autoplayInterval);
      this._state.autoplayInterval = null;
    }
  }

  getInfos() {
    return { elements: this._elements, config: this._configs, state: this._state };
  }
}

if (window.customElements) {
  customElements.define('snap-carousel', SnapCarousel);
}
