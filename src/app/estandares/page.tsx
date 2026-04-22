import Link from "next/link";
import { Award, Search, Plus, Filter, AlertTriangle, CheckCircle2 } from "lucide-react";
import { mockEstandares } from "@/lib/mockData";

export default function EstandaresPage() {
  const estandares = mockEstandares;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Gestión de Estándares (RG-44)</h1>
          <p className="text-slate-500 text-sm mt-1">Inventario centralizado de estándares primarios y secundarios, trazabilidad y caducidad.</p>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-[20px] font-bold text-sm transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Registrar Nuevo Estándar
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Total Registrados</p>
          <p className="text-3xl font-black text-slate-900 mt-2">342</p>
        </div>
        <div className="bg-green-50 p-4 rounded-md border border-green-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-success font-bold uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Activos con Certificado</p>
          <p className="text-3xl font-black text-success mt-2">310</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-md border border-orange-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-orange-700 font-bold uppercase tracking-wider flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Por Vencer (30d)</p>
          <p className="text-3xl font-black text-orange-600 mt-2">12</p>
        </div>
        <div className="bg-red-50 p-4 rounded-md border border-red-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-danger font-bold uppercase tracking-wider flex items-center gap-1">Agotados / Rechazados</p>
          <p className="text-3xl font-black text-danger mt-2">4</p>
        </div>
      </div>

      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Buscar por Nombre, Lote o Ubicación..." className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-[5px] text-sm focus:outline-none focus:border-primary transition-all shadow-sm" />
            </div>
            <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-[5px] flex items-center gap-2 text-sm font-medium hover:bg-slate-50">
              <Filter className="w-4 h-4" /> Filtros
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Código / Lote</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Nombre del Estándar</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Vencimiento</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Stock Restante</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Estado / Certificado</th>
                <th className="px-5 py-3 text-right text-xs uppercase tracking-wider">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {estandares.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors h-[70px] group">
                  <td className="px-5">
                    <span className="font-bold text-slate-900 block">{item.id}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wide">Lote: {item.lote}</span>
                  </td>
                  <td className="px-5">
                    <span className="font-medium text-slate-800 block">{item.nombre}</span>
                    <span className="text-[10px] text-slate-500">Ubicación: {item.ubicacion}</span>
                  </td>
                  <td className="px-5">
                     <span className={`text-xs font-bold ${item.estado.includes('Vencer') || item.estado.includes('Agotado') ? 'text-danger' : 'text-slate-600'}`}>
                       {item.fechaVencimiento}
                     </span>
                  </td>
                  <td className="px-5">
                     <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border ${
                       item.estado.includes('Agotado') ? 'bg-danger/10 text-danger border-danger/20' : 
                       item.estado.includes('Bajo') ? 'bg-orange-100 text-orange-800 border-orange-200' : 'bg-slate-100 text-slate-700 border-slate-200'
                     }`}>
                        {item.cantidadRestante}
                     </span>
                  </td>
                  <td className="px-5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold mr-2 ${
                       item.certificado === 'Sí' ? 'bg-green-100 text-success' : 'bg-danger/10 text-danger'
                    }`}>
                      CERT: {item.certificado}
                    </span>
                    <span className={`text-[11px] font-bold ${
                       item.estado === 'Activo' ? 'text-success' : 
                       item.estado.includes('Agotado') ? 'text-danger' : 'text-orange-600'
                    }`}>
                      {item.estado}
                    </span>
                  </td>
                  <td className="px-5 text-right">
                    <button className="text-primary hover:underline font-medium text-xs">Ver Hoja Técnica</button>
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
