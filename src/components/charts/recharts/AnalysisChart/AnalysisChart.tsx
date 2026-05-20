"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { analysisChartData, type AnalysisChartPoint } from "@/data/chartData";
import { ChartTooltip } from "@/components/charts/Tooltip/ChartTooltip";
import { chartTheme } from "@/components/charts/theme/chartTheme";
import styles from "./AnalysisChart.module.scss";

type AnalysisChartProps = {
  data?: AnalysisChartPoint[];
  className?: string;
};

export function AnalysisChart({
  data = analysisChartData,
  className,
}: AnalysisChartProps) {
  return (
    <div className={`${styles.root} ${className ?? ""}`.trim()}>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={data}
          margin={{ top: 12, right: 8, left: -16, bottom: 0 }}
        >
          <defs>
            <linearGradient
              id={chartTheme.gradient.analysis.id}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={chartTheme.gradient.analysis.start}
                stopOpacity={0.45}
              />
              <stop
                offset="100%"
                stopColor={chartTheme.gradient.analysis.end}
                stopOpacity={0.05}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            stroke={chartTheme.grid.stroke}
            strokeDasharray={chartTheme.grid.strokeDasharray}
          />
          <XAxis
            dataKey="metric"
            axisLine={false}
            tickLine={false}
            tick={chartTheme.axis.tick}
            interval={0}
            angle={-18}
            textAnchor="end"
            height={52}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={chartTheme.axis.tick}
            domain={[0, 100]}
            width={32}
          />
          <Tooltip
            content={<ChartTooltip valueSuffix="%" />}
            cursor={{ stroke: chartTheme.colors.primary, strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="score"
            name="Score"
            stroke={chartTheme.colors.primaryDark}
            strokeWidth={2}
            fill={`url(#${chartTheme.gradient.analysis.id})`}
            animationDuration={chartTheme.animation.duration}
            animationEasing={chartTheme.animation.easing}
            dot={{
              r: 3,
              fill: chartTheme.colors.primaryDark,
              stroke: chartTheme.colors.tooltipBg,
              strokeWidth: 2,
            }}
            activeDot={{
              r: 5,
              fill: chartTheme.colors.primary,
              stroke: chartTheme.colors.primaryDark,
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
