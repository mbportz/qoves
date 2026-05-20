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
  BELL_CURVE_VIEWBOX,
  applyBellCurveReveal,
  collectBellCurveSelection,
  resetBellCurveReveal,
  setupBellCurveFills,
  type BellCurveSelection,
} from "./bellCurveSelection";
import styles from "./BellCurveChart.module.scss";

type BellCurveChartProps = {
  className?: string;
};

type RevealTweenState = {
  reveal: number;
};

function tweenReveal(
  selection: BellCurveSelection,
  state: RevealTweenState,
  hovered: boolean,
  animate: boolean,
) {
  const targetReveal = hovered ? 1 : 0;

  if (!animate || shouldSimplifyMotion()) {
    state.reveal = targetReveal;
    applyBellCurveReveal(selection, targetReveal);
    return;
  }

  gsap.to(state, {
    reveal: targetReveal,
    duration: motion.duration.slow,
    ease: motion.ease.soft,
    overwrite: true,
    onUpdate: () => {
      applyBellCurveReveal(selection, state.reveal);
    },
  });
}

export function BellCurveChart({ className }: BellCurveChartProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const { markup, dataUri } = useChartSvgMarkup("bellCurve");

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

    const selection = collectBellCurveSelection(host);
    if (!selection) {
      return undefined;
    }

    setupBellCurveFills(selection);
    resetBellCurveReveal(selection);

    const tweenState: RevealTweenState = { reveal: 0 };

    const onHoverIn = () => {
      tweenReveal(selection, tweenState, true, true);
    };

    const onHoverOut = () => {
      tweenReveal(selection, tweenState, false, true);
    };

    root.addEventListener("pointerenter", onHoverIn);
    root.addEventListener("pointerleave", onHoverOut);

    return () => {
      root.removeEventListener("pointerenter", onHoverIn);
      root.removeEventListener("pointerleave", onHoverOut);
      gsap.killTweensOf(tweenState);
      resetBellCurveReveal(selection);
    };
  }, [markup]);

  return (
    <div ref={rootRef} className={`${styles.root} ${className ?? ""}`.trim()}>
      <div className={displayStyles.mobileChart}>
        <ChartSvgImage
          dataUri={dataUri}
          width={BELL_CURVE_VIEWBOX.width}
          height={BELL_CURVE_VIEWBOX.height}
          className={styles.chart}
        />
      </div>
      <div className={displayStyles.desktopChart}>
        <div
          ref={chartRef}
          className={styles.chart}
          aria-hidden
          style={{
            aspectRatio: `${BELL_CURVE_VIEWBOX.width} / ${BELL_CURVE_VIEWBOX.height}`,
          }}
        />
      </div>
    </div>
  );
}
