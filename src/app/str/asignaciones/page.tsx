'use client';
import { useState } from 'react';
import { UserPlus, Send, Eye, CheckCircle2, X } from 'lucide-react';

const ANALISTAS_FFQQ  = ['Karla Suazo','Jorge Matute','Ana López','Roberto Mejía','Sofía Ramos'];
const ANALISTAS_MICRO = ['Teresa Montoya','Pedro Alvarado','Lucía Torres'];
const PRIORIDADES     = ['Normal','Alta','Urgente','Baja'];

interface Prueba {
  area: 'FFQQ' | 'Micro';
  nombre: string;
  auxiliar: string;
  analista: string;
  prioridad: string;
}

const PRUEBAS_DEFAULT: Prueba[] = [
  { area: 'FFQQ', nombre: 'Descripción / Caracteres Organolépticos', auxiliar: 'RT-71', analista: 'Karla Suazo',  prioridad: 'Normal' },
  { area: 'FFQQ', nombre: 'Identificación por IR',                    auxiliar: 'RT-86', analista: 'Karla Suazo',  prioridad: 'Normal' },
  { area: 'FFQQ', nombre: 'Valoración por HPLC',                      auxiliar: 'RT-84', analista: 'Karla Suazo',  prioridad: 'Normal' },
  { area: 'FFQQ', nombre: 'Disolución',                               auxiliar: 'RT-85', analista: 'Jorge Matute', prioridad: 'Normal' },
  { area: 'FFQQ', nombre: 'Uniformidad de Contenido',                 auxiliar: 'RT-87', analista: 'Jorge Matute', prioridad: 'Normal' },
  { area: 'Micro', nombre: 'Recuento Microbiano Total + Ausencia Patógenos', auxiliar: 'RT-74', analista: 'Teresa Montoya', prioridad: 'Normal' },
];

