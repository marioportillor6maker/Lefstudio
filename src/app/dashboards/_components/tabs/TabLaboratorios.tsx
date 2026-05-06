"use client";

import { DashMetricCard } from '../DashMetricCard';
import { PruebasLabChart } from '../charts/PruebasLabChart';
import { labMetrics, pruebasTipoData, analistasCards } from '../../_data/dashboardMockData';

export function TabLaboratorios() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {labMetrics.map((m, i) => <DashMetricCard key={i} {...m} />)}
      </div>

      <PruebasLabChart data={pruebasTipoData} />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Carga por Analista</h3>
          <p className="text-xs text-slate-500 mt-0.5">Progreso individual FFQQ y Microbiologia</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {analistasCards.map((card, i) => {
            const pct = Math.round((card.completadas / card.asignadas) * 100);
            const isFFQQ = card.area === 'FFQQ';
            return (
              <div key={i} className="border border-slate-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 ${isFFQQ ? 'bg-teal-600' : 'bg-amber-500'}`}>
                    {card.nombre.split(' ').map(w => w[0]).slice(1, 3).join('')}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{card.nombre}</p>
                    <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded ${isFFQQ ? 'bg-teal-100 text-teal-700' : 'bg-amber-100 text-amber-700'}`}>
                      {card.area}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                  <span>Completadas: <span className="font-bold text-slate-700">{card.completadas}</span>/{card.asignadas}</span>
                  <span className="font-bold text-slate-700">{pct}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5">{card.enProceso} en proceso actualmente</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
