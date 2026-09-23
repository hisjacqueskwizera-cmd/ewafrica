// Small hand-drawn brand marks for the social row. Not part of lucide-react
// (which intentionally omits brand logos), so kept as simple inline SVGs.

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({ children, ...props }) {
  return (
    <svg aria-hidden="true" focusable="false" {...base} {...props}>
      {children}
    </svg>
  )
}

export function FacebookIcon(props) {
  return (
    <Svg {...props}>
      <path d="M14 21v-7.5h2.5l.5-3H14V8.3c0-.9.3-1.6 1.6-1.6H17V4.2A19 19 0 0 0 14.6 4c-2.4 0-4 1.5-4 4.1v2.4H8v3h2.6V21Z" />
    </Svg>
  )
}

export function YoutubeIcon(props) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="3" />
      <path d="m10.5 9.5 5 2.5-5 2.5Z" fill="currentColor" stroke="none" />
    </Svg>
  )
}

export function TiktokIcon(props) {
  return (
    <Svg {...props}>
      <path d="M13 3v11.2a2.9 2.9 0 1 1-2.2-2.8" />
      <path d="M13 3c.3 2.2 1.9 3.8 4 4.1" />
    </Svg>
  )
}

export function GoogleIcon(props) {
  // The standard four-color "G" mark, per Google's own sign-in button
  // guidelines — unlike the payment-network badges in the Travel Planner
  // flow (see the note on BRAND_COLORS in pages/travel-planner/Payment.jsx),
  // Google explicitly provides this mark for exactly this use (a "Continue
  // with Google" button), including on sites with no live OAuth wired up
  // yet — so real colors, not a generic placeholder.
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" {...props}>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.7 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.5-2.1 14.3-5.6l-6.6-5.6C29.6 34.7 26.9 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.3 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.4l6.6 5.6C41.5 36 44 30.5 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  )
}

export function WhatsAppIcon(props) {
  // The actual WhatsApp brand mark (ring + tail + handset) as one path —
  // its winding direction does the ring/handset cutout work on its own,
  // unlike a hand-approximated version.
  return (
    <Svg viewBox="0 0 448 512" fill="currentColor" stroke="none" {...props}>
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </Svg>
  )
}
