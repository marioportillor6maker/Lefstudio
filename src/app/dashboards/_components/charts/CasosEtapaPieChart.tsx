"use client";

import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { PieLabelRenderProps } from 'recharts';
import type { EtapaPieData } from '../../_types/dashboard.types';

const renderLabel = (props: PieLabelRenderProps) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  if (cx == null || cy == null || midAngle == null || innerRadius == null || outerRadius == null || percent == null) return null;
  if (percent < 0.06) return null;
  const RADIAN = Math.PI / 180;
  const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
  const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
  const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function CasosEtapaPieChart({ data }: { data: EtapaPieData[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-sm font-bold text-slate-800 mb-1">Distribucion de Casos por Etapa</h3>
      <p className="text-xs text-slate-500 mb-4">Estado consolidado — 142 casos activos</p>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="45%" innerRadius={65} outerRadius={100} dataKey="value" labelLine={false} label={renderLabel}>
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
              formatter={(v) => [`${v} casos`]}
            />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ paddingTop: '8px', fontSize: '11px' }}
              formatter={(v) => <span style={{ color: '#475569', fontWeight: 600 }}>{v}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
