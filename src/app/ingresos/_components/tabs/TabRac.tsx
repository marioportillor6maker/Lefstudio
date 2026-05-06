import type { IncomeDetail } from '../../_types/income.types';
import { CheckCircle2, XCircle, Paperclip, Check, X } from 'lucide-react';

interface Props { detail: IncomeDetail }

export function TabRac({ detail }: Props) {
  const { rac } = detail;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">

        {/* ── COLUMNA IZQUIERDA ─────────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Datos del Registro Maestro RG-41 */}
          <Section title="Datos del Registro Maestro (RG-41)">
            <div className="grid grid-cols-2 gap-2">
              <Field label="Nº Recepción"    value={rac.nroRecepcion   ?? '—'} mono />
              <Field label="Correlativo"     value={detail.correlativo}         mono />
              <Field label="Mes de Recepción" value={rac.mesRecepcion  ?? '—'} />
              <Field label="Fecha de Recepción" value={rac.fechaIngreso} />
              <Field label="Tipo de Trámite" value={rac.tipoTramiteRac ?? detail.tipoTramite} />
              <Field label="Prioridad"       value={rac.prioridadRac   ?? detail.prioridad}
                     highlight={rac.prioridadRac === 'ALTA' || detail.prioridad === 'Alta'} />
            </div>
          </Section>

          {/* Referencias Documentales */}
          {(rac.nroOrden || rac.nroExpediente || rac.nroLicitacion || rac.nroCarta) && (
            <Section title="Referencias Documentales">
              <div className="grid grid-cols-2 gap-2">
                {rac.nroOrden      && <Field label="Nº Orden"         value={rac.nroOrden}      mono />}
                {rac.nroExpediente && <Field label="Nº Expediente"    value={rac.nroExpediente} mono />}
                {rac.nroLicitacion && <Field label="Nº Licitación"    value={rac.nroLicitacion} mono />}
                {rac.nroCarta      && <Field label="Nº Carta / Oficio" value={rac.nroCarta}     mono />}
              </div>
            </Section>
          )}

          {/* Cantidades por Destino */}
          {rac.cantidadesPorDestino && rac.cantidadesPorDestino.length > 0 && (
            <Section title="Cantidades por Destino">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wide">Destino</th>
                    <th className="text-right py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wide">Cantidad</th>
                    <th className="text-right py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wide">Unidad</th>
                  </tr>
                </thead>
                <tbody>
                  {rac.cantidadesPorDestino.map((row, i) => (
                    <tr key={i} className={`border-b border-slate-50 ${i === 0 ? 'font-bold text-slate-700' : 'text-slate-600'}`}>
                      <td className="py-2">{row.destino}</td>
                      <td className="py-2 text-right font-mono font-bold">{row.cantidad}</td>
                      <td className="py-2 text-right text-slate-400">{row.unidad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
          )}

        </div>

        {/* ── COLUMNA DERECHA ───────────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Verificación Documental Mínima */}
          {rac.verificacionDocumental && rac.verificacionDocumental.length > 0 && (
            <Section title="Verificación Documental Mínima">
              <div className="space-y-1.5">
                {rac.verificacionDocumental.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg ${item.cumple ? 'bg-green-50' : 'bg-red-50'}`}
                  >
                    {item.cumple
                      ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      : <XCircle     className="w-4 h-4 text-red-500   shrink-0" />
                    }
                    <span className={`text-xs flex-1 ${item.cumple ? 'text-slate-700' : 'text-red-700 font-medium'}`}>
                      {item.descripcion}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      {item.requerido && (
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">Requerido</span>
                      )}
                      {!item.cumple && (
                        <button className="flex items-center gap-1 text-[10px] font-semibold text-primary hover:underline">
                          <Paperclip className="w-3 h-3" />Adjuntar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Estado RT-159 — Distribución */}
          {rac.distribucionDetalle && rac.distribucionDetalle.length > 0 && (
            <Section title="Estado RT-159 — Distribución">
              <div className="space-y-2">
                {rac.distribucionDetalle.map((d, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${d.estado === 'completado' ? 'bg-green-100' : 'bg-amber-100'}`}>
                      {d.estado === 'completado'
                        ? <Check className="w-3 h-3 text-green-600" />
                        : <span className="w-2 h-2 rounded-full bg-amber-400" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-slate-700">{d.area}</span>
                      <span className="text-xs text-slate-400 mx-1">—</span>
                      <span className="text-xs text-slate-600">{d.accion}</span>
                    </div>
                    {d.fecha && (
                      <span className="text-[10px] text-slate-400 shrink-0">{d.fecha}</span>
                    )}
                    {d.responsable && (
                      <span className="text-[10px] text-slate-500 font-medium shrink-0 hidden lg:block">{d.responsable}</span>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Acciones contextuales */}
          <Section title="Acción Contextual">
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-2.5 bg-green-50 hover:bg-green-100 text-green-700 font-bold text-sm rounded-lg border border-green-200 transition-colors">
                <Check className="w-4 h-4" />Validar
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-sm rounded-lg border border-red-200 transition-colors">
                <X className="w-4 h-4" />Rechazar
              </button>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50">
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-wider">{title}</p>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Field({ label, value, mono = false, highlight = false }: {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className={`p-2.5 rounded-lg border ${highlight ? 'bg-primary/5 border-primary/20' : 'bg-slate-50 border-slate-100'}`}>
      <p className="text-[10px] text-slate-400 font-medium mb-0.5">{label}</p>
      <p className={`text-xs font-bold ${mono ? 'font-mono' : ''} ${highlight ? 'text-primary' : 'text-slate-800'}`}>
        {value}
      </p>
    </div>
  );
}