export default function AsignacionesRT40() {
  const [recepcion, setRecepcion]     = useState('REC-2024-00147 — AMOXICILINA 500mg');
  const [fecha, setFecha]             = useState('2024-01-18');
  const [supervisor, setSupervisor]   = useState('Q.F. Roberto Paz');
  const [pruebas, setPruebas]         = useState<Prueba[]>(PRUEBAS_DEFAULT);
  const [instrucciones, setInstr]     = useState('');
  const [saved, setSaved]             = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const updatePrueba = (i: number, field: keyof Prueba, val: string) =>
    setPruebas(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: val } : p));

  const handleEmitir = () => {
    setSaved(true);
    setShowPreview(false);
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div className="space-y-4 pb-12">
      {saved && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-md shadow-xl text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> RT-40 emitido. Analistas notificados.
        </div>
      )}

      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        {/* Title */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-[var(--color-primary)]" />
          <span className="font-semibold text-slate-800 text-sm">Asignación a Analistas — RT-40</span>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Row 1: Recepción + Fecha + Supervisor */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Recepción <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={recepcion}
                onChange={e => setRecepcion(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Fecha de Asignación <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Supervisor STR</label>
              <input
                type="text"
                value={supervisor}
                onChange={e => setSupervisor(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
          </div>

          {/* Asignación por área y prueba */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              Asignación por Área y Prueba
            </p>
            <div className="border border-slate-200 rounded overflow-hidden divide-y divide-slate-100">
              {pruebas.map((p, i) => (
                <div key={i} className="flex items-center gap-0 hover:bg-slate-50/40 transition-colors">
                  {/* Area badge cell */}
                  <div className="w-20 shrink-0 px-4 py-3.5 self-stretch flex items-center border-r border-slate-100">
                    <span className={`text-xs font-bold ${
                      p.area === 'FFQQ' ? 'text-[var(--color-primary)]' : 'text-teal-600'
                    }`}>
                      {p.area}
                    </span>
                  </div>

                  {/* Prueba name + auxiliar */}
                  <div className="flex-1 px-4 py-3 min-w-0">
                    <p className="text-xs font-medium text-slate-800 leading-snug">{p.nombre}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Auxiliar: {p.auxiliar}</p>
                  </div>

                  {/* Analista */}
                  <div className="w-44 shrink-0 px-3 py-2.5 border-l border-slate-100">
                    <select
                      value={p.analista}
                      onChange={e => updatePrueba(i, 'analista', e.target.value)}
                      className="w-full border border-slate-200 rounded px-2 py-1 text-xs text-slate-700 focus:outline-none focus:border-[var(--color-primary)] bg-white"
                    >
                      {(p.area === 'FFQQ' ? ANALISTAS_FFQQ : ANALISTAS_MICRO).map(a => (
                        <option key={a}>{a}</option>
                      ))}
                    </select>
                  </div>

                  {/* Prioridad */}
                  <div className="w-32 shrink-0 px-3 py-2.5 border-l border-slate-100">
                    <select
                      value={p.prioridad}
                      onChange={e => updatePrueba(i, 'prioridad', e.target.value)}
                      className="w-full border border-slate-200 rounded px-2 py-1 text-xs text-slate-700 focus:outline-none focus:border-[var(--color-primary)] bg-white"
                    >
                      {PRIORIDADES.map(pr => <option key={pr}>{pr}</option>)}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instrucciones especiales */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Instrucciones Especiales para los Analistas
            </label>
            <textarea
              rows={4}
              placeholder="Instrucciones especiales, condiciones particulares de análisis, observaciones del STR..."
              value={instrucciones}
              onChange={e => setInstr(e.target.value)}
              className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white resize-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/40 flex items-center gap-3">
          <button
            onClick={handleEmitir}
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded text-sm font-bold shadow-sm transition-colors"
          >
            <Send className="w-4 h-4" /> Emitir RT-40 y Asignar
          </button>
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded text-sm font-semibold transition-colors"
          >
            <Eye className="w-4 h-4" /> Vista Previa RT-40
          </button>
        </div>
      </div>

      {/* Vista Previa Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-md shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white">
              <div>
                <p className="font-bold text-slate-900 text-base">Vista Previa — RT-40</p>
                <p className="text-xs text-slate-400">Hoja de Asignación Analítica</p>
              </div>
              <button onClick={() => setShowPreview(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 border border-slate-100 rounded p-4">
                {[['Recepción', recepcion],['Fecha', fecha],['Supervisor', supervisor]].map(([k,v]) => (
                  <div key={k}><span className="text-xs text-slate-400">{k}: </span><span className="font-semibold text-slate-800">{v}</span></div>
                ))}
              </div>
              <div className="border border-slate-100 rounded overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider grid grid-cols-4 gap-2">
                  <span>Área</span><span className="col-span-2">Prueba</span><span>Analista</span>
                </div>
                {pruebas.map((p, i) => (
                  <div key={i} className="px-4 py-2.5 border-t border-slate-100 grid grid-cols-4 gap-2 items-center">
                    <span className={`text-xs font-bold ${p.area === 'FFQQ' ? 'text-[var(--color-primary)]' : 'text-teal-600'}`}>{p.area}</span>
                    <div className="col-span-2">
                      <p className="text-xs text-slate-800">{p.nombre}</p>
                      <p className="text-[10px] text-slate-400">{p.auxiliar}</p>
                    </div>
                    <span className="text-xs text-slate-600">{p.analista}</span>
                  </div>
                ))}
              </div>
              {instrucciones && (
                <div className="border border-slate-100 rounded p-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Instrucciones</p>
                  <p className="text-xs text-slate-700">{instrucciones}</p>
                </div>
              )}
            </div>
            <div className="flex gap-3 justify-end px-6 py-4 border-t border-slate-100">
              <button onClick={() => setShowPreview(false)} className="px-4 py-2 border border-slate-200 rounded text-sm font-semibold text-slate-600 hover:bg-slate-50">Cerrar</button>
              <button onClick={handleEmitir} className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded text-sm font-bold shadow-sm">
                <Send className="w-4 h-4" /> Confirmar y Emitir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
