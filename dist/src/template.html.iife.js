const n = `<slot name="scroller">
  <ul></ul>
</slot>

<div part="controls">
  <div part="buttons">
    <slot name="before-prev"></slot>
    <slot name="prev-buttons">
      <button part="button control-button prev-button" type="button" direction="prev" aria-label="Previous">
        <slot name="prev-icon"></slot>
        <slot name="prev-label">Previous</slot>
      </button>
    </slot>
    <slot name="next-buttons">
      <button part="button control-button next-button" type="button" direction="next" aria-label="Next">
        <slot name="next-label">Next</slot>
        <slot name="next-icon"></slot>
      </button>
    </slot>
    <slot name="after-next"></slot>
  </div>

  <slot name="pagination">
    <div part="nav"></div>
  </slot>

  <div part="pager">
    <slot name="current">
      <span part="current"></span>
    </slot>
    <slot name="sep">
      <span part="page-sep">&nbsp;/&nbsp;</span>
    </slot>
    <slot name="total">
      <span part="total"></span>
    </slot>
  </div>
</div>
`;
export {
  n as default
};
