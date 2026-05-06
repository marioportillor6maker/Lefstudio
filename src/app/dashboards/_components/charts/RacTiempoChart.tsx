"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer,
} from 'recharts';
import type { RacTiempoData } from '../../_types/dashboard.types';

export function RacTiempoChart({ data }: { data: RacTiempoData[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-sm font-bold text-slate-800 mb-1">Tiempo Promedio de Proceso RAC (dias)</h3>
      <p className="text-xs text-slate-500 mb-4">Promedio real vs. meta establecida (3 dias)</p>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 6]} unit="d" />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
              formatter={(v) => [`${v}d`]}
            />
            <Legend wrapperStyle={{ paddingTop: '12px', fontSize: '12px' }}
              formatter={(v) => <span style={{ color: '#475569', fontWeight: 600 }}>{v}</span>}
            />
            <ReferenceLine y={3} stroke="#f59e0b" strokeDasharray="5 3" strokeWidth={1.5} label={{ value: 'Meta', fill: '#f59e0b', fontSize: 10, position: 'right' }} />
            <Line type="monotone" dataKey="promedio" name="Promedio" stroke="#025f85" strokeWidth={2.5} dot={{ r: 5, fill: '#025f85' }} activeDot={{ r: 7 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
