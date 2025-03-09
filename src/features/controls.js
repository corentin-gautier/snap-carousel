/**
 * Controls feature for SnapCarousel
 * Adds previous/next navigation buttons
 */
export const ControlsFeature = Base => class extends Base {
  // Feature-specific elements
  #controls = {
    container: null,
    buttons: []
  };

  constructor() {
    super();
    // Add controls to elements
    this.elements.controls = this.#controls;
    // Register hooks
    this.registerHook('init', this.#createControls.bind(this));
    this.registerHook('updateState', this.#setButtonsState.bind(this));
  }

  /**
   * Create navigation controls
   */
  #createControls() {
    const { current } = this.settings;
    const hideButtons = !current.controls || this.state.pageCount < 2;

    // Get all control buttons
    const prevButtons = this.getSlotElements('prev-buttons');
    const nextButtons = this.getSlotElements('next-buttons');

    this.#controls.container = this.shadowRoot.querySelector('[part="buttons"]');
    if (!this.#controls.container) return;

    const { container, buttons } = this.#controls;

    // Show/hide buttons based on settings
    Base.setVisibility(container, !hideButtons);

    if (!prevButtons.length && !nextButtons.length) return;

    buttons.push(...prevButtons, ...nextButtons);

    buttons.forEach(button => {

      if (button.hasListener) return;

      // Setup button properties
      button.direction = button.getAttribute('direction') || 'next';
      button.modifier = (button.direction === 'next' ? 1 : -1) *
        (parseInt(button.getAttribute('modifier'), 10) || 1);
      button.hasListener = true;

      // Add click handler
      button.addEventListener('click', () => {
        if (!current.controls) return;
        this.goTo(this.state.index + button.modifier);
      });

      // Setup accessibility
      Object.assign(button, {
        ariaControls: this.elements.scroller.id
      });
    });

    // Set initial button states
    this.#setButtonsState();
  }

  /**
   * Update navigation button states
   */
  #setButtonsState() {
    if (!this.#controls.buttons.length) return;

    const { loop } = this.settings.current;
    const { index, pageCount } = this.state;
    let shouldShiftFocus = false;

    this.#controls.buttons.forEach(button => {
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

      button.disabled = isDisabled;
      button.setAttribute('aria-disabled', isDisabled);
    });

    // Move focus if needed
    if (shouldShiftFocus) {
      const active = this.#controls.buttons.filter(b => !b.disabled);
      if (active.length) {
        active[0].focus();
      }
    }
  }
};
