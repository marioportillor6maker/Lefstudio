"use client";

import { useState } from "react";
import { ArrowLeft, Save, CheckCircle2, ChevronRight, User, Package, CreditCard, Beaker } from "lucide-react";
import Link from "next/link";
import { catalogoTramites } from "@/lib/mockData";

export default function NuevoIngresoRAC() {
  const [step, setStep] = useState(1);
  const [tramiteS, setTramiteS] = useState("");

  const tramiteObj = catalogoTramites.find(t => t.value === tramiteS);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Encabezado Rico */}
      <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/rac" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Registro de Nueva Muestra (RG-41)</h1>
            <p className="text-slate-500 text-sm mt-1">Capture los datos técnicos, administrativos y logísticos para iniciar el expediente.</p>
          </div>
        </div>
        <div className="text-right hidden md:block">
           <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Estado de Captura</p>
           <span className="inline-flex items-center px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
             Borrador No Guardado
           </span>
        </div>
      </div>

      {/* Wizard Stepper Real */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-8 relative max-w-3xl mx-auto">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 z-0 rounded-full"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary z-0 transition-all rounded-full"
            style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
          ></div>
          
          <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors ${step >= 1 ? 'bg-primary text-white border-primary' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
              {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : "1"}
            </div>
            <span className={`text-xs font-bold ${step >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>Datos Generales</span>
          </div>
          
          <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors ${step >= 2 ? 'bg-primary text-white border-primary' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
              {step > 2 ? <CheckCircle2 className="w-5 h-5" /> : "2"}
            </div>
            <span className={`text-xs font-bold ${step >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>Detalle Técnico Producto</span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors ${step >= 3 ? 'bg-primary text-white border-primary' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
              3
            </div>
            <span className={`text-xs font-bold ${step >= 3 ? 'text-slate-900' : 'text-slate-400'}`}>Logística y Cobro</span>
          </div>
        </div>

        {/* CONTENIDO DE LOS PASOS */}
        <div className="max-w-4xl mx-auto border-t border-slate-100 pt-8">
          
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 mb-6">
                 <User className="w-5 h-5 text-primary" />
                 <h3 className="text-lg font-bold text-slate-800">1. Tipo de Trámite y Solicitante</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-700">Tipo de Trámite Operativo <span className="text-danger">*</span></label>
                  <select 
                    value={tramiteS}
                    onChange={(e) => setTramiteS(e.target.value)}
                    className="w-full h-11 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none"
                  >
                    <option value="">Seleccione el tipo de trámite a procesar</option>
                    {catalogoTramites.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  {tramiteObj && (
                    <div className="mt-2 p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-800">
                      <strong>Requisitos de este trámite:</strong> {tramiteObj.documentosRequeridos.join(', ')} 
                      <br/><strong>Aplica cobro:</strong> {tramiteObj.requierePago ? "Sí (Se generará proforma en Paso 3)" : "No (Exento)"}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-700">Cliente / Solicitante Legal <span className="text-danger">*</span></label>
                  <input 
                    type="text" 
                    placeholder="Escriba para buscar o crear nuevo..."
                    className="w-full h-11 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-700">N° de Oficio / Acta de Toma de Muestra</label>
                  <input 
                    type="text" 
                    placeholder="Ej. OFICIO-001-2024"
                    className="w-full h-11 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-700">Persona Contacto (Cliente)</label>
                  <input 
                    type="text" 
                    placeholder="Nombre completo y número de teléfono"
                    className="w-full h-11 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 mb-6">
                 <Package className="w-5 h-5 text-primary" />
                 <h3 className="text-lg font-bold text-slate-800">2. Mapeo de Producto Farmacéutico (Matriz Técnica)</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Nombre Comercial <span className="text-danger">*</span></label>
                  <input type="text" className="w-full h-11 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Nombre Genérico <span className="text-danger">*</span></label>
                  <input type="text" className="w-full h-11 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Forma Farmacéutica <span className="text-danger">*</span></label>
                  <select className="w-full h-11 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:border-primary focus:ring-2 focus:ring-primary/20">
                    <option>Tableta</option>
                    <option>Cápsula</option>
                    <option>Suspensión</option>
                    <option>Solución Inyectable</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Concentración</label>
                  <input type="text" placeholder="Ej. 500mg" className="w-full h-11 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Lote <span className="text-danger">*</span></label>
                  <input type="text" className="w-full h-11 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Fecha Fabricación</label>
                  <input type="month" className="w-full h-11 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Fecha Vencimiento <span className="text-danger">*</span></label>
                  <input type="month" className="w-full h-11 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Registro Sanitario</label>
                  <input type="text" className="w-full h-11 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>

                <div className="col-span-3 flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Fabricante Declarado</label>
                  <input type="text" className="w-full h-11 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 mb-6">
                 <Beaker className="w-5 h-5 text-primary" />
                 <h3 className="text-lg font-bold text-slate-800">3. Recepción de Muestras y Logística (RT-159)</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">Desglose Físico</h4>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Cantidad Total Recibida <span className="text-danger">*</span></label>
                    <input type="text" placeholder="Ej. 120 Tabletas (12 Blisters)" className="w-full h-11 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                     <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Para FFQQ</label>
                        <input type="number" placeholder="Cant." className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded text-sm" />
                     </div>
                     <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Para Micro</label>
                        <input type="number" placeholder="Cant." className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded text-sm" />
                     </div>
                     <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Muestroteca</label>
                        <input type="number" placeholder="Cant." className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded text-sm" />
                     </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Condiciones Físicas al Recibir</label>
                    <textarea rows={3} className="w-full p-3 bg-white border border-slate-300 rounded-[5px] text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none" placeholder="Observaciones de integridad, cadena de frío, etc."></textarea>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">Proforma y Cobro</h4>
                  {tramiteObj?.requierePago ? (
                     <div className="bg-slate-50 border border-slate-200 rounded-md p-5 space-y-4">
                        <div className="flex items-center gap-3 text-slate-800">
                           <CreditCard className="w-5 h-5 text-primary" />
                           <span className="font-bold text-sm">Cálculo de Proforma (Automático)</span>
                        </div>
                        <p className="text-xs text-slate-500">Según el tipo de producto y trámite, se aplicarán los siguientes cargos del arancel CQFH:</p>
                        
                        <div className="space-y-2 text-sm border-t border-b border-slate-200 py-3">
                           <div className="flex justify-between"><span className="text-slate-600">Análisis Físico-Químico Base</span><span className="font-medium text-slate-900">L. 6,500.00</span></div>
                           <div className="flex justify-between"><span className="text-slate-600">Límites Microbianos</span><span className="font-medium text-slate-900">L. 4,000.00</span></div>
                           <div className="flex justify-between"><span className="text-slate-600">Derecho de Certificado RT-39</span><span className="font-medium text-slate-900">L. 2,000.00</span></div>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                           <span className="font-bold text-slate-900 text-lg">Total Proforma:</span>
                           <span className="font-black text-primary text-xl">L. 12,500.00</span>
                        </div>
                     </div>
                  ) : (
                     <div className="bg-slate-50 border border-slate-200 rounded-md p-6 flex flex-col items-center justify-center text-center">
                        <CheckCircle2 className="w-8 h-8 text-success mb-2" />
                        <p className="text-sm font-bold text-slate-800">Trámite Exento de Pago</p>
                        <p className="text-xs text-slate-500 mt-1">Este trámite no requiere emisión de proforma inicial.</p>
                     </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Barra de Acciones Fija */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-200">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2.5 rounded-[20px] font-medium text-sm transition-colors shadow-sm">
                Atrás
              </button>
            ) : (
              <Link href="/rac" className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2.5 rounded-[20px] font-medium text-sm transition-colors shadow-sm">
                Cancelar
              </Link>
            )}
            
            <div className="flex gap-3">
              <button className="bg-white border border-primary text-primary hover:bg-primary/5 px-6 py-2.5 rounded-[20px] font-bold text-sm transition-colors shadow-sm flex items-center gap-2">
                <Save className="w-4 h-4" /> Guardar Avance
              </button>
              
              {step < 3 ? (
                <button onClick={() => setStep(step + 1)} className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-[20px] font-bold text-sm transition-colors shadow-sm flex items-center gap-2">
                  Siguiente Paso <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button className="bg-success hover:bg-green-700 text-white px-6 py-2.5 rounded-[20px] font-bold text-sm transition-colors shadow-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Finalizar y Crear Ingreso
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
