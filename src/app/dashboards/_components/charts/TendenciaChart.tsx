"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { TendenciaData } from '../../_types/dashboard.types';

export function TendenciaChart({ data }: { data: TendenciaData[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-sm font-bold text-slate-800 mb-1">Tendencia de Ingresos — Ultimos 5 Meses</h3>
      <p className="text-xs text-slate-500 mb-4">Ingresos totales vs. casos conformes emitidos</p>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="gradIngresos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#025f85" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#025f85" stopOpacity={0}   />
              </linearGradient>
              <linearGradient id="gradConformes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#16a34a" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
            />
            <Legend wrapperStyle={{ paddingTop: '12px', fontSize: '12px' }}
              formatter={(v) => <span style={{ color: '#475569', fontWeight: 600 }}>{v}</span>}
            />
            <Area type="monotone" dataKey="ingresos"  name="Ingresos"  stroke="#025f85" fill="url(#gradIngresos)"  strokeWidth={2} dot={{ r: 4, fill: '#025f85' }} />
            <Area type="monotone" dataKey="conformes" name="Conformes" stroke="#16a34a" fill="url(#gradConformes)" strokeWidth={2} dot={{ r: 4, fill: '#16a34a' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
