"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft, Network, FileCheck, FlaskConical, Archive,
  Send, ShieldAlert, CheckCircle2, Clock, Plus, Trash2,
  User, Calendar, Search, X,
} from "lucide-react";
import type { AreaRow, DistribucionRecepcion, FormErrors, RT159Payload } from "./_types/distribucion.types";
import {
  MOCK_RECEPCIONES_RAC, AREAS_DESTINO, MOCK_RESPONSABLE_SESION,
  type RecepcionRAC,
} from "./_data/distribucionMockData";

const AREA_ICONS: Record<string, React.ReactNode> = {
  doct:        <FileCheck    className="w-4 h-4 text-blue-600"   aria-hidden />,
  micro:       <FlaskConical className="w-4 h-4 text-purple-600" aria-hidden />,
  muestroteca: <Archive      className="w-4 h-4 text-orange-600" aria-hidden />,
};

function getCantidadPorArea(rec: RecepcionRAC, areaId: string): number {
  if (areaId === "doct")        return rec.cantidadDocto;
  if (areaId === "micro")       return rec.cantidadMicro;
  if (areaId === "muestroteca") return rec.cantidadMuestroteca;
  return 0;
}

function makeInitialRows(rec: RecepcionRAC | null = null): AreaRow[] {
  return AREAS_DESTINO.map(a => ({
    id: a.id,
    name: a.name,
    cantidad: rec ? getCantidadPorArea(rec, a.id) : 0,
    unidad: rec ? (rec.unidadRAC as AreaRow["unidad"]) : "",
    responsable: "",
    observacion: "",
  }));
}

