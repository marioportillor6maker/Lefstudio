"use client";

import React from "react";
import Link from "next/link";
import { FolderOpen, AlertCircle, FileQuestion, FileCheck, Search, Filter, CheckCircle2, Clock, Eye, AlertTriangle, XCircle } from "lucide-react";
import { mockIngresosList } from "@/lib/mockData";

export default function BandejaDOCTPage() {
  const ingresosDOCT = mockIngresosList.filter(i => i.etapa === "DOCT" || i.etapa.includes("DOCT"));

  // Helper to render status icons for RT documents
  const renderRTStatusIcon = (status: 'pendiente' | 'completado' | 'alerta' | 'no_aplica') => {
    switch(status) {
      case 'completado':
        return <CheckCircle2 className="w-4 h-4 text-success mx-auto" title="Completado" />;
      case 'pendiente':
        return <Clock className="w-4 h-4 text-orange-500 mx-auto" title="Pendiente" />;
      case 'alerta':
        return <AlertTriangle className="w-4 h-4 text-danger mx-auto" title="Bloqueo/Alerta" />;
      case 'no_aplica':
        return <span className="text-slate-300 text-xs text-center block">-</span>;
    }
  };

  // Expanded mock data specifically for DOCT
  const doctRows = [
    {
      recepcion: "LEF-2024-00148",
      producto: "Metformina 850mg",
      recibido: "24/04/2026",
      rt75: 'completado',
      rt41: 'completado',
      rt30: 'no_aplica',
      rt38: 'pendiente',
      estado: "RT-38 en Preparación"
    },
    {
      recepcion: "LEF-2024-00150",
      producto: "Amoxicilina 500mg",
      recibido: "23/04/2026",
      rt75: 'pendiente',
      rt41: 'pendiente',
      rt30: 'no_aplica',
      rt38: 'no_aplica',
      estado: "Pendiente Expediente"
    },
    {
      recepcion: "LEF-2024-00152",
      producto: "Ibuprofeno Suspensión",
      recibido: "22/04/2026",
      rt75: 'completado',
      rt41: 'completado',
      rt30: 'alerta',
      rt38: 'no_aplica',
      estado: "Pendiente Información"
    },
    {
      recepcion: "LEF-2024-00155",
      producto: "Losartán 50mg",
      recibido: "24/04/2026",
      rt75: 'completado',
      rt41: 'completado',
      rt30: 'completado',
      rt38: 'completado',
      estado: "Enviado a Laboratorio"
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Control Documental y Archivo (DOCT)</h1>
          <p className="text-slate-500 text-sm mt-1">Gestión de expedientes (RT-75), contraste histórico (RT-41) y armado técnico (RT-38).</p>
        </div>
      </div>

      {/* Indicadores (Cards Superiores) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
            <FolderOpen className="w-3 h-3" /> En DOCT
          </p>
          <p className="text-3xl font-black text-slate-900 mt-2">9</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-md border border-orange-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-orange-700 font-bold uppercase tracking-wider flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Pdte. Expediente
          </p>
          <p className="text-3xl font-black text-orange-600 mt-2">3</p>
        </div>
        <div className="bg-red-50 p-4 rounded-md border border-red-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-danger font-bold uppercase tracking-wider flex items-center gap-1">
            <FileQuestion className="w-3 h-3" /> Pdte. Información
          </p>
          <p className="text-3xl font-black text-danger mt-2">2</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-blue-700 font-bold uppercase tracking-wider flex items-center gap-1">
            <FileCheck className="w-3 h-3" /> RT-38 en Preparación
          </p>
          <p className="text-3xl font-black text-blue-600 mt-2">4</p>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por N° Recepción o Producto..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-[5px] text-sm focus:outline-none focus:border-primary transition-all"
            />
          </div>
          <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-[5px] flex items-center gap-2 text-sm font-medium hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>
      </div>

      {/* Tabla: Control Documental de Ingresos */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Recepción</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Producto</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Recibido</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-center">RT-75</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-center">RT-41</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-center">RT-30</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider text-center">RT-38</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Estado</th>
                <th className="px-5 py-3 text-right text-[11px] uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {doctRows.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors h-[60px] group">
                  <td className="px-5 font-bold text-primary">
                    <Link href={`/ingresos/${item.recepcion}`} className="hover:underline">
                      {item.recepcion}
                    </Link>
                  </td>
                  <td className="px-5">
                    <span className="font-medium text-slate-800 block truncate max-w-[200px]" title={item.producto}>{item.producto}</span>
                  </td>
                  <td className="px-5 text-slate-600 font-medium text-xs">
                    {item.recibido}
                  </td>
                  <td className="px-5 text-center">
                    {renderRTStatusIcon(item.rt75 as any)}
                  </td>
                  <td className="px-5 text-center">
                    {renderRTStatusIcon(item.rt41 as any)}
                  </td>
                  <td className="px-5 text-center">
                    {renderRTStatusIcon(item.rt30 as any)}
                  </td>
                  <td className="px-5 text-center">
                    {renderRTStatusIcon(item.rt38 as any)}
                  </td>
                  <td className="px-5">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold border tracking-wider uppercase ${
                      item.estado.includes("Preparación") ? "bg-blue-100 text-blue-800 border-blue-200" :
                      item.estado.includes("Información") ? "bg-red-100 text-danger border-red-200" :
                      item.estado.includes("Expediente") ? "bg-orange-100 text-orange-800 border-orange-200" :
                      "bg-green-100 text-green-800 border-green-200"
                    }`}>
                      {item.estado}
                    </span>
                  </td>
                  <td className="px-5 text-right">
                    <Link href={`/ingresos/${item.recepcion}`} className="inline-flex p-1.5 text-slate-400 hover:text-primary hover:bg-blue-50 rounded transition-colors" title="Ver detalle (Vista 360)">
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
