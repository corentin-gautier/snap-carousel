const defaultPart = 'button nav-button';

/**
 * Navigation dots feature for SnapCarousel
 * Adds pagination dots for visual navigation
 * @param {import('../base-carousel').BaseCarousel} carousel
 */
export const nav = carousel => {
  let container;
  let dots = [];
  let active;

  /**
   * Update active pagination dot, only the active one is in the tab order
   */
  const update = () => {
    const next = dots[carousel.state.index];
    if (!carousel.settings.current.nav || !next) return;

    if (active) {
      active.part = defaultPart;
      active.tabIndex = -1;
      active.ariaCurrent = 'false';
    }

    next.part = `${defaultPart} active`;
    next.tabIndex = 0;
    next.ariaCurrent = 'true';
    active = next;
  };

  /**
   * Arrow keys move between dots, following the carousel direction
   */
  const onKeyDown = event => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;

    const target = dots[carousel.state.index + (carousel.isLtr() ? step : -step)];
    if (target) {
      target.click();
      target.focus();
    }
  };

  carousel.registerHook('init', () => {
    const { pages, pageCount } = carousel.state;
    const show = carousel.settings.current.nav && pageCount > 1;

    if (!container) {
      container = carousel.getSlotElements('pagination')[0];
      if (!container) return;
      container.addEventListener('keydown', onKeyDown);
    }

    dots.forEach(dot => dot.remove());
    dots = [];
    active = null;

    carousel.constructor.setVisibility(container, show);
    if (!show) return;

    dots = pages.map((page, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.part = defaultPart;
      dot.tabIndex = -1;
      dot.textContent = index + 1;
      dot.setAttribute('aria-label', `Page ${index + 1}`);
      dot.setAttribute('aria-controls', page.map(item => item.id).join(' '));
      dot.setAttribute('aria-current', 'false');
      dot.addEventListener('click', () => carousel.goTo(index));
      return dot;
    });

    container.append(...dots);
    update();
  });

  carousel.registerHook('updateState', update);
};

export const NavFeature = Base => class extends Base {
  constructor() {
    super();
    nav(this);
  }
};
