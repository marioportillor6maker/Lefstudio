"use client";

import { CargaAnalistaChart } from '../charts/CargaAnalistaChart';
import { ProgressBar }        from '../ProgressBar';
import { cargaChartData, cargaTableData } from '../../_data/reportsMockData';

export function TabCargaAnalista() {
  return (
    <div className="space-y-6">
      {/* Chart */}
      <CargaAnalistaChart data={cargaChartData} />

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">
            Detalle por Analista — Enero 2024
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Analista','Área','Casos Asig.','Pruebas Totales','Completadas','Pendientes','% Avance'].map((col) => (
                  <th key={col} className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cargaTableData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-800 text-xs">{row.analista}</td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                      {row.area}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 text-xs font-medium text-center">
                    {row.casosAsignados}
                  </td>
                  <td className="px-4 py-3 text-slate-700 text-xs text-center">
                    {row.pruebasTotales}
                  </td>
                  <td className="px-4 py-3 text-green-700 font-bold text-xs text-center">
                    {row.completadas}
                  </td>
                  <td className="px-4 py-3 text-amber-700 font-bold text-xs text-center">
                    {row.pendientes}
                  </td>
                  <td className="px-4 py-3 min-w-[140px]">
                    <ProgressBar value={row.avancePct} />
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
