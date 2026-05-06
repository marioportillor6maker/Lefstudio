'use client';
import { useState } from 'react';
import { FolderOpen, Printer, X, CheckCircle2, Clock, XCircle } from 'lucide-react';

interface Rt75Row {
  nro: string; recepcion: string; producto: string;
  fechaSol: string; plazo: string; respuesta: string;
  historial: string; estado: 'respondido' | 'pendiente' | 'sin_historial';
}

const HISTORIAL: Rt75Row[] = [
  { nro:'RT75-2024-0089', recepcion:'REC-2024-00147', producto:'AMOXICILINA 500mg',   fechaSol:'09/01/2024', plazo:'12/01/2024', respuesta:'10/01/2024', historial:'3 recepciones', estado:'respondido' },
  { nro:'RT75-2024-0088', recepcion:'REC-2024-00146', producto:'METFORMINA 850mg',    fechaSol:'08/01/2024', plazo:'11/01/2024', respuesta:'09/01/2024', historial:'1 recepción',   estado:'respondido' },
  { nro:'RT75-2024-0090', recepcion:'REC-2024-00148', producto:'ATORVASTATINA 20mg',  fechaSol:'10/01/2024', plazo:'13/01/2024', respuesta:'—',           historial:'Pendiente',     estado:'pendiente' },
  { nro:'RT75-2024-0091', recepcion:'REC-2024-00149', producto:'IBUPROFENO 400mg',    fechaSol:'11/01/2024', plazo:'14/01/2024', respuesta:'—',           historial:'Sin antecedentes',estado:'sin_historial' },
];

export default function Rt75Page() {
  const [showPreview, setShowPreview] = useState(false);
  const [form, setForm] = useState({
    recepcion: 'REC-2024-00147 — AMOXICILINA 500mg',
    fecha: '09/01/2024',
    solicitante: 'Q.F. Ana Patricia Flores',
    dirigido: 'Archivo Central CQFH',
    plazo: '3',
    prioridad: 'Normal',
    producto: '',
    observaciones: '',
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-5">
          <FolderOpen className="w-4 h-4" style={{ color:'var(--color-primary)' }} />
          Emitir Solicitud de Expediente — RT-75
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <Field label="Recepción Asociada *">
            <input className={INPUT} value={form.recepcion} onChange={e=>set('recepcion',e.target.value)} />
          </Field>
          <Field label="Fecha de Solicitud *">
            <input type="text" className={INPUT} value={form.fecha} onChange={e=>set('fecha',e.target.value)} />
          </Field>
          <Field label="Solicitante">
            <input className={INPUT} value={form.solicitante} onChange={e=>set('solicitante',e.target.value)} />
          </Field>
          <Field label="Dirigido a (Archivo)">
            <input className={INPUT} value={form.dirigido} onChange={e=>set('dirigido',e.target.value)} />
          </Field>
          <Field label="Plazo de Respuesta (días)">
            <input className={INPUT} value={form.plazo} onChange={e=>set('plazo',e.target.value)} />
          </Field>
          <Field label="Prioridad">
            <select className={INPUT} value={form.prioridad} onChange={e=>set('prioridad',e.target.value)}>
              <option>Normal</option><option>Alta</option><option>Urgente</option>
            </select>
          </Field>
        </div>
        <div className="space-y-4">
          <Field label="Producto a Consultar">
            <input className={INPUT} placeholder="Nombre comercial, principio activo, fabricante..." value={form.producto} onChange={e=>set('producto',e.target.value)} />
          </Field>
          <Field label="Observaciones / Alcance de la Búsqueda">
            <textarea rows={3} className={INPUT + ' resize-none'} placeholder="Indique el alcance de la búsqueda: recepciones previas, lotes específicos, período de tiempo, etc." value={form.observaciones} onChange={e=>set('observaciones',e.target.value)} />
          </Field>
        </div>
        <div className="flex gap-3 mt-5">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white" style={{ backgroundColor:'var(--color-primary)' }}>
            <FolderOpen className="w-3.5 h-3.5" /> Emitir RT-75
          </button>
          <button onClick={() => setShowPreview(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50">
            <Printer className="w-3.5 h-3.5" /> Vista Previa
          </button>
        </div>
      </div>

      {/* History table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100">
          <h4 className="text-sm font-bold text-slate-700">Historial de Solicitudes RT-75</h4>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {['Nº RT-75','RECEPCIÓN','PRODUCTO CONSULTADO','FECHA SOLICITUD','PLAZO','RESPUESTA','HISTORIAL ENCONTRADO','ESTADO'].map(h=>(
                <th key={h} className="px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {HISTORIAL.map(r=>(
              <tr key={r.nro} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-xs font-bold" style={{ color:'var(--color-primary)' }}>{r.nro}</td>
                <td className="px-4 py-3 text-xs text-slate-600">{r.recepcion}</td>
                <td className="px-4 py-3 text-xs text-slate-700">{r.producto}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{r.fechaSol}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{r.plazo}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{r.respuesta}</td>
                <td className="px-4 py-3 text-xs text-slate-600">{r.historial}</td>
                <td className="px-4 py-3"><EstadoBadge estado={r.estado} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista Previa Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800">Vista Previa — RT-75</h3>
              <button onClick={() => setShowPreview(false)}><X className="w-4 h-4 text-slate-400 hover:text-slate-600" /></button>
            </div>
            <div className="p-6 space-y-3">
              <PreviewRow label="N° Solicitud" value="RT75-2024-0092 (borrador)" />
              <PreviewRow label="Recepción"    value={form.recepcion} />
              <PreviewRow label="Fecha"        value={form.fecha} />
              <PreviewRow label="Solicitante"  value={form.solicitante} />
              <PreviewRow label="Dirigido a"   value={form.dirigido} />
              <PreviewRow label="Plazo"        value={`${form.plazo} días`} />
              <PreviewRow label="Prioridad"    value={form.prioridad} />
              {form.producto && <PreviewRow label="Producto" value={form.producto} />}
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setShowPreview(false)} className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50">Cerrar</button>
              <button className="px-4 py-2 rounded-lg text-xs font-bold text-white" style={{ backgroundColor:'var(--color-primary)' }}>Imprimir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EstadoBadge({ estado }: { estado: string }) {
  if (estado === 'respondido')    return <span className="flex items-center gap-1 text-xs font-semibold text-green-600"><CheckCircle2 className="w-3.5 h-3.5" /> Respondido</span>;
  if (estado === 'pendiente')     return <span className="flex items-center gap-1 text-xs font-semibold text-amber-500"><Clock className="w-3.5 h-3.5" /> Pendiente</span>;
  return <span className="flex items-center gap-1 text-xs font-semibold text-slate-400"><XCircle className="w-3.5 h-3.5" /> Sin Historial</span>;
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

const INPUT = 'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 placeholder:text-slate-300';
