'use client';

import { useState } from "react";
import Link from "next/link";
import {
  Search, Filter, Plus, Eye, CheckCircle2, DollarSign,
  ListTodo, SlidersHorizontal, X, Layers,
} from "lucide-react";
import { mockIngresosList } from "@/lib/mockData";

interface MuestraExtra {
  cantidadTotal: string;
  cantidadFFQQ: string;
  cantidadMicro: string;
  cantidadMuestroteca: string;
  observaciones: string;
}

const INIT_MUESTRA: MuestraExtra = {
  cantidadTotal: "",
  cantidadFFQQ: "0",
  cantidadMicro: "0",
  cantidadMuestroteca: "0",
  observaciones: "",
};

const inputCls = "w-full px-3 py-2 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-sm";
const labelCls = "block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1";

export default function BandejaRACPage() {
  const ingresosRAC = mockIngresosList.filter(i => i.etapa === "RAC" || i.etapa.includes("RAC"));

  const [showMuestraModal, setShowMuestraModal] = useState(false);
  const [muestraItemId, setMuestraItemId] = useState<string | null>(null);
  const [form, setForm] = useState<MuestraExtra>(INIT_MUESTRA);

  const openMuestra = (id: string) => {
    setMuestraItemId(id);
    setForm(INIT_MUESTRA);
    setShowMuestraModal(true);
  };

  const closeMuestra = () => {
    setShowMuestraModal(false);
    setMuestraItemId(null);
  };

  // PENDIENTE BACKEND: enviar cantidades adicionales sumadas a las existentes.
  const handleGuardarMuestra = () => closeMuestra();

  return (
    <div className="space-y-4 sm:space-y-6 pb-8 sm:pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Recepción y Atención al Cliente (RAC)</h1>
          <p className="text-slate-500 text-sm mt-1">Bandeja de captura inicial, revisión documental y gestión de proformas.</p>
        </div>
        <Link
          href="/rac/nuevo"
          className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-[20px] font-bold text-sm transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Registrar Nueva Muestra
        </Link>
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
            <ListTodo className="w-3 h-3" /> Total en RAC
          </p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">12</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-blue-700 font-bold uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Pendiente Validación
          </p>
          <p className="text-2xl sm:text-3xl font-black text-blue-600 mt-2">3</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-md border border-orange-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-orange-700 font-bold uppercase tracking-wider flex items-center gap-1">
            <DollarSign className="w-3 h-3" /> Pendiente Pago
          </p>
          <p className="text-2xl sm:text-3xl font-black text-orange-600 mt-2">2</p>
        </div>
        <div className="bg-green-50 p-4 rounded-md border border-green-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-green-700 font-bold uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3 h-3" /> Listos para Distribuir
          </p>
          <p className="text-2xl sm:text-3xl font-black text-green-600 mt-2">4</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <div className="relative w-full md:w-96 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Búsqueda por producto, recepción, cliente..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-[5px] text-sm focus:outline-none focus:border-primary transition-all"
            />
          </div>
          <div className="flex items-center gap-3 w-full">
            <select className="h-9 px-3 bg-white border border-slate-300 rounded text-sm text-slate-700 focus:outline-none focus:border-primary shrink-0 min-w-[150px]">
              <option value="">Filtro Estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="validado">Validado</option>
              <option value="pago">Pdte. Pago</option>
            </select>
            <button className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 h-9 rounded flex items-center gap-2 text-sm font-bold hover:bg-slate-50 transition-colors shrink-0">
              <SlidersHorizontal className="w-4 h-4" /> Más filtros
            </button>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Nº Recepción</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Producto (Lote)</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Cliente</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Tipo Trámite</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Fecha Rec.</th>
                <th className="px-5 py-3 text-[11px] uppercase tracking-wider">Estado</th>
                <th className="px-4 py-3 text-right text-[11px] uppercase tracking-wider min-w-[260px]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ingresosRAC.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors h-[60px] group">
                  <td className="px-5 font-bold text-primary">
                    <Link href={`/ingresos/${item.id}`} className="hover:underline">
                      {item.id}
                    </Link>
                  </td>
                  <td className="px-5">
                    <span className="font-medium text-slate-800 block truncate max-w-[200px]" title={item.producto}>{item.producto}</span>
                    <span className="text-[11px] text-slate-500 font-medium">Lote: {item.lote}</span>
                  </td>
                  <td className="px-5">
                    <span className="text-slate-700 block truncate max-w-[150px] font-medium" title={item.cliente}>{item.cliente}</span>
                  </td>
                  <td className="px-5">
                    <span className="text-[11px] uppercase font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded inline-block">
                      {item.tramite}
                    </span>
                  </td>
                  <td className="px-5 text-slate-600 font-medium text-xs">
                    {item.fechaIngreso}
                  </td>
                  <td className="px-5">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                      item.estado.includes("Borrador") ? "bg-slate-100 text-slate-700 border-slate-200" :
                      item.estado.includes("Pago") ? "bg-orange-100 text-orange-800 border-orange-200" :
                      item.estado.includes("Distribuido") ? "bg-green-100 text-green-800 border-green-200" :
                      "bg-blue-100 text-blue-800 border-blue-200"
                    }`}>
                      {item.estado}
                    </span>
                  </td>
                  <td className="px-4">
                    <div className="flex items-center justify-end gap-1 flex-wrap">
                      <Link href={`/ingresos/${item.id}`} className="p-1.5 text-slate-400 hover:text-primary hover:bg-blue-50 rounded transition-colors" title="Ver (Vista 360)">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="p-1.5 text-slate-400 hover:text-success hover:bg-green-50 rounded transition-colors" title="Validar">
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <span className="w-px h-4 bg-slate-200 mx-1 shrink-0" />
                      {/* TODO: conectar a generación/vista del formulario RG-13 */}
                      <button
                        className="text-[10px] font-bold px-2 py-1 rounded border border-violet-200 text-violet-700 hover:bg-violet-50 active:bg-violet-100 transition-colors tracking-wide shrink-0"
                        title="Formulario RG-13"
                      >
                        RG-13
                      </button>
                      {/* TODO: conectar a generación/vista del formulario RG-72 */}
                      <button
                        className="text-[10px] font-bold px-2 py-1 rounded border border-teal-200 text-teal-700 hover:bg-teal-50 active:bg-teal-100 transition-colors tracking-wide shrink-0"
                        title="Formulario RG-72"
                      >
                        RG-72
                      </button>
                      {/* RT-44: Retiro de muestra de muestroteca */}
                      <button
                        className="text-[10px] font-bold px-2 py-1 rounded border border-orange-200 text-orange-700 hover:bg-orange-50 active:bg-orange-100 transition-colors tracking-wide shrink-0"
                        title="Registrar retiro RT-44 (Muestroteca)"
                      >
                        RT-44
                      </button>
                      {/* + Muestra: registrar cantidades adicionales recibidas */}
                      <button
                        onClick={() => openMuestra(item.id)}
                        className="text-[10px] font-bold px-2 py-1 rounded border border-emerald-200 text-emerald-700 hover:bg-emerald-50 active:bg-emerald-100 transition-colors tracking-wide shrink-0 flex items-center gap-1"
                        title="Registrar muestra adicional"
                      >
                        <Layers className="w-3 h-3" /> + Muestra
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal + Muestra Adicional */}
      {showMuestraModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 flex-shrink-0">
              <div>
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" /> Muestra Adicional
                </h3>
                {muestraItemId && <p className="text-xs text-slate-500 mt-0.5">{muestraItemId}</p>}
              </div>
              <button onClick={closeMuestra} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              <p className="text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded p-3">
                Las cantidades ingresadas se sumarán a las ya registradas para esta recepción.
              </p>

              <div data-testid="muestra-step-4">
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Paso 4</p>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Cantidades Recibidas</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className={labelCls}>Cantidad Total Recibida <span className="text-red-500">*</span></label>
                    <input
                      type="number" min="0" step="0.01"
                      value={form.cantidadTotal}
                      onChange={e => setForm(f => ({ ...f, cantidadTotal: e.target.value }))}
                      className={inputCls}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Para FFQQ</label>
                    <input
                      type="number" min="0" step="0.01"
                      value={form.cantidadFFQQ}
                      onChange={e => setForm(f => ({ ...f, cantidadFFQQ: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Para Microbiología</label>
                    <input
                      type="number" min="0" step="0.01"
                      value={form.cantidadMicro}
                      onChange={e => setForm(f => ({ ...f, cantidadMicro: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>Muestroteca</label>
                    <input
                      type="number" min="0" step="0.01"
                      value={form.cantidadMuestroteca}
                      onChange={e => setForm(f => ({ ...f, cantidadMuestroteca: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>

              <div data-testid="muestra-step-5">
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Paso 5</p>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Documentos</p>
                <div>
                  <label className={labelCls}>Observaciones</label>
                  <textarea
                    rows={3}
                    value={form.observaciones}
                    onChange={e => setForm(f => ({ ...f, observaciones: e.target.value }))}
                    className={`${inputCls} resize-none`}
                    placeholder="Notas sobre esta entrega adicional..."
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex gap-3 justify-end flex-shrink-0">
              <button onClick={closeMuestra} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded text-sm font-bold hover:bg-slate-50">
                Cancelar
              </button>
              <button
                onClick={handleGuardarMuestra}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded text-sm font-bold shadow-sm"
              >
                Guardar Muestra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
