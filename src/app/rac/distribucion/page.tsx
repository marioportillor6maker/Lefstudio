"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Network, FileCheck, FlaskConical, Archive,
  Send, Save, ShieldAlert, CheckCircle2, Clock, Plus, Trash2,
  User, Calendar,
} from "lucide-react";
import type { AreaRow, DistribucionRecepcion, FormErrors, RT159Payload } from "./_types/distribucion.types";
import {
  MOCK_RECEPCIONES_RAC, AREAS_DESTINO, UNIDADES_MEDIDA, MOCK_RESPONSABLE_SESION,
  type RecepcionRAC,
} from "./_data/distribucionMockData";

// ─── Iconos por área (separados del estado para evitar recreación en cada render) ──
const AREA_ICONS: Record<string, React.ReactNode> = {
  doct:      <FileCheck   className="w-4 h-4 text-blue-600"   aria-hidden />,
  micro:     <FlaskConical className="w-4 h-4 text-purple-600" aria-hidden />,
  biblioteca: <Archive    className="w-4 h-4 text-orange-600" aria-hidden />,
};

function makeInitialRows(): AreaRow[] {
  return AREAS_DESTINO.map(a => ({ id: a.id, name: a.name, cantidad: "", unidad: "", responsable: "" }));
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function DistribucionPage() {
  // ── Selección de recepción ────────────────────────────────────────────────────
  const [recepcionSel, setRecepcionSel] = useState<RecepcionRAC | null>(null);

  // ── Filas de distribución por área ───────────────────────────────────────────
  const [areaRows, setAreaRows] = useState<AreaRow[]>(makeInitialRows());

  // ── Observaciones de la distribución actual ───────────────────────────────────
  const [observaciones, setObservaciones] = useState("");

  // ── Lista de distribuciones agregadas al RT ───────────────────────────────────
  const [distribuciones, setDistribuciones] = useState<DistribucionRecepcion[]>([]);

  // ── Errores de validación (form de configuración) ────────────────────────────
  const [errors, setErrors] = useState<FormErrors>({});

  // ── Error al intentar emitir sin distribuciones ───────────────────────────────
  const [saveError, setSaveError] = useState("");

  // IDs ya agregados — evita duplicados en el mismo RT
  const addedIds = new Set(distribuciones.map(d => d.recepcionId));

  // ── Handlers ──────────────────────────────────────────────────────────────────

  const handleRecepcionChange = (id: string) => {
    const found = MOCK_RECEPCIONES_RAC.find(r => r.id === id) ?? null;
    setRecepcionSel(found);
    setAreaRows(makeInitialRows());
    if (errors.recepcion) setErrors(prev => { const n = { ...prev }; delete n.recepcion; return n; });
  };

  const updateRow = (id: string, field: keyof Pick<AreaRow, "cantidad" | "unidad" | "responsable">, value: string) => {
    setAreaRows(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
    if (errors.areas) setErrors(prev => { const n = { ...prev }; delete n.areas; return n; });
  };

  const handleAgregar = () => {
    const newErrors: FormErrors = {};

    if (!recepcionSel) {
      newErrors.recepcion = "Debe seleccionar una recepción";
    } else if (addedIds.has(recepcionSel.id)) {
      newErrors.recepcion = `La recepción ${recepcionSel.id} ya fue agregada a este RT`;
    }

    const negativas = areaRows.filter(r => r.cantidad !== "" && parseFloat(r.cantidad) < 0);
    if (negativas.length > 0) {
      newErrors.areas = "No se permiten cantidades negativas";
    } else {
      const rowsConCantidad = areaRows.filter(r => parseFloat(r.cantidad) > 0);
      if (rowsConCantidad.length === 0) {
        newErrors.areas = "Ingrese cantidad distribuida en al menos un área";
      } else {
        const sinUnidad = rowsConCantidad.filter(r => !r.unidad);
        if (sinUnidad.length > 0) {
          newErrors.areas = `Seleccione unidad para: ${sinUnidad.map(r => r.name).join(", ")}`;
        }
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const rowsConCantidad = areaRows.filter(r => parseFloat(r.cantidad) > 0);
    const distribucionPorArea = rowsConCantidad.map(r => ({
      area: r.name,
      areaId: r.id,
      cantidad: parseFloat(r.cantidad),
      unidad: r.unidad as DistribucionRecepcion["distribucionPorArea"][0]["unidad"],
      responsable: r.responsable,
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
    // PENDIENTE BACKEND: enviar payload al servidor.
    // El servidor asignará: id (correlativo), fechaDistribucion y verificará responsableEmision.
    const payload: RT159Payload = {
      id: null,
      formato: "RT-159",
      fechaDistribucion: null,
      responsableEmision: MOCK_RESPONSABLE_SESION,
      distribuciones,
    };
    console.log("RT-159 payload:", payload);
  };

  // ── Estilos reutilizables ─────────────────────────────────────────────────────
  const labelCls  = "block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5";
  const infoCls   = "px-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-slate-600 text-sm";
  const errorCls  = "text-[11px] text-danger mt-1";
  const inputCls  = "w-full px-3 py-2 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-sm";

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 pb-12">

      {/* ── Header ─────────────────────────────────────────────────────────────── */}
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
          <button
            data-testid="borrador-btn"
            type="button"
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" /> Guardar Borrador
          </button>
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

      {/* ── Panel: Identificación del RT ────────────────────────────────────────── */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
            <FileCheck className="w-4 h-4 text-primary" /> Identificación del RT-159
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* ID del RT — generado por servidor */}
            <div>
              <label className={labelCls}>ID del RT</label>
              <div data-testid="rt-id-info" className={infoCls}>
                <span className="italic text-slate-400">Se generará al guardar</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {/* PENDIENTE BACKEND: el servidor asignará el correlativo definitivo al emitir. */}
                El servidor asignará el correlativo definitivo.
              </p>
            </div>

            {/* Responsable — usuario autenticado */}
            <div>
              <label className={labelCls}>
                <User className="w-3 h-3 inline mr-1" aria-hidden />
                Responsable Emisión
              </label>
              <div data-testid="responsable-info" className={infoCls}>
                {MOCK_RESPONSABLE_SESION}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {/* PENDIENTE BACKEND: proviene del usuario autenticado en sesión. */}
                Tomado del usuario autenticado en sesión.
              </p>
            </div>

            {/* Fecha Distribución — del servidor */}
            <div>
              <label className={labelCls}>
                <Calendar className="w-3 h-3 inline mr-1" aria-hidden />
                Fecha Distribución
              </label>
              <div data-testid="fecha-distribucion-info" className={infoCls}>
                <span className="italic text-slate-400">Se asignará al emitir</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {/* PENDIENTE BACKEND: el servidor registrará la fecha y hora exactas al emitir. */}
                El servidor registrará la fecha y hora exacta de emisión.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Panel: Configurar Distribución ──────────────────────────────────────── */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
            <Network className="w-4 h-4 text-primary" /> Configurar Distribución
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Seleccione una recepción, configure distribución por área y agréguela al RT. Puede repetir el proceso para varias recepciones.
          </p>
        </div>

        <div className="p-6 space-y-6">

          {/* Recepción + Cantidad RAC */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelCls}>Recepción Asociada <span className="text-danger">*</span></label>
              <select
                data-testid="recepcion-select"
                value={recepcionSel?.id ?? ""}
                onChange={e => handleRecepcionChange(e.target.value)}
                className={`${inputCls} font-medium text-slate-800 ${errors.recepcion ? "border-danger" : ""}`}
              >
                <option value="">Seleccione recepción RAC...</option>
                {MOCK_RECEPCIONES_RAC.map(r => (
                  <option key={r.id} value={r.id} disabled={addedIds.has(r.id)}>
                    {r.id} — {r.producto}{addedIds.has(r.id) ? " (ya agregada)" : ""}
                  </option>
                ))}
              </select>
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
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider w-28">Cantidad</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider w-36">Unidad</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Fecha Recibido</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-right">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {areaRows.map(row => (
                    <tr key={row.id} data-testid={`area-row-${row.id}`} className="hover:bg-slate-50 transition-colors">

                      {/* Área */}
                      <td className="px-4 py-3">
                        <span className="font-bold text-slate-800 flex items-center gap-2">
                          {AREA_ICONS[row.id]}
                          {row.name}
                        </span>
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

                      {/* Cantidad */}
                      <td className="px-4 py-3">
                        <input
                          data-testid={`cantidad-${row.id}`}
                          type="number"
                          min="0"
                          step="1"
                          placeholder="0"
                          value={row.cantidad}
                          onChange={e => updateRow(row.id, "cantidad", e.target.value)}
                          disabled={!recepcionSel}
                          className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-xs text-center disabled:opacity-40 disabled:cursor-not-allowed"
                        />
                      </td>

                      {/* Unidad — combobox por fila */}
                      <td className="px-4 py-3">
                        <select
                          data-testid={`unidad-${row.id}`}
                          value={row.unidad}
                          onChange={e => updateRow(row.id, "unidad", e.target.value)}
                          disabled={!recepcionSel}
                          className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-xs disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <option value="">Unidad...</option>
                          {UNIDADES_MEDIDA.map(u => (
                            <option key={u} value={u}>{u}</option>
                          ))}
                        </select>
                      </td>

                      {/* Fecha Recibido — read-only, informativa */}
                      <td className="px-4 py-3">
                        <span
                          data-testid={`fecha-recibido-${row.id}`}
                          className="text-xs text-slate-400 italic"
                        >
                          {/* PENDIENTE BACKEND: se registrará cuando el área confirme recepción. */}
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

          {/* Observaciones */}
          <div>
            <label className={labelCls}>Observaciones</label>
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

          {/* Info: seleccionar recepción primero */}
          {!recepcionSel && (
            <div className="p-3 bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" aria-hidden />
              <p>Seleccione una <strong>Recepción</strong> para habilitar los campos de distribución por área.</p>
            </div>
          )}

          {/* Botón agregar */}
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

      {/* ── Tabla inferior: Distribuciones del RT ───────────────────────────────── */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
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
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Áreas / Cant. Distribuida</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Observaciones</th>
                  <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {distribuciones.map((d, i) => {
                  const totalDist = d.distribucionPorArea.reduce((acc, a) => acc + a.cantidad, 0);
                  return (
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
                          <span className="text-[10px] text-slate-400 mt-0.5">Total dist.: {totalDist}</span>
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
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Error al emitir sin distribuciones */}
        {saveError && (
          <div className="mx-6 my-3 p-3 bg-red-50 border border-red-200 text-danger text-sm rounded flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" aria-hidden />
            <p data-testid="save-error">{saveError}</p>
          </div>
        )}
      </div>
    </div>
  );
}
