import { RevealText } from './RevealText.jsx'
import { SectionMark } from './SectionMark.jsx'

export function SectionTitle({ eyebrow, title }) {
  return (
    <div>
      <SectionMark />
      <span className="section-eyebrow">{eyebrow}</span>
      <RevealText
        as="h2"
        text={title}
        className="mt-2 text-3xl font-semibold text-primary sm:text-4xl lg:text-[2.75rem]"
      />
    </div>
  )
}

export function CenteredSectionTitle({ eyebrow, title }) {
  return (
    <div className="mx-auto max-w-xl text-center">
      <SectionMark className="mx-auto" />
      <span className="section-eyebrow">{eyebrow}</span>
      <RevealText
        as="h2"
        text={title}
        className="mt-2 text-3xl font-semibold text-primary sm:text-4xl lg:text-[2.75rem]"
      />
    </div>
  )
}
