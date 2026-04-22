import Link from "next/link";
import { FlaskConical, AlertCircle, ArrowRight, CheckCircle2, Search, Filter } from "lucide-react";
import { mockIngresosList } from "@/lib/mockData";

export default function FFQQPage() {
  // Simulating assigned assays based on mockIngresosList
  const ensayos = [
    { id: "REC-2024-1015", producto: "Amoxicilina Susp.", lote: "L-330291", ensayo: "Valoración por HPLC", auxiliar: "RT-86", estado: "Pendiente", prioridad: "Alta", sla: "Vence Hoy" },
    { id: "REC-2024-1015", producto: "Amoxicilina Susp.", lote: "L-330291", ensayo: "Identificación", auxiliar: "RT-86", estado: "Completado", prioridad: "Normal", sla: "Completado" },
    { id: "REC-2024-1018", producto: "Ibuprofeno 400mg", lote: "L-443110", ensayo: "Disolución", auxiliar: "RT-84", estado: "Pendiente", prioridad: "Normal", sla: "Quedan 2 días" },
    { id: "REC-2024-1018", producto: "Ibuprofeno 400mg", lote: "L-443110", ensayo: "Uniformidad de Peso", auxiliar: "RT-55", estado: "Reanálisis", prioridad: "Alta", sla: "Urgente" },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Análisis Físico-Químico (FFQQ)</h1>
          <p className="text-slate-500 text-sm mt-1">Bandeja de "Mis Asignaciones" y captura de resultados en auxiliares (RT-86, RT-84).</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Ensayos Pendientes</p>
          <p className="text-3xl font-black text-slate-900 mt-2">14</p>
        </div>
        <div className="bg-red-50 p-4 rounded-md border border-red-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-danger font-bold uppercase tracking-wider flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Reanálisis (OOS)</p>
          <p className="text-3xl font-black text-danger mt-2">1</p>
        </div>
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Prioridad Alta (Hoy)</p>
          <p className="text-3xl font-black text-orange-600 mt-2">4</p>
        </div>
        <div className="bg-green-50 p-4 rounded-md border border-green-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-success font-bold uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Completados</p>
          <p className="text-3xl font-black text-success mt-2">3</p>
        </div>
      </div>

      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-sm">
            <FlaskConical className="w-4 h-4 text-primary" /> Mis Ensayos Asignados (RT-40)
          </h3>
          <div className="relative w-72 hidden md:block">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Buscar por Lote o Ensayo..." className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-primary" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">N° / Expediente</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Producto y Lote</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Ensayo Asignado</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Estado Técnico</th>
                <th className="px-5 py-3 text-right text-xs uppercase tracking-wider">Workspace</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ensayos.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors h-[70px] group">
                  <td className="px-5">
                    <span className="font-bold text-slate-900 block">{item.id}</span>
                    <span className={`text-[10px] font-bold flex items-center gap-1 ${item.prioridad === 'Alta' ? 'text-danger' : 'text-slate-500'}`}>
                      {item.prioridad === 'Alta' && <AlertCircle className="w-3 h-3" />} SLA: {item.sla}
                    </span>
                  </td>
                  <td className="px-5">
                    <span className="font-medium text-slate-800 block">{item.producto}</span>
                    <span className="text-[10px] text-slate-500">Lote: {item.lote}</span>
                  </td>
                  <td className="px-5">
                    <span className="text-slate-700 font-bold block">{item.ensayo}</span>
                    <span className="text-[10px] text-primary font-medium bg-primary/10 px-1.5 py-0.5 rounded mt-0.5 inline-block">Formato: {item.auxiliar}</span>
                  </td>
                  <td className="px-5">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-[11px] font-bold border ${
                      item.estado === "Pendiente" ? "bg-slate-100 text-slate-700 border-slate-200" :
                      item.estado === "Reanálisis" ? "bg-danger/10 text-danger border-danger/20" :
                      "bg-green-100 text-success border-green-200"
                    }`}>
                      {item.estado === "Completado" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {item.estado}
                    </span>
                  </td>
                  <td className="px-5 text-right">
                    {item.estado !== "Completado" ? (
                      <Link href={`/ffqq/ensayo/${i}`} className="inline-flex items-center gap-1 text-primary hover:text-white font-medium transition-colors border border-primary hover:bg-primary px-4 py-1.5 rounded-[20px] text-xs shadow-sm">
                        Capturar Datos <ArrowRight className="w-3 h-3" />
                      </Link>
                    ) : (
                      <span className="text-slate-400 font-medium px-4 py-1.5 text-xs flex items-center justify-end gap-1"><CheckCircle2 className="w-3 h-3"/> Enviado a STCC</span>
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
