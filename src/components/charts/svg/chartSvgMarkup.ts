import {
  chartSvgMarkup,
  type ChartSvgId,
} from "./chartSvgMarkup.generated";

export type { ChartSvgId };

export function getChartSvgMarkup(id: ChartSvgId) {
  return chartSvgMarkup[id];
}
