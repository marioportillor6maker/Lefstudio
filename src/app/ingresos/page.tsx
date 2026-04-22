import Link from "next/link";
import { Search, Filter, Plus, FileText, ArrowRight } from "lucide-react";

export default function IngresosPage() {
  const ingresos = [
    { id: "REC-2024-1024", producto: "Ibuprofeno 400mg", cliente: "FarmaSalud", estado: "Borrador", etapa: "RAC", fecha: "Hoy" },
    { id: "REC-2024-1020", producto: "Paracetamol 500mg", cliente: "Lab. Industriales", estado: "Pendiente Estándar", etapa: "DOCT", fecha: "Ayer" },
    { id: "REC-2024-1015", producto: "Amoxicilina Susp.", cliente: "Droguería Central", estado: "En Análisis", etapa: "FFQQ", fecha: "Hace 2 días" },
    { id: "REC-2024-0988", producto: "Loratadina Jbe.", cliente: "FarmaSalud", estado: "En revisión", etapa: "STCC", fecha: "Hace 5 días" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Bandeja Global de Ingresos</h1>
          <p className="text-slate-500 text-sm mt-1">Todos los casos activos en el LEF.</p>
        </div>
        <Link 
          href="/rac/nuevo" 
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-[20px] font-medium text-sm transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Nuevo Ingreso
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar N° Recepción..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-[5px] text-sm focus:outline-none focus:border-primary transition-all"
            />
          </div>
          <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-[5px] flex items-center gap-2 text-sm font-medium hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>
        <div className="text-sm text-slate-500 font-medium">
          Mostrando 4 resultados
        </div>
      </div>

      {/* Data Table Avanzada */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">N° Recepción</th>
              <th className="px-6 py-4">Producto</th>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Estado Actual</th>
              <th className="px-6 py-4">Área (SLA)</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ingresos.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors h-[72px]">
                <td className="px-6 font-bold text-slate-900">{item.id}</td>
                <td className="px-6 font-medium">{item.producto}</td>
                <td className="px-6 text-slate-600">{item.cliente}</td>
                <td className="px-6">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                    item.estado === "Borrador" ? "bg-slate-100 text-slate-700 border-slate-200" :
                    item.estado === "En Análisis" ? "bg-purple-100 text-purple-800 border-purple-200" :
                    item.estado === "Pendiente Estándar" ? "bg-orange-100 text-orange-800 border-orange-200" :
                    "bg-blue-100 text-blue-800 border-blue-200"
                  }`}>
                    {item.estado}
                  </span>
                </td>
                <td className="px-6 font-medium text-slate-700">{item.etapa} <span className="text-xs font-normal text-slate-500 block">{item.fecha}</span></td>
                <td className="px-6 text-right">
                  <Link href={`/ingresos/${item.id}`} className="inline-flex items-center gap-1 text-primary hover:text-primary-dark font-medium transition-colors bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-[20px]">
                    Ver 360 <ArrowRight className="w-3 h-3" />
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
