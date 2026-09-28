/**
 * Controls feature for SnapCarousel
 * Adds previous/next navigation buttons
 * @param {import('../base-carousel').BaseCarousel} carousel
 */
export const controls = carousel => {
  let container;
  const buttons = [];

  /**
   * Update navigation button states and their aria-controls
   */
  const update = () => {
    const { loop } = carousel.settings.current;
    const { index, pageCount, pages } = carousel.state;
    let shouldShiftFocus = false;

    buttons.forEach(button => {
      const target = loop
        ? ((index + button.modifier) % pageCount + pageCount) % pageCount
        : index + button.modifier;
      const isDisabled = !pages[target];

      // A disabled button loses focus, hand it over to another one
      if (isDisabled && button.matches(':focus')) {
        shouldShiftFocus = true;
      }

      button.disabled = isDisabled;

      if (isDisabled) {
        button.removeAttribute('aria-controls');
      } else {
        button.setAttribute('aria-controls', pages[target].map(item => item.id).join(' '));
      }
    });

    if (shouldShiftFocus) {
      buttons.find(button => !button.disabled)?.focus();
    }
  };

  carousel.registerHook('init', () => {
    const { current } = carousel.settings;

    container ||= carousel.shadowRoot.querySelector('[part="buttons"]');
    carousel.constructor.setVisibility(container, current.controls && carousel.state.pageCount > 1);

    // Labels of the default buttons. The aria-label keeps the name when the
    // label part is hidden to show only an icon.
    container.querySelectorAll('[part~="control-button"]').forEach(button => {
      const label = button.getAttribute('direction') === 'prev' ? current.prevLabel : current.nextLabel;
      button.ariaLabel = label;
      button.querySelector('[part$="-label"]').textContent = label;
    });

    [...carousel.getSlotElements('prev-buttons'), ...carousel.getSlotElements('next-buttons')].forEach(button => {
      if (buttons.includes(button)) return;

      button.modifier = (button.getAttribute('direction') === 'prev' ? -1 : 1) *
        (parseInt(button.getAttribute('modifier'), 10) || 1);

      button.addEventListener('click', () => {
        if (carousel.settings.current.controls) {
          carousel.goTo(carousel.state.index + button.modifier);
        }
      });

      buttons.push(button);
    });

    update();
  });

  carousel.registerHook('updateState', update);
};

export const ControlsFeature = Base => class extends Base {
  constructor() {
    super();
    controls(this);
  }
};
