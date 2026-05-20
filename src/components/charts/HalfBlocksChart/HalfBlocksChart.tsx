"use client";

import { ChartSvgImage } from "@/components/charts/ChartSvgImage";
import displayStyles from "@/components/charts/chartDisplay.module.scss";
import { injectChartMarkup } from "@/components/charts/injectChartMarkup";
import { useChartSvgMarkup } from "@/components/charts/useChartSvgMarkup";
import { mediaMobile } from "@/lib/gsap/responsive";
import { motion, shouldSimplifyMotion } from "@/lib/gsap";
import gsap from "gsap";
import { useEffect, useRef } from "react";
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
  const rootRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const { markup, dataUri } = useChartSvgMarkup("halfBlocks");

  useEffect(() => {
    if (window.matchMedia(mediaMobile).matches) {
      return undefined;
    }

    const host = chartRef.current;
    const root = rootRef.current;
    if (!markup || !host || !root) {
      return undefined;
    }

    injectChartMarkup(host, markup);

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
  }, [markup]);

  return (
    <div ref={rootRef} className={`${styles.root} ${className ?? ""}`.trim()}>
      <div className={displayStyles.mobileChart}>
        <ChartSvgImage
          dataUri={dataUri}
          width={HALF_BLOCKS_VIEWBOX.width}
          height={HALF_BLOCKS_VIEWBOX.height}
          className={styles.chart}
        />
      </div>
      <div className={displayStyles.desktopChart}>
        <div
          ref={chartRef}
          className={styles.chart}
          aria-hidden
          style={{
            aspectRatio: `${HALF_BLOCKS_VIEWBOX.width} / ${HALF_BLOCKS_VIEWBOX.height}`,
          }}
        />
      </div>
    </div>
  );
}
