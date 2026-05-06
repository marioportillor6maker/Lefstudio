"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import type { PendienteTipoData } from '../../_types/dashboard.types';

export function PendientesTipoChart({ data }: { data: PendienteTipoData[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-sm font-bold text-slate-800 mb-1">Pendientes por Tipo de Solicitud</h3>
      <p className="text-xs text-slate-500 mb-4">Documentacion en espera por tipo de RT</p>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }} barSize={18}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis dataKey="tipo" type="category" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} width={60} />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
              cursor={{ fill: '#f8fafc' }}
            />
            <Bar dataKey="pendientes" name="Pendientes" radius={[0, 4, 4, 0]}>
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color ?? '#025f85'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
