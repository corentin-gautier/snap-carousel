var g = (s) => {
  throw TypeError(s);
};
var p = (s, t, i) => t.has(s) || g("Cannot " + i);
var a = (s, t, i) => (p(s, t, "read from private field"), i ? i.call(s) : t.get(s)), d = (s, t, i) => t.has(s) ? g("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, i);
var c = (s, t, i) => (p(s, t, "access private method"), i);
const k = (s) => {
  var t, i, o, v, b, l, f, u;
  return u = class extends s {
    constructor() {
      super();
      d(this, o);
      d(this, t, { container: null, dots: [], active: null });
      d(this, i, "button nav-button");
      this.elements.pagination = a(this, t), this.registerHook("init", c(this, o, v).bind(this)), this.registerHook("updateState", c(this, o, l).bind(this));
    }
  }, t = new WeakMap(), i = new WeakMap(), o = new WeakSet(), v = function() {
    let { container: e, dots: r } = a(this, t);
    const { current: h } = this.settings;
    if (e) e.innerHTML = "", r.forEach((n) => n.remove()), a(this, t).dots = [];
    else {
      if (e = this.getSlotElements("pagination")[0], !e) return;
      e.addEventListener("keydown", c(this, o, f).bind(this)), a(this, t).container = e;
    }
    if (e.style.display = h.nav && this.state.pageCount > 1 ? "" : "none", h.nav && e && this.state.pageCount > 1) {
      for (let n = 0; n < this.state.pageCount; n++) c(this, o, b).call(this, n);
      a(this, t).dots.length && c(this, o, l).call(this);
    }
  }, b = function(e) {
    const { container: r, dots: h } = a(this, t);
    if (!r) return;
    const n = document.createElement("button");
    n.innerHTML = e + 1, n.addEventListener("click", () => this.goTo(e)), Object.assign(n, { type: "button", part: a(this, i), ariaControls: this.elements.scroller.id, ariaSelected: !1 }), r.append(n), h.push(n);
  }, l = function() {
    if (!this.settings.current.nav || !a(this, t).dots.length) return;
    let { dots: e, active: r } = a(this, t);
    const h = e[this.state.index];
    h && (r && (Object.assign(r, { tabIndex: 0, ariaSelected: !1 }), r.part = a(this, i)), h.part = `${a(this, i)} active`, Object.assign(h, { tabIndex: -1, ariaSelected: !0 }), a(this, t).active = h);
  }, f = function(e) {
    if (!a(this, t).dots.length) return;
    const r = this.isDocumentLtr(), h = a(this, t).dots[this.state.index] || 0;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowLeft":
        const n = h[`${e.key === "ArrowRight" ? r ? "next" : "previous" : r ? "previous" : "next"}ElementSibling`];
        n && (n.click(), n.focus());
    }
  }, u;
};
export {
  k as NavFeature
};
