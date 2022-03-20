var Nt = Object.defineProperty,
  Yt = Object.defineProperties;
var Xt = Object.getOwnPropertyDescriptors;
var et = Object.getOwnPropertySymbols;
var Zt = Object.prototype.hasOwnProperty,
  Qt = Object.prototype.propertyIsEnumerable;
var Ie = (n, e, t) =>
    e in n
      ? Nt(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (n[e] = t),
  tt = (n, e) => {
    for (var t in e || (e = {})) Zt.call(e, t) && Ie(n, t, e[t]);
    if (et) for (var t of et(e)) Qt.call(e, t) && Ie(n, t, e[t]);
    return n;
  },
  st = (n, e) => Yt(n, Xt(e));
var g = (n, e, t) => (Ie(n, typeof e != "symbol" ? e + "" : e, t), t);
import {
  E as Jt,
  s as Le,
  W as Kt,
  g as h,
  S as se,
  l as it,
  H as be,
  d as nt,
  a as ot,
  V as v,
  D as _e,
  P as es,
  b as at,
  c as ts,
  M as Me,
  e as fe,
  f as Se,
  h as Fe,
  T as ss,
  O as is,
  i as Ee,
  R as rt,
  j as ns,
  C as os,
  F as ke,
  B as as,
  k as rs,
  m as ls,
  n as hs,
  o as cs,
} from "./vendor.674b7c55.js";
function us() {
  return new Promise((n) => {
    document.readyState == "loading"
      ? document.addEventListener("DOMContentLoaded", n)
      : n();
  });
}
var r = { app: null };
const u = new Jt();
var D = {
  dom: {
    body: document.body,
    scroll: document.querySelector(".js-site-wrap"),
    sh: document.querySelector(".js-sh"),
    pe: document.querySelector(".js-pe"),
    mask: document.querySelector(".js-mask"),
  },
  bounds: {
    ww: window.innerWidth,
    wh: window.innerHeight,
    sw: document.querySelector("[data-router-wrapper]").getBoundingClientRect()
      .width,
  },
  flags: st(
    tt(
      {
        locked: !1,
        small: window.matchMedia("(max-width: 639px)").matches,
        hover: window.matchMedia("(hover: hover)").matches,
        windows:
          ["Win32", "Win64", "Windows", "WinCE"].indexOf(
            window.navigator.platform
          ) !== -1,
      },
      Le.getInfos()
    ),
    {
      isDevice:
        Le.isDevice ||
        /iPad|iPhone|iPod/.test(navigator.platform) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    }
  ),
  addClasses: function () {
    Le.addClasses(this.dom.body),
      this.flags.windows && this.dom.body.classList.add("is-windows"),
      this.flags.isDevice &&
        (this.dom.body.classList.remove("is-desktop"),
        this.dom.body.classList.add("is-device"));
  },
};
function ds(n, e, t) {
  return n * (1 - t) + e * t;
}
const Re = (n, e = document) => e.querySelector(n),
  De = (n, e = document) => e.querySelectorAll(n);
function fs(n) {
  return n.getBoundingClientRect();
}
function ms(n) {
  return n % 2 == 1;
}
var A = Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  lerp: ds,
  qs: Re,
  qsa: De,
  rect: fs,
  odd: ms,
});
const me = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, SPACE: 32 },
  ps =
    "ontouchstart" in window ||
    window.TouchEvent ||
    (window.DocumentTouch && document instanceof DocumentTouch),
  gs = "onkeydown" in document,
  { flags: vs, bounds: xs } = D,
  { windows: lt, isFirefox: ys } = vs;
class ws {
  constructor(e = {}) {
    g(this, "wheel", (e) => {
      const { mm: t, fm: s } = this.opts,
        i = this.event;
      (i.deltaY = e.wheelDeltaY || e.deltaY * -1),
        ys && e.deltaMode == 1 && (i.deltaY *= s),
        (i.deltaY *= t),
        this.notify(e);
    });
    g(this, "touchStart", (e) => {
      const t = e.targetTouches ? e.targetTouches[0] : e;
      this.touchStartY = t.pageY;
    });
    g(this, "touchMove", (e) => {
      const { tm: t } = this.opts,
        s = this.event,
        i = e.targetTouches ? e.targetTouches[0] : e;
      (s.deltaY = (i.pageY - this.touchStartY) * t),
        (this.touchStartY = i.pageY),
        this.notify(e);
    });
    g(this, "keyDown", (e) => {
      const t = document.activeElement.nodeName;
      if (t === "INPUT" || t === "TEXTAREA" || t === "SELECT") return;
      const s = this.event,
        { ks: i } = this.opts,
        a = xs.wh - 40;
      switch (((s.deltaY = 0), e.keyCode)) {
        case me.LEFT:
        case me.UP:
          s.deltaY = i;
          break;
        case me.RIGHT:
        case me.DOWN:
          s.deltaY = -i;
          break;
        case e.shiftKey:
          s.deltaY = a;
          break;
        case me.SPACE:
          s.deltaY = -a;
          break;
        default:
          return;
      }
      this.notify(e);
    });
    (this.el = window),
      (this.opts = Object.assign(
        { mm: lt ? 1.1 : 0.45, tm: 2.75, fm: lt ? 40 : 90, ks: 120 },
        e
      )),
      (this.event = { y: 0, deltaY: 0 }),
      (this.touchStartY = null),
      this.init();
  }
  init() {
    this.notify(), this.addEvents();
  }
  addEvents() {
    u.on("wheel", this.el, this.wheel, { passive: !0 }),
      ps &&
        (u.on("touchstart", this.el, this.touchStart, { passive: !0 }),
        u.on("touchmove", this.el, this.touchMove, { passive: !0 })),
      gs && u.on("keydown", document, this.keyDown);
  }
  notify(e = null) {
    const t = this.event;
    (t.y += t.deltaY),
      u.emit("vs", { y: t.y, deltaY: t.deltaY, originalEvent: e });
  }
}
var bs = new (class {
  constructor() {
    (this.isRunning = !1), (this.el = Re(".js-pe"));
  }
  run() {
    clearTimeout(this.timer),
      (this.timer = setTimeout(() => {
        (this.isRunning = !1), this.togglePointers("none");
      }, 300)),
      this.isRunning || ((this.isRunning = !0), this.togglePointers("all"));
  }
  togglePointers(n) {
    this.el.style.pointerEvents = n;
  }
})();
function Ss(n) {
  if (n.length != 6) throw "Only six-digit hex colors are allowed.";
  const e = n.match(/.{1,2}/g);
  return {
    r: parseInt(e[0], 16),
    g: parseInt(e[1], 16),
    b: parseInt(e[2], 16),
  };
}
class Es {
  constructor() {
    (this.frames = []), (this.render = (e) => this.frame(e));
  }
  start() {
    (this.stopped = !1),
      (this.now = performance.now()),
      (this.id = window.requestAnimationFrame(this.render));
  }
  stop(e = !1) {
    e && window.cancelAnimationFrame(this.id), (this.stopped = !0);
  }
  frame(e) {
    if (this.frames.length < 1) return !1;
    for (let t = 0; t < this.frames.length && this.frames.length > 0; t++)
      this.frames.length && this.frames[t].handler(e);
    this.stopped || (this.id = window.requestAnimationFrame(this.render));
  }
  add(e, t) {
    if (typeof e != "function") throw new Error("Expected function as handler");
    return (
      typeof t == "undefined" && (t = `h_${++this.uidCounter}`),
      this.frames.push({ id: t, handler: e }),
      this.frames.length === 1 && this.start(),
      t
    );
  }
  moveToFirst(e) {
    if (typeof e == "undefined") throw new Error("Expected id");
    const t = this.frames.findIndex((s) => s.id === e);
    t < 0 || this.frames.unshift(this.frames.splice(t, 1)[0]);
  }
  remove(e) {
    if (typeof e == "undefined") throw new Error("Expected id");
    const t = this.frames.findIndex((s) => s.id === e);
    t < 0 || (this.frames.splice(t, 1), this.frames.length <= 0 && this.stop());
  }
}
var o = {
  gl: null,
  loaded: null,
  trigger: !1,
  triggerTL: null,
  resolve: null,
  scroll: { offsetTop: 0 },
  raf: new Es(),
  webp: !1,
  webgl2: Kt.isWebGL2Available(),
  isMobile: window.innerWidth < 650,
  mouse: window.innerWidth > 650,
  layout: null,
  smooth: !0,
  fonts: {},
  background: Ss("000000"),
  backgroundRender: null,
  pane: null,
  state: {},
};
function ie(n, e, t) {
  return (1 - t) * n + t * e;
}
function ht(n, e, t) {
  return Math.min(Math.max(e, n), t);
}
const { flags: zs } = D;
new (class {
  constructor() {
    g(this, "onVS", ({ deltaY: n, originalEvent: e }) => {
      !zs.locked && bs.run(),
        u.emit("scroll", { y: ht(n, -300, 300) * -1, ogEvt: e });
    });
    o.isMobile || (new ws(), u.on("vs", this.onVS));
  }
})();
h.registerPlugin(se);
const { flags: ct, bounds: Oe, dom: ze } = D,
  { isDevice: ut } = ct;
new (class {
  constructor() {
    g(this, "tick", () => {
      if (ut) this.pos = ze.scroll.scrollTop;
      else {
        const n = this.target - this.current;
        (this.current += n * this.ease),
          (this.pos = Math.round(this.current * 100) / 100);
      }
      se.update(), u.emit("tick", { pos: this.pos });
    });
    g(this, "scroll", ({ y: n }) => {
      ct.locked || ((this.target += n), this.clamp());
    });
    g(this, "reset", () => {
      (this.target = this.current = this.pos = 0),
        (ze.scroll.scrollTop = 0),
        se.refresh();
    });
    g(this, "resize", () => {
      this.clamp(), (this.pos = this.current = this.target);
    });
    (this.target = 0),
      (this.current = 0),
      (this.pos = 0),
      (this.ease = 0.11),
      se.defaults({ scroller: ze.body }),
      se.scrollerProxy(ze.body, {
        scrollTop: () => this.pos,
        getBoundingClientRect() {
          return { top: 0, left: 0, width: Oe.ww, height: Oe.wh };
        },
      }),
      this.addEvents();
  }
  clamp() {
    this.target = h.utils.clamp(0, Oe.scroll, this.target);
  }
  addEvents() {
    h.ticker.fps(-1),
      h.ticker.add(this.tick),
      ut || (u.on("scroll", this.scroll), u.on("resize:on-reset", this.resize)),
      u.on("scroll:on-reset", this.reset);
  }
})();
const { dom: $e, bounds: he, flags: Cs } = D,
  { isDevice: dt } = Cs;
