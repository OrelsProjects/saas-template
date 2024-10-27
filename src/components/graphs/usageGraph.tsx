"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface LineChartItem {
  label: string;
  value: number;
}

const data: LineChartItem[] = [
  { label: "1-3/9", value: 3 },
  { label: "4-6/9", value: 5 },
  { label: "7-9/9", value: 2 },
  { label: "10-12/9", value: 8 },
  { label: "13-15/9", value: 6 },
  { label: "16-18/9", value: 10 },
  { label: "19-21/9", value: 7 },
  { label: "21-23/9", value: 12 },
  { label: "24-26/9", value: 9 },
];

export const UsageGraph: React.FC = () => {
  return (
    <ResponsiveContainer
      width="100%"
      height={200}
      className="flex-shrink md:pr-32"
    >
      <LineChart data={data}>
        {/* Define Gradient */}
        <defs>
          <linearGradient
            id="colorGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            className="text-primary"
          >
            <stop offset="0%" stop-color="currentColor" />
            <stop offset="100%" stopColor="white" stopOpacity={0.3} />
          </linearGradient>
        </defs>

        {/* Line with Gradient */}
        <Line
          type="monotone"
          dataKey="value"
          stroke="url(#colorGradient)"
          strokeWidth={2}
          dot={{ r: 3, fill: "#D946EF" }} // Customize dot size and color
        />

        {/* X-Axis */}
        <XAxis
          dataKey="label"
          tick={{ fill: "#E5E7EB" }} // X-axis label color
          axisLine={false}
          tickLine={false}
        />

        {/* Y-Axis (Hidden) */}
        <YAxis hide={true} />

        {/* Tooltip */}
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
