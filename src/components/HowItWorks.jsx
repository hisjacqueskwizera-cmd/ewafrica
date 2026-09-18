import { ArrowRight, MessageSquareText, Search, Send } from 'lucide-react'
import { HOW_IT_WORKS } from '../data/siteContent.js'
import { useScrollProgress } from '../hooks/useScrollProgress.js'
import { HashLink } from './HashLink.jsx'
import { JourneyCurve } from './JourneyCurve.jsx'
import { Reveal } from './Reveal.jsx'
import { RevealText } from './RevealText.jsx'
import { SectionMark } from './SectionMark.jsx'

// A straight rule whose length is driven directly by a 0→1 progress value
// rather than a fixed-duration transition — scrub it with scroll and it
// grows and shrinks in lockstep, in both directions, instead of firing
// once and staying put.
function GrowLine({ progress }) {
  return (
    <span
      className="block h-[1.5px] w-full origin-left rounded-full bg-copper/60 shadow-[0_0_0_1px_rgba(208,121,54,0.15)]"
      style={{
        transform: `scaleX(${progress})`,
        transformOrigin: 'left center',
      }}
      aria-hidden="true"
    />
  )
}

const STEP_ICONS = {
  message: MessageSquareText,
  search: Search,
  handshake: Send,
}

export function HowItWorks() {
  const [rowRef, progress] = useScrollProgress()
  // One continuous sequence, apportioned across the row: the corner curve
  // draws first, then the Tell Us→We Research rule, then the We Research→
  // You Connect rule — so scrolling further genuinely extends the line
  // from the second step to the third, rather than everything appearing
  // at once. Scrolling back up retreats it the same way, since it's a
  // direct function of scroll position, not a one-shot transition.
  const curveProgress = Math.min(1, progress / 0.3)
  const segmentProgress = Math.min(1, Math.max(0, (progress - 0.14) / 0.32))

  return (
    <div className="relative overflow-hidden pt-16 lg:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-46rem] top-[64%] hidden -translate-y-1/2 opacity-50 md:block md:right-[-42rem] md:top-[62%] lg:right-[-36rem] lg:top-[64%]"
        style={{
          backgroundImage: "url('/Pictures/HowWeGuideYourJourney/Map_Of_Africa.PNG')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          width: '110rem',
          height: '68rem',
        }}
      />
      <SectionMark />
      <div className="relative z-10 max-w-lg text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl">
        <RevealText as="h2" text="How We Guide" className="text-primary" />
        <RevealText
          as="h2"
          text="Your Journey"
          delay={200}
          className="italic font-medium text-copper"
        />
      </div>

      <p className="relative z-10 mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        From your first question to your next chapter, we provide independent guidance, local
        insight, and practical support across Africa.
      </p>

      {/* Each mini-heading is followed, in the same grid cell, by a
          straight rule that grows toward the next column — the rule and
          its cell share width with the paragraph grid below, so the two
          rows always line up. The whole sequence is scrubbed to how far
          this row has scrolled through the viewport: scroll down and you
          watch it draw from Tell Us through We Research and on to You
          Connect; scroll back up and it retreats the same way. */}
      <div ref={rowRef} className="relative z-10 mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
        <JourneyCurve
          progress={curveProgress}
          className="absolute -left-3 -top-14 hidden h-24 w-20 text-copper/40 sm:block lg:-top-16 lg:h-28 lg:w-24"
        />

        {HOW_IT_WORKS.map((step, index) => {
          const Icon = STEP_ICONS[step.icon] || MessageSquareText

          return (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex justify-center">
                <div className="relative z-10 grid size-16 place-items-center rounded-full border border-copper/60 bg-transparent text-copper shadow-sm">
                  <Icon className="size-7" strokeWidth={1.8} aria-hidden="true" />
                </div>
              </div>

              <div className="flex w-full flex-col items-center justify-center">
                <h3 className="whitespace-nowrap text-2xl font-semibold text-primary sm:text-[28px]">
                  {step.title}
                </h3>
              </div>
              <Reveal delay={index * 150} once={false}>
                <p className="mt-4 max-w-70 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {step.description}
                </p>
              </Reveal>
            </div>
          )
        })}
      </div>

      <Reveal
        delay={HOW_IT_WORKS.length * 150}
        once={false}
        className="mt-12 flex justify-start sm:justify-end"
      >
        <HashLink to="/#contact" className="btn-outline-dark uppercase tracking-[0.08em]">
          Begin Your Journey
          <ArrowRight className="size-4" aria-hidden="true" />
        </HashLink>
      </Reveal>
    </div>
  )
}
