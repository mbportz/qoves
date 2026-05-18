import type { HTMLAttributes, ReactNode } from "react";
import {
  MOTION_DOT_OFFSET_BOTTOM,
  MOTION_DOT_OFFSET_TOP,
  MOTION_FRAMES,
  MOTION_LINE_PATH,
  MOTION_LINE_VIEWBOX,
} from "./motionLine.constants";
import { MotionPathDot } from "./MotionPathDot";
import styles from "./HeroMotionFrame.module.scss";

const XHTML_NS = "http://www.w3.org/1999/xhtml";

type MotionFrameRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type ImageSlotProps = {
  frame: MotionFrameRect;
  children: ReactNode;
};

function ImageSlot({ frame, children }: ImageSlotProps) {
  return (
    <foreignObject
      x={frame.x}
      y={frame.y}
      width={frame.width}
      height={frame.height}
    >
      <div
        className={styles.slot}
        {...({ xmlns: XHTML_NS } as HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    </foreignObject>
  );
}

type HeroMotionFrameProps = {
  before: ReactNode;
  after: ReactNode;
};

export function HeroMotionFrame({ before, after }: HeroMotionFrameProps) {
  const { width, height } = MOTION_LINE_VIEWBOX;

  return (
    <div className={styles.root}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter
            id="hero-trail-blur"
            x="-80%"
            y="-80%"
            width="260%"
            height="260%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="0.85" />
          </filter>
        </defs>
        <g
          aria-hidden
          className={styles.decor}
          data-hero-compare-links
        >
          <path className={styles.framePath} d={MOTION_LINE_PATH} />
        </g>

        <g data-hero-compare>
          <ImageSlot frame={MOTION_FRAMES.before}>{before}</ImageSlot>
          <ImageSlot frame={MOTION_FRAMES.after}>{after}</ImageSlot>
        </g>

        <g aria-hidden className={styles.dots}>
          <MotionPathDot label="top" pathOffset={MOTION_DOT_OFFSET_TOP} />
          <MotionPathDot label="bottom" pathOffset={MOTION_DOT_OFFSET_BOTTOM} />
        </g>
      </svg>
    </div>
  );
}
