'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, CheckCircle2, Clock, AlertTriangle, Eye, FolderOpen, AlertCircle, FileQuestion, FileCheck, XCircle } from 'lucide-react';

type RtStatus = 'ok' | 'pending' | 'alert' | 'none';

interface DoctRow {
  recepcion: string;
  producto: string;
  empresa: string;
  recibido: string;
  estadoRecepcion: 'Aceptado' | 'Retornado';
  fechaEstado: string;
  rt75: RtStatus; rt41: RtStatus; rt30: RtStatus; rt38: RtStatus;
  estado: string; estadoColor: string;
}

const ROWS: DoctRow[] = [
  { recepcion:'LEF-2024-00147', producto:'Amoxicilina 500mg Cápsulas',        empresa:'Laboratorios Farma S.A.',    recibido:'06/11/2024', estadoRecepcion:'Aceptado',  fechaEstado:'06/11/2024', rt75:'ok',      rt41:'ok',      rt30:'ok',      rt38:'ok',      estado:'● En Análisis FFQQ',  estadoColor:'text-blue-600' },
  { recepcion:'LEF-2024-00148', producto:'Ibuprofeno 400mg Tabletas',          empresa:'BioTech Honduras',            recibido:'06/11/2024', estadoRecepcion:'Aceptado',  fechaEstado:'06/11/2024', rt75:'pending', rt41:'pending', rt30:'ok',      rt38:'pending', estado:'● En DOCT',           estadoColor:'text-blue-600' },
  { recepcion:'LEF-2024-00143', producto:'Metformina 850mg Tabletas',          empresa:'MedFarma S.R.L.',             recibido:'22/10/2024', estadoRecepcion:'Aceptado',  fechaEstado:'22/10/2024', rt75:'ok',      rt41:'ok',      rt30:'ok',      rt38:'ok',      estado:'● En Revisión STCC',  estadoColor:'text-teal-600' },
  { recepcion:'LEF-2024-00139', producto:'Atorvastatina 20mg Tabletas',        empresa:'PharmaCentral',               recibido:'12/10/2024', estadoRecepcion:'Aceptado',  fechaEstado:'12/10/2024', rt75:'ok',      rt41:'ok',      rt30:'ok',      rt38:'ok',      estado:'● Emitido al Cliente', estadoColor:'text-green-600' },
  { recepcion:'LEF-2024-00135', producto:'Ciprofloxacino 500mg Tabletas',      empresa:'Laboratorio El Sol',          recibido:'03/10/2024', estadoRecepcion:'Retornado', fechaEstado:'04/10/2024', rt75:'ok',      rt41:'ok',      rt30:'ok',      rt38:'ok',      estado:'● Reanálisis',        estadoColor:'text-orange-500' },
  { recepcion:'LEF-2024-00150', producto:'Losartán 50mg Tabletas',             empresa:'Importadora MedSalud',        recibido:'09/11/2024', estadoRecepcion:'Aceptado',  fechaEstado:'09/11/2024', rt75:'ok',      rt41:'ok',      rt30:'ok',      rt38:'ok',      estado:'● En Análisis Micro', estadoColor:'text-blue-600' },
  { recepcion:'LEF-2024-00141', producto:'Dexametasona 4mg/2ml Inyectable',    empresa:'AgroPharma S.A.',             recibido:'17/10/2024', estadoRecepcion:'Aceptado',  fechaEstado:'17/10/2024', rt75:'ok',      rt41:'ok',      rt30:'ok',      rt38:'ok',      estado:'● En Revisión DT',    estadoColor:'text-purple-600' },
  { recepcion:'LEF-2024-00153', producto:'Paracetamol 500mg Tabletas',         empresa:'NovaMed Honduras',            recibido:'11/11/2024', estadoRecepcion:'Retornado', fechaEstado:'12/11/2024', rt75:'pending', rt41:'pending', rt30:'ok',      rt38:'pending', estado:'Pdte. Estándar',      estadoColor:'text-orange-500' },
  { recepcion:'LEF-2024-00144', producto:'Furosemida 40mg Tabletas',           empresa:'Distribuidora Salud Total',   recibido:'24/10/2024', estadoRecepcion:'Aceptado',  fechaEstado:'24/10/2024', rt75:'ok',      rt41:'ok',      rt30:'ok',      rt38:'ok',      estado:'● En Revisión DG',    estadoColor:'text-purple-600' },
];

function RtIcon({ s }: { s: RtStatus }) {
  if (s === 'ok')      return <CheckCircle2  className="w-4 h-4 text-green-500 mx-auto" />;
  if (s === 'pending') return <Clock         className="w-4 h-4 text-amber-500 mx-auto" />;
  if (s === 'alert')   return <AlertTriangle className="w-4 h-4 text-amber-500 mx-auto" />;
  return <span className="block text-center text-slate-300 text-xs">—</span>;
}

