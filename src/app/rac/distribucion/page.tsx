"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Network, FileCheck, Search, Plus, Save, Send, ShieldAlert, FlaskConical, Archive, CheckCircle2, Clock } from "lucide-react";

export default function DistribucionPage() {
  const [recepcion, setRecepcion] = useState("");

  // Default values based on the "Recepción" selection
  const areas = [
    {
      id: "doct",
      name: "Documentación (DOCT)",
      icon: <FileCheck className="w-4 h-4 text-blue-600" />,
      responsables: ["Carlos Ruiz (DOCT)", "María López (DOCT)"],
      unidad: "Expediente(s)",
      cantidadSugerida: recepcion ? "1" : "",
      estado: "Pendiente"
    },
    {
      id: "micro",
      name: "Microbiología",
      icon: <FlaskConical className="w-4 h-4 text-purple-600" />,
      responsables: ["Dra. Ana Torres (Micro)", "Lic. Juan Pérez (Micro)"],
      unidad: "Muestra(s)",
      cantidadSugerida: recepcion ? "2" : "",
      estado: "Pendiente"
    },
    {
      id: "biblioteca",
      name: "Muestra Biblioteca",
      icon: <Archive className="w-4 h-4 text-orange-600" />,
      responsables: ["Custodio STR", "Almacén Central"],
      unidad: "Frasco(s)",
      cantidadSugerida: recepcion ? "1" : "",
      estado: "Recibido" // Solo para mostrar la variación del badge
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/rac" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Network className="w-6 h-6 text-primary" />
              Distribución RT-159
            </h1>
            <p className="text-slate-500 text-sm mt-1">Asignación de muestras físicas y expedientes a los laboratorios correspondientes.</p>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Save className="w-4 h-4" /> Guardar Borrador
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded text-sm font-bold transition-colors shadow-sm">
            <Send className="w-4 h-4" /> Emitir y Distribuir
          </button>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-primary" /> Formulario de Distribución Interna
          </h2>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Campos Principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Nº RT-159
              </label>
              <input 
                type="text" 
                value="RT159-2024-0428" 
                readOnly
                className="w-full px-3 py-2.5 bg-slate-100 border border-slate-200 rounded font-bold text-slate-600 text-sm cursor-not-allowed" 
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Recepción
              </label>
              <select 
                value={recepcion}
                onChange={(e) => setRecepcion(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-sm font-medium text-slate-800"
              >
                <option value="">Seleccione ingreso validado...</option>
                <option value="LEF-2024-00148">LEF-2024-00148 - Metformina</option>
                <option value="LEF-2024-00150">LEF-2024-00150 - Amoxicilina</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Fecha Distribución
              </label>
              <input 
                type="date" 
                defaultValue="2026-04-24"
                className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-sm font-medium text-slate-800" 
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Responsable Emisión
              </label>
              <input 
                type="text" 
                value="Q.F. María Rodríguez (RAC)" 
                readOnly
                className="w-full px-3 py-2.5 bg-slate-100 border border-slate-200 rounded text-slate-600 text-sm cursor-not-allowed" 
              />
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Sección Distribución por Área */}
          <div>
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm">
              <Network className="w-4 h-4 text-primary" /> Distribución por Área
            </h3>
            
            <div className="overflow-x-auto border border-slate-200 rounded-md">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Área Destino</th>
                    <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Responsable Recibe</th>
                    <th className="px-5 py-3 text-[11px] uppercase tracking-wider w-32">Cantidad</th>
                    <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Unidad</th>
                    <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Fecha Recibo</th>
                    <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-right">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {areas.map((area) => (
                    <tr key={area.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3">
                        <span className="font-bold text-slate-800 flex items-center gap-2">
                          {area.icon}
                          {area.name}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <select 
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-xs"
                          disabled={!recepcion}
                        >
                          <option value="">Seleccione...</option>
                          {area.responsables.map((r, i) => (
                            <option key={i} value={r}>{r}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-3">
                        <input 
                          type="number" 
                          placeholder="0"
                          defaultValue={area.cantidadSugerida}
                          disabled={!recepcion}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-xs text-center" 
                        />
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs text-slate-500 font-medium px-2 py-1 bg-slate-100 rounded">
                          {area.unidad}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <input 
                          type="datetime-local" 
                          disabled={!recepcion}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-xs" 
                        />
                      </td>
                      <td className="px-5 py-3 text-right">
                        {area.estado === "Recibido" && recepcion ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold tracking-wider bg-green-100 text-green-800 border border-green-200 uppercase">
                            <CheckCircle2 className="w-3 h-3" /> Recibido
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold tracking-wider bg-orange-100 text-orange-800 border border-orange-200 uppercase">
                            <Clock className="w-3 h-3" /> Pendiente
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {!recepcion && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <p>Debe seleccionar un número de <strong>Recepción</strong> en la parte superior para habilitar los campos de distribución por área.</p>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
