import featureContainerImage from "@/assets/Feature_Container.svg";
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

export const metricsClusterCharts: DashboardChartConfig[] = [
  {
    area: "feature",
    src: featureContainerImage,
    width: 353,
    height: 166,
    sizes: "(max-width: 768px) 26vw, 352px",
  },
];
