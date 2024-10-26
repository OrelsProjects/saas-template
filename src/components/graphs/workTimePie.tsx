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
    <div className="flex items-center justify-center gap-0.5">
      <span className="w-2 h-2" style={{ backgroundColor: color }}></span>
      <span className="text-[8px] text-center">{label}</span>
    </div>
  );
};

const WorkTimeChart: React.FC = () => {
  return (
    <div className="relative w-3/4 h-full flex flex-col justify-center items-center">
      <ResponsiveContainer height={75} width={75} className="md:hidden">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="75%" // Creates the donut effect
            outerRadius="100%"
            stroke="none"
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
