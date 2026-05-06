import { TrendingUp, Minus } from 'lucide-react';
import type { IncomeDetail } from '../../_types/income.types';

interface Props { detail: IncomeDetail }

export function PanelComparador({ detail }: Props) {
  const prev = detail.historico[0] ?? null;

  const rows = [
    { label: 'Lote',      actual: detail.productoDetalle.lote ?? '—',  anterior: prev?.lote ?? '—',           changed: true },
    { label: 'Resultado', actual: 'En análisis',                        anterior: 'Conforme',                   changed: true },
    { label: 'Analista',  actual: 'Karla Suazo',                        anterior: 'Karla Suazo',                changed: false },
    { label: 'Trámite',   actual: 'Control de Calidad',                 anterior: 'Control de Calidad',         changed: false },
    { label: 'Fecha',     actual: detail.rac.fechaIngreso,              anterior: prev?.fechaIngreso ?? '—',    changed: true },
  ];

  return (
    <div className="flex flex-col gap-4 overflow-y-auto h-full">
      <p className="text-sm font-black text-slate-700 shrink-0">Comparador Histórico</p>

      {!prev ? (
        <p className="text-center text-slate-400 text-xs py-6">No hay expedientes anteriores para comparar.</p>
      ) : (
        <>
          {/* Column headers */}
          <div className="grid grid-cols-2 gap-2 shrink-0">
            <div className="rounded-xl px-3 py-2 text-center" style={{ backgroundColor: 'var(--color-primary)' }}>
              <p className="text-[9px] font-black text-white/70 uppercase tracking-wider">ACTUAL</p>
              <p className="text-[11px] font-bold text-white font-mono mt-0.5">{detail.correlativo}</p>
            </div>
            <div className="rounded-xl px-3 py-2 text-center bg-purple-100 border border-purple-200">
              <p className="text-[9px] font-black text-purple-400 uppercase tracking-wider">ANTERIOR</p>
              <p className="text-[11px] font-bold text-purple-700 font-mono mt-0.5">{prev.correlativo}</p>
            </div>
          </div>

          {/* Comparison rows */}
          <div className="space-y-2 shrink-0">
            {rows.map((row, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-slate-600">{row.label}</p>
                  {row.changed
                    ? <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                    : <Minus className="w-3.5 h-3.5 text-slate-300" />
                  }
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-blue-50 px-2.5 py-2">
                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-wider mb-0.5">ACTUAL</p>
                    <p className="text-xs font-semibold text-slate-700">{row.actual}</p>
                  </div>
                  <div className="rounded-lg bg-purple-50 px-2.5 py-2">
                    <p className="text-[9px] font-black text-purple-400 uppercase tracking-wider mb-0.5">ANTERIOR</p>
                    <p className="text-xs font-semibold text-slate-600">{row.anterior}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Previous receptions */}
          <div className="shrink-0">
            <p className="text-xs font-bold text-slate-600 mb-2">
              Todas las Recepciones Previas ({detail.historico.length})
            </p>
            <div className="space-y-2">
              {detail.historico.map((h, i) => {
                const isConforme = h.resultado === 'conforme';
                return (
                  <div key={i} className="flex items-center gap-2.5 py-2 border-b border-slate-100 last:border-0">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${isConforme ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-slate-700 font-mono">{h.correlativo}</p>
                      <p className="text-[10px] text-slate-400">{h.fechaIngreso}{h.lote ? ` · Lote: ${h.lote}` : ''}</p>
                    </div>
                    <span className={`text-[11px] font-bold shrink-0 ${isConforme ? 'text-green-600' : 'text-red-500'}`}>
                      {isConforme ? 'Conforme' : 'No Conf.'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
