"use client";

import scatterChartSrc from "@/assets/Scatterplot_Chart.svg";
import { motion, shouldSimplifyMotion } from "@/lib/gsap";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import {
  SCATTER_CHART_VIEWBOX,
  buildScatterOpacityGrid,
  collectScatterGridCells,
  getShiftedOpacity,
  type ScatterGridCell,
  type ScatterOpacityGrid,
} from "./scatterChartGrid";
import styles from "./ScatterplotChart.module.scss";

type ScatterplotChartProps = {
  className?: string;
};

function setCellOpacity(
  grid: ScatterOpacityGrid,
  cell: ScatterGridCell,
  shifted: boolean,
) {
  const opacity = getShiftedOpacity(grid, cell, shifted);
  cell.element.setAttribute("opacity", String(opacity));
}

function applyBrightness(
  grid: ScatterOpacityGrid,
  shifted: boolean,
  animate: boolean,
) {
  if (!animate || shouldSimplifyMotion()) {
    grid.cells.forEach((cell) => {
      setCellOpacity(grid, cell, shifted);
    });
    return;
  }

  grid.cells.forEach((cell) => {
    gsap.to(cell.element, {
      opacity: getShiftedOpacity(grid, cell, shifted),
      duration: motion.duration.fast,
      ease: motion.ease.soft,
      overwrite: true,
    });
  });
}

export function ScatterplotChart({ className }: ScatterplotChartProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [markup, setMarkup] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    void fetch(scatterChartSrc.src)
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

    const cells = collectScatterGridCells(host);
    const grid = buildScatterOpacityGrid(cells);

    if (grid.cells.length === 0) {
      return undefined;
    }

    applyBrightness(grid, false, false);

    const onHoverIn = () => {
      applyBrightness(grid, true, true);
    };

    const onHoverOut = () => {
      applyBrightness(grid, false, true);
    };

    root.addEventListener("pointerenter", onHoverIn);
    root.addEventListener("pointerleave", onHoverOut);

    return () => {
      root.removeEventListener("pointerenter", onHoverIn);
      root.removeEventListener("pointerleave", onHoverOut);
      gsap.killTweensOf(grid.cells.map((cell) => cell.element));
      applyBrightness(grid, false, false);
    };
  }, [markup]);

  return (
    <div ref={rootRef} className={`${styles.root} ${className ?? ""}`.trim()}>
      <div
        ref={chartRef}
        className={styles.chart}
        aria-hidden
        style={{
          aspectRatio: `${SCATTER_CHART_VIEWBOX.width} / ${SCATTER_CHART_VIEWBOX.height}`,
        }}
      />
    </div>
  );
}
