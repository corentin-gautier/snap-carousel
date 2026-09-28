/**
 * Pager feature for SnapCarousel
 * Adds page numbers display (current/total)
 * @param {import('../base-carousel').BaseCarousel} carousel
 */
export const pager = carousel => {
  let container;
  let current;
  let total;

  const update = () => {
    if (current && carousel.settings.current.pager) {
      current.textContent = carousel.state.index + 1;
    }
  };

  carousel.registerHook('init', () => {
    if (!container) {
      container = carousel.shadowRoot.querySelector('[part="pager"]');
      [current, total] = ['current', 'total'].map(name => carousel.getSlotElements(name)[0]);
    }

    if (!current || !total) return;

    carousel.constructor.setVisibility(container, carousel.settings.current.pager && carousel.state.pageCount > 1);
    total.textContent = carousel.state.pageCount;
    update();
  });

  carousel.registerHook('updateState', update);
};

export const PagerFeature = Base => class extends Base {
  constructor() {
    super();
    pager(this);
  }
};
