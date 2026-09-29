import { useLayoutEffect, useSyncExternalStore } from 'react'

// Whether a full-screen hero is on the page, so the fixed header knows to
// sit transparent (over its dark gradient) until the visitor scrolls — every
// hero declares itself with useFullBleedHero() instead of the header keeping
// a hand-maintained list of routes. Registered in a layout effect, so the
// header has switched before the first paint and never flashes solid.
let count = 0
const listeners = new Set()
const emit = () => listeners.forEach((listener) => listener())

export function useFullBleedHero() {
  useLayoutEffect(() => {
    count += 1
    emit()
    return () => {
      count -= 1
      emit()
    }
  }, [])
}

const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useHasFullBleedHero() {
  return useSyncExternalStore(subscribe, () => count > 0)
}
