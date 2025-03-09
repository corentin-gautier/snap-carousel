/**
 * Navigation dots feature for SnapCarousel
 * Adds pagination dots for visual navigation
 */
export const NavFeature = Base => class extends Base {
  // Feature-specific elements
  #pagination = {
    container: null,
    dots: [],
    active: null
  };

  #defaultPart = 'button nav-button';

  constructor() {
    super();
    // Add pagination to elements
    this.elements.pagination = this.#pagination;
    // Register hooks
    this.registerHook('init', this.#createPagination.bind(this));
    this.registerHook('updateState', this.#setActivePaginationItem.bind(this));
  }

  /**
   * Create pagination dots
   */
  #createPagination() {
    let { container, dots } = this.#pagination;
    const { current } = this.settings;

    if (!container) {
      container = this.getSlotElements('pagination')[0];
      if (!container) return;

      container.addEventListener('keydown', this.#handleKeyDown.bind(this));
      this.#pagination.container = container;
    } else {
      container.innerHTML = '';
      dots.forEach(dot => dot.remove());
      this.#pagination.dots = [];
    }

    Base.setVisibility(container, current.nav && this.state.pageCount > 1);

    if (current.nav && container && this.state.pageCount > 1) {
      for (let index = 0; index < this.state.pageCount; index++) {
        this.#createMarker(index);
      }
      // Set first dot as active
      if (this.#pagination.dots.length) {
        this.#setActivePaginationItem();
      }
    }
  }

  /**
   * Create a pagination marker (dot)
   * @param {number} index - Page index for the marker
   */
  #createMarker(index) {
    const { container, dots } = this.#pagination;
    if (!container) return;

    const dot = document.createElement('button');

    dot.type = 'button';
    dot.part = this.#defaultPart;
    dot.setAttribute('aria-controls', this.elements.scroller.id);
    dot.setAttribute('aria-selected', false);

    dot.innerHTML = index + 1;
    dot.addEventListener('click', () => this.goTo(index));

    container.append(dot);
    dots.push(dot);
  }

  /**
   * Update active pagination dot
   */
  #setActivePaginationItem() {
    if (!this.settings.current.nav || !this.#pagination.dots.length) return;

    let { dots, active } = this.#pagination;
    const next = dots[this.state.index];

    if (next) {
      if (active) {
        Object.assign(active, {
          tabIndex: 0,
          ariaSelected: false
        });
        active.part = this.#defaultPart;
      }

      next.part = `${this.#defaultPart} active`;
      Object.assign(next, {
        tabIndex: -1,
        ariaSelected: true
      });
      this.#pagination.active = next;
    }
  }

  /**
   * Handle keyboard navigation in pagination
   * @param {KeyboardEvent} event - Keyboard event
   */
  #handleKeyDown(event) {
    if (!this.#pagination.dots.length) return;

    const isLtr = this.isDocumentLtr();
    const activeDot = this.#pagination.dots[this.state.index] || 0;

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
};
