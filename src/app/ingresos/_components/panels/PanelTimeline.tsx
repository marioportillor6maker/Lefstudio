'use client';
import { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import type { TimelineEvent } from '../../_types/income.types';

interface Props { events: TimelineEvent[] }

const AREA_LABEL_COLORS: Record<string, string> = {
  RAC:          'text-purple-600',
  DOCT:         'text-blue-600',
  STR:          'text-cyan-600',
  FFQQ:         'text-emerald-600',
  Micro:        'text-teal-600',
  STCC:         'text-amber-600',
  Contabilidad: 'text-yellow-600',
  'Estándar':   'text-lime-600',
};

const DOT_COLORS: Record<TimelineEvent['tipo'], string> = {
  ingreso:     'bg-purple-500',
  documento:   'bg-blue-500',
  transicion:  'bg-primary',
  observacion: 'bg-amber-500',
  devolucion:  'bg-red-500',
  aprobacion:  'bg-green-500',
  bloqueo:     'bg-red-700',
};

export function PanelTimeline({ events }: Props) {
  const areas = ['Todas las áreas', ...Array.from(new Set(events.map(e => e.area)))];
  const tipos = ['Todos los tipos', 'ingreso', 'documento', 'transicion', 'observacion', 'aprobacion'];

  const [area, setArea] = useState('Todas las áreas');
  const [tipo, setTipo] = useState('Todos los tipos');

  const filtered = events.filter(e =>
    (area === 'Todas las áreas' || e.area === area) &&
    (tipo === 'Todos los tipos' || e.tipo === tipo),
  );

  return (
    <div className="flex flex-col h-full">
      {/* ── Filter row ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-3 shrink-0">
        <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <SelectChip value={area} onChange={setArea} options={areas} />
        <SelectChip value={tipo} onChange={setTipo} options={tipos} />
      </div>

      {/* ── Event count ────────────────────────────────────────────────── */}
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 shrink-0">
        {filtered.length} eventos
      </p>

      {/* ── Event list ─────────────────────────────────────────────────── */}
      <div className="space-y-5 overflow-y-auto custom-scrollbar flex-1 relative pl-1 before:absolute before:left-[6px] before:top-1 before:bottom-2 before:w-[2px] before:bg-slate-100">
        {filtered.map((ev) => {
          const dot = DOT_COLORS[ev.tipo] ?? 'bg-slate-400';
          const areaTone = AREA_LABEL_COLORS[ev.area] ?? 'text-slate-600';

          return (
            <div key={ev.id} className="relative pl-5">
              <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-white shadow-sm ${dot}`} />

              <div className="flex justify-between items-start mb-0.5 gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${areaTone}`}>{ev.area}</span>
                <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">{ev.fecha} {ev.hora}</span>
              </div>

              <p className="text-xs font-bold text-slate-800 leading-snug">{ev.accion}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{ev.usuario}</p>

              {ev.detalle && (
                <div className="mt-1.5 bg-slate-50 border border-slate-200 rounded p-2 text-[10px] text-slate-600 font-medium leading-relaxed">
                  {ev.detalle}
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-center text-slate-400 text-xs py-8">No hay eventos para los filtros seleccionados.</p>
        )}
      </div>
    </div>
  );
}

/* ──── Compact dropdown styled to match the reference ─────────────────── */
function SelectChip({
  value, onChange, options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative flex-1 min-w-0">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none text-xs border border-slate-200 rounded-md pl-2.5 pr-7 py-1.5 bg-white text-slate-700 hover:border-slate-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 cursor-pointer"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
    </div>
  );
}
