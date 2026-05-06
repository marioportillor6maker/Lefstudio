import Link from 'next/link';
import { ShieldCheck, UserPlus, Activity, CheckCircle2, Clock, Search, Filter } from 'lucide-react';

const PENDIENTES = [
  { id: 'REC-2024-00147', producto: 'Amoxicilina Susp. 500mg', lote: 'L-552083', cliente: 'IHSS',           estado: 'Pendiente Revisión', pruebas: 8, sla: '2h restantes', prioridad: 'Alta' },
  { id: 'REC-2024-00148', producto: 'Ibuprofeno Jbe 200mg/5mL', lote: 'L-22100', cliente: 'Hospital General',estado: 'En Revisión STR',   pruebas: 5, sla: '5h restantes', prioridad: 'Media' },
  { id: 'REC-2024-00149', producto: 'Metformina Tab 850mg',      lote: 'L-88211', cliente: 'FarmaSalud',      estado: 'Aprobado STR',       pruebas: 6, sla: 'Completado',  prioridad: 'Normal' },
  { id: 'REC-2024-00150', producto: 'Loratadina Tab 10mg',        lote: 'L-99302', cliente: 'SESAL',           estado: 'Pendiente Revisión', pruebas: 4, sla: '8h restantes', prioridad: 'Normal' },
];

const ESTADO_STYLE: Record<string, string> = {
  'Pendiente Revisión': 'bg-orange-100 text-orange-800 border-orange-200',
  'En Revisión STR':    'bg-blue-100 text-blue-800 border-blue-200',
  'Aprobado STR':       'bg-green-100 text-green-800 border-green-200',
};

export default function BandejaSTR() {
  return (
    <div className="space-y-5 pb-12">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Pendientes de Revisar
          </p>
          <p className="text-3xl font-black text-slate-900 mt-2">2</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-md border border-orange-200 shadow-sm">
          <p className="text-[10px] text-orange-700 font-bold uppercase tracking-wider flex items-center gap-1">
            <Activity className="w-3 h-3" /> Asignación Urgente
          </p>
          <p className="text-3xl font-black text-orange-600 mt-2">1</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200 shadow-sm">
          <p className="text-[10px] text-blue-700 font-bold uppercase tracking-wider flex items-center gap-1">
            <UserPlus className="w-3 h-3" /> Analistas Disponibles
          </p>
          <p className="text-3xl font-black text-blue-600 mt-2">8</p>
        </div>
        <div className="bg-green-50 p-4 rounded-md border border-green-200 shadow-sm">
          <p className="text-[10px] text-green-700 font-bold uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> RT-40 Generados Hoy
          </p>
          <p className="text-3xl font-black text-green-600 mt-2">6</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between gap-4">
          <p className="font-semibold text-slate-700 text-sm">Expedientes en STR</p>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Buscar recepción, producto..." className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-[var(--color-primary)]" />
            </div>
            <button className="flex items-center gap-1.5 border border-slate-200 bg-white px-3 py-1.5 rounded text-xs font-medium text-slate-600 hover:bg-slate-50">
              <Filter className="w-3 h-3" /> Filtrar
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {['N° Recepción','Producto / Lote','Cliente','Pruebas','SLA','Estado','Acción'].map(h => (
                  <th key={h} className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PENDIENTES.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors h-[68px]">
                  <td className="px-5">
                    <span className="text-xs font-bold text-[var(--color-primary)] font-mono block">{item.id}</span>
                    <span className={`text-[10px] font-semibold flex items-center gap-0.5 mt-0.5 ${item.prioridad === 'Alta' ? 'text-red-500' : 'text-slate-400'}`}>
                      <Clock className="w-2.5 h-2.5" /> {item.sla}
                    </span>
                  </td>
                  <td className="px-5">
                    <span className="text-xs font-medium text-slate-800 block">{item.producto}</span>
                    <span className="text-[10px] text-slate-400">Lote: {item.lote}</span>
                  </td>
                  <td className="px-5 text-xs text-slate-600">{item.cliente}</td>
                  <td className="px-5 text-xs font-semibold text-slate-700">{item.pruebas} pruebas</td>
                  <td className="px-5 text-xs text-slate-500">{item.sla}</td>
                  <td className="px-5">
                    <span className={`inline-flex items-center px-2 py-1 rounded border text-[10px] font-bold ${ESTADO_STYLE[item.estado] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {item.estado}
                    </span>
                  </td>
                  <td className="px-5">
                    <Link
                      href="/str/revision"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded text-[11px] font-bold transition-colors"
                    >
                      Revisar
                    </Link>
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
