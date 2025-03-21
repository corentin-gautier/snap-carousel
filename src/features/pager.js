/**
 * Pager feature for SnapCarousel
 * Adds page numbers display (current/total)
 */
export const PagerFeature = Base => class extends Base {
  // Feature-specific elements
  #pager = {
    container: null,
    current: null,
    sep: null,
    total: null
  };

  constructor() {
    super();
    // Add pager to elements
    this.elements.pager = this.#pager;
    // Register hooks
    this.registerHook('init', this.#createPager.bind(this));
    this.registerHook('updateState', this.#setCurrentPage.bind(this));
  }

  /**
   * Create page number display
   */
  #createPager() {
    const { current: currentSettings } = this.settings;

    // Initialize pager elements if not exists
    if (!this.#pager.container) {
      this.#pager.container = this.shadowRoot.querySelector('[part="pager"]');
      if (!this.#pager.container) return;

      ['current', 'sep', 'total'].forEach(key => {
        const element = this.getSlotElements(key)[0];
        if (!element) return;
        this.#pager[key] = element;
      });
    }

    // Ensure all required elements exist
    if (!this.#pager.current || !this.#pager.total) return;

    const { container, current, total } = this.#pager;

    // Show/hide pager based on settings
    Base.setVisibility(container, currentSettings.pager && this.state.pageCount > 1);
    current.innerHTML = 1;
    total.innerHTML = this.state.pageCount;
  }

  /**
   * Update current page number display
   */
  #setCurrentPage() {
    if (!this.settings.current.pager || !this.#pager.current) return;
    this.#pager.current.innerHTML = this.state.index + 1;
  }
};
