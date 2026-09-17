import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * A modal panel that slides up from the bottom of the viewport (mobile
 * "action sheet" style) rather than the more common fade-and-scale center
 * dialog — used for supplementary reading (e.g. the Ghana immigration
 * pathway explainers) where a full page or a /#contact detour would be
 * overkill. Mounted via a portal so it always sits above the fixed header
 * (z-[100] — see Header.jsx) regardless of where it's rendered from.
 *
 * Stays mounted briefly after `open` goes false so the slide-down/fade-out
 * transition can play before it's removed from the DOM.
 */
export function BottomSheetModal({ open, onClose, title, eyebrow, children }) {
  // `rendered` intentionally lags `open` by one tick on close (kept true
  // for 350ms so the slide-down/fade-out transition can play before the
  // panel leaves the DOM) — that lag is exactly what an effect is for
  // here: synchronizing local state with the real-world duration of a CSS
  // transition, an external timing concern React itself doesn't track.
  const [rendered, setRendered] = useState(open)
  const [visible, setVisible] = useState(false)
  const closeButtonRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    if (open) {
      setRendered(true)
      // Mount off-screen first, then flip to visible on the next frame so
      // the transform/opacity transition actually animates in.
      const raf = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(raf)
    }
    setVisible(false)
    const timeout = setTimeout(() => setRendered(false), 350)
    return () => clearTimeout(timeout)
  }, [open])

  useEffect(() => {
    if (!rendered) return undefined
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [rendered])

  useEffect(() => {
    if (!open) return undefined
    closeButtonRef.current?.focus()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!rendered) return null

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-6">
      <div
        className={`absolute inset-0 bg-cocoa/60 backdrop-blur-[2px] transition-opacity duration-300 ease-out ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bottom-sheet-title"
        className={`relative flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-3xl bg-card shadow-lift transition-[transform,opacity] duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)] sm:max-w-2xl sm:rounded-3xl ${
          visible
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-full scale-100 opacity-100 sm:translate-y-6 sm:scale-95 sm:opacity-0'
        }`}
      >
        <div
          className={`flex items-start justify-between gap-4 border-b border-border px-6 py-5 transition-[opacity,transform] duration-300 ease-out sm:px-8 ${
            visible ? 'translate-y-0 opacity-100 delay-100' : 'translate-y-2 opacity-0'
          }`}
        >
          <div>
            {eyebrow && (
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-copper">{eyebrow}</p>
            )}
            <h2 id="bottom-sheet-title" className="mt-1 text-xl font-bold text-primary sm:text-2xl">
              {title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:border-copper hover:text-copper active:scale-90"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div
          className={`overflow-y-auto px-6 py-6 transition-[opacity,transform] duration-300 ease-out sm:px-8 ${
            visible ? 'translate-y-0 opacity-100 delay-150' : 'translate-y-3 opacity-0'
          }`}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
  )
}
