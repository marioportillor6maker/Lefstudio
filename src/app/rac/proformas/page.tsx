"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard, CheckCircle2, AlertCircle, FileText, Printer, Check, Search, Plus, ListTodo } from "lucide-react";

export default function ProformasPagoPage() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedProforma, setSelectedProforma] = useState<string | null>(null);

  const handleConfirmClick = (id: string) => {
    setSelectedProforma(id);
    setShowConfirmModal(true);
  };

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
              <CreditCard className="w-6 h-6 text-primary" />
              Proformas y Pago
            </h1>
            <p className="text-slate-500 text-sm mt-1">Generación de proformas, control de pagos y facturación (RT-15).</p>
          </div>
        </div>
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
            <FileText className="w-3 h-3" /> Proformas Emitidas
          </p>
          <p className="text-3xl font-black text-slate-900 mt-2">8</p>
        </div>
        <div className="bg-green-50 p-4 rounded-md border border-green-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-green-700 font-bold uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Pagos Confirmados
          </p>
          <p className="text-3xl font-black text-green-600 mt-2">6</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-md border border-orange-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-orange-700 font-bold uppercase tracking-wider flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Pendientes de Pago
          </p>
          <p className="text-3xl font-black text-orange-600 mt-2">2</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Formulario: Emitir Nueva Proforma */}
        <div className="xl:col-span-1 space-y-4">
          <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <Plus className="w-4 h-4 text-primary" /> Emitir Nueva Proforma
              </h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Recepción Asociada</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-sm">
                  <option value="">Seleccione una recepción...</option>
                  <option value="LEF-2024-00148">LEF-2024-00148 - Metformina</option>
                  <option value="LEF-2024-00150">LEF-2024-00150 - Amoxicilina</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tipo de Análisis</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-sm">
                  <option value="">Seleccione tipo...</option>
                  <option value="completo">Análisis Completo</option>
                  <option value="parcial">Análisis Parcial</option>
                  <option value="micro">Solo Microbiología</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Monto (L.)</label>
                <input type="number" placeholder="Ej. 1500.00" className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Fecha Emisión</label>
                  <input type="date" className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-sm" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Plazo en Días</label>
                  <input type="number" defaultValue="15" className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Método de Pago</label>
                <select className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-sm">
                  <option value="transferencia">Transferencia Bancaria</option>
                  <option value="deposito">Depósito en Ventanilla</option>
                  <option value="tgr">TGR-1 (Gobierno)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Observaciones</label>
                <textarea rows={3} placeholder="Notas adicionales para la proforma..." className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-sm resize-none"></textarea>
              </div>

              <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded transition-colors shadow-sm text-sm">
                Generar Proforma
              </button>
            </div>
          </div>
        </div>

        {/* Tabla: Proformas y Estado de Pago */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-primary" /> Proformas Generadas
              </h2>
              <div className="relative w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Buscar proforma..." 
                  className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-primary transition-all"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Nº Proforma</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Recepción</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Producto</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Monto (L.)</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Emisión / Límite</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Estado</th>
                    <th className="px-4 py-3 text-right text-[11px] uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Fila 1 - Pendiente */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-800">PROF-2024-089</td>
                    <td className="px-4 py-3 text-primary font-medium cursor-pointer hover:underline">LEF-2024-00148</td>
                    <td className="px-4 py-3 truncate max-w-[120px]" title="Metformina 850mg">Metformina 850mg</td>
                    <td className="px-4 py-3 font-bold text-slate-700">L. 4,500.00</td>
                    <td className="px-4 py-3">
                      <span className="block text-slate-800">12/04/2026</span>
                      <span className="block text-[10px] text-slate-500">Lim: 27/04/2026</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2 py-1 rounded-full text-[10px] font-bold tracking-wider bg-orange-100 text-orange-800 border border-orange-200 uppercase">
                        Pendiente
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right flex items-center justify-end gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-blue-50 rounded" title="Ver Detalle">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded" title="Imprimir PDF">
                        <Printer className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleConfirmClick("PROF-2024-089")} className="p-1.5 text-slate-400 hover:text-success hover:bg-green-50 rounded" title="Confirmar Pago">
                        <Check className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  {/* Fila 2 - Pagado */}
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-800">PROF-2024-088</td>
                    <td className="px-4 py-3 text-primary font-medium cursor-pointer hover:underline">LEF-2024-00145</td>
                    <td className="px-4 py-3 truncate max-w-[120px]" title="Paracetamol 500mg">Paracetamol 500mg</td>
                    <td className="px-4 py-3 font-bold text-slate-700">L. 3,200.00</td>
                    <td className="px-4 py-3">
                      <span className="block text-slate-800">10/04/2026</span>
                      <span className="block text-[10px] text-slate-500">Lim: 25/04/2026</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2 py-1 rounded-full text-[10px] font-bold tracking-wider bg-green-100 text-green-800 border border-green-200 uppercase">
                        Pagado
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right flex items-center justify-end gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-blue-50 rounded" title="Ver Detalle">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded" title="Imprimir PDF">
                        <Printer className="w-4 h-4" />
                      </button>
                      {/* Sin botón confirmar porque ya está pagado */}
                    </td>
                  </tr>
                  {/* Fila 3 - Vencido */}
                  <tr className="hover:bg-slate-50 transition-colors bg-red-50/30">
                    <td className="px-4 py-3 font-bold text-slate-800">PROF-2024-080</td>
                    <td className="px-4 py-3 text-primary font-medium cursor-pointer hover:underline">LEF-2024-00130</td>
                    <td className="px-4 py-3 truncate max-w-[120px]" title="Ibuprofeno Suspensión">Ibuprofeno Suspen...</td>
                    <td className="px-4 py-3 font-bold text-slate-700">L. 5,100.00</td>
                    <td className="px-4 py-3">
                      <span className="block text-slate-800">20/03/2026</span>
                      <span className="block text-[10px] text-danger font-bold">Lim: 05/04/2026</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2 py-1 rounded-full text-[10px] font-bold tracking-wider bg-red-100 text-danger border border-red-200 uppercase">
                        Vencido
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right flex items-center justify-end gap-1">
                      <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-blue-50 rounded" title="Ver Detalle">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded" title="Imprimir PDF">
                        <Printer className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleConfirmClick("PROF-2024-080")} className="p-1.5 text-slate-400 hover:text-success hover:bg-green-50 rounded" title="Confirmar Pago">
                        <Check className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Confirmar Pago */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                Confirmar Pago
              </h3>
              <button onClick={() => setShowConfirmModal(false)} className="text-slate-400 hover:text-slate-600">×</button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600">
                Está a punto de registrar el pago para la proforma <strong className="text-slate-800">{selectedProforma}</strong>. Esta acción habilitará la distribución del expediente.
              </p>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Referencia Bancaria / Recibo</label>
                <input type="text" placeholder="Ej. REF-0992384" className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-sm" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Fecha Efectiva</label>
                <input type="date" className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-sm" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3 bg-slate-50">
              <button onClick={() => setShowConfirmModal(false)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded text-sm font-bold hover:bg-slate-50">
                Cancelar
              </button>
              <button onClick={() => setShowConfirmModal(false)} className="px-4 py-2 bg-success hover:bg-green-700 text-white rounded text-sm font-bold shadow-sm">
                Confirmar Pago
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
