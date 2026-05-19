"use client";

import bellCurveChartSrc from "@/assets/Bell_curve_Chart.svg";
import { motion, shouldSimplifyMotion } from "@/lib/gsap";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
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
  const [markup, setMarkup] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    void fetch(bellCurveChartSrc.src)
      .then((response) => response.text())
      .then((svg) => {
        if (!cancelled) {
          setMarkup(svg.replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, ""));
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
