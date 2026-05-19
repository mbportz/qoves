import type { StaticImageData } from "next/image";

export type DashboardGridArea =
  | "scatterChart"
  | "bellCurve"
  | "halfBlocks"
  | "feature"
  | "container";

export type DashboardChartConfig = {
  area: DashboardGridArea;
  src: StaticImageData;
  width: number;
  height: number;
  sizes: string;
};

export const chartsClusterCharts: DashboardChartConfig[] = [];

export const metricsClusterCharts: DashboardChartConfig[] = [];
