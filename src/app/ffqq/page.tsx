import Link from "next/link";
import { FlaskConical, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export default function FFQQPage() {
  const ensayos = [
    { id: "REC-2024-1015", producto: "Amoxicilina Susp.", ensayo: "Valoración por HPLC (RT-86)", estado: "Pendiente", prioridad: "Alta" },
    { id: "REC-2024-1015", producto: "Amoxicilina Susp.", ensayo: "Identificación", estado: "Completado", prioridad: "Normal" },
    { id: "REC-2024-1018", producto: "Ibuprofeno 400mg", ensayo: "Disolución (RT-84)", estado: "Pendiente", prioridad: "Normal" },
    { id: "REC-2024-1018", producto: "Ibuprofeno 400mg", ensayo: "Uniformidad de Peso", estado: "Reanálisis", prioridad: "Alta" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Análisis Físico-Químico (FFQQ)</h1>
          <p className="text-slate-500 text-sm mt-1">Bandeja de "Mis Asignaciones" y captura de resultados analíticos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Ensayos Pendientes</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">14</p>
        </div>
        <div className="bg-white p-4 rounded-md border border-danger/20 shadow-sm bg-danger/5">
          <p className="text-danger text-sm font-medium">Reanálisis Ordenados</p>
          <p className="text-2xl font-bold text-danger mt-1">1</p>
        </div>
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Ensayos Completados (Hoy)</p>
          <p className="text-2xl font-bold text-success mt-1">3</p>
        </div>
      </div>

      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <FlaskConical className="w-4 h-4 text-primary" /> Mis Ensayos Asignados (RT-40)
          </h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">N° Recepción</th>
              <th className="px-6 py-4">Producto</th>
              <th className="px-6 py-4">Técnica / Ensayo</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4 text-right">Acción (Workspace)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ensayos.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors h-[72px]">
                <td className="px-6 font-bold text-slate-900">{item.id}</td>
                <td className="px-6 font-medium">{item.producto}</td>
                <td className="px-6 text-slate-700">{item.ensayo}</td>
                <td className="px-6">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                    item.estado === "Pendiente" ? "bg-slate-100 text-slate-700 border-slate-200" :
                    item.estado === "Reanálisis" ? "bg-danger/10 text-danger border-danger/20" :
                    "bg-green-100 text-success border-green-200"
                  }`}>
                    {item.estado === "Completado" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {item.estado === "Reanálisis" && <AlertCircle className="w-3 h-3 mr-1" />}
                    {item.estado}
                  </span>
                </td>
                <td className="px-6 text-right pt-4">
                  {item.estado !== "Completado" ? (
                    <Link href={`/ffqq/ensayo/${i}`} className="inline-flex items-center gap-1 text-primary hover:text-primary-dark font-medium transition-colors bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-[20px]">
                      Capturar Datos <ArrowRight className="w-3 h-3" />
                    </Link>
                  ) : (
                    <span className="text-slate-400 font-medium px-4 py-2">Enviado a STCC</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
