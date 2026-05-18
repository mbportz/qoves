import { ScatterplotChartBar } from "@/components/charts";
import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { DashboardChartImage } from "./DashboardChartImage";
import {
  chartsClusterCharts,
  metricsClusterCharts,
  type DashboardGridArea,
} from "./dashboardCharts";
import styles from "./AnalysisDashboard.module.scss";

type AnalysisDashboardProps = {
  image: StaticImageData;
};

type GridCellProps = {
  area: DashboardGridArea | "scatterBar";
  children: ReactNode;
};

function GridCell({ area, children }: GridCellProps) {
  return (
    <div className={styles.gridCell} data-grid-area={area}>
      {children}
    </div>
  );
}

export function AnalysisDashboard({ image }: AnalysisDashboardProps) {
  return (
    <div className={styles.cardContent}>
      <div className={styles.root} data-analysis-dashboard>
        <div className={styles.stage} data-section-content>
          <div className={styles.blurLeft} aria-hidden />
          <div className={styles.blurRight} aria-hidden />
          <div className={styles.canvas}>
            <div
              className={styles.visualTrack}
              data-analysis-layer
              data-section-item
            >
              <div className={styles.visualFrame}>
                <Image
                  className={styles.visual}
                  src={image}
                  alt="Qoves facial analysis dashboard with charts and feature scores"
                  sizes="(max-width: 768px) 100vw, 1360px"
                  fill
                  priority={false}
                />
              </div>
              <div className={styles.overlayGrid}>
                <div className={styles.chartsCluster}>
                  {chartsClusterCharts.map((chart) => (
                    <GridCell key={chart.area} area={chart.area}>
                      <DashboardChartImage {...chart} />
                    </GridCell>
                  ))}
                </div>

                <div className={styles.metricsCluster}>
                  <GridCell area="scatterBar">
                    <ScatterplotChartBar className={styles.gridChart} />
                  </GridCell>
                  {metricsClusterCharts.map((chart) => (
                    <GridCell key={chart.area} area={chart.area}>
                      <DashboardChartImage {...chart} />
                    </GridCell>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
