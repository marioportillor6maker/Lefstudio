"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2, Clock, FileText, Search, XCircle, CalendarDays,
  FlaskConical, Save, FileOutput, Send, Printer, Eye,
} from "lucide-react";

type TabKey = "bandeja" | "aceptabilidad" | "ejecucion" | "captura" | "revision";

const TABS: { key: TabKey; label: string }[] = [
  { key: "bandeja",       label: "Bandeja Micro" },
  { key: "aceptabilidad", label: "Aceptabilidad" },
  { key: "ejecucion",     label: "Ejecución Microbiológica" },
  { key: "captura",       label: "Captura RT-74" },
  { key: "revision",      label: "Revisión Pre-STCC" },
];

// ─── Bandeja data ───────────────────────────────────────────────────────────

const casos = [
  { id: "REC-2024-00147", producto: "AMOXICILINA 500mg Cápsulas",   lote: "AM2401X",   forma: "Cápsulas", dias: "3d",  estado: "En Análisis FFQQ", color: "blue"   },
  { id: "REC-2024-00148", producto: "METFORMINA 850mg Tabletas",     lote: "MF2401A",   forma: "Tabletas", dias: "10d", estado: "Pdte. Pago",        color: "orange" },
  { id: "REC-2024-00149", producto: "CIPROFLOXACINA 500mg Tabletas", lote: "BYCIP2312", forma: "Tabletas", dias: "2d",  estado: "En Revisión STCC",  color: "purple" },
  { id: "REC-2024-00150", producto: "IBUPROFENO 400mg Tabletas",     lote: "IBU2312C",  forma: "Tabletas", dias: "4d",  estado: "Reanálisis",        color: "red"    },
  { id: "REC-2024-00151", producto: "ENALAPRIL 10mg Tabletas",       lote: "EN2312A",   forma: "Tabletas", dias: "1d",  estado: "En Revisión DG",    color: "indigo" },
  { id: "REC-2024-00152", producto: "AMLODIPINO 5mg Tabletas",       lote: "AML2401B",  forma: "Tabletas", dias: "7d",  estado: "Pdte. Información", color: "amber"  },
];

const statusText: Record<string, string> = {
  blue:   "text-blue-700",
  orange: "text-orange-600",
  purple: "text-purple-700",
  red:    "text-red-600",
  indigo: "text-indigo-700",
  amber:  "text-amber-600",
};
const statusDot: Record<string, string> = {
  blue:   "bg-blue-500",
  orange: "bg-orange-500",
  purple: "bg-purple-500",
  red:    "bg-red-500",
  indigo: "bg-indigo-500",
  amber:  "bg-amber-500",
};

// ─── Aceptabilidad ──────────────────────────────────────────────────────────

const CRITERIOS_INIT = [
  { id: 1, label: "Forma farmacéutica no estéril (cápsulas/tabletas)" },
  { id: 2, label: "Producto requiere análisis microbiológico según metodología" },
  { id: 3, label: "Muestra en condiciones adecuadas de temperatura" },
  { id: 4, label: "Cantidad de muestra suficiente para análisis" },
  { id: 5, label: "Envase íntegro sin contaminación visible" },
  { id: 6, label: "Fecha de expiración vigente" },
];

