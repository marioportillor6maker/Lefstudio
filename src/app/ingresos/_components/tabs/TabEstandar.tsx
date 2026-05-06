import type { IncomeDetail } from '../../_types/income.types';
import { CheckCircle2, FileText, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface Props { detail: IncomeDetail }

export function TabEstandar({ detail }: Props) {
  const { estandar } = detail;

  const total       = estandar.cantidadTotal     ?? 0;
  const disponible  = estandar.cantidadDisponible ?? 0;
  const usado       = estandar.cantidadUsada      ?? 0;
  const unidad      = estandar.unidadMedida       ?? 'mg';
  const pctDisp     = total > 0 ? Math.round((disponible / total) * 100) : 0;

  const isDone = estandar.estado === 'entregado' || estandar.estado === 'registrado';

  return (
    <div className="space-y-4">

      {/* ── Banner de estado ─────────────────────────────────────────────── */}
      <div className={`flex items-center justify-between px-5 py-3.5 rounded-xl border ${isDone ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
        <div className="flex items-center gap-3">
          <CheckCircle2 className={`w-6 h-6 shrink-0 ${isDone ? 'text-green-500' : 'text-amber-400'}`} />
          <div>
            <p className={`text-sm font-black ${isDone ? 'text-green-800' : 'text-amber-800'}`}>
              {isDone ? 'Estándar de Referencia Aceptado' : 'Estándar en Proceso'}
            </p>
            <p className={`text-[11px] mt-0.5 ${isDone ? 'text-green-600' : 'text-amber-600'}`}>
              RG-44 registrado · RT-27 emitido · Sin bloqueos de estándar
            </p>
          </div>
        </div>
        {estandar.registroInterno && (
          <div className="text-right shrink-0">
            <p className="text-[10px] text-slate-400 font-medium">Registro Interno</p>
            <p className="text-xs font-mono font-bold text-slate-700">{estandar.registroInterno}</p>
          </div>
        )}
      </div>

      {/* ── Two columns ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4">

        {/* Left: Datos del Estándar RG-44 */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
            <p className="text-xs font-black text-slate-700">Datos del Estándar (RG-44)</p>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { label: 'Nombre del Estándar',       value: estandar.nombreEstandar              ?? '—' },
              { label: 'Lote / Código',             value: estandar.loteCodigo                  ?? '—', mono: true },
              { label: 'Nº Certificado',            value: estandar.nroCertificado              ?? '—', mono: true },
              { label: 'Cantidad Total',            value: total > 0 ? `${total} ${unidad}` : '—' },
              { label: 'Condiciones Almacenamiento',value: estandar.condicionesAlmacenamiento   ?? '—' },
              { label: 'Fecha de Recepción',        value: estandar.fechaRecepcion              ?? '—' },
              { label: 'Fecha de Aceptación',       value: estandar.fechaAceptacion             ?? '—' },
              { label: 'Fecha de Vencimiento',      value: estandar.fechaVencimiento            ?? '—', warn: estandar.alertaVencimiento },
              { label: 'Validado por',              value: estandar.validadoPor                 ?? '—' },
              { label: 'Entrega RT-27',             value: estandar.entregaRt27                 ?? '—', mono: true },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-2.5 hover:bg-slate-50 transition-colors">
                <span className="text-xs text-slate-400 font-medium shrink-0 w-44">{row.label}</span>
                <span className={`text-xs font-semibold text-right ${row.mono ? 'font-mono' : ''} ${row.warn ? 'text-amber-600' : 'text-slate-800'}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Control de Cantidad + Movimientos */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
              <p className="text-xs font-black text-slate-700">Control de Cantidad / Movimientos</p>
            </div>
            <div className="p-5 space-y-4">
              {/* Disponible */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-500 font-medium">Disponible</span>
                  <span className="text-sm font-black text-green-600">{disponible} {unidad}</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${pctDisp >= 60 ? 'bg-green-500' : pctDisp >= 30 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${pctDisp}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-slate-400">Usado: {usado} {unidad}</span>
                  <span className="text-[10px] text-slate-400">Total: {total} {unidad}</span>
                </div>
              </div>

              {/* Historial */}
              {estandar.movimientos && estandar.movimientos.length > 0 && (
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-wide mb-2">Historial de Movimientos</p>
                  <div className="space-y-2">
                    {estandar.movimientos.map((mov, i) => (
                      <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg border ${mov.cantidad > 0 ? 'bg-green-50 border-green-100' : 'bg-amber-50 border-amber-100'}`}>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${mov.cantidad > 0 ? 'bg-green-100' : 'bg-amber-100'}`}>
                          {mov.cantidad > 0
                            ? <TrendingUp   className="w-3.5 h-3.5 text-green-600" />
                            : <TrendingDown className="w-3.5 h-3.5 text-amber-600" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-bold text-slate-700">
                            <span className="font-mono">{mov.codigo}</span> — {mov.descripcion}
                          </p>
                          <p className="text-[10px] text-slate-400">{mov.responsable} · {mov.fecha}</p>
                        </div>
                        <span className={`text-xs font-black shrink-0 ${mov.cantidad > 0 ? 'text-green-600' : 'text-amber-600'}`}>
                          {mov.cantidad > 0 ? '+' : ''}{mov.cantidad} {mov.unidad}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold rounded-lg transition-colors">
                  <FileText className="w-3.5 h-3.5" />Ver RG-44
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold rounded-lg transition-colors">
                  <FileText className="w-3.5 h-3.5" />Ver RT-27
                </button>
              </div>

              {/* Alerta vencimiento */}
              {estandar.alertaVencimiento && (
                <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-amber-700">Vencimiento próximo </span>
                    <span className="text-xs text-amber-600">
                      El estándar vence el {estandar.fechaVencimiento}. Programar eliminación RT-45 al cierre del mes.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
