"use client";

import { useState } from "react";
import { mockIngreso360 } from "@/lib/mockData";
import { 
  AlertCircle, CheckCircle2, Clock, FileText, Beaker, 
  History, Download, Activity, FileCheck, ShieldAlert, Files,
  User, Check, XCircle
} from "lucide-react";
import Link from "next/link";

export default function Ingreso360Page({ params }: { params: { id: string } }) {
  const data = mockIngreso360; 
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
      
      {/* Header Rico */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{data.id}</h1>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
              <Clock className="w-3 h-3 mr-1" /> {data.estado}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
              {data.tramite}
            </span>
            {data.bloqueos.map((b, i) => (
              <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-[5px] text-xs font-medium bg-danger/10 text-danger border border-danger/20">
                <ShieldAlert className="w-3 h-3 mr-1" /> Bloqueo: {b.tipo}
              </span>
            ))}
          </div>
          <h2 className="text-lg text-slate-800 font-medium">{data.producto.nombreComercial} ({data.producto.formaFarmaceutica})</h2>
          <div className="flex items-center gap-4 mt-2">
             <p className="text-sm text-slate-500">Cliente: <span className="font-medium text-slate-700">{data.cliente}</span></p>
             <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-100 text-blue-700 rounded-md text-xs font-medium">
               <User className="w-3 h-3" /> Responsable Actual: {data.responsableActual.nombre} ({data.responsableActual.rol})
             </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-[20px] font-medium text-sm transition-colors shadow-sm whitespace-nowrap">
            Ver Formato RG-41
          </button>
          <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-[20px] font-medium text-sm transition-colors shadow-sm whitespace-nowrap">
            Acciones Contextuales
          </button>
        </div>
      </div>

      {/* Macro Línea de Tiempo del Proceso */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm p-5 overflow-x-auto hide-scrollbar">
        <div className="flex items-center min-w-[800px]">
          {[
            { step: 1, label: "Recepción RAC", status: "completed" },
            { step: 2, label: "Expediente DOCT", status: "completed" },
            { step: 3, label: "Análisis (FFQQ/Micro)", status: "current" },
            { step: 4, label: "Control STCC", status: "pending" },
            { step: 5, label: "Aprobación DT/DG", status: "pending" },
            { step: 6, label: "Emisión", status: "pending" }
          ].map((item, index, arr) => (
            <div key={index} className="flex-1 flex items-center relative">
              <div className="flex flex-col items-center gap-2 relative z-10 w-full">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-colors bg-white ${
                  item.status === 'completed' ? 'border-success text-success' : 
                  item.status === 'current' ? 'border-primary bg-primary text-white shadow-md' : 
                  'border-slate-200 text-slate-400'
                }`}>
                  {item.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : item.step}
                </div>
                <span className={`text-[11px] font-bold text-center absolute top-10 whitespace-nowrap ${
                  item.status === 'completed' ? 'text-slate-700' : 
                  item.status === 'current' ? 'text-primary' : 'text-slate-400'
                }`}>
                  {item.label}
                </span>
              </div>
              {index < arr.length - 1 && (
                <div className={`absolute top-4 left-1/2 w-full h-[2px] -z-0 ${
                  item.status === 'completed' ? 'bg-success' : 'bg-slate-100'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="h-6"></div> {/* Spacer for absolute labels */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Bloque Central (Area de Trabajo) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Metadatos Base */}
          <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-primary" /> Datos Maestros del Ingreso
              </h3>
              <span className="text-xs text-slate-500">Lote: <span className="font-bold text-slate-700">{data.producto.lote}</span></span>
            </div>
            <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-6">
               <div>
                <p className="text-xs text-slate-500 font-medium mb-1">Nombre Genérico</p>
                <p className="text-sm font-medium text-slate-900">{data.producto.nombreGenerico}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">Concentración</p>
                <p className="text-sm font-medium text-slate-900">{data.producto.concentracion}</p>
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
                <p className="text-xs text-slate-500 font-medium mb-1">Droguería</p>
                <p className="text-sm font-medium text-slate-900">{data.producto.drogueria}</p>
              </div>
            </div>
          </div>

          {/* TABS Área de Trabajo */}
          <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
            <div className="flex border-b border-slate-200 overflow-x-auto hide-scrollbar bg-slate-50">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id 
                      ? "border-primary text-primary bg-white" 
                      : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              
              {/* TAB 1: LOGÍSTICA */}
              {activeTab === "logistica" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">Información Logística y Administrativa</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-50 rounded-md p-4 border border-slate-200">
                       <h4 className="font-semibold text-slate-800 mb-3 text-sm flex items-center gap-2">
                         <Activity className="w-4 h-4 text-primary" /> Cobro y Proforma
                       </h4>
                       <div className="space-y-2 text-sm">
                         <div className="flex justify-between"><span className="text-slate-500">Proforma:</span> <span className="font-medium text-slate-900">{data.logistica.proforma.numero}</span></div>
                         <div className="flex justify-between"><span className="text-slate-500">Monto:</span> <span className="font-medium text-slate-900">{data.logistica.proforma.monto}</span></div>
                         <div className="flex justify-between"><span className="text-slate-500">Estado:</span> <span className="text-success font-bold">{data.logistica.proforma.estadoPago}</span></div>
                         <div className="flex justify-between"><span className="text-slate-500">Fecha Pago:</span> <span className="font-medium text-slate-900">{data.logistica.proforma.fechaPago}</span></div>
                         <div className="flex justify-between"><span className="text-slate-500">Factura:</span> <span className="font-medium text-primary cursor-pointer hover:underline">{data.logistica.proforma.factura}</span></div>
                       </div>
                    </div>
                    <div className="bg-slate-50 rounded-md p-4 border border-slate-200">
                       <h4 className="font-semibold text-slate-800 mb-3 text-sm flex items-center gap-2">
                         <Beaker className="w-4 h-4 text-primary" /> Control de Muestras (RT-159)
                       </h4>
                       <div className="space-y-2 text-sm">
                         <div className="flex justify-between"><span className="text-slate-500">Total Recibido:</span> <span className="font-medium text-slate-900">{data.muestras.cantidadRecibida}</span></div>
                         <div className="flex justify-between"><span className="text-slate-500">Condición Almacén:</span> <span className="font-medium text-slate-900">{data.logistica.condicionAlmacenamiento}</span></div>
                         <div className="mt-3 pt-3 border-t border-slate-200">
                            {data.muestras.distribucion.map((dist, i) => (
                              <div key={i} className="flex justify-between items-center py-1">
                                <span className="text-slate-600 text-xs">{dist.area} ({dist.cantidad})</span>
                                <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-700 font-medium">{dist.estado}</span>
                              </div>
                            ))}
                         </div>
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: EXPEDIENTE DOCT */}
              {activeTab === "expediente" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900">Control de Estándares e Historial</h3>
                    <button className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
                      <History className="w-4 h-4" /> Ver RT-41 (Contraste Histórico)
                    </button>
                  </div>
                  
                  {data.observaciones.map((obs, i) => (
                    <div key={i} className={`rounded-md p-4 flex gap-3 ${obs.tipo === 'bloqueo' ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'}`}>
                      {obs.tipo === 'bloqueo' ? <AlertCircle className="w-5 h-5 text-orange-600 shrink-0" /> : <Activity className="w-5 h-5 text-blue-600 shrink-0" />}
                      <div>
                        <p className={`text-sm font-medium ${obs.tipo === 'bloqueo' ? 'text-orange-800' : 'text-blue-800'}`}>
                          Observación de {obs.autor} ({obs.rol}) - {obs.area}
                        </p>
                        <p className={`text-sm mt-1 ${obs.tipo === 'bloqueo' ? 'text-orange-700' : 'text-blue-700'}`}>{obs.texto}</p>
                        <p className={`text-xs mt-2 font-medium ${obs.tipo === 'bloqueo' ? 'text-orange-600' : 'text-blue-600'}`}>{obs.fecha}</p>
                      </div>
                    </div>
                  ))}

                  <div className="border border-slate-200 rounded-md overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                          <th className="px-5 py-3">Estándar / Insumo Requerido</th>
                          <th className="px-5 py-3">Estado actual</th>
                          <th className="px-5 py-3">Documento asociado</th>
                          <th className="px-5 py-3 text-right">Acción</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr className="h-[60px] bg-red-50/30">
                          <td className="px-5 font-medium text-slate-900">Paracetamol USP (Primario)</td>
                          <td className="px-5">
                            <span className="text-danger font-medium text-xs border border-danger/20 bg-danger/10 px-2 py-1 rounded">Agotado / No provisto</span>
                          </td>
                          <td className="px-5 text-slate-500">RT-30</td>
                          <td className="px-5 text-right">
                            <button className="text-primary hover:underline font-medium text-xs">Vincular Lote (RG-44)</button>
                          </td>
                        </tr>
                        <tr className="h-[60px]">
                          <td className="px-5 font-medium text-slate-900">Expediente Histórico Producto</td>
                          <td className="px-5">
                            <span className="text-success font-medium text-xs border border-green-200 bg-green-50 px-2 py-1 rounded">Localizado (3 previos)</span>
                          </td>
                          <td className="px-5 text-slate-500">RT-75</td>
                          <td className="px-5 text-right">
                            <button className="text-primary hover:underline font-medium text-xs">Ver Expediente</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: FFQQ */}
              {activeTab === "ffqq" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                     <h3 className="text-lg font-bold text-slate-900">Workspace Analítico (Ensayos Físico-Químicos)</h3>
                     <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">RT-38 Generado</span>
                  </div>
                  
                  <div className="border border-slate-200 rounded-md overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                          <th className="px-5 py-3">Ensayo / Técnica</th>
                          <th className="px-5 py-3">Especificación</th>
                          <th className="px-5 py-3">Analista (Auxiliar)</th>
                          <th className="px-5 py-3">Estado</th>
                          <th className="px-5 py-3 text-right">Acción</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {data.ensayosAsignados.map((ensayo, i) => (
                          <tr key={i} className="h-[64px] hover:bg-slate-50 transition-colors">
                            <td className="px-5">
                               <p className="font-medium text-slate-900">{ensayo.ensayo}</p>
                               <p className="text-[10px] text-slate-500">{ensayo.tecnica}</p>
                            </td>
                            <td className="px-5 text-xs text-slate-600">{ensayo.especificacion}</td>
                            <td className="px-5">
                               <p className="text-slate-700 text-xs">{ensayo.analista}</p>
                               <p className="text-[10px] font-medium text-primary">{ensayo.auxiliar}</p>
                            </td>
                            <td className="px-5">
                              {ensayo.estado === "Bloqueado" && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                  <Clock className="w-3 h-3 mr-1" /> {ensayo.razon}
                                </span>
                              )}
                              {ensayo.estado === "Completado" && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-green-50 text-success border border-green-200">
                                  <CheckCircle2 className="w-3 h-3 mr-1" /> {ensayo.resultado}
                                </span>
                              )}
                            </td>
                            <td className="px-5 text-right">
                              {ensayo.estado === "Bloqueado" ? (
                                <span className="text-slate-400 text-xs">Desbloquear DOC</span>
                              ) : (
                                <button className="text-primary hover:text-primary-dark transition-colors bg-primary/5 hover:bg-primary/10 px-3 py-1 rounded text-xs font-medium">Ver Datos</button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: MICRO */}
              {activeTab === "micro" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900">Bitácora Microbiológica (RT-74)</h3>
                  <div className="border border-slate-200 rounded-md overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                          <th className="px-5 py-3">Ensayo Microbiano</th>
                          <th className="px-5 py-3">Estado de Incubación</th>
                          <th className="px-5 py-3">Analista Responsable</th>
                          <th className="px-5 py-3 text-right">Acción</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {data.ensayosMicro.map((ensayo, i) => (
                          <tr key={i} className="h-[64px] hover:bg-slate-50 transition-colors">
                            <td className="px-5 font-medium text-slate-900">{ensayo.ensayo}</td>
                            <td className="px-5">
                               <span className="inline-flex items-center text-xs font-medium text-primary">
                                  <Clock className="w-3 h-3 mr-1" /> {ensayo.estado}
                               </span>
                            </td>
                            <td className="px-5 text-slate-600 text-xs">{ensayo.analista}</td>
                            <td className="px-5 text-right">
                               <button className="text-primary hover:underline font-medium text-xs">Registrar Lectura</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 5: REVISIONES */}
              {activeTab === "revisiones" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900">Supervisión, Reanálisis y Emisión</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-slate-200 rounded-md p-5 bg-slate-50 flex flex-col justify-center items-center text-center h-48">
                        <CheckCircle2 className="w-8 h-8 text-slate-300 mb-2" />
                        <h4 className="text-slate-500 font-medium text-sm">Control de Calidad (STCC)</h4>
                        <p className="text-xs text-slate-400 mt-1">Esperando finalización de ensayos FFQQ y Micro para iniciar revisión del paquete.</p>
                    </div>
                    <div className="border border-slate-200 rounded-md p-5 bg-slate-50 flex flex-col justify-center items-center text-center h-48">
                        <FileText className="w-8 h-8 text-slate-300 mb-2" />
                        <h4 className="text-slate-500 font-medium text-sm">Emisión de Informe (RT-39)</h4>
                        <p className="text-xs text-slate-400 mt-1">No disponible. El caso debe ser aprobado por Dirección Técnica primero.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Panel Lateral Derecho (Documentos y Trazabilidad Narrativa) */}
        <div className="space-y-6">
          
          {/* Document Center */}
          <div className="bg-white rounded-md border border-slate-200 shadow-sm p-5">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2 text-sm">
              <Files className="w-4 h-4 text-primary" /> Document Center Activo
            </h3>
            <div className="space-y-2">
              {data.documentos.map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 border border-slate-100 bg-slate-50 rounded-[5px] hover:border-primary/30 transition-colors group cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 leading-tight">{doc.codigo}</p>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{doc.tipo}</p>
                      <p className="text-[9px] text-slate-400 mt-1">{doc.fecha} • <span className={doc.estado.includes('Emitido') ? 'text-primary font-medium' : ''}>{doc.estado}</span></p>
                    </div>
                  </div>
                  <Download className="w-3.5 h-3.5 text-slate-300 group-hover:text-primary shrink-0" />
                </div>
              ))}
            </div>
            <button className="w-full mt-3 py-1.5 text-xs font-medium text-primary bg-white border border-slate-200 hover:bg-slate-50 rounded transition-colors">
              Ver Todos los Adjuntos
            </button>
          </div>

          {/* Timeline Narrativo (Estilo Rocket Mejorado) */}
          <div className="bg-white rounded-md border border-slate-200 shadow-sm p-5 max-h-[600px] overflow-y-auto custom-scrollbar">
            <h3 className="font-semibold text-slate-800 mb-5 flex items-center gap-2 text-sm sticky top-0 bg-white z-10 pb-2 border-b border-slate-100">
              <Activity className="w-4 h-4 text-primary" /> Bitácora Operativa
            </h3>
            <div className="space-y-5">
              {data.timeline.map((item, i) => (
                <div key={i} className="relative pl-5 before:absolute before:left-[7px] before:top-2.5 before:bottom-[-20px] before:w-[2px] before:bg-slate-100 last:before:hidden">
                  <div className={`absolute left-0 top-1.5 w-[16px] h-[16px] bg-white border-2 rounded-full flex items-center justify-center
                    ${item.icono === 'alerta' ? 'border-danger' : 
                      item.icono === 'documento' || item.icono === 'firma' ? 'border-primary' : 
                      item.icono === 'estado' ? 'border-orange-500' : 'border-slate-300'}`}>
                  </div>
                  <div className="bg-slate-50/50 rounded-md p-2 border border-slate-100">
                    <p className="text-xs text-slate-800 leading-snug">{item.accion}</p>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5">
                       <p className="text-[10px] font-medium text-slate-600">{item.actor} <span className="text-slate-400">({item.rol})</span></p>
                       <p className="text-[10px] text-slate-400">• {item.fecha.split(" ")[1]}</p>
                    </div>
                    {item.documento && (
                      <div className="mt-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded text-[9px] font-medium cursor-pointer hover:bg-blue-100">
                        <FileText className="w-2.5 h-2.5" /> Generó: {item.documento}
                      </div>
                    )}
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
