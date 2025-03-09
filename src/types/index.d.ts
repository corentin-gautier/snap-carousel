import { BaseCarousel } from './base-carousel';

export class SnapCarousel extends BaseCarousel {
    static get observedAttributes(): string[];
}

export { BaseCarousel } from './base-carousel';
export { ControlsFeature } from './features/controls';
export { NavFeature } from './features/nav';
export { PagerFeature } from './features/pager';

