"use client";

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { MetricCard }        from '../MetricCard';
import { StatusBadge, resolveVariant } from '../StatusBadge';
import { IngresosChart }     from '../charts/IngresosChart';
import { TipoTramitePieChart } from '../charts/TipoTramitePieChart';
import {
  ingresosMetrics,
  ingresosChartData,
  tipoTramiteData,
  ingresosTableData,
} from '../../_data/reportsMockData';
import type { IngresoRow } from '../../_types/reports.types';

const SEARCH_FIELDS: (keyof IngresoRow)[] = [
  'recepcion', 'producto', 'cliente', 'tipo', 'estado', 'resultado',
];

export function TabIngresos() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return ingresosTableData;
    const q = query.toLowerCase();
    return ingresosTableData.filter((row) =>
      SEARCH_FIELDS.some((f) => String(row[f]).toLowerCase().includes(q)),
    );
  }, [query]);

  const diasColor = (n: number) =>
    n >= 22 ? 'text-red-600 font-bold' : n >= 20 ? 'text-amber-600 font-bold' : 'text-slate-700';

  return (
    <div className="space-y-6">
      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {ingresosMetrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <IngresosChart data={ingresosChartData} />
        <TipoTramitePieChart data={tipoTramiteData} />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">
            Lista Detallada de Ingresos — Enero 2024
          </h3>
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Recepción','Producto','Cliente','Tipo','Fecha Rec.','Días Totales','Estado','Resultado'].map((col) => (
                  <th key={col} className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-slate-400">
                    No se encontraron resultados para "{query}"
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr key={row.recepcion} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-primary text-xs">
                      {row.recepcion}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800 text-xs">
                      {row.producto}
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{row.cliente}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{row.tipo}</td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{row.fechaRec}</td>
                    <td className={`px-4 py-3 text-xs ${diasColor(row.diasNum)}`}>
                      {row.diasTotales}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge variant={resolveVariant(row.estado)} label={row.estado} />
                    </td>
                    <td className="px-4 py-3">
                      {row.resultado === '—' ? (
                        <span className="text-slate-400 text-xs">—</span>
                      ) : (
                        <StatusBadge variant={resolveVariant(row.resultado)} label={row.resultado} />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-slate-100 text-xs text-slate-400">
          {filtered.length} de {ingresosTableData.length} registros
        </div>
      </div>
    </div>
  );
}
