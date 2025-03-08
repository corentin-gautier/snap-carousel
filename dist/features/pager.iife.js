var c = (e) => {
  throw TypeError(e);
};
var u = (e, t, s) => t.has(e) || c("Cannot " + s);
var i = (e, t, s) => (u(e, t, "read from private field"), s ? s.call(e) : t.get(e)), n = (e, t, s) => t.has(e) ? c("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s);
var r = (e, t, s) => (u(e, t, "access private method"), s);
const f = (e) => {
  var t, s, l, p, a;
  return a = class extends e {
    constructor() {
      super();
      n(this, s);
      n(this, t, { container: null, current: null, sep: null, total: null });
      this.elements.pager = i(this, t), this.registerHook("init", r(this, s, l).bind(this)), this.registerHook("updateState", r(this, s, p).bind(this));
    }
  }, t = new WeakMap(), s = new WeakSet(), l = function() {
    const { current: g } = this.settings;
    if (!i(this, t).container) {
      if (i(this, t).container = this.shadowRoot.querySelector('[part="pager"]'), !i(this, t).container) return;
      ["current", "sep", "total"].forEach((h) => {
        const o = this.getSlotElements(h)[0];
        o && (i(this, t)[h] = o);
      });
    }
    i(this, t).current && i(this, t).total && (i(this, t).container.style.display = g.pager && this.state.pageCount > 1 ? "" : "none", i(this, t).current.innerHTML = 1, i(this, t).total.innerHTML = this.state.pageCount);
  }, p = function() {
    this.settings.current.pager && i(this, t).current && (i(this, t).current.innerHTML = this.state.index + 1);
  }, a;
};
export {
  f as PagerFeature
};
