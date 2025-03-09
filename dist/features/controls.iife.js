var f = (e) => {
  throw TypeError(e);
};
var m = (e, t, s) => t.has(e) || f("Cannot " + s);
var r = (e, t, s) => (m(e, t, "read from private field"), s ? s.call(e) : t.get(e)), u = (e, t, s) => t.has(e) ? f("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s);
var d = (e, t, s) => (m(e, t, "access private method"), s);
const A = (e) => {
  var t, s, p, b, g;
  return g = class extends e {
    constructor() {
      super();
      u(this, s);
      u(this, t, { container: null, buttons: [] });
      this.elements.controls = r(this, t), this.registerHook("init", d(this, s, p).bind(this)), this.registerHook("updateState", d(this, s, b).bind(this));
    }
  }, t = new WeakMap(), s = new WeakSet(), p = function() {
    const { current: a } = this.settings, c = !a.controls || this.state.pageCount < 2, l = this.getSlotElements("prev-buttons"), h = this.getSlotElements("next-buttons");
    if (r(this, t).container = this.shadowRoot.querySelector('[part="buttons"]'), !r(this, t).container) return;
    const { container: i, buttons: o } = r(this, t);
    e.setVisibility(i, !c), (l.length || h.length) && (o.push(...l, ...h), o.forEach((n) => {
      n.hasListener || (n.direction = n.getAttribute("direction") || "next", n.modifier = (n.direction === "next" ? 1 : -1) * (parseInt(n.getAttribute("modifier"), 10) || 1), n.hasListener = !0, n.addEventListener("click", () => {
        a.controls && this.goTo(this.state.index + n.modifier);
      }), n.setAttribute("aria-controls", this.elements.scroller.id));
    }), d(this, s, b).call(this));
  }, b = function() {
    if (!r(this, t).buttons.length) return;
    const { loop: a } = this.settings.current, { index: c, pageCount: l } = this.state;
    let h = !1;
    if (r(this, t).buttons.forEach((i) => {
      const o = !a && (i.direction === "next" ? c >= l - i.modifier : c < Math.abs(i.modifier));
      i === this.shadowRoot.activeElement && o && (h = !0), i.disabled = !!o, i.setAttribute("aria-disabled", !!o);
    }), h) {
      const i = r(this, t).buttons.filter((o) => !o.disabled);
      i.length && i[0].focus();
    }
  }, g;
};
export {
  A as ControlsFeature
};
