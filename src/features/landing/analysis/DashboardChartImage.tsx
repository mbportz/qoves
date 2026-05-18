import Image from "next/image";
import type { DashboardChartConfig } from "./dashboardCharts";
import styles from "./AnalysisDashboard.module.scss";

type DashboardChartImageProps = Pick<
  DashboardChartConfig,
  "src" | "width" | "height" | "sizes"
>;

export function DashboardChartImage({
  src,
  width,
  height,
  sizes,
}: DashboardChartImageProps) {
  return (
    <Image
      className={styles.gridChart}
      src={src}
      alt=""
      width={width}
      height={height}
      sizes={sizes}
      priority={false}
      aria-hidden
    />
  );
}
