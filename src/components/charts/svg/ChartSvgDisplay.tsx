"use client";

import displayStyles from "./chartDisplay.module.scss";
import { getChartSvgMarkup, type ChartSvgId } from "./chartSvgMarkup";
import { injectChartMarkup } from "./injectChartMarkup";
import { isMobileViewport } from "@/lib/gsap/responsive";
import { cn } from "@/lib/utils/cn";
import { useEffect, useMemo, useRef } from "react";

export type ChartViewBox = {
  width: number;
  height: number;
};

export type ChartSvgDesktopSetup = (
  host: HTMLDivElement,
  root: HTMLDivElement,
) => void | (() => void);

type ChartSvgDisplayProps = {
  id: ChartSvgId;
  viewBox: ChartViewBox;
  rootClassName: string;
  chartClassName: string;
  className?: string;
  setupDesktop?: ChartSvgDesktopSetup;
};

function useChartSvgSources(id: ChartSvgId) {
  const markup = useMemo(() => getChartSvgMarkup(id), [id]);
  const dataUri = useMemo(
    () => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`,
    [markup],
  );

  return { markup, dataUri };
}

export function ChartSvgDisplay({
  id,
  viewBox,
  rootClassName,
  chartClassName,
  className,
  setupDesktop,
}: ChartSvgDisplayProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const setupRef = useRef(setupDesktop);
  setupRef.current = setupDesktop;

  const { markup, dataUri } = useChartSvgSources(id);

  useEffect(() => {
    if (isMobileViewport()) {
      return undefined;
    }

    const host = hostRef.current;
    const root = rootRef.current;

    if (!markup || !host || !root) {
      return undefined;
    }

    injectChartMarkup(host, markup);

    return setupRef.current?.(host, root) ?? undefined;
  }, [markup]);

  return (
    <div ref={rootRef} className={cn(rootClassName, className)}>
      <div className={displayStyles.mobileChart}>
        <img
          src={dataUri}
          alt=""
          className={cn(chartClassName, displayStyles.chartImg)}
          width={viewBox.width}
          height={viewBox.height}
          decoding="async"
          draggable={false}
        />
      </div>
      <div className={displayStyles.desktopChart}>
        <div
          ref={hostRef}
          className={chartClassName}
          aria-hidden
          style={{
            aspectRatio: `${viewBox.width} / ${viewBox.height}`,
          }}
        />
      </div>
    </div>
  );
}
