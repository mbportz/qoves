import bellCurveChartImage from "@/assets/Bell_curve_Chart.svg";
import containerImage from "@/assets/Container.svg";
import halfBlocksImage from "@/assets/Half_Blocks.svg";
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

export const chartsClusterCharts: DashboardChartConfig[] = [
  {
    area: "bellCurve",
    src: bellCurveChartImage,
    width: 286,
    height: 198,
    sizes: "(max-width: 768px) 22vw, 285px",
  },
  {
    area: "halfBlocks",
    src: halfBlocksImage,
    width: 285,
    height: 127,
    sizes: "(max-width: 768px) 22vw, 284px",
  },
];

export const metricsClusterCharts: DashboardChartConfig[] = [
  {
    area: "container",
    src: containerImage,
    width: 286,
    height: 157,
    sizes: "(max-width: 768px) 22vw, 285px",
  },
  {
    area: "feature",
    src: featureContainerImage,
    width: 353,
    height: 166,
    sizes: "(max-width: 768px) 26vw, 352px",
  },
];
