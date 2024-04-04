# Snap Carousel

A very lightweight (4.7kB gzip) carousel library using the css [scroll-snap](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type) feature and the custom element shadow DOM to allow customization

Check de [demo](https://corentin-gautier.github.io/snap-carousel/) for examples

## Features
- Prev/Next buttons
- Pagination
- Pager (ie: "1 of 6")
- loop (the css one, no cloning)
- autoplay with stop on hover
- Responsive configuration

## Documentation

### How to use : Example
```html
<snap-carousel
    displayed="2"
    per-page="1"
    nav
    controls
    stop
    gap="16"
    padding="16"
    behavior="smooth"
    loop
    autoplay="3000"
    use-pause
    responsive="..."
>
</snap-carousel>
```

### Options
TODO
| Attribute     | Signification |
| ------------- | ------------- |
| vertical     | ...  |
| displayed     | ...  |
| per-page      | ...  |
| nav      | ...  |
| controls      | ...  |
| pager      | ...  |
| stop      | ...  |
| gap      | ...  |
| padding      | ...  |
| behaviour      | ...  |
| loop      | ...  |
| autoplay      | ...  |
| use-pause      | ...  |
| responsive      | ...  |

## Customize the controls
TODO
