"use client";

import { useState } from "react";
import { 
  BarChart as BarChartIcon, Download, FileSpreadsheet, Activity, Users, Clock, ShieldCheck,
  Search, Filter
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from "recharts";

export default function ReportesAvanzadosPage() {
  const [activeTab, setActiveTab] = useState("tiempos");

  const tabs = [
    { id: "tiempos", label: "Tiempos por Etapa (SLA)" },
    { id: "carga", label: "Carga por Analista" },
    { id: "estandares", label: "Control de Estándares" },
    { id: "lista", label: "Base de Datos Cruda" }
  ];

  const tiemposData = [
    { name: "RAC", Promedio: 2, LimiteSLA: 4 },
    { name: "DOCT", Promedio: 24, LimiteSLA: 48 },
    { name: "FFQQ", Promedio: 120, LimiteSLA: 168 },
    { name: "Micro", Promedio: 336, LimiteSLA: 336 },
    { name: "STCC/DT", Promedio: 48, LimiteSLA: 72 },
    { name: "Emisión", Promedio: 12, LimiteSLA: 24 },
  ];

  const cargaData = [
    { name: "A. Sevilla (RAC)", Asignados: 45, Completados: 38 },
    { name: "E. Ballesteros (DOCT)", Asignados: 32, Completados: 25 },
    { name: "M. Torres (FFQQ)", Asignados: 18, Completados: 10 },
    { name: "J. Pérez (FFQQ)", Asignados: 22, Completados: 15 },
    { name: "K. Martínez (STCC)", Asignados: 28, Completados: 24 },
  ];

  const listaCruda = [
    { id: "REC-2024-1020", tramite: "ARSA", ingreso: "12/04", emision: "-", estado: "Pendiente DOCT", atraso: "Sí" },
    { id: "REC-2024-1015", tramite: "Particular", ingreso: "10/04", emision: "-", estado: "Análisis FFQQ", atraso: "No" },
    { id: "REC-2024-0990", tramite: "Renovación", ingreso: "01/04", emision: "15/04", estado: "Archivado", atraso: "No" },
    { id: "REC-2024-0988", tramite: "ARSA", ingreso: "28/03", emision: "-", estado: "Revisión DT", atraso: "Sí" },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Reportes y Dashboards</h1>
          <p className="text-slate-500 text-sm mt-1">Inteligencia de negocio, productividad y exportación de datos.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-[20px] font-medium text-sm transition-colors shadow-sm flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filtro Global
          </button>
          <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-[20px] font-medium text-sm transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> Exportar PDF Completo
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex border-b border-slate-200 overflow-x-auto hide-scrollbar bg-white px-2 pt-2 rounded-t-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id 
                ? "border-primary text-primary" 
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-b-md border border-t-0 border-slate-200 shadow-sm min-h-[500px]">
        
        {/* TAB 1: TIEMPOS */}
        {activeTab === "tiempos" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Análisis de Tiempos por Etapa (Horas Promedio)
              </h2>
              <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Mes Actual</span>
            </div>
            
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tiemposData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                  <Bar dataKey="Promedio" fill="#025f85" radius={[4, 4, 0, 0]} barSize={40} />
                  <Bar dataKey="LimiteSLA" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-slate-600 mt-4 max-w-3xl">
              <strong className="text-slate-900">Nota Analítica:</strong> El área de DOCT está promediando 24 horas frente a un SLA de 48 horas (rendimiento óptimo). FFQQ promedia 120 horas frente a 168 (rendimiento óptimo). No hay cuellos de botella estadísticos sistémicos este mes.
            </p>
          </div>
        )}

        {/* TAB 2: CARGA */}
        {activeTab === "carga" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" /> Productividad y Carga por Analista/Técnico
              </h2>
            </div>
            
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cargaData} layout="vertical" margin={{ top: 20, right: 30, left: 50, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 12}} width={120} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                  <Bar dataKey="Asignados" stackId="a" fill="#e2e8f0" radius={[0, 0, 0, 0]} barSize={24} />
                  <Bar dataKey="Completados" stackId="a" fill="#a7c051" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB 3: ESTÁNDARES */}
        {activeTab === "estandares" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" /> Reporte de Estándares de Referencia
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                <p className="text-sm text-slate-500">Estándares Activos</p>
                <p className="text-2xl font-bold text-slate-900">342</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-md border border-orange-200">
                <p className="text-sm text-orange-700">Por Vencer (30 días)</p>
                <p className="text-2xl font-bold text-orange-600">12</p>
              </div>
              <div className="bg-danger/5 p-4 rounded-md border border-danger/20">
                <p className="text-sm text-danger">Rechazados / Agotados</p>
                <p className="text-2xl font-bold text-danger">4</p>
              </div>
            </div>
            <div className="p-4 border border-slate-200 rounded-md">
              <p className="text-sm text-slate-500 text-center py-12">Tabla de inventario de estándares en desarrollo.</p>
            </div>
          </div>
        )}

        {/* TAB 4: LISTA CRUDA */}
        {activeTab === "lista" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-primary" /> Base de Datos Cruda (Reporte Maestro)
              </h2>
              <button className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-[5px] text-xs font-medium transition-colors flex items-center gap-2">
                <Download className="w-3 h-3" /> Descargar Excel (.xlsx)
              </button>
            </div>

            <div className="flex items-center gap-4 w-full md:w-96 mb-4">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Buscar en el reporte..." 
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-[5px] text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            
            <div className="border border-slate-200 rounded-md overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3">N° Recepción</th>
                    <th className="px-6 py-3">Trámite</th>
                    <th className="px-6 py-3">Fecha Ingreso</th>
                    <th className="px-6 py-3">Fecha Emisión</th>
                    <th className="px-6 py-3">Estado Actual</th>
                    <th className="px-6 py-3">Riesgo SLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {listaCruda.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors h-[48px]">
                      <td className="px-6 font-bold text-slate-900">{item.id}</td>
                      <td className="px-6">{item.tramite}</td>
                      <td className="px-6">{item.ingreso}</td>
                      <td className="px-6">{item.emision}</td>
                      <td className="px-6">{item.estado}</td>
                      <td className="px-6">
                        {item.atraso === "Sí" ? (
                          <span className="text-danger font-medium bg-danger/10 px-2 py-0.5 rounded text-xs">Vencido</span>
                        ) : (
                          <span className="text-success font-medium bg-green-100 px-2 py-0.5 rounded text-xs">En tiempo</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
