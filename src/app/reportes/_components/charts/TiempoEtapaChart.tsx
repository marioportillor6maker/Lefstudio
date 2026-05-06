"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { TiempoChartData } from '../../_types/reports.types';

interface TiempoEtapaChartProps {
  data: TiempoChartData[];
}

const TOOLTIP_STYLE = {
  borderRadius: '8px',
  border: 'none',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  fontSize: '12px',
};

export function TiempoEtapaChart({ data }: TiempoEtapaChartProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-sm font-bold text-slate-800 mb-1">
        Tiempo Promedio por Etapa (dias) - Enero 2024
      </h3>
      <p className="text-xs text-slate-500 mb-4">
        Promedio real vs. meta establecida por area
      </p>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            barGap={3}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              domain={[0, 12]}
              unit="d"
            />
            <YAxis
              dataKey="etapa"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
              width={80}
            />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              cursor={{ fill: '#f8fafc' }}
              formatter={(value) => [`${value ?? 0}d`]}
            />
            <Legend
              wrapperStyle={{ paddingTop: '16px', fontSize: '12px' }}
              formatter={(value) => (
                <span style={{ color: '#475569', fontWeight: 600 }}>{value}</span>
              )}
            />
            <Bar dataKey="Promedio" fill="#025f85" radius={[0, 4, 4, 0]} barSize={12} />
            <Bar dataKey="Meta"     fill="#5eead4" radius={[0, 4, 4, 0]} barSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
