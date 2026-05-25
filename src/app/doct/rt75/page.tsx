'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FolderOpen, Printer, X, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { formatDate } from '@/lib/formatDate';

interface Rt75Row {
  nro: string;
  recepcion: string;
  producto: string;
  fechaSol: string;
  respuesta: string;
  estado: 'respondido' | 'pendiente' | 'sin_historial';
}

const HISTORIAL: Rt75Row[] = [
  { nro:'RT75-2024-0089', recepcion:'LEF-2024-00147', producto:'Amoxicilina 500mg Cápsulas',   fechaSol:'2024/11/08', respuesta:'2024/11/10', estado:'respondido' },
  { nro:'RT75-2024-0088', recepcion:'LEF-2024-00143', producto:'Metformina 850mg Tabletas',    fechaSol:'2024/10/24', respuesta:'2024/10/25', estado:'respondido' },
  { nro:'RT75-2024-0090', recepcion:'LEF-2024-00148', producto:'Ibuprofeno 400mg Tabletas',    fechaSol:'2024/11/08', respuesta:'—',          estado:'pendiente' },
  { nro:'RT75-2024-0091', recepcion:'LEF-2024-00153', producto:'Paracetamol 500mg Tabletas',   fechaSol:'2024/11/13', respuesta:'—',          estado:'sin_historial' },
];

// Session mock — replace with real auth integration
const SOLICITANTE_SESION = 'Q.F. Ana Patricia Flores';
const DIRIGIDO_DEFAULT   = 'Archivo Central CQFH';
const PLAZO_DEFAULT      = '3';

const INPUT = 'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 placeholder:text-slate-300';

function Rt75PageContent() {
  const searchParams = useSearchParams();
  const recepcionCtx = searchParams.get('recepcion') ?? '';
  const productoCtx  = searchParams.get('producto')  ?? '';
  const empresaCtx   = searchParams.get('empresa')   ?? '';

  const [showPreview, setShowPreview] = useState(false);
  const [form, setForm] = useState({ prioridad: 'Normal', observaciones: '' });

  const hoy = formatDate(new Date());
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-5">
          <FolderOpen className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
          Emitir Solicitud de Expediente — RT-75
        </h3>

        {/* Recepción context — populated from Bandeja DOCT via URL params */}
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
              Sin recepción seleccionada. Accedé desde la Bandeja DOCT usando el botón &quot;RT-75&quot;.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Field label="Prioridad">
            <select className={INPUT} value={form.prioridad} onChange={e => set('prioridad', e.target.value)}>
              <option>Normal</option>
              <option>Alta</option>
              <option>Urgente</option>
            </select>
          </Field>
        </div>

        <div className="space-y-4">
          <Field label="Observaciones / Alcance de la Búsqueda">
            <textarea
              rows={3}
              className={INPUT + ' resize-none'}
              placeholder="Indique el alcance de la búsqueda: recepciones previas, lotes específicos, período de tiempo, etc."
              value={form.observaciones}
              onChange={e => set('observaciones', e.target.value)}
            />
          </Field>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <FolderOpen className="w-3.5 h-3.5" /> Emitir RT-75
          </button>
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            <Printer className="w-3.5 h-3.5" /> Vista Previa
          </button>
        </div>
      </div>

      {/* History table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100">
          <h4 className="text-sm font-bold text-slate-700">Historial de Solicitudes RT-75</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[580px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Nº RT-75', 'RECEPCIÓN', 'PRODUCTO CONSULTADO', 'FECHA SOLICITUD', 'RESPUESTA', 'ESTADO'].map(h => (
                  <th key={h} className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {HISTORIAL.map(r => (
                <tr key={r.nro} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-xs font-bold" style={{ color: 'var(--color-primary)' }}>{r.nro}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">{r.recepcion}</td>
                  <td className="px-4 py-3 text-xs text-slate-700">{r.producto}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{r.fechaSol}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{r.respuesta}</td>
                  <td className="px-4 py-3"><EstadoBadge estado={r.estado} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vista Previa Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800">Vista Previa — RT-75</h3>
              <button onClick={() => setShowPreview(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <div className="p-6 space-y-3">
              <PreviewRow label="N° Solicitud" value="RT75-2024-0092 (borrador)" />
              {recepcionCtx && <PreviewRow label="Recepción"  value={recepcionCtx} />}
              {productoCtx  && <PreviewRow label="Producto"   value={productoCtx} />}
              {empresaCtx   && <PreviewRow label="Cliente"    value={empresaCtx} />}
              <PreviewRow label="Fecha"       value={hoy} />
              <PreviewRow label="Solicitante" value={SOLICITANTE_SESION} />
              <PreviewRow label="Dirigido a"  value={DIRIGIDO_DEFAULT} />
              <PreviewRow label="Plazo"       value={`${PLAZO_DEFAULT} días`} />
              <PreviewRow label="Prioridad"   value={form.prioridad} />
            </div>
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Cerrar
              </button>
              <button
                className="px-4 py-2 rounded-lg text-xs font-bold text-white"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Imprimir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Rt75Page() {
  return (
    <Suspense>
      <Rt75PageContent />
    </Suspense>
  );
}

function EstadoBadge({ estado }: { estado: string }) {
  if (estado === 'respondido') return (
    <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
      <CheckCircle2 className="w-3.5 h-3.5" /> Respondido
    </span>
  );
  if (estado === 'pendiente') return (
    <span className="flex items-center gap-1 text-xs font-semibold text-amber-500">
      <Clock className="w-3.5 h-3.5" /> Pendiente
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-xs font-semibold text-slate-400">
      <XCircle className="w-3.5 h-3.5" /> Sin Historial
    </span>
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
      <span className="text-[10px] font-bold text-slate-400 uppercase w-28 shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-slate-700">{value}</span>
    </div>
  );
}
