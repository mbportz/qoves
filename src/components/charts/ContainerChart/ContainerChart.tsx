"use client";

import containerChartSrc from "@/assets/Container.svg";
import { motion, shouldSimplifyMotion } from "@/lib/gsap";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
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
  const rootRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [markup, setMarkup] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    void fetch(containerChartSrc.src)
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
  }, [markup]);

  return (
    <div ref={rootRef} className={`${styles.root} ${className ?? ""}`.trim()}>
      <div
        ref={chartRef}
        className={styles.chart}
        aria-hidden
        style={{
          aspectRatio: `${CONTAINER_CHART_VIEWBOX.width} / ${CONTAINER_CHART_VIEWBOX.height}`,
        }}
      />
    </div>
  );
}
