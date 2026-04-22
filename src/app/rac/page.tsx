import Link from "next/link";
import { Search, Filter, Plus, ArrowRight, AlertCircle, Clock, ShieldCheck, CheckCircle2, DollarSign } from "lucide-react";
import { mockIngresosList } from "@/lib/mockData";

export default function RACPage() {
  // Filter for RAC related items
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Borradores Activos</p>
          <p className="text-3xl font-black text-slate-900 mt-2">12</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-md border border-orange-200 shadow-sm flex flex-col">
          <p className="text-xs text-orange-700 font-bold uppercase tracking-wider flex items-center gap-1"><DollarSign className="w-3 h-3" /> Pendientes de Pago</p>
          <p className="text-3xl font-black text-orange-600 mt-2">5</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200 shadow-sm flex flex-col">
          <p className="text-xs text-blue-700 font-bold uppercase tracking-wider flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Pendiente Dist. (RT-159)</p>
          <p className="text-3xl font-black text-blue-600 mt-2">8</p>
        </div>
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Ingresados (Hoy)</p>
          <p className="text-3xl font-black text-success mt-2">14</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por N° Recepción, Producto o Cliente..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-[5px] text-sm focus:outline-none focus:border-primary transition-all"
            />
          </div>
          <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-[5px] flex items-center gap-2 text-sm font-medium hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Etapas RAC
          </button>
        </div>
      </div>

      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">N° Borrador/Rec.</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Producto</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Cliente / Trámite</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Estado en RAC</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">SLA / Alerta</th>
                <th className="px-5 py-3 text-right text-xs uppercase tracking-wider">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ingresosRAC.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors h-[70px] group">
                  <td className="px-5">
                    <span className="font-bold text-slate-900 block">{item.id}</span>
                    <span className="text-[10px] text-slate-500">{item.fechaIngreso}</span>
                  </td>
                  <td className="px-5">
                    <span className="font-medium text-slate-800 block truncate max-w-[200px]" title={item.producto}>{item.producto}</span>
                    <span className="text-[11px] text-slate-500">Lote: {item.lote}</span>
                  </td>
                  <td className="px-5">
                    <span className="text-slate-700 block truncate max-w-[180px]" title={item.cliente}>{item.cliente}</span>
                    <span className="text-[10px] uppercase font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded mt-0.5 inline-block">{item.tramite}</span>
                  </td>
                  <td className="px-5">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium border ${
                      item.estado.includes("Borrador") ? "bg-slate-100 text-slate-700 border-slate-200" :
                      item.estado.includes("Pago") ? "bg-orange-100 text-orange-800 border-orange-200" :
                      "bg-blue-100 text-blue-800 border-blue-200"
                    }`}>
                      {item.estado}
                    </span>
                  </td>
                  <td className="px-5">
                    {item.prioridad === "Alta" ? (
                      <span className="text-danger font-medium text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {item.sla}</span>
                    ) : item.estado.includes("Distribuido") ? (
                      <span className="text-success font-medium text-xs flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Completado</span>
                    ) : (
                      <span className="text-slate-500 text-xs flex items-center gap-1"><Clock className="w-3 h-3"/> {item.sla}</span>
                    )}
                  </td>
                  <td className="px-5 text-right">
                    <Link href={`/ingresos/${item.id}`} className="inline-flex items-center gap-1 text-primary hover:text-white font-medium transition-colors border border-primary hover:bg-primary px-4 py-2 rounded-[20px] text-xs">
                      Atender Caso <ArrowRight className="w-3 h-3" />
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
