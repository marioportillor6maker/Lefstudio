"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft, CreditCard, CheckCircle2, AlertCircle, FileText,
  Printer, Check, Search, Plus, ListTodo, Download, X,
  ChevronLeft, ChevronRight, DollarSign, Info,
} from "lucide-react";
import { mockIngresosList } from "@/lib/mockData";
import type { ProformaGenerada, FormErrors, TipoAnalisis, MetodoPago } from "./_types/proforma.types";
import { MOCK_PROFORMAS } from "./_data/proformaMockData";

// ─── Constantes ───────────────────────────────────────────────────────────────
// ISV 15% — Artículo 15 Ley del ISV, Honduras.
// PENDIENTE: mover a configuración global del sistema cuando esté disponible.
// PENDIENTE FUNCIONAL: confirmar con el cliente si los servicios del LEF están
// gravados con ISV o exentos según su clasificación fiscal.
const ISV_RATE = 0.15;
const ITEMS_PER_PAGE = 10;

// ─── Número a letras (español, Honduras) ─────────────────────────────────────
const UNIDADES = [
  "", "UNO", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE",
  "DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE",
  "DIECISÉIS", "DIECISIETE", "DIECIOCHO", "DIECINUEVE",
];
const VEINTIS = [
  "VEINTE", "VEINTIUNO", "VEINTIDÓS", "VEINTITRÉS", "VEINTICUATRO",
  "VEINTICINCO", "VEINTISÉIS", "VEINTISIETE", "VEINTIOCHO", "VEINTINUEVE",
];
const DECENAS = ["", "", "", "TREINTA", "CUARENTA", "CINCUENTA", "SESENTA", "SETENTA", "OCHENTA", "NOVENTA"];
const CENTENAS = [
  "", "CIEN", "DOSCIENTOS", "TRESCIENTOS", "CUATROCIENTOS", "QUINIENTOS",
  "SEISCIENTOS", "SETECIENTOS", "OCHOCIENTOS", "NOVECIENTOS",
];

function convertirCentena(n: number): string {
  if (n === 0) return "";
  if (n < 20) return UNIDADES[n];
  if (n < 30) return VEINTIS[n - 20];
  if (n < 100) {
    const d = Math.floor(n / 10);
    const u = n % 10;
    return u === 0 ? DECENAS[d] : `${DECENAS[d]} Y ${UNIDADES[u]}`;
  }
  const c = Math.floor(n / 100);
  const resto = n % 100;
  const centStr = c === 1 && resto > 0 ? "CIENTO" : CENTENAS[c];
  return resto === 0 ? centStr : `${centStr} ${convertirCentena(resto)}`;
}

export function numeroALetras(num: number, moneda: "L" | "$" = "L"): string {
  if (!isFinite(num) || num <= 0) return "";
  const entero = Math.floor(num);
  const centavos = Math.round((num - entero) * 100);
  let texto: string;

  if (entero === 0) {
    texto = "CERO";
  } else if (entero < 1000) {
    texto = convertirCentena(entero);
  } else if (entero < 1_000_000) {
    const miles = Math.floor(entero / 1000);
    const resto = entero % 1000;
    const milesStr = miles === 1 ? "MIL" : `${convertirCentena(miles)} MIL`;
    texto = resto === 0 ? milesStr : `${milesStr} ${convertirCentena(resto)}`;
  } else {
    const millones = Math.floor(entero / 1_000_000);
    const restoTotal = entero % 1_000_000;
    const mText = millones === 1 ? "UN MILLÓN" : `${convertirCentena(millones)} MILLONES`;
    if (restoTotal === 0) {
      texto = mText;
    } else if (restoTotal < 1000) {
      texto = `${mText} ${convertirCentena(restoTotal)}`;
    } else {
      const miles = Math.floor(restoTotal / 1000);
      const resto = restoTotal % 1000;
      const milesStr = miles === 1 ? "MIL" : `${convertirCentena(miles)} MIL`;
      texto = resto === 0 ? `${mText} ${milesStr}` : `${mText} ${milesStr} ${convertirCentena(resto)}`;
    }
  }

  const monedaLabel = moneda === "L" ? "LEMPIRAS" : "DÓLARES";
  return `${texto} ${monedaLabel} ${centavos.toString().padStart(2, "0")}/100`;
}

