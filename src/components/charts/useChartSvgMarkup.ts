"use client";

import { useMemo } from "react";
import { getChartSvgMarkup, type ChartSvgId } from "./chartSvgMarkup";

export function useChartSvgMarkup(id: ChartSvgId) {
  const markup = useMemo(() => getChartSvgMarkup(id), [id]);
  const dataUri = useMemo(
    () => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`,
    [markup],
  );

  return { markup, dataUri };
}
