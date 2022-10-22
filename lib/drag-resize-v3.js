import { defineComponent as H, toRefs as N, ref as S, onMounted as $, openBlock as F, createElementBlock as X, normalizeClass as Y, unref as R, createElementVNode as k, renderSlot as M, withModifiers as K, createCommentVNode as T } from "vue";
var y, j = new Uint8Array(16);
function A() {
  if (!y && (y = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !y))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return y(j);
}
const U = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function I(e) {
  return typeof e == "string" && U.test(e);
}
var l = [];
for (var E = 0; E < 256; ++E)
  l.push((E + 256).toString(16).substr(1));
function O(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, u = (l[e[t + 0]] + l[e[t + 1]] + l[e[t + 2]] + l[e[t + 3]] + "-" + l[e[t + 4]] + l[e[t + 5]] + "-" + l[e[t + 6]] + l[e[t + 7]] + "-" + l[e[t + 8]] + l[e[t + 9]] + "-" + l[e[t + 10]] + l[e[t + 11]] + l[e[t + 12]] + l[e[t + 13]] + l[e[t + 14]] + l[e[t + 15]]).toLowerCase();
  if (!I(u))
    throw TypeError("Stringified UUID is invalid");
  return u;
}
function P(e, t, u) {
  e = e || {};
  var a = e.random || (e.rng || A)();
  if (a[6] = a[6] & 15 | 64, a[8] = a[8] & 63 | 128, t) {
    u = u || 0;
    for (var r = 0; r < 16; ++r)
      t[u + r] = a[r];
    return t;
  }
  return O(a);
}
const G = { class: "drag-resize-container" }, q = ["onMousedown"], J = H({
  name: "dragResize"
}), Q = /* @__PURE__ */ H({
  ...J,
  props: {
    nodeKey: {
      type: [Number, String],
      default: P()
    },
    minh: {
      type: Number,
      default: 100
    },
    minw: {
      type: Number,
      default: 100
    },
    disabled: {
      type: [Boolean, String],
      default: !1
    },
    init: {
      type: Object,
      default: () => ({
        width: 100,
        height: 100,
        top: 0,
        left: 0
      })
    }
  },
  emits: ["onDragResize"],
  setup(e, { emit: t }) {
    const u = e, { nodeKey: a, minh: r, minw: b, init: h, disabled: p } = N(u), n = S(), V = (s) => {
      if (f(p.value, "drag"))
        console.warn("\u62D6\u62FD\u529F\u80FD\u5DF2\u88AB\u7981\u7528");
      else {
        const o = n.value.parentElement;
        let m = o.style.position;
        o.style.position = "relative";
        let { left: v, top: w } = _(), x = s.clientX - parseFloat(v) || n.value.offsetLeft, g = s.clientY - parseFloat(w) || n.value.offsetTop;
        s.preventDefault(), document.onmousemove = function(c) {
          let i = c.clientX - x, d = c.clientY - g;
          i < 0 ? i = 0 : i > o.clientWidth - n.value.clientWidth && (i = o.clientWidth - n.value.clientWidth), d < 0 ? d = 0 : d > o.clientHeight - n.value.clientHeight && (d = o.clientHeight - n.value.clientHeight), n.value.style.transform = `translate3d(${i}px, ${d}px,0)`;
        }, document.onmouseup = function() {
          document.onmousemove = null, document.onmouseup = null, o.style.position = m;
          let { left: c, top: i } = _();
          t("onDragResize", {
            left: c,
            top: i,
            height: n.value.style.height,
            width: n.value.style.width,
            nodeKey: a.value
          });
        };
      }
    }, W = () => {
      if (f(p.value, "resize"))
        console.warn("\u8BBE\u7F6E\u5927\u5C0F\u529F\u80FD\u5DF2\u88AB\u7981\u7528");
      else {
        const s = n.value.parentElement, o = window.event;
        o == null || o.stopPropagation(), o == null || o.preventDefault();
        const m = n.value.clientHeight, v = n.value.clientWidth, w = o.clientX, x = o.clientY, g = (i) => {
          const d = i.clientX, z = i.clientY - x, D = d - w, B = m + z > r.value ? m + z > s.clientHeight ? s.clientHeight : m + z : r.value, L = v + D > b.value ? v + D > s.clientWidth ? s.clientWidth : v + D : b.value;
          n.value.style.width = L + "px", n.value.style.height = B + "px";
        }, c = () => {
          document.removeEventListener("mousemove", g), document.removeEventListener("mouseup", c), console.log(n.value.style.transform);
          let { left: i, top: d } = _();
          t("onDragResize", {
            left: i,
            top: d,
            height: n.value.style.height,
            width: n.value.style.width,
            nodeKey: a.value
          });
        };
        document.addEventListener("mousemove", g), document.addEventListener("mouseup", c);
      }
    }, _ = () => {
      let s = /(\d+px, \d+px)/;
      return {
        left: n.value.style.transform.match(s)[0].split(",")[0],
        top: n.value.style.transform.match(s)[0].split(",")[1]
      };
    }, f = (s, o) => typeof s == "boolean" ? s : o == s;
    return $(() => {
      n.value.parentElement.style.position = "relative", n.value.style.height = h.value.height + "px", n.value.style.width = h.value.width + "px", n.value.style.transform = `translate3d(${h.value.left}px, ${h.value.top}px,0)`;
    }), (s, o) => (F(), X("div", {
      ref_key: "dragResize",
      ref: n,
      class: Y(["drag-resize", f(R(p), "drag") ? "disabled" : ""]),
      onMousedown: V
    }, [
      k("div", G, [
        M(s.$slots, "default", {}, void 0, !0)
      ]),
      f(R(p), "resize") ? T("", !0) : (F(), X("div", {
        key: 0,
        ref: "resizeNode",
        class: Y([f(R(p), "resize") ? "disabled" : "", "resize-node"]),
        onMousedown: K(W, ["stop"])
      }, null, 42, q))
    ], 34));
  }
});
const Z = (e, t) => {
  const u = e.__vccOpts || e;
  for (const [a, r] of t)
    u[a] = r;
  return u;
}, C = /* @__PURE__ */ Z(Q, [["__scopeId", "data-v-36286c33"]]), ne = (e) => {
  e.component(C.name, C);
};
export {
  ne as default
};
