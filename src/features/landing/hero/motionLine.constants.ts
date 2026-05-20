/** Synced with `src/assets/motion_lines.svg` */
export const MOTION_LINE_VIEWBOX = { width: 1354, height: 527 } as const;

/** Seconds for one full lap along `MOTION_LINE_PATH`. */
export const MOTION_DOT_DURATION = 12;

/** Comet tail: SMIL ghost segments (count + arc-length along path). */
export const MOTION_DOT_TRAIL_COUNT = 140;
export const MOTION_DOT_TRAIL_LENGTH = 0.03;

/** Matches `.framePath` `stroke-width` in `HeroMotionFrame.module.scss`. */
export const MOTION_LINE_STROKE_WIDTH = 1.02;

/** Square lead dot on the connector path (viewBox units; was 7 in Figma export). */
export const MOTION_DOT_HEAD_SIZE = 4;

/** Base scale for trail body thickness constant. */
export const MOTION_DOT_TRAIL_BODY_RADIUS = 5;

/** Thick solid trail at the head (viewBox units). */
export const MOTION_DOT_TRAIL_HEAD_RADIUS =
  MOTION_DOT_TRAIL_BODY_RADIUS * (0.1 + 0.22 * 0.99);

/** Thin tail end — matches connector stroke width. */
export const MOTION_DOT_TRAIL_END_RADIUS = MOTION_LINE_STROKE_WIDTH / 2;

/** Fraction of tail length (0→1) that stays fully solid at the head. */
export const MOTION_DOT_TRAIL_SOLID_PORTION = 0.22;

/** Progress along tail (0→1) where blur begins on the fading end. */
export const MOTION_DOT_TRAIL_BLUR_START = 0.48;

/** Opacity at the tail end. */
export const MOTION_DOT_TRAIL_END_OPACITY = 0.14;

/** Blur on `#hero-trail-blur` (tail end only). */
export const MOTION_DOT_TRAIL_BLUR = 0.5;

/**
 * Arc-length offsets (0–1) along `MOTION_LINE_PATH` for dot start positions.
 * Upper bridge → after-frame corner; lower bridge → before-frame corner.
 */
export const MOTION_DOT_OFFSET_TOP = 0.9029;
export const MOTION_DOT_OFFSET_BOTTOM = 0.4029;

/** Bridge corners — static fallback when motion is reduced. */
export const MOTION_DOT_POSITIONS = {
  top: { cx: 889.966, cy: 221.077 },
  bottom: { cx: 463.054, cy: 304.926 },
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
  // `trailIndex` (not +1) so the first segment sits on the head — no path gap.
  const step = (trailIndex / MOTION_DOT_TRAIL_COUNT) * MOTION_DOT_TRAIL_LENGTH;
  const offset = headOffset - step;
  return ((offset % 1) + 1) % 1;
}

function smoothstep(amount: number) {
  const t = Math.min(1, Math.max(0, amount));
  return t * t * (3 - 2 * t);
}

/** 0 = against the head, 1 = tail end (away from the square). */
export function motionTrailProgress(trailIndex: number) {
  const last = Math.max(MOTION_DOT_TRAIL_COUNT - 1, 1);
  return trailIndex / last;
}

export function motionTrailUsesBlur(trailIndex: number) {
  return motionTrailProgress(trailIndex) > MOTION_DOT_TRAIL_BLUR_START;
}

export function motionTrailCircleRadius(trailIndex: number) {
  const t = smoothstep(motionTrailProgress(trailIndex));
  return (
    MOTION_DOT_TRAIL_HEAD_RADIUS +
    (MOTION_DOT_TRAIL_END_RADIUS - MOTION_DOT_TRAIL_HEAD_RADIUS) * t
  );
}

export function motionTrailOpacity(trailIndex: number) {
  const progress = motionTrailProgress(trailIndex);

  if (progress <= MOTION_DOT_TRAIL_SOLID_PORTION) {
    return 1;
  }

  const fade =
    (progress - MOTION_DOT_TRAIL_SOLID_PORTION) /
    (1 - MOTION_DOT_TRAIL_SOLID_PORTION);

  return 1 - smoothstep(fade) * (1 - MOTION_DOT_TRAIL_END_OPACITY);
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
