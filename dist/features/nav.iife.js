var u = (s) => {
  throw TypeError(s);
};
var g = (s, t, e) => t.has(s) || u("Cannot " + e);
var o = (s, t, e) => (g(s, t, "read from private field"), e ? e.call(s) : t.get(s)), c = (s, t, e) => t.has(s) ? u("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e);
var h = (s, t, e) => (g(s, t, "access private method"), e);
const x = (s) => {
  var t, e, p, b, d, v, l;
  return l = class extends s {
    constructor() {
      super();
      c(this, e);
      c(this, t, { container: null, dots: [], active: null });
      this.elements.pagination = o(this, t), this.registerHook("init", h(this, e, p).bind(this)), this.registerHook("updateState", h(this, e, d).bind(this));
    }
  }, t = new WeakMap(), e = new WeakSet(), p = function() {
    let { container: n, dots: a } = o(this, t);
    const { current: r } = this.settings;
    if (n) n.innerHTML = "", a.forEach((i) => i.remove()), o(this, t).dots = [];
    else {
      if (n = this.getSlotElements("pagination")[0], !n) return;
      n.addEventListener("keydown", h(this, e, v).bind(this)), o(this, t).container = n;
    }
    if (n.style.display = r.nav && this.state.pageCount > 1 ? "" : "none", r.nav && n && this.state.pageCount > 1) {
      for (let i = 0; i < this.state.pageCount; i++) h(this, e, b).call(this, i);
      o(this, t).dots.length && h(this, e, d).call(this);
    }
  }, b = function(n) {
    const { container: a, dots: r } = o(this, t);
    if (!a) return;
    const i = document.createElement("button");
    i.innerHTML = n + 1, i.addEventListener("click", () => this.goTo(n)), Object.assign(i, { type: "button", part: "button nav-button", ariaControls: this.elements.scroller.id, ariaSelected: !1 }), a.append(i), r.push(i);
  }, d = function() {
    if (!this.settings.current.nav || !o(this, t).dots.length) return;
    let { dots: n, active: a } = o(this, t);
    const r = n[this.state.index];
    r && (a && (Object.assign(a, { tabIndex: 0, ariaSelected: !1 }), a.part = "button nav-button"), r.part = "button nav-button active", Object.assign(r, { tabIndex: -1, ariaSelected: !0 }), o(this, t).active = r);
  }, v = function(n) {
    if (!o(this, t).dots.length) return;
    const a = this.isDocumentLtr(), r = o(this, t).dots[this.state.index] || 0;
    switch (n.key) {
      case "ArrowRight":
      case "ArrowLeft":
        const i = r[`${n.key === "ArrowRight" ? a ? "next" : "previous" : a ? "previous" : "next"}ElementSibling`];
        i && (i.click(), i.focus());
    }
  }, l;
};
export {
  x as NavFeature
};
