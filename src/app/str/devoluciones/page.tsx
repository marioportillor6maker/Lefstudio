'use client';
import { useState } from 'react';
import { RotateCcw, CheckCircle2, Eye } from 'lucide-react';

const MOTIVOS = ['Documentación incompleta','RT-38 con errores','Estándar no válido','Datos del cliente incorrectos','Falta certificado del fabricante','Discrepancia en pruebas','Otro'];

const HISTORIAL = [
  { caso: 'REC-2024-00143', producto: 'DICLOFENACO 75mg',  motivo: 'RT-38 con errores',  fechaDev: '14/01/2024', plazo: '17/01/2024', estado: 'Corregido' },
  { caso: 'REC-2024-00139', producto: 'CAPTOPRIL 25mg',    motivo: 'Estándar no válido', fechaDev: '10/01/2024', plazo: '13/01/2024', estado: 'Pendiente' },
];

export default function Devoluciones() {
  const [recepcion, setRecepcion]   = useState('REC-2024-00147 — AMOXICILINA 500mg');
  const [fecha, setFecha]           = useState('');
  const [motivo, setMotivo]         = useState('Documentación incompleta');
  const [responsable, setResp]      = useState('Q.F. Roberto Paz');
  const [descripcion, setDesc]      = useState('');
  const [plazo, setPlazo]           = useState('3');
  const [saved, setSaved]           = useState(false);

  const handleRegistrar = () => {
    setSaved(true);
    setDesc(''); setFecha('');
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div className="space-y-5 pb-12">
      {saved && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-red-600 text-white px-5 py-3 rounded-md shadow-xl text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> Devolución registrada. DOCT fue notificado.
        </div>
      )}

      {/* Form card */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-orange-500" />
          <span className="font-semibold text-slate-800 text-sm">Registrar Devolución a DOCT</span>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Row 1: Recepción + Fecha */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Recepción <span className="text-red-500">*</span>
              </label>
              <input type="text" value={recepcion} onChange={e => setRecepcion(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Fecha de Devolución <span className="text-red-500">*</span>
              </label>
              <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} placeholder="dd/mm/aaaa"
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white" />
            </div>
          </div>

          {/* Row 2: Motivo + Responsable */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Motivo Principal <span className="text-red-500">*</span>
              </label>
              <select value={motivo} onChange={e => setMotivo(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white">
                {MOTIVOS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Responsable STR</label>
              <input type="text" value={responsable} onChange={e => setResp(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white" />
            </div>
          </div>

          {/* Descripción Detallada */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Descripción Detallada <span className="text-red-500">*</span>
            </label>
            <textarea rows={4}
              placeholder="Describa detalladamente los motivos de la devolución y las correcciones requeridas..."
              value={descripcion} onChange={e => setDesc(e.target.value)}
              className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white resize-none" />
          </div>

          {/* Plazo */}
          <div className="w-1/2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Plazo para Corrección (días)</label>
            <input type="number" value={plazo} onChange={e => setPlazo(e.target.value)}
              className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white" />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/40">
          <button onClick={handleRegistrar}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-bold shadow-sm transition-colors">
            <RotateCcw className="w-4 h-4" /> Registrar Devolución
          </button>
        </div>
      </div>

      {/* Historial */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <p className="font-semibold text-slate-800 text-sm">Historial de Devoluciones STR</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {['RECEPCIÓN','PRODUCTO','MOTIVO','FECHA DEV.','PLAZO','ESTADO','ACCIONES'].map(h => (
                  <th key={h} className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {HISTORIAL.map(row => (
                <tr key={row.caso} className="hover:bg-slate-50/60 h-[60px]">
                  <td className="px-5 text-xs font-bold text-[var(--color-primary)] font-mono">{row.caso}</td>
                  <td className="px-5 text-xs font-medium text-slate-800">{row.producto}</td>
                  <td className="px-5 text-xs text-slate-600">{row.motivo}</td>
                  <td className="px-5 text-xs text-slate-500">{row.fechaDev}</td>
                  <td className="px-5 text-xs text-slate-500">{row.plazo}</td>
                  <td className="px-5">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                      row.estado === 'Corregido' ? 'text-green-600' : 'text-orange-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${row.estado === 'Corregido' ? 'bg-green-500' : 'bg-orange-500'}`} />
                      {row.estado}
                    </span>
                  </td>
                  <td className="px-5">
                    <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
