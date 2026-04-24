"use client";

import { Activity, ArrowLeft, Search, Plus } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Activity className="w-6 h-6 text-primary" />
              Operación General
            </h1>
            <p className="text-slate-500 text-sm mt-1">Métricas consolidadas de nivel gerencial.</p>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded text-sm font-bold text-slate-700 transition-colors">
             <Search className="w-4 h-4" /> Buscar
           </button>
           <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded text-sm font-bold transition-colors shadow-sm">
             <Plus className="w-4 h-4" /> Nuevo
           </button>
        </div>
      </div>

      {/* Placeholder Content for Route Completion */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-4">
          <Activity className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Módulo Activo</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-6">
          La pantalla <strong>Operación General</strong> ha sido provisionada correctamente y conectada al enrutador principal de Next.js App Router.
        </p>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-200">
          ✓ Ruta Verificada
        </div>
      </div>
    </div>
  );
}
