import { BaseCarousel, CarouselFeature } from '../base-carousel';

export interface PagerFeatureOptions {
    pager?: boolean;
}

export declare class PagerFeature implements CarouselFeature {
    private carousel: BaseCarousel;

    constructor(carousel: BaseCarousel);

    init(): void;
    destroy(): void;
    update(): void;

    private createPager(): void;
    private removePager(): void;
    private updatePagerState(): void;
}
