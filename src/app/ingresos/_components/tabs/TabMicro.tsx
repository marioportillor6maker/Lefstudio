import { CheckCircle2, Clock, AlertCircle, FlaskConical, FileText, Send } from 'lucide-react';
import type { IncomeDetail, MicroTest } from '../../_types/income.types';

interface Props { detail: IncomeDetail }

export function TabMicro({ detail }: Props) {
  const { micro } = detail;

  return (
    <div className="space-y-4">

      {/* ── Recepción Microbiológica — Bitácora ── */}
      {micro.recepcion && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-700">Recepción Microbiológica — Bitácora</h4>
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-semibold border border-green-200">
              <CheckCircle2 className="w-3 h-3" /> Recibida
            </span>
          </div>
          <div className="grid grid-cols-4 divide-x divide-slate-100">
            <InfoCell label="Fecha/Hora Recepción"  value={micro.recepcion.fechaHora} />
            <InfoCell label="Responsable Micro"      value={micro.recepcion.responsable} />
            <InfoCell label="Cantidad Recibida"      value={micro.recepcion.cantidad} />
            <InfoCell label="Estado de Muestra"      value={micro.recepcion.estadoMuestra} />
          </div>
        </div>
      )}

      {/* ── Evaluación de Aceptabilidad ── */}
      {micro.aceptabilidad && (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Evaluación de Aceptabilidad</h4>
          <div className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-green-700">Muestra Aceptada para Análisis Microbiológico</p>
              <p className="text-xs text-slate-500 mt-0.5">{micro.aceptabilidad.texto}</p>
            </div>
            <span className="text-xs text-slate-400 shrink-0">{micro.aceptabilidad.fecha}</span>
          </div>
        </div>
      )}

      {/* ── RT-74 — Resultados Microbiológicos ── */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-slate-700">RT-74 — Resultados Microbiológicos</h4>
          {micro.rt74Estado && <Rt74Badge estado={micro.rt74Estado} />}
        </div>

        <div className="divide-y divide-slate-100">
          {micro.pruebas.map(p => (
            <PruebaRow key={p.id} prueba={p} />
          ))}
          {micro.pruebas.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-slate-400 text-sm">Sin pruebas configuradas.</p>
            </div>
          )}
        </div>

        {/* Bottom actions */}
        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors">
            <FileText className="w-3.5 h-3.5" />
            Capturar en RT-74
          </button>
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <Send className="w-3.5 h-3.5" />
            Enviar RT-74 a STCC
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Prueba row ── */
function PruebaRow({ prueba }: { prueba: MicroTest }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors">
      {/* Flask icon */}
      <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
        <FlaskConical className="w-3.5 h-3.5 text-blue-500" />
      </div>

      {/* Name + spec */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-700">{prueba.prueba}</p>
        {(prueba.especificacion || prueba.metodo) && (
          <p className="text-[11px] text-slate-400 mt-0.5">
            {prueba.especificacion && <>Especificación: {prueba.especificacion}</>}
            {prueba.especificacion && prueba.metodo && <> · </>}
            {prueba.metodo && <>Método: {prueba.metodo}</>}
          </p>
        )}
      </div>

      {/* Estado */}
      <MicroEstadoBadge estado={prueba.estado} />
    </div>
  );
}

/* ── Badges ── */
function MicroEstadoBadge({ estado }: { estado: MicroTest['estado'] }) {
  if (estado === 'completada') return (
    <span className="flex items-center gap-1 text-xs font-semibold text-green-600 shrink-0">
      <CheckCircle2 className="w-4 h-4" /> Completada
    </span>
  );
  if (estado === 'en_proceso') return (
    <span className="flex items-center gap-1 text-xs font-semibold text-blue-600 shrink-0">
      <Clock className="w-4 h-4" /> En Proceso
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-xs font-semibold text-slate-400 shrink-0">
      <AlertCircle className="w-4 h-4" /> Pendiente
    </span>
  );
}

function Rt74Badge({ estado }: { estado: string }) {
  if (estado === 'en_proceso') return (
    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-semibold border border-amber-200">
      <Clock className="w-3 h-3" /> En Proceso
    </span>
  );
  if (estado === 'completado') return (
    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-semibold border border-green-200">
      <CheckCircle2 className="w-3 h-3" /> Completado
    </span>
  );
  return null;
}

/* ── Info cell ── */
function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3">
      <p className="text-[10px] text-slate-400 font-medium mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-slate-700">{value}</p>
    </div>
  );
}
