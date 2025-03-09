# Snap Carousel

[![npm version](https://badge.fury.io/js/cg-snap-carousel.svg)](https://badge.fury.io/js/cg-snap-carousel)
[![gzip size](https://img.badgesize.io/https://unpkg.com/cg-snap-carousel/dist/snap-carousel.min.js?compression=gzip)](https://unpkg.com/cg-snap-carousel/dist/snap-carousel.min.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, lightweight (5.4kB gzip) JavaScript carousel component that leverages the power of CSS [scroll-snap](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type) and custom element shadow DOM. Perfect for creating responsive, performant, and customizable image galleries, product carousels, and content sliders.

[View Demo](https://corentin-gautier.github.io/snap-carousel/) | [Documentation](#documentation) | [Installation](#installation) | [Usage](#usage)

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Documentation](#documentation)
  - [Basic Usage](#basic-usage)
  - [Configuration Options](#configuration-options)
  - [Examples](#examples)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## Features
- ✨ Lightweight and performant - only 5.4kB gzipped
- 🎯 Previous/Next navigation buttons
- 📍 Pagination indicators
- 🔢 Pager display (e.g., "1 of 6")
- 🔄 loop (CSS-based, no element cloning)
- ⏯️ Autoplay with hover pause
- 📱 Fully responsive configuration
- 🎨 Customizable through shadow DOM
- 🚀 Zero dependencies

## Installation

```bash
npm install cg-snap-carousel
# or
yarn add cg-snap-carousel
```

## Documentation

### Basic Usage

```html
<snap-carousel>
  <div slot="scroller">
    <div>Slide 1</div>
    <div>Slide 2</div>
    <div>Slide 3</div>
  </div>
</snap-carousel>

<script>
  import 'cg-snap-carousel';
</script>
```

### ES Modules Usage

```javascript
// Import everything
import { SnapCarousel } from 'cg-snap-carousel';

// Register the web component
customElements.define('snap-carousel', SnapCarousel);

// Or import specific features
import { BaseCarousel, createCarousel } from 'cg-snap-carousel/base-carousel';
import { NavFeature } from 'cg-snap-carousel/features/nav';
import { PagerFeature } from 'cg-snap-carousel/features/pager';

// Create custom carousel with only navigation and pager
const CustomCarousel = createCarousel(NavFeature, PagerFeature);
customElements.define('custom-carousel', CustomCarousel);
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
| `loop` | boolean | `false` | Enable infinite looping of carousel items |
| `autoplay` | number | `0` | Autoplay interval in milliseconds (0 to disable) |
| `usePause` | boolean | `true` | Pause autoplay on hover |
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
- Custom Elements v1
- Shadow DOM v1
- CSS Scroll Snap

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
