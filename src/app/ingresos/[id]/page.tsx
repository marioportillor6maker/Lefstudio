"use client";

import { useState } from "react";
import { mockIngreso360 } from "@/lib/mockData";
import { 
  AlertCircle, CheckCircle2, Clock, FileText, Beaker, 
  History, Download, Activity, FileCheck, ShieldAlert, Files
} from "lucide-react";
import Link from "next/link";

export default function Ingreso360Page({ params }: { params: { id: string } }) {
  const data = mockIngreso360; // In a real app, fetch based on params.id
  const [activeTab, setActiveTab] = useState("logistica");

  const tabs = [
    { id: "logistica", label: "1. Logística (RAC)" },
    { id: "expediente", label: "2. Expediente (DOCT)" },
    { id: "ffqq", label: "3. Ejecución FFQQ" },
    { id: "micro", label: "4. Ejecución Micro" },
    { id: "revisiones", label: "5. Revisiones" }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header Rico (Sticky-like) */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{data.id}</h1>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
              <Clock className="w-3 h-3 mr-1" /> {data.estado}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
              {data.tramite}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-[5px] text-xs font-medium bg-danger/10 text-danger border border-danger/20">
              <ShieldAlert className="w-3 h-3 mr-1" /> Falta Estándar (Bloqueo)
            </span>
          </div>
          <h2 className="text-lg text-slate-800 font-medium">{data.producto.nombreComercial}</h2>
          <p className="text-sm text-slate-500 mt-1">Cliente: {data.cliente}</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-[20px] font-medium text-sm transition-colors shadow-sm">
            Ver RG-41 Completo
          </button>
          <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-[20px] font-medium text-sm transition-colors shadow-sm">
            Generar RT-30
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Bloque Central (Area de Trabajo) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Metadatos Base (El nuevo RG-41 compacto) */}
          <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-primary" /> Datos Maestros del Ingreso
              </h3>
            </div>
            <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6">
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">Forma Farmacéutica</p>
                <p className="text-sm font-medium text-slate-900">{data.producto.formaFarmaceutica}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">Lote</p>
                <p className="text-sm font-medium text-slate-900">{data.producto.lote}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">Vencimiento</p>
                <p className="text-sm font-medium text-slate-900">{data.producto.vencimiento}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">Reg. Sanitario</p>
                <p className="text-sm font-medium text-slate-900">{data.producto.registroSanitario}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-slate-500 font-medium mb-1">Fabricante</p>
                <p className="text-sm font-medium text-slate-900">{data.producto.fabricante}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-slate-500 font-medium mb-1">Titular</p>
                <p className="text-sm font-medium text-slate-900">{data.producto.titular}</p>
              </div>
            </div>
          </div>

          {/* TABS Área de Trabajo */}
          <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex border-b border-slate-200 overflow-x-auto hide-scrollbar">
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

            <div className="p-6">
              {activeTab === "expediente" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900">Control de Estándares e Historial</h3>
                    <button className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
                      <History className="w-4 h-4" /> Comparar con Historial (RT-41)
                    </button>
                  </div>
                  
                  {/* Observaciones Interárea */}
                  <div className="bg-orange-50 border border-orange-200 rounded-md p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-orange-800">Bloqueo Activo por Falta de Estándar</p>
                      <p className="text-sm text-orange-700 mt-1">{data.observaciones[0].texto}</p>
                      <p className="text-xs text-orange-600 mt-2 font-medium">Reportado por {data.observaciones[0].autor} ({data.observaciones[0].area})</p>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-md overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                          <th className="px-5 py-3">Estándar Requerido</th>
                          <th className="px-5 py-3">Estado</th>
                          <th className="px-5 py-3">Vencimiento</th>
                          <th className="px-5 py-3">Acción</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="h-[72px]">
                          <td className="px-5 font-medium text-slate-900">Paracetamol USP</td>
                          <td className="px-5">
                            <span className="text-danger font-medium">Agotado / No provisto</span>
                          </td>
                          <td className="px-5 text-slate-500">-</td>
                          <td className="px-5">
                            <button className="text-primary hover:underline font-medium">Vincular Lote (RG-44)</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "ffqq" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900">Workspace Analítico (RT-38)</h3>
                  
                  <div className="border border-slate-200 rounded-md overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                          <th className="px-5 py-3">Ensayo Técnico</th>
                          <th className="px-5 py-3">Estado</th>
                          <th className="px-5 py-3">Resultado</th>
                          <th className="px-5 py-3">Analista</th>
                          <th className="px-5 py-3">Acción</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {data.ensayosAsignados.map((ensayo, i) => (
                          <tr key={i} className="h-[72px] hover:bg-slate-50 transition-colors">
                            <td className="px-5 font-medium text-slate-900">{ensayo.ensayo}</td>
                            <td className="px-5">
                              {ensayo.estado === "Pendiente" ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                  Pendiente
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-success border border-green-200">
                                  <CheckCircle2 className="w-3 h-3 mr-1" /> Completado
                                </span>
                              )}
                            </td>
                            <td className="px-5 font-medium">{ensayo.resultado || "-"}</td>
                            <td className="px-5 text-slate-600">{ensayo.analista}</td>
                            <td className="px-5">
                              {ensayo.estado === "Pendiente" ? (
                                <button className="text-primary hover:underline font-medium">Capturar Datos</button>
                              ) : (
                                <button className="text-slate-500 hover:text-primary transition-colors"><FileText className="w-4 h-4" /></button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab !== "expediente" && activeTab !== "ffqq" && (
                <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                  <Activity className="w-12 h-12 mb-3 text-slate-300" />
                  <p>Contenido de la pestaña {activeTab} (En desarrollo Fase 2)</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Panel Lateral Derecho (Trazabilidad y Documentos) */}
        <div className="space-y-6">
          
          {/* Document Center */}
          <div className="bg-white rounded-md border border-slate-200 shadow-sm p-5">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Files className="w-4 h-4 text-primary" /> Document Center
            </h3>
            <div className="space-y-3">
              {data.documentos.map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-slate-100 bg-slate-50 rounded-[5px] hover:border-primary/30 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-900">{doc.tipo}</p>
                      <p className="text-[10px] text-slate-500">{doc.nombre}</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                </div>
              ))}
            </div>
          </div>

          {/* Timeline / Bitácora */}
          <div className="bg-white rounded-md border border-slate-200 shadow-sm p-5">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> Bitácora Operativa
            </h3>
            <div className="space-y-4">
              {data.timeline.map((item, i) => (
                <div key={i} className="relative pl-5 before:absolute before:left-[5px] before:top-2 before:bottom-[-16px] before:w-px before:bg-slate-200 last:before:hidden">
                  <div className="absolute left-0 top-1.5 w-[11px] h-[11px] bg-white border-2 border-primary rounded-full"></div>
                  <div>
                    <p className="text-xs font-medium text-slate-900">{item.accion}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{item.fecha} • {item.actor}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-[20px] transition-colors">
              Ver Historial Completo
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
