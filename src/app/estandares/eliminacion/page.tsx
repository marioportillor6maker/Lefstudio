'use client';
import { useState } from 'react';
import { Trash2, Printer, CheckCircle2 } from 'lucide-react';
import { mockEstandares } from '@/lib/mockData';

const MESES = ['Enero 2024','Febrero 2024','Marzo 2024','Abril 2024','Mayo 2024','Junio 2024','Julio 2024','Agosto 2024','Septiembre 2024','Octubre 2024','Noviembre 2024','Diciembre 2024'];
const METODOS = ['Destrucción química','Incineración','Empresa gestora de residuos','Neutralización in situ','Devolución a proveedor'];

// Candidatos: vencidos + agotados + bajo stock
const CANDIDATOS_EXTRA = [
  { id: 'RG44-2023-075', rg44No: 'RG44-2023-075', nombre: 'Paracetamol USP RS', lote: 'USP-PAR-2023Y', cantidadActual: 5, unidad: 'mg', fechaVencimiento: '15/01/2024', estado: 'Vencido' },
];

export default function EliminacionRT45() {
  const [mes, setMes]               = useState('Enero 2024');
  const [fecha, setFecha]           = useState('');
  const [responsable, setResponsable] = useState('Q.F. Luis Hernández');
  const [testigo, setTestigo]       = useState('');
  const [metodo, setMetodo]         = useState('Destrucción química');
  const [observaciones, setObservaciones] = useState('');
  const [saved, setSaved]           = useState(false);

  // Candidatos para eliminar: vencidos/agotados de mockData + extras
  const candidatosMock = mockEstandares.filter(
    e => e.estado === 'Vencido' || e.estado === 'Agotado' || e.estado === 'Bajo Stock'
  );
  const todosLosCandidatos = [...CANDIDATOS_EXTRA, ...candidatosMock];

  // Checked state: all pre-checked (vencidos/agotados)
  const [checks, setChecks] = useState<boolean[]>(
    todosLosCandidatos.map(e => e.estado === 'Vencido' || e.estado === 'Agotado')
  );

  const toggleCheck = (i: number) =>
    setChecks(prev => prev.map((v, idx) => idx === i ? !v : v));

  const handleRegistrar = () => {
    setSaved(true);
    setTestigo(''); setFecha(''); setObservaciones('');
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div className="space-y-4 pb-12">
      {saved && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-md shadow-xl text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> Eliminación RT-45 registrada. Estándares dados de baja.
        </div>
      )}

      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        {/* Title */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <Trash2 className="w-4 h-4 text-red-500" />
          <span className="font-semibold text-slate-800 text-sm">Eliminación Mensual de Estándares — RT-45</span>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Row 1: Mes + Fecha + Responsable */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Mes de Eliminación <span className="text-red-500">*</span>
              </label>
              <select
                value={mes}
                onChange={e => setMes(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              >
                {MESES.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Fecha de Eliminación <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
                placeholder="dd/mm/aaaa"
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Responsable</label>
              <input
                type="text"
                value={responsable}
                onChange={e => setResponsable(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
          </div>

          {/* Row 2: Testigo + Método */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Testigo</label>
              <input
                type="text"
                placeholder="Nombre del testigo"
                value={testigo}
                onChange={e => setTestigo(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Método de Eliminación</label>
              <select
                value={metodo}
                onChange={e => setMetodo(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)] bg-white"
              >
                {METODOS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>

          {/* Estándares a eliminar */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              Estándares a Eliminar
            </p>
            <div className="border border-slate-200 rounded overflow-hidden divide-y divide-slate-100">
              {todosLosCandidatos.map((item, i) => (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors ${
                    checks[i] ? 'bg-white' : 'bg-slate-50/40'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checks[i]}
                    onChange={() => toggleCheck(i)}
                    className="mt-0.5 w-4 h-4 rounded accent-[var(--color-primary)] cursor-pointer shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800">{item.nombre}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {item.rg44No} · Lote: {item.lote} · Cantidad: {item.cantidadActual} {item.unidad}
                    </p>
                    <p className="text-[11px] text-red-500 font-medium mt-0.5">
                      Vencido ({item.fechaVencimiento})
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Observaciones */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Observaciones de la Eliminación
            </label>
            <textarea
              rows={3}
              placeholder="Observaciones sobre el proceso de eliminación..."
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
            <CheckCircle2 className="w-4 h-4" /> Registrar Eliminación RT-45
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded text-sm font-semibold transition-colors">
            <Printer className="w-4 h-4" /> Imprimir RT-45
          </button>
        </div>
      </div>
    </div>
  );
}
