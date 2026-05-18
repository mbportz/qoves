import {
  MOTION_DOT_DURATION,
  MOTION_DOT_TRAIL_COUNT,
  MOTION_LINE_PATH,
  motionDotKeyPoints,
  motionDotKeyTimes,
  motionTrailFade,
  motionTrailOffset,
} from "./motionLine.constants";
import styles from "./HeroMotionFrame.module.scss";

const TRAIL_RADIUS = 5;
const HEAD_SIZE = 7;
const HEAD_HALF = HEAD_SIZE / 2;
const DOT_FILL = "#869aa1";
const MOTION_DUR = `${MOTION_DOT_DURATION}s`;

type MotionPathDotProps = {
  label: "top" | "bottom";
  pathOffset: number;
};

export function MotionPathDot({ label, pathOffset }: MotionPathDotProps) {
  return (
    <g className={styles.dotGroup} data-dot={label}>
      <g className={styles.trail} filter="url(#hero-trail-blur)">
        {Array.from({ length: MOTION_DOT_TRAIL_COUNT }, (_, index) => {
          const fade = motionTrailFade(index);
          const trailOffset = motionTrailOffset(pathOffset, index);

          return (
            <circle
              key={`${label}-trail-${index}`}
              r={TRAIL_RADIUS * (0.1 + 0.22 * fade)}
              fill={DOT_FILL}
              opacity={0.72 + 0.28 * fade}
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
        })}
      </g>
      <rect
        className={styles.dot}
        width={HEAD_SIZE}
        height={HEAD_SIZE}
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
