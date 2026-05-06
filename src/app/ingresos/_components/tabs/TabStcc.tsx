'use client';
import { useState } from 'react';
import { Clock, CheckCircle2, CheckSquare, Square, Info, FileText, Users, RotateCcw, CheckCheck } from 'lucide-react';
import type { IncomeDetail, StccCheckItem } from '../../_types/income.types';

interface Props { detail: IncomeDetail }

export function TabStcc({ detail }: Props) {
  const { stccDtDg } = detail;

  const [checklist, setChecklist] = useState<StccCheckItem[]>(
    stccDtDg.stccChecklist ?? []
  );
  const [observacion, setObservacion] = useState(stccDtDg.stccObservacion ?? '');

  const toggleCheck = (id: string) =>
    setChecklist(list => list.map(c => c.id === id ? { ...c, checked: !c.checked } : c));

  return (
    <div className="space-y-4">

      {/* ── STCC ── */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-start justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-slate-800">STCC — Supervisión Técnica de Control de Calidad</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Revisión de RT-38 (FFQQ) y RT-74 (Micro)</p>
          </div>
          <StccBadge estado={stccDtDg.stccEstado} />
        </div>

        <div className="grid grid-cols-2 divide-x divide-slate-100 p-5 gap-0">
          {/* LEFT: Checklist */}
          <div className="pr-5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              Checklist de Revisión STCC
            </p>
            <div className="space-y-2">
              {checklist.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-left group"
                >
                  {item.checked
                    ? <CheckSquare className="w-4 h-4 shrink-0 text-green-500" />
                    : <Square className="w-4 h-4 shrink-0 text-slate-300 group-hover:text-slate-400" />
                  }
                  <span className={`text-xs ${item.checked ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Observaciones + actions */}
          <div className="pl-5 flex flex-col gap-3">
            <div className="flex-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Observaciones STCC
              </p>
              <textarea
                rows={7}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 resize-none"
                placeholder="Observaciones técnicas al RT-38 / RT-74..."
                value={observacion}
                onChange={e => setObservacion(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg border-2 border-green-500 text-green-700 text-xs font-semibold hover:bg-green-50 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5" /> Liberar a DT
              </button>
              <button className="flex items-center justify-center gap-1.5 py-2 rounded-lg border-2 border-red-400 text-red-600 text-xs font-semibold hover:bg-red-50 transition-colors">
                <span className="text-sm leading-none">✕</span> Devolver
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Dirección Técnica ── */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-start justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-slate-800">Dirección Técnica — Decisión Técnica</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Revisión consolidada · RT-39 · Reanálisis · Comité</p>
          </div>
          <DtBadge estado={stccDtDg.dtEstado} />
        </div>

        <div className="p-5 space-y-4">
          {/* 3 action buttons (disabled) */}
          <div className="grid grid-cols-3 gap-3">
            <ActionButton icon={<CheckCheck className="w-5 h-5" />} label="Aprobar para RT-39" disabled />
            <ActionButton icon={<RotateCcw className="w-5 h-5" />} label="Ordenar Reanálisis" disabled />
            <ActionButton icon={<Users className="w-5 h-5" />} label="Escalar a Comité" disabled />
          </div>
          {/* Info notice */}
          <div className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500">
              Las acciones de Dirección Técnica estarán disponibles cuando el caso sea liberado por STCC.
            </p>
          </div>
        </div>
      </div>

      {/* ── Dirección General ── */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-start justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-slate-800">Dirección General — Aprobación Final</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Revisión del RT-39 · Aprobación · Emisión al cliente</p>
          </div>
          <DgBadge estado={stccDtDg.dgEstado} />
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-4 divide-x divide-slate-100 border border-slate-100 rounded-lg overflow-hidden">
            <DgCell label="Nº Informe"       value={stccDtDg.dgNroInforme} />
            <DgCell label="Nº Oficio"        value={stccDtDg.dgNroOficio} />
            <DgCell label="Fecha Aprobación" value={stccDtDg.dgFechaAprobacion} />
            <DgCell label="Canal de Entrega" value={stccDtDg.dgCanalEntrega} />
          </div>
          <button
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            disabled
          >
            <FileText className="w-3.5 h-3.5" />
            Revisar RT-39 (no disponible aún)
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ── */
function ActionButton({ icon, label, disabled }: { icon: React.ReactNode; label: string; disabled?: boolean }) {
  return (
    <button
      disabled={disabled}
      className="flex flex-col items-center gap-1.5 py-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-300 cursor-not-allowed transition-colors"
    >
      {icon}
      <span className="text-[10px] font-medium text-center leading-tight">{label}</span>
    </button>
  );
}

function DgCell({ label, value }: { label: string; value?: string }) {
  return (
    <div className="px-4 py-3">
      <p className="text-[10px] text-slate-400 font-medium mb-1">{label}</p>
      <p className="text-sm font-semibold text-slate-700">{value ?? '—'}</p>
    </div>
  );
}

function StccBadge({ estado }: { estado: string }) {
  if (estado === 'aprobado') return (
    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-semibold border border-green-200 shrink-0">
      <CheckCircle2 className="w-3 h-3" /> Aprobado
    </span>
  );
  return (
    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-semibold border border-amber-200 shrink-0">
      <Clock className="w-3 h-3" /> Pendiente (en análisis)
    </span>
  );
}

function DtBadge({ estado }: { estado: string }) {
  if (estado === 'aprobado') return (
    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-semibold border border-green-200 shrink-0">
      <CheckCircle2 className="w-3 h-3" /> Aprobado
    </span>
  );
  return (
    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-semibold border border-slate-200 shrink-0">
      <Clock className="w-3 h-3" /> Pendiente STCC
    </span>
  );
}

function DgBadge({ estado }: { estado: string }) {
  if (estado === 'firmado') return (
    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-semibold border border-green-200 shrink-0">
      <CheckCircle2 className="w-3 h-3" /> Firmado
    </span>
  );
  return (
    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-semibold border border-slate-200 shrink-0">
      <Clock className="w-3 h-3" /> Pendiente DT
    </span>
  );
}
