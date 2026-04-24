import Link from "next/link";
import { Search, Filter, Plus, Eye, CheckCircle2, DollarSign, ListTodo, SlidersHorizontal, AlertTriangle } from "lucide-react";
import { mockIngresosList } from "@/lib/mockData";

export default function BandejaRACPage() {
  const ingresosRAC = mockIngresosList.filter(i => i.etapa === "RAC" || i.etapa.includes("RAC"));

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Recepción y Atención al Cliente (RAC)</h1>
          <p className="text-slate-500 text-sm mt-1">Bandeja de captura inicial, revisión documental y gestión de proformas.</p>
        </div>
        <Link 
          href="/rac/nuevo" 
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-[20px] font-bold text-sm transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Registrar Nueva Muestra
        </Link>
      </div>

      {/* Indicadores (Cards Superiores) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
            <ListTodo className="w-3 h-3" /> Total en RAC
          </p>
          <p className="text-3xl font-black text-slate-900 mt-2">12</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-blue-700 font-bold uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Pendiente Validación
          </p>
          <p className="text-3xl font-black text-blue-600 mt-2">3</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-md border border-orange-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-orange-700 font-bold uppercase tracking-wider flex items-center gap-1">
            <DollarSign className="w-3 h-3" /> Pendiente Pago
          </p>
          <p className="text-3xl font-black text-orange-600 mt-2">2</p>
        </div>
        <div className="bg-green-50 p-4 rounded-md border border-green-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-green-700 font-bold uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3 h-3" /> Listos para Distribuir
          </p>
          <p className="text-3xl font-black text-green-600 mt-2">4</p>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <div className="relative w-full md:w-96 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Búsqueda por producto, recepción, cliente..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-[5px] text-sm focus:outline-none focus:border-primary transition-all"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full">
            <select className="h-9 px-3 bg-white border border-slate-300 rounded text-sm text-slate-700 focus:outline-none focus:border-primary shrink-0 min-w-[150px]">
              <option value="">Filtro Estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="validado">Validado</option>
              <option value="pago">Pdte. Pago</option>
            </select>
            
            <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 h-9 rounded flex items-center gap-2 text-sm font-bold hover:bg-slate-50 transition-colors shrink-0">
              <SlidersHorizontal className="w-4 h-4" /> Más filtros
            </button>
          </div>
        </div>
      </div>

      {/* Tabla: Bandeja de Ingresos RAC */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Nº Recepción</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Producto (Lote)</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Cliente</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Tipo Trámite</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Fecha Rec.</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Estado</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Bloqueos</th>
                <th className="px-5 py-3 text-right text-[11px] uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ingresosRAC.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors h-[60px] group">
                  <td className="px-5 font-bold text-primary">
                    <Link href={`/ingresos/${item.id}`} className="hover:underline">
                      {item.id}
                    </Link>
                  </td>
                  <td className="px-5">
                    <span className="font-medium text-slate-800 block truncate max-w-[200px]" title={item.producto}>{item.producto}</span>
                    <span className="text-[11px] text-slate-500 font-medium">Lote: {item.lote}</span>
                  </td>
                  <td className="px-5">
                    <span className="text-slate-700 block truncate max-w-[150px] font-medium" title={item.cliente}>{item.cliente}</span>
                  </td>
                  <td className="px-5">
                    <span className="text-[11px] uppercase font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded inline-block">
                      {item.tramite}
                    </span>
                  </td>
                  <td className="px-5 text-slate-600 font-medium text-xs">
                    {item.fechaIngreso}
                  </td>
                  <td className="px-5">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                      item.estado.includes("Borrador") ? "bg-slate-100 text-slate-700 border-slate-200" :
                      item.estado.includes("Pago") ? "bg-orange-100 text-orange-800 border-orange-200" :
                      item.estado.includes("Distribuido") ? "bg-green-100 text-green-800 border-green-200" :
                      "bg-blue-100 text-blue-800 border-blue-200"
                    }`}>
                      {item.estado}
                    </span>
                  </td>
                  <td className="px-5">
                    {item.prioridad === "Alta" ? (
                      <span className="inline-flex items-center gap-1 bg-red-50 text-danger border border-red-200 px-2 py-1 rounded text-[10px] font-bold">
                        <AlertTriangle className="w-3 h-3" /> URGENTE
                      </span>
                    ) : item.estado.includes("Pago") ? (
                      <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-600 border border-orange-200 px-2 py-1 rounded text-[10px] font-bold">
                        <DollarSign className="w-3 h-3" /> PAGO
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-5 text-right flex items-center justify-end gap-2 mt-3">
                    <Link href={`/ingresos/${item.id}`} className="p-1.5 text-slate-400 hover:text-primary hover:bg-blue-50 rounded transition-colors" title="Ver (Vista 360)">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button className="p-1.5 text-slate-400 hover:text-success hover:bg-green-50 rounded transition-colors" title="Validar">
                      <CheckCircle2 className="w-4 h-4" />
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
