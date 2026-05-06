"use client";

import { useState } from 'react';
import type { IncomeDetail } from '../../_types/income.types';
import { FileText, Eye, Pencil, Download, Plus, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface Props { detail: IncomeDetail }

const ALL_AREAS = 'Todas las áreas';
const ALL_ESTADOS = 'Todos los estados';

function EstadoChip({ estado }: { estado: string }) {
  if (estado === 'completado') return (
    <span className="flex items-center gap-1 text-[10px] font-bold text-green-700">
      <CheckCircle2 className="w-3 h-3" />Aprobado
    </span>
  );
  if (estado === 'rechazado') return (
    <span className="flex items-center gap-1 text-[10px] font-bold text-red-600">
      <XCircle className="w-3 h-3" />Rechazado
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600">
      <Clock className="w-3 h-3" />En Revisión
    </span>
  );
}

export function TabDocumentos({ detail }: Props) {
  const { documentos } = detail;
  const [areaFilter, setAreaFilter]     = useState(ALL_AREAS);
  const [estadoFilter, setEstadoFilter] = useState(ALL_ESTADOS);

  const areas = [ALL_AREAS, ...Array.from(new Set(documentos.map(d => d.area)))];
  const estados = [ALL_ESTADOS, 'completado', 'pendiente', 'rechazado'];

  const filtered = documentos.filter(d => {
    if (areaFilter !== ALL_AREAS && d.area !== areaFilter) return false;
    if (estadoFilter !== ALL_ESTADOS && d.estado !== estadoFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <select
          value={areaFilter}
          onChange={e => setAreaFilter(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        >
          {areas.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <select
          value={estadoFilter}
          onChange={e => setEstadoFilter(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        >
          {estados.map(e => (
            <option key={e} value={e}>
              {e === 'completado' ? 'Aprobados' : e === 'pendiente' ? 'En revisión' : e === 'rechazado' ? 'Rechazados' : e}
            </option>
          ))}
        </select>
        <span className="text-xs text-slate-500 font-medium">
          {filtered.length} de {documentos.length} formatos
        </span>
        <div className="ml-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-lg transition-colors">
            <Plus className="w-3.5 h-3.5" />Nuevo Formato
          </button>
        </div>
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <p className="text-slate-400 text-sm">No hay formatos con los filtros seleccionados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {filtered.map(doc => (
            <DocCard key={doc.id} doc={doc} />
          ))}
        </div>
      )}
    </div>
  );
}

function DocCard({ doc }: { doc: IncomeDetail['documentos'][0] }) {
  const areaBg: Record<string, string> = {
    'RAC':           'bg-blue-50 text-blue-700 border-blue-200',
    'DOCT':          'bg-purple-50 text-purple-700 border-purple-200',
    'Estándar':      'bg-orange-50 text-orange-700 border-orange-200',
    'FFQQ':          'bg-teal-50 text-teal-700 border-teal-200',
    'Microbiología': 'bg-cyan-50 text-cyan-700 border-cyan-200',
    'Dir. Técnica':  'bg-violet-50 text-violet-700 border-violet-200',
  };
  const areaCls = areaBg[doc.area] ?? 'bg-slate-100 text-slate-600 border-slate-200';

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-primary/30 hover:shadow-sm transition-all flex flex-col">
      {/* Card header */}
      <div className="p-4 flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-slate-500" />
            </div>
            <div>
              <span className="text-xs font-black text-slate-700 font-mono">{doc.codigo}</span>
              <span className="text-[10px] text-slate-400 ml-1">v1.0</span>
            </div>
          </div>
          <EstadoChip estado={doc.estado} />
        </div>

        <p className="text-xs font-semibold text-slate-800 leading-snug">{doc.nombre}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${areaCls}`}>{doc.area}</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">Prellenado</span>
        </div>

        {/* Author / date */}
        <p className="text-[10px] text-slate-400 mt-2">
          {doc.responsable ?? '—'}
          {doc.fechaCompletado ? ` · ${doc.fechaCompletado}` : ''}
        </p>
      </div>

      {/* Card footer actions */}
      <div className="flex items-center gap-0 border-t border-slate-100">
        <button className="flex-1 flex items-center justify-center gap-1 py-2 text-[10px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors rounded-bl-xl">
          <Eye className="w-3 h-3" />Ver
        </button>
        <div className="w-px h-5 bg-slate-100" />
        <button className="flex-1 flex items-center justify-center gap-1 py-2 text-[10px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors">
          <Pencil className="w-3 h-3" />Editar
        </button>
        <div className="w-px h-5 bg-slate-100" />
        <button className="flex-1 flex items-center justify-center gap-1 py-2 text-[10px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors rounded-br-xl">
          <Download className="w-3 h-3" />PDF
        </button>
      </div>
    </div>
  );
}
