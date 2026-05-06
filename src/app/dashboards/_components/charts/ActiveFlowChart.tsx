"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import type { FlowEtapaData } from '../../_types/dashboard.types';

const COLORS = ['#025f85','#0284c7','#0ea5e9','#38bdf8','#0d9488','#14b8a6','#a7c051','#84cc16'];

export function ActiveFlowChart({ data }: { data: FlowEtapaData[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-sm font-bold text-slate-800 mb-1">Flujo Activo por Etapa</h3>
      <p className="text-xs text-slate-500 mb-4">Casos en proceso por modulo operativo</p>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="etapa"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
              cursor={{ fill: '#f8fafc' }}
            />
            <Bar dataKey="activos" name="Activos" radius={[4, 4, 0, 0]}>
              {data.map((_, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
