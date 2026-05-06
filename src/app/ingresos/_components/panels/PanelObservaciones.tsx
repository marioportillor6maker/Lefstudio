'use client';
import { useState } from 'react';
import type { Observation } from '../../_types/income.types';

interface Props { observaciones: Observation[] }

export function PanelObservaciones({ observaciones }: Props) {
  const [nueva, setNueva] = useState('');

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Cards list */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {observaciones.length === 0 && (
          <p className="text-center text-slate-400 text-sm py-8">No hay observaciones registradas.</p>
        )}
        {observaciones.map(obs => (
          <ObsCard key={obs.id} obs={obs} />
        ))}
      </div>

      {/* Nueva observación */}
      <div className="shrink-0 border-t border-slate-100 pt-3">
        <p className="text-xs font-bold text-slate-700 mb-2">Nueva Observación</p>
        <textarea
          rows={3}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 placeholder:text-slate-300 focus:outline-none resize-none"
          placeholder="Escribe una observación interárea..."
          value={nueva}
          onChange={e => setNueva(e.target.value)}
        />
        <button
          className="mt-2 w-full py-2.5 rounded-xl text-xs font-bold text-white transition-colors"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          Registrar Observación
        </button>
      </div>
    </div>
  );
}

function ObsCard({ obs }: { obs: Observation }) {
  const isAprobacion = obs.tipo === 'aprobacion';

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2">
      {/* Header: tipo badge + ruta badge + hora */}
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
          isAprobacion
            ? 'bg-green-50 text-green-700 border-green-200'
            : 'bg-orange-50 text-orange-600 border-orange-200'
        }`}>
          {isAprobacion ? 'Aprobación' : 'Obs.'}
        </span>
        {obs.ruta && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
            {obs.ruta}
          </span>
        )}
        <span className="ml-auto text-[10px] text-slate-400">{obs.hora}</span>
      </div>

      {/* Text */}
      <p className="text-xs text-slate-700 leading-relaxed">{obs.texto}</p>

      {/* Footer: user + date */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium" style={{ color: 'var(--color-primary)' }}>{obs.usuario}</span>
        <span className="text-[10px] text-slate-400">{obs.fecha}</span>
      </div>
    </div>
  );
}
