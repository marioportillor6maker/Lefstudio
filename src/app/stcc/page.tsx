import Link from "next/link";
import { ShieldCheck, ArrowRight, AlertTriangle } from "lucide-react";

export default function STCCPage() {
  const revisiones = [
    { id: "REC-2024-0988", producto: "Loratadina Jbe.", analista: "M. Torres", estado: "En revisión STCC", alerta: "Requiere atención" },
    { id: "REC-2024-0989", producto: "Ibuprofeno 400mg", analista: "J. Pérez", estado: "En revisión STCC", alerta: "OOS Detectado" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Supervisión Técnica de Control de Calidad (STCC)</h1>
        <p className="text-slate-500 text-sm mt-1">Revisión de paquetes técnicos y resultados analíticos.</p>
      </div>

      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" /> Casos Pendientes de Revisión
          </h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">N° Recepción</th>
              <th className="px-6 py-4">Producto</th>
              <th className="px-6 py-4">Analista (FFQQ)</th>
              <th className="px-6 py-4">Alerta</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {revisiones.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors h-[72px]">
                <td className="px-6 font-bold text-slate-900">{item.id}</td>
                <td className="px-6 font-medium">{item.producto}</td>
                <td className="px-6 text-slate-700">{item.analista}</td>
                <td className="px-6">
                  {item.alerta === "OOS Detectado" ? (
                    <span className="text-danger font-medium flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Fuera de Especificación</span>
                  ) : (
                    <span className="text-slate-500">-</span>
                  )}
                </td>
                <td className="px-6 text-right">
                  <Link href={`/ingresos/${item.id}`} className="inline-flex items-center gap-1 text-primary hover:text-primary-dark font-medium transition-colors bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-[20px]">
                    Auditar RT-38 <ArrowRight className="w-3 h-3" />
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
