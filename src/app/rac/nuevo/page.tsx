"use client";

import { useState } from "react";
import { ArrowLeft, Save, CheckCircle2, ChevronRight, User, Package, Building, Hash, FileText, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { catalogoTramites } from "@/lib/mockData";

export default function NuevoIngresoRAC() {
  const [step, setStep] = useState(1);
  const [tramiteS, setTramiteS] = useState("");

  const tramiteObj = catalogoTramites.find(t => t.value === tramiteS);

  const steps = [
    { id: 1, name: "Datos del Trámite", icon: <User className="w-4 h-4" /> },
    { id: 2, name: "Producto", icon: <Package className="w-4 h-4" /> },
    { id: 3, name: "Cliente / Externo", icon: <Building className="w-4 h-4" /> },
    { id: 4, name: "Cantidades", icon: <Hash className="w-4 h-4" /> },
    { id: 5, name: "Documentos", icon: <FileText className="w-4 h-4" /> },
    { id: 6, name: "Validación", icon: <ClipboardCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 flex flex-col xl:flex-row gap-8 items-start">
      
      {/* Sidebar Navigation */}
      <div className="w-full xl:w-72 bg-white rounded-lg border border-slate-200 shadow-sm p-4 sticky top-6">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
          <Link href="/rac" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight leading-tight">Nuevo Ingreso</h1>
            <p className="text-slate-500 text-[11px] uppercase tracking-wider font-bold mt-0.5">Flujo RAC</p>
          </div>
        </div>

        <nav className="space-y-1">
          {steps.map((s) => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-bold transition-colors ${
                step === s.id 
                  ? "bg-primary text-white shadow-sm" 
                  : step > s.id 
                    ? "text-slate-700 hover:bg-slate-50" 
                    : "text-slate-400 cursor-not-allowed"
              }`}
              disabled={step < s.id && step !== s.id - 1} // Can only advance sequentially
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                step === s.id ? "border-white/30 bg-white/20" : 
                step > s.id ? "border-primary text-primary bg-primary/10" : "border-slate-200 bg-slate-50"
              }`}>
                {step > s.id ? <CheckCircle2 className="w-4 h-4" /> : s.id}
              </div>
              <span className="flex-1 text-left">{s.name}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-slate-100">
           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1.5">Estado de Captura</p>
           <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200">
             Borrador Activo
           </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full bg-white rounded-lg border border-slate-200 shadow-sm p-8">
        
        {/* PASO 1: Datos del Trámite */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
              <User className="w-5 h-5 text-primary" /> Paso 1: Datos del Trámite
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Tipo de Trámite <span className="text-danger">*</span></label>
                <select 
                  value={tramiteS}
                  onChange={(e) => setTramiteS(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="">Seleccione...</option>
                  {catalogoTramites.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Prioridad <span className="text-danger">*</span></label>
                <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>Normal</option>
                  <option>Urgente</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Fecha de Recepción <span className="text-danger">*</span></label>
                <input type="date" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Hora de Recepción <span className="text-danger">*</span></label>
                <input type="time" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Mes de Recepción</label>
                <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>Enero</option>
                  <option>Febrero</option>
                  <option>Marzo</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Responsable RAC <span className="text-danger">*</span></label>
                <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>Karla Suazo</option>
                  <option>Jorge Matute</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Subtipo / Modalidad</label>
                <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>Nacional</option>
                  <option>Internacional</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Requiere Pago Previo <span className="text-danger">*</span></label>
                <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>Sí</option>
                  <option>No</option>
                </select>
              </div>
              
              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Estado Inicial del Producto</label>
                <textarea rows={3} className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary"></textarea>
              </div>
            </div>
          </div>
        )}

        {/* PASO 2: Producto */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Package className="w-5 h-5 text-primary" /> Paso 2: Producto
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Nombre Comercial <span className="text-danger">*</span></label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Nombre Genérico <span className="text-danger">*</span></label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Principio Activo (DCI)</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Concentración <span className="text-danger">*</span></label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Forma Farmacéutica <span className="text-danger">*</span></label>
                <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>Tabletas</option>
                  <option>Cápsulas</option>
                  <option>Jarabe</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Nº Lote <span className="text-danger">*</span></label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Fecha Fabricación (MM/AAAA)</label>
                <input type="text" placeholder="Ej. 01/2024" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Fecha Expiración <span className="text-danger">*</span></label>
                <input type="date" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Registro Sanitario</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">País de Origen</label>
                <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>Honduras</option>
                  <option>El Salvador</option>
                  <option>Guatemala</option>
                </select>
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Fabricante</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Titular</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Droguería</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Representante Legal</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
            </div>
          </div>
        )}

        {/* PASO 3: Cliente / Ente Externo */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Building className="w-5 h-5 text-primary" /> Paso 3: Cliente / Ente Externo
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Tipo de Cliente <span className="text-danger">*</span></label>
                <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>Institucional Público</option>
                  <option>Empresa Privada</option>
                  <option>Persona Natural</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Nombre Institución <span className="text-danger">*</span></label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Nombre Solicitante <span className="text-danger">*</span></label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Cargo</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Teléfono <span className="text-danger">*</span></label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Correo <span className="text-danger">*</span></label>
                <input type="email" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Dirección</label>
                <textarea rows={2} className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary"></textarea>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Persona que Entrega</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Identificación</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
            </div>
          </div>
        )}

        {/* PASO 4: Cantidades y Ubicación */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Hash className="w-5 h-5 text-primary" /> Paso 4: Cantidades y Ubicación
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Cantidad Total <span className="text-danger">*</span></label>
                <input type="number" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary font-bold text-lg" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Unidad de Medida <span className="text-danger">*</span></label>
                <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>Unidades</option>
                  <option>Cajas</option>
                  <option>Blisters</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Cantidad para FFQQ</label>
                <input type="number" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Cantidad para Microbiología</label>
                <input type="number" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Cantidad Muestra Biblioteca</label>
                <input type="number" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Cantidad Devuelta</label>
                <input type="number" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-800 mb-2">Condiciones de Almacenamiento</h4>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Ubicación Física</label>
                <input type="text" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Condición Almacenamiento</label>
                <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>Temperatura Ambiente</option>
                  <option>Refrigeración (2-8°C)</option>
                  <option>Congelación (-20°C)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Temperatura (°C)</label>
                <input type="number" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Humedad (%)</label>
                <input type="number" className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
            </div>
          </div>
        )}

        {/* PASO 5: Referencias Documentales */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
              <FileText className="w-5 h-5 text-primary" /> Paso 5: Referencias Documentales
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Orden de Compra", id: "oc" },
                { label: "Expediente", id: "exp" },
                { label: "Licitación", id: "lic" },
                { label: "Carta / Oficio", id: "oficio" },
                { label: "Acta de Toma de Muestra (Nº y Fecha)", id: "acta" },
                { label: "Contrato", id: "contrato" },
                { label: "Resolución ARSA", id: "arsa" }
              ].map((doc, i) => (
                <div key={i} className="flex flex-col gap-1.5 p-4 border border-slate-200 rounded bg-slate-50">
                  <label className="text-xs font-bold text-slate-700 uppercase">{doc.label}</label>
                  <div className="flex gap-2 mt-1">
                    <input type="text" placeholder="Referencia / Número" className="flex-1 h-9 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary" />
                    <button className="bg-white border border-slate-300 hover:bg-slate-100 px-3 rounded text-xs font-bold text-slate-700 transition-colors shadow-sm">
                      Adjuntar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PASO 6: Observaciones y Validación */}
        {step === 6 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
              <ClipboardCheck className="w-5 h-5 text-primary" /> Paso 6: Observaciones y Validación
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Observaciones Generales</label>
                <textarea rows={3} className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary"></textarea>
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Observaciones Estado Físico Producto</label>
                <textarea rows={3} className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary"></textarea>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Requiere Estándar</label>
                <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>Sí</option>
                  <option>No</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Requiere Información Adicional</label>
                <select className="w-full h-10 px-3 bg-white border border-slate-300 rounded text-sm focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>Sí</option>
                  <option>No</option>
                </select>
              </div>

              <div className="col-span-1 md:col-span-2 pt-6 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-800 mb-4">Checkboxes de Confirmación Final</h4>
                <div className="space-y-3">
                  {[
                    "Verificación de documentos obligatorios completada.",
                    "Verificación de identidad del solicitante completada.",
                    "Verificación del estado físico de la muestra completada.",
                    "Certifico la veracidad de los datos ingresados en este formulario."
                  ].map((check, i) => (
                    <label key={i} className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded cursor-pointer hover:bg-slate-100 transition-colors">
                      <input type="checkbox" className="mt-0.5 w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary" />
                      <span className="text-sm font-medium text-slate-800">{check}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons Footer */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between">
          <button className="text-slate-500 hover:text-slate-800 font-bold text-sm flex items-center gap-2 transition-colors">
            <Save className="w-4 h-4" /> Guardar Borrador
          </button>
          <div className="flex gap-3">
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-5 py-2.5 rounded font-bold text-sm transition-colors shadow-sm"
              >
                Anterior
              </button>
            )}
            {step < 6 ? (
              <button 
                onClick={() => setStep(step + 1)}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded font-bold text-sm transition-colors shadow-sm flex items-center gap-2"
              >
                Siguiente <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                className="bg-success hover:bg-green-700 text-white px-8 py-2.5 rounded font-bold text-sm transition-colors shadow-sm flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Finalizar y Crear Ingreso
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
