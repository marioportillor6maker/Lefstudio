"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { PieLabelRenderProps } from 'recharts';
import type { TipoTramiteData } from '../../_types/reports.types';

interface TipoTramitePieChartProps {
  data: TipoTramiteData[];
}

const TOOLTIP_STYLE = {
  borderRadius: '8px',
  border: 'none',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  fontSize: '12px',
};

const renderLabel = (props: PieLabelRenderProps) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  if (
    cx == null || cy == null || midAngle == null ||
    innerRadius == null || outerRadius == null || percent == null
  ) return null;
  if (percent < 0.06) return null;

  const RADIAN = Math.PI / 180;
  const cxNum = Number(cx);
  const cyNum = Number(cy);
  const irNum = Number(innerRadius);
  const orNum = Number(outerRadius);
  const radius = irNum + (orNum - irNum) * 0.5;
  const x = cxNum + radius * Math.cos(-midAngle * RADIAN);
  const y = cyNum + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={700}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function TipoTramitePieChart({ data }: TipoTramitePieChartProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-sm font-bold text-slate-800 mb-4">
        Distribucion por Tipo de Tramite
      </h3>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={95}
              dataKey="value"
              labelLine={false}
              label={renderLabel}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              formatter={(value) => [`${value}%`]}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: '12px', fontSize: '11px' }}
              formatter={(value) => (
                <span style={{ color: '#475569', fontWeight: 600 }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