new (class {
  constructor() {
    g(this, "resize", () => {
      const n = window.innerWidth;
      (dt && n === he.ww) ||
        ((he.ww = n),
        (he.wh = window.innerHeight),
        this.setOrientation($e, he),
        this.setVh(),
        u.emit("resize"),
        dt && u.emit("resize:on-reset"));
    });
    this.setOrientation($e, he),
      this.setVh(),
      u.on("resize", window, it(this.resize, 200)),
      u.on("orientationchange", window, this.resize);
  }
  setOrientation({ body: n }, { wh: e, ww: t }) {
    t < e ? n.classList.add("is-portrait") : n.classList.remove("is-portrait");
  }
  setVh() {
    $e.body.style.setProperty("--vh", `${he.wh / 100}px`);
  }
})();
const { isDevice: qe } = D.flags;
new (class {
  constructor() {
    g(this, "onMove", (n) => {
      const { x: e, y: t, target: s } = this.getPos(n);
      u.emit("mousemove", { x: e, y: t, target: s, e: n });
    });
    g(this, "onDown", (n) => {
      const { x: e, y: t, target: s } = this.getPos(n);
      (this.on = e), u.emit("mousedown", { x: e, y: t, target: s });
    });
    g(this, "onUp", (n) => {
      const { x: e, target: t } = this.getPos(n);
      this.off = e;
      const s = Math.abs(this.off - this.on) < 10;
      u.emit("mouseup", { x: e, target: t, click: s });
    });
    (this.on = 0),
      (this.off = 0),
      (this.events = {
        move: qe ? "touchmove" : "mousemove",
        down: qe ? "touchstart" : "mousedown",
        up: qe ? "touchend" : "mouseup",
      }),
      this.addEvents();
  }
  addEvents() {
    const { move: n, down: e, up: t } = this.events;
    u.on(n, window, this.onMove),
      u.on(e, window, this.onDown),
      u.on(t, window, this.onUp),
      u.on("click", window, (s) => u.emit("click", s));
  }
  getPos(n) {
    const e = n.changedTouches ? n.changedTouches[0].clientX : n.clientX,
      t = n.changedTouches ? n.changedTouches[0].clientY : n.clientY,
      s = n.target;
    return { x: e, y: t, target: s };
  }
})();
function j(n = 0) {
  return new Promise(function (e) {
    setTimeout(e, n);
  });
}
function ft(n) {
  var e = n.nodeType,
    t = "";
  if (e === 1 || e === 9 || e === 11) {
    if (typeof n.textContent == "string") return n.textContent;
    for (n = n.firstChild; n; n = n.nextSibling) t += ft(n);
  } else if (e === 3 || e === 4) return n.nodeValue;
  return t;
}
/*!
 * SplitText: 3.0.0
 * https://greensock.com
 *
 * @license Copyright 2008-2019, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */ var re,
  mt,
  pt,
  As = /(?:\r|\n|\t\t)/g,
  Ps = /(?:\s\s+)/g,
  Ts = function () {
    (re = document), (mt = window), (pt = 1);
  },
  gt = function (e) {
    return mt.getComputedStyle(e);
  },
  Is = Array.isArray,
  vt = [].slice,
  Ge = function (e, t) {
    var s;
    return Is(e)
      ? e
      : (s = typeof e) === "string" && !t && e
      ? vt.call(re.querySelectorAll(e), 0)
      : e && s === "object" && "length" in e
      ? vt.call(e, 0)
      : e
      ? [e]
      : [];
  },
  Be = function (e) {
    return e.position === "absolute" || e.absolute === !0;
  },
  Ls = function (e, t) {
    for (var s = t.length, i; --s > -1; )
      if (((i = t[s]), e.substr(0, i.length) === i)) return i.length;
  },
  _s = " style='position:relative;display:inline-block;'",
  xt = function (e, t) {
    e === void 0 && (e = "");
    var s = ~e.indexOf("++"),
      i = 1;
    return (
      s && (e = e.split("++").join("")),
      function () {
        return (
          "<" + t + _s + (e ? " class='" + e + (s ? i++ : "") + "'>" : ">")
        );
      }
    );
  },
  yt = function n(e, t, s) {
    var i = e.nodeType;
    if (i === 1 || i === 9 || i === 11)
      for (e = e.firstChild; e; e = e.nextSibling) n(e, t, s);
    else (i === 3 || i === 4) && (e.nodeValue = e.nodeValue.split(t).join(s));
  },
  He = function (e, t) {
    for (var s = t.length; --s > -1; ) e.push(t[s]);
  },
  wt = function (e, t, s) {
    for (var i; e && e !== t; ) {
      if (((i = e._next || e.nextSibling), i))
        return i.textContent.charAt(0) === s;
      e = e.parentNode || e._parent;
    }
  },
  Ms = function n(e) {
    var t = Ge(e.childNodes),
      s = t.length,
      i,
      a;
    for (i = 0; i < s; i++)
      (a = t[i]),
        a._isSplit
          ? n(a)
          : (i && a.previousSibling.nodeType === 3
              ? (a.previousSibling.nodeValue +=
                  a.nodeType === 3 ? a.nodeValue : a.firstChild.nodeValue)
              : a.nodeType !== 3 && e.insertBefore(a.firstChild, a),
            e.removeChild(a));
  },
  Z = function (e, t) {
    return parseFloat(t[e]) || 0;
  },
  Fs = function (e, t, s, i, a, c, f) {
    var d = gt(e),
      z = Z("paddingLeft", d),
      H = -999,
      U = Z("borderBottomWidth", d) + Z("borderTopWidth", d),
      Q = Z("borderLeftWidth", d) + Z("borderRightWidth", d),
      q = Z("paddingTop", d) + Z("paddingBottom", d),
      P = Z("paddingLeft", d) + Z("paddingRight", d),
      k = Z("fontSize", d) * 0.2,
      C = d.textAlign,
      W = [],
      J = [],
      M = [],
      K = t.wordDelimiter || " ",
      S = t.tag ? t.tag : t.span ? "span" : "div",
      w = t.type || t.split || "chars,words,lines",
      m = a && ~w.indexOf("lines") ? [] : null,
      x = ~w.indexOf("words"),
      b = ~w.indexOf("chars"),
      I = Be(t),
      G = t.linesClass,
      V = ~(G || "").indexOf("++"),
      T = [],
      p,
      L,
      F,
      l,
      ee,
      $,
      Y,
      Je,
      te,
      _,
      Ke,
      X;
    for (
      V && (G = G.split("++").join("")),
        L = e.getElementsByTagName("*"),
        F = L.length,
        ee = [],
        p = 0;
      p < F;
      p++
    )
      ee[p] = L[p];
    if (m || I)
      for (p = 0; p < F; p++)
        (l = ee[p]),
          ($ = l.parentNode === e),
          ($ || I || (b && !x)) &&
            ((X = l.offsetTop),
            m &&
              $ &&
              Math.abs(X - H) > k &&
              (l.nodeName !== "BR" || p === 0) &&
              ((Y = []), m.push(Y), (H = X)),
            I &&
              ((l._x = l.offsetLeft),
              (l._y = X),
              (l._w = l.offsetWidth),
              (l._h = l.offsetHeight)),
            m &&
              (((l._isSplit && $) ||
                (!b && $) ||
                (x && $) ||
                (!x &&
                  l.parentNode.parentNode === e &&
                  !l.parentNode._isSplit)) &&
                (Y.push(l), (l._x -= z), wt(l, e, K) && (l._wordEnd = !0)),
              l.nodeName === "BR" &&
                ((l.nextSibling && l.nextSibling.nodeName === "BR") ||
                  p === 0) &&
                m.push([])));
    for (p = 0; p < F; p++) {
      if (((l = ee[p]), ($ = l.parentNode === e), l.nodeName === "BR")) {
        m || I
          ? (l.parentNode && l.parentNode.removeChild(l),
            ee.splice(p--, 1),
            F--)
          : x || e.appendChild(l);
        continue;
      }
      I &&
        ((te = l.style),
        !x && !$ && ((l._x += l.parentNode._x), (l._y += l.parentNode._y)),
        (te.left = l._x + "px"),
        (te.top = l._y + "px"),
        (te.position = "absolute"),
        (te.display = "block"),
        (te.width = l._w + 1 + "px"),
        (te.height = l._h + "px")),
        !x && b
          ? l._isSplit
            ? ((l._next = l.nextSibling), l.parentNode.appendChild(l))
            : l.parentNode._isSplit
            ? ((l._parent = l.parentNode),
              !l.previousSibling &&
                l.firstChild &&
                (l.firstChild._isFirst = !0),
              l.nextSibling &&
                l.nextSibling.textContent === " " &&
                !l.nextSibling.nextSibling &&
                T.push(l.nextSibling),
              (l._next =
                l.nextSibling && l.nextSibling._isFirst ? null : l.nextSibling),
              l.parentNode.removeChild(l),
              ee.splice(p--, 1),
              F--)
            : $ ||
              ((X = !l.nextSibling && wt(l.parentNode, e, K)),
              l.parentNode._parent && l.parentNode._parent.appendChild(l),
              X && l.parentNode.appendChild(re.createTextNode(" ")),
              S === "span" && (l.style.display = "inline"),
              W.push(l))
          : l.parentNode._isSplit && !l._isSplit && l.innerHTML !== ""
          ? J.push(l)
          : b &&
            !l._isSplit &&
            (S === "span" && (l.style.display = "inline"), W.push(l));
    }
    for (p = T.length; --p > -1; ) T[p].parentNode.removeChild(T[p]);
    if (m) {
      for (
        I &&
          ((_ = re.createElement(S)),
          e.appendChild(_),
          (Ke = _.offsetWidth + "px"),
          (X = _.offsetParent === e ? 0 : e.offsetLeft),
          e.removeChild(_)),
          te = e.style.cssText,
          e.style.cssText = "display:none;";
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (Je = K === " " && (!I || (!x && !b)), p = 0; p < m.length; p++) {
        for (
          Y = m[p],
            _ = re.createElement(S),
            _.style.cssText =
              "display:block;text-align:" +
              C +
              ";position:" +
              (I ? "absolute;" : "relative;"),
            G && (_.className = G + (V ? p + 1 : "")),
            M.push(_),
            F = Y.length,
            L = 0;
          L < F;
          L++
        )
          Y[L].nodeName !== "BR" &&
            ((l = Y[L]),
            _.appendChild(l),
            Je && l._wordEnd && _.appendChild(re.createTextNode(" ")),
            I &&
              (L === 0 &&
                ((_.style.top = l._y + "px"), (_.style.left = z + X + "px")),
              (l.style.top = "0px"),
              X && (l.style.left = l._x - X + "px")));
        F === 0
          ? (_.innerHTML = "&nbsp;")
          : !x && !b && (Ms(_), yt(_, String.fromCharCode(160), " ")),
          I && ((_.style.width = Ke), (_.style.height = l._h + "px")),
          e.appendChild(_);
      }
      e.style.cssText = te;
    }
    I &&
      (f > e.clientHeight &&
        ((e.style.height = f - q + "px"),
        e.clientHeight < f && (e.style.height = f + U + "px")),
      c > e.clientWidth &&
        ((e.style.width = c - P + "px"),
        e.clientWidth < c && (e.style.width = c + Q + "px"))),
      He(s, W),
      x && He(i, J),
      He(a, M);
  },
  ks = function (e, t, s, i) {
    var a = t.tag ? t.tag : t.span ? "span" : "div",
      c = t.type || t.split || "chars,words,lines",
      f = ~c.indexOf("chars"),
      d = Be(t),
      z = t.wordDelimiter || " ",
      H = z !== " " ? "" : d ? "&#173; " : " ",
      U = "</" + a + ">",
      Q = 1,
      q = t.specialChars
        ? typeof t.specialChars == "function"
          ? t.specialChars
          : Ls
        : null,
      P,
      k,
      C,
      W,
      J,
      M,
      K,
      S,
      w = re.createElement("div"),
      m = e.parentNode;
    for (
      m.insertBefore(w, e),
        w.textContent = e.nodeValue,
        m.removeChild(e),
        e = w,
        P = ft(e),
        K = P.indexOf("<") !== -1,
        t.reduceWhiteSpace !== !1 && (P = P.replace(Ps, " ").replace(As, "")),
        K && (P = P.split("<").join("{{LT}}")),
        J = P.length,
        k = (P.charAt(0) === " " ? H : "") + s(),
        C = 0;
      C < J;
      C++
    )
      if (((M = P.charAt(C)), q && (S = q(P.substr(C), t.specialChars))))
        (M = P.substr(C, S || 1)),
          (k += f && M !== " " ? i() + M + "</" + a + ">" : M),
          (C += S - 1);
      else if (M === z && P.charAt(C - 1) !== z && C) {
        for (k += Q ? U : "", Q = 0; P.charAt(C + 1) === z; ) (k += H), C++;
        C === J - 1
          ? (k += H)
          : P.charAt(C + 1) !== ")" && ((k += H + s()), (Q = 1));
      } else
        M === "{" && P.substr(C, 6) === "{{LT}}"
          ? ((k += f ? i() + "{{LT}}</" + a + ">" : "{{LT}}"), (C += 5))
          : (M.charCodeAt(0) >= 55296 && M.charCodeAt(0) <= 56319) ||
            (P.charCodeAt(C + 1) >= 65024 && P.charCodeAt(C + 1) <= 65039)
          ? ((W = ((P.substr(C, 12) || [])[1] || "").length || 2),
            (k +=
              f && M !== " "
                ? i() + P.substr(C, W) + "</" + a + ">"
                : P.substr(C, W)),
            (C += W - 1))
          : (k += f && M !== " " ? i() + M + "</" + a + ">" : M);
    (e.outerHTML = k + (Q ? U : "")), K && yt(m, "{{LT}}", "<");
  },
  Rs = function n(e, t, s, i) {
    var a = Ge(e.childNodes),
      c = a.length,
      f = Be(t),
      d,
      z;
    if (e.nodeType !== 3 || c > 1) {
      for (t.absolute = !1, d = 0; d < c; d++)
        (z = a[d]),
          (z.nodeType !== 3 || /\S+/.test(z.nodeValue)) &&
            (f &&
              z.nodeType !== 3 &&
              gt(z).display === "inline" &&
              ((z.style.display = "inline-block"),
              (z.style.position = "relative")),
            (z._isSplit = !0),
            n(z, t, s, i));
      (t.absolute = f), (e._isSplit = !0);
      return;
    }
    ks(e, t, s, i);
  };
function B(n, e) {
  pt || Ts(),
    (this.elements = Ge(n)),
    (this.chars = []),
    (this.words = []),
    (this.lines = []),
    (this._originals = []),
    (this.vars = e || {}),
    this.split(e);
}
var bt = B.prototype;
bt.split = function (e) {
  this.isSplit && this.revert(),
    (this.vars = e = e || this.vars),
    (this._originals.length =
      this.chars.length =
      this.words.length =
      this.lines.length =
        0);
  for (
    var t = this.elements.length,
      s = e.tag ? e.tag : e.span ? "span" : "div",
      i = xt(e.wordsClass, s),
      a = xt(e.charsClass, s),
      c,
      f,
      d;
    --t > -1;

  )
    (d = this.elements[t]),
      (this._originals[t] = d.innerHTML),
      (c = d.clientHeight),
      (f = d.clientWidth),
      Rs(d, e, i, a),
      Fs(d, e, this.chars, this.words, this.lines, f, c);
  return (
    this.chars.reverse(),
    this.words.reverse(),
    this.lines.reverse(),
    (this.isSplit = !0),
    this
  );
};
bt.revert = function () {
  var e = this._originals;
  if (!e) throw "revert() call wasn't scoped properly.";
  return (
    this.elements.forEach(function (t, s) {
      return (t.innerHTML = e[s]);
    }),
    (this.chars = []),
    (this.words = []),
    (this.lines = []),
    (this.isSplit = !1),
    this
  );
};
B.create = function (e, t) {
  return new B(e, t);
};
const { qs: Ue, qsa: Ds } = A,
  { dom: St, flags: Et } = D;
let N = null;
class We extends be.Transition {
  in({ from: e, to: t, trigger: s, done: i }) {
    e.remove(),
      s === "popstate" &&
        (r.gl.hoverImages.instances.forEach((a) => {
          a.keep = !1;
        }),
        r.gl.texts && r.gl.texts.destroy(),
        r.gl.hoverImages && r.gl.hoverImages.destroy(),
        r.gl.planes && r.gl.planes.destroy(),
        r.gl.blob && r.gl.blob.removeScrollEvents()),
      this.animateIn(t),
      i(),
      St.body.classList.remove("is-loading");
  }
  async out({ from: e, trigger: t, done: s }) {
    St.body.classList.add("is-loading"),
      t === "popstate"
        ? (this.animateOut(e, s), s())
        : (await this.animateOut(e, s), s());
  }
  animateIn(e) {
    u.emit("scroll:on-reset"),
      u.emit("menu:close"),
      window.scrollTo(0, 0),
      (Et.locked = !1);
    const t = Ue(".js-t-chars", e),
      s = Ds(".js-t-lines p", e),
      i = Ue("#gl");
    if (
      (N && N.kill(),
      (N = h.timeline({ paused: !0, defaults: { immediateRender: !0 } }).fromTo(
        e,
        { opacity: 0, y: "-50px" },
        {
          opacity: 1,
          y: "0",
          duration: 0.5,
          ease: "expo.out",
          onComplete: () => {
            (e.style = ""), (i.style.zIndex = "");
          },
        }
      )),
      t)
    ) {
      const a = new B(t, { type: "words, chars" }).chars;
      N.from(
        a,
        { yPercent: 100, duration: 1.5, stagger: 0.075, ease: "expo" },
        0.15
      );
    }
    if (s.length) {
      let a = [];
      s.forEach((c) => {
        const f = new B(c, { type: "lines" }).lines,
          d = new B(f, { type: "lines" }).lines;
        N.set(f, { overflow: "hidden" }, 0), (a = [...a, d]);
      }),
        N.from(
          a,
          { yPercent: 100, duration: 1.5, stagger: 0.1, ease: "expo" },
          0.25
        );
    }
    N.play();
  }
  async animateOut(e) {
    (r.gl.blob.mouse.active = !1), (Et.locked = !0);
    const t = Ue("#gl");
    (t.style.zIndex = -1),
      N && N.kill(),
      (N = h
        .timeline()
        .to(e, {
          autoAlpha: 0,
          y: "-50px",
          duration: 0.5,
          ease: "expo.inOut",
        })),
      await N;
  }
}
const { qs: Os, qsa: $s, odd: on } = A,
  { dom: zt, flags: an } = D;
let le = null,
  Ct;
class qs extends be.Transition {
  in({ from: e, to: t, done: s }) {
    e.remove();
    const i = Os(".js-t-chars", t),
      a = $s(".js-t-lines p", t);
    if (
      (u.emit("scroll:on-reset"),
      u.emit("menu:close"),
      window.scrollTo(0, 0),
      s(),
      le && le.kill(),
      (le = h.timeline({ paused: !0 })),
      i &&
        ((Ct = new B(i, { type: "words, chars" }).chars),
        le.from(
          Ct,
          { yPercent: 100, duration: 1.5, stagger: 0.05, ease: "expo" },
          0.5
        )),
      a.length)
    ) {
      let c = [];
      a.forEach((f) => {
        const d = new B(f, { type: "lines" }).lines,
          z = new B(d, { type: "lines" }).lines;
        le.set(d, { overflow: "hidden" }, 0), (c = [...c, z]);
      }),
        le.from(
          c,
          { yPercent: 100, duration: 1.5, stagger: 0.1, ease: "expo" },
          1
        );
    }
    le.play(), zt.body.classList.remove("is-loading");
  }
  out({ from: e, done: t }) {
    zt.body.classList.add("is-loading"), t();
  }
}
const { dom: At } = D,
  { qs: Gs, qsa: rn } = A;
class Bs extends We {
  async in({ from: e, to: t, done: s }) {
    e.remove(), this.animateIn(t), s(), At.body.classList.remove("is-loading");
  }
  async out({ from: e, trigger: t, done: s }) {
    At.body.classList.add("is-loading"),
      t === "popstate"
        ? (this.animateOut(e, s), s())
        : ((this.snapPoint = Gs("[data-gl-case]")),
          r.gl.blob.snapToPoint(this.snapPoint),
          await this.animateOut(e, s),
          r.gl.hoverImages.instances.forEach((i) => {
            i.keep = i.active;
          }),
          s(),
          await j(1e3),
          r.gl.hoverImages.instances.forEach((i) => {
            i.keep = !1;
          }));
  }
}
const { dom: Pt } = D,
  { qs: Hs, qsa: ln } = A;
class Us extends We {
  async in({ from: e, to: t, done: s }) {
    e.remove(), this.animateIn(t), s(), Pt.body.classList.remove("is-loading");
  }
  async out({ from: e, trigger: t, done: s }) {
    Pt.body.classList.add("is-loading"),
      t !== "popstate"
        ? (r.gl.blob.snapToCenter(),
          r.gl.blob.setZoom(5, 0.5, "expo.in"),
          (this.gl = Hs("#gl > canvas")),
          setTimeout(() => {
            this.gl.style.opacity = "";
          }, 400),
          r.gl.hoverImages.instances.forEach((i) => {
            i.active && i.plane.setSize(1.75, 0.5, "expo.in");
          }),
          await this.animateOut(e, s),
          s())
        : (this.animateOut(e, s), s());
  }
}
function R() {
  return new Promise(function (n) {
    setTimeout(n, 0);
  });
}
class Ws {
  constructor() {}
  on(e, t, s) {
    const i = this.e || (this.e = {});
    return (i[e] || (i[e] = [])).push({ fn: t, ctx: s }), this;
  }
  once(e, t, s) {
    const i = this;
    function a() {
      i.off(e, a), t.apply(s, arguments);
    }
    return (a._ = t), this.on(e, a, s);
  }
  emit(e) {
    const t = [].slice.call(arguments, 1),
      s = ((this.e || (this.e = {}))[e] || []).slice();
    let i = 0;
    const a = s.length;
    for (i; i < a; i++) s[i].fn.apply(s[i].ctx, t);
    return this;
  }
  off(e, t) {
    const s = this.e || (this.e = {}),
      i = s[e],
      a = [];
    if (i && t)
      for (let c = 0, f = i.length; c < f; c++)
        i[c].fn !== t && i[c].fn._ !== t && a.push(i[c]);
    return a.length ? (s[e] = a) : delete s[e], this;
  }
}
const E = new Ws(),
  { flags: hn, bounds: Ve } = D,
  { rect: Vs, qsa: Tt } = A;
class js {
  constructor(e = Tt("[data-smooth-item]")) {
    g(this, "run", ({ pos: e }) => {
      !this.resizing && this.transformSections(),
        (this.current = e),
        (o.scroll.offsetTop = this.current);
    });
    g(this, "resize", () => {
      (this.resizing = !0),
        this.getSections(),
        u.emit("resize:on-reset"),
        this.transformSections(),
        (this.resizing = !1);
    });
    (this.elems = [...Tt("[data-smooth-item-o]"), ...e]),
      (this.current = 0),
      (this.resizing = !1),
      (this.offset = 300),
      this.init();
  }
  init() {
    this.getSections(), this.addEvents();
  }
  addEvents() {
    o.isMobile
      ? window.addEventListener("scroll", this.onScroll, { passive: !0 })
      : (u.on("tick", this.run), u.on("resize", this.resize));
  }
  copyGlSections() {
    this.elems.forEach((e) => {
      e.hasAttribute("data-smooth-gl") && console.dir(e);
    });
  }
  getSections() {
    if (!this.elems) return;
    const e = this.elems.length - 1,
      { wh: t } = Ve;
    this.copyGlSections(),
      (this.sections = this.elems.map((s, i) => {
        s.style.transform = "translate3d(0, 0, 0)";
        const { top: a, bottom: c } = Vs(s);
        return (
          i === e && (Ve.scroll = c - t),
          {
            el: s,
            start: a - Ve.wh - this.offset,
            end: c + this.offset,
            out: !0,
          }
        );
      }));
  }
  onScroll() {
    o.scroll.offsetTop = window.scrollY;
  }
  transformSections() {
    this.sections.length > 0 &&
      this.sections.forEach((e) => {
        this.visible(e) || this.resizing
          ? (e.out && (e.out = !1), this.transform(e.el))
          : e.out || ((e.out = !0), this.transform(e.el));
      });
  }
  transform(e) {
    e.style.transform = `translate3d(0, ${-this.current}px, 0)`;
  }
  visible({ start: e, end: t }, s = this.current) {
    return s > e && s < t;
  }
  removeEvents() {
    o.isMobile
      ? window.removeEventListener("scroll", this.onScroll, { passive: !0 })
      : (u.off("tick", this.run), u.off("resize", this.resize));
  }
  destroy() {
    this.removeEvents(),
      (this.sections = this.elems = null),
      u.emit("scroll:on-reset");
  }
}
class Ns {
  constructor(e) {
    (this.el = e), this.tweens();
  }
  tweens() {}
}
const { flags: cn, bounds: It } = D,
  { rect: Lt, qsa: Ys, qs: Xs } = A;
class Zs {
  constructor(e) {
    g(this, "down", ({ x: e, y: t, target: s }) => {
      if (!this.el.contains(s)) return;
      const i = this.state;
      (i.dragging = !0),
        (i.cancel.x = e),
        (i.cancel.y = t),
        (i.on = i.target + e * this.opts.speed);
    });
    g(this, "move", ({ x: e, y: t, e: s }) => {
      const i = this.state;
      if (!i.dragging) return;
      const { cancel: a } = i;
      Math.abs(e - a.x) > Math.abs(t - a.y) &&
        s.cancelable &&
        (s.preventDefault(), s.stopPropagation()),
        (i.target = i.on - e * this.opts.speed),
        this.clamp();
    });
    g(this, "up", () => {
      !this.state.dragging || (this.state.dragging = !1);
    });
    g(this, "run", () => {
      const e = this.state;
      !e.visible ||
        ((e.current += (e.target - e.current) * this.opts.ease),
        (e.pos = Math.round(e.current * 100) / 100),
        (e.diff = (e.target - e.current) * 0.0075),
        (e.diff = Math.round(e.diff * 100) / 100),
        !e.resizing && this.transformSections());
    });
    g(this, "resize", () => {
      this.getCache();
    });
    (this.el = e),
      (this.container = Xs(".js-slides", this.el)),
      (this.slides = [...Ys(".js-slide", this.el)]),
      (this.state = {
        target: 0,
        current: 0,
        pos: 0,
        diff: 0,
        on: 0,
        cancel: { x: 0, y: 0 },
        max: 0,
        dragging: !1,
        resizing: !1,
      }),
      (this.opts = { speed: 2, ease: 0.075 }),
      (this.total = this.slides.length - 1),
      this.getCache(),
      this.addEvents(),
      se.create({
        trigger: this.el,
        onToggle: (t) => {
          t.isActive ? (this.state.visible = !0) : (this.state.visible = !1);
        },
      });
  }
  addEvents() {
    u.on("mouseup", this.up),
      u.on("mousedown", this.down),
      u.on("mousemove", this.move),
      u.on("tick", this.run),
      u.on("resize:on-reset", this.resize);
  }
  getCache() {
    const { ww: e } = It;
    (this.snaps = []),
      (this.cache = this.slides.map((t, s) => {
        t.style.transform = "translate3d(0, 0, 0)";
        const { left: i, right: a, width: c } = Lt(t);
        return (
          s === this.total &&
            (this.state.max = a - e + Lt(this.container).left),
          this.snaps.push(i),
          {
            el: t,
            left: i,
            width: c,
            start: i - e - 100,
            end: a + 100,
            out: !0,
          }
        );
      }));
  }
  clamp() {
    const e = this.state;
    e.target = h.utils.clamp(0, e.max, e.target);
  }
  visible({ start: e, end: t, width: s, left: i }, a) {
    const c = a > e && a < t;
    let f = 0;
    return (
      c && (f = h.utils.clamp(0, 1, 1 + (a - i - s) / (It.ww + s))),
      { visible: c, progress: f }
    );
  }
  transformSections() {
    const e = this.state,
      t = e.pos;
    this.cache.length &&
      this.cache.forEach((s) => {
        const { visible: i, progress: a } = this.visible(s, t);
        i || e.resizing
          ? (s.out && (s.out = !1), this.transform(s.el, a, t))
          : s.out || ((s.out = !0), this.transform(s.el, a, t));
      });
  }
  transform(e, t, s, i = this.state.diff) {
    const a = h.utils.clamp(-100, 100, (-25 * t + 25) * i),
      c = -(s + a);
    e.style.transform = `translate3d(${c}px, 0, 0)`;
  }
  removeEvents() {
    u.off("mouseup", this.up),
      u.off("mousedown", this.down),
      u.off("mousemove", this.move),
      u.off("tick", this.run),
      u.off("resize:on-reset", this.resize);
  }
  destroy() {
    this.removeEvents(), (this.cache = null);
  }
}
const { flags: ne, bounds: un } = D,
  { rect: dn, qsa: fn, qs: je } = A;
class Qs {
  constructor() {
    g(this, "toggle", () => {
      ne.menu ? this.close() : this.open();
    });
    g(this, "open", () => {
      if (this.tl.isActive()) return;
      this.btn.classList.add("is-active"),
        document.body.classList.add("menu-is-open"),
        (ne.menu = !0),
        (ne.locked = !0),
        o.isMobile && nt.on();
      const { uProgress: e, uForce: t } = r.menu.bg.material.uniforms;
      this.tl
        .clear()
        .set(this.el, { autoAlpha: 1 })
        .fromTo(
          this.bend(t),
          { progress: 0 },
          { progress: 1, duration: 1, ease: "power3.inOut" },
          0
        )
        .fromTo(
          e,
          { value: 0 },
          {
            value: 1,
            duration: 1,
            ease: "power3.inOut",
            onStart: () => {
              r.menu.active = !0;
            },
            onComplete: () => {
              r.menu.active = !1;
            },
          },
          0
        )
        .fromTo(
          ".js-m-reveal",
          { yPercent: 100 },
          { yPercent: 0, duration: 1.15, stagger: 0.1, ease: "expo" },
          0.5
        )
        .fromTo(
          ".js-m-fade",
          { alpha: 0 },
          { alpha: 1, duration: 1, ease: "power1" },
          0.5
        ),
        ne.small ||
          this.tl.to(
            ".js-sh-item",
            { autoAlpha: 0, duration: 0.35, ease: "power1" },
            0
          ),
        this.tl.restart();
    });
    g(this, "close", () => {
      (ne.menu = !1), (ne.locked = !1), this.btn.classList.remove("is-active");
      const { uProgress: e, uForce: t } = r.menu.bg.material.uniforms;
      o.isMobile && nt.off(),
        this.tl
          .clear()
          .fromTo(
            this.bend(t),
            { progress: 0 },
            { progress: 1.1, duration: 1, ease: "power3.inOut" },
            0
          )
          .to(
            e,
            {
              value: 0,
              duration: 1.1,
              ease: "power3.inOut",
              onStart: () => {
                r.menu.active = !0;
              },
              onComplete: () => {
                (r.menu.active = !1),
                  document.body.classList.remove("menu-is-open");
              },
            },
            0
          )
          .to(
            ".js-m-reveal",
            {
              yPercent: -100,
              duration: 0.45,
              stagger: 0.025,
              ease: "power2.inOut",
            },
            0
          )
          .to(".js-m-fade", { alpha: 0, duration: 0.35, ease: "power1" }, 0)
          .set(this.el, { autoAlpha: 0 }),
        ne.small ||
          this.tl.to(
            ".js-sh-item",
            { autoAlpha: 1, duration: 0.35, ease: "power1" },
            0.5
          ),
        this.tl.restart();
    });
    g(this, "redirect", () => {
      ne.page === "home"
        ? this.close()
        : r.router.redirect(location.origin, "menu");
    });
    (this.el = je(".js-menu")),
      (this.inner = je(".js-menu-inner")),
      (this.btn = je(".js-menu-toggle")),
      u.on("click", this.btn, this.toggle),
      u.on("click", ".js-menu-logo", this.redirect),
      u.on("menu:close", this.close),
      (this.tl = h.timeline({ paused: !0 }));
  }
  bend(e) {
    return h
      .timeline({ paused: !0, defaults: { duration: 0.5, ease: "none" } })
      .to(e, { value: 1 })
      .to(e, { value: 0 });
  }
}
class Js {
  constructor(e = De("[data-lazy-src]")) {
    (this.elems = e), this.handle();
  }
  handle() {
    this.elems.forEach((e) => {
      const t = e.dataset.src || e.dataset.lazySrc || e.dataset.lazySrcM;
      if (!t) return;
      const s = t.split(".").pop();
      if (
        (!e.classList.contains("img-fill") && e.classList.add("img-fill"),
        s === "mp4")
      ) {
        this.createVid(e, t);
        return;
      }
      se.create({
        trigger: e,
        start: "-50% bottom",
        once: !0,
        onEnter: () => this.load(e, t),
      });
    });
  }
  createVid(e, t) {
    const s = document.createElement("video");
    (s.src = t),
      e.dataset.srcPoster && (s.poster = e.dataset.srcPoster),
      s.setAttribute("muted", !0),
      s.setAttribute("playsinline", !0),
      s.setAttribute("loop", !0),
      e.appendChild(s),
      se.create({
        trigger: s,
        onToggle: (i) => {
          i.isActive ? s.play() : s.pause();
        },
      });
  }
  load(e, t) {
    const s = new Image(),
      i = document.createDocumentFragment(),
      a = document.createElement("div");
    a.classList.add("loader"),
      i.appendChild(a),
      i.appendChild(s),
      (s.src = t),
      (s.alt = ""),
      e.appendChild(i),
      s.decode().then(() => {
        e.removeChild(a), e.classList.add("is-loaded");
      });
  }
  destroy() {
    this.elems = null;
  }
}
const { qsa: Ne, qs: mn } = A;
class Ks {
  constructor(e) {
    (this.el = e),
      (this.slides = [...Ne(".js-sel-item", this.el)]),
      (this.links = [...Ne(".js-sel-link", this.el)]),
      (this.bullets = Ne(".js-sel-bullet", this.el)),
      (this.total = this.slides.length - 1),
      (this.state = {
        last: -1,
        current: 0,
        animating: !1,
        z: this.links.length,
      }),
      this.init();
  }
  init() {
    this.setCache();
  }
  setCache() {}
  destroy() {
    (this.cache = null), (this.state = null);
  }
}
const { rect: pn, qsa: ei, qs: Ce } = A;
class ti {
  constructor(e) {
    g(this, "toPrev", () => {
      this.animating ||
        ((this.last = this.current),
        (this.current = h.utils.wrap(0, this.total, this.current - 1)),
        this.animate());
    });
    g(this, "toNext", () => {
      this.animating ||
        ((this.last = this.current),
        (this.current = h.utils.wrap(0, this.total, this.current + 1)),
        this.animate());
    });
    (this.el = e),
      (this.elems = [...ei(".js-slide", this.el)]),
      (this.prev = Ce(".js-prev", this.el)),
      (this.next = Ce(".js-next", this.el)),
      (this.display = Ce(".js-current", this.el)),
      (this.last = -1),
      (this.current = 0),
      (this.total = this.elems.length),
      (this.z = this.total + 1),
      (this.tl = h.timeline({
        paused: !0,
        defaults: { duration: 1, ease: "power3.inOut" },
      })),
      this.init();
  }
  init() {
    this.addEvents(), this.getCache();
  }
  addEvents() {
    u.on("click", this.prev, this.toPrev),
      u.on("click", this.next, this.toNext);
  }
  getCache() {
    this.cache = this.elems.map((e, t) => {
      const s = Ce("img", e);
      return { el: e, img: s };
    });
  }
  animate() {
    this.animating = !0;
    const e = this.cache[this.last],
      t = this.cache[this.current];
    (this.z += 1),
      (this.display.innerText = (this.current + 1).toString().padStart(2, "0")),
      this.tl
        .clear()
        .set(t.el, { autoAlpha: 1, zIndex: this.z })
        .fromTo(
          [t.el, t.img],
          { xPercent: h.utils.wrap([100, -100]) },
          { xPercent: 0 },
          0
        )
        .fromTo(t.img, { scale: 1.25 }, { scale: 1 }, 0)
        .set(e.el, { autoAlpha: 0 })
        .add(() => {
          this.animating = !1;
        })
        .play();
  }
}
const { qs: pe, qsa: gn } = A;
class _t {
  constructor(e) {
    g(this, "openDialog", () => {
      this.input.click();
    });
    g(this, "selectFile", (e) => {
      const t = e.target.files[0];
      (this.label.innerText = t.name), this.actions.classList.remove("dn");
    });
    g(this, "clearFile", () => {
      (this.label.innerText = ""),
        (this.input.value = ""),
        this.actions.classList.add("dn");
    });
    (this.el = e),
      (this.trigger = pe(".file-input-trigger", this.el)),
      (this.input = pe("input[type=file]", this.el)),
      (this.label = pe(".file-input-label", this.el)),
      (this.clear = pe(".file-input-clear", this.el)),
      (this.actions = pe(".label-w-remove", this.el)),
      this.init();
  }
  init() {
    this.addEvents();
  }
  addEvents() {
    u.on("click", this.trigger, this.openDialog),
      u.on("input", this.input, this.selectFile),
      u.on("click", this.clear, this.clearFile);
  }
}
const { dom: vn, flags: Mt } = D,
  { isDevice: si } = Mt,
  { qs: ii, qsa: O } = A;
class oe extends be.Renderer {
  constructor() {
    super(...arguments);
    g(this, "handleSubmitSubscriptionForm", (e) => {
      e.preventDefault(),
        fetch(e.target.action, {
          method: "POST",
          body: new FormData(e.target),
        }).then((t) => {
          if (t.ok)
            return t.json().then((s) => {
              s && "redirect" in s && (location.href = s.redirect);
            });
        });
    });
  }
  async initial() {
    D.addClasses(), this.onEnter(), this.load();
  }
  async onEnter() {
    (this.leaving = !1),
      (document.body.dataset.page = this.properties.slug),
      (this.onGlText = this.onGlText.bind(this)),
      (this.el = this.wrap.lastElementChild),
      (Mt.page = this.el.id),
      E.on("GL_TEXT_IN", this.onGlText),
      this.handleActive(),
      await j(200),
      !this.leaving &&
        (this.handleSections(), this.handleGl(), u.emit("resize"));
  }
  handleSections() {
    (this.sections = []),
      (this.subscriptionForm = ii("#footer-newsletter-form")),
      this.subscriptionForm &&
        this.subscriptionForm.addEventListener(
          "submit",
          this.handleSubmitSubscriptionForm
        );
  }
  onLeave() {
    (this.leaving = !0),
      r.gl.snapSections && r.gl.snapSections.destroy(),
      r.gl.sizeSections && r.gl.sizeSections.destroy(),
      r.gl.planes && r.gl.planes.animateOut(),
      r.gl.texts && r.gl.texts.animateOut(),
      E.off("GL_TEXT_IN", this.onGlText),
      this.subscriptionForm &&
        this.subscriptionForm.removeEventListener(
          "submit",
          this.handleSubmitSubscriptionForm
        ),
      this.sections.forEach((e) => {
        e.destroy();
      });
  }
  onEnterCompleted() {
    this.handleLazy(),
      this.handleScroll(),
      this.handleDraggable(),
      this.handleGllry(),
      this.handleTextarea(),
      (this.triggered = new Ns());
  }
  onLeaveCompleted() {
    if (
      (this.scroll && this.scroll.destroy(),
      r.gl.texts && r.gl.texts.destroy(),
      r.gl.hoverImages && r.gl.hoverImages.destroy(),
      r.gl.planes && r.gl.planes.destroy(),
      this.draggable)
    )
      for (const t of this.draggable) t.destroy();
    const e = O("textarea", this.el);
    ot.destroy(e), se.getAll().forEach((t) => t.kill());
  }
  setup() {
    this.initial();
  }
  onGlText() {
    const e = O("[data-gl-opacity]", this.el);
    e.length && h.to(e, { opacity: 1, duration: 0.5, ease: "linear" });
  }
  load() {
    new Qs(), this.onEnterCompleted();
  }
  async handleGl() {
    const e = O("[data-gl-text]", this.el),
      t = O("[data-gl-snap]", this.el),
      s = O("[data-gl-size]", this.el),
      i = O("[data-gl-img]", this.el),
      a = O("[data-gl-hover-img]", this.el);
    await r.loaded,
      a.length && r.gl.hoverImages && r.gl.hoverImages.add(a),
      t.length && r.gl.snapSections && r.gl.snapSections.add(t),
      s.length && r.gl.sizeSections && r.gl.sizeSections.add(s),
      e.length && r.gl.texts && r.gl.texts.add(e, "textElements"),
      i.length && r.gl.planes && r.gl.planes.addImages(i, "imgElements"),
      await R(),
      this.afterGl();
  }
  afterGl() {
    const e = r.gl.blob;
    e &&
      ((e.material.uniforms.uOpacity.value = 0),
      e.snapToCenter(),
      e.setZoom(),
      (r.gl.active = !0));
  }
  handleLazy() {
    const e = si
      ? [...O("[data-lazy-src-m]", this.el), ...O("[data-lazy-src]", this.el)]
      : O("[data-lazy-src]", this.el);
    e.length && (this.lazy = new Js(e));
  }
  handleScroll() {
    const e = O("[data-smooth-item]", this.el);
    if (e.length && ((this.scroll = new js(e)), this.el.id === "blog-single")) {
      const t = (a) =>
          new Promise((c) => {
            const f = new Image();
            (f.onload = () => c({ path: a, status: "ok" })),
              (f.onerror = () => c({ path: a, status: "error" })),
              (f.src = a);
          }),
        s = [...O("img", this.el)].map((a) => a.src || a.currentSrc);
      ((...a) => Promise.all(a.map(t)))(s).then(() => {
        u.emit("resize");
      });
    }
  }
  handleDraggable() {
    const e = [...O(".js-slider", this.el)];
    e.length && (this.draggable = e.map((t) => new Zs(t)));
  }
  handleGllry() {
    const e = [...O(".js-gllry", this.el)];
    e.length && (this.gllry = e.map((t) => new ti(t)));
  }
  handleTextarea() {
    const e = O("textarea", this.el);
    e && ot(e);
  }
  handleActive() {
    De(".js-site-link").forEach((e) => {
      e.href === location.href
        ? e.classList.add("is-active")
        : e.classList.remove("is-active");
    });
  }
}
class ce {
  constructor(e) {
    (this.el = e),
      (this.inViewEl = e),
      (this.inViewParams = { threshold: 0.15, rootMargin: "0% 0% -40% 0%" }),
      this.init(),
      this.activeObserver && this.observe();
  }
  init() {
    (this.sectionViewed = !1),
      (this.lastViewed = !1),
      (this.inView = this.inView.bind(this)),
      (this.animateIn = this.animateIn.bind(this)),
      (this.animateOut = this.animateOut.bind(this)),
      (this.observe = this.observe.bind(this)),
      (this.activeObserver = !1);
  }
  observe() {
    (this.observer = new IntersectionObserver(this.inView, this.inViewParams)),
      this.observer.observe(this.inViewEl);
  }
  unobserve() {
    this.activeObserver && this.observer.unobserve(this.inViewEl);
  }
  destroy() {
    this.unobserve();
  }
  animateIn() {}
  animateOut() {}
  inView(e) {
    e.forEach((t) => {
      const { isIntersecting: s, target: i } = t;
      if (s)
        if (((this.isIntersecting = !0), i === this.inViewEl)) {
          if (this.sectionViewed) return;
          this.animateIn(), (this.sectionViewed = !0);
        } else {
          if (this.lastViewed) return;
          this.lastViewed = !0;
        }
    });
  }
}
const { qs: Ft, qsa: Ae } = A;
class ni extends ce {
  init() {
    super.init(),
      (this.inViewEl = Ft(".h-contact-viewer", this.el)),
      (this.autoAnimation = !1),
      (this.activeObserver = !0),
      (this.textBlocks = Ae(".text-anim", this.el)),
      (this.textBlocksInner = Ae(".text-anim-inner", this.el)),
      (this.arrow = Ft(".arrow", this.el)),
      (this.colsOuter = Ae(".col-outer", this.el)),
      (this.colsInner = Ae(".col-inner", this.el)),
      h.set([this.textBlocks, this.colsOuter], { overflow: "hidden" }),
      h.set(this.textBlocksInner, { yPercent: 100, opacity: 0 }),
      h.set(this.colsInner, { xPercent: -100 }),
      h.set(this.arrow, { x: "4rem" });
  }
  animateIn() {
    super.animateIn(),
      h.fromTo(
        this.textBlocksInner,
        { yPercent: 100 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 2,
          ease: "expo.out",
        }
      ),
      h.fromTo(
        this.arrow,
        { x: "4rem" },
        { x: 0, delay: 0.25, duration: 2, ease: "expo.out" }
      ),
      h.fromTo(
        this.colsInner,
        { xPercent: -100 },
        {
          xPercent: 0,
          delay: 0.25,
          stagger: 0.1,
          duration: 2,
          ease: "expo.out",
        }
      );
  }
}
const { qs: xn, qsa: kt } = A;
class oi extends ce {
  init() {
    super.init(),
      (this.autoAnimation = !1),
      (this.activeObserver = !1),
      (this.textBlocks = kt(".text-anim", this.el)),
      (this.textBlocksInner = kt(".text-anim-inner", this.el)),
      h.set(this.textBlocks, { overflow: "hidden" }),
      h.set(this.textBlocksInner, { yPercent: 100 }),
      E.on("GL_TEXT_IN", this.animateIn);
  }
  destroy() {
    super.destroy(), E.off("GL_TEXT_IN", this.animateIn);
  }
  animateIn() {
    super.animateIn(),
      h.fromTo(
        this.textBlocksInner[0],
        { yPercent: 100 },
        { yPercent: 0, duration: 2, ease: "expo.out" }
      ),
      h.fromTo(
        [this.textBlocksInner[1], this.textBlocksInner[2]],
        { yPercent: 100 },
        { yPercent: 0, stagger: 0.15, duration: 2, ease: "expo.out" }
      );
  }
}
const { qs: ue, qsa: Rt } = A;
class ai extends ce {
  async init() {
    super.init(),
      (this.autoAnimation = !1),
      (this.activeObserver = !0),
      (this.inViewEl = ue(".h-about__text", this.el)),
      (this.arrow = ue(".arrow", this.el)),
      h.set(this.inViewEl, { overflow: "hidden" }),
      (this.inViewParams = { threshold: 0.15, rootMargin: "0% 0% 0% 0%" }),
      this.splitTexts(),
      await R(),
      (this.textBlocks = Rt(".text-anim", this.el)),
      (this.textBlocksInner = Rt(".text-anim-inner", this.el)),
      (this.linkWrap = ue(".h-about-link", this.el)),
      (this.linkInner = ue(".h-about-link-inner", this.el)),
      h.set(this.textBlocksInner, { xPercent: -100 }),
      h.set(this.linkWrap, { overflow: "hidden" }),
      h.set(this.linkInner, { xPercent: -120 }),
      h.set(this.arrow, { x: "4rem" });
  }
  splitTexts() {
    ue(".js-sel-item-subtitle", this.el);
    const e = new B(ue(".h-about__text p", this.el), {
        type: "lines",
        linesClass: "text-anim",
      }).lines,
      t = new B(e, { type: "lines", linesClass: "text-anim-inner" }).lines;
    e.forEach((s) => {
      s.dataset.glText = "";
    }),
      t.forEach((s) => {
        s.dataset.glTextInner = "";
      }),
      h.set(e, { overflow: "hidden" });
  }
  animateIn() {
    super.animateIn(),
      h.fromTo(
        this.arrow,
        { x: "4rem" },
        { x: 0, duration: 2, ease: "expo.out" }
      ),
      this.textBlocksInner.forEach((e, t) => {
        e.animate(
          [
            { transform: "translate3D(-100%, 0, 0)" },
            { transform: "translate3D(0, 0, 0)" },
          ],
          {
            duration: 3e3,
            delay: 250 + t * 100,
            fill: "both",
            easing: "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
          }
        );
      }),
      h.fromTo(
        this.linkInner,
        { xPercent: -100 },
        { xPercent: 0, delay: 0.75, duration: 2, ease: "expo.out" }
      );
  }
}
const { qs: Pe, qsa: Dt } = A;
class ri extends ce {
  async init() {
    super.init(),
      (this.inViewParams = { threshold: 0, rootMargin: "-50% 0% -50% 0%" }),
      (this.autoAnimation = !1),
      (this.activeObserver = !0),
      this.splitTexts(),
      await R(),
      (this.textBlocks = Dt(".text-anim", this.el)),
      (this.textBlocksInner = Dt(".text-anim-inner", this.el)),
      (this.linkWrap = Pe(".sel-item-link", this.el)),
      (this.linkInner = Pe(".js-sel-link", this.el)),
      h.set(this.textBlocks, { overflow: "hidden" }),
      h.set(this.textBlocksInner, { yPercent: 100 }),
      h.set(this.linkWrap, { overflow: "hidden" }),
      h.set(this.linkInner, { xPercent: -100 });
  }
  splitTexts() {
    Pe(".js-sel-item-subtitle", this.el);
    const e = new B(Pe(".js-sel-item-title", this.el), {
      type: "words",
      wordsClass: "text-anim",
    }).words;
    new B(e, { type: "words", wordsClass: "text-anim-inner" }).words,
      h.set(e, { overflow: "hidden" });
  }
  animateIn() {
    super.animateIn(),
      h.fromTo(
        this.textBlocksInner,
        { yPercent: 100 },
        {
          yPercent: 0,
          delay: 0.2,
          stagger: 0.15,
          duration: 2,
          ease: "expo.out",
        }
      ),
      h.fromTo(
        this.linkInner,
        { xPercent: -100 },
        { xPercent: 0, delay: 0.75, duration: 2, ease: "expo.out" }
      );
  }
}
const { qs: Te, qsa: ge } = A;
class li extends ce {
  async init() {
    super.init(),
      (this.inViewParams = { threshold: 0, rootMargin: "0% 0% 0% 0%" }),
      (this.inViewEl = Te(".caps__view", this.el)),
      (this.capsGl = Te(".caps__gl", this.el)),
      (this.autoAnimation = !1),
      (this.activeObserver = !0),
      (this.capsInner = ge(".caps-item__inner", this.inViewEl)),
      (this.capsGlInner = ge(".caps-item__inner", this.capsGl)),
      (this.caps = ge(".caps-item", this.inViewEl)),
      (this.capsGl = ge(".caps-item", this.capsGl)),
      (this.arrow = Te(".arrow", this.el)),
      (this.title = Te(".caps-title-inner", this.el)),
      (this.capsGlContainers = ge("[data-gl-img]", this.el)),
      (this.capsGlInstances = []),
      (this.getGlPlanes = this.getGlPlanes.bind(this)),
      E.on("GL_IMAGES_IN", this.getGlPlanes),
      h.set([this.caps, this.capsGl], { perspective: 2e3 }),
      h.set([this.capsInner, this.capsGlInner], {
        rotationY: 60,
        y: 300,
        opacity: 0,
      }),
      h.set(this.title, { xPercent: -100 }),
      h.set(this.arrow, { x: "4rem" });
  }
  destroy() {
    super.destroy(), E.off("GL_IMAGES_IN", this.getGlPlanes);
  }
  getGlPlanes() {
    o.gl.planes.children.forEach((e) => {
      this.capsGlContainers.forEach((t) => {
        e.el === t && this.capsGlInstances.push(e);
      });
    });
  }
  animateIn() {
    super.animateIn(),
      h.fromTo(
        this.arrow,
        { x: "4rem" },
        { x: 0, duration: 2, ease: "expo.out" }
      ),
      h.fromTo(
        this.title,
        { xPercent: -100 },
        { xPercent: 0, duration: 2, delay: 0.3, ease: "expo.out" }
      ),
      h.fromTo(
        this.capsInner,
        { rotationY: 60, opacity: 0, y: 300 },
        {
          rotationY: 0,
          opacity: 1,
          y: 0,
          delay: 0.25,
          stagger: 0.1,
          duration: 2,
          ease: "expo.out",
          transformOrigin: "center",
          transformStyle: "preserve-3d",
          onUpdate: () => {
            this.capsGlInstances.forEach((e, t) => {
              e.material.uniforms.opacity.value =
                this.capsInner[t].style.opacity;
            });
          },
        }
      ),
      h.fromTo(
        this.capsGlInner,
        { rotationY: 60, opacity: 0, y: 300 },
        {
          rotationY: 0,
          y: 0,
          opacity: 1,
          delay: 0.25,
          stagger: 0.1,
          duration: 2,
          ease: "expo.out",
          transformOrigin: "center",
          transformStyle: "preserve-3d",
        }
      );
  }
}
const { qs: ve, qsa: Ot } = A;
class hi extends ce {
  async init() {
    super.init(),
      (this.autoAnimation = !1),
      (this.activeObserver = !0),
      (this.inViewParams = { threshold: 0.15, rootMargin: "0% 0% 0% 0%" }),
      (this.newsItems = Ot(".news-item", this.el)),
      (this.newsHeader = ve(".news-header", this.el)),
      (this.newsItemsCache = []),
      this.newsItems.forEach((e) => {
        const t = Ot(".news-item__inner", e),
          s = ve(".news-item-b", e);
        h.set(t, { y: 300, opacity: 0 }),
          h.set(s, { scaleX: 0 }),
          this.newsItemsCache.push({ inner: t, line: s });
      }),
      (this.newsHeaderArrow = ve(".arrow", this.newsHeader)),
      (this.newsHeaderTitleInner = ve(
        ".news-header-title-inner",
        this.newsHeader
      )),
      (this.newsHeaderLinkInner = ve(
        ".news-header-link-inner",
        this.newsHeader
      )),
      h.set([this.newsHeaderTitleInner, this.newsHeaderLinkInner], {
        xPercent: -100,
      }),
      h.set(this.newsHeaderArrow, { x: "4rem" });
  }
  animateIn() {
    super.animateIn(),
      h.fromTo(
        this.newsHeaderArrow,
        { x: "4rem" },
        { x: 0, duration: 2, ease: "expo.out" }
      ),
      h.fromTo(
        [this.newsHeaderTitleInner, this.newsHeaderLinkInner],
        { xPercent: -100 },
        { xPercent: 0, duration: 2, delay: 0.3, ease: "expo.out" }
      ),
      this.newsItemsCache.forEach(({ inner: e, line: t }, s) => {
        h.fromTo(
          t,
          { scaleX: 0 },
          { scaleX: 1, delay: 0.5 * s, duration: 2, ease: "expo.out" }
        ),
          h.fromTo(
            e,
            { opacity: 0, y: 300 },
            {
              opacity: 1,
              y: 0,
              delay: 0.5 * s,
              stagger: 0.075,
              duration: 2,
              ease: "expo.out",
            }
          );
      });
  }
}
const { qs: de, qsa: ci } = A;
class ui extends oe {
  onEnter() {
    super.onEnter();
  }
  onLeave() {
    super.onLeave();
  }
  async afterGl() {
    super.afterGl(),
      (r.gl.blob.material.uniforms.uOpacity.value = 1),
      (r.gl.blob.mouse.active = o.mouse);
  }
  handleSections() {
    super.handleSections(),
      (this.contactSectionEl = de(".h-contact", this.el)),
      (this.homeIntroEl = de(".hero", this.el)),
      (this.homeAboutEl = de(".h-about", this.el)),
      (this.homeProjectEls = ci(".sel-item", this.el)),
      (this.homeCapsEl = de(".caps", this.el)),
      (this.homeBlogItemsEl = de(".news-list", this.el)),
      this.contactSectionEl &&
        this.sections.push(new ni(this.contactSectionEl)),
      this.homeIntroEl && this.sections.push(new oi(this.homeIntroEl)),
      this.homeAboutEl && this.sections.push(new ai(this.homeAboutEl)),
      this.homeCapsEl && this.sections.push(new li(this.homeCapsEl)),
      this.homeBlogItemsEl && this.sections.push(new hi(this.homeBlogItemsEl)),
      this.homeProjectEls.length &&
        this.homeProjectEls.forEach((e) => {
          this.sections.push(new ri(e));
        });
  }
  onEnterCompleted() {
    super.onEnterCompleted(), (this.selected = new Ks(de(".js-sel")));
  }
  onLeaveCompleted() {
    super.onLeaveCompleted(), this.selected && this.selected.destroy();
  }
}
const { qs: ae, qsa: yn } = A;
class di extends oe {
  constructor() {
    super(...arguments);
    g(this, "switchContactType", (e) => {
      const t = e.target.dataset.type;
      this.form.action = this.form.dataset.action + t;
      const s = ae("#comments-label", this.form);
      (s.innerText = "Tell us about your " + t + "..."),
        this.transitionUnderline(e.target);
    });
    g(this, "handleSubmitForm", (e) => {
      if ((e.preventDefault(), grecaptcha.getResponse().length == 0))
        return (
          console.log({ message: "Detected spam user." }),
          this.setErrors({ message: "Something went wrong. Please try again" }),
          !1
        );
      fetch(e.target.action, {
        method: "POST",
        body: new FormData(e.target),
        redirect: "manual",
      })
        .then((s) => {
          if (s.ok)
            return s.json().then((i) => {
              i && "redirect" in i && (location.href = i.redirect);
            });
          s.json().then((i) => {
            this.setErrors(i);
          });
        })
        .catch((s) => {
          console.log("err", s), this.setErrors(s);
        });
    });
  }
  onEnter() {
    super.onEnter(),
      (this.el = this.wrap.lastElementChild),
      (this.form = ae("#contact-form", this.el)),
      (this.selector = ae(".inquiry-selector", this.el)),
      this.selector && (this.underline = ae(".underline", this.selector)),
      (this.containerErrors = ae(".container-errors", this.el)),
      (this.ulErrors = ae(".list-errors", this.containerErrors));
  }
  onLeave() {
    super.onLeave();
  }
  async handleGl() {
    super.handleGl(),
      await j(100),
      (r.gl.blob.material.uniforms.uOpacity.value = 0);
  }
  onEnterCompleted() {
    super.onEnterCompleted(),
      this.addEvents(),
      this.selector && this.handleInquirySelector(),
      this.handleFileInput(),
      grecaptcha.render("recaptcha", {
        sitekey: "6LcBFSodAAAAABX25ZVwEfr311n6AdqOpxdVc2xB",
        callback: function () {
          console.log("recaptcha callback");
        },
      }),
      grecaptcha.execute();
  }
  onLeaveCompleted() {
    super.onLeaveCompleted(), this.removeEvents();
  }
  addEvents() {
    this.selector &&
      this.selector.addEventListener("input", this.switchContactType),
      this.form.addEventListener("submit", this.handleSubmitForm);
  }
  removeEvents() {
    this.selector &&
      this.selector.removeEventListener("input", this.switchContactType),
      this.form.removeEventListener("submit", this.handleSubmitForm);
  }
  handleInquirySelector() {
    this.selector &&
      this.transitionUnderline(ae("label:first-child input", this.selector));
  }
  handleFileInput() {
    const e = ae(".file-input", this.el);
    e && (this.fileinput = new _t(e));
  }
  transitionUnderline(e) {
    const t = e.nextElementSibling;
    this.underline.style.transform =
      "translateX(" + t.offsetLeft + "px) scaleX(" + t.offsetWidth + ")";
  }
  setErrors(e) {
    if (!e) {
      this.containerErrors.classList.add("dn");
      return;
    }
    this.ulErrors.innerHtml = "";
    const t = e && Object.keys(e).length > 0;
    for (const s in e)
      if (Object.hasOwnProperty.call(e, s)) {
        const i = e[s],
          a = document.createElement("li");
        (a.innerText = `${s}: ${i}`), this.ulErrors.appendChild(a);
      }
    t
      ? this.containerErrors.classList.remove("dn")
      : this.containerErrors.classList.add("dn");
  }
}
const { qs: $t } = A;
class fi extends oe {
  constructor() {
    super(...arguments);
    g(this, "_handleCategoryChange", () => {
      r.router.redirect(`${this.baseUrl.href}${this.categories.value}`);
    });
  }
  onEnter() {
    super.onEnter(),
      (this.baseUrl = $t(".categories-url", this.el)),
      (this.categories = $t("#categories", this.el));
  }
  onLeave() {
    super.onLeave();
  }
  onEnterCompleted() {
    super.onEnterCompleted(), this.addEvents();
  }
  onLeaveCompleted() {
    super.onLeaveCompleted(), this.removeEvents();
  }
  async afterGl() {
    super.afterGl(),
      (r.gl.blob.material.uniforms.uOpacity.value = 1),
      (r.gl.blob.mouse.active = !1),
      r.gl.snapSections &&
        ((r.gl.snapSections.instances[0].keep = !0),
        (r.gl.snapSections.instances[
          r.gl.snapSections.instances.length - 1
        ].keep = !0),
        r.gl.snapSections.instances[0].hoverInstance.show(),
        (r.gl.snapSections.instances[0].isIntersecting = !0)),
      setTimeout(() => {
        r.gl.blob.setSize(0.23);
      }, 500);
  }
  addEvents() {
    this.categories &&
      this.categories.addEventListener("input", this._handleCategoryChange);
  }
  removeEvents() {
    this.categories &&
      this.categories.removeEventListener("input", this._handleCategoryChange);
  }
}
const { qs: Ye, qsa: mi } = A;
class pi extends oe {
  constructor() {
    super(...arguments);
    g(this, "handleSubmitForm", (e) => {
      if ((e.preventDefault(), grecaptcha.getResponse().length == 0))
        return (
          console.log({ message: "Detected spam user." }),
          this.setErrors({ message: "Something went wrong. Please try again" }),
          !1
        );
      fetch(e.target.action, {
        method: "POST",
        body: new FormData(e.target),
      }).then((s) => {
        if (s.ok)
          return s.json().then((i) => {
            i && "redirect" in i && (location.href = i.redirect);
          });
        s.json().then((i) => {
          this.setErrors(i);
        });
      });
    });
  }
  onEnter() {
    super.onEnter(),
      (this.el = this.wrap.lastElementChild),
      (this.form = Ye("#apply-form", this.el)),
      (this.containerErrors = Ye(".container-errors", this.el)),
      (this.ulErrors = Ye(".list-errors", this.containerErrors));
  }
  onLeave() {
    super.onLeave();
  }
  onEnterCompleted() {
    super.onEnterCompleted(),
      this.addEvents(),
      this.handleFileInput(),
      grecaptcha.render("recaptcha", {
        sitekey: "6LcBFSodAAAAABX25ZVwEfr311n6AdqOpxdVc2xB",
        callback: function () {
          console.log("recaptcha callback");
        },
      }),
      grecaptcha.execute();
  }
  onLeaveCompleted() {
    super.onLeaveCompleted(), this.removeEvents();
  }
  addEvents() {
    this.form.addEventListener("submit", this.handleSubmitForm);
  }
  removeEvents() {
    this.form.removeEventListener("submit", this.handleSubmitForm);
  }
  handleFileInput() {
    const e = mi(".file-input", this.el);
    e && (this.fileinputs = Array.from(e).map((t) => new _t(t)));
  }
  setErrors(e) {
    if (!e) {
      this.containerErrors.classList.add("dn");
      return;
    }
    this.ulErrors.innerHtml = "";
    const t = e && Object.keys(e).length > 0;
    for (const s in e)
      if (Object.hasOwnProperty.call(e, s)) {
        const i = e[s],
          a = document.createElement("li");
        (a.innerText = `${s}: ${i}`), this.ulErrors.appendChild(a);
      }
    t
      ? this.containerErrors.classList.remove("dn")
      : this.containerErrors.classList.add("dn");
  }
}
const { qs: wn, qsa: gi } = A;
class vi extends oe {
  constructor() {
    super(...arguments);
    g(this, "_handleCategoryChange", () => {
      r.router.redirect(`${this.baseUrl.href}${this.categories.value}`);
    });
    g(
      this,
      "_handleInput",
      it(() => {
        this._submit(this.search);
      }, 62.5)
    );
    g(this, "_handleSearch", (e) => {
      e.preventDefault(), this._submit(e.target);
    });
  }
  onEnter() {
    super.onEnter();
  }
  onLeave() {
    super.onLeave();
  }
  onEnterCompleted() {
    super.onEnterCompleted(), this.addEvents();
  }
  onLeaveCompleted() {
    super.onLeaveCompleted(), this.removeEvents();
  }
  addEvents() {
    this.categories &&
      this.categories.addEventListener("input", this._handleCategoryChange),
      this.search && this.search.addEventListener("submit", this._handleSearch),
      this.input && this.input.addEventListener("input", this._handleInput);
  }
  removeEvents() {
    this.categories &&
      this.categories.removeEventListener("input", this._handleCategoryChange),
      this.search &&
        this.search.removeEventListener("submit", this._handleSearch),
      this.input && this.input.removeEventListener("input", this._handleInput),
      r.gl && r.gl.clearBackground();
  }
  afterGl() {
    super.afterGl(),
      (r.gl.blob.material.uniforms.uOpacity.value = o.isMobile ? 0 : 1),
      (r.gl.blob.mouse.active = !0),
      r.gl.setBackground(),
      setTimeout(() => {
        r.gl.blob.setSize(0.23);
      }, 500);
  }
  _submit(e) {
    this.controller && this.controller.abort(),
      (this.controller = new AbortController());
    const t = new URLSearchParams(new FormData(e)),
      s = gi("[data-uid]", this.el);
    if (t.get("q")) {
      const i = e.action + "?" + t.toString(),
        a = { method: "get", signal: this.controller.signal };
      fetch(i, a)
        .then((c) => c.json())
        .then((c) => {
          const f = new Set(c);
          for (const d of s)
            f.has(d.dataset.uid)
              ? (d.style.display = "block")
              : (d.style.display = "none");
          (this.messageInner.innerText = t.get("q")),
            (this.message.style.display = c.length ? "none" : "block"),
            u.emit("resize"),
            E.emit("FORCE_RESIZE");
        })
        .catch((c) => {
          if (c.name !== "AbortError") throw c;
        });
    } else {
      this.message.style.display = "none";
      for (const i of s) i.style.display = "block";
      u.emit("resize");
    }
  }
}
const { qs: qt } = A;
class xi extends oe {
  async onEnter() {
    super.onEnter(),
      (this.leaving = !1),
      (this.resize = this.resize.bind(this)),
      await j(300),
      !this.leaving &&
        ((this.snapPoint = qt("[data-gl-case]")),
        (this.heroCase = qt(".hero-case")),
        await r.loaded,
        !this.leaving &&
          ((r.gl.blob.material.uniforms.uOpacity.value = 1),
          r.gl.blob.animating || r.gl.blob.snapToPoint(this.snapPoint),
          r.gl.blob.addScrollEvents(),
          (this.coverImage = r.gl.hoverImages.get(this.heroCase)),
          r.gl.hoverImages.instances.length === 1 && this.coverImage.show(),
          (this.coverImage.hover = !1),
          u.on("resize:on-reset", this.resize)));
  }
  onEnterCompleted() {
    super.onEnterCompleted();
  }
  async afterGl() {
    await r.loaded, (r.gl.blob.material.uniforms.uOpacity.value = 1);
  }
  onLeave() {
    super.onLeave(),
      (this.leaving = !0),
      u.on("resize:on-reset", this.resize),
      r.gl.blob.removeScrollEvents();
  }
  resize() {
    r.gl.blob.snapToPoint(this.snapPoint);
  }
}
const { qs: xe } = A;
class yi extends oe {
  onEnter() {
    super.onEnter(),
      (this.heroImage = xe(".bp-hero__top__img", this.el)),
      (this.heroText = xe(".bp-hero__text", this.el)),
      (this.heroBg = xe(".bp-hero__figure", this.el)),
      h.fromTo(
        [this.heroImage, this.heroBg],
        { scale: 1.25, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "expo.out" }
      ),
      h.fromTo(
        this.heroText,
        { scale: 1.15, opacity: 0 },
        { scale: 0.99, opacity: 1, duration: 2.5, ease: "expo.out" }
      );
  }
  loadSumoScripts() {
    let e = {};
    var t = document.getElementsByClassName("sumo-data");
    for (index of t)
      if (index && index.dataset && index.dataset.sumo) {
        let i = index.dataset.sumo;
        if (!e[i]) {
          e[i] = !0;
          var s = document.createElement("script");
          (s.type = "text/javascript"),
            (s.async = !0),
            (s.src = i),
            (s.onload = function () {
              console.log("loaded", i);
            }),
            document.head.appendChild(s);
        }
      }
  }
  async onEnterCompleted() {
    super.onEnterCompleted(), await j(1e3), r.gl.blob && r.gl.blob.setZoom();
  }
  afterGl() {
    const e = r.gl.blob;
    e &&
      ((e.material.uniforms.uOpacity.value = 0),
      e.setSize(),
      setTimeout(() => {
        r.gl.active = !1;
      }, 1e3)),
      (this.gl = xe("#gl > canvas")),
      (this.gl.style.opacity = 0);
  }
  onLeave() {
    (this.gl = xe("#gl > canvas")),
      (this.gl.style.opacity = ""),
      super.onLeave();
  }
}
const wi = new be.Core({
  renderers: {
    default: oe,
    home: ui,
    contact: di,
    blog: fi,
    apply: pi,
    cases: vi,
    case: xi,
    "blog-single": yi,
  },
  transitions: { default: We, contextual: { menu: qs, case: Bs, zoom: Us } },
});
"ontouchstart" in window ||
  window.TouchEvent ||
  (window.DocumentTouch && document instanceof DocumentTouch);
const bi = () => {
  const n = window.matchMedia("(pointer:coarse)");
  return n && n.matches;
};
navigator.userAgent.indexOf("Firefox") > -1;
(!!window.opr && !!opr.addons) ||
  !!window.opera ||
  navigator.userAgent.indexOf(" OPR/") >= 0;
const Si =
  /constructor/i.test(window.HTMLElement) ||
  (function (n) {
    return n.toString() === "[object SafariRemoteNotification]";
  })(
    !window.safari || (typeof safari != "undefined" && safari.pushNotification)
  );
!!window.chrome && (!!window.chrome.webstore || window.chrome.runtime);
class Ei extends v {
  constructor(e) {
    super(e.clientWidth, e.clientHeight);
    (this.container = e),
      (this.resize = this.resize.bind(this)),
      (this.onMouseMove = this.onMouseMove.bind(this)),
      (this.onWheel = this.onWheel.bind(this)),
      window.addEventListener("resize", this.resize, { passive: !0 }),
      window.addEventListener("mousemove", this.onMouseMove, { passive: !0 }),
      window.addEventListener("wheel", this.onWheel, { passive: !0 }),
      E.on("FORCE_RESIZE", this.resize),
      (this.mouse = new v(window.innerWidth / 2, window.innerHeight / 2)),
      (this.dpr = Si && !bi() ? 0.5 : 1),
      this.resize();
  }
  onWheel() {
    E.emit("GL_MOUSEMOVE", { x: this.mouse.x, y: this.mouse.y });
  }
  onMouseMove({ clientX: e, clientY: t }) {
    (this.mouse.x = e),
      (this.mouse.y = t),
      E.emit("GL_MOUSEMOVE", { x: e, y: t });
  }
  async resize() {
    clearTimeout(this.timeOutResize), await R();
    const { innerWidth: e, innerHeight: t } = window;
    this.set(e, t),
      E.emit("GL_RESIZE", { w: e, h: t, dpr: this.dpr }),
      (this.timeOutResize = setTimeout(() => {
        E.emit("GL_RESIZE", { w: e, h: t, dpr: this.dpr });
      }, 400));
  }
}
function zi(n) {
  return new Promise((e, t) => {
    var s = {
        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
        lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
        alpha:
          "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
        animation:
          "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",
      },
      i = new Image();
    (i.onload = function () {
      i.width > 0 && i.height > 0 ? e(n) : t(n);
    }),
      (i.onerror = function () {
        t(n);
      }),
      (i.src = "data:image/webp;base64," + s[n]);
  });
}
class Ci {
  constructor() {
    (this.items = 0), (this.isLoading = !1), this.init();
  }
  add(e, t) {
    return (
      this.items++,
      new Promise((s, i) => {
        const a = new Image();
        (a.src = t), _e.itemStart(t), f();
        function c() {
          d(), _e.itemEnd(t), s();
        }
        function f() {
          a.addEventListener("load", c, !1), a.addEventListener("error", c, !1);
        }
        function d() {
          a.removeEventListener("load", c, !1),
            a.removeEventListener("error", c, !1);
        }
      })
    );
  }
  async init() {
    (this.isLoaded = !1),
      (this.progress = 0),
      await j(200),
      (_e.onProgress = (e, t, s) => {
        this.isLoaded ||
          ((this.isLoading = !0),
          setTimeout(() => {
            const i = Math.floor((t / s) * 100);
            i > this.progress && (this.progress = i),
              E.emit("LOADPROGRESS", this.progress),
              this.progress === 100 &&
                (E.emit("LOADPROGRESS", 100),
                setTimeout(() => {
                  (this.isLoaded = !0), E.emit("GL_LOADED");
                }, 2e3));
          }, 2 * t));
      }),
      await j(0),
      this.isLoading || E.emit("GL_LOADED");
  }
}
const Xe = 3500;
class Ze extends es {
  constructor() {
    super();
    this.position.set(0, 0, Xe),
      (this.distance = Xe),
      (this.near = 0.01),
      (this.far = 4e3);
  }
  calcFov(e, t) {
    return 2 * Math.atan(e / t / (2 * Xe)) * (180 / Math.PI);
  }
  resize(e, t) {
    (this.aspect = e / t),
      (this.fov = this.calcFov(e, e / t)),
      this.updateProjectionMatrix();
  }
}
class ye extends at {
  constructor() {
    super();
  }
}
class Gt extends ts {
  constructor(e) {
    super({ alpha: !0, antialias: !0 });
    e.appendChild(this.domElement),
      this.setSize(o.layout.w, o.layout.h),
      this.setPixelRatio(o.layout.dpr);
  }
  resize(e, t) {
    this.setSize(e, t);
  }
}
var Ai = `#define GLSLIFY 1
uniform sampler2D imgTexture;uniform vec2 imgSize;uniform vec2 containerSize;uniform float scale;uniform float opacity;varying vec2 vUv;vec4 bgCover(sampler2D tex,vec2 imgSize,vec2 ouv,vec2 containerSize){vec2 s=containerSize;vec2 i=imgSize;float rs=s.x/s.y;float ri=i.x/i.y;vec2 new=rs<ri ? vec2(i.x*s.y/i.y,s.y): vec2(s.x,i.y*s.x/i.x);vec2 newOffset=(rs<ri ? vec2((new.x-s.x)/2.0,0.0): vec2(0.0,(new.y-s.y)/2.0))/new;vec2 uv=ouv*s/new+newOffset;return texture2D(tex,uv);}void main(){vec2 coords=vUv;coords-=0.5;coords/=scale;coords+=0.5;vec4 img=bgCover(imgTexture,imgSize,coords,containerSize);if(opacity<0.01){discard;}gl_FragColor=vec4(img.rgb,opacity);}`,
  Pi = `precision highp float;
#define GLSLIFY 1
varying vec2 vUv;void main(){vUv=uv;vec3 p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`;
class we extends Me {
  constructor(e, t) {
    super(e, t);
    this.init();
  }
  init() {
    (this.offset = new v()), (this.size = 1);
  }
  calculateUnitSize(e = 0) {
    const t = (o.gl.camera.fov * Math.PI) / 180,
      s = 2 * Math.tan(t / 2) * e;
    return { width: s * o.gl.camera.aspect, height: s };
  }
  updateSize({ width: e, height: t }) {
    this.camUnit = this.calculateUnitSize(
      o.gl.camera.position.z - this.position.z
    );
    const s = e / o.layout.x,
      i = t / o.layout.y;
    (this.scale.x = this.camUnit.width * s * this.size),
      (this.scale.y = this.camUnit.height * i * this.size);
  }
  async resize(e, t) {
    let s = this.el.getBoundingClientRect();
    await R(), this.updateSize(s), this.calculatePosition(e, t, s);
  }
  calculatePosition(e, t, { width: s, height: i, top: a, left: c }) {
    (this.top = a + o.scroll.offsetTop),
      this.offset.set(-e / 2 + s / 2 + c, t / 2 - i / 2 - this.top);
  }
  update(e = o.scroll.offsetTop) {
    (this.position.y = this.offset.y + e), (this.position.x = this.offset.x);
  }
}
class Ti extends we {
  constructor(e, t) {
    const { clientWidth: s, clientHeight: i } = e,
      a = new fe(1, 1, 1, 1),
      c = new Se({
        side: Fe,
        uniforms: {
          opacity: { value: 0 },
          scale: { value: 1 },
          imgTexture: { value: null },
          containerSize: { value: new v(s, i) },
          imgSize: { value: new v(1, 1) },
        },
        vertexShader: Pi,
        fragmentShader: Ai,
        transparent: !0,
      });
    super(a, c);
    (this.name = t),
      (this.el = e),
      (this.animateOnPageLoad = this.el.dataset.glOpacity === void 0),
      (this.bounds = new v()),
      this.init();
  }
  async init() {
    super.init(),
      (this.resize = this.resize.bind(this)),
      (this.load = this.load.bind(this)),
      await R(),
      E.emit("FORCE_RESIZE");
  }
  animateOut() {
    h.to(this.material.uniforms.opacity, {
      value: 0,
      duration: 0.5,
      ease: "none",
    });
  }
  animateIn() {
    this.animateOnPageLoad &&
      h.to(this.material.uniforms.opacity, {
        value: 1,
        duration: 0.5,
        ease: "none",
      });
  }
  updatePosition(e) {
    let t = e.getBoundingClientRect();
    this.updateSize(t), this.calculatePosition(o.layout.x, o.layout.y, t);
  }
  update(e = o.scroll.offsetTop) {
    this.updatePosition(this.el),
      (this.position.y = this.offset.y + e),
      (this.position.x = this.offset.x);
  }
  load(e) {
    const { naturalHeight: t, naturalWidth: s } = e.image;
    (this.material.uniforms.imgTexture.value = e),
      (this.material.uniforms.imgSize.value = new v(s, t));
  }
}
const Ii = new ss();
function Qe(n) {
  return new Promise((e) => {
    Ii.load(n, (t) => {
      (t.needsUpdate = !0), e(t);
    });
  });
}
class Li extends is {
  async init() {
    this.instances = [];
  }
  async addImages(e = [], t) {
    (this.promises = []),
      e.forEach((s, i) => {
        const a = new Ti(s, `IMG ${i}`);
        this.add(a),
          this.promises.push(Qe(s.dataset.glImg)),
          this.instances.push(a);
      }),
      (this.loaded = !0),
      this.resize(),
      Promise.all(this.promises).then((s) => {
        setTimeout(() => {
          this.load(s), this.animateIn(), E.emit("GL_IMAGES_IN");
        }, 300);
      });
  }
  async load(e) {
    this.instances.forEach((t, s) => {
      t.load(e[s]);
    });
  }
  animateIn() {
    this.instances.forEach((e) => {
      e.animateIn();
    });
  }
  animateOut() {
    this.instances.forEach((e) => {
      e.animateOut();
    });
  }
  get(e) {
    let t;
    return t;
  }
  destroy() {
    this.instances.forEach((e, t) => {
      this.remove(this.instances[t]);
    }),
      (this.instances = []);
  }
  resize(e, t) {
    for (let s = 0; s < this.instances.length; s++)
      this.instances[s].resize(e, t);
  }
  update() {
    if (!!this.loaded)
      for (let e = 0; e < this.instances.length; e++)
        this.instances[e].update();
  }
}
function Bt(n) {
  return parseInt(n, 10);
}
function _i({
  font: n,
  text: e,
  width: t = 1 / 0,
  align: s = "left",
  size: i = 1,
  letterSpacing: a = 0,
  lineHeight: c = 1.4,
  wordSpacing: f = 0,
  wordBreak: d = !1,
}) {
  const z = this;
  let H, U, Q, q;
  const P = /\n/,
    k = /\s/;
  C(), W();
  function C() {
    (H = {}), n.chars.forEach((S) => (H[S.char] = S));
  }
  function W() {
    n.common.lineHeight, (Q = n.common.base), (q = i / Q);
    let w = e.replace(/[ \n]/g, "").length;
    U = {
      position: new Float32Array(w * 4 * 3),
      uv: new Float32Array(w * 4 * 2),
      id: new Float32Array(w * 4),
      index: new Uint16Array(w * 6),
    };
    for (let m = 0; m < w; m++)
      (U.id[m] = m),
        U.index.set(
          [m * 4, m * 4 + 2, m * 4 + 1, m * 4 + 1, m * 4 + 2, m * 4 + 3],
          m * 6
        );
    J();
  }
  function J() {
    const S = [];
    let w = 0,
      m = 0,
      x = 0,
      b = I();
    function I() {
      const T = { width: 0, glyphs: [] };
      return S.push(T), (m = w), (x = 0), T;
    }
    let G = 100,
      V = 0;
    for (; w < e.length && V < G; ) {
      V++;
      const T = e[w];
      if (!b.width && k.test(T)) {
        w++, (m = w), (x = 0);
        continue;
      }
      if (P.test(T)) {
        w++, (b = I());
        continue;
      }
      const p = H[T] || H[" "];
      if (b.glyphs.length) {
        const F = b.glyphs[b.glyphs.length - 1][0];
        let l = K(p.id, F.id) * q;
        (b.width += l), (x += l);
      }
      b.glyphs.push([p, b.width]);
      let L = 0;
      if (
        (k.test(T) ? ((m = w), (x = 0), (L += f * i)) : (L += a * i),
        (L += p.xadvance * q),
        (b.width += L),
        (x += L),
        b.width > t)
      ) {
        if (d && b.glyphs.length > 1) {
          (b.width -= L), b.glyphs.pop(), (b = I());
          continue;
        } else if (!d && x !== b.width) {
          let F = w - m + 1;
          b.glyphs.splice(-F, F), (w = m), (b.width -= x), (b = I());
          continue;
        }
      }
      w++, (V = 0);
    }
    b.width || S.pop(), M(S);
  }
  function M(S) {
    const w = n.common.scaleW,
      m = n.common.scaleH;
    let x = 0.07 * i,
      b = 0;
    for (let I = 0; I < S.length; I++) {
      let G = S[I];
      for (let V = 0; V < G.glyphs.length; V++) {
        const T = G.glyphs[V][0];
        let p = G.glyphs[V][1];
        if (
          (s === "center"
            ? (p -= G.width * 0.5)
            : s === "right" && (p -= G.width),
          k.test(T.char))
        )
          continue;
        (p += T.xoffset * q), (x -= T.yoffset * q);
        let L = T.width * q,
          F = T.height * q;
        U.position.set(
          [p, x - F, 0, p, x, 0, p + L, x - F, 0, p + L, x, 0],
          b * 4 * 3
        );
        let l = T.x / w,
          ee = T.width / w,
          $ = 1 - T.y / m,
          Y = T.height / m;
        U.uv.set([l, $ - Y, l, $, l + ee, $ - Y, l + ee, $], b * 4 * 2),
          (x += T.yoffset * q),
          b++;
      }
      x -= i * c;
    }
    (z.buffers = U),
      (z.numLines = S.length),
      (z.height = z.numLines * i * c),
      (z.width = Math.max(...S.map((I) => I.width)));
  }
  function K(S, w) {
    for (let m = 0; m < n.kernings.length; m++) {
      let x = n.kernings[m];
      if (!(x.first < S) && !(x.second < w))
        return x.first > S || (x.first === S && x.second > w) ? 0 : x.amount;
    }
    return 0;
  }
  (this.resize = function (S) {
    ({ width: t } = S), J();
  }),
    (this.update = function (S) {
      ({ text: e } = S), W();
    });
}
var Ht = `#define GLSLIFY 1
attribute vec2 uv;attribute vec3 position;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;varying vec2 vUv;void main(){vUv=uv;vec3 vPosition=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(vPosition,1.0);}`,
  Ut = `#define GLSLIFY 1
uniform sampler2D tMap;uniform float fReveal;uniform float uOpacity;uniform vec3 uColor;varying vec2 vUv;void main(){vec2 newUv=vUv;newUv.y+=fReveal;vec3 tex=texture2D(tMap,newUv).rgb;float signedDist=max(min(tex.r,tex.g),min(max(tex.r,tex.g),tex.b))-0.5;float d=fwidth(signedDist);float alpha=smoothstep(-d,d,signedDist);if(alpha<0.1)discard;gl_FragColor.rgb=uColor;gl_FragColor.a=alpha*uOpacity;}`,
  Wt = `#define GLSLIFY 1
attribute vec3 position;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
  Vt = `#define GLSLIFY 1
uniform sampler2D tRender;uniform vec2 uResolution;void main(){vec2 screenUv=gl_FragCoord.xy/uResolution.xy;vec4 renderTexture=texture2D(tRender,screenUv.xy);gl_FragColor.rgb=renderTexture.rgb;gl_FragColor.a=1.0;}`;
class Mi extends we {
  constructor(e) {
    super();
    (this.elInner = e.querySelector("[data-gl-text-inner]")),
      (this.el = this.elInner === null ? e : this.elInner),
      (this.elWrap = e),
      (this.el.style.opacity = 0),
      (this.elWrap.style.opacity = 0),
      (this.animateIn = this.animateIn.bind(this)),
      (this.loaded = !1),
      (this.debug = e.dataset.glDebug !== void 0),
      (this.offset = new v()),
      (this.offsetWrap = new v()),
      (this.bounds = new v()),
      (this.fix = new v()),
      (this.renderTarget = new Ee(o.layout.x, o.layout.y)),
      (this.scene = new at()),
      this.calculateStyles(this.el),
      (this.textCreated = new Promise((t) => {
        this.resolveTextCreated = t;
      })),
      (this.promise = new Promise((t) => {
        this.resolve = t;
      }));
  }
  async init() {
    await R(),
      this.addEvents(),
      o.fonts[`${this.fontFile}`] === void 0
        ? (await this.loadFont(), this.create())
        : this.create();
  }
  addEvents() {}
  animateIn() {
    h.to([this.el, this.elWrap], { opacity: 1, duration: 0.5, ease: "none" }),
      h.to(this.material.uniforms.uOpacity, {
        value: 1,
        duration: 0.5,
        ease: "none",
      });
  }
  animateOut() {
    h.to(this.el, { opacity: 0, duration: 0.5, ease: "none" }),
      h.to(this.material.uniforms.uOpacity, {
        value: 0,
        duration: 0.5,
        ease: "none",
      });
  }
  destroy() {
    E.off("GL_LOADED", this.onLoad),
      o.gl.rtScene.remove(this.textPlaneMesh),
      this.scene.remove(this.mesh);
  }
  async loadFont() {
    const e = o.webp ? "webp" : "png",
      t = await fetch(`/static/fonts/${this.fontFile}.json`),
      s = await Qe(`/static/fonts/${this.fontFile}.${e}`);
    o.fonts[`${this.fontFile}`] === void 0 &&
      (o.fonts[`${this.fontFile}`] = { font: await t.json(), texture: s });
  }
  async create() {
    (this.font = o.fonts[`${this.fontFile}`].font),
      (this.texture = o.fonts[`${this.fontFile}`].texture),
      this.createText(this.font),
      await this.textCreated,
      this.createGeometry(),
      this.createMaterial(),
      this.createMesh(),
      (this.loaded = !0),
      (this.mesh.position.y = this.text.height * 0.5),
      o.gl.rtScene.add(this.textPlaneMesh),
      this.scene.add(this.mesh),
      await R(),
      this.resolve();
  }
  calculateStyles(e) {
    const t = getComputedStyle(e);
    let { width: s, height: i } = e.getBoundingClientRect();
    (this.params = {
      width: s,
      height: i,
      fontFamily: t.getPropertyValue("font-family").replace(/["]+/g, ""),
      textColor: t.getPropertyValue("color"),
      textAlign: t.getPropertyValue("text-align"),
      fontWeight: t.getPropertyValue("font-weight"),
      letterSpacing:
        t.getPropertyValue("letter-spacing") === "normal"
          ? 0
          : t.getPropertyValue("letter-spacing"),
      fontSize: Bt(t.getPropertyValue("font-size")),
      lineHeight: Bt(t.getPropertyValue("line-height")),
      baseHeight: 0,
    }),
      this.params.fontWeight === "normal" && (this.params.fontWeight = 400),
      this.params.fontFamily === "sui" && (this.params.letterSpacing = -0.025),
      this.params.fontFamily === "dwe" && (this.params.fontSize *= 0.805),
      this.params.fontFamily === "dwe" && (this.fix.y = 31),
      this.params.fontFamily === "sui" &&
        (this.fix.y =
          e.dataset.glTextYFix === void 0 ? 4 : e.dataset.glTextYFix),
      this.params.fontFamily === "dwe" && (this.params.baseHeight = 243),
      this.params.fontFamily === "sui" && (this.params.baseHeight = 343),
      (this.fontFile = `${this.params.fontFamily}-${this.params.fontWeight}`);
  }
  async createText(e, t = !0) {
    const s = {
        font: e,
        text: this.el.innerText,
        width: this.params.width,
        align: this.params.textAlign,
        size: this.params.fontSize,
        lineHeight: this.params.lineHeight / this.params.fontSize,
        letterSpacing: this.params.letterSpacing,
      },
      i = this;
    (i.text = new _i(s)), i.resolveTextCreated();
  }
  createMaterial() {
    const e =
        `
            ` + Ht,
      t =
        `
        #extension GL_OES_standard_derivatives : enable
        precision highp float;
    ` + Ut,
      s =
        `#version 300 es
        #define attribute in
        #define varying out
    ` + Ht,
      i =
        `#version 300 es
        precision highp float;
        #define varying in
        #define texture2D texture
        #define gl_FragColor FragColor
        out vec4 FragColor;
    ` + Ut,
      a =
        `
            ` + Wt,
      c =
        `#version 300 es
        #define attribute in
        #define varying out
    ` + Wt,
      f =
        `
        #extension GL_OES_standard_derivatives : enable
        precision highp float;
    ` + Vt,
      d =
        `#version 300 es
        precision highp float;
        #define varying in
        #define texture2D texture
        #define gl_FragColor FragColor
        out vec4 FragColor;
    ` + Vt;
    (this.material = new rt({
      side: Fe,
      vertexShader: o.webgl2 ? s : e,
      fragmentShader: o.webgl2 ? i : t,
      uniforms: {
        tMap: { value: this.texture },
        fReveal: { value: 0 },
        uOpacity: { value: 0 },
        uLimits: { value: new v() },
        uBounds: {
          value: new ns(
            this.params.baseHeight / 2048,
            this.params.baseHeight / 2048
          ),
        },
        uColor: { value: new os(this.params.textColor) },
      },
      transparent: !0,
    })),
      (this.textPlaneMaterial = new rt({
        vertexShader: o.webgl2 ? c : a,
        fragmentShader: o.webgl2 ? d : f,
        uniforms: {
          tRender: { value: this.renderTarget.texture },
          uBounds: { value: new v() },
          uPosition: { value: new v() },
          uResolution: { value: new v() },
        },
        transparent: !0,
      })),
      this.params.fontFamily === "sui" &&
        this.material.uniforms.uLimits.value.set(0.006, 0.069),
      this.params.fontFamily === "dwe" &&
        this.material.uniforms.uLimits.value.set(0.0135, 0.069);
  }
  render() {
    o.gl.renderer.setRenderTarget(this.renderTarget),
      o.gl.renderer.render(this.scene, o.gl.camera),
      o.gl.renderer.setRenderTarget(null);
  }
  updateGeometry() {
    this.geometry.setAttribute(
      "position",
      new ke(this.text.buffers.position, 3)
    ),
      this.geometry.setAttribute("uv", new ke(this.text.buffers.uv, 2)),
      this.geometry.setAttribute("id", new ke(this.text.buffers.id, 1)),
      this.geometry.setIndex(new as(this.text.buffers.index, 1));
  }
  createGeometry() {
    (this.geometry = new rs()),
      (this.textPlane = new fe(1, 1, 1, 1)),
      this.updateGeometry();
  }
  updatePosition(e) {
    const { clientWidth: t, clientHeight: s } = e;
    this.calculatePosition(e, t, s), this.calculateStyles(this.el);
  }
  async resize(e) {
    if (!this.loaded) return;
    this.updatePosition(e);
    let t = this.elWrap.getBoundingClientRect();
    await R(), this.updateSize(t);
    const { x: s, y: i, dpr: a } = o.layout;
    this.renderTarget.setSize(s * a, i * a, !1),
      this.text && (this.createText(this.font, !1), this.updateGeometry()),
      this.textPlaneMaterial.uniforms.uBounds.value.set(
        t.width * a,
        t.height * a
      ),
      this.textPlaneMaterial.uniforms.uPosition.value.set(
        t.left * a,
        t.top * a
      ),
      this.textPlaneMaterial.uniforms.uResolution.value.set(s * a, i * a);
  }
  calculatePosition(e, t, s) {
    let { top: i, left: a } = this.elWrap.getBoundingClientRect(),
      { top: c, left: f } = e.getBoundingClientRect();
    const { x: d, y: z } = o.layout;
    (this.top = c + o.scroll.offsetTop),
      (this.topWrap = i + o.scroll.offsetTop),
      this.bounds.set(t, s),
      this.offset.set(-d / 2 + t / 2 + f, z / 2 - s / 2 - this.top),
      this.offsetWrap.set(-d / 2 + t / 2 + a, z / 2 - s / 2 - this.topWrap);
  }
  updateSize({ width: e, height: t }) {
    this.camUnit = this.calculateUnitSize(
      o.gl.camera.position.z - this.position.z
    );
    const s = e / o.layout.x,
      i = t / o.layout.y;
    (this.textPlaneMesh.scale.x = this.camUnit.width * s),
      (this.textPlaneMesh.scale.y = this.camUnit.height * i);
  }
  createMesh() {
    (this.mesh = new Me(this.geometry, this.material)),
      (this.textPlaneMesh = new Me(this.textPlane, this.textPlaneMaterial));
  }
  update(e) {
    !this.loaded ||
      (this.updatePosition(this.el),
      this.mesh.position.set(
        this.offset.x - this.bounds.x / 2 + this.fix.x,
        this.offset.y + e + this.bounds.y / 2 + this.fix.y,
        1
      ),
      (this.textPlaneMesh.position.y = this.offsetWrap.y + e),
      (this.textPlaneMesh.position.x = this.offsetWrap.x));
  }
}
class Fi {
  constructor(e) {
    (this.instance = e),
      (this.gl = e.renderer.gl),
      (this.scene = e.scene),
      (this.instances = []);
  }
  async add(e = [], t) {
    (this.promises = []),
      e.forEach((c, f) => {
        const d = new Mi(c);
        this.promises.push(d.promise), this.instances.push(d);
      }),
      (this.loaded = !0),
      this.resize();
    const { x: s, y: i, dpr: a } = o.layout;
    Promise.all(this.promises).then((c) => {
      setTimeout(() => {
        this.resize(s, i, a), this.animateIn(), E.emit("GL_TEXT_IN");
      }, 300);
    });
  }
  destroy() {
    this.instances.forEach((e) => {
      e.destroy();
    }),
      (this.instances = []);
  }
  animateIn() {
    this.instances.forEach((e) => {
      e.animateIn();
    });
  }
  animateOut() {
    this.instances.forEach((e) => {
      e.animateOut();
    });
  }
  render() {
    for (let e = 0; e < this.instances.length; e++) this.instances[e].render();
  }
  update() {
    for (let e = 0; e < this.instances.length; e++)
      this.instances[e].update(o.scroll.offsetTop);
  }
  resize(e, t, s) {
    for (let i = 0; i < this.instances.length; i++)
      this.instances[i].resize(this.instances[i].el, e, t, s);
  }
}
var y = {
    BlobSizeInitial: 1,
    BlobSizeHover: 0.89,
    uFresnelOffset: -1.4,
    uFresnelOffsetS: -1.367,
    uFresnelMultiplier: 1.435,
    uFresnelPower: 1.239,
    uRefraction: 0.03,
    uRefractionColorShift: 0.75,
    uDistortionFrequency: 2.174,
    uDistortionStrength: 1.6300000000000001,
    uDisplacementFrequency: 0.186,
    uDisplacementStrength: 0.042,
    uDisplacementScale: 0.675,
    uDisplacementSpeed: 0.315,
    uColorMix1Opacity: 0.11,
    uColorMix1Smooth: 0.12,
    uHueShift: 0,
    uSaturation: 0.978,
    uRedSaturation: 1.891,
    uRedHue: 0,
    uGreenSaturation: 1,
    uGreenHue: 0,
    uBlueSaturation: 1.5,
    uBlueHue: 0,
    mouseLamda: 0.065,
    mouseDelta: 1.25,
    mouseFollow: !0,
    uSizeDefault: 0.275,
  },
  ki = `#define GLSLIFY 1
uniform sampler2D imgTexture;uniform vec2 imgSize;uniform vec2 containerSize;uniform float scale;uniform float opacity;varying vec2 vUv;vec4 bgCover(sampler2D tex,vec2 imgSize,vec2 ouv,vec2 containerSize){vec2 s=containerSize;vec2 i=imgSize;float rs=s.x/s.y;float ri=i.x/i.y;vec2 new=rs<ri ? vec2(i.x*s.y/i.y,s.y): vec2(s.x,i.y*s.x/i.x);vec2 newOffset=(rs<ri ? vec2((new.x-s.x)/2.0,0.0): vec2(0.0,(new.y-s.y)/2.0))/new;vec2 uv=ouv*s/new+newOffset;return texture2D(tex,uv);}vec3 applyVignette(vec3 color,vec2 vUv){float dist=length(vUv-.5);float radius=0.75;float softness=0.5;float vignette=smoothstep(radius,radius-softness,dist);color.rgb=color.rgb-(1.0-vignette);return color;}void main(){vec2 coords=vUv;coords-=0.5;coords/=scale;coords+=0.5;vec2 p=vUv*2.0-1.0;vec4 img=bgCover(imgTexture,imgSize,coords,containerSize);if(opacity<0.01){discard;}gl_FragColor=vec4(applyVignette(img.rgb,vUv),opacity);}`,
  Ri = `precision highp float;
#define GLSLIFY 1
varying vec2 vUv;void main(){vUv=uv;vec3 p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`;
class Di extends we {
  constructor(e, t) {
    const s = new fe(1, 1, 20, 20),
      i = new Se({
        side: Fe,
        uniforms: {
          opacity: { value: 0 },
          scale: { value: 1.5 },
          imgTexture: { value: null },
          containerSize: { value: new v(1, 1) },
          imgSize: { value: new v(1, 1) },
        },
        vertexShader: Ri,
        fragmentShader: ki,
        transparent: !0,
      });
    super(s, i);
    (this.name = t), (this.bounds = new v()), (this.el = e), (this.size = 1);
  }
  async init() {
    super.init(),
      (this.resize = this.resize.bind(this)),
      await R(),
      E.emit("FORCE_RESIZE");
  }
  async resize(e, t) {
    if (!o.gl.blob) return;
    let s = o.gl.blob.el.getBoundingClientRect();
    await R(), this.updateSize(s), this.calculatePosition(e, t, s);
  }
  setSize(e = 1, t = 1, s = "expo.out") {
    h.to(this, { size: e, duration: t, ease: s });
  }
  updateSize({ width: e, height: t }) {
    this.camUnit = this.calculateUnitSize(
      o.gl.camera.position.z - this.position.z
    );
    const s = e / o.layout.x,
      i = t / o.layout.y;
    (this.bounds.x = this.camUnit.width * s),
      (this.bounds.y = this.camUnit.height * i);
  }
  update() {
    !o.gl.blob ||
      ((this.scale.x = this.bounds.x * this.size),
      (this.scale.y = this.bounds.y * this.size),
      o.gl.blob.mouse1 &&
        ((this.position.y = o.gl.blob.mouse1.y * o.layout.y),
        (this.position.x = o.gl.blob.mouse1.x * o.layout.x)));
  }
  load(e) {
    const { naturalHeight: t, naturalWidth: s } = e.image;
    (this.material.uniforms.imgTexture.value = e),
      (this.material.uniforms.imgSize.value = new v(s, t));
  }
}
class Oi {
  constructor(e) {
    (this.el = e),
      (this.hover = !0),
      (this.keep = !1),
      (this.onMouseenter = this.onMouseenter.bind(this)),
      (this.onMouseleave = this.onMouseleave.bind(this)),
      this.init();
  }
  async init() {
    await this.loadImage(), this.addEvents();
  }
  async loadImage() {
    (this.plane = new Di(this.el, "IMG hover")),
      (this.image = await Qe(this.el.dataset.glHoverImg)),
      this.plane.load(this.image),
      o.gl.rtSceneHover.add(this.plane);
  }
  addEvents() {
    this.el.addEventListener("mouseenter", this.onMouseenter),
      this.el.addEventListener("mouseleave", this.onMouseleave);
  }
  destroy() {
    this.keep ||
      (this.el.removeEventListener("mouseenter", this.onMouseenter),
      this.el.removeEventListener("mouseleave", this.onMouseleave),
      this.hide(),
      setTimeout(() => {
        o.gl.rtSceneHover.remove(this.plane);
      }, 500));
  }
  resize(e, t) {
    this.plane && this.plane.resize(e, t);
  }
  update() {
    this.plane && this.plane.update();
  }
  show() {
    this.active ||
      (o.gl.hoverImages.hide(),
      (this.active = !0),
      o.gl.blob &&
        (h.to(o.gl.blob, {
          size: y.BlobSizeHover,
          duration: 4,
          ease: "expo.out",
        }),
        h.to(this.plane.material.uniforms.opacity, { value: 1, duration: 0.5 }),
        h.fromTo(
          this.plane.material.uniforms.scale,
          { value: 1.5 },
          { value: 1, duration: 2, ease: "expo.out" }
        ),
        h.to(o.gl.blob.material.uniforms.uRenderHoverOpacity, {
          value: 1,
          duration: 0.5,
        })));
  }
  hide() {
    !this.active ||
      ((this.active = !1),
      o.gl.blob &&
        (h.to(o.gl.blob, {
          size: y.BlobSizeInitial,
          duration: 4,
          ease: "expo.out",
        }),
        h.to(this.plane.material.uniforms.opacity, { value: 0, duration: 0.5 }),
        h.to(o.gl.blob.material.uniforms.uRenderHoverOpacity, {
          value: 0,
          duration: 0.5,
        })));
  }
  onMouseenter() {
    this.hover && this.show();
  }
  onMouseleave() {
    this.hover && this.hide();
  }
}
class $i {
  constructor(e) {
    (this.get = this.get.bind(this)),
      (this.instances = []),
      (this.instance = e);
  }
  add(e = document.querySelectorAll("[data-gl-hover-img]")) {
    (this.els = e),
      this.els.forEach((t) => {
        const s = new Oi(t);
        this.instances.push(s);
      });
  }
  resize(e, t) {
    for (let s = 0; s < this.instances.length; s++)
      this.instances[s].resize(e, t);
  }
  update() {
    for (let e = 0; e < this.instances.length; e++)
      this.instances[e].update && this.instances[e].update();
  }
  hide() {
    for (let e = 0; e < this.instances.length; e++)
      this.instances[e].hide && this.instances[e].hide();
  }
  get(e) {
    let t;
    return (
      this.instances.forEach((s) => {
        s.el === e && (t = s);
      }),
      t
    );
  }
  destroy() {
    this.instances.forEach((e) => {
      e.destroy();
    }),
      (this.instances = this.instances.filter((e) => e.keep));
  }
}
function jt(n = "") {
  return n + "_" + Math.random().toString(36).substr(2, 9);
}
class qi {
  constructor(e) {
    (this.inView = this.inView.bind(this)),
      (this.update = this.update.bind(this)),
      (this.onClick = this.onClick.bind(this)),
      (this.id = jt("snap")),
      (this.el = e),
      (this.snapPoint = this.el.querySelector("[data-gl-snap-point]")),
      (this.active = !1),
      (this.initial = !0),
      (this.isIntersecting = !1),
      (this.observer = new IntersectionObserver(this.inView, {
        threshold: 0,
        rootMargin: "-50% 0% -50% 0%",
      })),
      this.init();
  }
  async init() {
    await R(),
      this.el.hasAttribute("data-gl-hover-img") &&
        ((this.hoverInstance = o.gl.hoverImages.get(this.el)),
        (this.hoverInstance.hover = !1)),
      await R(),
      this.addEvents();
  }
  addEvents() {
    this.observer.observe(this.el),
      this.el.tagName === "A" &&
        this.el.addEventListener("click", this.onClick),
      o.raf.add(this.update, this.id);
  }
  destroy() {
    this.observer.unobserve(this.el),
      this.el.tagName === "A" &&
        this.el.addEventListener("click", this.onClick),
      o.raf.remove(this.id);
  }
  onClick() {
    this.active ||
      (o.gl.snapSections.instances.forEach((e) => {
        e.active = !1;
      }),
      (this.active = !0),
      this.hoverInstance.show());
  }
  inView(e) {
    e.forEach((t) => {
      const { isIntersecting: s } = t;
      if (((this.isIntersecting = s), s))
        (this.initial = !1),
          (o.gl.blob.mouse.active = !1),
          o.gl.snapSections.current === this &&
            ((this.active = !0),
            this.hoverInstance && this.hoverInstance.show());
      else {
        if (this.initial || this.keep) return;
        (this.active = !1),
          setTimeout(() => {
            this.hoverInstance &&
              o.gl.snapSections.current === null &&
              (this.hoverInstance.hide(),
              r.gl.blob &&
                ((o.gl.blob.mouse.active = o.mouse),
                o.mouse || r.gl.blob.snapToCenter()));
          }, 100);
      }
    });
  }
  update() {
    if (!this.isIntersecting) return;
    const {
      top: e,
      left: t,
      width: s,
      height: i,
    } = this.snapPoint.getBoundingClientRect();
    o.gl.blob.mouse.set(
      (t + s / 2) / o.layout.x - 0.5,
      (-e - i / 2) / o.layout.y + 0.5
    ),
      (o.gl.blob.mouse.speed = 0),
      o.gl.snapSections.current === this &&
        this.hoverInstance &&
        this.hoverInstance.show();
  }
}
class Gi {
  constructor(e) {
    (this.instance = e),
      (this.instances = []),
      (this.current = null),
      (this.get = this.get.bind(this)),
      (this.update = this.update.bind(this));
  }
  add(e = document.querySelectorAll("[data-gl-snap]")) {
    (this.els = e),
      this.els.forEach((t) => {
        const s = new qi(t);
        this.instances.push(s);
      }),
      this.addEvents();
  }
  addEvents() {
    o.raf.add(this.update, "snapsections");
  }
  destroy() {
    this.instances.forEach((e) => {
      e.destroy();
    }),
      (this.instances = []);
  }
  update() {
    let e = !1;
    for (let t = 0; t < this.instances.length; t++)
      this.instances[t].isIntersecting &&
        ((e = !0), (this.current = this.instances[t]));
    e || (this.current = null);
  }
  get(e) {
    let t;
    return (
      this.instances.forEach((s) => {
        s.el === e && (t = s);
      }),
      t
    );
  }
}
class Bi {
  constructor(e) {
    (this.inView = this.inView.bind(this)),
      (this.update = this.update.bind(this)),
      (this.id = jt("size")),
      (this.el = e),
      (this.isIntersecting = !1),
      (this.size = parseFloat(this.el.dataset.glSize) / 10),
      (this.top = 0),
      (this.observer = new IntersectionObserver(this.inView, {
        threshold: 0,
        rootMargin: "-50% 0% -50% 0%",
      })),
      this.init();
  }
  async init() {
    this.calcBounds(), await j(200), this.addEvents();
  }
  addEvents() {
    this.observer.observe(this.el), o.raf.add(this.update, this.id);
  }
  destroy() {
    this.observer.unobserve(this.el), o.raf.remove(this.id);
  }
  calcBounds() {
    const { top: e, height: t } = this.el.getBoundingClientRect();
    this.top = e - t;
  }
  update() {
    !this.isIntersecting ||
      (o.scroll.offsetTop > this.top
        ? o.gl.blob.setSize(this.size)
        : o.gl.blob.setSize(y.uSizeDefault));
  }
  inView(e) {
    e.forEach((t) => {
      const { isIntersecting: s } = t;
      this.isIntersecting = s;
    });
  }
}
class Hi {
  constructor(e) {
    (this.instance = e), (this.instances = []);
  }
  add(e = document.querySelectorAll("[data-gl-size]")) {
    (this.els = e),
      this.els.forEach((t) => {
        const s = new Bi(t);
        this.instances.push(s);
      });
  }
  destroy() {
    this.instances.forEach((e) => {
      e.destroy();
    }),
      (this.instances = []);
  }
}
var Ui = `#define GLSLIFY 1
varying vec2 vUv;uniform float uZoom;void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position*uZoom,1.0);vUv=uv;}`,
  Wi = `#define GLSLIFY 1
