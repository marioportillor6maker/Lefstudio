"use client";

import { TiempoEtapaChart } from '../charts/TiempoEtapaChart';
import { StatusBadge }      from '../StatusBadge';
import { tiemposChartData, tiemposTableData } from '../../_data/reportsMockData';

export function TabTiempos() {
  return (
    <div className="space-y-6">
      {/* Chart */}
      <TiempoEtapaChart data={tiemposChartData} />

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Detalle de Tiempos por Etapa</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Etapa','Promedio (días)','Meta (días)','Mínimo','Máximo','Casos','Cumplimiento'].map((col) => (
                  <th key={col} className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tiemposTableData.map((row) => (
                <tr key={row.etapa} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-800 text-xs">{row.etapa}</td>
                  <td className="px-4 py-3 text-slate-700 text-xs font-medium">{row.promedio}d</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{row.meta}d</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{row.minimo}d</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{row.maximo}d</td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{row.casos}</td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      variant={row.cumplimiento}
                      label={row.cumplimiento === 'en_meta' ? 'En Meta' : 'Fuera Meta'}
                    />
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
