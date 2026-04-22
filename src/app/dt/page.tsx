import Link from "next/link";
import { FileText, ArrowRight, AlertTriangle, ShieldCheck, FileCheck, Search, Filter, Clock } from "lucide-react";
import { mockIngresosList } from "@/lib/mockData";

export default function DTPage() {
  const casos = mockIngresosList.filter(i => i.etapa.includes("DT") || i.estado.includes("Revisión"));

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dirección Técnica (DT)</h1>
          <p className="text-slate-500 text-sm mt-1">Aprobación técnica final, comités de evaluación y resolución de reanálisis (OOS).</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Pendientes de Dictamen</p>
          <p className="text-3xl font-black text-slate-900 mt-2">{casos.length}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 shadow-sm">
          <p className="text-[11px] text-orange-700 font-bold uppercase tracking-wider flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Casos Comité (Reanálisis)</p>
          <p className="text-3xl font-black text-orange-600 mt-2">1</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-sm">
          <p className="text-[11px] text-blue-700 font-bold uppercase tracking-wider flex items-center gap-1"><FileCheck className="w-3 h-3" /> Revisión Documental</p>
          <p className="text-3xl font-black text-blue-600 mt-2">3</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 shadow-sm">
          <p className="text-[11px] text-success font-bold uppercase tracking-wider flex items-center gap-1"><FileText className="w-3 h-3" /> RT-39 Aprobados Hoy</p>
          <p className="text-3xl font-black text-success mt-2">5</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-sm">
            <FileText className="w-4 h-4 text-primary" /> Casos Pendientes de Aprobación
          </h3>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Buscar expediente, producto o lote..." className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:border-primary shadow-sm" />
            </div>
            <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-md flex items-center gap-2 text-xs font-medium hover:bg-slate-50 shadow-sm">
              <Filter className="w-3.5 h-3.5" /> Filtrar
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">N° Recepción</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Producto y Lote</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Estado de Revisión</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Responsable Anterior</th>
                <th className="px-5 py-3 text-right text-xs uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {casos.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors h-[70px] group">
                  <td className="px-5">
                     <span className="font-bold text-slate-900 block">{item.id}</span>
                     <span className={`text-[10px] font-bold flex items-center gap-1 ${item.prioridad === 'Alta' ? 'text-danger' : 'text-slate-500'}`}>
                        <Clock className="w-3 h-3" /> SLA: {item.sla}
                     </span>
                  </td>
                  <td className="px-5">
                     <span className="font-medium text-slate-800 block truncate max-w-[200px]" title={item.producto}>{item.producto}</span>
                     <span className="text-[10px] text-slate-500 block truncate max-w-[200px]">Lote: {item.lote} • Cliente: {item.cliente}</span>
                  </td>
                  <td className="px-5">
                     <span className={`inline-flex items-center px-2 py-1 rounded-md text-[11px] font-bold border ${
                        item.estado.includes("Revisión") ? "bg-orange-100 text-orange-800 border-orange-200" : "bg-blue-50 text-blue-700 border-blue-200"
                     }`}>
                        {item.estado.includes("Revisión") && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {item.estado}
                     </span>
                  </td>
                  <td className="px-5 text-slate-600 text-xs">
                     <span className="block font-medium">{item.responsable.split(' (')[0]}</span>
                     <span className="text-[10px] text-slate-400">Origen: {item.etapa}</span>
                  </td>
                  <td className="px-5 text-right">
                    <Link href={`/ingresos/${item.id}`} className="inline-flex items-center gap-1 text-primary hover:text-white font-medium transition-colors border border-primary hover:bg-primary px-4 py-1.5 rounded-full text-xs shadow-sm">
                      Revisar Expediente Completo <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
              {casos.length === 0 && (
                 <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-slate-500 text-sm">No hay casos pendientes en esta bandeja.</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
