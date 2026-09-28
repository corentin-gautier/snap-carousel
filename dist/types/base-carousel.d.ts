export interface CarouselOptions {
    autoplay?: number;
    displayed?: number;
    perPage?: number;
    gap?: string | number;
    padding?: string | number;
    controls?: boolean;
    nav?: boolean;
    pager?: boolean;
    prevLabel?: string;
    nextLabel?: string;
    pagerSeparator?: string;
    loop?: boolean;
    behavior?: 'smooth' | 'auto';
    stop?: boolean;
    usePause?: boolean;
    vertical?: boolean;
    responsive?: Array<{
        breakpoint: number | string;
        settings: Partial<CarouselOptions>;
    }>;
    sync?: string | null;
}

export interface CarouselState {
    index: number;
    itemsCount: number;
    pageCount: number;
    pages: HTMLElement[][];
    isVisible: boolean;
    autoplayInterval: ReturnType<typeof setTimeout> | null;
    breakpoint: number | string | null | undefined;
    ready: boolean;
    isMoving: boolean;
    pause: boolean;
}

export interface CarouselElements {
    scroller: HTMLElement | null;
    items: HTMLElement[];
    sync: Element[] | null;
    [feature: string]: unknown;
}

export type CarouselHook = 'setup' | 'init' | 'updateState';

/** A feature attached to one carousel instance, usable with `carousel.use()` */
export type CarouselPlugin = (carousel: BaseCarousel) => void;

/** A feature mixin, usable with `createCarousel()` */
export type CarouselMixin = <T extends typeof BaseCarousel>(Base: T) => T;

export interface CarouselEventMap extends HTMLElementEventMap {
    scrollstart: CustomEvent<CarouselState>;
    scrollupdate: CustomEvent<CarouselState>;
    scrollend: CustomEvent<CarouselState>;
}

export declare class BaseCarousel extends HTMLElement {
    static readonly defaultConfig: Required<CarouselOptions>;
    static readonly observedAttributes: string[];
    static setVisibility(element: HTMLElement, condition: boolean): void;
    static registerElement(name: string, constructor: CustomElementConstructor): void;

    readonly elements: CarouselElements;
    readonly settings: {
        default: Required<CarouselOptions>;
        origin: Required<CarouselOptions>;
        current: Required<CarouselOptions>;
    };
    readonly state: CarouselState;
    readonly preventUiUpdate: boolean;
    /** Custom states of the element, matched with `:state()` in CSS */
    readonly states: CustomStateSet;

    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(): void;

    goTo(page: number): void;
    prev(): void;
    next(): void;

    isLtr(): boolean;
    getSlotElements(slotName: string, options?: { fallback?: boolean }): HTMLElement[];
    registerHook(type: CarouselHook, callback: (this: this, index?: number) => void): void;
    use(feature: CarouselPlugin): void;

    addEventListener<K extends keyof CarouselEventMap>(type: K, listener: (this: this, ev: CarouselEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
}

export declare function createCarousel(...features: CarouselMixin[]): typeof BaseCarousel;
