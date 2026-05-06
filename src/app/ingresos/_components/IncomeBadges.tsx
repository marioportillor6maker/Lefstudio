import type { IncomeStatus, SlaStatus, TipoTramite, NivelPrioridad } from '../_types/income.types';

// ─── Estado Badge ─────────────────────────────────────────────────────────────
const estadoConfig: Record<IncomeStatus, { bg: string; text: string; label: string }> = {
  RAC:        { bg: 'bg-blue-50',   text: 'text-blue-700',   label: 'RAC' },
  DOCT:       { bg: 'bg-purple-50', text: 'text-purple-700', label: 'DOCT' },
  ESTANDAR:   { bg: 'bg-orange-50', text: 'text-orange-700', label: 'Estándar' },
  FFQQ:       { bg: 'bg-teal-50',   text: 'text-teal-700',   label: 'FFQQ' },
  MICRO:      { bg: 'bg-cyan-50',   text: 'text-cyan-700',   label: 'Micro' },
  STCC:       { bg: 'bg-indigo-50', text: 'text-indigo-700', label: 'STCC' },
  DT:         { bg: 'bg-violet-50', text: 'text-violet-700', label: 'Dir. Técnica' },
  DG:         { bg: 'bg-pink-50',   text: 'text-pink-700',   label: 'Dir. General' },
  FINALIZADO: { bg: 'bg-green-50',  text: 'text-green-700',  label: 'Finalizado' },
  DEVUELTO:   { bg: 'bg-red-50',    text: 'text-red-700',    label: 'Devuelto' },
  ANULADO:    { bg: 'bg-slate-100', text: 'text-slate-500',  label: 'Anulado' },
};

export function EstadoBadge({ estado }: { estado: IncomeStatus }) {
  const cfg = estadoConfig[estado];
  return (
    <span className={`inline-block ${cfg.bg} ${cfg.text} text-[10px] font-bold px-2 py-0.5 rounded-full border border-current/20`}>
      {cfg.label}
    </span>
  );
}

// ─── SLA Badge ────────────────────────────────────────────────────────────────
export function SlaBadge({ sla, dias, limite }: { sla: SlaStatus; dias: number; limite: number }) {
  const pct = Math.min(100, Math.round((dias / limite) * 100));
  if (sla === 'ok') {
    return (
      <div className="flex flex-col items-end gap-0.5">
        <span className="text-[10px] font-bold text-green-600">{dias}/{limite}d</span>
        <div className="w-16 h-1.5 bg-green-100 rounded-full"><div className="h-full bg-green-500 rounded-full" style={{ width: `${pct}%` }} /></div>
      </div>
    );
  }
  if (sla === 'warning') {
    return (
      <div className="flex flex-col items-end gap-0.5">
        <span className="text-[10px] font-bold text-amber-600">{dias}/{limite}d</span>
        <div className="w-16 h-1.5 bg-amber-100 rounded-full"><div className="h-full bg-amber-500 rounded-full" style={{ width: `${pct}%` }} /></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-end gap-0.5">
      <span className="text-[10px] font-bold text-red-600">{dias}/{limite}d</span>
      <div className="w-16 h-1.5 bg-red-100 rounded-full"><div className="h-full bg-red-500 rounded-full" style={{ width: `${Math.min(100, pct)}%` }} /></div>
    </div>
  );
}

// ─── Tipo Tramite Badge ───────────────────────────────────────────────────────
const tipoConfig: Record<TipoTramite, { bg: string; text: string }> = {
  'Registro Sanitario': { bg: 'bg-blue-50',   text: 'text-blue-700' },
  'Renovacion':         { bg: 'bg-green-50',  text: 'text-green-700' },
  'Modificacion':       { bg: 'bg-orange-50', text: 'text-orange-700' },
  'Reanalisis':         { bg: 'bg-yellow-50', text: 'text-yellow-700' },
  'Homologacion':       { bg: 'bg-purple-50', text: 'text-purple-700' },
};

export function TipoBadge({ tipo }: { tipo: TipoTramite }) {
  const cfg = tipoConfig[tipo];
  return (
    <span className={`inline-block ${cfg.bg} ${cfg.text} text-[10px] font-semibold px-2 py-0.5 rounded-md border border-current/20`}>
      {tipo}
    </span>
  );
}

// ─── Prioridad Badge ──────────────────────────────────────────────────────────
export function PrioridadBadge({ prioridad }: { prioridad: NivelPrioridad }) {
  if (prioridad === 'Alta') return <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-red-600"><span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />Alta</span>;
  if (prioridad === 'Media') return <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-600"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />Media</span>;
  return <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-slate-500"><span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />Baja</span>;
}

// ─── Cumple Badge ─────────────────────────────────────────────────────────────
export function CumpleBadge({ cumple }: { cumple: boolean | null | undefined }) {
  if (cumple === true) return <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Cumple</span>;
  if (cumple === false) return <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">No cumple</span>;
  return <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">En proceso</span>;
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
export function ProgressBar({ value, color = 'bg-primary' }: { value: number; color?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-[10px] font-semibold text-slate-500 w-7 text-right">{value}%</span>
    </div>
  );
}
