import Link from "next/link";
import { Microscope, ArrowRight, Clock, AlertTriangle, CheckCircle2, Search, Filter } from "lucide-react";
import { mockIngresosList } from "@/lib/mockData";

export default function MicrobiologiaPage() {
  const ensayosMicro = [
    { id: "REC-2024-1015", producto: "Amoxicilina Susp.", lote: "L-330291", ensayo: "Límites Microbianos", estado: "Incubando", dia: "Día 3 de 5", lectura: "Pendiente" },
    { id: "REC-2024-1015", producto: "Amoxicilina Susp.", lote: "L-330291", ensayo: "Recuento Total", estado: "Incubando", dia: "Día 3 de 5", lectura: "Pendiente" },
    { id: "REC-2024-1002", producto: "Diclofenaco Iny.", lote: "L-110038", ensayo: "Esterilidad", estado: "Lectura Final", dia: "Día 14 de 14", lectura: "Requerida Hoy" },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Microbiología</h1>
          <p className="text-slate-500 text-sm mt-1">Control de incubaciones, lecturas diarias y bitácora microbiológica (RT-74).</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Muestras en Incubación</p>
          <p className="text-3xl font-black text-slate-900 mt-2">12</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-md border border-orange-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-orange-700 font-bold uppercase tracking-wider flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Lecturas de Hoy</p>
          <p className="text-3xl font-black text-orange-600 mt-2">8</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-blue-700 font-bold uppercase tracking-wider flex items-center gap-1"><Clock className="w-3 h-3" /> Pendientes de Ingreso</p>
          <p className="text-3xl font-black text-blue-600 mt-2">3</p>
        </div>
        <div className="bg-green-50 p-4 rounded-md border border-green-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-success font-bold uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Informes Emitidos</p>
          <p className="text-3xl font-black text-success mt-2">5</p>
        </div>
      </div>

      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-sm">
            <Microscope className="w-4 h-4 text-primary" /> Bitácora de Lecturas Pendientes
          </h3>
          <div className="relative w-72 hidden md:block">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Buscar placa, lote o producto..." className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-primary" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">N° Recepción</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Producto y Lote</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Ensayo Microbiano</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Tiempo de Incubación</th>
                <th className="px-5 py-3 text-right text-xs uppercase tracking-wider">Acción de Lectura</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ensayosMicro.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors h-[70px] group">
                  <td className="px-5 font-bold text-slate-900">{item.id}</td>
                  <td className="px-5">
                    <span className="font-medium text-slate-800 block">{item.producto}</span>
                    <span className="text-[10px] text-slate-500">Lote: {item.lote}</span>
                  </td>
                  <td className="px-5 text-slate-700 font-bold">{item.ensayo}</td>
                  <td className="px-5">
                     <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border ${
                       item.estado === 'Lectura Final' ? 'bg-orange-100 text-orange-800 border-orange-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                     }`}>
                        <Clock className="w-3 h-3 mr-1" /> {item.dia}
                     </span>
                  </td>
                  <td className="px-5 text-right">
                    <Link href={`/micro/lectura/${i}`} className={`inline-flex items-center gap-1 font-medium transition-colors border px-4 py-1.5 rounded-[20px] text-xs shadow-sm ${
                       item.lectura.includes('Hoy') ? 'text-white border-orange-600 bg-orange-600 hover:bg-orange-700' : 'text-primary hover:text-white border-primary hover:bg-primary'
                    }`}>
                      Registrar Lectura <ArrowRight className="w-3 h-3" />
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
