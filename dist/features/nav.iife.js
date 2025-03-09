var g = (e) => {
  throw TypeError(e);
};
var p = (e, t, s) => t.has(e) || g("Cannot " + s);
var a = (e, t, s) => (p(e, t, "read from private field"), s ? s.call(e) : t.get(e)), d = (e, t, s) => t.has(e) ? g("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s);
var c = (e, t, s) => (p(e, t, "access private method"), s);
const k = (e) => {
  var t, s, o, b, v, l, f, u;
  return u = class extends e {
    constructor() {
      super();
      d(this, o);
      d(this, t, { container: null, dots: [], active: null });
      d(this, s, "button nav-button");
      this.elements.pagination = a(this, t), this.registerHook("init", c(this, o, b).bind(this)), this.registerHook("updateState", c(this, o, l).bind(this));
    }
  }, t = new WeakMap(), s = new WeakMap(), o = new WeakSet(), b = function() {
    let { container: i, dots: r } = a(this, t);
    const { current: h } = this.settings;
    if (i) i.innerHTML = "", r.forEach((n) => n.remove()), a(this, t).dots = [];
    else {
      if (i = this.getSlotElements("pagination")[0], !i) return;
      i.addEventListener("keydown", c(this, o, f).bind(this)), a(this, t).container = i;
    }
    if (e.setVisibility(i, h.nav && this.state.pageCount > 1), h.nav && i && this.state.pageCount > 1) {
      for (let n = 0; n < this.state.pageCount; n++) c(this, o, v).call(this, n);
      a(this, t).dots.length && c(this, o, l).call(this);
    }
  }, v = function(i) {
    const { container: r, dots: h } = a(this, t);
    if (!r) return;
    const n = document.createElement("button");
    n.innerHTML = i + 1, n.addEventListener("click", () => this.goTo(i)), Object.assign(n, { type: "button", part: a(this, s), ariaControls: this.elements.scroller.id, ariaSelected: !1 }), r.append(n), h.push(n);
  }, l = function() {
    if (!this.settings.current.nav || !a(this, t).dots.length) return;
    let { dots: i, active: r } = a(this, t);
    const h = i[this.state.index];
    h && (r && (Object.assign(r, { tabIndex: 0, ariaSelected: !1 }), r.part = a(this, s)), h.part = `${a(this, s)} active`, Object.assign(h, { tabIndex: -1, ariaSelected: !0 }), a(this, t).active = h);
  }, f = function(i) {
    if (!a(this, t).dots.length) return;
    const r = this.isDocumentLtr(), h = a(this, t).dots[this.state.index] || 0;
    switch (i.key) {
      case "ArrowRight":
      case "ArrowLeft":
        const n = h[`${i.key === "ArrowRight" ? r ? "next" : "previous" : r ? "previous" : "next"}ElementSibling`];
        n && (n.click(), n.focus());
    }
  }, u;
};
export {
  k as NavFeature
};
