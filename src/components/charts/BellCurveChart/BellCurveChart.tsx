"use client";

import { ChartSvgDisplay } from "../svg";
import { motion, shouldSimplifyMotion } from "@/lib/gsap";
import gsap from "gsap";
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
  return (
    <ChartSvgDisplay
      id="bellCurve"
      viewBox={BELL_CURVE_VIEWBOX}
      rootClassName={styles.root}
      chartClassName={styles.chart}
      className={className}
      setupDesktop={(host, root) => {
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
      }}
    />
  );
}
