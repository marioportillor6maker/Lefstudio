"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { PruebasTipoData } from '../../_types/dashboard.types';

export function PruebasLabChart({ data }: { data: PruebasTipoData[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-sm font-bold text-slate-800 mb-1">Pruebas Realizadas por Tipo</h3>
      <p className="text-xs text-slate-500 mb-4">FFQQ vs. Microbiologia — Enero 2024</p>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="tipo" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
              cursor={{ fill: '#f8fafc' }}
            />
            <Legend wrapperStyle={{ paddingTop: '12px', fontSize: '12px' }}
              formatter={(v) => <span style={{ color: '#475569', fontWeight: 600 }}>{v}</span>}
            />
            <Bar dataKey="ffqq"  name="FFQQ"         fill="#0d9488" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="micro" name="Microbiologia" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
