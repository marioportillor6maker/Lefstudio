import Link from "next/link";
import { Search, History, FileCheck, ArrowRight, ShieldAlert, Clock, Layers } from "lucide-react";
import { mockIngresosList } from "@/lib/mockData";

export default function DOCTPage() {
  const expedientes = mockIngresosList.filter(i => i.etapa === "DOCT" || i.etapa.includes("DOCT"));

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Control Documental y Archivo (DOCT)</h1>
          <p className="text-slate-500 text-sm mt-1">Gestión del RT-41 histórico, control de estándares (RT-30) y armado de expedientes (RT-38).</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm">
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1"><Layers className="w-3 h-3" /> Nuevos (RT-159)</p>
          <p className="text-3xl font-black text-slate-900 mt-2">4</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-md border border-orange-200 shadow-sm">
          <p className="text-[11px] text-orange-700 font-bold uppercase tracking-wider flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> Bloqueados (RT-30)</p>
          <p className="text-3xl font-black text-orange-600 mt-2">2</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200 shadow-sm">
          <p className="text-[11px] text-blue-700 font-bold uppercase tracking-wider flex items-center gap-1"><History className="w-3 h-3" /> Contraste (RT-41)</p>
          <p className="text-3xl font-black text-blue-600 mt-2">7</p>
        </div>
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm">
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1"><FileCheck className="w-3 h-3" /> Armando (RT-38)</p>
          <p className="text-3xl font-black text-primary mt-2">3</p>
        </div>
      </div>

      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-sm">
            <FileCheck className="w-4 h-4 text-primary" /> Casos Pendientes de Gestión Documental
          </h3>
          <div className="relative w-72 hidden md:block">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Buscar en bandeja DOCT..." className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-primary" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">N° Recepción</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Producto / Cliente</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Estado Documental</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Bloqueos Activos</th>
                <th className="px-5 py-3 text-right text-xs uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {expedientes.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors h-[70px] group">
                  <td className="px-5">
                    <span className="font-bold text-slate-900 block">{item.id}</span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> SLA: {item.sla}</span>
                  </td>
                  <td className="px-5">
                    <span className="font-medium text-slate-800 block">{item.producto}</span>
                    <span className="text-[10px] text-slate-500 block truncate max-w-[200px]">{item.cliente}</span>
                  </td>
                  <td className="px-5">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-[11px] font-bold border ${
                      item.estado.includes("Estándar") ? "bg-orange-100 text-orange-800 border-orange-200" :
                      item.estado.includes("RT-38") ? "bg-blue-100 text-blue-800 border-blue-200" :
                      "bg-slate-100 text-slate-700 border-slate-200"
                    }`}>
                      {item.estado}
                    </span>
                  </td>
                  <td className="px-5">
                    {item.bloqueo ? (
                      <span className="text-danger font-medium text-xs flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" /> Falta {item.bloqueo} (RT-30)
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-5 text-right flex justify-end gap-2 items-center h-[70px]">
                    <button className="inline-flex items-center gap-1 text-slate-600 hover:text-primary font-medium transition-colors bg-white border border-slate-200 hover:border-primary px-3 py-1.5 rounded-[20px] text-xs shadow-sm">
                      <History className="w-3 h-3" /> RT-41
                    </button>
                    <Link href={`/ingresos/${item.id}`} className="inline-flex items-center gap-1 text-primary hover:text-white font-medium transition-colors border border-primary hover:bg-primary px-4 py-1.5 rounded-[20px] text-xs shadow-sm">
                      Gestionar <ArrowRight className="w-3 h-3" />
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
