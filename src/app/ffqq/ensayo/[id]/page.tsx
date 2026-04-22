"use client";

import { useState } from "react";
import { ArrowLeft, Save, Beaker, CheckCircle2, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function EnsayoWorkspace({ params }: { params: { id: string } }) {
  const [absorbanciaMuestra, setAbsorbanciaMuestra] = useState("");
  const [absorbanciaEstandar, setAbsorbanciaEstandar] = useState("");
  const [peso, setPeso] = useState("");
  const [calculo, setCalculo] = useState<number | null>(null);

  const handleCalcular = () => {
    // Cálculo dummy para demostración
    const absM = parseFloat(absorbanciaMuestra);
    const absE = parseFloat(absorbanciaEstandar);
    const p = parseFloat(peso);
    if (absM && absE && p) {
      const res = (absM / absE) * (100 / p) * 100;
      setCalculo(parseFloat(res.toFixed(2)));
    }
  };

  const fueraDeEspecificacion = calculo !== null && (calculo < 90 || calculo > 110);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/ffqq" className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Valoración por HPLC</h1>
          <p className="text-slate-500 text-sm mt-1">Auxiliar Dinámico RT-86 • REC-2024-1015 • Amoxicilina Susp.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna Izquierda: Datos del Ensayo y Auxiliar */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-md border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
              <Beaker className="w-5 h-5 text-primary" /> Captura de Datos Primarios
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Absorbancia Muestra (AU) <span className="text-danger">*</span></label>
                <input 
                  type="number" 
                  value={absorbanciaMuestra}
                  onChange={(e) => setAbsorbanciaMuestra(e.target.value)}
                  className="w-full h-12 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Absorbancia Estándar (AU) <span className="text-danger">*</span></label>
                <input 
                  type="number" 
                  value={absorbanciaEstandar}
                  onChange={(e) => setAbsorbanciaEstandar(e.target.value)}
                  className="w-full h-12 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Peso Promedio (mg) <span className="text-danger">*</span></label>
                <input 
                  type="number" 
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                  className="w-full h-12 px-4 bg-white border border-slate-300 rounded-[5px] text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
              <div className="flex items-end">
                <button 
                  onClick={handleCalcular}
                  className="h-12 w-full bg-slate-800 hover:bg-slate-900 text-white rounded-[5px] font-medium text-sm transition-colors"
                >
                  Calcular Resultado
                </button>
              </div>
            </div>

            {calculo !== null && (
              <div className={`mt-8 p-6 rounded-md border flex items-center justify-between ${fueraDeEspecificacion ? 'bg-danger/5 border-danger/20' : 'bg-green-50 border-green-200'}`}>
                <div>
                  <p className={`text-sm font-medium ${fueraDeEspecificacion ? 'text-danger' : 'text-success'}`}>Resultado Obtenido (% Declarado)</p>
                  <p className={`text-4xl font-bold mt-1 ${fueraDeEspecificacion ? 'text-danger' : 'text-green-700'}`}>{calculo}%</p>
                </div>
                {fueraDeEspecificacion ? (
                  <div className="flex items-center gap-2 text-danger bg-danger/10 px-4 py-2 rounded-full text-sm font-medium">
                    <AlertTriangle className="w-4 h-4" /> Fuera de Especificación
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-success bg-green-100 px-4 py-2 rounded-full text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Cumple
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-3">
            <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2.5 rounded-[20px] font-medium text-sm shadow-sm">
              Guardar Temporal
            </button>
            <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-[20px] font-medium text-sm shadow-sm flex items-center gap-2" disabled={calculo === null}>
              <Save className="w-4 h-4" /> Firmar y Enviar a STCC
            </button>
          </div>
        </div>

        {/* Columna Derecha: Referencias y Especificaciones */}
        <div className="space-y-6">
          <div className="bg-slate-800 text-white rounded-md p-6 shadow-sm">
            <h3 className="font-semibold mb-4">Especificaciones Oficiales</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400">Rango Aceptable</p>
                <p className="text-lg font-medium">90.0% - 110.0%</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Técnica a Aplicar</p>
                <p className="text-sm font-medium">USP 43, Pag 345</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Lote de Estándar</p>
                <p className="text-sm font-medium text-primary-light">STD-2023-A99</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
