export type ScoreChartPoint = {
  label: string;
  value: number;
};

export type AnalysisChartPoint = {
  metric: string;
  score: number;
};

export const scoreChartData: ScoreChartPoint[] = [
  { label: "Jaw", value: 72 },
  { label: "Eyes", value: 88 },
  { label: "Nose", value: 76 },
  { label: "Skin", value: 84 },
  { label: "Lips", value: 79 },
  { label: "Brow", value: 91 },
];

export const analysisChartData: AnalysisChartPoint[] = [
  { metric: "Symmetry", score: 84 },
  { metric: "Proportion", score: 78 },
  { metric: "Harmony", score: 82 },
  { metric: "Skin", score: 76 },
  { metric: "Structure", score: 88 },
  { metric: "Balance", score: 80 },
];
