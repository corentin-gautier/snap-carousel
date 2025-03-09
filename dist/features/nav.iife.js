var g = (i) => {
  throw TypeError(i);
};
var p = (i, t, n) => t.has(i) || g("Cannot " + n);
var o = (i, t, n) => (p(i, t, "read from private field"), n ? n.call(i) : t.get(i)), d = (i, t, n) => t.has(i) ? g("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, n);
var c = (i, t, n) => (p(i, t, "access private method"), n);
const k = (i) => {
  var t, n, r, b, v, l, f, u;
  return u = class extends i {
    constructor() {
      super();
      d(this, r);
      d(this, t, { container: null, dots: [], active: null });
      d(this, n, "button nav-button");
      this.elements.pagination = o(this, t), this.registerHook("init", c(this, r, b).bind(this)), this.registerHook("updateState", c(this, r, l).bind(this));
    }
  }, t = new WeakMap(), n = new WeakMap(), r = new WeakSet(), b = function() {
    let { container: s, dots: a } = o(this, t);
    const { current: h } = this.settings;
    if (s) s.innerHTML = "", a.forEach((e) => e.remove()), o(this, t).dots = [];
    else {
      if (s = this.getSlotElements("pagination")[0], !s) return;
      s.addEventListener("keydown", c(this, r, f).bind(this)), o(this, t).container = s;
    }
    if (i.setVisibility(s, h.nav && this.state.pageCount > 1), h.nav && s && this.state.pageCount > 1) {
      for (let e = 0; e < this.state.pageCount; e++) c(this, r, v).call(this, e);
      o(this, t).dots.length && c(this, r, l).call(this);
    }
  }, v = function(s) {
    const { container: a, dots: h } = o(this, t);
    if (!a) return;
    const e = document.createElement("button");
    e.type = "button", e.part = o(this, n), e.setAttribute("aria-controls", this.elements.scroller.id), e.setAttribute("aria-selected", !1), e.innerHTML = s + 1, e.addEventListener("click", () => this.goTo(s)), a.append(e), h.push(e);
  }, l = function() {
    if (!this.settings.current.nav || !o(this, t).dots.length) return;
    let { dots: s, active: a } = o(this, t);
    const h = s[this.state.index];
    h && (a && (Object.assign(a, { tabIndex: 0, ariaSelected: !1 }), a.part = o(this, n)), h.part = `${o(this, n)} active`, Object.assign(h, { tabIndex: -1, ariaSelected: !0 }), o(this, t).active = h);
  }, f = function(s) {
    if (!o(this, t).dots.length) return;
    const a = this.isDocumentLtr(), h = o(this, t).dots[this.state.index] || 0;
    switch (s.key) {
      case "ArrowRight":
      case "ArrowLeft":
        const e = h[`${s.key === "ArrowRight" ? a ? "next" : "previous" : a ? "previous" : "next"}ElementSibling`];
        e && (e.click(), e.focus());
    }
  }, u;
};
export {
  k as NavFeature
};
