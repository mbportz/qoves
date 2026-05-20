"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { BarShapeProps } from "recharts";
import { scoreChartData, type ScoreChartPoint } from "@/data/chartData";
import { ChartTooltip } from "@/components/charts/Tooltip/ChartTooltip";
import { chartTheme } from "@/components/charts/theme/chartTheme";
import styles from "./ScoreChart.module.scss";

type ScoreChartProps = {
  data?: ScoreChartPoint[];
  className?: string;
};

function ScoreBarShape(props: BarShapeProps) {
  const { x = 0, y = 0, width = 0, height = 0, fill } = props;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      rx={4}
      data-hero-chart-bar
    />
  );
}

export function ScoreChart({
  data = scoreChartData,
  className,
}: ScoreChartProps) {
  return (
    <div className={`${styles.root} ${className ?? ""}`.trim()}>
      <ResponsiveContainer width="100%" height={120}>
        <BarChart
          data={data}
          margin={{ top: 8, right: 4, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient
              id={chartTheme.gradient.score.id}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={chartTheme.gradient.score.start}
              />
              <stop
                offset="100%"
                stopColor={chartTheme.gradient.score.end}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            stroke={chartTheme.grid.stroke}
            strokeDasharray={chartTheme.grid.strokeDasharray}
          />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={chartTheme.axis.tick}
            dy={8}
          />
          <YAxis hide domain={[0, 100]} />
          <Tooltip
            content={<ChartTooltip valueSuffix="%" />}
            cursor={{ fill: "rgb(154 174 181 / 12%)" }}
          />
          <Bar
            dataKey="value"
            fill={`url(#${chartTheme.gradient.score.id})`}
            radius={[4, 4, 0, 0]}
            animationDuration={chartTheme.animation.duration}
            animationEasing={chartTheme.animation.easing}
            shape={ScoreBarShape}
          >
            {data.map((entry) => (
              <Cell key={entry.label} fill={`url(#${chartTheme.gradient.score.id})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
