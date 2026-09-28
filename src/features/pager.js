/**
 * Pager feature for SnapCarousel
 * Adds page numbers display (current/total)
 * @param {import('../base-carousel').BaseCarousel} carousel
 */
export const pager = carousel => {
  let container;

  const update = () => {
    if (carousel.settings.current.pager) {
      container.firstElementChild.textContent = carousel.state.index + 1;
    }
  };

  carousel.registerHook('init', () => {
    const { current } = carousel.settings;

    container ||= carousel.shadowRoot.querySelector('[part="pager"]');
    carousel.constructor.setVisibility(container, current.pager && carousel.state.pageCount > 1);

    const [, separator, total] = container.children;
    separator.textContent = current.pagerSeparator;
    total.textContent = carousel.state.pageCount;
    update();
  });

  carousel.registerHook('updateState', () => container && update());
};

export const PagerFeature = Base => class extends Base {
  constructor() {
    super();
    pager(this);
  }
};
