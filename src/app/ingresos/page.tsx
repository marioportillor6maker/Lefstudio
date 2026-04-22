import Link from "next/link";
import { Search, Filter, Plus, FileText, ArrowRight, Clock, AlertCircle, ShieldAlert, CheckCircle2 } from "lucide-react";
import { mockIngresosList } from "@/lib/mockData";

export default function IngresosPage() {
  const ingresos = mockIngresosList;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Bandeja Global de Ingresos</h1>
          <p className="text-slate-500 text-sm mt-1">Directorio completo de casos activos e históricos del LEF.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-[20px] font-medium text-sm transition-colors shadow-sm flex items-center gap-2">
            <DownloadIcon className="w-4 h-4" /> Exportar a Excel
          </button>
          <Link 
            href="/rac/nuevo" 
            className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-[20px] font-medium text-sm transition-colors shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Nuevo Ingreso
          </Link>
        </div>
      </div>

      {/* Toolbar Denso */}
      <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar N°, Producto, Cliente o Lote..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-[5px] text-sm focus:outline-none focus:border-primary transition-all"
            />
          </div>
          <select className="bg-white border border-slate-300 text-slate-700 px-3 py-2 rounded-[5px] text-sm focus:outline-none focus:border-primary">
            <option value="">Todas las Etapas</option>
            <option value="RAC">RAC</option>
            <option value="DOCT">DOCT</option>
            <option value="FFQQ">FFQQ / Micro</option>
            <option value="STCC">STCC / DT</option>
          </select>
          <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-[5px] flex items-center gap-2 text-sm font-medium hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Más Filtros
          </button>
        </div>
        <div className="text-xs text-slate-500 font-medium whitespace-nowrap">
          Mostrando {ingresos.length} resultados activos
        </div>
      </div>

      {/* Data Table Avanzada y Densa */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">N° Recepción</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Producto / Lote</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Cliente / Trámite</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Estado Actual</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Responsable</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">SLA / Alerta</th>
                <th className="px-5 py-3 text-right text-xs uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ingresos.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors h-[70px] group">
                  <td className="px-5">
                    <span className="font-bold text-slate-900 block">{item.id}</span>
                    <span className="text-[10px] text-slate-500">{item.fechaIngreso}</span>
                  </td>
                  <td className="px-5">
                    <span className="font-medium text-slate-800 block truncate max-w-[200px]" title={item.producto}>{item.producto}</span>
                    <span className="text-[11px] text-slate-500">Lote: {item.lote} • {item.formaFarmaceutica}</span>
                  </td>
                  <td className="px-5">
                    <span className="text-slate-700 block truncate max-w-[180px]" title={item.cliente}>{item.cliente}</span>
                    <span className="text-[10px] uppercase font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{item.tramite}</span>
                  </td>
                  <td className="px-5">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium border ${
                      item.estado.includes("Borrador") ? "bg-slate-100 text-slate-700 border-slate-200" :
                      item.estado.includes("Análisis") ? "bg-purple-100 text-purple-800 border-purple-200" :
                      item.estado.includes("Pendiente Estándar") ? "bg-orange-100 text-orange-800 border-orange-200" :
                      item.estado.includes("Aprobado") ? "bg-green-100 text-success border-green-200" :
                      "bg-blue-100 text-blue-800 border-blue-200"
                    }`}>
                      {item.estado.includes("Aprobado") && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {item.estado}
                    </span>
                    {item.bloqueo && (
                      <span className="block mt-1 text-[10px] font-bold text-danger flex items-center gap-0.5">
                        <ShieldAlert className="w-3 h-3" /> Bloqueo: {item.bloqueo}
                      </span>
                    )}
                  </td>
                  <td className="px-5">
                     <span className="font-medium text-slate-800 text-xs block">{item.responsable.split(' (')[0]}</span>
                     <span className="text-[10px] text-primary">{item.etapa}</span>
                  </td>
                  <td className="px-5">
                    {item.prioridad === "Alta" && !item.estado.includes("Aprobado") ? (
                      <span className="text-danger font-medium text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {item.sla}</span>
                    ) : item.estado.includes("Aprobado") ? (
                      <span className="text-success font-medium text-xs flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> {item.sla}</span>
                    ) : (
                      <span className="text-slate-500 text-xs flex items-center gap-1"><Clock className="w-3 h-3"/> {item.sla}</span>
                    )}
                  </td>
                  <td className="px-5 text-right">
                    <Link href={`/ingresos/${item.id}`} className="inline-flex items-center gap-1 text-primary hover:text-white font-medium transition-colors border border-primary hover:bg-primary px-3 py-1.5 rounded-[20px] text-xs">
                      Abrir Expediente <ArrowRight className="w-3 h-3" />
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

function DownloadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}
