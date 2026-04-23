"use client";

import { useState, useRef, useEffect } from "react";
import { mockIngreso360 } from "@/lib/mockData";
import { 
  AlertCircle, CheckCircle2, Clock, FileText, Beaker, 
  History, Download, Activity, FileCheck, ShieldAlert, Files,
  User, Check, XCircle, ChevronDown, Flag, FileDigit, Calendar, ShieldCheck,
  Building, MapPin, Printer, MoreHorizontal, Filter, FlaskConical, Microscope, Briefcase,
  Eye, GitCompare, MessageSquare, ChevronLeft, ChevronRight
} from "lucide-react";

export default function Ingreso360Page({ params }: { params: { id: string } }) {
  const data = mockIngreso360; 
  const [activeTab, setActiveTab] = useState("resumen");
  const [sideTab, setSideTab] = useState("timeline");

  // Nav horizontal tabs
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsContainerRef.current) {
      const scrollAmount = 300;
      tabsContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

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
            <div className="relative border-b border-slate-200 bg-slate-50/50 flex items-center group">
              {showLeftArrow && (
                <button 
                  onClick={() => scrollTabs("left")}
                  className="absolute left-0 top-0 bottom-0 z-10 px-1.5 bg-gradient-to-r from-slate-50 via-slate-50 to-transparent hover:text-primary text-slate-400 transition-colors flex items-center justify-center"
                  aria-label="Desplazar a la izquierda"
                >
                  <ChevronLeft className="w-5 h-5 bg-white rounded-full shadow-sm border border-slate-200" />
                </button>
              )}
              
              <div 
                ref={tabsContainerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto hide-scrollbar w-full scroll-smooth"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-3.5 text-sm font-bold whitespace-nowrap transition-colors flex-shrink-0 ${
                      activeTab === tab.id 
                        ? "text-primary border-b-2 border-primary bg-white shadow-[0_2px_0_0_#025f85]" 
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-100 border-b-2 border-transparent"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {showRightArrow && (
                <button 
                  onClick={() => scrollTabs("right")}
                  className="absolute right-0 top-0 bottom-0 z-10 px-1.5 bg-gradient-to-l from-slate-50 via-slate-50 to-transparent hover:text-primary text-slate-400 transition-colors flex items-center justify-center"
                  aria-label="Desplazar a la derecha"
                >
                  <ChevronRight className="w-5 h-5 bg-white rounded-full shadow-sm border border-slate-200" />
                </button>
              )}
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
                  {/* Action Bar */}
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2"><FileCheck className="w-4 h-4 text-primary" /> Expediente RAC — Control de Recepción</h3>
                    <div className="flex gap-2">
                      <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-slate-100 shadow-sm flex items-center gap-1.5"><Printer className="w-3.5 h-3.5" /> RG-13 (Etiquetas)</button>
                      <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-slate-100 shadow-sm flex items-center gap-1.5"><Printer className="w-3.5 h-3.5" /> RG-72 (Ingreso)</button>
                      <button className="bg-primary text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-primary-dark shadow-sm flex items-center gap-1.5">Editar Registro Maestro</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Columna Izquierda */}
                    <div className="space-y-6">
                      
                      {/* BLOQUE 1: Registro Maestro (RG-41) */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">1. Registro Maestro (RG-41)</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3"><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">N° Recepción</p><p className="text-sm font-bold text-slate-900">REC-2024-00147</p></div>
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3"><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Prioridad</p><p className="text-sm font-bold text-orange-600">URGENTE</p></div>
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3"><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Fecha de Recepción</p><p className="text-sm font-bold text-slate-900">07/01/2024 08:14</p></div>
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3"><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Tipo de Trámite</p><p className="text-sm font-bold text-slate-900">Control de Calidad</p></div>
                        </div>
                      </div>

                      {/* BLOQUE 2: Referencias Documentales */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">2. Referencias Institucionales</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3"><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Oficio de Remisión</p><p className="text-sm font-bold text-primary hover:underline cursor-pointer">OF-SESAL-2024-089</p></div>
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3"><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">N° Licitación / Compra</p><p className="text-sm font-bold text-slate-900">LPN-SESAL-001-2023</p></div>
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3 col-span-2"><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Proforma de Pago</p><p className="text-sm font-bold text-slate-900 flex items-center gap-2">PROF-2024-0015 <span className="bg-green-100 text-success text-[9px] px-1.5 py-0.5 rounded">PAGADA</span></p></div>
                        </div>
                      </div>

                      {/* BLOQUE 3: Condiciones de Recepción */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">3. Condiciones Físicas de la Muestra</h3>
                        <div className="bg-slate-50 border border-slate-100 rounded-md p-4">
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Temp. de Recepción</p><p className="text-sm font-bold text-slate-900">22.5 °C</p></div>
                            <div><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Humedad Relativa</p><p className="text-sm font-bold text-slate-900">45%</p></div>
                          </div>
                          <div className="border-t border-slate-200 pt-3">
                            <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Estado del Embalaje</p>
                            <div className="flex items-center gap-2 mt-1">
                               <span className="bg-green-100 text-success border border-green-200 px-2 py-1 rounded text-xs font-bold">Óptimo</span>
                               <span className="text-xs text-slate-600">Cajas selladas, sin roturas.</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* BLOQUE 4: Responsabilidad / Toma de Muestra */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">4. Toma de Muestra</h3>
                        <div className="bg-slate-50 border border-slate-100 rounded-md p-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Entidad Muestreadora</p><p className="text-sm font-bold text-slate-900">ARSA - Inspectoría</p></div>
                            <div><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Acta de Toma</p><p className="text-sm font-bold text-primary hover:underline cursor-pointer">ACTA-089-24</p></div>
                            <div className="col-span-2"><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Sitio de Muestreo</p><p className="text-sm font-bold text-slate-900">Almacén Central de Medicamentos</p></div>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Columna Derecha */}
                    <div className="space-y-6">
                      
                      {/* BLOQUE 5: Cantidades por Destino */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">5. Cuadro de Cantidades y Distribución</h3>
                        <table className="w-full text-sm text-left border border-slate-200 rounded-md overflow-hidden">
                          <thead className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-500 uppercase font-bold">
                            <tr><th className="px-4 py-2">Área / Destino</th><th className="px-4 py-2">Cant.</th><th className="px-4 py-2 text-right">Verificado</th></tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            <tr><td className="px-4 py-2 text-slate-700 font-bold">Total Muestra Recibida</td><td className="px-4 py-2 font-black text-slate-900">240</td><td className="px-4 py-2 text-right"><CheckCircle2 className="w-4 h-4 text-success ml-auto" /></td></tr>
                            <tr><td className="px-4 py-2 text-slate-600">Para Análisis FFQQ</td><td className="px-4 py-2 font-bold text-primary">120</td><td className="px-4 py-2 text-right"><CheckCircle2 className="w-4 h-4 text-success ml-auto" /></td></tr>
                            <tr><td className="px-4 py-2 text-slate-600">Para Microbiología</td><td className="px-4 py-2 font-bold text-primary">60</td><td className="px-4 py-2 text-right"><CheckCircle2 className="w-4 h-4 text-success ml-auto" /></td></tr>
                            <tr><td className="px-4 py-2 text-slate-600">Muestra de Retención (Biblio)</td><td className="px-4 py-2 font-bold text-purple-700">60</td><td className="px-4 py-2 text-right"><CheckCircle2 className="w-4 h-4 text-success ml-auto" /></td></tr>
                          </tbody>
                        </table>
                      </div>

                      {/* BLOQUE 6: Verificación Documental Mínima */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">6. Verificación Documental Mínima</h3>
                           <span className="text-[10px] font-bold text-danger bg-red-50 px-2 py-0.5 rounded border border-red-100">Incompleto</span>
                        </div>
                        <div className="space-y-2">
                           {[
                             { label: "Orden de Compra / Licitación", status: "ok" },
                             { label: "Acta de Toma de Muestra original", status: "ok" },
                             { label: "Oficio de Remisión de SESAL", status: "ok" },
                             { label: "Certificado de Análisis del Fabricante", status: "ok" },
                             { label: "Metodología Analítica declarada", status: "missing" },
                             { label: "Certificado de Libre Venta / Reg. Sanitario", status: "ok" },
                           ].map((item, i) => (
                             <div key={i} className={`flex items-center justify-between p-3 rounded-md border ${
                               item.status === 'ok' ? 'bg-green-50/50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
                             }`}>
                               <div className="flex items-center gap-3">
                                 {item.status === 'ok' ? <CheckCircle2 className="w-4 h-4 text-success" /> : <XCircle className="w-4 h-4 text-danger" />}
                                 <span className="text-xs font-bold">{item.label}</span>
                               </div>
                               {item.status === 'missing' && <button className="text-[10px] bg-white border border-red-300 text-danger px-2 py-1 rounded hover:bg-red-50 transition-colors font-bold shadow-sm">Adjuntar</button>}
                             </div>
                           ))}
                        </div>
                      </div>

                      {/* BLOQUE 7: Estado de Distribución */}
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-4">7. Estado de Distribución (RT-159)</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-success font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4"/> RAC — Emisión a Laboratorios</span>
                            <div className="text-right">
                              <span className="text-slate-500 mr-3 text-xs">08/01/2024</span>
                              <span className="text-slate-700 font-bold text-xs">María Rodríguez</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-100">
                            <span className="text-success font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4"/> DOCT — Recibido (Expediente)</span>
                            <div className="text-right">
                              <span className="text-slate-500 mr-3 text-xs">09/01/2024</span>
                              <span className="text-slate-700 font-bold text-xs">Ana Patricia Flores</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-100">
                            <span className="text-success font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4"/> FFQQ — Recibido (Muestra)</span>
                            <div className="text-right">
                              <span className="text-slate-500 mr-3 text-xs">17/01/2024</span>
                              <span className="text-slate-700 font-bold text-xs">Karla Suazo</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-100 opacity-50">
                            <span className="text-slate-500 font-bold flex items-center gap-1.5"><Clock className="w-4 h-4"/> Micro — Pendiente Recepción</span>
                            <div className="text-right text-xs">
                              <span className="text-slate-400">Esperando...</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* BLOQUE 8: Acciones de Recepción */}
                      <div className="pt-2">
                         <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-md transition-colors shadow-sm flex justify-center items-center gap-2">
                            Ver o Emitir Acta RT-159 Completa
                         </button>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* TAB: DOCUMENTACIÓN */}
              {activeTab === "documentacion" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Action Bar DOCT */}
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary" /> Expediente DOCT — Gestión Documental Central</h3>
                    <div className="flex gap-2">
                      <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-slate-100 shadow-sm flex items-center gap-1.5"><FileDigit className="w-3.5 h-3.5" /> Generar RT-41</button>
                      <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-slate-100 shadow-sm flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Nuevo Oficio</button>
                      <button className="bg-primary text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-primary-dark shadow-sm flex items-center gap-1.5">Emitir RT-30 (Req.)</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Columna Izquierda */}
                    <div className="space-y-6">
                      
                      {/* BLOQUE 1: Recepción del Expediente Base (RT-75) */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">1. Recepción del Expediente (RT-75)</h3>
                        <div className="bg-slate-50 border border-slate-100 rounded-md p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center border border-green-200">
                                <CheckCircle2 className="w-4 h-4 text-success" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900">Expediente Físico Recibido</p>
                                <p className="text-[10px] text-slate-500">RAC → DOCT (María R. a Ana F.)</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-slate-900">09/01/2024</p>
                              <p className="text-[10px] text-slate-500">08:05 AM</p>
                            </div>
                          </div>
                          <div className="bg-white border border-slate-200 rounded p-3 text-xs text-slate-600 flex items-start gap-2 shadow-sm">
                             <Check className="w-4 h-4 text-success shrink-0" />
                             <span>Se verificó la totalidad de fojas enviadas por RAC según el índice inicial. Expediente base aperturado.</span>
                          </div>
                        </div>
                      </div>

                      {/* BLOQUE 2: Contraste Histórico de Calidad (RT-41) */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">2. Contraste Histórico (RT-41)</h3>
                          <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200">Ejecutado</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3 text-center"><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Registros Previos</p><p className="text-xl font-black text-slate-900">3</p></div>
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3 text-center"><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Alertas Históricas</p><p className="text-xl font-black text-success">0</p></div>
                        </div>
                        <table className="w-full text-[10px] text-left border border-slate-200 rounded-md overflow-hidden">
                          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold">
                            <tr><th className="px-3 py-2">Fecha</th><th className="px-3 py-2">Lote</th><th className="px-3 py-2">Resultado</th><th className="px-3 py-2 text-right">RT-40</th></tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white text-xs">
                            <tr><td className="px-3 py-2">09/2023</td><td className="px-3 py-2 font-medium">AM2309A</td><td className="px-3 py-2 text-success font-bold">Conforme</td><td className="px-3 py-2 text-right text-primary hover:underline cursor-pointer">Ver</td></tr>
                            <tr><td className="px-3 py-2">02/2023</td><td className="px-3 py-2 font-medium">AM2302Z</td><td className="px-3 py-2 text-success font-bold">Conforme</td><td className="px-3 py-2 text-right text-primary hover:underline cursor-pointer">Ver</td></tr>
                            <tr><td className="px-3 py-2">10/2022</td><td className="px-3 py-2 font-medium">AM2210B</td><td className="px-3 py-2 text-success font-bold">Conforme</td><td className="px-3 py-2 text-right text-primary hover:underline cursor-pointer">Ver</td></tr>
                          </tbody>
                        </table>
                      </div>

                      {/* BLOQUE 3: Requerimientos y Plazos (RT-30) */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">3. Requerimientos de Estándar/Método (RT-30)</h3>
                           <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full border border-orange-200 flex items-center gap-1">
                             <Clock className="w-3 h-3" /> En Pausa Legal
                           </span>
                        </div>
                        <div className="border border-orange-200 rounded-lg overflow-hidden flex flex-col sm:flex-row bg-white shadow-sm">
                          <div className="flex-1 p-4">
                            <h4 className="font-bold text-slate-800 text-sm mb-1">RT-30-2024-0012</h4>
                            <p className="text-[10px] text-slate-500 mb-3">Emitido a Droguería Nacional S.A.</p>
                            <div className="space-y-1.5 text-xs">
                              <p className="flex items-start gap-2 text-slate-600"><CheckCircle2 className="w-4 h-4 text-success shrink-0" /> <span className="pt-0.5">Estándar primario de Amoxicilina USP</span></p>
                              <p className="flex items-start gap-2 text-slate-800 font-bold"><AlertCircle className="w-4 h-4 text-orange-500 shrink-0" /> <span className="pt-0.5">Metodología HPLC validada por fabricante</span></p>
                            </div>
                          </div>
                          <div className="w-full sm:w-32 bg-orange-50/50 border-l border-orange-100 p-4 flex flex-col justify-center items-center text-center">
                            <p className="text-3xl font-black text-orange-600 mb-1">7</p>
                            <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-2">días <br/>transcurridos</p>
                            <div className="w-full bg-orange-100 rounded-full h-1.5 overflow-hidden"><div className="bg-orange-500 h-1.5 rounded-full w-[12%]"></div></div>
                            <p className="text-[8px] text-slate-400 mt-1">Límite: 60 días</p>
                          </div>
                        </div>
                      </div>

                      {/* BLOQUE 4: Trazabilidad Física del Expediente */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">4. Ubicación Física del Expediente</h3>
                        <div className="bg-slate-50 border border-slate-100 rounded-md p-3 grid grid-cols-3 gap-3">
                           <div><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Custodio</p><p className="text-xs font-bold text-slate-900">Ana Flores (DOCT)</p></div>
                           <div><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Estante / Fila</p><p className="text-xs font-bold text-slate-900">E-04 / F-02</p></div>
                           <div><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Total Fojas</p><p className="text-xs font-bold text-slate-900">24 páginas</p></div>
                        </div>
                      </div>

                    </div>

                    {/* Columna Derecha */}
                    <div className="space-y-6">
                      
                      {/* BLOQUE 5: Certificados Analíticos de Origen (Validación Profunda) */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">5. Validación de Certificado de Origen</h3>
                        <div className="space-y-2">
                           {[
                             { label: "Correlación de Lote (Certificado vs Empaque)", status: "ok" },
                             { label: "Fecha de Vencimiento coherente (>1 año)", status: "ok" },
                             { label: "Firma Responsable Técnico del Fabricante", status: "ok" },
                             { label: "Declaración de Pureza (API)", status: "warning" },
                             { label: "Datos Crudos de Valoración (Cromatogramas)", status: "missing" },
                           ].map((item, i) => (
                             <div key={i} className={`flex items-center justify-between p-2.5 rounded border text-xs ${
                               item.status === 'ok' ? 'bg-green-50/30 border-green-200 text-slate-700' : 
                               item.status === 'warning' ? 'bg-yellow-50/50 border-yellow-200 text-slate-800' :
                               'bg-red-50 border-red-200 text-red-800'
                             }`}>
                               <div className="flex items-center gap-2.5">
                                 {item.status === 'ok' ? <CheckCircle2 className="w-3.5 h-3.5 text-success" /> : 
                                  item.status === 'warning' ? <AlertCircle className="w-3.5 h-3.5 text-yellow-600" /> :
                                  <XCircle className="w-3.5 h-3.5 text-danger" />}
                                 <span className={item.status === 'ok' ? '' : 'font-bold'}>{item.label}</span>
                               </div>
                               {item.status === 'missing' && <span className="text-[9px] uppercase font-bold text-danger border border-red-200 bg-white px-1.5 py-0.5 rounded cursor-pointer hover:bg-red-50">Solicitar</span>}
                               {item.status === 'warning' && <span className="text-[9px] uppercase font-bold text-yellow-700 border border-yellow-200 bg-white px-1.5 py-0.5 rounded cursor-pointer hover:bg-yellow-50">Revisar</span>}
                             </div>
                           ))}
                        </div>
                      </div>

                      {/* BLOQUE 6: Gestión de Biblioteca (Muestra de Retención) */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">6. Custodia de Biblioteca</h3>
                        <div className="bg-purple-50 border border-purple-100 rounded-md p-4 shadow-sm relative overflow-hidden">
                           <ShieldCheck className="w-24 h-24 text-purple-100 absolute -right-4 -bottom-4 z-0" />
                           <div className="relative z-10 grid grid-cols-2 gap-4">
                              <div><p className="text-[10px] text-purple-600 font-bold uppercase mb-1">Muestras Resguardadas</p><p className="text-lg font-black text-purple-900">60 unds.</p></div>
                              <div><p className="text-[10px] text-purple-600 font-bold uppercase mb-1">Ubicación Biblioteca</p><p className="text-sm font-bold text-purple-900">B-12-Estante 4</p></div>
                              <div className="col-span-2"><p className="text-[10px] text-purple-600 font-bold uppercase mb-1">Fecha de Descarte Programada</p><p className="text-sm font-bold text-purple-900">Diciembre 2027 (+1 año post exp.)</p></div>
                           </div>
                        </div>
                      </div>

                      {/* BLOQUE 7: Generación de Oficios Auxiliares */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">7. Comunicaciones y Oficios Previos</h3>
                          <span className="text-[10px] font-bold text-primary cursor-pointer hover:underline">+ Redactar Oficio</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-1 text-xs">
                          <div className="flex justify-between items-center p-2 hover:bg-white rounded transition-colors group">
                            <div className="flex items-center gap-2">
                              <FileText className="w-3.5 h-3.5 text-slate-400" />
                              <span className="font-bold text-slate-700">OF-LEF-2024-001</span>
                              <span className="text-slate-500">— Aviso de Recepción a Cliente</span>
                            </div>
                            <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">09/01</span>
                          </div>
                          <div className="flex justify-between items-center p-2 hover:bg-white rounded transition-colors group">
                            <div className="flex items-center gap-2">
                              <FileText className="w-3.5 h-3.5 text-slate-400" />
                              <span className="font-bold text-slate-700">OF-LEF-2024-004</span>
                              <span className="text-slate-500">— Notificación de Plazo RT-30</span>
                            </div>
                            <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">11/01</span>
                          </div>
                        </div>
                      </div>

                      {/* BLOQUE 8: Estado de Liberación Documental para DT */}
                      <div className="pt-2">
                         <div className="border-2 border-orange-200 bg-orange-50 rounded-lg p-4 flex items-center justify-between shadow-sm">
                            <div>
                               <p className="text-xs font-bold text-orange-800 uppercase mb-0.5">Estado del Expediente Base</p>
                               <p className="text-sm font-black text-orange-900">En Pausa Documental</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white border border-orange-200 flex items-center justify-center">
                               <AlertCircle className="w-5 h-5 text-orange-500" />
                            </div>
                         </div>
                         <p className="text-[10px] text-slate-500 mt-2 text-center">El expediente no puede ser liberado hacia Dirección Técnica hasta resolver el RT-30 y obtener la metodología analítica.</p>
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
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Action Bar STR */}
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2"><Beaker className="w-4 h-4 text-primary" /> Sección de Estándares de Referencia (STR)</h3>
                    <div className="flex gap-2">
                      <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-slate-100 shadow-sm flex items-center gap-1.5"><History className="w-3.5 h-3.5" /> Bitácora de Pesadas</button>
                      <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-slate-100 shadow-sm flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Generar RG-44</button>
                      <button className="bg-primary text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-primary-dark shadow-sm flex items-center gap-1.5">Asignar Estándar del Inventario</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Columna Izquierda */}
                    <div className="space-y-6">
                      
                      {/* BLOQUE 1: Registro Maestro de Estándar (RG-44) */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">1. Datos del Estándar Primario (Asignado)</h3>
                        <div className="bg-slate-50 border border-slate-100 rounded-md p-4">
                           <div className="flex justify-between items-start mb-4 border-b border-slate-200 pb-3">
                              <div>
                                 <p className="text-sm font-bold text-slate-900">Amoxicilina Trihidrato (Amoxicillin RS)</p>
                                 <p className="text-[10px] text-slate-500">ID Inventario: STR-2023-0842</p>
                              </div>
                              <span className="bg-green-100 text-success text-[10px] font-bold px-2 py-0.5 rounded border border-green-200">Aprobado para Uso</span>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Lote del Estándar</p><p className="text-xs font-bold text-slate-900">USP-J0L496</p></div>
                              <div><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Pureza Declarada</p><p className="text-xs font-bold text-slate-900 flex items-center gap-1">99.8% <CheckCircle2 className="w-3 h-3 text-success"/></p></div>
                              <div><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Cantidad Inicial</p><p className="text-xs font-bold text-slate-900">500 mg</p></div>
                              <div><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Forma Física</p><p className="text-xs font-bold text-slate-900">Polvo Liofilizado</p></div>
                           </div>
                        </div>
                      </div>

                      {/* BLOQUE 2: Trazabilidad de Origen */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">2. Trazabilidad de Origen</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3"><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Entidad de Referencia</p><p className="text-sm font-bold text-slate-900">USP (United States Pharmacopeia)</p></div>
                          <div className="bg-slate-50 border border-slate-100 rounded-md p-3"><p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Certificado de Análisis</p><p className="text-sm font-bold text-primary hover:underline cursor-pointer flex items-center gap-1"><FileDigit className="w-3.5 h-3.5"/> CoA-J0L496.pdf</p></div>
                        </div>
                      </div>

                      {/* BLOQUE 3: Control de Vigencias */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">3. Control de Caducidad y Vigencia</h3>
                        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex items-center gap-6">
                           <div className="flex-1">
                              <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Fecha de Apertura</p>
                              <p className="text-xs font-bold text-slate-900">12/08/2023</p>
                           </div>
                           <div className="w-[1px] h-8 bg-slate-200"></div>
                           <div className="flex-1">
                              <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Caducidad Oficial USP</p>
                              <p className="text-xs font-bold text-slate-900">30/11/2024</p>
                           </div>
                           <div className="w-[1px] h-8 bg-slate-200"></div>
                           <div className="flex-1 text-center">
                              <p className="text-2xl font-black text-success mb-0.5">328</p>
                              <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">días restantes</p>
                           </div>
                        </div>
                      </div>

                      {/* BLOQUE 4: Condiciones de Almacenamiento */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">4. Condiciones Exigidas de Almacenamiento</h3>
                        <div className="grid grid-cols-3 gap-3">
                           <div className="bg-blue-50 border border-blue-100 rounded-md p-3 text-center">
                              <AlertCircle className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                              <p className="text-[10px] text-blue-700 font-bold uppercase mb-0.5">Temperatura</p>
                              <p className="text-xs font-black text-blue-900">2°C - 8°C</p>
                           </div>
                           <div className="bg-slate-50 border border-slate-200 rounded-md p-3 text-center">
                              <ShieldCheck className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                              <p className="text-[10px] text-slate-600 font-bold uppercase mb-0.5">Luz</p>
                              <p className="text-xs font-black text-slate-900">Proteger</p>
                           </div>
                           <div className="bg-slate-50 border border-slate-200 rounded-md p-3 text-center">
                              <FlaskConical className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                              <p className="text-[10px] text-slate-600 font-bold uppercase mb-0.5">Higroscopicidad</p>
                              <p className="text-xs font-black text-slate-900">Alta (Desecador)</p>
                           </div>
                        </div>
                      </div>

                    </div>

                    {/* Columna Derecha */}
                    <div className="space-y-6">
                      
                      {/* BLOQUE 5: Gestión de Mermas/Uso (Bitácora) */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">5. Saldo y Bitácora de Uso</h3>
                           <button className="text-[10px] font-bold text-primary hover:underline bg-blue-50 px-2 py-1 rounded border border-blue-100">Registrar Pesada</button>
                        </div>
                        
                        {/* Indicador de Saldo */}
                        <div className="bg-slate-50 border border-slate-200 rounded-t-lg p-4 flex justify-between items-center shadow-sm">
                           <div>
                              <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Saldo Actual en Vial</p>
                              <div className="w-full bg-slate-200 rounded-full h-2 w-48 mt-1.5 overflow-hidden"><div className="bg-primary h-2 rounded-full w-[65%]"></div></div>
                           </div>
                           <div className="text-right">
                              <p className="text-xl font-black text-slate-900">325.4 <span className="text-xs text-slate-500 font-bold">mg</span></p>
                              <p className="text-[9px] text-slate-400 uppercase mt-0.5">Suficiente para análisis</p>
                           </div>
                        </div>
                        
                        {/* Tabla de Consumo */}
                        <table className="w-full text-[10px] text-left border border-slate-200 rounded-b-lg overflow-hidden border-t-0 shadow-sm">
                          <thead className="bg-white border-b border-slate-200 text-slate-500 uppercase font-bold">
                            <tr><th className="px-3 py-2">Fecha / Hora</th><th className="px-3 py-2">Ingreso Destino</th><th className="px-3 py-2">Analista</th><th className="px-3 py-2 text-right">Masa (mg)</th></tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            <tr><td className="px-3 py-2 text-slate-500">17/01/24 09:15</td><td className="px-3 py-2 font-medium text-slate-800">REC-2024-00147 (Actual)</td><td className="px-3 py-2 text-slate-600">K. Suazo</td><td className="px-3 py-2 text-right font-bold text-danger">- 20.0</td></tr>
                            <tr><td className="px-3 py-2 text-slate-500">10/12/23 14:20</td><td className="px-3 py-2 font-medium text-slate-800">REC-2023-01892</td><td className="px-3 py-2 text-slate-600">J. Matute</td><td className="px-3 py-2 text-right font-bold text-danger">- 21.5</td></tr>
                            <tr><td className="px-3 py-2 text-slate-500">05/11/23 08:30</td><td className="px-3 py-2 font-medium text-slate-800">REC-2023-01644</td><td className="px-3 py-2 text-slate-600">R. Paz</td><td className="px-3 py-2 text-right font-bold text-danger">- 19.8</td></tr>
                          </tbody>
                        </table>
                      </div>

                      {/* BLOQUE 6: Requerimientos Activos (Intersección DOCT-STR) */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">6. Requerimientos Activos de Estándar</h3>
                        <div className="bg-green-50 border border-green-200 rounded-md p-3 flex items-start gap-3 shadow-sm">
                           <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                           <div>
                              <p className="text-xs font-bold text-green-900 mb-1">Sin Requerimientos Pendientes</p>
                              <p className="text-[10px] text-green-700">El estándar USP primario fue validado y asignado exitosamente al expediente. El RT-30 previo fue cerrado.</p>
                           </div>
                        </div>
                      </div>

                      {/* BLOQUE 7: Acciones de Supervisión STR */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">7. Controles Analíticos STR</h3>
                        <div className="space-y-2">
                           <div className="flex items-center justify-between p-2.5 rounded border border-slate-200 bg-white shadow-sm">
                              <span className="text-xs font-bold text-slate-700">Corrección por humedad (Karl Fischer)</span>
                              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold border border-slate-200">No aplica (Liofilizado)</span>
                           </div>
                           <div className="flex items-center justify-between p-2.5 rounded border border-slate-200 bg-white shadow-sm">
                              <span className="text-xs font-bold text-slate-700">Cálculo de Factor de Equivalencia</span>
                              <span className="text-[10px] bg-green-100 text-success px-2 py-0.5 rounded font-bold border border-green-200">Verificado: F=1.000</span>
                           </div>
                        </div>
                      </div>

                      {/* BLOQUE 8: Estado de Liberación para FFQQ */}
                      <div className="pt-2">
                         <div className="border-2 border-green-200 bg-green-50 rounded-lg p-4 flex items-center justify-between shadow-sm">
                            <div>
                               <p className="text-xs font-bold text-green-800 uppercase mb-0.5">Disponibilidad para HPLC</p>
                               <p className="text-sm font-black text-green-900">Liberado para FFQQ</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white border border-green-200 flex items-center justify-center">
                               <FlaskConical className="w-5 h-5 text-success" />
                            </div>
                         </div>
                         <p className="text-[10px] text-slate-500 mt-2 text-center">El estándar primario cumple todos los criterios de trazabilidad, vigencia y cantidad. El analista de FFQQ puede proceder con la prueba de Valoración.</p>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* TAB: ANÁLISIS FFQQ */}
              {activeTab === "ffqq" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Action Bar FFQQ */}
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2"><FlaskConical className="w-4 h-4 text-primary" /> Paquete Analítico Físico-Químico (RT-38)</h3>
                    <div className="flex gap-2">
                      <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-slate-100 shadow-sm flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" /> Reportar Desviación OOS</button>
                      <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-slate-100 shadow-sm flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Hoja de Trabajo (PDF)</button>
                      <button className="bg-primary text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-primary-dark shadow-sm flex items-center gap-1.5">Liberar Paquete a STCC</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Panel Izquierdo: Contexto y Reactivos */}
                    <div className="space-y-6 lg:col-span-1">
                      
                      {/* BLOQUE 1: Resumen Operativo de la Muestra */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">1. Datos Operativos (RT-38)</h3>
                        <div className="bg-blue-50 border border-blue-100 rounded-md p-4 shadow-sm">
                           <div className="flex justify-between items-start mb-3 border-b border-blue-200 pb-3">
                              <div>
                                 <p className="text-xs font-bold text-blue-900">Muestra: Amoxicilina 500mg</p>
                                 <p className="text-[10px] text-blue-700 mt-0.5">Lote: {data.producto.lote}</p>
                              </div>
                              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">En Ejecución</span>
                           </div>
                           <div className="space-y-3 text-xs">
                              <div className="flex justify-between"><span className="text-blue-800/70 font-bold">Analista Líder:</span><span className="text-blue-900 font-bold">Karla Suazo</span></div>
                              <div className="flex justify-between"><span className="text-blue-800/70 font-bold">Muestra Recibida:</span><span className="text-blue-900 font-bold">120 Cápsulas</span></div>
                              <div className="flex justify-between"><span className="text-blue-800/70 font-bold">Prioridad:</span><span className="text-orange-600 font-bold flex items-center gap-1"><Flag className="w-3 h-3"/> URGENTE</span></div>
                           </div>
                        </div>
                      </div>

                      {/* BLOQUE 2: Condiciones Previas (Checklist) */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">2. Checklist Pre-Analítico</h3>
                        <div className="space-y-2">
                           {[
                             { label: "Estándar Primario asignado por STR", status: "ok" },
                             { label: "Metodología Analítica declarada", status: "ok" },
                             { label: "Equipos calibrados (Balanza, HPLC)", status: "ok" },
                             { label: "Material de vidrio volumétrico clase A", status: "ok" },
                           ].map((item, i) => (
                             <div key={i} className="flex items-center justify-between p-2.5 rounded border border-green-200 bg-green-50/50">
                               <span className="text-[10px] text-slate-700 font-medium">{item.label}</span>
                               <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                             </div>
                           ))}
                        </div>
                      </div>

                      {/* BLOQUE 6: Gestión de Reactivos (RG-59) */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">6. Control de Reactivos</h3>
                           <button className="text-[10px] text-primary hover:underline font-bold">+ Vincular</button>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-[10px]">
                           <div className="flex justify-between border-b border-slate-200 pb-2 mb-2">
                              <span className="font-bold text-slate-700">Acetonitrilo HPLC</span>
                              <span className="text-slate-500">Lote: MK-8921</span>
                           </div>
                           <div className="flex justify-between border-b border-slate-200 pb-2 mb-2">
                              <span className="font-bold text-slate-700">Fosfato Monopotásico</span>
                              <span className="text-slate-500">Lote: JT-1044</span>
                           </div>
                           <div className="flex justify-between pb-1">
                              <span className="font-bold text-slate-700">Agua Ultrapura (Milli-Q)</span>
                              <span className="text-slate-500">Lote: AQ-Hoy</span>
                           </div>
                        </div>
                      </div>

                    </div>

                    {/* Panel Derecho: Ensayos, Cálculos y Trazabilidad */}
                    <div className="space-y-6 lg:col-span-2">
                      
                      {/* BLOQUE 3: Matriz de Ensayos Asignados */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">3. Matriz de Ensayos (Flujo de Trabajo)</h3>
                           <div className="flex items-center gap-3 text-[10px]">
                              <span className="flex items-center gap-1 text-slate-500"><div className="w-2 h-2 rounded-full bg-slate-200"></div> Pendiente</span>
                              <span className="flex items-center gap-1 text-blue-600"><div className="w-2 h-2 rounded-full bg-blue-500"></div> En Curso</span>
                              <span className="flex items-center gap-1 text-success"><div className="w-2 h-2 rounded-full bg-green-500"></div> Completado</span>
                           </div>
                        </div>
                        <table className="w-full text-xs text-left border border-slate-200 rounded-md overflow-hidden shadow-sm">
                          <thead className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-500 uppercase font-bold">
                            <tr><th className="px-3 py-2">Ensayo / Técnica</th><th className="px-3 py-2">Especificación (Límite)</th><th className="px-3 py-2">Estado</th><th className="px-3 py-2 text-right">Acciones</th></tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-3 py-3"><p className="font-bold text-slate-900">Aspecto (Cápsulas)</p><p className="text-[10px] text-slate-500">Organoléptico</p></td>
                              <td className="px-3 py-3 text-slate-600">Cápsulas cilíndricas bicolor</td>
                              <td className="px-3 py-3"><span className="bg-green-100 text-success px-2 py-0.5 rounded text-[10px] font-bold">Completado</span></td>
                              <td className="px-3 py-3 text-right"><button className="text-primary hover:underline text-[10px] font-bold">Ver Datos</button></td>
                            </tr>
                            <tr className="hover:bg-slate-50 transition-colors bg-blue-50/20">
                              <td className="px-3 py-3"><p className="font-bold text-slate-900">Disolución</p><p className="text-[10px] text-slate-500">Aparato II (Paletas)</p></td>
                              <td className="px-3 py-3 text-slate-600">No menos de 80% (Q) en 45 min</td>
                              <td className="px-3 py-3"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">En Curso</span></td>
                              <td className="px-3 py-3 text-right"><button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-[10px] font-bold shadow-sm">Registrar Q</button></td>
                            </tr>
                            <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-3 py-3"><p className="font-bold text-slate-900">Valoración</p><p className="text-[10px] text-slate-500">Cromatografía HPLC</p></td>
                              <td className="px-3 py-3 text-slate-600">90.0% — 120.0%</td>
                              <td className="px-3 py-3"><span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[10px] font-bold">Pendiente</span></td>
                              <td className="px-3 py-3 text-right"><button className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-2 py-1 rounded text-[10px] font-bold shadow-sm">Iniciar</button></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                         {/* BLOQUE 4: Captura de Datos Crudos (Input Simulado) */}
                         <div>
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">4. Captura de Datos (Valoración)</h3>
                           <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm">
                              <div className="space-y-3">
                                 <div>
                                    <label className="text-[10px] font-bold text-slate-600 uppercase">Área del Estándar (Au)</label>
                                    <input type="text" className="w-full mt-1 border border-slate-300 rounded p-1.5 text-xs text-slate-800 font-medium" placeholder="Ej. 1250442" />
                                 </div>
                                 <div>
                                    <label className="text-[10px] font-bold text-slate-600 uppercase">Área de la Muestra (Am)</label>
                                    <input type="text" className="w-full mt-1 border border-slate-300 rounded p-1.5 text-xs text-slate-800 font-medium" placeholder="Ej. 1248900" />
                                 </div>
                                 <button className="w-full bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-2 rounded mt-2 transition-colors">Calcular Porcentaje</button>
                              </div>
                           </div>
                         </div>

                         {/* BLOQUE 5: Cálculos y Resultados Parciales */}
                         <div>
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">5. Resultados Computados</h3>
                           <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm h-full flex flex-col justify-center items-center text-center">
                              <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Resultado Preliminar de Valoración</p>
                              <p className="text-3xl font-black text-slate-300 mb-2">--.- %</p>
                              <div className="w-full bg-slate-200 h-[1px] my-2"></div>
                              <p className="text-[10px] text-slate-500">Ingrese los datos crudos del cromatograma para obtener el cálculo final validado.</p>
                           </div>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                         {/* BLOQUE 7: Panel de Desviaciones (OOS / OOT) */}
                         <div>
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">7. Panel de Desviaciones</h3>
                           <div className="border border-dashed border-slate-300 rounded-lg p-4 text-center bg-slate-50 hover:bg-red-50 hover:border-red-300 transition-colors cursor-pointer group">
                              <AlertCircle className="w-6 h-6 text-slate-300 group-hover:text-red-400 mx-auto mb-2 transition-colors" />
                              <p className="text-xs font-bold text-slate-600 group-hover:text-red-700 transition-colors">Sin Resultados Fuera de Especificación</p>
                              <p className="text-[10px] text-slate-400 mt-1">Haga clic si detecta un OOS/OOT para iniciar protocolo de investigación Fase I.</p>
                           </div>
                         </div>

                         {/* BLOQUE 8: Cierre y Liberación Físico-Química */}
                         <div>
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">8. Cierre de Módulo</h3>
                           <div className="border-2 border-blue-200 bg-blue-50 rounded-lg p-4 flex flex-col justify-center h-full shadow-sm">
                              <div className="flex justify-between items-center mb-2">
                                 <span className="text-xs font-bold text-blue-900">Estado de RT-38</span>
                                 <span className="text-[10px] bg-white border border-blue-200 text-blue-700 px-2 py-0.5 rounded font-bold">1/3 Ensayos</span>
                              </div>
                              <p className="text-[10px] text-blue-700 leading-tight mb-3">Complete los ensayos de Disolución y Valoración para habilitar la liberación hacia STCC.</p>
                              <button disabled className="w-full bg-slate-300 text-slate-500 font-bold py-2 rounded-md text-xs cursor-not-allowed">Enviar Paquete a Jefatura</button>
                           </div>
                         </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* TAB: MICROBIOLOGÍA */}
              {activeTab === "micro" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Action Bar Micro */}
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2"><Microscope className="w-4 h-4 text-primary" /> Ejecución Analítica Microbiológica</h3>
                    <div className="flex gap-2">
                      <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-slate-100 shadow-sm flex items-center gap-1.5"><Bug className="w-3.5 h-3.5" /> Reportar Crecimiento Atípico</button>
                      <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-slate-100 shadow-sm flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Imprimir Etiquetas (Cajas Petri)</button>
                      <button className="bg-primary text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-primary-dark shadow-sm flex items-center gap-1.5">Liberar Paquete Micro a STCC</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    
                    {/* Panel Izquierdo: Contexto, Checklist y Trazabilidad */}
                    <div className="space-y-6 xl:col-span-1">
                      
                      {/* BLOQUE 1: Resumen Operativo de la Muestra (Micro) */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">1. Datos Operativos Micro</h3>
                        <div className="bg-purple-50 border border-purple-100 rounded-md p-4 shadow-sm">
                           <div className="flex justify-between items-start mb-3 border-b border-purple-200 pb-3">
                              <div>
                                 <p className="text-xs font-bold text-purple-900">Muestra: Amoxicilina 500mg</p>
                                 <p className="text-[10px] text-purple-700 mt-0.5">Lote: {data.producto.lote}</p>
                              </div>
                              <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">En Incubación</span>
                           </div>
                           <div className="space-y-3 text-xs">
                              <div className="flex justify-between"><span className="text-purple-800/70 font-bold">Analista Asignado:</span><span className="text-purple-900 font-bold">Dr. Carlos V.</span></div>
                              <div className="flex justify-between"><span className="text-purple-800/70 font-bold">Recepción Muestra:</span><span className="text-purple-900 font-bold">18/01/24 08:30</span></div>
                              <div className="flex justify-between"><span className="text-purple-800/70 font-bold">Nivel Contención:</span><span className="text-purple-900 font-bold">BSL-2</span></div>
                           </div>
                        </div>
                      </div>

                      {/* BLOQUE 2: Checklist Preparación de Medios y Esterilidad */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">2. Checklist Pre-Analítico y Medios</h3>
                        <div className="space-y-2">
                           {[
                             { label: "Cabina de Bioseguridad purgada", status: "ok" },
                             { label: "Prueba de promoción de crecimiento de Agart", status: "ok" },
                             { label: "Esterilidad de diluyentes confirmada", status: "ok" },
                             { label: "Cepas de referencia viables (≤ 5 pases)", status: "warning" },
                           ].map((item, i) => (
                             <div key={i} className={`flex items-center justify-between p-2.5 rounded border ${
                               item.status === 'ok' ? 'border-green-200 bg-green-50/50' : 'border-yellow-200 bg-yellow-50/50'
                             }`}>
                               <span className="text-[10px] text-slate-700 font-medium">{item.label}</span>
                               {item.status === 'ok' ? <CheckCircle2 className="w-3.5 h-3.5 text-success" /> : <AlertCircle className="w-3.5 h-3.5 text-yellow-600" />}
                             </div>
                           ))}
                        </div>
                      </div>

                      {/* BLOQUE 6: Trazabilidad Ambiental y Controles */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">6. Trazabilidad de Controles</h3>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-[10px] shadow-sm">
                           <div className="flex justify-between border-b border-slate-200 pb-2 mb-2">
                              <span className="font-bold text-slate-700 flex items-center gap-1.5"><Bug className="w-3 h-3"/> Control Positivo (S. aureus)</span>
                              <span className="text-green-600 font-bold">Crecimiento OK</span>
                           </div>
                           <div className="flex justify-between border-b border-slate-200 pb-2 mb-2">
                              <span className="font-bold text-slate-700 flex items-center gap-1.5"><Ban className="w-3 h-3"/> Control Negativo (Blanco)</span>
                              <span className="text-green-600 font-bold">Limpio (0 UFC)</span>
                           </div>
                           <div className="flex justify-between pb-1">
                              <span className="font-bold text-slate-700 flex items-center gap-1.5"><Wind className="w-3 h-3"/> Monitoreo Ambiental (Placa expuesta)</span>
                              <span className="text-slate-500">En incubación</span>
                           </div>
                        </div>
                      </div>

                    </div>

                    {/* Panel Central/Derecho: Ensayos, Incubación, Lectura */}
                    <div className="space-y-6 xl:col-span-2">
                      
                      {/* BLOQUE 3: Matriz de Siembra (Flujo de Trabajo) */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">3. Matriz de Siembra</h3>
                        </div>
                        <table className="w-full text-xs text-left border border-slate-200 rounded-md overflow-hidden shadow-sm">
                          <thead className="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-500 uppercase font-bold">
                            <tr><th className="px-3 py-2">Ensayo</th><th className="px-3 py-2">Medio</th><th className="px-3 py-2">Especificación</th><th className="px-3 py-2 text-right">Estado</th></tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-3 py-3"><p className="font-bold text-slate-900">Recuento de Aerobios Mesófilos</p><p className="text-[10px] text-slate-500">Siembra en placa</p></td>
                              <td className="px-3 py-3 font-medium text-slate-700">Agar TSA</td>
                              <td className="px-3 py-3 text-slate-600">≤ 10^3 UFC/g</td>
                              <td className="px-3 py-3 text-right"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-[10px] font-bold">Incubando</span></td>
                            </tr>
                            <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-3 py-3"><p className="font-bold text-slate-900">Recuento de Hongos y Levaduras</p><p className="text-[10px] text-slate-500">Siembra en placa</p></td>
                              <td className="px-3 py-3 font-medium text-slate-700">Agar Sabouraud</td>
                              <td className="px-3 py-3 text-slate-600">≤ 10^2 UFC/g</td>
                              <td className="px-3 py-3 text-right"><span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-[10px] font-bold">Incubando</span></td>
                            </tr>
                            <tr className="hover:bg-slate-50 transition-colors">
                              <td className="px-3 py-3"><p className="font-bold text-slate-900">Detección de E. coli</p><p className="text-[10px] text-slate-500">Caldo MacConkey</p></td>
                              <td className="px-3 py-3 font-medium text-slate-700">Agar MacConkey</td>
                              <td className="px-3 py-3 text-slate-600">Ausencia en 1g</td>
                              <td className="px-3 py-3 text-right"><span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[10px] font-bold">Pendiente</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* BLOQUE 4: Control de Incubación (Tiempos Críticos) */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">4. Control Activo de Incubación</h3>
                        <div className="grid grid-cols-2 gap-4">
                           {/* Incubadora 1 */}
                           <div className="border border-purple-200 rounded-lg p-4 bg-purple-50/30 shadow-sm relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                              <div className="flex justify-between items-start mb-2">
                                 <div>
                                    <p className="text-xs font-bold text-purple-900">Aerobios Mesófilos</p>
                                    <p className="text-[10px] text-purple-700 flex items-center gap-1 mt-0.5"><Thermometer className="w-3 h-3"/> 30-35°C (Incubadora B2)</p>
                                 </div>
                                 <span className="text-[10px] font-bold text-purple-600 animate-pulse flex items-center gap-1"><Clock className="w-3 h-3"/> Activo</span>
                              </div>
                              <div className="flex items-end gap-3 mt-4">
                                 <div className="flex-1">
                                    <p className="text-[10px] text-slate-500 mb-1">Progreso (48h de 72h)</p>
                                    <div className="w-full bg-slate-200 rounded-full h-1.5"><div className="bg-purple-500 h-1.5 rounded-full w-[66%]"></div></div>
                                 </div>
                                 <div className="text-right">
                                    <p className="text-lg font-black text-slate-800">24h</p>
                                    <p className="text-[9px] uppercase font-bold text-slate-400">restantes</p>
                                 </div>
                              </div>
                           </div>
                           
                           {/* Incubadora 2 */}
                           <div className="border border-purple-200 rounded-lg p-4 bg-purple-50/30 shadow-sm relative overflow-hidden opacity-90">
                              <div className="absolute top-0 left-0 w-1 h-full bg-purple-400"></div>
                              <div className="flex justify-between items-start mb-2">
                                 <div>
                                    <p className="text-xs font-bold text-purple-900">Hongos y Levaduras</p>
                                    <p className="text-[10px] text-purple-700 flex items-center gap-1 mt-0.5"><Thermometer className="w-3 h-3"/> 20-25°C (Incubadora C1)</p>
                                 </div>
                                 <span className="text-[10px] font-bold text-purple-600 animate-pulse flex items-center gap-1"><Clock className="w-3 h-3"/> Activo</span>
                              </div>
                              <div className="flex items-end gap-3 mt-4">
                                 <div className="flex-1">
                                    <p className="text-[10px] text-slate-500 mb-1">Progreso (24h de 120h)</p>
                                    <div className="w-full bg-slate-200 rounded-full h-1.5"><div className="bg-purple-400 h-1.5 rounded-full w-[20%]"></div></div>
                                 </div>
                                 <div className="text-right">
                                    <p className="text-lg font-black text-slate-800">96h</p>
                                    <p className="text-[9px] uppercase font-bold text-slate-400">restantes</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                         {/* BLOQUE 5: Registro de Lectura (Datos Crudos) */}
                         <div>
                           <div className="flex justify-between items-center mb-3">
                              <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">5. Registro de Lectura (UFC)</h3>
                              <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 font-bold flex items-center gap-1"><Lock className="w-3 h-3"/> Bloqueado</span>
                           </div>
                           <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm relative overflow-hidden">
                              <div className="absolute inset-0 bg-slate-100/50 backdrop-blur-[1px] flex flex-col items-center justify-center z-10 border border-slate-200 rounded-lg">
                                 <Lock className="w-6 h-6 text-slate-400 mb-2" />
                                 <p className="text-[10px] font-bold text-slate-500 text-center px-4">La lectura estará disponible al finalizar el periodo oficial de incubación.</p>
                              </div>
                              <div className="space-y-3 opacity-30">
                                 <div>
                                    <label className="text-[10px] font-bold text-slate-600 uppercase">Dilución 10^-1 (Placa A/B)</label>
                                    <div className="flex gap-2 mt-1">
                                       <input disabled type="text" className="w-full border border-slate-300 rounded p-1 text-xs" placeholder="UFC" />
                                       <input disabled type="text" className="w-full border border-slate-300 rounded p-1 text-xs" placeholder="UFC" />
                                    </div>
                                 </div>
                                 <button disabled className="w-full bg-slate-400 text-white text-xs font-bold py-2 rounded mt-2">Registrar Lectura Oficial</button>
                              </div>
                           </div>
                         </div>

                         <div className="flex flex-col gap-4">
                            {/* BLOQUE 7: Panel de Crecimiento Atípico */}
                            <div className="flex-1 border border-dashed border-red-300 rounded-lg p-3 text-center bg-red-50/50 hover:bg-red-50 transition-colors cursor-pointer group flex flex-col items-center justify-center">
                               <Bug className="w-5 h-5 text-red-400 group-hover:text-red-500 mx-auto mb-1 transition-colors" />
                               <p className="text-xs font-bold text-red-700 transition-colors">Notificar Crecimiento Atípico</p>
                               <p className="text-[9px] text-red-500/70 mt-1">Reportar contaminación de placa, control negativo fallido o pérdida de viabilidad.</p>
                            </div>

                            {/* BLOQUE 8: Cierre y Liberación Microbiológica */}
                            <div className="flex-1 border-2 border-purple-200 bg-purple-50 rounded-lg p-3 flex flex-col justify-center shadow-sm">
                               <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs font-bold text-purple-900">Estado Micro</span>
                                  <span className="text-[9px] bg-white border border-purple-200 text-purple-700 px-1.5 py-0.5 rounded font-bold">0/3 Lecturas</span>
                               </div>
                               <p className="text-[9px] text-purple-700 leading-tight mb-2">Finalice incubaciones y registre UFC para habilitar cierre.</p>
                               <button disabled className="w-full bg-slate-300 text-slate-500 font-bold py-1.5 rounded text-xs cursor-not-allowed">Liberar a STCC</button>
                            </div>
                         </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* TAB: STCC */}
              {activeTab === "stcc" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Action Bar STCC */}
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Jefatura STCC — Revisión de Paquetes Analíticos</h3>
                    <div className="flex gap-2">
                      <button className="bg-white border border-red-300 text-red-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-red-50 shadow-sm flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" /> Devolver a Analista (Reanálisis)</button>
                      <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-slate-100 shadow-sm flex items-center gap-1.5"><FileDigit className="w-3.5 h-3.5" /> Generar Borrador RT-20</button>
                      <button className="bg-primary text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-primary-dark shadow-sm flex items-center gap-1.5">Aprobar Paquetes y Pasar a DT</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    
                    {/* Columna Izquierda: Auditoría de Laboratorio */}
                    <div className="space-y-6">
                      
                      {/* BLOQUE 1: Recepción de Paquetes Analíticos */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">1. Estado de Paquetes Recibidos</h3>
                        <div className="grid grid-cols-2 gap-3">
                           {/* Paquete FFQQ */}
                           <div className="bg-slate-50 border border-slate-200 rounded-md p-3 relative overflow-hidden">
                              <div className="flex justify-between items-start mb-2">
                                 <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5"><FlaskConical className="w-3.5 h-3.5 text-slate-500"/> Área Físico-Química</p>
                                 <span className="bg-slate-200 text-slate-600 text-[9px] font-bold px-1.5 py-0.5 rounded">Pendiente</span>
                              </div>
                              <p className="text-[10px] text-slate-500 leading-tight">1/3 Ensayos completados. El paquete analítico RT-38 aún no ha sido liberado por el analista.</p>
                              <div className="mt-3 w-full bg-slate-200 rounded-full h-1"><div className="bg-slate-400 h-1 rounded-full w-[33%]"></div></div>
                           </div>
                           
                           {/* Paquete Micro */}
                           <div className="bg-slate-50 border border-slate-200 rounded-md p-3 relative overflow-hidden">
                              <div className="flex justify-between items-start mb-2">
                                 <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5"><Microscope className="w-3.5 h-3.5 text-slate-500"/> Área Microbiología</p>
                                 <span className="bg-slate-200 text-slate-600 text-[9px] font-bold px-1.5 py-0.5 rounded">Pendiente</span>
                              </div>
                              <p className="text-[10px] text-slate-500 leading-tight">Ensayos en periodo de incubación oficial. Lectura de UFC bloqueada temporalmente.</p>
                              <div className="mt-3 w-full bg-slate-200 rounded-full h-1"><div className="bg-slate-400 h-1 rounded-full w-[10%]"></div></div>
                           </div>
                        </div>
                      </div>

                      {/* BLOQUE 2: Auditoría de Datos Crudos (Data Integrity) */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">2. Auditoría de Data Integrity (ALCOA+)</h3>
                           <span className="text-[9px] font-bold text-primary cursor-pointer hover:underline">Ver Cuadernos de Banco</span>
                        </div>
                        <div className="space-y-2">
                           {[
                             { label: "Correlación de pesos (Balanza Analítica vs Registro)", status: "pending" },
                             { label: "Trazabilidad de espectros/cromatogramas originales", status: "pending" },
                             { label: "Fórmulas de cálculo de porcentaje de valoración", status: "pending" },
                             { label: "Identidad de operador (Audit Trail de equipos)", status: "pending" },
                           ].map((item, i) => (
                             <div key={i} className="flex items-center justify-between p-2.5 rounded border border-slate-200 bg-white shadow-sm">
                               <span className="text-[10px] text-slate-600">{item.label}</span>
                               <Clock className="w-3.5 h-3.5 text-slate-400" />
                             </div>
                           ))}
                        </div>
                        <p className="text-[9px] text-slate-400 mt-2 text-center">La auditoría se habilitará cuando se reciban los paquetes analíticos completos.</p>
                      </div>

                      {/* BLOQUE 5: Revisión de Trazabilidad Química */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">5. Auditoría de Reactivos y Estándares</h3>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-1 shadow-sm">
                           <table className="w-full text-[10px] text-left">
                              <tbody className="divide-y divide-slate-100">
                                 <tr className="hover:bg-slate-100/50">
                                    <td className="px-3 py-2 text-slate-600 font-bold">Estándar Primario (RG-44)</td>
                                    <td className="px-3 py-2 text-slate-500">Amoxicilina USP Lote J0L496</td>
                                    <td className="px-3 py-2 text-right"><span className="text-success font-bold flex items-center justify-end gap-1"><CheckCircle2 className="w-3 h-3"/> Válido</span></td>
                                 </tr>
                                 <tr className="hover:bg-slate-100/50">
                                    <td className="px-3 py-2 text-slate-600 font-bold">Reactivos Críticos (RG-59)</td>
                                    <td className="px-3 py-2 text-slate-500">Acetonitrilo HPLC (MK-8921)</td>
                                    <td className="px-3 py-2 text-right"><span className="text-slate-400 font-bold flex items-center justify-end gap-1"><Clock className="w-3 h-3"/> En Revisión</span></td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                      </div>

                      {/* BLOQUE 7: Emisión de Observaciones Analíticas */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">7. Observaciones Técnicas Internas</h3>
                           <button className="text-[10px] font-bold text-red-600 hover:underline flex items-center gap-1">+ Nueva Observación</button>
                        </div>
                        <div className="border border-dashed border-slate-300 rounded-lg p-5 text-center bg-slate-50">
                           <p className="text-xs font-bold text-slate-500">No hay observaciones registradas</p>
                           <p className="text-[10px] text-slate-400 mt-1">Cree una observación si detecta errores de cálculo o desvíos a la PNO para devolver el paquete al analista.</p>
                        </div>
                      </div>

                    </div>

                    {/* Columna Derecha: Consolidación y Aprobación */}
                    <div className="space-y-6">
                      
                      {/* BLOQUE 3: Verificación de Cumplimiento de Especificaciones */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">3. Verificación de Especificaciones</h3>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-md overflow-hidden shadow-sm">
                           <table className="w-full text-[10px] text-left">
                              <thead className="bg-white border-b border-slate-200 text-slate-500 uppercase font-bold">
                                 <tr><th className="px-3 py-2">Parámetro</th><th className="px-3 py-2">Límite Oficial</th><th className="px-3 py-2">Obtenido</th><th className="px-3 py-2 text-center">Dictamen</th></tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 bg-white">
                                 {/* Fila Completada */}
                                 <tr className="hover:bg-slate-50">
                                    <td className="px-3 py-2 font-bold text-slate-800">Aspecto</td>
                                    <td className="px-3 py-2 text-slate-500">Cápsulas cilíndricas bicolor</td>
                                    <td className="px-3 py-2 text-slate-800">Conforme al estándar</td>
                                    <td className="px-3 py-2 text-center"><span className="bg-green-100 text-success px-1.5 py-0.5 rounded font-bold">CUMPLE</span></td>
                                 </tr>
                                 {/* Filas Pendientes */}
                                 <tr className="bg-slate-50/50">
                                    <td className="px-3 py-2 font-bold text-slate-600">Disolución</td>
                                    <td className="px-3 py-2 text-slate-500">NLT 80% en 45 min</td>
                                    <td className="px-3 py-2 text-slate-400 italic">Esperando paquete...</td>
                                    <td className="px-3 py-2 text-center"><span className="bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded font-bold">-</span></td>
                                 </tr>
                                 <tr className="bg-slate-50/50">
                                    <td className="px-3 py-2 font-bold text-slate-600">Valoración</td>
                                    <td className="px-3 py-2 text-slate-500">90.0% — 120.0%</td>
                                    <td className="px-3 py-2 text-slate-400 italic">Esperando paquete...</td>
                                    <td className="px-3 py-2 text-center"><span className="bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded font-bold">-</span></td>
                                 </tr>
                                 <tr className="bg-slate-50/50">
                                    <td className="px-3 py-2 font-bold text-slate-600">E. coli</td>
                                    <td className="px-3 py-2 text-slate-500">Ausencia/g</td>
                                    <td className="px-3 py-2 text-slate-400 italic">Incubando...</td>
                                    <td className="px-3 py-2 text-center"><span className="bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded font-bold">-</span></td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                         {/* BLOQUE 4: Gestión de Desviaciones (Fase II) */}
                         <div>
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">4. Evaluaciones OOS/OOT</h3>
                           <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex flex-col items-center justify-center text-center h-[120px]">
                              <CheckCircle2 className="w-8 h-8 text-slate-200 mb-2" />
                              <p className="text-[10px] font-bold text-slate-500">Sin investigaciones Fase I activas provenientes de los analistas.</p>
                           </div>
                         </div>

                         {/* BLOQUE 6: Generación del Dictamen Técnico (RT-20) */}
                         <div>
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">6. Borrador de Certificado (RT-20)</h3>
                           <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm flex flex-col items-center justify-center text-center h-[120px] relative overflow-hidden">
                              <FileDigit className="w-16 h-16 text-slate-200 absolute -right-4 -bottom-4 z-0" />
                              <div className="relative z-10">
                                 <p className="text-[10px] font-bold text-slate-500 mb-2">Generación Automática</p>
                                 <button disabled className="bg-slate-300 text-slate-500 font-bold px-3 py-1.5 rounded text-[10px] shadow-sm cursor-not-allowed">Previsualizar Formato</button>
                              </div>
                           </div>
                         </div>
                      </div>

                      {/* BLOQUE 8: Aprobación y Pase a Dirección Técnica (DT) */}
                      <div className="pt-2">
                         <div className="border-2 border-slate-200 bg-white rounded-lg p-4 flex flex-col justify-center shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-slate-300"></div>
                            <div className="flex justify-between items-center mb-2 pl-2">
                               <div>
                                  <p className="text-xs font-bold text-slate-800 uppercase mb-0.5">Autorización de Jefatura STCC</p>
                                  <p className="text-sm font-black text-slate-400">Pase a Dirección Bloqueado</p>
                               </div>
                               <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
                                  <Lock className="w-4 h-4 text-slate-400" />
                               </div>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-2 pl-2">Se requiere que las áreas operativas (FFQQ y Micro) completen sus ensayos, liberen los paquetes, y que la auditoría ALCOA+ sea conforme para habilitar la firma de Jefatura y trasladar el expediente a la Dirección Técnica.</p>
                         </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* TAB: DIRECCIÓN TÉCNICA (DT) */}
              {activeTab === "dt" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Action Bar DT */}
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary" /> Dirección Técnica — Decisión Técnica del Expediente</h3>
                    <div className="flex gap-2">
                      <button className="bg-white border border-red-300 text-red-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-red-50 shadow-sm flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5" /> Rechazar Lote</button>
                      <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-slate-100 shadow-sm flex items-center gap-1.5"><FileDigit className="w-3.5 h-3.5" /> Ver RT-20 (Borrador STCC)</button>
                      <button className="bg-primary text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-primary-dark shadow-sm flex items-center gap-1.5">Aprobar Lote y Pasar a DG</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    
                    {/* Columna Izquierda: Auditoría Regulatoria y Documental */}
                    <div className="space-y-6">
                      
                      {/* BLOQUE 1: Expediente Consolidado */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">1. Estado del Expediente Consolidado</h3>
                        <div className="bg-slate-50 border border-slate-200 rounded-md p-3 grid grid-cols-2 gap-3 shadow-sm">
                           <div className="flex justify-between items-center bg-white border border-slate-100 p-2 rounded">
                              <span className="text-[10px] font-bold text-slate-700 flex items-center gap-1"><Files className="w-3.5 h-3.5 text-slate-400"/> Legal (DOCT)</span>
                              <span className="bg-slate-200 text-slate-600 text-[9px] font-bold px-1.5 py-0.5 rounded">Pendiente</span>
                           </div>
                           <div className="flex justify-between items-center bg-white border border-slate-100 p-2 rounded">
                              <span className="text-[10px] font-bold text-slate-700 flex items-center gap-1"><FlaskConical className="w-3.5 h-3.5 text-slate-400"/> Calidad (STCC)</span>
                              <span className="bg-slate-200 text-slate-600 text-[9px] font-bold px-1.5 py-0.5 rounded">Pendiente</span>
                           </div>
                           <div className="col-span-2">
                              <p className="text-[9px] text-slate-500 text-center">La Dirección Técnica no puede emitir un dictamen final sin la conjunción del aval legal (DOCT) y analítico (STCC).</p>
                           </div>
                        </div>
                      </div>

                      {/* BLOQUE 4: Revisión Legal / Normativa */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">4. Cumplimiento Regulatorio (ARSA / SESAL)</h3>
                        <div className="space-y-2">
                           {[
                             { label: "Validación de Registro Sanitario Vigente", status: "pending" },
                             { label: "Correspondencia de Farmacopea Declarada (USP/BP/EP)", status: "pending" },
                             { label: "Verificación de Alertas Sanitarias (Recall) activas", status: "pending" },
                           ].map((item, i) => (
                             <div key={i} className="flex items-center justify-between p-2.5 rounded border border-slate-200 bg-white shadow-sm">
                               <span className="text-[10px] text-slate-600 font-medium">{item.label}</span>
                               <Clock className="w-3.5 h-3.5 text-slate-400" />
                             </div>
                           ))}
                        </div>
                      </div>

                      {/* BLOQUE 5: Evaluación de Impacto de Desviaciones */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">5. Análisis de Riesgo y Desviaciones</h3>
                           <button className="text-[9px] font-bold text-primary hover:underline">+ Levantar Riesgo</button>
                        </div>
                        <div className="border border-dashed border-slate-300 rounded-lg p-5 text-center bg-slate-50">
                           <ShieldAlert className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                           <p className="text-xs font-bold text-slate-500">Sin impacto reportado</p>
                           <p className="text-[10px] text-slate-400 mt-1">Si STCC reportó un OOS validado que impacte la seguridad del paciente, DT documentará aquí el Riesgo Sanitario.</p>
                        </div>
                      </div>

                      {/* BLOQUE 7: Liquidación Financiera */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">7. Estatus de Liquidación Financiera</h3>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-1 shadow-sm">
                           <table className="w-full text-[10px] text-left">
                              <tbody className="divide-y divide-slate-100">
                                 <tr className="hover:bg-slate-100/50">
                                    <td className="px-3 py-2 text-slate-600 font-bold">Proforma / Cotización</td>
                                    <td className="px-3 py-2 text-slate-500">N° PROF-2024-0089</td>
                                    <td className="px-3 py-2 text-right"><span className="text-success font-bold flex items-center justify-end gap-1"><CheckCircle2 className="w-3 h-3"/> Pagada</span></td>
                                 </tr>
                                 <tr className="hover:bg-slate-100/50">
                                    <td className="px-3 py-2 text-slate-600 font-bold">Factura Autorizada (SAR)</td>
                                    <td className="px-3 py-2 text-slate-500">-</td>
                                    <td className="px-3 py-2 text-right"><span className="text-slate-400 font-bold flex items-center justify-end gap-1"><Clock className="w-3 h-3"/> Pendiente Emisión</span></td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                      </div>

                    </div>

                    {/* Columna Derecha: Decisión y Certificación */}
                    <div className="space-y-6">
                      
                      {/* BLOQUE 2: Decisión Técnica (Aprobación/Rechazo del Lote) */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">2. Dictamen Oficial de Dirección Técnica</h3>
                           <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 font-bold flex items-center gap-1"><Lock className="w-3 h-3"/> Bloqueado</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-md p-4 shadow-sm relative overflow-hidden">
                           <div className="absolute inset-0 bg-slate-100/50 backdrop-blur-[1px] flex flex-col items-center justify-center z-10 border border-slate-200 rounded-md">
                              <Lock className="w-6 h-6 text-slate-400 mb-2" />
                              <p className="text-[10px] font-bold text-slate-500 text-center px-4">Requiere aprobación previa de Jefatura STCC para emitir dictamen.</p>
                           </div>
                           <p className="text-xs font-bold text-slate-700 mb-3 opacity-30">Seleccione la disposición final para el producto analizado:</p>
                           <div className="grid grid-cols-3 gap-3 opacity-30">
                              <button disabled className="border-2 border-green-200 bg-green-50 text-green-700 font-bold py-3 rounded text-[10px] flex flex-col items-center gap-1"><CheckCircle2 className="w-5 h-5"/> APROBADO</button>
                              <button disabled className="border-2 border-red-200 bg-red-50 text-red-700 font-bold py-3 rounded text-[10px] flex flex-col items-center gap-1"><Ban className="w-5 h-5"/> RECHAZADO</button>
                              <button disabled className="border-2 border-slate-300 bg-white text-slate-700 font-bold py-3 rounded text-[10px] flex flex-col items-center gap-1"><ShieldAlert className="w-5 h-5"/> DECOMISO</button>
                           </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                         {/* BLOQUE 3: Emisión del Certificado Oficial (RT-20 Firmado) */}
                         <div>
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">3. Certificado RT-20 Oficial</h3>
                           <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex flex-col items-center justify-center text-center h-[120px] relative overflow-hidden">
                              <FileDigit className="w-16 h-16 text-slate-100 absolute -right-2 -bottom-2 z-0" />
                              <div className="relative z-10">
                                 <p className="text-[10px] font-bold text-slate-500 mb-2">Firma Digital (DT)</p>
                                 <button disabled className="bg-slate-300 text-slate-500 font-bold px-3 py-1.5 rounded text-[10px] shadow-sm cursor-not-allowed">Aplicar Firma y Sellar</button>
                              </div>
                           </div>
                         </div>

                         {/* BLOQUE 6: Generación de Oficio de Notificación a ARSA */}
                         <div>
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">6. Alerta Sanitaria Regulatoria</h3>
                           <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm flex flex-col items-center justify-center text-center h-[120px]">
                              <ShieldCheck className="w-8 h-8 text-slate-300 mb-2" />
                              <p className="text-[10px] font-bold text-slate-500">Notificación automática a ARSA inactiva. Solo aplica para dictamen "Rechazado" o "Decomiso".</p>
                           </div>
                         </div>
                      </div>

                      {/* BLOQUE 8: Cierre de Expediente y Pase a Dirección General */}
                      <div className="pt-2">
                         <div className="border-2 border-slate-200 bg-white rounded-lg p-4 flex flex-col justify-center shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-slate-300"></div>
                            <div className="flex justify-between items-center mb-2 pl-2">
                               <div>
                                  <p className="text-xs font-bold text-slate-800 uppercase mb-0.5">Traslado a Dirección General</p>
                                  <p className="text-sm font-black text-slate-400">Pase a DG Bloqueado</p>
                               </div>
                               <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
                                  <Lock className="w-4 h-4 text-slate-400" />
                               </div>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-2 pl-2">Para transferir el expediente a la Dirección General para su revisión administrativa final, es mandatorio emitir el dictamen técnico, aplicar la firma digital en el RT-20 y asegurar la liquidación financiera del cliente.</p>
                         </div>
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* TAB: DIRECCIÓN GENERAL (DG) */}
              {activeTab === "dg" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Action Bar DG */}
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2"><Building2 className="w-4 h-4 text-primary" /> Dirección General — Aprobación Final y Cierre Comercial</h3>
                    <div className="flex gap-2">
                      <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-slate-100 shadow-sm flex items-center gap-1.5"><PauseCircle className="w-3.5 h-3.5" /> Pausar Trámite Administrativo</button>
                      <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded-md text-xs font-bold hover:bg-slate-100 shadow-sm flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> Descargar Dossier Completo</button>
                      <button className="bg-primary text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-primary-dark shadow-sm flex items-center gap-1.5">Liberar Expediente al Cliente</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    
                    {/* Columna Izquierda: Auditoría Ejecutiva y KPIs */}
                    <div className="space-y-6">
                      
                      {/* BLOQUE 1: Resumen Ejecutivo del Expediente */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">1. Executive Summary (Expediente)</h3>
                        <div className="bg-slate-50 border border-slate-200 rounded-md p-4 grid grid-cols-2 gap-4 shadow-sm">
                           <div>
                              <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Turnaround Time (TAT)</p>
                              <div className="flex items-end gap-2">
                                 <p className="text-3xl font-black text-slate-800">14<span className="text-sm text-slate-500 font-bold">días</span></p>
                                 <span className="bg-green-100 text-success text-[9px] font-bold px-1.5 py-0.5 rounded mb-1">En tiempo</span>
                              </div>
                           </div>
                           <div>
                              <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Dictamen Dirección Técnica</p>
                              <div className="flex items-center gap-2 mt-2">
                                 <CheckCircle2 className="w-6 h-6 text-slate-300" />
                                 <span className="text-sm font-bold text-slate-400">Pendiente Aval</span>
                              </div>
                           </div>
                        </div>
                      </div>

                      {/* BLOQUE 2: Auditoría de Costos vs Precios (KPI de Rentabilidad) */}
                      <div>
                        <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">2. Auditoría Operativa (Costos / Rentabilidad)</h3>
                        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                           <div className="flex justify-between items-center mb-3 pb-3 border-b border-slate-100">
                              <span className="text-[10px] font-bold text-slate-600">Precio Facturado (L.)</span>
                              <span className="text-sm font-black text-primary">12,500.00</span>
                           </div>
                           <div className="space-y-2">
                              <div className="flex justify-between text-[10px]">
                                 <span className="text-slate-500">Costo Horas-Hombre (HH) Estimado</span>
                                 <span className="font-bold text-red-600/80">- 3,200.00</span>
                              </div>
                              <div className="flex justify-between text-[10px]">
                                 <span className="text-slate-500">Costo Materiales/Reactivos (RM)</span>
                                 <span className="font-bold text-red-600/80">- 4,100.00</span>
                              </div>
                              <div className="flex justify-between text-xs font-bold pt-2 border-t border-slate-100">
                                 <span className="text-slate-800">Margen Bruto Proyectado</span>
                                 <span className="text-success">5,200.00 (41.6%)</span>
                              </div>
                           </div>
                        </div>
                      </div>

                      {/* BLOQUE 4: Gestión Documental y Archivo */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">4. Disposición de Archivo Permanente</h3>
                           <button className="text-[9px] font-bold text-primary hover:underline flex items-center gap-1"><Printer className="w-3 h-3"/> Imprimir Label</button>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 shadow-sm flex items-center gap-3">
                           <div className="w-10 h-10 bg-slate-200 rounded flex items-center justify-center">
                              <QrCode className="w-6 h-6 text-slate-500" />
                           </div>
                           <div>
                              <p className="text-xs font-bold text-slate-800">Caja de Archivo: <span className="text-primary font-mono">AR-2024-C12</span></p>
                              <p className="text-[10px] text-slate-500">Ubicación física: Pasillo A, Estante 4. Destrucción programada: 2029.</p>
                           </div>
                        </div>
                      </div>

                    </div>

                    {/* Columna Derecha: Refrendo y Cierre Financiero */}
                    <div className="space-y-6">
                      
                      {/* BLOQUE 3: Visto Bueno Administrativo */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">3. Visto Bueno Administrativo</h3>
                           <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 font-bold flex items-center gap-1"><Lock className="w-3 h-3"/> Bloqueado</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-md p-4 shadow-sm relative overflow-hidden">
                           <div className="absolute inset-0 bg-slate-100/50 backdrop-blur-[1px] flex flex-col items-center justify-center z-10 border border-slate-200 rounded-md">
                              <Lock className="w-6 h-6 text-slate-400 mb-2" />
                              <p className="text-[10px] font-bold text-slate-500 text-center px-4">En espera de autorización de la Dirección Técnica.</p>
                           </div>
                           <div className="space-y-2 opacity-30">
                              <div className="flex items-center gap-2 p-2 rounded border border-slate-200 bg-white">
                                 <input disabled type="checkbox" className="w-4 h-4 rounded text-primary" />
                                 <span className="text-[10px] text-slate-700 font-bold">Sin actas de descargo o notas de débito pendientes.</span>
                              </div>
                              <div className="flex items-center gap-2 p-2 rounded border border-slate-200 bg-white">
                                 <input disabled type="checkbox" className="w-4 h-4 rounded text-primary" />
                                 <span className="text-[10px] text-slate-700 font-bold">Cliente solvente a nivel corporativo.</span>
                              </div>
                           </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                         {/* BLOQUE 6: Emisión de Factura Final */}
                         <div>
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">6. Emisión Factura Final (CAI)</h3>
                           <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex flex-col items-center justify-center text-center h-[120px] relative overflow-hidden">
                              <Receipt className="w-16 h-16 text-slate-100 absolute -left-2 -bottom-2 z-0" />
                              <div className="relative z-10 w-full">
                                 <button disabled className="w-full bg-slate-300 text-slate-500 font-bold px-3 py-2 rounded text-[10px] shadow-sm cursor-not-allowed">Autorizar Timbrado CAI</button>
                                 <p className="text-[9px] text-slate-400 mt-2">Reemplaza Proforma 0089</p>
                              </div>
                           </div>
                         </div>

                         {/* BLOQUE 5: Firma Electrónica Gerencial */}
                         <div>
                           <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3">5. Refrendo Dirección General</h3>
                           <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-sm flex flex-col items-center justify-center text-center h-[120px]">
                              <p className="text-[10px] font-bold text-slate-300 mb-2">Firma Autorizada</p>
                              <button disabled className="bg-slate-600 text-slate-400 font-bold px-4 py-2 rounded text-[10px] cursor-not-allowed border border-slate-500">Refrendar Certificado</button>
                           </div>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 pt-2">
                         {/* BLOQUE 7: Cierre de Ciclo en ERP/CRM */}
                         <div className="border border-slate-200 bg-slate-50 rounded-lg p-3 flex flex-col justify-center">
                            <p className="text-[10px] font-bold text-slate-600 mb-2 uppercase">7. Integración Cliente</p>
                            <div className="flex items-center gap-2">
                               <input type="checkbox" checked disabled className="w-3.5 h-3.5 rounded text-primary" />
                               <span className="text-[10px] text-slate-500">Enviar correo automático al cliente con Certificado y Factura.</span>
                            </div>
                         </div>

                         {/* BLOQUE 8: Liberación del Expediente y Cierre */}
                         <div className="border border-slate-200 bg-white rounded-lg p-3 flex flex-col justify-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-slate-300"></div>
                            <div className="pl-2">
                               <p className="text-xs font-bold text-slate-800 uppercase mb-0.5">Estado Final</p>
                               <span className="bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded text-[10px] border border-slate-200">En Proceso (No Liberado)</span>
                            </div>
                         </div>
                      </div>

                    </div>
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
