import Link from "next/link";
import { Search, Filter, Plus, FileText, ArrowRight, AlertCircle, Clock } from "lucide-react";

export default function RACPage() {
  const ingresosRAC = [
    { id: "REC-2024-1025", producto: "Aspirina 100mg", cliente: "FarmaSalud", estado: "Borrador de Recepción", tipo: "ARSA", sla: "10 min", prioridad: "Alta" },
    { id: "REC-2024-1026", producto: "Vitamina C", cliente: "Lab. Vital", estado: "Pendiente de Pago", tipo: "Particular", sla: "2 hrs", prioridad: "Normal" },
    { id: "REC-2024-1027", producto: "Omeprazol 20mg", cliente: "Droguería Central", estado: "Pendiente Validación Documental", tipo: "ARSA", sla: "En tiempo", prioridad: "Baja" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Recepción y Atención al Cliente (RAC)</h1>
          <p className="text-slate-500 text-sm mt-1">Bandeja de gestión inicial, validación documental y cobranza.</p>
        </div>
        <Link 
          href="/rac/nuevo" 
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-[20px] font-medium text-sm transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Registrar Nueva Muestra
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col">
          <p className="text-slate-500 text-sm font-medium">Borradores Activos</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">12</p>
        </div>
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col">
          <p className="text-slate-500 text-sm font-medium">Pendientes de Pago</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">5</p>
        </div>
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col">
          <p className="text-slate-500 text-sm font-medium">Pendientes de Distribución</p>
          <p className="text-2xl font-bold text-primary mt-1">8</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por N°, Producto o Cliente..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-[5px] text-sm focus:outline-none focus:border-primary transition-all"
            />
          </div>
          <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-[5px] flex items-center gap-2 text-sm font-medium hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Etapas
          </button>
        </div>
      </div>

      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">N° Borrador/Recepción</th>
              <th className="px-6 py-4">Producto</th>
              <th className="px-6 py-4">Cliente / Tipo</th>
              <th className="px-6 py-4">Estado (Flujo RAC)</th>
              <th className="px-6 py-4">SLA / Alerta</th>
              <th className="px-6 py-4 text-right">Gestión</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ingresosRAC.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors h-[72px]">
                <td className="px-6 font-bold text-slate-900">{item.id}</td>
                <td className="px-6 font-medium">{item.producto}</td>
                <td className="px-6 text-slate-600 flex flex-col">
                  <span>{item.cliente}</span>
                  <span className="text-[10px] uppercase text-slate-400">{item.tipo}</span>
                </td>
                <td className="px-6">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                    item.estado === "Borrador de Recepción" ? "bg-slate-100 text-slate-700 border-slate-200" :
                    item.estado === "Pendiente de Pago" ? "bg-orange-100 text-orange-800 border-orange-200" :
                    "bg-blue-100 text-blue-800 border-blue-200"
                  }`}>
                    {item.estado}
                  </span>
                </td>
                <td className="px-6">
                  {item.prioridad === "Alta" ? (
                    <span className="text-danger font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {item.sla}</span>
                  ) : (
                    <span className="text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3"/> {item.sla}</span>
                  )}
                </td>
                <td className="px-6 text-right">
                  <Link href={`/rac/${item.id}`} className="inline-flex items-center gap-1 text-primary hover:text-primary-dark font-medium transition-colors bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-[20px]">
                    Atender <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
