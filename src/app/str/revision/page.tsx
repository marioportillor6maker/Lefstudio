'use client';
import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ChevronDown } from 'lucide-react';

const CASOS = [
  { id: 'REC-2024-00147', label: 'REC-2024-00147 — AMOXICILINA 500mg' },
  { id: 'REC-2024-00148', label: 'REC-2024-00148 — IBUPROFENO 400mg' },
  { id: 'REC-2024-00149', label: 'REC-2024-00149 — METFORMINA 850mg' },
];

const DOCUMENTOS_BASE = [
  { codigo: 'RG-41',  nombre: 'Registro Maestro de Ingreso',          ok: true,  nota: '' },
  { codigo: 'RG-13',  nombre: 'Recepción de Documentos y Muestras',   ok: true,  nota: '' },
  { codigo: 'RG-72',  nombre: 'Carátula de Expediente',               ok: true,  nota: '' },
  { codigo: 'RT-159', nombre: 'Distribución de Muestra',              ok: true,  nota: '' },
  { codigo: 'RT-75',  nombre: 'Solicitud de Expediente',              ok: true,  nota: '' },
  { codigo: 'RT-41',  nombre: 'Contraste Histórico',                  ok: true,  nota: '' },
  { codigo: 'RT-30',  nombre: 'Solicitud de Información/Estándar',    ok: true,  nota: '' },
  { codigo: 'RG-44',  nombre: 'Registro de Estándar',                 ok: true,  nota: '' },
  { codigo: 'RT-38',  nombre: 'Expediente Analítico',                 ok: true,  nota: '' },
  { codigo: '',       nombre: 'Certificado de Análisis del Fabricante', ok: false, nota: 'Pendiente de recibir del cliente' },
  { codigo: '',       nombre: 'Metodología Analítica (USP)',           ok: true,  nota: '' },
];

const STATUS_OPTIONS = ['Completo','Pendiente','No Aplica','Observado'];

const RESUMEN = {
  recepcion: 'REC-2024-00147',
  producto: 'AMOXICILINA 500mg',
  tipoTramite: 'Control de Calidad',
  pruebasRT38: '8 pruebas configuradas',
  estandar: 'RG44-2024-001 ✓',
  diasSTR: '1 día',
};

export default function RevisionDocumental() {
  const [casoIdx, setCasoIdx]   = useState(0);
  const [statuses, setStatuses] = useState<string[]>(DOCUMENTOS_BASE.map(() => 'Completo'));
  const [aprobado, setAprobado] = useState<null | 'aprobado' | 'devuelto'>(null);

  const setStatus = (i: number, val: string) =>
    setStatuses(prev => prev.map((s, idx) => idx === i ? val : s));

  const handleAprobar = () => { setAprobado('aprobado'); setTimeout(() => setAprobado(null), 3000); };
  const handleDevolver = () => { setAprobado('devuelto'); setTimeout(() => setAprobado(null), 3000); };

  return (
    <div className="space-y-4 pb-12">
      {aprobado === 'aprobado' && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-md shadow-xl text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> Expediente aprobado por STR. Se notificará a FFQQ/Micro.
        </div>
      )}
      {aprobado === 'devuelto' && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-orange-600 text-white px-5 py-3 rounded-md shadow-xl text-sm font-semibold">
          <RotateCcw className="w-4 h-4 shrink-0" /> Expediente devuelto a RAC con observaciones.
        </div>
      )}

      <div className="grid grid-cols-3 gap-5">
        {/* Left: documento list */}
        <div className="col-span-2">
          <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
            {/* Card header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <p className="font-semibold text-slate-800 text-sm">Revisión del Paquete Documental</p>
              {/* Caso selector */}
              <div className="relative">
                <select
                  value={casoIdx}
                  onChange={e => setCasoIdx(Number(e.target.value))}
                  className="appearance-none bg-slate-100 border border-slate-200 rounded px-3 py-1.5 pr-7 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[var(--color-primary)] cursor-pointer"
                >
                  {CASOS.map((c, i) => <option key={c.id} value={i}>{c.label}</option>)}
                </select>
                <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Document rows */}
            <div className="divide-y divide-slate-100">
              {DOCUMENTOS_BASE.map((doc, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/50 transition-colors">
                  {/* Status icon */}
                  <div className="shrink-0">
                    {doc.ok
                      ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                      : <XCircle className="w-5 h-5 text-red-500" />
                    }
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-800">
                      {doc.codigo && <span className="font-bold text-slate-700">{doc.codigo} — </span>}
                      {doc.nombre}
                    </p>
                    {doc.nota && (
                      <p className="text-[11px] text-red-500 mt-0.5">{doc.nota}</p>
                    )}
                  </div>

                  {/* Status select */}
                  <select
                    value={statuses[i]}
                    onChange={e => setStatus(i, e.target.value)}
                    className="shrink-0 border border-slate-200 rounded px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-white focus:outline-none focus:border-[var(--color-primary)] w-28"
                  >
                    {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: decisión + resumen */}
        <div className="space-y-4">
          {/* Decisión STR */}
          <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100">
              <p className="font-semibold text-slate-800 text-sm">Decisión STR</p>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              <button
                onClick={handleAprobar}
                className="flex items-center justify-center gap-2 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded text-xs font-bold transition-colors shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Aprobar
              </button>
              <button
                onClick={handleDevolver}
                className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded text-xs font-bold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Devolver
              </button>
            </div>
          </div>

          {/* Resumen del Caso */}
          <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100">
              <p className="font-semibold text-slate-800 text-sm">Resumen del Caso</p>
            </div>
            <div className="px-5 py-4 space-y-3">
              {[
                ['Recepción',    RESUMEN.recepcion],
                ['Producto',     RESUMEN.producto],
                ['Tipo Trámite', RESUMEN.tipoTramite],
                ['Pruebas RT-38',RESUMEN.pruebasRT38],
                ['Estándar',     RESUMEN.estandar],
                ['Días en STR',  RESUMEN.diasSTR],
              ].map(([label, val]) => (
                <div key={label} className="flex items-start justify-between gap-2">
                  <span className="text-[11px] text-slate-400 shrink-0">{label}</span>
                  <span className="text-[11px] font-semibold text-slate-800 text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progreso documental */}
          <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100">
              <p className="font-semibold text-slate-800 text-sm">Completitud</p>
            </div>
            <div className="p-5">
              {(() => {
                const total   = DOCUMENTOS_BASE.length;
                const ok      = DOCUMENTOS_BASE.filter(d => d.ok).length;
                const pct     = Math.round((ok / total) * 100);
                return (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-500">{ok} / {total} documentos</span>
                      <span className="text-xs font-bold text-slate-700">{pct}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--color-primary)] transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    {DOCUMENTOS_BASE.filter(d => !d.ok).length > 0 && (
                      <p className="text-[11px] text-red-500 mt-2 font-medium">
                        {DOCUMENTOS_BASE.filter(d => !d.ok).length} documento(s) con observaciones
                      </p>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
