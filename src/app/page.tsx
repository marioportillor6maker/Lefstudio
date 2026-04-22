import { ArrowRight, Clock, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const stats = [
    { label: "Ingresos del Mes", value: "142", icon: FileText, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Pendientes RAC", value: "12", icon: Clock, color: "text-orange-600", bg: "bg-orange-100" },
    { label: "En Análisis FFQQ", value: "34", icon: AlertCircle, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Informes Emitidos", value: "89", icon: CheckCircle2, color: "text-success", bg: "bg-green-100" },
  ];

  const recentActivity = [
    { id: "REC-2024-1024", action: "Ingreso Registrado", user: "Aracely Sevilla", time: "Hace 10 min", status: "Borrador" },
    { id: "REC-2024-1021", action: "Aprobado por STCC", user: "Karla Martínez", time: "Hace 45 min", status: "En revisión DT" },
    { id: "REC-2024-1018", action: "Reanálisis Ordenado", user: "Dra. E. Ballesteros", time: "Hace 2 horas", status: "Reanálisis" },
    { id: "REC-2024-0995", action: "Informe Emitido", user: "Dirección General", time: "Ayer", status: "Archivado" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard General</h1>
          <p className="text-slate-500 text-sm mt-1">Resumen operativo del Laboratorio de Especialidades Farmacéuticas.</p>
        </div>
        <Link 
          href="/rac/nuevo" 
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-[20px] font-medium text-sm transition-colors shadow-sm flex items-center gap-2"
        >
          + Nuevo Ingreso (RAC)
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-[5px] border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Panel */}
        <div className="lg:col-span-2 bg-white rounded-[5px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
            <h2 className="font-semibold text-slate-800">Casos Prioritarios (SLA Crítico)</h2>
            <Link href="/ingresos" className="text-sm text-primary hover:underline flex items-center gap-1">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="p-0">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-medium">N° Recepción</th>
                  <th className="px-6 py-3 font-medium">Producto</th>
                  <th className="px-6 py-3 font-medium">Etapa Actual</th>
                  <th className="px-6 py-3 font-medium">SLA</th>
                  <th className="px-6 py-3 font-medium">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors h-[72px]">
                  <td className="px-6 font-medium text-slate-900">REC-2024-1020</td>
                  <td className="px-6">Paracetamol 500mg Tabletas</td>
                  <td className="px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                      Pendiente Estándar
                    </span>
                  </td>
                  <td className="px-6 text-danger font-medium">Vence hoy</td>
                  <td className="px-6">
                    <Link href="/ingresos/REC-2024-1020" className="text-primary hover:underline font-medium">Revisar</Link>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors h-[72px]">
                  <td className="px-6 font-medium text-slate-900">REC-2024-1015</td>
                  <td className="px-6">Amoxicilina 250mg/5mL Susp.</td>
                  <td className="px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                      En Análisis FFQQ
                    </span>
                  </td>
                  <td className="px-6 text-slate-600">Quedan 2 días</td>
                  <td className="px-6">
                    <Link href="/ingresos/REC-2024-1015" className="text-primary hover:underline font-medium">Revisar</Link>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors h-[72px]">
                  <td className="px-6 font-medium text-slate-900">REC-2024-0988</td>
                  <td className="px-6">Loratadina 10mg Jbe.</td>
                  <td className="px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      En revisión STCC
                    </span>
                  </td>
                  <td className="px-6 text-orange-600 font-medium">Queda 1 día</td>
                  <td className="px-6">
                    <Link href="/ingresos/REC-2024-0988" className="text-primary hover:underline font-medium">Revisar</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Panel */}
        <div className="bg-white rounded-[5px] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
            <h2 className="font-semibold text-slate-800">Actividad Reciente</h2>
          </div>
          <div className="p-6 flex-1">
            <div className="space-y-6">
              {recentActivity.map((activity, i) => (
                <div key={i} className="relative pl-6 before:absolute before:left-[9px] before:top-2 before:bottom-[-24px] before:w-px before:bg-slate-200 last:before:hidden">
                  <div className="absolute left-0 top-1 w-[19px] h-[19px] bg-white border-2 border-primary rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {activity.action} <span className="text-primary">{activity.id}</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Por {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
