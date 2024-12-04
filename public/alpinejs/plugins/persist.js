// To use as a substitution for directly using localstorage
;(() => {
  function d(t) {
    let n = () => {
      let r, a
      try {
        a = localStorage
      } catch (i) {
        console.error(i),
          console.warn(
            'Alpine: $persist is using temporary storage since localStorage is unavailable.',
          )
        let e = new Map()
        a = { getItem: e.get.bind(e), setItem: e.set.bind(e) }
      }
      return t.interceptor(
        (i, e, l, s, f) => {
          let o = r || `_x_${s}`,
            u = g(o, a) ? p(o, a) : i
          return (
            l(u),
            t.effect(() => {
              let c = e()
              m(o, c, a), l(c)
            }),
            u
          )
        },
        i => {
          ;(i.as = e => ((r = e), i)), (i.using = e => ((a = e), i))
        },
      )
    }
    Object.defineProperty(t, '$persist', { get: () => n() }),
      t.magic('persist', n),
      (t.persist = (r, { get: a, set: i }, e = localStorage) => {
        let l = g(r, e) ? p(r, e) : a()
        i(l),
          t.effect(() => {
            let s = a()
            m(r, s, e), i(s)
          })
      })
  }
  function g(t, n) {
    return n.getItem(t) !== null
  }
  function p(t, n) {
    let r = n.getItem(t, n)
    if (r !== void 0) return JSON.parse(r)
  }
  function m(t, n, r) {
    r.setItem(t, JSON.stringify(n))
  }
  document.addEventListener('alpine:init', () => {
    window.Alpine.plugin(d)
  })
})()
