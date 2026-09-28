# Snap Carousel

[![npm version](https://badge.fury.io/js/snap-carousel.js.svg)](https://badge.fury.io/js/snap-carousel.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, lightweight (4kB gzip core) JavaScript carousel component that leverages the power of CSS [scroll-snap](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type) and custom element shadow DOM. Perfect for creating responsive, performant, and customizable image galleries, product carousels, and content sliders.

[View Demo](https://corentin-gautier.github.io/snap-carousel/) | [Documentation](#documentation) | [Installation](#installation) | [Usage](#usage)

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Documentation](#documentation)
  - [Basic Usage](#basic-usage)
  - [Configuration Options](#configuration-options)
  - [Examples](#examples)
- [Browser Support](#browser-support)
- [Migrating from 1.x](#migrating-from-1x)
- [Contributing](#contributing)
- [License](#license)

## Features
- ✨ Lightweight: a 4kB gzipped core, and features are only downloaded when a carousel uses them
- 🎯 Previous/Next navigation buttons
- 📍 Pagination indicators
- 🔢 Pager display (e.g., "1 of 6")
- 🔄 loop (CSS-based, no element cloning)
- ⏯️ Autoplay that pauses on hover, on focus and when off screen
- 📱 Fully responsive configuration
- ⚙️ Configured entirely through HTML attributes, no CSS or JavaScript required
- 🎨 Customizable through shadow DOM
- 🚀 Zero dependencies

## Installation

```bash
npm install snap-carousel.js
# or
yarn add snap-carousel.js
```

## Documentation

### Basic Usage

Load the module once, anywhere on the page. It registers `<snap-carousel>`:

```html
<script type="module" src="https://unpkg.com/snap-carousel.js@2"></script>

<snap-carousel displayed="3" gap="16" controls nav>
  <div slot="scroller">
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
  </div>
</snap-carousel>
```

Only the code a carousel needs is downloaded:

| File | Gzipped | Loaded |
|------|---------|--------|
| `snap-carousel.js` + `base.js` | ~4.6 kB | always |
| `features/controls.js` | ~0.6 kB | when `controls` is set and the native buttons can't be used |
| `features/nav.js` | ~0.6 kB | when `nav` is set and the native dots can't be used |
| `features/pager.js` | ~0.3 kB | when `pager` is set |

A browser without native `scrollend` support also downloads a small polyfill. Run `npm run size` after a build for exact numbers.

### Native buttons and dots

Where the browser supports CSS carousels (`::scroll-button()` and `::scroll-marker`, currently Chrome and Edge 135+), the default prev/next buttons and nav dots are drawn by the browser, and no JavaScript is downloaded for them. Other browsers get the JS version, with the same content, placement and behaviour.

The JS version is also used in supporting browsers when a carousel needs something the native one can't do:
- custom content in the `prev-buttons`, `next-buttons`, `before-prev`, `after-next`, `prev-icon`, `next-icon` or `pagination` slots
- `loop` (native buttons stop at the ends)
- `per-page` lower than the number of whole slides displayed (native buttons move by a whole view)

The button text comes from the `prev-label` and `next-label` attributes (default "Previous" and "Next"), which can also be set per breakpoint in `responsive`.

#### Styling

Like in 1.x, the library ships no visual styles for buttons and dots. They're laid out below the slides (prev and next at both ends, then dots, then pager) and otherwise look like the browser's defaults. Style each look twice: once with `::part()` for the JS version, once with the native pseudo-elements.

```css
/* JS version */
snap-carousel::part(button) { /* prev/next and dots */ }
snap-carousel::part(prev-button),
snap-carousel::part(next-button) { /* prev/next only */ }
snap-carousel::part(nav) { /* dots container */ }
snap-carousel::part(active) { /* current dot */ }

/* Native version */
snap-carousel [snpc-s]::scroll-button(*) { /* prev/next */ }
snap-carousel [snpc-s]::scroll-button(*):disabled { }
snap-carousel [snpc-s]::scroll-marker-group { /* dots container */ }
snap-carousel [snpc-s] > *::scroll-marker { /* dots */ }
snap-carousel [snpc-s] > *::scroll-marker:target-current { /* current dot */ }
```

Keep the two versions in separate rules: a browser drops a whole rule when it doesn't know one of its selectors, so a rule listing both `::part(prev-button)` and `::scroll-button(*)` would be ignored by Safari and Firefox. A preprocessor mixin keeps the two in sync; the [demo page styles](src/main.scss) do this. Differences to account for on the native side:
- **Dots are links, not buttons.** Set `box-sizing: border-box` and `text-decoration: none` to match a styled button.
- **The dots container doesn't grow with its dots.** Chrome gives `::scroll-marker-group` size containment, so set its `height` to fit your dots (it defaults to `1.25rem`).
- Unstyled native dots are page numbers in plain text, while unstyled JS dots are default buttons.

For full control over the markup, slot your own buttons or pagination. The carousel then uses the JS version in every browser, and only your own styles apply.

### ES Modules Usage

```javascript
// Registers <snap-carousel>, with features loaded on demand
import 'snap-carousel.js';
```

To use another tag name or bundle features statically, import from `snap-carousel.js/base`. That entry has no side effects and doesn't register anything:

```javascript
import { createCarousel } from 'snap-carousel.js/base';
import { NavFeature } from 'snap-carousel.js/features/nav';
import { PagerFeature } from 'snap-carousel.js/features/pager';

customElements.define('custom-carousel', createCarousel(NavFeature, PagerFeature));
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `displayed` | number | `1` | Number of items visible in the viewport at once |
| `perPage` | number | `1` | Number of items to scroll per navigation action |
| `gap` | string/number | `0` | Space between carousel items (CSS units, e.g., "1rem", "16px") |
| `padding` | string/number | `0` | Padding around the carousel viewport (CSS units) |
| `controls` | boolean | `false` | Show previous/next navigation buttons |
| `nav` | boolean | `false` | Show navigation dots for direct slide access |
| `pager` | boolean | `false` | Show current/total slides counter |
| `prevLabel` | string | `"Previous"` | Text of the default previous button (attribute `prev-label`) |
| `nextLabel` | string | `"Next"` | Text of the default next button (attribute `next-label`) |
| `pagerSeparator` | string | `" / "` | Text between the current and total pages of the pager (attribute `pager-separator`) |
| `loop` | boolean | `false` | Wrap from the last page to the first and back. Without it, navigation stops at the ends (autoplay still rewinds) |
| `autoplay` | number | `0` | Autoplay interval in milliseconds (0 to disable) |
| `usePause` | boolean | `true` | Pause autoplay on hover and while the carousel has focus |
| `behavior` | string | `"smooth"` | Scroll behavior ("smooth" or "auto") |
| `stop` | boolean | `false` | Force stopping at each step (scroll-snap-stop: always) |
| `vertical` | boolean | `false` | Enable vertical scrolling mode |
| `responsive` | array | `[]` | Breakpoint-specific settings |
| `sync` | string | `null` | Selector for other carousels to sync with |

Example responsive configuration:
```html
<snap-carousel
  displayed="1"
  responsive='[{
    "breakpoint": 768,
    "settings": {
      "displayed": 2,
      "perPage": 2
    }
  }, {
    "breakpoint": 1024,
    "settings": {
      "displayed": 3,
      "perPage": 3
    }
  }]'>
  <div slot="scroller">
    <!-- carousel items -->
  </div>
</snap-carousel>
```

See the [Demo page](https://corentin-gautier.github.io/snap-carousel/) for more examples and configuration options.

### Examples

```html
<!-- Basic carousel with navigation -->
<snap-carousel controls nav>
  <div slot="scroller">
    <img src="slide1.jpg" alt="Slide 1">
    <img src="slide2.jpg" alt="Slide 2">
    <img src="slide3.jpg" alt="Slide 3">
  </div>
</snap-carousel>

<!-- Autoplay carousel with pagination -->
<snap-carousel autoplay="5000" nav pager>
  <div slot="scroller">
    <div>Content 1</div>
    <div>Content 2</div>
    <div>Content 3</div>
  </div>
</snap-carousel>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Requires browsers with support for:
- ES modules and custom elements with shadow DOM
- Constructable stylesheets and `ElementInternals`
- CSS scroll snap and media query range syntax

## Migrating from 1.x

- **The UMD build is gone.** Replace `<script src=".../snap-carousel.umd.min.js">` with `<script type="module" src="https://unpkg.com/snap-carousel.js@2"></script>`. Code that used the `SnapCarousel` global has to import from the module instead.
- **Importing the main entry registers `<snap-carousel>`.** Remove any `customElements.define('snap-carousel', SnapCarousel)` call, or import from `snap-carousel.js/base` instead.
- **Features moved to their own entries:** `snap-carousel.js/features/controls`, `/nav` and `/pager`. The preset classes (`SnapCarouselNav`, `SnapCarouselNavPager`…) were removed. Use `createCarousel()` with the features you need.
- **`goTo()` respects `loop`.** Without `loop`, going past either end stops at the first or last page instead of wrapping.
- **IDs are preserved.** The carousel and its slides keep any `id` you set. Generated IDs are only added when there is none.
- **`isDocumentLtr()` became `isLtr()`.** It reads the carousel's own direction, so `dir="rtl"` on any ancestor is taken into account, not only on `<html>`.
- **Default buttons and dots are native in Chrome and Edge.** `::part()` rules don't reach them; add the native selectors next to your `::part()` rules, see [Styling](#styling).
- **Default prev/next buttons are visible without CSS.** In 1.x they stayed hidden until a `::part()` rule gave them a `display`. They keep the browser's default look.
- **Layout:** the host uses `display: grid`. The `controls` part was removed, so styles on `::part(controls)` no longer apply. `[part="buttons"]` is a flex row with prev and next at both ends.
- **Label and pager slots were replaced by attributes.** Instead of the `prev-label` and `next-label` slots, set the `prev-label` and `next-label` attributes; the text is in the `prev-label` and `next-label` parts, which you can hide to show only an icon. Instead of the `sep` slot, set `pager-separator`. The `current` and `total` slots were removed; style the `current`, `page-sep` and `total` parts.
- **Accessibility:** the host is exposed as a `region` with the "carousel" role description through `ElementInternals`, instead of an `aria-roledescription` attribute. Only the active nav dot is in the tab order; arrow keys move between dots.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
