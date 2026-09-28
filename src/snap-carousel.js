/**
 * SnapCarousel 🚀
 * A lightweight vanilla JavaScript carousel library using modern web technologies
 *
 * Importing this module registers <snap-carousel>.
 *
 * Default prev/next buttons and nav dots are drawn by the browser
 * (::scroll-button, ::scroll-marker) where supported. Otherwise, or when the
 * carousel needs something the native version can't do (custom slotted
 * buttons or dots, loop, stepping by fewer slides than displayed), the JS
 * feature is downloaded instead. The pager is always JS.
 *
 * ```html
 * <script type="module" src="https://unpkg.com/snap-carousel.js"></script>
 * <snap-carousel displayed="3" gap="20" controls nav>
 *   <div slot="scroller">
 *     <div>Slide 1</div>
 *     <div>Slide 2</div>
 *     <div>Slide 3</div>
 *   </div>
 * </snap-carousel>
 * ```
 *
 * To build a custom element without registering <snap-carousel>, import from
 * 'snap-carousel.js/base' and 'snap-carousel.js/features/*' instead.
 */

import { BaseCarousel } from './base-carousel';

const features = {
  controls: () => import('./features/controls').then(module => module.controls),
  nav: () => import('./features/nav').then(module => module.nav),
  pager: () => import('./features/pager').then(module => module.pager)
};

// Slots whose content only the JS features can render
const customSlots = {
  controls: ['prev-buttons', 'next-buttons', 'before-prev', 'after-next', 'prev-icon', 'next-icon'],
  nav: ['pagination']
};

let native;

export class SnapCarousel extends BaseCarousel {
  #loaded = new Set();

  constructor() {
    super();
    // Registered before any feature, so it runs first on every init
    this.registerHook('init', () => this.#chooseFeatures());
  }

  #chooseFeatures() {
    const { current } = this.settings;

    native ??= CSS.supports('scroll-marker-group: after');

    // Native buttons scroll by about one viewport: whole displayed slides
    const canBeNative = {
      controls: !current.loop && current.perPage >= Math.floor(current.displayed),
      nav: true
    };

    Object.keys(customSlots).forEach(name => {
      const isNative = native && current[name] && canBeNative[name] &&
        !this.querySelector(customSlots[name].map(slot => `:scope > [slot="${slot}"]`).join());

      this.states[isNative ? 'add' : 'delete']('native-' + name);

      // Keeps the JS feature hidden if it was loaded for another breakpoint
      if (isNative) current[name] = false;
    });

    Object.keys(features).forEach(name => {
      if (!current[name] || this.#loaded.has(name)) return;
      this.#loaded.add(name);
      features[name]().then(feature => this.use(feature));
    });
  }
}

export { BaseCarousel, createCarousel } from './base-carousel';

export default SnapCarousel;

if (typeof window !== 'undefined') {
  BaseCarousel.registerElement('snap-carousel', SnapCarousel);
}
