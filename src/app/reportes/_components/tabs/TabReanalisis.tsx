"use client";

import { MetricCard }        from '../MetricCard';
import { StatusBadge, resolveVariant } from '../StatusBadge';
import { reanalisisMetrics, reanalisisTableData } from '../../_data/reportsMockData';

export function TabReanalisis() {
  return (
    <div className="space-y-6">
      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {reanalisisMetrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Detalle de Reanálisis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Recepción','Producto','Prueba','Motivo','Fecha Orden','Analista','Resultado','Estado'].map((col) => (
                  <th key={col} className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reanalisisTableData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-primary text-xs">{row.recepcion}</td>
                  <td className="px-4 py-3 font-medium text-slate-800 text-xs">{row.producto}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{row.prueba}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs max-w-[180px] truncate" title={row.motivo}>
                    {row.motivo}
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{row.fechaOrden}</td>
                  <td className="px-4 py-3 text-slate-700 text-xs font-medium">{row.analista}</td>
                  <td className="px-4 py-3">
                    {row.resultado === '—' ? (
                      <span className="text-slate-400 text-xs">—</span>
                    ) : (
                      <StatusBadge variant={resolveVariant(row.resultado)} label={row.resultado} />
                    )}
                  </td>
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
