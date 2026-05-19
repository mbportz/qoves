"use client";

import bellCurveChartSrc from "@/assets/Bell_curve_Chart.svg";
import { motion, shouldSimplifyMotion } from "@/lib/gsap";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import {
  BELL_CURVE_PLOT,
  BELL_CURVE_VIEWBOX,
  applyBellCurveSelectionAt,
  collectBellCurveSelection,
  getBellCurveSelectionX,
  type BellCurveSelection,
} from "./bellCurveSelection";
import styles from "./BellCurveChart.module.scss";

type BellCurveChartProps = {
  className?: string;
};

type SelectionTweenState = {
  x: number;
};

function tweenSelection(
  selection: BellCurveSelection,
  state: SelectionTweenState,
  hovered: boolean,
  animate: boolean,
) {
  const targetX = getBellCurveSelectionX(hovered);

  if (!animate || shouldSimplifyMotion()) {
    state.x = targetX;
    applyBellCurveSelectionAt(selection, targetX, hovered);
    return;
  }

  state.x = hovered ? BELL_CURVE_PLOT.defaultX : BELL_CURVE_PLOT.xMin;

  gsap.to(state, {
    x: targetX,
    duration: motion.duration.slow,
    ease: motion.ease.soft,
    overwrite: true,
    onUpdate: () => {
      applyBellCurveSelectionAt(selection, state.x, hovered);
    },
  });
}

export function BellCurveChart({ className }: BellCurveChartProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [markup, setMarkup] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    void fetch(bellCurveChartSrc.src)
      .then((response) => response.text())
      .then((svg) => {
        if (!cancelled) {
          setMarkup(svg);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const host = chartRef.current;
    const root = rootRef.current;
    if (!markup || !host || !root) {
      return undefined;
    }

    host.innerHTML = markup;

    const selection = collectBellCurveSelection(host);
    if (!selection) {
      return undefined;
    }

    const tweenState: SelectionTweenState = { x: BELL_CURVE_PLOT.defaultX };

    applyBellCurveSelectionAt(selection, BELL_CURVE_PLOT.defaultX, false);

    const onHoverIn = () => {
      tweenSelection(selection, tweenState, true, true);
    };

    const onHoverOut = () => {
      tweenSelection(selection, tweenState, false, true);
    };

    root.addEventListener("pointerenter", onHoverIn);
    root.addEventListener("pointerleave", onHoverOut);

    return () => {
      root.removeEventListener("pointerenter", onHoverIn);
      root.removeEventListener("pointerleave", onHoverOut);
      gsap.killTweensOf(tweenState);
      applyBellCurveSelectionAt(selection, BELL_CURVE_PLOT.defaultX, false);
    };
  }, [markup]);

  return (
    <div ref={rootRef} className={`${styles.root} ${className ?? ""}`.trim()}>
      <div
        ref={chartRef}
        className={styles.chart}
        aria-hidden
        style={{
          aspectRatio: `${BELL_CURVE_VIEWBOX.width} / ${BELL_CURVE_VIEWBOX.height}`,
        }}
      />
    </div>
  );
}
