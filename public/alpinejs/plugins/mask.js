;(() => {
  function b(n) {
    n.directive('mask', (e, { value: t, expression: u }, { effect: f, evaluateLater: a, cleanup: r }) => {
      let l = () => u,
        o = ''
      queueMicrotask(() => {
        if (['function', 'dynamic'].includes(t)) {
          let i = a(u)
          f(() => {
            ;(l = d => {
              let g
              return (
                n.dontAutoEvaluateFunctions(() => {
                  i(
                    c => {
                      g = typeof c == 'function' ? c(d) : c
                    },
                    { scope: { $input: d, $money: w.bind({ el: e }) } },
                  )
                }),
                g
              )
            }),
              s(e, !1)
          })
        } else s(e, !1)
        if (e._x_model) {
          if (e._x_model.get() === e.value || (e._x_model.get() === null && e.value === '')) return
          e._x_model.set(e.value)
        }
      })
      let p = new AbortController()
      r(() => {
        p.abort()
      }),
        e.addEventListener('input', () => s(e), { signal: p.signal, capture: !0 }),
        e.addEventListener('blur', () => s(e, !1), { signal: p.signal })
      function s(i, d = !0) {
        let g = i.value,
          c = l(g)
        if (!c || c === 'false') return !1
        if (o.length - i.value.length === 1) return (o = i.value)
        let v = () => {
          o = i.value = h(g, c)
        }
        d
          ? k(i, c, () => {
              v()
            })
          : v()
      }
      function h(i, d) {
        if (i === '') return ''
        let g = m(d, i)
        return x(d, g)
      }
    }).before('model')
  }
  function k(n, e, t) {
    let u = n.selectionStart,
      f = n.value
    t()
    let a = f.slice(0, u),
      r = x(e, m(e, a)).length
    n.setSelectionRange(r, r)
  }
  function m(n, e) {
    let t = e,
      u = '',
      f = { 9: /[0-9]/, a: /[a-zA-Z]/, '*': /[a-zA-Z0-9]/ },
      a = ''
    for (let r = 0; r < n.length; r++) {
      if (['9', 'a', '*'].includes(n[r])) {
        a += n[r]
        continue
      }
      for (let l = 0; l < t.length; l++)
        if (t[l] === n[r]) {
          t = t.slice(0, l) + t.slice(l + 1)
          break
        }
    }
    for (let r = 0; r < a.length; r++) {
      let l = !1
      for (let o = 0; o < t.length; o++)
        if (f[a[r]].test(t[o])) {
          ;(u += t[o]), (t = t.slice(0, o) + t.slice(o + 1)), (l = !0)
          break
        }
      if (!l) break
    }
    return u
  }
  function x(n, e) {
    let t = Array.from(e),
      u = ''
    for (let f = 0; f < n.length; f++) {
      if (!['9', 'a', '*'].includes(n[f])) {
        u += n[f]
        continue
      }
      if (t.length === 0) break
      u += t.shift()
    }
    return u
  }
  function w(n, e = '.', t, u = 2) {
    if (n === '-') return '-'
    if (/^\D+$/.test(n)) return '9'
    t == null && (t = e === ',' ? '.' : ',')
    let f = (o, p) => {
        let s = '',
          h = 0
        for (let i = o.length - 1; i >= 0; i--)
          o[i] !== p && (h === 3 ? ((s = o[i] + p + s), (h = 0)) : (s = o[i] + s), h++)
        return s
      },
      a = n.startsWith('-') ? '-' : '',
      r = n.replaceAll(new RegExp(`[^0-9\\${e}]`, 'g'), ''),
      l = Array.from({ length: r.split(e)[0].length })
        .fill('9')
        .join('')
    return (
      (l = `${a}${f(l, t)}`),
      u > 0 && n.includes(e) && (l += `${e}` + '9'.repeat(u)),
      queueMicrotask(() => {
        this.el.value.endsWith(e) ||
          (this.el.value[this.el.selectionStart - 1] === e &&
            this.el.setSelectionRange(this.el.selectionStart - 1, this.el.selectionStart - 1))
      }),
      l
    )
  }
  document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(b)
  })
})()