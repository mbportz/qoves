"use client";

import { ChartSvgDisplay } from "@/components/charts/ChartSvgDisplay";
import { motion, shouldSimplifyMotion } from "@/lib/gsap";
import gsap from "gsap";
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
  return (
    <ChartSvgDisplay
      id="scatter"
      viewBox={SCATTER_CHART_VIEWBOX}
      rootClassName={styles.root}
      chartClassName={styles.chart}
      className={className}
      setupDesktop={(host, root) => {
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
      }}
    />
  );
}
