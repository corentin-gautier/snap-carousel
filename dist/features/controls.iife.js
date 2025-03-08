var f = (e) => {
  throw TypeError(e);
};
var m = (e, t, s) => t.has(e) || f("Cannot " + s);
var o = (e, t, s) => (m(e, t, "read from private field"), s ? s.call(e) : t.get(e)), u = (e, t, s) => t.has(e) ? f("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s);
var c = (e, t, s) => (m(e, t, "access private method"), s);
const C = (e) => {
  var t, s, p, b, g;
  return g = class extends e {
    constructor() {
      super();
      u(this, s);
      u(this, t, { buttons: [] });
      this.elements.controls = o(this, t), this.registerHook("init", c(this, s, p).bind(this)), this.registerHook("updateState", c(this, s, b).bind(this));
    }
  }, t = new WeakMap(), s = new WeakSet(), p = function() {
    const { current: a } = this.settings, l = !a.controls || this.state.pageCount < 2, r = this.getSlotElements("prev-buttons"), d = this.getSlotElements("next-buttons");
    (r.length || d.length) && (o(this, t).buttons = [...r, ...d], o(this, t).buttons.forEach((i) => {
      i.style = l ? "display: none !important;" : "", i.hasListener || (i.direction = i.getAttribute("direction") || "next", i.modifier = (i.direction === "next" ? 1 : -1) * (parseInt(i.getAttribute("modifier"), 10) || 1), i.hasListener = !0, i.addEventListener("click", () => {
        a.controls && this.goTo(this.state.index + i.modifier);
      }), Object.assign(i, { ariaControls: this.elements.scroller.id }));
    }), c(this, s, b).call(this));
  }, b = function() {
    if (!o(this, t).buttons.length) return;
    const { loop: a } = this.settings.current, { buttons: l } = o(this, t), { index: r, pageCount: d } = this.state;
    let i = !1;
    if (l.forEach((n) => {
      const h = !a && (n.direction === "next" ? r >= d - n.modifier : r < Math.abs(n.modifier));
      n === this.shadowRoot.activeElement && h && (i = !0), n.disabled = h, n.setAttribute("aria-disabled", h);
    }), i) {
      const n = l.filter((h) => !h.disabled);
      n.length && n[0].focus();
    }
  }, g;
};
export {
  C as ControlsFeature
};
