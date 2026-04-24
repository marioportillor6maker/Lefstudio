"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Plus, Download, AlertCircle, ShieldAlert, CheckCircle2, Eye, LayoutPanelLeft, UserSquare2 } from "lucide-react";
import { mockIngresosList } from "@/lib/mockData";

export default function BandejaGlobalPage() {
  const [ingresos] = useState(mockIngresosList); // En un caso real vendría de una API
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [onlyBlocked, setOnlyBlocked] = useState(false);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Bandeja Global de Ingresos</h1>
          <p className="text-slate-500 text-sm mt-1">Directorio completo de expedientes y trazabilidad del LEF.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> Exportar a Excel
          </button>
          <Link 
            href="/rac/nuevo" 
            className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Nuevo Ingreso
          </Link>
        </div>
      </div>

      {/* Panel de Filtros */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full md:flex-1 md:min-w-[300px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por correlativo, producto, lote, RS..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:border-primary transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filtros Rápidos:</span>
            <button 
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`px-3 py-2 border rounded text-sm font-medium flex items-center gap-2 transition-colors ${showAdvancedFilters ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'}`}
            >
              <Filter className="w-4 h-4" /> {showAdvancedFilters ? 'Ocultar Filtros' : 'Mostrar Filtros Avanzados'}
            </button>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 ml-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                checked={onlyBlocked}
                onChange={(e) => setOnlyBlocked(e.target.checked)}
              />
              Solo bloqueados
            </label>
          </div>
        </div>

        {/* Filtros Avanzados (Desplegables) */}
        {showAdvancedFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Estado Operativo</label>
              <select className="w-full bg-white border border-slate-300 text-slate-700 px-3 py-2 rounded text-sm focus:outline-none focus:border-primary">
                <option value="">Todos los Estados</option>
                <option value="Pdte. Pago">Pdte. Pago</option>
                <option value="Distribuido RT-159">Distribuido RT-159</option>
                <option value="Recibido DOCT">Recibido DOCT</option>
                <option value="Pdte. Información">Pdte. Información</option>
                <option value="Estándar Rechazado">Estándar Rechazado</option>
                <option value="Elab. RT-38">Elab. RT-38</option>
                <option value="En Análisis (FFQQ/Micro)">En Análisis (FFQQ/Micro)</option>
                <option value="Revisión (STCC/DT/DG)">Revisión (STCC/DT/DG)</option>
                <option value="Aprobado">Aprobado</option>
                <option value="Emitido">Emitido</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tipo de Trámite</label>
              <select className="w-full bg-white border border-slate-300 text-slate-700 px-3 py-2 rounded text-sm focus:outline-none focus:border-primary">
                <option value="">Todos los Trámites</option>
                <option value="Control de Calidad">Control de Calidad</option>
                <option value="Licitación">Licitación</option>
                <option value="Registro Sanitario">Registro Sanitario</option>
                <option value="Vigilancia Sanitaria">Vigilancia Sanitaria</option>
                <option value="Colaboración">Colaboración</option>
                <option value="Reanálisis">Reanálisis</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Área Actual</label>
              <select className="w-full bg-white border border-slate-300 text-slate-700 px-3 py-2 rounded text-sm focus:outline-none focus:border-primary">
                <option value="">Todas las Áreas</option>
                <option value="RAC">RAC</option>
                <option value="DOCT">DOCT</option>
                <option value="STR">STR</option>
                <option value="FFQQ">FFQQ</option>
                <option value="Micro">Micro</option>
                <option value="STCC">STCC</option>
                <option value="DT">DT</option>
                <option value="DG">DG</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">SLA</label>
              <select className="w-full bg-white border border-slate-300 text-slate-700 px-3 py-2 rounded text-sm focus:outline-none focus:border-primary">
                <option value="">Todos</option>
                <option value="En tiempo">En tiempo</option>
                <option value="En riesgo">En riesgo</option>
                <option value="Vencido">Vencido</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[1200px]">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-xs w-[40px] text-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                </th>
                <th className="px-4 py-3 text-xs uppercase tracking-wider">Correlativo</th>
                <th className="px-4 py-3 text-xs uppercase tracking-wider">Producto / FF</th>
                <th className="px-4 py-3 text-xs uppercase tracking-wider">Cliente</th>
                <th className="px-4 py-3 text-xs uppercase tracking-wider">Trámite</th>
                <th className="px-4 py-3 text-xs uppercase tracking-wider">Etapa Actual</th>
                <th className="px-4 py-3 text-xs uppercase tracking-wider">Estado</th>
                <th className="px-4 py-3 text-xs uppercase tracking-wider">Bloqueos</th>
                <th className="px-4 py-3 text-xs uppercase tracking-wider">Responsable</th>
                <th className="px-4 py-3 text-right text-xs uppercase tracking-wider sticky right-0 bg-slate-50 shadow-[-5px_0_10px_rgba(0,0,0,0.02)] z-10">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ingresos.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors h-[64px]">
                  <td className="px-4 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                  </td>
                  <td className="px-4">
                    <Link href={`/ingresos/${item.id}`} className="font-bold text-primary hover:underline block">{item.id}</Link>
                  </td>
                  <td className="px-4">
                    <span className="font-medium text-slate-800 block truncate max-w-[200px]" title={item.producto}>{item.producto}</span>
                    <span className="text-[10px] text-slate-500">{item.formaFarmaceutica}</span>
                  </td>
                  <td className="px-4 text-slate-700 truncate max-w-[150px]" title={item.cliente}>
                    {item.cliente}
                  </td>
                  <td className="px-4">
                    <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{item.tramite}</span>
                  </td>
                  <td className="px-4 text-xs font-bold text-slate-800">
                    {item.etapa}
                  </td>
                  <td className="px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                      item.estado.includes("Borrador") ? "bg-slate-100 text-slate-700 border-slate-200" :
                      item.estado.includes("Análisis") ? "bg-purple-100 text-purple-800 border-purple-200" :
                      item.estado.includes("Pendiente") ? "bg-orange-100 text-orange-800 border-orange-200" :
                      item.estado.includes("Aprobado") || item.estado.includes("Emitido") ? "bg-green-100 text-success border-green-200" :
                      "bg-blue-100 text-blue-800 border-blue-200"
                    }`}>
                      {item.estado.includes("Aprobado") && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {item.estado}
                    </span>
                  </td>
                  <td className="px-4">
                    {item.bloqueo ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-danger bg-danger/10 px-2 py-0.5 rounded border border-danger/20">
                        <ShieldAlert className="w-3 h-3" /> {item.bloqueo}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-4 text-xs text-slate-600">
                     {item.responsable.split(' (')[0]}
                  </td>
                  <td className="px-4 text-right sticky right-0 bg-white group-hover:bg-slate-50 shadow-[-5px_0_10px_rgba(0,0,0,0.02)] transition-colors z-10">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded transition-colors" title="Ver Panel Lateral">
                        <LayoutPanelLeft className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded transition-colors" title="Reasignar">
                        <UserSquare2 className="w-4 h-4" />
                      </button>
                      <Link 
                        href={`/ingresos/${item.id}`} 
                        className="ml-2 inline-flex items-center gap-1.5 text-primary hover:text-white font-medium transition-colors border border-primary hover:bg-primary px-3 py-1.5 rounded text-xs"
                      >
                        <Eye className="w-3.5 h-3.5" /> Ver 360
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Paginación */}
        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Mostrar</span>
            <select className="border border-slate-300 rounded px-2 py-1 bg-white focus:outline-none focus:border-primary">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span>por página</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 border border-slate-300 rounded bg-white text-slate-500 hover:bg-slate-50 text-sm font-medium" disabled>Anterior</button>
            <button className="px-3 py-1 border border-primary bg-primary text-white rounded text-sm font-bold">1</button>
            <button className="px-3 py-1 border border-slate-300 rounded bg-white text-slate-700 hover:bg-slate-50 text-sm font-medium">2</button>
            <button className="px-3 py-1 border border-slate-300 rounded bg-white text-slate-700 hover:bg-slate-50 text-sm font-medium">3</button>
            <span className="px-2 text-slate-400">...</span>
            <button className="px-3 py-1 border border-slate-300 rounded bg-white text-slate-700 hover:bg-slate-50 text-sm font-medium">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}
