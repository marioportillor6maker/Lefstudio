"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Eye, Search, AlertTriangle } from 'lucide-react';
import { INCOME_RECORDS } from '../_data/incomeMockData';
import { EstadoBadge, TipoBadge, SlaBadge, PrioridadBadge } from '../_components/IncomeBadges';

export default function Vista360SearchPage() {
  const [q, setQ] = useState('');

  const filtered = INCOME_RECORDS.filter(r => {
    if (!q) return true;
    const lower = q.toLowerCase();
    return (
      r.correlativo.toLowerCase().includes(lower) ||
      r.producto.toLowerCase().includes(lower) ||
      r.empresa.toLowerCase().includes(lower)
    );
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0">
        <h2 className="text-base font-black text-slate-800">Vista 360 — Expedientes</h2>
        <p className="text-xs text-slate-500 mt-0.5">Selecciona un expediente para ver su Vista 360 completa</p>
        <div className="relative mt-3 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            autoFocus
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Buscar por correlativo, producto, empresa..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 sticky top-0">
              <Th>Correlativo</Th>
              <Th>Producto / Empresa</Th>
              <Th>Tipo</Th>
              <Th>Estado</Th>
              <Th>SLA</Th>
              <Th>Prioridad</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {r.bloqueado && <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />}
                    <span className="font-mono text-xs font-bold text-slate-700">{r.correlativo}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">{r.fechaIngreso}</p>
                </td>
                <td className="px-4 py-3 max-w-[220px]">
                  <p className="text-xs font-semibold text-slate-800 truncate">{r.producto}</p>
                  <p className="text-[10px] text-slate-400 truncate">{r.empresa}</p>
                </td>
                <td className="px-4 py-3"><TipoBadge tipo={r.tipoTramite} /></td>
                <td className="px-4 py-3"><EstadoBadge estado={r.estadoActual} /></td>
                <td className="px-4 py-3"><SlaBadge sla={r.sla} dias={r.diasTranscurridos} limite={r.diasLimite} /></td>
                <td className="px-4 py-3"><PrioridadBadge prioridad={r.prioridad} /></td>
                <td className="px-4 py-3">
                  <Link
                    href={`/ingresos/${r.correlativo}/vista-360`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary-dark text-white text-[10px] font-bold rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Eye className="w-3 h-3" /> Ver 360
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400 text-sm">
                  No se encontraron expedientes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-2.5 border-t border-slate-200 bg-slate-50 shrink-0">
        <span className="text-xs text-slate-500">
          {filtered.length} expediente{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th className="px-4 py-2.5 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
      {children}
    </th>
  );
}