function EstadoRecepcionBadge({ estado }: { estado: 'Aceptado' | 'Retornado' }) {
  if (estado === 'Aceptado') return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-2 py-0.5 whitespace-nowrap">
      <CheckCircle2 className="w-3 h-3" /> Aceptado
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-600 bg-red-50 border border-red-200 rounded-full px-2 py-0.5 whitespace-nowrap">
      <XCircle className="w-3 h-3" /> Retornado
    </span>
  );
}

export default function BandejaDoctPage() {
  const [q, setQ] = useState('');
  const filtered = ROWS.filter(r =>
    r.recepcion.toLowerCase().includes(q.toLowerCase()) ||
    r.producto.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <StatCard n={9}  label="En DOCT"              bg="bg-white"       val="text-slate-800" icon={<FolderOpen  className="w-4 h-4"/>} />
        <StatCard n={3}  label="Pdte. Expediente"     bg="bg-orange-50"   val="text-orange-600" icon={<AlertCircle  className="w-4 h-4"/>} />
        <StatCard n={2}  label="Pdte. Información"    bg="bg-red-50"      val="text-red-600"   icon={<FileQuestion className="w-4 h-4"/>} />
        <StatCard n={4}  label="RT-38 en Preparación" bg="bg-blue-50"     val="text-blue-600"  icon={<FileCheck    className="w-4 h-4"/>} />
      </div>

      {/* Search + filter bar */}
      <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          className="flex-1 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none"
          placeholder="Buscar por recepción, producto..."
          value={q} onChange={e => setQ(e.target.value)}
        />
        <select className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-600 focus:outline-none">
          <option>Todos los estados</option>
          <option>En Análisis FFQQ</option>
          <option>Pdte. Pago</option>
          <option>Estándar Rechazado</option>
          <option>Emitido al Cliente</option>
        </select>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50">
          <Filter className="w-3.5 h-3.5" /> Filtros
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['RECEPCIÓN','PRODUCTO','RECIBIDO','EST. RECEPCIÓN','RT-75','RT-41','RT-30','RT-38','ESTADO','ACCIONES'].map(h => (
                  <th key={h} className={`px-4 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-left ${['RT-75','RT-41','RT-30','RT-38'].includes(h) ? 'text-center' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(row => (
                <tr key={row.recepcion} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-bold" style={{ color:'var(--color-primary)' }}>{row.recepcion}</td>
                  <td className="px-4 py-3">
                    <p className="text-xs font-semibold text-slate-800">{row.producto}</p>
                    <p className="text-[10px] text-slate-400">{row.empresa}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{row.recibido}</td>
                  <td className="px-4 py-3">
                    <EstadoRecepcionBadge estado={row.estadoRecepcion} />
                    <p className="text-[10px] text-slate-400 mt-0.5">{row.fechaEstado}</p>
                  </td>
                  <td className="px-4 py-2 text-center"><RtIcon s={row.rt75} /></td>
                  <td className="px-4 py-2 text-center"><RtIcon s={row.rt41} /></td>
                  <td className="px-4 py-2 text-center"><RtIcon s={row.rt30} /></td>
                  <td className="px-4 py-2 text-center"><RtIcon s={row.rt38} /></td>
                  <td className="px-4 py-3 text-xs font-semibold whitespace-nowrap">
                    <span className={row.estadoColor}>{row.estado}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 flex-wrap">
                      <Link
                        href={`/ingresos/${row.recepcion}/vista-360`}
                        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors mr-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> Ver
                      </Link>
                      <Link
                        href={`/doct/rt75?recepcion=${encodeURIComponent(row.recepcion)}&producto=${encodeURIComponent(row.producto)}&empresa=${encodeURIComponent(row.empresa)}`}
                        className="inline-flex items-center text-xs font-semibold text-white rounded-md px-2 py-1 whitespace-nowrap"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                      >
                        RT-75
                      </Link>
                      <Link
                        href={`/doct/rt30?recepcion=${encodeURIComponent(row.recepcion)}&producto=${encodeURIComponent(row.producto)}&empresa=${encodeURIComponent(row.empresa)}`}
                        className="inline-flex items-center text-xs font-semibold text-slate-600 border border-slate-300 rounded-md px-2 py-1 whitespace-nowrap hover:bg-slate-50"
                      >
                        RT-30
                      </Link>
                      <Link
                        href={`/rac/distribucion?recepcion=${encodeURIComponent(row.recepcion)}`}
                        className="inline-flex items-center text-xs font-semibold text-teal-700 border border-teal-200 rounded-md px-2 py-1 whitespace-nowrap hover:bg-teal-50"
                      >
                        RT-159
                      </Link>
                    </div>
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

function StatCard({ n, label, bg, val, icon }: { n: number; label: string; bg: string; val: string; icon: React.ReactNode }) {
  return (
    <div className={`${bg} rounded-xl border border-slate-200 p-4`}>
      <p className={`text-2xl sm:text-3xl font-black ${val}`}>{n}</p>
      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">{icon}{label}</p>
    </div>
  );
}
