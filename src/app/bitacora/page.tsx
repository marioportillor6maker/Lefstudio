import { Activity, Clock, FileText, Search, Filter } from "lucide-react";

export default function BitacoraPage() {
  const eventos = [
    { fecha: "2024-04-22 10:45", usuario: "Karla Suazo", accion: "Actualización de resultados de disolución", modulo: "Análisis FFQQ", expediente: "REC-2024-00147" },
    { fecha: "2024-04-22 09:30", usuario: "María Rodríguez", accion: "Recepción de Muestras y Registro RG-41", modulo: "RAC", expediente: "REC-2024-00155" },
    { fecha: "2024-04-22 08:15", usuario: "Roberto Paz", accion: "Generación de Paquete Analítico RT-38", modulo: "STR", expediente: "REC-2024-00142" },
    { fecha: "2024-04-21 16:50", usuario: "Dra. Carmen López", accion: "Dictamen Final Aprobado (RT-39)", modulo: "Dirección Técnica", expediente: "REC-2024-00130" },
    { fecha: "2024-04-21 14:20", usuario: "Jorge Matute", accion: "Registro de lectura microbiana", modulo: "Microbiología", expediente: "REC-2024-00140" },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Bitácora Global del Sistema</h1>
          <p className="text-slate-500 text-sm mt-1">Registro de auditoría y trazabilidad de todos los eventos operativos del LEF.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-sm">
            <Activity className="w-4 h-4 text-primary" /> Eventos Recientes
          </h3>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Buscar por expediente, usuario o acción..." className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:border-primary shadow-sm" />
            </div>
            <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-md flex items-center gap-2 text-xs font-medium hover:bg-slate-50 shadow-sm">
              <Filter className="w-3.5 h-3.5" /> Filtrar
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Fecha / Hora</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Expediente</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Módulo / Área</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Acción Realizada</th>
                <th className="px-5 py-3 text-xs uppercase tracking-wider">Usuario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {eventos.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors h-[60px]">
                  <td className="px-5">
                    <span className="flex items-center gap-1.5 text-slate-600 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {item.fecha}
                    </span>
                  </td>
                  <td className="px-5 font-bold text-primary text-xs">{item.expediente}</td>
                  <td className="px-5">
                    <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                      {item.modulo}
                    </span>
                  </td>
                  <td className="px-5 text-slate-800 font-medium text-xs truncate max-w-[300px]" title={item.accion}>
                    {item.accion}
                  </td>
                  <td className="px-5 text-slate-600 text-xs">{item.usuario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-center">
           <button className="text-primary hover:underline text-xs font-medium">Cargar más eventos</button>
        </div>
      </div>
    </div>
  );
}
