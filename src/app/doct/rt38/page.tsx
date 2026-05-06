'use client';
import { useState } from 'react';
import { FileText, Send, Printer, CheckSquare, Square, Plus, CheckCircle2, X } from 'lucide-react';

interface Prueba { id: string; nombre: string; tecnica: string; area: string; auxiliar: string; checked: boolean; obligatoria: boolean }

const INIT_PRUEBAS: Prueba[] = [
  { id:'p1', nombre:'Descripción / Caracteres Organolépticos', tecnica:'Visual',         area:'FFQQ', auxiliar:'RT-71', checked:true,  obligatoria:true  },
  { id:'p2', nombre:'Identificación por Espectrofotometría IR', tecnica:'IR',            area:'FFQQ', auxiliar:'RT-86', checked:true,  obligatoria:true  },
  { id:'p3', nombre:'Valoración por HPLC',                      tecnica:'HPLC',          area:'FFQQ', auxiliar:'RT-84', checked:true,  obligatoria:true  },
  { id:'p4', nombre:'Disolución',                               tecnica:'Disolución',    area:'FFQQ', auxiliar:'RT-85', checked:true,  obligatoria:true  },
  { id:'p5', nombre:'Uniformidad de Contenido',                 tecnica:'Gravimétrico',  area:'FFQQ', auxiliar:'RT-87', checked:false, obligatoria:false },
  { id:'p6', nombre:'Prueba de Desintegración',                 tecnica:'Mecánico',      area:'FFQQ', auxiliar:'RT-55', checked:false, obligatoria:false },
  { id:'p7', nombre:'Recuento Microbiano Total',                tecnica:'Microbiológico',area:'Micro',auxiliar:'RT-74', checked:true,  obligatoria:true  },
  { id:'p8', nombre:'Ausencia de Patógenos',                    tecnica:'Microbiológico',area:'Micro',auxiliar:'RT-74', checked:true,  obligatoria:true  },
];

export default function Rt38Page() {
  const [pruebas, setPruebas] = useState<Prueba[]>(INIT_PRUEBAS);
  const [obs, setObs] = useState('');
  const [saved, setSaved] = useState(false);

  const toggle = (id: string) => setPruebas(ps => ps.map(p => p.id===id ? {...p, checked:!p.checked} : p));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-5">
          <FileText className="w-4 h-4" style={{ color:'var(--color-primary)' }} />
          Preparación de Expediente Analítico — RT-38
        </h3>

        {/* Header fields */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Field label="Recepción *">
            <input className={INPUT} defaultValue="REC-2024-00147 — AMOXICILINA 500mg" />
          </Field>
          <Field label="Fecha de Preparación">
            <input type="text" className={INPUT} defaultValue="16/01/2024" />
          </Field>
          <Field label="Responsable DOCT">
            <input className={INPUT} defaultValue="Q.F. Ana Patricia Flores" readOnly />
          </Field>
          <Field label="Metodología de Referencia">
            <input className={INPUT} defaultValue="USP 47 — Amoxicillin Capsules" />
          </Field>
          <Field label="Versión del RT-38">
            <input className={INPUT} defaultValue="1.0" />
          </Field>
          <Field label="Estado del Expediente">
            <input className={INPUT} value="En Preparación" readOnly />
          </Field>
        </div>

        {/* Pruebas configuradas */}
        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Pruebas Configuradas en el RT-38</h4>
        <div className="space-y-2 mb-2">
          {pruebas.map(p => (
            <div key={p.id} className={`flex items-center gap-3 px-3 py-3 rounded-lg border transition-colors ${p.checked ? 'border-slate-200 bg-white' : 'border-slate-100 bg-slate-50/50'}`}>
              <button onClick={() => !p.obligatoria && toggle(p.id)} className={p.obligatoria ? 'cursor-default' : 'cursor-pointer'}>
                {p.checked
                  ? <CheckSquare className="w-4 h-4 text-[var(--color-primary)]" />
                  : <Square      className="w-4 h-4 text-slate-300" />
                }
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-700">{p.nombre}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Técnica: {p.tecnica} · Área: {p.area} · Auxiliar: {p.auxiliar}
                </p>
              </div>
              {p.obligatoria && (
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider border border-slate-200 px-1.5 py-0.5 rounded">
                  Obligatoria
                </span>
              )}
            </div>
          ))}
        </div>
        <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 text-[var(--color-primary)] hover:bg-blue-50 rounded-lg transition-colors mb-6">
          <Plus className="w-3.5 h-3.5" /> Agregar prueba adicional
        </button>

        {/* Observaciones */}
        <Field label="Observaciones del Expediente Analítico">
          <textarea rows={3} className={INPUT + ' resize-none'} placeholder="Observaciones sobre la configuración del expediente analítico..." value={obs} onChange={e=>setObs(e.target.value)} />
        </Field>

        {/* Actions */}
        <div className="flex gap-3 mt-5">
          <button onClick={() => setSaved(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white" style={{ backgroundColor:'var(--color-primary)' }}>
            <CheckCircle2 className="w-3.5 h-3.5" /> Finalizar RT-38
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50">
            <Send className="w-3.5 h-3.5" /> Enviar a STR
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50">
            <Printer className="w-3.5 h-3.5" /> Imprimir
          </button>
        </div>

        {saved && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-4 py-3">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <p className="text-xs font-semibold text-green-700">RT-38 finalizado y enviado correctamente.</p>
            <button onClick={() => setSaved(false)} className="ml-auto"><X className="w-4 h-4 text-green-400" /></button>
          </div>
        )}
      </div>
    </div>
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

const INPUT = 'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 placeholder:text-slate-300';
