var p = (e) => {
  throw TypeError(e);
};
var b = (e, t, i) => t.has(e) || p("Cannot " + i);
var n = (e, t, i) => (b(e, t, "read from private field"), i ? i.call(e) : t.get(e)), d = (e, t, i) => t.has(e) ? p("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i);
var u = (e, t, i) => (b(e, t, "access private method"), i);
const A = (e) => {
  var t, i, o, v, f, l, m, g;
  return g = class extends e {
    constructor() {
      super();
      d(this, o);
      d(this, t, { container: null, dots: [], active: null });
      d(this, i, "button nav-button");
      this.elements.pagination = n(this, t), this.registerHook("init", u(this, o, v).bind(this)), this.registerHook("updateState", u(this, o, l).bind(this));
    }
  }, t = new WeakMap(), i = new WeakMap(), o = new WeakSet(), v = function() {
    let { container: s, dots: a } = n(this, t);
    const { current: r } = this.settings;
    if (s) s.innerHTML = "", a.forEach((c) => c.remove()), n(this, t).dots = [];
    else {
      if (s = this.getSlotElements("pagination")[0], !s) return;
      s.addEventListener("keydown", u(this, o, m).bind(this)), n(this, t).container = s;
    }
    e.setVisibility(s, r.nav && this.state.pageCount > 1), r.nav && s && this.state.pageCount > 1 && (this.state.pages.forEach((c, h) => {
      u(this, o, f).call(this, c, h);
    }), n(this, t).dots.length && u(this, o, l).call(this));
  }, f = function(s, a) {
    const { container: r, dots: c } = n(this, t);
    if (!r) return;
    const h = document.createElement("button");
    h.type = "button", h.part = n(this, i), h.setAttribute("aria-label", `Page ${a + 1}`), h.setAttribute("aria-controls", s.map((x) => x.id).join(" ")), h.setAttribute("aria-current", !1), h.innerHTML = a + 1, h.addEventListener("click", () => this.goTo(a)), r.append(h), c.push(h);
  }, l = function() {
    if (!this.settings.current.nav || !n(this, t).dots.length) return;
    let { dots: s, active: a } = n(this, t);
    const r = s[this.state.index];
    r && (a && (Object.assign(a, { tabIndex: 0, ariaCurrent: !1 }), a.part = n(this, i)), r.part = `${n(this, i)} active`, Object.assign(r, { tabIndex: -1, ariaCurrent: !0 }), n(this, t).active = r);
  }, m = function(s) {
    if (!n(this, t).dots.length) return;
    const a = this.isDocumentLtr(), r = n(this, t).dots[this.state.index] || 0;
    switch (s.key) {
      case "ArrowRight":
      case "ArrowLeft":
        const c = r[`${s.key === "ArrowRight" ? a ? "next" : "previous" : a ? "previous" : "next"}ElementSibling`];
        c && (c.click(), c.focus());
    }
  }, g;
};
export {
  A as NavFeature
};
