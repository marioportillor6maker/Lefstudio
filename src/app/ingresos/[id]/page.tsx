"use client";

import { useState } from "react";
import { mockIngreso360 } from "@/lib/mockData";
import { 
  AlertCircle, CheckCircle2, Clock, FileText, Beaker, 
  History, Download, Activity, FileCheck, ShieldAlert, Files,
  User, Check, XCircle, ChevronDown, Flag, FileDigit, Calendar, ShieldCheck,
  Building, MapPin, Printer, MoreHorizontal, Filter
} from "lucide-react";

export default function Ingreso360Page({ params }: { params: { id: string } }) {
  const data = mockIngreso360; 
  const [activeTab, setActiveTab] = useState("resumen");
  const [sideTab, setSideTab] = useState("timeline");

  const tabs = [
    { id: "resumen", label: "Resumen General" },
    { id: "rac", label: "RAC / Recepción" },
    { id: "documentacion", label: "Documentación" },
    { id: "estandar", label: "Estándar" },
    { id: "ffqq", label: "Análisis FFQQ" },
    { id: "micro", label: "Microbiología" },
    { id: "stcc", label: "STCC / DT / DG" }
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-4 pb-12">
      
      {/* 1. DARK HEADER (Rocket Style) */}
      <div className="bg-slate-900 rounded-lg p-4 text-white flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 shadow-sm border border-slate-800">
        <div className="flex flex-wrap items-center gap-6">
          {/* Urgente Badge */}
          <div className="flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1.5 rounded-md font-bold text-xs uppercase tracking-wider">
            <Flag className="w-3.5 h-3.5" /> Urgente
          </div>
          
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium mb-0.5">Correlativo</span>
            <span className="font-bold text-primary-light text-sm tracking-wide">LEF-2024-00147</span>
          </div>

          <div className="w-[1px] h-8 bg-slate-700 hidden md:block"></div>

          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium mb-0.5">Nº Recepción</span>
            <span className="font-bold text-white text-sm tracking-wide">{data.id}</span>
          </div>

          <div className="w-[1px] h-8 bg-slate-700 hidden md:block"></div>

          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium mb-0.5">Estado Global</span>
            <span className="inline-flex items-center text-xs font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded border border-blue-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5"></span> En Análisis FFQQ
            </span>
          </div>

          <div className="w-[1px] h-8 bg-slate-700 hidden lg:block"></div>

          <div className="flex flex-col hidden lg:flex">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium mb-0.5">Etapa Actual</span>
            <span className="font-bold text-white text-sm">Análisis FFQQ</span>
          </div>

          <div className="w-[1px] h-8 bg-slate-700 hidden lg:block"></div>

          <div className="flex flex-col hidden lg:flex">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium mb-0.5">Responsable Actual</span>
            <span className="font-bold text-white text-sm flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" /> Karla Suazo
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full xl:w-auto">
          <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5">
            <Printer className="w-3.5 h-3.5" /> Imprimir
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> Exportar
          </button>
          <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5">
            Acciones <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. PRODUCT INFO HEADER (Light Background) */}
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
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium leading-tight">Fecha de Recepción</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">07/01/2024</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-success mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium leading-tight">Días en Proceso</p>
              <p className="text-sm font-bold text-success mt-0.5">11 días</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-slate-400 mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium leading-tight">Registro Sanitario</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">RS-HN-0042-2019</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 border-t xl:border-t-0 xl:border-l border-slate-200 pt-4 xl:pt-0 xl:pl-6 w-full xl:w-auto">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium flex items-center gap-1.5">
            <User className="w-3 h-3" /> Analistas Asignados
          </p>
          <div className="flex items-center gap-2">
            <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-medium border border-slate-200">Karla Suazo</span>
            <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-medium border border-slate-200">Jorge Matute</span>
          </div>
        </div>

      </div>

      {/* 3. MAIN WORKSPACE */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Left Column (Content) */}
        <div className="xl:col-span-3 space-y-4">
          
          {/* Main Tabs */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3.5 text-sm font-bold whitespace-nowrap transition-colors ${
                    activeTab === tab.id 
                      ? "text-primary border-b-2 border-primary bg-white" 
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-b-2 border-transparent"
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
                  
                  {/* Timeline Stepper */}
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm mb-5">Progreso del Proceso</h3>
                    <div className="flex items-center justify-between relative px-2">
                      <div className="absolute left-6 right-6 top-5 h-1 bg-slate-100 -z-10"></div>
                      <div className="absolute left-6 right-[45%] top-5 h-1 bg-success -z-10"></div>
                      
                      {[
                         { step: "Recepción RAC", status: "completed" },
                         { step: "Verificación de Pago", status: "completed" },
                         { step: "Distribución RT-159", status: "completed" },
                         { step: "Documentación DOCT", status: "completed" },
                         { step: "Estándar de Referencia", status: "completed" },
                         { step: "Preparación RT-38", status: "completed" },
                         { step: "Revisión STR", status: "completed" },
                         { step: "Análisis FFQQ", status: "current" },
                         { step: "Microbiología", status: "current" },
                         { step: "Revisión STCC", status: "pending" },
                         { step: "Dirección Técnica", status: "pending" },
                         { step: "Dirección General", status: "pending" },
                         { step: "Emisión al Cliente", status: "pending" },
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 w-20">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-colors ${
                            item.status === 'completed' ? 'bg-success border-white text-white shadow-sm' : 
                            item.status === 'current' ? 'bg-primary border-white text-white shadow-md ring-2 ring-primary/30' : 
                            'bg-slate-100 border-white text-slate-300'
                          }`}>
                            {item.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : 
                             item.status === 'current' ? <div className="w-2.5 h-2.5 bg-white rounded-full"></div> : 
                             <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                          </div>
                          <span className={`text-[9px] font-bold text-center leading-tight ${
                            item.status === 'completed' ? 'text-success' : 
                            item.status === 'current' ? 'text-primary' : 'text-slate-400'
                          }`}>{item.step.replace(' ', '\n')}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3 Column Data Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Datos del Producto */}
                    <div className="bg-slate-50/50 rounded-lg p-5 border border-slate-100">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Datos del Producto</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2">
                          <span className="text-xs text-slate-500">Nombre Comercial</span>
                          <span className="text-sm font-medium text-slate-900 text-right">AMOXICILINA 500mg Cápsulas</span>
                        </div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2">
                          <span className="text-xs text-slate-500">Concentración</span>
                          <span className="text-sm font-medium text-slate-900 text-right">500 mg</span>
                        </div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2">
                          <span className="text-xs text-slate-500">Forma Farmacéutica</span>
                          <span className="text-sm font-medium text-slate-900 text-right">Cápsulas de gelatina dura</span>
                        </div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2">
                          <span className="text-xs text-slate-500">Registro Sanitario</span>
                          <span className="text-sm font-medium text-slate-900 text-right">RS-HN-0042-2019</span>
                        </div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2">
                          <span className="text-xs text-slate-500">Lote</span>
                          <span className="text-sm font-bold text-slate-900 text-right">{data.producto.lote}</span>
                        </div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2">
                          <span className="text-xs text-slate-500">Fabricación</span>
                          <span className="text-sm font-medium text-slate-900 text-right">01/2024</span>
                        </div>
                        <div className="flex justify-between items-start gap-4">
                          <span className="text-xs text-slate-500">Expiración</span>
                          <span className="text-sm font-medium text-slate-900 text-right">12/2026</span>
                        </div>
                      </div>
                    </div>

                    {/* Fabricante / Titular */}
                    <div className="bg-slate-50/50 rounded-lg p-5 border border-slate-100">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Fabricante / Titular</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2">
                          <span className="text-xs text-slate-500">Fabricante</span>
                          <span className="text-sm font-medium text-slate-900 text-right">Laboratorios Vijosa S.A.</span>
                        </div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2">
                          <span className="text-xs text-slate-500">Titular</span>
                          <span className="text-sm font-medium text-slate-900 text-right">Droguería Nacional de Honduras S.A.</span>
                        </div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2">
                          <span className="text-xs text-slate-500">Droguería</span>
                          <span className="text-sm font-medium text-slate-900 text-right">Droguería Nacional de Honduras S.A.</span>
                        </div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2">
                          <span className="text-xs text-slate-500">Representante</span>
                          <span className="text-sm font-medium text-slate-900 text-right">Lic. Claudia Berrios Ochoa</span>
                        </div>
                        <div className="flex justify-between items-start gap-4">
                          <span className="text-xs text-slate-500">País de Origen</span>
                          <span className="text-sm font-medium text-slate-900 text-right">Honduras</span>
                        </div>
                      </div>
                    </div>

                    {/* Datos de Recepción */}
                    <div className="bg-slate-50/50 rounded-lg p-5 border border-slate-100">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Datos de Recepción</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2">
                          <span className="text-xs text-slate-500">N° Recepción</span>
                          <span className="text-sm font-bold text-slate-900 text-right">REC-2024-00147</span>
                        </div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2">
                          <span className="text-xs text-slate-500">Correlativo</span>
                          <span className="text-sm font-bold text-slate-900 text-right">LEF-2024-00147</span>
                        </div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2">
                          <span className="text-xs text-slate-500">Tipo de Trámite</span>
                          <span className="text-sm font-medium text-slate-900 text-right">Control de Calidad</span>
                        </div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2">
                          <span className="text-xs text-slate-500">Fecha Recepción</span>
                          <span className="text-sm font-medium text-slate-900 text-right">07/01/2024</span>
                        </div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2">
                          <span className="text-xs text-slate-500">Entrada Lab.</span>
                          <span className="text-sm font-medium text-slate-900 text-right">07/01/2024</span>
                        </div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2">
                          <span className="text-xs text-slate-500">Cliente</span>
                          <span className="text-sm font-medium text-slate-900 text-right">SESAL</span>
                        </div>
                        <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-2">
                          <span className="text-xs text-slate-500">N° Orden</span>
                          <span className="text-sm font-medium text-slate-900 text-right">ORD-SESAL-2024-0015</span>
                        </div>
                        <div className="flex justify-between items-start gap-4">
                          <span className="text-xs text-slate-500">N° Licitación</span>
                          <span className="text-sm font-medium text-slate-900 text-right">LIC-SESAL-2024-001</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Distribución de Cantidades */}
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm mb-4">Distribución de Cantidades</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="border border-slate-200 rounded-lg p-5 text-center flex flex-col justify-center shadow-sm">
                        <span className="text-xs font-medium text-slate-500 mb-2">Total Recibida</span>
                        <span className="text-3xl font-black text-slate-900">240</span>
                        <span className="text-[10px] text-slate-400 mt-1">unidades</span>
                      </div>
                      <div className="border border-slate-200 rounded-lg p-5 text-center flex flex-col justify-center shadow-sm">
                        <span className="text-xs font-medium text-slate-500 mb-2">Para FFQQ</span>
                        <span className="text-3xl font-black text-primary">120</span>
                        <span className="text-[10px] text-slate-400 mt-1">unidades</span>
                      </div>
                      <div className="border border-slate-200 rounded-lg p-5 text-center flex flex-col justify-center shadow-sm">
                        <span className="text-xs font-medium text-slate-500 mb-2">Para Micro</span>
                        <span className="text-3xl font-black text-primary">60</span>
                        <span className="text-[10px] text-slate-400 mt-1">unidades</span>
                      </div>
                      <div className="border border-slate-200 rounded-lg p-5 text-center flex flex-col justify-center shadow-sm">
                        <span className="text-xs font-medium text-slate-500 mb-2">Muestra Biblioteca</span>
                        <span className="text-3xl font-black text-purple-700">60</span>
                        <span className="text-[10px] text-slate-400 mt-1">unidades</span>
                      </div>
                    </div>
                  </div>

                  {/* Observaciones de Recepción */}
                  <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-blue-900">Observaciones de Recepción</h4>
                      <p className="text-sm text-blue-800 mt-1">Muestra recibida en buen estado. Embalaje original intacto. Acta de toma de muestra SESAL adjunta.</p>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB: RAC / RECEPCIÓN */}
              {activeTab === "rac" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Columna Izquierda: Datos RAC */}
                    <div className="space-y-6">
                      
                      {/* Datos del Registro Maestro */}
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm mb-4">Datos del Registro Maestro (RG-41)</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                             <p className="text-[10px] text-slate-500 font-medium mb-1">N° Recepción</p>
                             <p className="text-sm font-bold text-slate-900">REC-2024-00147</p>
                          </div>
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                             <p className="text-[10px] text-slate-500 font-medium mb-1">Correlativo</p>
                             <p className="text-sm font-bold text-slate-900">LEF-2024-00147</p>
                          </div>
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                             <p className="text-[10px] text-slate-500 font-medium mb-1">Mes de Recepción</p>
                             <p className="text-sm font-bold text-slate-900">Enero 2024</p>
                          </div>
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                             <p className="text-[10px] text-slate-500 font-medium mb-1">Fecha de Recepción</p>
                             <p className="text-sm font-bold text-slate-900">07/01/2024</p>
                          </div>
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                             <p className="text-[10px] text-slate-500 font-medium mb-1">Tipo de Trámite</p>
                             <p className="text-sm font-bold text-slate-900">Control de Calidad</p>
                          </div>
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                             <p className="text-[10px] text-slate-500 font-medium mb-1">Prioridad</p>
                             <p className="text-sm font-bold text-slate-900">URGENTE</p>
                          </div>
                        </div>
                      </div>

                      {/* Referencias Documentales */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-4">Referencias Documentales</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                             <p className="text-[10px] text-slate-500 font-medium mb-1">N° Orden</p>
                             <p className="text-sm font-bold text-slate-900">ORD-SESAL-2024-0015</p>
                          </div>
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                             <p className="text-[10px] text-slate-500 font-medium mb-1">N° Expediente</p>
                             <p className="text-sm font-bold text-slate-900">EXP-0042-2019</p>
                          </div>
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                             <p className="text-[10px] text-slate-500 font-medium mb-1">N° Licitación</p>
                             <p className="text-sm font-bold text-slate-900">LIC-SESAL-2024-001</p>
                          </div>
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                             <p className="text-[10px] text-slate-500 font-medium mb-1">N° Carta / Oficio</p>
                             <p className="text-sm font-bold text-slate-900">SESAL-DAIF-2024-0047</p>
                          </div>
                        </div>
                      </div>

                      {/* Cantidades por Destino */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-4">Cantidades por Destino</h3>
                        <table className="w-full text-sm text-left border border-slate-200 rounded-md overflow-hidden">
                          <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500">
                            <tr>
                              <th className="px-4 py-2 font-medium">DESTINO</th>
                              <th className="px-4 py-2 font-medium">CANTIDAD</th>
                              <th className="px-4 py-2 font-medium">UNIDAD</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            <tr><td className="px-4 py-2 text-slate-600">Total Recibida RAC</td><td className="px-4 py-2 font-bold text-slate-900">240</td><td className="px-4 py-2 text-slate-500">unidades</td></tr>
                            <tr><td className="px-4 py-2 text-slate-600">FFQQ (Análisis)</td><td className="px-4 py-2 font-bold text-slate-900">120</td><td className="px-4 py-2 text-slate-500">unidades</td></tr>
                            <tr><td className="px-4 py-2 text-slate-600">Microbiología</td><td className="px-4 py-2 font-bold text-slate-900">60</td><td className="px-4 py-2 text-slate-500">unidades</td></tr>
                            <tr><td className="px-4 py-2 text-slate-600">Muestra Biblioteca</td><td className="px-4 py-2 font-bold text-slate-900">60</td><td className="px-4 py-2 text-slate-500">unidades</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Columna Derecha: Verificaciones RAC */}
                    <div className="space-y-6">
                      
                      {/* Verificación Documental Mínima */}
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm mb-4">Verificación Documental Mínima</h3>
                        <div className="space-y-2">
                           {[
                             { label: "Orden de Compra / Solicitud", req: true, status: "ok" },
                             { label: "Acta de Toma de Muestra", req: true, status: "ok" },
                             { label: "Carta / Oficio de Remisión", req: true, status: "ok" },
                             { label: "Registro Sanitario Vigente", req: true, status: "ok" },
                             { label: "Certificado de Análisis del Fabricante", req: false, status: "ok" },
                             { label: "Metodología Analítica", req: false, status: "missing" },
                             { label: "Especificaciones del Producto", req: false, status: "ok" },
                           ].map((item, i) => (
                             <div key={i} className={`flex items-center justify-between p-3 rounded-md border ${
                               item.status === 'ok' ? 'bg-green-50/50 border-green-200 text-green-800' : 'bg-red-50/50 border-red-200 text-red-800'
                             }`}>
                               <div className="flex items-center gap-3">
                                 {item.status === 'ok' ? <CheckCircle2 className="w-4 h-4 text-success" /> : <XCircle className="w-4 h-4 text-danger" />}
                                 <span className="text-sm font-medium">{item.label}</span>
                               </div>
                               <div className="flex items-center gap-2">
                                 {item.req && <span className="text-[9px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Requerido</span>}
                                 {item.status === 'missing' && <span className="text-[10px] text-danger hover:underline cursor-pointer font-bold flex items-center gap-1">Adjuntar</span>}
                               </div>
                             </div>
                           ))}
                        </div>
                      </div>

                      {/* Estado RT-159 Distribución */}
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                        <h3 className="font-bold text-slate-500 text-xs uppercase tracking-wider mb-4">Estado RT-159 — Distribución</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-success font-medium flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5"/> RAC — Emisión</span>
                            <div className="text-right">
                              <span className="text-slate-500 mr-3">08/01/2024</span>
                              <span className="text-slate-700 font-medium">María Rodríguez</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-success font-medium flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5"/> DOCT — Recibido</span>
                            <div className="text-right">
                              <span className="text-slate-500 mr-3">09/01/2024</span>
                              <span className="text-slate-700 font-medium">Ana Patricia Flores</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-success font-medium flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5"/> Micro — Recibido</span>
                            <div className="text-right">
                              <span className="text-slate-500 mr-3">09/01/2024</span>
                              <span className="text-slate-700 font-medium">Q.F. Teresa Montoya</span>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* TAB: DOCUMENTACIÓN */}
              {activeTab === "documentacion" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  
                  {/* RT-75 */}
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800 text-sm">RT-75 — Solicitud de Expediente</h3>
                      <span className="text-xs font-bold text-success bg-green-100 px-2 py-0.5 rounded-full border border-green-200 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-success"></div> Respondido
                      </span>
                    </div>
                    <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                         <p className="text-[10px] text-slate-500 font-medium mb-1">Solicitante</p>
                         <p className="text-sm font-medium text-slate-900">Ana Patricia Flores</p>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                         <p className="text-[10px] text-slate-500 font-medium mb-1">Fecha Solicitud</p>
                         <p className="text-sm font-medium text-slate-900">09/01/2024</p>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                         <p className="text-[10px] text-slate-500 font-medium mb-1">Fecha Respuesta</p>
                         <p className="text-sm font-medium text-slate-900">10/01/2024</p>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                         <p className="text-[10px] text-slate-500 font-medium mb-1">Recepciones Previas</p>
                         <p className="text-sm font-medium text-slate-900">3 encontradas</p>
                      </div>
                    </div>
                  </div>

                  {/* RT-41 */}
                  <div className="border border-slate-200 rounded-lg overflow-hidden mt-6">
                    <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800 text-sm">RT-41 — Contraste Histórico del Producto</h3>
                      <span className="text-xs font-bold text-success flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5"/> Completado</span>
                    </div>
                    <table className="w-full text-sm text-left">
                      <thead className="bg-white border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider font-bold">
                        <tr>
                          <th className="px-5 py-3">RECEPCIÓN</th>
                          <th className="px-5 py-3">FECHA</th>
                          <th className="px-5 py-3">LOTE</th>
                          <th className="px-5 py-3">TRÁMITE</th>
                          <th className="px-5 py-3">RESULTADO</th>
                          <th className="px-5 py-3">ANALISTA</th>
                          <th className="px-5 py-3">OBSERVACIONES</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        <tr className="hover:bg-slate-50">
                          <td className="px-5 py-3 text-primary hover:underline cursor-pointer font-medium">REC-2023-0201</td>
                          <td className="px-5 py-3 text-slate-600">15/09/2023</td>
                          <td className="px-5 py-3 text-slate-800 font-medium">AM2309A</td>
                          <td className="px-5 py-3 text-slate-600">Control de Calidad</td>
                          <td className="px-5 py-3"><span className="bg-green-100 text-success font-bold px-2 py-0.5 rounded text-xs">Conforme</span></td>
                          <td className="px-5 py-3 text-slate-600">Karla Suazo</td>
                          <td className="px-5 py-3 text-slate-500 text-xs truncate max-w-[150px]">Sin observaciones. Todas las pruebas...</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="px-5 py-3 text-primary hover:underline cursor-pointer font-medium">REC-2023-0034</td>
                          <td className="px-5 py-3 text-slate-600">12/02/2023</td>
                          <td className="px-5 py-3 text-slate-800 font-medium">AM2302B</td>
                          <td className="px-5 py-3 text-slate-600">Control de Calidad</td>
                          <td className="px-5 py-3"><span className="bg-red-100 text-danger font-bold px-2 py-0.5 rounded text-xs">No Conforme</span></td>
                          <td className="px-5 py-3 text-slate-600">Jorge Matute</td>
                          <td className="px-5 py-3 text-slate-500 text-xs truncate max-w-[150px]">Prueba de disolución fuera de esp...</td>
                        </tr>
                        <tr className="hover:bg-slate-50">
                          <td className="px-5 py-3 text-primary hover:underline cursor-pointer font-medium">REC-2022-0089</td>
                          <td className="px-5 py-3 text-slate-600">28/04/2022</td>
                          <td className="px-5 py-3 text-slate-800 font-medium">AM2204C</td>
                          <td className="px-5 py-3 text-slate-600">Licitación Pública</td>
                          <td className="px-5 py-3"><span className="bg-green-100 text-success font-bold px-2 py-0.5 rounded text-xs">Conforme</span></td>
                          <td className="px-5 py-3 text-slate-600">Karla Suazo</td>
                          <td className="px-5 py-3 text-slate-500 text-xs truncate max-w-[150px]">Conforme. Estándar de referencia...</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* RT-30 */}
                  <div className="border border-slate-200 rounded-lg overflow-hidden mt-6 flex flex-col md:flex-row">
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-800 text-sm">RT-30 — Solicitud de Información / Estándar</h3>
                        <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full border border-orange-200 flex items-center gap-1.5">
                          <Clock className="w-3 h-3" /> Pendiente Respuesta
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                           <p className="text-[10px] text-slate-500 font-medium mb-1">Fecha Emisión</p>
                           <p className="text-sm font-medium text-slate-900">11/01/2024</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                           <p className="text-[10px] text-slate-500 font-medium mb-1">Firmado por</p>
                           <p className="text-sm font-medium text-slate-900">Roberto Paz — STR</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                           <p className="text-[10px] text-slate-500 font-medium mb-1">Enviado a</p>
                           <p className="text-sm font-medium text-slate-900">Lic. Claudia Berrios Ochoa</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                           <p className="text-[10px] text-slate-500 font-medium mb-1">Plazo Límite</p>
                           <p className="text-sm font-medium text-slate-900">11/03/2024 (60 días)</p>
                        </div>
                      </div>
                      <h4 className="font-bold text-slate-800 text-xs mb-3">Ítems Solicitados</h4>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2 text-slate-600"><CheckCircle2 className="w-4 h-4 text-success" /> Estándar de referencia: Amoxicilina Trihidrato USP RS</p>
                        <p className="flex items-center gap-2 text-slate-800 font-bold"><AlertCircle className="w-4 h-4 text-orange-500" /> Metodología analítica actualizada (HPLC)</p>
                        <p className="flex items-center gap-2 text-slate-600"><CheckCircle2 className="w-4 h-4 text-success" /> Certificado de análisis del lote AM2401X</p>
                      </div>
                    </div>
                    <div className="w-full md:w-80 bg-slate-50 border-l border-slate-200 p-6 flex flex-col justify-center">
                      <h4 className="font-bold text-slate-800 text-xs mb-4 text-center">Contador de Plazo (60 días)</h4>
                      <div className="bg-white border border-orange-200 rounded-lg p-5 text-center mb-4 shadow-sm">
                        <p className="text-4xl font-black text-orange-600 mb-1">7</p>
                        <p className="text-xs text-slate-500 mb-4">días transcurridos de 60</p>
                        <div className="w-full bg-slate-200 rounded-full h-2.5 mb-2 overflow-hidden">
                          <div className="bg-success h-2.5 rounded-full" style={{ width: '12%' }}></div>
                        </div>
                        <p className="text-[10px] text-slate-500">53 días restantes · Vence: 11/03/2024</p>
                      </div>
                      <button className="w-full bg-primary hover:bg-primary-dark text-white rounded-md py-2.5 text-sm font-bold transition-colors shadow-sm flex justify-center items-center gap-2">
                        Registrar Respuesta Recibida
                      </button>
                    </div>
                  </div>

                  {/* RT-38 */}
                  <div className="border border-slate-200 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800 text-sm">RT-38 — Estado del Expediente Analítico</h3>
                        <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> En Captura FFQQ
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                           <p className="text-[10px] text-slate-500 font-medium mb-1">Creado por DOCT</p>
                           <p className="text-xs font-medium text-slate-900">Ana Patricia Flores<br/><span className="text-[9px] text-slate-400">16/01/2024</span></p>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                           <p className="text-[10px] text-slate-500 font-medium mb-1">Pruebas Configuradas</p>
                           <p className="text-xs font-medium text-slate-900">8 pruebas<br/><span className="text-[9px] text-slate-400">16/01/2024</span></p>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                           <p className="text-[10px] text-slate-500 font-medium mb-1">Auxiliares Generados</p>
                           <p className="text-xs font-medium text-slate-900">4 auxiliares<br/><span className="text-[9px] text-slate-400">16/01/2024</span></p>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 rounded-md p-3">
                           <p className="text-[10px] text-slate-500 font-medium mb-1">Paquete Enviado a STR</p>
                           <p className="text-xs font-medium text-slate-900">Roberto Paz<br/><span className="text-[9px] text-slate-400">17/01/2024</span></p>
                        </div>
                      </div>
                      <button className="text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md px-4 py-2 text-xs font-bold transition-colors shadow-sm flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5" /> Abrir RT-38 Completo
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB FALLBACK FOR OTHERS */}
              {["estandar", "ffqq", "micro", "stcc"].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-slate-300 rounded-lg bg-slate-50">
                   <Activity className="w-8 h-8 text-slate-400 mb-3" />
                   <p className="text-sm font-bold text-slate-700">Contenido en construcción o derivado a módulo especializado.</p>
                   <p className="text-xs text-slate-500 mt-1">Navegue a los submódulos específicos para interactuar con esta etapa.</p>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Right Column (Sidebar: Timeline) */}
        <div className="xl:col-span-1 space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full max-h-[800px]">
            
            {/* Side Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50">
              <button onClick={() => setSideTab("timeline")} className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${sideTab === "timeline" ? "border-primary text-primary bg-white" : "border-transparent text-slate-500 hover:text-slate-700"}`}>Timeline</button>
              <button onClick={() => setSideTab("observaciones")} className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${sideTab === "observaciones" ? "border-primary text-primary bg-white" : "border-transparent text-slate-500 hover:text-slate-700"}`}>Observaciones</button>
              <button onClick={() => setSideTab("comparador")} className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${sideTab === "comparador" ? "border-primary text-primary bg-white" : "border-transparent text-slate-500 hover:text-slate-700"}`}>Comparador</button>
            </div>

            {/* Side Content */}
            <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
              {sideTab === "timeline" && (
                <div className="space-y-4">
                  <div className="flex gap-2 mb-4">
                    <button className="flex-1 bg-white border border-slate-300 text-slate-600 rounded text-xs py-1.5 flex justify-center items-center gap-1"><Filter className="w-3 h-3"/> Todas las áreas</button>
                    <button className="flex-1 bg-white border border-slate-300 text-slate-600 rounded text-xs py-1.5">Todos los tipos</button>
                  </div>
                  <p className="text-xs font-medium text-slate-500 mb-4">18 eventos</p>
                  
                  <div className="space-y-6 relative before:absolute before:left-[5px] before:top-2 before:bottom-0 before:w-[2px] before:bg-slate-200">
                    
                    {/* Event 1 */}
                    <div className="relative pl-5">
                      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-purple-500 border-2 border-white shadow-sm"></div>
                      <div className="flex justify-between items-start mb-0.5">
                        <span className="text-[10px] font-bold text-purple-600">RAC</span>
                        <span className="text-[10px] text-slate-400">07/01/2024 08:14</span>
                      </div>
                      <p className="text-xs font-medium text-slate-800">Ingreso creado en borrador</p>
                      <p className="text-[10px] text-slate-500">María Rodríguez</p>
                    </div>

                    {/* Event 2 */}
                    <div className="relative pl-5">
                      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-sm"></div>
                      <div className="flex justify-between items-start mb-0.5">
                        <span className="text-[10px] font-bold text-green-600">RAC</span>
                        <span className="text-[10px] text-slate-400">07/01/2024 09:47</span>
                      </div>
                      <p className="text-xs font-medium text-slate-800">Documentación mínima verificada</p>
                      <p className="text-[10px] text-slate-500">María Rodríguez</p>
                    </div>

                    {/* Event 3 */}
                    <div className="relative pl-5">
                      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>
                      <div className="flex justify-between items-start mb-0.5">
                        <span className="text-[10px] font-bold text-blue-600">RAC</span>
                        <span className="text-[10px] text-slate-400">07/01/2024 10:05</span>
                      </div>
                      <p className="text-xs font-medium text-slate-800">Registrado en RG-41 — Nº Recepción asignado</p>
                      <p className="text-[10px] text-slate-500 mb-1.5">María Rodríguez</p>
                      <div className="bg-slate-50 border border-slate-200 rounded p-2 text-[10px] text-slate-600">
                        Correlativo LEF-2024-00147 generado automáticamente
                      </div>
                    </div>

                    {/* Event 4 */}
                    <div className="relative pl-5">
                      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>
                      <div className="flex justify-between items-start mb-0.5">
                        <span className="text-[10px] font-bold text-blue-600">RAC</span>
                        <span className="text-[10px] text-slate-400">07/01/2024 10:22</span>
                      </div>
                      <p className="text-xs font-medium text-slate-800">RG 13 y RG 72 generados</p>
                      <p className="text-[10px] text-slate-500">María Rodríguez</p>
                    </div>

                    {/* Event 5 */}
                    <div className="relative pl-5">
                      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-sm"></div>
                      <div className="flex justify-between items-start mb-0.5">
                        <span className="text-[10px] font-bold text-green-600">Contabilidad</span>
                        <span className="text-[10px] text-slate-400">08/01/2024 14:30</span>
                      </div>
                      <p className="text-xs font-medium text-slate-800">Proforma Pagada</p>
                      <p className="text-[10px] text-slate-500">Lic. Roberto Suazo</p>
                    </div>

                  </div>
                </div>
              )}

              {sideTab !== "timeline" && (
                <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
                  <p className="text-xs">No hay datos para esta vista.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
