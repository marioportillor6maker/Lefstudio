import Link from "next/link";
import { ShieldCheck, UserPlus, ArrowRight, Activity, Clock, CheckCircle2, Search, Filter } from "lucide-react";
import { mockIngresosList } from "@/lib/mockData";

export default function STRPage() {
  const asignaciones = [
    { id: "REC-2024-1022", producto: "Ibuprofeno Jbe", lote: "L-22100", cliente: "Hospital General", estado: "Pendiente Asignación", ensayos: 4, sla: "10 min", prioridad: "Alta" },
    { id: "REC-2024-1023", producto: "Crema Antibacterial", lote: "L-88211", cliente: "FarmaSalud", estado: "Pendiente Asignación", ensayos: 2, sla: "30 min", prioridad: "Media" },
    { id: "REC-2024-1028", producto: "Amoxicilina Susp.", lote: "L-552083", cliente: "IHSS", estado: "Asignado (RT-40)", ensayos: 5, sla: "En tiempo", prioridad: "Normal" },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Supervisión Técnica de Registro (STR)</h1>
          <p className="text-slate-500 text-sm mt-1">Revisión de expedientes DOCT, aprobación de RT-38 y asignación analítica a FFQQ/Micro (RT-40).</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Pendientes de Revisar</p>
          <p className="text-3xl font-black text-slate-900 mt-2">2</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-orange-700 font-bold uppercase tracking-wider flex items-center gap-1"><Activity className="w-3 h-3" /> Asignación Urgente</p>
          <p className="text-3xl font-black text-orange-600 mt-2">1</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-blue-700 font-bold uppercase tracking-wider flex items-center gap-1"><UserPlus className="w-3 h-3" /> Analistas Disponibles</p>
          <p className="text-3xl font-black text-blue-600 mt-2">8</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-success font-bold uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> RT-40 Generados Hoy</p>
          <p className="text-3xl font-black text-success mt-2">6</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-sm">
            <UserPlus className="w-4 h-4 text-primary" /> Casos Pendientes de Asignación Analítica (RT-40)
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
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Volumen de Trabajo</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Estado de Asignación</th>
                <th className="px-5 py-3 text-right text-xs uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {asignaciones.map((item, i) => (
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
                  <td className="px-5 text-slate-600 text-xs">
                     <span className="block font-medium">{item.ensayos} pruebas físicas/químicas</span>
                     <span className="text-[10px] text-slate-400">Req. RT-86, RT-84</span>
                  </td>
                  <td className="px-5">
                     <span className={`inline-flex items-center px-2 py-1 rounded-md text-[11px] font-bold border ${
                        item.estado.includes("Pendiente") ? "bg-orange-100 text-orange-800 border-orange-200" : "bg-green-100 text-success border-green-200"
                     }`}>
                        {item.estado.includes("Asignado") && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {item.estado}
                     </span>
                  </td>
                  <td className="px-5 text-right">
                    {item.estado.includes("Pendiente") ? (
                      <Link href={`/ingresos/${item.id}`} className="inline-flex items-center gap-1 text-white bg-primary hover:bg-primary-dark font-medium transition-colors px-4 py-1.5 rounded-full text-xs shadow-sm">
                        <UserPlus className="w-3 h-3" /> Asignar Analistas
                      </Link>
                    ) : (
                      <Link href={`/ingresos/${item.id}`} className="inline-flex items-center gap-1 text-primary hover:bg-primary/5 border border-primary font-medium transition-colors px-4 py-1.5 rounded-full text-xs shadow-sm">
                        Ver RT-40
                      </Link>
                    )}
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
