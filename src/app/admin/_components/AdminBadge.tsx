"use client";

const areaColors: Record<string, string> = {
  RAC:          'bg-blue-100 text-blue-700',
  DOCT:         'bg-purple-100 text-purple-700',
  Estandares:   'bg-teal-100 text-teal-700',
  STR:          'bg-indigo-100 text-indigo-700',
  FFQQ:         'bg-cyan-100 text-cyan-700',
  Microbiologia:'bg-emerald-100 text-emerald-700',
  Micro:        'bg-emerald-100 text-emerald-700',
  STCC:         'bg-orange-100 text-orange-700',
  DT:           'bg-sky-100 text-sky-700',
  DG:           'bg-green-100 text-green-700',
  TI:           'bg-slate-100 text-slate-700',
};

const tipoColors: Record<string, string> = {
  Tecnica:       'bg-blue-100 text-blue-700',
  Procedimiento: 'bg-orange-100 text-orange-700',
  Administrativa:'bg-amber-100 text-amber-700',
  Comite:        'bg-purple-100 text-purple-700',
  Equipo:        'bg-red-100 text-red-700',
};

export function AreaBadge({ area }: { area: string }) {
  const cls = areaColors[area] ?? 'bg-slate-100 text-slate-600';
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold ${cls}`}>{area}</span>;
}

export function TipoBadge({ tipo }: { tipo: string }) {
  const cls = tipoColors[tipo] ?? 'bg-slate-100 text-slate-600';
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold ${cls}`}>{tipo}</span>;
}

export function EstadoBadge({ estado }: { estado: string }) {
  const isActivo = estado === 'Activo' || estado === 'Activa';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${isActivo ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isActivo ? 'bg-green-500' : 'bg-slate-400'}`} />
      {estado}
    </span>
  );
}

export function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-600">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export const inputCls = "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white";
export const selectCls = "w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white";

export function ModalFooter({ onClose, submitLabel, danger }: { onClose: () => void; submitLabel: string; danger?: boolean }) {
  return (
    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
      <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
        Cancelar
      </button>
      <button type="submit" className={`px-5 py-2 text-sm font-semibold text-white rounded-lg transition-colors ${danger ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary-dark'}`}>
        {submitLabel}
      </button>
    </div>
  );
}
