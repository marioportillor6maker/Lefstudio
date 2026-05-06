'use client';
import { useState } from 'react';
import { XCircle, Printer, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { mockEstandares } from '@/lib/mockData';

const ACCIONES = ['Devolver al proveedor','Destruir en sitio','Cuarentena para análisis confirmatorio','Enviar a proveedor para reposición'];
const MOTIVOS  = ['Certificado de análisis no válido','Pureza fuera de especificación','Empaque dañado','Cantidad incorrecta','Fecha de vencimiento no aceptable','Proveedor no calificado','Otro'];

export default function RechazoRG58() {
  const [selectedEst, setSelectedEst]   = useState(mockEstandares.find(e => e.estado === 'En Validación')?.id ?? mockEstandares[0].id);
  const [recepcion, setRecepcion]       = useState('REC-2024-00151');
  const [fechaRechazo, setFechaRechazo] = useState('');
  const [responsable, setResponsable]   = useState('Q.F. Luis Hernández');
  const [motivo, setMotivo]             = useState('Certificado de análisis no válido');
  const [descripcion, setDescripcion]   = useState('');
  const [accion, setAccion]             = useState('Devolver al proveedor');
  const [fechaDevolucion, setFechaDevolucion] = useState('');
  const [saved, setSaved]               = useState(false);

  const handleRegistrar = () => {
    setSaved(true);
    setDescripcion(''); setFechaRechazo(''); setFechaDevolucion('');
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div className="space-y-4 pb-12">
      {saved && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-red-600 text-white px-5 py-3 rounded-md shadow-xl text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> Rechazo RG-58 registrado. Ingreso bloqueado.
        </div>
      )}

      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        {/* Title */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <XCircle className="w-4 h-4 text-red-500" />
          <span className="font-semibold text-slate-800 text-sm">Rechazo / Devolución de Estándar — RG-58</span>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Warning banner */}
          <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded px-4 py-3">
            <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0" />
            <p className="text-xs text-orange-700">
              El rechazo de un estándar bloqueará el ingreso asociado hasta que se reciba un estándar válido.
            </p>
          </div>

          {/* Row 1: Estándar + Recepción */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Estándar a Rechazar <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedEst}
                onChange={e => setSelectedEst(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              >
                {mockEstandares.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.rg44No} — {e.nombre} ({e.estado})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Recepción Asociada</label>
              <input
                type="text"
                value={recepcion}
                onChange={e => setRecepcion(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white font-mono"
              />
            </div>
          </div>

          {/* Row 2: Fecha + Responsable */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Fecha de Rechazo <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={fechaRechazo}
                onChange={e => setFechaRechazo(e.target.value)}
                placeholder="dd/mm/aaaa"
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Responsable del Rechazo</label>
              <input
                type="text"
                value={responsable}
                onChange={e => setResponsable(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
          </div>

          {/* Row 3: Motivo (full width select-like input) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Motivo del Rechazo <span className="text-red-500">*</span>
            </label>
            <select
              value={motivo}
              onChange={e => setMotivo(e.target.value)}
              className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
            >
              {MOTIVOS.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>

          {/* Row 4: Descripción detallada (full width textarea) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Descripción Detallada del Motivo <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Describa detalladamente el motivo del rechazo del estándar..."
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white resize-none"
            />
          </div>

          {/* Row 5: Acción + Fecha devolución */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Acción a Tomar</label>
              <select
                value={accion}
                onChange={e => setAccion(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              >
                {ACCIONES.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Fecha de Devolución / Destrucción
              </label>
              <input
                type="date"
                value={fechaDevolucion}
                onChange={e => setFechaDevolucion(e.target.value)}
                placeholder="dd/mm/aaaa"
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/40 flex items-center gap-3">
          <button
            onClick={handleRegistrar}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-bold shadow-sm transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" /> Registrar Rechazo RG-58
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded text-sm font-semibold transition-colors">
            <Printer className="w-4 h-4" /> Imprimir GR-58
          </button>
        </div>
      </div>
    </div>
  );
}
