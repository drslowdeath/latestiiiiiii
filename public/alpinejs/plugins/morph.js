;(() => {
  function k(u, l, o) {
    Y()
    let g, h, y, O, D, E, v, T, _, A
    function V(e = {}) {
      let n = a => a.getAttribute('key'),
        d = () => {}
      ;(D = e.updating || d),
        (E = e.updated || d),
        (v = e.removing || d),
        (T = e.removed || d),
        (_ = e.adding || d),
        (A = e.added || d),
        (y = e.key || n),
        (O = e.lookahead || !1)
    }
    function K(e, n) {
      if (W(e, n)) return q(e, n)
      let d = !1
      if (!b(D, e, n, () => (d = !0))) {
        if (
          (e.nodeType === 1 &&
            window.Alpine &&
            (window.Alpine.cloneNode(e, n),
            e._x_teleport && n._x_teleport && K(e._x_teleport, n._x_teleport)),
          X(n))
        ) {
          $(e, n), E(e, n)
          return
        }
        d || G(e, n), E(e, n), L(e, n)
      }
    }
    function W(e, n) {
      return (
        e.nodeType != n.nodeType || e.nodeName != n.nodeName || x(e) != x(n)
      )
    }
    function q(e, n) {
      if (b(v, e)) return
      let d = n.cloneNode(!0)
      b(_, d) || (e.replaceWith(d), T(e), A(d))
    }
    function $(e, n) {
      let d = n.nodeValue
      e.nodeValue !== d && (e.nodeValue = d)
    }
    function G(e, n) {
      if (
        e._x_transitioning ||
        (e._x_isShown && !n._x_isShown) ||
        (!e._x_isShown && n._x_isShown)
      )
        return
      let d = Array.from(e.attributes),
        a = Array.from(n.attributes)
      for (let i = d.length - 1; i >= 0; i--) {
        let t = d[i].name
        n.hasAttribute(t) || e.removeAttribute(t)
      }
      for (let i = a.length - 1; i >= 0; i--) {
        let t = a[i].name,
          m = a[i].value
        e.getAttribute(t) !== m && e.setAttribute(t, m)
      }
    }
    function L(e, n) {
      let d = H(e.children),
        a = {},
        i = I(n),
        t = I(e)
      for (; i; ) {
        Z(i, t)
        let s = x(i),
          p = x(t)
        if (!t)
          if (s && a[s]) {
            let r = a[s]
            e.appendChild(r), (t = r)
          } else {
            if (!b(_, i)) {
              let r = i.cloneNode(!0)
              e.appendChild(r), A(r)
            }
            i = c(n, i)
            continue
          }
        let C = r =>
            r && r.nodeType === 8 && r.textContent === '[if BLOCK]><![endif]',
          S = r =>
            r && r.nodeType === 8 && r.textContent === '[if ENDBLOCK]><![endif]'
        if (C(i) && C(t)) {
          let r = 0,
            N = t
          for (; t; ) {
            let f = c(e, t)
            if (C(f)) r++
            else if (S(f) && r > 0) r--
            else if (S(f) && r === 0) {
              t = f
              break
            }
            t = f
          }
          let R = t
          r = 0
          let j = i
          for (; i; ) {
            let f = c(n, i)
            if (C(f)) r++
            else if (S(f) && r > 0) r--
            else if (S(f) && r === 0) {
              i = f
              break
            }
            i = f
          }
          let z = i,
            J = new w(N, R),
            Q = new w(j, z)
          L(J, Q)
          continue
        }
        if (t.nodeType === 1 && O && !t.isEqualNode(i)) {
          let r = c(n, i),
            N = !1
          for (; !N && r; )
            r.nodeType === 1 &&
              t.isEqualNode(r) &&
              ((N = !0), (t = B(e, i, t)), (p = x(t))),
              (r = c(n, r))
        }
        if (s !== p) {
          if (!s && p) {
            ;(a[p] = t),
              (t = B(e, i, t)),
              a[p].remove(),
              (t = c(e, t)),
              (i = c(n, i))
            continue
          }
          if ((s && !p && d[s] && (t.replaceWith(d[s]), (t = d[s])), s && p)) {
            let r = d[s]
            if (r) (a[p] = t), t.replaceWith(r), (t = r)
            else {
              ;(a[p] = t),
                (t = B(e, i, t)),
                a[p].remove(),
                (t = c(e, t)),
                (i = c(n, i))
              continue
            }
          }
        }
        let P = t && c(e, t)
        K(t, i), (i = i && c(n, i)), (t = P)
      }
      let m = []
      for (; t; ) b(v, t) || m.push(t), (t = c(e, t))
      for (; m.length; ) {
        let s = m.shift()
        s.remove(), T(s)
      }
    }
    function x(e) {
      return e && e.nodeType === 1 && y(e)
    }
    function H(e) {
      let n = {}
      for (let d of e) {
        let a = x(d)
        a && (n[a] = d)
      }
      return n
    }
    function B(e, n, d) {
      if (!b(_, n)) {
        let a = n.cloneNode(!0)
        return e.insertBefore(a, d), A(a), a
      }
      return n
    }
    return (
      V(o),
      (g = u),
      (h = typeof l == 'string' ? U(l) : l),
      window.Alpine &&
        window.Alpine.closestDataStack &&
        !u._x_dataStack &&
        ((h._x_dataStack = window.Alpine.closestDataStack(u)),
        h._x_dataStack && window.Alpine.cloneNode(u, h)),
      K(u, h),
      (g = void 0),
      (h = void 0),
      u
    )
  }
  k.step = () => {}
  k.log = () => {}
  function b(u, ...l) {
    let o = !1
    return u(...l, () => (o = !0)), o
  }
  var F = !1
  function U(u) {
    let l = document.createElement('template')
    return (l.innerHTML = u), l.content.firstElementChild
  }
  function X(u) {
    return u.nodeType === 3 || u.nodeType === 8
  }
  var w = class {
    constructor(l, o) {
      ;(this.startComment = l), (this.endComment = o)
    }
    get children() {
      let l = [],
        o = this.startComment.nextSibling
      for (; o && o !== this.endComment; ) l.push(o), (o = o.nextSibling)
      return l
    }
    appendChild(l) {
      this.endComment.before(l)
    }
    get firstChild() {
      let l = this.startComment.nextSibling
      if (l !== this.endComment) return l
    }
    nextNode(l) {
      let o = l.nextSibling
      if (o !== this.endComment) return o
    }
    insertBefore(l, o) {
      return o.before(l), l
    }
  }
  function I(u) {
    return u.firstChild
  }
  function c(u, l) {
    let o
    return u instanceof w ? (o = u.nextNode(l)) : (o = l.nextSibling), o
  }
  function Y() {
    if (F) return
    F = !0
    let u = Element.prototype.setAttribute,
      l = document.createElement('div')
    Element.prototype.setAttribute = function (g, h) {
      if (!g.includes('@')) return u.call(this, g, h)
      l.innerHTML = `<span ${g}="${h}"></span>`
      let y = l.firstElementChild.getAttributeNode(g)
      l.firstElementChild.removeAttributeNode(y), this.setAttributeNode(y)
    }
  }
  function Z(u, l) {
    let o = l && l._x_bindings && l._x_bindings.id
    o && (u.setAttribute('id', o), (u.id = o))
  }
  function M(u) {
    u.morph = k
  }
  document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(M)
  })
})()
