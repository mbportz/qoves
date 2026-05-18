import { motion } from "@/lib/gsap/motion";

export const chartTheme = {
  colors: {
    primary: "#9aaeb5",
    primaryDark: "#5d767e",
    primaryLight: "#aec2c9",
    grid: "#f2f2f2",
    axis: "#758084",
    label: "#515255",
    tooltipBg: "#ffffff",
    tooltipBorder: "#e8e8e8",
  },
  gradient: {
    analysis: {
      id: "analysis-area-gradient",
      start: "#9aaeb5",
      end: "#f9fbfb",
    },
    score: {
      id: "score-bar-gradient",
      start: "#9aaeb5",
      end: "#5d767e",
    },
  },
  animation: {
    duration: motion.duration.base * 1000,
    easing: "ease-out" as const,
  },
  axis: {
    tick: { fontSize: 12, fill: "#758084" },
    stroke: "#e8e8e8",
  },
  grid: {
    stroke: "#f2f2f2",
    strokeDasharray: "4 4",
  },
} as const;
