'use client';
import { useState } from 'react';
import { Search, Eye, Send } from 'lucide-react';
import { mockEstandares } from '@/lib/mockData';

type Estado = 'Activo' | 'En Validación' | 'Por Vencer' | 'Bajo Stock' | 'Vencido' | 'Agotado';

const ESTADO_STYLE: Record<string, { dot: string; text: string }> = {
  'Activo':        { dot: 'bg-green-500',  text: 'text-green-600' },
  'En Validación': { dot: 'bg-blue-500',   text: 'text-blue-600' },
  'Por Vencer':    { dot: 'bg-orange-500', text: 'text-orange-600' },
  'Bajo Stock':    { dot: 'bg-amber-500',  text: 'text-amber-600' },
  'Vencido':       { dot: 'bg-red-500',    text: 'text-red-600' },
  'Agotado':       { dot: 'bg-red-500',    text: 'text-red-600' },
};

const STAT_CARDS = (data: typeof mockEstandares) => [
  {
    value: data.filter(e => e.estado === 'Activo').length,
    label: 'Estándares Activos',
    bg: 'bg-green-50',
    border: 'border-green-100',
    num: 'text-slate-900',
  },
  {
    value: data.filter(e => e.estado === 'En Validación').length,
    label: 'En Validación',
    bg: 'bg-white',
    border: 'border-slate-200',
    num: 'text-slate-900',
  },
  {
    value: data.filter(e => e.estado === 'Por Vencer').length,
    label: 'Por Vencer (30d)',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    num: 'text-slate-900',
  },
  {
    value: data.filter(e => e.estado === 'Vencido' || e.estado === 'Agotado').length,
    label: 'Vencidos',
    bg: 'bg-red-50',
    border: 'border-red-100',
    num: 'text-slate-900',
  },
];

export default function EstandaresBandeja() {
  const [search, setSearch] = useState('');

  const filtered = mockEstandares.filter(e =>
    e.nombre.toLowerCase().includes(search.toLowerCase()) ||
    e.id.toLowerCase().includes(search.toLowerCase()) ||
    e.lote.toLowerCase().includes(search.toLowerCase()) ||
    e.certificado.toLowerCase().includes(search.toLowerCase())
  );

  const stats = STAT_CARDS(mockEstandares);

  return (
    <div className="space-y-5 pb-12">
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className={`${s.bg} border ${s.border} rounded-md p-5 shadow-sm`}>
            <p className={`text-4xl font-black ${s.num} leading-none`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-2">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
          <p className="font-semibold text-slate-800 text-sm">Inventario de Estándares</p>
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar estándar..."
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
                {['N° RG-44','ESTÁNDAR','LOTE','CERTIFICADO','CANTIDAD INICIAL','CANTIDAD ACTUAL','VENCIMIENTO','ESTADO','ACCIONES'].map(h => (
                  <th key={h} className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(item => {
                const style = ESTADO_STYLE[item.estado] ?? { dot: 'bg-slate-400', text: 'text-slate-600' };
                const isActualRed = item.cantidadActual === 0;
                const isActualOrange = item.cantidadActual > 0 && item.cantidadActual <= 50;
                const actualColor = isActualRed
                  ? 'text-red-600'
                  : isActualOrange
                  ? 'text-orange-500'
                  : 'text-slate-800';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors h-[68px] group">
                    {/* N° RG-44 */}
                    <td className="px-5">
                      <span className="text-xs font-bold text-[var(--color-primary)] font-mono">{item.rg44No}</span>
                    </td>

                    {/* Estándar */}
                    <td className="px-5 max-w-[200px]">
                      <p className="text-xs font-semibold text-slate-800 truncate">{item.nombre}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Lote: {item.lote}</p>
                    </td>

                    {/* Lote */}
                    <td className="px-5">
                      <span className="text-[11px] text-slate-500 font-mono">{item.lote}</span>
                    </td>

                    {/* Certificado */}
                    <td className="px-5">
                      <span className="text-[11px] text-slate-500 font-mono">{item.certificado}</span>
                    </td>

                    {/* Cantidad Inicial */}
                    <td className="px-5">
                      <span className="text-xs text-slate-400">
                        {item.cantidadInicial} <span className="text-[10px]">{item.unidad}</span>
                      </span>
                    </td>

                    {/* Cantidad Actual */}
                    <td className="px-5">
                      <span className={`text-xs font-bold ${actualColor}`}>
                        {item.cantidadActual} <span className="text-[10px] font-normal">{item.unidad}</span>
                      </span>
                    </td>

                    {/* Vencimiento */}
                    <td className="px-5">
                      <span className={`text-xs ${item.estado === 'Vencido' ? 'text-red-600 font-semibold' : item.estado === 'Por Vencer' ? 'text-orange-600 font-semibold' : 'text-slate-600'}`}>
                        {item.fechaVencimiento}
                      </span>
                    </td>

                    {/* Estado */}
                    <td className="px-5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${style.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />
                        {item.estado}
                      </span>
                    </td>

                    {/* Acciones */}
                    <td className="px-5">
                      <div className="flex items-center gap-2">
                        <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors" title="Ver hoja técnica">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors" title="Registrar entrega">
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-5 py-16 text-center text-slate-400 text-sm">
                    No se encontraron estándares.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
