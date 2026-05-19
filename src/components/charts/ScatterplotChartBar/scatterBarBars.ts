/**
 * Vertical band positions from `Scatterplot_Chart_bar.svg`.
 * Each rect uses `rotate(90 anchorX y)` — the band spans upward from `y`.
 */
export type ScatterBarBand = {
  y: number;
  thickness: number;
};

export const SCATTER_BAR_BARS: ScatterBarBand[] = [
  { y: 20.75, thickness: 19.6613 },
  { y: 40.4121, thickness: 19.6613 },
  { y: 60.0723, thickness: 9.83066 },
  { y: 69.9023, thickness: 9.83066 },
  { y: 79.7344, thickness: 9.83066 },
  { y: 89.5645, thickness: 9.83066 },
  { y: 99.3945, thickness: 9.83066 },
  { y: 109.225, thickness: 9.83066 },
  { y: 119.057, thickness: 9.83066 },
  { y: 128.887, thickness: 9.83066 },
  { y: 138.719, thickness: 9.83066 },
  { y: 148.549, thickness: 9.83066 },
  { y: 158.381, thickness: 9.83066 },
  { y: 168.211, thickness: 9.83066 },
  { y: 178.041, thickness: 9.83066 },
  { y: 187.871, thickness: 9.83066 },
  { y: 197.703, thickness: 9.83066 },
  { y: 207.533, thickness: 9.83066 },
  { y: 217.363, thickness: 9.83066 },
  { y: 227.193, thickness: 9.83066 },
  { y: 237.025, thickness: 9.83066 },
  { y: 246.855, thickness: 9.83066 },
  { y: 256.686, thickness: 9.83066 },
  { y: 266.516, thickness: 9.83066 },
  { y: 276.348, thickness: 9.83066 },
  { y: 286.178, thickness: 9.83066 },
];

export const SCATTER_BAR_DEFAULT_INDEX = SCATTER_BAR_BARS.findIndex(
  (bar) => bar.y === 187.871,
);

export const SCATTER_BAR_VIEWBOX = { width: 282, height: 338 } as const;

export function getScatterBarTopY(bar: ScatterBarBand) {
  return bar.y - bar.thickness;
}

export function getScatterBarCenterY(bar: ScatterBarBand) {
  return bar.y - bar.thickness / 2;
}

export function getScatterBarIndexFromY(y: number) {
  for (let index = SCATTER_BAR_BARS.length - 1; index >= 0; index -= 1) {
    const bar = SCATTER_BAR_BARS[index];
    if (y > getScatterBarTopY(bar) && y <= bar.y) {
      return index;
    }
  }

  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  SCATTER_BAR_BARS.forEach((bar, index) => {
    const distance = Math.abs(y - getScatterBarCenterY(bar));

    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });

  return bestIndex;
}

export function getScatterBarTranslateY(index: number) {
  const defaultCenter = getScatterBarCenterY(
    SCATTER_BAR_BARS[SCATTER_BAR_DEFAULT_INDEX],
  );
  const targetCenter = getScatterBarCenterY(SCATTER_BAR_BARS[index]);

  return targetCenter - defaultCenter;
}
