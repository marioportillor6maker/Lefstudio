'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, CheckCircle2, Clock, AlertTriangle, Eye, FolderOpen, AlertCircle, FileQuestion, FileCheck } from 'lucide-react';

type RtStatus = 'ok' | 'pending' | 'alert' | 'none';

interface DoctRow {
  recepcion: string;
  producto: string;
  empresa: string;
  recibido: string;
  rt75: RtStatus; rt41: RtStatus; rt30: RtStatus; rt38: RtStatus;
  estado: string; estadoColor: string;
}

const ROWS: DoctRow[] = [
  { recepcion:'REC-2024-00147', producto:'AMOXICILINA 500mg Cápsulas',        empresa:'SESAL — Secretaría de Salud', recibido:'07/01/2024', rt75:'ok',      rt41:'ok',      rt30:'ok',      rt38:'ok',      estado:'● En Análisis FFQQ',    estadoColor:'text-blue-600' },
  { recepcion:'REC-2024-00148', producto:'METFORMINA 850mg Tabletas',          empresa:'IHSS',                         recibido:'08/01/2024', rt75:'pending', rt41:'pending', rt30:'ok',      rt38:'pending', estado:'● Pdte. Pago',           estadoColor:'text-orange-500' },
  { recepcion:'REC-2024-00149', producto:'CIPROFLOXACINA 500mg Tabletas',      empresa:'ARSA',                         recibido:'03/01/2024', rt75:'ok',      rt41:'ok',      rt30:'ok',      rt38:'ok',      estado:'En Revisión STCC',       estadoColor:'text-teal-600' },
  { recepcion:'REC-2024-00150', producto:'IBUPROFENO 400mg Tabletas',          empresa:'Hospital Escuela',             recibido:'28/12/2023', rt75:'pending', rt41:'pending', rt30:'ok',      rt38:'pending', estado:'● Reanálisis',           estadoColor:'text-orange-500' },
  { recepcion:'REC-2024-00151', producto:'ENALAPRIL 10mg Tabletas',            empresa:'ARSA',                         recibido:'02/01/2024', rt75:'ok',      rt41:'ok',      rt30:'ok',      rt38:'ok',      estado:'● En Revisión DG',       estadoColor:'text-blue-600' },
  { recepcion:'REC-2024-00152', producto:'AMLODIPINO 5mg Tabletas',            empresa:'SESAL — Secretaría de Salud', recibido:'10/01/2024', rt75:'pending', rt41:'pending', rt30:'alert',   rt38:'pending', estado:'Pdte. Información',      estadoColor:'text-purple-600' },
  { recepcion:'REC-2024-00153', producto:'OMEPRAZOL 20mg Cápsulas',            empresa:'Privado',                      recibido:'09/01/2024', rt75:'pending', rt41:'pending', rt30:'ok',      rt38:'pending', estado:'● Estándar Rechazado',   estadoColor:'text-red-600' },
  { recepcion:'REC-2024-00154', producto:'DICLOFENACO SÓDICO 50mg Tabletas',   empresa:'IHSS',                         recibido:'02/01/2024', rt75:'ok',      rt41:'ok',      rt30:'ok',      rt38:'ok',      estado:'● Emitido al Cliente',   estadoColor:'text-green-600' },
  { recepcion:'REC-2024-00155', producto:'CEFTRIAXONA 1g Polvo Inyectable',    empresa:'Hospital Escuela',             recibido:'06/01/2024', rt75:'ok',      rt41:'ok',      rt30:'ok',      rt38:'pending', estado:'● En Análisis Micro',    estadoColor:'text-blue-600' },
];

function RtIcon({ s }: { s: RtStatus }) {
  if (s === 'ok')      return <CheckCircle2  className="w-4 h-4 text-green-500 mx-auto" />;
  if (s === 'pending') return <Clock         className="w-4 h-4 text-amber-500 mx-auto" />;
  if (s === 'alert')   return <AlertTriangle className="w-4 h-4 text-amber-500 mx-auto" />;
  return <span className="block text-center text-slate-300 text-xs">—</span>;
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
      <div className="grid grid-cols-4 gap-4">
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
                {['RECEPCIÓN','PRODUCTO','RECIBIDO','RT-75','RT-41','RT-30','RT-38','ESTADO','ACCIONES'].map(h => (
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
                  <td className="px-4 py-2 text-center"><RtIcon s={row.rt75} /></td>
                  <td className="px-4 py-2 text-center"><RtIcon s={row.rt41} /></td>
                  <td className="px-4 py-2 text-center"><RtIcon s={row.rt30} /></td>
                  <td className="px-4 py-2 text-center"><RtIcon s={row.rt38} /></td>
                  <td className="px-4 py-3 text-xs font-semibold whitespace-nowrap">
                    <span className={row.estadoColor}>{row.estado}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/ingresos/${row.recepcion}/vista-360`}
                      className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors">
                      <Eye className="w-3.5 h-3.5" /> Ver
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

function StatCard({ n, label, bg, val, icon }: { n: number; label: string; bg: string; val: string; icon: React.ReactNode }) {
  return (
    <div className={`${bg} rounded-xl border border-slate-200 p-4`}>
      <p className={`text-3xl font-black ${val}`}>{n}</p>
      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">{icon}{label}</p>
    </div>
  );
}