mat4 rotationMatrix(vec3 axis,float angle){axis=normalize(axis);float s=sin(angle);float c=cos(angle);float oc=1.0-c;return mat4(oc*axis.x*axis.x+c,oc*axis.x*axis.y-axis.z*s,oc*axis.z*axis.x+axis.y*s,0.0,oc*axis.x*axis.y+axis.z*s,oc*axis.y*axis.y+c,oc*axis.y*axis.z-axis.x*s,0.0,oc*axis.z*axis.x-axis.y*s,oc*axis.y*axis.z+axis.x*s,oc*axis.z*axis.z+c,0.0,0.0,0.0,0.0,1.0);}vec3 rotate(vec3 v,vec3 axis,float angle){mat4 m=rotationMatrix(axis,angle);return(m*vec4(v,1.0)).xyz;}vec3 screen(vec3 a,vec3 b){return 1.-(1.-a)*(1.-b);}vec3 saturation(vec3 rgb,float adjustment){const vec3 W=vec3(0.2125,0.7154,0.0721);vec3 intensity=vec3(dot(rgb,W));return mix(intensity,rgb,adjustment);}vec3 hue_0(vec3 color,float hue){const vec3 k=vec3(0.57735,0.57735,0.57735);float cosAngle=cos(hue);return vec3(color*cosAngle+cross(k,color)*sin(hue)+k*dot(k,color)*(1.0-cosAngle));}vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}vec3 fade(vec3 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}float cnoise(vec3 P){vec3 Pi0=floor(P);vec3 Pi1=Pi0+vec3(1.0);Pi0=mod289(Pi0);Pi1=mod289(Pi1);vec3 Pf0=fract(P);vec3 Pf1=Pf0-vec3(1.0);vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x);vec4 iy=vec4(Pi0.yy,Pi1.yy);vec4 iz0=Pi0.zzzz;vec4 iz1=Pi1.zzzz;vec4 ixy=permute(permute(ix)+iy);vec4 ixy0=permute(ixy+iz0);vec4 ixy1=permute(ixy+iz1);vec4 gx0=ixy0*(1.0/7.0);vec4 gy0=fract(floor(gx0)*(1.0/7.0))-0.5;gx0=fract(gx0);vec4 gz0=vec4(0.5)-abs(gx0)-abs(gy0);vec4 sz0=step(gz0,vec4(0.0));gx0-=sz0*(step(0.0,gx0)-0.5);gy0-=sz0*(step(0.0,gy0)-0.5);vec4 gx1=ixy1*(1.0/7.0);vec4 gy1=fract(floor(gx1)*(1.0/7.0))-0.5;gx1=fract(gx1);vec4 gz1=vec4(0.5)-abs(gx1)-abs(gy1);vec4 sz1=step(gz1,vec4(0.0));gx1-=sz1*(step(0.0,gx1)-0.5);gy1-=sz1*(step(0.0,gy1)-0.5);vec3 g000=vec3(gx0.x,gy0.x,gz0.x);vec3 g100=vec3(gx0.y,gy0.y,gz0.y);vec3 g010=vec3(gx0.z,gy0.z,gz0.z);vec3 g110=vec3(gx0.w,gy0.w,gz0.w);vec3 g001=vec3(gx1.x,gy1.x,gz1.x);vec3 g101=vec3(gx1.y,gy1.y,gz1.y);vec3 g011=vec3(gx1.z,gy1.z,gz1.z);vec3 g111=vec3(gx1.w,gy1.w,gz1.w);vec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));g000*=norm0.x;g010*=norm0.y;g100*=norm0.z;g110*=norm0.w;vec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));g001*=norm1.x;g011*=norm1.y;g101*=norm1.z;g111*=norm1.w;float n000=dot(g000,Pf0);float n100=dot(g100,vec3(Pf1.x,Pf0.yz));float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z));float n110=dot(g110,vec3(Pf1.xy,Pf0.z));float n001=dot(g001,vec3(Pf0.xy,Pf1.z));float n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));float n011=dot(g011,vec3(Pf0.x,Pf1.yz));float n111=dot(g111,Pf1);vec3 fade_xyz=fade(Pf0);vec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),fade_xyz.z);vec2 n_yz=mix(n_z.xy,n_z.zw,fade_xyz.y);float n_xyz=mix(n_yz.x,n_yz.y,fade_xyz.x);return 2.2*n_xyz;}
#define DISTANCE 2.0
varying vec2 vUv;uniform vec4 uResolution;uniform float uTime;uniform vec2 uMouse1;uniform vec2 uMouse2;uniform float uOpacity;uniform sampler2D tRender;uniform samplerCube tMap;uniform sampler2D tRenderHover;uniform float uRenderHoverOpacity;uniform float uDistortionFrequency;uniform float uDistortionStrength;uniform float uDisplacementFrequency;uniform float uDisplacementScale;uniform float uDisplacementStrength;uniform float uRefraction;uniform float uRefractionColorShift;uniform float uFresnelOffset;uniform float uFresnelMultiplier;uniform float uFresnelPower;uniform float uColorMix1Opacity;uniform float uColorMix1Smooth;uniform float uHueShift;uniform float uSaturation;uniform float uRedSaturation;uniform float uGreenSaturation;uniform float uBlueSaturation;uniform float uRedHue;uniform float uGreenHue;uniform float uBlueHue;uniform float uSize;float sdSphere(vec3 p,float r){return length(p)-r;}float smin(float a,float b,float k){float h=clamp(0.5+0.5*(b-a)/k,0.0,1.0);return mix(b,a,h)-k*h*(1.0-h);}float sdf(vec3 p){float sphere1=sdSphere(p-vec3(uMouse1*uResolution.zw*2.,0.0),uSize-0.045);float sphere2=sdSphere(p-vec3(uMouse2*uResolution.zw*2.,0.0),uSize);return smin(sphere1,sphere2,0.2);}vec3 orthogonal(vec3 v){return normalize(abs(v.x)>abs(v.z)? vec3(-v.y,v.x,0.0): vec3(0.0,-v.z,v.y));}vec3 getDisplacedPosition(vec3 _position){vec3 distoredPosition=_position;float strength=uDistortionStrength;distoredPosition+=cnoise(vec3(distoredPosition*(uDistortionFrequency/uDisplacementScale)*strength+uTime));float perlinStrength=cnoise(vec3((distoredPosition)*(uDisplacementFrequency/uDisplacementScale)*strength));vec3 displacedPosition=_position;displacedPosition+=((_position/2.)*perlinStrength*uDisplacementStrength*4.);return displacedPosition;}vec3 calcNormal(vec3 pos){vec2 eps=vec2(0.01,0.);return normalize(vec3(sdf(pos+eps.xyy)-sdf(pos-eps.xyy),sdf(pos+eps.yxy)-sdf(pos-eps.yxy),sdf(pos+eps.yyx)-sdf(pos-eps.yyx)));}float mapTo(float x,float a,float b,float c,float d){return((x-a)*(d-c))/(b-a)+c;}void main(){float uGlow=.005;vec4 finalColor=vec4(0.0);vec3 camPos=vec3(0.0,0.0,DISTANCE);vec3 coords=vec3(uMouse1*uResolution.xy,0.0);vec3 ray=normalize(vec3((vUv-vec2(.5))*uResolution.zw,-1.0));float distanceMouse=distance(uMouse1,vec2(0.0))*.1;float t=0.0;float tMax=2.15;for(int i=0;i<4;++i){vec3 pos=camPos+t*ray;float h=sdf(getDisplacedPosition(pos));if(h<0.001||t>(tMax+uGlow))break;t+=h;}vec3 vNormal=vec3(0.0);vec2 screenUv=gl_FragCoord.xy/uResolution.xy;if(t<tMax){vec3 pos=camPos+t*ray;float tangentFactor=0.005;vec3 normal=calcNormal(pos);vec3 distortedPosition=getDisplacedPosition(pos);vec3 tangent1=orthogonal(normal);vec3 tangent2=normalize(cross(normal,tangent1));vec3 nearby1=pos+tangent1*tangentFactor;vec3 nearby2=pos+tangent2*tangentFactor;vec3 distorted1=getDisplacedPosition(nearby1);vec3 distorted2=getDisplacedPosition(nearby2);vNormal=normalize(cross(distorted1-distortedPosition,distorted2-distortedPosition));vec3 viewDirection=normalize(vec3(0.0,0.0,0.0)-vec3(coords.x/(uResolution.x*.25),coords.y/(uResolution.y*.25),-2.));vec3 nViewDirection=normalize(vNormal.xyz-viewDirection);float fresnel=uFresnelOffset*(1.-distanceMouse*2.0)+(1.0+dot(nViewDirection,vNormal))*uFresnelMultiplier;float fresnel2=uFresnelOffset*(1.-distanceMouse*2.0)+(2.+dot(ray,vNormal))*uFresnelMultiplier;fresnel=pow(max(0.0,fresnel),uFresnelPower);float fresnelFactor=pow(fresnel+fresnel2,uFresnelPower);vec3 vFresnelColor=mix(vec3(0.0),vec3(1.0),clamp(pow(max(0.0,fresnel-0.8),3.0),0.0,1.0));vec3 vFresnelColor2=vec3(max((t-2.1)*1.0,0.0));vFresnelColor=vFresnelColor+vFresnelColor2;vec3 refracted=refract(vec3(0.0,0.0,-2.0),vNormal,1.0/2.);screenUv+=refracted.xy*uRefraction*0.35;vec3 cubeTex=textureCube(tMap,vec3(screenUv,0.0)).rgb;vec3 texCube=screen(saturation(cubeTex,5.),vec3(0.0,0.0,0.0));vec3 texCubeFresnel=screen(mix(vec3(0.0,0.0,0.0),texCube,vFresnelColor),vFresnelColor);float offset=(0.01*vNormal.x*.15+.002)*uRefractionColorShift;float red=texture2D(tRender,vec2(screenUv.x,screenUv.y+offset)).r;float green=texture2D(tRender,vec2(screenUv.x,screenUv.y)).g;float blue=texture2D(tRender,vec2(screenUv.x,screenUv.y-offset)).b;vec3 refractedColor=vec3(red,green,blue);vec3 mixed1;mixed1.r=smoothstep(0.0,.25,texCubeFresnel.r);mixed1.g=smoothstep(0.0,.25,texCubeFresnel.r);mixed1.b=smoothstep(0.0,.25,texCubeFresnel.r);vec3 mixed2;float sign=smoothstep(uColorMix1Smooth*0.1,uColorMix1Smooth*0.01,texCubeFresnel.r);vec3 black=vec3(0.0,0.0,0.0);float invertFresnelFactor=min(1.-fresnelFactor+.2*10.,20.);mixed2=max(vec3(invertFresnelFactor,invertFresnelFactor,invertFresnelFactor),0.5);mixed2=mix(black,mix(black,mixed2,sign),uColorMix1Opacity);vec3 mixed3;mixed3.r=smoothstep(texCubeFresnel.r*10.0,-0.01,.5);mixed3.g=smoothstep(texCubeFresnel.g*10.0,-0.01,.5);mixed3.b=smoothstep(texCubeFresnel.b*10.0,-0.01,.5);vec3 mixed=screen(screen(mixed1,mixed3),mixed2);vec3 bw=saturation(mixed,0.0);vec3 shifted=hue_0(mixed,1.0);mixed=hue_0(mixed,uHueShift);mixed.r=mix(mix(bw.r,mixed.r,uRedSaturation),mix(bw.r,shifted.r,uRedSaturation),uRedHue);mixed.g=mix(mix(bw.g,mixed.g,uGreenSaturation),mix(bw.g,shifted.g,uGreenSaturation),uGreenHue);mixed.b=mix(mix(bw.b,mixed.b,uBlueSaturation),mix(bw.b,shifted.b,uBlueSaturation),uBlueHue);mixed=saturation(mixed,uSaturation);vec4 toImg=texture2D(tRenderHover,screenUv);vec3 background=mix(refractedColor,toImg.rgb,uRenderHoverOpacity);vec3 extraFresnel=max(vec3((t-2.135)*30.),vec3(0.0));vec3 mixedBackground=screen(mixed+extraFresnel,background);finalColor.rgb=mixedBackground;finalColor.a=1.0;}else{finalColor.a=0.0;}if(t>tMax&&t<(tMax+uGlow)){float mappedT=mapTo(t,tMax,tMax+uGlow,1.0,0.0);finalColor.rgb=vec3(1.0);finalColor.a=mappedT;}gl_FragColor=finalColor;gl_FragColor.a*=uOpacity;}`;
const Vi = new ls();
var ji = (n, e = "webp") =>
  new Promise((s, i) => {
    const a = [
      `${n}/px.${e}`,
      `${n}/nx.${e}`,
      `${n}/ny.${e}`,
      `${n}/py.${e}`,
      `${n}/pz.${e}`,
      `${n}/nz.${e}`,
    ];
    Vi.load(a, (c) => {
      s(c);
    });
  });
class Ni extends we {
  constructor(e) {
    const t = new fe(1, 1, 1),
      s = new Se({
        vertexShader: Ui,
        fragmentShader: Wi,
        transparent: !0,
        uniforms: {
          uTime: { value: 1 },
          uDistortionFrequency: { value: y.uDistortionFrequency },
          uDistortionStrength: { value: y.uDistortionStrength },
          uDisplacementFrequency: { value: y.uDisplacementFrequency },
          uDisplacementStrength: { value: y.uDisplacementStrength },
          uDisplacementScale: { value: y.uDisplacementScale },
          uFresnelOffset: {
            value: o.isMobile ? y.uFresnelOffsetS : y.uFresnelOffset,
          },
          uFresnelPower: { value: y.uFresnelPower },
          uFresnelMultiplier: { value: y.uFresnelMultiplier },
          uRefraction: { value: y.uRefraction },
          uRefractionColorShift: { value: y.uRefractionColorShift },
          tRender: { value: null },
          tMap: { value: null },
          tRenderHover: { value: null },
          uRenderHoverOpacity: { value: 0 },
          uColorMix1Opacity: { value: y.uColorMix1Opacity },
          uColorMix1Smooth: { value: y.uColorMix1Smooth },
          uColorNormalShift: { value: y.uColorNormalShift },
          uHueShift: { value: y.uHueShift },
          uSaturation: { value: y.uSaturation },
          uRedSaturation: { value: y.uRedSaturation },
          uGreenSaturation: { value: y.uGreenSaturation },
          uBlueSaturation: { value: y.uBlueSaturation },
          uRedHue: { value: y.uRedHue },
          uGreenHue: { value: y.uGreenHue },
          uBlueHue: { value: y.uBlueHue },
          uMouse1: { value: new v() },
          uMouse2: { value: new v() },
          uResolution: { value: new hs() },
          uSize: { value: y.uSizeDefault },
          uOpacity: { value: 0 },
          uZoom: { value: 0.5 },
        },
      });
    super(t, s);
    (this.gl = e),
      (this.update = this.update.bind(this)),
      (this.onMouseMove = this.onMouseMove.bind(this)),
      (this.onScroll = this.onScroll.bind(this)),
      (this.el = document.querySelector(".gl-blob")),
      (this.mouse = new v(
        window.innerWidth / 2 / window.innerWidth - 0.5,
        -window.innerHeight / 2 / window.innerHeight + 0.5
      )),
      (this.mouseAlways = new v(
        window.innerWidth / 2 / window.innerWidth - 0.5,
        -window.innerHeight / 2 / window.innerHeight + 0.5
      )),
      (this.mouse1 = new v(this.mouse.x, this.mouse.y)),
      (this.mouse2 = new v(this.mouse.x, this.mouse.y)),
      (this.mouse3 = new v(this.mouse.x, this.mouse.y)),
      this.setDefaultSettings(),
      (this.mouse.speed = 0),
      (this.animating = !1),
      (this.mouse.active = o.mouse),
      (this.zoom = 1),
      (this.scroll = new v()),
      (this.position1 = new v()),
      (this.position2 = new v()),
      (this.uSizeInitial = this.calcBlobSize(y.uSizeDefault)),
      (this.uSize = this.uSizeInitial),
      (this.uSizeLerp = this.uSizeInitial),
      (this.settings = { mouseLamda: y.mouseLamda, mouseDelta: y.mouseDelta }),
      (this.uDisplacementSpeed = y.uDisplacementSpeed),
      E.on("GL_MOUSEMOVE", this.onMouseMove),
      (this.gl = e),
      this.load();
  }
  async load() {
    const e = o.webp ? "webp" : "png",
      t = await ji("/static/cubemaps/01", e);
    (this.gl.scene.environment = t),
      (this.material.uniforms.tMap.value = t),
      (this.material.uniforms.tRender.value = this.gl.renderTarget.texture),
      (this.material.uniforms.tRenderHover.value =
        this.gl.renderTargetHover.texture),
      this.gl.scene.add(this),
      this.resize(window.innerWidth, window.innerHeight),
      r.resolve();
  }
  setSize(e) {
    this.uSize = this.calcBlobSize(e);
  }
  setDefaultSettings() {
    (this.mouse1.lerp = 0.05), (this.mouse2.lerp = 0.075);
  }
  setZoom(e = 1, t = 1, s = "expo.out") {
    h.to(this, { zoom: e, duration: t, ease: s });
  }
  calcBlobSize(e = y.uSizeDefault) {
    return (
      (ht(window.innerWidth, 800, 2e3) / Math.max(window.innerWidth, 1e3)) * e
    );
  }
  update(e) {
    this.material.uniforms.uOpacity.value < 0.001 ||
      ((this.mouse1.x = ie(this.mouse1.x, this.mouse.x, this.mouse1.lerp)),
      (this.mouse1.y = ie(this.mouse1.y, this.mouse.y, this.mouse1.lerp)),
      (this.mouse2.x = ie(this.mouse2.x, this.mouse1.x, this.mouse2.lerp)),
      (this.mouse2.y = ie(this.mouse2.y, this.mouse1.y, this.mouse2.lerp)),
      (this.position1 = this.mouse1),
      (this.position2 = this.mouse2),
      this.material.uniforms.uMouse1.value.copy(this.position1),
      this.material.uniforms.uMouse2.value.copy(this.position2),
      (this.uSizeLerp = ie(this.uSizeLerp, this.uSize, 0.05)),
      (this.material.uniforms.uSize.value = this.uSizeLerp),
      (this.material.uniforms.uZoom.value = this.zoom),
      (this.material.uniforms.uTime.value = e * this.uDisplacementSpeed));
  }
  updateSize({ width: e, height: t }) {
    this.camUnit = this.calculateUnitSize(
      o.gl.camera.position.z - this.position.z
    );
    const s = e / o.layout.x,
      i = t / o.layout.y;
    (this.scale.x = this.camUnit.width * s),
      (this.scale.y = this.camUnit.height * i);
  }
  async resize(e, t) {
    this.updateSize({ width: e, height: t }),
      this.calculatePosition(e, t, { width: e, height: t }),
      (this.uSize = this.calcBlobSize());
    const { dpr: s } = o.layout;
    this.imageAspect = 1;
    let i, a;
    t / e > this.imageAspect
      ? ((i = (e / t) * this.imageAspect), (a = 1))
      : ((i = 1), (a = t / e / this.imageAspect)),
      this.material.uniforms.uResolution.value.set(e * s, t * s, i, a);
  }
  onMouseMove({ x: e = window.innerWidth / 2, y: t = window.innerHeight / 2 }) {
    this.mouse.active && this.setMousePos(e, t), this.setMousePosAlways(e, t);
  }
  getMouseCoords(e, t) {
    return {
      x: (e / window.innerWidth - 0.5) / this.zoom,
      y: (-t / window.innerHeight + 0.5) / this.zoom,
    };
  }
  setMousePosAlways(e, t) {
    const { x: s, y: i } = this.getMouseCoords(e, t);
    this.mouseAlways.set(s, i);
  }
  setMousePos(e, t) {
    const { x: s, y: i } = this.getMouseCoords(e, t);
    this.mouse.set(s, i);
  }
  snapToCenter() {
    (this.uSize = this.uSizeInitial),
      this.setMousePos(window.innerWidth / 2, window.innerHeight / 2);
  }
  async snapToPoint(e, t = !1) {
    this.animating = !0;
    let s, i;
    if (t) (s = e.x), (i = e.y);
    else {
      const {
        top: a,
        left: c,
        height: f,
        width: d,
      } = e.getBoundingClientRect();
      (s = c + d / 2), (i = a + f / 2);
    }
    this.scroll.set(s, i),
      this.setMousePos(this.scroll.x, this.scroll.y),
      await j(2e3),
      (this.animating = !1);
  }
  async addScrollEvents() {
    o.isMobile
      ? (window.addEventListener("scroll", this.onScroll, { passive: !0 }),
        this.onScroll())
      : o.raf.add(this.onScroll, "scroll_blob"),
      (this.mouse.active = !1),
      await j(500),
      this.adjustToScrollSettings();
  }
  removeScrollEvents() {
    this.setDefaultSettings(),
      (this.mouse.active = !0),
      o.isMobile
        ? window.removeEventListener("scroll", this.onScroll, { passive: !0 })
        : o.raf.remove("scroll_blob");
  }
  adjustToScrollSettings() {
    (o.gl.blob.mouse.speed = 0),
      (o.gl.blob.mouse1.lerp = 0.2),
      (o.gl.blob.mouse2.lerp = 0.15);
  }
  onScroll() {
    this.setMousePos(this.scroll.x, this.scroll.y - o.scroll.offsetTop);
  }
  setCurrentPosition(e, t) {
    this.scroll.set(e, t);
  }
}
class Yi {
  constructor(e) {
    (o.container = document.querySelector(e)),
      (o.layout = new Ei(o.container)),
      (o.gl = this),
      (this.resize = this.resize.bind(this)),
      (this.update = this.update.bind(this)),
      (this.render = this.render.bind(this)),
      (this.load = this.load.bind(this));
  }
  async init() {
    await zi("lossy")
      .then(() => {
        o.webp = !0;
      })
      .catch(() => {
        o.webp = !1;
      }),
      (this.Manager = new Ci()),
      (this.clock = new cs()),
      (this.scene = new ye()),
      (this.textScene = new ye()),
      (this.rtScene = new ye()),
      (this.rtSceneHover = new ye()),
      (this.camera = new Ze()),
      (this.rtCamera = new Ze()),
      (this.renderer = new Gt(o.container)),
      o.isMobile
        ? (await j(500), E.emit("GL_TEXT_IN"))
        : ((this.texts = new Fi(this)), (this.planes = new Li())),
      (this.renderTarget = new Ee(o.layout.x, o.layout.y)),
      (this.renderTargetHover = new Ee(o.layout.x, o.layout.y)),
      (this.renderTargetText = new Ee(o.layout.x, o.layout.y)),
      E.on("GL_RESIZE", this.resize),
      E.on("GL_LOADED", this.load),
      (this.blob = new Ni(this)),
      (this.hoverImages = new $i(this)),
      (this.snapSections = new Gi(this)),
      (this.sizeSections = new Hi(this)),
      await R,
      this.in(document.body),
      o.raf.add(this.render, "render");
  }
  load() {
    h.to(o.container, {
      opacity: 1,
      delay: 0.5,
      duration: 0.5,
      ease: "linear",
    });
  }
  async in(e) {
    E.emit("GL_LOADED"),
      (this.active = !0),
      this.planes && this.createPlanes(),
      await R,
      o.layout.resize(),
      r.resolve();
  }
  out() {
    this.planes && this.planes.destroy();
  }
  destroy() {
    this.renderer.dispose(), E.off("GL_RESIZE", this.resize);
  }
  createPlanes() {
    this.planes.init(), this.rtScene.add(this.planes);
  }
  update(e) {
    this.hoverImages && this.hoverImages.update(),
      this.texts && this.texts.update(),
      this.planes && this.planes.update(),
      this.blob && this.blob.update(e),
      this.blob && (this.blob.visible = !1),
      this.renderer.setRenderTarget(this.renderTargetHover),
      this.renderer.render(this.rtSceneHover, this.camera),
      this.renderer.setRenderTarget(null),
      this.texts && this.texts.render(),
      this.renderer.setRenderTarget(this.renderTarget),
      this.renderer.render(this.rtScene, this.camera),
      this.renderer.setRenderTarget(null),
      this.blob && (this.blob.visible = !0);
  }
  setBackground() {
    this.scene.background = this.renderTarget.texture;
  }
  clearBackground() {
    this.scene.background = null;
  }
  render(e) {
    !this.active ||
      ((this.delta = this.clock.getDelta()),
      (this.time = this.clock.getElapsedTime()),
      this.update(this.time),
      this.renderer.render(this.scene, this.camera));
  }
  resize({ w: e, h: t, dpr: s }) {
    this.blob && this.blob.resize(e, t),
      this.texts && this.texts.resize(e, t, s),
      this.planes && this.planes.resize(e, t),
      this.hoverImages && this.hoverImages.resize(e, t),
      this.renderTarget.setSize(e * s, t * s, !1),
      this.renderTargetHover.setSize(e * s, t * s, !1),
      this.renderTargetText.setSize(e * s, t * s, !1),
      this.renderer.resize(e, t),
      this.camera.resize(e, t);
  }
}
var Xi = `#define GLSLIFY 1
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}float snoise(vec2 v){const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1;i1=(x0.x>x0.y)? vec2(1.0,0.0): vec2(0.0,1.0);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod289(i);vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);m=m*m;m=m*m;vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-0.5;vec3 ox=floor(x+0.5);vec3 a0=x-ox;m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.0*dot(m,g);}uniform float uProgress;uniform vec2 uMouse;uniform vec2 uResolution;
#define M_PI 3.1415926535897932384626433832795
float circle(vec2 _st,float _radius,float blurriness){vec2 dist=_st;return 1.-smoothstep(_radius-(_radius*blurriness),_radius+(_radius*blurriness),dot(dist,dist)*4.0);}varying vec2 vUv;void main(){vec2 newUv=vUv;vec2 coords=uMouse.xy/uResolution.xy;vec2 circlePos=newUv-coords;float ratio=uResolution.y/uResolution.x;circlePos.y*=ratio;float offx=newUv.x;float offy=newUv.y;float c=circle(circlePos,uProgress*10.*ratio,.3)*3.0;float n=snoise(vec2(offx,offy)*2.5)-1.;float finalMask=smoothstep(0.499,0.5,n+c);vec4 color=mix(vec4(0.0),vec4(1.0),finalMask);if(uProgress==1.0){color=vec4(1.);}gl_FragColor=color;}`,
  Zi = `precision highp float;
