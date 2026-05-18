/** Synced with `src/assets/motion_lines.svg` */
export const MOTION_LINE_VIEWBOX = { width: 1354, height: 527 } as const;

/** Seconds for one full lap along `MOTION_LINE_PATH`. */
export const MOTION_DOT_DURATION = 18;

/** Comet tail: SMIL ghost segments (count + arc-length along path). */
export const MOTION_DOT_TRAIL_COUNT = 32;
export const MOTION_DOT_TRAIL_LENGTH = 0.024;

/**
 * Arc-length offsets (0–1) along `MOTION_LINE_PATH` for dot start positions.
 * Measured at the horizontal bridge midpoints between frames.
 */
export const MOTION_DOT_OFFSET_TOP = 0.9515;
export const MOTION_DOT_OFFSET_BOTTOM = 0.4515;

/** Bridge midpoints — static fallback when motion is reduced. */
export const MOTION_DOT_POSITIONS = {
  top: { cx: 676.4, cy: 241.5 },
  bottom: { cx: 676.6, cy: 284.5 },
} as const;

/** SMIL `keyPoints` / `keyTimes` for a full clockwise lap from `offset` (0–1). */
export function motionDotKeyPoints(offset: number) {
  return `${offset};1;0;${offset}`;
}

export function motionDotKeyTimes(offset: number) {
  const wrap = Number((1 - offset).toFixed(4));
  return `0;${wrap};${wrap};1`;
}

/** Path position for a trail segment trailing `headOffset` by `trailIndex`. */
export function motionTrailOffset(headOffset: number, trailIndex: number) {
  const step =
    ((trailIndex + 1) / MOTION_DOT_TRAIL_COUNT) * MOTION_DOT_TRAIL_LENGTH;
  const offset = headOffset - step;
  return ((offset % 1) + 1) % 1;
}

/** Brightness scale for trail segment `trailIndex` (0 = closest to head). */
export function motionTrailFade(trailIndex: number) {
  const t = 1 - (trailIndex + 1) / MOTION_DOT_TRAIL_COUNT;
  return 0.58 + 0.42 * t;
}

/** Single continuous path: both frames + upper & lower connectors (closed with Z). */
export const MOTION_LINE_PATH =
  "M463.054 221.094V13.5194C463.054 6.57448 457.39 0.944531 450.402 0.944531H13.1627C6.1748 0.944531 0.51001 6.5745 0.51001 13.5194V512.935C0.51001 519.88 6.1748 525.51 13.1627 525.51H450.402C457.39 525.51 463.054 519.88 463.054 512.935V304.926C463.054 293.641 472.143 284.492 483.499 284.492H869.451C880.806 284.492 889.966 293.641 889.966 304.926V512.501C889.966 519.445 895.63 525.075 902.618 525.075H1339.86C1346.85 525.075 1352.51 519.445 1352.51 512.501V13.0849C1352.51 6.13996 1346.85 0.51001 1339.86 0.51001H902.618C895.63 0.51001 889.966 6.13996 889.966 13.0849V221.077C889.966 232.372 880.753 241.528 869.388 241.528H484.026C472.379 241.528 463.054 232.669 463.054 221.094Z";

/** Image slots — inside the rounded frames (viewBox units) */
export const MOTION_FRAMES = {
  before: {
    x: 0.51,
    y: 0.94,
    width: 462.54,
    height: 524.57,
  },
  after: {
    x: 889.966,
    y: 0.51,
    width: 462.55,
    height: 524.57,
  },
} as const;

/** Upper bridge: right → left (segment of MOTION_LINE_PATH before close). */
export const MOTION_DOT_PATH_UPPER =
  "M889.966 221.077C889.966 232.372 880.753 241.528 869.388 241.528H484.026C472.379 241.528 463.054 232.669 463.054 221.094";

/** Lower bridge: left → right (segment after left frame inner edge). */
export const MOTION_DOT_PATH_LOWER =
  "M463.054 304.926C463.054 293.641 472.143 284.492 483.499 284.492H869.451C880.806 284.492 889.966 293.641 889.966 304.926";
