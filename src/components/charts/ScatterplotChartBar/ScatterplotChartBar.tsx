"use client";

import scatterplotChartBarImage from "@/assets/Scatterplot_Chart_bar.svg";
import {
  SCATTER_BAR_DEFAULT_INDEX,
  getScatterBarMetrics,
  scatterBarChartLayout,
  scatterBarTraits,
} from "@/data/scatterBarChartData";
import { bindScatterBarChartHover } from "@/lib/gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./ScatterplotChartBar.module.scss";

type ScatterplotChartBarProps = {
  className?: string;
};

export function ScatterplotChartBar({ className }: ScatterplotChartBarProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const defaultMetrics = getScatterBarMetrics(
    scatterBarTraits[SCATTER_BAR_DEFAULT_INDEX],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    return bindScatterBarChartHover(root);
  }, []);

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${className ?? ""}`.trim()}
      data-scatter-bar-chart
    >
      <Image
        className={styles.artwork}
        src={scatterplotChartBarImage}
        alt=""
        width={scatterBarChartLayout.viewBox.width}
        height={scatterBarChartLayout.viewBox.height}
        sizes="(max-width: 768px) 28vw, 285px"
        priority={false}
        aria-hidden
      />
      <svg
        className={styles.overlay}
        viewBox={`0 0 ${scatterBarChartLayout.viewBox.width} ${scatterBarChartLayout.viewBox.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect
          className={styles.hitArea}
          data-scatter-hit
          x={scatterBarChartLayout.hitArea.x}
          y={scatterBarChartLayout.hitArea.y}
          width={scatterBarChartLayout.hitArea.width}
          height={scatterBarChartLayout.hitArea.height}
        />
        <line
          className={styles.guide}
          data-scatter-top-line
          x1={scatterBarChartLayout.lines.top.x1}
          x2={scatterBarChartLayout.lines.top.x2}
          y1={defaultMetrics.topLineY}
          y2={defaultMetrics.topLineY}
        />
        <line
          className={styles.guide}
          data-scatter-bottom-line
          x1={scatterBarChartLayout.lines.bottom.x1}
          x2={scatterBarChartLayout.lines.bottom.x2}
          y1={defaultMetrics.bottomLineY}
          y2={defaultMetrics.bottomLineY}
        />
        <line
          className={styles.guide}
          data-scatter-connector-top
          x1={scatterBarChartLayout.lines.connectorTop.x1}
          x2={scatterBarChartLayout.lines.connectorTop.x2}
          y1={defaultMetrics.connectorTopY}
          y2={defaultMetrics.connectorTopY}
        />
        <line
          className={styles.guide}
          data-scatter-connector-bottom
          x1={scatterBarChartLayout.lines.connectorBottom.x1}
          x2={scatterBarChartLayout.lines.connectorBottom.x2}
          y1={defaultMetrics.connectorBottomY}
          y2={defaultMetrics.connectorBottomY}
        />
        <rect
          className={styles.indicator}
          data-scatter-indicator
          x={scatterBarChartLayout.indicator.x}
          y={defaultMetrics.indicatorY}
          width={scatterBarChartLayout.indicator.width}
          height={scatterBarChartLayout.indicator.height}
          transform={`rotate(90 ${scatterBarChartLayout.indicator.x} ${defaultMetrics.indicatorY})`}
          stroke={scatterBarChartLayout.indicator.stroke}
          strokeOpacity={scatterBarChartLayout.indicator.strokeOpacity}
          strokeWidth={scatterBarChartLayout.indicator.strokeWidth}
        />
        <rect
          className={styles.highlight}
          data-scatter-highlight
          x={scatterBarChartLayout.highlight.x}
          y={defaultMetrics.highlightY}
          width={scatterBarChartLayout.highlight.width}
          height={defaultMetrics.highlightHeight}
          rx={scatterBarChartLayout.highlight.rx}
          stroke={scatterBarChartLayout.highlight.stroke}
          strokeWidth={scatterBarChartLayout.highlight.strokeWidth}
        />
      </svg>
    </div>
  );
}
