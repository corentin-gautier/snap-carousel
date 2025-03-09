export interface CarouselOptions {
    displayed?: number;
    perPage?: number;
    gap?: string;
    padding?: string;
    behavior?: 'smooth' | 'auto';
    loop?: boolean;
    autoplay?: number;
    usePause?: boolean;
    stop?: boolean;
    vertical?: boolean;
    responsive?: Array<{
        breakpoint: string;
        settings: Partial<CarouselOptions>;
    }>;
    scrollbar?: boolean;
    sync?: string;
}

export interface CarouselFeature {
    init(): void;
    destroy(): void;
    update?(): void;
}

export declare class BaseCarousel extends HTMLElement implements CarouselOptions {
    displayed: number;
    perPage: number;
    gap: string;
    padding: string;
    behavior: 'smooth' | 'auto';
    loop: boolean;
    autoplay: number;
    usePause: boolean;
    stop: boolean;
    vertical: boolean;
    responsive: Array<{
        breakpoint: string;
        settings: Partial<CarouselOptions>;
    }>;
    scrollbar: boolean;
    sync: string;

    constructor();

    static get observedAttributes(): string[];

    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;

    next(): void;
    prev(): void;
    goTo(index: number): void;
    getCurrentIndex(): number;
    getTotalSlides(): number;

    protected initializeFeatures(): void;
    protected destroyFeatures(): void;
    protected updateFeatures(): void;
}
