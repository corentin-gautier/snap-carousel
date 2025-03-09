/**
 * SnapCarousel 🚀
 * A lightweight vanilla JavaScript carousel library using modern web technologies
 *
 * Features:
 * - Smooth scrolling with snap points
 * - Responsive breakpoints
 * - Touch and keyboard navigation
 * - Autoplay with pause on hover
 * - RTL support
 * - Vertical mode
 *
 * Events:
 * - scrollstart: Fired when scrolling begins
 * - scrollupdate: Fired during scroll with updated state
 * - scrollend: Fired when scrolling ends
 *
 * Usage Examples:
 *
 * 1. Using as a Web Component (all features included):
 * ```html
 * <script src="snap-carousel.iife.js"></script>
 * <snap-carousel displayed="3" gap="20" controls nav>
 *   <div slot="scroller">
 *     <div>Slide 1</div>
 *     <div>Slide 2</div>
 *     <div>Slide 3</div>
 *   </div>
 * </snap-carousel>
 * ```
 *
 * 2. Using ES Modules (all features):
 * ```js
 * import { SnapCarousel } from '@snap-carousel/snap-carousel';
 * customElements.define('snap-carousel', SnapCarousel);
 * ```
 *
 * 3. Custom Build with Selected Features:
 * ```js
 * import { BaseCarousel, createCarousel } from '@snap-carousel/base-carousel';
 * import { NavFeature } from '@snap-carousel/features/nav';
 * import { PagerFeature } from '@snap-carousel/features/pager';
 *
 * // Create custom carousel with only navigation and pager
 * const CustomCarousel = createCarousel(NavFeature, PagerFeature);
 * customElements.define('custom-carousel', CustomCarousel);
 * ```
 *
 * 4. Using Individual Features:
 * ```js
 * // Import specific features
 * import { ControlsFeature } from '@snap-carousel/features/controls';
 * import { NavFeature } from '@snap-carousel/features/nav';
 * import { PagerFeature } from '@snap-carousel/features/pager';
 *
 * // Create carousel with only the features you need
 * const MinimalCarousel = createCarousel(ControlsFeature);
 * const FullCarousel = createCarousel(ControlsFeature, NavFeature, PagerFeature);
 *
 * // Register custom elements
 * customElements.define('minimal-carousel', MinimalCarousel);
 * customElements.define('full-carousel', FullCarousel);
 * ```
 *
 * 5. Using with Module Bundlers (webpack, rollup, vite):
 * ```js
 * // Import only what you need
 * import { BaseCarousel, createCarousel } from '@snap-carousel/base-carousel';
 * import { ControlsFeature } from '@snap-carousel/features/controls';
 *
 * // Tree-shaking will remove unused features
 * const MyCarousel = createCarousel(ControlsFeature);
 * customElements.define('my-carousel', MyCarousel);
 * ```
 *
 * Configuration Options:
 *
 * @property {number} displayed=1 - Number of items visible in the viewport at once
 * @property {number} per-page=1 - Number of items to scroll per navigation action
 * @property {string} gap="0" - Space between carousel items (CSS units, e.g., "1rem", "16px")
 * @property {string} padding="0" - Inline padding around the carousel viewport (CSS units)
 * @property {boolean} controls=false - Show previous/next navigation buttons
 * @property {boolean} nav=false - Show navigation dots for direct slide access
 * @property {boolean} pager=false - Show current/total slides counter
 * @property {boolean} loop=false - Enable infinite looping of carousel items
 * @property {number} autoplay=0 - Autoplay interval in milliseconds (0 to disable)
 * @property {boolean} use-pause=false - Pause autoplay on hover
 * @property {string} behavior="smooth" - Scroll behavior ("smooth" or "auto")
 * @property {boolean} stop=false - Force stopping at each step (scroll-snap-stop: always)
 * @property {boolean} vertical=false - Enable vertical scrolling mode instead of horizontal
 * @property {object} responsive=null - Breakpoint-specific settings
 *
 * Example responsive configuration:
 * ```js
 * responsive='[{
 *   "breakpoint": "1024",
 *   "settings": {
 *     "displayed": "2",
 *     "per-page": "2"
 *   }
 * }]'
 * ```
 *
 * Available Features:
 *
 * 1. Controls Feature (ControlsFeature):
 *    - Adds previous/next navigation buttons
 *    - Customizable button appearance via slots
 *    - Automatic disable state based on carousel position
 *
 * 2. Navigation Feature (NavFeature):
 *    - Adds dot navigation for direct slide access
 *    - Customizable dot appearance and layout
 *    - Automatic active state handling
 *
 * 3. Pager Feature (PagerFeature):
 *    - Adds current/total slides counter
 *    - Customizable separator and number format
 *    - Updates automatically during navigation
 *
 * Customization:
 *
 * 1. Slots:
 *    - scroller: Main content container
 *    - prev-buttons: Previous navigation buttons
 *    - next-buttons: Next navigation buttons
 *    - prev-icon: Previous button icon
 *    - next-icon: Next button icon
 *    - prev-label: Previous button label
 *    - next-label: Next button label
 *    - pagination: Navigation dots container
 *    - sep: Pager separator
 *
 * 2. CSS Parts:
 *    - prev-button: Previous button styling
 *    - next-button: Next button styling
 *    - pagination: Navigation dots container styling
 *    - pager: Page counter styling
 *    - current: Current page number styling
 *    - total: Total pages number styling
 *
 * @example
 * <snap-carousel displayed="3" gap="20" controls nav>
 *   <div slot="scroller">
 *     <div>Slide 1</div>
 *     <div>Slide 2</div>
 *     <div>Slide 3</div>
 *   </div>
 * </snap-carousel>
 */

import { BaseCarousel, createCarousel } from './base-carousel';
import { ControlsFeature } from './features/controls';
import { NavFeature } from './features/nav';
import { PagerFeature } from './features/pager';

// Create carousel variants with different feature combinations
export const SnapCarousel = createCarousel(ControlsFeature, NavFeature, PagerFeature);
export const SnapCarouselNav = createCarousel(NavFeature);
export const SnapCarouselPager = createCarousel(PagerFeature);
export const SnapCarouselControls = createCarousel(ControlsFeature);
export const SnapCarouselNavControls = createCarousel(NavFeature, ControlsFeature);
export const SnapCarouselNavPager = createCarousel(NavFeature, PagerFeature);
export const SnapCarouselPagerControls = createCarousel(PagerFeature, ControlsFeature);

// Export features and base components
export { BaseCarousel, createCarousel } from './base-carousel';
export { ControlsFeature } from './features/controls';
export { NavFeature } from './features/nav';
export { PagerFeature } from './features/pager';

export default SnapCarousel;

// Register default snap-carousel only if this is the main bundle
if ('customElements' in window && import.meta.url.endsWith('snap-carousel.js')) {
  BaseCarousel.registerElement('snap-carousel', SnapCarousel);
}
