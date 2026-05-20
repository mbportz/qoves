import {
  MOTION_DOT_DURATION,
  MOTION_DOT_HEAD_SIZE,
  MOTION_DOT_TRAIL_COUNT,
  MOTION_LINE_PATH,
  motionDotKeyPoints,
  motionDotKeyTimes,
  motionTrailCircleRadius,
  motionTrailOffset,
  motionTrailOpacity,
  motionTrailUsesBlur,
} from "./motionLine.constants";
import styles from "./HeroMotionFrame.module.scss";

const HEAD_HALF = MOTION_DOT_HEAD_SIZE / 2;
const DOT_FILL = "#869aa1";
const MOTION_DUR = `${MOTION_DOT_DURATION}s`;

type MotionPathDotProps = {
  label: "top" | "bottom";
  pathOffset: number;
};

type TrailCircleProps = {
  label: string;
  index: number;
  pathOffset: number;
};

function TrailCircle({ label, index, pathOffset }: TrailCircleProps) {
  const trailOffset = motionTrailOffset(pathOffset, index);

  return (
    <circle
      r={motionTrailCircleRadius(index)}
      fill={DOT_FILL}
      opacity={motionTrailOpacity(index)}
    >
      <animateMotion
        dur={MOTION_DUR}
        repeatCount="indefinite"
        path={MOTION_LINE_PATH}
        keyPoints={motionDotKeyPoints(trailOffset)}
        keyTimes={motionDotKeyTimes(trailOffset)}
        calcMode="linear"
      />
    </circle>
  );
}

export function MotionPathDot({ label, pathOffset }: MotionPathDotProps) {
  return (
    <g className={styles.dotGroup} data-dot={label}>
      <g className={styles.trailSolid} aria-hidden>
        {Array.from({ length: MOTION_DOT_TRAIL_COUNT }, (_, index) => {
          if (motionTrailUsesBlur(index)) {
            return null;
          }

          return (
            <TrailCircle
              key={`${label}-trail-solid-${index}`}
              label={label}
              index={index}
              pathOffset={pathOffset}
            />
          );
        })}
      </g>
      <g
        className={styles.trailFade}
        filter="url(#hero-trail-blur)"
        aria-hidden
      >
        {Array.from({ length: MOTION_DOT_TRAIL_COUNT }, (_, index) => {
          if (!motionTrailUsesBlur(index)) {
            return null;
          }

          return (
            <TrailCircle
              key={`${label}-trail-fade-${index}`}
              label={label}
              index={index}
              pathOffset={pathOffset}
            />
          );
        })}
      </g>
      <rect
        className={styles.dot}
        data-motion-dot-head
        width={MOTION_DOT_HEAD_SIZE}
        height={MOTION_DOT_HEAD_SIZE}
        x={-HEAD_HALF}
        y={-HEAD_HALF}
        fill={DOT_FILL}
      >
        <animateMotion
          dur={MOTION_DUR}
          repeatCount="indefinite"
          path={MOTION_LINE_PATH}
          keyPoints={motionDotKeyPoints(pathOffset)}
          keyTimes={motionDotKeyTimes(pathOffset)}
          calcMode="linear"
        />
      </rect>
    </g>
  );
}
