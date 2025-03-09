var b = (s) => {
  throw TypeError(s);
};
var f = (s, t, i) => t.has(s) || b("Cannot " + i);
var n = (s, t, i) => (f(s, t, "read from private field"), i ? i.call(s) : t.get(s)), c = (s, t, i) => t.has(s) ? b("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, i);
var d = (s, t, i) => (f(s, t, "access private method"), i);
const E = (s) => {
  var t, i, m, g, u;
  return u = class extends s {
    constructor() {
      super();
      c(this, i);
      c(this, t, []);
      this.elements.controls = n(this, t), this.registerHook("init", d(this, i, m).bind(this)), this.registerHook("updateState", d(this, i, g).bind(this));
    }
  }, t = new WeakMap(), i = new WeakSet(), m = function() {
    const { current: h } = this.settings, a = !h.controls || this.state.pageCount < 2, l = this.getSlotElements("prev-buttons"), o = this.getSlotElements("next-buttons");
    (l.length || o.length) && (n(this, t).push(...l, ...o), n(this, t).forEach((e) => {
      e.style = a ? "display: none !important;" : "", e.hasListener || (e.direction = e.getAttribute("direction") || "next", e.modifier = (e.direction === "next" ? 1 : -1) * (parseInt(e.getAttribute("modifier"), 10) || 1), e.hasListener = !0, e.addEventListener("click", () => {
        h.controls && this.goTo(this.state.index + e.modifier);
      }), Object.assign(e, { ariaControls: this.elements.scroller.id }));
    }), d(this, i, g).call(this));
  }, g = function() {
    if (!n(this, t).length) return;
    const { loop: h } = this.settings.current, { index: a, pageCount: l } = this.state;
    let o = !1;
    if (n(this, t).forEach((e) => {
      const r = !h && (e.direction === "next" ? a >= l - e.modifier : a < Math.abs(e.modifier));
      e === this.shadowRoot.activeElement && r && (o = !0), e.disabled = r, e.setAttribute("aria-disabled", r);
    }), o) {
      const e = n(this, t).filter((r) => !r.disabled);
      e.length && e[0].focus();
    }
  }, u;
};
export {
  E as ControlsFeature
};