// ─── Utilidad de impresión / descarga ────────────────────────────────────────
// Abre una ventana nueva con el contenido de la proforma formateado para imprimir.
// El usuario puede "Guardar como PDF" desde el diálogo de impresión del navegador.
// PENDIENTE BACKEND: reemplazar con endpoint que genere PDF en servidor.
function printProforma(p: ProformaGenerada) {
  const win = window.open("", "_blank", "width=820,height=680");
  if (!win) return;
  const sym = p.moneda === "L" ? "L." : "US$";
  const fmt = (n: number) => `${sym} ${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  const tipoLabel = p.tipoAnalisis === "completo" ? "Análisis Completo"
    : p.tipoAnalisis === "parcial" ? "Análisis Parcial" : "Solo Microbiología";
  const metodoLabel = p.metodoPago === "transferencia" ? "Transferencia Bancaria"
    : p.metodoPago === "deposito" ? "Depósito en Ventanilla" : "TGR-1 (Gobierno)";

  win.document.write(`<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"/><title>Proforma ${p.id}</title>
<style>
*{box-sizing:border-box}body{font-family:Arial,sans-serif;margin:0;padding:40px;color:#1e293b;font-size:13px}
.hdr{border-bottom:2px solid #0f172a;padding-bottom:12px;margin-bottom:20px}
.hdr h1{margin:0;font-size:16px}.hdr p{margin:2px 0;color:#64748b;font-size:11px}
h2{font-size:20px;font-weight:700;margin:16px 0 4px}
table{width:100%;border-collapse:collapse;margin:16px 0}
td,th{padding:8px 10px;border-bottom:1px solid #e2e8f0}
th{font-size:10px;text-transform:uppercase;color:#64748b;text-align:left}
.r{text-align:right}.total td{font-weight:700;font-size:15px;border-top:2px solid #0f172a}
.letras{font-style:italic;color:#475569;font-size:11px;margin:8px 0 0}
.ftr{margin-top:40px;font-size:10px;color:#94a3b8}
@media print{@page{margin:20mm}}
</style></head><body>
<div class="hdr">
  <h1>LABORATORIO DE ESPECIALIDADES FARMACÉUTICAS</h1>
  <p>Centro Químico Farmacéutico de Honduras (CQFH)</p>
  <p>Tel. (504) 2238-5544 &bull; Tegucigalpa, Honduras</p>
</div>
<h2>PROFORMA N&ordm; ${p.id}</h2>
<table>
  <tr><th>Recepción</th><td>${p.recepcionId}</td><th>Fecha Emisión</th><td>${p.fechaEmision}</td></tr>
  <tr><th>Producto</th><td>${p.producto}</td><th>Fecha Límite</th><td>${p.fechaLimite}</td></tr>
  <tr><th>Cliente</th><td>${p.cliente}</td><th>Método de Pago</th><td>${metodoLabel}</td></tr>
  <tr><th>Tipo de Análisis</th><td>${tipoLabel}</td><th>Plazo</th><td>${p.plazoDias} días</td></tr>
  ${p.nroOficio ? `<tr><th>Nro. Oficio</th><td colspan="3">${p.nroOficio}</td></tr>` : ""}
  ${p.nroOrdenARSA ? `<tr><th>Nro. Orden ARSA</th><td colspan="3">${p.nroOrdenARSA}</td></tr>` : ""}
</table>
<table>
  <thead><tr><th>Concepto</th><th class="r">Monto</th></tr></thead>
  <tbody>
    <tr><td>Precio base del análisis</td><td class="r">${fmt(p.precioBase)}</td></tr>
    <tr><td>ISV (15%)</td><td class="r">${fmt(p.isv)}</td></tr>
  </tbody>
  <tfoot><tr class="total"><td>TOTAL A PAGAR</td><td class="r">${fmt(p.total)}</td></tr></tfoot>
</table>
<p class="letras">SON: ${p.totalLetras}</p>
${p.observaciones ? `<p><strong>Observaciones:</strong> ${p.observaciones}</p>` : ""}
<div class="ftr">Documento generado ${new Date().toLocaleDateString("es-HN")}. Fecha oficial proviene del servidor en producción.</div>
</body></html>`);
  win.document.close();
  win.focus();
  setTimeout(() => { win.print(); }, 300);
}

// ─── Helpers de formato ───────────────────────────────────────────────────────
function fmtProformaMonto(p: ProformaGenerada): string {
  const sym = p.moneda === "L" ? "L." : "US$";
  return `${sym} ${p.total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function ProformasPagoPage() {
  // ── Datos ────────────────────────────────────────────────────────────────────
  const [proformas, setProformas] = useState<ProformaGenerada[]>(MOCK_PROFORMAS);

  // ── Form ─────────────────────────────────────────────────────────────────────
  const [recepcionQuery, setRecepcionQuery] = useState("");
  const [recepcionSel, setRecepcionSel] = useState<typeof mockIngresosList[0] | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [tipoAnalisis, setTipoAnalisis] = useState("");
  const [precioL, setPrecioL] = useState("");
  const [precioD, setPrecioD] = useState("");
  const [monedaActiva, setMonedaActiva] = useState<"L" | "$" | null>(null);
  const [plazoDias, setPlazoDias] = useState("15");
  const [metodoPago, setMetodoPago] = useState<MetodoPago>("transferencia");
  const [nroOficio, setNroOficio] = useState("");
  const [nroOrdenARSA, setNroOrdenARSA] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  // ── Calculated ───────────────────────────────────────────────────────────────
  const precioBase = monedaActiva === "L" ? (parseFloat(precioL) || 0) : (parseFloat(precioD) || 0);
  const isvAmount = precioBase * ISV_RATE;
  const totalAmount = precioBase + isvAmount;
  const totalLetras = precioBase > 0 ? numeroALetras(totalAmount, monedaActiva ?? "L") : "";

  // ── UI state ─────────────────────────────────────────────────────────────────
  const [showMuestraModal, setShowMuestraModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [nuevaProforma, setNuevaProforma] = useState<ProformaGenerada | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [refBancaria, setRefBancaria] = useState("");
  const [fechaEfectiva, setFechaEfectiva] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingProforma, setViewingProforma] = useState<ProformaGenerada | null>(null);

  // ── Table ────────────────────────────────────────────────────────────────────
  const [tableSearch, setTableSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const autocompleteRef = useRef<HTMLDivElement>(null);

  // Cierra el dropdown al hacer clic fuera
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Autocomplete ─────────────────────────────────────────────────────────────
  const recepcionOptions = recepcionQuery.trim().length > 0
    ? mockIngresosList.filter(r => {
        const q = recepcionQuery.toLowerCase();
        return r.id.toLowerCase().includes(q)
          || r.producto.toLowerCase().includes(q)
          || r.cliente.toLowerCase().includes(q);
      }).slice(0, 8)
    : [];

  const handleRecepcionQueryChange = (val: string) => {
    setRecepcionQuery(val);
    setShowDropdown(true);
    if (recepcionSel && val !== recepcionSel.id) setRecepcionSel(null);
    if (errors.recepcion) setErrors(prev => { const n = { ...prev }; delete n.recepcion; return n; });
  };

  const handleRecepcionSelect = (rec: typeof mockIngresosList[0]) => {
    setRecepcionSel(rec);
    setRecepcionQuery(rec.id);
    setShowDropdown(false);
    if (errors.recepcion) setErrors(prev => { const n = { ...prev }; delete n.recepcion; return n; });
  };

  // ── Precio handlers ───────────────────────────────────────────────────────────
  const handlePrecioLChange = (val: string) => {
    setPrecioL(val);
    if (val) { setPrecioD(""); setMonedaActiva("L"); }
    else setMonedaActiva(null);
    if (errors.precio) setErrors(prev => { const n = { ...prev }; delete n.precio; return n; });
  };

  const handlePrecioDChange = (val: string) => {
    setPrecioD(val);
    if (val) { setPrecioL(""); setMonedaActiva("$"); }
    else setMonedaActiva(null);
    if (errors.precio) setErrors(prev => { const n = { ...prev }; delete n.precio; return n; });
  };

  // ── Table filter + pagination ─────────────────────────────────────────────────
  const handleTableSearch = (val: string) => {
    setTableSearch(val);
    setCurrentPage(1);
  };

  const filteredProformas = proformas.filter(p => {
    const q = tableSearch.toLowerCase();
    return !q
      || p.id.toLowerCase().includes(q)
      || p.recepcionId.toLowerCase().includes(q)
      || p.producto.toLowerCase().includes(q)
      || p.estado.toLowerCase().includes(q)
      || p.cliente.toLowerCase().includes(q);
  });
  const totalPages = Math.max(1, Math.ceil(filteredProformas.length / ITEMS_PER_PAGE));
  const paginated = filteredProformas.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // ── Generar proforma ──────────────────────────────────────────────────────────
  const handleGenerar = () => {
    const newErrors: FormErrors = {};
    if (!recepcionSel) newErrors.recepcion = "Debe seleccionar una recepción";
    if (!tipoAnalisis) newErrors.tipoAnalisis = "Debe seleccionar el tipo de análisis";
    if (precioL && precioD) newErrors.precio = "Solo puede ingresar precio en una moneda";
    else if (!monedaActiva || precioBase <= 0) newErrors.precio = "Ingrese un precio mayor a cero";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // PENDIENTE BACKEND: fechaEmision debe venir del servidor, no generarse en cliente.
    const ahora = new Date();
    const toFecha = (d: Date) =>
      d.toLocaleDateString("es-HN", { day: "2-digit", month: "2-digit", year: "numeric" });
    const limitDate = new Date(ahora);
    limitDate.setDate(limitDate.getDate() + parseInt(plazoDias || "15"));

    const nueva: ProformaGenerada = {
      id: `PROF-${ahora.getFullYear()}-${String(proformas.length + 1).padStart(3, "0")}`,
      recepcionId: recepcionSel!.id,
      producto: recepcionSel!.producto,
      cliente: recepcionSel!.cliente,
      tipoAnalisis: tipoAnalisis as TipoAnalisis,
      moneda: monedaActiva!,
      precioBase,
      isv: isvAmount,
      total: totalAmount,
      totalLetras,
      fechaEmision: toFecha(ahora),
      plazoDias: parseInt(plazoDias || "15"),
      fechaLimite: toFecha(limitDate),
      metodoPago,
      nroOficio: nroOficio || undefined,
      nroOrdenARSA: nroOrdenARSA || undefined,
      observaciones: observaciones || undefined,
      estado: "Pendiente",
    };

    setProformas(prev => [nueva, ...prev]);
    setNuevaProforma(nueva);
    setShowSuccessModal(true);

    // Reset form
    setRecepcionSel(null);
    setRecepcionQuery("");
    setTipoAnalisis("");
    setPrecioL("");
    setPrecioD("");
    setMonedaActiva(null);
    setPlazoDias("15");
    setMetodoPago("transferencia");
    setNroOficio("");
    setNroOrdenARSA("");
    setObservaciones("");
    setErrors({});
  };

  // ── Confirmar pago ────────────────────────────────────────────────────────────
  const handleConfirmPago = () => {
    if (!confirmId) return;
    setProformas(prev => prev.map(p => p.id === confirmId ? { ...p, estado: "Pagado" } : p));
    setShowConfirmModal(false);
    setConfirmId(null);
    setRefBancaria("");
    setFechaEfectiva("");
  };

  // ── Indicadores calculados ────────────────────────────────────────────────────
  const totalEmitidas = proformas.length;
  const totalPagadas = proformas.filter(p => p.estado === "Pagado").length;
  const totalPendientes = proformas.filter(p => p.estado === "Pendiente" || p.estado === "Vencido").length;

  // ─── Label helpers ────────────────────────────────────────────────────────────
  const estadoBadge = (estado: ProformaGenerada["estado"]) => {
    if (estado === "Pagado") return "bg-green-100 text-green-800 border-green-200";
    if (estado === "Vencido") return "bg-red-100 text-danger border-red-200";
    return "bg-orange-100 text-orange-800 border-orange-200";
  };

  const inputCls = "w-full px-3 py-2 bg-white border border-slate-300 rounded focus:outline-none focus:border-primary text-sm";
  const labelCls = "block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1";
  const errorCls = "text-[11px] text-danger mt-1";

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 pb-12">

      {/* Header */}
      <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm flex items-center justify-between gap-4">
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
          <p className="text-3xl font-black text-slate-900 mt-2">{totalEmitidas}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-md border border-green-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-green-700 font-bold uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Pagos Confirmados
          </p>
          <p className="text-3xl font-black text-green-600 mt-2">{totalPagadas}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-md border border-orange-200 shadow-sm flex flex-col">
          <p className="text-[11px] text-orange-700 font-bold uppercase tracking-wider flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Pendientes / Vencidos
          </p>
          <p className="text-3xl font-black text-orange-600 mt-2">{totalPendientes}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ── Formulario ─────────────────────────────────────────────────────── */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <Plus className="w-4 h-4 text-primary" /> Emitir Nueva Proforma
              </h2>
            </div>
            <div className="p-5 space-y-4">

              {/* Recepción — autocomplete */}
              {/* PENDIENTE FUNCIONAL: preguntar al cliente si el autocomplete es suficiente
                  o requiere un modal de búsqueda avanzada (filtros por fecha, estado, área). */}
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
                        onClick={() => { setRecepcionSel(null); setRecepcionQuery(""); setShowDropdown(false); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Dropdown */}
                  {showDropdown && recepcionOptions.length > 0 && (
                    <ul
                      data-testid="recepcion-dropdown"
                      className="absolute z-30 w-full mt-1 bg-white border border-slate-200 rounded shadow-lg max-h-60 overflow-y-auto"
                    >
                      {recepcionOptions.map(r => (
                        <li key={r.id}>
                          <button
                            data-testid="recepcion-option"
                            type="button"
                            onClick={() => handleRecepcionSelect(r)}
                            className="w-full text-left px-3 py-2.5 hover:bg-blue-50 transition-colors"
                          >
                            <span className="block text-xs font-bold text-primary">{r.id}</span>
                            <span className="block text-xs text-slate-700">{r.producto}</span>
                            <span className="block text-[10px] text-slate-500">{r.cliente} — {r.etapa}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {errors.recepcion && <p className={errorCls}>{errors.recepcion}</p>}

                {/* Recepción seleccionada */}
                {recepcionSel && (
                  <div
                    data-testid="recepcion-card"
                    className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded flex items-start justify-between gap-2"
                  >
                    <div className="text-xs flex-1 min-w-0">
                      <p className="font-bold text-primary truncate">{recepcionSel.id}</p>
                      <p className="text-slate-700 truncate">{recepcionSel.producto}</p>
                      <p className="text-slate-500">{recepcionSel.cliente}</p>
                    </div>
                    <button
                      data-testid="ver-muestra"
                      type="button"
                      onClick={() => setShowMuestraModal(true)}
                      title="Ver información de la muestra"
                      className="flex-shrink-0 p-1.5 bg-white border border-blue-200 rounded hover:bg-blue-100 transition-colors"
                    >
                      <Info className="w-3.5 h-3.5 text-primary" />
                    </button>
                  </div>
                )}
              </div>

              {/* Tipo de Análisis */}
              <div>
                <label className={labelCls}>Tipo de Análisis <span className="text-danger">*</span></label>
                <select
                  data-testid="tipo-analisis"
                  value={tipoAnalisis}
                  onChange={e => { setTipoAnalisis(e.target.value); if (errors.tipoAnalisis) setErrors(p => { const n = { ...p }; delete n.tipoAnalisis; return n; }); }}
                  className={`${inputCls} ${errors.tipoAnalisis ? "border-danger" : ""}`}
                >
                  <option value="">Seleccione tipo...</option>
                  <option value="completo">Análisis Completo</option>
                  <option value="parcial">Análisis Parcial</option>
                  <option value="micro">Solo Microbiología</option>
                </select>
                {errors.tipoAnalisis && <p className={errorCls}>{errors.tipoAnalisis}</p>}
              </div>

              {/* Precio — L o $ (mutuamente exclusivos) */}
              <div className="space-y-2">
                <label className={labelCls}>Precio <span className="text-danger">*</span> — ingrese en una sola moneda</label>
                {errors.precio && <p className={errorCls}>{errors.precio}</p>}

                {/* Lempiras */}
                <div className={`flex items-center gap-2 px-3 py-2 border rounded transition-colors ${
                  monedaActiva === "L" ? "border-primary bg-blue-50" : "border-slate-300 bg-white"
                } ${errors.precio && !precioL ? "border-danger" : ""}`}>
                  <span className="text-xs font-bold text-slate-600 w-6 flex-shrink-0">L.</span>
                  <input
                    data-testid="precio-l"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Precio en Lempiras"
                    value={precioL}
                    onChange={e => handlePrecioLChange(e.target.value)}
                    disabled={monedaActiva === "$"}
                    className="flex-1 bg-transparent focus:outline-none text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="text-center text-[10px] text-slate-400 font-bold">— O —</div>

                {/* Dólares */}
                <div className={`flex items-center gap-2 px-3 py-2 border rounded transition-colors ${
                  monedaActiva === "$" ? "border-primary bg-blue-50" : "border-slate-300 bg-white"
                } ${errors.precio && !precioD ? "border-danger" : ""}`}>
                  <DollarSign className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                  <input
                    data-testid="precio-d"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Precio en Dólares"
                    value={precioD}
                    onChange={e => handlePrecioDChange(e.target.value)}
                    disabled={monedaActiva === "L"}
                    className="flex-1 bg-transparent focus:outline-none text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* ISV + Total (read-only) */}
              {precioBase > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded p-3 space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Precio base</span>
                    <span className="font-medium">
                      {monedaActiva === "L" ? "L." : "US$"} {precioBase.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>ISV (15%) <span className="text-slate-400 italic">— read-only</span></span>
                    <span data-testid="isv-value" className="font-medium text-slate-500">
                      {monedaActiva === "L" ? "L." : "US$"} {isvAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-slate-900 border-t border-slate-300 pt-1.5">
                    <span>TOTAL</span>
                    <span data-testid="total-value">
                      {monedaActiva === "L" ? "L." : "US$"} {totalAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </div>
                  {totalLetras && (
                    <p data-testid="total-letras" className="text-[10px] italic text-slate-500 pt-0.5">
                      SON: {totalLetras}
                    </p>
                  )}
                </div>
              )}

              {/* Nro de Oficio */}
              {/* PENDIENTE FUNCIONAL: confirmar con el cliente si es obligatorio */}
              <div>
                <label className={labelCls}>
                  Número de Oficio
                  <span className="ml-1 text-slate-400 normal-case font-normal">(opcional)</span>
                </label>
                <input
                  data-testid="nro-oficio"
                  type="text"
                  placeholder="Ej. OF-2026-0442"
                  value={nroOficio}
                  onChange={e => setNroOficio(e.target.value)}
                  className={inputCls}
                />
              </div>

              {/* Nro de Orden ARSA */}
              {/* PENDIENTE FUNCIONAL: confirmar si aplica solo para trámites ARSA */}
              <div>
                <label className={labelCls}>
                  Número de Orden ARSA
                  <span className="ml-1 text-slate-400 normal-case font-normal">(opcional)</span>
                </label>
                <input
                  data-testid="nro-orden-arsa"
                  type="text"
                  placeholder="Ej. ARSA-2026-001"
                  value={nroOrdenARSA}
                  onChange={e => setNroOrdenARSA(e.target.value)}
                  className={inputCls}
                />
              </div>

              {/* Plazo + Método de Pago */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Plazo (días)</label>
                  <input
                    type="number"
                    defaultValue="15"
                    min="1"
                    value={plazoDias}
                    onChange={e => setPlazoDias(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Método de Pago</label>
                  <select
                    value={metodoPago}
                    onChange={e => setMetodoPago(e.target.value as MetodoPago)}
                    className={inputCls}
                  >
                    <option value="transferencia">Transferencia</option>
                    <option value="deposito">Depósito</option>
                    <option value="tgr">TGR-1</option>
                  </select>
                </div>
              </div>

              {/* Observaciones */}
              <div>
                <label className={labelCls}>Observaciones</label>
                <textarea
                  rows={3}
                  placeholder="Notas adicionales para la proforma..."
                  value={observaciones}
                  onChange={e => setObservaciones(e.target.value)}
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* Generar */}
              <button
                data-testid="generar-proforma"
                type="button"
                onClick={handleGenerar}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded transition-colors shadow-sm text-sm"
              >
                Generar Proforma
              </button>
            </div>
          </div>
        </div>

        {/* ── Tabla Proformas Generadas ───────────────────────────────────────── */}
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
                  value={tableSearch}
                  onChange={e => handleTableSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table data-testid="proformas-table" className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Nº Proforma</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Recepción</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Producto</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Total</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Emisión / Límite</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Estado</th>
                    <th className="px-4 py-3 text-right text-[11px] uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-slate-400 text-sm">
                        No se encontraron proformas.
                      </td>
                    </tr>
                  ) : paginated.map(p => (
                    <tr key={p.id} className={`hover:bg-slate-50 transition-colors ${p.estado === "Vencido" ? "bg-red-50/30" : ""}`}>
                      <td className="px-4 py-3 font-bold text-slate-800">{p.id}</td>
                      <td className="px-4 py-3 text-primary font-medium">{p.recepcionId}</td>
                      <td className="px-4 py-3 truncate max-w-[120px]" title={p.producto}>{p.producto}</td>
                      <td className="px-4 py-3 font-bold text-slate-700">{fmtProformaMonto(p)}</td>
                      <td className="px-4 py-3">
                        <span className="block text-slate-800">{p.fechaEmision}</span>
                        <span className={`block text-[10px] ${p.estado === "Vencido" ? "text-danger font-bold" : "text-slate-500"}`}>
                          Lim: {p.fechaLimite}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold tracking-wider border uppercase ${estadoBadge(p.estado)}`}>
                          {p.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            data-testid="ver-btn"
                            onClick={() => { setViewingProforma(p); setShowViewModal(true); }}
                            title="Ver detalle"
                            className="p-1.5 text-slate-400 hover:text-primary hover:bg-blue-50 rounded"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                          <button
                            data-testid="descargar-btn"
                            onClick={() => printProforma(p)}
                            title="Descargar / Imprimir PDF"
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            data-testid="imprimir-btn"
                            onClick={() => printProforma(p)}
                            title="Imprimir"
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                          {(p.estado === "Pendiente" || p.estado === "Vencido") && (
                            <button
                              data-testid="confirmar-btn"
                              onClick={() => { setConfirmId(p.id); setShowConfirmModal(true); }}
                              title="Confirmar Pago"
                              className="p-1.5 text-slate-400 hover:text-success hover:bg-green-50 rounded"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                <p data-testid="page-indicator" className="text-xs text-slate-500">
                  Página {currentPage} de {totalPages} — {filteredProformas.length} proforma{filteredProformas.length !== 1 ? "s" : ""}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    data-testid="pagination-prev"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-slate-600" />
                  </button>
                  <button
                    data-testid="pagination-next"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>
            )}

            {/* Indicador de página cuando solo hay 1 */}
            {totalPages === 1 && filteredProformas.length > 0 && (
              <div className="px-5 py-2 border-t border-slate-100 bg-slate-50">
                <p data-testid="page-indicator" className="text-xs text-slate-400">
                  {filteredProformas.length} proforma{filteredProformas.length !== 1 ? "s" : ""} — Página 1 de 1
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Modal: Confirmar Pago ───────────────────────────────────────────────── */}
      {showConfirmModal && (
        <div data-testid="confirm-modal" className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" /> Confirmar Pago
              </h3>
              <button onClick={() => setShowConfirmModal(false)} className="text-slate-400 hover:text-slate-600 text-xl leading-none">×</button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600">
                Registrando pago para proforma <strong className="text-slate-800">{confirmId}</strong>.
                Esta acción habilitará la distribución del expediente.
              </p>
              <div>
                <label className={labelCls}>Referencia Bancaria / Recibo</label>
                <input
                  type="text"
                  placeholder="Ej. REF-0992384"
                  value={refBancaria}
                  onChange={e => setRefBancaria(e.target.value)}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Fecha Efectiva</label>
                <input
                  type="date"
                  value={fechaEfectiva}
                  onChange={e => setFechaEfectiva(e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3 bg-slate-50">
              <button onClick={() => setShowConfirmModal(false)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded text-sm font-bold hover:bg-slate-50">
                Cancelar
              </button>
              <button
                data-testid="confirmar-pago-submit"
                onClick={handleConfirmPago}
                className="px-4 py-2 bg-success hover:bg-green-700 text-white rounded text-sm font-bold shadow-sm"
              >
                Confirmar Pago
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Información de Muestra ──────────────────────────────────────── */}
      {showMuestraModal && recepcionSel && (
        <div data-testid="muestra-modal" className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden max-h-[85vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 flex-shrink-0">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" /> Información de la Muestra — {recepcionSel.id}
              </h3>
              <button onClick={() => setShowMuestraModal(false)} className="text-slate-400 hover:text-slate-600 text-xl leading-none">×</button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              {/* Datos de la recepción disponibles en el modelo actual */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Nº Recepción</p>
                  <p className="text-slate-800 font-medium">{recepcionSel.id}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Fecha Ingreso</p>
                  <p className="text-slate-800">{recepcionSel.fechaIngreso}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Producto</p>
                  <p className="text-slate-800 font-medium">{recepcionSel.producto}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Forma Farmacéutica</p>
                  <p className="text-slate-800">{recepcionSel.formaFarmaceutica}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Lote</p>
                  <p className="text-slate-800 font-mono">{recepcionSel.lote}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Trámite</p>
                  <p className="text-slate-800">{recepcionSel.tramite}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Cliente / Institución</p>
                  <p className="text-slate-800">{recepcionSel.cliente}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Tipo Cliente</p>
                  <p className="text-slate-800">{recepcionSel.clienteTipo}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Etapa Actual</p>
                  <p className="text-slate-800">{recepcionSel.etapa}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Estado</p>
                  <p className="text-slate-800">{recepcionSel.estado}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Responsable</p>
                  <p className="text-slate-800">{recepcionSel.responsable}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Prioridad</p>
                  <p className="text-slate-800">{recepcionSel.prioridad}</p>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                <p className="text-[11px] text-blue-700 font-bold uppercase mb-1">Nota de integración</p>
                <p className="text-xs text-blue-600">
                  Esta sección muestra los datos disponibles en el modelo de bandeja RAC. Cuando se integre
                  el backend, se enriquecerá con todos los campos capturados en /rac/nuevo: cantidades,
                  documentos, estándares, condiciones de almacenamiento y datos completos del producto.
                </p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex-shrink-0">
              <button onClick={() => setShowMuestraModal(false)} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded text-sm font-bold hover:bg-slate-50">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Ver Proforma ─────────────────────────────────────────────────── */}
      {showViewModal && viewingProforma && (
        <div data-testid="ver-proforma-modal" className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 flex-shrink-0">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> {viewingProforma.id}
              </h3>
              <button onClick={() => setShowViewModal(false)} className="text-slate-400 hover:text-slate-600 text-xl leading-none">×</button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-[11px] font-bold text-slate-500 uppercase">Recepción</p><p className="font-medium text-primary">{viewingProforma.recepcionId}</p></div>
                <div><p className="text-[11px] font-bold text-slate-500 uppercase">Fecha Emisión</p><p>{viewingProforma.fechaEmision}</p></div>
                <div><p className="text-[11px] font-bold text-slate-500 uppercase">Producto</p><p className="font-medium">{viewingProforma.producto}</p></div>
                <div><p className="text-[11px] font-bold text-slate-500 uppercase">Fecha Límite</p><p>{viewingProforma.fechaLimite}</p></div>
                <div><p className="text-[11px] font-bold text-slate-500 uppercase">Cliente</p><p>{viewingProforma.cliente}</p></div>
                <div><p className="text-[11px] font-bold text-slate-500 uppercase">Tipo Análisis</p>
                  <p>{viewingProforma.tipoAnalisis === "completo" ? "Análisis Completo" : viewingProforma.tipoAnalisis === "parcial" ? "Análisis Parcial" : "Solo Microbiología"}</p>
                </div>
                {viewingProforma.nroOficio && <div><p className="text-[11px] font-bold text-slate-500 uppercase">Nro. Oficio</p><p>{viewingProforma.nroOficio}</p></div>}
                {viewingProforma.nroOrdenARSA && <div><p className="text-[11px] font-bold text-slate-500 uppercase">Nro. Orden ARSA</p><p>{viewingProforma.nroOrdenARSA}</p></div>}
              </div>
              {/* Desglose financiero */}
              <div className="border border-slate-200 rounded overflow-hidden">
                <div className="flex justify-between px-4 py-2 text-sm border-b border-slate-100">
                  <span className="text-slate-600">Precio base</span>
                  <span className="font-medium">{fmtProformaMonto({ ...viewingProforma, total: viewingProforma.precioBase })}</span>
                </div>
                <div className="flex justify-between px-4 py-2 text-sm border-b border-slate-100">
                  <span className="text-slate-600">ISV (15%)</span>
                  <span className="text-slate-500">{fmtProformaMonto({ ...viewingProforma, total: viewingProforma.isv })}</span>
                </div>
                <div className="flex justify-between px-4 py-3 font-bold text-slate-900 bg-slate-50">
                  <span>TOTAL</span>
                  <span>{fmtProformaMonto(viewingProforma)}</span>
                </div>
                <div className="px-4 py-2 text-[11px] italic text-slate-500 border-t border-slate-100">
                  SON: {viewingProforma.totalLetras}
                </div>
              </div>
              {viewingProforma.observaciones && (
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase mb-1">Observaciones</p>
                  <p className="text-sm text-slate-700">{viewingProforma.observaciones}</p>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex gap-2 flex-shrink-0">
              <button
                onClick={() => printProforma(viewingProforma)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 text-slate-700 rounded text-sm font-bold hover:bg-slate-50"
              >
                <Printer className="w-3.5 h-3.5" /> Imprimir
              </button>
              <button
                onClick={() => printProforma(viewingProforma)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 text-slate-700 rounded text-sm font-bold hover:bg-slate-50"
              >
                <Download className="w-3.5 h-3.5" /> Descargar PDF
              </button>
              <button onClick={() => setShowViewModal(false)} className="ml-auto px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded text-sm font-bold hover:bg-slate-50">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Proforma Generada exitosamente ──────────────────────────────── */}
      {showSuccessModal && nuevaProforma && (
        <div data-testid="success-modal" className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-3 bg-green-50">
              <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
              <div>
                <h3 className="font-bold text-slate-800">Proforma Generada</h3>
                <p className="text-xs text-slate-600">{nuevaProforma.id}</p>
              </div>
            </div>
            <div className="p-6 space-y-3">
              <div className="bg-slate-50 border border-slate-200 rounded p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Recepción</span>
                  <span className="font-medium text-primary">{nuevaProforma.recepcionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total</span>
                  <span className="font-bold text-slate-900">{fmtProformaMonto(nuevaProforma)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Fecha Límite</span>
                  <span className="text-slate-700">{nuevaProforma.fechaLimite}</span>
                </div>
              </div>
              <p data-testid="success-total-letras" className="text-[11px] italic text-slate-500">
                SON: {nuevaProforma.totalLetras}
              </p>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex gap-2 flex-wrap">
              <button
                data-testid="success-imprimir"
                onClick={() => printProforma(nuevaProforma)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 text-slate-700 rounded text-sm font-bold hover:bg-slate-50"
              >
                <Printer className="w-3.5 h-3.5" /> Imprimir
              </button>
              <button
                data-testid="success-descargar"
                onClick={() => printProforma(nuevaProforma)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 text-slate-700 rounded text-sm font-bold hover:bg-slate-50"
              >
                <Download className="w-3.5 h-3.5" /> Descargar PDF
              </button>
              <button
                data-testid="success-cerrar"
                onClick={() => setShowSuccessModal(false)}
                className="ml-auto px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded text-sm font-bold shadow-sm"
              >
                Volver al listado
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
