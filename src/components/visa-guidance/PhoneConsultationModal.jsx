import { CheckCircle2, Phone, X } from 'lucide-react'
import { useEffect } from 'react'

export function PhoneConsultationModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-card p-6 shadow-2xl border border-border sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-cream text-primary hover:bg-sand/70 transition-colors"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-full bg-cocoa text-primary-foreground">
            <Phone className="size-6" aria-hidden="true" />
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-copper">
              Personalized Support
            </span>
            <h2 className="text-xl font-bold text-primary">
              Optional 20-Minute Phone Consultation
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Before submitting your visa application, you can discuss your questions directly with our knowledgeable team. A direct conversation helps ensure all details of your itinerary and documentation align with official requirements.
        </p>

        <div className="mt-6 space-y-3 rounded-2xl bg-cream p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
            What We Cover During the Call:
          </h3>
          <ul className="space-y-2 text-sm text-primary">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-forest" />
              <span>Review specific visa types, requirements, and required documents.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-forest" />
              <span>Discuss entry and transit points (air, land borders, overland connections).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-forest" />
              <span>Address unusual circumstances, previous refusals, or dual nationalities.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="size-4 mt-0.5 shrink-0 text-forest" />
              <span>Answer direct questions about timing, applications, and official fees.</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 rounded-xl border border-copper/30 bg-copper/5 p-4 text-xs leading-relaxed text-muted-foreground">
          <strong className="text-primary block font-semibold mb-1">How scheduling works:</strong>
          Once your Personal Visa Guidance request is submitted, you will receive confirmation details and an invitation link to pick a convenient date and time on our calendar.
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-copper px-6 py-2.5 text-sm font-semibold text-copper-foreground hover:bg-copper/90 transition-colors"
          >
            Got It, Thanks
          </button>
        </div>
      </div>
    </div>
  )
}
