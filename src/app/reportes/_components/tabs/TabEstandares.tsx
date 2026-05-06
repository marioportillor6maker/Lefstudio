"use client";

import { MetricCard }        from '../MetricCard';
import { StatusBadge, resolveVariant } from '../StatusBadge';
import { estandaresMetrics, estandaresTableData } from '../../_data/reportsMockData';

export function TabEstandares() {
  return (
    <div className="space-y-6">
      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {estandaresMetrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">
            Reporte de Estándares — Enero 2024
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Estándar','Lote','Cantidad Inicial','Usado','Saldo','Vencimiento','Estado'].map((col) => (
                  <th key={col} className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {estandaresTableData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800 text-xs max-w-[240px]">
                    {row.estandar}
                  </td>
                  <td className="px-4 py-3 font-mono text-primary text-xs">{row.lote}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{row.cantidadInicial}</td>
                  <td className={`px-4 py-3 text-xs font-medium ${row.usadoMg > 0 ? 'text-red-600' : 'text-slate-500'}`}>
                    {row.usado}
                  </td>
                  <td className="px-4 py-3 text-xs font-bold text-slate-900">{row.saldo}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{row.vencimiento}</td>
                  <td className="px-4 py-3">
                    <StatusBadge variant={resolveVariant(row.estado)} label={row.estado} />
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
