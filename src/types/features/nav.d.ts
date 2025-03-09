import { BaseCarousel, CarouselFeature } from '../base-carousel';

export interface NavFeatureOptions {
    nav?: boolean;
}

export declare class NavFeature implements CarouselFeature {
    private carousel: BaseCarousel;

    constructor(carousel: BaseCarousel);

    init(): void;
    destroy(): void;
    update(): void;

    private createNavigation(): void;
    private removeNavigation(): void;
    private updateNavigationState(): void;
}
