"use client";

import { ArrowRight, Clock, CheckCircle2, AlertCircle, FileText, AlertTriangle, Activity, Beaker, ShieldAlert, CreditCard, Lock } from "lucide-react";
import Link from "next/link";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from "recharts";

export default function Dashboard() {
  const kpis = [
    { label: "Ingresos Activos", value: "142", trend: "+12%", icon: Activity, color: "text-blue-600", bg: "bg-blue-100", border: "border-blue-200" },
    { label: "Bloqueos Activos", value: "5", trend: "-1 vs ayer", icon: Lock, color: "text-danger", bg: "bg-danger/10", border: "border-danger/20" },
    { label: "Pendientes de Pago", value: "18", trend: "-2%", icon: CreditCard, color: "text-orange-600", bg: "bg-orange-100", border: "border-orange-200" },
    { label: "En Análisis (FFQQ/Micro)", value: "54", trend: "+5%", icon: Beaker, color: "text-purple-600", bg: "bg-purple-100", border: "border-purple-200" },
    { label: "Reanálisis Activos", value: "3", trend: "+1", icon: AlertTriangle, color: "text-danger", bg: "bg-danger/10", border: "border-danger/20" },
    { label: "Informes Emitidos", value: "89", trend: "+24%", icon: CheckCircle2, color: "text-success", bg: "bg-green-100", border: "border-green-200" },
  ];

  const trendData = [
    { name: "Sem 1", ingresos: 45, emitidos: 30 },
    { name: "Sem 2", ingresos: 52, emitidos: 38 },
    { name: "Sem 3", ingresos: 38, emitidos: 45 },
    { name: "Sem 4", ingresos: 65, emitidos: 50 },
  ];

  const funnelData = [
    { name: "1. RAC", casos: 142 },
    { name: "2. DOCT", casos: 110 },
    { name: "3. Ejecución", casos: 85 },
    { name: "4. STCC/DT", casos: 42 },
    { name: "5. Emisión", casos: 25 },
  ];

  const tramiteData = [
    { name: "ARSA", value: 65 },
    { name: "Renovación", value: 25 },
    { name: "Licitación (SESAL/IHSS)", value: 20 },
    { name: "Particular", value: 10 },
  ];
  const COLORS = ['#025f85', '#a7c051', '#f59e0b', '#8b5cf6'];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Centro de Mando Operativo</h1>
          <p className="text-slate-500 text-sm mt-1">Visión gerencial en tiempo real del Laboratorio de Especialidades Farmacéuticas.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/reportes" className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-5 py-2.5 rounded-[20px] font-medium text-sm transition-colors shadow-sm flex items-center gap-2">
            <BarChart className="w-4 h-4" /> Centro de Reportes
          </Link>
          <Link href="/rac/nuevo" className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-[20px] font-medium text-sm transition-colors shadow-sm flex items-center gap-2">
            + Nuevo Ingreso
          </Link>
        </div>
      </div>

      {/* KPI Cards Superiores */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((stat, i) => (
          <div key={i} className={`bg-white p-4 rounded-lg border ${stat.border} shadow-sm relative overflow-hidden group`}>
            <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-20 ${stat.bg} group-hover:scale-150 transition-transform duration-500`}></div>
            <div className="flex justify-between items-start mb-3 relative z-10">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <span className={`text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-success' : stat.trend.includes('ayer') ? 'text-slate-500' : 'text-danger'}`}>
                {stat.trend}
              </span>
            </div>
            <div className="relative z-10">
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-tight">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos de Alto Impacto */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          <h2 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-sm">
            <Activity className="w-4 h-4 text-primary" /> Tendencia de Carga vs Emisión (Últimos 30 días)
          </h2>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#025f85" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#025f85" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEmitidos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a7c051" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#a7c051" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Area type="monotone" name="Nuevos Ingresos" dataKey="ingresos" stroke="#025f85" strokeWidth={3} fillOpacity={1} fill="url(#colorIngresos)" />
                <Area type="monotone" name="Informes Emitidos" dataKey="emitidos" stroke="#a7c051" strokeWidth={3} fillOpacity={1} fill="url(#colorEmitidos)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trámite Donut */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 flex flex-col">
          <h2 className="font-bold text-slate-800 mb-2 text-sm">Distribución por Trámite</h2>
          <p className="text-[11px] text-slate-500 mb-4">Volumen activo actual</p>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={tramiteData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {tramiteData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
              <span className="text-3xl font-bold text-slate-800">120</span>
              <span className="text-[10px] font-medium uppercase text-slate-500">Casos</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
            {tramiteData.map((entry, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                <span className="text-[11px] font-medium text-slate-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Embudo Operativo */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          <h2 className="font-bold text-slate-800 mb-6 text-sm">Embudo Operativo (Cuellos de Botella)</h2>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={funnelData} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 11, fontWeight: 500}} width={80} />
                <RechartsTooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="casos" fill="#025f85" radius={[0, 4, 4, 0]} barSize={20}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 1 ? '#ba3d3d' : '#025f85'} /> /* Highlight DOCT bottleneck */
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <AlertCircle className="w-4 h-4 text-danger shrink-0 mt-0.5" />
            <p className="text-[11px] text-red-800 font-medium">
              Alerta de Productividad: Alta concentración de casos ({funnelData[1].casos}) en etapa Documental (DOCT). Se sugiere liberar validaciones.
            </p>
          </div>
        </div>

        {/* Alertas Operativas y SLA */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h2 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
              <ShieldAlert className="w-4 h-4 text-danger" /> Action Center: Riesgos SLA y Bloqueos
            </h2>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3 text-xs">N° Recepción</th>
                  <th className="px-5 py-3 text-xs">Responsable</th>
                  <th className="px-5 py-3 text-xs">Riesgo / Bloqueo</th>
                  <th className="px-5 py-3 text-xs">SLA / Vencimiento</th>
                  <th className="px-5 py-3 text-right text-xs">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors h-[64px]">
                  <td className="px-5 font-bold text-slate-900 text-xs">REC-2024-1020</td>
                  <td className="px-5 text-xs text-slate-600">Edil Ballesteros <span className="text-[10px] text-slate-400 block">DOCT</span></td>
                  <td className="px-5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-danger/10 text-danger border border-danger/20">
                      FALTA ESTÁNDAR
                    </span>
                  </td>
                  <td className="px-5 text-danger font-bold text-xs flex items-center gap-1 mt-3.5"><Clock className="w-3 h-3"/> Vence Hoy</td>
                  <td className="px-5 text-right">
                    <Link href="/ingresos/REC-2024-1020" className="text-primary hover:underline font-medium text-xs">Gestionar</Link>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors h-[64px]">
                  <td className="px-5 font-bold text-slate-900 text-xs">REC-2024-0988</td>
                  <td className="px-5 text-xs text-slate-600">J. Pérez <span className="text-[10px] text-slate-400 block">FFQQ</span></td>
                  <td className="px-5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-800 border border-orange-200">
                      REANÁLISIS OOS
                    </span>
                  </td>
                  <td className="px-5 text-orange-600 font-bold text-xs mt-3.5 block">Queda 1 día</td>
                  <td className="px-5 text-right">
                    <Link href="/ingresos/REC-2024-0988" className="text-primary hover:underline font-medium text-xs">Gestionar</Link>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors h-[64px]">
                  <td className="px-5 font-bold text-slate-900 text-xs">REC-2024-0950</td>
                  <td className="px-5 text-xs text-slate-600">Dr. Erick Irías <span className="text-[10px] text-slate-400 block">Dirección Gral</span></td>
                  <td className="px-5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                      FIRMA ELECTRÓNICA
                    </span>
                  </td>
                  <td className="px-5 text-slate-600 text-xs mt-3.5 block">Quedan 2 días</td>
                  <td className="px-5 text-right">
                    <Link href="/ingresos/REC-2024-0950" className="text-primary hover:underline font-medium text-xs">Firmar RT-39</Link>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors h-[64px]">
                  <td className="px-5 font-bold text-slate-900 text-xs">REC-2024-1030</td>
                  <td className="px-5 text-xs text-slate-600">Aracely Sevilla <span className="text-[10px] text-slate-400 block">RAC</span></td>
                  <td className="px-5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                      PAGO PENDIENTE
                    </span>
                  </td>
                  <td className="px-5 text-slate-500 text-xs mt-3.5 block">-</td>
                  <td className="px-5 text-right">
                    <Link href="/rac" className="text-primary hover:underline font-medium text-xs">Ir a RAC</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-center mt-auto">
            <Link href="/ingresos" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
              Ver todos los 142 casos activos <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
