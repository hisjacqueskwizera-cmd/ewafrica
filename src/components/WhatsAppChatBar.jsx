import { Loader2, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { CONTACT_INFO } from '../data/siteContent.js'
import { WhatsAppIcon } from './social-icons.jsx'

// How long to wait, after the last scroll event, before expanding back out.
const EXPAND_DELAY = 5000

/**
 * A floating "ask us on WhatsApp" bar, pinned to the bottom of every page
 * (rendered once in App.jsx, alongside Header/Footer) rather than on a
 * single page — the whole point is that it's always there to hand off a
 * question to WhatsApp, wherever a visitor happens to be on the site.
 *
 * There's no live chat/inbox behind this: submitting opens the visitor's
 * own WhatsApp with CONTACT_INFO's number and their typed message
 * pre-filled (the same wa.me deep link CONTACT_INFO.whatsappHref uses
 * elsewhere, just with the visitor's own text instead of the fixed
 * default message) — the reply still comes from a real person on the
 * other end, same as every other WhatsApp entry point on the site.
 *
 * Collapses down to just the "Chat now" button while the page is being
 * scrolled — so it doesn't sit in the way of what's being read — and
 * expands back out once scrolling has been still for EXPAND_DELAY, both
 * animated. Every scroll event pushes that expand back out, so it stays
 * collapsed for as long as scrolling continues and only reappears once
 * things settle. Skipped entirely under prefers-reduced-motion, and never
 * collapses while the input itself is focused — a visitor mid-question
 * shouldn't have the field vanish from under their cursor because the page
 * happened to scroll.
 */
export function WhatsAppChatBar() {
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const focusedRef = useRef(false)
  const expandTimerRef = useRef(null)

  useEffect(() => {
    if (reducedMotion) return

    const handleScroll = () => {
      if (focusedRef.current) return
      setCollapsed(true)
      window.clearTimeout(expandTimerRef.current)
      expandTimerRef.current = window.setTimeout(() => setCollapsed(false), EXPAND_DELAY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.clearTimeout(expandTimerRef.current)
    }
  }, [reducedMotion])

  const handleSubmit = (event) => {
    event.preventDefault()
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
    }, 600)
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[90] flex justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className={`pointer-events-auto flex w-full items-center rounded-full border border-border bg-card p-1.5 shadow-[0_16px_40px_-18px_rgba(21,25,33,0.45)] transition-[gap,padding,max-width] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          collapsed ? 'max-w-[150px] gap-0 pl-1.5' : 'max-w-[560px] gap-2 pl-4'
        }`}
      >
        <div
          className={`flex min-w-0 flex-1 items-center gap-2 overflow-hidden transition-[max-width,opacity] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            collapsed ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'
          }`}
        >
          <WhatsAppIcon className="size-5 shrink-0 text-[#25D366]" aria-hidden="true" />

          <label htmlFor="wa-chat-input" className="sr-only">
            Type your question and we will answer on WhatsApp
          </label>
          <input
            id="wa-chat-input"
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onFocus={() => {
              focusedRef.current = true
              window.clearTimeout(expandTimerRef.current)
              setCollapsed(false)
            }}
            onBlur={() => {
              focusedRef.current = false
            }}
            tabIndex={collapsed ? -1 : 0}
            enterKeyHint="send"
            autoComplete="off"
            placeholder="Ask us anything, we reply on WhatsApp"
            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-primary placeholder:text-muted-foreground/70 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={sending || !message.trim()}
          aria-label="Send this message on WhatsApp"
          className="flex h-10 shrink-0 items-center gap-2 rounded-full bg-copper px-4 text-[13.5px] font-semibold text-copper-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
        >
          {sending ? (
            <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden="true" />
          ) : (
            <>
              <span className="hidden sm:inline">Chat now</span>
              <Send className="size-4 shrink-0" aria-hidden="true" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
