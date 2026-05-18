export type ScatterBarTrait = {
  y: number;
  width: number;
  height: number;
  fill: string;
};

export const scatterBarTraits: ScatterBarTrait[] = [
  { y: 20.75, width: 19.6613, height: 6.74999, fill: "#D4E7F4" },
  { y: 40.4121, width: 19.6613, height: 6.74999, fill: "#ACD6DA" },
  { y: 60.0723, width: 9.83066, height: 6.74999, fill: "#91AEC4" },
  { y: 69.9023, width: 9.83066, height: 6.74999, fill: "#6C97C0" },
  { y: 79.7344, width: 9.83066, height: 6.74999, fill: "#698DB5" },
  { y: 89.5645, width: 9.83066, height: 6.74999, fill: "#ADB291" },
  { y: 99.3945, width: 9.83066, height: 6.74999, fill: "#7E9F9A" },
  { y: 109.225, width: 9.83066, height: 6.74999, fill: "#4E676E" },
  { y: 119.057, width: 9.83066, height: 6.74999, fill: "#72736D" },
  { y: 128.887, width: 9.83066, height: 6.74999, fill: "#252F38" },
  { y: 138.719, width: 9.83066, height: 6.74999, fill: "#292D39" },
  { y: 148.549, width: 9.83066, height: 6.74999, fill: "#C6A363" },
  { y: 158.381, width: 9.83066, height: 6.74999, fill: "#A58345" },
  { y: 168.211, width: 9.83066, height: 6.74999, fill: "#988155" },
  { y: 178.041, width: 9.83066, height: 6.74999, fill: "#B9805B" },
  { y: 187.871, width: 9.83066, height: 6.74999, fill: "#BB956E" },
  { y: 197.703, width: 9.83066, height: 6.74999, fill: "#AA886C" },
  { y: 207.533, width: 9.83066, height: 6.74999, fill: "#624934" },
  { y: 217.363, width: 9.83066, height: 6.74999, fill: "#775A38" },
  { y: 227.193, width: 9.83066, height: 6.74999, fill: "#8B5644" },
  { y: 237.025, width: 9.83066, height: 6.74999, fill: "#B06045" },
  { y: 246.855, width: 9.83066, height: 6.74999, fill: "#814642" },
  { y: 256.686, width: 9.83066, height: 6.74999, fill: "#5C4A56" },
  { y: 266.516, width: 9.83066, height: 6.74999, fill: "#5A3139" },
  { y: 276.348, width: 9.83066, height: 6.74999, fill: "#482F33" },
  { y: 286.178, width: 9.83066, height: 6.74999, fill: "#170C08" },
];

const defaultTraitIndex = scatterBarTraits.findIndex(
  (bar) => bar.y === 187.871,
);

export const SCATTER_BAR_DEFAULT_INDEX =
  defaultTraitIndex === -1 ? 15 : defaultTraitIndex;

const SCATTER_BAR_Y_MIN = scatterBarTraits[0].y;
const SCATTER_BAR_Y_MAX = scatterBarTraits[scatterBarTraits.length - 1].y;
const SCATTER_BAR_Y_RANGE = SCATTER_BAR_Y_MAX - SCATTER_BAR_Y_MIN;

export const scatterBarChartLayout = {
  viewBox: { width: 282, height: 338 },
  highlight: {
    x: 140.531,
    width: 7.875,
    rx: 0.84375,
    stroke: "#E8E8E8",
    strokeWidth: 0.5625,
  },
  indicator: {
    x: 147.5,
    y: 21.0312,
    width: 274.696,
    height: 6.18749,
    stroke: "#F2F2F2",
    strokeOpacity: 0.5,
    strokeWidth: 0.5625,
  },
  lines: {
    top: { x1: 130.625, x2: 139.906 },
    bottom: { x1: 130.625, x2: 139.906 },
    connectorTop: { x1: 148.906, x2: 158.188 },
    connectorBottom: { x1: 148.906, x2: 158.188 },
  },
  hitArea: { x: 128, y: 16, width: 152, height: 290 },
} as const;

export type ScatterBarMetrics = {
  highlightY: number;
  highlightHeight: number;
  indicatorY: number;
  topLineY: number;
  bottomLineY: number;
  connectorTopY: number;
  connectorBottomY: number;
};

export function getScatterBarCenter(trait: ScatterBarTrait) {
  return trait.y + trait.width / 2;
}

export function getScatterBarMetrics(trait: ScatterBarTrait): ScatterBarMetrics {
  const t = (trait.y - SCATTER_BAR_Y_MIN) / SCATTER_BAR_Y_RANGE;
  const highlightHeight = Math.max(trait.width, 9.83) + 22;

  return {
    highlightY: trait.y - (highlightHeight - trait.width) / 2,
    highlightHeight,
    indicatorY: trait.y + trait.width / 2 - scatterBarChartLayout.indicator.height / 2,
    topLineY: 120.961 + t * 5,
    bottomLineY: 270.633 - t * 4,
    connectorTopY: 46.125 + t * 74,
    connectorBottomY: 195.797 + t * 75,
  };
}

export function getScatterBarIndexFromPoint(y: number) {
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  scatterBarTraits.forEach((trait, index) => {
    const distance = Math.abs(y - getScatterBarCenter(trait));

    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });

  return bestIndex;
}
