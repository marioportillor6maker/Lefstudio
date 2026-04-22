import Link from "next/link";
import { Microscope, ArrowRight, Clock } from "lucide-react";

export default function MicroPage() {
  const cultivos = [
    { id: "REC-2024-1002", producto: "Crema Antibacterial", ensayo: "Límites Microbianos", dia: "Día 3 de 5", estado: "Incubación" },
    { id: "REC-2024-1010", producto: "Agua Inyectable", ensayo: "Esterilidad", dia: "Día 14 de 14", estado: "Lectura Final" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Microbiología (RT-74)</h1>
        <p className="text-slate-500 text-sm mt-1">Bitácora diaria de incubación y lecturas microbiológicas.</p>
      </div>

      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <Microscope className="w-4 h-4 text-primary" /> Bitácora Activa
          </h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">N° Recepción</th>
              <th className="px-6 py-4">Producto</th>
              <th className="px-6 py-4">Ensayo</th>
              <th className="px-6 py-4">Día de Incubación</th>
              <th className="px-6 py-4 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cultivos.map((item, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors h-[72px]">
                <td className="px-6 font-bold text-slate-900">{item.id}</td>
                <td className="px-6 font-medium">{item.producto}</td>
                <td className="px-6 text-slate-700">{item.ensayo}</td>
                <td className="px-6">
                  <span className="text-primary font-medium flex items-center gap-1"><Clock className="w-3 h-3"/> {item.dia}</span>
                </td>
                <td className="px-6 text-right">
                  <Link href={`/ingresos/${item.id}`} className="inline-flex items-center gap-1 text-primary hover:text-primary-dark font-medium transition-colors bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-[20px]">
                    Registrar Lectura <ArrowRight className="w-3 h-3" />
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
