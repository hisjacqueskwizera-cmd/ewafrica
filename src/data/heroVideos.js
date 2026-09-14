// Ordered numerically (filenames use a "(n)" suffix, so a plain sort would
// put "(10)" right after "(1)").
const FILENAMES = [
  'Hero_section (1).mp4',
  'Hero_section (2).mp4',
  'Hero_section (3).mp4',
  'Hero_section (4).mp4',
  'Hero_section (5).mp4',
  'Hero_section (6).mp4',
  'Hero_section (7).mp4',
  'Hero_section (8).mp4',
  'Hero_section (9).mp4',
  'Hero_section (10).mp4',
]

// Per-clip watch limit in seconds. Every clip plays in full except this one,
// which cuts to the next clip after 14s regardless of its real length.
const WATCH_CAP_SECONDS = {
  'Hero_section (1).mp4': 14,
}

export const HERO_VIDEOS = FILENAMES.map((name) => ({
  src: encodeURI(`/Videos/${name}`),
  capSeconds: WATCH_CAP_SECONDS[name] ?? null,
}))
