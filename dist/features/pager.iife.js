var c = (e) => {
  throw TypeError(e);
};
var u = (e, t, s) => t.has(e) || c("Cannot " + s);
var i = (e, t, s) => (u(e, t, "read from private field"), s ? s.call(e) : t.get(e)), r = (e, t, s) => t.has(e) ? c("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s);
var n = (e, t, s) => (u(e, t, "access private method"), s);
const L = (e) => {
  var t, s, l, g, o;
  return o = class extends e {
    constructor() {
      super();
      r(this, s);
      r(this, t, { container: null, current: null, sep: null, total: null });
      this.elements.pager = i(this, t), this.registerHook("init", n(this, s, l).bind(this)), this.registerHook("updateState", n(this, s, g).bind(this));
    }
  }, t = new WeakMap(), s = new WeakSet(), l = function() {
    const { current: p } = this.settings;
    if (!i(this, t).container) {
      if (i(this, t).container = this.shadowRoot.querySelector('[part="pager"]'), !i(this, t).container) return;
      ["current", "sep", "total"].forEach((a) => {
        const h = this.getSlotElements(a)[0];
        h && (i(this, t)[a] = h);
      });
    }
    if (!i(this, t).current || !i(this, t).total) return;
    const { container: d, current: H, total: f } = i(this, t);
    e.setVisibility(d, p.pager && this.state.pageCount > 1), H.innerHTML = 1, f.innerHTML = this.state.pageCount;
  }, g = function() {
    this.settings.current.pager && i(this, t).current && (i(this, t).current.innerHTML = this.state.index + 1);
  }, o;
};
export {
  L as PagerFeature
};
