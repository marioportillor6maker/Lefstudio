"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import type { ProductividadChartData } from '../../_types/reports.types';

interface ProductividadChartProps {
  data: ProductividadChartData[];
  metaValue?: number;
}

const TOOLTIP_STYLE = {
  borderRadius: '8px',
  border: 'none',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  fontSize: '12px',
};

export function ProductividadChart({ data, metaValue = 6 }: ProductividadChartProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-sm font-bold text-slate-800 mb-1">
        Productividad Semanal — Enero 2024
      </h3>
      <p className="text-xs text-slate-500 mb-4">
        Ingresos completados por semana vs. meta ({metaValue}/semana)
      </p>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="semana"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              domain={[0, 10]}
              allowDecimals={false}
            />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend
              wrapperStyle={{ paddingTop: '16px', fontSize: '12px' }}
              formatter={(value) => (
                <span style={{ color: '#475569', fontWeight: 600 }}>{value}</span>
              )}
            />
            <ReferenceLine
              y={metaValue}
              stroke="#f59e0b"
              strokeDasharray="6 3"
              strokeWidth={2}
              label={{
                value: `Meta: ${metaValue}`,
                position: 'insideTopRight',
                fill: '#d97706',
                fontSize: 11,
                fontWeight: 700,
              }}
            />
            <Line
              type="monotone"
              dataKey="Ingresos"
              stroke="#025f85"
              strokeWidth={2.5}
              dot={{ fill: '#025f85', r: 5, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
