import { BaseCarousel, CarouselFeature } from '../base-carousel';

export interface ControlsFeatureOptions {
    controls?: boolean;
}

export declare class ControlsFeature implements CarouselFeature {
    private carousel: BaseCarousel;

    constructor(carousel: BaseCarousel);

    init(): void;
    destroy(): void;
    update(): void;

    private createControls(): void;
    private removeControls(): void;
    private updateControlsState(): void;
}
