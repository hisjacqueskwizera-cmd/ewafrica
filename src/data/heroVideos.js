// Zero-padded so the play order matches a plain sort of the filenames.
const FILENAMES = [
  'hero-01.mp4',
  'hero-02.mp4',
  'hero-03.mp4',
  'hero-04.mp4',
  'hero-05.mp4',
  'hero-06.mp4',
  'hero-07.mp4',
  'hero-08.mp4',
  'hero-09.mp4',
  'hero-10.mp4',
]

// Per-clip watch limit in seconds. Every clip plays in full except this one,
// which cuts to the next clip after 14s regardless of its real length.
const WATCH_CAP_SECONDS = {
  'hero-01.mp4': 14,
}

export const HERO_VIDEOS = FILENAMES.map((name) => ({
  src: `/videos/hero/${name}`,
  capSeconds: WATCH_CAP_SECONDS[name] ?? null,
}))
