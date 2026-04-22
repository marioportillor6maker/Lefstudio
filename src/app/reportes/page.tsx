import { BarChart, Download, FileSpreadsheet, Activity } from "lucide-react";

export default function ReportesPage() {
  const reportes = [
    { titulo: "SLA y Tiempos de Entrega", tipo: "Dashboard", desc: "Métricas de eficiencia por área (RAC, DOCT, FFQQ)." },
    { titulo: "Matriz de Ingresos Mensuales", tipo: "Exportable Excel", desc: "Base de datos cruda de todos los RT-41 generados." },
    { titulo: "Alertas de Calidad (OOS)", tipo: "Dashboard", desc: "Tendencias de casos fuera de especificación." },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reportes y BI</h1>
          <p className="text-slate-500 text-sm mt-1">Inteligencia de negocio y exportación de datos (Excel/CSV).</p>
        </div>
      </div>

      {/* Simulador de gráfico */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm p-6 flex flex-col items-center justify-center min-h-[300px]">
        <Activity className="w-16 h-16 text-slate-200 mb-4" />
        <h3 className="text-lg font-bold text-slate-700">Métricas Operativas</h3>
        <p className="text-slate-500 text-sm">Visualización de gráficos (Chart.js / Recharts) en desarrollo Fase 2.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportes.map((rep, i) => (
          <div key={i} className="bg-white p-6 rounded-md border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 text-primary flex items-center justify-center">
                {rep.tipo === "Dashboard" ? <BarChart className="w-5 h-5" /> : <FileSpreadsheet className="w-5 h-5" />}
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider bg-slate-100 px-2 py-1 rounded-sm">
                {rep.tipo}
              </span>
            </div>
            <h3 className="font-bold text-slate-800">{rep.titulo}</h3>
            <p className="text-sm text-slate-500 mt-2 mb-6">{rep.desc}</p>
            <button className="w-full flex justify-center items-center gap-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 py-2 rounded-[20px] font-medium text-sm transition-colors shadow-sm">
              <Download className="w-4 h-4" /> Generar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
