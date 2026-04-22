import Link from "next/link";
import { Search, Filter, History, FileCheck, ArrowRight, ShieldAlert, AlertCircle } from "lucide-react";

export default function DOCTPage() {
  const expedientes = [
    { id: "REC-2024-1020", producto: "Paracetamol 500mg", estado: "Pendiente Estándar", docFaltante: "Estándar USP", fecha: "Ayer" },
    { id: "REC-2024-1021", producto: "Amoxicilina 250mg", estado: "A Contrastar Historial", docFaltante: "Ninguno", fecha: "Hoy 09:30" },
    { id: "REC-2024-1022", producto: "Ibuprofeno Jbe", estado: "Preparando RT-38", docFaltante: "-", fecha: "Hoy 10:15" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Control Documental y Archivo (DOCT)</h1>
          <p className="text-slate-500 text-sm mt-1">Armado de paquetes técnicos, búsqueda de historial (RT-41) y gestión de estándares.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Nuevas Recepciones (RT-159)</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">4</p>
        </div>
        <div className="bg-white p-4 rounded-md border border-orange-200 shadow-sm bg-orange-50/50">
          <p className="text-orange-700 text-sm font-medium">Bloqueos por Estándar (RT-30)</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">2</p>
        </div>
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">A Contrastar Historial</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">7</p>
        </div>
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Armando Paquete (RT-38)</p>
          <p className="text-2xl font-bold text-primary mt-1">3</p>
        </div>
      </div>

      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-primary" /> Casos Pendientes de Gestión Documental
          </h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">N° Recepción</th>
              <th className="px-6 py-4">Producto</th>
              <th className="px-6 py-4">Estado Documental</th>
              <th className="px-6 py-4">Bloqueo / Faltante</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {expedientes.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors h-[72px]">
                <td className="px-6 font-bold text-slate-900">{item.id}</td>
                <td className="px-6 font-medium">{item.producto}</td>
                <td className="px-6">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                    item.estado === "Pendiente Estándar" ? "bg-orange-100 text-orange-800 border-orange-200" :
                    item.estado === "Preparando RT-38" ? "bg-blue-100 text-blue-800 border-blue-200" :
                    "bg-slate-100 text-slate-700 border-slate-200"
                  }`}>
                    {item.estado}
                  </span>
                </td>
                <td className="px-6">
                  {item.docFaltante !== "Ninguno" && item.docFaltante !== "-" ? (
                    <span className="text-danger font-medium flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" /> {item.docFaltante}
                    </span>
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </td>
                <td className="px-6 text-right flex justify-end gap-2 items-center h-full pt-4">
                  {item.estado === "A Contrastar Historial" && (
                    <button className="inline-flex items-center gap-1 text-slate-600 hover:text-primary font-medium transition-colors bg-white border border-slate-200 hover:border-primary/50 px-3 py-1.5 rounded-[20px]">
                      <History className="w-3 h-3" /> RT-41
                    </button>
                  )}
                  <Link href={`/ingresos/${item.id}`} className="inline-flex items-center gap-1 text-primary hover:text-primary-dark font-medium transition-colors bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-[20px]">
                    Gestionar <ArrowRight className="w-3 h-3" />
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
