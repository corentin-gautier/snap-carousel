const a = "snap-carousel:not([scrollbar]) [slot=scroller]::-webkit-scrollbar{display:none}snap-carousel [slot=scroller]{display:flex}snap-carousel[vertical]{display:flex;flex-direction:column}snap-carousel[vertical] [slot=scroller]{flex-direction:column;height:100%}snap-carousel [slot=scroller]>[data-index]{display:block;flex:0 0 auto}snap-carousel:not([vertical]) [slot=scroller]>[data-index]{width:calc((100% / var(--sc-perpage, 1)) - var(--sc-gap, 0) + (var(--sc-gap, 0) / var(--sc-perpage, 1)));max-width:100%}snap-carousel[vertical] [slot=scroller]>[data-index]{max-height:100%;height:calc((100% / var(--sc-perpage, 1)) - var(--sc-gap, 0) + (var(--sc-gap, 0) / var(--sc-perpage, 1)))}";
export {
  a as default
};
