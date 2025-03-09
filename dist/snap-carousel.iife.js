import { createCarousel as e } from "./base-carousel.iife.js";
import { BaseCarousel as v } from "./base-carousel.iife.js";
import { ControlsFeature as a } from "./features/controls.iife.js";
import { NavFeature as s } from "./features/nav.iife.js";
import { PagerFeature as o } from "./features/pager.iife.js";
const r = e(a, s, o), n = e(s), t = e(o), l = e(a), u = e(s, a), m = e(s, o), p = e(o, a);
"customElements" in window && (customElements.define("snap-carousel", r), customElements.define("snap-carousel-nav", n), customElements.define("snap-carousel-pager", t), customElements.define("snap-carousel-controls", l), customElements.define("snap-carousel-nav-controls", u), customElements.define("snap-carousel-nav-pager", m), customElements.define("snap-carousel-pager-controls", p));
export {
  v as BaseCarousel,
  a as ControlsFeature,
  s as NavFeature,
  o as PagerFeature,
  r as SnapCarousel,
  l as SnapCarouselControls,
  n as SnapCarouselNav,
  u as SnapCarouselNavControls,
  m as SnapCarouselNavPager,
  t as SnapCarouselPager,
  p as SnapCarouselPagerControls,
  e as createCarousel
};
