import { createCarousel as a, BaseCarousel as o } from "./base-carousel.iife.js";
import { ControlsFeature as e } from "./features/controls.iife.js";
import { NavFeature as s } from "./features/nav.iife.js";
import { PagerFeature as r } from "./features/pager.iife.js";
const t = a(e, s, r), C = a(s), m = a(r), i = a(e), S = a(s, e), c = a(s, r), f = a(r, e);
"customElements" in window && import.meta.url.endsWith("snap-carousel.js") && o.registerElement("snap-carousel", t);
export {
  o as BaseCarousel,
  e as ControlsFeature,
  s as NavFeature,
  r as PagerFeature,
  t as SnapCarousel,
  i as SnapCarouselControls,
  C as SnapCarouselNav,
  S as SnapCarouselNavControls,
  c as SnapCarouselNavPager,
  m as SnapCarouselPager,
  f as SnapCarouselPagerControls,
  a as createCarousel,
  t as default
};
