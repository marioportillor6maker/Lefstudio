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
import type { CargaChartData } from '../../_types/reports.types';

interface CargaAnalistaChartProps {
  data: CargaChartData[];
}

const TOOLTIP_STYLE = {
  borderRadius: '8px',
  border: 'none',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  fontSize: '12px',
};

export function CargaAnalistaChart({ data }: CargaAnalistaChartProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-sm font-bold text-slate-800 mb-4">
        Carga por Analista — Enero 2024
      </h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="analista"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              allowDecimals={false}
            />
            <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: '#f8fafc' }} />
            <Legend
              wrapperStyle={{ paddingTop: '16px', fontSize: '12px' }}
              formatter={(value) => (
                <span style={{ color: '#475569', fontWeight: 600 }}>{value}</span>
              )}
            />
            <Bar dataKey="Total"      fill="#025f85" radius={[4, 4, 0, 0]} barSize={24} name="Pruebas Total" />
            <Bar dataKey="Completadas" fill="#0d9488" radius={[4, 4, 0, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
