"use client";

import { useState } from "react";
import { ArrowRight, Clock, AlertCircle, FileText, AlertTriangle, Activity, CheckCircle2, X, ChevronRight, BarChart2 } from "lucide-react";
import Link from "next/link";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, ReferenceLine
} from "recharts";

export default function Dashboard() {
  const [alerts, setAlerts] = useState([
    { id: 1, type: "critical", text: "LEF-2024-00156 — Paracetamol 500mg escalado a Comité de Calidad", tag: "DT" },
    { id: 2, type: "warning", text: "LEF-2024-00148 — Metformina 850mg con pago pendiente hace 10 días", tag: "RAC" },
    { id: 3, type: "warning", text: "LEF-2024-00152 — RT-30 con 7 días transcurridos", tag: "DOCT" },
    { id: 4, type: "info", text: "LEF-2024-00149 — Auxiliar RT-84 pendiente de actualización", tag: "STCC" }
  ]);

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  // Gráfico: Tiempo Promedio de Análisis
  const timeData = [
    { name: "S48", promedio: 5.8 },
    { name: "S49", promedio: 5.5 },
    { name: "S50", promedio: 5.1 },
    { name: "S51", promedio: 6.2 },
    { name: "S52", promedio: 4.8 },
    { name: "S01", promedio: 4.5 },
    { name: "S02", promedio: 4.2 },
  ];

  // Gráfico: Ingresos por Etapa
  const stageData = [
    { name: "RAC", valor: 15 },
    { name: "DOCT", valor: 12 },
    { name: "EST", valor: 5 },
    { name: "STR", valor: 8 },
    { name: "FFQQ", valor: 35 },
    { name: "MICRO", valor: 18 },
    { name: "STCC", valor: 10 },
    { name: "DT", valor: 4 },
  ];

  // Gráfico: Distribución por Trámite
  const tramiteData = [
    { name: "Control Calidad", value: 12 },
    { name: "Licitación", value: 7 },
    { name: "Registro San.", value: 4 },
    { name: "Vigilancia", value: 5 },
    { name: "Colaboración", value: 3 },
  ];
  const COLORS = ['#025f85', '#a7c051', '#f59e0b', '#8b5cf6', '#14b8a6'];

  const recentActivity = [
    { time: "Hace 10 min", user: "KS", text: "actualizó RT-38", ref: "LEF-2024-00147" },
    { time: "Hace 45 min", user: "RP", text: "emitió RT-40", ref: "LEF-2024-00158" },
    { time: "Hace 2 horas", user: "MR", text: "registró pago", ref: "LEF-2024-00148" },
    { time: "Ayer 16:30", user: "AS", text: "aprobó paquete STCC", ref: "LEF-2024-00130" }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 2.1 Banners de Alerta */}
      {alerts.length > 0 && (
        <div className="space-y-2 mb-6">
          {alerts.map(alert => (
            <div key={alert.id} className={`flex items-center justify-between p-3 rounded-lg border text-sm shadow-sm ${
              alert.type === 'critical' ? 'bg-red-50 border-red-200 text-red-900' :
              alert.type === 'warning' ? 'bg-orange-50 border-orange-200 text-orange-900' :
              'bg-blue-50 border-blue-200 text-blue-900'
            }`}>
              <div className="flex items-center gap-3">
                {alert.type === 'critical' ? <AlertCircle className="w-5 h-5 text-red-600" /> :
                 alert.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-orange-600" /> :
                 <AlertCircle className="w-5 h-5 text-blue-600" />}
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  alert.type === 'critical' ? 'bg-red-100 text-red-700' :
                  alert.type === 'warning' ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {alert.tag}
                </span>
                <span className="font-medium">{alert.text}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded text-xs font-bold transition-colors">Ver</button>
                <button onClick={() => dismissAlert(alert.id)} className="p-1 hover:bg-black/5 rounded transition-colors"><X className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Header Título */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Panel Principal — Q.F. María Rodríguez</h1>
          <p className="text-slate-500 text-sm mt-1">Resumen general y estado operativo de su área.</p>
        </div>
      </div>

      {/* 2.2 Indicadores KPI (Cards) */}
      <div className="space-y-4">
        {/* Fila 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between cursor-pointer hover:border-primary transition-colors">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-bold text-slate-600">Ingresos Activos</span>
              <span className="text-xs font-bold text-success bg-green-50 px-2 py-0.5 rounded">+3</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-black text-slate-900">24</span>
              <span className="text-xs text-slate-400 mb-1">31 en enero</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between cursor-pointer hover:border-orange-500 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-bold text-slate-600">Pendientes de Mi Acción</span>
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">+2</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-black text-slate-900">7</span>
              <span className="text-xs text-danger font-medium mb-1">Acción inmediata</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between cursor-pointer hover:border-success transition-colors">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-bold text-slate-600">Bloqueos Activos</span>
              <span className="text-xs font-bold text-success bg-green-50 px-2 py-0.5 rounded">-1</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-black text-slate-900">5</span>
              <span className="text-xs text-slate-400 mb-1">Pago, estándar, info</span>
            </div>
          </div>
        </div>

        {/* Fila 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Solicitudes de Información</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-2xl font-bold text-slate-800">3 activas</span>
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded font-medium">Rango: 7–52 días</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm border-l-4 border-l-danger">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Reanálisis en Curso</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-2xl font-bold text-slate-800">2 activos</span>
              <span className="text-[10px] bg-red-100 text-red-700 px-2 py-1 rounded font-bold">Crítico</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Tiempo Promedio / Etapa</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-2xl font-bold text-slate-800">4.2d</span>
              <div className="text-right">
                <span className="text-[10px] block text-slate-400">Meta: 5 días</span>
                <span className="text-[10px] text-success font-bold">Dentro de meta</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Carga Máx. por Analista</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-2xl font-bold text-slate-800">8 casos</span>
              <span className="text-[11px] bg-primary/10 text-primary px-2 py-1 rounded font-medium">Karla Suazo</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2.3 Visualización de Datos (Gráficos) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5">
          <h2 className="font-bold text-slate-800 mb-4 text-sm">Ingresos por Etapa</h2>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={stageData} margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 11, fontWeight: 600}} width={50} />
                <RechartsTooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                <Bar dataKey="valor" fill="#025f85" radius={[0, 4, 4, 0]} barSize={16}>
                  {stageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'FFQQ' ? '#ba3d3d' : '#025f85'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5">
          <h2 className="font-bold text-slate-800 mb-4 text-sm">Tiempo Promedio de Análisis</h2>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                <ReferenceLine y={5} stroke="#ba3d3d" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Meta (5d)', fill: '#ba3d3d', fontSize: 10 }} />
                <Line type="monotone" dataKey="promedio" stroke="#a7c051" strokeWidth={3} dot={{r: 4, fill: '#a7c051', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 flex flex-col">
          <h2 className="font-bold text-slate-800 mb-1 text-sm">Distribución por Trámite</h2>
          <p className="text-[10px] text-slate-500 mb-4">Enero 2024</p>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={tramiteData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
                  {tramiteData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
              <span className="text-2xl font-black text-slate-800">31</span>
              <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2.4 Listados y Componentes Adicionales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="font-bold text-slate-800 text-sm">Ingresos Pendientes de Acción</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-slate-500 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Correlativo</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Producto</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Cliente</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Etapa</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Días</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-primary text-xs">
                    <Link href="/ingresos/LEF-2024-00147" className="hover:underline">LEF-2024-00147</Link>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-700 font-medium">Amoxicilina 500mg</td>
                  <td className="px-4 py-3 text-[11px] text-slate-500">SESAL</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">Análisis FFQQ</span>
                  </td>
                  <td className="px-4 py-3 text-xs font-bold text-danger">11 días</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-[11px] font-bold bg-primary text-white px-3 py-1.5 rounded hover:bg-primary-dark transition-colors">Gestionar</button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-primary text-xs">
                    <Link href="/ingresos/LEF-2024-00148" className="hover:underline">LEF-2024-00148</Link>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-700 font-medium">Metformina 850mg</td>
                  <td className="px-4 py-3 text-[11px] text-slate-500">Droguería Cruz</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">RAC</span>
                  </td>
                  <td className="px-4 py-3 text-xs font-bold text-orange-600">5 días</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-[11px] font-bold bg-primary text-white px-3 py-1.5 rounded hover:bg-primary-dark transition-colors">Gestionar</button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-primary text-xs">
                    <Link href="/ingresos/LEF-2024-00156" className="hover:underline">LEF-2024-00156</Link>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-700 font-medium">Paracetamol 500mg</td>
                  <td className="px-4 py-3 text-[11px] text-slate-500">Hospital Escuela</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">Comité DT</span>
                  </td>
                  <td className="px-4 py-3 text-xs font-bold text-slate-600">2 días</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-[11px] font-bold bg-primary text-white px-3 py-1.5 rounded hover:bg-primary-dark transition-colors">Revisar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> Actividad Reciente
            </h2>
          </div>
          <div className="p-5 flex-1 overflow-y-auto">
            <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
              {recentActivity.map((act, i) => (
                <div key={i} className="relative pl-6">
                  <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center text-[9px] font-bold text-slate-500 shadow-sm">
                    {act.user}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{act.time}</span>
                    <p className="text-xs text-slate-600 mt-1">
                      <span className="font-bold text-slate-800">{act.user}</span> {act.text} en <Link href="#" className="text-primary hover:underline font-medium">{act.ref}</Link>
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
