import { Loader2, Send, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { CONTACT_INFO } from '../data/siteContent.js'
import { WhatsAppIcon } from './social-icons.jsx'

/**
 * A floating "chat with us on WhatsApp" widget, pinned to the bottom-right
 * of every page (rendered once in App.jsx, alongside Header/Footer) rather
 * than on a single page.
 *
 * Idles as just the "Chat now" button — click it (or focus it, or tab
 * into it) to expand the same pill out into a message field, animated.
 * It's purely click-driven: no scroll listener, no idle timer, nothing
 * collapses it back on its own — it stays exactly as the visitor left it
 * until they close it themselves (the × button, Escape, or a click
 * outside).
 *
 * There's no live chat/inbox behind this: submitting opens the visitor's
 * own WhatsApp with CONTACT_INFO's number and their typed message
 * pre-filled (the same wa.me deep link CONTACT_INFO.whatsappHref uses
 * elsewhere, just with the visitor's own text instead of the fixed
 * default message) — the reply still comes from a real person on the
 * other end, same as every other WhatsApp entry point on the site.
 */
export function WhatsAppChatBar() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  // Autofocus the field once it's actually visible, rather than the instant
  // `open` flips — the surrounding pill is still mid-expand at that point.
  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => inputRef.current?.focus(), 200)
    return () => window.clearTimeout(timer)
  }, [open])

  // A click outside, or Escape, closes it the same way the × does — the
  // usual conventions for a popover, so it doesn't have to be dismissed
  // the exact same way it was opened.
  useEffect(() => {
    if (!open) return
    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false)
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!open) {
      setOpen(true)
      return
    }
    const trimmed = message.trim()
    if (!trimmed || sending) return

    setSending(true)
    // Reuses the same wa.me number as CONTACT_INFO.whatsappHref, just with
    // the visitor's own typed text in place of that link's fixed message.
    const base = CONTACT_INFO.whatsappHref.split('?')[0]
    window.open(`${base}?text=${encodeURIComponent(trimmed)}`, '_blank', 'noopener,noreferrer')

    // A brief pending state so the click reads as "sent" rather than the
    // field just silently clearing underneath the visitor's cursor.
    window.setTimeout(() => {
      setSending(false)
      setMessage('')
      setOpen(false)
    }, 600)
  }

  return (
    <div ref={containerRef} className="fixed bottom-5 right-4 z-[90] sm:right-6">
      <form
        onSubmit={handleSubmit}
        className={`flex max-w-[calc(100vw-2rem)] items-center rounded-full border border-border/60 bg-card/60 p-1.5 shadow-[0_16px_40px_-18px_rgba(21,25,33,0.45)] backdrop-blur-md transition-[width,gap,padding] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'w-[360px] gap-1.5 pl-1.5' : 'w-[168px] gap-0 pl-1.5'
        }`}
      >
        <div
          className={`flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden transition-[max-width,opacity] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            open ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            tabIndex={open ? 0 : -1}
            className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-sand hover:text-primary"
          >
            <X className="size-4" aria-hidden="true" />
          </button>

          <WhatsAppIcon className="size-5 shrink-0 text-[#25D366]" aria-hidden="true" />

          <label htmlFor="wa-chat-input" className="sr-only">
            Type your question and we will answer on WhatsApp
          </label>
          <input
            ref={inputRef}
            id="wa-chat-input"
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            tabIndex={open ? 0 : -1}
            enterKeyHint="send"
            autoComplete="off"
            placeholder="Here to help with your Africa travel plans."
            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-primary placeholder:text-muted-foreground/70 focus:outline-none"
          />
        </div>

        <button
          type={open ? 'submit' : 'button'}
          onClick={() => {
            if (!open) setOpen(true)
          }}
          disabled={open && (sending || !message.trim())}
          aria-label={open ? 'Send this message on WhatsApp' : 'Open WhatsApp chat'}
          className="flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-copper px-4 text-[13.5px] font-semibold text-copper-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
        >
          {open ? (
            sending ? (
              <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden="true" />
            ) : (
              <>
                <span>Chat now</span>
                <Send className="size-4 shrink-0" aria-hidden="true" />
              </>
            )
          ) : (
            <>
              <WhatsAppIcon className="size-4 shrink-0" aria-hidden="true" />
              <span>Chat now</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}
