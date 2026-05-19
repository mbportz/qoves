import {
  BellCurveChart,
  ContainerChart,
  FeatureContainerChart,
  HalfBlocksChart,
  ScatterplotChart,
  ScatterplotChartBar,
} from "@/components/charts";
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
  desktopImage: StaticImageData;
  mobileImage: StaticImageData;
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

export function AnalysisDashboard({
  desktopImage,
  mobileImage,
}: AnalysisDashboardProps) {
  return (
    <div className={styles.cardContent}>
      <div className={styles.root} data-analysis-dashboard>
        <div className={styles.stage} data-section-content data-section-item>
          <div className={styles.blurLeft} aria-hidden />
          <div className={styles.blurRight} aria-hidden />
          <div className={styles.canvas}>
            <div className={styles.visualTrack} data-analysis-layer>
              <div className={styles.visualFrame}>
                <Image
                  className={`${styles.visual} ${styles.visualDesktop}`}
                  src={desktopImage}
                  alt="Qoves facial analysis dashboard with charts and feature scores"
                  sizes="(min-width: 769px) 1360px, 0px"
                  fill
                  priority={false}
                />
                <Image
                  className={`${styles.visual} ${styles.visualMobile}`}
                  src={mobileImage}
                  alt="Qoves facial analysis dashboard with charts and feature scores"
                  sizes="(max-width: 768px) 100vw, 0px"
                  fill
                  priority={false}
                />
              </div>
              <div className={styles.overlayGrid}>
                <div className={styles.chartsCluster}>
                  <GridCell area="scatterChart">
                    <ScatterplotChart className={styles.gridChart} />
                  </GridCell>
                  <GridCell area="bellCurve">
                    <BellCurveChart className={styles.gridChart} />
                  </GridCell>
                  <GridCell area="halfBlocks">
                    <HalfBlocksChart className={styles.gridChart} />
                  </GridCell>
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
                  <GridCell area="container">
                    <ContainerChart className={styles.gridChart} />
                  </GridCell>
                  <GridCell area="feature">
                    <FeatureContainerChart className={styles.gridChart} />
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
