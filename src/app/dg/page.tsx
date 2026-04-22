import { Briefcase, CheckCircle2, Clock, ShieldAlert, FileText, Search, Filter } from "lucide-react";
import Link from "next/link";

export default function DireccionGeneralPage() {
  const casos = [
    { id: "REC-2024-00122", producto: "Paracetamol 500mg", cliente: "Hospital Regional", estado: "Pendiente Firma", sla: "Vence hoy", tipo: "Aprobado DT" },
    { id: "REC-2024-00128", producto: "Ibuprofeno Suspensión", cliente: "FarmaCentro", estado: "Pendiente Firma", sla: "En tiempo", tipo: "Aprobado DT" },
    { id: "REC-2024-00115", producto: "Vitamina C", cliente: "SESAL", estado: "Rechazado", sla: "Requiere revisión", tipo: "Revisión Especial" },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dirección General (DG)</h1>
          <p className="text-slate-500 text-sm mt-1">Revisión ejecutiva final y firma autorizada de certificados e informes emitidos (RT-39).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> Pendientes de Firma</p>
          <p className="text-3xl font-black text-slate-900 mt-2">12</p>
        </div>
        <div className="bg-orange-50 p-5 rounded-lg border border-orange-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-orange-700 font-bold uppercase tracking-wider flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Urgentes (Vencen Hoy)</p>
          <p className="text-3xl font-black text-orange-600 mt-2">3</p>
        </div>
        <div className="bg-green-50 p-5 rounded-lg border border-green-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-success font-bold uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Certificados Firmados Hoy</p>
          <p className="text-3xl font-black text-success mt-2">8</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-sm">
            <Briefcase className="w-4 h-4 text-primary" /> Casos en Bandeja de Dirección General
          </h3>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Buscar certificado..." className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:border-primary shadow-sm" />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">N° Expediente</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Producto y Cliente</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Estado Actual</th>
                <th className="px-5 py-3 text-right text-xs uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {casos.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors h-[70px] group">
                  <td className="px-5">
                     <span className="font-bold text-slate-900 block">{item.id}</span>
                     <span className={`text-[10px] font-bold flex items-center gap-1 ${item.sla.includes('Vence') ? 'text-danger' : 'text-slate-500'}`}>
                        <Clock className="w-3 h-3" /> SLA: {item.sla}
                     </span>
                  </td>
                  <td className="px-5">
                     <span className="font-medium text-slate-800 block">{item.producto}</span>
                     <span className="text-[10px] text-slate-500 block">Cliente: {item.cliente}</span>
                  </td>
                  <td className="px-5">
                     <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                        item.estado.includes("Rechazado") ? "bg-red-50 text-danger border-red-200" : "bg-blue-50 text-blue-700 border-blue-200"
                     }`}>
                        {item.estado}
                     </span>
                  </td>
                  <td className="px-5 text-right">
                    <Link href={`/ingresos/${item.id}`} className="inline-flex items-center gap-1 text-white bg-primary hover:bg-primary-dark font-medium transition-colors px-4 py-1.5 rounded-full text-xs shadow-sm">
                      Revisar y Firmar
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
