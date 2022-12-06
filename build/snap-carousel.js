(function () {
  'use strict';

  var htmlTemplate = "<slot name=\"scroller\"><ul></ul></slot><div part=\"controls\"><div part=\"buttons\"><slot name=\"prev-buttons\"><button part=\"button control-button\" type=\"button\" direction=\"prev\" aria-label=\"Previous\">Previous</button></slot><slot name=\"next-buttons\"><button part=\"button control-button\" type=\"button\" aria-label=\"Next\">Next</button></slot></div><slot name=\"pagination\"><div part=\"nav\"></div></slot><div part=\"pager\"><slot name=\"current\"><span part=\"current\"></span></slot><slot name=\"sep\"><span part=\"page-sep\">&nbsp;/&nbsp;</span></slot><slot name=\"total\"><span part=\"total\"></span></slot></div></div>";

  var css_248z$1 = "snap-carousel:not([scrollbar]) .snp-c__scroller::-webkit-scrollbar{display:none}.snp-c__scroller{display:flex}.snp-c__scroller>*{display:block;flex:0 0 auto;max-width:100%;width:calc(100%/var(--sc-perpage, 1) - var(--sc-gap, 0) + var(--sc-gap, 0)/var(--sc-perpage, 1))}";

  var css_248z = ":host{display:block;position:relative;width:100%}:host(:not([scrollbar])) ::slotted([slot=scroller]){scrollbar-width:none}:host(:not([scrollbar])) ::slotted([slot=scroller])::-webkit-scrollbar{display:none}::slotted([slot=scroller]){display:flex;gap:var(--sc-gap);margin:0;overflow-x:auto;overscroll-behavior-x:contain;padding:0 var(--sc-padding)!important;position:relative;scroll-behavior:var(--sc-behavior);scroll-padding-inline:var(--sc-padding);scroll-snap-type:x mandatory}";

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

  ((window, document, Array, Object, Element, IntersectionObserver, requestAnimationFrame, clearTimeout, setTimeout) => {

    // Scrollend polyfill
    if (!('onscrollend' in window)) { const s = new Event('scrollend'), i = new Set; document.addEventListener('touchstart', e => { for (let t of e.changedTouches) i.add(t.identifier); }, { passive: !0 }), document.addEventListener('touchend', e => { for (let t of e.changedTouches) i.delete(t.identifier); }, { passive: !0 }); let l = new WeakMap; function e(e, t, n) { let o = e[t]; e[t] = function () { let e = Array.prototype.slice.apply(arguments, [0]); o.apply(this, e), e.unshift(o), n.apply(this, e); }; } function t(e, t, n, o) { if ('scroll' != t && 'scrollend' != t) return; let r = this, d = l.get(r); if (void 0 === d) { let t = 0; d = { scrollListener: e => { clearTimeout(t), t = setTimeout(() => { i.size ? setTimeout(d.scrollListener, 100) : (r.dispatchEvent(s), t = 0); }, 100); }, listeners: 0 }, e.apply(r, ['scroll', d.scrollListener]), l.set(r, d); } d.listeners++; } function n(e, t, n) { if ('scroll' != t && 'scrollend' != t) return; let o = this, s = l.get(o); void 0 !== s && (s[t]--, --s.listeners > 0 || (e.apply(o, ['scroll', s.scrollListener]), l.delete(o))); } e(Element.prototype, 'addEventListener', t), e(window, 'addEventListener', t), e(document, 'addEventListener', t), e(Element.prototype, 'removeEventListener', n), e(window, 'removeEventListener', n), e(document, 'removeEventListener', n); }
    // Main class
    class SnapCarousel extends HTMLElement {

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
        }
      };

      #settings = {
        default: {
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
        },
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
       * Carousel constructor
       * @param {NodeElement} element
       * @param {object} config
       */
      constructor() {
        super();
      }

      connectedCallback() {
        const template = document.createElement('template');

        template.innerHTML = `<style>${css_248z}</style>` + htmlTemplate;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const scroller = this.#getSlotElements('scroller')[0];

        if (!scroller) {
          return;
        }

        const items = Array.from(scroller.children);
        const count = items.length;

        scroller.onscroll = this.#onscroll.bind(this);
        scroller.addEventListener('scrollend', this.#onscrollend.bind(this));
        window.addEventListener('resize', this.#resizeEvent.bind(this));

        this.#elements.scroller = scroller;
        this.#elements.items = items;

        this.#state.itemsCount = count;

        this.elements = this.#elements;
        this.settings = this.#settings;
        this.state = this.#state;

        this.ariaRoleDescription = 'carousel';

        Object.assign(scroller, { role: 'group', ariaLive: 'polite', ariaAtomic: false });

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

        this.#addGlobalStyles();
        this.#identify();
        this.#setup();

        this.#observe();
      }

      /**
       * Go to a given page number
       * @param {Number} page page index
       */
      goTo(page) {
        const { scroller, items } = this.#elements;
        const { perPage } = this.#settings.current;

        const index = page > this.#state.pageCount - 1 ? 0 : (page < 0 ? this.#state.pageCount - 1 : page);
        const target = items[index * perPage];

        this.#updateState(index);
        this.#state.ready = true;

        const left = this.#isDocumentLtr() ? target.offsetLeft : (target.offsetLeft + target.offsetWidth) - scroller.offsetWidth;

        this.#state.preventScrollEvents = true;
        requestIdleCallback(() => {
          scroller.scrollTo({ left });
        }, { timeout: 100 });
      }

      prev() {
        this.goTo(this.state.index - 1);
      }

      next() {
        this.goTo(this.state.index + 1);
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
        const css = css_248z$1;
        document.head.append(this.#createStyleElement(css, id));
      }

      /**
       * Adds unique ids and classes
       */
      #identify() {
        const { scroller } = this.#elements;
        const suffix = '__scroller';
        this.id = this.#state.id = this.#className + '-' + (Math.random() + 1).toString(36).substring(4);
        scroller.id = this.#state.id + suffix;
        scroller.classList.add(this.#className + suffix);
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
            this.#waitForWidth();
          });
        }
      }

      #getNodeConfig() {
        const options = Object.keys(this.#settings.default);
        if (this.attributes.options) {
          return this.#maybeParse(this.attributes.options.value);
        }
        return Array.from(this.attributes).reduce((object, next) => {
          const name = next.name.replace('data-', '').replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          if (options.includes(name)) {
            object[name] = this.#maybeParse(next.value);
          }
          return object;
        }, {});
      }

      #maybeParse(string) {
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
      #getCurrentConfig() {
        let match = { breakpoint: null };
        const { items } = this.#elements;
        let { origin, current } = this.#settings;

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
          this.#loop();
        });
      }

      #computePadding() {
        // Store the computed padding of the scroller for later
        this.#state.computedPadding = parseInt(getComputedStyle(this.#elements.scroller)['padding-left'], 10);
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
        const css = `#${this.#state.id} { --sc-perpage: ${displayed}; --sc-gap: ${this.#formatCssValue(gap)}; --sc-padding: ${this.#formatCssValue(padding)}; --sc-behavior: ${behavior}; } #${this.#state.id}__scroller > ${selectRule} { scroll-snap-align: start; scroll-snap-stop: ${stop ? 'always' : 'normal'} }`;

        this.styles = this.#createStyleElement(css, this.#state.id + '-styles');
        document.body.append(this.styles);
      }

      #observe() {
        const { items, scroller } = this.#elements;
        const defaults = Object.keys(this.#settings.default);

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

        const mo = new MutationObserver(list => {
          list.forEach(record => {
            if (record.type === 'attributes') {
              if (defaults.includes(record.attributeName.replace('data-', ''))) {
                this.#setup();
              }
            }
            if (record.type === 'childList') {
              console.log(record);
            }
          });
        });

        mo.observe(this, {
          attributes: true,
          childList: true
        });
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
        if (this.#state.preventNextEvent) return;

        this.#onscrollstart();

        this.newIndex = this.#state.index;

        if (this.#state.preventScrollEvents) return;

        const current = this.#getCurrent();

        if (current != this.#state.index) {
          this.newIndex = current;

          this.#updateState(current);
          this.#triggerEvent('scrollupdate');
        }
      }

      #triggerEvent(name, bg, color) {
        const { current } = this.#settings;
        this.#log('Event', name, bg, color);

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
        if (this.#state.preventNextEvent) return;
        this.#triggerEvent('scrollend');
        this.#state.preventScrollEvents = false;
        this.#state.isMoving = false;

        if (typeof this.newIndex === 'number') {
          this.#updateState(this.newIndex);
          this.newIndex = null;
        } else {
          this.#updateState(this.#state.index);
        }

        this.#loop();
        this.#setPlayPause();
      }

      /**
       * Update the dots/controls state
       * @param {Number} index
       * @param {Boolean} force
       */
      #updateState(index) {
        this.#state.index = index;
        this.#synchronize();
        this.#setActivePaginationItem();
        this.#setCurrentPage();
        this.#setButtonsState();
      }

      /**
       * Compute the current slide index
       * @returns {Number} the current slide index
       */
      #getCurrent(node) {
        const { scroller, items } = this.#elements;
        const { perPage } = this.#settings.current;

        const isLtr = this.#isDocumentLtr();

        const refPoint = isLtr ? scroller.scrollLeft : scroller.scrollLeft + scroller.clientWidth;
        let closest = items.map(i => {
          return {
            index: parseInt(i.dataset.index, 10),
            distance: Math.abs((isLtr ? i.offsetLeft : i.offsetLeft + i.clientWidth) - (this.#state.computedPadding || 0) - refPoint)
          };
        }).reduce((a, b) => !a || b.distance < a.distance ? b : a, null);

        if (node) return closest;

        return Math.ceil(closest.index / perPage);
      }

      #loop() {
        /**
         * After every slide : make sure half the pages are before and half are after given the current index
         */
        const { perPage, clone } = this.#settings.current;
        const currentIndex = this.#state.index;
        const count = this.#state.itemsCount - 1;

        if (!clone) return;

        const { scroller, items } = this.#elements;

        const closest = this.#getCurrent(true);

        // Wait before the carousel is completly stopped
        if (closest.distance > 1) return;

        this.#state.preventNextEvent = true;
        const position = currentIndex * perPage;
        let targetMin = items[position];
        let targetMax = items[position + perPage - 1];

        // Make sure half the pages are before, half after
        const half = Math.floor(this.#state.pageCount / 2);

        for (let page = 0; page < half; page++) {
          for (let index = 0; index < perPage; index++) {
            if (!targetMin.previousElementSibling) {
              this.#triggerEvent('clonebefore', 'bisque', 'chocolate');
              scroller.prepend(scroller.children[count]);
              targetMin = scroller.children[0];
            }
            if (!targetMax.nextElementSibling) {
              this.#triggerEvent('cloneafter', 'bisque', 'chocolate');
              scroller.append(scroller.children[0]);
              targetMax = scroller.children[count];
            }
          }
        }

        setTimeout(() => {
          requestIdleCallback(() => {
            this.#state.preventNextEvent = false;
          }, { timeout: 200 });
        }, 200);
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

      #getSlotElements(slotName) {
        const slot = this.shadowRoot.querySelector([`[name="${slotName}"]`]), assigned = slot.assignedElements();
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
       * @returns
       */
      #createStyleElement(css, id) {
        const styles = document.createElement('style');
        styles.id = id;
        styles.type = 'text/css';
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
      #formatCssValue(value) {
        return typeof value === 'string' ? value : value + 'px';
      }

      #setPlayPause() {
        if (!this.#settings.current.autoplay) return;

        const { pause, isVisible } = this.#state;

        if (!pause && isVisible) {
          if (!this.#state.autoplayInterval) {
            this.#state.autoplayInterval = setTimeout(() => {
              this.#state.autoplayInterval = null;
              this.goTo(this.#state.index + 1);
            }, this.#settings.current.autoplay);
            this.#log('Play/Pause', 'Set Timeout');
          }
        } else {
          clearTimeout(this.#state.autoplayInterval);
          this.#state.autoplayInterval = null;
          this.#log('Play/Pause', 'Remove Timeout');
        }
      }

      #log(type, name, bg = 'cornflowerblue', color = '#FFF') {
        const css = 'font-weight: bold;padding: 3px 8px';
        const defCss = 'background: aliceblue; color: cornflowerblue;';
        const { current } = this.#settings;

        if (current.debug) console.log(`%c${type}%c${name}%c#${this.id}]`, defCss + css, `background: ${bg}; color: ${color};` + css, defCss + css);
      }
    }

    if (window.customElements) {
      customElements.define('snap-carousel', SnapCarousel);
    }
  })(window, document, Array, Object, Element, IntersectionObserver, requestAnimationFrame, clearTimeout, setTimeout);

})();
