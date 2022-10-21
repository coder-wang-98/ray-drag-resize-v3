import { defineComponent as X, useCssVars as V, unref as W, toRefs as L, ref as S, onMounted as $, openBlock as M, createElementBlock as N, renderSlot as k, createElementVNode as K, withModifiers as T } from "vue";
var h, U = new Uint8Array(16);
function j() {
  if (!h && (h = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !h))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return h(U);
}
const B = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function F(e) {
  return typeof e == "string" && B.test(e);
}
var s = [];
for (var R = 0; R < 256; ++R)
  s.push((R + 256).toString(16).substr(1));
function I(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = (s[e[t + 0]] + s[e[t + 1]] + s[e[t + 2]] + s[e[t + 3]] + "-" + s[e[t + 4]] + s[e[t + 5]] + "-" + s[e[t + 6]] + s[e[t + 7]] + "-" + s[e[t + 8]] + s[e[t + 9]] + "-" + s[e[t + 10]] + s[e[t + 11]] + s[e[t + 12]] + s[e[t + 13]] + s[e[t + 14]] + s[e[t + 15]]).toLowerCase();
  if (!F(a))
    throw TypeError("Stringified UUID is invalid");
  return a;
}
function O(e, t, a) {
  e = e || {};
  var u = e.random || (e.rng || j)();
  if (u[6] = u[6] & 15 | 64, u[8] = u[8] & 63 | 128, t) {
    a = a || 0;
    for (var r = 0; r < 16; ++r)
      t[a + r] = u[r];
    return t;
  }
  return I(u);
}
const P = ["onMousedown"], A = X({
  name: "dragResize"
}), G = /* @__PURE__ */ X({
  ...A,
  props: {
    activeColor: {
      type: String,
      default: "rgba(119, 221, 178, 0.3)"
    },
    nodeKey: {
      type: [Number, String],
      default: O()
    },
    minh: {
      type: Number,
      default: 100
    },
    minw: {
      type: Number,
      default: 100
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
    const a = e;
    V((l) => ({
      "3e08d3ce": W(u)
    }));
    const { activeColor: u, nodeKey: r, minh: z, minw: E, init: m } = L(a), n = S(), Y = (l) => {
      const o = n.value.parentElement;
      let p = o.style.position;
      o.style.position = "relative";
      let { left: f, top: y } = g(), _ = l.clientX - parseFloat(f) || n.value.offsetLeft, v = l.clientY - parseFloat(y) || n.value.offsetTop;
      l.preventDefault(), document.onmousemove = function(d) {
        let i = d.clientX - _, c = d.clientY - v;
        i < 0 ? i = 0 : i > o.clientWidth - n.value.clientWidth && (i = o.clientWidth - n.value.clientWidth), c < 0 ? c = 0 : c > o.clientHeight - n.value.clientHeight && (c = o.clientHeight - n.value.clientHeight), n.value.style.transform = `translate3d(${i}px, ${c}px,0)`;
      }, document.onmouseup = function() {
        document.onmousemove = null, document.onmouseup = null, o.style.position = p;
        let { left: d, top: i } = g();
        t("onDragResize", {
          left: d,
          top: i,
          height: n.value.style.height,
          width: n.value.style.width,
          nodeKey: r.value
        });
      };
    }, b = () => {
      const l = n.value.parentElement, o = window.event;
      o == null || o.stopPropagation(), o == null || o.preventDefault();
      const p = n.value.clientHeight, f = n.value.clientWidth, y = o.clientX, _ = o.clientY, v = (i) => {
        const c = i.clientX, w = i.clientY - _, x = c - y, C = p + w > z.value ? p + w > l.clientHeight ? l.clientHeight : p + w : z.value, H = f + x > E.value ? f + x > l.clientWidth ? l.clientWidth : f + x : E.value;
        n.value.style.width = H + "px", n.value.style.height = C + "px";
      }, d = () => {
        document.removeEventListener("mousemove", v), document.removeEventListener("mouseup", d), console.log(n.value.style.transform);
        let { left: i, top: c } = g();
        t("onDragResize", {
          left: i,
          top: c,
          height: n.value.style.height,
          width: n.value.style.width,
          nodeKey: r.value
        });
      };
      document.addEventListener("mousemove", v), document.addEventListener("mouseup", d);
    }, g = () => {
      let l = /(\d+px, \d+px)/;
      return {
        left: n.value.style.transform.match(l)[0].split(",")[0],
        top: n.value.style.transform.match(l)[0].split(",")[1]
      };
    };
    return $(() => {
      n.value.parentElement.style.position = "relative", n.value.style.height = m.value.height + "px", n.value.style.width = m.value.width + "px", n.value.style.transform = `translate3d(${m.value.left}px, ${m.value.top}px,0)`;
    }), (l, o) => (M(), N("div", {
      ref_key: "dragResize",
      ref: n,
      class: "drag-resize-container",
      onMousedown: Y
    }, [
      k(l.$slots, "default", {}, void 0, !0),
      K("div", {
        ref: "resizeNode",
        class: "resize-node",
        onMousedown: T(b, ["stop"])
      }, null, 40, P)
    ], 544));
  }
});
const q = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [u, r] of t)
    a[u] = r;
  return a;
}, D = /* @__PURE__ */ q(G, [["__scopeId", "data-v-47670c79"]]), Z = (e) => {
  e.component(D.name, D);
};
export {
  Z as default
};
