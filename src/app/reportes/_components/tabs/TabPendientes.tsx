"use client";

import { AlertTriangle } from 'lucide-react';
import { PendientesAreaChart } from '../charts/PendientesAreaChart';
import { pendientesChartData, alertasAreas } from '../../_data/reportsMockData';

export function TabPendientes() {
  return (
    <div className="space-y-6">
      {/* Chart */}
      <PendientesAreaChart data={pendientesChartData} />

      {/* Alert cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {alertasAreas.map((area, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col gap-1"
          >
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {area.titulo}
            </p>
            <p className="text-4xl font-black text-slate-900">{area.valor}</p>
            <p className="text-sm text-slate-600">{area.descripcion}</p>
            {area.alerta && (
              <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                {area.alerta}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary totals */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-wrap gap-6 text-sm">
        <div>
          <span className="text-slate-500 text-xs font-medium">Total pendientes</span>
          <p className="font-black text-slate-900 text-xl">
            {pendientesChartData.reduce((s, d) => s + d.Pendientes, 0)}
          </p>
        </div>
        <div>
          <span className="text-slate-500 text-xs font-medium">Total críticos</span>
          <p className="font-black text-red-600 text-xl">
            {pendientesChartData.reduce((s, d) => s + d.Criticos, 0)}
          </p>
        </div>
        <div>
          <span className="text-slate-500 text-xs font-medium">Áreas afectadas</span>
          <p className="font-black text-slate-900 text-xl">
            {pendientesChartData.filter((d) => d.Pendientes > 0).length}
          </p>
        </div>
      </div>
    </div>
  );
}
