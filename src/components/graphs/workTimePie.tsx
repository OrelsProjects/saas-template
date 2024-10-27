"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export interface PieChartItem {
  name: string;
  value: number;
  color: string;
}

// Data for the chart
const data: PieChartItem[] = [
  { name: "Home", value: 50, color: "#4F46E5" },
  { name: "Office", value: 25, color: "#10B981" },
  { name: "Cafe", value: 25, color: "#D946EF" },
];

interface LegendItemProps {
  color: string;
  label: string;
}

// Custom Legend Item
const LegendItem: React.FC<LegendItemProps> = ({ color, label }) => {
  return (
    <div className="flex items-center justify-center gap-0.5 md:gap-1.5">
      <span
        className="w-2 h-2 md:w-3 md:h-3"
        style={{ backgroundColor: color }}
      ></span>
      <span className="text-[8px] md:text-xs text-center">{label}</span>
    </div>
  );
};

const WorkTimeChart: React.FC = () => {
  return (
    <div className="relative w-3/4 h-full flex flex-col justify-center items-center">
      <ResponsiveContainer
        height={120}
        width={120}
        className="overflow-visible"
      >
        <PieChart>
          <Pie
            overflow="visible"
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="60%"
            innerRadius="30%" // Creates the donut effect
            outerRadius="45%"
            stroke="none"
            fontSize={12}
            label={(label) => label.value + "%"}
            labelLine
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                className="overflow-visible"
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Custom Legend */}
      <div className="flex justify-center mt-4 text-white gap-1.5">
        {data.map((entry, index) => (
          <LegendItem key={index} color={entry.color} label={entry.name} />
        ))}
      </div>
    </div>
  );
};

export default WorkTimeChart;
