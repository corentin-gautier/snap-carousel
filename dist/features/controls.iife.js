var b = (s) => {
  throw TypeError(s);
};
var f = (s, e, i) => e.has(s) || b("Cannot " + i);
var n = (s, e, i) => (f(s, e, "read from private field"), i ? i.call(s) : e.get(s)), d = (s, e, i) => e.has(s) ? b("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(s) : e.set(s, i);
var c = (s, e, i) => (f(s, e, "access private method"), i);
const E = (s) => {
  var e, i, m, g, u;
  return u = class extends s {
    constructor() {
      super();
      d(this, i);
      d(this, e, []);
      this.elements.controls = n(this, e), this.registerHook("init", c(this, i, m).bind(this)), this.registerHook("updateState", c(this, i, g).bind(this));
    }
  }, e = new WeakMap(), i = new WeakSet(), m = function() {
    const { current: h } = this.settings, a = !h.controls || this.state.pageCount < 2, l = this.getSlotElements("prev-buttons"), o = this.getSlotElements("next-buttons");
    (l.length || o.length) && (n(this, e).push(...l, ...o), n(this, e).forEach((t) => {
      console.log(t), t.style = a ? "display: none !important;" : "", t.hasListener || (t.direction = t.getAttribute("direction") || "next", t.modifier = (t.direction === "next" ? 1 : -1) * (parseInt(t.getAttribute("modifier"), 10) || 1), t.hasListener = !0, t.addEventListener("click", () => {
        h.controls && this.goTo(this.state.index + t.modifier);
      }), Object.assign(t, { ariaControls: this.elements.scroller.id }));
    }), c(this, i, g).call(this));
  }, g = function() {
    if (!n(this, e).length) return;
    const { loop: h } = this.settings.current, { index: a, pageCount: l } = this.state;
    let o = !1;
    if (n(this, e).forEach((t) => {
      const r = !h && (t.direction === "next" ? a >= l - t.modifier : a < Math.abs(t.modifier));
      t === this.shadowRoot.activeElement && r && (o = !0), t.disabled = r, t.setAttribute("aria-disabled", r);
    }), o) {
      const t = n(this, e).filter((r) => !r.disabled);
      t.length && t[0].focus();
    }
  }, u;
};
export {
  E as ControlsFeature
};
