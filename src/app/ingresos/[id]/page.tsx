"use client";

import { useState } from "react";
import { mockIngreso360 } from "@/lib/mockData";
import { 
  AlertCircle, CheckCircle2, Clock, FileText, Beaker, 
  History, Download, Activity, FileCheck, ShieldAlert, Files,
  User, Check, XCircle, ChevronDown, Flag, FileDigit, Calendar, ShieldCheck,
  Building, MapPin, Printer, MoreHorizontal, Filter, FlaskConical, Microscope, Briefcase,
  Eye, GitCompare, MessageSquare
} from "lucide-react";

export default function Ingreso360Page({ params }: { params: { id: string } }) {
  const data = mockIngreso360; 
  const [activeTab, setActiveTab] = useState("resumen");
  const [sideTab, setSideTab] = useState("timeline");

  const tabs = [
    { id: "resumen", label: "Resumen General" },
    { id: "rac", label: "RAC / Recepción" },
    { id: "documentacion", label: "Documentación" },
    { id: "formatos", label: "Formatos" },
    { id: "estandar", label: "Estándar" },
    { id: "ffqq", label: "Análisis FFQQ" },
    { id: "micro", label: "Microbiología" },
    { id: "stcc", label: "STCC" },
    { id: "dt", label: "Dirección Técnica" },
    { id: "dg", label: "Dirección General" }
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-4 pb-12">
      
      {/* 1. PRIMARY HEADER */}
      <div className="bg-primary rounded-lg p-4 text-white flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 bg-orange-500 text-white px-3 py-1.5 rounded-md font-bold text-xs uppercase tracking-wider shadow-sm">
            <Flag className="w-3.5 h-3.5" /> Urgente
          </div>
          
          <div className="flex flex-col">
            <span className="text-[10px] text-primary-light uppercase tracking-wider font-bold mb-0.5">Correlativo</span>
            <span className="font-bold text-white text-sm tracking-wide">LEF-2024-00147</span>
          </div>

          <div className="w-[1px] h-8 bg-primary-dark hidden md:block"></div>

          <div className="flex flex-col">
            <span className="text-[10px] text-primary-light uppercase tracking-wider font-bold mb-0.5">Nº Recepción</span>
            <span className="font-bold text-white text-sm tracking-wide">{data.id}</span>
          </div>

          <div className="w-[1px] h-8 bg-primary-dark hidden md:block"></div>

          <div className="flex flex-col">
            <span className="text-[10px] text-primary-light uppercase tracking-wider font-bold mb-0.5">Estado Global</span>
            <span className="inline-flex items-center text-xs font-bold text-white bg-white/20 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mr-1.5"></span> En Análisis FFQQ
            </span>
          </div>

          <div className="w-[1px] h-8 bg-primary-dark hidden lg:block"></div>

          <div className="flex flex-col hidden lg:flex">
            <span className="text-[10px] text-primary-light uppercase tracking-wider font-bold mb-0.5">Etapa Actual</span>
            <span className="font-bold text-white text-sm">Análisis FFQQ</span>
          </div>

          <div className="w-[1px] h-8 bg-primary-dark hidden lg:block"></div>

          <div className="flex flex-col hidden lg:flex">
            <span className="text-[10px] text-primary-light uppercase tracking-wider font-bold mb-0.5">Responsable Actual</span>
            <span className="font-bold text-white text-sm flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-primary-light" /> Karla Suazo
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full xl:w-auto">
          <button className="bg-primary-dark hover:bg-primary-dark/80 text-white border border-primary-dark/50 px-3 py-2 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5">
            <Printer className="w-3.5 h-3.5" /> Imprimir
          </button>
          <button className="bg-primary-dark hover:bg-primary-dark/80 text-white border border-primary-dark/50 px-3 py-2 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> Exportar
          </button>
          <button className="bg-accent hover:bg-[#96ae49] text-primary-dark px-4 py-2 rounded-md text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5">
            Acciones <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. PRODUCT INFO HEADER */}
      <div className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
            <Beaker className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">AMOXICILINA 500mg Cápsulas</h2>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <span>500 mg</span> <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>Cápsulas de gelatina dura</span> <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>Lote: {data.producto.lote}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 xl:gap-8 flex-1">
          <div className="flex items-start gap-3">
            <Building className="w-4 h-4 text-slate-400 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-slate-800 leading-tight">SESAL — Secretaría de Salud</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Control de Calidad</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold leading-tight">Fecha Recepción</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">07/01/2024</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-success mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold leading-tight">Días en Proceso</p>
              <p className="text-sm font-bold text-success mt-0.5">11 días</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-slate-400 mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold leading-tight">Reg. Sanitario</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">RS-HN-0042-2019</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 border-t xl:border-t-0 xl:border-l border-slate-200 pt-4 xl:pt-0 xl:pl-6 w-full xl:w-auto">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
            <User className="w-3 h-3" /> Analistas Asignados
          </p>
          <div className="flex items-center gap-2">
            <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-bold border border-slate-200 shadow-sm">Karla Suazo</span>
            <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-bold border border-slate-200 shadow-sm">Jorge Matute</span>
          </div>
        </div>
      </div>

      {/* 3. TRANSVERSAL TIMELINE */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 overflow-x-auto hide-scrollbar">
        <h3 className="font-bold text-slate-800 text-sm mb-6 flex items-center gap-2">
           <Activity className="w-4 h-4 text-primary" /> Progreso del Proceso
        </h3>
        <div className="flex items-start relative px-4 w-full min-w-[1000px]">
          <div className="absolute left-8 right-8 top-4 h-1 bg-slate-100 -z-10 rounded-full"></div>
          <div className="absolute left-8 w-[48%] top-4 h-1 bg-success -z-10 rounded-full"></div>
          
          {[
             { step: "Recepción\nRAC", status: "completed" },
             { step: "Verificación\nPagos", status: "completed" },
             { step: "Distribución\nRT-159", status: "completed" },
             { step: "Expediente\nDOCT", status: "completed" },
             { step: "Asignación\nEstándar", status: "completed" },
             { step: "Preparación\nRT-38", status: "completed" },
             { step: "Revisión\nSTR", status: "completed" },
             { step: "Análisis\nFFQQ", status: "current" },
             { step: "Microbiología\n(Incubación)", status: "current" },
             { step: "Revisión\nSTCC", status: "pending" },
             { step: "Dirección\nTécnica", status: "pending" },
             { step: "Dirección\nGeneral", status: "pending" },
             { step: "Emisión\nal Cliente", status: "pending" },
          ].map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border-4 transition-colors z-10 ${
                item.status === 'completed' ? 'bg-success border-white text-white shadow-sm' : 
                item.status === 'current' ? 'bg-primary border-white text-white shadow-md ring-2 ring-primary/30' : 
                'bg-slate-100 border-white text-slate-300'
              }`}>
                {item.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : 
                 item.status === 'current' ? <div className="w-2.5 h-2.5 bg-white rounded-full"></div> : 
                 <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
              </div>
              <span className={`text-[10px] font-bold text-center leading-tight ${
                item.status === 'completed' ? 'text-success' : 
                item.status === 'current' ? 'text-primary' : 'text-slate-400'
              }`} dangerouslySetInnerHTML={{__html: item.step.replace('\n', '<br/>')}}></span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. MAIN WORKSPACE */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Left Column (Content) */}
        <div className="xl:col-span-3 space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden min-h-[600px]">
            <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-200 bg-slate-50/50">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3.5 text-sm font-bold whitespace-nowrap transition-colors ${
                    activeTab === tab.id 
                      ? "text-primary border-b-2 border-primary bg-white shadow-[0_2px_0_0_#025f85]" 
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-100 border-b-2 border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              
              {/* TAB: RESUMEN GENERAL */}
              {activeTab === "resumen" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-50/50 rounded-lg p-5 border border-slate-100 shadow-sm">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Datos del Producto</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2"><span className="text-xs text-slate-500">Nombre Comercial</span><span className="text-sm font-medium text-slate-900 text-right">AMOXICILINA 500mg Cápsulas</span></div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2"><span className="text-xs text-slate-500">Concentración</span><span className="text-sm font-medium text-slate-900 text-right">500 mg</span></div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2"><span className="text-xs text-slate-500">Forma Farmacéutica</span><span className="text-sm font-medium text-slate-900 text-right">Cápsulas</span></div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2"><span className="text-xs text-slate-500">Registro Sanitario</span><span className="text-sm font-medium text-slate-900 text-right">RS-HN-0042-2019</span></div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2"><span className="text-xs text-slate-500">Lote</span><span className="text-sm font-bold text-slate-900 text-right">{data.producto.lote}</span></div>
                        <div className="flex justify-between items-start gap-4"><span className="text-xs text-slate-500">Fabricación / Exp</span><span className="text-sm font-medium text-slate-900 text-right">01/2024 - 12/2026</span></div>
                      </div>
                    </div>
                    <div className="bg-slate-50/50 rounded-lg p-5 border border-slate-100 shadow-sm">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Fabricante / Titular</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2"><span className="text-xs text-slate-500">Fabricante</span><span className="text-sm font-medium text-slate-900 text-right">Lab. Vijosa S.A.</span></div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2"><span className="text-xs text-slate-500">Titular</span><span className="text-sm font-medium text-slate-900 text-right">Drog. Nacional S.A.</span></div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2"><span className="text-xs text-slate-500">Representante</span><span className="text-sm font-medium text-slate-900 text-right">Lic. Claudia Berrios</span></div>
                        <div className="flex justify-between items-start gap-4"><span className="text-xs text-slate-500">País de Origen</span><span className="text-sm font-medium text-slate-900 text-right">Honduras</span></div>
                      </div>
                    </div>
                    <div className="bg-slate-50/50 rounded-lg p-5 border border-slate-100 shadow-sm">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Datos de Recepción</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2"><span className="text-xs text-slate-500">Correlativo</span><span className="text-sm font-bold text-slate-900 text-right">LEF-2024-00147</span></div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2"><span className="text-xs text-slate-500">Tipo de Trámite</span><span className="text-sm font-medium text-slate-900 text-right">Control de Calidad</span></div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2"><span className="text-xs text-slate-500">Cliente</span><span className="text-sm font-medium text-slate-900 text-right">SESAL</span></div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2"><span className="text-xs text-slate-500">N° Orden</span><span className="text-sm font-medium text-slate-900 text-right">ORD-SESAL-2024</span></div>
                        <div className="flex justify-between items-start gap-4"><span className="text-xs text-slate-500">N° Licitación</span><span className="text-sm font-medium text-slate-900 text-right">LIC-SESAL-001</span></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 text-sm mb-4">Distribución de Cantidades</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="border border-slate-200 rounded-lg p-5 text-center flex flex-col justify-center shadow-sm">
                        <span className="text-xs font-bold text-slate-500 mb-2 uppercase">Total Recibida</span>
                        <span className="text-3xl font-black text-slate-900">240</span><span className="text-[10px] text-slate-400 mt-1">unidades</span>
                      </div>
                      <div className="border border-slate-200 rounded-lg p-5 text-center flex flex-col justify-center shadow-sm">
                        <span className="text-xs font-bold text-slate-500 mb-2 uppercase">Para FFQQ</span>
                        <span className="text-3xl font-black text-primary">120</span><span className="text-[10px] text-slate-400 mt-1">unidades</span>
                      </div>
                      <div className="border border-slate-200 rounded-lg p-5 text-center flex flex-col justify-center shadow-sm">
                        <span className="text-xs font-bold text-slate-500 mb-2 uppercase">Para Micro</span>
                        <span className="text-3xl font-black text-primary">60</span><span className="text-[10px] text-slate-400 mt-1">unidades</span>
                      </div>
                      <div className="border border-slate-200 rounded-lg p-5 text-center flex flex-col justify-center shadow-sm">
                        <span className="text-xs font-bold text-slate-500 mb-2 uppercase">Muestra Biblioteca</span>
                        <span className="text-3xl font-black text-purple-700">60</span><span className="text-[10px] text-slate-400 mt-1">unidades</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: RAC */}
              {activeTab === "rac" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm mb-4">Datos del Registro Maestro (RG-41)</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3"><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">N° Recepción</p><p className="text-sm font-bold text-slate-900">REC-2024-00147</p></div>
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3"><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Prioridad</p><p className="text-sm font-bold text-slate-900">URGENTE</p></div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-4">Cantidades por Destino</h3>
                        <table className="w-full text-sm text-left border border-slate-200 rounded-md overflow-hidden">
                          <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase font-bold">
                            <tr><th className="px-4 py-2">DESTINO</th><th className="px-4 py-2">CANTIDAD</th></tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            <tr><td className="px-4 py-2 text-slate-600">Total Recibida RAC</td><td className="px-4 py-2 font-bold text-slate-900">240</td></tr>
                            <tr><td className="px-4 py-2 text-slate-600">FFQQ (Análisis)</td><td className="px-4 py-2 font-bold text-slate-900">120</td></tr>
                            <tr><td className="px-4 py-2 text-slate-600">Microbiología</td><td className="px-4 py-2 font-bold text-slate-900">60</td></tr>
                            <tr><td className="px-4 py-2 text-slate-600">Muestra Biblioteca</td><td className="px-4 py-2 font-bold text-slate-900">60</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm mb-4">Verificación Documental Mínima</h3>
                        <div className="space-y-2">
                           {[
                             { label: "Orden de Compra / Solicitud", status: "ok" },
                             { label: "Acta de Toma de Muestra", status: "ok" },
                             { label: "Carta / Oficio de Remisión", status: "ok" },
                             { label: "Registro Sanitario Vigente", status: "ok" },
                             { label: "Metodología Analítica", status: "missing" },
                           ].map((item, i) => (
                             <div key={i} className={`flex items-center justify-between p-3 rounded-md border ${
                               item.status === 'ok' ? 'bg-green-50/50 border-green-200 text-green-800' : 'bg-red-50/50 border-red-200 text-red-800'
                             }`}>
                               <div className="flex items-center gap-3">
                                 {item.status === 'ok' ? <CheckCircle2 className="w-4 h-4 text-success" /> : <XCircle className="w-4 h-4 text-danger" />}
                                 <span className="text-sm font-medium">{item.label}</span>
                               </div>
                               {item.status === 'missing' && <span className="text-[10px] text-danger hover:underline cursor-pointer font-bold">Adjuntar</span>}
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: DOCUMENTACIÓN */}
              {activeTab === "documentacion" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="border border-slate-200 rounded-lg overflow-hidden flex flex-col md:flex-row">
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-800 text-sm">RT-30 — Solicitud de Estándar/Metodología</h3>
                        <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full border border-orange-200 flex items-center gap-1.5">
                          <Clock className="w-3 h-3" /> Pendiente Respuesta
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-xs mb-3">Ítems Solicitados</h4>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2 text-slate-600"><CheckCircle2 className="w-4 h-4 text-success" /> Estándar: Amoxicilina USP RS</p>
                        <p className="flex items-center gap-2 text-slate-800 font-bold"><AlertCircle className="w-4 h-4 text-orange-500" /> Metodología analítica actualizada (HPLC)</p>
                      </div>
                    </div>
                    <div className="w-full md:w-80 bg-slate-50 border-l border-slate-200 p-6 flex flex-col justify-center">
                      <h4 className="font-bold text-slate-800 text-xs mb-4 text-center">Contador de Plazo (60 días)</h4>
                      <div className="bg-white border border-orange-200 rounded-lg p-5 text-center mb-4 shadow-sm">
                        <p className="text-4xl font-black text-orange-600 mb-1">7</p>
                        <p className="text-xs text-slate-500 mb-4">días transcurridos</p>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 mb-2 overflow-hidden"><div className="bg-success h-2.5 rounded-full w-[12%]"></div></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: FORMATOS (NUEVO) */}
              {activeTab === "formatos" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                       <Files className="w-4 h-4 text-primary" /> Centro Documental de Formatos Generados
                    </h3>
                    <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-xs font-bold shadow-sm flex items-center gap-2">
                      <Download className="w-3.5 h-3.5" /> Descargar Paquete Documental
                    </button>
                  </div>
                  <table className="w-full text-sm text-left border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase font-bold">
                      <tr>
                        <th className="px-4 py-3">Código</th>
                        <th className="px-4 py-3">Nombre del Formato</th>
                        <th className="px-4 py-3">Etapa</th>
                        <th className="px-4 py-3">Responsable</th>
                        <th className="px-4 py-3">Estado</th>
                        <th className="px-4 py-3 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {[
                        { code: "RG-41", name: "Registro Maestro de Ingreso", etapa: "RAC", resp: "María Rodríguez", state: "Completado", color: "success" },
                        { code: "RT-159", name: "Acta de Distribución de Muestras", etapa: "RAC", resp: "María Rodríguez", state: "Completado", color: "success" },
                        { code: "RT-75", name: "Solicitud de Expediente Base", etapa: "DOCT", resp: "Ana Patricia Flores", state: "Completado", color: "success" },
                        { code: "RT-41", name: "Contraste Histórico de Calidad", etapa: "DOCT", resp: "Ana Patricia Flores", state: "Completado", color: "success" },
                        { code: "RT-30", name: "Solicitud de Estándar / Metodología", etapa: "STR", resp: "Roberto Paz", state: "Pendiente", color: "orange" },
                        { code: "RT-38", name: "Paquete Analítico Físico-Químico", etapa: "STR / FFQQ", resp: "Roberto Paz", state: "En Ejecución", color: "blue" },
                        { code: "RG-44", name: "Inventario de Estándar", etapa: "Estándares", resp: "-", state: "No Generado", color: "slate" },
                      ].map((doc, i) => (
                        <tr key={i} className="hover:bg-slate-50 h-[64px] group">
                          <td className="px-4 py-2">
                             <span className="font-bold text-xs bg-slate-100 border border-slate-200 text-slate-700 px-2 py-1 rounded">{doc.code}</span>
                          </td>
                          <td className="px-4 py-2 font-medium text-slate-800">{doc.name}</td>
                          <td className="px-4 py-2 text-slate-600 text-xs">{doc.etapa}</td>
                          <td className="px-4 py-2 text-slate-600 text-xs">{doc.resp}</td>
                          <td className="px-4 py-2">
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                               doc.color === 'success' ? 'bg-green-100 text-success' :
                               doc.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                               doc.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                               'bg-slate-100 text-slate-500'
                             }`}>
                               {doc.state}
                             </span>
                          </td>
                          <td className="px-4 py-2 text-right">
                             <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-blue-50 rounded"><Eye className="w-4 h-4" /></button>
                                <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-blue-50 rounded"><Download className="w-4 h-4" /></button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB: ESTÁNDAR */}
              {activeTab === "estandar" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 text-sm">Gestión de Estándar de Referencia (RG-44)</h3>
                    <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-xs font-bold shadow-sm">Asignar Estándar del Inventario</button>
                  </div>
                  <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
                     <p className="text-sm text-slate-600">No hay estándar de referencia primario vinculado a este análisis actualmente.</p>
                     <p className="text-xs text-slate-400 mt-2">La prueba de Valoración (HPLC) requerirá el registro del estándar antes de ejecutarse.</p>
                  </div>
                </div>
              )}

              {/* TAB: ANÁLISIS FFQQ */}
              {activeTab === "ffqq" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2"><FlaskConical className="w-4 h-4 text-primary"/> Ejecución Analítica Físico-Química</h3>
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded border border-blue-200">RT-38 Activo</span>
                  </div>
                  <table className="w-full text-sm text-left border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase font-bold">
                      <tr><th className="px-4 py-3">Ensayo / Técnica</th><th className="px-4 py-3">Analista</th><th className="px-4 py-3">Estado</th><th className="px-4 py-3 text-right">Acción</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {data.ensayosAsignados.map((e, i) => (
                        <tr key={i} className="hover:bg-slate-50 h-[64px]">
                          <td className="px-4 py-2"><p className="font-bold text-slate-800">{e.ensayo}</p><p className="text-[10px] text-slate-500">{e.tecnica}</p></td>
                          <td className="px-4 py-2 text-slate-700">{e.analista}</td>
                          <td className="px-4 py-2">
                             {e.estado === "Completado" ? <span className="bg-green-100 text-success font-bold px-2 py-0.5 rounded text-[10px]">Completado</span> : <span className="bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded text-[10px]">{e.estado}</span>}
                          </td>
                          <td className="px-4 py-2 text-right"><button className="text-primary hover:underline text-xs font-bold">Ver Detalles</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB: MICROBIOLOGÍA */}
              {activeTab === "micro" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2"><Microscope className="w-4 h-4 text-primary"/> Ejecución Microbiológica</h3>
                  </div>
                  <table className="w-full text-sm text-left border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase font-bold">
                      <tr><th className="px-4 py-3">Ensayo Microbiano</th><th className="px-4 py-3">Estado de Incubación</th><th className="px-4 py-3 text-right">Acción</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {data.ensayosMicro.map((e, i) => (
                        <tr key={i} className="hover:bg-slate-50 h-[64px]">
                          <td className="px-4 py-2 font-bold text-slate-800">{e.ensayo}</td>
                          <td className="px-4 py-2"><span className="text-primary font-bold flex items-center gap-1.5 text-xs"><Clock className="w-3.5 h-3.5"/> {e.estado}</span></td>
                          <td className="px-4 py-2 text-right"><button className="text-primary hover:underline text-xs font-bold">Registrar Lectura</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB: STCC / DT / DG */}
              {["stcc", "dt", "dg"].includes(activeTab) && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="border border-slate-200 rounded-lg p-10 bg-slate-50 flex flex-col items-center text-center justify-center min-h-[400px]">
                     <ShieldAlert className="w-12 h-12 text-slate-300 mb-4" />
                     <p className="text-sm font-bold text-slate-700">Etapa Bloqueada</p>
                     <p className="text-xs text-slate-500 mt-2 max-w-md">Esta etapa no está disponible hasta que los análisis de FFQQ y Microbiología concluyan y emitan sus resultados validados.</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Right Column (Sidebar: Timeline, Observaciones, Comparador) */}
        <div className="xl:col-span-1 space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full max-h-[850px]">
            
            {/* Side Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50/50">
              <button onClick={() => setSideTab("timeline")} className={`flex-1 py-3 text-[11px] font-bold text-center border-b-2 transition-colors ${sideTab === "timeline" ? "border-primary text-primary bg-white shadow-[0_2px_0_0_#025f85]" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100"}`}>Timeline</button>
              <button onClick={() => setSideTab("observaciones")} className={`flex-1 py-3 text-[11px] font-bold text-center border-b-2 transition-colors ${sideTab === "observaciones" ? "border-primary text-primary bg-white shadow-[0_2px_0_0_#025f85]" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100"}`}>Observaciones</button>
              <button onClick={() => setSideTab("comparador")} className={`flex-1 py-3 text-[11px] font-bold text-center border-b-2 transition-colors ${sideTab === "comparador" ? "border-primary text-primary bg-white shadow-[0_2px_0_0_#025f85]" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100"}`}>Comparador</button>
            </div>

            {/* Side Content */}
            <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
              
              {/* ENRICHED TIMELINE */}
              {sideTab === "timeline" && (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                  <div className="flex gap-2 mb-4">
                    <button className="flex-1 bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 rounded text-xs py-1.5 flex justify-center items-center gap-1 shadow-sm"><Filter className="w-3 h-3"/> Filtros</button>
                  </div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">12 eventos registrados</p>
                  
                  <div className="space-y-6 relative before:absolute before:left-[5px] before:top-2 before:bottom-0 before:w-[2px] before:bg-slate-200">
                    
                    {[
                      { area: "RAC", time: "07/01/2024 08:14", title: "Ingreso creado en borrador", user: "María Rodríguez", color: "purple" },
                      { area: "RAC", time: "07/01/2024 09:47", title: "Documentación mínima verificada", user: "María Rodríguez", color: "green", meta: "Oficio y Actas adjuntas" },
                      { area: "RAC", time: "07/01/2024 10:05", title: "Registrado en RG-41", user: "María Rodríguez", color: "blue", meta: "Correlativo LEF-2024-00147 asignado" },
                      { area: "RAC", time: "07/01/2024 10:22", title: "RG-13 y RG-72 generados", user: "María Rodríguez", color: "blue" },
                      { area: "FINANZAS", time: "08/01/2024 14:30", title: "Proforma Pagada / Exonerada", user: "Lic. Roberto Suazo", color: "green", meta: "Trámite institucional (SESAL)" },
                      { area: "RAC", time: "08/01/2024 16:10", title: "Emisión de RT-159", user: "María Rodríguez", color: "blue" },
                      { area: "DOCT", time: "09/01/2024 08:05", title: "Recibido en Documentación", user: "Ana Patricia Flores", color: "purple" },
                      { area: "DOCT", time: "09/01/2024 11:30", title: "Solicitud RT-75 generada", user: "Ana Patricia Flores", color: "orange" },
                      { area: "DOCT", time: "10/01/2024 09:15", title: "Contraste Histórico RT-41 finalizado", user: "Ana Patricia Flores", color: "green", meta: "3 recepciones previas encontradas" },
                      { area: "STR", time: "11/01/2024 14:20", title: "Emisión de RT-30 (Solicitud Estándar)", user: "Roberto Paz", color: "orange", meta: "Pendiente respuesta de cliente" },
                      { area: "STR", time: "16/01/2024 10:00", title: "Configuración RT-38 iniciada", user: "Roberto Paz", color: "purple" },
                      { area: "FFQQ", time: "17/01/2024 08:30", title: "Recepción de Muestras FFQQ", user: "Karla Suazo", color: "blue", meta: "120 unidades conformes" }
                    ].map((ev, i) => (
                      <div key={i} className="relative pl-5">
                        <div className={`absolute left-0 top-1 w-3 h-3 rounded-full border-2 border-white shadow-sm ${
                          ev.color === 'purple' ? 'bg-purple-500' :
                          ev.color === 'green' ? 'bg-green-500' :
                          ev.color === 'blue' ? 'bg-blue-500' :
                          ev.color === 'orange' ? 'bg-orange-500' : 'bg-slate-500'
                        }`}></div>
                        <div className="flex justify-between items-start mb-0.5">
                          <span className={`text-[10px] font-bold ${
                            ev.color === 'purple' ? 'text-purple-600' :
                            ev.color === 'green' ? 'text-green-600' :
                            ev.color === 'blue' ? 'text-blue-600' :
                            ev.color === 'orange' ? 'text-orange-600' : 'text-slate-600'
                          }`}>{ev.area}</span>
                          <span className="text-[10px] text-slate-400">{ev.time}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-800">{ev.title}</p>
                        <p className="text-[10px] text-slate-500 mb-1">{ev.user}</p>
                        {ev.meta && (
                          <div className="bg-slate-50 border border-slate-200 rounded p-2 text-[10px] text-slate-600 font-medium">
                            {ev.meta}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* OBSERVACIONES */}
              {sideTab === "observaciones" && (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                   <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                     <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Notas y Observaciones</p>
                     <button className="text-primary text-[10px] font-bold hover:underline">+ Agregar</button>
                   </div>
                   
                   <div className="space-y-4">
                     {/* Nota 1 */}
                     <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg relative">
                        <MessageSquare className="w-3 h-3 text-blue-400 absolute top-3 right-3" />
                        <div className="flex items-center gap-2 mb-1">
                           <span className="text-[10px] font-bold text-blue-800 bg-blue-200/50 px-1.5 rounded">RAC</span>
                           <span className="text-[9px] text-blue-600">07/01/24 - M. Rodríguez</span>
                        </div>
                        <p className="text-xs text-blue-900 mt-2">Muestra recibida en buen estado. Embalaje original intacto sin signos de manipulación previa.</p>
                     </div>

                     {/* Nota 2 */}
                     <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg relative">
                        <AlertCircle className="w-3 h-3 text-orange-400 absolute top-3 right-3" />
                        <div className="flex items-center gap-2 mb-1">
                           <span className="text-[10px] font-bold text-orange-800 bg-orange-200/50 px-1.5 rounded">STR</span>
                           <span className="text-[9px] text-orange-600">11/01/24 - R. Paz</span>
                        </div>
                        <p className="text-xs text-orange-900 mt-2">Falta Metodología Analítica del fabricante. Se emitió RT-30 al cliente solicitándola con urgencia. El plazo corre a partir de hoy.</p>
                     </div>

                     {/* Nota 3 */}
                     <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg relative">
                        <MessageSquare className="w-3 h-3 text-slate-400 absolute top-3 right-3" />
                        <div className="flex items-center gap-2 mb-1">
                           <span className="text-[10px] font-bold text-slate-700 bg-slate-200 px-1.5 rounded">FFQQ</span>
                           <span className="text-[9px] text-slate-500">17/01/24 - K. Suazo</span>
                        </div>
                        <p className="text-xs text-slate-700 mt-2">Reactivos principales para HPLC preparados. A la espera del Estándar de Referencia USP para iniciar la prueba de Valoración.</p>
                     </div>
                   </div>
                </div>
              )}

              {/* COMPARADOR HISTÓRICO */}
              {sideTab === "comparador" && (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                   <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                     <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Comparador Histórico</p>
                     <GitCompare className="w-3.5 h-3.5 text-slate-400" />
                   </div>
                   
                   <p className="text-xs text-slate-600 mb-4">Comparación rápida del lote actual contra el antecedente más reciente registrado.</p>

                   <div className="flex flex-col gap-3">
                      {/* Cabeceras */}
                      <div className="grid grid-cols-2 gap-2 text-center">
                         <div className="bg-primary text-white text-[10px] font-bold py-1.5 rounded uppercase">Lote Actual</div>
                         <div className="bg-slate-200 text-slate-700 text-[10px] font-bold py-1.5 rounded uppercase">Lote Anterior</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                         <div className="bg-blue-50/50 border border-blue-100 rounded p-2 text-center">
                            <span className="block text-sm font-black text-slate-900">AM2401X</span>
                         </div>
                         <div className="bg-slate-50 border border-slate-200 rounded p-2 text-center">
                            <span className="block text-sm font-bold text-slate-600">AM2309A</span>
                         </div>
                      </div>

                      {/* Filas comparativas */}
                      <div className="space-y-3 mt-2">
                         <div className="border-b border-slate-100 pb-2">
                            <p className="text-[9px] text-slate-400 uppercase font-bold mb-1 text-center">Tipo de Trámite</p>
                            <div className="grid grid-cols-2 gap-2 text-center">
                               <span className="text-xs font-medium text-slate-800">Control Calidad</span>
                               <span className="text-xs text-slate-500">Control Calidad</span>
                            </div>
                         </div>
                         <div className="border-b border-slate-100 pb-2">
                            <p className="text-[9px] text-slate-400 uppercase font-bold mb-1 text-center">Fabricante</p>
                            <div className="grid grid-cols-2 gap-2 text-center">
                               <span className="text-xs font-medium text-slate-800">Lab. Vijosa</span>
                               <span className="text-xs text-slate-500">Lab. Vijosa</span>
                            </div>
                         </div>
                         <div className="border-b border-slate-100 pb-2">
                            <p className="text-[9px] text-slate-400 uppercase font-bold mb-1 text-center">Resultado Final</p>
                            <div className="grid grid-cols-2 gap-2 text-center">
                               <span className="text-[10px] font-bold text-blue-600 bg-blue-100 rounded px-1">En Proceso</span>
                               <span className="text-[10px] font-bold text-success bg-green-100 rounded px-1">Conforme</span>
                            </div>
                         </div>
                         <div className="border-b border-slate-100 pb-2">
                            <p className="text-[9px] text-slate-400 uppercase font-bold mb-1 text-center">Observaciones Previas</p>
                            <div className="grid grid-cols-2 gap-2 text-center">
                               <span className="text-xs text-slate-400">-</span>
                               <span className="text-[10px] text-slate-500 italic">"Disolución cerca del límite"</span>
                            </div>
                         </div>
                      </div>

                      <button className="w-full mt-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 rounded transition-colors border border-slate-200">
                         Abrir RT-41 Completo
                      </button>
                   </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
