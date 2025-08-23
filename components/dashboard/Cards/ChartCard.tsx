
// File: components/dashboard/ChartCard.tsx
"use client";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface ChartCardProps {
  data: { name: string; total: number }[];
}

export function ChartCard({ data }: ChartCardProps) {
  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 shadow-lg backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-white mb-4">Weekly Activity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip cursor={{fill: 'rgba(255, 255, 255, 0.1)'}} contentStyle={{backgroundColor: '#1f2937', border: 'none', borderRadius: '8px'}} />
          <Bar dataKey="total" fill="rgba(74, 222, 128, 0.6)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}