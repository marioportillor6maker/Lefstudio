'use client';
import { useState } from 'react';
import { Search, FlaskConical } from 'lucide-react';

const CASOS = [
  { id: 'REC-2024-00147', producto: 'AMOXICILINA 500mg',  asignadas: 4, completadas: 1, pendientes: 3, dias: '1d', estado: 'En Análisis' },
  { id: 'REC-2024-00145', producto: 'LOSARTÁN 50mg',      asignadas: 5, completadas: 5, pendientes: 0, dias: '5d', estado: 'Completado' },
  { id: 'REC-2024-00143', producto: 'DICLOFENACO 75mg',   asignadas: 4, completadas: 2, pendientes: 2, dias: '3d', estado: 'En Análisis' },
  { id: 'REC-2024-00140', producto: 'AMLODIPINO 5mg',     asignadas: 6, completadas: 0, pendientes: 6, dias: '0d', estado: 'Pendiente' },
];

const ESTADO_STYLE: Record<string, { dot: string; text: string }> = {
  'En Análisis': { dot: 'bg-blue-500',   text: 'text-blue-600' },
  'Completado':  { dot: 'bg-green-500',  text: 'text-green-600' },
  'Pendiente':   { dot: 'bg-orange-500', text: 'text-orange-500' },
};

export default function BandejaAnalista() {
  const [search, setSearch] = useState('');

  const filtered = CASOS.filter(c =>
    c.id.toLowerCase().includes(search.toLowerCase()) ||
    c.producto.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 pb-12">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm">
          <p className="text-4xl font-black text-slate-900 leading-none">8</p>
          <p className="text-xs text-slate-500 mt-2">Casos Asignados</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-100 rounded-md p-5 shadow-sm">
          <p className="text-4xl font-black text-slate-900 leading-none">5</p>
          <p className="text-xs text-slate-500 mt-2">En Análisis</p>
        </div>
        <div className="bg-orange-50 border border-orange-100 rounded-md p-5 shadow-sm">
          <p className="text-4xl font-black text-slate-900 leading-none">23</p>
          <p className="text-xs text-slate-500 mt-2">Pruebas Pendientes</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-md p-5 shadow-sm">
          <p className="text-4xl font-black text-slate-900 leading-none">3</p>
          <p className="text-xs text-slate-500 mt-2">Completados Hoy</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <p className="font-semibold text-slate-800 text-sm">Casos Asignados — Q.F. Karla Suazo</p>
          <div className="relative w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar caso..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:border-[var(--color-primary)] bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {['RECEPCIÓN','PRODUCTO','PRUEBAS ASIGNADAS','COMPLETADAS','PENDIENTES','DÍAS','ESTADO','ACCIONES'].map(h => (
                  <th key={h} className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(row => {
                const est = ESTADO_STYLE[row.estado] ?? { dot: 'bg-slate-400', text: 'text-slate-600' };
                return (
                  <tr key={row.id} className="hover:bg-slate-50/60 transition-colors h-[64px]">
                    <td className="px-5 text-xs font-bold text-[var(--color-primary)] font-mono">{row.id}</td>
                    <td className="px-5 text-xs font-medium text-slate-800">{row.producto}</td>
                    <td className="px-5 text-xs text-slate-600 text-center">{row.asignadas}</td>
                    <td className="px-5 text-center">
                      <span className={`text-xs font-bold ${row.completadas > 0 ? 'text-green-600' : 'text-slate-400'}`}>
                        {row.completadas}
                      </span>
                    </td>
                    <td className="px-5 text-center">
                      <span className={`text-xs font-bold ${row.pendientes > 0 ? 'text-orange-500' : 'text-slate-400'}`}>
                        {row.pendientes}
                      </span>
                    </td>
                    <td className="px-5 text-xs text-slate-500">{row.dias}</td>
                    <td className="px-5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${est.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${est.dot}`} />
                        {row.estado}
                      </span>
                    </td>
                    <td className="px-5">
                      <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:underline">
                        <FlaskConical className="w-3.5 h-3.5" /> Analizar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
