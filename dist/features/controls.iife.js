var x = (e) => {
  throw TypeError(e);
};
var E = (e, t, s) => t.has(e) || x("Cannot " + s);
var r = (e, t, s) => (E(e, t, "read from private field"), s ? s.call(e) : t.get(e)), b = (e, t, s) => t.has(e) ? x("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s);
var u = (e, t, s) => (E(e, t, "access private method"), s);
const C = (e) => {
  var t, s, A, g, f;
  return f = class extends e {
    constructor() {
      super();
      b(this, s);
      b(this, t, { container: null, buttons: [] });
      this.elements.controls = r(this, t), this.registerHook("init", u(this, s, A).bind(this)), this.registerHook("updateState", u(this, s, g).bind(this));
    }
  }, t = new WeakMap(), s = new WeakSet(), A = function() {
    const { current: c } = this.settings, a = !c.controls || this.state.pageCount < 2, h = this.getSlotElements("prev-buttons"), l = this.getSlotElements("next-buttons");
    if (r(this, t).container = this.shadowRoot.querySelector('[part="buttons"]'), !r(this, t).container) return;
    const { container: n, buttons: o } = r(this, t);
    e.setVisibility(n, !a), (h.length || l.length) && (o.push(...h, ...l), o.forEach((i) => {
      i.hasListener || (i.direction = i.getAttribute("direction") || "next", i.modifier = (i.direction === "next" ? 1 : -1) * (parseInt(i.getAttribute("modifier"), 10) || 1), i.hasListener = !0, i.addEventListener("click", () => {
        c.controls && this.goTo(this.state.index + i.modifier);
      }));
    }), u(this, s, g).call(this));
  }, g = function() {
    if (!r(this, t).buttons.length) return;
    const { loop: c } = this.settings.current, { index: a, pageCount: h } = this.state;
    let l = !1;
    if (r(this, t).buttons.forEach((n) => {
      const o = !c && (n.direction === "next" ? a >= h - n.modifier : a < Math.abs(n.modifier));
      if (n === this.shadowRoot.activeElement && o && (l = !0), n.disabled = !!o, n.setAttribute("aria-disabled", !!o), o) n.removeAttribute("aria-controls");
      else {
        let i = a + n.modifier;
        i < 0 ? i = h - 1 : i >= h && (i = 0);
        const d = this.state.pages[i];
        if (d != null && d.length) {
          const m = d.map((v) => {
            var p;
            return (p = this.elements.items[v]) == null ? void 0 : p.id;
          }).filter(Boolean);
          m.length && n.setAttribute("aria-controls", m.join(" "));
        }
      }
    }), l) {
      const n = r(this, t).buttons.filter((o) => !o.disabled);
      n.length && n[0].focus();
    }
  }, f;
};
export {
  C as ControlsFeature
};
