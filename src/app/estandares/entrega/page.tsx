'use client';
import { useState } from 'react';
import { Send, Printer, CheckCircle2 } from 'lucide-react';
import { mockEstandares } from '@/lib/mockData';

const DESTINOS = [
  'FFQQ — Análisis Fisico-Quimico',
  'Microbiología — Control Microbiológico',
  'STCC — Sección Técnica de Control de Calidad',
  'Fisicoquímica — Análisis General',
];
const ANALISTAS = ['Q.F. Karla Suazo','Q.F. Jorge Matute','Q.F. Ana López','Q.F. Roberto Mejía','Q.F. Sofía Ramos'];

const HISTORIAL = [
  { rt27: 'RT27-2024-001', estandar: 'Amoxicilina Trihidrato USP RS', cantidad: '50', unidad: 'mg', destino: 'FFQQ', analista: 'Karla Suazo', fecha: '18/01/2024', recepcion: 'REC-2024-00147' },
  { rt27: 'RT27-2024-002', estandar: 'Amoxicilina Trihidrato USP RS', cantidad: '30', unidad: 'mg', destino: 'FFQQ', analista: 'Jorge Matute', fecha: '18/01/2024', recepcion: 'REC-2024-00147' },
  { rt27: 'RT27-2024-003', estandar: 'Metformina HCl USP RS',        cantidad: '40', unidad: 'mg', destino: 'FFQQ', analista: 'Karla Suazo', fecha: '15/01/2024', recepcion: 'REC-2024-00146' },
];

export default function EntregaRT27() {
  const [selectedEst, setSelectedEst]   = useState(mockEstandares[0].id);
  const [cantidad, setCantidad]         = useState('');
  const [unidad, setUnidad]             = useState('mg');
  const [destino, setDestino]           = useState('FFQQ — Análisis Fisico-Quimico');
  const [analista, setAnalista]         = useState('Q.F. Karla Suazo');
  const [fecha, setFecha]               = useState('');
  const [recepcion, setRecepcion]       = useState('REC-2024-00147 — AMOXICILINA 500mg');
  const [responsable, setResponsable]   = useState('Q.F. Luis Hernández');
  const [temperatura, setTemperatura]   = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [saved, setSaved]               = useState(false);

  const estSel = mockEstandares.find(e => e.id === selectedEst);

  const handleRegistrar = () => {
    setSaved(true);
    setCantidad(''); setFecha(''); setObservaciones(''); setTemperatura('');
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div className="space-y-5 pb-12">
      {saved && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-md shadow-xl text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> Entrega RT-27 registrada exitosamente.
        </div>
      )}

      {/* Form card */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <Send className="w-4 h-4 text-[var(--color-primary)]" />
          <span className="font-semibold text-slate-800 text-sm">Entrega de Estándar — RT-27</span>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Row 1: Estándar + Cantidad + Unidad */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Estándar a Entregar <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedEst}
                onChange={e => setSelectedEst(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              >
                {mockEstandares.filter(e => e.estado !== 'Vencido' && e.estado !== 'Agotado').map(e => (
                  <option key={e.id} value={e.id}>
                    {e.rg44No} — {e.nombre} ({e.cantidadActual} {e.unidad} disponibles)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Cantidad a Entregar <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.0"
                  value={cantidad}
                  onChange={e => setCantidad(e.target.value)}
                  className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                  {estSel?.unidad ?? 'mg'}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Unidad</label>
              <select
                value={unidad}
                onChange={e => setUnidad(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              >
                {['mg','g','mL','µg','UI'].map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>

          {/* Row 2: Destino + Analista + Fecha */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Destino / Área Receptora <span className="text-red-500">*</span>
              </label>
              <select
                value={destino}
                onChange={e => setDestino(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              >
                {DESTINOS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Analista Receptor <span className="text-red-500">*</span>
              </label>
              <select
                value={analista}
                onChange={e => setAnalista(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              >
                {ANALISTAS.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Fecha de Entrega <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
                placeholder="dd/mm/aaaa"
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
          </div>

          {/* Row 3: Recepción + Responsable + Temperatura */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Recepción Asociada</label>
              <input
                type="text"
                value={recepcion}
                onChange={e => setRecepcion(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Responsable de Entrega</label>
              <input
                type="text"
                value={responsable}
                onChange={e => setResponsable(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Temperatura al Momento de Entrega (°C)
              </label>
              <input
                type="number"
                placeholder="22.5"
                value={temperatura}
                onChange={e => setTemperatura(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
          </div>

          {/* Observaciones */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Observaciones de la Entrega</label>
            <textarea
              rows={3}
              placeholder="Observaciones sobre la entrega del estándar..."
              value={observaciones}
              onChange={e => setObservaciones(e.target.value)}
              className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white resize-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/40 flex items-center gap-3">
          <button
            onClick={handleRegistrar}
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded text-sm font-bold shadow-sm transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" /> Registrar Entrega RT-27
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded text-sm font-semibold transition-colors">
            <Printer className="w-4 h-4" /> Imprimir RT-27
          </button>
        </div>
      </div>

      {/* Historial */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <p className="font-semibold text-slate-800 text-sm">Historial de Entregas RT-27</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {['N° RT-27','ESTÁNDAR','CANTIDAD','DESTINO','ANALISTA','FECHA','RECEPCIÓN','ACCIONES'].map(h => (
                  <th key={h} className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {HISTORIAL.map(row => (
                <tr key={row.rt27} className="hover:bg-slate-50/60 transition-colors h-[60px]">
                  <td className="px-5 text-xs font-bold text-[var(--color-primary)] font-mono">{row.rt27}</td>
                  <td className="px-5 text-xs font-medium text-slate-800">{row.estandar}</td>
                  <td className="px-5">
                    <span className="text-xs font-semibold text-slate-700">{row.cantidad}</span>
                    <span className="text-[10px] text-slate-400 ml-1">{row.unidad}</span>
                  </td>
                  <td className="px-5 text-xs text-slate-600">{row.destino}</td>
                  <td className="px-5 text-xs text-slate-600">{row.analista}</td>
                  <td className="px-5 text-xs text-slate-500">{row.fecha}</td>
                  <td className="px-5 text-[11px] text-slate-400 font-mono">{row.recepcion}</td>
                  <td className="px-5">
                    <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors" title="Imprimir RT-27">
                      <Printer className="w-3.5 h-3.5" />
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
