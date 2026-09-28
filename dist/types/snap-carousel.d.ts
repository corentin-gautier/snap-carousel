import { BaseCarousel } from './base-carousel';

/** Carousel that loads controls, nav and pager only when its attributes enable them */
export declare class SnapCarousel extends BaseCarousel {}

export { BaseCarousel, createCarousel } from './base-carousel';
export type * from './base-carousel';

export default SnapCarousel;

declare global {
    interface HTMLElementTagNameMap {
        'snap-carousel': SnapCarousel;
    }
}
