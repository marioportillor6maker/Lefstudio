"use client";

import { DashMetricCard } from '../DashMetricCard';
import { RacTiempoChart } from '../charts/RacTiempoChart';
import { racMetrics, racTiempoData, proformasData } from '../../_data/dashboardMockData';

const estadoBadge = (estado: string) => {
  if (estado === 'pagado')   return 'bg-green-100 text-green-700';
  if (estado === 'vencido')  return 'bg-red-100 text-red-700';
  return 'bg-amber-100 text-amber-700';
};

export function TabRac() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {racMetrics.map((m, i) => <DashMetricCard key={i} {...m} />)}
      </div>

      <RacTiempoChart data={racTiempoData} />

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Seguimiento de Proformas</h3>
          <p className="text-xs text-slate-500 mt-0.5">Estado actual de cobros pendientes</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3 text-left">Codigo</th>
                <th className="px-6 py-3 text-left">Empresa</th>
                <th className="px-6 py-3 text-right">Monto (L.)</th>
                <th className="px-6 py-3 text-center">Estado</th>
                <th className="px-6 py-3 text-right">Dias Espera</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {proformasData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-mono text-xs text-primary font-semibold">{row.codigo}</td>
                  <td className="px-6 py-3 text-slate-700 font-medium">{row.empresa}</td>
                  <td className="px-6 py-3 text-right font-semibold text-slate-800">
                    {row.monto.toLocaleString('es-HN')}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${estadoBadge(row.estado)}`}>
                      {row.estado}
                    </span>
                  </td>
                  <td className={`px-6 py-3 text-right font-bold text-sm ${row.diasEspera > 10 ? 'text-red-600' : row.diasEspera > 5 ? 'text-amber-600' : 'text-slate-700'}`}>
                    {row.diasEspera}d
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
