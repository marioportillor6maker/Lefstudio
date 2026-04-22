import Link from "next/link";
import { ShieldCheck, UserPlus, ArrowRight } from "lucide-react";

export default function STRPage() {
  const asignaciones = [
    { id: "REC-2024-1022", producto: "Ibuprofeno Jbe", estado: "En revisión STR", ensayos: 4, sla: "10 min" },
    { id: "REC-2024-1023", producto: "Crema Antibacterial", estado: "En revisión STR", ensayos: 2, sla: "30 min" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Supervisión Técnica de Registro (STR)</h1>
        <p className="text-slate-500 text-sm mt-1">Revisión de paquetes técnicos de DOCT y asignación a analistas (RT-40).</p>
      </div>

      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" /> Pendientes de Asignación Analítica (Generar RT-40)
          </h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">N° Recepción</th>
              <th className="px-6 py-4">Producto</th>
              <th className="px-6 py-4">Total Ensayos (RT-38)</th>
              <th className="px-6 py-4">SLA Asignación</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {asignaciones.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors h-[72px]">
                <td className="px-6 font-bold text-slate-900">{item.id}</td>
                <td className="px-6 font-medium">{item.producto}</td>
                <td className="px-6 text-slate-700">{item.ensayos} pruebas físicas/químicas</td>
                <td className="px-6 text-orange-600 font-medium">{item.sla}</td>
                <td className="px-6 text-right">
                  <Link href={`/ingresos/${item.id}`} className="inline-flex items-center gap-1 text-white bg-primary hover:bg-primary-dark font-medium transition-colors px-4 py-2 rounded-[20px]">
                    <UserPlus className="w-3 h-3" /> Asignar Analistas
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
