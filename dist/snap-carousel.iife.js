import { createCarousel as e } from "./base-carousel.iife.js";
import { BaseCarousel as p } from "./base-carousel.iife.js";
import { ControlsFeature as a } from "./features/controls.iife.js";
import { NavFeature as r } from "./features/nav.iife.js";
import { PagerFeature as o } from "./features/pager.iife.js";
const s = e(a, r, o);
"customElements" in window && customElements.define("snap-carousel", s);
export {
  p as BaseCarousel,
  a as ControlsFeature,
  r as NavFeature,
  o as PagerFeature,
  s as SnapCarousel,
  e as createCarousel
};
