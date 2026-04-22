"use client";

import { useState } from "react";
import { ArrowLeft, Save, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function NuevoIngresoRAC() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="flex items-center gap-4">
        <Link href="/rac" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Nuevo Ingreso (RAC)</h1>
          <p className="text-slate-500 text-sm mt-1">Capture los datos iniciales para generar el Borrador y posterior RG-41.</p>
        </div>
      </div>

      {/* Wizard Stepper */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 z-0"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-1 bg-primary z-0 transition-all"></div>
          
          <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</div>
            <span className="text-xs font-medium text-slate-900">Trámite y Cliente</span>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm">2</div>
            <span className="text-xs font-medium text-slate-400">Producto</span>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm">3</div>
            <span className="text-xs font-medium text-slate-400">Muestras y Cobro</span>
          </div>
        </div>

        {/* Formulario (Paso 1 Simulado) */}
        <div className="space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">1. Datos del Trámite</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="flex flex-col gap-1.5 h-[72px]">
                <label className="text-sm font-medium text-slate-700">Tipo de Trámite <span className="text-danger">*</span></label>
                <select className="w-full h-12 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors appearance-none">
                  <option value="">Seleccione un trámite</option>
                  <option value="ARSA">Registro Sanitario (ARSA)</option>
                  <option value="Renovacion">Renovación de Registro</option>
                  <option value="Particular">Control de Calidad (Particular)</option>
                </select>
              </div>
              
              <div className="flex flex-col gap-1.5 h-[72px]">
                <label className="text-sm font-medium text-slate-700">Cliente / Solicitante <span className="text-danger">*</span></label>
                <input 
                  type="text" 
                  placeholder="Ej. Laboratorios Industriales S.A."
                  className="w-full h-12 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5 h-[72px]">
                <label className="text-sm font-medium text-slate-700">N° de Oficio / Acta</label>
                <input 
                  type="text" 
                  placeholder="Opcional"
                  className="w-full h-12 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5 h-[72px]">
                <label className="text-sm font-medium text-slate-700">Fecha de Recepción</label>
                <input 
                  type="date" 
                  defaultValue={new Date().toISOString().split('T')[0]}
                  readOnly
                  className="w-full h-12 px-4 bg-slate-50 border border-slate-200 text-slate-500 rounded-[5px] text-sm focus:outline-none cursor-not-allowed"
                />
              </div>

            </div>
          </div>

          {/* Acciones */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2.5 rounded-[20px] font-medium text-sm transition-colors shadow-sm">
              Cancelar
            </button>
            <div className="flex gap-3">
              <button className="bg-primary/10 text-primary hover:bg-primary/20 px-6 py-2.5 rounded-[20px] font-medium text-sm transition-colors shadow-sm flex items-center gap-2">
                <Save className="w-4 h-4" /> Guardar Borrador
              </button>
              <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-[20px] font-medium text-sm transition-colors shadow-sm flex items-center gap-2">
                Siguiente Paso <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
