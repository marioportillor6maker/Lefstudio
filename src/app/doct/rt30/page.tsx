'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, Printer, Plus, CheckSquare, X, CheckCircle2, Bell } from 'lucide-react';

interface Item { id: string; label: string; cantidad: string; unidad: string; checked: boolean; estado: 'pendiente' | 'recibido' }
interface Rt30Row { nro: string; recepcion: string; tipo: string; emision: string; plazo: string; diasRest: string; vencido: boolean; respuesta: string; estado: 'respondido'|'pendiente'|'vencido'|'respondido_parcialmente' }

const SEGUIMIENTO: Rt30Row[] = [
  { nro:'RT30-2024-0089', recepcion:'LEF-2024-00147', tipo:'Estándar Referencia', emision:'11/01/2024', plazo:'11/03/2024', diasRest:'52d', vencido:false, respuesta:'15/01/2024', estado:'respondido' },
  { nro:'RT30-2024-0090', recepcion:'LEF-2024-00148', tipo:'Info. Adicional',     emision:'12/01/2024', plazo:'12/03/2024', diasRest:'38d', vencido:false, respuesta:'—',          estado:'pendiente' },
  { nro:'RT30-2024-0091', recepcion:'LEF-2024-00153', tipo:'Metodología',          emision:'05/01/2024', plazo:'05/03/2024', diasRest:'3d',  vencido:true,  respuesta:'—',          estado:'vencido' },
  { nro:'RT30-2024-0092', recepcion:'LEF-2024-00144', tipo:'Info. Adicional',     emision:'08/01/2024', plazo:'08/03/2024', diasRest:'20d', vencido:false, respuesta:'12/01/2024', estado:'respondido_parcialmente' },
];

const INIT_ITEMS: Item[] = [
  { id:'i1', label:'Estándar de Referencia: Amoxicilina Trihidrato USP RS', cantidad:'200', unidad:'mg',    checked:true, estado:'pendiente' },
  { id:'i2', label:'Certificado de Análisis del Estándar',                   cantidad:'1',   unidad:'copia', checked:true, estado:'pendiente' },
  { id:'i3', label:'Metodología de Valoración por HPLC',                     cantidad:'1',   unidad:'copia', checked:true, estado:'pendiente' },
];

const INPUT = 'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 placeholder:text-slate-300';

