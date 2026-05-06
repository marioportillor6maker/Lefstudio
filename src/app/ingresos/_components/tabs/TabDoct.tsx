import type { IncomeDetail } from '../../_types/income.types';
import { CheckCircle2, XCircle, Clock, Send, FileText } from 'lucide-react';

interface Props { detail: IncomeDetail }

type EstadoDoc = 'pendiente' | 'completado' | 'rechazado' | 'na';

function StatusPill({ estado }: { estado: EstadoDoc }) {
  if (estado === 'completado') return <span className="flex items-center gap-1 text-[11px] font-bold text-green-600"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" />Completado</span>;
  if (estado === 'rechazado')  return <span className="flex items-center gap-1 text-[11px] font-bold text-red-600"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />Rechazado</span>;
  if (estado === 'na')         return <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400"><span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />N/A</span>;
  return <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Pendiente Respuesta</span>;
}

function ResultadoBadge({ resultado }: { resultado: string }) {
  if (resultado === 'Conforme')    return <span className="text-[10px] font-black text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">Conforme</span>;
  if (resultado === 'No Conforme') return <span className="text-[10px] font-black text-red-700   bg-red-50   border border-red-200   px-2 py-0.5 rounded-full">No Conforme</span>;
  return <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">En análisis</span>;
}

