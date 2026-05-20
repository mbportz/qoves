"use client";

import { ChartSvgDisplay } from "@/components/charts/ChartSvgDisplay";
import { motion, shouldSimplifyMotion } from "@/lib/gsap";
import gsap from "gsap";
import {
  HALF_BLOCKS_VIEWBOX,
  applyHalfBlocksPositions,
  collectHalfBlocksChart,
  randomPillX,
  resetHalfBlocksPositions,
  type HalfBlocksChartParts,
} from "./halfBlocksScore";
import styles from "./HalfBlocksChart.module.scss";

type HalfBlocksChartProps = {
  className?: string;
};

type ScoreTweenState = {
  pillX: number;
};

function tweenScoreChart(
  parts: HalfBlocksChartParts,
  state: ScoreTweenState,
  hovered: boolean,
  animate: boolean,
) {
  const targetPillX = hovered
    ? randomPillX(parts.pill.width)
    : parts.pill.defaultX;

  if (!animate || shouldSimplifyMotion()) {
    state.pillX = targetPillX;
    applyHalfBlocksPositions(parts, targetPillX);
    return;
  }

  gsap.to(state, {
    pillX: targetPillX,
    duration: motion.duration.slow,
    ease: motion.ease.soft,
    overwrite: true,
    onUpdate: () => {
      applyHalfBlocksPositions(parts, state.pillX);
    },
  });
}

export function HalfBlocksChart({ className }: HalfBlocksChartProps) {
  return (
    <ChartSvgDisplay
      id="halfBlocks"
      viewBox={HALF_BLOCKS_VIEWBOX}
      rootClassName={styles.root}
      chartClassName={styles.chart}
      className={className}
      setupDesktop={(host, root) => {
        const parts = collectHalfBlocksChart(host);

        if (!parts) {
          return undefined;
        }

        const tweenState: ScoreTweenState = { pillX: parts.pill.defaultX };

        resetHalfBlocksPositions(parts);

        const onHoverIn = () => {
          tweenScoreChart(parts, tweenState, true, true);
        };

        const onHoverOut = () => {
          tweenScoreChart(parts, tweenState, false, true);
        };

        root.addEventListener("pointerenter", onHoverIn);
        root.addEventListener("pointerleave", onHoverOut);

        return () => {
          root.removeEventListener("pointerenter", onHoverIn);
          root.removeEventListener("pointerleave", onHoverOut);
          gsap.killTweensOf(tweenState);
          resetHalfBlocksPositions(parts);
        };
      }}
    />
  );
}
