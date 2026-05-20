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
  const { markup, dataUri } = useChartSvgMarkup("scatter");

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
      <div className={displayStyles.mobileChart}>
        <ChartSvgImage
          dataUri={dataUri}
          width={SCATTER_CHART_VIEWBOX.width}
          height={SCATTER_CHART_VIEWBOX.height}
          className={styles.chart}
        />
      </div>
      <div className={displayStyles.desktopChart}>
        <div
          ref={chartRef}
          className={styles.chart}
          aria-hidden
          style={{
            aspectRatio: `${SCATTER_CHART_VIEWBOX.width} / ${SCATTER_CHART_VIEWBOX.height}`,
          }}
        />
      </div>
    </div>
  );
}