export function TabDoct({ detail }: Props) {
  const { doct } = detail;
  const diasRestantes = (doct.rt30DiasTotal ?? 60) - (doct.rt30DiasTranscurridos ?? 0);
  const pctPlazo = doct.rt30DiasTotal
    ? Math.min(100, Math.round(((doct.rt30DiasTranscurridos ?? 0) / doct.rt30DiasTotal) * 100))
    : 0;

  return (
    <div className="space-y-4">

      {/* ── RT-75 ──────────────────────────────────────────────────────── */}
      {doct.rt75Estado !== 'na' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
            <p className="text-sm font-black text-slate-700">RT-75 — Solicitud de Expediente</p>
            <StatusPill estado={doct.rt75Estado} />
          </div>
          <div className="p-5">
            <div className="grid grid-cols-4 gap-3">
              <Field label="Solicitante"         value={doct.rt75Solicitante     ?? '—'} />
              <Field label="Fecha Solicitud"     value={doct.rt75FechaSolicitud  ?? '—'} />
              <Field label="Fecha Respuesta"     value={doct.rt75FechaRespuesta  ?? '—'} />
              <Field label="Recepciones Previas" value={doct.rt75RecepcionesPrevias != null ? `${doct.rt75RecepcionesPrevias} encontradas` : '—'} highlight />
            </div>
          </div>
        </div>
      )}

      {/* ── RT-41 ──────────────────────────────────────────────────────── */}
      {doct.rt41Estado !== 'na' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
            <p className="text-sm font-black text-slate-700">RT-41 — Contraste Histórico del Producto</p>
            <StatusPill estado={doct.rt41Estado} />
          </div>
          {doct.rt41Filas && doct.rt41Filas.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/60">
                    {['Recepción','Fecha','Lote','Trámite','Resultado','Analista','Observaciones'].map(h => (
                      <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {doct.rt41Filas.map((row, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-2.5 font-mono font-bold text-slate-700 whitespace-nowrap">{row.recepcion}</td>
                      <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{row.fecha}</td>
                      <td className="px-4 py-2.5 font-mono text-slate-700 whitespace-nowrap">{row.lote}</td>
                      <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">{row.tramite}</td>
                      <td className="px-4 py-2.5 whitespace-nowrap"><ResultadoBadge resultado={row.resultado} /></td>
                      <td className="px-4 py-2.5 text-slate-600 whitespace-nowrap">{row.analista}</td>
                      <td className="px-4 py-2.5 text-slate-400 max-w-[200px] truncate" title={row.observaciones}>{row.observaciones ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="p-5 text-sm text-slate-400">Sin registros de contraste histórico.</p>
          )}
        </div>
      )}

      {/* ── RT-30 ──────────────────────────────────────────────────────── */}
      {doct.rt30Estado !== 'na' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
            <p className="text-sm font-black text-slate-700">RT-30 — Solicitud de Información / Estándar</p>
            <StatusPill estado={doct.rt30Estado} />
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-5">
              {/* Left: datos de la solicitud + ítems */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Fecha Emisión"  value={doct.rt30FechaEmision ?? '—'} />
                  <Field label="Firmado por"    value={doct.rt30FirmadoPor   ?? '—'} />
                  <Field label="Enviado a"      value={doct.rt30EnviadoA     ?? '—'} />
                  <Field label="Plazo Límite"   value={doct.rt30PlazoLimite  ? `${doct.rt30PlazoLimite} (${doct.rt30DiasTotal} días)` : '—'} />
                </div>
                {doct.rt30Items && doct.rt30Items.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-2">Ítems Solicitados</p>
                    <div className="space-y-1.5">
                      {doct.rt30Items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          {item.estado === 'completado'
                            ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                            : item.estado === 'rechazado'
                              ? <XCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                              : <span className="w-3.5 h-3.5 rounded-full border-2 border-amber-400 bg-amber-50 shrink-0 inline-block" />
                          }
                          <span className={`text-xs ${item.estado === 'pendiente' ? 'text-amber-700 font-medium' : 'text-slate-600'}`}>
                            {item.descripcion}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: contador de plazo */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col items-center justify-center gap-3">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  Contador de Plazo ({doct.rt30DiasTotal} días)
                </p>
                <p className={`text-5xl font-black ${pctPlazo >= 80 ? 'text-red-600' : pctPlazo >= 50 ? 'text-amber-600' : 'text-green-600'}`}>
                  {doct.rt30DiasTranscurridos ?? 0}
                </p>
                <p className="text-xs text-slate-400">días transcurridos de {doct.rt30DiasTotal}</p>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${pctPlazo >= 80 ? 'bg-red-500' : pctPlazo >= 50 ? 'bg-amber-500' : 'bg-green-500'}`}
                    style={{ width: `${pctPlazo}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500">
                  <span className={`font-bold ${diasRestantes < 15 ? 'text-red-600' : 'text-slate-700'}`}>{diasRestantes} días restantes</span>
                  {doct.rt30PlazoLimite ? ` · Vence: ${doct.rt30PlazoLimite}` : ''}
                </p>
                <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-lg transition-colors mt-1">
                  <Send className="w-3.5 h-3.5" />Registrar Respuesta Recibida
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* ── RT-38 ──────────────────────────────────────────────────────── */}
      {doct.rt38Estado !== 'na' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
            <p className="text-sm font-black text-slate-700">RT-38 — Estado del Expediente Analítico</p>
            {doct.rt38EstadoGlobal ? (
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />{doct.rt38EstadoGlobal}
              </span>
            ) : (
              <StatusPill estado={doct.rt38Estado} />
            )}
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-4 gap-3">
              <InfoCard label="Creado por DOCT"     value={doct.rt38CreadoPor           ?? '—'} sub={doct.rt38FechaCreacion} />
              <InfoCard label="Pruebas Configuradas" value={doct.rt38PruebasConfiguradas != null ? `${doct.rt38PruebasConfiguradas} pruebas` : '—'} sub={doct.rt38FechaPruebas} />
              <InfoCard label="Auxiliares Generados" value={doct.rt38AuxiliaresGenerados != null ? `${doct.rt38AuxiliaresGenerados} auxiliares` : '—'} sub={doct.rt38FechaAuxiliares} />
              <InfoCard label="Paquete Enviado a STR" value={doct.rt38PaqueteEnviadoA    ?? '—'} sub={doct.rt38FechaPaquete} />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold rounded-lg transition-colors">
              <FileText className="w-3.5 h-3.5" />Abrir RT-38 Completo
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

function InfoCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
      <p className="text-[10px] text-slate-400 font-medium mb-1">{label}</p>
      <p className="text-sm font-bold text-slate-800">{value}</p>
      {sub && <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>}
    </div>
  );
}

function Field({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`p-3 rounded-lg border ${highlight ? 'bg-primary/5 border-primary/20' : 'bg-white border-slate-200'}`}>
      <p className="text-[10px] text-slate-400 font-medium mb-0.5">{label}</p>
      <p className={`text-xs font-bold ${highlight ? 'text-primary' : 'text-slate-800'}`}>{value}</p>
    </div>
  );
}