function TabAceptabilidad() {
  const [criterios, setCriterios] = useState(
    CRITERIOS_INIT.map((c) => ({ ...c, checked: true }))
  );
  const [decision, setDecision] = useState("aceptado");
  const [categoria, setCategoria] = useState("cat2");
  const [observaciones, setObservaciones] = useState("");

  const toggle = (id: number) =>
    setCriterios((prev) =>
      prev.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c))
    );

  const inputCls =
    "w-full px-3 py-[7px] text-xs border border-slate-200 rounded-md text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors";
  const readonlyCls =
    "w-full px-3 py-[7px] text-xs border border-slate-200 rounded-md text-slate-600 bg-slate-50 cursor-default";

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100">
        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
        <span className="text-sm font-semibold text-slate-800">
          Evaluación de Aceptabilidad Microbiológica
        </span>
      </div>

      <div className="p-5 space-y-5">
        {/* ── Row 1: metadata ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Recepción <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value="REC-2024-00147 — AMOXICILINA 500mg Cápsulas"
              readOnly
              className={readonlyCls}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Fecha de Evaluación <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                defaultValue="2024-09-01"
                className={inputCls + " pr-8"}
              />
              <CalendarDays className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Analista Microbiología
            </label>
            <input
              type="text"
              defaultValue="Q.F. Teresa Montoya"
              className={inputCls}
            />
          </div>
        </div>

        {/* ── Criterios ── */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
            Criterios de Aceptabilidad
          </p>
          <div className="border border-slate-200 rounded-md overflow-hidden divide-y divide-slate-100">
            {criterios.map((c) => (
              <label
                key={c.id}
                className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-slate-50/70 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={c.checked}
                  onChange={() => toggle(c.id)}
                  className="w-3.5 h-3.5 rounded border-slate-300 accent-primary shrink-0 cursor-pointer"
                />
                <span className="flex-1 text-xs text-slate-700">{c.label}</span>
                <span
                  className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    c.checked
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-red-50 text-red-600 border-red-200"
                  }`}
                >
                  {c.checked ? "Cumple" : "No cumple"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* ── Decisión + Categoría USP ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Decisión de Aceptabilidad <span className="text-red-400">*</span>
            </label>
            <select
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              className={inputCls}
            >
              <option value="aceptado">Aceptado — Proceder con análisis</option>
              <option value="rechazado">Rechazado — No cumple criterios</option>
              <option value="revision">En revisión — Requiere información adicional</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Categoría USP (si aplica)
            </label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className={inputCls}
            >
              <option value="cat1">Categoría 1 — Preparaciones acuosas para uso oral</option>
              <option value="cat2">Categoría 2 — Preparaciones orales no acuosas</option>
              <option value="cat3">Categoría 3 — Preparaciones tópicas y de mucosas</option>
              <option value="cat4">Categoría 4 — No aplica (producto estéril)</option>
            </select>
          </div>
        </div>

        {/* ── Observaciones ── */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Observaciones de Aceptabilidad
          </label>
          <textarea
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Observaciones sobre la evaluación de aceptabilidad..."
            rows={3}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors resize-none"
          />
        </div>

        {/* ── Actions ── */}
        <div className="flex items-center gap-2.5 pt-0.5">
          <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary-dark transition-colors">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Registrar Aceptabilidad
          </button>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 text-xs font-semibold rounded-md hover:bg-red-50 transition-colors">
            <XCircle className="w-3.5 h-3.5" />
            Registrar Rechazo
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Ejecución Microbiológica ────────────────────────────────────────────────

type EstadoPrueba = "En Proceso" | "Pendiente";

interface PruebaState {
  id: number;
  nombre: string;
  metodo: string;
  especificacion: string;
  estado: EstadoPrueba;
  fechaSiembra: string;
  fechaLectura: string;
  resultado: string;
  cumple: string;
}

const PRUEBAS_INIT: PruebaState[] = [
  { id: 1, nombre: "Recuento Total de Bacterias Aerobias (RTBA)",  metodo: "Dilución en placa / Filtración por membrana",    especificacion: "NMT 10² UFC/g",   estado: "En Proceso", fechaSiembra: "", fechaLectura: "", resultado: "", cumple: "" },
  { id: 2, nombre: "Recuento Total de Hongos y Levaduras (RTHL)",  metodo: "Dilución en placa / Filtración por membrana",    especificacion: "NMT 10² UFC/g",   estado: "En Proceso", fechaSiembra: "", fechaLectura: "", resultado: "", cumple: "" },
  { id: 3, nombre: "Ausencia de Escherichia coli",                  metodo: "Caldo de enriquecimiento + Agar selectivo",      especificacion: "Ausente en 1g",   estado: "Pendiente",  fechaSiembra: "", fechaLectura: "", resultado: "", cumple: "" },
  { id: 4, nombre: "Ausencia de Salmonella spp.",                   metodo: "Caldo de enriquecimiento + Agar selectivo",      especificacion: "Ausente en 10g",  estado: "Pendiente",  fechaSiembra: "", fechaLectura: "", resultado: "", cumple: "" },
  { id: 5, nombre: "Ausencia de Staphylococcus aureus",             metodo: "Caldo de enriquecimiento + Agar selectivo",      especificacion: "Ausente en 1g",   estado: "Pendiente",  fechaSiembra: "", fechaLectura: "", resultado: "", cumple: "" },
  { id: 6, nombre: "Ausencia de Pseudomonas aeruginosa",            metodo: "Caldo de enriquecimiento + Agar selectivo",      especificacion: "Ausente en 1g",   estado: "Pendiente",  fechaSiembra: "", fechaLectura: "", resultado: "", cumple: "" },
];

function TabEjecucion() {
  const [pruebas, setPruebas] = useState<PruebaState[]>(PRUEBAS_INIT);
  const [metodologia, setMetodologia] = useState("USP <61> Recuento Microbiano");
  const [tempIncubacion, setTempIncubacion] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const updatePrueba = (id: number, field: keyof PruebaState, value: string) =>
    setPruebas((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );

  const inputCls =
    "w-full px-3 py-[7px] text-xs border border-slate-200 rounded-md text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors";
  const readonlyCls =
    "w-full px-3 py-[7px] text-xs border border-slate-200 rounded-md text-slate-600 bg-slate-50 cursor-default";

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100">
        <FlaskConical className="w-3.5 h-3.5 text-primary shrink-0" />
        <span className="text-sm font-semibold text-slate-800">Ejecución del Análisis Microbiológico</span>
      </div>

      <div className="p-5 space-y-5">
        {/* ── Metadata grid ── */}
        <div className="border border-slate-200 rounded-md overflow-hidden">
          <div className="grid grid-cols-3 divide-x divide-slate-200 border-b border-slate-200">
            <div className="px-4 py-3">
              <p className="text-[10px] font-medium text-slate-500 mb-1.5">Recepción</p>
              <input type="text" value="REC-2024-00147" readOnly className={readonlyCls} />
            </div>
            <div className="px-4 py-3">
              <p className="text-[10px] font-medium text-slate-500 mb-1.5">Producto</p>
              <input type="text" value="AMOXICILINA 500mg Cápsulas" readOnly className={readonlyCls} />
            </div>
            <div className="px-4 py-3">
              <p className="text-[10px] font-medium text-slate-500 mb-1.5">Analista</p>
              <input type="text" defaultValue="Q.F. Teresa Montoya" className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-slate-200">
            <div className="px-4 py-3">
              <p className="text-[10px] font-medium text-slate-500 mb-1.5">Fecha Inicio Análisis</p>
              <div className="relative">
                <input type="date" defaultValue="2024-09-01" className={inputCls + " pr-8"} />
                <CalendarDays className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="px-4 py-3">
              <p className="text-[10px] font-medium text-slate-500 mb-1.5">Metodología</p>
              <input
                type="text"
                value={metodologia}
                onChange={(e) => setMetodologia(e.target.value)}
                className={inputCls}
              />
            </div>
            <div className="px-4 py-3">
              <p className="text-[10px] font-medium text-slate-500 mb-1.5">Temperatura Incubación (°C)</p>
              <input
                type="number"
                value={tempIncubacion}
                onChange={(e) => setTempIncubacion(e.target.value)}
                placeholder="Ej. 35"
                className={inputCls}
              />
            </div>
          </div>
        </div>

        {/* ── Pruebas ── */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
            Pruebas Microbiológicas
          </p>
          <div className="flex flex-col gap-3">
            {pruebas.map((p) => (
              <div key={p.id} className="border border-slate-200 rounded-md overflow-hidden">
                {/* Prueba header */}
                <div className="flex items-start justify-between px-4 pt-3 pb-2">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{p.nombre}</p>
                    <p className="text-[11px] text-primary mt-0.5">Método: {p.metodo}</p>
                    <p className="text-[11px] text-slate-500">Especificación: {p.especificacion}</p>
                  </div>
                  <span className={`text-xs font-medium shrink-0 ml-4 ${
                    p.estado === "En Proceso"
                      ? "text-primary"
                      : "text-slate-400"
                  }`}>
                    {p.estado}
                  </span>
                </div>
                {/* Inputs row */}
                <div className="grid grid-cols-4 gap-3 px-4 pb-3 border-t border-slate-100 pt-2.5">
                  <div>
                    <p className="text-[10px] font-medium text-slate-500 mb-1">Fecha Siembra</p>
                    <div className="relative">
                      <input
                        type="date"
                        value={p.fechaSiembra}
                        onChange={(e) => updatePrueba(p.id, "fechaSiembra", e.target.value)}
                        className={inputCls + " pr-7"}
                      />
                      <CalendarDays className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-slate-500 mb-1">Fecha Lectura</p>
                    <div className="relative">
                      <input
                        type="date"
                        value={p.fechaLectura}
                        onChange={(e) => updatePrueba(p.id, "fechaLectura", e.target.value)}
                        className={inputCls + " pr-7"}
                      />
                      <CalendarDays className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-slate-500 mb-1">Resultado (UFC/g o Ausente/Presente)</p>
                    <input
                      type="text"
                      value={p.resultado}
                      onChange={(e) => updatePrueba(p.id, "resultado", e.target.value)}
                      placeholder="Ej. 45 UFC/g"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-slate-500 mb-1">Cumple Especificación</p>
                    <select
                      value={p.cumple}
                      onChange={(e) => updatePrueba(p.id, "cumple", e.target.value)}
                      className={inputCls}
                    >
                      <option value="">Sí — Conforme</option>
                      <option value="si">Sí — Conforme</option>
                      <option value="no">No — No Conforme</option>
                      <option value="pendiente">Pendiente</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Observaciones ── */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Observaciones Generales del Análisis Microbiológico
          </label>
          <textarea
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Observaciones sobre el análisis microbiológico..."
            rows={3}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors resize-none"
          />
        </div>

        {/* ── Actions ── */}
        <div className="flex items-center gap-2.5 pt-0.5">
          <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary-dark transition-colors">
            <Save className="w-3.5 h-3.5" />
            Guardar Resultados
          </button>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-md hover:bg-slate-50 transition-colors">
            <FileOutput className="w-3.5 h-3.5" />
            Elaborar RT-74
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Captura RT-74 ──────────────────────────────────────────────────────────

interface FilaRT74 {
  id: number;
  prueba: string;
  especificacion: string;
  resultado: string;
  cumple: string;
  observaciones: string;
}

const FILAS_RT74_INIT: FilaRT74[] = [
  { id: 1, prueba: "RTBA",           especificacion: "NMT 10² UFC/g",  resultado: "", cumple: "Sí", observaciones: "" },
  { id: 2, prueba: "RTHL",           especificacion: "NMT 10² UFC/g",  resultado: "", cumple: "Sí", observaciones: "" },
  { id: 3, prueba: "E. coli",        especificacion: "Ausente en 1g",  resultado: "", cumple: "Sí", observaciones: "" },
  { id: 4, prueba: "Salmonella spp.", especificacion: "Ausente en 10g", resultado: "", cumple: "Sí", observaciones: "" },
  { id: 5, prueba: "S. aureus",      especificacion: "Ausente en 1g",  resultado: "", cumple: "Sí", observaciones: "" },
  { id: 6, prueba: "P. aeruginosa",  especificacion: "Ausente en 1g",  resultado: "", cumple: "Sí", observaciones: "" },
];

function TabCapturaRT74() {
  const [filas, setFilas] = useState<FilaRT74[]>(FILAS_RT74_INIT);
  const [supervisor, setSupervisor] = useState("");
  const [conclusion, setConclusion] = useState("conforme");
  const [categoria, setCategoria] = useState("cat2");
  const [observaciones, setObservaciones] = useState("");

  const updateFila = (id: number, field: keyof FilaRT74, value: string) =>
    setFilas((prev) => prev.map((f) => (f.id === id ? { ...f, [field]: value } : f)));

  const inputCls =
    "w-full px-2.5 py-[6px] text-xs border border-slate-200 rounded text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors";
  const readonlyCls =
    "w-full px-3 py-[7px] text-xs border border-slate-200 rounded-md text-slate-500 bg-slate-50 cursor-default";
  const fieldInputCls =
    "w-full px-3 py-[7px] text-xs border border-slate-200 rounded-md text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors";

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100">
        <FileText className="w-3.5 h-3.5 text-primary shrink-0" />
        <span className="text-sm font-semibold text-slate-800">Elaboración RT-74 — Informe Microbiológico</span>
      </div>

      <div className="p-5 space-y-5">
        {/* ── Metadata grid ── */}
        <div className="border border-slate-200 rounded-md overflow-hidden">
          <div className="grid grid-cols-3 divide-x divide-slate-200 border-b border-slate-200">
            <div className="px-4 py-3">
              <p className="text-[10px] font-medium text-slate-500 mb-1.5">Número RT-74</p>
              <input type="text" value="Auto-generado" readOnly className={readonlyCls} />
            </div>
            <div className="px-4 py-3">
              <p className="text-[10px] font-medium text-slate-500 mb-1.5">Recepción</p>
              <input type="text" value="REC-2024-00147" readOnly className={readonlyCls} />
            </div>
            <div className="px-4 py-3">
              <p className="text-[10px] font-medium text-slate-500 mb-1.5">Fecha de Elaboración</p>
              <div className="relative">
                <input type="date" className={fieldInputCls + " pr-8"} />
                <CalendarDays className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-slate-200">
            <div className="px-4 py-3">
              <p className="text-[10px] font-medium text-slate-500 mb-1.5">Analista Responsable</p>
              <input type="text" defaultValue="Q.F. Teresa Montoya" className={fieldInputCls} />
            </div>
            <div className="px-4 py-3">
              <p className="text-[10px] font-medium text-slate-500 mb-1.5">Supervisor Microbiología</p>
              <input
                type="text"
                value={supervisor}
                onChange={(e) => setSupervisor(e.target.value)}
                placeholder="Nombre del supervisor"
                className={fieldInputCls}
              />
            </div>
            <div className="px-4 py-3">
              <p className="text-[10px] font-medium text-slate-500 mb-1.5">Versión</p>
              <input type="text" defaultValue="1.0" className={fieldInputCls} />
            </div>
          </div>
        </div>

        {/* ── Resumen de resultados ── */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
            Resumen de Resultados Microbiológicos
          </p>
          <div className="border border-slate-200 rounded-md overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 w-[16%]">Prueba</th>
                  <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 w-[20%]">Especificación</th>
                  <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 w-[20%]">Resultado Obtenido</th>
                  <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 w-[14%]">Cumple</th>
                  <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Observaciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filas.map((f) => (
                  <tr key={f.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-3 py-2.5 font-semibold text-slate-800 text-xs">{f.prueba}</td>
                    <td className="px-3 py-2.5 text-slate-500 text-[11px]">{f.especificacion}</td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={f.resultado}
                        onChange={(e) => updateFila(f.id, "resultado", e.target.value)}
                        placeholder="Resultado"
                        className={inputCls}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <select
                        value={f.cumple}
                        onChange={(e) => updateFila(f.id, "cumple", e.target.value)}
                        className={inputCls}
                      >
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                        <option value="N/A">N/A</option>
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={f.observaciones}
                        onChange={(e) => updateFila(f.id, "observaciones", e.target.value)}
                        placeholder="Obs."
                        className={inputCls}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Conclusión + Categoría ── */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Conclusión Microbiológica <span className="text-red-400">*</span>
            </label>
            <select
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
              className={fieldInputCls}
            >
              <option value="conforme">Conforme — Cumple todos los criterios microbiológicos</option>
              <option value="no-conforme">No Conforme — No cumple criterios microbiológicos</option>
              <option value="condicionado">Condicionado — Requiere revisión adicional</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Categoría de Límites Aplicada
            </label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className={fieldInputCls}
            >
              <option value="cat1">Categoría 1 — Preparaciones acuosas para uso oral</option>
              <option value="cat2">Categoría 2 — Preparaciones orales no acuosas</option>
              <option value="cat3">Categoría 3 — Preparaciones tópicas y de mucosas</option>
              <option value="cat4">Categoría 4 — No aplica (producto estéril)</option>
            </select>
          </div>
        </div>

        {/* ── Observaciones ── */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Observaciones y Conclusiones del RT-74
          </label>
          <textarea
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Observaciones técnicas, conclusiones del análisis microbiológico, recomendaciones..."
            rows={3}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors resize-none"
          />
        </div>

        {/* ── Actions ── */}
        <div className="flex items-center gap-2.5 pt-0.5">
          <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-md hover:bg-primary-dark transition-colors">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Finalizar RT-74
          </button>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-md hover:bg-slate-50 transition-colors">
            <Send className="w-3.5 h-3.5" />
            Enviar a STCC
          </button>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-md hover:bg-slate-50 transition-colors">
            <Printer className="w-3.5 h-3.5" />
            Imprimir RT-74
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Revisión Pre-STCC ──────────────────────────────────────────────────────

const CASOS_REVISION = casos.slice(0, 5).map((c) => ({
  ...c,
  analista: "Q.F. Teresa Montoya",
}));

function TabRevisionPreSTCC() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-800">Revisión Pre-STCC — Microbiología</h3>
      </div>

      <div className="divide-y divide-slate-100">
        {CASOS_REVISION.map((caso) => (
          <div key={caso.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50/60 transition-colors">
            {/* Left */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-bold text-primary">{caso.id}</span>
                <span className="text-xs font-medium text-slate-800">{caso.producto}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Analista: {caso.analista} · Lote: {caso.lote}
              </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 shrink-0 ml-6">
              <span className={`flex items-center gap-1.5 text-xs font-medium ${statusText[caso.color]}`}>
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDot[caso.color]}`} />
                {caso.estado}
              </span>
              <button className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-primary font-medium border border-slate-200 hover:border-primary px-2.5 py-1 rounded transition-colors">
                <Send className="w-3 h-3" />
                Enviar STCC
              </button>
              <Link
                href={`/ingresos/${caso.id}`}
                className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-100 rounded transition-colors"
                title="Ver caso"
              >
                <Eye className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Placeholder for unimplemented tabs ─────────────────────────────────────

function TabPlaceholder({ label }: { label: string }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm px-6 py-10 flex flex-col items-center gap-2 text-center">
      <Clock className="w-8 h-8 text-slate-300" />
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="text-xs text-slate-400">Módulo en construcción</p>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

function MicrobiologiaPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get("tab") as TabKey | null;
  const [activeTab, setActiveTab] = useState<TabKey>(tabParam ?? "bandeja");

  useEffect(() => {
    setActiveTab(tabParam ?? "bandeja");
  }, [tabParam]);

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    const url = tab === "bandeja" ? "/micro" : `/micro?tab=${tab}`;
    router.replace(url, { scroll: false });
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Tabs */}
      <div className="flex border-b border-slate-200 -mt-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? "text-primary border-b-2 border-primary -mb-px"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Bandeja Micro ── */}
      {activeTab === "bandeja" && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { n: 6, label: "En Microbiología" },
              { n: 4, label: "En Análisis" },
              { n: 1, label: "Rechazos Micro" },
              { n: 2, label: "RT-74 Elaborados" },
            ].map((m) => (
              <div key={m.label} className="bg-white rounded-md border border-slate-200 shadow-sm p-5">
                <p className="text-[28px] font-bold text-slate-900 leading-none">{m.n}</p>
                <p className="text-sm text-slate-500 mt-1.5">{m.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-semibold text-slate-800 text-sm">Casos en Microbiología</h3>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-primary w-48"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {["Recepción","Producto","Forma Farm.","Aceptabilidad","Análisis","RT-74","Días","Estado","Acciones"].map((h, i) => (
                      <th key={h} className={`px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 ${i === 8 ? "text-right" : ""}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {casos.map((caso, i) => (
                    <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3 text-xs font-semibold text-primary">{caso.id}</td>
                      <td className="px-4 py-3">
                        <span className="block text-xs font-medium text-slate-800">{caso.producto}</span>
                        <span className="text-[10px] text-slate-400">Lote: {caso.lote}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600">{caso.forma}</td>
                      <td className="px-4 py-3"><CheckCircle2 className="w-4 h-4 text-emerald-500" /></td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />En curso
                        </span>
                      </td>
                      <td className="px-4 py-3"><Clock className="w-4 h-4 text-amber-400" /></td>
                      <td className="px-4 py-3 text-xs text-slate-700 font-medium">{caso.dias}</td>
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-1.5 text-xs font-medium ${statusText[caso.color]}`}>
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDot[caso.color]}`} />
                          {caso.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/micro/caso/${caso.id}`} className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-primary font-medium transition-colors">
                          <FileText className="w-3.5 h-3.5" />Analizar
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ── Aceptabilidad ── */}
      {activeTab === "aceptabilidad" && <TabAceptabilidad />}

      {/* ── Placeholders ── */}
      {activeTab === "ejecucion" && <TabEjecucion />}
      {activeTab === "captura"   && <TabCapturaRT74 />}
      {activeTab === "revision"  && <TabRevisionPreSTCC />}
    </div>
  );
}

export default function MicrobiologiaPage() {
  return (
    <Suspense>
      <MicrobiologiaPageContent />
    </Suspense>
  );
}