function DistribucionPageContent() {
  const searchParams = useSearchParams();
  const recepcionParam = searchParams.get('recepcion') ?? '';

  const [recepcionSel, setRecepcionSel] = useState<RecepcionRAC | null>(
    () => (recepcionParam ? MOCK_RECEPCIONES_RAC.find(r => r.id === recepcionParam) ?? null : null)
  );
  const [recepcionQuery, setRecepcionQuery] = useState<string>(
    () => recepcionParam && MOCK_RECEPCIONES_RAC.some(r => r.id === recepcionParam) ? recepcionParam : ''
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  const [areaRows, setAreaRows] = useState<AreaRow[]>(() => makeInitialRows(
    recepcionParam ? MOCK_RECEPCIONES_RAC.find(r => r.id === recepcionParam) ?? null : null
  ));
  const [observaciones, setObservaciones] = useState("");
  const [distribuciones, setDistribuciones] = useState<DistribucionRecepcion[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [saveError, setSaveError] = useState("");

  const addedIds = new Set(distribuciones.map(d => d.recepcionId));

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const recepcionOptions = recepcionQuery.trim().length > 0
    ? MOCK_RECEPCIONES_RAC.filter(r => {
        const q = recepcionQuery.toLowerCase();
        return r.id.toLowerCase().includes(q)
          || r.producto.toLowerCase().includes(q)
          || r.cliente.toLowerCase().includes(q);
      }).slice(0, 8)
    : [];

  const handleRecepcionQueryChange = (val: string) => {
    setRecepcionQuery(val);
    setShowDropdown(true);
    if (recepcionSel && val !== recepcionSel.id) {
      setRecepcionSel(null);
      setAreaRows(makeInitialRows());
    }
    if (errors.recepcion) setErrors(prev => { const n = { ...prev }; delete n.recepcion; return n; });
  };

  const handleRecepcionSelect = (rec: RecepcionRAC) => {
    setRecepcionSel(rec);
    setRecepcionQuery(rec.id);
    setShowDropdown(false);
    setAreaRows(makeInitialRows(rec));
    if (errors.recepcion) setErrors(prev => { const n = { ...prev }; delete n.recepcion; return n; });
  };

  const updateRow = (id: string, field: "responsable" | "observacion", value: string) => {
    setAreaRows(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleAgregar = () => {
    const newErrors: FormErrors = {};
    if (!recepcionSel) {
      newErrors.recepcion = "Debe seleccionar una recepción";
    } else if (addedIds.has(recepcionSel.id)) {
      newErrors.recepcion = `La recepción ${recepcionSel.id} ya fue agregada a este RT`;
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const distribucionPorArea = areaRows.map(r => ({
      area: r.name,
      areaId: r.id,
      cantidad: r.cantidad,
      unidad: r.unidad as DistribucionRecepcion["distribucionPorArea"][0]["unidad"],
      responsable: r.responsable,
      observacion: r.observacion,
      fechaRecibido: null,
    }));

    const nueva: DistribucionRecepcion = {
      recepcionId: recepcionSel!.id,
      producto: recepcionSel!.producto,
      cantidadIngresadaRAC: recepcionSel!.cantidadIngresadaRAC,
      unidadRAC: recepcionSel!.unidadRAC,
      observaciones,
      distribucionPorArea,
    };

    setDistribuciones(prev => [...prev, nueva]);
    setRecepcionSel(null);
    setRecepcionQuery("");
    setAreaRows(makeInitialRows());
    setObservaciones("");
    setErrors({});
    setSaveError("");
  };

  const handleEliminar = (index: number) => {
    setDistribuciones(prev => prev.filter((_, i) => i !== index));
  };

  const handleEmitir = () => {
    if (distribuciones.length === 0) {
      setSaveError("Debe agregar al menos una distribución antes de emitir el RT-159");
      return;
    }
    setSaveError("");
    const payload: RT159Payload = {
      id: null,
      formato: "RT-159",
      fechaDistribucion: null,
      responsableEmision: MOCK_RESPONSABLE_SESION,
      distribuciones,
    };
    console.log("RT-159 payload:", payload);
  };

  const labelCls  = "block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5";
  const infoCls   = "px-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-slate-600 text-sm";
  const errorCls  = "text-[11px] text-danger mt-1";
  const inputCls  = "w-full px-3 py-2 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-sm";

  return (
    <div className="space-y-4 sm:space-y-6 pb-8 sm:pb-12">

      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-md border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/rac" className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Network className="w-6 h-6 text-primary" />
              Distribución RT-159
            </h1>
            <p className="text-slate-500 text-sm mt-1">Asignación de muestras físicas y expedientes a los laboratorios correspondientes.</p>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button
            data-testid="emitir-btn"
            type="button"
            onClick={handleEmitir}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded text-sm font-bold transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" /> Emitir y Distribuir
          </button>
        </div>
      </div>

      {/* Panel: Identificación del RT */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
            <FileCheck className="w-4 h-4 text-primary" /> Identificación del RT-159
          </h2>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelCls}>ID del RT</label>
              <div data-testid="rt-id-info" className={infoCls}>
                <span className="italic text-slate-400">Se generará al guardar</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>
                <User className="w-3 h-3 inline mr-1" aria-hidden />
                Responsable Emisión
              </label>
              <div data-testid="responsable-info" className={infoCls}>
                {MOCK_RESPONSABLE_SESION}
              </div>
            </div>
            <div>
              <label className={labelCls}>
                <Calendar className="w-3 h-3 inline mr-1" aria-hidden />
                Fecha Distribución
              </label>
              <div data-testid="fecha-distribucion-info" className={infoCls}>
                <span className="italic text-slate-400">Se asignará al emitir</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel: Configurar Distribución */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
            <Network className="w-4 h-4 text-primary" /> Configurar Distribución
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Seleccione una recepción, agregue observaciones por área y agréguela al RT.
          </p>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">

          {/* Recepción + Cantidad RAC */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelCls}>Recepción Asociada <span className="text-danger">*</span></label>
              <div ref={autocompleteRef} className="relative">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    data-testid="recepcion-search"
                    type="text"
                    value={recepcionQuery}
                    onChange={e => handleRecepcionQueryChange(e.target.value)}
                    onFocus={() => { if (recepcionQuery) setShowDropdown(true); }}
                    placeholder="Buscar por Nº recepción, producto o cliente..."
                    className={`pl-9 pr-8 ${inputCls} ${errors.recepcion ? "border-danger" : ""}`}
                    autoComplete="off"
                  />
                  {recepcionQuery && (
                    <button
                      data-testid="clear-recepcion"
                      type="button"
                      onClick={() => { setRecepcionSel(null); setRecepcionQuery(""); setShowDropdown(false); setAreaRows(makeInitialRows()); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                {showDropdown && recepcionOptions.length > 0 && (
                  <ul
                    data-testid="recepcion-dropdown"
                    className="absolute z-30 w-full mt-1 bg-white border border-slate-200 rounded shadow-lg max-h-60 overflow-y-auto"
                  >
                    {recepcionOptions.map(r => {
                      const alreadyAdded = addedIds.has(r.id);
                      return (
                        <li key={r.id}>
                          <button
                            data-testid="recepcion-option"
                            type="button"
                            disabled={alreadyAdded}
                            onClick={() => !alreadyAdded && handleRecepcionSelect(r)}
                            className={`w-full text-left px-3 py-2.5 transition-colors ${alreadyAdded ? "opacity-50 cursor-not-allowed bg-slate-50" : "hover:bg-blue-50"}`}
                          >
                            <span className="block text-xs font-bold text-primary">{r.id}{alreadyAdded ? " (ya agregada)" : ""}</span>
                            <span className="block text-xs text-slate-700">{r.producto}</span>
                            <span className="block text-[10px] text-slate-500">{r.cliente} — {r.formaFarmaceutica}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              {errors.recepcion && <p className={errorCls}>{errors.recepcion}</p>}
            </div>

            {recepcionSel ? (
              <div data-testid="cantidad-rac-info">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                    Cantidad Ingresada a RAC
                  </p>
                  <p className="text-2xl font-black text-blue-800 mt-1">
                    {recepcionSel.cantidadIngresadaRAC}
                    <span className="text-sm font-normal ml-2 text-blue-600">{recepcionSel.unidadRAC}</span>
                  </p>
                  <p className="text-[10px] text-blue-600 mt-0.5">
                    {recepcionSel.producto} — {recepcionSel.cliente}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <p className="text-xs text-slate-400 italic">Seleccione una recepción para ver la cantidad ingresada a RAC.</p>
              </div>
            )}
          </div>

          {/* Tabla Distribución por Área */}
          <div>
            <h3 className="font-bold text-slate-700 text-sm mb-3 flex items-center gap-2">
              <Network className="w-3.5 h-3.5 text-primary" aria-hidden /> Distribución por Área
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-md">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Área Destino</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Responsable Recibe</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Observación</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Fecha Recibido</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-right">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {areaRows.map(row => (
                    <tr key={row.id} data-testid={`area-row-${row.id}`} className="hover:bg-slate-50 transition-colors">

                      {/* Área + cantidad/unidad como etiqueta */}
                      <td className="px-4 py-3">
                        <span className="font-bold text-slate-800 flex items-center gap-2">
                          {AREA_ICONS[row.id]}
                          {row.name}
                        </span>
                        {recepcionSel && (
                          <span
                            data-testid={`cantidad-label-${row.id}`}
                            className="text-[10px] text-slate-500 mt-0.5 block"
                          >
                            {row.cantidad} {row.unidad}
                          </span>
                        )}
                      </td>

                      {/* Responsable recibe */}
                      <td className="px-4 py-3">
                        <select
                          data-testid={`responsable-${row.id}`}
                          value={row.responsable}
                          onChange={e => updateRow(row.id, "responsable", e.target.value)}
                          disabled={!recepcionSel}
                          className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-xs disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <option value="">Seleccione...</option>
                          {AREAS_DESTINO.find(a => a.id === row.id)?.responsables.map((r, i) => (
                            <option key={i} value={r}>{r}</option>
                          ))}
                        </select>
                      </td>

                      {/* Observación por área */}
                      <td className="px-4 py-3">
                        <input
                          data-testid={`observacion-${row.id}`}
                          type="text"
                          placeholder="Observación..."
                          value={row.observacion}
                          onChange={e => updateRow(row.id, "observacion", e.target.value)}
                          disabled={!recepcionSel}
                          className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-xs disabled:opacity-40 disabled:cursor-not-allowed min-w-[160px]"
                        />
                      </td>

                      {/* Fecha Recibido — read-only */}
                      <td className="px-4 py-3">
                        <span
                          data-testid={`fecha-recibido-${row.id}`}
                          className="text-xs text-slate-400 italic"
                        >
                          Pendiente de recepción
                        </span>
                      </td>

                      {/* Estado */}
                      <td className="px-4 py-3 text-right">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold tracking-wider bg-orange-100 text-orange-800 border border-orange-200 uppercase">
                          <Clock className="w-3 h-3" aria-hidden /> Pendiente
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {errors.areas && <p className={`${errorCls} mt-2`}>{errors.areas}</p>}
          </div>

          {/* Observaciones generales */}
          <div>
            <label className={labelCls}>Observaciones Generales</label>
            <textarea
              data-testid="observaciones"
              rows={3}
              value={observaciones}
              onChange={e => setObservaciones(e.target.value)}
              placeholder="Notas adicionales para esta distribución..."
              disabled={!recepcionSel}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-sm resize-none disabled:opacity-40 disabled:cursor-not-allowed"
            />
          </div>

          {!recepcionSel && (
            <div className="p-3 bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" aria-hidden />
              <p>Seleccione una <strong>Recepción</strong> para habilitar los campos de distribución por área.</p>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              data-testid="agregar-btn"
              type="button"
              onClick={handleAgregar}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded text-sm font-bold transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" aria-hidden /> Agregar al RT-159
            </button>
          </div>
        </div>
      </div>

      {/* Tabla inferior: Distribuciones del RT */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h2 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-primary" aria-hidden /> Distribuciones del RT-159
            {distribuciones.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-primary text-white rounded-full text-[10px] font-black">
                {distribuciones.length}
              </span>
            )}
          </h2>
        </div>

        {distribuciones.length === 0 ? (
          <div data-testid="distribuciones-empty" className="p-8 text-center text-slate-400">
            <Network className="w-8 h-8 mx-auto mb-2 opacity-30" aria-hidden />
            <p className="text-sm">No hay distribuciones agregadas.</p>
            <p className="text-xs mt-1">Configure una recepción arriba y haga clic en "Agregar al RT-159".</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table data-testid="distribuciones-table" className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Nº</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Nº Recepción</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Producto</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-right">Cant. RAC</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Áreas / Distribución</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Observaciones</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {distribuciones.map((d, i) => (
                  <tr key={d.recepcionId} data-testid={`dist-row-${d.recepcionId}`} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-slate-500 font-medium">{i + 1}</td>
                    <td className="px-4 py-3 font-bold text-primary">{d.recepcionId}</td>
                    <td className="px-4 py-3 text-slate-800 truncate max-w-[140px]" title={d.producto}>
                      {d.producto}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-slate-700">
                      {d.cantidadIngresadaRAC}{" "}
                      <span className="text-[10px] font-normal text-slate-400">{d.unidadRAC}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-0.5">
                        {d.distribucionPorArea.map(a => (
                          <span key={a.area} className="text-xs text-slate-600">
                            {a.area}: <strong>{a.cantidad} {a.unidad}</strong>
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500 max-w-[120px] truncate" title={d.observaciones || "—"}>
                      {d.observaciones || <span className="italic text-slate-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        data-testid={`eliminar-${d.recepcionId}`}
                        type="button"
                        onClick={() => handleEliminar(i)}
                        title="Eliminar distribución"
                        className="p-1.5 text-slate-400 hover:text-danger hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {saveError && (
          <div className="mx-4 sm:mx-6 my-3 p-3 bg-red-50 border border-red-200 text-danger text-sm rounded flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" aria-hidden />
            <p data-testid="save-error">{saveError}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DistribucionPage() {
  return (
    <Suspense>
      <DistribucionPageContent />
    </Suspense>
  );
}