#define GLSLIFY 1
varying vec2 vUv;void main(){vUv=uv;vec3 p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`;
class Qi extends we {
  constructor(e) {
    const t = new fe(1, 1, 1, 1),
      s = new Se({
        uniforms: {
          uProgress: { value: 0 },
          uForce: { value: 0 },
          uMouse: { value: new v() },
          uResolution: { value: new v() },
        },
        vertexShader: Zi,
        fragmentShader: Xi,
        transparent: !0,
      });
    super(t, s);
    (this.el = e), (this.mouse1 = new v()), (this.mouse2 = new v());
  }
  async init() {
    super.init(),
      (this.resize = this.resize.bind(this)),
      await R(),
      E.emit("FORCE_RESIZE");
  }
  update(e, t) {
    !o.gl.blob ||
      ((this.mouse1.x = ie(this.mouse1.x, e.x, o.gl.blob.mouse1.lerp)),
      (this.mouse1.y = ie(this.mouse1.y, e.y, o.gl.blob.mouse1.lerp)),
      (this.mouse2.x = ie(this.mouse2.x, this.mouse1.x, o.gl.blob.mouse2.lerp)),
      (this.mouse2.y = ie(this.mouse2.y, this.mouse1.y, o.gl.blob.mouse2.lerp)),
      (this.material.uniforms.uMouse.value = this.mouse2));
  }
  updateSize({ width: e, height: t }) {
    this.camUnit = this.calculateUnitSize(
      o.gl.camera.position.z - this.position.z
    );
    const s = e / o.layout.x,
      i = t / o.layout.y;
    (this.scale.x = this.camUnit.width * s),
      (this.scale.y = this.camUnit.height * i);
  }
  async resize(e, t, s) {
    this.updateSize({ width: e, height: t }),
      this.calculatePosition(e, t, { width: e, height: t }),
      this.material.uniforms.uResolution.value.set(e, t);
  }
}
class Ji {
  constructor(e) {
    (this.el = e),
      (this.camera = new Ze()),
      (this.renderer = new Gt(this.el)),
      (this.scene = new ye()),
      (this.active = !1),
      (this.bg = new Qi()),
      (this.resize = this.resize.bind(this)),
      (this.render = this.render.bind(this)),
      this.scene.add(this.bg),
      this.renderer.render(this.scene, this.camera),
      E.on("GL_RESIZE", this.resize),
      o.raf.add(this.render, "render menu");
  }
  render() {
    this.bg.update(o.layout.mouse, o.gl.time),
      !!this.active && this.renderer.render(this.scene, this.camera);
  }
  resize({ w: e, h: t, dpr: s }) {
    this.bg && this.bg.resize(e, t, s),
      this.renderer.resize(e, t),
      this.camera.resize(e, t),
      this.renderer.render(this.scene, this.camera);
  }
}
const { dom: Ki, flags: bn } = D,
  { qs: en } = A;
class tn {
  constructor() {
    this.init();
  }
  async init() {
    (r.loaded = new Promise((t) => {
      r.resolve = t;
    })),
      await us(),
      await document.fonts.ready,
      (r.app = this),
      (r.router = wi);
    const e = en("[data-router-wrapper]");
    (e.style.visibility = ""),
      h
        .timeline()
        .to(Ki.mask, { autoAlpha: 0, duration: 1, delay: 0.7, ease: "power1" }),
      (r.gl = new Yi("#gl")),
      r.gl.init(),
      (r.menu = new Ji(Re(".js-menu"))),
      "scrollRestoration" in history && (history.scrollRestoration = "manual"),
      u.delegate("click", "a", (t) => {
        r.menu.el.contains(t.target) &&
          t.currentTarget.href === location.href &&
          u.emit("menu:close");
      });
  }
}
new tn();