function Rt30PageContent() {
  const searchParams = useSearchParams();
  const recepcionCtx = searchParams.get('recepcion') ?? '';
  const productoCtx  = searchParams.get('producto')  ?? '';
  const empresaCtx   = searchParams.get('empresa')   ?? '';

  const [items, setItems] = useState<Item[]>(INIT_ITEMS);
  const [justif, setJustif] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirigido, setDirigido] = useState('');
  const [plazo, setPlazo] = useState('60');
  const [showRecordatorio, setShowRecordatorio] = useState(false);
  const [recordatorioTarget, setRecordatorioTarget] = useState<string | null>(null);
  const [recordatorioMsg, setRecordatorioMsg] = useState('');
  const [recordatorioEnviado, setRecordatorioEnviado] = useState(false);

  const hoy = new Date().toLocaleDateString('es-HN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const toggleItem = (id: string) => setItems(items.map(i => i.id === id ? { ...i, checked: !i.checked } : i));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-5">
          <Send className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
          Solicitud de Información / Estándar — RT-30
        </h3>

        {/* Recepción context card */}
        <div className="mb-5 p-3 sm:p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Recepción Asociada</p>
          {recepcionCtx ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
              <div>
                <p className="text-[10px] text-slate-400 mb-0.5">N° Recepción</p>
                <p className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{recepcionCtx}</p>
              </div>
              {productoCtx && (
                <div>
                  <p className="text-[10px] text-slate-400 mb-0.5">Producto</p>
                  <p className="text-sm font-semibold text-slate-700">{productoCtx}</p>
                </div>
              )}
              {empresaCtx && (
                <div>
                  <p className="text-[10px] text-slate-400 mb-0.5">Cliente</p>
                  <p className="text-sm text-slate-600">{empresaCtx}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">
              Sin recepción seleccionada. Accedé desde la Bandeja DOCT usando el botón &quot;RT-30&quot;.
            </p>
          )}
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
          <Field label="Tipo de Solicitud *">
            <select className={INPUT}>
              <option>Estándar de Referencia</option>
              <option>Información Adicional</option>
              <option>Metodología</option>
            </select>
          </Field>
          <Field label="Fecha de Emisión *">
            <input type="text" className={INPUT} value={hoy} readOnly />
          </Field>
          <Field label="Dirigido a">
            <input
              className={INPUT}
              value={dirigido}
              onChange={e => setDirigido(e.target.value)}
              placeholder="Destinatario de la solicitud..."
            />
          </Field>
          <Field label="Plazo de Respuesta (días) *">
            <input
              type="number"
              className={INPUT}
              value={plazo}
              onChange={e => setPlazo(e.target.value)}
            />
          </Field>
        </div>

        {/* Items solicitados */}
        <div className="mb-5">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Ítems Solicitados</h4>
          <div className="space-y-2">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-slate-200 bg-white">
                <button onClick={() => toggleItem(item.id)}>
                  <CheckSquare className={`w-4 h-4 ${item.checked ? 'text-[var(--color-primary)]' : 'text-slate-300'}`} />
                </button>
                <span className="flex-1 text-sm text-slate-700">{item.label}</span>
                <span className="text-xs text-slate-400">{item.cantidad} {item.unidad}</span>
                <span className="text-[10px] font-semibold text-amber-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" /> Pendiente
                </span>
              </div>
            ))}
            <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 text-[var(--color-primary)] hover:bg-blue-50 rounded-lg transition-colors">
              <Plus className="w-3.5 h-3.5" /> Agregar Ítem
            </button>
          </div>
        </div>

        {/* Justificación */}
        <Field label="Justificación / Observaciones">
          <textarea
            rows={3}
            className={INPUT + ' resize-none'}
            placeholder="Justifique la solicitud y proporcione contexto adicional..."
            value={justif}
            onChange={e => setJustif(e.target.value)}
          />
        </Field>

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => setSaved(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <Send className="w-3.5 h-3.5" /> Emitir RT-30
          </button>
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            <Printer className="w-3.5 h-3.5" /> Vista Previa
          </button>
        </div>
        {saved && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-4 py-3">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <p className="text-xs font-semibold text-green-700">RT-30 emitido correctamente.</p>
            <button onClick={() => setSaved(false)} className="ml-auto"><X className="w-4 h-4 text-green-400" /></button>
          </div>
        )}
      </div>

      {/* Seguimiento table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100">
          <h4 className="text-sm font-bold text-slate-700">Seguimiento de Solicitudes RT-30</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[820px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Nº RT-30','RECEPCIÓN','TIPO','EMISIÓN','PLAZO','DÍAS RESTANTES','RESPUESTA','ESTADO','ACCIONES'].map(h => (
                  <th key={h} className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SEGUIMIENTO.map(r => (
                <tr key={r.nro} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-xs font-bold" style={{ color: 'var(--color-primary)' }}>{r.nro}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">{r.recepcion}</td>
                  <td className="px-4 py-3 text-xs text-slate-700">{r.tipo}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{r.emision}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{r.plazo}</td>
                  <td className="px-4 py-3 text-xs font-bold">
                    <span className={r.vencido ? 'text-red-500' : 'text-amber-500'}>{r.diasRest}{r.vencido ? ' vencido' : ''}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{r.respuesta}</td>
                  <td className="px-4 py-3">
                    {r.estado === 'respondido'            && <span className="flex items-center gap-1 text-xs font-semibold text-green-600"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Respondido</span>}
                    {r.estado === 'pendiente'             && <span className="flex items-center gap-1 text-xs font-semibold text-amber-500"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Pendiente</span>}
                    {r.estado === 'vencido'               && <span className="flex items-center gap-1 text-xs font-semibold text-red-500"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Vencido</span>}
                    {r.estado === 'respondido_parcialmente' && <span className="flex items-center gap-1 text-xs font-semibold text-blue-500"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Resp. parcial</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        className="inline-flex items-center gap-1 text-xs font-semibold text-white rounded-md px-2 py-1 whitespace-nowrap"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                      >
                        <Send className="w-3 h-3" /> Enviar
                      </button>
                      <button
                        onClick={() => { setRecordatorioTarget(r.nro); setRecordatorioMsg(''); setRecordatorioEnviado(false); setShowRecordatorio(true); }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-2 py-1 whitespace-nowrap hover:bg-amber-100 transition-colors"
                        title="Enviar recordatorio al cliente"
                      >
                        <Bell className="w-3 h-3" /> Recordatorio
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Enviar Recordatorio */}
      {showRecordatorio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" /> Enviar Recordatorio
                {recordatorioTarget && <span className="text-slate-400 font-normal">— {recordatorioTarget}</span>}
              </h3>
              <button onClick={() => setShowRecordatorio(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-500">
                Se enviará un correo automático al cliente solicitando respuesta a esta RT-30.
              </p>
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Mensaje adicional (opcional)
                </label>
                <textarea
                  rows={4}
                  value={recordatorioMsg}
                  onChange={e => setRecordatorioMsg(e.target.value)}
                  placeholder="Escriba aquí un mensaje adicional para incluir en el correo..."
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 resize-none"
                />
              </div>
              {recordatorioEnviado && (
                <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <p className="text-xs font-semibold text-green-700">Recordatorio enviado correctamente.</p>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setShowRecordatorio(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50">Cancelar</button>
              <button
                onClick={() => setRecordatorioEnviado(true)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white flex items-center gap-1.5"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <Send className="w-3.5 h-3.5" /> Enviar Recordatorio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vista Previa Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800">Vista Previa — RT-30</h3>
              <button onClick={() => setShowPreview(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <div className="p-6 space-y-3">
              {recepcionCtx && <PreviewRow label="Recepción" value={recepcionCtx} />}
              {productoCtx  && <PreviewRow label="Producto"  value={productoCtx} />}
              {empresaCtx   && <PreviewRow label="Cliente"   value={empresaCtx} />}
              <PreviewRow label="Emisión"  value={hoy} />
              <PreviewRow label="Dirigido" value={dirigido || '—'} />
              <PreviewRow label="Plazo"    value={`${plazo} días`} />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Ítems</span>
                <ul className="mt-1 space-y-1">
                  {items.filter(i => i.checked).map(i => (
                    <li key={i.id} className="text-xs text-slate-600">• {i.label} ({i.cantidad} {i.unidad})</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setShowPreview(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600">Cerrar</button>
              <button className="px-4 py-2 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: 'var(--color-primary)' }}>Imprimir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Rt30Page() {
  return (
    <Suspense>
      <Rt30PageContent />
    </Suspense>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</label>
      {children}
    </div>
  );
}

function PreviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-[10px] font-bold text-slate-400 uppercase w-24 shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-slate-700">{value}</span>
    </div>
  );
}
