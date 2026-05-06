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
import type { IngresoChartData } from '../../_types/reports.types';

interface IngresosChartProps {
  data: IngresoChartData[];
}

const TOOLTIP_STYLE = {
  borderRadius: '8px',
  border: 'none',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  fontSize: '12px',
};

export function IngresosChart({ data }: IngresosChartProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-sm font-bold text-slate-800 mb-4">
        Ingresos por Mes — Últimos 5 Meses
      </h3>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="mes"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: '#f8fafc' }} />
            <Legend
              wrapperStyle={{ paddingTop: '16px', fontSize: '12px' }}
              formatter={(value) => (
                <span style={{ color: '#475569', fontWeight: 600 }}>{value}</span>
              )}
            />
            <Bar dataKey="Conformes"   fill="#16a34a" radius={[4, 4, 0, 0]} barSize={24} />
            <Bar dataKey="NoConformes" fill="#ba3d3d" radius={[4, 4, 0, 0]} barSize={24} name="No Conformes" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
