"use client";

import { ChartSvgDisplay } from "../svg";
import { motion, shouldSimplifyMotion } from "@/lib/gsap";
import gsap from "gsap";
import {
  CONTAINER_CHART_VIEWBOX,
  collectContainerRows,
  randomKnobX,
  resetRowPositions,
  setRowKnobX,
  type ContainerRow,
} from "./containerChartKnobs";
import styles from "./ContainerChart.module.scss";

type ContainerChartProps = {
  className?: string;
};

type RowTweenState = {
  knobX: number;
};

function tweenRows(
  rows: ContainerRow[],
  states: RowTweenState[],
  hovered: boolean,
  animate: boolean,
) {
  rows.forEach((row, index) => {
    const targetKnobX = hovered ? randomKnobX(row.knob) : row.knob.defaultX;
    const state = states[index];

    if (!animate || shouldSimplifyMotion()) {
      state.knobX = targetKnobX;
      setRowKnobX(row, state.knobX);
      return;
    }

    gsap.to(state, {
      knobX: targetKnobX,
      duration: motion.duration.slow,
      ease: motion.ease.soft,
      overwrite: true,
      onUpdate: () => {
        setRowKnobX(row, state.knobX);
      },
    });
  });
}

export function ContainerChart({ className }: ContainerChartProps) {
  return (
    <ChartSvgDisplay
      id="container"
      viewBox={CONTAINER_CHART_VIEWBOX}
      rootClassName={styles.root}
      chartClassName={styles.chart}
      className={className}
      setupDesktop={(host, root) => {
        const rows = collectContainerRows(host);

        if (!rows) {
          return undefined;
        }

        const tweenStates = rows.map((row) => ({ knobX: row.knob.defaultX }));

        resetRowPositions(rows);

        const onHoverIn = () => {
          tweenRows(rows, tweenStates, true, true);
        };

        const onHoverOut = () => {
          tweenRows(rows, tweenStates, false, true);
        };

        root.addEventListener("pointerenter", onHoverIn);
        root.addEventListener("pointerleave", onHoverOut);

        return () => {
          root.removeEventListener("pointerenter", onHoverIn);
          root.removeEventListener("pointerleave", onHoverOut);
          gsap.killTweensOf(tweenStates);
          resetRowPositions(rows);
        };
      }}
    />
  );
}
